# LING406 · Module I

Module I uses the existing LING406 interface, shared green/blue palette, source
reader, study timer, search, note boxes and practice engine. Its entry point is
`ling406/module1/`. The shared course-module buttons link Modules I, II and III.

The nine source collections cover Lectures 1–10. Lectures 1 and 2 are combined
in one source file; Lecture 10 is the Midterm 1 review. Original pages remain in
source order, including noninstructional pages. Four teaching editions occupy
the same page and use the same notes and read marks.

The module includes its own home screen, guide, selected core review, experiments,
source demonstrations, combined notes, collection quizzes, cumulative practice,
written prompts, missed-question queue and source coverage. Counts are computed
from `data.js`; the interface never hard-codes a total or per-collection quiz size.

Module I stores its progress at `ling406-module1-study-studio-v1`. The earlier
empty Module I page's theme and sidebar preferences are carried over from
`ling406-module1-preferences` when no Module I study preference exists. Module II
and Module III sources, content, IDs and storage keys are untouched. Its offline
shell also has a separate cache name.

## Rebuild the interface

Run `python ling406/module1/authoring/build_interface.py` from the repository root.
The script derives the interface from the released Module III template and writes
only Module I's `app.js`, `index.html` and `sw.js`. It does not prepare sources or
write `data.js`.

## Data contract

`data.js` assigns `window.LING406_MODULE1` with the same schema as Module III:

- `modules` contains `id`, `number`, `title`, `source` and ordered `sections` IDs.
- `sections` contains `id`, `module`, `source`, `page`, `title`, `image`,
  `sourceText` and `core`. `noteId` and `reviewPages` are optional.
- `sources` is keyed by source ID and contains `format`, `file`, `pdf`, `original`
  and `pages`. Paths are relative to the Module I directory.
- Four `editions` contain a `label` and `scripts`, keyed by section ID. A script
  has `blocks`, each with `text` and `children`. Edition `description` is optional.
- `questions` contains `id`, `module`, `section`, `kind`, `stem`, `choices`,
  `correct` and `why`. `correct` refers to the canonical choice index.
- `guide` and `experiments` contain `title`, `module` and `sections` IDs.
- `written` contains `id`, `module`, `section`, `prompt` and an `answer` array.
- `revision` identifies the question-bank revision. Optional `testAllocation`
  supplies per-module cumulative-test quotas; absent quotas include each pool.
- The review module has ID `review`.
- Optional `media` entries contain `section`, `title`, `url` and `kind`. `type`
  may be `audio` or `video` for local native playback. Other entries are links.
  Optional `coverage.reviewMappings` maps review page numbers to lecture IDs.

The authoring manifest, coverage report and source extraction inventory record
source processing and content validation separately from the interface.

## Source preparation and content build

The nine supplied originals contain 294 pages. Run `authoring/prepare.py` after
placing the originals and the complete 23-page PowerPoint PDF rendition in
`sources/`. The PDF rendition includes hidden slides. The source PowerPoint is
retained unchanged. Extracted text uses the PDF content order because geometric
sorting scrambles the rotated lecture exports. Original page visuals remain
unchanged. Contact sheets and page inventories support the visual audits.

Run `python ling406/module1/authoring/build_data.py` to compile the hand-authored
JSON in `authoring/content/`. Review mappings are explicit and visually checked.
Four editions share checked facts while varying explanatory depth and emphasis.
The D edition retains the C explanation and adds its authored teaching detail.

Run a local server and set `STUDIO_BASE` when running
`python ling406/module1/tests/release.py`. The browser test verifies source
coverage, every page/edition reader combination, grading and storage isolation.
The supplied review describes short essays, so written practice is exposed in
both the main navigation and home screen alongside multiple-choice practice.
