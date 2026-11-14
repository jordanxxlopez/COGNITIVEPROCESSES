# LING406 modern versions · board report

## 2026-11-14 · repair of the published packs

**Goal (Margaret).** Make the six modern versions (V20, V21, V22, Notes 9.3, Notes 10.1, Simpler) show their
notes in Modules I, II and III, as asked on 2026-11-13, without changing any older version.

**What was wrong.** Commit 1ebc2bb shipped packs built at 12:58, before the notes were finished (15:58).
Modules I and III had 0 pages with notes in every version, and Module II had 19 of 284. The notes in
`text/` were complete. The test "every pack covers every page" would have failed, so the tests were not run
before that push.

**Fixed.**
- Rebuilt every pack from `text/`. Pages with notes per version are now 250 of 294 (Module I),
  265 of 284 (Module II) and 175 of 185 (Module III). The rest are title, agenda, reading and divider pages,
  which stay empty by rule.
- Cache versions bumped (`wire.py` V to `modern-2`, pack revisions to `-2`) so browsers drop the empty packs.
- `tests/modern-versions.test.cjs` "older versions are unchanged" now ignores `ling406/modern/` itself. It was
  written before the modern files were committed and failed on any later rebuild.
- Version 22, speech perception page 15 now names Liberman and colleagues (1957), which the slide cites.
  The other 12 Version 22 pages that match Version 21 were checked by hand. Their years are decades, blog
  dates or image credits, not dated studies, so matching Version 21 is correct there (BRIEF rule).
- Module III review page 30 in Notes 9.3, Notes 10.1 and Simpler now states the slide's dichotomy
  (Wernicke's aphasia and the lexicon, Broca's aphasia and grammar), which those three versions left out.

**Checked.**
- Checker: 135 of 135 files pass, 0 errors. 49 warnings, all "long sentence" (26 to 30 words, under the
  30-word limit).
- Every page's notes match their own slide (vocabulary overlap against all pages of the module). No notes
  sit on the wrong page or collection, and no collection was overwritten by another.
- **Module III "overwritten review files" (commit 1ebc2bb message).** No authoring note about this existed.
  All five `text/m3/*/review.txt` files have 52 lines, match their own pages and pass the checker, so
  nothing overwritten survives in the published text.
- Module I has no `lecture02` or `lecture10` by design. Lectures 1 and 2 share one deck (`lecture01`), and
  Lecture 10 is the Midterm 1 review (`review`).
- Browser (local server): Modernize turns on in Modules I, II and III and Simpler notes render beside the
  slides.
- Tests: `node --test ling406/modern/tests/` passes 6 of 6.

**Vera · source differs from the accepted facts (left as the source says, flagged to Jordan).**
- Module I lecture 4 page 24: the slide dates the Interactive Activation model "Rumelhart and McClelland
  1986". It is usually dated McClelland and Rumelhart (1981), and later pages of the same notes say 1981.
- Module III review page 30: the slide gives "colorless green ideas" as Chomsky 1955. It is usually cited
  from Syntactic Structures (1957). The 1955 manuscript does predate it.
- Module II speech perception page 25: Eimas and colleagues (1971) also tested one-month-olds. The notes
  mention only four-month-olds. This is an omission, not an error.

**Unresolved, for Jordan.**
- The Interactive Activation date (above). The slide's wording is kept until Jordan decides.

**Cato.** No member was overridden and nothing was softened. The date conflict is Jordan's to decide, so the
board did not decide it.

## 2026-11-14 · stock caveats and long sentences (Jordan said go ahead)

**Goal (Margaret).** Remove stock caveats the slides never make, teach directly where the slide does make the
point, and split the 49 long sentences, without losing anything the slides teach. Writer agents edited
(Module III, Modules I and II, no shared files). Board agents reviewed every changed page against its slide.
Their objections went back to the writers until none were left.

**Writer pass.**
- Module III, 98 edits. 55 hedges removed (for example "does not prove that language never matters",
  "every possible experience was removed"). 42 rewritten as direct teaching where the slide teaches the
  point (graded processing behind a step-like choice, deafness and not signing tied to peripheral
  attention, similar architecture with different origins). About 30 lines kept as real facts.
- Modules I and II. 2 hedges removed, 7 rewritten as direct teaching, about 20 kept as real facts
  ("embarazado" means pregnant, graphology's meaning, the merged vowel pair). 47 long sentences split into
  shorter so/because sentences.

**Board round 1, Modules I and II (5 objections, all fixed).**
- Simpler review p47 gave a false cause for why frequent words are shorter (Vera). Now "Matching applies
  only to the chosen words."
- Simpler review p25 repeated itself and dropped the pronunciation evidence. Now it ends on that evidence.
- Notes 9.3 review p31 lost its closing So sentence.
- Notes 10.1 speech1 p32 was split when it didn't need to be. Restored, because it is under the 30-word cap.
- Notes 10.1 l2-sensitive p6 had unnatural word order for the correlation definition.

**Board round 1, Module III (10 objections, all fixed).**
- 7 fixes were taken as suggested.
- 3 were adapted by the writer to drop wording the slide does not support ("not from a missing rule
  system", "rather than as a whole word", "outlier in how fast decoding develops").
- The chair caught one more: modalities p16 in Notes 10.1 repeated "fingers take in letters one at a time".
  The page now ends "because the fingers take in the letters in sequence".

**Result.**
- 65 caveat sentences went down to 15. The board checked every remaining one as a real fact or as a limit the
  slide itself teaches (Genie "we can't know", the failed simulation's ambiguity).
- All 135 files pass the checker. One long-sentence warning is left by board choice (Notes 10.1 speech1 p32,
  26 words, under the 30-word cap).
- Packs rebuilt with the same page counts. 6 of 6 tests pass. The browser shows the new text.
- Change logs: changes-m3.md and changes-m12.md (scratchpad of the 2026-11-14 session).

**Cato.** Every objection was either fixed or adapted with a stated reason, and none was dropped. The
writers' doubtful calls were each ruled on by the board.

**Sign-off (Margaret).** Approved. Ready to commit when Jordan says so.

**Sign-off (Margaret).** Approved for commit when Jordan says so.
