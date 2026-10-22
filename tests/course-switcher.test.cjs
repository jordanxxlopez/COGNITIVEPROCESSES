'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright'),root=path.resolve(__dirname,'..');
const courses=[{id:'PSYC301',path:'',key:'psyc301-studio-v1',note:'[data-personal-note="6:1"]',field:'personalNotes',open:async p=>p.locator('#workspaceNav [data-module="6"]').click(),mobile:'#openSidebar',theme:'[data-theme-choice]'},
{id:'BME423',path:'bme423/',key:'bme423-studio-v1',note:'[data-note="s17:1"]',field:'notes',open:async p=>p.locator('#moduleNav [data-module="17"]').click(),mobile:'#openSide',theme:'.themes [data-theme]'},
{id:'LING406',path:'ling406/',key:'ling406-study-studio-v1',note:'[data-note]',field:'notes',open:async p=>p.locator('#collectionNav [data-lecture="speech1"]').click(),mobile:'#openSidebar',theme:'[data-theme]'},
{id:'LING285',path:'ling285/',key:'ling285-study-studio-v1',note:'[data-note]',field:'notes',open:async p=>p.locator('#collectionNav [data-collection="lecture11"]').click(),mobile:'[data-action="sidebar"].menu-button',theme:'[data-theme]'}];
const source=fs.readFileSync(path.join(root,'course-switcher.js'),'utf8');
test('course switcher resolves every route under the deployed repository prefix',()=>{
 for(const c of courses)for(const suffix of ['', '?view=collection']){
  const listeners={},events={},options=[],calls=[];let mounted=false;
  const select={setAttribute(){},append(o){options.push(o)},addEventListener(name,fn){listeners[name]=fn}};
  const sidebar={querySelector(s){if(s==='[data-course-switcher]')return mounted?{}:null;if(s==='.brand-row')return {};if(s==='.course-name')return{after(){mounted=true}};return null}};
  const document={currentScript:{src:'https://example.org/COGNITIVEPROCESSES/course-switcher.js?v=1'},readyState:'complete',getElementById(){return sidebar},createElement(tag){return tag==='select'?select:{setAttribute(){},append(){}}}};
  const context={document,URL,location:{pathname:'/COGNITIVEPROCESSES/'+c.path,assign(url){calls.push(url)}},addEventListener(name,fn){events[name]=fn}};vm.runInNewContext(source,context);
  assert.equal(options.find(o=>o.selected).value,c.id);
  for(const target of courses){select.value=target.id;listeners.change();if(target.id!==c.id)assert.equal(calls.at(-1),'https://example.org/COGNITIVEPROCESSES/'+target.path+'?v=1')}
  events.pageshow();assert.equal(select.value,c.id);
  vm.runInNewContext(source,context);assert.equal(options.length,4,'Duplicate selector');
 }
});
function serve(){return http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.startsWith('/COGNITIVEPROCESSES/'))name=name.slice('/COGNITIVEPROCESSES'.length);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.stat(file,(e,s)=>{if(e||!s.isFile()){res.writeHead(404);return res.end()}res.writeHead(200,{'Content-Type':{'.html':'text/html','.js':'application/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'}[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res)})})}
test('four-course switching preserves separate notes, palettes and existing navigation',{timeout:180000},async()=>{
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/COGNITIVEPROCESSES/';
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:1460,height:1050}}),p=await context.newPage(),errors=[],savedNotes=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base);
  for(let i=0;i<courses.length;i++){
   const c=courses[i],select=p.getByLabel('Switch course',{exact:true});await select.waitFor();assert.equal(await select.inputValue(),c.id);assert.equal(await p.locator('[data-course-switcher]').count(),1);
   assert.deepEqual(await select.locator('option').allTextContents(),courses.map(c=>c.id));
   await c.open(p);const note=p.locator(c.note).first();await note.fill('Saved in '+c.id+' before switching.');const key=await note.getAttribute(c.id==='PSYC301'?'data-personal-note':'data-note');savedNotes.push({course:c,key});
   for(const theme of ['light','dark']){
    const button=p.locator(c.theme+'[data-theme'+(c.id==='PSYC301'?'-choice':'')+'="'+theme+'"]');await button.first().click();
    const colors=await select.evaluate(el=>({ink:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));assert.notEqual(colors.ink,colors.bg);
   }
   if(c.id==='LING406')await p.locator('[data-course-switcher]').screenshot({path:'/tmp/study-course-switcher.png'});
   const next=courses[(i+1)%courses.length];await Promise.all([p.waitForURL(url=>url.pathname==='/COGNITIVEPROCESSES/'+next.path),select.selectOption(next.id)]);
  }
  for(const {course:c,key}of savedNotes){
   if(await p.getByLabel('Switch course',{exact:true}).inputValue()!==c.id)await Promise.all([p.waitForURL(url=>url.pathname==='/COGNITIVEPROCESSES/'+c.path),p.getByLabel('Switch course',{exact:true}).selectOption(c.id)]);
   await c.open(p);assert.equal(await p.locator(c.note).first().inputValue(),'Saved in '+c.id+' before switching.');
   const stored=await p.evaluate(({storage,field,key})=>JSON.parse(localStorage.getItem(storage))[field][key],{storage:c.key,field:c.field,key});assert.equal(stored,'Saved in '+c.id+' before switching.');
  }
  // Shared PSYC entry point still shows its own wording and is never redirected.
  await p.goto(base+'share.html');assert.equal(await p.getByLabel('Switch course',{exact:true}).inputValue(),'PSYC301');assert.equal(new URL(p.url()).pathname,'/COGNITIVEPROCESSES/share.html');
  // At mobile widths use each existing menu control, then the same selector.
  await p.setViewportSize({width:390,height:844});
  for(const c of courses){await p.goto(base+c.path);await p.getByLabel('Switch course',{exact:true}).waitFor();
   const rect=await p.locator('#sidebar').boundingBox();if(!rect||rect.x<0||rect.x>=390)await p.locator(c.mobile).click();
   await p.locator('[data-course-switcher]').scrollIntoViewIfNeeded();const rectSelect=await p.getByLabel('Switch course',{exact:true}).boundingBox();assert(rectSelect.x>=0&&rectSelect.x+rectSelect.width<=391);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  }
  assert.deepEqual(errors,[]);console.log('PASS: all four course links under /COGNITIVEPROCESSES/, actual note editing and restoration, separate storage keys, light/dark palettes, shared entry point, and each existing mobile menu.');
 }finally{await browser.close();await new Promise(r=>server.close(r))}
});
