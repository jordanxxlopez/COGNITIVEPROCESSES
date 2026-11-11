"""Style checks for section-style notes (Version 8.x) in the labeled, technical-term style."""
import re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from notes_v8 import parse
from check_v9 import BANNED
LABEL = re.compile(r"^[A-Za-z0-9/' ().,\"-]{1,48}: (?=[A-Z0-9/\"])")
for f in sys.argv[1:]:
    prob, words = [], 0
    for sec in parse(Path(f)):
        for b in sec['bullets']:
            for t in [b['text'], *b['children']]:
                if b.get('codeStatements') and t in b['children'][-b['codeStatements']:]:
                    continue
                plain = t.replace('**', ''); words += len(plain.split())
                body = LABEL.sub('', plain, count=1)
                if re.search(r'[;→—–=×]', body) or re.search(r':', body): prob.append(('punct', sec['number'], plain[:80]))
                if re.search(r'squeez', plain, re.I): prob.append(('casual:squeeze', sec['number'], plain[:80]))
                m = BANNED.search(plain)
                if m: prob.append(('banned:' + m.group(), sec['number'], plain[:80]))
                for s in re.split(r'(?<=[.!?])\s+(?=[A-Z"(])', body):
                    if len(s.split()) < 5: prob.append(('short', sec['number'], s))
                if t.count('**') % 2: prob.append(('bold', sec['number'], t[:60]))
    print(f'{Path(f).stem}: words {words} problems {len(prob)}')
    for x in prob: print('  ', x)
