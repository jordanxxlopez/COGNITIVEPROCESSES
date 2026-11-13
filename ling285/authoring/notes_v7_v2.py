"""Build a separate, slide-complete revision of the user's Version 7 notes."""
from copy import deepcopy
import json
from clear_editions import check_blocks, digest, dump, metrics
from module1_notes import MODULE1, available, parse_pages, A as AUTHORING


EDITION = 'notes-v7-v2'
LABEL = 'Version 7 · Version 2'
FILES = ['notes-v7-v2-l11-12.json', 'notes-v7-v2-l13-14.json',
         'notes-v7-v2-l15-16.json', 'notes-v7-v2-l17-18.json']


def build_notes_v7_v2(root, out):
    base_path = out / 'transcripts-notes-v7.json'
    base = json.loads(base_path.read_text())
    current = {f'lecture{n}' for n in range(11, 19)}
    authored, hashes, reviews = {}, {}, {}
    for filename in FILES:
        path = root / 'authoring' / filename
        source = json.loads(path.read_text())
        assert not authored.keys() & source['collections'].keys(), filename
        authored.update(source['collections'])
        hashes['authoring/' + filename] = digest(path)
        reviews[filename] = source.get('review', {})
    assert set(authored) == current, 'Review all eight supplied lecture collections.'
    # Module I: adapted notes written per lecture in notes-v7-v2-module1/NN.md with coverage lines.
    module1_pages = {}
    for key in MODULE1:
        if not available(key, 'notes-v7-v2-module1'):
            continue
        path = AUTHORING / 'notes-v7-v2-module1' / f'{key}.md'
        hashes['authoring/notes-v7-v2-module1/' + path.name] = digest(path)
        teaching, coverage = parse_pages(path)
        v7pages = {p['page']: p for p in base['collections'][f'lecture{key}']['sections'] and
                   json.loads((AUTHORING / 'notes-v7-module1.json').read_text())['collections'].get(f'lecture{key}', {'pages': []})['pages']}
        pages = []
        for section in base['collections'][f'lecture{key}']['sections']:
            page = section['page']
            pdf_pages = v7pages[page]['evidence']['pdfPages'] if page in v7pages else []
            pages.append(dict(page=page, teaching=teaching.get(page, []), coverage=coverage.get(page, []),
                              evidence=dict(slides=[page], transcriptLines=[], pdfPages=pdf_pages)))
        module1_pages[f'lecture{key}'] = {'pages': pages}
    authored.update(module1_pages)
    payload = deepcopy(base)
    payload.update(id=EDITION, label=LABEL, revision='2026-11-pdf-notes-v7-v2')
    payload['availableModules'] = ['module1', 'module2'] if module1_pages else ['module2']
    payload['origin'] = dict(baseEdition='notes-v7', baseFile='modern/transcripts-notes-v7.json',
                            baseSha256=digest(base_path), sourceFiles=deepcopy(base['origin']['sourceFiles']),
                            wording='Adapted PDF explanations, with matching-page slide and spoken-source coverage.',
                            followingSlides=True, provenance='modern/notes-v7-v2-provenance.json')
    payload['guidance'] = ('Plain explanations based on your PDF notes, the original slides and '
                           'relevant spoken teaching. Repeated slides retain their relevant explanations. '
                           'Technical terms are kept and explained in natural bullets and sub-bullets.')
    audit = []
    for cid, collection in payload['collections'].items():
        if cid not in current and cid not in module1_pages:
            assert all(not s['teaching'] for s in collection['sections'])
            continue
        pages = authored[cid]['pages']
        assert [p['page'] for p in pages] == [s['page'] for s in collection['sections']], cid
        for section, page in zip(collection['sections'], pages):
            check_blocks(page['teaching'], section['id'])
            coverage = page['coverage']
            assert isinstance(coverage, list), section['id']
            assert bool(coverage) == bool(page['teaching']), section['id']
            for idea in coverage:
                assert idea['idea'].strip() and idea['source'] in ['slide', 'spoken', 'pdf'], section['id']
                assert idea['blocks'] and all(isinstance(i, int) and 0 <= i < len(page['teaching'])
                                              for i in idea['blocks']), (section['id'], idea)
            evidence = page['evidence']
            assert evidence['slides'] and all(1 <= p <= len(pages) for p in evidence['slides']), section['id']
            assert all(1 <= a <= b <= 5655 for a, b in evidence.get('transcriptLines', [])), section['id']
            assert all(1 <= p <= (65 if cid in current else 18) for p in evidence.get('pdfPages', [])), section['id']
            section['teaching'] = deepcopy(page['teaching'])
            audit.append(dict(collection=cid, sectionId=section['id'], page=section['page'],
                              coverage=coverage, evidence=evidence))
    payload['metrics'] = metrics(payload['collections'])
    dump(out / f'transcripts-{EDITION}.json', payload)
    report = dict(edition=EDITION, baseFile='modern/transcripts-notes-v7.json',
                  baseSha256=digest(base_path), authoringFiles=hashes, sourceReviews=reviews,
                  sourcePages=len(audit), instructionalPages=sum(bool(p['coverage']) for p in audit),
                  ideas=sum(len(p['coverage']) for p in audit), pages=audit,
                  dataSha256=digest(root / 'data.json'),
                  transcript=dict(sha256='5f89ff905e718e5f95d70ab3d4082dfa2f972ba6d702d0bb362455d37f89c658',
                                  lines=5655, url='https://docs.google.com/document/d/1Sn0smbBkTzC9E6e2dOHQA5PYTUHFi3kCacjJ8ZegEEE/edit'),
                  originalNotesUnchanged=True, matchingPageRepetitionAllowed=True,
                  coverageMethod='Source ideas linked to teaching blocks and independently reviewed; page presence alone is insufficient.',
                  retainedContentLock='modern/notes-v7-v2-preserved.json')
    dump(out / 'notes-v7-v2-provenance.json', report)
    return {EDITION: LABEL}
