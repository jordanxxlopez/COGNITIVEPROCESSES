# LING285 Study Studio

Human Language and Technology · Fall 2026 · Khalil Iskarous.

The studio provides teaching notes alongside the original pages, numbered lecture collections, a selective must-know core review, a readiness guide, demonstrations, combined notes, and written conceptual practice. Notes explain cause and effect in the instructor's style. Practice includes model explanations and self-assessment criteria rather than automatic grading or exam predictions.

## Included material

All 26 supplied files are preserved and verified by SHA-256. The student workspace contains 216 lecture slides across 12 deck collections, covering Lectures 01–13 with 05–06 combined, plus supporting readings, the syllabus, and both uploaded review documents. These total 315 student-facing source pages. The 37-page LING406 reference PDF is retained separately as an organization reference and contributes no LING285 teaching or practice.

The current edition includes 80 written practice questions, 49 selected core-review pages, and 19 readiness and demonstration entries. Original page images, figure details, animations, videos, and audio remain available. Every teaching page records source provenance and completed visual-review checks in [teaching-coverage.json](authoring/teaching-coverage.json).

Source discrepancies are identified on the relevant pages. Unavailable external demonstrations, untranscribed audio, and unreadable details are qualified rather than reconstructed. The uploaded answer companion has unverified authorship; its answers are checked against the primary lecture sources. The file labeled Lectures 05–06 has an internal title of Lectures 4+5, so both labels are retained.

Personal notes, read marks, practice drafts, and review ratings are saved in the browser under a course-specific key. The Sources & coverage view can export and import a backup. See [UI-README.md](UI-README.md) for state and interface details.

## Run and verify

This is a static site with no package installation or production build. From the repository root, serve the checkout with a static HTTP server and open its `/ling285/` route.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

The existing prepared cloud environment supplies Node.js, Chromium, Playwright, Python, and the extraction tools. Run the content and browser checks from the repository root.

```sh
node --test ling285/tests/content.test.cjs
node ling285/tests/app-smoke.cjs
```

The content checks verify source and media hashes, references, coverage, selective core review, practice contracts, and important source corrections. The browser check starts its own temporary server and exercises navigation, readers, notes, read marks, practice, persistence, backup import/export, original media, and mobile containment. Neither check substitutes for academic source review.

## Add the next lecture

Follow [AGENTS.md](AGENTS.md) before authoring. Preserve the new original file, extend `authoring/upload-manifest.json`, extract its text and media, and inspect every rendered page and meaningful original asset. Keep existing lecture and section IDs stable so personal progress remains associated with the same content.

Write the new teaching sections in the authoring JSON collections. Update the active practice bank, readiness entries, and selective core references in `authoring/practice-guide.json` to cover the expanded material. Reuse question IDs only when the prompt retains the same meaning. Update the edition and revision in `authoring/build_studio.py`, then rebuild and run both checks. Superseded questions leave the active bank when their IDs are retired.

The assembly step verifies reviewed source coverage and copies original runtime assets by content hash.

```sh
python3 ling285/authoring/build_studio.py
```

## Reproduce extraction

Extraction requires PyMuPDF, Pillow, python-pptx, python-docx, lxml, LibreOffice, Tesseract, and ffmpeg/ffprobe. Original files already in `sources/` can be used when temporary upload paths no longer exist. The extraction and inventory commands below regenerate working material; review the resulting changes before rebuilding a released edition.

```sh
python3 ling285/authoring/extract_sources.py
OMP_THREAD_LIMIT=1 python3 ling285/authoring/inspect_embedded.py
python3 ling285/authoring/refresh_inventory.py
```

Source originals, converted PDFs, rendered pages, extracted text, authored teaching, inventories, and runtime assets are versioned. Duplicate extracted-media caches and contact sheets are ignored because they can be regenerated from the originals. Historical intake checkpoints describe the state at intake; current release coverage is recorded in [coverage-report.json](coverage-report.json).
