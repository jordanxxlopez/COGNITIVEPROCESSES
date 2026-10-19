const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const root='http://localhost:8907/ling406/';
const edition=Number(process.env.LING_TRANSCRIPT_VERSION||3);
assert([3,4].includes(edition));
const bare=s=>s.replace(/\*\*/g,'');
const flatten=blocks=>blocks.flatMap(b=>[b.text,...b.children]).map(bare);
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  await context.addInitScript(()=>{
   window.spoken=[];window.cancellations=0;
   Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){window.cancellations++},speak(s){window.spoken.push(s.text)}}});
   window.SpeechSynthesisUtterance=function(text){this.text=text};
  });
  const p=await context.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(root);
  const D=await p.evaluate(()=>LING406),V3=await p.evaluate(()=>LING406_TRANSCRIPTS_V3);
  const V=edition===4?{...V3,...await p.evaluate(()=>LING406_TRANSCRIPTS_V4)}:V3;
  const sel='header [data-transcript-version]',rsel='#readerRoot [data-transcript-version]';
  assert.equal(await p.locator(sel).inputValue(),'4');
  await p.selectOption(sel,String(edition));
  assert.equal(await p.locator('#collectionNav button').count(),10);
  assert.match(await p.locator('[data-lecture="midterm-review"]').innerText(),/10.*Midterm II Review.*Fall 2025/s);
  // Compare every rendered selected-edition paragraph with its explicitly authored source-page entry.
  for(const id of [...D.modules.map(m=>m.id),'midterm-review']){
   await p.evaluate(id=>LingStudio.go('collection',id),id);
   const rows=await p.locator('.note-section').evaluateAll(es=>es.map(e=>({id:e.dataset.section,paragraphs:[...e.querySelectorAll('.section-transcript .teaching-script p')].map(p=>p.textContent),image:e.querySelector('img').getAttribute('src')})));
   assert.equal(rows.length,id==='midterm-review'?55:D.modules.find(m=>m.id===id).sections.length);
   for(const row of rows){assert.deepEqual(row.paragraphs,flatten(V.scripts[row.id]),row.id);if(id==='midterm-review')assert.equal(row.image,`assets/slides/review/${row.id.split('-').at(-1).padStart(2,'0')}.webp`);}
  }
  // The review collection uses original review pages, not just the linked lecture visuals.
  assert.equal(await p.locator('[data-quiz^="lecture:midterm-review"]').count(),0);
  await p.locator('[data-reader="lecture"]').filter({hasText:'Visual + transcript'}).first().click();
  assert.equal(await p.locator('#readerSelect option').count(),55);
  await p.selectOption('#readerSelect','53');
  assert.deepEqual(await p.locator('.reader-transcript .teaching-script p').allTextContents(),flatten(V.scripts['review-54']));
  await p.locator('.reader-inline [data-note]').fill('Review matches share this note with the corresponding lecture.');
  await p.locator('.reader-inline [data-read]').check();
  await p.locator('[data-action="readerExpand"]').click();
  assert.equal(await p.locator('#readerSelect').count(),1);
  for(const version of Array.from({length:edition},(_,i)=>String(i+1))){
   await p.selectOption(rsel,version);
   assert.equal(await p.locator('#readerSelect').inputValue(),'53');
   assert.equal(await p.locator('#readerRoot [data-note]').inputValue(),'Review matches share this note with the corresponding lecture.');
   assert(await p.locator('#readerRoot [data-read]').isChecked());
  }
  assert.match(await p.locator('#readerRoot .reader-visual img').getAttribute('src'),/review\/54\.webp$/);
  await p.keyboard.press('Escape');
  await p.locator('[data-section="review-54"]>summary').click();
  await p.locator('[data-section="review-54"] [data-open-section]').click();
  assert.match(await p.locator('#readerRoot .reader-visual img').getAttribute('src'),/review\/54\.webp$/);
  assert.equal(await p.locator('#readerSelect option').count(),1);
  await p.keyboard.press('Escape');
  await p.evaluate(()=>LingStudio.openReader(['l2-learning-21'],0,true,'Linked lecture'));
  assert.equal(await p.locator('#readerRoot [data-note]').inputValue(),'Review matches share this note with the corresponding lecture.');
  await p.keyboard.press('Escape');
  await p.locator('[data-reader="lecture"]').filter({hasText:'Expand'}).click();
  for(let i=0;i<55;i++){
   await p.selectOption('#readerSelect',String(i));
   assert.deepEqual(await p.locator('#readerRoot .teaching-script p').allTextContents(),flatten(V.scripts['review-'+(i+1)]));
   assert.match(await p.locator('#readerRoot .reader-visual img').getAttribute('src'),new RegExp('review/'+String(i+1).padStart(2,'0')+'\\.webp$'));
  }
  assert(await p.locator('[data-action="next"]').isDisabled());
  await p.selectOption('#readerSelect','0');assert(await p.locator('[data-action="previous"]').isDisabled());
  assert.equal(await p.locator('#readerRoot .teaching-script').count(),0);
  await p.locator('[data-action="readAloud"]').click();assert.deepEqual(await p.evaluate(()=>spoken),[]);
  await p.keyboard.press('Escape');
  await p.fill('#noteSearch','spichki');assert(await p.locator('.note-section:visible').count()>0);
  // The teaching hierarchy is read aloud and searched without duplicating its children.
  await p.evaluate(()=>LingStudio.openReader(['development2-09'],0,true,'Statistics'));
  assert.equal(await p.locator('#readerRoot .teaching-script ul li').count(),2);
  await p.locator('[data-action="readAloud"]').click();
  assert.equal(await p.evaluate(()=>spoken.at(-1)),[D.sections.find(s=>s.id==='development2-09').title,...flatten(V.scripts['development2-09'])].join('. '));
  await p.keyboard.press('Escape');
  for(const route of ['combined','core','experiments']){
   await p.evaluate(v=>LingStudio.go(v),route);
   const rows=await p.locator('.note-section').evaluateAll(es=>es.map(e=>[e.dataset.section,[...e.querySelectorAll('.section-transcript .teaching-script p')].map(p=>p.textContent)]));
   for(const [id,pars] of rows)assert.deepEqual(pars,flatten(V.scripts[id]),route+' '+id);
  }
  await p.evaluate(()=>LingStudio.go('guide'));
  assert.deepEqual(await p.locator('.review-group').first().locator('.teaching-script p').allTextContents(),flatten(V.scripts[D.guide[0].sections[0]]));
  // The edition setting preserves saved answers and randomization.
  await p.evaluate(()=>LingStudio.startQuiz('quick'));
  const correct=await p.evaluate(()=>LingStudio.questions.get(LingStudio.state.quiz.items[0].id).correct);
  await p.locator(`[data-answer="${correct}"]`).click();
  const quiz=await p.evaluate(()=>JSON.stringify(LingStudio.state.quiz));
  for(const version of Array.from({length:edition},(_,i)=>String(i+1)))await p.selectOption(sel,version);
  assert.equal(await p.evaluate(()=>JSON.stringify(LingStudio.state.quiz)),quiz);
  await p.reload();assert.equal(await p.locator(sel).inputValue(),String(edition));
  for(const theme of ['light','dark']){
   await p.setViewportSize({width:1440,height:1000});
   await p.evaluate(t=>{LingStudio.state.theme=t;LingStudio.go('collection','speech1')},theme);
   await p.evaluate(()=>LingStudio.openReader(['development1-02'],0,true,'Generativity'));
   await p.locator('#readerRoot img').evaluate(e=>e.decode());
   assert(await p.evaluate(()=>document.querySelector('.expanded-stage').scrollWidth<=innerWidth));
   const visual=await p.locator('#readerRoot .reader-visual').boundingBox();assert(visual.y<350&&visual.y+visual.height<1000);
   await p.screenshot({path:`/tmp/ling-v${edition}-desktop-${theme}.png`});
   await p.keyboard.press('Escape');
   await p.setViewportSize({width:390,height:844});
   for(const id of ['speech1','midterm-review']){
    await p.evaluate(id=>LingStudio.go('collection',id),id);
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   }
   await p.evaluate(()=>LingStudio.openReader(['review-54'],0,true,'Review'));
   assert(await p.evaluate(()=>document.querySelector('.expanded-stage').scrollWidth<=innerWidth));
   await p.screenshot({path:`/tmp/ling-v${edition}-mobile-${theme}.png`});await p.keyboard.press('Escape');
  }
  await p.evaluate(()=>navigator.serviceWorker.ready);await p.reload();
  await context.setOffline(true);await p.reload();
  await p.evaluate(()=>LingStudio.go('collection','midterm-review'));
  assert.equal(await p.locator('.note-section').count(),55);
  assert.deepEqual(await p.locator('[data-section="review-54"] .teaching-script p').allTextContents(),flatten(V.scripts['review-54']));
  for(const version of Array.from({length:edition},(_,i)=>String(i+1))){await p.selectOption(sel,version);assert.equal(await p.locator('.note-section').count(),55);}
  await context.setOffline(false);assert.deepEqual(errors,[]);
  console.log(`PASS: all 284 V${edition} DOM scripts, original 55-slide collection/readers, review/lecture shared notes, ${edition}-edition switching and persistence, nested teaching prose, speech/search/guide, quiz preservation, light/dark desktop/mobile containment, and offline switching.`);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
