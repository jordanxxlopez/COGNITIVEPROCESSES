'use strict';
// Slide-by-slide Q&A for Module II. Each question is tied to the slides it covers, in slide order,
// with a spoken-style answer. This is an extra workspace view; every existing view, note version and
// question is untouched. Content lives in psyc301-qa-bank-data.js.
(() => {
 const bank=window.QA_BANK;
 if(!bank||typeof secondTools==='undefined'||typeof secondScreen!=='function')return;
 const NEW=[['m2qabank','Q&A · slide by slide']];
 const at=secondTools.findIndex(t=>t[0]==='m2ask')+1||secondTools.findIndex(t=>t[0]==='m2guide')+1;
 secondTools.splice(at,0,...NEW);
 if(!state.qabank||typeof state.qabank!=='object')state.qabank={};
 const qb=()=>{const a=state.qabank;if(!a.filter)a.filter='all';if(!a.tier)a.tier='all';if(!a.sort)a.sort='slides';if(typeof a.test!=='boolean')a.test=false;return a};
 const modTitle=id=>{try{return secondModules().find(m=>m.id===Number(id))?.title||('Lecture '+id)}catch{return 'Lecture '+id}};
 const ids=[...new Set(bank.map(x=>x.module))].sort((a,b)=>a-b);
 const e=s=>esc(String(s==null?'':s));
 const TIER={high:'Study first',mid:'Study next',low:'Study last'};
 const label=s=>{if(s.length===1)return 'Slide '+s[0];const run=s[s.length-1]-s[0]===s.length-1;return run?'Slides '+s[0]+'–'+s[s.length-1]:'Slides '+s.join(', ')};
 const bar=()=>`<div class="row aid-bar"><label>Topic <select data-qa-filter>${['all',...ids].map(v=>`<option value="${v}"${String(qb().filter)===String(v)?' selected':''}>${v==='all'?'All topics':e(modTitle(v))}</option>`).join('')}</select></label><label>Likelihood <select data-qa-tier>${[['all','All questions'],['high','Study first (most likely)'],['mid','Study next'],['low','Study last (least likely)']].map(([v,l])=>`<option value="${v}"${qb().tier===v?' selected':''}>${l}</option>`).join('')}</select></label><label>Order <select data-qa-sort><option value="slides"${qb().sort==='slides'?' selected':''}>Slide order</option><option value="likely"${qb().sort==='likely'?' selected':''}>Study priority</option></select></label>${qb().test?'':'<button class="tiny" data-qa-all="open">Show all answers</button>'}<button class="tiny" data-qa-all="close">Hide all answers</button><label class="aid-test"><input type="checkbox" data-qa-test ${qb().test?'checked':''}> Speak first (answer out loud, then click to check)</label></div>`;
 function itemHTML(x,n){
  const btns=x.slides.map(n=>`<button class="tiny" data-source="${x.module}:${n}">Slide ${n} + notes</button>`).join(' ');
  return `<details class="aid-qa qa-item" id="qa-${n}"><summary><span class="qa-tag">${label(x.slides)}</span><span class="qa-tier qa-${x.tier}">${TIER[x.tier]}</span> ${e(x.q)}</summary><p>${e(x.a)}</p>${x.note?`<p class="qa-note"><b>Outside the slides</b> ${e(x.note)}</p>`:''}<p class="aid-slides">${btns}</p></details>`;
 }
 function bodyHTML(){
  const f=qb().filter;
  let list=bank.filter(x=>(f==='all'||String(x.module)===String(f))&&(qb().tier==='all'||x.tier===qb().tier));
  if(qb().sort==='likely')list=list.slice().sort((a,b)=>b.score-a.score);
  return ids.filter(m=>list.some(x=>x.module===m)).map(m=>{
   const g=list.filter(x=>x.module===m);
   return `<h2 class="aid-h">${e(modTitle(m))} <span class="qa-count">${g.length} questions</span></h2>`+g.map(x=>itemHTML(x,bank.indexOf(x))).join('');
  }).join('');
 }
 const who=bank.map((x,i)=>x.who?{i,w:x.who}:null).filter(Boolean).sort((a,b)=>a.w.localeCompare(b.w));
 const indexHTML=()=>`<details class="guide qa-index"><summary>Researcher index · ${who.length} studies</summary><p>Each study as the slides give it. Click one to jump to its question.</p><div class="qa-index-list">${who.map(x=>`<button class="tiny" data-qa-jump="${x.i}">${e(x.w)}</button>`).join(' ')}</div></details>`;
 const prior=secondScreen;
 secondScreen=function(){
  if(view!=='m2qabank')return prior();
  return '<span class="tag">MODULE 2 · SECOND HALF</span>'+secondScope()+`<h1>Q&amp;A · slide by slide</h1><p>100 questions on the material, grouped by topic. Each is tagged with the slides it covers and a study-priority tier from one heuristic ranking of the slides (it orders what to study first, and it is not a validated prediction of the exam, so the last tier is still worth knowing). Click a question to see the answer, or open the slide beside the notes.</p>${bar()}${indexHTML()}${bodyHTML()}`;
 };
 document.addEventListener('change',ev=>{
  const t=ev.target;
  if(t.matches&&t.matches('[data-qa-filter]')){qb().filter=t.value;save();render()}
  else if(t.matches&&t.matches('[data-qa-tier]')){qb().tier=t.value;save();render()}
  else if(t.matches&&t.matches('[data-qa-sort]')){qb().sort=t.value;save();render()}
  else if(t.matches&&t.matches('[data-qa-test]')){qb().test=t.checked;save();render()}
 });
 document.addEventListener('click',ev=>{
  const j=ev.target.closest&&ev.target.closest('[data-qa-jump]');
  if(j){qb().filter='all';qb().tier='all';save();render();const d=document.getElementById('qa-'+j.dataset.qaJump);if(d){d.open=true;d.scrollIntoView({block:'center'})}return}
  const b=ev.target.closest&&ev.target.closest('[data-qa-all]');
  if(!b)return;
  const open=b.dataset.qaAll==='open';
  document.querySelectorAll('.qa-item').forEach(d=>{d.open=open});
 });
 const style=document.createElement('style');
 style.textContent='.qa-tag{display:inline-block;margin-right:8px;padding:1px 8px;border-radius:999px;font-size:.78em;font-weight:600;background:rgba(120,90,200,.16);white-space:nowrap}.qa-count{font-size:.55em;font-weight:500;opacity:.7;margin-left:8px}.qa-item p{line-height:1.6}.qa-tier{display:inline-block;margin-right:8px;padding:1px 8px;border-radius:999px;font-size:.72em;font-weight:600;white-space:nowrap}.qa-high{background:rgba(200,60,60,.18)}.qa-mid{background:rgba(220,160,40,.2)}.qa-low{background:rgba(120,130,150,.2)}.qa-note{margin:6px 0 10px 14px;padding:6px 10px;border-left:3px solid rgba(220,160,40,.7);background:rgba(220,160,40,.1);border-radius:6px;font-size:.95em}.qa-index{margin:10px 0 14px}.qa-index-list{display:flex;flex-wrap:wrap;gap:6px}';
 document.head.appendChild(style);
 window.PSYC301QABank=bank;
 try{render()}catch{}
})();
