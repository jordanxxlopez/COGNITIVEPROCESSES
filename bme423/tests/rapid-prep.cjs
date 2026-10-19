// Serve repository root on port 8907. Does not regenerate any course content/PDF.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1450,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const base='http://localhost:8907/bme423/';
 await p.goto(base+'?view=learnNow');assert.equal(await p.locator('h1').innerText(),'Learn these methods');
 assert.equal(await p.locator('nav [data-view="learnNow"]').count(),1);assert.equal(await p.locator('nav [data-view="checkNow"]').count(),1);
 await p.evaluate(()=>{state.notes.keep='Keep my original notes';state.read=['summary'];state.examDone.A=true;save()});
 const audit=await p.evaluate(()=>{
  const failures=[],covered=new Set(RAPID_PREP.groups.flatMap(g=>g.topics));
  for(const t of V2.priorities)if(t.score>=10&&!t.excluded&&!covered.has(t.topic))failures.push('missing review priority '+t.topic);
  if(covered.has('power')||covered.has('anovaSS'))failures.push('excluded method included');
  for(const g of RAPID_PREP.groups){
   if(!PROB.has(g.worked)||!PROB.has(g.practice)||g.worked===g.practice)failures.push('bad examples '+g.id);
   for(const r of g.patterns){for(const key of r.rules)equationRules([key]);if(r.problem&&!PROB.has(r.problem))failures.push('missing example');if(r.lesson&&!LES.has(r.lesson))failures.push('missing lesson')}
  }
  return failures;
 });assert.deepEqual(audit,[]);
 const groups=await p.evaluate(()=>RAPID_PREP.groups.map(g=>({id:g.id,worked:g.worked,practice:g.practice,answer:PROB.get(g.practice).answer})));
 for(let i=0;i<groups.length;i++){
  const g=groups[i];await p.locator('#rapidGroup').selectOption(String(i));
  assert.equal(await p.locator('[data-prep-group]').getAttribute('data-prep-group'),g.id);
  assert.equal(await p.locator('.rapid-navigation').count(),2);
  if(i===0)assert(await p.locator('[data-prep-move="-1"]').first().isDisabled());
  if(i===groups.length-1)assert(await p.locator('[data-prep-move="1"]').first().isDisabled());
  assert.equal(await p.locator('.katex-error').count(),0);
  const workAudit=await p.locator('[data-prep-worked] .step').evaluateAll(steps=>steps.every(step=>{
   const formula=step.querySelector('[data-equation-rule]'),math=step.querySelector('.worked-math');
   return !formula||Boolean(formula.compareDocumentPosition(math)&Node.DOCUMENT_POSITION_FOLLOWING);
  }));assert(workAudit,g.id+' formula must precede substitution');
  await p.locator(`[data-hint="${g.practice}"]`).click();
  assert.equal(await p.locator(`#ans-${g.practice}`).count(),1);
  const partial=await p.evaluate(id=>{const n=[...document.querySelectorAll('[data-hint]')].find(b=>b.dataset.hint===id).closest('.card');return n.querySelectorAll('.step').length},g.practice);assert.equal(partial,1);
  await p.locator(`[data-solution="${g.practice}"]`).click();
  assert.equal(await p.locator('.katex-error').count(),0);
  await p.locator(`[data-response="${g.practice}"]`).fill(String(g.answer));await p.locator(`[data-grade="${g.practice}"]`).click();
  assert(await p.evaluate(id=>state.practice[id].correct,g.practice));
  await p.locator(`[data-note="problem:${g.practice}"]`).fill('My setup and equation for '+g.id);
  await p.locator(`[data-prep-hide="${g.practice}"]`).click();
  assert.equal(await p.evaluate(id=>{const n=[...document.querySelectorAll('[data-hint]')].find(b=>b.dataset.hint===id).closest('.card');return n.querySelectorAll('.step').length},g.practice),0);
  await p.locator(`[data-checklist="prep:${g.id}:setup"]`).check();await p.locator(`[data-checklist="prep:${g.id}:try"]`).check();
  await p.waitForFunction(n=>document.querySelector('[data-prep-progress]').textContent.startsWith(n+' of'),i+1);
 }
 await p.reload();assert.equal(await p.locator('#rapidGroup').inputValue(),'7');assert((await p.locator('[data-prep-progress]').innerText()).startsWith('8 of'));
 assert.equal(await p.evaluate(()=>state.notes.keep),'Keep my original notes');assert(await p.evaluate(()=>state.examDone.A));
 await p.locator('[data-prep-resume]').click();assert.equal(await p.locator('#rapidGroup').inputValue(),'7');
 await p.locator('[data-prep-move="-1"]').first().click();assert.equal(await p.locator('#rapidGroup').inputValue(),'6');
 await p.locator('[data-prep-move="1"]').first().click();assert.equal(await p.locator('#rapidGroup').inputValue(),'7');
 await p.evaluate(()=>go('home'));assert.equal(await p.locator('.rapid-entry').count(),1);assert.equal(await p.locator('#study-group-0').count(),1);
 await p.evaluate(()=>go('minimum'));assert.equal(await p.locator('#content [data-view="learnNow"]').count(),1);assert(await p.locator('.minimum-item').count());
 await p.goto(base+'?view=checkNow');assert.equal(await p.locator('h1').innerText(),'Check understanding');assert.equal(await p.locator('.rapid-question').count(),6);
 assert.equal(await p.locator('.rapid-question .step').count(),0,'solutions covered');assert.equal(await p.locator('.rapid-question .answerbox').count(),0);
 await p.locator('[data-prep-detail="cue:0"] summary').click();assert(await p.locator('[data-prep-detail="cue:0"] .katex').count());
 await p.locator('[data-note="problem:discrete-2"]').fill('Weighted values first; square outcomes, not probabilities.');
 await p.locator('[data-prep-timer]').click();assert.equal(await p.locator('#clock').innerText(),'60:00');
 await p.locator('[data-prep-finish]').click();assert(await p.locator('.rapid-question .step').count());assert.equal(await p.locator('.katex-error').count(),0);
 await p.locator('[data-checklist="prep:check:0:setup"]').check();
 await p.locator('[data-prep-cover]').click();assert.equal(await p.locator('.rapid-question .step').count(),0);
 assert.equal(await p.locator('[data-note="problem:discrete-2"]').inputValue(),'Weighted values first; square outcomes, not probabilities.');
 await p.reload();assert.equal(await p.locator('.rapid-question .step').count(),0);
 await p.locator('[data-prep-repair="6"]').click();assert.equal(await p.locator('#rapidGroup').inputValue(),'6');
 await p.locator('#rapidGroup').selectOption('0');await p.screenshot({path:'/tmp/bme-rapid-learn.png',fullPage:false});
 for(const mode of ['dark','light']){
  await p.evaluate(m=>{state.theme=m;applyAppearance()},mode);await p.setViewportSize({width:390,height:844});
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'learning mobile overflow');
  await p.evaluate(()=>go('checkNow'));assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'check mobile overflow');
  await p.locator('[data-prep-finish]').click();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'solutions mobile overflow');
  await p.evaluate(()=>go('learnNow'));
 }
 await p.screenshot({path:'/tmp/bme-rapid-mobile.png',fullPage:false});
 // New route instructions contain no dated daily study schedule or score promise.
 const content=await p.locator('#content').innerText();assert(!/tonight|tomorrow|Sunday|Monday|guarantee|70.?80/i.test(content));
 assert.deepEqual(errors,[]);
 console.log('PASS: eight focused learning groups and all high-priority review topics; equations before work, hints/grading, hidden fresh practice, saved notes/progress, bounded navigation, both new direct links, six covered/revealed written checks, repair links, timer, old home/minimum retained, light/dark and mobile.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
