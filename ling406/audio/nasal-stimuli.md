# Matched nasal syllables for the Narayan example

The target contrast is **[na]–[ŋa]**. The easier comparison is **[ma]–[na]**. [ma] is not a member of the target pair.

The previous lesson players used complete IPA demonstrations in other vowel contexts. They were not suitable as the syllables in this experiment. They have been retired from these lesson mappings. Their files and source credits remain in the repository for traceability.

The replacement players contain newly generated consonant-plus-[a] syllables, with a separate target-pair player and control-pair player. Source pages speech1-32 and development1-13 show both comparisons; development1-14 shows only the [na–ŋa] target pair and its two individual syllables. The same correction appears in collection, guide, expanded, combined and core views without changing their text or source slides.

## What the original experiment used

Narayan, C. R., Werker, J. F., & Beddor, P. S. (2010). The interaction between acoustic salience and language experience in developmental speech perception: evidence from nasal place discrimination. *Developmental Science*, 13,407–420. https://doi.org/10.1111/j.1467-7687.2009.00898.x

The [author-hosted paper](https://saplabyork.github.io/pdfs/narayan2010.pdf), printed pages411–412, reports natural speech from a female native Filipino speaker. Three tokens of each syllable were selected to minimize differences in pitch, level contour and the latter vowel quality. An independent native speaker identified all nine. The same [na] tokens were used in both contrasts. Mean syllable durations were approximately483–499 ms and initial nasals approximately121–128 ms. Tokens in the infant trials were separated by about1000 ms. Numerical fundamental-frequency contours and complete acoustic-filter trajectories are not published.

The original audio files were not recovered. These new recordings are **stimulus-style teaching reconstructions**, not the original Filipino speaker's recordings. A four-token alternating comparison is a listening aid, not the original nine-token randomized trial or a replication of its infant discrimination criterion.

## How the new syllables were made

The engine is the official **VocalTractLab 2.4 articulatory synthesizer**, using its W02 female anatomy preset and continuous modal phonation. This models a changing branched vocal tract with oral and nasal cavities, rather than pronouncing English spellings such as “nga.”

- [ma] starts with the lips closed and the nasal port open.
- [na] starts with an alveolar tongue-tip closure and the nasal port open.
- [ŋa] starts with a velar tongue-body closure and the nasal port open. There is no separate [g] segment or second oral closure.
- Each releases directly into the same [a] vowel gesture. There is no leading vowel from an /aCa/ recording.
- All three use the same anatomy,223 Hz pitch target,500 ms duration, sample rate and RMS level. The pitch is a controlled choice for this model, not a value claimed from Narayan's original recordings.
- The generated geometry places nasal closure release at about122.5,122.5 and125 ms. The two comparisons reuse the identical [na] waveform and put1000 ms of silence between tokens.

The primary methodological basis is **Birkholz (2013), “Modeling consonant-vowel coarticulation for articulatory speech synthesis,” PLOS ONE**, https://doi.org/10.1371/journal.pone.0060603 . It describes context-sensitive articulatory consonant targets and smooth transitions into the vowel. The official release, speaker models and source are available at https://www.vocaltractlab.de/index.php?page=vocaltractlab-download .

Another relevant primary study is Larkey, Wald & Strange (1978), “Perception of synthetic nasal consonants in initial and final syllable position,” https://doi.org/10.3758/BF03199713 . It demonstrates research use of controlled nasal synthesis and listener identification, but used a different vowel and was not copied as if it were Narayan's stimuli.

## Verification and scope

`authoring/nasal-stimuli.json` and `nasal-stimuli-validation.json` record exact output hashes, source parameters, the shared [na] token, timing and measured output pitch. Small gesture scores and area-function summaries in `authoring/vocaltract-nasals/` confirm the distinct closure locations, open velopharyngeal port, direct release to [a], and absence of a second oral closure. Both comparison WAVs contain exact copies of the same individual-token waveforms.

All five MP3s decode successfully. Geometry, pitch, timing and level checks establish model construction; they do not constitute native-Filipino listener identification or acoustic equivalence to the unrecovered recordings. These examples demonstrate the intended syllable contrast without claiming to reproduce its exact experimental difficulty or measured infant results.

Rebuild instructions and version-pinned downloads are under `authoring/vocaltract-nasals/`. No VTL binary, speaker preset, third-party source archive, or original participant recording is embedded in the site.
