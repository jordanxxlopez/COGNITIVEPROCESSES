# Independent board audit — Lecture 18 Versions 21–23

## Scope and standard

I compared the updated runtime payloads for Versions 21 and 22 against the approved Lecture 18 v6 notes, existing Lecture 18 slide inventory and reviewed transcript/source map, the LING285 authoring requirements, and the saved style guidance for these editions. I checked the actual runtime JSON rather than relying on dropdown labels. Version 23 is implemented as Version 22's teaching payload with the established following-slide presentation, so its prose and source fidelity are inherited from the verified Version 22 payload.

The editions retain the original eight source pages in order, all existing page IDs and kinds, the title page and final design prompt. Version 21 is the focused professor-style edition: it compresses side details while keeping causal explanations and the supported outcome. Version 22 is the natural teaching-notes edition: it explains more of the model, examples and relationships in connected prose. The shared head/layer explanation is compatible with both actual styles; a new paraphrase on every page is not required.

## Content and factual review

Both versions teach the neuron and weighted-sum foundation, sequence prediction, model training versus inference, attention heads within layers, the nonlocal dog/parents/barks dependency, and the agent graph and feedback concepts. Both retain the oscillator update sequence, recurrent feedback, and the distinction between reusing recurrent weights over time and layer-specific LLM weights. The vector-sequence examples include word, sound, image and amino-acid inputs; the insulin B-chain continuation is correctly given as Y. Their phonotactics coverage preserves sound-versus-letter distinctions and language-specific limits. Version 22 includes the broader Mandarin/Cantonese, onset/coda and syllable-boundary comparisons; Version 21 selects representative examples in keeping with its focused style.

The next-letter training example now distinguishes the design from the actual initial output. Four heads, five layers, 64-dimensional vectors, 1,000 words and ten requested samples are presented as the reported design. The largely gibberish result and tentative vowel observation are qualified; 10,000 words and more iterations are proposals, not achieved findings. The NumPy and pronunciation-resource details remain attributed as reported. Version 22 retains the specific Software 1.0/2.0/3.0 and Shannon 1948 distinction from the new transcript. The Shannon examples are described as statistical sequence approximations, not modern attention networks. The exam emphasis remains limited to heads and their within-layer contributions.

During review, Version 21's prior wording that a GPT trained only on the game “learns” English sounds and spelling sounded like an established outcome, conflicting with the reported gibberish run. This was corrected to say the task can test whether a model learns those patterns. The final page-7 text keeps the design and observed outcome distinct. The reference to ng is limited to the English examples.

## Preservation and runtime wiring

A structural comparison against the committed baseline confirms every collection other than Lecture 18 is unchanged in each edited version file. Lecture 18's eight section IDs, page order, kinds, titles, and final prompt page remain intact. The app's existing `v23 -> v22` alias is present and unchanged, and the existing following-slide layout flag continues to render Version 23 using the approved Version 22 prose while pinning each slide beside its notes. No other version payload is changed by these two JSON edits.

## Disposition

**APPROVE** Versions 21 and 22 for Lecture 18 content and style, and Version 23 as the established following-slide rendering of the approved Version 22 content, bound to these runtime file hashes:

- `transcripts-v21.json`: `4f18d09824b1eaf944851d41247c5d4d40ee21b6ebe3ef65f15083f2cf9f4ad4`
- `transcripts-v22.json`: `aca5878686db9bad96c5176dc974d38eaf0a11c647132e2c13bfee305d242cf7`

This content review does not by itself certify the final browser rendering, deployment, or GitHub push; those remain separate release checks.
