'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),plain=s=>s.replace(/<[^>]*>/g,'');
const load=(name,marker)=>{const t=fs.readFileSync(path.join(root,name),'utf8');return JSON.parse(t.slice(t.indexOf(marker)+marker.length).replace(/;\s*$/,''))};
const bank=load('module2-data.js','window.SECOND_HALF = ');
const collection=bank.collections.find(m=>m.id===13),questions=bank.questions.filter(q=>q.module===13);
test('collection 14 teaches every supplied page and joins the current review tools',()=>{
 assert.deepEqual(bank.modules,[6,9,10,11,12,13]);assert.equal(bank.lectureNumbers[13],'14');assert.equal(bank.practiceTestSize,100);assert.equal(bank.lectureQuizSize,50);
 assert.deepEqual(collection.sections.map(s=>s.page),Array.from({length:28},(_,i)=>i+1));assert.equal(collection.original.length,28);
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'authoring/psyc301/judgment-part2-source.json')));assert.equal(manifest.pages.length,28);assert.equal(manifest.original,collection.file);assert.equal(manifest.stored,collection.sourcePdf);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,manifest.stored))).digest('hex'),manifest.sha256);
 for(const s of collection.sections){
  assert.equal(s.image,s.page-1);assert.equal(manifest.pages[s.page-1].image,collection.original[s.image]);assert(fs.statSync(path.join(root,collection.original[s.image])).size>4000);
  // The title and the empty Risky Decisions Lab placeholder stay visible without invented teaching.
  if([1,10].includes(s.page)){assert(s.sourceOnly);assert.deepEqual(s.bullets,[]);continue}
  const text=plain(s.bullets.join(' '));
  assert(s.bullets.length>=3&&s.bullets.length<=4,s.page);assert(text.split(/\s+/).length>=125,s.page);
  assert(!/[:;]|\b(?:the|this) lecture\b|need not|next slide|as you can see|this (?:illustrates|demonstrates|shows)|the key point|later experiments|pictured/i.test(text),s.page);
 }
 assert.equal(questions.length,50);assert.equal(new Set(bank.questions.map(q=>q.id)).size,300);
 assert.deepEqual([...new Set(questions.map(q=>q.page))].sort((a,b)=>a-b),[2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
 for(const q of questions){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.why.length>70);assert.equal(q.correct,0);}
 for(const key of ['topics','coreReview','experiments'])for(const g of bank[key].filter(g=>g.module===13))for(const p of g.pages)assert(collection.sections.some(s=>s.page===p&&!s.sourceOnly),key+' '+p);
 // The cumulative test can still draw an even share from every lecture.
 for(const id of bank.modules)assert(bank.questions.filter(q=>q.module===id).length>=Math.ceil(bank.practiceTestSize/bank.modules.length),id);
});
test('every transcript version covers collection 14 page by page',()=>{
 const pages=collection.sections.map(s=>s.page);
 for(const v of [6,10,12,14,16,18,20,21]){
  const pack=load(`psyc301-v${v}-data.js`,' = ');
  assert.deepEqual(Array.from(pack.scope),[6,9,10,11,12,13],v);
  for(const p of pages){
   const script=pack.scripts['13:'+p];assert(Array.isArray(script),`${v} 13:${p}`);
   assert.equal(script.length>0,![1,10].includes(p),`${v} 13:${p}`);
  }
 }
 // Version 21 states findings in words, so no years or percentages appear in its lecture 14 notes.
 const v21=load('psyc301-v21-data.js',' = ');
 for(const p of pages)for(const b of v21.scripts['13:'+p])for(const t of [b.text,...b.children])assert(!/\b(?:19|20)\d\d\b|%/.test(t),'13:'+p);
});
