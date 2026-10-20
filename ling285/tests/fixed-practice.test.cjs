'use strict';
// Fixed assessment-size regression. The future lecture is an in-memory browser
// fixture only; it never adds invented course content to production data.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'ling285/data.json'), 'utf8'));
const KEY = 'ling285-study-studio-v1';
const mime = {'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.pdf':'application/pdf','.wav':'audio/wav'};
function serve() {
  return http.createServer((request, response) => {
    let pathname;try {pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);} catch {response.writeHead(400);response.end();return;}
    if (pathname.endsWith('/')) pathname += 'index.html';
    const filepath = path.resolve(root, '.' + pathname);
    if (!filepath.startsWith(root + path.sep)) {response.writeHead(403);response.end();return;}
    fs.stat(filepath, (error, stat) => {
      if (error || !stat.isFile()) {response.writeHead(404);response.end();return;}
      response.writeHead(200, {'Content-Type':mime[path.extname(filepath)] || 'application/octet-stream'});
      fs.createReadStream(filepath).pipe(response);
    });
  });
}
function checkSelection(session, bank, size, split) {
  const byId = new Map(bank.map(question => [question.id, question]));
  assert.equal(session.ids.length, size);
  assert.equal(new Set(session.ids).size, size, 'Assessment must contain unique questions.');
  const selected = session.ids.map(id => {assert(byId.has(id), 'Unknown question ' + id);return byId.get(id);});
  assert(selected.every(question => question.moduleId === session.moduleId));
  assert.equal(selected.filter(question => question.type === 'mcq').length, split.mcq);
  assert.equal(selected.filter(question => question.type === 'written').length, split.written);
  return selected;
}
function owners(items) {
  const counts = {};
  for (const question of items) counts[question.lectureId] = (counts[question.lectureId] || 0) + 1;
  return counts;
}
test('fixed Module II tests and lecture quizzes keep their sizes when formats or lecture coverage change', {timeout:60000}, async () => {
  assert.equal(data.questions.length, 292, 'Build the expanded practice bank before running fixed-size checks.');
  const module = data.modules.find(item => item.id === 'module2');
  const oldMCQ = data.questions.filter(question => question.moduleId === 'module2' && question.type === 'mcq').slice(0,18).map(question => question.id);
  const draftId = data.questions.find(question => question.id === 'ling285-q051').id;
  const server = serve();await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port + '/ling285/';
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const errors = [];
  try {
    const page = await browser.newPage();page.setDefaultTimeout(10000);page.on('pageerror', error => errors.push(error.message));
    const initial = {activeModule:'module2',practiceMode:'written',drafts:{[draftId]:'An explanation saved before fixed-size tests.'},session:{moduleId:'module2',ids:oldMCQ,index:2,title:'Earlier eighteen-question set',scope:'mixed',mode:'mcq',finished:false}};
    await page.addInitScript(({key,value}) => {if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value));}, {key:KEY,value:initial});
    const state = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY);
    const work = async route => {await page.locator('#workNav [data-go="' + route + '"]').click();};
    await page.goto(url);await page.locator('.module-hero').waitFor();assert.equal(await page.title(), 'LING258 · Study Studio');
    await work('test');assert.match(await page.locator('.saved-set-notice').innerText(), /Earlier saved practice.*18 questions/);
    assert.deepEqual((await state()).session.ids, oldMCQ);assert.equal((await state()).drafts[draftId], initial.drafts[draftId]);
    await page.locator('#content [data-go="practice"]').last().click();assert.deepEqual((await state()).session.ids, oldMCQ, 'Resuming an earlier set must not silently replace it.');
    await work('test');assert(await page.locator('[name="practiceMode"][value="written"]').isChecked());
    await page.locator('[data-start="mixed"]').click();
    let current = await state();let selected = checkSelection(current.session, data.questions, 100, {mcq:50,written:50});
    assert.equal(current.session.mode, 'mixed');assert.deepEqual(Object.values(owners(selected)).sort((a,b) => a-b), [25,25,25,25]);
    for (const type of ['mcq','written']) assert.deepEqual(Object.values(owners(selected.filter(question => question.type === type))).sort((a,b) => a-b), [12,12,13,13]);
    const prior100 = JSON.parse(JSON.stringify(current.session));
    assert.equal(current.drafts[draftId], initial.drafts[draftId]);
    // Saved single-format mode applies only to optional focused/quick practice.
    await work('test');await page.locator('[name="practiceMode"][value="mcq"]').check();await page.locator('[data-start="mixed"]').click();
    checkSelection((await state()).session, data.questions, 100, {mcq:50,written:50});
    for (const lectureId of module.lectureIds) {
      await work('quizzes');await page.locator('[name="practiceMode"][value="written"]').check();
      await page.locator('[data-start="lecture:' + lectureId + '"]').click();
      current = await state();selected = checkSelection(current.session, data.questions, 50, {mcq:25,written:25});
      assert.deepEqual(Object.keys(owners(selected)), [lectureId]);
      assert.deepEqual(new Set(current.session.ids), new Set(data.questions.filter(question => question.moduleId === 'module2' && question.lectureId === lectureId).map(question => question.id)), 'Full lecture quiz must use its complete owned bank.');
      assert.equal(current.session.ids.includes('ling285-q077'), lectureId === 'lecture13', 'Cross-module references must not leak Lecture 13 into another lecture quiz.');
    }
    await work('quizzes');await page.locator('[data-start="focus-lecture:lecture11"]').click();checkSelection((await state()).session, data.questions, 25, {mcq:0,written:25});
    await work('test');await page.locator('[data-start="quick"]').click();checkSelection((await state()).session, data.questions, 5, {mcq:0,written:5});
    await page.locator('#moduleNav [data-module="module1"]').click();await work('test');await page.locator('[data-start="mixed"]').click();
    checkSelection((await state()).session, data.questions, 20, {mcq:0,written:20});

    // A future fifth lecture expands the bank to 250. The current test remains
    // 100 and includes 20 questions per lecture, with exactly 50 of each format.
    const future = structuredClone(data);const source = future.collections.find(collection => collection.id === 'lecture14');
    const fixture = structuredClone(source);fixture.id='lecture15';fixture.number='15';fixture.title='Synthetic future lecture fixture';
    fixture.sections.forEach(section => {section.id='future-'+section.id;});future.collections.push(fixture);
    const futureModule = future.modules.find(item => item.id === 'module2');futureModule.lectureIds.push('lecture15');
    for (const question of data.questions.filter(question => question.lectureId === 'lecture14')) {
      const copy = structuredClone(question);copy.id='future-'+question.id;copy.lectureId='lecture15';
      copy.sources=copy.sources.map(ref => ref.collection === 'lecture14' ? {...ref,collection:'lecture15'} : ref);future.questions.push(copy);
    }
    Object.assign(futureModule, {questionCount:250,mcqCount:125,writtenCount:125});
    const futureContext = await browser.newContext();const futurePage = await futureContext.newPage();futurePage.setDefaultTimeout(10000);futurePage.on('pageerror', error => errors.push(error.message));
    await futurePage.route('**/ling285/data.json', route => route.fulfill({json:future}));
    const retained = {activeModule:'module2',practiceMode:'mcq',notes:{'lecture13-p020':'Keep my source and filter explanation.'},drafts:{[draftId]:'Keep my earlier written response.'},session:prior100};
    await futurePage.addInitScript(({key,value}) => {if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value));}, {key:KEY,value:retained});
    const futureState = () => futurePage.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY);
    await futurePage.goto(url);await futurePage.locator('.module-hero').waitFor();
    await futurePage.locator('#workNav [data-go="test"]').click();assert.match(await futurePage.locator('.saved-set-notice').innerText(), /Earlier saved practice.*100 questions.*include all current lectures/s);
    assert.deepEqual((await futureState()).session.ids, prior100.ids, 'New material must not erase the earlier saved selection before a new attempt starts.');
    await futurePage.locator('#content [data-go="practice"]').last().click();assert.deepEqual((await futureState()).session.ids, prior100.ids);
    await futurePage.locator('#workNav [data-go="test"]').click();await futurePage.locator('[data-start="mixed"]').click();
    const next = await futureState();const nextItems = checkSelection(next.session, future.questions, 100, {mcq:50,written:50});
    assert.deepEqual(Object.values(owners(nextItems)).sort((a,b) => a-b), [20,20,20,20,20]);
    assert(nextItems.some(question => question.lectureId === 'lecture15'));
    assert.notDeepEqual(new Set(next.session.ids), new Set(prior100.ids), 'A newly generated selection must incorporate the added lecture.');
    assert.equal(next.drafts[draftId], retained.drafts[draftId]);assert.equal(next.notes['lecture13-p020'], retained.notes['lecture13-p020']);
    assert.equal(future.questions.filter(question => question.moduleId === 'module2').length, 250, 'Rebalancing a test must not discard whole lecture banks.');
    assert(data.questions.filter(question => question.moduleId === 'module2').every(question => future.questions.some(candidate => candidate.id === question.id)), 'Future fixture must retain every existing question ID.');
    assert.equal(await futurePage.title(), 'LING258 · Study Studio');
    await futureContext.close();assert.deepEqual(errors, []);
  } finally {await browser.close();await new Promise(resolve => server.close(resolve));}
});
