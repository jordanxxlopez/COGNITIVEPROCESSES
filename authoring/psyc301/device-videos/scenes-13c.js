// Judgment and problem-solving slides still missing videos: 12:16–12:19, 12:21, 13:2, 13:5, 13:9, 10:3–10:4. White background.
(function(){
const W=1280,H=720,CX=W/2,CY=H/2, INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a', RED='#d32f2f', BLUE='#1565c0', GREY='#9aa5ae', GREEN='#2e7d32';
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const rect=(c,x,y,w,h)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
const rrect=(x,y,w,h,r,stroke)=>{ctx.strokeStyle=stroke||GREY;ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.stroke();};
const line=(a,b,c,w)=>{ctx.strokeStyle=c;ctx.lineWidth=w||3;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();};
const READY=(t)=>({t:t,hz:1000,dur:0.15});
const I=4000,F=5000;
function make(id,dur,events,intro,body){ window.sceneList[id]={duration:F+dur,events:[READY(F-300)].concat(events||[]),draw:(t)=>{
  ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  if(t<I){ txt(intro[0],CX,170,40,ACC,'700'); intro[1].forEach((s,i)=>txt(s,CX,300+i*52,28,SOFT,'500')); return; }
  if(t<F){ txt('+',CX,CY,72,INK,'400'); return; } body(t-F); }}; }
const cards=(list,per)=>(s)=>{ const k=Math.min(list.length-1,Math.floor(s/per)); const c=list[k]; c.forEach((ln,i)=>txt(ln[0],CX,CY-(c.length-1)*28+i*56,ln[1]||30,ln[2]||INK,ln[3]||'600')); txt((k+1)+' of '+list.length,CX,H-50,22,SOFT,'500'); };

// 12:18–12:19 Utility and expected utility (illustrative numbers): option A is a sure $50; option B is a coin flip for $120 or $0.
make('L12-utility',24000,[],['Expected utility · Choosing between options',['Expected utility: outcome times probability, summed over outcomes.','Illustrative numbers, not from a study.']],(s)=>{
  if(s<8000){ cards([
    [['Option A',36,ACC,'700'],['$50 for sure',36],['Expected utility: 1.00 × $50 = $50',28,SOFT,'500']],
    [['Option B',36,ACC,'700'],['50% chance of $120, 50% chance of $0',30],['Expected utility: 0.5 × $120 + 0.5 × $0 = $60',28,SOFT,'500']]],4000)(s); return; }
  if(s<16000){ cards([[['Expected utility theory: pick the option with the maximum expected utility.',30],['Here, option B ($60) beats option A ($50).',32,GREEN,'700']],
    [['The utility approach gives a procedure when values and probabilities are known.',30],['That is its advantage.',28,SOFT,'500']]],4000)(s-8000); return; }
  cards([[['But people value things other than money,',30],['and many decisions do not maximize the chance of the best outcome.',30],['So people are not utility-maximizing machines.',32,RED,'700']]],6000)(s-16000);
});

// 12:16–12:17 Lord et al. (1979) myside bias, and the 2-4-6 confirmation check (slide 12:17).
make('L12-lord-myside',22000,[],['Lord, Ross and Lepper (1979) · Myside bias',['Supporters and opponents of capital punishment read the same two studies.','One study supports their view and one opposes it.']],cards([
  [['Two studies, one supporting and one opposing each side’s view.',30],['Supporters rate the supporting study as more convincing.',30,INK],['Opponents rate the opposing study as less convincing.',30,INK]],
  [['Myside bias: evidence is evaluated in a way biased toward our own opinions.',30],['Confirmation bias: we look for information that fits our hypothesis.',30,SOFT,'500']],
  [['Number sequence task: 2, 4, 6 fits a rule.',30],['Try your own sets of three; you only learn whether each fits the rule.',30],['Proposals that confirm the first guess (8, 10, 12) make the rule feel confirmed.',28,SOFT,'500']]],7000));

// 12:21 Fear and flying after September 11 (Gigerenzer, 2004): the extra road deaths outnumber the passengers killed on the four flights.
make('L12-september-flying',16000,[],['Dread risk · After September 11',['Air travel went down and driving went up.','Which carried more risk to life?']],(s)=>{
  txt('Deaths compared: four flights vs extra road deaths',CX,140,30,INK,'700');
  const barH=(v)=>v; const base=520;
  const hF=Math.min(1,Math.max(0,(s-1000)/2000))*150, hR=Math.min(1,Math.max(0,(s-4000)/3000))*330;
  rect('#cfd8dc',CX-300,base-hF,240,hF); rect(RED,CX+60,base-hR,240,hR);
  txt('Passengers',CX-180,base+26,24,SOFT,'500'); txt('Road deaths',CX+180,base+26,24,SOFT,'500');
  if(s>8000) txt('Driving the unflown miles killed more people than the flights did (Gigerenzer, 2004).',CX,H-60,24,RED,'700'); });

// 13:5 Incidental emotion: cloudy versus sunny days in admissions (Simonsohn, 2007). Bars are illustrative of the direction only.
make('L13-cloudy-admissions',18000,[],['Incidental emotion · Weather and decisions',['Admissions officers weigh applicants’ records on different days.','Does the weather change which factors count?']],(s)=>{
  const cloudy=s>=0 && s<8000;
  const label=cloudy?'Cloudy day':'Sunny day';
  txt(label,CX,130,34,ACC,'700');
  const aH=cloudy?300:140, nH=cloudy?120:300;
  const grow=Math.min(1,Math.max(0,(s%8000)/1500));
  rect(BLUE,CX-220,520-aH*grow,120,aH*grow); rect(GREY,CX+100,520-nH*grow,120,nH*grow);
  txt('Academic record',CX-160,550,24,SOFT,'500'); txt('Other attributes',CX+160,550,24,SOFT,'500');
  if(s>12000) txt('Cloudy days: academic records weighed more heavily (Simonsohn, 2007). Bar heights show direction only.',CX,H-60,22,SOFT,'500');
  });

// 13:9 Framing (Tversky & Kahneman, 1981): the same choice worded as gains or as losses.
make('L13-framing',18000,[],['Framing effect · Gains versus losses',['The same choice, worded two ways.','Which option would you choose each time?']],cards([
  [['Gain frame',36,ACC,'700'],['Program A: 200 people are saved for sure.',30],['Program B: a gamble with a chance of saving everyone.',28,SOFT,'500']],
  [['Gain frame: most people choose the sure thing.',32,GREEN,'700'],['They play it safe.',30,INK]],
  [['Loss frame',36,ACC,'700'],['Program A: 400 people die for sure.',30],['Program B: a gamble with a chance that nobody dies.',28,SOFT,'500']],
  [['Loss frame: most people take the gamble.',32,RED,'700'],['The same choice is framed as losses, so people take the risk.',30,INK]]],4000));

// 13:2 Emotion and decisions: prefrontal damage (schematic), anxiety (risk avoidance), optimism (ignoring bad news).
make('L13-prefrontal-emotion',20000,[],['Emotion and decision making',['Emotions are part of good decision making.']],(s)=>{
  if(s<10000){ ctx.strokeStyle=GREY; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(CX-260,CY,170,130,0,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle=RED; ctx.beginPath(); ctx.ellipse(CX-340,CY-40,46,40,0,0,Math.PI*2); ctx.fill();
    txt('Prefrontal cortex (schematic)',CX-260,CY+170,24,SOFT,'500');
    txt('People with damage here, and flattened',680,CY-60,26,INK,'600','left'); txt('emotions, make worse decisions,',680,CY-22,26,INK,'600','left'); txt('not better ones.',680,CY+16,26,INK,'600','left'); return; }
  cards([[['Anxious people avoid choices that could lead to a big loss.',30],['This is risk avoidance.',30,SOFT,'500']],[['Optimistic people tend to ignore bad news.',30],['Too much optimism leads to poor decisions.',30,RED,'700']]],5000)(s-10000); });

// 10:3–10:4 Köhler's circle problem (Gestalt restructuring). The figure is drawn as on the slide; no solution is shown.
make('L10-kohler-circle',20000,[],['Köhler · The circle problem',['If the circle’s radius is r, what is the length of line x?','Different people may represent the problem differently.']],(s)=>{
  const R=190, cx=CX-120, cy=CY+10;
  ctx.strokeStyle=INK; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
  line([cx-R,cy],[cx+R,cy],GREY,2); line([cx,cy-R],[cx,cy+R],GREY,2);
  const P=[cx-R*0.82,cy-R*0.45], Q=[cx,cy-R*0.45], Rp=[cx-R*0.66,cy];
  const reveal=Math.min(1,Math.max(0,s/3000));
  if(reveal>0){ line(P,Q,INK,4); line(Rp,Q,INK,4); }
  if(s>3000){ line(P,[cx,cy],RED,3); txt('x',cx-40,cy-30,30,RED,'700'); }
  txt('r',cx+R/2,cy+26,26,SOFT,'500');
  if(s>12000) txt('Each person may restructure the problem differently; the picture is one representation.',CX,H-60,22,SOFT,'500'); });
})();
