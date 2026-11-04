"""Additional source-preserving play-throughs using FFmpeg only."""
from pathlib import Path
import json,subprocess
R=Path('ling285');O=R/'stimuli';M=json.loads((O/'manifest.json').read_text());D=json.loads((R/'data.json').read_text());SE={s['id']:s for c in D['collections']for s in c['sections']}
for id,title,ids,description in [
 ('early-network','The early multilayer network and changed-input quiz',['lecture10-p009','lecture10-p010'],'The two original network displays, shown for eight seconds each. The second display is a changed-input quiz; no unprovided downstream values are invented.'),
 ('vowel-network-source','Formants, weights, forward flow and code',['lecture14-p021','lecture14-p022','lecture14-p023','lecture14-p024','lecture14-p025'],'Original source pages in sequence, held for five seconds each. Lecture 14 labels its output distribution as illustrative; this sequence preserves that source example rather than claiming to calculate it.'),
 ('training-source','Vowel observations and the recorded training plots',['lecture16-p005','lecture16-p015','lecture16-p016'],'Original plots of the 525 formant observations and recorded training curves, held for seven seconds each. These are the existing source results; no new training run or invented dataset is presented.')
]:
 hold=8 if id=='early-network'else 5 if id=='vowel-network-source'else 7
 # Concatenate still source frames into a true pauseable, seekable video.
 listing=O/'authoring'/('concat-'+id+'.txt')
 lines=[]
 for sid in ids:lines += ["file '"+str((R/SE[sid]['image']).resolve())+"'",'duration '+str(hold)]
 lines += ["file '"+str((R/SE[ids[-1]]['image']).resolve())+"'"]
 listing.write_text('\n'.join(lines))
 out=O/'clips'/(id+'.mp4')
 subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(listing),'-vf','scale=1200:720:force_original_aspect_ratio=decrease,pad=1200:720:(ow-iw)/2:(oh-ih)/2:white,setsar=1','-r','12','-t',str(hold*len(ids)),'-c:v','libx264','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],check=True)
 listing.unlink()
 poster=O/'posters'/(id+'.jpg');subprocess.run(['ffmpeg','-y','-v','error','-ss',str(hold+1),'-i',str(out),'-frames:v','1',str(poster)],check=True)
 M=[m for m in M if m['id']!=id]
 M.append(dict(id=id,title=title,slides=ids,kind='Source slide sequence',description=description,file='stimuli/clips/'+id+'.mp4',poster='stimuli/posters/'+id+'.jpg',type='video',modules=[m['id']for m in D['modules']if any(s.split('-p')[0]in m['lectureIds']for s in ids)],sourceSlides=[dict(id=s,title=SE[s]['title'])for s in ids]))
(O/'manifest.json').write_text(json.dumps(M,ensure_ascii=False,indent=2));(O/'manifest.js').write_text('window.LING285_STIMULI = '+json.dumps(M,ensure_ascii=False)+';\n')
coverage=json.loads((O/'qa/coverage.json').read_text())
for s in coverage:
 s['entries']=[m['id']for m in M if s['id']in m['slides']]
 if s['entries']:s['status']='playable-media';s['reason']='Playable entries listed; original source retained.'
(O/'qa/coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2))
