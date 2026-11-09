"""Build psyc301-cards-v4-data.js and psyc301-topics-v4-data.js from authoring/psyc301/exam-aids/v4/{cards,topics}-N.json."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
V4 = ROOT / 'authoring/psyc301/exam-aids/v4'
def load(f):
    s = (ROOT / f).read_text(); return json.loads(s[s.index('=') + 1:].strip().rstrip(';'))
cards = {c['title']: c for c in load('psyc301-exam-aids-data.js')['cards']}
out_c, out_t, seen = [], [], set()
for n in '12345':
    for o in json.loads((V4 / f'cards-{n}.json').read_text()):
        c = cards[o['title']]; seen.add(o['title'])
        out_c.append({k: c.get(k) for k in ('module', 'title', 'researcher', 'pages')} | {'blocks': o['blocks']})
    out_t += json.loads((V4 / f'topics-{n}.json').read_text())
assert seen == set(cards), set(cards) - seen
bad = re.compile('—|–|coworker|this lecture|covered here|the slides|\\bin class\\b', re.I)
for x in out_c + out_t:
    t = json.dumps(x['blocks'], ensure_ascii=False) + ('' if 'researcher' in x else x['title'])
    assert not bad.search(t), (x['title'], bad.search(t).group(0))
(ROOT / 'psyc301-cards-v4-data.js').write_text('window.CARDS_V4 = ' + json.dumps(out_c, ensure_ascii=False) + ';\n')
(ROOT / 'psyc301-topics-v4-data.js').write_text('window.TOPICS_V4 = ' + json.dumps(out_t, ensure_ascii=False) + ';\n')
print(len(out_c), 'cards,', len(out_t), 'topics')
