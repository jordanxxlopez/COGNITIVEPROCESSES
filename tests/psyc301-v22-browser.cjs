// Serve the repository first. Playwright, STUDIO_BASE_URL and CHROMIUM_EXECUTABLE configure the test.
'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{})});try{
const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(process.env.STUDIO_BASE_URL||'http://127.0.0.1:8768/');await page.waitForFunction(()=>window.PSYC301_V22&&window.PSYC301V22UI);
for(const id of [6,9,10,11,12,13]){
 await page.evaluate(id=>go('module',id),id);
 const select=page.locator(`[data-explanation-version="${id}"]`).first();await select.waitFor();
 for(const v of ['20','21','22']){
  await select.selectOption(v);assert.equal(await select.inputValue(),v);assert(await select.locator(`option[value="${v}"]`).count());
 }
 assert(await page.locator('.psyc-v22-follow').count()>0,`${id} following-slide marker`);
}
const checked=await page.evaluate(()=>{let count=0;const pack=window.PSYC301_V22;for(const id of pack.scope){state.explanationVersions[id]='22';const m=moduleBy(id);for(const section of m.sections){const expected=pack.scripts[id+':'+section.page];if(!expected)throw Error('missing expected source '+id+':'+section.page);const box=document.createElement('div');box.innerHTML=sectionBullets(m,section).join('');const actual=[...box.querySelectorAll('.psyc-v6-prose')].map(x=>x.dataset.v6Spoken);const wanted=expected.flatMap(b=>[b.text,...b.children]).map(t=>t.replace(/\\\[(.*?)\\\]/g,(_,eq)=>pack.mathSpeech[eq]).replace(/\*\*/g,''));if(JSON.stringify(actual)!==JSON.stringify(wanted))throw Error('wrong rendered edition '+id+':'+section.page);count++;}}return count;});assert.equal(checked,176);
await page.evaluate(()=>go('module',9));await page.locator('[data-explanation-version="9"]').first().selectOption('22');
await page.locator('details.section').evaluateAll(els=>els.forEach(el=>el.open=true));let text=await page.locator('#content').innerText();assert(text.includes('Baddeley (2000)'));assert(text.includes('Baddeley and Hitch (1974)'));assert(text.includes('Vogel and colleagues (2005)'));
const sticky=await page.locator('details.section:has(.psyc-v22-follow) .picturebox').first().evaluate(el=>getComputedStyle(el).position);assert.equal(sticky,'sticky');
await page.locator('details.section:has(.psyc-v22-follow)').first().evaluate(el=>el.open=true);
const example=page.locator('details.section').filter({hasText:'The episodic buffer binds information into episodes'}).first();await example.scrollIntoViewIfNeeded();await example.locator('.picturebox img').first().evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('source image missing')});await page.screenshot({path:process.env.DESKTOP_SCREENSHOT||'/private/tmp/psyc22-desktop.png'});
await page.setViewportSize({width:390,height:844});await page.locator('details.section').filter({hasText:'The episodic buffer binds information into episodes'}).first().scrollIntoViewIfNeeded();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:process.env.MOBILE_SCREENSHOT||'/private/tmp/psyc22-mobile.png'});
await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>go('module',9));await page.locator('[data-mode="teach"]').click();await page.locator('#teachSelect').selectOption('18');assert((await page.locator('#content').innerText()).includes('Baddeley (2000)'));await page.locator('#content img').first().evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('reader image missing')});
await page.reload();await page.waitForFunction(()=>window.PSYC301V22UI);await page.evaluate(()=>go('module',9));assert.equal(await page.locator('[data-explanation-version="9"]').first().inputValue(),'22');
assert.deepEqual(errors,[]);console.log('PASS: Version22 available and switchable with20/21 in all6collections; Baddeley2000, Hitch1974, Vogel2005 present; all176 source-page renderer outputs match V22; following slides sticky with original image decoded; Visual + transcript page19 also matches; saved selection survives reload; mobile no overflow; no runtime errors.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
