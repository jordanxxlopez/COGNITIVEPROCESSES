'use strict';
// A friend-facing copy of the Module II studio that offers only Versions 20, 21 and 22 (Articles and Labs offers its three rewritten editions).
// It is loaded only by psyc301-module2.html. The main studio and share.html are unchanged,
// and this page keeps its own progress under a separate storage key.
(() => {
 const EDITIONS = ['20', '21', '22'], REWRITTEN = ['r20', 'r21', 'r22'];
 // Articles and Labs (module 14) offers only its three rewritten editions; every other lecture offers 20, 21 and 22.
 const allowed = id => Number(id) === 14 ? REWRITTEN : EDITIONS, fallback = id => allowed(id)[0];
 const ids = new Set(secondHalf.modules);
 M.splice(0, M.length, ...M.filter(m => ids.has(m.id)));
 Q.splice(0, Q.length, ...secondQuestions());
 const allowedViews = new Set(['home', 'module', 'quiz', ...secondTools.map(([id]) => id), 'm2coreExpanded', 'm2experimentsExpanded']);
 // Keep only the allowed choices, defaulting each lecture to its first edition.
 const saved = state.explanationVersions && typeof state.explanationVersions === 'object' ? state.explanationVersions : {};
 const choices = Object.fromEntries([...ids].map(id => [id, allowed(id).includes(String(saved[id])) ? String(saved[id]) : fallback(id)]));
 Object.defineProperty(state, 'explanationVersions', {get: () => choices, set() {}, configurable: true, enumerable: true});
 // The edition scripts each add their option to the dropdown; this removes every option except 20 and 22.
 const limitEditions = () => { const fullControl = versionControl;
 versionControl = function(m) {
  const html = fullControl(m);
  if (!html) return html;
  const box = document.createElement('template');
  box.innerHTML = html;
  box.content.querySelectorAll('select[data-explanation-version]').forEach(select => {
   const id = Number(select.dataset.explanationVersion), current = choices[id] || fallback(id);
   select.querySelectorAll('option').forEach(option => { if (!allowed(id).includes(option.value)) option.remove(); });
   select.querySelectorAll('option').forEach(option => option.toggleAttribute('selected', option.value === current));
  });
  return box.innerHTML;
 };
 };
 limitEditions();
 // Scripts loaded after this one (such as Articles and Labs) add their own dropdowns, so wrap again once the page has loaded.
 window.addEventListener('load', () => { limitEditions(); render(); }, {once: true});
 nav = function() {
  $('#workspaceNav').innerHTML = `<button data-view="home" class="${view === 'home' ? 'active' : ''}">Module II overview</button><div class="label">Your workspace</div>${secondTools.map(([id, title]) => `<button data-view="${id}" class="${view === id ? 'active' : ''}">${title}${id === 'm2missed' ? ' · ' + secondQuestions().filter(q => state.missed.includes(q.id)).length : ''}</button>`).join('')}`;
  $('#moduleNav').innerHTML = secondModules().map(m => `<button data-module="${m.id}" class="${view === 'module' && selected === m.id ? 'active' : ''}"><span class="navnum">${esc(m.lectureNumber)}</span>${esc(m.title.replace(/^\d+ · /, ''))}</button>`).join('');
 };
 home = function() {
  return `<div class="hero"><span class="tag">PSYC301 · MODULE II</span><h1>Your study workspace</h1><p>Teaching notes, original lecture slides, experiments, and practice for Short-Term Memory, Working Memory, Problem Solving and Reasoning, and both parts of Judgment, Decision Making, and Reasoning.</p><p>Each lecture has three versions of the teaching notes. Version 20 is the natural teaching transcript. Version 21 keeps each slide beside its notes. Version 22 is the natural teaching notes with researchers and years.</p><p>Your notes and progress stay in your own browser.</p><div class="row"><button class="primary" data-view="m2guide">Open the study guide</button><button data-view="m2test">Take the current practice test</button></div></div><div class="grid">${secondModules().map(m => `<div class="card"><h2>${esc(m.title)}</h2><p>${m.sections.length} original pages with teaching notes and space for your own notes.</p><button data-module="${m.id}">Open lecture</button></div>`).join('')}</div>`;
 };
 const previousRender = render;
 render = function() {
  if (!allowedViews.has(view) || (view === 'module' && !ids.has(selected))) view = 'home';
  previousRender();
  if (view === 'm2missed') $('#content > p').textContent = `${secondQuestions().filter(q => state.missed.includes(q.id)).length} questions queued for your review.`;
  if (view === 'm2sources') {
   const heading = [...$('#content').querySelectorAll('h2')].find(el => el.textContent === 'Adding the next lecture');
   if (heading) { let next = heading.nextElementSibling; while (next) { const following = next.nextElementSibling; next.remove(); next = following; } heading.remove(); }
  }
 };
 document.title = 'PSYC301 · Module II · Study Studio';
 $('.topbar small').textContent = 'PSYC301 / MODULE II';
 document.querySelector('[data-course-switcher]')?.remove();
 // The deferred course switcher may mount after this synchronous script.
 document.addEventListener('DOMContentLoaded', () => document.querySelector('[data-course-switcher]')?.remove(), {once: true});
 window.PSYC301_FRIEND = {editions: EDITIONS, rewritten: REWRITTEN};
 view = 'home';
 render();
})();
