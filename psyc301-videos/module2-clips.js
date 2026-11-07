// Module II stimulus videos (added after the first collection). Appends to the same gallery.
(function(){ if(!window.PsycVideos) return; const extra = [
 {
  "id": "m2-sperling-whole",
  "title": "Sperling · Whole report",
  "group": "Memory",
  "refs": [
   "6:13",
   "6:14",
   "6:16",
   "6:17",
   "0:19"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 11,
  "method": "Full-screen display: a 50 ms flash of 12 letters in three rows, then a whole-report prompt. Letters are illustrative, not the original stimulus set.",
  "source": "https://sites.socsci.uci.edu/~whipl/staff/sperling/PDFs/Sperling_PsychMonogr_1960.pdf",
  "params": {},
  "file": "psyc301-videos/clips/m2-sperling-whole.mp4",
  "poster": "psyc301-videos/posters/m2-sperling-whole.jpg",
  "fps": 60
 },
 {
  "id": "m2-sperling-partial",
  "title": "Sperling · Immediate partial report",
  "group": "Memory",
  "refs": [
   "6:14",
   "6:15",
   "6:16",
   "6:17"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 11,
  "method": "A 50 ms flash of 12 letters, then a 650 Hz tone cues the middle row. The tone pitch and row layout are illustrative.",
  "source": "https://sites.socsci.uci.edu/~whipl/staff/sperling/PDFs/Sperling_PsychMonogr_1960.pdf",
  "params": {},
  "file": "psyc301-videos/clips/m2-sperling-partial.mp4",
  "poster": "psyc301-videos/posters/m2-sperling-partial.jpg",
  "fps": 60
 },
 {
  "id": "m2-sperling-delayed",
  "title": "Sperling · Delayed partial report",
  "group": "Memory",
  "refs": [
   "6:14",
   "6:15",
   "6:18"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 12,
  "method": "The same flash, then a one-second blank before the tone. One second is the illustrated delay only.",
  "source": "https://sites.socsci.uci.edu/~whipl/staff/sperling/PDFs/Sperling_PsychMonogr_1960.pdf",
  "params": {},
  "file": "psyc301-videos/clips/m2-sperling-delayed.mp4",
  "poster": "psyc301-videos/posters/m2-sperling-delayed.jpg",
  "fps": 60
 },
 {
  "id": "m2-brown-peterson",
  "title": "Brown–Peterson · Letters, number and count-back",
  "group": "Memory",
  "refs": [
   "6:23",
   "6:24",
   "6:25",
   "6:26"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 13,
  "method": "Three letters, then a number, then a count-back interval and recall prompt. The count is performed aloud by the participant and is not recorded.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-brown-peterson.mp4",
  "poster": "psyc301-videos/posters/m2-brown-peterson.jpg",
  "fps": 60
 },
 {
  "id": "m2-change-4",
  "title": "Change detection · 4 squares",
  "group": "Memory",
  "refs": [
   "6:37",
   "6:38",
   "6:39",
   "6:40"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 8,
  "method": "A 100 ms sample of 4 coloured squares, a 900 ms blank, then a test in which one square changes colour. Layout and colours are newly coded; no accuracy is measured.",
  "source": "https://awhvogellab.com/files/pdfs/luck_1997_capacity-features-conjuctions.pdf",
  "params": {},
  "file": "psyc301-videos/clips/m2-change-4.mp4",
  "poster": "psyc301-videos/posters/m2-change-4.jpg",
  "fps": 60
 },
 {
  "id": "m2-change-6",
  "title": "Change detection · 6 squares",
  "group": "Memory",
  "refs": [
   "6:37",
   "6:38",
   "6:39",
   "6:40"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 8,
  "method": "The same procedure with 6 squares. Layout and colours are newly coded; no accuracy is measured.",
  "source": "https://awhvogellab.com/files/pdfs/luck_1997_capacity-features-conjuctions.pdf",
  "params": {},
  "file": "psyc301-videos/clips/m2-change-6.mp4",
  "poster": "psyc301-videos/posters/m2-change-6.jpg",
  "fps": 60
 },
 {
  "id": "m2-conrad",
  "title": "Conrad (1964) · Visual letter sequence",
  "group": "Memory",
  "refs": [
   "9:8",
   "9:9",
   "0:10"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 14,
  "method": "Three ready spots, then six letters one after another every 750 ms. Sequence B C F M P X is illustrative, not a recovered trial. Recall is written.",
  "source": "https://support.pstnet.com/hc/en-us/article_attachments/360075187494",
  "params": {},
  "file": "psyc301-videos/clips/m2-conrad.mp4",
  "poster": "psyc301-videos/posters/m2-conrad.jpg",
  "fps": 60
 },
 {
  "id": "m2-brooks",
  "title": "Brooks (1968) · Remembering the F",
  "group": "Memory",
  "refs": [
   "9:14",
   "9:15"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 16,
  "method": "A block F is memorized, then its outline is walked in the response phase. Follows the lecture’s version; not a full reproduction of Brooks’s protocol.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-brooks.mp4",
  "poster": "psyc301-videos/posters/m2-brooks.jpg",
  "fps": 60
 },
 {
  "id": "m2-vogel",
  "title": "Vogel et al. (2005) · Ignore blue distractors",
  "group": "Memory",
  "refs": [
   "9:20",
   "9:21",
   "9:22"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 11,
  "method": "A cue, a brief array of red and blue bars, a retention blank and a test array. Positions and orientations are illustrative, not a recovered trial or EEG recording.",
  "source": "https://awhvogellab.com/files/pdfs/vogel_2005_neural-measures-indv-differences.pdf",
  "params": {},
  "file": "psyc301-videos/clips/m2-vogel.mp4",
  "poster": "psyc301-videos/posters/m2-vogel.jpg",
  "fps": 60
 },
 {
  "id": "m2-shepard-blender",
  "title": "Shepard & Metzler (1971) · Shape pairs",
  "group": "Memory",
  "refs": [
   "9:16",
   "9:17"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 22,
  "method": "Three pairs of 3D block shapes rendered in Blender: two rotated copies and one mirror image. Shapes are reconstructed, not cropped from the published figure.",
  "source": "https://doi.org/10.1126/science.171.3972.701",
  "params": {},
  "file": "psyc301-videos/clips/m2-shepard-blender.mp4",
  "poster": "psyc301-videos/posters/m2-shepard-blender.jpg",
  "fps": 60
 },
 {
  "id": "m2-triangle",
  "title": "Metcalfe & Wiebe · Triangle problem",
  "group": "Problem solving",
  "refs": [
   "10:5",
   "10:6",
   "10:7"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 17,
  "method": "Ten dots, then a three-move worked solution to point the triangle down. This is a worked example, not a participant’s trace or a warmth-rating protocol.",
  "source": "https://www.columbia.edu/cu/psychology/metcalfe/PDFs/Metcalfe%20Wiebe%201987.pdf",
  "params": {},
  "file": "psyc301-videos/clips/m2-triangle.mp4",
  "poster": "psyc301-videos/posters/m2-triangle.jpg",
  "fps": 60
 },
 {
  "id": "m2-chain",
  "title": "Metcalfe & Wiebe · Chain problem (3D)",
  "group": "Problem solving",
  "refs": [
   "10:5",
   "10:6",
   "10:7"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 21,
  "method": "Three-dimensional links rendered in Three.js: four three-link chains, three links opened and closed into one loop of 12. Worked example; the 15-cent cost is the problem’s.",
  "source": "Three-dimensional reconstruction made for this studio (authoring/psyc301/device-videos)",
  "params": {},
  "file": "psyc301-videos/clips/m2-chain.mp4",
  "poster": "psyc301-videos/posters/m2-chain.jpg",
  "fps": 60
 },
 {
  "id": "m2-candle",
  "title": "Duncker · Candle problem",
  "group": "Problem solving",
  "refs": [
   "10:8"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 17,
  "method": "Candle, box, tacks and matches. The solution tacks the box to the wall and stands the candle on it. A worked example, not a participant’s trace.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-candle.mp4",
  "poster": "psyc301-videos/posters/m2-candle.jpg",
  "fps": 60
 },
 {
  "id": "m2-two-strings",
  "title": "Maier (1931) · Two-string problem",
  "group": "Problem solving",
  "refs": [
   "10:9",
   "10:10"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 17,
  "method": "Two strings too far apart to hold together. Pliers tied to one string swing to the other. Geometry is illustrative.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-two-strings.mp4",
  "poster": "psyc301-videos/posters/m2-two-strings.jpg",
  "fps": 60
 },
 {
  "id": "m2-water-jugs",
  "title": "Luchins (1942) · Water-jug mental set",
  "group": "Problem solving",
  "refs": [
   "10:10",
   "10:11"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 21,
  "method": "Set one reaches 100 with B − A − 2C. Set two has a simpler route, A − C = 20. Volumes are exact; jug drawings are illustrative.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-water-jugs.mp4",
  "poster": "psyc301-videos/posters/m2-water-jugs.jpg",
  "fps": 60
 },
 {
  "id": "m2-hanoi",
  "title": "Tower of Hanoi · Three disks",
  "group": "Problem solving",
  "refs": [
   "10:13",
   "10:14",
   "10:15",
   "10:16"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 21,
  "method": "A valid seven-move solution for three disks. It shows the operators, not a participant’s search.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-hanoi.mp4",
  "poster": "psyc301-videos/posters/m2-hanoi.jpg",
  "fps": 60
 },
 {
  "id": "m2-checkerboard",
  "title": "Mutilated checkerboard · Pairing constraint",
  "group": "Problem solving",
  "refs": [
   "10:19",
   "10:20",
   "10:21",
   "10:22"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 17,
  "method": "The 8×8 board with two opposite corners of the same colour removed, marked with ×. Shows the pairing constraint, not a full tiling.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-checkerboard.mp4",
  "poster": "psyc301-videos/posters/m2-checkerboard.jpg",
  "fps": 60
 },
 {
  "id": "m2-jellybeans",
  "title": "Denes-Raj & Epstein · Jellybean choice",
  "group": "Judgment",
  "refs": [
   "12:20"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 14,
  "method": "Bowl A: 1 red in 10. Bowl B: 7 red in 100. A red bean wins a dollar. No choice or outcome is shown.",
  "source": "authoring/psyc301/version6/source-pages.json",
  "params": {},
  "file": "psyc301-videos/clips/m2-jellybeans.mp4",
  "poster": "psyc301-videos/posters/m2-jellybeans.jpg",
  "fps": 60
 },
 {
  "id": "m2-wason",
  "title": "Wason · 2–4–6 rule discovery",
  "group": "Judgment",
  "refs": [
   "12:17"
  ],
  "kind": "Reconstructed display (course-based)",
  "duration": 16,
  "method": "The experimenter says 2, 4, 6 fits a rule; proposed triples get spoken yes or no feedback. Triples are examples, not a participant’s recorded responses.",
  "source": "https://doi.org/10.1080/17470216008416717",
  "params": {},
  "file": "psyc301-videos/clips/m2-wason.mp4",
  "poster": "psyc301-videos/posters/m2-wason.jpg",
  "fps": 60
 }
];
 window.PsycVideos.clips.push(...extra); })();
