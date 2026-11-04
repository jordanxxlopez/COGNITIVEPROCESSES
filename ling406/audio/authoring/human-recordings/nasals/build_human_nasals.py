"""Gate natural Tagalog CVs from a single documented Lingua Libre speaker.
No speech synthesis, vowel replacement, pitch shift, or duration conversion.
Originals licensed CC BY-SA 4.0; derivatives retain that license and attribution.
"""
from pathlib import Path
import argparse, json, hashlib, wave
import numpy as np
import parselmouth
D=Path(__file__).resolve().parent
parser=argparse.ArgumentParser();parser.add_argument('--output-dir',type=Path,required=True);args=parser.parse_args()
O=args.output_dir.resolve();O.mkdir(parents=True,exist_ok=True)
meta=json.load(open(D/'kunokuno_metadata.json'))
by={p['title'].split('Kunokuno-')[-1].split('.')[0]:p['imageinfo'][0] for p in meta['query']['pages'].values()}
SR=48000
CUTS={'ma':('man',.195,.395),'na':('na',.165,.395),'nga':('nga',.140,.395)}
units={};rows=[]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(id,x):
 p=O/(id+'.wav');pcm=np.rint(x*32767).astype('<i2')
 with wave.open(str(p),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
 return p,pcm
for id,(word,start,end) in CUTS.items():
 source=D/f'kunokuno_{word}.wav';s=parselmouth.Sound(str(source));assert s.sampling_frequency==SR
 original=s.values[0,round(start*SR):round(end*SR)].copy()
 # Only end of the extracted vowel is faded, to avoid a waveform discontinuity.
 # Preserve the nasal onset and nasal-to-vowel transition without added fades.
 fade=round(.006*SR);original[-fade:]*=.5*(1+np.cos(np.linspace(0,np.pi,fade)))
 rms=np.sqrt(np.mean(original**2));gain=.05/rms;core=original*gain;assert max(abs(core))<.999
 # Exact core is reused in both comparison players.
 units[id]=core
 p,pcm=save('tagalog_human_'+id,np.concatenate([np.zeros(round(.025*SR)),core,np.zeros(round(.080*SR))]))
 info=by[word]
 rows.append(dict(id='tagalog_human_'+id,file=str(p),title='Human Tagalog ['+{'ma':'ma','na':'na','nga':'ŋa'}[id]+'] — recorded CV excerpt',spokenText='['+{'ma':'ma','na':'na','nga':'ŋa'}[id]+']',kind='Human recorded syllable excerpt',scope='Real Tagalog pronunciation excerpt, not an original Narayan et al. test token.',note=f'Natural recording by Lingua Libre speaker Kunokuno (Q424288). Excerpt {start:.3f}–{end:.3f} s from the recorded Tagalog '+word+('. The final [n] of man is excluded.' if id=='ma' else ', retaining its initial nasal and early /a/ vowel.')+' Original within-token timing and pitch retained. Single scalar RMS normalization to0.05 and6ms end-fade; no phoneme replacement, voice conversion or synthesis. These new word-derived excerpts are not duration-matched or listener-validated experimental tokens.',reference=info['descriptionurl'],credit='Speaker and recorder Kunokuno, Lingua Libre, 2025-04-07. CC BY-SA 4.0. Excerpt/level adjustment by Study Studio.',license='CC BY-SA 4.0',license_url='https://creativecommons.org/licenses/by-sa/4.0/',source_file=source.name,source_sha256=sha(source),source_url=info['url'].split('?')[0],source_description_url=info['descriptionurl'],source_speaker_entity='https://lingualibre.org/wiki/Q424288',source_speaker_native_status='Source identifies a Tagalog recording speaker; independent native-status verification not obtained.',source_excerpt_seconds=[start,end],source_word=word,within_token_time_pitch_unchanged=True,added_end_fade_seconds=.006,added_leading_silence_seconds=.025,added_trailing_silence_seconds=.08,scalar_gain=float(gain),core_rms=.05,core_seconds=len(core)/SR,duration_seconds=len(pcm)/SR,sample_rate=SR,sha256=sha(p)))
for stem,seq in [('na_nga',['na','nga','na','nga']),('ma_na',['ma','na','ma','na'])]:
 chunks=[np.zeros(round(.2*SR))]
 for i,id in enumerate(seq):
  if i:chunks.append(np.zeros(SR))
  chunks.append(units[id])
 chunks.append(np.zeros(round(.2*SR)))
 p,pcm=save('tagalog_human_pair_'+stem,np.concatenate(chunks))
 rows.append(dict(id=p.stem,file=str(p),title='Human Tagalog contrast: '+('na → ŋa'if stem=='na_nga'else'ma → na'),spokenText=' → '.join('ŋa'if x=='nga'else x for x in seq),kind='Human recorded syllable comparison',scope='Same identified speaker and source vowel phoneme, with natural token-to-token pitch/duration differences retained.',note='Alternating original recorded CV excerpts by Kunokuno, Lingua Libre (CC BY-SA 4.0). The identical [na] waveform is reused in the target and control. One second of silence separates vowel offset and the next token onset. No synthesizer, pitch flattening, voice conversion or time stretching. New teaching comparison, not Narayan et al.’s original randomized infant trials.',reference=by['nga'if stem=='na_nga'else'man']['descriptionurl'],credit='Kunokuno, Lingua Libre, 2025-04-07. CC BY-SA 4.0. Adapted by Study Studio.',license='CC BY-SA 4.0',license_url='https://creativecommons.org/licenses/by-sa/4.0/',sequence=seq,inter_token_silence_seconds=1.0,duration_seconds=len(pcm)/SR,sample_rate=SR,sha256=sha(p)))
(O/'manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Prepared',len(rows),'human-recording files')
