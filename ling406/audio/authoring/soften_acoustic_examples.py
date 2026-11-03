"""Create quieter playback copies without changing stimulus construction.

All selected files receive one fixed -12 dB gain. Original MP3s remain intact.
The retained level record pins historical inputs after recorded-human replacements.
Playback copies use PCM16 WAV, avoiding another lossy encoding and preserving
the exact decoded sample count. Quantization error is measured explicitly.
Requires NumPy, FFmpeg and ffprobe. No model weights or external calls are used.
"""
from pathlib import Path
import argparse
import hashlib
import json
import subprocess
import wave
import numpy as np

COURSE = Path(__file__).resolve().parents[2]
GAIN_DB = -12.0
GAIN = 10 ** (GAIN_DB / 20)
SOURCE_FILTER = {
    'source_filter_comparison', 'source_buzz', 'vowel_base',
    'vowel_raise_f1', 'vowel_raise_f2',
}
PREFIXES = ('haskins_bdg_', 'haskins-vot-', 'jusczyk_', 'cutting_rosner_1974_')


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def probe(path):
    result = subprocess.check_output([
        'ffprobe', '-v', 'error', '-select_streams', 'a:0',
        '-show_entries', 'stream=sample_rate,channels', '-of', 'json', str(path),
    ])
    stream = json.loads(result)['streams'][0]
    return int(stream['sample_rate']), int(stream['channels'])


def decode(path):
    return np.frombuffer(subprocess.check_output([
        'ffmpeg', '-v', 'error', '-i', str(path), '-map', '0:a:0',
        '-f', 'f32le', '-acodec', 'pcm_f32le', '-',
    ]), dtype='<f4').astype(np.float64)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-dir', type=Path, required=True)
    parser.add_argument('--report-file', type=Path)
    args = parser.parse_args()
    destination = args.output_dir.resolve()
    destination.mkdir(parents=True, exist_ok=True)
    manifest = json.loads((COURSE / 'audio/manifest.json').read_text())
    prior_path = Path(__file__).resolve().parent / 'listening-levels.json'
    prior = {row['id']: row for row in json.loads(prior_path.read_text())['recordings']} if prior_path.exists() else {}
    selected = {
        key: clip for key, clip in manifest['clips'].items()
        if key in SOURCE_FILTER or key.startswith(PREFIXES)
    }
    assert len(selected) == 31, 'Expected the 31 audited acoustic examples'
    records = []
    for key, clip in selected.items():
        source_file = prior.get(key, {}).get('source_file', clip.get('playbackAdjustment', {}).get('sourceFile', clip['file']))
        source = COURSE / source_file
        assert not source.stem.endswith('-soft'), 'Original source is required'
        output = destination / (source.stem + '-soft.wav')
        assert output != source, 'Playback output must not replace its original'
        before_hash = sha(source)
        rate, channels = probe(source)
        original = decode(source)
        scaled = GAIN * original
        assert np.max(np.abs(scaled)) < 1
        pcm = np.rint(scaled * 32768).astype('<i2')
        with wave.open(str(output), 'wb') as wav:
            wav.setnchannels(channels)
            wav.setsampwidth(2)
            wav.setframerate(rate)
            wav.writeframes(pcm.tobytes())
        assert probe(output) == (rate, channels)
        quieter = decode(output)
        assert original.shape == quieter.shape, (key, original.shape, quieter.shape)
        energy = np.dot(original, original)
        assert energy > 0
        fitted_gain = float(np.dot(original, quieter) / energy)
        measured_db = float(20 * np.log10(fitted_gain))
        correlation = float(np.dot(original, quieter) /
                            np.sqrt(energy * np.dot(quieter, quieter)))
        error_ratio = float(np.linalg.norm(quieter - GAIN * original) /
                            np.linalg.norm(GAIN * original))
        quantization_peak = float(np.max(np.abs(quieter - scaled)))
        assert abs(measured_db - GAIN_DB) <= .001, (key, measured_db)
        assert correlation >= .999999, (key, correlation)
        assert error_ratio <= .001, (key, error_ratio)
        assert quantization_peak <= 1 / 65536 + 1e-12
        assert sha(source) == before_hash, 'An original recording changed'
        records.append({
            'id': key, 'source_file': source_file,
            'playback_file': 'audio/clips/' + output.name,
            'source_sha256': before_hash, 'sha256': sha(output),
            'gain_db': GAIN_DB, 'linear_gain': GAIN,
            'measured_gain_db': measured_db, 'waveform_correlation': correlation,
            'relative_quantization_error_rms': error_ratio,
            'maximum_absolute_quantization_error': quantization_peak,
            'source_peak': float(np.max(np.abs(original))),
            'playback_peak': float(np.max(np.abs(quieter))),
            'sample_rate': rate, 'channels': channels,
            'decoded_samples_per_channel': len(original) // channels,
            'duration_seconds': len(original) / channels / rate,
            'sample_count_preserved': True, 'original_file_unchanged': True,
        })
    report = {
        'passed': True, 'selected_examples': len(records),
        'gain_db': GAIN_DB, 'linear_gain': GAIN,
        'method': 'One fixed gain over each complete decoded waveform, then PCM16 WAV encoding.',
        'unchanged_construction': [
            'pitch and frequency parameters', 'token order and silence lengths',
            'source filters', 'onset rise times', 'relative levels within each file',
        ],
        'processing_not_applied': ['filtering', 'compression', 'normalization', 'additional fades', 'time or pitch changes'],
        'technical_scope': 'The gain operation is linear. WAV encoding introduces only measured PCM16 rounding, with exact decoded sample counts. This does not establish a comfortable physical sound level for every device or listener.',
        'validation_tolerances': {
            'absolute_gain_error_db_max': .001, 'waveform_correlation_min': .999999,
            'relative_quantization_error_rms_max': .001,
            'absolute_quantization_error_max': 1 / 65536,
            'decoded_sample_count_must_match': True,
        },
        'recordings': records,
    }
    report_file = args.report_file or destination / 'listening-levels.json'
    report_file.parent.mkdir(parents=True, exist_ok=True)
    report_file.write_text(json.dumps(report, indent=2) + '\n')
    print(f'PASS {len(records)} quieter copies; originals, sample counts and channel layouts preserved')
    print(f'Measured gain range: {min(r["measured_gain_db"] for r in records):.4f} to '
          f'{max(r["measured_gain_db"] for r in records):.4f} dB')


if __name__ == '__main__':
    main()
