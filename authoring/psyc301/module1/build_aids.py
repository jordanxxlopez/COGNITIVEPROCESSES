"""Build psyc301-module1-aids-data.js: the Module I items for the shared workspace tools.

What you can be asked, Q&A (all five layouts), Experiment cards, Side-by-side contrasts, Hard topics and the
Test Bank. The file appends to window.THIRD_AIDS, which the tools already read, and is loaded right after
psyc301-module3-aids-data.js. Q&A answers and in-depth lines are the reviewed Version 22 notes for the same page.
Module I's own notes, questions and older editions are not rewritten.
"""
import importlib, json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
ROOT = Path(__file__).resolve().parents[3]
REVISION = 'module1-aids-1'
# (aids file, notes file, first Q&A id, Test Bank file or None)
FILES = [('a01_intro', 'c01_intro', 7000), ('a02_perception1', 'c02_perception1', 7100), ('a03_perception2', 'c03_perception2', 7200),
         ('a04_attention1', 'c04_attention1', 7300), ('a05_attention2', 'c05_attention2', 7400), ('a06_language1', 'c06_language1', 7500),
         ('a07_language2', 'c07_language2', 7600), ('a08_articles', 'c08_articles', 7700)]
TESTBANKS = [('tb_ch01', 1), ('tb_ch03', 3), ('tb_ch04', 4), ('tb_ch11', 11)]
BANNED = ['coworkers', 'et al', 'need not', 'the lecture', 'the slide says', 'pictured', 'thus', 'hence', 'the professor', 'this matters because', 'the course']

page = (ROOT / 'index.html').read_text(encoding='utf8')
i = page.index('id="study-data"'); j = page.index('>', i) + 1
DATA = json.loads(page[j:page.index('</script>', j)])
MODULES = {m['id']: m for m in DATA['modules']}


def point(line):
    parts = [p.strip() for p in line.split(' | ')]
    return dict(text=parts[0], children=parts[1:])


def plain(t):
    return re.sub(r'\*\*', '', t)


def tier(score, high=8.5, mid=6.5):
    return 'high' if score >= high else 'mid' if score >= mid else 'low'


WHO = re.compile(r'\*\*([A-Z][^*]*?\((?:\d{4}|\d{4}s?–\d{4}s?|\d{4}/\d{4})\))\*\*')


def check(text, where):
    for word in BANNED:
        assert not re.search(r'\b' + re.escape(word) + r'\b', text, re.I), (where, word)
    assert text.count('**') % 2 == 0, where


aids = dict(revision=REVISION, ask=[], cards=[], cardsV4=[], contrasts=[], contrastsV2=[], contrastsV3=[], contrastsV21=[], explainers=[],
            topicsV4=[], qaBank=[], qaV3=[], qaV4=[], qaV5=[], testbank=dict(modules=[], questions=[]))
counts = {}
for name, notes_name, first_qa in FILES:
    try:
        A = importlib.import_module(name).A
    except ModuleNotFoundError:
        continue
    notes = importlib.import_module(notes_name)
    cid = A.ID
    assert notes.ID == cid
    module = MODULES[cid]
    must = {s['page'] for s in module['sections'] if s.get('examPriorityE', {}).get('mustKnow')}
    valid = {s['page'] for s in module['sections']}
    v22 = {p: [point(x) for x in pts] for p, (pts, _, _) in notes.S.items()}
    assert set(A.Q) == valid, (name, sorted(valid ^ set(A.Q)))
    covered = [p for _, pgs, _ in A.TOPICS for p in pgs]
    assert sorted(covered) == sorted(valid), (name, sorted(set(valid) - set(covered)), [p for p in covered if covered.count(p) > 1])
    items = {}
    for pg, (question, score, note) in A.Q.items():
        pts = v22[pg]
        assert pts, (name, pg)
        answer = ' '.join(plain(' '.join([b['text']] + b['children'])) for b in pts)
        deep = [line for b in pts for line in [b['text']] + ['- ' + c for c in b['children']]]
        who = WHO.search(' '.join(b['text'] + ' ' + ' '.join(b['children']) for b in pts))
        if score is None:
            score = 9 if pg in must else 7.5 if who else 6
        check(question + ' ' + (note or ''), (name, pg))
        items[pg] = dict(slides=[pg], q=question, a=answer, deep=deep, score=score, note=note, who=who.group(1) if who else None, kind='slide')
    for title, pgs, remember in A.TOPICS:
        check(title + ' ' + remember, (name, title))
        aids['ask'].append(dict(module=cid, topic=title, pages=pgs, questions=[items[p]['q'] for p in pgs],
                                answers=[items[p]['a'] for p in pgs], remember=remember))
    ordered = [items[p] for p in sorted(items)]
    for pgs, question, answer, deep, score in A.RELATE:
        assert set(pgs) <= valid, question
        check(question + ' ' + answer + ' ' + ' '.join(deep), (name, question))
        ordered.append(dict(slides=pgs, q=question, a=answer, deep=deep, score=score, note=None, who=None, kind='relate'))
    for n, x in enumerate(ordered):
        qid = first_qa + n
        base = dict(module=cid, slides=x['slides'], q=x['q'], a=x['a'], score=x['score'], tier=tier(x['score']))
        if x['note']:
            base['note'] = x['note']
        if x['kind'] == 'slide':
            aids['qaBank'].append({**base, **({'who': x['who']} if x['who'] else {})})
        aids['qaV3'].append(dict(base, kind=x['kind'], id=qid))
        aids['qaV4'].append(dict(id=qid, a=x['deep']))
        aids['qaV5'].append(dict(id=qid, a=[' '.join(line[2:] if line.startswith('- ') else line for line in x['deep'])]))
    for c in A.CARDS:
        assert set(c['pages']) <= valid, c['title']
        # In-depth version: the setup from the first point of up to three pages, then the result and what it means,
        # so the finding is always included.
        blocks = c['blocks'] or [v22[p][0] for p in c['pages'][:3]] + [dict(text=re.sub(r'^Not reported\. ', '', c['found']), children=[c['means']])]
        check(' '.join(str(v) for v in c.values() if isinstance(v, str)), (name, c['title']))
        aids['cards'].append({k: v for k, v in dict(module=cid, title=c['title'], pages=c['pages'], researcher=c['researcher'], aim=c['aim'],
                              manipulated=c['manipulated'], measured=c['measured'], found=c['found'], means=c['means'], trap=c['trap']).items() if v})
        aids['cardsV4'].append(dict(module=cid, title=c['title'], researcher=c['researcher'], pages=c['pages'], blocks=blocks))
    for x in A.CONTRASTS:
        assert set(x['pages']) <= valid, x['title']
        check(' '.join([x['title'], x['a']['definition'], x['b']['definition'], x['diff'], x['example'], x['watch']]), (name, x['title']))
        head = dict(module=cid, title=x['title'], pages=x['pages'], a=x['a'], b=x['b'])
        rank = dict(score=x['score'], tier=tier(x['score'], 9, 7.5), basis='named study, stated result and must-know slides')
        blocks = [dict(text=f"**{x['a']['term']}.** {x['a']['definition']}", children=[]),
                  dict(text=f"**{x['b']['term']}.** {x['b']['definition']}", children=[]),
                  dict(text=x['diff'], children=[x['example']])]
        aids['contrasts'].append(dict(head, tell=x['diff'], example=x['example']))
        aids['contrastsV2'].append(dict(head, diff=x['diff'], example=x['example'], watch=x['watch'], **rank))
        aids['contrastsV3'].append(dict(head, blocks=blocks, **rank))
        aids['contrastsV21'].append(dict(head, blocks=blocks, **rank))
    for x in A.HARD:
        assert set(x['pages']) <= valid, x['title']
        check(x['title'] + ' ' + ' '.join(b['text'] + ' '.join(b['children']) for b in x['blocks']), (name, x['title']))
        aids['topicsV4'].append(dict(module=cid, title=x['title'], pages=x['pages'], blocks=x['blocks']))
        aids['explainers'].append(dict(module=cid, title=x['title'], pages=x['pages'], another=[],
                                       explain=[plain(' '.join([b['text']] + b['children'])) for b in x['blocks']]))
    counts[name] = dict(qa=len(ordered), topics=len(A.TOPICS), cards=len(A.CARDS), contrasts=len(A.CONTRASTS), hard=len(A.HARD))

# Test Bank: the supplied Goldstein bank, chapters 1, 3, 4 and 11. Each item is mapped to one Module I slide.
module_pages = {m: {s['page'] for s in MODULES[m]['sections']} for m in MODULES}
for tb_name, chapter in TESTBANKS:
    try:
        T = importlib.import_module(tb_name)
    except ModuleNotFoundError:
        continue
    source = json.loads((Path(__file__).parent / f'testbank-source-ch{chapter:02d}.json').read_text(encoding='utf8'))
    assert {q['number'] for q in source} == set(T.CURATION), (tb_name, sorted({q['number'] for q in source} ^ set(T.CURATION)))
    for q in source:
        where, why = T.CURATION[q['number']]
        if isinstance(where, tuple):
            cid, pg = where
            assert pg in module_pages[cid], (tb_name, q['number'], where)
            scope = 'slides'
        else:
            cid, pg, scope = T.HOME, None, where
            assert where in ('extra', 'review'), (tb_name, q['number'])
        if cid not in aids['testbank']['modules']:
            aids['testbank']['modules'].append(cid)
        row = dict(q, module=cid, page=pg, scope=scope, why=why)
        row['stem'] = T.STEMS.get(q['number'], q['stem'])
        row['options'] = [T.OPTIONS.get(q['number'], {}).get(k, o) for k, o in enumerate(q['options'])]
        row['refs'] = [[cid, pg]] if pg else []
        row['source'] = dict(chapter=q['chapter'], question=q['number'], originalAnswer='ABCD'[q['correct']])
        row['edited'] = row['stem'] != q['stem'] or row['options'] != q['options']
        assert len(set(row['options'])) == 4 and len(why) > 100, (tb_name, q['number'])
        assert not re.search(r'your text|your book|the text[’\']s|in the textbook', row['stem'], re.I), q['id']
        aids['testbank']['questions'].append(row)

JS = '''// Generated by authoring/psyc301/module1/build_aids.py. Module I items for the shared workspace tools.
// They join window.THIRD_AIDS (loaded just before this file); each tool shows only the open module's lectures.
(()=>{const add=%s;const T=window.THIRD_AIDS=window.THIRD_AIDS||{};
for(const [k,v] of Object.entries(add)){if(k==='revision')continue;if(k==='testbank'){T.testbank=T.testbank||{modules:[],questions:[]};T.testbank.modules=T.testbank.modules.concat(v.modules);T.testbank.questions=T.testbank.questions.concat(v.questions);continue}T[k]=(T[k]||[]).concat(v)}
window.FIRST_AIDS_MODULES=%s})();
'''
out = ROOT / 'psyc301-module1-aids-data.js'
mods = [MODULES[importlib.import_module(n).A.ID]['id'] for n, _, _ in FILES if (Path(__file__).parent / (n + '.py')).exists()]
out.write_text(JS % (json.dumps(aids, ensure_ascii=False, indent=0), json.dumps(mods)), encoding='utf8')
print(out.name, out.stat().st_size, 'bytes')
for k, v in counts.items():
    print(' ', k, v)
print('  test bank', len(aids['testbank']['questions']), 'questions in', aids['testbank']['modules'])
