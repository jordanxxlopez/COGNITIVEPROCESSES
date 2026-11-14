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
 return `<div class="notice fix-e-note">Version E covers the lecture collections for Sessions 2–14 and 17, and the Plain concepts pages for Sessions 2–14 and 17–22. This page shows Version B.</div>`+html}
const fixOrigLesson=lessonScreen;lessonScreen=function(){return fixPlainNotice(fixOrigLesson())};
const fixOrigPath=pathScreen;pathScreen=function(core){return fixPlainNotice(fixOrigPath(core))};
// 5. Course overview: Sessions 18 to 22 are in Plain concepts and Order to memorize, not yet as full collections.
const fixOrigOverview=courseOverview;
courseOverview=function(){const list=M2.syllabus.moduleII.sessions,saved=list.map(x=>({...x}));
 list.forEach(x=>{if(!x.available&&PS_LEC.has(x.id)){x.available=true;x.title+=' · in Plain concepts and Order to memorize only'}});
 try{return fixOrigOverview()}finally{list.splice(0,list.length,...saved)}};
// 6. Every cutoff step names the class table it comes from, where to read it and the printed value.
const CLASS_TABLES={
 't_table.pdf':{name:'Class t table (two-tailed)',how:'The row is the degrees of freedom. The column heading is alpha for both tails together, so use 0.05 for a two-sided test at 0.05. The infinity row is on PDF page 2.'},
 'F_table.pdf':{name:'Class F table (upper tail)',how:'Numerator degrees of freedom run across the top and denominator degrees of freedom run down the side. Lightface numbers are for 0.05 and boldface numbers are for 0.01.'},
 'Chi_Squared_Table1.pdf':{name:'Class chi-square table 1 (landscape, upper tail)',how:'The row is the degrees of freedom and the column is the probability of a larger value, which is alpha.'},
 'Chi_Squared_Table2.pdf':{name:'Class chi-square table 2 (upright, upper tail)',how:'The row is the degrees of freedom and the column is alpha, the shaded right-tail area.'},
 'z_table_NormalDist.pdf':{name:'Class z table (Normal, area to the left)',how:'Each pair of columns lists z and F(z), the area to the left of z.'}};
function classTableNote(t){
 const file=String(t.path||'').split('/').pop(),info=CLASS_TABLES[file]||{name:file,how:''};
 const df=Array.isArray(t.actualDf)?`numerator ${t.actualDf[0]}, denominator ${t.actualDf[1]}`:(t.actualDf??'');
 const row=String(t.row).replace('∞','infinity');
 const approx=t.approximation?`<p><strong>This exact entry is not printed.</strong> ${t.bracket?`The level falls between the ${esc(t.bracket.join(' and '))} columns${t.bracketValues?` (${esc(t.bracketValues.join(' and '))})`:''}. `:''}The value shown is the nearest printed entry, so state that you bracketed it.</p>`:'';
 return `<div class="class-table-note"><p><strong>${esc(info.name)}</strong> · PDF page ${esc(t.page)} · row ${esc(row)}${df!==''&&String(df)!==row?` (degrees of freedom ${esc(df)})`:''} · column ${esc(t.column)} · printed value <strong>${esc(t.value)}</strong></p><p class="small">${esc(info.how)}</p>${approx}<a href="${esc(t.path)}#page=${esc(t.page)}" target="_blank" rel="noopener">Open the class table</a></div>`}
const fixOrigStep=m2StepHTML;
m2StepHTML=function(step,index){let html=fixOrigStep(step,index);const t=step.classTable||step.tableLookup;if(!t)return html;
 html=html.replace(/<p class="caption" data-table-lookup[^>]*>[\s\S]*?<\/p>/,'');return html.replace(/<\/div>$/,classTableNote(t)+'</div>')};
render();
