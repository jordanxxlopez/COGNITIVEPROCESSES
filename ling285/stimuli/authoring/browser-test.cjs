'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('playwright');
const root=process.cwd(),M=JSON.parse(fs.readFileSync('ling285/stimuli/manifest.json')),D=JSON.parse(fs.readFileSync('ling285/data.json'));
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp4':'video/mp4','.wav':'audio/wav','.mp3':'audio/mpeg','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png'};
const server=http.createServer((req,res)=>{let p=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');if(!p.startsWith(root)||!fs.existsSync(p)){res.writeHead(404).end();return;}const size=fs.statSync(p).size;res.setHeader('Content-Type',mime[path.extname(p)]||'application/octet-stream');res.setHeader('Accept-Ranges','bytes');const range=req.headers.range?.match(/bytes=(\d+)-(\d*)/);if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),size-1):size-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});fs.createReadStream(p,{start,end}).pipe(res);}else {res.setHeader('Content-Length',size);fs.createReadStream(p).pipe(res);}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;const browser=await chromium.launch({channel:'chrome',headless:true,args:['--autoplay-policy=no-user-gesture-required']});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(String(e)));const checks=[];
try {
 for(const module of ['module1','module2']){
  await page.goto(base+'/ling285/?view=stimuli&module='+module);await page.locator('#content h1').waitFor();
  assert.equal(await page.locator('.stimulus-card').count(),M.filter(m=>m.modules.includes(module)).length);
  assert.equal(await page.title(),'LING258 · Study Studio');
  await page.screenshot({path:'ling285/stimuli/qa/gallery-'+module+'.png'});
 }
 // Exercise each unique file in real Chrome, including the original course codecs.
 for(const m of M){
  const result=await page.evaluate(async m=>{const el=document.createElement(m.type);el.src=new URL(m.file,location.href).href;el.muted=true;document.body.append(el);try{await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('load timeout')),15000);el.onloadedmetadata=()=>{clearTimeout(timeout);resolve()};el.onerror=()=>{clearTimeout(timeout);reject(Error('media error '+el.error?.code))}});await el.play();await new Promise(r=>setTimeout(r,160));const advanced=el.currentTime>0;el.pause();const duration=el.duration;if(duration>1){el.currentTime=Math.min(duration*.6,3);await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('seek timeout')),10000);el.onseeked=()=>{clearTimeout(timer);resolve()}})}return {id:m.id,duration,advanced,seek:el.currentTime};}finally{el.remove();}},m);
  assert(result.advanced,m.id+' did not play');checks.push(result);
 }
 await page.goto(base+'/ling285/?view=collection&lecture=lecture15');await page.locator('[data-section="lecture15-p003"]').waitFor();
 const section=page.locator('[data-section="lecture15-p003"]');await section.evaluate(e=>e.open=true);
 await section.locator('[data-note]').fill('Media verification: preserved note');
 await section.locator('[data-read]').check();await page.waitForTimeout(700);
 await section.locator('[data-open-section]').click();
 await page.locator('#readerDialog .stimulus-card video').waitFor();await page.locator('#readerDialog .stimulus-card video').scrollIntoViewIfNeeded();
 const before=await page.locator('#readerSelect').inputValue();await page.locator('#readerDialog .stimulus-card video').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#readerSelect').inputValue(),before);
 await page.screenshot({path:'ling285/stimuli/qa/reader-network.png'});
 await page.keyboard.press('Escape');
 await page.goto(base+'/ling285/?view=stimuli&module=module2');await page.locator('#content h1').waitFor();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('ling285-study-studio-v1')));
 assert.equal(saved.notes['lecture15-p003'],'Media verification: preserved note');assert.equal(saved.read['lecture15-p003'],true);
 // Navigation pauses active media.
 const first=page.locator('.stimulus-card video').first();await first.scrollIntoViewIfNeeded();await first.evaluate(async e=>{await e.play();window.checkedMedia=e;});await page.locator('#courseNav [data-go="home"]').click();assert(await page.evaluate(()=>window.checkedMedia.paused));
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+'/ling285/?view=collection&lecture=lecture01');await page.locator('[data-section="lecture01-p008"]').waitFor();const fric=page.locator('[data-section="lecture01-p008"]');await fric.evaluate(e=>e.open=true);await fric.scrollIntoViewIfNeeded();
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.equal(await fric.locator('.stimulus-card').count(),4);
 await page.screenshot({path:'ling285/stimuli/qa/mobile-fricatives.png'});
 assert.deepEqual(errors,[]);
 fs.writeFileSync('ling285/stimuli/qa/browser-validation.json',JSON.stringify({passed:true,engine:'Chrome',media:checks,notesAndReadPreserved:true,nativeKeyboardSeeking:true,navigationPauses:true,mobileNoOverflow:true},null,2));
 console.log('PASS playback and seeking for '+checks.length+' entries; gallery, slide integration, reader, notes, read marks and mobile.');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
