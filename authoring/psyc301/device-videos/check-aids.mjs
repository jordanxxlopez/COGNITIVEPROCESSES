import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) errs.push(m.text()); });
await page.setViewport({ width: 1400, height: 900 });
await page.goto('http://localhost:8790/index.html', { waitUntil: 'load' }); await new Promise(r => setTimeout(r, 1500));
for (const v of ['m2ask', 'm2cards', 'm2contrasts', 'm2explain', 'm2guide']) {
  await page.evaluate(v => { view = v; render(); }, v); await new Promise(r => setTimeout(r, 300));
  const r = await page.evaluate(() => ({ h1: document.querySelector('#content h1')?.textContent, cards: document.querySelectorAll('#content .aid-card').length, ask: document.querySelectorAll('#content .aid-ask').length, expl: document.querySelectorAll('#content .aid-explain').length, inline: document.querySelectorAll('#content .aid-inline').length, nav: [...document.querySelectorAll('#workspaceNav button')].map(b => b.textContent).slice(0, 8) }));
  console.log(v, JSON.stringify(r));
}
await page.evaluate(() => { view = 'm2cards'; state.aids.filter = '13'; state.aids.test = true; render(); }); await new Promise(r => setTimeout(r, 300));
console.log('filtered13', await page.evaluate(() => ({ cards: document.querySelectorAll('#content .aid-card').length, hidden: document.querySelectorAll('#content .aid-card details').length })));
await page.reload({ waitUntil: 'load' }); await new Promise(r => setTimeout(r, 1500));
console.log('after reload', await page.evaluate(() => ({ view, f: state.aids && state.aids.filter, t: state.aids && state.aids.test })));
await page.evaluate(() => { state.aids.filter = 'all'; state.aids.test = false; save(); });
await page.goto('http://localhost:8790/share.html?module=ii', { waitUntil: 'load' }); await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => { view = 'm2explain'; render(); }); await new Promise(r => setTimeout(r, 300));
console.log('share explain', await page.evaluate(() => ({ view, n: document.querySelectorAll('#content .aid-explain').length })));
console.log('errors', errs.slice(0, 5)); await browser.close(); process.exit(0);
