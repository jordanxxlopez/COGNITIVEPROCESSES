"""Section 06. Focused explanations of conceptual obstacles."""
HARD=[]
def H(id,concept,collection,pages,title,paragraphs,question,answer):
    HARD.append(dict(id='modern-hard-'+id,concept=concept,collection=collection,pages=pages,
      moduleId='module2' if int(collection[7:9])>=11 else 'module1',title=title,
      paragraphs=paragraphs,question=question,answer=answer))

H('local-roles','local-change','lecture12',[9,11],
 'Why can a still point matter more for stiffness than a moving point?',[
 'A mode pattern describes **motion over a complete cycle**, not merely whether one dot happens to be at the center at a particular instant. A displacement node stays still throughout that cycle, while an antinode moves through a large range.',
 'Stiffness concerns deformation between neighboring parts. Those neighbors can move strongly relative to one another around a node, so the node can coincide with strong spring action even though its own displacement is zero.',
 'Adding mass at an antinode increases inertia where the mode already has substantial motion. Adding stiffness at a strongly deformed location increases the restoring action, so the two changes act on different spatial properties.',
 'In the source’s marked-location comparison, one mode moves there and another has a node there. **Read the role in each mode first**, then predict a decrease from inertia or an increase from stiffness.'],
 'Does a point momentarily crossing its resting position have to be a displacement node?',
 'No. An antinode passes through the resting position during every cycle. **A node remains stationary through the entire mode**, which is a different condition.')
H('odd-series','fixed-free','lecture13',[7,8,9],
 'Why does the fixed–free series skip the even multiples?',[
 'Begin with the two endpoint requirements. One end must stay still, and the other must reach the maximum displacement allowed by the mode.',
 'The shortest piece connecting those requirements is **one quarter-wave**. Adding another quarter-wave would bring the pattern back to a still point at the free end, violating that end’s condition.',
 'Adding two quarter-waves instead brings the pattern back to a moving end. The permitted counts are therefore one, three, five and further odd counts, which produce the ideal odd-multiple frequency series.',
 'This explains the series from the shape rather than treating it as an arbitrary list. A string held still at both ends has another constraint and can fit every whole number of half-waves.'],
 'What is the first thing to check before assigning a harmonic series to a drawing?',
 'Check **what each end is allowed to do**. The permitted spatial patterns depend on those conditions.')
H('air-drawing','air-modes','lecture13',[10,11,13],
 'How can a wave-shaped air diagram represent longitudinal motion?',[
 'The air particles move **along the vocal tract**. A graph can nevertheless draw their displacement vertically so that the size of the motion at each tube position is easy to see.',
 'The drawing is a representation of a quantity, not a literal path through the roof and floor of the mouth. A large vertical value means large longitudinal displacement at that location.',
 'Compression depends on how neighboring particles move relative to one another. Particles on either side of a small-displacement region can crowd together or spread apart strongly, producing pressure changes there.',
 'Keeping displacement and compression separate makes the vowel predictions understandable. A narrowing can slow a moving region through inertia or raise a compressing mode’s frequency through increased stiffness.'],
 'Why is the highest point on a displacement curve not automatically the point of greatest compression?',
 'Its height describes **particle displacement**, while compression describes changing separation between neighbors. Those quantities have different spatial patterns.')
H('source-sampling','sparse-harmonics','lecture14',[15,16,17],
 'Why can the same vowel filter look different at different pitches?',[
 'A tract resonance describes a frequency region the filter favors. The source supplies only the harmonics available at its current F0, so those harmonics sample the filter’s response at discrete frequencies.',
 'At low F0, closely spaced harmonics can fall on both sides of a resonance and reveal its broad envelope. At high F0, the next harmonic can lie far away, leaving a formant between the available samples.',
 'The filter has not automatically lost its resonance when that region is poorly sampled. **The source pattern and the filter response are separate contributors** to the observed spectrum.',
 'That distinction explains both the source-filter relationship and why some very high-pitched vowels are less clear. It also prevents a harmonic’s frequency from being mistaken for the exact location of a formant.'],
 'Does the strongest visible harmonic always give the exact formant frequency?',
 'No. It can be the available source harmonic nearest a resonance. **The resonance can lie between harmonics**.')
H('backward-order','backward','lecture15',[6,7,8],
 'Why does working backward solve a forward network’s learning problem?',[
 'The forward computation creates the values needed for a prediction. Comparing that prediction with the target supplies an error, but it does not yet identify how each earlier connection contributed.',
 'A final connection lies close to the error. An earlier connection acts through several later activations, so its effect depends on calculations that lie downstream from it.',
 '**Backpropagation solves those downstream dependencies first and reuses them**. This is why dynamic programming is a useful explanation of its efficiency rather than an unrelated shortest-path story.',
 'The reverse pass calculates gradients from the stored forward values. The optimizer then uses those gradients to update the parameters, keeping the order of calculation distinct from the act of changing weights.'],
 'Are the final-layer weights repeatedly changed before each earlier gradient is calculated?',
 'The backward calculation uses the forward-pass values and the current parameters to obtain consistent gradients. **The parameter update follows that calculation**, rather than rebuilding each earlier gradient from an already changed network.')
H('weight-sign','weight-direction','lecture15',[7],
 'Why is “increase the weight” not a complete prediction?',[
 'A connection contributes the incoming activation multiplied by its weight. The sign of the activation therefore matters before the effect of increasing the weight can be determined.',
 'For a positive activation entering a direct output connection, increasing the weight raises that output’s raw score. For a negative activation, the same weight increase pushes its contribution in the opposite direction.',
 'Whether that direction helps also depends on the target. An output receiving too much support should be reduced, while an output receiving too little support needs a different correction.',
 'For an early hidden connection, the change then passes through additional pathways and transformations. **Follow the sign, the target and the downstream dependencies**, rather than treating every increase as improvement.'],
 'Which condition makes increasing a direct output weight raise that output’s raw score?',
 'The incoming activation must be **positive**, with the other contributions held fixed. Its sign determines the local direction.')
H('hidden-count','sequential','lecture14',[22,25],
 'Why do four Linear declarations correspond to three hidden layers?',[
 'The two input values are supplied measurements. They do not require a Linear declaration merely to exist as inputs.',
 'Each Linear declaration creates a processing layer. In the displayed sequence, three layers produce intermediate activations and the last produces values for five vowel categories.',
 'Only the intermediate layers are **hidden layers**. Counting the final decision layer as hidden would count one processing stage in the wrong category.',
 'Inserting three neurons immediately before the output requires a four-to-three connection and then a three-to-five connection. The sizes must match where the layers meet, while the original two input measurements remain unchanged.'],
 'Does adding a hidden layer require adding another measured formant input?',
 'No. It adds an **internal processing stage**. The original input can remain F1 and F2.')
H('sigmoid-distribution','sigmoid','lecture15',[11,12,13],
 'Why is a bounded activation not automatically a probability distribution?',[
 'Sigmoid maps one weighted sum to a number between zero and one. Applying it independently to several neurons gives several bounded numbers.',
 'A distribution over mutually exclusive categories has another requirement. **The category probabilities must sum to one together**, which independent sigmoid activations do not ensure.',
 'The hidden values can be useful features without being category decisions. Their job is to supply a representation for the next processing stage.',
 'Sigmoid also introduces nonlinearity between weighted combinations. That changes the function being calculated and requires later activations to be recomputed from the transformed values.'],
 'Can three hidden sigmoid neurons all be close to one?',
 'Yes. Their activations are independently bounded. **Their sum is not constrained to one**, because they are not automatically alternative-category probabilities.')
H('spelling-boundaries','phonotactics','lecture18',[6,7],
 'Why can a cluster work inside a word but fail at the beginning of a syllable?',[
 'Sound restrictions apply to positions within syllables, not merely to an uninterrupted row of written consonants. A syllable has an onset before its vowel and a coda after it.',
 'A consonant sequence inside a longer word can span a syllable boundary. The first consonant can finish one syllable while the next begins another, avoiding a combination that would be disallowed in a single onset.',
 'The next-letter exercise makes some of these expectations visible by restricting the continuation of a word beginning. A model that predicts well must become sensitive to which completions fit the available context.',
 '**Letters still differ from sounds**, so spelling examples such as knee need careful interpretation. They can probe written pattern knowledge without establishing that every written cluster is pronounced as an onset.'],
 'Why should a written k followed by n not be treated as proof of a spoken /kn/ onset?',
 'Ordinary knee does not pronounce that initial written k. **The spelling sequence and the pronounced sound sequence are different representations**.')
H('shared-subproblem','dynamic-programming','lecture04',[7,8,12,13],
 'How does a saved value replace repeated route calculation?',[
 'Several routes can reach the same state before continuing to a common goal. The best remaining route from that state is the same subproblem each time it appears.',
 'Solving that remainder once gives a **stored value**. A route reaching the state can add its own arrival cost to that value instead of evaluating every later edge again.',
 'The earlier state is solved only after the values it requires are available. The method therefore follows the dependency structure rather than picking an arbitrary order.',
 'The same reasoning helps explain a backward error calculation. A result needed by many upstream computations can be calculated once and reused.'],
 'What information does the best remaining value include that an immediate edge cost lacks?',
 'It includes the **optimal continuation to the goal**, not just the next move.')
