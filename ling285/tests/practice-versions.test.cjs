'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),studio=path.join(root,'ling285'),KEY='ling285-study-studio-v1';
const data=JSON.parse(fs.readFileSync(path.join(studio,'data.json'))),practice=JSON.parse(fs.readFileSync(path.join(studio,'practice-v2.json')));
const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.mp4':'video/mp4'};
function serve(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.stat(file,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});});}
function check(session,bank,size,perLecture){
 const map=new Map(bank.map(q=>[q.id,q]));assert.equal(session.ids.length,size);assert.equal(new Set(session.ids).size,size);
 const qs=session.ids.map(id=>{assert(map.has(id),'Wrong edition question '+id);return map.get(id);});
 assert.equal(qs.filter(q=>q.type==='mcq').length,size/2);
 if(perLecture){const counts={};for(const q of qs)counts[q.lectureId]=(counts[q.lectureId]||0)+1;assert.deepEqual(counts,perLecture);}
}
test('practice editions preserve separate attempts, answers, queues, backups, and missing-file recovery',{timeout:100000},async()=>{
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/ling285/';
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const errors=[];
 try{
  const context=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1000}}),page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
  const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),work=async v=>page.locator('#workNav [data-go="'+v+'"]').click();
  await page.goto(url+'?view=test&module=module2');await page.locator('[data-assessment-version]').waitFor();assert.equal(await page.locator('[data-assessment-version]').inputValue(),'v2');
  await page.locator('[data-start="mixed"]').click();let saved=await state();check(saved.session,practice.questions,100,{lecture11:25,lecture12:25,lecture13:25,lecture14:25});const firstSet=[...saved.session.ids];
  // Preserve a checked MCQ, written draft, and uncertainty in the new edition.
  const mcqIndex=firstSet.findIndex(id=>practice.questions.find(q=>q.id===id).type==='mcq'),mcq=practice.questions.find(q=>q.id===firstSet[mcqIndex]);
  await page.locator('summary').filter({hasText:'Question navigator'}).click();await page.locator('[data-question-index="'+mcqIndex+'"]').last().click();
  await page.locator('[data-mcq-option="'+mcq.correctOption+'"]').check();await page.locator('[data-check-question]').click();await page.locator('[data-flag]').check();
  const wi=firstSet.findIndex(id=>practice.questions.find(q=>q.id===id).type==='written'),wid=firstSet[wi];
  await page.locator('summary').filter({hasText:'Question navigator'}).click();await page.locator('[data-question-index="'+wi+'"]').last().click();await page.locator('[data-draft]').fill('My saved new-edition explanation.');
  await page.locator('[data-assessment-version]').selectOption('v1');await page.locator('[data-start="mixed"]').click();saved=await state();check(saved.session,data.questions,100,{lecture11:25,lecture12:25,lecture13:25,lecture14:25});const originalSet=[...saved.session.ids];
  await work('missed');assert.match(await page.locator('#content .lead').innerText(),/^0 questions/);
  await page.locator('[data-assessment-version]').selectOption('v2');assert.match(await page.locator('#content .lead').innerText(),/^1 questions/);
  assert.equal((await state()).mcqSelections[mcq.id],mcq.correctOption);assert.equal((await state()).mcqSubmitted[mcq.id],true);
  // Full lecture banks retain 50 questions, split equally, for every owner.
  for(const n of [11,12,13,14]){await work('quizzes');await page.locator('[data-start="lecture:lecture'+n+'"]').click();saved=await state();check(saved.session,practice.questions,50,{['lecture'+n]:50});}
  const lastIds=(await state()).session.ids,lastIndex=lastIds.findIndex(id=>practice.questions.find(q=>q.id===id).type==='mcq'),lastMCQ=practice.questions.find(q=>q.id===lastIds[lastIndex]);
  await page.locator('summary').filter({hasText:'Question navigator'}).click();await page.locator('[data-question-index="'+lastIndex+'"]').last().click();await page.locator('[data-mcq-option="'+lastMCQ.correctOption+'"]').check();await page.locator('[data-check-question]').click();
  await page.locator('[data-resume-assessment="v1"]').click();assert.deepEqual((await state()).session.ids,originalSet);
  await page.locator('[data-assessment-version]').selectOption('v2');const retained=(await state()).session.ids;
  assert.equal((await state()).drafts[wid],'My saved new-edition explanation.');assert.equal((await state()).mcqSubmitted[lastMCQ.id],true);
  await work('sources');assert.equal(await page.locator('.practice-evidence a').count(),2);
  const pending=page.waitForEvent('download');await page.locator('[data-action="export"]').click();const download=await pending,backup=JSON.parse(fs.readFileSync(await download.path()));
  assert(backup.state.practiceSessions['module2:v1']);assert(backup.state.practiceSessions['module2:v2']);
  await page.locator('#importFile').setInputFiles({name:'all-versions.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.waitForFunction(()=>document.querySelector('#saveStatus').textContent.includes('imported'));
  assert.deepEqual((await state()).session.ids,retained);assert.equal((await state()).assessmentVersion,'v2');
  await page.locator('#moduleNav [data-module="module1"]').click();await work('test');assert.equal(await page.locator('[data-assessment-version]').count(),0);await page.locator('[data-start="mixed"]').click();assert.equal((await state()).session.ids.length,20);assert((await state()).session.ids.every(id=>data.questions.some(q=>q.id===id&&q.moduleId==='module1')));
  // An older session remains available when the new default is introduced.
  const legacy=await browser.newContext(),lp=await legacy.newPage();const oldWritten=data.questions.find(q=>q.moduleId==='module2'&&q.type==='written');
  await lp.addInitScript(({key,id,ids})=>localStorage.setItem(key,JSON.stringify({activeModule:'module2',notes:{'lecture11-p002':'Keep my source note.'},drafts:{[id]:'Older draft.'},session:{ids,index:2,moduleId:'module2',title:'Earlier saved set'}})),{key:KEY,id:oldWritten.id,ids:originalSet});
  await lp.goto(url+'?view=test');await lp.locator('[data-assessment-version]').waitFor();assert.equal(await lp.locator('[data-assessment-version]').inputValue(),'v2');await lp.locator('[data-resume-assessment="v1"]').click();let ls=await lp.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);assert.deepEqual(ls.session.ids,originalSet);assert.equal(ls.session.index,2);assert.equal(ls.drafts[oldWritten.id],'Older draft.');assert.equal(ls.notes['lecture11-p002'],'Keep my source note.');await legacy.close();
  // A temporary missing new file must not discard its saved answers or session.
  const fallback=await browser.newContext(),fp=await fallback.newPage();await fp.addInitScript(({key,value})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(value));},{key:KEY,value:backup.state});await fp.route('**/practice-v2.json',r=>r.fulfill({status:503,body:'temporarily unavailable'}));
  await fp.goto(url+'?view=test');await fp.locator('[data-assessment-version]').waitFor();assert.equal(await fp.locator('[data-assessment-version]').inputValue(),'v1');assert.match(await fp.locator('.practice-version-status').innerText(),/could not be loaded/);let fsaved=await fp.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);assert.equal(fsaved.drafts[wid],'My saved new-edition explanation.');assert.deepEqual(fsaved.practiceSessions['module2:v2'].ids,retained);
  await fp.unroute('**/practice-v2.json');await fp.reload();await fp.locator('[data-assessment-version]').waitFor();assert.equal(await fp.locator('[data-assessment-version]').inputValue(),'v2');fsaved=await fp.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);assert.deepEqual(fsaved.session.ids,retained);assert.equal(fsaved.mcqSelections[lastMCQ.id],lastMCQ.correctOption);await fallback.close();
  await page.locator('#moduleNav [data-module="module2"]').click();await work('test');await page.screenshot({path:'/tmp/ling285-v2-practice-desktop.png'});await page.setViewportSize({width:390,height:844});if(!(await page.locator('body').getAttribute('class') || '').includes('side-closed'))await page.locator('#sidebar [data-action="sidebar"]').click();const extent=await page.evaluate(()=>({w:innerWidth,s:document.documentElement.scrollWidth}));assert(extent.s<=extent.w+1);await page.screenshot({path:'/tmp/ling285-v2-practice-mobile.png'});assert.deepEqual(errors,[]);await context.close();
 }finally{await browser.close();await new Promise(r=>server.close(r));}
});
