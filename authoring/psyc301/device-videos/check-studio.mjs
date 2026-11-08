import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage(); const errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.goto('http://localhost:8790/index.html', { waitUntil: 'load' });
await new Promise(r => setTimeout(r, 2000));
console.log(await page.evaluate(() => ({ clips: window.PsycVideos && window.PsycVideos.clips.length, m2: window.PsycVideos && window.PsycVideos.clips.filter(c => c.id.startsWith('m2-')).length })));
console.log('errors:', errs.slice(0, 3));
await browser.close(); process.exit(0);
