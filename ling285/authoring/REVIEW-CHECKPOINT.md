> Historical checkpoint from the first 22-file intake. The four transfer blockers below have been resolved and teaching was subsequently completed. See [current coverage](../coverage-report.json) and `preparation-status.json` for the assembled 26-file studio.

# Source review checkpoint

This is an authoring audit, not student teaching notes. No complete teaching output or published LING285 studio is claimed.

## Completed preparation

- Preserved 22 original uploads and verified every SHA-256 against the source manifest.
- Extracted page text, PDF links and annotations, native PowerPoint text and speaker notes, DOCX paragraphs and tables, and equation XML.
- Rendered 276 pages, including 140 slides from eight available PowerPoints. Inspected every rendered page in contact sheets. Detailed full-resolution checks remain necessary wherever contact sheets do not resolve small content.
- Extracted 292 embedded assets, representing 251 distinct content hashes. Ran OCR over unique raster images and extracted representative frames from animated GIFs and MP4s. Reviewed asset contact sheets and all 21 generated animation contact sheets. These sampled frames do not establish complete temporal or audio coverage.
- Recorded standing user requirements in `../AGENTS.md` and generated `page-inventory.json` before teaching authoring. Teaching-coverage flags remain false.

## Course and organization findings

The syllabus identifies LING285, Human Language and Technology, Fall 2026, Khalil Iskarous. Some slides call the course Human Language and Computation. Use LING285 for this workspace, preserving the original titles in source views.

The supplied LING406 PDF is a course-hub/reference document. Keep its linguistic course content outside LING285 teaching and practice. The current GitHub checkout includes LING406 Version 3 at c3fa6692a14bd64e9ef38f2f66e5cb5f50200057. Preserve earlier versions and use V3 writing improvements where appropriate.

The uploaded Exam 1 Review contains 20 short conceptual prompts. Use it to guide explanation-based practice rather than defaulting to PSYC301 multiple-choice questions. Instructor practice is a format guide, not evidence that generated questions predict the exam.

## Available primary source map

| File label | Slides | Content areas identified for later authoring |
| --- | ---: | --- |
| Lecture 01 | 10 | Speech acquisition, articulatory/acoustic phonetics, consonant distinctions, AI context |
| Lecture 02 | 19 | Consonants, cloze completion, token vectors, weights, learning from error, learning-rate comparisons |
| Lecture 03 | 31 | Dynamical systems, speech and octopus examples, prediction/training, sequential SGD demonstrations, loss and tradeoffs |
| Lecture 04 | 18 | Greedy and exhaustive search, Bellman recurrence, dynamic programming, least distance/time, balancing feedback |
| Lectures 05–06 | 20 | File/title mismatch; position–velocity coupling, oscillation, compression/rarefaction, vowel combinations, applications |
| Lecture 08 | 13 | Springs and mass, hearing, vocal folds, Euler update comparisons |
| Lecture 09 | 16 | Differential change, neural-network inputs and probabilities, learning/inference, templates and hierarchy |
| Lecture 10 | 13 | Neural computation, weighted sums, multilayer forward propagation, training, outliers |

Supplemental material includes Meadows extracts about stocks, flows, balancing/reinforcing feedback, thermostats, populations, capital, and inventory delays; typed notes for Lectures 07–10; the syllabus; two exam-review documents. Typed notes for Lectures 07 and 08 contain repeated material; retain originals and avoid duplicating explanations in authored output.

## Source issues to resolve explicitly

1. Lectures 07, 11, 12, and 13 could not download because each exceeds the transfer tool's 32 MiB maximum. Request smaller split decks, or PDFs plus separately supplied meaningful animation/media. A static PDF alone does not preserve every original animation. Lecture 07 notes are available, but the missing deck is still missing.
2. The uploaded filename L5+6 has an internal title Lecture 4+5. Keep both labels visible until verified.
3. The answer companion labeled seagull has unverified authorship and an inconsistent basilar-membrane description. Cross-check with primary material and typed hearing notes before producing any answer key. Do not reproduce an unverified mass/stiffness relationship as fact.
4. Static PowerPoint conversion overlays animation stages, particularly Lecture 10 slide 6. Use speaker notes and original animation order to reconstruct the instructional sequence before teaching it.
5. Original slides can have overflowing text. Native extraction must supplement visible page exports; keep originals available.
6. The oscillator deck has a prose typo about which variable changes. Cross-check each statement against the visibly supplied coupled equations.
7. Lecture 10 slide 10 changes the visible first fan of weights. Its speaker notes appear to reuse the preceding example. Verify the visible graph and displayed activation rather than blindly copying speaker notes.
8. Lecture 09 slides 5 and 6 are blank in the accessible deck. Do not manufacture teaching paragraphs for them. Handle title, agenda, reminder, and placeholder slides without filler.
9. Lecture 10 explicitly labels a beliefs segment as not on the exam. Exclude that segment from assessed core practice.
10. Video and web links may have no equivalent embedded clip. Do not claim to have reviewed external videos merely because their links or thumbnails are present. The standalone embedded WAV has not been listened to or transcribed.
11. Tiny labels, dense graphs, article excerpts, animation transitions, and source inconsistencies still require targeted full-resolution verification. The current inventory deliberately distinguishes rendered-page inspection from detailed review and verified teaching coverage.

## Next authoring gate

Finish targeted visual and temporal checks for each source before drafting its notes. Map each meaningful item to a source page, preserve original visuals, and compare the completed notes with the inventory. Keep any unavailable source clearly marked. Only then build conceptual practice, selective must-know review, and the student-facing studio from verified content.
