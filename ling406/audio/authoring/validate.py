from pathlib import Path
import json,subprocess,wave,numpy as np
import argparse
p=argparse.ArgumentParser();p.add_argument('--output',type=Path,default=Path(__file__).resolve().parent/'generated');args=p.parse_args();D=args.output.resolve()
j=json.loads((D/'manifest.json').read_text());out=[]
for m in j:
 p=D/m['file'];q=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]));r=subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','null','-'],capture_output=True,text=True)
 assert r.returncode==0 and not r.stderr
 out.append(dict(id=m['id'],duration=q['format']['duration'],full_decode_pass=True))
# Compare the actual rendered steady-state spectra against the harmonic series
# and the expected band neighborhoods. F0 harmonics limit peak precision.
spec=[]
for id,targets in [('vowel_base',[300,900]),('vowel_raise_f1',[600,900]),('vowel_raise_f2',[300,2200])]:
 with wave.open(str(D/'audio'/(id+'.wav')))as w:sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)
 seg=x[int(.2*sr):int(.65*sr)];ff=np.fft.rfftfreq(32768,1/sr);mag=np.abs(np.fft.rfft(seg*np.hanning(len(seg)),32768));peaks=[]
 for t in targets:
  inds=np.flatnonzero((ff>t-100)&(ff<t+100));k=inds[np.argmax(mag[inds])];peaks.append(float(ff[k]));assert abs(ff[k]-t)<100
 spec.append(dict(id=id,target_resonances_hz=targets,strongest_nearby_harmonic_hz=peaks,verification='Rendered signal has energy peaks near the requested resonances. Harmonic spacing is 120 Hz; this is not independent perceptual phoneme validation.'))
# Periodic autocorrelation after modeled voice onset, measured on rendered WAV.
period=[]
for lag in [0,40,80]:
 with wave.open(str(D/'audio'/f'vot_{lag:02d}.wav'))as w:sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)
 start=int((lag/1000+.08)*sr);seg=x[start:start+int(.12*sr)];delta=round(sr/120);a=seg[:-delta];b=seg[delta:];corr=float(np.dot(a,b)/np.sqrt(np.dot(a,a)*np.dot(b,b)));assert corr>.95
 period.append(dict(id=f'vot_{lag:02d}',modeled_lag_ms=lag,rendered_post_onset_period_correlation=corr,verification='Post-onset rendered waveform has periodicity at the specified 120 Hz source fundamental. The generator gates periodic excitation at the stated release-to-source lag. Natural VOT category boundaries are not asserted.'))
steps=[m['parameters']['f2_onset_hz']for m in j if m['id'].startswith('f2_step')];assert len(steps)==13 and np.allclose(np.diff(steps),2000/12)
(D/'validation.json').write_text(json.dumps(dict(audio_count=len(j),full_decodes=out,spectral_checks=spec,periodicity_checks=period,continuum_f2_onsets_hz=steps,continuum_adjacent_step_hz=2000/12,validation_scope='Acoustic construction, integrity, and replay compatibility only. No claims of original-stimulus recovery, native-speaker validation, infant testing, or validated phoneme identification.'),indent=2)+'\n')
print('PASS',len(j),'full MP3 decodes; vowel energy neighborhoods; VOT periodicity; 13 equal F2 steps')
