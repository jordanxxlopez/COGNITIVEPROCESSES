'use strict';
// Shows source slides beside the text in the workspace views (Experiment cards, Hard topics,
// Q&A, Side-by-side contrasts). Text sits on the left and the slide, with its experiment
// videos, sits on the right. Nothing needs to be clicked to see the slide.
(() => {
 const e = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const moduleOf = id => (typeof M !== 'undefined' ? M : []).find(m => m.id === Number(id));

 // Slides for the given page numbers of one lecture, drawn the same way as the collections.
 window.aidSlides = function (moduleId, pages) {
  const mod = moduleOf(moduleId);
  if (!mod || !(pages && pages.length)) return '';
  const figs = pages
   .map(p => mod.sections.find(s => s.page === Number(p)))
   .filter(Boolean)
   .map(s => {
    const videos = typeof window.pvInline === 'function' ? window.pvInline(mod, s) : '';
    const body = s.media
     ? researchVisual(s)
     : `<img class="sourcepic" loading="lazy" src="${s.image}" alt="${e(s.title)} · original source page ${s.page}" data-zoom="1"><p class="caption">${s.reconstructed ? 'Reconstructed from supplied notes' : 'Original source page ' + s.page} · click to enlarge</p>`;
    return `<figure class="aid-fig">${body}${videos}</figure>`;
   });
  return figs.length ? `<div class="aid-figs">${figs.join('')}</div>` : '';
 };

 // Text on the left, slide on the right. Stacks on narrow screens.
 window.aidSplit = function (text, figs) {
  return figs ? `<div class="aid-split"><div class="aid-text">${text}</div><div class="aid-visual">${figs}</div></div>` : text;
 };

 const style = document.createElement('style');
 style.textContent = '.aid-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:start}.aid-text{min-width:0}.aid-visual{min-width:0;max-height:min(80vh,820px);overflow-y:auto;padding-right:6px}.aid-fig{margin:0 0 14px}.aid-fig .sourcepic{display:block;width:100%;height:auto}.aid-grid:has(.aid-split),.aid-grid2:has(.aid-split){grid-template-columns:minmax(0,1fr)}@media(max-width:760px){.aid-split{grid-template-columns:minmax(0,1fr)}.aid-visual{max-height:none;overflow:visible}}';
 document.head.append(style);
})();
