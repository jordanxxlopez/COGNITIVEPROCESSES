# LING406 study layer

Adds the study pages the LING285 and PSYC301 studios already had to all three LING406 modules, keeping
LING406's own layout and every existing view and version. Asked for on 2026-11-13 and 2026-11-14.

**In the sidebar of each module, under "Study pages":**
- **Study this first.** Topics in course order. Each block has notes beside its slide, links to the source
  slides and a My notes box. Each topic ends with "What you can be asked", with answers.
- **Review guide** (Midterm 1, Midterm 2 or Final). Every question on the module's review deck, with an
  answer, plus Predicted questions that change one thing.
- **What you can be asked.** The review questions and the topic questions on one page, with a Priority filter.
- **Notes by topic.** Every taught slide grouped by subject. The notes are whichever transcript version you
  pick, so Modernize works here too.
- **Experiment cards.** Who and year, what they asked, what people did, what happened, what it means.
- **Side-by-side contrasts** and **Hard topics.**
- Controls: Figures (show the slide under each question), Answers (hidden or all shown), Print.

**On the practice test, the lecture quizzes and Missed & uncertain:** a **Question wording** dropdown
(Original, College, Simple), as in LING285. Only the question changes. The choices and the right answer stay
the same.

| Module | Topics | Blocks | Topic questions | Review items | Experiment cards | Contrasts | Hard | Reworded questions |
|---|---|---|---|---|---|---|---|---|
| I · Midterm 1 | 16 | 85 | 76 | 60 | 18 | 17 | 8 | 90 |
| II · Midterm 2 | 16 | 90 | 86 | 64 | 38 | 13 | 8 | 180 |
| III · Final | 14 | 72 | 70 | 61 | 37 | 9 | 8 | 60 |

## Files
- `authoring/SPEC.md`: the rules and JSON shapes. `authoring/<m>/*.json`: the content.
- `build.cjs`: `node ling406/study/build.cjs check <m1|m2|m3>` checks the wording rules, refs and coverage.
  `build` writes `data/<m>.js`.
- `study.js` and `study.css`: the views. They wrap the app's `nav()` and `render()` and edit no `app.js`.
- `../modern/authoring/wire.py` adds the tags to the three pages. Bump `S` there when republishing.
- `board.md`: the review record. `tests/study.test.cjs`: `node --test ling406/study/tests/`.

**Before every commit:** after any change in `authoring/`, run `check`, then `build`, then `wire.py`, then the
tests. The site reads only `data/`.

There is no professor answer key for LING406. Every answer is written from the slides, and each module's
"About these answers" box says so and lists where a slide differs from the accepted facts.
