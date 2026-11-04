'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),http=require('node:http'),{execFileSync}=require('node:child_process');
const {directTeaching,existingCoverage}=require('./psyc-transcript-preservation.cjs');
const {chromium}=require('playwright'),root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'index.html'),'utf8').match(/<script id="study-data" type="application\/json">(.*?)<\/script>/s)[1]);
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'module2-data.js'),'utf8'),c);
const source=data.modules.concat(c.window.SECOND_HALF.collections),restore=fs.readFileSync(path.join(root,'collection-slides.js'),'utf8');
test('all omitted original pages are added in order without changing any existing section',()=>{
 const modules=structuredClone(source);modules.forEach(m=>m.sections.forEach(s=>{if(typeof s.image==='number')s.image=m.original[s.image]}));
 const old=new Map(modules.map(m=>[m.id,m.sections.map(s=>({object:s,json:JSON.stringify(s)}))]));
 const context={M:modules};vm.runInNewContext(restore,context);let added=0;
 for(const m of modules){
  for(const previous of old.get(m.id)){assert(m.sections.includes(previous.object));assert.equal(JSON.stringify(previous.object),previous.json)}
  assert.deepEqual(Array.from(m.sections,s=>s.page).sort((a,b)=>a-b),Array.from(m.sections,s=>s.page));
  for(let page=1;page<=m.original.length;page++)assert(m.sections.some(s=>s.page===page),m.title+' missing '+page);
  if(m.id!==0)assert.equal(m.sections.length,m.original.length);
  for(const s of m.sections.filter(s=>s.sourceOnly)){if(!old.get(m.id).some(p=>p.object===s))added++;assert.equal(s.bullets.length,0);assert.equal(s.image,m.original[s.page-1]);for(const key of ['version2','versionB','versionC','versionD','versionE'])assert(!s[key]);}
 }
 assert.equal(added,13);const snapshot=JSON.stringify(modules);context.retainAllSourceSlides(modules);assert.equal(JSON.stringify(modules),snapshot,'Running completion twice adds duplicates');
 // Original transcript data, question banks, archive assets, and application code stay intact.
 for(const file of ['module2-data.js','short-term-memory-v2.js']){const actual=fs.readFileSync(path.join(root,file),'utf8'),original=execFileSync('git',['show','1dd9bc0:'+file],{cwd:root,encoding:'utf8',maxBuffer:50*1024*1024});const parse=t=>JSON.parse(t.slice(t.indexOf(' = ')+3).replace(/;\s*$/,''));assert.deepEqual(existingCoverage(parse(actual),parse(original)),directTeaching(parse(original)));}
});
function server(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.stat(file,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);return res.end()}res.writeHead(200,{'Content-Type':{'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp'}[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)})})}
test('main and shared collections expose all pages in notes and expanded readers, with blank title transcripts',{timeout:120000},async()=>{
 const host=server();await new Promise(r=>host.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+host.address().port;
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{for(const entry of ['/','/share.html']){
  const ctx=await browser.newContext({viewport:{width:1460,height:1080}});await ctx.addInitScript(()=>{if(!localStorage.getItem('psyc301-studio-v1'))localStorage.setItem('psyc301-studio-v1',JSON.stringify({theme:'dark',read:['6:11','9:17','10:2'],personalNotes:{'3:2':'Keep original introduction note.','6:11':'Keep sensory note.','9:17':'Keep rotation note.','10:2':'Keep problem note.'},explanationVersions:{3:'E',6:'2'},missed:[3001,1],essentialsDone:['m2-stm-v2-observed-style-1']}))});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+entry);
  for(const m of source){
   await p.evaluate(id=>go('module',id),m.id);
   const expected=await p.evaluate(id=>moduleBy(id).sections.length,m.id);assert.equal(await p.locator('.section').count(),expected);
   const order=await p.evaluate(id=>moduleBy(id).sections.map(s=>s.page),m.id);for(let i=1;i<order.length;i++)assert(order[i]>=order[i-1]);
   assert.equal(order[0],1);
   const first=p.locator('.section').first();await first.locator('img.sourcepic').evaluate(img=>img.decode());
   if(m.id!==0){assert.equal(await first.locator('.teaching li').count(),0);assert.equal(await first.locator('.sourcepic').getAttribute('src'),m.original[0]);}
   await p.locator('[data-mode="expanded"]').click();assert.equal(await p.locator('#teachSelect option').count(),expected);
   if(m.id!==0){assert.equal((await p.locator('#spoken').innerText()).trim(),'');assert.equal(await p.locator('.visual-pane img').getAttribute('src'),m.original[0]);assert.equal(await p.locator('[data-personal-note]').getAttribute('data-personal-note'),m.id+':1');}
   await p.locator('[data-reader-timer]').waitFor();await p.locator('#teachSelect').selectOption(String(expected-1));assert(await p.locator('#nextTeach').isDisabled());await p.locator('#exitExpanded').click();
  }
  await p.evaluate(()=>{go('module',9);mode='expanded';teachIndex=moduleBy(9).sections.findIndex(s=>s.page===16);render()});assert.equal((await p.locator('#spoken').innerText()).trim(),'');assert.match(await p.locator('.visual-pane img').getAttribute('src'),/slide-16/);await p.locator('#nextTeach').click();assert.match(await p.locator('#spoken').innerText(),/rotation/);assert.equal(await p.locator('[data-personal-note="9:17"]').inputValue(),'Keep rotation note.');
  await p.evaluate(()=>{go('module',10);mode='expanded';render()});await p.locator('[data-personal-note="10:1"]').fill('My title-page note.');await p.locator('[data-read="10:1"]').check();
  if(entry==='/')await p.screenshot({path:'/tmp/psyc-title-restored.png'});
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('psyc301-studio-v1')));assert.equal(saved.personalNotes['3:2'],'Keep original introduction note.');assert.equal(saved.personalNotes['6:11'],'Keep sensory note.');assert.equal(saved.personalNotes['10:2'],'Keep problem note.');assert(saved.read.includes('10:2'));assert(saved.read.includes('10:1'));assert.equal(saved.explanationVersions[6],'2');assert(saved.essentialsDone.includes('m2-stm-v2-observed-style-1'));
  await p.reload();await p.evaluate(()=>go('module',10));assert.equal(await p.locator('[data-personal-note="10:1"]').inputValue(),'My title-page note.');assert(await p.locator('[data-read="10:1"]').isChecked());
  for(const theme of ['light','dark']){await p.setViewportSize({width:390,height:844});await p.evaluate(theme=>{applyTheme(theme);go('module',10);mode='expanded';render()},theme);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.equal((await p.locator('#spoken').innerText()).trim(),'');}
  const audit=await p.evaluate(()=>{startQuiz('m2all');return{balance:validateSecondBalance(quiz.items,100),key:validateAnswerKey(quiz.items),count:quiz.items.length,bank:Q.length}});assert.deepEqual(audit,{balance:true,key:true,count:100,bank:208+c.window.SECOND_HALF.questions.length});assert.deepEqual(errors,[]);await ctx.close();
  console.log('PASS '+entry+': every page in all collections, blank restored transcripts, exact visuals, forward/back navigation, unchanged notes/versions/exams and responsive readers.');
 }}finally{await browser.close();await new Promise(r=>host.close(r))}
});
