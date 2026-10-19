from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
from PIL import Image,ImageDraw,ImageOps
import json,subprocess,io,os
os.environ["OMP_THREAD_LIMIT"]="1"
ROOT=Path(__file__).resolve().parents[1];A=ROOT/'authoring'
def white_image(path):
 im=Image.open(path).convert('RGBA');bg=Image.new('RGBA',im.size,'white');bg.alpha_composite(im);return bg.convert('RGB')
assets=json.loads((A/'embedded-manifest.json').read_text());seen=set();unique=[]
for a in assets:
 if a['sha256'] in seen:continue
 seen.add(a['sha256']);unique.append(a)
def process(a):
 p=ROOT/a['file'];a['visualReviewed']=False
 if p.suffix=='.mp4':
  probe=subprocess.run(['ffprobe','-v','quiet','-show_entries','format=duration','-of','json',str(p)],capture_output=True,text=True)
  try:dur=float(json.loads(probe.stdout)['format']['duration'])
  except:dur=0
  a['duration']=dur;frames=[]
  for idx,fraction in enumerate([.05,.3,.6,.9]):
   target=A/'embedded'/p.parent.name/(p.stem+f'-frame{idx}.png')
   r=subprocess.run(['ffmpeg','-y','-v','error','-ss',str(dur*fraction),'-i',str(p),'-frames:v','1',str(target)],capture_output=True,timeout=40)
   if target.exists():frames.append(str(target.relative_to(ROOT)))
  a['frames']=frames
 elif p.suffix=='.wav':a['status']='Audio extracted; no transcript asserted'
 else:
  try:
   im=Image.open(p).convert('RGB');a['size']=list(im.size)
   # OCR every unique raster image, even on a text-bearing slide.
   ocr=A/'embedded'/(a['sha256'][:16]+'.ocr.txt')

   if not ocr.exists():
    r=subprocess.run(['tesseract',str(p),'stdout','--psm','3'],capture_output=True,text=True,timeout=30);ocr.write_text(r.stdout)
   a['ocr']=str(ocr.relative_to(ROOT))
   if getattr(Image.open(p),'is_animated',False):
    gif=Image.open(p);a['frames']=[]
    for i in sorted(set([0,gif.n_frames//3,2*gif.n_frames//3,gif.n_frames-1])):
     gif.seek(i);target=p.with_name(p.stem+f'-frame{i}.png');gif.convert('RGB').save(target);a['frames'].append(str(target.relative_to(ROOT)))
  except Exception as e:a['extractionIssue']=type(e).__name__+': '+str(e)
 return a
with ThreadPoolExecutor(max_workers=4) as pool:
 for n,f in enumerate(as_completed([pool.submit(process,a) for a in unique]),1):
  f.result()
  if n%40==0:print('OCR/media assets',n,'/',len(unique),flush=True)
(A/'unique-embedded.json').write_text(json.dumps(unique,ensure_ascii=False,indent=2))
# Index each unique asset independently; repeated source images are deduplicated by content hash.
for start in range(0,len(unique),9):
 grid=Image.new('RGB',(1800,1350),'#ddd');draw=ImageDraw.Draw(grid)
 for j,a in enumerate(unique[start:start+9]):
  path=ROOT/(a.get('frames') or [a['file']])[0]
  x=(j%3)*600;y=(j//3)*450
  draw.text((x+5,y+4),str(start+j+1)+' '+a['source']+'/'+Path(a['file']).name,fill='black')
  try:
   im=white_image(path);im.thumbnail((580,420));grid.paste(im,(x+(600-im.width)//2,y+25))
  except:draw.text((x+20,y+80),a.get('status','Media asset'),fill='black')
 grid.save(A/'review-grids'/f'embedded-{start+1:03}-{min(start+9,len(unique)):03}.jpg',quality=92)
# All frames of animations receive their own review grids.
for i,a in enumerate(unique,1):
 if not a.get('frames'):continue
 frames=a['frames'];grid=Image.new('RGB',(1600,1100),'#ddd');draw=ImageDraw.Draw(grid)
 for j,f in enumerate(frames[:4]):
  im=white_image(ROOT/f);im.thumbnail((780,520));x=(j%2)*800;y=(j//2)*550;grid.paste(im,(x+(800-im.width)//2,y+25));draw.text((x+5,y+4),str(i)+' '+a['source']+' '+Path(f).name,fill='black')
 grid.save(A/'review-grids'/f'animation-{i:03}.jpg',quality=92)
print('Embedded OCR/frame extraction complete',len(unique),flush=True)
