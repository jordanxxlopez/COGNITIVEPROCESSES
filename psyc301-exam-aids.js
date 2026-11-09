'use strict';
// Exam aids for Module II: what you can be asked, experiment cards, side-by-side contrasts, and
// step-by-step help for hard topics. These are extra workspace views; every existing view, note
// version and question is untouched. Content lives in psyc301-exam-aids-data.js.
(() => {
 const pack=window.EXAM_AIDS;
 if(!pack||typeof secondTools==='undefined'||typeof secondScreen!=='function'||typeof secondGuide!=='function')return;
 const cards=pack.cards||[],contrasts=pack.contrasts||[],contrastsV2=window.CONTRASTS_V2||[],contrastsV3=window.CONTRASTS_V3||[],cardsV4=window.CARDS_V4||[],topicsV4=window.TOPICS_V4||[],ask=pack.ask||[],explainers=pack.explainers||[];
 const NEW=[['m2ask','What you can be asked'],['m2cards','Experiment cards'],['m2contrasts','Side-by-side contrasts'],['m2explain','Hard topics, explained']];
 const at=secondTools.findIndex(t=>t[0]==='m2guide')+1;
 secondTools.splice(at,0,...NEW);
 const mine=new Set(NEW.map(t=>t[0]));
 if(!state.aids||typeof state.aids!=='object')state.aids={};
 const aid=()=>{const a=state.aids;if(!a.filter)a.filter='all';if(!['talk','new','old'].includes(a.cv))a.cv='talk';if(!a.ctier)a.ctier='all';if(a.csort!=='likely')a.csort='lecture';if(a.cardv!=='old')a.cardv='talk';if(a.topv!=='old')a.topv='talk';if(typeof a.test!=='boolean')a.test=false;return a};
 const modTitle=id=>{try{return secondModules().find(m=>m.id===Number(id))?.title||('Lecture '+id)}catch{return 'Lecture '+id}};
 const ids=()=>[...new Set([...cards,...contrasts,...contrastsV2,...contrastsV3,...cardsV4,...topicsV4,...ask,...explainers].map(x=>x.module))].sort((a,b)=>a-b);
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

 const CT={high:'Know first',mid:'Know next',low:'Know last'};
 function contrastV2HTML(c,showLecture){
  const side=s=>`<div class="aid-side"><h4>${e(s.term)}</h4><p>${e(s.definition)}</p></div>`;
  return `<div class="card aid-card aid-c2"><div class="aid-c2top"><h3>${e(c.title)}</h3><span class="qa-tier qa-${c.tier}">${CT[c.tier]}</span></div>${showLecture?`<p class="aid-who">${e(modTitle(c.module))}</p>`:''}<div class="aid-pair">${side(c.a)}${side(c.b)}</div><p class="aid-row"><b>How they differ</b> ${e(c.diff)}</p><p class="aid-row"><b>Example</b> ${e(c.example)}</p><p class="aid-row"><b>Watch out</b> ${e(c.watch)}</p></div>`;
 }

 const bold=t=>e(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
 function contrastV3HTML(c,showLecture){
  const side=s=>`<div class="aid-side"><h4>${e(s.term)}</h4><p>${e(s.definition)}</p></div>`;
  const blocks=(c.blocks||[]).map(b=>`<p class="aid-long">${bold(b.text)}</p>${(b.children||[]).length?`<ul class="aid-kids">${b.children.map(k=>`<li>${bold(k)}</li>`).join('')}</ul>`:''}`).join('');
  return `<div class="card aid-card aid-c2 aid-c3"><div class="aid-c2top"><h3>${e(c.title)}</h3><span class="qa-tier qa-${c.tier}">${CT[c.tier]}</span></div>${showLecture?`<p class="aid-who">${e(modTitle(c.module))}</p>`:''}<div class="aid-pair">${side(c.a)}${side(c.b)}</div>${blocks}</div>`;
 }

 const verBar=(attr,key,talkLabel,withTest)=>{
  const a=aid(),old=a[key]==='old';
  return `<div class="row aid-bar"><label>Version <select ${attr}><option value="talk"${old?'':' selected'}>${talkLabel}</option><option value="old"${old?' selected':''}>Original</option></select></label><label>Lecture <select data-aid-filter>${['all',...ids()].map(v=>`<option value="${v}"${String(a.filter)===String(v)?' selected':''}>${v==='all'?'All lectures':e(modTitle(v))}</option>`).join('')}</select></label>${withTest&&old?`<label class="aid-test"><input type="checkbox" data-aid-test ${a.test?'checked':''}> Test myself (hide results until I click)</label>`:''}</div>`;
 };
 const blocksHTML=bl=>(bl||[]).map(b=>`<p class="aid-long">${bold(b.text)}</p>${(b.children||[]).length?`<ul class="aid-kids">${b.children.map(k=>`<li>${bold(k)}</li>`).join('')}</ul>`:''}`).join('');
 function cardV4HTML(c){
  return `<div class="card aid-card aid-c3"><h3>${e(c.title)}</h3>${c.researcher?`<p class="aid-who">${e(c.researcher)}</p>`:''}${blocksHTML(c.blocks)}${src(c.module,c.pages)}</div>`;
 }
 function topicV4HTML(x){
  const slides=(x.pages||[]).length?`<p class="aid-slides"><b>Aligned slides</b> ${x.pages.map(n=>`<button class="tiny" data-source="${x.module}:${n}">Slide ${n} + notes</button>`).join(' ')}</p>`:'';
  return `<details class="guide aid-explain aid-c3"><summary>${e(x.title)}</summary>${slides}${blocksHTML(x.blocks)}</details>`;
 }
 const contrastBar=()=>{
  const a=aid(),old=a.cv==='old';
  const ver=`<label>Version <select data-aid-cv><option value="talk"${a.cv==='talk'?' selected':''}>Written like the Version 20 transcripts · explained in sentences</option><option value="new"${a.cv==='new'?' selected':''}>Labeled · definition, how they differ, example, watch out</option><option value="old"${old?' selected':''}>Original · short version</option></select></label>`;
  const lec=`<label>Lecture <select data-aid-filter>${['all',...ids()].map(v=>`<option value="${v}"${String(a.filter)===String(v)?' selected':''}>${v==='all'?'All lectures':e(modTitle(v))}</option>`).join('')}</select></label>`;
  const extra=old?'':`<label>Likelihood <select data-aid-ctier>${[['all','All contrasts'],['high','Know first (most likely)'],['mid','Know next'],['low','Know last (least likely)']].map(([v,l])=>`<option value="${v}"${a.ctier===v?' selected':''}>${l}</option>`).join('')}</select></label><label>Order <select data-aid-csort><option value="lecture"${a.csort==='lecture'?' selected':''}>By lecture, most likely first</option><option value="likely"${a.csort==='likely'?' selected':''}>Most likely first, all lectures</option></select></label>`;
  return `<div class="row aid-bar">${ver}${lec}${extra}</div>`;
 };
 function contrastsView(){
  if(aid().cv==='old')return `<h1>Side-by-side contrasts · original</h1><p>Pairs of ideas that are easy to mix up, with how to tell them apart.</p>${contrastBar()}${sectioned(contrasts,contrastHTML,'No contrasts for this lecture.')}`;
  const talk=aid().cv==='talk',pool=talk?contrastsV3:contrastsV2,draw=talk?contrastV3HTML:contrastV2HTML;
  const list=pool.filter(x=>keep(x)&&(aid().ctier==='all'||x.tier===aid().ctier));
  const intro=`<h1>Side-by-side contrasts</h1><p>${pool.length} pairs of ideas that are easy to mix up. ${talk?'Each pair gives the two sides in a box, then explains in sentences how they differ and why, with the studies and examples worked in, written the way the Version 20 transcripts are.':'Each says what the two sides are, how they differ and why, gives an example tied to the researcher and year, and flags the usual slip.'} A tag shows how high each pair ranks for study: a heuristic ranking built from how many and how highly ranked the Q&amp;A questions are that depend on the pair. It orders what to learn first and is not a validated prediction of the exam, so the last tier is still worth knowing. Lecture 15 items are placed by the slide topic each article or lab extends.</p>${contrastBar()}`;
  if(!list.length)return intro+'<p>No contrasts match these filters.</p>';
  if(aid().csort==='likely')return intro+`<div class="grid aid-grid aid-grid2">${list.slice().sort((a,b)=>b.score-a.score).map(x=>draw(x,true)).join('')}</div>`;
  const g=groupBy(list);
  return intro+Object.keys(g).sort((a,b)=>a-b).map(m=>`<h2 class="aid-h">${e(modTitle(m))} <span class="qa-count">${g[m].length} contrasts</span></h2><div class="grid aid-grid aid-grid2">${g[m].slice().sort((a,b)=>b.score-a.score).map(x=>draw(x,false)).join('')}</div>`).join('');
 }
 function explainerHTML(x){
  if(x.explain&&x.explain.length){
   const paras=[...x.explain,...(x.another||[])];
   const slides=(x.pages||[]).length?`<p class="aid-slides"><b>Aligned slides</b> ${x.pages.map(n=>`<button class="tiny" data-source="${x.module}:${n}">Slide ${n} + notes</button>`).join(' ')}</p>`:'';
   return `<details class="guide aid-explain"><summary>${e(x.title)}</summary>${slides}${paras.map(t=>`<p class="aid-long">${e(t)}</p>`).join('')}</details>`;
  }
  return `<details class="guide aid-explain"><summary>${e(x.title)}</summary><p>${e(x.plain)}</p>${row('Worked example',x.example)}${row('Watch out',x.watchOut)}</details>`;
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
  else if(view==='m2cards')body=aid().cardv==='old'?`<h1>Experiment cards</h1><p>Every study in the same format: who, what was manipulated, what was measured, what they found, and what it means.</p>${verBar('data-aid-cardv','cardv','Written like the Version 20 transcripts',true)}${sectioned(cards,cardHTML,'No cards for this lecture.')}`:`<h1>Experiment cards</h1><p>Every study told in order: the question the researchers asked, how they tested it, what they found and what it means, with the researcher and year in each sentence.</p>${verBar('data-aid-cardv','cardv','Written like the Version 20 transcripts',false)}${sectioned(cardsV4,cardV4HTML,'No cards for this lecture.')}`;
  else if(view==='m2contrasts')body=contrastsView();
  else if(aid().topv==='old')body=`<h1>Hard topics, explained · original</h1><p>The ideas that are hardest to follow, explained slowly in plain language, each with a fresh everyday example.</p>${verBar('data-aid-topv','topv','Short and connected',false)}${(()=>{const g=groupBy(explainers.filter(keep));return Object.keys(g).sort((a,b)=>a-b).map(m=>`<h2 class="aid-h">${e(modTitle(m))}</h2>${g[m].map(explainerHTML).join('')}`).join('')||'<p>No walk-throughs for this lecture.</p>'})()}`;
  else body=`<h1>Hard topics, explained</h1><p>The ideas that are hardest to hold onto, one short explanation each, from every lecture. Open a topic to read it, and use the aligned slides when you want the source.</p>${verBar('data-aid-topv','topv','Short and connected',false)}${(()=>{const g=groupBy(topicsV4.filter(keep));return Object.keys(g).sort((a,b)=>a-b).map(m=>`<h2 class="aid-h">${e(modTitle(m))} <span class="qa-count">${g[m].length} topics</span></h2>${g[m].map(topicV4HTML).join('')}`).join('')||'<p>No topics for this lecture.</p>'})()}`;
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
  else if(t.matches&&t.matches('[data-aid-cardv]')){aid().cardv=t.value;save();render()}
  else if(t.matches&&t.matches('[data-aid-topv]')){aid().topv=t.value;save();render()}
  else if(t.matches&&t.matches('[data-aid-cv]')){aid().cv=t.value;save();render()}
  else if(t.matches&&t.matches('[data-aid-ctier]')){aid().ctier=t.value;save();render()}
  else if(t.matches&&t.matches('[data-aid-csort]')){aid().csort=t.value;save();render()}
 });
 const style=document.createElement('style');
 style.textContent='.aid-bar{gap:18px;align-items:center;margin:10px 0 4px}.aid-h{margin:26px 0 10px}.aid-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}.aid-card h3{margin:0 0 4px}.aid-who{margin:0 0 8px;font-weight:600;opacity:.85}.aid-row{margin:6px 0}.aid-row summary{cursor:pointer;font-weight:600}.aid-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:8px 0}.aid-side{padding:10px;border-radius:8px;background:rgba(120,120,160,.12)}.aid-side h4{margin:0 0 4px}.aid-side p{margin:0}.aid-inline{margin:8px 0 12px;padding:8px 12px;border-left:3px solid rgba(120,90,200,.6);background:rgba(120,90,200,.08);border-radius:6px}.aid-inline ul{margin:4px 0 0 18px}'+'.aid-qa{margin:6px 0}.aid-qa summary{cursor:pointer;font-weight:600}.aid-qa p{margin:6px 0 10px 14px;line-height:1.55}.aid-q{margin:6px 0;font-weight:600}'+'.aid-slides{margin:8px 0 12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}.aid-long{line-height:1.65;margin:10px 0}.aid-short{margin:12px 0 4px}'+'.aid-grid2{grid-template-columns:repeat(auto-fill,minmax(360px,1fr))}.aid-c2top{display:flex;gap:10px;justify-content:space-between;align-items:flex-start}.aid-c2 .aid-row{line-height:1.55}.aid-c3 .aid-long{margin:12px 0 4px}.aid-kids{margin:2px 0 6px 20px;padding:0;opacity:.88}.aid-kids li{margin:2px 0;line-height:1.5}.aid-h .qa-count{font-size:.6em;font-weight:400;opacity:.7}@media(max-width:560px){.aid-pair{grid-template-columns:1fr}}';
 document.head.appendChild(style);
 window.PSYC301ExamAids={cards,contrasts,contrastsV2,contrastsV3,cardsV4,topicsV4,ask,explainers};
 try{render()}catch{}
})();
