# Sage and Vera — comparative edition audit

## Method and limits

This is a fresh comparison of the actual runtime teaching, not acceptance of the earlier handoff report. I read all six instructional Lecture18 entries in Versions16,18,20,21 and22, the native text and speaker notes of all eight Lecture18 pages, the executable edition guidance in build_transcripts_notes.py and build_transcripts_iskarous.py, and LING285 AGENTS.md. I compared actual baseline passages in every Lecture11–17 edition, using11p3,12p11,13p3,14p10,15p12,16p15 and17p5, supplemented by full-runtime count and cross-edition equality checks. This is a seven-lecture sample comparison, not a claim to have freshly read every word of every older edition. Prior full source/media inspection remains separately documented; I do not claim fresh native animation playback.

The earlier transcript style evidence is retained in the source handoff. No Lecture18 classroom transcript exists, and no version can truthfully claim new spoken examples or Lecture18 exam exclusions. The native source notes establish the new oscillator update order and reused-rule versus layer-specific-weight comparison.

## What is actually separately authored

The new2–4 pages are not the same text behind different dropdown labels. Version16 retains fuller nested explanation, definitions and details within its cap. Version18 removes much numerical and diagram bookkeeping and emphasizes the parallel-versus-successive process and the shared state-update principle. Version20 develops the explanation in fuller professor-style sentences, including selected source conditions. Version21 focuses it and drops incidental counts. Version22 reasons through the operations in words. Version23 correctly aliases22; its distinction is layout, not a seventh scientific prose rewrite.

Instructional-page word counts for18p2–7 are16 [274,242,284,221,247,206],18 [177,137,232,139,154,133],20 [235,165,277,232,277,283],21 [164,120,206,232,277,283],22 [205,176,269,232,288,300]. All104 preexisting16 instructional entries have median239 words;18 median196. Older20/21/22 have106 instructional entries and medians178.5/176/183. These are descriptive comparisons, not new required word targets.

Page5 is identical in20/21/22 after the earlier source-scope corrections. That alone is not a violation. Eighty-five older20/21 instructional pages are also identical. A focused edition removes side material where present; it does not require a new paraphrase of every already focused passage. Page5's complete connected explanations use ordinary words and no mathematical calculation, so they can serve all three styles. Do not invent extra differences to prove separate authoring. Reused6/7 legitimately retain the corresponding earlier edition's content, but inherited defects still need correction against explicit guidelines.

## Raw findings requiring fixes

1. **Sage,16p5, presentation narration.** “The page opens,” “each reveal fills the row,” “Then the words give way,” “Last comes,” and “The bottom line ties the four together” describe presentation events instead of teaching the prediction mechanism. The corresponding17 prose contains these phrases, but copying precedent does not waive the direct-teaching and natural-explanation rules. Teach the given sequence, missing next item, and what changes when the represented material changes; retain the concrete sentence, spectrogram, image-patch and protein distinctions.
2. **Sage,16p6, figure walkthrough.** “The answer builds up in three rows” is a layout description. Open with the English sound-sequence question and the simple-versus-cluster-versus-multiple-syllable distinction directly. Preserve the substantive examples and mechanisms. Do not rewrite unrelated older lectures.
3. **Vera/Gideon,16p7, grammar.** “Its guesses are spread broad” is malformed. Use “spread broadly” or “spread across many letters.” Retain broad versus restricted continuation reasoning, without asserting measured equal probabilities.
4. **Sage,18p6 and18p7, presentation framing.** “This page asks” and “This pop quiz gives” are weak openings for the scientific-meaning edition. State what English sound-pattern knowledge permits and why earlier letters constrain the next guess. The student task can be taught directly, without narrating its container.
5. **Sage,18p4 and22p4, detached stock-graph bookkeeping.** The identical appended paragraph names “the small stock-return graph” and its Small/Medium/Large legend and then says the series rise and fall. This was added for source coverage, but reintroduces figure-label bookkeeping into the scientific-meaning and word-reasoning editions. Integrate the limited supported relationship—different sequences trace changing trajectories over time—into the explanation of a trajectory, in each edition's connected prose. Do not invent a financial cause, units or a model fit. Those missing details stay in the source report.

No fresh scientific blocker was found in new2–4's main head/layer, feedback and agent explanations. The source's Jordan-history simplification and spelling/phonotactics limits remain disclosed separately. The correct old-velocity/new-position update order is retained, heads are model components rather than people or whole agent LLMs, and layer-specific weights are distinguished from recurrent reused weights.

## Initial per-edition disposition

- Original1: preserve the existing already-made text; no new style rewrite is requested for this option in the present follow-up.
- Version16: **OBJECT**, findings1–3.
- Version18: **OBJECT**, findings4–5.
- Version20: **APPROVE style**, full source-supported explanatory detail with complete sentences and selected useful counts.
- Version21: **APPROVE style**, focused new2–4 and no forced shortening of already focused5–7.
- Version22: **OBJECT narrowly**, finding5; the main explanations otherwise follow connected reasoning in words.
- Version23: same text disposition as22 and must be rebuilt/verified with the final22 text; its independent distinction is the following-slide layout.

These are actual objections, not a final approval. Changed authored inputs and runtime entries must be rechecked and final hashes recorded before claiming all editions pass.

## Final independent recheck

Verdict: **APPROVE each of Versions16,18,20,21 and22; Version23 inherits the approved22 text through the verified app alias.** The Original option remains preserved.

I reread every changed runtime passage and independently compared every Lecture18 runtime block with its corresponding authored input for all five reviewed prose editions. All are exact matches. The source-walkthrough language is removed from16p5,16p6 now teaches phonotactics directly, and16p7 uses a grammatical source-scoped continuation explanation.18p6/7 now open with the scientific relationship; the new duplicate phonotactics definition introduced during this fix was flagged and removed, with the implicit-knowledge point retained once. The18/22stock paragraph now explains trajectories without a legend inventory or invented financial cause. The16p3 redundant closing restatement and20p4 calculation-metacomment are also absent. Each version retains the relevant concrete source distinctions and its established explanatory level.

I additionally extracted and read the earlier Nov3 transcript passages on vectors as number lists, changing speech input, Jordan feedback and next-word prediction. The new professor editions follow the move from a simple operation to its temporal/sequence extension, while omitting the spoken side stories and unsupported historical exclusivity claims. This is evidence for style, not a recovered18spoken transcript.

The previous raw findings remain above. All required corrections have been applied and independently rechecked. No demand for different wording on every page or arbitrary per-page length was invented. Final checks apply to these actual hashes.

- `authoring/transcripts-v16/lecture18.txt`: `fa89b32694c4a0b89411cbe5bbee23329c3f9b269a19525c16a6ceec56a7d6ad`
- `transcripts-v16.json`: `a9626fc676942fae469da08fb15f57caaf5246f65c49dd2bb621406d2b07f978`
- `authoring/transcripts-v18/lecture18.txt`: `ad26c1df7fb104a0b5a520b32c13f6332cef739810f13012d52cb79ad5c427d5`
- `transcripts-v18.json`: `c2fefdd05cc8a75e6ebb0d3c2cc4d4727e16a172e4666bd3674b66559bc1307c`
- `authoring/transcripts-v20/lecture18.txt`: `48643454963a228d84b81ba9651aa59e760bcfa7af5a133a53f5f07412beec5d`
- `transcripts-v20.json`: `2524d05b53393c33e765b2576f51f537d92caadf219c3ff5677b73c9a1308ddf`
- `authoring/transcripts-v21/lecture18.txt`: `9bd947b40a82125113643f568e8f5348c142771387062ba5ec17f6e2b60f96ee`
- `transcripts-v21.json`: `640820deeb1313cfe01ed50da5280f3bf24f4b1ff9192a55fc0810ee1a651825`
- `authoring/transcripts-v22/lecture18.txt`: `f55df32d243bea05a54df56b4009035f2405f36d2ea8a44ed3a2963c71a38ba1`
- `transcripts-v22.json`: `8f6e6d67bb1b757be51a493981e3c4d4e6facb0762809774b9b723bb099c942d`
