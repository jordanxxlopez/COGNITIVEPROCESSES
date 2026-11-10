"""Section 04. Source demonstrations and experiments in connected teaching prose."""
CARDS=[]
def E(id,concept,collection,pages,title,kind,explain,outcome,interpret):
    CARDS.append(dict(id='modern-card-'+id,concept=concept,collection=collection,pages=pages,
      moduleId='module2' if int(collection[7:9])>=11 else 'module1',title=title,kind=kind,
      explain=explain,outcome=outcome,interpret=interpret))

E('mass-stiffness','mass-stiffness','lecture11',[3],
 'What changes when the same oscillator becomes heavier or stiffer?','Source demonstration',
 'The comparison changes **mass** in one system and **stiffness** in another while retaining a reference oscillator. Watching the cycles over the same interval separates a change in frequency from a change in the size of the movement.',
 'The heavier system completes fewer cycles, while the stiffer system completes more. **More inertia slows reversal, and stronger restoring force speeds it up**.',
 'The useful prediction specifies what changed and what was held constant. Making the mass move farther is an amplitude change and is not itself the frequency comparison being tested.')
E('two-masses','two-modes','lecture11',[4],
 'Why do two connected masses have a slower pattern and a faster one?','Source demonstration',
 'Two equal masses are connected between fixed supports. One pattern moves them together, another moves them in opposite directions, and a further display combines the two patterns.',
 'The opposing pattern stretches the middle connection more strongly and has the higher frequency. **The mixture contains both modes**, even though its combined motion is not one simple normal mode.',
 'A mode describes coordinated motion of the whole system. The two masses do not each own a separate independent frequency while vibrating in one normal mode.')
E('middle-mass','three-modes','lecture11',[6],
 'Would making the middle mass heavier slow every mode?','Review prediction exercise',
 'The three-mass pattern has a middle mass that moves in Modes 1 and 3 but remains stationary in Mode 2. The proposed change adds mass only at that middle position.',
 '**Modes 1 and 3 shift downward**, while Mode 2 is unchanged in the ideal symmetric system. Extra inertia matters only where the mode has motion.',
 'This is a directional application of the mode patterns, not a newly measured result. It answers the Exam 2 review’s local-mass question without inferring effects from arbitrary drawing amplitudes.')
E('local-perturbation','local-change','lecture12',[11],
 'How can one local change push two mode frequencies in opposite directions?','Source comparison',
 'The same marked location is strongly moving in one string mode and stationary but strongly deformed in another. The comparison increases mass and stiffness at that location together.',
 'The mode dominated by local motion shifts downward because of the added mass. The mode dominated by local deformation shifts upward because of the added stiffness.',
 '**Location within each mode determines which effect matters**. Treating the simultaneous changes as an automatic cancellation loses the spatial information that makes the prediction possible.')
E('test-voice','scientific-method','lecture11',[10],
 'Does a recorded periodic voice have the predicted harmonic spacing?','Transcript-described measurement',
 'A physical account of the voice predicts regularly spaced harmonics. Recording a sustained voiced sound and inspecting a spectrum provides a measurable comparison with that prediction.',
 'The transcript describes checking the lowest harmonic and a neighboring harmonic, finding the expected spacing. The relevant result is **regular spacing tied to the periodic source**, rather than the memorization of one speaker’s measured pitch.',
 'The measurement connects theory with an observable pattern. It supports the predicted relationship while leaving the original source and measurement context available for inspection.')
E('end-conditions','fixed-free','lecture13',[4,8,9],
 'Why do changing endpoint constraints change the allowed frequency series?','Source demonstration',
 'The fixed-at-both-ends string must remain still at both ends. The fixed–free example must remain still at one end and reach maximal displacement at the other.',
 'Whole numbers of half-waves fit the first arrangement. **Odd numbers of quarter-waves** fit the second arrangement, producing the ideal odd-multiple series.',
 'The endpoint conditions determine which patterns are allowed. The comparison concerns the ideal source models, with their own tuning, rather than a claim that every real building has perfectly odd-spaced resonances.')
E('vowel-constrictions','constriction','lecture12',[19,20,21],
 'Why does moving a constriction change the relationship between F1 and F2?','Source demonstration',
 'The three configurations place loading near the lips, near the front constriction for /i/, or nearer the /a/ constriction. The local motion and compression patterns are checked separately for the first two modes.',
 '**/u/ lowers both formants, /i/ lowers F1 and raises F2, and /a/ raises F1 and lowers F2** in the illustrated models. The same kind of local physical change can therefore have different consequences at different positions.',
 'The explanation is the relationship between the constriction and the mode pattern. A memorized list of directions is less useful than knowing which mode moves or compresses at the narrowed location.')
E('source-filter','filter','lecture13',[20,21,22],
 'Can one harmonic source acquire different vowel qualities?','Source comparison',
 'The source supplies regularly spaced harmonic peaks. Different tract filters favor different frequency regions while the source spacing can remain the same.',
 'The relative harmonic heights change around the **formant resonances**, producing different envelopes for the vowels. The filter does not have to move every harmonic frequency to change the sound’s quality.',
 'This separates the acoustic role of the vocal folds from the role of the tract. Pitch depends on source periodicity, while vowel quality depends strongly on the resonant shaping of that source.')
E('harmonic-sampling','sparse-harmonics','lecture14',[17],
 'Why is the same formant pattern easier to read with a lower-pitched source?','Source comparison',
 'The display applies comparable vowel filters to source rows with different F0 values. A higher F0 leaves fewer harmonic peaks within the same frequency window.',
 'Closely spaced harmonics trace the envelope more densely. **Sparse harmonics can miss a resonance region**, making the intended vowel pattern less clear.',
 'A less visible peak does not establish that the tract stopped having that resonance. The comparison separates the filter’s response from how densely the source samples it.')
E('spectrogram-transition','spectrogram','lecture13',[23],
 'How does a sequence of spectra become a picture of a changing vowel?','Source construction',
 'Each spectrum gives the frequency content of a short time window. Placing those windows in time order and mapping amplitude to darkness produces the spectrogram.',
 'The formant bands become trajectories through time. In the /i/ to /a/ comparison, **F1 rises while F2 falls** toward the new configuration.',
 'The resulting display preserves both frequency relationships and their timing. It adds information that cannot be recovered from a single isolated spectrum.')
E('ma-na','splice','lecture14',[20],
 'Why can a consonant from ma be heard as na after splicing?','Transcript-described listening experiment',
 'A consonant fragment is taken from ma and joined to the vowel portion of na. The fragments provide conflicting information about the identity of the preceding consonant.',
 'The transcript describes the resulting percept as **na**. The vowel’s formant transition carries information associated with /n/ and can dominate the decision.',
 'Listeners use context extending into the following vowel. The result argues against treating recognition as an independent decision on every tiny slice of sound.')
E('untrained-network','forward','lecture15',[3,6],
 'What does an untrained network do with an /i/-like input?','Source numerical example',
 'The two input formants fit the /i/-like category dean, but the current weights are not yet useful. A forward pass computes the category distribution from those weights.',
 'The displayed decision favors **done rather than dean**. The distribution can satisfy the probability rules while assigning its greatest support to the wrong category.',
 'A valid output format is different from an accurate classification. The target supplies the desired category so the network’s error can guide later learning.')
E('sigmoid-network','sigmoid-flow','lecture15',[11,12,13],
 'Does inserting sigmoid leave the final prediction unchanged?','Source processing comparison',
 'The formant inputs stay fixed while hidden weighted sums are passed through sigmoid. Each transformed hidden value becomes the input used by the following layer.',
 'The downstream activations and final output distribution change. **Changing the processing rule is enough to change the decision**, even before any training update occurs.',
 'This comparison does not establish that sigmoid by itself makes the classifier correct. It separates a nonlinear transformation of the forward computation from learning the weights.')
E('linear-training','accuracy','lecture16',[5,15],
 'How much of the vowel distinction does the displayed linear training run learn?','Reported source run',
 'The F1–F2 data contain overlapping vowel categories. The supplied curve tracks training accuracy as the linear network’s parameters are updated repeatedly.',
 'Accuracy rises above the roughly one-in-five baseline and levels off at **44.95 percent** in the displayed run. The source labels this curve as an equivalent NumPy reference run rather than executed PyTorch output.',
 'The run learns useful distinctions but still makes many training errors. Its final percentage describes this dataset, architecture and procedure, not a general ceiling on vowel recognition.')
E('repeated-training','initialization','lecture16',[16],
 'Do different random starting weights force different final accuracies?','Reported source comparison',
 'Ten runs use the same displayed training setup with different initial parameter values. Their accuracy curves can be compared over the same update range.',
 'The paths differ but all displayed runs end at **44.95 percent training accuracy**. Initial differences therefore do not force different final proportions correct in this setup.',
 'Repeated outcomes strengthen the observation for the supplied experiment. They do not guarantee that every initialization, implementation or new dataset will produce that result.')
E('letter-game','letter-guess','lecture18',[6,7],
 'What can the next-letter game reveal about English knowledge?','Source prediction exercise',
 'A beginning such as sp is supplied and the next letter must continue a possible word. Some beginnings permit many choices, while others strongly limit what can follow.',
 'The accepted continuations track the illustrated onset and spelling restrictions. **A good prediction requires sensitivity to the pattern**, even if no explicit verbal rule was given.',
 'The exercise motivates learning from completion. It is not a measured accuracy report for a trained language model, and its spelling examples should not be confused with a complete phonetic transcription.')

E('voicing','fricatives','lecture01',[8,9],
 'What changes between a sustained /f/ and /v/?','Source articulation exercise',
 'Both sounds use a narrow constriction between the lower lip and upper teeth. Sustaining each makes it possible to compare the airflow location while checking vocal-fold vibration.',
 '**/v/ is voiced and /f/ is voiceless**, while their place and fricative manner remain shared.',
 'The comparison isolates voicing from place. Moving to a dental or alveolar pair changes the place while preserving the same kind of voiced–voiceless contrast.')
E('closure','closure','lecture02',[8,9],
 'Why can an incomplete drawing still be perceived as a triangle?','Source perceptual demonstration',
 'The available marks do not supply a complete set of triangle edges. Their organization nevertheless supports a coherent whole.',
 '**Closure completes the pattern** rather than requiring every edge to be physically drawn.',
 'A cloze task transfers the completion idea to sequences. Filling in a missing word depends on the relationships already supplied by its context.')
E('rate-comparison','rate','lecture02',[18,19],
 'How do large and small correction rates change an estimate’s path?','Source comparison',
 'The learning process is run with different correction sizes. Its movement toward the average and its response to sample variation can be compared together.',
 'Larger rates move quickly and fluctuate more. **Smaller rates move slowly and more steadily** in this example.',
 'The comparison distinguishes speed from steadiness instead of treating every faster update as a better one.')
E('routes','dynamic-programming','lecture04',[4,6,7,13],
 'How can a route method stay accurate while avoiding exhaustive repetition?','Source worked comparison',
 'Greedy search chooses the cheapest next edge, while exhaustive search evaluates complete paths. Dynamic programming stores the best remaining cost from shared states.',
 'The stored values allow overlapping routes to reuse already solved continuations. **A locally cheap edge no longer substitutes for the full remaining cost**.',
 'The source comparison concerns the finite illustrated path problem. The saved subproblem solutions explain the gain in efficiency.')
