'use strict';
// Browser verification for parallel transcript editions. --fixture uses a clearly
// labeled in-memory UI fixture and never writes course data or authored notes.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const {chromium}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),studio=path.join(root,'ling285'),KEY='ling285-study-studio-v1';
const dataText=fs.readFileSync(path.join(studio,'data.json'),'utf8'),data=JSON.parse(dataText),fixtureMode=process.argv.includes('--fixture');
const affected=['lecture11','lecture12','lecture13','lecture14'];
const byId=new Map(data.collections.flatMap(c=>c.sections.map(s=>[s.id,{...s,collection:c.id}])));
let edition;
if(fixtureMode){
  const presentation=JSON.parse(fs.readFileSync(path.join(studio,'authoring/transcripts-v2-visual-presentation.json'),'utf8')).visualPresentation;
  edition={id:'v2',label:'Version 2 · Conceptual',collections:Object.fromEntries(data.collections.filter(c=>affected.includes(c.id)).map(c=>[c.id,{title:c.title,sections:c.sections.map(s=>({id:s.id,page:s.page,title:s.title,teaching:s.teaching.length?[`Conceptual UI verification ${s.id}. `+s.teaching[0],...s.teaching.slice(1)]:[]}))}])),references:[{title:'UI fixture reference',file:'sources/lecture11.pdf',kind:'verification fixture'}],visualPresentation:presentation};
}else edition=JSON.parse(fs.readFileSync(path.join(studio,'transcripts-v2.json'),'utf8'));
const clearEdition=fixtureMode?{...edition,id:'v3',label:'Version 3 · Clear explanations',collections:Object.fromEntries(Object.entries(edition.collections).map(([id,c])=>[id,{...c,sections:c.sections.map(s=>({...s,teaching:s.teaching.map(p=>'Plain V3 UI verification. '+p)}))}]))}:JSON.parse(fs.readFileSync(path.join(studio,'transcripts-v3.json'),'utf8'));
const versionById=new Map(Object.values(edition.collections).flatMap(c=>c.sections.map(s=>[s.id,s])));
const clean=value=>String(value).replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
const digest=value=>crypto.createHash('sha256').update(value).digest('hex');
const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.pdf':'application/pdf','.wav':'audio/wav'};
function serve(){return http.createServer((request,response)=>{
 let name;try{name=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400);response.end();return;}
 if(name==='/ling285/transcripts-v3.json'){response.writeHead(200,{'Content-Type':'application/json'});response.end(JSON.stringify(clearEdition));return;}
 if(name==='/ling285/transcripts-v2.json'){response.writeHead(200,{'Content-Type':'application/json'});response.end(JSON.stringify(edition));return;}
 if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
 fs.stat(file,(error,stat)=>{if(error || !stat.isFile()){response.writeHead(404);response.end();return;}response.writeHead(200,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream'});fs.createReadStream(file).pipe(response);});
});}
function sourcePair(collection){return data.collections.find(c=>c.id===collection).sections.find(s=>s.teaching.length && versionById.get(s.id)?.teaching.length && clean(s.teaching.join(' '))!==clean(versionById.get(s.id).teaching.join(' ')));}
async function openSection(page,id){const section=page.locator('[data-section="'+id+'"]');if(await section.getAttribute('open')===null)await section.locator(':scope > summary').click();return section;}
async function assertTeaching(locator,paragraphs){assert.equal(clean(await locator.locator('.teaching').innerText()),clean(paragraphs.join(' ')));}

test('selected transcripts stay consistent across notes, readers, search, speech, shared progress, and original visuals',{timeout:90000},async()=>{
 const server=serve();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url='http://127.0.0.1:'+server.address().port+'/ling285/';
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});const errors=[];
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1050},acceptDownloads:true}),page=await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror',error=>errors.push(error.message));
  const mcq=data.questions.find(q=>q.moduleId==='module2' && q.type==='mcq'),written=data.questions.find(q=>q.moduleId==='module2' && q.type==='written');
  const previous={assessmentVersion:'v1',transcriptVersion:'v2',activeModule:'module2',drafts:{[written.id]:'Keep my existing written explanation.'},mcqSelections:{[mcq.id]:mcq.correctOption},mcqSubmitted:{[mcq.id]:true},optionOrders:{[mcq.id]:mcq.options.map(o=>o.id).reverse()},flags:{[mcq.id]:true},session:{moduleId:'module2',ids:[mcq.id,written.id],index:1,title:'Existing saved practice',scope:'mixed',mode:'mixed',finished:false}};
  await page.addInitScript(({key,value})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(value));},{key:KEY,value:previous});
  await page.goto(url+'?view=collection&lecture=lecture11&module=module2');await page.locator('#content .toolbar [data-transcript-version]').waitFor();
  assert.equal(await page.title(),'LING258 · Study Studio');assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v2');
  const state=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
  let sharedId;
  for(const id of affected){
   await page.locator('#collectionNav [data-collection="'+id+'"]').click();const source=sourcePair(id);assert(source,'Conceptual edition should teach '+id+' differently from the retained original.');
   let section=await openSection(page,source.id);await assertTeaching(section,versionById.get(source.id).teaching);
   if(!sharedId){sharedId=source.id;await section.locator('[data-note]').fill('A note shared between transcript editions.');await section.locator('[data-read]').check();}
   await page.locator('#content [data-transcript-version]').selectOption('v1');section=await openSection(page,source.id);await assertTeaching(section,source.teaching);
   assert.equal(clean(await section.locator('.section-title').textContent()),clean(source.title));
   await page.locator('#content [data-transcript-version]').selectOption('v2');section=await openSection(page,source.id);await assertTeaching(section,versionById.get(source.id).teaching);
  }
  await page.locator('#workNav [data-go="combined"]').click();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v2');
  let shared=await openSection(page,sharedId);assert.equal(await shared.locator('[data-note]').inputValue(),'A note shared between transcript editions.');assert(await shared.locator('[data-read]').isChecked());
  // A phrase unique to V2 must stop matching after selecting V1, while the query remains.
  let searchSection,phrase;
  const originalSearch=clean(data.collections.flatMap(c=>c.sections.flatMap(s=>[...s.teaching,s.sourceText || ''])).join(' ')).toLocaleLowerCase();
  for(const c of data.collections.filter(c=>affected.includes(c.id)))for(const s of c.sections){for(const p of versionById.get(s.id).teaching){if(clean(p).length>30 && !originalSearch.includes(clean(p).toLocaleLowerCase())){searchSection=s;phrase=clean(p);break;}}if(phrase)break;}
  assert(phrase,'The conceptual edition requires a distinct teaching phrase.');
  await page.locator('#noteSearch').fill(phrase);assert.equal(await page.locator('[data-section="'+searchSection.id+'"]').getAttribute('hidden'),null);
  await page.locator('#content [data-transcript-version]').selectOption('v1');assert.equal(await page.locator('#noteSearch').inputValue(),phrase);assert.notEqual(await page.locator('[data-section="'+searchSection.id+'"]').getAttribute('hidden'),null);
  await page.locator('#content [data-transcript-version]').selectOption('v2');assert.equal(await page.locator('[data-section="'+searchSection.id+'"]').getAttribute('hidden'),null);
  await (await openSection(page,searchSection.id)).locator('[data-open-section]').click();await page.locator('#readerDialog [data-transcript-version]').selectOption('v1');await page.keyboard.press('Escape');
  assert.equal(await page.locator('#noteSearch').inputValue(),phrase);assert.notEqual(await page.locator('[data-section="'+searchSection.id+'"]').getAttribute('hidden'),null);assert.match(await page.locator('#searchCount').innerText(),/^0 matching source pages$/,'Closing a differently versioned reader must reapply the retained search.');
  await page.locator('#content [data-transcript-version]').selectOption('v2');assert.equal(await page.locator('[data-section="'+searchSection.id+'"]').getAttribute('hidden'),null);await page.locator('#noteSearch').fill('');
  const queue=data.collections.filter(c=>affected.includes(c.id)).flatMap(c=>c.sections),index=queue.findIndex(s=>s.id===sharedId);
  await page.locator('[data-reader="combined"][data-expanded="false"]').click();await page.locator('#readerSelect').selectOption(String(index));
  await page.locator('.inline-reader [data-transcript-version]').selectOption('v1');assert.equal(await page.locator('#readerSelect').inputValue(),String(index));await assertTeaching(page.locator('.inline-reader'),byId.get(sharedId).teaching);
  await page.locator('[data-action="expandReader"]').click();await page.locator('#readerDialog').waitFor({state:'visible'});await page.locator('#readerDialog [data-transcript-version]').selectOption('v2');assert.equal(await page.locator('#readerSelect').inputValue(),String(index));await assertTeaching(page.locator('#readerDialog'),versionById.get(sharedId).teaching);
  await page.evaluate(()=>{window.lastTranscriptSpeech='';window.speechSynthesis.speak=utterance=>window.lastTranscriptSpeech=utterance.text;window.speechSynthesis.cancel=()=>{};});
  await page.locator('#readerDialog [data-action="readAloud"]').click();assert.equal(clean(await page.evaluate(()=>window.lastTranscriptSpeech)),clean([versionById.get(sharedId).title,...versionById.get(sharedId).teaching].join('. ')));
  await page.locator('#readerDialog [data-transcript-version]').selectOption('v1');await page.locator('#readerDialog [data-action="readAloud"]').click();assert.equal(clean(await page.evaluate(()=>window.lastTranscriptSpeech)),clean([byId.get(sharedId).title,...byId.get(sharedId).teaching].join('. ')));
  await page.keyboard.press('Escape');await page.locator('#workNav [data-go="core"]').click();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v1');
  const core=data.collections.filter(c=>affected.includes(c.id)).flatMap(c=>c.sections).find(s=>s.core && versionById.get(s.id).teaching.length);assert(core);await assertTeaching(await openSection(page,core.id),core.teaching);await page.locator('#content [data-transcript-version]').selectOption('v2');await assertTeaching(await openSection(page,core.id),versionById.get(core.id).teaching);
  // Hide only reviewed blank previews. Written overlays and static annotation pages remain visible.
  for(const version of ['v1','v2']){
   await page.locator('#collectionNav [data-collection="lecture11"]').click();await page.locator('#content [data-transcript-version]').selectOption(version);
   let section=await openSection(page,'lecture11-p008');assert.equal(await section.locator('.source-figure .slide-button').count(),0);assert(await section.locator('.source-figure video').count());assert(await section.locator('.source-figure figcaption a').count());
   section=await openSection(page,'lecture11-p010');assert.equal(await section.locator('.source-figure .slide-button').count(),1);
   for(const [collection,pages] of [['lecture13',[4,8]],['lecture14',[4,7,11,12,13]]]){
    await page.locator('#collectionNav [data-collection="'+collection+'"]').click();for(const number of pages){section=await openSection(page,collection+'-p'+String(number).padStart(3,'0'));assert.equal(await section.locator('.source-figure .slide-button').count(),1,'Annotated/reveal source must retain its preview.');}
   }
  }
  await page.reload({waitUntil:'domcontentloaded'});await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v2');
  let saved=await state();assert.equal(saved.transcriptVersion,'v2');assert.equal(saved.notes[sharedId],'A note shared between transcript editions.');assert.equal(saved.read[sharedId],true);assert.equal(saved.drafts[written.id],previous.drafts[written.id]);assert.equal(saved.mcqSelections[mcq.id],mcq.correctOption);assert.equal(saved.mcqSubmitted[mcq.id],true);assert.deepEqual(saved.optionOrders[mcq.id],previous.optionOrders[mcq.id]);assert.deepEqual(saved.session.ids,previous.session.ids);
  await page.locator('#content [data-transcript-version]').selectOption('v1');await page.locator('#workNav [data-go="sources"]').click();
  if(edition.references?.length)assert.equal(await page.locator('.transcript-references a').count(),edition.references.length);
  assert.equal(await page.locator('.source-table tbody tr').count(),data.collections.length);
  const downloadPromise=page.waitForEvent('download');await page.locator('#content [data-action="export"]').click();const download=await downloadPromise,backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(backup.state.transcriptVersion,'v1');
  await page.locator('#collectionNav [data-collection="lecture11"]').click();await page.locator('#content [data-transcript-version]').selectOption('v2');await page.locator('#workNav [data-go="sources"]').click();await page.locator('#importFile').setInputFiles({name:'transcript-backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.waitForFunction(()=>document.querySelector('#saveStatus').textContent.includes('imported'));assert.equal((await state()).transcriptVersion,'v1');
  const oldBackup={course:'LING285',version:1,state:{notes:{[sharedId]:'An older backup note.'}}};await page.locator('#importFile').setInputFiles({name:'pre-transcript-backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(oldBackup))});await page.waitForFunction(()=>document.querySelector('#saveStatus').textContent.includes('imported'));assert.equal((await state()).transcriptVersion,'v1','An older backup must not replace the current transcript preference.');
  await page.locator('#moduleNav [data-module="module1"]').click();await page.locator('#collectionNav [data-collection="lecture09"]').click();assert.equal(await page.locator('#content [data-transcript-version]').count(),0);const unaffected=data.collections.find(c=>c.id==='lecture09').sections.find(s=>s.teaching.length);await assertTeaching(await openSection(page,unaffected.id),unaffected.teaching);
  await page.locator('#moduleNav [data-module="module2"]').click();await page.locator('#collectionNav [data-collection="lecture14"]').click();await page.setViewportSize({width:390,height:844});if(!(await page.locator('body').getAttribute('class') || '').includes('side-closed'))await page.locator('#sidebar [data-action="sidebar"]').click();
  let extent=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(extent.scroll<=extent.width+1,'Version controls overflow the mobile page.');await page.locator('[data-reader="lecture"][data-expanded="true"]').click();await page.locator('#readerDialog').waitFor({state:'visible'});extent=await page.evaluate(()=>({width:document.querySelector('#readerDialog').clientWidth,scroll:document.querySelector('#readerDialog').scrollWidth}));assert(extent.scroll<=extent.width+1,'Version controls overflow the mobile reader.');
  assert.equal(await page.title(),'LING258 · Study Studio');assert.deepEqual(errors,[]);assert.equal(digest(fs.readFileSync(path.join(studio,'data.json'))),digest(dataText),'Adding/selecting a teaching edition must not mutate canonical course data.');await context.close();
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
});

test('an unavailable conceptual file leaves original teaching usable with an honest notice',{timeout:30000},async()=>{
 const server=serve();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{const page=await browser.newPage();await page.addInitScript(key=>localStorage.setItem(key,JSON.stringify({transcriptVersion:'v2'})),KEY);await page.route('**/ling285/transcripts-v2.json',route=>route.fulfill({status:503,body:'Temporarily unavailable'}));await page.goto('http://127.0.0.1:'+server.address().port+'/ling285/?view=collection&lecture=lecture11');await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v1');assert.equal(await page.locator('#content [data-transcript-version] option[value="v2"]').getAttribute('disabled'),'');assert.match(await page.locator('#transcriptNotice').innerText(),/original Version 1/i);const original=data.collections.find(c=>c.id==='lecture11').sections.find(s=>s.teaching.length);await assertTeaching(await openSection(page,original.id),original.teaching);assert.equal(await page.title(),'LING258 · Study Studio');}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
});

test('Version 3 remains available while all retained transcript choices remain independent of practice',{timeout:60000},async()=>{
 const server=serve();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1050}});page.setDefaultTimeout(15000);const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const url='http://127.0.0.1:'+server.address().port+'/ling285/';const clearById=new Map(Object.values(clearEdition.collections).flatMap(c=>c.sections.map(s=>[s.id,s])));
  await page.goto(url+'?view=collection&lecture=lecture11');await page.locator('#content [data-transcript-version]').waitFor();await page.locator('#content [data-transcript-version]').selectOption('v3');assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v3');
  for(const id of affected){
   await page.locator('#collectionNav [data-collection="'+id+'"]').click();const source=data.collections.find(c=>c.id===id).sections.find(s=>s.teaching.length && clearById.get(s.id).teaching.length && clean(s.teaching.join(' '))!==clean(clearById.get(s.id).teaching.join(' ')));assert(source,'Version 3 should explain '+id+' in its own words.');
   await assertTeaching(await openSection(page,source.id),clearById.get(source.id).teaching);
   for(const [version,paragraphs]of[['v1',source.teaching],['v2',versionById.get(source.id).teaching],['v3',clearById.get(source.id).teaching]]){await page.locator('#content [data-transcript-version]').selectOption(version);await assertTeaching(await openSection(page,source.id),paragraphs);}
  }
  await page.locator('#workNav [data-go="combined"]').click();const source=data.collections.find(c=>c.id==='lecture11').sections.find(s=>s.teaching.length && clearById.get(s.id).teaching.length);let section=await openSection(page,source.id);await assertTeaching(section,clearById.get(source.id).teaching);await section.locator('[data-note]').fill('Shared with the clear explanation edition.');await section.locator('[data-read]').check();
  await section.locator('[data-open-section]').click();await assertTeaching(page.locator('#readerDialog'),clearById.get(source.id).teaching);await page.locator('#readerDialog [data-transcript-version]').selectOption('v2');assert.equal(await page.locator('#readerDialog [data-note]').inputValue(),'Shared with the clear explanation edition.');assert(await page.locator('#readerDialog [data-read]').isChecked());await page.locator('#readerDialog [data-transcript-version]').selectOption('v3');
  await page.evaluate(()=>{window.lastTranscriptSpeech='';speechSynthesis.speak=u=>window.lastTranscriptSpeech=u.text;speechSynthesis.cancel=()=>{};});await page.locator('#readerDialog [data-action="readAloud"]').click();assert.equal(clean(await page.evaluate(()=>window.lastTranscriptSpeech)),clean([clearById.get(source.id).title,...clearById.get(source.id).teaching].join('. ')));await page.keyboard.press('Escape');
  await page.locator('#workNav [data-go="core"]').click();const core=data.collections.filter(c=>affected.includes(c.id)).flatMap(c=>c.sections).find(s=>s.core && clearById.get(s.id).teaching.length);await assertTeaching(await openSection(page,core.id),clearById.get(core.id).teaching);
  await page.locator('#collectionNav [data-collection="lecture11"]').click();assert.equal(await (await openSection(page,'lecture11-p008')).locator('.source-figure .slide-button').count(),0);assert.equal(await (await openSection(page,'lecture11-p010')).locator('.source-figure .slide-button').count(),1);
  await page.locator('#content [data-transcript-version]').selectOption('v2');await page.reload({waitUntil:'domcontentloaded'});await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v2','An explicit older transcript choice must remain selected.');assert.equal(await page.title(),'LING258 · Study Studio');assert.deepEqual(errors,[]);
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
});

test('Version 4 works across all four lectures, shared notes, readers, core review, backups, and fallback',{timeout:90000},async()=>{
 const fourth=JSON.parse(fs.readFileSync(path.join(studio,'transcripts-v4.json'),'utf8')),fourthById=new Map(Object.values(fourth.collections).flatMap(c=>c.sections.map(s=>[s.id,s])));
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/ling285/';
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const errors=[];
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1050},acceptDownloads:true}),page=await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url+'?view=collection&module=module2&lecture=lecture11');await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v4');
  let sharedId;
  for(const lecture of affected){await page.locator('#collectionNav [data-collection="'+lecture+'"]').click();const original=data.collections.find(c=>c.id===lecture).sections.find(s=>s.teaching.length);let section=await openSection(page,original.id);await assertTeaching(section,fourthById.get(original.id).teaching);
   for(const [version,expected]of [['v1',original.teaching],['v2',versionById.get(original.id).teaching],['v3',clearEdition.collections[lecture].sections.find(s=>s.id===original.id).teaching],['v4',fourthById.get(original.id).teaching]]){await page.locator('#content [data-transcript-version]').selectOption(version);await assertTeaching(await openSection(page,original.id),expected);}
   if(!sharedId){sharedId=original.id;section=await openSection(page,sharedId);await section.locator('[data-note]').fill('A note shared with Version 4.');await section.locator('[data-read]').check();}
  }
  await page.locator('#workNav [data-go="combined"]').click();let shared=await openSection(page,sharedId);assert.equal(await shared.locator('[data-note]').inputValue(),'A note shared with Version 4.');assert(await shared.locator('[data-read]').isChecked());await assertTeaching(shared,fourthById.get(sharedId).teaching);
  await shared.locator('[data-open-section]').click();await assertTeaching(page.locator('#readerDialog'),fourthById.get(sharedId).teaching);await page.locator('#readerDialog [data-transcript-version]').selectOption('v3');assert.equal(await page.locator('#readerDialog [data-note]').inputValue(),'A note shared with Version 4.');await page.locator('#readerDialog [data-transcript-version]').selectOption('v4');await page.keyboard.press('Escape');
  await page.locator('#workNav [data-go="core"]').click();const core=data.collections.filter(c=>affected.includes(c.id)).flatMap(c=>c.sections).find(s=>s.core&&s.teaching.length);await assertTeaching(await openSection(page,core.id),fourthById.get(core.id).teaching);
  await page.locator('#collectionNav [data-collection="lecture14"]').click();await page.reload();await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v4');
  await page.locator('#workNav [data-go="test"]').click();assert.equal(await page.locator('[data-assessment-version]').inputValue(),'v2');await page.locator('[data-start="mixed"]').click();const session=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).session,KEY);assert.equal(session.ids.length,100);assert(session.ids.every(id=>id.startsWith('v2-')));
  await page.locator('#workNav [data-go="sources"]').click();const pending=page.waitForEvent('download');await page.locator('[data-action="export"]').click();const dl=await pending,backup=JSON.parse(fs.readFileSync(await dl.path()));assert.equal(backup.state.transcriptVersion,'v4');
  await page.locator('#importFile').setInputFiles({name:'v4-backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.waitForFunction(()=>document.querySelector('#saveStatus').textContent.includes('imported'));assert.equal(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).transcriptVersion,KEY),'v4');
  await page.locator('#collectionNav [data-collection="lecture11"]').click();await page.locator('#sidebar [data-action="sidebar"]').click();await page.screenshot({path:'/tmp/ling285-v4-desktop.png'});await page.setViewportSize({width:390,height:844});const extent=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(extent.scroll<=extent.width+1);await page.screenshot({path:'/tmp/ling285-v4-mobile.png'});
  // Failed loading must preserve the selected edition and shared progress.
  await page.route('**/transcripts-v4.json',r=>r.fulfill({status:503,body:'Temporarily unavailable'}));await page.reload();await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v3');assert.match(await page.locator('#transcriptNotice').innerText(),/Version 4 could not be loaded/);assert.equal(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).transcriptVersion,KEY),'v4');
  await page.unroute('**/transcripts-v4.json');await page.reload();await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v4');assert.deepEqual(errors,[]);await context.close();
 }finally{await browser.close();await new Promise(r=>server.close(r));}
});
