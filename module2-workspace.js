// Module 2 uses the existing note IDs and quiz engine; its coverage is defined in module2-data.js.
const secondHalf = window.SECOND_HALF;
const secondModules = () => M.filter(m => secondHalf.modules.includes(m.id));
const secondQuestions = () => Q.filter(q => secondHalf.questions.some(current => current.id === q.id));
const secondTools = [['m2guide','What to know by the end'],['m2core','Must know · core review'],['m2experiments','Experiments to know'],['m2combined','Combined notes'],['m2test','Current practice test'],['m2lectures','Lecture quizzes'],['m2missed','Missed & uncertain'],['m2sources','Sources & coverage']];
const inSecondHalf = () => view.startsWith('m2') || (view==='module' && secondHalf.modules.includes(selected)) || (view==='quiz' && quiz?.kind.startsWith('m2'));
// Core review is a curated subset; guide coverage and practice alone do not confer a red marker.
for(const m of secondModules()){
 m.lectureNumber=secondHalf.lectureNumbers?.[m.id];
 if(m.lectureNumber)m.title=m.lectureNumber+' · '+m.title.replace(/^\d+ · /,'');
 for(const section of m.sections){
  const groups=(secondHalf.coreReview||[]).filter(g=>(g.module??6)===m.id&&g.pages.includes(section.page));
  const questions=secondQuestions().filter(q=>q.module===m.id&&q.page===section.page);
  section.examPriorityE={mustKnow:groups.length>0,guideTopic:groups.map(g=>g.title).join(' · '),questionIds:questions.map(q=>q.id),reasons:groups.length?['Selected essential distinction, finding, or experimental inference']:[]};
 }
}
const previousIsCore=isCoreE;
isCoreE=function(m,s){return secondHalf.modules.includes(m.id)?Boolean(s.examPriorityE?.mustKnow):previousIsCore(m,s)};
function secondCoreModule(){return {id:'m2-core-all',title:'Module 2 · Must know · core review',sections:secondModules().flatMap(m=>m.sections.filter(s=>s.examPriorityE?.mustKnow).map(s=>({...s,noteKey:m.id+':'+s.page,sourceTitle:m.title,previewLabel:m.title+' · '+s.title})))}}
const previousCoreFlag=isCoreE;
isCoreE=function(m,s){return m.id==='m2-core-all'?Boolean(s.examPriorityE?.mustKnow):previousCoreFlag(m,s)};
const previousExitExpanded=exitExpandedView;
exitExpandedView=function(){if(view==='m2coreExpanded'){view='m2core';render();window.scrollTo(0,0)}else previousExitExpanded()};
document.addEventListener('click',e=>{if(e.target.closest('[data-second-core-expand]')){view='m2coreExpanded';teachIndex=0;cover=false;render();window.scrollTo(0,0)}});
const previousReviewSource=reviewSource;
reviewSource=function(id,page){previousReviewSource(id,page);const m=moduleBy(id),section=m?.sections.find(s=>s.page===Number(page));if(section&&secondHalf.modules.includes(m.id))$('#modal').querySelector('h2')?.insertAdjacentHTML('afterend',priorityBadge(m,section))};
const priorNav = nav;
nav = function(){
 const allMissed=state.missed;try{state.missed=allMissed.filter(id=>!secondHalf.questions.some(q=>q.id===id));priorNav()}finally{state.missed=allMissed}
 if(inSecondHalf() && !state.examOneArchiveOpen) $('#moduleNav').querySelector?.('details')?.removeAttribute('open');
 $('#workspaceNav').innerHTML = `<button data-view="home" class="${view==='home'?'active':''}">Course overview</button><div class="label">Module 2 · Second half</div><div class="label">Your workspace</div>${secondTools.map(([id,title])=>`<button data-view="${id}" class="${view===id?'active':''}">${title}${id==='m2missed'?` · ${secondQuestions().filter(q=>state.missed.includes(q.id)).length}`:''}</button>`).join('')}<div class="label">Individual collections</div>${secondModules().map(m=>`<button data-module="${m.id}" class="${view==='module'&&selected===m.id?'active':''}"><span class="navnum">${esc(m.lectureNumber||'')}</span>${esc(m.title.replace(/^\d+ · /,''))}</button>`).join('')}`;
};
const priorHome = home;
home = function(){return priorHome().replace('<button class="primary" data-module="6">Study short-term memory</button>','<button class="primary" data-module="6">Study short-term memory</button><button data-view="m2test">Take the current practice test</button><button data-view="m2guide">Open the study guide</button>').replace('The existing 208 practice questions cover Exam 1. Short-term memory has no practice questions yet; use its notes and visual + transcript view for now.',`${secondQuestions().length} practice questions cover the ${secondModules().length} lecture currently available in Module 2. This is a growing course workspace. When you provide another lecture, its notes and review material can be added and the current test replaced with a revised cumulative test.`)};
const priorModuleScreen = moduleScreen;
moduleScreen = function(){return priorModuleScreen().replace('Current second-half material · No short-term memory practice questions have been added yet.','Current second-half material · Practice covers the lecture received so far.').replace(/<h2>Practice this collection<\/h2>/,'<h2>Practice this lecture</h2>')};
function secondScope(){return `<div class="notice" style="margin:18px 0"><strong>Current coverage:</strong> ${secondModules().map(m=>esc(m.title)).join(' · ')}. ${secondModules().length} lecture · ${secondQuestions().length} questions. Based on supplied lecture notes; no second-exam guide has been supplied. Review selections are study aids, not exam predictions.</div>`}
function secondSections(group){return secondModules().filter(m=>m.id===(group.module??6)).flatMap(m=>group.pages.map(page=>({m,s:m.sections.find(s=>s.page===page)})).filter(x=>x.s))}
function secondGuide(){return `<h1>What to know by the end</h1><p>Explain each concept, distinguish it from related ideas, and use the lecture evidence to support your answer.</p><div class="row"><button class="primary" data-view="m2test">Practice current coverage</button><button id="printEssentials">Print guide</button></div>${secondHalf.topics.map((t,i)=>`<details class="guide" open><summary>${esc(t.title)}</summary><p><label><input type="checkbox" data-essential-done="m2-${secondHalf.revision}-${i}" ${(state.essentialsDone||[]).includes(`m2-${secondHalf.revision}-${i}`)?'checked':''}> I can explain and apply these ideas</label></p>${secondSections(t).map(({m,s})=>`<h3>${esc(s.title)} ${priorityBadge(m,s)}</h3><ul>${s.bullets.map(b=>`<li>${b}</li>`).join('')}</ul><button class="tiny" data-source="${m.id}:${s.page}">Matching explanation + visual</button>`).join('')}</details>`).join('')}`}
function secondReview(groups){return noteTools()+groups.map(t=>`<details class="guide" open><summary>${esc(t.title)}</summary>${secondSections(t).map(({m,s})=>sectionHTML(m,s,m.sections.indexOf(s))).join('')}</details>`).join('')}
function secondTest(){return `<h1>Current practice test</h1><p>This test covers only the lectures available now. As new material is provided, replace this test with a revised cumulative set; retain the lecture notes and your progress.</p><div class="card"><h2>${secondQuestions().length}-question practice test</h2><p>Original practice questions with shuffled choices, immediate explanations, matching source visuals, and retries. This is not an instructor exam.</p><div class="row"><button class="primary" data-start="m2all">Start current test</button><button data-start="m2quick">10-question quick set</button></div></div>`}
function secondMissed(){const items=secondQuestions().filter(q=>state.missed.includes(q.id));return `<h1>Missed & uncertain</h1><p>${items.length} Module 2 questions queued. Exam 1 retries remain in the archive.</p>${items.length?`<button class="primary" data-start="m2missed">Retry current gaps</button>${items.map(q=>`<details class="guide"><summary>${esc(q.stem)}</summary><p>${esc(q.why)}</p><button data-source="${q.module}:${q.page}">Review matching notes</button></details>`).join('')}`:'<p>Take the current test to identify topics to revisit.</p><button data-view="m2test">Open practice test</button>'}`}
function secondScreen(){let content;
 switch(view){
 case 'm2guide':content=secondGuide();break;
 case 'm2coreExpanded':return `<div class="expanded-preview">${teach(secondCoreModule(),true)}</div>`;
 case 'm2core':content=`<h1>Must know · core review</h1><p>${secondCoreModule().sections.length} essential sections · Selected key distinctions, findings, and experimental designs. Supporting sections remain in the lecture and combined notes. The same red markers appear in lecture notes and visual/transcript views.</p><button class="primary" data-second-core-expand>Expand visual + transcript · all core review</button>`+secondReview(secondModules().map(m=>({module:m.id,title:m.title,pages:m.sections.filter(s=>s.examPriorityE?.mustKnow).map(s=>s.page)})));break;
 case 'm2experiments':content='<h1>Experiments to know</h1><p>Review the procedure, result, and inference for each study. Use “Teach this section” to open its visual and transcript.</p>'+secondReview(secondHalf.experiments);break;
 case 'm2combined':content='<h1>Combined teaching notes</h1>'+noteTools()+secondModules().map(m=>`<details class="guide" open><summary>${esc(m.title)}</summary>${header(m)}${m.sections.map((s,i)=>sectionHTML(m,s,i)).join('')}</details>`).join('');break;
 case 'm2test':content=secondTest();break;
 case 'm2lectures':content='<h1>Lecture quizzes</h1><div class="grid">'+secondModules().map(m=>`<div class="card"><h2>${esc(m.title)}</h2><p>${secondQuestions().filter(q=>q.module===m.id).length} questions</p><button data-start="m2lecture-${m.id}">Start lecture quiz</button><button data-module="${m.id}">Teaching notes</button></div>`).join('')+'</div>';break;
 case 'm2missed':content=secondMissed();break;
 default:content=`<h1>Sources & coverage</h1><p>All current Module 2 teaching material comes from the existing short-term memory lecture. The practice questions are authored from those notes and link to their source sections. The current edition mixes researcher-and-year interpretation, controlled experiment design, applications, and short relationship distinctions, based on your observations of Exam 1. Longer options include competing interpretations and common design confounds. This is a style adjustment, not a validated prediction of the next exam.</p>${secondModules().map(m=>`<div class="card"><h2>${esc(m.title)}</h2><p>${esc(m.file)} · ${m.sections.length} sections · ${secondQuestions().filter(q=>q.module===m.id).length} practice questions</p><button data-module="${m.id}">Open lecture</button></div>`).join('')}<h2>Adding the next lecture</h2><p>Provide the new lecture when available. We can add its notes, visuals, guide topics, core concepts, and experiments, then replace the current practice test with coverage of all lectures received so far. Existing notes remain attached to their original sections.</p><p>Working memory is introduced in the present lecture; a full separate working-memory lecture has not been supplied.</p><p class="quiet">Current practice edition: ${esc(secondHalf.revision)}. Previous test editions are replaced rather than presented as competing current tests.</p>`;
 }return '<span class="tag">MODULE 2 · SECOND HALF</span>'+secondScope()+content;
}
const priorRender = render;
render = function(){
 if(!view.startsWith('m2'))return priorRender();
 document.body.classList.toggle('expanded',view==='m2coreExpanded');nav();$('#content').innerHTML=secondScreen();document.querySelectorAll('[data-personal-note]').forEach(sizeNote);
 if(quiz&&!quiz.finished){const resume=document.createElement('button');resume.className='tiny';resume.textContent='Resume current practice set';resume.onclick=()=>{view='quiz';render();window.scrollTo(0,0)};$('#content').prepend(resume)}
};
const priorStartQuiz = startQuiz;
startQuiz = function(kind){
 if(kind.startsWith('module')&&secondHalf.modules.includes(selected))kind=kind==='module10'?'m2quick':'m2lecture-'+selected;
 if(kind==='missed'&&inSecondHalf())kind='m2missed';
 if(!kind.startsWith('m2'))return priorStartQuiz(kind);
 let pool=secondQuestions();if(kind==='m2missed')pool=pool.filter(q=>state.missed.includes(q.id));
 if(kind.startsWith('m2lecture-'))pool=pool.filter(q=>q.module===Number(kind.split('-')[1]));
 pool=shuffle(pool);if(kind==='m2quick')pool=pool.slice(0,10);
 if(!pool.length)return;
 quiz={items:prepareQuizItems(pool),index:0,answers:[],kind,finished:false};view='quiz';render();window.scrollTo(0,0);
};
const priorResults=results;
results=function(){return priorResults().replace('data-view="test"',`data-view="${quiz?.kind.startsWith('m2')?'m2test':'test'}"`)};
// Archive retries never draw from the current second-half bank.
const priorMissed=missed;
missed=function(){const all=state.missed;try{state.missed=all.filter(id=>!secondHalf.questions.some(q=>q.id===id));return priorMissed()}finally{state.missed=all}};
const secondAwareStart=startQuiz;
startQuiz=function(kind){if(kind==='missed'&&!inSecondHalf()){const all=state.missed;try{state.missed=all.filter(id=>!secondHalf.questions.some(q=>q.id===id));return secondAwareStart(kind)}finally{state.missed=all}}return secondAwareStart(kind)};
render();
