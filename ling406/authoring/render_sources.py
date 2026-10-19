"""Reproduce original slide visuals; never synthesize replacement illustrations."""
from pathlib import Path
import fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
KEYS=['speech1','speech2','sentence','aphasias','development1','development2','l1-critical','l2-learning','l2-sensitive','review','syllabus']
for key in KEYS:
 doc=fitz.open(ROOT/'sources'/f'{key}.pdf')
 target=ROOT/'assets/slides'/key;target.mkdir(parents=True,exist_ok=True)
 for i,page in enumerate(doc,1):
  factor=1100/page.rect.width
  pix=page.get_pixmap(matrix=fitz.Matrix(factor,factor))
  im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
  im.save(target/f'{i:02}.webp','WEBP',quality=83)
 print(key,len(doc))
