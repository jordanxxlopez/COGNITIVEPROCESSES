# Board A sign-off: LING285 Exam 2 simpler rewrite, parts 1 and 2

Chair: Margaret. Files reviewed: `out/part1.json` (modes, network-forward, training, gestalt-cloze, agentic) and `out/part2.json` (springiness, source-filter, pytorch, llm-sequences, phonotactics). Every block (main/sub/end) and every answer was compared line by line against `in/part1.json` and `in/part2.json`.

## Goal and rules in force
Goal: Jordan said the old text was "making it so much harder". Every block and answer should be much simpler, keep the key terms and use full sentences. The rules are in STYLE-GUIDE.md. Its section "Simpler explanations (Nov 12)" wins wherever it conflicts with the rest. Also applied: the CLAUDE.md rule on "picture" and the source-vs-truth rule.

## Overall finding
The writers' rewrite was already strong. Answers open with a direct sentence that reuses the question's words, use "This is because" steps, and split multi-part questions into paragraphs. Middle steps like "harder to move" were added in the way Jordan asked. Numbers were kept. No answer drifted off its question. The board found no factual errors that the writers introduced. Most fixes were about simplicity: long sentences with glosses packed into parentheses, a few loose "because" links, one contraction and one borrowed verb.

## Issues caught and fixed, by member (22 caught, 21 fixed in the files, 1 kept with Jordan's note)
| Member | Caught | Fixed | Kinds |
|---|---|---|---|
| Gideon (rules/style) | 3 | 3 | "carries meaning" (a verb the guide bans), "hasn't" (casual contraction), "This means" used where "So" is the rule |
| Vera (facts) | 3 | 2 | the spectrogram gloss "short slices of time" was wrong (now "short time slices of a display of a sound's frequencies"); the critic-loop "because" made a false causal link; "prevents" vs "greatly reduced" kept as the course wrote it (see For Jordan) |
| Sage (domain) | 3 | 3 | F0 was used inside the harmonics gloss before F0 was defined (order swapped); "dynamic programming" and "inference" had no gloss; harmonic spacing in source-filter block 0 had no reason given (added "Because the harmonics are multiples of F0") |
| Rook (devil's advocate) | 3 | 3 | the weight-sign sentence "keeps the input positive or negative" was vague; "the sixteenth item" in the phonotactics closing had no context; in gestalt Q1, "completion is what knowledge is" was abstract |
| Flint (realist) | 9 | 9 | long sentences of 28 to 39 words, where a gloss inside parentheses was split into its own sentence (springiness B0 main and sub, source-filter B1 main and Q1, pytorch B0 sub, B2 main and Q4, springiness Q0, Q1 and Q2); padding cut (modes Q6 repeated the same point twice); the forward-pass closing went from two long sentences to two short ones |
| Ada (strategist) | 1 | 1 | agentic Q1 now says what the loop does (critic checks, reviser fixes) before saying what it prevents, so both parts of the question are answered |

Writers' flags: all 12 resolved (5 in part 1, 7 in part 2). The 8 that needed Jordan's input are listed under "For Jordan". The other 4 are accepted below.
- Part 1 flag 5, the added glosses and steps (F1/F2, activation, SGD, hallucination, graph, "-ed for the past tense", "Don is the fourth word", 1.57 × −0.1 gives −0.157). Each one was checked and is true. Accepted.
- Part 1 flag 4, network-forward Q4 gives no number for the loss. The question only asks what the loss is, and the original gives no number either. Accepted.
- Part 2 flag 1, "When F0 stays the same, the harmonics stay the same". This is a true clarification and agrees with the next sub line. Accepted.
- Part 2 flags 4 and 5, the sigmoid gloss and "(where the skr sound is spelled scr)". Both are true and help. Accepted.

## Most important fixes (before → after)
1. Forward pass, network-forward block 2 end.
   Before: "So a forward pass is when a neural network uses its current weights to make a prediction. Even if the network hasn't learned the correct weights yet, it can still make a prediction, but that prediction might be wrong."
   After: "So a **forward pass** uses the network's current weights to make a guess. The network can make this guess even before it has learned good weights, but then the guess may be wrong."
2. Weight signs, network-forward block 1.
   Before: "A positive weight keeps the input positive or negative, while a negative weight changes it to the opposite sign."
   After: "A positive weight leaves the sign of the input the same, so a positive input stays positive. A negative weight changes the sign to the opposite." The worked example (+3 times +2, +3 times −2) is now two sentences.
3. Critic loop, agentic Q1.
   Before: "The critic loop sends the draft back until the critic is satisfied. This is because the critic checks each draft…" This "because" did not explain the first sentence.
   After: "The critic loop sends the draft back and forth between the critic and the reviser until the critic is satisfied. The critic checks each draft, and the reviser fixes the errors the critic finds. So errors are caught and fixed before the answer is shown to the user."
4. Source, source-filter block 0. Before, harmonics were glossed as "multiples of F0" before F0 was defined. After, F0 is defined first, then harmonics.
5. Springiness block 0. Before, the opening sentence was 35 words long with a mode gloss in parentheses. After, the mode definition is its own sentence, and "This means" became "So".
6. LLM learning, llm-sequences block 2. Before: "inference … is inner products. Learning is stochastic gradient descent plus dynamic programming." After, it says "is done with", and dynamic programming is glossed as "reusing calculations already done, which is how backpropagation works backward through the layers".

## For Jordan (source vs truth)
The deliverable keeps what the course said. These are the places where the course differs from accepted fact. Know the course version for the exam.
1. **Carol Chomsky and "went / goed / went"** (training block 4). The course credits Carol Chomsky. The accepted credit for this U-shaped overregularization pattern goes to Roger Brown and Courtney Cazden (1960s–70s) and to Gary Marcus et al. (1992). Carol Chomsky is known for later syntax acquisition (*The Acquisition of Syntax in Children from 5 to 10*, 1969). Check this against your notes. The course name stays in the notes.
2. **The critic loop "prevents" hallucination** (agentic Q1, and the question itself). Block 1 and Q2 say it "greatly reduced" hallucination, which is the accurate version. A critic loop lowers hallucination but does not remove it. If the exam asks "what does it prevent", answer "hallucination".
3. **Ten runs end at "the same" accuracy** (training block 3), but Q3 says "about the same". The accurate version is about the same, with small differences between runs.
4. **"Mandarin allows only nasal sounds at the end of a syllable"** (phonotactics block 3). More precisely, the only consonants that can end a Mandarin syllable are the nasals n and ng. Syllables can also end in a vowel, and the r-ending (erhua) also occurs.
5. **"After k, … n, as in knee"** (phonotactics block 5, Q7). In knee the k is silent, so kn is not a sound onset in modern English. It is fine in the next-letter guessing game, which is about letters. Words like klutz, krill and quick (kw) also show k followed by l, r or w.
6. **"After sh, only a vowel or r" / "shr is the only cluster"** (phonotactics block 5, Q9). This holds for native words. Loanwords like schlep, schmooze and schwa begin with shl, shm and shw sounds.
7. **Raising the learning rate from 0.1 to 0.3 "makes accuracy go down"** (pytorch Q6). This is stated as certain. In general a larger rate tends to overshoot and can lower accuracy, but the result depends on the network and data. Sometimes 0.3 does as well or better.
8. **"The harmonics stay the same from vowel to vowel"** (source-filter block 1). This is true only when F0 is the same. The rewrite states that condition, which matches the next sub line.

## Cato (process integrity)
No stop. Two minor notes. (1) Every writer flag was resolved openly, and the "prevents" vs "reduced" mismatch was kept and reported, not quietly harmonized. That is correct under the source-vs-truth rule, but whether to soften "prevents" is Jordan's decision, not the board's. (2) Vera's spectrogram correction and Sage's dynamic-programming gloss both add wording that is not in the original. Both are true, and they are listed above so Jordan can see them. No member was overridden, and no vote was needed.

## Sign-off
Margaret signs off on `out/part1.json` and `out/part2.json`. Both parse, and every i, ref, source and q is unchanged. A final scan found no colons, semicolons, dashes, arrows, "=", "picture", lecture or professor mentions, blame/credit/push/flip metaphors or contractions in the prose. Remaining long sentences are the direct-answer openers that must repeat the question's words, for example the full Linear(...) code line. Nothing else is unresolved.
