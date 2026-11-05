# Lecture 18 practice authoring — Ada/Flint scope

## Goal and evidence

Add the required full lecture bank to both existing practice editions without changing earlier questions or saved IDs. The existing Exam 1 evidence model was consulted, especially its observed interpretation, comparison, cause/effect and directional-prediction forms. MCQs remain the requested study adaptation, not a claim about the instructor's actual exam format.

The Nov. 3 transcript in `Downloads/LING285-11-17 transcript.pdf` was extracted to `/private/tmp/l18-instructor-transcript.txt`. Relevant passages about the single-neuron inner product, decision vectors, time variation, successive transformations, sequence context and agent critique were read. They motivate short intuitive prompts and explanations that connect one mechanism to the next. No Lecture 18 recording or transcript was available or invented. The second similarly named download has a different hash and is not represented here as reviewed.

All practice is grounded in Lecture 18's own slides and speaker notes. Original native slide text was extracted; rendered source pages 2–7 were directly inspected at 1600px for these question sources. Source-state animation review belongs to the independent source agent. No practice question depends on unseen animation motion.

## Files and reproducibility

Run `python3 ling285/authoring/lecture18_practice.py` to write:

- `module2-lecture18-practice.json` — original bank edition.
- `practice-v2-lecture18.json` — exam-style bank edition with separate prompts and IDs.

Each contains exactly 25 A–D MCQs and 25 written prompts, all explicitly owned by `lecture18` and linked to its original source page. Every MCQ has four distinct options with feedback for each; every written question has an answer and at least two rubric checks. The correct option is shuffled through the existing deterministic weekly writer. Existing earlier banks are untouched.

`lecture18-practice-guide.json` supplies four selected core-review pages and four guide groups for the integration owner to merge. Core review is selective, omitting title/project-only pages and choosing the heads, dynamical-system, multimodal sequence and prediction comparisons.

## Substantive choices

The new material receives focused questions about parallel heads versus successive layers, combining head contributions, reuse of updated position in the oscillator, directional change in position and velocity, recurrent feedback and depth as the comparison to time. These do not require arithmetic. A negative velocity change is distinguished from a necessarily negative final velocity.

The rest reinforces the same Lecture 18 examples through scalar/vector output, agent roles, inference versus learning, different sequence representations, sounds versus letters, onset/coda order, syllable boundaries and constrained next-letter predictions. Each of the 25 concepts has one MCQ and one written prompt; that cross-format reinforcement is deliberate rather than 50 claimed independent concepts.

The protein missing residue is not tested because the concept is representation of amino acids, not memorizing a residue. The source agent clarified that the N beside the protein is the N-terminus, not its missing item. The visibly printed `ra_` is used rather than the speaker-note `fa_`; the source discrepancy remains disclosed by the source review. Questions use the visible constrained/unconstrained contrast, without treating the source's terse phonotactic examples as a universal exhaustive grammar.

No completed project or measured learning result is claimed for the final classroom activity. No extra project question is added merely to fill the bank.

## Validation and disposition

Programmatic checks pass for two 50-question banks, the 25/25 split, unique IDs within and across editions, explicit lecture ownership, page links within 2–7, four-option MCQs and all option feedback. Root owns cumulative-test rebalancing and integration checks. This authoring review is not an independent scientific approval; Vera/Sage/Gideon/Rook and Cato must review their own scopes before delivery.

## Independent source-review corrections

Vera/Sage found four Version2 written prompts whose shared model answers were incomplete for the altered prompt. These objections were preserved in `lecture18-board-vera-sage.md`. The generator was corrected and both banks regenerated: item003 now names all five graph nodes before describing the loop; item019 explicitly identifies amino acids; item024 explicitly names skr_ as more constrained than ra_; item025 explicitly connects successful guesses to English sound/spelling constraints. Independent source recheck was requested. No old question IDs changed.

## Integration recheck — duplicate prompts

The cumulative Version2 builder caught identical prompts between Lecture18's MCQ and written variants. These were introduced by selecting the MCQ alternate stem for the written question. The generator now uses the independently authored written prompt for written questions in both editions. This preserves every preexisting Lecture11–17 question and ID, and retains each Lecture18 question's ID and answer. A complete case-folded prompt scan of all400 Version2 questions now reports no duplicates. The25MCQ stems differ between practice editions; the written stems are shared across editions with distinct IDs, matching their common source task and answer. Source reviewer recheck of final practice files requested.
