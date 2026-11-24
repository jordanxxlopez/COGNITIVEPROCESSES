"""Build psyc301-module3-data.js (Module III) from the authored collection files.

Module III is a separate layer: module2-data.js, the Module II version packs and the Module I data in
index.html are not rewritten. To add the next lecture, write a content file like ltm_content.py and add
it to COLLECTIONS with the next source id and collection number.
"""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import ltm_content, ltm_aids, ltm_testbank, ltm_question_versions, ltm_versions
import enc_content, enc_aids, enc_testbank, enc_question_versions, enc_versions

ROOT = Path(__file__).resolve().parents[3]
COLLECTIONS = [dict(id=15, number='16', title='Long-Term Memory: Structure', file='Chapter-6-psyc301.pdf',
                    sourcePdf='sources/CogPsych_Ch06_LTM_F26.pdf', media='media/long-term-memory',
                    content=ltm_content, versions=ltm_versions, aids=ltm_aids, testbank=ltm_testbank, questionVersions=ltm_question_versions,
                    testbankSource='testbank-source-ch06.json', chapter=6, firstQuestion=9001, firstQa=9000),
               dict(id=16, number='17', title='Long-Term Memory: Encoding, Retrieval, and Consolidation', file='Chapter-7-psyc301.pdf',
                    sourcePdf='sources/CogPsych_Ch07_LTM_Encoding_F26.pdf', media='media/ltm-encoding',
                    content=enc_content, versions=enc_versions, aids=enc_aids, testbank=enc_testbank, questionVersions=enc_question_versions,
                    testbankSource='testbank-source-ch07.json', chapter=7, firstQuestion=9101, firstQa=9100)]
BANNED = ['coworkers', 'need not', 'the lecture says', 'the lecture gives', 'the lecture describes', 'the slide', 'pictured', 'thus', 'hence']

VERSIONS = {'A': 'Original', '6': 'Version 6 · natural teaching', '10': 'Version 10 · teaching notes', '12': 'Version 12 · detailed teaching notes',
            '14': 'Version 14 · balanced teaching notes', '16': 'Version 16 · natural teaching notes', '18': 'Version 18 · teaching scripts', '20': 'Version 20 · natural teaching transcript', '21': 'Version 21 · natural teaching notes with following slides',
            '22': 'Version 22 · natural teaching notes with researchers and years'}
# Home page headline for Module III. Rewrite it when a lecture is added so it covers every lecture.
HERO = dict(title=['Long-term memory.', 'Stored, encoded, retrieved, consolidated.'],
            text='Module III covers the structure of long-term memory, and how memories are encoded, retrieved, consolidated and reconsolidated. Original slides sit beside teaching explanations, personal notes, and practice. More lectures are added here as they arrive.')
bank = dict(hero=HERO, revision='module3-12', modules=[], lectureNumbers={}, lectureQuizSize=50, practiceTestSize=0,
            collections=[], questions=[], topics=[], coreReview=[], experiments=[], versions=VERSIONS,
            scripts={k: {} for k in ('6', '10', '12', '14', '16', '18', '20', '21', '22')}, questionVersions={}, likely=[])
aids = dict(ask=[], cards=[], cardsV4=[], contrasts=[], contrastsV2=[], contrastsV3=[], contrastsV21=[], explainers=[], topicsV4=[],
            qaBank=[], qaV3=[], qaV4=[], qaV5=[], testbank=dict(modules=[], questions=[]))


def stars(html):
    return re.sub(r'</?strong>', '**', html)


def as_points(paragraphs):
    """Version 20 keeps the slide wording in bold inside teaching prose. Each Original paragraph becomes one
    main point, with its closing sentence as the sub-point."""
    out = []
    for para in paragraphs:
        text = stars(para)
        cuts = [m.end() for m in re.finditer(r'(?<=[a-z”\)\*]\.)\s+(?=[A-Z“\*])', text)]
        out.append(dict(text=text[:cuts[-1]].strip(), children=[text[cuts[-1]:].strip()]) if cuts else dict(text=text, children=[]))
    return out


def sentence_points(paragraphs):
    """Each Original paragraph as one main point (its first sentence) with the remaining sentences as sub-points."""
    out = []
    for para in paragraphs:
        parts = [p.strip() for p in re.split(r'(?<=[a-z”\)\*]\.)\s+(?=[A-Z“\*])', stars(para)) if p.strip()]
        out.append(dict(text=parts[0], children=parts[1:]))
    return out


def older_versions(section, extra):
    """Versions 6 to 18, assembled the way Module II layers them. Two wordings exist for every slide: the Original
    (slide wording kept in bold) and Version 22 (plain wording). Versions 12 to 18 end with one closing point, and
    Versions 16 and 18 add a sentence of reasoning on slides that report a study.
      6  · Version 22 wording as flat paragraphs, no sub-points
      10 · Original wording as main points with sub-points
      12 · Version 10 plus the closing point
      14 · Version 22 wording plus the closing point
      16 · Version 14 plus the reasoning sentence
      18 · Version 12 plus the reasoning sentence"""
    page = section['page']
    if not section['original']:
        return {k: [] for k in ('6', '10', '12', '14', '16', '18')}
    slide_wording, plain = sentence_points(section['original']), section['v22']
    text, subs = extra.CLOSING[page]
    closing = [dict(text=text, children=list(subs))]
    reason = [dict(text=extra.REASONING[page], children=[])] if page in extra.REASONING else []
    return {'6': [dict(text=' '.join([b['text']] + b['children']), children=[]) for b in plain], '10': slide_wording,
            '12': slide_wording + closing, '14': plain + closing, '16': plain + reason + closing, '18': slide_wording + reason + closing}


def tier(score, high=8.5, mid=6.5):
    return 'high' if score >= high else 'mid' if score >= mid else 'low'

for c in COLLECTIONS:
    src, cid = c['content'], c['id']
    pages = sorted(p.name for p in (ROOT / c['media']).glob('slide-*.webp'))
    assert [s['page'] for s in src.SECTIONS] == list(range(1, len(pages) + 1)), 'every source slide, in order'
    sections = []
    for s in src.SECTIONS:
        empty = not s['original']
        assert empty == (not s['v22']), s['page']
        text = ' '.join(s['original'] + [b['text'] + ' ' + ' '.join(b['children']) for b in s['v22']])
        for word in BANNED:
            assert not re.search(r'\b' + re.escape(word) + r'\b', text, re.I), (s['page'], word)
        v22 = ' '.join(b['text'] + ' ' + ' '.join(b['children']) for b in s['v22'])
        assert not re.search(r'[:;—–]', v22.replace('40–50', '')), (s['page'], 'colon, semicolon or dash in Version 22 prose')
        assert v22.count('**') % 2 == 0, s['page']
        section = dict(page=s['page'], title=s['title'], bullets=s['original'], image=s['page'] - 1)
        if empty: section['sourceOnly'] = True
        if s['core']: section['core'] = s['core']
        sections.append(section)
        key = f"{cid}:{s['page']}"
        bank['scripts']['22'][key] = s['v22']
        bank['scripts']['21'][key] = s['v22']  # same wording; Version 21 differs in layout only
        bank['scripts']['20'][key] = as_points(s['original'])
        for version, script in older_versions(s, c['versions']).items():
            bank['scripts'][version][key] = script
    bank['collections'].append(dict(id=cid, title=c['title'], file=c['file'], sourcePdf=c['sourcePdf'], sections=sections,
                                    original=[f"{c['media']}/{p}" for p in pages], optional=False))
    bank['modules'].append(cid); bank['lectureNumbers'][str(cid)] = c['number']
    valid = {s['page'] for s in src.SECTIONS if s['original']}
    for i, question in enumerate(src.QUESTIONS):
        assert question['page'] in valid and len(set(question['options'])) == 4, question['stem']
        bank['questions'].append(dict(id=c['firstQuestion'] + i, module=cid, **question))
    for title, pgs in src.TOPICS:
        assert set(pgs) <= valid, title
        bank['topics'].append(dict(module=cid, title=title, pages=pgs, progressKey=f'm3-topic-{cid}-{pgs[0]}'))
    covered = {p for _, pgs in src.TOPICS for p in pgs}
    assert covered == valid, sorted(valid - covered)
    for title, pgs in src.EXPERIMENTS:
        assert set(pgs) <= valid, title
        bank['experiments'].append(dict(module=cid, title=title, pages=pgs))
    groups = {}
    for s in src.SECTIONS:
        if s['core']: groups.setdefault(s['core'], []).append(s['page'])
    bank['coreReview'] += [dict(module=cid, title=t, pages=p) for t, p in groups.items()]
    # Question wordings and the ranked practice set.
    core = {s['page'] for s in src.SECTIONS if s['core']}
    ranked = []
    for i, question in enumerate(src.QUESTIONS):
        qid = c['firstQuestion'] + i
        alt = c['questionVersions'].V[i]
        for version in alt.values():
            assert len(set(version['options'])) == 4, (i, version['stem'])
            version['correct'] = 0
        bank['questionVersions'][str(qid)] = alt
        ranked.append((2 * (question['page'] in core) + 1.5 * (question['kind'] in ('researcher', 'design')), -i, qid))
    assert set(c['questionVersions'].V) == set(range(len(src.QUESTIONS)))
    bank['likely'] += [qid for _, _, qid in sorted(ranked, reverse=True)[:25]]
    # Workspace aids.
    A = c['aids']
    topic_pages = {t: pgs for t, pgs in src.TOPICS}
    assert A.TOPIC_TITLES == [t for t, _ in src.TOPICS]
    for n, title in enumerate(A.TOPIC_TITLES):
        items = [x for x in A.QA if x['topic'] == n and x['kind'] == 'slide']
        assert items, title
        aids['ask'].append(dict(module=cid, topic=title, pages=topic_pages[title], questions=[x['q'] for x in items],
                                answers=[x['a'] for x in items], remember=A.REMEMBER[n]))
    ordered = sorted([x for x in A.QA if x['kind'] == 'slide'], key=lambda x: (x['slides'][0], x['slides'][-1])) + [x for x in A.QA if x['kind'] == 'relate']
    for n, x in enumerate(ordered):
        assert set(x['slides']) <= valid, x['q']
        qid = c['firstQa'] + n
        base = dict(module=cid, slides=x['slides'], q=x['q'], a=x['a'], score=x['score'], tier=tier(x['score']))
        if x['note']:
            base['note'] = x['note']
        if x['bank'] and x['kind'] == 'slide':
            aids['qaBank'].append({**base, **({'who': x['who']} if x['who'] else {})})
        aids['qaV3'].append(dict(base, kind=x['kind'], id=qid))
        aids['qaV4'].append(dict(id=qid, a=x['deep']))
        aids['qaV5'].append(dict(id=qid, a=[' '.join(line[2:] if line.startswith('- ') else line for line in x['deep'])]))
    for card in A.CARDS:
        assert set(card['pages']) <= valid, card['title']
        aids['cards'].append({k: v for k, v in dict(module=cid, title=card['title'], pages=card['pages'], researcher=card['researcher'], aim=card['aim'],
                              manipulated=card['manipulated'], measured=card['measured'], found=card['found'], means=card['means'], trap=card['trap']).items() if v})
        aids['cardsV4'].append(dict(module=cid, title=card['title'], researcher=card['researcher'], pages=card['pages'], blocks=card['blocks']))
    for x in A.CONTRASTS:
        assert set(x['pages']) <= valid, x['title']
        head = dict(module=cid, title=x['title'], pages=x['pages'], a=x['a'], b=x['b'])
        rank = dict(score=x['score'], tier=tier(x['score'], 9, 7.5), basis='named study, stated result and must-know slides')
        aids['contrasts'].append(dict(head, tell=x['diff'], example=x['example']))
        aids['contrastsV2'].append(dict(head, diff=x['diff'], example=x['example'], watch=x['watch'], **rank))
        aids['contrastsV3'].append(dict(head, blocks=x['blocks'], **rank))
        aids['contrastsV21'].append(dict(head, blocks=x['blocks'], **rank))
    for x in A.HARD:
        assert set(x['pages']) <= valid, x['title']
        aids['topicsV4'].append(dict(module=cid, title=x['title'], pages=x['pages'], blocks=x['blocks']))
        aids['explainers'].append(dict(module=cid, title=x['title'], pages=x['pages'], another=[],
                                       explain=[re.sub(r'\*\*', '', ' '.join([b['text']] + b['children'])) for b in x['blocks']]))
    # Test Bank: the supplied Goldstein bank for this chapter.
    T = c['testbank']
    source = json.loads((Path(__file__).parent / c['testbankSource']).read_text(encoding='utf8'))
    assert {q['number'] for q in source} == set(T.CURATION), 'every multiple-choice item is curated'
    aids['testbank']['modules'].append(cid)
    for q in source:
        page, why = T.CURATION[q['number']]
        row = dict(q, module=cid, page=page if isinstance(page, int) else None, scope='slides' if isinstance(page, int) else page, why=why)
        row['stem'] = T.STEMS.get(q['number'], q['stem'])
        row['options'] = [T.OPTIONS.get(q['number'], {}).get(i, o) for i, o in enumerate(q['options'])]
        row['refs'] = [[cid, page]] if isinstance(page, int) else []
        row['source'] = dict(chapter=q['chapter'], question=q['number'], originalAnswer='ABCD'[q['correct']])
        row['edited'] = row['stem'] != q['stem'] or row['options'] != q['options']
        assert page in ('extra', 'review') or page in valid, q['id']
        assert len(set(row['options'])) == 4 and len(why) > 100, q['id']
        assert not re.search(r'your text|your book|the text[’\']s|in the textbook', row['stem'], re.I), q['id']
        aids['testbank']['questions'].append(row)

# The practice test takes the same number of questions from every lecture, so its size cannot exceed
# the smallest lecture pool times the number of lectures.
pools = [sum(q['module'] == m for q in bank['questions']) for m in bank['modules']]
bank['practiceTestSize'] = min(100, min(pools) * len(pools))
LATER = '''
// Collections that belong to Module II or Module III. The page uses this to keep them out of the Module I lists.
(()=>{const later=new Set([...(window.SECOND_HALF?.modules||[]),...window.THIRD_PART.modules]);window.PsycLater=id=>later.has(id)})();
'''
out = ROOT / 'psyc301-module3-data.js'
out.write_text('// Generated by authoring/psyc301/module3/build.py. Module III data; earlier modules are unchanged.\n'
               'window.THIRD_PART = ' + json.dumps(bank, ensure_ascii=False, indent=1) + ';\n' + LATER, encoding='utf8')
aids_out = ROOT / 'psyc301-module3-aids-data.js'
aids_out.write_text('// Generated by authoring/psyc301/module3/build.py. Module III items for the shared workspace tools.\n'
                    'window.THIRD_AIDS = ' + json.dumps(aids, ensure_ascii=False, indent=1) + ';\n', encoding='utf8')
print(aids_out.name, aids_out.stat().st_size, 'bytes ·', {k: len(v) for k, v in aids.items() if isinstance(v, list)}, '· test bank', len(aids['testbank']['questions']))
print(out.name, out.stat().st_size, 'bytes ·', sum(len(c['sections']) for c in bank['collections']), 'slides ·',
      len(bank['questions']), 'questions ·', len(bank['topics']), 'topics ·', len(bank['coreReview']), 'core groups')
