# Recorded-human listening materials

The active player manifest and per-ID provenance remain in the parent audio authoring folder. This folder retains the source waveforms, attribution, editing scripts and numerical validation for recorded-human replacements. Historical model-derived playback records are archived in `retired-playback-provenance.json`; original playable files remain unchanged elsewhere in the audio directory.

Read [human-voice-methods.md](../../human-voice-methods.md) for the scientific context and source links. New transformations are distinguished from actual published datasets and unedited pronunciation references. Source-specific licenses and credits are preserved in each package; there is no single invented license covering all third-party recordings.

Rebuild into a fresh output directory using the scripts below, with NumPy, praat-parselmouth and FFmpeg as appropriate. Run scripts by their full path from any working directory.

| Family | Command from this folder |
| --- | --- |
| Recorded /ba da ga pa/ references | `python cv/build_human_cv.py --output-dir /tmp/human-cv` |
| Recorded Tagalog nasals | `python nasals/build_human_nasals.py --output-dir /tmp/human-nasals` |
| Published human bear–pear | `python bear-pear/build_bear_pear.py --output-dir /tmp/human-bear-pear` |
| Native-word aspiration deletion | `python corpse/build_corpse.py --output-dir /tmp/human-corpse` |
| Human-excitation formant filters | `python source-filter/build_human_filters.py --output-dir /tmp/human-filters` |
| Quiet, level-matched filter comparison | `python source-filter/build_level_matched_variants.py --input-dir /tmp/human-filters --output-dir /tmp/human-filter-levels` |
| Recorded-unit statistical-learning analogue | `python saffran/build_human_streams.py --output-dir /tmp/human-streams` |

Each family records waveform hashes, exact processing and its limits. Browser integration reports cover playback, optional historical groups, offline caching and preservation of the original teaching content and study state. Those technical checks do not independently validate listeners’ phonetic categories or naturalness ratings.
