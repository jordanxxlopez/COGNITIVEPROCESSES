import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto('https://jordanxxlopez.github.io/COGNITIVEPROCESSES/index.html', { waitUntil: 'load' });
await new Promise(r => setTimeout(r, 2500));
console.log(await page.evaluate(() => [...document.querySelectorAll('button, a')].map(b => b.innerText.trim()).filter(t => /^\d{2}\s/.test(t)).join('\n')));
await browser.close(); process.exit(0);
