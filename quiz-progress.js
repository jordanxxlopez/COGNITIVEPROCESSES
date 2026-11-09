'use strict';
// Stable, version-independent storage names. Full question snapshots preserve wording,
// randomized choices, answer keys, answers, and position across later bank updates.
(()=>{
 const KEY='psyc301-quiz-sessions',BACKUP=KEY+'-backup';
 const copy=x=>JSON.parse(JSON.stringify(x));
 const valid=q=>q&&typeof q.kind==='string'&&Array.isArray(q.items)&&q.items.length&&Number.isInteger(q.index)&&q.index>=0&&q.index<q.items.length&&Array.isArray(q.answers)&&q.items.every(x=>x&&Array.isArray(x.options)&&Array.isArray(x.order)&&x.order.length===x.options.length&&new Set(x.order).size===x.order.length&&x.order.every(n=>Number.isInteger(n)&&n>=0&&n<x.options.length)&&Number.isInteger(x.correct)&&x.correct>=0&&x.correct<x.options.length);
 let data={schema:1,sessions:{},updated:0},lastSerialized='',warning=false,db=null;
 function version(){return window.PsycQuestionVersions?.current||'original'}
 function key(kind,v=version()){return (kind.startsWith('m2')?v:'archive')+'|'+kind}
 function load(){for(const k of [KEY,BACKUP])try{const x=JSON.parse(localStorage.getItem(k)||'null');if(x?.schema===1&&x.sessions&&x.updated>=data.updated)data=x}catch{}}
 load();
 function store(){
  const raw=JSON.stringify(data);if(raw===lastSerialized)return;
  let saved=false;
  for(const k of [KEY,BACKUP])try{localStorage.setItem(k,raw);saved=true}catch{}
  warning=!saved;
  if(db){try{const tx=db.transaction('snapshots','readwrite');tx.objectStore('snapshots').put(copy(data),KEY)}catch{}}
  if(saved)lastSerialized=raw;
 }
 function checkpoint(){
  if(valid(quiz)){
   const k=key(quiz.kind,quiz.questionVersion||version()),snapshot=copy(quiz);
   snapshot.questionVersion=quiz.questionVersion||version();
   if(JSON.stringify(data.sessions[k])!==JSON.stringify(snapshot)){data.sessions[k]=snapshot;data.updated=Date.now()}
  }
  // Include a copy in the existing progress export; no note/read keys change.
  state.quizSessions=data;state.quiz=quiz&&!quiz.finished?quiz:null;
  store();
 }
 function restore(kind,v=version()){
  const saved=data.sessions[key(kind,v)];if(!valid(saved))return false;
  quiz=copy(saved);quiz.questionVersion=v;return true;
 }
 if(!Object.keys(data.sessions).length&&state.quizSessions?.schema===1)data=state.quizSessions;
 if(valid(quiz)){
  const k=key(quiz.kind);if(!data.sessions[k]){quiz.questionVersion=version();checkpoint()}
  else quiz=copy(data.sessions[k]);
 }
 // Resume last active set after reload, including independently saved versions.
 const oldStart=startQuiz;
 startQuiz=function(kind){
  checkpoint();
  let normalized=kind;
  if(kind.startsWith('module')&&window.SECOND_HALF?.modules.includes(selected))normalized=kind==='module10'?'m2quick':'m2lecture-'+selected;
  if(restore(normalized)){view='quiz';render();window.scrollTo(0,0);return}
  const result=oldStart.apply(this,arguments);if(valid(quiz)){quiz.questionVersion=version();checkpoint()}return result;
 };
 const oldRender=render;
 render=function(){
  checkpoint();const result=oldRender.apply(this,arguments);checkpoint();persistPosition();
  if(view==='quiz'&&valid(quiz)){
   const root=document.getElementById('content');
   if(root&&!root.querySelector('[data-progress-actions]')){
    const row=document.createElement('div');row.dataset.progressActions='';row.className='row';row.style.margin='16px 0';
    const status=document.createElement('span');status.className='quiet';status.setAttribute('role','status');status.textContent=warning?'Progress could not be saved in browser storage. Export a backup.':'Progress saved · this question version has its own place';
    const fresh=document.createElement('button');fresh.type='button';fresh.textContent='Start a new attempt';
    fresh.onclick=()=>{
     // Keep the previous attempt before starting another, including completed results.
     checkpoint();data.history=data.history||{};const k=key(quiz.kind);(data.history[k]??=[]).push(copy(quiz));
     const kind=quiz.kind;quiz=null;oldStart(kind);if(valid(quiz))quiz.questionVersion=version();checkpoint();render();
    };
    const exportButton=document.createElement('button');exportButton.type='button';exportButton.textContent='Export quiz backup';
    exportButton.onclick=()=>{checkpoint();const a=document.createElement('a');const url=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));a.href=url;a.download='psyc301-quiz-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
    row.append(status,fresh,exportButton);root.prepend(row);
   }
  }return result;
 };
 // Capture the departing version BEFORE the existing version handler rewrites items.
 document.addEventListener('change',e=>{
  if(e.target?.id!=='m2QuestionVersion')return;
  checkpoint();const kind=quiz?.kind,wasQuiz=view==='quiz';
  if(kind?.startsWith('m2')){quiz=null;state.quiz=null}
  queueMicrotask(()=>{
   if(kind?.startsWith('m2')){
    if(!restore(kind)&&wasQuiz){oldStart(kind);if(valid(quiz))quiz.questionVersion=version()}
    if(wasQuiz)view='quiz';render();
   }checkpoint();
  });
 },true);
 // All navigation, keyboard answers, skips, reveals and tab/page exits checkpoint.
 for(const event of ['click','change','keydown'])document.addEventListener(event,()=>queueMicrotask(checkpoint));
 document.addEventListener('visibilitychange',checkpoint);window.addEventListener('pagehide',checkpoint);window.addEventListener('beforeunload',checkpoint);
 try{
  const request=indexedDB.open('study-studio-progress',1);
  request.onupgradeneeded=()=>request.result.createObjectStore('snapshots');
  request.onsuccess=()=>{
   db=request.result;const tx=db.transaction('snapshots','readonly');const read=tx.objectStore('snapshots').get(KEY);
   read.onsuccess=()=>{
    const saved=read.result;
    if(saved?.schema===1&&saved.updated>data.updated){
     // Recover disk backup if the primary browser record was lost or stale.
     data=saved;lastSerialized='';store();if(view==='quiz'&&quiz&&restore(quiz.kind))render();
    }else if(db){lastSerialized='';store()}
   };
  };
 }catch{}
 checkpoint();render();
})();
