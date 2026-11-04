/* Nasal correction: exact CV examples, separate critical/control comparisons. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const cp=require('node:child_process');
const path=require('node:path');
const crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'../..');
const BASE=process.env.STUDIO_BASE_URL||'http://localhost:8907/ling406/';
const BASELINE='65ac30c';
const VERSIONS=[1,2,3,4,5,6,7,10,12,14,16,18];
const TARGET=['nasal_pair_na_nga','nasal_cv_na','nasal_cv_nga'];
const CONTROL=['nasal_pair_ma_na','nasal_cv_ma'];
const SECTIONS=['speech1-32','development1-13','development1-14'];
const OLD=['nasal_m','nasal_n','nasal_ng'];

function rowsOf(document){
 const rows=Array.isArray(document)?document:document.items||document.recordings||document.clips;
 assert(rows,'Nasal authoring manifest must expose its units/comparison items');
 return Array.isArray(rows)?rows:Object.entries(rows).map(([id,row])=>({id,...row}));
}
function pcm16(file){
 const bytes=fs.readFileSync(path.join(ROOT,'ling406',file));
 assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WAVE');
 let rate,data;
 for(let offset=12;offset+8<=bytes.length;){
  const id=bytes.toString('ascii',offset,offset+4),length=bytes.readUInt32LE(offset+4),start=offset+8;
  if(id==='fmt '){assert.equal(bytes.readUInt16LE(start),1);assert.equal(bytes.readUInt16LE(start+2),1);rate=bytes.readUInt32LE(start+4);assert.equal(bytes.readUInt16LE(start+14),16);}
  if(id==='data')data=bytes.subarray(start,start+length);
  offset=start+length+(length%2);
 }
 assert(rate&&data,'PCM16 WAV carries a sample rate and waveform');return {bytes,rate,data};
}
function occurrences(data,unit){let count=0,offset=0;while((offset=data.indexOf(unit,offset))>=0){count++;offset+=unit.length;}return count;}
function teaching(){
 const e=document.querySelector('#readerRoot .reader-transcript');
 return {title:e.querySelector('h2').outerHTML,blocks:[...e.children].filter(n=>n.matches('p,ul')).map(n=>n.outerHTML)};
}
function originalCourseFilesUnchanged(){
 const changed=cp.execFileSync('git',['diff','--name-only',BASELINE,'--',
  'ling406/data.js','ling406/teaching-notes.json','ling406/questions.json','ling406/source-manifest.json',
  'ling406/sources','ling406/assets/slides',':(glob)ling406/transcripts-*-data.js'],{cwd:ROOT,encoding:'utf8'}).trim();
 assert.equal(changed,'','Nasal audio corrections must not edit original content or transcript versions');
}
(async()=>{
 originalCourseFilesUnchanged();
 const doc=JSON.parse(fs.readFileSync(path.join(ROOT,'ling406/audio/authoring/human-recordings/nasals/active-manifest.json'),'utf8'));
 const authoring=rowsOf(doc),byId=Object.fromEntries(authoring.map(row=>[row.id,row]));
 for(const id of [...TARGET,...CONTROL])assert(byId[id],`Reproducible source record for ${id}`);
 assert.deepEqual(byId.nasal_pair_na_nga.sequence,['na','nga','na','nga'],'The critical comparison contains no ma token');
 assert.deepEqual(byId.nasal_pair_ma_na.sequence,['ma','na','ma','na'],'The easier comparison is explicitly separate');
 const waveforms={};
 for(const id of [...TARGET,...CONTROL]){
  const row=byId[id],wav=waveforms[id]=pcm16(row.file);
  assert.equal(crypto.createHash('sha256').update(wav.bytes).digest('hex'),row.sha256,id+' is the audited human waveform');
  assert.equal(wav.rate,row.sample_rate);assert.equal(wav.data.length/2/wav.rate,row.duration_seconds,id+' retains its recorded natural duration');
 }
 const na=byId.nasal_cv_na,naWave=waveforms.nasal_cv_na;
 const naCore=naWave.data.subarray(Math.round(na.added_leading_silence_seconds*naWave.rate)*2,naWave.data.length-Math.round(na.added_trailing_silence_seconds*naWave.rate)*2);
 assert.equal(occurrences(waveforms.nasal_pair_na_nga.data,naCore),2,'The target repeats the exact recorded [na] core twice');
 assert.equal(occurrences(waveforms.nasal_pair_ma_na.data,naCore),2,'The control reuses the identical recorded [na] core twice');


 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  const oldApp=cp.execFileSync('git',['show',`${BASELINE}:ling406/app.js`],{cwd:ROOT,encoding:'utf8'});
  const original=await browser.newContext({serviceWorkers:'block'});
  await original.route('**/app.js?*',route=>route.fulfill({status:200,contentType:'application/javascript',body:oldApp}));
  const old=await original.newPage();await old.goto(BASE);
  const baseline={};
  for(const version of VERSIONS){
   baseline[version]={};
   for(const id of SECTIONS){
    await old.evaluate(({id,version})=>{LingStudio.state.transcriptVersion=version;LingStudio.openReader([id],0,true,'Nasal reference');},{id,version});
    baseline[version][id]=await old.evaluate(teaching);
   }
  }
  await original.close();

  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
  const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(BASE);
  const m=await page.evaluate(()=>LING406_AUDIO);
  for(const [section,ids]of Object.entries(m.sections))assert(!ids.some(id=>OLD.includes(id)),`Old full-context IPA clips are retired from ${section}`);
  assert.deepEqual(m.sections['development1-14'],TARGET,'The difficult-contrast slide contains only [na–ŋa]');
  for(const section of ['speech1-32','development1-13']){
   assert.deepEqual([...m.sections[section]].sort(),[...TARGET,...CONTROL].sort(),section);
   assert.equal(m.sections[section][0],'nasal_pair_na_nga','The target contrast is presented first');
  }
  for(const id of [...TARGET,...CONTROL]){
   const clip=m.clips[id];assert(clip?.file,'Each new example points to a real file');
   assert(/human.*recorded|human recorded/i.test(clip.kind),id+' identifies actual recorded human speech');
   assert(/Kunokuno/.test(clip.note)&&/Kunokuno/.test(clip.credit),id+' credits the identified source speaker');
   assert.equal(clip.license,'CC BY-SA 4.0');assert.equal(clip.file,byId[id].file);
   assert(!/VocalTractLab|VTL|nasal_cv_.*\.mp3/i.test(JSON.stringify(clip)),id+' does not retain retired synthesis metadata');
   assert(!/Esling|full source sound context/i.test(clip.title),id+' has a direct syllable label');
  }
  assert(/ŋa/.test(m.clips.nasal_cv_nga.spokenText),'The velar nasal is represented with IPA ŋ');
  assert(/control|easier/i.test(m.clips.nasal_pair_ma_na.title),'ma is clearly identified as the control contrast');
  assert(/control/i.test(m.clips.nasal_cv_ma.title),'The isolated ma example is labeled control-only');

  await page.evaluate(()=>{
   LingStudio.state.notes['development1-14']='Nasal replacement preservation sentinel';
   LingStudio.state.read['development1-14']=true;
   LingStudio.state.ready['guide-1']=true;
   LingStudio.startQuiz('quick');
  });
  const saved=await page.evaluate(()=>({notes:{...LingStudio.state.notes},read:{...LingStudio.state.read},ready:{...LingStudio.state.ready},quiz:JSON.stringify(LingStudio.state.quiz),missed:[...LingStudio.state.missed]}));
  for(const version of VERSIONS){
   for(const id of SECTIONS){
    await page.evaluate(({id,version})=>{LingStudio.state.transcriptVersion=version;LingStudio.openReader([id],0,true,'Nasal listening');},{id,version});
    assert.deepEqual(await page.evaluate(teaching),baseline[version][id],`${id} keeps transcript version ${version}`);
    assert.deepEqual(await page.locator('#readerRoot audio[data-study-audio]').evaluateAll(as=>as.map(a=>a.dataset.studyAudio)),m.sections[id]);
    assert((await page.locator('#readerRoot img.slide').getAttribute('src')).endsWith(`/${id.split('-').pop()}.webp`));
   }
  }
  await page.evaluate(()=>LingStudio.openReader(['development1-14'],0,true,'Target contrast'));
  await page.evaluate(()=>LingStudio.openReader(['speech1-32'],0,true,'Human target and separate control'));
  for(const id of [...TARGET,...CONTROL]){
   const player=page.locator(`#readerRoot audio[data-study-audio="${id}"]`);
   await player.evaluate(async a=>{await a.play();});await page.waitForTimeout(90);
   const state=await player.evaluate(a=>({time:a.currentTime,duration:a.duration,error:a.error?.code||null}));
   assert(state.time>0&&state.duration>0&&!state.error,JSON.stringify({id,...state}));
   assert(Math.abs(state.duration-byId[id].duration_seconds)<=1/byId[id].sample_rate,id+' plays the exact natural-excerpt duration recorded in provenance');
  }
  await page.locator('#readerRoot [data-action="stopAudio"]').click();
  assert(await page.locator('#readerRoot audio').evaluateAll(as=>as.every(a=>a.paused&&a.currentTime===0)));

  // The guide reuses those exact corrected examples rather than a stale separate list.
  await page.evaluate(()=>{LingStudio.state.transcriptVersion=18;LingStudio.go('guide');});
  const toggle=page.locator('#guideVisualToggle');
  if(await toggle.getAttribute('aria-checked')!=='true')await toggle.click();
  for(const id of SECTIONS){
   const row=page.locator(`[data-guide-section="${id}"]`);
   if(await row.count())assert.deepEqual(await row.locator('audio[data-study-audio]').evaluateAll(as=>as.map(a=>a.dataset.studyAudio)),m.sections[id],id+' guide mapping');
  }
  assert.deepEqual(await page.evaluate(()=>({notes:{...LingStudio.state.notes},read:{...LingStudio.state.read},ready:{...LingStudio.state.ready},quiz:JSON.stringify(LingStudio.state.quiz),missed:[...LingStudio.state.missed]})),saved);
  await page.evaluate(()=>LingStudio.openReader(['development1-14'],0,true,'Matched nasal syllables'));
  await page.locator('#readerRoot img.slide').evaluate(e=>e.decode());
  await page.screenshot({path:'/tmp/ling406-nasal-target-desktop.png'});
  assert.deepEqual(errors,[]);
  const report={passed:true,baselineCommit:BASELINE,originalContentUnchanged:true,allTranscriptVersions:VERSIONS,targetHasNoMa:true,separateMaNaControl:true,noOldFullContextClipsMapped:true,humanSource:'Kunokuno / Lingua Libre / CC BY-SA 4.0',naturalDurations:true,identicalNaPCMReused:true,nativePlayback:true,guideUsesCorrectedExamples:true,studyStatePreserved:true,clips:[...TARGET,...CONTROL],scientificScope:'This test verifies integration, explicit sequence metadata and technical playback. It does not provide native-listener phonetic identification.'};
  fs.writeFileSync('/tmp/ling406-nasal-integration-report.json',JSON.stringify(report,null,2)+'\n');
  console.log('PASS:',JSON.stringify(report));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
