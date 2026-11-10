"""Section 14. Assemble a new, source-owned practice bank with three wording choices."""
from collections import defaultdict
import re,hashlib,json
from pathlib import Path
from modern_mcq import MCQ
from modern_wording import SIMPLE,plain_written
from modern_option_feedback import ALTERNATIVES
from modern_college import COLLEGE

BLUEPRINT={
 'lecture11':'restore transverse heavier stiffer amplitude two-low two-high three-count three-high middle-load four-count mixture continuous node-cycle node-mass node-stiff antinode-load same-place ff-pieces ff-five shorter-wave free-pieces free-even predict-test membrane-rule'.split(),
 'lecture12':'heavier stiffer two-low two-high three-count middle-load mixture continuous node-cycle node-mass node-stiff antinode-load box-opposite same-place ff-pieces free-pieces air-long air-compress air-antinode narrow-up narrow-two u-both i-opposite a-opposite high-vowels'.split(),
 'lecture13':'node-cycle node-mass node-stiff antinode-load same-place ff-pieces ff-five ff-three shorter-wave free-pieces free-next free-even top-building building-air air-long air-compress narrow-up narrow-two u-both i-opposite a-opposite filter-heights harmonic-formant sparse spectrogram-axes'.split(),
 'lecture14':'air-long air-compress u-both i-opposite a-opposite high-vowels source-spacing harmonics-150 filter-heights harmonic-formant pitch-change sparse spectrum spectrogram-axes spectrogram-rise i-to-a splice-context network-input network-hidden incoming-weights weight-role negative-sign forward-role random-wrong linear-dimensions'.split(),
 'lecture15':'network-input network-hidden incoming-weights weight-role negative-sign forward-role random-wrong valid-list dean-target last-target paired-rows backward-order dp-reuse gradient-step positive-output negative-output early-weight linear-dimensions insert-hidden input-processing clear-gradients rate-size sigmoid-low sigmoid-mid sigmoid-probability'.split(),
 'lecture16':'network-input network-hidden forward-role valid-list paired-rows backward-order dp-reuse gradient-step positive-output early-weight linear-dimensions insert-hidden clear-gradients rate-size sigmoid-low sigmoid-mid sigmoid-nonlinear sigmoid-probability sigmoid-downstream vowel-overlap scatter-axes five-baseline plateau restarts restart-constant'.split(),
 'lecture17':'recurrent-context same-item-context vector-material distribution-uncertainty sequence-position onset coda sp-choice skr-choice syllable-break knee cloze-learning broad-narrow sequence-order state-versus-update recurrent-backward observed-next sixteenth vector-not-label possible-word split-cluster completion-implicit one-neuron-level biological-model weight-role'.split(),
 'lecture18':'same-item-context vector-material distribution-uncertainty sequence-position onset coda sp-choice syllable-break knee cloze-learning broad-narrow sequence-order observed-next vector-not-label heads-parallel head-expert layer-state agent-critic revision-loop agent-certainty software-one software-two software-three one-neuron-level heads-combine'.split(),
}

def wording(question,concept):
    # Do not prepend generic framing to an already self-contained question.
    return {'original':question,'college':question,'simple':plain_written(question)}

def assemble(data,qa,asked,review,hard,code,connections,concepts,page_map,model):
    rank={r['concept']:r for r in model['ranking']}
    candidates=defaultdict(list)
    def add(lid,concept,q,answer,sources,origin):
        if not q or any(x['basePrompt']==q for x in candidates[lid]):return
        candidates[lid].append(dict(basePrompt=q,concept=concept,answer=answer,sources=sources,origin=origin))
    for q in qa:
        add(q['lectureId'],q['concept'],q['question'],'\n\n'.join(q['answer'][:2]),q['sources'],'new slide-linked explanation')
    for g in asked:
        refs=[dict(collection=g['collection'],page=p) for p in g['pages']]
        for item in g['items']:add(g['collection'],g['concept'],item['question'],item['answer'],refs,'new question-form application')
    for r in review:
        key=page_map[r['collection']].get(r['pages'][0],'local-change')
        refs=[dict(collection=r['collection'],page=p) for p in r['pages']]
        add(r['collection'],key,r['question'],r['answer'],refs,'adapted supplied review prompt')
        add(r['collection'],key,r['change'],r['changedAnswer'],refs,'new review variation')
    for h in hard:
        add(h['collection'],h['concept'],h['question'],h['answer'],[dict(collection=h['collection'],page=p) for p in h['pages']],'new mechanism check')
    for c in code:
        add(c['collection'],c['concept'],c['question'],c['answer'],[dict(collection=c['collection'],page=p) for p in c['pages']],'new program interpretation')
        for lid,p in c.get('also',[]):add(lid,c['concept'],c['question'],c['answer'],[dict(collection=lid,page=p)],'new program interpretation')
    for c in connections:
        relevant=[r for r in c['sources'] if int(r['collection'][7:9])>=11]
        lid=(relevant[-1] if relevant else c['sources'][0])['collection']
        key=page_map[lid].get(next(r['page'] for r in c['sources'] if r['collection']==lid),'next-token')
        add(lid,key,c['question'],c['answer'],c['sources'],'new connected application')
    # A second focused written question for each MCQ adds a direct conceptual
    # explanation rather than another copy of its selected-option task.
    for lid,keys in BLUEPRINT.items():
        assert len(keys)==25 and len(set(keys))==25,(lid,len(keys))
        for key in keys:
            item=MCQ[key];concept=item['concept']
            pg=next((p for p,k in page_map[lid].items() if k==concept),None)
            if pg is None:pg=FALLBACK_PAGES[lid][concept]
            question=WRITTEN_CASES.get(key)
            if question:add(lid,concept,question,item['reason'],[dict(collection=lid,page=pg)],'new transfer problem')
    questions=[]
    selection_file=Path(__file__).with_name('modern-written-selection.json')
    retained=json.loads(selection_file.read_text()) if selection_file.exists() else {}
    for collection in data['collections']:
        if collection['role']!='lecture':continue
        lid=collection['id'];module=collection['moduleId'];pool=candidates[lid]
        count=25 if module=='module2' else min(20,len(pool))
        if module=='module2' and len(pool)<25:raise ValueError((lid,'written pool incomplete',len(pool)))
        # Cover as many distinct concepts as possible before adding a second item.
        pool.sort(key=lambda q:-(rank.get(q['concept'],{}).get('score',0)))
        picked=[];used=set()
        for item in pool:
            if item['concept'] not in used:picked.append(item);used.add(item['concept'])
        for item in pool:
            if item not in picked:picked.append(item)
        if lid in retained:
            by_prompt={q['basePrompt']:q for q in pool}
            if any(prompt not in by_prompt for prompt in retained[lid]):raise ValueError((lid,'update the reviewed written selection after changing a prompt'))
            picked=[by_prompt[prompt] for prompt in retained[lid]]
        else:retained[lid]=[q['basePrompt'] for q in picked[:count]]
        for i,item in enumerate(picked[:count],1):
            variants=wording(item['basePrompt'],item['concept'])
            fingerprint=hashlib.sha256((item['basePrompt']+'\0'+item['answer']).encode()).hexdigest()[:14]
            questions.append(dict(id=f'modern-{lid}-written-{fingerprint}',lectureId=lid,moduleId=module,type='written',
              topic=item['concept'].replace('-',' '),concept=item['concept'],prompt=variants['original'],wordings=variants,
              answer=item['answer'],rubric=[],sources=item['sources'],origin=item['origin'],
              priority=1+rank.get(item['concept'],{}).get('score',0),edition='ling285-modern-1',bankKey=f'written-{lid}-{fingerprint}'))
        if module!='module2':continue
        for i,key in enumerate(BLUEPRINT[lid],1):
            item=MCQ[key];concept=item['concept'];pg=next((p for p,k in page_map[lid].items() if k==concept),None)
            if pg is None:pg=FALLBACK_PAGES[lid][concept]
            variants=wording(item['prompt'],concept)
            variants['college']=COLLEGE[key]
            variants['simple']=SIMPLE[key]
            options=[dict(id='correct',text=item['correct'],feedback=item['reason'])]
            alternatives=ALTERNATIVES[key]
            assert len(alternatives)==3 and len({text for text,_ in alternatives})==3,key
            for j,(text,feedback) in enumerate(alternatives,1):
                options.append(dict(id=f'alt-{j}',text=text,feedback=feedback))
            fingerprint=hashlib.sha256(json.dumps([item['prompt'],item['correct'],alternatives],ensure_ascii=False).encode()).hexdigest()[:10]
            questions.append(dict(id=f'modern-{lid}-mcq-{key}-{fingerprint}',lectureId=lid,moduleId=module,type='mcq',
              topic=concept.replace('-',' '),concept=concept,prompt=variants['original'],wordings=variants,
              answer=item['reason'],rubric=[],sources=[dict(collection=lid,page=pg)],options=options,correctOption='correct',
              priority=1+rank.get(concept,{}).get('score',0),edition='ling285-modern-1',bankKey=key))
    selection_file.write_text(json.dumps(retained,ensure_ascii=False,indent=2)+'\n')
    return questions

# Explicit source owners for concepts also depicted by a related source pattern.
FALLBACK_PAGES={
 'lecture11':{'oscillation':2,'frequency':3,'local-change':6},
 'lecture12':{'constriction':22},
 'lecture13':{'source':20},
 'lecture14':{},
 'lecture15':{'vowel-network':2,'weights':2,'sequential':10},
 'lecture16':{'vowel-network':2,'sequential':11,'training-code':11},
 'lecture17':{'weights':2,'forward':2},
 'lecture18':{'agents':2}
}

WRITTEN_CASES={
 'sequence-order':'Why can rearranging the same vectors change a next-item prediction without a training update?',
 'state-versus-update':'How can a recurrent state change while the learned weights remain fixed?',
 'recurrent-backward':'How does carrying recurrent state differ from carrying error information backward for learning?',
 'observed-next':'How can the actual next item provide feedback for a sequence predictor?',
 'sixteenth':'What is supplied and what is withheld when fifteen vectors are used to predict the sixteenth?',
 'vector-not-label':'How does representing a word as a vector differ from predicting a distribution over next words?',
 'possible-word':'What does it mean for a sound sequence to be possible in English without assigning it a meaning?',
 'split-cluster':'What physical or structural knowledge is relevant when comparing split with an excluded onset rearrangement?',
 'completion-implicit':'How can completing a sequence reveal a learned restriction without stating that restriction verbally?',
 'one-neuron-level':'How does combining neurons into a network add organization around weighted responses?',
 'biological-model':'What can an arithmetic model preserve from biological processing without reproducing every physical detail?',
 'heads-combine':'How do contributions from parallel heads become useful to the next layer?',
 'software-one':'What distinguishes an explicitly written procedure from a learned input-to-output relationship?',
 'software-two':'How can trained weights carry useful task behavior while the training process still uses code?',
 'software-three':'How can communicating models combine with both learned weights and executable software?',
 'revision-loop':'Why does returning a critique to a reviser create a feedback relationship?',
 'agent-certainty':'Why is a checking procedure different from evidence that its final claims are correct?',
 'agent-critic':'How does a critic agent’s task differ from an attention head’s contribution?',
 'layer-state':'What aspect of repeated state change is useful for understanding depth in a model?',
 'head-expert':'What does the expert analogy describe about a head, and what does it leave unestablished?',
}
