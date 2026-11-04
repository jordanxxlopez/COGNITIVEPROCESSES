'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p))),sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const data=read('data.json'),v2=read('transcripts-v2.json'),v3=read('transcripts-v3.json'),practice=read('practice-v2.json'),model=read('authoring/practice-v2-model.json'),evidence=read('authoring/exam-style-evidence-v2.json');
test('Version 3 retains every source identity and complete reviewed teaching, without rewriting prior editions',()=>{
 assert.equal(sha('data.json'),'f1316545ef0167572ad8b29d250416045801e5a82a1fd8daefe176ff8eb650bd');
 assert.equal(v3.id,'v3');assert.equal(v3.baseDataSha256,sha('data.json'));assert.deepEqual(v3.visualPresentation,v2.visualPresentation);
 let count=0;
 for(const [id,c] of Object.entries(v3.collections)){
  const source=data.collections.find(x=>x.id===id),authored=read('authoring/teaching-v3-'+id+'.json')[id];assert.equal(c.title,source.title);assert.equal(c.sections.length,source.sections.length);
  for(let i=0;i<c.sections.length;i++){
   const s=c.sections[i],old=source.sections[i],a=authored.sections[i];count++;
   for(const field of ['id','page','title','kind'])assert.equal(s[field],old[field]);
   assert.equal(Boolean(s.teaching.length),Boolean(old.teaching.length));assert.deepEqual(s.teaching,a.teaching);
   assert(a.review.pageInspected&&a.review.assetsInspected);assert(a.review.method);if(s.teaching.length)assert(a.concepts.length);
   for(const text of s.teaching){assert(!/need not|<\/?[a-z][^>]*>|`/i.test(text));}
  }
 }
 assert.equal(count,86);const coverage=read('authoring/transcripts-v3-coverage.json');assert.equal(coverage.sectionCount,86);assert.equal(coverage.originalCourseDataUnchanged,true);assert.equal(coverage.hiddenBlankPreviews,35);
});
test('new practice is source-linked, distinct, balanced, and keeps simple questions simple',()=>{
 const oldIds=new Set(data.questions.map(q=>q.id)),ids=new Set(),prompts=new Set(),keys={a:0,b:0,c:0,d:0};
 const pages=new Set(data.collections.flatMap(c=>c.sections.map(s=>c.id+':'+s.page)));
 assert.equal(practice.questions.length,200);assert.equal(practice.baseDataSha256,sha('data.json'));
 for(const q of practice.questions){assert(!oldIds.has(q.id));assert(!ids.has(q.id));ids.add(q.id);assert(!prompts.has(q.prompt));prompts.add(q.prompt);assert.equal(q.moduleId,'module2');assert.equal(q.assessmentVersion,'v2');assert(q.priority>=1&&q.priority<=2);assert(q.answer&&q.rubric.length);assert(q.sources.every(s=>pages.has(s.collection+':'+s.page)));assert(q.sources.some(s=>s.collection===q.lectureId));
  if(q.type==='mcq'){assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.id)).size,4);assert(q.options.every(o=>o.text&&o.feedback));assert.equal(q.options.filter(o=>o.id===q.correctOption).length,1);keys[q.correctOption]++;}
 }
 assert.deepEqual(keys,{a:25,b:25,c:25,d:25});
 for(const n of [11,12,13,14]){const bank=practice.questions.filter(q=>q.lectureId==='lecture'+n);assert.equal(bank.length,50);assert.equal(bank.filter(q=>q.type==='mcq').length,25);assert.equal(bank.filter(q=>q.type==='written').length,25);for(const q of read('authoring/practice-v2-lecture'+n+'.json').questions){const published=bank.find(x=>x.id===q.id);for(const [key,value]of Object.entries(q))assert.deepEqual(published[key],value);}}
 assert(practice.questions.some(q=>q.type==='written'&&q.answer.split(/\s+/).length<=5&&q.rubric.length===1));
 assert.equal(data.questions.length,292);assert.equal(data.questions.filter(q=>q.moduleId==='module1').length,92);
});
test('the executed model fits only the supplied exam/review evidence and reports its actual components',()=>{
 assert.equal(evidence.examItems.length,25);assert.equal(evidence.reviewItems.length,20);assert.equal(evidence.examItems[15].answer,'No');assert.equal(evidence.empiricalSummary.observedFormatCounts.MCQ,1);
 assert.equal(model.trainingDocuments,45);assert.match(model.vocabularyFit,/prompts only/);assert.match(model.method.coefficients,/not fitted or validated/);assert.equal(model.rankings.length,200);
 for(const input of model.inputs)assert.equal(sha(input.file),input.sha256);
 for(const row of model.rankings){const q=practice.questions.find(q=>q.id===row.id);assert.equal(q.priority,row.priority);const result=1+.6*row.patternComponent+.25*row.examSimilarity+.15*row.reviewSimilarity;assert(Math.abs(q.priority-result)<.000002);}
 assert.equal(model.contracts.currentTest,100);assert.equal(model.contracts.currentTestMCQ,50);assert.equal(model.contracts.currentTestWritten,50);
 for(const source of evidence.sourceFiles)assert.equal(sha(source.file),source.sha256);
});

test('the Version 3 release audit binds its historical interface and preserves its content files',()=>{
 const report=read('authoring/v3-practice-v2-audit.json');assert.equal(report.status,'passed');assert.equal(report.scope.sourcePages,86);assert.equal(report.scope.newQuestions,200);
 // UI files evolve with newer editions; verify their exact released bytes
 // at the recorded Version 3 commit rather than rewriting the historical audit.
 const {execFileSync}=require('node:child_process');
 for(const row of [...report.files,...report.preservation.oldFileBindings]){
  const actual=['app.js','index.html','style.css'].includes(row.file)
   ?crypto.createHash('sha256').update(execFileSync('git',['show','8334e0b:ling285/'+row.file],{cwd:root})).digest('hex')
   :sha(row.file);
  assert.equal(actual,row.sha256,row.file);
 }
 const review=read(report.editorialReview);assert(review);
});
