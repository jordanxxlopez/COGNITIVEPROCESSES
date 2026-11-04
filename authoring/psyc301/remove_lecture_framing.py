"""Replace source-narration wording only in existing PSYC301 transcripts."""
import json,re,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
REPLACEMENTS={
 'the lecture describes a <strong>nine-month-old</strong> becoming':'a <strong>nine-month-old</strong> becomes',
 "The lecture notes that roughly half the primate cortex is devoted to vision and contrasts rapid human recognition with persistent difficulties in machine perception.":'Roughly half the primate cortex is devoted to vision, while rapid human recognition contrasts with persistent difficulties in machine perception.',
 "The lecture contrasts humans&#x27; flexibility with networks that may produce confident errors when the input departs from training conditions.":"Humans&#x27; flexibility contrasts with networks that may produce confident errors when the input departs from training conditions.",
 "The lecture&#x27;s synthesis is that construction is <strong>constrained by reliable environmental information</strong>":'Perceptual construction is <strong>constrained by reliable environmental information</strong>',
 'The lecture gives approximately <strong>36 geons</strong>':'There are approximately <strong>36 geons</strong>',
 'The lecture connects frequent orientations in both <strong>natural environments and buildings</strong> with a greater representation of those orientations in cortical tuning.':'Frequent orientations in both <strong>natural environments and buildings</strong> are associated with a greater representation of those orientations in cortical tuning.',
 "The lecture&#x27;s <strong>Segall et al. (1966)</strong> example reports that":'<strong>Segall et al. (1966)</strong> reported that',
 'After training, the lecture reports an FFA response to Greebles comparable to its response to faces.':'After training, the FFA response to Greebles is comparable to its response to faces.',
 '; the lecture extends the point to <strong>kangaroos</strong>.':'; movement also supports recognition of <strong>kangaroos</strong>.',
 'The lecture reports that after about <strong>600 trials</strong>, performance in the practiced task had become relatively <strong>automatic</strong>.':'After about <strong>600 trials</strong>, performance in the practiced task had become relatively <strong>automatic</strong>.',
 'The lecture emphasizes that a sufficiently difficult task may continue to require attention despite practice.':'A sufficiently difficult task may continue to require attention despite practice.',
 'The lecture credits <strong>Charlie Klauer, Ph.D.</strong> and describes a quasi-experimental approach: observe naturally occurring conflicts, then examine what preceded them.':'The quasi-experimental approach associated with <strong>Charlie Klauer, Ph.D.</strong> observes naturally occurring conflicts and examines what preceded them.',
 'The lecture credits <strong>Charlie Klauer, Ph.D.</strong>.':'<strong>Charlie Klauer, Ph.D.</strong> is associated with this research.',
 'The lecture credits <strong>Charlie Klauer, Ph.D.</strong>':'<strong>Charlie Klauer, Ph.D.</strong> is associated with this research.',
 '; the lecture reports that only <strong>10% noticed it</strong>.':'; only <strong>10% noticed it</strong>.',
 'The lecture reports <strong>illusory conjunctions on 18% of trials</strong> in this example.':'<strong>Illusory conjunctions occurred on 18% of trials</strong> in this example.',
 'The lecture reports <strong>100% accuracy in the studied conditions</strong>.':'The classifiers achieved <strong>100% accuracy in the studied conditions</strong>.',
 "This connects the lecture&#x27;s examples: selective listening, missed events, feature binding, and neural enhancement all concern consequences of prioritizing some information.":'Selective listening, missed events, feature binding, and neural enhancement all concern consequences of prioritizing some information.',
 'The lecture notes that well-read adults can understand <strong>more than 50,000 words</strong>.':'Well-read adults can understand <strong>more than 50,000 words</strong>.',
 "The lecture contrasts <strong>Broca&#x27;s area in the frontal lobe</strong> and <strong>Wernicke&#x27;s area in the temporal lobe</strong>.":"<strong>Broca&#x27;s area is in the frontal lobe</strong>, whereas <strong>Wernicke&#x27;s area is in the temporal lobe</strong>.",
 'The lecture associates <strong>N400</strong> with semantic processing and temporal structures, and <strong>P600</strong> with syntactic processing or reanalysis and frontal structures. It notes reductions after damage to the respective broad regions.':'<strong>N400</strong> is associated with semantic processing and temporal structures, and <strong>P600</strong> with syntactic processing or reanalysis and frontal structures. Damage to the respective broad regions is associated with reductions in these responses.',
 "The lecture reports matching the confederate&#x27;s <strong>syntactic form on 78% of trials</strong> in this example.":"Participants matched the confederate&#x27;s <strong>syntactic form on 78% of trials</strong> in this example.",
 'The lecture also notes geographically dispersed examples in <strong>Bali and Queensland</strong>.':'Absolute spatial systems also occur in geographically dispersed communities in <strong>Bali and Queensland</strong>.',
 "The lecture locates Chomsky&#x27;s formal approach mainly at the computational level.":"Chomsky&#x27;s formal approach operates mainly at the computational level.",
 "The lecture places Chomsky&#x27;s formal language approach mainly at the computational level.":"Chomsky&#x27;s formal language approach operates mainly at the computational level.",
 "The lecture contrasts this with substrate-sensitive approaches. Its chronology note matters: <strong>Chomsky&#x27;s critique preceded Marr&#x27;s framework by about a decade</strong>.":"Substrate-sensitive approaches take the physical implementation into account. <strong>Chomsky&#x27;s critique preceded Marr&#x27;s framework by about a decade</strong>.",
 'The lecture relates span to the amount of verbal material that can be said in about <strong>1.5–2 seconds</strong>.':'Span is related to the amount of verbal material that can be said in about <strong>1.5–2 seconds</strong>.',
 'The <strong>phonological similarity effect is also reduced</strong> in the situation described in the lecture.':'The <strong>phonological similarity effect is also reduced</strong> under these conditions.',
 'The lecture describes the <strong>64-disk</strong> version as requiring roughly <strong>a trillion years</strong>':'The <strong>64-disk</strong> version requires roughly <strong>a trillion years</strong>',
 'The lecture gives an effective short-term duration of about <strong>15–20 seconds</strong>.':'Short-term memory has an effective duration of about <strong>15–20 seconds</strong>.',
 'The lecture relates the pattern to a capacity of about <strong>three to four items in visual working memory</strong>.':'The pattern is associated with a capacity of about <strong>three to four items in visual working memory</strong>.'
}
FIELDS={'bullets','versionB','versionC','versionD','versionE','version2'}
changes=[]
def revise_modules(modules,source):
 for m in modules:
  for s in m['sections']:
   for key in FIELDS&s.keys():
    for i,old in enumerate(s[key]):
     new=old
     for a,b in REPLACEMENTS.items():new=new.replace(a,b)
     if new!=old:
      changes.append(dict(source=source,module=m.get('id',m.get('module')),page=s['page'],version=key,paragraph=i,before=old,after=new))
      s[key][i]=new

def rewrite_literals(raw,edits):
 for old,new in {(e['before'],e['after']) for e in edits}:
  found=False
  for ascii_mode in [False,True]:
   for escaped_slashes in [False,True]:
    a=json.dumps(old,ensure_ascii=ascii_mode);b=json.dumps(new,ensure_ascii=ascii_mode)
    if escaped_slashes:a=a.replace('</','<\\/');b=b.replace('</','<\\/')
    if a in raw:raw=raw.replace(a,b);found=True;break
   if found:break
  if not found:raise ValueError('Paragraph literal not found: '+old[:80])
 return raw
for name in ['index.html','share.html']:
 p=ROOT/name;raw=p.read_text();match=re.search(r'(<script id="study-data" type="application/json">)(.*?)(</script>)',raw,re.S);d=json.loads(match[2]);start=len(changes);revise_modules(d['modules'],name)
 revised=rewrite_literals(match[2],changes[start:]);p.write_text(raw[:match.start(2)]+revised+raw[match.end(2):])
for name,marker,modules in [('module2-data.js','window.SECOND_HALF = ',lambda d:d['collections']),('short-term-memory-v2.js','window.SHORT_TERM_MEMORY_V2 = ',lambda d:[d])]:
 p=ROOT/name;raw=p.read_text();d=json.loads(raw.split(marker,1)[1].rstrip(';\n'));start=len(changes);revise_modules(modules(d),name);p.write_text(rewrite_literals(raw,changes[start:]))
# Keep the existing authoring inputs aligned so rebuilding cannot restore framing.
for directory in ['version-b','version-c','version-d','version-e']:
 p=ROOT/directory
 if p.exists():
  for f in p.rglob('*'):
   if f.is_file() and f.suffix in ['.json','.py','.md','.txt']:
    raw=f.read_text();new=raw
    for a,b in REPLACEMENTS.items():
     new=new.replace(a,b)
     def md(t):return html.unescape(t.replace('<strong>','**').replace('</strong>','**'))
     new=new.replace(md(a),md(b))
    if new!=raw:f.write_text(new)
p=ROOT/'authoring/psyc301/build_problem_solving.py';raw=p.read_text();new=raw
for a,b in REPLACEMENTS.items():new=new.replace(a,b)
p.write_text(new)
if changes:
 log=ROOT/'authoring/psyc301/direct-teaching-wording-changes.json'
 previous=json.loads(log.read_text()) if log.exists() else []
 merged={(e['source'],e['module'],e['page'],e['version'],e['paragraph']):e for e in previous}
 for e in changes:
  key=(e['source'],e['module'],e['page'],e['version'],e['paragraph'])
  if key in merged:e['before']=merged[key]['before']
  merged[key]=e
 log.write_text(json.dumps(list(merged.values()),ensure_ascii=False,indent=2)+'\n')
print('PSYC301 transcript paragraphs revised:',len(changes))
