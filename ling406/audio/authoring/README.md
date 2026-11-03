# LING406 phonetic audio additions

The current Narayan lesson players use the matched consonant-vowel reconstructions in [vocaltract-nasals/](vocaltract-nasals/), documented in [../nasal-stimuli.md](../nasal-stimuli.md). The older `nasal_m`, `nasal_n` and `nasal_ng` IPA-context files described below remain archived references and are not mapped to these lessons.

These are additive listening aids. Original source slides, transcripts and experiment claims must remain unchanged.

## Available assets

- `source_buzz`, `vowel_base`, `vowel_raise_f1`, `vowel_raise_f2` use a differentiated glottal source with Praat FormantGrid filtering. Base resonances are F1 300/F2 900 Hz; the two changes set F1 to 600 or F2 to 2200 Hz. Frequency targets above F2 remain fixed. These demonstrate source-filter machinery and do not claim to recover the lecturer's personal Praat files. `source_filter_comparison` concatenates all four in that order.
- `f2_step_01` … `f2_step_13` use a fixed F1 transition and 13 linearly spaced F2 onset values from 500–2500 Hz. After 50 ms, F2 reaches 1100 Hz. A common amplitude scale is used across all steps. `f2_equal_steps` concatenates the sequence with 450 ms gaps. The construction follows the Praat source-filter tutorial and the lecture's equal-step principle, not a bit-exact Liberman et al. recreation. Label individual steps by number or frequency, not empirically unvalidated /b/, /d/, /g/ category identity. This is particularly important because third-formant information also helps place perception.
- `vot_00`, `vot_40`, `vot_80` gate the periodic source at 0, 40 or 80 ms after the modeled release. Shared burst and aspiration waveforms and a constant vocal-tract filter are used. `vot_comparison` plays these in order with 500 ms gaps. Their acoustics isolate a timing manipulation, but they are not complete reconstructions of Eimas, Kuhl–Miller, Maye, or the chinchilla stimuli. Do not assign universal phoneme boundaries or use listening scores as an assessment.
- `nasal_m`, `nasal_n`, `nasal_ng` are authentic phonetician John Esling IPA productions from USC's 2015 real-time MRI chart. The entire original audio context is preserved. They illustrate the place contrast, but are not matched /ma/, /na/, /ŋa/ stimuli or the recordings used by Narayan et al. No explicit reuse license is displayed on the source chart; retain source credit.
- `saffran-stream`, `saffran-short-stream`, `saffran-word`, `saffran-part-word` are newly modeled controlled speech. Exact source-slide sequences are in `saffran_source_inventory.json`. Twelve Kokoro-82M syllables with explicit IPA inputs were processed by Praat PSOLA to 160 Hz pitch targets and 250 ms per syllable, equalized to the same RMS, and concatenated with no added word gaps. The same unit waveforms make GOPILA and BUGIKO. Praat’s random initialization is fixed to seed 406 for reproducible PSOLA. Measured median voiced F0 is close to 160 Hz in every unit, as recorded in the validation file. This is a source-derived demonstration rather than a recovery of the historical 1996 exposure. Natural stop closures and equal unit joins remain, and we do not claim to remove every possible acoustic cue.
- User-uploaded modeled Hindi/Salish approximations were inspected but omitted from the selected audio assets because the upload did not document the synthesis engine or independent phonetic validation. Use the separately credited authentic recordings with their context caveats.

- `nonspeech_attack_10`, `nonspeech_attack_80` and `nonspeech_attack_comparison` model 10 ms versus 80 ms amplitude rise in the same 400 Hz harmonic complex. They are not real instrument recordings or the original Cutting–Rosner stimuli.

## Basis for the methods

Authoritative Praat manuals were read directly and saved as text in `method_readings.json`, including the Source-filter tutorial, its ba–da example, FormantGrid unscaled filtering, and KlattGrid documentation. The ba–da manual currently contains internally inconsistent prose/example values; this implementation states its own exact parameters, uses linear tiers, and does not claim a literal reproduction of that example. Praat is used as the actual filter and PSOLA engine via `praat-parselmouth==0.4.7`.

Bibliographic metadata and abstracts where available were checked for these primary methodological publications in `primary_references.json`:

- Klatt (1980), *Software for a cascade/parallel formant synthesizer*. https://doi.org/10.1121/1.383940
- Jadoul, Thompson & de Boer (2018), *Introducing Parselmouth: A Python interface to Praat*. https://doi.org/10.1016/j.wocn.2018.07.001
- Lisker & Abramson (1964), *A Cross-Language Study of Voicing in Initial Stops: Acoustical Measurements*. https://doi.org/10.1080/00437956.1964.11659830
- Rosenberg (1971), *Effect of Glottal Pulse Shape on the Quality of Natural Vowels*. https://doi.org/10.1121/1.1912389
- Saffran, Aslin & Newport (1996), *Statistical Learning by 8-Month-Old Infants*. https://doi.org/10.1126/science.274.5294.1926

These references support the methods and teaching concepts. They do not establish that newly generated samples equal historical stimuli. We have not claimed access to unpublished experimental sound files.

## Reproduction and verification

1. The 12 original Kokoro syllable WAVs are preserved in `units/`, along with the exact IPA input and engine/model provenance. They permit deterministic Praat reconstruction without downloading the neural model again. The parent audio authoring pipeline can regenerate them from `saffran_input.json` if desired.
2. Install requirements and ensure FFmpeg/FFprobe are available. Run `build_phonetic.py --output /tmp/ling406-phonetic`, then `build_saffran.py --output /tmp/ling406-phonetic`, then `build_sequences.py --output /tmp/ling406-phonetic`. All scripts use relative source-unit/configuration paths and the explicit output path. The first script downloads the public USC IPA recordings for nasal examples.
3. Run `validate.py --output /tmp/ling406-phonetic`. It decodes every MP3, checks rendered vowel energy near the specified resonances, checks post-voicing periodicity, and checks equal F2 spacing. `saffran-validation.json` additionally records actual pitch estimates and exact equal sample counts/RMS across every syllable unit.

No waveform is a patient imitation, and no model uses voice cloning. No recording is described as native speech or original experimental audio unless its source actually supports that description. Acoustic checks are not independent phonetic identification by expert listeners.
