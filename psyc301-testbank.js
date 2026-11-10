'use strict';
// Separate source bank and progress. Never append these questions to Q or SECOND_HALF.questions.
(() => {
 const pack=window.PSYC301_TESTBANK;
 if(!pack||typeof secondScreen!=='function')return;
 const KEY='psyc301-testbank-v1', scope=new Set([6,9,10,11,12,13,14]);
 let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{}
 if(typeof saved!=='object'||Array.isArray(saved))saved={};
 if(!saved.decks||typeof saved.decks!=='object'||Array.isArray(saved.decks))saved.decks={};
 let storageOK=true;
 const write=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved));storageOK=true}catch{storageOK=false}};
 const modern=()=>{try{return localStorage.getItem('psyc301-workspace-layout')==='modern'}catch{return false}};
 const e=t=>esc(String(t??''));
 const questions=pack.questions, decks=new Map();
 const title=id=>moduleBy(id)?.title||'Collection';
 const references=(q,id)=>q.refs.filter(r=>r[0]===id).map(r=>r[1]);
 const slidePool=id=>questions.filter(q=>q.scope==='slides'&&references(q,id).length).slice().sort((a,b)=>references(a,id)[0]-references(b,id)[0]||a.id.localeCompare(b.id));
 const extraPool=(id,kind)=>questions.filter(q=>q.module===id&&q.scope===kind);
 function deck(key,pool){
  const signature=pack.revision+':'+pool.map(q=>q.id).join(',');
  if(decks.get(key)?.signature===signature)return decks.get(key);
  let record=saved.decks[key];
  const valid=record&&record.signature===signature&&Array.isArray(record.orders)&&record.orders.length===pool.length&&record.orders.every(o=>Array.isArray(o)&&o.length===4)&&validateAnswerKey(pool.map((q,i)=>({...q,order:record.orders[i]})));
  if(!valid){record={signature,orders:prepareQuizItems(pool).map(q=>q.order),answers:{},positions:{}};saved.decks[key]=record}
  if(!record.answers||typeof record.answers!=='object')record.answers={};
  if(!record.positions||typeof record.positions!=='object')record.positions={};
  const value={key,signature,items:pool.map((q,i)=>({...q,order:record.orders[i]})),record};decks.set(key,value);return value;
 }
 function sourceLabel(q){return `Chapter ${q.chapter} · Question ${q.number}`}
 function card(d,indices,slot,label){
  if(!indices.length)return '';
  const pos=Math.min(Math.max(0,Number(d.record.positions[slot])||0),indices.length-1),index=indices[pos],q=d.items[index];
  const answer=d.record.answers[q.id],answered=Number.isInteger(answer)&&answer>=0&&answer<q.options.length;
  const review=q.scope==='review',moduleId=Number(d.key.split('-').at(-1)),slide=references(q,moduleId)[0];
  return `<section class="tb-card" data-tb-deck="${e(d.key)}" data-tb-slot="${e(slot)}" data-tb-indices="${indices.join(',')}" aria-label="${e(label)}">
   <div class="tb-card-heading"><span class="tb-eyebrow">${e(label)}</span><span>${pos+1} / ${indices.length}</span></div>
   <p class="tb-source">${e(sourceLabel(q))}${q.scope==='slides'?` · Slide ${slide}`:''}</p>
   <h3 tabindex="-1" data-tb-question>${e(q.stem)}</h3>
   <div class="tb-options">${q.order.map((choice,i)=>`<button class="tb-option${answered&&choice===q.correct?' tb-correct':''}${answered&&choice===answer&&answer!==q.correct?' tb-incorrect':''}" data-tb-answer="${choice}" data-tb-index="${index}" ${answered?'disabled':''}><span class="tb-letter">${'ABCD'[i]}</span><span>${e(q.options[choice])}${answered&&choice===answer?' <strong>— Your answer</strong>':''}${answered&&choice===q.correct?` <strong>— ${review?'Source key':'Correct'}</strong>`:''}</span></button>`).join('')}</div>
   ${answered?`<div class="tb-feedback" role="status"><strong>${review?'Source-key review · not scored':answer===q.correct?'Correct':'Not quite'}</strong><p>${review?'The original bank keys':'Correct answer:'} <b>${'ABCD'[q.order.indexOf(q.correct)]}. ${e(q.options[q.correct])}</b></p><p>${e(q.why)}</p></div>`:''}
   <div class="tb-controls"><button class="tiny" data-tb-move="-1" ${pos===0?'disabled':''} aria-label="Previous test-bank question">← Previous</button><span>${answered?(review?'Reviewed':'Answered'):'Choose an answer'}</span><button class="tiny" data-tb-move="1" ${pos===indices.length-1?'disabled':''} aria-label="Next test-bank question">Next →</button></div>
   ${answered?`<button class="tiny tb-retry" data-tb-retry="${index}">Try this question again</button>`:''}
   ${!storageOK?'<p role="alert">Progress could not be saved in this browser.</p>':''}
  </section>`;
 }
 function allCard(key,pool,label){if(!pool.length)return '';const d=deck(key,pool);return card(d,d.items.map((_,i)=>i),'all',label)}
 function supplement(id){
  const extras=extraPool(id,'extra'),review=extraPool(id,'review');
  if(!extras.length&&!review.length)return '';
  return `<div class="tb-supplement">${extras.length?`<details class="tb-extra"><summary>Beyond the slides · ${extras.length} related chapter questions</summary><p>Additional material from the same chapter. Learn it here separately; these questions are not attached to individual slides.</p>${allCard('extra-'+id,extras,'Beyond the slides')}</details>`:''}${review.length?`<details class="tb-extra tb-review"><summary>Source-key review · ${review.length} ambiguous questions · not scored</summary><p>These original questions have an ambiguous or overly broad keyed answer. Choose an option to see the source key and why it needs care.</p>${allCard('review-'+id,review,'Source-key review')}</details>`:''}</div>`;
 }
 function screen(){
  const filter=scope.has(Number(saved.filter))?Number(saved.filter):'all';
  const ids=[...scope].filter(id=>filter==='all'||id===filter);
  return `<span class="tag">MODULE 2 · TEST BANK</span><h1>Test Bank</h1><p class="tb-intro">Practice the questions that match your slides, one lecture at a time. Each answer includes an explanation. Related chapter material stays below each lecture in <b>Beyond the slides</b>.</p><div class="row tb-toolbar"><label>Lecture <select data-tb-filter><option value="all">All lectures</option>${[...scope].map(id=>`<option value="${id}" ${filter===id?'selected':''}>${e(title(id))}</option>`).join('')}</select></label><span class="quiet">${questions.filter(q=>q.scope==='slides').length} unique slide questions · ${questions.filter(q=>q.scope==='extra').length} chapter extras · ${questions.filter(q=>q.scope==='review').length} source-key reviews</span></div>${ids.map(id=>{
   const pool=slidePool(id),d=deck('bank-'+id,pool),answered=pool.filter(q=>Number.isInteger(d.record.answers[q.id])).length;
   return `<section class="tb-lecture"><header><h2>${e(title(id))}</h2><p>${pool.length} slide-matched questions · <span data-tb-count="${id}">${answered}</span> answered</p></header>${allCard('bank-'+id,pool,'Slide-by-slide practice')}${supplement(id)}</section>`;
  }).join('')}<p class="quiet">Adapted from your supplied Goldstein Cognero PDF. Questions retain their source IDs; textbook-dependent wording has been made self-contained. The lab collection reuses matching concepts, so its questions are not additional unique items. No questions are added to your regular quizzes.</p>`;
 }
 const at=secondTools.findIndex(t=>t[0]==='m2test');secondTools.splice(at<0?secondTools.length:at,0,['m2testbank','Test Bank']);
 const oldScreen=secondScreen;secondScreen=function(){return view==='m2testbank'?screen():oldScreen.apply(this,arguments)};
 const oldNotes=personalNotes;
 personalNotes=function(m,s){
  const html=oldNotes(m,s);
  if(view!=='module'||!scope.has(m.id)||!modern())return html;
  const pool=slidePool(m.id),d=deck('slides-'+m.id,pool),indices=d.items.flatMap((q,i)=>references(q,m.id).includes(s.page)?[i]:[]);
  return `<div class="tb-study-tools"><details class="tb-notes"><summary>My notes <span>Open / close</span></summary>${html}</details>${indices.length?card(d,indices,'page-'+s.page,'Test bank · this slide'):'<p class="tb-no-match">No matching question in the supplied test bank for this slide.</p>'}</div>`;
 };
 const oldModule=moduleScreen;
 moduleScreen=function(){const html=oldModule.apply(this,arguments);return scope.has(selected)&&modern()&&mode!=='expanded'&&mode!=='quiz'?html+supplement(selected):html};
 // Keep slide questions directly after the transcript in the ordinary visual/transcript reader too.
 const oldTeach=teach;
 teach=function(m,expanded=false){
  const html=oldTeach.apply(this,arguments);
  if(expanded||view!=='module'||!scope.has(m.id)||!modern())return html;
  const template=document.createElement('template');template.innerHTML=html;
  const tools=template.content.querySelector('.tb-study-tools'),pane=template.content.querySelector('.transcript-pane');
  if(tools&&pane)pane.append(tools);
  return template.innerHTML;
 };
 function refresh(container,focus){
  const d=decks.get(container.dataset.tbDeck);if(!d)return;
  const indices=container.dataset.tbIndices.split(',').map(Number),slot=container.dataset.tbSlot,label=container.getAttribute('aria-label');
  const template=document.createElement('template');template.innerHTML=card(d,indices,slot,label);const next=template.content.firstElementChild;container.replaceWith(next);
  if(focus)next.querySelector('[data-tb-question]')?.focus({preventScroll:true});
  const count=document.querySelector(`[data-tb-count="${d.key.replace('bank-','')}"]`);if(count)count.textContent=d.items.filter(q=>Number.isInteger(d.record.answers[q.id])).length;
 }
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-tb-answer],[data-tb-move],[data-tb-retry]');if(!button)return;
  const container=button.closest('[data-tb-deck]'),d=decks.get(container?.dataset.tbDeck);if(!d)return;
  event.preventDefault();event.stopPropagation();
  if(button.hasAttribute('data-tb-answer')){const q=d.items[Number(button.dataset.tbIndex)];if(Number.isInteger(d.record.answers[q.id]))return;d.record.answers[q.id]=Number(button.dataset.tbAnswer)}
  else if(button.hasAttribute('data-tb-retry'))delete d.record.answers[d.items[Number(button.dataset.tbRetry)].id];
  else{const slot=container.dataset.tbSlot,limit=container.dataset.tbIndices.split(',').length;d.record.positions[slot]=Math.max(0,Math.min(limit-1,(Number(d.record.positions[slot])||0)+Number(button.dataset.tbMove)))}
  write();refresh(container,true);
 },true);
 document.addEventListener('change',event=>{if(!event.target.matches('[data-tb-filter]'))return;saved.filter=event.target.value;write();render();document.querySelector('[data-tb-filter]')?.focus()});
 window.PSYC301TestBank={slidePool,extraPool,deck,screen,supplement,storageKey:KEY};
 render();write();
})();
