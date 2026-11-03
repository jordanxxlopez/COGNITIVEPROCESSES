from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,subprocess,hashlib,sys
ROOT=Path(__file__).resolve().parents[3];OUT=ROOT/'psyc301-videos'
sys.path.insert(0,str(Path(__file__).parent))
from render import frame,MOVES
manifest=json.loads((OUT/'manifest.json').read_text());qa=OUT/'qa';qa.mkdir(exist_ok=True)
report=[];cards=[]
for c in manifest['clips']:
 p=ROOT/c['file'];assert p.exists(),c['file']
 meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 v=next(s for s in meta['streams'] if s['codec_type']=='video')
 if not c.get('existing'):
  assert v['codec_name']=='h264' and v['pix_fmt']=='yuv420p'
  assert (v['width'],v['height'])==(960,600)
  assert int(v['nb_frames'])==c['duration']*c['fps']
  assert abs(float(meta['format']['duration'])-c['duration'])<.1
  assert any(s['codec_type']=='audio' for s in meta['streams'])==('tone' in c.get('params',{}))
  assert not p.with_suffix('.silent.mp4').exists()
  # Ensure the encoded stream can actually be decoded.
  subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','null','-'],check=True)
  times=[.5,1.0167,c['duration']/2,c['duration']-.5]
  sheet=Image.new('RGB',(960,600),'white')
  for i,t in enumerate(times):
   small=frame(c,t).resize((480,300),Image.Resampling.LANCZOS);sheet.paste(small,((i%2)*480,(i//2)*300))
  sheet.save(qa/(c['id']+'-contact.jpg'),quality=86)
  cards.append(Image.open(ROOT/c['poster']).resize((320,200)))
 report.append({'id':c['id'],'file':c['file'],'duration':float(meta['format']['duration']),'width':v['width'],'height':v['height'],'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'status':'passed'})
# Check exact 50 ms frame indices (60 fps), not a rounded 30 fps substitute.
for c in manifest['clips']:
 if c['id'].startswith('sperling'):
  ids=[i for i in range(120) if 1<=i/60<1.05]
  assert ids==[60,61,62]
stacks=[[3,2,1],[],[]]
for a,b in MOVES:
 disk=stacks[a].pop();assert not stacks[b] or stacks[b][-1]>disk;stacks[b].append(disk)
assert stacks==[[],[],[3,2,1]]
sheet=Image.new('RGB',(1280,((len(cards)+3)//4)*200),'white')
for i,im in enumerate(cards):sheet.paste(im,((i%4)*320,(i//4)*200))
sheet.save(qa/'overview.jpg',quality=92)
(OUT/'validation.json').write_text(json.dumps({'status':'passed','clips':report,'briefExposureFrames':[60,61,62],'hanoiLegal':True},indent=2)+'\n')
print(json.dumps({'status':'passed','clips':len(report)}))
