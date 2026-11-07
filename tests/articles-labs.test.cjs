'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const ctx=vm.createContext({window:{}});
const module2=fs.readFileSync(path.join(root,'module2-data.js'),'utf8'),c15=fs.readFileSync(path.join(root,'psyc301-c15-data.js'),'utf8');
vm.runInContext(module2,ctx);vm.runInContext(c15,ctx);
const w=ctx.window,bank=w.SECOND_HALF,collection=bank.collections.find(c=>c.id===14),qs=bank.questions.filter(q=>q.module===14);
test('collection 15 joins Module II with every lab and article',()=>{
 assert.deepEqual(Array.from(bank.modules),[6,9,10,11,12,13,14]);assert.equal(bank.lectureNumbers[14],'15');
 assert.deepEqual(Array.from(collection.sections.map(s=>s.page)),Array.from({length:18},(_,i)=>i+1));
 for(const s of collection.sections){assert(s.bullets.length>=2,s.page);assert(fs.statSync(path.join(root,collection.original[s.image])).size>4000,s.page)}
 for(const key of ['topics','coreReview','experiments'])for(const g of bank[key].filter(g=>g.module===14))for(const p of g.pages)assert(collection.sections.some(s=>s.page===p),key+p);
 assert.equal(new Set(bank.questions.map(q=>q.id)).size,bank.questions.length);
});
test('collection 15 has 50 questions with three wordings and four transcript editions',()=>{
 assert.equal(qs.length,50);assert.equal(qs.filter(q=>q.page<=12).length,34);
 const V=JSON.parse(fs.readFileSync(path.join(root,'module2-question-versions-data.js'),'utf8').split('\n')[1].slice('window.M2_QUESTION_VERSIONS = '.length).replace(/;$/,''));
 for(const q of qs){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.correct,0);
  for(const v of ['college','simple']){const x=V[q.id][v];assert.equal(x.options.length,4);assert.equal(x.correct,0,q.id)}}
 for(const v of ['20','21','22'])for(const s of collection.sections){const t=w.C15_TEXT[v][s.page];assert(t.length>=2&&t.length<=3,v+s.page);
  for(const b of t)for(const c of b.children)assert.equal(typeof c,'string',v+s.page)}
 for(const s of collection.sections)assert(!/\b(?:19|20)\d\d\b/.test(JSON.stringify(w.C15_TEXT['21'][s.page])),'v21 years '+s.page);
});
test('every figure exists with a credit',()=>{
 for(const s of collection.sections){const m=w.C15_MEDIA.sections[s.page];assert(m&&m.credit&&m.description,s.page);for(const v of m.videos)assert.match(v.id,/^[\w-]{11}$/)}
});
