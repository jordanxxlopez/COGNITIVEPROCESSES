"""Build additional teaching choices without rewriting any retained edition.

The two rewrites are individually authored by source page.  The PDF choice is a
separate transcription of the user's own notes, not another generated rewrite.
"""
from collections import Counter
from copy import deepcopy
from hashlib import sha256
import json
from pathlib import Path
import statistics


LABELS = {
    'original-c-v2': 'Original C · Version 2',
    'd-v2': 'D · Version 2',
    'notes-v7': 'Version 7 · Your PDF notes · Lectures 11–18',
}
AUTHORING_FILES = [
    'clear-v2-archive-early.json', 'clear-v2-archive-late.json',
    'clear-v2-physics.json', 'clear-v2-ai.json',
]


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def dump(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def metrics(collections):
    sections = [s for c in collections.values() for s in c['sections']]
    word_counts = [len(' '.join(t for b in s['teaching'] for t in
                   [b['text'], *b['children']]).replace('**', '').split())
                   for s in sections if s['teaching']]
    return dict(sourcePages=len(sections), instructionalPages=len(word_counts),
                words=sum(word_counts), medianWords=statistics.median(word_counts),
                mainBulletCounts=dict(sorted(Counter(len(s['teaching']) for s in
                                      sections if s['teaching']).items())))


def check_blocks(blocks, location):
    assert isinstance(blocks, list), location
    for block in blocks:
        assert set(block) == {'text', 'children'}, (location, block)
        assert isinstance(block['text'], str) and block['text'].strip(), location
        assert isinstance(block['children'], list), location
        assert all(isinstance(t, str) and t.strip() for t in block['children']), location


def build_clear_editions(root, out):
    authored = {}
    authoring_hashes = {}
    for filename in AUTHORING_FILES:
        path = root / 'authoring' / filename
        item = json.loads(path.read_text())
        assert not authored.keys() & item['collections'].keys(), filename
        authored.update(item['collections'])
        authoring_hashes['authoring/' + filename] = digest(path)

    base_c = json.loads((out / 'transcripts-original-c.json').read_text())
    assert set(authored) == set(base_c['collections']), 'Every original collection needs page-specific teaching.'
    records = []
    for edition, source_id, key in [('original-c-v2', 'original-c', 'c'), ('d-v2', 'd', 'd')]:
        base_path = out / f'transcripts-{source_id}.json'
        payload = deepcopy(json.loads(base_path.read_text()))
        payload.update(id=edition, label=LABELS[edition], revision='2026-11-clear-teaching-2')
        payload.pop('additions', None)
        payload.pop('baseMetrics', None)
        payload['writingReference'] = 'PSYC301 Versions 20–22 sentence style; LING285 course sources only.'
        payload['guidance'] = ('Individually rewritten explanations in complete sentences, with natural bullets '
                               'and sub-bullets. Technical terms retain their names and are explained in plain '
                               'language. The source determines the order and amount of explanation.')
        payload['origin'] = dict(baseEdition=source_id, baseFile=f'modern/transcripts-{source_id}.json',
                                 baseSha256=digest(base_path), teachingRewritten=True,
                                 followingSlides=True, provenance='modern/clear-editions-provenance.json')
        for cid, collection in payload['collections'].items():
            pages = authored[cid]['pages']
            assert [p['page'] for p in pages] == [s['page'] for s in collection['sections']], cid
            for section, page in zip(collection['sections'], pages):
                location = f'{edition}:{section["id"]}'
                check_blocks(page[key], location)
                section['teaching'] = deepcopy(page[key])
                if edition == 'original-c-v2':
                    evidence = page['evidence']
                    assert evidence['slides'] and all(1 <= p <= len(pages) for p in evidence['slides']), location
                    assert all(1 <= a <= b <= 5655 for a, b in evidence.get('transcriptLines', [])), location
                    records.append(dict(collection=cid, sectionId=section['id'], page=section['page'],
                                        evidence=evidence))
        payload['metrics'] = metrics(payload['collections'])
        dump(out / f'transcripts-{edition}.json', payload)

    notes_file = root / 'authoring/notes-v7.json'
    notes = json.loads(notes_file.read_text())
    current = {cid for cid in base_c['collections'] if int(cid[7:9]) >= 11}
    assert set(notes['collections']) == current, 'PDF notes must map all eight supplied lectures.'
    payload = dict(id='notes-v7', label=LABELS['notes-v7'], revision='2026-11-user-pdf-notes-7',
                   collections=deepcopy(base_c['collections']),
                   visualPresentation=deepcopy(base_c['visualPresentation']),
                   availableModules=['module2'],
                   origin=dict(authoringFile='authoring/notes-v7.json', sha256=digest(notes_file),
                               wording='User-authored PDF text retained verbatim, with bold emphasis.',
                               sourceFiles=notes.get('sourceFiles', []), followingSlides=True),
                   guidance='Your Version 7 notes, matched to the original slides for Lectures 11–18.')
    for cid, collection in payload['collections'].items():
        for section in collection['sections']:
            section['teaching'] = []
        if cid not in current:
            continue  # No invented PDF notes for Module I; this choice is scoped to Module II.
        pages = notes['collections'][cid]['pages']
        assert [p['page'] for p in pages] == [s['page'] for s in collection['sections']], cid
        for section, page in zip(collection['sections'], pages):
            check_blocks(page['teaching'], f'notes-v7:{section["id"]}')
            section['teaching'] = deepcopy(page['teaching'])
    payload['metrics'] = metrics(payload['collections'])
    dump(out / 'transcripts-notes-v7.json', payload)
    report = dict(revision='2026-11-clear-teaching-2', authoringFiles=authoring_hashes,
                  retainedEditions=['professor', 'b', 'c', 'follow', 'v20', 'original-c', 'd'],
                  sources=dict(slides='data.json', dataSha256=digest(root / 'data.json'),
                               inventory='authoring/page-inventory.json',
                               inventorySha256=digest(root / 'authoring/page-inventory.json'),
                               transcript=dict(url='https://docs.google.com/document/d/1Sn0smbBkTzC9E6e2dOHQA5PYTUHFi3kCacjJ8ZegEEE/edit',
                                               sha256='5f89ff905e718e5f95d70ab3d4082dfa2f972ba6d702d0bb362455d37f89c658',
                                               lines=5655, coverage='Lectures 11–18; Module I uses its supplied slides and source notes.')),
                  rules=dict(explanationOrder='Determined by the source page, without a repeated template.',
                             bulletCount='Varies with the material; no quota.',
                             analogiesAdded=False, existingWritingChanged=False),
                  pages=records, notesAuthoringFile='authoring/notes-v7.json', notesSha256=digest(notes_file))
    dump(out / 'clear-editions-provenance.json', report)
    return LABELS
