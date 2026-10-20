"""Assemble an additional teaching edition without changing the released course data."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
A = ROOT / 'authoring'
LECTURES = ['lecture11', 'lecture12', 'lecture13', 'lecture14']

def read(path):
    return json.loads(path.read_text())

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def write(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

data_path = ROOT / 'data.json'
base_sha = sha(data_path)
data = read(data_path)
originals = {c['id']: c for c in data['collections']}
source_manifest = read(A / 'source-manifest.json')
presentation = read(A / 'transcripts-v2-visual-presentation.json')
runtime = {
    'id': 'v2',
    'label': 'Version 2 · Conceptual explanations',
    'revision': '2026-10-20-transcripts-v2',
    'baseDataSha256': base_sha,
    'writingReference': 'PSYC301 · Working Memory',
    'collections': {},
    'visualPresentation': presentation['visualPresentation'],
    'references': [],
}
coverage = []
for key in LECTURES:
    authored = read(A / f'teaching-v2-{key}.json')[key]
    original = originals[key]
    assert authored['title'] == original['title'], key
    assert len(authored['sections']) == len(original['sections']), key
    sections = []
    for previous, current in zip(original['sections'], authored['sections']):
        for field in ['page', 'title', 'kind']:
            assert current[field] == previous[field], (key, field, current['page'])
        assert isinstance(current['teaching'], list), previous['id']
        assert bool(current['teaching']) == bool(previous['teaching']), previous['id']
        assert current['review']['pageInspected'] and current['review']['assetsInspected'], previous['id']
        assert current['review']['method'].strip(), previous['id']
        if current['teaching']:
            assert current['concepts'], previous['id']
        for paragraph in current['teaching']:
            assert isinstance(paragraph, str) and paragraph.strip(), previous['id']
            assert 'need not' not in paragraph.lower(), previous['id']
            assert not re.search(r'</?[a-z][^>]*>', paragraph), previous['id']
        sections.append({
            'id': previous['id'], 'page': previous['page'], 'title': previous['title'],
            'kind': previous['kind'], 'teaching': current['teaching'],
        })
        prose = ' '.join(current['teaching'])
        old_prose = ' '.join(previous['teaching'])
        coverage.append({
            'id': previous['id'], 'page': previous['page'], 'lectureId': key,
            'sourceSha256': source_manifest[key]['sha256'],
            'concepts': current['concepts'], 'review': current['review'],
            'words': len(prose.split()), 'version1Words': len(old_prose.split()),
            'numericTokens': len(re.findall(r'(?<![A-Za-z])\d+(?:\.\d+)?', prose)),
            'version1NumericTokens': len(re.findall(r'(?<![A-Za-z])\d+(?:\.\d+)?', old_prose)),
        })
    runtime['collections'][key] = {'title': original['title'], 'sections': sections}

all_sections = {s['id']: s for c in originals.values() for s in c['sections']}
for sid, flag in runtime['visualPresentation'].items():
    section = all_sections[sid]
    assert sid.split('-p')[0] in LECTURES and flag['hideStaticPreview'] is True, sid
    assert any(asset['type'] == 'video' for asset in section['assets']), sid
    reviewed = next(r for r in presentation['review'] if r['id'] == sid)
    assert reviewed['blank'] and reviewed['changedPixelFraction'] == 0, sid
    flag['previewSha256'] = sha(ROOT / section['image'])

for key, title, filename, original_name, pages in [
    ('exam-review-v2', 'Exam 1 Review · uploaded copy', 'exam-review-v2.docx', 'Exam 1 Review (2).docx', 3),
    ('exam1-key', 'Exam 1 · uploaded answer key', 'exam1-key.pdf', 'Exam1 key.pdf', 5),
]:
    runtime['references'].append({
        'title': title, 'file': 'sources/' + filename,
        'kind': 'Transcript writing reference', 'originalFilename': original_name,
        'pages': pages, 'sha256': sha(ROOT / 'sources' / filename),
    })

assert sha(ROOT / 'sources/exam-review-v2.docx') == sha(ROOT / 'sources/exam-review.docx')
write(ROOT / 'transcripts-v2.json', runtime)
write(A / 'transcripts-v2-coverage.json', {
    'revision': runtime['revision'], 'baseDataSha256': base_sha,
    'lectureIds': LECTURES, 'sections': coverage,
    'sectionCount': len(coverage),
    'teachingWords': sum(p['words'] for p in coverage),
    'numericTokens': sum(p['numericTokens'] for p in coverage),
    'version1NumericTokens': sum(p['version1NumericTokens'] for p in coverage),
    'hiddenBlankPreviews': len(runtime['visualPresentation']),
    'sourceVisualsPreserved': True,
    'originalCourseDataUnchanged': sha(data_path) == base_sha,
    'retainedQuestions': len(data['questions']),
})
assert sha(data_path) == base_sha
print('Assembled Version 2:', len(coverage), 'source pages;',
      len(runtime['visualPresentation']), 'blank previews replaced by their original videos.')
