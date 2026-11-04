# Published VOT and beach–peach listening materials

This flat authoring package retains the exact selected source WAVs in `archive-source-wavs/haskins_original/` and `archive-source-wavs/published_beach_peach/`, together with the original publisher file index `archive-source-wavs/osf_stimuli_index.json`. `published-vot-stimuli.json` is the integration-time source/output manifest snapshot. The builder writes `sources/`, `wav/`, `clips/`, and a new `manifest.json` only inside an explicit rebuild destination; those generated folders are not retained here.

## Haskins labial stop–vowel recordings

Source: [Haskins VOT archive](https://www.haskinslaboratories.org/vot), [source WAV ZIP](https://www.haskinslaboratories.org/s/VOT_Audio_WAV.zip).

The archive describes Abramson and Lisker experiment stimuli made with the Haskins formant synthesizer: three formants for [a] and labial release transitions. This package selects nominal VOT values −20, 0, +20, +40, +60, and +80 ms. The source warns about timing errors in +30, +50, +90, +100, and +110 ms; none of those files is selected.

The three Eimas-oriented comparison files use the lecture's nominal intervals: +20/+40 ms, −20/0 ms, and +60/+80 ms. They are **not verified as the original Eimas et al. (1971) sound files**. The repetitions and pauses are new teaching assembly. These syllables cannot represent beach–peach, bear–pear, or corpse–gorpse word experiments.

## Published beach–peach continuum

Source: [Kim et al. (2025) materials](https://osf.io/36qky/), [paper](https://doi.org/10.3758/s13423-025-02700-x).

Kim, H., McMurray, B., Sorensen, E., & Oleson, J. (2025). *The consistency of categorization-consistency in speech perception*. Psychonomic Bulletin & Review, 32, 2246–2258.

All nine `beachpeach1.wav`–`beachpeach9.wav` files are copied exactly from the public materials. Their SHA-256 values match the OSF API metadata. The paper and supplement describe natural recordings by an American-English male speaker and progressive cross-splicing in Praat. The endpoint recordings have different VOT and vowel duration (reported as 4/45 ms VOT and 146/107 ms vowel duration), so these materials are not described as pure VOT-only manipulation. Step numbers are preserved without inventing individual VOT measurements. These are genuine 2025 materials, not the original recordings for McMurray et al. (2003).

The article is CC BY 4.0; the OSF project lists no node license. This package preserves attribution and does not assert an additional dataset license. Haskins displays no explicit reuse license on the source page.

## Processing and verification

Run `python archive-build_archive_package.py --output-dir /tmp/ling406-archive-rebuild` with NumPy, FFmpeg and ffprobe. The script reads the two retained source directories and OSF index from this package’s `archive-source-wavs/`, relative to the script itself. No network retrieval or scratch directory is needed for the packaged selection. Missing retained input files cause an explicit error. It copies source files, resamples to 44.1 kHz without changing playback speed or pitch, and encodes 192 kbps MP3s. Comparisons join whole tokens with 650 ms silence and add 350 ms at the beginning and end. There is no within-token editing, normalization, speech synthesis, or contour manipulation.

Every generated MP3 is fully decoded by FFmpeg. Output and source hashes, PCM metrics, OSF hash agreement, and decoding results are recorded in the manifest. Acoustic category boundaries and the original experimental effects have not been revalidated by these packaging checks.

## Retrieving an omitted input

The six selected Haskins filenames are `labm020.wav`, `lab0000.wav`, `labp020.wav`, `labp040.wav`, `labp060.wav`, and `labp080.wav`. They come from the linked official WAV ZIP; retain those members without modification in `archive-source-wavs/haskins_original/`. The nine `beachpeach` files come from the OSF material links recorded in `published-vot-stimuli.json` and the retained OSF index. Save them in `archive-source-wavs/published_beach_peach/`. Verify every restored file against `retained-inputs.json` and, for OSF files, against the index’s SHA-256 metadata. The public archive may change over time; a different hash is a different source revision and should not silently replace the retained input. Full archives and third-party PDFs are not included in this small source package.
