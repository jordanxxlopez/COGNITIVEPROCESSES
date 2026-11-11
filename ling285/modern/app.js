'use strict';
(() => {
const KEY = 'ling285-modern-studio-v1';
const FOLLOWING_SLIDE_VERSIONS={v23:'v22',v24:'v24'};
const MODULE2_COLLECTIONS=new Set(['lecture11','lecture12','lecture13','lecture14','lecture15','lecture16','lecture17','lecture18']);
const VERSIONED_COLLECTIONS=new Set(['lecture01','lecture02','lecture03','lecture04','lecture05-06','lecture07','lecture08','lecture09','lecture10','lecture11','lecture12','lecture13','lecture14','lecture15','lecture16','lecture17','lecture18']);
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => {
  const url = String(value || '');
  return /^(?:https?:\/\/|(?:\.\.?\/)?[a-zA-Z0-9_/-])/.test(url) && !/[\u0000-\u001f]/.test(url) ? url : '';
};
const rich = value => esc(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const unique = values => [...new Set(values)];
const WORK = [ ['guide','What to know by the end'], ['review','Exam 2 review guide'], ['core','Must know · core review'], ['experiments','Demonstrations & connections'], ['stimuli','Sounds & videos'], ['combined','Combined notes'], ['codeblocks','Code blocks'], ['figures','Figures'], ['test','Current practice test'], ['writing','Writing exam · Exam 2 style'], ['quizzes','Lecture quizzes'], ['missed','Missed & uncertain'], ['sources','Sources & coverage'] ];
const defaults = () => ({notes:{},read:{},ready:{},drafts:{},ratings:{},revealed:{},open:{},theme:'light',size:18,sideClosed:innerWidth <= 760,session:null,sessions:{},practiceSessions:{},activeModule:'module2',practiceMode:'mixed',assessmentVersion:'v2',mcqSelections:{},mcqSubmitted:{},optionOrders:{},flags:{},transcriptVersion:'v18'});
let state = defaults(), D, collections, sections, questionMap, lectureCollections, allSections, moduleMap, practiceData=null,practiceLoadError='';
let practiceV3=null,practiceV3Error='',examReview=null,examReviewError='';const practiceV3Ids=new Set(),EXAM2_VIEWS=new Set(['review','writing','codeblocks','figures']);let codeFigures=null,codeFiguresError='';
const TRANSCRIPT_VERSIONS=['v1','v2','v3','v4','v7','v10','v12','v14','v16','v18','v20','v21','v22','v23','vB','v24'];
const transcriptEditions=new Map(),transcriptErrors=new Map(),visualPresentations=new Map(),practiceQuestionIds=new Set();
let storageAvailable = true, reader = null, lastReaderFocus = null, view = 'home', selected = '', saveTimeout, searchQuery = '';
const readerPositions=new Map();
try{for(const [key,value] of Object.entries(JSON.parse(sessionStorage.getItem('ling285-reader-page-positions') || '{}')))readerPositions.set(key,Number(value));}catch{}
let timer = {duration:30 * 60,remaining:30 * 60,end:null,interval:null,mode:'Study'};
const own = (object,key) => Object.prototype.hasOwnProperty.call(object,key);
function storageError(message) {
  storageAvailable = false;
  $('#saveStatus').textContent = 'Progress is only in this tab';
  $('#storageWarning').hidden = false;
  $('#storageWarning').textContent = message + ' Export your notes and progress before closing this tab.';
}
function rememberSession() {
  if(!state.session?.moduleId)return;
  const version=state.session.assessmentVersion || questionAssessmentVersion(questionMap.get(state.session.ids[0]));
  state.session.assessmentVersion=version;
  state.practiceSessions[sessionKey(state.session.moduleId,version)]=state.session;
  if(version==='v1')state.sessions[state.session.moduleId]=state.session;
}
function save() {
  rememberSession();
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    storageAvailable = true; $('#storageWarning').hidden = true;
    $('#saveStatus').textContent = 'Saved in this browser';clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {if(storageAvailable)$('#saveStatus').textContent='Personal progress stays in this browser';},1400);
  } catch {storageError('Browser storage is unavailable or full.');}
}

function questionModule(q) {
  if(moduleMap.has(q?.moduleId))return q.moduleId;
  const refs=(q?.sources || []).map(ref=>moduleForCollection(ref.collection));
  return refs.includes('module2')?'module2':'module1';
}
function moduleForCollection(id) {
  const c=collections.get(id);if(moduleMap.has(c?.moduleId))return c.moduleId;
  return D.modules.find(m=>[...(m.lectureIds || []),...(m.supplementIds || []),...(m.meadowsIds || [])].includes(id))?.id || null;
}
function currentModule() {return moduleMap.get(state.activeModule) || D.modules.at(-1);}
function moduleLectures(id=state.activeModule) {return (moduleMap.get(id)?.lectureIds || []).map(cid=>collections.get(cid)).filter(Boolean);}
function moduleReadings(id=state.activeModule) {return (moduleMap.get(id)?.meadowsIds || []).map(cid=>collections.get(cid)).filter(Boolean);}
function moduleCoreCollections() {return [...moduleLectures(),...moduleReadings()];}
function effectiveAssessmentVersion(moduleId=state.activeModule,preference=state.assessmentVersion) {if(moduleId!=='module2')return 'v1';if(preference==='v3' && practiceV3)return 'v3';return preference==='v2' && practiceData?'v2':'v1';}
function questionAssessmentVersion(q) {return practiceV3Ids.has(q?.id)?'v3':practiceQuestionIds.has(q?.id)?'v2':'v1';}
function pendingPracticeId(id) {return !!practiceLoadError && typeof id==='string' && /^v2-[a-z0-9-]{1,120}$/.test(id);}
function sessionKey(moduleId,version=effectiveAssessmentVersion(moduleId)) {return moduleId+':'+version;}
function moduleQuestions(id=state.activeModule) {const version=effectiveAssessmentVersion(id);return (version==='v3'?practiceV3.questions:version==='v2'?practiceData.questions:D.questions).filter(q=>questionModule(q)===id);}
function moduleGuides() {return D.guide.map((g,index)=>({g,index})).filter(({g})=>(g.moduleIds || unique((g.refs || []).map(ref=>moduleForCollection(ref.collection)).filter(Boolean))).includes(state.activeModule));}
function isMCQ(q) {return q?.type==='mcq';}
function validOrder(q,order) {return isMCQ(q) && Array.isArray(order) && order.length===q.options.length && new Set(order).size===order.length && order.every(id=>q.options.some(option=>option.id===id));}
function sanitizeSession(raw,moduleId,assessmentVersion='v1') {
  if(!raw || typeof raw!=='object' || !Array.isArray(raw.ids))return null;
  const ids=unique(raw.ids.filter(id=>questionMap.has(id)?questionModule(questionMap.get(id))===moduleId && questionAssessmentVersion(questionMap.get(id))===assessmentVersion:moduleId==='module2' && assessmentVersion==='v2' && pendingPracticeId(id)));if(!ids.length)return null;
  const previousId=raw.ids[Math.max(0,Math.trunc(Number(raw.index)||0))];
  return {ids,index:Math.max(0,ids.indexOf(previousId)),moduleId,assessmentVersion,
    title:typeof raw.title==='string'?raw.title.slice(0,160):'Conceptual practice',finished:raw.finished===true,
    edition:typeof raw.edition==='string'?raw.edition:'',scope:typeof raw.scope==='string'?raw.scope:'mixed',
    mode:['mixed','mcq','written'].includes(raw.mode)?raw.mode:'written'};
}
function validateState(raw) {
  if(!raw || typeof raw!=='object' || Array.isArray(raw))throw new Error('The progress file has no valid state.');
  const clean=defaults(),knownSection=id=>sections.has(id),knownQuestion=id=>questionMap.has(id) || pendingPracticeId(id),knownMCQ=id=>isMCQ(questionMap.get(id)) || pendingPracticeId(id);
  for(const [field,validator,known] of [
    ['notes',v=>typeof v==='string' && v.length<=100000,knownSection],
    ['read',v=>typeof v==='boolean',knownSection],['open',v=>typeof v==='boolean',knownSection],
    ['drafts',v=>typeof v==='string' && v.length<=100000,knownQuestion],
    ['revealed',v=>typeof v==='boolean',knownQuestion],['flags',v=>typeof v==='boolean',knownQuestion],
    ['ratings',v=>['ready','partial','review','uncertain'].includes(v),knownQuestion],
    ['ready',v=>typeof v==='boolean',id=>/^guide-\d+$/.test(id)],
    ['mcqSubmitted',v=>typeof v==='boolean',knownMCQ],
    ['mcqSelections',v=>typeof v==='string' && v.length<=100,knownMCQ],
    ['optionOrders',v=>Array.isArray(v) && v.length===4 && new Set(v).size===4 && v.every(item=>typeof item==='string' && item.length<=100),knownMCQ]
  ]) {
    if(raw[field]!=null && (typeof raw[field]!=='object' || Array.isArray(raw[field])))throw new Error('Invalid '+field+' in progress file.');
    Object.entries(raw[field] || {}).forEach(([id,value])=>{if(!['__proto__','constructor','prototype'].includes(id) && known(id) && validator(value))clean[field][id]=value;});
  }
  for(const [id,value] of Object.entries(clean.mcqSelections))if(questionMap.has(id) && !questionMap.get(id).options.some(option=>option.id===value))delete clean.mcqSelections[id];
  for(const [id,order] of Object.entries(clean.optionOrders))if(questionMap.has(id) && !validOrder(questionMap.get(id),order))delete clean.optionOrders[id];
  for(const id of Object.keys(clean.mcqSubmitted))if(!clean.mcqSelections[id])clean.mcqSubmitted[id]=false;
  if(['light','dark'].includes(raw.theme))clean.theme=raw.theme;
  if(Number.isFinite(raw.size))clean.size=Math.max(15,Math.min(28,raw.size));
  if(typeof raw.sideClosed==='boolean')clean.sideClosed=raw.sideClosed;
  if(moduleMap.has(raw.activeModule))clean.activeModule=raw.activeModule;
  if(['mixed','mcq','written'].includes(raw.practiceMode))clean.practiceMode=raw.practiceMode;
  if(TRANSCRIPT_VERSIONS.includes(raw.transcriptVersion))clean.transcriptVersion=raw.transcriptVersion;
  if(['v1','v2','v3'].includes(raw.assessmentVersion))clean.assessmentVersion=raw.assessmentVersion;
  // Partition older module sessions by their original question IDs. Neither a
  // transcript choice nor a new practice edition can rebind a previous answer.
  for(const module of D.modules)for(const version of module.id==='module2'?['v1','v2','v3']:['v1']){
    const key=sessionKey(module.id,version);
    for(const rawSession of [raw.sessions?.[module.id],raw.practiceSessions?.[key],raw.session]){
      if(rawSession?.moduleId && rawSession.moduleId!==module.id)continue;
      const candidate=sanitizeSession(rawSession,module.id,version);if(candidate)clean.practiceSessions[key]=candidate;
    }
    if(version==='v1' && clean.practiceSessions[key])clean.sessions[module.id]=clean.practiceSessions[key];
  }
  clean.session=clean.practiceSessions[sessionKey(clean.activeModule,effectiveAssessmentVersion(clean.activeModule,clean.assessmentVersion))] || null;
  return clean;
}
function activateModule(id) {
  if(!moduleMap.has(id) || id===state.activeModule)return;
  rememberSession();
  state.activeModule=id;state.session=state.practiceSessions[sessionKey(id)] || null;
  selected=moduleLectures(id)[0]?.id || selected;save();
}

function loadState() {
  try {
    const stored = localStorage.getItem(KEY);
    if(stored){state=validateState(JSON.parse(stored));save();}
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
  const params=new URLSearchParams(location.search);
  if(moduleMap.has(params.get('module')))activateModule(params.get('module'));
  view=params.get('view') || 'home';
  selected=params.get('lecture') || moduleLectures()[0]?.id || D.collections[0]?.id || '';
  if(!collections.has(selected))selected=moduleLectures()[0]?.id || '';
  if(view==='collection' && moduleForCollection(selected)){const incoming=selected;activateModule(moduleForCollection(incoming));selected=incoming;}
  if(view==='meadows')activateModule('module1');
  if(![...WORK.map(x=>x[0]),'home','collection','practice','meadows'].includes(view))view='home';
}
function go(next,collectionId,push=true,moduleId) {
  closeReader(false);stopSpeech();pauseMedia();
  if(moduleId)activateModule(moduleId);
  if(collectionId && collections.has(collectionId)){
    const owner=moduleForCollection(collectionId);if(owner)activateModule(owner);selected=collectionId;
  }
  if(next==='meadows')activateModule('module1');
  view=next;searchQuery='';
  const url=new URL(location.href);url.searchParams.set('view',view);url.searchParams.set('module',state.activeModule);
  if(view==='collection')url.searchParams.set('lecture',selected);else url.searchParams.delete('lecture');
  history[push?'pushState':'replaceState'](null,'',url);
  if(innerWidth<=760)state.sideClosed=true;
  save();applyPreferences();render();window.scrollTo({top:0,behavior:'instant'});$('#content').focus({preventScroll:true});
}

function selectableTranscriptVersions() {return view==='collection' && selected==='lecture18' ? ['v1','v16','v18','v20','v21','v22','v23','vB','v24'] : TRANSCRIPT_VERSIONS.filter(version=>!['vB','v24'].includes(version));}
function effectiveVersion() {const choices=selectableTranscriptVersions(),requested=choices.indexOf(state.transcriptVersion),limit=requested<0?choices.length-1:requested;return [...choices].reverse().find(version=>choices.indexOf(version)<=limit && transcriptEditions.has(version)) || 'v1';}
function currentTranscript() {return transcriptEditions.get(effectiveVersion());}
function sectionTitle(section) {return currentTranscript()?.sections.get(section.id)?.title || section.title;}
function teachingParagraphs(section) {return currentTranscript()?.sections.get(section.id)?.teaching ?? (section.teaching || []);}
function collectionTitle(c) {
  const title=currentTranscript()?.collections.get(c.id)?.title || c.title;
  return c.role==='lecture'?title.replace(/^(?:Lectures?\s+)?\d+(?:[+–-]\d+)?\s*[·:.-]\s*/i,''):title;
}
function versionedSections(items) {return items.some(section=>VERSIONED_COLLECTIONS.has(section.collection));}
function transcriptSelector() {
  return `<label class="transcript-version"><span>Transcript</span><select data-transcript-version aria-label="Transcript version">${[['v1','Version 1 · Original'],['v2','Version 2 · Conceptual'],['v3','Version 3 · Clear explanations'],['v4','Version 4 · Teaching notes'],['v7','Version 7 · Teaching notes (bulleted)'],['v10','Version 10 · Direct teaching notes'],['v12','Version 12 · Detailed teaching notes'],['v14','Version 14 · Balanced teaching notes'],['v16','Version 16 · Natural teaching notes'],['v18','Version 18 · Teaching scripts'],['v20','Iskarous · Professor teaching transcript'],['v21','Iskarous B · Focused professor teaching'],['v22','Iskarous C · Natural teaching notes'],['v23','Version 23 · Iskarous C with following slides'],['vB','Version B · Focused Lecture 18 notes'],['v24','Version 24 · Detailed slide-by-slide teaching notes']].filter(([id])=>selectableTranscriptVersions().includes(id)).map(([id,label])=>`<option value="${id}" ${effectiveVersion()===id?'selected':''} ${id!=='v1' && !transcriptEditions.has(id)?'disabled':''}>${esc(transcriptEditions.get(id)?.payload.label || label)}</option>`).join('')}</select>${state.transcriptVersion!==effectiveVersion()?`<small>${esc(state.transcriptVersion.toUpperCase())} unavailable · ${esc(effectiveVersion().toUpperCase())} shown</small>`:''}</label>`;
}
function transcriptNotice() {
  const active=reader?versionedSections(reader.items):view==='collection'?VERSIONED_COLLECTIONS.has(selected):['combined','core'].includes(view) && state.activeModule==='module2';
  const element=$('#transcriptNotice');if(!element)return;
  const error=transcriptErrors.get(state.transcriptVersion);
  element.hidden=!(active && error);
  element.textContent=element.hidden?'':`Transcript Version ${state.transcriptVersion.slice(1)} could not be loaded. ${effectiveVersion()==='v1'?'The original Version 1 teaching remains available.':'Version '+effectiveVersion().slice(1)+' teaching is shown.'} ${error}`;
}
function changeTranscriptVersion(value) {
  if(!TRANSCRIPT_VERSIONS.includes(value) || (value!=='v1' && !transcriptEditions.has(value)))return;
  const scroll=window.scrollY,stage=document.querySelector(reader?.expanded?'#readerDialog .reader-stage':'.inline-reader .reader-stage'),stageScroll=stage?.scrollTop || 0;
  stopSpeech();pauseMedia();state.transcriptVersion=value;save();
  if(reader)renderReader();else render();
  requestAnimationFrame(()=>{
    window.scrollTo(0,scroll);const updated=document.querySelector(reader?.expanded?'#readerDialog .reader-stage':'.inline-reader .reader-stage');if(updated)updated.scrollTop=stageScroll;
    const scope=reader?.expanded?$('#readerDialog'):$('#content');scope.querySelector('[data-transcript-version]')?.focus({preventScroll:true});
  });
}
async function loadConceptualTranscripts(version) {
  const affected=D.collections.filter(collection=>VERSIONED_COLLECTIONS.has(collection.id));if(!affected.length)return;
  try{
    // Version 23 reuses the Version 22 notes and only changes the layout, pinning each slide beside its notes.
    const file=FOLLOWING_SLIDE_VERSIONS[version] || version;
    const response=await fetch('transcripts-'+file+'.json',{cache:'no-cache'});if(!response.ok)throw new Error('Transcript file returned '+response.status+'.');
    let payload=await response.json();if(file!==version && payload.id===file)payload={...payload,id:version,label:'Version 23 · Iskarous C with following slides'};if(payload.id!==version || !payload.collections || typeof payload.collections!=='object')throw new Error('The transcript file has an invalid edition.');
    const editionSections=new Map(),editionCollections=new Map();
    for(const collection of affected){
      const revised=payload.collections[collection.id];if(!revised && !MODULE2_COLLECTIONS.has(collection.id))continue;if(!revised || !Array.isArray(revised.sections))throw new Error('Missing transcript collection '+collection.id+'.');
      const overrides=new Map();
      for(const item of revised.sections){
        const original=sections.get(item.id);
        if(!original || original.collection!==collection.id || item.page!==original.page || overrides.has(item.id) || typeof item.title!=='string' || !Array.isArray(item.teaching) || !item.teaching.every(paragraph=>typeof paragraph==='string' || (paragraph && typeof paragraph.text==='string' && Array.isArray(paragraph.children) && paragraph.children.every(child=>typeof child==='string'))))throw new Error('Invalid transcript source mapping in '+collection.id+'.');
        overrides.set(item.id,item);
      }
      if(overrides.size!==collection.sections.length || collection.sections.some(item=>!overrides.has(item.id)))throw new Error('Incomplete transcript pages in '+collection.id+'.');
      editionCollections.set(collection.id,{title:revised.title || collection.title});
      for(const [id,item] of overrides)editionSections.set(id,item);
    }
    for(const [id,presentation] of Object.entries(payload.visualPresentation || {})){
      const section=sections.get(id);if(section && VERSIONED_COLLECTIONS.has(section.collection) && presentation?.hideStaticPreview===true)visualPresentations.set(id,{hideStaticPreview:true});
    }
    transcriptEditions.set(version,{payload,sections:editionSections,collections:editionCollections});
  }catch(error){
    transcriptErrors.set(version,error.message);
    console.warn('Transcript '+version+' unavailable: '+error.message);
  }
}
function validateQuestion(q) {
  if(!q || typeof q.id!=='string' || !q.id || questionMap.has(q.id) || typeof q.prompt!=='string' || !['mcq','written'].includes(q.type))throw new Error('A practice question has an invalid or duplicate ID or type.');
  if(isMCQ(q) && (!Array.isArray(q.options) || q.options.length!==4 || new Set(q.options.map(o=>o.id)).size!==4 || !q.options.every(o=>typeof o.id==='string' && typeof o.text==='string' && typeof o.feedback==='string') || !q.options.some(o=>o.id===q.correctOption)))throw new Error('A multiple-choice question has an invalid answer map.');
}
async function loadPracticeEdition() {
  try{
    const response=await fetch('practice-v2.json',{cache:'no-cache'});if(!response.ok)throw new Error('Practice file returned '+response.status+'.');
    const payload=await response.json();if(payload.id!=='v2' || !Array.isArray(payload.questions) || !payload.questions.length)throw new Error('The practice file has an invalid edition.');
    const ids=new Set();
    for(const q of payload.questions){
      validateQuestion(q);
      if(ids.has(q.id) || q.moduleId!=='module2' || moduleForCollection(q.lectureId)!=='module2' || !Array.isArray(q.sources) || !q.sources.length || !q.sources.every(ref=>allSections.some(s=>s.collection===ref.collection && s.page===Number(ref.page))))throw new Error('The new practice edition has an invalid source or lecture mapping.');
      ids.add(q.id);
    }
    for(const lecture of moduleLectures('module2')){
      const bank=payload.questions.filter(q=>q.lectureId===lecture.id);
      if(bank.length!==50 || bank.filter(isMCQ).length!==25 || bank.filter(q=>!isMCQ(q)).length!==25)throw new Error('Version 2 does not yet contain a complete quiz for '+lecture.title+'.');
    }
    practiceData=payload;
    for(const q of payload.questions){questionMap.set(q.id,q);practiceQuestionIds.add(q.id);}
  }catch(error){practiceLoadError=error.message;console.warn('Practice v2 unavailable: '+error.message);}
}
async function loadPracticeV3() {
  try{
    const response=await fetch('practice-v3.json',{cache:'no-cache'});if(!response.ok)throw new Error('Practice Version 3 returned '+response.status+'.');
    const payload=await response.json();if(payload.id!=='v3' || !Array.isArray(payload.questions) || !payload.questions.length || !payload.policy?.blueprint)throw new Error('Practice Version 3 has an invalid edition.');
    for(const q of payload.questions){
      validateQuestion(q);
      if(q.moduleId!=='module2' || moduleForCollection(q.lectureId)!=='module2' || !Array.isArray(q.sources) || !q.sources.length || !q.sources.every(ref=>allSections.some(s=>s.collection===ref.collection && s.page===Number(ref.page))))throw new Error('Practice Version 3 has an invalid source or lecture mapping.');
      questionMap.set(q.id,q);
    }
    for(const q of payload.questions)practiceV3Ids.add(q.id);
    practiceV3=payload;
  }catch(error){practiceV3Error=error.message;console.warn('Practice v3 unavailable: '+error.message);}
}
async function loadCodeFigures() {
  try{
    const response=await fetch('module2-code-figures.json',{cache:'no-cache'});if(!response.ok)throw new Error('Code and figures returned '+response.status+'.');
    const payload=await response.json();if(!Array.isArray(payload.codeBlocks) || !Array.isArray(payload.figures))throw new Error('Code and figures file is incomplete.');
    codeFigures=payload;
  }catch(error){codeFiguresError=error.message;console.warn('Code and figures unavailable: '+error.message);}
}
function codeFigureSlides(item) {
  return (item.slides || []).map(sl=>`<figure class="source-figure" style="margin:0 0 12px;width:100%;max-width:100%;min-width:0;overflow:hidden"><img style="display:block;width:100%;max-width:100%;height:auto;border-radius:12px;background:#fff" src="${esc(safeURL(sl.image))}" alt="${esc(sl.lecture)} page ${sl.page}, ${esc(sl.originalTitle)}" loading="lazy"><figcaption>Original source · ${esc(sl.lecture)} · page ${sl.page}<br><span class="small">${esc(sl.originalTitle)}</span></figcaption></figure><details class="review-answer"><summary>Original teaching transcript for this page</summary><ul>${sl.originalTranscript.map(t=>`<li>${rich(t)}</li>`).join('')}</ul></details>`).join('');
}
function codeFigureLinks(item) {
  const links=(item.exam || []).map(e=>`<li>${esc(e.text)}${e.why?` <span class="small muted">· ${esc(e.why)}</span>`:''}</li>`).join('');
  return links?`<h3>Related practice</h3><ul>${links}</ul>`:'<p class="small muted">No practice question covers this item yet.</p>';
}
function codeBlocksView() {
  if(state.activeModule!=='module2')return module2OnlyNotice('Code blocks');
  if(!codeFigures)return `${scopeBanner()}<h1>Code blocks</h1><p class="notice" role="status">Code blocks could not be loaded. ${esc(codeFiguresError)}</p>`;
  const cards=codeFigures.codeBlocks.map(item=>`<article class="card guide-card code-figure-card" id="${esc(item.id)}"><span class="tag">${esc(item.lecture)} · page ${item.page}</span><h2>${esc(item.title)}</h2><div class="section-pair" style="min-width:0"><div style="min-width:0">${item.code?`<pre class="code-block" style="max-width:100%;overflow-x:auto"><code>${esc(item.code)}</code></pre>`:''}${item.note?`<p class="small muted">${esc(item.note)}</p>`:''}<h3>Transcript</h3><ul>${item.transcript.map(t=>`<li>${rich(t)}</li>`).join('')}</ul>${codeFigureLinks(item)}</div><div style="min-width:0">${codeFigureSlides(item)}</div></div></article>`).join('');
  return `${scopeBanner()}<span class="eyebrow">Module II · code</span><h1>Code blocks.</h1><p class="lead">Each code block from the Module II slides, with the transcript for teaching it and the practice questions it connects to.</p><p class="small muted">${esc(codeFigures.note)}</p>${cards}`;
}
function figuresView() {
  if(state.activeModule!=='module2')return module2OnlyNotice('Figures');
  if(!codeFigures)return `${scopeBanner()}<h1>Figures</h1><p class="notice" role="status">Figures could not be loaded. ${esc(codeFiguresError)}</p>`;
  const cards=codeFigures.figures.map(item=>`<article class="card guide-card code-figure-card" id="${esc(item.id)}"><span class="tag">${esc(item.lecture)} · page ${item.page}</span><h2>${esc(item.title)}</h2><div class="section-pair" style="min-width:0"><div style="min-width:0"><h3>Transcript</h3><ul>${item.transcript.map(t=>`<li>${rich(t)}</li>`).join('')}</ul>${codeFigureLinks(item)}</div><div style="min-width:0">${codeFigureSlides(item)}</div></div></article>`).join('');
  return `${scopeBanner()}<span class="eyebrow">Module II · figures</span><h1>Figures.</h1><p class="lead">Each figure from the Module II slides, with the transcript for teaching it and the practice questions it connects to.</p><p class="small muted">${esc(codeFigures.note)}</p>${cards}`;
}
async function loadExamReview() {
  try{
    const response=await fetch('exam2-review.json',{cache:'no-cache'});if(!response.ok)throw new Error('The review guide returned '+response.status+'.');
    const payload=await response.json();if(!Array.isArray(payload.items) || !payload.items.length)throw new Error('The review guide is empty.');
    examReview=payload;
  }catch(error){examReviewError=error.message;console.warn('Exam 2 review unavailable: '+error.message);}
}
function practiceVersionSelector() {
  if(state.activeModule!=='module2')return '';
  return `<label class="practice-version"><span>Practice version</span><select data-assessment-version aria-label="Practice version"><option value="v1" ${effectiveAssessmentVersion()==='v1'?'selected':''}>Version 1 · Original practice</option><option value="v2" ${effectiveAssessmentVersion()==='v2'?'selected':''} ${practiceData?'':'disabled'}>${esc(practiceData?.label || 'Version 2 · Exam style')}</option><option value="v3" ${effectiveAssessmentVersion()==='v3'?'selected':''} ${practiceV3?'':'disabled'}>${esc(practiceV3?.label || 'Version 3 · Exam 2 style')}</option></select></label>`;
}
function practiceVersionBar() {
  if(state.activeModule!=='module2')return '';
  const current=effectiveAssessmentVersion(),others=['v1','v2','v3'].filter(version=>version!==current && (version==='v1' || (version==='v2'?practiceData:practiceV3)));
  const resume=others.map(version=>{const saved=state.practiceSessions[sessionKey('module2',version)];return saved?`<button class="small-button" data-resume-assessment="${version}">Open Version ${version.slice(1)} saved ${saved.finished?'results':'practice'} · ${saved.ids.length} questions</button>`:'';}).join('');
  return `<div class="toolbar practice-edition-toolbar">${practiceVersionSelector()}${resume}</div>${current==='v3'?`<p class="notice practice-version-status">${esc(practiceV3.model?.summary || '')}</p>`:''}${state.assessmentVersion==='v3' && !practiceV3?`<p class="notice practice-version-status" role="status">Practice Version 3 could not be loaded. ${esc(practiceV3Error)}</p>`:''}${state.assessmentVersion==='v2' && !practiceData?`<p class="notice practice-version-status" role="status">Practice Version 2 could not be loaded. The original Version 1 questions remain available. ${esc(practiceLoadError)}</p>`:''}`;
}
function changeAssessmentVersion(version,resume=false) {
  if(!['v1','v2','v3'].includes(version) || (version==='v2' && !practiceData) || (version==='v3' && !practiceV3) || state.activeModule!=='module2')return;
  closeReader(false);rememberSession();state.assessmentVersion=version;
  state.session=state.practiceSessions[sessionKey('module2',version)] || null;save();
  if(resume || view==='practice' && !state.session)go(resume?'practice':'test');else render();
}
function refLabel(c) {return c.number ? 'Lecture '+c.number : c.title;}
function moduleLectureRange(module=currentModule()) {
  const labels=moduleLectures(module.id).map(collection=>collection.number).filter(Boolean);
  return module.lectureRange || (labels.length>1?`Lectures ${labels[0]}–${labels.at(-1)}`:labels.length?`Lecture ${labels[0]}`:'Supplied lecture material');
}
function scopeBanner() {const m=currentModule();return `<div class="scope-banner"><span class="tag">${esc(m.title)} · ${esc(m.subtitle || '')}</span><p>${esc(m.description || (m.id==='module2'?'Current focus · '+moduleLectureRange(m)+'. Future lectures will be added here.':'Completed first-half material · '+moduleLectureRange(m)+'.'))}</p></div>`;}

function nav() {
  const m=currentModule(),queue=queueQuestions().length;
  $('#courseNav').innerHTML=`<button data-go="home" class="${view==='home'?'active':''}" ${view==='home'?'aria-current="page"':''}>Course overview</button>`;
  $('#moduleNav').innerHTML=D.modules.map(module=>`<button data-module="${esc(module.id)}" class="${state.activeModule===module.id?'active':''}" aria-pressed="${state.activeModule===module.id}"><span>${esc(module.title)}</span><small>${esc(module.subtitle || '')}</small></button>`).join('');
  $('#activeModuleLabel').innerHTML=`<strong>${esc(m.title)}</strong> <span>· ${esc(m.subtitle || '')}</span>`;
  $('#workspaceModuleLabel').textContent='Your workspace · '+m.title;
  $('#workNav').innerHTML=WORK.filter(([id])=>state.activeModule==='module2' || !EXAM2_VIEWS.has(id)).map(([id,title])=>`<button data-go="${id}" class="${view===id?'active':''}" ${view===id?'aria-current="page"':''}>${esc(title)}${id==='missed'?' · '+queue:''}</button>`).join('');
  const collectionButton=c=>`<button data-collection="${esc(c.id)}" class="${view==='collection' && selected===c.id?'active':''}" ${view==='collection' && selected===c.id?'aria-current="page"':''}><span class="nav-number">${esc(c.number)}</span><span>${esc(collectionTitle(c))}</span></button>`;
  $('#collectionNav').innerHTML=moduleLectures().map(collectionButton).join('');
  $('#archiveWorkNav').innerHTML=WORK.filter(([id])=>!EXAM2_VIEWS.has(id)).map(([id,title])=>`<button data-go="${id}" data-scope-module="module1" class="${state.activeModule==='module1' && view===id?'active':''}">${esc(title)}${id==='missed'?' · '+queueQuestions('module1').length:''}</button>`).join('');
  $('#archiveCollectionNav').innerHTML=moduleLectures('module1').map(collectionButton).join('');
  $('#moduleArchive').hidden=state.activeModule==='module1';
  if(state.activeModule==='module1')$('#moduleArchive').open=false;
  $('#headerModule').textContent='LING285 / '+m.title.toUpperCase();
}

function pageLink(section) {
  const c = collections.get(section.collection);
  return safeURL(c.pdfFile || c.sourceFile) + (c.pdfFile?'#page='+section.page:'');
}
function badge(s) {return s.core ? '<span class="core-badge">Must know · core review</span>' : '';}
function collectionLabel(c) {return c.role === 'lecture' ? 'Lecture '+(c.number || c.label || '') : (c.role === 'supplemental-notes'?'Supplemental notes':c.role === 'syllabus'?'Course syllabus':'Review material');}
function issueHTML(issues) {return (issues || []).map(issue => `<p class="issue">${esc(typeof issue === 'string' ? issue : issue.message || issue.description || JSON.stringify(issue))}</p>`).join('');}
function teaching(s) {
  const blocks = teachingParagraphs(s);
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
function visual(s,eager=false) {
  const c=collections.get(s.collection),videoOnly=visualPresentations.get(s.id)?.hideStaticPreview===true && (s.assets || []).some(asset=>asset.type==='video');
  const preview=s.image?`<button class="slide-button" data-image-section="${esc(s.id)}" aria-label="Enlarge original page ${s.page}, ${esc(s.title)}"><img src="${esc(safeURL(s.image))}" alt="Original ${esc(c.title)}, page ${s.page}: ${esc(s.title)}" loading="${eager?'eager':'lazy'}" decoding="async"></button>`:'<p class="source-empty">Open the source document to inspect this page.</p>';
  return `<figure class="source-figure ${videoOnly?'video-only-source':''}">${videoOnly?mediaHTML(s):preview}<figcaption>Original source · page ${s.page}<br><a href="${esc(pageLink(s))}" target="_blank" rel="noopener">${esc(c.originalFilename || c.title)}</a></figcaption>${videoOnly?'':mediaHTML(s)}${window.Ling285Stimuli.render(s)}</figure>`;
}
function noteBox(s,readerMode=false) {const noteId=(readerMode?'reader-note-':'note-')+s.id;return `<div class="notes-box"><label for="${esc(noteId)}">My notes · shared across study views</label><textarea id="${esc(noteId)}" rows="1" data-note="${esc(s.id)}" placeholder="Explain it in your own words, or leave a question…">${esc(state.notes[s.id] || '')}</textarea></div>`;}
function sourceText(s) {return `<details class="source-excerpt"><summary>Source text & speaker notes</summary><h4>Extracted source text</h4><pre>${esc(s.sourceText || 'No machine-readable text was extracted from this page. Refer to the original visual and source assets.')}</pre>${s.speakerNotes ? '<h4>Original speaker notes</h4><pre>'+esc(Array.isArray(s.speakerNotes)?s.speakerNotes.join('\n'):s.speakerNotes)+'</pre>':''}</details>`;}
function sectionBody(s,readerMode=false,recall=false) {
  return `<div class="section-body"><div class="section-pair"><div><div class="teaching-heading">${readerMode?`<span class="reader-label">${esc(collectionTitle(collections.get(s.collection)))} · page ${s.page}</span><h2>${esc(sectionTitle(s))} ${badge(s)}</h2>`:''}</div>${recall?'<div class="recall-cover">Explain the idea from the original visual. What changes, why does it change, and what does that cause?<p><button data-action="recall">Reveal teaching notes</button></p></div>':teaching(s)}${issueHTML(s.issues)}${s.core && s.coreReason?'<p class="small muted" style="margin-top:20px"><strong>Core priority</strong> · '+esc(s.coreReason)+'</p>':''}<div class="section-tools row"><label><input type="checkbox" data-read="${esc(s.id)}" ${state.read[s.id]?'checked':''}> Mark read</label><button class="small-button" data-open-section="${esc(s.id)}">Expand visual + teaching</button></div>${noteBox(s,readerMode)}${sourceText(s)}</div>${visual(s,readerMode)}</div></div>`;
}
function sectionHTML(s,index=0) {return `<details class="source-section ${s.core?'core-section':''}" data-section="${esc(s.id)}" ${own(state.open,s.id) ? state.open[s.id]?'open':'' : index === 0?'open':''}><summary><span class="page-index">${String(s.page).padStart(2,'0')}</span><span class="section-title">${esc(sectionTitle(s))}</span>${badge(s)}</summary>${sectionBody(s)}</details>`;}
function searchTools(label='Search teaching notes') {return `<label class="search-wrap"><span>${esc(label)}</span><input type="search" id="noteSearch" class="search" value="${esc(searchQuery)}" placeholder="Find a concept, source example, or explanation…"></label><p class="small muted" id="searchCount" aria-live="polite"></p>`;}
function studyToolbar(kind) {
  const active=reader?.kind===kind && reader.returnView===view,c=kind==='lecture'?collections.get(selected):null;
  const quiz=c?.role==='lecture'?lecturePracticeButtons(c).replaceAll('<button ','<button role="tab" aria-selected="false" '):'';
  return `<div class="study-mode-toolbar" data-study-toolbar="${esc(kind)}"><div class="study-version-row" data-study-version>${versionedSections(matchingSections(kind))?transcriptSelector():''}</div><div class="study-mode-tabs" role="tablist" aria-label="Study view"><button role="tab" data-action="teachingNotes" aria-selected="${!active}">Teaching notes</button><button role="tab" data-reader="${kind}" data-expanded="false" aria-selected="${Boolean(active && !reader.expanded)}">Visual + transcript</button><button role="tab" data-reader="${kind}" data-expanded="true" aria-selected="${Boolean(active && reader.expanded)}">Expand visual + transcript</button>${quiz}</div></div><div class="toolbar notes-actions"><button data-action="smaller" aria-label="Decrease teaching text size">A−</button><button data-action="larger" aria-label="Increase teaching text size">A+</button><button data-action="expandSections">Expand sections</button><button data-action="collapseSections">Collapse sections</button><button class="push" data-action="print">Print notes</button></div>`;
}
function home() {
  const m=currentModule(),lectures=moduleLectures(),pages=lectures.flatMap(c=>c.sections),read=pages.filter(s=>state.read[s.id]).length;
  const other=D.modules.find(module=>module.id!==m.id),otherLectures=moduleLectures(other?.id),pool=moduleQuestions();
  return `<section class="module-hero"><span class="tag">${esc(m.title.toUpperCase())} · ${esc((m.subtitle || '').toUpperCase())}</span><h1>${m.id==='module2'?'A new module.<br>Follow sound into speech.':'Module I.<br>Your first-half archive.'}</h1><p class="lead">${esc(m.description || m.lectureRange || '')} ${m.id==='module2'?'Follow the cause and effect in speech production, then test the ideas in both formats.':'Teaching, core review, and module practice stay together. Your notes and progress remain attached to their original pages.'}</p><div class="row"><button class="primary" data-go="combined">Open ${esc(m.title)} notes</button><button data-go="test">Current practice test</button><button data-go="guide">Study guide</button></div></section><div class="grid module-grid"><article class="card module-card active"><span class="eyebrow">${m.id==='module2'?'Current focus':'Archived focus'}</span><h2>${esc(m.title)} · ${esc(m.subtitle || '')}</h2><p>${lectures.length} numbered lecture collections · ${pages.length} original source pages.</p><p class="small muted">${read} of ${pages.length} lecture pages marked read</p><div class="progress" aria-label="${read} of ${pages.length} lecture pages marked read"><span style="width:${pages.length?read/pages.length*100:0}%"></span></div><div class="row"><button data-go="combined">Open teaching notes</button><button data-go="core">Must know · core review</button></div></article>${other?`<article class="card module-card"><span class="eyebrow">${other.id==='module1'?'Completed first-half material':'Current second-half material'}</span><h2>${esc(other.title)} · ${esc(other.subtitle || '')}${other.id==='module1'?' archive':''}</h2><p>${esc(other.description || other.lectureRange || '')} Its guide, core review, and practice stay separate from this workspace.</p><p class="small muted">${otherLectures.length} lecture collections · saved study progress preserved</p><button data-module="${esc(other.id)}">Open ${esc(other.title)}${other.id==='module1'?' archive':''}</button></article>`:''}</div><div class="card practice-summary"><div><span class="eyebrow">Practice for ${esc(m.title)}</span><h2>Multiple choice. Written explanations. Or both.</h2><p>${bankSummary(pool)}.</p><p>${primaryAssessmentSummary()}</p></div><div class="row"><button class="primary" data-go="test">Open current practice</button><button data-go="quizzes">Lecture quizzes</button><button data-go="missed">Missed & uncertain · ${queueQuestions().length}</button></div></div><section class="current-lecture-list"><h2>${esc(m.title)} · individual collections</h2><div class="row">${lectures.map(c=>`<button data-collection="${esc(c.id)}"><span class="nav-number">${esc(c.number)}</span> ${esc(collectionTitle(c))}</button>`).join('')}</div></section>${m.futureNote?'<div class="notice">'+esc(m.futureNote)+'</div>':''}<p class="small muted">The six Meadows readings have their own Module I workspace. <button class="text-button small-button" data-go="meadows">Open Meadows</button> · <button class="text-button small-button" data-go="sources">Sources & coverage</button></p>`;
}

function assessmentPolicy(module=currentModule()) {
  if(module.id==='module2' && effectiveAssessmentVersion('module2')==='v3'){const p=practiceV3.policy;return {fixed:true,currentTestSize:p.currentTestSize,lectureQuizSize:practiceV3.questions.filter(q=>q.lectureId==='lecture11').length,mcqShare:p.mcqCount/p.currentTestSize};}
  const raw=module.assessmentPolicy || {},fixed=module.id==='module2';
  const currentTestSize=Number.isInteger(raw.currentTestSize) && raw.currentTestSize>0?raw.currentTestSize:fixed?100:20;
  const lectureQuizSize=Number.isInteger(raw.lectureQuizSize) && raw.lectureQuizSize>0?raw.lectureQuizSize:fixed?50:20;
  const mcqShare=Number.isFinite(raw.mcqShare) && raw.mcqShare>=0 && raw.mcqShare<=1?raw.mcqShare:.5;
  return {fixed,currentTestSize,lectureQuizSize,mcqShare};
}
function formatQuota(size,share=assessmentPolicy().mcqShare) {const mcq=Math.round(size*share);return {mcq,written:size-mcq};}
function questionForLecture(q,id) {
  return moduleForCollection(id)==='module2'?q.lectureId===id:(q.sources || []).some(ref=>ref.collection===id);
}
function collectionQuestions(c) {return moduleQuestions(moduleForCollection(c.id) || state.activeModule).filter(q=>questionForLecture(q,c.id));}
function assessmentPool(pool=moduleQuestions(),lectureIds=moduleLectures().map(c=>c.id)) {return pool.filter(q=>lectureIds.includes(q.lectureId));}
function fullAssessmentAvailable(pool,size,share=assessmentPolicy().mcqShare) {
  const quota=formatQuota(size,share);return pool.filter(isMCQ).length>=quota.mcq && pool.filter(q=>!isMCQ(q)).length>=quota.written;
}
function bankSummary(pool=moduleQuestions()) {return `${pool.length} questions in the bank · ${formatCounts(pool)}`;}
function primaryAssessmentSummary() {
  const policy=assessmentPolicy(),quota=formatQuota(policy.currentTestSize,policy.mcqShare);
  return policy.fixed?`${policy.currentTestSize}-question current test · ${quota.mcq} multiple-choice + ${quota.written} written. Each lecture has a ${policy.lectureQuizSize}-question quiz.`:`Current tests use up to ${policy.currentTestSize} questions in your chosen format.`;
}
function focusedLabel(pool) {
  const count=modePool(pool).length,label=state.practiceMode==='mcq'?'multiple-choice':state.practiceMode==='written'?'written':'mixed';
  return `${count}-question ${label} practice`;
}
function lecturePracticeButtons(c) {
  const pool=collectionQuestions(c),policy=assessmentPolicy(moduleMap.get(moduleForCollection(c.id)) || currentModule());
  if(!pool.length || c.role!=='lecture')return '';
  if(!policy.fixed)return `<button class="small-button" data-start="lecture:${esc(c.id)}">Practice</button>`;
  const ready=fullAssessmentAvailable(pool,policy.lectureQuizSize,policy.mcqShare);
  return `<button class="small-button" data-start="lecture:${esc(c.id)}" ${ready?'':'disabled'}>Start ${policy.lectureQuizSize}-question quiz</button>${state.practiceMode!=='mixed'?`<button class="small-button" data-start="focus-lecture:${esc(c.id)}" ${modePool(pool).length?'':'disabled'}>${esc(focusedLabel(pool))}</button>`:''}`;
}
function savedSetNotice(session=state.session) {
  if(!session || session.moduleId!=='module2')return '';
  const policy=assessmentPolicy(moduleMap.get(session.moduleId));
  const expected=session.scope==='mixed'?policy.currentTestSize:session.scope.startsWith('lecture:')?policy.lectureQuizSize:0;
  if(!expected)return '';
  const items=session.ids.map(id=>questionMap.get(id)).filter(Boolean),quota=formatQuota(expected,policy.mcqShare);
  const coversCurrentLectures=session.scope!=='mixed' || moduleLectures(session.moduleId).every(c=>items.some(q=>q.lectureId===c.id));
  if(items.length===expected && items.filter(isMCQ).length===quota.mcq && items.filter(q=>!isMCQ(q)).length===quota.written && coversCurrentLectures)return '';
  return `<p class="notice saved-set-notice">Earlier saved practice · ${session.ids.length} questions. Your progress is preserved. New ${session.scope==='mixed'?'current tests':'full lecture quizzes'} use ${expected} questions, split equally between multiple choice and written explanations.${!coversCurrentLectures?' Start a new set to include all current lectures.':''}</p>`;
}

function collectionCard(c) {
  const read=c.sections.filter(s=>state.read[s.id]).length,pool=collectionQuestions(c);
  return `<article class="card collection-card"><span class="collection-number">${esc(c.number || '↳')}</span><span class="eyebrow">${esc(collectionLabel(c))}</span><h3>${esc(collectionTitle(c))}</h3><p class="small">${c.sections.length} source pages · ${read} read${pool.length?' · '+pool.length+' practice questions':''}</p>${moduleForCollection(c.id)==='module2' && c.role==='lecture'?`<p class="small muted">${formatCounts(pool)}</p>`:''}<div class="row"><button data-collection="${esc(c.id)}">Open collection</button>${lecturePracticeButtons(c)}</div></article>`;
}

function collectionView() {
  const c=collections.get(selected);if(!c)return '<h1>Collection unavailable</h1>';
  return `${moduleForCollection(c.id)?scopeBanner():'<span class="tag">Supporting course source</span>'}<span class="eyebrow">${esc(collectionLabel(c))}</span><h1>${esc(collectionTitle(c))}</h1><p class="small muted">${c.sections.length} source pages · ${esc(c.originalFilename || '')}</p>${issueHTML(c.issues)}${c.role==='lecture' && moduleForCollection(c.id)==='module2'?practiceVersionBar():''}<div class="row"><a class="small" href="${esc(safeURL(c.sourceFile || c.pdfFile))}" target="_blank" rel="noopener">Open original source</a>${c.pdfFile && c.sourceFile!==c.pdfFile?`<a class="small" href="${esc(safeURL(c.pdfFile))}" target="_blank" rel="noopener">Open PDF</a>`:''}${c.role!=='lecture'?'<button class="small-button" data-go="sources">All sources & coverage</button>':''}</div>${studyToolbar('lecture')}${searchTools()}<div class="section-list">${c.sections.map(sectionHTML).join('')}</div>`;
}

function combined() {return `${scopeBanner()}<span class="eyebrow">${esc(currentModule().title)} lecture collections</span><h1>Combined teaching notes.</h1><p class="lead">The numbered lecture decks from this module, in source order.</p>${studyToolbar('combined')}${searchTools('Search this module’s lecture collections')}${moduleLectures().map(c=>`<section class="section-group search-group"><h2>${esc(c.number)} · ${esc(collectionTitle(c))}</h2>${c.sections.map(sectionHTML).join('')}</section>`).join('')}`;}
function meadows() {
  const readings=moduleReadings('module1');
  return `${scopeBanner()}<span class="eyebrow">Module I · supporting readings</span><h1>Meadows.<br>Systems & feedback.</h1><p class="lead">Follow stocks, flows, balancing loops, reinforcing loops, and delays through the six supplied readings.</p><div class="grid">${readings.map(collectionCard).join('')}</div>${studyToolbar('meadows')}${searchTools('Search the Meadows readings')}${readings.map(c=>`<section class="section-group search-group"><h2>${esc(c.title)}</h2>${c.sections.map(sectionHTML).join('')}</section>`).join('')}`;
}

function core() {
  const groups=moduleCoreCollections(),pool=groups.flatMap(c=>c.sections).filter(s=>s.core);
  return `${scopeBanner()}<span class="eyebrow">Selective study priorities</span><div class="core-intro"><h1>Must know<br>· core review.</h1><p class="lead">${pool.length} selected source pages in ${esc(currentModule().title)}. Understand the mechanism and explain the distinction before moving to supporting detail.</p></div>${studyToolbar('core')}${searchTools('Search this module’s core explanations')}${groups.filter(c=>c.sections.some(s=>s.core)).map(c=>`<section class="section-group search-group"><h2>${c.number?esc(c.number)+' · ':''}${esc(collectionTitle(c))}</h2>${c.sections.filter(s=>s.core).map(sectionHTML).join('')}</section>`).join('') || '<div class="empty">Core priorities have not been supplied yet.</div>'}`;
}

function refsFor(g) {return (g.refs || []).map(ref => {
  const exact = allSections.find(s => s.collection === ref.collection && Number(s.page) === Number(ref.page));return exact;
}).filter(Boolean);}
function guideCard(g,index) {
  const ids = refsFor(g).map(s => s.id);
  return `<article class="card guide-card"><h2>${esc(g.title)}</h2><p>${rich(g.explanation || '')}</p><div class="row">${ids.length?`<button data-guide-reader="${index}">Open matching sources · ${ids.length}</button>`:''}${refsFor(g).slice(0,6).map(s => `<button class="source-ref" data-open-section="${esc(s.id)}">${esc(refLabel(collections.get(s.collection)))} · p${s.page}</button>`).join('')}</div><label class="readiness"><input type="checkbox" data-ready="guide-${index}" ${state.ready['guide-'+index]?'checked':''}> I can explain this without the notes</label></article>`;
}
function guide() {return `${scopeBanner()}<span class="eyebrow">Explain, connect, apply</span><h1>What to know<br>by the end.</h1><p class="lead">Use this module’s explanations as a checklist, then open the matching source pages.</p>${moduleGuides().map(({g,index})=>guideCard(g,index)).join('') || '<div class="empty">Open the lecture collections to study the current material.</div>'}`;}

function demonstrationEntries() {
  const entries=moduleGuides(),explicit=entries.filter(({g})=>['demonstration','experiment','connection'].includes(g.kind));
  return explicit.length?explicit:entries.filter(({g})=>/demonstrat|feedback|oscillat|spring|thermostat|hearing|propagation|learning|experiment|dynamic programming/i.test(g.title));
}

function experiments() {return `${scopeBanner()}<span class="eyebrow">Follow the cause and effect</span><h1>Demonstrations<br>& connections.</h1><p class="lead">Trace what changes, what it causes, and which source evidence supports the explanation.</p>${demonstrationEntries().map(({g,index})=>guideCard(g,index)).join('') || '<div class="empty"><p>Demonstrations remain in the original lecture order.</p><button data-go="combined">Open lecture notes</button></div>'}`;}

function needsReview(q) {return state.flags[q.id]===true || ['partial','review','uncertain'].includes(state.ratings[q.id]) || (isMCQ(q) && state.mcqSubmitted[q.id] && state.mcqSelections[q.id]!==q.correctOption);}
function queueQuestions(moduleId=state.activeModule) {return moduleQuestions(moduleId).filter(needsReview);}
function practiceModePicker(label='Question format') {
  return `<fieldset class="practice-mode"><legend>${esc(label)}</legend>${[['mixed','Mixed'],['mcq','Multiple choice'],['written','Written explanations']].map(([value,text])=>`<label><input type="radio" name="practiceMode" value="${value}" ${state.practiceMode===value?'checked':''}> <span>${text}</span></label>`).join('')}</fieldset>`;
}

function modePool(pool) {return state.practiceMode==='mixed'?pool:pool.filter(q=>isMCQ(q)===(state.practiceMode==='mcq'));}
function formatCounts(pool) {return `${pool.filter(isMCQ).length} multiple-choice · ${pool.filter(q=>!isMCQ(q)).length} written`;}
function test() {
  const pool=moduleQuestions(),policy=assessmentPolicy(),owned=assessmentPool(pool);
  const count=policy.fixed?policy.currentTestSize:Math.min(policy.currentTestSize,modePool(pool).length),quota=formatQuota(policy.currentTestSize,policy.mcqShare);
  const ready=policy.fixed?fullAssessmentAvailable(owned,count,policy.mcqShare):count>0;
  return `${scopeBanner()}<span class="eyebrow">Current practice · ${esc(currentModule().title)}</span><h1>Choose the answer.<br>Explain the reasoning.</h1>${practiceVersionBar()}<div class="practice-intro"><p class="lead">${policy.fixed?`The full current test has ${count} unique questions, split into ${quota.mcq} multiple-choice questions and ${quota.written} written explanations. Contributions stay balanced across the available lectures.`:'Use multiple-choice questions, written explanations, or both. Each question links to its original sources and explains the reasoning after your response.'}</p></div>${practiceModePicker(policy.fixed?'Optional focused and quick practice format':'Question format')}<p class="small muted">${bankSummary(pool)}.${policy.fixed?' Format choices apply to focused practice and the quick set. The full current test keeps its equal split.':''}</p>${policy.fixed && state.practiceMode!=='mixed'?`<div class="row"><button data-start="focused" ${modePool(owned).length?'':'disabled'}>Start ${esc(focusedLabel(owned))}</button><span class="small muted">Format-only practice uses the available questions without duplicates.</span></div>`:''}<div class="grid"><article class="card"><span class="eyebrow">Current module test</span><h2>${count}-question practice test</h2><p>${policy.fixed?`${quota.mcq} multiple choice + ${quota.written} written. New lecture banks join the pool while this full test stays at ${count} questions.`:`A selection from ${esc(currentModule().title)}, with lecture coverage preserved as the bank grows.`}</p><button class="primary" data-start="mixed" ${ready?'':'disabled'}>Start current test</button></article><article class="card"><span class="eyebrow">A shorter session</span><h2>Five questions.</h2><p>A quick set in your chosen format. Keep difficult or uncertain questions in your review queue.</p><button data-start="quick" ${modePool(pool).length?'':'disabled'}>Start 5-question practice</button></article><article class="card"><span class="eyebrow">Lecture quizzes</span><h2>${policy.fixed?policy.lectureQuizSize+' questions per lecture.':'Choose one lecture.'}</h2><p>${policy.fixed?'Each full quiz contains the complete lecture bank, split equally between the two formats.':'Practice both formats within an individual lecture collection.'}</p><button data-go="quizzes">Open lecture quizzes</button></article></div>${state.session?`<div class="card"><h2>${state.session.finished?'Review your saved set':'Continue your saved set'}</h2><p>${esc(state.session.title)} · ${state.session.ids.length} questions</p>${savedSetNotice()}<button data-go="practice">${state.session.finished?'Open results':'Resume saved practice'}</button></div>`:''}`;
}

function quizzes() {
  const policy=assessmentPolicy(),quota=formatQuota(policy.lectureQuizSize,policy.mcqShare);
  return `${scopeBanner()}<span class="eyebrow">One collection at a time</span><h1>Lecture quizzes.</h1>${practiceVersionBar()}<p class="lead">${policy.fixed?`Each full lecture quiz has ${policy.lectureQuizSize} questions — ${quota.mcq} multiple choice and ${quota.written} written. Format-only sets are optional focused practice.`:'Choose a format, respond, and check the reasoning against the original source.'}</p>${practiceModePicker(policy.fixed?'Optional focused practice format':'Question format')}<div class="grid">${moduleLectures().map(collectionCard).join('')}</div>`;
}

function missed() {
  const pool=queueQuestions();
  return `${scopeBanner()}<span class="eyebrow">Your next review</span><h1>Missed & uncertain.</h1>${practiceVersionBar()}<p class="lead">${pool.length} questions in this module need another try. A checked correct answer clears a multiple-choice mistake unless it remains flagged. Written explanations use your self-rating.</p>${pool.length?`<div class="row toolbar"><button class="primary" data-start="missed">Practice this module’s review queue</button></div>${pool.map(q=>`<article class="card guide-card"><span class="tag">${isMCQ(q)?'Multiple choice':'Written'} · ${state.flags[q.id]?'uncertain':esc(state.ratings[q.id] || 'review')}</span><h3 style="margin-top:15px">${esc(q.prompt)}</h3><div class="row"><button data-single-question="${esc(q.id)}">Try this question</button>${isMCQ(q) && state.ratings[q.id]==='review'?'':`<button class="small-button" data-remove-queue="${esc(q.id)}">Remove from queue</button>`}</div></article>`).join('')}`:'<div class="empty"><p>Incorrect multiple-choice responses, uncertain flags, and written answers rated for review appear here.</p><button data-go="test">Choose practice</button></div>'}`;
}

function module2OnlyNotice(title) {return `${scopeBanner()}<h1>${esc(title)}</h1><p class="lead">This page covers Exam 2, which is on Module II.</p><button data-go="${esc(view)}" data-scope-module="module2">Open it for Module II</button>`;}
function examReviewView() {
  if(state.activeModule!=='module2')return module2OnlyNotice('Exam 2 review guide');
  if(!examReview)return `${scopeBanner()}<h1>Exam 2 review guide</h1><p class="notice" role="status">The review guide could not be loaded. ${esc(examReviewError)}</p>`;
  const m=examReview.model,list=items=>`<ul>${items.map(x=>`<li>${rich(x)}</li>`).join('')}</ul>`;
  const card=item=>{const ready=state.ready[item.id];return `<article class="card guide-card review-card" id="${esc(item.id)}"><span class="tag">Review question ${item.number}</span><h2>${esc(item.question)}</h2>${item.image?`<img class="review-image" src="${esc(safeURL(item.image))}" alt="${esc(item.figure || 'Figure from the review sheet')}" loading="lazy">`:''}${item.figure?`<p class="small muted review-figure">Figure · ${esc(item.figure)}</p>`:''}<label class="draft-label" for="draft-${esc(item.id)}">Try it first · your answer is saved in this browser</label><textarea id="draft-${esc(item.id)}" class="draft review-draft" data-draft="${esc(item.id)}" placeholder="Write your answer the way you would on the exam…">${esc(state.drafts[item.id] || '')}</textarea><details class="review-answer"><summary>Show how to answer it and what it means</summary><h3>How to answer it on the exam</h3><p>${rich(item.answer)}</p>${item.code?`<pre class="review-code"><code>${esc(item.code)}</code></pre>`:''}<h3>What it means</h3>${list(item.teaching)}<h3>How he could change it on the exam</h3><p>${rich(item.change)}</p></details><div class="row">${sourceRefs(item)}</div><label class="readiness"><input type="checkbox" data-ready="${esc(item.id)}" ${ready?'checked':''}> I can answer this without the guide</label></article>`;};
  const done=examReview.items.filter(item=>state.ready[item.id]).length;
  return `${scopeBanner()}<span class="eyebrow">Review ${esc(examReview.reviewDate)} · Exam ${esc(examReview.examDate)}</span><h1>Exam 2<br>review guide.</h1><p class="lead">All 21 review questions, answered the way you would write them on the exam, with the reasoning behind each one. Try each question first, then open the answer. ${done} of ${examReview.items.length} marked ready.</p><div class="row toolbar"><button class="primary" data-start="writing">Take a 25-question writing exam</button><button data-go="test">Exam 2 style practice test</button></div><details class="card review-model" open><summary><strong>${esc(m.title)}</strong></summary><h3>How he writes questions</h3>${list(m.patterns)}<h3>How answers are graded</h3>${list(m.grading)}<h3>What he said in class</h3><ul>${m.cues.map(c=>`<li><strong>${esc(c.date)}</strong> · ${esc(c.text)}</li>`).join('')}</ul><h3>What he said he will not ask</h3>${list(m.wontAsk)}</details><details class="card review-model"><summary><strong>Most likely on Exam 2</strong></summary>${m.likely.map(t=>`<h3>${esc(t.tier)}</h3>${list(t.items)}`).join('')}<p class="small muted">These are predictions from the review sheet, the Exam 1 pattern and his cues in class, not a list from the professor.</p></details>${examReview.items.map(card).join('')}`;
}
function writingExamView() {
  if(state.activeModule!=='module2')return module2OnlyNotice('Writing exam');
  if(!practiceV3)return `${scopeBanner()}<h1>Writing exam</h1><p class="notice" role="status">Practice Version 3 could not be loaded. ${esc(practiceV3Error)}</p>`;
  const policy=practiceV3.policy,pool=practiceV3.questions.filter(q=>!isMCQ(q)),saved=state.practiceSessions[sessionKey('module2','v3')];
  const open=saved && saved.scope==='writing'?`<button data-resume-assessment="v3">Open your saved writing exam · ${saved.finished?'results':'question '+(saved.index+1)+' of '+saved.ids.length}</button>`:'';
  return `${scopeBanner()}<span class="eyebrow">Exam 2 · ${esc(examReview?.examDate || 'Thursday, November 12')} · 1 hour 20 minutes</span><h1>Writing exam.<br>Answer in full sentences.</h1><p class="lead">Every question is written, in the forms the professor uses: what happens if something goes up or down and why, describe it in your own words, compare two things, is this valid, and small counts with a reason. Write your answer, then reveal the model answer and rate yourself.</p><div class="row toolbar"><button class="primary" data-start="writing">Start a new 25-question writing exam</button>${open}<button data-go="review">Exam 2 review guide</button></div><div class="card"><h2>How the 25 questions are spread</h2><p class="small">More questions come from Lectures 12 to 14 because most of the review sheet covers masses, springs, formants and spectrograms.</p><ul>${moduleLectures().filter(c=>policy.blueprint[c.id]).map(c=>`<li>${esc(c.number)} · ${esc(collectionTitle(c))} · ${policy.blueprint[c.id]} questions</li>`).join('')}</ul><p class="small muted">${pool.length} written questions in the bank. Questions from the review sheet and topics he said he would test are picked more often.</p></div>`;
}
function shuffle(items) {
  const array = [...items];for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}return array;
}
function weightedPick(pool) {
  return pool.map(q=>({q,key:-Math.log(Math.max(Number.EPSILON,Math.random()))/Math.max(1,Number(q.priority)||1)})).sort((a,b)=>a.key-b.key).map(item=>item.q);
}
function samplePractice(pool,count,mode,coverLectures=true) {
  const available=mode==='mixed'?pool:pool.filter(q=>isMCQ(q)===(mode==='mcq'));
  const selected=[],picked=new Set();
  const add=items=>{const q=weightedPick(items.filter(item=>!picked.has(item.id)))[0];if(q && selected.length<count){selected.push(q);picked.add(q.id);}return q;};
  const types=mode==='mixed'?['mcq','written']:[mode];
  const groups=coverLectures?shuffle(moduleLectures()).map(c=>({id:c.id,pool:available.filter(q=>questionForLecture(q,c.id))})).filter(group=>group.pool.length):[];
  // Cover available lectures first, then available lecture/format cells, before weighting the remainder.
  for(const [index,group] of groups.entries()){
    if(selected.length>=count)break;
    if(selected.some(q=>group.pool.some(candidate=>candidate.id===q.id)))continue;
    const preferred=types[index%types.length],preferredPool=group.pool.filter(q=>(isMCQ(q)?'mcq':'written')===preferred);
    add(preferredPool.length?preferredPool:group.pool);
  }
  if(mode==='mixed')for(const type of types){
    if(!selected.some(q=>(isMCQ(q)?'mcq':'written')===type))add(available.filter(q=>(isMCQ(q)?'mcq':'written')===type));
  }
  for(const group of groups)for(const type of types){
    if(selected.length>=count)break;
    const cell=group.pool.filter(q=>(isMCQ(q)?'mcq':'written')===type);
    if(cell.length && !selected.some(q=>cell.some(candidate=>candidate.id===q.id)))add(cell);
  }
  for(const q of weightedPick(available.filter(q=>!picked.has(q.id)))){
    if(selected.length>=count)break;selected.push(q);picked.add(q.id);
  }
  return shuffle(selected);
}
function balancedAssessmentSample(pool,size,share,lectureIds) {
  const available=assessmentPool(pool,lectureIds),quota=formatQuota(size,share);
  if(!fullAssessmentAvailable(available,size,share))return [];
  const ids=shuffle(lectureIds),totals=new Map(ids.map(id=>[id,0])),items=[];
  for(const type of ['mcq','written']){
    const cells=new Map(ids.map(id=>[id,available.filter(q=>q.lectureId===id && (isMCQ(q)?'mcq':'written')===type)]));
    const allocation=new Map(ids.map(id=>[id,0]));
    for(let slot=0;slot<quota[type];slot++){
      const eligible=ids.filter(id=>allocation.get(id)<cells.get(id).length);
      if(!eligible.length)return [];
      eligible.sort((a,b)=>allocation.get(a)-allocation.get(b) || totals.get(a)-totals.get(b) || ids.indexOf(a)-ids.indexOf(b));
      const chosen=eligible[0];allocation.set(chosen,allocation.get(chosen)+1);totals.set(chosen,totals.get(chosen)+1);
    }
    for(const id of ids)items.push(...weightedPick(cells.get(id)).slice(0,allocation.get(id)));
  }
  return items.length===size && new Set(items.map(q=>q.id)).size===size?shuffle(items):[];
}
function exam2Sample(writtenOnly) {
  const policy=practiceV3.policy,pool=practiceV3.questions,items=[];
  const lectures=Object.keys(policy.blueprint),withChoice=new Set(writtenOnly?[]:shuffle(lectures).slice(0,policy.mcqCount));
  for(const id of lectures){
    const count=policy.blueprint[id],choice=withChoice.has(id)?1:0;
    const written=weightedPick(pool.filter(q=>q.lectureId===id && !isMCQ(q))).slice(0,count-choice);
    const mcq=weightedPick(pool.filter(q=>q.lectureId===id && isMCQ(q))).slice(0,choice);
    items.push(...mcq,...written);
  }
  const size=writtenOnly?policy.writingExamSize:policy.currentTestSize;
  return items.length===size && new Set(items.map(q=>q.id)).size===size?shuffle(items):[];
}
function startExam2(scope) {
  if(!practiceV3){announce('Practice Version 3 could not be loaded. '+practiceV3Error);return;}
  if(state.activeModule!=='module2')activateModule('module2');
  if(state.assessmentVersion!=='v3'){rememberSession();state.assessmentVersion='v3';}
  const writing=scope==='writing',items=exam2Sample(writing);
  if(!items.length){announce('The Exam 2 question set is not complete yet.');return;}
  state.session={ids:items.map(q=>q.id),index:0,title:writing?'Module II · writing exam · 25 written questions':'Module II · Exam 2 style test · 25 questions',finished:false,edition:String(practiceV3.revision || ''),assessmentVersion:'v3',scope,mode:writing?'written':'mixed',moduleId:'module2'};
  for(const q of items){
    if(isMCQ(q)){state.optionOrders[q.id]=shuffle(q.options.map(option=>option.id));delete state.mcqSelections[q.id];state.mcqSubmitted[q.id]=false;}
    else state.revealed[q.id]=false;
  }
  save();go('practice');
}
function startPractice(scope,exactId) {
  if(scope==='writing' || (scope==='mixed' && !exactId && effectiveAssessmentVersion()==='v3' && state.activeModule==='module2')){startExam2(scope);return;}
  const fullLecture=scope.startsWith('lecture:'),focusLecture=scope.startsWith('focus-lecture:');
  const lectureId=fullLecture?scope.slice(8):focusLecture?scope.slice(14):null;
  if(lectureId){const owner=moduleForCollection(lectureId);if(owner)activateModule(owner);}
  const policy=assessmentPolicy();let pool=moduleQuestions(),title=currentModule().title+' · current practice',mode=state.practiceMode,items;
  if(lectureId){pool=pool.filter(q=>questionForLecture(q,lectureId));title=collectionTitle(collections.get(lectureId))+(focusLecture?' · focused practice':' · lecture quiz');}
  if(scope==='missed'){pool=queueQuestions();title=currentModule().title+' · missed & uncertain';mode='mixed';}
  if(exactId){pool=pool.filter(q=>q.id===exactId);title=currentModule().title+' · focused practice';mode=isMCQ(pool[0])?'mcq':'written';}
  if(policy.fixed && (scope==='mixed' || fullLecture)){
    mode='mixed';const target=fullLecture?policy.lectureQuizSize:policy.currentTestSize;
    items=balancedAssessmentSample(pool,target,policy.mcqShare,fullLecture?[lectureId]:moduleLectures().map(c=>c.id));
    title=(fullLecture?collectionTitle(collections.get(lectureId))+' · lecture quiz':currentModule().title+' · current practice test')+' · '+target+' questions';
  }else{
    if(policy.fixed && scope==='focused'){pool=assessmentPool(pool);title=currentModule().title+' · '+(mode==='mcq'?'multiple-choice':mode==='written'?'written':'mixed')+' focused practice';}
    const cap=scope==='quick'?5:scope==='focused' || focusLecture?modePool(pool).length:(scope==='mixed' || fullLecture)?policy.currentTestSize:pool.length;
    items=samplePractice(pool,cap,mode,scope==='mixed' || scope==='quick' || scope==='focused');
  }
  if(!items.length){announce('The complete question set is not available in that format yet.');return;}
  state.session={ids:items.map(q=>q.id),index:0,title,finished:false,edition:String(effectiveAssessmentVersion()==='v2'?(practiceData.revision || practiceData.edition || ''):(D.course.edition || '')),assessmentVersion:effectiveAssessmentVersion(),scope,mode,moduleId:state.activeModule};
  for(const q of items){
    if(isMCQ(q)){state.optionOrders[q.id]=shuffle(q.options.map(option=>option.id));delete state.mcqSelections[q.id];state.mcqSubmitted[q.id]=false;}
    else state.revealed[q.id]=false;
  }
  save();go('practice');
}

function ensureOptionOrder(q) {
  if(!validOrder(q,state.optionOrders[q.id])){state.optionOrders[q.id]=shuffle(q.options.map(option=>option.id));save();}
  return state.optionOrders[q.id];
}
function uncertainControl(q) {return `<label class="uncertain-control"><input type="checkbox" data-flag="${esc(q.id)}" ${state.flags[q.id] || state.ratings[q.id]==='uncertain'?'checked':''}> Mark uncertain · keep in review</label>`;}
function checkMCQ(id) {
  const q=questionMap.get(id);if(!isMCQ(q) || !q.options.some(option=>option.id===state.mcqSelections[id]))return;
  state.mcqSubmitted[id]=true;state.ratings[id]=state.mcqSelections[id]===q.correctOption?'ready':'review';
  save();const scroll=window.scrollY;render();window.scrollTo(0,scroll);document.querySelector('.question-feedback')?.focus({preventScroll:true});
}
function mcqHTML(q) {
  const order=ensureOptionOrder(q),submitted=state.mcqSubmitted[q.id]===true,selection=state.mcqSelections[q.id],correct=submitted && selection===q.correctOption;
  return `<fieldset class="mcq-options"><legend>Choose the best answer, then check it.</legend>${order.map((id,index)=>{const option=q.options.find(o=>o.id===id),chosen=selection===id;return `<label class="mcq-option ${chosen?'selected':''} ${submitted && id===q.correctOption?'correct':''} ${submitted && chosen && !correct?'incorrect':''}"><input type="radio" name="mcq-${esc(q.id)}" data-mcq-option="${esc(id)}" data-question="${esc(q.id)}" value="${esc(id)}" ${chosen?'checked':''} ${submitted?'disabled':''}><span class="option-letter">${String.fromCharCode(65+index)}</span><span class="option-text">${esc(option.text)}</span></label>`;}).join('')}</fieldset><div class="row"><button class="primary answer-check" data-check-question="${esc(q.id)}" ${submitted || !selection?'disabled':''}>${submitted?'Answer checked':'Check answer'}</button>${submitted?`<button data-retry-question="${esc(q.id)}">Try this question again</button>`:''}${uncertainControl(q)}</div>${submitted?`<section class="question-feedback ${correct?'correct':'incorrect'}" tabindex="-1" aria-label="Answer feedback"><h3>${correct?'Correct.':'Review this answer.'}</h3><p>${rich(Array.isArray(q.answer)?q.answer.join('\n'):q.answer)}</p><h3>Reasoning for every option</h3><div class="option-explanations">${order.map((id,index)=>{const option=q.options.find(o=>o.id===id);return `<div class="option-explanation ${id===q.correctOption?'correct':''}"><h4>${String.fromCharCode(65+index)}. ${esc(option.text)} ${id===q.correctOption?'<span class="tag">Correct answer</span>':''}${id===selection?'<span class="tag">Your selection</span>':''}</h4><p>${rich(option.feedback || '')}</p></div>`;}).join('')}</div></section>`:''}<details class="source-excerpt"><summary>My reasoning · optional</summary><textarea class="draft" data-draft="${esc(q.id)}" aria-label="My reasoning for this multiple-choice question" placeholder="Why does your selected answer fit?">${esc(state.drafts[q.id] || '')}</textarea></details>`;
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
  const session=state.session;
  if(!session?.ids.length)return `${scopeBanner()}${practiceVersionBar()}<h1>Choose a practice set.</h1><button data-go="test">Practice options</button>`;
  if(session.finished)return results();
  const q=questionMap.get(session.ids[session.index]);
  if(!q || questionModule(q)!==state.activeModule || questionAssessmentVersion(q)!==effectiveAssessmentVersion()){state.session=null;save();return '<h1>This practice set has changed.</h1><button data-go="test">Open current practice</button>';}
  const revealed=state.revealed[q.id];
  return `${scopeBanner()}${practiceVersionBar()}${savedSetNotice(session)}<span class="eyebrow">${esc(session.title)}</span><div class="row spread"><h1>Question ${session.index+1}<span class="muted" style="font-size:.5em"> / ${session.ids.length}</span></h1><span class="tag">${isMCQ(q)?'Multiple choice':'Written explanation'} · ${esc(q.topic || '')}</span></div><article class="card practice-card"><p class="question-prompt">${esc(q.prompt)}</p>${isMCQ(q)?mcqHTML(q):`<label class="draft-label" for="answerDraft">Your explanation · saved in this browser</label><textarea id="answerDraft" class="draft" data-draft="${esc(q.id)}" placeholder="Write your answer here…">${esc(state.drafts[q.id] || '')}</textarea>${!revealed?`<div class="row"><button class="primary" data-reveal="${esc(q.id)}">Reveal model answer & self-assess</button>${uncertainControl(q)}</div>`:answerHTML(q)+uncertainControl(q)}`}<div class="row" style="margin-top:20px">${sourceRefs(q)}</div><div class="toolbar"><button data-question-index="${session.index-1}" ${session.index===0?'disabled':''}>← Previous</button><button class="primary" data-question-index="${session.index+1}" ${session.index===session.ids.length-1?'disabled':''}>Next →</button><button class="push" data-action="finishPractice">Finish & review</button></div><p class="attempt-meta">Multiple-choice responses are checked after you submit. Written explanations use your self-assessment.</p></article><details class="card" style="max-width:950px"><summary>Question navigator</summary><div class="number-nav">${session.ids.map((id,index)=>`<button class="${index===session.index?'current':''} ${state.ratings[id]==='ready' && !needsReview(questionMap.get(id))?'done':''} ${needsReview(questionMap.get(id))?'review':''}" data-question-index="${index}" aria-label="Question ${index+1}${needsReview(questionMap.get(id))?', needs review':''}">${index+1}</button>`).join('')}</div><p class="small muted">Filled = ready · dashed border = review · solid accent border = current question</p></details>`;
}

function results() {
  const session=state.session,items=session.ids.map(id=>questionMap.get(id));
  const mcq=items.filter(isMCQ),written=items.filter(q=>!isMCQ(q));
  const checked=mcq.filter(q=>state.mcqSubmitted[q.id]),correct=checked.filter(q=>state.mcqSelections[q.id]===q.correctOption);
  const drafted=written.filter(q=>state.drafts[q.id]?.trim()).length,ready=written.filter(q=>state.ratings[q.id]==='ready').length;
  return `${scopeBanner()}${practiceVersionBar()}<span class="eyebrow">Practice results · ${esc(session.title)}</span><h1>Keep the reasoning.<br>Revisit the gaps.</h1>${mcq.length?`<p class="lead">Multiple choice · ${correct.length} of ${checked.length} checked answers correct. ${mcq.length-checked.length} unanswered or unchecked.</p>`:''}${written.length?`<p class="lead">Written explanations · ${drafted} of ${written.length} have a saved draft. ${ready} self-rated ready.</p>`:''}<p class="small muted">Written self-ratings remain separate from checked multiple-choice results.</p><div class="toolbar"><button class="primary" data-go="missed">Open this module’s review queue · ${queueQuestions().length}</button><button data-action="resumePractice">Revisit this set</button><button data-go="test">Practice options</button></div>${items.map((q,index)=>{const submitted=isMCQ(q) && state.mcqSubmitted[q.id],selectedOption=isMCQ(q)?q.options.find(o=>o.id===state.mcqSelections[q.id]):null;return `<details class="result-row"><summary>${index+1}. ${esc(q.prompt)} <span class="tag">${isMCQ(q)?submitted?(state.mcqSelections[q.id]===q.correctOption?'Correct':'Incorrect'):'Unchecked':esc(state.ratings[q.id] || 'Unrated')}${state.flags[q.id]?' · uncertain':''}</span></summary>${isMCQ(q)?`<p class="small"><strong>Your selection</strong><br>${esc(selectedOption?.text || 'No answer selected.')}</p>`:`<p class="small"><strong>Your draft</strong><br>${esc(state.drafts[q.id] || 'No draft saved.')}</p>`}${submitted || (!isMCQ(q) && state.revealed[q.id])?`<p class="small"><strong>${isMCQ(q)?'Explanation':'Model answer'}</strong><br>${rich(Array.isArray(q.answer)?q.answer.join('\n'):q.answer)}</p>`:'<p class="small muted">Answer explanation has not been revealed.</p>'}<div class="row"><button class="small-button" data-revisit-question="${index}">Revisit question</button>${sourceRefs(q)}</div></details>`;}).join('')}`;
}

function transcriptReferences() {
  const refs=[...new Map([...transcriptEditions.values()].flatMap(edition=>Array.isArray(edition.payload.references)?edition.payload.references:[]).map(ref=>[ref.file,ref])).values()];
  return refs.length?`<h2>Transcript references</h2><div class="card transcript-references"><p class="small muted">These references support the additional transcript editions. The original lecture collections remain unchanged.</p>${refs.map(ref=>`<p class="small"><a href="${esc(safeURL(ref.file))}" target="_blank" rel="noopener">${esc(ref.title || ref.file)}</a>${ref.kind?' · '+esc(ref.kind):''}</p>`).join('')}</div>`:'';
}
function practiceEvidence() {
  if(!practiceData)return '';
  const model=practiceData.model || {},refs=practiceData.references || model.references || [],evidence=Array.isArray(model.evidence)?model.evidence:[];
  const summary=typeof model==='string'?model:model.summary || model.description || model.provenance || '';
  return `<div class="card practice-evidence"><span class="eyebrow">Practice Version 2 · ${practiceData.questions.length} additional questions</span><h2>${esc(model.title || 'Exam style and source evidence')}</h2><p>${esc(summary)}</p>${evidence.length?`<ul>${evidence.map(item=>`<li>${typeof item==='string'?esc(item):`${item.file?`<a href="${esc(safeURL(item.file))}" target="_blank" rel="noopener">${esc(item.title || item.file)}</a>`:esc(item.title || '')}${item.detail?' · '+esc(item.detail):''}`}</li>`).join('')}</ul>`:''}${Array.isArray(model.limitations)?model.limitations.map(item=>`<p class="small muted">${esc(item)}</p>`).join(''):''}${Array.isArray(refs)?refs.map(ref=>`<p class="small"><a href="${esc(safeURL(ref.file))}" target="_blank" rel="noopener">${esc(ref.title || ref.file)}</a>${ref.kind?' · '+esc(ref.kind):''}</p>`).join(''):''}<p class="small muted">Version 1 retains ${D.questions.length} original course questions. Version 2 has its own Module II answers, review queue, and saved set. These are generated study questions, not a copy or a validated prediction of a future exam.</p></div>`;
}
function sources() {
  const coverage=D.coverage || {},sourceEntries=Array.isArray(coverage.sources)?coverage.sources:[];
  const model=D.assessmentModel;
  const modelText=model?(typeof model==='string'?model:model.summary || model.provenance || model.description || ''):'';
  return `<span class="eyebrow">All course sources</span><h1>Sources & coverage.</h1><p class="lead">The original documents and every supplied collection remain available here. Workspace tools and current tests stay separated by module.</p><div class="row toolbar"><button class="primary" data-action="export">Export notes & progress</button><button data-action="import">Import progress backup</button></div><p class="small muted">Backups include shared notes, read marks, written drafts, multiple-choice selections and checks, uncertainty flags, and each module’s current practice set.</p><div class="card"><h2>${esc(model?.title || 'Practice model')}</h2><p>${esc(modelText || 'Practice follows reasoning patterns in the uploaded 20-question short-answer review and the supplied lectures. Multiple-choice items add another way to test those distinctions.')}</p><p class="small muted">Question selection preserves lecture and format coverage, then uses source-based priority weights within those groups. These weights are study priorities, not validated predictions of an unseen exam. The uploaded review establishes short conceptual explanations; it does not confirm a multiple-choice exam format.</p></div>${practiceEvidence()}<div class="grid"><div class="card"><h2>${D.collections.length} collections</h2><p>${allSections.length} mapped source pages across lecture decks, reviews, and supporting material.</p></div><div class="card"><h2>${D.questions.length} practice prompts</h2><p>${formatCounts(D.questions)} with original source links.</p></div><div class="card"><h2>Meadows workspace</h2><p>Six readings on systems and feedback stay grouped within Module I.</p><button data-go="meadows">Open Meadows readings</button></div></div><h2>Available collections</h2><div class="table-scroll"><table class="source-table"><thead><tr><th>Collection</th><th>Pages</th><th>Sources</th><th>Notes</th></tr></thead><tbody>${D.collections.map(c=>`<tr><td><button class="text-button" data-collection="${esc(c.id)}">${esc(c.title)}</button><div class="file-identity">${esc(c.role || 'lecture')}${moduleForCollection(c.id)?' · '+esc(moduleMap.get(moduleForCollection(c.id)).title):''}</div></td><td>${c.sections.length}</td><td>${c.sourceFile?`<a href="${esc(safeURL(c.sourceFile))}" target="_blank" rel="noopener">Original file</a><br>`:''}${c.pdfFile?`<a href="${esc(safeURL(c.pdfFile))}" target="_blank" rel="noopener">Source PDF</a>`:''}<div class="file-identity">${esc(c.originalFilename || '')}</div></td><td>${(c.issues || []).length?issueHTML(c.issues):'See source-page details.'}</td></tr>`).join('')}</tbody></table></div>${sourceEntries.length?`<h2>Additional source inventory</h2><div class="card">${sourceEntries.map(s=>`<p class="small">${s.file?`<a href="${esc(safeURL(s.file))}" target="_blank" rel="noopener">${esc(s.originalFilename || s.original || s.title || s.id || s.file)}</a>`:esc(s.originalFilename || s.original || s.title || s.id || '')}${s.role?' · '+esc(s.role):''}${s.status?' · '+esc(s.status):''}</p>`).join('')}</div>`:''}${transcriptReferences()}${coverage.issues?.length?'<h2>Source review notes</h2>'+issueHTML(coverage.issues):''}<p class="small muted">Personal progress is stored locally in this browser. It does not sync between devices. Original visuals retain their source colors, including when the interface uses dark mode.</p>`;
}

function render() {
  nav();applyPreferences();document.body.classList.toggle('follow-slides',Boolean(FOLLOWING_SLIDE_VERSIONS[effectiveVersion()]));
  const routes={stimuli:()=>window.Ling285Stimuli.gallery(state.activeModule),review:examReviewView,codeblocks:codeBlocksView,figures:figuresView,writing:writingExamView,home,collection:collectionView,guide,core,experiments,combined,test,quizzes,missed,sources,practice,meadows};
  const resume=state.session && !state.session.finished && view!=='practice'?'<p class="small"><button class="text-button" data-go="practice">↳ Resume '+esc(currentModule().title)+' practice</button></p>':'';
  $('#content').innerHTML=resume+(routes[view] || home)();
  document.title='LING258 · Study Studio';
  if(searchQuery && $('#noteSearch'))applySearch(searchQuery);
  sizeNotes();transcriptNotice();
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
function matchingSections(kind) {
  if(kind==='lecture')return collections.get(selected).sections;
  if(kind==='core')return moduleCoreCollections().flatMap(c=>c.sections).filter(s=>s.core);
  if(kind==='meadows')return moduleReadings('module1').flatMap(c=>c.sections);
  return moduleLectures().flatMap(c=>c.sections);
}

function readerPositionKey(kind) {return kind==='lecture'?selected:state.activeModule+':'+kind;}
function rememberReaderPosition() {
  if(!reader?.kind)return;
  readerPositions.set(reader.positionKey,reader.index);
  try{sessionStorage.setItem('ling285-reader-page-positions',JSON.stringify(Object.fromEntries(readerPositions)));}catch{}
}
function captureReaderContext(kind) {
  const toolbar=$('#content [data-study-toolbar="'+kind+'"]');if(!toolbar)return '';
  const nodes=[];for(const node of $('#content').children){nodes.push(node.outerHTML);if(node===toolbar)break;}
  return nodes.join('');
}
function readerContextHTML() {
  if(!reader.contextHTML)return `<h1>${esc(reader.label)}</h1>`;
  const template=document.createElement('template');template.innerHTML=reader.contextHTML;
  const version=template.content.querySelector('[data-study-version]');if(version && version.innerHTML.trim())version.innerHTML=transcriptSelector();
  for(const button of template.content.querySelectorAll('[role=tab]'))button.setAttribute('aria-selected',String(Boolean(button.dataset.reader===reader.kind && (button.dataset.expanded==='true')===reader.expanded)));
  return template.innerHTML;
}
function openReader(ids,index=0,expanded=true,label='Visual + teaching',kind=null) {
  const items=unique(ids).map(id=>sections.get(id)).filter(Boolean);if(!items.length)return;
  pauseMedia();stopSpeech();lastReaderFocus=document.activeElement;
  const positionKey=kind?readerPositionKey(kind):null,contextHTML=kind?captureReaderContext(kind):'';
  if(kind && readerPositions.has(positionKey))index=readerPositions.get(positionKey);
  reader={items,index:Math.max(0,Math.min(items.length-1,index)),expanded,recall:false,label,returnView:view,kind,positionKey,contextHTML};
  renderReader();
}
function readerControls() {return `<div class="reader-controls">${reader.expanded || !reader.contextHTML?`${versionedSections(reader.items)?transcriptSelector():''}<button data-action="closeReader">✕ Close</button>`:''}<button data-action="readerPrevious" ${reader.index === 0?'disabled':''}>← Previous</button><select id="readerSelect" aria-label="Select source page">${reader.items.map((s,index)=>`<option value="${index}" ${index === reader.index?'selected':''}>${esc(collections.get(s.collection).number || '')} · p${s.page} · ${esc(sectionTitle(s))}</option>`).join('')}</select><button data-action="readerNext" ${reader.index === reader.items.length-1?'disabled':''}>Next →</button><button data-action="recall">${reader.recall?'Reveal transcript':'Hide transcript'}</button><button data-action="readAloud">Read aloud</button><button data-action="stopSpeech">Stop audio</button><button data-action="smaller" aria-label="Decrease teaching text size">A−</button><button data-action="larger" aria-label="Increase teaching text size">A+</button>${reader.expanded?`<span class="reader-position">${reader.index+1} / ${reader.items.length}</span>`:''}</div>`;}
function renderReader() {
  if(!reader)return;
  const s=reader.items[reader.index];
  rememberReaderPosition();document.body.classList.toggle('follow-slides',Boolean(FOLLOWING_SLIDE_VERSIONS[effectiveVersion()]));
  const html=`<div class="reader-shell">${readerControls()}${reader.expanded?'':`<p class="reader-helper">Page ${reader.index+1} / ${reader.items.length}. Arrow keys move between source pages.</p>`}<div class="reader-stage">${sectionBody(s,true,reader.recall)}</div></div>`;
  if(reader.expanded) {
    // The collection heading and view tabs remain in the page under the overlay.
    $('#content .inline-reader')?.remove();
    $('#readerDialog').innerHTML=html;
    if(!$('#readerDialog').open)$('#readerDialog').showModal();
    document.body.classList.add('reader-open');
  } else {
    if($('#readerDialog').open)$('#readerDialog').close();
    $('#readerDialog').innerHTML='';
    document.body.classList.remove('reader-open');
    $('#content').innerHTML=`${readerContextHTML()}<div class="inline-reader">${html}</div>`;
  }
  sizeNotes();transcriptNotice();(reader.expanded?$('#readerDialog #readerSelect'):$('#content #readerSelect'))?.focus({preventScroll:true});
}
function closeReader(restore=true) {
  if(!reader)return;pauseMedia();stopSpeech();rememberReaderPosition();
  if(restore && reader.expanded && reader.contextHTML){reader.expanded=false;renderReader();$('#content [data-reader][data-expanded=true]')?.focus({preventScroll:true});return;}
  reader=null;
  if($('#readerDialog').open)$('#readerDialog').close();$('#readerDialog').innerHTML='';document.body.classList.remove('reader-open');
  if(restore){render();if(lastReaderFocus?.isConnected)lastReaderFocus.focus({preventScroll:true});else $('#content').focus({preventScroll:true});}
}
function moveReader(index) {if(!reader || index<0 || index>=reader.items.length)return;pauseMedia();stopSpeech();reader.index=index;reader.recall=false;renderReader();}
function pauseMedia() {document.querySelectorAll('video,audio').forEach(media => media.pause());}
function stopSpeech() {if('speechSynthesis' in window)speechSynthesis.cancel();}
function readAloud() {if(!reader || !('speechSynthesis' in window)){announce('Read aloud is unavailable in this browser.');return;}stopSpeech();const s=reader.items[reader.index];const text=[sectionTitle(s),...teachingParagraphs(s).flatMap(x=>typeof x === 'string'?[x]:[x.text || '',...(x.children || [])])].join('. ').replace(/\*\*/g,'');const speech=new SpeechSynthesisUtterance(text);speech.rate=.94;speechSynthesis.speak(speech);}
function announce(message) {$('#saveStatus').textContent=message;}
function exportProgress() {
  const backup={course:'LING285',version:1,exportedAt:new Date().toISOString(),state};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='LING285-progress-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Progress backup downloaded.');
}
async function importProgress(file) {
  if(!file)return;
  return (async()=>{
    try {
      if(file.size>5*1024*1024)throw new Error('This file exceeds the 5 MB progress-backup limit.');
      const backup=JSON.parse(await file.text());
      if(backup.course!=='LING285' || backup.version!==1)throw new Error('Choose a LING285 progress backup exported by this studio.');
      const imported=validateState(backup.state);
      if(!own(backup.state,'transcriptVersion'))imported.transcriptVersion=state.transcriptVersion;
      if(!own(backup.state,'assessmentVersion'))imported.assessmentVersion=state.assessmentVersion;
      for(const field of ['notes','read','ready','drafts','ratings','revealed','open','flags','mcqSelections','mcqSubmitted','optionOrders'])imported[field]={...state[field],...imported[field]};
      imported.sessions={...state.sessions,...imported.sessions};imported.practiceSessions={...state.practiceSessions,...imported.practiceSessions};imported.session=imported.practiceSessions[sessionKey(imported.activeModule,effectiveAssessmentVersion(imported.activeModule,imported.assessmentVersion))] || null;
      closeReader(false);state=imported;save();render();announce('LING285 progress imported and merged with this browser.');
    } catch(error){$('#storageWarning').hidden=false;$('#storageWarning').textContent='Import failed. '+error.message+' Existing progress was preserved.';}
    $('#importFile').value='';
  })();
}

function applySearch(value) {
  searchQuery=value;const query=value.trim().replace(/\s+/g,' ').toLocaleLowerCase();let hits=0;
  document.querySelectorAll('.source-section').forEach(element=>{
    const s=sections.get(element.dataset.section);const searchable=[sectionTitle(s),s.sourceText,...teachingParagraphs(s).flatMap(x=>typeof x === 'string'?[x]:[x.text || '',...(x.children || [])]),state.notes[s.id] || ''].join(' ').replace(/\*\*/g,'').replace(/\s+/g,' ').toLocaleLowerCase();
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
  if(action==='teachingNotes'){if(reader){reader.expanded=false;closeReader();}return;}
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
  if(button.dataset.resumeAssessment){changeAssessmentVersion(button.dataset.resumeAssessment,true);return;}
  if(button.dataset.module){go('home',null,true,button.dataset.module);return;}
  if(button.dataset.go){go(button.dataset.go,null,true,button.dataset.scopeModule);return;}
  if(button.dataset.collection){go('collection',button.dataset.collection);return;}
  if(button.dataset.theme){state.theme=button.dataset.theme;applyPreferences();save();return;}
  if(button.dataset.action){handleAction(button.dataset.action);return;}
  if(button.dataset.reader){
    const kind=button.dataset.reader,expanded=button.dataset.expanded==='true';
    if(reader?.kind===kind && reader.returnView===view){pauseMedia();stopSpeech();reader.expanded=expanded;renderReader();return;}
    openReader(matchingSections(kind).map(s=>s.id),0,expanded,kind==='lecture'?collections.get(selected).title:kind==='meadows'?'Meadows · systems and feedback':currentModule().title+' · visual + teaching',kind);return;
  }
  if(button.dataset.openSection){openReader([button.dataset.openSection]);return;}
  if(button.dataset.guideReader){const g=D.guide[Number(button.dataset.guideReader)];openReader(refsFor(g).map(s=>s.id),0,true,g.title);return;}
  if(button.dataset.imageSection){const s=sections.get(button.dataset.imageSection);$('#enlargedImage').src=safeURL(s.image);$('#enlargedImage').alt='Original page '+s.page+' · '+s.title;$('#imageSource').href=pageLink(s);$('#imageDialog').showModal();return;}
  if(button.dataset.start){startPractice(button.dataset.start);return;}
  if(button.dataset.singleQuestion){startPractice('single',button.dataset.singleQuestion);return;}
  if(button.dataset.removeQueue){const q=questionMap.get(button.dataset.removeQueue);if(isMCQ(q) && state.ratings[q.id]==='review')return;delete state.ratings[q.id];delete state.flags[q.id];save();render();return;}
  if(button.dataset.checkQuestion){checkMCQ(button.dataset.checkQuestion);return;}
  if(button.dataset.retryQuestion){state.mcqSubmitted[button.dataset.retryQuestion]=false;delete state.mcqSelections[button.dataset.retryQuestion];save();const scroll=window.scrollY;render();window.scrollTo(0,scroll);return;}
  if(button.dataset.reveal){state.revealed[button.dataset.reveal]=true;save();const scroll=window.scrollY;render();window.scrollTo(0,scroll);document.querySelector('.feedback')?.scrollIntoView({block:'nearest',behavior:'smooth'});return;}
  if(button.dataset.rating){const q=questionMap.get(button.dataset.question);if(isMCQ(q))return;state.ratings[q.id]=button.dataset.rating;save();const scroll=window.scrollY;render();window.scrollTo(0,scroll);return;}
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
  if(element.hasAttribute('data-assessment-version')){changeAssessmentVersion(element.value);return;}
  if(element.hasAttribute('data-transcript-version')){changeTranscriptVersion(element.value);return;}
  if(element.dataset.read){state.read[element.dataset.read]=element.checked;document.querySelectorAll('[data-read]').forEach(box=>{if(box.dataset.read===element.dataset.read)box.checked=element.checked;});save();}
  if(element.dataset.ready){state.ready[element.dataset.ready]=element.checked;save();}
  if(element.name==='practiceMode'){state.practiceMode=element.value;save();const scroll=window.scrollY;render();window.scrollTo(0,scroll);}
  if(element.dataset.mcqOption){
    const q=questionMap.get(element.dataset.question);if(!isMCQ(q) || state.mcqSubmitted[q.id])return;
    if(q.options.some(option=>option.id===element.dataset.mcqOption)){
      state.mcqSelections[q.id]=element.dataset.mcqOption;
      document.querySelectorAll('.mcq-option').forEach(label=>label.classList.toggle('selected',label.querySelector('input').checked));
      const check=document.querySelector('[data-check-question]');if(check)check.disabled=false;save();
    }
  }
  if(element.dataset.flag){
    const id=element.dataset.flag;state.flags[id]=element.checked;
    if(!element.checked && state.ratings[id]==='uncertain')delete state.ratings[id];
    save();nav();
  }
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
    lectureCollections=D.collections.filter(c=>c.role==='lecture');
    if(!Array.isArray(D.modules) || !D.modules.length){
      const early=lectureCollections.filter(c=>parseInt(c.number,10)<11).map(c=>c.id),late=lectureCollections.filter(c=>parseInt(c.number,10)>=11).map(c=>c.id);
      const meadows=D.collections.filter(c=>/^notes-\d\d-\d\d(?:-\d)?$/.test(c.id)).map(c=>c.id);
      D.modules=[{id:'module1',title:'Module I',subtitle:'Midterm 1',lectureIds:early,supplementIds:['notes-lecture07','notes-lecture08','notes-lecture09','notes-lecture10'],meadowsIds:meadows},{id:'module2',title:'Module II',subtitle:'Midterm 2',lectureIds:late,supplementIds:[],meadowsIds:[],futureNote:'New lectures will be added to this module as you receive them.'}];
    }
    moduleMap=new Map(D.modules.map(module=>[module.id,module]));
    D.questions.forEach(q=>{
      if(!q.id || questionMap.has(q.id))throw new Error('A practice question has an invalid or duplicate ID.');
      if(isMCQ(q) && (!Array.isArray(q.options) || q.options.length!==4 || new Set(q.options.map(o=>o.id)).size!==4 || !q.options.some(o=>o.id===q.correctOption)))throw new Error('A multiple-choice question has an invalid answer map.');
      questionMap.set(q.id,q);
    });
    allSections=[...sections.values()];await Promise.all([...TRANSCRIPT_VERSIONS.slice(1).map(version=>loadConceptualTranscripts(version)),loadPracticeEdition(),loadPracticeV3(),loadExamReview(),loadCodeFigures()]);loadState();readRoute();applyPreferences();render();tick();
  } catch(error) {
    $('#saveStatus').textContent='Course could not be opened';
    $('#content').innerHTML='<span class="eyebrow">LING285 Study Studio</span><h1>The course could not load.</h1><p>'+esc(error.message)+'</p><p>Reload this page when the course data is available. A static web server is required when opening a local copy.</p><a href="./">Reload studio</a>';
    console.error(error);
  }
}
// Included inside the retained studio shell by authoring/build_modern.py.
// Every modern authored view is defined here; source files stay in the original directory.
function installModern() {
 const pack=window.LING285_MODERN;
 TRANSCRIPT_VERSIONS.splice(0,TRANSCRIPT_VERSIONS.length,'v1',...Object.keys(pack.editions));
 for(const key of Object.keys(FOLLOWING_SLIDE_VERSIONS))delete FOLLOWING_SLIDE_VERSIONS[key];
 FOLLOWING_SLIDE_VERSIONS.follow='c';
 FOLLOWING_SLIDE_VERSIONS['original-c']='original-c';
 FOLLOWING_SLIDE_VERSIONS.d='d';
 for(const id of ['original-c-v2','d-v2','notes-v7','original-c-v3','notes-v7-v2','notes-v8','notes-v8-1','notes-v9','notes-v9-1','notes-v9-2','notes-v9-3','notes-v10'])FOLLOWING_SLIDE_VERSIONS[id]=id;
 const modernEditionAvailable=id=>!['notes-v7','notes-v7-v2','notes-v8','notes-v8-1','notes-v9','notes-v9-1','notes-v9-2','notes-v9-3','notes-v10'].includes(id) || state.activeModule==='module2';
 // These original Module II clips have no audio streams (see the retained media probe).
 // Keep full source files and the existing playback controls; only visible clips auto-play.
 const loopSourceFiles=new Set([
  "assets/original/3a173c997457e2f0c60b.mp4",
  "assets/original/e7a1853082e98dd26757.mp4",
  "assets/original/57ff4733438cce3597cb.mp4",
  "assets/original/6fdaa70e0bfab83a6d83.mp4",
  "assets/original/a6ce5f4f318fd7141922.mp4",
  "assets/original/ac3e753564fa139e2612.mp4",
  "assets/original/4378fb47c97c7f4785f9.mp4",
  "assets/original/50927605857bbe7450a9.mp4",
  "assets/original/de37514880e11a8d6b49.mp4",
  "assets/original/ba7bea1a3c6655bda52d.mp4",
  "assets/original/781434531c44b6e3d6b9.mp4",
  "assets/original/4362277e503aae5dbb25.mp4",
  "assets/original/7bb6548efdc6fd9795ce.mp4",
  "assets/original/e41d5b4a73a0502f48a9.mp4",
  "assets/original/dbe01fd62c62e1105a6e.mp4",
  "assets/original/6508c5d6040ceabb87cd.mp4",
  "assets/original/59d8ba48f100587bc865.mp4",
  "assets/original/f5bca6569a1c0d635d70.mp4",
  "assets/original/88801b232cfb0afdf879.mp4",
  "assets/original/fe0e0efd4f2f4285a9c4.mp4",
  "assets/original/2e5c6ce1f26a5d35f06b.mp4",
  "assets/original/d550120a3b028e60d8b0.mp4",
  "assets/original/59b40e2a2a1391b296ce.mp4",
  "stimuli/clips/model-yearago.mp4"
].map(file=>new URL(file,document.baseURI).href));
 const loopRecords=new WeakMap(),activeLoops=new Set();
 const inPictureInPicture=video=>document.pictureInPictureElement===video || video.webkitPresentationMode==='picture-in-picture';
 const canAutoPlay=(video,record)=>state.activeModule==='module2' && video.isConnected && ((record.visible && !document.hidden) || inPictureInPicture(video)) && !record.userPaused;
 function pauseLoop(video,record){
  if(!video.paused){record.automaticPauses++;video.pause();}
 }
 function playLoop(video,record){
  if(!canAutoPlay(video,record) || record.pending)return;
  let changed=false;
  for(const source of video.querySelectorAll('source[data-src]')){
   if(!source.getAttribute('src')){source.src=source.dataset.src;changed=true;}
   // The base lazy loader and the play bar must not load the same source twice.
   delete source.dataset.src;
  }
  if(changed)video.load();
  record.pending=true;
  video.play().catch(error=>{
   // A source/layout transition can interrupt play; retry once the media is ready.
   if(error.name==='AbortError')requestAnimationFrame(()=>{
    if(video.readyState>=2)playLoop(video,record);
   });
  }).finally(()=>{record.pending=false;});
 }
 const loopWatcher=new IntersectionObserver(entries=>{
  for(const entry of entries){
   const video=entry.target,record=loopRecords.get(video);if(!record)continue;
   record.visible=entry.isIntersecting && entry.intersectionRatio>0;
   if(canAutoPlay(video,record))playLoop(video,record);
   else pauseLoop(video,record);
  }
 },{threshold:[0,.01]});
 function loopModuleVideos(){
  for(const video of activeLoops)if(!video.isConnected){
   pauseLoop(video,loopRecords.get(video));loopWatcher.unobserve(video);activeLoops.delete(video);
  }
  if(state.activeModule!=='module2')return;
  for(const video of document.querySelectorAll('#content video,#readerDialog video')){
   const source=video.querySelector('source');
   const file=source?.getAttribute('src') || source?.dataset.src || video.getAttribute('src');
   if(!file || !loopSourceFiles.has(new URL(file,document.baseURI).href))continue;
   if(!loopRecords.has(video)){
    const record={visible:false,userPaused:false,automaticPauses:0,pending:false};
    loopRecords.set(video,record);
    video.dataset.silentLoop='true';
    video.loop=true;video.muted=true;video.defaultMuted=true;video.playsInline=true;
    // The visibility observer owns starting playback, so preloading never starts a hidden clip.
    video.autoplay=false;
    video.addEventListener('pause',()=>{
     if(record.automaticPauses)record.automaticPauses--;
     else record.userPaused=true;
    });
    video.addEventListener('play',()=>{
     record.userPaused=false;
     // An explicit Play click still works when only the controls are in view.
     if(record.pending && !canAutoPlay(video,record))pauseLoop(video,record);
    });
    video.addEventListener('canplay',()=>playLoop(video,record));
    for(const event of ['enterpictureinpicture','leavepictureinpicture','webkitpresentationmodechanged'])video.addEventListener(event,()=>{
     if(canAutoPlay(video,record))playLoop(video,record);else pauseLoop(video,record);
    });
   }
   if(!activeLoops.has(video)){activeLoops.add(video);loopWatcher.observe(video);}
  }
 }
 // Reader navigation pauses are automatic, not a request to disable future playback.
 const pauseStudioMedia=pauseMedia;
 pauseMedia=function(){for(const video of activeLoops)pauseLoop(video,loopRecords.get(video));pauseStudioMedia();};
 let loopScheduled=false;
 const scheduleLoops=()=>{if(!loopScheduled){loopScheduled=true;requestAnimationFrame(()=>{loopScheduled=false;loopModuleVideos();});}};
 new MutationObserver(changes=>{
  if(changes.some(change=>!change.target.closest?.('.fit-player-controls')))scheduleLoops();
 }).observe(document.body,{childList:true,subtree:true});
 document.addEventListener('visibilitychange',()=>{
  for(const video of activeLoops){const record=loopRecords.get(video);if(canAutoPlay(video,record))playLoop(video,record);else pauseLoop(video,record);}
 });
 scheduleLoops();
 effectiveVersion=function(){return modernEditionAvailable(state.transcriptVersion)&&transcriptEditions.has(state.transcriptVersion)?state.transcriptVersion:transcriptEditions.has('v20')?'v20':[...transcriptEditions.keys()][0] || 'v1';};
 selectableTranscriptVersions=function(){return Object.keys(pack.editions).filter(modernEditionAvailable);};
 transcriptSelector=function(){return `<label class="transcript-version"><span>Teaching style</span><select data-transcript-version aria-label="Transcript version">${Object.entries(pack.editions).map(([id,label])=>`<option value="${id}" ${effectiveVersion()===id?'selected':''} ${transcriptEditions.has(id)&&modernEditionAvailable(id)?'':'disabled'}>${esc(label)}</option>`).join('')}</select></label>`;};
 loadConceptualTranscripts=async function(version){
  try{
   const response=await fetch('modern/transcripts-'+version+'.json',{cache:'no-cache'});if(!response.ok)throw Error('Teaching edition returned '+response.status);
   const payload=await response.json(),editionSections=new Map(),editionCollections=new Map();
   if(payload.id!==version)throw Error('Teaching edition identity does not match.');
   for(const c of lectureCollections){
    const revised=payload.collections[c.id];if(!revised || revised.sections.length!==c.sections.length)throw Error('Incomplete source coverage in '+c.id);
    for(let i=0;i<c.sections.length;i++){
     const s=c.sections[i],n=revised.sections[i];if(s.id!==n.id || s.page!==n.page || !Array.isArray(n.teaching))throw Error('Source identity mismatch.');
     editionSections.set(s.id,n);
    }
    editionCollections.set(c.id,{title:revised.title});
   }
   for(const [id,value] of Object.entries(payload.visualPresentation || {}))if(value.hideStaticPreview)visualPresentations.set(id,value);
   transcriptEditions.set(version,{payload,sections:editionSections,collections:editionCollections});
  }catch(error){transcriptErrors.set(version,error.message);console.warn('Modern teaching unavailable',version,error.message);}
 };
 issueHTML=function(){return '';};
 loadPracticeV3=async function(){};
 loadCodeFigures=async function(){};
 loadExamReview=async function(){};
 loadPracticeEdition=async function(){
  const current=pack.questions.filter(q=>q.moduleId==='module2');
  for(const q of pack.questions){validateQuestion(q);questionMap.set(q.id,q);if(q.moduleId==='module2')practiceQuestionIds.add(q.id);}
  for(const q of pack.writing)if(!questionMap.has(q.id)){validateQuestion(q);questionMap.set(q.id,{...q});practiceQuestionIds.add(q.id);}
  practiceData={id:'v2',label:'Modern · Conceptual practice',revision:pack.revision,questions:current};
 };
 moduleQuestions=function(id=state.activeModule){return pack.questions.filter(q=>q.moduleId===id);};
 effectiveAssessmentVersion=function(id=state.activeModule){return id==='module2'?'v2':'v1';};
 const wordingControl=()=>`<label class="modern-wording">Question wording <select data-modern-wording aria-label="Question wording">${[['college','College'],['simple','Simple'],['original','Original']].map(([id,label])=>`<option value="${id}" ${(preferences().wording || 'original')===id?'selected':''}>${label}</option>`).join('')}</select></label>`;
 const applyWording=()=>{const version=preferences().wording || 'original';for(const q of questionMap.values())if(q.wordings)q.prompt=q.wordings[version] || q.wordings.original;};
 practiceVersionSelector=wordingControl;
 practiceVersionBar=function(){return `<div class="toolbar">${wordingControl()}</div>`;};
 assessmentPolicy=function(module=currentModule()){return module.id==='module2'?{fixed:true,currentTestSize:100,lectureQuizSize:50,mcqShare:.5}:{fixed:false,currentTestSize:20,lectureQuizSize:20,mcqShare:0};};
 balancedAssessmentSample=function(pool,size,share,lectureIds){
  const targets=formatQuota(size,share),lectures=[...lectureIds];
  for(let attempt=0;attempt<100;attempt++){
   const order=shuffle(lectures),quotas=new Map(order.map(id=>[id,{mcq:Math.floor(targets.mcq/order.length),written:Math.floor(targets.written/order.length)}]));
   for(let i=0;i<targets.mcq%order.length;i++)quotas.get(order[i]).mcq++;
   for(let i=0;i<targets.written%order.length;i++)quotas.get(order[(i+targets.mcq%order.length)%order.length]).written++;
   const cells=order.flatMap(id=>['mcq','written'].map(type=>({id,type,quota:quotas.get(id)[type],pool:pool.filter(q=>q.lectureId===id && q.type===type)}))).sort((a,b)=>(a.pool.length-a.quota)-(b.pool.length-b.quota));
   const picked=[],used=new Set();let ok=true;
   for(const cell of cells){
    const available=weightedPick(cell.pool).filter(q=>!used.has(q.wordings.simple));
    if(available.length<cell.quota){ok=false;break;}
    for(const q of available.slice(0,cell.quota)){picked.push(q);used.add(q.wordings.simple);}
   }
   if(ok && picked.length===size && new Set(picked.map(q=>q.id)).size===size)return shuffle(picked);
  }
  throw Error('The complete balanced set needs more distinct source-based cases.');
 };
 const paragraphs=text=>`<p>${rich(text)}</p>`;
 const conceptHTML=key=>{
  const c=pack.concepts[key];
  return `<ul class="modern-teaching"><li>${rich(c.opening)}<ul><li>${rich(c.mechanism)}</li></ul></li><li>${rich(c.consequence)}</li></ul>`;
 };
 const refs=point=>point.pages.map(page=>allSections.find(s=>s.collection===point.collection && s.page===page)).filter(Boolean);
 const sourceButtons=items=>`<div class="row modern-source-links">${items.map(s=>`<button class="source-ref" data-open-section="${esc(s.id)}">${esc(refLabel(collections.get(s.collection)))} · p${s.page}</button>`).join('')}</div>`;
 const intro=(title,text)=>`${scopeBanner()}<span class="eyebrow">LING285 · Modern workspace</span><h1>${esc(title)}</h1><p class="lead">${esc(text)}</p>`;
 WORK.splice(1,0,['ask','What you can be asked'],['qa','Q&A'],['cards','Experiment cards'],['contrasts','Side-by-side contrasts'],['hard','Hard topics, explained']);
 const previousReadRoute=readRoute;
 readRoute=function(){previousReadRoute();const candidate=new URLSearchParams(location.search).get('view');if(candidate==='ask')view=candidate;};
 const priority=key=>pack.model.ranking.find(row=>row.concept===key);
 const evidence=key=>{
  const row=priority(key);if(!row)return '';
  return `<details class="modern-evidence"><summary>Why this is a study priority</summary><p>${row.reviewQuestions.length?'The supplied Exam 2 review directly tests this idea in question'+(row.reviewQuestions.length===1?' ':'s ')+row.reviewQuestions.join(', ')+'.':'This topic extends the supplied review coverage.'}${row.transcriptCues.length?' The transcript contains an explicit exam cue for this idea.':''}</p><p class="small">The study order combines review coverage, transcript cues and source language. It is an evidence ranking, with no validated exam probability.</p><a href="modern/model-report.json">Inspect the executed model and source evidence</a></details>`;
 };
 function askView(){
  let topics=pack.asked.filter(g=>g.moduleId===state.activeModule).slice();
  if(!topics.length)topics=pack.guides.filter(g=>g.moduleId===state.activeModule).map(g=>({title:g.title,concept:g.points[0].concept,collection:g.points[0].collection,pages:g.points[0].pages,items:[{question:g.question,answer:g.answer}]}));
  topics.sort((a,b)=>(priority(b.concept)?.score || 0)-(priority(a.concept)?.score || 0));
  return intro('What you can be asked','Practice the reasoning behind the source examples so that a changed sound, location or layer size still makes sense.')+
   `<p class="notice">The review questions are confirmed study material. The generated questions and their study order are predictions for preparation, not confirmed exam questions.</p>`+
   topics.map(g=>`<details class="modern-topic" data-modern-item open><summary>${esc(g.title)}</summary><div class="modern-topic-body">${g.items.map(item=>`<details class="modern-answer"><summary>${rich(item.question)}</summary>${paragraphs(item.answer)}</details>`).join('')}${sourceButtons(refs(g))}${evidence(g.concept)}</div></details>`).join('');
 }
 const preferences=()=>{
  if(!state.modern)state.modern={};
  return state.modern;
 };
 function cardsView(){
  const settings=preferences(),hidden=settings.cardRecall===true;
  const pool=pack.cards.filter(c=>c.moduleId===state.activeModule);
  return intro('Experiment cards','Explain what changes in the setup, what follows from it, and what the evidence supports.')+
   `<label class="readiness"><input type="checkbox" data-modern-card-recall ${hidden?'checked':''}> Predict the result before opening it</label>`+
   pool.map(c=>`<article class="modern-topic modern-experiment"><div class="modern-topic-body"><span class="tag">${esc(c.kind)}</span><h2>${esc(c.title)}</h2><div class="modern-qa-pair"><div>${paragraphs(c.explain)}${hidden?`<details class="modern-answer"><summary>Check the result and reasoning</summary>${paragraphs(c.outcome)}${paragraphs(c.interpret)}</details>`:paragraphs(c.outcome)+paragraphs(c.interpret)}${sourceButtons(refs(c))}</div>${sourcePreview(refs(c)[0])}</div></div></article>`).join('');
 }
 function sourcePreview(s){
  if(!s)return '';
  const asset=(s.assets || []).find(a=>a.type==='video');
  return `<figure>${asset?`<video controls preload="none" playsinline aria-label="Original source video"><source data-src="${esc(safeURL(asset.file))}"></video>`:`<button class="slide-button" data-image-section="${esc(s.id)}"><img src="${esc(safeURL(s.image))}" alt="Original ${esc(refLabel(collections.get(s.collection)))} page ${s.page}" loading="lazy"></button>`}<figcaption>Original ${esc(refLabel(collections.get(s.collection)))} · page ${s.page}</figcaption></figure>`;
 }
 function contrastsView(){
  const pool=pack.contrasts.filter(c=>c.moduleId===state.activeModule);
  return intro('Side-by-side contrasts','Keep the two ideas visible together, then explain the relationship that makes them easy to confuse.')+
   pool.map(c=>`<article class="modern-topic modern-contrast"><div class="modern-topic-body"><h2>${esc(c.title)}</h2><div class="modern-comparison">${[c.left,c.right].map(side=>`<section><h3>${esc(side.term)}</h3>${paragraphs(side.text)}</section>`).join('')}</div>${c.paragraphs.map(paragraphs).join('')}${sourceButtons(refs(c))}${evidence(c.concept)}</div></article>`).join('');
 }
 function hardView(){
  return intro('Hard topics, explained','Work through the relationship that makes each idea difficult, then check whether you can use the explanation in a changed case.')+
   pack.hard.filter(c=>c.moduleId===state.activeModule).map(c=>`<details class="modern-topic modern-hard" data-modern-item open><summary>${esc(c.title)}</summary><div class="modern-topic-body"><div class="modern-qa-pair"><div>${c.paragraphs.map(paragraphs).join('')}<details class="modern-answer"><summary>${rich(c.question)}</summary>${paragraphs(c.answer)}</details>${sourceButtons(refs(c))}</div>${sourcePreview(refs(c)[0])}</div></div></details>`).join('');
 }
 function reviewView(){
  if(state.activeModule!=='module2')return module2OnlyNotice('Exam 2 review guide');
  return intro('Exam 2 review guide','All 21 review prompts, with rewritten answers and explanations. Try an optional response, reveal the answer, and then apply the reasoning to a changed case.')+
   `<p><a href="sources/modern/Exam2%20Review%20(1).pdf" target="_blank" rel="noopener">Open the uploaded review PDF</a></p><p class="notice">The prompts come from the supplied review. These answers are authored study explanations, and the changed cases are generated practice.</p>`+
   pack.review.map(r=>`<article class="modern-topic modern-review" id="${esc(r.id)}"><div class="modern-topic-body"><span class="tag">Review question ${r.number}</span><h2>${rich(r.question)}</h2>${r.image?`<img class="review-image" src="${esc(safeURL(r.image))}" alt="Original figure for review question ${r.number}" loading="lazy">`:''}<details class="modern-response"><summary>Write an optional response</summary><label for="draft-${r.id}">My response</label><textarea id="draft-${r.id}" data-modern-draft="${r.id}" rows="4">${esc(state.drafts[r.id] || '')}</textarea></details><details class="modern-answer"><summary>Read the answer and explanation</summary>${paragraphs(r.answer)}${r.code?`<pre class="review-code"><code>${esc(r.code)}</code></pre>`:''}${r.teaching.map(paragraphs).join('')}</details><details class="modern-answer"><summary>${rich(r.change)}</summary>${paragraphs(r.changedAnswer)}</details>${sourceButtons(refs(r))}<label class="readiness"><input type="checkbox" data-ready="${r.id}" ${state.ready[r.id]?'checked':''}> I can answer and explain this</label></div></article>`).join('');
 }
 core=function(){
  const chosen=moduleLectures().flatMap(c=>c.sections.filter(s=>(pack.core[c.id] || []).includes(s.page)));
  return intro('Must know · core review','Use this selected set to explain the central mechanisms and distinctions before returning to supporting detail.')+
   `<p class="small muted">${chosen.length} selected source pages in ${esc(currentModule().title)}.</p>${studyToolbar('core')}`+
   chosen.map(s=>{
    const key=pack.pageConcepts[s.collection][s.page];
    return `<details class="modern-topic modern-core" data-modern-item><summary>${esc(refLabel(collections.get(s.collection)))} · p${s.page} · ${esc(sectionTitle(s))}</summary><div class="modern-topic-body"><div class="modern-qa-pair"><div>${conceptHTML(key)}${sourceButtons([s])}<label class="readiness"><input type="checkbox" data-read="${esc(s.id)}" ${state.read[s.id]?'checked':''}> Mark read</label>${noteBox(s)}</div>${sourcePreview(s)}</div>${evidence(key)}</div></details>`;
   }).join('');
 };
 experiments=function(){
  return intro('Demonstrations & connections','Use a shared relationship to connect the physical systems, acoustic measurements and learned decisions.')+
   pack.connections.filter(c=>c.moduleId===state.activeModule).map(c=>{
    const ss=c.sources.map(r=>allSections.find(s=>s.collection===r.collection && s.page===r.page)).filter(Boolean);
    return `<details class="modern-topic modern-connection" data-modern-item open><summary>${esc(c.title)}</summary><div class="modern-topic-body"><div class="modern-qa-pair"><div>${c.paragraphs.map(paragraphs).join('')}<details class="modern-answer"><summary>${rich(c.question)}</summary>${paragraphs(c.answer)}</details>${sourceButtons(ss)}</div>${sourcePreview(ss[0])}</div></div></details>`;
   }).join('');
 };
 combined=function(){
  return intro('Combined notes','Read the rewritten teaching alongside every original source page in order. Choose the teaching style that helps you explain the mechanism in your own words.')+
   studyToolbar('combined')+searchTools('Search the rewritten notes')+
   moduleLectures().map(c=>`<section class="section-group search-group"><h2>${esc(c.number)} · ${esc(collectionTitle(c))}</h2>${c.sections.map(sectionHTML).join('')}</section>`).join('');
 };
 test=function(){
  const isCurrent=state.activeModule==='module2';
  return intro('Current practice test',isCurrent?'Practice the current material with 100 distinct questions, split equally between multiple choice and written explanations.':'Practice the first-half material with the rewritten archive questions.')+
   practiceVersionBar()+`<div class="grid"><article class="card"><h2>${isCurrent?'100-question current test':'Archive practice'}</h2><p>${isCurrent?'The full set balances coverage across all eight supplied current lecture collections. Each question asks directly about a self-contained case.':'The archive set draws from its own source-based question bank.'}</p><button class="primary" data-start="mixed">Start current test</button></article><article class="card"><h2>Study-first 50</h2><p>Use a smaller balanced set drawn with the source-evidence ranking. The ranking orders study priorities rather than assigning validated exam probabilities.</p><button data-start="modern-high">Start model-ranked practice</button></article><article class="card"><h2>Five-question check</h2><p>Use a short mixed set, then keep uncertain answers for another attempt.</p><button data-start="quick">Start quick practice</button></article></div>${state.session?`<article class="card"><h2>Continue your saved set</h2><p>${esc(state.session.title)} · ${state.session.ids.length} questions</p><button data-go="practice">${state.session.finished?'Open saved results':'Resume saved practice'}</button></article>`:''}`;
 };
 const oldStartPractice=startPractice;
 startPractice=function(scope,id){
  if(state.activeModule==='module1')state.practiceMode='written';
  if(id && questionMap.has(id) && !moduleQuestions().some(q=>q.id===id)){
   const q=questionMap.get(id);state.session={ids:[id],index:0,title:'Writing question · focused practice',finished:false,edition:pack.revision,assessmentVersion:'v2',scope:'single',mode:'written',moduleId:q.moduleId};save();go('practice');return;
  }
  if(scope==='writing'){go('writing');return;}
  if(scope!=='modern-high')return oldStartPractice(scope,id);
  const pool=moduleQuestions(),items=state.activeModule==='module2'?balancedAssessmentSample(pool,50,.5,moduleLectures().map(c=>c.id)):samplePractice(pool,Math.min(20,pool.length),'written',true);
  state.session={ids:items.map(q=>q.id),index:0,title:currentModule().title+' · study-first practice',finished:false,edition:pack.revision,assessmentVersion:effectiveAssessmentVersion(),scope,mode:'mixed',moduleId:state.activeModule};
  for(const q of items)if(isMCQ(q)){state.optionOrders[q.id]=shuffle(q.options.map(o=>o.id));delete state.mcqSelections[q.id];state.mcqSubmitted[q.id]=false;}else state.revealed[q.id]=false;
  save();go('practice');
 };
 const writingPool=()=>pack.writing;
 function makeWritingSet(){
  const settings=preferences(),chosen=settings.writingLecture || 'all',used=new Set(),ids=[];
  const blueprint={lecture11:3,lecture12:4,lecture13:4,lecture14:4,lecture15:3,lecture16:3,lecture17:2,lecture18:2};
  const lectures=chosen==='all'?Object.keys(blueprint):[chosen];
  for(const lid of lectures){
   const pool=writingPool().filter(q=>q.lectureId===lid && !used.has(q.prompt));
   const ordered=weightedPick(pool.map(q=>({...q,priority:1+(priority(q.concept)?.score || 0)})));
   for(const q of ordered.slice(0,chosen==='all'?blueprint[lid]:25)){ids.push(q.id);used.add(q.prompt);}
  }
  settings.writingSet=ids;settings.writingSetFor=chosen;save();
 }
 function writingView(){
  if(state.activeModule!=='module2')return module2OnlyNotice('Writing practice');
  const settings=preferences(),chosen=settings.writingLecture || 'all',mode=settings.writingMode || 'set';
  if(!settings.writingSet?.length || settings.writingSetFor!==chosen)makeWritingSet();
  const seen=new Set(),set=new Set(settings.writingSet),pool=writingPool().filter(q=>{
   if((chosen!=='all' && q.lectureId!==chosen) || (mode!=='all' && !set.has(q.id)) || seen.has(q.prompt))return false;
   seen.add(q.prompt);return true;
  });
  if(settings.writingOrder==='priority')pool.sort((a,b)=>(priority(b.concept)?.score || 0)-(priority(a.concept)?.score || 0));
  return intro('Writing practice','Read a prompt, write an optional response, then open a complete answer and check your reasoning. These prompts use the short conceptual explanations and applications found in the exam evidence.')+
   `<div class="toolbar modern-filters"><label>View <select data-modern-writing="writingMode"><option value="set" ${mode==='set'?'selected':''}>Exam-style set of 25</option><option value="all" ${mode==='all'?'selected':''}>All writing prompts</option></select></label><label>Collection <select data-modern-writing="writingLecture"><option value="all">All current collections</option>${moduleLectures().map(c=>`<option value="${esc(c.id)}" ${chosen===c.id?'selected':''}>${esc(c.number)} · ${esc(collectionTitle(c))}</option>`).join('')}</select></label><label>Order <select data-modern-writing="writingOrder"><option value="source">Source order</option><option value="priority" ${settings.writingOrder==='priority'?'selected':''}>Study priority</option></select></label><button data-new-writing-set>Create another 25-question set</button></div><p class="small muted">${new Set(writingPool().map(q=>q.prompt)).size} distinct writing prompts available · ${pool.length} in this view. The 25-question allocation is a study blueprint, not a confirmed exam distribution.</p>`+
   pool.map((q,i)=>`<article class="modern-topic modern-writing" id="${esc(q.id)}"><div class="modern-topic-body"><span class="tag">${i+1} · ${esc(refLabel(collections.get(q.lectureId)))} · ${esc(q.kind)}</span><h2>${rich(q.prompt)}</h2>${q.image?`<img class="review-image" src="${esc(safeURL(q.image))}" loading="lazy" alt="Original review figure for this question">`:''}<details class="modern-response"><summary>Write my response</summary><label for="writing-${q.id}">My saved response</label><textarea id="writing-${q.id}" data-modern-draft="${q.id}" rows="4">${esc(state.drafts[q.id] || '')}</textarea></details><details class="modern-answer" data-writing-answer="${q.id}" ${state.revealed[q.id]?'open':''}><summary>Read a full answer</summary>${q.answer.split('\n\n').map(paragraphs).join('')}</details><div class="row writing-ratings">${[['ready','I can explain it'],['partial','Partly clear'],['review','Review again']].map(([value,label])=>`<button data-writing-rating="${value}" data-writing-question="${q.id}" aria-pressed="${state.ratings[q.id]===value}">${label}</button>`).join('')}${uncertainControl(q)}</div><div class="row">${sourceRefs(q)}</div></div></article>`).join('');
 }
 document.addEventListener('change',event=>{
  if(!event.target.hasAttribute('data-modern-writing'))return;
  preferences()[event.target.dataset.modernWriting]=event.target.value;save();render();
 });
 document.addEventListener('click',event=>{
  const fresh=event.target.closest('[data-new-writing-set]');if(fresh){makeWritingSet();render();return;}
  const rate=event.target.closest('[data-writing-rating]');if(!rate)return;
  state.ratings[rate.dataset.writingQuestion]=rate.dataset.writingRating;save();const scroll=scrollY;render();scrollTo(0,scroll);
 });
 document.addEventListener('toggle',event=>{
  const id=event.target.dataset?.writingAnswer;if(!id)return;
  state.revealed[id]=event.target.open;save();
 },true);
 document.addEventListener('change',event=>{
  if(!event.target.hasAttribute('data-modern-wording'))return;
  if(!['original','college','simple'].includes(event.target.value))return;
  preferences().wording=event.target.value;applyWording();save();const scroll=scrollY;render();scrollTo(0,scroll);
 });
 function codeView(){
  if(state.activeModule!=='module2')return intro('Code blocks','The archive retains its numerical demonstrations in the original source pages.')+`<button data-go="combined">Open archive notes</button>`;
  return intro('Code blocks','Read what the program receives, how it processes the information and what each learning operation changes.')+
   pack.code.map(c=>{
    const ss=[...refs(c),...(c.also || []).map(([collection,page])=>allSections.find(s=>s.collection===collection && s.page===page)).filter(Boolean)];
    return `<article class="modern-topic modern-code"><div class="modern-topic-body"><h2>${esc(c.title)}</h2><div class="modern-qa-pair"><div>${c.paragraphs.map(paragraphs).join('')}<details class="modern-answer"><summary>Read the native source code</summary><pre class="review-code"><code>${esc(c.code)}</code></pre></details><details class="modern-answer"><summary>${rich(c.question)}</summary>${paragraphs(c.answer)}</details>${sourceButtons(ss)}</div>${sourcePreview(ss[0])}</div></div></article>`;
   }).join('');
 }
 function modernFiguresView(){
  return intro('Figures','Explain what the original diagram or graph represents and which relationship supports its result.')+
   pack.figures.filter(f=>f.moduleId===state.activeModule).map(f=>{
    const c=pack.concepts[f.concept],ss=refs(f);
    return `<details class="modern-topic modern-figure" data-modern-item><summary>${esc(f.title)}</summary><div class="modern-topic-body"><div class="modern-qa-pair"><div>${paragraphs(c.opening)}${paragraphs(c.mechanism)}${paragraphs(f.takeaway)}${sourceButtons(ss)}</div>${sourcePreview(ss[0])}</div></div></details>`;
   }).join('');
 }
 quizzes=function(){
  const current=state.activeModule==='module2';
  return intro('Lecture quizzes',current?'Each complete quiz has 50 questions, with 25 multiple-choice questions and 25 written explanations. The wording choice carries through the quiz and its saved results.':'Use the rewritten source-based questions for each archived collection.')+
   practiceVersionBar()+(current?practiceModePicker('Optional focused-practice format'):'')+
   `<div class="grid">${moduleLectures().map(c=>{
    const pool=moduleQuestions().filter(q=>q.lectureId===c.id);
    return `<article class="card modern-quiz-card"><span class="tag">Collection ${esc(c.number)}</span><h2>${esc(collectionTitle(c))}</h2><p>${rich(pack.summaries[c.id])}</p><p class="small muted">${pool.length} questions · ${formatCounts(pool)}</p><div class="row"><button class="primary" data-start="lecture:${esc(c.id)}">Start ${current?'full 50-question quiz':'collection quiz'}</button><button data-start="focus-lecture:${esc(c.id)}">Use selected format</button></div></article>`;
   }).join('')}</div>`;
 };
 const originalCollectionView=collectionView;
 collectionView=function(){
  const c=collections.get(selected);
  if(!c || c.role!=='lecture')return originalCollectionView();
  return intro(collectionTitle(c),pack.summaries[c.id])+
   `<p class="small muted">Collection ${esc(c.number)} · ${c.sections.length} original source pages</p><div class="row"><a href="${esc(safeURL(c.sourceFile))}" target="_blank" rel="noopener">Original PowerPoint</a><a href="${esc(safeURL(c.pdfFile))}" target="_blank" rel="noopener">Source PDF</a></div>`+
   studyToolbar('lecture')+searchTools('Search this collection’s rewritten teaching')+
   c.sections.map(sectionHTML).join('');
 };
 home=function(){
  return intro('Make the mechanism clear.','Use the source visuals and rewritten explanations to understand sound, speech, learning and sequence prediction.')+
   `<div class="toolbar"><button class="primary" data-go="guide">What to know by the end</button><button data-go="qa">Open Q&A</button><button data-go="writing">Writing practice</button><button data-go="test">Current practice test</button></div><details class="modern-topic" open><summary>What is new in this workspace</summary><div class="modern-topic-body"><p>The workspace sections and teaching editions have been rewritten around the LING285 sources and exam evidence, using the modern PSYC301 organization and Version 20 writing structure.</p><p>Choose among ${Object.keys(pack.editions).length} teaching styles, use source-linked questions and comparisons, or work through writing prompts with optional saved responses. College, Simple and Original wording choices belong to the quizzes and practice tests.</p><p><a href="./">Open the original workspace</a> whenever you want the earlier versions.</p></div></details><div class="grid">${moduleLectures().map(c=>`<article class="card"><span class="tag">Collection ${esc(c.number)}</span><h2>${esc(collectionTitle(c))}</h2><p>${rich(pack.summaries[c.id])}</p><p class="small muted">${c.sections.filter(s=>state.read[s.id]).length} of ${c.sections.length} source pages marked read</p><button data-collection="${esc(c.id)}">Open collection</button></article>`).join('')}</div>`;
 };
 readAloud=function(){
  if(!reader || !('speechSynthesis' in window)){announce('Read aloud is unavailable in this browser.');return;}
  stopSpeech();const s=reader.items[reader.index];
  let text=[sectionTitle(s),...teachingParagraphs(s).flatMap(x=>typeof x==='string'?[x]:[x.text,...(x.children || [])])].join('. ').replace(/\*\*/g,'');
  for(const [pattern,replacement] of [[/\bF0\b/g,'F zero'],[/\bF1\b/g,'F one'],[/\bF2\b/g,'F two'],[/\/i\//g,'the vowel in dean'],[/\/u\//g,'the vowel in dune'],[/\/a\//g,'the open A vowel'],[/\bnn\.Sequential\b/g,'the sequential layer container'],[/\bnn\.Linear\(2,\s*3\)/g,'a linear layer receiving two values and producing three'],[/\bloss\.backward\(\)/g,'the backward loss calculation'],[/→/g,' to ']])text=text.replace(pattern,replacement);
  const speech=new SpeechSynthesisUtterance(text);speech.rate=.94;speechSynthesis.speak(speech);
 };
 queueQuestions=function(moduleId=state.activeModule){
  const pool=new Map([...pack.questions,...pack.writing].map(q=>[q.id,questionMap.get(q.id) || q]));
  return [...pool.values()].filter(q=>q.moduleId===moduleId && needsReview(q));
 };
 missed=function(){
  const pool=queueQuestions();
  return intro('Missed & uncertain','Return to a checked mistake or an idea you marked for another attempt. Written self-ratings and checked multiple-choice results remain separate.')+
   practiceVersionBar()+`<p class="small muted">${pool.length} questions need another review in ${esc(currentModule().title)}.</p>`+
   (pool.length?`<div class="toolbar"><button class="primary" data-start="missed">Practice this review queue</button></div>`+pool.map(q=>`<article class="modern-topic modern-queue"><div class="modern-topic-body"><span class="tag">${isMCQ(q)?'Multiple choice':'Written'} · ${state.flags[q.id]?'Marked uncertain':esc(state.ratings[q.id] || 'Review')}</span><h2>${rich(q.prompt)}</h2><div class="row"><button data-single-question="${q.id}">Try this question again</button>${!(isMCQ(q) && state.ratings[q.id]==='review')?`<button data-remove-queue="${q.id}">Remove from review</button>`:''}${uncertainControl(q)}</div><details class="modern-answer"><summary>Review the explanation</summary>${String(q.answer).split('\n\n').map(paragraphs).join('')}</details><div class="row">${sourceRefs(q)}</div></div></article>`).join(''):`<div class="empty"><p>No questions are waiting in this module’s queue.</p><button data-go="test">Open practice</button><button data-go="writing">Open writing practice</button></div>`);
 };
 meadows=function(){
  return intro('Meadows · systems & feedback','Connect parts, accumulation and feedback through the supplied supporting readings.')+
   pack.readings.map(([id,title,prose,question,answer])=>{const c=collections.get(id);return `<article class="modern-topic"><div class="modern-topic-body"><h2>${esc(title)}</h2>${prose.map(paragraphs).join('')}<details class="modern-answer"><summary>${rich(question)}</summary>${paragraphs(answer)}</details><p><a href="${esc(safeURL(c.sourceFile))}" target="_blank" rel="noopener">Open the original reading · ${c.sections.length} pages</a></p><button data-collection="${esc(c.id)}">Open the retained page-by-page reading</button></div></article>`;}).join('');
 };
 const supportingSources=()=>`<details class="modern-topic"><summary>Supporting notes and syllabus</summary><div class="modern-topic-body">${D.collections.filter(c=>['supplemental-notes','syllabus'].includes(c.role)).map(c=>`<p><a href="${esc(safeURL(c.sourceFile))}" target="_blank" rel="noopener">${esc(c.title)}</a> · ${c.sections.length} original pages</p>`).join('')}<p>Supporting readings remain separate from the numbered lecture collections. Original documents and existing page notes remain available.</p></div></details>`;
 sources=function(){
  const c=pack.coverage,transcript=pack.model.transcriptSource;
  return intro('Sources & coverage','Check the supplied material behind an explanation, inspect the evidence ranking, and keep a backup of your study progress.')+
   `<article class="modern-topic"><div class="modern-topic-body"><h2>The original sources and earlier editions remain available.</h2><p>${c.sourcePages} original lecture pages are retained across both modules. The current module has ${c.modulePages.module2} source pages, ${c.currentQuestions} new quiz questions and ${c.distinctWritingPrompts} distinct writing prompts.</p><p>All modern teaching choices use the same source-page identities. Personal notes and read marks remain connected to those identities, while the new question bank keeps its own answers and practice history.</p><div class="row"><a class="button" href="./">Open original workspace</a><a href="modern/coverage.json">Inspect coverage</a><a href="modern/section-review.json">Inspect the section-by-section review</a></div></div></article>`+
   `<details class="modern-topic" open><summary>Uploaded exam references</summary><div class="modern-topic-body">${pack.uploads.map(f=>`<p><a href="${esc(safeURL(f.file))}" target="_blank" rel="noopener">${esc(f.label)}</a>${f.label.includes('seagull')?' · Answer companion with unverified authorship. The primary slides and supplied key govern the explanations.':''}</p>`).join('')}<p>The review prompts are supplied material. The answers, question variants and study rankings are authored study aids. Grammar is normalized in displayed prompts while the uploaded originals remain unchanged.</p></div></details>`+
   `<details class="modern-topic" open><summary>Original lecture decks and source-page coverage</summary><div class="modern-topic-body">${lectureCollections.map(lecture=>`<article class="modern-source-entry"><h3>${esc(refLabel(lecture))} · ${esc(collectionTitle(lecture))}</h3><p>${lecture.sections.length} original pages · ${Object.keys(pack.pageConcepts[lecture.id] || {}).length} pages with rewritten teaching. Title, blank and logistical pages stay in order without invented filler.</p><div class="row"><a href="${esc(safeURL(lecture.sourceFile))}" target="_blank" rel="noopener">Original PowerPoint</a><a href="${esc(safeURL(lecture.pdfFile))}" target="_blank" rel="noopener">Source PDF</a><button data-collection="${esc(lecture.id)}">Open rewritten collection</button></div></article>`).join('')}<p>${esc(c.sourceReview)}</p><p><a href="authoring/page-inventory.json">Original page inventory</a> · <a href="authoring/teaching-coverage.json">Retained source review</a></p></div></details>`+
   `<details class="modern-topic"><summary>Class transcript evidence</summary><div class="modern-topic-body"><p><a href="${esc(transcript.url)}" target="_blank" rel="noopener">${esc(transcript.title)}</a></p><p>The document covers October 6 through November 5, including the later material represented by Lecture 18. Only short exam-relevant evidence excerpts are retained in the model record; the raw transcript is not redistributed here.</p><p>The earlier archived collections use their supplied slides, source notes and the Exam 1 evidence. A separate raw class transcript for those early meetings was not found in the inspected sources.</p></div></details>`+
   `<details class="modern-topic"><summary>How the study predictions were calculated</summary><div class="modern-topic-body">${pack.model.models.map(m=>`<h3>${esc(m.name)}</h3><p>${esc(m.method)}</p>`).join('')}<p>${esc(pack.model.limits)}</p><div class="modern-table-wrap"><table><thead><tr><th>Idea</th><th>Exam 2 review questions</th><th>Explicit transcript cue</th><th>Study order</th></tr></thead><tbody>${pack.model.ranking.map(r=>`<tr><td>${esc(r.concept.replaceAll('-',' '))}</td><td>${r.reviewQuestions.join(', ') || 'Related extension'}</td><td>${r.transcriptCues.length?'Recorded cue':'No explicit cue retained'}</td><td>${r.tier==='first'?'Study first':'Study next'}</td></tr>`).join('')}</tbody></table></div><p><a href="modern/model-report.json">Inspect executed model, cues and sensitivity results</a></p></div></details>`+
   `<details class="modern-topic"><summary>Source distinctions that affect interpretation</summary><div class="modern-topic-body"><p>The stiffness arrow on two Lecture 12 principle pages points the wrong way. The later principle page and the physical explanation support <strong>greater stiffness raising frequency</strong>, which is the relationship taught here.</p><p>The membrane animation assigns a harmonic series for the demonstration. Source periodicity explains voice harmonics, while the assigned membrane values are not treated as a universal rule for every membrane.</p><p>The displayed training curves are labeled as NumPy reference results. The printed PyTorch code, the example table sizes and the larger plotted dataset remain distinguished in the original sources.</p><p>The modern review answer about the middle mass predicts the source-supported directions. It does not infer relative frequency-shift sizes from arbitrary drawing amplitudes.</p></div></details>`+
   `<article class="modern-topic"><div class="modern-topic-body"><h2>Keep your study progress.</h2><p>The backup contains your notes, read marks, responses and practice state from this workspace. Original-workspace backups can also supply the shared lecture notes and read marks.</p><div class="row"><button data-action="export">Export modern progress</button><button data-action="import">Import progress backup</button><button data-action="print">Print this view</button></div></div></article>`;
 };
 const modernSources=sources;
 sources=function(){return modernSources()+supportingSources();};
 exportProgress=function(){
  const backup={course:'LING285',workspace:'modern',version:1,exportedAt:new Date().toISOString(),state};
  const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='LING285-modern-progress-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Modern progress backup downloaded.');
 };
 const oldImportProgress=importProgress;
 importProgress=async function(file){
  const before=state;await oldImportProgress(file);if(state===before)return;
  state.modern={...(before.modern || {}),...(state.modern || {})};
  if(!pack.editions[state.transcriptVersion])state.transcriptVersion='v20';
  state.assessmentVersion='v2';applyWording();
  for(const [id,value] of Object.entries(state.notes))if(value!==before.notes[id])dirtyNotes.add(id);
  for(const [id,value] of Object.entries(state.read))if(value!==before.read[id])dirtyRead.add(id);
  save();render();
 };
 function decoratePractice(){
  if(view!=='practice' || !state.session || state.session.finished)return;
  const q=questionMap.get(state.session.ids[state.session.index]),prompt=document.querySelector('.question-prompt');
  if(prompt)prompt.innerHTML=rich(q.prompt).replace(/\b(F0|F1|F2|mass|stiffness|normal modes?|formants?|harmonics?|sigmoid|backpropagation|learning rate|probability distribution|hidden layers?)\b/gi,'<strong>$1</strong>');
  if(q.image && prompt && !document.querySelector('.modern-question-image'))prompt.insertAdjacentHTML('afterend',`<figure class="modern-question-image"><img src="${esc(safeURL(q.image))}" alt="Original source figure supporting this question"><figcaption>Original source figure</figcaption></figure>`);
 }
 document.addEventListener('input',event=>{
  const id=event.target.dataset.modernDraft;if(!id)return;
  state.drafts[id]=event.target.value;save();
 });
 function qaView(){
  const settings=preferences(),layout=settings.qaLayout || 'slides',order=settings.qaOrder || 'slides';
  const chosen=moduleLectures().some(c=>c.id===settings.qaLecture)?settings.qaLecture:'all';
  const query=(settings.qaQuery || '').toLocaleLowerCase();
  const pool=pack.qa.filter(q=>q.moduleId===state.activeModule && q.kind===(layout==='slides'?'slides':'connections') && (chosen==='all' || q.lectureId===chosen) && (!query || [q.question,...q.answer].join(' ').toLocaleLowerCase().includes(query)));
  const rank=q=>priority(q.concept)?.score || 0;
  const ordered=pool.slice().sort(order==='priority'?(a,b)=>rank(b)-rank(a):()=>0);
  const card=q=>{
   const ss=q.sources.map(r=>allSections.find(s=>s.collection===r.collection && s.page===r.page)).filter(Boolean);
   const source=ss[0];
   return `<details class="modern-qa" data-modern-item><summary><span class="tag">${esc(refLabel(collections.get(q.lectureId)))} · ${q.sources.map(r=>'p'+r.page).join(', ')}</span><span>${rich(q.question)}</span></summary><div class="modern-qa-pair"><div>${q.answer.map(paragraphs).join('')}${sourceButtons(ss)}${evidence(q.concept)}</div>${source?`<figure><button class="slide-button" data-image-section="${esc(source.id)}"><img src="${esc(safeURL(source.image))}" loading="lazy" alt="Original ${esc(refLabel(collections.get(source.collection)))} page ${source.page}"></button><figcaption>Original source · page ${source.page}</figcaption></figure>`:''}</div></details>`;
  };
  return intro('Q&A','Study each idea with its matching original source, then connect it to related ideas. Repeated demonstrations are grouped within their collection, with every covered page linked.')+
   `<div class="toolbar modern-filters"><label>View <select data-modern-qa="qaLayout"><option value="slides" ${layout==='slides'?'selected':''}>Slide by slide</option><option value="connections" ${layout==='connections'?'selected':''}>Putting it together</option></select></label><label>Collection <select data-modern-qa="qaLecture"><option value="all">All collections</option>${moduleLectures().map(c=>`<option value="${esc(c.id)}" ${chosen===c.id?'selected':''}>${esc(c.number)} · ${esc(collectionTitle(c))}</option>`).join('')}</select></label><label>Order <select data-modern-qa="qaOrder"><option value="slides" ${order==='slides'?'selected':''}>Source order</option><option value="priority" ${order==='priority'?'selected':''}>Study priority</option></select></label><button data-modern-open="true">Show all answers</button><button data-modern-open="false">Hide all answers</button></div><label class="search-wrap">Search questions and answers<input type="search" data-modern-find value="${esc(settings.qaQuery || '')}"></label><p class="small muted">${pool.length} questions in this view.</p>`+
   (ordered.map(card).join('') || '<p class="empty">No questions match these choices.</p>');
 }
 document.addEventListener('change',event=>{
  const el=event.target;if(!el.hasAttribute('data-modern-qa'))return;
  preferences()[el.dataset.modernQa]=el.value;save();render();
 });
 document.addEventListener('change',event=>{
  if(!event.target.hasAttribute('data-modern-card-recall'))return;
  preferences().cardRecall=event.target.checked;save();render();
 });
 let findTimer;
 document.addEventListener('input',event=>{
  if(!event.target.hasAttribute('data-modern-find'))return;
  const value=event.target.value;clearTimeout(findTimer);
  findTimer=setTimeout(()=>{preferences().qaQuery=value;save();render();const el=$('[data-modern-find]');el?.focus();},250);
 });
 const oldValidate=validateState;
 const oldLoadState=loadState;
 const dirtyNotes=new Set(),dirtyRead=new Set(),legacyKey='ling285-study-studio-v1';
 function mergeSharedProgress(){
  try{
   const old=JSON.parse(localStorage.getItem(legacyKey) || '{}');
   for(const [field,check] of [['notes',v=>typeof v==='string'],['read',v=>typeof v==='boolean']])for(const [id,value] of Object.entries(old[field] || {}))if(sections.has(id) && check(value))state[field][id]=value;
  }catch{}
 }
 const beforeSave=save;
 save=function(){
  beforeSave();if(!dirtyNotes.size && !dirtyRead.size)return;
  try{
   const old=JSON.parse(localStorage.getItem(legacyKey) || '{}');old.notes=old.notes || {};old.read=old.read || {};
   for(const id of dirtyNotes)old.notes[id]=state.notes[id];
   for(const id of dirtyRead)old.read[id]=state.read[id];
   localStorage.setItem(legacyKey,JSON.stringify(old));dirtyNotes.clear();dirtyRead.clear();
  }catch{announce('Shared progress could not be updated. Export your modern workspace progress before closing this tab.');}
 };
 document.addEventListener('input',event=>{if(event.target.dataset.note)dirtyNotes.add(event.target.dataset.note);},true);
 document.addEventListener('change',event=>{if(event.target.dataset.read)dirtyRead.add(event.target.dataset.read);},true);
 window.addEventListener('storage',event=>{if(event.key===legacyKey && D)mergeSharedProgress();});
 loadState=function(){
  oldLoadState();mergeSharedProgress();if(innerWidth<=760)state.sideClosed=true;
  if(!pack.editions[state.transcriptVersion])state.transcriptVersion='v20';
  state.assessmentVersion='v2';applyWording();
  for(const s of allSections)if(pack.core[s.collection]){s.core=pack.core[s.collection].includes(s.page);s.coreReason='';}
 };
 let previousWidth=innerWidth;
 window.addEventListener('resize',()=>{if(innerWidth<=760 && previousWidth>760){state.sideClosed=true;applyPreferences();}previousWidth=innerWidth;});
 validateState=function(raw){
  const clean=oldValidate(raw);
  if(raw.modern && typeof raw.modern==='object' && !Array.isArray(raw.modern)){
   clean.modern={};for(const field of ['qaLayout','qaOrder','qaLecture','qaQuery','wording','writingMode','writingOrder','writingLecture','writingSetFor'])if(typeof raw.modern[field]==='string')clean.modern[field]=raw.modern[field].slice(0,250);
   if(Array.isArray(raw.modern.writingSet))clean.modern.writingSet=raw.modern.writingSet.filter(id=>pack.writing.some(q=>q.id===id)).slice(0,25);
   if(typeof raw.modern.cardRecall==='boolean')clean.modern.cardRecall=raw.modern.cardRecall;
  }
  for(const [id,value] of Object.entries(raw.ready || {}))if(pack.guides.some(g=>g.id===id) && typeof value==='boolean')clean.ready[id]=value;
  for(const r of pack.review){
   if(typeof raw.drafts?.[r.id]==='string' && raw.drafts[r.id].length<=100000)clean.drafts[r.id]=raw.drafts[r.id];
   if(typeof raw.ready?.[r.id]==='boolean')clean.ready[r.id]=raw.ready[r.id];
  }
  return clean;
 };
 guide=function(){
  const topics=pack.guides.filter(g=>g.moduleId===state.activeModule);
  return intro('What to know by the end','Explain each idea, distinguish it from a related idea, and use the original examples to support your reasoning.')+
   `<div class="toolbar"><button class="primary" data-go="test">Practice this module</button><button data-modern-open="true">Expand topics</button><button data-modern-open="false">Collapse topics</button><button data-action="print">Print guide</button></div>`+
   topics.map(g=>`<details class="modern-topic" data-modern-item open><summary>${esc(g.title)}</summary><div class="modern-topic-body"><label class="readiness"><input type="checkbox" data-ready="${esc(g.id)}" ${state.ready[g.id]?'checked':''}> I can explain and apply these ideas</label>${g.points.map(point=>{
    const ss=refs(point),c=collections.get(point.collection);
    return `<section class="modern-guide-point"><span class="tag">${esc(refLabel(c))} · ${point.pages.map(p=>'p'+p).join(', ')}</span>${conceptHTML(point.concept)}${sourceButtons(ss)}</section>`;
   }).join('')}<details class="modern-answer"><summary>${rich(g.question)}</summary>${paragraphs(g.answer)}</details></div></details>`).join('');
 };
 document.addEventListener('click',event=>{
  const el=event.target.closest('[data-modern-open]');if(!el)return;
  document.querySelectorAll('[data-modern-item]').forEach(item=>item.open=el.dataset.modernOpen==='true');
 });
 const originalReadRoute=readRoute;
 readRoute=function(){originalReadRoute();if(!new URLSearchParams(location.search).has('view'))view='guide';};
 const originalRender=render;
 const modernRoutes={ask:askView,qa:qaView,cards:cardsView,contrasts:contrastsView,hard:hardView,review:reviewView,codeblocks:codeView,figures:modernFiguresView,writing:writingView};
 render=function(){
  if(!modernRoutes[view]){
   const result=originalRender();
   if(['practice','test','quizzes','missed'].includes(view) && !document.querySelector('[data-modern-wording]'))$('#content').insertAdjacentHTML('afterbegin',`<div class="toolbar">${wordingControl()}</div>`);
   decoratePractice();
   return result;
  }
  nav();applyPreferences();$('#content').innerHTML=modernRoutes[view]();sizeNotes();
 };
 // Presentation only. Included inside installModern; authored content is read-only.
// Uses the same guide / aid-inline / aid-qas / qa-item structure as PSYC301.
const layoutKey='ling285-modern-module2-layout-v2';
let layoutSettings={};
try{const saved=JSON.parse(localStorage.getItem(layoutKey) || '{}');if(saved && typeof saved==='object' && !Array.isArray(saved))layoutSettings=saved;}catch{}
const inModule2Workspace=()=>state.activeModule==='module2' && view!=='collection' && view!=='meadows';
const layoutSave=()=>{try{localStorage.setItem(layoutKey,JSON.stringify(layoutSettings));}catch{}};
const layoutControl=(name,label,choices,value)=>`<label>${esc(label)} <select data-layout-field="${esc(name)}">${choices.map(([id,text])=>`<option value="${esc(id)}" ${id===value?'selected':''}>${esc(text)}</option>`).join('')}</select></label>`;
const lectureChoices=()=>[['all','All collections'],...moduleLectures().map(c=>[c.id,`${c.number} · ${collectionTitle(c)}`])];
const lookupSources=items=>items.map(r=>allSections.find(s=>s.collection===r.collection && s.page===r.page)).filter(Boolean);
const sourceGallery=items=>`<div class="aid-visual"><div class="aid-figs">${[...new Map(items.map(s=>[s.id,s])).values()].map(s=>sourcePreview(s).replace('<figure>','<figure class="aid-fig">')).join('')}</div></div>`;
const splitLayout=(text,items)=>`<div class="aid-split"><div class="aid-text">${text}</div>${sourceGallery(items)}</div>`;
const studyTier=concept=>priority(concept)?.tier==='first'?'first':'next';
const tierTag=concept=>`<span class="qa-tier" data-study-tier="${studyTier(concept)}">${studyTier(concept)==='first'?'Study first':'Study next'}</span>`;
const sourceLabel=items=>[...new Set(items.map(r=>'p'+r.page))].join(', ');
const qaDisclosure=(q,{media=true,list=false}={})=>{
 const ss=lookupSources(q.sources || []);
 const answer=(Array.isArray(q.answer)?q.answer:[q.answer]).map(paragraphs).join('')+sourceButtons(ss)+(q.concept?evidence(q.concept):'');
 return `<details class="aid-qa modern-answer ${list?'qa-item modern-qa':''}" data-layout-question="${esc(q.id)}"><summary>${list?`<span class="qa-tag">${esc(sourceLabel(q.sources))}</span>${tierTag(q.concept)}`:''}<span>${rich(q.question)}</span></summary>${media?splitLayout(answer,ss):`<div class="qa-answer">${answer}</div>`}</details>`;
};
const oldQaView=modernRoutes.qa;
modernRoutes.qa=function(){
 if(state.activeModule!=='module2')return oldQaView();
 const settings=preferences(),mode=layoutSettings.qaMode || 'both',tier=layoutSettings.qaTier || 'all';
 const chosen=moduleLectures().some(c=>c.id===settings.qaLecture)?settings.qaLecture:'all';
 const query=(settings.qaQuery || '').toLocaleLowerCase(),order=settings.qaOrder || 'slides';
 const pool=pack.qa.filter(q=>q.moduleId==='module2' && (chosen==='all' || q.lectureId===chosen) &&
  (mode==='both' || q.kind===(mode==='slides'?'slides':'connections')) && (tier==='all' || studyTier(q.concept)===tier) &&
  (!query || [q.question,...q.answer].join(' ').toLocaleLowerCase().includes(query)));
 const control=`<div class="row aid-bar modern-filters">${layoutControl('qaMode','View',[['both','Slide by slide + putting it together'],['slides','Slide by slide'],['connections','Putting it together']],mode)}<label>Collection <select data-modern-qa="qaLecture">${lectureChoices().map(([id,text])=>`<option value="${id}" ${chosen===id?'selected':''}>${esc(text)}</option>`).join('')}</select></label>${layoutControl('qaTier','Study priority',[['all','All questions'],['first','Study first'],['next','Study next']],tier)}<label>Order <select data-modern-qa="qaOrder"><option value="slides" ${order==='slides'?'selected':''}>Source order</option><option value="priority" ${order==='priority'?'selected':''}>Study priority</option></select></label>${layoutSettings.qaSpeak?'':'<button data-layout-answers="true">Show all answers</button>'}<button data-layout-answers="false">Hide all answers</button><label class="layout-speak"><input type="checkbox" data-layout-field="qaSpeak" ${layoutSettings.qaSpeak?'checked':''}> Speak first (answer out loud, then click to check)</label></div>`;
 const groups=moduleLectures().map(c=>{
  const group=pool.filter(q=>q.lectureId===c.id);if(!group.length)return '';
  const part=(kind,title)=>{
   let rows=group.filter(q=>q.kind===kind);if(!rows.length)return '';
   if(order==='priority')rows=rows.slice().sort((a,b)=>(priority(b.concept)?.score || 0)-(priority(a.concept)?.score || 0));
   return `<section class="qa-subsection" data-qa-kind="${kind}"><h3 class="qa-group">${title} <span class="qa-count">${rows.length}</span></h3>${rows.map(q=>qaDisclosure(q,{list:true})).join('')}</section>`;
  };
  return `<details class="guide module2-qa-group" data-layout-group="${c.id}" open><summary>${esc(c.number)} · ${esc(collectionTitle(c))}</summary><div class="aid-inline qa-block"><strong>What you can be asked</strong> <span class="qa-count">${group.length} questions</span>${part('slides','Slide by slide, in the order of the slides')}${part('connections','Putting it together: how the ideas relate')}</div></details>`;
 }).join('');
 return intro('Q&A','Study each idea with its matching original source, then connect it to related ideas. Repeated demonstrations are grouped within their collection, with every covered page linked.')+control+
  `<label class="search-wrap">Search questions and answers<input type="search" data-modern-find value="${esc(settings.qaQuery || '')}"></label><p class="small muted">${pool.length} questions in this view.</p>`+(groups || '<p class="empty">No questions match these choices.</p>');
};

function addIntegratedGuideQuestions(root){
 const topics=pack.guides.filter(g=>g.moduleId==='module2');
 for(const [index,topic] of topics.entries()){
  const card=root.querySelectorAll(':scope > .modern-topic')[index];if(!card)continue;
  const body=card.querySelector('.modern-topic-body'),existing=body.querySelector(':scope > .modern-answer');
  const used=new Set([topic.question]),questions=[];
  for(const point of topic.points){
   const matching=pack.qa.filter(q=>q.moduleId==='module2' && q.kind==='slides' && q.concept===point.concept);
   matching.sort((a,b)=>(b.lectureId===point.collection)-(a.lectureId===point.collection));
   for(const q of matching){if(used.has(q.question))continue;used.add(q.question);questions.push(q);}
  }
  const block=document.createElement('div');block.className='aid-inline module2-guide-questions';
  block.innerHTML=`<strong>What you can be asked</strong><div class="aid-qas">${questions.map(q=>qaDisclosure(q,{media:false})).join('')}</div>`;
  if(existing)block.querySelector('.aid-qas').prepend(existing);
  body.prepend(block);card.dataset.guideId=topic.id;
 }
}

function addGroupFilters(root,records,selector){
 const nodes=[...root.querySelectorAll(`:scope > ${selector}`)];if(!nodes.length)return;
 const normalize=text=>text.replace(/\s+/g,' ').trim();
 const byTitle=new Map(records.map(item=>[normalize(item.title),item]));
 const key='lecture-'+view,filter=layoutSettings[key] || 'all';
 const controls=document.createElement('div');controls.className='row aid-bar modern-filters module2-group-controls';
 controls.innerHTML=layoutControl(key,'Collection',lectureChoices(),filter);
 const first=nodes[0];first.before(controls);
 const grouped=new Map();
 for(const node of nodes){
  const title=node.querySelector('h2,h3,:scope > summary')?.textContent || '';
  const item=byTitle.get(normalize(title));if(!item)continue;
  node.dataset.layoutOwner=item.collection;
  if(filter!=='all' && filter!==item.collection){node.hidden=true;}
  if(!grouped.has(item.collection))grouped.set(item.collection,[]);
  grouped.get(item.collection).push(node);
 }
 for(const c of moduleLectures()){
  const group=grouped.get(c.id);if(!group?.length)continue;
  const section=document.createElement('section');section.className='module2-lecture-group';section.hidden=filter!=='all' && filter!==c.id;
  section.innerHTML=`<h2 class="aid-h">${esc(c.number)} · ${esc(collectionTitle(c))} <span class="qa-count">${group.length}</span></h2>`;
  controls.before(section);for(const node of group)section.append(node);
 }
 // Keep the bar above the grouped sections, matching the reference workspace.
 const firstGroup=root.querySelector(':scope > .module2-lecture-group');if(firstGroup)firstGroup.before(controls);
 if(filter!=='all' && !records.some(item=>item.collection===filter)){
  const empty=document.createElement('p');empty.className='empty';empty.textContent='No items match this collection.';controls.after(empty);
 }
}

function pairedCard(node,item,{appendSource=false}={}){
 const body=node.querySelector(':scope > .modern-topic-body');if(!body)return;
 const heading=body.querySelector(':scope > h2');
 node.classList.add('aid-card');
 if(heading){heading.classList.add('aid-card-title');node.prepend(heading);}
 let pair=body.querySelector(':scope > .modern-qa-pair');
 if(!pair && appendSource){
  pair=document.createElement('div');pair.className='modern-qa-pair';
  const text=document.createElement('div');while(body.firstChild)text.append(body.firstChild);pair.append(text);
  const gallery=document.createElement('div');gallery.innerHTML=sourceGallery(refs(item));pair.append(gallery.firstElementChild);body.append(pair);
 }
 if(pair){
  pair.classList.add('aid-split');pair.firstElementChild?.classList.add('aid-text');
  const visual=pair.lastElementChild;
  if(visual?.tagName==='FIGURE'){
   const wrap=document.createElement('div');wrap.innerHTML=sourceGallery(refs(item));visual.replaceWith(wrap.firstElementChild);
  }
  else visual?.classList.add('aid-visual');
 }
}

function decorateAsk(root){
 const records=pack.asked.filter(g=>g.moduleId==='module2');
 for(const node of root.querySelectorAll(':scope > .modern-topic')){
  const record=records.find(g=>g.title===node.querySelector(':scope > summary')?.textContent);if(!record)continue;
  const body=node.querySelector('.modern-topic-body'),questions=document.createElement('div');questions.className='aid-qas';
  for(const question of [...body.querySelectorAll(':scope > .modern-answer')])questions.append(question);
  const text=document.createElement('div');text.className='aid-text';text.append(questions);while(body.firstChild)text.append(body.firstChild);
  body.classList.add('aid-split');body.append(text);body.insertAdjacentHTML('beforeend',sourceGallery(refs(record)));
 }
 addGroupFilters(root,records,'.modern-topic');
}

function groupCore(root){
 const nodes=[...root.querySelectorAll(':scope > .modern-core')];
 for(const c of moduleLectures()){
  const pages=nodes.filter(node=>node.querySelector('[data-read]')?.dataset.read.startsWith(c.id+'-'));if(!pages.length)continue;
  const group=document.createElement('details');group.className='guide module2-core-group';group.open=true;
  group.innerHTML=`<summary>${esc(c.number)} · ${esc(collectionTitle(c))}</summary><div class="module2-group-body"></div>`;
  pages[0].before(group);for(const node of pages)group.lastElementChild.append(node);
 }
 const search=document.createElement('label');search.className='search-wrap';
 search.innerHTML=`Search core explanations<input type="search" data-layout-core-find value="${esc(layoutSettings.coreQuery || '')}">`;
 root.querySelector('.module2-core-group')?.before(search);filterCore(root,layoutSettings.coreQuery || '');
}

function filterCore(root,query){
 const text=query.toLocaleLowerCase();
 for(const node of root.querySelectorAll('.modern-core'))node.hidden=!!text && !node.textContent.toLocaleLowerCase().includes(text);
 for(const group of root.querySelectorAll('.module2-core-group'))group.hidden=![...group.querySelectorAll('.modern-core')].some(node=>!node.hidden);
}

function decorateWriting(root){
 for(const card of root.querySelectorAll('.modern-writing')){
  const body=card.querySelector('.modern-topic-body'),heading=body.querySelector('h2'),answer=body.querySelector('[data-writing-answer]');
  if(!heading || !answer)continue;
  const summary=answer.querySelector('summary'),action=document.createElement('span');action.className='module2-answer-action';action.textContent=summary.textContent;
  summary.replaceChildren();const prompt=document.createElement('span');prompt.className='module2-writing-prompt';while(heading.firstChild)prompt.append(heading.firstChild);
  summary.append(prompt,action);heading.remove();answer.classList.add('qa-item');body.querySelector('.tag').after(answer);
 }
}

function decorateAssessmentOverview(root){
 const grid=root.querySelector(':scope > .grid');if(!grid)return;
 const [full,priority,quick]=[...grid.children];if(!full || !priority || !quick)return;
 grid.classList.add('module2-assessment-path');
 const check=document.createElement('section');check.className='module2-quick-check';
 while(quick.firstChild)check.append(quick.firstChild);quick.remove();full.append(check);
 grid.prepend(priority);
 // The reference test overview also exposes the same lecture tiles as Quizzes.
 // Reuse those existing descriptions and buttons without authoring new content.
 const template=document.createElement('template');template.innerHTML=quizzes();
 const lectures=template.content.querySelector('.grid');
 if(lectures){
  lectures.classList.add('module2-lecture-grid');const title=document.createElement('h2');title.className='aid-h';title.textContent='Lecture quizzes';
  root.append(title,lectures);
 }
}

function decorateSources(root){
 const entries=[...root.querySelectorAll('.modern-source-entry')];if(!entries.length)return;
 const groups=new Map();
 for(const id of ['module2','module1']){
  const module=moduleMap.get(id),group=document.createElement('details');group.className='guide module2-source-group';group.open=id==='module2';
  group.innerHTML=`<summary>${esc(module.title)} · ${esc(module.subtitle)}</summary><div class="module2-group-body"></div>`;
  entries[0].before(group);groups.set(id,group.lastElementChild);
 }
 for(const entry of entries){
  const title=entry.querySelector('h3').textContent;
  const collection=lectureCollections.find(c=>title.startsWith(refLabel(c)+' ·'));
  entry.classList.add('aid-card');if(collection)groups.get(collection.moduleId)?.append(entry);
 }
}

function decorateModule2(root){
 // Shared structure classes activate the same presentation rules as PSYC301.
 root.querySelectorAll('.modern-topic').forEach(node=>{if(node.tagName==='DETAILS')node.classList.add('guide');});
 if(view==='guide')addIntegratedGuideQuestions(root);
 if(view==='ask')decorateAsk(root);
 if(['cards','contrasts','hard','figures','codeblocks'].includes(view)){
  const records=({cards:pack.cards,contrasts:pack.contrasts,hard:pack.hard,figures:pack.figures,codeblocks:pack.code})[view].filter(item=>!item.moduleId || item.moduleId==='module2');
  const nodes=[...root.querySelectorAll(':scope > .modern-topic')];
  for(const [index,node] of nodes.entries())pairedCard(node,records[index],{appendSource:view==='contrasts'});
  addGroupFilters(root,records,'.modern-topic');
 }
 if(view==='experiments'){
  const records=pack.connections.filter(item=>item.moduleId==='module2'),all=[];
  for(const [index,pair] of [...root.querySelectorAll('.modern-qa-pair')].entries()){
   pair.classList.add('aid-split');const ss=lookupSources(records[index].sources);all.push(...ss);
   const visual=pair.querySelector(':scope > figure');
   if(visual){const holder=document.createElement('div');holder.innerHTML=sourceGallery(ss);visual.replaceWith(holder.firstElementChild);}
   pair.firstElementChild.insertAdjacentHTML('afterbegin',`<button data-layout-reader="${ss.map(s=>s.id).join(',')}">Expand visual + teaching</button>`);
  }
  const bar=document.createElement('div');bar.className='row module2-expand-bar';bar.innerHTML=`<button class="primary" data-layout-reader="${[...new Set(all.map(s=>s.id))].join(',')}">Expand visual + teaching · all demonstrations</button>`;
  root.querySelector('.modern-connection')?.before(bar);
 }
 if(view==='core'){groupCore(root);root.querySelectorAll('.modern-qa-pair').forEach(pair=>pair.classList.add('aid-split'));}
 if(view==='combined')for(const section of [...root.querySelectorAll(':scope > .section-group')]){
  const heading=section.querySelector(':scope > h2'),group=document.createElement('details');group.className='guide module2-combined-group search-group';group.open=true;
  const title=document.createElement('summary');title.textContent=heading.textContent;heading.remove();section.before(group);group.append(title);while(section.firstChild)group.append(section.firstChild);section.remove();
 }
 if(view==='review')for(const card of root.querySelectorAll('.modern-review')){
  card.classList.add('aid-card');const body=card.querySelector('.modern-topic-body'),heading=body.querySelector(':scope > h2');if(heading){heading.classList.add('aid-card-title');card.prepend(heading);}
 }
 if(view==='writing')decorateWriting(root);
 if(view==='test')decorateAssessmentOverview(root);
 if(view==='quizzes')root.querySelector(':scope > .grid')?.classList.add('module2-lecture-grid');
 if(view==='sources')decorateSources(root);
 if(view==='stimuli')for(const card of root.querySelectorAll('.stimulus-card')){
  card.classList.add('aid-card');card.querySelector('h3')?.classList.add('aid-card-title');
 }
 if(view==='missed')for(const card of root.querySelectorAll('.modern-queue')){
  const body=card.querySelector('.modern-topic-body'),heading=body.querySelector('h2'),group=document.createElement('details');group.className='guide modern-queue';
  group.innerHTML=`<summary>${heading.innerHTML}</summary>`;heading.remove();card.before(group);group.append(body);card.remove();
 }
 root.querySelectorAll('.modern-answer').forEach(node=>node.classList.add('aid-qa'));
 root.querySelectorAll('.modern-comparison').forEach(node=>node.classList.add('aid-pair'));
 root.querySelectorAll('.modern-comparison > section').forEach(node=>node.classList.add('aid-side'));
 root.querySelectorAll('.modern-filters,.modern-wording').forEach(node=>node.classList.add('aid-bar'));
}

const renderBeforeLayout=render;
render=function(){
 const result=renderBeforeLayout(),root=$('#content'),active=inModule2Workspace();
 root.classList.toggle('module2-workspace',active);root.classList.toggle('workspace-modern',active);
 if(active){
  root.dataset.workspaceView=view;
  root.dataset.workspacePattern=['qa','quizzes','test','practice','writing','missed'].includes(view)?'list':'path';
  document.body.dataset.workspaceScope='module2';decorateModule2(root);sizeNotes();
 }else{delete root.dataset.workspacePattern;delete root.dataset.workspaceView;delete document.body.dataset.workspaceScope;}
 return result;
};
document.addEventListener('change',event=>{
 const el=event.target;if(!el.hasAttribute('data-layout-field') || !inModule2Workspace())return;
 const field=el.dataset.layoutField;
 if(!['qaMode','qaTier','qaSpeak',...['ask','cards','contrasts','hard','figures','codeblocks'].map(v=>'lecture-'+v)].includes(field))return;
 layoutSettings[field]=el.type==='checkbox'?el.checked:el.value;layoutSave();render();
});
document.addEventListener('input',event=>{
 if(!event.target.hasAttribute('data-layout-core-find'))return;
 layoutSettings.coreQuery=event.target.value.slice(0,500);layoutSave();filterCore($('#content'),layoutSettings.coreQuery);
});
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-action]');if(!button || !inModule2Workspace())return;
 const action=button.dataset.action;if(!['expandSections','collapseSections'].includes(action))return;
 if(view==='core')document.querySelectorAll('#content .modern-core:not([hidden])').forEach(node=>node.open=action==='expandSections');
 if(action==='expandSections')document.querySelectorAll('#content .module2-core-group,#content .module2-combined-group').forEach(node=>node.open=true);
},true);
document.addEventListener('click',event=>{
 const readerButton=event.target.closest('[data-layout-reader]');
 if(readerButton){openReader(readerButton.dataset.layoutReader.split(','),0,true,'Demonstrations & connections');return;}
 const button=event.target.closest('[data-layout-answers]');if(!button)return;
 document.querySelectorAll('#content .qa-item').forEach(item=>item.open=button.dataset.layoutAnswers==='true');
});

}

installModern();
init();
})();
