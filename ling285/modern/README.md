# LING285 modern workspace

The modern studio lives at `ling285/modern/`. The original studio stays at
`ling285/`, with a boxed link to this edition. Only that entry link and its
isolated stylesheet were added to the original page. Original course data,
runtime, question banks and transcript editions remain byte-for-byte intact.

The organization follows the modern PSYC301 workspace. The fifth teaching
choice follows PSYC301 Version 20's complete parent paragraphs and supporting
sentences. All explanations and questions use LING285 material. The other four
choices provide newly written professor, focused B, natural C and C-with-following-
slides presentations. Title and logistical pages remain in source order without
invented teaching. Repeated source demonstrations are grouped in Q&A with every
covered page linked.

The authoring modules correspond to the workspace sections. Build them with:

```sh
python3 ling285/authoring/build_modern.py
```

The builder needs Python, NumPy, scikit-learn and python-pptx. Its inputs include
the existing page extraction and media inventories, the supplied exam files,
source decks, and short retained transcript evidence. The private raw transcript
is not required for a reproducible rebuild and is not redistributed. The current
module has 131 source pages, 400 quiz questions and 244 distinct writing prompts.
Both modules together retain 286 numbered source pages.

`model-report.json` records three executed evidence-ranking methods, the 66
observed exam/review prompts, retained transcript cues and 500 seeded weight
sensitivity runs. Scores order study priorities. They are not calibrated exam
probabilities, and no unseen Exam 2 outcomes were available for validation.
Supplied review prompts are distinguished from authored answers and generated
changed cases. The answer companion's authorship is unverified; primary sources
govern when it conflicts with a source deck.

College, Simple and Original wording controls appear in quizzes and practice
tests. The MCQs have separately authored College and Simple stems and an
individual explanation for each option. A written prompt that is already precise
retains that wording in College; Simple replaces technical wording where useful
without adding generic scenario framing. Wording changes preserve question IDs,
answer options, selection order and saved responses. Q&A uses reading disclosures.
Writing practice separately offers complete answers and optional saved responses.

Modern practice uses its own storage namespace. Notes and read marks share the
original source-page keys and merge only those edited fields into the original
workspace. Existing practice results are not migrated into the new question bank.
Written quiz selections are frozen in `modern-written-selection.json`; semantic
question identities do not depend on ranking or array position.

Run the content contracts and browser workflow checks with:

```sh
node --test ling285/tests/modern-content.test.cjs
python3 ling285/tests/modern_smoke.py
```

The browser check needs Python Playwright and Chromium, and runs its own temporary
local server. It exercises the entry switch, reading sections, all five editions,
notes, the 100-question test, all eight 50-question quizzes, wording state,
writing responses, review queue, backup and mobile containment. Uploaded source
hashes, source identities and original edition hashes have separate contracts.

The broader historical `*.test.cjs` suite has 18 existing failures at baseline
`2068f4c`, including historical lecture counts, edition lists and release hashes.
The same 18 failures were reproduced in an untouched detached worktree. This
change adds six passing content contracts and no new failures to that suite.
See `validation.json` for the comparison and `section-review.json` for the
section-by-section review.
