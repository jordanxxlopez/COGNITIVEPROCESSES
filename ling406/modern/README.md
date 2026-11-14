# LING406 modern versions

Adds six transcript versions to the LING406 Study Studio and a **Modernize** button, in all three
modules (Module I · Midterm 1, Module II · Midterm 2, Module III · Final). Nothing older is changed:
Versions 1 to 18 in Module II and the four editions in Modules I and III stay exactly as they were.

| Dropdown label | id | Where the way of writing comes from | Modules |
|---|---|---|---|
| Version 20 · natural teaching transcript | `v20` | PSYC301 Version 20 | II (I and III already have a v20-style edition) |
| Version 21 · natural teaching notes with following slides | `v21` | PSYC301 Version 21 | I, II, III |
| Version 22 · natural teaching notes with researchers and years | `v22` | PSYC301 Version 22 | I, II, III |
| Notes 9.3 · clearest slide-by-slide notes | `n93` | LING285 Notes V9.3 | I, II, III |
| Notes 10.1 · bold main idea first | `n101` | LING285 Notes V10.1 | I, II, III |
| Simpler · answer first, one step per sentence | `simple` | LING285 Study this first, Simpler v3 | I, II, III |

The wording of the other courses is not reused. Each version's rules (how long, how sentences are built,
what is banned) were taken from how that version was written there, and every LING406 slide was then
written fresh under those rules from the slide's own text. The rules are in `authoring/BRIEF.md`.

## The Modernize button
Next to every Transcript dropdown. Click it and the dropdown shows only the six modern versions, the
notes switch to the last modern version used (Simpler the first time), and the slide stays beside the
notes while they scroll. Click again to see every version. The choice is saved per module in this browser
(`localStorage` keys `ling406-modern-m1`, `-m2`, `-m3`).

## Files
- `modern-versions.js`, `modern-versions.css`: loaded after each module's `app.js`. They wrap the app's
  `teachingBlocks`, `transcriptHTML`, `transcriptSelector` and `changeTranscriptVersion`; no `app.js` is edited.
- `packs/manifest.js`: which versions each module has. `packs/<module>-<version>.js`: one version's notes
  for one module, loaded only when that version is chosen.
- `authoring/export_sources.cjs`: writes `authoring/sources/<module>/<collection>.md` (slide text plus the
  existing reviewed notes) and `authoring/pages.json`.
- `authoring/text/<module>/<version>/<collection>.txt`: the notes. One line per page:
  `page|main bullet >> sub-bullet || next main bullet`. Empty after `|` for title and logistics pages.
- `authoring/build.cjs`: the checker and builder.
- `authoring/wire.py`: adds the tags to the three `index.html` files. Run it again after any rebuild of
  `module1/` or `module3/`, because their builders rewrite `index.html`.
- `authoring/board.md`: the review report.

## Commands (from the repo root)
    node ling406/modern/authoring/export_sources.cjs
    node ling406/modern/authoring/build.cjs check m2 n93 speech1 --warn
    node ling406/modern/authoring/build.cjs build
    python3 ling406/modern/authoring/wire.py
    node --test ling406/modern/tests/

**Before every commit:** the site reads only `packs/`, never `authoring/text/`. After any text change, run
`build`, then `wire.py`, then the tests. The test "every pack covers every page" fails if a pack is empty.
Commit 1ebc2bb shipped empty packs because this step was skipped.

`build` refuses to write a pack while any of its collections is missing or fails the checker.
In Module II the 55 review pages reuse the notes of the lecture page each one comes from, as every
earlier version does, except review page 54, which has its own line in `text/m2/<version>/review.txt`.

## Adding a deck or a module
1. Add the deck to the module the usual way, then run `export_sources.cjs`.
2. Write `text/<module>/<version>/<collection>.txt` for each version to `BRIEF.md`.
3. `build.cjs check` each file until it passes, then `build.cjs build`.
4. Bump the `V` string in `wire.py` and the `revision` suffix in `build.cjs`, run `wire.py`, and check in the browser.
