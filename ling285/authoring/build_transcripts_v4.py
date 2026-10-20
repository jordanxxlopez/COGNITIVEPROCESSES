"""Assemble source-aligned Version 4 without changing earlier teaching or practice."""
from pathlib import Path
import hashlib
import json
import re
import statistics
import sys

ROOT=Path(__file__).resolve().parents[1]
A=ROOT/'authoring'
sys.path.insert(0,str(A/'version4'))
from notes import COMMON, SPECIFIC, MAPPING

def read(p):return json.loads(p.read_text())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def words(text):return len(re.sub(r'<[^>]*>|\*\*','',text).split())
def js_data(path,prefix):return json.JSONDecoder().raw_decode(path.read_text().split(prefix,1)[1])[0]
def metrics(counts):
    nonempty=[n for n in counts if n]
    return {'instructionalPages':len(nonempty),'words':sum(nonempty),'medianWords':statistics.median(nonempty),
            'minimumWords':min(nonempty),'maximumWords':max(nonempty),'quartiles':statistics.quantiles(nonempty,n=4)}

immutable=['data.json','transcripts-v2.json','transcripts-v3.json','practice-v2.json',
           *[f'authoring/teaching-v{v}-lecture{n}.json' for v in [2,3] for n in range(11,15)],
           *[f'authoring/practice-v2-lecture{n}.json' for n in range(11,15)]]
before={f:sha(ROOT/f) for f in immutable}
data=read(ROOT/'data.json')
source_manifest=read(A/'source-manifest.json')
v3=read(ROOT/'transcripts-v3.json')

stm_path=ROOT.parent/'short-term-memory-v2.js'
ling_path=ROOT.parent/'ling406/transcripts-v4-data.js'
wm_path=ROOT.parent/'module2-data.js'
stm=js_data(stm_path,'window.SHORT_TERM_MEMORY_V2 = ')
ling=js_data(ling_path,'window.LING406_TRANSCRIPTS_V4 = ')
wm=js_data(wm_path,'window.SECOND_HALF = ')
refs=[{'file':'../short-term-memory-v2.js','sha256':sha(stm_path),'edition':'PSYC301 · Short-Term Memory · expanded teaching notes',
       'metrics':metrics([sum(words(p) for p in s['bullets']) for s in stm['sections']])},
      {'file':'../module2-data.js','sha256':sha(wm_path),'edition':'PSYC301 · Working Memory',
       'metrics':metrics([sum(words(p) for p in s['bullets']) for c in wm['collections'] for s in c['sections']])},
      {'file':'../ling406/transcripts-v4-data.js','sha256':sha(ling_path),'edition':'LING406 · Version 4 · slide wording',
       'metrics':metrics([sum(words(p['text']) for p in parts) for parts in ling['scripts'].values()])}]

runtime={'id':'v4','label':'Version 4 · Teaching notes','revision':'2026-10-20-transcripts-v4',
         'baseDataSha256':before['data.json'],'collections':{},'visualPresentation':v3['visualPresentation'],
         'references':v3['references'],'writingReference':'PSYC301 expanded teaching notes and LING406 slide wording',
         'wordCountPolicy':{'requestedMedian':[200,250],'appliesTo':'Instructional slides with teaching content; title, blank, and prompt-only pages excluded.'}}
coverage=[]
for n in range(11,15):
    key=f'lecture{n}'
    original=next(c for c in data['collections'] if c['id']==key)
    previous=read(A/f'teaching-v3-{key}.json')[key]
    authored={'title':original['title'],'sections':[]}
    runtime_sections=[]
    for old, prior in zip(original['sections'],previous['sections']):
        page=old['page']
        if not old['teaching']:
            assert page not in MAPPING[n] and (n,page) not in SPECIFIC,(key,page)
            teaching=[];origin='Source has no teaching content.'
        elif (n,page) in SPECIFIC:
            teaching=list(SPECIFIC[(n,page)]);origin=f'SPECIFIC[{n}, {page}]'
        else:
            teaching=list(COMMON[MAPPING[n][page]]);origin='COMMON.'+MAPPING[n][page]
        assert bool(teaching)==bool(old['teaching'])
        for p in teaching:
            assert p.strip() and not re.search(r'need not|</?[a-z][^>]*>|`',p,re.I)
            assert p.count('**')%2==0
        concepts=list(prior['concepts'])
        if n==12 and page==22:
            concepts=[c for c in concepts if c not in ['three vowel mechanisms','glottis-based position reference']]
        identity={f:old[f] for f in ['id','page','title','kind']}
        runtime_sections.append({**identity,'teaching':teaching})
        authored['sections'].append({k:v for k,v in identity.items() if k!='id'} | {
          'teaching':teaching,'concepts':concepts,
          'review':{'method':'Edited against native source text, source-visible labels, and the already reviewed original visual/media inventory. Mechanisms checked against the corresponding source-aligned Version 3 entry; prior source limitations retained.',
                    'originalSourceReview':f'authoring/teaching-v3-{key}.json',
                    'sourceReviewReused':True,'newMediaGenerated':False,'limitations':prior['review'].get('limitations',[])}})
        coverage.append({**identity,'lectureId':key,'sourceSha256':source_manifest[key]['sha256'],
          'authoringEntry':origin,'concepts':concepts,'words':sum(words(p) for p in teaching),
          'version3Words':sum(words(p) for p in prior['teaching']),
          'paragraphs':len(teaching),'originalImage':old['image'],
          'originalAssets':[{'type':a['type'],'file':a['file']} for a in old['assets']]})
    write(A/f'teaching-v4-{key}.json',{key:authored})
    runtime['collections'][key]={'title':original['title'],'sections':runtime_sections}

summary=metrics([s['words'] for s in coverage])
assert 200<=summary['medianWords']<=250,summary
assert len(coverage)==86
write(ROOT/'transcripts-v4.json',runtime)
write(A/'transcripts-v4-coverage.json',{'revision':runtime['revision'],'sections':coverage,'metrics':summary,
      'medianRule':'The user requested a 200–250-word median, not a per-slide minimum. Shorter explanations remain where sufficient.',
      'emptyPagesPreserved':sum(not s['words'] for s in coverage),'sourceAndVisualsUnchanged':True})
write(A/'transcripts-v4-writing-reference.json',{'references':refs,
      'latestUserPreference':'Median 200–250 words per instructional slide; teach in plain words without filler or unnecessary jargon.',
      'style':'A few connected teaching paragraphs. Explain source terms and cause-and-effect directly, preserving source-supported distinctions and basic numbers. No worked calculations or new external content.',
      'mediaReview':'Reuse the completed source extraction, rendered-page review and embedded-media review; do not generate replacement visuals.',
      'version4Metrics':summary})
assert before=={f:sha(ROOT/f) for f in immutable}
write(A/'transcripts-v4-preservation.json',{'status':'passed','files':[{'file':f,'sha256':s} for f,s in before.items()],
      'allEarlierEditionsAndPracticeUnchanged':True})
print(json.dumps(summary,indent=2))
