// Serve the repository root on port 8907. No source material or PDF is rewritten.
const{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1450,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/bme423/?view=learnNow&questionVersion=D');
 assert.equal(await p.locator('[data-question-version-select]').inputValue(),'D');
 const audit=await p.evaluate(()=>{
  let issues=[],steps=0,slides=0;const box=document.createElement('div');
  for(const x of problemPool()){
   box.innerHTML=problemHTML(x,true);const q=VERSION_D.problems[x.id];
   if(box.querySelectorAll('[data-question-frame] > .teaching').length<2)issues.push(x.id+' missing clinical/probability scenario');
   if(box.querySelectorAll('[data-question-frame] li').length<2)issues.push(x.id+' missing multipart task');
   if(box.querySelectorAll('.step').length!==problemSteps(x).length)issues.push(x.id+' incomplete solution');
   if(box.querySelector('.katex-error')||box.querySelector('.step .equation-rule'))issues.push(x.id+' malformed or detached math');
   steps+=problemSteps(x).length;
  }
  for(const key of Object.keys(VERSION_D.sources)){box.innerHTML=sourceWorked(key);if(!box.querySelector('[data-source-question] li')||box.querySelector('.katex-error'))issues.push(key+' invalid source case')}
  for(const q of questionPool()){
   box.innerHTML=quizQuestionHTML(q)+quizExplanation(q);if(!box.querySelector('[data-quiz-question] ol li'))issues.push(q.id+' still short prompt');
  }
  for(const mode of ['A','B','C']){state.scriptVersion=mode;for(const l of DATA.lessons)lessonText(l,l.refs[0].module,l.refs[0].page)}
  state.scriptVersion='C';for(const m of DATA.modules)for(const slide of makeModuleSlides(m.id)){lessonText(LES.get(slide.topic),m.id,slide.page);slides++}
  for(let i=0;i<100;i++){const items=prepareQuizItems(questionPool());if(!validateAnswerKey(items))issues.push('repeated adjacent answer key');for(const q of items)if(q.options[q.correct]!==questionPool().find(x=>x.id===q.id).options[q.correct])issues.push('desynchronized choice')}
  return{issues,steps,slides,cases:problemPool().length,quizzes:questionPool().length};
 });assert.deepEqual(audit.issues,[]);assert.equal(audit.steps,1399);assert.equal(audit.cases,236);assert.equal(audit.quizzes,339);assert.equal(audit.slides,384);
 // Starting examples are actual homework/lecture workloads in every method group.
 for(let i=0;i<8;i++){
  await p.locator('#rapidGroup').selectOption(String(i));const expected=await p.evaluate(()=>VERSION_D.preferred[RAPID_PREP.groups[rapidState().index].id]);
  assert.equal(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),expected);
  const before=await p.locator('[data-prep-practice]').getAttribute('data-prep-practice');await p.locator('[data-prep-another]').click();assert.notEqual(await p.locator('[data-prep-practice]').getAttribute('data-prep-practice'),before);
  await p.locator('[data-prep-another-worked]').click();assert.notEqual(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),expected);
 }
 // Version state, old wording and existing notes are retained independently.
 await p.evaluate(()=>{state.notes.keep='Retain this note';state.quickPrep={index:2,details:{},solutions:false};save()});
 await p.locator('[data-question-version-select]').selectOption('C');assert.equal(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),'density');
 assert.equal(await p.evaluate(()=>problemPool().length),224);await p.reload();assert.equal(await p.locator('[data-question-version-select]').inputValue(),'C');
 await p.locator('[data-question-version-select]').selectOption('D');assert.equal(await p.evaluate(()=>problemPool().length),236);assert.equal(await p.evaluate(()=>state.notes.keep),'Retain this note');
 // Both exam versions cover eight whole cases, with separate reveal/completion state.
 for(const id of ['A','B']){
  await p.evaluate(id=>{examId=id;state.examDone[id]=true;state.examDone['D-'+id]=false;go('mock')},id);
  assert.equal(await p.locator('.exam-question').count(),8);assert.equal(await p.locator('.steps').count(),0);
  assert(await p.locator('[data-question-version="D"] ol li').count()>25);await p.locator('#finishMock').click();assert(await p.locator('.step').count()>40);
  assert(await p.evaluate(id=>state.examDone['D-'+id],id));await p.locator('#resetMock').click();assert.equal(await p.locator('.steps').count(),0);
 }
 // Actual homework input grading and complete step-by-step reveal.
 await p.evaluate(()=>{selectedProblem='d-hw2-cognition';go('practice')});const answer=await p.evaluate(()=>PROB.get(selectedProblem).answer);
 await p.locator('[data-response="d-hw2-cognition"]').fill(String(answer));await p.locator('[data-grade="d-hw2-cognition"]').click();assert(await p.evaluate(()=>state.practice['d-hw2-cognition'].correct));
 const number=await p.evaluate(()=>problemSteps(PROB.get(selectedProblem)).length);for(let i=1;i<=number;i++){await p.locator('[data-hint="d-hw2-cognition"]').click();assert.equal(await p.locator('.step').count(),i)}
 // A new course-case quiz has the full written question, scratch notes and a
 // synchronized displayed answer; old and new pools both retain key validation.
 await p.evaluate(()=>{const q=VERSION_D.extraQuizItems.find(q=>q.problem==='d-hw2-folate');quiz={items:prepareQuizItems([q]),answers:[],index:0,finished:false};go('quiz')});
 assert(await p.locator('[data-quiz-question] li').count()>=3);await p.locator('[data-note="quiz:dq-d-hw2-folate"]').fill('Use no folate / folate.');
 const choice=await p.evaluate(()=>quiz.items[0].correct);await p.locator(`[data-answer="${choice}"]`).click();assert(await p.locator('.option.correct').count());assert((await p.locator('.feedback').innerText()).includes('6.107'));
 for(let i=0;i<10;i++){await p.evaluate(()=>startQuiz(100));assert(await p.evaluate(()=>quiz.items.length===100&&validateAnswerKey(quiz.items)))}
 // Every workspace route and all collections render without losing source notes.
 for(const route of await p.evaluate(()=>NAV.map(([id])=>id)))await p.evaluate(route=>go(route),route);
 for(const id of await p.evaluate(()=>DATA.modules.map(m=>m.id))){await p.evaluate(id=>{selectedModule=id;state.scriptVersion='B';go('module')},id);if(id!==14)assert(await p.locator('[data-source-question]').count())}
 await p.evaluate(()=>{state.scriptVersion='C';openViewer(makeModuleSlides(8),14)});assert.equal(await p.locator('.viewer-controls [data-question-version-select]').inputValue(),'D');await p.locator('[data-note="s8:15"]').fill('Keep the signed difference.');
 await p.setViewportSize({width:390,height:844});
 for(const theme of ['light','dark']){
  await p.evaluate(theme=>{state.theme=theme;state.side=true;applyAppearance();selectedProblem='d-hw2-folate';go('worked')},theme);
  const overflow=await p.evaluate(()=>{const box=document.querySelector('#content'),bad=[];for(const x of problemPool()){box.innerHTML=problemHTML(x,true);if(document.documentElement.scrollWidth>innerWidth+1)bad.push(x.id)}return bad});assert.deepEqual(overflow,[]);
 }
 await p.setViewportSize({width:1450,height:1000});await p.evaluate(()=>{state.theme='light';selectedProblem='d-hw2-cognition';go('worked')});await p.screenshot({path:'/tmp/bme-version-d-homework-desktop.png',fullPage:true});
 await p.evaluate(()=>{selectedProblem='d-hw1-density';go('worked')});await p.screenshot({path:'/tmp/bme-version-d-density.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS:',JSON.stringify(audit),'full-case D questions in every route; 12 actual course cases; eight preferred examples; old-version and notes persistence; both exam reveal states; grading/hints; scratch notes; validated random keys; source viewer; mobile light/dark containment.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
