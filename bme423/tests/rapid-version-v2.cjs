// Serve repository root on port 8907. No content or PDF is regenerated.
const{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await browser.newPage({viewport:{width:1450,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/bme423/?view=learnNow&learnVersion=2');
 assert.equal(await p.locator('#rapidLearningVersion').inputValue(),'2');
 await p.evaluate(()=>{state.notes.keep='I keep these notes.';state.drafts['mean-1']='1.2';state.checks.push('prep:read:setup');save()});
 for(let index=0;index<8;index++){
  await p.locator('#rapidGroup').selectOption(String(index));
  const original=await p.evaluate(()=>RAPID_PREP.groups[rapidState().index].worked);
  assert.equal(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),original);
  assert.equal(await p.locator(`[data-prep-worked] [data-question-frame="${original}"]`).count(),1);
  assert(await p.locator('[data-prep-worked] .rapid-question-parts li').count());
  assert(await p.locator('[data-prep-worked] [data-integrated-step] .katex').count());
  const full=await p.locator('[data-prep-worked]').evaluate(e=>['.steps','.shortcut'].map(s=>e.querySelector(s).innerHTML));
  const practice=await p.locator('[data-prep-practice]').getAttribute('data-prep-practice');
  await p.locator('#rapidLearningVersion').selectOption('1');
  assert.equal(await p.locator('[data-prep-another-worked]').count(),0);
  assert.equal(await p.locator('[data-prep-worked] .rapid-exam-question').count(),1);
  assert.equal(await p.locator(`[data-prep-worked] [data-question-frame="${original}"]`).count(),1);
  assert.deepEqual(await p.locator('[data-prep-worked]').evaluate(e=>['.steps','.shortcut'].map(s=>e.querySelector(s).innerHTML)),full,'identical givens/equations/steps/shortcut');
  assert.equal(await p.locator('[data-prep-practice]').getAttribute('data-prep-practice'),practice);
  await p.locator('#rapidLearningVersion').selectOption('2');
  await p.locator('[data-prep-another-worked]').click();
  const changed=await p.locator('[data-prep-worked]').getAttribute('data-prep-worked');assert.notEqual(changed,original);assert.notEqual(changed,practice);
  assert.equal(await p.evaluate(()=>document.activeElement.id),'rapidWorkedHeading');
  assert.equal(await p.locator(`[data-prep-worked] [data-question-frame="${changed}"]`).count(),1);
  assert(await p.locator('[data-prep-worked] .step').count());
  const numbers=await p.locator('[data-prep-worked] .steps').innerHTML();
  assert.equal(numbers,await p.evaluate(id=>{const el=document.createElement('div');el.innerHTML=stepsHTML(PROB.get(id));return el.querySelector('.steps').innerHTML},changed));
  await p.reload();assert.equal(await p.locator('#rapidLearningVersion').inputValue(),'2');assert.equal(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),changed);
  for(let i=0;i<3;i++){await p.locator('[data-prep-another]').click();assert.notEqual(await p.locator('[data-prep-practice]').getAttribute('data-prep-practice'),changed)}
  await p.locator('#rapidLearningVersion').selectOption('1');assert.equal(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),original);
  await p.reload();assert.equal(await p.locator('#rapidLearningVersion').inputValue(),'1');
  await p.locator('#rapidLearningVersion').selectOption('2');assert.equal(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),changed);
  assert.equal(await p.locator('.katex-error').count(),0);
 }
 // Exercise a complete example set and its boundary through the actual control.
 await p.locator('#rapidGroup').selectOption('4');
 const cycle=await p.evaluate(()=>{const g=RAPID_PREP.groups[rapidState().index];delete rapidState().examples[g.id];render();return rapidExamplePool(g).length});
 const seen=new Set([await p.locator('[data-prep-worked]').getAttribute('data-prep-worked')]);
 for(let i=1;i<cycle;i++){await p.locator('[data-prep-another-worked]').click();const id=await p.locator('[data-prep-worked]').getAttribute('data-prep-worked');assert(!seen.has(id),'no repeated example before set exhausted');seen.add(id)}
 const last=await p.locator('[data-prep-worked]').getAttribute('data-prep-worked');await p.locator('[data-prep-another-worked]').click();assert.notEqual(await p.locator('[data-prep-worked]').getAttribute('data-prep-worked'),last);
 assert.equal(await p.evaluate(()=>state.notes.keep),'I keep these notes.');assert.equal(await p.evaluate(()=>state.drafts['mean-1']),'1.2');assert(await p.evaluate(()=>state.checks.includes('prep:read:setup')));
 await p.setViewportSize({width:390,height:844});
 for(const mode of ['light','dark']){
  await p.evaluate(mode=>{state.theme=mode;applyAppearance()},mode);
  for(let i=0;i<8;i++){await p.locator('#rapidGroup').selectOption(String(i));assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile example overflow')}
 }
 await p.setViewportSize({width:1450,height:1000});await p.evaluate(()=>{state.theme='light';rapidState().index=4;delete rapidState().examples.means;render()});
 await p.locator('[data-prep-worked]').evaluate(el=>el.scrollIntoView({block:'start'}));await p.screenshot({path:'/tmp/bme-learn-v2-worked.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS: both learning versions; all 8 full-question worked examples; identical numerical work and equations; independent example rotation without repetition or practice overlap; version/example persistence; saved notes/drafts/progress; light/dark mobile layout.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
