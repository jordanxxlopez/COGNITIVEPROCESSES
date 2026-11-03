# Matched nasal–vowel teaching reconstructions

Use `output/nasal_cv_ma.mp3`, `nasal_cv_na.mp3`, and `nasal_cv_nga.mp3` for [ma], [na], and [ŋa]. The two 5-second comparison files play [na]–[ŋa]–[na]–[ŋa] and [ma]–[na]–[ma]–[na]. Both comparisons use the **identical [na] waveform**. They must be presented as separate contrasts so [ma] is not mistaken for a member of the [na]–[ŋa] comparison.

This is actual **VocalTractLab 2.4 articulatory synthesis**, not a letter-pronunciation neural model, clipped /aCa/ samples, or a voiced sine wave labeled as speech. It uses the official **W02 female speaker anatomy** and the continuous modal-phonation glottis model. Each syllable begins in an oral-closure configuration with the velopharyngeal port open, then releases directly into the same /a/ vowel gesture.

- [m] has a lip closure, [n] a tongue-tip alveolar closure, and [ŋ] a tongue-body velar closure.
- There is no vowel gesture before the nasal and no /g/ segment or extra oral-closure gesture after the velar nasal.
- All three files have 24,000 samples at 48 kHz (500 ms), the same 223 Hz F0 target, the same RMS level and a common final 10 ms taper.
- The actual generated oral closure ends around 122.5,122.5 and125 ms, respectively. Those values were measured from the model's generated area-function trajectories rather than inferred from filenames.
- VTL's normal gesture dynamics and context-sensitive /a/ consonant shapes provide the transition. Neutralizing the oral gesture converges to the same steady-state /a/ geometry.
- VTL's selected glottis-model Flutter control is set to zero in a derived cache copy of the original speaker preset to improve pitch matching. No anatomy parameters are changed.
- The nasal port remains open during release, and geometry checks confirm that no second oral closure appears. This avoids inserting a voiced oral stop [g] after [ŋ].

## Relation to Narayan et al. (2010)

The primary study used natural utterances by a female native Filipino speaker, with multiple tokens of each syllable. These new files reconstruct the **CV syllable types and controlled comparison**, not the source speaker's exact speech or the historical stimulus set. The single files do not model within-category token variability. The broad500 ms syllable/~120 ms nasal timings are chosen to resemble the study description. Each comparison uses1000 ms silence between token offsets/onsets.

Mechanistic and signal checks are documented in `output/validation.json`, per-token geometry summaries and gesture scores. The model checks confirm intended closure place, open nasal port, shared vowel convergence, sample timing, output pitch, level and successful decoding. They **do not substitute for a native-speaker identification test** or establish acoustic equivalence to the original Filipino recordings. Captions must retain “new articulatory reconstruction” rather than “original Narayan stimulus” or “validated native Filipino recording.”

## Primary methodological basis

Birkholz, P. (2013). Modeling consonant-vowel coarticulation for articulatory speech synthesis. *PLOS ONE*, 8(4), e60603. https://doi.org/10.1371/journal.pone.0060603

The full primary report was read, particularly its synthesis procedure: the model initializes context-sensitive consonant targets and approaches the target vowel through smooth articulatory dynamics in a branched acoustic tube system that includes nasal cavities. Its human perception study included /m/ and /n/ among other consonants; its overall recognition rate is **not evidence that these new /ŋa/ tokens have been independently identified or validated**.

The official VTL2.4 manual and actual 2025 source code were inspected. The source has explicit SAMPA `m`, `n`, and `N` handling. Their oral targets are `ll-labial-closure`, `tt-alveolar-closure`, and `tb-velar-closure`. VTL's authored nasal-port defaults (.3,.2,.3 cm²) are used, followed by a closing gesture while the mouth releases into /a/.

Official release page: https://www.vocaltractlab.de/index.php?page=vocaltractlab-download

Official author release archive: https://www.vocaltractlab.de/download-vocaltractlab/VTL2.4.zip

## Rebuild

Install NumPy, lxml, Requests, praat-parselmouth; provide g++ and FFmpeg. Then:

```
python bootstrap_vtl.py --cache /tmp/vtl24
python build_nasal_cv.py --library /tmp/vtl24/libVocalTractLabApi24.so --speaker /tmp/vtl24/official2.4/API/W02.speaker --output /tmp/nasal-cv
```

The bootstrap pins the author archive SHA256. Linux building uses C++17, removes obsolete dynamic `throw(std::string)` declarations/definitions and excludes the unused Windows-only SoundLib.cpp playback device interface. **No acoustic formulas, DSP parameters, gesture algorithms or geometry calculations are changed.** Output occurs through the offline synthesis API, not the excluded device interface. The download includes VTL's GPL3-or-later license and source; keep those notices if distributing its software or speaker model. The course only needs the newly generated MP3s and provenance, not the downloaded library/model/archive.

Do not copy the 35 MB official ZIP, model binary, full tube files or raw simulation miscellaneous traces into the website. The small generator/gesture scores/geometry summaries/validation JSON are sufficient for review; model data can be obtained from the author during reproduction.
