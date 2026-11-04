from pathlib import Path
from lxml import etree
import zipfile,re,subprocess,fitz,json
from PIL import Image
root=Path(__file__).resolve().parents[1];src=root/'sources/lecture15.pptx';out=root/'assets/slides/lecture15/stages';out.mkdir(exist_ok=True)
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
Path('/tmp/ling285-l15-stages').mkdir(parents=True,exist_ok=True)
records=[]
with zipfile.ZipFile(src) as z:
 original=etree.fromstring(z.read('ppt/slides/slide12.xml'))
 for stage in range(10):
  xml=etree.fromstring(etree.tostring(original));tree=xml.find('p:cSld/p:spTree',ns)
  kept=[]
  for sp in list(tree):
   cn=sp.find('.//p:cNvPr',ns)
   if cn is None:continue
   name=cn.get('name','');m=re.match(r'stage-(\d+)-',name)
   if m and int(m[1])!=stage:tree.remove(sp)
   else:kept.append({'id':cn.get('id'),'name':name})
  for timing in xml.findall('p:timing',ns):xml.remove(timing)
  ppt=Path(f'/tmp/ling285-l15-stages/state-{stage}.pptx')
  with zipfile.ZipFile(ppt,'w',zipfile.ZIP_DEFLATED)as dest:
   for item in z.infolist():dest.writestr(item.filename,etree.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True)if item.filename=='ppt/slides/slide12.xml'else z.read(item.filename))
  subprocess.run(['soffice','-env:UserInstallation=file:///tmp/ling285-l15-stage-profile','--headless','--convert-to','pdf','--outdir',str(ppt.parent),str(ppt)],check=True,capture_output=True,timeout=90)
  pdf=fitz.open(ppt.with_suffix('.pdf'));p=pdf[11];pix=p.get_pixmap(matrix=fitz.Matrix(1600/p.rect.width,1600/p.rect.width),alpha=False)
  target=out/f'sigmoid-{stage:02}.webp';Image.frombytes('RGB',[pix.width,pix.height],pix.samples).save(target,'WEBP',quality=93)
  caption=''.join(xml.xpath(f'.//p:sp[p:nvSpPr/p:cNvPr[@name="stage-{stage}-caption"]]//a:t/text()',namespaces=ns))
  records.append({'page':12,'stage':stage,'file':str(target.relative_to(root)),'caption':caption,'sourceShapes':kept,'method':'Original slide12 shapes only. Retain common shapes and the named stage; remove other stage groups and timing for a static source-state export. No new diagram content.'})
  print('Rendered source stage',stage,flush=True)
(root/'authoring/extracted/lecture15-animation-stages.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')

# PowerPoint ink is stored with a raster fallback. LibreOffice ignores the
# unsupported Choice, so select the deck's own Fallback pictures for page 7.
with zipfile.ZipFile(src) as z:
 xml=etree.fromstring(z.read('ppt/slides/slide7.xml'))
 mc={'mc':'http://schemas.openxmlformats.org/markup-compatibility/2006'}
 for alt in xml.findall('.//mc:AlternateContent',mc):
  fallback=alt.find('mc:Fallback',mc); parent=alt.getparent();at=parent.index(alt)
  for child in list(fallback):parent.insert(at,child);at+=1
  parent.remove(alt)
 for timing in xml.findall('p:timing',ns):xml.remove(timing)
 ppt=Path('/tmp/ling285-l15-stages/ink.pptx')
 with zipfile.ZipFile(ppt,'w',zipfile.ZIP_DEFLATED)as dest:
  for item in z.infolist():dest.writestr(item.filename,etree.tostring(xml,xml_declaration=True,encoding='UTF-8',standalone=True)if item.filename=='ppt/slides/slide7.xml'else z.read(item.filename))
 subprocess.run(['soffice','-env:UserInstallation=file:///tmp/ling285-l15-stage-profile','--headless','--convert-to','pdf','--outdir',str(ppt.parent),str(ppt)],check=True,capture_output=True,timeout=90)
 pdf=fitz.open(ppt.with_suffix('.pdf'));p=pdf[6];pix=p.get_pixmap(matrix=fitz.Matrix(1600/p.rect.width,1600/p.rect.width),alpha=False)
 Image.frombytes('RGB',[pix.width,pix.height],pix.samples).save(root/'assets/slides/lecture15/007-ink.webp','WEBP',quality=93)
 print('Rendered original ink fallbacks',flush=True)
