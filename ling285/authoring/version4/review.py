"""Bind the Version 4 editorial review and verification to the released files."""
from pathlib import Path
import hashlib
import json
ROOT=Path(__file__).resolve().parents[2]
A=ROOT/'authoring'
def read(p):return json.loads(p.read_text())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
coverage=read(A/'transcripts-v4-coverage.json')
preservation=read(A/'transcripts-v4-preservation.json')
for row in preservation['files']:assert sha(ROOT/row['file'])==row['sha256'],row['file']
files=['app.js','index.html','transcripts-v4.json','authoring/build_transcripts_v4.py',
       'authoring/version4/notes.py','authoring/version4/review.py',
       'authoring/transcripts-v4-coverage.json','authoring/transcripts-v4-preservation.json',
       'authoring/transcripts-v4-writing-reference.json',
       *[f'authoring/teaching-v4-lecture{n}.json' for n in range(11,15)]]
report={'schemaVersion':1,'edition':'2026-10-20-transcripts-v4','status':'passed',
 'reviewer':'/root','independentReviewer':False,
 'scope':{'sourcePages':86,'instructionalPages':75,'unexpandedNonInstructionalPages':11,'lectures':[11,12,13,14]},
 'writingRequirement':{'requestedMedianWords':[200,250],'actualMetrics':coverage['metrics'],
    'policy':'A median across instructional slides, not a minimum for each slide. Simple pages remain shorter.',
    'style':'Connected teaching paragraphs in plain words. Explain source terminology, causes, effects, and visual distinctions. No worked calculations, new external content, or decorative padding.'},
 'sourceReview':{'completedEarlierExtractionAndMediaReviewReused':True,
    'records':['authoring/source-manifest.json','authoring/teaching-coverage.json','authoring/transcripts-v2-audit.json','authoring/v3-practice-v2-review.json'],
    'newEditorialMethod':'Read and revise the source-aligned explanations against their concept inventory, native source wording, and previously reviewed original visuals. Every instructional page has an explicit authored mapping. Repeated text is used only for the same demonstration.',
    'additionalSourceSpotChecks':['lecture12 page11 original image and native wording','lecture13 page22 original image and native wording','lecture14 page23 original image and native wording'],
    'newFullMediaAnalysisClaimed':False,'replacementImagesGenerated':False,
    'retainedLimits':['The proposed vocal-fold experiment has no supplied measured outcome.','Membrane harmonic frequencies were assigned for the illustration.','Illustrative output probabilities are not verified calculations of the linear network.']},
 'editorialFindings':[
    'Clarified technical terms through the depicted movement and its causes, preserving basic mode labels, counts, and source-visible frequency examples.',
    'Distinguished movement from compression, local mass effects from stiffness effects, and mode number from harmonic number.',
    'Retained controlled-boundary comparisons, assigned membrane frequencies, and the difference between a theory illustration and a measured result.',
    'Explained source harmonics, formants, spectra, spectrogram axes, and output predictions without worked calculations.',
    'The Lecture 14 page23 heading names orange negative weights, but the rendered labels are green. Version 4 explicitly identifies that discrepancy and uses written signs for direction.',
    'Lecture 12 page22 follows its own principles slide rather than repeating vowel examples from other pages. Its concept list reflects that source-focused edit.'
 ],
 'verification':{'sourceAndReferenceChecks':'Passed existing source/content preservation checks and new Version 4 identity, count, reference-hash, and distinction checks.',
    'browser':'Passed all four transcript choices, all four lecture collections, combined and core notes, shared personal notes/read marks, expanded readers, reload, export/import, practice independence, mobile containment, unavailable-file fallback and recovery.',
    'practice':'Existing Version 1/2 answer/session, queue, backup, legacy migration, and missing-file recovery regression passed.',
    'visual':'Reviewed desktop/mobile screenshots and selected original source images.'},
 'preservation':preservation,
 'files':[{'file':f,'sha256':sha(ROOT/f)} for f in files],
 'unresolvedBlockingFindings':[]}
(A/'transcripts-v4-review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('Version 4 review passed:',coverage['metrics']['medianWords'],'median words;',len(files),'file bindings.')
