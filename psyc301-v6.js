'use strict';
// An additional edition for current Module II only. Existing content objects,
// edition choices, source identities and question banks are never rewritten.
(() => {
 const pack=window.PSYC301_V6,ids=new Set(pack.scope);
 const beforeControl=versionControl,beforeBullets=sectionBullets;
 const groupIds=new Set(['m2-core-all','m2-experiments-all']);
 const sourceId=(m,s)=>s.sourceModule??m.id;
 const isSelected=(m,s)=>ids.has(sourceId(m,s))&&state.explanationVersions[sourceId(m,s)]==='6';
 const flattenText=text=>text.replace(/\*\*/g,'');
 function equationText(text){
  const marker=String.fromCharCode(92),open=marker+'[',close=marker+']';
  return text.split(open).map((part,i)=>{if(!i)return part;const end=part.indexOf(close);return pack.mathSpeech[part.slice(0,end)]+part.slice(end+2)}).join('');
 }
 function teachingHTML(text){
  const spoken=flattenText(equationText(text));
  const plain=part=>esc(part).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  const marker=String.fromCharCode(92),open=marker+'[',close=marker+']';
  let rest=text,html='',start=rest.indexOf(open);
  while(start>=0){
   const end=rest.indexOf(close,start+2);if(end<0)throw Error('Unclosed Version 6 equation');
   html+=plain(rest.slice(0,start))+katex.renderToString(rest.slice(start+2,end),{displayMode:true,throwOnError:true,output:'htmlAndMathml'});
   rest=rest.slice(end+2);start=rest.indexOf(open);
  }
  return `<span class="psyc-v6-prose" data-v6-spoken="${esc(spoken)}">${html+plain(rest)}</span>`;
 }
 versionControl=function(m){
  if(groupIds.has(m.id))return versionControl(moduleBy(6));
  if(!ids.has(m.id))return beforeControl(m);
  const choice=state.explanationVersions[m.id];
  let html=beforeControl(m);
  if(!html)html=`<label class="explanation-version">Explanation version <select data-explanation-version="${m.id}" aria-label="Explanation version for ${esc(m.title)}"><option value="A">Original</option></select></label>`;
  html=html.replace('</select>','<option value="6">Version 6 · natural teaching</option></select>');
  if(choice==='6')html=html.replace(/ selected(?=[ >])/g,'').replace('<option value="6">','<option value="6" selected>');
  return html;
 };
 sectionBullets=function(m,s){
  if(!isSelected(m,s))return beforeBullets(m,s);
  const key=sourceId(m,s)+':'+s.page,script=pack.scripts[key];
  if(!script)throw Error('Missing Version 6 source page '+key);
  return script.map(teachingHTML);
 };
 // Handle the additional choice before the historical edition handler sees it.
 document.addEventListener('change',event=>{
  const el=event.target;
  if(!el.matches('[data-explanation-version]'))return;
  const id=Number(el.dataset.explanationVersion);
  if(!ids.has(id))return;
  const allowed=id===6?['A','2','6']:['A','6'];
  if(!allowed.includes(el.value))return;
  event.stopImmediatePropagation();
  const scroll=window.scrollY;
  if('speechSynthesis'in window)window.speechSynthesis.cancel();
  state.explanationVersions[id]=el.value;save();render();window.scrollTo(0,scroll);
  document.querySelector('[data-explanation-version="'+id+'"]')?.focus({preventScroll:true});
 },true);
 // Native KaTeX accessibility remains available, while spoken output avoids
 // reading the visible math and its accessibility representation twice.
 document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(button?.id!=='speak')return;
  const paragraphs=[...document.querySelectorAll('#spoken .psyc-v6-prose')];
  if(!paragraphs.length||!('speechSynthesis'in window))return;
  event.stopImmediatePropagation();window.speechSynthesis.cancel();
  const speech=new SpeechSynthesisUtterance(paragraphs.map(p=>p.dataset.v6Spoken).join(' '));
  speech.rate=.95;window.speechSynthesis.speak(speech);
 },true);
 window.PSYC301V6UI={sourceId,isSelected};
 render();
})();
