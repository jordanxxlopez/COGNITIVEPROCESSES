"""One-time patch that wires the Exam 2 review guide, Practice Version 3 and the writing
exam into ling285/app.js, style.css and index.html. Each replacement must match once."""
from pathlib import Path

root = Path(__file__).resolve().parents[2]
app = (root / 'app.js').read_text(encoding='utf-8')


def swap(old, new, text):
    assert text.count(old) == 1, f'expected one match: {old[:90]}'
    return text.replace(old, new)


app = swap("['guide','What to know by the end'], ", "['guide','What to know by the end'], ['review','Exam 2 review guide'], ", app)
app = swap("['test','Current practice test'], ", "['test','Current practice test'], ['writing','Writing exam · Exam 2 style'], ", app)
app = swap("practiceData=null,practiceLoadError='';",
           "practiceData=null,practiceLoadError='';\nlet practiceV3=null,practiceV3Error='',examReview=null,examReviewError='';const practiceV3Ids=new Set(),EXAM2_VIEWS=new Set(['review','writing']);", app)
app = swap("function effectiveAssessmentVersion(moduleId=state.activeModule,preference=state.assessmentVersion) {return moduleId==='module2' && preference==='v2' && practiceData?'v2':'v1';}",
           "function effectiveAssessmentVersion(moduleId=state.activeModule,preference=state.assessmentVersion) {if(moduleId!=='module2')return 'v1';if(preference==='v3' && practiceV3)return 'v3';return preference==='v2' && practiceData?'v2':'v1';}", app)
app = swap("function questionAssessmentVersion(q) {return practiceQuestionIds.has(q?.id)?'v2':'v1';}",
           "function questionAssessmentVersion(q) {return practiceV3Ids.has(q?.id)?'v3':practiceQuestionIds.has(q?.id)?'v2':'v1';}", app)
app = swap("function moduleQuestions(id=state.activeModule) {return (effectiveAssessmentVersion(id)==='v2'?practiceData.questions:D.questions).filter(q=>questionModule(q)===id);}",
           "function moduleQuestions(id=state.activeModule) {const version=effectiveAssessmentVersion(id);return (version==='v3'?practiceV3.questions:version==='v2'?practiceData.questions:D.questions).filter(q=>questionModule(q)===id);}", app)
app = swap("if(['v1','v2'].includes(raw.assessmentVersion))clean.assessmentVersion=raw.assessmentVersion;",
           "if(['v1','v2','v3'].includes(raw.assessmentVersion))clean.assessmentVersion=raw.assessmentVersion;", app)
app = swap("for(const version of module.id==='module2'?['v1','v2']:['v1']){",
           "for(const version of module.id==='module2'?['v1','v2','v3']:['v1']){", app)

# Loaders for the two new files, run alongside the Version 2 loader.
app = swap("function practiceVersionSelector() {", r"""async function loadPracticeV3() {
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
async function loadExamReview() {
  try{
    const response=await fetch('exam2-review.json',{cache:'no-cache'});if(!response.ok)throw new Error('The review guide returned '+response.status+'.');
    const payload=await response.json();if(!Array.isArray(payload.items) || !payload.items.length)throw new Error('The review guide is empty.');
    examReview=payload;
  }catch(error){examReviewError=error.message;console.warn('Exam 2 review unavailable: '+error.message);}
}
function practiceVersionSelector() {""", app)
app = swap("""<option value="v2" ${effectiveAssessmentVersion()==='v2'?'selected':''} ${practiceData?'':'disabled'}>${esc(practiceData?.label || 'Version 2 · Exam style')}</option></select>""",
           """<option value="v2" ${effectiveAssessmentVersion()==='v2'?'selected':''} ${practiceData?'':'disabled'}>${esc(practiceData?.label || 'Version 2 · Exam style')}</option><option value="v3" ${effectiveAssessmentVersion()==='v3'?'selected':''} ${practiceV3?'':'disabled'}>${esc(practiceV3?.label || 'Version 3 · Exam 2 style')}</option></select>""", app)
app = swap("""  const other=effectiveAssessmentVersion()==='v2'?'v1':'v2',saved=state.practiceSessions[sessionKey('module2',other)];
  return `<div class="toolbar practice-edition-toolbar">${practiceVersionSelector()}${saved && (other==='v1' || practiceData)?`<button class="small-button" data-resume-assessment="${other}">Open Version ${other.slice(1)} saved ${saved.finished?'results':'practice'} · ${saved.ids.length} questions</button>`:''}</div>""",
           """  const current=effectiveAssessmentVersion(),others=['v1','v2','v3'].filter(version=>version!==current && (version==='v1' || (version==='v2'?practiceData:practiceV3)));
  const resume=others.map(version=>{const saved=state.practiceSessions[sessionKey('module2',version)];return saved?`<button class="small-button" data-resume-assessment="${version}">Open Version ${version.slice(1)} saved ${saved.finished?'results':'practice'} · ${saved.ids.length} questions</button>`:'';}).join('');
  return `<div class="toolbar practice-edition-toolbar">${practiceVersionSelector()}${resume}</div>${current==='v3'?`<p class="notice practice-version-status">${esc(practiceV3.model?.summary || '')}</p>`:''}${state.assessmentVersion==='v3' && !practiceV3?`<p class="notice practice-version-status" role="status">Practice Version 3 could not be loaded. ${esc(practiceV3Error)}</p>`:''}""", app)
app = swap("if(!['v1','v2'].includes(version) || (version==='v2' && !practiceData) || state.activeModule!=='module2')return;",
           "if(!['v1','v2','v3'].includes(version) || (version==='v2' && !practiceData) || (version==='v3' && !practiceV3) || state.activeModule!=='module2')return;", app)
app = swap("""  const raw=module.assessmentPolicy || {},fixed=module.id==='module2';""",
           """  if(module.id==='module2' && effectiveAssessmentVersion('module2')==='v3'){const p=practiceV3.policy;return {fixed:true,currentTestSize:p.currentTestSize,lectureQuizSize:practiceV3.questions.filter(q=>q.lectureId==='lecture11').length,mcqShare:p.mcqCount/p.currentTestSize};}
  const raw=module.assessmentPolicy || {},fixed=module.id==='module2';""", app)

# Exam-style sampling for Version 3 and the writing exam.
app = swap("function startPractice(scope,exactId) {", r"""function exam2Sample(writtenOnly) {
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
  if(scope==='writing' || (scope==='mixed' && !exactId && effectiveAssessmentVersion()==='v3' && state.activeModule==='module2')){startExam2(scope);return;}""", app)

# The two new views.
app = swap("function shuffle(items) {", r"""function module2OnlyNotice(title) {return `${scopeBanner()}<h1>${esc(title)}</h1><p class="lead">This page covers Exam 2, which is on Module II.</p><button data-go="${esc(view)}" data-scope-module="module2">Open it for Module II</button>`;}
function examReviewView() {
  if(state.activeModule!=='module2')return module2OnlyNotice('Exam 2 review guide');
  if(!examReview)return `${scopeBanner()}<h1>Exam 2 review guide</h1><p class="notice" role="status">The review guide could not be loaded. ${esc(examReviewError)}</p>`;
  const m=examReview.model,list=items=>`<ul>${items.map(x=>`<li>${rich(x)}</li>`).join('')}</ul>`;
  const card=item=>{const ready=state.ready[item.id];return `<article class="card guide-card review-card" id="${esc(item.id)}"><span class="tag">Review question ${item.number}</span><h2>${esc(item.question)}</h2>${item.figure?`<p class="small muted review-figure">Figure · ${esc(item.figure)}</p>`:''}<label class="draft-label" for="draft-${esc(item.id)}">Try it first · your answer is saved in this browser</label><textarea id="draft-${esc(item.id)}" class="draft review-draft" data-draft="${esc(item.id)}" placeholder="Write your answer the way you would on the exam…">${esc(state.drafts[item.id] || '')}</textarea><details class="review-answer"><summary>Show how to answer it and what it means</summary><h3>How to answer it on the exam</h3><p>${rich(item.answer)}</p>${item.code?`<pre class="review-code"><code>${esc(item.code)}</code></pre>`:''}<h3>What it means</h3>${list(item.teaching)}<h3>How he could change it on the exam</h3><p>${rich(item.change)}</p></details><div class="row">${sourceRefs(item)}</div><label class="readiness"><input type="checkbox" data-ready="${esc(item.id)}" ${ready?'checked':''}> I can answer this without the guide</label></article>`;};
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
function shuffle(items) {""", app)
app = swap("const routes={stimuli:()=>window.Ling285Stimuli.gallery(state.activeModule),home,",
           "const routes={stimuli:()=>window.Ling285Stimuli.gallery(state.activeModule),review:examReviewView,writing:writingExamView,home,", app)
app = swap("$('#workNav').innerHTML=WORK.map(", "$('#workNav').innerHTML=WORK.filter(([id])=>state.activeModule==='module2' || !EXAM2_VIEWS.has(id)).map(", app)
app = swap("$('#archiveWorkNav').innerHTML=WORK.map(", "$('#archiveWorkNav').innerHTML=WORK.filter(([id])=>!EXAM2_VIEWS.has(id)).map(", app)
app = swap("loadPracticeEdition()]);", "loadPracticeEdition(),loadPracticeV3(),loadExamReview()]);", app)
(root / 'app.js').write_text(app, encoding='utf-8')

css = (root / 'style.css').read_text(encoding='utf-8')
if '.review-answer' not in css:
    css += """
/* Exam 2 review guide */
.review-card h2 { margin-top: 12px; }
.review-figure { margin: 4px 0 12px; }
.review-draft { min-height: 120px; }
.review-answer { margin: 6px 0 4px; border-top: 1px solid var(--line); padding-top: 10px; }
.review-answer summary, .review-model summary { cursor: pointer; font-weight: 650; }
.review-answer h3 { margin: 16px 0 6px; font-size: 1rem; }
.review-answer ul, .review-model ul { padding-left: 1.2em; line-height: 1.6; }
.review-code { overflow-x: auto; padding: 12px; border-radius: 9px; background: var(--bg); border: 1px solid var(--line); font-size: .9rem; }
.review-model { margin: 15px 0; }
.review-model h3 { margin: 16px 0 6px; font-size: 1rem; }
"""
    (root / 'style.css').write_text(css, encoding='utf-8')

index = (root / 'index.html').read_text(encoding='utf-8')
index = swap('app.js?v=ling285-lecture18-v24-slide-by-slide-1', 'app.js?v=ling285-exam2-review-1', index)
index = swap('style.css?v=ling285-following-slides-1', 'style.css?v=ling285-exam2-review-1', index)
(root / 'index.html').write_text(index, encoding='utf-8')
print('patched app.js, style.css and index.html')
