"""Only add stylesheet/script tags; verify exact reversibility of both entry edits."""
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[3]
tags='<link rel="stylesheet" href="psyc301-videos/videos.css?v=1"><script src="psyc301-videos/videos.js?v=1"></script>'
report={}
for name in ['index.html','share.html']:
 p=ROOT/name;before=p.read_text()
 if tags in before:
  original=before.replace(tags,'',1)
 else:
  original=before;assert before.count('</body>')==1
  p.write_text(before.replace('</body>',tags+'</body>'))
 after=p.read_text()
 assert after.replace(tags,'',1)==original
 report[name]={'originalSha256':hashlib.sha256(original.encode()).hexdigest(),'onlyVideoTagsAdded':True}
(ROOT/'psyc301-videos/integration-validation.json').write_text(json.dumps(report,indent=2)+'\n')
