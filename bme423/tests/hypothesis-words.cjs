// Serve the repository root on port 8907.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1450,height:1050}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://localhost:8907/bme423/?view=worked&problem=twot&questionVersion=D');
  const audit=await page.evaluate(()=>{
   const issues=[],box=document.createElement('div');let references=0,cases=0,hypotheses=0,slides=0;
   function checkHypotheses(id){
    for(const math of box.querySelectorAll('.math-display')){
     const tex=math.querySelector('annotation')?.textContent||'';
     if(isNullStatement(tex)){
      if(math.nextElementSibling?.dataset.hypothesisWords!=='null')issues.push(id+' null has no immediate verbal statement');
      const alternative=math.nextElementSibling?.nextElementSibling;
      if(!alternative?.querySelector('annotation')?.textContent.includes('H_A:'))issues.push(id+' missing alternative');
      if(alternative?.nextElementSibling?.dataset.hypothesisWords!=='alternative')issues.push(id+' alternative has no immediate verbal statement');
     }
    }
    if(box.querySelector('.katex-error'))issues.push(id+' invalid notation');
   }
   for(const version of ['D','C']){
    state.questionVersion=version;
    const pool=[...problemPool(),...NEURO_WORKED.problems];
    for(const p of pool){
     const flow=problemSteps(p);box.innerHTML=stepsHTML(p);cases++;
     const notes=box.querySelectorAll('[data-step-reference]');
     if(notes.length!==flow.length)issues.push(version+':'+p.id+' missing step reference');
     for(const note of notes){if(note.textContent.trim().length<20)issues.push(p.id+' empty reference');references++}
     if(problemHypothesis(p)){
      if(!box.querySelector('[data-hypothesis-words="null"]')||!box.querySelector('[data-hypothesis-words="alternative"]'))issues.push(p.id+' missing hypothesis pair');
      hypotheses++;
     }
     checkHypotheses(p.id);
    }
    for(const key of Object.keys(VERSION_D.sources)){
     box.innerHTML=sourceWorked(key);checkHypotheses('source:'+key);
     if(HYPOTHESES.sources[key]&&(!box.querySelector('[data-hypothesis-words="null"]')||!box.querySelector('[data-hypothesis-words="alternative"]')))issues.push(key+' missing source hypotheses');
    }
    for(const q of questionPool()){box.innerHTML=quizExplanation(q);checkHypotheses('quiz:'+q.id)}
   }
   state.questionVersion='D';
   for(const version of ['A','B','C']){
    state.scriptVersion=version;
    for(const l of DATA.lessons){
     box.innerHTML=lessonText(l,l.refs[0].module,l.refs[0].page);checkHypotheses('lesson:'+l.id);
     if(HYPOTHESES.topics[l.id]&&!box.querySelector('[data-hypothesis-words="null"]'))issues.push(version+':'+l.id+' missing teaching hypothesis');
    }
   }
   state.scriptVersion='C';
   for(const m of DATA.modules)for(const slide of makeModuleSlides(m.id)){
    box.innerHTML=lessonText(LES.get(slide.topic),m.id,slide.page);checkHypotheses(m.id+':'+slide.page);slides++;
    if(HYPOTHESES.slides[m.id+':'+slide.page]&&!box.textContent.includes(HYPOTHESES.slides[m.id+':'+slide.page].nullWords))issues.push(m.id+':'+slide.page+' lost context');
   }
   return{issues,references,cases,hypotheses,slides};
  });assert.deepEqual(audit.issues,[]);assert.equal(audit.slides,384);
  // The specific control/intervention statement is directly below the notation.
  await page.evaluate(()=>{state.questionVersion='D';selectedProblem='twot';go('worked')});
  assert((await page.locator('.step').first().innerText()).includes('control and intervention populations have the same mean cognitive assessment score'));
  assert((await page.locator('.step').first().innerText()).includes('control and intervention populations have different mean cognitive assessment score'));
  await page.locator('.step').first().screenshot({path:'/tmp/bme-hypothesis-control.png'});
  // The small reference uses this problem's outcome, with the original arithmetic.
  await page.locator('#problemSelect').selectOption('mean');
  const first=await page.locator('.step').first().innerText();assert(first.includes('each observed specimen preparation time'));assert(first.includes('Add the observations, then divide by their count.'));
  await page.locator('.step').first().screenshot({path:'/tmp/bme-step-symbols.png'});
  // Work and hypotheses remain covered until explicitly revealed in practice.
  await page.evaluate(()=>{selectedProblem='d-hw2-folate';go('practice')});
  assert.equal(await page.locator('[data-hypothesis-words]').count(),0);assert.equal(await page.locator('[data-step-reference]').count(),0);
  await page.locator('[data-hint="d-hw2-folate"]').click();assert.equal(await page.locator('.step').count(),1);assert(await page.locator('[data-hypothesis-words="alternative"]').count());
  await page.locator('[data-solution="d-hw2-folate"]').click();
  assert((await page.locator('.step').nth(2).innerText()).includes('For a 2×2 table'));
  assert(!(await page.locator('.step').nth(2).innerText()).includes('larger than 2×2'));
  // Sources with an inline null and expanded lecture views also retain words.
  await page.evaluate(()=>{state.scriptVersion='C';openViewer(makeModuleSlides(8),21)});
  assert((await page.locator('.transcript').innerText()).includes('72 beats per minute'));
  assert(await page.locator('.transcript [data-hypothesis-words="alternative"]').count());
  await page.evaluate(()=>{selectedNeuroProblem='neuro-mean';go('neuroWorked')});
  assert((await page.locator('.step').first().innerText()).includes('each observed visual-search time'));
  // The new text stays contained at small widths in both themes.
  await page.setViewportSize({width:390,height:844});
  for(const theme of ['light','dark']){
   const bad=await page.evaluate(theme=>{
    state.theme=theme;state.side=true;applyAppearance();const target=document.querySelector('#content'),bad=[];
    for(const p of [...problemPool(),...NEURO_WORKED.problems]){target.innerHTML=stepsHTML(p);if(document.documentElement.scrollWidth>innerWidth+1)bad.push(p.id)}
    selectedNeuroProblem='neuro-twot';go('neuroWorked');return bad;
   },theme);assert.deepEqual(bad,[]);
  }
  assert.deepEqual(errors,[]);console.log('PASS:',JSON.stringify(audit),'adjacent verbal null/alternative statements, source and lecture context, per-step references, reveal boundaries, 2×2 correction wording, neuroscience context and mobile light/dark containment.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exit(1)});
