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
- Exam 1 retains its original question scope; Module 2 has a separate 25-question short-term memory practice test and retry queue.

The 100-question set covers Chapters 1, 3, 4, and 11 and the five assigned articles. Its topic allocation and sampling weights come from the supplied exam guide and six example questions. `exam_model.py` contains the study-priority model; `model-report.json` records its output. This is not a validated forecast of unseen professor questions or a model trained on USC exam archives.

The `index.html` can also be downloaded and opened in a browser; study text and figures are embedded. Videos require the adjacent `media/labs` files or the hosted app. Study progress is stored in that browser. Research figure and video provenance is recorded in `media/labs/sources.json`.

## Growing Module 2 workspace

Module 2 includes a lecture-based study guide, core review, experiments, combined notes, current practice test, lecture quizzes, missed-question queue, and source coverage. It currently covers only the supplied Short-Term Memory lecture. Original note and read-progress keys remain intact.

When new lectures are supplied, add their sections with stable IDs and update `module2-data.js`: extend `modules`, add topic/experiment groups with an explicit `module` and source `pages`, and replace `questions` with the revised cumulative bank. Increase `revision` and update the Module 2 script version queries in both HTML entry points, retain IDs for unchanged questions, and assign new IDs to changed questions. Retired questions are removed from the active bank and retry queue on load. Do not automatically generate coverage for lectures that have not been supplied. The site does not ingest new lectures automatically.

Run `node --test tests/*.test.cjs` after updating coverage.

The current Module 2 question edition reflects the reported Exam 1 style: 8 researcher-linked interpretations, 7 experiment-design items, 6 applications, and 4 concise concept distinctions. Explanations address distractors as well as the correct answer. `python3 module2-practice-model.py --output module2-practice-report.json` reproduces the source and format audit; it does not estimate instructor question probabilities. Changed questions receive new IDs so old responses are not assigned to different questions.

Lecture 09 · Short-Term Memory appears under Module 2 → Individual collections, below the workspace tools. Core review uses an explicit 20-section selection in `module2-data.js` → `coreReview`; guide inclusion or a practice question does not automatically earn a marker. The remaining 26 lecture sections provide supporting explanations; the same markers appear in notes, combined notes, source review, and visual/transcript views. Core review also has a continuous expanded viewer using the original personal-note and read-progress keys. Supply `lectureNumbers` entries for future lectures.
