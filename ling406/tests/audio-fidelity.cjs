/* Source/placement fidelity regression for the full Module II audio correction. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const ROOT=path.resolve(__dirname,'../..');
const BASE=process.env.STUDIO_BASE_URL||'http://localhost:8907/ling406/';
const BASELINE='929574a';
const VERSIONS=[1,2,3,4,5,6,7,10,12,14,16,18];
const RETIRED=['f2_equal_steps','f2_step_01','f2_step_07','f2_step_13','voiced-ba','voiced-da','voiced-ga','vot_comparison','vot_00','vot_40','vot_80','nonspeech_attack_comparison','nonspeech_attack_10','nonspeech_attack_80','hindi-retroflex','hindi-dental','salish-velar','salish-uvular','korean-lenis-bul','korean-tense-ppul','korean-aspirated-pul'];
function teachingRows(){return [...document.querySelectorAll('#content .review-group')].map(row=>{const area=row.querySelector('.guide-explanation')||row;return {heading:row.querySelector('h3')?.outerHTML||'',blocks:[...area.children].filter(e=>e.matches('p,ul')).map(e=>e.outerHTML)};});}
function originalFiles(){
 const changed=cp.execFileSync('git',['diff','--name-only',BASELINE,'--','ling406/data.js','ling406/teaching-notes.json','ling406/questions.json','ling406/source-manifest.json','ling406/sources','ling406/assets/slides',':(glob)ling406/transcripts-*-data.js'],{cwd:ROOT,encoding:'utf8'}).trim();
 assert.equal(changed,'','Original slides, sources, question bank and every transcript edition remain unchanged');
}
(async()=>{
 originalFiles();
 const initial=JSON.parse(cp.execFileSync('git',['show',BASELINE+':ling406/audio/manifest.json'],{cwd:ROOT,encoding:'utf8'}));
 const preAudit=JSON.parse(fs.readFileSync(path.join(ROOT,'ling406/audio/authoring/full-audio-fidelity-audit.json'),'utf8'));
 assert.equal(preAudit.scope.active_clips,Object.keys(initial.clips).length);
 assert.deepEqual([...preAudit.clips.map(c=>c.id)].sort(),Object.keys(initial.clips).sort(),'Every initially active recording received a source-fidelity audit');
 const resolution=JSON.parse(fs.readFileSync(path.join(ROOT,'ling406/audio/authoring/fidelity-resolution.json'),'utf8'));
 assert(resolution,'Post-audit resolution is retained for review');
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  const oldApp=cp.execFileSync('git',['show',BASELINE+':ling406/app.js'],{cwd:ROOT,encoding:'utf8'});
  const reference=await browser.newContext({serviceWorkers:'block'});
  await reference.route('**/app.js?*',route=>route.fulfill({status:200,contentType:'application/javascript',body:oldApp}));
  const old=await reference.newPage();await old.goto(BASE);const baseline={};
  for(const version of VERSIONS){await old.evaluate(v=>{LingStudio.state.transcriptVersion=v;LingStudio.go('guide');},version);baseline[version]=await old.evaluate(teachingRows);}
  await reference.close();
  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
  const p=await context.newPage(),errors=[];p.on('pageerror',error=>errors.push(error.message));await p.goto(BASE);
  const m=await p.evaluate(()=>LING406_AUDIO);
  const canonical=await p.evaluate(()=>Object.fromEntries([...LingStudio.sections].map(([id,s])=>[id,s.noteId||id])));
  const used=[...new Set(Object.values(m.sections).flat())];
  for(const id of RETIRED)assert(!used.includes(id),'Generic or wrong-context example retired from lesson mappings: '+id);
  for(const id of used)assert(m.clips[id]?.file,'Every active mapping has an actual media file: '+id);
  const placements=id=>Object.entries(m.sections).filter(([,ids])=>ids.includes(id)).map(([sid])=>canonical[sid]||sid);
  function family(prefix){return used.filter(id=>id.startsWith(prefix));}
  function only(prefix,allowed){const ids=family(prefix);assert(ids.length,prefix+' family is present');for(const id of ids)for(const sid of placements(id))assert(allowed.includes(sid),id+' is inappropriate on '+sid);return ids;}
  const bdg=only('haskins_bdg_',['speech1-13','speech1-14','speech1-15','speech1-16','speech1-17']);
  const infant=only('jusczyk_',['speech1-30','development1-11']);
  const adult=only('cutting_rosner_1974_',['speech1-29','development1-10']);
  const bear=only('bear-pear-',['speech1-21','speech2-10','speech2-11','speech2-12','speech2-13','speech2-14','l2-learning-15']);
  const corpse=only('gorpse-corpse-',['speech2-18','speech2-19','speech2-20','speech2-21']);
  const cv=family('haskins-vot-');assert(cv.length,'Archived CV VOT examples exist');
  for(const id of cv)for(const sid of placements(id))assert(!/^speech2-(?:03|10|11|12|13|14|18|19|20|21)$/.test(sid),'A labial CV is not a word-specific stimulus on '+sid);
  const beach=family('kim2025-beach-peach-');assert(beach.length,'Published beach–peach recordings exist');
  for(const id of beach)for(const sid of placements(id))assert(!['speech2-10','speech2-11','speech2-12','speech2-13','speech2-14'].includes(sid),'Beach–peach does not replace a bear–pear example');
  const hindi=used.filter(id=>/hindi/i.test(id));assert(hindi.length>=2,'Matched Hindi CV excerpts exist');
  assert(hindi.some(id=>/t̪a/.test(m.clips[id].spokenText||'')),'Hindi dental CV is explicit');
  assert(hindi.some(id=>/ʈa/.test(m.clips[id].spokenText||'')),'Hindi retroflex CV is explicit');
  const korean=used.filter(id=>/korean/i.test(id));assert(korean.length>=3,'Native Korean contrast series exists');
  for(const id of korean)assert(/berkeley|course in phonetics|ACIP/i.test(JSON.stringify(m.clips[id])),id+' identifies its coherent phonetic archive');
  for(const sid of ['speech1-26','development1-07']){
   const notice=JSON.stringify(m.notices?.[sid]||'');
   assert(/salish/i.test(notice)&&/unavailable|not available|not.*recover|not yet|not.*found/i.test(notice),sid+' openly identifies the missing matched Salish pair');
   assert(!(m.sections[sid]||[]).some(id=>/salish/i.test(id)),'Unmatched Salish words are not playable as ki–qi');
  }
  for(const sid of ['l2-learning-19','review-52']){
   const clips=(m.sections[sid]||[]).map(id=>m.clips[id]);
   assert(!clips.some(c=>c.spokenText?.trim().toLowerCase()==='speaker'),'English speaker is not the Russian condition target');
   assert(clips.some(c=>/спички/.test(c.spokenText||'')&&/target/i.test(c.title)),'Russian condition has the correct target');
   assert(clips.some(c=>c.spokenText?.trim().toLowerCase()==='spear'&&/competitor|reference/i.test(c.title)),'Spear is an explicitly unspoken competitor reference');
  }
  await p.evaluate(()=>LingStudio.openReader(['speech1-26'],0,true,'Contrast availability'));
  const visibleNotice=await p.locator('#readerRoot .slide-audio-examples').innerText();
  assert(/salish/i.test(visibleNotice)&&/unavailable|not available|not.*recover|not yet|not.*found/i.test(visibleNotice),'The missing Salish contrast is explained in the actual slide UI');
  const french8=(m.sections['l2-learning-08']||[]).map(id=>m.clips[id]).filter(c=>/french|français|\bfr-/i.test(JSON.stringify(c)));
  assert.deepEqual(french8.map(c=>c.spokenText).sort(),['auto','bicyclette','rivière'].sort(),'French page8 contains its own three source examples');
  // Native browser metadata decode checks every active asset, including retained sentence readings.
  const assets=[...new Set(used.map(id=>m.clips[id].file))];
  for(let i=0;i<assets.length;i+=10){
   const checked=await p.evaluate(files=>Promise.all(files.map(file=>new Promise(resolve=>{
    const a=new Audio(new URL(file,location.href).href);let finished=false;
    const done=ok=>{if(finished)return;finished=true;clearTimeout(timer);const answer={file,ok,duration:a.duration,error:a.error?.code||null};a.pause();a.removeAttribute('src');a.load();resolve(answer);};
    const timer=setTimeout(()=>done(false),12000);a.onloadedmetadata=()=>done(Number.isFinite(a.duration)&&a.duration>0);a.onerror=()=>done(false);a.load();
   }))),assets.slice(i,i+10));
   for(const item of checked)assert(item.ok,JSON.stringify(item));
  }
  await p.evaluate(()=>{LingStudio.state.notes['speech1-14']='Full fidelity preservation sentinel';LingStudio.state.read['speech1-14']=true;LingStudio.state.ready['guide-0']=true;LingStudio.startQuiz('quick');});
  const state=await p.evaluate(()=>JSON.stringify({notes:LingStudio.state.notes,read:LingStudio.state.read,ready:LingStudio.state.ready,quiz:LingStudio.state.quiz,missed:LingStudio.state.missed}));
  for(const version of VERSIONS){
   await p.evaluate(v=>{LingStudio.state.transcriptVersion=v;LingStudio.go('guide');},version);
   assert.deepEqual(await p.evaluate(teachingRows),baseline[version],'Guide teaching HTML is unchanged in transcript version '+version);
   const toggle=p.locator('#guideVisualToggle');if(await toggle.getAttribute('aria-checked')!=='true')await toggle.click();
   const rows=await p.locator('[data-guide-section]').evaluateAll(es=>es.map(e=>({id:e.dataset.guideSection,clips:[...e.querySelectorAll('audio[data-study-audio]')].map(a=>a.dataset.studyAudio)})));
   for(const row of rows)assert.deepEqual(row.clips,m.sections[row.id]||[],row.id+' guide audio follows the corrected canonical mapping');
  }
  const samples=[bdg[0],cv[0],beach[0],bear[0],corpse[0],adult[0],infant[0],hindi[0],korean[0],'nasal_pair_na_nga','saffran-stream','horse-garden-path'];
  for(const id of samples){
   assert(m.clips[id],'Playback sample is active: '+id);
   const sid=Object.keys(m.sections).find(s=>m.sections[s].includes(id));
   await p.evaluate(sid=>LingStudio.openReader([sid],0,true,'Audio fidelity verification'),sid);
   const player=p.locator(`#readerRoot audio[data-study-audio="${id}"]`);await player.evaluate(a=>a.play());await p.waitForTimeout(70);
   const actual=await player.evaluate(a=>({time:a.currentTime,error:a.error?.code||null}));assert(actual.time>0&&!actual.error,JSON.stringify({id,...actual}));
  }
  await p.locator('#readerRoot [data-action="stopAudio"]').click();
  assert.equal(await p.evaluate(()=>JSON.stringify({notes:LingStudio.state.notes,read:LingStudio.state.read,ready:LingStudio.state.ready,quiz:LingStudio.state.quiz,missed:LingStudio.state.missed})),state,'Audio and guide operations preserve study state');
  for(const theme of ['light','dark']){
   await p.setViewportSize({width:390,height:844});await p.evaluate(t=>{LingStudio.state.theme=t;LingStudio.go('guide');},theme);
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),theme+' mobile guide overflow');
   await p.evaluate(()=>LingStudio.openReader(['speech1-26'],0,true,'Matched contrast and availability'));
   assert(await p.evaluate(()=>document.querySelector('.expanded-stage').scrollWidth<=innerWidth),theme+' contrast player overflow');
   await p.screenshot({path:'/tmp/ling406-audio-fidelity-mobile-'+theme+'.png'});
  }
  assert.deepEqual(errors,[]);
  const report={passed:true,baselineCommit:BASELINE,initialClipsAudited:Object.keys(initial.clips).length,currentActiveClips:used.length,uniqueMediaFiles:assets.length,allOriginalCourseFilesPreserved:true,allTranscriptVersions:VERSIONS,exactGuideHTMLPreserved:true,preciseFamilyMappings:true,noRetiredGenericExamplesMapped:true,unavailableSalishExplicit:true,conditionRolesCorrect:true,allBrowserMetadataDecoded:true,representativeNativePlaybackFamilies:samples,studyStatePreserved:true,mobileLightDark:true,scope:'Integration/source-mapping/technical playback checks, not independent perceptual identification or a claim that all recordings are original experimental files.'};
  fs.writeFileSync('/tmp/ling406-audio-fidelity-browser-report.json',JSON.stringify(report,null,2)+'\n');console.log('PASS:',JSON.stringify(report));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
