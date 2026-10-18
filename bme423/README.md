# BME423 Study Studio — Fall 2026 midterm

A separate static study application; the PSYC301 apps are unchanged.

Open: https://jordanxxlopez.github.io/COGNITIVEPROCESSES/bme423/

- All 17 original course PDFs, including 384 original lecture/review slide images.
- 45 teaching topics organized from basic notation through the midterm methods; Versions A/B group related source pages under a method explanation. Version C adds a distinct opening teaching script for every one of the 384 source slides.
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

## Version C: individual slide teaching

Select **Version C · slide-by-slide lecture + full work** in a collection or the expanded viewer. Each PDF page has its own three-paragraph lecture explanation, followed by the complete, unchanged Version B material: intuition, rendered equations, symbol definitions, worked steps, shortcuts, and practice links. In Version C, individual collections list every source page separately; A/B retain their existing topic grouping. Slide titles and the expanded-viewer selector follow the actual page. Notes retain their existing session/page keys.

The 384 scripts (1,152 distinct paragraphs) are individually authored in `authoring/version-c/session*.md`, including outline, graph, calculation, review, and optional Session 14 pages. `authoring/build_version_c.py` packages those authored scripts into `version-c-data.js`; it does not synthesize explanations from topic templates. The build rejects missing pages, repeated paragraphs, or invalid paragraph counts. `version-c-coverage.json` records coverage and original-PDF hashes. Original lecture files, question banks, Versions A/B, math rendering, styles, and the four-page PDF are unchanged.

Run `python bme423/authoring/build_version_c.py` to rebuild the content. With the repository served on port 8907, `node bme423/tests/version-c.cjs` checks all 384 page mappings and rendered scripts, preservation of all A/B teaching paragraphs, the current Version B body below every C introduction, all 14 collections/viewers, previous/next navigation, version and note persistence, local math, mobile layout, and unchanged note-sheet assets. It does not regenerate the PDF.

## Version 3: follow-along exam solutions

The default four-page workspace now opens **Version 3**, generated from `authoring/build_follow_along_sheet.py`. Each major problem type pairs recognition cues and labeled givens with a complete numerical solution, the appropriate table lookup or TI-84 entry, and a contextual answer. The new examples include the actual unequal-size cognitive-score t test and filgrastim Bonferroni exercise from Homework 2. The pack also walks through CDF endpoints, a piecewise density, normalization, moments, Normal tails/quantiles, sample means, balanced ANOVA, the Holm stop rule, Yates-corrected z/chi-square, larger tables, goodness of fit, R output, and risk/odds/NNT/NNH.

`follow-along-sheet-data.js` is a separate print pack; `notes-v3.html` and `BME423-four-page-notes-v3.pdf` are its standalone view and export. `follow-along-sheet.css` applies only to the new sheets. The result is exactly four 8.5×11-inch pages, three columns per page, **0.30-inch margins on all four sides**, 6.5–7pt body text, and rendered display math at least 6.9pt at its base size. Each page's compact header sits inside column 1, leaving columns 2 and 3 available from the top. Versions 1 and 2 remain available and their PDFs/source files are preserved. Lecture Versions A/B/C, source materials, questions, notes, and progress keys are unchanged.

`authoring/follow_along_equations.py` adds 77 source-linked general equations directly before their worked substitutions. All 44 method blocks are reviewed, including those that already supply the general rule. Every original paragraph and all 184 original display equations are preserved, in the same column order. The build rejects unreviewed blocks or invalid insertion points and records the equation audit in `follow-along-coverage.json`.

The percentile example now uses the course-slide rank convention `1 + p(n−1)/100`, correcting the older pack's different convention. The rounded Normal-table impurity example uses `.1736 − .0091 = .1645`. `follow-along-coverage.json` maps all 43 included topic entries to the 44 printed method blocks, with the two stated exclusions retained. Evidence scores are used for coverage, not as probabilities of unseen questions. The printed sheets contain no source citations or ranking metadata.

Run the build script, then `node bme423/tests/follow-along-sheet.cjs` with the repository served on port 8907 to validate the layout and export only the Version 3 PDF. `python bme423/tests/verify_follow_along.py` independently checks 127 displayed values with NumPy/SciPy, symbolic density/CDF relationships with SymPy, source links for the added equations, exact preservation of the original Version 3 prose and displays, topic coverage, preservation of earlier files, four physical letter pages, and all margins. The browser check covers equation-before-substitution order, the column-1 headers, every column's bounds and utilization, mathematical rendering and size, the app's preview/download, mobile containment, and the archived Version 2 view. Previous PDF-generating tests still write their respective older versions and need not be run to regenerate Version 3.

## Equations beside each calculation

`equation-guide-data.js` adds an explicitly assigned equation and nearby symbol meanings before each quantitative practice step. The same renderer supplies progressive hints, full worked examples, quiz explanations/results and both written-exam solution sets. The 38 source-worked blocks have been reviewed separately; their equations are inserted directly before the corresponding numerical substitution. All 384 slide scripts are reviewed in `equation-coverage.json`, with paragraph-specific equation placements on 293 mathematical slides and conceptual pages kept free of unrelated formulas. Version C's existing 1,152 prose paragraphs remain unchanged. Versions A/B also show equations beside their teaching paragraphs.

`authoring/build_equation_guide.py` and `authoring/equation_slide_placements.py` contain the assignments. Unknown practice-step labels or invalid slide/display positions fail the build. The app's two percentile exercises, associated quiz choices/explanations, R type-7 reference and formula list now use the lecture rule `1 + p(n−1)/100`, consistently with the current four-page guide. Cached practice marks for those two exercises are rechecked against the corrected answers. Source slides, archived print sheets, notes and navigation remain intact. The separate Version 3 print revision described above brings the same equation-before-work presentation into the four-page PDF.

Validation: `python bme423/tests/verify_equations.py` checks all 1,077 steps, independent values and symbolic identities, and content preservation. With the repository served on port 8907, `node bme423/tests/equations.cjs` checks equation-before-substitution order, all teaching versions, all question feedback, grading, hidden/revealed exam solutions, table lookups, expanded notes and mobile layouts. Existing numerical, random-key, Version C, study-navigation and four-page validation checks remain applicable; none of these equation checks rewrite a PDF.

## TI-84 Plus CE Python programs

The **TI-84 programs** workspace links to `ti84/`: 36 self-contained TI-BASIC calculation programs and an optional `BME423` chooser, supplied as native `.8xp` files and one ZIP. These run from **PRGM**, using the calculator's built-in statistics functions; the Python app is not required. Screens target the CE's 26-column, 10-row home screen. Results appear first, followed by equations and labeled intermediate values; ENTER advances a screen and CLEAR exits. The download page includes example inputs, captured example screens, program selection, and official TI Connect CE transfer instructions.

The methods follow the existing review/homework evidence scores, without claiming probabilities of unseen questions. They include the course's percentile convention, balanced ANOVA, residual-df pair comparisons, Bonferroni/Holm adjustments, Yates-corrected two-proportion/2-by-2 tests, discrete/continuous probability, summaries, risk and odds. Each calculation works independently. Programs use A-Z, theta and named BM scratch lists; they leave L1-L6 alone. Existing lecture, quiz, notes, print-pack and progress data are unchanged.

Build with `tivars==1.1.1` from `authoring/requirements-ti84.txt`, then run these in order:

```sh
python bme423/authoring/build_ti84.py
python bme423/tests/verify_ti84.py
python bme423/authoring/build_ti84.py --package
```

Verification checks native file lengths/checksums, model support and token round trips, then executes the decoded TI-BASIC using `tests/ti_basic_vm.py`. Independent NumPy/SciPy references cover all 222 numerical practice problems, source cases, critical values, endpoint rules and invalid inputs: 368 executions and 327 numerical comparisons. Two conceptual problems require written interpretation. This harness is not a TI ROM emulator; physical calculator testing remains necessary, with BMONE and BMZ transfer checks supplied in the guide. Packaging rejects a validation report whose manifest hash does not match. With the repository served on port 8907, `node bme423/tests/ti84-ui.cjs` checks every program download and calculation preview, screen navigation, ZIP download, filtering, saved notes, dark mode and mobile layout.

### BMSTEPS: one on-calculator instruction guide

`ti84/steps/BMSTEPS.8xp` is a separate, standalone TI-BASIC reading guide. It covers all 36 calculation methods with recognition/givens, 179 explicit steps, equations, blank substitutions and contextual answer sentences. The 253 screens are organized by method; ENTER/right advances, left goes back within the selected method, and CLEAR returns to the main menu. Users copy their values and working onto paper. The original calculation programs remain available for numerical results. Only this one additional file needs transferring; it has no helper dependencies. It uses B, C, P and theta, preserving T for a previously computed PDF endpoint.

`authoring/build_ti84_steps.py` contains the separately authored instructions and builds the native file, source and screen manifest. The compiler canonicalizes TI glyphs and wraps complete text onto 26-column/10-row pages, keeps all method menus within seven items, checks complete method coverage, and shares the viewer to fit the full guide in one 49 KB program variable. Run `python bme423/authoring/build_ti84_steps.py` with the same tivars dependency, then `python bme423/tests/verify_ti84_steps.py`. The decoded-code test checks every screen, menu reachability, all navigation paths, bounds, native file sizes/checksum/model support, and standalone operation. This is software verification, not a physical calculator test. `node bme423/tests/ti84-steps-ui.cjs` checks every web preview and the single-file download. The guide has its own download page at `ti84/steps/`; the original ZIP and binaries, lecture content and four-page notes are preserved.

## Focused learning and written checks

Two additional workspace sections, **Learn these methods** and **Check I can solve it**, are implemented in `rapid-prep.js` with scoped `rapid-prep.css`. They organize the remaining preparation by method rather than by day. Eight groups cover recognition and notation, discrete probability, continuous densities, Normal measurements/averages, t comparisons, balanced ANOVA/adjusted pairs, corrected categorical tests, and risk/odds/output. Every topic with an evidence score of at least ten appears in the route; explicit exclusions remain excluded. Recognition patterns pair the existing equation rules and symbol meanings with a complete worked example and a distinct practice problem. Hints, full work, numeric grading and notes reuse the existing bank and equation renderer.

The written check contains six multipart questions, three beginning with probability, formula-only cues, covered solutions, a voluntary 60-minute timer, and separate setup/calculation/interpretation checks. Repair links return to the corresponding learning group. Completion marks are self-reported practice progress, not an exam-score forecast. The original short route, five-day plan, all teaching versions, questions, quizzes, calculator files and print sheets remain available. New progress is stored under `quickPrep` and namespaced checklist entries inside the existing local state; existing notes and marks are retained. Direct links use `?view=learnNow` and `?view=checkNow`.

With the repository served on port 8907, `node bme423/tests/rapid-prep.cjs` checks all eight groups, review-priority coverage, equation-before-substitution order, hint/reveal/grading behavior, saved state, bounded next/previous navigation, six covered/revealed checks, repairs, timer, original entry points, and light/dark mobile layouts. Existing equation, study-navigation and random-key tests remain applicable; no PDFs are regenerated.
