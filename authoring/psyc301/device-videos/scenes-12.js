// Studio 12 (Problem Solving and Reasoning Part II, slides 11:x). White background, 1280x720.
(function(){
const W=1280,H=720,CX=W/2,CY=H/2, INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a', RED='#d32f2f', BLUE='#1565c0', GREY='#9aa5ae';
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const dot=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
const line=(a,b,c,w)=>{ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();};
const card=(title,lines)=>{ txt(title,CX,170,40,ACC,'700'); lines.forEach((s,i)=>txt(s,CX,300+i*52,28,SOFT,'500')); };
const READY=(t)=>({t:t,hz:1000,dur:0.15});
const I=4000,F=5000;
function make(id,dur,events,intro,body){ window.sceneList[id]={duration:F+dur,events:[READY(F-300)].concat(events||[]),draw:(t)=>{
  ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  if(t<I){ card(intro[0],intro[1]); return; } if(t<F){ txt('+',CX,CY,72,INK,'400'); return; } body(t-F); }}; }

// 11:3–11:5 Russian marriage problem: pairs of men and women, one of each per marriage.
function marriage(men,women,removeWomen){ return (s)=>{
  const xs=[];
  const n=men; const left=CX-300, right=CX+300;
  for(let i=0;i<n;i++){ const y=170+i*(380/(n-1||1)); const mx=left, wx=right;
    dot(mx,y,14,BLUE); const showW = (i<women);
    if(showW) dot(wx,y,14,RED);
    if(s>1500 && showW) line([mx,y],[wx,y],GREY,3); }
  txt('Men',left,130,28,BLUE,'700'); txt('Women',right,130,28,RED,'700');
  if(s>3000) txt(removeWomen ? men+' men, '+women+' women: not every man can marry' : men+' men, '+women+' women: everyone can marry',CX,H-70,28,INK,'600');
}; }
make('L11-marriage-equal',9000,[],['Russian marriage problem',['A village has equal numbers of men and women.','Each marriage pairs one man with one woman.']],marriage(8,8,false));
make('L11-marriage-unequal',9000,[],['Russian marriage problem · Analogy',['Two women are missing, so the counts no longer match.','Can every man still be paired?']],marriage(8,6,true));

// 11:6–11:8 Duncker's radiation problem and the fortress story.
const body=(cx,cy)=>{ ctx.strokeStyle='#b0bec5'; ctx.lineWidth=5; ctx.beginPath(); ctx.ellipse(cx,cy,230,300,0,0,Math.PI*2); ctx.stroke(); };
make('L11-radiation-one-ray',12000,[],['Duncker · Radiation problem',['A tumour is inside the body. A strong ray would destroy it.','It would also destroy the healthy tissue on the way.']],(s)=>{
  body(CX,CY); dot(CX,CY,30,'#8e24aa');
  if(s>2000){ const k=Math.min(1,(s-2000)/2000); ctx.strokeStyle=RED; ctx.lineWidth=12; ctx.beginPath(); ctx.moveTo(CX-260,CY); ctx.lineTo(CX-260+k*(260-30),CY); ctx.stroke(); txt('One strong ray: healthy tissue damaged on the way',CX,H-70,26,RED,'600'); } });
make('L11-radiation-many-rays',12000,[],['Duncker · Radiation problem',['Weak rays from many directions meet at the tumour.','Each ray is too weak to harm the healthy tissue.']],(s)=>{
  body(CX,CY); dot(CX,CY,30,'#8e24aa');
  const n=8; const k=Math.min(1,Math.max(0,(s-1000)/3000));
  for(let i=0;i<n;i++){ const a=i/n*Math.PI*2; const r0=330; const x0=CX+Math.cos(a)*r0*(1-0.6*k), y0=CY+Math.sin(a)*r0*(1-0.6*k)*1.3; ctx.strokeStyle=ACC; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(CX+Math.cos(a)*30,CY+Math.sin(a)*30); ctx.stroke(); }
  if(s>5000) txt('Rays converge on the tumour and add up there',CX,H-70,26,ACC,'600'); });
make('L11-fortress',12000,[],['Fortress story',['A general must capture a fortress in the middle of the country.','Every road to it is mined, so a large army cannot pass.']],(s)=>{
  const fx=CX, fy=CY; const roads=10; const k=Math.min(1,Math.max(0,(s-1000)/3500));
  for(let i=0;i<roads;i++){ const a=i/roads*Math.PI*2+0.2; const L=420; ctx.strokeStyle='#cfd8dc'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(fx+Math.cos(a)*L,fy+Math.sin(a)*L*0.8); ctx.lineTo(fx,fy); ctx.stroke();
    const px=fx+Math.cos(a)*L*(1-k*0.9), py=fy+Math.sin(a)*L*0.8*(1-k*0.9); if(s>1000) dot(px,py,10,BLUE); }
  ctx.fillStyle=INK; ctx.fillRect(fx-22,fy-22,44,44);
  if(s>5000) txt('Small groups split off and meet at the fortress together',CX,H-70,26,BLUE,'600'); });

// 11:11–11:15 Lightbulb problem: laser intensity and the fragile glass version.
make('L11-lightbulb',11000,[],['Lightbulb problem',['A tumour-like filament sits inside a fragile glass bulb.','Use a laser to fix it without breaking the glass.']],(s)=>{
  ctx.strokeStyle='#90a4ae'; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(CX,CY,180,0,Math.PI*2); ctx.stroke(); dot(CX,CY,40,'#8e24aa'); txt('filament',CX,CY+70,22,SOFT,'500');
  if(s>2000){ const k=Math.min(1,(s-2000)/1500); ctx.strokeStyle=RED; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(CX-420,CY); ctx.lineTo(CX-420+k*(420-40),CY); ctx.stroke(); txt('Strong laser: the glass would break',CX,H-70,26,RED,'600'); } });
make('L11-fragile-glass',11000,[],['Lightbulb · Fragile glass version',['The glass breaks under a strong laser.','A weak laser cannot fuse the filament. Read the solution.']],(s)=>{
  ctx.strokeStyle='#90a4ae'; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(CX,CY,180,0,Math.PI*2); ctx.stroke(); dot(CX,CY,40,'#8e24aa');
  if(s>2000) txt('Solution: many weak lasers from different directions meet at the filament',CX,H-70,26,ACC,'600'); });
make('L11-insufficient-intensity',11000,[],['Lightbulb · Insufficient intensity version',['One laser is simply not strong enough on its own.','Read the solution.']],(s)=>{
  ctx.strokeStyle='#90a4ae'; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(CX,CY,180,0,Math.PI*2); ctx.stroke(); dot(CX,CY,40,'#8e24aa');
  if(s>2000) txt('Solution: several weak lasers converge on the filament',CX,H-70,26,ACC,'600'); });

// 11:19 Chase & Simon (1973): a meaningful game position versus a random arrangement of the same pieces.
const PIECES={K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
const POS_MEAN=['r..q.rk.','pp...ppp','..n.bn..','...pp...','...P....','..NB.N..','PPP..PPP','R..Q.RK.'];
const POS_RAND=['..k.r...','.p.q..P.','P.b..r..','.n......','...N.p..','..R....B','..Q.p..P','...K.N..'];
const boardChess=(rows)=>{ const cs=60, ox=CX-4*cs, oy=CY-4*cs; for(let r=0;r<8;r++)for(let c=0;c<8;c++){ ctx.fillStyle=((r+c)%2===0)?'#f4efe6':'#b8c3cc'; ctx.fillRect(ox+c*cs,oy+r*cs,cs,cs); const ch=rows[r][c]; if(ch&&ch!=='.'){ ctx.font='46px "Apple Symbols","Arial Unicode MS",serif'; ctx.fillStyle=INK; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(PIECES[ch],ox+c*cs+cs/2,oy+r*cs+cs/2+2); } } };
make('L11-chess-meaningful',9000,[],['Chase & Simon (1973) · Chess positions',['A chess position is shown for five seconds.','Then the pieces are shown again to recall.']],(s)=>{ if(s<5000) boardChess(POS_MEAN); else txt('Recall the piece positions',CX,H-60,28,SOFT,'500'); });
make('L11-chess-random',9000,[],['Chase & Simon (1973) · Random arrangement',['The same kinds of pieces, placed at random.','Recall the positions after five seconds.']],(s)=>{ if(s<5000) boardChess(POS_RAND); else txt('Recall the piece positions',CX,H-60,28,SOFT,'500'); });

// 11:20–11:21 Chi and colleagues: two physics problems, a novice groups by surface, an expert by principle.
const incline=(x0,y0,ang,label)=>{ const L=260; ctx.strokeStyle=INK; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0+L*Math.cos(ang),y0-L*Math.sin(ang)); ctx.lineTo(x0+L*Math.cos(ang),y0); ctx.closePath(); ctx.stroke(); ctx.fillStyle='#b8c3cc'; ctx.fill(); ctx.fillStyle=INK; ctx.fillRect(x0+L*0.4*Math.cos(ang)-16,y0-L*0.4*Math.sin(ang)-36,32,32); txt(label,x0+L/2,y0+40,24,SOFT,'500'); };
make('L11-physics-sort',11000,[],['Chi and colleagues · Sorting physics problems',['Two problems involve inclined planes. Both look alike.','Decide how you would group them.']],(s)=>{
  if(s<4000){ incline(CX-420,CY+120,0.5,'Problem A: block on a 30° slope'); incline(CX+160,CY+120,0.9,'Problem B: block on a steep slope'); txt('Surface features: blocks sliding on inclined planes',CX,H-60,26,SOFT,'500'); }
  else txt('Expert: both are problems of conservation of energy. Novice: both look like sliding blocks.',CX,H-60,24,ACC,'600'); });
})();
