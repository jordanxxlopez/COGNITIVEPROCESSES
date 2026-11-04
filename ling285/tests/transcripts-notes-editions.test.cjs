'use strict';
// Content and browser checks for the Module II teaching-notes editions, Versions 7–18.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..'),studio=path.join(root,'ling285'),KEY='ling285-study-studio-v1';
const read=f=>JSON.parse(fs.readFileSync(path.join(studio,f),'utf8'));
const data=read('data.json'),v4=read('transcripts-v4.json');
const NOTES=['v7','v10','v12','v14','v16','v18'],ALL=['v1','v2','v3','v4',...NOTES];
const editions=Object.fromEntries(NOTES.map(v=>[v,read('transcripts-'+v+'.json')]));
const lectures=Object.keys(v4.collections);
const flat=blocks=>blocks.flatMap(b=>typeof b==='string'?[b]:[b.text,...b.children]);
const clean=v=>String(v).replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
const words=blocks=>clean(flat(blocks).join(' ')).split(' ').filter(Boolean).length;

test('each notes edition covers every Module II source page with its own authored text',()=>{
 execFileSync('python3',['ling285/authoring/build_transcripts_notes.py'],{cwd:root,stdio:'pipe'});
 for(const v of NOTES)assert.equal(JSON.stringify(read('transcripts-'+v+'.json')),JSON.stringify(editions[v]),v+' must match a fresh build');
 const sha=crypto.createHash('sha256').update(fs.readFileSync(path.join(studio,'data.json'))).digest('hex');
 const limits={v14:350,v16:300};
 for(const [v,e]of Object.entries(editions)){
  assert.equal(e.id,v);assert.equal(e.baseDataSha256,sha);assert.deepEqual(e.visualPresentation,v4.visualPresentation);assert.deepEqual(Object.keys(e.collections),lectures);
  for(const lec of lectures){
   const source=data.collections.find(c=>c.id===lec).sections,mine=e.collections[lec].sections;
   assert.deepEqual(mine.map(s=>s.id),source.map(s=>s.id),v+' '+lec+' keeps every source page in order');
   for(const [i,s]of mine.entries()){
    assert.equal(s.teaching.length>0,v4.collections[lec].sections[i].teaching.length>0,v+' '+s.id+' title and logistics pages stay empty');
    if(!s.teaching.length)continue;
    assert(s.teaching.every(b=>typeof b.text==='string' && Array.isArray(b.children)),s.id);
    assert(s.teaching.some(b=>b.children.length),v+' '+s.id+' has nested sub-bullets');
    if(limits[v])assert(words(s.teaching)<=limits[v],v+' '+s.id+' within its word cap');
    for(const p of flat(s.teaching)){assert(!/[:;→]|\bneed not\b|\blawful\b|\bslides?\b/i.test(p),v+' '+s.id+' '+p.slice(0,60));assert.equal((p.match(/\*\*/g)||[]).length%2,0,s.id)}
   }
  }
 }
 // Every edition is a separate text, page by page, from Version 4 and from the other new editions.
 for(const lec of lectures)for(const [i,s]of v4.collections[lec].sections.entries()){
  if(!s.teaching.length)continue;
  const texts=[clean(s.teaching.join(' ')),...NOTES.map(v=>clean(flat(editions[v].collections[lec].sections[i].teaching).join(' ')))];
  assert.equal(new Set(texts).size,texts.length,s.id+' every edition differs');
 }
 const avg=v=>Math.round(editions[v].metrics.words/editions[v].metrics.instructionalPages);
 assert(avg('v12')>=330,'Version 12 stays detailed');assert(avg('v18')<avg('v12'));
});

const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.pdf':'application/pdf','.wav':'audio/wav'};
function serve(){return http.createServer((request,response)=>{
 let name;try{name=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400);response.end();return;}
 if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
 fs.stat(file,(error,stat)=>{if(error || !stat.isFile()){response.writeHead(404);response.end();return;}response.writeHead(200,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream'});fs.createReadStream(file).pipe(response);});
});}
async function openSection(page,id){const section=page.locator('[data-section="'+id+'"]');if(await section.getAttribute('open')===null)await section.locator(':scope > summary').click();return section;}

test('the app opens Version 18 by default and renders every edition with shared progress',{timeout:300000},async()=>{
 const server=serve();await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/ling285/';
 const browser=await chromium.launch({...(fs.existsSync('/usr/bin/chromium')?{executablePath:'/usr/bin/chromium'}:{}),headless:true,args:['--no-sandbox']});const errors=[];
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1050}});
  await context.addInitScript(()=>{window.spoken=[];Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},speak(s){window.spoken.push(s.text)}}});window.SpeechSynthesisUtterance=function(t){this.text=t}});
  const page=await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url+'?view=collection&module=module2&lecture=lecture11');const select=page.locator('#content [data-transcript-version]');await select.waitFor();
  assert.equal(await select.inputValue(),'v18');
  assert.deepEqual(await select.locator('option').evaluateAll(os=>os.map(o=>o.value)),ALL);
  assert.equal(await select.locator('option:disabled').count(),0);
  const keep='lecture11-p002';await (await openSection(page,keep)).locator('[data-note="'+keep+'"]').fill('Keep this spring note across editions.');
  for(const v of NOTES){
   await page.locator('#content [data-transcript-version]').selectOption(v);
   for(const lec of lectures){
    await page.locator('#collectionNav [data-collection="'+lec+'"]').click();
    for(const s of editions[v].collections[lec].sections.filter(s=>s.teaching.length)){
     const section=await openSection(page,s.id),teach=section.locator('.teaching');
     assert.equal(clean(await teach.innerText()),clean(flat(s.teaching).join(' ')),v+' '+s.id);
     assert.equal(await teach.locator('li li').count(),s.teaching.reduce((n,b)=>n+b.children.length,0),v+' '+s.id+' sub-bullets');
    }
   }
   await page.locator('#collectionNav [data-collection="lecture11"]').click();
   assert.equal(await (await openSection(page,keep)).locator('[data-note="'+keep+'"]').inputValue(),'Keep this spring note across editions.');
  }
  // Read aloud and search use the sub-bullets of the selected edition.
  await page.locator('#content [data-transcript-version]').selectOption('v18');
  const child=editions.v18.collections.lecture11.sections[1].teaching.find(b=>b.children.length).children[0];
  await page.evaluate(()=>window.scrollTo(0,0));await page.locator('[data-reader="lecture"]').first().click();await page.locator('#readerSelect').selectOption('1');await page.locator('[data-action="readAloud"]').first().click();
  assert(clean(await page.evaluate(()=>window.spoken.at(-1))).includes(clean(child)));
  await page.keyboard.press('Escape');
  // Earlier editions still render their own paragraphs, and an explicitly saved choice is kept.
  await page.reload();await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v18');
  await page.locator('#content [data-transcript-version]').selectOption('v4');
  const p2=v4.collections.lecture11.sections[1];assert.equal(clean(await (await openSection(page,p2.id)).locator('.teaching').innerText()),clean(p2.teaching.join(' ')));
  await page.reload();await page.locator('#content [data-transcript-version]').waitFor();assert.equal(await page.locator('#content [data-transcript-version]').inputValue(),'v4');
  await context.close();
  // A user whose saved preference predates these editions keeps that preference.
  const old=await browser.newContext();await old.addInitScript(k=>localStorage.setItem(k,JSON.stringify({transcriptVersion:'v3',activeModule:'module2'})),KEY);
  const q=await old.newPage();q.on('pageerror',e=>errors.push(e.message));await q.goto(url+'?view=collection&module=module2&lecture=lecture12');await q.locator('#content [data-transcript-version]').waitFor();
  assert.equal(await q.locator('#content [data-transcript-version]').inputValue(),'v3');await old.close();
  // A missing edition falls back to the next available one.
  const gap=await browser.newContext();await gap.route('**/transcripts-v18.json',r=>r.fulfill({status:503,body:'unavailable'}));
  const g=await gap.newPage();g.on('pageerror',e=>errors.push(e.message));await g.goto(url+'?view=collection&module=module2&lecture=lecture11');await g.locator('#content [data-transcript-version]').waitFor();
  assert.equal(await g.locator('#content [data-transcript-version]').inputValue(),'v16');await gap.close();
  assert.deepEqual(errors,[]);
 }finally{await browser.close();server.close()}
});
