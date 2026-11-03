"""Rebuild quiet human CV references from the retained ACIP recordings.

These natural tokens are pronunciation references, not an equal-F2 or VOT
continuum. No phonation, aspiration, pitch contour or timing is synthesized.
Requires NumPy and the Python standard library only.
"""
from pathlib import Path
import argparse
import hashlib
import json
import wave

import numpy as np


HERE = Path(__file__).resolve().parent
RATE = 16000
GAP_SAMPLES = round(.650 * RATE)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def save(path, samples):
    with wave.open(str(path), 'wb') as audio:
        audio.setnchannels(1)
        audio.setsampwidth(2)
        audio.setframerate(RATE)
        audio.writeframes(np.asarray(samples, dtype='<i2').tobytes())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-dir', type=Path, required=True)
    args = parser.parse_args()
    output = args.output_dir.resolve()
    if output == HERE or HERE in output.parents:
        parser.error('Choose a fresh rebuild destination outside this source folder.')
    output.mkdir(parents=True, exist_ok=True)
    if any(output.iterdir()):
        parser.error('The rebuild destination must be empty.')

    sources = json.loads((HERE / 'source-manifest.json').read_text())
    manifest = json.loads((HERE / 'manifest.json').read_text())
    assert len(sources) == 4 and len(manifest) == 6
    raw = {}
    for source in sources:
        path = HERE / source['file']
        assert sha(path) == source['sha256'], path
        with wave.open(str(path), 'rb') as audio:
            assert audio.getnchannels() == 1
            assert audio.getsampwidth() == 2
            assert audio.getframerate() == RATE
            samples = np.frombuffer(audio.readframes(audio.getnframes()), dtype='<i2')
        raw[source['phoneme'] + 'a'] = samples.astype(np.float64) / 32768

    # Shared gain preserves relative levels across all four full recordings.
    calculated_gain = min(
        .045 / max(float(np.sqrt(np.mean(x * x))) for x in raw.values()),
        .18 / max(float(np.max(np.abs(x))) for x in raw.values()),
    )
    gain = float(manifest[0]['gain'])
    assert abs(calculated_gain - gain) < 1e-12
    units = {name: np.rint(x * gain * 32767).astype('<i2')
             for name, x in raw.items()}

    checks = []
    for row in manifest:
        filename = row['file']
        assert Path(filename).name == filename
        if row.get('sequence'):
            assert float(row['common_gain']) == gain
            pieces = []
            for index, syllable in enumerate(row['sequence']):
                if index:
                    pieces.append(np.zeros(GAP_SAMPLES, dtype='<i2'))
                pieces.append(units[syllable])
            samples = np.concatenate(pieces)
        else:
            assert float(row['gain']) == gain
            samples = units[row['source']['phoneme'] + 'a']
        assert np.max(np.abs(samples.astype(np.int32))) < 32767
        destination = output / filename
        save(destination, samples)
        assert sha(destination) == row['sha256'], filename
        checks.append({'id': row['id'], 'file': filename,
                       'sha256': sha(destination), 'matches_deployed_hash': True,
                       'samples': len(samples), 'duration_seconds': len(samples) / RATE})

    report = {'passed': True, 'files': len(checks), 'common_gain': gain,
              'sample_rate': RATE, 'between_token_silence_seconds': .650,
              'original_source_hashes_verified': True,
              'all_six_deployed_hashes_reproduced': True,
              'scope': 'Technical reproduction, not a calibrated phonetic continuum or independent listener validation.',
              'recordings': checks}
    (output / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    (output / 'validation.json').write_text(json.dumps(report, indent=2) + '\n')
    print('PASS six human CV files exactly match the recorded deployment hashes')


if __name__ == '__main__':
    main()
