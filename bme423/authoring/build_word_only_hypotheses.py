"""Add contextual, sentence-only hypotheses without changing source files or calculations."""
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
  problems[pid]=mean_pair('the interval response measured in the clinical study','the first clinical population','the second clinical population')
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
  outcome='attention score' if is_neuro else 'the interval response measured in the clinical study'
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
result=dict(problems=problems,problemsC=problems_c,moduleII=m2records,sources=sources)
def expand_units(o):
 if isinstance(o,dict):
  for key,value in o.items():
   if key in ['nullWords','alternativeWords']:o[key]=value.replace('mg/dL','milligrams per deciliter')
   else:expand_units(value)
 elif isinstance(o,list):
  for item in o:expand_units(item)
expand_units(result)
(ROOT/'hypotheses-word-data.js').write_text('const BME_WORD_HYPOTHESES='+json.dumps(result,ensure_ascii=False,indent=2)+';\n')
print(f'Authored contextual word-only records for {len(problems)} earlier problems, {len(m2records)} Module II comparisons, and {len(sources)} source blocks.')
