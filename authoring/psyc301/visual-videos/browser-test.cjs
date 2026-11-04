const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const manifest=JSON.parse(fs.readFileSync('psyc301-videos/manifest.json'));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
(async()=>{
 const server=spawn('python',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});let browser;
 try{
  for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:8765/');break}catch{await new Promise(r=>setTimeout(r,100))}}
  browser=await chromium.launch({channel:'chrome',headless:true,args:['--autoplay-policy=no-user-gesture-required']});
  const result={status:'passed',entries:[],playback:[]};
  for(const entry of ['index.html','share.html']){
   const baseline=await browser.newContext();
   await baseline.addInitScript(()=>window.__PSYC_VIDEO_TEST_DISABLE__=true);
   const bp=await baseline.newPage();await bp.goto('http://127.0.0.1:8765/'+entry);
   const before=hash(await bp.evaluate(()=>JSON.stringify({modules:M,questions:Q,experiments:DATA.experiments})));
   await baseline.close();
   const context=await browser.newContext({viewport:{width:1360,height:1000}});
   await context.addInitScript(()=>localStorage.setItem('psyc301-studio-v1',JSON.stringify({personalNotes:{'6:15':'Keep this note.'},read:['6:15'],explanationVersions:{6:'2',9:'18'}})));
   const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:8765/'+entry+'?view=videos');
   assert.equal(await p.locator('video[data-psyc-video]').count(),manifest.clips.length);
   assert.equal(hash(await p.evaluate(()=>JSON.stringify({modules:M,questions:Q,experiments:DATA.experiments}))),before,'Course data must be identical');
   assert.equal(await p.locator('#workspaceNav [data-view="m2videos"]').count(),1);
   if(entry==='index.html'){
    const players=p.locator('video[data-psyc-video]');
    for(let i=0;i<manifest.clips.length;i++){
     const v=players.nth(i),id=manifest.clips[i].id;await v.evaluate(async e=>{e.muted=true;await e.play()});
     await p.waitForFunction(id=>document.querySelector('video[data-psyc-video="'+id+'"]').currentTime>.08,id);
     const info=await v.evaluate(e=>({id:e.dataset.psycVideo,width:e.videoWidth,height:e.videoHeight,duration:e.duration,error:e.error?.message||null}));
     assert(info.width>0&&!info.error);result.playback.push(info);await v.evaluate(e=>e.pause());
    }
    await players.nth(0).evaluate(e=>e.play());await players.nth(1).evaluate(e=>e.play());assert(await players.nth(0).evaluate(e=>e.paused));
    await p.evaluate(()=>PsycVideos.stop());
    await p.screenshot({path:'psyc301-videos/qa/browser-desktop.png'});
   }
   // Every mapping must resolve to a real original slide.
   for(const c of manifest.clips)for(const ref of c.refs){
    assert(await p.evaluate(ref=>{const [id,page]=ref.split(':').map(Number);return !!moduleBy(id)?.sections.find(s=>s.page===page)},ref),'Missing slide '+ref);
   }
   await p.evaluate(()=>go('module',6));
   assert.equal(await p.locator('#s-6-15 video').count(),2);
   const preserved=await p.evaluate(()=>({note:state.personalNotes['6:15'],read:state.read.includes('6:15'),version:state.explanationVersions[6]}));
   assert.deepEqual(preserved,{note:'Keep this note.',read:true,version:'2'});
   await p.selectOption('[data-explanation-version="6"]','18');
   assert.equal(await p.locator('#s-6-15 video').count(),2);
   await p.evaluate(()=>{teachIndex=moduleBy(6).sections.findIndex(s=>s.page===15);mode='expanded';render()});
   assert.equal(await p.locator('.visual-pane video').count(),2);
   const v=p.locator('.visual-pane video').first();await v.focus();const beforeIndex=await p.locator('#teachSelect').inputValue();await v.press('ArrowRight');assert.equal(await p.locator('#teachSelect').inputValue(),beforeIndex);
   await v.evaluate(async e=>{e.muted=true;window.oldVideo=e;await e.play()});
   await p.locator('#nextTeach').click();assert(await p.evaluate(()=>oldVideo.paused));
   await p.evaluate(()=>go('m2videos'));
   await p.locator('[data-pv-slide="9:17"]').first().click();assert.equal(await p.locator('.visual-pane video[data-psyc-video="rotation"]').count(),1);
   await p.evaluate(()=>reviewSource(7,32));assert.equal(await p.locator('#modal video[data-psyc-video="posner"]').count(),1);await p.locator('#closeModal').click();
   await p.evaluate(()=>{setSidebar(true);go('m2videos')});await p.setViewportSize({width:390,height:844});
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await p.screenshot({path:'psyc301-videos/qa/browser-mobile-'+entry+'.png'});
   assert.equal(await p.evaluate(()=>state.personalNotes['6:15']),'Keep this note.');assert(await p.evaluate(()=>state.read.includes('6:15')));
   assert.deepEqual(errors,[]);
   result.entries.push({entry,courseDataIdentical:true,notesAndReadPreserved:true,versionsPreserved:true,slideLinks:true,expandedAndModal:true,mobileNoOverflow:true});
   await context.close();
  }
  fs.writeFileSync('psyc301-videos/browser-validation.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
