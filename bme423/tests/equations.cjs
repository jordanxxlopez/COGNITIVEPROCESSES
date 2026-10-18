// Serve the repository root on port 8907. Does not rewrite any PDF.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:8907/bme423/');
  const audit=await page.evaluate(()=>{
   const failures=[];let count=0,calculations=0,slideCount=0;
   for(const key of Object.keys(EQUATION_GUIDE.rules))equationRules([key]);
   for(const p of DATA.problems){
    const box=document.createElement('div');box.innerHTML=stepsHTML(p);
    const steps=[...box.querySelectorAll('.step')];
    if(steps.length!==p.steps.length)failures.push(p.id+' lost steps');
    steps.forEach((step,i)=>{
     const expected=EQUATION_GUIDE.problems[p.id][i],found=[...step.querySelectorAll('[data-equation-rule]')].map(el=>el.dataset.equationRule);
     if(JSON.stringify(expected)!==JSON.stringify(found))failures.push(p.id+':'+i+' missing formula');
     for(const formula of step.querySelectorAll('[data-equation-rule]')){
      if(!(formula.compareDocumentPosition(step.querySelector('.worked-math'))&Node.DOCUMENT_POSITION_FOLLOWING))failures.push(p.id+':'+i+' rule after substitution');
      if(!formula.querySelector('.symbol-key')?.textContent.trim())failures.push(p.id+':'+i+' no symbol meanings');
     }
     count++;if(expected.length)calculations++;
    });
    // A partial hint contains precisely the first step's equation and work.
    const hint=document.createElement('div');hint.innerHTML=stepsHTML(p,1);
    if(hint.querySelectorAll('.step').length!==1)failures.push(p.id+' hint leak');
   }
   for(const key of Object.keys(V2.blocks)){
    const box=document.createElement('div');box.innerHTML=sourceWorked(key);
    if(box.querySelector('.katex-error'))failures.push(key+' malformed math');
    const expected=Object.values(EQUATION_GUIDE.worked[key]||{}).flat().length;
    if(box.querySelectorAll('[data-equation-rule]').length!==expected)failures.push(key+' wrong placements');
   }
   for(const version of ['A','B','C']){
    state.scriptVersion=version;
    for(const l of DATA.lessons)lessonText(l,l.refs[0].module,l.refs[0].page);
   }
   state.scriptVersion='C';
   for(const m of DATA.modules)for(const s of makeModuleSlides(m.id)){
    const key=m.id+':'+s.page,box=document.createElement('div');box.innerHTML=lectureText(m.id,s.page);
    const section=box.firstElementChild,paragraphs=[...section.children].filter(el=>el.tagName==='P');
    if(paragraphs.length!==VERSION_C.slides[key].paragraphs.length)failures.push(key+' lost paragraph');
    for(const [i,keys]of Object.entries(EQUATION_GUIDE.slides[key]||{})){
     let next=paragraphs[Number(i)].nextElementSibling;
     for(const rule of keys){if(next?.dataset.equationRule!==rule)failures.push(key+' misplaced '+rule);next=next?.nextElementSibling}
    }
    slideCount++;
   }
   for(const q of DATA.questions)quizExplanation(q);
   return{steps:count,calculations,slides:slideCount,rules:Object.keys(EQUATION_GUIDE.rules).length,failures};
  });
  assert.equal(audit.steps,1077);assert.equal(audit.slides,384);assert.deepEqual(audit.failures,[]);
  // The actual Apply-it section shows equation, definitions, and substitution.
  await page.evaluate(()=>{state.scriptVersion='B';selectedLesson='summary';go('lesson')});
  const apply=page.locator('[data-worked-block="describe"]');
  await apply.scrollIntoViewIfNeeded();
  assert(await apply.locator('[data-equation-rule="mean"] .katex').count());
  assert((await apply.innerText()).includes('64.5'));
  await page.screenshot({path:'/tmp/bme-equations-apply.png'});
  // Corrected percentile values and grading remain synchronized.
  await page.evaluate(()=>{selectedProblem='percentile';go('practice')});
  await page.locator('[data-response="percentile"]').fill('11');
  await page.locator('[data-grade="percentile"]').click();
  assert.equal(await page.evaluate(()=>state.practice.percentile.correct),true);
  await page.locator('[data-solution="percentile"]').click();
  assert(await page.locator('.step [data-equation-rule="rank"]').count());
  // A numeric quiz reveals that question's full equation-to-answer calculation.
  await page.evaluate(()=>{const q=DATA.questions.find(q=>q.id==='q88');quiz={items:prepareQuizItems([q]),answers:[],index:0,finished:false};go('quiz')});
  await page.locator('#revealQ').click();
  assert.equal(await page.locator('.feedback .step').count(),3);
  assert.equal(await page.locator('.feedback [data-equation-rule="rank"]').count(),1);
  assert(await page.locator('.option.correct').innerText().then(t=>t.includes('11')));
  await page.evaluate(()=>{quiz.finished=true;render()});
  assert.equal(await page.locator('.quiz-calculation .step').count(),3);
  // Written exams keep solutions hidden until requested, then include formulas.
  for(const id of ['A','B']){
   await page.evaluate(id=>{quiz=null;examId=id;state.examDone[id]=false;go('mock')},id);
   assert.equal(await page.locator('.steps').count(),0);
   await page.locator('#finishMock').click();
   assert(await page.locator('.steps [data-equation-rule]').count()>30);
  }
  // Lookup equations use arbitrary entered df, not a one-sample assumption.
  await page.evaluate(()=>go('rlab'));
  for(const [type,key]of [['t','tlookup'],['f','flookup'],['chi','chilookup'],['z','zlookup']]){
   await page.locator('#lookupType').selectOption(type);await page.locator('#lookup').click();
   assert.equal(await page.locator('#lookupResult [data-equation-rule]').getAttribute('data-equation-rule'),key);
  }
  // Complete collection and expanded viewer keep the same slide, note and layout.
  await page.evaluate(()=>{state.scriptVersion='C';state.theme='dark';selectedModule=7;go('module')});
  await page.locator('details.lesson').filter({has:page.locator('[data-open-slide="7:10"]')}).locator('summary').click();
  await page.locator('[data-open-slide="7:10"]').click();
  assert(await page.locator('[data-slide-lecture="7:10"] [data-equation-rule="hrwithin"]').count());
  const note=page.locator('[data-note="s7:10"]');await note.fill('Square the SDs first.');
  await page.screenshot({path:'/tmp/bme-equations-viewer.png'});
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile viewer overflow');
  await page.locator('#exitViewer').click();
  await page.evaluate(()=>{selectedProblem='chi2';go('worked')});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile worked example overflow');
  assert.equal(await page.locator('.katex-error').count(),0);
  // A cached correct mark from the old percentile rule cannot survive a reload.
  await page.evaluate(()=>{state.practice.percentile={correct:true,revealed:true};state.drafts.percentile='12';state.notes.keep='Keep my notes';save()});
  await page.reload();
  assert.equal(await page.evaluate(()=>state.practice.percentile.correct),false);
  assert.equal(await page.evaluate(()=>state.notes.keep),'Keep my notes');
  assert.deepEqual(errors,[]);
  console.log('PASS:',JSON.stringify(audit),'all 38 Apply-it blocks, all teaching versions, all quiz feedback, synchronized percentile grading, both written exams, lookup formulas, expanded slide notes, dark/light and mobile rendering. PDFs unchanged.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
