'use strict';
// Version E (plain concepts, few numbers) and "Order to memorize", lecture by lecture.
// Content comes from plain-study-data.js (built by authoring/plain_study.py).
// Existing teaching versions A/B/C, question versions, notes and progress are untouched.
const PS=PLAIN_STUDY,PS_LEC=new Map(PS.lectures.map(l=>[l.id,l]));
const PS_M1=PS.lectures.filter(l=>l.id<17).map(l=>l.id),PS_M2=PS.lectures.filter(l=>l.id>=17).map(l=>l.id);
state.plain={known:{},drill:{},eVersion:'E',memoVersion:'words',lecture:2,m2lecture:17,...(state.plain||{})};
const PS_E={E:'Version E · plain concepts with the slide beside each idea',EB:'Version E · bold sentences only (fast review)',EQ:'Version E · questions first, then the ideas'};
const PS_MEMO={words:'Steps in words',formula:'Steps in words with the formula',list:'Just the order (one line per step)',drill:'Recall drill (say the next step, then show it)'};
const PS_VIEWS={plainStudy:'Plain concepts · lecture by lecture',memorize:'Order to memorize · by lecture',m2plain:'Plain concepts · lecture by lecture',m2memorize:'Order to memorize · by lecture'};
function psMd(t){return esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}
function psBold(t){const m=String(t).match(/\*\*(.+?)\*\*/);return m?m[1]:String(t).split(/(?<=\.)\s/)[0]}
function psIsE(v=state.scriptVersion){return String(v).startsWith('E')}
function psTypeId(lid,i){return lid+'-'+i}
function psHasCollection(lid){return DATA.modules.some(m=>m.id===lid)||(typeof M2!=='undefined'&&M2.modules.some(m=>m.id===lid))}
function psTier(l){return `<span class="ps-tier ps-tier-${esc(l.tier)}">${esc(PS.tiers[l.tier])}</span>`}
function psRef(lid,pages){return `<span class="ps-ref">Session ${lid} · ${pages.map(p=>'p'+p).join(' · ')}</span>`}

// ---------- Version E lecture page ----------
function psBlock(lid,b,mode){
 if(mode==='EB')return `<li>${psRef(lid,b.pages)} <strong>${esc(psBold(b.main))}</strong></li>`;
 const sub=(b.sub||[]).map(s=>`<li>${psMd(s)}</li>`).join('');
 return `<div class="ps-block"><div class="ps-text">${psRef(lid,b.pages)}<ul><li class="ps-main">${psMd(b.main)}${sub?`<ul>${sub}</ul>`:''}</li>${b.end?`<li>${psMd(b.end)}</li>`:''}</ul></div><figure class="ps-fig"><img class="sourcepic" loading="lazy" data-zoom src="${image(lid,b.pages[0])}" alt="Original Session ${lid}, PDF page ${b.pages[0]}"><figcaption class="caption">Session ${lid} · PDF page ${b.pages[0]} · click to enlarge</figcaption><div class="row ps-pages">${b.pages.map(p=>psHasCollection(lid)?`<button class="tiny" data-open-slide="${lid}:${p}">Page ${p}</button>`:`<button class="tiny" data-ps-zoom="${lid}:${p}">Page ${p}</button>`).join('')}</div></figure></div>`}
function psQuestions(l,open=false){return `<section class="ps-ask"><h2>What you can be asked</h2>${l.questions.map(q=>`<details class="ps-q" ${open?'open':''}><summary>${esc(q.q)}</summary><p>${psMd(q.a)}</p></details>`).join('')}</section>`}
function psLecture(lid,mode=state.scriptVersion,controls=''){
 const l=PS_LEC.get(lid);if(!psIsE(mode))mode='E';
 const topics=l.topics.map((t,i)=>`<details class="ps-topic" open><summary><span>${esc(t.title)}</span></summary><h3 class="ps-can">I can explain and apply these ideas</h3>${mode==='EB'?`<ul class="ps-fast">${t.blocks.map(b=>psBlock(lid,b,mode)).join('')}</ul>`:t.blocks.map(b=>psBlock(lid,b,mode)).join('')}</details>`).join('');
 const memoCount=l.memorize.length,known=l.memorize.filter((m,i)=>state.plain.known[psTypeId(lid,i)]).length;
 return `<span class="tag">VERSION E · SESSION ${lid}</span> ${psTier(l)}<h1>${esc(l.title)}</h1><p class="ps-lead">${psMd(l.lead)}</p>${controls}<div class="row no-print"><button data-ps-expand="1">Expand topics</button><button data-ps-expand="0">Collapse topics</button>${memoCount?`<button class="primary" data-ps-memo-go="${lid}">Order to memorize · ${known} of ${memoCount} learned</button>`:''}${psHasCollection(lid)?`<button data-open-slide="${lid}:${l.topics[0].blocks[0].pages[0]}">Open the original slides</button>`:`<a class="button-link" href="sources/session${lid}.pdf" target="_blank" rel="noopener">Original PDF</a>`}</div>${mode==='EQ'?psQuestions(l)+topics:topics+psQuestions(l)}${note('plain:'+lid,'My notes for this session')}`}

// ---------- Order to memorize ----------
function psStep(st,mode,n){
 const tab=st.table?`<span class="ps-table">${psMd(st.table)}${st.tablePath?` <a href="${st.tablePath.includes('#')?st.tablePath:st.tablePath+'#page=1'}" target="_blank" rel="noopener">Open the class table</a>`:''}</span>`:'';
 if(mode==='list')return `<li><strong>${psMd(st.do)}</strong>${tab}</li>`;
 return `<li><strong>${psMd(st.do)}</strong> <span class="ps-why">${psMd(st.why)}</span>${tab}${mode==='formula'&&st.tex?displayMath(st.tex):''}</li>`}
function psType(lid,m,i,mode){
 const id=psTypeId(lid,i),shown=mode==='drill'?Math.min(state.plain.drill[id]||0,m.steps.length):m.steps.length;
 const steps=m.steps.slice(0,shown).map((s,k)=>psStep(s,mode==='drill'?'words':mode,k)).join('');
 const hidden=m.steps.length-shown;
 return `<section class="card ps-type ${state.plain.known[id]?'ps-known':''}"><h2>${esc(m.title)}</h2><p class="ps-when">${psMd(m.when)}</p><ol class="ps-steps">${steps}${mode==='drill'&&hidden?Array.from({length:hidden},(_,k)=>`<li class="ps-cover">Say step ${shown+k+1} out loud, then show it.</li>`).join(''):''}</ol>${mode==='drill'?`<div class="row no-print">${hidden?`<button class="primary" data-ps-next="${id}">Show step ${shown+1} of ${m.steps.length}</button>`:''}<button data-ps-reset="${id}">Cover all steps again</button></div>`:''}<label class="checkline"><input type="checkbox" data-ps-known="${id}" ${state.plain.known[id]?'checked':''}> I can say this order from memory</label></section>`}
function psMemo(lid,controls=''){
 const l=PS_LEC.get(lid),mode=state.plain.memoVersion;
 const body=l.memorize.length?l.memorize.map((m,i)=>psType(lid,m,i,mode)).join(''):`<p class="notice">This session teaches the idea that the next session turns into a full procedure, so its steps to memorize are under Session ${lid+1}.</p>`;
 return `<span class="tag">ORDER TO MEMORIZE · SESSION ${lid}</span> ${psTier(l)}<h1>${esc(l.title)}</h1><p class="ps-lead">Learn each problem type as a fixed order of steps. Each step says what to write, and the sentence after it says why that step comes next.</p>${controls}<div class="row no-print"><button data-ps-plain-go="${lid}">Read the plain concepts for Session ${lid}</button></div>${body}`}

// ---------- shared workspace shell (lecture chips and version dropdowns) ----------
function psChips(ids,current,kind){return `<div class="ps-chips no-print" role="group" aria-label="Choose a session">${ids.map(id=>{const l=PS_LEC.get(id),k=l.memorize.filter((m,i)=>state.plain.known[psTypeId(id,i)]).length;return `<button class="${id===current?'active':''}" data-ps-lecture="${id}" data-ps-kind="${kind}" aria-pressed="${id===current}">S${id}${kind==='memo'&&l.memorize.length?` <small>${k}/${l.memorize.length}</small>`:''}</button>`}).join('')}</div>`}
function psSelect(attr,options,value,label){return `<label class="script-select">${label} <select ${attr} aria-label="${label}">${Object.entries(options).map(([k,t])=>`<option value="${k}" ${value===k?'selected':''}>${t}</option>`).join('')}</select></label>`}
function psScreen(){
 const m2=view.startsWith('m2'),ids=m2?PS_M2:PS_M1,key=m2?'m2lecture':'lecture';
 let lid=state.plain[key];if(!ids.includes(lid))lid=ids[0];
 if(view==='plainStudy'||view==='m2plain'){
  const controls=psChips(ids,lid,'plain')+psSelect('data-ps-eversion',PS_E,state.plain.eVersion,'Version');
  return psLecture(lid,state.plain.eVersion,controls)}
 const controls=psChips(ids,lid,'memo')+psSelect('data-ps-memo-version',PS_MEMO,state.plain.memoVersion,'Version');
 return psMemo(lid,controls)}

// ---------- hooks into the existing studio ----------
NAV.splice(1,0,['plainStudy',PS_VIEWS.plainStudy],['memorize',PS_VIEWS.memorize]);
M2_NAV.splice(1,0,['m2plain',PS_VIEWS.m2plain],['m2memorize',PS_VIEWS.m2memorize]);
const psOrigSelector=scriptSelector;
scriptSelector=function(){return psOrigSelector().replace('</select>',Object.entries(PS_E).map(([k,t])=>`<option value="${k}" ${state.scriptVersion===k?'selected':''}>${t}</option>`).join('')+'</select>')};
const psOrigModuleScreen=moduleScreen;
moduleScreen=function(){if(psIsE()&&PS_LEC.has(selectedModule))return psLecture(selectedModule,state.scriptVersion,selectedModule>=17?psM2Selector():scriptSelector());return psOrigModuleScreen()};
function psM2Selector(){const base=psIsE()?'B':state.scriptVersion;return psSelect('data-script-version',{[base]:'Original Module II teaching',...PS_E},state.scriptVersion,'Teaching version')}
const psOrigM2Collection=m2Collection;
m2Collection=function(){return psOrigM2Collection().replace('</h1>','</h1>'+psM2Selector())};
const psPrevRender=render;
render=function(){
 if(!PS_VIEWS[view])return psPrevRender();
 applyAppearance();nav();document.body.classList.remove('expanded');
 $('#content').innerHTML=psScreen();typesetContent();
 document.querySelectorAll('[data-note]').forEach(sizeNote);
 document.querySelectorAll('[data-zoom]').forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Enlarge '+img.alt)});
 m2Context()};
document.addEventListener('change',e=>{const x=e.target;
 if(x.matches('[data-ps-eversion]')){state.plain.eVersion=x.value;save();render()}
 if(x.matches('[data-ps-memo-version]')){state.plain.memoVersion=x.value;save();render()}
 if(x.dataset.psKnown){state.plain.known[x.dataset.psKnown]=x.checked;if(!x.checked)delete state.plain.known[x.dataset.psKnown];save();render()}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.psLecture){const lid=Number(d.psLecture);state.plain[lid>=17?'m2lecture':'lecture']=lid;save();render();window.scrollTo(0,0)}
 if(d.psNext){state.plain.drill[d.psNext]=(state.plain.drill[d.psNext]||0)+1;save();render();document.querySelector(`[data-ps-next="${d.psNext}"],[data-ps-reset="${d.psNext}"]`)?.focus()}
 if(d.psZoom){const[lid,p]=d.psZoom.split(':');modalImage({src:image(lid,p),alt:`Original Session ${lid}, PDF page ${p}`,focus:()=>b.focus()})}
 if(d.psReset){state.plain.drill[d.psReset]=0;save();render()}
 if(d.psExpand!==undefined)document.querySelectorAll('details.ps-topic').forEach(el=>el.open=d.psExpand==='1');
 if(d.psMemoGo){const lid=Number(d.psMemoGo);state.plain[lid>=17?'m2lecture':'lecture']=lid;save();go(lid>=17?'m2memorize':'memorize')}
 if(d.psPlainGo){const lid=Number(d.psPlainGo);state.plain[lid>=17?'m2lecture':'lecture']=lid;save();go(lid>=17?'m2plain':'plainStudy')}},true);
['m2plain','m2memorize'].forEach(v=>m2Views.add(v));
{const q=new URLSearchParams(location.search).get('view');if(PS_VIEWS[q]){view=q;const s=Number(new URLSearchParams(location.search).get('session'));if(PS_LEC.has(s))state.plain[s>=17?'m2lecture':'lecture']=s;render()}else render()}
