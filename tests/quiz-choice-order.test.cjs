const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

for (const file of ['index.html', 'share.html']) {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const data = JSON.parse(html.match(/<script id="study-data" type="application\/json">(.*?)<\/script>/s)[1]);
  const source = html.slice(html.indexOf('function shuffleChoiceOrder('), html.indexOf('function weightedOrder('));
  let seed = 314159;
  const math = Object.create(Math);
  math.random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  const context = vm.createContext({ Math: math });
  vm.runInContext(source, context);
  const validate = context.validateAnswerKey;
  const questions = data.questions;
  const before = JSON.stringify(questions);
  const fixture = correct => ({ correct, options: ['one', 'two', 'three', 'four'], why: 'explanation' });
  assert(validate([]));
  assert(validate([{ ...fixture(2), order: [0, 2, 3, 1] }]));
  assert(!validate([{ ...fixture(0), order: [0, 1, 2, 3] }, { ...fixture(2), order: [2, 1, 0, 3] }]));
  assert(!validate([{ ...fixture(0), order: [0, 0, 2, 3] }]));
  assert(!validate([{ ...fixture(0), order: [1, 2, 3] }]));
  const keys = new Set();
  const firstPositions = new Set();
  const allPositions = new Set();
  const nonePositions = new Set();
  for (let run = 0; run < 500; run++) {
    const items = context.prepareQuizItems(questions);
    assert(validate(items));
    const key = items.map(q => q.order.indexOf(q.correct));
    for (let i = 1; i < key.length; i++) assert.notEqual(key[i], key[i - 1]);
    keys.add(key.join(''));
    firstPositions.add(key[0]);
    for (const item of items) {
      assert.equal(new Set(item.order).size, 4);
      assert.equal(item.options[item.order[key[items.indexOf(item)]]], item.options[item.correct]);
      if (item.id === 156) allPositions.add(item.order.indexOf(item.correct));
      if (item.id === 157) nonePositions.add(item.order.indexOf(item.correct));
    }
  }
  assert.equal(keys.size, 500, 'No fixed answer-key cycle');
  for (const positions of [firstPositions, allPositions, nonePositions]) assert.equal(positions.size, 4);
  assert.equal(JSON.stringify(questions), before, 'Question bank is immutable');
  // Force rejection of the first complete key, then exercise the real reshuffle loop.
  const shuffleOrder = context.shuffleChoiceOrder;
  let draws = 0, checks = 0;
  context.shuffleChoiceOrder = length => (++draws <= 100 ? [0, 1, 2, 3] : shuffleOrder(length));
  context.validateAnswerKey = items => { checks++; return validate(items); };
  const repaired = context.prepareQuizItems(Array.from({ length: 100 }, () => fixture(0)));
  assert(checks >= 2, 'Reject and revalidate before returning');
  assert(validate(repaired));
  const nonzero = context.prepareQuizItems([fixture(2), fixture(3), fixture(1), fixture(2)]);
  assert(validate(nonzero), 'Use each item’s correct index');
  assert.throws(() => context.prepareQuizItems([{ ...fixture(0), options: ['only one'] }]));
  for (const id of [153, 155, 156, 157]) {
    const item = context.prepareQuizItems([questions.find(q => q.id === id)])[0];
    assert(item.options.some(o => /^(All|None) of the other options$/.test(o)));
    assert(!item.options.some(o => /^(All|None) of the above$/.test(o)));
  }
  const starts = html.match(/^function (?:startQuiz|startEssentialPractice)\(.*$/gm);
  assert.equal(starts.length, 2);
  assert(starts.every(s => s.includes('prepareQuizItems(')), 'All quiz entry points use validation');
  console.log(`PASS ${file}: 500 full-bank keys, forced reject/reshuffle/revalidation, all four letter positions, option integrity, position-independent All/None, and both quiz entry points.`);
}
