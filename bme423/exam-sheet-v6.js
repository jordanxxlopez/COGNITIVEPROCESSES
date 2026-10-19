'use strict';
function renderV6Math(source){
 const s=String(source),slash=String.fromCharCode(92);let cursor=0,out='';
 while(cursor<s.length){
  const d=s.indexOf(slash+'[',cursor),i=s.indexOf(slash+'(',cursor);
  if(d<0&&i<0){out+=s.slice(cursor);break}
  const display=d>=0&&(i<0||d<i),start=display?d:i;
  const end=s.indexOf(slash+(display?']':')'),start+2);
  if(end<0)throw new Error('Unclosed V6 math');
  const rendered=katex.renderToString(s.slice(start+2,end),{displayMode:display,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false});
  out+=s.slice(cursor,start)+(display?'<div class="v6-math">'+rendered+'</div>':rendered);
  cursor=end+2;
 }
 return out;
}
document.querySelector('#notes').innerHTML=V6_PACK.sheets.map((cols,pi)=>
 `<article class="v6-page" data-page="${pi+1}"><div class="v6-columns">${cols.map((keys,ci)=>
 `<div class="v6-column" data-column="${ci+1}">${keys.map(k=>{
  const b=V6_PACK.blocks[k];return `<section class="v6-box" id="v6-${k}" data-key="${k}"><h3>${b.title}</h3>${renderV6Math(b.html)}</section>`;
 }).join('')}</div>`).join('')}</div></article>`).join('');
