# LING406 · Psycholinguistics Study Studio

Open: https://jordanxxlopez.github.io/COGNITIVEPROCESSES/ling406/

A separate Midterm 2 workspace modeled on the PSYC301 interface. PSYC301, its notes/progress keys, and BME423 are unchanged.

- Nine lecture collections, with 229 individually authored slide explanations and their original source visuals.
- A persistent **Transcript** dropdown offers **Version 1 · original** and **Version 2 · slide-aligned teaching**. The original scripts are unchanged. Version 2 is the default when no preference has been saved: all 229 scripts have five or six connected paragraphs, using slide terminology and examples with fuller explanations. Word-by-word sentence demonstrations have distinct explanations.
- A 28-topic end-of-review guide, 131-slide core review, 37 experiment/demonstration groups, combined notes, and a 55-page supplied-review viewer.
- Continuous visual/transcript readers for full lectures, all experiments, all core slides, and the review. Expanded mode centers the transcript on the left and the slide on the right against a dark surround; it includes bounded previous/next navigation, a slide selector, recall cover, read-aloud, font controls, and source enlargement/PDF links.
- Personal notes start as one line, grow with input, and permit manual vertical resizing. Notes and read marks use the original lecture section ID across collection, combined, core, experiment, and review views.
- 180 original multiple-choice questions: twenty per lecture. Applications, experiment design, interpretation, predictions, and competing explanations supplement concept distinctions. All 540 distractors are individually refined to use competing course interpretations rather than unrelated filler. Eighteen written prompts have covered, multipart model answers.
- A 100-question cumulative practice test, 50/10-question mixed sets, topic practice, and a persistent missed/uncertain queue. Every quiz uses the same validated choice-order engine.
- Separate LING406 local storage (`ling406-study-studio-v1`), saved quiz order and answers, light/dark squares below the collections, collapsible navigation, a study timer, search, printing, and notes/progress export.
- The green-to-blue gradient applies to the page, navigation, hero, and dark reader surround. Long expanded transcripts keep the original slide visible alongside the scrolling explanation on desktop.
- A service worker caches the text/app shell after the first successful visit and caches visited visuals and PDFs. Unvisited visuals/PDFs still need a connection; progress storage is browser-local.

## Sources and editions

All thirteen uploaded files are retained in `sources/`; `source-manifest.json` records original filenames, page counts and SHA-256 hashes. Nine lecture decks contain 229 pages. The 55-page Midterm 2 review is labeled **Fall 2025**; the syllabus is **Fall 2026**. This distinction is visible in Sources & coverage. The review is a study-emphasis source rather than a confirmed current exam blueprint. All uploaded lecture topics remain included, including L1 material not separately emphasized by that older review.

The two Lecture 14 notes PDFs are teaching-style references, not additional duplicate lecture collections. The scanned syllabus is transcribed through OCR in `authoring/syllabus-ocr.txt`; the original PDF remains available. Assignment instructions inside course documents are treated as source content. This app provides study material, not completed course assignments.

Version 2 adds the newly supplied Lecture 11, 12, and 13 notes as reference PDFs. The Lecture 11 and 12 files both discuss Speech Perception II despite differing labels; mappings follow their contents. `version2/reference-manifest.json` records all five unique reference files and hashes. `version2/coverage.json` maps every V2 script to its original lecture page, records reference-note use, and pins the original V1 hash. `transcripts-v2-data.js` is additive; canonical `data.js`, `teaching-notes.json`, question banks and grading remain unchanged.

The selected transcript version applies to individual collections, combined notes, core review, experiment groups, the end-of-review guide, the supplied-review viewer, search and read-aloud. The dropdown is also available inside both reader modes. Switching versions retains the current reader slide, personal notes, read marks, recall cover and quiz state. Original notes retain their existing browser keys.

Some source slides are placeholders for videos/audio. The app retains those original pages and explains the stated procedure; it does not invent playable recordings or claim that the PDF contains a recovered video. No generated replacement figures are used. Figures are page renders of the supplied PDFs.

First-midterm files and later reading, morphology/language-and-thought, modalities and final-review lectures were not supplied. The archive is therefore a completed-module placeholder, rather than invented first-midterm content.

## Coverage and question ordering

`coverage-report.json` records all source hashes, current counts and test allocations. The cumulative set reserves six questions for each lecture and allocates its remaining 46 questions proportionally to lecture representation in the supplied review, using largest-remainder rounding. Each lecture's allocated questions are selected randomly without replacement and then mixed. This is an auditable coverage rule, not a calibrated predictive model of unseen exam questions.

`quiz-engine.js` shuffles choices with Fisher–Yates, rejects a candidate choice arrangement if its correct index matches the previous question, and reshuffles. `validateAnswerKey` checks every adjacent pair in the completed key, validates each permutation, and rejects invalid arrangements before use. The same validation also runs before a quiz is rendered or resumed. Correct choices and saved responses are stored by their canonical option indices, so grading and explanations remain synchronized with the displayed permutation. No fixed A/B/C/D cycle is used.

## Rebuild and verify

```sh
python ling406/authoring/teaching_notes.py
python ling406/authoring/question_bank.py
python ling406/authoring/refine_distractors.py
python ling406/authoring/render_sources.py
python ling406/authoring/build_studio.py
python ling406/version2/author_transcripts.py
python ling406/version3/build_transcripts.py
python ling406/version4/build_transcripts.py
node --test ling406/tests/quiz-engine.test.cjs
python ling406/tests/verify_coverage.py
python ling406/tests/verify_v2.py
python ling406/tests/verify_v3.py
python ling406/tests/verify_v4.py
# With the repository root served at http://localhost:8907:
node ling406/tests/studio.cjs
node ling406/tests/transcripts-v2.cjs
node ling406/tests/transcripts-v3.cjs
node ling406/tests/transcripts-v4.cjs
```

The content checks verify all source page/hash references, unique per-slide scripts, question counts and sources, review/group links, core flags and allocations. Engine checks include deliberately invalid arrangements, 500 randomized full-bank arrangements, all four answer positions, canonical grading identity, and correct options outside the original first position. Browser checks cover every collection, all workspace routes, complete reader queues and endpoints, shared/autogrowing notes, read marks, persistence, answer feedback and retry behavior, every source/slide asset, dialogs, light/dark mobile containment, and the offline text shell. Browser screenshots were visually reviewed. The original repository files are checked against a pre-task hash snapshot when available.

## Version 3 and review collection

The third edition is separately authored in `version3/*.py` and compiled by
`version3/build_transcripts.py` into `transcripts-v3-data.js`. It covers all 229
lecture pages and all 55 original review pages. Explanations follow the content
of each page, with complete teaching sentences in bullets and nested bullets.
Title, reading-reminder and links-only pages retain their original visuals and
personal notes without invented teaching paragraphs. Prose length follows the
amount of instructional content, rather than a fixed paragraph quota.

Collection 10 contains the Fall 2025 Midterm II review. Its images, PDF page links,
and extracted slide text come from the review PDF itself. A matched lecture's
script is reused only where the review page contains that material. Review page
54 has its own explanation, distinguishing the sound overlap of English speaker
and Russian spichki from a relationship between the meanings of the objects.
`version3/coverage.json` records every page, source hash, author file and review
mapping. The original PDFs and rendered slides remain unchanged.

The dropdown offers Versions 1, 2 and 3 in the collection, workspace and reader
views. New users begin in Version 3, while existing users keep their saved
selection. Review notes and read marks share the existing matching-lecture keys.
Quiz identifiers, allocations, answer ordering and saved answers are unchanged.

The earlier editions remain available. Their only prose changes replace the
user-rejected wording listed in `editorial/direct_wording.py`.
`editorial/wording-changes.json` pins the baseline commit and before/after hashes.
The tests compare those files against exactly those replacements and verify the
remaining source files and other studios against the preserved baseline.

Version 3 checks reject colons, semicolons, the rejected wording, and common
presentation-framing phrases in teaching prose. Browser checks compare all 284
rendered page entries with the authored scripts, verify the full review queue,
shared notes, three-edition switching, selected-version speech/search/guide,
saved quiz preservation, desktop/mobile layouts and offline switching.

## Version 4 source wording

Version 4 keeps the slide-specific Version 3 explanations and incorporates more
of each slide's wording within its existing paragraphs. The authored revisions
in `version4/*.txt` pair each replacement with its source phrase. The builder
checks those phrases against the extracted slide text, with explicit visual
anchors for material that appears only in instructional graphics. The review
uses the revised script for matching content and retains its separate page-54
explanation. The six single-word incremental sentence pages already contain the
source word and retain their existing explanations. Seven explicitly authored
clarifications expand abrupt sentences within their existing paragraphs.

`version4/build_transcripts.py` rejects any page whose visible word count or
character count falls below Version 3, including within each paragraph. It also checks source-phrase inclusion,
bold markup and the existing direct-teaching style constraints. The results
for every page are recorded in `version4/coverage.json`. Title and reading-only
pages stay empty of invented teaching prose. This edition has 30,273 teaching
words across the same 284 lecture/review page entries.

Versions 1, 2 and 3 remain unchanged. Saved edition preferences, slide notes,
read marks and quiz answers keep their existing browser keys. The fourth
edition is offered in the existing topbar and both readers, and is the default
only when there is no saved edition preference. Its text also feeds the guide,
combined notes, core review, experiments, search and read-aloud features.

## Version 5 · clear teaching

The existing selector now also offers Version 5 across all ten Module II
collections. Every one of the 229 lecture pages and 55 review pages remains in
source order. The 265 instructional entries have page-specific authored rewrites
in `version5/*.txt`. Sentences explain technical terms where they occur and
separate experimental tasks, conditions, observations and interpretations without
presentation narration. Titles, reading reminders and other noninstructional
pages retain empty scripts. This edition contains over 34,000 teaching words.

The review retains its own original visuals and page links. Matching material
uses the corresponding V5 lecture explanation. Review page 54 has its own
explanation of the sound overlap between speaker and spichki and the distinction
between word forms and meanings. The supplied guidelines shape the teaching
content inside the existing interface rather than introducing a new note layout.

All earlier editions remain available and byte-for-byte unchanged. Existing
saved edition choices are retained; V5 is the default only without a saved choice.
Notes, read marks, source/page IDs, question banks, answer order, grading, timers,
colors and layout remain intact. The selected text also feeds existing search,
guide, core review, experiments, combined notes and read-aloud behavior.

Source equations in transitional probability render with the existing local
KaTeX distribution. Formant labels use rendered subscripts in V5. Read-aloud
uses authored spoken equivalents for equations, and the updated offline shell
includes the new data, renderer and font assets.

Rebuild with `python ling406/version5/build_transcripts.py`. Verify with
`python ling406/tests/verify_v5.py` and `node ling406/tests/transcripts-v5.cjs`
while the repository is served at `http://localhost:8907/`. The coverage file
records each page's author file, role and size; `version5/preserved.json` pins
all pre-existing LING406 source, edition, question and palette files.
