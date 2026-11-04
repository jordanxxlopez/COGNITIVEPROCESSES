// Serve the repository root on port 8907.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1450,height:1000}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://localhost:8907/bme423/?view=neuroWorked&problem=neuro-d-hw2-cognition');
  assert.equal(await page.locator('h1').innerText(),'Neuroscience worked examples · every step');
  const audit=await page.evaluate(()=>{
   const issues=[],box=document.createElement('div');let steps=0,figures=0;
   for(const p of NEURO_WORKED.problems){
    const q=questionFrame(p),original=VERSION_D.problems[p.originalId];
    if(p.answer!==PROB.get(p.originalId).answer||q.primaryAnswer!==original.primaryAnswer)issues.push(p.id+' answer changed');
    if(q.flow.length!==original.flow.length)issues.push(p.id+' steps lost');
    box.innerHTML=problemHTML(p,true);
    if(box.querySelectorAll('.step').length!==problemSteps(p).length)issues.push(p.id+' incomplete solution');
    if(box.querySelectorAll('[data-question-frame] > .teaching').length!==2)issues.push(p.id+' missing scenario');
    if(box.querySelectorAll('[data-question-frame] li').length<2)issues.push(p.id+' missing multipart questions');
    if(box.querySelector('.katex-error'))issues.push(p.id+' invalid math');
    if(box.querySelector('[data-note]').dataset.note!=='problem:'+p.id)issues.push(p.id+' notes collide');
    if(!q.synthetic||!p.source.includes('synthetic data'))issues.push(p.id+' mislabeled evidence');
    steps+=problemSteps(p).length;figures+=box.querySelectorAll('.worked-figure').length;
   }
   return {issues,cases:NEURO_WORKED.problems.length,topics:NEURO_WORKED.topics.length,steps,figures};
  });
  assert.deepEqual(audit.issues,[]);assert.equal(audit.cases,236);assert.equal(audit.topics,31);assert.equal(audit.steps,1399);
  // Topic changes, same-method variants, and the complete selector.
  assert.equal(await page.locator('#neuroProblemSelect option').count(),236);
  for(const topic of await page.evaluate(()=>NEURO_WORKED.topics)){
   await page.locator('#neuroTopic').selectOption(topic);
   const expected=await page.evaluate(topic=>NEURO_WORKED.problems.filter(p=>p.topic===topic).length,topic);
   assert.equal(await page.locator('#neuroProblemSelect option').count(),expected);
   const before=await page.locator('#neuroProblemSelect').inputValue();
   if(expected>1){await page.locator('#newNeuroProblem').click();assert.notEqual(await page.locator('#neuroProblemSelect').inputValue(),before)}
   else assert(await page.locator('#newNeuroProblem').isDisabled());
   assert.equal(await page.evaluate(()=>PROB.get(selectedNeuroProblem).topic),topic);
  }
  // The shared component provides real numerical grading and saved scratch work.
  await page.locator('#neuroTopic').selectOption('pooledt');await page.locator('#neuroProblemSelect').selectOption('neuro-d-hw2-cognition');
  const id='neuro-d-hw2-cognition',answer=await page.evaluate(id=>PROB.get(id).answer,id);
  await page.locator(`[data-response="${id}"]`).fill('99999');await page.locator(`[data-grade="${id}"]`).click();assert(await page.locator('.feedback.wrong').count());
  await page.locator(`[data-response="${id}"]`).fill(String(answer));await page.locator(`[data-grade="${id}"]`).click();
  assert(await page.evaluate(id=>state.practice[id].correct&&state.practice[id].revealed,id));
  await page.locator(`[data-note="problem:${id}"]`).fill('Compare the population mean visual-discrimination scores.');
  await page.evaluate(()=>{state.notes['problem:d-hw2-cognition']='Original notes stay separate.';save()});
  await page.reload();assert.equal(await page.locator(`[data-note="problem:${id}"]`).inputValue(),'Compare the population mean visual-discrimination scores.');
  assert.equal(await page.locator(`[data-response="${id}"]`).inputValue(),String(answer));
  assert.equal(await page.evaluate(()=>state.notes['problem:d-hw2-cognition']),'Original notes stay separate.');
  // Global older wording still works and never falls back to a medical story.
  for(const version of ['C','D']){
   await page.locator('[data-question-version-select]').selectOption(version);
   assert((await page.locator('[data-question-frame] h2').innerText()).includes('attention training'));
   const counts=await page.evaluate(()=>[problemPool().length,questionPool().length]);
   assert.deepEqual(counts,version==='D'?[236,339]:[224,327]);
  }
  // Original section, question ordering, and old notes remain accessible.
  await page.locator('[data-view="worked"]').click();assert(await page.locator('#problemSelect').count());
  await page.locator('#problemSelect').selectOption('d-hw2-cognition');
  assert.equal(await page.locator('[data-note="problem:d-hw2-cognition"]').inputValue(),'Original notes stay separate.');
  await page.locator('[data-view="neuroWorked"]').click();assert.equal(await page.locator('#neuroProblemSelect').inputValue(),id);
  // Every asset loads, strict KaTeX renders, and equations stay contained on phones.
  const figures=await page.evaluate(()=>[...new Set(Object.values(NEURO_WORKED.questions).flatMap(q=>q.flow.filter(s=>s.figure).map(s=>s.figure.src)))]);
  for(const src of figures){const response=await page.request.get('http://localhost:8907/bme423/'+src);assert(response.ok(),src)}
  await page.screenshot({path:'/tmp/bme-neuroscience-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  for(const mode of ['light','dark']){
   const overflows=await page.evaluate(mode=>{
    state.theme=mode;state.side=true;applyAppearance();const box=document.querySelector('#content'),bad=[];
    for(const p of NEURO_WORKED.problems){box.innerHTML=problemHTML(p,true);if(document.documentElement.scrollWidth>innerWidth+1)bad.push(p.id)}
    render();return bad;
   },mode);assert.deepEqual(overflows,[]);
  }
  await page.screenshot({path:'/tmp/bme-neuroscience-phone.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS:',JSON.stringify(audit),'topic/variant selectors; grading; note/draft isolation and persistence; C/D compatibility; unchanged practice/quiz pools; all figure assets; mobile light/dark containment.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exit(1)});
