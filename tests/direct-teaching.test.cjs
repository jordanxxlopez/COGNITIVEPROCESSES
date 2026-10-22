'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const {directTeaching}=require('./psyc-transcript-preservation.cjs'),root=path.resolve(__dirname,'..');
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
  const current=pack(fs.readFileSync(path.join(root,name),'utf8'),marker),old=pack(before(name),marker);assert.deepEqual(current,directTeaching(old));audit(modules(current));
 }
 for(const file of ['ling406/app.js','ling406/data.js','ling406/transcripts-v2-data.js','ling406/transcripts-v3-data.js','ling406/transcripts-v4-data.js','ling285/app.js','ling285/data.json','bme423/app.js','bme423/module2-data.js']){
  if(fs.existsSync(path.join(root,file)))assert.equal(fs.readFileSync(path.join(root,file),'utf8'),before(file),file+' was outside transcript-change scope');
 }
 for(const name of ['bme423/index.html','ling406/index.html','ling285/index.html']){
  const current=fs.readFileSync(path.join(root,name),'utf8').replace(/<link rel="stylesheet" href="(?:\.\.\/)?course-switcher\.css[^"]*">/,'').replace(/<script src="(?:\.\.\/)?course-switcher\.js[^"]*" defer><\/script>/,'');
  assert.equal(current,before(name),'Other-course entry pages may only add the authorized course selector assets');
 }
 console.log('PASS:',inspected,'PSYC301 teaching paragraphs checked; direct statements replace narration; all other data, versions, source slides and other-course transcripts preserved.');
});
