from pathlib import Path
import fitz,json,hashlib,re
from PIL import Image,ImageDraw
from pptx import Presentation
R=Path(__file__).resolve().parents[1];A=R/'authoring'; (A/'extracted').mkdir(exist_ok=True)
manifest=json.loads((R/'source-downloads.json').read_text()); inventory=[]
for f in sorted(manifest,key=lambda f: f['key']):
 key=f['key'];doc=fitz.open(R/'sources'/f'{key}.pdf');out=R/'assets'/key;out.mkdir(parents=True,exist_ok=True)
 rows=[];thumbs=[]
 for i,page in enumerate(doc,1):
  pix=page.get_pixmap(matrix=fitz.Matrix(1.7,1.7),alpha=False);im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);im.save(out/f'{i:03}.webp','WEBP',quality=84)
  text=page.get_text(sort=False); row={'page':i,'text':text,'links':[l.get('uri') for l in page.get_links() if l.get('uri')],'image':f'assets/{key}/{i:03}.webp'};rows.append(row)
  thumb=im.copy();thumb.thumbnail((480,340));tile=Image.new('RGB',(500,370),'white');tile.paste(thumb,(10,25));ImageDraw.Draw(tile).text((10,5),f'{key} page {i}',fill='black');thumbs.append(tile)
  # Retain embedded raster assets for inspection separately from original page views.
  for j,x in enumerate(page.get_images(full=True)):
   d=doc.extract_image(x[0]);dest=Path('/tmp/ling406-m1-images')/key;dest.mkdir(parents=True,exist_ok=True);(dest/f'{i:03}-{j}.{d["ext"]}').write_bytes(d['image'])
 for start in range(0,len(thumbs),8):
  sheet=Image.new('RGB',(1000,370*4),'#ddd')
  for j,t in enumerate(thumbs[start:start+8]):sheet.paste(t,((j%2)*500,(j//2)*370))
  sheet.save(A/'extracted'/f'{key}-sheet-{start//8+1}.jpg',quality=88)
 if f['file'].endswith('.pptx'):
  prs=Presentation(R/'sources'/f['file']);assert len(prs.slides)==len(rows)
  for row,slide in zip(rows,prs.slides):
   row['pptxText']='\n'.join(sh.text for sh in slide.shapes if sh.has_text_frame)
   row['speakerNotes']=slide.notes_slide.notes_text_frame.text if slide.has_notes_slide else ''
 (A/'extracted'/f'{key}.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 (A/'extracted'/f'{key}.txt').write_text('\n\n'.join(f'PAGE {r["page"]}\n{r["text"]}\nNOTES {r.get("speakerNotes","")}' for r in rows))
 inventory.append({'key':key,'pages':len(rows),'original':f['title'],'file':f['file'],'sha256':hashlib.sha256((R/'sources'/f['file']).read_bytes()).hexdigest(),'driveId':f['id'],'driveUrl':f['url']})
 print(key,len(rows),flush=True)
(A/'inventory.json').write_text(json.dumps(inventory,indent=2))
