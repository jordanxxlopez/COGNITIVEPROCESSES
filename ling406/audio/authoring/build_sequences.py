from pathlib import Path
import json,subprocess,wave,hashlib
import numpy as np
import argparse
p=argparse.ArgumentParser();p.add_argument('--output',type=Path,default=Path(__file__).resolve().parent/'generated');args=p.parse_args();D=args.output.resolve();A=D/'audio';j=json.loads((D/'manifest.json').read_text());by={x['id']:x for x in j};sr=24000
seqs=[('nonspeech_attack_comparison',['nonspeech_attack_10','nonspeech_attack_80'],.5,'Fast versus slow amplitude rise in a harmonic tone'),('f2_equal_steps',[f'f2_step_{i:02d}'for i in range(1,14)],.45,'F2 onset continuum, 13 equal acoustic steps'),('vot_comparison',['vot_00','vot_40','vot_80'],.5,'Compare modeled 0, 40 and 80 ms voicing lags'),('source_filter_comparison',['source_buzz','vowel_base','vowel_raise_f1','vowel_raise_f2'],.5,'Same synthetic source through three different vowel filters')]
for id,ids,gap,title in seqs:
 chunks=[]
 for i,s in enumerate(ids):
  with wave.open(str(D/by[s]['lossless_file']))as w:assert w.getframerate()==sr;chunks.append(np.frombuffer(w.readframes(w.getnframes()),dtype='<i2'))
  if i<len(ids)-1:chunks.append(np.zeros(round(gap*sr),dtype='<i2'))
 x=np.concatenate(chunks);p=A/(id+'.wav')
 with wave.open(str(p),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(x.tobytes())
 mp3=A/(id+'.mp3');subprocess.run(['ffmpeg','-y','-v','error','-i',str(p),'-c:a','libmp3lame','-b:a','128k',str(mp3)],check=True);j.append(dict(id=id,file=str(mp3.relative_to(D)),lossless_file=str(p.relative_to(D)),description=title,kind='acoustic-model-comparison',model=by[ids[0]]['model'],parameters=dict(ordered_items=ids,inter_example_gap_seconds=gap),scope='Sequence of newly modeled examples, not original recordings from the cited experiments. Silence separates examples for classroom listening, not within the source tokens.',source_url=by[ids[0]]['source_url'],duration=len(x)/sr,sample_rate=sr,sha256=hashlib.sha256(mp3.read_bytes()).hexdigest(),lossless_sha256=hashlib.sha256(p.read_bytes()).hexdigest(),generation_script='build_sequences.py'))
(D/'manifest.json').write_text(json.dumps(j,indent=2,ensure_ascii=False)+'\n')
