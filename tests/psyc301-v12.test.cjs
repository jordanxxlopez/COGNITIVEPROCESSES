'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'psyc301-v12-data.js'),'utf8'),c);const V=JSON.parse(JSON.stringify(c.window.PSYC301_V12));
const bare=t=>t.replace(/\*\*/g,'').replace(/\\\[[\s\S]*?\\\]/g,'[equation]').replace(/\s+/g,' ').trim();
async function displayed(locator){return locator.evaluateAll(es=>es.map(el=>{const copy=el.cloneNode(true);copy.querySelectorAll('.katex').forEach(k=>k.replaceWith(document.createTextNode('[equation]')));return copy.textContent.replace(/\s+/g,' ').trim()}))}
test('Version 12 adds only authored Module II notes and its own assets',()=>{
 execFileSync('python3',['authoring/psyc301/version12/verify.py'],{cwd:root,stdio:'pipe'});
 assert.equal(Object.keys(V.scripts).length,148);assert.deepEqual(Array.from(V.scope),[6,9,10,11,12]);
});
function serve(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.stat(file,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);return res.end()}res.writeHead(200,{'Content-Type':{'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.woff2':'font/woff2'}[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)})})}
test('both PSYC301 entries render every V12 page beside the earlier editions',{timeout:300000},async()=>{
 const host=serve();await new Promise(r=>host.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+host.address().port;
 const browser=await chromium.launch(fs.existsSync('/usr/bin/chromium')?{executablePath:'/usr/bin/chromium',args:['--no-sandbox']}:{args:['--no-sandbox']});
 try{for(const entry of ['/','/share.html']){
  const context=await browser.newContext({viewport:{width:1480,height:1100}});
  await context.addInitScript(()=>{if(!localStorage.getItem('psyc301-studio-v1'))localStorage.setItem('psyc301-studio-v1',JSON.stringify({explanationVersions:{6:'2',9:'6'},read:['6:11'],personalNotes:{'6:11':'Keep sensory memory.'}}));
   window.spoken=[];Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},speak(s){window.spoken.push(s.text)}}});window.SpeechSynthesisUtterance=function(t){this.text=t}});
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+entry);
  // Saved choices are kept until the person picks Version 10.
  await p.evaluate(()=>go('module',6));assert.equal(await p.locator('[data-explanation-version="6"]').inputValue(),'2');
  await p.evaluate(()=>go('module',9));assert.equal(await p.locator('[data-explanation-version="9"]').inputValue(),'6');
  for(const id of V.scope){
   await p.evaluate(id=>go('module',id),id);const sel='[data-explanation-version="'+id+'"]';
   assert.equal(await p.locator(sel+' option[value="6"]').count(),1);assert.equal(await p.locator(sel+' option[value="10"]').count(),1);await p.selectOption(sel,'12');
   assert.equal(await p.evaluate(id=>state.explanationVersions[id],id),'12');
   const pages=await p.evaluate(id=>moduleBy(id).sections.map(s=>s.page),id);
   assert.deepEqual(pages,Array.from({length:pages.length},(_,i)=>i+1));
   const rows=p.locator('#content .section');assert.equal(await rows.count(),pages.length);
   for(let i=0;i<pages.length;i++){const blocks=V.scripts[id+':'+pages[i]];
    assert.deepEqual(await displayed(rows.nth(i).locator('.teaching .psyc-v6-prose')),blocks.flatMap(b=>[b.text,...b.children]).map(bare),id+':'+pages[i]);
    assert.equal(await rows.nth(i).locator('.psyc-v10-sub > li').count(),blocks.reduce((n,b)=>n+b.children.length,0));}
  }
  await p.evaluate(()=>go('module',9));await p.locator('[data-mode="expanded"]').click();await p.selectOption('#teachSelect','2');
  assert.equal(await p.locator('#spoken .katex-display').count(),3);assert.equal(await p.locator('#spoken .katex-error').count(),0);
  await p.locator('#speak').click();assert(!/\\frac|\\times|\\\[/.test(await p.evaluate(()=>window.spoken.at(-1))));
  await p.keyboard.press('Escape');
  await p.evaluate(()=>go('module',6));await p.selectOption('[data-explanation-version="6"]','2');assert.equal(await p.evaluate(()=>state.explanationVersions[6]),'2');
  await p.selectOption('[data-explanation-version="6"]','6');assert.equal(await p.evaluate(()=>state.explanationVersions[6]),'6');
  await p.reload();await p.evaluate(()=>go('module',10));assert.equal(await p.locator('[data-explanation-version="10"]').inputValue(),'12');
  assert.equal(await p.evaluate(()=>state.personalNotes['6:11']),'Keep sensory memory.');assert(await p.evaluate(()=>state.read.includes('6:11')));
  assert.deepEqual(errors,[]);await context.close();
 }}finally{await browser.close();host.close()}
});
