"""Add the untouched legacy C and an additive, transcript-grounded D edition.

Coordinates in ADDITIONS always address the original C, never a previously
modified result. A child position is an insertion before that original child;
the original parent and every original child remain verbatim and in order.
"""
from copy import deepcopy
from hashlib import sha256
import json
import statistics

SOURCE_SHA256 = '8f6e6d67bb1b757be51a493981e3c4d4e6facb0762809774b9b723bb099c942d'
LABELS = {
    'original-c': 'Original C · Version 23 Iskarous C with following slides',
    'd': 'D · Original C with teaching additions',
}

# lecture, source page, original parent, insertion before original child,
# evidence key, new teaching. These are individually placed explanations,
# rather than a common paragraph appended to every page.
ADDITIONS = [
    (11, 2, 0, 1, 'equilibrium',
     'Reaching **equilibrium** means the spring has reached its resting length. It does not mean the mass has stopped. The mass still has motion at that point, which is why returning toward equilibrium becomes an ongoing cycle rather than a single trip back.'),
    (11, 3, 0, 1, 'mass-stiffness',
     'The prediction concerns **how quickly the cycle repeats**, rather than how far the mass travels. To explain a slower vibration, connect the added mass to the greater difficulty of reversing its motion while the spring stays the same.'),
    (11, 4, 0, 1, 'two-modes',
     '**Mode 1 and mode 2 name patterns of the whole system.** They do not name the first and second masses. Both masses participate in either pattern, and the distinction is whether their movements agree or oppose one another.'),
    (11, 6, 0, 1, 'three-modes',
     'A still middle mass is part of the **second-mode pattern**. Its stillness does not turn the system into a two-mass system. The three masses still permit three modes, with the middle mass participating differently in each one.'),
    (11, 8, 2, 1, 'spectrum',
     'A spike’s **frequency** tells which vibration it represents, while its **amplitude** tells how much of that vibration is present. A taller spike means a stronger contribution, rather than a faster vibration.'),
    (11, 10, 1, 0, 'voice-test',
     'The test is whether the measured spikes follow the predicted **regular spacing**. Different voices can begin at different frequencies and still support the same prediction, because each voice has its own lowest frequency and multiples of that frequency.'),
    (11, 11, 1, 0, 'odd-multiples',
     'The **second mode** is the second allowed pattern. In this fixed–free system it is three times the lowest frequency, rather than twice that frequency. Counting allowed modes and counting multiples of the lowest frequency therefore give different numbers.'),
    (12, 6, 2, 1, 'local-mass',
     'The physical change is the same heavier middle mass in every case. What differs is the **mode being considered**. One change can therefore lower the first and third mode frequencies while leaving the second unchanged.'),
    (12, 9, 2, 0, 'motion-compression',
     'A point can remain still while the material beside it stretches and compresses. **No local displacement does not mean no restoring action.** The stiffness effect depends on that changing separation between neighboring parts, rather than on how far the marked point travels.'),
    (12, 11, 0, 0, 'perturbation',
     'Both changes are made at **one marked location**. The opposite results come from the fourth and fifth modes using that location differently, rather than from moving the added mass to one spot and the added stiffness to another.'),
    (12, 14, 0, 1, 'air-boundaries',
     '**Fixed and free describe the air’s motion at the two ends of the model.** The closed vocal-fold end prevents the adjacent air from moving back and forth, while the open lip end permits that motion. The analogy concerns those endpoint conditions.'),
    (12, 15, 1, 1, 'formant-count',
     'Calling F2 the **second formant** puts it second in the ordering of the air resonances. It does not say that its frequency is twice F1. The three-times relationship belongs to the uniform fixed–free tube illustrated here.'),
    (12, 23, 0, 1, 'air-spacing',
     'Follow the **spacing between adjacent lines of air** as well as their travel. Lines can move a long way together without being squeezed closer to each other. Compression is the change in their spacing, so large motion by itself does not establish large compression.'),
    (13, 2, 0, 1, 'cancellation',
     'Opposite tendencies alone do not establish cancellation. For a frequency to stay unchanged, the effective increases must actually balance. In a system with many parts, the **location of the change and the mode’s movement there** decide how strongly each tendency counts.'),
    (13, 8, 0, 0, 'quarter-waves',
     'A **quarter-wave packet** is a piece of the spatial pattern. Adding more of those pieces within the same overall length produces a higher allowed frequency. The requirement to finish at a free, moving end is what excludes an even packet count.'),
    (13, 10, 1, 1, 'formant-example',
     'For example, if this uniform tube has F1 at **200 Hz**, its second and third formants are **600 Hz and 1,000 Hz**. The useful reasoning is one, three and five times the first frequency; 200 is an illustrative starting value rather than a value shared by every vocal tract.'),
    (13, 11, 2, 1, 'air-nodes',
     'The still locations belong to a particular **mode pattern**. They do not mean that all the air has stopped. Air elsewhere in that same mode continues to move, while neighboring regions compress and expand around the still locations.'),
    (13, 16, 1, 0, 'vowel-u-test',
     'The comparison starts with **schwa and then changes to /u/** in the same voice. Both formants moving downward is the predicted result of loading the freely moving lip region, so the measurement checks the mechanism rather than just naming the vowel.'),
    (13, 17, 1, 0, 'vowel-i-test',
     '**F1 falling while F2 rises** is especially informative because the two changes go in opposite directions. The result follows from one constriction meeting a mass-dominated part of one mode and a stiffness-dominated part of the other.'),
    (13, 20, 1, 1, 'source-filter',
     'The filter acts on the **harmonics already supplied by the source**. A formant indicates where that source energy is favored. It does not replace the harmonic comb with a new set of spikes at the formant frequencies.'),
    (14, 6, 0, 0, 'air-spacing',
     'The visible evidence for springiness is that neighboring air slices **approach and separate**. When the slices travel together at nearly constant separation, their visible behavior instead emphasizes the moving mass. This distinction lets the animation support a causal explanation.'),
    (14, 15, 1, 1, 'intonation',
     'The same words, **“the dog slept here,”** can become a statement or a question as their pitch contour changes. That change concerns the vocal-fold vibration and its F0, while the vowel’s formant pattern concerns the shape of the tract.'),
    (14, 16, 1, 1, 'source-filter',
     'The harmonic nearest a formant becomes prominent **at the harmonic’s own frequency**. The formant shapes the relative strengths of the available harmonics; it does not require a harmonic to sit exactly at the resonance.'),
    (14, 17, 1, 0, 'sparse-harmonics',
     'A formant can still be a resonance even when **no harmonic lies close enough to show it clearly**. Sparse source harmonics make the filter harder to read from the resulting spectrum, which explains why a high-pitched voice can obscure the vowel pattern.'),
    (14, 18, 0, 0, 'spectrogram',
     'The amplitude shown by **height in a spectrum** becomes **darkness in a spectrogram**. Frequency still identifies which vibration is present, while the added time axis shows how those strengths and formant locations develop as the mouth moves.'),
    (14, 20, 1, 0, 'splice',
     'The crucial manipulation keeps the **consonant from ma** but supplies the **vowel from na**. Hearing na shows that the decision about the consonant uses the following vowel’s transition, rather than being fixed by the isolated consonant segment alone.'),
    (14, 22, 0, 2, 'network-io',
     'One pair of formant measurements leads to **one decision across five alternatives**. The five output neurons represent competing vowel identities for that same input, rather than five different recordings.'),
    (15, 2, 1, 1, 'weights-activations',
     'The **formant values** describe the particular recording being recognized. The **weights** describe how the network uses those values. A new recording supplies new inputs, while learning changes the weights that will be used to process recordings.'),
    (15, 3, 3, 1, 'probabilities',
     'Adding up to one makes the output a **valid probability distribution**, but it does not make the answer correct. The largest probability can still belong to the wrong vowel. Correctness requires comparing the prediction with the known vowel.'),
    (15, 6, 1, 1, 'target-error',
     'The **desired output** comes from knowing which vowel produced the recording. It supplies the standard against which the computed output is judged. Learning changes the network’s weights to approach that standard, rather than changing the answer to agree with the network.'),
    (15, 7, 1, 1, 'weight-direction',
     'For this marked connection, a **positive activation and positive weight** contribute positively to done. Making that weight smaller reduces its contribution. The explanation depends on this connection’s sign and destination, rather than on a rule that every weight should decrease.'),
    (15, 8, 1, 1, 'backward-reuse',
     'The difficult early-weight problem **contains the downstream problem**. Solving from the output backward makes the downstream error information available when its contribution is needed for an earlier connection, instead of treating each early weight as an unrelated problem.'),
    (15, 8, 2, 0, 'sgd-and-dp',
     '**Dynamic programming supplies the order and reuse of the error calculation. SGD supplies the gradual adjustment of the weights.** Together they explain both why the calculation starts near the output and how repeated small changes improve the network.'),
    (15, 9, 0, 2, 'target-matrix',
     'The zeros in a **one-hot target** do not stand for missing recordings. Each zero says that its vowel is not the answer for this row, while the single one identifies the vowel that actually produced this pair of formants.'),
    (15, 10, 1, 0, 'sequential-linear',
     '**Sequential specifies the order of the layers, and Linear specifies the weighted multiplication and addition within a processing layer.** Those lines describe how information will be processed. The learning commands are what use an error to improve the weights.'),
    (15, 10, 2, 0, 'learning-commands',
     '**Backward** works out how the error depends on the weights, and **step** applies the weight changes. The backward calculation is part of learning; an ordinary prediction still carries the input forward toward the output.'),
    (15, 11, 1, 2, 'sigmoid',
     'Near the middle of the **S-shaped curve**, a small input change can produce a substantial response change. Near either flat end, a comparable input change has much less effect. That gives the model its contrast between a sensitive transition and a nearly settled response.'),
    (15, 12, 1, 0, 'sigmoid-control',
     'Keeping the **input and weights fixed** isolates the effect of the activation function. A different output after switching on sigmoid shows that processing changed, rather than showing that the network learned from a new target.'),
    (16, 5, 1, 0, 'overlap',
     'A point in an overlapping region can have formants compatible with **more than one vowel label**. This is an information problem for the two measured inputs. Moving a decision boundary cannot give the same pair of numbers a uniquely recoverable identity when the recordings overlap.'),
    (16, 11, 1, 1, 'processing-layers',
     'The **input layer receives F1 and F2** without taking an inner product. That is why counting all the layers in the diagram gives one more layer than counting the Linear processing instructions in the program.'),
    (16, 12, 2, 0, 'sigmoid',
     'The steep middle and flatter ends explain why sigmoid behaves **almost like a switch** while still allowing intermediate values. The output is bounded, but the curve remains gradual rather than assigning only an exact zero or an exact one.'),
    (16, 13, 0, 1, 'sigmoid-control',
     'When one hidden activation changes, **every downstream layer must use that new value**. Keeping the connection weights unchanged does not keep later activations unchanged, because their inputs have just changed.'),
    (16, 14, 0, 1, 'sigmoid-code',
     '**Linear computes a weighted sum; Sigmoid transforms the result of that sum.** Placing Sigmoid after a hidden linear layer gives those two operations a definite order before the resulting activations enter the next layer.'),
    (16, 15, 1, 0, 'chance',
     '**Knowing nothing does not imply zero correct guesses.** With five alternatives, a random guess can still land on the right vowel. The one-in-five chance level explains the approximate 20% starting accuracy before the weights carry useful knowledge.'),
    (16, 16, 0, 1, 'initialization',
     'The repeated runs keep the **same training data** and change the **starting weights**. Their different paths therefore show how the starting point affects learning, rather than comparing different sets of recorded vowels.'),
    (16, 16, 1, 1, 'accuracy-limit',
     'Similar final accuracy does not mean the runs took the same route. The important contrast is **different learning paths reaching a similar limit**, with the overlap in the two-formant data helping explain why that limit remains below perfect recognition.'),
    (17, 3, 1, 0, 'recurrent-feedback',
     'This feedback carries information about **what the system just produced into its next moment of processing**. It is different from describing the backward error calculation used to learn the weights. The recurrence gives the running network a history.'),
    (17, 4, 2, 1, 'context-window',
     'The **number of vectors** tells how many items are in the context, while the **numbers within each vector** describe an item. These are two different dimensions of the representation, so a long context is not the same thing as a large vector.'),
    (17, 4, 4, 0, 'next-target',
     'A real sequence supplies the **training answer**. Hiding the next word in an existing sentence gives the model something to predict and then compare against, so the next-word task creates repeated opportunities to correct the weights.'),
    (17, 4, 5, 0, 'agent-roles',
     'The outline, draft, criticism and revision are **different jobs assigned to whole language models**. Passing the draft back for another criticism forms a loop, so this example is organized by the roles and messages between models.'),
    (17, 5, 0, 0, 'context-window',
     '**Fifteen vectors and a sixteenth prediction are the small example.** The organizing idea is to use the available context to predict the next item. The same idea applies when the context contains many more items.'),
    (18, 2, 3, 0, 'inference-learning',
     'During **inference**, the learned weights supply the knowledge used to produce a response. During **learning**, the mismatch with a known target is used to revise that knowledge. Producing a new response and improving the weights are different operations.'),
    (18, 3, 1, 1, 'heads',
     'Calling a head an **expert** means that it has learned weights for contributing to the numerical representation. It is a component inside the language model, rather than a separate model that receives an outline or writes a draft.'),
    (18, 3, 2, 0, 'heads-width-depth',
     'The diagram has both **width and depth**. Several heads contribute within one layer, and successive layers transform the combined representations again. More heads and more layers therefore describe different aspects of the organization.'),
    (18, 4, 2, 1, 'dynamic-depth',
     'The comparison follows the **representation as it develops through the model**. Each stage starts from what the preceding stage produced. This explains the dynamical-system connection without treating an LLM’s changing numerical trajectory as a literal spring oscillation.'),
    (18, 5, 2, 1, 'ordered-patches',
     'Sound already unfolds in time, while the picture is given an **order by its sequence of patches**. What the prediction task needs in both cases is a sequence of vector representations and a next item to predict.'),
    (18, 7, 2, 0, 'letter-learning',
     '**Good next-letter predictions require knowledge of the patterns in the words.** Repeated prediction and correction can put those constraints into the weights, even though the immediate task is to guess a continuation rather than recite a list of phonotactic rules.'),
]


def build_editions(root, out):
    source_file = root / 'transcripts-v22.json'
    actual_hash = sha256(source_file.read_bytes()).hexdigest()
    assert actual_hash == SOURCE_SHA256, 'Original C changed; review anchors before rebuilding D.'
    source = json.loads(source_file.read_text())
    evidence = json.loads((root / 'authoring/c-d-teaching-evidence.json').read_text())
    original = deepcopy(source)
    original.update(id='original-c', label=LABELS['original-c'])
    original['origin'] = dict(file='transcripts-v22.json', sha256=actual_hash,
                              originalSelector='v23', originalContentVersion='v22',
                              followingSlides=True, teachingCopiedVerbatim=True)
    d = deepcopy(original)
    d.update(id='d', label=LABELS['d'])
    placements = []
    # Reverse coordinates leave every original index stable during insertion.
    for n, page, block, child, key, text in sorted(ADDITIONS, key=lambda a: a[:4], reverse=True):
        cid = f'lecture{n}'
        section = d['collections'][cid]['sections'][page - 1]
        base = source['collections'][cid]['sections'][page - 1]
        assert section['page'] == page and base['teaching'], (cid, page)
        assert key in evidence['excerpts'], key
        parent = base['teaching'][block]
        assert 0 <= child <= len(parent.get('children', [])), (cid, page, block, child)
        assert text not in json.dumps(base['teaching'], ensure_ascii=False)
        section['teaching'][block].setdefault('children', []).insert(child, text)
        placements.append(dict(id=f'd-{cid}-p{page}-b{block}-c{child}', collection=cid,
          page=page, sectionId=section['id'], originalBlock=block, beforeOriginalChild=child,
          originalParent=parent['text'], evidence=key, text=text))
    placements.reverse()
    changed = {(p['collection'], p['page']) for p in placements}
    total = sum(len(c['sections']) for c in source['collections'].values())
    assert original['collections'] == source['collections']
    # Reconstruct C by removing only the recorded inserted strings.
    recovered = deepcopy(d['collections'])
    for p in placements:
        children = recovered[p['collection']]['sections'][p['page']-1]['teaching'][p['originalBlock']]['children']
        assert children.count(p['text']) == 1
        children.remove(p['text'])
    assert recovered == source['collections'], 'D must retain every original character in order.'
    d['origin'].update(teachingCopiedVerbatim=False, baseTeachingRetainedVerbatim=True)
    d['additions'] = dict(provenance='modern/edition-c-d-provenance.json',
      count=len(placements), pages=len(changed), module1='Original C retained without additions; no Module I verbal transcript in this source.',
      module2='Additions use the supplied Oct 6–Nov 5 verbal transcript at the relevant original bullet.')
    counts = [len(' '.join(t for b in s['teaching'] for t in [b['text'], *b['children']]).replace('**','').split())
              for c in d['collections'].values() for s in c['sections'] if s['teaching']]
    d['baseMetrics'] = deepcopy(source['metrics'])
    d['metrics'] = dict(instructionalPages=len(counts), words=sum(counts),
      averageWords=round(sum(counts)/len(counts)), medianWords=statistics.median(counts),
      maximumWords=max(counts))
    d['guidance'] = 'D keeps every Original C explanation verbatim, with source-grounded teaching additions integrated at the relevant bullets. No original passage is condensed or rewritten.'
    for payload in [original, d]:
        (out / f'transcripts-{payload["id"]}.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2)+'\n')
    report = dict(originalSource=dict(file='transcripts-v22.json', sha256=actual_hash,
      selector='v23', label='Version 23 · Iskarous C with following slides'),
      preservedModernEditions=['professor','b','c','follow','v20'],
      pagesPerEdition=total, baseTextRemoved=0, baseTextRewritten=0,
      addedPassages=len(placements), pagesWithAdditions=len(changed),
      preservedWithoutAdditions=[cid for cid in source['collections'] if not any(c == cid for c,p in changed)],
      evidence=evidence, placements=placements)
    (out / 'edition-c-d-provenance.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
    return LABELS
