// node frames3d.mjs <start> <end> : writes frames-white/chain-<n>.png (60 fps) for frames [start,end)
import puppeteer from 'puppeteer-core';
import { writeFileSync, mkdirSync } from 'node:fs';
const [start, end] = process.argv.slice(2).map(Number);
mkdirSync('frames', { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 720 });
await page.goto('http://localhost:8767/index3d.html', { waitUntil: 'load' });
await page.waitForFunction('window.sceneReady3d === true', { timeout: 30000 });
for (let f = start; f < end; f++) {
  const url = await page.evaluate(ms => window.renderFrame3d(ms), f * 1000 / 60);
  writeFileSync(`frames-white/chain-${String(f).padStart(5, '0')}.png`, Buffer.from(url.split(',')[1], 'base64'));
}
await browser.close(); process.exit(0);
