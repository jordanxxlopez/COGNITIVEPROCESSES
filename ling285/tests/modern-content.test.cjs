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
const retainedEditionIds = ['professor','b','c','follow','v20','original-c','d'];
const restoreEditionMetadata = (file, ids) => fs.readFileSync(path.join(root, file), 'utf8').replace(
  /("editions": )\{[\s\S]*?\n \}/,
  (_, prefix) => prefix + JSON.stringify(Object.fromEntries(ids.map(id => [id, pack.editions[id]])), null, 1).replace(/\n/g, '\n '));

test('original content, editions and uploaded documents retain their frozen hashes', () => {
  // app.js now intentionally changes the reader UI. All course payloads and
  // teaching editions keep their original hashes; the generated UI is bound
  // to the current source application by build-manifest.json below.
  for (const [file, expected] of Object.entries(read('modern/preserved.json'))) if(file !== 'app.js') assert.equal(hash(file), expected, file);
  for (const source of pack.uploads) assert.equal(hash(source.file), source.sha256, source.file);
  assert.equal(hash('app.js'), read('modern/build-manifest.json').sourceAppSha256);
});

test('additional dropdown choices preserve all course writing and all seven retained teaching editions', () => {
  for (const [file, expected] of Object.entries(read('reader-modes-content-lock.json'))) {
    const actual = file === 'modern/content.js'
      ? crypto.createHash('sha256').update(restoreEditionMetadata(file, retainedEditionIds)).digest('hex')
      : hash(file);
    assert.equal(actual, expected, file);
  }
});

test('the two additional choices preserve all previous modern writing and editions', () => {
  const previous = ['professor','b','c','follow','v20'];
  for (const [file, expected] of Object.entries(read('modern/layout-content-lock.json'))) {
    if (file !== 'modern/content.js') { assert.equal(hash(file), expected, file); continue; }
    // Restore only the old selector metadata, leaving the rest of the file's
    // bytes untouched. Its pre-extension SHA must still match the frozen one.
    const restored = restoreEditionMetadata(file, previous);
    assert.equal(crypto.createHash('sha256').update(restored).digest('hex'), expected, file);
  }
});

test('the existing five modern editions preserve every source page and unpadded title page', () => {
  assert.deepEqual(Object.keys(pack.editions), [...retainedEditionIds,'original-c-v2','d-v2','notes-v7','original-c-v3','notes-v7-v2','notes-v8','notes-v8-1','notes-v8-2','notes-v9','notes-v9-1','notes-v9-2','notes-v9-3','notes-v9-4','notes-v10','notes-v10-1']);
  assert.equal(lectures.reduce((n, c) => n + c.sections.length, 0), 286);
  for (const edition of ['professor','b','c','follow','v20']) {
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

test('Original C copies the complete non-modern Version 23 base verbatim', () => {
  const source = read('transcripts-v22.json');
  const original = read('modern/transcripts-original-c.json');
  assert.equal(original.id, 'original-c');
  assert.equal(original.origin.sha256, hash('transcripts-v22.json'));
  assert.equal(original.origin.originalSelector, 'v23');
  for (const key of Object.keys(source).filter(key => !['id','label'].includes(key))) {
    assert.deepEqual(original[key], source[key], key);
  }
  assert.match(pack.editions['original-c'], /Original C.*Version 23.*following slides/);
});

test('D keeps every Original C parent and child in order and integrates traceable additions', () => {
  const original = read('modern/transcripts-original-c.json');
  const d = read('modern/transcripts-d.json');
  const report = read('modern/edition-c-d-provenance.json');
  assert.equal(d.id, 'd');
  assert.equal(report.addedPassages, report.placements.length);
  assert.equal(new Set(report.placements.map(p => p.text)).size, report.placements.length);
  assert.deepEqual(report.evidence, read('authoring/c-d-teaching-evidence.json'));
  assert.equal(report.baseTextRemoved, 0);
  assert.equal(report.baseTextRewritten, 0);
  const recovered = structuredClone(d.collections);
  let interleaved = 0;
  for (const p of report.placements) {
    const base = original.collections[p.collection].sections[p.page - 1];
    assert.equal(p.sectionId, base.id);
    assert.equal(p.originalParent, base.teaching[p.originalBlock].text);
    assert(report.evidence.excerpts[p.evidence].length);
    for (const e of report.evidence.excerpts[p.evidence]) {
      assert(e.quote.trim().length > 30);
      assert(e.startLine > 0 && e.endLine <= report.evidence.source.lineCount);
    }
    const children = recovered[p.collection].sections[p.page - 1].teaching[p.originalBlock].children;
    assert.equal(children.filter(t => t === p.text).length, 1);
    children.splice(children.indexOf(p.text), 1);
    assert(!/\b(?:the lecture|the class|the professor|he says|she says|need not|earlier slides?|later slides?)\b/i.test(p.text));
    assert(p.text.includes('**'), p.id);
    if (p.originalBlock < base.teaching.length - 1 || p.beforeOriginalChild < base.teaching[p.originalBlock].children.length) interleaved++;
  }
  assert(interleaved > report.placements.length * .75, 'additions belong inside the existing explanations');
  assert.deepEqual(recovered, original.collections);
  assert.deepEqual(d.visualPresentation, original.visualPresentation);
  for (const c of lectures) {
    assert.deepEqual(d.collections[c.id].sections.map(s => [s.id,s.page]), c.sections.map(s => [s.id,s.page]));
    if (c.moduleId === 'module1') assert.deepEqual(d.collections[c.id], original.collections[c.id]);
    else assert(report.placements.some(p => p.collection === c.id));
  }
});

test('C and D Version 2 retain source identities and use page-specific teaching without a fixed bullet count', () => {
  const report = read('modern/clear-editions-provenance.json');
  assert.equal(report.pages.length, 286);
  for (const [file, expected] of Object.entries(report.authoringFiles)) assert.equal(hash(file), expected, file);
  for (const [id, base] of [['original-c-v2','original-c'], ['d-v2','d']]) {
    const payload = read(`modern/transcripts-${id}.json`);
    const retained = read(`modern/transcripts-${base}.json`);
    assert.equal(payload.origin.baseSha256, hash(`modern/transcripts-${base}.json`));
    assert.deepEqual(payload.visualPresentation, retained.visualPresentation);
    const counts = new Set();
    let rewritten = 0, emphasized = 0, instructional = 0;
    for (const lecture of lectures) {
      const sections = payload.collections[lecture.id].sections;
      assert.deepEqual(sections.map(({teaching, ...metadata}) => metadata),
        retained.collections[lecture.id].sections.map(({teaching, ...metadata}) => metadata));
      for (const section of sections) {
        if (!section.teaching.length) continue;
        instructional++;
        counts.add(section.teaching.length);
        const prose = section.teaching.flatMap(b => [b.text, ...b.children]).join(' ');
        assert(!/\b(?:the lecture|the class|the professor|he says|she says|need not|as we saw|we will see|previous slides?|next slides?)\b/i.test(prose), section.id);
        assert(section.teaching.every(b => b.text.trim() && Array.isArray(b.children)), section.id);
        if (prose.includes('**')) emphasized++;
        if (JSON.stringify(section.teaching) !== JSON.stringify(retained.collections[lecture.id].sections[section.page-1].teaching)) rewritten++;
      }
    }
    assert(counts.size > 1, 'The source material determines the number of main bullets.');
    assert.equal(rewritten, instructional, 'Every instructional explanation is newly authored.');
    assert.equal(emphasized, instructional, 'Important concepts retain readable emphasis.');
    assert.equal(payload.metrics.sourcePages, 286);
  }
  // These distinctions were specifically requested; inspect actual mechanisms,
  // rather than accepting a page that merely lists the names of the concepts.
  for (const id of ['original-c-v2','d-v2']) {
    const p = read(`modern/transcripts-${id}.json`);
    const text = (cid, page) => JSON.stringify(p.collections[cid].sections[page-1].teaching);
    assert.match(text('lecture11',4), /mode 1/i);
    assert.match(text('lecture11',4), /mode 2/i);
    assert.match(text('lecture11',4), /together/i);
    assert.match(text('lecture11',4), /oppos|against each other/i);
    assert.match(text('lecture11',4), /middle spring/i);
    assert.match(text('lecture11',6), /middle mass/i);
    assert.match(text('lecture11',6), /still/i);
    assert.match(text('lecture15',8), /dynamic programming/i);
    assert.match(text('lecture15',8), /downstream|closer to the output|near the output|later layers/i);
  }
});

test('Version 7 reproduces the supplied notes on their original slides without inventing Module I PDF notes', () => {
  const source = read('authoring/notes-v7.json');
  const extraction = read('authoring/notes-v7-extraction.json');
  const payload = read('modern/transcripts-notes-v7.json');
  assert.equal(payload.origin.sha256, hash('authoring/notes-v7.json'));
  assert.deepEqual(payload.availableModules, ['module2']);
  assert(source.sourceFiles.length > 0);
  for (const file of source.sourceFiles) assert.equal(hash(file.file), file.sha256, file.file);
  const paragraphs = new Map(extraction.noteSections.flatMap(section => section.bullets.flatMap(b =>
    [b.main, ...b.children].map(unit => [unit.id, unit]))));
  const assigned = [];
  for (const collection of Object.values(source.collections)) for (const page of collection.pages) {
    const text = page.teaching.flatMap(b => [b.text, ...b.children]);
    assert.equal(text.length, page.evidence.paragraphIds.length);
    page.evidence.paragraphIds.forEach((id, i) => {
      const unit = paragraphs.get(id);
      assert(unit, id);
      assert.equal(text[i], unit.text, 'PDF wording and emphasis: ' + id);
      assert.equal(crypto.createHash('sha256').update(unit.plain).digest('hex'), unit.normalizedTextSha256, id);
      assigned.push(id);
    });
  }
  assert.equal(new Set(assigned).size, paragraphs.size);
  assert.equal(assigned.length, paragraphs.size, 'Every original PDF paragraph appears exactly once.');
  assert.equal(extraction.displayEquationTranscriptions.length, 8);
  assert.equal(extraction.preservation.allSourceBodyCharactersPreserved, true);
  assert.equal(extraction.preservation.allParagraphBoldCharactersPreserved, true);
  for (const lecture of lectures) {
    const sections = payload.collections[lecture.id].sections;
    assert.deepEqual(sections.map(s => [s.id,s.page]), lecture.sections.map(s => [s.id,s.page]));
    if (lecture.moduleId === 'module1') assert(sections.every(s => s.teaching.length === 0));
    else assert.deepEqual(sections.map(s => s.teaching), source.collections[lecture.id].pages.map(p => p.teaching));
  }
});

test('Version 3 preserves all ten prior choices, course content and layout assets', () => {
  const lock = read('modern/visual-meaning-preserved.json');
  assert.equal(Object.keys(lock.editions).length, 10);
  for (const [id, label] of Object.entries(lock.editions)) assert.equal(pack.editions[id], label);
  for (const [file, expected] of Object.entries(lock.files)) {
    let actual = file === 'modern/content.js'
      ? crypto.createHash('sha256').update(restoreEditionMetadata(file, Object.keys(lock.editions))).digest('hex')
      : hash(file);
    if (file === 'index.html') {
      // Shared module buttons were added in 657f93a after this snapshot. Keep
      // those assets present while checking all earlier markup byte for byte.
      const html = fs.readFileSync(path.join(root, file), 'utf8');
      const cssMatch = html.match(/<link rel="stylesheet" href="\.\.\/course-module-buttons\.css\?v=(1|2)">/);
      assert(cssMatch, 'Retain the versioned shared module navigation stylesheet.');
      const css = cssMatch[0];
      const script = `<script src="../course-module-buttons.js?v=${cssMatch[1]}" data-course="ling285" defer></script>`;
      assert(html.includes(script), 'Retain the matching shared module navigation script.');
      actual = crypto.createHash('sha256').update(html.replace(css, '').replace(script, '')).digest('hex');
    }
    assert.equal(actual, expected, file);
  }
});

test('Version 3 explains source visual meanings in place and keeps unaffected pages verbatim', () => {
  const base = read('modern/transcripts-original-c-v2.json');
  const payload = read('modern/transcripts-original-c-v3.json');
  const report = read('modern/visual-meaning-provenance.json');
  assert.equal(payload.origin.baseSha256, hash('modern/transcripts-original-c-v2.json'));
  assert.deepEqual(payload.visualPresentation, base.visualPresentation);
  assert.equal(report.reviewedPages, 286);
  assert.equal(report.pages.length, report.reviewedPages);
  assert.equal(report.revisedPages, report.pages.filter(p => p.revised).length);
  for (const [file, expected] of Object.entries(report.authoringFiles)) assert.equal(hash(file), expected, file);
  for (const lecture of lectures) {
    const rewritten = payload.collections[lecture.id].sections;
    assert.deepEqual(rewritten.map(({teaching,...metadata}) => metadata),
      base.collections[lecture.id].sections.map(({teaching,...metadata}) => metadata));
    for (const section of rewritten) {
      const original = base.collections[lecture.id].sections[section.page-1];
      const record = report.pages.find(p => p.sectionId === section.id);
      assert(record, section.id);
      if (!record.revised) {assert.deepEqual(section.teaching, original.teaching);continue;}
      assert(original.teaching.length && section.teaching.length, 'Keep title/logistical pages unpadded.');
      assert.notDeepEqual(section.teaching, original.teaching);
      assert(record.explained.length && record.evidence.slides.length, section.id);
      const prose = section.teaching.flatMap(b => [b.text,...b.children]).join(' ');
      assert(!/\b(?:the lecture|the class|the professor|he says|she says|need not|as we saw|we will see|previous slides?|next slides?)\b/i.test(prose), section.id);
      assert(prose.includes('**'), section.id);
      for (const b of section.teaching) for (const t of [b.text,...b.children]) assert.equal(t.split('**').length % 2, 1, section.id);
    }
    assert(report.pages.some(p => p.collection === lecture.id && p.revised), lecture.id);
  }
  // The user's concrete example must retain the baseline, symbols, relative
  // conditions and rate meanings rather than only the general directional rule.
  const text = JSON.stringify(payload.collections.lecture11.sections[2].teaching);
  for (const pattern of [/reference/i,/mass/i,/stiffness/i,/4m/,/4K/,/four times/i,/half/i,/twice/i,/cycles/i]) assert.match(text, pattern);
  assert.equal(report.rules.repeatedExplanationTemplate, false);
});

test('Version 7 Version 2 keeps all eleven existing choices and their course material unchanged', () => {
  const lock = read('modern/notes-v7-v2-preserved.json');
  assert.equal(Object.keys(lock.editions).length, 11);
  for (const [id,label] of Object.entries(lock.editions)) assert.equal(pack.editions[id], label);
  for (const [file,expected] of Object.entries(lock.files)) {
    const actual = file === 'modern/content.js'
      ? crypto.createHash('sha256').update(restoreEditionMetadata(file, Object.keys(lock.editions))).digest('hex')
      : hash(file);
    assert.equal(actual, expected, file);
  }
  const entry = fs.readFileSync(path.join(root, 'modern/index.html'), 'utf8')
    .replaceAll('?v=notes-v8-1', '?v=notes-v7-v2-1')
    .replace('<link rel="stylesheet" href="modern/essentials.css?v=split-2"><script src="modern/essentials.js?v=exam2-v10" defer></script><script src="modern/plain.js?v=plain-1" defer></script>', '').replaceAll('?v=notes-v10-loop-20', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-19', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-18', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-17', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-16', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-15', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-14', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-14', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-13', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-12', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-11', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-10', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-9', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-8', '?v=notes-v7-v2-1').replaceAll('?v=notes-v10-loop-7', '?v=notes-v7-v2-1')
    .replaceAll('?v=silent-loops-1', '?v=1').replaceAll('?v=yearago-1', '?v=1')
    .replaceAll('?v=notes-v10-1', '?v=notes-v7-v2-1')
    .replaceAll('?v=notes-v9-1-1', '?v=notes-v7-v2-1')
    .replaceAll('?v=notes-v9-1', '?v=notes-v7-v2-1')
    .replaceAll('modern/app.js?v=notes-v7-v2-1', 'modern/app.js?v=' + lock.entryCacheVersion)
    .replaceAll('modern/content.js?v=notes-v7-v2-1', 'modern/content.js?v=' + lock.entryCacheVersion);
  assert.equal(crypto.createHash('sha256').update(entry).digest('hex'), lock.modernEntryHtmlSha256,
    'Keep the existing modern shell and shared module controls unchanged.');
});

test('Version 7 Version 2 links source ideas to actual teaching and keeps page-based study identities', () => {
  const base = read('modern/transcripts-notes-v7.json');
  const payload = read('modern/transcripts-notes-v7-v2.json');
  const report = read('modern/notes-v7-v2-provenance.json');
  assert.deepEqual(payload.availableModules, ['module2']);
  assert.equal(payload.origin.baseSha256, hash('modern/transcripts-notes-v7.json'));
  assert.deepEqual(payload.visualPresentation, base.visualPresentation);
  assert.equal(report.sourcePages, 131);
  assert.equal(report.pages.length, 131);
  for (const [file,expected] of Object.entries(report.authoringFiles)) assert.equal(hash(file), expected, file);
  for (const lecture of lectures) {
    const sections = payload.collections[lecture.id].sections;
    assert.deepEqual(sections.map(({teaching,...metadata})=>metadata),
      base.collections[lecture.id].sections.map(({teaching,...metadata})=>metadata));
    for (const section of sections) {
      if (lecture.moduleId === 'module1') {assert.deepEqual(section.teaching, []);continue;}
      const audit = report.pages.find(p=>p.sectionId===section.id);
      assert(audit, section.id);
      assert.equal(Boolean(audit.coverage.length), Boolean(section.teaching.length), section.id);
      assert(audit.evidence.slides.length, section.id);
      for (const idea of audit.coverage) {
        assert(idea.idea.trim() && ['slide','spoken','pdf'].includes(idea.source), section.id);
        assert(idea.blocks.length && idea.blocks.every(i=>Number.isInteger(i) && i>=0 && i<section.teaching.length), section.id);
      }
      const prose = section.teaching.flatMap(b=>[b.text,...b.children]).join(' ').replaceAll('**','');
      assert(!/\b(?:need not|the class|the lecture|the professor|he says|she says|as we saw|we will see|previous slides?|next slides?|picture|pictures|pictured)\b/i.test(prose), section.id);
      for (const b of section.teaching) for (const t of [b.text,...b.children]) assert.equal(t.split('**').length%2, 1, section.id);
      if (section.teaching.length) assert(JSON.stringify(section.teaching).includes('**'), section.id);
    }
  }
});

test('repeated principle slides each retain the fixed-end and free-end explanations', () => {
  const payload = read('modern/transcripts-notes-v7-v2.json');
  for (const [cid,page] of [['lecture12',9],['lecture12',22],['lecture13',2]]) {
    const text = JSON.stringify(payload.collections[cid].sections[page-1].teaching).replaceAll('**','').replace(/[–—]/g,'-');
    for (const pattern of [/mass/i,/stiffness/i,/modes?/i,/mov(?:e|ement|ing)/i,/stretch|compress/i,/fixed.fixed/i,/fixed.free/i,/base frequency/i,/odd/i,/quarter.wave/i]) assert.match(text, pattern, `${cid}:${page}`);
    assert(/whole.number|integer/i.test(text), `${cid}:${page}: whole-number harmonic relationship`);
  }
  const correctArrow = JSON.stringify(payload.collections.lecture13.sections[1].teaching);
  assert(!/\btypo\b/i.test(correctArrow), 'Do not repeat the L12 arrow warning on the correctly printed L13 slide.');
});

test('the taught activation exercise and all nine next-letter examples remain explained', () => {
  const payload = read('modern/transcripts-notes-v7-v2.json');
  const activation = JSON.stringify(payload.collections.lecture15.sections[3].teaching).replaceAll('**','');
  for (const pattern of [/activation/i,/positive/i,/weight/i,/done/i,/probabilit/i]) assert.match(activation, pattern);
  for (const cid of ['lecture17','lecture18']) {
    const text = JSON.stringify(payload.collections[cid].sections[6].teaching).replaceAll('**','');
    for (const prefix of ['ra','sp','k','skr','m','bram','b','f','sh']) assert(new RegExp('\\b'+prefix+'(?:_|\\b)','i').test(text), `${cid}: ${prefix}`);
    for (const example of ['bramble','knee','shrimp']) assert(new RegExp(example,'i').test(text), `${cid}: ${example}`);
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
