# LING406 language contrast audit — 3 November 2026

## Hindi: native CV onset excerpts ready

Source: [A Course in Phonetics: Hindi Stops](https://corpus.linguistics.berkeley.edu/acip/vowels/chapter12/hindi.html), source-annotated **/t̪al/** “beat” (`hindi6.wav`) versus **/ʈal/** “postpone” (`hindi10.wav`). Their same-vowel consonant–vowel onsets were excised at 260 ms, before the lateral transition, normalized in vowel RMS and given a common 8-ms final fade and common padding. Native pitch, consonant releases and early vowel transitions were retained. No English substitutes, TTS or vowel splicing.

Use `hindi_dental_ta_cv.wav` and `hindi_retroflex_ta_cv.wav` in this directory (each 380 ms including padding). Reproducible derivation: `derive_hindi_cv.py`; complete parameters/hashes: `hindi_cv_derivation.json`. Source originals and spectrograms retained. Label **native CV excerpts for the contrast; not original Werker–Tees stimuli**. These are teaching examples and have not undergone an independent native-speaker validation panel.

## Korean: native archive minimal set recovered

Source: [A Course in Phonetics: Seoul Korean](https://corpus.linguistics.berkeley.edu/acip/appendix/languages/korean/korean.html). HTML imagemap establishes the mappings:

| File | Word | Meaning | Contrast |
|---|---|---|---|
| `korean_k1.wav` | 불 /pul/ | fire | lenis |
| `korean_k2.wav` | 뿔 /p͈ul/ | horn | fortis / tense |
| `korean_k3.wav` | 풀 /pʰul/ | grass | aspirated |
| `korean_k4.wav` | 달 /tal/ | moon | lenis |
| `korean_k5.wav` | 딸 /t͈al/ | daughter | fortis / tense |
| `korean_k6.wav` | 탈 /tʰal/ | mask | aspirated |

The bilabial and dental words match the original lecture slide25 UCLA archive examples. This is one archive/table recording series, replacing mixed-speaker dictionary pronunciations. The landing page does not name its speaker; do not assert verified speaker identity. Use complete unchanged files; no segmentation required. They are **native contrast demonstrations, not original adoptee-study trial files**.

## Thompson Salish: precise unresolved gap

The intended contrast is **ejective /kʼi–qʼi/**, not plain English /ki–qi/. Current USC word sources are **/kʼexem/** (`t9.wav`) and **/qʼa/** (`te4.wav`), with different vowels/word lengths. They cannot serve as the matched pair. Accessible Berkeley Montana Salish material is a different language and supplies no matched /i/ pair. The Werker lab resources page requires CAPTCHA; no bypass attempted. VTL2.4 lacks a verified ejective gesture preset, and ordinary English/TTS inventories do not supply a validated reconstruction.

Keep authentic full words only as explicitly titled supplementary examples, and remove the inaccurate matched-pair claim. An exact pair requires author/lab material or documented native Thompson recordings; a synthetic version requires an ejective-capable model and native/phonetician validation. Do not produce confident fake /kʼi,qʼi/ files.

## Credit and rights

The ACIP sites are official UC Berkeley Linguistics teaching resources by Keith Johnson; page footer ©2020 Keith Johnson, All Rights Reserved. No explicit CC/redistribution license is displayed. Keep visible attribution/source links and do not claim unrestricted licensing. Full URLs, mapping evidence, hashes, acoustic checks and limitations are in `../ling406_language_contrast_audit.json`.
