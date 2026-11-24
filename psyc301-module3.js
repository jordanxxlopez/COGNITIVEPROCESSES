'use strict';
// Module III layer. Module III uses the same workspace, tools and layout as Module II: the Module II
// views (m2guide, m2ask, m2qabank, m2cards, m2contrasts, m2explain, m2core, m2experiments, m2videos,
// m2combined, m2testbank, m2test, m2lectures, m2missed, m2sources) read their coverage from
// window.SECOND_HALF every time they draw. While Module III is open, this script points that coverage at
// the Module III lectures, questions, topics, core review and experiments, and puts the Module II
// coverage back when another module is opened. No Module I or Module II data is rewritten: note keys,
// read marks, quiz pools and version packs stay as they were.
// Data: psyc301-module3-data.js and psyc301-module3-aids-data.js (authoring/psyc301/module3/build.py).
(() => {
 const third=window.THIRD_PART,second=window.SECOND_HALF;
 if(!third||!second||typeof secondScreen!=='function'||typeof versionControl!=='function')return;
 const ids=new Set(third.modules);
 const KEYS=['modules','questions','topics','coreReview','experiments','practiceTestSize','lectureQuizSize','revision'];
 const bundle={2:Object.fromEntries(KEYS.map(k=>[k,second[k]])),3:Object.fromEntries(KEYS.map(k=>[k,third[k]]))};
 const secondIds=new Set(bundle[2].modules);
 Object.assign(second.lectureNumbers,third.lectureNumbers);
 let scope=2;
 function setScope(n){n=n===3?3:2;if(n===scope)return;scope=n;Object.assign(second,bundle[n])}
 const moduleOf=id=>ids.has(id)?3:secondIds.has(id)?2:1;
 const thirdModules=()=>M.filter(m=>ids.has(m.id));
 const first=()=>thirdModules()[0];
 const sourceId=(m,s)=>s.sourceModule??m.id;

 // Collection numbers and must-know markers, set the same way Module II sets them.
 for(const m of thirdModules()){
  m.lectureNumber=third.lectureNumbers[m.id];
  m.title=m.lectureNumber+' · '+m.title.replace(/^\d+ · /,'');
  if(!third.versions[state.explanationVersions[m.id]])state.explanationVersions[m.id]='22';
  for(const s of m.sections){
   const groups=third.coreReview.filter(g=>g.module===m.id&&g.pages.includes(s.page));
   s.examPriorityE={mustKnow:groups.length>0,guideTopic:groups.map(g=>g.title).join(' · '),questionIds:third.questions.filter(q=>q.module===m.id&&q.page===s.page).map(q=>q.id),reasons:groups.length?['Selected essential distinction, finding, or experimental inference']:[]};
  }
 }

 // Note versions for Module III collections.
 const beforeControl=versionControl,beforeBullets=sectionBullets;
 const choice=id=>third.versions[state.explanationVersions[id]]?state.explanationVersions[id]:'22';
 const plain=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
 const prose=t=>`<span class="psyc-v6-prose" data-v6-spoken="${esc(t.replace(/\*\*/g,''))}">${plain(t)}</span>`;
 const FOLLOW={'21':'<span class="psyc-v21-follow" hidden></span>','22':'<span class="psyc-v22-follow" hidden></span>'};
 function control(m){
  const now=choice(m.id);
  return `<label class="explanation-version">Explanation version <select data-explanation-version="${m.id}" aria-label="Explanation version for ${esc(m.title)}">${['A','20','21','22'].filter(k=>third.versions[k]).map(k=>[k,third.versions[k]]).map(([k,label])=>`<option value="${k}"${k===now?' selected':''}>${esc(label)}</option>`).join('')}</select></label>`;
 }
 versionControl=function(m){
  if(ids.has(m.id))return control(m);
  // Workspace pages ask for one shared control; in Module III that is the Module III control.
  return scope===3?control(first()):beforeControl(m);
 };
 sectionBullets=function(m,s){
  const id=sourceId(m,s);
  if(!ids.has(id))return beforeBullets(m,s);
  const now=choice(id);
  if(now==='A')return s.bullets;
  const script=third.scripts[now]?.[id+':'+s.page];
  if(!script)throw Error('Missing Module III Version '+now+' page '+id+':'+s.page);
  return script.map((b,i)=>(i?'':(FOLLOW[now]||''))+prose(b.text)+(b.children.length?`<ul class="psyc-v10-sub">${b.children.map(c=>`<li>${prose(c)}</li>`).join('')}</ul>`:''));
 };
 document.addEventListener('change',event=>{
  const el=event.target;
  if(!el.matches('[data-explanation-version]'))return;
  const id=Number(el.dataset.explanationVersion);
  if(!ids.has(id)||!third.versions[el.value])return;
  event.stopImmediatePropagation();
  const scroll=window.scrollY;
  if('speechSynthesis'in window)window.speechSynthesis.cancel();
  state.explanationVersions[id]=el.value;save();render();window.scrollTo(0,scroll);
  document.querySelector('[data-explanation-version="'+id+'"]')?.focus({preventScroll:true});
 },true);

 // The shared screens name Module 2 in a few labels. In Module III those labels name Module III.
 const relabel=html=>scope!==3||typeof html!=='string'?html:html
  .replaceAll('MODULE 2 · SECOND HALF','MODULE III').replaceAll('MODULE 2 · TEST BANK','MODULE III · TEST BANK')
  .replaceAll('Module 2 · Must know','Module III · Must know').replaceAll('Module 2 · Experiments','Module III · Experiments')
  .replaceAll('all current Module 2 lectures','all current Module III lectures').replace('. 1 lectures · ','. 1 lecture · ').replaceAll('Module 2 questions queued. Exam 1 retries remain in the archive.','Module III questions queued.');
 const sources=()=>`<h1>Sources & coverage</h1><p>Module III teaching material comes from the supplied lecture slides. Every original slide is shown in source order, including title and divider pages. The practice questions are written from the notes and link to their source slides. The Test Bank questions come from the supplied Goldstein question bank. Practice questions are study material and are not a prediction of the exam.</p>${thirdModules().map(m=>`<div class="card"><h2>${esc(m.title)}</h2><p>${esc(m.file)} · ${m.sections.length} sections · ${third.questions.filter(q=>q.module===m.id).length} practice questions</p><button data-module="${m.id}">Open lecture</button>${m.sourcePdf?` <a href="${esc(m.sourcePdf)}" target="_blank" rel="noopener">Original lecture PDF</a>`:''}</div>`).join('')}<p class="quiet">Current edition: ${esc(third.revision)}.</p>`;
 const beforeScreen=secondScreen;
 secondScreen=function(){
  if(scope===3&&view==='m2sources')return '<span class="tag">MODULE III</span>'+secondScope()+sources();
  return relabel(beforeScreen.apply(this,arguments));
 };
 const beforeModuleScreen=moduleScreen;
 moduleScreen=function(){return relabel(beforeModuleScreen.apply(this,arguments))};

 function home(){
  const lectures=thirdModules(),latest=lectures.at(-1),count=third.questions.length;
  return `<div class="hero"><span class="tag">MODULE III</span><h1>Long-term memory.<br>What is stored, and how.</h1><p>Module III begins with the structure of long-term memory. Original slides sit beside teaching explanations, personal notes, and practice. More lectures are added here as they arrive.</p><div class="row"><button class="primary" data-module="${latest.id}">Study ${esc(latest.title.replace(/^\d+ · /,''))}</button><button data-view="m2test">Take the current practice test</button><button data-view="m2guide">Open the study guide</button></div></div><div class="grid">${lectures.map(m=>{const read=m.sections.filter(s=>state.read.includes(m.id+':'+s.page)).length;return `<div class="card"><span class="tag">COLLECTION ${esc(m.lectureNumber)}</span><h2>${esc(m.title.replace(/^\d+ · /,''))}</h2><p>${m.sections.length} sections with teaching notes, original visuals, and personal notes.</p><p>${read} of ${m.sections.length} sections marked read</p><button class="primary" data-module="${m.id}">Open collection ${esc(m.lectureNumber)}</button></div>`}).join('')}<div class="card"><span class="tag">EXPERIMENTS & PATIENTS</span><h2>Explain what the evidence means</h2><div class="row"><button data-view="m2cards">Experiment cards</button><button data-view="m2contrasts">Side-by-side contrasts</button><button data-view="m2qabank">Q&amp;A</button></div></div></div><div class="notice" style="margin-top:18px">${count} practice questions in the current pool, each linked to its source slide. New lectures are added to the test as they arrive.</div>`;
 }

 // Missed questions from the module that is not open never count toward the open module or the archive.
 const otherIds=()=>new Set(bundle[scope===3?2:3].questions.map(q=>q.id));
 const withoutOther=run=>{const all=state.missed,other=otherIds();try{state.missed=all.filter(id=>!other.has(id));return run()}finally{state.missed=all}};
 const beforeNav=nav;nav=function(){return withoutOther(beforeNav)};
 const beforeMissed=missed;missed=function(){return withoutOther(beforeMissed)};
 const beforeStart=startQuiz;startQuiz=function(kind){return kind==='missed'?withoutOther(()=>beforeStart(kind)):beforeStart(kind)};

 window.PsycModule3={ids,home,moduleOf,setScope,scope:()=>scope};
})();
