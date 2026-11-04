'use strict';
// A sentence-only edition. The original renderers, hypothesis notation,
// question versions, source slides, calculations and saved study state stay intact.
(() => {
 const records=new Map(),identities=new WeakMap();
 function register(h,key,edition){
  if(!h||!edition)return;
  records.set(key,{original:h,edition});identities.set(h,key);
 }
 for(const category of ['topics','rules','slides'])
  for(const [id,h] of Object.entries(HYPOTHESES[category]))register(h,category+':'+id,BME_HYPOTHESIS_WORDING_V2[category][id]);
 for(const [id,h] of Object.entries(HYPOTHESES.problems))
  register(h,'problem:'+id,()=>BME_HYPOTHESIS_WORDING_V2[state.questionVersion==='C'?'problemsC':'problems'][id]);
 for(const [id,hs] of Object.entries(HYPOTHESES.sources))
  hs.forEach((h,i)=>register(h,'source:'+id+':'+i,BME_HYPOTHESIS_WORDING_V2.sources[id][i]));
 for(const c of M2.cases)register(c.hypotheses,'moduleII:'+c.id,BME_HYPOTHESIS_WORDING_V2.moduleII[c.id]);
 function version2(){return state.hypothesisWordingVersion==='2'}
 // Default to the requested new edition, retaining the original as Version 1.
 if(!['1','2'].includes(state.hypothesisWordingVersion))state.hypothesisWordingVersion='2';
 function sentence(key,kind){
  const r=records.get(key),h=version2()?(typeof r.edition==='function'?r.edition():r.edition):r.original;
  return h[kind==='null'?'nullWords':'alternativeWords'];
 }
 function wordsHTML(key,kind,moduleII=false){
  const label=kind==='null'?'Null hypothesis':'Alternative hypothesis';
  // Original Module II sentences are unlabelled. Preserve them byte-for-byte in V1.
  const prefix=moduleII?(version2()?`<strong>${label}.</strong> `:''):`<strong>${label} in words:</strong> `;
  return prefix+esc(sentence(key,kind));
 }
 const originalWords=hypothesisWords;
 hypothesisWords=function(h,kind){
  const key=identities.get(h);
  if(!key)return originalWords(h,kind);
  return `<span class="hypothesis-words" data-hypothesis-words="${kind}" data-hypothesis-wording-key="${esc(key)}">${wordsHTML(key,kind)}</span>`;
 };
 let slideContext=null;
 const originalSlideHypothesis=m2SlideHypothesis;
 m2SlideHypothesis=function(s){
  const previous=slideContext;slideContext=s;
  try{return originalSlideHypothesis(s)}finally{slideContext=previous}
 };
 const originalM2Hypotheses=m2Hypotheses;
 m2Hypotheses=function(h){
  if(!h)return originalM2Hypotheses(h);
  let key=identities.get(h);
  if(!key&&slideContext){
   key='moduleII-slide:'+slideContext.page;
   register(h,key,BME_HYPOTHESIS_WORDING_V2.moduleIISlides[slideContext.page]);
  }
  if(!records.has(key))return originalM2Hypotheses(h);
  let html=originalM2Hypotheses(h);
  for(const kind of ['null','alternative']){
   const old=h[kind==='null'?'nullWords':'alternativeWords'];
   html=html.replace(`<p>${esc(old)}</p>`,`<p data-hypothesis-words="${kind}" data-hypothesis-wording-key="${esc(key)}" data-hypothesis-module-ii>${wordsHTML(key,kind,true)}</p>`);
  }
  return html;
 };
 function selector(){
  return `<label class="question-version" data-hypothesis-wording-control>Hypothesis wording<select data-hypothesis-wording-select aria-label="Hypothesis wording"><option value="1" ${version2()?'':'selected'}>Version 1 · original sentences</option><option value="2" ${version2()?'selected':''}>Version 2 · contextual sentences</option></select></label>`;
 }
 function mount(){
  document.querySelectorAll('[data-hypothesis-wording-control]').forEach(el=>el.remove());
  const host=view==='viewer'?document.querySelector('.viewer-controls'):document.querySelector('.topbar');
  if(!host)return;
  const before=host.querySelector(view==='viewer'?'#exitViewer':'#toggleSide');
  if(before)before.insertAdjacentHTML('beforebegin',selector());else host.insertAdjacentHTML('beforeend',selector());
 }
 const originalRender=render;
 render=function(){const result=originalRender();mount();return result};
 document.addEventListener('change',event=>{
  if(!event.target.matches('[data-hypothesis-wording-select]'))return;
  if(!['1','2'].includes(event.target.value))return;
  state.hypothesisWordingVersion=event.target.value;
  // Update only the dedicated verbal sentences. Do not rebuild the page,
  // reset a quiz, close an open slide, lose focus or touch a notes field.
  document.querySelectorAll('[data-hypothesis-wording-key]').forEach(el=>{
   el.innerHTML=wordsHTML(el.dataset.hypothesisWordingKey,el.dataset.hypothesisWords,el.hasAttribute('data-hypothesis-module-ii'));
  });
  document.querySelectorAll('[data-hypothesis-wording-select]').forEach(el=>el.value=state.hypothesisWordingVersion);
  save();
 });
 render();save();
})();
