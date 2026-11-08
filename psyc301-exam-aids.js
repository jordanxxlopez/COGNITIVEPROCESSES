'use strict';
// Exam aids for Module II: what you can be asked, experiment cards, side-by-side contrasts, and
// step-by-step help for hard topics. These are extra workspace views; every existing view, note
// version and question is untouched. Content lives in psyc301-exam-aids-data.js.
(() => {
 const pack=window.EXAM_AIDS;
 if(!pack||typeof secondTools==='undefined'||typeof secondScreen!=='function'||typeof secondGuide!=='function')return;
 const cards=pack.cards||[],contrasts=pack.contrasts||[],ask=pack.ask||[],explainers=pack.explainers||[];
 const NEW=[['m2ask','What you can be asked'],['m2cards','Experiment cards'],['m2contrasts','Side-by-side contrasts'],['m2explain','Hard topics, step by step']];
 const at=secondTools.findIndex(t=>t[0]==='m2guide')+1;
 secondTools.splice(at,0,...NEW);
 const mine=new Set(NEW.map(t=>t[0]));
 if(!state.aids||typeof state.aids!=='object')state.aids={};
 const aid=()=>{const a=state.aids;if(!a.filter)a.filter='all';if(typeof a.test!=='boolean')a.test=false;return a};
 const modTitle=id=>{try{return secondModules().find(m=>m.id===Number(id))?.title||('Lecture '+id)}catch{return 'Lecture '+id}};
 const ids=()=>[...new Set([...cards,...contrasts,...ask,...explainers].map(x=>x.module))].sort((a,b)=>a-b);
 const keep=x=>aid().filter==='all'||String(x.module)===String(aid().filter);
 const e=s=>esc(String(s==null?'':s));
 const filterBar=(withTest)=>`<div class="row aid-bar"><label>Lecture <select data-aid-filter>${['all',...ids()].map(v=>`<option value="${v}"${String(aid().filter)===String(v)?' selected':''}>${v==='all'?'All lectures':e(modTitle(v))}</option>`).join('')}</select></label>${withTest?`<label class="aid-test"><input type="checkbox" data-aid-test ${aid().test?'checked':''}> Test myself (hide results until I click)</label>`:''}</div>`;
 const src=(m,pages)=>pages&&pages.length?`<button class="tiny" data-source="${m}:${pages[0]}">Open slide + notes</button>`:'';
 const row=(label,text,hide)=>text?(hide?`<details class="aid-row"><summary>${label}</summary><p>${e(text)}</p></details>`:`<p class="aid-row"><b>${label}</b> ${e(text)}</p>`):'';
 function cardHTML(c){
  const t=aid().test;
  return `<div class="card aid-card"><h3>${e(c.title)}</h3>${c.researcher?`<p class="aid-who">${e(c.researcher)}</p>`:''}`+
   row('Question tested',c.aim)+row('What was manipulated',c.manipulated)+row('What was measured',c.measured)+
   row('What they found',c.found,t)+row('What it means',c.means,t)+(c.trap?row('Watch out',c.trap,t):'')+src(c.module,c.pages)+'</div>';
 }
 function contrastHTML(c){
  const side=s=>`<div class="aid-side"><h4>${e(s.term)}</h4><p>${e(s.definition)}</p></div>`;
  return `<div class="card aid-card"><h3>${e(c.title)}</h3><div class="aid-pair">${side(c.a)}${side(c.b)}</div>${row('How to tell them apart',c.tell)}${row('Example',c.example)}</div>`;
 }
 function explainerHTML(x){
  return `<details class="guide aid-explain"><summary>${e(x.title)}</summary>${x.explain&&x.explain.length?x.explain.map(t=>`<p class="aid-long">${e(t)}</p>`).join('')+'<p class="aid-short"><b>In short</b> '+e(x.plain)+'</p>':`<p>${e(x.plain)}</p>`}${x.steps&&x.steps.length?'<p class="aid-short"><b>The steps</b></p>':''}${x.steps&&x.steps.length?`<ol>${x.steps.map(s=>`<li>${e(String(s).replace(/^\s*(step\s*)?\d+[.):]\s*/i,''))}</li>`).join('')}</ol>`:''}${row('Worked example',x.example)}${row('Watch out',x.watchOut)}</details>`;
 }
 const qa=(a)=>a.questions.map((q,i)=>a.answers&&a.answers[i]?`<details class="aid-qa"><summary>${e(q)}</summary><p>${e(a.answers[i])}</p></details>`:`<p class="aid-q">${e(q)}</p>`).join('');
 function groupBy(list){const g={};for(const x of list)(g[x.module]=g[x.module]||[]).push(x);return g}
 function sectioned(list,fn,intro){
  const g=groupBy(list.filter(keep));
  return Object.keys(g).sort((a,b)=>a-b).map(m=>`<h2 class="aid-h">${e(modTitle(m))}</h2><div class="grid aid-grid">${g[m].map(fn).join('')}</div>`).join('')||`<p>${intro}</p>`;
 }
 function askHTML(){
  const g=groupBy(ask.filter(keep));
  return Object.keys(g).sort((a,b)=>a-b).map(m=>`<h2 class="aid-h">${e(modTitle(m))}</h2>`+g[m].map(a=>`<details class="guide aid-ask" open><summary>${e(a.topic)}</summary><div class="aid-qas">${qa(a)}</div>${a.remember?`<p class="aid-row"><b>Remember</b> ${e(a.remember)}</p>`:''}</details>`).join('')).join('');
 }
 const prior=secondScreen;
 secondScreen=function(){
  if(!mine.has(view))return prior();
  let body;
  if(view==='m2ask')body=`<h1>What you can be asked</h1><p>For each topic, the kinds of questions the exam asks about it, with a one-line cue to the key point.</p>${filterBar(false)}${askHTML()}`;
  else if(view==='m2cards')body=`<h1>Experiment cards</h1><p>Every study in the same format: who, what was manipulated, what was measured, what they found, and what it means.</p>${filterBar(true)}${sectioned(cards,cardHTML,'No cards for this lecture.')}`;
  else if(view==='m2contrasts')body=`<h1>Side-by-side contrasts</h1><p>Pairs of ideas that are easy to mix up, with how to tell them apart.</p>${filterBar(false)}${sectioned(contrasts,contrastHTML,'No contrasts for this lecture.')}`;
  else body=`<h1>Hard topics, step by step</h1><p>Plain-language walk-throughs for the ideas that are hardest to follow, each with a worked example.</p>${filterBar(false)}${(()=>{const g=groupBy(explainers.filter(keep));return Object.keys(g).sort((a,b)=>a-b).map(m=>`<h2 class="aid-h">${e(modTitle(m))}</h2>${g[m].map(explainerHTML).join('')}`).join('')||'<p>No walk-throughs for this lecture.</p>'})()}`;
  return '<span class="tag">MODULE 2 · SECOND HALF</span>'+secondScope()+body;
 };
 // Under each topic of "What to know by the end", show what can be asked about it.
 const priorGuide=secondGuide;
 secondGuide=function(){
  let html=priorGuide();
  for(const a of ask){
   const marker='<summary>'+esc(a.topic)+'</summary>';
   if(!html.includes(marker))continue;
   const block=`<div class="aid-inline"><b>What you can be asked</b><div class="aid-qas">${qa(a)}</div></div>`;
   html=html.replace(marker,marker+block);
  }
  return html;
 };
 document.addEventListener('change',ev=>{
  const t=ev.target;
  if(t.matches&&t.matches('[data-aid-filter]')){aid().filter=t.value;save();render()}
  else if(t.matches&&t.matches('[data-aid-test]')){aid().test=t.checked;save();render()}
 });
 const style=document.createElement('style');
 style.textContent='.aid-bar{gap:18px;align-items:center;margin:10px 0 4px}.aid-h{margin:26px 0 10px}.aid-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}.aid-card h3{margin:0 0 4px}.aid-who{margin:0 0 8px;font-weight:600;opacity:.85}.aid-row{margin:6px 0}.aid-row summary{cursor:pointer;font-weight:600}.aid-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:8px 0}.aid-side{padding:10px;border-radius:8px;background:rgba(120,120,160,.12)}.aid-side h4{margin:0 0 4px}.aid-side p{margin:0}.aid-inline{margin:8px 0 12px;padding:8px 12px;border-left:3px solid rgba(120,90,200,.6);background:rgba(120,90,200,.08);border-radius:6px}.aid-inline ul{margin:4px 0 0 18px}'+'.aid-qa{margin:6px 0}.aid-qa summary{cursor:pointer;font-weight:600}.aid-qa p{margin:6px 0 10px 14px;line-height:1.55}.aid-q{margin:6px 0;font-weight:600}'+'.aid-long{line-height:1.65;margin:10px 0}.aid-short{margin:12px 0 4px}@media(max-width:560px){.aid-pair{grid-template-columns:1fr}}';
 document.head.appendChild(style);
 window.PSYC301ExamAids={cards,contrasts,ask,explainers};
 try{render()}catch{}
})();
