# Writing brief (experiment cards and hard topics)

Voice reference: `../v3/style-sample-v20.txt` (Version 20 teaching transcripts) and `../../../../psyc301-contrasts-v3-data.js` (finished "Written like the Version 20 transcripts" contrasts; read ~6 entries). Natural connected teaching paragraphs, selective **bold** on key terms, researcher names, years and key findings, and after a paragraph 1 to 2 short child lines (one sentence each) that compress its takeaway. No labels or lead-ins ("What was manipulated:", "How they differ", "Example", "Watch out"). Do not just delete a label and leave a fragment: write full sentences with subjects and verbs, not telegraphic notes or reference-sheet lists.

Output block format: {"text": "...", "children": ["...", "..."]}. Children are optional but use them where they help.

## Rules for both tasks
- Use ONLY information in your input bundle (card fields, Q&A answers, existing explainers) and, for lecture 15, the collection text in psyc301-c15-data.js (grep it by researcher name). Do not invent examples, studies, numbers, researchers, years or outside facts. Reorganize, simplify and rephrase freely.
- Keep exact names of concepts, effects, theories, experiments and terms as they appear in the sources. Never rename or add alternative terminology.
- Name the researcher and year in the sentence whenever a study is described (e.g. Sperling (1960)); 'and colleagues', never 'coworkers'. Keep important numerical results (only the ones worth remembering, like 3.3 of 4 letters, 82 percent).
- No em dashes (use commas or periods). No phrases such as 'this lecture', 'covered here', 'the slides', 'the material', 'in class', 'this topic'. No closing recap paragraph. No step lists.
- Lecture 15 (module 14) is conceptual: no axes, no step-by-step method detail, mostly no numbers, but always researcher and year.
- Where the source flags a question the slides pose, answer it.

## Task A: Experiment cards (your cards are in input `cards`)
For each card write 2 to 4 short connected paragraphs that tell the study in logical order: the question the researchers asked, how they tested it (what they manipulated and measured, the conditions), what they found, and what it means. Fold the card's 'trap' into a natural sentence. Keep each card under about 200 words. Output list item: {"title": <exact card title>, "blocks": [...]}.

## Task B: Hard topics, explained (topics assigned in your message)
Write one entry per assigned topic. Concise and accessible for a reader with ADHD: most topics need only 1 to 3 short paragraphs (each 2 to 4 short sentences); a genuinely complex topic may use 4 to 5. Explain the concept, say plainly what makes it hard, and include a simple example only if it comes from the sources (for instance the Linda problem, Tucson and Arizona, 43 times 6 are in the sources; invented analogies such as pianos, cafes or school dances are NOT allowed). No repetition, no restating the same idea, no elaborate analogies. Include the relevant researchers, years and the findings worth remembering. Also give "pages": the list of slide numbers (taken from the `slides` field of the Q&A items you used; module-relative) that align with the topic, at most 4. Output list item: {"module": <module id>, "title": <topic title as assigned>, "pages": [...], "blocks": [...]}.

## Files
Write two JSON files in this folder (`/Users/jordanlopez/Documents/Codex/2026-11-02/con/work/COGNITIVEPROCESSES/authoring/psyc301/exam-aids/v4/`): `cards-N.json` (list) and `topics-N.json` (list), where N is your group number. Validate they parse, that every card title appears exactly once, and run a quick scan for em dashes and banned phrases. Reply with one line: counts only.
