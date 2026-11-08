// node render2.mjs <sceneId>  -> out-v2/<sceneId>.mp4  (full-screen 1280x720, 60 fps, frame-stepped, sine-tone audio cues)
import puppeteer from 'puppeteer-core';
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const id = process.argv[2]; const FPS = 60, W = 1280, H = 720, FF = '/opt/homebrew/bin/ffmpeg';
mkdirSync('out-v2', { recursive: true });
const { execFileSync } = await import('node:child_process');
const srv = spawn('python3', ['-m', 'http.server', '8766'], { stdio: 'ignore', detached: true }); srv.unref();
await new Promise(r => setTimeout(r, 700));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage(); await page.setViewport({ width: W, height: H });
await page.goto('http://localhost:8766/index.html', { waitUntil: 'load' });
await page.waitForFunction('window.sceneReady === true');
const { dur, events } = await page.evaluate(id => ({ dur: window.sceneList[id].duration, events: window.sceneList[id].events || [] }), id);
const silent = `out-v2/${id}.silent.mp4`;
const ff = spawn(FF, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', silent], { stdio: ['pipe', 'ignore', 'ignore'] });
const frames = Math.round(dur / 1000 * FPS);
for (let f = 0; f < frames; f++) {
  const ms = f * 1000 / FPS;
  await page.evaluate((id, ms) => window.renderScene(id, ms), id, ms);
  const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end(); await new Promise(r => ff.on('close', r));
await browser.close(); srv.kill();
// Audio: one sine input per cue, delayed to its onset, mixed to mono 44.1 kHz; silent track if no cues.
const out = `out-v2/${id}.mp4`;
const _unused = 0;
const sec = dur / 1000;
const args = ['-y', '-i', silent];
events.forEach(e => (e.file ? args.push('-i', e.file) : args.push('-f', 'lavfi', '-t', String(e.dur), '-i', `sine=frequency=${e.hz}:sample_rate=44100`)));
let fc = events.map((e, i) => `[${i + 1}:a]volume=${e.file ? 1 : 0.5},adelay=${Math.round(e.t)}|${Math.round(e.t)}[a${i}]`).join(';');
fc += (events.length ? ';' + events.map((_, i) => `[a${i}]`).join('') + `amix=inputs=${events.length}:normalize=0,apad[aud]` : '');
if (events.length) args.push('-filter_complex', fc, '-map', '0:v', '-map', '[aud]', '-c:v', 'copy', '-c:a', 'aac', '-t', String(sec), out);
else args.push('-c:v', 'copy', '-t', String(sec), out);
spawnSync(FF, args, { stdio: 'ignore' });
console.log('wrote', out, frames, 'frames'); process.exit(0);
