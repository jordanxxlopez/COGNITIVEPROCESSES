'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname,'../..');
const fixtureMode = process.argv.includes('--fixture');
const fixture = {
  course:{code:'LING285',title:'Human Language and Technology',professor:'Khalil Iskarous',edition:'UI verification fixture',coverageNotice:'Interface fixture for functional verification.'},
  collections:[{id:'lecture01',number:'01',label:'Speech and learning',title:'Speech and learning',role:'lecture',sourceFile:'sources/lecture01.pptx',pdfFile:'sources/lecture01.pdf',originalFilename:'Lecture 1.pptx',issues:[],sections:[
    {id:'lecture01-p01',page:1,title:'Speech and learning',teaching:['Language connects actions and sounds.'],image:'assets/slides/lecture01/001.webp',assets:[],sourceText:'Source title',speakerNotes:'',core:false},
    {id:'lecture01-p02',page:2,title:'Cause and effect',teaching:['A change in the input affects the result.'],image:'assets/slides/lecture01/002.webp',assets:[],sourceText:'Source content',speakerNotes:'Original notes',core:true,coreReason:'A foundational distinction.'}
  ]}],
  questions:[{id:'q1',prompt:'Explain how a change can affect a system.',answer:'The input changes the system and produces a different result.',rubric:['Describe the input.','Connect the input to the result.'],sources:[{collection:'lecture01',page:2}],topic:'Cause and effect',edition:'1'}],
  guide:[{title:'Cause and effect',explanation:'Explain the relationship.',refs:[{collection:'lecture01',page:2}],kind:'connection'}],coverage:{}
};
const dataPath = path.join(root,'ling285/data.json');
if(!fixtureMode && !fs.existsSync(dataPath))throw new Error('data.json is not ready. Use --fixture for isolated UI checks.');
const data = fixtureMode ? fixture : JSON.parse(fs.readFileSync(dataPath,'utf8'));
const mime = {'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.pdf':'application/pdf','.wav':'audio/wav'};
const server = http.createServer((request,response)=>{
  let pathname;try{pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400);response.end();return;}
  if(pathname === '/ling285/data.json' && fixtureMode){response.writeHead(200,{'Content-Type':'application/json'});response.end(JSON.stringify(fixture));return;}
  if(pathname.endsWith('/'))pathname+='index.html';
  const filepath=path.resolve(root,'.'+pathname);
  if(!filepath.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
  fs.stat(filepath,(error,stat)=>{if(error || !stat.isFile()){response.writeHead(404);response.end();return;}response.writeHead(200,{'Content-Type':mime[path.extname(filepath)] || 'application/octet-stream'});fs.createReadStream(filepath).pipe(response);});
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url='http://127.0.0.1:'+server.address().port+'/ling285/';
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.setDefaultTimeout(10000);
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  try{
    console.log('UI check: opening studio');await page.goto(url);await page.locator('#content h1').waitFor();
    await page.getByRole('heading',{name:/Human Language/}).waitFor();
    console.log('UI check: course loaded');const navLabels=await page.locator('#collectionNav button').allTextContents();assert.equal(new Set(navLabels).size,navLabels.length,'Collection navigation labels must be unique and informative.');const lecture=data.collections.find(c=>c.role==='lecture');assert(lecture);
    await page.locator('#collectionNav [data-collection="'+lecture.id+'"]').click();
    const first=lecture.sections[0];
    await page.locator('[data-section="'+first.id+'"] [data-note]').fill('My retained explanation.');
    await page.locator('[data-section="'+first.id+'"] [data-read]').check();
    await page.locator('[data-section="'+first.id+'"] [data-open-section]').click();
    await page.locator('#readerDialog').waitFor({state:'visible'});
    assert.equal(await page.locator('#readerDialog [data-note]').inputValue(),'My retained explanation.');
    assert.equal(await page.locator('#readerDialog [data-read]').isChecked(),true);
    await page.locator('#readerDialog [data-note]').fill('Updated from expanded reader.');
    await page.locator('#readerDialog [data-action="recall"]').click();
    await page.locator('#readerDialog .recall-cover').waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('[data-section="'+first.id+'"] [data-note]').inputValue(),'Updated from expanded reader.');
    console.log('UI check: reader and shared state passed');await page.reload();await page.locator('[data-section="'+first.id+'"] [data-note]').waitFor();
    assert.equal(await page.locator('[data-section="'+first.id+'"] [data-note]').inputValue(),'Updated from expanded reader.');
    await page.locator('[data-reader="lecture"][data-expanded="false"]').click();
    await page.locator('.inline-reader').waitFor();
    const readerOptions=await page.locator('#readerSelect option').count();assert.equal(readerOptions,lecture.sections.length);
    await page.locator('#readerSelect').selectOption(String(readerOptions-1));
    assert.equal(await page.locator('[data-action="readerNext"]').isDisabled(),true);
    await page.locator('[data-action="closeReader"]').click();
    await page.locator('#workNav [data-go="combined"]').click();
    assert.equal(await page.locator('[data-section="'+first.id+'"] [data-note]').inputValue(),'Updated from expanded reader.');
    await page.locator('#noteSearch').fill('no_match_236273');
    assert.equal(await page.locator('.source-section:visible').count(),0);
    await page.locator('#noteSearch').fill('');
    for(const route of ['guide','core','experiments','quizzes','missed','sources','test']){
      await page.locator('#workNav [data-go="'+route+'"]').click();
      assert(await page.locator('#content h1').count()>0,'Missing heading for '+route);
    }
    if(!fixtureMode) {
      const mediaSections=data.collections.flatMap(c=>c.sections.map(section=>({c,section})));
      for(const kind of ['animated','static','video']) {
        const match=mediaSections.find(({section})=>(section.assets || []).some(asset=>kind === 'animated'?asset.animated === true:kind === 'video'?asset.type === 'video':asset.type === 'image' && !asset.animated));
        if(!match)continue;
        await page.locator('#collectionNav [data-collection="'+match.c.id+'"]').click();
        const section=page.locator('[data-section="'+match.section.id+'"]');
        if(!(await section.getAttribute('open') !== null))await section.locator(':scope > summary').click();
        if(kind === 'animated') {
          const asset=match.section.assets.find(a=>a.animated === true);
          const animated=section.locator('.source-media > .media-item img[src="'+asset.file+'"]');
          await animated.scrollIntoViewIfNeeded();assert(await animated.isVisible(),'Animated source must stay prominent outside collapsed figure details.');
        } else if(kind === 'static') {
          const details=section.locator('.figure-details');assert.equal(await details.getAttribute('open'),null);
          await details.locator('summary').click();
          assert.equal(await details.locator('img').first().evaluate(img=>getComputedStyle(img).backgroundColor),'rgb(255, 255, 255)','Transparent source figures must have a white background.');
        } else {
          const player=section.locator('video').first();await player.scrollIntoViewIfNeeded();
          await page.waitForFunction(id=>document.querySelector('[data-section="'+id+'"] video source')?.hasAttribute('src'),match.section.id);
          assert.equal(await player.getAttribute('preload'),'metadata');assert.equal(await player.getAttribute('controls'),'');
        }
      }
      await page.locator('#workNav [data-go="test"]').click();
    }
    console.log('UI check: routes and readers passed');await page.locator('[data-start="mixed"]').click();
    await page.locator('#answerDraft').fill('A complete saved conceptual draft.');
    const session=await page.evaluate(()=>JSON.parse(localStorage.getItem('ling285-study-studio-v1')).session);
    assert.equal(new Set(session.ids).size,session.ids.length);
    assert.equal(session.ids.length,Math.min(20,data.questions.length));
    const questionId=session.ids[0];
    await page.locator('[data-reveal]').click();
    await page.locator('.feedback').waitFor();
    assert.match(await page.locator('.feedback').textContent(),/Model answer/);
    await page.locator('[data-rating="review"]').click();
    await page.reload();await page.locator('.feedback').waitFor();
    assert.equal(await page.locator('#answerDraft').inputValue(),'A complete saved conceptual draft.');
    assert.equal(await page.locator('[data-rating="review"]').getAttribute('aria-pressed'),'true');
    await page.locator('[data-action="finishPractice"]').click();
    await page.getByRole('heading',{name:/Keep the reasoning/}).waitFor();
    await page.locator('#workNav [data-go="missed"]').click();
    assert(await page.locator('[data-single-question="'+questionId+'"]').count());
    await page.locator('[data-single-question="'+questionId+'"]').click();
    await page.locator('[data-reveal]').click();await page.locator('[data-rating="ready"]').click();
    await page.locator('#workNav [data-go="missed"]').click();
    assert.equal(await page.locator('[data-single-question="'+questionId+'"]').count(),0);
    await page.locator('#workNav [data-go="sources"]').click();
    console.log('UI check: practice and retry passed');const downloadPromise=page.waitForEvent('download');await page.locator('[data-action="export"]').click();
    const download=await downloadPromise;assert(download.suggestedFilename().startsWith('LING285-progress-'));
    await page.locator('#importFile').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"course":"PSYC301","version":1,"state":{}}')});
    await page.locator('#storageWarning').waitFor({state:'visible'});assert.match(await page.locator('#storageWarning').textContent(),/Existing progress was preserved/);
    const backup={course:'LING285',version:1,state:{notes:{[first.id]:'Imported study note.'}}};
    await page.locator('#importFile').setInputFiles({name:'good.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
    await page.waitForFunction(()=>document.querySelector('#saveStatus').textContent.includes('imported'));
    await page.locator('#collectionNav [data-collection="'+lecture.id+'"]').click();
    await page.locator('[data-section="'+first.id+'"] [data-image-section]').click();
    await page.locator('#imageDialog').waitFor({state:'visible'});await page.keyboard.press('Escape');
    assert.equal(await page.locator('[data-section="'+first.id+'"] [data-note]').inputValue(),'Imported study note.');
    await page.setViewportSize({width:390,height:844});
    if(!(await page.locator('body').getAttribute('class') || '').includes('side-closed')) await page.locator('#sidebar [data-action="sidebar"]').click();
    await page.locator('.topbar [data-action="sidebar"]').click();
    await page.locator('#sidebar [data-action="sidebar"]').click();
    await page.locator('[data-section="'+first.id+'"] [data-open-section]').click();
    const overflow=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,window:innerWidth,dialog:document.querySelector('#readerDialog').scrollWidth,client:document.querySelector('#readerDialog').clientWidth}));
    assert(overflow.doc<=overflow.window+1,'Mobile document overflow '+JSON.stringify(overflow));
    assert(overflow.dialog<=overflow.client+1,'Mobile reader overflow '+JSON.stringify(overflow));
    await page.keyboard.press('Escape');
    await page.screenshot({path:'/tmp/ling285-ui-mobile.png',fullPage:false});
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(url);await page.getByRole('heading',{name:/Human Language/}).waitFor();
    await page.screenshot({path:'/tmp/ling285-ui-home.png',fullPage:false});
    assert.deepEqual(errors,[]);
    console.log('LING285 UI smoke passed ('+(fixtureMode?'fixture':'current data')+'): navigation, shared notes/read marks, readers, search, conceptual self-assessment, persistence, export/import, source dialog, mobile containment.');
  } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
