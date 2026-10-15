// Serve the repository root on port 8907. This check never rewrites the note PDF.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const cp=require('node:child_process');
const path=require('node:path');
const repo=path.resolve(__dirname,'../..');
const before=cp.execFileSync('git',['show','61cc80a:bme423/app.js'],{cwd:repo,encoding:'utf8'});
const originalLesson=before.split('\n').find(l=>l.startsWith('function lessonText('));
const unchanged=['data.js','v2-data.js','math.js','style.css','note-sheet-data.js','BME423-four-page-notes-v2.pdf'];
for(const file of unchanged){
 assert.deepEqual(fs.readFileSync(path.join(repo,'bme423',file)),cp.execFileSync('git',['show','61cc80a:bme423/'+file],{cwd:repo,maxBuffer:12*1024*1024}),file+' changed');
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1600,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:8907/bme423/');
  const result=await page.evaluate(original=>{
   const old=eval('('+original+')'), failures=[],seen=new Set();let count=0;
   for(const m of DATA.modules){
    const slides=makeModuleSlides(m.id);
    if(slides.length!==m.count)failures.push('wrong page count '+m.id);
    for(const s of slides){
     const key=m.id+':'+s.page,l=LES.get(s.topic),c=VERSION_C.slides[key];
     if(!c||![3,4].includes(c.paragraphs.length)){failures.push(key+' missing paragraphs');continue}
     for(const p of c.paragraphs){if(seen.has(p))failures.push(key+' repeated paragraph');seen.add(p);rich(p)}
     for(const version of ['A','B']){state.scriptVersion=version;if(lessonText(l,m.id,s.page)!==old(l))failures.push(key+' changed '+version)}
     state.scriptVersion='B';const body=old(l);
     state.scriptVersion='C';const prefix=lectureText(m.id,s.page),html=lessonText(l,m.id,s.page);
     if(html!==prefix+body)failures.push(key+' changed preserved B body');
     if(!html.startsWith('<section class="slide-lecture'))failures.push(key+' intro not first');
     count++;
    }
   }
   return {count,paragraphs:seen.size,failures};
  },originalLesson);
  assert.equal(result.count,384);assert.equal(result.paragraphs,1152);assert.deepEqual(result.failures,[]);
  for(const mid of [2,3,4,5,6,7,8,9,10,11,12,13,15,14]){
   await page.evaluate(mid=>{state.scriptVersion='C';selectedModule=mid;go('module')},mid);
   const expected=await page.evaluate(mid=>DATA.modules.find(m=>m.id===mid).count,mid);
   assert.equal(await page.locator('details.lesson').count(),expected,'collection '+mid);
   assert.equal(await page.locator('[data-slide-lecture]').count(),expected);
   assert.equal(await page.locator('[data-script-version]').inputValue(),'C');
   assert.equal(await page.locator('[data-script-version] option:checked').count(),1);
   assert.equal(await page.locator('.katex-error').count(),0);
   // The last card opens its corresponding page in the complete expanded collection.
   await page.locator('details.lesson').last().locator('summary').click();
   await page.locator(`[data-open-slide="${mid}:${expected}"]`).click();
   assert.equal(await page.locator('[data-slide-lecture]').getAttribute('data-slide-lecture'),`${mid}:${expected}`);
   assert.equal(await page.locator('#slideSelect option').count(),expected);
   const text=await page.locator('[data-slide-lecture]').innerText();
   await page.locator('#prevSlide').click();
   assert.notEqual(await page.locator('[data-slide-lecture]').innerText(),text);
   const current=await page.locator('#slideSelect').inputValue();
   await page.locator('[data-script-version]').selectOption('B');
   assert.equal(await page.locator('[data-slide-lecture]').count(),0);
   assert.equal(await page.locator('#slideSelect').inputValue(),current);
   await page.locator('[data-script-version]').selectOption('A');
   assert.equal(await page.locator('.source-worked').count(),0);
   await page.locator('[data-script-version]').selectOption('C');
   assert.equal(await page.locator('#slideSelect').inputValue(),current);
   assert.equal(await page.locator('[data-slide-lecture] > p').count(),3);
   const transcript=await page.locator('.transcript').boundingBox(),visual=await page.locator('.slide-wrap').boundingBox();
   assert(transcript.x<visual.x,'transcript must remain left');
   await page.locator('#exitViewer').click();
   await page.locator('[data-script-version]').selectOption('B');
   assert.equal(await page.locator('details.lesson').count(),await page.evaluate(mid=>DATA.modules.find(m=>m.id===mid).sections.length,mid));
  }
  // The exact repeated topic named by the user now has four distinct openings.
  await page.evaluate(()=>{state.scriptVersion='C';selectedModule=10;go('module')});
  await page.locator('[data-module-view="expanded"]').click();
  const first=[];
  for(let i=0;i<4;i++){await page.locator('#slideSelect').selectOption(String(i));first.push(await page.locator('[data-slide-lecture]').innerText())}
  assert.equal(new Set(first).size,4);
  assert(first[0].includes('clinical-trial'));assert(first[3].includes('Inference')||first[3].includes('Inference'.toLowerCase()));
  const note=page.locator('[data-note="s10:4"]');await note.fill('My reminder stays on page four.');
  await page.locator('[data-script-version]').selectOption('B');assert.equal(await page.locator('[data-note="s10:4"]').inputValue(),'My reminder stays on page four.');
  await page.locator('[data-script-version]').selectOption('C');await page.reload();
  assert.equal(await page.evaluate(()=>state.scriptVersion),'C');
  await page.evaluate(()=>{selectedModule=10;go('module')});await page.locator('[data-module-view="expanded"]').click();await page.locator('#slideSelect').selectOption('3');
  assert.equal(await page.locator('[data-note="s10:4"]').inputValue(),'My reminder stays on page four.');
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile viewer overflow');
  await page.locator('#exitViewer').click();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile collection overflow');
  await page.setViewportSize({width:1600,height:1000});
  await page.evaluate(()=>{state.theme='dark';selectedModule=10;go('module')});
  await page.locator('[data-open-slide="10:1"]').click();
  await page.screenshot({path:'/tmp/bme-version-c-expanded.png',fullPage:false});
  assert.deepEqual(errors,[]);
  console.log('PASS: 384 slide-specific scripts; 1,152 distinct paragraphs; exact A/B preservation; C = new lecture + unchanged B body on every slide; all 14 collections and expanded viewers; slide transitions, version persistence, notes, local math, mobile layout; note PDF unchanged.');
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
