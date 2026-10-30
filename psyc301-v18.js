'use strict';
// An additional Prompt 2 teaching-script edition for Module II. It wraps the
// Version 18 controls, so every earlier edition, default and saved choice stays as it was.
(() => {
 const pack=window.PSYC301_V18,ids=new Set(pack.scope);
 const beforeControl=versionControl,beforeBullets=sectionBullets;
 const groupIds=new Set(['m2-core-all','m2-experiments-all']);
 const sourceId=(m,s)=>s.sourceModule??m.id;
 const isSelected=(m,s)=>ids.has(sourceId(m,s))&&state.explanationVersions[sourceId(m,s)]==='18';
 const marker=String.fromCharCode(92),open=marker+'[',close=marker+']';
 function equationText(text){
  return text.split(open).map((part,i)=>{if(!i)return part;const end=part.indexOf(close);return pack.mathSpeech[part.slice(0,end)]+part.slice(end+2)}).join('');
 }
 // Reuses the Version 6 prose class so its equation styling and read-aloud handler apply.
 function prose(text){
  const spoken=equationText(text).replace(/\*\*/g,'');
  const plain=part=>esc(part).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  let rest=text,html='',start=rest.indexOf(open);
  while(start>=0){
   const end=rest.indexOf(close,start+2);if(end<0)throw Error('Unclosed Version 18 equation');
   html+=plain(rest.slice(0,start))+katex.renderToString(rest.slice(start+2,end),{displayMode:true,throwOnError:true,output:'htmlAndMathml'});
   rest=rest.slice(end+2);start=rest.indexOf(open);
  }
  return `<span class="psyc-v6-prose" data-v6-spoken="${esc(spoken)}">${html+plain(rest)}</span>`;
 }
 versionControl=function(m){
  if(groupIds.has(m.id))return versionControl(moduleBy(6));
  let html=beforeControl(m);
  if(!ids.has(m.id)||!html)return html;
  html=html.replace('</select>','<option value="18">Version 18 · teaching scripts</option></select>');
  if(state.explanationVersions[m.id]==='18')html=html.replace(/ selected(?=[ >])/g,'').replace('<option value="18">','<option value="18" selected>');
  return html;
 };
 sectionBullets=function(m,s){
  if(!isSelected(m,s))return beforeBullets(m,s);
  const key=sourceId(m,s)+':'+s.page,script=pack.scripts[key];
  if(!script)throw Error('Missing Version 18 source page '+key);
  return script.map(b=>prose(b.text)+(b.children.length?`<ul class="psyc-v10-sub">${b.children.map(c=>`<li>${prose(c)}</li>`).join('')}</ul>`:''));
 };
 document.addEventListener('change',event=>{
  const el=event.target;
  if(!el.matches('[data-explanation-version]')||el.value!=='18')return;
  const id=Number(el.dataset.explanationVersion);
  if(!ids.has(id))return;
  event.stopImmediatePropagation();
  const scroll=window.scrollY;
  if('speechSynthesis'in window)window.speechSynthesis.cancel();
  state.explanationVersions[id]='18';save();render();window.scrollTo(0,scroll);
  document.querySelector('[data-explanation-version="'+id+'"]')?.focus({preventScroll:true});
 },true);
 window.PSYC301V18UI={sourceId,isSelected};
 render();
})();
