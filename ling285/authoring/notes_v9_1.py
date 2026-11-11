"""Build Version 9.1, Version 9 expanded to the full length of Version 8.

Version 9 is written page by page in authoring/notes-v9.1/NN.md ("## pN" then
bullets and sub-bullets). It follows the Version 8 notes, the original slides,
the class transcripts and the review material, rewritten so each slide has its
own explanation. Title, logistics and prompt-only pages stay empty.
"""
from copy import deepcopy
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from clear_editions import check_blocks, digest, dump, metrics
from check_v9 import EMPTY_OK, parse

EDITION = 'notes-v9-1'
LABEL = 'Version 9.1 · Full slide-by-slide notes · Lectures 11–18'


def build_notes_v9_1(root, out):
    base_path = out / 'transcripts-notes-v8.json'
    payload = deepcopy(json.loads(base_path.read_text()))
    sources, coverage = {}, {}
    for collection in payload['collections'].values():
        for section in collection['sections']:
            section['teaching'] = []
    for n in range(11, 19):
        path = root / f'authoring/notes-v9.1/{n}.md'
        sources[f'authoring/notes-v9.1/{n}.md'] = digest(path)
        pages = parse(path)
        sections = payload['collections'][f'lecture{n}']['sections']
        by_page = {s['page']: s for s in sections}
        assert set(pages) <= set(by_page), (n, set(pages) - set(by_page))
        for page, blocks in pages.items():
            check_blocks(blocks, f'{EDITION}:lecture{n}-p{page}')
            by_page[page]['teaching'] = blocks
        empty = [s['page'] for s in sections if not s['teaching']]
        assert set(empty) <= EMPTY_OK[n], (n, empty)
        coverage[f'lecture{n}'] = dict(slides=len(sections), withNotes=len(pages), emptyByDesign=empty)
    payload.update(id=EDITION, label=LABEL, revision='2026-11-notes-v9-1-full-slide-by-slide',
                   availableModules=['module2'],
                   origin=dict(authoringFiles=sources, basedOn='Version 8 notes, original slides, class transcripts Oct 6 to Nov 10, Exam 2 review and Homework 5',
                               wording='Version 9 rewritten slide by slide and expanded back to the full depth of Version 8.',
                               followingSlides=True, provenance='modern/notes-v9-1-provenance.json'),
                   guidance='Version 9 expanded to the full length of Version 8, so every slide in Lectures 11–18 has a complete explanation.')
    payload['metrics'] = metrics(payload['collections'])
    dump(out / f'transcripts-{EDITION}.json', payload)
    dump(out / 'notes-v9-1-provenance.json', dict(edition=EDITION, label=LABEL, authoringFiles=sources,
         coverage=coverage, emptyPagesAreTitleLogisticsOrPromptOnly=True, otherEditionsChanged=False))
    return {EDITION: LABEL}


if __name__ == '__main__':
    ROOT = Path(__file__).resolve().parents[1]
    print(build_notes_v9_1(ROOT, ROOT / 'modern'))
