// LING406 study layer: Study this first, Notes by topic, Exam review guide, What you can be asked,
// Experiment cards, Side-by-side contrasts and Hard topics, in Modules I, II and III.
// Loaded after each module's app.js and modern-versions.js. It wraps nav() and render() and edits no app.js.
(() => {
  'use strict';
  const MOD = /\/module1\//.test(location.pathname) ? 'm1' : /\/module3\//.test(location.pathname) ? 'm3' : 'm2';
  const DATA = (window.LING406_STUDY || {})[MOD];
  if (!DATA || typeof render !== 'function' || typeof nav !== 'function') return;
  const KEY = 'ling406-study-' + MOD;
  let pref = { figures: true, answers: false, tier: 'all', bytopicShow: 'both' };
  try { Object.assign(pref, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
  const savePref = () => { try { localStorage.setItem(KEY, JSON.stringify(pref)); } catch {} };
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const R = s => E(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const sec = id => (typeof sections !== 'undefined' && sections.get(id)) || null;
  const exam = DATA.meta?.exam || 'exam';
  const VIEWS = [
    ['study-first', 'Study this first', () => (DATA.topics || []).length],
    ['study-review', exam === 'Final' ? 'Final review guide' : 'Exam review guide', () => (DATA.review?.items || []).length],
    ['study-ask', 'What you can be asked', () => 1],
    ['study-bytopic', 'Notes by topic', () => Object.keys(DATA.bytopic || {}).length],
    ['study-cards', 'Experiment cards', () => (DATA.experiments || []).length],
    ['study-contrasts', 'Side-by-side contrasts', () => (DATA.contrasts || []).length],
    ['study-hard', 'Hard topics', () => (DATA.hard || []).length],
  ].filter(v => v[2]());
  const IS = new Set(VIEWS.map(v => v[0]));
  const topicTitle = new Map((DATA.topics || []).map(t => [t.id, t.title]));

  // ---------- shared pieces ----------
  function refLabel(id) {
    const s = sec(id);
    if (!s) return E(id);
    const col = typeof modules !== 'undefined' && modules.get(s.module);
    return `${E(col ? (col.number ? col.number + ' · ' : '') + col.title : s.module)} · p${E(s.page)}`;
  }
  const refLinks = refs => (refs || []).length ? `<p class="study-refs small muted">${refs.map(id => `<button type="button" class="linkish" data-study-open="${E(id)}">${refLabel(id)}</button>`).join(' · ')}</p>` : '';
  function slide(id, cls = '') {
    const s = sec(id);
    if (!s || !s.image) return '';
    return `<figure class="study-slide ${cls}"><img src="${E(s.image)}" alt="${E(s.title || 'Source slide')}" loading="lazy"><figcaption class="small muted">${refLabel(id)} · ${E(s.title || '')}</figcaption></figure>`;
  }
  const answer = (a, open) => `<details class="study-answer"${open ? ' open' : ''}><summary>Answer</summary><p>${R(a)}</p></details>`;
  const tierTag = t => t ? `<span class="study-tier ${t === 'Possible' ? 'possible' : 'review'}">${E(t)}</span>` : '';
  const kindTag = k => k ? `<span class="study-tier ${k === 'Predicted' ? 'possible' : 'review'}">${E(k)}</span>` : '';
  function question(q, a, refs, tag) {
    return `<div class="study-q">${tag || ''}<p class="study-qtext"><strong>${R(q)}</strong></p>${pref.figures && refs && refs[0] ? slide(refs[0], 'study-qfig') : ''}${answer(a, pref.answers)}${refLinks(refs)}</div>`;
  }
  function controls(opts = {}) {
    const fig = `<label class="study-ctl">Figures <select data-study-pref="figures"><option value="1"${pref.figures ? ' selected' : ''}>Show the slide under each question</option><option value="0"${!pref.figures ? ' selected' : ''}>Hide figures</option></select></label>`;
    const ans = `<label class="study-ctl">Answers <select data-study-pref="answers"><option value="0"${!pref.answers ? ' selected' : ''}>Hidden until opened</option><option value="1"${pref.answers ? ' selected' : ''}>All shown</option></select></label>`;
    const tier = opts.tier ? `<label class="study-ctl">Priority <select data-study-pref="tier"><option value="all"${pref.tier === 'all' ? ' selected' : ''}>Everything</option><option value="review"${pref.tier === 'review' ? ' selected' : ''}>On the review deck first only</option></select></label>` : '';
    const show = opts.bytopic ? `<label class="study-ctl">Show <select data-study-pref="bytopicShow"><option value="both"${pref.bytopicShow === 'both' ? ' selected' : ''}>Notes with the slide beside them</option><option value="notes"${pref.bytopicShow === 'notes' ? ' selected' : ''}>Notes only</option></select></label>` : '';
    return `<div class="row study-tools study-controls">${opts.noFig ? '' : fig}${opts.noAns ? '' : ans}${tier}${show}<button type="button" data-action="print">Print</button></div>`;
  }
  const header = (tag, title, lead) => `<span class="tag">${E(tag)}</span><h1>${E(title)}</h1>${lead ? `<p>${R(lead)}</p>` : ''}`;
  const flags = () => (DATA.meta?.flags || []).length ? `<details class="card study-flags"><summary>About these answers</summary><ul>${DATA.meta.flags.map(f => `<li>${R(f)}</li>`).join('')}</ul></details>` : '';

  // ---------- views ----------
  function studyFirst() {
    const topics = DATA.topics || [];
    const toc = `<nav class="card study-toc"><strong>Topics</strong><ol>${topics.map(t => `<li><a href="#st-${E(t.id)}">${E(t.title)}</a> ${tierTag(t.tier)}</li>`).join('')}</ol></nav>`;
    const body = topics.map((t, ti) => `<section class="study-topic card" id="st-${E(t.id)}"><h2><span class="nav-num">${ti + 1}</span>${E(t.title)} ${tierTag(t.tier)}</h2>${
      (t.blocks || []).map((b, bi) => `<div class="study-block"><div class="study-notes"><p>${R(b.main)}</p>${(b.sub || []).length ? `<ul>${b.sub.map(s => `<li>${R(s)}</li>`).join('')}</ul>` : ''}${b.end ? `<p>${R(b.end)}</p>` : ''}${refLinks(b.refs)}${typeof noteBox === 'function' ? noteBox(`study:${MOD}:${t.id}:${bi}`) : ''}</div><div class="study-side">${slide(b.refs && b.refs[0])}</div></div>`).join('')
    }<h3>What you can be asked</h3>${(t.questions || []).map(q => question(q.q, q.a, q.refs, tierTag(q.tier))).join('')}</section>`).join('');
    return header('STUDY THIS FIRST', 'Study this first · ' + (DATA.meta?.exam || ''), DATA.meta?.lead) + controls() + flags() + toc + body;
  }
  function reviewView() {
    const rv = DATA.review || {};
    const items = rv.items || [];
    return header('REVIEW GUIDE', rv.title || 'Exam review guide', rv.lead) + controls() + flags() +
      items.map(it => `<div class="card study-item"><p class="small muted">${E(it.n ? 'Question ' + it.n : '')}${it.source ? ' · ' + E(it.source) : ''}</p>${question(it.q, it.a, it.refs, kindTag(it.kind))}</div>`).join('');
  }
  function askView() {
    const groups = (DATA.topics || []).map(t => ({ title: t.title, tier: t.tier, qs: (t.questions || []).filter(q => pref.tier === 'all' || q.tier === 'On the review deck') })).filter(g => g.qs.length);
    const review = (DATA.review?.items || []).filter(it => pref.tier === 'all' || it.kind === 'Review');
    return header('PRACTICE', 'What you can be asked', 'Every question from the review guide and every topic question in one place. Answer it out loud first, then open the answer.') + controls({ tier: true }) +
      `<section class="card"><h2>${E(DATA.review?.title || 'Review guide')}</h2>${review.map(it => question(it.q, it.a, it.refs, kindTag(it.kind))).join('')}</section>` +
      groups.map(g => `<section class="card"><h2>${E(g.title)} ${tierTag(g.tier)}</h2>${g.qs.map(q => question(q.q, q.a, q.refs, tierTag(q.tier))).join('')}</section>`).join('');
  }
  function bytopicView() {
    const both = pref.bytopicShow !== 'notes';
    const body = Object.entries(DATA.bytopic || {}).map(([tid, ids], i) => `<section class="card study-topic" id="bt-${E(tid)}"><h2><span class="nav-num">${i + 1}</span>${E(topicTitle.get(tid) || tid)}</h2>${
      ids.map(id => { const s = sec(id); if (!s) return ''; const notes = typeof transcriptHTML === 'function' ? transcriptHTML(s) : ''; return `<div class="study-block${both ? '' : ' notes-only'}"><div class="study-notes"><h3 class="small">${E(s.title || '')}</h3>${notes || '<p class="muted small">No notes on this page in the selected version.</p>'}${refLinks([id])}</div>${both ? `<div class="study-side">${slide(id)}</div>` : ''}</div>`; }).join('')
    }</section>`).join('');
    const ver = typeof transcriptSelector === 'function' ? `<div class="study-version">${transcriptSelector()}</div>` : '';
    return header('NOTES BY TOPIC', 'Notes by topic', 'Every taught slide, grouped by subject instead of by deck. The notes are the transcript version you pick here or in the header, so the Modernize versions work here too.') + ver + controls({ noFig: true, noAns: true, bytopic: true }) + body;
  }
  function cardsView() {
    return header('EXPERIMENTS', 'Experiment cards', 'Every study in this module, tied to its researchers and year as the slides give them.') + controls({ noAns: true }) +
      (DATA.experiments || []).map(e => `<article class="card study-card"><h2>${R(e.who)} · ${R(e.title)}</h2><div class="study-block"><div class="study-notes">${
        [['What they asked', e.asked], ['What people did', e.did], ['What happened', e.found], ['What it means', e.means]].map(([h, t]) => `<h3 class="small">${h}</h3><p>${R(t)}</p>`).join('')
      }${refLinks(e.refs)}</div><div class="study-side">${pref.figures ? slide(e.refs && e.refs[0]) : ''}</div></div></article>`).join('');
  }
  function contrastsView() {
    return header('CONTRASTS', 'Side-by-side contrasts', 'Ideas this module sets against each other, lined up point by point.') + controls({ noAns: true }) +
      (DATA.contrasts || []).map(c => `<article class="card study-contrast"><h2>${R(c.title)}</h2><div class="study-sides" style="--n:${(c.sides || []).length}">${
        (c.sides || []).map(s => `<div class="study-sidecol"><h3>${R(s.name)}</h3><ul>${(s.points || []).map(p => `<li>${R(p)}</li>`).join('')}</ul></div>`).join('')
      }</div><p>${R(c.why)}</p>${pref.figures ? `<div class="study-figrow">${(c.refs || []).slice(0, 2).map(id => slide(id)).join('')}</div>` : ''}${refLinks(c.refs)}</article>`).join('');
  }
  function hardView() {
    return header('HARD TOPICS', 'Hard topics', 'The ideas most often learned backwards, each one set straight.') + controls({ noAns: true }) +
      (DATA.hard || []).map(h => `<article class="card study-hard"><h2>${R(h.title)}</h2><p class="study-trap"><span class="study-tier possible">Easy to get backwards</span> ${R(h.trap)}</p><div class="study-block"><div class="study-notes"><p>${R(h.text)}</p>${refLinks(h.refs)}</div><div class="study-side">${pref.figures ? slide(h.refs && h.refs[0]) : ''}</div></div></article>`).join('');
  }
  const ROUTES = { 'study-first': studyFirst, 'study-review': reviewView, 'study-ask': askView, 'study-bytopic': bytopicView, 'study-cards': cardsView, 'study-contrasts': contrastsView, 'study-hard': hardView };

  // ---------- question wording (Original / College / Simple), as in the LING285 studio ----------
  const WORDING = DATA.wording || null, ORIGINAL_STEM = new Map();
  const QUIZ_VIEWS = new Set(['test', 'quizzes', 'quiz', 'missed']);
  function applyWording() {
    if (!WORDING || typeof questions === 'undefined') return;
    const w = pref.wording || 'original';
    for (const q of questions.values()) {
      if (!ORIGINAL_STEM.has(q.id)) ORIGINAL_STEM.set(q.id, q.stem);
      q.stem = w === 'original' ? ORIGINAL_STEM.get(q.id) : ((WORDING[q.id] || {})[w] || ORIGINAL_STEM.get(q.id));
    }
  }
  const wordingControl = () => WORDING ? `<div class="row study-tools study-controls study-wording"><label class="study-ctl">Question wording <select data-study-pref="wording">${[['original', 'Original'], ['college', 'College'], ['simple', 'Simple']].map(([id, label]) => `<option value="${id}"${(pref.wording || 'original') === id ? ' selected' : ''}>${label}</option>`).join('')}</select></label><span class="small muted">Only the question changes. The choices and the right answer stay the same.</span></div>` : '';
  applyWording();

  // ---------- hooks into the app ----------
  const original = { nav, render };
  nav = function () {
    original.nav();
    const wn = document.querySelector('#workNav');
    if (!wn || wn.querySelector('[data-study-nav]')) return;
    wn.insertAdjacentHTML('afterbegin', `<div class="small muted study-navhead" data-study-nav>Study pages</div>` + VIEWS.map(([id, title]) => `<button data-go="${id}" data-study-nav class="${view === id ? 'active' : ''}">${E(title)}</button>`).join('') + `<div class="small muted study-navhead" data-study-nav>Workspace</div>`);
  };
  render = function () {
    if (!IS.has(view)) {
      const out = original.render();
      if (WORDING && QUIZ_VIEWS.has(view)) {
        const c = document.querySelector('#content'), h = c && c.querySelector('h1');
        if (c && !c.querySelector('.study-wording')) (h ? h.insertAdjacentHTML('afterend', wordingControl()) : c.insertAdjacentHTML('afterbegin', wordingControl()));
      }
      return out;
    }
    document.body.classList.remove('reading-expanded');
    document.querySelector('#main').inert = false; document.querySelector('#sidebar').inert = false;
    nav(); applyPreferences();
    document.querySelector('#content').innerHTML = ROUTES[view]();
    if (typeof syncVersionControls === 'function') syncVersionControls();
    document.querySelectorAll('[data-note]').forEach(el => typeof sizeNote === 'function' && sizeNote(el));
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  };

  document.addEventListener('change', e => {
    const el = e.target.closest('[data-study-pref]');
    if (!el) return;
    const k = el.dataset.studyPref;
    pref[k] = (k === 'figures' || k === 'answers') ? el.value === '1' : el.value;
    savePref();
    if (k === 'wording') applyWording();
    const y = scrollY; render(); scrollTo(0, y);
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-study-open]');
    if (!b) return;
    const s = sec(b.dataset.studyOpen);
    if (!s || typeof go !== 'function') return;
    go('collection', s.module);
    requestAnimationFrame(() => { const el = document.querySelector(`[id="${CSS.escape(s.id)}"], [data-section="${CSS.escape(s.id)}"]`); if (el) el.scrollIntoView({ block: 'start' }); });
  });

  window.LingStudy = { module: MOD, views: VIEWS.map(v => v[0]), data: DATA };
  const want = new URLSearchParams(location.search).get('view');
  if (IS.has(want)) { view = want; render(); } else nav();
})();
