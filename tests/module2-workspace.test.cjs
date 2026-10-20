const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
for(const file of ['index.html','share.html']){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 const raw=html.match(/<script id="study-data" type="application\/json">(.*?)<\/script>/s)[1];
 const elements=new Map();
 const element=selector=>{if(!elements.has(selector))elements.set(selector,{dataset:{},textContent:'',innerHTML:'',value:'60',style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},setAttribute(){},querySelector(){return null},prepend(){},append(){}});return elements.get(selector)};
 const saved=JSON.stringify({read:['6:2'],personalNotes:{'6:2':'My existing note'},missed:[3001,2001,1,2999]});
 element('#study-data').textContent=raw;
 const context=vm.createContext({console,window:{scrollTo(){}},document:{querySelector:element,getElementById:id=>element('#'+id),querySelectorAll:()=>[],addEventListener(){},createElement:()=>element('created'),documentElement:element('root'),body:element('body')},localStorage:{getItem:()=>saved,setItem(){}},setInterval(){},Date,URL,Blob});
 vm.runInContext(fs.readFileSync(path.join(root,'module2-data.js'),'utf8'),context);
 const script=[...html.matchAll(/<script>(.*?)<\/script>/gs)][0][1];
 vm.runInContext(script,context);
 vm.runInContext(fs.readFileSync(path.join(root,'module2-workspace.js'),'utf8'),context);
 const run=code=>vm.runInContext(code,context);
 const count=run('secondHalf.questions.length');
 assert(count>0);assert.equal(run('Q.length'),208+count);assert(!run('state.missed.includes(2999)'));
 assert.equal(run('state.personalNotes["6:2"]'),'My existing note');
 assert(run('state.missed.includes(3001)'));assert(!run('state.missed.includes(2001)'));
 for(const [id] of run('secondTools')){
  run(`go('${id}')`);
  assert.match(element('#content').innerHTML,/MODULE 2/);
  assert.doesNotMatch(element('#content').innerHTML,/Short-term memory excluded|100-question practice exam/);
 }
 run("go('module',6)");
 assert.match(element('#content').innerHTML, /09 · Short-Term Memory/);
 const nav=element('#workspaceNav').innerHTML;
 assert(nav.indexOf('Your workspace')<nav.indexOf('Individual collections'));
 assert(nav.indexOf('data-view="m2test"')<nav.indexOf('Individual collections'));
 assert(nav.indexOf('Individual collections')<nav.indexOf('data-module="6"'));
 assert.match(nav, /navnum">09/);
 assert.equal(run('moduleBy(6).sections.filter(s=>s.examPriorityE.mustKnow).length'),20);
 assert.equal(run('secondCoreModule().sections.length'),34);
 run("go('module',9)");
 assert.match(element('#content').innerHTML,/10 · Working Memory/);
 assert.match(element('#workspaceNav').innerHTML,/navnum">10/);
 assert.doesNotMatch(element('#moduleNav').innerHTML,/data-module="9"/);
 assert.equal(run('moduleBy(9).sections.length'),20);
 assert.equal(run('moduleBy(9).original.length'),22);
 assert.match(run('header(moduleBy(9))'),/sources\/PSYCH301_L12_Working_Memory_F26_2.pdf/);
 assert(run('secondQuestions().some(q=>!moduleBy(q.module).sections.find(s=>s.page===q.page).examPriorityE?.mustKnow)'));
 assert(!run('moduleBy(6).sections[0].examPriorityE.mustKnow'));
 assert.match(element('#content').innerHTML,/class="priority-e"/);
 run("go('module',6)");
 run("mode='teach';teachIndex=moduleBy(6).sections.findIndex(s=>s.examPriorityE.mustKnow);render()");
 assert.match(element('#content').innerHTML,/Must know · core review/);
 run("go('m2combined')");assert.match(element('#content').innerHTML,/class="priority-e"/);
 run("go('m2core')");assert.match(element('#content').innerHTML,/data-second-core-expand/);
 assert.equal((element('#content').innerHTML.match(/class="priority-e"/g)||[]).length,run('secondCoreModule().sections.length'));
 run("view='m2coreExpanded';teachIndex=0;render()");assert.match(element('#content').innerHTML,/data-personal-note="6:3"/);
 assert.match(element('#content').innerHTML,/class="priority-e"/);
 run('exitExpandedView()');assert.equal(run('view'),'m2core');
 run("view='m2experimentsExpanded';teachIndex=secondExperimentModule().sections.findIndex(s=>s.noteKey==='9:8');render()");
 assert.match(element('#content').innerHTML,/data-personal-note="9:8"/);
 assert.match(element('#content').innerHTML,/Conrad/);
 assert.equal(run('secondExperimentModule().sections.at(-1).noteKey'),'9:22');
 run('exitExpandedView()');assert.equal(run('view'),'m2experiments');
 run("go('m2test');startQuiz('m2all')");
 assert.equal(run('quiz.items.length'),100);
 assert(run('quiz.items.every(q=>secondHalf.modules.includes(q.module) && moduleBy(q.module).sections.some(s=>s.page===q.page))'));
 assert.equal(run('quiz.items.filter(q=>q.module===6).length'),50);
 assert.equal(run('quiz.items.filter(q=>q.module===9).length'),50);
 assert(run('validateAnswerKey(quiz.items)'));
 run('answer(quiz.items[0].correct)');assert.equal(run('quiz.answers.length'),1);
 run("go('m2missed');startQuiz('m2missed')");assert(run('quiz.items.every(q=>secondHalf.modules.includes(q.module))'));
 run("go('missed');startQuiz('missed')");assert(run('quiz.items.every(q=>!secondHalf.modules.includes(q.module))'));
 run("go('module',6);startQuiz('moduleall')");assert.match(run('quiz.kind'),/^m2/);
 assert.equal(run('quiz.items.length'),50);assert(run('quiz.items.every(q=>q.module===6)'));
 run("go('module',9);startQuiz('moduleall')");assert.equal(run('quiz.items.length'),50);assert(run('quiz.items.every(q=>q.module===9)'));
 run("startQuiz('m2quick')");assert.equal(run('quiz.items.length'),10);
 assert.equal(run('quiz.items.filter(q=>q.module===9).length'),5);
 assert(run('validateAnswerKey(quiz.items)'));
 run('quiz.finished=true');assert.match(run('results()'),/data-view="m2test"/);
 const ids=run('secondQuestions().map(q=>q.id)');assert.equal(new Set(ids).size,count);
 for(const q of run('secondQuestions()')){assert.equal(q.options.length,4);assert(q.why.length>20);assert.equal(new Set(q.options).size,4)}
 // Future lectures change quotas without changing the 100-question total.
 run('globalThis.originalModuleIds=[...secondHalf.modules]');
 for(const n of [2,3,4,6]){
  run(`secondHalf.modules=Array.from({length:${n}},(_,i)=>100+i);globalThis.fixture=secondHalf.modules.flatMap(id=>Array.from({length:60},(_,i)=>({id:id*1000+i,module:id})))`);
  const extraLectures=new Set();
  for(let attempt=0;attempt<30;attempt++){
   run('globalThis.sample=balancedSecondQuestions(fixture,100)');
   assert(run('validateSecondBalance(sample,100)'));
   if(100%n)for(const id of run(`secondHalf.modules.filter(id=>sample.filter(q=>q.module===id).length===${Math.ceil(100/n)})`))extraLectures.add(id);
  }
  if(100%n)assert.equal(extraLectures.size,n,'Remainder is not fixed to one lecture');
 }
 assert.throws(()=>run('balancedSecondQuestions([],100)'),/Add source-based questions/);
 run('secondHalf.modules=originalModuleIds');
 console.log(`PASS ${file}: all Module 2 views, full test, source anchors, answer flow, isolated retry queues, retained notes and saved misses.`);
}
