const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'modern/content.js'), 'utf8'), context);
const pack = JSON.parse(JSON.stringify(context.window.LING285_MODERN));
const data = read('data.json');
const lectures = data.collections.filter(c => c.role === 'lecture');
const sourcePages = new Set(lectures.flatMap(c => c.sections.map(s => `${c.id}:${s.page}`)));
const checkRefs = refs => {
  assert(refs.length > 0, 'authored item needs source references');
  for (const r of refs) assert(sourcePages.has(`${r.collection}:${r.page}`), JSON.stringify(r));
};

test('original content, editions and uploaded documents retain their frozen hashes', () => {
  for (const [file, expected] of Object.entries(read('modern/preserved.json'))) assert.equal(hash(file), expected, file);
  for (const source of pack.uploads) assert.equal(hash(source.file), source.sha256, source.file);
  assert.equal(hash('app.js'), read('modern/build-manifest.json').sourceAppSha256);
});

test('Module II layout changes preserve every modern authored content file exactly', () => {
  for (const [file, expected] of Object.entries(read('modern/layout-content-lock.json'))) assert.equal(hash(file), expected, file);
});

test('all five new editions preserve every source page and unpadded title page', () => {
  assert.equal(Object.keys(pack.editions).length, 5);
  assert.equal(lectures.reduce((n, c) => n + c.sections.length, 0), 286);
  for (const edition of Object.keys(pack.editions)) {
    const payload = read(`modern/transcripts-${edition}.json`);
    assert.equal(payload.id, edition);
    for (const original of lectures) {
      const rewritten = payload.collections[original.id];
      assert.deepEqual(rewritten.sections.map(s => [s.id, s.page]), original.sections.map(s => [s.id, s.page]));
      assert.equal(rewritten.sections[0].teaching.length, 0, original.id);
      for (const s of rewritten.sections) {
        const expected = !!pack.pageConcepts[original.id][s.page];
        assert.equal(s.teaching.length > 0, expected, `${edition}:${s.id}`);
        const prose = JSON.stringify(s.teaching);
        assert(!/\b(?:the lecture|the class|the professor|he says|she says|need not|earlier slides?|later slides?)\b/i.test(prose), s.id);
        if (expected) assert.notDeepEqual(s.teaching, original.sections[s.page - 1].teaching);
      }
    }
  }
});

test('new section content and question answers resolve to original source pages', () => {
  for (const q of [...pack.qa, ...pack.questions, ...pack.writing, ...pack.connections]) checkRefs(q.sources);
  for (const g of pack.guides) for (const point of g.points) checkRefs(point.pages.map(page => ({collection: point.collection, page})));
  for (const list of ['asked', 'cards', 'contrasts', 'hard', 'review', 'code', 'figures']) {
    for (const item of pack[list]) checkRefs(item.pages.map(page => ({collection: item.collection, page})));
  }
  assert.equal(pack.guides.length, 30);
  assert.equal(pack.review.length, 21);
  assert.deepEqual(pack.review.map(r => r.number), Array.from({length: 21}, (_, i) => i + 1));
  assert(pack.writing.length > 200);
  assert.equal(pack.coverage.distinctWritingPrompts, new Set(pack.writing.map(q => q.prompt)).size);
});

test('each current lecture has 25 fresh MCQs and 25 written prompts with stable owners', () => {
  const current = pack.questions.filter(q => q.moduleId === 'module2');
  assert.equal(current.length, 400);
  assert.equal(new Set(pack.questions.map(q => q.id)).size, pack.questions.length);
  const oldIds = new Set([...data.questions, ...read('practice-v2.json').questions, ...read('practice-v3.json').questions].map(q => q.id));
  for (const c of lectures.filter(c => c.moduleId === 'module2')) {
    const qs = current.filter(q => q.lectureId === c.id);
    assert.equal(qs.length, 50, c.id);
    assert.equal(qs.filter(q => q.type === 'mcq').length, 25, c.id);
    assert.equal(qs.filter(q => q.type === 'written').length, 25, c.id);
    assert.equal(new Set(qs.map(q => q.wordings.simple)).size, 50, c.id);
    for (const q of qs) {
      assert(!oldIds.has(q.id));
      assert(q.sources.some(s => s.collection === c.id), q.id);
      assert.deepEqual(Object.keys(q.wordings).sort(), ['college', 'original', 'simple']);
      for (const wording of Object.values(q.wordings)) assert(!/\b(?:the lecture|the class|the professor)\b/i.test(wording));
      if (q.type === 'mcq') {
        assert.equal(q.options.length, 4);
        assert.equal(new Set(q.options.map(o => o.text)).size, 4);
        assert.equal(new Set(q.options.map(o => o.feedback)).size, 4, 'individual reasoning for every option');
        assert(q.options.some(o => o.id === q.correctOption));
      }
    }
  }
});

test('supplied-review figures, native program structure and necessary examples remain available', () => {
  for (const n of [6, 11, 14, 15, 20]) {
    const r = pack.review.find(r => r.number === n);
    assert(r.image && fs.existsSync(path.join(root, r.image)), `review figure ${n}`);
  }
  assert.match(pack.review[6].answer, /1,?000/);
  assert.match(pack.review[9].answer, /150.*300.*450.*600.*750/s);
  assert.match(pack.review[19].answer, /three|3/i);
  assert(pack.code.some(c => c.code.includes('nn.Sequential')));
  assert(pack.code.some(c => c.code.includes('backward')));
  assert.equal(pack.figures.filter(f => f.moduleId === 'module2').length, 35);
});

test('prediction model records actual inputs and sensitivity, without calling scores probabilities', () => {
  const model = read('modern/model-report.json');
  assert.equal(model.sourcePrompts, 66);
  assert.equal(model.models.length, 3);
  assert.match(model.limits, /not the probability/);
  assert.match(model.limits, /No unseen Exam 2 outcomes/);
  for (const s of model.sourceFiles) assert.equal(hash(s.file), s.sha256);
  assert(model.ranking.some(r => r.concept === 'backward' && r.transcriptCues.length));
  for (const r of model.ranking) assert(r.topTwelveSensitivityRuns >= 0 && r.topTwelveSensitivityRuns <= 500);
});
