"""Natural-recording aspiration deletion; no synthesized acoustic source.
Keep the complete 10ms native release complex and a byte-identical vowel/coda.
Nominal delays identify the authored release-to-common-rhyme interval, not an
independent natural VOT measure or listener-calibrated category boundary.
"""
from pathlib import Path
import json,hashlib,subprocess,wave,re,shutil,argparse,numpy as np
ROOT=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--output-dir',type=Path,required=True);p.add_argument('--source',type=Path,default=ROOT/'sources/En-us-corpse.ogg');a=p.parse_args();O=a.output_dir.resolve();(O/'clips').mkdir(parents=True,exist_ok=True);(O/'sources').mkdir(exist_ok=True)
src=a.source.resolve();source_sha=hashlib.sha256(src.read_bytes()).hexdigest();assert source_sha=='61d17b553d73680be73997289c47d1a979b1aa61458539e237f98db35d272fdc'
if src!=O/'sources'/src.name:shutil.copyfile(src,O/'sources'/src.name)
info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(src)]))['streams'][0];SR=int(info['sample_rate']);assert SR==44100 and info['channels']==2
x=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',str(src),'-f','f32le','-']),dtype='<f4').reshape(-1,2)[:,0].astype(float)
RELEASE=5052;RHYME=8335;BURST=441;LEAD=round(.15*SR);TRAIL=round(.15*SR)
burst=x[RELEASE:RELEASE+BURST].copy();rhyme=x[RHYME:].copy();raw={};details=[]
for ms in range(10,71,5):
 n=round(ms/1000*SR);asp=n-BURST;assert RHYME-asp>=RELEASE+BURST
 native_asp=x[RHYME-asp:RHYME] if asp else np.empty(0)
 y=np.concatenate((burst,native_asp,rhyme));raw[ms]=y
 j=abs(float((native_asp[0] if asp else rhyme[0])-burst[-1]))
 details.append(dict(nominal_delay_ms=ms,actual_release_to_rhyme_ms=n/SR*1000,delay_samples=n,retained_burst_source_samples=[RELEASE,RELEASE+BURST],retained_aspiration_source_samples=[RHYME-asp,RHYME],rhyme_source_samples=[RHYME,len(x)],deleted_middle_aspiration_samples=[RELEASE+BURST,RHYME-asp],splice_amplitude_jump_before_gain=j))
# Quiet common gain; no per-step normalization, no filtering, no added pitch source.
gain=.045/max(np.sqrt(np.mean(y*y)) for y in raw.values());assert gain<1
burst_pcm=np.rint(burst*gain*32767).astype('<i2');rhyme_pcm=np.rint(rhyme*gain*32767).astype('<i2')
units={};manifest=[]
method='New teaching reconstruction from the actual US-English recording of corpse by Dvortygirl. Each member retains the complete 10 ms native release complex and the same entire native periodic vowel, rhotic segment and coda. Different amounts of middle aspiration are deleted from the real recording, retaining 10–70 ms nominal release-to-common-rhyme intervals in 5 ms steps. All audible material comes from that one human recording; no Kokoro, generated buzz, random aspiration, voice cloning or vocoder is used. These are not Ganong (1980) original stimuli, and no perceptual category boundary or endpoint identification is independently established.'
def sha(b):return hashlib.sha256(b).hexdigest()
def save(id,pcm,title,text,order=None):
 file=O/'clips'/(id+'.wav')
 with wave.open(str(file),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
 subprocess.run(['ffmpeg','-v','error','-i',str(file),'-f','null','-'],check=True,capture_output=True)
 manifest.append(dict(id=id,file=str(file.relative_to(O)),title=title,spokenText=text,kind='Human-recording reconstruction',scope='Actual human speech with deleted aspiration; new teaching continuum, not original study tokens.',note=method+' Uniform quiet playback gain is shared by the family; 150 ms leading/trailing silence is added around individual words.'+(' The listening sequence adds 650 ms silence between whole tokens and does not reproduce an original experimental trial.'if order else''),reference='https://commons.wikimedia.org/wiki/File:En-us-corpse.ogg',research_reference='https://doi.org/10.1037/0096-1523.6.1.110',method_reference='https://doi.org/10.1121/10.0000692',credit='Original corpse recording by Dvortygirl (2006), Wikimedia Commons. New aspiration-deletion edits and listening assembly for LING406.',license='CC BY-SA 3.0',license_url='https://creativecommons.org/licenses/by-sa/3.0/',source_file='sources/En-us-corpse.ogg',source_sha256=source_sha,sha256=sha(file.read_bytes()),sample_rate=SR,channels=1,duration_seconds=len(pcm)/SR,sequence_nominal_delay_ms=order,shared_gain_db=float(20*np.log10(gain)),full_decode=True))
for ms,y in raw.items():
 pcm=np.rint(y*gain*32767).astype('<i2');n=round(ms/1000*SR);assert np.array_equal(pcm[:BURST],burst_pcm) and np.array_equal(pcm[n:],rhyme_pcm)
 units[ms]=np.concatenate((np.zeros(LEAD,dtype='<i2'),pcm,np.zeros(TRAIL,dtype='<i2')))
 if ms in [10,40,70]:save(f'human-gorpse-corpse-delay{ms:03d}',units[ms],f'Human gorpse–corpse frame: {ms} ms nominal delay',f'Nominal release-to-common-rhyme delay {ms} ms')
def seq(order):return np.concatenate([piece for i,ms in enumerate(order)for piece in([units[ms],np.zeros(round(.65*SR),dtype='<i2')]if i+1<len(order)else[units[ms]])])
order=list(raw);save('human-gorpse-corpse-series',seq(order),'Human gorpse–corpse: 13-step listening continuum','Nominal delays 10–70 ms, in 5 ms steps',order)
order=[10,70,10,70];save('human-gorpse-corpse-endpoints',seq(order),'Human gorpse–corpse: short/long comparison','10 ms → 70 ms → 10 ms → 70 ms nominal delay',order)
validation=dict(source_file='sources/En-us-corpse.ogg',source_sha256=source_sha,source_sample_rate=SR,source_channels=2,selected_source_channel='left (channel0)',release_source_sample=RELEASE,release_source_seconds=RELEASE/SR,rhyme_source_sample=RHYME,rhyme_source_seconds=RHYME/SR,native_available_release_to_rhyme_ms=(RHYME-RELEASE)/SR*1000,burst_samples=BURST,burst_seconds=BURST/SR,rhyme_samples=len(rhyme),gain= gain,gain_db=float(20*np.log10(gain)),target_highest_word_rms=.045,burst_pcm_sha256=sha(burst_pcm.tobytes()),rhyme_pcm_sha256=sha(rhyme_pcm.tobytes()),all_steps_identical_burst=True,all_steps_identical_complete_rhyme=True,no_synthesized_waveform=True,no_vowel_trimming=True,no_crossfade_applied=True,crossfade_decision='The preserved10ms native release complex joins low-amplitude real aspiration or the first weak vowel onset. Jumps are recorded perstep; no crossfade is added so the entire burst and rhyme remain identical.',independent_listener_validation=False,steps=details)
(O/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');(O/'validation.json').write_text(json.dumps(validation,indent=2)+'\n')
print('Built5browserassets from13naturalrecording-derivedsteps; gain',validation['gain_db'],'nativeinterval',validation['native_available_release_to_rhyme_ms'],'maxjoinjump',max(z['splice_amplitude_jump_before_gain']for z in details))
