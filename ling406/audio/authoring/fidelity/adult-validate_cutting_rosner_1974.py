#!/usr/bin/env python3
"""Read outputs independently and check PCM/decoded length and spectral fundamentals."""
import argparse
import hashlib
import json
import subprocess
import wave
from pathlib import Path
import numpy as np
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir',type=Path,required=True,help='Directory produced by adult-build_cutting_rosner_1974.py.')
ROOT=parser.parse_args().output_dir.resolve()
manifest_path=ROOT/'manifest.json'
if not manifest_path.is_file():
    raise FileNotFoundError(f'Adult reconstruction manifest missing: {manifest_path}. Run adult-build_cutting_rosner_1974.py into this output directory first.')
manifest=json.loads(manifest_path.read_text())
checks=[]
for clip in manifest['clips']:
    wpath=ROOT/clip['wav']['file'];mpath=ROOT/clip['mp3']['file']
    with wave.open(str(wpath),'rb') as wf:
        sr=wf.getframerate();channels=wf.getnchannels();width=wf.getsampwidth()
        ns=wf.getnframes();x=np.frombuffer(wf.readframes(ns),dtype='<i2').astype(np.float64)/32767
    raw=subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(mpath),
                        '-f','s16le','-acodec','pcm_s16le','-'],check=True,stdout=subprocess.PIPE).stdout
    decoded_n=len(raw)//2
    f0=clip.get('frequency_hz',clip.get('parameters',{}).get('frequency_hz'))
    # A long token window has <1 Hz frequency resolution and avoids the strong onset.
    # Ordered arrays use the first token, so the same check applies there.
    a=x[round(.10*sr):round(.90*sr)]
    spec=np.abs(np.fft.rfft(a*np.hanning(len(a)),n=sr*4))
    frequencies=np.fft.rfftfreq(sr*4,1/sr)
    fundamental=float(frequencies[np.argmax(spec)])
    row={'id':clip['id'],'wav_samples':ns,'mp3_decoded_samples':decoded_n,
         'mp3_gapless_decoded_length_matches_wav':ns==decoded_n,
         'sample_rate_hz':sr,'channels':channels,'pcm_bits':width*8,
         'largest_spectral_peak_hz':fundamental,'expected_fundamental_hz':f0,
         'fundamental_error_hz':abs(fundamental-f0),
         'wav_hash_matches_manifest':hashlib.sha256(wpath.read_bytes()).hexdigest()==clip['wav']['sha256'],
         'mp3_hash_matches_manifest':hashlib.sha256(mpath.read_bytes()).hexdigest()==clip['mp3']['sha256'],
         'peak_pcm_amplitude':float(np.max(np.abs(x))),'first_pcm_sample':float(x[0]),'last_pcm_sample':float(x[-1]),}
    row['passed']=all([sr==48000,channels==1,width==2,ns==decoded_n,
                       row['fundamental_error_hz']<=.5,row['wav_hash_matches_manifest'],
                       row['mp3_hash_matches_manifest'],row['peak_pcm_amplitude']<1,
                       row['first_pcm_sample']==0,row['last_pcm_sample']==0])
    checks.append(row)
result={'passed':all(x['passed'] for x in checks),'clip_count':len(checks),
        'checks':checks,'scope':'File readback, exact sample lengths after ffmpeg gapless MP3 decode, strongest spectral fundamental, hashes and clipping/endpoints. This does not validate human identification or original Moog equivalence.'}
(ROOT/'independent-file-validation.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'passed':result['passed'],'clip_count':len(checks)}))
assert result['passed']
