"""Static source-state exports for the Lecture 16 and 17 click animations.

Each state keeps the original slide's shapes that are visible after a given
click, following the slide's own entrance and exit timing. Nothing new is drawn.
Lecture 16 page 8 also selects the deck's own raster ink fallbacks, which
LibreOffice otherwise ignores, as was done for Lecture 15 page 7.
"""
from pathlib import Path
from lxml import etree
import zipfile,subprocess,json,fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
NS={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
MC={'mc':'http://schemas.openxmlformats.org/markup-compatibility/2006'}
TMP=Path('/tmp/ling285-weekly-stages');TMP.mkdir(parents=True,exist_ok=True)
PROFILE='-env:UserInstallation=file:///tmp/ling285-weekly-stage-profile'

def export(src,slide_no,xml,name):
 ppt=TMP/f'{name}.pptx'
 with zipfile.ZipFile(src) as z,zipfile.ZipFile(ppt,'w',zipfile.ZIP_DEFLATED) as dest:
  for item in z.infolist():
   dest.writestr(item.filename,etree.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True) if item.filename==f'ppt/slides/slide{slide_no}.xml' else z.read(item.filename))
 subprocess.run(['soffice',PROFILE,'--headless','--convert-to','pdf','--outdir',str(TMP),str(ppt)],check=True,capture_output=True,timeout=120)
 page=fitz.open(ppt.with_suffix('.pdf'))[slide_no-1]
 pix=page.get_pixmap(matrix=fitz.Matrix(1600/page.rect.width,1600/page.rect.width),alpha=False)
 return Image.frombytes('RGB',[pix.width,pix.height],pix.samples)

def clicks(xml):
 """Return the click steps as lists of (presetClass, top-level shape id)."""
 steps=[]
 for ctn in xml.iter('{%s}cTn'%NS['p']):
  kind=ctn.get('nodeType')
  if kind not in ('clickEffect','withEffect','afterEffect'):continue
  targets=sorted({t.get('spid') for t in ctn.iter('{%s}spTgt'%NS['p'])})
  if kind=='clickEffect' or not steps:steps.append([])
  steps[-1].extend((ctn.get('presetClass'),sid) for sid in targets)
 return steps

def stages(key,slide_no):
 src=ROOT/f'sources/{key}.pptx';out=ROOT/f'assets/slides/{key}/stages';out.mkdir(parents=True,exist_ok=True)
 with zipfile.ZipFile(src) as z:original=etree.fromstring(z.read(f'ppt/slides/slide{slide_no}.xml'))
 tree=original.find('p:cSld/p:spTree',NS)
 names={c.get('id'):c.get('name') for c in tree.iter('{%s}cNvPr'%NS['p'])}
 steps=clicks(original)
 hidden={sid for step in steps for cls,sid in step if cls=='entr'}
 visible={sid for sid in names if sid not in hidden};records=[]
 for stage in range(len(steps)+1):
  if stage:
   for cls,sid in steps[stage-1]:
    if cls=='entr':visible.add(sid)
    elif cls=='exit':visible.discard(sid)
  xml=etree.fromstring(etree.tostring(original));t=xml.find('p:cSld/p:spTree',NS)
  for shape in list(t):
   cn=shape.find('.//p:cNvPr',NS)
   if cn is not None and cn.get('id') in names and cn.get('id') not in visible:t.remove(shape)
  for timing in xml.findall('p:timing',NS):xml.remove(timing)
  image=export(src,slide_no,xml,f'{key}-{slide_no}-{stage}')
  target=out/f'p{slide_no:03}-stage-{stage:02}.webp';image.save(target,'WEBP',quality=93)
  shown=[names[s] for s in names if s in visible and names[s] and not names[s].startswith(('Picture','TextBox'))]
  added=[names[s] for c,s in (steps[stage-1] if stage else []) if c=='entr']
  removed=[names[s] for c,s in (steps[stage-1] if stage else []) if c=='exit']
  caption='Starting state' if not stage else 'Click '+str(stage)+' · shows '+', '.join(added)+(' · hides '+', '.join(removed) if removed else '')
  records.append({'page':slide_no,'stage':stage,'file':str(target.relative_to(ROOT)),'caption':caption,'visibleGroups':shown,
   'method':'Original slide shapes only. Shapes are shown or hidden by the slide’s own entrance and exit timing for this click; timing removed for a static source-state export. No new diagram content.'})
  print('Rendered',key,slide_no,'stage',stage,flush=True)
 return records

def ink(key,slide_no,target):
 src=ROOT/f'sources/{key}.pptx'
 with zipfile.ZipFile(src) as z:xml=etree.fromstring(z.read(f'ppt/slides/slide{slide_no}.xml'))
 for alt in xml.findall('.//mc:AlternateContent',MC):
  fallback=alt.find('mc:Fallback',MC);parent=alt.getparent();at=parent.index(alt)
  for child in list(fallback):parent.insert(at,child);at+=1
  parent.remove(alt)
 for timing in xml.findall('p:timing',NS):xml.remove(timing)
 export(src,slide_no,xml,f'{key}-{slide_no}-ink').save(ROOT/target,'WEBP',quality=93)
 print('Rendered original ink fallbacks',key,slide_no,flush=True)

if __name__=='__main__':
 ink('lecture16',8,'assets/slides/lecture16/008-ink.webp')
 records=[r for n in (4,5,6,7) for r in stages('lecture17',n)]
 (ROOT/'authoring/extracted/lecture17-animation-stages.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
