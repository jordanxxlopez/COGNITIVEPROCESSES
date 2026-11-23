'use strict';
// Module III layer. Its collections, questions and Version 22 transcripts live in
// psyc301-module3-data.js (built by authoring/psyc301/module3/build.py). Module I and Module II data,
// version packs, note keys, read marks and quiz pools are not rewritten. Every wrapper below acts only on
// Module III collections or on views whose name starts with "m3", and passes everything else through.
(() => {
 const third=window.THIRD_PART;
 if(!third||typeof versionControl!=='function'||typeof sectionBullets!=='function')return;
 const ids=new Set(third.modules),groupIds=new Set(['m3-core-all','m3-experiments-all']);
 const V22='Version 22 · natural teaching notes with researchers and years';
 const thirdModules=()=>M.filter(m=>ids.has(m.id));
 const thirdQuestions=()=>Q.filter(q=>ids.has(q.module));
 const sourceId=(m,s)=>s.sourceModule??m.id;
 const first=()=>thirdModules()[0];
 const tools=[['m3guide','What to know by the end'],['m3core','Must know · core review'],['m3experiments','Experiments to know'],['m3combined','Combined notes'],['m3test','Current practice test'],['m3lectures','Lecture quizzes'],['m3missed','Missed & uncertain'],['m3sources','Sources & coverage']];
 const inThird=()=>view.startsWith('m3')||(view==='module'&&ids.has(selected))||(view==='quiz'&&Boolean(quiz?.items?.length)&&ids.has(quiz.items[0].module));

 // Collection numbers and must-know markers, set the same way Module II sets them.
 for(const m of thirdModules()){
  m.lectureNumber=third.lectureNumbers[m.id];
  m.title=m.lectureNumber+' · '+m.title.replace(/^\d+ · /,'');
  if(state.explanationVersions[m.id]===undefined)state.explanationVersions[m.id]='22';
  for(const s of m.sections){
   const groups=third.coreReview.filter(g=>g.module===m.id&&g.pages.includes(s.page));
   s.examPriorityE={mustKnow:groups.length>0,guideTopic:groups.map(g=>g.title).join(' · '),questionIds:Q.filter(q=>q.module===m.id&&q.page===s.page).map(q=>q.id),reasons:groups.length?['Selected essential distinction, finding, or experimental inference']:[]};
  }
 }

 // Versions: Original and Version 22. Later versions can be added here without touching Module II packs.
 const beforeControl=versionControl,beforeBullets=sectionBullets,beforeCore=isCoreE;
 const choice=id=>state.explanationVersions[id]==='A'?'A':'22';
 const plain=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
 const prose=t=>`<span class="psyc-v6-prose" data-v6-spoken="${esc(t.replace(/\*\*/g,''))}">${plain(t)}</span>`;
 versionControl=function(m){
  if(groupIds.has(m.id))return versionControl(first());
  if(!ids.has(m.id))return beforeControl(m);
  const now=choice(m.id);
  return `<label class="explanation-version">Explanation version <select data-explanation-version="${m.id}" aria-label="Explanation version for ${esc(m.title)}"><option value="A"${now==='A'?' selected':''}>Original</option><option value="22"${now==='22'?' selected':''}>${V22}</option></select></label>`;
 };
 sectionBullets=function(m,s){
  const id=sourceId(m,s);
  if(!ids.has(id))return beforeBullets(m,s);
  if(choice(id)==='A')return s.bullets;
  const script=third.v22[id+':'+s.page];
  if(!script)throw Error('Missing Module III Version 22 page '+id+':'+s.page);
  return script.map((b,i)=>(i?'':'<span class="psyc-v22-follow" hidden></span>')+prose(b.text)+(b.children.length?`<ul class="psyc-v10-sub">${b.children.map(c=>`<li>${prose(c)}</li>`).join('')}</ul>`:''));
 };
 isCoreE=function(m,s){return ids.has(sourceId(m,s))||groupIds.has(m.id)?Boolean(s.examPriorityE?.mustKnow):beforeCore(m,s)};
 document.addEventListener('change',event=>{
  const el=event.target;
  if(!el.matches('[data-explanation-version]'))return;
  const id=Number(el.dataset.explanationVersion);
  if(!ids.has(id)||!['A','22'].includes(el.value))return;
  event.stopImmediatePropagation();
  const scroll=window.scrollY;
  if('speechSynthesis'in window)window.speechSynthesis.cancel();
  state.explanationVersions[id]=el.value;save();render();window.scrollTo(0,scroll);
  document.querySelector('[data-explanation-version="'+id+'"]')?.focus({preventScroll:true});
 },true);

 // Collection page: Module III label in place of the archive label.
 const beforeModuleScreen=moduleScreen;
 moduleScreen=function(){
  const html=beforeModuleScreen();
  return ids.has(selected)?html.replace('MODULE 1 · EXAM 1 ARCHIVE','MODULE III').replace(/<h2>Practice this collection<\/h2>/,'<h2>Practice this lecture</h2>'):html;
 };

 const sectionsOf=group=>thirdModules().filter(m=>m.id===group.module).flatMap(m=>group.pages.map(page=>({m,s:m.sections.find(s=>s.page===page)})).filter(x=>x.s));
 const synthetic=(id,title,groups,label)=>({id,title,sections:groups.flatMap(g=>sectionsOf(g).map(({m,s})=>({...s,noteKey:m.id+':'+s.page,sourceModule:m.id,sourceTitle:m.title,previewLabel:label(g,m)+' · '+s.title})))});
 const coreGroups=()=>thirdModules().map(m=>({module:m.id,title:m.title,pages:m.sections.filter(s=>s.examPriorityE?.mustKnow).map(s=>s.page)}));
 const coreModule=()=>synthetic('m3-core-all','Module III · Must know · core review',coreGroups(),(g,m)=>m.title);
 const experimentModule=()=>synthetic('m3-experiments-all','Module III · Experiments to know',third.experiments,g=>g.title);
 const scope=()=>`<div class="notice" style="margin:18px 0"><strong>Current coverage:</strong> ${thirdModules().map(m=>esc(m.title)).join(' · ')}. ${thirdModules().length} lecture${thirdModules().length===1?'':'s'} · ${thirdQuestions().length} questions in the current pool.</div>`;
 const review=groups=>noteTools()+groups.map(t=>`<details class="guide" open><summary>${esc(t.title)}</summary>${sectionsOf(t).map(({m,s})=>sectionHTML(m,s,m.sections.indexOf(s))).join('')}</details>`).join('');
 const testSize=()=>Math.min(third.practiceTestSize,thirdQuestions().length);

 function home(){
  const lectures=thirdModules(),latest=lectures.at(-1);
  return `<div class="hero"><span class="tag">MODULE III</span><h1>Long-term memory.<br>What is stored, and how.</h1><p>Module III begins with the structure of long-term memory. Original slides sit beside teaching explanations, personal notes, and practice. More lectures are added here as they arrive.</p><div class="row"><button class="primary" data-module="${latest.id}">Study ${esc(latest.title.replace(/^\d+ · /,''))}</button><button data-view="m3test">Take the current practice test</button><button data-view="m3guide">Open the study guide</button></div></div><div class="grid">${lectures.map(m=>{const read=m.sections.filter(s=>state.read.includes(m.id+':'+s.page)).length;return `<div class="card"><span class="tag">COLLECTION ${esc(m.lectureNumber)}</span><h2>${esc(m.title.replace(/^\d+ · /,''))}</h2><p>${m.sections.length} sections with teaching notes, original visuals, and personal notes.</p><p>${read} of ${m.sections.length} sections marked read</p><button class="primary" data-module="${m.id}">Open collection ${esc(m.lectureNumber)}</button></div>`}).join('')}<div class="card"><span class="tag">EXPERIMENTS & PATIENTS</span><h2>Explain what the evidence means</h2><div class="row"><button data-view="m3experiments">Experiments to know</button><button data-view="m3core">Core review</button></div></div></div><div class="notice" style="margin-top:18px">${thirdQuestions().length} practice questions in the current pool, each linked to its source slide.</div>`;
 }
 function navigation(){
  $('#workspaceNav').innerHTML=`<div class="label">Your workspace · Module III</div>${tools.map(([id,title])=>`<button data-view="${id}" class="${view===id?'active':''}">${title}${id==='m3missed'?` · ${thirdQuestions().filter(q=>state.missed.includes(q.id)).length}`:''}</button>`).join('')}`;
  $('#moduleNav').innerHTML='<div class="label">Individual collections</div>'+thirdModules().map(m=>`<button data-module="${m.id}" class="${view==='module'&&selected===m.id?'active':''}"><span class="navnum">${esc(m.lectureNumber)}</span>${esc(m.title.replace(/^\d+ · /,''))}</button>`).join('');
 }
 function screen(){
  let content;
  switch(view){
  case 'm3guide':content=`<h1>What to know by the end</h1><p>Explain each concept, distinguish it from related ideas, and use the evidence to support your answer.</p><div class="row"><button class="primary" data-view="m3test">Practice current coverage</button><button id="printEssentials">Print guide</button></div>${third.topics.map(t=>`<details class="guide" open><summary>${esc(t.title)}</summary><p><label><input type="checkbox" data-essential-done="${t.progressKey}" ${(state.essentialsDone||[]).includes(t.progressKey)?'checked':''}> I can explain and apply these ideas</label></p>${sectionsOf(t).map(({m,s})=>`<h3>${esc(s.title)} ${priorityBadge(m,s)}</h3><ul>${sectionBullets(m,s).map(b=>`<li>${b}</li>`).join('')}</ul><button class="tiny" data-source="${m.id}:${s.page}">Matching explanation + visual</button>`).join('')}</details>`).join('')}`;break;
  case 'm3coreExpanded':return `<div class="expanded-preview">${teach(coreModule(),true)}</div>`;
  case 'm3experimentsExpanded':return `<div class="expanded-preview">${teach(experimentModule(),true)}</div>`;
  case 'm3core':content=`<h1>Must know · core review</h1><p>${coreModule().sections.length} essential sections · Selected key distinctions, findings, and experimental designs. Supporting sections remain in the lecture and combined notes.</p><button class="primary" data-third-expand="m3coreExpanded" data-index="0">Expand visual + transcript · all core review</button>`+review(coreGroups());break;
  case 'm3experiments':{let offset=0;content='<h1>Experiments to know</h1><p>Procedures, results, and explanations, each tied to its researchers and year.</p><button class="primary" data-third-expand="m3experimentsExpanded" data-index="0">Expand visual + transcript · all experiments</button>'+noteTools()+third.experiments.map(group=>{const index=offset;offset+=sectionsOf(group).length;return `<details class="guide" open><summary>${esc(group.title)}</summary><button data-third-expand="m3experimentsExpanded" data-index="${index}">Expand visual + transcript</button>${sectionsOf(group).map(({m,s})=>sectionHTML(m,s,m.sections.indexOf(s))).join('')}</details>`}).join('');break;}
  case 'm3combined':content='<h1>Combined teaching notes</h1>'+noteTools()+thirdModules().map(m=>`<details class="guide" open><summary>${esc(m.title)}</summary>${header(m)}${m.sections.map((s,i)=>sectionHTML(m,s,i)).join('')}</details>`).join('');break;
  case 'm3test':content=`<h1>Current practice test</h1><p>${testSize()} questions across the current Module III lectures. Question order and answer choices are shuffled for each set.</p><div class="card"><h2>${testSize()}-question practice test</h2><p>Every response gets a correct or incorrect indicator, an explanation, and a link to its notes.</p><div class="row"><button class="primary" data-start="m3all">Start current test</button><button data-start="m3quick">10-question quick set</button></div></div>`;break;
  case 'm3lectures':content='<h1>Lecture quizzes</h1><div class="grid">'+thirdModules().map(m=>`<div class="card"><h2>${esc(m.title)}</h2><p>${thirdQuestions().filter(q=>q.module===m.id).length} questions</p><button data-start="m3lecture-${m.id}">Start lecture quiz</button><button data-module="${m.id}">Teaching notes</button></div>`).join('')+'</div>';break;
  case 'm3missed':{const items=thirdQuestions().filter(q=>state.missed.includes(q.id));content=`<h1>Missed & uncertain</h1><p>${items.length} Module III questions queued.</p>${items.length?`<button class="primary" data-start="m3missed">Retry current gaps</button>${items.map(q=>`<details class="guide"><summary>${esc(q.stem)}</summary><p>${esc(q.why)}</p><button class="tiny" data-source="${q.module}:${q.page}">Matching explanation + visual</button></details>`).join('')}`:'<p>No missed or uncertain Module III questions yet.</p>'}`;break;}
  default:content=`<h1>Sources & coverage</h1><p>Module III teaching material comes from the supplied lecture slides. Every original slide is shown in source order, including title and divider pages. The practice questions are authored from the notes and link to their source sections. They are study material, not a prediction of the exam.</p>${thirdModules().map(m=>`<div class="card"><h2>${esc(m.title)}</h2><p>${esc(m.file)} · ${m.sections.length} sections · ${thirdQuestions().filter(q=>q.module===m.id).length} practice questions</p><button data-module="${m.id}">Open lecture</button>${m.sourcePdf?` <a href="${esc(m.sourcePdf)}" target="_blank" rel="noopener">Original lecture PDF</a>`:''}</div>`).join('')}<p class="quiet">Current edition: ${esc(third.revision)}.</p>`;
  }
  return '<span class="tag">MODULE III</span>'+scope()+(['m3guide','m3core','m3experiments','m3combined'].includes(view)?versionControl(first()):'')+content;
 }

 const expandedViews=['m3coreExpanded','m3experimentsExpanded'];
 const beforeRender=render;
 render=function(){
  if(!view.startsWith('m3'))return beforeRender();
  document.body.classList.toggle('expanded',expandedViews.includes(view));
  nav();$('#content').innerHTML=screen();document.querySelectorAll('[data-personal-note]').forEach(sizeNote);
  if(quiz&&!quiz.finished&&!expandedViews.includes(view)&&ids.has(quiz.items[0]?.module)){const resume=document.createElement('button');resume.className='tiny';resume.textContent='Resume current practice set';resume.onclick=()=>{view='quiz';render();window.scrollTo(0,0)};$('#content').prepend(resume)}
 };
 const beforeExit=exitExpandedView;
 exitExpandedView=function(){if(expandedViews.includes(view)){view=view==='m3coreExpanded'?'m3core':'m3experiments';render();window.scrollTo(0,0)}else beforeExit()};
 document.addEventListener('click',e=>{
  const expand=e.target.closest('[data-third-expand]');
  if(expand){view=expand.dataset.thirdExpand;teachIndex=Number(expand.dataset.index)||0;cover=false;render();window.scrollTo(0,0)}
 });
 document.addEventListener('keydown',e=>{
  if(!expandedViews.includes(view)||!$('#modal').classList.contains('hidden'))return;
  if(e.key==='Escape'){exitExpandedView();return}
  if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;
  const count=(view==='m3coreExpanded'?coreModule():experimentModule()).sections.length;
  if(e.key==='ArrowRight'&&teachIndex<count-1){e.preventDefault();teachIndex++;cover=false;render()}
  if(e.key==='ArrowLeft'&&teachIndex>0){e.preventDefault();teachIndex--;cover=false;render()}
 });

 // Quizzes: Module III sets draw only from Module III questions, and earlier modules never draw from them.
 const withoutThird=run=>{const all=state.missed;try{state.missed=all.filter(id=>!thirdQuestions().some(q=>q.id===id));return run()}finally{state.missed=all}};
 const beforeStart=startQuiz;
 startQuiz=function(kind){
  if(kind.startsWith('module')&&ids.has(selected))kind=kind==='module10'?'m3quick':'m3lecture-'+selected;
  if(kind==='missed'&&inThird())kind='m3missed';
  if(!kind.startsWith('m3'))return kind==='missed'?withoutThird(()=>beforeStart(kind)):beforeStart(kind);
  let pool=shuffle(thirdQuestions());
  if(kind==='m3missed')pool=pool.filter(q=>state.missed.includes(q.id));
  else if(kind.startsWith('m3lecture-'))pool=pool.filter(q=>q.module===Number(kind.split('-')[1])).slice(0,third.lectureQuizSize);
  else pool=pool.slice(0,kind==='m3quick'?10:third.practiceTestSize);
  if(!pool.length)return;
  quiz={items:prepareQuizItems(pool),index:0,answers:[],kind,finished:false};view='quiz';render();window.scrollTo(0,0);
 };
 const beforeResults=results;
 results=function(){const html=beforeResults();return quiz?.kind.startsWith('m3')?html.replace(/data-view="(m2)?test"/,'data-view="m3test"'):html};
 const beforeMissed=missed;
 missed=function(){return withoutThird(beforeMissed)};
 const beforeNav=nav;
 nav=function(){return withoutThird(beforeNav)};

 window.PsycModule3={ids,home,nav:navigation,inThird};
 render();
})();
