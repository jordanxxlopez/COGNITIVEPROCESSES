'use strict';
// Collection 15 · Articles and Labs (Module II, source id 14). Its Original, Version 20, Version 21 and
// Version 22 transcripts live in psyc301-c15-data.js, so the earlier editions and their data files are
// untouched. This script adds the version choice for the collection, keeps the figure beside the notes
// (Version 22 layout), and shows each credited figure with any playable experiment video.
(() => {
 const ID=14,text=window.C15_TEXT,pack=window.C15_MEDIA;
 if(!text||!pack||typeof versionControl!=='function'||typeof sectionHTML!=='function'||typeof sectionBullets!=='function')return;
 const LABELS={A:'Original','20':'Version 20 · natural teaching transcript','21':'Version 21 · natural teaching notes','22':'Version 22 · natural teaching notes with researchers and years'};
 if(!LABELS[state.explanationVersions[ID]])state.explanationVersions[ID]='22';
 const beforeControl=versionControl,beforeBullets=sectionBullets,beforeSection=sectionHTML;
 const sourceId=(m,s)=>s.sourceModule??m.id;
 const choice=()=>LABELS[state.explanationVersions[ID]]?state.explanationVersions[ID]:'22';
 const plain=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
 const prose=t=>`<span class="psyc-v6-prose" data-v6-spoken="${esc(t.replace(/\*\*/g,''))}">${plain(t)}</span>`;
 versionControl=function(m){
  if(m.id!==ID)return beforeControl(m);
  const now=choice();
  return `<label class="explanation-version">Explanation version <select data-explanation-version="${ID}" aria-label="Explanation version for ${esc(m.title)}">${['A','20','21','22'].map(k=>`<option value="${k}"${k===now?' selected':''}>${LABELS[k]}</option>`).join('')}</select></label>`;
 };
 sectionBullets=function(m,s){
  if(sourceId(m,s)!==ID||choice()==='A')return beforeBullets(m,s);
  const now=choice(),script=text[now]&&text[now][s.page];
  if(!script)throw Error('Missing collection 15 text '+now+':'+s.page);
  const follow=now==='22'?'<span class="psyc-v22-follow" hidden></span>':'';
  return script.map((b,i)=>(i?'':follow)+prose(b.text)+(b.children.length?`<ul class="psyc-v10-sub">${b.children.map(c=>`<li>${prose(c)}</li>`).join('')}</ul>`:''));
 };
 const link=(href,label)=>href?` <a href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`:'';
 function videos(list){
  if(!list||!list.length)return '<p class="caption">No verified experiment video for this topic.</p>';
  return list.map(v=>`<div class="research-video c15-video"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${esc(v.id)}" title="${esc(v.title)}" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><p class="caption"><strong>${esc(v.title)}</strong><br>${esc(v.channel)}${v.note?' · '+esc(v.note):''}${link('https://www.youtube.com/watch?v='+v.id,'Open on YouTube')}</p></div>`).join('');
 }
 sectionHTML=function(m,s,n){
  const html=beforeSection(m,s,n);
  const media=m.id===ID&&pack.sections[s.page];
  if(!media)return html;
  const badge=media.kind==='related'?'<span class="c15-badge">Related published study, not the CogLab task</span><br>':'';
  const caption=`<div class="caption c15-credit">${badge}<strong>${esc(media.credit)}</strong><br>${esc(media.description)}${link(media.doi?'https://doi.org/'+media.doi:media.source,'Original research')}</div>`;
  const swapped=html.replace(/<div class="caption">Original source page[^<]*<\/div>/,()=>caption+videos(media.videos));
  if(swapped===html)console.warn('Collection 15: figure credit was not applied to page '+s.page);
  return swapped
   .replace(/alt="([^"]*)· original source page \d+"/,(all,a)=>'alt="'+a+'· '+esc(media.credit)+'"');
 };
 document.addEventListener('change',event=>{
  const el=event.target;
  if(!el.matches('[data-explanation-version]')||Number(el.dataset.explanationVersion)!==ID||!LABELS[el.value])return;
  event.stopImmediatePropagation();
  const scroll=window.scrollY;
  if('speechSynthesis'in window)window.speechSynthesis.cancel();
  state.explanationVersions[ID]=el.value;save();render();window.scrollTo(0,scroll);
  document.querySelector('[data-explanation-version="'+ID+'"]')?.focus({preventScroll:true});
 },true);
 const style=document.createElement('style');
 style.textContent='.c15-video iframe{width:100%;aspect-ratio:16/9;border:0;border-radius:8px;background:#000}.c15-credit{margin-top:8px}.c15-badge{display:inline-block;margin-bottom:4px;padding:1px 8px;border-radius:999px;font-size:.78em;font-weight:600;background:rgba(120,90,200,.15);color:inherit}';
 document.head.appendChild(style);
 window.PSYC301C15UI={choice};
 render();
})();
