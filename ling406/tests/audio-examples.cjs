const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const BASE=process.env.STUDIO_BASE_URL||'http://localhost:8907/ling406/';
(async()=>{
  const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    const p=await context.newPage(),errors=[];
    p.on('pageerror',e=>errors.push(e.message));
    await p.goto(BASE);
    const manifest=await p.evaluate(()=>LING406_AUDIO);
    const validSections=new Set(await p.evaluate(()=>[...LingStudio.sections.keys()]));
    const entries=Object.entries(manifest.sections).filter(([id,clips])=>clips.length&&validSections.has(id));
    assert(entries.length>0,'At least one slide has audio');
    assert.equal(await p.locator('#collectionNav button').count(),10);
    const [sectionId,clipIds]=entries.find(([id,clips])=>id.startsWith('sentence-')&&clips.length>1)||entries.find(([,clips])=>clips.length>1)||entries[0];
    await p.evaluate(()=>LingStudio.startQuiz('quick'));
    await p.evaluate(({id,other})=>LingStudio.openReader([id,other],0,true,'Audio verification'),{id:sectionId,other:entries.find(([id])=>id!==sectionId)?.[0]||sectionId});
    const panel=p.locator('#readerRoot .slide-audio-examples');
    assert.equal(await panel.count(),1);
    assert.equal(await panel.locator('audio').count(),clipIds.length);
    assert.equal(await panel.evaluate(e=>e.previousElementSibling.className),'source-caption');
    for(const audio of await panel.locator('audio').all()){
      assert.equal(await audio.getAttribute('preload'),'none');
      assert.equal(await audio.getAttribute('autoplay'),null);
      assert((await audio.getAttribute('aria-label')).length>0);
    }
    // Native decoding and playback, including pause/resume and the existing Stop audio control.
    const sample=panel.locator('audio').first();
    await sample.evaluate(async a=>{await a.play();});
    await p.waitForTimeout(100);
    const position=await sample.evaluate(a=>{a.pause();return a.currentTime;});
    assert(position>0,'The native player advances through actual audio');
    assert(await sample.evaluate(a=>a.duration>0&&Number.isFinite(a.duration)));
    await sample.focus();await p.keyboard.press('ArrowRight');
    assert.equal(await p.locator('#readerSelect').inputValue(),'0','Arrow seeking inside the native player does not advance the reader');
    await sample.evaluate(async a=>{await a.play();});
    if(clipIds.length>1){
      await panel.locator('audio').nth(1).evaluate(async a=>{await a.play();});
      assert(await sample.evaluate(a=>a.paused),'Only the newly selected recording plays');
    }
    await p.locator('#readerRoot [data-action="stopAudio"]').click();
    assert(await panel.locator('audio').evaluateAll(as=>as.every(a=>a.paused&&a.currentTime===0)));
    // Playback must not mutate notes, read marks, or an existing quiz.
    const note=p.locator('#readerRoot [data-note]');
    await note.fill('Audio preservation sentinel');
    await p.locator('#readerRoot [data-read]').check();
    const saved=await p.evaluate(()=>({notes:{...LingStudio.state.notes},read:{...LingStudio.state.read},quiz:JSON.stringify(LingStudio.state.quiz)}));
    await sample.evaluate(async a=>{await a.play();});
    await p.evaluate(()=>LingStudio.go('home'));
    const after=await p.evaluate(()=>({notes:{...LingStudio.state.notes},read:{...LingStudio.state.read},quiz:JSON.stringify(LingStudio.state.quiz)}));
    assert.deepEqual(after,saved);
    assert.equal(await p.locator('audio[data-study-audio]').count(),0);
    // Existing reader navigation and each transcript edition retain the same attached examples.
    const versions=[1,2,3,4,5,6,7,10,12,14,16,18];
    for(const version of versions){
      await p.evaluate(({id,version})=>{LingStudio.state.transcriptVersion=version;LingStudio.openReader([id],0,true,'Audio versions');},{id:sectionId,version});
      assert.equal(await p.locator('#readerRoot audio[data-study-audio]').count(),clipIds.length);
      assert.equal(await p.locator('#readerRoot .reader-visual .slide').count(),1);
      assert.equal(await p.locator('#readerRoot [data-note]').inputValue(),'Audio preservation sentinel');
    }
    // All mapped lecture/review slides render the declared recordings, in source order.
    for(const [id,ids] of entries){
      await p.evaluate(id=>LingStudio.openReader([id],0,true,'Audio mapping'),id);
      assert.deepEqual(await p.locator('#readerRoot audio[data-study-audio]').evaluateAll(as=>as.map(a=>a.dataset.studyAudio)),ids,id);
    }
    // Browser-native decoding is checked for every unique delivered file.
    const files=[...new Set(Object.values(manifest.clips).map(c=>c.file))];
    for(let offset=0;offset<files.length;offset+=8){
      const decoded=await p.evaluate(async files=>Promise.all(files.map(file=>new Promise(resolve=>{
        const audio=new Audio();const timer=setTimeout(()=>resolve({file,error:'metadata timeout'}),10000);
        audio.onloadedmetadata=()=>{clearTimeout(timer);resolve({file,duration:audio.duration});audio.removeAttribute('src');audio.load();};
        audio.onerror=()=>{clearTimeout(timer);resolve({file,error:'decode or load failure'});};
        audio.preload='metadata';audio.src=file;audio.load();
      }))),files.slice(offset,offset+8));
      for(const item of decoded)assert(item.duration>0&&!item.error,JSON.stringify(item));
    }
    const review=entries.find(([id])=>id.startsWith('review-'));
    if(review){await p.evaluate(id=>LingStudio.openReader([id],0,true,'Review audio'),review[0]);assert.equal(await p.locator('#readerRoot audio[data-study-audio]').count(),review[1].length);}
    // A recording remains reachable in mobile and dark/light modes without changing the source visual.
    await p.setViewportSize({width:390,height:844});
    for(const theme of ['light','dark']){
      await p.evaluate(({id,theme})=>{LingStudio.state.theme=theme;LingStudio.go('home');LingStudio.openReader([id],0,true,'Mobile audio');},{id:sectionId,theme});
      assert(await p.evaluate(()=>document.querySelector('.expanded-stage').scrollWidth<=innerWidth));
      assert.equal(await p.locator('#readerRoot .reader-visual img').count(),1);
      await p.locator('#readerRoot .reader-visual img').evaluate(e=>e.decode());
      await p.locator('#readerRoot audio').first().scrollIntoViewIfNeeded();
      assert(await p.locator('#readerRoot audio').first().isVisible());
      await p.screenshot({path:`/tmp/ling406-audio-mobile-${theme}.png`});
    }
    // Removed live elements are paused even when a rerender bypasses normal navigation.
    const result=await p.locator('#readerRoot audio').first().evaluate(async a=>{
      await a.play();a.remove();await new Promise(r=>setTimeout(r,30));return a.paused;
    });
    assert(result);
    // A separate fresh browser context proves install-time audio caching before any recording is visited.
    const offlineContext=await browser.newContext({viewport:{width:1000,height:800}});
    const offlinePage=await offlineContext.newPage();
    await offlinePage.goto(BASE);
    await offlinePage.evaluate(()=>Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_,reject)=>setTimeout(()=>reject(new Error('Audio service worker installation timed out')),45000))
    ]));
    await offlinePage.reload();
    assert(await offlinePage.evaluate(()=>Boolean(navigator.serviceWorker.controller)),'New service worker controls the fresh page');
    const cached=await offlinePage.evaluate(async ({files,cacheName})=>{
      const cache=await caches.open(cacheName);
      const checks=await Promise.all(files.map(async file=>{
        const response=await cache.match(new URL(file,location.href).href);
        return Boolean(response&&response.status===200);
      }));
      return {cacheName,files:files.length,fullResponses:checks.filter(Boolean).length};
    },{files,cacheName:/const CACHE='([^']+)'/.exec(fs.readFileSync(__dirname+'/../sw.js','utf8'))[1]});
    assert.equal(cached.fullResponses,files.length,'Every delivered recording is fully cached at install time');
    await offlineContext.setOffline(true);
    const ranges=await offlinePage.evaluate(async file=>{
      const full=await fetch(file);const all=new Uint8Array(await full.arrayBuffer());
      async function range(header){const r=await fetch(file,{headers:{Range:header}});return {status:r.status,contentRange:r.headers.get('Content-Range'),bytes:Array.from(new Uint8Array(await r.arrayBuffer()))};}
      return {file,total:all.length,fullStatus:full.status,prefix:Array.from(all.slice(0,128)),suffix:Array.from(all.slice(-32)),first:await range('bytes=0-127'),last:await range('bytes=-32'),unsatisfiable:await range('bytes='+all.length+'-')};
    },files[files.length-1]);
    assert.equal(ranges.fullStatus,200);assert(ranges.total>128);
    assert.equal(ranges.first.status,206);assert.equal(ranges.first.contentRange,`bytes 0-127/${ranges.total}`);assert.deepEqual(ranges.first.bytes,ranges.prefix);
    assert.equal(ranges.last.status,206);assert.equal(ranges.last.contentRange,`bytes ${ranges.total-32}-${ranges.total-1}/${ranges.total}`);assert.deepEqual(ranges.last.bytes,ranges.suffix);
    assert.equal(ranges.unsatisfiable.status,416);assert.equal(ranges.unsatisfiable.contentRange,`bytes */${ranges.total}`);assert.equal(ranges.unsatisfiable.bytes.length,0);
    await offlinePage.evaluate(id=>LingStudio.openReader([id],0,true,'Offline audio'),sectionId);
    const offlineAudio=offlinePage.locator('#readerRoot audio').first();
    await offlineAudio.evaluate(async audio=>{await audio.play();});await offlinePage.waitForTimeout(120);
    const offlinePlayback=await offlineAudio.evaluate(audio=>({time:audio.currentTime,duration:audio.duration,error:audio.error?.message||null}));
    assert(offlinePlayback.time>0&&offlinePlayback.duration>0&&!offlinePlayback.error,'Native player plays the cached recording while offline');
    await offlineContext.setOffline(false);await offlineContext.close();
    fs.writeFileSync('/tmp/ling406-audio-browser-report.json',JSON.stringify({mappedSlides:entries.length,uniqueFiles:files.length,cached,offlinePlayback,rangeChecks:{prefix:{status:ranges.first.status,bytes:ranges.first.bytes.length},suffix:{status:ranges.last.status,bytes:ranges.last.bytes.length},unsatisfiable:{status:ranges.unsatisfiable.status,bytes:ranges.unsatisfiable.bytes.length}}},null,2)+'\n');
    assert.deepEqual(errors,[]);
    console.log(`PASS: ${entries.length} mapped slides, ${files.length} browser-decodable audio files, native playback/pause/resume, all transcript editions, single-player and stop behavior, notes/read/quiz preservation, review mapping, removed-player cleanup, light/dark mobile layouts, install-time full audio caching, offline native playback, and byte-range 206/416 handling.`);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
