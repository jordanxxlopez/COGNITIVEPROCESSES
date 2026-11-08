// Module 6 (Short-Term Memory, studio "09") stimuli. White background, 1280x720. Ids prefixed L6-.
(function(){
const W=1280,H=720,CX=W/2,CY=H/2, INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a', RED='#d32f2f', GREY='#9aa5ae';
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const rect=(c,x,y,w,h)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
const dot=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
const card=(title,lines)=>{ txt(title,CX,170,40,ACC,'700'); lines.forEach((s,i)=>txt(s,CX,300+i*52,28,SOFT,'500')); };
const READY=(t)=>({t:t,hz:1000,dur:0.15});
const I=4000, F=5000;
function make(id, dur, events, intro, body){
  window.sceneList[id]={duration:F+dur, events:[READY(F-300)].concat(events||[]), draw:(t)=>{
    if(t<I){ card(intro[0],intro[1]); return; }
    if(t<F){ txt('+',CX,CY,72,INK,'400'); return; }
    body(t-F);
  }};
}
const LETS=['X','M','L','T','A','F','N','B','C','D','Z','K'];
const gridL=(letters,cols,rows,dx,dy,px)=>{ const x0=CX-(cols-1)*dx/2, y0=CY-(rows-1)*dy/2; letters.forEach((s,i)=>txt(s,x0+(i%cols)*dx,y0+Math.floor(i/cols)*dy,px)); };

// Sperling (1960): 12-letter array for 50 ms; whole report, immediate partial (tone) and delayed partial (1 s blank, then tone).
make('L6-sperling-whole',5000,[],['Sperling (1960) · Whole report',['Twelve letters flash for 50 ms.','Report as many letters as you can.']],(s)=>{
  if(s<50) gridL(LETS,4,3,230,170,120); else if(s>1000) txt('Report all the letters you remember',CX,CY+300,30,SOFT,'500'); });
make('L6-sperling-partial',5000,[{t:F+50,hz:650,dur:0.5}],['Sperling (1960) · Immediate partial report',['Twelve letters flash for 50 ms.','A tone then names the row to report.']],(s)=>{
  if(s<50) gridL(LETS,4,3,230,170,120); });
make('L6-sperling-delayed',5000,[{t:F+1050,hz:650,dur:0.5}],['Sperling (1960) · Delayed partial report',['Twelve letters flash for 50 ms.','A one-second blank, then a tone names the row.']],(s)=>{
  if(s<50) gridL(LETS,4,3,230,170,120); });

// Brown–Peterson: a trigram then a number, count-back, recall. Short (3 s) and long (18 s) delays.
const bp=(delay)=>(s)=>{ if(s<1000) txt('F   Z   L',CX,CY,96); else if(s<2000) txt('45',CX,CY,96); else if(s<2000+delay) txt('Count backwards aloud',CX,CY,30,SOFT,'500'); else txt('Recall the three letters',CX,CY,36,ACC,'600'); };
make('L6-brown-peterson-3s',7000,[],['Brown (1958) · Peterson & Peterson (1959)',['Three letters, then a number.','Count backwards aloud, then recall the letters. Delay: 3 seconds.']],bp(3000));
make('L6-brown-peterson-18s',25000,[],['Brown (1958) · Peterson & Peterson (1959)',['Three letters, then a number.','Count backwards aloud, then recall the letters. Delay: 18 seconds.']],bp(18000));

// Digit span: rows of digits grow one digit at a time; each row is shown for 1 s.
const DS=['5','5','5','1','0','0','5','7','2','9','4','1','8','3'];
make('L6-digit-span',14000,[],['Digit span',['Digits appear in rows that get longer.','Recall each row in order as soon as it disappears.']],(s)=>{
  let n=3, acc=0, k=0; const rows=[]; for(let len=3; len<=7; len++){ rows.push(DS.slice(0,len)); }
  const idx=Math.floor(s/2000); const row=rows[Math.min(idx,rows.length-1)];
  if(idx<rows.length) txt(row.join('  '),CX,CY,64,INK,'700');
  else txt('Longest row recalled correctly is your digit span',CX,CY,30,SOFT,'500'); });

// Change detection (Luck & Vogel style): S1 100 ms, 900 ms gap, S2 2000 ms; one square may change.
function cd(n,change){ return (s)=>{
  const cols=['#e53935','#1e88e5','#43a047','#fdd835','#8e24aa','#fb8c00','#00acc1'];
  const slots=[[-260,-120],[0,-120],[260,-120],[-260,120],[0,120],[260,120]].slice(0,n);
  const base=slots.map((_,i)=>cols[(i*3+2)%cols.length]);
  const alt=cols[(cols.indexOf(base[0])+2)%cols.length];
  const draw=(cs)=>slots.forEach(([x,y],i)=>rect(cs[i],CX+x-60,CY+y-60,120,120));
  if(s<100) draw(base); else if(s<1000) return; else if(s<3000) draw(change? base.map((c,i)=>i===0?alt:c) : base);
};}
make('L6-change-4-same',3000,[{t:F+100,hz:1200,dur:0.02},{t:F+1000,hz:1200,dur:0.02}],['Visual short-term memory · Change detection',['Remember the colours of the squares.','Then say whether the test display is the same.']],cd(4,false));
make('L6-change-4-change',3000,[{t:F+100,hz:1200,dur:0.02},{t:F+1000,hz:1200,dur:0.02}],['Visual short-term memory · Change detection',['Remember the colours of the squares.','Then say whether one square changed.']],cd(4,true));
make('L6-change-6-change',3000,[{t:F+100,hz:1200,dur:0.02},{t:F+1000,hz:1200,dur:0.02}],['Visual short-term memory · Change detection',['Six squares this time.','Then say whether one square changed.']],cd(6,true));

// Chunking: the same 12 digits, unchunked versus grouped into meaningful chunks.
const DIG='5 5 5 1 0 0 5 7 2 9 4 1'.split(' ');
make('L6-chunking-digits',12000,[],['Chunking',['The same digits, first as single digits, then grouped.']],(s)=>{
  if(s<4000) txt(DIG.join(' '),CX,CY,56,INK,'700');
  else if(s<8000) txt('555 · 100 · 572 · 941',CX,CY,56,ACC,'700');
  else txt('Grouping into chunks makes twelve digits easier to hold',CX,CY,30,SOFT,'500'); });

// Recoding: letters recoded into familiar chunks (FBI CIA IBM).
make('L6-recoding',10000,[],['Recoding',['Recode the letters into familiar chunks before storing them.']],(s)=>{
  if(s<3000) txt('F B I  C I A  I B M  U S A',CX,CY,44,INK,'700');
  else if(s<6000) txt('FBI  CIA  IBM  USA',CX,CY,56,ACC,'700');
  else txt('Four chunks instead of thirteen letters',CX,CY,30,SOFT,'500'); });

// Sensory memory: persistence of vision — a dot moves and leaves a fading trail.
make('L6-persistence',6000,[],['Persistence of vision',['A moving point leaves a brief trail.']],(s)=>{
  const n=40; for(let i=0;i<n;i++){ const t2=s-i*20; if(t2<0) continue; const x=160+(t2/3000)*960; if(x>1120) continue; dot(x,CY,10,'rgba(30,90,138,'+(1-i/n).toFixed(2)+')'); } });

// Interference (retroactive / proactive): the same cue, two lists.
make('L6-interference',8000,[],['Interference theories',['Learn a list, then a second list.','Recall the first list after the second.']],(s)=>{
  if(s<2500) txt('bridge  river  table  apple',CX,CY,40,INK,'600');
  else if(s<5000) txt('window  candle  paper  garden',CX,CY,40,ACC,'600');
  else txt('Which list did you learn first?',CX,CY,32,SOFT,'500'); });

window.renderScene=(id,ms)=>{ const s=window.sceneList[id]; ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H); s.draw(ms); return s.duration; };
})();
