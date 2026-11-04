"""Derive native Hindi CV onset excerpts without TTS or phoneme substitution.
Source map: ACIP Hindi Stops, hindi6 /t̪al/ and hindi10 /ʈal/.
0–260 ms excludes the final lateral transition (visible near 300 ms).
Native stop release and early vowel transition retained. Common duration,
RMS level and raised-cosine 8-ms final fade; original pitch retained.
"""
from pathlib import Path
import argparse, json, hashlib, wave
import numpy as np
import parselmouth

SOURCE_ROOT=Path(__file__).resolve().parent/'hindi-source-wavs'
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir',type=Path,required=True,help='Fresh destination for the two derived CV WAVs and derivation record.')
ROOT=parser.parse_args().output_dir.resolve();ROOT.mkdir(parents=True,exist_ok=True)
results=[]
for source,stem,ipa in [('hindi6.wav','hindi_dental_ta_cv','t̪a'),('hindi10.wav','hindi_retroflex_ta_cv','ʈa')]:
    input_path=SOURCE_ROOT/source
    if not input_path.is_file():
        raise FileNotFoundError(f'Required retained Hindi source WAV missing: {input_path}. Restore hindi-source-wavs from this package.')
    s=parselmouth.Sound(str(input_path));rate=int(s.sampling_frequency)
    x=s.values[0,:round(.260*rate)].copy()
    # Normalize over voiced vowel 100–240ms; retain native relative burst amplitude.
    source_rms=float(np.sqrt(np.mean(x[round(.10*rate):round(.24*rate)]**2)))
    gain=.20/source_rms
    x*=gain
    endfade=round(.008*rate)
    x[-endfade:]*=.5*(1+np.cos(np.linspace(0,np.pi,endfade)))
    # Common leading/trailing pad. Main 260ms waveform unchanged in time.
    x=np.concatenate((np.zeros(round(.040*rate)),x,np.zeros(round(.080*rate))))
    assert np.max(np.abs(x))<.999
    output=ROOT/(stem+'.wav')
    y=np.rint(x*32767).astype('<i2')
    with wave.open(str(output),'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(y.tobytes())
    res={'file':str(output),'source_file':source,'ipa':ipa,'sample_rate':rate,'duration_s':len(x)/rate,'source_excerpt_s':[0,.260],'source_voiced_rms_window_s':[.1,.24],'target_voiced_rms':.20,'gain':gain,'end_fade_s':.008,'leading_silence_s':.04,'trailing_silence_s':.08,'pitch_method':'Retained native source F0; no pitch/formant/time conversion','sha256':hashlib.sha256(output.read_bytes()).hexdigest()}
    results.append(res)
(ROOT/'hindi_cv_derivation.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(results,ensure_ascii=False,indent=2))
