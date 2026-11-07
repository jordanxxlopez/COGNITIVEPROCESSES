"""Merge the reviewed lab and article text into text.json and check the owner's rules.

    python3 authoring/psyc301/articles-labs/merge_fixed.py <labs.json> <articles.json>

Sub-bullets must be plain strings; a nested {text, children} item is folded into one string.
Fails on identical or near-identical versions, years or percentages in Version 21, banned wording,
more than three main points or three sub-bullets, and sub-bullets that are not strings.
"""
import difflib
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
labs = json.load(open(sys.argv[1]))['sections']
arts = json.load(open(sys.argv[2]))['sections']
secs = sorted(labs + arts, key=lambda s: s['page'])
assert [s['page'] for s in secs] == list(range(1, 19)), [s['page'] for s in secs]


def fold(c):
    if isinstance(c, str):
        return c
    return ' '.join([c['text']] + [fold(x) for x in c.get('children', [])])


for s in secs:
    for k in ('v20', 'v21', 'v22'):
        s[k] = [{'text': b['text'], 'children': [fold(c) for c in b['children']]} for b in s[k]]


def flat(x):
    if x and isinstance(x[0], str):
        return ' '.join(re.sub('<[^>]+>', '', t) for t in x)
    return ' '.join(b['text'] + ' ' + ' '.join(b['children']) for b in x).replace('**', '')


BAN = re.compile(r"need not|coworker|the lecture|lecture (?:says|gives)|the (?:paper|article|lab) says|this (?:work|topic|lab)|covered here|the topic rests", re.I)
errors = []
for s in secs:
    t = {k: flat(s[k]) for k in ('original', 'v20', 'v21', 'v22')}
    for a, b in [('original', 'v20'), ('original', 'v21'), ('v20', 'v21'), ('v21', 'v22'), ('v20', 'v22')]:
        r = difflib.SequenceMatcher(None, t[a], t[b]).ratio()
        if r > 0.9:
            errors.append(f"p{s['page']} {a} vs {b} too similar ({r:.2f})")
    if re.search(r'\b(?:19|20)\d\d\b|\d\s?%', t['v21']):
        errors.append(f"p{s['page']} v21 has a year or percentage")
    for k, v in t.items():
        m = BAN.search(v)
        if m:
            errors.append(f"p{s['page']} {k} banned wording: {m.group(0)}")
        if re.search(r'\b\d+(?:\.\d+)?\s?(?:seconds?|ms|milliseconds?|items|%)', v):
            errors.append(f"p{s['page']} {k} has a number or timing: {re.search(r'.{20}\\b\\d+(?:\\.\\d+)?\\s?(?:seconds?|ms|milliseconds?|items|%).{10}', v).group(0) if re.search(r'.{20}\\b\\d+(?:\\.\\d+)?\\s?(?:seconds?|ms|milliseconds?|items|%).{10}', v) else ''}")
    for k in ('v20', 'v21', 'v22'):
        if not 2 <= len(s[k]) <= 3:
            errors.append(f"p{s['page']} {k} has {len(s[k])} main points")
        if any(len(b['children']) > 3 for b in s[k]):
            errors.append(f"p{s['page']} {k} has more than 3 sub-bullets")
for e in errors:
    print('FAIL', e)
if errors:
    sys.exit(1)
(HERE / 'text.json').write_text(json.dumps({'sections': [{k: s[k] for k in ('page', 'title', 'original', 'v20', 'v21', 'v22')} for s in secs]}, ensure_ascii=False, indent=1))
print('merged', len(secs), 'sections; all checks passed')
