#!/usr/bin/env python3
"""Source-based, explicitly approximate digital reconstruction of C&R1974 nonspeech stimuli.

Requires Python + NumPy and ffmpeg. Reads no course files. Deterministic WAV output.
Published parameters and reconstruction choices are separated in manifest.json.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import math
import subprocess
import wave
from pathlib import Path
import numpy as np

PACKAGE_ROOT = Path(__file__).resolve().parent
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir',type=Path,required=True,help='Fresh destination for adult-study digital reconstruction outputs.')
ROOT=parser.parse_args().output_dir.resolve();ROOT.mkdir(parents=True,exist_ok=True)
SR = 48000
FREQUENCIES = (294, 440)
RISES_MS = tuple(range(0, 81, 10))
HARMONICS = 40
OUTPUT_GAIN = .65
NOMINAL_DECAY_S = 1.020
SOURCE_DOI = '10.3758/BF03198588'


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write_wav(path, audio):
    pcm = np.round(np.clip(audio, -1, 1) * 32767).astype('<i2')
    with wave.open(str(path), 'wb') as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(SR)
        out.writeframes(pcm.tobytes())
    return pcm.astype(np.float64)/32767


def write_mp3(wav_path, mp3_path):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
                    '-i', str(wav_path), '-codec:a', 'libmp3lame', '-b:a', '192k',
                    '-map_metadata', '-1', str(mp3_path)], check=True)


def carrier(frequency_hz, n):
    # Fourier partials of a sawtooth, with a fixed harmonic count and zero-start phase.
    # This is not an estimate of the original Moog filter cutoff.
    phase = 2 * np.pi * frequency_hz * np.arange(n) / SR
    raw = np.zeros(n, dtype=np.float64)
    for harmonic in range(1, HARMONICS + 1):
        raw += (-1.0)**(harmonic + 1) * np.sin(harmonic*phase) / harmonic
    # Normalize the carrier using the same long prefix for every item of an array.
    # No per-item RMS normalization is applied, so only the envelope changes.
    probe_phase = 2*np.pi*frequency_hz*np.arange(SR) / SR
    probe = np.zeros(SR, dtype=np.float64)
    for harmonic in range(1, HARMONICS + 1):
        probe += (-1.0)**(harmonic + 1) * np.sin(harmonic*probe_phase) / harmonic
    return raw / np.max(np.abs(probe))


def item(frequency_hz, nominal_rise_ms):
    duration_s = NOMINAL_DECAY_S + nominal_rise_ms/1000
    n = round(SR * duration_s)
    requested_rise_s = (1/(4*frequency_hz) if nominal_rise_ms == 0
                        else nominal_rise_ms/1000)
    peak_index = round(SR*requested_rise_s)
    envelope = np.empty(n, dtype=np.float64)
    envelope[:peak_index+1] = np.arange(peak_index+1)/peak_index
    envelope[peak_index:] = (n-1-np.arange(peak_index, n))/(n-1-peak_index)
    audio = OUTPUT_GAIN * carrier(frequency_hz, n) * envelope
    return audio, envelope, {
        'frequency_hz': frequency_hz,
        'nominal_rise_ms': nominal_rise_ms,
        'zero_label_means_quarter_period': nominal_rise_ms == 0,
        'requested_envelope_peak_ms': 1000*requested_rise_s,
        'realized_envelope_peak_ms': 1000*peak_index/SR,
        'envelope_peak_sample': peak_index,
        'duration_ms': 1000*n/SR,
        'sample_count': n,
        'postpeak_envelope_span_ms': 1000*(n-1-peak_index)/SR,
    }


def sequence(parts, onset_interval_s):
    final_n = round(SR*onset_interval_s*(len(parts)-1)) + len(parts[-1])
    full = np.zeros(final_n, dtype=np.float64)
    for i, part in enumerate(parts):
        onset = round(SR*onset_interval_s*i)
        full[onset:onset+len(part)] = part
    return full


def file_info(path):
    return {'file': str(path.relative_to(ROOT)), 'sha256': sha256(path),
            'bytes': path.stat().st_size}


def main():
    (ROOT/'wav').mkdir(exist_ok=True)
    (ROOT/'mp3').mkdir(exist_ok=True)
    entries=[]
    validations=[]
    all_signals={}
    for frequency_hz in FREQUENCIES:
        for rise_ms in RISES_MS:
            clip_id=f'cutting_rosner_1974_saw_{frequency_hz}_rise_{rise_ms:02d}'
            signal, env, params = item(frequency_hz, rise_ms)
            all_signals[(frequency_hz,rise_ms)] = signal
            wav_path=ROOT/'wav'/f'{clip_id}.wav'
            mp3_path=ROOT/'mp3'/f'{clip_id}.mp3'
            decoded=write_wav(wav_path, signal)
            write_mp3(wav_path, mp3_path)
            near_peak_error = abs(params['realized_envelope_peak_ms']-
                                  params['requested_envelope_peak_ms'])
            val={
                'id':clip_id, **params,
                'envelope_peak_error_ms':near_peak_error,
                'peak_amplitude_pcm':float(np.max(np.abs(decoded))),
                'rms_amplitude_pcm':float(np.sqrt(np.mean(decoded**2))),
                'clipped_sample_count':int(np.sum(np.abs(decoded)>=1)),
                'first_sample':float(decoded[0]),'last_sample':float(decoded[-1]),
                'envelope_strictly_rises_to_peak':bool(np.all(np.diff(env[:params['envelope_peak_sample']+1])>0)),
                'envelope_strictly_decays_after_peak':bool(np.all(np.diff(env[params['envelope_peak_sample']:])<0)),
                'harmonic_count':HARMONICS,
                'highest_harmonic_hz':HARMONICS*frequency_hz,
                'highest_harmonic_below_nyquist':HARMONICS*frequency_hz < SR/2,
                'pcm_quantization_error_max':float(np.max(np.abs(decoded-signal))),
            }
            assert val['clipped_sample_count']==0
            assert near_peak_error <= 1000/(2*SR)+1e-8
            assert val['envelope_strictly_rises_to_peak'] and val['envelope_strictly_decays_after_peak']
            assert val['highest_harmonic_below_nyquist']
            assert val['first_sample']==0 and val['last_sample']==0
            assert params['sample_count']==round((1020+rise_ms)*SR/1000)
            validations.append(val)
            entries.append({
                'id':clip_id,
                'title':f'Sawtooth at {frequency_hz} Hz — nominal {rise_ms} ms rise',
                'kind':'source-parameter digital reconstruction',
                'display_label':f'{frequency_hz} Hz sawtooth, {rise_ms} ms rise'+(' (quarter-period attack)' if rise_ms==0 else ''),
                'note':'New digital reconstruction using the study’s frequency, nominal rise time and duration range. The Moog timbre and exact envelope are not original recordings.',
                'parameters':params,
                'wav':file_info(wav_path),'mp3':file_info(mp3_path),
            })
        for suffix, rises, onset_s, label in [
            ('ordered_00_to_80', RISES_MS, 4.0,
             'Ordered teaching demonstration of all nine rises, 0 to 80 ms, at 4-second onsets. Not the randomized original identification tape.'),
            ('endpoints_00_80', (0,80), 2.1,
             'Nominal 0 ms endpoint, then 80 ms endpoint. A quick teaching comparison, not an original task trial.'),
        ]:
            clip_id=f'cutting_rosner_1974_saw_{frequency_hz}_{suffix}'
            signal=sequence([all_signals[(frequency_hz,r)] for r in rises],onset_s)
            wav_path=ROOT/'wav'/f'{clip_id}.wav'
            mp3_path=ROOT/'mp3'/f'{clip_id}.mp3'
            write_wav(wav_path,signal); write_mp3(wav_path,mp3_path)
            entries.append({'id':clip_id,
                'title':f'{frequency_hz} Hz sawtooth — '+('all nine rise times' if len(rises)>2 else '0 and 80 ms endpoints'),
                'kind':'source-parameter digital reconstruction teaching sequence',
                'note':label,
                'frequency_hz':frequency_hz,'rise_times_ms':list(rises),
                'onset_interval_ms':1000*onset_s,
                'onsets_ms':[1000*onset_s*i for i in range(len(rises))],
                'duration_ms':1000*len(signal)/SR,
                'wav':file_info(wav_path),'mp3':file_info(mp3_path)})
    manifest={
        'schema_version':1,
        'purpose':'Replace unrelated generic 400 Hz, 500 ms attack examples on the Cutting and Rosner adult-study slide with explicit source-based digital reconstructions.',
        'primary_source':{
            'citation':'Cutting, J. E., & Rosner, B. S. (1974). Categories and boundaries in speech and music. Perception & Psychophysics, 16(3), 564–570.',
            'doi':SOURCE_DOI,'url':'https://doi.org/'+SOURCE_DOI,
            'pdf_url':'https://link.springer.com/content/pdf/10.3758/BF03198588.pdf',
            'methods_location':'Experiment I, printed p. 565, Stimuli; same page, Tapes and Procedure.',
            'local_pdf':('source_cutting_rosner_1974.pdf' if (ROOT/'source_cutting_rosner_1974.pdf').exists() else None),
            'local_pdf_sha256':(sha256(ROOT/'source_cutting_rosner_1974.pdf') if (ROOT/'source_cutting_rosner_1974.pdf').exists() else None),
        },
        'published_parameters':{
            'waveform':'Moog sawtooth, with unspecified low-pass filtering and low-frequency amplitude modulation',
            'frequencies_hz':list(FREQUENCIES),'rise_times_ms':list(RISES_MS),
            'zero_ms_definition':'Maximum amplitude reached within one fourth of a period.',
            'nonspeech_durations_ms_range':[1020,1100],
            'decay_description':'About 1 second; rapid decays and trimmed tails were described as less instrument-like.',
            'identification_onset_to_onset_ms':4000,
            'discrimination_within_triad_onset_to_onset_ms':2100,
            'identification_was_randomized':True,
            'identification_items':144,
            'abx_comparisons':'Two-step pairs differing by 20 ms, four permutations ABA/ABB/BAB/BAA.',
            'endpoint_training':'0 and 80 ms alternated five times each at both frequencies.'},
        'explicit_reconstruction_choices':{
            'engine':'Deterministic NumPy Fourier additive synthesis, standard band-limited sawtooth partial series.',
            'sample_rate_hz':SR,'pcm_bits':16,'channels':1,
            'harmonic_count':HARMONICS,
            'harmonic_amplitudes':'1/n, alternating signs, harmonics 1 through 40, fixed initial phase.',
            'carrier_normalization':'Same peak normalization for every item at a frequency; no per-item loudness normalization.',
            'output_gain':OUTPUT_GAIN,
            'attack_shape':'Linear amplitude envelope. Shape not numerically specified in primary paper.',
            'decay_shape':'Linear amplitude envelope to zero, informed by Figure 1’s long triangular-looking envelopes. Exact original decay formula is not published.',
            'duration_rule_ms':'1020 plus nominal rise time; for nominal 0 ms the actual quarter-period attack is included within the 1020 ms total.',
            'peak_time_quantization':'Nearest sample at 48000 Hz, at most half a sample error.',
            'moog_filter_reconstruction':False,'moog_low_frequency_modulation_reconstruction':False,
            'original_audio_files':False,'behaviorally_validated_categories':False,
            'sequence_design':'Ordered arrays and two-endpoint pairs are teaching aids. They do not reproduce the randomization, number of trials or response task of the original experiment.',
            'mp3_caution':'MP3 files are listening conveniences. The PCM WAVs define the exact sample timings and should be used for timing-sensitive inspection or experiments.',
        },
        'clips':entries,
        'integration':{
            'source_section':'speech1-29',
            'recommended_primary_clips':['cutting_rosner_1974_saw_440_endpoints_00_80','cutting_rosner_1974_saw_440_ordered_00_to_80','cutting_rosner_1974_saw_294_ordered_00_to_80'],
            'replace_current_ids_on_this_section':['nonspeech_attack_comparison','nonspeech_attack_10','nonspeech_attack_80'],
            'retire_from_this_study_context':'Current 400 Hz, 500 ms sounds are generic mechanism demonstrations, not this published array.',
            'other_slide_scope':'Do not map these adult-study arrays to the Jusczyk et al. (1977) infant-study slide as exact infant stimuli. That study requires its own reconstruction.',
            'recommended_scope_label':'Source-based reconstruction. 294/440 Hz sawtooth arrays with 0–80 ms rises in 10 ms steps; original Moog timbre and response patterns are not reproduced.',
        }
    }
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    validation={
        'passed':True,'sample_rate_hz':SR,'individual_clip_count':len(validations),
        'all_rise_time_errors_within_half_sample':all(v['envelope_peak_error_ms']<=1000/(2*SR)+1e-8 for v in validations),
        'all_published_total_durations_realized':all(v['duration_ms']==1020+v['nominal_rise_ms'] for v in validations),
        'all_nonclipped':all(v['clipped_sample_count']==0 for v in validations),
        'all_harmonics_below_nyquist':all(v['highest_harmonic_below_nyquist'] for v in validations),
        'validation_limits':'Checks document DSP timing and numerical controls. They do not establish perceptual category boundaries, instrument identity, original Moog timbre, or original experimental equivalence.',
        'individual_clips':validations,
    }
    (ROOT/'validation.json').write_text(json.dumps(validation,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'clips':len(entries),'individuals':len(validations),'validation_passed':True,'output':str(ROOT)}))


if __name__=='__main__':main()
