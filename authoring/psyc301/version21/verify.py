"""Verify PSYC301 Version 21 coverage, writing rules and that earlier editions are unchanged."""
import hashlib,json,re,runpy
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
H=runpy.run_path(str(HERE/'build.py'))
load=lambda p:json.loads((ROOT/p).read_text().split(' = ',1)[1].rstrip(';\n'))
V=load('psyc301-v21-data.js');V20=load('psyc301-v20-data.js');C=json.loads((HERE/'coverage.json').read_text())
assert V['scope']==V20['scope']==[6,9,10,11,12] and list(V['scripts'])==list(V20['scripts'])
assert sum(bool(b)for b in V['scripts'].values())==C['teachingPages']==141
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
 'psyc301-v6-data.js':'3c751a5d05a6fed16eb16b18b485427c6382103951ec4464844380e774dd4dff',
 'psyc301-v6.js':'ef2183c4d0fcba164b9c530c7eb9daee8a0e1be1abefb52e1b25b2c7270a40f8',
 'psyc301-v6.css':'372d2df6beca09d4807741708e60ecbb268e0aa71d9350cd44c76418205b221c',
 'psyc301-v10-data.js':'181ef950d361c428969349dcaf6da0e16a2f02c02141ea16efd719ca62875eff',
 'psyc301-v10.js':'a4a9973d098910e4eac08d35d2b3e7015fd78e11b6ed8b98bbbfc69e40f1d12a',
 'psyc301-v10.css':'84461cfd3a801fdbadec18c494a2e4152dcd357d5760ae3c3cab0b06901b4b5c',
 'psyc301-v12-data.js':'e733ccec6064e7c68169264ef5c10b958afc9eb3bb3df910556cc9eb053871df',
 'psyc301-v12.js':'654c1b18709818be2a25916151cd77adf572a774267b9e047292c79f717dc3c2',
 'psyc301-v14-data.js':'686fe836d251513ed9d5868c8a1ee64417511eafa4bf7546fed2d4fd34670a47',
 'psyc301-v14.js':'1292ca713d1d0090b4ead1d84863e31c07ec088cacf19dc547ce75a520240a2a',
 'psyc301-v16-data.js':'ad36d4403d2d022257c09d649c4abea2dec56c2c2140fd0d9e3588f4552eb8b7',
 'psyc301-v16.js':'63d1eabda74b15d2103010e0aa4c04f641ea412cda74499d1af15de7e49ddab8',
 'psyc301-v18-data.js':'159824e57d0e8f3ad17403406d7b9ae1aaee51a20a4fb5694c0a3ffbdf70b62a',
 'psyc301-v18.js':'3f4d3d2d65ea6d0e46b59a7bdb236d835a8f5858c1ddf7176ec5badceeeb3090',
 'psyc301-v20-data.js':'1d65907f2e41d6cdaf578c2f5f54a6128a1678cabba4b1da7d2bd15e2b9a5f36',
 'psyc301-v20.js':'bf60b423c9e0920c1e7acdbe820f27b7c8075dd379602d9868400dbd4617c661',
 'module2-data.js':'849e09d7a5de2ac985d3cbbb0d99749ef1f9cde2d7ef97214ade688041523133',
 'module2-workspace.js':'1d40f498dcbce69acf5c9b00e09512234519f2d5984934a84cf01ba4bff2dfda'
}
for name,digest in KEPT.items():assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest,name
for name in ['index.html','share.html']:
 text=(ROOT/name).read_text()
 assert text.index('psyc301-v20.js')<text.index('psyc301-v21-data.js')<text.index('psyc301-v21.js?'),name
 assert 'psyc301-v21.css' in text,name
print(f"PASS PSYC301 V21: {C['teachingPages']} teaching pages, {C['words']:,} words, writing rules verified, earlier editions unchanged.")
