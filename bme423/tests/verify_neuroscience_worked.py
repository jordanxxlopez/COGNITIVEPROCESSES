"""Verify the additive bank retains all validated mathematical content."""
from pathlib import Path
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    return json.loads((ROOT / name).read_text().split('=', 1)[1].rstrip(';\n'))


def numbers(expressions):
    # Words and units change; all numerical work must stay identical.
    text = ' '.join(expressions)
    text = re.sub(r'\\(?:text|mathrm)\{[^{}]*\}', '', text)
    return re.findall(r'(?<![A-Za-z])(?:\d*\.\d+|\d+)(?:e[+-]?\d+)?', text)


d, v, n = load('data.js'), load('version-d-data.js'), load('neuroscience-worked-data.js')
originals = {p['id']: p for p in d['problems'] + v['extraCases']}
assert len(n['problems']) == len(n['questions']) == len(n['byOriginal']) == 236
assert set(n['byOriginal']) == set(originals)
assert set(n['topics']) == {p['topic'] for p in originals.values()}
total_steps = 0
for p in n['problems']:
    q = n['questions'][p['id']]
    old = originals[p['originalId']]
    frame = v['problems'][old['id']]
    assert p['id'] not in originals and n['byOriginal'][old['id']] == p['id']
    assert p['topic'] == old['topic'] == q['topic']
    assert p['answer'] == old['answer'] == q['primaryAnswer']
    assert p['tolerance'] == old['tolerance']
    assert len(q['paragraphs']) == 2 and len(q['parts']) >= 2
    assert q['context'] != frame['context'] and q['synthetic']
    assert len(q['flow']) == len(frame['flow'])
    assert numbers(q['math']) == numbers(frame['math']), p['id']
    for new_step, old_step in zip(q['flow'], frame['flow']):
        assert numbers(new_step['math']) == numbers(old_step['math']), (p['id'], new_step['label'])
        assert new_step.get('values') == old_step.get('values'), p['id']
        assert new_step.get('figure') == old_step.get('figure'), p['id']
        assert new_step['math'] or new_step['text'] or new_step.get('figure')
    # No residual disease/drug labels from the medical counterpart.
    visible = json.dumps([q['paragraphs'], q['parts'], q['math'], q['flow']], ensure_ascii=False)
    assert not re.search(r'LDL|mg/dL|neutrophil|filgrastim|tumor|folate|dioxin|offspring|father-only|mother-only|ZIP code|specimen', visible, re.I), p['id']
    total_steps += len(q['flow'])
assert total_steps == 1476
for name in ['data.js', 'v2-data.js', 'version-d-data.js', 'version-c-data.js',
             'practice-question-data.js', 'studio-flow-data.js', 'studio-question-data.js']:
    assert (ROOT / name).read_bytes() == subprocess.check_output(['git', 'show', 'HEAD:bme423/' + name]), name
for path in ROOT.glob('*.pdf'):
    assert path.read_bytes() == subprocess.check_output(['git', 'show', 'HEAD:bme423/' + path.name]), path
print(f'PASS: 236 scenarios, 31 topics, {total_steps} numerically unchanged steps; independent IDs; no residual medical-story labels; all existing banks and PDFs preserved.')
