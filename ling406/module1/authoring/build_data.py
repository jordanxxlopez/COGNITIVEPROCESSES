"""Compile explicitly authored page explanations and verified review mappings."""
from pathlib import Path
from copy import deepcopy
import json,re
R=Path(__file__).resolve().parents[1];A=R/'authoring'
manifest=json.loads((A/'inventory.json').read_text())
content={f.stem:json.loads(f.read_text()) for f in (A/'content').glob('*.json')}
keys=[x['key'] for x in manifest];assert set(keys)==set(content),(set(keys)-set(content))
records={}
for key in keys:
 for p in content[key]['pages']:
  assert (key,p['page']) not in records
  records[key,p['page']]=p
mappings=content['review'].get('mappings',{})
for page,ref in mappings.items():
 page=int(page);assert ('review',page) not in records
 records['review',page]=dict(deepcopy(records[ref['source'],ref['page']]),page=page,core=True)
 records[ref['source'],ref['page']]['core']=True
labels=[('psyc20','PSYC301 v20-style teaching'),('original-c-v2','Original C · Version 2'),('d-v2','D · Version 2'),('original-c-v3','Original C · Version 3')]
d={'status':'ready','revision':'LING406 Module I · source-aligned teaching · November 2026','modules':[],'sections':[],'sources':{},'editions':[{'id':k,'label':l,'scripts':{}} for k,l in labels],'questions':[],'written':[],'guide':[],'experiments':[],'media':[],'testAllocation':{},'coverage':{'reviewMappings':{str(k):f'm1-{v["source"]}-p{v["page"]:03}' for k,v in mappings.items()}}}
def sid(key,page):return f'm1-{key}-p{page:03}'
def block(text,children=()):return {'text':text,'children':list(children)}
for source in manifest:
 key=source['key'];x=content[key];ext=Path(source['file']).suffix[1:]
 title=source['original'].split(' - ',1)[1].rsplit('.',1)[0]
 title=re.sub(r'^Lecture \d+(?:-\d+)? ','',title)
 number='01–02' if key=='lecture01' else '10' if key=='review' else key[-2:]
 ids=[sid(key,n) for n in range(1,source['pages']+1)]
 d['modules'].append({'id':key,'number':number,'title':title,'source':key,'sections':ids})
 d['sources'][key]={'format':ext,'file':'sources/'+source['file'],'pdf':f'sources/{key}.pdf','original':source['original'],'pages':source['pages'],'sha256':source['sha256'],'previewStatus':'ready','driveUrl':source['driveUrl']}
 extracted=json.loads((A/'extracted'/f'{key}.json').read_text())
 for n,row in enumerate(extracted,1):
  p=records[key,n];ident=sid(key,n);c=p['c'];support=p['support'];extra=p['d'];visual=p['visual']
  if c:
   editions=[ [block(c+(' '+support[0] if support else ''),support[1:]),block(extra,[visual] if visual else []) if extra else block(visual)], [block(c,support)], [block(c,support),block(extra)], [block(c,support)]+([block(visual)] if visual else []) ]
   editions=[[b for b in bs if b['text']] for bs in editions]
  else:
   assert not support and not extra and not visual,(key,n)
   editions=[[],[],[],[]]
  for edition,blocks in zip(d['editions'],editions):
   prose=' '.join(b['text']+' '+' '.join(b['children']) for b in blocks)
   assert not re.search(r'[:;]|\bneed not\b|\blawful\b',prose,re.I),(key,n,prose)
   edition['scripts'][ident]={'status':'ready' if c else 'noninstructional','blocks':blocks,'source':key,'page':n}
  d['sections'].append({'id':ident,'module':key,'source':key,'page':n,'title':p['title'],'image':row['image'],'sourceText':row['text'],'paragraphs':[c,*support] if c else [],'core':p.get('core',False),'reviewPages':[int(rp) for rp,v in mappings.items() if v['source']==key and v['page']==n],'analysis':{'status':'authored','role':'instructional' if c else 'noninstructional'}})
 for i,q in enumerate(x['questions'],1):
  assert 1<=q['page']<=source['pages'] and len(q['choices'])==len(set(q['choices']))==4
  d['questions'].append({'id':f'm1-{key}-q{i:02}','module':key,'section':sid(key,q['page']),'kind':'concept','stem':q['stem'],'choices':q['choices'],'correct':q['correct'],'why':q['why']})
 for i,q in enumerate(x['written'],1):d['written'].append({'id':f'm1-{key}-w{i:02}','module':key,'section':sid(key,q['page']),'prompt':q['prompt'],'answer':q['answer']})
 for typ in ['guide','experiments']:
  for g in x.get(typ,[]):d[typ].append({'title':g['title'],'module':key,'sections':[sid(key,n) for n in g['pages']]})
 for m in x.get('media',[]):d['media'].append(dict(m,section=sid(key,m['page'])))
 d['testAllocation'][key]=len(x['questions'])
 assert len(x['questions'])==10 and len(x['written'])>=2,key
assert len(d['sections'])==sum(s['pages'] for s in manifest)
assert set(records)=={(s['source'],s['page']) for s in d['sections']}
(R/'data.js').write_text('window.LING406_MODULE1 = '+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n')
report={'collections':len(d['modules']),'pages':len(d['sections']),'instructionalPages':sum(bool(s['paragraphs']) for s in d['sections']),'questions':len(d['questions']),'written':len(d['written']),'reviewMappings':mappings,'sources':manifest,'editions':[{'label':e['label'],'words':sum(len((b['text']+' '+' '.join(b['children'])).split()) for s in e['scripts'].values() for b in s['blocks'])} for e in d['editions']]}
(R/'coverage-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
(R/'source-manifest.json').write_text(json.dumps(manifest,indent=2))
print({k:v for k,v in report.items() if k not in ['sources','reviewMappings']})
