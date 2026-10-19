# LING285 interface

This is a standalone static Study Studio. Serve the repository with any static HTTP server and open `/ling285/`. No package installation or build is needed. The interface fetches `data.json` and preserves personal state under `ling285-study-studio-v1` without reading another course's progress.

Every collection owns its numbered source sections. A section's stable `id` carries its notes, read mark, and open preference across collection, combined, core, guide, and visual-reader views. Written practice uses stable question IDs for drafts, revealed model answers, and self-ratings. “Ready” removes a prompt from the review queue; “Partial,” “Review,” and “Uncertain” add it. Revealing an answer never grades a draft.

The current mixed set samples up to 20 prompts without replacement. Lecture sets use questions that cite the selected collection. Later content editions can replace the active bank while preserving IDs for unchanged material. Unknown or retired IDs are filtered when progress loads. No multiple-choice or inferred automatic marking is applied to short explanations.

The data contract is `data.json` with `course`, `collections`, `questions`, `guide`, and `coverage`. Optional guide `kind` values `experiment`, `demonstration`, or `connection` populate the demonstrations view. Source-page references use `{collection, page}`. A section's `assets` may include original images, GIFs, videos, or audio. GIFs and playable media remain prominent; additional static figure images are collapsible. Media downloads start when the relevant player is visible. No service worker or offline-complete claim is made.

Progress can be exported and imported in Sources & coverage. Import checks the course/version and fields, discards unknown IDs, caps file size at 5 MB, and merges personal entries. Storage failures produce a persistent visible warning and leave in-memory entries exportable. Backups are personal browser files, not account synchronization.

Run `node ling285/tests/app-smoke.cjs` from the repository root for browser checks against the current data. Use `--fixture` for an isolated UI fixture without touching course data. The script serves the repository temporarily and uses the installed Chromium/Playwright environment. Checks exercise navigation, original-source viewing, shared notes/read marks, conceptual self-assessment, reload persistence, backups, and mobile containment. A test run verifies interface behavior; it does not establish academic content completeness.
