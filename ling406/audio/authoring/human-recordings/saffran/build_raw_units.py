"""Gate natural recorded CVs from identified Tagalog speaker Kunokuno.
No pitch/duration processing. No silence is added. Raw units support later
research-informed, explicitly labelled stream construction.
"""
from pathlib import Path
import json,hashlib,wave,argparse
import numpy as np
import parselmouth
D=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--output-dir',type=Path,required=True);args=p.parse_args();O=args.output_dir.resolve();O.mkdir(parents=True,exist_ok=True)
meta=json.load(open(D/'source_metadata.json'));by={p['title'].split('Kunokuno-')[-1].split('.')[0]:p['imageinfo'][0]for p in meta['query']['pages'].values()}
# Starts include original stop closure/release or sonorant onset. Ends exclude
# the following consonant/glottal ending, as inspected in waveform/spectrogram.
CUTS={
 'to':('ito',.385,.565,'word-final to, after preceding i; no leading vowel retained'),
 'ki':('makita',.353,.550,'medial stressed ki; preceding ma and following ta excluded'),
 'bu':('buhay',.145,.410,'initial bu; following h is excluded'),
 'gi':('maging',.340,.555,'medial stressed gi; preceding ma and final ng excluded'),
 'ko':('ko',.182,.445,'standalone recorded ko, before terminal decay'),
 'ba':('ba',.145,.395,'standalone recorded ba, retaining prevoicing'),
 'go':('Sumagot',.470,.595,'final-syllable go; preceding ma and final t excluded'),
 'pi':('Espiritu',.505,.675,'stressed pi; preceding s and following r excluded'),
 'la':('laban',.185,.415,'initial la; following b excluded'),
 'ti':('Panitikan',.560,.695,'stressed ti; preceding ni and following k excluded'),
 'po':('po',.228,.425,'standalone po; later non-token noise excluded'),
 'lu':('lupa',.200,.405,'initial lu; following p excluded'),
}
rows=[]
for syll,(word,start,end,note)in CUTS.items():
 source=D/'source_words'/(word+'.wav');s=parselmouth.Sound(str(source));sr=int(s.sampling_frequency)
 x=s.values[0,round(start*sr):round(end*sr)].copy();fade=round(.005*sr);x[-fade:]*=.5*(1+np.cos(np.linspace(0,np.pi,fade)))
 # No level normalization here. Downstream construction can use one documented
 # target RMS per unit while retaining these original source inputs separately.
 pcm=np.rint(x*32767).astype('<i2');p=O/(syll+'.wav')
 with wave.open(str(p),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(pcm.tobytes())
 info=by[word];assert 'Kunokuno' in info['extmetadata']['Artist']['value'];assert info['extmetadata']['LicenseShortName']['value']=='CC BY-SA 4.0'
 sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
 rows.append(dict(syllable=syll,file=str(p),source_word=word,source_file=str(source),source_sha256=sha(source),source_excerpt_seconds=[start,end],selection_note=note,source_speaker='Kunokuno',speaker_entity='https://lingualibre.org/wiki/Q424288',source_language='Tagalog',source_url=info['url'].split('?')[0],source_description_url=info['descriptionurl'],license='CC BY-SA 4.0',license_url='https://creativecommons.org/licenses/by-sa/4.0/',source_date=info['extmetadata']['DateTimeOriginal']['value'],credit='Speaker and recorder Kunokuno, Lingua Libre. CC BY-SA 4.0. Gated excerpt by Study Studio.',native_status_independently_verified=False,gate_end_fade_seconds=.005,added_silence=False,pitch_or_time_processing=False,within_source_time_pitch_retained=True,duration_seconds=len(pcm)/sr,sample_rate=sr,rms=float(np.sqrt(np.mean(x*x))),peak=float(max(abs(x))),sha256=sha(p)))
(O/'manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Twelve same-speaker natural CV units; no durations/pitches equalized',[(r['syllable'],r['duration_seconds'])for r in rows])
