# Human-recording gorpse–corpse teaching reconstruction

The original human voice is the US-English pronunciation of **corpse** by **Dvortygirl**, Wikimedia Commons, 20 February 2006. Source [Commons file and attribution](https://commons.wikimedia.org/wiki/File:En-us-corpse.ogg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The modified audio in this package is also offered under CC BY-SA 3.0, with these changes disclosed. No original Ganong participant file is claimed.

The exact raw OGG is retained in `sources/En-us-corpse.ogg`. The Commons source API and Wiktionary entry identify an authentic General-American pronunciation, rather than an English TTS spelling interpretation. The OGG is stereo. This construction selects its **left channel**, preserving the inspected native waveform rather than averaging stereo signals.

After waveform and Praat pitch inspection, sample5052 at44.1kHz is the authored release anchor and sample8335 is the common native rhyme boundary just before the first weak vowel cycle. They are manual construction anchors, not independently validated phonetic ground truth. The complete10ms native release complex, including both release transients, is kept in every token. Between its end and the common rhyme, progressively less of the native middle aspiration is retained. The entire original vowel-onset transition, later vowel, rhotic segment and final /ps/ remain unchanged after the common boundary. The available native release-to-rhyme interval is74.444ms, so the selected nominal delays are10–70ms in5ms increments. The original85ms endpoint was not forced by fabricating aspiration.

All13 members contain a byte-identical native burst and a byte-identical complete native rhyme after PCM conversion. Each retained aspiration slice ends contiguously at the rhyme. No generated noise, reconstructed glottal source, vocoder, TTS, formant editing or pitch change is used. No crossfade is added, preserving the entire burst and rhyme. The joins occur in low-amplitude aspiration/initial weak voicing; their numerical amplitude jumps are recorded rather than presented as a perceptual quality guarantee. Whole-word duration changes with the removed aspiration. The nominal delays are authored release-to-common-rhyme intervals, not new independent measurements of true glottal VOT.

A common gain of−7.269dB sets the highest full-word RMS to0.045 (about−26.94dBFS). Each standalone listening file adds150ms leading and trailing silence. Sequences join complete padded tokens with650ms silence. These are listening arrangements, not original trial timing. The final browser selection includes10,40and70ms members, all13 members in order, and a10/70/10/70ms comparison.

[Ganong1980](https://doi.org/10.1037/0096-1523.6.1.110) is the lecture's relevant lexical-bias experiment. [Winn2020](https://doi.org/10.1121/10.0000692) documents research methods for natural-speech VOT cutback/replacement; its indexed abstract was consulted, and this script is not described as a literal implementation of Winn's complete procedure. Acoustic and waveform checks here establish construction and preservation, not a listener-calibrated /g/–/k/ boundary or replication of lexical bias.

Rebuild from any working directory with NumPy and FFmpeg installed:

```sh
python build_corpse.py --output-dir /tmp/ling406-human-corpse-rebuild
```

The default source is the retained OGG next to the script under `sources/`. `--source` can select the same exact OGG elsewhere. Its SHA256 is checked before processing. `manifest.json` records browser-file hashes, source credit and modification license. `validation.json` records source anchors, deleted spans, exact shared burst/rhyme hashes, sample counts, nominal intervals and limits.
