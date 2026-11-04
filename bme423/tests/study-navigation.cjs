// Serve the repository root on port 8907 before running.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:8907/bme423/?questionVersion=C');
  const groups=await page.evaluate(()=>DAYS.map(d=>d[2]));
  const previous=()=>page.locator('[data-study-step="-1"]').first();
  const next=()=>page.locator('[data-study-step="1"]').first();
  for(let group=0;group<groups.length;group++){
   await page.evaluate(()=>go('home'));
   await page.locator(`[data-study-group="${group}"][data-lesson="${groups[group][0]}"]`).last().click();
   assert.equal(await page.locator('.study-sequence').count(),2,'top/bottom controls');
   assert(await previous().isDisabled());
   for(let index=0;index<groups[group].length;index++){
    assert.equal(await page.evaluate(()=>selectedLesson),groups[group][index]);
    assert.equal(await page.evaluate(()=>studyGroup),group);
    assert((await page.locator('.study-sequence').first().innerText()).includes(`Topic ${index+1} of ${groups[group].length}`));
    if(index<groups[group].length-1){assert(await next().isEnabled());await next().click()}
   }
   assert(await next().isDisabled(),'end of each group must stop');
   const last=groups[group].at(-1);
   await page.evaluate(()=>moveStudyTopic(1));assert.equal(await page.evaluate(()=>selectedLesson),last);
   for(let index=groups[group].length-2;index>=0;index--){await previous().click();assert.equal(await page.evaluate(()=>selectedLesson),groups[group][index])}
   assert(await previous().isDisabled());
   await page.evaluate(()=>moveStudyTopic(-1));assert.equal(await page.evaluate(()=>selectedLesson),groups[group][0]);
   await page.locator('[data-plan-group]').first().click();
   assert.equal(await page.evaluate(()=>view),'home');
   const rect=await page.locator(`#study-group-${group}`).boundingBox();assert(rect.y>=-1&&rect.y<1000,'return to selected group (allow subpixel scroll rounding)');
  }
  // Direct entry to a middle probability topic retains its actual group position.
  await page.locator('[data-study-group="1"][data-lesson="ccdf"]').click();
  assert.equal(await page.evaluate(()=>studySequence().index),2);
  for(const version of ['A','B','C']){
   await page.locator('[data-script-version]').selectOption(version);
   assert.equal(await page.evaluate(()=>studyGroup),1);
   assert(await next().isEnabled());
  }
  const noteKey=await page.locator('[data-note]').getAttribute('data-note');
  await page.locator('[data-note]').fill('Keep the lower and upper cutoffs visible.');
  await next().click();await previous().click();
  assert.equal(await page.locator(`[data-note="${noteKey}"]`).inputValue(),'Keep the lower and upper cutoffs visible.');
  await page.locator('[data-open-slide]').click();await page.locator('#exitViewer').click();
  assert.equal(await page.evaluate(()=>studyGroup),1);assert.equal(await page.evaluate(()=>selectedLesson),'ccdf');
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile controls overflow');
  await next().click();assert.equal(await page.evaluate(()=>selectedLesson),'cexpect');
  // General lesson links do not accidentally inherit a previously used daily route.
  await page.evaluate(()=>go('formulas'));
  await page.locator('[data-lesson="summary"]').click();
  assert.equal(await page.locator('.study-sequence').count(),0);
  await page.evaluate(()=>go('home'));await page.locator('.hero [data-lesson="start"]').click();
  assert.equal(await page.evaluate(()=>studyGroup),0);assert(await next().isEnabled());
  assert.deepEqual(errors,[]);
  console.log('PASS: all six plan groups traverse in both directions, stop at both boundaries, return to their own plan card, and retain their route across A/B/C and the slide viewer; notes persist, middle-topic entry works, unrelated links clear route, and mobile controls fit.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
