'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const {directTeaching,existingCoverage}=require('./psyc-transcript-preservation.cjs'),root=path.resolve(__dirname,'..');
const before=name=>execFileSync('git',['show','43a7eba:'+name],{cwd:root,encoding:'utf8',maxBuffer:50*1024*1024});
const pack=(text,marker)=>JSON.parse(text.split(marker)[1].replace(/;\s*$/,''));
test('PSYC301 changes only the requested transcript framing, across preserved editions',()=>{
 let inspected=0;
 function audit(modules){for(const m of modules)for(const s of m.sections)for(const key of ['bullets','versionB','versionC','versionD','versionE','version2'])for(const t of s[key]||[]){inspected++;assert(!/\b(?:the|this) lecture\b/i.test(t),m.id+':'+s.page+' '+t)}}
 for(const name of ['index.html','share.html']){
  const parse=s=>JSON.parse(s.match(/<script id="study-data" type="application\/json">(.*?)<\/script>/s)[1]);
  const current=parse(fs.readFileSync(path.join(root,name),'utf8')),old=parse(before(name));
  assert.deepEqual(current,directTeaching(old));assert.deepEqual(current.questions,old.questions);audit(current.modules);
 }
 for(const [name,marker,modules]of [['module2-data.js','window.SECOND_HALF = ',d=>d.collections],['short-term-memory-v2.js','window.SHORT_TERM_MEMORY_V2 = ',d=>[d]]]){
  const current=pack(fs.readFileSync(path.join(root,name),'utf8'),marker),old=pack(before(name),marker);assert.deepEqual(existingCoverage(current,old),directTeaching(old));audit(modules(current));
 }
 for(const file of ['ling406/data.js','ling406/transcripts-v2-data.js','ling406/transcripts-v3-data.js','ling406/transcripts-v4-data.js','ling285/app.js','ling285/data.json','bme423/app.js','bme423/module2-data.js']){
  if(fs.existsSync(path.join(root,file)))assert.equal(fs.readFileSync(path.join(root,file),'utf8'),before(file),file+' was outside transcript-change scope');
 }
 for(const name of ['bme423/index.html','ling406/index.html','ling285/index.html']){
  let current=fs.readFileSync(path.join(root,name),'utf8').replace(/<link rel="stylesheet" href="\.\.\/studio-gradients\.css\?v=studio-gradients-1" data-studio-gradient="(?:bme423|ling406|ling285)">/,'').replace(/<link rel="stylesheet" href="(?:\.\.\/)?course-switcher\.css[^"]*">/,'').replace(/<script src="(?:\.\.\/)?course-switcher\.js[^"]*" defer><\/script>/,'');
  // Subsequent LING406 V5, V6 and V7 were authorized separately. Their content and
  // bounded application changes are pinned by ling406/tests/verify_v5.py and verify_v7.py.
  if(name==='ling406/index.html')current=current
   .replace('<script src="transcripts-v10-data.js?v=ling406-transcripts-v10"></script>','')
   .replace('app.js?v=ling406-transcripts-v10','app.js?v=ling406-transcripts-v7')
   .replace('<option value="10" selected>Version 10 · direct teaching notes</option>','')
   .replace('<option value="7">Version 7 · teaching notes</option>','<option value="7" selected>Version 7 · teaching notes</option>')
   .replace('<script src="transcripts-v7-data.js?v=ling406-transcripts-v7"></script>','')
   .replace('app.js?v=ling406-transcripts-v7','app.js?v=ling406-transcripts-v6')
   .replace('<option value="7" selected>Version 7 · teaching notes</option>','')
   .replace('<option value="6">Version 6 · natural teaching</option>','<option value="6" selected>Version 6 · natural teaching</option>')
   .replace('<link rel="stylesheet" href="../bme423/vendor/katex/katex.min.css">','')
   .replace('<link rel="stylesheet" href="transcripts-v5.css?v=ling406-transcripts-v5">','')
   .replace('<script src="../bme423/vendor/katex/katex.min.js"></script>','')
   .replace('<script src="transcripts-v5-data.js?v=ling406-transcripts-v5"></script>','')
   .replace('<script src="transcripts-v6-data.js?v=ling406-transcripts-v6"></script>','')
   .replace('app.js?v=ling406-transcripts-v6','app.js?v=ling406-transcripts-v5')
   .replace('<option value="6" selected>Version 6 · natural teaching</option>','')
   .replace('<option value="5">Version 5 · clear teaching</option>','')
   .replace('app.js?v=ling406-transcripts-v5','app.js?v=ling406-transcripts-v4')
   .replace('<option value="5" selected>Version 5 · clear teaching</option>','')
   .replace('<option value="4">Version 4 · slide wording</option>','<option value="4" selected>Version 4 · slide wording</option>');
  assert.equal(current,before(name),'Other-course entry pages may only add the separately authorized selector/edition assets');
 }
 console.log('PASS:',inspected,'PSYC301 teaching paragraphs checked; direct statements replace narration; all other data, versions, source slides and other-course transcripts preserved.');
});
