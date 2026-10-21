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

Module 2 includes a lecture-based study guide, core review, experiments, combined notes, current practice test, lecture quizzes, missed-question queue, and source coverage. It covers collection 09 · Short-Term Memory, collection 10 · Working Memory, and collection 11 · Problem Solving and Reasoning. The latter preserves all 22 original PDF pages and provides 20 instructional slide transcripts. Original note and read-progress keys remain intact.

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
