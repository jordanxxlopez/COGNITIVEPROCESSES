# LING285 Study Studio

Human Language and Technology · Fall 2026 · Khalil Iskarous.

The studio provides teaching notes alongside the original pages, numbered lecture collections, a selective must-know core review, a readiness guide, demonstrations, combined notes, and both multiple-choice and written practice. Notes explain cause and effect in the instructor's style. Written responses use model explanations and self-assessment criteria. Multiple-choice responses use a source-checked key and explain every option.

Lectures 11–17 have ten transcript editions. **Version 4 · Teaching notes** was the initial edition before the bulleted editions below were added. It follows the plain explanatory style of PSYC301 expanded teaching and LING406 slide-wording notes, with a median of **225 words across 104 instructional pages**. The user requested a 200–250-word median rather than a minimum per slide. Each explanation uses a few connected paragraphs to teach mechanisms and source-supported distinctions. The 19 title, blank, and prompt-only pages remain unpadded. Versions 1, 2, and 3 remain unchanged, and an explicitly saved version stays selected. All versions share the same personal notes and read marks and apply across lecture notes, combined notes, core review, readers, search, recall, print, and speech.

Module II also has six bulleted teaching-notes editions, matching the editions written for PSYC301 Module II and LING406. Each one is a separate page-by-page text for all 104 instructional pages of Lectures 11–17, written as bolded main bullets of connected spoken sentences with nested sub-bullets. When the same source slide appears in more than one lecture deck, an edition reuses its own text for that slide.

- **Version 7 · Teaching notes (bulleted)** teaches each mechanism step and demonstration value, about 240 words per page.
- **Version 10 · Direct teaching notes** uses affirmative explanations instead of unnecessary caveats, about 200 words.
- **Version 12 · Detailed teaching notes** follows the 350–400-word detailed guidance, about 360 words.
- **Version 14 · Balanced teaching notes** follows the 225-word-average, 350-word-maximum guidance and averages about 200 words, a little under its target.
- **Version 16 · Natural teaching notes** tells demonstrations naturally under a strict 300-word maximum, about 240 words.
- **Version 18 · Teaching scripts** follows Prompt 2: figures are explained by their meaning, only key numbers are kept, about 200 words.

Version 18 opens for new users, and an explicitly saved version stays selected. Versions 1–4, notes, read marks and practice are unchanged. Title, blank and prompt-only pages stay empty. Rebuild all six with `python3 ling285/authoring/build_transcripts_notes.py`. The authored text is in `authoring/transcripts-vN/lectureNN.txt`.

**Practice Version 2 · Exam style** adds 350 questions, separate from the original bank. Each lecture has 25 MCQs and 25 written questions. The current test selects 100 unique questions, split 50/50 and balanced across the seven lectures. It adapts the actual 25-question Exam 1 key and 20-prompt review: some questions ask for identification or a direction, while others ask for a comparison or causal explanation. The 50/50 study split follows the user's requirement, not the observed exam proportions. Version 1 remains available, with separate saved sessions and answers. A temporary missing version file leaves earlier practice available and retains the unavailable edition's saved work.

Video-only pages show their original embedded video directly when the flattened slide preview is entirely blank. Pages with written content, diagrams, or reveal overlays retain their previews. All original files, figures, source text, code, and detailed numerical labels remain available. The additional review copy and answer key are listed in Sources & coverage as transcript-writing references.

Module II opens by default with Lectures 11–17 and room for future additions. Module I retains Lectures 01–10 and its own study tools. Each module has separate guides, core review, combined notes, practice, quizzes, and retry queues. The burgundy-to-rose gradient layout follows the PSYC301 navigation hierarchy, with a current-module overview and a first-midterm archive. Meadows has a separate workspace section. Uploaded reviews, supplemental lecture notes, and the syllabus remain accessible through Sources & coverage.

## Included material

All 30 supplied files are preserved and verified by SHA-256. The student workspace contains 278 lecture slides across 16 deck collections, covering Lectures 01–17 with 05–06 combined, plus supporting readings, the syllabus, and both uploaded review documents. These total 377 student-facing source pages in 29 collections, or 414 rendered pages when the separate reference PDF is included. The 37-page LING406 reference PDF is retained separately as an organization reference and contributes no LING285 teaching or practice.

The current edition retains all 342 earlier questions and adds the complete 50-question banks for Lectures 16 and 17. Module II contains 350 questions across Lectures 11–17 in each practice edition. Each lecture owns 25 multiple-choice questions and 25 written prompts. The current 100-question test shares its 50 multiple-choice and 50 written places as evenly as possible, so five lectures contribute 14 questions and two contribute 15, with seven or eight of each format per lecture. Earlier saved sets remain available with a notice to start a new set for the expanded coverage. Module I keeps its 92-question bank and previous behavior. The original course bank has 442 questions, 71 selected core-review pages, and 33 readiness and demonstration entries. All 353 earlier student sections retain their content and progress IDs.

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
node --test ling285/tests/transcripts-notes-editions.test.cjs
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

## Module I study template

Module I has the same modern-workspace structure as Module II: Study this first · Module I (16 topics, every review and Exam 1 question answered, slides and the professor's videos beside the notes), Notes by topic · Lectures 01–10, an Exam 1 review guide, and the Module I focus choice on What to know by the end and What you can be asked. It is built from `authoring/module1/` by `authoring/module_template.py`; see `modern/README.md` for how to add a lecture or a module.

## Module I notes editions (Versions 7 to 10.1 for Lectures 01–10)

The twelve "notes" choices in the Teaching style dropdown (Version 7, 7 Version 2, 8, 8.1, 8.2, 9, 9.1, 9.2, 9.3, 9.4, 10 and 10.1) now cover Lectures 01–10 as well as 11–18, in the same styles as their Module II versions. `availableModules` on each payload lists both modules and `modern/runtime.js` reads it, so the dropdown no longer greys these choices out in Module I.

- **Version 7 · Your PDF notes** places the user's own lecture-note PDFs beside the slides word for word. The PDFs are `sources/notes-v7-lecture01.pdf` to `notes-v7-lecture05-06.pdf`, `notes-lecture07.pdf`, `notes-lecture08.pdf`, `notes-v7-lecture09.pdf` and `notes-v7-lecture10.pdf` (each holds a full copy followed by a shorter copy; the full first copy is used). `authoring/notes_v7_module1.py` reads them character by character from the rendered page so inline math symbols and stacked fractions land in place, judges bold from each glyph's rendered ink weight, transcribes a few stacked sums by hand (`FIXES`, `PREFIX_FIXES`, `CLIPPED`, `INLINE_FIXES`), and maps each note section to its slide with `authoring/notes-module1-maps.json`. It writes `authoring/notes-v7-module1.json` and `authoring/notes-v7-module1-extraction.json`, which `clear_editions.py` merges into `modern/transcripts-notes-v7.json`.
- **Version 7 · Version 2** is written per lecture in `authoring/notes-v7-v2-module1/NN.md`, slide by slide with `> idea | source | blocks` coverage lines, and built by `notes_v7_v2.py`.
- **Versions 9.1, 9 and 10** are hand-written parents in `authoring/notes-v9.1/NN.md`, `notes-v9/NN.md` and `notes-v10/NN.md` (`## pN` pages, bullets and sub-bullets, checked with `python3 ling285/authoring/check_v9.py <file>`).
- **Versions 9.2, 9.3, 9.4 and 10.1** are derived from those parents by `authoring/module1_notes_derive.py`, which lists every wording change per lecture and fails if a parent drifts. The labeled editions (9.4 and 10.1) also replace casual terms with technical ones throughout.
- **Versions 8, 8.1 and 8.2** are the slide-by-slide notes regrouped into the Version 8 section format by `authoring/module1_notes.py` (8 and 8.1 from 9.1, 8.2 from 9.4; 8.1 adds nothing for Module I because the cloze and year-ago additions belong to Lectures 12–14 and 17). `notes_v8.py` places them with the section maps.

Lecture keys are `01, 02, 03, 04, 05-06, 07, 08, 09, 10`, matching the collection ids. `check_v9.py` holds `LECTURES`, `MODULE` and `EMPTY_OK` (title, blank and reminder pages that may stay empty) for all eighteen lectures. To add a lecture to these editions, write the three parents and the Version 7 Version 2 file, add its maps and derive edits, then run the builders listed below.

```sh
python3 ling285/authoring/notes_v7_module1.py
python3 ling285/authoring/module1_notes_derive.py
python3 -c "import sys; sys.path.insert(0,'ling285/authoring'); from pathlib import Path; R=Path('ling285').resolve(); import clear_editions, notes_v7_v2, notes_v8, notes_v8_1, notes_v8_2, notes_v9, notes_v9_1, notes_v9_2, notes_v9_3, notes_v9_4, notes_v10, notes_v10_1; [m.__dict__[f](R, R/'modern') for m,f in [(clear_editions,'build_clear_editions'),(notes_v7_v2,'build_notes_v7_v2'),(notes_v8,'build_notes_v8'),(notes_v8_1,'build_notes_v8_1'),(notes_v8_2,'build_notes_v8_2'),(notes_v9,'build_notes_v9'),(notes_v9_1,'build_notes_v9_1'),(notes_v9_2,'build_notes_v9_2'),(notes_v9_3,'build_notes_v9_3'),(notes_v9_4,'build_notes_v9_4'),(notes_v10,'build_notes_v10'),(notes_v10_1,'build_notes_v10_1')]]"
node --test ling285/tests/modern-content.test.cjs
```

The board report for this work is `authoring/module1/board-notes-editions.md`.

## Lecture 15 · Neural Networks

The 13-page `Ling285_F26_L15.pptx` is preserved exactly and included in Module II.
Every original page stays in order, including the opening title, pop-quiz prompt,
and heading-only exam-information page. Ten instructional pages have teaching
notes in the four existing editions. Source material includes weighted forward
propagation, target mismatch, backward gradients and dynamic programming, paired
training matrices, one full-batch PyTorch step, and hidden sigmoid activations.
No exam dates or policy details are invented from the heading-only page.

The ordinary PDF export drops two ink markings. Page 7 therefore uses a source
export that retains the PowerPoint’s own raster ink fallbacks at their original
positions. The original PPTX, ordinary PDF, extracted images, text and notes stay
available. Page 12 also provides all ten original sigmoid reveal states, exported
from the original shapes. These are static source-state exports, not a recording
of animation playback or replacement diagrams. All ten states were visually
reviewed and checked numerically against their native labels.

`authoring/lecture15_notes.py` and the four authored JSON files contain the notes.
`authoring/lecture15_practice.py` supplies both additional 50-question banks.
Recompute source arithmetic with `python ling285/authoring/verify_lecture15_math.py`.
The verification checks forward activations, softmax, all backward gradients and
updates, finite differences for the two marked weights, and all sigmoid states.
The uploaded tensor files named in the code are not supplied. The diagram’s
hand-selected bias-free parameters are distinguished from PyTorch’s defaults.

Run `node --test ling285/tests/lecture15.test.cjs ling285/tests/content.test.cjs
ling285/tests/transcripts-v4.test.cjs ling285/tests/practice-versions.test.cjs`
for original-source preservation, every page and teaching edition, existing/new
notes, both practice banks, exact five-way cumulative balance, review views,
expanded readers and mobile themes.

## Lectures 16 and 17

`Ling285_F26_L16.pptx` (16 pages) and `Ling285_F26_L17.pptx` (8 pages) are preserved exactly and included in Module II. Every original page stays in order, including title, pop-quiz, exam-information and closing prompt pages, which stay unpadded.

Lecture 16 repeats twelve Lecture 15 slides unchanged, matched by slide XML and rendered pixels. Those pages reuse the Lecture 15 teaching in every edition (`REUSE` in `authoring/lecture16_notes.py`, and `page|=lecture15:N` aliases in the bulleted editions). Page 8 differs from Lecture 15 page 7 only in XML serialization and, like it, uses the deck’s own raster ink fallbacks (`assets/slides/lecture16/008-ink.webp`). The three new instructional pages cover the 525-token F1–F2 vowel scatterplot, a 2,000-update full-batch training run of the bias-free linear network, and ten initializations that all finish at 44.95% training accuracy. Scatter and accuracy values were read from the native chart series. The slides themselves state that the curves are NumPy reference runs because PyTorch was unavailable, and the training-matrix pages label 110 rows while the scatterplot and runs use 525 tokens; both counts are kept as shown.

Lecture 17 traces neural networks from McCulloch and Pitts (1943) and the 1986 Parallel Distributed Processing volumes to Jordan’s 1985 recurrent network, LLMs and agentic systems, then teaches next-item prediction over any sequence of vectors and English phonotactics through next-letter guessing. Its static PDF export overlaps the page 5 reveals, so every click state of pages 4–7 is exported from the original shapes and timing (`authoring/render_weekly_stages.py`, 22 states) and attached as source-derived figures. These are static source-state exports, not recordings of animation playback.

The notes are in `authoring/lecture16_notes.py` and `authoring/lecture17_notes.py`. `authoring/build_weekly_teaching.py` writes the Version 1–4 teaching files from them using the Lecture 15 layout. The six bulleted editions are authored in `authoring/weekly_notes_editions.py`, which writes `authoring/transcripts-vN/lecture16.txt` and `lecture17.txt`. `authoring/lecture16_practice.py` and `authoring/lecture17_practice.py` supply both 50-question banks through `authoring/weekly_practice.py`.

```sh
python3 ling285/authoring/extract_sources.py --only lecture16
python3 ling285/authoring/extract_sources.py --only lecture17
OMP_THREAD_LIMIT=1 python3 ling285/authoring/inspect_embedded.py --only lecture16 lecture17
python3 ling285/authoring/refresh_inventory.py
python3 ling285/authoring/render_weekly_stages.py
python3 ling285/authoring/build_weekly_teaching.py 16 17
(cd ling285/authoring && python3 lecture16_practice.py && python3 lecture17_practice.py && python3 weekly_notes_editions.py)
python3 ling285/authoring/build_studio.py
python3 ling285/authoring/build_transcripts_v2.py
python3 ling285/authoring/build_transcripts_v3.py
python3 ling285/authoring/build_transcripts_v4.py
python3 ling285/authoring/build_transcripts_notes.py
python3 ling285/authoring/build_practice_v2.py
node --test ling285/tests/lectures16-17.test.cjs ling285/tests/content.test.cjs
```

Run the two extraction commands separately, because two LibreOffice conversions started at once can fail.


## Lecture 18 — Neuron, Neural Networks, LLMs and Agents

The eight original pages of `Ling285_F26_L18.pptx` join Module II in source order, with the preserved PowerPoint, PDF, speaker notes, original figures and 29 original click-state exports. The click states expose material obscured by the flattened modality examples. These are static exports of source shapes and timing, not recordings of native animation playback.

Every existing teaching edition covers the new lecture in its established style, including Versions 16 and 18 and Iskarous editions A/B/C (20/21/22). Version 23 retains its existing following-slide layout and reuses Version C. Earlier lecture content remains unchanged. Earlier classroom transcripts inform style only; no Lecture 18 classroom transcript was supplied. Source ambiguities and review limitations are documented in `authoring/lecture18-source-review.md`.

Both practice editions add a complete 50-question Lecture 18 quiz, with 25 multiple-choice and 25 written questions and distinct saved IDs. The current Module II test remains 100 questions, equally split by format, sampled across all eight available lectures. Existing attempts remain available; a new full attempt includes the added lecture. Four guide entries and four selected core pages extend the review tools.

Rebuild using `build_weekly_teaching.py 18`, `lecture18_practice.py`, `refresh_inventory.py`, `build_studio.py`, the v2/v3/v4 transcript builders, `build_transcripts_notes.py`, `build_transcripts_iskarous.py`, and `build_practice_v2.py`. `tests/lecture18.test.cjs` checks source order, all editions, complete banks and preservation against the pre-addition Git baseline. Raw board objections and final reviews remain in the Lecture 18 authoring reports.
