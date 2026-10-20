'use strict';
(() => {
const KEY = 'ling285-study-studio-v1';
const VERSIONED_COLLECTIONS=new Set(['lecture11','lecture12','lecture13','lecture14']);
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => {
  const url = String(value || '');
  return /^(?:https?:\/\/|(?:\.\.?\/)?[a-zA-Z0-9_/-])/.test(url) && !/[\u0000-\u001f]/.test(url) ? url : '';
};
const rich = value => esc(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const unique = values => [...new Set(values)];
const WORK = [ ['guide','What to know by the end'], ['core','Must know · core review'], ['experiments','Demonstrations & connections'], ['combined','Combined notes'], ['test','Current practice test'], ['quizzes','Lecture quizzes'], ['missed','Missed & uncertain'], ['sources','Sources & coverage'] ];
const defaults = () => ({notes:{},read:{},ready:{},drafts:{},ratings:{},revealed:{},open:{},theme:'light',size:18,sideClosed:innerWidth <= 760,session:null,sessions:{},practiceSessions:{},activeModule:'module2',practiceMode:'mixed',assessmentVersion:'v2',mcqSelections:{},mcqSubmitted:{},optionOrders:{},flags:{},transcriptVersion:'v4'});
let state = defaults(), D, collections, sections, questionMap, lectureCollections, allSections, moduleMap, practiceData=null,practiceLoadError='';
const transcriptEditions=new Map(),transcriptErrors=new Map(),visualPresentations=new Map(),practiceQuestionIds=new Set();
let storageAvailable = true, reader = null, lastReaderFocus = null, view = 'home', selected = '', saveTimeout, searchQuery = '';
let timer = {duration:25 * 60,remaining:25 * 60,end:null,interval:null,mode:'Study'};
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
function effectiveAssessmentVersion(moduleId=state.activeModule,preference=state.assessmentVersion) {return moduleId==='module2' && preference==='v2' && practiceData?'v2':'v1';}
function questionAssessmentVersion(q) {return practiceQuestionIds.has(q?.id)?'v2':'v1';}
function pendingPracticeId(id) {return !!practiceLoadError && typeof id==='string' && /^v2-[a-z0-9-]{1,120}$/.test(id);}
function sessionKey(moduleId,version=effectiveAssessmentVersion(moduleId)) {return moduleId+':'+version;}
function moduleQuestions(id=state.activeModule) {return (effectiveAssessmentVersion(id)==='v2'?practiceData.questions:D.questions).filter(q=>questionModule(q)===id);}
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
  if(['v1','v2','v3','v4'].includes(raw.transcriptVersion))clean.transcriptVersion=raw.transcriptVersion;
  if(['v1','v2'].includes(raw.assessmentVersion))clean.assessmentVersion=raw.assessmentVersion;
  // Partition older module sessions by their original question IDs. Neither a
  // transcript choice nor a new practice edition can rebind a previous answer.
  for(const module of D.modules)for(const version of module.id==='module2'?['v1','v2']:['v1']){
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

function effectiveVersion() {return ['v4','v3','v2'].find(version=>Number(version.slice(1))<=Number(state.transcriptVersion.slice(1)) && transcriptEditions.has(version)) || 'v1';}
function currentTranscript() {return transcriptEditions.get(effectiveVersion());}
function sectionTitle(section) {return currentTranscript()?.sections.get(section.id)?.title || section.title;}
function teachingParagraphs(section) {return currentTranscript()?.sections.get(section.id)?.teaching ?? (section.teaching || []);}
function collectionTitle(c) {
  const title=currentTranscript()?.collections.get(c.id)?.title || c.title;
  return c.role==='lecture'?title.replace(/^(?:Lectures?\s+)?\d+(?:[+–-]\d+)?\s*[·:.-]\s*/i,''):title;
}
function versionedSections(items) {return items.some(section=>VERSIONED_COLLECTIONS.has(section.collection));}
function transcriptSelector() {
  return `<label class="transcript-version"><span>Transcript</span><select data-transcript-version aria-label="Transcript version">${[['v1','Version 1 · Original'],['v2','Version 2 · Conceptual'],['v3','Version 3 · Clear explanations'],['v4','Version 4 · Teaching notes']].map(([id,label])=>`<option value="${id}" ${effectiveVersion()===id?'selected':''} ${id!=='v1' && !transcriptEditions.has(id)?'disabled':''}>${esc(transcriptEditions.get(id)?.payload.label || label)}</option>`).join('')}</select>${state.transcriptVersion!==effectiveVersion()?`<small>${esc(state.transcriptVersion.toUpperCase())} unavailable · ${esc(effectiveVersion().toUpperCase())} shown</small>`:''}</label>`;
}
function transcriptNotice() {
  const active=reader?versionedSections(reader.items):view==='collection'?VERSIONED_COLLECTIONS.has(selected):['combined','core'].includes(view) && state.activeModule==='module2';
  const element=$('#transcriptNotice');if(!element)return;
  const error=transcriptErrors.get(state.transcriptVersion);
  element.hidden=!(active && error);
  element.textContent=element.hidden?'':`Transcript Version ${state.transcriptVersion.slice(1)} could not be loaded. ${effectiveVersion()==='v1'?'The original Version 1 teaching remains available.':'Version '+effectiveVersion().slice(1)+' teaching is shown.'} ${error}`;
}
function changeTranscriptVersion(value) {
  if(!['v1','v2','v3','v4'].includes(value) || (value!=='v1' && !transcriptEditions.has(value)))return;
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
    const response=await fetch('transcripts-'+version+'.json',{cache:'no-cache'});if(!response.ok)throw new Error('Transcript file returned '+response.status+'.');
    const payload=await response.json();if(payload.id!==version || !payload.collections || typeof payload.collections!=='object')throw new Error('The transcript file has an invalid edition.');
    const editionSections=new Map(),editionCollections=new Map();
    for(const collection of affected){
      const revised=payload.collections[collection.id];if(!revised || !Array.isArray(revised.sections))throw new Error('Missing transcript collection '+collection.id+'.');
      const overrides=new Map();
      for(const item of revised.sections){
        const original=sections.get(item.id);
        if(!original || original.collection!==collection.id || item.page!==original.page || overrides.has(item.id) || typeof item.title!=='string' || !Array.isArray(item.teaching) || !item.teaching.every(paragraph=>typeof paragraph==='string'))throw new Error('Invalid transcript source mapping in '+collection.id+'.');
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
function practiceVersionSelector() {
  if(state.activeModule!=='module2')return '';
  return `<label class="practice-version"><span>Practice version</span><select data-assessment-version aria-label="Practice version"><option value="v1" ${effectiveAssessmentVersion()==='v1'?'selected':''}>Version 1 · Original practice</option><option value="v2" ${effectiveAssessmentVersion()==='v2'?'selected':''} ${practiceData?'':'disabled'}>${esc(practiceData?.label || 'Version 2 · Exam style')}</option></select></label>`;
}
function practiceVersionBar() {
  if(state.activeModule!=='module2')return '';
  const other=effectiveAssessmentVersion()==='v2'?'v1':'v2',saved=state.practiceSessions[sessionKey('module2',other)];
  return `<div class="toolbar practice-edition-toolbar">${practiceVersionSelector()}${saved && (other==='v1' || practiceData)?`<button class="small-button" data-resume-assessment="${other}">Open Version ${other.slice(1)} saved ${saved.finished?'results':'practice'} · ${saved.ids.length} questions</button>`:''}</div>${state.assessmentVersion==='v2' && !practiceData?`<p class="notice practice-version-status" role="status">Practice Version 2 could not be loaded. The original Version 1 questions remain available. ${esc(practiceLoadError)}</p>`:''}`;
}
function changeAssessmentVersion(version,resume=false) {
  if(!['v1','v2'].includes(version) || (version==='v2' && !practiceData) || state.activeModule!=='module2')return;
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
  $('#workNav').innerHTML=WORK.map(([id,title])=>`<button data-go="${id}" class="${view===id?'active':''}" ${view===id?'aria-current="page"':''}>${esc(title)}${id==='missed'?' · '+queue:''}</button>`).join('');
  const collectionButton=c=>`<button data-collection="${esc(c.id)}" class="${view==='collection' && selected===c.id?'active':''}" ${view==='collection' && selected===c.id?'aria-current="page"':''}><span class="nav-number">${esc(c.number)}</span><span>${esc(collectionTitle(c))}</span></button>`;
  $('#collectionNav').innerHTML=moduleLectures().map(collectionButton).join('');
  $('#archiveWorkNav').innerHTML=WORK.map(([id,title])=>`<button data-go="${id}" data-scope-module="module1" class="${state.activeModule==='module1' && view===id?'active':''}">${esc(title)}${id==='missed'?' · '+queueQuestions('module1').length:''}</button>`).join('');
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
  return `<figure class="source-figure ${videoOnly?'video-only-source':''}">${videoOnly?mediaHTML(s):preview}<figcaption>Original source · page ${s.page}<br><a href="${esc(pageLink(s))}" target="_blank" rel="noopener">${esc(c.originalFilename || c.title)}</a></figcaption>${videoOnly?'':mediaHTML(s)}</figure>`;
}
function noteBox(s,readerMode=false) {const noteId=(readerMode?'reader-note-':'note-')+s.id;return `<div class="notes-box"><label for="${esc(noteId)}">My notes · shared across study views</label><textarea id="${esc(noteId)}" rows="1" data-note="${esc(s.id)}" placeholder="Explain it in your own words, or leave a question…">${esc(state.notes[s.id] || '')}</textarea></div>`;}
function sourceText(s) {return `<details class="source-excerpt"><summary>Source text & speaker notes</summary><h4>Extracted source text</h4><pre>${esc(s.sourceText || 'No machine-readable text was extracted from this page. Refer to the original visual and source assets.')}</pre>${s.speakerNotes ? '<h4>Original speaker notes</h4><pre>'+esc(Array.isArray(s.speakerNotes)?s.speakerNotes.join('\n'):s.speakerNotes)+'</pre>':''}</details>`;}
function sectionBody(s,readerMode=false,recall=false) {
  return `<div class="section-body"><div class="section-pair"><div><div class="teaching-heading">${readerMode?`<span class="reader-label">${esc(collectionTitle(collections.get(s.collection)))} · page ${s.page}</span><h2>${esc(sectionTitle(s))} ${badge(s)}</h2>`:''}</div>${recall?'<div class="recall-cover">Explain the idea from the original visual. What changes, why does it change, and what does that cause?<p><button data-action="recall">Reveal teaching notes</button></p></div>':teaching(s)}${issueHTML(s.issues)}${s.core && s.coreReason?'<p class="small muted" style="margin-top:20px"><strong>Core priority</strong> · '+esc(s.coreReason)+'</p>':''}<div class="section-tools row"><label><input type="checkbox" data-read="${esc(s.id)}" ${state.read[s.id]?'checked':''}> Mark read</label><button class="small-button" data-open-section="${esc(s.id)}">Expand visual + teaching</button></div>${noteBox(s,readerMode)}${sourceText(s)}</div>${visual(s,readerMode)}</div></div>`;
}
function sectionHTML(s,index=0) {return `<details class="source-section ${s.core?'core-section':''}" data-section="${esc(s.id)}" ${own(state.open,s.id) ? state.open[s.id]?'open':'' : index === 0?'open':''}><summary><span class="page-index">${String(s.page).padStart(2,'0')}</span><span class="section-title">${esc(sectionTitle(s))}</span>${badge(s)}</summary>${sectionBody(s)}</details>`;}
function searchTools(label='Search teaching notes') {return `<label class="search-wrap"><span>${esc(label)}</span><input type="search" id="noteSearch" class="search" value="${esc(searchQuery)}" placeholder="Find a concept, source example, or explanation…"></label><p class="small muted" id="searchCount" aria-live="polite"></p>`;}
function studyToolbar(kind) {return `<div class="toolbar">${versionedSections(matchingSections(kind))?transcriptSelector():''}<button class="primary" data-reader="${kind}" data-expanded="false">Visual + teaching</button><button data-reader="${kind}" data-expanded="true">Expand visual + teaching</button><button data-action="smaller" aria-label="Decrease teaching text size">A−</button><button data-action="larger" aria-label="Increase teaching text size">A+</button><button data-action="expandSections">Expand sections</button><button data-action="collapseSections">Collapse sections</button><button class="push" data-action="print">Print notes</button></div>`;}
function home() {
  const m=currentModule(),lectures=moduleLectures(),pages=lectures.flatMap(c=>c.sections),read=pages.filter(s=>state.read[s.id]).length;
  const other=D.modules.find(module=>module.id!==m.id),otherLectures=moduleLectures(other?.id),pool=moduleQuestions();
  return `<section class="module-hero"><span class="tag">${esc(m.title.toUpperCase())} · ${esc((m.subtitle || '').toUpperCase())}</span><h1>${m.id==='module2'?'A new module.<br>Follow sound into speech.':'Module I.<br>Your first-half archive.'}</h1><p class="lead">${esc(m.description || m.lectureRange || '')} ${m.id==='module2'?'Follow the cause and effect in speech production, then test the ideas in both formats.':'Teaching, core review, and module practice stay together. Your notes and progress remain attached to their original pages.'}</p><div class="row"><button class="primary" data-go="combined">Open ${esc(m.title)} notes</button><button data-go="test">Current practice test</button><button data-go="guide">Study guide</button></div></section><div class="grid module-grid"><article class="card module-card active"><span class="eyebrow">${m.id==='module2'?'Current focus':'Archived focus'}</span><h2>${esc(m.title)} · ${esc(m.subtitle || '')}</h2><p>${lectures.length} numbered lecture collections · ${pages.length} original source pages.</p><p class="small muted">${read} of ${pages.length} lecture pages marked read</p><div class="progress" aria-label="${read} of ${pages.length} lecture pages marked read"><span style="width:${pages.length?read/pages.length*100:0}%"></span></div><div class="row"><button data-go="combined">Open teaching notes</button><button data-go="core">Must know · core review</button></div></article>${other?`<article class="card module-card"><span class="eyebrow">${other.id==='module1'?'Completed first-half material':'Current second-half material'}</span><h2>${esc(other.title)} · ${esc(other.subtitle || '')}${other.id==='module1'?' archive':''}</h2><p>${esc(other.description || other.lectureRange || '')} Its guide, core review, and practice stay separate from this workspace.</p><p class="small muted">${otherLectures.length} lecture collections · saved study progress preserved</p><button data-module="${esc(other.id)}">Open ${esc(other.title)}${other.id==='module1'?' archive':''}</button></article>`:''}</div><div class="card practice-summary"><div><span class="eyebrow">Practice for ${esc(m.title)}</span><h2>Multiple choice. Written explanations. Or both.</h2><p>${bankSummary(pool)}.</p><p>${primaryAssessmentSummary()}</p></div><div class="row"><button class="primary" data-go="test">Open current practice</button><button data-go="quizzes">Lecture quizzes</button><button data-go="missed">Missed & uncertain · ${queueQuestions().length}</button></div></div><section class="current-lecture-list"><h2>${esc(m.title)} · individual collections</h2><div class="row">${lectures.map(c=>`<button data-collection="${esc(c.id)}"><span class="nav-number">${esc(c.number)}</span> ${esc(collectionTitle(c))}</button>`).join('')}</div></section>${m.futureNote?'<div class="notice">'+esc(m.futureNote)+'</div>':''}<p class="small muted">The six Meadows readings have their own Module I workspace. <button class="text-button small-button" data-go="meadows">Open Meadows</button> · <button class="text-button small-button" data-go="sources">Sources & coverage</button></p>`;
}

function assessmentPolicy(module=currentModule()) {
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
  return `${moduleForCollection(c.id)?scopeBanner():'<span class="tag">Supporting course source</span>'}<span class="eyebrow">${esc(collectionLabel(c))}</span><h1>${esc(collectionTitle(c))}</h1><p class="small muted">${c.sections.length} source pages · ${esc(c.originalFilename || '')}</p>${issueHTML(c.issues)}${c.role==='lecture' && moduleForCollection(c.id)==='module2'?practiceVersionBar():''}<div class="row"><a class="small" href="${esc(safeURL(c.sourceFile || c.pdfFile))}" target="_blank" rel="noopener">Open original source</a>${c.pdfFile && c.sourceFile!==c.pdfFile?`<a class="small" href="${esc(safeURL(c.pdfFile))}" target="_blank" rel="noopener">Open PDF</a>`:''}${lecturePracticeButtons(c)}${c.role!=='lecture'?'<button class="small-button" data-go="sources">All sources & coverage</button>':''}</div>${studyToolbar('lecture')}${searchTools()}<div class="section-list">${c.sections.map(sectionHTML).join('')}</div>`;
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
function startPractice(scope,exactId) {
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
  nav();applyPreferences();
  const routes={home,collection:collectionView,guide,core,experiments,combined,test,quizzes,missed,sources,practice,meadows};
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

function openReader(ids,index=0,expanded=true,label='Visual + teaching') {
  const items=unique(ids).map(id=>sections.get(id)).filter(Boolean);if(!items.length)return;
  pauseMedia();stopSpeech();lastReaderFocus=document.activeElement;
  reader={items,index:Math.max(0,Math.min(items.length-1,index)),expanded,recall:false,label,returnView:view};
  renderReader();
}
function readerControls() {return `<div class="reader-controls"><button data-action="closeReader">✕ Close</button>${versionedSections(reader.items)?transcriptSelector():''}<button data-action="readerPrevious" ${reader.index === 0?'disabled':''}>← Previous</button><select id="readerSelect" aria-label="Select source page">${reader.items.map((s,index)=>`<option value="${index}" ${index === reader.index?'selected':''}>${esc(collections.get(s.collection).number || '')} · p${s.page} · ${esc(sectionTitle(s))}</option>`).join('')}</select><button data-action="readerNext" ${reader.index === reader.items.length-1?'disabled':''}>Next →</button>${reader.expanded?'': '<button data-action="expandReader">Expand</button>'}<button data-action="recall">${reader.recall?'Show teaching':'Try recall'}</button><button data-action="readAloud">Read aloud</button><button data-action="stopSpeech">Stop</button><button data-action="smaller" aria-label="Decrease teaching text size">A−</button><button data-action="larger" aria-label="Increase teaching text size">A+</button><span class="reader-position">${reader.index+1} / ${reader.items.length}</span></div>`;}
function renderReader() {
  if(!reader)return;
  const s=reader.items[reader.index];
  const html=`<div class="reader-shell">${readerControls()}<div class="reader-stage">${sectionBody(s,true,reader.recall)}</div></div>`;
  if(reader.expanded) {
    if($('#content .inline-reader'))$('#content').innerHTML='';
    $('#readerDialog').innerHTML=html;
    if(!$('#readerDialog').open)$('#readerDialog').showModal();
    document.body.classList.add('reader-open');
  } else {
    if($('#readerDialog').open)$('#readerDialog').close();
    document.body.classList.remove('reader-open');
    $('#content').innerHTML=`<span class="eyebrow">${esc(reader.label)}</span><div class="inline-reader">${html}</div>`;
  }
  sizeNotes();transcriptNotice();$('#readerSelect')?.focus({preventScroll:true});
}
function closeReader(restore=true) {
  if(!reader)return;pauseMedia();stopSpeech();const expanded=reader.expanded;reader=null;
  if($('#readerDialog').open)$('#readerDialog').close();$('#readerDialog').innerHTML='';document.body.classList.remove('reader-open');
  if(restore){render();if(lastReaderFocus?.isConnected)lastReaderFocus.focus({preventScroll:true});else $('#content').focus({preventScroll:true});}
}
function moveReader(index) {if(!reader || index<0 || index>=reader.items.length)return;pauseMedia();stopSpeech();reader.index=index;reader.recall=false;renderReader();}
function pauseMedia() {document.querySelectorAll('video,audio').forEach(media => media.pause());}
function stopSpeech() {if('speechSynthesis' in window)speechSynthesis.cancel();}
function readAloud() {if(!reader || !('speechSynthesis' in window)){announce('Read aloud is unavailable in this browser.');return;}stopSpeech();const s=reader.items[reader.index];const text=[sectionTitle(s),...teachingParagraphs(s).map(x=>typeof x === 'string'?x:x.text || '')].join('. ').replace(/\*\*/g,'');const speech=new SpeechSynthesisUtterance(text);speech.rate=.94;speechSynthesis.speak(speech);}
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
    const s=sections.get(element.dataset.section);const searchable=[sectionTitle(s),s.sourceText,...teachingParagraphs(s).map(x=>typeof x === 'string'?x:x.text || ''),state.notes[s.id] || ''].join(' ').replace(/\*\*/g,'').replace(/\s+/g,' ').toLocaleLowerCase();
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
  if(button.dataset.resumeAssessment){changeAssessmentVersion(button.dataset.resumeAssessment,true);return;}
  if(button.dataset.module){go('home',null,true,button.dataset.module);return;}
  if(button.dataset.go){go(button.dataset.go,null,true,button.dataset.scopeModule);return;}
  if(button.dataset.collection){go('collection',button.dataset.collection);return;}
  if(button.dataset.theme){state.theme=button.dataset.theme;applyPreferences();save();return;}
  if(button.dataset.action){handleAction(button.dataset.action);return;}
  if(button.dataset.reader){openReader(matchingSections(button.dataset.reader).map(s=>s.id),0,button.dataset.expanded==='true',button.dataset.reader==='lecture'?collections.get(selected).title:button.dataset.reader==='meadows'?'Meadows · systems and feedback':currentModule().title+' · visual + teaching');return;}
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
    allSections=[...sections.values()];await Promise.all([loadConceptualTranscripts('v2'),loadConceptualTranscripts('v3'),loadConceptualTranscripts('v4'),loadPracticeEdition()]);loadState();readRoute();applyPreferences();render();tick();
  } catch(error) {
    $('#saveStatus').textContent='Course could not be opened';
    $('#content').innerHTML='<span class="eyebrow">LING285 Study Studio</span><h1>The course could not load.</h1><p>'+esc(error.message)+'</p><p>Reload this page when the course data is available. A static web server is required when opening a local copy.</p><a href="./">Reload studio</a>';
    console.error(error);
  }
}
init();
})();
