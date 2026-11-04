# Optional slides and audio in the end-of-review guide

On **What to know by the end**, the **Slides + audio** switch adds the specific original source slide beside each existing explanation. The explanation stays on the left and the corresponding slide, source link and any existing audio examples appear on the right. On narrow screens the matched slide/audio follows its explanation.

The switch starts off for a new browser and remembers the selected view. It is independent of the existing Transcript selector and works with all twelve transcript versions. Switching it off removes the added source panels and restores the original text-only layout. It preserves the current topic open/closed states, readiness marks, focus, teaching text and existing controls. Switching off also stops any recording that is playing.

Mappings come directly from the original `LING406.guide[].sections` list. There are 28 topics with 129 source-linked explanations. No slide was selected through keyword guesses, and no transcript, source, question or audio file was edited. Existing **Full explanation + visual**, **Expand this topic**, quiz and print controls are retained. The guide prints in its original text-only form.

The only existing application changes are the guide render/helper and click handler, one default display preference, and the index/service-worker references for the additional stylesheet. `tests/guide-visuals.cjs` compares each version's teaching HTML against the previously committed application and checks source/audio mapping, persistence, readiness/quiz/note preservation, mobile layouts, printing and actual playback. The audio regression test derives the current cache name instead of pinning an obsolete cache version.

The guide toolbar also provides **Expand all topics** and **Collapse all topics**. They operate only on its 28 top-level topic headings, in either view mode, without changing their contents or nested audio-source details. Collapsing all topics stops any playing example.
