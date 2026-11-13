// Modern versions for the LING406 Study Studio (Modules I, II and III).
// Adds the PSYC301-style Versions 20 to 22 and the LING285-style Notes 9.3, Notes 10.1 and Simpler
// to the Transcript dropdown, and a Modernize button that shows only those versions.
// Loaded after each module's app.js. It wraps the app's own functions and changes no existing version.
(() => {
  'use strict';
  const path = location.pathname;
  const MOD = /\/module1\//.test(path) ? 'm1' : /\/module3\//.test(path) ? 'm3' : 'm2';
  const BASE = MOD === 'm2' ? 'modern/packs/' : '../modern/packs/';
  const LIST = (window.LING406_MODERN_MANIFEST || {})[MOD] || [];
  if (!LIST.length || typeof teachingBlocks !== 'function') return;
  const BY = new Map(LIST.map(v => [v.value, v]));
  const PACKS = window.LING406_MODERN_PACKS = window.LING406_MODERN_PACKS || {};
  const KEY = 'ling406-modern-' + MOD;
  const FOLLOW = new Set(['v21', 'v22']);
  let pref = {};
  try { pref = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch {}
  const savePref = () => { try { localStorage.setItem(KEY, JSON.stringify(pref)); } catch {} };
  const fallback = () => BY.get(pref.last) || LIST.find(v => v.id === 'simple') || LIST[LIST.length - 1];
  const packOf = v => PACKS[MOD + '-' + v.id];
  const current = () => BY.get(state.transcriptVersion);

  function loadPack(v) {
    if (packOf(v)) return Promise.resolve();
    return v.loading || (v.loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = BASE + v.file + '?v=' + v.revision;
      s.onload = () => packOf(v) ? resolve() : reject(new Error('empty pack'));
      s.onerror = () => { v.loading = null; s.remove(); reject(new Error('load failed')); };
      document.head.append(s);
    }));
  }

  const original = { blocks: teachingBlocks, selector: transcriptSelector, change: changeTranscriptVersion, html: transcriptHTML };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const modernOptions = () => LIST.map(v => `<option value="${v.value}">${esc(v.label)}</option>`).join('');
  const buttonHTML = () => `<button type="button" class="modernize-btn" data-modernize aria-pressed="${pref.modern ? 'true' : 'false'}" title="${pref.modern ? 'Showing only the modern versions. Click to show every version again.' : 'Show only the modern versions: Versions 20 to 22, Notes 9.3, Notes 10.1 and Simpler.'}">${pref.modern ? 'Modernized ✓ · show all versions' : '✦ Modernize'}</button>`;
  function selectInner(html) {
    const start = html.indexOf('>', html.indexOf('<select')) + 1, end = html.indexOf('</select>');
    const base = html.slice(start, end);
    return pref.modern ? modernOptions() : base + `<optgroup label="Modern versions">${modernOptions()}</optgroup>`;
  }

  teachingBlocks = function (s) {
    const v = current();
    if (!v) return original.blocks(s);
    const pack = packOf(v);
    return (pack && pack.scripts[s.id]) || [];
  };
  transcriptHTML = function (s) {
    if (!current() || MOD === 'm2') return original.html(s);
    const blocks = teachingBlocks(s);
    return blocks.length ? `<ul class="teaching-script">${blocks.map(b => `<li><p>${teachingRich(b.text)}</p>${b.children.length ? `<ul>${b.children.map(p => `<li><p>${teachingRich(p)}</p></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul>` : '';
  };
  transcriptSelector = function () {
    const html = original.selector();
    const start = html.indexOf('>', html.indexOf('<select')) + 1, end = html.indexOf('</select>');
    return (html.slice(0, start) + selectInner(html) + html.slice(end)).replace('</label>', '</label>' + buttonHTML());
  };
  changeTranscriptVersion = function (value) {
    const v = BY.get(Number(value));
    if (v) { choose(v); return; }
    pref.current = null; savePref(); applyChrome();
    original.change(value);
    applyChrome();
  };

  function rerender() {
    const scroll = window.scrollY, stage = document.querySelector('.expanded-stage'), stageScroll = stage ? stage.scrollTop : 0;
    if (reader) renderReader(); else render();
    applyChrome();
    requestAnimationFrame(() => { window.scrollTo(0, scroll); const now = document.querySelector('.expanded-stage'); if (now) now.scrollTop = stageScroll; });
  }
  function choose(v) {
    pref.current = v.value; pref.last = v.value; savePref();
    const status = document.querySelector('#saveStatus');
    if (!packOf(v) && status) status.textContent = 'Loading ' + v.label + '…';
    return loadPack(v).then(() => {
      if (typeof stopAudio === 'function') stopAudio();
      state.transcriptVersion = v.value; save(); rerender();
    }).catch(() => {
      pref.current = null; savePref();
      if (status) status.textContent = 'Could not load ' + v.label + '. Check the connection and try again.';
      applyChrome();
    });
  }

  let headerBase = null;
  function applyChrome() {
    const v = current();
    document.body.classList.toggle('ling406-modernized', !!pref.modern);
    document.body.classList.toggle('ling406-follow', !!pref.modern || !!(v && FOLLOW.has(v.id)));
    const headSelect = document.querySelector('header [data-transcript-version]');
    if (headSelect) {
      if (headerBase === null) headerBase = original.selector();
      headSelect.innerHTML = selectInner(headerBase);
      const label = headSelect.closest('label');
      let button = document.querySelector('header [data-modernize]');
      if (!button && label) { label.insertAdjacentHTML('afterend', buttonHTML()); button = document.querySelector('header [data-modernize]'); }
    }
    document.querySelectorAll('[data-modernize]').forEach(b => { const fresh = document.createElement('div'); fresh.innerHTML = buttonHTML(); const n = fresh.firstChild; b.setAttribute('aria-pressed', n.getAttribute('aria-pressed')); b.title = n.title; b.textContent = n.textContent; });
    document.querySelectorAll('[data-transcript-version]').forEach(el => { el.value = String(state.transcriptVersion); });
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-modernize]');
    if (!b) return;
    pref.modern = !pref.modern; savePref();
    if (pref.modern && !current()) choose(fallback()); else rerender();
  });

  window.LingModern = { module: MOD, versions: LIST, choose: id => { const v = LIST.find(x => x.id === id || x.value === Number(id)); return v ? choose(v) : Promise.reject(new Error('unknown version')); }, loadPack, get modernized() { return !!pref.modern; }, get current() { return current() || null; } };

  applyChrome();
  const startWith = BY.get(pref.current) || (pref.modern ? fallback() : null);
  if (startWith) choose(startWith); else rerender();
})();
