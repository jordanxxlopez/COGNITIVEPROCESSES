"""Style and coverage checks for the slide-by-slide Version 9 notes."""
import re,sys,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BANNED=re.compile(r"\b(slides?|the lecture|in this lecture|the professor|he said|she said|this shows|shows that|illustrat\w*|demonstrat\w*|let.s|remember that|need not|lawful|the key (?:point|finding|comparison)|makes? this concrete|the (?:real )?question is|on this plot|defined below|connects back|in class|earlier|later in|next we|as you can see|turns to|we now|moving on|takeaway|note that|this means|pictured|pictures|picturing|(?:the|a|this|their|that)\s+(?:\w+\s+)?picture)\b",re.I)
EMPTY_OK={11:{1},12:{1,17,24},13:{1,24,26},14:{1},15:{1,5},16:{1,6},17:{1},18:{1}}
def parse(path):
  pages={};cur=None
  for ln in path.read_text().splitlines():
    m=re.match(r'## p(\d+)$',ln)
    if m:cur=int(m[1]);assert cur not in pages,(path,cur);pages[cur]=[];continue
    if not ln.strip():continue
    a=re.match(r'- (.+)$',ln);b=re.match(r'  - (.+)$',ln)
    if a:pages[cur].append({'text':a[1],'children':[]})
    elif b:pages[cur][-1]['children'].append(b[1])
    else:raise AssertionError((path.name,ln))
  return pages
if __name__=='__main__':
  data=json.load(open(ROOT/'data.json'))
  for f in sys.argv[1:]:
    n=int(Path(f).stem);pages=parse(Path(f));prob=[]
    slides=[s['page'] for s in next(c for c in data['collections'] if c['id']==f'lecture{n}')['sections']]
    missing=[p for p in slides if p not in pages and p not in EMPTY_OK[n]]
    if missing:prob.append(('content slides without notes',missing))
    if list(pages)!=sorted(pages):prob.append(('pages out of order',list(pages)))
    words=0
    for p,blocks in pages.items():
      for b in blocks:
        for t in [b['text'],*b['children']]:
          plain=t.replace('**','');words+=len(plain.split())
          if re.search(r'[:;→—–=×]',plain):prob.append(('punct',p,plain[:80]))
          m=BANNED.search(plain)
          if m:prob.append(('banned:'+m.group(),p,plain[:80]))
          for s in re.split(r'(?<=[.!?])\s+(?=[A-Z"(])',plain):
            if len(s.split())<5:prob.append(('short',p,s))
          if t.count('**')%2:prob.append(('bold',p,t[:60]))
    print(f'{n}: pages {len(pages)}/{len(slides)} words {words} ~pages {round(words/500,1)} problems {len(prob)}')
    for x in prob:print('  ',x)
