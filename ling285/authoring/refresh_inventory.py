"""Refresh source-to-page and original-media provenance without claiming teaching coverage."""
from pathlib import Path,PurePosixPath
import json,hashlib,zipfile,posixpath
from lxml import etree
ROOT=Path(__file__).resolve().parents[1];A=ROOT/'authoring'
manifest=json.loads((A/'source-manifest.json').read_text())
prior={ (p['source'],p['page']):p for p in json.loads((A/'page-inventory.json').read_text()) } if (A/'page-inventory.json').exists() else {}
inventory=[]
for key,s in manifest.items():
 if s.get('status')!='downloaded':continue
 assert hashlib.sha256((ROOT/s['file']).read_bytes()).hexdigest()==s['sha256'],key
 pages=json.loads((A/'extracted'/f'{key}-pages.json').read_text())
 np=A/'extracted'/f'{key}-native.json';native=json.loads(np.read_text()) if np.exists() else []
 native_by_page={n['page']:n for n in native} if isinstance(native,list) else {}
 media={}
 if s['file'].endswith('.pptx'):
  with zipfile.ZipFile(ROOT/s['file']) as z:
   for p in pages:
    slide=f'ppt/slides/slide{p["page"]}.xml';rels=f'ppt/slides/_rels/slide{p["page"]}.xml.rels'
    ids=set()
    for node in etree.fromstring(z.read(slide)).iter():
     for attr,value in node.attrib.items():
      if attr.startswith('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'):ids.add(value)
    media[p['page']]=[]
    if rels not in z.namelist():continue
    for rel in etree.fromstring(z.read(rels)):
     if rel.get('Id') not in ids or rel.get('TargetMode')=='External':continue
     target=posixpath.normpath(posixpath.join('ppt/slides',rel.get('Target')))
     if not target.startswith('ppt/media/'):continue
     blob=z.read(target);f='authoring/embedded/'+key+'/'+PurePosixPath(target).name
     media[p['page']].append({'file':f,'sha256':hashlib.sha256(blob).hexdigest(),'relationshipType':rel.get('Type').rsplit('/',1)[-1]})
 for p in pages:
  old=prior.get((key,p['page']),{})
  inventory.append({'source':key,'page':p['page'],'role':s.get('role'),'text':p['text'],'ocr':p['ocr'],'image':p['image'],'links':p['links'],'annotations':p['annotations'],'native':native_by_page.get(p['page'],{}),'embeddedAssets':media.get(p['page'],[]),'renderedPageInspected':old.get('renderedPageInspected',False),'detailedVisualReviewComplete':old.get('detailedVisualReviewComplete',False),'teachingCoverageVerified':old.get('teachingCoverageVerified',False)})
(A/'page-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2))
print('Verified originals',len(manifest),'Inventory pages',len(inventory),'Page/media links',sum(len(p['embeddedAssets']) for p in inventory))
