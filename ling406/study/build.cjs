// LING406 study layer: checks authoring/<m>/*.json against the spec and writes data/<m>.js.
//   node ling406/study/build.cjs check <m1|m2|m3>     check one module (errors and warnings)
//   node ling406/study/build.cjs build                 check and build every module that has content
const fs = require('fs'), path = require('path');
const S = __dirname, A = path.join(S, 'authoring'), OUT = path.join(S, 'data');
const PAGES = require('../modern/authoring/pages.json');
const REVISION = 'ling406-study-1';

// Same wording rules as the modern versions' checker (ling406/modern/authoring/build.cjs), applied to prose.
const BANNED = /\b(?:coworkers?|co-workers?|et al|need not|lawful|this shows|that shows|shows that|shows how|illustrates?|illustrating|demonstrates?|demonstrating|the key point|key takeaway|takeaway|as you can see|let.s|let us|remember that|note that|notice that|the slides?|this slide|slides|the lecture|this lecture|lectures?|the professor|the instructor|in class|this course|the figure|this figure|the graph|this graph|the next topic|in other words|basically|simply put|e\.g|i\.e|etc|vs|thus|hence|whereby|downstream|fares worse|blame|squeez\w*|does not prove|does not establish)\b/i;
const PICTURE = /\b(?:the|a|this|that|their|its|his|her|bigger|whole|full|overall|clear|clearer) (?:\w+ )?picture\b(?! (?:of|naming|books?|cards?|stimul\w+|task|description))|\bpictured\b/i;
const PUNCT = /[:;=—–→←⇒↔×]|\s-\s|--|->|<-/;
const LABEL = /^\s*(?:\*\*)?[A-Z][\w ]{1,30}(?:\*\*)?:\s/;
const words = s => s.replace(/\*\*/g, '').trim().split(/\s+/).filter(Boolean);
const sentences = s => s.replace(/\*\*/g, '').replace(/\b(Dr|Mr|Ms|Mrs|St)\./g, '$1').split(/(?<=[.?!]["”’)]?)\s+(?=["“‘(\/\[]?[A-Z0-9])/).map(x => x.trim()).filter(Boolean);

function moduleIndex(m) {
  const ids = new Set(), taught = new Set(), lectureTaught = new Set();
  for (const [col, spec] of Object.entries(PAGES[m])) for (const p of spec.pages) {
    ids.add(p.id);
    if (!p.empty) { taught.add(p.id); if (col !== 'review') lectureTaught.add(p.id); }
  }
  if (m === 'm2') for (const r of PAGES.m2review) { ids.add(r.id); if (!r.empty) taught.add(r.id); }
  return { ids, taught, lectureTaught };
}

function moduleQuestionIds(m) {
  const vm = require('vm'), w = {};
  const file = { m1: 'module1/data.js', m2: 'data.js', m3: 'module3/data.js' }[m];
  vm.runInNewContext(fs.readFileSync(path.join(S, '..', file), 'utf8'), { window: w });
  const D = w.LING406_MODULE1 || w.LING406_MODULE3 || w.LING406;
  return new Set(D.questions.map(q => q.id));
}

function prose(where, text, errs, warn, opts = {}) {
  if (typeof text !== 'string' || !text.trim()) { errs.push(`${where}: empty text`); return; }
  if ((text.match(/\*\*/g) || []).length % 2) errs.push(`${where}: unbalanced **`);
  const plain = text.replace(/\*\*/g, '');
  let m;
  if ((m = BANNED.exec(plain))) errs.push(`${where}: banned wording "${m[0]}" in "${plain.slice(Math.max(0, m.index - 30), m.index + 40)}"`);
  if ((m = PICTURE.exec(plain))) errs.push(`${where}: "picture" as a noun in "${plain.slice(Math.max(0, m.index - 20), m.index + 40)}"`);
  const punctText = opts.allowColonInQuestion ? plain.replace(/:(?=\s*$)/, '') : plain;
  if ((m = PUNCT.exec(punctText))) errs.push(`${where}: banned punctuation "${m[0]}" in "${plain.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
  if (LABEL.test(text)) errs.push(`${where}: "Label: sentence" opening`);
  for (const s of sentences(plain)) {
    const n = words(s).length;
    if (n > 32) errs.push(`${where}: sentence over 32 words (${n}) "${s.slice(0, 60)}…"`);
    else if (n > 25) warn.push(`${where}: long sentence (${n} words) "${s.slice(0, 50)}…"`);
  }
}

function refsOk(where, refs, idx, errs, need = true) {
  if (!Array.isArray(refs) || (need && !refs.length)) { errs.push(`${where}: refs missing`); return []; }
  for (const r of refs) if (!idx.ids.has(r)) errs.push(`${where}: unknown ref ${r}`);
  return refs;
}

function read(m, file, errs, required = true) {
  const f = path.join(A, m, file);
  if (!fs.existsSync(f)) { if (required) errs.push(`missing ${m}/${file}`); return null; }
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { errs.push(`${m}/${file}: bad JSON (${e.message})`); return null; }
}

function check(m) {
  const errs = [], warn = [], idx = moduleIndex(m);
  const meta = read(m, 'meta.json', errs), topics = read(m, 'topics.json', errs), review = read(m, 'review.json', errs);
  const experiments = read(m, 'experiments.json', errs), contrasts = read(m, 'contrasts.json', errs);
  const hard = read(m, 'hard.json', errs), bytopic = read(m, 'bytopic.json', errs);
  if (meta) { if (!meta.lead) errs.push('meta: lead missing'); (meta.flags || []).forEach((f, i) => prose(`meta.flags[${i}]`, f, errs, warn)); }
  const topicIds = new Set(), shown = new Set();
  if (Array.isArray(topics)) {
    if (topics.length < 6) warn.push(`topics: only ${topics.length} topics`);
    topics.forEach((t, ti) => {
      const w = `topic ${t.id || ti}`;
      if (!t.id || topicIds.has(t.id)) errs.push(`${w}: missing or duplicate id`); topicIds.add(t.id);
      if (!t.title) errs.push(`${w}: title missing`);
      if (!['On the review deck', 'Possible'].includes(t.tier)) errs.push(`${w}: tier must be "On the review deck" or "Possible"`);
      if (!Array.isArray(t.blocks) || !t.blocks.length) errs.push(`${w}: no blocks`);
      (t.blocks || []).forEach((b, bi) => {
        const bw = `${w} block ${bi + 1}`;
        refsOk(bw, b.refs, idx, errs).forEach(r => shown.add(r));
        prose(bw + ' main', b.main, errs, warn);
        if (b.main && !/^\*\*[^*]+[.?!]\*\*/.test(b.main)) errs.push(`${bw}: main must open with one bold whole sentence`);
        (b.sub || []).forEach((s, si) => prose(`${bw} sub ${si + 1}`, s, errs, warn));
        if (b.end) prose(bw + ' end', b.end, errs, warn);
      });
      if (!Array.isArray(t.questions) || t.questions.length < 2) errs.push(`${w}: needs at least 2 questions`);
      (t.questions || []).forEach((q, qi) => {
        const qw = `${w} q${qi + 1}`;
        prose(qw + ' q', q.q, errs, warn, { allowColonInQuestion: true }); prose(qw + ' a', q.a, errs, warn);
        refsOk(qw, q.refs, idx, errs);
        if (!['On the review deck', 'Possible'].includes(q.tier)) errs.push(`${qw}: bad tier`);
      });
    });
    const missing = [...idx.lectureTaught].filter(id => !shown.has(id));
    if (missing.length) warn.push(`topics: ${missing.length} taught lecture slides are not a ref of any block (${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''})`);
  } else if (topics) errs.push('topics.json must be a list');
  if (review) {
    if (!Array.isArray(review.items) || !review.items.length) errs.push('review: no items');
    (review.items || []).forEach((it, i) => {
      const w = `review item ${it.n ?? i + 1}`;
      prose(w + ' q', it.q, errs, warn, { allowColonInQuestion: true }); prose(w + ' a', it.a, errs, warn);
      refsOk(w, it.refs, idx, errs);
      if (!['Review', 'Predicted'].includes(it.kind)) errs.push(`${w}: kind must be Review or Predicted`);
    });
  }
  if (Array.isArray(experiments)) experiments.forEach((e, i) => {
    const w = `experiment ${i + 1} (${e.who || '?'})`;
    if (!e.who || !e.title) errs.push(`${w}: who and title required`);
    for (const k of ['asked', 'did', 'found', 'means']) prose(`${w} ${k}`, e[k], errs, warn);
    refsOk(w, e.refs, idx, errs);
  }); else if (experiments) errs.push('experiments.json must be a list');
  if (Array.isArray(contrasts)) contrasts.forEach((c, i) => {
    const w = `contrast ${i + 1} (${c.title || '?'})`;
    if (!Array.isArray(c.sides) || c.sides.length < 2) errs.push(`${w}: needs 2 or more sides`);
    (c.sides || []).forEach((s, si) => { if (!s.name) errs.push(`${w} side ${si + 1}: name`); (s.points || []).forEach((p, pi) => prose(`${w} side ${si + 1} point ${pi + 1}`, p, errs, warn)); });
    const lens = (c.sides || []).map(s => (s.points || []).length); if (new Set(lens).size > 1) warn.push(`${w}: sides have different numbers of points (${lens.join('/')})`);
    prose(w + ' why', c.why, errs, warn); refsOk(w, c.refs, idx, errs);
  }); else if (contrasts) errs.push('contrasts.json must be a list');
  if (Array.isArray(hard)) hard.forEach((h, i) => {
    const w = `hard ${i + 1} (${h.title || '?'})`;
    prose(w + ' trap', h.trap, errs, warn); prose(w + ' text', h.text, errs, warn); refsOk(w, h.refs, idx, errs);
  }); else if (hard) errs.push('hard.json must be a list');
  if (bytopic && typeof bytopic === 'object') {
    const seen = new Map();
    for (const [tid, list] of Object.entries(bytopic)) {
      if (!topicIds.has(tid)) errs.push(`bytopic: unknown topic ${tid}`);
      for (const r of list || []) { if (!idx.ids.has(r)) errs.push(`bytopic ${tid}: unknown ref ${r}`); if (seen.has(r)) errs.push(`bytopic: ${r} in both ${seen.get(r)} and ${tid}`); seen.set(r, tid); }
    }
    const left = [...idx.lectureTaught].filter(id => !seen.has(id));
    if (left.length) errs.push(`bytopic: ${left.length} taught lecture slides missing (${left.slice(0, 10).join(', ')}${left.length > 10 ? '…' : ''})`);
  }
  const wording = read(m, 'wording.json', errs, false);
  if (wording) {
    const qids = moduleQuestionIds(m);
    for (const id of qids) if (!wording[id]) errs.push(`wording: question ${id} missing`);
    for (const [id, w] of Object.entries(wording)) {
      if (!qids.has(id)) { errs.push(`wording: unknown question ${id}`); continue; }
      for (const k of ['college', 'simple']) {
        const t = w && w[k];
        if (typeof t !== 'string' || !t.trim()) { errs.push(`wording ${id}: ${k} missing`); continue; }
        const plain = t.replace(/:\s*$/, '');
        let mm; if ((mm = PUNCT.exec(plain))) errs.push(`wording ${id} ${k}: banned punctuation "${mm[0]}"`);
        if (/\b(?:the lecture|the slides?|the professor|e\.g|i\.e|vs)\b/i.test(t)) errs.push(`wording ${id} ${k}: banned wording`);
      }
    }
  }
  return { errs, warn, data: { revision: `${REVISION}-${m}`, meta, topics, review, experiments, contrasts, hard, bytopic, wording } };
}

const [cmd, mod] = process.argv.slice(2);
if (cmd === 'check') {
  const r = check(mod);
  r.warn.forEach(w => console.log('warn  ' + w)); r.errs.forEach(e => console.log('ERROR ' + e));
  console.log(r.errs.length ? `FAIL ${mod}: ${r.errs.length} errors, ${r.warn.length} warnings` : `PASS ${mod}: ${r.warn.length} warnings`);
  process.exit(r.errs.length ? 1 : 0);
} else if (cmd === 'build') {
  fs.mkdirSync(OUT, { recursive: true }); let bad = 0; const built = [];
  for (const m of ['m1', 'm2', 'm3']) {
    if (!fs.existsSync(path.join(A, m))) continue;
    const r = check(m);
    if (r.errs.length) { bad++; console.log(`skip ${m}: ${r.errs.length} errors`); continue; }
    fs.writeFileSync(path.join(OUT, `${m}.js`), `(window.LING406_STUDY=window.LING406_STUDY||{})[${JSON.stringify(m)}]=${JSON.stringify(r.data)};\n`);
    built.push(m); console.log(`built ${m}`);
  }
  console.log(bad ? `${bad} modules not built` : `built ${built.join(', ') || 'nothing'}`); process.exit(bad ? 1 : 0);
} else { console.log('usage: node build.cjs check <m1|m2|m3> | build'); process.exit(2); }
