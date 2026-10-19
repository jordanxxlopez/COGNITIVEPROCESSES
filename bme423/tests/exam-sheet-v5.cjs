// Serve the repository root on port 8907. Exports ONLY the separate V5 PDF.
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const p=await browser.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:8907/bme423/notes-v5.html');
  await p.emulateMedia({media:'print'});await p.evaluate(()=>document.fonts.ready);
  assert.equal(await p.locator('.v5-page').count(),4);
  assert.equal(await p.locator('.v5-column').count(),12);
  assert.equal(await p.locator('.v5-box').count(),42);
  assert.equal(await p.locator('.v5-router').count(),0);
  assert(!await p.locator('#notes').evaluate(e=>/START|WHAT IS THIS QUESTION|P\d·C\d·B\d|page·column·box|EXAM-TIME PROTOCOL|90 minutes|Final check:/.test(e.innerText)),'removed index, navigation codes and exam protocol');
  assert.equal(await p.locator('#v5-protocol').count(),0);
  assert.equal(await p.locator('#v5-folate-risk .katex-display').count(),4);
  assert.equal(await p.locator('.katex-error').count(),0);
  assert(!await p.locator('#notes').evaluate(e=>/\{\{|\\\[|\\\(|\$\$/.test(e.innerText)),'unrendered expression');
  const audit=await p.evaluate(()=>{
   const problems=[],boxKeys=new Set(Object.keys(V5_PACK.blocks));
   const position=new Map();
   for(const [pi,s] of V5_PACK.sheets.entries()){
    s.columns.forEach((keys,ci)=>keys.forEach((key,bi)=>position.set(key,`P${pi+1}·C${ci+1}·B${bi+1}`)));
    for(const cell of s.bottom||[])cell.keys.forEach((key,bi)=>position.set(key,`P${pi+1}·C${cell.column}·B${s.columns[cell.column-1].length+bi+1}`));
   }
   const routes=[...document.querySelectorAll('.method-reference')];
   for(const a of routes){
    const key=a.dataset.target,target=document.querySelector(a.getAttribute('href'));
    if(!target||!boxKeys.has(key)||!a.textContent.trim())problems.push('incorrect named reference '+key);
   }
   for(const key of boxKeys){
    const box=document.querySelector('#v5-'+key),loc=V5_PACK.blocks[key].location;
    if(box.dataset.code!==position.get(key)||Number(box.closest('.v5-page').dataset.page)!==loc.page||Number(box.parentElement.dataset.column)!==loc.column)problems.push('incorrect box '+key);
   }
   for(const e of document.querySelectorAll('.v5-box p,.v5-box li,.r-print,.v5-box h3'))if(parseFloat(getComputedStyle(e).fontSize)*.75<6.999)problems.push('small body text');
   for(const e of document.querySelectorAll('.v5-math')){
    const ink=e.querySelector('.katex-html');
    if(ink.getBoundingClientRect().width>e.getBoundingClientRect().width+.5)problems.push('wide equation '+e.closest('.v5-box').dataset.key);
    if(parseFloat(getComputedStyle(e).fontSize)*.75<6.999)problems.push('small base equation');
   }
   for(const col of document.querySelectorAll('.v5-column')){
    const boxes=[...col.children];
    for(let i=1;i<boxes.length;i++)if(boxes[i].getBoundingClientRect().top<boxes[i-1].getBoundingClientRect().bottom-.1)problems.push('overlapping boxes');
   }
   for(const pre of document.querySelectorAll('.r-print'))if(pre.scrollWidth>pre.clientWidth+1)problems.push('wide R output');
   const geometry=[...document.querySelectorAll('.v5-page')].map(s=>{
    const r=s.getBoundingClientRect(),bottom=s.querySelector('.v5-bottom');
    const columns=[...s.querySelectorAll('.v5-column')].map(c=>{
     const last=c.lastElementChild.getBoundingClientRect();
     return {column:Number(c.dataset.column),used:last.bottom-r.top,own:last.bottom-c.getBoundingClientRect().top};
    });
    for(const box of s.querySelectorAll('.v5-box')){
     const q=box.getBoundingClientRect();
     if(q.left<r.left-.1||q.right>r.right+.1||q.bottom>r.top+998.4+.1)problems.push('outside page '+box.dataset.key);
    }
    return {page:Number(s.dataset.page),height:r.height,width:r.width,bottom:bottom?.getBoundingClientRect().height,columns};
   });
   return {problems,geometry};
  });
  assert.deepEqual(audit.problems,[]);
  for(const g of audit.geometry){
   assert(g.height<=998.4,'page overflow '+g.page+': '+g.height);
   assert(Math.abs(g.width-758.4)<.1,'side margins');
   for(const c of g.columns){
    const used=g.page===3&&c.column<3?c.used+(g.bottom||0):c.used;
    assert(used>958,'column uses less than 96% of printable height: '+JSON.stringify({g,c}));
   }
  }
  assert(await p.locator('.v5-plot').evaluateAll(es=>es.length===3&&es.every(e=>e.complete&&e.naturalWidth>0&&e.getBoundingClientRect().height>=100)));
  assert(await p.locator('.v5-box').evaluateAll(es=>es.every(e=>e.querySelector('.katex')||['data','design'].includes(e.dataset.key))),'mathematical methods include rendered formulas');
  assert.equal(await p.locator('.v5-bottom .aov-print').count(),1);
  assert(await p.locator('.aov-print').evaluate(e=>e.getBoundingClientRect().width>480),'real ANOVA table has two-column room');
  const placements=JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','exam-sheet-v5-placements.json'),'utf8'));
  for(const [key,record] of Object.entries(placements.placements)){
   for(const item of record.steps||[]){
    const host=p.locator('#v5-'+key+' [data-origin=\"'+item.origin+'\"]');
    assert.equal(await host.count(),1,key+': origin '+item.origin);
    const tex=await host.evaluate(e=>[...e.closest('.v5-step').querySelectorAll('annotation')].map(a=>a.textContent));
    for(const equation of item.after)assert(tex.includes(equation),key+': equation belongs to its worked step');
   }
  }
  assert(!await p.locator('#notes').evaluate(e=>/FORMULA|NUMBERED WORKED STEPS/.test(e.innerText)));
  assert.equal(await p.locator('#v5-summary .v5-step[data-origin=\"4\"] annotation').textContent(),'s=\\sqrt{s^2}=\\sqrt{9.16667}=3.02765');
  assert.deepEqual(errors,[]);
  const output=path.resolve(__dirname,'..','BME423-four-page-notes-v5.pdf');
  await p.pdf({path:output,preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});
  fs.writeFileSync('/tmp/bme-v5-print-geometry.json',JSON.stringify(audit.geometry,null,2));
  await p.emulateMedia({media:'screen'});
  await p.goto('http://localhost:8907/bme423/');await p.evaluate(()=>go('sheets'));
  assert.equal(await p.locator('a[href*="BME423-four-page-notes-v5.pdf"]').count(),1);
  assert.equal(await p.locator('a[href*="notes-v5.html"]').count(),1);
  assert.equal(await p.locator('a[href*="BME423-four-page-notes-v4.pdf"]').count(),1);
  assert.equal(await p.locator('a[href*="notes-v4.html"]').count(),1);
  assert.equal(await p.locator('a[href*="BME423-four-page-notes-v3.pdf"]').count(),1);
  assert.equal(await p.locator('.sheet-follow').count(),4,'V3 workspace preview preserved');
  assert.equal(await p.locator('a[href="notes-v2.html"]').count(),1);
  await p.setViewportSize({width:390,height:844});
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile app containment');
  assert.deepEqual(errors,[]);
  console.log('PASS: 4 Letter pages; 42 named sections; no START index or printed navigation codes; 7pt minimum body/base math; every column at least 96% filled; graphs/R output loaded; no math overflow, overlapping boxes or page clipping. Exported only V5.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
