"""Fresh teaching prose for the modern workspace. Original editions are inputs, never outputs.

Each entry is written as an explanation, a mechanism, a useful consequence and a
plain-language explanation. Page mappings below restrict reuse to the same concept.
"""

CONCEPTS = {}

def C(key, opening, mechanism, consequence, plain):
    CONCEPTS[key] = dict(opening=opening, mechanism=mechanism, consequence=consequence, plain=plain)

C('oscillation',
  '**A spring pulls a displaced mass toward equilibrium**, the position where the spring is neither stretched nor compressed. **Inertia** keeps the mass moving as it passes that position, so reaching equilibrium does not immediately stop the motion.',
  'After the mass passes equilibrium, the spring pulls against its motion until it turns around. The same interaction then happens in the opposite direction, producing a repeated cycle rather than a single return.',
  'In the ideal model without friction, the cycle continues because nothing removes its energy. A real system loses energy through damping, so its motion can gradually become smaller.',
  'The spring brings the mass back, but the moving mass carries on past the middle. That overshoot stretches or compresses the spring in the opposite direction, which starts the return trip.')

C('directions',
  '**Longitudinal motion** runs along a system, while **transverse motion** runs across it. A mass can therefore oscillate left and right along a spring or up and down between stretched supports.',
  'In both arrangements, displacement produces a restoring force and inertia carries the mass past equilibrium. The direction of the drawing changes, but the competition between restoring force and continued motion remains.',
  'The paired systems make it possible to recognize one physical mechanism in two geometries. The transverse example uses tension in its supports to provide the restoring effect.',
  'Moving along a spring and moving across a stretched support can follow the same back-and-forth pattern. In either case, the support pulls back and the moving mass overshoots.')

C('mass-stiffness',
  '**Increasing mass lowers frequency**, while **increasing stiffness raises frequency** when the other properties stay the same. Frequency counts how many complete cycles occur in a second.',
  'More mass is harder to accelerate and reverse, so each cycle takes longer. A stiffer system supplies a stronger restoring force for the same displacement, so it completes the return more quickly.',
  'A directional prediction requires saying which property changed and which property stayed fixed. When mass and stiffness both change, their effects must be considered together rather than applying either rule alone.',
  'A heavier moving part turns around more slowly, so it vibrates fewer times each second. A stronger spring brings the same mass back faster, so the frequency rises.')

C('two-modes',
  '**Two coupled masses have two normal modes**, which are two organized patterns of motion. In the lower mode the masses move together, while in the higher mode they move in opposite directions.',
  'Moving together leaves the middle connection relatively unstretched. Moving oppositely stretches that connection as well as the outer supports, adding restoring action and raising the frequency.',
  'A normal mode is a whole pattern, not a separate frequency assigned to just one mass. Both masses participate in a mode, and combining the modes can produce more complicated motion.',
  'Two masses can move together or against each other. The opposing pattern stretches more of the system and vibrates faster.')

C('three-modes',
  '**Three coupled masses have three normal modes**, ordered from lower to higher frequency. The first is the broadest shared motion, the second has a stationary middle mass, and the third has neighboring masses moving oppositely.',
  'In Mode 2, the two outer masses move in opposite directions while their effects on the middle mass balance. In Mode 3, the alternating pattern creates more rapid changes in displacement and greater restoring action.',
  'Adding mass to the middle lowers the frequencies of modes in which that mass moves. It leaves Mode 2 unchanged in the ideal symmetric system because the middle mass remains at a displacement node.',
  'Three masses can vibrate in three coordinated ways. The middle mass stays still in the second pattern, so making that particular mass heavier does not slow that mode.')

C('many-modes',
  '**A system with n independently moving masses has n normal modes** in the one-direction model. Each added moving part permits another independent pattern of coordinated vibration.',
  'The lower modes have broader patterns, while higher modes alternate direction more often along the system. The system can vibrate as a combination of modes rather than choosing only one.',
  'Taking the continuous limit turns many small connected masses into a string or another distributed medium. A continuous system has a sequence of modes, but its frequency spacing also depends on its shape and boundary conditions.',
  'More moving parts allow more patterns of vibration. A string behaves like very many tiny connected masses, so it can support many modes at once.')

C('fixed-fixed',
  '**A uniform string fixed at both ends must have a displacement node at each end**, because neither end can move. Its first mode fits one half-wave between the supports, and successive modes fit two, three and more half-waves.',
  'Fitting more half-waves into the same length makes the wavelength shorter. With the wave speed held fixed, shorter wavelengths correspond to higher frequencies, producing whole-number multiples of the fundamental.',
  'If the fundamental is 200 Hz, Mode 5 is 1,000 Hz. A spectrum through Mode 6 has peaks at 200, 400, 600, 800, 1,000 and 1,200 Hz, with frequency on the horizontal axis.',
  'Both ends must stay still, so only patterns that return to a still point at both ends fit. Those patterns have frequencies of one, two, three and further whole-number multiples of the first frequency.')

C('membrane',
  '**A membrane can vibrate in patterns across two spatial directions**, rather than only along a line. Different parts can move together or in opposite directions, and several patterns can be present in one overall motion.',
  'A measurement at one point combines the contributions of the modes that move at that point. A spectrum separates those contributions by frequency, even when the visible motion looks complicated.',
  'The displayed membrane demonstration assigns a simple harmonic series for teaching. Those assigned frequencies should not be treated as a rule that every physical membrane has evenly spaced natural modes.',
  'A vibrating surface can bend in several different patterns at once. Recording one point gives their combined motion, while the spectrum helps separate the frequencies in that mixture.')

C('scientific-method',
  '**A theory earns a test by making a measurable prediction**. A physical account of vocal-fold vibration predicts regular harmonic spacing in a recorded periodic voice signal.',
  'The prediction connects a proposed mechanism to an observable pattern. Recording the voice and examining its spectrum checks whether the peaks have the expected spacing, rather than accepting the theory because it sounds plausible.',
  'An observation can support a prediction without proving every part of a theory. The useful explanation connects the proposed vibrating system, the predicted spectral pattern and the measurement used to check it.',
  'A theory has to say what a measurement should look like. If periodic vocal-fold vibration is the proposed source, an evenly spaced harmonic pattern is something a recording can test.')

C('fixed-free',
  '**A fixed–free system has different conditions at its two ends**. In the ideal string model, displacement is zero at the fixed end and greatest at the free end.',
  'One quarter-wave connects a still point to a point of greatest motion. The next allowed pattern adds two quarter-waves so the free end still moves maximally, giving one, three, five and seven quarter-waves.',
  'The corresponding ideal resonances are odd multiples of the lowest resonance. The closed glottal end and open lips make this a useful model of a neutral vocal tract, while a building supplies a familiar analogy for the different end constraints.',
  'One end has to stay still while the other can move freely. Only an odd number of quarter-wave pieces preserves those different conditions at the two ends.')

C('local-change',
  '**A local change affects each mode according to what happens at that location**. Extra mass matters where that mode moves, while extra stiffness matters where that mode has deformation or compression.',
  'At a displacement antinode, motion is greatest and the mass effect dominates. At a displacement node, motion is absent while the local spring effect can be strongest, so added stiffness can raise the frequency without a competing moving-mass effect.',
  'The same marked location can be a node in one mode and an antinode in another. Increasing mass and stiffness together can therefore raise one mode and lower another rather than making the two changes cancel.',
  'First check what the marked place is doing in each pattern. A moving place is slowed by extra mass, while a place doing the stretching responds most to extra stiffness.')

C('air-modes',
  '**Air in the vocal tract moves longitudinally**, with particles moving back and forth along the tube. The wave-shaped drawing represents how much each position moves, not a claim that air particles travel up and down inside the mouth.',
  'Where neighboring particles move toward one another, the air compresses and pressure rises. Where they move apart, the air expands, so particle motion and compression must be read as different quantities.',
  'Near a displacement node there can be strong compression even though local motion is small. Near a displacement antinode, motion is large while local compression is small, which explains why a constriction has different effects at different locations.',
  'Air moves along the tube, but a graph can draw that movement vertically to make it visible. Places with the biggest back-and-forth motion differ from places where the air is squeezed most strongly.')

C('vowel-shape',
  '**Vowels differ in the shape of the vocal tract**, including where the tongue narrows the passage and whether the lips are rounded. These changes alter the resonances of the air without requiring a new vibrating source for each vowel.',
  'A high front tongue position produces the vowel in dean, while a high back position with rounded lips produces the vowel in dune. A lower tongue configuration produces a more open vowel such as the one represented by /a/.',
  'The important connection is from the location of the narrowing to its effect on the air modes. The same voiced source can pass through different tract shapes and acquire different vowel qualities.',
  'Changing the tongue and lips changes the shape of the air passage. That changes which frequencies the passage favors, allowing one voice to make different vowels.')

C('constriction',
  '**A constriction changes effective inertia and restoring stiffness in the air**, so its acoustic effect depends on the mode and location. The two changes do not automatically cancel because motion and compression have different spatial patterns.',
  'Where air motion dominates, the extra inertial loading lowers that mode’s frequency. Where compression dominates, the increase in restoring stiffness raises that mode’s frequency.',
  'A large rise in a formant therefore points to strong compression and relatively little motion at the constriction for that mode. The reasoning works backward from the observed frequency change to the local physical behavior.',
  'A narrowing can make the moving air harder to turn around and can make compressed air push back more strongly. Which effect wins depends on whether that part of the mode mostly moves or mostly compresses.')

C('u',
  '**The /u/ model lowers both F1 and F2** through loading near the lips. The lips are at the open end of the tract, where the first two displacement modes have substantial motion.',
  'At that location, increased effective mass has a strong effect on both modes. More inertia slows their vibration, so the first two resonances shift downward together.',
  'The prediction is tied to the location of the loading, not simply to the fact that a narrowing occurred. A narrowing farther inside the tract can act on the two modes in different ways.',
  'Near the lips, the air moves strongly in both of the first two modes. Making that moving air harder to turn around lowers both formants.')

C('i',
  '**The /i/ pattern combines a low F1 with a high F2**. A front constriction near two thirds of the distance from the glottis falls in different parts of the first two mode patterns.',
  'Motion dominates there for Mode 1, so increased inertial loading lowers F1. Compression dominates there for Mode 2, so increased stiffness raises F2.',
  'One change in tract shape therefore produces opposite frequency changes. The explanation has to identify both modes rather than treating the entire air column as one oscillator.',
  'The same narrowing catches the first mode where it mainly moves and the second where it mainly compresses. The first formant goes down while the second goes up.')

C('a',
  '**The /a/ pattern raises F1 and lowers F2** relative to the neutral-tube comparison. A constriction nearer one third of the distance from the glottis reverses which physical effect dominates for the first two modes.',
  'Compression dominates at that location for Mode 1, so added stiffness raises F1. Motion dominates for Mode 2, so increased inertial loading lowers F2.',
  'The result brings the first two formants closer together than in the /i/ pattern. Their relationship follows from where the tract is narrowed, rather than from an arbitrary list of vowel numbers.',
  'For this narrowing, the first mode mostly compresses while the second mostly moves. The stiffness effect raises F1 and the mass effect lowers F2.')

C('source',
  '**The vocal-fold source supplies a harmonic series**, with peaks spaced by the fundamental frequency, F0. The harmonics occur at the fundamental and its whole-number multiples.',
  'A faster repeating source gives wider spacing between successive harmonics. Increasing effective vocal-fold stiffness tends to raise F0, while increasing effective moving mass tends to lower it.',
  'At an F0 of 150 Hz, the first five harmonics are 150, 300, 450, 600 and 750 Hz. Those frequencies describe the source spacing, while vowel identity depends strongly on how the tract shapes their amplitudes.',
  'The vocal folds provide the repeating sound. Faster repetition puts the harmonic peaks farther apart, while slower repetition packs them closer together.')

C('filter',
  '**The vocal-tract filter changes the strengths of source harmonics**, favoring frequencies near its resonances, called formants. F1 and F2 name the first two of those resonances.',
  'Harmonics close to a resonance remain stronger than harmonics far from it. The result is a shaped spectral envelope whose broad peaks carry information about the tract configuration.',
  'Changing a vowel can move the formants while F0 stays the same. Changing F0 can alter the harmonic spacing while the intended tract shape remains similar, so pitch and vowel quality describe different aspects of the sound.',
  'The folds make the harmonic peaks, and the mouth changes how strong those peaks are. The broad regions of stronger sound tell us about the vowel.')

C('sparse-harmonics',
  '**High F0 makes harmonic sampling sparser**, because the source peaks lie farther apart. A tract resonance can then fall between harmonics instead of having several nearby peaks reveal its shape.',
  'A low-pitched source supplies more closely spaced harmonics around a formant. A higher-pitched source provides fewer, making the resonance envelope harder to estimate from the resulting spectrum.',
  'This helps explain why vowel identity can become less clear in very high singing or some high-pitched speech. It does not mean that the tract has lost its resonances or that a formant has become the fundamental.',
  'A low voice gives the mouth many nearby harmonics to shape. In a very high voice, a formant can lie in a gap between harmonics and become harder to hear or measure clearly.')

C('spectrogram',
  '**A spectrum describes frequency content at one moment**, while **a spectrogram follows frequency content through time**. In a spectrogram, time runs horizontally and frequency runs vertically.',
  'Darkness represents amplitude, so a darker region contains stronger energy at that time and frequency. Broad formant bands can rise and fall as the vocal tract changes shape during speech.',
  'In an /i/ to /a/ transition, F1 rises and F2 falls as the first two resonances move toward the /a/ pattern. Reading that change identifies the acoustic relationship without tracing every plotted value.',
  'A spectrum is one snapshot of the frequencies. A spectrogram puts many snapshots in time order and uses darkness to show which frequencies are strongest.')

C('continuous-speech',
  '**Connected speech contains changing formant patterns**, because the tongue and lips move between sound configurations. In the phrase “Where were you a year ago?”, the acoustic pattern continues changing rather than becoming a row of isolated steady vowels.',
  'A rising F2 can accompany movement toward an /i/-like configuration, while lip rounding can lower the resonances toward a /u/-like pattern. The changing bands connect articulatory movement to the sound over time.',
  'The relevant information is the direction and relationship of the bands across a stretch of speech. Identifying a sound can depend on its transitions as well as on an instant taken from the middle.',
  'Speech sounds flow into one another because the mouth keeps moving. Following the formants through time gives information that a single frozen slice leaves out.')

C('splice',
  '**A consonant can be identified partly from the vowel that follows it**. Combining the consonant from ma with the vowel from na can produce an impression of na because the vowel carries a transition associated with /n/.',
  'The vowel after a nasal retains information about the preceding articulation. When that transition conflicts with the isolated consonant segment, the following information can strongly influence the final percept.',
  'Speech recognition therefore uses context over time rather than deciding every tiny segment independently. The result supports a contextual account without requiring the claim that only large language models can recognize speech.',
  'The vowel after a consonant still carries clues about how that consonant was made. A clue in the following vowel can outweigh the consonant fragment pasted before it.')

C('vowel-network',
  '**A vowel classifier can take F1 and F2 as its two inputs** and return a distribution over five word categories. Each output position corresponds to a category such as done, dune, dean, Don or Dan.',
  'The hidden layers transform the two measured formants into representations used by the final layer. The learned weights determine which input patterns support each category.',
  'A low F1 with a high F2 is associated with /i/, so the corresponding target is dean in this example. A correct prediction depends on learning the formant-to-category relationship rather than memorizing the order in which recordings arrived.',
  'The network receives two numbers describing a vowel and decides which of five categories fits. Training changes the connections so useful formant patterns lead toward the right category.')

C('weights',
  '**A weight controls how an incoming activation contributes to the next neuron**. The receiving neuron multiplies each input by its own connection weight and adds the resulting contributions.',
  'A positive weight preserves the sign of an incoming activation, while a negative weight reverses it. Its magnitude controls the strength of the contribution, so a large weight is not automatically a good weight.',
  'Random initial weights have not yet learned the vowel categories. Training improves how the network combines the inputs by changing the connections in response to errors.',
  'A weight tells a neuron how strongly to count an input and whether to add or subtract its influence. Useful weights come from learning, not from merely being large or positive.')

C('forward',
  '**Forward propagation computes a prediction using the current weights**. Each processing layer combines the activations from the preceding layer, and its results become the inputs to the next layer.',
  'The input layer supplies the measured values rather than applying a new set of weights. The output stage converts the final evidence into the network’s decision over the possible categories.',
  'A network can perform a complete forward pass and still make the wrong decision. Producing a prediction and improving the weights are different operations, even though prediction is needed to discover an error.',
  'Information moves from the inputs through the processing layers to a decision. The network uses the weights it already has during this pass, even if those weights lead to a mistake.')

C('probabilities',
  '**A probability distribution has no negative entries and sums to one**. Its entries describe how the network allocates probability across the available categories.',
  'The position of an entry determines which category it refers to. A target for dean puts one at the dean position and zero at the other positions, giving the training process a specific desired answer.',
  'A valid distribution can still favor the wrong category. Validity checks the form of the decision, while accuracy checks whether the favored category matches the recording.',
  'The probabilities must fit between zero and one and add up to one altogether. They can follow those rules and still put the most probability on the wrong answer.')

C('backward',
  '**Backpropagation starts at the output because the error is most directly connected to the last processing layer**. An early weight affects the result through several intermediate layers, so its contribution is harder to work out directly.',
  'The algorithm computes downstream error information first and reuses it to determine the effects of earlier weights. This is the dynamic-programming idea of solving smaller dependent problems before the larger problems that contain them.',
  '**Backpropagation computes gradients**, while an optimizer such as SGD uses them to change the weights. The backward calculation uses the forward-pass values, then the update applies the resulting corrections.',
  'An output connection has a short route to the mistake, while an early connection has a long route through the network. Working backward reuses the easier calculations to solve the harder ones.')

C('weight-direction',
  '**A proposed weight change must be traced through the sign of the incoming activation and the desired output**. For a positive incoming activation, increasing a direct output weight raises that output’s raw score.',
  'If that category is already receiving too much probability, pushing its score upward works against the target. For an early hidden weight, the overall effect also depends on downstream weights and pathways.',
  'A useful directional answer states the local contribution and connects it to the error. It does not assume that increasing every weight helps or that all hidden connections affect the final decision in the same direction.',
  'Check what the connection multiplies and whether that output should rise or fall. A change that helps one output can worsen another, which is why the whole error pathway matters.')

C('training-data',
  '**Each input row must stay paired with its correct target row**. The input row contains the recording’s F1 and F2, while the target row identifies its vowel among the five output categories.',
  'For dean, the target has a one in the dean column and zeros elsewhere. Moving an input row without its target would teach the network the wrong association even if every number remained well formed.',
  'The displayed example tables identify the two-column and five-column roles. Their row labels and the later dataset size should be read from the particular source rather than assumed to describe one unchanged dataset.',
  'A row of formant measurements has to stay with the row saying which vowel produced it. Mixing up those pairs gives the network incorrect teaching information.')

C('sequential',
  '**nn.Sequential arranges processing layers in the order their outputs are passed onward**. In nn.Linear(2, 3), two input values feed a layer with three output neurons.',
  'The next layer must accept the number of values the preceding layer produces. The sequence with processing sizes three, two, four and five has three hidden layers and a final five-category output layer.',
  'To insert a three-neuron hidden layer before the output, change the old final connection to take four values and produce three, then add a connection taking three values and producing five. Matching the neighboring sizes preserves the route through the network.',
  'Sequential means the layers run one after another. Each layer must produce exactly as many numbers as the next one is built to receive.')

C('training-code',
  '**The training code separates making a prediction, calculating loss, calculating gradients and updating weights**. Importing PyTorch supplies existing tools for these operations rather than requiring each algorithm to be written again.',
  'The loss compares the prediction with the targets, and loss.backward() calculates gradients through the network. The optimizer’s step then updates the parameters using those gradients and the chosen learning rate.',
  'Clearing gradients prevents unwanted accumulation from previous steps. Recognizing these jobs explains the program without memorizing every dot, bracket or numerical coefficient.',
  'The code makes a guess, measures the mistake, works out how the connections contributed and changes them. The learning rate controls how large those changes are.')

C('sigmoid',
  '**Sigmoid converts a neuron’s weighted sum into a bounded activation between zero and one**. Large negative sums produce values near zero, large positive sums produce values near one, and a sum of zero produces one half.',
  'The S-shaped curve is steepest near the middle and flatter near the extremes. Similar changes in the input can therefore have different effects depending on where they fall on the curve.',
  'Adding sigmoid between linear layers introduces a nonlinear transformation. A hidden activation being between zero and one does not make all hidden activations a probability distribution, because they are not required to add to one.',
  'Sigmoid squeezes a weighted sum into a value between zero and one. It responds most around the middle and changes less near either extreme.')

C('sigmoid-flow',
  '**A changed hidden activation changes the inputs received by later layers**. Applying sigmoid therefore requires recomputing the downstream network rather than replacing one number and leaving the final decision untouched.',
  'Each hidden neuron first combines its weighted inputs and then applies the nonlinear function. The transformed value is what travels through the outgoing connections.',
  'The final category probabilities can change even though the original formant measurements have not changed. Inserting sigmoid changes the processing performed between the measurements and the decision.',
  'After a hidden value is passed through sigmoid, the next layer receives that new value. Every later layer must use the changed input when it computes its own result.')

C('overlap',
  '**Vowel categories can overlap in an F1–F2 scatterplot**, so one measurement does not always identify a category perfectly. Each point represents a vowel token, with its position determined by its two formant measurements.',
  'Nearby points have similar measured formants even when their category labels differ. A classifier must learn useful boundaries from the pattern of labeled examples rather than assume every category occupies a completely separate region.',
  'The scatterplot supplies evidence about the classification problem before training is judged. Training accuracy describes decisions on the training examples and does not by itself establish performance on new speakers.',
  'Different vowels can have very similar first and second formants. When their points overlap, the network cannot rely on a perfectly separate patch for every vowel.')

C('accuracy',
  '**Accuracy measures the proportion of category decisions that are correct**. With five equally likely categories, uniform guessing has an expected accuracy of twenty percent.',
  'Training can improve accuracy as the weights learn useful distinctions, but the curve can fluctuate before settling. A final plateau means additional updates in that run are no longer improving the measured training decisions.',
  'The supplied linear-network run levels off near forty-five percent on its training data. That outcome describes this architecture and run, rather than proving that all neural networks or all vowel classifiers have the same limit.',
  'Accuracy asks how often the chosen vowel is right. Five equally likely choices give a one-in-five guessing baseline, and a training curve tracks whether learning does better than that.')

C('initialization',
  '**Different initial weights can produce different learning paths on the same data**. The starting point changes the early predictions and gradients even when the architecture and training procedure stay fixed.',
  'The ten displayed runs follow different routes before reaching the same final training accuracy. That comparison separates variation in the path from variation in the eventual result.',
  'Repeated runs provide stronger evidence about the behavior of this training setup than one selected run. Their agreement does not establish an identical numerical result for every software library or every possible initialization.',
  'The same training problem can begin with different random connections. Those runs may improve in different ways even when they eventually reach the same accuracy.')

C('recurrent',
  '**A recurrent network carries information from one step into another**, allowing its current processing to depend on prior state. This extends a network that classifies one static vector at a time.',
  'Feedback supplies context for the next computation, making a sequence more than a collection of independent inputs. Speech production and prediction both depend on information unfolding through time.',
  'The useful connection is that the system repeatedly transforms a representation while retaining relevant context. Recurrence is one route to sequence processing, while modern language models use additional mechanisms.',
  'A recurrent network passes some information forward to the next moment. Its next response can therefore depend on what happened earlier in the sequence.')

C('next-token',
  '**Next-item prediction applies to a sequence of numerical vectors**, regardless of what those vectors represent. Words, sound, images and other data can all be represented as numbers for a model to process.',
  'The model uses the available context to assign probabilities to possible continuations. Learning improves those probabilities when the actual continuation supplies feedback.',
  'A token’s position in the sequence and its context help determine what should come next. The prediction task stays recognizable even when the represented material changes from words to another kind of signal.',
  'The model receives a sequence represented by numbers and guesses what comes next. It learns by comparing its guess with the continuation that actually occurred.')

C('phonotactics',
  '**Phonotactics concerns which sound sequences a language allows**. English permits some consonant combinations before or after a vowel while excluding others in the same position.',
  'An onset occurs before a syllable’s vowel, and a coda occurs after it. A cluster that works across a syllable boundary does not necessarily work at the beginning of a syllable.',
  'The spelling examples provide clues to these restrictions, but letters and speech sounds are different units. The beginning of knee, for example, contains written k even though its ordinary pronunciation does not begin with /k/.',
  'A language allows some groups of sounds and rejects others. Where a group falls within a syllable helps determine whether it can occur.')

C('letter-guess',
  '**A next-letter choice can reveal knowledge of allowed word patterns**. After sp at the beginning of a word, a vowel, l or r fits familiar English patterns, while n does not fit the onset pattern used here.',
  'Some beginnings permit many continuations while others sharply restrict the possibilities. A probability distribution can express that difference by spreading probability broadly or concentrating it on fewer choices.',
  'Learning from many such completions can capture regularities without receiving a separate verbal rule for each one. The spelling exercise probes useful language knowledge while remaining distinct from a complete description of English phonology.',
  'Some word beginnings leave many choices, while others allow only a few. Getting the next letter right requires learning those restrictions from the pattern of examples.')

C('heads',
  '**Parallel attention heads process different relationships within one layer**, while successive layers build revised representations. Parallel work and depth therefore contribute in different ways.',
  'A layer combines information from its heads before passing representations onward. The next layer can then operate on information that already incorporates those relationships.',
  'The expert analogy describes specialized computational contributions rather than separate people or guaranteed interpretable skills. Multiple heads in one layer are not the same as multiple complete agents exchanging messages.',
  'Several heads work alongside one another within a layer. Their information is combined, and later layers use that combined representation to refine the prediction.')

C('dynamic-depth',
  '**A dynamical system repeatedly transforms a state according to a rule**. An oscillator updates position and velocity through time, while a layered language model repeatedly updates its representations through depth.',
  'Following one value through the layers makes the changing representation visible. Different layers can have different learned weights, so the analogy concerns repeated transformation rather than identical numerical rules at every layer.',
  'An output can become the input to another processing step in both cases. The comparison links physical change and learned computation without requiring an LLM layer to be a physical spring.',
  'A dynamical rule takes a current state and produces a changed state. A deep network similarly keeps transforming its representation as information passes through its layers.')

C('agents',
  '**An agentic system coordinates models that perform connected tasks**, such as outlining, writing, criticizing and revising. A model’s output becomes information used by another part of the system.',
  'A critic can send feedback to a reviser, creating a loop before the final response is produced. The organization of the tasks matters in addition to the internal computation of each model.',
  'A graph of communicating models is different from the hidden layers inside one network. Feedback can guide revision without automatically making the resulting answer correct.',
  'One model can draft an answer and another can check it. Their messages guide a revision before the system returns its final result.')

C('economy',
  '**A dynamical model can describe how an economic quantity changes over time**, including movement toward an equilibrium. Its variables refer to economic states rather than the displacement of a physical block.',
  'Feedback can reduce a deviation or amplify it depending on how the relationships are arranged. A change in one part of the model can therefore affect the later behavior of the whole system.',
  'The connection to a spring is the shared organization of change, not identical physical materials. Understanding the roles of variables and feedback is more useful here than memorizing a historical aside.',
  'An economic model tracks quantities that affect one another over time. Feedback can pull a quantity back toward a stable level or push it farther away.')

C('speech',
  '**Speaking coordinates the tongue, lips, velum and larynx to convey meaning**. Much of this control develops before a child receives the explicit instruction usually needed for reading and writing.',
  'The movements must work together, because changing one part alters the air passage available to the others. Direct visual feedback is limited, yet the developing speaker learns a large vocabulary and increasingly adult-like coordination.',
  '**Articulatory phonetics** studies how those speech organs move and configure the tract. MRI makes some of that normally hidden coordination visible while a person speaks.',
  'Speech requires several hidden body parts to move together with remarkable precision. Children learn much of that coordination without being taught a separate movement rule for every word.')
C('acoustics',
  '**Acoustic phonetics studies the sound produced by speech**, including vibration of the air in the vocal tract. The air is a moving physical medium, not simply empty space between the tongue and the palate.',
  'Changes in tract shape alter how that air can vibrate. The resulting acoustic pattern carries information about the speech movements that shaped the passage.',
  'Articulation concerns the configuration and movement of the organs, while acoustics concerns the resulting sound. Connecting the two explains how a physical movement becomes information available to a listener.',
  'The mouth shapes a passage full of vibrating air. Studying that sound helps explain how tongue and lip movements become something another person can hear.')
C('ai-science',
  '**Understanding AI requires examining how it works and what its behavior supports**. Social consequences and useful applications both make its mechanisms worth studying carefully.',
  'A convincing response is an observation about behavior, while a theory of how it was produced is a separate explanation. Examining inputs, learned representations and outputs helps connect the behavior to a testable account.',
  'Scientific reasoning asks what evidence supports a proposed explanation and what would distinguish it from another. Familiarity with a product or a confident-sounding answer does not settle those questions.',
  'AI affects people, so understanding its operation matters. Explaining a response requires more than noticing that the response sounds believable.')
C('reasoning',
  '**Understanding involves explaining relationships and applying ideas**, rather than remembering isolated phrases. Two things that look different can share a mechanism, while similar-looking outcomes can have different causes.',
  'A useful comparison identifies which relationships stay the same and which details change. Asking a new question about a familiar example can reveal whether the underlying explanation is understood.',
  'Creative reasoning and careful reading work together when a problem requires more than recalling a definition. The explanation should make the connection clear enough to use in another source-supported situation.',
  'Knowing a phrase is different from knowing how to use the idea. A strong explanation connects the parts and predicts what would change in a new case.')
C('fricatives',
  '**Fricatives keep air flowing through a narrow constriction**, producing turbulent sound. Their place of articulation identifies where the narrowing occurs, and voicing identifies whether the vocal folds vibrate.',
  'The sounds /f/ and /v/ share a lip-and-teeth constriction but differ in voicing. The sounds /s/ and /z/ share an alveolar constriction and form the same voiceless–voiced contrast.',
  'Dental th uses the tongue at the teeth, while postalveolar sh is made farther back. Separating place from voicing makes it possible to explain both similarities and differences within the table.',
  'Fricatives make a sustained noisy airflow through a narrow gap. A pair can use the same gap while differing in whether the vocal folds vibrate.')
C('stops',
  '**Stops involve a complete oral closure**, but the route available to the air determines whether the sound is oral or nasal. The tongue or lips can close the mouth while a lowered velum leaves a path through the nose.',
  'The sounds /b/ and /m/ both use voiced closure at the lips, but /m/ permits nasal airflow. The sounds /d/ and /n/ share an alveolar closure and differ in the same oral–nasal way.',
  'The sounds /k/ and /g/ use a closure at the velum, with voicing distinguishing the pair. A comparison is clearest when it names the shared place and then the differing property.',
  'Closing the mouth does not always stop every route for air. Lowering the velum lets air escape through the nose, which separates nasal sounds such as /m/ from oral sounds such as /b/.')
C('consonants',
  '**Consonants can be compared by voicing, place and manner of articulation**, with nasality specifying an additional airflow distinction. Each dimension answers a different question about how the sound is produced.',
  'Voicing concerns vocal-fold vibration, place concerns the location of a constriction, and manner concerns its type. An oral stop blocks and releases the mouth airflow, while a fricative maintains a narrow noisy passage.',
  'Comparing /n/ with /d/ requires both the shared voiced alveolar closure and the different nasal route. Naming only one property leaves the physical comparison incomplete.',
  'To compare consonants, ask whether the folds vibrate, where the mouth narrows and how the air passes through. Then check whether air can leave through the nose.')
C('ai-skills',
  '**AI models abilities such as recognizing, attending, acting and learning** through numerical computation. These abilities are related but should not be treated as one undifferentiated operation.',
  'Recognition uses current representations to identify an input, while learning changes those representations after experience. An account of knowing must connect what the system has learned to the decisions it can make.',
  'Connections with biological perception can guide the organization of a model without making its arithmetic identical to brain chemistry. The useful comparison concerns the functions and relationships being modeled.',
  'A system can use what it has learned to recognize an input. Learning is the separate process that changes what it will know how to recognize next time.')
C('closure',
  '**Closure is the completion of an incomplete pattern**, such as perceiving a triangle when its edges are not fully drawn. The perceived whole depends on organization supplied beyond the individual marks.',
  'A cloze task removes part of a sequence and asks for a suitable completion. Completing it well requires using relationships among the available parts rather than responding to each part independently.',
  'The visual example and a missing-word task share a completion problem, even though their materials differ. The analogy connects psychological knowledge with prediction without treating the two tasks as physically identical.',
  'People can recognize a whole pattern even when part of it is missing. Filling a gap in a sentence similarly depends on what the surrounding information makes likely.')
C('completion',
  '**A completion task probes knowledge by asking what fits the available context**. Predicting the missing part of a sequence requires information about how its elements usually relate.',
  'A language model represents the context numerically and computes a distribution over possible continuations. The learned weights determine which completions receive more support.',
  'Successful completion provides evidence of learned regularities rather than a direct view into a human-like experience. The task makes a particular ability observable and testable.',
  'Choosing a good continuation requires knowing something about the sequence. The pattern of likely answers reveals which relationships the system has learned.')
C('learning',
  '**Learning begins with predictions that can be wrong**, then uses feedback to improve the parameters behind them. Random initial weights permit a first response without already containing the needed knowledge.',
  'Comparing a prediction with its target reveals a mismatch. Repeated corrections change how future inputs are processed, so later responses can become more appropriate.',
  'Making a prediction is only the beginning of learning. Without an error signal and an update, repeating the same computation with unchanged weights does not teach the system the target relationship.',
  'The system makes a guess before it knows the answer. Feedback about that guess guides changes that can improve the next attempt.')
C('sgd',
  '**Stochastic gradient descent changes an estimate using information from observations**. In the averaging example, the current estimate is compared with a sampled data value and corrected by a fraction of the discrepancy.',
  'If the estimate is above the sampled value, subtracting a positive discrepancy moves it down. If it is below the sampled value, the discrepancy is negative and subtracting it moves the estimate up.',
  'Different samples can pull in different directions, so individual steps can jitter while the overall tendency approaches the data’s average. The estimate does not have to improve relative to every possible measure after each observation.',
  'Compare the current guess with one observation and move partway toward it. A high observation pulls the guess up, while a low observation pulls it down.')
C('initial-estimate',
  '**An initial estimate is a starting state rather than an answer justified by the data**. The averaging example begins with an arbitrary guess so observations can supply the information that changes it.',
  'A starting value above the target must generally move downward, while one below it must generally move upward. In both cases the objective is a smaller discrepancy, not a particular direction on the graph.',
  'Changing the initial condition can change the path while leaving the target unchanged. This separates where a process starts from the behavior its rule tends to produce.',
  'A first guess gives the process somewhere to begin. Starting high or low changes the direction of correction, while the data still determine the target.')
C('sgd-down',
  '**An observation below the current estimate produces a positive discrepancy** in the averaging rule. Subtracting a fraction of that discrepancy moves the estimate downward toward the observation.',
  'Only part of the discrepancy is corrected when the learning rate is below one. The new estimate therefore reflects both its earlier value and information from the sampled observation.',
  'A downward movement is useful when it reduces the relevant error, not because downward movement is always desirable. Another observation can call for the opposite direction.',
  'When a sampled value is lower than the guess, the correction lowers the guess. The learning rate determines how far it moves toward that observation.')
C('sgd-up',
  '**An observation above the current estimate produces a negative discrepancy** in the averaging rule. Subtracting a fraction of a negative discrepancy increases the estimate.',
  'The two minus operations work together to move the estimate toward the higher observation. The rule therefore chooses the appropriate direction without needing a separate instruction to move up.',
  'The estimate can increase while the error decreases. Confusing the numerical direction of the estimate with the direction of improvement would reverse the interpretation.',
  'A higher observation pulls the guess upward. That upward movement can be an improvement because it brings the guess closer to the data.')
C('rate',
  '**The learning rate sets the size of a correction**, creating a tradeoff between rapid movement and steadiness. A larger rate gives each observation more influence on the next estimate.',
  'Large corrections can approach a target quickly but can also follow random sample variation more strongly. Small corrections change the estimate more slowly and usually make the path steadier in this example.',
  'A smaller learning rate does not mean no learning, and a larger one does not guarantee a better final result. The useful answer states both the change in speed and the change in fluctuation.',
  'A large learning rate takes bigger steps and reacts more strongly to each observation. A small one takes smaller steps, so it moves more slowly but is less easily pushed around.')
C('system',
  '**A dynamical system consists of elements whose relationships produce behavior over time**. Understanding the elements alone leaves out the interactions that organize the result.',
  'In speech, the tongue, lips, velum and larynx act together to convey a thought. In another system, the elements and purpose can differ while the need to explain their relationships remains.',
  'A useful model identifies the changing state and the rule relating one state to another. Shared organization can connect systems that look very different on the surface.',
  'A system is more than a list of parts because the parts affect one another. Explaining their connections helps explain how the whole system changes.')
C('octopus',
  '**An octopus coordinates its arms with its surroundings to accomplish an action**. The behavior depends on relationships among the arms, nervous system, ground and target rather than on one isolated arm movement.',
  'Smaller action patterns can combine into a complex motor sequence. Their order and coordination help make the full action effective in the current environment.',
  'The comparison with speech concerns the organization of many moving parts. A goal-directed pattern can be understood through the interactions among its components without pretending that an arm is a tongue.',
  'An octopus has to coordinate several arms and respond to the environment. Small movements become a useful action when they are organized together.')
C('greedy',
  '**A greedy route algorithm chooses the cheapest available next step** without evaluating all later consequences. The first inexpensive edge can lead into an expensive remainder of the route.',
  'The cost of a complete path is the sum of its successive edges. A locally favorable choice therefore does not establish that the total route is cheapest.',
  'Greedy search is fast because it makes limited comparisons. That speed comes with the risk of missing the globally best solution in the illustrated shortest-path problem.',
  'The cheapest next move can lead to an expensive finish. A good full route depends on what happens after that first move too.')
C('exhaustive',
  '**Exhaustive search evaluates every possible complete path** and compares their total costs. It can identify the best route in the supplied finite problem because no candidate path is omitted.',
  'Many complete routes contain overlapping pieces, so evaluating each independently repeats work. The number of candidates can grow rapidly as the problem becomes larger.',
  'Its strength is completeness, while its weakness is the cost of repeated calculation. Dynamic programming keeps the useful comparison while reusing shared partial solutions.',
  'Trying every route can find the cheapest one, but it repeatedly works through pieces shared by several routes. That makes a larger problem slow to solve.')
C('dynamic-programming',
  '**Dynamic programming solves shared subproblems once and reuses their answers**. A large problem can be built from smaller problems whose solutions are needed by several alternatives.',
  'In a shortest-path problem, the cheapest remaining cost from a state can be calculated from the costs of its outgoing edges and the already solved destination states. Reusing those values prevents each complete route from recalculating the same remainder.',
  'The order of calculation follows the dependencies among the problems. Solving the smallest available cases first makes their answers ready for the larger cases that require them.',
  'Solve a small piece once and keep its answer. Any bigger route that needs that piece can reuse it instead of doing the same work again.')
C('value',
  '**A state value summarizes the best remaining cost from that state to the goal**. It represents an entire optimal continuation rather than just the cost of one outgoing edge.',
  'For each available next state, add the edge cost to that next state’s solved value. Choose the smallest resulting total to obtain the value for the current state.',
  'Following the best total after the values are known is different from choosing the smallest edge before considering the future. The stored value carries the information the greedy choice leaves out.',
  'A value tells you the cheapest cost of finishing from a particular place. Add that remaining cost to the cost of reaching it before comparing your choices.')
C('least-time',
  '**The path of least distance can differ from the path of least time** when speed changes across regions. A longer route through a faster region can finish sooner than a shorter route through a slow one.',
  'Comparing routes therefore requires choosing the quantity being minimized. Refraction provides a physical example in which different travel speeds change the preferred path.',
  'The common problem is optimization under the available conditions. Minimizing the wrong quantity can produce a solution that is internally consistent but answers a different question.',
  'The shortest route is not always the fastest route. A correct comparison has to include how quickly movement happens in each part.')
C('settling',
  '**Balancing feedback reduces a deviation from equilibrium**, with the change pointing against the displacement. A positive displacement calls for a negative correction, while a negative displacement calls for a positive one.',
  'In the simple first-order example, the correction becomes smaller as the system approaches its target. Coffee approaching room temperature and an estimate approaching its target can therefore share a similar pattern of settling.',
  'This return differs from an undamped mass–spring oscillation, where inertia carries motion past equilibrium. A target-directed correction alone does not explain repeated overshoot.',
  'The farther the state is from the target, the stronger the pull back toward it. As the gap shrinks, the correction shrinks too.')
C('position-velocity',
  '**Velocity determines how position changes**, while the restoring acceleration depends on displacement from equilibrium. A mass can have zero position and still have substantial velocity as it passes through the middle.',
  'At a turning point, velocity is zero but the restoring acceleration points toward equilibrium. At equilibrium, the restoring force is momentarily zero while the mass continues moving through it.',
  'Keeping the quantities separate explains the cycle without confusing being at rest with being at the equilibrium position. The pattern depends on how position and velocity continually change one another.',
  'Position tells you where the mass is, and velocity tells you how it is moving. Passing the middle does not mean stopping, while turning around briefly does.')
C('frequency',
  '**Frequency counts complete cycles per second**, and hertz names that unit. A higher-frequency vibration fits more cycles into the same interval of time.',
  'Amplitude measures how large the movement is rather than how often it repeats. A vibration can therefore have a large amplitude and low frequency, or a small amplitude and high frequency.',
  'Comparing frequencies requires holding the time interval constant. Counting peaks without checking the time scale can confuse a longer recording with a faster vibration.',
  'Frequency is how often a vibration repeats, while amplitude is how big the movement is. More cycles in the same amount of time means a higher frequency.')
C('cochlea',
  '**The basilar membrane in the cochlea separates frequencies through differences in mass and stiffness**. Its light, stiff region responds best to higher frequencies, while its heavier, more compliant region responds best to lower ones.',
  'An incoming sound can contain several frequencies together. Different regions respond to different components, and associated neural activity carries information about that frequency pattern toward the brain.',
  'The location of a response therefore helps encode frequency. The explanation connects the mechanical properties to the neural information rather than treating the ear as a device that simply copies a whole waveform.',
  'Different parts of the inner ear are suited to different vibration speeds. Where the membrane responds helps the nervous system tell which frequencies are present.')
C('euler',
  '**A numerical update approximates continuous change with small steps**. The new state is obtained by using the current state and a rule describing its rate of change.',
  'Explicit Euler uses the old position and old velocity for their respective updates. Updating position first and then using that new position for velocity changes the numerical method and can change the long-run behavior.',
  'The plotted oscillator paths therefore depend on the update rule as well as on the intended physical model. A computer calculation is an approximation whose behavior has to be checked against the system it represents.',
  'A computer follows change by taking many small steps. Which values it uses at each step can affect whether the simulated motion stays bounded or drifts away.')
C('templates',
  '**Template matching compares incoming information with stored patterns**. A recognition decision favors the template whose pattern best fits the input.',
  'Both the input and a learned template can be represented as numerical vectors. An inner product combines corresponding entries into a score that depends on their relationship.',
  'The score is part of the comparison rather than a verbal label already contained in the input. Learned templates make prior experience useful when a new signal arrives.',
  'Recognition can compare a new pattern with patterns already learned. Numerical matching provides a way to express that comparison in a model.')
C('hierarchy',
  '**Hierarchical processing transforms an input through successive representations** before a decision is made. The output of one stage becomes information available to the next.',
  'A multilayer network repeats weighted combination across its processing layers. Later representations depend on the transformations already performed by earlier layers.',
  'The intermediate layers are hidden because they lie between the supplied input and the final output. Their role is to process the information, not to stand for additional labeled answers.',
  'Recognition can happen through several stages rather than one direct comparison. Each stage changes the information passed to the next one.')
C('brain-model',
  '**A mathematical neuron models a relationship between incoming activity, connection strengths and an output**. It simplifies biological processing into operations that can be calculated and studied.',
  'The weights correspond to the different influences assigned to incoming signals. A weighted sum expresses one aspect of integration without reproducing every chemical and electrical detail of a biological neuron.',
  'The model’s usefulness depends on which behavior it helps explain. A biological inspiration does not make every aspect of a network identical to a brain.',
  'A model neuron turns several influences into one calculated response. It is a simplified account of processing rather than a complete biological cell.')
C('bad-data',
  '**Learning can faithfully follow incorrect observations**, so a successful update is not a guarantee of a useful target. An unusually large erroneous value can pull an average estimate away from the intended quantity.',
  'The update rule responds to the supplied data rather than knowing which observation was a recording mistake. Repeating the process can therefore learn a regularity in a corrupted dataset.',
  'Checking the data is a separate responsibility from checking the learning algorithm. A well-executed computation can produce a poor real-world answer when its inputs misrepresent the problem.',
  'A learning rule cannot automatically know that one supplied number was a mistake. It can learn the wrong pattern if the training information is wrong.')

C('air-pressure',
  '**Sound involves alternating compression and expansion of air**. When particles crowd together, density and pressure rise, and when they spread apart, density and pressure fall.',
  'A particle moves back and forth locally while the pressure disturbance travels through the medium. The movement of the disturbance is therefore different from a particle traveling the full distance from speaker to listener.',
  'The pressure pattern provides the acoustic signal that can be recorded. Tracking this pattern connects physical air motion to a waveform without treating air as a string moving sideways.',
  'Air particles move closer together and farther apart as sound passes. Their local back-and-forth motion creates a traveling pattern of pressure changes.')
C('waveform',
  '**A waveform records how a quantity changes through time**, such as pressure at one location. Repeated vibration produces a repeating shape, and a simple harmonic oscillation can follow a cosine-shaped pattern.',
  'The horizontal axis gives time and the vertical axis gives the measured value. A point on the curve is one measurement, while a full repeated pattern is one cycle.',
  'A trace through time differs from a picture of all positions in a string or air column at one instant. Separating those displays prevents the vertical curve from being mistaken for a particle’s path through the whole medium.',
  'A waveform tells you how the measurement at one place changes over time. One complete repeated pattern counts as one cycle.')
C('mixture',
  '**A sound can contain several frequencies at once**, so a complex waveform is not evidence that only one vibration is present. The combined signal reflects the contributions of its components.',
  'A spectrum separates the mixture by frequency and gives the strength of each component. Different relative strengths can produce different sound qualities even when several component frequencies are shared.',
  'Vowels and musical sounds therefore require more than identifying one repeating rate. The distribution of energy across frequencies carries information about the sound’s quality.',
  'Several vibrations can combine into one sound. A spectrum helps identify which frequencies contribute and how strong they are.')
C('inertia',
  '**Inertia is the tendency of a moving mass to continue moving**, unless a net force changes its motion. Returning to a particular position does not itself remove the velocity the mass has acquired.',
  'In a spring system, the restoring force changes as the mass moves through different displacements. The mass can keep traveling past equilibrium before that opposing force brings it to a stop and reverses it.',
  'The spring supplies the restoring tendency while mass supplies resistance to changes in motion. Their interaction explains overshoot more fully than saying the spring simply wants to return to the center.',
  'A moving mass does not stop just because it reaches the middle. A force has to slow and reverse its motion.')
C('differential',
  '**A differential equation states a relationship involving rates of change**. It can express how a system’s present state determines the direction and speed of its next change.',
  'For an oscillator, velocity gives the rate of position change, while displacement helps determine acceleration. Solving or approximating those relationships produces a predicted path through time.',
  'The conceptual task is to connect the sign of a change with the system’s behavior. Recognizing a restoring relationship is different from memorizing a sequence of arithmetic updates.',
  'A rate-of-change rule tells you how a state will start changing from where it is now. Following the rule through time predicts the system’s behavior.')
C('recognition',
  '**A classifier turns a numerical signal into a decision over possible identities**. The input might represent an image or a speech waveform, while the output positions correspond to the candidate categories.',
  'The same input values can lead to different decisions under different weights. Learned connections determine which patterns count as evidence for a particular category.',
  'A signal vector and a category distribution therefore have different jobs. The input represents what was measured, while the output represents the model’s decision about it.',
  'The network receives a numerical description of something and decides which category fits. Its learned connections determine how it uses the measurements.')
C('network-shape',
  '**The illustrated vowel network has two input values, three hidden layers and five output neurons**. The hidden layers contain three, two and four neurons in sequence.',
  'A fully connected layer gives each receiving neuron one weight for every incoming neuron. The number of weights on one neuron therefore depends on the size of the preceding layer, not on the number of outputs at the end.',
  'The input values supply F1 and F2, while the final five positions stand for vowel categories. Counting processing layers separately from the supplied input makes the network diagram agree with its four Linear declarations.',
  'Two formant measurements pass through hidden groups of three, two and four neurons before reaching five category outputs. Every receiving neuron combines the values arriving from the previous group.')
C('levels',
  '**A neuron, a network, a sequence model and an agentic system describe different levels of organization**. A neuron combines inputs, a network combines processing stages, and a sequence model uses context to predict a continuation.',
  'An agentic system connects models through messages and assigned tasks. Its graph of interactions sits outside the hidden processing layers of an individual model.',
  'Shared numerical operations can remain useful as the organization becomes more complex. Adding a higher level does not make the lower-level operations disappear.',
  'A single calculated response can become part of a network, and a model can become part of a larger system of cooperating tasks. Each level adds organization around the processing inside it.')
C('atomic-analogy',
  '**Wave patterns also provide a way to describe aspects of atomic systems**. The comparison emphasizes organized modes and different characteristic frequencies rather than a literal picture of tiny classical springs inside an atom.',
  'A model can borrow a mathematical relationship while representing a different kind of physical system. The useful connection is the role of structured patterns, not the appearance of a familiar shell drawing.',
  'An analogy should identify the relationship it transfers. Treating every feature of the everyday model as a literal description would go beyond the comparison.',
  'Different physical systems can have organized wave patterns. A shared pattern can be useful without making an atom the same physical object as a spring and block.')

C('software',
  '**Software 1.0, 2.0 and 3.0 distinguish three ways to organize a computational task**. The first writes explicit procedures, the second learns parameter values from examples, and the third coordinates language models through task instructions and communication.',
  'An explicitly written program specifies operations in a language such as Python. A trained network instead stores useful input-to-output relationships in its weights, while an agentic arrangement can ask models to draft, check and revise the result.',
  'These forms can work together in one system rather than replacing every earlier operation. Natural-language instructions can organize agents that still rely on trained parameters and executable software.',
  'A task can be organized by writing its steps, training a model from examples, or coordinating models through instructions. A system can combine all three kinds of organization.')

C('learned-knowledge',
  '**Learned weights carry information used to turn an input into a prediction**. Their collective values determine which relationships between the supplied signal and possible answers the model has learned.',
  'The input describes the present case, while the parameters supply a learned way of processing it. Training changes those parameters using feedback about the model’s mistakes.',
  'A response can change because the input changes or because learning changes the weights. Separating those possibilities keeps the current evidence distinct from the knowledge used to interpret it.',
  'The model uses learned numbers to connect what it receives with what it predicts. New experience can change those numbers and therefore change its later responses.')
C('connection-scale',
  '**Knowledge can be distributed across a very large set of connections**. A model’s many weights and the brain’s many synaptic connections motivate a comparison about distributed organization.',
  'The comparison answers the objection that a large number of learned values is automatically unlike biological knowledge. It directs attention to how connections jointly support useful behavior rather than to one isolated stored fact.',
  'Large scale alone does not establish identical mechanisms or identical understanding. The informative question is how the organized connections help explain the system’s decisions.',
  'Many learned connections can contribute to one useful response. Comparing large collections of connections motivates an organizational analogy rather than a claim that their physical parts are identical.')
C('two-vibrators',
  '**Voiced speech involves the vibrating vocal folds and the vibrating air in the vocal tract**. Those two physical systems contribute different aspects of the resulting sound.',
  'The folds provide the driving vibration, while the tract’s configuration changes the air’s response. Tongue and lip movements can therefore change the sound without being another pair of vocal folds.',
  'Keeping the two vibrating systems separate makes it easier to explain how a voice can retain its source while changing vowel quality. Both systems can be studied through their physical movement and restoring effects.',
  'The folds vibrate and drive the air in the mouth to respond. Changing the mouth changes that air response while the folds continue supplying the voiced source.')
