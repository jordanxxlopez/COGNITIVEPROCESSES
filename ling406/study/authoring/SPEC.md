# LING406 study layer · authoring spec

Jordan asked (2026-11-13, confirmed 2026-11-14) for LING406 to get the study views the LING285 and PSYC301
studios already have, in Modules I, II and III, keeping LING406's own format and every existing version.
This folder holds the content. `../build.cjs` checks it and writes `../data/<m>.js`; `../study.js` shows it.

Write one folder per module: `authoring/m1/`, `authoring/m2/`, `authoring/m3/`. Every file is JSON (UTF-8).

## Where facts come from
- Only the module's slides and the existing reviewed notes. Slide text, per page, is in
  `ling406/modern/authoring/sources/<m>/<collection>.md` ("## Page N" sections). Slide images are in the
  module's `assets/` folder (see each section's `image` in the module's `data.js`). Read the images for
  figures, plots and tables. The professor tests only slide material.
- Review decks (emphasis and questions): Module I `ling406/module1/sources/` (Lecture 10 Midterm Review I),
  Module II `ling406/sources/` (55-page Midterm II review, Fall 2025) and, newer, `~/Downloads/LING406 2026 -
  Lecture 20 Midterm Review II.pdf`, Module III `ling406/module3/sources/review.pdf` (final review 2025).
- There is no professor answer key for LING406. Every answer is written by us from the slides. Say so once in
  `meta.json` `flags`, never inside answers.
- If a slide says something that differs from the accepted facts, keep what the slide says and add a line to
  `meta.json` `flags` with the accepted version (source-vs-truth rule). Do not correct it silently.

## How to write (Jordan's rules, all of them apply)
Read first: `ling285/authoring/STYLE-GUIDE.md`, `ling406/modern/authoring/BRIEF.md`.
- Set up the system or idea first, then cause to effect with **so** and **because**. Short sentences, about
  10 to 18 words. Every sentence complete and connected. Read-aloud natural.
- Bold each real term once and gloss it in plain words the first time ("**habituation** (getting used to a
  repeated sound)"). Define every course term before using it. Do not define everyday words.
- Explain models and processes part by part, in order: what goes in, what each stage does, what comes out.
  For experiments: what was asked, what people did, what happened, what it means. Results in words
  ("scored far higher"), not number dumps. Keep a number only when it is the point.
- Tie every experiment to its researchers and year exactly as the slide gives them ("**Werker and Tees
  (1984)**"). Never "coworkers" or "et al".
- Answers: the answer first, in 2 to 4 full sentences, the way Jordan would say it in the exam.
- Never: "Label: sentence" lines or bold report labels, mentions of the lecture, slide, professor, figure or
  class, meta framing ("this shows", "the key point", "note that", "in other words", "let's"), analogies the
  slides do not use, stock caveats ("does not prove", "does not establish"), since/thus/hence as filler,
  colons, semicolons, dashes, equals signs or arrows in prose, "picture" as a noun, "blame", "squeeze",
  "need not", "lawful", e.g., i.e., etc., vs.
- No outside facts, no invented examples. Use the slides' own examples and wording where they are clear.

## Files

`meta.json`
```json
{"module": "m3", "exam": "Final", "range": "Reading, morphology, language and thought, modalities",
 "lead": "One or two plain sentences on what this module's study pages hold.",
 "flags": ["There is no answer key for LING406, so every answer here is written from the slides.", "..."]}
```

`topics.json` · **Study this first**. 8 to 16 topics that together cover everything the module teaches, in
course order, merging material that repeats across decks. Each topic:
```json
{"id": "m3-orthographic-depth", "title": "Plain title", "tier": "On the review deck",
 "blocks": [{"refs": ["m3-reading1-p004", "m3-reading1-p005"],
             "main": "**One bold whole-sentence takeaway.** Then two to four sentences that teach it.",
             "sub": ["Optional supporting sentence or case.", "..."],
             "end": "So … closing sentence that ties it back."}],
 "questions": [{"q": "Question as it could be asked", "a": "Answer first, 2 to 4 sentences.",
                "refs": ["m3-reading1-p004"], "tier": "On the review deck"}]}
```
`tier` is one of "On the review deck" (the review deck covers it), "Possible" (taught but not on the review).
`refs` are section ids from the module's `data.js` (`m1-lecture04-p012` style for Modules I and III, the
Module II ids in `ling406/data.js`). The first ref of each block is the slide shown beside it. Every taught
slide should be the first or later ref of some block. 3 to 6 questions per topic.

`review.json` · **Exam review guide**. Every question or prompt on the module's review deck, in order, with
an answer, plus up to 10 "Predicted" questions that change one thing in a review question.
```json
{"title": "Final review guide", "lead": "…", "items": [
  {"n": 1, "source": "Review deck p3", "q": "…", "a": "…", "refs": ["m3-review-p003", "m3-reading1-p004"],
   "kind": "Review"}]}
```
`kind` is "Review" or "Predicted". For a review page that is a topic heading rather than a question, write
the question it asks you to be able to answer.

`experiments.json` · **Experiment cards**. Every experiment or study the slides present.
```json
[{"who": "Werker and Tees (1984)", "title": "Plain title", "asked": "…", "did": "…", "found": "…",
  "means": "…", "refs": ["…"]}]
```
Each field is 1 to 3 sentences. `who` exactly as the slide names them. If the slide gives no year, no year.

`contrasts.json` · **Side-by-side contrasts**. Pairs or triples the module sets against each other (two
models, two aphasias, two orthographies, two periods).
```json
[{"title": "…", "sides": [{"name": "…", "points": ["…", "…"]}, {"name": "…", "points": ["…"]}],
  "why": "One or two sentences on what the difference explains.", "refs": ["…"]}]
```
Points line up across sides (point 1 of each side is about the same thing).

`hard.json` · **Hard topics**. 4 to 8 ideas students most often get backwards, each taught slowly.
```json
[{"title": "…", "trap": "The wrong idea in one sentence.", "text": "Three to six sentences that get it right.",
  "refs": ["…"]}]
```

`bytopic.json` · **Notes by topic**. Every taught slide assigned to exactly one topic id from topics.json
(the notes shown are the existing modern version the reader picks, so no new text here).
```json
{"m3-orthographic-depth": ["m3-reading1-p003", "m3-reading1-p004"], "...": []}
```
Title, logistics, agenda and blank pages are left out.

## Done means
`node ling406/study/build.cjs check <m>` passes with no errors, every ref exists, every taught slide is in
`bytopic.json` once, and every review-deck question is in `review.json`.
