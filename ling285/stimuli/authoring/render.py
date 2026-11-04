"""Deterministic LING285 teaching media. Pillow, NumPy, SciPy, Praat and FFmpeg.
No generative models, TTS, or fabricated experimental recordings.
"""
from pathlib import Path
import ast,json,math,subprocess,hashlib,wave,urllib.request
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageOps
from scipy import signal
R=Path('ling285');O=R/'stimuli';C=O/'clips';P=O/'posters';Q=O/'qa';S=O/'sources'
for p in [C,P,Q,S]:p.mkdir(parents=True,exist_ok=True)
D=json.loads((R/'data.json').read_text())
SE={s['id']:s for c in D['collections'] for s in c['sections']}
M=[];checks=[]
W,H,FPS=1200,720,24
BG='#faf9f6';INK='#23333c';BLUE='#176b88';RED='#a43e57';GREEN='#23816f';GRAY='#b6bfc3'
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def txt(d,xy,t,size=26,fill=INK,anchor=None):
 d.text(xy,str(t),font=ImageFont.truetype(font,size),fill=fill,anchor=anchor)
def canvas():
 im=Image.new('RGB',(W,H),BG);return im,ImageDraw.Draw(im)
def line(d,pts,color=BLUE,width=4):d.line([(float(x),float(y)) for x,y in pts],fill=color,width=width)
def dot(d,x,y,c=RED,r=8):d.ellipse((x-r,y-r,x+r,y+r),fill=c)
def arrow(d,a,b,c=BLUE,width=4):
 line(d,[a,b],c,width);v=np.array(a)-np.array(b);v=v/np.linalg.norm(v);n=np.array([-v[1],v[0]])
 d.polygon([tuple(b),tuple(np.array(b)+v*15+n*7),tuple(np.array(b)+v*15-n*7)],fill=c)
def register(id,title,slides,kind,description,file=None,**extra):
 row=dict(id=id,title=title,slides=slides,kind=kind,description=description,file=file or f'stimuli/clips/{id}.mp4',type='video',**extra)
 M.append(row);return row
def encode(id,duration,draw,audio=None,fps=FPS):
 dst=C/(id+'.mp4')
 cmd=['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(fps),'-i','-']
 if audio:cmd+=['-i',str(audio)]
 cmd+=['-c:v','libx264','-preset','fast','-crf','22','-pix_fmt','yuv420p']
 if audio:cmd+=['-c:a','aac','-b:a','160k','-shortest']
 cmd+=['-movflags','+faststart',str(dst)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for i in range(math.ceil(duration*fps)):
  im=draw(i/fps)
  if i==round(duration*fps*.35):im.save(P/(id+'.jpg'),quality=90)
  proc.stdin.write(im.tobytes())
 proc.stdin.close();assert proc.wait()==0
 return dst
def savewav(id,x,sr=24000):
 x=np.asarray(x,dtype=float);assert np.isfinite(x).all() and abs(x).max()<.99
 out=C/(id+'.wav')
 with wave.open(str(out),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr);f.writeframes(np.rint(x*32767).astype('<i2').tobytes())
 checks.append(dict(id=id,sample_rate=sr,duration=len(x)/sr,peak=float(abs(x).max()),rms=float(np.sqrt(np.mean(x*x)))))
 return out
def decode(path,sr=24000):
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-f','f64le','-ac','1','-ar',str(sr),'-'])
 return np.frombuffer(raw,dtype='<f8').copy()
def quiet(x):return x*min(.055/max(np.sqrt(np.mean(x*x)),1e-12),.28/max(abs(x).max(),1e-12))
def fetch(url,name):
 p=S/name
 if not p.exists():p.write_bytes(urllib.request.urlopen(url,timeout=45).read())
 return p
def slides(c,pages):return [f'{c}-p{p:03}' for p in pages]
def stage_movie(id,title,ids,paths,hold=3):
 frames=[]
 for path in paths:
  im=Image.open(R/path).convert('RGB');frames.append(ImageOps.pad(im,(W,H),color='white'))
 encode(id,hold*len(frames),lambda t:frames[min(int(t/hold),len(frames)-1)],fps=6)
 register(id,title,ids,'Source slide sequence','Uses the retained source slide states in their original order. Each state is held for '+str(hold)+' seconds; this playback timing is newly supplied.')
# Native PowerPoint click states, preserved rather than generated.
for c in D['collections']:
 if c.get('role')!='lecture':continue
 for s in c['sections']:
  stages=sorted([a for a in s.get('assets',[]) if a.get('sourceStage') is not None],key=lambda a:a['sourceStage'])
  if stages:stage_movie('states-'+s['id'],s['title'],[s['id']]+(['lecture16-p013'] if s['id']=='lecture15-p012' else []),[a['file'] for a in stages],4)
# Source slides for dynamic programming retain the actual network and edge costs.
stage_movie('bellman-source','Bellman values, working backward',slides('lecture04',range(3,17)),[SE[f'lecture04-p{p:03}']['image'] for p in [3,7,8,9,10,11,13,16]],4)
# Exact SGD example from lecture 3.
obs=[98,85,76,68,98,72,78,67,98,85,76,68];xs=[130.]
for y in obs:xs.append(xs[-1]-.25*(xs[-1]-y))
assert abs(xs[-1]-79.41838693618774)<.001
def sgd(t):
 im,d=canvas();n=min(int(t/2),11);u=min((t%2)/1.2,1)
 txt(d,(60,40),'One observation → one correction',34)
 txt(d,(60,100),f'x = {xs[n]:.3f}     observation = {obs[n]}     learning rate = 0.25',24)
 txt(d,(60,145),f'{xs[n]:.3f} − 0.25 × ({xs[n]:.3f} − {obs[n]}) = {xs[n+1]:.3f}',26,RED)
 px=lambda j:90+j*81;py=lambda y:590-(y-60)*4.9
 for y in [60,80,100,120,140]:line(d,[(90,py(y)),(1080,py(y))],'#e1e4e3',1);txt(d,(45,py(y)-12),y,20)
 line(d,[(90,py(80.25)),(1080,py(80.25))],GREEN,2)
 pts=[(px(j),py(x)) for j,x in enumerate(xs[:n+1])]+[(px(n+u),py(xs[n]+u*(xs[n+1]-xs[n])))]
 if len(pts)>1:line(d,pts,RED,4)
 for x,y in pts:dot(d,x,y)
 txt(d,(90,650),'Update',22)
 for tick in [0,3,6,9,12]:
  line(d,[(px(tick),598),(px(tick),606)],INK,1);txt(d,(px(tick),623),tick,21,anchor='mm')
 txt(d,(90,680),'Green line = data mean 80.25. The estimate can move up or down.',21,GREEN)
 return im
encode('sgd',24,sgd);register('sgd','Watch the estimate learn from observations',slides('lecture03',range(13,30))+slides('lecture02',[16]),'Calculated demonstration','Uses lecture 3’s exact observations, initial estimate 130 and learning rate 0.25. Arithmetic uses full precision; displayed values are rounded.')
def learning(t):
 im,d=canvas();txt(d,(55,35),'Learning rate changes speed and variability',34)
 rng=np.random.default_rng(285);samples=rng.choice([78,67,98,85,76,68,98,72],300);n=min(300,int(t/16*300)+1)
 for k,rate in enumerate([.01,.1,.5,.8]):
  xx=70+(k%2)*590;yy=125+(k//2)*285
  txt(d,(xx,yy),f'Learning rate {rate:g}',25)
  for start,col in [(130,RED),(80,GREEN),(10,BLUE)]:
   v=[start]
   for y in samples:v.append(v[-1]+rate*(y-v[-1]))
   line(d,[(xx+j*1.65,yy+240-z*1.45)for j,z in enumerate(v[:n+1])],col,2)
  line(d,[(xx,yy+240-80.25*1.45),(xx+495,yy+240-80.25*1.45)],GRAY,1)
 txt(d,(60,690),'Same seeded observation sequence for every rate; starting estimates 130, 80 and 10.',20)
 return im
encode('learning-rates',16,learning);register('learning-rates','Compare four learning rates',slides('lecture02',[17,18,19])+slides('lecture03',[30,31])+slides('lecture07',[15]),'Calculated demonstration','Uses the slide data and rates 1%, 10%, 50%, 80%. A new reproducible NumPy seed 285 supplies the shared sample order; these are new calculated paths.')
def oscillator(t):
 im,d=canvas();z=t*math.pi/3;x=math.cos(z);v=-math.sin(z)
 txt(d,(65,40),'Position and velocity keep changing each other',32)
 end=360+130*x
 line(d,[(80,190),(80,360)],INK,7)
 pts=[(80,275)]+[(80+(end-115-80)*j/24,275+(-1)**j*17)for j in range(1,25)]+[(end-35,275)]
 line(d,pts,BLUE,4);d.rounded_rectangle((end-35,240,end+35,310),radius=6,fill=BLUE)
 line(d,[(360,190),(360,370)],GRAY,2);arrow(d,(end,350),(end+75*v if abs(v)>.05 else end+1,350),RED)
 txt(d,(80,395),f'x = {x:+.2f}      v = {v:+.2f}',28)
 for row,(label,fn,col) in enumerate([('Position x',np.cos,BLUE),('Velocity v',lambda a:-np.sin(a),RED)]):
  yy=235+row*225;txt(d,(630,yy-115),label,27,col);line(d,[(630,yy),(1130,yy)],GRAY,1)
  grid=np.linspace(0,4*np.pi,400);line(d,[(630+a/(4*np.pi)*500,yy-65*fn(a))for a in grid],col,3)
  dot(d,630+(z%(4*np.pi))/(4*np.pi)*500,yy-65*fn(z),col)
 txt(d,(65,570),'dx/dt = v       dv/dt = −x',32)
 txt(d,(65,630),'Motion is fastest at the center; velocity is zero at each turning point.',25)
 return im
encode('position-velocity',12,oscillator);register('position-velocity','Position, velocity and the spring cycle',slides('lecture05-06',[3,4,5,6,7,9,20])+slides('lecture07',[2,3,4]),'Calculated demonstration','Exact solution x = cos(t), v = −sin(t) of the source equations with k/m = 1. Visual time is slowed; this is a schematic oscillator.')
def euler(t):
 im,d=canvas();txt(d,(50,35),'Same equation, different update order',34);n=min(12,int(t/1.2))
 results=[]
 for explicit in [False,True]:
  x,v=1.,0.;vals=[(x,v)]
  for j in range(12):
   old=x;x+=.5*v;v-=.5*(old if explicit else x);vals.append((x,v))
  results.append(vals)
 for k,vals in enumerate(results):
  ox=65+k*590;txt(d,(ox,115),'Both use the old pair' if k else 'Update x, then use new x for v',24)
  txt(d,(ox,155),'Explicit Euler' if k else 'Position-first update',24,RED if k else BLUE)
  for comp,col in [(0,BLUE),(1,RED)]:
   pts=[(ox+j*39,400-val[comp]*50) for j,val in enumerate(vals[:n+1])]
   if len(pts)>1:line(d,pts,col)
   for x,y in pts:dot(d,x,y,col,5)
  line(d,[(ox,400),(ox+468,400)],GRAY,1)
  txt(d,(ox,590),f'Step {n}: x={vals[n][0]:.3f}, v={vals[n][1]:.3f}',23)
 txt(d,(65,660),'k/m = 1    Δt = 0.5    start x = 1, v = 0.    Blue = position; red = velocity.',23)
 return im
encode('euler',16,euler);register('euler','Compare the two Euler update rules',slides('lecture08',[9,10,11,12]),'Calculated demonstration','Recalculates all twelve source steps at Δt = 0.5. Explicit Euler’s growing amplitude is a numerical effect, not a prediction of increasing physical energy.')
def equilibrium(t):
 im,d=canvas();n=min(int(t),12);vals=[100*(2/3)**i for i in range(13)]
 txt(d,(60,45),'A correction that gets smaller as the error shrinks',31)
 txt(d,(60,110),'x[next] = x − x/3        start x = 100',30)
 line(d,[(100,600),(1100,600)],INK,2)
 pts=[(100+i*80,600-v*4)for i,v in enumerate(vals[:n+1])]
 if len(pts)>1:line(d,pts,BLUE)
 for i,(x,y) in enumerate(pts):dot(d,x,y,BLUE);txt(d,(x,y-30),f'{vals[i]:.1f}',19,BLUE,anchor='mm')
 txt(d,(100,655),'Each step removes one third of what remains.',28)
 return im
encode('equilibrium',14,equilibrium);register('equilibrium','Return toward equilibrium, step by step',slides('lecture07',[6])+slides('lecture09',[3,4,8])+slides('lecture04',[18]),'Calculated demonstration','Uses the lecture recurrence x[next] = x − x/3 from an initial value of 100. This is a discrete numerical example.')
# Exact illustrative network from native speaker notes.
native=json.loads((R/'authoring/extracted/lecture15-native.json').read_text())
weights=[np.array(w)for w in ast.literal_eval(native[2]['speakerNotes'].split('W matrices (each row is a destination neuron, each column a source): ')[1].split('\n')[0])]
acts=[np.array([320.,2000.])]
for w in weights:acts.append(w@acts[-1])
prob=np.exp(acts[-1]-max(acts[-1]));prob/=prob.sum()
assert np.allclose(prob,[.557196863584,.073932950859,.081499640810,.185400548761,.101969995985])
pos=[[(100+k*235,365+(j-(n-1)/2)*90)for j in range(n)]for k,n in enumerate([2,3,2,4,5])]
def network(t,back=False):
 im,d=canvas();step=min(int(t/3),4);part=(t%3)/3
 txt(d,(45,30),'Trace the error backward' if back else 'Follow the formants through the network',34)
 txt(d,(45,83),'Same forward activations; error calculations move right to left.' if back else '(0.005 × 320) + (−0.001 × 2000) = −0.40',26)
 active=3-min(step,3) if back else min(step,3)
 for k,w in enumerate(weights):
  for j in range(w.shape[0]):
   for i in range(w.shape[1]):
    a,b=pos[k][i],pos[k+1][j];col=RED if w[j,i]<0 else BLUE
    line(d,[a,b],col if k==active else '#d1d7d7',2)
    if k==active:
     f=1-part if back else part;dot(d,a[0]+f*(b[0]-a[0]),a[1]+f*(b[1]-a[1]),col,5)
 for k,layer in enumerate(pos):
  for j,(x,y) in enumerate(layer):
   d.ellipse((x-35,y-35,x+35,y+35),fill='#e2f0ed' if k==4 else '#e7edf5',outline=INK,width=2)
   label=f'{prob[j]*100:.1f}%' if k==4 else f'{acts[k][j]:.2f}'.rstrip('0').rstrip('.')
   if back or k<=step:txt(d,(x,y),label,21,anchor='mm')
   if k==4:txt(d,(x+43,y),['done','dune','dean','Don','Dan'][j],19,anchor='lm')
 if back:
  txt(d,(45,635),'Target = dean. Compute output error, then reuse it for earlier weights.',24)
  txt(d,(45,675),f'Output error p − target: {np.round(prob-np.array([0,0,1,0,0]),3)}',21,RED)
 else:
  txt(d,(45,635),'2 inputs → 3 → 2 → 4 hidden neurons → 5 outputs',26)
  txt(d,(45,675),'Linear hidden layers; softmax turns the final scores into probabilities.',23)
 return im
encode('forward-network',15,network);register('forward-network','Forward propagation with the slide’s actual weights',slides('lecture15',[2,3,4,9,10])+slides('lecture16',[2,3,4,10,11])+slides('lecture17',[2]),'Calculated demonstration','Recomputes the exact 2→3→2→4→5 network, F1=320, F2=2000, signed weights and softmax from lecture 15 speaker notes. Moving dots show computational order, not biological impulses.')
encode('backward-network',15,lambda t:network(t,True));register('backward-network','Backpropagation through the same network',slides('lecture15',[6,7,8])+slides('lecture16',[7,8,9])+slides('lecture10',[12]),'Calculated demonstration','Displays p − target for dean and the order of backward dependency calculations. The forward activations stay fixed during this backward pass; dots are a schematic of computation.')
def sigmoid(t):
 im,d=canvas();z=-6+12*min(t/10,1);sig=lambda x:1/(1+np.exp(-x))
 txt(d,(60,40),'Sigmoid converts a score into a bounded activation',32)
 txt(d,(60,100),'σ(z) = 1 / (1 + exp(−z))',30)
 line(d,[(130,570),(1090,570)],INK,2);line(d,[(130,570),(130,210)],INK,2)
 line(d,[(130+(x+6)*80,570-340*sig(x))for x in np.linspace(-6,6,500)],BLUE,4)
 dot(d,130+(z+6)*80,570-340*sig(z),RED,10)
 txt(d,(180,625),f'z = {z:+.2f}       σ(z) = {sig(z):.4f}',32,RED)
 for x in [-6,-4,-2,0,2,4,6]:txt(d,(130+(x+6)*80,590),x,20,anchor='mm')
 txt(d,(90,230),'1',23);txt(d,(90,555),'0',23)
 return im
encode('sigmoid',12,sigmoid);register('sigmoid','Watch the sigmoid response',slides('lecture15',[11,13])+slides('lecture16',[12,14]),'Calculated demonstration','Plots the exact sigmoid function, including the source’s ±4 examples. This mathematical activation is a simplified model, not a recording of a biological neuron.')
def dotproduct(t):
 im,d=canvas();n=min(3,int(t/2));x=[-1,3,-2];templates=[[-2,0,3],[-2,2,-1]]
 txt(d,(60,40),'Multiply corresponding entries, then add',34)
 txt(d,(60,105),'Input   [−1, 3, −2]',32)
 for k,w in enumerate(templates):
  yy=230+k*200;txt(d,(60,yy),f'Template {k+1}   {w}',28)
  products=[a*b for a,b in zip(x,w)]
  txt(d,(60,yy+60),' + '.join(f'({x[j]} × {w[j]})'for j in range(n)) or 'Compare the first entries',30,BLUE)
  if n==3:txt(d,(860,yy+60),f'= {sum(products)}',36,RED)
 txt(d,(60,680),'Raw inner products: −4 and 10. These examples are not length-normalized.',23)
 return im
encode('inner-product',9,dotproduct);register('inner-product','Hear the idea visually: input–template comparison',slides('lecture09',[12,13,15,16]),'Calculated demonstration','Uses the exact input and two templates shown in lecture 9; products sum to −4 and 10. Silent mathematical animation.')
# Early weighted neuron example.
def neuron(t):
 im,d=canvas();p=min(3,int(t/2))
 txt(d,(60,40),'A neuron adds weighted contributions',34)
 vals=[-1,1,3];ws=[-2,3,1]
 for i,(v,w) in enumerate(zip(vals,ws)):
  y=200+i*145;dot(d,170,y,BLUE,38);txt(d,(170,y),v,28,'white','mm')
  arrow(d,(220,y),(850,350),BLUE if i<p else GRAY)
  if i<p:txt(d,(400,y),f'{v} × {w} = {v*w}',27)
 dot(d,900,350,RED,60);txt(d,(900,350),sum(vals[i]*ws[i]for i in range(p)),35,'white','mm')
 txt(d,(60,650),'(−1 × −2) + (1 × 3) + (3 × 1) = 8',32)
 return im
encode('weighted-neuron',9,neuron);register('weighted-neuron','Three weighted inputs become one activation',slides('lecture10',[6,7]),'Calculated demonstration','Uses the three input values and weights in the Cajal arithmetic overlay; the output is exactly 8. This is an arithmetic model.')
# Save remainder appended below.

# Human phonetic recordings. Mapping checked against the source image maps.
ACIP='https://corpus.linguistics.berkeley.edu/acip/course/ipachart/consonants1.html'
BASE='https://d3uxfe7dw0hhy7.cloudfront.net/acip/assets/course/'
phonemes={'p':0,'b':1,'t':2,'d':3,'k':8,'g':9,'m':13,'n':15,'ŋ':18,'f':27,'v':28,'θ':29,'ð':30,'s':31,'z':32,'ʃ':33,'ʒ':34}
raw={};source_records=[]
for label,num in phonemes.items():
 name=f'Con-{num:02}a.wav';url=BASE+'ipachart/ipaSOUNDS/'+name;p=fetch(url,name)
 raw[label]=quiet(decode(p))
 source_records.append(dict(label=label,file=name,url=url,speaker='Peter Ladefoged',context='Whole before-vowel chart recording',sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
def sound_sequence(id,title,ids,labels,arrays,description,kind='Human recordings',source_url=ACIP):
 # Whole tokens, separated by silence. No time stretch or synthetic speech.
 gap=.85;parts=[np.zeros(12000)];events=[];cursor=.5
 for label,x in zip(labels,arrays):
  events.append((cursor,cursor+len(x)/24000,label,x))
  parts.extend([x,np.zeros(round(gap*24000))]);cursor+=len(x)/24000+gap
 y=np.concatenate(parts);wav=savewav(id,y)
 def frame(t):
  im,d=canvas()
  current=next((e for e in events if e[0]<=t<e[1]),None)
  txt(d,(600,125),current[2] if current else ' · '.join(labels),64,INK,'mm')
  txt(d,(600,200),'Recorded voice' if kind=='Human recordings' else kind,24,BLUE,'mm')
  # Real waveform of the active token, not a decorative signal.
  if current:
   start,end,label,x=current;edges=np.linspace(0,len(x),1001).astype(int)
   for j in range(1000):
    chunk=x[edges[j]:max(edges[j]+1,edges[j+1])]
    line(d,[(100+j,400-float(chunk.min())*450),(100+j,400-float(chunk.max())*450)],BLUE,1)
   xx=100+1000*(t-start)/(end-start);line(d,[(xx,290),(xx,510)],RED,3)
  else:line(d,[(100,400),(1100,400)],GRAY,2)
  txt(d,(600,595),' → '.join(labels),32,INK,'mm')
  return im
 encode(id,len(y)/24000,frame,audio=wav)
 register(id,title,ids,kind,description,audio=f'stimuli/clips/{id}.wav',source_url=source_url)
 M[-1]['events']=[dict(start=a,end=b,label=l)for a,b,l,x in events]
 return y
fric_ids=slides('lecture01',[8,9])+slides('lecture02',[4,6])
for id,labels,title in [('fv',['f','v'],'Labiodental /f–v/'),('th',['θ','ð'],'Dental /θ–ð/'),('sz',['s','z'],'Alveolar /s–z/'),('shzh',['ʃ','ʒ'],'Postalveolar /ʃ–ʒ/')]:
 sound_sequence('human-'+id,title,fric_ids,labels,[raw[l] for l in labels],'Peter Ladefoged’s whole human-recorded consonant-before-vowel examples. These illustrate the slide’s place and voicing contrast; they are not sustained fricatives or a recording of the professor.')
for id,labels,title in [('pbm',['p','b','m'],'Lips: /p, b, m/'),('tdn',['t','d','n'],'Tongue tip: /t, d, n/'),('kgng',['k','g','ŋ'],'Tongue back: /k, g, ŋ/')]:
 sound_sequence('human-'+id,title,slides('lecture01',[10])+slides('lecture02',[5,6]),labels,[raw[l]for l in labels],'Peter Ladefoged’s complete chart recordings before a vowel. Compare oral closure, voicing and nasal airflow. Token durations and other natural speech cues are retained.')
vowels={}
for label,num in [('i',1),('u',8),('a',4),('ɑ',5)]:
 name=f'i{num}.wav';url=BASE+'chapter9/cardinal/'+name;p=fetch(url,name);vowels[label]=quiet(decode(p))
 source_records.append(dict(label=label,file=name,url=url,speaker='Peter Ladefoged',context='Cardinal vowel reference',sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
vowel_ids=slides('lecture05-06',[12,14])+slides('lecture07',[10])+slides('lecture12',[16])+slides('lecture13',[12])+slides('lecture14',[8])+slides('lecture16',[5])
sound_sequence('human-vowels','Hear front, back and open vowel references',vowel_ids,list(vowels),list(vowels.values()),'Peter Ladefoged’s cardinal [i, u, a, ɑ] recordings. These are reference vowels for comparing tongue positions, not the professor’s five word recordings or identical English vowel categories.',source_url='https://corpus.linguistics.berkeley.edu/acip/course/chapter9/cardinal/cardinal.html')
(S/'recordings.json').write_text(json.dumps(source_records,ensure_ascii=False,indent=2))
# Reuse the previously validated recorded-human LPC comparison from LING406.
register('recorded-filter-comparison','One recorded voice, three vocal-tract filters',slides('lecture05-06',[14,15])+slides('lecture13',[20,21,22])+slides('lecture14',[16]),'Recorded voice, filtered','The same human-derived excitation passes through three documented Praat filters. This is the existing LING406 teaching comparison, not the exact LING285 formant settings.',file='../ling406/audio/clips/natural_original_then_filters_level_matched.wav',source_url='https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html')
M[-1]['type']='audio'
# Fresh human-voice resynthesis at lecture 13's displayed four-formant settings.
import parselmouth as pm
from parselmouth.praat import call
snd=pm.Sound(str(S/'i8.wav')).resample(10000,50)
lpc=call(snd,'To LPC (burg)',10,.025,.005,50);res=call([lpc,snd],'Filter (inverse)')
filters=[('schwa',[500,1500,2500,3500]),('i',[300,2300,3000,3600]),('a',[750,1200,2600,3500])]
filtered=[]
for name,ff in filters:
 grid=call('Create FormantGrid',name,0,snd.duration,4,300,1000,70,30)
 for j,(f,bw)in enumerate(zip(ff,[70,90,150,250]),1):
  call(grid,'Remove formant points between',j,0,snd.duration);call(grid,'Add formant point',j,0,f);call(grid,'Add formant point',j,snd.duration,f)
  call(grid,'Remove bandwidth points between',j,0,snd.duration);call(grid,'Add bandwidth point',j,0,bw);call(grid,'Add bandwidth point',j,snd.duration,bw)
 out=call([res,grid],'Filter (no scale)');y=signal.resample_poly(out.values[0],12,5);filtered.append(quiet(y))
source_filter_y=sound_sequence('human-source-filter','Same recorded excitation → schwa, /i/, /a/ filters',slides('lecture13',[20,21,22])+slides('lecture14',[16]),[f'{n} filter'for n,f in filters],filtered,'Praat Burg-LPC inverse filtering of Ladefoged’s recorded [u], followed by the four-formant filters printed in lecture 13. Filter targets are schwa 500/1500/2500/3500, /i/ 300/2300/3000/3600 and /a/ 750/1200/2600/3500 Hz. Each token is level matched. These are newly filtered human-voice demonstrations; the residual is an estimate, not a direct glottal recording.',kind='Recorded voice, filtered',source_url='https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html')
# Spectrum-to-spectrogram, calculated from the actual audible comparison.
yy=source_filter_y
f,tt,z=signal.stft(yy,fs=24000,nperseg=600,noverlap=480)
sel=f<=4000;db=20*np.log10(np.maximum(abs(z[sel]),1e-8));db-=db.max()
gray=np.uint8(255*(1-np.clip((db+65)/65,0,1)))
spec=Image.fromarray(np.flipud(gray)).convert('RGB').resize((960,300))
def spectrogram(t):
 im,d=canvas();txt(d,(60,35),'A spectrum is a slice; a spectrogram keeps the sequence',31)
 duration=len(yy)/24000;xx=120+960*min(t/duration,1)
 im.paste(spec,(120,320));d=ImageDraw.Draw(im)
 # Reveal only data up to playback position.
 d.rectangle((int(xx),320,1080,620),fill=BG);line(d,[(xx,320),(xx,620)],RED,3)
 k=min(len(tt)-1,int(t/(tt[1]-tt[0])));level=np.clip((db[:,k]+65)/65,0,1)
 line(d,[(120+960*freq/4000,265-120*amp)for freq,amp in zip(f[sel],level)],BLUE,2)
 txt(d,(120,100),'Current spectrum · frequency →',23);txt(d,(15,325),'4 kHz',20);txt(d,(25,600),'0 Hz',20)
 txt(d,(120,655),'Time →     Darkness represents stronger spectral energy.',24)
 return im
encode('spectrogram',len(yy)/24000,spectrogram,C/'human-source-filter.wav')
register('spectrogram','Watch a spectrogram form while the sound plays',slides('lecture13',[23,26])+slides('lecture14',[18])+slides('lecture05-06',[14]),'Calculated from recorded voice','The waveform and STFT come from the playable human-source-filter comparison. 25 ms Hann windows and 5 ms steps; grayscale spans 65 dB. No decorative or invented spectrogram.')
# Nonspeech tones: exact oscillator calculations, short fades and quiet levels.
def tone(f,duration=2,sr=24000,odd=False,comb=False):
 t=np.arange(round(duration*sr))/sr
 hs=range(1,min(40,int(8000/f))+1,2 if odd else 1) if comb else [1]
 y=sum(np.sin(2*np.pi*f*h*t)/h for h in hs)
 ramp=min(480,len(y)//2);env=np.ones(len(y));env[:ramp]=np.linspace(0,1,ramp);env[-ramp:]=np.linspace(1,0,ramp)
 return quiet(y*env)
sound_sequence('frequency-tones','Hear 100, 250 and 350 cycles per second',slides('lecture07',[11,13])+slides('lecture08',[4,8])+slides('lecture14',[15]),['100 Hz','250 Hz','350 Hz'],[tone(f)for f in [100,250,350]],'Calculated sine tones at the displayed frequencies, with 20 ms fades. These are nonspeech frequency references, not human vocal-fold recordings.',kind='Calculated nonspeech tones',source_url='')
sound_sequence('harmonic-series','Hear integer and odd harmonic series',slides('lecture05-06',[18])+slides('lecture11',[8,10,11])+slides('lecture12',[8,9,10,13,14,22])+slides('lecture13',[2,4,5,7,8,9]),['100 Hz alone','100, 200, 300… Hz','100, 300, 500… Hz'],[tone(100),tone(100,comb=True),tone(100,comb=True,odd=True)],'Ideal harmonic sums with amplitude 1/h, band limited to 4 kHz for this 100 Hz example. The integer and odd series illustrate fixed–fixed and fixed–free boundary conditions; they are not recordings of the slowed spring animations.',kind='Calculated nonspeech tones',source_url='')
# A schematic frequency-place animation with synchronized audible tones.
coch_y=np.concatenate([np.r_[tone(f,3),np.zeros(12000)]for f in [250,1000,4000]])
savewav('cochlea',coch_y)
def cochlea(t):
 im,d=canvas();i=min(2,int(t/3.5));freq=[250,1000,4000][i];peak=[.80,.50,.20][i];x=np.linspace(0,1,700)
 txt(d,(60,40),'Different frequencies peak at different places',34)
 txt(d,(60,110),f'{freq} Hz tone · unrolled basilar membrane',28,BLUE)
 amp=np.exp(-((x-peak)/.14)**2)*np.minimum(x/.10,1);motion=amp*np.sin(2*np.pi*(7*x-t*2))
 line(d,[(90+1020*a,380-85*b)for a,b in zip(x,motion)],BLUE,4)
 line(d,[(90,380),(1110,380)],GRAY,1)
 txt(d,(90,530),'Base · higher frequencies',24);txt(d,(820,530),'Apex · lower frequencies',24)
 txt(d,(60,640),'Envelope and motion are schematic and slowed for visibility.',24)
 return im
encode('cochlea',len(coch_y)/24000,cochlea,C/'cochlea.wav')
register('cochlea','Hear frequency and see its place along the cochlea',slides('lecture07',[14])+slides('lecture08',[5,6,7]),'Calculated schematic','Pure tones at 250, 1000 and 4000 Hz accompany a qualitative, unrolled basilar-membrane diagram. Peak locations are illustrative rather than a calibrated cochlear model. The animation is slowed independently of the sound.',source_url='https://www.nidcd.nih.gov/health/how-do-we-hear')
# Original GIFs get ordinary pauseable video controls.
for file,probe in json.loads((Q/'original-media-probe.json').read_text()).items():
 if file.endswith('.gif') and probe['duration']>1:
  id='original-'+Path(file).stem
  subprocess.run(['ffmpeg','-y','-v','error','-i',str(R/file),'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(C/(id+'.mp4'))],check=True)
  register(id,SE[probe['slides'][0]]['title']+' · play-through',probe['slides'],'Original animation, converted','The existing animated GIF is converted to MP4 so it can be paused and scrubbed. Original timing is retained.')
# Gallery inventory of existing originals; no duplicates appended beside their source slides.
for file,probe in json.loads((Q/'original-media-probe.json').read_text()).items():
 if file.endswith('.gif'):continue
 id='source-'+Path(file).stem
 row=register(id,SE[probe['slides'][0]]['title'],probe['slides'],'Original embedded media','Unmodified embedded course media. '+('Includes its original audio track.' if any(s['codec_type']=='audio'for s in probe['streams'])else 'The source has no audio track.'),file=file,original=True)
 row['type']='audio' if file.endswith('.wav')else'video'
# Persist a complete, explicit page inventory.
for row in M:
 poster=P/(row['id']+'.jpg')
 if poster.exists():row['poster']='stimuli/posters/'+poster.name
 row['modules']=[m['id']for m in D['modules']if any(s.split('-p')[0]in m['lectureIds'] for s in row['slides'])]
 row['sourceSlides']=[dict(id=s,title=SE[s]['title'])for s in row['slides']]
assert len({m['id']for m in M})==len(M)
for m in M:
 assert all(s in SE for s in m['slides'])
 assert (R/m['file']).is_file(),m['file']
(O/'manifest.json').write_text(json.dumps(M,ensure_ascii=False,indent=2))
(O/'manifest.js').write_text('window.LING285_STIMULI = '+json.dumps(M,ensure_ascii=False)+';\n')
(Q/'audio-validation.json').write_text(json.dumps(checks,indent=2))
coverage=[]
for c in D['collections']:
 if c.get('role')!='lecture':continue
 for s in c['sections']:
  entries=[m['id']for m in M if s['id']in m['slides']]
  status='playable-media'if entries else 'source-only'
  reason='Playable entries listed; original source retained.'if entries else 'Static conceptual, administrative or source material retained; no recorded stimulus supplied for this page.'
  if s['id']=='lecture14-p020':reason='The source gives an experiment prompt without its procedure or stimuli. No experiment was invented.'
  coverage.append(dict(id=s['id'],title=s['title'],status=status,entries=entries,reason=reason))
(Q/'coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2))
print(f'Rendered {len([m for m in M if not m.get("original")])} additions; indexed {len(M)} media entries.')
