"""Deterministic flat participant displays and explicitly labeled worked examples."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,math,subprocess,wave,struct,random,hashlib
ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'psyc301-videos'
MAN=json.loads((OUT/'manifest.json').read_text())
W,H=960,600
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(n,b=False):return ImageFont.truetype(BOLD if b else FONT,n)
def text(d,s,x,y,n=30,color='#22272b',anchor='mm',bold=False):d.text((x,y),s,font=font(n,bold),fill=color,anchor=anchor)
def multiline(d,s,y,n=28):
 for line in s.split('\n'):text(d,line,480,y,n);y+=n*1.5
def canvas(c,bg='white'):
 im=Image.new('RGB',(W,H),bg);d=ImageDraw.Draw(im)
 d.rectangle((0,0,W,44),fill='#f5f5f2');text(d,c['title'],20,22,18,anchor='lm')
 return im,d
def cross(d,x=480,y=320,color='#22272b'):
 d.line((x-9,y,x+9,y),fill=color,width=2);d.line((x,y-9,x,y+9),fill=color,width=2)
def ease(x):x=max(0,min(1,x));return x*x*(3-2*x)
def lerp(a,b,u):return (a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u)
def dot(d,x,y,r=22,color='#397da3'):d.ellipse((x-r,y-r,x+r,y+r),fill=color)
def pastefit(im,img,box):
 x,y,w,h=box;img=img.copy();img.thumbnail((w,h),Image.Resampling.LANCZOS);im.paste(img,(int(x+(w-img.width)/2),int(y+(h-img.height)/2)))
ROT=Image.open(ROOT/'media/working-memory/slide-17.webp')
# Coordinates normalized to verified 1386 x 1071 course slide.
def cropnorm(im,box,base):return im.crop(tuple(round(v*s/b) for v,s,b in zip(box,(im.width,im.height,im.width,im.height),base*2)))
ROTS=[cropnorm(ROT,b,(1386,1071)) for b in [(116,298,464,470),(116,520,464,692),(116,739,464,910)]]
CHAIN=Image.open(ROOT/'media/problem-solving/slide-06.webp')
CHAIN=cropnorm(CHAIN,(835,678,1355,973),(1440,1080))
MASK=Image.new('RGB',(680,330),'white');md=ImageDraw.Draw(MASK);rng=random.Random(301)
for _ in range(7000):
 x=rng.randrange(680);y=rng.randrange(330);md.ellipse((x,y,x+2,y+2),fill=rng.choice(['#222222','#777777','#aaaaaa']))
def hanoi(n,a,b,c):
 if not n:return []
 return hanoi(n-1,a,c,b)+[(a,b)]+hanoi(n-1,c,b,a)
MOVES=hanoi(3,0,2,1)
def frame(c,t):
 id=c['id'];im,d=canvas(c,'#202427' if id=='conrad' else 'white')
 if id.startswith('sperling'):
  if t<1:cross(d)
  elif t<1.05:
   for i,row in enumerate(['X M L T','A F N B','C D Z P']):text(d,row,480,235+i*75,49)
 elif id=='brown-peterson':
  if t<1:cross(d)
  elif t<2.5:text(d,'F   Z   L',480,300,64)
  elif t<3.5:text(d,'45',480,300,70)
  elif t>=6.5:text(d,'Recall the three letters',480,320,32)
 elif id.startswith('change-'):
  n=c['params']['n'];positions=[(250,190),(490,215),(710,200),(300,440),(570,420),(750,415)]
  if t<1:cross(d)
  elif 1<=t<1.1 or 2<=t<4:
   colors=['#cf3038','#2367bc','#309c58','#e3c02d','#8953ac','#22aeb3']
   for i,(x,y) in enumerate(positions[:n]):d.rectangle((x-28,y-28,x+28,y+28),fill=('#8953ac' if t>=2 and i==1 else colors[i]))
 elif id=='conrad':
  if t<2.25:dot(d,480,310,9,'white')
  elif t<6.75:text(d,'BCFMPX'[int((t-2.25)/.75)],480,310,100,'white')
 elif id=='brooks':
  if t<3:
   points=[(380,150),(580,150),(580,210),(445,210),(445,275),(550,275),(550,335),(445,335),(445,465),(380,465)]
   d.polygon(points,fill='white',outline='#222222',width=3);text(d,'*',363,143,35)
  else:
   for i in range(10):
    text(d,str(i+1),250,100+i*45,21);text(d,'OUT',430,100+i*45,23);text(d,'IN',650,100+i*45,23)
 elif id=='rotation':
  pastefit(im,ROTS[min(2,int(t//5))],(110,145,740,360))
 elif id=='chain':
  pastefit(im,CHAIN,(140,220,680,340))
  multiline(d,'Join the four chains into one closed loop.\nOpening a link costs 2¢; closing it costs 3¢.\nBudget: 15¢.',95,25)
 elif id=='vogel':
  cross(d);phase=t-1
  if 0<=phase<.2:text(d,'←',480,245,52)
  if .2<=phase<.3 or 1.2<=phase<3.2:
   for side in [-1,1]:
    for i,(dx,dy) in enumerate([(-60,-85),(50,-40),(-50,70),(65,95)]):
     x=480+side*230+dx;y=320+dy;horizontal=(i%2==0)
     if phase>=1.2 and side==-1 and i==0:horizontal=not horizontal
     a,b=(27,8) if horizontal else (8,27)
     d.rectangle((x-a,y-b,x+a,y+b),fill='#d32936' if i<2 else '#216bc5')
 elif id=='triangle':
  pts=[(480+(j-i/2)*88,180+i*76) for i in range(4) for j in range(i+1)]
  # Move top to bottom, and two outer base dots to upper outer positions.
  dest={0:(480,484),6:(348,256),9:(612,256)}
  for i,p in enumerate(pts):
   if i in dest:
    start={0:3,6:6,9:9}[i];p=lerp(p,dest[i],ease((t-start)/1.5))
   dot(d,*p,21)
 elif id=='candle':
  d.rectangle((120,95,840,520),fill='#c5a675')
  u=ease((t-3)/3);bx,by=lerp((260,430),(480,350),u)
  d.rectangle((bx-80,by-28,bx+80,by+32),fill='#ddc79d',outline='#66543a',width=3)
  cx,cy=lerp((650,400),(480,280),ease((t-6)/3))
  d.rectangle((cx-22,cy-70,cx+22,cy+70),fill='#eee5cd',outline='#807869',width=2)
  d.line((cx,cy-70,cx,cy-82),fill='#302b24',width=3)
  for k in range(5):
   x=235+k*15;y=410 if t<2 else 485
   d.line((x,y,x+20,y+30),fill='#9a6a38',width=3);dot(d,x,y,3,'#9d3030')
  for x in [345,365,385]:dot(d,x,478,4,'#555b62')
  if t>=6:dot(d,bx-55,by,4,'#555b62');dot(d,bx+55,by,4,'#555b62')
  if t>=9:d.ellipse((cx-9,cy-110,cx+9,cy-79),fill='#df9c28')
 elif id=='two-strings':
  d.line((140,110,820,110),fill='#808080',width=4)
  a=(290,110);b=(690,110);length=330
  angle=0 if t<5 else -.68*math.sin((t-5)*math.pi/2)
  end=(b[0]+length*math.sin(angle),b[1]+length*math.cos(angle))
  d.line((*a,290,440),fill='#675943',width=3);d.line((*b,*end),fill='#675943',width=3)
  u=ease((t-2)/2);px,py=lerp((760,510),end,u)
  d.line((px-10,py-14,px+10,py+22),fill='#67717a',width=8);d.line((px+10,py-14,px-10,py+22),fill='#67717a',width=8)
 elif id=='water-jugs':
  second=t>=8;u=t%8;caps=[23,49,3] if second else [21,127,3];goal=20 if second else 100
  # Exact symbolic volume operations, not misleading container-scale animation.
  levels=[0,0,0]
  if u>=1:levels[1]=caps[1]
  if u>=3:levels[0]=caps[0];levels[1]-=caps[0]
  if u>=4.5:levels[2]=caps[2];levels[1]-=caps[2]
  if u>=6:levels[1]-=caps[2]
  for i,x in enumerate([240,480,720]):
   d.rectangle((x-65,220,x+65,460),outline='#444444',width=3)
   h=210*levels[i]/caps[i];d.rectangle((x-61,456-h,x+61,456),fill='#85bfd4')
   text(d,f'{chr(65+i)} · {caps[i]}',x,190,28);text(d,str(levels[i]),x,500,30)
  text(d,f'Measure {goal}',480,95,30)
  if second and u>=6: text(d,'Also: A − C = 23 − 3 = 20',480,560,26)
 elif id=='hanoi':
  step=min(7,int(max(0,t-1)//2));u=ease(((t-1)%2)/1.2)
  stacks=[[3,2,1],[],[]]
  for a,b in MOVES[:step]:stacks[b].append(stacks[a].pop())
  moving=None
  if 1<=t<15 and step<7:
   a,b=MOVES[step];disk=stacks[a].pop()
   p=(220+a*260,480-len(stacks[a])*36);q=(220+b*260,480-len(stacks[b])*36)
   if u<.25:pos=lerp(p,(p[0],180),u*4)
   elif u<.75:pos=lerp((p[0],180),(q[0],180),(u-.25)*2)
   else:pos=lerp((q[0],180),q,(u-.75)*4)
   moving=(disk,pos)
  for i,x in enumerate([220,480,740]):
   d.line((x,190,x,515),fill='#82776a',width=9);d.line((x-112,515,x+112,515),fill='#82776a',width=9)
   for j,k in enumerate(stacks[i]):
    y=480-j*36;d.rounded_rectangle((x-28*k,y-13,x+28*k,y+13),radius=6,fill=['','#d2a650','#5897b4','#b96868'][k])
  if moving:
   k,(x,y)=moving;d.rounded_rectangle((x-28*k,y-13,x+28*k,y+13),radius=6,fill=['','#d2a650','#5897b4','#b96868'][k])
 elif id=='checkerboard':
  for row in range(8):
   for col in range(8):
    if t>=2 and (row,col) in [(0,0),(7,7)]:continue
    x=256+col*56;y=95+row*56
    d.rectangle((x,y,x+55,y+55),fill='#6b8190' if (row+col)%2==0 else '#ece1ca')
  if t>=5:
   for row,col in [(0,1),(2,2),(4,4)]:
    x=256+col*56;y=95+row*56;d.rounded_rectangle((x+4,y+4,x+108,y+51),radius=8,outline='#272d30',fill='#ddc5a0',width=3);d.line((x+56,y+4,x+56,y+51),fill='#6f6252',width=2)
 elif id=='jellybeans':
  for x,w,n,red in [(245,280,10,1),(690,360,100,7)]:
   d.ellipse((x-w/2,140,x+w/2,500),outline='#7b8385',width=4)
   cols=5 if n==10 else 10;spacing=42 if n==10 else 26
   for i in range(n):
    row,col=divmod(i,cols);xx=x+(col-(cols-1)/2)*spacing;yy=(290 if n==10 else 200)+row*(43 if n==10 else 25)
    d.ellipse((xx-8,yy-6,xx+8,yy+6),fill='#c83636' if i<red else '#eee2c6',outline='#a39781')
  if t>=2:text(d,'1 red / 10',245,535,26);text(d,'7 red / 100',690,535,26)
 elif id=='wason':
  if t<3:text(d,'2     4     6',480,270,57)
  else:
   tests=[('8   10   12','Fits the rule'),('3   6   9','Fits the rule'),('1   2   8','Fits the rule'),('9   6   3','Does not fit')]
   item=min(3,int((t-3)//3));triple,fb=tests[item];text(d,triple,480,260,55)
   if (t-3)%3>1.4:text(d,fb,480,375,30)
 elif id=='donders':
  choice=t>=5;phase=t%5
  for x in ([300,660] if choice else [480]):
   active=1.5<=phase<3 and x==(660 if choice else 480)
   dot(d,x,250,45,'#f1d66e' if active else '#4c5054');d.rounded_rectangle((x-60,425,x+60,465),radius=10,fill='#bebfc0')
 elif id=='stroop':
  words=['RED','BLUE','GREEN','YELLOW'];colors=['#bf353b','#286db9','#218752','#bd9711']
  if t>=5:colors=[colors[1],colors[0],colors[3],colors[2]]
  for i,(word,col) in enumerate(zip(words,colors)):text(d,word,480,160+i*100,54,col,bold=True)
 elif id.startswith('search-'):
  if t<1:cross(d)
  else:
   for i in range(24):
    row,col=divmod(i,6);x=235+col*98+(row%2)*12;y=160+row*105
    target=i==15;red=target or (id=='search-conjunction' and i%2==0)
    horizontal=red and not target
    a,b=(23,5) if horizontal else (5,23);d.rectangle((x-a,y-b,x+a,y+b),fill='#cb343b' if red else '#2868b4')
 elif id=='posner':
  phase=t%4.5;cross(d)
  for x in [245,715]:d.rectangle((x-50,270,x+50,370),outline='#444444',width=2)
  if .8<=phase<1.2:text(d,'←',480,235,48)
  if 1.5<=phase<3.5:dot(d,245 if t<4.5 else 715,320,11,'#222222')
 elif id=='egly':
  phase=t%4;trial=min(2,int(t//4));cross(d)
  for x in [330,630]:d.rectangle((x-35,170,x+35,520),outline='#555555',width=3)
  if 1<=phase<1.1:d.line((295,205,295,170,365,170,365,205),fill='#777777',width=7)
  if 1.3<=phase<3.3:
   x,y=[(330,195),(330,495),(630,195)][trial];d.rectangle((x-22,y-22,x+22,y+22),fill='#333333')
 elif id=='binding':
  if t<1:cross(d)
  elif t<1.2:
   text(d,'1',170,320,65);text(d,'8',790,320,65)
   d.polygon([(290,285),(265,335),(315,335)],fill='#c7353e')
   d.polygon([(410,260),(365,350),(455,350)],outline='#2367b7',width=5)
   dot(d,550,310,24,'#dfbc32');d.ellipse((625,265,715,355),outline='#369b58',width=5)
  elif t<2:im.paste(MASK,(140,150))
  else:multiline(d,'Report the black digits first.\nThen report the colored shapes.',270,27)
 elif id=='apparent':
  phase=t%.6
  if phase<.2:dot(d,330,320,35,'#343b40')
  elif .3<=phase<.5:dot(d,630,320,35,'#343b40')
 elif id=='muller':
  for y,sgn in [(230,1),(410,-1)]:
   d.line((290,y,670,y),fill='#252c30',width=4)
   if t<5:
    for x,side in [(290,-1),(670,1)]:d.line((x+side*sgn*45,y-45,x,y,x+side*sgn*45,y+45),fill='#252c30',width=4)
 elif id=='similarity':
  for row in range(6):
   for col in range(8):dot(d,235+col*70,145+row*65,13,'#3e788b' if t<3 or col%2==0 else '#b85c57')
 elif id=='word-superiority':
  phase=t%4;trial=min(2,int(t//4));word=['WORK','   K','ORWK'][trial]
  if phase<1:cross(d)
  elif phase<1.05:
   for i,ch in enumerate(word):text(d,ch,360+i*80,310,65)
  elif phase<1.4:text(d,'####',480,310,65)
  else:
   text(d,'D',600,255,48);text(d,'K',600,365,48);d.line((575,315,625,315),fill='#333333',width=2)
 elif id=='blue':
  if t<1:cross(d)
  else:
   for x,y,col in [(480,195,'#3886bd'),(300,420,'#3886bd'),(660,420,'#255b98')]:d.rectangle((x-65,y-65,x+65,y+65),fill=col)
 elif id=='lexical':
  phase=t%5
  if phase<1:cross(d)
  elif phase<4:text(d,'GARDEN' if t<5 else 'GARDENK',480,300,56)
 return im
def render(c):
 fps=c['fps'];out=ROOT/c['file'];out.parent.mkdir(parents=True,exist_ok=True)
 poster=ROOT/c['poster'];poster.parent.mkdir(parents=True,exist_ok=True)
 tmp=out.with_suffix('.silent.mp4')
 p=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s','960x600','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(tmp)],stdin=subprocess.PIPE)
 for i in range(round(c['duration']*fps)):p.stdin.write(frame(c,i/fps).tobytes())
 p.stdin.close()
 if p.wait():raise RuntimeError(c['id'])
 if 'tone' in c.get('params',{}):
  wav=out.with_suffix('.wav');sr=44100;start=c['params']['tone']
  with wave.open(str(wav),'wb') as w:
   w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
   for i in range(c['duration']*sr):
    t=i/sr-start;env=min(1,max(0,t/.005),max(0,(.25-t)/.005)) if 0<=t<.25 else 0
    w.writeframesraw(struct.pack('<h',int(5500*env*math.sin(2*math.pi*650*t))))
  subprocess.run(['ffmpeg','-y','-v','error','-i',str(tmp),'-i',str(wav),'-c:v','copy','-c:a','aac','-movflags','+faststart',str(out)],check=True)
  tmp.unlink();wav.unlink()
 else:tmp.replace(out)
 stamp=1.0167 if c['id'].startswith(('sperling','change-','word-superiority')) else 1.25 if c['id']=='vogel' else 1.1 if c['id']=='binding' else 2.5
 frame(c,stamp).save(poster,quality=92)
 print('Rendered',c['id'],flush=True)
if __name__=='__main__':
 for c in MAN['clips']:
  if not c.get('existing'):render(c)
