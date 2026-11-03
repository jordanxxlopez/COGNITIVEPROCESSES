"""New digital reconstruction of the Jusczyk et al.1977 published nonspeech parameters.
No recovered Moog recording, analog cutoff/modulation or participant data is claimed.
"""
from pathlib import Path
import argparse
import numpy as np,parselmouth as pm,wave,json,hashlib,subprocess
from parselmouth.praat import call
parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--output-dir',type=Path,required=True,help='Fresh destination for infant-study digital reconstruction outputs.')
D=parser.parse_args().output_dir.resolve();D.mkdir(parents=True,exist_ok=True);A=D/'audio';A.mkdir(exist_ok=True);U=D/'lossless';U.mkdir(exist_ok=True)
SR=48000;F0=440.;HARMONICS=40;DECAY=1.020;PEAK=.65;manifest=[];units={};metrics=[]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(id,x,title,scope,params,seq=None):
 wav=U/(id+'.wav');pcm=np.round(x*32767).astype('<i2');
 with wave.open(str(wav),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
 mp3=A/(id+'.mp3');subprocess.run(['ffmpeg','-y','-v','error','-i',str(wav),'-c:a','libmp3lame','-b:a','128k',str(mp3)],check=True);subprocess.run(['ffmpeg','-v','error','-i',str(mp3),'-f','null','-'],check=True,capture_output=True)
 manifest.append(dict(id=id,file=str(mp3.relative_to(D)),lossless_file=str(wav.relative_to(D)),title=title,kind='Published-parameter resynthesis',spokenText='440 Hz sawtooth; '+(', '.join(str(v)+' ms'for v in seq)if seq else str(params.get('rise_time_ms'))+' ms onset rise')+'.',scope=scope,note='New digital resynthesis of the described 1977 nonspeech stimulus parameters. The original Moog sound was a 440 Hz sawtooth with 0,30,60 or90 ms onset rise and1020 ms decay. A forty-harmonic band-limited sawtooth is used here; exact analog filtering, modulation and detailed original amplitude envelope were not published. Linear rise and linear decay are explicit reconstruction choices informed by the earlier Cutting–Rosner waveform figure. These are not original tapes or listener-validated category exemplars.',reference='https://doi.org/10.3758/BF03199467',source_url='https://link.springer.com/content/pdf/10.3758/BF03199467.pdf',credit='New digital synthesis from Jusczyk,Rosner,Cutting,Foard&Smith1977 stimulus methods, with analog limits disclosed.',license='New author-generated waveform; underlying study cited, no original recording copied.',parameters=params,sequence=seq,duration_seconds=len(x)/SR,sample_rate=SR,sha256=sha(mp3),wav_sha256=sha(wav),full_decode=True))
for rise in [0,30,60,90]:
 nominal=rise/1000;effective=nominal if rise else 1/(4*F0);duration=DECAY+nominal;N=round(SR*duration);t=np.arange(N)/SR
 # The carrier shape is identical for every token. No unreported analog filter is guessed.
 carrier=sum((-1)**(k+1)*np.sin(2*np.pi*F0*k*t)/k for k in range(1,HARMONICS+1));carrier/=max(abs(sum((-1)**(k+1)*np.sin(2*np.pi*k*np.arange(20000)/20000)/k for k in range(1,HARMONICS+1))))
 decay_time=duration-effective;env=np.where(t<effective,t/effective,np.maximum(0,1-(t-effective)/decay_time));x=PEAK*carrier*env;units[rise]=x
 # Actual analysis through Praat, rather than filename assertions.
 sound=pm.Sound(x,sampling_frequency=SR);pitch=sound.to_pitch_ac(time_step=.005,pitch_floor=200,pitch_ceiling=700);values=pitch.selected_array['frequency'];values=values[values>0]
 assert abs(float(np.median(values))-F0)<.1;assert np.max(abs(x))<1;assert len(x)==round(SR*(1.020+nominal))
 metrics.append(dict(rise_time_ms=rise,effective_rise_seconds=effective,peak_envelope_time=effective,decay_seconds=decay_time,total_samples=N,total_seconds=N/SR,measured_median_pitch_hz=float(np.median(values)),forty_harmonics=True,linear_envelope_unpublished_choice=True))
 write('jusczyk_rise_'+str(rise).zfill(2),x,f'Infant-study sound: {rise} ms rise','New matched digital stimulus with the study’s440 Hz fundamental and published rise/decay duration.',dict(fundamental_hz=F0,harmonics=HARMONICS,rise_time_ms=rise,effective_rise_seconds=effective,decay_seconds=decay_time,total_duration_seconds=duration,linear_rise=True,linear_decay=True,original_moog_filter_unknown=True))
for a,b in [(0,30),(30,60),(60,90)]:
 seq=[a,b,a,b];sil=np.zeros(round(.950*SR));x=np.concatenate([piece for i,r in enumerate(seq)for piece in ([units[r],sil]if i<3 else[units[r]])]);label='same reported pluck category'if a==0 else'between reported pluck/bow categories'if a==30 else'same reported bow category'
 write(f'jusczyk_pair_{a:02d}_{b:02d}',x,f'Equal30 ms rise-time change: {a} → {b} ms',f'Comparison used {label} in the study. New listening sequence, not a reproduction of an infant trial.',dict(fundamental_hz=F0,harmonics=HARMONICS,between_token_silence_seconds=.950,added_sequence_for_teaching=True,source_units_same=True),seq)
sil=np.zeros(round(.950*SR));seq=[0,30,60,90];x=np.concatenate([piece for i,r in enumerate(seq)for piece in([units[r],sil]if i<3 else[units[r]])]);write('jusczyk_rise_four',x,'Infant-study stimulus set:0,30,60,90 ms','Four published rise-time settings, each using a shared440 Hz sawtooth and the published decay duration. New digital resynthesis.',dict(fundamental_hz=F0,between_token_silence_seconds=.950,added_sequence_for_teaching=True),seq)
(D/'infant-manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n');(D/'infant-validation.json').write_text(json.dumps(dict(primary_source='https://doi.org/10.3758/BF03199467',stimulus_method='printedp51/PDF2,Stimuli section',parameters_known=['440Hzsawtooth','0/30/60/90msrise','1020msdecay','1020+rise duration','nominal0peakquarterperiod'],parameters_reconstructed=['linearattack/decaylaw','40harmonicbandlimit','noanalogmodulation'],independent_listener_validation=False,metrics=metrics,all_equal_comparison_differences_ms=30),indent=2)+'\n');print(len(manifest),'infant reconstruction files')
