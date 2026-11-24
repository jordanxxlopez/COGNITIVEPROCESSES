"""Build psyc301-module1-data.js: numbered note Versions for the Module I collections.

Module I's own notes (Original and Versions B to E, stored in index.html) are read and never rewritten.
Each collection file (c01_intro.py ...) holds the Version 22 wording, one closing point and, on slides that
report a study, one reasoning sentence. The other numbered versions are layered from those, the same way
Module III does it:
  6  · Version 22 wording as flat paragraphs        10 · Original wording as main points with sub-points
  12 · Version 10 plus the closing point            14 · Version 22 plus the closing point
  16 · Version 14 plus the reasoning sentence       18 · Version 12 plus the reasoning sentence
  20 · Original wording as points                   21 · Version 22 wording (layout differs)
"""
import html, importlib, json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
ROOT = Path(__file__).resolve().parents[3]
REVISION = 'module1-5'
# (file, versions offered). The articles collection mirrors Collection 15, which offers Versions 20 to 22.
ALL = ['6', '10', '12', '14', '16', '18', '20', '21', '22']
FILES = [('c01_intro', ALL), ('c02_perception1', ALL), ('c03_perception2', ALL), ('c04_attention1', ALL),
         ('c05_attention2', ALL), ('c06_language1', ALL), ('c07_language2', ALL), ('c08_articles', ['20', '21', '22'])]
VERSIONS = {'6': 'Version 6 · natural teaching', '10': 'Version 10 · teaching notes', '12': 'Version 12 · detailed teaching notes',
            '14': 'Version 14 · balanced teaching notes', '16': 'Version 16 · natural teaching notes', '18': 'Version 18 · teaching scripts',
            '20': 'Version 20 · natural teaching transcript', '21': 'Version 21 · natural teaching notes with following slides',
            '22': 'Version 22 · natural teaching notes with researchers and years'}
BANNED = ['coworkers', 'et al', 'need not', 'the lecture', 'the slide', 'pictured', 'thus', 'hence', 'the professor', 'next section', 'next sections', 'this collection', 'this matters', 'the course']
RANGES = re.compile(r'\d{4}s?–\d{4}s?|\d+–\d+')

page = (ROOT / 'index.html').read_text(encoding='utf8')
i = page.index('id="study-data"'); j = page.index('>', i) + 1
DATA = json.loads(page[j:page.index('</script>', j)])
MODULES = {m['id']: m for m in DATA['modules']}

def stars(text):
    return html.unescape(re.sub(r'</?strong>', '**', text))

SPLIT = r'(?<=[a-z0-9”’\)\*]\.)\s+(?=[A-Z“\*])'
def as_points(paragraphs):
    out = []
    for para in paragraphs:
        text = stars(para)
        cuts = [m.end() for m in re.finditer(SPLIT, text)]
        out.append(dict(text=text[:cuts[-1]].strip(), children=[text[cuts[-1]:].strip()]) if cuts else dict(text=text, children=[]))
    return out

def sentence_points(paragraphs):
    out = []
    for para in paragraphs:
        parts = [p.strip() for p in re.split(SPLIT, stars(para)) if p.strip()]
        out.append(dict(text=parts[0], children=parts[1:]))
    return out

def point(line):
    parts = [p.strip() for p in line.split(' | ')]
    return dict(text=parts[0], children=parts[1:])

bank = dict(revision=REVISION, modules=[], versions=VERSIONS, available={}, scripts={k: {} for k in ALL})
for name, offered in FILES:
    try:
        src = importlib.import_module(name)
    except ModuleNotFoundError:
        continue
    module = MODULES[src.ID]
    pages = {s['page']: s for s in module['sections']}
    assert set(src.S) == set(pages), (name, sorted(set(pages) ^ set(src.S)))
    for number, (points, closing, reason) in src.S.items():
        if closing:
            # Each closing point names what it is about (SUBJECT), as the Module III notes do.
            assert closing.startswith('This matters because '), (name, number)
            closing = src.SUBJECT[number] + closing[len('This matters'):]
        plain = [point(p) for p in points]
        written = ' '.join(points + ([closing] if closing else []) + ([reason] if reason else []))
        for word in BANNED:
            assert not re.search(r'\b' + re.escape(word) + r'\b', written, re.I), (name, number, word)
        assert not re.search(r'[:;—–]', RANGES.sub('', written)), (name, number, 'colon, semicolon or dash')
        assert written.count('**') % 2 == 0, (name, number)
        original = pages[number]['bullets']
        slide_wording, close = sentence_points(original), ([point(closing)] if closing else [])
        why = [dict(text=reason, children=[])] if reason else []
        scripts = {'22': plain, '21': plain, '20': as_points(original),
                   '6': [dict(text=' '.join([b['text']] + b['children']), children=[]) for b in plain], '10': slide_wording,
                   '12': slide_wording + close, '14': plain + close, '16': plain + why + close, '18': slide_wording + why + close}
        for version in offered:
            bank['scripts'][version][f'{src.ID}:{number}'] = scripts[version]
    bank['modules'].append(src.ID); bank['available'][str(src.ID)] = offered
# Question wordings (College-Level and Simplified) for the existing Module I quiz questions.
import qv_a, qv_b, qv_c, qv_d, qv_balance
wordings = {}
for part in (qv_a, qv_b, qv_c, qv_d):
    wordings.update(part.V)
questions = {q['id']: q for q in DATA['questions'] if q['module'] in bank['modules']}
assert set(wordings) == set(questions), sorted(set(questions) ^ set(wordings))
bank['questionVersions'] = {}
# Simplified questions whose answer is on a neighbouring page, and two whose answer is a point of method.
SIMPLE_PAGE = {9: 31, 153: 41, 176: 13, 183: 23, 206: 12, 107: 26, 108: 25}
SIMPLE_WHY = {152: 'The study measured media multitasking and attention and did not assign people to multitask. Higher multitasking was associated with poorer sustained attention. An association does not show that one causes the other.',
              231: 'Participants heard two speakers reading different stories and pressed a button for target words in the attended story. Competing speech made target detection worse. Listeners with more musical training or better auditory working memory showed smaller drops in performance.'}
for qid, (college, simple) in sorted(wordings.items()):
    original = questions[qid]
    assert original['correct'] == 0, qid   # every wording lists the correct answer first, as the Original does
    entry = {}
    for label, (stem, *options) in (('college', college), ('simple', simple)):
        if (qid, label) in qv_balance.WRONG:
            options = [options[0]] + qv_balance.WRONG[(qid, label)]
        assert len(set(options)) == 4, (qid, label)
        for word in BANNED:
            assert not re.search(r'\b' + re.escape(word) + r'\b', stem + ' ' + ' '.join(options), re.I), (qid, label, word)
        entry[label] = dict(stem=stem, options=options, correct=0)
        if label == 'simple':
            # A Simplified question can ask a neighbouring fact from the same page, so its explanation is
            # the two points of that page's notes that share the most words with the question and its answer.
            notes = bank['scripts']['22'].get(f"{original['module']}:{SIMPLE_PAGE.get(qid, original['page'])}")
            if qid in SIMPLE_WHY:
                entry[label]['why'] = SIMPLE_WHY[qid]
            elif notes:
                words = lambda t: set(re.findall(r'[a-z]{4,}', t.lower()))
                target = words(stem + ' ' + options[0])
                flat = [re.sub(r'\*\*', '', ' '.join([b['text']] + b['children'])) for b in notes]
                best = sorted(range(len(flat)), key=lambda n: (-len(target & words(flat[n])), n))[:2]
                entry[label]['why'] = ' '.join(flat[n] for n in sorted(best))
    bank['questionVersions'][str(qid)] = entry
out = ROOT / 'psyc301-module1-data.js'
out.write_text('// Generated by authoring/psyc301/module1/build.py. Numbered note versions for Module I; its own notes are unchanged.\n'
               'window.FIRST_PART = ' + json.dumps(bank, ensure_ascii=False, indent=1) + ';\n', encoding='utf8')
print(out.name, out.stat().st_size, 'bytes ·', len(bank['modules']), 'collections ·', len(bank['scripts']['22']), 'sections ·', len(bank['questionVersions']), 'question wordings')
