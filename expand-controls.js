'use strict';
// One Expand all / Collapse all button for any study page with collapsible groups.
// It opens and closes groups and sections only. Question items (What you can be asked,
// Q&A questions) keep their own open state, and so does any search-hidden item.
(() => {
 const QUESTION = '.aid-qa,.qa-item';
 const BAR = 'expand-all-bar';
 const style = document.createElement('style');
 style.textContent = '.expand-all-bar{display:flex;align-items:center;gap:10px;margin:14px 0}';
 document.head.append(style);

 const content = () => document.getElementById('content');
 const targets = root => [...root.querySelectorAll('details')].filter(d =>
  !d.closest(QUESTION) && !d.closest('.hidden'));
 // A page gets the button only if it has something that opens and closes.
 const eligible = root => targets(root).length >= 1;
 const labelFor = root => {
  const t = targets(root);
  return t.length && t.every(d => d.open) ? 'Collapse all' : 'Expand all';
 };

 function refreshLabel() {
  const root = content();
  const button = root && root.querySelector('[data-expand-all]');
  if (button) button.textContent = labelFor(root);
 }

 function ensureBar() {
  const root = content();
  if (!root) return;
  const existing = root.querySelector('#' + BAR);
  if (!eligible(root)) { if (existing) existing.remove(); return; }
  if (!existing) {
   const bar = document.createElement('div');
   bar.id = BAR;
   bar.className = 'expand-all-bar';
   const button = document.createElement('button');
   button.type = 'button';
   button.className = 'tiny';
   button.dataset.expandAll = '';
   bar.append(button);
   targets(root)[0].before(bar);
  }
  refreshLabel();
 }

 document.addEventListener('click', e => {
  const button = e.target.closest('[data-expand-all]');
  if (!button) return;
  const root = content();
  const t = targets(root);
  const openEverything = t.some(d => !d.open);
  t.forEach(d => { d.open = openEverything; });
  refreshLabel();
 });

 // Manual open/close of a single group also updates the label.
 document.addEventListener('toggle', e => {
  if (e.target.closest && e.target.closest('#content')) refreshLabel();
 }, true);

 const root = content();
 if (root) new MutationObserver(ensureBar).observe(root, { childList: true });
 ensureBar();
})();
