// Full Studio coverage, not only the focused learning route. No PDFs are written.
const{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1450,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/bme423/?questionVersion=C');
 const audit=await p.evaluate(()=>{
  const failures=[];let steps=0,slides=0;const holder=document.createElement('div');
  function check(html,label){holder.innerHTML=html;if(holder.querySelector('.katex-error'))failures.push(label+' malformed math');if(/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(holder.textContent))failures.push(label+' control character');return holder}
  for(const x of DATA.problems){
   const el=check(problemHTML(x,true),x.id),flow=STUDIO_FLOWS.problems[x.id];
   if(!el.querySelector(`[data-question-frame="${x.id}"] ol li`))failures.push(x.id+' incomplete question');
   if(el.querySelector('.given'))failures.push(x.id+' redundant raw-givens list');
   const all=[...el.querySelectorAll('.step')];if(all.length!==x.steps.length)failures.push(x.id+' missing steps');
   all.forEach((step,i)=>{if(step.querySelector('.equation-rule'))failures.push(x.id+' detached formula');if(!step.querySelector('.worked-math'))failures.push(x.id+' missing operation');if(flow[i].label!==x.steps[i].label)failures.push(x.id+' step order');steps++});
   if(check(stepsHTML(x,1),x.id+' hint').querySelectorAll('.step').length!==1)failures.push(x.id+' hint leak');
  }
  for(const key of Object.keys(V2.blocks)){const el=check(sourceWorked(key),key);if(!el.querySelector('[data-source-question] ol li')||!el.querySelector('.source-solution'))failures.push(key+' missing question or solution');if(el.querySelector('.equation-rule'))failures.push(key+' detached formula bank')}
  for(const version of ['A','B','C']){
   state.scriptVersion=version;
   for(const l of DATA.lessons){const el=check(lessonText(l,l.refs[0].module,l.refs[0].page),version+':'+l.id);if(V2.worked[l.id]&&!el.querySelector('[data-source-question]'))failures.push(version+':'+l.id+' missing question')}
  }
  state.scriptVersion='C';
  for(const m of DATA.modules)for(const s of makeModuleSlides(m.id)){const el=check(lessonText(LES.get(s.topic),m.id,s.page),m.id+':'+s.page);if(!el.querySelector(`[data-slide-lecture="${m.id}:${s.page}"]`))failures.push('missing lecture');slides++}
  for(const q of DATA.questions){const el=check(quizQuestionHTML(q)+quizExplanation(q),q.id);if(!el.querySelector(`[data-quiz-question="${q.id}"]`))failures.push(q.id+' missing quiz frame');if(q.problem&&!el.querySelector('[data-question-frame]'))failures.push(q.id+' bare numbers')}
  return{failures,steps,slides,problems:DATA.problems.length,sources:Object.keys(V2.blocks).length,questions:DATA.questions.length,lessons:DATA.lessons.length};
 });assert.deepEqual(audit.failures,[]);assert.equal(audit.steps,1077);assert.equal(audit.slides,384);assert.equal(audit.questions,327);
 // Every workspace's actual renderer must run with the same global presentation.
 const routes=await p.evaluate(()=>NAV.map(x=>x[0]));
 for(const view of routes){await p.evaluate(v=>go(v),view);assert.equal(await p.locator('.katex-error').count(),0,view)}
 for(const view of ['worked','practice','checkNow','mock']){
  await p.evaluate(v=>go(v),view);assert(await p.locator('[data-question-frame]').count(),view+' full question');
 }
 for(const id of ['A','B']){
  await p.evaluate(id=>{examId=id;state.examDone[id]=false;go('mock')},id);assert.equal(await p.locator('.steps').count(),0);
  assert(await p.locator('[data-question-frame] ol li').count());await p.locator('#finishMock').click();assert(await p.locator('[data-integrated-step]').count()>20);
 }
 // Real grading, step reveal, and notes survive the shared-renderer changes.
 await p.evaluate(()=>{selectedProblem='percentile';go('practice')});
 await p.locator('[data-response="percentile"]').fill('11');await p.locator('[data-grade="percentile"]').click();assert(await p.evaluate(()=>state.practice.percentile.correct));
 await p.locator('[data-hint="percentile"]').click();assert.equal(await p.locator('.step').count(),1);
 await p.locator('[data-solution="percentile"]').click();assert.equal(await p.locator('.step').count(),3);
 assert((await p.locator('.steps').innerText()).includes('5.5'));assert.equal(await p.locator('.step .equation-rule').count(),0);
 await p.locator('[data-note="problem:percentile"]').fill('Keep this personal note.');
 await p.evaluate(()=>{state.checks.push('keep-checked');save()});await p.reload();assert.equal(await p.evaluate(()=>state.notes['problem:percentile']),'Keep this personal note.');assert(await p.evaluate(()=>state.checks.includes('keep-checked')));
 // Numeric and conceptual quizzes, results, and missed queue use complete prompts.
 await p.evaluate(()=>{const q=DATA.questions.find(q=>q.id==='q105');quiz={items:prepareQuizItems([q]),answers:[],index:0,finished:false};go('quiz')});
 assert(await p.locator('[data-quiz-question] .katex').count());await p.locator('#revealQ').click();assert.equal(await p.locator('.feedback .step').count(),7);
 assert((await p.locator('.option.correct').innerText()).includes('-2.9008'));
 await p.evaluate(()=>{quiz.finished=true;render()});assert.equal(await p.locator('[data-quiz-question]').count(),1);
 await p.evaluate(()=>{state.missed=['q105','q2'];go('missed')});assert.equal(await p.locator('[data-quiz-question]').count(),2);
 for(const id of await p.evaluate(()=>DATA.modules.map(m=>m.id))){await p.evaluate(id=>{selectedModule=id;state.scriptVersion='B';go('module')},id);if(id!==14)assert(await p.locator('[data-source-question]').count(),String(id))}
 await p.evaluate(()=>{state.scriptVersion='C';openViewer(makeModuleSlides(8),14)});assert(await p.locator('[data-slide-lecture]').count());assert(await p.locator('[data-source-question]').count());
 await p.locator('.notes textarea').fill('Preserve slide note.');
 // All problems and all source blocks fit a phone's page width, even when the
 // equation itself has an intentional horizontal scroll container.
 await p.setViewportSize({width:390,height:844});
 for(const mode of ['light','dark']){
  await p.evaluate(mode=>{state.theme=mode;state.side=true;applyAppearance();selectedProblem='twot';go('worked')},mode);
  const overflow=await p.evaluate(()=>{const content=document.querySelector('#content'),issues=[];for(const x of DATA.problems){content.innerHTML=problemHTML(x,true);if(document.documentElement.scrollWidth>innerWidth+1)issues.push(x.id)}for(const key of Object.keys(V2.blocks)){content.innerHTML=sourceWorked(key);if(document.documentElement.scrollWidth>innerWidth+1)issues.push(key)}return issues});assert.deepEqual(overflow,[],mode+' overflow');
 }
 await p.setViewportSize({width:1450,height:1000});await p.evaluate(()=>{state.theme='light';selectedProblem='twot';go('worked')});await p.screenshot({path:'/tmp/bme-studio-full-questions-desktop.png',fullPage:true});
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>{state.theme='dark';go('worked')});await p.screenshot({path:'/tmp/bme-studio-full-questions-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS:',JSON.stringify(audit),'all workspace routes, both 90-minute exams, all collections/teaching versions, quiz/review/missed displays, reveal/grading/persistence and light/dark mobile layouts.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
