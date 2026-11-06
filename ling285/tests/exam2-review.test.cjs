'use strict';
// Checks the Exam 2 review guide and Practice Version 3 files that the studio loads.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const data=read('data.json'),pages=new Set(data.collections.flatMap(c=>c.sections.map(s=>c.id+':'+s.page)));
const lectures=['lecture11','lecture12','lecture13','lecture14','lecture15','lecture16','lecture17','lecture18'];
test('review guide answers all 21 review questions with real sources and figures',()=>{
 const review=read('exam2-review.json');
 assert.deepEqual(review.items.map(i=>i.number),Array.from({length:21},(_,i)=>i+1));
 for(const item of review.items){
  assert(item.answer.length>20 && item.teaching.length>0 && item.change.length>10,item.id);
  for(const ref of item.sources)assert(pages.has(ref.collection+':'+ref.page),item.id+' source');
  if(item.image)assert(fs.existsSync(path.join(root,item.image)),item.id+' image');
 }
});
test('practice v3 has 12 questions per Module II lecture and a 25-question blueprint',()=>{
 const v3=read('practice-v3.json');
 assert.equal(v3.id,'v3');assert.equal(new Set(v3.questions.map(q=>q.id)).size,v3.questions.length);
 for(const id of lectures){
  const bank=v3.questions.filter(q=>q.lectureId===id);
  assert.equal(bank.filter(q=>q.type==='written').length,9,id);assert.equal(bank.filter(q=>q.type==='mcq').length,3,id);
 }
 assert.equal(Object.values(v3.policy.blueprint).reduce((a,b)=>a+b,0),25);
 for(const q of v3.questions){
  assert(q.sources.every(ref=>pages.has(ref.collection+':'+ref.page)),q.id);
  if(q.type==='mcq'){assert.equal(q.options.length,4);assert(q.options.some(o=>o.id===q.correctOption));}
 }
});
test('practice v2 and the original questions are unchanged in size',()=>{
 assert.equal(read('practice-v2.json').questions.length,400);
});
