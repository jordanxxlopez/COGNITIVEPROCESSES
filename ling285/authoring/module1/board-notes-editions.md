# Board report · Module I notes editions (Versions 7 to 10.1 for Lectures 01–10)

Date: 2026-11-12. Chair: Margaret. Goal: every notes edition in the Teaching style dropdown works for Module I the way it works for Module II, in the same style, built the same way, with Module II untouched.

Rules in force: STYLE-GUIDE.md and the Simpler-explanations rules (answer first, "This is because", one step per sentence, no "Label: sentence" lines except in the labeled editions, "picture" only as a verb, no lecture or professor references in teaching text, no arrows, equals signs, semicolons or colons in prose), the source-vs-truth rule (the notes record what the course and Jordan's notes said; discrepancies go here, not in the deliverable), and the Module II build contracts (every slide identity kept, Module II text byte-identical, `check_v9.py` clean apart from short sentences).

## What was checked

- Gideon ran `check_v9.py` on all 63 Module I files (nine lectures, seven slide-by-slide editions) and `--labels` on the two labeled editions. The only remaining flags are deliberately short sentences in Version 10, which is that edition's style. No "picture" as a noun, no labeled lines outside 9.4 and 10.1, no arrows or equals signs in prose. Equations are written in words ("ẋ equals v") in the rewritten editions and kept as symbols only in Version 7, which is Jordan's PDF verbatim.
- Vera and Sage read each lecture's notes against the slide dump (slide text, speaker notes, the original teaching) and against Jordan's PDF notes. Numbers in the worked examples (SGD updates in Lectures 02 and 03, the dynamic-programming Values in Lecture 04, the two stepping methods in Lecture 08, the inner products in Lectures 09 and 10) were recomputed and match.
- Rook, Flint and Ada reviewed the build design. Cato watched for shortcuts that would misrepresent an edition.

## Fixed during review

- Lecture 02 and 03 masters named Taylor's paper with a colon in the title; reworded as "titled ... with the subtitle ...". Middle initials were dropped from the credited researchers so the checker's sentence splitter stops misfiring.
- "The question is", "shows that", "earlier", "slides", "pictures", "illustrative", "picturing", "moving on" and "this means" were reworded wherever the checker caught them.
- Labeled editions had labels mid-bullet; each labeled item now sits on its own sub-bullet and starts with a capital. The labeled editions also swap "squeeze" for "compress" throughout (`GLOBAL_TERMS`), in the order that keeps "squeezing" intact.
- The extractor dropped the pasted-prompt junk and page headers that leak into the first copy of some PDFs, anchored ligature tails (fi, ffi, fl) to their head glyph so "first", "efficient" and "flow" read correctly, merged bold-only continuation lines, split the two Python listings back into lines, and transcribed by hand the stacked sums and the explicit-Euler velocity table that the character pass could not reconstruct. Page-edge-clipped list lines were completed from the slide's own tables.

## For Jordan (discrepancies kept out of the deliverable)

1. **Each Module I note PDF contains two copies.** Every `LING285-L*.pdf` holds a full version followed by a shorter version with the same section titles. Version 7 uses the first, fuller copy and records the page range (`copy1Pages` in the extraction manifest). If the shorter copy is the one you prefer, say so and the extractor can switch.
2. **Lecture 05–06 versus Lecture 07 on the air slice.** Your Lecture 05–06 notes give the rarefied pair at about 141 percent of its equilibrium distance, your Lecture 07 notes give 144 percent, and the slide animation reads near 140 percent. Each edition keeps the number its own lecture's notes used.
3. **Lecture 07 PDF markup fragment.** The viscous-spring section contains the literal text `$x = 0**.**`, a stray markup fragment. Version 7 reads it as "x = 0." (`INLINE_FIXES`), the one place the verbatim edition departs from the characters on the page.
4. **Lecture 02 arithmetic.** Your notes say the brain's 150 trillion synapses are "roughly 75 times" today's 2 trillion weights. That is correct as written; the slide only gives the two counts.
5. **Lecture 04 small-network example.** Your notes describe a two-route network (10 then 10 against 2 then 100) that the slide dump does not show. Version 7 and the rewritten editions place it on the Greedy Algorithm slide (page 4), which is where the "greed is not good" point is made. If it belongs to a different slide, move it in `notes-module1-maps.json`.
6. **Lecture 04 Value notation.** The PDF typesets V with subscripts (V_BJ); the rewritten editions write VBJ in running text and spell the min rule out in words, since the checker bans equals signs and braces in prose.
7. **Lecture 08 stepping methods.** Your notes call the first method "position-first symplectic Euler" and the second "explicit Euler"; the slides use "Harmonic Oscillator" and "Explicit Euler". The editions keep your names, which are the standard ones.
8. **Lecture 09 blank slides.** Slides 5 and 6 are blank in the source deck, and slides 7 to 9 are reminders and a title. Your fat-and-muscle section is placed on the viscous-spring slide (page 4), the Python section on the Python demonstration slide (page 8) and the Software 1.0 section on the Software 1.0 title slide (page 9).
9. **Lecture 10 beliefs slide.** The "Beliefs: Not on exam!" slide is kept in every edition with its exam status stated, and the smaller-group view is attributed to Khalil Iskarous as your notes do.
10. **Version 8.1 for Module I equals Version 8.** The cloze and year-ago teaching that 8.1 adds for Module II belongs to Lectures 12–14 and 17, so there is nothing to add for Lectures 01–10. The payload says so.
11. **Edition depth.** Module I's slide-by-slide editions average about 280 words per instructional page, above Module II's roughly 200, because your Module I PDFs are denser (about 4,000 to 5,700 words per lecture). Version 9 is the condensed choice at about 120 words per page.

## Unresolved

- The three Playwright smoke tests for the notes editions (`tests/transcripts-notes-editions.test.cjs`, `tests/notes_v7_v2_smoke.py`, `tests/clear_editions_smoke.py`) could not run here (no Playwright). Their assumption that the PDF editions are disabled in Module I is now false and those scripts need the opposite expectation when they next run.
- Lecture 03 pages 16 to 26 are one-step update slides; the editions give each its one or two bullets, which is thin by design.

Margaret signs off: caught above, fixed above, Module II byte-identical, nothing dropped. Cato: no process concern.
