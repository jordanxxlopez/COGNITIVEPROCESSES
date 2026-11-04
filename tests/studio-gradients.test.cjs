'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright'),root=path.resolve(__dirname,'..');
const base='6da300343573480edb6515f33c26fd5a976fa075';
const entries={'index.html':'psyc301','share.html':'psyc301','bme423/index.html':'bme423','ling406/index.html':'ling406','ling285/index.html':'ling285'};
const old=f=>execFileSync('git',['show',base+':'+f],{cwd:root,encoding:'utf8',maxBuffer:50*1024*1024});
const link=(f,id)=>'<link rel="stylesheet" href="'+(f.includes('/')?'../':'')+'studio-gradients.css?v=studio-gradients-1" data-studio-gradient="'+id+'">';
test('all five entry pages add only the stylesheet; course content and application code stay exact',()=>{
 for(const [f,id]of Object.entries(entries)){
  let s=fs.readFileSync(path.join(root,f),'utf8');const tag=link(f,id);
  // LING406 Version 7 was authorized separately and is pinned by ling406/tests/verify_v7.py.
  // LING406 Version 10 and PSYC301 Version 10 were also authorized separately.
  if(f==='ling406/index.html')s=s.replace('<script src="transcripts-v18-data.js?v=ling406-transcripts-v18"></script>','').replace('app.js?v=ling406-transcripts-v18','app.js?v=ling406-transcripts-v16').replace('<option value="18" selected>Version 18 · teaching scripts</option>','').replace('<option value="16">Version 16 · natural teaching notes</option>','<option value="16" selected>Version 16 · natural teaching notes</option>');
  if(f==='ling406/index.html')s=s.replace('<script src="transcripts-v16-data.js?v=ling406-transcripts-v16"></script>','').replace('app.js?v=ling406-transcripts-v16','app.js?v=ling406-transcripts-v14').replace('<option value="16" selected>Version 16 · natural teaching notes</option>','').replace('<option value="14">Version 14 · balanced teaching notes</option>','<option value="14" selected>Version 14 · balanced teaching notes</option>');
  if(f==='ling406/index.html')s=s.replace('<script src="transcripts-v14-data.js?v=ling406-transcripts-v14"></script>','').replace('app.js?v=ling406-transcripts-v14','app.js?v=ling406-transcripts-v12').replace('<option value="14" selected>Version 14 · balanced teaching notes</option>','').replace('<option value="12">Version 12 · detailed teaching notes</option>','<option value="12" selected>Version 12 · detailed teaching notes</option>');
  if(f==='ling406/index.html')s=s.replace('<script src="transcripts-v12-data.js?v=ling406-transcripts-v12"></script>','').replace('app.js?v=ling406-transcripts-v12','app.js?v=ling406-transcripts-v10').replace('<option value="12" selected>Version 12 · detailed teaching notes</option>','').replace('<option value="10">Version 10 · direct teaching notes</option>','<option value="10" selected>Version 10 · direct teaching notes</option>');
  if(f==='ling406/index.html')s=s.replace('<script src="transcripts-v10-data.js?v=ling406-transcripts-v10"></script>','').replace('app.js?v=ling406-transcripts-v10','app.js?v=ling406-transcripts-v7').replace('<option value="10" selected>Version 10 · direct teaching notes</option>','').replace('<option value="7">Version 7 · teaching notes</option>','<option value="7" selected>Version 7 · teaching notes</option>');
  if(id==='psyc301')s=s.replace('<link rel="stylesheet" href="psyc301-v10.css?v=psyc301-module2-v10">','').replace('<script src="psyc301-v10-data.js?v=psyc301-module2-v10"></script>','').replace('<script src="psyc301-v10.js?v=psyc301-module2-v10"></script>','').replace('<script src="psyc301-v12-data.js?v=psyc301-module2-v12"></script>','').replace('<script src="psyc301-v12.js?v=psyc301-module2-v12"></script>','').replace('<script src="psyc301-v14-data.js?v=psyc301-module2-v14"></script>','').replace('<script src="psyc301-v14.js?v=psyc301-module2-v14"></script>','').replace('<script src="psyc301-v16-data.js?v=psyc301-module2-v16"></script>','').replace('<script src="psyc301-v16.js?v=psyc301-module2-v16"></script>','').replace('<script src="psyc301-v18-data.js?v=psyc301-module2-v18"></script>','').replace('<script src="psyc301-v18.js?v=psyc301-module2-v18"></script>','');
  if(f==='ling406/index.html')s=s.replace('<script src="transcripts-v7-data.js?v=ling406-transcripts-v7"></script>','').replace('app.js?v=ling406-transcripts-v7','app.js?v=ling406-transcripts-v6').replace('<option value="7" selected>Version 7 · teaching notes</option>','').replace('<option value="6">Version 6 · natural teaching</option>','<option value="6" selected>Version 6 · natural teaching</option>');
  assert.equal(s.split(tag).length,2,f);assert.equal(s.replace(tag,''),old(f),f);
 }
 const sw=fs.readFileSync(path.join(root,'ling406/sw.js'),'utf8').replace("const CACHE='ling406-transcripts-v18';","const CACHE='ling406-transcripts-v16';").replace("'transcripts-v18-data.js?v=ling406-transcripts-v18','app.js?v=ling406-transcripts-v18'","'app.js?v=ling406-transcripts-v16'").replace("const CACHE='ling406-transcripts-v16';","const CACHE='ling406-transcripts-v14';").replace("'transcripts-v16-data.js?v=ling406-transcripts-v16','app.js?v=ling406-transcripts-v16'","'app.js?v=ling406-transcripts-v14'").replace("const CACHE='ling406-transcripts-v14';","const CACHE='ling406-transcripts-v12';").replace("'transcripts-v14-data.js?v=ling406-transcripts-v14','app.js?v=ling406-transcripts-v14'","'app.js?v=ling406-transcripts-v12'").replace("const CACHE='ling406-transcripts-v12';","const CACHE='ling406-transcripts-v10';").replace("'transcripts-v12-data.js?v=ling406-transcripts-v12','app.js?v=ling406-transcripts-v12'","'app.js?v=ling406-transcripts-v10'").replace("const CACHE='ling406-transcripts-v10';","const CACHE='ling406-studio-gradients-1';").replace("'transcripts-v10-data.js?v=ling406-transcripts-v10','app.js?v=ling406-transcripts-v10'","'app.js?v=ling406-transcripts-v7'").replace("'transcripts-v7-data.js?v=ling406-transcripts-v7','app.js?v=ling406-transcripts-v7'","'app.js?v=ling406-transcripts-v6'");
 assert.equal(sw,old('ling406/sw.js').replace("const CACHE='ling406-transcripts-v6';","const CACHE='ling406-studio-gradients-1';").replace("const SHELL=['./',","const SHELL=['../studio-gradients.css?v=studio-gradients-1','./',"));
 const allowed=new Set([...Object.keys(entries),'ling406/sw.js','README.md','tests/psyc-transcript-preservation.cjs','tests/direct-teaching.test.cjs','authoring/psyc301/version6/verify.py','ling406/tests/verify_v6.py','ling406/app.js','ling406/README.md','ling406/tests/transcripts-v2.cjs','ling406/tests/transcripts-v3.cjs','ling406/tests/transcripts-v5.cjs','ling406/tests/transcripts-v6.cjs','ling406/tests/transcripts-v7.cjs','ling406/tests/transcripts-v10.cjs','tests/studio-gradients.test.cjs','ling406/tests/transcripts-v12.cjs','ling406/tests/transcripts-v14.cjs','ling406/tests/transcripts-v16.cjs']);
 // Check every previously tracked file, rather than sampling only a data bank.
 const tracked=new Set(execFileSync('git',['ls-tree','-r','--name-only',base],{cwd:root,encoding:'utf8',maxBuffer:5*1024*1024}).trim().split('\n'));
 const changed=execFileSync('git',['diff','--name-only',base],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
 for(const f of changed)if(tracked.has(f))assert(allowed.has(f),'Unexpected existing-file change: '+f);
});
function serve(){return http.createServer((req,res)=>{let n=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(n.startsWith('/COGNITIVEPROCESSES/'))n=n.slice('/COGNITIVEPROCESSES'.length);if(n.endsWith('/'))n+='index.html';const f=path.resolve(root,'.'+n);if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.stat(f,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);return res.end()}res.setHeader('Content-Type',{'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'}[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res)})})}
const courses=[
 {id:'psyc301',route:'',open:'#workspaceNav [data-module="6"]',summary:'.section>summary',theme:'[data-theme-choice]',reader:'.expanded .teachcontrols'},
 {id:'bme423',route:'bme423/',open:'#moduleNav [data-module="17"]',summary:'details.lesson>summary',theme:'.themes [data-theme]',reader:'.viewer-controls'},
 {id:'ling406',route:'ling406/',open:'#collectionNav [data-lecture="speech1"]',summary:'.note-section>summary',theme:'.themes [data-theme]',reader:'.expanded-toolbar'},
 {id:'ling285',route:'ling285/',open:'#collectionNav [data-collection="lecture11"]',summary:'.source-section>summary',theme:'[data-theme]',reader:'.reader-dialog .reader-controls'}
];
async function snapshot(p){return p.evaluate(()=>{
 const styles=e=>{const s=getComputedStyle(e);return e.tagName==='IMG'?{bg:s.backgroundColor,image:s.backgroundImage}:{ink:s.color,bg:s.backgroundColor,image:s.backgroundImage,font:s.font,lineHeight:s.lineHeight}};
 const boxes=[...document.querySelectorAll('#content h1,#content h2,#content .card,#content summary,#content img,.reader-controls,.viewer-controls,.teachcontrols')].map(e=>{const r=e.getBoundingClientRect();return [e.tagName,e.className,...[r.x,r.y,r.width,r.height].map(n=>Math.round(n*100)/100)]});
 return {text:document.querySelector('#content')?.textContent,boxes,media:[...document.querySelectorAll('#content img,.expanded img,.expanded-shell img,.reader-dialog img')].map(e=>[e.getAttribute('src'),e.getAttribute('alt'),e.naturalWidth,e.naturalHeight]),protected:[...document.querySelectorAll('.transcript-pane,.visual-pane,.section-transcript,.reader-transcript,.section-pair>.teaching,.viewer-pair .transcript,.sourcepic,img.slide,.source-figure img,.formula,.step,.option.correct,.option.wrong')].map(e=>[e.className,styles(e)]),storage:Object.fromEntries(Object.entries(localStorage))};
})}
async function sameMaterial(p){
 await p.evaluate(()=>{document.querySelector('[data-studio-gradient]').disabled=true});await p.waitForTimeout(200);await p.evaluate(()=>document.fonts.ready);const before=await snapshot(p);
 await p.evaluate(()=>{document.querySelector('[data-studio-gradient]').disabled=false});await p.waitForTimeout(200);const after=await snapshot(p);
 assert.deepEqual(after,before,'Only backgrounds and UI text colors may change; content, geometry, source images, reading panes, mathematics and progress stay identical');
}
function luminance(rgb){return rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)}
async function contrast(p){
 const samples=await p.evaluate(()=>{
  const samples=[];
  for(const e of document.querySelectorAll('aside *, .hero *, .module-hero *, .card *, .timer *, #content summary, .expanded-toolbar *, .viewer-controls *, .teachcontrols *, .reader-dialog .reader-controls *')){
   if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||!e.getClientRects().length)continue;
   let a=e;while(a){const s=getComputedStyle(a);if(s.backgroundImage!=='none'||!['rgba(0, 0, 0, 0)','transparent'].includes(s.backgroundColor))break;a=a.parentElement;}
   if(a&&getComputedStyle(a).backgroundImage.includes('gradient')){const s=getComputedStyle(e);samples.push({text:e.textContent.trim().slice(0,80),ink:s.color,bg:getComputedStyle(a).backgroundImage,size:parseFloat(s.fontSize),weight:parseInt(s.fontWeight)})}
  }return samples;
 });
 for(const s of samples){const fg=luminance(s.ink.match(/[\d.]+/g).slice(0,3).map(Number)),colors=[...s.bg.matchAll(/rgb\(([^)]+)\)/g)].map(m=>m[1].split(',').map(Number));
  const threshold=s.size>=24||(s.size>=18.66&&s.weight>=700)?3:4.5;
  for(const rgb of colors){const bg=luminance(rgb),ratio=(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);assert(ratio>=threshold,`${s.text}: contrast ${ratio.toFixed(2)} below ${threshold}; ink ${s.ink}; background ${s.bg}`)}
 }
 assert(samples.length>0);
}
test('light/dark gradients across all courses preserve layout, material, print and mobile behavior',{timeout:180000},async()=>{
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/COGNITIVEPROCESSES/';
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const errors=[];
 try{for(const c of [...courses,{...courses[0],route:'share.html'}]){
  const context=await browser.newContext({viewport:{width:1440,height:1050},serviceWorkers:'block'}),p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(url+c.route);await p.getByLabel('Switch course',{exact:true}).waitFor();await p.evaluate(()=>document.fonts.ready);
  const rules=await p.evaluate(()=>{const sheet=[...document.styleSheets].find(s=>s.href?.includes('studio-gradients.css'));return [...sheet.cssRules].filter(r=>r.type!==CSSRule.COMMENT_RULE).map(r=>({condition:r.conditionText,properties:[...r.cssRules].flatMap(rule=>[...rule.style])}))});
  assert.equal(rules.length,1);assert.equal(rules[0].condition,'screen');assert(rules[0].properties.every(n=>n.startsWith('--studio-pop-')||['--muted','background-image','background-attachment','color'].includes(n)));
  for(const mode of ['light','dark']){
   await p.locator(c.theme+'[data-theme'+(c.id==='psyc301'?'-choice':'')+'="'+mode+'"]').first().click();await p.waitForTimeout(250);
   for(const sel of ['body','aside','.hero,.module-hero','.timer'])assert((await p.locator(sel).first().evaluate(e=>getComputedStyle(e).backgroundImage)).includes('gradient'),c.id+' '+mode+' '+sel);
   await sameMaterial(p);await contrast(p);
  }
  await p.locator(c.open).click();await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
  for(const mode of ['light','dark']){
   await p.locator(c.theme+'[data-theme'+(c.id==='psyc301'?'-choice':'')+'="'+mode+'"]').first().click();await p.waitForTimeout(250);
   assert((await p.locator(c.summary).first().evaluate(e=>getComputedStyle(e).backgroundImage)).includes('gradient'));await sameMaterial(p);await contrast(p);
   await p.setViewportSize({width:390,height:844});await sameMaterial(p);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),c.id+' mobile overflow');await p.setViewportSize({width:1440,height:1050});
  }
  if(c.id==='psyc301')await p.locator('[data-mode="expanded"]').click();else await p.getByRole('button',{name:/^Expand visual \+/}).first().click();await p.locator(c.reader).first().waitFor();await p.waitForLoadState('networkidle');
  for(const mode of ['light','dark']){
   await p.evaluate(({id,mode})=>document.documentElement.setAttribute(id==='bme423'?'data-mode':'data-theme',mode),{id:c.id,mode});await p.waitForTimeout(250);
   await sameMaterial(p);await contrast(p);assert((await p.locator(c.reader).first().evaluate(e=>getComputedStyle(e).backgroundImage)).includes('gradient'));
   if(c.route!=='share.html')await p.screenshot({path:'/tmp/studio-gradients-'+c.id+'-'+mode+'-reader.png'});
   await p.setViewportSize({width:390,height:844});await sameMaterial(p);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),c.id+' expanded mobile overflow');await p.setViewportSize({width:1440,height:1050});
  }
  await p.emulateMedia({media:'print'});await p.waitForTimeout(200);const print=await p.evaluate(()=>[...document.querySelectorAll('body,aside,.hero,.module-hero,.card,summary')].map(e=>[getComputedStyle(e).backgroundImage,getComputedStyle(e).backgroundColor,getComputedStyle(e).color]));await p.evaluate(()=>document.querySelector('[data-studio-gradient]').disabled=true);await p.waitForTimeout(200);assert.deepEqual(await p.evaluate(()=>[...document.querySelectorAll('body,aside,.hero,.module-hero,.card,summary')].map(e=>[getComputedStyle(e).backgroundImage,getComputedStyle(e).backgroundColor,getComputedStyle(e).color])),print);
  console.log('PASS '+(c.route||'PSYC301')+': light/dark UI contrast, unchanged text/layout/source media/reading panes/progress, mobile, expanded reader and print.');await context.close();
 }}finally{await browser.close();await new Promise(r=>server.close(r))}assert.deepEqual(errors,[]);
});
