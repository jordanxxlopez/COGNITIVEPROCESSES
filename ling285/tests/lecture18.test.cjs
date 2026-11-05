const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
test('Lecture18 preserves all eight original pages and source assets',()=>{
 const d=read('data.json'),c=d.collections.find(c=>c.id==='lecture18'),s=read('source-manifest.json').lecture18;
 assert.equal(c.moduleId,'module2');assert.equal(c.sections.length,8);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,s.file))).digest('hex'),s.sha256);
 const native=read('authoring/extracted/lecture18-native.json');
 for(const [i,p]of c.sections.entries()) {assert.equal(p.page,i+1);assert.equal(p.id,`lecture18-p${String(i+1).padStart(3,'0')}`);assert.equal(p.speakerNotes,native[i].speakerNotes);assert(fs.existsSync(path.join(root,p.image)));for(const a of p.assets)assert(fs.existsSync(path.join(root,a.file)));}
 assert.equal(c.sections[0].teaching.length,0);
 for(const n of [2,4,5,6,7])assert(c.sections[n-1].assets.some(a=>a.sourceDerived),'reveal assets page'+n);
});
test('every selectable teaching payload covers Lecture18 in order',()=>{
 for(const v of [2,3,4,7,10,12,14,16,18,20,21,22]){
  const c=read(`transcripts-v${v}.json`).collections.lecture18;assert(c,`v${v}`);assert.deepEqual(c.sections.map(s=>Number(s.page)),[1,2,3,4,5,6,7,8]);assert.equal(c.sections[0].teaching.length,0);
 }
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');assert(app.includes("v23:'v22'"));
});
test('both practice editions include a complete uniquely owned Lecture18 quiz',()=>{
 for(const d of [read('data.json'),read('practice-v2.json')]){
  const qs=d.questions.filter(q=>q.lectureId==='lecture18');assert.equal(qs.length,50);assert.equal(qs.filter(q=>q.type==='mcq').length,25);assert.equal(qs.filter(q=>q.type==='written').length,25);assert.equal(new Set(qs.map(q=>q.id)).size,50);
  for(const q of qs){assert(q.sources.some(s=>s.collection==='lecture18'&&s.page>=1&&s.page<=8));if(q.type==='mcq'){assert.equal(q.options.length,4);assert(q.options.every(o=>o.feedback));}}
 }
});
test('adding Lecture18 preserves prior collections, teaching versions, questions and saved-state keys',()=>{
 const {execFileSync}=require('node:child_process');const old=f=>JSON.parse(execFileSync('git',['show','7aa1b8f8933e609f6d61bd9452a316eabc19ea79:ling285/'+f],{cwd:root,encoding:'utf8',maxBuffer:30*1024*1024}));
 const d=read('data.json'),before=old('data.json');for(const c of before.collections)assert.deepEqual(d.collections.find(x=>x.id===c.id),c,c.id);
 for(const v of [2,3,4,7,10,12,14,16,18,20,21,22]){const f=`transcripts-v${v}.json`,now=read(f);for(const [id,c]of Object.entries(old(f).collections))assert.deepEqual(now.collections[id],c,f+id);}
 for(const f of ['data.json','practice-v2.json']){const now=read(f);for(const q of old(f).questions){const current=now.questions.find(x=>x.id===q.id);assert(current,q.id);for(const key of Object.keys(q).filter(k=>k!=='priority'))assert.deepEqual(current[key],q[key],q.id+key);}}
 assert.equal(fs.readFileSync(path.join(root,'app.js'),'utf8'),execFileSync('git',['show','7aa1b8f8933e609f6d61bd9452a316eabc19ea79:ling285/app.js'],{cwd:root,encoding:'utf8'}));
});
