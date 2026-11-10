"""Executed evidence ranking. These scores and sensitivity counts are not exam probabilities."""
import hashlib,json,random,re
from collections import Counter
from pathlib import Path
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from modern_pages import MAP

ROOT=Path(__file__).resolve().parents[1]

REVIEW_LINKS={
 'two-modes':[1], 'three-modes':[1,2,3,4], 'many-modes':[1,2,5],
 'fixed-fixed':[6,7,8,9,14], 'fixed-free':[11,12,13,15,16,17],
 'local-change':[4,6,11,14,15,19], 'constriction':[14,15,19],
 'air-modes':[12,13,16,17,19], 'source':[10], 'filter':[17,18,19],
 'u':[15,19], 'i':[19], 'a':[19], 'spectrogram':[18],
 'sequential':[20,21], 'network-shape':[20,21], 'vowel-network':[20,21], 'forward':[20],
 'training-data':[], 'backward':[], 'weights':[], 'weight-direction':[],
 'sigmoid':[], 'sigmoid-flow':[], 'overlap':[], 'accuracy':[],
 'initialization':[], 'recurrent':[], 'next-token':[], 'phonotactics':[],
 'letter-guess':[], 'heads':[], 'dynamic-depth':[], 'agents':[]
}

CUE_PATTERNS={
 'backward':r'guaranteed that there.s going to be questions in the exam',
 'sequential':r'That.s a very good question for the exam',
 'probabilities':r'All you need to know about probability',
 'filter':r'Formants.*(?:again|homework)|homework 4 is all about formants',
 'weight-direction':r'I.m not going to ask you to multiply',
 'training-code':r'what do these lines do',
 'accuracy':r'why.*(?:twenty percent|20%)|(?:twenty percent|20%).*exam',
}

def rank(concepts,guides,transcript=Path('/tmp/ling285-raw-transcript.txt')):
    review=json.loads((ROOT/'exam2-review.json').read_text())['items']
    exam1=json.loads((ROOT/'authoring/exam-style-evidence-v2.json').read_text())
    prompts=[x['question'] for x in review]+[x['prompt'] for x in exam1['examItems']]+[x['prompt'] for x in exam1['reviewItems']]
    vector=TfidfVectorizer(stop_words='english',ngram_range=(1,2),sublinear_tf=True)
    evidence=vector.fit_transform(prompts)
    keys=list(concepts)
    texts=[' '.join(concepts[k].values()).replace('**','') for k in keys]
    similarities=cosine_similarity(vector.transform(texts),evidence)
    evidence_file=ROOT/'authoring/modern-transcript-evidence.json'
    if evidence_file.exists():
        retained=json.loads(evidence_file.read_text());cues=retained['cues'];transcript_sha=retained['sha256']
    else:
        if not transcript.exists():raise FileNotFoundError('Retained transcript cue evidence or the authorized source transcript is required.')
        lines=transcript.read_text().splitlines();cues={}
        for key,pattern in CUE_PATTERNS.items():
            matches=[(i+1,re.sub(r'^\s*\*\s*','',line).strip()) for i,line in enumerate(lines) if re.search(pattern,line,re.I)]
            if matches:cues[key]=[{'line':i,'quote':text} for i,text in matches[:3]]
        transcript_sha=hashlib.sha256(transcript.read_bytes()).hexdigest()
        evidence_file.write_text(json.dumps({'sha256':transcript_sha,'cues':cues,'coverage':'Oct 6 through Nov 5; only exam-relevant excerpts retained.'},ensure_ascii=False,indent=2)+'\n')
    scope={key for lid,rows in MAP.items() if int(lid[7:9])>=11 for key in rows.values()}
    source_sets={k:set() for k in keys}
    for g in guides:
        for p in g['points']:source_sets[p['concept']].add(p['collection'])
    rows=[]
    for i,key in enumerate(keys):
        if key not in scope:continue
        components=[1.0 if REVIEW_LINKS.get(key) else 0.0,1.0 if key in cues else 0.0,float(max(similarities[i,:21])),min(len(source_sets[key]),3)/3]
        score=float(np.dot(components,[0.50,0.30,0.15,0.05]))
        rows.append({'concept':key,'score':round(score,6),'components':components,'reviewQuestions':REVIEW_LINKS.get(key,[]),'transcriptCues':cues.get(key,[]),'closestReviewQuestion':int(np.argmax(similarities[i,:21]))+1})
    rows.sort(key=lambda r:(-r['score'],r['concept']))
    rng=random.Random(28520);hits=Counter()
    for run in range(500):
        weights=[base*rng.uniform(.8,1.2) for base in [.50,.30,.15,.05]]
        ordered=sorted(rows,key=lambda r:(-sum(x*w for x,w in zip(r['components'],weights)),r['concept']))
        for row in ordered[:12]:hits[row['concept']]+=1
    for index,row in enumerate(rows):
        row.update(rank=index+1,tier='first' if row['reviewQuestions'] or row['transcriptCues'] else 'next',topTwelveSensitivityRuns=hits[row['concept']])
    return {
      'revision':'ling285-modern-evidence-1','purpose':'Order study and generated practice using review coverage, explicit transcript cues, source-language similarity and source support.',
      'limits':'Scores are editorial evidence rankings. The 500 sensitivity runs vary weights and measure ranking stability, not the probability of an exam question. No unseen Exam 2 outcomes are available for validation.',
      'models':[
        {'name':'Review coverage','method':'Explicit concept-to-question mapping to the 21 supplied Exam 2 review prompts.'},
        {'name':'Source language similarity','method':'Sublinear word/bigram TF–IDF fitted only to the 66 observed Exam 1 key, Exam 1 review and Exam 2 review prompts. Cosine similarity compares authored concepts with the source prompts.'},
        {'name':'Transcript cue and sensitivity model','method':'Find the recorded explicit exam cues, combine four evidence components with weights .50/.30/.15/.05, and repeat ranking with 500 seeded weight perturbations of plus or minus twenty percent.'}
      ],
      'observedExam1Patterns':dict(Counter(x['primaryPattern'] for x in exam1['examItems'])),
      'sourcePrompts':len(prompts),'transcriptAvailable':True,
      'sourceFiles':[{'file':str(p.relative_to(ROOT)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in [ROOT/'sources/modern/Exam2 Review (1).pdf',ROOT/'sources/exam1-key.pdf',ROOT/'sources/exam-review.docx']],
      'transcriptSource':{'title':'LING285-11-17 transcript','url':'https://docs.google.com/document/d/1Sn0smbBkTzC9E6e2dOHQA5PYTUHFi3kCacjJ8ZegEEE/edit','coverage':'Oct 6 through Nov 5; the source title understates its current date coverage. Raw transcript stays private and is not copied into the public repository.','sha256':transcript_sha},
      'ranking':rows
    }
