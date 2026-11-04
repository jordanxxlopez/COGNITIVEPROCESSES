"""Check additive preservation, exact slide mappings, provenance and full audio decode."""
from pathlib import Path
import json,hashlib,subprocess,concurrent.futures
R=Path(__file__).resolve().parents[2];D=R/'ling406';A=D/'audio';B=A/'authoring';h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
baseline=json.load(open(B/'preservation-baseline.json'));allowed=set(baseline['authorized_existing_file_changes']);preserved=[]
for name,sha in baseline['files'].items():
 if name in allowed:continue
 assert h(R/name)==sha,name;preserved.append(name)
m=json.load(open(A/'manifest.json'));assert all(c['file'].startswith('audio/clips/')for c in m['clips'].values());provenance={c['id']:c for c in json.load(open(B/'audio-provenance.json'))};assert set(provenance)==set(m['clips']);raw=(D/'audio-examples-data.js').read_text();assert json.loads(raw[raw.index('=')+1:].rstrip(';\n'))==m
canon=json.loads(subprocess.check_output(['node','-e',"global.window={};require('./ling406/data.js');require('./ling406/transcripts-v3-data.js');process.stdout.write(JSON.stringify({s:window.LING406.sections,r:window.LING406_TRANSCRIPTS_V3.review}))"],cwd=R,text=True));valid={s['id']for s in canon['s']+canon['r']};assert set(m['sections'])<=valid
for sid,ids in m['sections'].items():assert len(ids)==len(set(ids))and set(ids)<=set(m['clips']),sid
used={id for ids in m['sections'].values()for id in ids};assert used==set(m['clips'])
checks=[]
def check(z):
 id,clip=z;p=D/clip['file'];assert h(p)==provenance[id]['sha256'];assert clip.get('kind') and clip.get('note') and clip.get('reference');subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','null','-'],check=True,capture_output=True);probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(p)]));assert any(s['codec_type']=='audio'for s in probe['streams']);return {'id':id,'seconds':float(probe['format']['duration']),'bytes':p.stat().st_size,'sha256':h(p),'full_decode':True}
with concurrent.futures.ThreadPoolExecutor(4)as pool:checks=list(pool.map(check,m['clips'].items()))
assert m['clips']['horse-garden-path']['spokenText']=='The horse raced past the barn fell.';assert m['clips']['apple-instruction']['spokenText']=='Put the apple on the towel in the box.';assert m['clips']['gjt-pig']['spokenText']=='The farmer bought two pig at the market.'
report={'passed':True,'baseline_commit':baseline['baseline_commit'],'preexisting_files_preserved':len(preserved),'authorized_integration_files':sorted(allowed),'unique_recordings':len(checks),'slide_placements':len(m['sections']),'total_audio_bytes':sum(c['bytes']for c in checks),'not_a_native_speaker_or_perceptual_validation':True,'recordings':checks};(A/'validation.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS',len(preserved),'pre-existing files unchanged;',len(checks),'full audio decodes;',len(m['sections']),'valid slide mappings')
