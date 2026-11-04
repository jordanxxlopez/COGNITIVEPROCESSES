'use strict';
(() => {
 const entries=window.LING285_STIMULI || [];
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function card(m,links=false) {
  const media=m.type==='audio'?'<audio controls preload="none" aria-label="'+esc(m.title)+'"><source data-src="'+esc(m.file)+'"></audio>':'<video controls playsinline preload="none" '+(m.poster?'poster="'+esc(m.poster)+'"':'')+' aria-label="'+esc(m.title)+'"><source data-src="'+esc(m.file)+'" type="video/mp4"></video>';
  return '<article class="stimulus-card" data-stimulus="'+esc(m.id)+'"><h3>'+esc(m.title)+'</h3>'+media+'<p class="stimulus-kind">'+esc(m.kind)+'</p><p>'+esc(m.description)+'</p><div class="stimulus-links"><a href="'+esc(m.file)+'" target="_blank" rel="noopener">Open media</a>'+(m.audio?' · <a href="'+esc(m.audio)+'">Audio only</a>':'')+(m.source_url?' · <a href="'+esc(m.source_url)+'" target="_blank" rel="noopener">Recording / method source</a>':'')+'</div>'+(links?'<details><summary>Matching slides · '+m.slides.length+'</summary>'+m.sourceSlides.map(s=>'<p><button type="button" class="text-button" data-open-section="'+esc(s.id)+'">'+esc(s.id+' · '+s.title)+'</button></p>').join('')+'</details>':'')+'</article>';
 }
 window.Ling285Stimuli={
  render(s){const matches=entries.filter(m=>!m.original && m.slides.includes(s.id));return matches.length?'<section class="stimuli-inline" aria-label="Sounds and visual demonstrations"><h2>Sounds & videos</h2>'+matches.map(m=>card(m)).join('')+'</section>':'';},
  gallery(module){const matches=entries.filter(m=>m.modules.includes(module));return '<span class="eyebrow">LING285 · '+esc(module==='module1'?'Module I':'Module II')+'</span><h1>Sounds & videos</h1><p>Play the sounds, follow the calculations, and watch the original demonstrations. New videos use conventional drawing and signal-processing code. Human recordings and calculated tones are identified below each player.</p><p><a href="stimuli/qa/coverage.json">Slide coverage</a> · <a href="stimuli/README.md">Sources and construction methods</a></p><h2>Added listening and visual demonstrations</h2><div class="stimuli-grid">'+matches.filter(m=>!m.original).map(m=>card(m,true)).join('')+'</div><h2>Original embedded course media</h2><div class="stimuli-grid">'+matches.filter(m=>m.original).map(m=>card(m,true)).join('')+'</div>';}
 };
 // Preserve native keyboard seeking inside the expanded slide reader.
 document.addEventListener('keydown',e=>{if(e.target.closest?.('.stimulus-card') && /^(VIDEO|AUDIO)$/.test(e.target.tagName))e.stopPropagation();},true);
 document.addEventListener('play',e=>{if(!/^(VIDEO|AUDIO)$/.test(e.target.tagName))return;document.querySelectorAll('video,audio').forEach(m=>{if(m!==e.target)m.pause();});},true);
})();
