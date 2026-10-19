const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:8907/ling406/');await p.evaluate(()=>localStorage.setItem('psyc301-preservation-sentinel','unchanged'));
 const data=await p.evaluate(()=>({modules:LING406.modules,experimentIDs:[...new Set(LING406.experiments.flatMap(g=>g.sections))]}));
 assert.equal(await p.locator('#collectionNav button').count(),10);
 for(const m of data.modules){await p.evaluate(id=>LingStudio.go('collection',id),m.id);assert.equal(await p.locator('.note-section').count(),m.sections.length);await p.locator('[data-reader="lecture"]').filter({hasText:'Expand'}).click();assert.equal(await p.locator('#readerSelect option').count(),m.sections.length);await p.locator('#readerRoot img').evaluate(e=>e.decode());await p.selectOption('#readerSelect',String(m.sections.length-1));assert(await p.locator('[data-action="next"]').isDisabled());assert.equal(await p.locator('#readerRoot .reader-visual img').getAttribute('src'),`assets/slides/${m.id}/${String(m.sections.length).padStart(2,'0')}.webp`);await p.locator('[data-action="readerClose"]').click();assert.equal(await p.locator('.expanded-shell').count(),0);}
 // Notes are a single growing line initially and are shared across all views.
 await p.evaluate(()=>LingStudio.openReader(['speech1-14'],0,true,'Test'));
 const box=p.locator('#readerRoot [data-note="speech1-14"]'),small=await box.evaluate(e=>e.getBoundingClientRect().height);
 await box.fill('Remember the equal physical steps.\nThe category boundary changes discrimination.\nThird line.\nFourth line.');const large=await box.evaluate(e=>e.getBoundingClientRect().height);assert(large>small);assert.equal(await box.evaluate(e=>getComputedStyle(e).resize),'vertical');
 await p.locator('#readerRoot [data-read="speech1-14"]').check();await p.keyboard.press('Escape');
 await p.evaluate(()=>LingStudio.go('core'));await p.locator('[data-reader="core"]').click();assert.equal(await p.locator('#readerSelect option').count(),131);const index=await p.locator('#readerSelect option').evaluateAll(es=>es.findIndex(e=>e.textContent.includes('Constructing an evenly spaced')));await p.selectOption('#readerSelect',String(index));assert((await p.locator('#readerRoot [data-note]').inputValue()).includes('equal physical steps'));assert(await p.locator('#readerRoot [data-read]').isChecked());await p.keyboard.press('Escape');
 await p.evaluate(()=>LingStudio.go('experiments'));await p.locator('[data-reader="experiments"]').click();assert.equal(await p.locator('#readerSelect option').count(),data.experimentIDs.length);await p.selectOption('#readerSelect',String(data.experimentIDs.length-1));assert(await p.locator('[data-action="next"]').isDisabled());await p.keyboard.press('Escape');
 await p.evaluate(()=>LingStudio.go('sources'));await p.locator('[data-review]').click();assert.equal(await p.locator('#readerSelect option').count(),55);await p.selectOption('#readerSelect','54');assert((await p.locator('#readerRoot .reader-visual img').getAttribute('src')).includes('review/55'));await p.keyboard.press('Escape');
 // Every live quiz entry point uses the validated order.
 for(const m of data.modules){await p.evaluate(id=>LingStudio.startQuiz('lecture:'+id),m.id);assert.equal(await p.evaluate(()=>LingStudio.state.quiz.items.length),20);assert(await p.evaluate(()=>LingStudio.validateAnswerKey(LingStudio.state.quiz.items,LingStudio.questions)));}
 await p.evaluate(()=>LingStudio.startQuiz('exam'));let q=await p.evaluate(()=>LingStudio.state.quiz);assert.equal(q.items.length,100);assert.equal(new Set(q.items.map(i=>i.id)).size,100);assert.equal(await p.evaluate(()=>new Set(LingStudio.state.quiz.items.map(i=>LingStudio.questions.get(i.id).module)).size),9);
 const correctOriginal=await p.evaluate(()=>LingStudio.questions.get(LingStudio.state.quiz.items[0].id).correct);await p.locator(`[data-answer="${correctOriginal}"]`).click();assert((await p.locator('.feedback').innerText()).includes('Correct.'));
 await p.locator('[data-quiz-index="1"]').first().click();const current=await p.evaluate(()=>LingStudio.state.quiz.items[1].id);await p.locator('[data-answer="1"]').click();assert((await p.locator('.feedback').innerText()).includes('Review this distinction.'));assert(await p.evaluate(id=>LingStudio.state.missed.includes(id),current));
 const saved=await p.evaluate(()=>JSON.stringify(LingStudio.state.quiz.items));await p.reload();await p.evaluate(()=>LingStudio.go('quiz'));assert.equal(await p.evaluate(()=>JSON.stringify(LingStudio.state.quiz.items)),saved);assert.equal(await p.locator('.feedback').count(),1);
 await p.locator('[data-action="finishQuiz"]').click();assert((await p.locator('h1').innerText()).includes('/ 100 correct'));
 for(const route of ['home','guide','core','experiments','combined','test','quizzes','missed','sources','written']){await p.evaluate(v=>LingStudio.go(v),route);assert.equal(await p.locator('h1').count(),1);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 await p.evaluate(()=>LingStudio.go('collection','speech1'));await p.fill('#noteSearch','Liberman');assert(await p.locator('.note-section:visible').count()>0);assert(await p.locator('.note-section:visible').count()<32);
 // Print/source controls and enlarged slide dialog.
 await p.evaluate(()=>LingStudio.openReader(['speech1-17'],0,true,'Liberman'));
 await p.locator('#readerRoot .slide-button').click();assert(await p.locator('#imageDialog').isVisible());assert((await p.locator('#dialogPdf').getAttribute('href')).includes('#page=17'));await p.locator('#closeImage').click();await p.keyboard.press('Escape');
 for(const theme of ['light','dark']){
  await p.evaluate(t=>{LingStudio.state.theme=t;LingStudio.state.sideClosed=true;LingStudio.go('home')},theme);await p.setViewportSize({width:390,height:844});
  for(const route of ['home','guide','core','experiments','combined','test','quizzes','sources','written']){await p.evaluate(v=>LingStudio.go(v),route);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),theme+' '+route);}
  await p.evaluate(()=>LingStudio.openReader(['development1-17'],0,true,'Maye'));assert(await p.evaluate(()=>document.querySelector('.expanded-stage').scrollWidth<=innerWidth));await p.screenshot({path:`/tmp/ling-mobile-${theme}.png`});await p.keyboard.press('Escape');
 }
 await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>{LingStudio.state.theme='dark';LingStudio.go('collection','speech2')});await p.evaluate(()=>LingStudio.openReader(['speech2-12'],0,true,'McMurray'));await p.locator('#readerRoot img').evaluate(e=>e.decode());await p.screenshot({path:'/tmp/ling-reader-dark.png'});await p.keyboard.press('Escape');
 await p.evaluate(()=>LingStudio.startQuiz('quick'));await p.screenshot({path:'/tmp/ling-quiz-dark.png'});
 assert.equal(await p.evaluate(()=>localStorage.getItem('psyc301-preservation-sentinel')),'unchanged');assert.equal(await p.evaluate(()=>LingStudio.state.notes['speech1-14'].split('\n').length),4);
 // All local source and slide assets referenced by the live data are reachable.
 const assets=await p.evaluate(()=>[...new Set([...LING406.sections.map(s=>s.image),...LING406.review.map(r=>r.image),...Object.values(LING406.sources).map(s=>s.file)])]);
 for(let i=0;i<assets.length;i+=12){const checks=await Promise.all(assets.slice(i,i+12).map(async src=>{const r=await context.request.get('http://localhost:8907/ling406/'+src);return [src,r.status()]}));for(const [src,status] of checks)assert.equal(status,200,src)}
 await p.evaluate(()=>navigator.serviceWorker.ready);await p.reload();await context.setOffline(true);await p.reload();assert((await p.locator('.brand').innerText()).includes('Studio'));await p.evaluate(()=>LingStudio.go('guide'));assert.equal(await p.locator('h1').innerText(),'What to know by the end');await context.setOffline(false);
 assert.deepEqual(errors,[]);console.log('PASS: all nine collections, complete readers, shared autosaved/growing notes, read marks, 100-question coverage, synchronized grading, retries, persisted orders, all workspace routes, 297 source/slide links, light/dark mobile layouts, dialogs and offline text shell.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
