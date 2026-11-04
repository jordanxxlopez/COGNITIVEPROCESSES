"""Deterministic classroom source-filter acoustic demonstrations.

NOT recovered study stimuli and NOT independently validated phoneme exemplars.
The model isolates explicitly stated acoustic parameters, not speaker identity.
"""
from pathlib import Path
import numpy as np
import wave,json,hashlib,subprocess,base64,re,requests,concurrent.futures
import argparse
p=argparse.ArgumentParser();p.add_argument('--output',type=Path,default=Path(__file__).resolve().parent/'generated');args=p.parse_args();D=args.output.resolve();D.mkdir(parents=True,exist_ok=True); A=D/'audio';A.mkdir(exist_ok=True); S=D/'sources';S.mkdir(exist_ok=True)
SR=24000;F0=120.0;rng=np.random.default_rng(406)
manifest=[]
def source(dur=.8,onset=0):
 t=np.arange(round(SR*dur))/SR; phase=((t-onset)*F0)%1;g=np.zeros_like(t)
 m=phase<.6;g[m]=.5*(1-np.cos(np.pi*phase[m]/.6));m=(phase>=.6)&(phase<.8);g[m]=np.cos(np.pi*(phase[m]-.6)/.4)
 y=np.diff(g,prepend=0);y[t<onset]=0
 return t,y

def filt(x,fs,bws=[70,90,150,250]):
 # Praat's documented Sound & FormantGrid filtering. Frequency tiers use
 # linear interpolation, matching the specified onset-to-vowel transition.
 import parselmouth as pm
 from parselmouth.praat import call
 dur=len(x)/SR
 snd=pm.Sound(x,sampling_frequency=SR)
 grid=call('Create FormantGrid','filter',0,dur,len(fs),300,1000,70,30)
 for i,(freq,bw) in enumerate(zip(fs,bws),1):
  call(grid,'Remove formant points between',i,0,dur)
  if np.isscalar(freq):points=[(0,float(freq)),(dur,float(freq))]
  else:points=[(0,float(freq[0])),(.050,float(freq[min(int(.050*SR),len(freq)-1)])),(dur,float(freq[-1]))]
  for time,value in points:call(grid,'Add formant point',i,time,value)
  call(grid,'Remove bandwidth points between',i,0,dur)
  call(grid,'Add bandwidth point',i,0,bw);call(grid,'Add bandwidth point',i,dur,bw)
 return call([snd,grid],'Filter (no scale)').values[0]

def envelope(t,dur):return np.minimum(1,t/.012)*np.minimum(1,np.maximum(0,dur-t)/.045)
def write(id,x,desc,parameters,scope='Acoustic-model teaching demonstration. Newly generated; not original experimental stimuli.', common_peak=None):
 peak=float(np.max(np.abs(x))); x=x/max(common_peak if common_peak is not None else peak,1e-12)*.78;pcm=np.round(x*32767).astype('<i2');wav=A/(id+'.wav')
 with wave.open(str(wav),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
 mp3=A/(id+'.mp3');subprocess.run(['ffmpeg','-y','-v','error','-i',str(wav),'-c:a','libmp3lame','-b:a','128k',str(mp3)],check=True)
 subprocess.run(['ffmpeg','-v','error','-i',str(mp3),'-f','null','-'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 manifest.append(dict(id=id,file=str(mp3.relative_to(D)),lossless_file=str(wav.relative_to(D)),description=desc,kind='acoustic-model',model='Rosenberg-style differentiated glottal source filtered by Praat Sound & FormantGrid via praat-parselmouth 0.4.7',parameters=parameters,scope=scope,source_url='https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis.html',generation_script='build_phonetic.py',duration=len(x)/SR,sample_rate=SR,sha256=hashlib.sha256(mp3.read_bytes()).hexdigest(),lossless_sha256=hashlib.sha256(wav.read_bytes()).hexdigest(),full_decode_pass=True,clipping_samples=int(np.sum(np.abs(pcm)==32767))))

# Source held constant while the same resonator model changes selected formants.
t,x=source();fs_base=[300,900,2500,3500];env=envelope(t,.8)
write('source_buzz',x*env,'Unfiltered synthetic voiced source, 120 Hz fundamental',{'f0_hz':F0,'duration_ms':800})
for id,fs,label in [('vowel_base',fs_base,'Base filter, F1 300 Hz and F2 900 Hz'),('vowel_raise_f1',[600,900,2500,3500],'Same source, F1 raised to 600 Hz'),('vowel_raise_f2',[300,2200,2500,3500],'Same source, F2 raised to 2200 Hz')]:
 write(id,filt(x,fs)*env,label,{'f0_hz':F0,'formants_hz':fs,'bandwidths_hz':[70,90,150,250],'duration_ms':800},'New source-filter vowel-like demonstration using stated resonances. Not a recording of the lecturer or a recovered original Praat example. Vowel labels are deliberately omitted because perceptual identity varies with formant configuration and talker scaling.')

# Same F1 trajectory; only F2 onset varies in 13 equally spaced onset settings.
CONT=[]
for i,onset in enumerate(np.linspace(500,2500,13)):
 t,x=source(.35); transition=np.minimum(t/.050,1)
 f1=100+(700-100)*transition;f2=onset+(1100-onset)*transition
 y=filt(x,[f1,f2,3000,3900])*envelope(t,.35)
 CONT.append((i,onset,y))
common=max(float(np.max(np.abs(y)))for _,_,y in CONT)
for i,onset,y in CONT:
 write('f2_step_'+str(i+1).zfill(2),y,f'F2 onset step {i+1} of 13, {onset:.2f} Hz',{'f0_hz':F0,'f1_onset_hz':100,'f1_target_hz':700,'f2_onset_hz':float(onset),'f2_target_hz':1100,'transition_ms':50,'duration_ms':350,'step_hz':2000/12},'New 13-step acoustic transition demonstration based on Praat source-filter tutorial settings and the equal-step construction on the slide. Not the original pattern-playback recordings. Labels /b/, /d/, /g/ and category boundaries have not been independently validated for these tokens; identify them by step and F2 frequency.',common_peak=common)

# Modeled release-to-periodic-voicing lag. Same filter, burst, and post-onset source.
dur=.50; t0=np.arange(round(SR*dur))/SR
hiss=rng.normal(0,.012,len(t0));hiss=np.concatenate([[0],np.diff(hiss)])
burst=rng.normal(0,.10,len(t0))*np.exp(-t0/.003)*(t0<.012)
for lag in [0,40,80]:
 t,voiced=source(dur,lag/1000)
 aspiration=hiss*(t<lag/1000)
 y=filt(voiced+aspiration+burst,[500,1500,2500,3500])*envelope(t,dur)
 write(f'vot_{lag:02d}',y,f'Modeled release, periodic voicing begins {lag} ms later',{'f0_hz':F0,'vot_ms':lag,'duration_ms':500,'formants_hz':[500,1500,2500,3500]},'New acoustic timing demonstration. 0, 40 and 80 ms are modeled release-to-periodic-voicing lags. Not original Eimas, Kuhl–Miller, Maye or chinchilla study tokens, and not a complete recreation of place, voicing and aspiration cues in natural /ba/ or /pa/.')

# Newly modeled non-speech amplitude-rise comparison.
t=np.arange(round(SR*.5))/SR
harmonic=sum(np.sin(2*np.pi*400*n*t)/n for n in range(1,9))
for attack in [10,80]:
 attack_s=attack/1000
 env=np.minimum(1,t/attack_s)*np.minimum(1,(.5-t)/.05)
 write(f'nonspeech_attack_{attack:02d}',harmonic*env,f'Harmonic tone with {attack} ms amplitude rise',{'fundamental_hz':400,'harmonics':8,'amplitude_rise_ms':attack,'duration_ms':500},'New non-speech acoustic demonstration of fast versus slow amplitude rise. Not a recording of a plucked or bowed instrument and not the original Cutting–Rosner or infant experiment audio.')

# Authentic IPA productions, full audio context preserved from publisher demo MP4.
base='https://sail.usc.edu/span/rtmri_ipa/videos/je_2015/'
for stem,phone in [('bilabial_nasal','m'),('alveolar_nasal','n'),('velar_nasal','ŋ')]:
 src=S/(stem+'.mp4')
 if not src.exists():
  r=requests.get(base+stem+'.mp4',timeout=90);r.raise_for_status();src.write_bytes(r.content)
 out=A/('nasal_'+{'m':'m','n':'n','ŋ':'ng'}[phone]+'.mp3');subprocess.run(['ffmpeg','-y','-v','error','-i',str(src),'-vn','-c:a','libmp3lame','-b:a','128k',str(out)],check=True)
 pro=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(out)]));subprocess.run(['ffmpeg','-v','error','-i',str(out),'-f','null','-'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 manifest.append(dict(id='nasal_'+{'m':'m','n':'n','ŋ':'ng'}[phone],file=str(out.relative_to(D)),description=f'Phonetician John Esling produces /{phone}/, full source sound context',kind='authentic-phonetic-recording',model=None,source_url=base+stem+'.html',original_url=base+stem+'.mp4',source_sha256=hashlib.sha256(src.read_bytes()).hexdigest(),credit='John Esling, University of Victoria; USC SPAN real-time MRI IPA collection, 2015. Toutios et al. (2016), Illustrating the production of the International Phonetic Alphabet sounds using fast real-time magnetic resonance imaging.',license='No explicit reuse license displayed on the source chart; retain source attribution. Educational extract of audio from the source recording.',scope='Full audio of the source IPA demonstration, including its original vowel/utterance contexts. Illustrates nasal place, not a matched /ma na ŋa/ set and not the original Narayan et al. stimuli. Do not attribute it to the study participants.',duration=float(pro['format']['duration']),sha256=hashlib.sha256(out.read_bytes()).hexdigest(),full_decode_pass=True))

(D/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n');print(len(manifest),'audio assets')
