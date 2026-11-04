# New controlled word continua

These are **new teaching reconstructions**, made for the two word families that actually occur on the lecture slides. They are not recovered recordings from McMurray et al. (2003) or Ganong (1980). They are also not a model of those studies' behavioral results or perceptual category boundaries.

- `bear-pear`: nine nominal delays from 5 to 85 ms in 10 ms increments.
- `gorpse-corpse`: seventeen nominal delays from 5 to 85 ms in 5 ms increments. The lecture states 5 ms steps for Ganong; the range selected here is new and is not attributed to the original experiment.
- Each family has individual files, a full series, and an endpoint comparison repeated twice. The entire word rhyme, not a generic vowel buzz, remains audible in every file.

## Method and source

The starting words are `pear` and IPA-specified `corpse` (`pˈɛɹ` and `kˈɔːɹps`) synthesized with Kokoro-82M v1.0, American-English `af_heart`, speed 1.0, via kokoro-onnx 0.6.1. The actual input WAVs are retained in `word-source-wavs/` with hashes. The model is the source of the word waveform; the language model does **not** supply the controlled timing. Numerical waveform editing supplies the timing.

The source word's burst is kept. A periodic vowel boundary is selected after inspection of its waveform and spectrogram and snapped to a positive-going zero crossing. That exact rhyme is copied into every member, with one identical 1 ms fade at its start. A fixed aperiodic noise bed is shaped from the same word's aspiration spectrum, using a recorded seed. Every step uses the same burst and the same prefix of that noise bed, followed by the byte-identical rhyme. The source spectrum, seed, sample positions and output hashes are recorded. Only the release-to-common-rhyme delay changes. Total word duration therefore increases with that delay; these are not fixed-duration stimuli.

Manipulating stop VOT by waveform splicing has a published research basis: Kim, McMurray, Sorensen & Oleson (2025), *The consistency of categorization-consistency in speech perception*, [DOI 10.3758/s13423-025-02700-x](https://doi.org/10.3758/s13423-025-02700-x), supplement, “Stimulus construction.” Their natural-recording procedure progressively replaces part of a voiced onset with aspiration, approximately holding word duration constant. This reconstruction adapts the temporal principle but uses one model-generated baseline per family and preserves an entire identical rhyme by inserting aspiration. It is **not** an exact implementation of that paper's procedure. For beach–peach, use the genuine published materials rebuilt with `archive-build_archive_package.py` from this flat package, which are preferable to a reconstruction.

Relevant original research discussed on the slides:

- McMurray, Tanenhaus, Aslin & Spivey (2003), *Probabilistic constraint satisfaction at the lexical/phonetic interface*. [DOI 10.1023/A:1021937116271](https://doi.org/10.1023/A:1021937116271).
- Ganong (1980), *Phonetic categorization in auditory word perception*. [DOI 10.1037/0096-1523.6.1.110](https://doi.org/10.1037/0096-1523.6.1.110).

## Verification and limits

Praat/Parselmouth confirms periodic phonation in the shared rhyme (median F0 approximately 248 Hz for the bear/pear family and 224 Hz for gorpse/corpse). The aspiration bed's normalized autocorrelation maximum in the 100–400 Hz lag range is below .25; the shared rhyme's first 30 ms is above .78. These checks distinguish aperiodic aspiration from periodic phonation but do not validate listeners' category judgments.

Every step has exactly the requested number of PCM samples between the retained burst's beginning and the common-rhyme boundary. All burst copies and all rhyme copies within each family are byte-identical. “Nominal VOT” means this authored release-to-rhyme delay: it is not an independent estimate of the first glottal pulse in a natural recording. The cuts, aperiodic noise and short onset fade introduce approximations. No claim is made that a particular step is an experimentally established ambiguous token, or that the endpoints have undergone native-listener validation. The word's F0, rhyme, accent and duration beyond the inserted interval are controlled within a family, but category-boundary and lexical-bias claims still come from the cited studies, not these clips.

WAVs are 24 kHz PCM16. Browser MP3s are encoded at 44.1 kHz without changing speed or pitch. Every MP3 was fully decoded with FFmpeg. All signals remain below clipping. The rebuild destination’s `metrics.json` records common suffix hashes and sample counts, and its `manifest.json` records source and output hashes. The retained integration-time snapshots in this source package are named `word-vot-metrics.json` and `word-vot-stimuli.json`.

Rebuild using Python with NumPy and Parselmouth plus FFmpeg:

```sh
python build_word_continua.py --output-dir /tmp/ling406-word-rebuild
```

The script reads only the retained `word-source-wavs/` inputs relative to its own location and fails clearly if an input is missing. It has no scratch-cache fallback. The explicit output directory receives `wav/`, `clips/`, `metrics.json`, and `manifest.json`; those generated folders are not retained inside this source package. Rebuilding into a fresh destination avoids touching deployed clips or historical snapshots. Kokoro's original model card declares Apache-2.0; kokoro-onnx declares MIT. These credits are not an assertion that the new sounds are original research recordings.
