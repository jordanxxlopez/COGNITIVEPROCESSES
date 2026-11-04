'use strict';
function renderV7Math(source){
 const s=String(source),slash=String.fromCharCode(92);let cursor=0,out='';
 while(cursor<s.length){
  const d=s.indexOf(slash+'[',cursor),i=s.indexOf(slash+'(',cursor);
  if(d<0&&i<0){out+=s.slice(cursor);break}
  const display=d>=0&&(i<0||d<i),start=display?d:i;
  const end=s.indexOf(slash+(display?']':')'),start+2);
  if(end<0)throw new Error('Unclosed V7 math');
  const rendered=katex.renderToString(s.slice(start+2,end),{displayMode:display,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false});
  out+=s.slice(cursor,start)+(display?'<div class="v7-math">'+rendered+'</div>':rendered);
  cursor=end+2;
 }
 return out;
}
document.querySelector('#notes').innerHTML=V7_PACK.sheets.map((cols,pi)=>
 `<article class="v7-page" data-page="${pi+1}"><div class="v7-columns">${cols.map((keys,ci)=>
 `<div class="v7-column" data-column="${ci+1}">${keys.map(k=>{
  const b=V7_PACK.blocks[k];return `<section class="v7-box" id="v7-${k}" data-key="${k}"><h3>${b.title}</h3>${renderV7Math(b.html)}</section>`;
 }).join('')}</div>`).join('')}</div></article>`).join('');
