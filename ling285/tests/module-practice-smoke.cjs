'use strict';
// Run with node ling285/tests/module-practice-smoke.cjs. Exercises actual data,
// persisted v1 progress, module boundaries, and canonical MCQ keys in Chromium.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'ling285/data.json'), 'utf8'));
const KEY = 'ling285-study-studio-v1';
const modules = new Map(data.modules.map(module => [module.id, module]));
const questions = new Map(data.questions.map(question => [question.id, question]));
const collections = new Map(data.collections.map(collection => [collection.id, collection]));
const mime = {'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.pdf':'application/pdf','.wav':'audio/wav'};
const server = http.createServer((request, response) => {
  let pathname;
  try {pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);} catch {response.writeHead(400);response.end();return;}
  if (pathname.endsWith('/')) pathname += 'index.html';
  const filepath = path.resolve(root, '.' + pathname);
  if (!filepath.startsWith(root + path.sep)) {response.writeHead(403);response.end();return;}
  fs.stat(filepath, (error, stat) => {
    if (error || !stat.isFile()) {response.writeHead(404);response.end();return;}
    response.writeHead(200, {'Content-Type':mime[path.extname(filepath)] || 'application/octet-stream'});
    fs.createReadStream(filepath).pipe(response);
  });
});
(async () => {
  assert.equal(data.questions.length, 242, 'Build current course data before running this test.');
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port + '/ling285/';
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless:true, args:['--no-sandbox']});
  const page = await browser.newPage({viewport:{width:1440, height:1000}, acceptDownloads:true});
  page.setDefaultTimeout(12000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const saved = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY);
  const work = async route => {await page.locator('#workNav [data-go="' + route + '"]').click();await page.locator('#content h1').waitFor();};
  const switchModule = async moduleId => {await page.locator('#moduleNav [data-module="' + moduleId + '"]').click();assert.equal((await saved()).activeModule, moduleId);};
  const sessionItems = state => state.session.ids.map(id => {assert(questions.has(id), id);return questions.get(id);});
  const assertModuleSession = (state, moduleId, mode, count) => {
    assert.equal(state.activeModule, moduleId);assert.equal(state.session.moduleId, moduleId);
    assert.equal(state.session.mode, mode);assert.equal(state.session.ids.length, count);
    assert.equal(new Set(state.session.ids).size, count);
    const items = sessionItems(state);assert(items.every(question => question.moduleId === moduleId), 'Practice crossed the module boundary.');
    if (mode === 'mixed') assert.deepEqual(new Set(items.map(question => question.type)), new Set(['mcq', 'written']));
    else assert(items.every(question => question.type === mode));
    return items;
  };
  const resume = async () => {await work('test');await page.locator('#content [data-go="practice"]').last().click();};
  const openQuestion = async index => {
    const navigator = page.locator('details').filter({has:page.locator('.number-nav')});
    if (await navigator.getAttribute('open') === null) await navigator.locator(':scope > summary').click();
    await navigator.locator('[data-question-index="' + index + '"]').click();
  };
  const sectionIds = () => page.locator('#content [data-section]').evaluateAll(elements => elements.map(element => element.dataset.section));
  async function checkScopedTools(moduleId) {
    const module = modules.get(moduleId);
    const lectureIds = new Set(module.lectureIds);
    await work('combined');
    const expectedSections = module.lectureIds.flatMap(id => collections.get(id).sections.map(section => section.id));
    assert.deepEqual(await sectionIds(), expectedSections, 'Combined notes must contain only active numbered lectures.');
    await work('core');
    const coreIds = [...module.lectureIds, ...module.meadowsIds].flatMap(id => collections.get(id).sections.filter(section => section.core).map(section => section.id));
    assert.deepEqual(await sectionIds(), coreIds, 'Core review leaked another module or Sources-only supporting documents.');
    await work('guide');
    const expectedGuideIds = data.guide.map((guide, index) => ({guide,index})).filter(({guide}) => guide.moduleIds.includes(moduleId)).map(({index}) => 'guide-' + index);
    assert.deepEqual(await page.locator('#content [data-ready]').evaluateAll(elements => elements.map(element => element.dataset.ready)), expectedGuideIds);
    await work('quizzes');
    assert.deepEqual(new Set(await page.locator('#content [data-start^="lecture:"]').evaluateAll(elements => elements.map(element => element.dataset.start.slice(8)))), lectureIds);
    await work('test');assert((await page.locator('.scope-banner').textContent()).includes(module.title));
    await work('missed');assert((await page.locator('.scope-banner').textContent()).includes(module.title));
  }
  try {
    console.log('Module smoke: default second-half workspace and separated study tools');
    await page.goto(url);await page.locator('.module-hero').waitFor();
    // A fresh visit may not write storage until an action occurs, so inspect the
    // visible default before relying on the serialized state.
    assert.match(await page.locator('#activeModuleLabel').textContent(), /Module II/);
    assert.deepEqual(await page.locator('#collectionNav [data-collection]').evaluateAll(elements => elements.map(element => element.dataset.collection)), modules.get('module2').lectureIds);
    assert.equal(await page.locator('#collectionNav [data-collection^="notes-"]').count(), 0);
    assert.equal(await page.locator('#collectionNav [data-collection="exam-review"]').count(), 0);
    assert.equal(await page.locator('#collectionNav [data-collection="syllabus"]').count(), 0);
    await checkScopedTools('module2');
    await work('test');assert(await page.locator('[name="practiceMode"][value="mixed"]').isChecked());
    // Force a known nonidentity permutation. The assertions below select by
    // canonical option ID, not whichever letter an option receives after shuffle.
    await page.evaluate(() => {window.testOriginalRandom = Math.random;Math.random = () => .03125;});
    await page.locator('[data-start="mixed"]').click();
    await page.evaluate(() => {Math.random = window.testOriginalRandom;delete window.testOriginalRandom;});
    let state = await saved();
    const initialItems = assertModuleSession(state, 'module2', 'mixed', 100);
    assert.equal(initialItems.filter(question => question.type === 'mcq').length, 50);
    assert.equal(initialItems.filter(question => question.type === 'written').length, 50);
    assert(modules.get('module2').lectureIds.every(id => initialItems.some(question => question.sources.some(ref => ref.collection === id))), 'Current tests must cover available lectures.');
    const lateSessionIds = [...state.session.ids];
    const mcqIndex = initialItems.findIndex(question => question.type === 'mcq');
    const question = initialItems[mcqIndex];const wrong = question.options.find(option => option.id !== question.correctOption).id;
    await openQuestion(mcqIndex);await page.locator('.mcq-options').waitFor();
    const canonicalOrder = question.options.map(option => option.id);
    const shownOrder = await page.locator('[data-mcq-option]').evaluateAll(elements => elements.map(element => element.dataset.mcqOption));
    assert.notDeepEqual(shownOrder, canonicalOrder, 'The shuffle mapping test must use a nonidentity order.');
    assert.deepEqual(new Set(shownOrder), new Set(canonicalOrder));
    assert(await page.locator('[data-check-question]').isDisabled());assert.equal(await page.locator('.question-feedback').count(), 0);
    await page.locator('[data-mcq-option="' + wrong + '"]').check();
    assert(!(await page.locator('[data-check-question]').isDisabled()));assert.equal(await page.locator('.question-feedback').count(), 0, 'Selection alone must not reveal the key.');
    await page.locator('[data-check-question]').click();
    assert.equal(await page.locator('.question-feedback.incorrect').count(), 1);
    assert.equal(await page.locator('.option-explanation').count(), 4);
    for (const option of question.options) assert((await page.locator('.option-explanations').textContent()).includes(option.feedback), 'Missing independent option feedback for ' + option.id);
    assert.equal(await page.locator('.mcq-option.correct input').getAttribute('data-mcq-option'), question.correctOption, 'The correct answer must follow its canonical ID after shuffle.');
    await page.locator('[data-flag="' + question.id + '"]').check();
    await page.reload();await page.locator('.question-feedback.incorrect').waitFor();
    assert.deepEqual(await page.locator('[data-mcq-option]').evaluateAll(elements => elements.map(element => element.dataset.mcqOption)), shownOrder);
    assert(await page.locator('[data-mcq-option="' + wrong + '"]').isChecked());assert(await page.locator('[data-flag]').isChecked());
    state = await saved();assert.equal(state.mcqSelections[question.id], wrong);assert.equal(state.mcqSubmitted[question.id], true);assert.equal(state.flags[question.id], true);
    await work('missed');assert.equal(await page.locator('[data-single-question="' + question.id + '"]').count(), 1);
    await work('sources');
    const downloadPromise = page.waitForEvent('download');await page.locator('#content [data-action="export"]').click();
    const download = await downloadPromise;const backup = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.equal(backup.course, 'LING285');assert.equal(backup.version, 1);
    assert.equal(backup.state.mcqSelections[question.id], wrong);assert.equal(backup.state.mcqSubmitted[question.id], true);assert.equal(backup.state.flags[question.id], true);assert.deepEqual(backup.state.optionOrders[question.id], shownOrder);

    console.log('Module smoke: first-half archive, preserved notes, and independent sessions');
    await switchModule('module1');
    assert.deepEqual(await page.locator('#collectionNav [data-collection]').evaluateAll(elements => elements.map(element => element.dataset.collection)), modules.get('module1').lectureIds);
    assert.equal(await page.locator('#collectionNav [data-collection="lecture05-06"]').count(), 1);
    assert.equal(await page.locator('#moduleArchive').isVisible(), false, 'Active Module I must not duplicate its own archive navigation.');
    await checkScopedTools('module1');
    assert.equal(await page.locator('[data-single-question="' + question.id + '"]').count(), 0, 'Module I retry queue must not absorb Module II errors.');
    const first = collections.get('lecture01').sections[0];
    await page.locator('#collectionNav [data-collection="lecture01"]').click();
    await page.locator('[data-section="' + first.id + '"] [data-note]').fill('A preserved Module I personal explanation.');
    await page.locator('[data-section="' + first.id + '"] [data-read]').check();
    await work('test');await page.locator('[name="practiceMode"][value="written"]').check();await page.locator('[data-start="mixed"]').click();
    state = await saved();assertModuleSession(state, 'module1', 'written', 20);
    const earlySessionIds = [...state.session.ids];const writtenId = state.session.ids[0];
    await page.locator('#answerDraft').fill('My retained written explanation from Module I.');
    await page.locator('[data-reveal]').click();await page.locator('[data-rating="partial"]').click();
    await switchModule('module2');await resume();
    state = await saved();assert.deepEqual(state.session.ids, lateSessionIds);assert.equal(state.session.ids[state.session.index], question.id);
    assert(await page.locator('[data-mcq-option="' + wrong + '"]').isChecked());
    await page.locator('[data-retry-question]').click();assert.equal(await page.locator('.question-feedback').count(), 0);
    await page.locator('[data-mcq-option="' + question.correctOption + '"]').check();await page.locator('[data-check-question]').click();
    assert.equal(await page.locator('.question-feedback.correct').count(), 1);
    await work('missed');assert.equal(await page.locator('[data-single-question="' + question.id + '"]').count(), 1, 'A correct answer remains queued while flagged.');
    await page.locator('[data-single-question="' + question.id + '"]').click();
    await page.locator('[data-mcq-option="' + question.correctOption + '"]').check();await page.locator('[data-check-question]').click();await page.locator('[data-flag]').uncheck();
    await work('missed');assert.equal(await page.locator('[data-single-question="' + question.id + '"]').count(), 0, 'A checked correct and unflagged MCQ must leave the queue.');
    await work('sources');await page.locator('#importFile').setInputFiles({name:'LING285-module-backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
    await page.waitForFunction(() => document.querySelector('#saveStatus').textContent.includes('imported'));
    state = await saved();assert.equal(state.activeModule, 'module2');assert.equal(state.mcqSelections[question.id], wrong);assert.equal(state.mcqSubmitted[question.id], true);assert.equal(state.flags[question.id], true);assert.deepEqual(state.optionOrders[question.id], shownOrder);
    assert.equal(state.notes[first.id], 'A preserved Module I personal explanation.');assert.equal(state.read[first.id], true);assert.equal(state.drafts[writtenId], 'My retained written explanation from Module I.');assert.equal(state.ratings[writtenId], 'partial');assert.deepEqual(state.sessions.module1.ids, earlySessionIds);
    await resume();assert.equal(await page.locator('.question-feedback.incorrect').count(), 1);
    await switchModule('module1');await resume();assert.equal(await page.locator('#answerDraft').inputValue(), 'My retained written explanation from Module I.');assert.equal(await page.locator('[data-rating="partial"]').getAttribute('aria-pressed'), 'true');

    console.log('Module smoke: Meadows and supporting documents remain directly accessible');
    await page.locator('.reading-nav [data-go="meadows"]').click();
    assert.match(await page.locator('#content h1').textContent(), /Meadows/);assert.equal((await saved()).activeModule, 'module1');
    assert.equal(await page.locator('#content .collection-card').count(), 6);
    assert.deepEqual(await sectionIds(), modules.get('module1').meadowsIds.flatMap(id => collections.get(id).sections.map(section => section.id)));
    await page.locator('[data-reader="meadows"][data-expanded="false"]').click();assert.equal(await page.locator('#readerSelect option').count(), modules.get('module1').meadowsIds.reduce((sum,id) => sum + collections.get(id).sections.length, 0));await page.locator('[data-action="closeReader"]').click();
    const supporting = data.collections.filter(collection => collection.workspaceGroup === 'sources');
    await work('sources');
    for (const collection of supporting) assert.equal(await page.locator('#content [data-collection="' + collection.id + '"]').count(), 1, 'No direct supporting collection button for ' + collection.id);
    for (const id of ['exam-review','notes-lecture09','syllabus']) {
      await page.locator('#content [data-collection="' + id + '"]').click();assert.equal(await page.locator('#content [data-section]').count(), collections.get(id).sections.length);
      assert(!await page.locator('#collectionNav [data-collection="' + id + '"]').count());await work('sources');
    }

    console.log('Module smoke: format-specific selection and 360-pixel dark-mode layout');
    await switchModule('module2');await work('test');await page.locator('[name="practiceMode"][value="mcq"]').check();await page.locator('[data-start="focused"]').click();
    assertModuleSession(await saved(), 'module2', 'mcq', modules.get('module2').mcqCount);
    await page.locator('[data-theme="dark"]').click();assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await page.setViewportSize({width:360,height:800});
    if (!(await page.locator('body').getAttribute('class') || '').includes('side-closed')) await page.locator('#sidebar [data-action="sidebar"]').click();
    let extent = await page.evaluate(() => ({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(extent.scroll <= extent.width + 1, 'Mobile question overflow: ' + JSON.stringify(extent));
    const mobileQuestionId = (await saved()).session.ids[0];const mobileQuestion = questions.get(mobileQuestionId);
    await page.locator('[data-mcq-option="' + mobileQuestion.correctOption + '"]').check();await page.locator('[data-check-question]').click();
    extent = await page.evaluate(() => ({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(extent.scroll <= extent.width + 1, 'Mobile feedback overflow: ' + JSON.stringify(extent));
    await page.screenshot({path:'/tmp/ling285-module-mcq-mobile-dark.png'});
    await page.reload();await page.locator('.mcq-options').waitFor();assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');

    console.log('Module smoke: migration of pre-module written progress');
    const legacyContext = await browser.newContext({viewport:{width:1440,height:1000}});const legacyPage = await legacyContext.newPage();legacyPage.on('pageerror', error => errors.push(error.message));
    await legacyPage.goto(url);await legacyPage.locator('#content h1').waitFor();
    const legacy = {notes:{'lecture01-p003':'A note saved before modules existed.'},read:{'lecture01-p003':true},drafts:{'ling285-q001':'Original first-half answer.','ling285-q051':'Original second-half answer.'},ratings:{'ling285-q001':'partial','ling285-q051':'review'},revealed:{'ling285-q001':true,'ling285-q051':true},session:{ids:['ling285-q001','ling285-q051'],index:1,title:'Pre-module written set',finished:false,edition:'Supplied material · Lectures 01–13',scope:'mixed'}};
    await legacyPage.evaluate(({key,value}) => localStorage.setItem(key, JSON.stringify(value)), {key:KEY,value:legacy});await legacyPage.reload();await legacyPage.locator('#content h1').waitFor();
    await legacyPage.locator('#workNav [data-go="test"]').click();await legacyPage.locator('#content [data-go="practice"]').last().click();
    assert.equal(await legacyPage.locator('#answerDraft').inputValue(), 'Original second-half answer.');
    const migrated = await legacyPage.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY);
    assert.deepEqual(migrated.sessions.module2.ids, ['ling285-q051']);assert.deepEqual(migrated.sessions.module1.ids, ['ling285-q001']);assert.equal(migrated.notes['lecture01-p003'], legacy.notes['lecture01-p003']);assert.equal(migrated.read['lecture01-p003'], true);assert.equal(migrated.ratings['ling285-q001'], 'partial');
    await legacyPage.locator('#moduleNav [data-module="module1"]').click();await legacyPage.locator('#workNav [data-go="test"]').click();await legacyPage.locator('#content [data-go="practice"]').last().click();assert.equal(await legacyPage.locator('#answerDraft').inputValue(), 'Original first-half answer.');
    await legacyContext.close();
    assert.deepEqual(errors, []);
    console.log('LING285 module/MCQ regression passed: module scope, both formats, shuffled canonical answer keys, all distractor feedback, retries/flags, reload/export/import, independent sessions, legacy written progress, Meadows/Sources access, mobile and dark mode.');
  } finally {await browser.close();await new Promise(resolve => server.close(resolve));}
})().catch(error => {console.error(error);server.close();process.exitCode = 1;});
