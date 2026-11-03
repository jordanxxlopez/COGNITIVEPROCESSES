#!/usr/bin/env python3
"""Articulatory CV reconstruction with official VocalTractLab 2.4.
Run with --library libVocalTractLabApi24.so --speaker W02.speaker --output DIR.
No letters-to-speech model, splicing of /aCa/, or claimed original-study audio.
"""
from pathlib import Path
import argparse,ctypes as C,hashlib,json,math,subprocess,wave
from lxml import etree as E
import numpy as np
import parselmouth

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def writewav(path,data,sr=48000):
 with wave.open(str(path),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(np.round(data*32767).astype('<i2').tobytes())
def mp3(wav,mp3):
 subprocess.run(['ffmpeg','-y','-v','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','192k',str(mp3)],check=True)
 subprocess.run(['ffmpeg','-v','error','-i',str(mp3),'-f','null','-'],check=True,stdout=subprocess.DEVNULL)
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--library',type=Path,required=True);p.add_argument('--speaker',type=Path,required=True);p.add_argument('--output',type=Path,required=True);args=p.parse_args();O=args.output;O.mkdir(parents=True,exist_ok=True);(O/'parameters').mkdir(exist_ok=True)
 tree=E.parse(str(args.speaker));selected=tree.xpath('//glottis_model[@selected="1"]')[0];flutter=selected.xpath('./control_params/param[@name="Flutter"]')[0];flutter.set('value','0.000000');flutter.set('default','0.000000');idx=flutter.get('index')
 for c in selected.xpath('.//shape/control_param[@index="'+idx+'"]'):c.set('value','0.000000')
 speaker=O/'parameters/W02-controlled.speaker';tree.write(str(speaker),encoding='utf-8',pretty_print=True)
 L=C.CDLL(str(args.library.resolve()));assert L.vtlInitialize(str(speaker.resolve()).encode())==0
 duration=.5;sr=48000;f0=223.;rms_target=.1;tokens={};validation={};manifest=[]
 configs=[('ma','[ma]','lip-gestures','ll-labial-closure',.3,.065),('na','[na]','tongue-tip-gestures','tt-alveolar-closure',.2,.0775),('nga','[ŋa]','tongue-body-gestures','tb-velar-closure',.3,.0675)]
 for code,ipa,tier,shape,opening,hold in configs:
  root=E.Element('gestural_score')
  def seq(type,unit,items):
   q=E.SubElement(root,'gesture_sequence',type=type,unit=unit)
   for value,dur,neutral,tau in items:E.SubElement(q,'gesture',value=str(value),slope='0.000000',duration_s=f'{dur:.6f}',time_constant_s=f'{tau:.6f}',neutral=str(neutral))
  seq('vowel-gestures','',[('a',.6,0,.012)])
  for t in ['lip-gestures','tongue-tip-gestures','tongue-body-gestures']:seq(t,'',[(shape,hold,0,.012),('',.6-hold,1,.012)]if t==tier else[('',.6,1,.012)])
  seq('velic-gestures','cm^2',[(opening,.08,0,.012),(0,.52,0,.010)])
  seq('glottal-shape-gestures','',[('modal',.6,0,.012)])
  seq('f0-gestures','st',[(12*math.log2(f0),.6,0,.03)])
  seq('lung-pressure-gestures','dPa',[(8000,.43,0,.005),(0,.17,0,.01)])
  ges=O/'parameters'/(code+'.ges');ges.write_bytes(E.tostring(root,pretty_print=True));raw=O/'parameters'/(code+'_raw.wav');tube=O/'parameters'/(code+'.tube');n=C.c_int()
  assert L.vtlGesturalScoreToAudio(str(ges.resolve()).encode(),str(raw.resolve()).encode(),b'',None,C.byref(n),0,0)==0
  assert L.vtlGesturalScoreToTubeSequence(str(ges.resolve()).encode(),str(tube.resolve()).encode())==0
  with wave.open(str(raw),'rb')as w:assert w.getframerate()==sr;data=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32767
  data=data[:int(duration*sr)];assert len(data)==24000
  fade=int(.010*sr);data[-fade:]*=np.linspace(1,0,fade)
  gain=rms_target/np.sqrt(np.mean(data**2));data*=gain;assert np.abs(data).max()<.95
  tokens[code]=data;wav=O/('nasal_cv_'+code+'.wav');dest=wav.with_suffix('.mp3');writewav(wav,data);mp3(wav,dest)
  # Inspect actual model tube states, not merely gesture names or input labels.
  ls=[l.strip()for l in tube.read_text().splitlines()if l.strip()and not l.startswith('#')];states=[ls[i:i+5]for i in range(4,len(ls),5)];areas=np.array([np.fromstring(s[2],sep=' ')for s in states]);lengths=np.array([np.fromstring(s[3],sep=' ')for s in states]);velum=np.array([np.fromstring(s[1],sep=' ')[1]for s in states]);times=np.arange(len(states))*.0025;mins=areas.min(axis=1);constrictions=areas.argmin(axis=1);closed=np.flatnonzero((times<.4)&(mins<.01));release=float(times[closed[-1]]+.0025)
  locs=np.array([sum(l[:j+1])for l,j in zip(lengths,constrictions)])
  assert .11<=release<=.13,(code,release)
  assert np.all(mins[(times>=.02)&(times<=.1)]<.01),code
  assert np.all(velum[(times>=.02)&(times<=release)]>.05),code
  assert np.max(velum[(times>=.3)&(times<.45)])<.001,code
  assert not np.any(mins[(times>.2)&(times<.42)]<.01),code
  # The actual produced periodic signal independently estimates near the target F0.
  sound=parselmouth.Sound(data,sr);pitch=sound.to_pitch_ac(time_step=.005,pitch_floor=150,pitch_ceiling=350);vals=pitch.selected_array['frequency'];pt=pitch.xs();vv=vals[(pt>.03)&(pt<.4)&(vals>0)];median=float(np.median(vv));assert abs(median-f0)<8,(code,median)
  state_info={'nasal_oral_closure_end_seconds':release,'median_nasal_closure_position_cm_from_glottis':float(np.median(locs[(times>=.02)&(times<=.1)])),'nasal_closure_sections':sorted(set(int(x)for x in constrictions[(times>=.02)&(times<=.1)])),'velum_open_during_closure':True,'no_second_oral_closure_after_release':True,'velopharyngeal_area_at_release_cm2':float(velum[closed[-1]+1]),'median_output_pitch_hz':median,'rms':float(np.sqrt(np.mean(data**2))),'peak':float(np.abs(data).max()),'samples':len(data),'sr':sr,'no_clipping':True,'gain':gain,'original_backend_samples':n.value,'measurements_are_simulation_outputs':True}
  validation[code]=state_info;traces=[]
  for i,t in enumerate(times):
   if t>.5:break
   if i%4==0:traces.append(dict(time_seconds=float(t),velum_opening_cm2=float(velum[i]),minimum_oral_area_cm2=float(mins[i]),minimum_area_section=int(constrictions[i]),constriction_location_cm_from_glottis=float(locs[i])))
  (O/'parameters'/(code+'_geometry.json')).write_text(json.dumps(traces,indent=2)+'\n')
  manifest.append(dict(id='nasal_cv_'+code,file=dest.name,lossless_file=wav.name,ipa=ipa,title=ipa,kind='VocalTractLab articulatory synthesis',sha256=sha(dest),wav_sha256=sha(wav),duration_seconds=duration,model='VocalTractLab 2.4',speaker='W02 female anatomy preset',target_f0_hz=f0,shared_vowel='a',gesture_hold_seconds=hold,gesture_shape=shape,glottal_gesture='modal continuously; no plosive gesture',scope='Matched newly synthesized CV demonstration of the target nasal syllable. Not the original Filipino speaker recordings or an independently validated reproduction of Narayan et al. (2010).',method='Context-sensitive oral closure and open velopharyngeal port followed by one shared /a/ gesture. No leading vowel and no separate /g/ segment. All tokens use the same anatomy, F0,500ms sample count and RMS. Nasal release timing checked from generated geometry.',source_url='https://www.vocaltractlab.de/index.php?page=vocaltractlab-download',primary_method_doi='10.1371/journal.pone.0060603',license='New synthesized waveform. VTL software/preset GPL-3.0 or later, downloaded from author; no software or preset is embedded in the MP3.',validation=state_info,decoded=True))
 L.vtlClose()
 for name,codes,ipa in [('na_nga',['na','nga','na','nga'],'[na] → [ŋa] → [na] → [ŋa]'),('ma_na',['ma','na','ma','na'],'[ma] → [na] → [ma] → [na]')]:
  silence=np.zeros(sr,dtype=float);parts=[]
  for i,c in enumerate(codes):
   if i:parts.append(silence)
   parts.append(tokens[c])
  data=np.concatenate(parts);wav=O/('nasal_pair_'+name+'.wav');dest=wav.with_suffix('.mp3');writewav(wav,data);mp3(wav,dest)
  manifest.append(dict(id='nasal_pair_'+name,file=dest.name,lossless_file=wav.name,title=ipa,ipa=ipa,kind='VocalTractLab articulatory synthesis',sha256=sha(dest),wav_sha256=sha(wav),duration_seconds=len(data)/sr,tokens=['nasal_cv_'+c for c in codes],gap_seconds=1.0,same_na_token=True,scope='Comparison of newly synthesized matched syllables. 500ms tokens and1000ms inter-token silence illustrate the timing; not an infant discrimination assessment or recovered original stimuli.',decoded=True))
 summary={'engine':'Official VocalTractLab2.4','author_archive_url':'https://www.vocaltractlab.de/download-vocaltractlab/VTL2.4.zip','backend_library_sha256':sha(args.library),'original_speaker_sha256':sha(args.speaker),'controlled_speaker_sha256':sha(speaker),'speaker_anatomy':'W02','control_change':'Flutter set0 in selected glottis model and all its stored shape values, no anatomical shape changes.','common_pitch_target_hz':f0,'sample_rate':sr,'single_cv_duration_seconds':duration,'single_cv_samples':24000,'common_rms':rms_target,'last_10ms_common_fade':True,'continuous_modal_phonation':True,'oral_places_distinct':True,'tokens':validation,'linguistic_validation_limit':'These checks confirm model geometry, timing, periodicity and file decoding. No native-speaker identification test or acoustic-equivalence test against original Filipino recordings has been performed.'}
 for row in manifest:
  mp3file=O/row['file'];decoded=subprocess.check_output(['ffmpeg','-v','error','-i',str(mp3file),'-f','s16le','-acodec','pcm_s16le','-ac','1','-ar','48000','-']);samples=len(decoded)//2
  probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(mp3file)]));row['mp3_container_duration_seconds']=float(probe['format']['duration']);row['decoded_samples']=samples;row['decoded_duration_seconds']=samples/48000;assert abs(samples/48000-row['duration_seconds'])<1/48000
 (O/'validation.json').write_text(json.dumps(summary,indent=2)+'\n');(O/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n');print(json.dumps(summary,indent=2))
if __name__=='__main__':main()
