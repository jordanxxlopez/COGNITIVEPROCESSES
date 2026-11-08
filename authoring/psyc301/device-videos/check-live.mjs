import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto('https://jordanxxlopez.github.io/COGNITIVEPROCESSES/index.html', { waitUntil: 'load' });
await new Promise(r => setTimeout(r, 3000));
console.log(await page.evaluate(() => ({ clips: window.PsycVideos && window.PsycVideos.clips.length, l9: window.PsycVideos && window.PsycVideos.clips.filter(c => c.id.startsWith('L9-')).length })));
await browser.close(); process.exit(0);
