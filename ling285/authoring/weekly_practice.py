"""Shared writer for weekly practice banks, following lecture15_practice.py.

Each MCQ entry is (page, topic, pattern, Version 1 prompt, Version 2 prompt,
correct response, three (misconception, feedback) pairs). Each written entry is
(page, topic, pattern, Version 1 prompt, Version 2 prompt, model answer, rubric).
Both editions share answers and feedback but have separate prompts and saved IDs.
"""
import json,random
from pathlib import Path
A=Path(__file__).resolve().parent

def build(n,M,W):
 assert len(M)==25 and len(W)==25,(n,len(M),len(W))
 key=f'lecture{n}'
 for version in [1,2]:
  rng=random.Random(285000+n*10+version);qs=[];positions=[(i+n-15)%4 for i in range(len(M))];rng.shuffle(positions)  # each bank puts its extra answer on a different letter
  prefix=f'v2-l{n}' if version==2 else f'ling285-l{n}'
  for i,(page,topic,pattern,p1,p2,correct,wrong) in enumerate(M,1):
   assert len(wrong)==3 and correct not in [t for t,_ in wrong],(n,i)
   options=[{'text':t,'feedback':f} for t,f in wrong];rng.shuffle(options);options.insert(positions[i-1],{'text':correct,'feedback':correct})
   answer_id=None
   for label,opt in zip('abcd',options):
    opt['id']=label
    if opt['text']==correct:answer_id=label
   qs.append({'id':f'{prefix}-mcq-{i:03}','type':'mcq','moduleId':'module2','lectureId':key,'prompt':p1 if version==1 else p2,'answer':correct,
    'rubric':['Identify the source-supported relationship.','Distinguish it from the stated alternative explanations.'],'sources':[{'collection':key,'page':page}],
    'topic':topic,'pattern':pattern,'examKeyRefs':[],'examReviewRefs':[],'options':options,'correctOption':answer_id})
  for i,(page,topic,pattern,p1,p2,answer,rubric) in enumerate(W,1):
   assert len(rubric)>=2,(n,i)
   qs.append({'id':f'{prefix}-written-{i:03}','type':'written','moduleId':'module2','lectureId':key,'prompt':p1 if version==1 else p2,'answer':answer,
    'rubric':rubric,'sources':[{'collection':key,'page':page}],'topic':topic,'pattern':pattern,'examKeyRefs':[],'examReviewRefs':[]})
  name=f'practice-v2-{key}.json' if version==2 else f'module2-{key}-practice.json'
  (A/name).write_text(json.dumps({'lectureId':key,'questions':qs},ensure_ascii=False,indent=2)+'\n')
 print(key,'practice written',len(M)+len(W),'questions per edition')
