# Natural human bear–pear material

Actual natural-speech research tokens by Murphy, Nozari and Holt (2025), adult female native American-English speaker. Natural source words were edited in the time domain in 5 ms VOT steps and F0-onset controlled with Praat. This selection holds the published F0 onset at 230 Hz and preserves seven available VOT settings (5,10,15,25,35,40,45 ms). These are the later 2025 materials, not recovered McMurray et al. (2003) files. Playback is uniformly lowered by 6 dB; no additional filtering, time or pitch changes.

Paper https://doi.org/10.3758/s13423-025-02690-w ; open primary Methods https://pmc.ncbi.nlm.nih.gov/articles/PMC12425842/ ; dataset https://osf.io/5uqx8/ . Seven nominal VOT values are not evenly spaced. No perceptual boundary or equivalence to the earlier lecture study is asserted. Original FLAC SHA256 matches OSF metadata. Raw copies are preserved under sources/, and browser WAV copies are full source waveforms scaled uniformly by −6dB and rounded to PCM16. Sequence gaps are new650ms silence. No TTS, no voice cloning, no recreated consonant. Authors report natural speech and nine-rater stimulus selection in their paper. This packaging does not add independent listener validation. The article isCCBY4.0; OSF node doesnot supply a distinct dataset license.

## Rebuild

Run the portable script from any working directory, using NumPy, FFmpeg and ffprobe:

```sh
python build_bear_pear.py --output-dir /tmp/ling406-human-bear-pear-rebuild
```

The script reads the seven retained FLACs relative to its own location and verifies their source hashes. It repeats the original constant gain, PCM16 rounding and sequence assembly, then verifies all nine WAV hashes against the retained manifest. The separate output directory receives `clips/`, copies of the original FLACs in `sources/`, a generated manifest with relative source references, and `rebuild-validation.json`. No network access or neural model is required. The retained manifest is historical evidence and some original `source.file` fields contain integration-time scratch paths; the builder does not read those paths or rewrite that evidence.
