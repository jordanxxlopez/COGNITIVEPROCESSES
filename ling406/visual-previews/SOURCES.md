# LING406 visual previews

These are teaching reconstructions and procedure previews, not recordings of participants. Frames are drawn deterministically in Python/Pillow and encoded with FFmpeg. No generative image/video model or Blender is used. Only a small researcher/condition title is burned into each film; source notes stay below the player.

## Included sources and methods
### Tanenhaus et al. · One apple

- Course sections: sentence-12, sentence-13.
- Primary source: https://shotam.github.io/LING611_papers/Tanenhaus_1995.pdf (pages 1633–1634).
- Status: Flat reconstruction.
- The 1995 study used real tabletop objects. This overhead reconstruction preserves the one-apple object set and intended final action. Object appearance, movement timing and the omitted hand are illustrative. It does not show a measured gaze trace or an observed participant recording. The existing studio instruction recording is reused, not claimed as the original experimenter's recording.

### Tanenhaus et al. · Two apples

- Course sections: sentence-14, sentence-15.
- Primary source: https://shotam.github.io/LING611_papers/Tanenhaus_1995.pdf (pages 1633–1634).
- Status: Flat reconstruction.
- The pencil is replaced by an apple on a napkin, as in the paper's two-referent condition. The same instruction now identifies which apple to move. This is a code-drawn reconstruction of real objects, with illustrative movement timing and no measured gaze data. An early look toward the empty towel is not represented as a required move to that towel.

### McMurray et al. · Picture selection

- Course sections: speech2-10, speech2-11, speech2-12, speech2-13, speech2-14.
- Primary source: https://www2.psychology.uiowa.edu/Faculty/McMurray/publications/mcmurray-jpr.pdf (pages 86–88; Figure 3).
- Status: Silent procedure preview.
- Uses Figure 3 as reproduced in the original course slide, not newly drawn substitutes. The initial picture preview lasts 500 ms. The center click starts the listening portion; the later picture click is an illustrative response, not recorded participant data. This preview is silent because the original 0–40 ms Klatt-synthesized tokens have not been recovered and verified. The paper's actual trial included an auditory token and eye tracking. No ordinary word recording has been substituted.

### Levi & Polat · Line alignment

- Course sections: l1-critical-06.
- Primary source: https://uripolat.wordpress.com/wp-content/uploads/2011/05/1996-plasticity-amblyopia.pdf (pages 6830–6831).
- Status: Parameter-based reconstruction.
- The original Vernier task presented two abutting dark lines for one second through a circular aperture, with monocular viewing. Participants rated offsets from −2 to +2 and received feedback. This movie preserves the line geometry and one-second exposure, but enlarges offsets for visibility; screen pixels, luminance, angular size, intertrial pauses, sequence and appearance are illustrative. It is not a calibrated acuity test, an exact oscilloscope simulation, or a recording of the original trials.

## Study selection
Reviewed all 37 experiment/demonstration groups in the current LING406 data.js. This initial visual set covers three studies, with separate one- and two-apple conditions.
- Included: Tanenhaus/Spivey object manipulation; McMurray picture selection; Levi & Polat Vernier display.
- Deferred: other picture-matching, joint-attention, Gertner action videos and Marian/Spivey bilingual displays until original assets/procedures can be verified. Do not present invented actors, actions or pictures as those experiments.
- Omitted: sound-only categorical-perception, statistical-learning and auditory grammaticality examples. Apparatus drawings or lecture diagrams do not by themselves establish what participants saw.

## Fidelity and timing
- Apple clips preserve the object sets and correct final destination. No inferred gaze dots or false move-to-empty-towel step. Existing adjacent audio remains independently available. The video uses the existing apple-instruction file, whose current provenance is in ../audio-examples-data.js.
- McMurray uses a crop of the published figure already reproduced on original lecture speech2 p10. It retains the original four pictures and spacing within the figure. At 30 fps, the picture preview is 15 frames. Center click at about 1.2 s and later selection are illustration choices. The sound token is omitted, not replaced with ordinary speech or a different study's continuum.
- Vernier: the paper reports 4 arcmin length and 0.9 arcmin width for preferred-eye testing, enlarged angular dimensions for amblyopic eyes, 80% Weber contrast, and 1-second exposures. The drawing uses an approximately matching line aspect ratio but no calibrated luminance or viewing distance. Vertical orientation is an illustrative example; many observers trained with oblique stimuli. Three offsets and pauses illustrate the stimulus, not the full rating/feedback protocol. A movie is not an acuity measurement.

## Rebuild and validation
Install Python 3.12, Pillow 11.3.0 and FFmpeg. From the repository root:
```
python ling406/visual-previews/render.py
python ling406/visual-previews/verify.py
node ling406/visual-previews/browser-test.cjs
```
The GitHub-hosted workflow renders, checks duration/frame counts/H.264 formats, tests browser playback and existing note preservation, and commits media only to the preview branch. It never pushes to main. Integration into main is separately performed after validation. validation.json records each file's SHA-256.
