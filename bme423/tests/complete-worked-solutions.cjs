const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1450,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/bme423/?view=worked&problem=bonf');
 const audit=await p.evaluate(()=>{
  const issues=[];let changed=0,removed=0,pairCount=0;
  for(const problem of [...problemPool(),...NEURO_WORKED.problems]){
   const context=workedSolutionContext(problem),flow=problemSteps(problem),start=context.indices[0];
   if(!start){if(flow.length!==context.flow.length)issues.push(problem.id+' unrelated solution changed');continue}
   changed++;removed+=start;
   const labels=flow.map(s=>s.label),k=flow[0].values.k,pairs=flow.filter(s=>/^Groups \d+ and \d+$/.test(s.label));pairCount+=pairs.length;
   if(labels.filter(s=>s==='Requested family and adjusted level').length!==1||labels.filter(s=>s==='Common pair standard error').length!==1||pairs.length!==k||labels.filter(s=>s==='Family conclusion').length!==1||flow.length!==k+3)issues.push(problem.id+' duplicate or incomplete walkthrough');
   for(const step of pairs){
    if(!step.math[0].includes('\\bar x_')||!step.math[0].includes('\\mathrm{SE}_{ij}')||step.math[0].split('=').length<4||!step.text.length)issues.push(problem.id+' missing labeled pair work/decision');
   }
   if(!flow[0].math.some(t=>t.includes('\\alpha_{\\mathrm{tail}}')))issues.push(problem.id+' lost per-tail calculation');
   const box=document.createElement('div');box.innerHTML=stepsHTML(problem);
   if(box.querySelectorAll('.step').length!==k+3)issues.push(problem.id+' repeated rendered answer');
   if(box.querySelectorAll('.step-general-equations').length!==k+2)issues.push(problem.id+' missing general introduction');
   if(box.textContent.includes('pooled two-sample df'))issues.push(problem.id+' wrong ANOVA df reference');
   if(!box.textContent.includes('original ANOVA residual df'))issues.push(problem.id+' missing original residual df');
   const uniqueLabels=[...box.querySelectorAll('.step h4')].map(e=>e.textContent.replace(/^\d+\. /,''));if(new Set(uniqueLabels).size!==uniqueLabels.length)issues.push(problem.id+' duplicate step title');
  }
  for(const id of ['halothane-se','neuro-halothane-se']){
   const flow=problemSteps(PROB.get(id)),sd=flow.flatMap(s=>s.math).filter(t=>t.startsWith('\\widehat{\\operatorname{SD}}(X)='));
   if(sd.length!==1||!flow.at(-1).math.some(t=>t.includes('\\mathrm{SE}_{4n}')))issues.push(id+' repeated SD or missing new sample-size work');
  }
  for(const mode of ['D','C']){
   const html=WORKED_CHAINS.sources[mode].large;
   for(const cell of ['11','12','21','22','31','32'])if((html.match(new RegExp('E_\\{'+cell+'\\}=', 'g'))||[]).length!==1)issues.push(mode+' expected cell '+cell+' omitted/repeated');
  }
  // Historical wording has only one short solution and remains unchanged.
  state.questionVersion='C';for(const problem of problemPool()){const context=workedSolutionContext(problem);if(context.indices.length!==context.flow.length)issues.push(problem.id+' older solution shortened')}
  state.questionVersion='D';return{changed,removed,pairCount,issues};
 });
 assert.equal(audit.changed,50);assert.equal(audit.removed,154);assert(audit.pairCount>=150);assert.deepEqual(audit.issues,[]);
 // All six numbered steps form one solution, revealed in order by the actual UI.
 await p.evaluate(()=>{selectedProblem='bonf';go('practice')});assert.equal(await p.locator('.step').count(),0);
 for(let i=1;i<=6;i++){await p.locator('[data-hint="bonf"]').click();assert.equal(await p.locator('.step').count(),i)}
 await p.locator('[data-hint="bonf"]').click();assert.equal(await p.locator('.step').count(),6);
 await p.locator('[data-response="bonf"]').fill('3.162278');await p.locator('[data-grade="bonf"]').click();assert(await p.evaluate(()=>state.practice.bonf.correct));
 await p.locator('[data-note="problem:bonf"]').fill('Only the 1 versus 3 pair differs.');await p.reload();assert.equal(await p.locator('[data-note="problem:bonf"]').inputValue(),'Only the 1 versus 3 pair differs.');
 await p.evaluate(()=>{selectedProblem='bonf';go('worked')});assert.equal(await p.locator('.step').count(),6);await p.locator('.steps').screenshot({path:'/tmp/bme-single-complete-bonferroni.png'});
 // The same correction appears in quiz feedback, without revealing work early.
 await p.evaluate(()=>{const q=questionPool().find(q=>q.problem==='bonf');quiz={items:prepareQuizItems([q]),answers:[],index:0,finished:false};go('quiz')});assert.equal(await p.locator('.steps').count(),0);await p.locator('#revealQ').click();assert.equal(await p.locator('.feedback .step').count(),6);
 // Neuroscience selection remains complete even under the older question selector.
 await p.evaluate(()=>{quiz=null;state.questionVersion='C';selectedNeuroProblem='neuro-bonf';go('neuroWorked')});assert.equal(await p.locator('.step').count(),6);
 await p.setViewportSize({width:390,height:844});for(const theme of ['light','dark']){await p.evaluate(theme=>{state.theme=theme;applyAppearance()},theme);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))}
 assert.deepEqual(errors,[]);console.log('PASS:',JSON.stringify(audit),'one complete six-step Bonferroni walkthrough; all distinct pairs and calculations; retained general equations; correct ANOVA df; hints, grading, notes, quizzes and neuroscience versions.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
