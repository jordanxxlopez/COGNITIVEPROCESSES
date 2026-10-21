const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),repo=path.resolve(root,'..');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,n),'utf8').split('=').slice(1).join('=').replace(/;\s*$/,''));
const data=read('hypothesis-wording-v2-data.js'),old=read('hypothesis-data.js'),m2=read('module2-data.js');
for(const group of ['topics','rules','slides','problems'])assert.deepEqual(Object.keys(data[group]).sort(),Object.keys(old[group]).sort());
assert.equal(Object.keys(data.moduleII).length,m2.cases.filter(c=>c.hypotheses).length);
function checkWords(r){if(Array.isArray(r))return r.forEach(checkWords);if(r.nullWords){assert.deepEqual(Object.keys(r).sort(),['alternativeWords','nullWords']);for(const text of Object.values(r)){assert(text.length>70,text);assert(/[.]$/.test(text));assert(!/\\|μ|≠|H_0|H_A|need not|mean the |undefined/.test(text),text)}}else Object.values(r).forEach(checkWords)}checkWords(data);
// Existing source content, renderers, notation, arithmetic and design remain identical.
for(const file of ['app.js','course-modules.js','hypotheses.js','hypothesis-data.js','module2-data.js','math.js','style.css','module2.css','table-guidance.js'])assert.equal(fs.readFileSync(path.join(root,file),'utf8'),execFileSync('git',['show','3991da7:bme423/'+file],{cwd:repo,encoding:'utf8'}));
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const base=process.env.BME_STUDIO_URL||'http://localhost:8920/bme423/';
 const ctx=await browser.newContext({viewport:{width:1490,height:1080}}),baseline=await browser.newContext();
 const seed={hypothesisWordingVersion:'1',questionVersion:'D',scriptVersion:'C',theme:'dark',notes:{'s17:2':'Keep this note.','s2:3':'Old note.'},read:['summary'],checks:['day0-0'],attempts:[{id:'q0',correct:false}],missed:['q0'],moduleII:{read:['s17:2'],missed:[],attempts:[],practice:{},drafts:{'ci-glucose':'2.89'},hints:{}}};
 for(const c of [ctx,baseline])await c.addInitScript(s=>{if(!localStorage.getItem('bme423-studio-v1'))localStorage.setItem('bme423-studio-v1',JSON.stringify(s))},seed);
 await baseline.route(/hypothesis-wording(?:-v2-data)?\.js/,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 const p=await ctx.newPage(),b=await baseline.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await Promise.all([p.goto(base),b.goto(base)]);
 // Audit the actual render paths used by workspace, lecture pages, expanded
 // transcripts, practice, source solutions, and quiz explanations, in both
 // existing question editions. Compare every node except the verbal sentence.
 async function snapshot(page,version){return page.evaluate(version=>{
  state.hypothesisWordingVersion=version;const output={},box=document.createElement('div');let verbal=0;
  function take(key,html){box.innerHTML=html;verbal+=box.querySelectorAll('[data-hypothesis-words]').length;
   for(const n of box.querySelectorAll('[data-hypothesis-words]')){n.textContent='HYPOTHESIS SENTENCE';for(const a of [...n.attributes])if(a.name.startsWith('data-hypothesis-'))n.removeAttribute(a.name)}
   // Baseline Module II uses bare p elements for the same two verbal sentences.
   for(const n of box.querySelectorAll('.m2-hypotheses > p'))n.textContent='HYPOTHESIS SENTENCE';
   output[key]=box.innerHTML;
  }
  for(const qv of ['D','C']){state.questionVersion=qv;
   for(const problem of [...problemPool(),...NEURO_WORKED.problems])take(qv+':problem:'+problem.id,stepsHTML(problem));
   for(const key of Object.keys(VERSION_D.sources))take(qv+':source:'+key,sourceWorked(key));
   for(const q of questionPool())take(qv+':quiz:'+q.id,quizExplanation(q));
  }
  state.questionVersion='D';
  for(const sv of ['A','B','C']){state.scriptVersion=sv;for(const l of DATA.lessons)take(sv+':lesson:'+l.id,lessonText(l,l.refs[0].module,l.refs[0].page))}
  state.scriptVersion='C';
  for(const module of DATA.modules)for(const s of makeModuleSlides(module.id))take('slide:'+module.id+':'+s.page,lessonText(LES.get(s.topic),module.id,s.page));
  for(const c of M2.cases)take('moduleII:'+c.id,m2CaseHTML(c,true));
  for(const s of m2Module().slides)take('slide17:'+s.page,m2SlideText(s));
  return {output,verbal};
 },version)}
 const original=await snapshot(b,'1'),v1=await snapshot(p,'1'),v2=await snapshot(p,'2');
 assert.deepEqual(v1.output,original.output,'Version 1 must preserve all original render output');
 assert.deepEqual(v2.output,v1.output,'Version 2 may change only the dedicated hypothesis sentences');
 assert.equal(v2.verbal,v1.verbal);assert(v2.verbal>1500);
 // Every contextual lookup reaches the words renderer, including C wording.
 const audit=await p.evaluate(()=>{const issues=[];state.hypothesisWordingVersion='2';
  for(const qv of ['D','C']){state.questionVersion=qv;for(const [id,h] of Object.entries(HYPOTHESES.problems)){const html=hypothesisPair(h),r=BME_HYPOTHESIS_WORDING_V2[qv==='C'?'problemsC':'problems'][id];for(const key of ['nullWords','alternativeWords'])if(!html.includes(esc(r[key])))issues.push(qv+':'+id+':'+key)}}
  for(const [id,h] of Object.entries(HYPOTHESES.slides)){const html=hypothesisPair(h),r=BME_HYPOTHESIS_WORDING_V2.slides[id];if(!html.includes(esc(r.nullWords)))issues.push('slide:'+id)}
  for(const c of M2.cases.filter(c=>c.hypotheses)){if(!m2Hypotheses(c.hypotheses).includes(esc(BME_HYPOTHESIS_WORDING_V2.moduleII[c.id].nullWords)))issues.push(c.id)}
  return issues});assert.deepEqual(audit,[]);
 await p.evaluate(()=>{state.questionVersion='D';m2Case='ci-glucose';go('m2worked')});
 const control=p.getByLabel('Hypothesis wording',{exact:true});await control.selectOption('1');
 assert.match(await p.locator('.m2-hypotheses').innerText(),/placebo and drug populations have equal means/);
 const mathBefore=await p.locator('#content annotation').allTextContents();
 const note=p.locator('[data-note="m2-case:ci-glucose"]');await note.fill('Keep working here.');
 await control.selectOption('2');
 const text=await p.locator('.m2-hypotheses').innerText();assert.match(text,/Null hypothesis\./);assert.match(text,/Alternative hypothesis\./);assert.match(text,/fasting plasma glucose concentration/);assert.match(text,/pre-diabetic patients receiving placebo/);assert.match(text,/glucose-lowering drug/);
 assert.deepEqual(await p.locator('#content annotation').allTextContents(),mathBefore);assert.equal(await note.inputValue(),'Keep working here.');
 await p.locator('.m2-hypotheses').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/bme-hypothesis-v2-glucose.png'});
 await p.reload();assert.equal(await control.inputValue(),'2');
 await p.locator('#moduleNav [data-module="17"]').click();const slide=p.locator('details.lesson').nth(1);await slide.locator('summary').click();
 const prose=await slide.locator('[data-slide-lecture]').innerHTML(),open=await p.locator('details.lesson[open]').count();await control.selectOption('1');await control.selectOption('2');
 assert.equal(await slide.locator('[data-slide-lecture]').innerHTML(),prose);assert.equal(await p.locator('details.lesson[open]').count(),open);assert.equal(await slide.locator('[data-slide-lecture] p').count(),3);
 await p.locator('[data-module-view="expanded"]').click();await p.locator('#slideSelect').selectOption('1');
 assert.equal(await p.locator('.viewer-controls [data-hypothesis-wording-select]').count(),1);assert.equal(await p.locator('.topbar [data-hypothesis-wording-select]').count(),0);
 await p.getByLabel('Hypothesis wording',{exact:true}).selectOption('1');assert.match(await p.locator('.m2-hypotheses').innerText(),/The two population means are equal\./);
 await p.getByLabel('Hypothesis wording',{exact:true}).selectOption('2');assert.match(await p.locator('.m2-hypotheses').innerText(),/quantitative outcome measured in both groups/);
 assert(await p.locator('[data-reader-timer]').count());await p.locator('#exitViewer').click();
 await p.evaluate(()=>{selectedProblem='twot';go('worked')});assert.match(await p.locator('[data-hypothesis-words="null"]').first().innerText(),/cognitive assessment score after follow-up/);
 await p.evaluate(()=>openViewer(makeModuleSlides(8),21,true));assert(await p.locator('.viewer-controls [data-hypothesis-wording-select]').count());assert.match(await p.locator('.transcript').innerText(),/72 beats per minute/);await p.locator('#exitViewer').click();
 // Changing wording must not change quiz ordering, answers, or the current item.
 await p.evaluate(()=>startModuleIIQuiz('quick'));const quizBefore=await p.evaluate(()=>JSON.stringify(quiz));await p.getByLabel('Hypothesis wording',{exact:true}).selectOption('1');await p.getByLabel('Hypothesis wording',{exact:true}).selectOption('2');assert.equal(await p.evaluate(()=>JSON.stringify(quiz)),quizBefore);
 for(const theme of ['dark','light']){await p.setViewportSize({width:390,height:844});await p.evaluate(theme=>{state.theme=theme;state.side=true;m2Case='ci-glucose';go('m2worked')},theme);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.getByLabel('Hypothesis wording',{exact:true}).selectOption('1');await p.getByLabel('Hypothesis wording',{exact:true}).selectOption('2')}
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('bme423-studio-v1')));assert.equal(saved.notes['s17:2'],'Keep this note.');assert.equal(saved.notes['s2:3'],'Old note.');assert.equal(saved.notes['m2-case:ci-glucose'],'Keep working here.');assert.deepEqual(saved.read,['summary']);assert.deepEqual(saved.checks,['day0-0']);assert.equal(saved.attempts.length,1);assert.equal(saved.scriptVersion,'C');assert.equal(saved.questionVersion,'D');assert.deepEqual(errors,[]);
 console.log('PASS:',Object.keys(v2.output).length,'render paths identical outside hypothesis sentences;',v2.verbal,'verbal translations; all 216 D/C cases, 124 slide contexts and 17 Module II comparisons; unchanged notation, worked steps, tables, quiz state and saved progress; persistent selector, expanded readers, mobile light/dark.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
