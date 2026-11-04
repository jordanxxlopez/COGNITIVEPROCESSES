const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

for (const file of ['index.html', 'share.html']) {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const data = JSON.parse(html.match(/<script id="study-data" type="application\/json">(.*?)<\/script>/s)[1]);
  const manifest = {window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'module2-data.js'), 'utf8'), manifest);
  const current = manifest.window.SECOND_HALF;
  const modules = data.modules.concat(current.collections || []);
  const elements = {};
  const context = vm.createContext({
    M: modules, Q: data.questions,
    window: {SECOND_HALF:current},
    moduleBy: id => modules.find(m => m.id === id),
    state: { read: ['6:2', '3:2'], missed: [], personalNotes: { '6:2': 'Keep my note' } },
    view: 'home', selected: 6, mode: 'notes',
    $: selector => elements[selector] ||= {}, esc: String,
    versionControl: () => '', notes: () => 'MEMORY_NOTES',
  });
  const extract = (start, end) => html.slice(html.indexOf(start), html.indexOf(end, html.indexOf(start)));
  vm.runInContext(extract('const workspace=', '\nfunction go('), context);
  vm.runInContext(extract('function home(){', '\nfunction researchVisual('), context);
  vm.runInContext(extract('function moduleScreen(){', '\nfunction notes('), context);
  context.nav();
  assert.match(elements['#workspaceNav'].innerHTML, /data-module="6"/);
  assert.doesNotMatch(elements['#workspaceNav'].innerHTML, /data-view="test"/);
  assert.match(elements['#moduleNav'].innerHTML, /Module 1 · Exam 1 archive/);
  assert.doesNotMatch(elements['#moduleNav'].innerHTML, /id="examOneArchive" open/);
  assert.doesNotMatch(elements['#moduleNav'].innerHTML, /data-module="6"/);
  for (const m of modules.filter(m => !current.modules.includes(m.id))) {
    assert.match(elements['#moduleNav'].innerHTML, new RegExp(`data-module="${m.id}"`));
  }
  for (const id of current.modules) assert.doesNotMatch(elements['#moduleNav'].innerHTML, new RegExp(`data-module="${id}"`));
  assert.match(context.home(), /MODULE 2 · SECOND HALF/);
  assert.doesNotMatch(context.home(), /Start with attention/);
  assert.match(context.moduleScreen(), /MEMORY_NOTES/);
  assert.doesNotMatch(context.moduleScreen(), /not on the exam|EXTRA/);
  context.view = 'test'; context.nav();
  assert.match(elements['#moduleNav'].innerHTML, /id="examOneArchive" open/);
  assert.equal(context.state.personalNotes['6:2'], 'Keep my note');
  assert.equal(data.questions.length, 208);
  console.log(`PASS ${file}: current memory workspace, collapsed archive, preserved collections and study tools.`);
}
