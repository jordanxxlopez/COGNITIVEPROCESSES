"""Write the Version 1–4 teaching files for weekly additions from their notes modules.

Usage: python3 ling285/authoring/build_weekly_teaching.py 16 17
Each lectureNN_notes.py supplies PAGES (five teaching paragraphs and concepts per
instructional page), ORIGINAL (the two-paragraph Version 1 text) and REUSE, a map
from pages to identical slides in an earlier deck. Reused pages copy that deck's
section from every edition unchanged. The editions follow the Lecture 15 layout.
  Version 1  ORIGINAL
  Version 2  ORIGINAL plus the last two teaching paragraphs
  Version 3  the first two teaching paragraphs joined, then the other three
  Version 4  the first two paragraphs, the middle two joined, then the last one
"""
from pathlib import Path
import importlib,json,sys
A=Path(__file__).resolve().parent
sys.path.insert(0,str(A))
REVIEW={
 16:{'method':'Reviewed every original page at 1600px, the six embedded raster assets (all shared with Lecture 15), native text, chart data and speaker notes. Twelve pages were matched to Lecture 15 slide XML and rendered pixels. Page 8 uses the deck’s own raster ink fallbacks. Scatter and accuracy values were read from the native chart series.','limitations':[]},
 17:{'method':'Reviewed every original page at 1600px, all embedded raster assets, native text and speaker notes. Every click state of pages 4–7 was exported from the original shapes and timing and inspected, because the static export overlaps the page 5 reveals.','limitations':['The small spectrogram frames and image patches on page 5 are pieces of one figure and are reviewed through the source-state exports rather than as separate figures.']},
}
def read(name):return json.loads((A/name).read_text())
def write(name,value):(A/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')

def build(n):
 key=f'lecture{n}';notes=importlib.import_module(f'lecture{n}_notes')
 pages=json.loads((A/'source-manifest.json').read_text())[key]['pages']
 earlier={}
 for v,name in [(1,'teaching-{}.json'),(2,'teaching-v2-{}.json'),(3,'teaching-v3-{}.json'),(4,'teaching-v4-{}.json')]:
  earlier[v]={k:read(name.format(k)) for k in {f'lecture{m}' for m in [15]}}
 out={v:{'title':notes.TITLE,'sections':[]} for v in (1,2,3,4)}
 for page in range(1,pages+1):
  if page in notes.REUSE:
   ref=notes.REUSE[page]
   for v in (1,2,3,4):
    source=earlier[v]['lecture15']['lecture15']['sections'][ref-1]
    assert source['page']==ref
    out[v]['sections'].append(dict(source,page=page))
   continue
  title,kind,paras,concepts=notes.PAGES[page]
  review={'pageInspected':True,'assetsInspected':True,**REVIEW[n]}
  original=notes.ORIGINAL.get(page,[])
  assert bool(paras)==bool(original),(key,page)
  if paras:assert len(paras)==5,(key,page)
  v2=original+paras[3:] if paras else []
  v3=[paras[0]+' '+paras[1],*paras[2:]] if paras else []
  v4=[paras[0],paras[1],paras[2]+' '+paras[3],paras[4]] if paras else []
  issues=getattr(notes,'ISSUES',{}).get(page,[])
  out[1]['sections'].append({'page':page,'title':title,'kind':kind,'teaching':original,'issues':issues,'review':review})
  for v,text in [(2,v2),(3,v3),(4,v4)]:
   out[v]['sections'].append({'page':page,'title':title,'kind':kind,'teaching':text,'concepts':concepts if text else [],'review':review})
 write(f'teaching-{key}.json',{key:out[1]})
 for v in (2,3,4):write(f'teaching-v{v}-{key}.json',{key:out[v]})
 print(key,pages,'pages;',sum(bool(s['teaching']) for s in out[4]['sections']),'instructional')

if __name__=='__main__':
 for n in sys.argv[1:]:build(int(n))
