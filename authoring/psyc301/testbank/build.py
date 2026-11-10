"""Build the separately scoped bank from the supplied PDF's extracted MCQs.
Original question/answer provenance stays in authoring; no source PDF is published.
"""
import json, pathlib, re
ROOT=pathlib.Path(__file__).resolve().parents[3]
HERE=pathlib.Path(__file__).resolve().parent
source=json.loads((HERE/'source-questions.json').read_text())
original={q['id']:q for q in source}
rows=[]
for line in (HERE/'curation.txt').read_text().splitlines():
 if not line or line.startswith('#'):continue
 id,target,why=line.split('|',2); module,page=target.split(':')
 q=dict(original[id]);q.update(module=int(module),page=None if page=='extra' else int(page),scope='extra' if page=='extra' else 'slides',why=why)
 rows.append(q)
by={q['id']:q for q in rows}
# Self-contained stems. Keep the tested distinction and the source's answer identity.
stems={
'G05-002':'Models of memory are refined when new evidence shows that brief retention involves active processing as well as storage. Which revision reflects this finding?',
'G05-013':by['G05-013']['stem'].replace('How would Broadbent describe Jamal’s actions in the car?', 'Which memory process describes Jamal’s actions in the car?'),
'G05-019':'For someone familiar with the dates 1492 and 1776 and the emergency number 911, which grouping most effectively chunks the digit sequence 14929111776?',
'G05-024':'Under Miller’s classic capacity estimate, short-term memory is',
'G12-010':'Which use keeps an object in its conventional function, rather than illustrating an alternative use that overcomes functional fixedness?',
'G12-017':'A Tower of Hanoi task starts with three discs stacked on the left peg and requires moving the stack to the right peg. The starting arrangement is the __________ state.',
'G12-019':'Which element in problem solving is an action connecting states, rather than an initial, intermediate, or goal state?',
'G12-030':'Using the fortress solution to solve the radiation problem illustrates the role of __________ in problem solving.',
'G12-032':'When a previously solved fortress problem guides the solution to a new radiation problem, the fortress problem is the __________ problem.',
'G12-037':'Observations of scientists solving problems in their actual workplaces show that __________ play(s) an important role in transferring useful relationships to new scientific problems.',
'G12-041':'When established procedures obstruct a novel solution, being willing to reject those procedures suggests that __________ may matter more than __________ for that creative breakthrough.',
'G12-049':by['G12-049']['stem'].replace('factoring the equation','solving the equation').replace('9x2','9x²').replace('4x2','4x²'),
'G13-003':by['G13-003']['stem'].replace('Given your text’s discussion of inductive reasoning in science, we might suspect that', 'We might suspect that'),
'G13-012':by['G13-012']['stem'].replace('There is a _________________ chance that Sarah is a science major.', 'Using only the class base rate, there is a _________________ chance that a randomly selected student such as Sarah is a science major.'),
'G13-016':'Two machines contain equal proportions of yellow and orange gumballs. Treat each draw as independent with a 50 percent chance of either color. The large machine dispenses 15 gumballs per coin; the small one dispenses 5. Tim wants at least 80 percent of the dispensed gumballs to be one color. With one coin,',
'G13-031':'In a one-shot ultimatum game, accepting any positive offer maximizes immediate monetary payoff. Relative to that narrow benchmark, Sanfey and coworkers found that people tended to make the __________ decision of __________.',
'G13-043':'What principle is essential for selecting the cards that could disprove the rule in the Wason four-card problem?'
}
for id,stem in stems.items():by[id]['stem']=stem
by['G13-038']['options'][1]='The argument is valid: the conclusion follows from the premises.'
# Nonunique or conceptually problematic source keys stay available, but are never graded or embedded.
review=['G12-045','G12-055','G13-013','G13-021','G13-027']
for id in review:by[id]['scope']='review'
# Also map directly shared concepts to the Module II lab collection, without inventing article-specific questions.
lab={1:['G05-029'],3:['G05-012'],5:['G05-009','G05-011'],7:['G10-009','G10-046'],8:['G13-014'],9:['G13-045'],12:['G13-029'],13:['G12-008','G12-011'],14:['G05-037'],17:['G13-028']}
for q in rows:
 q['refs']=[] if q['scope']!='slides' else [[q['module'],q['page']]]
 for page,ids in lab.items():
  if q['id'] in ids:q['refs'].append([14,page])
 q['source']={'chapter':q['chapter'],'question':q['number'],'originalAnswer':'ABCD'[q['correct']]}
 q['edited']=q['stem']!=original[q['id']]['stem'] or q['options']!=original[q['id']]['options']
 assert len(q['options'])==4 and len(set(q['options']))==4
 assert not re.search(r'your text|the text[’\']s|in the textbook|in your textbook',q['stem'],re.I),q['id']
 assert len(q['why'])>100
 assert not re.search(r'\b[A-D]\s+(?:and|or)\s+[A-D]\b|of the above', ' '.join(q['options'])),q['id']
pack={'revision':'goldstein-module2-1','sourceTitle':'Goldstein Cognero bank · supplied PDF','chapters':[5,12,13],'imagerySubset':[1,9,38,45,46],'questions':rows}
(ROOT/'psyc301-testbank-data.js').write_text('window.PSYC301_TESTBANK = '+json.dumps(pack,ensure_ascii=False,indent=2)+';\n')
summary={scope:sum(q['scope']==scope for q in rows) for scope in ['slides','extra','review']}
(HERE/'audit.json').write_text(json.dumps({'counts':summary,'total':len(rows),'rewritten':[q['id'] for q in rows if q['edited']],'review':review,'scope':'All 166 MCQs in chapters 5, 12 and 13; five directly relevant imagery MCQs from chapter 10. Other chapters and open-response prompts excluded. No unrelated imagery extras.'},indent=2)+'\n')
print(summary,'total',len(rows))
