/* Module selection changes the workspace, without moving content or progress IDs. */
(() => {
 'use strict';
 if (window.PSYC301_FRIEND || new URL(location.href).searchParams.get('module') === 'ii') return;
 const params=new URL(location.href).searchParams;
 let active=2;
 try{active=Number(localStorage.getItem('psyc301-course-module'))||2}catch{}
 const requested=Number(params.get('courseModule') || params.get('pendingModule'));
 if([1,2,3].includes(requested))active=requested;
 if(![1,2,3].includes(active))active=2;
 const firstModules=()=>M.filter(m=>!secondHalf.modules.includes(m.id));
 const previousHome=home,previousNav=nav,previousRender=render;
 function moduleHome(){
  if(active===2)return previousHome();
  if(active===3)return '<div class="hero"><span class="tag">MODULE III</span><h1>Module III</h1><p>Module III materials have not been added yet.</p></div>';
  const lectures=firstModules(),total=lectures.reduce((n,m)=>n+m.sections.length,0),read=lectures.reduce((n,m)=>n+m.sections.filter(s=>state.read.includes(m.id+':'+s.page)).length,0);
  return `<div class="hero"><span class="tag">MODULE I · MIDTERM 1</span><h1>Perception, attention,<br>and language.</h1><p>Study the first-midterm collections, review their key experiments, and practice with the existing Midterm 1 questions.</p><div class="row"><button class="primary" data-module="${lectures[0].id}">Begin studying</button><button data-view="essentials">Open the study guide</button><button data-view="test">Take the current practice test</button></div></div><div class="grid"><div class="card"><span class="tag">CURRENT FOCUS</span><h2>Midterm 1</h2><p>${lectures.length} collections · ${total} source sections</p><p>${read} of ${total} sections marked read</p><button data-view="combined">Open combined notes</button></div><div class="card"><span class="tag">EXPERIMENTS & MODELS</span><h2>Explain what the evidence means</h2><div class="row"><button data-view="experiments">Experiments to know</button><button data-view="coreReview">Core review</button></div></div></div><h2>Midterm 1 · Individual collections</h2><div class="grid">${lectures.map(m=>`<div class="card"><h2>${esc(m.title)}</h2><p>${m.sections.length} source sections with existing teaching notes and practice.</p><button data-module="${m.id}">Open collection</button></div>`).join('')}</div>`;
 }
 home=moduleHome;
 nav=function(){
  previousNav();
  if(active===1){
   $('#workspaceNav').innerHTML='<div class="label">Your workspace · Midterm 1</div>'+workspace.filter(([id])=>id!=='home').map(([id,title])=>`<button data-view="${id}" class="${view===id?'active':''}">${esc(title)}</button>`).join('');
   $('#moduleNav').innerHTML='<div class="label">Individual collections</div>'+firstModules().map((m,i)=>`<button data-module="${m.id}" class="${view==='module'&&selected===m.id?'active':''}"><span class="navnum">${String(i+1).padStart(2,'0')}</span>${esc(m.title)}</button>`).join('');
  }else if(active===2){
   $('#moduleNav').innerHTML='';
  }else{
   $('#workspaceNav').innerHTML='';$('#moduleNav').innerHTML='';
  }
 };
 function sync(){
  document.body.dataset.psycCourseModule=String(active);
  const heading=document.querySelector('.topbar > div > small');
  if(heading)heading.textContent='PSYC301 / '+(active===1?'MIDTERM 1':active===2?'MIDTERM 2':'MODULE III');
  const url=new URL(location.href);url.searchParams.set('courseModule',String(active));url.searchParams.delete('pendingModule');history.replaceState(null,'',url);
  try{localStorage.setItem('psyc301-course-module',String(active))}catch{}
  // Keep a saved quiz intact, but offer its resume link only in its own module.
  const quizModule=quiz?.items?.length ? (secondHalf.modules.includes(quiz.items[0].module)?2:1) : active;
  if(active!==quizModule)document.querySelectorAll('#content button').forEach(b=>{if(b.textContent==='Resume current practice set')b.hidden=true});
 }
 render=function(){
  if(view!=='home'){
   if(view==='module')active=secondHalf.modules.includes(selected)?2:1;
   else if(view==='quiz'&&quiz?.items?.length)active=secondHalf.modules.includes(quiz.items[0].module)?2:1;
   else active=view.startsWith('m2')?2:1;
  }
  const result=previousRender.apply(this,arguments);sync();return result;
 };
 function open(id){
  if(![1,2,3].includes(id))return;
  active=id;view='home';mode='notes';backLink=null;
  if('speechSynthesis' in window)speechSynthesis.cancel();
  document.querySelectorAll('audio,video').forEach(media=>media.pause());
  render();window.scrollTo(0,0);$('#sidebar').scrollTop=0;$('#content').setAttribute('tabindex','-1');$('#content').focus({preventScroll:true});
 }
 window.PsycCourseFocus={active:()=>active,open};
 window.addEventListener('popstate',()=>{const n=Number(new URL(location.href).searchParams.get('courseModule'));if([1,2,3].includes(n))open(n)});
 // A module URL opens that module's overview. Existing notes and quiz snapshots stay stored.
 open(active);
})();
