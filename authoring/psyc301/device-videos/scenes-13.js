// Studio 13 (Judgment, Decision Making and Reasoning, slides 12:x) and studio 14 (Part II, slides 13:x). White background, 1280x720.
(function(){
const W=1280,H=720,CX=W/2,CY=H/2, INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a', RED='#d32f2f', BLUE='#1565c0', GREY='#9aa5ae', GREEN='#2e7d32';
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const dot=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
const rect=(c,x,y,w,h)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
const rrect=(x,y,w,h,r,stroke)=>{ctx.strokeStyle=stroke||GREY;ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.stroke();};
const card=(title,lines)=>{ txt(title,CX,170,40,ACC,'700'); lines.forEach((s,i)=>txt(s,CX,300+i*52,28,SOFT,'500')); };
const READY=(t)=>({t:t,hz:1000,dur:0.15});
const I=4000,F=5000;
const rng=(seed)=>()=>(seed=(seed*1664525+1013904223)>>>0)/4294967296;
function make(id,dur,events,intro,body){ window.sceneList[id]={duration:F+dur,events:[READY(F-300)].concat(events||[]),draw:(t)=>{
  ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  if(t<I){ card(intro[0],intro[1]); return; } if(t<F){ txt('+',CX,CY,72,INK,'400'); return; } body(t-F); }}; }

// 12:12–12:14 Hospital problem: boys and girls born each day. Large hospital ~45 births a day, small ~15. Same random draws for both.
const days=40, R=rng(11);
const dayData=[]; for(let d=0;d<days;d++){ const big=[],small=[]; for(let i=0;i<45;i++) big.push(R()<0.5?1:0); for(let i=0;i<15;i++) small.push(R()<0.5?1:0); dayData.push({big,small}); }
const frac=(a)=>a.reduce((x,y)=>x+y,0)/a.length;
make('L12-hospital-sampling',days*450+4000,[],['Hospital problem · Days with more than 60% boys',['Each day, babies are born at a large and a small hospital.','Boys are about half of all births. Which hospital has more days above 60% boys?']],(s)=>{
  const dIdx=Math.floor(s/450); const k=Math.min(days-1,dIdx); let bigHi=0, smallHi=0;
  for(let d=0;d<=k;d++){ if(frac(dayData[d].big)>0.6) bigHi++; if(frac(dayData[d].small)>0.6) smallHi++; }
  txt('Large hospital (about 45 births a day)',CX-300,120,26,INK,'700'); txt('Small hospital (about 15 births a day)',CX+300,120,26,INK,'700');
  const cur=dayData[k];
  cur.big.forEach((b,i)=>dot(CX-300-180+(i%9)*40,250+Math.floor(i/9)*40,11,b?BLUE:RED));
  cur.small.forEach((b,i)=>dot(CX+300-80+(i%5)*40,250+Math.floor(i/5)*40,11,b?BLUE:RED));
  txt('Day '+(k+1)+' of '+days,CX,H-160,26,SOFT,'500');
  txt('Days above 60% boys so far: large '+bigHi+', small '+smallHi,CX,H-100,28,INK,'700');
  txt('Blue = boy, red = girl',CX,H-50,22,SOFT,'500');
});

// 12:7 Availability: words beginning with r versus words with r as the third letter.
make('L12-availability-r',12000,[],['Availability heuristic · Words with r',['Which are more common in English:','words starting with r, or words with r as the third letter?']],(s)=>{
  const a=['road','rain','red','rock','run','rose'], b=['car','bar','far','over','card','hard'];
  if(s<4000) txt(a.join('   '),CX,CY,40,INK,'700'); else if(s<8000) txt(b.join('   '),CX,CY,40,INK,'700'); else txt('Most people say the first list is more common. Count the words in each.',CX,CY,28,SOFT,'500'); });

// 12:8 Causes of death: pairs shown, which is more likely (vignette pairs).
make('L12-causes-of-death',9000,[],['Availability heuristic · Causes of death',['Two causes of death are shown in each pair.','Which one kills more people in the United States?']],(s)=>{
  const pairs=[['Homicide','Diabetes'],['Tornado','Asthma'],['Flood','Stroke']];
  const k=Math.min(pairs.length-1,Math.floor(s/3000)); const [a,b]=pairs[k];
  txt(a,CX-240,CY,44,INK,'700'); txt('or',CX,CY,30,SOFT,'500'); txt(b,CX+240,CY,44,INK,'700');
  txt('Pair '+(k+1)+' of '+pairs.length,CX,H-70,26,SOFT,'500'); });

// 12:22 Convoy dilemma: a convoy must reroute; a refugee camp fills up; count lives saved versus rerouting.
make('L12-convoy',12000,[],['Ritov and Baron · Convoy dilemma',['A convoy of food trucks heads to a refugee camp.','Rerouting saves more lives overall, but it means one road causes deaths.']],(s)=>{
  const ax=CX-420, ay=CY, bx=CX+420;
  txt('Refugee camp',ax,ay-120,26,INK,'700'); txt('Second camp',bx,ay-120,26,INK,'700');
  dot(ax,ay,22,BLUE); dot(bx,ay,22,GREY);
  ctx.strokeStyle=GREY; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,ay); ctx.stroke();
  if(s>3000){ const u=Math.min(1,(s-3000)/3000); ctx.strokeStyle=RED; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(CX-380,ay+160); ctx.lineTo(CX-380+u*760,ay+160); ctx.stroke(); txt('Route 1: one person on the road is killed',CX,ay+220,26,RED,'600'); }
  if(s>7000) txt('Route 2: the detour kills more people elsewhere, so fewer lives are saved overall',CX,H-60,24,SOFT,'500'); });

// 12:20 Jellybean study (white): bowl A 1 red in 10; bowl B 7 red in 100. A red bean wins one dollar.
make('L12-jellybeans',9000,[],['Denes-Raj & Epstein · Jellybean choice',['Bowl A: 1 red bean in 10. Bowl B: 7 red beans in 100.','Pick a bowl. A red bean wins one dollar.']],(s)=>{
  const bead=(x,y,red)=>dot(x,y,9,red?RED:'#cfc7b8');
  for(let i=0;i<10;i++) bead(CX-300+(i%5)*30-60,250+Math.floor(i/5)*30,i<1);
  for(let i=0;i<100;i++) bead(CX+300+(i%10)*30-135,130+Math.floor(i/10)*30,i<7);
  txt('Bowl A',CX-300,CY+170,30,INK,'700'); txt('Bowl B',CX+300,CY+170,30,INK,'700'); });

// 12:9 Representativeness: a profile is judged by how well it matches a stereotype, not by the base rate.
make('L12-linda',9000,[],['Representativeness · The Linda problem',['Read the description, then judge which statement is more probable.']],(s)=>{
  if(s<5000) txt('Linda is 31, single, outspoken and very bright. She majored in philosophy.',CX,CY-40,30,INK,'600');
  else { txt('Which is more probable?',CX,CY-60,30,SOFT,'500'); txt('Linda is a bank teller.',CX,CY+10,30,INK,'700'); txt('Linda is a bank teller and active in the feminist movement.',CX,CY+70,30,INK,'700'); } });

// 13:10–13:12 Disease problem: 600 people; program A saves 200 for sure; program B 1/3 chance all 600 saved.
make('L13-disease-gain',12000,[],['Tversky & Kahneman · Gain frame',['A disease will kill 600 people.','Two programs are proposed. Program A and program B.']],(s)=>{
  const saved=Math.min(200,Math.floor(Math.max(0,s-1000)/20));
  for(let i=0;i<600;i++){ const r=Math.floor(i/30), c=i%30; const x=CX-360+c*24, y=170+r*20; const isSaved=i<saved; dot(x,y,6,isSaved?BLUE:'#dbe2e8'); }
  if(s>6000) txt('Program A: 200 people saved for sure',CX,H-100,28,INK,'700');
  if(s>8000) txt('Program B: 1 in 3 chance all 600 saved, 2 in 3 chance none saved',CX,H-50,24,SOFT,'500'); });
make('L13-disease-loss',12000,[],['Tversky & Kahneman · Loss frame',['The same 600 people, described by deaths.','Program A: 400 die for sure. Program B: 1 in 3 nobody dies.']],(s)=>{
  const dead=Math.min(400,Math.floor(Math.max(0,s-1000)/20));
  for(let i=0;i<600;i++){ const r=Math.floor(i/30), c=i%30; const x=CX-360+c*24, y=170+r*20; dot(x,y,6,i<dead?RED:'#dbe2e8'); }
  if(s>6000) txt('Program A: 400 people die for sure',CX,H-100,28,INK,'700');
  if(s>8000) txt('Program B: 1 in 3 nobody dies, 2 in 3 all 600 die',CX,H-50,24,SOFT,'500'); });

// 13:14–13:15 Ultimatum game: proposer splits $10; responder accepts or rejects (both get nothing if rejected).
make('L13-ultimatum',12000,[],['Sanfey and coworkers · Ultimatum game',['A proposer splits ten dollars with a responder.','The responder accepts the split, or rejects it and both get nothing.']],(s)=>{
  const offer=s<4000?2:s<8000?5:2;
  txt('Proposer offers the responder: $'+offer+' of $10',CX,130,30,INK,'700');
  rect(BLUE,CX-300,300,(10-offer)/10*600,60); rect(RED,CX-300+(10-offer)/10*600,300,offer/10*600,60);
  txt('Proposer keeps $'+(10-offer),CX-300+(10-offer)/20*600,380,24,BLUE,'600'); txt('Responder: $'+offer,CX-300+(10-offer)/10*600+offer/20*600,380,24,RED,'600');
  if(s>8000) txt(offer<=2?'Low offers are often rejected, even at a cost.':'Fair offers are usually accepted.',CX,H-80,28,SOFT,'500'); });

// 13:8 Organ donation: opt-in (box to tick) versus opt-out (box already ticked).
make('L13-organ-donor',9000,[],['Johnson & Goldstein · Organ donation',['Two forms ask whether to be an organ donor.','Which default changes the most decisions?']],(s)=>{
  const bx=(x,label,checked)=>{ rrect(x,250,40,40,6,INK); if(checked){ ctx.strokeStyle=GREEN; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(x+8,270); ctx.lineTo(x+18,282); ctx.lineTo(x+34,256); ctx.stroke(); } txt(label,x+60,270,26,INK,'500','left'); };
  txt('Opt-in: tick the box to join',CX-300,190,28,INK,'700');
  bx(CX-300,'Yes, I want to be a donor',false);
  txt('Opt-out: untick the box to leave',CX+300,190,28,INK,'700');
  bx(CX+300-40,'Yes, I am a donor (pre-ticked)',true);
  if(s>3000) txt('Most people keep whatever box is already ticked.',CX,H-100,28,ACC,'600'); });

// 13:26–13:27 Wason four-card problem: cards E, K, 4, 7; rule: if a vowel, then an even number.
make('L13-wason-cards',12000,[],['Wason four-card problem',['Each card has a letter on one side and a number on the other.','Rule: if a card has a vowel on one side, it has an even number on the other.']],(s)=>{
  const cards=['E','K','4','7']; const cw=130, ch=190, gap=30, x0=CX-(4*cw+3*gap)/2;
  cards.forEach((c,i)=>{ const x=x0+i*(cw+gap), y=CY-ch/2; rect('#ffffff',x,y,cw,ch); rrect(x,y,cw,ch,12,INK); txt(c,x+cw/2,y+ch/2,80,INK,'700'); });
  if(s>5000){ const sel=[0,3]; sel.forEach(i=>{ const x=x0+i*(cw+gap); ctx.strokeStyle=GREEN; ctx.lineWidth=8; ctx.strokeRect(x-6,CY-ch/2-6,cw+12,ch+12); }); txt('Test the cards that could break the rule: E and 7',CX,H-80,26,GREEN,'700'); } });

// 13:4 Kermer and colleagues: a coin flip decides a bonus; expected emotion versus the actual one.
make('L13-coin-flip',10000,[],['Kermer and colleagues · Expected emotions',['You may win or lose a bonus on a coin flip.','How do you expect to feel after the flip?']],(s)=>{
  const flip=s>3000; const face=(Math.floor(s/120)%2===0)?'H':'T';
  dot(CX,CY,110,'#ffd54f'); txt(flip?(s>6000?'Lost':'Won'):face,CX,CY,50,INK,'700');
  txt('Heads: win $5. Tails: lose $3. (Kermer et al., 2006)',CX,H-130,28,INK,'700');
  if(s>7000) txt('Compare the expected feeling with the actual one.',CX,H-80,26,SOFT,'500'); });

// 13:21–13:25 Conditional syllogisms: four forms with an example (text).
make('L13-syllogisms',15000,[],['Conditional syllogisms · Four forms',['If I study, I get a good grade. Which conclusions follow?']],(s)=>{
  const forms=[['Modus ponens: I studied.','So I get a good grade.','Valid'],['Modus tollens: I did not get a good grade.','So I did not study.','Valid'],['Affirming the consequent: I got a good grade.','So I studied.','Not valid'],['Denying the antecedent: I did not study.','So I did not get a good grade.','Not valid']];
  const k=Math.min(3,Math.floor(s/3500)); const [a,b,v]=forms[k];
  txt(a,CX,CY-70,34,INK,'600'); txt(b,CX,CY,34,INK,'600'); txt(v,CX,CY+90,36,v==='Valid'?GREEN:RED,'700');
  txt('Form '+(k+1)+' of 4',CX,H-60,24,SOFT,'500'); });
})();
