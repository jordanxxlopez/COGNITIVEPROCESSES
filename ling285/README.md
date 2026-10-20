# LING285 Study Studio

Human Language and Technology · Fall 2026 · Khalil Iskarous.

The studio provides teaching notes alongside the original pages, numbered lecture collections, a selective must-know core review, a readiness guide, demonstrations, combined notes, and both multiple-choice and written practice. Notes explain cause and effect in the instructor's style. Written responses use model explanations and self-assessment criteria. Multiple-choice responses use a source-checked key and explain every option.

Lectures 11–14 have four transcript editions. **Version 4 · Teaching notes** opens for new users. It follows the plain explanatory style of PSYC301 expanded teaching and LING406 slide-wording notes, with a median of **216 words across 75 instructional pages**. The user requested a 200–250-word median rather than a minimum per slide. Each explanation uses a few connected paragraphs to teach mechanisms and source-supported distinctions. The 11 title, blank, and prompt-only pages remain unpadded. Versions 1, 2, and 3 remain unchanged, and an explicitly saved version stays selected. All versions share the same personal notes and read marks and apply across lecture notes, combined notes, core review, readers, search, recall, print, and speech.

**Practice Version 2 · Exam style** adds 200 questions, separate from the original bank. Each lecture has 25 MCQs and 25 written questions. The current test selects 100 unique questions, split 50/50 and balanced across the four lectures. It adapts the actual 25-question Exam 1 key and 20-prompt review: some questions ask for identification or a direction, while others ask for a comparison or causal explanation. The 50/50 study split follows the user's requirement, not the observed exam proportions. Version 1 remains available, with separate saved sessions and answers. A temporary missing version file leaves earlier practice available and retains the unavailable edition's saved work.

Video-only pages show their original embedded video directly when the flattened slide preview is entirely blank. Pages with written content, diagrams, or reveal overlays retain their previews. All original files, figures, source text, code, and detailed numerical labels remain available. The additional review copy and answer key are listed in Sources & coverage as transcript-writing references.

Module II opens by default with Lectures 11–14 and room for future additions. Module I retains Lectures 01–10 and its own study tools. Each module has separate guides, core review, combined notes, practice, quizzes, and retry queues. The burgundy-to-rose gradient layout follows the PSYC301 navigation hierarchy, with a current-module overview and a first-midterm archive. Meadows has a separate workspace section. Uploaded reviews, supplemental lecture notes, and the syllabus remain accessible through Sources & coverage.

## Included material

All 27 supplied files are preserved and verified by SHA-256. The student workspace contains 241 lecture slides across 13 deck collections, covering Lectures 01–14 with 05–06 combined, plus supporting readings, the syllabus, and both uploaded review documents. These total 340 student-facing source pages in 26 collections, or 377 rendered pages when the separate reference PDF is included. The 37-page LING406 reference PDF is retained separately as an organization reference and contributes no LING285 teaching or practice.

The current edition retains all 242 previously released questions and adds Lecture 14's complete 50-question bank. Module II now contains 200 questions across Lectures 11–14. Each lecture owns 50 questions, with 25 multiple-choice items and 25 written prompts. The primary current practice test still selects exactly 100 unique questions, split 50/50, with 25 questions from each available lecture. Module I keeps its 92-question bank and previous practice behavior. The full course has 292 questions, alongside 56 selected core-review pages and 24 readiness and demonstration entries. Original visuals and teaching remain preserved, including all 315 earlier student sections. Every teaching page records source provenance and completed visual-review checks in [teaching-coverage.json](authoring/teaching-coverage.json).

The supplied Exam 1 Review has 20 conceptual prompts and no A–D items. [assessment-model.json](authoring/assessment-model.json) records its observed reasoning patterns. New MCQs adapt those patterns, including cause and effect, comparisons, applications, and interpretation. Module II questions transfer the style to its own source material. The reproducible ranker combines TF–IDF similarity to the review with reasoning-pattern weights. Sampling covers the active lectures and both formats before using these weights. Scores express study relevance, not validated probabilities of exam appearance. [assessment-ranking.json](authoring/assessment-ranking.json) records the executed scores.

Lecture 14 has its own [source and question audit](authoring/lecture14-audit.json). The [expanded Module II question audit](authoring/module2-expanded-audit.json) remains the historical Version 3 record for Lectures 11–13. The earlier `editorial-audit.json` and `mcq-editorial-audit.json` also retain their respective editions.

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
node --test ling285/tests/lecture14.test.cjs
node --test ling285/tests/transcripts-v2.test.cjs
node --test ling285/tests/transcript-versions.test.cjs
node --test ling285/tests/practice-versions.test.cjs
node --test ling285/tests/editions-v3-practice-v2.test.cjs
node --test ling285/tests/transcripts-v4.test.cjs
node ling285/tests/app-smoke.cjs
node ling285/tests/module-practice-smoke.cjs
```

The content checks verify source and media hashes, references, coverage, selective core review, practice contracts, and important source corrections. The browser checks start temporary servers and exercise navigation, readers, notes, read marks, practice, persistence, backups, original media, and mobile containment. The fixed-practice regression also simulates an added Lecture 15 and verifies that the cumulative test stays at 100 while contributions rebalance to 20 questions per lecture. These checks do not substitute for academic source review.

## Add the next lecture

Follow [AGENTS.md](AGENTS.md) before authoring. Preserve the new original file, extend `authoring/upload-manifest.json`, extract its text and media, and inspect every rendered page and meaningful original asset. Keep existing lecture and section IDs stable so personal progress remains associated with the same content.

Write the new teaching sections in the authoring JSON collections. Update readiness entries and selective core references in `authoring/practice-guide.json`. For each Module II lecture, add `authoring/module2-lectureNN-practice.json` with exactly 25 MCQs and 25 written prompts, each with that lecture's explicit `lectureId`. The assembly script assigns numbered lecture decks from Lecture 11 onward to Module II and verifies the complete bank. Existing questions retain their IDs and content. The older practice files remain the baseline for Module I and previously published questions.

The cumulative test stays at 100 questions when another lecture arrives. Its 50 MCQ places and 50 written places are shared as evenly as possible among the supplied lecture banks, with complementary remainder allocation keeping total lecture contributions balanced. New lectures replace some earlier lectures' places in the cumulative selection. Each lecture retains its complete 50-question quiz, drafts, and ratings. Update the edition, model blueprint, and revision, rebuild, and run the checks. Questions leave the active bank only when deliberately retired.

The assembly step verifies reviewed source coverage and copies original runtime assets by content hash.

```sh
python3 ling285/authoring/build_studio.py
```

Version 2 is assembled separately so rebuilding it cannot overwrite the original course data or practice bank. Its four authored collections are `authoring/teaching-v2-lecture11.json` through `teaching-v2-lecture14.json`. The build verifies their page identities, teaching coverage, and reviewed media-presentation flags. The source review and writing evidence are recorded in `authoring/transcripts-v2-style-model.json`, and the independent review is recorded in `authoring/transcripts-v2-audit.json`.

```sh
python3 ling285/authoring/build_transcripts_v2.py
```

## Reproduce extraction

Extraction requires PyMuPDF, Pillow, python-pptx, python-docx, lxml, LibreOffice, Tesseract, and ffmpeg/ffprobe. Original files already in `sources/` can be used when temporary upload paths no longer exist. For a weekly addition, process only the new source so earlier converted PDFs and rendered pages stay unchanged. The example below targets Lecture 14; substitute the new source key for a later lecture.

```sh
python3 ling285/authoring/extract_sources.py --only lecture14
OMP_THREAD_LIMIT=1 python3 ling285/authoring/inspect_embedded.py --only lecture14
python3 ling285/authoring/sample_video_phases.py lecture14
python3 ling285/authoring/refresh_inventory.py
```

The phase sampler records nonuniform video samples linked to their original source assets. Inspect the source media and resulting inventory before authoring and rebuilding. Omitting `--only` processes the whole source inventory and is unnecessary for a single weekly addition.

Source originals, converted PDFs, rendered pages, extracted text, authored teaching, inventories, and runtime assets are versioned. Duplicate extracted-media caches and contact sheets are ignored because they can be regenerated from the originals. Historical intake checkpoints describe the state at intake; current release coverage is recorded in [coverage-report.json](coverage-report.json).

## Build the additional editions

```sh
python3 ling285/authoring/build_transcripts_v3.py
python3 ling285/authoring/build_practice_v2.py
```

These scripts preserve `data.json` and older editions. Four `teaching-v3-lectureNN.json` files retain all 86 source-page identities. Four `practice-v2-lectureNN.json` files supply the 200 distinct new question IDs. `exam-style-evidence-v2.json` records all 45 actual exam/review prompts. `practice-v2-model.json` records the executed study ranking: source-only TF–IDF similarities and observed reasoning patterns, applied after lecture and format quotas. Its coefficients are editorial study weights, with no validated claim about future exams. The review record distinguishes independent review from author self-review.

## Build Transcript Version 4

```sh
python3 ling285/authoring/build_transcripts_v4.py
```

The hand-authored paragraphs are in `authoring/version4/notes.py`. Explicit mappings reuse explanations only for the same reviewed source demonstration. The builder writes four `teaching-v4-lectureNN.json` files, `transcripts-v4.json`, a coverage report, reference metrics, and preservation hashes. It verifies all 86 source identities, the requested instructional-page median, and byte-for-byte preservation of earlier teaching and both question banks. Completed source extraction and media reviews are reused; no replacement visuals are created.

The Version 3 release audit remains historical. Its original interface hashes are verified against commit `8334e0b`, while its unchanged teaching, sources, and practice files are checked in the current checkout. Version 4 has a separate review and release record.
