// Serve the repo root on port 8907, then run node bme423/tests/note-sheet.cjs.
const{chromium}=require('playwright');const assert=require('node:assert/strict'),path=require('node:path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1200,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/bme423/notes-v2.html');await p.emulateMedia({media:'print'});await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>fitNotesMath());
 assert.equal(await p.locator('.sheet-v2').count(),4);assert.equal(await p.locator('.notes-column').count(),12);assert.equal(await p.locator('.note-source').count(),0);assert.equal(await p.locator('.katex-error').count(),0);
 const sizes=await p.locator('.sheet-v2').evaluateAll(ss=>ss.map(s=>({height:s.getBoundingClientRect().height,columns:[...s.querySelectorAll('.notes-column')].map(c=>c.lastElementChild.getBoundingClientRect().bottom-c.getBoundingClientRect().top),math:[...s.querySelectorAll('.math-display')].map(el=>({width:el.clientWidth,ink:el.querySelector('.katex-html').getBoundingClientRect().width,pt:parseFloat(getComputedStyle(el.querySelector('.katex')).fontSize)*.75}))})));
 for(const s of sizes){assert(s.height<=998.4,'content exceeds 10.4-inch print area');for(const c of s.columns)assert(c>870,'poor column utilization');for(const e of s.math){assert(e.ink<=e.width+1,'equation overflow');assert(e.pt>=7,'math smaller than 7pt')}}
 await p.pdf({path:path.resolve(__dirname,'..','BME423-four-page-notes-v2.pdf'),preferCSSPageSize:true,printBackground:true});
 await p.emulateMedia({media:'screen'});await p.goto('http://localhost:8907/bme423/');await p.evaluate(()=>go('sheets'));assert.equal(await p.locator('.sheet-v2').count(),4);assert.equal(await p.locator('.compact-block').count(),await p.evaluate(()=>SHEET_PACK.sheets.flatMap(s=>s.columns.flat()).length));await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 console.log('PASS: note-only preview and PDF, four pages, 12 well-filled columns, rendered math ≥7pt, no citations, mobile containment.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
