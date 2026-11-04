# F2 / source–filter / nonspeech fidelity audit

This records the source review made before integration. References to proposed replacements describe that review, not a request to regenerate or replace existing course content. The flat package now keeps source records and rebuild scripts; use the path and command notes below.

## 1. Replace the invented F2 continuum with source-institution audio

Official Haskins Labs now hosts its Pattern Playback audio at:
https://www.haskinslaboratories.org/pp-bdg-continuum

That page supplies **13 original synthetic/archival syllable audio files**, with source steps−6 through+6 and a full ascending continuum. The page explicitly calls the series “bae”→“dae”→“gae,” with vowel “ae.” It also explicitly says there are two formants, the lower is unchanged, and **only the second-formant transition changes** in equal-frequency steps. A third formant is therefore not necessary for this specific source demonstration. General speech place perception does use additional cues, but the course is explaining this historically controlled two-formant manipulation.

The current custom model's steadyF2=1100Hz does not match the front-vowel pattern in the source slide or this archive. The current custom step frequencies should not be passed off as the actual sound of that experiment. Use `haskins_bdg_all`, `haskins_bdg_minus_06`, `haskins_bdg_zero`, and `haskins_bdg_plus_06` instead. The fourteen source MP3 records, direct URLs, byte hashes, native22.05kHz format and decode results are retained in `haskins-formant-source.json`. Browser MP3 assets are deployed outside this authoring package in `../../clips/`. The full source WAV archive was downloaded privately during review but is not included here, and this flat package has no `source/` directory. Recover an archive MP3 through its recorded `original_url` and verify its recorded SHA-256 rather than regenerating its sound.

The official archive is a source-provided historical demonstration. It does not establish that these are bit-exact audio files delivered to every participant in a specific1957 experiment. The slide's printed illustration contains14patterns whereas its prose and current Haskins archive use13; the existing source should remain unchanged and the audio caption should identify the official13-item archive accurately.

Recommended mapping: speech1-13 through17 and the existing corresponding review pages2–5. Speech1-12 can use the archive as a machine demonstration. Speech1-18 has an empty V18 transcript and is a class-demonstration placeholder before beach–peach data, so do not attach an unrelated b–d–g recording there as if it were that word continuum. Ordinary separate neural /ba/,/da/,/ga/ samples should be retired from these original-continuum lessons because they introduce a different vowel/voice/formation and are not the manipulated series.

Copyright/license: the source institution explicitly offers individual audio downloads and full MP3/WAV archives, but no explicit reuse license is displayed. Retain Haskins Laboratories/Pattern Playback/Philip Rubin attribution; do not assert Creative Commons. These short source-provided teaching recordings are not modified.

## 2. Source–filter foundation examples are mechanism demonstrations

Speech1-6 through11 explicitly describes the lecturer's own sustained /u/ and Praat inverse/source–filter manipulation, with first formant≈300Hz and second≈900Hz. The current generated source/filter files correctly vary those advertised parameters while keeping the source fixed, but the source is a newly modeled glottal pulse, not a recovered extraction from that lecturer. Keep them only on these foundational mechanism pages, label the fixed-source/changed-filter parameters, and never claim they recover the lecturer's original recording or stand in for the later b–d–g experiment. The official Praat tutorial supports precisely this modeling exercise.

## 3. Nonspeech study families must use their own published parameters

Primary sources downloaded and relevant methods/figure read:

- Cutting & Rosner1974, *Categories and boundaries in speech and music*, Perception&Psychophysics16(3),564–570. https://doi.org/10.3758/BF03198588 . Methods on printed565/PDF2. Two Moog sawtooth arrays at440Hz **and**294Hz, nine rise settings0–80ms in10ms steps. Each has about1020ms decay, so total duration1020–1100ms. Original Moog oscillator had unspecified low-pass filtering and low-frequency amplitude modulation. The rise/decay curve formula is not given; Figure1 visually resembles an approximately linear decay.
- Jusczyk,Rosner,Cutting,Foard&Smith1977, *Categorical perception of nonspeech sounds by2-month-old infants*, Perception&Psychophysics21(1),50–54. https://doi.org/10.3758/BF03199467 . Methods on printed51/PDF2. **440Hz** Moog sawtooth at **0,30,60,90ms** rise, with **1020ms decay** and total durations1020,1050,1080,1110ms. Nominal0 means reaching maximum within one-quarter of a period. Equal30ms pairs were0–30 (reported pluck category),30–60 (reported across categories),60–90 (reported bow category).

The current400Hz/500ms/10–80ms generic harmonic tones do not match either cited stimulus set. The new infant digital reconstruction in `formant-build_infant_nonspeech.py --output-dir /tmp/ling406-infant-rebuild` uses actual Praat for pitch checking,48kHz band-limited40-harmonic sawtooth, matched source spectrum/peak across settings, published rise times and durations. The same explicit linear attack/decay choice is coordinated with the adult reconstruction agent. Exact analog cutoff, modulation, original tape and perceptual identification are not claimed.

A rebuild writes `infant-manifest.json` in its explicit output destination and supplies4single stimuli,3equal30ms pairs and the full four-item set. The classroom sequences add950ms silence between sounds, rather than claiming to reproduce the original sucking-trigger/tape trials. The rebuild’s `infant-validation.json` records known vs reconstructed parameters and actual Praat-measured pitch near440Hz. The retained integration-time validation snapshot here is `formant-infant-validation.json`. Generated `audio/` and `lossless/` folders belong only to the chosen rebuild destination.

Map these ONLY to speech1-30 and development1-11. The adult440/294Hz nine-step array is prepared separately by the parent's nonspeech synthesis agent for speech1-29 and development1-10. Do not pool both families under a single generic fast/slow label.
