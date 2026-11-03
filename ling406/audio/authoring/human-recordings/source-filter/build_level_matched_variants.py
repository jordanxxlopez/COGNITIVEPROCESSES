"""Level match new natural-excitation resyntheses for perceptual comparison.
This does not change pitch, formant frequencies, duration or within-token envelope.
Each token receives one constant gain. This is not a historical trial reconstruction.
"""
from pathlib import Path
import json,wave,hashlib,argparse,numpy as np,parselmouth as pm
p=argparse.ArgumentParser();p.add_argument('--input-dir',type=Path,required=True);p.add_argument('--output-dir',type=Path,required=True);args=p.parse_args();D=args.input_dir.resolve();O=args.output_dir.resolve();O.mkdir(parents=True,exist_ok=True)
sr=10000;out=[];records=[]
for id in ['natural_base','natural_raised_f1','natural_raised_f2']:
 s=pm.Sound(str(D/(id+'.wav')));x=s.values[0];rms=float(np.sqrt(np.mean(x*x)));gain=.045/rms;y=x*gain
 assert max(abs(y))<.25
 name=id+'_level_matched.wav'
 with wave.open(str(O/name),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(np.rint(y*32767).astype('<i2').tobytes())
 out.append(y);records.append(dict(file=name,input=id+'.wav',gain=gain,rms=.045,peak=float(max(abs(y))),samples=len(y),sha256=hashlib.sha256((O/name).read_bytes()).hexdigest()))
gap=np.zeros(round(.7*sr))
native=pm.Sound(str(D/'natural_original_u.wav')).values[0];native_gain=.045/float(np.sqrt(np.mean(native*native)))
for stem,seq in [('natural_three_filters_level_matched',out),('natural_original_then_filters_level_matched',[native*native_gain]+out)]:
 y=np.concatenate([piece for i,x in enumerate(seq)for piece in([x,gap]if i<len(seq)-1 else[x])])
 with wave.open(str(O/(stem+'.wav')),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(np.rint(y*32767).astype('<i2').tobytes())
 records.append(dict(file=stem+'.wav',sequence=([dict(file='natural_original_u.wav',gain=native_gain)]+[r['file']for r in records[:3]]if len(seq)==4 else[r['file']for r in records[:3]]),gap_seconds=.7,samples=len(y),sha256=hashlib.sha256((O/(stem+'.wav')).read_bytes()).hexdigest()))
(O/'level-matching.json').write_text(json.dumps(dict(method='Constant gain per token to common RMS0.045; no additional timbre or timing change. High-order formants remainfixed; F1/F2 targets differ asdocumented inprototype.json. Newplaybackcomparisons, not originalstudyfiles.',records=records),indent=2)+'\n')
print(json.dumps(records,indent=2))
