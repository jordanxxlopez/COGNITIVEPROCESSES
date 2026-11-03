# Recorded human CV references

The four retained WAVs are Peter Ladefoged’s before-vowel productions from the official ACIP consonant chart. `source-manifest.json` records their original URLs, speaker credit and hashes. The first chart is https://corpus.linguistics.berkeley.edu/acip/course/ipachart/consonants1.html and the velar recording appears on `consonants2.html` at the same base URL. Retain the archive’s attribution and copyright. No additional source license is asserted.

`build_human_cv.py` reconstructs all six browser WAVs in `manifest.json`. It reads signed 16-bit source PCM as `x / 32768`, applies one shared quiet gain, and rounds `x * gain * 32767` back to 16-bit PCM. The shared gain is the lower of the full-token RMS ceiling of 0.045 and the peak ceiling of 0.18. The four complete recordings preserve their native prevoicing, release, aspiration, vowel transitions, pitch contours and different durations. Nothing generates or replaces speech segments. The two comparisons concatenate `[ba da ga]` and `[ba pa ba pa]`, respectively, with 650 ms silence between complete tokens and no extra boundary padding.

Run with NumPy installed and a fresh output destination outside this source folder:

```sh
python build_human_cv.py --output-dir /tmp/ling406-human-cv-rebuild
```

The script verifies all four source hashes and all six rebuilt output hashes against the deployment manifest. It writes the six WAVs, a manifest and a technical validation report only to the selected destination.

These are real human pronunciation references, not a calibrated equal-F2 or VOT continuum and not the original Eimas study’s recordings. The full natural tokens vary in several acoustic properties. Historical controlled comparisons remain separate. Hash and timing checks do not establish independent listener identification or experimental equivalence.
