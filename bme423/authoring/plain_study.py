"""Build plain-study-data.js (Version E and Order to memorize) from plain_study_content.py.

Refuses to build when a block points at a page image that does not exist, or when the
prose breaks the writing rules (labels, colons, semicolons, dashes, equals signs, arrows,
lecture/slide/professor mentions, banned filler, "picture" as a noun).
Run:  python3 bme423/authoring/plain_study.py
"""
import json, re, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from plain_study_content import LECTURES, TIERS

ROOT = pathlib.Path(__file__).resolve().parents[1]
BANNED_CHARS = [(':', 'colon'), (';', 'semicolon'), ('—', 'em dash'), ('–', 'en dash'),
                (' - ', 'dash'), ('=', 'equals sign'), ('→', 'arrow'), ('->', 'arrow')]
BANNED_WORDS = [r'\blecture', r'\bslides?\b', r'\bprofessor', r'\bthus\b', r'\bhence\b', r'\bnote that\b',
                r'\bthe key point\b', r'\bbasically\b', r'\bblame', r'\blet\'s\b', r'\bpictur(e[ds]?|ing)\b(?<!^Picture)']
problems = []

def check(text, where):
    plain = re.sub(r'\*\*', '', text)
    for ch, name in BANNED_CHARS:
        if ch in plain:
            problems.append(f'{where}: {name} in "{plain[:70]}"')
    for w in BANNED_WORDS:
        m = re.search(w, plain, re.I)
        if m and not (m.group(0).lower().startswith('pictur') and plain.startswith('Picture ')):
            problems.append(f'{where}: banned word "{m.group(0)}"')
    for sent in re.split(r'(?<=[.!?])\s+', plain):
        if len(sent.split()) > 32:
            problems.append(f'{where}: sentence over 32 words "{sent[:60]}"')

counts = {'lectures': 0, 'blocks': 0, 'questions': 0, 'types': 0, 'steps': 0}
for lec in LECTURES:
    counts['lectures'] += 1
    lid = lec['id']; assert lec['tier'] in TIERS
    check(lec['lead'], f'S{lid} lead')
    for t in lec['topics']:
        for i, b in enumerate(t['blocks']):
            counts['blocks'] += 1
            for p in b['pages']:
                if not (ROOT / 'assets' / f'session{lid}' / f'{p}.webp').exists():
                    problems.append(f'S{lid} {t["title"]}: page {p} has no image')
            for k in ('main', 'end'):
                if b.get(k): check(b[k], f'S{lid} {t["title"]} block {i+1} {k}')
            for s in b.get('sub', []): check(s, f'S{lid} {t["title"]} block {i+1} sub')
    for q in lec['questions']:
        counts['questions'] += 1
        check(q['a'], f'S{lid} answer "{q["q"][:30]}"')
    for m in lec['memorize']:
        counts['types'] += 1
        check(m['when'], f'S{lid} {m["title"]} when')
        for j, st in enumerate(m['steps']):
            counts['steps'] += 1
            check(st['do'], f'S{lid} {m["title"]} step {j+1}')
            check(st['why'], f'S{lid} {m["title"]} step {j+1} why')
            if not st['why'].startswith('This is because'):
                problems.append(f'S{lid} {m["title"]} step {j+1}: reason must start with "This is because"')

if problems:
    print('\n'.join(problems)); sys.exit(f'{len(problems)} writing or reference problems; nothing written')
payload = {'revision': 'plain-study-1', 'tiers': TIERS, 'lectures': LECTURES}
out = ROOT / 'plain-study-data.js'
out.write_text('// Built by authoring/plain_study.py from plain_study_content.py. Do not edit by hand.\n'
               'const PLAIN_STUDY=' + json.dumps(payload, ensure_ascii=False, indent=0) + ';\n')
print('wrote', out.name, counts)
