import json,pathlib,subprocess,hashlib
from PIL import Image,ImageDraw
R=pathlib.Path('ling285');O=R/'stimuli';Q=O/'qa'
baseline='b5cc465577464d8f4c769ecb1830a085e6d13539'
changed=subprocess.check_output(['git','diff',baseline,'--name-only'],text=True).splitlines()
assert all(p.startswith('ling285/stimuli/') or p in ['ling285/app.js','ling285/index.html','.github/workflows/ling285-media-audit.yml','.github/workflows/ling285-recording-sources.yml','.github/workflows/ling285-coded-media.yml','.github/workflows/ling285-media-checks.yml']for p in changed),changed
# Exact preservation of all existing course files except the two additive integration hooks.
files=subprocess.check_output(['git','ls-tree','-r','--name-only',baseline,'ling285'],text=True).splitlines()
preserved=[]
for file in files:
 if file in ['ling285/app.js','ling285/index.html']:continue
 original=subprocess.check_output(['git','show',baseline+':'+file])
 assert pathlib.Path(file).read_bytes()==original,file
 preserved.append(file)
M=json.loads((O/'manifest.json').read_text());reports=[];frames=[]
for m in M:
 p=R/m['file'];assert p.exists(),str(p)
 r=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 assert float(r['format']['duration'])>0
 if m['type']=='video':
  assert any(s['codec_type']=='video'for s in r['streams'])
  if not m.get('original'):
   # Fully decode every newly made video, not only headers.
   subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','null','-'],check=True)
   duration=float(r['format']['duration'])
   for j,frac in enumerate([.15,.5,.85]):
    dst=Q/'temp-frame.png'
    subprocess.run(['ffmpeg','-y','-v','error','-ss',str(duration*frac),'-i',str(p),'-frames:v','1',str(dst)],check=True)
    im=Image.open(dst).convert('RGB');im.thumbnail((400,240));tile=Image.new('RGB',(420,275),'white');tile.paste(im,(10,30));ImageDraw.Draw(tile).text((8,6),m['id']+f' {frac:.0%}',fill='black');frames.append(tile)
 if m.get('events'):
  e=m['events'][0];sample_time=(e['start']+e['end'])/2
  subprocess.run(['ffmpeg','-y','-v','error','-ss',str(sample_time),'-i',str(p),'-frames:v','1',str(O/'posters'/(m['id']+'.jpg'))],check=True)
 reports.append(dict(id=m['id'],duration=float(r['format']['duration']),streams=[s['codec_type']for s in r['streams']],sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
for start in range(0,len(frames),12):
 chunk=frames[start:start+12];out=Image.new('RGB',(1260,275*((len(chunk)+2)//3)),'#ddd')
 for i,im in enumerate(chunk):out.paste(im,((i%3)*420,(i//3)*275))
 out.save(Q/f'render-check-{start//12:02}.jpg',quality=90)
(Q/'temp-frame.png').unlink(missing_ok=True)
(Q/'verification.json').write_text(json.dumps(dict(passed=True,preserved_files=len(preserved),preservation_baseline=baseline,media=reports),indent=2))
print('PASS',len(preserved),'original LING285 files unchanged;',len(M),'playable entries checked.')
