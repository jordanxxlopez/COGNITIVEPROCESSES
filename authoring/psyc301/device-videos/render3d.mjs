// node render3d.mjs <id> -> out-v2/<id>.mp4 : Three.js full-screen 3D scene, frame-stepped, with ready beep.
import puppeteer from 'puppeteer-core';
import { spawn, spawnSync } from 'node:child_process';
const id = process.argv[2]; const FPS = 60, W = 1280, H = 720, FF = '/opt/homebrew/bin/ffmpeg';
const srv = spawn('python3', ['-m', 'http.server', '8767'], { stdio: 'ignore', detached: true }); srv.unref();
await new Promise(r => setTimeout(r, 700));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage(); await page.setViewport({ width: W, height: H });
await page.goto('http://localhost:8767/index3d.html', { waitUntil: 'load' });
await page.waitForFunction('window.sceneReady3d === true', { timeout: 30000 });
const dur = await page.evaluate(() => window.scene3d.duration);
const silent = `out-v2/${id}.silent.mp4`;
const ff = spawn(FF, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', silent], { stdio: ['pipe', 'ignore', 'ignore'] });
const frames = Math.round(dur / 1000 * FPS);
for (let f = 0; f < frames; f++) {
  const url = await page.evaluate(ms => window.renderFrame3d(ms), f * 1000 / FPS);
  const buf = Buffer.from(url.split(',')[1], 'base64');
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end(); await new Promise(r => ff.on('close', r));
await browser.close(); srv.kill();
const out = `out-v2/${id}.mp4`; const T0 = 5000;
spawnSync(FF, ['-y', '-i', silent, '-f', 'lavfi', '-t', '0.15', '-i', 'sine=frequency=1000:sample_rate=44100',
  '-filter_complex', `[1:a]volume=0.5,adelay=${T0 - 300}|${T0 - 300}[a];[a]apad[aud]`, '-map', '0:v', '-map', '[aud]', '-c:v', 'copy', '-c:a', 'aac', '-t', String(dur / 1000), out], { stdio: 'ignore' });
console.log('wrote', out, frames, 'frames'); process.exit(0);
