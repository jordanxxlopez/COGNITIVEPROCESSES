"""Build a separate exam-style bank and reproducible source-evidence ranking.

Counts and format quotas are requirements, not predictions. Fit vocabulary only
on the supplied 25 exam items and 20 review prompts, never on generated items.
"""
from collections import Counter
from pathlib import Path
import hashlib
import json
import math
import re
from assessment_ranking import tokens

ROOT = Path(__file__).resolve().parents[1]
A = ROOT / 'authoring'
LECTURES = [f'lecture{n}' for n in range(11, 15)]
PATTERNS = ['cause-effect', 'distinction', 'application', 'interpretation', 'prediction', 'procedure', 'design']
def read(p): return json.loads(p.read_text())
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p, v): p.write_text(json.dumps(v, ensure_ascii=False, indent=2) + '\n')

def build():
    data_sha = sha(ROOT / 'data.json')
    data = read(ROOT / 'data.json')
    evidence = read(A / 'exam-style-evidence-v2.json')
    exam, review = evidence['examItems'], evidence['reviewItems']
    assert [x['number'] for x in exam] == list(range(1,26))
    assert [x['number'] for x in review] == list(range(1,21))
    pages = {(c['id'], s['page']) for c in data['collections'] for s in c['sections']}
    old_ids = {q['id'] for q in data['questions']}
    questions = []
    for lecture in LECTURES:
        bank = read(A / f'practice-v2-{lecture}.json')
        assert bank['lectureId'] == lecture
        qs = bank['questions']
        assert len(qs) == 50 and Counter(q['type'] for q in qs) == {'mcq':25,'written':25}
        for q in qs:
            assert q['id'] not in old_ids
            assert q['moduleId'] == 'module2' and q['lectureId'] == lecture
            assert q['pattern'] in PATTERNS, (q['id'],q['pattern'])
            for field in ['prompt','answer','topic']:
                assert isinstance(q[field],str) and q[field].strip(), (q['id'],field)
            assert q['rubric'] and all(isinstance(x,str) and x.strip() for x in q['rubric'])
            assert q['sources'] and any(s['collection']==lecture for s in q['sources'])
            assert all((s['collection'],s['page']) in pages for s in q['sources'])
            assert all(n in range(1,26) for n in q.get('examKeyRefs',[]))
            assert all(n in range(1,21) for n in q.get('examReviewRefs',[]))
            if q['type']=='mcq':
                assert len(q['options'])==4 and {o['id'] for o in q['options']}==set('abcd')
                assert q['correctOption'] in 'abcd'
                assert len({o['text'].strip().casefold() for o in q['options']})==4
                assert all(o['text'].strip() and o['feedback'].strip() for o in q['options'])
            q['assessmentVersion']='v2'
            q['edition']='2026-10-20-practice-v2'
            questions.append(q)
    assert len(questions)==200 and len({q['id'] for q in questions})==200
    assert Counter(q['correctOption'] for q in questions if q['type']=='mcq')==dict.fromkeys('abcd',25)
    assert len({q['prompt'].casefold() for q in questions})==200

    # One source question is one document. Answers are excluded so long key
    # explanations do not dominate short instructor prompts.
    counts = [Counter(tokens(x['prompt'])) for x in exam+review]
    df = Counter(w for count in counts for w in count)
    idf = {w:math.log((1+len(counts))/(1+n))+1 for w,n in df.items()}
    def vec(text):
        count=Counter(tokens(text))
        vals={w:(1+math.log(n))*idf[w] for w,n in count.items() if w in idf}
        norm=math.sqrt(sum(v*v for v in vals.values())) or 1
        return {w:v/norm for w,v in vals.items()}
    vectors=[vec(x['prompt']) for x in exam+review]
    ec,rc=Counter(x['primaryPattern'] for x in exam),Counter(x['primaryPattern'] for x in review)
    weights={p:.75*ec[p]/len(exam)+.25*rc[p]/len(review) for p in PATTERNS}
    highest=max(weights.values())
    scores=[]
    for q in questions:
        v=vec(q['prompt'])
        matches=[sum(value*v.get(word,0) for word,value in ev.items()) for ev in vectors]
        em=sorted(zip(matches[:25],range(1,26)),reverse=True)
        rm=sorted(zip(matches[25:],range(1,21)),reverse=True)
        pattern=weights[q['pattern']]/highest
        priority=round(1+.6*pattern+.25*em[0][0]+.15*rm[0][0],6)
        q['priority']=priority
        scores.append({'id':q['id'],'priority':priority,'pattern':q['pattern'],
          'patternComponent':round(pattern,6),'examSimilarity':round(em[0][0],6),
          'reviewSimilarity':round(rm[0][0],6),
          'closestExamItems':[{'number':n,'similarity':round(s,6)} for s,n in em[:3]],
          'closestReviewItems':[{'number':n,'similarity':round(s,6)} for s,n in rm[:3]],
          'authoredExamAnalogies':q.get('examKeyRefs',[])})
    model={
      'title':'Practice based on the exam and review',
      'summary':'Version 2 uses the 25 questions in the uploaded Exam 1 key and the 20 review prompts as writing examples. Practice mixes quick identification, comparisons, reading figures, predicting the direction of a change, and explaining why it happens. Answers use basic labels and numbers where useful, without adding calculation exercises.',
      'evidence':['All 25 exam questions and all 20 review prompts were reviewed.','The actual key includes one multiple-choice item, brief identification, conceptual explanations, and elementary symbolic or number questions.','The 50/50 practice split follows your requested study format; it is not an estimate of the next exam’s format.'],
      'limitations':['These are original study questions based on Lectures 11–14. One exam and review cannot establish what will appear on a future exam.','The selection weights help vary study practice after lecture and format coverage are fixed. They are not exam probabilities.']}
    refs=[{'title':'Exam 1 · uploaded answer key','file':'sources/exam1-key.pdf','kind':'Observed exam question styles'},
          {'title':'Exam 1 Review · uploaded copy','file':'sources/exam-review-v2.docx','kind':'Observed review question styles'}]
    runtime={'id':'v2','label':'Version 2 · Exam style','revision':'2026-10-20-practice-v2',
       'baseDataSha256':data_sha,'lectureIds':LECTURES,'questions':questions,'model':model,'references':refs}
    report={'revision':runtime['revision'],'purpose':'Reproducible study priorities; no validated prediction of a future exam.',
      'trainingDocuments':45,'vocabularySize':len(idf),'vocabularyFit':'Exam and review prompts only; generated questions and key answers excluded.',
      'observedSummary':evidence['empiricalSummary'],
      'method':{'patternWeight':'.75 * exam pattern proportion + .25 * review pattern proportion',
                'score':'1 + .6 * normalized pattern weight + .25 * maximum exam cosine similarity + .15 * maximum review cosine similarity',
                'coefficients':'Editorial study weights, not fitted or validated performance estimates.',
                'similarity':'L2-normalized sublinear TF–IDF; vocabulary and IDF fitted to 45 source prompts only.',
                'selection':'Lecture and format quotas first; weighted sampling without replacement within each group.'},
      'patternWeights':weights,'examPatternCounts':dict(ec),'reviewPatternCounts':dict(rc),
      'practicePatternCounts':dict(Counter(q['pattern'] for q in questions)),
      'contracts':{'questions':200,'perLecture':50,'perLectureMCQ':25,'perLectureWritten':25,'currentTest':100,'currentTestMCQ':50,'currentTestWritten':50,'currentTestPerLecture':25},
      'inputs':[{'file':str(p.relative_to(ROOT)),'sha256':sha(p)} for p in [A/'exam-style-evidence-v2.json',*[A/f'practice-v2-{l}.json' for l in LECTURES]]],
      'rankings':scores}
    write(ROOT/'practice-v2.json',runtime)
    write(A/'practice-v2-model.json',report)
    assert sha(ROOT/'data.json')==data_sha
    print('Built Practice Version 2:',len(questions),'questions; source-only model:',len(idf),'terms.')

if __name__=='__main__': build()
