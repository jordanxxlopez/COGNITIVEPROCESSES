# BME423 Study Studio — Fall 2026 midterm

A separate static study application; the PSYC301 apps are unchanged.

Open: https://jordanxxlopez.github.io/COGNITIVEPROCESSES/bme423/

- All 17 original course PDFs, including 384 original lecture/review slide images.
- 45 teaching topics organized from basic notation through the midterm methods; related source pages are grouped under a method explanation.
- 224 worked and numerical practice examples with labeled inputs, intermediate calculations, short methods, progressive hints, numeric checks, and saved working.
- 327 quiz items; 20–30-question lecture quizzes and a 100-question combined test. Correct-letter adjacency is validated with rejection/reshuffling before display; grading uses canonical answer indices.
- Two eight-question, 90-minute written practice exams, with three opening probability questions and worked solutions unlocked on completion.
- Original four-page notes preserved, plus Version 2: exactly four US-letter sides, three columns, 7.5pt body, rendered LaTeX, full source-based worked examples, table instructions, and TI-84 guidance.
- Formula/test chooser, homework-to-method links, R commands, and an interactive critical-value reader using a pinned local jStat 1.9.6 copy.
- Collapsible sidebar, light/dark modes, enlarged source visuals with keyboard access, a full lecture slide/transcript viewer, font controls, read-aloud controls, local notes/progress, and missed-question retries.

## Source-grounded scope

Session 15 PDF pages 2/65 specify Monday 10:00–11:30 AM, 6–8 questions including 2–3 probability questions, two double-sided note sheets, separate unannotated statistical tables, and a calculator. The syllabus locates the midterm on October 19. Session 15 page 36 excludes hand-calculated sum-of-squares ANOVA and specifies balanced designs; Session 14 is excluded from the midterm and from quiz/exam selection. Clinical-trial concepts from Session 10 remain included. `coverage.json` records every lecture page's inclusion.

Practice questions are original study examples, with source-derived examples labeled. The notes do not claim to predict unseen instructor questions. R numerical comments are independently computed reference checks, not a claim that an R interpreter is embedded. Eight subsequently uploaded statistical tables are preserved unannotated under `sources/tables/`; the z, t, F, and either chi-square table serve this midterm. The other rank-test tables do not expand the stated scope. The BNP CSV was not supplied. A specific arithmetic inconsistency on Session 11 page 12 is documented and recomputed from its displayed counts, while the original slide remains unmodified.

## Development and checks

Serve the repository root with `python -m http.server 8000`, then open `/bme423/`. No build or package installation is needed to run the app. All browser dependencies are local; source images/PDFs require their adjacent folders. Notes/progress remain local to that browser, under `bme423-studio-v1`, separate from PSYC301.

`tests/verify_math.py` uses NumPy, SciPy, SymPy, and PyMuPDF to check all 224 practice answers, symbolic density and shortcut identities, source coverage, and the four-page PDF. The included jStat license is under `vendor/`; its package integrity was verified against the pinned npm 1.9.6 SHA-512 digest before vendoring.

## Review-aligned Version 2

`v2-data.js` adds 45 Version B teaching scripts (intuition, rendered source equations, symbol definitions, source-based worked applications, short method), 12 output-interpretation quiz items, explicit professor-review guidance, a short preparation route, and original table links. A version selector preserves the original scripts. No PSYC301 files or progress keys change.

The complete user-supplied review transcript is preserved at `sources/midterm-review-transcript.txt`. Its explicit exam guidance takes precedence over inferred topic scores. `exam-priorities.json` records a transparent evidence-ranking model: transcript emphasis 5, review inclusion 3, HW1 method 2, HW2 method 3, with explicit exclusions set to zero. This is not a fitted predictor or a probability forecast of unseen questions.

The transcript says no code writing, emphasizes using supplied ANOVA/t/chi-square output, specifies supplied ANOVA means and SDs, requires balanced hand ANOVA and Yates for 2×2 tests, and expects Homework 2 solutions early Saturday. Equations are checked against slides where speech recognition drops roots or substitutes a statistical term.

`authoring/build_v2.py` regenerates the Version 2 content and evidence report. KaTeX 0.16.22 and its fonts are served locally under `vendor/katex/`, with its license. W3C cognitive-accessibility guidance and the IES learning guide support visible labels/intermediates, connected verbal/visual explanations, worked-example alternation, and retrieval practice; research links and their scope are in the app’s source page. TI entries were checked against the official TI-84 Plus CE Reference Guide. No particular color/font is represented as a proven ADHD intervention.

Additional verification:
- `python bme423/tests/verify_v2.py`: 77 independent SciPy/NumPy checks of the new source-based worked values, table/Holm decisions, scope and source files.
- `node bme423/tests/quiz.test.cjs`: complete augmented bank, rejection/reshuffling validation, canonical grading assumptions, 100 unique-stem combined exams, distribution calculations.
- With the repository served on port 8907, `node bme423/tests/ui-v2.cjs`: both teaching versions, every collection, all math, notes persistence, grading, mobile layout, printable math >=7pt, and 12-column/four-page geometry. It regenerates `BME423-four-page-notes-v2.pdf`. The final PDF is checked separately as four 612×792pt pages with no literal LaTeX.

## Expanded four-page sheet revision

`authoring/build_note_sheet.py` creates an isolated `note-sheet-data.js` print pack. It does not rewrite the lecture scripts or question bank. The pack removes printed attributions and repeated housekeeping text; adds direct variance, discrete CDF endpoint rules, population and median formulas, the actual five-comparison Holm stop exercise, R function interpretation, a df reference, and labeled risk/odds and low-base-rate examples. It remains four letter pages with 0.30-inch top/bottom and 0.24-inch left/right margins, three columns and 7.5pt body text. The requested note-page rules use a named page and do not change other print views.

`notes-coverage-report.json` reruns the evidence-score coverage audit against explicit professor emphasis, the review, and homework. All 43 included topic entries map to printed content; the two explicit exclusions stay excluded. These are preparation rankings, not probabilities of unseen questions. The PDF itself contains no source-reference lines or ranking metadata.

Run `node bme423/tests/note-sheet.cjs` to verify print geometry, math sizing and the preview, and regenerate the PDF. Then run `python bme423/tests/verify_note_sheet.py` to verify the inherited numeric examples plus the new calculations, coverage, four physical letter pages, margins, and absence of printed citations.
