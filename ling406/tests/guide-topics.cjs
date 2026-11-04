const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const BASE=process.env.STUDIO_BASE_URL||'http://localhost:8907/ling406/';
const VERSIONS=[1,2,3,4,5,6,7,10,12,14,16,18];
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'}),p=await context.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(BASE);
  await p.evaluate(()=>{
   LingStudio.state.notes['speech1-14']='Keep this note when topics collapse.';
   LingStudio.state.read['speech1-14']=true;
   LingStudio.state.ready['guide-0']=true;
   LingStudio.startQuiz('quick');
   LingStudio.go('guide');
  });
  const expected=await p.evaluate(()=>LING406.guide.length),topics=p.locator('#content > details.guide');
  assert.equal(expected,28);assert.equal(await topics.count(),expected);
  const stableState=await p.evaluate(()=>JSON.stringify({notes:LingStudio.state.notes,read:LingStudio.state.read,ready:LingStudio.state.ready,quiz:LingStudio.state.quiz}));
  const controls=()=>({expand:p.locator('[data-guide-topics="expand"]'),collapse:p.locator('[data-guide-topics="collapse"]')});
  async function allOpen(value){assert(await topics.evaluateAll((es,want)=>es.every(e=>e.open===want),value));}
  function textRows(){return [...document.querySelectorAll('.guide-explanation')].map(e=>e.innerHTML);}
  for(const version of VERSIONS){
   await p.selectOption('header [data-transcript-version]',String(version));
   for(const visual of [false,true]){
    if((await p.locator('#guideVisualToggle').getAttribute('aria-checked')==='true')!==visual)await p.locator('#guideVisualToggle').click();
    const before=await p.evaluate(textRows),images=await p.locator('.guide-source img').evaluateAll(es=>es.map(e=>e.getAttribute('src'))),audio=await p.locator('.guide-source audio').evaluateAll(es=>es.map(e=>e.getAttribute('src')));
    // A non-topic details must remain independent of bulk topic commands.
    await p.evaluate(()=>{const t=document.querySelector('.slide-audio-links details');if(t)t.open=true;});
    const nestedBefore=await p.locator('.slide-audio-links details').evaluateAll(es=>es.map(e=>e.open));
    await controls().collapse.click();await allOpen(false);
    assert.equal(await p.evaluate(()=>document.activeElement.dataset.guideTopics),'collapse');
    assert.deepEqual(await p.locator('.slide-audio-links details').evaluateAll(es=>es.map(e=>e.open)),nestedBefore,'Nested audio details are not the bulk topic target');
    assert.deepEqual(await p.evaluate(textRows),before,'Collapse does not rewrite teaching text');
    await controls().expand.click();await allOpen(true);
    assert.deepEqual(await p.evaluate(textRows),before,'Expand does not rewrite teaching text');
    assert.deepEqual(await p.locator('.guide-source img').evaluateAll(es=>es.map(e=>e.getAttribute('src'))),images,'Source mappings remain unchanged');
    assert.deepEqual(await p.locator('.guide-source audio').evaluateAll(es=>es.map(e=>e.getAttribute('src'))),audio,'Audio mappings remain unchanged');
    // Toggle the visual mode while every topic is collapsed; it must stay collapsed.
    await controls().collapse.click();await p.locator('#guideVisualToggle').click();await allOpen(false);await p.locator('#guideVisualToggle').click();await allOpen(false);await controls().expand.click();
    assert.equal(await p.evaluate(()=>JSON.stringify({notes:LingStudio.state.notes,read:LingStudio.state.read,ready:LingStudio.state.ready,quiz:LingStudio.state.quiz})),stableState,'Notes/read/ready/quiz state preserved');
   }
  }
  // Actual playback stops when its parent topic becomes hidden.
  if(await p.locator('#guideVisualToggle').getAttribute('aria-checked')!=='true')await p.locator('#guideVisualToggle').click();
  const player=p.locator('.guide-source audio[data-study-audio]').first();
  await player.evaluate(async e=>{await e.play();});
  assert(await player.evaluate(e=>!e.paused));
  await controls().collapse.click();await allOpen(false);
  assert(await player.evaluate(e=>e.paused),'Collapse stops a hidden recording');
  // Native keyboard operation works without rerendering or losing focus.
  await controls().expand.focus();await p.keyboard.press('Enter');await allOpen(true);
  await controls().collapse.focus();await p.keyboard.press('Space');await allOpen(false);
  // The user's original per-topic and fullscreen controls remain available.
  await topics.first().locator('summary').first().click();assert(await topics.first().evaluate(e=>e.open));
  await topics.first().locator('[data-group="guide:0"]').click();assert(await p.locator('.expanded-shell').isVisible());await p.keyboard.press('Escape');
  assert.equal(await topics.count(),expected);
  await p.setViewportSize({width:390,height:844});
  await p.evaluate(()=>LingStudio.go('guide'));
  await controls().collapse.click();await allOpen(false);await controls().expand.click();await allOpen(true);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile controls do not cause overflow');
  await p.screenshot({path:'/tmp/ling406-guide-topics-mobile.png'});
  await p.evaluate(()=>LingStudio.go('core'));
  assert.equal(await p.locator('[data-guide-topics]').count(),0,'Bulk controls only exist on requested guide page');
  assert.deepEqual(errors,[]);
  const report={passed:true,topics:expected,transcriptVersions:VERSIONS,visualModes:['text','slides-and-audio'],bulkExpandCollapse:true,nestedDetailsIndependent:true,teachingHTMLUnchanged:true,sourceAndAudioMappingsPreserved:true,notesReadReadyQuizPreserved:true,hiddenAudioStopped:true,keyboardButtons:true,originalExpansionControls:true,mobile:true,scopedToGuide:true};
  fs.writeFileSync('/tmp/ling406-guide-topics-browser-report.json',JSON.stringify(report,null,2)+'\n');console.log('PASS:',JSON.stringify(report));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
