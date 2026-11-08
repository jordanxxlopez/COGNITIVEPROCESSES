import puppeteer from 'puppeteer-core';
const times = process.argv.slice(2).map(Number);
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 720 });
await page.goto('http://localhost:8767/index3d.html', { waitUntil: 'load' });
await page.waitForFunction('window.sceneReady3d === true', { timeout: 30000 });
for (const ms of times) { await page.evaluate(m => window.renderScene3d(null, m), ms); await page.screenshot({ path: `out-v2/snap3d-${ms}.png`, clip: { x: 0, y: 0, width: 1280, height: 720 } }); }
await browser.close(); process.exit(0);
