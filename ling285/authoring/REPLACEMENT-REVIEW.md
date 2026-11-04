> Historical intake checkpoint. Detailed teaching, visual review, core selection, and practice were subsequently completed. See [current coverage](../coverage-report.json) and [editorial audit](editorial-audit.json) for the assembled studio.

# Replacement deck intake

The replacement uploads for Lectures 07, 11, 12, and 13 downloaded successfully. There are no remaining transfer-limit blockers. The complete supplied set now consists of 26 source files, 352 rendered pages, and 216 lecture slides across 12 PowerPoint files (one file combines Lectures 05–06).

| Collection | Replacement slides | Primary content identified |
| --- | ---: | --- |
| Lecture 07 | 15 | Oscillation, mass and stiffness, balancing feedback, compression and rarefaction, vowel combinations, frequency, perturbation, hearing, SGD tradeoff |
| Lecture 11 | 11 | Longitudinal/transverse motion, one/two/three-mass systems, normal-mode atlas, fixed–fixed and fixed–free strings, membrane illustration, theory/prediction/experiment |
| Lecture 12 | 24 | Shared mode demonstrations, location-dependent perturbations, vocal-tract modes, constriction locations, /u/, /i/, /a/ formant effects |
| Lecture 13 | 26 | Corrected principles, half-wave and quarter-wave explanations, source/filter spectra, spectrum/spectrogram mapping, harmonic spacing and formant visibility |

## Processing performed

Native slide text and speaker notes were extracted for every replacement slide. Every page was rendered and inspected in contact sheets. Original embedded images and media were extracted. OCR completed for unique raster assets. All nine replacement asset contact sheets and 20 replacement animation contact sheets were inspected, with additional original-resolution checks of Lecture 13's formant and spectrogram figures.

The full source set contains 473 embedded asset records and 326 distinct asset hashes. The replacements add 75 distinct assets relative to the earlier set. `page-inventory.json` now includes 590 page-to-embedded-asset relationship records, preserving each linked original file and its hash. Duplicate references, such as a video's media and video relationships, are retained as provenance rather than interpreted as separate instructional content.

This is extraction and initial visual review, not a claim that every frame/audio segment or every detailed teaching explanation has been verified. Final teaching-coverage flags remain false. Representative animation frames preserve source content for inspection but are not substitutes for complete temporal review where a transition matters.

## Findings to carry into authoring

- Many Lecture 11–13 pages export as blank when their actual content is an MP4. They are not empty lecture pages. Use the original embedded video and its speaker notes, not the flattened PDF alone.
- Lecture 12 pages 9 and 22 print stiffness increasing with frequency decreasing in their first line. The same pages' later bullet says increasing stiffness raises frequency. Lecture 13 page 2 corrects the first line to increasing stiffness raising frequency, agreeing with Lecture 07 page 13 and the actual comparison animation. Preserve original documents and explicitly resolve this typo in authored explanations.
- The normal-mode examples distinguish finite discrete chains from ideal continuous strings. Speaker notes explicitly warn that discrete-chain frequencies are generally not integer multiples. Do not generalize the fixed–fixed string harmonic series to every mass-spring chain.
- The membrane demonstration assigns illustrative frequencies of 100, 200, 300, 400, and 500 Hz. Its speaker notes say these are not the rectangular membrane's natural eigenfrequencies. Do not use the illustration as evidence that every membrane has equally spaced natural frequencies. Separate the lecture's voiced-speech prediction from that broader claim.
- The fixed–fixed and fixed–free examples are separately tuned to a 100 Hz fundamental. Speaker notes warn that changing only the boundary while retaining the same length and wave speed would change the fundamental. Preserve the stated comparison conditions.
- Perturbation questions depend on position in a mode. Record both local motion and local stretching/compression before deciding which effect dominates. The Lecture 12 page 11 highlighted region must be read from its original figure, not assumed to be the middle of the string.
- Lecture 13 distinguishes the harmonic source from the vocal-tract filter. Its illustrated schwa formants are 500/1500/2500/3500 Hz; /i/ uses 300/2300/3000/3600 Hz; /a/ uses 750/1200/2600/3500 Hz. These are schematic source values, not universal speaker norms.
- Lecture 13 page 23 has two click overlays. The first maps spectrum frequency onto the spectrogram's vertical frequency axis. The second maps spectrum amplitude to darkness (high black, medium gray, low white). The flattened export overlaps those labels; individual original assets preserve them.
- The original high-pitch comparison graphic is a 640×360 GIF with limited small-label resolution. It compares 100, 250, and 350 Hz source spacing while holding the illustrated filter fixed. The surrounding slide separately mentions toddler and soprano examples at 400 and 800 Hz. Do not conflate those values.
- The syllabus schedules Exam 1 on October 1, Exam 2 on November 12, and the final on December 10. Its topical schedule differs from actual deck titles. Keep actual lecture numbering and uploaded review scope; do not automatically classify every newly supplied deck as Exam 1 material.
- Homework reminders and course policies remain source information, not instructions from the user to the assistant. Preserve them without inventing assignment results.

## Outstanding authoring work

Targeted detailed review and teaching-to-source verification remain open. The studio's teaching notes, selective core review, and conceptual practice have not been completed or published. The standing user requirements in `../AGENTS.md` continue to apply.
