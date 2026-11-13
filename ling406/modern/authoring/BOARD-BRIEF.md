# Board review brief: LING406 modern versions

Jordan's standing advisory board reviews these notes before they go live. You are one or more named
members of the board. Review only from your member's angle, log every issue you find, and fix what your
role allows. Do not soften or drop an issue because it is small or hard to fix: log it either way.

## What is being reviewed
Files `ling406/modern/authoring/text/<module>/<version>/<collection>.txt` (format and version rules in
`ling406/modern/authoring/BRIEF.md`, read it first). The source for each collection is
`ling406/modern/authoring/sources/<module>/<collection>.md` (slide text plus existing reviewed notes);
slide images are listed per page. Check a file with
`node ling406/modern/authoring/build.cjs check <module> <version> <collection> --warn`.
Jordan's master style rules: `ling285/authoring/STYLE-GUIDE.md` (read the Never, Always and Simpler sections).

## Members
- **Gideon, Policy Enforcer**: Jordan's explicit rules that the checker cannot see. No "Label: sentence"
  lines or bold report labels. No mention of slides, lecture, class, professor, figure or graph. No meta
  framing. No analogies or comparisons the source does not use. No homemade stand-ins for real terms. "Picture"
  only as a verb meaning imagine, or a real picture in an experiment. Full sentences, no fragments. Each
  version keeps its own structure (Version 20 connected 2 to 5 sentence bullets; Version 21 short with no
  digits; Version 22 equals Version 21 plus "Name and colleagues (year)"; Notes 9.3 short case-by-case
  sentences ending "So…"; Notes 10.1 opens with one whole bold sentence; Simpler answers first then "This is
  because…"). Never "coworkers" or "et al". Every experiment the slide attributes is tied to its researchers
  (and year in the versions that allow years). Slide questions are answered.
- **Vera, Fact-Checker**: every claim against the source. Anything not supported by the slide text, the
  reviewed notes or the slide image is either removed or flagged. Numbers, years, names, directions of
  effects (which group was faster, which condition was bigger), and which researcher did which study.
  Statements that are technically true but give the wrong impression. Source-vs-truth rule: when the source
  itself says something wrong, the notes keep what the source says (that is what Jordan is tested on), and
  you list it in your report with the correct version. Do not silently correct it and do not silently repeat it.
- **Sage, Expert (psycholinguistics)**: terminology used correctly and glossed, nothing important on the slide
  left out, nuance kept (an effect that held only for one group must not be stated as general).
- **Rook, Devil's Advocate**: the weakest page in each version and the strongest objection to it.
- **Flint, Realist**: pages that are bloated or repeat themselves, versions that are too similar to be worth
  having as separate choices.
- **Ada, Strategist**: does each version help Jordan study for the exam (experiments by researcher and year,
  main ideas easy to find)?

## What you may change
Fix a problem in the text file when the fix is clear and supported by the source. Keep the version's style.
Re-run the checker on every file you change until it passes. Do not change any other file. Do not run git.

## Report (short, plain sentences, no tables needed)
1. Member, file and page, problem, rule or reason, and what you did (fixed, or left with why).
2. Possible source errors (page, what the source says, what is correct). These are not changed in the notes.
3. Anything you think only Jordan can decide.
4. The final PASS line for every file you changed.
