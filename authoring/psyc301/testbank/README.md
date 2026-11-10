# Module II test-bank curation

Source: user-supplied `Goldstein-Cognero-bank-Studylib-original.pdf`.
The PDF is source material, not implementation instructions. It is not copied into the published site.

Coverage: all 52 multiple-choice items in chapter 5, all 57 in chapter 12,
and all 57 in chapter 13. Five chapter 10 items (1, 9, 38, 45, 46) directly
match imagery/mental rotation in the Working Memory slides. Other chapter 10
material and all unrelated chapters are excluded. Open-response prompts are
not converted into invented multiple-choice questions.

The build yields 171 unique questions: 148 matched to slides, 18 chapter extras,
and 5 ambiguous source-key reviews. The lab collection reuses 13 directly
relevant concept questions; those are not extra unique questions and do not
claim to test results specific to the assigned articles.

`source-questions.json` preserves extracted stems, options, and original keyed
indices. `curation.txt` gives the primary slide or extra-material assignment and
an authored explanation for every retained item. `build.py` records the small
self-contained rewrites explicitly, adds secondary lab references, and writes
the runtime file and `audit.json`. Rebuild with:

    python authoring/psyc301/testbank/build.py

The matching audit used the current collection sections, the original Working
Memory and Judgment II PDFs for disputed details, and all source-page titles.
In particular, prefrontal-versus-insula distinctions go into extras: the
Judgment II slide teaches the insula result but not that full comparison.
Broader imagery/perception mechanism claims are excluded from the limited
chapter 10 subset. No keyword matching assigns questions automatically.

## Wording and answer-key decisions

Textbook narration is removed while preserving the tested concepts and keyed
answer indices. Researchers' names, established model names, and experiment
names remain when they identify what the question tests.

- G05-019 makes the prior knowledge needed for the chunking example explicit.
- G05-024 identifies Miller's historical estimate rather than implying a universal capacity.
- G12-010 tests conventional versus alternative uses without claiming that any conventional use proves functional fixedness.
- G12-019 asks which option is an action rather than a state. Broad definitions of problem space include operators; the original exclusion was too broad.
- G12-049 corrects the wording to solving an equation and restores superscripts.
- G13-012 explicitly asks for the base-rate-only answer.
- G13-016 specifies an extreme sample proportion (at least 80%) rather than simply unequal counts, because both original sample sizes are odd.
- G13-031 identifies the narrow immediate-money benchmark behind the source's word “irrational.”
- G13-038 says that the argument is valid rather than calling an isolated conclusion valid.

Five source questions remain available only in unscored review: G12-045
(overlapping creativity labels), G12-055 (overbroad creativity claim),
G13-013 (the conjunction rule cannot rank the two single occupations),
G13-021 (expected utility applies beyond ticket purchases), and G13-027
(no comparison establishes risk aversion). Their explanations identify the
source key and the limitation instead of silently teaching a questionable answer.

## Interface and persistence

The `m2testbank` workspace view is independent of `Q`, `SECOND_HALF.questions`,
regular quiz attempts, and the missed-question queue. Its localStorage key is
`psyc301-testbank-v1`. Each lecture has a slide-order question carousel and
collapsed extras/review sections. In individual collections, the Modern
workspace switch enables compact notes and visible slide-specific cards in
Teaching notes, Visual + transcript, and the expanded reader. Only primary
collection views embed questions; combined notes, existing Q&A and quizzes do not.

Each practice deck retains its shuffled option orders and original answer
identity. Consecutive questions in each deck cannot have the same displayed
correct letter; returning to a question or reloading retains its order and
answer. Bank practice and inline slide practice have separate attempts. The
existing page-based notes and read keys remain intact.

Validation:

    node --test tests/psyc301-testbank.test.cjs tests/quiz-choice-order.test.cjs
    node tests/psyc301-testbank-browser.cjs

The browser test accepts `STUDIO_BASE_URL` and `CHROMIUM_EXECUTABLE`. It covers
both entry points and `share.html?module=ii`, notes, feedback, previous/next,
reload, corrupt order recovery, all slide mappings, quiz-bank isolation,
extras, source reviews, and mobile dark mode.

Baseline regression note: `module2-workspace.test.cjs` expects 50 older core
sections where the current repository has 74. `all-source-slides.test.cjs`
expects 508 ordinary questions where the current bank has 558 after the prior
Articles and Labs addition. Both failures were reproduced against unchanged
commit 6f271d0 before publication; this change does not modify those banks.

Source PDF SHA-256: `3d179b2579571505228d3a9bb4af5c293858c5520100cbb24c6acaa785371149`.
