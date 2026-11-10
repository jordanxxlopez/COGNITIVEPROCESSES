// Included inside the retained studio shell by authoring/build_modern.py.
// Every modern authored view is defined here; source files stay in the original directory.
function installModern() {
 const pack=window.LING285_MODERN;
 TRANSCRIPT_VERSIONS.splice(0,TRANSCRIPT_VERSIONS.length,'v1',...Object.keys(pack.editions));
 for(const key of Object.keys(FOLLOWING_SLIDE_VERSIONS))delete FOLLOWING_SLIDE_VERSIONS[key];
 FOLLOWING_SLIDE_VERSIONS.follow='c';
 effectiveVersion=function(){return transcriptEditions.has(state.transcriptVersion)?state.transcriptVersion:transcriptEditions.has('v20')?'v20':[...transcriptEditions.keys()][0] || 'v1';};
 selectableTranscriptVersions=function(){return Object.keys(pack.editions);};
 transcriptSelector=function(){return `<label class="transcript-version"><span>Teaching style</span><select data-transcript-version aria-label="Transcript version">${Object.entries(pack.editions).map(([id,label])=>`<option value="${id}" ${effectiveVersion()===id?'selected':''} ${transcriptEditions.has(id)?'':'disabled'}>${esc(label)}</option>`).join('')}</select></label>`;};
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
   `<p class="small muted">Collection ${esc(c.number)} · ${c.sections.length} original source pages</p><div class="row"><a href="${esc(safeURL(c.sourceFile))}" target="_blank" rel="noopener">Original PowerPoint</a><a href="${esc(safeURL(c.pdfFile))}" target="_blank" rel="noopener">Source PDF</a><button data-start="lecture:${esc(c.id)}">Open collection quiz</button></div>`+
   studyToolbar('lecture')+searchTools('Search this collection’s rewritten teaching')+
   c.sections.map(sectionHTML).join('');
 };
 home=function(){
  return intro('Make the mechanism clear.','Use the source visuals and rewritten explanations to understand sound, speech, learning and sequence prediction.')+
   `<div class="toolbar"><button class="primary" data-go="guide">What to know by the end</button><button data-go="qa">Open Q&A</button><button data-go="writing">Writing practice</button><button data-go="test">Current practice test</button></div><details class="modern-topic" open><summary>What is new in this workspace</summary><div class="modern-topic-body"><p>The workspace sections and teaching editions have been rewritten around the LING285 sources and exam evidence, using the modern PSYC301 organization and Version 20 writing structure.</p><p>Choose among five teaching styles, use source-linked questions and comparisons, or work through writing prompts with optional saved responses. College, Simple and Original wording choices belong to the quizzes and practice tests.</p><p><a href="./">Open the original workspace</a> whenever you want the earlier versions.</p></div></details><div class="grid">${moduleLectures().map(c=>`<article class="card"><span class="tag">Collection ${esc(c.number)}</span><h2>${esc(collectionTitle(c))}</h2><p>${rich(pack.summaries[c.id])}</p><p class="small muted">${c.sections.filter(s=>state.read[s.id]).length} of ${c.sections.length} source pages marked read</p><button data-collection="${esc(c.id)}">Open collection</button></article>`).join('')}</div>`;
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
   `<article class="modern-topic"><div class="modern-topic-body"><h2>The original sources and earlier editions remain available.</h2><p>${c.sourcePages} original lecture pages are retained across both modules. The current module has ${c.modulePages.module2} source pages, ${c.currentQuestions} new quiz questions and ${c.distinctWritingPrompts} distinct writing prompts.</p><p>All five modern teaching choices use the same source-page identities. Personal notes and read marks remain connected to those identities, while the new question bank keeps its own answers and practice history.</p><div class="row"><a class="button" href="./">Open original workspace</a><a href="modern/coverage.json">Inspect coverage</a><a href="modern/section-review.json">Inspect the section-by-section review</a></div></div></article>`+
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
}
