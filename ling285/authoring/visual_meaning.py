"""Add one edition that connects source visuals to their conceptual meaning."""
from copy import deepcopy
import json
from clear_editions import check_blocks, digest, dump, metrics


EDITION = 'original-c-v3'
LABEL = 'Original C · Version 3'
FILES = ['visual-meaning-archive-early.json', 'visual-meaning-archive-late.json',
         'visual-meaning-physics.json', 'visual-meaning-ai.json']


def build_visual_meaning(root, out):
    base_path = out / 'transcripts-original-c-v2.json'
    base = json.loads(base_path.read_text())
    payload = deepcopy(base)
    payload.update(id=EDITION, label=LABEL, revision='2026-11-visual-meaning-3')
    payload['origin'] = dict(baseEdition='original-c-v2', baseSha256=digest(base_path),
                             followingSlides=True, provenance='modern/visual-meaning-provenance.json')
    payload['guidance'] = ('Source-specific explanations connect the concepts to meaningful visual '
                           'symbols, values, labels, units and comparisons. Reference conditions and '
                           'changed conditions are explained where relevant, without a repeated template '
                           'or worked calculation exercises.')
    authored, authoring_hashes, reviews = {}, {}, {}
    for filename in FILES:
        path = root / 'authoring' / filename
        source = json.loads(path.read_text())
        assert not authored.keys() & source['collections'].keys(), filename
        authored.update(source['collections'])
        authoring_hashes['authoring/' + filename] = digest(path)
        reviews[filename] = source.get('review', {})
    assert set(authored) == set(base['collections']), 'Every collection must be reviewed.'
    audit = []
    for cid, collection in payload['collections'].items():
        item = authored[cid]
        expected_pages = [s['page'] for s in collection['sections']]
        assert item['reviewedPages'] == expected_pages, cid
        patches = {p['page']: p for p in item['pages']}
        assert len(patches) == len(item['pages']) and set(patches) <= set(expected_pages), cid
        for section in collection['sections']:
            page = section['page']
            record = dict(collection=cid, sectionId=section['id'], page=page, revised=page in patches)
            if page in patches:
                patch = patches[page]
                check_blocks(patch['teaching'], section['id'])
                assert section['teaching'] and patch['teaching'], 'Do not fill noninstructional pages.'
                assert section['teaching'] != patch['teaching'], section['id']
                assert patch['explained'] and patch['evidence']['slides'], section['id']
                assert all(p in expected_pages for p in patch['evidence']['slides']), section['id']
                assert all(1 <= a <= b <= 5655 for a, b in patch['evidence'].get('transcriptLines', [])), section['id']
                section['teaching'] = deepcopy(patch['teaching'])
                record.update(explained=patch['explained'], evidence=patch['evidence'])
            audit.append(record)
    payload['metrics'] = metrics(payload['collections'])
    dump(out / f'transcripts-{EDITION}.json', payload)
    report = dict(edition=EDITION, baseFile='modern/transcripts-original-c-v2.json',
                  baseSha256=digest(base_path), authoringFiles=authoring_hashes,
                  reviewedPages=len(audit), revisedPages=sum(p['revised'] for p in audit),
                  dataSha256=digest(root / 'data.json'),
                  inventorySha256=digest(root / 'authoring/page-inventory.json'),
                  transcriptSha256='5f89ff905e718e5f95d70ab3d4082dfa2f972ba6d702d0bb362455d37f89c658',
                  sourceReviews=reviews, pages=audit,
                  retainedContentLock='modern/visual-meaning-preserved.json',
                  rules=dict(sourceSpecific=True, repeatedExplanationTemplate=False,
                             workedCalculationsAdded=False, unchangedPagesInheritBaseVerbatim=True))
    dump(out / 'visual-meaning-provenance.json', report)
    return {EDITION: LABEL}
