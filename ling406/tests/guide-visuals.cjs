const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const cp=require('node:child_process');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'../..');
const BASE=process.env.STUDIO_BASE_URL||'http://localhost:8907/ling406/';
const VERSIONS=[1,2,3,4,5,6,7,10,12,14,16,18];
const BASELINE='9e6388a';
// Render the previously published app in a separate browser context. This checks
// every original guide paragraph/heading, rather than comparing the new view to itself.
const oldApp=cp.execFileSync('git',['show',`${BASELINE}:ling406/app.js`],{cwd:ROOT,encoding:'utf8'});
const oldIndex=cp.execFileSync('git',['show',`${BASELINE}:ling406/index.html`],{cwd:ROOT,encoding:'utf8'});
function teachingRows(){
 return [...document.querySelectorAll('#content .review-group')].map(row=>{
  const area=row.querySelector('.guide-explanation')||row;
  const h=row.querySelector('h3');
  const blocks=[...area.children].filter(e=>['P','UL'].includes(e.tagName));
  return {heading:h?.outerHTML||'',blocks:blocks.map(e=>e.outerHTML),text:blocks.map(e=>e.textContent)};
 });
}
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  const original=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
  await original.route('**/app.js?*',route=>route.fulfill({status:200,contentType:'application/javascript',body:oldApp}));
  await original.route(BASE,route=>route.fulfill({status:200,contentType:'text/html',body:oldIndex}));
  const old=await original.newPage();await old.goto(BASE);
  const baseline={};
  for(const version of VERSIONS){
   await old.evaluate(v=>{LingStudio.state.transcriptVersion=v;LingStudio.go('guide');},version);
   baseline[version]=await old.evaluate(teachingRows);
  }
  const originalGuide=await old.evaluate(()=>({groups:LING406.guide.map(g=>({title:g.title,sections:g.sections})),heading:document.querySelector('#content h1').textContent,intro:document.querySelector('#content h1+p').textContent,readyLabels:[...document.querySelectorAll('.guide>label')].map(e=>e.textContent.trim()),buttons:[...document.querySelectorAll('#content>.study-tools button')].map(e=>e.textContent)}));
  await original.close();

  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(BASE);
  await p.evaluate(()=>{
   LingStudio.state.notes['speech1-14']='Guide toggle preservation sentinel';
   LingStudio.state.read['speech1-14']=true;
   LingStudio.state.ready['guide-0']=true;
   LingStudio.startQuiz('quick');
   LingStudio.go('guide');
  });
  const snap=await p.evaluate(()=>({notes:{...LingStudio.state.notes},read:{...LingStudio.state.read},ready:{...LingStudio.state.ready},quiz:JSON.stringify(LingStudio.state.quiz),missed:[...LingStudio.state.missed]}));
  assert.equal(await p.locator('#content h1').textContent(),originalGuide.heading);
  assert.equal(await p.locator('#content h1+p').textContent(),originalGuide.intro);
  assert.deepEqual(await p.locator('.guide>summary').allTextContents(),originalGuide.groups.map(g=>g.title));
  const toggle=p.locator('#guideVisualToggle');
  assert.equal(await toggle.getAttribute('role'),'switch');
  assert.equal(await toggle.getAttribute('aria-checked'),'false','Existing storage without the preference keeps the original text-only view');
  assert.deepEqual(await p.evaluate(teachingRows),baseline[18]);
  for(const text of originalGuide.buttons)assert(await p.getByRole('button',{name:text,exact:true}).count());
  assert.equal(await p.locator('#content .review-group .slide:visible').count(),0);
  assert.equal(await p.locator('#content .review-group audio:visible').count(),0);

  // Closing a guide topic must survive view toggles. Existing version changes retain their original rerender behavior.
  await p.locator('#content details.guide').nth(1).locator(':scope>summary').click();
  const open=await p.locator('#content details.guide').evaluateAll(es=>es.map(e=>e.open));
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-checked'),'true');
  assert.deepEqual(await p.locator('#content details.guide').evaluateAll(es=>es.map(e=>e.open)),open);
  assert.deepEqual(await p.evaluate(teachingRows),baseline[18]);
  const expected=await p.evaluate(()=>LING406.guide.flatMap(g=>g.sections).map(id=>({id,image:LingStudio.sections.get(id).image,page:LingStudio.sections.get(id).page,pdf:LING406.sources[LingStudio.sections.get(id).source].file,audio:LING406_AUDIO.sections[id]||[]})));
  const rows=p.locator('#content .review-group');assert.equal(await rows.count(),expected.length);
  for(let i=0;i<expected.length;i++){
   const row=rows.nth(i),ex=expected[i];
   assert(await row.evaluate(e=>e.matches('.guide-pair')||Boolean(e.querySelector('.guide-pair'))),ex.id);
   assert.equal(await row.locator('.guide-explanation').count(),1,ex.id);
   assert.equal(await row.locator('.guide-source').count(),1,ex.id);
   assert.equal(await row.locator('.guide-source img.slide').getAttribute('src'),ex.image,ex.id);
   assert((await row.locator('.guide-source .source-caption a').getAttribute('href')).endsWith(`${ex.pdf}#page=${ex.page}`));
   const sid=await row.evaluate(e=>e.dataset.guideSection||e.querySelector('[data-guide-section]')?.dataset.guideSection);
   assert.equal(sid,ex.id);
   assert.deepEqual(await row.locator('.guide-source audio[data-study-audio]').evaluateAll(as=>as.map(a=>a.dataset.studyAudio)),ex.audio,ex.id);
  }
  // Keep each of all twelve existing transcript editions byte-for-byte in the guide.
  for(const version of VERSIONS){
   await p.selectOption('header [data-transcript-version]',String(version));
   assert.equal(await toggle.getAttribute('aria-checked'),'true');
   assert.deepEqual(await p.evaluate(teachingRows),baseline[version],`Guide teaching HTML in transcript version ${version}`);
  }
  await p.selectOption('header [data-transcript-version]','18');
  // The new player is the actual existing file and stops when the visual mode is removed.
  const playable=p.locator('#content details.guide[open] .guide-source audio[data-study-audio]').first();
  assert(await playable.count(),'At least one currently expanded guide topic has audio');
  const detached=await playable.elementHandle();
  await playable.evaluate(async a=>{await a.play();});await p.waitForTimeout(120);
  assert(await playable.evaluate(a=>a.currentTime>0&&Number.isFinite(a.duration)));
  await toggle.click();
  assert(await detached.evaluate(a=>a.paused),'Changing to text-only stops the old player');
  assert.equal(await p.locator('#content .review-group .slide:visible').count(),0);
  assert.deepEqual(await p.evaluate(teachingRows),baseline[18]);
  await toggle.click();
  assert.deepEqual(await p.evaluate(()=>({notes:{...LingStudio.state.notes},read:{...LingStudio.state.read},ready:{...LingStudio.state.ready},quiz:JSON.stringify(LingStudio.state.quiz),missed:[...LingStudio.state.missed]})),snap);
  await p.reload();
  assert.equal(await p.locator('#guideVisualToggle').getAttribute('aria-checked'),'true','The additive preference survives reload');
  assert(await p.locator('[data-ready="guide-0"]').isChecked());

  // Existing per-slide and topic expansion are still the established full readers.
  await p.locator('#content [data-open-section]').first().click();
  assert.equal(await p.locator('#readerRoot #readerSelect option').count(),1);
  await p.locator('#readerRoot [data-action="readerClose"]').click();
  assert.equal(await p.locator('#guideVisualToggle').getAttribute('aria-checked'),'true');
  await p.locator('#content [data-group="guide:0"]').click();
  assert.equal(await p.locator('#readerRoot #readerSelect option').count(),originalGuide.groups[0].sections.length);
  await p.locator('#readerRoot [data-action="readerClose"]').click();
  // Enlarging the original image keeps the original PDF link.
  await p.locator('#content .guide-source .slide-button').first().click();
  assert(await p.locator('#imageDialog').isVisible());
  assert((await p.locator('#dialogPdf').getAttribute('href')).endsWith(`#page=${expected[0].page}`));
  await p.locator('#closeImage').click();

  await p.locator('#content .guide-source img.slide').first().evaluate(e=>e.decode());
  const desktopPair=await p.locator('#content .guide-pair').first().evaluate(e=>{
   const l=e.querySelector('.guide-explanation').getBoundingClientRect(),r=e.querySelector('.guide-source').getBoundingClientRect();
   return {leftX:l.x,leftRight:l.right,rightX:r.x};
  });
  assert(desktopPair.rightX>=desktopPair.leftRight-2,'Desktop guide shows explanation on the left, exact slide on the right');
  await p.screenshot({path:'/tmp/ling406-guide-visuals-desktop.png'});
  for(const theme of ['light','dark']){
   await p.setViewportSize({width:390,height:844});
   await p.evaluate(t=>{LingStudio.state.theme=t;LingStudio.go('guide');},theme);
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),theme+' mobile horizontal overflow');
   const mobile=await p.locator('#content .guide-pair').first().evaluate(e=>{
    const l=e.querySelector('.guide-explanation').getBoundingClientRect(),r=e.querySelector('.guide-source').getBoundingClientRect();return {leftY:l.y,leftBottom:l.bottom,rightY:r.y};
   });
   assert(mobile.rightY>=mobile.leftBottom-2,theme+' mobile stacks the exact visual after its explanation');
   await p.screenshot({path:`/tmp/ling406-guide-visuals-mobile-${theme}.png`});
  }
  await p.emulateMedia({media:'print'});
  assert(await p.locator('.guide-source').evaluateAll(es=>es.every(e=>getComputedStyle(e).display==='none')),'Print retains original text-only guide');
  assert.equal(await p.locator('#guideVisualToggle').evaluate(e=>getComputedStyle(e).display),'none');
  await p.emulateMedia({media:'screen'});
  await p.locator('#guideVisualToggle').focus();
  await p.keyboard.press('Space');
  assert.equal(await p.locator('#guideVisualToggle').getAttribute('aria-checked'),'false');
  assert.equal(await p.evaluate(()=>document.activeElement.id),'guideVisualToggle');
  await p.keyboard.press('Space');
  assert.equal(await p.locator('#guideVisualToggle').getAttribute('aria-checked'),'true');
  await p.setViewportSize({width:1440,height:1000});
  await p.evaluate(()=>LingStudio.go('collection','speech1'));
  assert.equal(await p.locator('#guideVisualToggle').count(),0,'The new toggle is scoped to the requested guide page');
  assert.equal(await p.locator('.note-section').count(),32);
  assert(await p.locator('audio[data-study-audio]').count()>0,'Existing collection audio remains available');
  assert.deepEqual(errors,[]);
  const report={passed:true,baselineCommit:BASELINE,guideTopics:originalGuide.groups.length,guideSlideRows:expected.length,transcriptVersions:VERSIONS,exactOriginalGuideHTML:true,exactSlideAndAudioMappings:true,notesReadReadyQuizPreserved:true,preferencePersistsReload:true,nativeAudioPlayback:true,toggleStopsAudio:true,originalExpansionControls:true,mobileLightDark:true,printPreservesTextOnly:true,keyboardToggle:true};
  fs.writeFileSync('/tmp/ling406-guide-visuals-browser-report.json',JSON.stringify(report,null,2)+'\n');
  console.log('PASS:',JSON.stringify(report));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
