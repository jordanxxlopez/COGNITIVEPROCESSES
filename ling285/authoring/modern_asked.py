"""Section 02. Likely question forms, with fresh prompts and direct answers."""
ASK=[]
def A(concept,collection,pages,title,items):
    ASK.append(dict(concept=concept,collection=collection,pages=pages,title=title,
                    moduleId='module2' if int(collection[7:9])>=11 else 'module1',
                    items=[dict(question=q,answer=a) for q,a in items]))

A('three-modes','lecture11',[4,6,7],'Count the modes and explain their motion.',[
 ('How many normal modes can a three-mass system support in the one-direction model?', '**Three**. Each independent moving mass adds one degree of freedom, giving three independent normal-mode patterns.'),
 ('Which of the three modes has the highest frequency, and what makes it faster?', '**Mode 3** has the highest frequency. Neighboring masses alternate in direction, producing stronger restoring action than the broad shared motion of the lowest mode.'),
 ('What happens to Mode 2 if only the middle mass is made heavier?', 'Its frequency stays unchanged in the ideal symmetric system. **The middle mass does not move in Mode 2**, so the added inertia does not contribute to that mode.')])
A('local-change','lecture12',[9,11],'Decide what matters at a marked location.',[
 ('A marked point moves strongly in one mode but stays still in another. Will added mass affect both modes equally?', 'No. It lowers the frequency of the mode with substantial motion there and has no effect at an exact displacement node. **The effect depends on local participation in each mode**.'),
 ('Why can extra stiffness at a stationary point still change a mode’s frequency?', 'The point can lie where neighboring regions deform strongly even though its own displacement is zero. **Stiffness responds to deformation**, not to the size of the local displacement alone.'),
 ('If the same change raises one resonance and lowers another, must the measurements be inconsistent?', 'No. The changed location can be dominated by compression in one mode and motion in the other. Those different local roles allow opposite frequency shifts.')])
A('fixed-fixed','lecture13',[4,5],'Fit the boundary conditions before naming the frequencies.',[
 ('A uniform string is fixed at both ends and has a 200 Hz fundamental. What frequency is its fifth mode?', '**1,000 Hz**. The ideal fixed-at-both-ends string has whole-number harmonics, so its fifth mode is five times the fundamental.'),
 ('Why does the second mode of a fixed-at-both-ends string have a shorter wavelength than the first?', 'It fits two half-waves into the length that held one half-wave. **More wave pieces in the same distance mean a shorter wavelength** and, at the same wave speed, a higher frequency.'),
 ('Which frequencies belong in a spectrum through the first six modes when the fundamental is 200 Hz?', '**200, 400, 600, 800, 1,000 and 1,200 Hz**. The peaks remain evenly spaced by the fundamental.')])
A('fixed-free','lecture13',[7,8,9],'Explain why the two different ends permit odd multiples.',[
 ('What would go wrong if an even number of quarter-waves were fitted between a fixed end and a free end?', 'The pattern would reach a still point at the free end instead of a point of greatest displacement. **The boundary conditions would no longer match**.'),
 ('Why is a building a useful analogy for the end constraints of a vocal tract?', 'A building is held at its base and free at its top. A neutral vocal-tract air column likewise has different constraints at the glottal and lip ends, making **fixed–free organization** the shared feature.'),
 ('For an ideal fixed–free tube with a 500 Hz first resonance, what are the next two resonances?', '**1,500 Hz and 2,500 Hz**. The ideal neutral tube supports odd multiples of its lowest resonance.')])
A('source','lecture14',[15],'Keep the fundamental and its harmonics distinct.',[
 ('A periodic voice has F0 at 150 Hz. Where are its first five harmonic peaks?', '**150, 300, 450, 600 and 750 Hz**. Harmonics occur at whole-number multiples of the source’s repetition frequency.'),
 ('What happens to harmonic spacing if the vocal folds vibrate faster?', '**The spacing increases**. The fundamental is the repetition rate, and it is also the separation between adjacent source harmonics.'),
 ('Does the third harmonic have to be the third formant?', 'No. **A harmonic belongs to the periodic source**, while **a formant is a tract resonance**. Their numbering refers to different sequences.')])
A('constriction','lecture13',[13,16,17,18],'Infer the constriction’s effect from the mode pattern.',[
 ('A constriction raises F2 strongly. Was the air mostly moving or compressing at that location in Mode 2?', '**Compression was the stronger effect**. Increasing restoring stiffness where the mode compresses raises its frequency.'),
 ('Why does narrowing the tract not always raise every formant?', 'A narrowing also changes effective inertia. **At a strongly moving location, inertial loading can dominate and lower a formant**, even while stiffness increases locally.'),
 ('What extra information is needed before predicting whether a local tract change raises F1?', 'The location of the change within the **first mode’s motion and compression pattern** is needed. The fact that a narrowing occurred does not by itself determine the direction.')])
A('i','lecture12',[19,20,21],'Explain the opposing F1 and F2 directions.',[
 ('How can one front constriction lower F1 while raising F2?', 'It falls in a region dominated by motion for the first mode and compression for the second. **The inertial effect lowers F1 and the stiffness effect raises F2**.'),
 ('Which illustrated vowel change lowers both first and second formants, and why?', 'The **/u/ model** loads the region near the lips. Both of the first two modes have strong motion there, so increased inertial loading lowers both frequencies.'),
 ('Why does moving a constriction toward the /a/ location reverse the /i/ pattern?', 'The first two modes have different local roles at the new location. **Compression dominates Mode 1 while motion dominates Mode 2**, so F1 rises and F2 falls.')])
A('filter','lecture14',[15,16,17],'Describe what the source supplies and the filter changes.',[
 ('What changes when the same voiced source is filtered as /i/ and then /a/?', 'The **formant pattern and the relative harmonic amplitudes** change as the tract shape changes. The source’s harmonic spacing can remain the same.'),
 ('Why can a formant be present even when no harmonic lies exactly at its frequency?', 'A formant is a property of the tract’s resonant response. **The source samples that response only at its available harmonic frequencies**, so a resonance need not coincide with a harmonic.'),
 ('Why can high-pitched singing make a vowel harder to identify?', 'High F0 spreads the harmonics farther apart. Fewer peaks may sample the formant envelope, making the intended resonance pattern less clear.')])
A('spectrogram','lecture13',[23],'Read what the acoustic display encodes.',[
 ('What does a dark region high on a spectrogram represent?', 'It represents **relatively strong energy at a high frequency** at that time. Height encodes frequency and darkness encodes amplitude.'),
 ('How would a transition from /i/ toward /a/ appear in the first two formant bands?', '**F1 would rise and F2 would fall** toward the /a/ pattern. The bands would change through time rather than merely become darker in place.'),
 ('What information does a spectrum alone leave out that a spectrogram provides?', 'A spectrum describes one time window. **A spectrogram preserves the sequence of changing frequency patterns**, allowing transitions to be followed.')])
A('backward','lecture15',[6,7,8],'Explain the order of the backward calculation.',[
 ('Why is the effect of a final-layer weight easier to connect to the error than the effect of an early weight?', 'The final-layer weight has a short, direct route to the output. An early weight influences the error **through several intermediate activations and connections**.'),
 ('How does dynamic programming help backpropagation avoid repeated work?', 'Downstream error calculations are solved first and reused when calculating earlier effects. **Shared dependent computations do not have to be rebuilt independently for each weight**.'),
 ('Does calculating a gradient itself complete an SGD weight update?', 'No. **Backpropagation calculates the gradient**, and the optimizer applies a correction using that gradient and the learning rate.')])
A('weight-direction','lecture15',[7],'Trace a proposed weight change to its consequence.',[
 ('A positive hidden activation feeds an output that already has too much support. What does increasing its direct output weight do?', 'It raises that output’s raw score, which works against reducing its excessive support. **The sign of the incoming activation** makes the local direction predictable.'),
 ('Would increasing the same connection necessarily have the same effect if its input activation were negative?', 'No. Multiplying a negative activation by a larger weight changes the contribution in the opposite direction. **The input sign must be considered along with the weight**.'),
 ('Why should an early hidden weight not be judged only from the sign printed beside it?', 'Its final effect passes through later connections and nonlinear transformations. **The downstream pathways determine how the change reaches the error**.')])
A('sequential','lecture14',[25],'Read layer sizes and adjust the network coherently.',[
 ('How many hidden layers are in a network with processing sizes 3, 2, 4 and 5, where five neurons provide the output?', '**Three hidden layers**. The final five-neuron layer is the output layer, while the supplied two-value input is not another hidden layer.'),
 ('What does nn.Linear(3, 2) specify?', 'It receives **three values** and produces **two activations** through learned weighted combinations. The following processing layer must accept those two outputs.'),
 ('Which two connections are needed to insert three hidden neurons between four hidden activations and five outputs?', 'Use a connection from **four to three**, followed by a connection from **three to five**. That inserts the hidden layer while preserving the five output categories.')])
A('training-code','lecture15',[9,10],'Recognize what the training operations accomplish.',[
 ('Why must the row order agree between formant inputs and vowel targets?', 'Each pair describes the same recording. **A mismatched row teaches an incorrect formant-to-vowel association**, even if both tables have valid numerical entries.'),
 ('What does loss.backward() contribute before the optimizer takes a step?', 'It computes how the loss depends on the trainable parameters. **Those gradients supply the directions and strengths used by the update**.'),
 ('What is the effect of increasing the learning rate while leaving the gradients unchanged?', '**The parameter steps become larger**. That can speed movement but can also increase instability or fluctuation.')])
A('sigmoid','lecture15',[11,12,13],'Explain the nonlinear transformation without evaluating exponentials.',[
 ('What does sigmoid do to a very negative weighted sum?', 'It produces an activation **close to zero**. A very positive sum instead produces a value close to one.'),
 ('Why does sigmoid change the function of a stack of linear layers?', 'It adds a nonlinear transformation between the weighted combinations. **The resulting network can no longer be collapsed into one purely linear transformation** in the same way.'),
 ('Why are three hidden sigmoid values not automatically probabilities over three categories?', 'They are individually bounded, but **they are not required to sum to one**. Being in the probability range is only one condition of a category distribution.')])
A('accuracy','lecture16',[5,15,16],'Interpret the training curve and repeated runs.',[
 ('Why is twenty percent a useful guessing baseline for five equally likely categories?', 'A uniform guess has **one chance in five** of selecting the correct category. The baseline follows from the number and balance of the choices.'),
 ('Does a flat training-accuracy curve mean that every example is classified correctly?', 'No. A plateau only indicates that the measured proportion is no longer increasing. **A stable result can still contain many incorrect decisions**.'),
 ('What remains different when runs start with different weights but finish at the same accuracy?', '**Their learning paths can differ**. Early predictions and corrections depend on initialization even when the eventual proportion correct agrees.')])
A('next-token','lecture17',[3,5],'Transfer the sequence-prediction idea across different materials.',[
 ('What do words and a sequence of acoustic measurements have in common for a numerical predictor?', 'Both can be represented as **ordered vectors**. The model uses the preceding vectors to predict a continuation, although the representation and output interpretation differ.'),
 ('Why can an isolated word be insufficient to decide the next word?', 'Its continuation depends on the broader sequence. **Earlier context changes which next items fit**, so independent item classification leaves out useful information.'),
 ('What does a recurrent connection contribute to a sequence model?', 'It carries state from one processing step into another. **The current computation can therefore depend on prior context**, rather than only the current input.')])
A('phonotactics','lecture18',[6,7],'Use a changed word beginning to reason about a continuation.',[
 ('Why is n a poor next-letter choice after initial sp in the supplied English pattern exercise?', 'It would create the excluded **spn onset pattern**. A vowel, l or r fits the illustrated alternatives.'),
 ('Why can a consonant sequence occur inside a longer word but fail as a word beginning?', 'A syllable break can divide the consonants between different positions. **Allowed sequences depend on syllable structure**, so a cross-boundary cluster need not be a permitted onset.'),
 ('How should a predictor’s distribution differ between a highly restricted beginning and a permissive one?', 'The restricted beginning should concentrate support on fewer continuations. The permissive beginning allows a **broader distribution** over plausible next items.')])
A('heads','lecture18',[2,3,4],'Distinguish the organization within a model from a system of models.',[
 ('Are several attention heads in one layer the same as several successive processing layers?', 'No. **Heads work in parallel within a layer**, while successive layers transform representations through depth.'),
 ('Why is a critic-to-reviser loop a kind of feedback?', 'The critic’s evaluation returns information that changes another processing attempt. **The later result depends on feedback from an earlier result**.'),
 ('Does calling a head an expert guarantee that it understands a topic as a person does?', 'No. The analogy describes a specialized computational contribution. It does not establish a human-like role or a separately verifiable area of expertise.')])
