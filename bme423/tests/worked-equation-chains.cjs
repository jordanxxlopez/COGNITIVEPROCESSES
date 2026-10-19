// Local server: python -m http.server 8907 from the repository root.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await b.newPage({viewport:{width:1500,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8907/bme423/?view=worked&problem=d-hw2-filgrastim');
 const audit=await page.evaluate(()=>{
  let examples=0,steps=0,math=0,sources=0,wrapped=0;const issues=[];
  for(const mode of ['D','C']){
   state.questionVersion=mode;
   const pool=mode==='D'?[...problemPool(),...NEURO_WORKED.problems]:DATA.problems;
   for(const p of pool){
    const original=NEURO_WORKED.questions[p.id]?.flow||(mode==='D'?VERSION_D.problems[p.id].flow:STUDIO_FLOWS.problems[p.id]);
    const flow=problemSteps(p);if(flow.length!==original.length)issues.push(p.id+' lost steps');
    flow.forEach((s,i)=>{
     const {math:newMath,...newRest}=s,{math:oldMath,...oldRest}=original[i];
     if(JSON.stringify(newRest)!==JSON.stringify(oldRest))issues.push(p.id+':'+i+' non-math change');
     for(const tex of s.math){const html=workedEquation(tex,problemHypothesis(p));if(!html.includes('katex'))issues.push(p.id+':'+i+' unrendered calculation');if(html.includes('katex-error'))issues.push(p.id+':'+i+' invalid equation');if(html.includes('worked-equation-chain'))wrapped++;math++}
     steps++;
    });examples++;
   }
   for(const key of Object.keys(V2.blocks)){const html=sourceWorked(key);if(html.includes('katex-error'))issues.push(mode+':'+key+' invalid Apply-it math');sources++}
  }
  state.questionVersion='D';return{examples,steps,math,sources,wrapped,issues};
 });
 assert.equal(audit.examples,696);assert.equal(audit.steps,4029);assert.equal(audit.sources,76);assert(audit.wrapped>2000);assert.deepEqual(audit.issues,[]);
 // No numerical explanation skips the named risks, every cell, or later pairs.
 const fil=await page.evaluate(()=>problemSteps(PROB.get('d-hw2-filgrastim')));
 for(let i=9;i<=11;i++)assert(fil[i].math[0].includes('\\bar x_')&&fil[i].math[0].includes('\\mathrm{SE}_{ij}'));
 const fol=await page.evaluate(()=>problemSteps(PROB.get('d-hw2-folate')));
 assert.equal(fol[1].math.length,4);assert.equal(fol[2].math.length,4);
 assert(fol[6].math[0].includes('\\frac{m_'));assert(fol[6].math[2].includes('\\frac{r_'));
 // Practice reveal and hint controls expose the same full worked content.
 await page.evaluate(()=>{selectedProblem='d-hw2-filgrastim';go('practice')});
 assert.equal(await page.locator('.steps').count(),0);
 await page.locator('[data-hint="d-hw2-filgrastim"]').click();
 assert.equal(await page.locator('.step').count(),1);
 await page.locator('[data-solution="d-hw2-filgrastim"]').click();
 assert.equal(await page.locator('.step').count(),13);
 await page.locator('[data-response="d-hw2-filgrastim"]').fill('3.383905');await page.locator('[data-grade="d-hw2-filgrastim"]').click();assert(await page.evaluate(()=>state.practice['d-hw2-filgrastim'].correct));
 const practiceHTML=await page.locator('.steps').innerHTML();await page.evaluate(()=>go('worked'));assert.equal(await page.locator('.steps').innerHTML(),practiceHTML);
 // Notes and input state survive the math-only update and a reload.
 await page.locator('[data-note="problem:d-hw2-filgrastim"]').fill('Use the original within variance for the pairs.');await page.reload();assert.equal(await page.locator('[data-note="problem:d-hw2-filgrastim"]').inputValue(),'Use the original within variance for the pairs.');
 // Numeric quiz feedback uses these same equation chains after reveal only.
 await page.evaluate(()=>{const q=questionPool().find(q=>q.problem==='d-hw2-filgrastim');quiz={items:prepareQuizItems([q]),answers:[],index:0,finished:false};go('quiz')});
 assert.equal(await page.locator('.feedback .steps').count(),0);await page.locator('#revealQ').click();assert.equal(await page.locator('.feedback .step').count(),13);assert(await page.locator('.feedback .worked-equation-chain').count());
 // Phone equations wrap at equalities rather than clip the result.
 await page.evaluate(()=>{quiz=null;selectedProblem='d-hw2-filgrastim';go('worked')});await page.setViewportSize({width:390,height:844});
 for(const mode of ['light','dark']){
  await page.evaluate(mode=>{state.theme=mode;applyAppearance()},mode);
  for(const id of ['d-hw2-filgrastim','d-hw2-folate','d-hw1-density','neuro-d-hw2-folate','mean']){
   await page.evaluate(id=>{if(id.startsWith('neuro-')){selectedNeuroProblem=id;go('neuroWorked')}else{selectedProblem=id;go('worked')}},id);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' document overflow');
  }
 }
 await page.evaluate(()=>{state.theme='dark';applyAppearance();selectedProblem='d-hw2-filgrastim';go('worked')});await page.locator('[data-integrated-step="9"]').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/bme-equations-phone-final.png'});
 const geometry=await page.locator('[data-integrated-step="9"] .equation-link').evaluateAll(es=>es.map(e=>({w:e.clientWidth,s:e.scrollWidth})));
 assert(geometry.every(e=>e.s<=e.w+1),'pair formula/result clipped');
 await page.setViewportSize({width:1500,height:1100});await page.evaluate(()=>{state.theme='light';applyAppearance()});await page.locator('[data-integrated-step="8"]').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/bme-equations-desktop-final.png'});
 assert.deepEqual(errors,[]);console.log('PASS:',JSON.stringify(audit),'shared practice/quiz solutions, preserved grading, saved notes, course and neuroscience context, mobile wrapping and light/dark layout.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
