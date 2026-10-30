# PSYC301 Study Studio

Open the study app: https://jordanxxlopez.github.io/COGNITIVEPROCESSES/

- Module 2 is the current second-half workspace, starting with the existing 46-section Short-Term Memory collection.
- Module 1 groups completed Exam 1 collections and study tools in a collapsed sidebar archive. Existing notes and progress retain their original storage keys.
- Full teaching notes and original visuals.
- Original/Version B/Version C/Version D/Version E dropdown in collections 01–07: 246 fuller teaching scripts checked against slide text and figure labels. Notes, read checkmarks, and the current slide are shared between versions. Selections are saved per collection.
- Version E explains slide terminology and the actual course examples in complete teaching scripts, including the messages and actions in listening experiments. Red “Must know · core review” markers now identify 158 guide- and quiz-based priorities across collections 01–08. Scripts and reproducible ranking details are in `version-e/`.
- Version D follows the actual slide wording and order across all 246 sections, with short clarifications of the course concepts and examples. Full scripts are in `version-d/`.
- Version C provides 246 complete teaching scripts, combining definitions, examples, and figure explanations without stacking the original text above them. Full scripts are recorded in `version-c/`.
- Version B additions are recorded by original source page in `version-b/`; the original explanations are retained in the app.
- Roomy autosaved personal notes for each content section, shared across views.
- A red Must know · core review workspace: every flagged section across collections 01–08, with E explanations, concise article/lab notes, original visuals, search, and a continuous expanded viewer. All original flags are retained and explicit study-guide coverage is audited.
- An Experiments to know workspace guide: 67 lecture experiments, demonstrations, and case studies with 153 original slide references and an expanded transcript view.
- Collection 08 uses 21 attributed original research figures and two verified supplementary research videos; other topics have no verified original video.
- A comprehensive What to know by the end guide: 45 topics, readiness checks, and linked topic practice.
- A 100-question combined practice exam, plus 60- and 65-question options.
- Separate 25–30-question lecture quizzes.
- 208 questions with answer explanations, source links, and retry queues.
- Exam 1 retains its original question scope; Module 2 has a separate balanced 100-question cumulative test and retry queue for Short-Term Memory, Working Memory, and Problem Solving and Reasoning.

The 100-question set covers Chapters 1, 3, 4, and 11 and the five assigned articles. Its topic allocation and sampling weights come from the supplied exam guide and six example questions. `exam_model.py` contains the study-priority model; `model-report.json` records its output. This is not a validated forecast of unseen professor questions or a model trained on USC exam archives.

The `index.html` can also be downloaded and opened in a browser; study text and figures are embedded. Videos require the adjacent `media/labs` files or the hosted app. Study progress is stored in that browser. Research figure and video provenance is recorded in `media/labs/sources.json`.

## Growing Module 2 workspace

Module 2 includes a lecture-based study guide, core review, experiments, combined notes, current practice test, lecture quizzes, missed-question queue, and source coverage. It covers collection 09 · Short-Term Memory, collection 10 · Working Memory, collection 11 · Problem Solving and Reasoning, collection 12 · Problem Solving and Reasoning · Part II, and collection 13 · Judgment, Decision Making, and Reasoning. Every collection retains all original pages in order, including its title. Original note and read-progress keys remain intact.

When new lectures are supplied, add their sections with stable IDs and update `module2-data.js`: extend `modules` and `collections`, add topic/experiment groups with an explicit `module` and source `pages`, and append source-based questions to the lecture pools. Keep existing question IDs and contents intact. Increase `revision` and update the Module 2 script version queries in both HTML entry points, retain IDs for unchanged questions, and assign new IDs to changed questions. Retire a question only when its contents actually change; otherwise preserve it and its retry history. Topic `progressKey` values keep guide checkboxes stable across coverage revisions. Do not automatically generate coverage for lectures that have not been supplied. The site does not ingest new lectures automatically.

Run `node --test tests/*.test.cjs` after updating coverage.

The current Module 2 pools contain 50 questions per supplied lecture. The original 25 Short-Term Memory questions remain unchanged, with 25 added items; Working Memory and Problem Solving and Reasoning each add 50. The 100-question current test draws equal quotas from all current lectures. With an uneven division, extra questions are assigned to randomly selected lectures (three lectures give 34/33/33); quiz order and validated nonrepeating answer positions are then shuffled. Publishing additional lectures requires enough source-based questions in every pool to meet the new quotas. Lecture quizzes contain up to 50 questions, while the quick cumulative set balances 10 questions across lectures. The question edition includes researcher-linked interpretations, experiment-design items, applications, and concise concept distinctions. Explanations address distractors as well as the correct answer. `python3 module2-practice-model.py --output module2-practice-report.json` reproduces the source and format audit; it does not estimate instructor question probabilities. Changed questions receive new IDs so old responses are not assigned to different questions.

Lecture 09 · Short-Term Memory appears under Module 2 → Individual collections, below the workspace tools. Core review uses an explicit 20-section selection in `module2-data.js` → `coreReview`; guide inclusion or a practice question does not automatically earn a marker. The remaining 26 Short-Term Memory sections provide supporting explanations; the same markers appear in notes, combined notes, source review, and visual/transcript views. Core review also has a continuous expanded viewer using the original personal-note and read-progress keys. Supply `lectureNumbers` entries for future lectures.

Working Memory adds 14 explicitly selected core-review slides and five experiment groups. Both core review and experiments have continuous expanded visual/transcript readers, with original lecture note/read keys. `sources/PSYCH301_L12_Working_Memory_F26_2.pdf` is the unchanged uploaded PDF; `media/working-memory/source.json` records its checksum and page-render provenance. Keep the adjacent Module 2 scripts, `media`, and `sources` directories when running a local copy. The balanced allocation is a coverage rule, not a prediction of the instructor’s exam distribution.

Short-Term Memory Version 2 is stored separately in `short-term-memory-v2.js`. Its 46 source-aligned sections add fuller teaching explanations while the original embedded `bullets` remain unchanged. The collection dropdown defaults to Version 2 until a choice is saved, and the selected edition also appears in combined notes, the current guide, core review, experiments, source popups, and their expanded readers. Both editions share the same personal-note and read keys; question pools and cumulative quotas are unchanged.

## Study timer in expanded readers

PSYC301, LING285, LING406, and BME423 keep the study timer available beside the
reader controls in **Expand visual + transcript**. The dropdown offers 30, 60,
and 90 minutes. Opening, navigating, resizing text, and closing the reader keep
the same countdown; Start/Pause, Reset, and each course's existing Break action
remain available. `reader-timer.js` moves the existing timer without replacing
its handlers, and `reader-timer.css` styles it only inside the expanded reader.

Verify the four-course interaction with:

```sh
node --test tests/expanded-reader-timer.test.cjs
```

## Collection 11 · Problem Solving and Reasoning

The unchanged uploaded `CogPsych_Ch12_1 F26.pdf` is stored at
`sources/CogPsych_Ch12_1_F26.pdf`. All 22 original pages are rendered under
`media/problem-solving/`. The title page remains available as an original page,
with 21 instructional sections following the actual source order. Their expanded
teaching paragraphs explain the lecture’s terminology, puzzle materials, legal
moves, experimental procedures, warmth results and representations directly.
Visual-only tile-puzzle, search-tree and Tower of Hanoi pages have individual
explanations. The chapter title is retained without inventing formal reasoning
material absent from this supplied Part 1 lecture.

Four study-guide groups, 16 selected core sections, seven experiment/demonstration
groups and 50 source-linked questions extend all current workspace tools. The
150-question Module 2 bank supplies the same 100-question current test with
33/33/34 lecture quotas; the lecture receiving the extra question varies between
attempts. Ten-question cumulative sets use 3/3/4, while lecture quizzes retain
50 questions. No existing question or notes ID is replaced. Both index and share
entry points use the same new collection and preserve their earlier content.

`authoring/psyc301/build_problem_solving.py` reproducibly appends only this new
collection, groups and questions. `authoring/psyc301/problem-solving-source.json`
records the source checksum and extracted page text. The new tests preserve the
entire earlier embedded course data, current earlier lecture/question contents,
notes and progress; validate every new source anchor; check puzzle arithmetic;
sample repeated balanced tests with nonrepeating adjacent answer positions; and
exercise notes, quizzes, source links, expanded readers and both color modes.

## Every source slide remains in individual collections

`collection-slides.js` restores missing original pages in source order before
the workspace is rendered. Title, divider, and logistical pages retain their
original visuals with empty transcripts. It adds 13 previously omitted pages
across the PSYC301 collections, including each opening title and Working
Memory’s mental-rotation divider. Existing section objects, teaching editions,
source images, quizzes, guide/core selections and page-based notes/read keys
remain unchanged. The same rule covers the main and shared entry points.
The complete collections now contain 47 Short-Term Memory slides, 22 Working
Memory slides, and 22 Problem Solving and Reasoning slides.

## Switch between course studios

The **Course** dropdown in each sidebar links PSYC301, BME423, LING406, and
LING285. The existing independent apps, course colors, content, progress and
storage keys are retained. `course-switcher.js` resolves links relative to its
own URL, so the same navigation works at the deployed repository prefix or on
a local server. It also appears on the PSYC301 shared entry point. The LING285
route and material stay LING285, while its separately requested LING258 browser
tab title remains unchanged. The switcher does not move or overwrite study data.

PSYC301 transcript editions retain their existing content while replacing
source narration such as “the lecture gives” with direct teaching statements.
The sentence-level edit record is in
`authoring/psyc301/direct-teaching-wording-changes.json`. It covers the original
embedded editions, the separate Short-Term Memory Version 2, the current
Working Memory/Problem Solving notes and their authoring text. Other-course
transcripts, original slides, quizzes and saved progress are unchanged.

## Collection 12 · Problem Solving and Reasoning · Part II

All 24 pages of the supplied `CogPsych_Ch12_2 F26.pdf` appear in the individual
collection in source order. The first title slide has no transcript. The other
23 slides have expanded direct teaching paragraphs, including the visual-only
checkerboard, fortress/radiation mapping, and physics sorting examples. The
source PDF remains unchanged at `sources/CogPsych_Ch12_2_F26.pdf`, with page
renders in `media/problem-solving-part2/` and source provenance in
`authoring/psyc301/problem-solving-part2-source.json`.

Five guide groups, 17 selected core sections, six experiment/demonstration groups
and 50 new source-linked questions extend the existing workspace. The cumulative
100-question test now draws 25 questions from each of four collections. The
10-question quick set uses 2–3 per collection with a randomly assigned remainder;
lecture quizzes keep 50 questions. Earlier question IDs, transcripts, notes,
read marks, course switching, appearance controls and answer-order validation
are preserved. No unseen exam distribution is claimed.

Rebuild this addition with
`python authoring/psyc301/build_problem_solving_part2.py`, reproduce the source
and question-bank audit with
`python module2-practice-model.py --output module2-practice-report.json`, and run
`node --test tests/*.test.cjs`. The Part II tests check the unchanged earlier
coverage, all source pages and transcript text, every new question anchor,
important source comparisons, exact four-way quotas, grading/source links,
review readers, saved notes, both entry points and mobile color modes.


## Collection 13 · Judgment, Decision Making, and Reasoning

All 33 original pages of `CogPsych_Ch13_1 F26.pdf` appear in order. The title has
no transcript, and all 32 instructional pages have expanded, slide-specific
teaching paragraphs. Notes teach the actual tasks and graph relationships,
including paired death judgments, nested Linda categories, sample-size effects,
Johnny’s tradeoff-by-outcome pattern, material versus symbolic offers, and the
energy-program approval/anticipated-anger results. Historical task statistics
are retained as course material, not updated population estimates. The unchanged
PDF is at `sources/CogPsych_Ch13_1_F26.pdf`; original page renders and extraction
provenance are in `media/judgment/` and `authoring/psyc301/judgment-source.json`.

Seven guide groups, 24 selected core-review pages, ten experiment/demonstration
groups, and 50 new source-linked questions extend every current review tool.
The current pool is 250 questions across five collections. The 100-question test
draws 20 per collection; the quick set draws two per collection; each lecture
quiz remains 50. Answer choices still pass the nonrepeating adjacent-letter
validator before display. Existing content, source/page keys, versions, saved
progress, themes, and other courses remain unchanged.

Rebuild content with `python authoring/psyc301/build_judgment.py`, audit with
`python module2-practice-model.py --output module2-practice-report.json`, and
verify with `node --test tests/*.test.cjs`. The judgment tests verify exact
preservation of the earlier bank, all source assets and page anchors, the
instructional graph comparisons, balanced tests, answer grading, shared notes
across readers, both entry points, and responsive light/dark expanded views.

## PSYC301 Module II · Version 6 teaching

`psyc301-v6-data.js` and `psyc301-v6.js` add **Version 6 · natural teaching**
only to current collections 09–13. The Exam 1 archive receives no new edition.
The five collections retain all 148 original source pages in their existing
order. Individually authored explanations cover 141 instructional pages. Titles,
the mental-rotation divider and the link-only Clive Wearing video-reference page
remain visible without invented teaching prose. Earlier scripts are unchanged,
including the original explanation on that video-reference page.

The additional edition teaches source concepts in connected sentences intended
for reading aloud. It explains necessary terminology, participants' tasks,
conditions, mechanisms and findings. Important contrasts and experimental values
remain, while incidental graph measurements and repeated visual descriptions
are omitted. The source slides retain all of their original detail. Scientific
qualifications present in the source remain part of the explanation rather than
becoming generic closing caveats. There is no presentation narration, look-ahead
framing or added course material.

The existing collection and reader dropdowns retain their previous choices and
add the new option. Working Memory and the three later lectures also gain an
Original/Version 6 dropdown. Choosing the edition preserves the current page,
personal notes and read keys. Existing defaults and saved choices are unchanged.
The selected collection's text also follows its source into current review
views, search, source popups and read-aloud. Synthetic review readers continue
using original lecture/page note keys. Question banks, balance, answer order,
grading, timers, palettes and all other courses remain unchanged.

Source arithmetic and quantitative relationships render through the existing
local KaTeX distribution. The new stylesheet affects only equations inside V6
prose. Authored spoken equivalents prevent mathematical source code or duplicate
accessibility text from being read aloud. No styles or scripts for earlier
explanation bodies are replaced.

Authored page text, source extraction/checksums, a preservation snapshot and the
coverage report are under `authoring/psyc301/version6/`. Rebuild with
`python authoring/psyc301/version6/build.py`. Verify source coverage and bounded
changes with `python authoring/psyc301/version6/verify.py`, then run
`node --test tests/psyc301-v6.test.cjs` for both entry points, every source page,
version switching, notes/progress, source math/speech, archive preservation,
current quiz balance and responsive readers.

## Shared vivid gradients

`studio-gradients.css` strengthens each course's existing palette across page
backgrounds, navigation, home cards, section headings and reader controls in
light and dark mode. PSYC301 and its share page retain violet/blue/teal, BME423
blue/green, LING406 green/blue, and LING285 burgundy/rose. The overlay changes only
screen backgrounds and navigation text contrast. Original stylesheets, source
visuals, transcript reading surfaces, mathematical steps, feedback colors and
print styles remain unchanged. No animation is added. LING406 precaches the new
stylesheet for offline use.

Run `node --test tests/studio-gradients.test.cjs tests/course-switcher.test.cjs`
for exact entry-page/content preservation, both themes, UI contrast, desktop and
mobile layouts, expanded readers, print rendering and saved cross-course notes.

## PSYC301 Module II Version 10 · teaching notes

Collections 09–13 add **Version 10 · teaching notes** to the existing explanation
dropdown. All 148 Module II source pages stay in source order. The 141
instructional pages are written as Study Studio notes, with bolded main bullets of
connected read-aloud sentences and nested sub-bullets for mechanisms, experiment
setups, observations and interpretation, and the values in instructional figures.
Explanations are direct, without added caveats, presentation narration, arrow
chains or outside material. Title, divider and video-link pages stay empty.

`psyc301-v10.js` wraps the Version 6 controls, so earlier editions, defaults and
saved choices are unchanged. Version 10 appears only when chosen. Its text follows
the existing readers, search, source popups and read-aloud, and it uses the same
note and read keys. Equations render with the local KaTeX copy.

Authored text, the builder and coverage are under `authoring/psyc301/version10/`.
Rebuild with `python authoring/psyc301/version10/build.py`. Verify with
`python authoring/psyc301/version10/verify.py` and
`node --test tests/psyc301-v10.test.cjs`.
