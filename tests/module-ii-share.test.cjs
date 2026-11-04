'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
test('friend link provides only Module II teaching and tools with independent progress', {timeout:180000}, async()=>{
 const root=path.resolve(__dirname,'..');
 const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}fs.readFile(file,(err,body)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream');res.end(body)})});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('psyc301-studio-v1',JSON.stringify({personalNotes:{'6:2':'Owner note'},missed:[3001],explanationVersions:{6:'2'}})));
  const base='http://127.0.0.1:'+server.address().port;
  await page.goto(base+'/share.html?module=ii');
  assert.equal(await page.title(),'PSYC301 · Module II · Study Studio');
  assert.equal(await page.locator('[data-course-select],#examOneArchive,[data-explanation-version]').count(),0);
  assert.equal(await page.locator('#workspaceNav [data-view^="m2"]').count(),8);
  assert.equal(await page.locator('#moduleNav [data-module]').count(),5);
  assert.equal(await page.evaluate(()=>state.personalNotes['6:2']),undefined);
  assert.equal(await page.evaluate(()=>state.missed.length),0);
  assert.deepEqual(await page.evaluate(()=>M.map(m=>m.id)),[6,9,10,11,12]);
  for(const tool of ['m2guide','m2core','m2experiments','m2combined','m2test','m2lectures','m2missed','m2sources']){
   await page.click('[data-view="'+tool+'"]');
   assert((await page.locator('#content h1').count())>0,tool);
   assert(!/Version \d+|Exam 1 archive/i.test(await page.locator('body').innerText()),tool);
   assert.equal(await page.locator('[data-explanation-version]').count(),0);
  }
  await page.click('[data-view="m2test"]');await page.click('[data-start="m2all"]');
  assert.equal(await page.evaluate(()=>quiz.items.length),100);
  assert.deepEqual(await page.evaluate(()=>secondHalf.modules.map(id=>quiz.items.filter(q=>q.module===id).length)),[20,20,20,20,20]);
  await page.click('#revealAnswer');await page.click('#uncertain');
  await page.click('[data-view="m2missed"]');assert.equal(await page.evaluate(()=>state.missed.length),1);
  for(const id of [6,9,10,11,12]){
   await page.click('[data-module="'+id+'"]');
   assert.equal(await page.evaluate(id=>state.explanationVersions[id],id),'18');
   assert.equal(await page.locator('#content .section').count(),await page.evaluate(id=>moduleBy(id).sections.length,id));
   const first=await page.locator('#content .section').filter({has:page.locator('.psyc-v6-prose')}).first();
   assert(await first.count());
  }
  await page.click('[data-module="6"]');
  await page.locator('#s-6-2 > summary').click();
  const note=page.locator('[data-personal-note="6:2"]');await note.fill('Friend note');await note.dispatchEvent('input');
  await page.reload();assert.equal(await page.evaluate(()=>state.personalNotes['6:2']),'Friend note');
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('psyc301-studio-v1')).personalNotes['6:2']),'Owner note');
  await page.click('[data-view="m2core"]');await page.click('[data-second-core-expand]');
  assert(await page.locator('#spoken .psyc-v6-prose').count());
  assert(!/Version \d+/.test(await page.locator('body').innerText()));
  await page.goto(base+'/share.html');
  assert(await page.locator('#examOneArchive').count());assert.equal(await page.evaluate(()=>KEY),'psyc301-studio-v1');
  assert.equal(await page.evaluate(()=>state.personalNotes['6:2']),'Owner note');
  assert.deepEqual(errors,[]);
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r))}
});
