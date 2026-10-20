# LING285 Study Studio

Human Language and Technology · Fall 2026 · Khalil Iskarous.

The studio provides teaching notes alongside the original pages, numbered lecture collections, a selective must-know core review, a readiness guide, demonstrations, combined notes, and both multiple-choice and written practice. Notes explain cause and effect in the instructor's style. Written responses use model explanations and self-assessment criteria. Multiple-choice responses use a source-checked key and explain every option.

Module II opens by default with Lectures 11–13 and room for future additions. Module I retains Lectures 01–10 and its own study tools. Each module has separate guides, core review, combined notes, practice, quizzes, and retry queues. The burgundy-to-rose gradient layout follows the PSYC301 navigation hierarchy, with a current-module overview and a first-midterm archive. Meadows has a separate workspace section. Uploaded reviews, supplemental lecture notes, and the syllabus remain accessible through Sources & coverage.

## Included material

All 26 supplied files are preserved and verified by SHA-256. The student workspace contains 216 lecture slides across 12 deck collections, covering Lectures 01–13 with 05–06 combined, plus supporting readings, the syllabus, and both uploaded review documents. These total 315 student-facing source pages. The 37-page LING406 reference PDF is retained separately as an organization reference and contributes no LING285 teaching or practice.

The current edition retains all 134 existing questions and expands Module II to 150 questions. Each of Lectures 11, 12, and 13 owns 50 questions, with 25 multiple-choice items and 25 written prompts. The primary current practice test selects exactly 100 unique questions, split 50/50, with balanced lecture coverage. Module I keeps its 92-question bank and previous practice behavior. The full course has 242 questions, alongside 49 selected core-review pages and 19 readiness and demonstration entries. Original visuals and teaching remain preserved. Every teaching page records source provenance and completed visual-review checks in [teaching-coverage.json](authoring/teaching-coverage.json).

The supplied Exam 1 Review has 20 conceptual prompts and no A–D items. [assessment-model.json](authoring/assessment-model.json) records its observed reasoning patterns. New MCQs adapt those patterns, including cause and effect, comparisons, applications, and interpretation. Module II questions transfer the style to its own source material. The reproducible ranker combines TF–IDF similarity to the review with reasoning-pattern weights. Sampling covers the active lectures and both formats before using these weights. Scores express study relevance, not validated probabilities of exam appearance. [assessment-ranking.json](authoring/assessment-ranking.json) records the executed scores.

The expanded Module II banks receive a separate [question editorial audit](authoring/module2-expanded-audit.json). The earlier `editorial-audit.json` and `mcq-editorial-audit.json` remain historical records of their respective editions.

Source discrepancies are identified on the relevant pages. Unavailable external demonstrations, untranscribed audio, and unreadable details are qualified rather than reconstructed. The uploaded answer companion has unverified authorship; its answers are checked against the primary lecture sources. The file labeled Lectures 05–06 has an internal title of Lectures 4+5, so both labels are retained.

Personal notes, read marks, practice drafts, and review ratings are saved in the browser under a course-specific key. The Sources & coverage view can export and import a backup. See [UI-README.md](UI-README.md) for state and interface details.

## Run and verify

This is a static site with no package installation or production build. From the repository root, serve the checkout with a static HTTP server and open its `/ling285/` route.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The existing prepared cloud environment supplies Node.js, Chromium, Playwright, Python, and the extraction tools. Run the content and browser checks from the repository root.

```sh
node --test ling285/tests/content.test.cjs
node --test ling285/tests/fixed-practice.test.cjs
node ling285/tests/app-smoke.cjs
node ling285/tests/module-practice-smoke.cjs
```

The content checks verify source and media hashes, references, coverage, selective core review, practice contracts, and important source corrections. The browser checks start temporary servers and exercise navigation, readers, notes, read marks, practice, persistence, backups, original media, and mobile containment. The fixed-practice regression also simulates an added Lecture 14 and verifies that the cumulative test stays at 100 while contributions rebalance. These checks do not substitute for academic source review.

## Add the next lecture

Follow [AGENTS.md](AGENTS.md) before authoring. Preserve the new original file, extend `authoring/upload-manifest.json`, extract its text and media, and inspect every rendered page and meaningful original asset. Keep existing lecture and section IDs stable so personal progress remains associated with the same content.

Write the new teaching sections in the authoring JSON collections. Update readiness entries and selective core references in `authoring/practice-guide.json`. For each Module II lecture, add `authoring/module2-lectureNN-practice.json` with exactly 25 MCQs and 25 written prompts, each with that lecture's explicit `lectureId`. The assembly script assigns numbered lecture decks from Lecture 11 onward to Module II and verifies the complete bank. Existing questions retain their IDs and content. The older practice files remain the baseline for Module I and previously published questions.

The cumulative test stays at 100 questions when another lecture arrives. Its 50 MCQ places and 50 written places are shared as evenly as possible among the supplied lecture banks, with complementary remainder allocation keeping total lecture contributions balanced. New lectures replace some earlier lectures' places in the cumulative selection. Each lecture retains its complete 50-question quiz, drafts, and ratings. Update the edition, model blueprint, and revision, rebuild, and run the checks. Questions leave the active bank only when deliberately retired.

The assembly step verifies reviewed source coverage and copies original runtime assets by content hash.

```sh
python3 ling285/authoring/build_studio.py
```

## Reproduce extraction

Extraction requires PyMuPDF, Pillow, python-pptx, python-docx, lxml, LibreOffice, Tesseract, and ffmpeg/ffprobe. Original files already in `sources/` can be used when temporary upload paths no longer exist. The extraction and inventory commands below regenerate working material; review the resulting changes before rebuilding a released edition.

```sh
python3 ling285/authoring/extract_sources.py
OMP_THREAD_LIMIT=1 python3 ling285/authoring/inspect_embedded.py
python3 ling285/authoring/refresh_inventory.py
```

Source originals, converted PDFs, rendered pages, extracted text, authored teaching, inventories, and runtime assets are versioned. Duplicate extracted-media caches and contact sheets are ignored because they can be regenerated from the originals. Historical intake checkpoints describe the state at intake; current release coverage is recorded in [coverage-report.json](coverage-report.json).
