const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const ctx=await browser.newContext({viewport:{width:1440,height:1050}});
 await ctx.addInitScript(()=>{if(!localStorage.getItem('bme423-studio-v1'))localStorage.setItem('bme423-studio-v1',JSON.stringify({theme:'dark',scriptVersion:'C',questionVersion:'D',notes:{'s2:3':'Original archive note.','s17:17':'Original Module II slide note.'},read:['summary'],missed:['q0'],attempts:[{id:'q0',correct:false}],practice:{mean:{correct:true}},checks:['day0-0'],moduleII:{read:['s17:17'],attempts:[{id:'m2-s17-existing',correct:true}],missed:[],practice:{'ci-glucose':{correct:true}},drafts:{'ci-glucose':'2.88913'},hints:{'ci-glucose':2}}}))});
 const page=await ctx.newPage(),errors=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url())});
 const base=process.env.BME_STUDIO_URL||'http://localhost:8920/bme423/';
 await page.goto(base);
 assert.match(await page.locator('#content h1').innerText(),/Understand the question/);
 assert.equal(await page.locator('#content .metric').count(),3);
 assert.equal(await page.locator('[id^="m2-study-group-"]').count(),4);
 const titles=await page.locator('#workNav [data-view]').allTextContents();
 for(const title of ['Check understanding','Learn from the beginning','90-minute practice exams','If time is short · know these','Formula shortcuts & test chooser'])assert(titles.includes(title));
 await page.screenshot({path:'/tmp/bme-module2-structure-home.png'});
 await page.locator('#workNav [data-view="m2methods"]').click();
 const methods=await page.evaluate(()=>M2_METHOD_ORDER);
 for(const [index,id]of methods.entries()){
  await page.locator('#m2MethodGroup').selectOption(id);
  assert.equal(await page.locator('[data-m2-route]').getAttribute('data-m2-route'),id);
  for(const heading of ['1. Match the question to the setup','2. Follow one complete worked example','3. Practise with notes and a calculator'])assert(await page.getByRole('heading',{name:heading,exact:true}).isVisible());
  const pair=await page.evaluate(()=>{const m=m2Methods.get(m2Flow().method);return [m2RouteCase(m,'examples').id,m2RouteCase(m,'practice').id]});assert.notEqual(pair[0],pair[1]);
  const worked=page.locator(`[data-m2-problem="${pair[0]}"]`),practice=page.locator(`[data-m2-route-practice="${pair[1]}"]`);
  assert(await worked.locator('.step').count()>0);
  for(const step of await worked.locator('.step').all()){assert.equal(await step.locator('h4').count(),1);if(await step.locator('[data-hypothesis-pair]').count()){assert(await step.locator('[data-hypothesis-words="null"]').count()>0);assert(await step.locator('[data-hypothesis-words="alternative"]').count()>0);assert.equal(await step.locator('[data-hypothesis-pair] .katex').count(),0)}else assert(await step.locator('.katex').count()>=2)}
  await page.locator('[data-m2-cover-case]').click();assert.equal(await practice.locator('.step').count(),0);
  await page.locator('[data-m2-another-example]').click();const changed=await page.evaluate(()=>m2Flow().examples[m2Flow().method]);assert.notEqual(changed,pair[0]);assert.notEqual(changed,pair[1]);
  await page.locator('[data-m2-another-practice]').click();const next=await page.evaluate(()=>m2Flow().practice[m2Flow().method]);assert.notEqual(next,pair[1]);assert.notEqual(next,changed);
  const answer=await page.evaluate(id=>m2Cases.get(id).answer,next);
  await page.locator('[data-m2-cover-case]').click();const block=page.locator(`[data-m2-route-practice="${next}"]`);
  await block.locator('input[data-m2-response]').fill(String(answer));await block.locator('[data-m2-grade]').click();assert.match(await page.locator(`[data-m2-route-practice="${next}"] .feedback`).innerText(),/Correct/);
  await page.locator(`[data-m2-route-practice="${next}"] [data-m2-hint]`).click();assert.equal(await page.locator(`[data-m2-route-practice="${next}"] .step`).count(),1);
  await page.locator('[data-m2-cover-case]').click();assert.equal(await page.locator(`[data-m2-route-practice="${next}"] .step`).count(),0);
  await page.locator(`[data-m2-check="method:${id}:setup"]`).check();await page.locator(`[data-m2-check="method:${id}:try"]`).check();
  assert.equal(await page.locator('[data-m2-move="-1"]').first().isDisabled(),index===0);assert.equal(await page.locator('[data-m2-move="1"]').first().isDisabled(),index===methods.length-1);
  assert.equal(await page.locator('.katex-error').count(),0);
 }
 await page.locator('#m2MethodGroup').selectOption('oneMean');await page.locator('[data-m2-move="1"]').first().click();assert.equal(await page.locator('#m2MethodGroup').inputValue(),'twoMeans');await page.locator('[data-m2-move="-1"]').first().click();assert.equal(await page.locator('#m2MethodGroup').inputValue(),'oneMean');
 await page.screenshot({path:'/tmp/bme-module2-structure-method.png'});
 await page.locator('#workNav [data-view="m2check"]').click();assert.equal(await page.locator('[data-m2-written-check]').count(),4);assert.equal(await page.locator('.step').count(),0);
 await page.locator('[data-m2-locked="ci-reaction"] [data-note]').fill('Keep the SEM and the null reference separate.');
 await page.locator('[data-m2-check-solutions="open"]').click();assert(await page.locator('.step').count()>25);assert.equal(await page.locator('.m2-conclusion').count(),4);
 await page.locator('[data-m2-check-solutions="cover"]').click();assert.equal(await page.locator('.step').count(),0);assert.match(await page.locator('[data-m2-locked="ci-reaction"] [data-note]').inputValue(),/SEM/);
 await page.locator('#workNav [data-view="m2mock"]').click();assert.equal(await page.locator('.exam-question').count(),8);assert.equal(await page.locator('.step').count(),0);
 await page.locator('[data-m2-exam-solutions="open"]').click();assert.equal(await page.locator('.m2-conclusion').count(),8);
 await page.locator('[data-m2-exam="B"]').click();assert.equal(await page.locator('.step').count(),0);await page.locator('[data-m2-exam="A"]').click();assert.equal(await page.locator('.m2-conclusion').count(),8);
 await page.locator('[data-m2-timer="90"]').click();assert.equal(await page.locator('#clock').innerText(),'90:00');
 await page.locator('[data-m2-exam-solutions="cover"]').click();assert.equal(await page.locator('.step').count(),0);
 await page.locator('#workNav [data-view="m2path"]').click();assert.equal(await page.locator('details.lesson').count(),6);
 await page.locator('#m2TopicSearch').fill('pooled');assert(await page.locator('details.lesson:not(.hidden)').count()>0);await page.locator('#m2TopicSearch').fill('NO_MATCH_XYZ');assert.equal(await page.locator('details.lesson:not(.hidden)').count(),0);
 await page.locator('#moduleNav [data-module="17"]').click();assert.equal(await page.locator('[data-slide-lecture]').count(),17);assert.equal(await page.locator('details.lesson .formula-reference').count(),17);assert.equal(await page.getByRole('heading',{name:'Understand what changes and why',exact:true,includeHidden:true}).count(),17);assert.match(await page.locator('[data-note="s17:17"]').inputValue(),/Original Module II/);
 await page.locator('[data-module-view="expanded"]').click();await page.locator('#slideSelect').selectOption('16');assert(await page.getByRole('heading',{name:'Understand what changes and why',exact:true}).isVisible());await page.locator('[data-reader-timer]').waitFor();await page.locator('#exitViewer').click();
 for(const view of ['m2minimum','m2guidance','m2core','m2neuro','m2formulas','m2tables','m2guide','m2notes','m2quizzes']){
  await page.locator(`#workNav [data-view="${view}"]`).click();assert.equal(await page.locator('.katex-error').count(),0);assert.match(await page.locator('#courseHeading').innerText(),/MODULE II/);
 }
 await page.locator('#workNav [data-view="m2tables"]').click();
 const urls=await page.locator('#content a[download]').evaluateAll(xs=>xs.map(x=>x.getAttribute('href')));assert.equal(urls.length,2);for(const url of urls)assert.equal((await page.request.get(base+url)).status(),200);
 for(const theme of ['light','dark']){
  await page.locator(`[data-theme="${theme}"]`).click();await page.setViewportSize({width:390,height:844});await page.evaluate(()=>go('m2methods'));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`/tmp/bme-module2-route-mobile-${theme}.png`});await page.setViewportSize({width:1440,height:1050});
 }
 await page.evaluate(()=>go('home'));assert.match(await page.locator('#courseHeading').innerText(),/MODULE I/);await page.locator('#moduleIArchive [data-view="learnNow"]').click();assert.equal(await page.locator('#rapidGroup').count(),1);assert.equal(await page.locator('#m2MethodGroup').count(),0);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('bme423-studio-v1')));assert.equal(saved.notes['s2:3'],'Original archive note.');assert.equal(saved.notes['s17:17'],'Original Module II slide note.');assert.deepEqual(saved.read,['summary']);assert.deepEqual(saved.missed,['q0']);assert.equal(saved.attempts.length,1);assert.equal(saved.moduleII.attempts.length,1);assert.equal(saved.moduleII.practice['ci-glucose'].correct,true);assert(Math.abs(Number(saved.moduleII.drafts['ci-glucose'])-2.88913)<0.0001);assert(saved.checks.includes('day0-0'));assert.equal(saved.moduleII.checks.filter(x=>x.startsWith('method:')).length,12);assert.equal(saved.moduleII.flow.examSolutions.A,false);assert.equal(saved.moduleII.flow.checkSolutions,false);
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log('PASS: MODULE I-style study route, six Learn/Work/Try groups with distinct rotating examples and practice, grading and step reveal, separate progress, four written checks, both eight-question written sets, timer, all lecture structures, original tables, mobile themes, and untouched archive tools.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
