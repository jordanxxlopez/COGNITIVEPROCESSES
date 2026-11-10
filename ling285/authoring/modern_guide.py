"""Section 01. Readiness guide, compared with PSYC301's modern secondGuide."""
GUIDES = []

def G(id, module, title, points, question, answer):
    GUIDES.append(dict(id='modern-guide-'+id, moduleId=module, title=title,
                       points=[dict(concept=k, collection=c, pages=p) for k,c,p in points],
                       question=question, answer=answer))

G('oscillation','module2','Explain how a restoring force and inertia produce a cycle.',
  [('directions','lecture11',[2]),('mass-stiffness','lecture11',[3])],
  'Why does a moving mass continue past equilibrium even though the spring pulls it back?',
  '**Inertia keeps the mass moving** as it reaches equilibrium. The restoring force then acts against the continued motion until the mass turns around, starting the opposite half of the cycle.')
G('modes','module2','Recognize a mode as a coordinated pattern of the whole system.',
  [('two-modes','lecture11',[4]),('three-modes','lecture11',[6]),('many-modes','lecture11',[7])],
  'Why does adding a third moving mass permit another normal mode?',
  'Another independently moving part adds another way for the coupled system to coordinate its motion. **Three masses have three modes** in this one-direction model, each involving the system as a whole.')
G('perturbation','module2','Predict a local frequency change from motion and deformation.',
  [('local-change','lecture12',[9,11]),('constriction','lecture13',[13])],
  'Why can adding mass and stiffness at one location raise one mode and lower another?',
  'That location can be strongly deformed in one mode and strongly moving in another. **Extra stiffness matters where deformation is strong**, while **extra mass matters where motion is strong**, so the two modes respond differently.')
G('boundaries','module2','Explain the frequency series by fitting patterns between the ends.',
  [('fixed-fixed','lecture13',[4,5]),('fixed-free','lecture13',[7,8,9])],
  'Why are all whole-number harmonics allowed for the ideal fixed-at-both-ends string but only odd multiples allowed for the ideal fixed–free string?',
  'A string fixed at both ends can fit any whole number of half-waves between its still endpoints. A fixed–free string must connect a still end to a maximally moving end, so **only odd numbers of quarter-waves** preserve its boundary conditions.')
G('test-theory','module2','Connect a physical theory to a recording that could test it.',
  [('membrane','lecture11',[9]),('scientific-method','lecture11',[10])],
  'What would a spectrum let you test about a periodic vocal-fold signal?',
  'It lets you check for **regularly spaced harmonic peaks**. That measured pattern can support the prediction of a periodic source rather than leaving the physical account as an untested description.')
G('air','module2','Keep air displacement separate from air compression.',
  [('air-modes','lecture12',[15,23])],
  'Can air be strongly compressed near a place where its displacement is small?',
  'Yes. Neighboring particles can move toward and away from a displacement node, producing strong changes in density and pressure there. **Small local displacement does not imply little compression**.')
G('vowels','module2','Use the constriction location to explain each vowel pattern.',
  [('vowel-shape','lecture12',[16]),('u','lecture12',[19]),('i','lecture12',[20]),('a','lecture12',[21])],
  'What separates the /i/ and /a/ patterns without memorizing a table of frequencies?',
  'Their constrictions fall at different locations within the mode patterns. In the /i/ model **F1 falls and F2 rises**, while the /a/ model reverses those effects because compression and motion dominate in the opposite modes.')
G('source-filter','module2','Separate the source’s harmonic spacing from the filter’s resonances.',
  [('source','lecture14',[15]),('filter','lecture14',[16]),('sparse-harmonics','lecture14',[17])],
  'Does raising pitch necessarily turn /i/ into /a/?',
  'No. Raising pitch changes **F0 and the harmonic spacing**. Vowel quality depends strongly on the **formant pattern produced by the tract**, although very sparse harmonics can make that pattern harder to identify.')
G('acoustic-displays','module2','Describe what a spectrum and a spectrogram each preserve.',
  [('spectrogram','lecture13',[23]),('continuous-speech','lecture14',[19])],
  'How does a spectrogram make a changing vowel pattern visible?',
  '**Time runs horizontally, frequency vertically, and darkness represents amplitude**. Following the dark formant bands through time reveals how the resonances change as the tract moves.')
G('context','module2','Explain why speech information can cross a segment boundary.',
  [('splice','lecture14',[20])],
  'Why can a vowel taken from na influence a consonant fragment taken from ma?',
  'The following vowel contains an acoustic transition associated with the preceding /n/. **Listeners use information over a stretch of speech**, so that transition can outweigh the consonant fragment’s origin.')
G('classifier','module2','Trace the path from two formants to a five-category decision.',
  [('vowel-network','lecture14',[21,22]),('weights','lecture14',[23]),('forward','lecture15',[3])],
  'What is learned in a network that receives F1 and F2?',
  'The **weights** are learned. They determine how the measured formants influence successive hidden representations and ultimately the distribution over the five vowel categories.')
G('target','module2','Distinguish a valid prediction from the correct target.',
  [('probabilities','lecture15',[6]),('training-data','lecture15',[9])],
  'Can a prediction add up to one and still be wrong?',
  'Yes. Adding to one makes it a valid probability distribution, but it can still favor the wrong vowel. The **target identifies the actual category** and provides the comparison needed to calculate the error.')
G('backward','module2','Explain why an early weight depends on downstream error information.',
  [('weight-direction','lecture15',[7]),('backward','lecture15',[8])],
  'Why does backpropagation begin at the output rather than the first hidden layer?',
  'The last layer is most directly connected to the error. Earlier effects pass through more intermediate computations, so **backpropagation reuses downstream results** to work out their contributions efficiently.')
G('program','module2','Read a network definition and recognize each training operation.',
  [('sequential','lecture14',[25]),('training-code','lecture15',[10])],
  'What changes when a three-neuron hidden layer is inserted before five output neurons?',
  'The preceding connection must produce **three values**, and the new output connection must accept those three and produce **five**. The input remains two formant values, and all adjacent layer sizes must still match.')
G('nonlinearity','module2','Explain what sigmoid changes between processing layers.',
  [('sigmoid','lecture15',[11]),('sigmoid-flow','lecture15',[12,13])],
  'Why must later activations be recalculated after sigmoid changes a hidden value?',
  'Those layers receive the changed value as an input. **The transformation changes the entire downstream computation**, so the original final probabilities cannot simply be left in place.')
G('training-result','module2','Read training accuracy in relation to the vowel data.',
  [('overlap','lecture16',[5]),('accuracy','lecture16',[15]),('initialization','lecture16',[16])],
  'What does it establish when several initializations reach the same training accuracy?',
  'It supports that shared outcome for the displayed setup despite different learning paths. **Training accuracy concerns the supplied training examples** and does not by itself establish performance on new speakers.')
G('sequence','module2','Explain why sequence prediction requires context.',
  [('recurrent','lecture17',[3]),('next-token','lecture17',[5])],
  'How is predicting the next item different from classifying one isolated vector?',
  'The prediction uses relationships across the available sequence. **Context from other items** can change which continuation receives support, even when an individual item is the same.')
G('phonotactics','module2','Connect allowed sound sequences to next-letter predictions.',
  [('phonotactics','lecture18',[6]),('letter-guess','lecture18',[7])],
  'Why can a good next-letter predictor reveal knowledge of English word patterns?',
  'Good predictions must respect which continuations fit the context. **Phonotactic and spelling restrictions narrow the choices**, so learning the completion task can capture those regularities.')
G('architecture','module2','Distinguish parallel heads, successive layers and communicating agents.',
  [('heads','lecture18',[3]),('dynamic-depth','lecture18',[4]),('agents','lecture18',[2])],
  'How is a critic agent different from an attention head?',
  'An **attention head** contributes a computation within a model layer. A **critic agent** is a model assigned a checking task in a larger system, whose message can guide another agent’s revision.')

G('speech-actions','module1','Explain speech sounds through coordinated physical actions.',
  [('speech','lecture01',[2,3]),('acoustics','lecture01',[4]),('consonants','lecture02',[6])],
  'What makes /n/ similar to /d/, and what makes it different?',
  'Both use **voiced alveolar closure**. For /n/, the lowered velum permits air through the nose, while /d/ is an oral stop.')
G('completion','module1','Connect completion behavior to learned relationships.',
  [('closure','lecture02',[8,9]),('completion','lecture02',[10,11])],
  'Why does completing a sequence test more than recognition of its separate parts?',
  'The missing part must fit relationships among the available parts. **Context constrains a suitable completion**, so the answer reveals learned regularities.')
G('error-learning','module1','Predict the direction of a correction before calculating it.',
  [('sgd','lecture02',[17]),('sgd-up','lecture03',[19]),('rate','lecture02',[18,19])],
  'If an observation exceeds the estimate, which way should the averaging update move?',
  'It should move **upward toward the observation**. The discrepancy is negative, so subtracting a fraction of it increases the estimate.')
G('systems','module1','Identify how a system’s elements and relationships produce its behavior.',
  [('system','lecture03',[3,5,6]),('octopus','lecture03',[4,7])],
  'Why is a list of the speech organs not a complete explanation of speaking?',
  'The organs must be **coordinated through relationships over time**. Their interactions organize the changing tract configuration that carries the intended message.')
G('routes','module1','Compare greedy search, exhaustive search and dynamic programming.',
  [('greedy','lecture04',[4]),('exhaustive','lecture04',[6]),('dynamic-programming','lecture04',[7,8,12]),('value','lecture04',[13])],
  'What work does dynamic programming avoid repeating?',
  'It stores the best answer for a shared subproblem once. **Every route requiring that solved remainder can reuse it**, rather than recalculating it independently.')
G('objective','module1','Separate the quantity being optimized from the path’s appearance.',
  [('least-time','lecture04',[14,15])],
  'Why can the fastest route be longer than the shortest route?',
  'Travel speed can differ across regions. **Time depends on distance and speed**, so extra distance in a faster region can reduce total travel time.')
G('oscillator-state','module1','Keep equilibrium, stopping and a turning point separate.',
  [('position-velocity','lecture05-06',[3,4,6]),('oscillation','lecture07',[4,7,8]),('settling','lecture07',[6])],
  'Can a mass have zero velocity while being away from equilibrium?',
  'Yes. **At a turning point**, its velocity is momentarily zero while its displacement creates a restoring acceleration toward equilibrium.')
G('hearing','module1','Use mass and stiffness to explain frequency-selective hearing.',
  [('mass-stiffness','lecture07',[13]),('cochlea','lecture08',[5,6,7]),('source','lecture08',[8])],
  'Which region of the basilar membrane responds best to high frequencies, and why?',
  'The **light, stiff region** responds best to higher frequencies. Low mass and strong restoring stiffness support faster vibration.')
G('simulation','module1','Explain what a numerical update approximates.',
  [('euler','lecture08',[9,10,11]),('settling','lecture09',[4])],
  'Why can two update rules produce different oscillator paths?',
  'They can use different state values when computing the next step. **The approximation rule affects the numerical behavior**, even when both methods aim to represent the same continuous system.')
G('recognition','module1','Connect numerical pattern matching to a recognition decision.',
  [('templates','lecture09',[13,15]),('hierarchy','lecture09',[14]),('weights','lecture10',[6])],
  'How do template matching and hierarchical processing contribute different things?',
  '**Template matching compares patterns**, while **hierarchical processing transforms representations through stages**. A network can use weighted comparisons at several successive stages.')
G('learning-inference','module1','Separate using learned weights from changing them.',
  [('forward','lecture10',[9]),('learning','lecture10',[12]),('bad-data','lecture10',[13])],
  'Why can a correctly implemented learning algorithm still learn the wrong target?',
  'It can receive incorrect training observations. **The algorithm follows the supplied data**, so data quality must be checked separately from the update rule.')
