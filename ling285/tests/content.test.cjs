'use strict';
// Run with node --test ling285/tests/content.test.cjs from the repository root.
// These checks protect the supplied-source scope and the distinctions that were
// explicitly resolved during authoring. They do not automatically grade prose.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'source-manifest.json'), 'utf8'));
const byCollection = new Map(data.collections.map(collection => [collection.id, collection]));
const sections = data.collections.flatMap(collection => collection.sections);
const lectures = data.collections.filter(collection => collection.role === 'lecture');
const allAuthored = sections.flatMap(section => section.teaching).join('\n');
function section(collection, page) {
  const result = byCollection.get(collection)?.sections.find(item => item.page === page);
  assert(result, `Missing source section ${collection}, page ${page}`);
  return result;
}
function text(collection, page) { return section(collection, page).teaching.join('\n'); }
function localFile(relative) {
  assert.equal(typeof relative, 'string');
  assert(relative && !path.isAbsolute(relative), `Expected relative source path: ${relative}`);
  const target = path.resolve(root, relative);
  assert(target.startsWith(root + path.sep), `Path escapes the studio: ${relative}`);
  const stat = fs.statSync(target);
  assert(stat.isFile() && stat.size > 0, `Missing or empty source artifact: ${relative}`);
  return target;
}
function reference(ref) {
  assert(byCollection.has(ref.collection), `Unknown student collection ${ref.collection}`);
  assert(Number.isInteger(ref.page), `Noninteger source page in ${JSON.stringify(ref)}`);
  return section(ref.collection, ref.page);
}
function sha256(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }

test('the assembled studio covers the supplied LING285 scope without absorbing LING406', () => {
  assert.equal(data.course.code, 'LING285');
  assert.equal(data.course.title, 'Human Language and Technology');
  assert.equal(Object.keys(manifest).length, 26);
  assert.equal(Object.values(manifest).reduce((total, source) => total + source.pages, 0), 352);
  assert.equal(data.collections.length, 25);
  assert.equal(sections.length, 315);
  assert.equal(lectures.length, 12);
  assert.equal(lectures.reduce((total, collection) => total + collection.sections.length, 0), 216);
  assert.deepEqual(lectures.map(collection => collection.id), ['lecture01','lecture02','lecture03','lecture04','lecture05-06','lecture07','lecture08','lecture09','lecture10','lecture11','lecture12','lecture13']);
  assert(!byCollection.has('ling406-reference'));
  assert.equal(manifest['ling406-reference'].role, 'style-reference');
  assert.equal(data.coverage.pageCount, sections.length);
  assert.equal(data.coverage.lecturePageCount, 216);
  assert.equal(data.coverage.sourceCount, 26);
});

test('each student section has a stable unique ID, source page, and preserved visual', () => {
  assert.equal(new Set(sections.map(item => item.id)).size, sections.length);
  assert.equal(new Set(data.collections.map(item => item.id)).size, data.collections.length);
  for (const collection of data.collections) {
    assert(manifest[collection.id], `Unmanifested collection ${collection.id}`);
    assert.equal(collection.sections.length, manifest[collection.id].pages);
    assert.deepEqual(collection.sections.map(item => item.page), Array.from({length: manifest[collection.id].pages}, (_, index) => index + 1));
    localFile(collection.sourceFile);
    localFile(collection.pdfFile);
    for (const item of collection.sections) {
      assert.equal(item.id, `${collection.id}-p${String(item.page).padStart(3, '0')}`);
      localFile(item.image);
      assert(Array.isArray(item.teaching) && item.teaching.every(paragraph => typeof paragraph === 'string'));
      for (const asset of item.assets) localFile(asset.file);
      if (['title', 'blank'].includes(item.kind)) assert.deepEqual(item.teaching, [], `${item.id} should not contain padded teaching`);
    }
  }
});

test('all original uploads and rendered PDFs match their recorded hashes', () => {
  for (const source of Object.values(manifest)) {
    const original = localFile(source.file);
    assert.equal(fs.statSync(original).size, source.bytes, source.original);
    assert.equal(sha256(original), source.sha256, `Original upload changed: ${source.original}`);
    assert.equal(sha256(localFile(source.rendered_pdf)), source.rendered_pdf_sha256, `Rendered source changed: ${source.key}`);
  }
});

test('embedded original assets match their content-addressed filenames', () => {
  const assets = new Set(sections.flatMap(item => item.assets.map(asset => asset.file)));
  assert(assets.size > 0);
  for (const file of assets) {
    const expectedPrefix = path.basename(file, path.extname(file));
    assert.match(expectedPrefix, /^[a-f0-9]{20}$/);
    assert(sha256(localFile(file)).startsWith(expectedPrefix), `Embedded original changed: ${file}`);
  }
});

test('practice questions and study guides point to usable source sections', () => {
  assert.equal(data.questions.length, 80);
  assert.equal(new Set(data.questions.map(item => item.id)).size, data.questions.length);
  const primaryCounts = new Map(lectures.map(collection => [collection.id, 0]));
  for (const question of data.questions) {
    assert(question.prompt.trim() && question.answer.trim() && question.topic.trim());
    assert.equal(question.edition, data.course.revision);
    assert(question.rubric.length >= 2 && question.rubric.length <= 4);
    assert(question.rubric.every(point => typeof point === 'string' && point.trim()));
    assert(question.sources.length > 0);
    for (const ref of question.sources) {
      const target = reference(ref);
      assert(!['title', 'blank', 'logistics'].includes(target.kind), `Question ${question.id} points to nonteaching page ${target.id}`);
      assert(!(ref.collection === 'lecture10' && ref.page === 8), 'Explicitly excluded beliefs page appears in generated assessment');
    }
    const first = question.sources[0].collection;
    if (primaryCounts.has(first)) primaryCounts.set(first, primaryCounts.get(first) + 1);
  }
  for (const [collection, count] of primaryCounts) assert(count >= 4, `Lecture practice missing for ${collection}`);
  for (const guide of data.guide) {
    assert(['readiness', 'demonstration'].includes(guide.kind));
    assert(guide.title.trim() && guide.explanation.trim());
    assert(guide.refs.length > 0);
    guide.refs.forEach(reference);
  }
});

test('core review remains a justified selection and excludes the non-exam beliefs segment', () => {
  const core = sections.filter(item => item.core);
  assert.equal(core.length, 49);
  assert.equal(data.coverage.coreCount, core.length);
  for (const item of core) {
    assert(item.coreReason?.trim(), `Missing selection reason on ${item.id}`);
    assert(!['title', 'blank', 'logistics'].includes(item.kind), `Nonconceptual page selected: ${item.id}`);
  }
  for (const collection of lectures) {
    const taught = collection.sections.filter(item => item.teaching.length && !['title', 'blank', 'logistics'].includes(item.kind));
    const selected = collection.sections.filter(item => item.core);
    assert(selected.length > 0 && selected.length < taught.length, `Core labels should select within ${collection.id}`);
  }
  assert.equal(section('lecture10', 8).core, false);
  assert.match(text('lecture10', 8), /outside the exam/i);
});

test('the uploaded conceptual review stays distinct from generated cumulative practice', () => {
  assert.equal(byCollection.get('exam-review').sections.length, 3);
  assert.equal(byCollection.get('exam-review-seagull').sections.length, 2);
  assert.match(byCollection.get('exam-review-seagull').title, /unverified/i);
  assert.match(text('exam-review', 1), /Question 1/);
  assert.match(text('exam-review', 3), /Question 20/);
  assert.match(text('exam-review', 3), /\[0,0,1,0,0\]/);
  assert(data.coverage.issues.some(issue => /self-assessment rather than automatic grading or exam prediction/i.test(issue)));
  for (const question of data.questions) {
    if (question.sources.some(ref => /^lecture1[123]$/.test(ref.collection))) {
      assert(!/actual exam|will be on (?:the |your )?exam|guaranteed exam/i.test(question.prompt + question.answer));
    }
  }
});

test('corrected mechanics preserve fixed comparison conditions and system limits', () => {
  assert.match(text('lecture12', 9), /Increasing effective stiffness raises frequency when mass is held constant/);
  assert.match(text('lecture13', 2), /Increasing effective stiffness raises frequency when mass is held constant/);
  assert(section('lecture12', 9).issues.some(issue => /corrects.*upward arrow/.test(issue)));
  assert.match(text('lecture11', 7), /frequency ratios that are not whole numbers/);
  assert.match(text('lecture11', 9), /not the natural eigenfrequencies/);
  assert.match(text('lecture11', 11), /separately tuned to a 100 Hz fundamental/);
  assert.match(text('lecture11', 11), /same length and wave speed would halve the fundamental/);
  assert.match(text('lecture12', 11), /left of the string[’']s midpoint/);
  assert.match(text('lecture12', 11), /lower frequency for mode 4 and a higher frequency for mode 5/);
});

test('source, filter, and spectrogram explanations retain distinct physical quantities', () => {
  assert.match(text('lecture13', 20), /keeps their 100 Hz spacing/);
  assert.match(text('lecture13', 20), /changes the heights/);
  assert.match(text('lecture13', 21), /F1 = 300 Hz, F2 = 2300 Hz/);
  assert.match(text('lecture13', 22), /F1 = 750 Hz, F2 = 1200 Hz/);
  assert.match(text('lecture13', 23), /horizontal axis is time/);
  assert.match(text('lecture13', 23), /vertical axis is frequency/);
  assert.match(text('lecture13', 23), /High amplitude becomes black, medium amplitude becomes gray, and low amplitude becomes white/);
  assert.match(text('lecture13', 25), /does not by itself establish that the vocal-tract formants have risen/);
});

test('no unreviewed audio transcript or completed experimental outcome is invented', () => {
  const audioPages = sections.filter(item => item.assets.some(asset => asset.type === 'audio'));
  assert.equal(audioPages.length, 1);
  assert(audioPages[0].assets.some(asset => asset.file.endsWith('.wav')));
  assert(!Object.hasOwn(audioPages[0], 'audioTranscript'));
  assert(data.coverage.issues.some(issue => /standalone WAV.*no supplied transcript/.test(issue)));
  assert.match(text('lecture11', 10), /proposes.*predicts/);
  assert(section('lecture11', 10).issues.some(issue => /no recorded participant data or measured outcome/.test(issue)));
  assert(!/need not/i.test(allAuthored));
});
