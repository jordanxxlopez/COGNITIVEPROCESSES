'use strict';
// All mathematics is typeset locally; no CDN or network dependency at runtime.
function texHTML(tex,display=false){return katex.renderToString(tex,{displayMode:display,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false})}
function inlineMath(tex){return texHTML(tex,false)}
function displayMath(tex){return '<div class="math-display">'+texHTML(tex,true)+'</div>'}
// Keep the formula, substitution and result in one equation. On a narrow
// screen an equality is a natural wrap point, without reducing the type size.
function workedEquation(tex,context){
 if(isNullStatement(tex)||tex.includes('\\begin{'))return hypothesisMath(tex,context);
 let depth=0,start=0,parts=[];
 for(let i=0;i<tex.length;i++){if(tex[i]==='{')depth++;else if(tex[i]==='}')depth--;else if(tex[i]==='='&&depth===0){parts.push(tex.slice(start,i));start=i}}
 if(parts.length<2)return hypothesisMath(tex,context);
 parts.push(tex.slice(start));parts=[parts[0]+parts[1],...parts.slice(2)];
 return '<div class="math-display worked-equation-chain">'+parts.map(part=>'<span class="equation-link">'+texHTML('\\displaystyle '+part,false)+'</span>').join('')+'</div>';
}
function unicodeTex(raw){
 let s=String(raw).replace(/x̄/g,'\\bar{x}').replace(/p̂/g,'\\hat{p}').replace(/χ²/g,'\\chi^2').replace(/²/g,'^2').replace(/³/g,'^3').replace(/⁴/g,'^4');
 const chars={'μ':'\\mu','σ':'\\sigma','Σ':'\\sum','Φ':'\\Phi','α':'\\alpha','β':'\\beta','χ':'\\chi','ν':'\\nu','∞':'\\infty','≤':'\\le','≥':'\\ge','≠':'\\ne','≈':'\\approx','×':'\\times','−':'-','→':'\\rightarrow','∫':'\\int','₀':'_0','₁':'_1','₂':'_2','ᶜ':'^c'};
 s=s.replace(/[μσΣΦαβχν∞≤≥≠≈×−→∫₀₁₂ᶜ]/g,c=>chars[c]+' ');
 s=s.replace(/√\(([^()]*)\)/g,'\\sqrt{$1}').replace(/√\[([^\[\]]*)\]/g,'\\sqrt{$1}').replace(/√([a-zA-Z0-9.]+(?:\^2)?)/g,'\\sqrt{$1}');
 s=s.replace(/([A-Za-z])([12])\b/g,'$1_{$2}').replace(/_([A-Za-z]+)/g,'_{\\mathrm{$1}}');
 // Numerical fractions in working are stacked; other division remains valid TeX.
 s=s.replace(/(-?\d+(?:\.\d+)?)\/(\\sqrt\{[^{}]+\})/g,'\\frac{$1}{$2}');
 s=s.replace(/(?<![\\\w.])(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)(?![\w.])/g,'\\frac{$1}{$2}');
 const held=[];s=s.replace(/\\[a-zA-Z]+/g,t=>{held.push(t);return '@'+(held.length-1)+'@'});
 s=s.replace(/[A-Za-z]+/g,w=>w.length===1?w:['SEM','SE','SD','Var','Prob','max','min','exp','df'].includes(w)?'\\operatorname{'+w+'}':'\\text{'+w+'}');
 s=s.replace(/@(\d+)@/g,(_,i)=>held[Number(i)]).replace(/%/g,'\\%').replace(/#/g,'\\#').replace(/&/g,'\\&');
 while(/\\text\{[^{}]+\}\s+\\text\{[^{}]+\}/.test(s))s=s.replace(/\\text\{([^{}]+)\}\s+\\text\{([^{}]+)\}/g,'\\text{$1 $2}');
 return s;
}
function rich(s){
 // Authored LaTeX is explicit. Existing transcript symbols are upgraded in place.
 s=String(s);const parts=s.split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);
 return parts.map(p=>p.startsWith('\\[')?displayMath(p.slice(2,-2)):p.startsWith('\\(')?inlineMath(p.slice(2,-2)):esc(p).replace(/(?:[xps]̄|p̂|[μσαβχνΦΣ](?:²)?|[a-zA-Z]²|χ²|n−1|n≥30|x̄)/g,t=>inlineMath(unicodeTex(t)))).join('');
}
function legacyMathBlock(raw){
 return String(raw).split(/;\s*|(?<=[.!?])\s+(?=[A-Z])/).map(part=>{
  const p=part.trim();if(!p)return '';
  if(/[=<>≈→∫×]/.test(p)||/^[\d.]+\s*[+−/]/.test(p)||/^[\d\s.,[\]−-]+$/.test(p))return displayMath(unicodeTex(p));
  return '<p class="math-explanation">'+rich(p)+'</p>';
 }).join('');
}
function typesetContent(){
 document.querySelectorAll('#content .formula:not([data-math-ready])').forEach(el=>{
  const raw=el.textContent;el.innerHTML=legacyMathBlock(raw);el.dataset.mathReady='true';
 });
 // Upgrade remaining legacy symbols in headings, prompts, labels and explanatory prose.
 const root=document.querySelector('#content');if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];
 while(walker.nextNode()){const node=walker.currentNode;if(node.parentElement.closest('.katex,textarea,input,select,option,pre,code,script'))continue;if(/[μσαβχνΦΣ²³⁴]|x̄|p̂/.test(node.nodeValue))nodes.push(node)}
 for(const node of nodes){const box=document.createElement('span');box.innerHTML=rich(node.nodeValue);node.replaceWith(...box.childNodes)}
}
function authored(html){return String(html).replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_,d,i)=>d!==undefined?displayMath(d):inlineMath(i))}
function formulaHTML(l){const h=HYPOTHESES.topics[l.id],tex=V2.formulas[l.id]||[];return (h&&!tex.some(isNullStatement)?hypothesisPair(h):'')+tex.map(t=>hypothesisMath(t,h)).join('')}
function equationRules(keys=[],context=null){return keys.map(key=>{const r=EQUATION_GUIDE.rules[key],h=context||HYPOTHESES.rules[key];if(!r)throw Error('Missing equation rule '+key);return `<div class="equation-rule" data-equation-rule="${esc(key)}">${r.tex.map(t=>hypothesisMath(t,h)).join('')}<p class="symbol-key">${rich(r.symbols)}</p></div>`}).join('')}
function teachingParagraphs(paragraphs,placements={},hypothesis=null){return paragraphs.map((p,i)=>`<p>${rich(p)}</p>${equationRules(placements[i]||[],hypothesis)}`).join('')}
function stepEquations(p,index){const steps=EQUATION_GUIDE.problems[p.id];if(!steps||!steps[index])throw Error('Unreviewed calculation step '+p.id+':'+index);return equationRules(steps[index])}
function versionD(){return state.questionVersion==='D'}
function questionFrame(p){if(NEURO_WORKED.questions[p.id])return NEURO_WORKED.questions[p.id];const q=versionD()?VERSION_D.problems[p.id]:(PRACTICE_QUESTIONS.questions[p.id]||VERSION_D.problems[p.id]);if(!q)throw Error('Missing question '+p.id);return q}
function problemSteps(p){const neuro=NEURO_WORKED.questions[p.id],mode=neuro||versionD()?'D':'C',flow=neuro?neuro.flow:versionD()?VERSION_D.problems[p.id]?.flow:(STUDIO_FLOWS.problems[p.id]||VERSION_D.problems[p.id]?.flow);if(!flow)throw Error('Missing worked solution '+p.id);const equations=WORKED_CHAINS[mode][p.id]||WORKED_CHAINS.D[p.id];if(!equations||equations.length!==flow.length)throw Error('Missing worked equations '+p.id);return flow.map((step,i)=>({...step,math:equations[i]}))}
function workedFigure(figure){return figure?`<figure class="worked-figure"><img src="${esc(figure.src)}" alt="${esc(figure.alt)}" decoding="async"><figcaption>${esc(figure.caption)}</figcaption></figure>`:''}
function questionBody(q){return `${(q.paragraphs||[q.context]).map(p=>`<p class="teaching">${rich(p)}</p>`).join('')}${q.math.map(displayMath).join('')}<ol class="rapid-question-parts" type="a">${q.parts.map(part=>`<li>${rich(part)}</li>`).join('')}</ol>`}
function problemQuestionHTML(p,worked=false){const q=questionFrame(p);const requested=q.check.replace(/^Enter (.)/,(_,c)=>c.toUpperCase());return `<section class="rapid-exam-question" data-question-version="${versionD()?'D':'C'}" data-question-frame="${esc(p.id)}"><h2>${esc(q.title)}</h2>${questionBody(q)}<p><strong>${worked?'Requested result:':'Numerical answer to check:'}</strong> ${rich(worked?requested:q.check)}</p></section>`}
function sourceWorked(key){const b=V2.blocks[key],q=(versionD()?VERSION_D.sources:STUDIO_QUESTIONS.sources)[key];if(!q)throw Error('Missing source question '+key);return `<section class="source-worked" data-worked-block="${esc(key)}" data-question-version="${versionD()?'D':'C'}"><h4>${esc(b.title)}</h4><div class="source-question" data-source-question="${esc(key)}">${questionBody(q)}</div><details class="source-solution" open><summary>Worked solution · equations and substitutions</summary>${sourceHypothesisSolution(WORKED_CHAINS.sources[versionD()?'D':'C'][key],key)}${workedFigure(q.figure)}</details><p class="caption">${esc(b.source)}</p></section>`}
function quizQuestionHTML(q){const framed=(versionD()?VERSION_D.quizzes:STUDIO_QUESTIONS.quizzes)[q.id]||VERSION_D.quizzes[q.id];if(!framed)throw Error('Missing quiz question '+q.id);if(framed.problem){const p=PROB.get(framed.problem),f=questionFrame(p);const task=f.check.replace(/^Enter /,'Select ').replace(/^Select ([01]) (to|for)/,'Use $1 $2');return `<section data-quiz-question="${esc(q.id)}" data-question-version="${versionD()?'D':'C'}" data-question-frame="${esc(p.id)}">${versionD()||!PRACTICE_QUESTIONS.questions[p.id]?questionBody(f):`<p>${rich(f.context)}</p>${f.math.map(displayMath).join('')}`}<p class="quiz-request">${rich(task)}</p></section>`}return `<section data-quiz-question="${esc(q.id)}" data-question-version="${versionD()?'D':'C'}">${versionD()?questionBody({...framed,math:framed.math||[]}):`<p>${rich(framed.stem)}</p>${(framed.math||[]).map(displayMath).join('')}`}</section>`}
function quizExplanation(q){const p=q.problem&&PROB.get(q.problem);return `<div class="quiz-explanation"><p>${rich(q.why)}</p>${!p?hypothesisPair(HYPOTHESES.topics[q.topic]):''}${p?`<details class="quiz-calculation" open><summary>Worked solution · equations and substitutions</summary>${stepsHTML(p)}</details>`:EQUATION_GUIDE.questions[q.id]?.length?`<details class="formula-reference"><summary>Formula reference</summary>${equationRules(EQUATION_GUIDE.questions[q.id])}</details>`:''}</div>`}
function renderNotesV2(){const pack=typeof SHEET_PACK==='undefined'?V2:SHEET_PACK;return pack.sheets.map((s,i)=>`<article class="sheet-v2"><header><strong>BME423 · MIDTERM</strong><span>Side ${i+1}/4 · ${esc(s.title.slice(4))}</span></header><div class="notes-columns">${s.columns.map(keys=>`<div class="notes-column">${keys.map(k=>{const b=pack.blocks[k];return `<section class="compact-block" data-block="${k}"><h3>${esc(b.title)}</h3>${authored(b.html)}</section>`}).join('')}</div>`).join('')}</div></article>`).join('')}
function fitNotesMath(){document.querySelectorAll('.sheet-v2 .math-display').forEach(el=>{el.style.fontSize='';const span=el.querySelector('.katex-html');if(!span)return;const width=span.getBoundingClientRect().width,available=el.clientWidth;if(width>available&&available>0){if(el.closest('.sheet-follow')){const size=parseFloat(getComputedStyle(el).fontSize);el.style.fontSize=(size*Math.min(1,available/width))+'px'}else el.style.fontSize=(Math.min(1,available/width)*100).toFixed(2)+'%'}})}

function stepReferenceHTML(p,index){const mode=versionD()||NEURO_WORKED.questions[p.id]?'D':'C',text=STEP_REFERENCES[mode][p.id]?.[index]||STEP_REFERENCES.D[p.id]?.[index];if(!text)throw Error('Missing step reference '+p.id+':'+index);return `<p class="step-reference" data-step-reference="${esc(p.id)}:${index}">${rich(text)}</p>`}
