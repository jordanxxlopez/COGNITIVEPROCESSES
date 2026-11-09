'use strict';
// Slide-by-slide Q&A for Module II. Each question is tied to the slides it covers, in slide order,
// with a spoken-style answer. This is an extra workspace view; every existing view, note version and
// question is untouched. Content lives in psyc301-qa-bank-data.js.
(() => {
 const bank=window.QA_BANK;
 if(!bank||typeof secondTools==='undefined'||typeof secondScreen!=='function')return;
 const NEW=[['m2qabank','Q&A']];
 const at=secondTools.findIndex(t=>t[0]==='m2ask')+1||secondTools.findIndex(t=>t[0]==='m2guide')+1;
 secondTools.splice(at,0,...NEW);
 if(!state.qabank||typeof state.qabank!=='object')state.qabank={};
 const qb=()=>{const a=state.qabank;if(!a.filter)a.filter='all';if(a.layout!=='slides'&&a.layout!=='v3'&&a.layout!=='v4'&&a.layout!=='v5')a.layout='priority';if(!a.tier)a.tier='all';if(!a.sort)a.sort='slides';if(!a.tier)a.tier='all';if(!a.sort)a.sort='slides';if(typeof a.test!=='boolean')a.test=false;return a};
 const modTitle=id=>{try{return secondModules().find(m=>m.id===Number(id))?.title||('Lecture '+id)}catch{return 'Lecture '+id}};
 const ids=[...new Set(bank.map(x=>x.module))].sort((a,b)=>a-b);
 const e=s=>esc(String(s==null?'':s));
 const TIER={high:'Know first',mid:'Know next',low:'Know last'};
 const GROUP={high:'Know first · most likely to be asked',mid:'Know next',low:'Know last · least likely, still possible'};
 const label=s=>{if(s.length===1)return 'Slide '+s[0];const run=s[s.length-1]-s[0]===s.length-1;return run?'Slides '+s[0]+'–'+s[s.length-1]:'Slides '+s.join(', ')};
 const LAYOUTS=[['priority','By priority · reorganized (most likely first)'],['slides','Slide by slide · original'],['v3','Version 3 · every slide in order + connections'],['v4','Version 4 · Version 3 questions, in-depth answers'],['v5','Version 5 · Version 4 questions, professor-style answers']];
 const bar=()=>{
  const topic=`<label>Topic <select data-qa-filter>${['all',...ids].map(v=>`<option value="${v}"${String(qb().filter)===String(v)?' selected':''}>${v==='all'?'All topics':e(modTitle(v))}</option>`).join('')}</select></label>`;
  const slidesOnly=(qb().layout==='slides'||qb().layout==='v3'||qb().layout==='v4'||qb().layout==='v5')?`<label>Likelihood <select data-qa-tier>${[['all','All questions'],['high','Study first (most likely)'],['mid','Study next'],['low','Study last (least likely)']].map(([v,l])=>`<option value="${v}"${qb().tier===v?' selected':''}>${l}</option>`).join('')}</select></label><label>Order <select data-qa-sort><option value="slides"${qb().sort==='slides'?' selected':''}>Slide order</option><option value="likely"${qb().sort==='likely'?' selected':''}>Study priority</option></select></label>`:'';
  return `<div class="row aid-bar"><label>Version <select data-qa-layout>${LAYOUTS.map(([v,l])=>`<option value="${v}"${qb().layout===v?' selected':''}>${l}</option>`).join('')}</select></label>${topic}${slidesOnly}${qb().test?'':'<button class="tiny" data-qa-all="open">Show all answers</button>'}<button class="tiny" data-qa-all="close">Hide all answers</button><label class="aid-test"><input type="checkbox" data-qa-test ${qb().test?'checked':''}> Speak first (answer out loud, then click to check)</label></div>`;
 };
 const TIER_O={high:'Study first',mid:'Study next',low:'Study last'};
 function itemHTMLSlides(x,n){
  const btns=x.slides.map(n=>`<button class="tiny" data-source="${x.module}:${n}">Slide ${n} + notes</button>`).join(' ');
  return `<details class="aid-qa qa-item" id="qa-${n}"><summary><span class="qa-tag">${label(x.slides)}</span><span class="qa-tier qa-${x.tier}">${TIER_O[x.tier]}</span> ${e(x.q)}</summary><p>${e(x.a)}</p>${x.note?`<p class="qa-note"><b>Outside the slides</b> ${e(x.note)}</p>`:''}<p class="aid-slides">${btns}</p></details>`;
 }
 function bodyHTMLSlides(){
  const f=qb().filter;
  let list=bank.filter(x=>(f==='all'||String(x.module)===String(f))&&(qb().tier==='all'||x.tier===qb().tier));
  if(qb().sort==='likely')list=list.slice().sort((a,b)=>b.score-a.score);
  return ids.filter(m=>list.some(x=>x.module===m)).map(m=>{
   const g=list.filter(x=>x.module===m);
   return `<h2 class="aid-h">${e(modTitle(m))} <span class="qa-count">${g.length} questions</span></h2>`+g.map(x=>itemHTMLSlides(x,bank.indexOf(x))).join('');
  }).join('');
 }
 function itemHTML(x,n,rank){
  const btns=x.slides.map(n=>`<button class="tiny" data-source="${x.module}:${n}">Slide ${n} + notes</button>`).join(' ');
  return `<details class="aid-qa qa-item" id="qa-${n}"><summary><span class="qa-rank">${rank}.</span> ${e(x.q)}</summary><p>${e(x.a)}</p>${x.note?`<p class="qa-note"><b>Outside the slides</b> ${e(x.note)}</p>`:''}<p class="qa-meta"><span class="qa-tier qa-${x.tier}">${TIER[x.tier]}</span><span class="qa-tag">${label(x.slides)}</span></p><p class="aid-slides">${btns}</p></details>`;
}
function bodyHTML(){
  const f=qb().filter;
  return ids.filter(m=>f==='all'||String(m)===String(f)).map(m=>{
   const g=bank.filter(x=>x.module===m).slice().sort((a,b)=>b.score-a.score||bank.indexOf(a)-bank.indexOf(b));
   let rank=0,last='';
   const rows=g.map(x=>{
    rank++;
    const head=x.tier!==last?`<p class="qa-group qa-g-${x.tier}">${GROUP[x.tier]} · ${g.filter(y=>y.tier===x.tier).length}</p>`:'';
    last=x.tier;
    return head+itemHTML(x,bank.indexOf(x),rank);
   }).join('');
   return `<details class="guide aid-ask" open><summary>${e(modTitle(m))}</summary><div class="aid-inline qa-block"><b>What you can be asked</b> <span class="qa-count">${g.length} questions, most likely first</span>${rows}</div></details>`;
  }).join('');
}
const V3=()=>window.QA_V3||[];
 const V4MAP=()=>{if(!window.__qaV4){const m={};(window.QA_V4||[]).forEach(x=>{m[x.id]=x.a});window.__qaV4=m}return window.__qaV4};
 const V5MAP=()=>{if(!window.__qaV5){const m={};(window.QA_V5||[]).forEach(x=>{m[x.id]=x.a});window.__qaV5=m}return window.__qaV5};
 const ANSMAP=()=>qb().layout==='v5'?V5MAP():V4MAP();
 const TIER_LONG={high:'Study First',mid:'Study Next',low:'Study Last'};
 const fmt=t=>e(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
 function v4Answer(list){
  let html='',open=false;
  for(const line of list){
   if(line.startsWith('- ')){if(!open){html+='<ul class="v4-ul">';open=true}html+='<li>'+fmt(line.slice(2))+'</li>'}
   else{if(open){html+='</ul>';open=false}html+='<p class="v4-p">'+fmt(line)+'</p>'}
  }
  if(open)html+='</ul>';
  return html;
 }
 const v3Ids=()=>[...new Set(V3().map(x=>x.module))].sort((a,b)=>a-b);
 function v3Item(x){
  const btns=x.slides.slice(0,8).map(n=>`<button class="tiny" data-source="${x.module}:${n}">Slide ${n} + notes</button>`).join(' ');
  const tag=x.kind==='relate'?(x.slides.length>1?'Slides '+x.slides[0]+'–'+x.slides[x.slides.length-1]:'Slide '+x.slides[0]):label(x.slides);
  return `<details class="aid-qa qa-item" id="v3-${x.id}"><summary><span class="qa-tag">${tag}</span><span class="qa-tier qa-${x.tier}">${TIER_O[x.tier]}</span> ${e(x.q)}</summary>${((qb().layout==='v4'||qb().layout==='v5')&&ANSMAP()[x.id])?`<div class="v4-ans">${v4Answer(ANSMAP()[x.id])}</div>`:`<p>${e(x.a)}</p>`}${x.note?`<p class="qa-note"><b>Outside the slides</b> ${e(x.note)}</p>`:''}${x.flag?`<p class="qa-note"><b>Across topics</b> ${e(x.flag)}</p>`:''}<p class="aid-slides">${btns}</p></details>`;
 }
 function v3Body(){
  const f=qb().filter,t=qb().tier,ord=qb().sort==='likely';
  const prio=ord&&(qb().layout==='v4'||qb().layout==='v5');
  return v3Ids().filter(m=>f==='all'||String(m)===String(f)).map(m=>{
   const pick=k=>{let g=V3().filter(x=>x.module===m&&x.kind===k&&(t==='all'||x.tier===t));if(ord&&!prio)g=g.slice().sort((a,b)=>b.score-a.score);return g};
   const a=pick('slide'),b=pick('relate');
   const sec=(title,g)=>{
    if(!g.length)return '';
    if(!prio)return `<p class="qa-group qa-g-slides">${title} · ${g.length}</p>${g.map(v3Item).join('')}`;
    const parts=['high','mid','low'].map(tr=>({tr,items:g.filter(x=>x.tier===tr)})).filter(o=>o.items.length);
    return `<p class="qa-group qa-g-slides">${title} · ${g.length}</p>`+parts.map(o=>`<p class="qa-group qa-g-${o.tr}">${TIER_LONG[o.tr]} · ${o.items.length}</p>${o.items.map(v3Item).join('')}`).join('');
   };
   const t1=prio?'Slide by slide':(ord?'Slide questions · most likely first':'Slide by slide, in the order of the slides');
   const t2=prio?'Putting It Together: How the Ideas Relate':(ord?'Putting it together · most likely first':'Putting it together: how the ideas relate');
   return `<details class="guide aid-ask" open><summary>${e(modTitle(m))}</summary><div class="aid-inline qa-block"><b>What you can be asked</b> <span class="qa-count">${a.length+b.length} questions</span>${sec(t1,a)}${sec(t2,b)}</div></details>`;
  }).join('');
 }
 const who=bank.map((x,i)=>x.who?{i,w:x.who}:null).filter(Boolean).sort((a,b)=>a.w.localeCompare(b.w));
 const indexHTML=()=>`<details class="guide qa-index"><summary>Researcher index · ${who.length} studies</summary><p>Each study as the slides give it. Click one to jump to its question.</p><div class="qa-index-list">${who.map(x=>`<button class="tiny" data-qa-jump="${x.i}">${e(x.w)}</button>`).join(' ')}</div></details>`;
 const prior=secondScreen;
 secondScreen=function(){
  if(view!=='m2qabank')return prior();
  const head='<span class="tag">MODULE 2 · SECOND HALF</span>'+secondScope();
  if(qb().layout==='v5')return head+`<h1>Q&amp;A · Version 5</h1><p>The same 550 questions, slide references and study-priority labels as Version 4, with answers rewritten as connected explanations. Choose Order → Study priority to group each section under Study First, Study Next and Study Last, with Slide by Slide and Putting It Together kept separate.</p>${bar()}${(V3().length&&window.QA_V5)?v3Body():'<p>Version 5 is not loaded.</p>'}`;
  if(qb().layout==='v4')return head+`<h1>Q&amp;A · Version 4</h1><p>The same questions as Version 3, in the same order, with each answer rewritten in depth as connected teaching notes drawn from the slides. Each carries a study-priority label from a heuristic ranking of how strongly the slides stress the idea, and any idea is fair game, so this is not a validated prediction of the exam.</p>${bar()}${(V3().length&&window.QA_V4)?v3Body():'<p>Version 4 is not loaded.</p>'}`;
  if(qb().layout==='v3')return head+`<h1>Q&amp;A · Version 3</h1><p>Questions on every slide, asked in the order of the slides, followed by questions that tie the ideas together. Each carries a study-priority label from a heuristic ranking of how strongly the slides stress the idea. Any idea is fair game, so the last label is still worth knowing, and this is not a validated prediction of the exam.</p>${bar()}${V3().length?v3Body():'<p>Version 3 is not loaded.</p>'}`;
  if(qb().layout==='slides')return head+`<h1>Q&amp;A · slide by slide</h1><p>100 questions on the material, grouped by topic. Each is tagged with the slides it covers and a study-priority tier from one heuristic ranking of the slides (it orders what to study first, and it is not a validated prediction of the exam, so the last tier is still worth knowing). Click a question to see the answer, or open the slide beside the notes.</p>${bar()}${indexHTML()}${bodyHTMLSlides()}`;
  return head+`<h1>Q&amp;A</h1><p>100 questions on the material, grouped by topic. In each topic the questions run from the ones most likely to be asked down to the least likely. The order comes from one heuristic ranking of the slides, so it is a study-priority guide and not a validated prediction of the exam. Click a question to see the answer.</p>${bar()}${indexHTML()}${bodyHTML()}`;
 };
 document.addEventListener('change',ev=>{
  const t=ev.target;
  if(t.matches&&t.matches('[data-qa-filter]')){qb().filter=t.value;save();render()}
  else if(t.matches&&t.matches('[data-qa-layout]')){qb().layout=t.value;save();render()}
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
 style.textContent='.qa-tag{display:inline-block;margin-right:8px;padding:1px 8px;border-radius:999px;font-size:.78em;font-weight:600;background:rgba(120,90,200,.16);white-space:nowrap}.qa-count{font-size:.55em;font-weight:500;opacity:.7;margin-left:8px}.qa-item p{line-height:1.6}.qa-tier{display:inline-block;margin-right:8px;padding:1px 8px;border-radius:999px;font-size:.72em;font-weight:600;white-space:nowrap}.qa-high{background:rgba(200,60,60,.18)}.qa-mid{background:rgba(220,160,40,.2)}.qa-low{background:rgba(120,130,150,.2)}.qa-note{margin:6px 0 10px 14px;padding:6px 10px;border-left:3px solid rgba(220,160,40,.7);background:rgba(220,160,40,.1);border-radius:6px;font-size:.95em}.qa-rank{display:inline-block;min-width:1.6em;opacity:.65;font-weight:600}.qa-group{margin:16px 0 4px;padding-bottom:3px;font-weight:700;font-size:.9em;letter-spacing:.02em;border-bottom:1px solid rgba(255,255,255,.18)}.qa-g-high{color:#f08a8a}.qa-g-mid{color:#f0c16a}.qa-g-low{color:#a9b4c8}.qa-meta{margin:8px 0 2px 14px}.qa-block .qa-count{font-size:.8em;font-weight:500;opacity:.7;margin-left:8px}.qa-g-slides{color:#9fb4e8}.v4-ans{margin:6px 0 4px 14px}.v4-p{margin:8px 0 2px;line-height:1.6}.v4-ul{margin:2px 0 6px 20px;padding:0}.v4-ul li{margin:3px 0;line-height:1.55}.qa-index{margin:10px 0 14px}.qa-index-list{display:flex;flex-wrap:wrap;gap:6px}';
 document.head.appendChild(style);
 window.PSYC301QABank=bank;
 try{render()}catch{}
})();
