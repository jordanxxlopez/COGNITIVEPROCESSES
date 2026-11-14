'use strict';
// Lets MODULE II hold Sessions 18 to 22 next to Session 17, in the same layout.
// course-modules.js stays identical to 279aa10 (tests pin it), so this file wraps its functions.
// Session 17 renders exactly as before. Other sessions reuse the same renderers, retargeted to their id.
if(typeof BME_MODULE_II_EXTRA!=='undefined'){
 const X=BME_MODULE_II_EXTRA;
 X.modules.forEach(m=>{if(!M2.modules.some(x=>x.id===m.id))M2.modules.push(m)});
 X.methods.forEach(m=>{if(!m2Methods.has(m.id)){M2.methods.push(m);m2Methods.set(m.id,m)}});
 X.cases.forEach(c=>{if(!m2Cases.has(c.id)){M2.cases.push(c);m2Cases.set(c.id,c)}});
 M2.questions.push(...X.questions.filter(q=>!M2.questions.some(x=>x.id===q.id)));
 M2.sourceNotes.push(...X.sourceNotes);
 M2.syllabus.moduleII.sessions.forEach(s=>{if(X.modules.some(m=>m.id===s.id))s.available=true});
}
M2.modules.sort((a,b)=>a.id-b.id).forEach(m=>m.slides.forEach(s=>{s.module=m.id}));
M2.methods.forEach(m=>{if(!m.module)m.module=17});
let m2ForcedModule=null;
m2Module=function(id){if(id===undefined)id=m2ForcedModule??((view==='module'||view==='m2collection')&&selectedModule>=17?selectedModule:17);return M2.modules.find(m=>m.id===Number(id))};
function m2Retarget(html,id){
 if(!id||id===17)return html;
 return html.replaceAll('"17:','"'+id+':').replaceAll('s17:','s'+id+':').replaceAll('assets/session17/','assets/session'+id+'/')
  .replaceAll('sources/session17.pdf','sources/session'+id+'.pdf').replaceAll('Session 17','Session '+id)}
const m2OrigSlideHypothesis=m2SlideHypothesis;
m2SlideHypothesis=function(s){if(!s.module||s.module===17)return m2OrigSlideHypothesis(s);return s.case||!s.hypotheses?'':m2Hypotheses(s.hypotheses)};
const m2OrigSlideText=m2SlideText;m2SlideText=function(s){return m2Retarget(m2OrigSlideText(s),s.module)};
const m2OrigSlideCard=m2SlideCard;m2SlideCard=function(s,open){return m2Retarget(m2OrigSlideCard(s,open),s.module)};
const m2OrigMethodScreen=m2MethodScreen;m2MethodScreen=function(){return m2Retarget(m2OrigMethodScreen(),m2Methods.get(m2Method)?.module)};
const m2OrigCollection=m2Collection;
m2Collection=function(){
 const m=m2Module(selectedModule);if(!m||m.id===17)return m2OrigCollection();
 const read=state.moduleII.read.filter(k=>k.startsWith('s'+m.id+':')).length;
 return `<span class="tag">MODULE II · INDIVIDUAL COLLECTION</span><h1>Session ${m.id} · ${esc(m.title)}</h1><div class="row"><button data-module-view="normal">Visual + transcript</button><button class="primary" data-module-view="expanded">Expand visual + transcript</button><button data-m2-quiz-module="${m.id}">Lecture quiz · ${Math.min(M2.lectureQuizSize,M2.questions.filter(q=>q.module===m.id).length)} questions</button><a href="${m.pdf}" target="_blank" rel="noopener">Original PDF</a></div><p class="small muted">Slide teaching, equations, complete calculations, symbol meanings, and shorter methods. ${read} / ${m.slides.length} slides marked read.</p>${m.slides.map((s,i)=>m2SlideCard(s,i===0)).join('')}`};
const m2OrigModuleScreen=moduleScreen;
moduleScreen=function(){return selectedModule>17&&m2Module(selectedModule)?m2Collection():m2OrigModuleScreen()};
const m2OrigViewer=viewerScreen;
viewerScreen=function(){const r=viewer?.slides[viewer.index];if(!r||!(r.module>17)||!m2Module(r.module))return m2OrigViewer();
 const real=r.module;r.module=17;m2ForcedModule=real;try{return m2Retarget(m2OrigViewer(),real)}finally{r.module=real;m2ForcedModule=null}};
function m2SessionList(){return M2.modules.map(m=>`Session ${m.id} · ${m.title}`).join(', ')}
const m2OrigScope=m2Scope;
m2Scope=function(){return `<div class="notice m2-scope"><strong>MODULE II · Second half</strong><p>Current lectures: ${esc(m2SessionList())}. Later sessions appear in the syllabus outline and join this workspace when supplied.</p></div>`};
const m2OrigHome=m2Home;
m2Home=function(){
 const cards=M2.modules.map(m=>`<div class="card"><span class="tag">SESSION ${m.id}</span><h2>${esc(m.title)}</h2><p>${m.slides.length} slide explanations · ${M2.cases.filter(c=>c.module===m.id).length} worked cases · ${M2.questions.filter(q=>q.module===m.id).length} questions</p><p>${state.moduleII.read.filter(k=>k.startsWith('s'+m.id+':')).length} / ${m.slides.length} slides marked read</p><button class="primary" data-module="${m.id}">Open Session ${m.id}</button></div>`).join('');
 return m2OrigHome().replace('Session 17 develops confidence intervals for means and proportions.','MODULE II covers '+esc(m2SessionList())+'.').replace(/<div class="grid">/,`<h2>Lecture collections</h2><div class="grid">${cards}</div><div class="grid">`)};
const m2OrigTest=m2Test;m2Test=function(){return m2OrigTest().replace('Current coverage: Session 17 · Confidence intervals.','Current coverage: '+esc(m2SessionList())+'.')};
const m2OrigScreen=m2Screen;
m2Screen=function(){
 if(view==='m2core')return `<h1>Must know · core review</h1><p class="small muted">Core slides from every MODULE II session.</p>${M2.modules.map(m=>`<h2>Session ${m.id} · ${esc(m.title)}</h2>${m.slides.filter(s=>s.core).map((s,i)=>m2SlideCard(s,false)).join('')}`).join('')}`;
 if(view==='m2notes')return `<h1>Combined teaching notes</h1>${M2.modules.map(m=>`<h2>Session ${m.id} · ${esc(m.title)}</h2><button data-module="${m.id}">Open Session ${m.id}</button>${m.slides.map(s=>m2SlideCard(s,false)).join('')}`).join('')}`;
 if(view==='m2sources')return m2OrigScreen()+`<div class="card"><h2>Sessions 18 to 22</h2><p>Every PDF page of Sessions 18 to 22 has its own teaching explanation. Formulas were read from the slide images. Worked cases use the lecture examples with their printed values, plus labeled original practice. ${M2.modules.filter(m=>m.id>17).map(m=>`<a href="${m.pdf}" target="_blank" rel="noopener">Session ${m.id} PDF</a>`).join(' · ')}</p></div>`;
 return m2OrigScreen()};
