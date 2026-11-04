'use strict';
function isNullStatement(tex){return /H_\{?0\}?\s*:/.test(tex)}
function hypothesisWords(h,kind){return `<span class="hypothesis-words" data-hypothesis-words="${kind}"><strong>${kind==='null'?'Null hypothesis in words:':'Alternative hypothesis in words:'}</strong> ${esc(kind==='null'?h.nullWords:h.alternativeWords)}</span>`}
function hypothesisAlternative(h){return `<span class="math-display hypothesis-alternative">${texHTML(h.alternative,true)}</span>${hypothesisWords(h,'alternative')}`}
function hypothesisPair(h){if(!h)return '';return `<div class="hypothesis-pair" data-hypothesis-pair>${h.label?`<p class="small muted">${esc(h.label)}</p>`:''}${displayMath(h.null)}${hypothesisWords(h,'null')}${hypothesisAlternative(h)}</div>`}
function hypothesisMath(tex,h){return displayMath(tex)+(h&&isNullStatement(tex)?hypothesisWords(h,'null')+hypothesisAlternative(h):'')}
function problemHypothesis(p){return HYPOTHESES.problems[p.id]||null}
function teachingHypothesis(topic,mid,page){return HYPOTHESES.slides[mid+':'+page]||HYPOTHESES.topics[topic]||null}
function sourceHypothesisSolution(html,key){
 const statements=HYPOTHESES.sources[key]||[];
 if(!statements.length)return authored(html);
 // Preserve a source's inline null and put its translation immediately after it.
 const pattern=/(<b>H₀:<\/b>\s*(?:\\\([\s\S]*?\\\)\.?|[^<]*?\.))/;
 if(statements.length===1&&pattern.test(html)){
  const h=statements[0];return authored(html.replace(pattern,match=>match+hypothesisWords(h,'null')+hypothesisAlternative(h)));
 }
 return statements.map(hypothesisPair).join('')+authored(html);
}
