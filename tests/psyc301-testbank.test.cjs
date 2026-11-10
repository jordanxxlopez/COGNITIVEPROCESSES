'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const c=vm.createContext({window:{}});vm.runInContext(read('module2-data.js'),c);vm.runInContext(read('psyc301-c15-data.js'),c);vm.runInContext(read('psyc301-testbank-data.js'),c);
const bank=c.window.PSYC301_TESTBANK.questions,source=JSON.parse(read('authoring/psyc301/testbank/source-questions.json'));
const base=JSON.parse(read('index.html').match(/<script id="study-data" type="application\/json">(.*?)<\/script>/s)[1]);
const modules=[...base.modules,...c.window.SECOND_HALF.collections];
test('source coverage, preserved keys, explanations, and real slide anchors',()=>{
 assert.equal(bank.length,171);assert.equal(new Set(bank.map(q=>q.id)).size,171);
 for(const [ch,count] of [[5,52],[12,57],[13,57],[10,5]])assert.equal(bank.filter(q=>q.chapter===ch).length,count);
 for(const q of bank){
  const original=source.find(x=>x.id===q.id);assert(original);assert.equal(q.correct,original.correct);assert.equal(q.options.length,4);assert(q.why.length>100);assert(!/your text|textbook|the text’s/i.test(q.stem));
  if(q.id!=='G13-038')assert.deepEqual(JSON.parse(JSON.stringify(q.options)),original.options);
  if(q.scope==='slides'){assert(q.refs.length);for(const [id,page] of q.refs){const m=modules.find(m=>m.id===id);assert(m,`${q.id}: missing module`);assert(m.sections.some(s=>s.page===page),`${q.id}: missing page ${id}:${page}`)}}else assert.equal(q.refs.length,0);
 }
 assert.equal(bank.filter(q=>q.scope==='slides').length,148);assert.equal(bank.filter(q=>q.scope==='extra').length,18);assert.equal(bank.filter(q=>q.scope==='review').length,5);
 assert.equal(bank.find(q=>q.id==='G13-030').scope,'extra');assert.equal(bank.find(q=>q.id==='G13-013').scope,'review');
 assert(!bank.some(q=>[3,4,6,7,8,9,11].includes(q.chapter)));
});
test('every shuffled deck preserves answer identity without adjacent repeated letters',()=>{
 const html=read('index.html');vm.runInContext(html.slice(html.indexOf('function shuffleChoiceOrder('),html.indexOf('function weightedOrder(')),c);
 const keys=new Set();
 for(let i=0;i<100;i++){
  const items=c.prepareQuizItems(bank);assert(c.validateAnswerKey(items));keys.add(items.map(q=>q.order.indexOf(q.correct)).join(''));
  for(let n=1;n<items.length;n++)assert.notEqual(items[n].order.indexOf(items[n].correct),items[n-1].order.indexOf(items[n-1].correct));
 }
 assert.equal(keys.size,100);
});
