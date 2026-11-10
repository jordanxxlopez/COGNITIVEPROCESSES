'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const BASE=process.env.STUDIO_BASE_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 for(const file of ['index.html','share.html','share.html?module=ii']){
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.goto(BASE+'/'+file);await page.waitForFunction(()=>!!window.PSYC301TestBank);
  const regular=await page.evaluate(()=>JSON.stringify({ids:Q.map(q=>q.id),missed:state.missed,attempts:state.attempts}));
  await page.evaluate(()=>{state.personalNotes['6:12']='Keep my original note';state.read.push('6:12');save();go('module',6)});
  // Use the real layout switch and prove the original reader remains available.
  assert.equal(await page.locator('.tb-study-tools').count(),0);
  await page.locator('#workspace-layout-switch input').check();
  await page.evaluate(()=>{state.explanationVersions[6]='22';mode='expanded';teachIndex=moduleBy(6).sections.findIndex(s=>s.page===12);render()});
  assert.equal(await page.locator('.tb-card').count(),1);assert.equal(await page.locator('.tb-notes[open]').count(),0);
  await page.locator('.tb-notes>summary').click();assert.equal(await page.locator('[data-personal-note="6:12"]').inputValue(),'Keep my original note');
  await page.locator('[data-personal-note="6:12"]').fill('Updated note beside practice');await page.locator('.tb-notes>summary').click();
  const correct=await page.evaluate(()=>window.PSYC301TestBank.deck('slides-6',window.PSYC301TestBank.slidePool(6)).items.find(q=>q.id==='G05-007').correct);
  await page.locator(`[data-tb-answer="${correct}"]`).click();assert.match(await page.locator('.tb-feedback').innerText(),/^Correct/);
  const first=await page.locator('.tb-options').innerText();const firstPosition=await page.locator('.tb-correct .tb-letter').innerText();
  await page.locator('[data-tb-move="1"]').click();assert.equal(await page.locator('.tb-feedback').count(),0);
  const second=await page.evaluate(()=>window.PSYC301TestBank.deck('slides-6',window.PSYC301TestBank.slidePool(6)).items.find(q=>q.id==='G05-008').correct);
  await page.locator(`[data-tb-answer="${second}"]`).click();assert.notEqual(await page.locator('.tb-correct .tb-letter').innerText(),firstPosition);
  await page.locator('[data-tb-move="-1"]').click();assert.equal(await page.locator('.tb-options').innerText(),first);
  assert.equal(await page.evaluate(()=>JSON.stringify({ids:Q.map(q=>q.id),missed:state.missed,attempts:state.attempts})),regular);
  await page.reload();await page.waitForFunction(()=>!!window.PSYC301TestBank);await page.evaluate(()=>{go('module',6);mode='expanded';teachIndex=11;render()});
  assert.equal(await page.locator('.tb-options').innerText(),first);assert.equal(await page.locator('[data-personal-note="6:12"]').inputValue(),'Updated note beside practice');
  assert(await page.evaluate(()=>state.read.includes('6:12')));
  // All module/slide mappings, graded decks and extras are separate from the standard quiz bank.
  await page.evaluate(()=>go('m2testbank'));assert.equal(await page.locator('.tb-lecture').count(),7);
  const validated=await page.evaluate(()=>[6,9,10,11,12,13,14].every(id=>validateAnswerKey(window.PSYC301TestBank.deck('bank-'+id,window.PSYC301TestBank.slidePool(id)).items)));assert(validated);
  await page.selectOption('[data-tb-filter]','13');assert.equal(await page.locator('.tb-lecture').count(),1);
  await page.locator('.tb-extra:not(.tb-review)>summary').click();assert.match(await page.locator('.tb-extra:not(.tb-review) .tb-card').innerText(),/prefrontal cortex|neuroeconomics/i);
  await page.locator('.tb-review>summary').click();await page.locator('.tb-review [data-tb-answer]').first().click();assert.match(await page.locator('.tb-review .tb-feedback').innerText(),/not scored/);
  // Each slide in every collection renders exactly its own matched questions; title slides stay empty.
  const mappingErrors=await page.evaluate(()=>{const errors=[];view='module';mode='notes';for(const id of [6,9,10,11,12,13,14]){selected=id;const m=moduleBy(id);for(const s of m.sections){const html=personalNotes(m,s),count=window.PSYC301TestBank.slidePool(id).filter(q=>q.refs.some(r=>r[0]===id&&r[1]===s.page)).length;if(html.includes('data-tb-deck')!==(count>0))errors.push(id+':'+s.page)}}return errors});assert.deepEqual(mappingErrors,[]);
  await page.evaluate(()=>{go('module',9);mode='teach';teachIndex=moduleBy(9).sections.findIndex(s=>s.page===17);render()});assert.equal(await page.locator('.transcript-pane .tb-card').count(),1);
  await page.evaluate(()=>applyTheme('dark'));await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>go('m2testbank'));await page.selectOption('[data-tb-filter]','9');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2));
  await page.screenshot({path:'/tmp/testbank-mobile-dark.png',fullPage:true});
  // A malformed saved answer order is safely regenerated.
  await page.evaluate(()=>{const k=window.PSYC301TestBank.storageKey,s=JSON.parse(localStorage.getItem(k));s.decks['bank-9'].orders[0]=null;localStorage.setItem(k,JSON.stringify(s))});
  await page.reload();await page.waitForFunction(()=>!!window.PSYC301TestBank);await page.evaluate(()=>go('m2testbank'));assert.equal(errors.length,0,errors.join('\n'));
  console.log('PASS',file,'reader, notes, source mapping, nonrepeat choices, feedback, reload, bank isolation, extras, corrupt storage, dark mobile');
  await context.close();
 }
 }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exit(1)});
