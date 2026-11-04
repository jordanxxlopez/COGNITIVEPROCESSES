'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const data = read('data.json');
const version = read('transcripts-v2.json');
const original = new Map(data.collections.map(c => [c.id, c]));
const expected = ['lecture11', 'lecture12', 'lecture13', 'lecture14'];
const sections = new Map(data.collections.flatMap(c => c.sections.map(s => [s.id, s])));

test('Version 2 is an additional edition and leaves the released course data byte-for-byte intact', () => {
  assert.equal(sha('data.json'), 'f1316545ef0167572ad8b29d250416045801e5a82a1fd8daefe176ff8eb650bd');
  assert.equal(version.baseDataSha256, sha('data.json'));
  assert.equal(data.questions.length, 292);
  assert.equal(data.coverage.coreCount, 56);
  assert.equal(data.guide.length, 24);
  assert.deepEqual(Object.keys(version.collections), expected);
  assert.equal(version.id, 'v2');
});

test('all 86 original page identities have complete reviewed Version 2 teaching counterparts', () => {
  let count = 0;
  for (const key of expected) {
    const before = original.get(key);
    const after = version.collections[key];
    const author = read('authoring/teaching-v2-' + key + '.json')[key];
    assert.equal(after.title, before.title);
    assert.equal(after.sections.length, before.sections.length);
    for (const [index, section] of after.sections.entries()) {
      const source = before.sections[index];
      const reviewed = author.sections[index];
      for (const field of ['id', 'page', 'title', 'kind']) assert.equal(section[field], source[field]);
      assert.equal(Boolean(section.teaching.length), Boolean(source.teaching.length), section.id);
      assert.deepEqual(section.teaching, reviewed.teaching, section.id);
      assert(reviewed.review.pageInspected && reviewed.review.assetsInspected, section.id);
      assert(reviewed.review.method.trim(), section.id);
      if (section.teaching.length) {
        assert(reviewed.concepts.length, section.id);
        assert.notDeepEqual(section.teaching, source.teaching, section.id + ' must be a rewritten edition');
      }
      for (const paragraph of section.teaching) {
        assert.equal(typeof paragraph, 'string');
        assert(paragraph.trim());
        assert(!/<\/?[a-z][^>]*>/i.test(paragraph), 'Use supported emphasis rather than raw HTML');
      }
      count++;
    }
  }
  assert.equal(count, 86);
});

test('only reviewed blank video previews are hidden, while textual slides and overlays remain', () => {
  const review = read('authoring/transcripts-v2-visual-presentation.json');
  assert.equal(review.review.length, 48);
  assert.equal(Object.keys(version.visualPresentation).length, 35);
  for (const [id, flag] of Object.entries(version.visualPresentation)) {
    const source = sections.get(id);
    assert(expected.some(key => id.startsWith(key + '-p')));
    assert.equal(flag.hideStaticPreview, true);
    assert(source.assets.some(asset => asset.type === 'video'), id);
    assert.equal(flag.previewSha256, sha(source.image), id);
    const evidence = review.review.find(row => row.id === id);
    assert.equal(evidence.changedPixelFraction, 0, id);
    assert.equal(evidence.blank, true, id);
  }
  assert(version.visualPresentation['lecture11-p008']);
  for (const id of ['lecture11-p010', 'lecture13-p004', 'lecture13-p008', 'lecture14-p004', 'lecture14-p007', 'lecture14-p011', 'lecture14-p012', 'lecture14-p013']) {
    assert(!version.visualPresentation[id], id + ' contains written content or overlays');
  }
});

test('uploaded review and key are preserved separately as writing evidence', () => {
  assert.equal(version.references.length, 2);
  for (const reference of version.references) {
    assert.equal(sha(reference.file), reference.sha256);
    assert(reference.title && reference.kind);
  }
  assert.equal(sha('sources/exam-review-v2.docx'), sha('sources/exam-review.docx'));
  assert.equal(sha('sources/exam1-key.pdf'), '5c53fb6f375493432c6395aa481d2cf706bf098bcff544c57ac0775ec52f002a');
  assert.equal(read('authoring/v2-reference-extraction/exam1-key-pages.json').length, 5);
  assert.equal(read('authoring/v2-reference-extraction/exam-review-v2-pages.json').length, 3);
  for (const asset of read('authoring/v2-reference-extraction/embedded-images.json')) {
    assert.equal(sha(asset.file), asset.sha256);
    assert.equal(typeof asset.ocr, 'string');
  }
});

test('the independent review is bound to the final source, teaching, and runtime files', () => {
  const audit = read('authoring/transcripts-v2-audit.json');
  assert.equal(audit.status, 'passed');
  assert.deepEqual(audit.unresolvedBlockingFindings, []);
  assert.equal(audit.scope.version2Sections, 86);
  assert.equal(audit.independence.reviewerAuthoredVersion2Teaching, false);
  let checked = 0;
  function verify(value) {
    if (!value || typeof value !== 'object') return;
    if (typeof value.file === 'string' && typeof value.sha256 === 'string') {
      assert.equal(sha(value.file), value.sha256, value.file);
      checked++;
    }
    Object.values(value).forEach(verify);
  }
  verify(audit);
  assert(checked > 20, 'The review must bind its actual evidence and final outputs.');
});
