"""Build Version 10, the neurodivergent-friendly slide-by-slide notes for Lectures 11–18.

Version 9 is written page by page in authoring/notes-v10/NN.md ("## pN" then
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

EDITION = 'notes-v10'
LABEL = 'Version 10 · Neurodivergent-friendly notes'


def build_notes_v10(root, out):
    base_path = out / 'transcripts-notes-v8.json'
    payload = deepcopy(json.loads(base_path.read_text()))
    sources, coverage = {}, {}
    for collection in payload['collections'].values():
        for section in collection['sections']:
            section['teaching'] = []
    modules = set()
    for n in LECTURES:
        path = root / f'authoring/notes-v10/{n}.md'
        if MODULE[n] == 'module1' and not path.exists():
            continue  # Module I lectures join this edition as they are written
        modules.add(MODULE[n])
        sources[f'authoring/notes-v10/{n}.md'] = digest(path)
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
    payload.update(id=EDITION, label=LABEL, revision='2026-11-notes-v10-neurodivergent',
                   availableModules=sorted(modules),
                   origin=dict(authoringFiles=sources, basedOn='Version 8.1 full slide-by-slide notes, original slides, class transcripts Oct 6 to Nov 10, Exam 2 review and Homework 5',
                               wording='Rewritten for ADHD and autistic readers. Main idea first, one idea per sentence, literal wording, steps in order, terms defined on each slide.',
                               followingSlides=True, provenance='modern/notes-v10-provenance.json'),
                   guidance='Version 8.1 rewritten to be easier to follow for ADHD and autistic readers, with the main idea first on every slide.')
    payload['metrics'] = metrics(payload['collections'])
    dump(out / f'transcripts-{EDITION}.json', payload)
    dump(out / 'notes-v10-provenance.json', dict(edition=EDITION, label=LABEL, authoringFiles=sources,
         coverage=coverage, emptyPagesAreTitleLogisticsOrPromptOnly=True, otherEditionsChanged=False))
    return {EDITION: LABEL}


if __name__ == '__main__':
    ROOT = Path(__file__).resolve().parents[1]
    print(build_notes_v10(ROOT, ROOT / 'modern'))
