"""Section 05. Comparable ideas, with full sentences instead of report labels."""
CONTRASTS=[]
def P(id,concept,collection,pages,title,left,right,why,example):
    CONTRASTS.append(dict(id='modern-contrast-'+id,concept=concept,collection=collection,pages=pages,
      moduleId='module2' if int(collection[7:9])>=11 else 'module1',title=title,
      left=dict(term=left[0],text=left[1]),right=dict(term=right[0],text=right[1]),paragraphs=[why,example]))

P('mass-stiffness','mass-stiffness','lecture11',[3],'Mass and stiffness change frequency in opposite directions.',
 ('Mass','**Mass resists changes in motion**. Increasing the moving mass makes acceleration and reversal slower when the restoring stiffness stays fixed.'),
 ('Stiffness','**Stiffness determines the restoring response to displacement**. Increasing it gives a stronger return force for the same displacement when mass stays fixed.'),
 'The first change lowers frequency, while the second raises it. A prediction about both changing together needs their relative effects and, in a distributed system, their locations.',
 'A heavy mass takes longer to reverse, while a stronger spring reverses the same mass more quickly. Large movement alone describes amplitude and does not decide which system cycles faster.')
P('node-antinode','local-change','lecture12',[9,11],'A stationary point can have strong spring action.',
 ('Displacement node','A **displacement node stays still** in that mode. Neighboring motion can nevertheless produce strong local deformation or compression.'),
 ('Displacement antinode','A **displacement antinode has greatest motion**. In the illustrated standing-wave model, local deformation is least there.'),
 'Added mass has little or no effect at an exact displacement node because that location contributes no motion. Added stiffness matters where the mode has deformation, so a still point can remain important.',
 'The same marked position can be a node in one mode and an antinode in another. Reading the two patterns separately explains why the same perturbation can produce opposite changes.')
P('motion-compression','air-modes','lecture13',[10,11,13],'Air motion and air compression are different measurements.',
 ('Motion','**Displacement describes how far a particle moves from its resting position**. Strong displacement indicates substantial back-and-forth motion.'),
 ('Compression','**Compression describes changes in how closely particles are packed**. It can be strong near a place whose own particle displacement is small.'),
 'The displacement of one particle and the changing separation between neighboring particles are different quantities. A constriction’s effect depends on which pattern dominates for the mode at that location.',
 'For /i/, the front constriction acts where Mode 1 mainly moves but Mode 2 mainly compresses. The corresponding shifts are F1 downward and F2 upward.')
P('mode-mixture','many-modes','lecture11',[4,6,7],'One mode is an organized pattern, while a mixture combines patterns.',
 ('Normal mode','A **normal mode** has a coordinated spatial pattern and its own characteristic frequency. The pattern describes the system as a whole.'),
 ('Mixture of modes','A **mixture** adds contributions from several normal modes. Its visible movement can be more complicated than any component pattern.'),
 'Seeing complex motion does not establish another independent normal mode. A spectrum can reveal frequencies whose simultaneous contributions make up the combined movement.',
 'The lower row of the two-mass demonstration combines its two modes. It should not be assigned one of the two mode frequencies as if it contained only that mode.')
P('boundary-types','fixed-free','lecture13',[4,8,9],'The allowed frequency series follows the endpoint constraints.',
 ('Both ends fixed','Both endpoints must have **zero displacement**. The ideal uniform string fits whole numbers of half-waves, giving whole-number harmonics.'),
 ('One fixed end and one free end','One endpoint is still while the other has **greatest displacement**. The ideal model fits odd numbers of quarter-waves.'),
 'A whole-number sequence and an odd-number sequence follow from different permitted spatial patterns. Counting the wave pieces explains the series instead of leaving it as a rule to memorize.',
 'A 200 Hz fixed-at-both-ends string has a fifth mode at 1,000 Hz. A neutral fixed–free tube with a 500 Hz first resonance has its next resonance at 1,500 Hz.')
P('source-filter','filter','lecture14',[15,16],'Harmonics belong to the source, while formants belong to the filter.',
 ('Harmonics','**Harmonics are whole-number multiples of the source’s fundamental frequency**. Their spacing follows how quickly the source repeats.'),
 ('Formants','**Formants are resonances of the vocal tract**. Their locations depend strongly on the tract’s configuration.'),
 'The filter changes the relative strengths of the available source harmonics. A formant does not have to coincide exactly with a harmonic, and its number is not the number of that harmonic.',
 'Changing from /i/ to /a/ can move the formant pattern while preserving F0. Raising F0 can spread the harmonics apart while the intended vowel filter stays similar.')
P('pitch-vowel','source','lecture14',[15,16,17],'Pitch and vowel quality can change independently.',
 ('Pitch','The periodic voiced source’s **F0** is closely related to pitch. Faster vocal-fold repetition produces wider harmonic spacing.'),
 ('Vowel quality','The tract’s **formant pattern** contributes strongly to vowel identity. Moving the tongue or lips changes that pattern.'),
 'A higher-pitched /i/ is not automatically /a/. However, sparse high-F0 harmonics can make the resonance pattern harder to identify, so independence of the mechanisms does not imply perfect perceptual separation.',
 'A singer can keep the intended vowel while changing the note. At very high pitches, the small number of harmonics near a formant can make that vowel less clear.')
P('i-a','i','lecture12',[20,21],'The /i/ and /a/ constrictions reverse the two dominant effects.',
 ('The /i/ configuration','The front constriction loads a moving region of Mode 1 and a compressing region of Mode 2. **F1 falls and F2 rises**.'),
 ('The /a/ configuration','The more posterior constriction catches the two modes in the opposite local roles. **F1 rises and F2 falls**.'),
 'The physical changes produced by narrowing are not arbitrary for each vowel. Their consequences differ because the same kinds of changes occur at different places within the mode patterns.',
 'A transition from /i/ toward /a/ should bring the first two formant bands closer together. The explanation comes from the reversal of the dominant inertial and stiffness effects.')
P('u-i','u','lecture12',[19,20],'Two high vowels can have different second formants.',
 ('The /u/ configuration','Loading near the lips acts on strong motion in both first modes. **Both F1 and F2 fall** in the illustrated comparison.'),
 ('The /i/ configuration','A front constriction affects motion in the first mode and compression in the second. **F1 falls while F2 rises**.'),
 'Calling both vowels high describes tongue height and does not establish the same acoustic pattern. Lip shape and the location of narrowing affect the second mode differently.',
 'The vowels in dune and dean share a high-vowel description but occupy different parts of an F1–F2 comparison. The second formant helps separate their acoustic patterns.')
P('spectrum-spectrogram','spectrogram','lecture13',[23],'A spectrum is a snapshot, while a spectrogram retains change over time.',
 ('Spectrum','A **spectrum** gives frequency content within one analysis window. Frequency runs horizontally and height represents amplitude.'),
 ('Spectrogram','A **spectrogram** places analysis windows in time order. Frequency runs vertically and darkness represents amplitude.'),
 'The displays encode related information with different visual arrangements. A high point in a spectrum means strong amplitude, while a high location in a spectrogram means high frequency.',
 'A changing vowel can be followed as moving formant bands in the spectrogram. One spectrum cannot tell whether those resonances had just risen or were about to fall.')
P('input-target','training-data','lecture15',[9],'An input describes the observation, while a target identifies its correct category.',
 ('Input','The **input row** contains the measured F1 and F2 values. Those measurements are what the network receives to classify the vowel.'),
 ('Target','The **target row** places one in the correct vowel’s output column and zeros in the others. It supplies the desired answer for training.'),
 'The target is not another measured formant and does not replace the input. Its role is to reveal the mismatch between the network’s prediction and the known identity.',
 'An /i/-like formant row belongs with the dean target. Shuffling one table without the other would teach incorrect associations.')
P('valid-correct','probabilities','lecture15',[3,6],'A valid distribution can still make the wrong decision.',
 ('Valid output','A **valid probability distribution** has nonnegative entries that sum to one. Those conditions describe its mathematical form.'),
 ('Correct decision','A **correct classification** favors the actual category for the input. Accuracy concerns the connection between the prediction and the known identity.'),
 'Probability rules alone cannot establish that the weights have learned useful categories. A distribution over the wrong answer can be perfectly well formed.',
 'The displayed untrained network favors done for an input whose target is dean. That is a classification error rather than a failure of the entries to add to one.')
P('activation-weight','weights','lecture14',[22,23,24],'An activation changes with the input, while a weight controls a connection.',
 ('Activation','An **activation** is a value produced or supplied during processing. It changes as the input and upstream computations change.'),
 ('Weight','A **weight** determines how a connection contributes to a receiving neuron. It is a learned parameter used during a forward pass.'),
 'A large activation is not the same as a large learned connection. The receiving neuron combines both by multiplying the input activation by its connection weight.',
 'Changing F1 can change hidden activations without changing any weights. A training update changes weights and can therefore change how a later input is processed.')
P('inference-learning','forward','lecture15',[3,6,8],'Inference uses the weights, while learning changes them.',
 ('Inference','**Inference** computes a decision using the current weights. It can be performed with useful or untrained parameters.'),
 ('Learning','**Learning** uses feedback to improve the parameters. It requires a comparison with a target or another training objective.'),
 'A forward pass is needed to discover the network’s current mistake. Repeating it with unchanged inputs and weights does not itself perform the correction.',
 'The untrained network already produces a full distribution. Training matters because the target and error guide changes in the connections behind that distribution.')
P('gradient-update','backward','lecture15',[8,10],'Backpropagation and SGD perform different parts of an update.',
 ('Backpropagation','**Backpropagation computes gradients** by carrying error information through the dependent computations in reverse order.'),
 ('SGD','**SGD applies parameter changes** using the gradients and a learning rate. It is the optimizer rather than the reverse calculation itself.'),
 'The reverse calculation reuses downstream work, connecting it to dynamic programming. The optimizer then decides how far to move along the supplied correction direction.',
 'loss.backward() prepares gradients, while the optimizer’s step applies them. Describing both as the same operation leaves out the difference between calculating a correction and performing it.')
P('near-far-error','backward','lecture15',[7,8],'A final connection has a shorter route to the error than an early connection.',
 ('Near the output','A final-layer weight affects the output through relatively few computations. Its influence is comparatively direct.'),
 ('Early in the network','An early weight changes intermediate activations that pass through more connections. Its final influence depends on those downstream pathways.'),
 'This dependency explains the order of the backward calculation. Reusing solved downstream derivatives makes the earlier problem manageable without guessing at each connection’s isolated effect.',
 'A positive input to a direct output weight gives a clear local sign relationship. The sign of an early connection alone does not establish the sign of its effect on every final category.')
P('hidden-output','sequential','lecture14',[22,25],'Hidden layers process evidence, while output positions name the candidate categories.',
 ('Hidden layers','**Hidden layers** transform representations between the supplied input and final decision. Their neurons are not extra category labels.'),
 ('Output layer','The **output layer** provides values corresponding to the defined answer categories. In the illustrated vowel network it has five positions.'),
 'Four processing layers can therefore contain only three hidden layers. The last processing layer is already serving as the output.',
 'The sequence of processing sizes three, two, four and five has three hidden groups. Adding a new three-neuron group before the last layer increases the hidden-layer count while keeping five output categories.')
P('linear-nonlinear','sigmoid','lecture15',[11,13],'A nonlinear step changes what a stack of weighted sums can represent.',
 ('Purely linear layers','A chain of **linear transformations** can be combined into one linear transformation. More such layers alone do not supply a nonlinear boundary.'),
 ('Sigmoid between layers','**Sigmoid** changes each weighted sum through an S-shaped function. Applying it between layers makes the combined processing nonlinear.'),
 'The distinction concerns the operations, not just the number of neurons. A nonlinear transformation changes what later layers receive and must be carried through the remaining computation.',
 'Keeping the original formants while inserting sigmoid changes the later activations and probabilities. That processing change is separate from an optimizer learning new weights.')
P('bounded-normalized','sigmoid','lecture15',[11,12],'Being bounded is different from forming a category distribution.',
 ('Hidden sigmoid values','Each **sigmoid activation** is between zero and one. Several such values are not required to add to one.'),
 ('Category probabilities','A **probability distribution** is also nonnegative but must sum to one across the specified alternatives.'),
 'The shared numerical range does not give the two representations the same job. Normalization across alternatives supplies a condition that separate hidden activations lack.',
 'Three hidden values near one can be perfectly valid sigmoid activations. They would fail as three mutually exclusive category probabilities because their total would exceed one.')
P('loss-accuracy','accuracy','lecture16',[15],
 'Loss and accuracy describe different aspects of a prediction.',
 ('Loss','**Loss** quantifies mismatch with the training target. Its change can guide parameter updates.'),
 ('Accuracy','**Accuracy** counts the fraction of category decisions that are correct. It does not fully describe the confidence assigned to each answer.'),
 'Two predictions can choose the same category while assigning it different support. Their accuracy can agree even though their losses differ.',
 'A flat accuracy segment does not establish that every parameter or probability stayed fixed. The decision can remain unchanged while the model’s numerical support shifts.')
P('training-generalization','overlap','lecture16',[5,15],'Performance on the training rows does not establish performance on new recordings.',
 ('Training accuracy','**Training accuracy** measures decisions on the examples used in the displayed training setup.'),
 ('Generalization','**Generalization** concerns decisions on new examples. It requires evidence beyond the training rows.'),
 'The source run supports a claim about the supplied data and procedure. It cannot by itself establish the same percentage for new speakers or a different recording condition.',
 'Overlapping categories help explain why the measured formants can be difficult to classify. A new-speaker evaluation would address a different question from whether training accuracy improved.')
P('heads-layers','heads','lecture18',[3],'Parallel heads and successive layers add different kinds of processing.',
 ('Heads','**Heads operate alongside one another within a layer**, contributing information about different relationships.'),
 ('Layers','**Layers operate successively through depth**, transforming representations that already contain earlier processing.'),
 'Adding a parallel contribution is different from adding another stage after the existing one. The diagram uses both arrangements rather than treating them as interchangeable counts.',
 'Several heads can contribute to one layer’s representation. The next layer then receives the combined result rather than merely acting as one more head in the same stage.')
P('heads-agents','agents','lecture18',[2,3],'A head works inside a model, while an agent carries out a task within a larger system.',
 ('Attention head','An **attention head** is a computational component within a model layer. Its contribution is combined with other internal processing.'),
 ('Agent','An **agent** is a model given a role and connected to other tasks through messages. A critic and reviser are roles in that larger organization.'),
 'A checking loop between models should not be described as just another attention head. The system-level graph and the model’s internal layers are different levels of explanation.',
 'A critic can ask for a draft to be revised before it is returned. That message exchange is outside the individual model’s hidden activation calculations.')
P('letters-sounds','phonotactics','lecture18',[6,7],'A spelling prediction can probe a pattern without being a phonetic transcription.',
 ('Letters','**Letters** are written symbols. Their sequences can provide a practical word-completion exercise.'),
 ('Speech sounds','**Speech sounds** are the units articulated and heard. Their sequence restrictions are not identical to every spelling pattern.'),
 'The next-letter game can expose useful regularities while still requiring care about what is being represented. A written symbol does not always correspond to a pronounced consonant.',
 'Written k can begin knee, but ordinary pronunciation does not begin with /k/. That example should not be used to claim that the spoken onset /kn/ is permitted in the same way.')
P('greedy-dp','dynamic-programming','lecture04',[4,7,13],'A locally cheap step differs from a cheap complete continuation.',
 ('Greedy choice','A **greedy choice** compares immediate next edges. It leaves the later costs out of that decision.'),
 ('Dynamic-programming choice','A **value-based choice** adds the next-edge cost to the already solved best remaining cost.'),
 'Both can make a decision from the current state, but only the second includes the relevant continuation. The saved value supplies information the immediate edge alone lacks.',
 'An inexpensive first edge can lead to costly later edges. A slightly more expensive start can still have the lowest total when the remaining route is included.')
P('exhaustive-dp','dynamic-programming','lecture04',[6,7,12],'Accuracy does not require independently repeating every overlapping route.',
 ('Exhaustive search','**Exhaustive search** evaluates every candidate complete path. Shared route pieces can be calculated repeatedly.'),
 ('Dynamic programming','**Dynamic programming** solves the repeated subproblem once and reuses its best answer.'),
 'The gain comes from the structure of overlapping subproblems. Reuse preserves the needed optimal continuation while avoiding duplicated work.',
 'If several routes pass through the same state on the way to the goal, they can all use its stored best remaining cost. Re-solving that remainder for each route adds work without new information.')
P('position-velocity','position-velocity','lecture07',[2,7,8],'Being at equilibrium differs from being stopped.',
 ('Position','**Position** gives displacement from equilibrium. A value of zero identifies the middle position.'),
 ('Velocity','**Velocity** describes the current motion. A value of zero identifies an instant when position is not changing.'),
 'A moving mass passes through equilibrium with velocity, while a turning point has zero velocity away from equilibrium. Conflating these moments erases the mechanism of overshoot.',
 'The spring’s restoring force is momentarily zero at the middle, but inertia carries the mass through. At the turn, the restoring acceleration is nonzero even though velocity is zero.')
P('oral-nasal','stops','lecture02',[5,6],'An oral closure can coexist with an open nasal route.',
 ('Oral stop','An **oral stop** closes the mouth and blocks the nasal route before the oral release.'),
 ('Nasal stop','A **nasal stop** keeps the oral closure while a lowered velum permits nasal airflow.'),
 'The difference is the airflow route rather than the absence of oral closure. A comparison should also preserve the shared place and voicing when the pair has them.',
 'The sounds /b/ and /m/ share voiced closure at the lips. Lowering the velum supplies the nasal route that distinguishes /m/.')
