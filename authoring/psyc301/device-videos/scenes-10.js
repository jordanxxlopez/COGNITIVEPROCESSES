window.CHECKER_TILING = {"pairs": [[[0, 2], [1, 2]], [[0, 4], [0, 3]], [[0, 6], [0, 5]], [[1, 1], [2, 1]], [[1, 3], [1, 4]], [[1, 5], [1, 6]], [[1, 7], [0, 7]], [[2, 0], [3, 0]], [[2, 2], [2, 3]], [[2, 4], [3, 4]], [[2, 6], [2, 5]], [[3, 1], [3, 2]], [[3, 3], [4, 3]], [[3, 5], [3, 6]], [[3, 7], [2, 7]], [[4, 0], [4, 1]], [[4, 2], [5, 2]], [[4, 4], [4, 5]], [[4, 6], [4, 7]], [[5, 1], [6, 1]], [[5, 3], [5, 4]], [[5, 5], [6, 5]], [[5, 7], [5, 6]], [[6, 0], [5, 0]], [[6, 2], [6, 3]], [[6, 4], [7, 4]], [[6, 6], [6, 7]], [[7, 1], [7, 0]], [[7, 3], [7, 2]], [[7, 5], [7, 6]]], "removed": [[7, 7], [0, 0]], "uncovered": [[0, 1], [1, 0]]};
// Mutilated checkerboard: why 31 dominoes cannot cover the board. White background, 1280x720.
(function(){
const W=1280,H=720, OX=120, OY=120, CS=60, N=8;
const INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a', RED='#d32f2f', LIGHTC='#f4efe6', DARKC='#8c8c8c';
const cellC=(r,c)=> (r+c)%2===0 ? LIGHTC : DARKC;
const rem=new Set(CHECKER_TILING.removed.map(p=>p.join(',')));
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const board=(s)=>{ for(let r=0;r<N;r++)for(let c=0;c<N;c++){ const k=r+','+c; const gone=rem.has(k)&&s>=2000;
  ctx.fillStyle=gone?'#ffffff':cellC(r,c); ctx.fillRect(OX+c*CS,OY+r*CS,CS,CS); ctx.strokeStyle='#c9ced3'; ctx.lineWidth=1; ctx.strokeRect(OX+c*CS,OY+r*CS,CS,CS);
  if(gone){ txt('×',OX+c*CS+CS/2,OY+r*CS+CS/2,36,RED,'700'); } } };
const tally=(light,dark,title)=>{ txt(title,700,160,28,SOFT,'500','left'); txt(`Light squares: ${light}`,700,240,34,INK,'600','left'); txt(`Dark squares: ${dark}`,700,290,34,INK,'600','left'); };
const domino=(a,b,alpha)=>{ const x=OX+Math.min(a[1],b[1])*CS, y=OY+Math.min(a[0],b[0])*CS; const w=(a[0]===b[0])?2*CS:CS, h=(a[0]===b[0])?CS:2*CS;
  ctx.fillStyle=`rgba(30,90,138,${alpha})`; ctx.beginPath(); ctx.roundRect(x+5,y+5,w-10,h-10,10); ctx.fill(); };
const scene={ duration: 5000+6000+30*600+4000, events:[{t:5000-300,hz:1000,dur:0.15}],
 draw:(t)=>{
  ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  if(t<4000){ txt('Mutilated checkerboard · Why the dominoes cannot pair',W/2,110,40,ACC,'700');
    ['An 8 × 8 board has two colours. Remove two opposite corners.','Each domino covers exactly two adjacent squares.','Can 31 dominoes cover the remaining 62 squares?'].forEach((s,i)=>txt(s,W/2,250+i*50,28,SOFT,'500'));
    return; }
  if(t<5000){ board(0); return; }
  const s=t-5000;
  txt('Mutilated checkerboard',OX,70,30,ACC,'700','left');
  if(s<2000){ board(0); tally(32,32,'Start: the full board'); return; }
  if(s<4000){ board(s); tally(30,32,'Remove two opposite corners (both light)'); return; }
  board(s);
  if(s<6000){ txt('Each domino covers one light and one dark square',700,400,28,INK,'600','left'); const d=CHECKER_TILING.pairs[0]; domino(d[0],d[1],0.55); return; }
  // placing dominoes one by one, 600 ms each
  const k=Math.min(CHECKER_TILING.pairs.length,Math.floor((s-6000)/600));
  let lightLeft=30, darkLeft=32; CHECKER_TILING.pairs.slice(0,k).forEach(([a,b])=>domino(a,b,0.55)); lightLeft-=k; darkLeft-=k;
  txt('Placing dominoes',700,160,28,SOFT,'500','left');
  txt(`Dominoes placed: ${k}`,700,240,34,INK,'600','left');
  txt(`Light left uncovered: ${lightLeft}`,700,290,34,INK,'600','left');
  txt(`Dark left uncovered: ${darkLeft}`,700,340,34,INK,'600','left');
  const end=6000+30*600;
  if(s>=end){ CHECKER_TILING.uncovered.forEach(([r,c])=>{ ctx.strokeStyle=RED; ctx.lineWidth=6; ctx.strokeRect(OX+c*CS+3,OY+r*CS+3,CS-6,CS-6); });
    txt('Each domino covers 1 light + 1 dark.',700,430,26,INK,'600','left');
    txt('All 30 light squares are now paired.',700,475,26,INK,'600','left');
    txt('The 2 dark squares left (red) cannot pair.',700,520,26,RED,'600','left'); txt('So 31 dominoes cannot cover the board.',700,565,26,RED,'700','left'); }
 }};
window.sceneList['L10-checker-why']=scene;
const prev=window.renderScene; window.renderScene=(id,ms)=>{ if(id==='L10-checker-why'){ ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H); scene.draw(ms); return scene.duration; } return prev(id,ms); };
})();
