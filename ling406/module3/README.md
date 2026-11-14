# LING406 · Module III

Module III adds Weeks 10–12 and the supplied final review to the existing LING406
Study Studio. The module selector and sidebar link connect it with Module II.
The existing Module II sources, teaching editions, question bank, note IDs and
storage key are preserved.

- Six collections contain every original page in source order — Reading 1 (24),
  Reading 2 (31), Inflectional Morphology (30), Language and Thought (27),
  Sign and Braille (21), and the Final Review (52).
- All 185 source visuals are present. The PowerPoint is preserved verbatim and
  also has a LibreOffice PDF rendition with hidden slides included.
- Four transcript editions cover 175 instructional pages. Ten title, assignment
  and discussion-pause pages remain visible without padded teaching prose.
- The dropdown offers PSYC301 v20-style teaching, Original C Version 2,
  D Version 2 and Original C Version 3. Editions share source facts and supporting
  explanations, with separately authored C and D framing and page-specific
  visual interpretation. The compiler assembles those authored components into
  distinct readings rather than automatically paraphrasing source text.
- 17 guide topics, 19 experiment groups, core review and combined notes use the
  selected edition and original source visuals.
- 60 original questions provide ten per collection, a complete 60-question set,
  mixed 50- and 10-question sets, topic/core practice and missed/uncertain review.
  Twelve written prompts include covered model answers. These are practice
  materials, not instructor exam questions.
- Read marks and notes persist across views and edition changes. Module III's
  storage is isolated at `ling406-module3-study-studio-v1`. Module II retains
  `ling406-study-studio-v1`. Source-page IDs do not depend on transcript edition.
- Original external demonstration links are available with the relevant slides
  and in the video/source-demonstration gallery. No recordings are claimed to
  have been recovered from static PDFs.
- The offline shell includes the module's text and interface. Visited images and
  PDFs are cached as available. Unvisited source visuals require a connection.

The final review is dated 2025 and includes earlier-course connections. Its 37
matched pages reuse the appropriate lecture explanations while retaining their
own original visuals and note IDs. Fifteen other review pages include its title
and independently authored earlier-course explanations. The supplied review
informs study emphasis, not a claim about the exact current final-exam blueprint.
Module I was added later (commit 475d6ff); see `../module1/README.md`.

## Authoring and rebuilding

The human-readable content rows in `authoring/content/` hold page-specific C
framing, explanatory steps, D framing, and visual/interpretive detail. Blank
instructional fields intentionally identify noninstructional source pages.
`authoring/build_content.py` contains the explicit review mapping, guide and
experiment groupings and written prompts. `authoring/questions.txt` holds the
question bank with canonical answers and explanations. No outside course
substance is pulled into the explanations by the compiler.

```sh
# When converting the preserved PowerPoint with LibreOffice:
libreoffice --headless --convert-to 'pdf:impress_pdf_Export:{"ExportHiddenSlides":{"type":"boolean","value":"true"}}' --outdir ling406/module3/sources ling406/module3/sources/morphology.pptx
python ling406/module3/authoring/prepare_sources.py
python ling406/module3/authoring/build_content.py
python ling406/module3/authoring/build_release.py
node --check ling406/module3/app.js
node --check ling406/module3/sw.js
# Serve the repository in another terminal, then run the browser checks.
python -m http.server 8907
python ling406/module3/tests/release.py
```

`TEMPLATE.md` and `SOURCE-MAP.md` preserve the initial template and source-analysis
specification. This README describes the completed module and supersedes their
initial pending-status statements. `build_template.py` is an intermediate step
used by the release builder, not the last command for creating a release.

## Validation

Release checks cover source hashes, ordered page coverage, four distinct editions
per instructional page, original visuals, writing constraints, source-linked
questions, all 60 canonical grades under shuffled choice order, saved quiz and
note persistence, cross-module state isolation, every workspace route, reader
boundaries, all 740 edition/page renders, search, desktop/mobile themes, and the
offline text shell. Browser screenshots are reviewed separately.
