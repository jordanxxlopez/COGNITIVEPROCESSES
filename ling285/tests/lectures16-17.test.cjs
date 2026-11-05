const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const D=read('data.json'),P=read('practice-v2.json'),sources=read('source-manifest.json');
const lecture=id=>D.collections.find(c=>c.id===id);
const REUSE={2:2,3:3,4:4,6:5,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:13};
const EDITIONS=['v2','v3','v4','v7','v10','v12','v14','v16','v18'];

test('Lectures 16 and 17 preserve every original page, visual and speaker note in order',()=>{
 for(const [id,pages] of [['lecture16',16],['lecture17',8]]){
  const s=sources[id],c=lecture(id);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,s.file))).digest('hex'),s.sha256);
  assert.equal(s.pages,pages);assert.equal(c.sections.length,pages);assert.equal(c.moduleId,'module2');
  const native=read(`authoring/extracted/${id}-native.json`);
  for(const section of c.sections){
   assert.equal(section.id,id+'-p'+String(section.page).padStart(3,'0'));
   assert(fs.existsSync(path.join(root,section.image)),section.image);
   for(const a of section.assets)assert(fs.existsSync(path.join(root,a.file)),a.file);
   assert.equal(section.speakerNotes,native[section.page-1].speakerNotes);
  }
 }
 assert.equal(lecture('lecture16').sections[7].image,'assets/slides/lecture16/008-ink.webp');
});

test('repeated Lecture 15 slides reuse their Lecture 15 teaching in every edition',()=>{
 const l15=lecture('lecture15'),l16=lecture('lecture16');
 for(const [page,ref] of Object.entries(REUSE)){
  const a=l16.sections[page-1],b=l15.sections[ref-1];
  assert.equal(a.title,b.title);assert.deepEqual(a.teaching,b.teaching);
  for(const v of EDITIONS){
   const pack=read(`transcripts-${v}.json`).collections;
   assert.deepEqual(pack.lecture16.sections[page-1].teaching,pack.lecture15.sections[ref-1].teaching,`${v} page ${page}`);
  }
 }
});

test('every edition teaches each instructional page and leaves title and prompt pages empty',()=>{
 for(const id of ['lecture16','lecture17']){
  const base=lecture(id).sections;
  for(const v of EDITIONS){
   const sections=read(`transcripts-${v}.json`).collections[id].sections;
   assert.deepEqual(sections.map(s=>s.id),base.map(s=>s.id));
   for(const [i,s] of sections.entries())assert.equal(Boolean(s.teaching.length),Boolean(base[i].teaching.length),`${v} ${s.id}`);
  }
 }
 const empty=id=>lecture(id).sections.filter(s=>!s.teaching.length).map(s=>s.page);
 assert.deepEqual(empty('lecture16'),[1,4,6]);assert.deepEqual(empty('lecture17'),[1,8]);
});

test('Lecture 17 click animations are available as source-state exports',()=>{
 const stages=read('authoring/extracted/lecture17-animation-stages.json');
 const count=page=>stages.filter(s=>s.page===page).length;
 assert.deepEqual([4,5,6,7].map(count),[6,6,7,3]);
 for(const s of stages)assert(fs.existsSync(path.join(root,s.file)),s.file);
 for(const page of [4,5,6,7]){
  const assets=lecture('lecture17').sections[page-1].assets.filter(a=>a.sourceDerived);
  assert.equal(assets.length,count(page));
 }
});

test('both practice editions give each new lecture 25 multiple-choice and 25 written questions',()=>{
 for(const bank of [D.questions,P.questions])for(const id of ['lecture16','lecture17']){
  const qs=bank.filter(q=>q.lectureId===id);
  assert.equal(qs.length,50);assert.equal(qs.filter(q=>q.type==='mcq').length,25);assert.equal(new Set(qs.map(q=>q.prompt)).size,50);
  for(const q of qs){
   assert(q.answer&&q.rubric.length>=2);
   assert(q.sources.some(r=>r.collection===id&&lecture(id).sections[r.page-1].teaching.length),q.id);
   if(q.type==='mcq'){assert.equal(q.options.length,4);assert(q.options.some(o=>o.id===q.correctOption));assert.equal(new Set(q.options.map(o=>o.feedback)).size,4);}
  }
 }
 const v1=new Set(D.questions.map(q=>q.id));assert(P.questions.filter(q=>['lecture16','lecture17'].includes(q.lectureId)).every(q=>!v1.has(q.id)));
});
