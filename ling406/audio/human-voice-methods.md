# Human recordings and speech-based editing

The listening layer now favors recorded human speech over perfectly periodic oscillators or articulatory-model output for speech contrasts. The current registry contains 147 player entries backed by 143 files. Fifteen historical electronic examples and one estimated-source technical example remain available in collapsed optional groups. Ordinary new sentence-reading aids retain their individual model labels. The source slides, teaching text and study state remain separate from this change. The [active manifest](manifest.json) identifies each player, and [provenance](authoring/audio-provenance.json) records its source and processing.

The selection order is an original experimental recording when available, a published human-speech stimulus set for the same contrast, a documented pronunciation recording, then a clearly identified reconstruction from recorded speech. A natural-sounding voice and an exact replication of an experiment are different claims. Source identity, stimulus wording, manipulated dimensions and unavailable original materials remain explicit.

## A recorded human voice through the three filters

The source is Peter Ladefoged's actual cardinal-vowel recording, identified as /u/ on the [A Course in Phonetics chart](https://corpus.linguistics.berkeley.edu/acip/course/chapter9/cardinal/cardinal.html). The original recording is available as a listening reference. It is a whole vowel shaped by a vocal tract, not an unfiltered recording of the glottis.

The new filter comparison follows Praat's [Using existing sounds](https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html) procedure. A 10 kHz working copy is analyzed with Burg LPC, using ten coefficients, a 25 ms window, 5 ms steps and 50 Hz pre-emphasis. Inverse filtering estimates the excitation, retaining the recording's actual phonation fluctuations. The same estimated excitation then passes through filters with formants at 300/900/2500/3500 Hz, 600/900/2500/3500 Hz and 300/2200/2500/3500 Hz. No oscillator replaces the recorded voice.

The three outputs receive a constant gain per token to a common RMS of 0.045. This level matching makes their resonance differences easier to compare. It does not apply dynamic compression or alter their pitch or timing. The comparison adds 700 ms pauses between complete filtered tokens. It is a new demonstration using the slide's filter settings, not a recovery of the lecturer's own Praat files.

The [LPC inverse-filter residual](https://www.fon.hum.uva.nl/praat/manual/LPC___Sound__Filter__inverse_.html) includes effects of lip radiation and modeling assumptions. It is an estimate, not a direct glottal recording. Removing vocal-tract resonances makes even this human-derived residual sound buzzy, so its player belongs in the optional technical material. The default listening material uses the recorded voice and filtered vowels.

The ACIP chart credits Keith Johnson and identifies its speaker. It displays an all-rights-reserved notice. Source attribution is retained without inventing an open license. Objective formant and waveform checks do not establish a subjective naturalness score.

## Real recorded [ma], [na] and [ŋa]

The nasal players now use Tagalog-language recordings by the same identified Lingua Libre speaker, Kunokuno. The source recordings are [man](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-man.wav), [na](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-na.wav) and [nga](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-nga.wav). The speaker and recorder are credited on the source pages, with [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) attribution for the adapted excerpts. The source identifies the recording language; the speaker's native-language status was not independently established.

The excerpts retain the initial nasal and early /a/. The final /n/ of *man* is excluded. Their source intervals are 0.195–0.395 s, 0.165–0.395 s and 0.140–0.395 s, respectively. Each has a scalar level adjustment and a 6 ms end fade. No [g] segment is inserted, and no initial vowel, voice conversion, pitch flattening or time stretch is added. The naturally different core durations, 200, 230 and 255 ms, remain. These are pronunciation comparisons, not duration-matched laboratory tokens.

The target is [na–ŋa], and the control is [ma–na]. Both use the identical [na] waveform and one second of silence between tokens. They are new alternating listening comparisons. [Narayan, Werker and Beddor (2010)](https://doi.org/10.1111/j.1467-7687.2009.00898.x) used different, selected recordings from a female native Filipino speaker, including independent native-speaker identification and closely matched acoustic properties. Those original files were not recovered. The new excerpts do not reproduce that stimulus selection or establish the original infant discrimination difficulty. The previous VocalTractLab implementation remains documented as historical material in [nasal-stimuli.md](nasal-stimuli.md).

## Human stop references and published continua

**Natural ba, da, ga and pa references.** Peter Ladefoged's [recorded consonant chart](https://corpus.linguistics.berkeley.edu/acip/course/ipachart/consonants1.html) supplies actual human productions. Whole recorded tokens retain their original aspiration, release transitions, phonation and duration. The ba–pa comparison adds silence between complete recordings. These references are not a calibrated equal-VOT series. Likewise, three natural ba/da/ga tokens differ in several speech cues and are not an equal-F2-only continuum.

The historical Haskins Pattern Playback and formant-synthesizer recordings remain explicitly labeled archival electronic synthesis in optional material. Their original scientific role is retained, including the nominal VOT comparisons. They are not relabeled as natural speech. A natural reference and a historical controlled continuum answer different listening questions.

**Bear–pear.** The new human-voice set uses actual materials from [Murphy, Nozari and Holt (2025), *Bears don't always mess with beers*](https://doi.org/10.3758/s13423-025-02690-w), with [open Methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC12425842/) and [OSF stimuli](https://osf.io/5uqx8/). The authors report an adult female native American-English speaker, time-domain VOT editing and Praat control of F0 onset. The selected files hold published F0 onset at 230 Hz and contain nominal VOT values of 5, 10, 15, 25, 35, 40 and 45 ms. These seven available values are not evenly spaced. A common 6 dB playback reduction leaves the published within-token material intact; teaching sequences add 650 ms silence.

These are the 2025 study's real recordings, not recovered McMurray et al. (2003) lecture files. Their source labels and reported selection do not provide independent validation of a category boundary in this classroom player. The article is CC BY 4.0; the OSF node supplies no distinct dataset license, so no additional dataset license is asserted.

**Beach–peach.** The existing [Kim, McMurray, Sorensen and Oleson (2025)](https://doi.org/10.3758/s13423-025-02700-x) [OSF materials](https://osf.io/36qky/) already derive from recorded human speech. They remain identified as those later materials. Both VOT and vowel duration vary, so they are not described as a VOT-only manipulation.

**Gorpse–corpse.** The recorded-word source is [Dvortygirl's US-English pronunciation of *corpse*](https://commons.wikimedia.org/wiki/File:En-us-corpse.ogg), licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The selected left channel supplies the actual release, aspiration and complete word rhyme. Every member preserves the complete 10 ms release complex, including its two release transients, and a byte-identical complete vowel onset, later vowel, rhotic segment and final /ps/ after PCM conversion. Only middle portions of the original aspiration are deleted. No TTS, oscillator, random noise, vowel trimming or generated aspiration supplies the sound.

The 13 nominal release-to-common-rhyme delays span 10–70 ms in 5 ms increments. They are authoring intervals, not independently established glottal VOT measurements. The entire word becomes shorter as aspiration is removed. The source has about 74.44 ms between the selected release and rhyme anchors, so an 85 ms endpoint is not fabricated. A common gain sets the highest full-word RMS to 0.045. The [construction record](authoring/human-recordings/corpse/README.md) and [validation](authoring/human-recordings/corpse/validation.json) disclose the anchors, joins, preserved waveform regions and their limits. This is a new teaching reconstruction, not the original [Ganong (1980)](https://doi.org/10.1037/0096-1523.6.1.110) stimulus set. No listener-validated ambiguous step is inferred from an arbitrary midpoint or filename.

The separate **bear** and **pear** word-reference buttons reuse the published human endpoints. The **corpse** reference plays Dvortygirl’s complete recording with quiet gain only. The **gorpse-like** reference is explicitly a new short-lag manipulation of that word, not an unedited recording of a person saying the nonword.

## Sounds that are intentionally nonhuman

The [Cutting–Rosner (1974)](https://doi.org/10.3758/BF03198588) and [Jusczyk et al. (1977)](https://doi.org/10.3758/BF03199467) demonstrations concern nonspeech sawtooth sounds. Their rise-time contrasts would change meaning if replaced with spoken syllables. They therefore remain quiet tones, labeled nonspeech and mapped to the corresponding experiment. The adult and infant sets retain their separate published settings and their disclosed digital reconstruction choices.

## Artificial-language streams made from human recordings

The four active artificial-language examples now use twelve recorded Tagalog CV excerpts by the same identified Lingua Libre speaker, Kunokuno. Eleven source words were recorded on 7 April 2025. The recording of *Panitikan*, which supplies [ti], dates to 24 September 2021. All are credited under CC BY-SA 4.0. The speaker's native-language status was not independently established. The [source inventory](authoring/human-recordings/saffran/source_inventory.json), [source metadata](authoring/human-recordings/saffran/source_metadata.json) and [methods](authoring/human-recordings/saffran/README.md) identify these choices.

Praat PSOLA makes each excerpt exactly 250 ms at 24 kHz, with a scalar RMS target of 0.045. Every unit uses the same naturally falling pitch contour extracted from the recorded [ko], scaled near a nominal median of 95 Hz. Measured median voiced F0s still range from about 85.7 to 109.1 Hz because voiced regions, PSOLA behavior and pitch estimates differ. The source excerpts range from 125 to 265 ms, with at most a twofold overall duration change. No synthetic glottal source or neural voice replaces their recorded waveforms.

Every occurrence reuses the identical processed syllable PCM. The streams follow the slide's exact displayed letter sequence, with no added word gaps, and the whole-word *gopila* and part-word *bugiko* examples reuse those same units. Full and short streams last 33.75 and 7.5 seconds; each three-syllable example lasts 0.75 seconds. The [validation](authoring/human-recordings/saffran/validation.json) checks duration, levels, source identities and waveform reuse. Source coarticulation, unit joins and residual spectral or prosodic cues are not claimed eliminated. This is a human-recording teaching analogue, not a behaviorally validated artificial-language exposure.

The historical [Saffran, Aslin and Newport (1996) paper](https://infantlearning.waisman.wisc.edu/wp-content/uploads/sites/817/2017/02/SaffranAslinNewport1996.pdf) used MacinTalk synthetic speech sampled at 22 kHz and deliberately excluded pauses and intonational word-boundary cues. A human-based teaching version does not recover that original synthetic voice or exposure. The slide's tokibu/gikoba toy inventory also differs from the historical paper's experimental inventory.

## Methods used and methods considered

Praat supports several distinct operations. LPC inverse filtering estimates a recorded sound's excitation for source/filter experiments. TD-PSOLA copies and overlaps pitch-synchronous windows of recorded speech to change pitch or duration, retaining unvoiced material. Neither operation alone establishes a different consonant place, ejective articulation or a validated perceptual category.

Relevant methodological sources are Praat's [existing-sounds source/filter procedure](https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html), its [overlap-add explanation](https://www.fon.hum.uva.nl/praat/manual/overlap-add.html), [Winn (2020), *Manipulation of voice onset time in speech stimuli: A tutorial and flexible Praat script*](https://doi.org/10.1121/10.0000692), and [Moulines and Charpentier (1990), *Pitch-synchronous waveform processing techniques for text-to-speech synthesis using diphones*](https://doi.org/10.1016/0167-6393(90)90021-Z). The latter paper's bibliographic metadata was verified; its complete text was not reviewed here. A reference to a research technique does not imply an exact implementation of every parameter in that paper.

[WORLD, Morise, Yokomori and Ozawa (2016)](https://doi.org/10.1587/transinf.2015EDP7457), was considered as a speech analysis/resynthesis approach. The current replacements do not claim to implement WORLD or TANDEM-STRAIGHT. No voice-cloning or neural-vocoder method is inferred merely from a natural-sounding output.

## Source and construction records

The active source packages retain identities, credits and applicable licenses alongside the waveform processing.

| Family | Current evidence |
| --- | --- |
| Source/filter | [Recorded source and LPC prototype](authoring/human-recordings/source-filter/prototype.json), [level matching](authoring/human-recordings/source-filter/level-matching.json), [methods](authoring/human-recordings/source-filter/README.md) |
| Nasals | [Active player manifest](authoring/human-recordings/nasals/active-manifest.json), [extraction manifest](authoring/human-recordings/nasals/manifest.json), [source metadata](authoring/human-recordings/nasals/kunokuno_metadata.json) |
| Natural stop references | [Player manifest](authoring/human-recordings/cv/manifest.json), [source manifest](authoring/human-recordings/cv/source-manifest.json) |
| Bear–pear | [Published-file manifest](authoring/human-recordings/bear-pear/manifest.json), [methods and attribution](authoring/human-recordings/bear-pear/README.md) |
| Gorpse–corpse | [Reconstruction manifest](authoring/human-recordings/corpse/manifest.json), [preservation checks](authoring/human-recordings/corpse/validation.json) |
| Artificial-language streams | [Player manifest](authoring/human-recordings/saffran/manifest.json), [source inventory](authoring/human-recordings/saffran/source_inventory.json), [validation](authoring/human-recordings/saffran/validation.json) |

## Remaining source gap and verification

The exact Salish [kʼi–qʼi] pair remains unavailable. The [FirstVoices Nlakapamuxcheen community archive](https://www.firstvoices.com/nlakapamuxcheen) offers actual Elders' pronunciation recordings, but its available alphabet labels and word contexts do not establish this matched pair. It is an external listening resource, not a relabeled experimental replacement. The community's [source statement](https://www.firstvoices.com/nlakapamuxcheen/our-language) requests consent before copying Elders' recordings to social media. No general redistribution license is assumed, and no community audio is silently republished in these players.

Validation records distinguish source identity from signal construction. They check original and derived hashes, sample counts, decoding, clipping, levels, reused tokens and the acoustic parameters appropriate to each family. Native-speaker identification, experimental replication and independent ratings of human naturalness are not claimed without those evaluations. Existing study conclusions remain tied to their original experiments.
