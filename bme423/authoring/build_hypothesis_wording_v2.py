"""Author Version 2 verbal translations only. Original notation/data stay immutable.

Context comes from the existing D/C practice frames, neuroscience variants,
source example records and Session 17 cases. No new outcomes or groups are added.
"""
import json, re, copy
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/name).read_text().split('=',1)[1].rstrip(';\n'))
def record(n,a,label='',**extra):return dict(nullWords=n,alternativeWords=a,label=label,**extra)
def joined(items):
 return items[0] if len(items)==1 else ' and '.join(items) if len(items)==2 else ', '.join(items[:-1])+', and '+items[-1]
def mean_pair(outcome,first,second,label=''):
 return record(f'The population mean {outcome} is the same for {first} and {second}.',f'The population mean {outcome} differs between {first} and {second}.',label)
def prop_pair(event,first,second,label=''):
 return record(f'The proportion of people who {event} is the same in the populations receiving {first} and {second}.',f'The proportion of people who {event} differs between the populations receiving {first} and {second}.',label)
h=load('hypothesis-data.js');data=load('data.js');vd=load('version-d-data.js');neuro=load('neuroscience-worked-data.js');m2=load('module2-data.js')
problems={k:{kk:vv for kk,vv in v.items() if kk in ('nullWords','alternativeWords','label')} for k,v in h['problems'].items()}
original={p['id']:p for p in data['problems']+vd['extraCases']}
for p in list(original.values())+neuro['problems']:
 pid=p['id'];sid=p.get('originalId',pid);topic=p['topic'];is_neuro=pid.startswith('neuro-');q=neuro['questions'].get(pid) if is_neuro else vd['problems'].get(pid)
 if pid not in problems or not q:continue
 old=problems[pid];given=original[sid]['given'];outcome='sensory-discrimination score' if is_neuro else 'blood-cell response'
 if topic=='anova' and sid not in ['class-hr','d-hw2-filgrastim','d-hw1-tumor']:
  names=[f'treatment group {i+1}' for i in range(int(given['m']))];outcome='visual-attention score' if is_neuro else 'laboratory response'
  problems[pid]=record(f'The populations receiving {joined(names)} have the same mean {outcome}.',f'At least two of the populations receiving {joined(names)} have different mean {outcome}.')
 elif topic=='chi' and sid not in ['d-hw2-folate','d-hw2-mortality']:
  rows=json.loads(given['observed table']);names=[f'care regimen {i+1}' for i in range(len(rows))];event='a migraine during follow-up' if is_neuro else 'the recorded adverse outcome during follow-up'
  problems[pid]=record(f'The population proportion experiencing {event} is the same for {joined(names)}.',f'The population proportion experiencing {event} differs for at least two of {joined(names)}.')
 elif topic=='gof':
  cats=['social interaction','navigating a place','other themes'] if is_neuro else ['no regular exercise','sporadic exercise','regular exercise']
  pop='the population of dream reports' if is_neuro else 'the population represented by the exercise survey'
  problems[pid]=record(f'In {pop}, the proportions classified as {cats[0]}, {cats[1]}, and {cats[2]} are 60 percent, 25 percent, and 15 percent, respectively.',f'In {pop}, at least one of the three category proportions differs from its proposed value of 60 percent for {cats[0]}, 25 percent for {cats[1]}, or 15 percent for {cats[2]}.')
 elif topic=='rcode' and not is_neuro:
  problems[pid]=mean_pair('interval response measured in the clinical study','the first clinical population','the second clinical population')
 if topic in ['posthoc','bonferroni']:
  pairs=[]
  for step in q['flow']:
   v=step.get('values') or {}
   if 'i' in v and 'j' in v:
    a,b=v['i']+1,v['j']+1
    if any(pair['label']==f'Group {a} versus Group {b}' for pair in pairs):continue
    pairs.append(mean_pair(outcome,f'the population receiving regimen {a}',f'the population receiving regimen {b}',f'Group {a} versus Group {b}'))
  if pairs:problems[pid]=dict(pairs[0],pairs=pairs,pairsOnly=True)
 if topic=='holm':
  outcome='attention score' if is_neuro else 'interval response measured in the clinical study'
  pairs=[mean_pair(outcome,f'the population receiving treatment {name}','the control population',f'Treatment {name} versus control') for name in ['A','B','C']]
  problems[pid]=dict(pairs[0],pairs=pairs,pairsOnly=True)
 if sid=='d-hw1-tumor' and not is_neuro:
  names=['five doses of 30 micrograms of isotype-control antibody','five doses of 100 micrograms of isotype-control antibody','one dose of 200 micrograms of isotype-control antibody']
  problems[pid]=record(f'At 29 days after implantation, the mouse populations receiving {joined(names)} have the same mean tumor volume.',f'At 29 days after implantation, at least two of the mouse populations receiving {joined(names)} have different mean tumor volumes.')
 if sid=='class-hr' and not is_neuro:
  problems[pid]=mean_pair('heart rate','students who prefer cats','students who prefer dogs')
 if sid=='d-hw2-filgrastim':
  outcome='EEG response amplitude' if is_neuro else 'neutrophil concentration after one month'
  names=['low-contrast stimulation','medium-contrast stimulation','high-contrast stimulation'] if is_neuro else ['a low filgrastim dose','a medium filgrastim dose','a high filgrastim dose']
  r=record(f'The populations receiving {joined(names)} have the same mean {outcome}.',f'At least two of the populations receiving {joined(names)} have different mean {outcome}.')
  r['pairs']=[mean_pair(outcome,'the population receiving '+names[a],'the population receiving '+names[b],f'{names[a].capitalize()} versus {names[b]}') for a,b in [(0,1),(0,2),(1,2)]]
  problems[pid]=r
 if sid=='d-hw2-mortality':
  names=['standard care','t-PA with intravenous heparin','streptokinase with intravenous heparin','t-PA plus streptokinase with intravenous heparin']
  if is_neuro:
   names=['reference sound-management care','structured sound practice','guided relaxation','the combined sound-management program'];event='have persistent tinnitus thirty days after treatment'
  else:event='die within thirty days after a myocardial infarction'
  r=record(f'The proportion of patients who {event} is the same in the populations receiving {joined(names)}.',f'At least two of the populations receiving {joined(names)} have different proportions of patients who {event}.')
  r['pairs']=[prop_pair(event,names[i],names[0],f'{names[i].capitalize()} versus {names[0]}') for i in range(1,4)]
  problems[pid]=r
# More specific nulls for the supplied Session 17 cases. The requested tasks are two-sided.
m2records={}
mean_context={
 'ci-urine':('daily urine production','patients receiving the diuretic','patients receiving placebo'),
 'ci-glucose':('fasting plasma glucose concentration','pre-diabetic patients receiving placebo','pre-diabetic patients receiving the glucose-lowering drug'),
 'ci-neural':('neural response','the population represented by Group 1','the population represented by Group 2'),
 'ci-sleep':('sleep duration','the population receiving the Group 1 treatment','the population receiving the Group 2 treatment'),
 'ci-pain':('pain score after the assigned condition','the population receiving the Group 1 intervention','the population receiving the Group 2 control condition'),
 'ci-latency':('evoked-response latency','the population represented by Group 1','the population represented by Group 2')}
prop_context={
 'ci-aspirin':('develop a thrombus','placebo','aspirin'),
 'ci-aspirin-precision':('develop a thrombus','placebo','aspirin'),
 'ci-event':('experience the recorded event','the Group 1 treatment','the Group 2 treatment'),
 'ci-adverse':('experience an adverse event','the Group 1 treatment','the Group 2 treatment'),
 'ci-improvement':('improve after the intervention','the Group 1 intervention','the Group 2 intervention'),
 'ci-completion':('complete the follow-up assessment','the Group 1 condition','the Group 2 condition')}
one_prop={
 'ci-survey':('the college-student population','took a non-prescribed stimulant during the preceding year',50),
 'ci-screen':('the population represented by the screening sample','have a positive screening response',25),
 'ci-recall':('the population represented by the recall study','produce a successful recall response',50),
 'ci-symptom':('the population represented by the follow-up study','report the recorded symptom',30),
 'ci-response':('the population represented by the clinical study','have the recorded clinical response',40)}
for c in m2['cases']:
 if not c.get('hypotheses'):continue
 if c['id'] in mean_context:m2records[c['id']]=mean_pair(*mean_context[c['id']])
 elif c['id'] in prop_context:m2records[c['id']]=prop_pair(*prop_context[c['id']])
 else:
  pop,event,value=one_prop[c['id']];m2records[c['id']]=record(f'In {pop}, {value} percent of people {event}.',f'In {pop}, the proportion of people who {event} differs from {value} percent.')
# Explicit source records retain the original source's measured outcome and named populations.
sources={k:[{kk:vv for kk,vv in r.items() if kk in ('nullWords','alternativeWords','label')} for r in rows] for k,rows in h['sources'].items()}
sources['gof']=[problems['gof']]
sources['anova']=[problems['d-hw1-tumor']]
sources['onet']=[record('The population mean heart rate for the population represented by the heart-rate sample is 72 beats per minute.','The population mean heart rate for the population represented by the heart-rate sample differs from 72 beats per minute.')]
for key in ['pairs','multiplicity']:
 pairs=[mean_pair('HDL concentration',f'the population receiving treatment {a}',f'the population receiving treatment {b}',f'Treatment {a} versus treatment {b}') for a,b in [(1,2),(1,3),(2,3)]]
 sources[key]=[dict(pairs[0],pairs=pairs,pairsOnly=True)]
sources['output']=[dict(problems['d-hw2-mortality']['pairs'][0],pairs=problems['d-hw2-mortality']['pairs'],pairsOnly=True)]
sources['decision']=[record('The population mean of the measured clinical response equals the reference value specified by the investigator.','The population mean of the measured clinical response differs from the reference value specified by the investigator.','One clinical population compared with a reference'),record('The populations receiving the clinical treatments being compared have the same mean measured response.','At least two of the populations receiving the clinical treatments being compared have different mean measured responses.','Overall comparison of clinical treatment populations')]
# Earlier question wording can leave an outcome unnamed. Keep its hypotheses
# faithful to those givens instead of importing the later clinical framing.
c_questions=load('practice-question-data.js')['questions']
problems_c=copy.deepcopy(problems)
for pid,r in problems_c.items():
 if pid.startswith('neuro-') or pid not in c_questions:continue
 q=c_questions[pid];context=' '.join(q.get('paragraphs',[]))+q.get('context','')
 replacements=[]
 if not re.search(r'blood.cell|neutrophil',context,re.I):replacements.append(('blood-cell response','quantitative response measured in the study'))
 if 'assay' in context.lower():replacements.append(('laboratory response','assay response'))
 if not re.search(r'adverse',context,re.I):replacements.extend([('recorded adverse outcome','recorded event'),('the adverse event','the recorded event')])
 if 'care' not in context.lower():replacements.extend([('care regimen ','Group '),('the population receiving regimen ','the population represented by Group ')])
 def rewrite(entry):
  for key in ['nullWords','alternativeWords']:
   for a,b in replacements:entry[key]=entry[key].replace(a,b)
  for pair in entry.get('pairs',[]):rewrite(pair)
 rewrite(r)

# A generic i-versus-j formula is a hypothesis for one selected pair, not a
# claim that every pair differs. Keep one verbal translation under that formula.
for pool in [problems,problems_c]:
 for pid,r in list(pool.items()):
  original_h=h['problems'][pid]
  if r.get('pairsOnly'):
   outcome='sensory-discrimination assessment score' if pid.startswith('neuro-') else 'blood-cell response' if pool is problems else 'quantitative response measured in the study'
   if 'control' in original_h['null']:
    if 'holm' in pid:outcome='attention assessment score' if pid.startswith('neuro-') else 'response measured in the clinical study'
    pool[pid]=record(f'For the selected active treatment compared with control, the population mean {outcome} is the same under that treatment and the control condition.',f'For the selected active treatment compared with control, the population mean {outcome} differs between that treatment and the control condition.')
   else:
    pool[pid]=record(f'For the particular pair of training regimens being compared, the population mean {outcome} is the same under the two regimens.' if pid.startswith('neuro-') else f'For the particular pair of treatment regimens being compared, the population mean {outcome} is the same under the two regimens.',f'For the particular pair of regimens being compared, the population mean {outcome} differs between the two regimen populations.')
  # Preserve the populations and reference values from each numerical variant.
  r=pool[pid];base=h['problems'][pid];topic=(next((p['topic'] for p in neuro['problems'] if p['id']==pid),None) if pid.startswith('neuro-') else original[pid]['topic'])
  if topic=='pooledt':
   if pid.startswith('neuro-'):
    pool[pid]=mean_pair('visual-discrimination assessment score after the assigned activity','participants receiving visual-attention training','participants receiving the control activity')
   else:
    pool[pid]=mean_pair('cognitive assessment score after follow-up','the older-adult population receiving the intervention','the older-adult population receiving no intervention') if pool is problems else mean_pair('cognitive assessment score','the population receiving the intervention','the control population receiving no intervention')
  if topic=='onet':
   ref=r['nullWords'].split('equals ',1)[1].rstrip('.')
   outcome='visual-evoked-response peak latency among adults tested after a restricted-sleep night' if pid.startswith('neuro-') else 'LDL concentration in the student population represented by the health-screening sample'
   pool[pid]=record(f'The population mean {outcome} equals the fixed reference value of {ref}.',f'The population mean {outcome} is either higher or lower than the fixed reference value of {ref}.')
  if topic=='zprop' and 'd-hw2-dioxin' not in pid:
   event='experience at least one migraine during follow-up' if pid.startswith('neuro-') else 'experience the recorded adverse event during follow-up' if pool is problems else 'experience the recorded event during follow-up'
   pool[pid]=record(f'The proportion of patients who {event} is the same in the population receiving the reference regimen and the population receiving the alternative regimen.',f'The proportion of patients who {event} differs between the population receiving the reference regimen and the population receiving the alternative regimen.')

# Source-level pairwise formulas retain a selected-pair interpretation.
for key in ['pairs','multiplicity']:
 sources[key]=[record('For the selected pair of activity groups, the population mean HDL concentration is the same in the two groups being compared.','For the selected pair of activity groups, the population mean HDL concentration differs between the two groups being compared.')]
sources['output']=[record('For the selected active treatment compared with standard care, the population proportion of patients dying within thirty days after a myocardial infarction is the same under the two regimens.','For the selected active treatment compared with standard care, the population proportion of patients dying within thirty days after a myocardial infarction differs between the two regimens.')]
sources['decision']=[record('The population quantity or distribution identified in the clinical question has the specific reference value or pattern stated in that question.','The population quantity or distribution identified in the clinical question departs from the stated reference value or pattern in the direction or directions specified by that question.')]

# General formula references have no named clinical outcome. Describe their
# actual comparison without inventing a disease, treatment or measurement.
topics={
 'hypothesis':sources['decision'][0],
 'anova':record('The populations represented by all the study groups have the same mean value of the quantitative outcome measured in the study.','At least two populations represented by the study groups have different mean values of the quantitative outcome measured in the study.'),
 'onet':record('The population represented by the study sample has a mean value of the measured outcome equal to the fixed reference value specified in the question.','The population represented by the study sample has a mean value of the measured outcome either higher or lower than the fixed reference value specified in the question.'),
 'pooledt':record('The populations represented by Group 1 and Group 2 have the same mean value of the quantitative outcome measured in both groups.','The populations represented by Group 1 and Group 2 have different mean values of the quantitative outcome measured in both groups.'),
 'posthoc':record('For the particular pair of study groups being tested, the population mean of the measured outcome is the same in both groups.','For the particular pair of study groups being tested, the population mean of the measured outcome differs between the two groups.'),
 'zprop':record('The proportion experiencing the event defined in the question is the same in the population represented by Group 1 and the population represented by Group 2.','The proportion experiencing the event defined in the question differs between the population represented by Group 1 and the population represented by Group 2.'),
 'contingency':record('The population proportions in every recorded outcome category are the same across the groups defined by the other categorical variable.','At least one population proportion in a recorded outcome category differs across the groups defined by the other categorical variable.'),
 'gof':record('In the population being classified, categories one, two and three contain sixty percent, twenty-five percent and fifteen percent of observations, respectively.','In the population being classified, at least one category proportion differs from its specified target of sixty percent, twenty-five percent or fifteen percent.')}
for dest,src in [('anovaSS','anova'),('bonferroni','posthoc'),('holm','posthoc'),('yates','zprop'),('chi','contingency')]:topics[dest]=copy.deepcopy(topics[src])
rules=dict(hmean=topics['anova'],onull=topics['onet'],propnull=topics['zprop'])

# Lecture examples keep the outcome and groups belonging to their own slide.
slides={}
for key,base in h['slides'].items():
 r={k:base[k] for k in ['nullWords','alternativeWords']}
 n=base['nullWords'];mid,page=map(int,key.split(':'))
 if n==h['topics']['anova']['nullWords']:r=topics['anova']
 elif n==h['topics']['pooledt']['nullWords']:r=topics['pooledt']
 elif n==h['topics']['onet']['nullWords']:r=topics['onet']
 elif n==h['topics']['zprop']['nullWords']:r=topics['zprop']
 elif n==h['topics']['contingency']['nullWords']:r=topics['contingency']
 elif n==h['topics']['posthoc']['nullWords']:r=topics['posthoc']
 elif 'HDL' in n and 'selected' in n:r=sources['pairs'][0]
 elif 'categories one' in n:r=sources['gof'][0]
 elif 'heart rate' in n and 'reference' in base['null'] or ('heart rate' in n and '\\mu_0' in base['null']):r=sources['onet'][0]
 elif 'Group 1 population' in n:r=record('For the selected comparison, the population represented by Group 1 and the population represented by the other selected group have the same mean measured response.','For the selected comparison, the population represented by Group 1 and the population represented by the other selected group have different mean measured responses.')
 elif 'cat-preference' in n:r=mean_pair('heart rate','the population of students who prefer cats','the population of students who prefer dogs')
 elif 'halothane' in n and 'cardiac index' in n:r=mean_pair('cardiac index','patients receiving halothane anesthesia','patients receiving morphine anesthesia')
 elif 'a thrombus' in n:r=prop_pair('develop a thrombus','placebo','aspirin')
 elif 'death' in n:r=prop_pair('die after the assigned anesthesia','halothane','morphine')
 elif 'adverse reaction' in n:r=prop_pair('experience an adverse reaction','the topical anesthetic gel','the placebo cream')
 elif 'probability of depression' in n:
  first,second=n.split('same in ',1)[1].rstrip('.').split(' and ',1)
  r=prop_pair('have the recorded depression outcome',first,second)
 slides[key]=copy.deepcopy(r)

# Theoretical Session 17 pages explain general comparisons. Specific cases
# retain their own populations and outcomes through moduleII, below.
m2slides={str(page):copy.deepcopy(topics['pooledt' if page in [2,8] else 'onet' if page==9 else 'zprop']) for page in [2,8,9,11]}
for page in [13,16]:m2slides[str(page)]=record('In the population represented by the sample, the proportion experiencing the event defined in the question equals the specified reference proportion.','In the population represented by the sample, the proportion experiencing the event defined in the question is either higher or lower than the specified reference proportion.')
result=dict(problems=problems,problemsC=problems_c,moduleII=m2records,sources=sources,topics=topics,rules=rules,slides=slides,moduleIISlides=m2slides)

def clean(o):
 if isinstance(o,dict):
  # Only the sentence fields are shipped. No new notation or pair blocks.
  if 'nullWords' in o:return {k:o[k].replace('mg/dL','milligrams per deciliter') for k in ['nullWords','alternativeWords']}
  return {k:clean(v) for k,v in o.items()}
 if isinstance(o,list):return [clean(v) for v in o]
 return o
result=clean(result)
(ROOT/'hypothesis-wording-v2-data.js').write_text('const BME_HYPOTHESIS_WORDING_V2='+json.dumps(result,ensure_ascii=False,indent=2)+';\n')
print('Version 2 verbal records:',{k:len(v) for k,v in result.items()})
