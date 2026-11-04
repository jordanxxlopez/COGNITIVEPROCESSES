// Serve repository root at http://localhost:8907. Does not rewrite PDFs.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1450,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:8907/bme423/');
  await page.evaluate(()=>{state.notes.keep='My existing study reminder';save()});
  await page.locator('[data-view="calculator"]').click();
  assert((await page.locator('h1').innerText()).includes('Calculator programs'));
  assert((await page.locator('#content').innerText()).includes('PRGM → EXEC'));
  assert.equal(await page.evaluate(()=>state.notes.keep),'My existing study reminder');
  const mainDownload=page.locator('a[download]').first();assert((await mainDownload.getAttribute('href')).endsWith('.zip'));
  await page.goto('http://localhost:8907/bme423/ti84/');
  await page.waitForFunction(()=>document.querySelectorAll('[data-program]').length===37);
  assert((await page.locator('#lcd').innerText()).includes('2.5863'));
  assert((await page.locator('#lcd').innerText()).includes('T=(MEAN-REF)/SE'));
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'ti84/manifest.json'),'utf8'));
  for(const p of manifest.programs){
   const response=await page.request.get('http://localhost:8907/bme423/ti84/'+p.download);
   assert.equal(response.status(),200,p.name);
   assert.deepEqual(await response.body(),fs.readFileSync(path.join(root,'ti84',p.download)),p.name);
   if(p.name==='BME423')continue;
   await page.locator('#previewSelect').selectOption(p.name);
   assert((await page.locator('#lcd').innerText()).trim(),p.name);
   assert.equal((await page.locator('#lcd').textContent()).split('\n').length,10);
   assert(await page.locator('#prev').isDisabled());
   const count=Number((await page.locator('#pageCount').innerText()).split('/')[1]);
   for(let i=1;i<count;i++)await page.locator('#next').click();
   assert(await page.locator('#next').isDisabled());
  }
  await page.locator('#search').fill('Yates');
  assert(await page.locator('[data-program="BMZ"]').count());
  assert(await page.locator('[data-program="BMCHI2"]').count());
  await page.locator('#search').fill('');await page.locator('[data-category="Mean tests"]').click();
  assert.equal(await page.locator('[data-program]').count(),4);
  await page.locator('[data-preview="BMONE"]').click();
  assert.equal(await page.locator('#previewSelect').inputValue(),'BMONE');
  const downloadPromise=page.waitForEvent('download');
  await page.locator('a[download]').first().click();const download=await downloadPromise;
  assert.equal(download.suggestedFilename(),'BME423_TI84_CE_PYTHON.zip');
  assert.equal(await download.failure(),null);
  await page.evaluate(()=>{localStorage.setItem('bme423-studio-v1',JSON.stringify({theme:'dark',notes:{keep:'My existing study reminder'}}))});
  await page.reload();await page.waitForFunction(()=>document.querySelectorAll('[data-program]').length===37);
  assert.equal(await page.locator('html').getAttribute('data-mode'),'dark');
  await page.screenshot({path:'/tmp/bme-ti84-desktop.png',fullPage:false});
  await page.setViewportSize({width:390,height:844});
  await page.locator('#example').scrollIntoViewIfNeeded();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile page overflow');
  await page.screenshot({path:'/tmp/bme-ti84-mobile.png',fullPage:false});
  assert.deepEqual(errors,[]);
  console.log('PASS: Study Studio calculator route and saved notes; all 37 program downloads; all 36 calculation previews and screen navigation; method filtering, ZIP download, dark mode, CE example and mobile layout.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
