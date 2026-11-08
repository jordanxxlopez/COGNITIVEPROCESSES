// node frames2d.mjs <sceneId> <start> <end>  -> frames2d/<sceneId>/f%05d.png (canvas read directly, no screenshots)
import puppeteer from 'puppeteer-core';
import { writeFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
const [id, start, end] = [process.argv[2], Number(process.argv[3]), Number(process.argv[4])];
const dir = `frames2d/${id}`; mkdirSync(dir, { recursive: true });
const srv = spawn('python3', ['-m', 'http.server', '8771'], { stdio: 'ignore', detached: true }); srv.unref();
await new Promise(r => setTimeout(r, 600));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 720 });
await page.goto('http://localhost:8771/index.html', { waitUntil: 'load' });
await page.waitForFunction('window.sceneReady === true', { timeout: 30000 });
const dur = await page.evaluate(i => window.sceneList[i].duration, id);
const last = Math.min(end, Math.round(dur / 1000 * 60));
for (let f = start; f < last; f++) {
  const url = await page.evaluate((i, ms) => { window.renderScene(i, ms); return document.getElementById('c').toDataURL('image/png'); }, id, f * 1000 / 60);
  writeFileSync(`${dir}/f${String(f).padStart(5, '0')}.png`, Buffer.from(url.split(',')[1], 'base64'));
}
await browser.close(); srv.kill(); process.exit(0);
