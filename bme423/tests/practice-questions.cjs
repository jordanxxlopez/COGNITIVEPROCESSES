// Serve the repository root on port 8907. This test never writes a PDF.
const{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1450,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/bme423/?view=learnNow');
 const coverage=await p.evaluate(()=>{
  const issues=[];
  for(const problem of DATA.problems){
   const q=PRACTICE_QUESTIONS.questions[problem.id];
   if(!q||q.topic!==problem.topic||!q.context.trim()||!q.parts.length||!q.check)issues.push(problem.id+' incomplete question');
   const holder=document.createElement('div');holder.innerHTML=rapidQuestionHTML(problem);
   if(holder.querySelector('.katex-error')||/\\\[|\\\(|\$\$/.test(holder.innerText||holder.textContent))issues.push(problem.id+' raw math');
   if(!holder.querySelector('ol li'))issues.push(problem.id+' no written task');
  }
  for(const g of RAPID_PREP.groups){
   const pool=rapidPracticePool(g);
   if(pool.length<2||pool.some(x=>!g.topics.includes(x.topic)||x.id===g.worked))issues.push(g.id+' incorrect pool');
   if(new Set(pool.map(x=>PRACTICE_QUESTIONS.questions[x.id].fingerprint)).size!==pool.length)issues.push(g.id+' duplicate question wording and givens');
  }
  return {issues,questions:Object.keys(PRACTICE_QUESTIONS.questions).length,pools:RAPID_PREP.groups.map(g=>rapidPracticePool(g).length)};
 });assert.deepEqual(coverage.issues,[]);assert.equal(coverage.questions,224);
 await p.evaluate(()=>{state.notes.keep='I retain this personal note.';state.checks.push('prep:read:setup');save()});
 for(let index=0;index<8;index++){
  await p.locator('#rapidGroup').selectOption(String(index));
  const group=await p.evaluate(()=>{const g=RAPID_PREP.groups[rapidState().index];return{id:g.id,worked:g.worked,count:rapidPracticePool(g).length}});
  const first=await p.locator('[data-prep-practice]').getAttribute('data-prep-practice');
  await p.locator(`[data-note="problem:${first}"]`).fill('Setup and working for '+first);
  await p.locator(`[data-response="${first}"]`).fill('999');
  await p.locator(`[data-hint="${first}"]`).click();
  assert.equal(await p.locator('[data-prep-practice] .step').count(),1);
  await p.locator('[data-prep-another]').click();
  let next=await p.locator('[data-prep-practice]').getAttribute('data-prep-practice');assert.notEqual(next,first);
  assert.equal(await p.locator('[data-prep-practice] .step').count(),0,'new solution covered');
  assert.equal(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),group.worked);
  assert.equal(await p.locator('[data-prep-group]').getAttribute('data-prep-group'),group.id);
  assert.equal(await p.evaluate(()=>document.activeElement.id),'rapidPracticeHeading');
  const seen=await p.evaluate(()=>{
   const g=RAPID_PREP.groups[rapidState().index],pool=rapidPracticePool(g),seen=[rapidPracticeState(g).current];
   // Inspect successive selection state without rendering hundreds of full worked examples.
   for(let i=1;i<pool.length-1;i++){const q=rapidPracticeState(g);q.current=q.remaining.shift();seen.push(q.current)}
   return {ids:seen,remaining:rapidPracticeState(g).remaining};
  });
  assert.equal(new Set([first,...seen.ids]).size,group.count,'no repeat until group set is used');
  assert.equal(seen.remaining.length,0);
  await p.evaluate(()=>render());
  const previous=await p.locator('[data-prep-practice]').getAttribute('data-prep-practice');await p.locator('[data-prep-another]').click();
  assert.notEqual(await p.locator('[data-prep-practice]').getAttribute('data-prep-practice'),previous,'cycle boundary differs');
  next=await p.locator('[data-prep-practice]').getAttribute('data-prep-practice');
  const correct=await p.evaluate(id=>PROB.get(id).answer,next);
  await p.locator(`[data-response="${next}"]`).fill(String(correct));await p.locator(`[data-grade="${next}"]`).click();
  assert(await p.evaluate(id=>state.practice[id].correct,next),'canonical grading');
  await p.locator(`[data-solution="${next}"]`).click();assert(await p.locator('[data-prep-practice] [data-integrated-step] .katex').count());
  assert.equal(await p.locator('.katex-error').count(),0);
  await p.reload();assert.equal(await p.locator('[data-prep-practice]').getAttribute('data-prep-practice'),next);
  assert.equal(await p.evaluate(id=>state.drafts[id],first),'999');
  assert.equal(await p.evaluate(id=>state.notes['problem:'+id],first),'Setup and working for '+first);
  assert.equal(await p.locator(`[data-response="${next}"]`).inputValue(),String(correct));
 }
 assert.equal(await p.evaluate(()=>state.notes.keep),'I retain this personal note.');assert(await p.evaluate(()=>state.checks.includes('prep:read:setup')));
 // All question presentations render on a narrow screen without changing the page width.
 await p.setViewportSize({width:390,height:844});
 for(const mode of ['light','dark']){
  await p.evaluate(mode=>{state.theme=mode;applyAppearance()},mode);
  const wide=await p.evaluate(()=>{
   const box=document.createElement('div');box.className='card';document.querySelector('#content').append(box);const issues=[];
   for(const problem of DATA.problems){box.innerHTML=rapidQuestionHTML(problem);if(document.documentElement.scrollWidth>innerWidth)issues.push(problem.id)}
   box.remove();return issues;
  });assert.deepEqual(wide,[],'mobile question containment');
 }
 await p.setViewportSize({width:1450,height:1000});await p.evaluate(()=>{state.theme='light';rapidState().index=4;go('learnNow')});
 await p.locator('#rapidPracticeHeading').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/bme-practice-question-desktop.png'});
 await p.setViewportSize({width:390,height:844});await p.locator('[data-prep-practice]').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/bme-practice-question-mobile.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS: 224 full question frames; 8 bounded practice pools; no repeats within each set or at cycle boundaries; canonical grading/equations; covered new solutions; persisted selections, drafts, notes and progress; light/dark mobile layout. Pool sizes: '+coverage.pools.join(', '));
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
