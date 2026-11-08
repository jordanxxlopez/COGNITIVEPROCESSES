// Remaining judgment, decision and reasoning stimuli (slides 12:23–12:33, 13:4, 13:6, 13:19, 13:20, 13:28). White background.
(function(){
const W=1280,H=720,CX=W/2,CY=H/2, INK='#1d2328', SOFT='#4a5560', ACC='#1e5a8a', RED='#d32f2f', BLUE='#1565c0', GREY='#9aa5ae', GREEN='#2e7d32', TEAL='#0f7f8c';
const txt=(s,x,y,px,c=INK,w='600',al='center')=>{ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`;ctx.fillStyle=c;ctx.textAlign=al;ctx.textBaseline='middle';ctx.fillText(s,x,y);};
const wrapTxt=(s,x,y,px,c,w,maxW,lh)=>{ const words=s.split(' '); let line='', yy=y; ctx.font=`${w} ${px}px "Helvetica Neue",Arial,sans-serif`; const lines=[]; words.forEach(wd=>{ const t=line?line+' '+wd:wd; if(ctx.measureText(t).width>maxW){ lines.push(line); line=wd; } else line=t; }); lines.push(line); lines.forEach((l,i)=>txt(l,x,yy+i*lh,px,c,w)); };
const dot=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
const rect=(c,x,y,w,h)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
const rrect=(x,y,w,h,r,stroke)=>{ctx.strokeStyle=stroke||GREY;ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.stroke();};
const READY=(t)=>({t:t,hz:1000,dur:0.15});
const I=4000,F=5000;
function make(id,dur,events,intro,body){ window.sceneList[id]={duration:F+dur,events:[READY(F-300)].concat(events||[]),draw:(t)=>{
  ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,H);
  if(t<I){ txt(intro[0],CX,170,40,ACC,'700'); intro[1].forEach((s,i)=>txt(s,CX,300+i*52,28,SOFT,'500')); return; }
  if(t<F){ txt('+',CX,CY,72,INK,'400'); return; } body(t-F); }}; }
// Card sequence: each card shows for `per` ms with a centred block of text.
const cards=(list,per)=>(s)=>{ const k=Math.min(list.length-1,Math.floor(s/per)); const c=list[k]; c.forEach((ln,i)=>{ const [t,px,col,w]=ln; txt(t,CX,CY-(c.length-1)*26+i*52,px||30,col||INK,w||'600'); }); txt((k+1)+' of '+list.length,CX,H-50,22,SOFT,'500'); };

// 12:23–12:25 Taboo versus tragic tradeoffs (Tetlock et al., 2000).
make('L12-tetlock-taboo',24000,[],['Tetlock and colleagues · Taboo tradeoff',['Sacred values are kept apart from everyday values.','Mixing them triggers moral outrage.']],cards([
 [['Taboo tradeoff',40,ACC,'700'],['A hospital administrator can save a young boy who needs a liver transplant.',30,INK],['But the transplant would cost a million dollars that could be spent on other needs.',30,INK]],
 [['Outcome: the administrator does not save the boy.',30,RED,'700'],['People are extremely outraged: choosing money over a child’s life.',30,INK]],
 [['Outcome: the administrator saves the boy.',30,GREEN,'700'],['People are much less outraged, but the choice still counts as a taboo tradeoff.',30,INK]]],7000));
make('L12-tetlock-tragic',18000,[],['Tetlock and colleagues · Tragic tradeoff',['Two sacred values are weighed against each other.']],cards([
 [['Tragic tradeoff',40,ACC,'700'],['Two children need a liver transplant, but there is only one liver.',30,INK],['Here one sacred value is weighed against another, and one loss is unavoidable.',30,INK]],
 [['Outrage is moderate and about the same whichever child is saved.',30,INK,'600'],['Choosing between two lives is painful, but not a betrayal of sacred values.',30,SOFT,'500']]],8000));

// 12:26–12:29 Ginges et al. (2007): the slide's wording and the paper's wording, both shown.
make('L12-ginges-deals',30000,[],['Ginges and colleagues · Peace deals',['Interviews with Israeli settlers, Palestinian refugees and Palestinian students.','Three kinds of deal were offered.']],cards([
 [['Taboo deal',40,ACC,'700'],['Palestinians recognize the Jewish people’s sacred right to Israel.',28,INK],['Two states: Israel, and a Palestinian state in nearly all of the West Bank and Gaza.',28,INK]],
 [['Taboo plus deal (slide wording)',36,ACC,'700'],['The slide says: the taboo plus deal adds “a large yearly payment.”',28,INK],['Paper wording (Ginges et al., 2007): an added instrumental incentive, such as money or a life free of violence.',28,SOFT,'500']],
 [['Symbolic deal',40,ACC,'700'],['Israel recognizes the Palestinians’ historic right to their own state and apologizes.',28,INK],['The symbolic deal adds no instrumental value and does not reduce the taboo.',28,SOFT,'500']],
 [['Moral absolutists',40,ACC,'700'],['Adding money to the taboo deal raised anger, disgust and support for violence.',28,INK],['The symbolic concession reduced anger and support for violence.',28,INK]]],7500));

// 12:30–12:33 Iranian nuclear-program study: two program types, three deal types (design and results as stated on the slides).
make('L12-iran-study',34000,[],['Iranian online study · Nuclear programs and deals',['About two thousand Iranian participants, in Farsi.','Energy or weapons program, crossed with three deal types.']],cards([
 [['Design',40,ACC,'700'],['Two programs: energy and weapons.',30,INK],['Three deals: taboo deal (give up the program, surrender facilities to the UN, Israel does the same); taboo plus incentives; taboo plus sanctions.',26,INK]],
 [['Measures',40,ACC,'700'],['Approval of the deal.',30,INK],['How angry people would be if the government accepted it.',30,INK],['Whether the deal seems misleading.',30,INK]],
 [['People without a sacred value',34,ACC,'700'],['Approval of energy deals stays high whether the deal has incentives, sanctions or neither.',28,INK],['Expected anger stays low.',28,INK]],
 [['People with a sacred value',34,RED,'700'],['Approval is low, and gets lower when money or sanctions are added.',28,INK],['Expected anger rises when the taboo deal comes with incentives or sanctions.',28,INK]]],8000));

// 13:6 Lerner, Small and Loewenstein (2004): mood changes selling and buying prices. Object shown as both a highlighter and a pen.
const objs=[['Highlighter',TEAL],['Pen',BLUE]];
make('L13-lerner-mood',24000,[],['Lerner, Small and Loewenstein · Mood and prices',['People watch a short film clip: sad, disgusted or neutral.','Then they set prices for the object: selling price and buying price.']],(s)=>{
  const k=Math.floor(s/8000)%2; const [name,col]=objs[k];
  dot(CX,CY-120,10,col); rect(col,CX-160,CY-110,320,36); txt(name,CX,CY-92,26,'#ffffff','700');
  const rows=[['Disgust','lower selling price, lower buying price'],['Sadness','lower selling, higher buying (reverse effect)'],['Neutral','selling price above buying price (endowment effect)']];
  rows.forEach((r,i)=>{ txt(r[0],CX-260,CY+i*70,28,INK,'700','left'); txt(r[1],CX-80,CY+i*70,24,SOFT,'500','left'); });
  txt(name+' used in this clip. Original wording names pens in some reports; the slide says highlighters.',CX,H-60,22,SOFT,'500'); });

// 13:19 Pool table problem: black ball directly above the cue ball, green to the cue ball's right, red between them.
make('L13-pool-table',14000,[],['Pool table problem · Validity',['A black ball is directly above the cue ball.','The green ball is to the cue ball’s right, and a red ball sits between them.']],(s)=>{
  const tx=CX-320, ty=CY-190, tw=640, th=380; ctx.fillStyle='#e8f1ea'; ctx.fillRect(tx,ty,tw,th); rrect(tx,ty,tw,th,10,GREY);
  const cue={x:tx+200,y:ty+260}, black={x:cue.x,y:ty+120}, green={x:cue.x+180,y:ty+260}, red={x:cue.x+90,y:ty+190};
  dot(cue.x,cue.y,18,'#ffffff'); ctx.strokeStyle=INK; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cue.x,cue.y,18,0,Math.PI*2); ctx.stroke();
  dot(black.x,black.y,18,INK); dot(green.x,green.y,18,GREEN); dot(red.x,red.y,18,RED);
  txt('cue',cue.x,cue.y+34,20,SOFT,'500'); txt('black',black.x+44,black.y,20,SOFT,'500','left'); txt('green',green.x,green.y+34,20,SOFT,'500'); txt('red',red.x+26,red.y-6,20,SOFT,'500','left');
  txt('You stand at the bottom of the table',CX,ty+th+36,22,SOFT,'500');
  if(s>7000) txt('Where is the cue ball relative to your line of sight? Most people picture the table and their position.',CX,H-50,22,INK,'600'); });

// 13:20 Mental models (Johnson-Laird): a model is one imagined situation; a conclusion is valid only if no model of the premises falsifies it.
make('L13-mental-models',18000,[],['Johnson-Laird · Mental models',['To judge a syllogism, imagine a situation that makes the premises true.']],cards([
 [['Step 1: build a model',36,ACC,'700'],['Imagine a situation where the premises are true.',30,INK],['Draw a tentative conclusion from it.',30,INK]],
 [['Step 2: look for a counterexample',36,ACC,'700'],['Search for a model where the premises are true but the conclusion is false.',30,INK]],
 [['Rule',36,ACC,'700'],['A conclusion is valid only if no model of the premises can prove it false.',30,INK],['One counterexample makes it invalid.',30,SOFT,'500']]],6000));

// 13:28 Permission schema: the concrete drinking-age version versus the abstract card version.
make('L13-permission-schema',20000,[],['Permission schema · Concrete versus abstract rules',['Abstract rule: if a card has a vowel, it has an even number.','Concrete rule: if a person drinks beer, that person must be 21 or older.']],(s)=>{
  const labels=['Drinking beer','Drinking cola','Age 25','Age 16']; const cw=200, ch=150, gap=30, x0=CX-(4*cw+3*gap)/2;
  labels.forEach((l,i)=>{ const x=x0+i*(cw+gap), y=CY-ch/2; rect('#ffffff',x,y,cw,ch); rrect(x,y,cw,ch,14,INK); txt(l,x+cw/2,y+ch/2,26,INK,'700'); });
  if(s>10000){ [0,3].forEach(i=>{ const x=x0+i*(cw+gap); ctx.strokeStyle=GREEN; ctx.lineWidth=8; ctx.strokeRect(x-6,CY-ch/2-6,cw+12,ch+12); }); txt('Check: drinking beer and age 16 break the rule',CX,H-80,26,GREEN,'700'); } });
})();
