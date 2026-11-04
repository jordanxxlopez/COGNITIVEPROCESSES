# LING285 sounds and videos

This layer adds playable media beside the relevant source slides and a module-aware Sounds & videos collection. It does not rewrite data.json, transcripts, source assets, question banks, or saved study-state keys.

## Construction

All new visual frames are drawn by Python/Pillow or taken directly from retained source slide states. NumPy and SciPy calculate trajectories, waveform plots, spectra and spectrograms. FFmpeg encodes MP4/H.264 and AAC. Praat performs conventional LPC filtering of a recorded human voice. There are no generative image/video models, synthesized AI voices, or TTS calls.

The Python sources are in authoring/render.py and authoring/extra.py. GitHub-hosted Ubuntu runners do the computation. No Mac installation or execution is required. Run the coded-media workflow, then the media-checks workflow to rebuild and validate.

## Speech recordings

Peter Ladefoged's complete before-vowel consonant productions come from the [A Course in Phonetics consonant charts](https://corpus.linguistics.berkeley.edu/acip/course/ipachart/consonants1.html). The image-map coordinates establish the mapping to each WAV. The source chart identifies the speaker. The pairs and triples add silence between whole tokens, resample with FFmpeg and apply scalar listening-level adjustments. They preserve natural aspiration, transitions and timing. They are not sustained-fricative recordings, the professor's voice, or controlled experiments manipulating only one acoustic cue.

The [cardinal vowel chart](https://corpus.linguistics.berkeley.edu/acip/course/chapter9/cardinal/cardinal.html) supplies Ladefoged's [i, u, a, ɑ]. These are articulatory reference vowels, not identical English categories or a recording of the words dean, dune, Dan and Don. The source retains its copyright; no open license is asserted. sources/recordings.json records URLs, identities and SHA-256 hashes. Source HTML and chart images are retained for inspection.

## Recorded voice and filters

The source is the human [u] recording i8.wav. Praat resamples it to 10 kHz, estimates Burg LPC with 10 coefficients, a 25 ms window, 5 ms steps and 50 Hz pre-emphasis, then inverse-filters the recording. The same estimated excitation passes through the three four-formant filters printed in lecture 13: 500/1500/2500/3500, 300/2300/3000/3600 and 750/1200/2600/3500 Hz. Bandwidths 70/90/150/250 Hz are supplied reconstruction parameters. Whole resulting tokens receive scalar level matching and pauses.

This follows [Praat's existing-sounds source–filter procedure](https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html). An LPC residual is an estimated excitation with modeling and lip-radiation effects; it is not a direct glottal recording. The audible output is a new resynthesis, not recovered lecturer audio. A separate player retains the previously validated LING406 comparison and explicitly identifies its different filter settings.

The spectrogram video is computed from the exact playable comparison, using 25 ms Hann windows, 5 ms steps and a 65 dB display range.

## Calculated demonstrations

- SGD uses lecture 3's exact twelve observations, initial estimate 130 and rate 0.25. The rate comparison uses the lecture's data and four rates with a newly supplied reproducible sample order.
- The oscillator uses the exact solution of the displayed x–v equations. Euler computes both update rules independently. Motion is slowed for viewing.
- Forward propagation recomputes lecture 15's exact weight matrices and softmax. Backpropagation shows the output error and dependency order with fixed stored forward activations. It does not depict physiological neural impulses.
- Sigmoid, inner products and weighted sums are calculated numerically. Original PowerPoint click states are encoded in order with newly supplied hold times.
- Sine tones and harmonic sums are intentionally nonspeech. They are separate from the slow spring videos and do not claim to be recordings of those visible movements.
- The cochlea is an unrolled qualitative schematic with synchronized tones. Peak locations and slow motion are illustrative, following the [NIDCD explanation of hearing](https://www.nidcd.nih.gov/health/how-do-we-hear), not a calibrated simulation.
- Original training plots and early network slides are preserved as play-through sequences; no unavailable training data or downstream quiz answers are fabricated.

## Coverage and checks

qa/coverage.json records every lecture page and its media entries. Administrative pages and static reference pages remain intact. Lecture 14 page 20 supplies only an experiment heading, with no procedure, recording or result; it is explicitly left without an invented experiment.

qa/original-media-probe.json records every embedded audio/video stream. Original silent movies stay silent. Converted GIFs preserve their original timing while adding native video controls. Sampling screenshots support visual inspection but do not establish a word-level transcript or subjective naturalness score.

verify.py checks exact preservation of existing course files, full decoding of new videos and hashes. browser-test.cjs checks every file in Chrome, seeking, gallery and slide integration, expanded-reader keyboard behavior, notes/read preservation, navigation pausing and mobile containment. Reports and contact sheets are in qa/.
