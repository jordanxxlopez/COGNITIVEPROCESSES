#!/usr/bin/env python3
"""Render explicit classroom examples with local Kokoro-82M v1.0 ONNX.

Usage:
 /workspace/.venvs/behavneur/bin/python ling406_synthesize.py input.json output_dir

input.json is [{"id":"garden-path", "text":"The horse raced past the barn fell."}].
Optional fields: phonemes (Kokoro-compatible IPA), speed (default 1.0),
voice (default af_heart), lang (default en-us), description.
These are modeled teaching demonstrations, never original participant recordings.
Do not use this English model as validation of non-English phonetic contrasts.
"""
from pathlib import Path
import argparse, hashlib, importlib.metadata, json, re, subprocess, sys, wave
import numpy as np
import onnxruntime as ort
from kokoro_onnx import Kokoro

MODEL_DIR=Path('/workspace/.models/kokoro')
SOURCES={
 'model':'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx',
 'voices':'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin',
 'model_card':'https://huggingface.co/hexgrad/Kokoro-82M',
 'engine':'https://github.com/thewh1teagle/kokoro-onnx',
}
def sha(path):
 h=hashlib.sha256()
 with path.open('rb')as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('input',type=Path);p.add_argument('output_dir',type=Path);p.add_argument('--model-dir',type=Path,default=MODEL_DIR);p.add_argument('--voice',default='af_heart');p.add_argument('--threads',type=int,default=4);args=p.parse_args()
 items=json.loads(args.input.read_text());assert isinstance(items,list) and items
 ids=[x['id']for x in items];assert len(ids)==len(set(ids));assert all(re.fullmatch(r'[a-zA-Z0-9_-]+',x)for x in ids)
 args.output_dir.mkdir(parents=True,exist_ok=True);model=args.model_dir/'kokoro-v1.0.onnx';voices=args.model_dir/'voices-v1.0.bin'
 opts=ort.SessionOptions();opts.intra_op_num_threads=args.threads;opts.inter_op_num_threads=1
 sess=ort.InferenceSession(str(model),sess_options=opts,providers=['CPUExecutionProvider']);engine=Kokoro.from_session(sess,str(voices));known=set(engine.get_voices())
 meta=dict(engine='kokoro-onnx',engine_version=importlib.metadata.version('kokoro-onnx'),model='Kokoro-82M v1.0',model_license='Apache-2.0 (as declared in the original model card)',engine_license='MIT',sources=SOURCES,model_sha256=sha(model),voices_sha256=sha(voices),synthetic=True,scope='Locally generated educational pronunciation of the exact supplied text. Not original experimental stimuli, participant speech, or a native-speaker validation. Supported English, French, and Spanish pronunciation examples do not validate Hindi or Salish contrasts.',sources_input_sha256=sha(args.input),items=[])
 for item in items:
  text=item['text'];voice=item.get('voice',args.voice);speed=float(item.get('speed',1.0));lang=item.get('lang','en-us');assert voice in known,voice;assert lang in ('en-us','en-gb','fr-fr','es'),'Only English, French, or Spanish supported by this classroom pipeline.';assert not (lang=='fr-fr' and not voice.startswith('ff_')),'French requires the ff_siwis voice';assert not (lang=='es' and not voice.startswith(('ef_','em_'))),'Spanish requires a Spanish voice';assert .75<=speed<=1.25
  phonemes=item.get('phonemes') or engine.tokenizer.phonemize(text,lang)
  if item.get('phonemes'):
   missing=set(phonemes)-set(engine.tokenizer.vocab)
   if missing:raise ValueError(f'Unsupported phonemes {missing} for {item["id"]}')
  wav=args.output_dir/(item['id']+'.wav');mp3=args.output_dir/(item['id']+'.mp3')
  if wav.exists() and mp3.exists():
   with wave.open(str(wav),'rb') as w:
    sr=w.getframerate();audio=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2')/32767
   peak=float(np.abs(audio).max())
  else:
   audio,sr=engine.create(item.get('phonemes')or text,voice=voice,speed=speed,lang=lang,is_phonemes=bool(item.get('phonemes')),trim=True,sentence_pause=.25,clause_pause=.1)
   assert len(audio)>sr*.08 and np.isfinite(audio).all();peak=float(np.abs(audio).max());assert 0<peak<1.1
   # Keep the model waveform's pace and pitch, adding only 0.15 s quiet margins.
   audio=np.pad(np.clip(audio,-1,1),(int(sr*.15),int(sr*.15)))
   with wave.open(str(wav),'wb')as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((audio*32767).astype('<i2').tobytes())
   subprocess.run(['ffmpeg','-y','-v','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','128k',str(mp3)],check=True)
  subprocess.run(['ffmpeg','-v','error','-i',str(mp3),'-f','null','-'],check=True,stdout=subprocess.DEVNULL)
  probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(mp3)]));row={**item,'file':mp3.name,'voice':voice,'language':lang,'speed':speed,'frontend_phonemes':phonemes,'duration_seconds':float(probe['format']['duration']),'sample_rate':sr,'channels':1,'bit_rate':128000,'sha256':sha(mp3),'wav_sha256':sha(wav),'decoded_without_errors':True,'waveform_peak':peak,'synthetic':True};meta['items'].append(row);print(item['id'],row['duration_seconds'],'s',phonemes,flush=True)
 (args.output_dir/'synthesis-manifest.json').write_text(json.dumps(meta,indent=2,ensure_ascii=False)+'\n')
if __name__=='__main__':main()
