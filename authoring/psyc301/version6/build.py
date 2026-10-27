"""Build an additive PSYC301 edition from individually authored slide explanations."""
import hashlib,json,re
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def words(paragraphs):return len(re.sub(r'\*\*','', ' '.join(paragraphs)).split())
def build():
 source=json.loads((HERE/'source-pages.json').read_text());scripts={};coverage={}
 for m in source['modules']:
  rows={}
  for row in (HERE/(m['collection']+'.txt')).read_text().splitlines():
   if not row:continue
   page,text=row.split('|',1);page=int(page);assert page not in rows
   rows[page]=[x.strip()for x in text.split(' || ')]if text else []
  assert sorted(rows)==[p['page']for p in m['pages']],m['id']
  for page in m['pages']:
   key=str(m['id'])+':'+str(page['page']);blocks=rows[page['page']]
   assert bool(blocks)==(page['role']=='teaching'),key
   for text in blocks:
    assert text.count('**')%2==0,key
    assert not re.search(r'[:;→]|\bneed not\b|\b(?:the|this) lecture\b|\b(?:this slide|next slide|this shows|this illustrates|this demonstrates|the key takeaway|as you can see|from here|later experiments|the next step)\b',text,re.I),(key,text)
   scripts[key]=blocks
   coverage[key]={'collection':m['collection'],'page':page['page'],'role':page['role'],'paragraphs':len(blocks),'words':words(blocks),'authorFile':'authoring/psyc301/version6/'+m['collection']+'.txt'}
 mathSpeech={
  r'43\times6=258':'forty-three times six equals two hundred fifty-eight',
  r'3\times6=18':'three times six equals eighteen',
  r'6\times4=24,\qquad24+1=25':'six times four equals twenty-four, and twenty-four plus one equals twenty-five',
  r'x=r':'x equals r',
  r'3(2+3)=15':'three times the sum of two and three equals fifteen',
  r'B-A-2C=127-21-2(3)=100':'B minus A minus twice C equals one hundred twenty-seven minus twenty-one minus twice three, giving one hundred',
  r'A+C=15+3=18':'A plus C equals fifteen plus three, giving eighteen',
  r'A-C=28-3=25':'A minus C equals twenty-eight minus three, giving twenty-five',
  r'\frac{1}{10}=0.10,\qquad\frac{7}{100}=0.07':'one divided by ten equals zero point one, while seven divided by one hundred equals zero point zero seven',
  r'U(\mathrm{not\ reroute})=100-1000=-900':'utility of not rerouting equals one hundred minus one thousand, giving negative nine hundred',
  r'U(\mathrm{reroute})=1000-100=900':'utility of rerouting equals one thousand minus one hundred, giving nine hundred',
 }
 for key,blocks in scripts.items():
  for p in blocks:
   assert p.count('\\[')==p.count('\\]'),key
   for eq in re.findall(r'\\\[(.*?)\\\]',p):assert eq in mathSpeech,(key,eq)
 payload={'version':6,'revision':'psyc301-module2-v6','scope':[6,9,10,11,12],'scripts':scripts,'mathSpeech':mathSpeech}
 (ROOT/'psyc301-v6-data.js').write_text('window.PSYC301_V6 = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n')
 report={'version':6,'scope':source['scope'],'sourcePages':len(scripts),'teachingPages':sum(bool(x)for x in scripts.values()),'words':sum(words(x)for x in scripts.values()),'guidelines':'Natural detailed teaching per source slide. Define necessary terms, teach tasks and mechanisms directly, retain essential quantitative contrasts, avoid incidental figure detail and presentation narration. Title/divider and link-only pages remain visible without invented explanations. Earlier versions are not rewritten.','pages':coverage}
 (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print({k:report[k]for k in ['sourcePages','teachingPages','words']})
if __name__=='__main__':build()
