'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright'),{stripPsycV6Assets}=require('./psyc-transcript-preservation.cjs');
const root=path.resolve(__dirname,'..'),c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'psyc301-v6-data.js'),'utf8'),c);const V=JSON.parse(JSON.stringify(c.window.PSYC301_V6));
const bare=t=>t.replace(/\*\*/g,'').replace(/\\\[[\s\S]*?\\\]/g,'[equation]').replace(/\s+/g,' ').trim();
const spoken=t=>t.replace(/\*\*/g,'').replace(/\\\[([\s\S]*?)\\\]/g,(_,tex)=>V.mathSpeech[tex]);
async function displayed(locator){return locator.evaluateAll(es=>es.map(el=>{const copy=el.cloneNode(true);copy.querySelectorAll('.katex').forEach(k=>k.replaceWith(document.createTextNode('[equation]')));return copy.textContent.replace(/\s+/g,' ').trim()}))}
test('Version 6 adds only independently authored Module II text and edition assets',()=>{
 execFileSync('python',['authoring/psyc301/version6/verify.py'],{cwd:root,stdio:'pipe'});
 for(const name of ['index.html','share.html'])assert.equal(stripPsycV6Assets(fs.readFileSync(path.join(root,name),'utf8')),execFileSync('git',['show','1be9d5a:'+name],{cwd:root,encoding:'utf8',maxBuffer:50*1024*1024}));
 assert.equal(Object.keys(V.scripts).length,148);assert.deepEqual(Array.from(V.scope),[6,9,10,11,12]);
 for(const id of [3,5,2,7,4,8,1,0])assert(!Object.keys(V.scripts).some(key=>key.startsWith(id+':')));
 assert.deepEqual(Array.from(V.scripts['6:22']),[],'Do not invent a transcript for a page containing only case-video links');
 assert.equal(127-21-2*3,100);assert.equal(15+3,18);assert.equal(28-3,25);assert.equal(3*(2+3),15);assert.equal(43*6,258);assert.equal(1000-100,900);assert(1/10>7/100);
});
function serve(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.stat(file,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);return res.end()}res.writeHead(200,{'Content-Type':{'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.woff2':'font/woff2'}[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)})})}
test('both PSYC301 entries render every V6 page and retain versions, source order, notes, quizzes and themes',{timeout:180000},async()=>{
 const host=serve();await new Promise(r=>host.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+host.address().port;
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{for(const entry of ['/','/share.html']){
  const context=await browser.newContext({viewport:{width:1480,height:1100}});
  await context.addInitScript(()=>{
   if(!localStorage.getItem('psyc301-studio-v1'))localStorage.setItem('psyc301-studio-v1',JSON.stringify({theme:'dark',explanationVersions:{3:'E',6:'2',9:'A'},read:['6:11','9:17','10:2'],personalNotes:{'6:11':'Keep sensory memory.','9:17':'Keep rotation.','10:2':'Keep problem solving.'},missed:[1,3001,4001,5001],essentialsDone:['m2-topic-11-2']}));
   window.spoken=[];Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},speak(s){window.spoken.push(s.text)}}});window.SpeechSynthesisUtterance=function(t){this.text=t};
  });
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+entry);
  await p.evaluate(()=>go('module',6));assert.equal(await p.locator('[data-explanation-version="6"]').inputValue(),'2');
  for(const id of V.scope){
   await p.evaluate(id=>go('module',id),id);const sel='[data-explanation-version="'+id+'"]';
   assert.equal(await p.locator(sel+' option[value="6"]').count(),1);await p.selectOption(sel,'6');
   assert.equal(await p.evaluate(id=>state.explanationVersions[id],id),'6');
   const module=await p.evaluate(id=>({pages:moduleBy(id).sections.map(s=>s.page),images:moduleBy(id).sections.map(s=>s.image)}),id);
   assert.deepEqual(module.pages,Array.from({length:module.pages.length},(_,i)=>i+1));
   const rows=p.locator('#content .section');assert.equal(await rows.count(),module.pages.length);
   for(let i=0;i<module.pages.length;i++)assert.deepEqual(await displayed(rows.nth(i).locator('.psyc-v6-prose')),V.scripts[id+':'+module.pages[i]].map(bare),id+':'+module.pages[i]);
   await p.locator('[data-mode="expanded"]').click();assert.equal(await p.locator('#teachSelect option').count(),module.pages.length);assert.equal(await p.locator(sel).inputValue(),'6');
   for(let i=0;i<module.pages.length;i++){
    await p.selectOption('#teachSelect',String(i));const key=id+':'+module.pages[i];
    assert.deepEqual(await displayed(p.locator('#spoken .psyc-v6-prose')),V.scripts[key].map(bare),key);
    assert.equal(await p.locator('.visual-pane img').getAttribute('src'),module.images[i]);
    assert.equal(await p.locator('.expanded-preview [data-personal-note]').getAttribute('data-personal-note'),key);
   }
   assert(await p.locator('#nextTeach').isDisabled());await p.locator('#prevTeach').click();assert.equal(await p.locator('#teachSelect').inputValue(),String(module.pages.length-2));
   await p.locator('#exitExpanded').click();
  }
  // One source page remains selected while switching every existing STM edition.
  await p.evaluate(()=>{go('module',6);mode='expanded';teachIndex=10;render()});
  const select='[data-explanation-version="6"]',image=await p.locator('.visual-pane img').getAttribute('src');
  assert.equal(await p.locator('[data-personal-note="6:11"]').inputValue(),'Keep sensory memory.');
  await p.locator('[data-personal-note="6:11"]').fill('My original sensory-memory note, still here.');
  for(const v of ['A','2','6']){await p.selectOption(select,v);assert.equal(await p.locator('#teachSelect').inputValue(),'10');assert.equal(await p.locator('.visual-pane img').getAttribute('src'),image);assert.equal(await p.locator('[data-personal-note="6:11"]').inputValue(),'My original sensory-memory note, still here.');assert(await p.locator('[data-read="6:11"]').isChecked())}
  await p.locator('#exitExpanded').click();
  for(const [id,page]of [[9,3],[10,3],[10,6],[10,11],[12,20],[12,22]]){
   await p.evaluate(([id,page])=>{go('module',id);mode='expanded';teachIndex=moduleBy(id).sections.findIndex(s=>s.page===page);render()},[id,page]);
   assert(await p.locator('#spoken .katex-display').count()>0);assert.equal(await p.locator('#spoken .katex-error').count(),0);
   assert(!/\\\[|\\frac|\\times|\\mathrm/.test(await p.locator('#spoken').innerText()));
   await p.locator('#speak').click();const text=await p.evaluate(()=>window.spoken.at(-1));assert.equal(text,V.scripts[id+':'+page].map(spoken).join(' '));
   await p.locator('#exitExpanded').click();
  }
  for(const view of ['m2guide','m2core','m2experiments','m2combined']){
   await p.evaluate(v=>go(v),view);assert(await p.locator('.psyc-v6-prose').count()>0);
  }
  for(const view of ['m2coreExpanded','m2experimentsExpanded']){
   await p.evaluate(v=>{view=v;teachIndex=0;cover=false;render()},view);const key=await p.locator('.expanded-preview [data-personal-note]').getAttribute('data-personal-note');
   assert.deepEqual(await displayed(p.locator('#spoken .psyc-v6-prose')),V.scripts[key].map(bare));
   await p.locator('#exitExpanded').click();
  }
  await p.evaluate(()=>go('module',6));await p.locator('#noteSearch').fill('icon');assert(await p.locator('.section:not(.hidden)').count()>0);assert(await p.locator('.section:not(.hidden)').count()<47);
  // Archive editions are untouched and gain no Version 6 option.
  for(const id of [3,5,2,7,4,8,1,0]){await p.evaluate(id=>go('module',id),id);assert.equal(await p.locator('[data-explanation-version] option[value="6"]').count(),0);assert.equal(await p.locator('.psyc-v6-prose').count(),0)}
  assert.equal(await p.evaluate(()=>state.explanationVersions[3]),'E');
  const audit=await p.evaluate(()=>{startQuiz('m2all');return {count:quiz.items.length,balance:validateSecondBalance(quiz.items,100),key:validateAnswerKey(quiz.items),correct:quiz.items[0].correct}});
  assert.equal(audit.count,100);assert(audit.balance&&audit.key);await p.locator('[data-answer="'+audit.correct+'"]').click();assert.match(await p.locator('.feedback').innerText(),/Correct/);
  const quizJSON=await p.evaluate(()=>JSON.stringify(quiz));await p.evaluate(()=>go('module',6));for(const v of ['A','2','6'])await p.selectOption(select,v);assert.equal(await p.evaluate(()=>JSON.stringify(quiz)),quizJSON);
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('psyc301-studio-v1')));assert.equal(saved.explanationVersions[6],'6');assert.equal(saved.personalNotes['9:17'],'Keep rotation.');assert.equal(saved.personalNotes['10:2'],'Keep problem solving.');assert(saved.read.includes('9:17'));assert(saved.essentialsDone.includes('m2-topic-11-2'));
  await p.reload();await p.evaluate(()=>go('module',6));assert.equal(await p.locator(select).inputValue(),'6');assert.equal(await p.locator('[data-personal-note="6:11"]').inputValue(),'My original sensory-memory note, still here.');
  for(const theme of ['dark','light'])for(const width of [1480,390]){
   await p.setViewportSize({width,height:1050});await p.evaluate(theme=>{applyTheme(theme);go('module',9);mode='expanded';teachIndex=2;render()},theme);
   await p.locator('.visual-pane img').evaluate(img=>img.decode());assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.locator('[data-reader-timer]').waitFor();
   if(entry==='/')await p.screenshot({path:'/tmp/psyc-v6-'+theme+'-'+width+'.png'});
   await p.locator('#exitExpanded').click();
  }
  assert.deepEqual(errors,[]);await context.close();console.log('PASS '+entry+': 148 source slides, all V6 transcripts, old choices preserved, original/read/expanded views, saved notes/read marks, unchanged archive, source/math/speech, current quizzes and balance, desktop/mobile themes and timer.');
 }}finally{await browser.close();await new Promise(r=>host.close(r))}
});
