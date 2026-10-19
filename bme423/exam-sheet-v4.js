'use strict';
function v4authored(source){
 const s=String(source),slash=String.fromCharCode(92);let cursor=0,out='';
 while(cursor<s.length){
  const d=s.indexOf(slash+'[',cursor),i=s.indexOf(slash+'(',cursor);
  if(d<0&&i<0){out+=s.slice(cursor);break}
  const display=d>=0&&(i<0||d<i),start=display?d:i;
  const end=s.indexOf(slash+(display?']':')'),start+2);
  if(end<0)throw new Error('Unclosed authored math');
  const rendered=katex.renderToString(s.slice(start+2,end),{displayMode:display,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false});
  out+=s.slice(cursor,start)+(display?'<div class="v4-math">'+rendered+'</div>':rendered);
  cursor=end+2;
 }
 return out;
}
function v4code(b){const l=b.location;return `P${l.page}·C${l.column}·B${l.box}`}
function v4box(k){const b=V4_PACK.blocks[k];return `<section class="v4-box" id="v4-${k}" data-key="${k}" data-code="${v4code(b)}"><h3><span>${v4code(b)}</span> ${b.title}</h3>${v4authored(b.html)}</section>`}
function renderExamSheetV4(){return V4_PACK.sheets.map((s,i)=>`<article class="v4-page ${s.bottom?'v4-with-bottom':''}" data-page="${i+1}">${i===0?V4_PACK.router:''}<div class="v4-columns">${s.columns.map((keys,c)=>`<div class="v4-column" data-column="${c+1}">${keys.map(v4box).join('')}</div>`).join('')}</div>${s.bottom?`<div class="v4-bottom">${s.bottom.map(c=>`<div style="grid-column:${c.column}/span ${c.span}" data-column="${c.column}">${c.keys.map(v4box).join('')}</div>`).join('')}</div>`:''}</article>`).join('')}
document.querySelector('#notes').innerHTML=renderExamSheetV4();
