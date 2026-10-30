const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const bare=paragraphs=>paragraphs.map(p=>p.replace(/\*\*/g,''));
const root='http://localhost:8907/ling406/';
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  await context.addInitScript(()=>{
   window.spoken=[];window.cancellations=0;
   Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){window.cancellations++},speak(s){window.spoken.push(s.text)}}});
   window.SpeechSynthesisUtterance=function(text){this.text=text};
  });
  const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(root);
  const D=await p.evaluate(()=>LING406),V=await p.evaluate(()=>LING406_TRANSCRIPTS_V2);
  const byId=new Map(D.sections.map(s=>[s.id,s]));
  const selector='header [data-transcript-version]';
  const readerSelector='.reader-controls [data-transcript-version]';
  const readParagraphs=()=>p.locator('.reader-transcript>p').allTextContents();
  assert.equal(await p.locator(selector).inputValue(),'18');
  await p.selectOption(selector,'2');
  for(const m of D.modules){
   await p.evaluate(id=>LingStudio.go('collection',id),m.id);
   for(const version of ['1','2']){
    await p.selectOption(selector,version);
    const rendered=await p.locator('.note-section').evaluateAll(es=>es.map(e=>[e.dataset.section,[...e.querySelectorAll('.section-transcript>p')].map(p=>p.textContent)]));
    assert.equal(rendered.length,m.sections.length);
    for(const [id,paragraphs] of rendered)assert.deepEqual(paragraphs,bare(version==='1'?byId.get(id).paragraphs:V.scripts[id]),id+' version '+version);
   }
  }
  await p.evaluate(()=>LingStudio.go('collection','speech2'));
  await p.locator('[data-reader="lecture"]').filter({hasText:'Visual + transcript'}).first().click();
  await p.selectOption('#readerSelect','9');
  await p.locator('.reader-inline [data-note="speech2-10"]').fill('Keep the VOT comparison and the competitor looks.');
  await p.locator('.reader-inline [data-read="speech2-10"]').check();
  for(const version of ['1','2']){
   await p.selectOption(readerSelector,version);
   assert.equal(await p.locator('#readerSelect').inputValue(),'9');
   assert.deepEqual(await readParagraphs(),bare(version==='1'?byId.get('speech2-10').paragraphs:V.scripts['speech2-10']));
   assert.equal(await p.locator(selector).inputValue(),version);
   assert.equal(await p.locator('.reader-inline [data-note]').inputValue(),'Keep the VOT comparison and the competitor looks.');
   assert(await p.locator('.reader-inline [data-read]').isChecked());
   await p.locator('[data-action="readAloud"]').click();
   const spoken=await p.evaluate(()=>spoken.at(-1));
   assert.equal(spoken,[byId.get('speech2-10').title,...bare(version==='1'?byId.get('speech2-10').paragraphs:V.scripts['speech2-10'])].join('. '));
  }
  await p.locator('[data-action="readerExpand"]').click();
  assert.equal(await p.locator('#readerSelect').count(),1);
  assert.equal(await p.locator('#readerRoot [data-transcript-version]').inputValue(),'2');
  await p.selectOption('#readerRoot [data-transcript-version]','1');
  assert.equal(await p.locator('#readerSelect').inputValue(),'9');
  await p.locator('[data-action="cover"]').click();
  await p.selectOption('#readerRoot [data-transcript-version]','2');
  assert.equal(await p.locator('.cover-text').count(),1);
  await p.locator('[data-action="cover"]').click();
  assert.deepEqual(await readParagraphs(),bare(V.scripts['speech2-10']));
  await p.keyboard.press('Escape');
  await p.reload();assert.equal(await p.locator(selector).inputValue(),'2');
  assert.equal(await p.evaluate(()=>LingStudio.state.notes['speech2-10']),'Keep the VOT comparison and the competitor looks.');
  assert.equal(await p.evaluate(()=>LingStudio.state.read['speech2-10']),true);
  await p.selectOption(selector,'1');await p.reload();assert.equal(await p.locator(selector).inputValue(),'1');
  await p.selectOption(selector,'2');

  for(const route of ['combined','core','experiments']){
   await p.evaluate(v=>LingStudio.go(v),route);
   const rendered=await p.locator('.note-section').evaluateAll(es=>es.map(e=>[e.dataset.section,[...e.querySelectorAll('.section-transcript>p')].map(p=>p.textContent)]));
   for(const [id,paragraphs] of rendered)assert.deepEqual(paragraphs,bare(V.scripts[id]),route+' '+id);
  }
  await p.evaluate(()=>LingStudio.go('guide'));
  const first=D.guide[0].sections[0];
  assert.deepEqual(await p.locator('.review-group').first().locator(':scope>p').allTextContents(),bare(V.scripts[first]));
  await p.selectOption(selector,'1');
  assert.deepEqual(await p.locator('.review-group').first().locator(':scope>p').allTextContents(),bare([byId.get(first).paragraphs[0],byId.get(first).paragraphs.at(-1)]));
  await p.selectOption(selector,'2');
  const reviewID=D.review.find(r=>r.section.startsWith('speech2-')).section;
  await p.evaluate(id=>LingStudio.openReader([id],0,true,'Review source'),reviewID);
  await p.locator('#readerRoot [data-note]').fill('Shared source and review note.');
  await p.locator('#readerRoot [data-read]').check();
  await p.keyboard.press('Escape');
  await p.evaluate(()=>LingStudio.go('sources'));await p.locator('[data-review]').click();
  for(let i=0;i<D.review.length;i++){
   await p.selectOption('#readerSelect',String(i));
   assert.deepEqual(await readParagraphs(),bare(V.scripts[D.review[i].section]),'review '+(i+1));
  }
  const linked=D.review.findIndex(r=>r.section===reviewID);
  assert(linked>=0);await p.selectOption('#readerSelect',String(linked));
  assert.equal(await p.locator('#readerRoot [data-note]').inputValue(),'Shared source and review note.');
  assert(await p.locator('#readerRoot [data-read]').isChecked());
  await p.keyboard.press('Escape');
  await p.evaluate(()=>LingStudio.go('collection','development2'));
  await p.fill('#noteSearch','gavagai');
  assert.equal(await p.locator('.note-section:visible').count(),1);
  assert.equal(await p.locator('.note-section:visible').getAttribute('data-section'),'development2-12');

  // Selection changes are additive to a saved quiz; answers and ordering survive.
  await p.evaluate(()=>LingStudio.startQuiz('quick'));
  const choice=await p.evaluate(()=>LingStudio.questions.get(LingStudio.state.quiz.items[0].id).correct);
  await p.locator(`[data-answer="${choice}"]`).click();
  const quiz=await p.evaluate(()=>JSON.stringify(LingStudio.state.quiz));
  await p.selectOption(selector,'1');await p.selectOption(selector,'2');
  assert.equal(await p.evaluate(()=>JSON.stringify(LingStudio.state.quiz)),quiz);
  assert((await p.locator('.feedback').innerText()).includes('Correct.'));

  for(const ref of Object.values(V.references))assert.equal((await context.request.get(root+ref.file)).status(),200,ref.file);
  for(const theme of ['light','dark']){
   await p.setViewportSize({width:1440,height:1000});
   await p.evaluate(t=>{LingStudio.state.theme=t;LingStudio.go('home')},theme);
   assert((await p.locator('.hero').evaluate(e=>getComputedStyle(e).backgroundImage)).includes('linear-gradient'));
   await p.screenshot({path:`/tmp/ling-v2-home-${theme}.png`});
   await p.evaluate(()=>LingStudio.openReader(['development1-02'],0,true,'Nativist argument'));
   await p.locator('#readerRoot img').evaluate(e=>e.decode());
   const stage=p.locator('.expanded-stage');
   let box=await p.locator('.expanded-pair .reader-visual').boundingBox();
   assert(box.y<300&&box.y+box.height<1000,'visual is visible beside the start of a long script');
   await stage.evaluate(e=>e.scrollTop=500);await p.waitForTimeout(80);
   box=await p.locator('.expanded-pair .reader-visual').boundingBox();
   assert(box.y>=90&&box.y<200,'visual stays beside the scrolled script');
   await stage.evaluate(e=>e.scrollTop=0);
   await p.screenshot({path:`/tmp/ling-v2-reader-${theme}.png`});await p.keyboard.press('Escape');
   await p.setViewportSize({width:390,height:844});
   for(const route of ['home','collection','combined','core','experiments','guide']){
    await p.evaluate(v=>LingStudio.go(v),route);
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),theme+' '+route);
   }
   await p.evaluate(()=>LingStudio.openReader(['development1-02'],0,true,'Nativist argument'));
   assert(await p.evaluate(()=>document.querySelector('.expanded-stage').scrollWidth<=innerWidth));
   await p.screenshot({path:`/tmp/ling-v2-mobile-${theme}.png`});await p.keyboard.press('Escape');
  }
  await p.evaluate(()=>navigator.serviceWorker.ready);await p.reload();
  await context.setOffline(true);await p.reload();
  await p.evaluate(()=>LingStudio.go('collection','development1'));
  assert.equal(await p.locator('[data-section="development1-02"] .section-transcript>p').count(),6);
  await p.selectOption(selector,'1');assert.equal(await p.locator('[data-section="development1-02"] .section-transcript>p').count(),3);
  await p.selectOption(selector,'2');
  await context.setOffline(false);assert.deepEqual(errors,[]);
  console.log('PASS: all 229 V1/V2 DOM scripts, 55 review mappings, selected-version speech/search/guide/reader, persistent dropdown and shared notes/read marks, quiz preservation, five reference PDFs, sticky long-script visuals, light/dark desktop/mobile layouts, and offline switching.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
