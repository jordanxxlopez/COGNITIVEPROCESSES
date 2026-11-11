"""Build Version 8.1, the full-length slide-by-slide notes for Lectures 11–18.

Every bullet of the Version 8.1 notes (Version 8 plus the cloze link and the
year-ago teaching, authoring/notes-v8.1/) is placed beside the slide it
explains, so nothing from Version 8 is shortened. Content slides that Version 8
never explained on their own get the matching page from Version 9.
"""
from collections import Counter
from copy import deepcopy
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from clear_editions import check_blocks, digest, dump, metrics
from check_v9 import EMPTY_OK, parse as parse_v9
from notes_v8 import parse as parse_v8, plain_words

EDITION = 'notes-v8-1'
LABEL = 'Version 8.1 · Full slide-by-slide notes · Lectures 11–18'

# One slide page per main bullet, in order, for every Version 8.1 section.
BULLET_SLIDES = {
    11: {1:(2,2,2), 2:(3,3,3,3), 3:(4,4,4), 4:(4,4,4,4), 5:(6,6,6,6), 6:(7,7,7),
         7:(8,8,8,8), 8:(9,9), 9:(10,10,10,10,10), 10:(11,11,11,11)},
    12: {1:(2,2,2), 2:(3,5,6), 3:(7,7), 4:(8,8,8,8,10,10), 5:(9,), 6:(11,11), 7:(12,13,12),
         8:(14,14,14), 9:(15,15), 10:(16,), 11:(18,18), 12:(19,19), 13:(20,20), 14:(21,21),
         15:(22,), 16:(23,23,23), 17:(24,24)},
    13: {1:(2,2), 2:(3,), 3:(4,4), 4:(5,6), 5:(7,7), 6:(8,8,8), 7:(9,), 8:(10,),
         9:(11,11,11,14,15), 10:(12,), 11:(13,13,13), 12:(16,17,18,18,19), 13:(20,20),
         14:(21,22,22), 15:(23,23,23), 16:(24,24), 17:(25,25,25)},
    14: {1:(2,), 2:(3,6), 3:(7,7), 4:(8,9), 5:(11,12,13,14), 6:(15,15,15), 7:(16,16),
         8:(17,17), 9:(18,19,19), 10:(20,20,20), 11:(21,22,22), 12:(23,23), 13:(24,24),
         14:(25,25,25,25,25)},
    15: {1:(2,2), 2:(3,3,3), 3:(4,4), 4:(6,6,6), 5:(7,7), 6:(8,8,8), 7:(9,),
         8:(10,10,10,10), 9:(11,11,11), 10:(12,12), 11:(13,13,13)},
    16: {1:(2,2), 2:(3,7), 3:(4,8,9), 4:(5,5), 5:(10,10,10), 6:(11,11,11,11),
         7:(12,12,12,12), 8:(13,14), 9:(15,15,15), 10:(16,16,16)},
    17: {1:(2,2,2), 2:(3,3,3), 3:(4,)*8, 4:(5,)*6, 5:(6,)*4, 6:(7,)*4, 7:(8,8)},
    18: {1:(2,)*5, 2:(3,3,3), 3:(4,4,4), 4:(5,5), 5:(6,6,6), 6:(7,7), 7:(8,)*5},
}


def build_notes_v8_1(root, out):
    payload = deepcopy(json.loads((out / 'transcripts-notes-v8.json').read_text()))
    sources, report = {}, {}
    for collection in payload['collections'].values():
        for section in collection['sections']:
            section['teaching'] = []
    for n in range(11, 19):
        path = root / f'authoring/notes-v8.1/{n}.md'
        sources[f'authoring/notes-v8.1/{n}.md'] = digest(path)
        sections = parse_v8(path)
        assert set(BULLET_SLIDES[n]) == {s['number'] for s in sections}, n
        collection = payload['collections'][f'lecture{n}']['sections']
        by_page = {s['page']: s for s in collection}
        placed = {}
        for sec in sections:
            pages = BULLET_SLIDES[n][sec['number']]
            assert len(pages) == len(sec['bullets']), (n, sec['number'], len(pages), len(sec['bullets']))
            for page, bullet in zip(pages, sec['bullets']):
                placed.setdefault(page, []).append({'text': bullet['text'], 'children': bullet['children']})
        for page in sorted(placed):
            by_page[page]['teaching'] = placed[page]
        source_words = Counter(w for sec in sections for b in sec['bullets']
                               for t in [b['text'], *b['children']] for w in plain_words(t))
        filled = []
        v9 = parse_v9(root / f'authoring/notes-v9/{n}.md')
        for section in collection:
            if not section['teaching'] and section['page'] not in EMPTY_OK[n]:
                section['teaching'] = deepcopy(v9[section['page']])
                filled.append(section['page'])
        v8_words = Counter(w for page in placed for b in placed[page]
                           for t in [b['text'], *b['children']] for w in plain_words(t))
        assert v8_words == source_words, n
        for section in collection:
            check_blocks(section['teaching'], f'{EDITION}:{section["id"]}')
        empty = [s['page'] for s in collection if not s['teaching']]
        assert set(empty) <= EMPTY_OK[n], (n, empty)
        report[f'lecture{n}'] = dict(slides=len(collection), filledFromVersion9=filled, emptyByDesign=empty)
    payload.update(id=EDITION, label=LABEL, revision='2026-11-notes-v8-1-full-slide-by-slide',
                   availableModules=['module2'],
                   origin=dict(authoringFiles=sources, version9Pages='authoring/notes-v9',
                               wording='Every Version 8.1 bullet kept word for word beside its slide; slides Version 8 never covered use the Version 9 page.',
                               followingSlides=True, provenance='modern/notes-v8-1-provenance.json'),
                   guidance='Your full Version 8 notes, plus the cloze and year-ago additions, placed slide by slide, with Version 9 filling slides Version 8 did not cover.')
    payload['metrics'] = metrics(payload['collections'])
    dump(out / f'transcripts-{EDITION}.json', payload)
    dump(out / 'notes-v8-1-provenance.json', dict(edition=EDITION, label=LABEL, authoringFiles=sources,
         bulletSlides={n: {str(k): list(v) for k, v in m.items()} for n, m in BULLET_SLIDES.items()},
         lectures=report, everyVersion81WordKept=True, otherEditionsChanged=False))
    return {EDITION: LABEL}


if __name__ == '__main__':
    ROOT = Path(__file__).resolve().parents[1]
    print(build_notes_v8_1(ROOT, ROOT / 'modern'))
