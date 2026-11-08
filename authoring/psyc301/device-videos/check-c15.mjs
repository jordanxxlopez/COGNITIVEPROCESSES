import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await page.setViewport({ width: 1400, height: 900 });
await page.goto('http://localhost:8790/index.html', { waitUntil: 'load' }); await new Promise(r => setTimeout(r, 1500));
const bad = /Risko|Frederick|Conrad|Murray|Baddeley|McGeoch|Keppel|Duncker|Adamson|Johnson|Goldstein|Gardner|Salam|Jones|Cowan|De Neys|replicat|extended|lecture|O.Brien|Weigard|Fagley|Gilbert/i;
await page.evaluate(() => { selected = 14; view = 'module'; render(); });
await new Promise(r => setTimeout(r, 500));
console.log('options:', await page.evaluate(() => [...document.querySelectorAll('[data-explanation-version="14"] option')].map(o => o.value + '|' + o.textContent)));
for (const v of ['r20', 'r21', 'r22', '22', 'A']) {
  await page.evaluate(v => { state.explanationVersions[14] = v; save(); render(); }, v);
  await new Promise(r => setTimeout(r, 400));
  const t = await page.evaluate(() => document.querySelector('#content').innerText);
  const hits = [...t.matchAll(new RegExp(bad, 'gi'))].map(m => m[0]);
  console.log(v, 'len', t.length, 'bannedHits', [...new Set(hits)].join(','), 'selectVal', await page.evaluate(() => document.querySelector('[data-explanation-version="14"]').value));
}
// real UI change + reload persistence
await page.select('[data-explanation-version="14"]', 'r21'); await new Promise(r => setTimeout(r, 400));
await page.reload({ waitUntil: 'load' }); await new Promise(r => setTimeout(r, 1500));
console.log('after reload:', await page.evaluate(() => ({ view, selected, v: state.explanationVersions[14], sel: document.querySelector('[data-explanation-version="14"]')?.value })));
console.log('errors:', errs.slice(0, 5));
await browser.close(); process.exit(0);
