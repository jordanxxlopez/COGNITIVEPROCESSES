"""Inventory source content and original visuals before any teaching authoring."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
import argparse,hashlib,json,shutil,subprocess,zipfile,io
import fitz
from pptx import Presentation
from docx import Document
from PIL import Image,ImageOps,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'authoring';SOURCES=ROOT/'sources';SLIDES=ROOT/'assets/slides'
for p in [SOURCES,SLIDES,OUT/'extracted',OUT/'embedded',OUT/'review-grids']:p.mkdir(parents=True,exist_ok=True)
inputs=json.loads((OUT/'upload-manifest.json').read_text())
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--only', nargs='+', help='Add or refresh these source keys while preserving all other extracted sources.')
selected=parser.parse_args().only
manifest=json.loads((OUT/'source-manifest.json').read_text()) if selected else {}
all_embedded=[a for a in json.loads((OUT/'embedded-manifest.json').read_text()) if a['source'] not in selected] if selected else []
if selected:
 unknown=set(selected)-{item['key'] for item in inputs}
 if unknown:raise ValueError(f'Unknown source keys: {sorted(unknown)}')
 inputs=[item for item in inputs if item['key'] in selected]
def sha(data):return hashlib.sha256(data).hexdigest()
def resolve_source(item,sources):
 """Use the preserved original when a session-specific upload path is gone."""
 uploaded=Path(item['path']) if item.get('path') else None
 original=item.get('original') or item.get('filename') or item.get('fileName') or (uploaded.name if uploaded else None)
 if not original:
  raise ValueError(f"No original filename is recorded for {item['key']}")
 dest=sources/(item['key']+Path(original).suffix.lower())
 src=uploaded if uploaded and uploaded.is_file() else dest
 if not src.is_file():
  raise FileNotFoundError(f"Source {item['key']} is unavailable at its upload path and at {dest}")
 return src,dest,original
def shapes_text(shapes):
 rows=[]
 for shape in shapes:
  if shape.has_text_frame:rows.append({'type':'text','text':shape.text,'bounds':[shape.left,shape.top,shape.width,shape.height]})
  if shape.has_table:rows.append({'type':'table','rows':[[cell.text for cell in row.cells] for row in shape.table.rows]})
  if shape.shape_type==6:rows.extend(shapes_text(shape.shapes))
  if getattr(shape,'has_chart',False):rows.append({'type':'chart','xml':shape.chart._chartSpace.xml})
  for attr in ['descr','title']:
   for node in shape._element.iter():
    if node.get(attr):rows.append({'type':'accessibility-'+attr,'text':node.get(attr)})
 return rows
for item in inputs:
 key=item['key']
 if not any(item.get(field) for field in ['path','original','filename','fileName']):manifest[key]=item;continue
 src,dest,original=resolve_source(item,SOURCES)
 if not dest.exists() or not src.samefile(dest):shutil.copy2(src,dest)
 data=dest.read_bytes();entry={'key':key,'original':original,'file':'sources/'+dest.name,'sha256':sha(data),'bytes':len(data),'status':'downloaded','role':'lecture' if key.startswith('lecture') else 'style-reference' if key=='ling406-reference' else 'review' if key.startswith('exam-review') else 'syllabus' if key=='syllabus' else 'supplemental-notes'}
 if dest.suffix=='.pptx':
  prs=Presentation(dest);native=[]
  for i,slide in enumerate(prs.slides,1):
   native.append({'page':i,'shapes':shapes_text(slide.shapes),'speakerNotes':slide.notes_slide.notes_text_frame.text if slide.has_notes_slide else ''})
  entry['slides']=len(native)
  with zipfile.ZipFile(dest) as z:
   for name in z.namelist():
    if name.startswith('ppt/media/') and not name.endswith('/'):
     blob=z.read(name);target=OUT/'embedded'/key/Path(name).name;target.parent.mkdir(exist_ok=True);target.write_bytes(blob);all_embedded.append({'source':key,'file':str(target.relative_to(ROOT)),'original':name,'sha256':sha(blob),'bytes':len(blob)})
  (OUT/'extracted'/f'{key}-native.json').write_text(json.dumps(native,ensure_ascii=False,indent=2,default=str))
 elif dest.suffix=='.docx':
  doc=Document(dest);native={'paragraphs':[p.text for p in doc.paragraphs],'tables':[[[cell.text for cell in row.cells] for row in t.rows] for t in doc.tables],'xml':doc._element.xml}
  (OUT/'extracted'/f'{key}-native.json').write_text(json.dumps(native,ensure_ascii=False,indent=2,default=str))
 manifest[key]=entry
(OUT/'source-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2,default=str))
print('Native extraction complete:',len(manifest),'source entries',flush=True)
def convert(item):
 key,entry=item;p=ROOT/entry['file']
 if p.suffix=='.pdf' or (SOURCES/(key+'.pdf')).exists():return key,True
 r=subprocess.run(['soffice','--headless','--convert-to','pdf','--outdir',str(SOURCES),str(p)],capture_output=True,text=True,timeout=180)
 return key,(SOURCES/(key+'.pdf')).exists(),r.stdout,r.stderr
jobs=[(k,e) for k,e in manifest.items() if e.get('file') and (not selected or k in selected)]
with ThreadPoolExecutor(max_workers=2) as pool:
 for f in as_completed([pool.submit(convert,j) for j in jobs]):print('Converted',f.result(),flush=True)
for key,entry in manifest.items():
 if selected and key not in selected:continue
 pdf=SOURCES/(key+'.pdf')
 if not pdf.exists():continue
 doc=fitz.open(pdf);pages=[]
 entry['pages']=len(doc);entry['rendered_pdf']='sources/'+pdf.name;entry['rendered_pdf_sha256']=sha(pdf.read_bytes())
 target=SLIDES/key;target.mkdir(parents=True,exist_ok=True)
 for i,page in enumerate(doc,1):
  text=page.get_text(sort=True);blocks=page.get_text('dict')
  links=page.get_links();annots=[a.info for a in page.annots()] if page.first_annot else []
  factor=1600/page.rect.width;pix=page.get_pixmap(matrix=fitz.Matrix(factor,factor),alpha=False)
  image=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);path=target/f'{i:03}.webp';image.save(path,'WEBP',quality=91)
  if len(text.strip())<30:
   temp=OUT/'extracted'/f'{key}-{i:03}-ocr.png';image.save(temp)
   r=subprocess.run(['tesseract',str(temp),'stdout','--psm','3'],capture_output=True,text=True,timeout=40)
   ocr=r.stdout.strip();temp.unlink()
  else:ocr=''
  pages.append({'page':i,'text':text,'ocr':ocr,'image':str(path.relative_to(ROOT)),'links':links,'annotations':annots,'size':[page.rect.width,page.rect.height],'visualReviewed':False})
  if not entry.get('slides'):
   for info in page.get_images(full=True):
    xref=info[0];blob=doc.extract_image(xref);name=f'page{i:03}-xref{xref}.{blob["ext"]}';p=OUT/'embedded'/key/name;p.parent.mkdir(exist_ok=True);p.write_bytes(blob['image']);all_embedded.append({'source':key,'page':i,'file':str(p.relative_to(ROOT)),'sha256':sha(blob['image']),'bytes':len(blob['image'])})
 (OUT/'extracted'/f'{key}-pages.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2,default=str))
 # Four full-resolution page thumbnails per grid, labeled with original page IDs.
 for start in range(0,len(pages),4):
  subset=pages[start:start+4];thumbs=[]
  for record in subset:
   im=Image.open(ROOT/record['image']);im.thumbnail((1100,820));panel=Image.new('RGB',(1120,855),'#eeeeee');ImageDraw.Draw(panel).text((12,8),f'{key} — page {record["page"]}',fill='black');panel.paste(im,((1120-im.width)//2,30));thumbs.append(panel)
  grid=Image.new('RGB',(2240,1710),'#cccccc')
  for j,im in enumerate(thumbs):grid.paste(im,((j%2)*1120,(j//2)*855))
  grid.save(OUT/'review-grids'/f'{key}-{start+1:03}-{start+len(subset):03}.jpg',quality=91)
 print('Rendered',key,len(pages),'pages',flush=True)
(OUT/'source-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2,default=str));(OUT/'embedded-manifest.json').write_text(json.dumps(all_embedded,ensure_ascii=False,indent=2,default=str))
print('COMPLETE',sum(e.get('pages',0) for e in manifest.values()),'rendered pages;',len(all_embedded),'embedded assets',flush=True)
