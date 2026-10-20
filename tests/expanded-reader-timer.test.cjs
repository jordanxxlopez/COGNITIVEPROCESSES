'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.woff2':'font/woff2'};
function serve(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.stat(file,(error,stat)=>{if(error||!stat.isFile()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});});}
const courses=[
 {name:'PSYC301',url:'/',start:'#timerGo',pause:'#timerGo',reset:'#timerReset',break:'#breakGo',next:'#nextTeach',larger:'[data-font="1"]',close:'#exitExpanded',toolbar:'.expanded-preview .teachcontrols',
  open:async p=>{await p.locator('[data-module="6"]').first().click();await p.locator('[data-mode="expanded"]').click();}},
 {name:'LING406',url:'/ling406/?view=collection&lecture=speech1',start:'#timerStart',reset:'#timerReset',break:'#timerBreak',next:'[data-action="next"]',larger:'[data-action="larger"]',close:'[data-action="readerClose"]',toolbar:'.expanded-toolbar .reader-controls',
  open:async p=>{const button=p.locator('[data-reader="lecture"]').filter({hasText:'Expand'});if(!await button.count())await p.locator('[data-lecture="speech1"]').first().click();await p.locator('[data-reader="lecture"]').filter({hasText:'Expand'}).click();}},
 {name:'LING285',url:'/ling285/?view=collection&module=module2&lecture=lecture11',start:'#timerStart',reset:'#timerReset',break:'#timerBreak',next:'[data-action="readerNext"]',larger:'[data-action="larger"]',close:'[data-action="closeReader"]',toolbar:'#readerDialog[open] .reader-controls',
  open:async p=>{await p.locator('[data-reader="lecture"][data-expanded="true"]').click();}},
 {name:'BME423',url:'/bme423/',start:'#timerStart',reset:'#timerReset',break:'#timerBreak',next:'#nextSlide',larger:'[data-font="1"]',close:'#exitViewer',toolbar:'.viewer-controls',
  open:async p=>{await p.locator('#moduleNav [data-module]').first().click();await p.locator('[data-module-view="expanded"]').click();}}
];
test('each course retains its live timer through expanded reading, rerenders, breaks and close',{timeout:180000},async()=>{
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  for(const c of courses){
   const context=await browser.newContext({viewport:{width:1440,height:1050}}),page=await context.newPage();page.setDefaultTimeout(15000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.clock.install();
   console.log('Checking '+c.name);await page.goto(base+c.url,{waitUntil:'load'});await page.locator('#duration').waitFor();
   const seconds=async()=>page.locator('#clock').textContent().then(t=>{const [m,s]=t.split(':').map(Number);return m*60+s;});
   const unchangedNode=async()=>assert(await page.evaluate(()=>window.__timerNodeForTest===document.getElementById('duration').closest('.timer')),'The original timer was replaced in '+c.name);
   assert.deepEqual(await page.locator('#duration option').evaluateAll(opts=>opts.map(o=>o.value)),['30','60','90']);
   await page.evaluate(()=>window.__timerNodeForTest=document.getElementById('duration').closest('.timer'));
   await page.locator('#duration').selectOption('30');assert.equal(await seconds(),1800);await page.locator(c.start).click();assert.equal(await page.locator(c.start).innerText(),'Pause');
   await c.open(page);await page.locator(c.toolbar+' [data-reader-timer]').waitFor({state:'visible'});await unchangedNode();assert.equal(await page.locator('#clock').count(),1);assert.equal(await page.locator('#duration').count(),1);
   let before=await seconds();await page.clock.runFor(2100);let after=await seconds();assert(after<before&&before-after<=3,'Countdown stopped on opening '+c.name);
   await page.locator(c.start).click();const paused=await seconds();await page.clock.runFor(2100);assert.equal(await seconds(),paused);
   await page.locator(c.toolbar).locator(c.larger).click();await page.locator(c.toolbar+' [data-reader-timer]').waitFor({state:'visible'});await unchangedNode();assert.equal(await seconds(),paused);
   await page.locator(c.toolbar).locator(c.next).click();await page.locator(c.toolbar+' [data-reader-timer]').waitFor({state:'visible'});await unchangedNode();assert.equal(await seconds(),paused);
   for(const n of ['60','90','30']){await page.locator('#duration').selectOption(n);assert.equal(await seconds(),Number(n)*60);}
   await page.locator('#duration').selectOption('90');await page.locator(c.start).click();await page.clock.runFor(2100);before=await seconds();
   await page.locator(c.close).click();await page.locator('.topbar #duration').waitFor({state:'visible'});assert.equal(await page.locator('[data-reader-timer]').count(),0);await unchangedNode();assert.equal(await page.locator('#duration').inputValue(),'90');assert(Math.abs((await seconds())-before)<=1);
   before=await seconds();await page.clock.runFor(2100);after=await seconds();assert(after<before,'Countdown stopped on closing '+c.name);
   await c.open(page);await page.locator(c.toolbar+' [data-reader-timer]').waitFor({state:'visible'});await page.locator(c.break).click();assert.match(await page.locator('#timerMode, #timerLabel').textContent(),/Break/);assert((await seconds())<=600);
   await page.locator(c.reset).click();assert.equal(await seconds(),5400);assert.equal(await page.locator('#timerMode, #timerLabel').textContent(),'Study');assert.equal(await page.locator(c.start).innerText(),'Start');
   await page.screenshot({path:'/tmp/'+c.name.toLowerCase()+'-expanded-timer-desktop.png'});await page.setViewportSize({width:390,height:844});
   const extent=await page.locator(c.toolbar).evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,timer:el.querySelector('[data-reader-timer]').getBoundingClientRect().width,viewport:innerWidth}));assert(extent.scroll<=extent.width+1,JSON.stringify({course:c.name,...extent}));assert(extent.timer<=extent.viewport);
   assert(await page.locator('#duration').isVisible());assert(await page.locator(c.start).isVisible());await page.screenshot({path:'/tmp/'+c.name.toLowerCase()+'-expanded-timer-mobile.png'});
   assert.deepEqual(errors,[],c.name);await context.close();
  }
  // The alternate PSYC301 entry page uses the same widget and menu values.
  const alternate=fs.readFileSync(path.join(root,'share.html'),'utf8');assert.match(alternate,/reader-timer\.js/);assert.match(alternate,/reader-timer\.css/);assert.match(alternate,/<option value="30"/);
 }finally{await browser.close();await new Promise(r=>server.close(r));}
});
