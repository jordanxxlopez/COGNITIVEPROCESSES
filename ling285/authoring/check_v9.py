"""Style and coverage checks for the slide-by-slide Version 9 notes."""
import re,sys,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BANNED=re.compile(r"\b(slides?|the lecture|in this lecture|the professor|he said|she said|this shows|shows that|illustrat\w*|demonstrat\w*|let.s|remember that|need not|lawful|the key (?:point|finding|comparison)|makes? this concrete|the (?:real )?question is|on this plot|defined below|connects back|in class|earlier|later in|next we|as you can see|turns to|we now|moving on|takeaway|note that|this means|pictured|pictures|picturing|(?:the|a|this|their|that)\s+(?:\w+\s+)?picture)\b",re.I)
# Lecture keys match the authoring file stems and the collection ids (lecture01 ... lecture05-06 ... lecture18).
LECTURES=['01','02','03','04','05-06','07','08','09','10','11','12','13','14','15','16','17','18']
MODULE={k:('module1' if int(k[:2])<=10 else 'module2') for k in LECTURES}
# Pages that may stay empty: title, blank, exam-logistics and prompt-only pages.
EMPTY_OK={'01':{1},'02':{1,2},'03':{1,2},'04':{1,2,5,17},'05-06':{1,2,8,9,14,17,20},'07':{1},'08':{1,2,12,13},'09':{1,2,5,6,7,8,9},'10':{1,2,11},
          '11':{1},'12':{1,17},'13':{1,26},'14':{1},'15':{1,5},'16':{1,6},'17':{1},'18':{1}}
for _k in list(EMPTY_OK):
  if _k.isdigit() and int(_k)>=11:EMPTY_OK[int(_k)]=EMPTY_OK[_k]  # older builders index by int
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
  LABELS='--labels' in sys.argv
  LABEL=re.compile(r"^[A-Za-z0-9/' ().,-]{1,48}: (?=[A-Z0-9/\"])")
  for f in [a for a in sys.argv[1:] if not a.startswith('--')]:
    n=Path(f).stem;pages=parse(Path(f));prob=[]
    slides=[s['page'] for s in next(c for c in data['collections'] if c['id']==f'lecture{n}')['sections']]
    missing=[p for p in slides if p not in pages and p not in EMPTY_OK[n]]
    if missing:prob.append(('content slides without notes',missing))
    if list(pages)!=sorted(pages):prob.append(('pages out of order',list(pages)))
    words=0
    for p,blocks in pages.items():
      for b in blocks:
        for t in [b['text'],*b['children']]:
          plain=t.replace('**','');words+=len(plain.split())
          body=LABEL.sub('',plain,count=1) if LABELS else plain
          if re.search(r'[:;→—–=×]',body):prob.append(('punct',p,plain[:80]))
          if LABELS and re.search(r'squeez',plain,re.I):prob.append(('casual:squeeze',p,plain[:80]))
          m=BANNED.search(plain)
          if m:prob.append(('banned:'+m.group(),p,plain[:80]))
          for s in re.split(r'(?<=[.!?])\s+(?=[A-Z"(])',plain):
            if len(s.split())<5:prob.append(('short',p,s))
          if t.count('**')%2:prob.append(('bold',p,t[:60]))
    print(f'{n}: pages {len(pages)}/{len(slides)} words {words} ~pages {round(words/500,1)} problems {len(prob)}')
    for x in prob:print('  ',x)
