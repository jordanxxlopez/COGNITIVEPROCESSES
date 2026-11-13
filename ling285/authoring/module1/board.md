# Advisory board report · Module I study template (Study this first, Notes by topic, Exam 1 review guide)

Chair: Margaret. Scope: authoring/module1/topics_1.json, topics_2.json, topics_3.json (16 topics, 60 Study this first blocks, 10 Notes by topic blocks, 92 questions) and exam.json (20 review answers, 25 Exam 1 key answers). Rules in force: STYLE-GUIDE.md with its "Simpler explanations" section, the CLAUDE.md "picture" rule, the source-vs-truth rule, and module_template.py's automatic checks (every ref resolves to a real page, no label lines, no arrows or equals signs in prose, no lecture or professor mentions in teaching text, no "blame" or "credit").

## Verdict

Signed off. The builder's checks pass on every block and answer. Every block has its slide or the professor's video beside it, seven slides play the videos where he placed them, and every file referenced exists. The content differences and the one source flag are listed for Jordan below.

## Issues caught and fixed, by member

| Member | Caught | Fixed | What |
|---|---|---|---|
| Gideon (rules, style) | 1 | 1 | The layout script and app patch originally left "Study this first · Exam 2" as the Module I heading; labels now come from the module's own meta (Study this first · Module I, Notes by topic · Lectures 01–10, Exam 1 review guide). No label lines, arrows, equals signs or lecture mentions remained in the teaching text (checked by the builder). |
| Vera (line by line facts) | 1 | 1 | The SGD block cited Lecture 02 p17 and Lecture 03 p15 together but gave only the 25 percent step (130 to 122). Lecture 02 uses 10 percent (130 to 126.8). The block now gives both. Checked every number: the shortest path values (D 13, E 14, F 15, B 18, C 24, A 30, greedy 33), the Exam 1 graph (greedy 12, best path 11 through C, D and G), every inner product (8, minus 4, 10, 14, minus 3, minus 8), the explicit and position-first Euler steps (minus 1 versus minus 0.875), the SGD steps (130, 122, 112.75, 94.672 to 95.504), the model vowel frequencies (1 plus 4, 2 plus 3), the cycle counts (3, 6, 9 in 12 seconds) and the spacing percentages (60 and 140). |
| Sage (domain expert) | 0 | 0 | Terminology follows the slides. The slides call f and v "labial" where a phonetician would say labiodental; the deliverable keeps the course's term (source-vs-truth), see For Jordan. |
| Rook (devil's advocate) | 1 | 1 | Review question 4 (the two thermostats) has no answer in the key or the companion. The answer here reasons from the slides on balancing feedback and from Meadows on delays turning correction into oscillation. Rook asked for that to be visible, so it is listed under For Jordan rather than presented as the professor's answer. |
| Flint (realist) | 1 | 1 | Lecture 03's twelve step-by-step SGD pages would have made twelve near-identical blocks. They are one Notes by topic block that walks the steps in two sentences each, and Study this first keeps only the pages that teach a new idea. |
| Ada (goal) | 0 | 0 | The final is cumulative, so the scope box says so, and every Exam 1 question is here with its answer. The structure is the same template Module II uses, so a Module III folder would need only its own meta, topics and exam files. |
| Cato (process) | note | n/a | This review was run by one author checking its own work against the rules, with the builder's automatic checks as the independent part. Nothing was softened or dropped; the three content notes below are reported rather than silently settled. |

## For Jordan (content notes, kept out of the deliverable)

1. **Exam 1 question 12.** The key only gives the greedy answer (3 plus 3 plus 4 plus 2, which is 12). The answer here adds that the cheapest path is A, C, D, G, H at 11. That sentence is computed from the exam's own graph, not from the key.
2. **Exam 1 questions 6 and 19.** The two MRI images in each pair were labelled (a) and (b) from their left and right positions in the key's PDF, which matches the key's wording for question 6 (f is b, th is a). For question 19 the key says k is (a) and m is (b). Check the figure once against your own copy of the exam.
3. **Review question 4.** No key answer exists. The answer here (near thermostat is the spring alone, far thermostat is the mass-spring) is reasoned from the slides and Meadows, and it agrees with the companion's general approach but was not copied from it.
4. **Labial versus labiodental.** The slides say "labial" for f and v. Strictly f and v are labiodental (lower lip to upper teeth). The deliverable keeps "labial" with the lip-to-teeth description, because that is the term you will be graded on.
5. **Mass and stiffness doubled together.** The predicted question that says the two effects cancel for a single mass on a single spring uses the same statement as the Module II Study this first sheet. The Module I slides only say the effects are opposite.
