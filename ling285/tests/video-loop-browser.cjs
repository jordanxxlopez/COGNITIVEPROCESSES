'use strict';
// Run from any directory. Optional: BASE_URL, CHROME_PATH, PUPPETEER_MODULE,
// ARTIFACT_DIR. Otherwise this serves the repository with media byte ranges.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
function puppeteerModule() {
  for (const name of [process.env.PUPPETEER_MODULE, 'puppeteer-core', 'puppeteer',
    path.join(root, 'authoring/psyc301/device-videos/node_modules/puppeteer-core')].filter(Boolean)) {
    try { return require(name); } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }
  }
  throw Error('Install puppeteer-core or set PUPPETEER_MODULE to its installed directory.');
}
function serve() {
  const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css',
    '.json':'application/json', '.mp4':'video/mp4', '.wav':'audio/wav', '.mp3':'audio/mpeg',
    '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml'};
  return http.createServer((req, res) => {
    let target;
    try { target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); }
    catch { res.writeHead(400).end(); return; }
    if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403).end(); return; }
    try {
      if (fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
      const size = fs.statSync(target).size;
      res.setHeader('Content-Type', types[path.extname(target)] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Accept-Ranges', 'bytes');
      const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
      let start = 0, end = size - 1;
      if (range) {
        start = Number(range[1]); end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
        if (start > end) { res.writeHead(416, {'Content-Range':`bytes */${size}`}).end(); return; }
        res.statusCode = 206;
        res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
      }
      res.setHeader('Content-Length', end - start + 1);
      if (req.method === 'HEAD') { res.end(); return; }
      const stream = fs.createReadStream(target, {start, end});
      stream.on('error', () => res.destroy()); stream.pipe(res);
      res.on('close', () => stream.destroy());
    } catch { res.writeHead(404).end(); }
  });
}
const sourceFile = '6fdaa70e0bfab83a6d83.mp4';
const source = (scope, file = sourceFile) => `${scope} video:has(source[src$="${file}"],source[data-src$="${file}"])`;
const player = video => video.replace(' video', ' .fit-player');
const control = (video, name) => `${player(video)} [data-fit-control="${name}"]`;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  let server, browser, page;
  const checks = [], skipped = [], errors = [];
  try {
    let base = process.env.BASE_URL?.replace(/\/$/, '');
    if (!base) {
      server = serve(); await new Promise((resolve,reject) => {
        server.once('error',reject); server.listen(0,'127.0.0.1',resolve);
      });
      base = `http://127.0.0.1:${server.address().port}`;
    }
    const chrome = process.env.CHROME_PATH || [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'
    ].find(file => fs.existsSync(file));
    assert(chrome, 'Set CHROME_PATH to an installed Chrome/Chromium browser.');
    browser = await puppeteerModule().launch({executablePath:chrome, headless:true});
    page = await browser.newPage();
    await page.setViewport({width:1600, height:1000});
    page.setDefaultTimeout(15000);
    page.on('pageerror', error => errors.push(String(error)));
    const wait = (fn, ...args) => page.waitForFunction(fn, {timeout:15000, polling:50}, ...args);
    const state = selector => page.$eval(selector, video => ({
      paused:video.paused, time:video.currentTime, duration:video.duration, loop:video.loop,
      muted:video.muted, autoplay:video.autoplay, ready:video.readyState, src:video.currentSrc
    }));
    const scrollTo = selector => page.$eval(selector, video => video.scrollIntoView({block:'center', behavior:'instant'}));
    const playing = async selector => {
      await wait(s => { const v=document.querySelector(s); return v && !v.paused && v.readyState>=2 && v.currentTime>0.05; }, selector);
      const before = await state(selector);
      await wait((s, time) => { const v=document.querySelector(s); return !v.paused && (v.currentTime>time+0.1 || v.currentTime<time-1); }, selector, before.time);
      return state(selector);
    };
    const unchanged = async (selector, expected) => {
      // Observe for long enough to catch delayed intersection/media callbacks.
      for (let i=0;i<6;i++) {
        await sleep(100);
        const actual=await state(selector);
        assert.equal(actual.paused, true, 'Paused video unexpectedly restarted');
        assert(Math.abs(actual.time-expected)<0.15, `Paused time changed: ${expected} -> ${actual.time}`);
      }
    };
    const seek = async (selector, time) => {
      await page.$eval(control(selector, 'seek'), (input, value) => {
        input.value=String(value); input.dispatchEvent(new Event('input',{bubbles:true}));
        input.dispatchEvent(new Event('change',{bubbles:true}));
      }, time);
      await wait((s, value) => { const v=document.querySelector(s); return !v.seeking && Math.abs(v.currentTime-value)<0.5; }, selector, time);
    };
    const checkControls = async selector => {
      for (const name of ['play','seek','speed','fullscreen']) {
        await page.waitForSelector(control(selector,name));
        const visible=await page.$eval(control(selector,name), el => { const r=el.getBoundingClientRect(); return r.width>0 && r.height>0 && getComputedStyle(el).visibility!=='hidden'; });
        assert(visible, `${name} control is hidden`);
      }
      assert.equal(await page.$eval(control(selector,'seek'), el=>el.disabled),false);
    };
    const mark = name => { checks.push(name); console.log('PASS '+name); };

    await page.goto(base+'/ling285/modern/?view=collection&lecture=lecture12&module=module2', {waitUntil:'networkidle2'});
    await page.waitForSelector('[data-section="lecture12-p006"]');
    // This video starts inside a closed section with only a deferred source.
    const notes=source('[data-section="lecture12-p006"]');
    assert.equal((await state(notes)).paused,true);
    await page.click('[data-section="lecture12-p006"] > summary');
    await scrollTo(notes);
    const started=await playing(notes);
    assert.equal(started.loop,true); assert.equal(started.muted,true);
    assert(started.src.endsWith(sourceFile));
    assert(Math.abs(started.duration-60)<0.1, 'Original full 60-second video must remain intact');
    await checkControls(notes);
    mark('Lecture 12 page 6 lazy source autoplays silently at full length');

    await seek(notes, started.duration-0.4);
    await wait(s => { const v=document.querySelector(s); return !v.paused && v.currentTime<2; }, notes);
    await playing(notes);
    mark('Playback wraps from the original end to the beginning');

    await page.click(control(notes,'play'));
    await wait(s=>document.querySelector(s).paused,notes);
    await seek(notes,8);
    await page.select(control(notes,'speed'),'1.5');
    assert.equal(await page.$eval(notes,v=>v.playbackRate),1.5);
    const pausedTime=(await state(notes)).time;
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await unchanged(notes,pausedTime);
    await scrollTo(notes); await unchanged(notes,pausedTime);
    await page.click(control(notes,'play')); await playing(notes);
    await page.select(control(notes,'speed'),'1');
    mark('Play/pause, seeking and speed work; manual pause survives scrolling');

    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await wait(s=>document.querySelector(s).paused,notes);
    await scrollTo(notes); await playing(notes);
    mark('Offscreen automatic pause resumes when the source is visible again');

    if (await page.$eval(notes,v=>document.pictureInPictureEnabled && typeof v.requestPictureInPicture==='function')) {
      await page.click(control(notes,'pip'));
      await wait(s=>document.pictureInPictureElement===document.querySelector(s) ||
        document.querySelector(s).closest('.fit-player').querySelector('.fit-player-status').textContent.trim(),notes);
      if (await page.$eval(notes,v=>document.pictureInPictureElement===v)) {
        await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
        const pipTime=(await state(notes)).time;
        await wait((s,time)=>{const v=document.querySelector(s);return !v.paused && v.currentTime>time+0.5;},notes,pipTime);
        await page.evaluate(()=>document.exitPictureInPicture());
        await wait(s=>document.querySelector(s).paused,notes);
        await scrollTo(notes); await playing(notes);
        mark('Picture in picture keeps playing offscreen and restores visibility behavior on exit');
      } else {
        skipped.push('Picture in picture: '+await page.$eval(player(notes)+' .fit-player-status',el=>el.textContent));
      }
    } else skipped.push('Picture in picture is unavailable in this browser');

    await page.click('[data-reader="lecture"][data-expanded="false"]');
    await page.select('.inline-reader #readerSelect','5');
    await page.waitForSelector('.inline-reader [data-note="lecture12-p006"]');
    const inline=source('.inline-reader');
    await scrollTo(inline); await playing(inline); await checkControls(inline);
    await page.click('[data-reader="lecture"][data-expanded="true"]');
    await page.waitForSelector('#readerDialog[open] [data-note="lecture12-p006"]');
    const expanded=source('#readerDialog');
    await scrollTo(expanded); await playing(expanded); await checkControls(expanded);
    await page.select('#readerDialog #readerSelect','6');
    await page.select('#readerDialog #readerSelect','5');
    await scrollTo(expanded); await playing(expanded);
    mark('Inline, expanded and freshly recreated Lecture 12 page 6 players autoplay');

    await page.goto(base+'/ling285/modern/?view=stimuli&module=module2', {waitUntil:'networkidle2'});
    const first='[data-stimulus="source-3a173c997457e2f0c60b"] video';
    const second='[data-stimulus="source-e7a1853082e98dd26757"] video';
    await scrollTo(first); await playing(first); await playing(second);
    const pairTimes=await Promise.all([state(first),state(second)]);
    await wait((a,b,times)=>[a,b].every((s,i)=>{const v=document.querySelector(s); return !v.paused && v.currentTime>times[i].time+0.3;}),first,second,pairTimes);
    mark('Two visible original silent videos keep playing together');

    const audible='[data-stimulus="human-vowels"] video';
    await scrollTo(audible);
    await wait(s=>document.querySelector(s).readyState>=1,audible);
    const sound=await state(audible);
    assert.equal(sound.paused,true); assert.equal(sound.muted,false);
    assert.equal(sound.loop,false); assert.equal(sound.autoplay,false);
    await unchanged(audible,sound.time);
    await page.click(control(audible,'play'));
    await playing(audible);
    assert.equal((await state(audible)).muted,false);
    await page.click(control(audible,'play'));
    for (const id of ['harmonic-series','spectrogram']) {
      const media=`[data-stimulus="${id}"] video`;
      await scrollTo(media);
      const result=await state(media);
      assert.equal(result.paused,true); assert.equal(result.muted,false);
      assert.equal(result.loop,false); assert.equal(result.autoplay,false);
    }
    mark('Audible vowel, harmonic and spectrogram demonstrations stay opt-in and unmuted');

    // Modern Module I and the retained original workspace must keep their behavior.
    for (const [route,selector,label] of [
      ['/ling285/modern/?view=stimuli&module=module1','[data-stimulus="source-caa27e684380371174b1"] video','Modern Module I'],
      ['/ling285/?view=collection&lecture=lecture12&module=module2',notes,'Original workspace']
    ]) {
      await page.goto(base+route,{waitUntil:'networkidle2'});
      await page.waitForSelector(selector);
      if (label==='Original workspace') await page.click('[data-section="lecture12-p006"] > summary');
      await scrollTo(selector);
      await wait(s=>document.querySelector(s).readyState>=1,selector);
      const result=await state(selector);
      assert.equal(result.loop,false,label+' unexpectedly loops');
      assert.equal(result.muted,false,label+' unexpectedly muted');
      assert.equal(result.autoplay,false,label+' unexpectedly autoplays');
      await unchanged(selector,result.time);
      await checkControls(selector);
      mark(label+' remains unchanged');
    }
    // At phone width, the controls can remain visible after the video is
    // scrolled above its independently scrolling visual pane.
    await page.setViewport({width:319,height:898});
    await page.goto(base+'/ling285/modern/?view=collection&lecture=lecture12&module=module2',{waitUntil:'networkidle2'});
    await page.waitForSelector('[data-reader="lecture"][data-expanded="false"]');
    if(!await page.$eval('body',body=>body.classList.contains('side-closed')))
      await page.click('#sidebar [data-action="sidebar"]');
    await page.click('[data-reader="lecture"][data-expanded="false"]');
    await page.select('.inline-reader #readerSelect','5');
    const narrow=source('.inline-reader');
    await scrollTo(narrow);await playing(narrow);
    await page.$eval(narrow,video=>{
      const pane=video.closest('.reader-visual');
      pane.scrollTop+=video.getBoundingClientRect().bottom-pane.getBoundingClientRect().top+3;
    });
    await wait(s=>document.querySelector(s).paused,narrow);
    assert(await page.$eval(narrow,video=>video.getBoundingClientRect().bottom<=video.closest('.reader-visual').getBoundingClientRect().top+1));
    await page.click(control(narrow,'play'));
    const narrowTime=(await playing(narrow)).time;
    await wait((s,time)=>{const video=document.querySelector(s);return !video.paused && video.currentTime>time+0.5;},narrow,narrowTime);
    await page.click(control(narrow,'play'));
    await wait(s=>document.querySelector(s).paused,narrow);
    await unchanged(narrow,(await state(narrow)).time);
    mark('Narrow reader Play and Pause remain usable when the video scrolls above its controls');
    assert.deepEqual(errors,[], 'Unexpected browser exceptions');
    console.log(JSON.stringify({passed:true,browser:await browser.version(),checks,skipped},null,2));
  } catch (error) {
    if (page) {
      console.error('Browser state:',await page.evaluate(()=>({url:location.href,videos:[...document.querySelectorAll('video')].filter(v=>v.getBoundingClientRect().width).map(v=>({src:v.currentSrc||v.querySelector('source')?.dataset.src,paused:v.paused,time:v.currentTime,duration:v.duration,ready:v.readyState,loop:v.loop,muted:v.muted,rect:{top:v.getBoundingClientRect().top,bottom:v.getBoundingClientRect().bottom},data:{...v.dataset}}))})).catch(()=>null));
      const artifacts=process.env.ARTIFACT_DIR || path.join(os.tmpdir(),'ling285-video-loop-test');
      fs.mkdirSync(artifacts,{recursive:true});
      await page.screenshot({path:path.join(artifacts,'failure.png')}).catch(()=>{});
      console.error('Failure screenshot: '+path.join(artifacts,'failure.png'));
    }
    throw error;
  } finally {
    if(browser)await browser.close();
    if(server)await new Promise(resolve=>server.close(resolve));
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
