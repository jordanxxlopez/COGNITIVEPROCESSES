"""Compile page-authored explanations, explicit review mappings and practice.

Each row supplies C prose, common evidence, an independently written D framing,
and a page-specific visual/interpretive explanation. Editions deliberately share
source facts. No source-text extraction or automatic paraphrasing creates prose.
"""
from pathlib import Path
from copy import deepcopy
import json,re,hashlib
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data.js'
data=json.loads(DATA.read_text().removeprefix('window.LING406_MODULE3 = ').rstrip(';\n'))
records={}
for path in sorted((ROOT/'authoring/content').glob('*.txt')):
 for line in path.read_text().splitlines():
  if not line.strip():continue
  fields=line.split('|');assert len(fields)==6,(path,line[:80],len(fields))
  page,title,c,support,d,visual=fields
  records[f'm3-{path.stem}-p{int(page):03}']={'title':title,'c':c,'support':support.split('~') if support else [],'d':d,'visual':visual,'author':str(path.relative_to(ROOT))}
# Manual source-page correspondences checked against the supplied review.
review_map={2:('reading1',3),3:('reading1',4),4:('reading1',5),5:('reading1',6),6:('reading1',17),7:('reading1',18),8:('reading2',13),9:('reading2',14),10:('reading2',16),11:('reading2',17),12:('reading2',18),13:('reading2',19),14:('reading2',20),15:('morphology',6),16:('morphology',7),17:('morphology',8),18:('morphology',9),19:('morphology',10),20:('morphology',11),21:('morphology',12),22:('morphology',13),23:('morphology',14),24:('morphology',16),25:('morphology',17),26:('morphology',18),27:('morphology',20),32:('thought',6),33:('thought',7),34:('thought',9),35:('thought',10),36:('thought',11),37:('thought',12),38:('thought',15),39:('modalities',6),40:('modalities',7),41:('modalities',9),42:('modalities',14)}
for page,(key,source_page) in review_map.items():
 records[f'm3-review-p{page:03}']=deepcopy(records[f'm3-{key}-p{source_page:03}'])
assert set(records)=={s['id'] for s in data['sections']}
def block(text,children=None):return {'text':text,'children':children or []}
def editions(r):
 c,s,d,v=r['c'],r['support'],r['d'],r['visual']
 if not c:return [[],[],[],[]]
 # C2 follows the main concept and its logical supporting steps. The number of
 # blocks follows the actual amount of authored explanation rather than a quota.
 concise=[block(c,s[:1])]+[block(t) for t in s[1:]]
 direct=[block(d)]+([block(s[0],s[1:])] if s else [])
 clear=deepcopy(concise)+([block(v)] if v else [])
 teaching=[block(c+' '+s[0],s[1:])] if s else [block(c)]
 teaching+=[block(d,[v] if v else [])]
 return teaching,concise,direct,clear
for edition in data['editions']:edition['scripts']={}
for s in data['sections']:
 r=records[s['id']];s['title']=r['title'];s['analysis']={'status':'authored','role':'instructional' if r['c'] else 'noninstructional','authorFile':r['author']}
 s['paragraphs']=[r['c'],*r['support']] if r['c'] else []
 for edition,blocks in zip(data['editions'],editions(r)):
  prose=' '.join(b['text']+' '+' '.join(b['children']) for b in blocks)
  assert not re.search(r'[:;]|\bneed not\b|\blawful\b',prose,re.I),(s['id'],prose)
  edition['scripts'][s['id']]={'status':'ready' if blocks else 'noninstructional','blocks':blocks,'authorFile':r['author'],'source':s['source'],'page':s['page']}
 for rp,(key,sp) in review_map.items():
  if s['source']==key and s['page']==sp:s['reviewPages'].append(rp)

def group(title,key,pages):return {'title':title,'module':key,'sections':[f'm3-{key}-p{p:03}' for p in pages]}
data['guide']=[
 group('Orthographic depth and generalization','reading1',[3,4,5,6,8,10]),
 group('Lexical influences and frequency × regularity','reading1',[13,14,16,17,18]),
 group('Dyslexia and double dissociations','reading1',[19,20,21,23,24]),
 group('DRC processing and modularity','reading2',[3,4,6,10,11]),
 group('Statistical learning and phonological representations','reading2',[13,14,15,16,18,19,20]),
 group('Semantics and model evaluation','reading2',[21,22,23,25,26,27,29,30]),
 group('Morphological generalization and development','morphology',[3,5,6,10,11,12,14,15]),
 group('Phonology, semantics and impairment','morphology',[16,18,19,20,21,22,23,26,27,29]),
 group('Spatial frames and competing explanations','thought',[5,7,9,10,11,12,14,15,16,18]),
 group('Temporal metaphors and reading experience','thought',[20,21,22,23,24,25]),
 group('Sign phonology and language networks','modalities',[2,5,6,7,8,9,12,13,15]),
 group('Deafness, signing and visual attention','modalities',[10,11,14]),
 group('Braille and cross-modal plasticity','modalities',[16,17,18,19,20,21]),
 group('Review connections · aphasia and production','review',[28,29,30,31]),
 group('Review connections · early language access','review',[43,44]),
 group('Review connections · lexical selection','review',[45,46,47,48]),
 group('Review connections · graded speech perception','review',[49,50,51,52])]
data['experiments']=[
 group('Pseudoword reading across orthographies','reading1',[4,5,6,7,8,9,10]),
 group('Frequency, regularity and the interaction','reading1',[15,16,17,18]),
 group('Acquired dyslexia · two patient patterns','reading1',[19,20,21,22,23,24]),
 group('Phonological representations and model generalization','reading2',[16,17,18,19,20]),
 group('Semantic dementia and competing model fits','reading2',[21,22,23,24,25,26,27]),
 group('Wug testing and U-shaped learning','morphology',[3,10,11,12,13,14,15]),
 group('Phonological and semantic model lesions','morphology',[16,17,18,19,20,21,22,23]),
 group('SLI · behavioral and model comparisons','morphology',[24,25,26,27,28]),
 group('Rotated spatial-memory and inference tasks','thought',[5,6,7,9,10]),
 group('Landmarks, memory load and task demands','thought',[11,12,14,15,16,17,18]),
 group('Spatial priming and temporal judgments','thought',[20,21,22,23]),
 group('Reading direction and temporal button mappings','thought',[24,25]),
 group('Categorical perception of sign','modalities',[5,6,7]),
 group('Deafness versus signing experience','modalities',[9,10,11]),
 group('Sign versus tic-tac gesture control','modalities',[12,13]),
 group('Braille, blindfolding and TMS','modalities',[16,17,18,19,20]),
 group('Early language access · Mayberry and colleagues','review',[43,44]),
 group('Semantic blocking, gaze and speech timing','review',[45,46,47,48]),
 group('VOT and graded lexical competition','review',[49,50,51,52])]
core={sid for g in data['guide'] for sid in g['sections']}
for s in data['sections']:s['core']=s['id'] in core or bool(s['reviewPages'])
data['questions']=[]
for n,line in enumerate((ROOT/'authoring/questions.txt').read_text().splitlines(),1):
 f=line.split('|');assert len(f)==8,(n,len(f))
 key,page,stem,a,b,c,d,why=f
 data['questions'].append({'id':f'm3-q{n:03}','module':key,'section':f'm3-{key}-p{int(page):03}','kind':'Apply and explain','stem':stem,'choices':[a,b,c,d],'correct':0,'why':why})
data['testAllocation']={m['id']:10 for m in data['modules']}
written=[
 ('reading1',17,'Explain the frequency-by-regularity interaction and give both the dual-route and statistical-learning interpretations.',[
 'The cost of exception status is much larger for low-frequency words than high-frequency words. This is an interaction because the effect of one factor depends on the other.',
 'A dual-route account emphasizes fast lexical retrieval for familiar exceptions and greater interference from decoding for less familiar exceptions.',
 'A statistical-learning account combines support from shared spelling–sound patterns with learning of the individual word. Low-frequency exceptions are weak on both sources of support.']),
 ('reading1',21,'Explain what a double dissociation adds beyond one selective deficit, and why it does not uniquely prove DRC.',[
 'One deficit can reflect a task being harder overall. Opposite relative impairments challenge a single fixed ranking of task difficulty.',
 'Phonological dyslexia particularly affects nonwords, while surface dyslexia particularly affects exceptions.',
 'Different models can explain the reversal through different underlying dependencies. The observation constrains the architecture without specifying every component.']),
 ('reading2',20,'Describe the phonological-noise manipulation and explain why nonwords are particularly vulnerable.',[
 'The model manipulates the reliability of phonological representations and measures reading outcomes.',
 'Nonwords rely on generalization across learned patterns, which depends on an appropriate representation of similarity.',
 'Familiar words retain item-specific training support, so a shared impairment can produce unequal task effects.']),
 ('reading2',26,'Compare an association predicted by the triangle account with a best-fitting DRC simulation of the same patients.',[
 'The triangle account links semantic ability to exception reading and predicts a broad relationship between them.',
 'The DRC simulation varied lexical and GPC integrity across 40,000 runs and selected a match for each patient.',
 'Close fit matters, but so do flexibility, parameter selection and whether the relationship was constrained in advance.']),
 ('morphology',12,'Explain how Words and Rules and an associative model can both account for U-shaped learning.',[
 'Words and Rules attributes initial success, regularization and recovery to imitation, productive rule use and later exception learning with blocking.',
 'The associative model changes as training expands from frequent irregulars to more regular verbs. Newly learned regularities can interfere with earlier responses.',
 'Both must explain the developmental curve, but they propose different mechanisms. The curve alone does not select one.']),
 ('morphology',22,'Explain why phonological controls and semantic correlations matter for interpreting a past-tense dissociation.',[
 'Regular and irregular items may differ in phonological demands, so an apparent morphological effect may be partly confounded.',
 'Reducing that difference after matching supports a phonological contribution.',
 'An association between semantic impairment and irregular difficulty supports unequal dependence on semantic processing rather than only a separate rule-versus-exception interpretation.']),
 ('thought',9,'Describe the rotated spatial task, the group result and two alternative explanations that the later studies address.',[
 'Rotation makes preserving a viewer-relative arrangement diverge from preserving an absolute environmental orientation.',
 'Dutch participants more often give relative responses, while Tzeltal participants more often give absolute responses.',
 'Landmark availability can differ between settings. Memory load and task transparency can also alter strategy, and verbal recoding provides a further possible mechanism.']),
 ('thought',25,'Explain the mirror-reading experiment and what its reversal does and does not establish.',[
 'Participants classify temporal events using buttons whose past–future mapping can agree or disagree with a left-to-right timeline.',
 'After mirror reading, the later block favors the opposite temporal mapping.',
 'This supports a short-term contribution of reading experience. It does not establish that language never influences temporal thought or that grammar changed during the experiment.']),
 ('modalities',11,'Use the three participant groups to separate signing-related lateralization from peripheral attention.',[
 'Compare hearing nonsigners, hearing signers and deaf signers.',
 'Both signing groups show a leftward motion-processing shift, consistent with an association with signing experience.',
 'The peripheral-attention enhancement is specific to deaf participants, so signing alone is insufficient to explain that outcome.']),
 ('modalities',20,'Explain how blindfolding, reversal and TMS provide complementary evidence about cross-modal plasticity.',[
 'Five days of blindfolding during Braille training permits rapid tactile-related visual-cortex recruitment.',
 'The response reverses after vision returns, constraining the timescale and suggesting unmasking or changed competition.',
 'TMS disrupts tactile performance selectively in the blindfolded group, adding evidence for functional contribution beyond correlated activation.']),
 ('review',48,'Distinguish speech duration, gaze duration and eye–speech lag, then interpret the blocking pattern.',[
 'Speech duration concerns execution, gaze duration records time looking at an object, and lag concerns the interval from leaving it to spoken onset.',
 'Only gaze duration shows the reported blocking effect after the first cycle.',
 'The course interpretation links the selective pattern to lemma selection. The nonsignificant reverse-looking lag difference is not evidence for a reversed effect.']),
 ('review',52,'Explain why a step-like phoneme choice function can coexist with graded lexical competition.',[
 'The final mouse response selects one category and can therefore show a steep boundary.',
 'Eye movements reveal more activation of the competitor for tokens nearer the boundary even within a final-response category.',
 'That within-category gradient supports transmission of fine phonetic evidence to lexical candidates rather than discarding it completely after a thresholded label.'])]
data['written']=[{'id':f'm3-written-{i:02}','module':key,'section':f'm3-{key}-p{page:03}','prompt':prompt,'answer':answer} for i,(key,page,prompt,answer) in enumerate(written,1)]
data['status']='ready';data['revision']='ling406-module3-1'
data['coverage']={'sourcePages':185,'lecturePages':133,'reviewPages':52,'instructionalPages':sum(bool(r['c']) for r in records.values()),'questions':len(data['questions']),'guideTopics':len(data['guide']),'experimentGroups':len(data['experiments']),'writtenPrompts':len(data['written']),'reviewMappings':{str(p):f'm3-{k}-p{n:03}' for p,(k,n) in review_map.items()},'editionWords':{e['id']:sum(len((b['text']+' '+' '.join(b['children'])).split()) for s in e['scripts'].values() for b in s['blocks']) for e in data['editions']}}
for s in data['sections']:assert s['image'] and (ROOT/s['image']).is_file(),s['id']
for q in data['questions']:assert q['section'] in records
for e in data['editions']:(ROOT/'authoring'/f"{e['id']}.json").write_text(json.dumps(e,ensure_ascii=False,indent=2)+'\n')
(ROOT/'coverage-report.json').write_text(json.dumps(data['coverage'],indent=2)+'\n')
(ROOT/'authoring/page-inventory.json').write_text(json.dumps(data['sections'],ensure_ascii=False,indent=2)+'\n')
DATA.write_text('window.LING406_MODULE3 = '+json.dumps(data,ensure_ascii=False)+';\n')
print(json.dumps(data['coverage'],indent=2))
