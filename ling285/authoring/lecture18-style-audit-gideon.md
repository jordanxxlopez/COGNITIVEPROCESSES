# Gideon — comparative edition-style audit

## Method and scope

I read the repository and LING285 AGENTS.md requirements and the actual `build_transcripts_notes.py` and `build_transcripts_iskarous.py` guidance and gates. I independently read every Lecture18 teaching page in the actual Original runtime and in runtime editions16,18,20,21,22. I compared the first instructional page from each of Lectures11–17 in each edition (35 comparative samples), the matched repeated17/18 pages6–7, and the actual new18pages2–4. This is a comparative style audit, not a fresh full scientific re-review of every older source page. Old wording that breaches an explicit rule does not override the rule.

I independently parsed all five authored Lecture18 inputs and checked every page block against the corresponding runtime payload, with exact equality. All eight page IDs occur in order and title/activity pages1/8 retain empty teaching. No dropdown-only conclusion is used as evidence of writing style. Version23 is the app's explicit alias of22, with following-slide layout, and is not expected to contain a seventh unique prose rewrite.

## Raw findings requiring correction

1. **Version16, page5, presentation narration.** “The page opens,” “each reveal,” “Then the words give way,” and “The bottom line ties the four together” narrate the presentation instead of directly teaching the prediction problem. The root writing rule excludes presentation narration. Retain the four scientific input/prediction cases and their source-supported detail, but explain them directly, without reveal order or layout framing.
2. **Version16, page6, layout narration.** “The answer builds up in three rows” describes page arrangement. Introduce English phonotactic constraints directly, then retain meaningful examples and reasoning.
3. **Version16, page7, prompt framing and malformed wording.** “The pop quiz asks how...” should directly teach the next-letter task rather than narrate the quiz. “Its guesses are spread broad” is grammatically unnatural and should become direct broad-versus-restricted continuation wording without implying measured probabilities.
4. **Version18, page6.** “This page asks...” is presentation narration, contrary to the direct scientific-meaning rule. State the English sound-sequence problem directly.
5. **Version18, page7.** “This pop quiz gives...” similarly narrates a prompt. Directly explain how choosing a next letter probes sequence knowledge.

These are actual prose mismatches even though the current regular-expression gates pass. Some wording is inherited from17; that explains its origin, but does not waive the explicit standing rules for the new lecture.

An additional editorial concern is Version20 page4's “The point is ... rather than calculating every plotted value.” The initial-state mechanism is already explained, and the contrast about calculations is an unnecessary metateaching sentence. Prefer a source-supported mechanism statement or remove the restatement. This is smaller than the direct narration findings above.

## Per-edition comparison

| Choice | Comparison against established editions | Current style disposition |
|---|---|---|
| Original | Concise connected paragraphs with restrained emphasis, matching the original edition's simpler explanation format. New2retains neuron/network/LLM/agent distinctions;3distinguishes parallel heads and sequential layers;4explains interleaved state updates and different rule organizations. No arbitrary length target imposed. | APPROVE style |
|16|Established11–17 examples use natural explanations, defined terms and nested mechanism steps. New2explains the graph and feedback loop,3explains heads/representations/layers,4explains update order and recurrent versus depth progression. All are genuine teaching sentences rather than new labels on one identical draft. Six current pages have274,242,284,221,247,206words, all below300. Their245.7mean is close to the older237.3mean and compatible with an approximate225-word guidance; the rule does not justify cutting scientific detail merely to force225exactly. | OBJECT pending findings1–3 |
|18|Older11–17 samples emphasize scientific meaning with fewer figure values. New2removes unnecessary architecture counts,3keeps the parallel/sequential distinction,4explains state/history/depth rather than tracing axes or colors. New5keeps fifteen/sixteenth as defining the task, not an irrelevant number recital. Current pages177,137,232,139,154,133words; shorter than16is consistent with source-specific direct explanation and there is no required minimum. | OBJECT pending findings4–5 |
|20 / A|Older examples use connected instructor-style causal reasoning. New2develops weighted sums into network/LLM/agents,3defines representations and explains combined experts,4develops alternating updates, recurrence and separate layer weights. It is fuller than21on these new pages (235/165/277words versus164/120/206). No18spoken transcript is claimed by this review. | APPROVE style with editorial concern above |
|21 / B|New2–4retain the same causal mechanisms while trimming architecture counts and the extended oscillator curve discussion. This follows the focused edition's selective trimming; it is not required to manufacture omissions on every page. Pages5–7can legitimately share20's text where there is no incidental story to remove. | APPROVE style |
|22 / C|New2–4explain the operations in words, define representations, distinguish heads from whole agents and explain feedback/depth without worked calculations. The pages use complete-sentence bullets, not fragment labels or compressed reference lists. Its contrast with20on page2removes exact example counts and architecture inventory. Repeated phonotactics pages stay in the establishedCexplanatory style. | APPROVE style |
|23|The actual app aliases22text and changes slide-following behavior. This is the established23definition, so identicalC/23prose is correct. | APPROVE text-style relationship; layout separately tested |

## Mechanical checks and snapshot

For16/18/20/21/22, every actual18page passed the current banned-pattern/report-label/balanced-emphasis checks. For20–22, no telegraphic sentence under five words or shorthand gate failure occurred.22also passed strict punctuation/measurement/bold-label checks. These mechanical passes do not erase the manual narration findings.

Initial runtime SHA-256 values reviewed:

-16: `6d946fdb59f5d3bf3c78fb8e665e9bfb03532a5f8a3aa92b0d35e501bf5c244d`
-18: `ff506310f762b3737d145b4ae4ce362ff23f2c917fd3c9cfafba248593984cfc`
-20: `1ad25cce5c819e4227e83188f6ae82fe76b6b75eef4f3396e7b05fca58792e65`
-21: `640820deeb1313cfe01ed50da5280f3bf24f4b1ff9192a55fc0810ee1a651825`
-22: `bd309c8bd05ff64c726f2afaf1ff00bf4ea133fa8affb72ca2750856d56d2931`

Final blanket approval is withheld pending corrections1–5and comparison of the actual rebuilt runtime. No teaching files were edited by this reviewer.

## First correction recheck

The actual rebuilt16/18/20/22 payloads were reread. Findings1,3,4,5and the20p4editorial concern are corrected.16p3also drops a redundant final main bullet without losing the parallel-versus-successive explanation;18/22p4replace the stock-series label inventory with a scientific trajectory explanation. Two narrow residuals were sent back:16p6still says the real word “sits over” its starred twin, and18p6now repeats the phonotactics definition at its opening and ending. Final approval awaits these final wording/deduplication fixes and fresh equality/gate checks.

## Final independent recheck — APPROVE

I independently reread the final16page6and18page6and verified both residual corrections.16now pairs real words with starred impossible forms without narrating their physical placement.18defines phonotactics once and attaches implicit knowledge to that definition rather than repeating it at the ending. All five raw blockers, the redundant20metateaching sentence and both residuals are resolved.

Every final18input page was independently compared with its actual runtime block, with exact equality in16/18/20/21/22. Formal prose and sentence gates were rerun against these actual payloads and passed.16remains below300words on every instructional page. All eight source pages remain present, with1/8empty teaching. The distinctions described in the comparative table remain intact after the fixes. Original is unchanged from the style-approved initial snapshot;23correctly follows22text. No separate seven-way unique-prose requirement is invented.

Final verdict: **APPROVE all seven requested choices for edition-style compliance**, with23understood as the establishedCtext/layout variant. This is style compliance approval, not deployment approval or a claim that no page can legitimately share another edition's prose.

Final reviewed snapshots:

- Version16: runtime `a9626fc676942fae469da08fb15f57caaf5246f65c49dd2bb621406d2b07f978`, authored input `fa89b32694c4a0b89411cbe5bbee23329c3f9b269a19525c16a6ceec56a7d6ad`; words per instructional page [274, 199, 284, 226, 247, 200].
- Version18: runtime `c2fefdd05cc8a75e6ebb0d3c2cc4d4727e16a172e4666bd3674b66559bc1307c`, authored input `ad26c1df7fb104a0b5a520b32c13f6332cef739810f13012d52cb79ad5c427d5`; words per instructional page [177, 137, 240, 139, 146, 127].
- Version20: runtime `2524d05b53393c33e765b2576f51f537d92caadf219c3ff5677b73c9a1308ddf`, authored input `48643454963a228d84b81ba9651aa59e760bcfa7af5a133a53f5f07412beec5d`; words per instructional page [235, 165, 258, 232, 277, 283].
- Version21: runtime `640820deeb1313cfe01ed50da5280f3bf24f4b1ff9192a55fc0810ee1a651825`, authored input `9bd947b40a82125113643f568e8f5348c142771387062ba5ec17f6e2b60f96ee`; words per instructional page [164, 120, 206, 232, 277, 283].
- Version22: runtime `8f6e6d67bb1b757be51a493981e3c4d4e6facb0762809774b9b723bb099c942d`, authored input `f55df32d243bea05a54df56b4009035f2405f36d2ea8a44ed3a2963c71a38ba1`; words per instructional page [205, 176, 281, 232, 288, 300].
