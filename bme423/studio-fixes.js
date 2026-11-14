'use strict';
// Small corrections layered over the locked app.js (tests pin app.js to commit 279aa10).
// 1. Four-page notes: say plainly that the inline preview is Version 3, not Version 8.
// 2. Start page: the midterm route is archived, so it no longer says "to Monday".
// 3. Versions A and B: a topic that spans several page ranges is shown once, with every range.
// 4. Version E: pages it does not cover say that they are showing Version B.
const fixOrigSheets=sheets;
sheets=function(){const html=fixOrigSheets(),preview=renderFollowAlongSheet(),at=html.lastIndexOf(preview);
 const head=`<div class="notice no-print fix-preview-note"><strong>Preview below · Version 3 follow-along solutions.</strong> The current edition is Version 8. Open it with the Version 8 print view or PDF above.</div>`;
 return at<0?html:html.slice(0,at)+head+html.slice(at)};
const fixOrigHome=home;
home=function(){return fixOrigHome().replace('Study route to Monday','Midterm study route (archived, used before the October 19 midterm)')};
const fixOrigModuleScreen=moduleScreen;
moduleScreen=function(){
 const m=DATA.modules.find(x=>x.id===selectedModule);
 if(!m||selectedModule>=17||state.scriptVersion==='C'||String(state.scriptVersion).startsWith('E'))return fixPlainNotice(fixOrigModuleScreen());
 const original=m.sections,groups=[];
 original.forEach(s=>{const g=groups.find(x=>x.topic===s.topic);if(g)g.more.push(s.pages);else groups.push({topic:s.topic,pages:s.pages,more:[]})});
 if(groups.length===original.length)return fixOrigModuleScreen();
 m.sections=groups.map(g=>({topic:g.topic,pages:g.pages}));
 let html;try{html=fixOrigModuleScreen()}finally{m.sections=original}
 groups.filter(g=>g.more.length).forEach(g=>{
  const label=`Original PDF pages ${g.pages[0]}–${g.pages.at(-1)}</div>`;
  const ranges=[g.pages,...g.more].map(p=>p[0]===p.at(-1)?`${p[0]}`:`${p[0]}–${p.at(-1)}`).join(', ');
  const extra=g.more.map(p=>`<button class="tiny" data-open-slide="${m.id}:${p[0]}">Pages ${p[0]}–${p.at(-1)}</button>`).join('');
  const notes=g.more.map(p=>'s'+m.id+':'+p[0]).filter(k=>state.notes[k]).map(k=>note(k,'Notes saved on page '+k.split(':')[1])).join('');
  html=html.replace(label,`Original PDF pages ${ranges} · this topic appears ${g.more.length+1} times in this session and is shown once</div><div class="row no-print fix-ranges">${extra}</div>${notes}`)});
 return html};
function fixPlainNotice(html){
 if(!String(state.scriptVersion).startsWith('E'))return html;
 if(view==='module'&&PS_LEC.has(selectedModule))return html;
 return `<div class="notice fix-e-note">Version E covers the lecture collections for Sessions 2–14 and 17, and the Plain concepts page. This page shows Version B.</div>`+html}
const fixOrigLesson=lessonScreen;lessonScreen=function(){return fixPlainNotice(fixOrigLesson())};
const fixOrigPath=pathScreen;pathScreen=function(core){return fixPlainNotice(fixOrigPath(core))};
render();
