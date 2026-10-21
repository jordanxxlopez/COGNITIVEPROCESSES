'use strict';
// Hypothesis answers are sentences, while calculation equations and source documents remain intact.
const BME_WORD_LOOKUP=new WeakMap();
for(const [id,h] of Object.entries(HYPOTHESES.problems))if(BME_WORD_HYPOTHESES.problems[id])BME_WORD_LOOKUP.set(h,BME_WORD_HYPOTHESES.problems[id]);
for(const [id,rows] of Object.entries(HYPOTHESES.sources))rows.forEach((h,i)=>{const next=BME_WORD_HYPOTHESES.sources[id]?.[i];if(next)BME_WORD_LOOKUP.set(h,next)});
for(const c of M2.cases)if(c.hypotheses&&BME_WORD_HYPOTHESES.moduleII[c.id])BME_WORD_LOOKUP.set(c.hypotheses,BME_WORD_HYPOTHESES.moduleII[c.id]);
const BME_GENERIC_HYPOTHESES=new Set([...Object.values(HYPOTHESES.topics),...Object.values(HYPOTHESES.rules)]);
let bmeWordContext=null;
function bmeHypothesisRecord(h){return BME_WORD_LOOKUP.get(h)||h}
function withBmeHypothesis(h,renderContent){const before=bmeWordContext;bmeWordContext=before&&BME_GENERIC_HYPOTHESES.has(h)?before:bmeHypothesisRecord(h)||before;try{return renderContent()}finally{bmeWordContext=before}}
function bmeHypothesisDeclaration(tex){return /H_\{?(?:0|A|a|1)\}?\s*:/.test(String(tex))}
function bmeHypothesisLabel(tex){return /H_\{?(?:0|A|a|1)\}?/.test(String(tex))}
function bmeFallbackHypothesis(tex){
 if(/\\sigma|variance/.test(tex))return {nullWords:'The population variance of the measured outcome equals the variance specified for the study population in the question.',alternativeWords:'The population variance of the measured outcome differs from the variance specified for the study population in the question.'};
 if(/independen|association/.test(tex))return {nullWords:'The two recorded characteristics are statistically independent in the population represented by the study.',alternativeWords:'The two recorded characteristics are associated in the population represented by the study.'};
 if(/p_1|p_2/.test(tex))return HYPOTHESES.topics.zprop;
 if(/p\s*=/.test(tex))return {nullWords:'The population proportion with the outcome recorded in the question equals the specified reference proportion.',alternativeWords:'The population proportion with the outcome recorded in the question differs from the specified reference proportion.'};
 if(/\\mu\s*=/.test(tex))return HYPOTHESES.topics.onet;
 if(/\\cdots|\\mu_m|\\mu_\{?[3-9]/.test(tex))return HYPOTHESES.topics.anova;
 if(/\\mu/.test(tex))return HYPOTHESES.topics.pooledt;
 if(/distribution/.test(tex))return HYPOTHESES.topics.contingency;
 return HYPOTHESES.topics.hypothesis;
}
function bmeWords(h){const mapped=BME_WORD_LOOKUP.get(h);if(mapped)return mapped;if(bmeWordContext&&BME_GENERIC_HYPOTHESES.has(h))return bmeWordContext;return h||bmeWordContext||null}
hypothesisWords=function(h,kind){h=bmeWords(h);if(!h)return '';return `<span class="hypothesis-words" data-hypothesis-words="${kind}"><strong>${kind==='null'?'Null hypothesis.':'Alternative hypothesis.'}</strong> ${esc(kind==='null'?h.nullWords:h.alternativeWords)}</span>`};
hypothesisAlternative=function(h){return hypothesisWords(h,'alternative')};
hypothesisPair=function(h){h=bmeWords(h);if(!h)return '';const own=h.pairsOnly?'':`<div class="hypothesis-pair" data-hypothesis-pair>${h.label?`<p class="small muted">${esc(h.label)}</p>`:''}${hypothesisWords(h,'null')}${hypothesisWords(h,'alternative')}</div>`;return own+(h.pairs||[]).map(pair=>hypothesisPair(pair)).join('')};
const bmeOriginalTexHTML=texHTML;
texHTML=function(tex,display=false){if(bmeHypothesisDeclaration(tex))return hypothesisPair(bmeWordContext||bmeFallbackHypothesis(tex));return bmeOriginalTexHTML(String(tex).replace(/H_\{?0\}?/g,'\\text{null hypothesis}').replace(/H_\{?[Aa1]\}?/g,'\\text{alternative hypothesis}'),display)};
const bmeOriginalDisplayMath=displayMath;
displayMath=function(tex){return bmeHypothesisDeclaration(tex)?hypothesisPair(bmeWordContext||bmeFallbackHypothesis(tex)):bmeOriginalDisplayMath(tex)};
hypothesisMath=function(tex,h){return withBmeHypothesis(h,()=>displayMath(tex))};
const bmeOriginalWorkedEquation=workedEquation;
workedEquation=function(tex,h){return withBmeHypothesis(h,()=>bmeHypothesisDeclaration(tex)?hypothesisPair(bmeWordContext||bmeFallbackHypothesis(tex)):bmeOriginalWorkedEquation(tex,bmeWordContext))};
function bmePlainInstructions(s){return String(s).replace(/(?:both\s+)?hypotheses in symbols and words/gi,'hypotheses as complete, context-specific sentences').replace(/(?:both\s+)?hypotheses in (?:symbols|notation)/gi,'hypotheses as complete, context-specific sentences').replace(/H(?:₀|_?0)(?![A-Za-z0-9])/g,'the null hypothesis').replace(/H(?:ₐ|_?[Aa])(?![A-Za-z0-9])/g,'the alternative hypothesis').replace(/the null hypothesis hypotheses/g,'null hypotheses').replace(/\bthe the\b/gi,'the')}
function bmeHypothesisProse(s){
 const h=bmeWordContext||bmeFallbackHypothesis(s);let text=String(s);
 text=text.replace(/The null hypothesis\s*\\\(H_0:[\s\S]*?\\\)\s*states that [^.]+\./g,h.nullWords);
 text=text.replace(/The alternative(?: hypothesis)?\s*\\\(H_A:[\s\S]*?\\\)\s*states that [^.]+\./g,h.alternativeWords);
 text=text.replace(/For a two-sided comparison[^.]*?\\\(H_0:[\s\S]*?\\\)\s*states that [^.]+\./g,h.nullWords);
 text=text.replace(/For a (?:reference mean|specified reference)\s*\\\([\s\S]*?\\\),\s*\\\(H_0:[\s\S]*?\\\)\s*(?:means|says) that [^.]+\./g,h.nullWords);
 text=text.replace(/\\\(H_A:[\s\S]*?\\\)\s*(?:means|says) (?:that )?[^.]+\./g,h.alternativeWords);
 text=text.replace(/The null hypothesis is\s*\\\(H_0:[\s\S]*?\\\)\./g,h.nullWords);
 text=text.replace(/Reject\s*\\\(H_0:[\s\S]*?\\\)/g,'Reject the null hypothesis');
 return text;
}
const BME_HYPOTHESIS_OPTION_WORDS=new Map([['All population means are equal','The populations represented by all treatment groups have the same mean of the interval response measured in the study.'],['Every sample mean is identical','Every observed treatment sample has exactly the same average of the measured interval response.'],['Every group has zero variance','The measured interval response has zero population variance in every treatment group.'],['At least one group differs','At least two treatment populations have different mean values of the interval response measured in the study.']]);
const bmeOriginalRich=rich;
rich=function(s){const text=bmeHypothesisProse(BME_HYPOTHESIS_OPTION_WORDS.get(String(s))||s);return text.split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g).map(part=>part.startsWith('\\(')||part.startsWith('\\[')?bmeOriginalRich(part):bmeOriginalRich(bmePlainInstructions(part))).join('')};
problemHypothesis=function(p){const bank=versionD()||p.id.startsWith('neuro-')?BME_WORD_HYPOTHESES.problems:BME_WORD_HYPOTHESES.problemsC;return bank[p.id]||HYPOTHESES.problems[p.id]||null};
const bmeOriginalProblemHTML=problemHTML;
problemHTML=function(p,...args){return withBmeHypothesis(problemHypothesis(p),()=>bmeOriginalProblemHTML(p,...args))};
const bmeOriginalStepsHTML=stepsHTML;
stepsHTML=function(p,...args){return withBmeHypothesis(problemHypothesis(p),()=>bmeOriginalStepsHTML(p,...args))};
const bmeOriginalProblemQuestionHTML=problemQuestionHTML;
problemQuestionHTML=function(p,...args){return withBmeHypothesis(problemHypothesis(p),()=>bmeOriginalProblemQuestionHTML(p,...args))};
const bmeOriginalLessonText=lessonText;
lessonText=function(l,mid,page){return withBmeHypothesis(teachingHypothesis(l.id,mid,page),()=>bmeOriginalLessonText(l,mid,page))};
const bmeOriginalSourceWorked=sourceWorked;
sourceWorked=function(key){return withBmeHypothesis(BME_WORD_HYPOTHESES.sources[key]?.[0],()=>bmeOriginalSourceWorked(key))};
sourceHypothesisSolution=function(html,key){const records=BME_WORD_HYPOTHESES.sources[key]||[];const cleaned=html.replace(/<b>H₀:<\/b>\s*(?:\\\([\s\S]*?\\\)\.?|[^<]*?\.)/g,'').replace(/\\\[H_\{?[0Aa1]\}?:[\s\S]*?\\\]/g,'');return records.map(hypothesisPair).join('')+authored(cleaned)};
const bmeOriginalM2CaseHTML=m2CaseHTML;
m2CaseHTML=function(c,...args){return withBmeHypothesis(BME_WORD_HYPOTHESES.moduleII[c.id],()=>bmeOriginalM2CaseHTML(c,...args))};
const bmeOriginalM2CasePrompt=m2CasePrompt;
m2CasePrompt=function(c){return withBmeHypothesis(BME_WORD_HYPOTHESES.moduleII[c.id],()=>bmeOriginalM2CasePrompt(c))};
m2Hypotheses=function(h){return h?`<div class="m2-hypotheses">${hypothesisPair(bmeWordContext||bmeHypothesisRecord(h))}</div>`:''};
const bmeOriginalM2SlideText=m2SlideText;
m2SlideText=function(s){const m=m2Methods.get(s.topic),h=s.case?BME_WORD_HYPOTHESES.moduleII[s.case]:null;return withBmeHypothesis(h,()=>bmeOriginalM2SlideText(s))};
const bmeOriginalQuizExplanation=quizExplanation;
quizExplanation=function(q){const frame=(versionD()?VERSION_D.quizzes:STUDIO_QUESTIONS.quizzes)[q.id],p=PROB.get(frame?.problem||q.problem);return withBmeHypothesis(p?problemHypothesis(p):HYPOTHESES.topics[q.topic],()=>bmeOriginalQuizExplanation(q))};
const bmeOriginalQuizScreen=quizScreen;
quizScreen=function(){const q=quiz?.items[quiz.index],frame=q&&(versionD()?VERSION_D.quizzes:STUDIO_QUESTIONS.quizzes)[q.id],p=q&&(PROB.get(frame?.problem||q.problem));return withBmeHypothesis(p?problemHypothesis(p):HYPOTHESES.topics[q?.topic],()=>bmeOriginalQuizScreen())};
const bmeOriginalM2QuizScreen=m2QuizScreen;
m2QuizScreen=function(){const q=quiz?.items[quiz.index];return withBmeHypothesis(q?.case?BME_WORD_HYPOTHESES.moduleII[q.case]:null,()=>bmeOriginalM2QuizScreen())};
const bmeOriginalTypesetContent=typesetContent;
typesetContent=function(){bmeOriginalTypesetContent();const root=document.querySelector('#content');if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode()){const n=walker.currentNode;if(n.parentElement.closest('.katex,textarea,input,select,option,pre,code,script'))continue;if(/H(?:₀|ₐ|_?0|_?[Aa])(?![A-Za-z0-9])|hypotheses in (?:symbols|notation)/.test(n.nodeValue))nodes.push(n)}for(const n of nodes)n.nodeValue=bmePlainInstructions(n.nodeValue);for(const step of root.querySelectorAll('.step')){const seen=new Set();for(const pair of step.querySelectorAll('[data-hypothesis-pair]')){const key=pair.textContent.replace(/\s+/g,' ').trim();if(seen.has(key))pair.remove();else seen.add(key)}}};
render();save();
