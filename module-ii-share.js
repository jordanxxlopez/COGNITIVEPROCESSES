'use strict';
// A friend-facing Module II workspace; the main studio retains all editions.
(() => {
 if (new URLSearchParams(location.search).get('module') !== 'ii') return;
 const ids = new Set(secondHalf.modules);
 M.splice(0, M.length, ...M.filter(m => ids.has(m.id)));
 Q.splice(0, Q.length, ...secondQuestions());
 const allowedViews = new Set(['home', 'module', 'quiz', ...secondTools.map(([id]) => id), 'm2coreExpanded', 'm2experimentsExpanded']);
 const fixedChoices = Object.fromEntries([...ids].map(id => [id, '18']));
 // Enforce the shared edition without changing the owner's saved choices.
 Object.defineProperty(state, 'explanationVersions', {get: () => fixedChoices, set() {}, configurable: true, enumerable: true});
 versionControl = () => '';
 nav = function() {
  $('#workspaceNav').innerHTML = `<button data-view="home" class="${view === 'home' ? 'active' : ''}">Module II overview</button><div class="label">Your workspace</div>${secondTools.map(([id, title]) => `<button data-view="${id}" class="${view === id ? 'active' : ''}">${title}${id === 'm2missed' ? ' · ' + secondQuestions().filter(q => state.missed.includes(q.id)).length : ''}</button>`).join('')}`;
  $('#moduleNav').innerHTML = secondModules().map(m => `<button data-module="${m.id}" class="${view === 'module' && selected === m.id ? 'active' : ''}"><span class="navnum">${esc(m.lectureNumber)}</span>${esc(m.title.replace(/^\d+ · /, ''))}</button>`).join('');
 };
 home = function() {
  return `<div class="hero"><span class="tag">PSYC301 · MODULE II</span><h1>Your study workspace</h1><p>Teaching notes, original lecture slides, experiments, and practice for Short-Term Memory, Working Memory, Problem Solving and Reasoning, and Judgment, Decision Making, and Reasoning.</p><p>Your notes and progress stay in your own browser.</p><div class="row"><button class="primary" data-view="m2guide">Open the study guide</button><button data-view="m2test">Take the current practice test</button></div></div><div class="grid">${secondModules().map(m => `<div class="card"><h2>${esc(m.title)}</h2><p>${m.sections.length} original pages with teaching notes and space for your own notes.</p><button data-module="${m.id}">Open lecture</button></div>`).join('')}</div>`;
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
 view = 'home';
 render();
})();
