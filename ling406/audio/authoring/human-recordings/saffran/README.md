# Human-recording Saffran teaching analogue

Twelve real recorded Tagalog CVs by the identified Lingua Libre speaker Kunokuno are gated from documented source words. Eleven source words were recorded on 2025-04-07; the same speaker's `Panitikan` recording, used for `ti`, dates to 2021-09-24. The latter has a native 44.1 kHz rate; the others are 48 kHz. The speaker identity and licensing are explicit in Commons metadata. Independent verification of the speaker's native-language status was not obtained.

`build_human_streams.py` reads the small `raw_units` input WAVs and `source_inventory.json`, resamples to 24 kHz and uses Praat PSOLA to make each exactly 250 ms. A single naturally falling pitch curve extracted from the recorded `ko` is scaled near a 95 Hz median and reused for every syllable, with the same time fractions. Every syllable receives one scalar gain to RMS 0.045. No word-specific pitch contour or extra word silence is introduced. The original human glottal waveform, breathiness and vocal-tract spectrum supply the voice; no synthetic glottal source, neural TTS voice or full-signal vocoder supplies it.

The stream follows the lecture's exact toy sequence. Each occurrence uses the identical processed syllable PCM. The whole-word `gopila` and part-word `bugiko` examples use those same units. Full stream duration is 33.75 s, the short stream 7.5 s and each three-syllable item 0.75 s. The historical 1996 study's full exposure and original MacinTalk voice are not recreated.

The source CV durations are 125–265 ms; equalization changes overall duration by at most 2x. PSOLA retains natural unvoiced portions but changes their timing with the unit time mapping. Nominal pitch control does not make all measured output F0s identical. Measured median voiced F0 ranges from about 85.7 to 109.1 Hz because the voiced intervals and pitch estimates differ. Unit joins, source coarticulation and spectral/prosodic residue are not claimed eliminated. This is an illustrative human-recording teaching analogue, not a behaviorally validated artificial-language experiment.

All source recordings are **CC BY-SA 4.0**, credited to speaker and recorder **Kunokuno**, Lingua Libre, speaker entity Q424288. The gated excerpts and processed derivatives retain CC BY-SA 4.0. Commons source URLs and exact per-word dates are in `raw_units/manifest.json` and `source_metadata.json`.

Rebuild from any working directory with NumPy, praat-parselmouth 0.4.7 and FFmpeg installed:

```sh
python build_human_streams.py --output-dir /tmp/ling406-human-streams
```

To repeat the prior gating step from the retained original word WAVs:

```sh
python build_raw_units.py --output-dir /tmp/ling406-human-raw-units
```

The second command writes a fresh raw-unit folder for review; it does not replace the retained raw units unless that output path is explicitly selected. `validation.json` records unit hashes, measured pitch, exact duration, RMS and sequence/identity checks. All four generated WAVs fully decode through FFmpeg. These are technical checks, not native-listener identification or replication of the original behavioral result.

## Source recordings and license

Speaker/recorder [Kunokuno](https://lingualibre.org/wiki/Q424288), Lingua Libre. Original and adapted audio: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Each derived unit retains the source voice; processing is described above. The [historical study](https://doi.org/10.1126/science.274.5294.1926) used a different synthetic voice.

| Unit | Recorded source word | Original recording |
| --- | --- | --- |
| to | ito | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-ito.wav) |
| ki | makita | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-makita.wav) |
| bu | buhay | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-buhay.wav) |
| gi | maging | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-maging.wav) |
| ko | ko | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-ko.wav) |
| ba | ba | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-ba.wav) |
| go | Sumagot | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-Sumagot.wav) |
| pi | Espiritu | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-Espiritu.wav) |
| la | laban | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-laban.wav) |
| ti | Panitikan | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-Panitikan.wav) |
| po | po | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-po.wav) |
| lu | lupa | [Source](https://commons.wikimedia.org/wiki/File:LL-Q34057_(tgl)-Kunokuno-lupa.wav) |
