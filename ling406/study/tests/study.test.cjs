// node --test ling406/study/tests/   (from the repo root)
const test = require('node:test'), assert = require('node:assert'), fs = require('fs'), path = require('path'), vm = require('vm'), { execFileSync } = require('child_process');
const L = path.resolve(__dirname, '../..'), S = path.join(L, 'study');
const MODS = [['m1', 'module1/index.html', '../'], ['m2', 'index.html', ''], ['m3', 'module3/index.html', '../']];

test('every module passes the study checker', () => {
  for (const [m] of MODS) {
    const out = execFileSync('node', [path.join(S, 'build.cjs'), 'check', m], { encoding: 'utf8' });
    assert.match(out, /^PASS /m, m);
  }
});
test('built data matches the authoring files', () => {
  for (const [m] of MODS) {
    const w = {}; vm.runInNewContext(fs.readFileSync(path.join(S, 'data', m + '.js'), 'utf8'), { window: w });
    const d = w.LING406_STUDY[m];
    const topics = JSON.parse(fs.readFileSync(path.join(S, 'authoring', m, 'topics.json'), 'utf8'));
    const review = JSON.parse(fs.readFileSync(path.join(S, 'authoring', m, 'review.json'), 'utf8'));
    assert.deepEqual(d.topics, topics, m + ' topics are stale, run build');
    assert.deepEqual(d.review, review, m + ' review is stale, run build');
    assert.ok(d.wording && Object.keys(d.wording).length, m + ' wording missing');
  }
});
test('the three pages load the study data and script after modern-versions.js', () => {
  for (const [m, page, pre] of MODS) {
    const html = fs.readFileSync(path.join(L, page), 'utf8');
    const i = html.indexOf(`${pre}modern/modern-versions.js`), j = html.indexOf(`${pre}study/data/${m}.js`), k = html.indexOf(`${pre}study/study.js`);
    assert.ok(i > 0 && j > i && k > j, page);
    assert.ok(html.includes(`${pre}study/study.css?v=`), page);
  }
});
