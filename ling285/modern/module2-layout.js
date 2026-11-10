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
