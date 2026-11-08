// Usage: node render.mjs <sceneId>  -> out/<sceneId>.mp4 (frame-stepped, exact timing, tone added with ffmpeg)
import puppeteer from 'puppeteer-core';
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const id = process.argv[2]; const FPS = 60; const W = 960, H = 600;
mkdirSync('out', { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });
const page = await browser.newPage(); await page.setViewport({ width: W, height: H });
await page.goto('http://localhost:8765/index.html', { waitUntil: 'load' });
await page.waitForFunction('window.sceneReady && window.stageReady');
const dur = await page.evaluate(id => window.sceneList[id].duration, id);
const tone = await page.evaluate(id => window.sceneList[id].tone || null, id);
const silent = `out/${id}.silent.mp4`;
const ff = spawn('/opt/homebrew/bin/ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', silent], { stdio: ['pipe', 'ignore', 'inherit'] });
const frames = Math.round(dur / 1000 * FPS);
for (let f = 0; f < frames; f++) {
  const ms = f * 1000 / FPS;
  await page.evaluate((id, ms) => window.renderScene(id, ms), id, ms);
  const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end(); await new Promise(r => ff.on('close', r));
const out = `out/${id}.mp4`;
const args = ['-y', '-i', silent];
if (tone) args.push('-f', 'lavfi', '-t', String(dur / 1000), '-i', `sine=frequency=${tone[2]}:sample_rate=44100`);
if (tone) {
  const delay = tone[0], len = tone[1];
  args.push('-filter_complex', `[1:a]atrim=0:${len / 1000},asetpts=PTS-STARTPTS,volume=0.4,adelay=${delay}|${delay}[a]`, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-t', String(dur / 1000), out);
} else args.push('-c', 'copy', out);
spawnSync('/opt/homebrew/bin/ffmpeg', args, { stdio: 'inherit' });
await browser.close();
console.log('wrote', out, frames, 'frames');
