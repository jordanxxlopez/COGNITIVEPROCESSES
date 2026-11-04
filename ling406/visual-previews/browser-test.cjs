const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const server=spawn('python',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});
 let browser;
 const result={};
 try{
  for(let i=0;i<50;i++){try{await fetch('http://127.0.0.1:8765/ling406/');break}catch{await new Promise(r=>setTimeout(r,100))}}
  browser=await chromium.launch({headless:true,channel:'chrome',args:['--autoplay-policy=no-user-gesture-required']});
  const context=await browser.newContext({viewport:{width:1280,height:900}});
  await context.addInitScript(()=>localStorage.setItem('ling406-study-studio-v1',JSON.stringify({notes:{'sentence-12':'Video regression note'},read:{'sentence-12':true},transcriptVersion:18})));
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/ling406/?view=videos',{waitUntil:'networkidle'});
  assert.equal(await page.locator('video[data-study-video]').count(),4);
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.reload({waitUntil:'networkidle'});
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  const players=page.locator('video[data-study-video]');
  result.playback=[];
  for(let i=0;i<4;i++){
   const v=players.nth(i);await v.evaluate(async e=>{e.muted=true;await e.play()});
   await page.waitForFunction(id=>document.querySelector('video[data-study-video="'+id+'"]').currentTime>.15,await v.getAttribute('data-study-video'));
   const info=await v.evaluate(e=>({id:e.dataset.studyVideo,duration:e.duration,width:e.videoWidth,height:e.videoHeight,error:e.error?.message||null}));
   assert.equal(info.width,960);assert.equal(info.height,600);assert(!info.error);await v.evaluate(e=>e.pause());result.playback.push(info);
  }
  await players.nth(0).evaluate(e=>e.play());await players.nth(1).evaluate(e=>e.play());assert(await players.nth(0).evaluate(e=>e.paused));
  await page.evaluate(()=>LingVisual.stop());
  await page.screenshot({path:'ling406/visual-previews/qa/browser-desktop.png',fullPage:true});
  await page.evaluate(()=>LingStudio.openReader(['sentence-12','sentence-14'],0,true,'Video check'));
  assert.equal(await page.locator('#readerRoot video').count(),1);
  assert.equal(await page.locator('#readerRoot textarea[data-note="sentence-12"]').inputValue(),'Video regression note');
  assert.equal(await page.locator('#readerRoot input[data-read="sentence-12"]').isChecked(),true);
  const v=page.locator('#readerRoot video');await v.focus();await v.press('ArrowRight');
  assert.equal(await page.locator('#readerSelect').inputValue(),'0');
  await page.evaluate(()=>{window.detachedTestVideo=document.querySelector('#readerRoot video');detachedTestVideo.muted=true;return detachedTestVideo.play()});
  await page.locator('#readerRoot [data-transcript-version]').selectOption('1');
  assert(await page.evaluate(()=>detachedTestVideo.paused));
  assert.equal(await page.locator('#readerRoot textarea[data-note="sentence-12"]').inputValue(),'Video regression note');
  await page.locator('[data-action="readerClose"]').click();
  await page.evaluate(()=>LingStudio.go('videos'));
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:'ling406/visual-previews/qa/browser-mobile.png',fullPage:true});
  // Full media requests are cached on first playback. Verify an offline byte range.
  const file='visual-previews/clips/apple-one.mp4';
  await page.evaluate(f=>fetch(f).then(r=>r.arrayBuffer()),file);
  await context.setOffline(true);
  result.offline=await page.evaluate(async f=>{
   const r=await fetch(f,{headers:{Range:'bytes=0-127'}});
   return {status:r.status,type:r.headers.get('Content-Type'),length:(await r.arrayBuffer()).byteLength};
  },file);
  assert.equal(result.offline.status,206);assert.equal(result.offline.type,'video/mp4');assert.equal(result.offline.length,128);
  await context.setOffline(false);
  assert.deepEqual(errors,[]);
  result.status='passed';result.notesAndReadPreserved=true;result.nativeSeekingPreserved=true;result.mobileNoOverflow=true;result.onePlayerAtATime=true;
  fs.writeFileSync('ling406/visual-previews/browser-validation.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
