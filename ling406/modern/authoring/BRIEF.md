# Writing brief: modern versions for the LING406 Study Studio

You are writing study notes for one collection (one slide deck) of LING406 Psycholinguistics.
Jordan studies from these notes for exams. Each slide gets its own notes, shown beside the slide.
The notes come in several versions. Each version is a different way of writing the SAME facts.
You do not copy wording from another course. You apply each version's way of writing to this deck.

## Where things are
- Your source: `ling406/modern/authoring/sources/<module>/<collection>.md`. For every page it gives the
  original slide text and existing reviewed notes for that slide. Read the whole file before writing.
- If a slide is mostly a figure and the text does not make it clear, open the slide image listed for the page.
- You write: `ling406/modern/authoring/text/<module>/<version>/<collection>.txt` (create folders as needed).
- You check each file with (run from the repo root):
  `node ling406/modern/authoring/build.cjs check <module> <version> <collection> --warn`
  It must end in PASS. Fix every ERROR. Read the warnings and fix the ones that are real problems.
- Do not edit any other file. Do not run git. Do not run `build.cjs build`.

## File format
One line per page, every page of the deck, in order:

    page|main bullet >> sub-bullet >> sub-bullet || next main bullet >> sub-bullet

- ` || ` separates main bullets. ` >> ` separates a main bullet from each of its sub-bullets.
- `**bold**` is the only markup. No other markdown, no line breaks inside a page.
- Pages marked EMPTY in the source get exactly `page|` with nothing after it.
- Every other page must have notes, even when the slide is only a figure or one question.

## Facts (most important)
- Every fact must come from the original slide text or the existing reviewed notes in your source file
  (or what is plainly visible on the slide image). Do not add studies, numbers, examples or claims from
  your own knowledge. If the source does not say it, the notes do not say it.
- Keep every idea, term, example, experiment and result the slide teaches. Versions differ in wording
  and depth, never in which facts are true.
- When a slide asks a question, answer it, using what the deck itself gives (the same page, a later
  page, or the existing notes). Do not leave a slide question hanging. If the deck never answers it,
  teach what the question is getting at with the deck's own facts.
- Experiments are what gets tested. For each one say who ran it (and the year in the versions that allow
  years), what people did, what was compared, what happened, and what it means, in that order, in plain sentences.
- If you think the slide or the existing notes state something that is wrong, still write what the
  source says, and list the spot in your final report under "Possible source errors".
- Linguistic examples stay exactly as the source gives them (words, sentences, /b/ and [b] symbols, IPA).

## Rules for every version (the checker enforces most of these)
1. Never mention the slide, lecture, class, course, professor, figure or graph as a thing ("the slide shows",
   "in lecture", "the graph"). Just teach the content. Say what the result is, not that a graph shows it.
2. No "Label: sentence" lines and no bold labels such as **Setup**, **Result**, **Example**, **Answer**.
3. No colons, semicolons, dashes used as punctuation, equals signs, arrows or multiplication signs in the
   prose. A hyphen inside a word (second-language) is fine. Write "is", "so", "leads to" in words.
4. No meta phrases: this shows, shows that, illustrates, demonstrates, note that, notice that, remember that,
   the key point, takeaway, in other words, basically, simply put, let's, we now, moving on, e.g., i.e., etc, vs.
5. No formal filler: thus, hence, whereby, mediated, downstream. No "need not". Never "coworkers" or "et al".
   Write "Werker and colleagues" or list the names the source gives.
6. No analogies or comparisons of your own. Only examples the source itself uses.
7. No homemade stand-ins for real terms. Use the real term (categorical perception, voice onset time,
   lexical access), bold it the first time on the page, and explain it right there in plain words.
8. "Picture" only as a verb meaning imagine, or for a real picture used in an experiment (picture naming).
   Never "the bigger picture", "the overall picture".
9. Full sentences. No telegraphic fragments ("Two groups. One task.").
10. Spell out each cause and effect with "so" or "because". Do not skip the middle step.
11. Bold the terms and the result words that matter. Reading only the bold should give the main points.
    Do not bold whole paragraphs (except the one bold main sentence in Notes 10.1).

## The versions

### Version 20 · natural teaching transcript (`v20`, Module II only)
Reads like a teacher talking a student through the slide in connected sentences.
- 2 to 4 main bullets. Each main bullet is 2 to 5 connected sentences. Each sub-bullet is 1 to 3 sentences.
- Every page has at least one sub-bullet. No sentence under 5 words.
- Keeps the important numbers, years and researcher names from the slide.
- A slide question may be kept as a bold question and then answered in the next sentence.
- Roughly 130 to 240 words per page. Fullest of the three "Version" styles.
- Model: "**Sanfey and colleagues (2003)** used the **ultimatum game**, which has two players, a **proposer**
  and a **responder**. The proposer gets ten dollars and makes an offer about how the money should be split."
  sub-bullet: "The proposer decides the split, but the responder decides whether anyone gets paid."

### Version 21 · natural teaching notes with following slides (`v21`)
The short version. The slide stays pinned beside the notes, so the notes say what matters in few words.
- About 70 to 130 words per page (hard limit 190). 2 or 3 main bullets, each with 0 to 2 sub-bullets.
- NO numbers and NO years. No percentages, no decimals, no 3-digit numbers. State findings as patterns in
  words ("about half", "far more often", "by the end of the first year"). Small counts in words are fine
  ("two groups"). Researcher names are fine, without the year.
- Connected sentences, not stacked short ones. Sentences must average at least 8 words; none under 5 words.
- A slide question is answered in the prose, without repeating it as a bold question.
- Model: "**Sanfey and colleagues** used the **ultimatum game**, in which a proposer gets ten dollars and offers
  the responder some way to split it." sub-bullet: "A rejection costs both players."

### Version 22 · natural teaching notes with researchers and years (`v22`)
Version 21's notes, with every experiment tied to its researchers and year.
- Start from your Version 21 text for the page. Wherever the source attributes a study, finding, model or
  theory to named people, write "**Name and colleagues (year)**" or "**Name and Name (year)**" exactly as the
  source gives the names and year, and teach the design, result and meaning in direct connection to that name.
- A year appears ONLY in parentheses right after researcher names. Still no other numbers (same limits as 21).
- When the source gives no researcher or no year, add none. Then the page may match Version 21.
- Where Version 21 was vague because it could not name the year ("a later study"), make it specific here.
- Model: "**Sanfey and colleagues (2003)** used the **ultimatum game**, in which a proposer gets ten dollars…"

### Notes 9.3 · clearest slide-by-slide notes (`n93`)
One clear explanation per slide, in short separate sentences.
- Set up the thing first (what it is or does, as the subject with an active verb), then what happens case by
  case, then the general rule, then a closing "So…" or "That is why…" sentence.
- One idea per sentence, about 10 to 18 words. Never join three clauses with ", and". Split them.
  Hard limit 30 words per sentence.
- Each case gets its own sentence in the same pattern ("For **English listeners**, … For **Hindi listeners**, …").
- Main bullets with sub-bullets for the why and the cases. About 100 to 200 words per page (hard limit 330).
- Numbers only when they matter for understanding. Researcher and year kept when the source gives them.
- Model: "**Perturbation theory** predicts how a small change in one location affects how something vibrates."
  "**For Mode 4**, the piece is moving, so the extra mass **lowers** the frequency. The piece is barely
  stretched, so the extra stiffness does nothing."

### Notes 10.1 · bold main idea first (`n101`)
Built so the main idea is impossible to miss.
- The first main bullet OPENS with one whole sentence in bold that states the page's main idea, ending with
  the period inside the bold: `**Infants can tell apart sounds that adults in their language cannot.**`
  More plain sentences may follow it in the same bullet.
- Then short sub-bullets, one fact or step each. Short sentences are welcome here.
- Use the correct technical term and gloss it once in parentheses, for example "**voice onset time**
  (the delay between releasing the consonant and the start of voicing)".
- Parallel wording across items that answer the same question. About 80 to 170 words (hard limit 260).
- Every page has sub-bullets.
- Model: "**Two masses have two modes, and Mode 2 is faster because more springs are stretching.** In Mode 1,
  the masses move together…"

### Simpler · answer first, one step per sentence (`simple`)
The plainest version. Written the way Jordan would say it out loud on the exam.
- Say what literally happens. Everyday verbs (figuring out, makes it go up, harder to tell apart).
  Not "yields", "sets", "follows from", "carries".
- Start with a direct plain sentence that states the page's point (or answers the slide's question, repeating
  the question's words). Then give the reason beginning "This is because…", one step per sentence, with no
  step skipped. Tie it back at the end ("Since …, …" is fine here).
- Keep every key term, bold, and explain it in parentheses right there, for example "**formants**
  (frequency regions with strong acoustic energy)".
- Clear up the confusion a reader would likely have (which group, which sound, which condition).
- When the idea is about amounts or direction, give the small concrete case the source uses.
- Separate main bullet for each part of a multi-part idea. About 100 to 220 words (hard limit 330).
  Hard limit 30 words per sentence.
- Model: "All three modes have lower frequencies when mass 1 becomes heavier. This is because when a mass
  becomes heavier, it is harder to move, so the system vibrates more slowly. Since mass 1 moves in every
  mode, all three modes slow down, and their frequencies decrease."

## The versions must really differ
Do not paste one version into another with small edits (except 22, which starts from 21). 9.3, 10.1 and
Simpler each need their own structure as described: 9.3 is case-by-case short sentences, 10.1 leads with one
bold whole sentence and short sub-bullets, Simpler is answer first then "This is because".

## Clarifications (from the pilot run)
- Sentence limits the checker enforces: Versions 20 to 22, no sentence under 5 words or over 40 words.
  Notes 9.3 and Simpler, none under 4 or over 30. Notes 10.1, none over 30.
- Length targets are targets. Never cut a fact the slide teaches to hit one. A dense page may run long,
  up to the hard limit. In Versions 21 and 22 a dense page may lean on the pinned slide for long lists of
  example sentences (quote the ones that carry the point, exactly).
- Example numbering such as (1a) is not part of the example. Leave it out.
- A researcher's year counts as given by the source when it is in the slide text, in the existing notes, or
  visible on the slide image, including shorthand such as "JN89" for Johnson and Newport (1989).
- In Versions 21 and 22 write ages, counts and durations in words or as a pattern ("about age eight",
  "from early childhood to adulthood"). No digits at all except years in parentheses in Version 22.
- A statistic that needs a sign is written in words with the value ("a correlation of −0.23"), in the
  versions that allow numbers.
- "Mediated priming" is a real term and is allowed. "Mediated" on its own is still banned.
- When the slide's own word would be a banned bold label (conclusions, results), use it unbolded in a sentence.
- The checker also rejects these anywhere in a sentence: "the hypothesis is/was", "the conclusion is/was",
  "the explanation is/was", "the procedure was", "the setup was" (write "Lenneberg hypothesized that…",
  "They concluded that…"), and the words blame, turns to, lawful, this topic, the next step, fares worse, squeeze.
- Notes 10.1: the page's very first characters are `**`, and the opening bold sentence has no other bold
  inside it. Keep glosses short so the sentence stays under 30 words, or put the gloss in its own sentence.
- A quoted example sentence counts as one word toward sentence length, so examples never have to be shortened.
- A slide item that is only a reminder with no content (a note to tell a story that the deck never tells)
  is skipped.
- Finished model files to see the format and the level of each version (a different deck, do not reuse
  its sentences): `ling406/modern/authoring/text/m2/<version>/l2-sensitive.txt`.

## Before you finish
- Every file ends in PASS from the checker.
- After all files PASS, do a separate fact pass: reread at least 6 pages of each version against the source,
  including every experiment page. Fix anything not supported by the source, then re-run the checker.
- Final report (short): files written, PASS lines, anything you could not resolve, and "Possible source
  errors" (page, what the source says, why it looks wrong). No other text.
