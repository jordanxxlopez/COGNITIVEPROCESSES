"""Section 09. Explanatory connections, distinct from the experimental-result cards."""
CONNECTIONS=[]
def L(id,module,title,sources,paragraphs,question,answer):
    CONNECTIONS.append(dict(id='modern-link-'+id,moduleId=module,title=title,
       sources=[dict(collection=c,page=p) for c,p in sources],paragraphs=paragraphs,
       question=question,answer=answer))

L('top-lips','module2','The free top of a building helps explain loading near the lips.',
 [('lecture13',7),('lecture13',16),('lecture12',19)],
 ['A building is constrained at its base while its top can move. The neutral vocal-tract model gives its air column a corresponding **closed end and open end**, making the endpoint relationship useful despite the different materials.',
  'Adding moving mass at the free top slows the building mode in the ideal comparison. Loading the strongly moving lip region similarly lowers the first two resonances in the /u/ model.',
  'The explanation transfers **where the load acts within the mode**. It does not require air to bend sideways or every real building to have the same resonance ratios as a uniform tube.'],
 'Why would moving the load away from the free end require a new prediction?',
 'The new position can have different motion and deformation in each mode. **The endpoint conclusion cannot simply be copied to another location**.')
L('measurement-chain','module2','A physical speech mechanism can become information for a classifier.',
 [('lecture14',15),('lecture14',16),('lecture14',18),('lecture14',21)],
 ['Vocal-fold vibration supplies the periodic source, and the vocal tract shapes its harmonic strengths. Measuring the resulting sound gives information about the tract resonances.',
  '**F1 and F2 become numerical inputs** to the vowel network. The classifier then uses learned weights to turn those measurements into support for the possible categories.',
  'The measurement is not itself a category label. A tract configuration, an acoustic representation and a network decision are different stages connected by a causal and computational path.'],
 'Why can an F1–F2 measurement be sensible even when the network labels it incorrectly?',
 'The physical measurement and the learned decision have different roles. **Poor weights can misclassify a valid measurement**.')
L('patterns-spectrum','module2','A mode mixture connects visible motion with a spectrum.',
 [('lecture11',4),('lecture11',8),('lecture11',9)],
 ['Several normal modes can contribute to the movement recorded at one location. Their superposition can produce a complex time trace even when each component pattern is organized.',
  'A spectrum separates contributions by frequency. **The complex trace and its frequency components describe the same combined signal** in different representations.',
  'The contribution of a mode also depends on where the measurement is taken. A point that is a node for one component cannot display strong motion from that component.'],
 'Why can a single pickup fail to reveal one mode strongly?',
 'The pickup can lie near that mode’s **displacement node**, where its contribution to the local movement is small.')
L('perturbation-inverse','module2','A frequency shift can reveal what a location was doing.',
 [('lecture13',13),('lecture13',17),('lecture12',11)],
 ['A forward prediction starts with the local role and predicts the direction of change. A motion-dominated region responds strongly to added inertia, while a compression-dominated region responds strongly to stiffness.',
  'The reasoning can also be used in reverse. **A large upward resonance shift points toward a dominant restoring-stiffness effect** at the changed location for that mode.',
  'The inference stays mode-specific because another mode can use the same location differently. A result about F2 should not be silently generalized to F1.'],
 'What would a downward shift suggest under the same constriction model?',
 'It suggests that the **motion-related inertial effect dominates** for that mode at that location.')
L('context-speech','module2','Speech recognition and sequence prediction both benefit from context.',
 [('lecture14',20),('lecture17',3),('lecture17',5)],
 ['A following vowel can carry information about a preceding consonant. The splice example therefore makes clear that the relevant evidence extends beyond a narrowly isolated segment.',
  'A sequence model likewise uses context when deciding a continuation. **Relations among items can contribute information that no single item supplies alone**.',
  'The two cases illustrate the value of context at different levels. The splice result does not establish that human speech perception implements a particular language-model architecture.'],
 'What is lost when every input fragment is classified independently?',
 'The system loses **relationships across fragments**, including transitions and contextual restrictions that can help resolve an identity.')
L('backward-routes','module2','A downstream error calculation resembles a reusable route value.',
 [('lecture04',13),('lecture15',8)],
 ['A shortest-path value summarizes a solved continuation that many earlier routes can use. Calculating that same continuation independently for each path would repeat work.',
  'An early neural connection also depends on downstream computations. **Backpropagation solves and reuses those dependencies** instead of independently tracing every full route from every early parameter to the error.',
  'The shared principle is dynamic programming over dependent calculations. The numerical quantity in the network is a derivative of loss, rather than the distance remaining on a road.'],
 'Why is the comparison useful even though a derivative is not a route cost?',
 'Both problems can reuse **shared solved subproblems**. The organizational relationship transfers without making the two quantities identical.')
L('state-knowledge','module2','Current activations and learned weights contribute different kinds of information.',
 [('lecture14',23),('lecture15',3),('lecture17',3)],
 ['Activations express the values being processed for the current input and context. Weights determine how those values influence the next computation.',
  'A recurrent state can carry information between steps without replacing every learned connection. **What is currently being processed differs from the parameters that organize processing**.',
  'Learning changes parameters using feedback, while ordinary inference can change activations repeatedly with the parameters held fixed. This distinction remains useful as a model becomes deeper or processes longer sequences.'],
 'Does a different activation pattern prove that learning occurred?',
 'No. A new input or context can change activations during **inference with unchanged weights**.')
L('time-depth','module2','Repeated transformation links physical dynamics with network depth.',
 [('lecture18',4),('lecture05-06',3)],
 ['A physical oscillator repeatedly updates its state through time. A deep model repeatedly transforms its representations as they pass through processing layers.',
  'Both accounts require identifying **the current state and the rule producing the next state**. This makes a changing numerical representation easier to understand as a process.',
  'The analogy has limits because different network layers can have different weights. Repeated transformation does not require a literal physical oscillator or one identical matrix reused everywhere.'],
 'What remains useful when the rule differs from layer to layer?',
 'The idea that **the output representation of one step becomes the input state of the next** remains useful.')
L('completion-learning','module2','Next-letter practice gives a small example of learning from completion.',
 [('lecture18',5),('lecture18',6),('lecture18',7)],
 ['A word beginning limits which letters can plausibly follow. Correctly predicting the next letter therefore requires sensitivity to patterns already present in the sequence.',
  'A model can learn from the gap between its predicted distribution and the actual continuation. **Completion makes language regularities available as training information** without providing a separate verbal explanation of every rule.',
  'The representation still matters. Written-letter patterns can reflect spelling as well as sound structure, so successful completion should be interpreted in relation to what the model actually receives.'],
 'Why is a broad next-letter distribution sometimes appropriate?',
 'Some contexts allow many plausible continuations. **Knowledge can support uncertainty**, rather than always requiring one sharply favored answer.')
L('feedback-checking','module2','A critic-and-reviser loop adds feedback at the system level.',
 [('lecture18',2),('lecture18',3)],
 ['An agentic system can assign drafting and checking to different models. Feedback from the critic then changes the next revision rather than being discarded after the first response.',
  '**The loop operates between task-performing models**, while attention heads and hidden layers operate inside a model. Keeping those levels separate makes the diagram’s organization clear.',
  'A checking process can improve an answer but still requires evidence about what it caught. The presence of a critic is a procedure, not a guarantee that every remaining statement is true.'],
 'How could the checking process be evaluated?',
 'Compare its claims with **independent source evidence** and check whether the revisions actually resolved the identified problems.')

L('feedback-rate','module1','Learning and physical settling can share a direction of correction.',
 [('lecture02',17),('lecture04',18),('lecture07',6)],
 ['A first-order return rule changes a state against its deviation from a target. The averaging update similarly moves an estimate toward sampled observations.',
  'A larger correction coefficient changes the speed of adjustment. **The shared relationship concerns feedback**, while sample variability and physical inertia add different behavior in different models.',
  'An undamped mass–spring system can repeatedly overshoot because of inertia. That extra mechanism should not be inserted into a first-order settling example simply because both use a target.'],
 'Why is “both move toward a target” not a complete account of oscillation?',
 'Repeated overshoot also needs an account of **continued motion and reversal**, not only the direction of the restoring correction.')
L('production-perception','module1','The physical production of a contrast supplies information for hearing it.',
 [('lecture01',8),('lecture02',6),('lecture08',7)],
 ['Voicing, place and manner describe changes in how the speech organs produce sound. Those changes alter the acoustic pattern available to a listener.',
  'The cochlea separates frequency information through its mechanical response. **A physical articulatory difference can therefore become distinguishable neural information** after several connected stages.',
  'The articulatory description and the auditory description have different jobs. A full explanation connects them without treating a sound’s written letter as its mechanism.'],
 'Why is naming the letter alone a weak explanation of a consonant contrast?',
 'The letter does not explain **the articulatory action or acoustic consequence** that distinguishes the sounds.')
