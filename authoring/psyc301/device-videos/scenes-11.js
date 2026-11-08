const TILE_PATH = [[1, 5, 4, 8, 0, 2, 6, 3, 7], [1, 5, 4, 8, 3, 2, 6, 0, 7], [1, 5, 4, 8, 3, 2, 6, 7, 0], [1, 5, 4, 8, 3, 0, 6, 7, 2], [1, 5, 0, 8, 3, 4, 6, 7, 2], [1, 0, 5, 8, 3, 4, 6, 7, 2], [1, 3, 5, 8, 0, 4, 6, 7, 2], [1, 3, 5, 8, 7, 4, 6, 0, 2], [1, 3, 5, 8, 7, 4, 0, 6, 2], [1, 3, 5, 0, 7, 4, 8, 6, 2], [1, 3, 5, 7, 0, 4, 8, 6, 2], [1, 3, 5, 7, 4, 0, 8, 6, 2], [1, 3, 5, 7, 4, 2, 8, 6, 0], [1, 3, 5, 7, 4, 2, 8, 0, 6], [1, 3, 5, 7, 4, 2, 0, 8, 6], [1, 3, 5, 0, 4, 2, 7, 8, 6], [1, 3, 5, 4, 0, 2, 7, 8, 6], [1, 3, 5, 4, 2, 0, 7, 8, 6], [1, 3, 0, 4, 2, 5, 7, 8, 6], [1, 0, 3, 4, 2, 5, 7, 8, 6], [1, 2, 3, 4, 0, 5, 7, 8, 6], [1, 2, 3, 4, 5, 0, 7, 8, 6], [1, 2, 3, 4, 5, 6, 7, 8, 0]];
(function(){
const W=1280,H=720, INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a', RED='#d32f2f', TILE='#ffffff', GRID='#37474f';
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const card=(title,lines)=>{ txt(title,W/2,170,40,ACC,'700'); lines.forEach((s,i)=>txt(s,W/2,300+i*52,28,SOFT,'500')); };
// Sliding-tile board: 3x3 tiles, blank = 0
const boardAt=(bx,by,st,cs,label)=>{ for(let i=0;i<9;i++){ const r=Math.floor(i/3), c=i%3; const v=st[i];
   ctx.fillStyle = v===0 ? '#ffffff' : '#e8edf2'; ctx.fillRect(bx+c*cs,by+r*cs,cs,cs);
   ctx.strokeStyle=GRID; ctx.lineWidth=3; ctx.strokeRect(bx+c*cs,by+r*cs,cs,cs);
   if(v) txt(String(v),bx+c*cs+cs/2,by+r*cs+cs/2,cs*0.5,INK,'700'); }
   txt(label,bx+1.5*cs,by+3*cs+34,28,SOFT,'500'); };
const tileScene={ duration: 5000+5000+22*700+3000, events:[{t:4700,hz:1000,dur:0.15}], draw:(t)=>{
  if(t<4000){ card('Sliding-tile puzzle · Problem space',['Slide the tiles one at a time into the blank space.','Get from the scrambled start to the ordered goal in the fewest moves.']); return; }
  if(t<5000){ txt('+',W/2,H/2,72,INK,'400'); return; }
  const s=t-5000; const cs=110, bx=W/2-cs*1.5, by=120;
  if(s<5000){ boardAt(bx,by,TILE_PATH[0],cs,'Start (scrambled)'); txt('Moves: 0',W/2,H-80,30,SOFT,'500'); return; }
  const k=Math.min(TILE_PATH.length-1, Math.floor((s-5000)/700));
  boardAt(bx,by,TILE_PATH[k],cs,k===TILE_PATH.length-1?'Goal (ordered)':'Current state');
  txt('Moves: '+k+' of '+(TILE_PATH.length-1),W/2,H-80,30,SOFT,'500');
  if(k===TILE_PATH.length-1) txt('Shortest solution: 22 moves',W/2,H-30,28,ACC,'700');
}};
window.sceneList['L10-tile-puzzle']=tileScene;

// Full 8x8 checkerboard covered by 32 dominoes (a perfect tiling exists). Pairs computed in Python (checker-full.json).
const FULL = window.CHECKER_FULL || null;
const cellsOK = (r,c)=> true;
const drawBoard=(ox,oy,cs,colour)=>{ for(let r=0;r<8;r++)for(let c=0;c<8;c++){ ctx.fillStyle=((r+c)%2===0)?'#f4efe6':'#8c8c8c'; ctx.fillRect(ox+c*cs,oy+r*cs,cs,cs);} };
const dom=(a,b,cs,ox,oy,alpha)=>{ const x=ox+Math.min(a[1],b[1])*cs, y=oy+Math.min(a[0],b[0])*cs; const w=(a[0]===b[0])?2*cs:cs, h=(a[0]===b[0])?cs:2*cs; ctx.fillStyle=`rgba(30,90,138,${alpha})`; ctx.beginPath(); ctx.roundRect(x+5,y+5,w-10,h-10,10); ctx.fill(); };
const L10 = window.CHECKER_TILING; // mutilated pairs from earlier (used only for reference)
window.sceneList['L10-checker-conditions']={ duration: 5000+3*2500+3000, events:[{t:4700,hz:1000,dur:0.15}], draw:(t)=>{
  if(t<4000){ card('Mutilated checkerboard · Conditions',['Three versions of the same board, with different information.','Each domino covers two adjacent squares. Which conditions make pairing easy?']); return; }
  if(t<5000){ txt('+',W/2,H/2,72,INK,'400'); return; }
  const s=t-5000; const cs=44; const ox=[W/2-4*cs*2.6-40, W/2-4*cs, W/2+4*cs*0.6+80][0];
  const labels=['Blank squares','Coloured squares','Bread and butter labels'];
  const k=Math.min(2, Math.floor(s/2500));
  const bx=W/2-4*cs; const by=150;
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){
    const light=((r+c)%2===0); let fillc='#ffffff';
    if(k===1) fillc = light ? '#f4efe6' : '#8c8c8c';
    ctx.fillStyle=fillc; ctx.fillRect(bx+c*cs,by+r*cs,cs,cs); ctx.strokeStyle=GRID; ctx.lineWidth=1; ctx.strokeRect(bx+c*cs,by+r*cs,cs,cs);
    if(k===2) txt(light?'bread':'butter',bx+c*cs+cs/2,by+r*cs+cs/2,11,INK,'600');
  }
  txt(labels[k],W/2,by+8*cs+40,32,INK,'700');
  txt(k===0?'No colour or label: the pairing constraint is hidden.':k===1?'Colour shows which squares differ.':'Labels make the one-bread, one-butter rule available.',W/2,H-60,26,SOFT,'500');
}};
})();
