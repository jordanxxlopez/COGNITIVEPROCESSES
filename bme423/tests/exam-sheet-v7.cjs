// Serve repo root on :8907. Export ONLY V7, never an earlier PDF.
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:8907/bme423/notes-v7.html');
  await p.emulateMedia({media:'print'});await p.evaluate(()=>document.fonts.ready);
  assert.equal(await p.locator('.v7-page').count(),4);
  assert.equal(await p.locator('.v7-column').count(),12);
  assert.equal(await p.locator('.v7-box').count(),39);
  assert.equal(await p.locator('.katex-display').count(),382);
  assert.equal(await p.locator('.katex-error').count(),0);
  assert.equal(await p.locator('#v7-chi2 .v7-step').count(),4);
  assert(await p.locator('#v7-normal').evaluate(e=>e.innerText.includes('complete z / LEFT-area pairs')&&!e.innerText.includes('row 1.1')));
  assert(await p.locator('#v7-holm-t').evaluate(e=>e.innerText.includes('STOP')&&e.innerText.includes('without further tests')));
  assert(await p.locator('#v7-bonferroni').evaluate(e=>e.innerText.includes('next column')));
  assert.equal(await p.locator('.aov-output').count(),1);
  const audit=await p.evaluate(()=>{
   const problems=[],geometry=[];
   for(const s of document.querySelectorAll('.v7-page')){
    const page=s.getBoundingClientRect(),cols=[];
    for(const c of s.querySelectorAll('.v7-column')){
     const bounds=c.getBoundingClientRect(),end=c.lastElementChild.getBoundingClientRect();
     cols.push({column:+c.dataset.column,height:end.bottom-page.top,bodyPt:parseFloat(getComputedStyle(c).getPropertyValue('--body-size'))});
     for(const box of c.children){
      const r=box.getBoundingClientRect();
      if(r.left<page.left-.1||r.right>page.right+.1||r.top<page.top-.1||r.bottom>page.top+998.4+.1)problems.push('page clipping '+box.id);
      const record=V7_PACK.blocks[box.dataset.key];
      if(record.page!==+s.dataset.page||record.column!==+c.dataset.column)problems.push('coverage location '+box.id);
     }
     if(end.bottom-page.top<998.4*.98)problems.push('column less than 98% full');
     if(bounds.width<=0)problems.push('zero-width column');
    }
    geometry.push({page:+s.dataset.page,width:page.width,height:page.height,columns:cols});
   }
   for(const e of document.querySelectorAll('.v7-math')){
    if(e.querySelector('.katex-html').getBoundingClientRect().width>e.getBoundingClientRect().width+.5)problems.push('wide math '+e.closest('section').id);
   }
   for(const e of document.querySelectorAll('.v7-box p,.v7-box h4,.v7-math,.v7-box table,.v7-box pre')){
    if(parseFloat(getComputedStyle(e).fontSize)*.75<6.099)problems.push('small base font');
   }
   for(const e of document.querySelectorAll('.v7-box pre'))if(e.scrollWidth>e.clientWidth+1)problems.push('wide output');
   if(/\\\[|\\\(|\$\$|EXAM-TIME PROTOCOL|WHAT IS THIS QUESTION|P\d·C\d·B/.test(document.querySelector('#notes').innerText))problems.push('raw math or removed filler');
   return {problems,geometry};
  });
  assert.deepEqual(audit.problems,[]);
  for(const page of audit.geometry){assert(Math.abs(page.width-758.4)<.1);assert(page.height<=998.4);}
  assert(await p.locator('.v7-plot').evaluateAll(es=>es.length===3&&es.every(e=>e.complete&&e.naturalWidth>0&&e.getBoundingClientRect().height>=90)));
  assert.deepEqual(errors,[]);
  await p.pdf({path:path.resolve(__dirname,'..','BME423-four-page-notes-v7.pdf'),preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});
  fs.writeFileSync('/tmp/bme-v7-print-geometry.json',JSON.stringify(audit.geometry,null,2));
  await p.emulateMedia({media:'screen'});
  await p.goto('http://localhost:8907/bme423/');await p.evaluate(()=>go('sheets'));
  for(const v of [3,4,5,6,7]){
   assert.equal(await p.locator(`a[href*="BME423-four-page-notes-v${v}.pdf"]`).count(),1);
   assert.equal(await p.locator(`a[href*="notes-v${v}.html"]`).count(),1);
  }
  assert.equal(await p.locator('.sheet-follow').count(),4,'earlier workspace preview preserved');
  await p.setViewportSize({width:390,height:844});
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile containment');
  assert.deepEqual(errors,[]);
  console.log('PASS: V7 exported; 4 Letter pages, 0.3-inch margins, 39 sections, 382 display equations, 3 graphs, all 12 columns at least 98% full, no clipping/raw math; V3–V7 download links and mobile workspace checked.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
