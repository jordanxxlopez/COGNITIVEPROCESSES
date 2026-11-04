"""Additional source-preserving play-throughs using FFmpeg only."""
from pathlib import Path
import json,subprocess
from PIL import Image,ImageOps
R=Path('ling285');O=R/'stimuli';M=json.loads((O/'manifest.json').read_text());D=json.loads((R/'data.json').read_text());SE={s['id']:s for c in D['collections']for s in c['sections']}
for id,title,ids,description in [
 ('early-network','The early multilayer network and changed-input quiz',['lecture10-p009','lecture10-p010'],'The two original network displays, shown for eight seconds each. The second display is a changed-input quiz; no unprovided downstream values are invented.'),
 ('vowel-network-source','Formants, weights, forward flow and code',['lecture14-p021','lecture14-p022','lecture14-p023','lecture14-p024','lecture14-p025'],'Original source pages in sequence, held for five seconds each. Lecture 14 labels its output distribution as illustrative; this sequence preserves that source example rather than claiming to calculate it.'),
 ('training-source','Vowel observations and the recorded training plots',['lecture16-p005','lecture16-p015','lecture16-p016'],'Original plots of the 525 formant observations and recorded training curves, held for seven seconds each. These are the existing source results; no new training run or invented dataset is presented.')
]:
 hold=8 if id=='early-network'else 5 if id=='vowel-network-source'else 7
 # Stream explicit RGB frames so differing WebP time bases cannot truncate a stage.
 out=O/'clips'/(id+'.mp4')
 proc=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s','1200x720','-r','12','-i','-','-c:v','libx264','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],stdin=subprocess.PIPE)
 for sid in ids:
  frame=ImageOps.pad(Image.open(R/SE[sid]['image']).convert('RGB'),(1200,720),color='white').tobytes()
  for j in range(hold*12):proc.stdin.write(frame)
 proc.stdin.close();assert proc.wait()==0
 duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(out)]))
 assert abs(duration-hold*len(ids))<.1,(id,duration)
 poster=O/'posters'/(id+'.jpg');subprocess.run(['ffmpeg','-y','-v','error','-ss',str(hold+1),'-i',str(out),'-frames:v','1',str(poster)],check=True)
 M=[m for m in M if m['id']!=id]
 M.append(dict(id=id,title=title,slides=ids,kind='Source slide sequence',description=description,file='stimuli/clips/'+id+'.mp4',poster='stimuli/posters/'+id+'.jpg',type='video',expectedDuration=hold*len(ids),modules=[m['id']for m in D['modules']if any(s.split('-p')[0]in m['lectureIds']for s in ids)],sourceSlides=[dict(id=s,title=SE[s]['title'])for s in ids]))
(O/'manifest.json').write_text(json.dumps(M,ensure_ascii=False,indent=2));(O/'manifest.js').write_text('window.LING285_STIMULI = '+json.dumps(M,ensure_ascii=False)+';\n')
coverage=json.loads((O/'qa/coverage.json').read_text())
for s in coverage:
 s['entries']=[m['id']for m in M if s['id']in m['slides']]
 if s['entries']:s['status']='playable-media';s['reason']='Playable entries listed; original source retained.'
(O/'qa/coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2))
