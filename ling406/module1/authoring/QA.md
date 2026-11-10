# Independent teaching QA

This review checks the authored teaching against the supplied course material
and the writing contract in `STYLE.md`. It is separate from the authors' source
audits and the browser/interface checks. It does not claim that unavailable
recordings, animations or prior chat transcripts were reviewed.

## Review performed

- Read every authored teaching row in Lectures 1–2, 3, 4, 5, 6, 7, 8 and 9, plus
  all independently authored Midterm 1 review rows. Read the multiple-choice
  answer keys and explanations and the written-answer keys for all nine
  collections. This covers 251 independently authored rows and 43 mapped
  review rows, totaling 294 source pages, 90 MCQs and 18 written prompts.
- Compared all 43 review mappings against the corresponding lecture-page text.
  Each pair has closely matching normalized source text. Reviewed the original
  review-only Balota–Lorch abstract and pronunciation table visually.
- Independently inspected full source visuals for the articulator diagrams,
  F1/F2 distributions and Praat display in Lectures 1–2, the phrase and agreement
  examples in Lecture 3, the WORK letter-activation and distributed canary
  diagrams in Lecture 4, the PET task contrasts in Lecture 5, the TOT result,
  segment-error pairs, production stages and blend examples in Lecture 7, the
  positional tree in Lecture 8, and the timing and result diagrams in Lecture 9.
- Scanned all available authored rows for forbidden punctuation, `need not`,
  evaluative `lawful`, common presentation narration and stock concluding
  limitation phrases. No matches remained in all nine completed JSON files.
  All question keys point to valid choices, and each question has four distinct
  answer choices.

## Scientific distinctions checked

- Phones, phonemes and allophones remain distinct. Aspiration and release
  notation is preserved. The vowel plot has F1 horizontally and F2 vertically.
- Main and embedded subject–verb agreement is explained without repeating the
  source's misleading single-clause descriptions.
- Jackson's lesion argument is preserved. The Dronkers finding is specific to
  the studied cases and speech apraxia, rather than a universal replacement of
  Broca's area by the insula as the location of speech.
- The letter-activation graph supports K in WORK. Teaching corrects the source
  prose's R/K mismatch while retaining the original image.
- Elman's letter-sequence axis is not described as training time. The
  statistical grammaticality demonstration is not described as a direct
  demonstration of human acquisition.
- Intended and produced speech-error forms remain distinct. Ambiguous examples
  such as ad hoc/odd hack and the hot-yoga remark retain source-specific
  uncertainty rather than an invented unique diagnosis.
- BRING after contracted did receives the base form bring. Teaching corrects
  the source's description of it as present tense. The TOT experiment's
  first-syllable primes produce about 50 percent resolution, while the
  unrelated condition produces about one-quarter, matching the displayed bars.
- The frequency–length confound, semantic-context comparison and repetition
  comparison remain distinct. The nonsignificant gaze-to-speech-lag result is
  not treated as proof of absent phonological processing.
- New items arrive in cycle 5. Both naming conditions slow, but the semantic
  blocking difference remains. The gaze-duration and lag intervals match the
  original timing diagram.
- The review's mediated-priming task distinction and table values are accurate.
  Overall pronunciation means are 549, 558, 577 and 575 ms for directly
  related, mediated, neutral and unrelated primes. The mediated advantages are
  19 and 17 ms against the two controls.
- The review's ten-question, open-book exam description is explicitly tied to
  the supplied Midterm 1 review, rather than presented as current exam policy.

## Corrections identified during QA

- The v20 compiler previously discarded a meaningful visual addition when its
  D addition was empty. The compiler now retains a visual-only fallback.
- Lecture 3 page 16 labels three modifiers as PPs in the source, but the third
  is an adjective phrase headed by unrelated with a to-PP complement. A
  correction to authored teaching is confirmed in the final JSON.
- Added fuller visible articulator mappings on Lectures 1–2 pages 13–14.
  Only the left drawing on page 14 is a nasal example. The other visible
  constrictions involve the lips/teeth and tongue/teeth. Confirmed in final JSON.
- Removed decorative or generic C3 commentary from several Lecture 5 pages and
  a source-narration phrase. Removed an author-instruction sentence from
  Lecture 9 and added selective bold consistently across Lectures 8–9.
- Lecture 7 page 9 repeated the source's incorrect claim that swapping entire
  f and gr clusters would yield gish frotto. Teaching now correctly explains
  that a whole-cluster transfer would move g and r together, while the observed
  frish gotto moves only r. The source image remains unchanged. Page 11 now
  describes phonological encoding as one process rather than inferring a
  standalone encoding level from the source's line breaks.

All requested corrections were inspected after the authors applied them. No
unresolved blocking factual or writing issue was found in the reviewed text.

## Source integrity and scope

The source PDFs themselves contain some cropped content, especially Lecture
1–2, the right edge of Lecture 6 page 12, and the overlapping supplementary
reading on Lecture 4 page 47. Those originals are preserved. Teaching does not
present invented missing wording or labels as recovered source content. The
full authored text review is broader than this independent visual sample. The
authors' audits record their own complete contact-sheet and extracted-text
review. Browser layout, asset loading, saved progress and deployment require
their separate application checks.
