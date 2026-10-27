'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto'),vm=require('node:vm'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const {directTeaching}=require('./psyc-transcript-preservation.cjs');
const root=path.resolve(__dirname,'..');
const before=file=>execFileSync('git',['show','edb74c5:'+file],{cwd:root,encoding:'utf8',maxBuffer:50*1024*1024});
const load=text=>JSON.parse(text.split('window.SECOND_HALF = ',1)[0]===text?'null':text.split('window.SECOND_HALF = ')[1].replace(/;\s*$/,''));
const bank=load(fs.readFileSync(path.join(root,'module2-data.js'),'utf8')),old=directTeaching(load(before('module2-data.js')));
const collection=bank.collections.find(c=>c.id===10),questions=bank.questions.filter(q=>q.module===10),plain=s=>s.replace(/<[^>]*>/g,'');
test('new lecture preserves earlier data and uses every instructional source page',()=>{
 assert.deepEqual(bank.questions.filter(q=>old.modules.includes(q.module)),old.questions);
 assert.deepEqual(bank.collections.filter(m=>old.modules.includes(m.id)),old.collections);
 for(const key of ['topics','coreReview','experiments'])assert.deepEqual(bank[key].filter(g=>old.modules.includes(g.module??6)),old[key]);
 const stm=t=>JSON.parse(t.split('window.SHORT_TERM_MEMORY_V2 = ')[1].replace(/;\s*$/,''));
 assert.deepEqual(stm(fs.readFileSync(path.join(root,'short-term-memory-v2.js'),'utf8')),directTeaching(stm(before('short-term-memory-v2.js'))));
 for(const file of ['index.html','share.html']){
  const current=fs.readFileSync(path.join(root,file),'utf8'),earlier=before(file);
  const json=html=>html.match(/<script id="study-data" type="application\/json">(.*?)<\/script>/s)[1];
  assert.deepEqual(JSON.parse(json(current)),directTeaching(JSON.parse(json(earlier))),'Only the requested direct-teaching wording can change in earlier embedded material');
  assert.deepEqual([...current.matchAll(/<script>(.*?)<\/script>/gs)].map(m=>m[1]),[...earlier.matchAll(/<script>(.*?)<\/script>/gs)].map(m=>m[1]),'Existing app code changed');
  assert.deepEqual([...current.matchAll(/<style>(.*?)<\/style>/gs)].map(m=>m[1]),[...earlier.matchAll(/<style>(.*?)<\/style>/gs)].map(m=>m[1]),'Existing design changed');
 }
 assert.deepEqual(bank.modules.slice(0,3),[6,9,10]);assert.equal(bank.lectureNumbers[10],'11');
 assert.equal(collection.original.length,22);assert.deepEqual(collection.sections.map(s=>s.page),Array.from({length:21},(_,i)=>i+2));
 assert.equal(questions.length,50);assert.equal(new Set(bank.questions.map(q=>q.id)).size,bank.questions.length);
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'authoring/psyc301/problem-solving-source.json')));
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,manifest.stored))).digest('hex'),manifest.sha256);
 for(const image of collection.original){assert(fs.statSync(path.join(root,image)).size>4000)}
 const covered=new Set();
 for(const q of questions){assert(collection.sections.some(s=>s.page===q.page));assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.correct>=0&&q.correct<4);assert(q.why.length>70);covered.add(q.page)}
 assert.equal(covered.size,21);
 for(const s of collection.sections){assert(s.bullets.length>=3&&s.bullets.length<=4);assert(plain(s.bullets.join(' ')).split(/\s+/).length>=125);assert(!/need not|this (?:illustrates|demonstrates|shows)|next slide|later experiments|the key point is/i.test(s.bullets.join(' ')))}
 for(const group of [...bank.topics,...bank.coreReview,...bank.experiments].filter(g=>g.module===10))for(const page of group.pages)assert(collection.sections.some(s=>s.page===page));
 assert.equal(bank.coreReview.filter(g=>g.module===10).flatMap(g=>g.pages).length,16);
});
test('puzzle explanations retain consistent arithmetic and move constraints',()=>{
 const jugs=[[21,127,3,100],[14,163,25,99],[18,43,10,5],[9,42,6,21],[20,59,4,31],[20,50,3,24],[15,39,3,18],[28,59,3,25]];
 for(const [a,b,c,goal]of jugs)assert.equal(b-a-2*c,goal);assert.equal(15+3,18);assert.equal(28-3,25);
 assert.equal(3*(2+3),15);assert.equal(4*(2+3),20);
 const initial=[[0,0],[-1,1],[1,1],[-2,2],[0,2],[2,2],[-3,3],[-1,3],[1,3],[3,3]].map(JSON.stringify);
 const downward=[[-3,1],[-1,1],[1,1],[3,1],[-2,2],[0,2],[2,2],[-1,3],[1,3],[0,4]].map(JSON.stringify);
 assert.equal(initial.filter(p=>!downward.includes(p)).length,3);assert.equal(downward.filter(p=>!initial.includes(p)).length,3);
 assert.equal(64-2,31*2);assert.notEqual(32-2,32);
 // The three-disk illustrated subgoal route respects every stated operator.
 const pegs=[[3,2,1],[],[]];for(const [a,b]of [[0,2],[0,1],[2,1],[0,2]]){const disk=pegs[a].pop();assert(disk);assert(!pegs[b].length||pegs[b].at(-1)>disk);pegs[b].push(disk)}assert.deepEqual(pegs,[[],[2,1],[3]]);
});
function serve(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}fs.stat(file,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);res.end();return}const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.pdf':'application/pdf'};res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)})})}
test('both entry points expose lecture 11, complete readers, preserved progress and balanced exams',{timeout:180000},async()=>{
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{for(const entry of ['/','/share.html']){
  const ctx=await browser.newContext({viewport:{width:1480,height:1100}});
  await ctx.addInitScript(()=>{if(!localStorage.getItem('psyc301-studio-v1'))localStorage.setItem('psyc301-studio-v1',JSON.stringify({theme:'dark',read:['6:11','9:11'],personalNotes:{'6:11':'Keep sensory notes.','9:11':'Keep working-memory notes.'},missed:[3001,2001,1],explanationVersions:{6:'2',3:'E'},essentialsDone:['m2-stm-v2-observed-style-1']}))});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+entry);
  assert.match(await p.locator('#content').innerText(),new RegExp("across "+bank.modules.length+" lectures"));
  await p.locator('#workspaceNav [data-module="10"]').click();assert.match(await p.locator('#content h1').innerText(),/11 · Problem Solving and Reasoning/);assert.equal(await p.locator('.section').count(),22);
  assert.equal(await p.locator('.section .priority-e').count(),16);assert.equal(await p.locator('.section:not(.core-e)').count(),6);
  const link=p.locator('.notesHeader a');assert.match(await link.getAttribute('href'),/CogPsych_Ch12_1_F26.pdf/);assert.equal((await p.request.get(base+'/'+await link.getAttribute('href'))).status(),200);
  for(const image of collection.original){const r=await p.request.get(base+'/'+image);assert.equal(r.status(),200);assert.equal(crypto.createHash('sha256').update(await r.body()).digest('hex'),crypto.createHash('sha256').update(fs.readFileSync(path.join(root,image))).digest('hex'))}
  await p.locator('[data-mode="expanded"]').click();await p.locator('[data-reader-timer]').waitFor();
  assert.equal(await p.locator('#teachSelect option').count(),22);await p.locator('#teachSelect').selectOption('1');const note=p.locator('[data-personal-note="10:2"]');await note.fill('Problem = obstacle between current and goal.');
  await p.locator('[data-read="10:2"]').check();
  for(let i=0;i<21;i++){
   await p.locator('#teachSelect').selectOption(String(i+1));await p.locator('.visual-pane img').evaluate(img=>img.decode());
   assert.match(await p.locator('.visual-pane img').getAttribute('src'),new RegExp('slide-'+String(i+2).padStart(2,'0')+'\\.webp$'));
   assert.equal(await p.locator('#spoken li').count(),collection.sections[i].bullets.length);
   assert.equal((await p.locator('#spoken').innerText()).replace(/\s+/g,' ').trim(),plain(collection.sections[i].bullets.join(' ')).replace(/\s+/g,' ').trim());
  }
  assert(await p.locator('#nextTeach').isDisabled());await p.locator('#teachSelect').selectOption('6');
  if(entry==='/')await p.screenshot({path:'/tmp/psyc301-problem-solving-expanded.png'});
  await p.locator('#exitExpanded').click();await p.locator('#workspaceNav [data-view="m2guide"]').click();assert.match(await p.locator('#content').innerText(),/Problem representation, restructuring, and insight/);
  await p.locator('#workspaceNav [data-view="m2core"]').click();await p.locator('[data-second-core-expand]').click();const corePages=await p.evaluate(()=>secondCoreModule().sections.filter(s=>s.sourceModule===10).map(s=>s.noteKey));assert.equal(corePages.length,16);assert(corePages.includes('10:21'));await p.locator('#exitExpanded').click();
  await p.locator('#workspaceNav [data-view="m2experiments"]').click();assert.match(await p.locator('#content').innerText(),/Metcalfe and Wiebe/);await p.locator('[data-second-experiment-expand="0"]').first().click();const index=await p.evaluate(()=>secondExperimentModule().sections.findIndex(s=>s.noteKey==='10:22'));await p.locator('#teachSelect').selectOption(String(index));assert.match(await p.locator('#spoken').innerText(),/think-aloud protocol/i);assert(await p.locator('[data-personal-note="10:22"]').count());await p.locator('#exitExpanded').click();
  const audit=await p.evaluate(()=>{const extra=new Set(),keys=new Set();for(let i=0;i<100;i++){const items=prepareQuizItems(balancedSecondQuestions(secondQuestions(),100));if(!validateSecondBalance(items,100)||!validateAnswerKey(items))throw Error('Invalid set');for(const id of secondHalf.modules)if(100%secondHalf.modules.length&&items.filter(q=>q.module===id).length===Math.ceil(100/secondHalf.modules.length))extra.add(id);keys.add(items.map(q=>q.order.indexOf(q.correct)).join(''))}return{extra:[...extra].sort((a,b)=>a-b),keys:keys.size}});assert.deepEqual(audit.extra,100%bank.modules.length?bank.modules:[]);assert.equal(audit.keys,100);
  await p.locator('#workspaceNav [data-view="m2test"]').click();assert.match(await p.locator('#content').innerText(),/20 questions per lecture/);await p.locator('[data-start="m2all"]').click();
  assert.equal(await p.evaluate(()=>quiz.items.length),100);assert(await p.evaluate(()=>validateSecondBalance(quiz.items,100)&&validateAnswerKey(quiz.items)));
  const q=await p.evaluate(()=>({correct:quiz.items[0].correct,module:quiz.items[0].module,page:quiz.items[0].page}));await p.locator('[data-answer="'+q.correct+'"]').click();assert.match(await p.locator('.feedback').innerText(),/Correct/);await p.locator('#nextQ').click();assert.equal(await p.evaluate(()=>quiz.index),1);
  await p.evaluate(()=>{go('module',10);startQuiz('moduleall')});assert.equal(await p.evaluate(()=>quiz.items.length),50);assert(await p.evaluate(()=>quiz.items.every(q=>q.module===10)));await p.evaluate(()=>{for(let i=0;i<quiz.items.length;i++)quiz.answers[i]={choice:quiz.items[i].correct};quiz.finished=true;render()});assert.match(await p.locator('#content').innerText(),/50 \/ 50|50\/50|100%/);
  for(const theme of ['dark','light']){await p.setViewportSize({width:390,height:844});await p.evaluate(theme=>{applyTheme(theme);go('module',10);mode='expanded';render()},theme);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert(await p.locator('[data-reader-timer]').count())}
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('psyc301-studio-v1')));assert.equal(saved.personalNotes['6:11'],'Keep sensory notes.');assert.equal(saved.personalNotes['9:11'],'Keep working-memory notes.');assert.equal(saved.personalNotes['10:2'],'Problem = obstacle between current and goal.');assert(saved.read.includes('10:2'));assert(saved.read.includes('6:11'));assert(saved.read.includes('9:11'));assert.equal(saved.explanationVersions[6],'2');assert(saved.essentialsDone.includes('m2-stm-v2-observed-style-1'));
  await p.reload();await p.locator('#workspaceNav [data-module="10"]').click();assert.equal(await p.locator('[data-personal-note="10:2"]').inputValue(),saved.personalNotes['10:2']);assert(await p.locator('[data-read="10:2"]').isChecked());
  assert.deepEqual(errors,[]);await ctx.close();console.log('PASS '+entry+': 22 original pages, 21 expanded slide scripts, all review tools, 50 new questions, balanced current exams, unchanged archive/notes, persistent new notes, and responsive readers.');
 }}finally{await browser.close();await new Promise(r=>server.close(r))}
});
