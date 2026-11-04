# Recorded-human source/filter prototype

The source is Peter Ladefoged's actual primary cardinal vowel 8, /u/, from the official ACIP chart. The chart's PL_primary map attaches i8.wav to the upper-right primary-vowel location, and its speaker toggle identifies Peter Ladefoged versus Daniel Jones. It is not a neural voice or a fabricated participant.

Source https://d3uxfe7dw0hhy7.cloudfront.net/acip/assets/course/chapter9/cardinal/i8.wav

Chart https://corpus.linguistics.berkeley.edu/acip/course/chapter9/cardinal/cardinal.html

The chart displays Copyright2020 KeithJohnson, AllRightsReserved. No open reuse license is invented. Retain institution/speaker attribution and describe use as a short educational excerpt/resynthesis, not a new native-speaker elicitation.

`natural_recording_original_rate.wav` is the authentic full vowel with only fixed comfortable gain, at its original16kHz rate. `natural_original_u.wav` is its 10kHz working copy, also at comfortable gain.

`build_human_filters.py` implements Praat's documented existing-sound source-filter procedure: male10kHz resampling, BurgLPC10 coefficients,25ms window,5ms step,50Hz preemphasis, inverse filtering to estimate excitation, followed by 4-formant filtering at300/900/2500/3500,600/900/2500/3500,300/2200/2500/3500Hz. Identical estimated excitation is used for all3filters. This preserves the recording's actual phonation fluctuations instead of replacing them with a perfectlyperiodic oscillator. The source-recording F0 median is about93Hz, with non-flat native variation. No pitch normalization, PSOLA or neural synthesis is applied.

Official method https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html

Inverse filter meaning https://www.fon.hum.uva.nl/praat/manual/LPC___Sound__Filter__inverse_.html

`natural_estimated_excitation.wav` is an LPC-estimated source including lipradiation, not a direct glottal recording. It will still sound buzzy because filtering has removed vocal-tract resonances. Do not label the original natural vowel as an unfiltered glottal source. For the user's naturalness preference, start playback with the authentic native recording or the3filtered vowels and make the estimated-source audition a separate optional player.

`prototype.json` records hashes, target formants, measured output formants and pitch/level checks. Measured first/second formants are approximately288/894,575/895 and288/2172Hz. Pitch measurements differ slightly across filters because the estimator responds to changed spectral balance; no pitch transformation was applied. Pitch estimate changes are not evidence of author-intended pitch change.

The common-gain outputs preserve filter gain differences but make the raised-F2 version substantially quieter. The optional `build_level_matched_variants.py` applies one post-filter constant gain per token to RMS0.045, making these easier to compare at comfortable level. Their filenames end in `_level_matched.wav`, and `natural_three_filters_level_matched.wav` sequences them with700ms pauses. This is intensity matching, not dynamic compression, timbre filtering, onset smoothing or envelope replacement. Original filter input and target resonances remain identical. It is a new teaching comparison, not the lecturer's original Praat files or a validated behavioral trial.

No subjective listening panel was available. Real source identity and objective construction are verified; a quantified claim of improved human naturalness has not been established.

## Independent source mapping and formant check

The saved `carm.gif` visibly places /u/ at the chart's upper-right primary-cardinal corner. In the saved `cardinal.html`, the `PL_primary` imagemap associates that corner, coordinates225,8,296,42, with `i8.wav`. The parallel `DJ_primary` map uses `dj8.wav` at the same corner. This establishes both vowel and named speaker independently of automatic formant estimates.

The first prototype's generic four-formant4500Hz analysis reported native F2 near2118Hz because it merged/skipped the closely spaced low F1/F2 resonances. That value was not a reliable description of the native vowel. A parameter-sensitivity analysis, retained in `source_formant_tracking_sensitivity.json`, recovers low F1/F2 with suitable analysis order. The prototype metadata now uses six-formant4000Hz analysis for the native reference, giving F1 approximately303Hz and F2 approximately660Hz. Filtered output checks still use four-formant4500Hz analysis, appropriate for their specified separated resonances. Automatic estimates are parameter-dependent; the chart provides the authoritative vowel category.

## Portable rebuilding

From any working directory, run:

```sh
python /path/to/build_human_filters.py --output-dir /tmp/human-source-filter-rebuild
python /path/to/build_level_matched_variants.py --input-dir /tmp/human-source-filter-rebuild --output-dir /tmp/human-source-filter-rebuild
```

Keep `i8.wav` beside the first builder. All generated sounds and JSON reports are written into the supplied output directory. Rebuilding into a fresh directory reproduced the original native reference, estimated-source, three filtered tokens and level-matched comparison WAV hashes exactly. `level-matching.json` records the exact individual gains.
