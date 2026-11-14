# Module II session pack spec (Sessions 18–22)

Each session is authored as ONE JSON file `authoring/module2/session{N}.json`, in exactly the
format Session 17 already uses in `module2-data.js` (const BME_MODULE_II). Real Session 17
examples of every object are in `authoring/module2/session17-examples.json`. Read it first and
copy its structure, depth and tone. Also skim `module2-data.js` Session 17 slides/cases for style.

Sources for session N:
- Slide images `assets/session{N}/{page}.webp` (use the Read tool; it shows images). The PDF text
  layer drops formulas, so ALWAYS read formulas from the images. PDF: `sources/session{N}.pdf`.
- Printed statistical tables: `sources/tables/*.pdf` and the transcribed t values in
  `statistical-table-reference.json`. Course homework: `/Users/jordanlopez/Downloads/BME423_Fa2026_Hwk3.pdf`.
- Python with SciPy/NumPy: `/Users/jordanlopez/fsl/bin/python3`.

## File shape

```json
{
 "module": {"id": N, "title": "...", "date": "2026-MM-DD", "count": <PDF page count>,
            "pdf": "sources/session{N}.pdf", "pptx": null, "slides": [ ...one per PDF page... ]},
 "methods": [ ... ],
 "cases": [ ... ],
 "questions": [ ... ],
 "sourceNotes": [ {"page": p, "text": "..."} ]
}
```

### slides (EVERY PDF page, in order, none skipped)
`{"page","title","topic","paragraphs":[3 paragraphs],"equations":[LaTeX...],"symbols","case","subset","core"}`
- `title`: a short descriptive title of what that page shows.
- `topic`: one of this session's method ids (or a general id like "idea" that is also a method).
- `paragraphs`: exactly 3 distinct teaching paragraphs for THAT page (like Session 17 / Module I
  Version C). Inline math as `\\(...\\)`. Outline/title/discussion/R-housekeeping pages still get 3
  short paragraphs explaining what the page sets up.
- `equations`: the page's general equations as display LaTeX (no `$`), [] if none.
- `symbols`: "\\(x\\) (meaning), ..." for the symbols used, "" if no equations.
- `case`: id of a worked case solved on this page (else null); `subset`: [fromStep,toStep] or null.
- `core`: true for exam-relevant method pages, false for outline/admin/history pages.
- Optional `hypotheses`: {"null","alternative","nullWords","alternativeWords"} on pages that test something.

### methods (3–6 per session)
`{"id","title","trigger","pages":[...],"formula":[LaTeX...],"example":<case id>,"shortcut","paragraphs":[2-3],"symbols"}`
- `id` must be unique across ALL sessions: prefix with the session, e.g. "s18slope".
- `trigger`: one sentence, how to recognize the question.

### cases (5–8 per session, at least one per method)
Same keys as the Session 17 case: `id, title, topic, context, unit, table{headers,rows}, tasks[],
hypotheses{null,alternative,nullWords,alternativeWords} (or null if nothing is tested), symbols,
steps[{title, general:[LaTeX], work:[LaTeX], words}], conclusion, source, lookup, values, module:N,
tolerance, answerName, answer`.
- ids unique with session prefix, e.g. "s18-martians-slope".
- Use the actual lecture examples/exercises from the slides (Martians, Plutonians, SBP child, CHD,
  O-rings, platelets, oral contraceptives, SBP over time, FEV1, p7 antigen, BP machine, ages, medicines,
  SBP/CRP exercise, tomato, surgical mesh...) with their real numbers, then add a few original
  variants in the same style. `source` says "Session N page p" or "Original practice example".
- EVERY step writes the general equation (`general`) BEFORE the substituted numbers (`work`).
- Follow the exam rubric in order: state procedure, null hypothesis IN WORDS specific to the problem,
  generic equation then numbers, critical value with df and alpha (from the PRINTED table, record it in
  `lookup` as {"path","page","row","column","value","actualDf","approximation"}; if the df row is
  missing, bracket with printed rows and set approximation true), full conclusion, P range if rejecting.
- `answerName` names the single graded numeric checkpoint (e.g. "Slope b", "t statistic", "F statistic",
  "Chi-square", "Probability", "Distance"), `answer` its value, `tolerance` absolute tolerance
  (about 0.5% of the value, at least 0.001). `values`: object of key inputs.
- VERIFY every number with Python before writing it. Record nothing you did not compute.

### questions (40 per session)
`{"id":"m2-s{N}-q001",...,"module":N,"topic":<method id>,"stem","options":[4 strings],"correct":<0-3>,"why","case":<case id or null>,"equations":[LaTeX]}`
- About 60% numeric (tied to a case, options are the right value plus 3 plausible wrong values from
  common mistakes) and 40% conceptual (case null). Options are LaTeX-in-text strings like Session 17.
- Vary `correct` (0-3); do not put the same correct index on many questions in a row.
- `why`: 1–3 sentences explaining the correct answer.

## Writing rules
Neutral, impersonal, present tense (like Session 17). Never use "picture" as a noun. Do not mention
"the professor"/"he said". Do not invent data, studies, years or results that are not on the slides;
original variants must be clearly labeled original. If a slide contains an error, keep the slide's
method, use the correct arithmetic, and add a `sourceNotes` entry describing the discrepancy.

## Validate before finishing
Run `/Users/jordanlopez/fsl/bin/python3 -c "import json;json.load(open('authoring/module2/session{N}.json'))"`
and check: slide count equals the PDF page count, pages 1..count in order, every slide has 3
paragraphs, every case/method/question id is unique and prefixed, every question's `case` exists,
every method's `example` exists, every case answer recomputes.
