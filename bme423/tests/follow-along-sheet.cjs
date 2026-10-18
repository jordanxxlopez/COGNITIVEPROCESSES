// Serve the repository root on port 8907. Generates only the new Version 3 PDF.
const{chromium}=require('playwright');const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1200,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/bme423/notes-v3.html');await p.emulateMedia({media:'print'});await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>fitNotesMath());
 assert.equal(await p.locator('.sheet-follow').count(),4);assert.equal(await p.locator('.notes-column').count(),12);assert.equal(await p.locator('.compact-block').count(),44);assert.equal(await p.locator('.katex-error').count(),0);
 assert.equal(await p.locator('.sheet-formula').count(),77);
 assert.equal(await p.locator('.sheet-follow>header').count(),0,'no full-width page header');
 assert.equal(await p.locator('.sheet-follow .notes-column:first-child>.sheet-follow-header').count(),4);
 const placement=await p.locator('.sheet-formula').evaluateAll(fs=>fs.every(f=>{let next=f.nextElementSibling;while(next?.classList.contains('sheet-formula'))next=next.nextElementSibling;return f.querySelector('.katex')&&next?.classList.contains('math-display')}));assert(placement,'each added equation immediately precedes its worked display');
 const geometry=await p.locator('.sheet-follow').evaluateAll(ss=>ss.map(s=>({height:s.getBoundingClientRect().height,width:s.getBoundingClientRect().width,columns:[...s.querySelectorAll('.notes-column')].map(c=>c.lastElementChild.getBoundingClientRect().bottom-c.getBoundingClientRect().top),body:[...s.querySelectorAll('.compact-block p')].map(e=>parseFloat(getComputedStyle(e).fontSize)*.75),math:[...s.querySelectorAll('.math-display')].map(e=>({w:e.clientWidth,ink:e.querySelector('.katex-html').getBoundingClientRect().width,pt:parseFloat(getComputedStyle(e.querySelector('.katex')).fontSize)*.75}))})));
 for(const s of geometry){assert(s.height<=998.4,'four-page overflow: '+s.height);assert(Math.abs(s.width-758.4)<.1,'0.3in side margins');for(const c of s.columns)assert(c>800&&c<=998.4,'column utilization/bounds: '+c);for(const pt of s.body)assert(pt>=6.49&&pt<=7.01,'body between 6.5 and 7pt');for(const m of s.math){assert(m.ink<=m.w+1,'equation overflow');assert(m.pt>=6.5,'base math below 6.5pt')}}
 await p.pdf({path:path.resolve(__dirname,'..','BME423-four-page-notes-v3.pdf'),preferCSSPageSize:true,printBackground:true});
 fs.writeFileSync('/tmp/bme-follow-print-geometry.json',JSON.stringify(geometry,null,2));
 await p.emulateMedia({media:'screen'});await p.goto('http://localhost:8907/bme423/');await p.evaluate(()=>go('sheets'));
 assert.equal(await p.locator('.sheet-follow').count(),4);assert.equal(await p.locator('a[href*="BME423-four-page-notes-v3.pdf"]').count(),1);assert.equal(await p.locator('a[href="notes-v2.html"]').count(),1);
 await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile preview containment');
 // Old print view stays on the old pack and its dimensions.
 await p.goto('http://localhost:8907/bme423/notes-v2.html');assert.equal(await p.locator('.sheet-v2').count(),4);assert.equal(await p.locator('.compact-block').count(),49);assert.equal(await p.locator('.sheet-follow').count(),0);
 assert.deepEqual(errors,[]);console.log('PASS: four V3 letter sides, 0.3in margins, column-1 headers, 12 filled columns, all 44 method blocks and 77 equations before their worked substitutions; 6.5–7pt body and base math >=6.5pt, no clipping, app preview/download, mobile containment, V2 preserved. PDF generated.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
