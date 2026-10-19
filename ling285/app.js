'use strict';
(() => {
const KEY = 'ling285-study-studio-v1';
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => {
  const url = String(value || '');
  return /^(?:https?:\/\/|(?:\.\.?\/)?[a-zA-Z0-9_/-])/.test(url) && !/[\u0000-\u001f]/.test(url) ? url : '';
};
const rich = value => esc(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const unique = values => [...new Set(values)];
const WORK = [ ['home','Course overview'], ['guide','What to know by the end'], ['core','Must know · core review'], ['experiments','Demonstrations & connections'], ['combined','Combined notes'], ['test','Current practice test'], ['quizzes','Lecture quizzes'], ['missed','Missed & uncertain'], ['sources','Sources & coverage'] ];
const defaults = () => ({notes:{},read:{},ready:{},drafts:{},ratings:{},revealed:{},open:{},theme:'light',size:18,sideClosed:innerWidth <= 760,session:null});
let state = defaults(), D, collections, sections, questionMap, lectureCollections, allSections;
let storageAvailable = true, reader = null, lastReaderFocus = null, view = 'home', selected = '', saveTimeout, searchQuery = '';
let timer = {duration:25 * 60,remaining:25 * 60,end:null,interval:null,mode:'Study'};
const own = (object,key) => Object.prototype.hasOwnProperty.call(object,key);
function storageError(message) {
  storageAvailable = false;
  $('#saveStatus').textContent = 'Progress is only in this tab';
  $('#storageWarning').hidden = false;
  $('#storageWarning').textContent = message + ' Export your notes and progress before closing this tab.';
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    storageAvailable = true;
    $('#storageWarning').hidden = true;
    $('#saveStatus').textContent = 'Saved in this browser';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => { if(storageAvailable) $('#saveStatus').textContent = 'Personal progress stays in this browser'; }, 1400);
  } catch { storageError('Browser storage is unavailable or full.'); }
}
function validateState(raw, importing = false) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('The progress file has no valid state.');
  const clean = defaults();
  const knownSection = id => sections.has(id);
  const knownQuestion = id => questionMap.has(id);
  for (const [field,validator,known] of [
    ['notes',v => typeof v === 'string' && v.length <= 100000,knownSection],
    ['read',v => typeof v === 'boolean',knownSection],
    ['open',v => typeof v === 'boolean',knownSection],
    ['drafts',v => typeof v === 'string' && v.length <= 100000,knownQuestion],
    ['revealed',v => typeof v === 'boolean',knownQuestion],
    ['ratings',v => ['ready','partial','review','uncertain'].includes(v),knownQuestion],
    ['ready',v => typeof v === 'boolean',id => /^guide-\d+$/.test(id)]
  ]) {
    if (raw[field] != null && (typeof raw[field] !== 'object' || Array.isArray(raw[field]))) throw new Error('Invalid '+field+' in progress file.');
    Object.entries(raw[field] || {}).forEach(([id,value]) => {
      if (!['__proto__','constructor','prototype'].includes(id) && known(id) && validator(value)) clean[field][id] = value;
    });
  }
  if(['light','dark'].includes(raw.theme)) clean.theme = raw.theme;
  if(Number.isFinite(raw.size)) clean.size = Math.max(15,Math.min(28,raw.size));
  if(typeof raw.sideClosed === 'boolean') clean.sideClosed = raw.sideClosed;
  if(raw.session && typeof raw.session === 'object' && Array.isArray(raw.session.ids)) {
    const ids = unique(raw.session.ids.filter(id => typeof id === 'string' && questionMap.has(id)));
    if(ids.length && ids.length <= questionMap.size) clean.session = {
      ids, index: Math.max(0,Math.min(ids.length-1,Math.trunc(Number(raw.session.index) || 0))),
      title: typeof raw.session.title === 'string' ? raw.session.title.slice(0,160) : 'Conceptual practice',
      finished: raw.session.finished === true,
      edition: typeof raw.session.edition === 'string' ? raw.session.edition : '',
      scope: typeof raw.session.scope === 'string' ? raw.session.scope : 'mixed'
    };
  }
  return clean;
}
function loadState() {
  try {
    const stored = localStorage.getItem(KEY);
    if(stored) state = validateState(JSON.parse(stored));
    $('#saveStatus').textContent = 'Personal progress stays in this browser';
  } catch { storageError('Saved progress could not be read. Current edits will be kept in this tab.'); }
}
function applyPreferences() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.style.setProperty('--text-size', state.size+'px');
  document.body.classList.toggle('side-closed', state.sideClosed);
  document.querySelectorAll('[data-theme]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.theme === state.theme)));
  document.querySelectorAll('[data-action="sidebar"]').forEach(b => b.setAttribute('aria-expanded',String(!state.sideClosed)));
}
function readRoute() {
  const params = new URLSearchParams(location.search);
  view = params.get('view') || 'home';
  selected = params.get('lecture') || lectureCollections[0]?.id || D.collections[0]?.id || '';
  if(!collections.has(selected)) selected = lectureCollections[0]?.id || D.collections[0]?.id || '';
  if(![...WORK.map(x => x[0]),'collection','practice'].includes(view)) view = 'home';
}
function go(next, collectionId, push = true) {
  closeReader(false); stopSpeech(); pauseMedia();
  view = next; if(collectionId && collections.has(collectionId)) selected = collectionId;
  searchQuery = '';
  const url = new URL(location.href);url.searchParams.set('view',view);
  if(view === 'collection') url.searchParams.set('lecture',selected); else url.searchParams.delete('lecture');
  if(push) history.pushState(null,'',url); else history.replaceState(null,'',url);
  if(innerWidth <= 760) state.sideClosed = true;
  applyPreferences(); render(); window.scrollTo({top:0,behavior:'instant'});$('#content').focus({preventScroll:true});
}
function collectionTitle(c) {return c.role === 'lecture' ? c.title.replace(/^(?:Lectures?\s+)?\d+(?:[+–-]\d+)?\s*[·:.-]\s*/i,'') : c.title;}
function refLabel(c) {return c.number ? 'Lecture '+c.number : c.title;}
function nav() {
  const queue = queueQuestions().length;
  $('#workNav').innerHTML = WORK.map(([id,title]) => `<button data-go="${id}" class="${view === id?'active':''}" ${view === id?'aria-current="page"':''}>${esc(title)}${id === 'missed'?' · '+queue:''}</button>`).join('');
  $('#collectionNav').innerHTML = D.collections.map(c => `<button data-collection="${esc(c.id)}" class="${view === 'collection' && selected === c.id?'active':''}" ${view === 'collection' && selected === c.id?'aria-current="page"':''}><span class="nav-number">${esc(c.number ?? (c.role === 'lecture'?'':'↳'))}</span><span>${esc(collectionTitle(c))}</span></button>`).join('');
}
function pageLink(section) {
  const c = collections.get(section.collection);
  return safeURL(c.pdfFile || c.sourceFile) + (c.pdfFile?'#page='+section.page:'');
}
function badge(s) {return s.core ? '<span class="core-badge">Must know · core review</span>' : '';}
function collectionLabel(c) {return c.role === 'lecture' ? 'Lecture '+(c.number || c.label || '') : (c.role === 'supplemental-notes'?'Supplemental notes':c.role === 'syllabus'?'Course syllabus':'Review material');}
function issueHTML(issues) {return (issues || []).map(issue => `<p class="issue">${esc(typeof issue === 'string' ? issue : issue.message || issue.description || JSON.stringify(issue))}</p>`).join('');}
function teaching(s) {
  const blocks = Array.isArray(s.teaching) ? s.teaching : [];
  return blocks.length ? `<div class="teaching"><ul>${blocks.map(p => `<li>${rich(typeof p === 'string' ? p : p.text || '')}${p && typeof p === 'object' && p.children?.length ? '<ul>'+p.children.map(x => '<li>'+rich(x)+'</li>').join('')+'</ul>':''}</li>`).join('')}</ul></div>` : '<p class="source-empty">Original source page retained. This page has no additional teaching script.</p>';
}
function mediaHTML(s) {
  const assets = (s.assets || []).filter(asset => safeURL(asset.file));
  if (!assets.length) return '';
  const isMoving = asset => asset.type === 'video' || asset.type === 'audio' || asset.animated === true || /\.gif(?:[?#]|$)/i.test(asset.file);
  const item = (asset,index) => {
    const path = safeURL(asset.file);
    const label = esc(asset.label || 'Embedded source '+asset.type+' '+(index+1));
    const bytes = Number(asset.bytes || asset.size || 0);
    const size = bytes > 0 ? ' · '+(bytes/1024/1024 >= 1 ? (bytes/1024/1024).toFixed(1)+' MB' : Math.ceil(bytes/1024)+' KB') : '';
    const media = asset.type === 'video' ? `<video controls preload="metadata" playsinline aria-label="${label}" ${asset.poster?'poster="'+esc(safeURL(asset.poster))+'"':''}><source data-src="${esc(path)}">Your browser cannot play this video. <a href="${esc(path)}">Download the original video</a>.</video>` : asset.type === 'audio' ? `<audio controls preload="metadata" aria-label="${label}"><source data-src="${esc(path)}">Your browser cannot play this audio. <a href="${esc(path)}">Download the original audio</a>.</audio>` : `<a href="${esc(path)}" target="_blank" rel="noopener"><img src="${esc(path)}" alt="${label}" loading="lazy" decoding="async"></a>`;
    return `<div class="media-item">${media}<p>${label}${size} · <a href="${esc(path)}" target="_blank" rel="noopener">Open source asset</a>${asset.type === 'video' || asset.type === 'audio'?' · Original media loads when visible.':''}</p></div>`;
  };
  const moving = assets.filter(isMoving), still = assets.filter(asset => !isMoving(asset));
  return `<div class="source-media">${moving.map(item).join('')}${still.length?`<details class="figure-details"><summary>Original figure details · ${still.length}</summary>${still.map(item).join('')}</details>`:''}</div>`;
}
function visual(s,eager = false) {
  const c = collections.get(s.collection);
  return `<figure class="source-figure">${s.image ? `<button class="slide-button" data-image-section="${esc(s.id)}" aria-label="Enlarge original page ${s.page}, ${esc(s.title)}"><img src="${esc(safeURL(s.image))}" alt="Original ${esc(c.title)}, page ${s.page}: ${esc(s.title)}" loading="${eager?'eager':'lazy'}" decoding="async"></button>` : '<p class="source-empty">Open the source document to inspect this page.</p>'}<figcaption>Original source · page ${s.page}<br><a href="${esc(pageLink(s))}" target="_blank" rel="noopener">${esc(c.originalFilename || c.title)}</a></figcaption>${mediaHTML(s)}</figure>`;
}
function noteBox(s,readerMode=false) {const noteId=(readerMode?'reader-note-':'note-')+s.id;return `<div class="notes-box"><label for="${esc(noteId)}">My notes · shared across study views</label><textarea id="${esc(noteId)}" rows="1" data-note="${esc(s.id)}" placeholder="Explain it in your own words, or leave a question…">${esc(state.notes[s.id] || '')}</textarea></div>`;}
function sourceText(s) {return `<details class="source-excerpt"><summary>Source text & speaker notes</summary><h4>Extracted source text</h4><pre>${esc(s.sourceText || 'No machine-readable text was extracted from this page. Refer to the original visual and source assets.')}</pre>${s.speakerNotes ? '<h4>Original speaker notes</h4><pre>'+esc(Array.isArray(s.speakerNotes)?s.speakerNotes.join('\n'):s.speakerNotes)+'</pre>':''}</details>`;}
function sectionBody(s,readerMode=false,recall=false) {
  return `<div class="section-body"><div class="section-pair"><div><div class="teaching-heading">${readerMode?`<span class="reader-label">${esc(collections.get(s.collection).title)} · page ${s.page}</span><h2>${esc(s.title)} ${badge(s)}</h2>`:''}</div>${recall?'<div class="recall-cover">Explain the idea from the original visual. What changes, why does it change, and what does that cause?<p><button data-action="recall">Reveal teaching notes</button></p></div>':teaching(s)}${issueHTML(s.issues)}${s.core && s.coreReason?'<p class="small muted" style="margin-top:20px"><strong>Core priority</strong> · '+esc(s.coreReason)+'</p>':''}<div class="section-tools row"><label><input type="checkbox" data-read="${esc(s.id)}" ${state.read[s.id]?'checked':''}> Mark read</label><button class="small-button" data-open-section="${esc(s.id)}">Expand visual + teaching</button></div>${noteBox(s,readerMode)}${sourceText(s)}</div>${visual(s,readerMode)}</div></div>`;
}
function sectionHTML(s,index=0) {return `<details class="source-section ${s.core?'core-section':''}" data-section="${esc(s.id)}" ${own(state.open,s.id) ? state.open[s.id]?'open':'' : index === 0?'open':''}><summary><span class="page-index">${String(s.page).padStart(2,'0')}</span><span class="section-title">${esc(s.title)}</span>${badge(s)}</summary>${sectionBody(s)}</details>`;}
function searchTools(label='Search teaching notes') {return `<label class="search-wrap"><span>${esc(label)}</span><input type="search" id="noteSearch" class="search" value="${esc(searchQuery)}" placeholder="Find a concept, source example, or explanation…"></label><p class="small muted" id="searchCount" aria-live="polite"></p>`;}
function studyToolbar(kind) {return `<div class="toolbar"><button class="primary" data-reader="${kind}" data-expanded="false">Visual + teaching</button><button data-reader="${kind}" data-expanded="true">Expand visual + teaching</button><button data-action="smaller" aria-label="Decrease teaching text size">A−</button><button data-action="larger" aria-label="Increase teaching text size">A+</button><button data-action="expandSections">Expand sections</button><button data-action="collapseSections">Collapse sections</button><button class="push" data-action="print">Print notes</button></div>`;}
function home() {
  const lectureSections = lectureCollections.flatMap(c => c.sections);
  const readCount = lectureSections.filter(s => state.read[s.id]).length;
  const coreCount = allSections.filter(s => s.core).length;
  return `<span class="eyebrow">LING285 · ${esc(D.course.professor || 'Khalil Iskarous')}</span><div class="hero"><div><h1>Human Language<br>and Technology.</h1><p class="lead">Understand how speech, physical systems, and learning connect. Keep each original source beside its teaching notes, then explain the ideas in your own words.</p><div class="row"><button class="primary" data-collection="${esc(selected)}">Open the lecture workspace</button><button data-go="guide">What to know</button></div></div><div class="hero-quote" aria-hidden="true"><span class="big-word">What moves?</span><span class="big-word">What changes?</span><span class="big-word">What follows?</span><p>Intuition and cause and effect.<br>One concept at a time.</p></div></div><div class="stat-strip"><div class="stat"><strong>${lectureCollections.length}</strong><span>lecture collections</span></div><div class="stat"><strong>${lectureSections.length}</strong><span>original lecture pages</span></div><div class="stat"><strong>${coreCount}</strong><span>selective core pages</span></div><div class="stat"><strong>${readCount}</strong><span>pages marked read</span></div></div>${D.course.coverageNotice?'<div class="notice">'+esc(D.course.coverageNotice)+'</div>':''}<div class="grid"><article class="card"><span class="eyebrow">Your understanding</span><h2>Build the explanation.</h2><p>Follow the original slide order, inspect diagrams and embedded demonstrations, and leave notes attached to each source page.</p><div class="progress" aria-label="${readCount} of ${lectureSections.length} lecture pages marked read"><span style="width:${lectureSections.length?Math.round(readCount/lectureSections.length*100):0}%"></span></div><button data-go="combined">Combined teaching notes</button></article><article class="card"><span class="eyebrow">Conceptual practice</span><h2>Say why it happens.</h2><p>Draft short explanations, compare them with a model answer, and decide which ideas deserve another try.</p><div class="row"><button class="primary" data-go="test">Current practice test</button><button data-go="missed">Review queue · ${queueQuestions().length}</button></div></article><article class="card"><span class="eyebrow">Study priorities</span><h2>Keep the core selective.</h2><p>Red labels identify a chosen group of foundational distinctions. The full supporting material stays in its individual collection.</p><button data-go="core">Must know · core review</button></article></div><div class="row spread"><h2>Individual collections</h2><span class="small muted">${esc(D.course.edition || 'Current supplied material')}</span></div><div class="grid">${D.collections.map(collectionCard).join('')}</div><p class="small muted">Notes, read marks, and practice responses save in this browser. <button class="text-button small-button" data-action="export">Export a backup</button></p>`;
}
function collectionCard(c) {
  const read = c.sections.filter(s => state.read[s.id]).length;
  const qCount = D.questions.filter(q => (q.sources || []).some(ref => ref.collection === c.id)).length;
  return `<article class="card collection-card"><span class="collection-number">${esc(c.number || (c.role === 'review'?'R':'↳'))}</span><span class="eyebrow">${esc(collectionLabel(c))}</span><h3>${esc(collectionTitle(c))}</h3><p class="small">${c.sections.length} source pages · ${read} read${qCount?' · '+qCount+' practice prompts':''}</p><div class="row"><button data-collection="${esc(c.id)}">Open collection</button>${qCount?`<button class="small-button" data-start="lecture:${esc(c.id)}">Practice</button>`:''}</div></article>`;
}
function collectionView() {
  const c = collections.get(selected);if(!c) return '<h1>Collection unavailable</h1>';
  const qCount = D.questions.filter(q => (q.sources || []).some(ref => ref.collection === c.id)).length;
  return `<span class="eyebrow">${esc(collectionLabel(c))}</span><h1>${esc(collectionTitle(c))}</h1><p class="small muted">${c.sections.length} source pages · ${esc(c.originalFilename || '')}</p>${issueHTML(c.issues)}<div class="row"><a class="small" href="${esc(safeURL(c.sourceFile || c.pdfFile))}" target="_blank" rel="noopener">Open original source</a>${c.pdfFile && c.sourceFile !== c.pdfFile?`<a class="small" href="${esc(safeURL(c.pdfFile))}" target="_blank" rel="noopener">Open PDF</a>`:''}${qCount?`<button class="small-button" data-start="lecture:${esc(c.id)}">Lecture practice · ${qCount}</button>`:''}</div>${studyToolbar('lecture')}${searchTools()}<div class="section-list">${c.sections.map(sectionHTML).join('')}</div>`;
}
function combined() {return `<span class="eyebrow">All lecture collections</span><h1>Combined teaching notes.</h1><p class="lead">Keep the course sequence, original sources, and your personal notes together.</p>${studyToolbar('combined')}${searchTools('Search all lecture collections')}${lectureCollections.map(c => `<section class="section-group search-group"><h2>${esc(c.number)}${c.number?' · ':''}${esc(collectionTitle(c))}</h2>${c.sections.map(sectionHTML).join('')}</section>`).join('')}`;}
function core() {
  const pool = allSections.filter(s => s.core);
  return `<span class="eyebrow">Selective study priorities</span><div class="core-intro"><h1>Must know<br>· core review.</h1><p class="lead">${pool.length} selected source pages. Understand the mechanism and explain the distinction before moving to supporting detail.</p></div><p class="small muted">These are study priorities based on the supplied material, not predictions of unseen exam questions.</p>${studyToolbar('core')}${searchTools('Search selected core explanations')}${D.collections.filter(c => c.sections.some(s => s.core)).map(c => `<section class="section-group search-group"><h2>${esc(c.number)}${c.number?' · ':''}${esc(collectionTitle(c))}</h2>${c.sections.filter(s => s.core).map(sectionHTML).join('')}</section>`).join('') || '<div class="empty">Core priorities have not been supplied yet.</div>'}`;
}
function refsFor(g) {return (g.refs || []).map(ref => {
  const exact = allSections.find(s => s.collection === ref.collection && Number(s.page) === Number(ref.page));return exact;
}).filter(Boolean);}
function guideCard(g,index) {
  const ids = refsFor(g).map(s => s.id);
  return `<article class="card guide-card"><h2>${esc(g.title)}</h2><p>${rich(g.explanation || '')}</p><div class="row">${ids.length?`<button data-guide-reader="${index}">Open matching sources · ${ids.length}</button>`:''}${refsFor(g).slice(0,6).map(s => `<button class="source-ref" data-open-section="${esc(s.id)}">${esc(refLabel(collections.get(s.collection)))} · p${s.page}</button>`).join('')}</div><label class="readiness"><input type="checkbox" data-ready="guide-${index}" ${state.ready['guide-'+index]?'checked':''}> I can explain this without the notes</label></article>`;
}
function guide() {return `<span class="eyebrow">Explain, connect, apply</span><h1>What to know<br>by the end.</h1><p class="lead">Use these explanations as a checklist. Open the matching source pages when you want the full visual and teaching.</p>${D.guide.map(guideCard).join('') || '<div class="empty">Open the lecture collections to study the current material.</div>'}`;}
function demonstrationEntries() {
  const explicit = D.guide.map((g,index) => ({g,index})).filter(({g}) => ['demonstration','experiment','connection'].includes(g.kind));
  return explicit.length ? explicit : D.guide.map((g,index) => ({g,index})).filter(({g}) => /demonstrat|feedback|oscillat|spring|thermostat|hearing|propagation|learning|experiment|dynamic programming/i.test(g.title));
}
function experiments() {return `<span class="eyebrow">Follow the cause and effect</span><h1>Demonstrations<br>& connections.</h1><p class="lead">Trace what changes in a system, what the change causes, and which source evidence supports the explanation.</p>${demonstrationEntries().map(({g,index}) => guideCard(g,index)).join('') || '<div class="empty"><p>Demonstrations remain available in the original lecture order.</p><button data-go="combined">Open lecture notes</button></div>'}`;}
function queueQuestions() {return D.questions.filter(q => ['partial','review','uncertain'].includes(state.ratings[q.id]));}
function test() {
  const count = Math.min(20,D.questions.length);
  return `<span class="eyebrow">Current practice · ${esc(D.course.edition || 'Supplied material')}</span><h1>Explain the idea.<br>Check the reasoning.</h1><div class="practice-intro"><p class="lead">Practice short conceptual answers in the style of the uploaded review. Explain what changes and why, then compare your response with the model explanation.</p><p class="small muted">Original study practice based on the supplied sources. It is not an actual instructor exam or a prediction of future questions. Responses are self-assessed rather than automatically graded.</p></div><div class="grid"><article class="card"><span class="eyebrow">Cumulative practice</span><h2>${count}-question current test</h2><p>A mixed set from the current question bank. Your draft, revealed answers, and self-ratings stay attached to each question.</p><button class="primary" data-start="mixed">Start current test</button></article><article class="card"><span class="eyebrow">A smaller session</span><h2>Five explanations.</h2><p>Work through a short selection and keep the harder ideas in your review queue.</p><button data-start="quick">Start 5-question practice</button></article><article class="card"><span class="eyebrow">Focused practice</span><h2>Choose one lecture.</h2><p>Return to the concepts and original visuals from a particular collection.</p><button data-go="quizzes">Open lecture practice</button></article></div>${state.session?`<div class="card"><h2>${state.session.finished?'Review your last set':'Continue your current set'}</h2><p>${esc(state.session.title)} · ${state.session.ids.length} questions</p><button data-go="practice">${state.session.finished?'Open self-assessment':'Resume practice'}</button></div>`:''}`;
}
function quizzes() {return `<span class="eyebrow">One collection at a time</span><h1>Lecture practice.</h1><p class="lead">Draft the explanation, check the model answer, and use the original source when a detail is uncertain.</p><div class="grid">${lectureCollections.map(collectionCard).join('')}</div>`;}
function missed() {
  const pool = queueQuestions();
  return `<span class="eyebrow">Your next review</span><h1>Missed & uncertain.</h1><p class="lead">${pool.length} ${pool.length === 1?'explanation needs':'explanations need'} another try. A “Ready” self-rating removes a question from this queue.</p>${pool.length?`<div class="row toolbar"><button class="primary" data-start="missed">Practice the review queue</button></div>${pool.map(q => `<article class="card guide-card"><span class="tag">${esc(state.ratings[q.id] || 'review')} · ${esc(q.topic || 'Conceptual practice')}</span><h3 style="margin-top:15px">${esc(q.prompt)}</h3><div class="row"><button data-single-question="${esc(q.id)}">Try this explanation</button><button class="small-button" data-remove-queue="${esc(q.id)}">Remove from queue</button></div></article>`).join('')}`:'<div class="empty"><p>Questions rated “Partial,” “Review,” or “Uncertain” appear here.</p><button data-go="test">Choose conceptual practice</button></div>'}`;
}
function shuffle(items) {
  const array = [...items];for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}return array;
}
function startPractice(scope,exactId) {
  let pool = [...D.questions],title = 'Current mixed practice test';
  if(scope.startsWith('lecture:')) {const cid=scope.slice(8);pool=pool.filter(q => (q.sources || []).some(ref => ref.collection === cid));title = collections.get(cid)?.title+' · conceptual practice';}
  if(scope === 'missed') {pool=queueQuestions();title='Missed & uncertain · retry';}
  if(exactId) {pool = pool.filter(q => q.id === exactId);title = 'Focused conceptual practice';}
  if(scope === 'mixed' || scope === 'quick') pool=shuffle(pool).slice(0,scope === 'quick'?5:20);
  else if(!exactId) pool=shuffle(pool);
  if(!pool.length){announce('No practice prompts are available for this collection yet.');return;}
  state.session = {ids:unique(pool.map(q => q.id)),index:0,title,finished:false,edition:String(D.course.edition || ''),scope};
  // A new attempt hides feedback while retaining drafts and prior self-ratings.
  state.session.ids.forEach(id => state.revealed[id] = false);
  save();go('practice');
}
function answerHTML(q) {
  const answer = Array.isArray(q.answer) ? q.answer.map(x => '<p>'+rich(x)+'</p>').join('') : '<p>'+rich(q.answer)+'</p>';
  return `<div class="feedback"><span class="eyebrow">Compare with your explanation</span><h3>Model answer</h3>${answer}${q.rubric?.length?`<h3 style="margin-top:20px">Check your reasoning</h3><ul>${q.rubric.map(x=>'<li>'+rich(x)+'</li>').join('')}</ul>`:''}<p class="rating-label">How well did your draft explain it?</p><div class="rating-group" role="group" aria-label="Self-assess your answer">${[['ready','Ready'],['partial','Partial'],['review','Review'],['uncertain','Uncertain']].map(([id,label]) => `<button data-rating="${id}" data-question="${esc(q.id)}" aria-pressed="${state.ratings[q.id] === id}">${label}</button>`).join('')}</div><p class="small muted">Choose a rating yourself. Revealing the model answer does not count as a correct response.</p></div>`;
}
function sourceRefs(q) {return (q.sources || []).map(ref => {
  const s = allSections.find(item => item.collection === ref.collection && Number(item.page) === Number(ref.page));
  return s?`<button class="source-ref" data-open-section="${esc(s.id)}">${esc(refLabel(collections.get(s.collection)))} · page ${s.page} · source + teaching</button>`:'';
}).join('');}
function practice() {
  const session = state.session;
  if(!session?.ids.length) return '<h1>Choose a practice set.</h1><button data-go="test">Practice options</button>';
  if(session.finished) return results();
  const q = questionMap.get(session.ids[session.index]);
  if(!q) {state.session=null;save();return '<h1>This practice set has changed.</h1><button data-go="test">Open current practice</button>';}
  const revealed = state.revealed[q.id];
  return `<span class="eyebrow">${esc(session.title)}</span><div class="row spread"><h1>Question ${session.index+1}<span class="muted" style="font-size:.5em"> / ${session.ids.length}</span></h1><span class="tag">${esc(q.topic || 'Conceptual explanation')}</span></div><article class="card practice-card"><p class="question-prompt">${esc(q.prompt)}</p><label class="draft-label" for="answerDraft">Your explanation · saved in this browser</label><textarea id="answerDraft" class="draft" data-draft="${esc(q.id)}" placeholder="Explain what changes, why it happens, and what follows…">${esc(state.drafts[q.id] || '')}</textarea>${!revealed?`<div class="row"><button class="primary" data-reveal="${esc(q.id)}">Reveal model answer & self-assess</button><button data-rating="uncertain" data-question="${esc(q.id)}" aria-pressed="${state.ratings[q.id] === 'uncertain'}">${state.ratings[q.id] === 'uncertain'?'Queued as uncertain':'Mark uncertain'}</button></div>`:answerHTML(q)}<div class="row" style="margin-top:20px">${sourceRefs(q)}</div><div class="toolbar"><button data-question-index="${session.index-1}" ${session.index === 0?'disabled':''}>← Previous</button><button class="primary" data-question-index="${session.index+1}" ${session.index === session.ids.length-1?'disabled':''}>Next →</button><button class="push" data-action="finishPractice">Finish & review</button></div><p class="attempt-meta">Drafts and self-ratings remain available after this set. You can revise them on another attempt.</p></article><details class="card" style="max-width:950px"><summary>Question navigator</summary><div class="number-nav">${session.ids.map((id,index) => `<button class="${index === session.index?'current':''} ${state.ratings[id] === 'ready'?'done':''} ${['review','partial','uncertain'].includes(state.ratings[id])?'review':''}" data-question-index="${index}" aria-label="Question ${index+1}${state.ratings[id]?', self-rated '+state.ratings[id]:''}">${index+1}</button>`).join('')}</div><p class="small muted">Filled = ready · dashed border = review · solid accent border = current question</p></details>`;
}
function results() {
  const session = state.session;
  const counts = Object.fromEntries(['ready','partial','review','uncertain'].map(value => [value,session.ids.filter(id => state.ratings[id] === value).length]));
  const drafted = session.ids.filter(id => state.drafts[id]?.trim()).length;
  return `<span class="eyebrow">Self-assessment · ${esc(session.title)}</span><h1>Keep the reasoning.<br>Revisit the gaps.</h1><p class="lead">${drafted} of ${session.ids.length} questions have a saved draft. ${counts.ready} self-rated ready · ${counts.partial} partial · ${counts.review} review · ${counts.uncertain} uncertain.</p><p class="small muted">These are your self-ratings, not an automatically calculated exam score.</p><div class="toolbar"><button class="primary" data-go="missed">Open review queue · ${queueQuestions().length}</button><button data-action="resumePractice">Revisit this set</button><button data-go="test">Practice options</button></div>${session.ids.map((id,index) => {const q=questionMap.get(id);return `<details class="result-row"><summary>${index+1}. ${esc(q.prompt)} <span class="tag">${esc(state.ratings[id] || 'Unrated')}</span></summary><p class="small"><strong>Your draft</strong><br>${esc(state.drafts[id] || 'No draft saved.')}</p>${state.revealed[id]?`<p class="small"><strong>Model answer</strong><br>${rich(Array.isArray(q.answer)?q.answer.join('\n'):q.answer)}</p>`:'<p class="small muted">Model answer has not been revealed.</p>'}<div class="row"><button class="small-button" data-revisit-question="${index}">Revisit & self-assess</button>${sourceRefs(q)}</div></details>`;}).join('')}`;
}
function sources() {
  const coverage = D.coverage || {};
  const sourceEntries = Array.isArray(coverage.sources) ? coverage.sources : [];
  const total = allSections.length;
  return `<span class="eyebrow">Check against the source</span><h1>Sources & coverage.</h1><p class="lead">Original documents, source-page mappings, and review notes stay available alongside the teaching.</p>${D.course.coverageNotice?'<div class="notice">'+esc(D.course.coverageNotice)+'</div>':''}<div class="row toolbar"><button class="primary" data-action="export">Export notes & progress</button><button data-action="import">Import progress backup</button></div><p class="small muted">Backups contain your personal notes, read marks, draft answers, and self-ratings. Progress is stored locally in this browser and does not sync between devices.</p><div class="grid"><div class="card"><h2>${D.collections.length} collections</h2><p>${total} mapped source pages across lectures, reviews, and supporting material.</p></div><div class="card"><h2>${D.questions.length} practice prompts</h2><p>Source-linked written explanations with model answers and self-assessment criteria.</p></div><div class="card"><h2>Original visuals</h2><p>Source slide images retain their original colors. Playable embedded media appears with controls on its source page.</p></div></div><h2>Available collections</h2><div class="table-scroll"><table class="source-table"><thead><tr><th>Collection</th><th>Pages</th><th>Sources</th><th>Notes</th></tr></thead><tbody>${D.collections.map(c=>`<tr><td><button class="text-button" data-collection="${esc(c.id)}">${esc(c.number || '')} ${esc(c.title)}</button><div class="file-identity">${esc(c.role || 'lecture')}</div></td><td>${c.sections.length}</td><td>${c.sourceFile?`<a href="${esc(safeURL(c.sourceFile))}" target="_blank" rel="noopener">Original file</a><br>`:''}${c.pdfFile?`<a href="${esc(safeURL(c.pdfFile))}" target="_blank" rel="noopener">Source PDF</a>`:''}<div class="file-identity">${esc(c.originalFilename || '')}</div></td><td>${(c.issues || []).length?issueHTML(c.issues):'See source-page details.'}</td></tr>`).join('')}</tbody></table></div>${sourceEntries.length?`<h2>Additional source inventory</h2><div class="card">${sourceEntries.map(s=>`<p class="small">${s.file?`<a href="${esc(safeURL(s.file))}" target="_blank" rel="noopener">${esc(s.originalFilename || s.original || s.title || s.id || s.file)}</a>`:esc(s.originalFilename || s.original || s.title || s.id || '')}${s.role?' · '+esc(s.role):''}${s.status?' · '+esc(s.status):''}</p>`).join('')}</div>`:''}${coverage.issues?.length?'<h2>Review notes</h2>'+issueHTML(coverage.issues):''}<h2>How to use this workspace</h2><div class="card"><ul class="check-list"><li>Read the source and teaching together. Open the original document for full-size labels, animation context, and any source discrepancy.</li><li>Use the red core labels as a selective study priority. Read the supporting pages when you want the full explanation.</li><li>Write a conceptual answer before revealing its model explanation. Use “Partial,” “Review,” or “Uncertain” to keep it in your retry queue.</li><li>Future lectures can extend these collections without changing the IDs attached to your existing notes and answers.</li></ul></div>`;
}
function render() {
  nav();applyPreferences();
  const routes = {home,collection:collectionView,guide,core,experiments,combined,test,quizzes,missed,sources,practice};
  const resume = state.session && !state.session.finished && view !== 'practice' ? '<p class="small"><button class="text-button" data-go="practice">↳ Resume current conceptual practice</button></p>' : '';
  $('#content').innerHTML = resume + (routes[view] || home)();
  document.title = (view === 'collection'?collections.get(selected)?.title:WORK.find(x=>x[0] === view)?.[1] || 'Conceptual practice')+' · LING285 Study Studio';
  sizeNotes();
}
let mediaObserver;
function initMedia() {
  mediaObserver?.disconnect();
  const activate = media => { const source=media.querySelector('source[data-src]');if(source){source.src=source.dataset.src;delete source.dataset.src;media.load();} };
  if(!('IntersectionObserver' in window)){document.querySelectorAll('video,audio').forEach(activate);return;}
  mediaObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){activate(entry.target);mediaObserver.unobserve(entry.target);}}),{rootMargin:'150px'});
  document.querySelectorAll('video,audio').forEach(media=>mediaObserver.observe(media));
}
function resizeNote(element) {element.style.height=Math.max(52,element.clientHeight,element.scrollHeight+2)+'px';}
function sizeNotes() {initMedia();document.querySelectorAll('[data-note]').forEach(resizeNote);}
function matchingSections(kind) {if(kind === 'lecture') return collections.get(selected).sections;if(kind === 'core')return allSections.filter(s=>s.core);return lectureCollections.flatMap(c=>c.sections);}
function openReader(ids,index=0,expanded=true,label='Visual + teaching') {
  const items=unique(ids).map(id=>sections.get(id)).filter(Boolean);if(!items.length)return;
  pauseMedia();stopSpeech();lastReaderFocus=document.activeElement;
  reader={items,index:Math.max(0,Math.min(items.length-1,index)),expanded,recall:false,label,returnView:view};
  renderReader();
}
function readerControls() {return `<div class="reader-controls"><button data-action="closeReader">✕ Close</button><button data-action="readerPrevious" ${reader.index === 0?'disabled':''}>← Previous</button><select id="readerSelect" aria-label="Select source page">${reader.items.map((s,index)=>`<option value="${index}" ${index === reader.index?'selected':''}>${esc(collections.get(s.collection).number || '')} · p${s.page} · ${esc(s.title)}</option>`).join('')}</select><button data-action="readerNext" ${reader.index === reader.items.length-1?'disabled':''}>Next →</button>${reader.expanded?'': '<button data-action="expandReader">Expand</button>'}<button data-action="recall">${reader.recall?'Show teaching':'Try recall'}</button><button data-action="readAloud">Read aloud</button><button data-action="stopSpeech">Stop</button><button data-action="smaller" aria-label="Decrease teaching text size">A−</button><button data-action="larger" aria-label="Increase teaching text size">A+</button><span class="reader-position">${reader.index+1} / ${reader.items.length}</span></div>`;}
function renderReader() {
  if(!reader)return;
  const s=reader.items[reader.index];
  const html=`<div class="reader-shell">${readerControls()}<div class="reader-stage">${sectionBody(s,true,reader.recall)}</div></div>`;
  if(reader.expanded) {
    $('#readerDialog').innerHTML=html;
    if(!$('#readerDialog').open)$('#readerDialog').showModal();
    document.body.classList.add('reader-open');
  } else {
    if($('#readerDialog').open)$('#readerDialog').close();
    document.body.classList.remove('reader-open');
    $('#content').innerHTML=`<span class="eyebrow">${esc(reader.label)}</span><div class="inline-reader">${html}</div>`;
  }
  sizeNotes();$('#readerSelect')?.focus({preventScroll:true});
}
function closeReader(restore=true) {
  if(!reader)return;pauseMedia();stopSpeech();const expanded=reader.expanded;reader=null;
  if($('#readerDialog').open)$('#readerDialog').close();$('#readerDialog').innerHTML='';document.body.classList.remove('reader-open');
  if(restore){render();if(lastReaderFocus?.isConnected)lastReaderFocus.focus({preventScroll:true});else $('#content').focus({preventScroll:true});}
}
function moveReader(index) {if(!reader || index<0 || index>=reader.items.length)return;pauseMedia();stopSpeech();reader.index=index;reader.recall=false;renderReader();}
function pauseMedia() {document.querySelectorAll('video,audio').forEach(media => media.pause());}
function stopSpeech() {if('speechSynthesis' in window)speechSynthesis.cancel();}
function readAloud() {if(!reader || !('speechSynthesis' in window)){announce('Read aloud is unavailable in this browser.');return;}stopSpeech();const s=reader.items[reader.index];const text=[s.title,...(s.teaching || []).map(x=>typeof x === 'string'?x:x.text || '')].join('. ').replace(/\*\*/g,'');const speech=new SpeechSynthesisUtterance(text);speech.rate=.94;speechSynthesis.speak(speech);}
function announce(message) {$('#saveStatus').textContent=message;}
function exportProgress() {
  const backup={course:'LING285',version:1,exportedAt:new Date().toISOString(),state};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='LING285-progress-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Progress backup downloaded.');
}
async function importProgress(file) {
  if(!file)return;
  try {
    if(file.size > 5*1024*1024) throw new Error('This file exceeds the 5 MB progress-backup limit.');
    const backup=JSON.parse(await file.text());
    if(backup.course !== 'LING285' || backup.version !== 1)throw new Error('Choose a LING285 progress backup exported by this studio.');
    const imported=validateState(backup.state,true);
    // Merge known personal entries. Imported preferences and the practice session replace local equivalents.
    for(const field of ['notes','read','ready','drafts','ratings','revealed','open'])imported[field]={...state[field],...imported[field]};
    closeReader(false);state=imported;save();render();announce('LING285 progress imported and merged with this browser.');
  } catch(error) {$('#storageWarning').hidden=false;$('#storageWarning').textContent='Import failed. '+error.message+' Existing progress was preserved.';}
  $('#importFile').value='';
}
function applySearch(value) {
  searchQuery=value;const query=value.trim().toLocaleLowerCase();let hits=0;
  document.querySelectorAll('.source-section').forEach(element=>{
    const s=sections.get(element.dataset.section);const searchable=[s.title,s.sourceText,...(s.teaching || []).map(x=>typeof x === 'string'?x:x.text || ''),state.notes[s.id] || ''].join(' ').toLocaleLowerCase();
    const match=!query || searchable.includes(query);element.hidden=!match;if(match)hits++;
  });
  document.querySelectorAll('.search-group').forEach(group=>group.hidden=![...group.querySelectorAll('.source-section')].some(element=>!element.hidden));
  if($('#searchCount'))$('#searchCount').textContent=query?hits+' matching source pages':'';
}
function tick() {
  if(timer.end)timer.remaining=Math.max(0,Math.ceil((timer.end-Date.now())/1000));
  $('#clock').textContent=String(Math.floor(timer.remaining/60)).padStart(2,'0')+':'+String(timer.remaining%60).padStart(2,'0');
  if(timer.remaining===0 && timer.end){clearInterval(timer.interval);timer.interval=null;timer.end=null;$('#timerStart').textContent='Start';announce(timer.mode+' timer complete.');}
}
function resetTimer(duration=Number($('#duration').value)*60,mode='Study'){clearInterval(timer.interval);timer={duration,remaining:duration,end:null,interval:null,mode};$('#timerMode').textContent=mode;$('#timerStart').textContent='Start';tick();}
function handleAction(action) {
  if(action==='sidebar'){state.sideClosed=!state.sideClosed;applyPreferences();save();return;}
  if(action==='export'){exportProgress();return;}
  if(action==='import'){$('#importFile').click();return;}
  if(action==='print'){document.querySelectorAll('.source-section').forEach(s=>s.open=true);window.print();return;}
  if(action==='smaller' || action==='larger'){state.size=Math.max(15,Math.min(28,state.size+(action==='larger'?1:-1)));applyPreferences();save();return;}
  if(action==='expandSections' || action==='collapseSections'){document.querySelectorAll('.source-section:not([hidden])').forEach(s=>s.open=action==='expandSections');return;}
  if(action==='closeImage'){$('#imageDialog').close();return;}
  if(action==='closeReader'){closeReader();return;}
  if(action==='readerPrevious'){moveReader(reader.index-1);return;}
  if(action==='readerNext'){moveReader(reader.index+1);return;}
  if(action==='expandReader'){reader.expanded=true;renderReader();return;}
  if(action==='recall'){if(reader){reader.recall=!reader.recall;renderReader();}return;}
  if(action==='readAloud'){readAloud();return;}
  if(action==='stopSpeech'){stopSpeech();return;}
  if(action==='finishPractice'){state.session.finished=true;save();render();window.scrollTo(0,0);return;}
  if(action==='resumePractice'){state.session.finished=false;save();render();return;}
}
document.addEventListener('click',event=>{
  if(innerWidth<=760 && !state.sideClosed && !event.target.closest('#sidebar') && event.target.closest('#main') && !event.target.closest('[data-action="sidebar"]')){state.sideClosed=true;applyPreferences();}
  const button=event.target.closest('button');if(!button || button.disabled || !D)return;
  if(button.dataset.go){go(button.dataset.go);return;}
  if(button.dataset.collection){go('collection',button.dataset.collection);return;}
  if(button.dataset.theme){state.theme=button.dataset.theme;applyPreferences();save();return;}
  if(button.dataset.action){handleAction(button.dataset.action);return;}
  if(button.dataset.reader){openReader(matchingSections(button.dataset.reader).map(s=>s.id),0,button.dataset.expanded === 'true',button.dataset.reader === 'lecture'?collections.get(selected).title:'Visual + teaching');return;}
  if(button.dataset.openSection){openReader([button.dataset.openSection]);return;}
  if(button.dataset.guideReader){const g=D.guide[Number(button.dataset.guideReader)];openReader(refsFor(g).map(s=>s.id),0,true,g.title);return;}
  if(button.dataset.imageSection){const s=sections.get(button.dataset.imageSection);$('#enlargedImage').src=safeURL(s.image);$('#enlargedImage').alt='Original page '+s.page+' · '+s.title;$('#imageSource').href=pageLink(s);$('#imageDialog').showModal();return;}
  if(button.dataset.start){startPractice(button.dataset.start);return;}
  if(button.dataset.singleQuestion){startPractice('single',button.dataset.singleQuestion);return;}
  if(button.dataset.removeQueue){delete state.ratings[button.dataset.removeQueue];save();render();return;}
  if(button.dataset.reveal){state.revealed[button.dataset.reveal]=true;save();const scroll=window.scrollY;render();window.scrollTo(0,scroll);document.querySelector('.feedback')?.scrollIntoView({block:'nearest',behavior:'smooth'});return;}
  if(button.dataset.rating){state.ratings[button.dataset.question]=button.dataset.rating;save();const scroll=window.scrollY;render();window.scrollTo(0,scroll);return;}
  if(button.hasAttribute('data-question-index')){const index=Number(button.dataset.questionIndex);if(state.session && index>=0 && index<state.session.ids.length){state.session.index=index;save();render();window.scrollTo(0,0);}return;}
  if(button.hasAttribute('data-revisit-question')){state.session.index=Number(button.dataset.revisitQuestion);state.session.finished=false;save();render();window.scrollTo(0,0);}
});
document.addEventListener('input',event=>{
  const element=event.target;
  if(element.dataset.note){state.notes[element.dataset.note]=element.value;resizeNote(element);save();}
  if(element.dataset.draft){state.drafts[element.dataset.draft]=element.value;save();}
  if(element.id==='noteSearch')applySearch(element.value);
});
document.addEventListener('change',event=>{
  const element=event.target;
  if(element.dataset.read){state.read[element.dataset.read]=element.checked;document.querySelectorAll('[data-read]').forEach(box=>{if(box.dataset.read===element.dataset.read)box.checked=element.checked;});save();}
  if(element.dataset.ready){state.ready[element.dataset.ready]=element.checked;save();}
  if(element.id==='readerSelect')moveReader(Number(element.value));
  if(element.id==='importFile')importProgress(element.files[0]);
  if(element.id==='duration')resetTimer();
});
document.addEventListener('toggle',event=>{if(D && event.target.matches('.source-section')){state.open[event.target.dataset.section]=event.target.open;save();}},true);
document.addEventListener('keydown',event=>{
  if(!reader || $('#imageDialog').open || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName))return;
  if(event.key==='ArrowLeft'){event.preventDefault();moveReader(reader.index-1);}
  if(event.key==='ArrowRight'){event.preventDefault();moveReader(reader.index+1);}
  if(event.key==='Escape' && !reader.expanded){event.preventDefault();closeReader();}
});
$('#readerDialog').addEventListener('cancel',event=>{event.preventDefault();closeReader();});
$('#imageDialog').addEventListener('close',()=>$('#enlargedImage').removeAttribute('src'));
window.addEventListener('popstate',()=>{closeReader(false);readRoute();render();});
window.addEventListener('pagehide',()=>{stopSpeech();pauseMedia();});
$('#timerStart').addEventListener('click',()=>{if(timer.end){tick();timer.end=null;clearInterval(timer.interval);timer.interval=null;$('#timerStart').textContent='Start';}else{if(!timer.remaining)timer.remaining=timer.duration;timer.end=Date.now()+timer.remaining*1000;timer.interval=setInterval(tick,500);$('#timerStart').textContent='Pause';tick();}});
$('#timerReset').addEventListener('click',()=>resetTimer());
$('#timerBreak').addEventListener('click',()=>resetTimer(5*60,'Break'));
async function init() {
  try {
    const response=await fetch('data.json',{cache:'no-cache'});if(!response.ok)throw new Error('Course data returned '+response.status+'.');D=await response.json();
    if(!D.course || !Array.isArray(D.collections) || !Array.isArray(D.questions))throw new Error('The course data is incomplete.');
    D.guide=Array.isArray(D.guide)?D.guide:[];collections=new Map();sections=new Map();questionMap=new Map();
    D.collections.forEach(c=>{if(!c.id || collections.has(c.id) || !Array.isArray(c.sections))throw new Error('A collection has an invalid or duplicate ID.');collections.set(c.id,c);c.sections.forEach(s=>{if(!s.id || sections.has(s.id))throw new Error('A source page has an invalid or duplicate ID.');s.collection=c.id;sections.set(s.id,s);});});
    D.questions.forEach(q=>{if(!q.id || questionMap.has(q.id))throw new Error('A practice question has an invalid or duplicate ID.');questionMap.set(q.id,q);});
    allSections=[...sections.values()];lectureCollections=D.collections.filter(c=>c.role === 'lecture');
    loadState();readRoute();applyPreferences();render();tick();
  } catch(error) {
    $('#saveStatus').textContent='Course could not be opened';
    $('#content').innerHTML='<span class="eyebrow">LING285 Study Studio</span><h1>The course could not load.</h1><p>'+esc(error.message)+'</p><p>Reload this page when the course data is available. A static web server is required when opening a local copy.</p><a href="./">Reload studio</a>';
    console.error(error);
  }
}
init();
})();
