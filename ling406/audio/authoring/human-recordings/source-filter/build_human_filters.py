from pathlib import Path
import json,hashlib,wave,argparse
import numpy as np,parselmouth as pm
from parselmouth.praat import call
D=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--output-dir',type=Path,required=True);args=p.parse_args();O=args.output_dir.resolve();O.mkdir(parents=True,exist_ok=True)
source=D/'i8.wav'
original_sound=pm.Sound(str(source));s=original_sound;sr=10000
# Direct implementation of Praat's existing-human-sounds source/filter tutorial.
s=s.resample(sr,50)
lpc=call(s,'To LPC (burg)',10,.025,.005,50)
residual=call([lpc,s],'Filter (inverse)')
fs=[('base',[300,900,2500,3500]),('raised_f1',[600,900,2500,3500]),('raised_f2',[300,2200,2500,3500])]
outputs=[]
for stem,ff in fs:
 g=call('Create FormantGrid',stem,0,s.duration,4,300,1000,70,30)
 for i,(f,bw) in enumerate(zip(ff,[70,90,150,250]),1):
  call(g,'Remove formant points between',i,0,s.duration)
  call(g,'Add formant point',i,0,f);call(g,'Add formant point',i,s.duration,f)
  call(g,'Remove bandwidth points between',i,0,s.duration)
  call(g,'Add bandwidth point',i,0,bw);call(g,'Add bandwidth point',i,s.duration,bw)
 out=call([residual,g],'Filter (no scale)')
 outputs.append((stem,out.values[0],ff))
# Common gain across target filters; no robotic periodic source or F0 flattening.
common=min(.055/max(np.sqrt(np.mean(y*y))for _,y,_ in outputs),.20/max(np.max(abs(y))for _,y,_ in outputs))
records=[]
def save(name,x,ff=None,gain=1.,rate=sr):
 x=x*gain
 p=O/(name+'.wav')
 with wave.open(str(p),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(np.rint(x*32767).astype('<i2').tobytes())
 snd=pm.Sound(str(p));pi=snd.to_pitch_ac(pitch_floor=60,pitch_ceiling=250);pv=pi.selected_array['frequency'];pv=pv[pv>0]
 fm=snd.to_formant_burg(max_number_of_formants=4 if ff else 6,maximum_formant=4500 if ff else 4000)
 rows=[]
 for t in np.linspace(.08,.5,15):rows.append([fm.get_value_at_time(n,float(t))for n in[1,2,3,4]])
 records.append(dict(file=p.name,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),formant_targets_hz=ff,peak=float(max(abs(x))),rms=float(np.sqrt(np.mean(x*x))),pitch_median=float(np.median(pv)),pitch_sd=float(np.std(pv)),measured_formants_median=np.nanmedian(rows,axis=0).tolist(),samples=len(x),sample_rate=rate,gain=float(gain),formant_estimation_settings=dict(maximum_formants=4 if ff else 6,ceiling_hz=4500 if ff else 4000)))
 return x
native_original=original_sound.values[0];native_gain=min(.055/np.sqrt(np.mean(native_original*native_original)),.20/max(abs(native_original)));save('natural_recording_original_rate',native_original,gain=native_gain,rate=int(original_sound.sampling_frequency))
orig=s.values[0];natgain=min(.055/np.sqrt(np.mean(orig*orig)),.20/max(abs(orig)))
native=save('natural_original_u',orig,gain=natgain)
res=residual.values[0];resgain=min(.025/np.sqrt(np.mean(res*res)),.1/max(abs(res)))
save('natural_estimated_excitation',res,gain=resgain)
filtered=[]
for stem,y,ff in outputs:filtered.append(save('natural_'+stem,y,ff,common))
gap=np.zeros(round(.7*sr));seq=np.concatenate([part for i,x in enumerate(filtered)for part in([x,gap]if i<2 else[x])])
save('natural_three_filters',seq,gain=1.)
# Full original-plus-three is a listening presentation, not a controlled trial.
seq=np.concatenate([part for i,x in enumerate([native]+filtered)for part in([x,gap]if i<3 else[x])])
save('natural_original_then_filters',seq,gain=1.)
(O/'prototype.json').write_text(json.dumps(dict(source_url='https://d3uxfe7dw0hhy7.cloudfront.net/acip/assets/course/chapter9/cardinal/i8.wav',landing='https://corpus.linguistics.berkeley.edu/acip/course/chapter9/cardinal/cardinal.html',speaker='Peter Ladefoged, PL_primary chart',source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),method='Praat existing-sounds source-filter tutorial. 10kHz resampling, BurgLPC10,.025swindow,.005sstep,50Hzpreemphasis. Filter(inverse) residual carries original phonation. Same residual through threeexact4formantfilters. Common gain all3filtered outputs.',method_url='https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html',claim_limits=['Residual is estimated excitation including lipradiation; not directglottis recording.','Source is authentic cardinal vowel; transformedoutputs are new resynthesis.','No subjective naturalness or nativeperceptualvalidation claimed.','All-rights-reserved sourcechart; no openlicenseinvented.'],records=records),indent=2)+'\n')
print(json.dumps(records,indent=2))
