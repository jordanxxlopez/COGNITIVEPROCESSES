window.CHECKER_FULL_PAIRS = [[[0, 0], [1, 0]], [[0, 2], [0, 1]], [[0, 4], [0, 3]], [[0, 6], [0, 5]], [[1, 1], [1, 2]], [[1, 3], [2, 3]], [[1, 5], [1, 4]], [[1, 7], [0, 7]], [[2, 0], [2, 1]], [[2, 2], [3, 2]], [[2, 4], [2, 5]], [[2, 6], [1, 6]], [[3, 1], [4, 1]], [[3, 3], [3, 4]], [[3, 5], [3, 6]], [[3, 7], [2, 7]], [[4, 0], [3, 0]], [[4, 2], [4, 3]], [[4, 4], [5, 4]], [[4, 6], [4, 5]], [[5, 1], [5, 2]], [[5, 3], [6, 3]], [[5, 5], [5, 6]], [[5, 7], [4, 7]], [[6, 0], [5, 0]], [[6, 2], [6, 1]], [[6, 4], [6, 5]], [[6, 6], [6, 7]], [[7, 1], [7, 0]], [[7, 3], [7, 2]], [[7, 5], [7, 4]], [[7, 7], [7, 6]]];

(function(){
const W=1280,H=720, OX=120, OY=120, CS=60, INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a';
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const dom=(a,b,alpha)=>{ const x=OX+Math.min(a[1],b[1])*CS, y=OY+Math.min(a[0],b[0])*CS; const w=(a[0]===b[0])?2*CS:CS, h=(a[0]===b[0])?CS:2*CS; ctx.fillStyle=`rgba(30,90,138,${alpha})`; ctx.beginPath(); ctx.roundRect(x+5,y+5,w-10,h-10,10); ctx.fill(); };
window.sceneList['L10-checker-full']={ duration: 4000+32*400+5000, events:[{t:3700,hz:1000,dur:0.15}], draw:(t)=>{
  ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  if(t<3500){ txt('Mutilated checkerboard · The full board',W/2,110,36,ACC,'700'); ['An 8 × 8 board has 64 squares.','A full board can be covered by 32 dominoes, one pair at a time.'].forEach((s,i)=>txt(s,W/2,250+i*50,28,SOFT,'500')); return; }
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){ ctx.fillStyle=((r+c)%2===0)?'#f4efe6':'#8c8c8c'; ctx.fillRect(OX+c*CS,OY+r*CS,CS,CS); }
  const s=t-3500; const k=Math.min(32,Math.floor(s/400));
  CHECKER_FULL_PAIRS.slice(0,k).forEach(([a,b])=>dom(a,b,0.55));
  txt('Dominoes placed: '+k+' of 32',700,160,30,INK,'600','left');
  if(k===32) { txt('Every square is covered.',700,260,26,ACC,'700','left'); txt('Each domino: one light, one dark.',700,305,24,INK,'600','left'); txt('A full board can be tiled.',700,375,24,SOFT,'500','left'); txt('Remove two same-colour corners',700,420,24,SOFT,'500','left'); txt('and it cannot.',700,455,24,SOFT,'500','left'); }
}};
})();

// White-background versions of the black-background problem videos: draw the original, then invert lightness and keep hues.
(function(){
const W=1280,H=720;
const pairs=[['triangle','L10-triangle'],['two-strings','L10-two-strings'],['water-jugs','L10-water-jugs']];
// candle is drawn directly on white (colours switch on WHITE_THEME)
{ const s=window.sceneList['candle']; if(s) window.sceneList['L10-candle']={duration:s.duration, events:s.events, draw:(t)=>{ window.WHITE_THEME=true; ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H); s.draw(t); window.WHITE_THEME=false; }}; }
pairs.forEach(([src,dst])=>{
  const s=window.sceneList[src]; if(!s) return;
  window.sceneList[dst]={duration:s.duration, events:s.events, draw:(t)=>{
    ctx.fillStyle='#0b0b0c'; ctx.fillRect(0,0,W,H); s.draw(t);
    const off=document.createElement('canvas'); off.width=W; off.height=H; off.getContext('2d').drawImage(canvas,0,0);
    ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H); ctx.filter='invert(1) hue-rotate(180deg)'; ctx.drawImage(off,0,0); ctx.filter='none';
  }};
});
})();
