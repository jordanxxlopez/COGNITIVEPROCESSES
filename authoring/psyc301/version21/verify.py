"""Verify PSYC301 Version 21 coverage, writing rules and that earlier editions are unchanged."""
import hashlib,json,re,runpy
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
H=runpy.run_path(str(HERE/'build.py'))
load=lambda p:json.loads((ROOT/p).read_text().split(' = ',1)[1].rstrip(';\n'))
V=load('psyc301-v21-data.js');V20=load('psyc301-v20-data.js');C=json.loads((HERE/'coverage.json').read_text())
assert V['scope']==V20['scope']==[6,9,10,11,12,13] and list(V['scripts'])==list(V20['scripts'])
assert sum(bool(b)for b in V['scripts'].values())==C['teachingPages']==167
# The writing check must reject figures, years, heading fragments and stacked short sentences.
for bad in ['One neuron. Vector in, one number out.','Sperling found that 82% of letters were available. It faded fast.','Brown (1958) ran the study first. Others repeated it later on.','**Storage.** Information is kept on hand for a short time while we work.','It is brief. It is small. It fades. It is gone now.']:
 assert H['problems'](bad,False),bad
errors=[]
for key,blocks in V['scripts'].items():
 assert bool(blocks)==bool(V20['scripts'][key]),key
 for b in blocks:
  for t,child in [(b['text'],False),*[(c,True)for c in b['children']]]:
   errors+=[f'{key} {e}' for e in H['problems'](t,child)]
assert not errors,'\n'.join(errors)
# Earlier editions and studio data stay byte-for-byte as they were when Version 21 was added.
KEPT={
 'psyc301-v6-data.js':'bd195e0154ecf2dcef73fe9d4e32f5fd35b4bff7b47b30344fa68828558ad634',
 'psyc301-v6.js':'ef2183c4d0fcba164b9c530c7eb9daee8a0e1be1abefb52e1b25b2c7270a40f8',
 'psyc301-v6.css':'372d2df6beca09d4807741708e60ecbb268e0aa71d9350cd44c76418205b221c',
 'psyc301-v10-data.js':'5b9fffa31a6a81f756dd52305ffcfc1893338b9f5a40966839a492831c8ab82d',
 'psyc301-v10.js':'a4a9973d098910e4eac08d35d2b3e7015fd78e11b6ed8b98bbbfc69e40f1d12a',
 'psyc301-v10.css':'84461cfd3a801fdbadec18c494a2e4152dcd357d5760ae3c3cab0b06901b4b5c',
 'psyc301-v12-data.js':'7d824235e0e890e4850e5aa6c8c1681cd8581e276df6a8f0c85a8c98e15e4990',
 'psyc301-v12.js':'654c1b18709818be2a25916151cd77adf572a774267b9e047292c79f717dc3c2',
 'psyc301-v14-data.js':'5d3c8483cae940a59a1b75027e4096a83695a310808baa95228110543db599e4',
 'psyc301-v14.js':'1292ca713d1d0090b4ead1d84863e31c07ec088cacf19dc547ce75a520240a2a',
 'psyc301-v16-data.js':'9fb13e77ea81b5fab42b1537a0d7dc2e8ba15651aee158ce3a5cbc32b76707a0',
 'psyc301-v16.js':'63d1eabda74b15d2103010e0aa4c04f641ea412cda74499d1af15de7e49ddab8',
 'psyc301-v18-data.js':'d1d9cd3de8f08dce9506a1f02e1c81e80712ecea42436ceebcf745ca3a820f2d',
 'psyc301-v18.js':'3f4d3d2d65ea6d0e46b59a7bdb236d835a8f5858c1ddf7176ec5badceeeb3090',
 'psyc301-v20-data.js':'2e018a5e49e65f8daae0cbf38b1d9a0501b21ece4b6b68e8022344f6c526c23d',
 'psyc301-v20.js':'bf60b423c9e0920c1e7acdbe820f27b7c8075dd379602d9868400dbd4617c661',
 'module2-data.js':'70f1379056a127633e6a57b07b326e90cbcf325a2a634ee5815309add4e81708',
 'module2-workspace.js':'26529dc71bd531198046e321255d4d1ce1a4dcdc84594f1d297fafc8320b1fc8'
}
for name,digest in KEPT.items():assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest,name
for name in ['index.html','share.html']:
 text=(ROOT/name).read_text()
 assert text.index('psyc301-v20.js')<text.index('psyc301-v21-data.js')<text.index('psyc301-v21.js?'),name
 assert 'psyc301-v21.css' in text,name
print(f"PASS PSYC301 V21: {C['teachingPages']} teaching pages, {C['words']:,} words, writing rules verified, earlier editions unchanged.")
