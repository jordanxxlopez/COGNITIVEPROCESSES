# Fidelity authoring package

This folder retains authoring code, the small waveform inputs it actually uses, and integration-time scientific audit records. It does not retain duplicate generated audio sets or full third-party papers/archives. The deployed browser clips are outside this package at `../../clips/`.

All six executable scripts accept **`--output-dir`**. Choose a fresh destination for each family. They no longer write colliding `manifest.json` files into this flat source folder and do not read a workspace-specific scratch cache. Run from any current directory, using the script's path. Dependencies are NumPy, `praat-parselmouth==0.4.7`, FFmpeg and ffprobe (see `../requirements.txt`). No neural model download is required to repeat these waveform constructions because the two model-generated source words are retained.

From this directory:

```sh
python build_word_continua.py --output-dir /tmp/ling406-word-rebuild
python derive_hindi_cv.py --output-dir /tmp/ling406-hindi-rebuild
python archive-build_archive_package.py --output-dir /tmp/ling406-archive-rebuild
python adult-build_cutting_rosner_1974.py --output-dir /tmp/ling406-adult-rebuild
python adult-validate_cutting_rosner_1974.py --output-dir /tmp/ling406-adult-rebuild
python formant-build_infant_nonspeech.py --output-dir /tmp/ling406-infant-rebuild
```

## Retained inputs and generated outputs

| Script | Inputs retained here | Files created only in the rebuild destination |
|---|---|---|
| `build_word_continua.py` | `word-source-wavs/pear.wav`, `word-source-wavs/ganong-corpse-word.wav` | `wav/`, `clips/`, `manifest.json`, `metrics.json` |
| `derive_hindi_cv.py` | `hindi-source-wavs/hindi6.wav`, `hindi-source-wavs/hindi10.wav` | Two derived CV WAVs and `hindi_cv_derivation.json` |
| `archive-build_archive_package.py` | Six Haskins WAVs, nine OSF beach–peach WAVs, original OSF file index under `archive-source-wavs/` | `sources/` copies, `wav/`, `clips/`, `manifest.json` |
| `adult-build_cutting_rosner_1974.py` | Published parameters embedded in the script; no original Moog recording | `wav/`, `mp3/`, `manifest.json`, `validation.json` |
| `adult-validate_cutting_rosner_1974.py` | Rebuild destination from the preceding adult command | `independent-file-validation.json` in that same destination |
| `formant-build_infant_nonspeech.py` | Published parameters embedded in the script; no original Moog recording | `audio/`, `lossless/`, `infant-manifest.json`, `infant-validation.json` |

`retained-inputs.json` enumerates the exact packaged waveform/index files with their hashes. Missing files fail explicitly. For Hindi, the source map in `language-contrast-source-audit.json` records the ACIP landing page, original table image, exact public audio URLs and hashes. The originals are `https://d3uxfe7dw0hhy7.cloudfront.net/acip/assets/vowels/chapter12/hindi6.wav` and `hindi10.wav` at the same base URL. Preserve their source attribution and license limits from that audit. For archive input retrieval, see `published-vot-methods.md`.

## Historical records and scientific scope

The retained `hindi-cv-derivation.json`, `word-vot-stimuli.json`, `published-vot-stimuli.json`, source audits and related JSON files are historical integration-time evidence. Some `file` values identify original scratch locations; these strings were not rewritten to imply that those original paths are portable. The updated scripts read the retained input paths above and write fresh output records with their actual destinations. Historic source hashes remain unchanged.

Reconstruction methods and numerical settings were not changed for portability. Word-family nominal VOT is the authored burst-to-common-rhyme delay, not an independent natural first-glottal-pulse measurement. Hindi CV excerpts preserve native onset/early-vowel material but crop word recordings; they are not the original Werker–Tees tokens. Haskins/OSF archives are actual published stimuli whose source identity differs from some older lecture experiments. Adult/infant sawtooth sets use published parameters with explicitly reconstructed digital timbre/envelopes; human category boundaries and original analog Moog equivalence are not established.

`portability-validation.json` records successful rebuilds from a temporary copied package launched from a different working directory. The rebuilt word-family, Hindi and archive WAV hashes matched all 54 corresponding historical outputs exactly; the independent adult validator passed all 22 clips, and all 8 infant outputs rebuilt. The generated test output directories were removed after checking. These are technical reproduction checks, not listener validation.
