'use strict';
// All mathematics is typeset locally; no CDN or network dependency at runtime.
function texHTML(tex,display=false){return katex.renderToString(tex,{displayMode:display,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false})}
function inlineMath(tex){return texHTML(tex,false)}
function displayMath(tex){return '<div class="math-display">'+texHTML(tex,true)+'</div>'}
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
function formulaHTML(l){return (V2.formulas[l.id]||[]).map(displayMath).join('')}
function equationRules(keys=[]){return keys.map(key=>{const r=EQUATION_GUIDE.rules[key];if(!r)throw Error('Missing equation rule '+key);return `<div class="equation-rule" data-equation-rule="${esc(key)}">${r.tex.map(displayMath).join('')}<p class="symbol-key">${rich(r.symbols)}</p></div>`}).join('')}
function teachingParagraphs(paragraphs,placements={}){return paragraphs.map((p,i)=>`<p>${rich(p)}</p>${equationRules(placements[i]||[])}`).join('')}
function stepEquations(p,index){const steps=EQUATION_GUIDE.problems[p.id];if(!steps||!steps[index])throw Error('Unreviewed calculation step '+p.id+':'+index);return equationRules(steps[index])}
function sourceWorked(key){const b=V2.blocks[key];let index=0;const html=b.html.replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_,d,i)=>d!==undefined?equationRules(EQUATION_GUIDE.worked[key]?.[index++]||[])+displayMath(d):inlineMath(i));return `<div class="source-worked" data-worked-block="${esc(key)}"><h4>${esc(b.title)}</h4>${html}<p class="caption">${esc(b.source)}</p></div>`}
function quizExplanation(q){const p=q.problem&&PROB.get(q.problem);return `<div class="quiz-explanation">${!p?equationRules(EQUATION_GUIDE.questions[q.id]||[]):''}<p>${rich(q.why)}</p>${p?`<details class="quiz-calculation" open><summary>Equation + worked solution</summary>${stepsHTML(p)}</details>`:''}</div>`}
function renderNotesV2(){const pack=typeof SHEET_PACK==='undefined'?V2:SHEET_PACK;return pack.sheets.map((s,i)=>`<article class="sheet-v2"><header><strong>BME423 · MIDTERM</strong><span>Side ${i+1}/4 · ${esc(s.title.slice(4))}</span></header><div class="notes-columns">${s.columns.map(keys=>`<div class="notes-column">${keys.map(k=>{const b=pack.blocks[k];return `<section class="compact-block" data-block="${k}"><h3>${esc(b.title)}</h3>${authored(b.html)}</section>`}).join('')}</div>`).join('')}</div></article>`).join('')}
function fitNotesMath(){document.querySelectorAll('.sheet-v2 .math-display').forEach(el=>{el.style.fontSize='';const span=el.querySelector('.katex-html');if(!span)return;const width=span.getBoundingClientRect().width,available=el.clientWidth;if(width>available&&available>0)el.style.fontSize=(Math.min(1,available/width)*100).toFixed(2)+'%'})}
