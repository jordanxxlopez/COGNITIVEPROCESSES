# BME423 Study Studio — Fall 2026 midterm

A separate static study application; the PSYC301 apps are unchanged.

Open: https://jordanxxlopez.github.io/COGNITIVEPROCESSES/bme423/

- All 17 uploaded PDFs, including 384 original lecture/review slide images.
- 45 teaching topics organized from basic notation through the midterm methods; related source pages are grouped under a method explanation.
- 224 worked and numerical practice examples with labeled inputs, intermediate calculations, short methods, progressive hints, numeric checks, and saved working.
- 315 quiz items; 20–30-question lecture quizzes and a 100-question combined test. Correct-letter adjacency is validated with rejection/reshuffling before display; grading uses canonical answer indices.
- Two eight-question, 90-minute written practice exams, with three opening probability questions and worked solutions unlocked on completion.
- Exactly four US-letter notes pages (two double-sided sheets), also provided as a PDF.
- Formula/test chooser, homework-to-method links, R commands, and an interactive critical-value reader using a pinned local jStat 1.9.6 copy.
- Collapsible sidebar, light/dark modes, enlarged source visuals with keyboard access, a full lecture slide/transcript viewer, font controls, read-aloud controls, local notes/progress, and missed-question retries.

## Source-grounded scope

Session 15 PDF pages 2/65 specify Monday 10:00–11:30 AM, 6–8 questions including 2–3 probability questions, two double-sided note sheets, separate unannotated statistical tables, and a calculator. The syllabus locates the midterm on October 19. Session 15 page 36 excludes hand-calculated sum-of-squares ANOVA and specifies balanced designs; Session 14 is excluded from the midterm and from quiz/exam selection. Clinical-trial concepts from Session 10 remain included. `coverage.json` records every lecture page's inclusion.

Practice questions are original study examples, with source-derived examples labeled. The notes do not claim to predict unseen instructor questions. R numerical comments are independently computed reference checks, not a claim that an R interpreter is embedded. The official tables and the homework's referenced BNP CSV were not supplied; use the Brightspace versions for those files. A specific arithmetic inconsistency on Session 11 page 12 is documented and recomputed from its displayed counts, while the original slide remains unmodified.

## Development and checks

Serve the repository root with `python -m http.server 8000`, then open `/bme423/`. No build or package installation is needed to run the app. All browser dependencies are local; source images/PDFs require their adjacent folders. Notes/progress remain local to that browser, under `bme423-studio-v1`, separate from PSYC301.

`tests/verify_math.py` uses NumPy, SciPy, SymPy, and PyMuPDF to check all 224 practice answers, symbolic density and shortcut identities, source coverage, and the four-page PDF. The included jStat license is under `vendor/`; its package integrity was verified against the pinned npm 1.9.6 SHA-512 digest before vendoring.
