# Advisory board report B (parts 3 and 4)

Chair: Margaret. Scope: out/part3.json (harmonics and formants, backpropagation, lead-up to LLMs, LLM as a dynamical system) and out/part4.json (constrictions, spectrograms, sigmoid, heads and layers). Every block (main, sub, end) and every answer was read against in/part3.json and in/part4.json.

Rules in force: STYLE-GUIDE.md, with "Simpler explanations (added Nov 12, 2026)" overriding earlier sections. CLAUDE.md "picture" rule. Source-vs-truth rule (keep what the course said, report differences here).

## Verdict

Signed off. Both files parse. Ids, refs, sources and questions are unchanged and in the same order. The writers' drafts were already close. They kept the facts and numbers, used "This is because" openers, and split the multi-part answers into paragraphs. The board fixed 34 issues. No issue is left open in the deliverable. The content differences are listed below for Jordan.

## Issues caught and fixed, by member

| Member | Caught | Fixed | What kind |
|---|---|---|---|
| Gideon (rules, style) | 9 | 9 | Sentences over 25 words (bold openers in constrictions b0, lead-up b1, recurrent-dynamical b0, constrictions b2 end, spectrogram Q3, a 39-word gloss sentence the board itself first wrote in lead-up b3), "So since" (constrictions Q8), doubled "because… This is because" (lead-up Q0), repeated "Both also" (harmonics Q7) |
| Vera (line by line facts) | 5 | 5 | Sigmoid Q3 gave a non-reason ("because 0.5 is halfway") for why sigmoid(0) is 0.5. Harmonics Q11 put "This is because" after the axis sentence, so it explained the axes instead of the spacing. Checked the writers' added steps: "stiffer air springs back faster", "below 0.5 for any negative input", the +2 weight example, "within the syllable" (all true and kept). Added sigmoid(−2) ≈ 0.12 (checked) |
| Sage (domain expert) | 4 | 4 | Plan units and state units were not explained (glossed). A dynamical-system sentence said "do not all use the same numbers" (now "each step uses different weights"). The "springiness at the fixed end" writer flag was resolved with a plain gloss. A vague "uses everything again" in the GPT block now names the whole prompt plus the new word |
| Rook (devil's advocate) | 6 | 6 | Backprop Q1 jumped to "Dynamic programming solves…" without linking it to backprop. Backprop Q6 never said why learning nothing is a problem. Backprop Q5 used "its contribution", which is abstract. The membrane "moves with all the modes that move" sentence was circular. The "/i/ moves apart" end sentence had stacked clauses. The spectrogram b1 opener was tangled ("away from where they are for schwa in its own direction") |
| Flint (realist) | 7 | 7 | Mode sentences in constrictions b3 to b5 crammed three clauses into one comma chain. Each now follows one pattern of two sentences ("…so the extra mass matters. Heavier air is harder to move, so F1 goes down."). The constriction Q7 ending is now the same. The bare list of years (1943, 1985, 2017) now says what each year is. The empty "Heads relate to layers because" was cut. Repeated "at the same time" was cut |
| Ada (goal) | 3 | 3 | Building vs vocal tract Q8 did not say that speech uses all the modes. That is the actual contrast, so it was added. Heads Q0 now answers "how do they relate" directly. Sigmoid Q3 now explains the 0.5 |
| Cato (process) | 2 notes | n/a | See the process section |

Writers' flags were all resolved. Part 3 had 6 flags. Four are content notes, carried into "For Jordan" below. The cosine rewrite and the three-hidden-layer wording were accepted as written. Part 4 had 8 flags. The added stiffness step, the syllable gloss, the number example, the sigmoid connecting step and "contributed to the error" were all accepted as true. The building and classroom comparisons are the course's own, so they stay. The n vs m formant claim is in "For Jordan".

## Most important fixes (before, then after)

1. **Constrictions, Mode sentences (b3 to b5).** Before: "So the extra mass is what matters, the air is harder to move, and **F1 goes down**." After: "In **Mode 1**, the air at the lips is moving, so the extra mass matters. Heavier air is harder to move, so **F1 goes down**." The stiffness cases now say "Stiffer air springs back faster, so **F2 goes up**." Every case explains the middle step.
2. **Sigmoid Q3.** Before: "This is because 0.5 is exactly halfway between 0, which means off, and 1, which means on." This was not a reason. After: "This is because the sigmoid curve is centered on an input of 0. Negative inputs give values below 0.5, and positive inputs give values above 0.5. So an input of exactly 0 lands in the middle, at 0.5."
3. **Backprop Q1, last paragraph.** Before: "Dynamic programming solves the simplest problem first." After: "Backpropagation follows dynamic programming, so it solves the simplest problem first."
4. **Constrictions b0 opener.** Before: a 35-word bold sentence with the definition in parentheses. After: "**The air in the vocal tract vibrates back and forth along the tube, and it is a fixed-free system.** This means it has one end where the air cannot move and one end where it can."
5. **Harmonics Q7, springiness.** Before: "both have springiness at the fixed end". After: "both are most springy at the fixed end, where they are stretched or compressed the most."
6. **Building vs vocal tract (Q8).** The added sentence "In speech, all the modes are used." comes before the formants-move sentence, so the answer now states the contrast.
7. **Lead-up b4 years.** Before: "The years 1943, 1985 and 2017 mark the main steps in this history." After: "The main steps in this history are 1943 (the McCulloch and Pitts paper), 1985 (backpropagation) and 2017 (the design behind GPT)."

## For Jordan (source vs truth)

These are kept in the notes as the course gave them, because that is what the exam tests. Here is the accepted version for each.

1. **GPT "works the same way as the recurrent network"** (lead-up b4, Q6). GPT is a transformer, not a recurrent network. It has no loop inside the network. What it shares with Jordan's network is that each predicted word is fed back in as input (autoregression). The transformer design is the 2017 step.
2. **"Backpropagation is SGD plus dynamic programming"** vs **"SGD and backpropagation together train the weights"** (backprop b1, Q2, Q3, Q4). Both framings appear in the course and both are kept. The standard view matches Q2. Backpropagation only calculates the gradient (how much each weight contributed to the error) by working backward with the chain rule. That backward reuse is the dynamic-programming part. SGD then uses the gradient to update the weights.
3. **A neuron "gives back the inner product"** (lead-up b0, Q2). A standard artificial neuron also applies an activation function (such as the sigmoid) to the inner product. The sigmoid topic in these same notes says so.
4. **Vocal folds as a membrane predicting equidistant harmonics** (harmonics b1, b2, Q6, Q11). A real two-dimensional membrane (like a drum) does not have evenly spaced modes. Only a one-dimensional string or tube does. Accepted phonetics says the harmonics are evenly spaced because the vocal folds open and close periodically. The airflow pulses repeat at F0, and any repeating signal has harmonics at whole-number multiples of F0.
5. **A constriction makes the air "heavier (denser) and stiffer"** (constrictions b2). The air is not really compressed to a higher density at rest. Narrowing the tube makes the air there behave as more mass, because it has to speed up through the narrow part. Narrowing also leaves less volume, so that spot acts stiffer. The predictions (formant goes down where the air moves, up where it is compressed) match standard perturbation theory.
6. **Malécot, "after n one formant drops, after m it stays flat"** (spectrogram Q4). Going into /a/, the F2 transition after an alveolar /n/ falls, which matches the course. After a labial /m/, F2 usually rises a little from a low starting point rather than staying flat. Also, the block says listeners use the vowel "partly", but Q4 says the information is "mostly" in the vowel. Malécot (1956) found the transitions were the stronger cue for nasals, so "mostly" holds for this experiment.
7. **"If the network makes the right decision it learns nothing"** (backprop Q6). With the cross-entropy loss used in the course code, a correct answer that has probability below 1 still has a small error. So the weights still change a little. Learning stops only when the right answer gets a probability near 1.
8. **An LLM's knowledge is "in the heads"** (heads-layers Q5, b2). Each transformer layer also has a feed-forward part with many of the weights, and much stored knowledge is thought to sit there. All weights, not only heads, are updated by backpropagation.
9. **Dynamical system with "each layer is the rule"** (recurrent-dynamical b1). A classic dynamical system applies the same rule at every step. LLM layers each have different weights, so the rule changes from step to step. The notes already say this.
10. **Minor history points.** Jordan's 1986 network was a recurrent network, not the first one (Hopfield 1982 and others came earlier). Backpropagation is usually dated 1986 (Rumelhart, Hinton and Williams), with a 1985 report before that. "Lord" Adrian got that title in 1955, after his 1932 Nobel Prize, which he shared with Sherrington.

## Cato (process integrity)

No halt. Two notes:
- The board edited one of its own additions (the plan and state units gloss came out at 39 words) after Gideon's length scan flagged it. It was held to the same standard as the writers' text, so no self-exemption.
- The board did not change course content to match the accepted facts. Every difference above is reported to Jordan and left out of the deliverable, as the source-vs-truth rule requires. Deciding whether to add any of it is Jordan's call.

Signed, Margaret (Chair).
