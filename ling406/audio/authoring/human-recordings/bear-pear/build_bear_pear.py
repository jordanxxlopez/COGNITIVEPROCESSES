"""Rebuild the nine browser candidates from seven retained human recordings.

NumPy, FFmpeg and ffprobe are required. No downloads or neural models are used.
The retained manifest supplies historical source/output hashes and attribution.
New output metadata uses logical relative source paths rather than scratch paths.
"""
from pathlib import Path
import argparse
import copy
import hashlib
import json
import shutil
import subprocess
import wave

import numpy as np


ROOT = Path(__file__).resolve().parent
SAMPLE_RATE = 44100
GAIN_DB = -6
GAIN = 10 ** (GAIN_DB / 20)
GAP_SAMPLES = round(.65 * SAMPLE_RATE)
SETTINGS_MS = [5, 10, 15, 25, 35, 40, 45]


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-dir', type=Path, required=True)
    args = parser.parse_args()
    output = args.output_dir.resolve()
    if output == ROOT or ROOT in output.parents:
        parser.error('Choose a separate rebuild directory outside this source package.')
    (output / 'clips').mkdir(parents=True, exist_ok=True)
    (output / 'sources').mkdir(exist_ok=True)
    reference = json.loads((ROOT / 'manifest.json').read_text())
    assert len(reference) == 9
    templates = {row['id']: row for row in reference}
    units = {}
    for ms in SETTINGS_MS:
        row = templates[f'murphy2025-bear-pear-vot{ms:03d}']
        source = ROOT / 'sources' / row['source']['name']
        assert sha(source) == row['source']['sha256'], source
        shutil.copyfile(source, output / 'sources' / source.name)
        info = json.loads(subprocess.check_output([
            'ffprobe', '-v', 'error', '-select_streams', 'a:0',
            '-show_entries', 'stream=sample_rate,channels', '-of', 'json', str(source),
        ]))['streams'][0]
        assert int(info['sample_rate']) == SAMPLE_RATE and info['channels'] == 1
        # Identical decode, fixed family gain and rounding as the original package.
        samples = np.frombuffer(subprocess.check_output([
            'ffmpeg', '-v', 'error', '-i', str(source), '-f', 'f32le', '-',
        ]), dtype='<f4').astype(float)
        units[ms] = samples * GAIN

    results = []
    checks = []
    for original in reference:
        row = copy.deepcopy(original)
        order = row.get('sequence_vot_ms')
        if order:
            samples = np.concatenate([
                piece for index, ms in enumerate(order)
                for piece in ([units[ms], np.zeros(GAP_SAMPLES)]
                              if index + 1 < len(order) else [units[ms]])
            ])
        else:
            ms = int(row['id'].rsplit('vot', 1)[1])
            samples = units[ms]
            row['source']['file'] = 'sources/' + row['source']['name']
        pcm = np.rint(samples * 32767).astype('<i2')
        destination = output / row['file']
        with wave.open(str(destination), 'wb') as stream:
            stream.setnchannels(1)
            stream.setsampwidth(2)
            stream.setframerate(SAMPLE_RATE)
            stream.writeframes(pcm.tobytes())
        subprocess.run([
            'ffmpeg', '-v', 'error', '-i', str(destination), '-f', 'null', '-',
        ], check=True, capture_output=True)
        actual_hash = sha(destination)
        assert actual_hash == original['sha256'], row['id']
        row.update(sha256=actual_hash, duration_seconds=len(samples) / SAMPLE_RATE,
                   full_decode=True)
        results.append(row)
        checks.append({'id': row['id'], 'sha256': actual_hash,
                       'matches_retained_output': True, 'full_decode': True})

    (output / 'manifest.json').write_text(
        json.dumps(results, ensure_ascii=False, indent=2) + '\n')
    report = {
        'passed': True, 'retained_source_files_verified': len(units),
        'rebuilt_outputs_matching_historical_hashes': len(checks),
        'common_gain_db': GAIN_DB, 'sample_rate': SAMPLE_RATE,
        'sequence_gap_seconds': .65, 'nominal_vot_settings_ms': SETTINGS_MS,
        'scope': 'Deterministic waveform packaging, not independent listener validation.',
        'outputs': checks,
    }
    (output / 'rebuild-validation.json').write_text(json.dumps(report, indent=2) + '\n')
    print('PASS seven retained human sources and all nine historical output hashes')


if __name__ == '__main__':
    main()
