# LING406 Module II audio fidelity decisions

Audit baseline: `929574a`. All **107 active clips**, **128 mapped lecture/review sections** and **398 placements** are accounted for in `ling406_all_audio_fidelity_audit.json`. This is the pre-correction audit, so new replacement clips will increase the final inventory. No teaching prose or original source files were edited by the auditor.

## Keep the exact spoken examples

All 67 initial English/explicit-IPA neural inputs preserve the printed wording or intended clean phonetic labels. That includes deliberately ungrammatical GJT sentences, *gorping*, /bis/ for *beace*, and hard-/g/ /gɪŋ/ for *ging*. These recordings are useful new readings. They are not historical voices or calibrated experimental acoustic manipulations.

- Garden-path sentences: keep exact wording, identify model-generated prosody. Intonation is not evidence for the original parser/reading-time effect.
- Aphasia examples: keep comprehension target sentences, never describe them as patient speech or as the complete degraded/dual-task condition.
- GJT: all 14 strings exactly match the original slide table. The source task was untimed and auditory, so a new spoken stimulus-text reading fits its modality. It is not a validated/original test recording.
- ERP: retain sentence wording. For *perches/needs*, explicitly identify a spoken reading of an originally visual form-typicality example. For *pizza/proof*, say a new reading of the printed ERP example, without making an unsupported claim that all classic ELAN presentation was visual. Continuous audio does not reproduce original word timing.
- Kingdom/device: retain displayed passage excerpts, not full original familiarization recordings. Normal adult speech is not original infant-directed speech.
- TRACE/cohort: lexical pronunciations are references to possible candidates. A competitor pronunciation does not imply that the participant heard that competitor on the target trial.

## Correct the condition roles

The independently inspected original `l2-learning/17.webp` table establishes both conditions:

| Condition | Spoken target | English competitor | Russian competitor |
| --- | --- | --- | --- |
| English target example | **speaker** | spear | **спички**, matches |
| Russian target example | **спички**, matches | **spear** | спицы, knitting needles |

- `l2-learning-17`, `-18`, `-21`, `review-50`, `-51`, `-54`: the Russian спички pronunciation is an **unspoken competitor reference** in the English example. The target is speaker.
- `l2-learning-19`, `review-52`: retain the same Russian recording under a **Russian target** alias, remove wrong English speaker, and add spear only as an **unspoken English competitor reference**. New roles must be condition-specific despite a shared audio file.

## Replace specific acoustic mismatches

| Family | Current issue | Required mapping |
| --- | --- | --- |
| Generic VOT | 0/40/80-ms vowel-like model is neither lexical rhyme nor infant comparison set | Separate matched beach–peach, bear–pear and published infant stimulus sets; keep clean words as word labels |
| F2 continuum | Generic tutorial numerical trajectories and unvalidated category boundaries | Primary Liberman parameter reconstruction, labeled new model; clean ba/da/ga separate |
| Adult nonspeech | Generic 400-Hz, 500-ms tones do not match the adult study | `speech1-29` and `development1-10`: Cutting/Rosner 1974 adult source-based 294/440-Hz nine-step arrays |
| Infant nonspeech | Same generic adult-like pair reused | `speech1-30` and `development1-11`: Jusczyk 1977 own 440-Hz, 0/30/60/90-ms rise set and equal-30-ms comparisons |
| Hindi | Alphabet vowel/contexts do not establish matched experimental syllables | Matched source-appropriate dental/retroflex CV examples, with explicit model/source limits |
| Salish | Full native words have different vowels/whole-word context | Remove those target mappings; replace only with matched kʼi/qʼi or documented appropriate reconstruction |
| Korean | Correct 불/뿔/풀 words, different voices | Prefer same-speaker three-way series; otherwise individual native pronunciation reference only |
| Ganong | Corpse/gorpse clean endpoints lack ambiguity | Source-based common-tail VOT continuum, or exact endpoint-word references only |
| Andruski | Clean beace/ging words lack near-boundary manipulated onset | Add documented manipulation or retain as clean printed-word references, not recreated priming trials |

## Adult nonspeech files ready

`/workspace/scratch/ling406_nonspeech_correction/` contains a reproducible generator, source PDF, manifest, validation records, 18 individual WAV/MP3 stimuli and four comparison sequences. Recommended player selections:

- `cutting_rosner_1974_saw_440_endpoints_00_80`
- `cutting_rosner_1974_saw_440_ordered_00_to_80`
- `cutting_rosner_1974_saw_294_ordered_00_to_80`

The published frequency, nine nominal rises and 1020–1100-ms duration range are preserved. The 0-ms item peaks at one quarter period. Linear decay is a transparent Figure-1-informed digital modeling choice because the exact envelope law, Moog filtering and modulation are not reported. These are source-based reconstructions, not recovered analog files or independent perceptual replications. Frequency, timing, decoding and deterministic rebuild checks pass.

## Other limits and cleanup

- Source-slide Saffran toy streams are already controlled: uniform-duration reused syllables, 160-Hz target, equal RMS, no added word gaps, exact displayed strings. Keep them labeled **source-slide toy reconstruction**. Do not say *tokibu/gikoba/gopila/tipolu* or 33.75 seconds are the complete historical 1996 stimuli/exposure.
- Already corrected VTL nasal CV models can remain. Present target **[na]–[ŋa]** first, salient **[ma]–[na]** separately. They are matched new articulatory models, not natural original female Filipino study recordings.
- French page 8 explicitly lists only **auto, rivière, bicyclette**. Remove prior-page extra **voiture, fleuve, vélo** there; keep all six on page 7.
- No active clips currently recreate Maye distribution schedules/test items, the live-versus-recorded social manipulation, Dutch artificial cognates or sign-language/patient cases. Do not substitute unrelated recordings for those gaps.

The final audit classifies **87 baseline placements** as requiring replacement/removal; other placements retain the wording with appropriate role, modality or modeling labels. This number is a pre-correction placement count, not the number of bad files or remaining issues after integration.
