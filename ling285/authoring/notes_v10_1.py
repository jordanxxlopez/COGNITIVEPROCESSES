"""Build Version 10.1, Version 10 rewritten in the labeled, technical-term style.

Same neurodivergent-friendly layout as Version 10. Casual stand-ins such as
"squeeze" are replaced with the correct terms (constriction, compression), and
lists are written as "Label: full sentence". Version 10 is unchanged.

Version 10 note follows.

Version 9 is written page by page in authoring/notes-v10.1/NN.md ("## pN" then
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
from check_v9 import EMPTY_OK, LECTURES, MODULE, parse

EDITION = 'notes-v10-1'
LABEL = 'Version 10.1 · Neurodivergent-friendly notes, clear labeled wording'


def build_notes_v10_1(root, out):
    base_path = out / 'transcripts-notes-v8.json'
    payload = deepcopy(json.loads(base_path.read_text()))
    sources, coverage = {}, {}
    for collection in payload['collections'].values():
        for section in collection['sections']:
            section['teaching'] = []
    modules = set()
    for n in LECTURES:
        path = root / f'authoring/notes-v10.1/{n}.md'
        if MODULE[n] == 'module1' and not path.exists():
            continue  # Module I lectures join this edition as they are written
        modules.add(MODULE[n])
        sources[f'authoring/notes-v10.1/{n}.md'] = digest(path)
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
    payload.update(id=EDITION, label=LABEL, revision='2026-11-notes-v10-1-labeled-wording',
                   availableModules=sorted(modules),
                   origin=dict(authoringFiles=sources, basedOn='Version 8.1 full slide-by-slide notes, original slides, class transcripts Oct 6 to Nov 10, Exam 2 review and Homework 5',
                               wording='Version 10 with technical terms, short glosses and labeled lists. Layout unchanged.',
                               followingSlides=True, provenance='modern/notes-v10-1-provenance.json'),
                   guidance='Version 10 rewritten with correct terms and labeled lists, keeping the main idea first on every slide.')
    payload['metrics'] = metrics(payload['collections'])
    dump(out / f'transcripts-{EDITION}.json', payload)
    dump(out / 'notes-v10-1-provenance.json', dict(edition=EDITION, label=LABEL, authoringFiles=sources,
         coverage=coverage, emptyPagesAreTitleLogisticsOrPromptOnly=True, otherEditionsChanged=False))
    return {EDITION: LABEL}


if __name__ == '__main__':
    ROOT = Path(__file__).resolve().parents[1]
    print(build_notes_v10_1(ROOT, ROOT / 'modern'))
