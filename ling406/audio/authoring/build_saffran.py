"""Source-derived artificial-language classroom stream, not historical stimuli.
Kokoro phoneme-input syllables -> Praat PSOLA constant pitch/duration targets ->
RMS equalization -> concatenation with no added word gaps.
"""
from pathlib import Path
import parselmouth as pm
from parselmouth.praat import call, run
run("random_initializeWithSeedUnsafelyButPredictably (406)")
import numpy as np,json,wave,subprocess,hashlib
import argparse
p=argparse.ArgumentParser();p.add_argument('--output',type=Path,default=Path(__file__).resolve().parent/'generated');args=p.parse_args();SOURCE=Path(__file__).resolve().parent;D=args.output.resolve();D.mkdir(parents=True,exist_ok=True); A=D/'audio';SR=24000;UNIT=.250;F0=160
rows=json.loads((SOURCE/'saffran_source_inventory.json').read_text());items=[r for r in rows if r['id'].startswith('saffran')];rawmeta=json.loads((SOURCE/'units/synthesis-manifest.json').read_text());units={};unitmeta=[]
for r in rawmeta['items']:
 key=r['id'][4:];src=SOURCE/'units'/(r['id']+'.wav');snd=pm.Sound(str(src));x=snd.values[0];active=np.flatnonzero(np.abs(x)>.005*np.max(np.abs(x)));assert len(active);lo=max(0,active[0]-int(.020*SR));hi=min(len(x),active[-1]+int(.020*SR));x=x[lo:hi];snd=pm.Sound(x,sampling_frequency=SR)
 manip=call(snd,'To Manipulation',.005,75,450);pitch=call('Create PitchTier','constant',0,snd.duration);call(pitch,'Add point',0,F0);call(pitch,'Add point',snd.duration,F0);call([pitch,manip],'Replace pitch tier');duration=call('Create DurationTier','equal_unit',0,snd.duration);call(duration,'Add point',0,UNIT/snd.duration);call(duration,'Add point',snd.duration,UNIT/snd.duration);call([duration,manip],'Replace duration tier');out=call(manip,'Get resynthesis (overlap-add)');y=out.values[0];target=int(UNIT*SR)
 # Praat may round endpoint frames. Only compensate sub-millisecond rounding.
 assert abs(len(y)-target)<=24,(key,len(y),target)
 y=np.pad(y,(0,max(0,target-len(y))))[:target];y*=.10/np.sqrt(np.mean(y*y));units[key]=y
 measured=pm.Sound(y,sampling_frequency=SR).to_pitch(time_step=.005,pitch_floor=75,pitch_ceiling=400).selected_array['frequency'];vv=measured[measured>0]
 unitmeta.append(dict(syllable=key,input_phonemes=r['phonemes'],source_id=r['id'],source_sha256=r['wav_sha256'],source_trim_samples=[int(lo),int(hi)],original_active_duration=len(x)/SR,unit_samples=target,unit_duration=UNIT,target_pitch_hz=F0,measured_voiced_median_f0_hz=float(np.median(vv))if len(vv)else None,rms=float(np.sqrt(np.mean(y*y))),peak=float(np.abs(y).max())))
assert max(float(np.abs(y).max())for y in units.values())<.99
manifest=json.loads((D/'manifest.json').read_text());manifest=[m for m in manifest if not m['id'].startswith('saffran')]
for item in items:
 text=item['text'].replace(' ','');assert len(text)%2==0;syllables=[text[i:i+2]for i in range(0,len(text),2)];assert all(s in units for s in syllables);signal=np.concatenate([units[s]for s in syllables]);wav=A/(item['id']+'.wav');mp3=A/(item['id']+'.mp3')
 with wave.open(str(wav),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(np.round(signal*32767).astype('<i2').tobytes())
 subprocess.run(['ffmpeg','-y','-v','error','-i',str(wav),'-c:a','libmp3lame','-b:a','128k',str(mp3)],check=True);subprocess.run(['ffmpeg','-v','error','-i',str(mp3),'-f','null','-'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 manifest.append(dict(id=item['id'],file=str(mp3.relative_to(D)),lossless_file=str(wav.relative_to(D)),description=item['title'],text=item['text'],sections=item['sections'],kind='controlled-neural-phonetic-demonstration',model='Kokoro-82M v1.0 af_heart explicit IPA inputs; Praat/Parselmouth 0.4.7 PSOLA pitch and duration control',source_url='https://doi.org/10.1126/science.274.5294.1926',credit='New source-derived teaching reconstruction based on displayed artificial-language strings; Saffran, Aslin and Newport (1996). Generated speech is not original source audio.',scope='Illustrative new stimulus construction. Uses the source slide’s exact displayed sequence, not a claim that these are the original 1996 recordings. All syllables share 160 Hz pitch targets, 250 ms duration and equal RMS, concatenated without added word gaps. PSOLA can leave small pitch-estimation differences and unit joins; no claim of eliminating every acoustic cue in natural speech.',phoneme_inputs={r['id'][4:]:r['phonemes']for r in rawmeta['items']},parameters=dict(unit_duration_ms=250,pitch_target_hz=160,syllable_count=len(syllables),syllable_sequence=syllables,added_word_gap_ms=0,target_unit_rms=.10),duration=len(signal)/SR,sample_rate=SR,sha256=hashlib.sha256(mp3.read_bytes()).hexdigest(),lossless_sha256=hashlib.sha256(wav.read_bytes()).hexdigest(),full_decode_pass=True,generation_script='build_saffran.py'))
(D/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n');(D/'saffran-validation.json').write_text(json.dumps(dict(engine=rawmeta['model'],voice=rawmeta['items'][0]['voice'],phonetic_scope='Explicit IPA inputs; English neural model not an independent native-speaker validation.',syllables=unitmeta,total_rendered_items=len(items),units_equal_duration=True,units_equal_rms=True,added_gaps=False,word_and_partword_units_identical_to_stream=True,source_sequence_provenance='saffran_source_inventory.json sourceRows and exact slide text'),indent=2)+'\n');print('Generated',len(items),'controlled streams/test items');print(json.dumps(unitmeta,indent=2))
