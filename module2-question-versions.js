'use strict';
// Module 2 question versions. The original bank in module2-data.js is never edited:
// its text is snapshotted here, and the chosen version is swapped into the same
// question objects (same id, same correct index), so lecture quizzes, the practice
// test, quick sets and missed retries all follow the selected version.
(()=>{
 const V=window.M2_QUESTION_VERSIONS;
 if(!V||!window.SECOND_HALF)return;
 const KEY='psyc301-m2-question-version';
 const LABELS={original:'Original',college:'College-Level',simple:'Simplified'};
 const NOTES={original:'The original question bank, unchanged.',
  college:'Same difficulty as the original, rewritten so every question stands on its own.',
  simple:'Same ideas, asked more directly, with fewer application scenarios.'};
 const fields=['stem','options','correct','why'];
 const originals=new Map(window.SECOND_HALF.questions.map(q=>[q.id,Object.fromEntries(fields.map(f=>[f,Array.isArray(q[f])?[...q[f]]:q[f]]))]));
 let current='original';
 try{const saved=localStorage.getItem(KEY);if(saved&&LABELS[saved])current=saved}catch(e){}
 function textFor(id,version){
  const base=originals.get(id);
  const alt=version==='original'?null:V[id]?.[version];
  return alt&&alt.options?.length===4&&alt.correct===base.correct?{...base,...alt,options:[...alt.options]}:base;
 }
 function apply(version){
  current=version;
  for(const q of window.SECOND_HALF.questions){const t=textFor(q.id,version);for(const f of fields)q[f]=Array.isArray(t[f])?[...t[f]]:t[f]}
  // A set in progress keeps its order and answers; only the wording changes.
  if(typeof quiz!=='undefined'&&quiz&&quiz.items&&String(quiz.kind||'').startsWith('m2')){
   for(const item of quiz.items){if(!originals.has(item.id))continue;const t=textFor(item.id,version);item.stem=t.stem;item.options=[...t.options];item.why=t.why}
  }
 }
 function control(){
  return '<div class="m2-qversion" role="group" aria-label="Question version"><label for="m2QuestionVersion"><strong>Question version</strong></label> '
   +'<select id="m2QuestionVersion">'+Object.entries(LABELS).map(([k,v])=>'<option value="'+k+'"'+(k===current?' selected':'')+'>'+v+'</option>').join('')+'</select>'
   +' <span class="quiet">'+NOTES[current]+'</span></div>';
 }
 const P=window.M2_QUESTION_PRIORITY;
 function likelyCard(){
  return '<div class="card m2-likely"><h2>Most likely 50</h2><p>The 50 questions ranked highest by the study-priority model: must-know pages, named experiments with researcher and year, slides that state a result or conclusion, reported numbers, and how many slides a topic gets. Equal share per lecture. It ranks study priority within this bank; it is not a validated forecast of exam questions.</p><button class="primary" data-start="m2likely">Start most likely 50</button></div>';
 }
 if(P&&typeof startQuiz==='function'){
  const priorStart=startQuiz;
  startQuiz=function(kind){
   if(kind!=='m2likely')return priorStart.apply(this,arguments);
   const ids=new Set(P.likely50);
   const pool=shuffle(window.SECOND_HALF.questions.filter(q=>ids.has(q.id)));
   if(!pool.length)return;
   quiz={items:prepareQuizItems(pool),index:0,answers:[],kind:'m2likely',finished:false};
   view='quiz';render();window.scrollTo(0,0);
  };
 }
 const QUIZ_VIEWS=new Set(['m2lectures','m2test','m2missed','m2quick']);
 function wants(){
  if(typeof view==='undefined')return false;
  if(QUIZ_VIEWS.has(view))return true;
  if(view==='quiz'&&typeof quiz!=='undefined'&&quiz&&String(quiz.kind||'').startsWith('m2'))return true;
  return false;
 }
 const priorRender=render;
 render=function(){
  const r=priorRender.apply(this,arguments);
  try{
   const host=document.querySelector('#content');
   if(host&&wants()&&!host.querySelector('.m2-qversion'))host.insertAdjacentHTML('afterbegin',control());
   if(host&&P&&view==='m2test'&&!host.querySelector('.m2-likely'))host.querySelector('.m2-qversion')?.insertAdjacentHTML('afterend',likelyCard());
  }catch(e){}
  return r;
 };
 document.addEventListener('change',e=>{
  if(e.target&&e.target.id==='m2QuestionVersion'){
   const v=e.target.value;if(!LABELS[v])return;
   try{localStorage.setItem(KEY,v)}catch(err){}
   apply(v);render();
  }
 });
 const style=document.createElement('style');
 style.textContent='.m2-qversion{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:0 0 18px;padding:10px 14px;border:1px solid var(--line,#d9dde3);border-radius:10px;background:var(--panel,#ffffff99)}.m2-qversion select{font:inherit;padding:5px 8px;border-radius:8px}.m2-qversion .quiet{font-size:.85rem}';
 document.head.appendChild(style);
 window.PsycQuestionVersions={apply,get current(){return current},labels:LABELS};
 apply(current);
 if(current!=='original'&&typeof render==='function')render();
})();
