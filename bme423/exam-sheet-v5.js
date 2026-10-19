'use strict';
function v5authored(source){
 const s=String(source),slash=String.fromCharCode(92);let cursor=0,out='';
 while(cursor<s.length){
  const d=s.indexOf(slash+'[',cursor),i=s.indexOf(slash+'(',cursor);
  if(d<0&&i<0){out+=s.slice(cursor);break}
  const display=d>=0&&(i<0||d<i),start=display?d:i;
  const end=s.indexOf(slash+(display?']':')'),start+2);
  if(end<0)throw new Error('Unclosed authored math');
  const rendered=katex.renderToString(s.slice(start+2,end),{displayMode:display,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false});
  out+=s.slice(cursor,start)+(display?'<div class="v5-math">'+rendered+'</div>':rendered);
  cursor=end+2;
 }
 return out;
}
function v5code(b){const l=b.location;return `P${l.page}·C${l.column}·B${l.box}`}
function v5box(k){const b=V5_PACK.blocks[k];return `<section class="v5-box" id="v5-${k}" data-key="${k}" data-code="${v5code(b)}"><h3>${b.title}</h3>${v5authored(b.html)}</section>`}
function renderExamSheetV5(){return V5_PACK.sheets.map((s,i)=>`<article class="v5-page ${s.bottom?'v5-with-bottom':''}" data-page="${i+1}"><div class="v5-columns">${s.columns.map((keys,c)=>`<div class="v5-column" data-column="${c+1}">${keys.map(v5box).join('')}</div>`).join('')}</div>${s.bottom?`<div class="v5-bottom">${s.bottom.map(c=>`<div style="grid-column:${c.column}/span ${c.span}" data-column="${c.column}">${c.keys.map(v5box).join('')}</div>`).join('')}</div>`:''}</article>`).join('')}
document.querySelector('#notes').innerHTML=renderExamSheetV5();
