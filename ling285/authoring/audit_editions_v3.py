"""Record final file bindings and structural release checks, not a prose review."""
from pathlib import Path
import hashlib
import json

ROOT=Path(__file__).resolve().parents[1]
A=ROOT/'authoring'
def read(p):return json.loads(p.read_text())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
old=read(A/'transcripts-v2-audit.json')
old_bindings={r['file']:r['sha256'] for r in old['preservation']['immutableInputs']+old['reviewedRuntimeAndModels']+old['sourceInputs']}
for filename,digest in old_bindings.items():assert sha(ROOT/filename)==digest, filename
v3=read(ROOT/'transcripts-v3.json');practice=read(ROOT/'practice-v2.json')
review=read(A/'v3-practice-v2-review.json')
assert sum(len(c['sections']) for c in v3['collections'].values())==86
assert len(practice['questions'])==200
files=['app.js','index.html','style.css','transcripts-v3.json','practice-v2.json',
       'authoring/build_transcripts_v3.py','authoring/build_practice_v2.py','authoring/audit_editions_v3.py',
       'authoring/exam-style-evidence-v2.json','authoring/transcripts-v3-writing-reference.json',
       'authoring/transcripts-v3-coverage.json','authoring/practice-v2-model.json','authoring/v3-practice-v2-review.json',
       *[f'authoring/teaching-v3-lecture{n}.json' for n in range(11,15)],
       *[f'authoring/practice-v2-lecture{n}.json' for n in range(11,15)]]
report={'schemaVersion':1,'edition':'2026-10-20-transcripts-v3-practice-v2','status':'passed',
 'kind':'Final structural checks and file bindings. Editorial scope is recorded separately, not inferred from these checks.',
 'scope':{'sourcePages':86,'newQuestions':200,'perLecture':50,'MCQPerLecture':25,'writtenPerLecture':25,'currentTest':100,'currentTestSplit':[50,50]},
 'preservation':{'olderBoundFilesUnchanged':True,'checkedFiles':len(old_bindings),'baseDataSha256':sha(ROOT/'data.json'),'originalQuestionCount':292,'oldFileBindings':[{'file':f,'sha256':s} for f,s in sorted(old_bindings.items())]},
 'editorialReview':'authoring/v3-practice-v2-review.json',
 'rootReview':{'teachingRead':['lecture11','lecture12','lecture14'],'additionalTeachingReview':'Lecture 13 independently checked by practice_core against native source; see editorial record.',
               'questionBanks':'All L13/L14 prompts, answers, and MCQ choices read; L11/L12 independently reviewed by practice_core. All four banks also have author self-review.',
               'wordingChanges':['Replaced unnecessary excursion with movement in the new teaching and question banks.','Removed backtick markup unsupported by the transcript renderer.'],
               'writingGoal':'Plain complete explanations; no target reduction in length.'},
 'verification':{'contentAndPreservation':'27 existing content checks plus 3 additional edition/model checks passed.',
                 'browser':'Transcript switching across notes/readers/search/speech, fixed test sizes, saved sessions per edition, answer isolation, legacy migration, export/import, missing-file recovery, Module I, mobile layout and existing app/module smoke checks passed.',
                 'visual':'Desktop lecture notes in light and dark modes and desktop/mobile practice reviewed.'},
 'files':[{'file':f,'sha256':sha(ROOT/f)} for f in files],
 'limitations':['The study ranking is not validated against an unseen exam.','The editorial record distinguishes independent checks from author self-review.']}
(A/'v3-practice-v2-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('Final release audit:',len(files),'new file bindings;',len(old_bindings),'earlier bindings unchanged.')
