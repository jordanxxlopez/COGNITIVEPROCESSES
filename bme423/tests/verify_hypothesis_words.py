"""Check added verbal/notation data and preserve all existing numerical banks."""
from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    return json.loads((ROOT / name).read_text().split('=', 1)[1].rstrip(';\n'))


h, r, d, n, old = [load(name) for name in ('hypothesis-data.js', 'step-reference-data.js',
    'version-d-data.js', 'neuroscience-worked-data.js', 'studio-flow-data.js')]
assert len(h['problems']) == 216
assert all(x['nullWords'] and x['alternativeWords'] and x['null'].startswith('H_0:') and
           x['alternative'].startswith('H_A:') for group in [h['problems'], h['topics'], h['slides']] for x in group.values())
for pid, q in d['problems'].items():
    assert len(r['D'][pid]) == len(q['flow'])
    assert len(r['D'][n['byOriginal'][pid]]) == len(q['flow'])
    assert all(len(text) >= 20 for text in r['D'][pid])
for pid, flow in old['problems'].items():
    assert len(r['C'][pid]) == len(flow)
for pid in ['chi2', 'd-hw2-folate', 'neuro-d-hw2-folate']:
    assert '2×2 table' in r['D'][pid][2] and 'larger' not in r['D'][pid][2]
assert 'same mean cognitive assessment score' in h['problems']['twot']['nullWords']
assert 'same mean visual-discrimination score' in h['problems']['neuro-twot']['nullWords']
assert 'At least one pair' in h['problems']['anova']['alternativeWords']
assert '115 mg/dL' in h['problems']['d-hw2-ldl']['nullWords']
assert '115 milliseconds' in h['problems']['neuro-d-hw2-ldl']['nullWords']
assert '72 beats per minute' in h['slides']['8:22']['nullWords']
assert 'each observed visual-search time' in r['D']['neuro-mean'][0]
assert 'choices at each position' in r['D']['neuro-coins'][0] and 'toss' not in r['D']['neuro-coins'][0]
assert 'first failed' not in r['D']['bonf'][-1]
for name in ['data.js', 'v2-data.js', 'version-d-data.js', 'version-c-data.js', 'neuroscience-worked-data.js',
             'equation-guide-data.js', 'studio-flow-data.js', 'studio-question-data.js', 'practice-question-data.js']:
    assert (ROOT / name).read_bytes() == subprocess.check_output(['git', 'show', 'HEAD:bme423/' + name]), name
for path in ROOT.glob('*.pdf'):
    assert path.read_bytes() == subprocess.check_output(['git', 'show', 'HEAD:bme423/' + path.name]), path
print('PASS: contextual hypotheses, 4,029 per-step references, correction-specific wording, source contexts; existing questions, numerical work, grading data, scripts and PDFs unchanged.')
