'use strict';
// Module I layer. Module I keeps its own notes (Original and Versions B to E). This script adds the numbered
// note Versions that Modules II and III offer to the same menu, on the collection pages.
// Data: psyc301-module1-data.js (authoring/psyc301/module1/build.py).
(() => {
 const first=window.FIRST_PART;
 if(!first||typeof versionControl!=='function'||typeof sectionBullets!=='function')return;
 const ids=new Set(first.modules);
 const offered=id=>first.available[id]||[];
 const chosen=id=>offered(id).includes(String(state.explanationVersions[id]))?String(state.explanationVersions[id]):null;
 const plain=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
 const prose=t=>`<span class="psyc-v6-prose" data-v6-spoken="${esc(t.replace(/\*\*/g,''))}">${plain(t)}</span>`;
 const FOLLOW={'21':'<span class="psyc-v21-follow" hidden></span>','22':'<span class="psyc-v22-follow" hidden></span>'};
 const beforeControl=versionControl,beforeBullets=sectionBullets;
 versionControl=function(m){
  const base=beforeControl(m);
  if(!ids.has(m.id))return base;
  const now=chosen(m.id);
  const extra=offered(m.id).map(k=>`<option value="${k}"${k===now?' selected':''}>${esc(first.versions[k])}</option>`).join('');
  if(base)return (now?base.replace('<option value="A" selected>','<option value="A" >'):base).replace('</select>',extra+'</select>');
  return `<label class="explanation-version">Explanation version <select data-explanation-version="${m.id}" aria-label="Explanation version for ${esc(m.title)}"><option value="A"${now?'':' selected'}>Original</option>${extra}</select></label>`;
 };
 sectionBullets=function(m,s){
  const id=s.sourceModule??m.id;
  const now=view==='module'&&ids.has(id)?chosen(id):null;
  const script=now&&first.scripts[now]?.[id+':'+s.page];
  if(!script||!script.length)return beforeBullets(m,s);
  return script.map((b,i)=>(i?'':(FOLLOW[now]||''))+prose(b.text)+(b.children.length?`<ul class="psyc-v10-sub">${b.children.map(c=>`<li>${prose(c)}</li>`).join('')}</ul>`:''));
 };
 // The page's own handler keeps only Original and B to E. Numbered choices, and Original on a collection
 // that has no B to E, are stored here.
 document.addEventListener('change',event=>{
  const el=event.target;
  if(!el.matches('[data-explanation-version]'))return;
  const id=Number(el.dataset.explanationVersion);
  if(!ids.has(id))return;
  const lettered=typeof versionBModules!=='undefined'&&versionBModules.has(id);
  if(!offered(id).includes(el.value)&&lettered)return;
  event.stopImmediatePropagation();
  const scroll=window.scrollY;
  if('speechSynthesis'in window)window.speechSynthesis.cancel();
  state.explanationVersions[id]=offered(id).includes(el.value)?el.value:'A';
  save();render();window.scrollTo(0,scroll);
  document.querySelector('[data-explanation-version="'+id+'"]')?.focus({preventScroll:true});
 },true);
 // Question wordings. Module I quizzes get the same Original, College-Level and Simplified choice as Modules II
 // and III, stored under the same key, so one choice covers every module. The Original bank is snapshotted
 // and never edited: the chosen wording is swapped into the same question objects.
 const QV=first.questionVersions||{};
 const KEY='psyc301-m2-question-version';
 const LABELS={original:'Original',college:'College-Level',simple:'Simplified'};
 const NOTES={original:'The original question bank, unchanged.',college:'Same difficulty as the original, rewritten so every question stands on its own.',simple:'Same ideas, asked more directly, with fewer application scenarios.'};
 const mine=typeof Q==='undefined'?[]:Q.filter(q=>QV[q.id]&&ids.has(q.module));
 const originals=new Map(mine.map(q=>[q.id,{stem:q.stem,options:[...q.options],correct:q.correct,why:q.why}]));
 let wording='original';
 try{const saved=localStorage.getItem(KEY);if(saved&&LABELS[saved])wording=saved}catch{}
 const textFor=(id,version)=>{const base=originals.get(id),alt=version==='original'?null:QV[id]?.[version];return alt&&alt.options?.length===4&&alt.correct===base.correct?{stem:alt.stem,options:alt.options,why:alt.why||base.why}:base};
 function applyWording(version){
  wording=version;
  for(const q of mine){const t=textFor(q.id,version);q.stem=t.stem;q.options=[...t.options];q.why=t.why}
  // A set in progress keeps its order and answers; only the wording changes.
  if(typeof quiz!=='undefined'&&quiz&&quiz.items&&!String(quiz.kind||'').startsWith('m2'))for(const item of quiz.items){if(!originals.has(item.id))continue;const t=textFor(item.id,version);item.stem=t.stem;item.options=[...t.options];item.why=t.why}
 }
 const firstOpen=()=>!window.PsycCourseFocus||window.PsycCourseFocus.active()===1;
 function wantsWording(){
  if(typeof view==='undefined'||!mine.length)return false;
  if(view==='quiz')return Boolean(typeof quiz!=='undefined'&&quiz&&quiz.items&&quiz.items.length&&!String(quiz.kind||'').startsWith('m2')&&originals.has(quiz.items[0].id));
  if(!firstOpen())return false;
  if(['test','lectureQuizzes','missed'].includes(view))return true;
  return view==='module'&&typeof mode!=='undefined'&&mode==='quiz'&&ids.has(selected);
 }
 const wordingControl=()=>'<div class="m2-qversion" role="group" aria-label="Question version"><label for="m2QuestionVersion"><strong>Question version</strong></label> <select id="m2QuestionVersion">'+Object.entries(LABELS).map(([k,label])=>'<option value="'+k+'"'+(k===wording?' selected':'')+'>'+label+'</option>').join('')+'</select> <span class="quiet">'+NOTES[wording]+'</span></div>';
 const beforeRender=render;
 render=function(){
  const result=beforeRender.apply(this,arguments);
  try{const host=document.querySelector('#content');if(host&&wantsWording()&&!host.querySelector('.m2-qversion'))host.insertAdjacentHTML('afterbegin',wordingControl())}catch{}
  return result;
 };
 // Runs before the shared handler, which stores the choice, applies it to Modules II and III and redraws.
 document.addEventListener('change',event=>{
  if(event.target?.id!=='m2QuestionVersion'||!LABELS[event.target.value])return;
  applyWording(event.target.value);
  if(!window.PsycQuestionVersions){try{localStorage.setItem(KEY,event.target.value)}catch{}render()}
 },true);
 applyWording(wording);
 window.PsycModule1={ids,wording:()=>wording};
})();
