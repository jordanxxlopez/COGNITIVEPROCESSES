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
  assert.equal(data.questions.length, 242);
  assert.equal(new Set(data.questions.map(item => item.id)).size, data.questions.length);
  const primaryCounts = new Map(lectures.map(collection => [collection.id, 0]));
  for (const question of data.questions) {
    assert(question.prompt.trim() && question.answer.trim() && question.topic.trim());
    assert.equal(question.edition, data.course.revision);
    assert(['written', 'mcq'].includes(question.type), `Unknown question format on ${question.id}`);
    assert(Number.isFinite(question.priority) && question.priority > 0, `Missing assessment priority on ${question.id}`);
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
    const requiredModule = guide.refs.some(ref => /^lecture1[123]$/.test(ref.collection)) ? 'module2' : 'module1';
    assert.deepEqual(guide.moduleIds, [requiredModule], `Guide ${guide.title} should stay with its latest required source`);
  }
});

test('the module boundary preserves the first midterm and focuses the active workspace on the second', () => {
  assert.deepEqual(data.modules.map(module => module.id), ['module1', 'module2']);
  const [first, second] = data.modules;
  assert.deepEqual(first.lectureIds, ['lecture01','lecture02','lecture03','lecture04','lecture05-06','lecture07','lecture08','lecture09','lecture10']);
  assert.deepEqual(second.lectureIds, ['lecture11','lecture12','lecture13']);
  assert.equal(first.lectureIds.length, 9);
  assert.equal(second.lectureIds.length, 3);
  assert.match(second.futureNote, /new lectures|extend/i);
  assert.deepEqual(first.meadowsIds, ['notes-08-25-1','notes-08-25-2','notes-09-01','notes-09-03','notes-09-15','notes-09-17']);
  assert.deepEqual(second.meadowsIds, []);
  const numbered = data.modules.flatMap(module => module.lectureIds);
  assert.equal(new Set(numbered).size, 12);
  assert.deepEqual(new Set(numbered), new Set(lectures.map(collection => collection.id)));
  for (const collection of data.collections) {
    assert(['lectures', 'meadows', 'sources'].includes(collection.workspaceGroup), collection.id);
    if (collection.role === 'lecture') {
      assert.equal(collection.workspaceGroup, 'lectures');
      assert.equal(collection.moduleId, second.lectureIds.includes(collection.id) ? 'module2' : 'module1');
    } else if (first.meadowsIds.includes(collection.id)) {
      assert.equal(collection.workspaceGroup, 'meadows');
      assert.equal(collection.moduleId, 'module1');
    } else {
      assert.equal(collection.workspaceGroup, 'sources', `Supporting document ${collection.id} must not become a numbered lecture`);
    }
  }
  for (const question of data.questions) {
    const requiredModule = question.sources.some(ref => second.lectureIds.includes(ref.collection)) ? 'module2' : 'module1';
    assert.equal(question.moduleId, requiredModule, `${question.id} must belong to the latest module its sources require`);
  }
  for (const module of data.modules) {
    const pool = data.questions.filter(question => question.moduleId === module.id);
    assert.equal(module.questionCount, pool.length);
    assert.equal(module.writtenCount, pool.filter(question => question.type === 'written').length);
    assert.equal(module.mcqCount, pool.filter(question => question.type === 'mcq').length);
    assert(module.mcqCount >= 10 && module.writtenCount >= 10, `Module ${module.id} needs both usable practice formats`);
  }
});

test('all original written questions retain their exact IDs, wording, answers, rubrics, and source links', () => {
  const originalIds = Array.from({length: 80}, (_, index) => `ling285-q${String(index + 1).padStart(3, '0')}`);
  const byId = new Map(data.questions.map(question => [question.id, question]));
  const written = originalIds.map(id => byId.get(id));
  assert(written.every(question => question?.type === 'written'));
  assert.deepEqual(written.map(question => question.id), originalIds);
  // Captured from the released v1 bank before the module/MCQ revision. Only new
  // format, module, priority, and edition metadata may change.
  const originalFields = ['id', 'prompt', 'answer', 'rubric', 'sources', 'topic'];
  const preserved = written.map(question => Object.fromEntries(originalFields.map(field => [field, question[field]])));
  const digest = crypto.createHash('sha256').update(JSON.stringify(preserved)).digest('hex');
  assert.equal(digest, '4b7a8590e451360a02cd2454da67a2082a762913d7d082ddce9e3d63e03f91b6', 'Existing written prompts, explanations, rubrics, or source mappings changed');
  assert.equal(data.questions.filter(question => question.type === 'written').length, 131);
  assert.equal(data.coverage.writtenQuestionCount, 131);
  assert.equal(data.coverage.mcqQuestionCount, 111);
  assert.equal(data.coverage.questionCount, 242);
});

test('expanding Module II preserves the entire released 134-question content bank', () => {
  const byId = new Map(data.questions.map(question => [question.id, question]));
  const originalIds = Array.from({length: 80}, (_, index) => `ling285-q${String(index + 1).padStart(3, '0')}`);
  for (const collection of lectures) {
    const count = ['lecture11','lecture12','lecture13'].includes(collection.id) ? 6 : 4;
    for (let number = 1; number <= count; number += 1) originalIds.push(`ling285-mcq-${collection.id}-${String(number).padStart(2, '0')}`);
  }
  assert.equal(originalIds.length, 134);
  const metadata = new Set(['edition', 'type', 'moduleId', 'priority', 'lectureId']);
  const baseline = originalIds.map(id => {
    const question = byId.get(id);assert(question, `Released question ${id} disappeared`);
    return Object.fromEntries(Object.entries(question).filter(([key]) => !metadata.has(key)));
  });
  const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
  const digest = crypto.createHash('sha256').update(JSON.stringify(canonical(baseline))).digest('hex');
  assert.equal(digest, '0b973cfa652dc34e7cc936a7fe8cf90a1efce5cc84765725872452bc81c7fdd9', 'A released question changed its prompt, answer, options, feedback, rubric, source, or reasoning metadata');
});

test('each Module II lecture owns exactly 25 multiple-choice and 25 written questions', () => {
  const module = data.modules.find(item => item.id === 'module2');
  assert.deepEqual(module.assessmentPolicy, {lectureQuizSize:50, currentTestSize:100, mcqShare:.5});
  assert.equal(module.questionCount, 150);
  assert.equal(module.mcqCount, 75);
  assert.equal(module.writtenCount, 75);
  const pool = data.questions.filter(question => question.moduleId === 'module2');
  for (const question of pool) {
    assert(module.lectureIds.includes(question.lectureId), `${question.id} has no authoritative lecture owner`);
    assert(question.sources.some(ref => ref.collection === question.lectureId), `${question.id} owner is not one of its source lectures`);
  }
  for (const lectureId of module.lectureIds) {
    const owned = pool.filter(question => question.lectureId === lectureId);
    assert.equal(owned.length, 50, `${lectureId} quiz bank must contain fifty distinct questions`);
    assert.equal(owned.filter(question => question.type === 'mcq').length, 25, lectureId);
    assert.equal(owned.filter(question => question.type === 'written').length, 25, lectureId);
  }
  assert.equal(data.questions.find(question => question.id === 'ling285-q077').lectureId, 'lecture13', 'Cross-module source links must not assign this Lecture 13 question to Lecture 08');
  const first = data.modules.find(item => item.id === 'module1');
  assert.equal(first.questionCount, 92);
  assert.equal(first.mcqCount, 36);
  assert.equal(first.writtenCount, 56);
});

test('multiple-choice questions have independently explained distractors and stable balanced keys', () => {
  const multipleChoice = data.questions.filter(question => question.type === 'mcq');
  assert.equal(multipleChoice.length, 111);
  const correctPositions = [0, 0, 0, 0];
  for (const question of multipleChoice) {
    assert.equal(question.options.length, 4, `${question.id} requires four options`);
    assert.equal(new Set(question.options.map(option => option.id)).size, 4, `${question.id} has duplicate canonical option IDs`);
    assert.equal(new Set(question.options.map(option => option.text.trim())).size, 4, `${question.id} repeats an option`);
    assert.equal(new Set(question.options.map(option => option.feedback.trim())).size, 4, `${question.id} repeats a distractor explanation`);
    const correctIndex = question.options.findIndex(option => option.id === question.correctOption);
    assert(correctIndex >= 0, `${question.id} has an unresolvable answer key`);
    correctPositions[correctIndex] += 1;
    for (const option of question.options) {
      assert(typeof option.id === 'string' && option.id.trim(), `${question.id} needs stable option IDs`);
      assert(typeof option.text === 'string' && option.text.trim(), `${question.id} has an empty option`);
      assert(typeof option.feedback === 'string' && option.feedback.trim(), `${question.id}/${option.id} needs an explanation`);
      assert(!/^(?:correct|incorrect|wrong)[.!]?$/i.test(option.feedback.trim()), `${question.id} needs more than a verdict`);
    }
  }
  assert(Math.max(...correctPositions) - Math.min(...correctPositions) <= 1, `Answer positions must remain balanced: ${correctPositions}`);
});

test('the assessment model uses the twenty actual review prompts without claiming a validated forecast', () => {
  const model = data.assessmentModel;
  assert(model && Array.isArray(model.reviewItems));
  assert.equal(model.reviewItems.length, 20);
  assert.deepEqual(model.reviewItems.map(item => item.number), Array.from({length: 20}, (_, index) => index + 1));
  assert.equal(model.evidence.promptCount, 20);
  assert.equal(model.evidence.sourceFile, manifest['exam-review'].file);
  assert.equal(model.evidence.sha256, manifest['exam-review'].sha256);
  assert.match(model.status, /not a validated exam-prediction model/i);
  assert.match(model.userRequestedAdaptation.boundary, /written conceptual prompts rather than an A[–-]D exam/i);
  assert.match(model.evidence.scope, /no actual Midterm II|no.*held-out exam/i);
  assert(model.limitations.some(item => /finite.*sample|not.*prediction accuracy/i.test(item)));
  // The source's equation objects are not ordinary DOCX paragraph text. Items
  // 16 and 17 preserve that original paragraph separately and reconstruct only
  // their visibly supplied equations in their readable prompt.
  const sourceParagraphs = model.reviewItems.map(item => (item.nativeParagraphWithoutEquation || item.prompt).replace(/\s+/g, ' ').trim());
  const digest = crypto.createHash('sha256').update(JSON.stringify(sourceParagraphs)).digest('hex');
  assert.equal(digest, '4555a8155c0ddf9969b62aa4dbe9ed562ca3b6fb24afd3731e70053aebc8a2b1', 'The evidence prompts must remain the actual uploaded review wording');
  for (const item of model.reviewItems) {
    assert(item.patterns.includes(item.primaryPattern));
    assert(item.sources.every(ref => ref.collection === 'exam-review'));
    item.sources.forEach(reference);
  }
  const primaryCounts = Object.fromEntries(Object.keys(model.observedPrimaryPatternCounts).map(pattern => [pattern, model.reviewItems.filter(item => item.primaryPattern === pattern).length]));
  assert.deepEqual(model.observedPrimaryPatternCounts, primaryCounts);
  assert.equal(Object.values(primaryCounts).reduce((sum, count) => sum + count, 0), 20);
  for (const [pattern, count] of Object.entries(primaryCounts)) assert.equal(model.patternWeights[pattern], count);
  assert.match(model.weightExplanation, /design.*user-requested extension/i);
  assert.match(model.weightExplanation, /not normalized probabilities/i);
});

test('executed relevance rankings cover the bank and reproduce each module order', () => {
  const ranking = JSON.parse(fs.readFileSync(path.join(root, 'authoring/assessment-ranking.json'), 'utf8'));
  assert.equal(ranking.revision, data.course.revision);
  assert.equal(ranking.questions.length, data.questions.length);
  assert.deepEqual(new Set(ranking.questions.map(question => question.id)), new Set(data.questions.map(question => question.id)));
  const ranked = new Map(ranking.questions.map(question => [question.id, question]));
  assert.equal(ranked.size, data.questions.length);
  for (const question of data.questions) {
    const evidence = ranked.get(question.id);
    assert.equal(evidence.moduleId, question.moduleId);
    assert.equal(evidence.type, question.type);
    assert.equal(evidence.priority, question.priority);
    assert(Number.isFinite(evidence.priority) && evidence.priority >= 1, question.id);
    assert(Number.isFinite(evidence.lexicalSimilarity) && evidence.lexicalSimilarity >= 0 && evidence.lexicalSimilarity <= 1, question.id);
    assert(Number.isFinite(evidence.reasoningPatternWeight) && evidence.reasoningPatternWeight >= 0 && evidence.reasoningPatternWeight <= 1, question.id);
    assert(evidence.closestReviewItems.length > 0 && evidence.closestReviewItems.length <= 20);
    assert.equal(new Set(evidence.closestReviewItems.map(item => item.number)).size, evidence.closestReviewItems.length);
    for (const match of evidence.closestReviewItems) {
      assert(Number.isInteger(match.number) && match.number >= 1 && match.number <= 20, question.id);
      assert(Number.isFinite(match.similarity) && match.similarity >= 0 && match.similarity <= 1, question.id);
    }
  }
  for (const module of data.modules) {
    const expected = data.questions.filter(question => question.moduleId === module.id)
      .sort((left, right) => right.priority - left.priority || left.id.localeCompare(right.id))
      .map(question => question.id);
    assert.deepEqual(ranking.rankedIdsByModule[module.id], expected, `${module.id} ranking must use priority and deterministic ID ties`);
  }
  assert.match(ranking.method, /not.*probability|not.*exam odds/i);
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
  assert(data.coverage.issues.some(issue => /written answers use self-assessment rather than automatic grading/i.test(issue)));
  assert(data.coverage.issues.some(issue => /multiple-choice answers use a source-checked key/i.test(issue)));
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
