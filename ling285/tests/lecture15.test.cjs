'use strict';
const notesEditions=require('./notes-editions-patch.cjs');
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),http=require('node:http'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright'),repo=path.resolve(__dirname,'../..'),root=path.join(repo,'ling285');
const read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8')),old=f=>JSON.parse(execFileSync('git',['show','f990dd3:ling285/'+f],{cwd:repo,encoding:'utf8',maxBuffer:25*1024*1024}));
const D=read('data.json'),P=read('practice-v2.json'),lecture=D.collections.find(c=>c.id==='lecture15'),KEY='ling285-study-studio-v1';
const plain=s=>s.replace(/\*\*/g,''),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
test('Lecture 15 retains every source page and source-supported animation states',()=>{
 const manifest=read('source-manifest.json').lecture15,bytes=fs.readFileSync(path.join(root,manifest.file));
 assert.equal(manifest.original,'Ling285_F26_L15.pptx');assert.equal(bytes.length,1449318);assert.equal(hash(bytes),manifest.sha256);assert.equal(manifest.pages,13);assert.equal(manifest.slides,13);
 assert.deepEqual(lecture.sections.map(s=>s.page),Array.from({length:13},(_,i)=>i+1));assert.equal(lecture.moduleId,'module2');
 for(const s of lecture.sections){assert.equal(s.id,'lecture15-p'+String(s.page).padStart(3,'0'));assert(fs.existsSync(path.join(root,s.image)));for(const a of s.assets)assert(fs.existsSync(path.join(root,a.file)))}
 for(const p of [1,4,5]){const s=lecture.sections[p-1];assert.deepEqual(s.teaching,[]);assert.equal(s.core,false)}
 assert(lecture.sections[6].image.endsWith('007-ink.webp'));assert.match(lecture.sections[6].sourceText,/increase this w/);
 const states=lecture.sections[11].assets.filter(a=>a.sourceDerived);assert.deepEqual(states.map(a=>a.sourceStage),Array.from({length:10},(_,i)=>i));
 const native=read('authoring/extracted/lecture15-native.json');for(const s of lecture.sections)assert.equal(s.speakerNotes,native[s.page-1].speakerNotes);
 assert(lecture.sections[9].sourceText.includes('loss.backward()'));assert(lecture.sections[12].sourceText.includes('nn.Sigmoid()'));
 const numbers=read('authoring/extracted/lecture15-numerical-check.json');assert(numbers.gradientsMatchNotes&&numbers.updatedWeightsMatchNotes);assert(numbers.markedInputWeightGradient>0&&numbers.markedOutputWeightGradient>0);assert.equal(numbers.sigmoidStages.length,10);
});
test('all prior slides, editions, question text, answers and study guides remain exact',()=>{
 const before=old('data.json'),byId=new Map(D.collections.map(c=>[c.id,c]));
 for(const c of before.collections)assert.deepEqual(byId.get(c.id),c,c.id);
 for(const q of before.questions){const now=D.questions.find(x=>x.id===q.id);assert(now);for(const k of Object.keys(q).filter(k=>k!=='priority'))assert.deepEqual(now[k],q[k],q.id+':'+k)}
 assert.deepEqual(D.guide.slice(0,before.guide.length),before.guide);assert.deepEqual(D.modules[0],before.modules[0]);
 for(const f of ['transcripts-v2.json','transcripts-v3.json','transcripts-v4.json']){const past=old(f),now=read(f);for(const [id,c]of Object.entries(past.collections))assert.deepEqual(now.collections[id],c,f+':'+id);assert.deepEqual(now.visualPresentation,past.visualPresentation)}
 for(const q of old('practice-v2.json').questions)assert.deepEqual(P.questions.find(x=>x.id===q.id),q,q.id);
 for(const f of ['app.js','index.html']){const before=execFileSync('git',['show','f990dd3:ling285/'+f],{cwd:repo,encoding:'utf8'}),now=fs.readFileSync(path.join(root,f),'utf8');assert.equal(now,f==='app.js'?notesEditions.app(before.replace("new Set(['lecture11','lecture12','lecture13','lecture14'])","new Set(['lecture11','lecture12','lecture13','lecture14','lecture15'])")):notesEditions.index(before.replace('app.js?v=ling285-reader-timer-1','app.js?v=ling285-lecture15-1')))}
});
test('four editions teach the real pages; both banks add fifty usable source-linked questions',()=>{
 for(const v of [2,3,4]){
  const pack=read('transcripts-v'+v+'.json'),c=pack.collections.lecture15;assert.equal(c.sections.length,13);
  for(const s of c.sections){const source=lecture.sections[s.page-1];assert.equal(s.id,source.id);assert.equal(!!s.teaching.length,!!source.teaching.length);for(const p of s.teaching)assert(!/need not|the lecture (?:says|gives|shows)|the next slide/i.test(p));}
 }
 const core=lecture.sections.filter(s=>s.core);assert(core.length>0&&core.length<10);
 for(const bank of [D.questions,P.questions]){
  const qs=bank.filter(q=>q.lectureId==='lecture15');assert.equal(qs.length,50);assert.equal(qs.filter(q=>q.type==='mcq').length,25);assert.equal(qs.filter(q=>q.type==='written').length,25);assert.equal(new Set(qs.map(q=>q.prompt)).size,50);
  for(const q of qs){assert(q.answer&&q.rubric.length);assert(q.sources.every(r=>r.collection==='lecture15'&&lecture.sections[r.page-1].teaching.length));if(q.type==='mcq'){assert.equal(q.options.length,4);assert(q.options.some(o=>o.id===q.correctOption));assert(q.options.every(o=>o.feedback&&o.text))}}
 }
 assert.equal(P.questions.length,250);assert.equal(D.modules[1].questionCount,250);
});
function serve(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const f=path.resolve(repo,'.'+name);if(!f.startsWith(repo+path.sep)){res.writeHead(403);return res.end()}fs.stat(f,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);return res.end()}res.setHeader('Content-Type',{'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.mp4':'video/mp4'}[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res)})})}
test('all pages, teaching editions, saved notes, review tools and five-way cumulative practice work in the browser',{timeout:160000},async()=>{
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/ling285/';const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const errors=[];
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000}});const p=await context.newPage();p.setDefaultTimeout(12000);p.on('pageerror',e=>errors.push(e.message));
  const earlier=old('practice-v2.json').questions;const ids=['lecture11','lecture12','lecture13','lecture14'].flatMap(id=>earlier.filter(q=>q.lectureId===id).slice(0,25).map(q=>q.id));
  const seed={theme:'dark',activeModule:'module2',transcriptVersion:'v4',notes:{'lecture11-p002':'Keep the spring note.'},read:{'lecture11-p002':true},drafts:{[earlier.find(q=>q.type==='written').id]:'Keep the written response.'},assessmentVersion:'v2',practiceSessions:{'module2:v2':{ids,index:2,moduleId:'module2',assessmentVersion:'v2',title:'Earlier current test',scope:'mixed',mode:'mixed',finished:false}}};
  await context.addInitScript(({KEY,seed})=>{if(!localStorage.getItem(KEY))localStorage.setItem(KEY,JSON.stringify(seed))},{KEY,seed});
  await p.goto(base);await p.locator('#collectionNav [data-collection="lecture15"]').click();assert.equal(await p.title(),'LING258 · Study Studio');assert.equal(await p.locator('.source-section').count(),13);
  for(const v of ['v1','v2','v3','v4']){
   await p.locator('#content [data-transcript-version]').selectOption(v);const pack=v==='v1'?lecture:read('transcripts-'+v+'.json').collections.lecture15;
   for(const s of pack.sections){const el=p.locator('[data-section="'+s.id+'"]');assert.equal(await el.count(),1);assert.equal(await el.locator('.slide-button img').getAttribute('src'),lecture.sections[s.page-1].image);assert.deepEqual(await el.locator('.teaching>ul>li').allTextContents(),s.teaching.map(plain));}
  }
  const box=p.locator('[data-section="lecture15-p003"]');await box.locator('summary').first().click();await box.locator('[data-note]').fill('Keep the forward-pass note.');await box.locator('[data-read]').check();
  await p.locator('[data-reader="lecture"][data-expanded="true"]').click();await p.locator('.reader-dialog').waitFor();assert.equal(await p.locator('#readerSelect option').count(),13);
  for(let page=1;page<=13;page++){await p.locator('#readerSelect').selectOption(String(page-1));assert.equal(await p.locator('.reader-dialog .slide-button img').getAttribute('src'),lecture.sections[page-1].image);assert.deepEqual(await p.locator('.reader-dialog .teaching>ul>li').allTextContents(),read('transcripts-v4.json').collections.lecture15.sections[page-1].teaching.map(plain));}
  for(const mode of ['light','dark']){await p.evaluate(mode=>document.documentElement.dataset.theme=mode,mode);await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}await p.setViewportSize({width:1440,height:1000});await p.locator('[data-action="closeReader"]').click();
  const work=async name=>p.locator('#workNav [data-go="'+name+'"]').click();
  for(const name of ['guide','core','experiments','combined','sources']){await work(name);assert((await p.locator('#content').textContent()).includes(name==='sources'?'Ling285_F26_L15.pptx':name==='experiments'?'sigmoid':name==='guide'?'formant classifier':'Neural Networks'));}
  await work('test');assert(await p.locator('.saved-set-notice').count());assert((await p.locator('.saved-set-notice').textContent()).includes('all current lectures'));
  for(const version of ['v1','v2']){
   await p.locator('[data-assessment-version]').selectOption(version);await p.locator('[data-start="mixed"]').click();let state=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);const bank=version==='v1'?D.questions:P.questions;const qs=state.session.ids.map(id=>bank.find(q=>q.id===id));assert.equal(qs.length,100);assert.equal(new Set(qs.map(q=>q.id)).size,100);
   for(const lectureId of ['lecture11','lecture12','lecture13','lecture14','lecture15']){const group=qs.filter(q=>q.lectureId===lectureId);assert.equal(group.length,20);assert.equal(group.filter(q=>q.type==='mcq').length,10);assert.equal(group.filter(q=>q.type==='written').length,10)}
   await work('quizzes');await p.locator('[data-start="lecture:lecture15"]').click();state=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);const quiz=state.session.ids.map(id=>bank.find(q=>q.id===id));assert.equal(quiz.length,50);assert(quiz.every(q=>q.lectureId==='lecture15'));assert.equal(quiz.filter(q=>q.type==='mcq').length,25);
   await work('test');
  }
  await p.reload();await p.locator('#collectionNav [data-collection="lecture15"]').click();const saved=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);assert.equal(saved.notes['lecture11-p002'],seed.notes['lecture11-p002']);assert.equal(saved.drafts[Object.keys(seed.drafts)[0]],Object.values(seed.drafts)[0]);assert.equal(saved.notes['lecture15-p003'],'Keep the forward-pass note.');assert(saved.read['lecture15-p003']);
  await p.locator('[data-section="lecture15-p012"]>summary').click();const source=p.locator('[data-section="lecture15-p012"] .slide-button img');await source.scrollIntoViewIfNeeded();await source.evaluate(img=>img.decode());assert(await source.evaluate(img=>img.naturalWidth>1000));
  const figures=p.locator('[data-section="lecture15-p012"] .figure-details');await figures.locator('summary').click();assert.equal(await figures.locator('img').count(),10);await figures.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode()})));await figures.locator('summary').click();
  await p.screenshot({path:'/tmp/ling285-lecture15-desktop.png'});await p.setViewportSize({width:390,height:844});if(!(await p.locator('body').getAttribute('class')||'').includes('side-closed'))await p.locator('#sidebar [data-action="sidebar"]').click();await p.locator('[data-section="lecture15-p012"]').scrollIntoViewIfNeeded();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:'/tmp/ling285-lecture15-mobile.png'});
  assert.deepEqual(errors,[]);await context.close();console.log('PASS: every slide in all four editions and expanded reader; old/new notes and drafts; all review views; both 50-question quizzes and exact five-way 100-question balance; mobile themes.');
 }finally{await browser.close();await new Promise(r=>server.close(r))}
});
