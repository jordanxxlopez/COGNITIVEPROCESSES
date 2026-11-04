import json,subprocess,pathlib,math
from PIL import Image,ImageDraw
R=pathlib.Path('ling285'); O=R/'stimuli/qa'; O.mkdir(parents=True,exist_ok=True)
d=json.loads((R/'data.json').read_text())
inventory=[]; media={}
for c in d['collections']:
 if c.get('role')!='lecture': continue
 sheets=[]
 for s in c['sections']:
  inventory.append({'id':s['id'],'title':s['title'],'sourceText':s.get('sourceText',''),'speakerNotes':s.get('speakerNotes',''),'assets':s.get('assets',[])})
  p=R/s['image']
  im=Image.open(p).convert('RGB'); im.thumbnail((480,300))
  tile=Image.new('RGB',(500,340),'white');tile.paste(im,((500-im.width)//2,28));ImageDraw.Draw(tile).text((10,5),s['id'],fill='black');sheets.append(tile)
  for a in s.get('assets',[]):
   if a['type'] in ['video','audio'] or a['file'].endswith('.gif'):
    media.setdefault(a['file'],{'slides':[]})['slides'].append(s['id'])
 for start in range(0,len(sheets),12):
  chunk=sheets[start:start+12]; out=Image.new('RGB',(1500,340*math.ceil(len(chunk)/3)),'#ddd')
  for i,t in enumerate(chunk):out.paste(t,((i%3)*500,(i//3)*340))
  out.save(O/f"{c['id']}-{start//12}.jpg",quality=85)
for file,entry in media.items():
 p=R/file
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
 entry['streams']=[{k:s.get(k) for k in ['codec_type','codec_name','width','height','sample_rate','channels','duration']} for s in probe['streams']]
 duration=float(probe.get('format',{}).get('duration',1));entry['duration']=duration
 if any(s['codec_type']=='video' for s in probe['streams']):
  frames=[]
  for i,f in enumerate([.05,.3,.55,.8]):
   dst=O/'frame.png';subprocess.run(['ffmpeg','-y','-v','error','-ss',str(duration*f),'-i',str(p),'-frames:v','1',str(dst)],check=True)
   im=Image.open(dst).convert('RGB');im.thumbnail((400,280));frames.append(im)
  out=Image.new('RGB',(800,600),'white');dr=ImageDraw.Draw(out);dr.text((5,5),file,fill='black')
  for i,im in enumerate(frames):out.paste(im,((i%2)*400,30+(i//2)*280))
  out.save(O/(p.stem+'.jpg'),quality=85)
(O/'frame.png').unlink(missing_ok=True)
(O/'source-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2))
(O/'original-media-probe.json').write_text(json.dumps(media,indent=2))
