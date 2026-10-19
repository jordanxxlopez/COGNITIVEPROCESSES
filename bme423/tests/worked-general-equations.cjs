const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8907/bme423/?view=worked&problem=d-hw2-folate');
 const audit=await page.evaluate(()=>{
  const issues=[],box=document.createElement('div');let cases=0,steps=0,generalSteps=0,generalEquations=0,sources=0;
  for(const mode of ['D','C']){
   state.questionVersion=mode;
   const pool=mode==='D'?[...problemPool(),...NEURO_WORKED.problems]:DATA.problems;
   for(const p of pool){
    const flow=problemSteps(p),mapped=WORKED_GENERAL[mode][p.id]||WORKED_GENERAL.D[p.id];box.innerHTML=stepsHTML(p);
    const rendered=[...box.querySelectorAll('.step')];if(flow.length!==rendered.length)issues.push(p.id+' missing calculation');
    rendered.forEach((step,i)=>{
     const work=step.querySelector('.worked-math'),keys=mapped[i],head=work.querySelector(':scope > .step-general-equations');
     if(keys.length){
      if(head!==work.firstElementChild)issues.push(p.id+':'+i+' general rule not first');
      if(head?.dataset.generalStep!==p.id+':'+i)issues.push(p.id+':'+i+' incorrect rule target');
      const exact=[...head.querySelectorAll('annotation[encoding="application/x-tex"]')].map(e=>e.textContent);
      if(JSON.stringify(exact)!==JSON.stringify(generalEquationList(keys)))issues.push(p.id+':'+i+' missing general formula');
      if(exact.some(t=>/c_\{\d\d\}|E_\{\d\d\}/.test(t)))issues.push(p.id+':'+i+' numbered cell in generic formula');
      generalSteps++;generalEquations+=exact.length;head.remove();
     }else if(head)issues.push(p.id+':'+i+' unnecessary general formula');
     // Removing only the new introduction recovers the full previous work.
     const expected=flow[i].math.map(t=>workedEquation(t,problemHypothesis(p))).join('')+stepReferenceHTML(p,i)+flow[i].text.map(t=>`<p>${rich(t)}</p>`).join('')+workedFigure(flow[i].figure);
     const old=document.createElement('div');old.innerHTML=expected;
     if(work.innerHTML!==old.innerHTML)issues.push(p.id+':'+i+' detailed work changed');
     steps++;
    });cases++;
   }
   for(const [key,html]of Object.entries(WORKED_CHAINS.sources[mode])){
    const added=sourceGeneralEquations(html,key),stripped=added.replace(/<div class="step-general-equations" data-general-source="[^"]+">[\s\S]*?<\/div>/g,'');
    if(stripped!==html)issues.push(mode+':'+key+' embedded work changed');
    const el=document.createElement('div');el.innerHTML=sourceWorked(key);if(el.querySelector('.katex-error'))issues.push(key+' invalid math');sources++;
   }
  }
  state.questionVersion='D';return {cases,steps,generalSteps,generalEquations,sources,issues};
 });
 assert.equal(audit.cases,696);assert.equal(audit.steps,4029);assert.equal(audit.generalSteps,3601);assert.equal(audit.sources,76);assert.deepEqual(audit.issues,[]);
 // Corrected and ordinary contributions both start with the applicable generic
 // equation, followed by every individual cell, never only a representative.
 const cells=await page.evaluate(()=>[...VERSION_D.extraCases,...DATA.problems].filter(p=>p.topic==='chi').map(p=>{
  const i=problemSteps(p).findIndex(s=>s.label==='Calculate each cell contribution'),keys=WORKED_GENERAL.D[p.id][i],formula=generalEquationList(keys).join(' '),cells=problemSteps(p)[i].math;
  return{id:p.id,corrected:JSON.parse(p.given['observed table']).length===2,formula,cells};
 }));
 for(const c of cells){assert(c.formula.includes('c_{ij}'));assert.equal(c.formula.includes('\\max'),c.corrected);assert(c.cells.every(t=>/^c_\{\d\d\}=/.test(t)))}
 const heading=page.locator('[data-integrated-step="2"] .step-general-equations');assert((await heading.locator('annotation').textContent()).includes('c_{ij}'));
 assert.equal(await page.locator('[data-integrated-step="2"] .worked-equation-chain').count(),4);
 await page.locator('[data-note="problem:d-hw2-folate"]').fill('Keep all four cells in the sum.');await page.reload();assert.equal(await page.locator('[data-note="problem:d-hw2-folate"]').inputValue(),'Keep all four cells in the sum.');
 await page.locator('[data-integrated-step="2"]').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/bme-general-equations-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 for(const theme of ['light','dark']){
  await page.evaluate(theme=>{state.theme=theme;applyAppearance()},theme);
  for(const id of ['d-hw2-folate','d-hw2-filgrastim','mean','d-hw1-density']){
   await page.evaluate(id=>{selectedProblem=id;go('worked')},id);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' mobile overflow');
  }
 }
 await page.evaluate(()=>{selectedProblem='d-hw2-folate';go('worked')});await page.locator('[data-integrated-step="2"]').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/bme-general-equations-phone.png'});
 assert.deepEqual(errors,[]);console.log('PASS:',JSON.stringify(audit),'every applicable generic equation precedes intact calculations; all chi-square cells remain; source solutions, notes, mobile layout and themes preserved.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
