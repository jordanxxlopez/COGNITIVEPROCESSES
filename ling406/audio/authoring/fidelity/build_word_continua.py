#!/usr/bin/env python3
"""Construct new, explicitly non-original, waveform-controlled word continua.

Requires numpy, Praat/Parselmouth and ffmpeg. Model source WAVs are retained.
Only the burst-to-common-rhyme delay changes within each family. The original
word rhyme is an identical PCM suffix in every member. Timing is an authoring
parameter, not a recovered original experimental VOT measurement.
"""
from pathlib import Path
import argparse, hashlib, json, subprocess, wave
import numpy as np
import parselmouth

SOURCE_ROOT = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir', type=Path, required=True, help='Fresh destination for rebuilt files, not the deployed audio directory.')
D = parser.parse_args().output_dir.resolve()
D.mkdir(parents=True, exist_ok=True)
for name in ['wav', 'clips']:
    (D/name).mkdir(exist_ok=True)
SR = 24000
SILENCE = int(.15 * SR)
BURST_SAMPLES = 120  # 5 ms, including the source release transient
manifest, metrics = [], []

def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()

def pcm_sha(a):
    return hashlib.sha256(np.asarray(a, dtype='<i2').tobytes()).hexdigest()

def save(stem, pcm):
    p = D/'wav'/(stem+'.wav')
    with wave.open(str(p), 'wb') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes(np.asarray(pcm, dtype='<i2').tobytes())
    q = D/'clips'/(stem+'.mp3')
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(p),'-ar','44100',
                    '-codec:a','libmp3lame','-b:a','128k',str(q)],check=True)
    subprocess.run(['ffmpeg','-v','error','-i',str(q),'-f','null','-'],check=True)
    return dict(file='clips/'+q.name, wav='wav/'+p.name, sha256=sha(q),
                wav_sha256=sha(p), duration_seconds=len(pcm)/SR,
                sample_rate=44100, native_sample_rate=SR, channels=1,
                decoded_without_errors=True, peak=float(max(abs(pcm.astype(float)))/32768))

def periodicity(x):
    x = x.astype(float); x -= x.mean()
    c = np.correlate(x,x,'full')[len(x)-1:]
    return float(max(c[60:241])/c[0])

def noise_bed(source_noise, length, seed):
    """Fixed source-shaped aperiodic noise; all steps use its same prefix."""
    # A 45 ms aspiration excerpt supplies the spectral envelope and RMS.
    # Random phase removes accidental periodicity from the model waveform.
    nfft = 2048
    amp = abs(np.fft.rfft(source_noise*np.hanning(len(source_noise)), nfft))
    freq0 = np.fft.rfftfreq(nfft, 1/SR)
    freq1 = np.fft.rfftfreq(length, 1/SR)
    spec = np.interp(freq1, freq0, amp)
    # Aspiration is aperiodic; remove DC and sub-100 Hz model residuals.
    spec[freq1 < 100] = 0
    for attempt in range(100):
        rng = np.random.default_rng(seed+attempt)
        a = np.fft.irfft(spec*np.exp(1j*rng.uniform(0,2*np.pi,len(spec))),length)
        a -= a.mean()
        a *= np.sqrt(np.mean(source_noise**2))/np.sqrt(np.mean(a**2))
        if periodicity(a) < .25:
            return a, seed+attempt
    raise RuntimeError('Could not obtain an aperiodic aspiration bed')

families = [
    dict(id='bear-pear', source='pear', input_ipa='pˈɛɹ',
         rhyme_sample=5860, release_sample=4248, seed=40601,
         steps=list(range(5,86,10)), endpoint_labels=['bear-like','pear-like'],
         sections=['speech1-21','speech2-10','speech2-11','speech2-12','speech2-13','speech2-14'],
         spoken='[bɛɹ] to [pʰɛɹ]',
         research='McMurray et al. (2003), DOI 10.1023/A:1021937116271'),
    dict(id='gorpse-corpse', source='ganong-corpse-word', input_ipa='kˈɔːɹps',
         rhyme_sample=5880, release_sample=4248, seed=40602,
         steps=list(range(5,86,5)), endpoint_labels=['gorpse-like','corpse-like'],
         sections=['speech2-18','speech2-19','speech2-20','speech2-21'],
         spoken='[ɡɔɹps] to [kʰɔɹps]',
         research='Ganong (1980), DOI 10.1037/0096-1523.6.1.110')
]

for cfg in families:
    src = SOURCE_ROOT/'word-source-wavs'/(cfg['source']+'.wav')
    if not src.is_file():
        raise FileNotFoundError(f'Required retained source WAV missing: {src}. Restore the word-source-wavs folder from this package; no scratch-cache fallback is used.')
    snd = parselmouth.Sound(str(src))
    assert int(snd.sampling_frequency)==SR and snd.n_channels==1
    x = snd.values[0]
    # Source phonation boundaries were inspected in waveform/spectrogram and
    # snapped to a positive-going zero crossing in established periodic vowel.
    cut = cfg['rhyme_sample']; rel = cfg['release_sample']
    burst = x[rel:rel+BURST_SAMPLES].copy()
    rhyme = x[cut:].copy()
    # One 1 ms fade prevents a cut click and is identical for every step.
    rhyme[:24] *= np.sin(np.linspace(0,np.pi/2,24))**2
    aspiration = x[round(.185*SR):round(.230*SR)].copy()
    bed, seed = noise_bed(aspiration,round(.1*SR),cfg['seed'])
    burst_i = np.round(np.clip(burst,-1,1)*32767).astype('<i2')
    rhyme_i = np.round(np.clip(rhyme,-1,1)*32767).astype('<i2')
    bed_i = np.round(np.clip(bed,-1,1)*32767).astype('<i2')
    steps_pcm = []; step_rows = []
    for ms in cfg['steps']:
        n = round(ms*SR/1000)
        assert n>=BURST_SAMPLES
        prefix = np.concatenate([burst_i,bed_i[:n-BURST_SAMPLES]])
        # Identical post-boundary rhyme; no separate TTS endpoint generation.
        y = np.concatenate([np.zeros(SILENCE,dtype='<i2'),prefix,rhyme_i,
                            np.zeros(round(.15*SR),dtype='<i2')])
        stem = cfg['id']+f'-vot-{ms:03d}'
        data = save(stem,y)
        assert np.array_equal(y[SILENCE+n:SILENCE+n+len(rhyme_i)],rhyme_i)
        assert np.array_equal(y[SILENCE:SILENCE+BURST_SAMPLES],burst_i)
        r = dict(id=stem,title=f"{cfg['id']}: nominal {ms} ms release-to-voicing delay",
                 spokenText=cfg['spoken'],kind='controlled-word-reconstruction',
                 scope='New matched word continuum; not original experimental audio',
                 sections=cfg['sections'],family=cfg['id'],synthetic=True,
                 nominal_vot_ms=ms,source_word=cfg['source'],source_url='https://github.com/hexgrad/kokoro',
                 model='Kokoro-82M v1.0; af_heart American-English voice; kokoro-onnx 0.6.1',
                 method_source='https://doi.org/10.3758/s13423-025-02700-x',
                 research_source='https://doi.org/'+cfg['research'].split('DOI ')[1],
                 research_reference=cfg['research'],
                 note='New teaching reconstruction: an identical source-word burst and an identical word rhyme, with a controlled intervening aperiodic aspiration interval. Kokoro supplies the source word; numerical waveform editing supplies timing. These are not the original study tokens, and their perceptual category boundary has not been validated.',
                 source_wav_sha256=sha(src),**data)
        manifest.append(r);step_rows.append(r);steps_pcm.append(y)
        metrics.append(dict(id=stem,release_sample=SILENCE,
                            common_rhyme_boundary_sample=SILENCE+n,
                            construction_delay_ms=1000*n/SR,
                            burst_pcm_sha256=pcm_sha(burst_i),
                            common_rhyme_pcm_sha256=pcm_sha(rhyme_i),
                            common_rhyme_identical=True))
    for suffix,ix,title in [('series',list(range(len(steps_pcm))),f"{cfg['id']}: full {len(steps_pcm)}-step continuum"),
                            ('endpoints',[0,-1,0,-1],f"{cfg['id']}: short and long delay, repeated")]:
        y = np.concatenate([np.concatenate([steps_pcm[i],np.zeros(round(.55*SR),dtype='<i2')]) for i in ix])
        row=dict(step_rows[0]);row.update(id=cfg['id']+'-'+suffix,title=title,
                                         nominal_vot_ms=None,sequence_ms=[cfg['steps'][i] for i in ix],
                                         **save(cfg['id']+'-'+suffix,y))
        manifest.append(row)
    pitch = parselmouth.Sound(rhyme[:round(.2*SR)],SR).to_pitch_ac(pitch_floor=75,pitch_ceiling=500)
    f = pitch.selected_array['frequency']; f=f[f>0]
    cfg.update(source_wav_sha256=sha(src),actual_seed=seed,
               aspiration_autocorrelation_peak_100_400hz=periodicity(bed),
               common_rhyme_first_30ms_autocorrelation_peak=periodicity(rhyme[:720]),
               common_rhyme_praat_median_f0_hz=float(np.median(f)),
               burst_pcm_sha256=pcm_sha(burst_i), common_rhyme_pcm_sha256=pcm_sha(rhyme_i))

(D/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(D/'metrics.json').write_text(json.dumps(dict(families=families,steps=metrics),ensure_ascii=False,indent=2)+'\n')
print(f'Built {len(manifest)} MP3s; both word families share exact PCM rhymes and burst transients.')
