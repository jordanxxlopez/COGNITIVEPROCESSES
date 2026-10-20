'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f))),sha=f=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex');
const data=read('data.json'),v3=read('transcripts-v3.json'),v4=read('transcripts-v4.json'),coverage=read('authoring/transcripts-v4-coverage.json');
const words=paragraphs=>paragraphs.join(' ').replace(/\*\*/g,'').split(/\s+/).filter(Boolean).length;
test('Version 4 covers all source identities and meets the requested median without padding empty pages',()=>{
 assert.equal(v4.id,'v4');assert.equal(v4.baseDataSha256,sha('data.json'));assert.deepEqual(v4.visualPresentation,v3.visualPresentation);assert.deepEqual(v4.references,v3.references);
 const counts=[];let pages=0;
 for(const [id,c]of Object.entries(v4.collections)){
  const source=data.collections.find(c=>c.id===id),authored=read('authoring/teaching-v4-'+id+'.json')[id];assert.equal(c.sections.length,source.sections.length);
  c.sections.forEach((s,i)=>{pages++;const old=source.sections[i];for(const k of ['id','page','title','kind'])assert.equal(s[k],old[k]);assert.deepEqual(s.teaching,authored.sections[i].teaching);assert.equal(Boolean(s.teaching.length),Boolean(old.teaching.length));
   if(s.teaching.length){counts.push(words(s.teaching));assert(s.teaching.length<=4);assert(!s.teaching.some(p=>/need not|<\/?[a-z][^>]*>|`/i.test(p)));assert(authored.sections[i].concepts.length);}
   const row=coverage.sections.find(row=>row.id===s.id);assert.equal(row.words,words(s.teaching));assert.equal(row.originalImage,old.image);assert.deepEqual(row.originalAssets,old.assets.map(a=>({type:a.type,file:a.file})));
  });
 }
 counts.sort((a,b)=>a-b);const median=counts[(counts.length-1)/2];assert.equal(pages,86);assert.equal(counts.length,75);assert(median>=200&&median<=250);assert.equal(coverage.metrics.medianWords,median);assert.equal(coverage.emptyPagesPreserved,11);
});
test('the earlier teaching, practice editions, and question banks are unchanged',()=>{
 const report=read('authoring/transcripts-v4-preservation.json');assert.equal(report.allEarlierEditionsAndPracticeUnchanged,true);
 for(const row of report.files)assert.equal(sha(row.file),row.sha256,row.file);
 assert.equal(data.questions.length,292);assert.equal(read('practice-v2.json').questions.length,200);
});
test('the source review keeps the important system and measurement distinctions',()=>{
 const prose=(lecture,page)=>v4.collections[lecture].sections.find(s=>s.page===page).teaching.join(' ');
 assert.match(prose('lecture11',9),/assigned for the illustration/i);assert.match(prose('lecture11',10),/without reporting a measured outcome/i);
 assert.match(prose('lecture12',11),/Mode 4 lower and Mode 5 higher/);assert.match(prose('lecture12',20),/lower F1 and higher F2/);assert.match(prose('lecture12',21),/higher F1 and lower F2/);
 assert.match(prose('lecture14',23),/negative labels are green/);assert.match(prose('lecture14',24),/0\.5 to \/done\//);assert.match(prose('lecture14',25),/does not train it/);
 const refs=read('authoring/transcripts-v4-writing-reference.json');assert.equal(refs.references.length,3);for(const r of refs.references)assert.equal(sha(r.file),r.sha256);
});

test('the Version 4 review matches the final authored and runtime files',()=>{
 const report=read('authoring/transcripts-v4-review.json');assert.equal(report.status,'passed');assert.equal(report.independentReviewer,false);assert.equal(report.scope.instructionalPages,75);assert.equal(report.writingRequirement.actualMetrics.medianWords,216);assert.deepEqual(report.unresolvedBlockingFindings,[]);
 for(const file of report.files)assert.equal(sha(file.file),file.sha256,file.file);
});
