// Serve repository root on port 8907. Tests only; no PDF or program regeneration.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1400,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const base='http://localhost:8907/bme423/',root=path.resolve(__dirname,'../ti84/steps');
 await p.goto(base);await p.locator('[data-view="calculator"]').click();
 assert.equal(await p.locator('a[href="ti84/steps/"]').count(),1);
 await p.goto(base+'ti84/');assert.equal(await p.locator('a[href="steps/BMSTEPS.8xp"]').count(),1);
 await p.goto(base+'ti84/steps/');await p.waitForFunction(()=>document.querySelectorAll('#method option').length===36);
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json')));
 for(const g of manifest.guides){
  await p.locator('#method').selectOption(g.name);
  assert(await p.locator('#prev').isDisabled());
  assert((await p.locator('#route').innerText()).includes('BMSTEPS →'));
  for(let i=0;i<g.pages.length;i++){
   assert.equal(await p.locator('#lcd').textContent(),manifest.screens[g.pages[i]].rows.map(r=>r.padEnd(26)).join('\n'));
   if(i+1<g.pages.length)await p.locator('#next').click();
  }
  assert(await p.locator('#next').isDisabled());
 }
 const request=await p.request.get(base+'ti84/steps/BMSTEPS.8xp');assert.equal(request.status(),200);
 assert.deepEqual(await request.body(),fs.readFileSync(path.join(root,'BMSTEPS.8xp')));
 const pending=p.waitForEvent('download');await p.locator('a[download]').click();const d=await pending;
 assert.equal(d.suggestedFilename(),'BMSTEPS.8xp');assert.equal(await d.failure(),null);
 await p.goto(base+'ti84/steps/?method=BMONE');await p.waitForFunction(()=>document.querySelectorAll('#method option').length===36);
 await p.locator('#next').click();await p.locator('#next').click();
 assert((await p.locator('#lcd').innerText()).includes('SE=SD/SQRT(N)'));
 await p.screenshot({path:'/tmp/bmsteps-desktop.png',fullPage:false});
 await p.evaluate(()=>localStorage.setItem('bme423-studio-v1',JSON.stringify({theme:'dark',notes:{keep:'My reminder'}})));
 await p.reload();await p.waitForFunction(()=>document.querySelectorAll('#method option').length===36);
 assert.equal(await p.locator('html').getAttribute('data-mode'),'dark');
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('bme423-studio-v1')).notes.keep),'My reminder');
 await p.setViewportSize({width:390,height:844});await p.locator('#next').click();await p.locator('#next').click();await p.locator('#preview').scrollIntoViewIfNeeded();
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile overflow');
 await p.screenshot({path:'/tmp/bmsteps-mobile.png',fullPage:false});
 assert.deepEqual(errors,[]);
 console.log('PASS: all 36 guides and every preview screen, method routes, single .8xp byte-for-byte download, app links, native-screen preview, light/dark, saved state and mobile layout.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
