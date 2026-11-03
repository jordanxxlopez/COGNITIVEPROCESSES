# Module II audio fidelity audit

**Listening-level update.** The 31 sustained acoustic examples now play and download as PCM WAV copies reduced by 12 dB with uniform gain. The formant, pitch, timing and amplitude-rise comparisons remain intact, including exact decoded sample counts. Original source files and historical hashes are retained separately. Rounding to 16-bit PCM introduces a small measured quantization error. This update adds no filtering, compression, normalization or onset fades. See the measured [level-adjustment record](authoring/listening-levels.json).

The correction covers **every previously active recording**, not just the nasal examples. At baseline commit `929574a`, the listening layer contained **107 recording entries across 398 clip-to-slide placements** in 128 lecture/review sections. All 107 entries and all 398 placements were checked against their source content and available stimulus methods. The audit identified **87 placements requiring replacement or removal**. That number counts placements, not 87 different recordings.

The corrected registry contains **140 player entries backed by 139 distinct audio files**. One Russian word file has separate target and competitor entries so its role can be stated correctly in each condition. Twenty-one older generic or mismatched entries have been retired from lesson mappings. Their files and provenance remain archived for traceability. A retired file's presence in the repository does not make it a current lesson stimulus.

The source slides, teaching transcripts, questions, collection order and study-state keys are preserved. The existing guide's Slides + audio toggle, topic expansion controls and matched nasal comparisons remain available. Audio is an additional learning aid.

## What the recordings represent

Each player identifies its source and method. These distinctions matter when connecting a conclusion to an experiment.

| Recording type | What it supports | What it does not establish |
| --- | --- | --- |
| Published or archived research sound | Listening to the source institution's or published dataset's actual sound files | That the same files were used in every older experiment discussed nearby |
| Native-source pronunciation excerpt | Hearing a documented native example with the intended syllable or word context | Recovery of the original infant/adoptee study's trial recordings |
| Controlled reconstruction | Hearing a new sound with explicitly specified, research-informed parameters | A replicated behavioral effect, validated category boundary or exact historical waveform |
| Newly spoken printed example | Hearing the actual words shown on the slide, including deliberate grammatical errors | Recovery of the original voice, prosody, timing or experimental presentation modality |
| Mechanism demonstration | Hearing a physical source/filter manipulation on the relevant foundation pages | A substitute for a later study's specific stimulus set |

No new recording impersonates a participant, patient or child. Technical decoding, sample timing and acoustic checks are not independent native-speaker or perceptual validation.

## Replacements and placement corrections

### Formant-based speech categories

The b–d–g pages now use the [official Haskins Pattern Playback archive](https://www.haskinslaboratories.org/pp-bdg-continuum). Its 13-step series has a common “ae” vowel, fixed F1 and equally spaced F2 onsets. The source calls the endpoints “bae”, “dae” and “gae”. The institution's original MP3 bytes are retained. This replaces the invented F2 series and separate neural /ba/, /da/, /ga/ readings on these pages.

This is a source-provided historical demonstration, not proof that these digital files are identical to all participant stimuli in the specific 1957 study. The lecture's original illustration remains unchanged, including its own pattern count. The player accurately identifies the 13-item archive.

The separate Praat source/filter examples remain restricted to the foundation pages that explain a fixed source and changed resonances. They are new mechanism models, not extractions from the lecturer's own voice.

### Stop voicing and lexical continua

- **Infant-oriented CV comparisons** use [Haskins Abramson–Lisker labial stop–vowel recordings](https://www.haskinslaboratories.org/vot). Selected nominal VOT labels are −20, 0, +20, +40, +60 and +80 ms. The comparisons preserve the lecture's equal 20 ms differences, including +20/+40, −20/0 and +60/+80. They are not verified as Eimas et al.'s original files. Repetition and silence are new classroom assembly. CV syllables are not used as substitutes for word continua.
- **Beach–peach** uses actual public research tokens from [Kim, McMurray, Sorensen and Oleson (2025)](https://doi.org/10.3758/s13423-025-02700-x), available in the [OSF materials](https://osf.io/36qky/). These are that later study's files, not recovered McMurray et al. (2003) lecture files. Both VOT and vowel duration vary in the published material, so the players do not call it a VOT-only manipulation or invent per-step measurements.
- **Bear–pear** has a new nine-step controlled word reconstruction. **Gorpse–corpse** has a separate new 17-step reconstruction. Kokoro supplies one starting word waveform per family. Numerical editing then keeps the burst and entire rhyme identical while changing an intervening aperiodic aspiration interval. These are word-specific demonstrations, rather than generic vowels or two independently generated endpoints.

For the new word reconstructions, the authored release-to-common-rhyme delays span 5–85 ms. Bear–pear uses 10 ms increments and gorpse–corpse uses 5 ms increments. This range is a new teaching choice. Total word duration changes with the inserted interval. The reported delay is a construction parameter, not an independently measured natural first glottal pulse. No step is claimed to be an experimentally established ambiguous token.

Waveform splicing has a research basis, including the 2025 paper's stimulus methods, but this construction is not an exact implementation of that paper. Relevant original studies remain [McMurray et al. (2003)](https://doi.org/10.1023/A:1021937116271) and [Ganong (1980)](https://doi.org/10.1037/0096-1523.6.1.110). Their conclusions come from their experiments, not from listening to these new clips. See [word construction methods](authoring/fidelity/word-vot-methods.md) and [published-file methods](authoring/fidelity/published-vot-methods.md).

### Adult and infant nonspeech studies

The generic 400 Hz, short-duration fast/slow demonstration has been retired from both study families. Separate digital reconstructions now follow each primary paper's published settings.

| Study | Fundamental frequency | Nominal onset rises | Decay |
| --- | --- | --- | --- |
| [Cutting and Rosner (1974)](https://doi.org/10.3758/BF03198588) | 294 Hz and 440 Hz | Nine settings, 0–80 ms in 10 ms steps | 1020 ms |
| [Jusczyk et al. (1977)](https://doi.org/10.3758/BF03199467) | 440 Hz | 0, 30, 60 and 90 ms | 1020 ms |

The infant comparisons use equal 30 ms differences, 0–30, 30–60 and 60–90 ms. Adult and infant sets are mapped to their respective pages. The nominal zero rise follows the papers' quarter-period convention, rather than claiming a mathematically instantaneous attack. The new sounds use a 40-harmonic digital sawtooth with explicit linear rise/decay choices. The original Moog filtering, modulation and exact analog envelope were not fully specified or recovered. These are published-parameter reconstructions, not original tapes or newly validated “pluck”/“bow” categories.

### Native language contrasts

**Hindi [t̪a–ʈa].** The current players use native consonant-vowel excerpts from the official [A Course in Phonetics Hindi stop recordings](https://corpus.linguistics.berkeley.edu/acip/vowels/chapter12/hindi.html). The source words /t̪al/ and /ʈal/ share the same vowel and coda. Each excerpt ends at 260 ms, before the lateral transition. The stop release and early /a/ remain, with common RMS normalization, an 8 ms end fade and matching padding. No English substitute, vowel splicing or neural Hindi approximation is used. These are new excerpts for the intended contrast, not the original Werker–Tees recordings. The source does not establish a named speaker identity. See [derivation parameters](authoring/fidelity/hindi-cv-derivation.json).

**Korean.** The current players use one official [ACIP Seoul Korean archive/table series](https://corpus.linguistics.berkeley.edu/acip/appendix/languages/korean/korean.html), replacing the mixed-speaker dictionary examples. Complete native words provide the lenis, tense and aspirated lip-stop series 불/뿔/풀 and tongue-tip series 달/딸/탈, with the same vowel/coda within each set. The source does not name the speaker, so a verified same-speaker experimental series is not claimed. These are native demonstrations, not adoptee-study trial recordings.

**Salish [kʼi–qʼi] remains unavailable.** The previous authentic full words had different vowels and word lengths, /kʼexem/ and /qʼa/. They do not match the intended /i/ pair and have been removed from those lesson players. A visible availability notice replaces that misleading pairing. Accessible alternative material did not establish the exact contrast, and an ejective-capable synthesis with appropriate validation was not available. English /ki/ and a guessed /qi/ are not supplied as substitutes. This is an unresolved source gap, not a completed recreation.

**Nasals.** The earlier correction remains in place. [Matched VocalTractLab syllables](nasal-stimuli.md) keep [na–ŋa] separate from the easier [ma–na] control. The full-context Esling IPA recordings are archived references, not the active Narayan stimulus players. These articulatory models remain new teaching reconstructions rather than the original study voice.

### Words, sentence examples and condition roles

The audit retained correct printed-word and sentence readings, including intentional errors in grammaticality examples and the horse garden path. A new reading can add prosody that affects difficulty, so exact wording alone does not recreate an experiment. Visual form-typicality examples involving *perches* and *needs* are labeled spoken aids for a visual task. Pizza/proof ERP examples are labeled newly spoken printed examples without asserting an independently established original presentation modality or timing. Clean *beace* and *ging* readings remain lexical references, not reconstructions of near-boundary priming manipulations.

The Russian-language condition now identifies **спички** as the target and **spear** as an unspoken English competitor reference. English **speaker** is no longer played as that Russian condition's target. In the English-target condition, **speaker** remains the target and **спички** is explicitly an unspoken competitor reference. French page 8 now includes only its three printed examples, **auto**, **rivière** and **bicyclette**. The additional gender synonyms remain on the page where they actually occur.

The artificial-language streams retain shared, equalized syllable units and no added word gaps. They reconstruct the lecture's displayed toy sequence, not the full historical Saffran et al. exposure. The source-slide inventory and existing acoustic checks remain available.

## Evidence, rights and limits

- [Full baseline audit](authoring/full-audio-fidelity-audit.json) records every original entry, placement classification and source gap.
- [Resolution record](authoring/fidelity-resolution.json) records retired, retained and new IDs, current hashes and the unresolved Salish pair.
- [Active manifest](manifest.json) and [provenance](authoring/audio-provenance.json) identify the deployed player mappings and files. Supporting source manifests, scripts and measured parameters are in [authoring/fidelity/](authoring/fidelity/).
- Source credits are retained. Haskins displays no explicit reuse license on the referenced pages. The ACIP pages credit Keith Johnson and display an all-rights-reserved notice. Kim et al.'s article is CC BY 4.0, while the OSF node does not specify a dataset license. No additional license is invented for those recordings.

This audit checks the complete previously active listening layer. It does not mean every possible auditory experiment in Module II has been recreated. The audit separately records unimplemented source gaps, including Maye's learning distributions, Dutch pseudowords, social-exposure manipulations and patient/ASL material. Those are not replaced with unrelated recordings or presented as recovered stimuli.
