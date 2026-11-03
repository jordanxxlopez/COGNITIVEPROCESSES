"""Human-recording analogue of the lecture's displayed Saffran toy streams.
Natural CV excerpts -> Praat PSOLA shared pitch curve and250ms -> common RMS.
No word gaps; identical recorded units are reused at every occurrence.
This is not the original MacinTalk1996 recording or a behaviorally validated replica.
"""
from pathlib import Path
import argparse,json,wave,hashlib
import numpy as np
import parselmouth as pm
from parselmouth.praat import call,run
run('random_initializeWithSeedUnsafelyButPredictably (406)')
SOURCE=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--output-dir',type=Path,required=True);args=p.parse_args();OUT=args.output_dir.resolve();OUT.mkdir(parents=True,exist_ok=True)
A=OUT/'audio';A.mkdir(exist_ok=True);U=OUT/'units';U.mkdir(exist_ok=True)
SR=24000;UNIT=.250;RMS=.045;F0=95.;TARGET=int(SR*UNIT)
rawmeta=json.loads((SOURCE/'raw_units/manifest.json').read_text());inventory=json.loads((SOURCE/'source_inventory.json').read_text())
# A single real ko contour, reused for every syllable, avoids word-specific intonation.
ko=pm.Sound(str(SOURCE/'raw_units/ko.wav'));kp=ko.to_pitch_ac(time_step=.01,pitch_floor=60,pitch_ceiling=250);kv=kp.selected_array['frequency'];kt=kp.xs();valid=(kv>0)
assert valid.sum()>=8
v=kv[valid];t=kt[valid]/ko.duration
# First estimator frame can be unstable at release. Preserve a robust natural
# contour after removing values above1.2x its local median and median-smoothing.
idx=np.arange(len(v));local=np.array([np.median(v[max(0,i-2):min(len(v),i+3)])for i in idx]);keep=(v<local*1.2)&(v>local/1.2);v=v[keep];t=t[keep]
v=np.array([np.median(v[max(0,i-1):min(len(v),i+2)])for i in range(len(v))]);v*=F0/np.median(v)
shared_t=np.r_[0.,t,1.];shared_f=np.r_[v[0],v,v[-1]]
units={};unitmeta=[]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,pcm):
 with wave.open(str(p),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(np.asarray(pcm,dtype='<i2').tobytes())
for r in rawmeta:
 key=r['syllable'];src=SOURCE/'raw_units'/(key+'.wav');snd=pm.Sound(str(src));snd=snd.resample(SR,50)
 manip=call(snd,'To Manipulation',.005,60,250)
 pitch=call('Create PitchTier','shared_human_ko',0,snd.duration)
 for time,freq in zip(shared_t,shared_f):call(pitch,'Add point',float(time*snd.duration),float(freq))
 call([pitch,manip],'Replace pitch tier')
 duration=call('Create DurationTier','equal_unit',0,snd.duration);ratio=UNIT/snd.duration
 call(duration,'Add point',0,ratio);call(duration,'Add point',snd.duration,ratio);call([duration,manip],'Replace duration tier')
 y=call(manip,'Get resynthesis (overlap-add)').values[0]
 assert abs(len(y)-TARGET)<=24,(key,len(y))
 correction=TARGET-len(y);y=np.pad(y,(0,max(0,correction)))[:TARGET]
 y*=RMS/np.sqrt(np.mean(y*y));assert max(abs(y))<.95
 pcm=np.rint(y*32767).astype('<i2');units[key]=pcm;f=U/(key+'.wav');write(f,pcm)
 s=pm.Sound(pcm.astype(float)/32768,sampling_frequency=SR);pit=s.to_pitch_ac(time_step=.005,pitch_floor=60,pitch_ceiling=250);fv=pit.selected_array['frequency'];good=fv[fv>0]
 unitmeta.append(dict(syllable=key,file='units/'+f.name,source_word=r['source_word'],source_excerpt_seconds=r['source_excerpt_seconds'],source_description_url=r['source_description_url'],source_date=r['source_date'],raw_unit_sha256=sha(src),sha256=sha(f),source_duration_seconds=snd.duration,duration_ratio=ratio,output_samples=TARGET,output_seconds=UNIT,rounding_compensation_samples=correction,rms=float(np.sqrt(np.mean((pcm.astype(float)/32768)**2))),peak=float(max(abs(pcm.astype(float)/32768))),nominal_shared_pitch_curve_hz=F0,measured_median_f0_hz=float(np.median(good))if len(good)else None,source_speaker='Kunokuno/Q424288',license='CC BY-SA4.0'))
rows=[]
for r in inventory:
 text=r['text'].replace(' ','');seq=[text[i:i+2]for i in range(0,len(text),2)];assert len(text)%2==0;assert all(x in units for x in seq)
 pcm=np.concatenate([units[x]for x in seq]);f=A/('human-'+r['id']+'.wav');write(f,pcm)
 # Verify that every occurrence is exactly the reused unit and no gaps exist.
 assert len(pcm)==len(seq)*TARGET
 for i,key in enumerate(seq):assert np.array_equal(pcm[i*TARGET:(i+1)*TARGET],units[key])
 rows.append(dict(id=r['id'],file='audio/'+f.name,title=r['title'],spokenText=r['text'],kind='Human-recording teaching analogue',scope='Human Tagalog CV excerpts, equal250ms units and shared natural pitch contour. New reconstruction of the displayed toy sequence, not original1996 audio.',note='Actual human recordings by Lingua Libre speaker Kunokuno (Q424288), licensed CC BY-SA4.0. Praat/Parselmouth PSOLA gives every syllable250ms and the same natural ko-derived pitch contour centered near95Hz. RMS=.045; identical syllable waveforms repeat at every occurrence, without added word gaps. Natural phonation/formants come from human source recordings, not a glottal synthesizer or neural voice. Pitch tracking, time stretching (up to2x overall), coarticulation and unit joins leave residual cues; this is not a validated replica of Saffran et al.,1996 or the full historical exposure.',reference='https://doi.org/10.1126/science.274.5294.1926',credit='Kunokuno, Lingua Libre. CC BY-SA4.0. Gating/PSOLA/reassembly by Study Studio.',license='CC BY-SA4.0',license_url='https://creativecommons.org/licenses/by-sa/4.0/',sample_rate=SR,duration_seconds=len(pcm)/SR,sha256=sha(f),parameters=dict(unit_ms=250,unit_samples=TARGET,unit_rms=RMS,nominal_pitch_median_hz=F0,shared_pitch_time_fractions=shared_t.tolist(),shared_pitch_frequency_hz=shared_f.tolist(),syllable_sequence=seq,syllable_count=len(seq),added_word_gap_samples=0),original_units_reused_exactly=True,source_speaker='Kunokuno/Q424288'))
validation=dict(passed=True,source='Same identified human speaker Kunokuno, Tagalog Lingua Libre recordings under CC BY-SA4.0',method='Recorded human CVs, Praat PSOLA, one shared natural ko pitch contour, common duration and RMS, deterministic waveform concatenation',sample_rate=SR,unit_samples=TARGET,unit_ms=250,target_rms=RMS,target_pitch_median_hz=F0,source_pitch_contour='ko.wav',shared_pitch_time_fractions=shared_t.tolist(),shared_pitch_hz=shared_f.tolist(),max_overall_duration_ratio=max(r['duration_ratio']for r in unitmeta),units=unitmeta,outputs=len(rows),no_added_word_gaps=True,identical_units_every_occurrence=True,word_and_partword_share_training_units=True,source_rows_preserved=True,original_1996_recording=False,independent_behavioral_or_native_identification_validation=False,remaining_cues='PSOLA pitch-estimation differences, source phonetic coarticulation, spectral/prosodic residue and unit joins are not claimed eliminated.')
(OUT/'manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n');(OUT/'validation.json').write_text(json.dumps(validation,ensure_ascii=False,indent=2)+'\n');print('PASS',len(rows),'human streams;12shared units;exact250ms; no added gaps');print([(r['syllable'],round(r['measured_median_f0_hz'] or 0,2),round(r['rms'],6))for r in unitmeta])
