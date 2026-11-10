"""Plausible conceptual alternatives, each with its own correction."""

# Each row pairs an alternative with the specific misconception it tests.
ALTERNATIVES = {
 'restore': [
  ('The restoring force is greatest at equilibrium.', 'At equilibrium the spring force is zero. The mass can still have velocity and continue through it.'),
  ('Reaching the natural length removes the mass’s velocity.', 'Natural length describes position, not velocity. Inertia carries the moving mass onward.'),
  ('The spring keeps pushing in the same direction throughout the cycle.', 'Restoring force changes direction across equilibrium and opposes displacement.')],
 'transverse': [
  ('The particles must move in the same direction relative to the system’s length.', 'Longitudinal and transverse name different directions of particle motion. Both can combine restoring force and inertia.'),
  ('Both systems stop whenever they reach equilibrium.', 'Equilibrium removes the instantaneous restoring force, while motion can continue through it.'),
  ('The two directions require unrelated explanations of repeated motion.', 'Changing the direction of motion preserves the shared restoring-force and inertia relationship.')],
 'heavier': [
  ('Frequency increases because more mass produces more restoring force at the same displacement.', 'Stiffness is held fixed, so the restoring force at a given displacement does not increase. Greater inertia slows the cycle.'),
  ('Frequency stays fixed because only starting displacement matters.', 'Starting displacement sets amplitude in the ideal linear model. Mass and stiffness set its frequency.'),
  ('Vibration stops because the heavier mass cannot reverse direction.', 'A finite increase in moving mass slows the oscillation without removing its restoring mechanism.')],
 'stiffer': [
  ('Frequency decreases because a stronger spring resists all motion.', 'Greater restoring force reverses the same mass more quickly, raising frequency.'),
  ('Frequency stays fixed unless the starting displacement changes.', 'Starting displacement changes amplitude. Greater stiffness changes the rate of oscillation.'),
  ('Frequency increases only if mass increases by the same proportion.', 'Increasing mass would oppose the stiffness effect. Stiffness alone can raise frequency.')],
 'amplitude': [
  ('Their frequencies differ while their amplitudes agree.', 'Cycle count per second is the frequency and is equal. Peak height is the differing amplitude.'),
  ('The taller trace has a higher frequency as well as a larger amplitude.', 'Greater height does not add cycles to the same time interval.'),
  ('Their amplitudes cannot be compared without counting more cycles.', 'The stated peak-height difference already establishes different amplitudes.')],
 'two-low': [
  ('The masses move in opposite directions.', 'Opposing motion deforms the middle coupling more strongly and belongs to the higher mode.'),
  ('One mass stays still throughout the cycle.', 'The symmetric two-mass lower mode involves both masses moving together.'),
  ('The masses alternate between independent single-mass vibrations.', 'A normal mode is one coordinated spatial pattern, rather than a sequence of unrelated vibrations.')],
 'two-high': [
  ('The masses lose effective inertia whenever their directions differ.', 'The masses remain the same. Stronger deformation and restoring action explain the higher frequency.'),
  ('The coupling spring is less deformed by opposite motion.', 'Moving apart and together changes the coupling’s length more than shared-direction motion.'),
  ('Opposite motion has a higher frequency solely because its amplitude is larger.', 'Mode frequency follows the restoring interaction and inertia, rather than the arbitrary drawing amplitude.')],
 'three-count': [
  ('Two, because one pattern leaves the middle mass still.', 'A stationary middle mass is part of one coordinated mode. It does not remove a degree of freedom from the system.'),
  ('Six, counting each direction of travel separately.', 'Forward and backward motion are phases of the same mode, not separate normal modes.'),
  ('One, because the masses are connected into one object.', 'The three masses can move independently within the connected system, giving three normal modes.')],
 'three-high': [
  ('Mode 1, because its motion spans the whole chain.', 'All three patterns span the chain. Alternating neighboring motion gives Mode 3 stronger restoring action.'),
  ('Mode 2, because its middle mass is stationary.', 'A node identifies the spatial pattern. It does not by itself make that pattern the highest-frequency mode.'),
  ('All three have equal frequencies because the physical masses are the same.', 'Different coordinated patterns engage the couplings differently, so the same system has different mode frequencies.')],
 'middle-load': [
  ('Mode 1, because the masses move together.', 'The middle mass moves in Mode 1. Making it heavier lowers that mode’s frequency.'),
  ('Mode 3, because its higher frequency prevents a mass effect.', 'The middle mass moves in Mode 3, so added inertia affects that mode too.'),
  ('All modes, because a mass change must affect a chain uniformly.', 'The local effect depends on participation. Mode 2 leaves the middle mass still.')],
 'four-count': [
  ('Three modes, because adding a mass changes only the existing patterns.', 'An additional independent moving degree of freedom adds a fourth normal mode.'),
  ('Eight modes, counting two directions for each mass.', 'The two travel directions within a cycle do not double the independent mode count.'),
  ('Two modes, because four masses must always move in pairs.', 'The connected masses support four independent patterns rather than being restricted to two paired motions.')],
 'mixture': [
  ('Only the lower-frequency component remains in the combined motion.', 'Superposition preserves both contributions. A more complex trace does not erase the higher component.'),
  ('The combination adds a third independent normal mode to the system.', 'A sum of existing modes is a possible motion, rather than another independent spatial mode.'),
  ('Two modes must occur in separate time periods rather than together.', 'Multiple normal modes can contribute simultaneously to the measured displacement.')],
 'continuous': [
  ('A single rigid mass with no internal pattern.', 'A continuous medium still permits different positions to move differently.'),
  ('A system with only one mode because the masses are no longer counted separately.', 'The continuous limit supports a sequence of spatial modes rather than removing independent patterns.'),
  ('A medium whose every position must move by the same amount.', 'A string’s different mode shapes distribute displacement differently along its length.')],
 'node-cycle': [
  ('Any point that reaches its resting position at one instant.', 'A moving point crosses rest during a cycle. A node stays at zero displacement throughout the mode.'),
  ('The point with the largest displacement amplitude.', 'Greatest displacement identifies an antinode, not a node.'),
  ('A point where frequency becomes zero while the rest vibrates at another frequency.', 'A mode has one shared oscillation frequency. Its node has zero displacement amplitude.')],
 'node-mass': [
  ('The mode slows most strongly because the added mass is at a still point.', 'The still point has no motion to load in that ideal mode. Moving locations show the mass effect.'),
  ('Frequency rises because adding mass makes the node stiffer.', 'The question changes mass alone. Added stiffness would be a separate physical change.'),
  ('The mode disappears because its node can no longer remain stationary.', 'Mass at the exact node can remain stationary with it, preserving the ideal mode.')],
 'node-stiff': [
  ('The node has the largest displacement and therefore the strongest inertia.', 'A displacement node stays still. Nearby relative deformation explains the stiffness effect.'),
  ('Stiffness raises frequency by increasing moving mass.', 'Increased mass tends to lower frequency. Stronger restoring action explains the rise from stiffness.'),
  ('A stationary point implies that every nearby part is undeformed.', 'Small local displacement can coexist with strong relative deformation of neighboring parts.')],
 'antinode-load': [
  ('At a fixed endpoint, because zero motion makes the added mass most influential.', 'An ideal fixed endpoint does not move, so the added moving-mass effect is absent there.'),
  ('Near a node, because deformation and displacement are the same quantity.', 'Deformation and displacement differ. The moving-mass effect follows the displacement pattern.'),
  ('Equally everywhere, because the added mass has the same size.', 'The same mass affects a mode differently according to how strongly its location moves.')],
 'box-opposite': [
  ('Both frequencies rise because increased stiffness always dominates.', 'Stiffness dominates in the deformation-heavy Mode 3 region, while mass dominates the moving Mode 4 region.'),
  ('Both frequencies fall because added mass matters equally in both modes.', 'The motion differs at the boxed location. Its strong deformation permits Mode 3 to rise.'),
  ('Neither changes because equal physical changes must cancel in every mode.', 'The two effects are weighted by different mode patterns, so simultaneous increases do not imply cancellation.')],
 'same-place': [
  ('The physical position changes material identity when a different mode is considered.', 'The physical system stays the same. Its coordinated pattern of motion changes.'),
  ('Only the first mode can respond to a local change.', 'Any mode can respond when it moves or deforms at the changed location.'),
  ('A local change must shift all modes by the same amount.', 'Different motion and deformation at that position can produce different shifts, including opposite directions.')],
 'ff-pieces': [
  ('Odd numbers of quarter-waves.', 'Odd quarter-wave counts connect a node to an antinode. Both fixed endpoints require nodes.'),
  ('Any fraction of a wavelength.', 'Arbitrary fractions generally fail to leave both endpoints at zero displacement.'),
  ('Only one half-wave.', 'Two, three and further whole half-wave counts also keep both endpoints fixed.')],
 'ff-five': [
  ('200 Hz, because all modes share the fundamental.', 'The fundamental names Mode 1. Mode 5 has five times its frequency in this ideal model.'),
  ('1,800 Hz, counting only odd multipliers.', 'The fifth odd multiplier is nine, but this is a fixed–fixed string. Its fifth mode is five times 200 Hz.'),
  ('40 Hz, dividing the fundamental by five.', 'Fitting more half-waves shortens wavelength and raises frequency, so Mode 5 is higher than Mode 1.')],
 'ff-three': [
  ('750 Hz, applying the third odd multiplier.', 'The third odd multiplier describes the third ideal fixed–free resonance. Fixed–fixed Mode 3 is three times 150 Hz.'),
  ('150 Hz, because higher mode number changes only amplitude.', 'A different normal mode has a different spatial pattern and frequency.'),
  ('50 Hz, dividing the fundamental by three.', 'Three half-waves have shorter wavelength than one, giving a higher frequency.')],
 'shorter-wave': [
  ('Wavelength becomes longer at the same wave speed.', 'More pieces fit only when each piece is shorter. At fixed speed, shorter wavelength raises frequency.'),
  ('Drawing more lobes adds moving mass to the string.', 'The physical string stays the same. The allowed spatial pattern changes.'),
  ('Higher modes release the fixed endpoints.', 'Every allowed mode must satisfy the same endpoint constraints.')],
 'free-pieces': [
  ('Two, four and further even quarter-wave counts.', 'Starting at a node, an even count ends at another node rather than the required antinode.'),
  ('Every positive integer count.', 'The end constraints exclude counts that place the wrong spatial condition at the free end.'),
  ('Only a single quarter-wave.', 'Adding pairs of quarter-waves preserves the node-to-antinode relationship and permits higher modes.')],
 'free-next': [
  ('1,000 Hz, using the next whole-number multiple.', 'The ideal neutral tube has odd-multiple resonances. Its second allowed resonance is three times 500 Hz.'),
  ('500 Hz, keeping all resonances equal.', 'Distinct allowed patterns have distinct frequencies. The second is higher than the fundamental.'),
  ('2,500 Hz, skipping directly to the fifth multiple.', 'The third multiple, 1,500 Hz, is already allowed and is the next resonance.')],
 'free-even': [
  ('It would require a negative moving mass.', 'The exclusion follows from the spatial endpoint pattern, without any negative-mass assumption.'),
  ('It would remove the node at the fixed endpoint.', 'Beginning the pattern at a node preserves the fixed end. An even count instead gives the wrong condition at the other end.'),
  ('It is excluded because voiced sources contain only odd harmonics.', 'Periodic voiced sources can contain both even and odd harmonics. This restriction concerns ideal tube resonances.')],
 'top-building': [
  ('Frequency rises because the added mass supplies restoring stiffness.', 'Moving mass and stiffness play different roles. The added inertia slows the mode.'),
  ('Frequency stays fixed because a free top is a displacement node.', 'The free top moves strongly in the comparison, so it has a substantial mass-loading effect.'),
  ('All endpoint constraints swap because extra mass makes the top fixed.', 'Adding a moving load does not by itself clamp the top or release the base.')],
 'building-air': [
  ('Both systems require transverse particle motion.', 'The building bends sideways, while air motion is longitudinal. The shared feature is the endpoint relationship.'),
  ('Their materials must have identical resonance values.', 'An analogy transfers a structural relationship without asserting identical materials or numerical frequencies.'),
  ('Both ends have zero displacement.', 'The comparison uses a constrained end and a freely moving end, rather than two fixed ends.')],
 'air-long': [
  ('The physical upward path of a particle through the tube.', 'The vertical drawing encodes displacement along the tube. It is not a literal sideways particle trajectory.'),
  ('The local pressure rather than particle displacement.', 'A displacement drawing and a pressure drawing encode different quantities with different spatial patterns.'),
  ('The instantaneous frequency at each position.', 'A mode has a shared frequency. Its drawing varies the displacement amplitude across positions.')],
 'air-compress': [
  ('Where neighboring particles move together with unchanged separation.', 'Compression requires a change in particle spacing, not merely shared translation.'),
  ('Only at a displacement antinode because motion and compression peak together.', 'Strong displacement and strong compression occur at different positions in the ideal standing mode.'),
  ('Equally everywhere because the air occupies one connected tube.', 'Connection permits a standing pattern with spatially varying motion and compression.')],
 'air-antinode': [
  ('Little motion and strong local compression.', 'That describes the contrasting behavior near a displacement node.'),
  ('Strong motion and necessarily the strongest compression.', 'Neighbors can move together near an antinode without strong local crowding.'),
  ('Zero air inertia because the point is freely moving.', 'Freely moving air still has mass. Its inertia explains the loading effect there.')],
 'narrow-up': [
  ('Increased inertia, because added moving mass raises frequency.', 'Added inertia tends to lower frequency. A strong rise instead points to dominant restoring stiffness.'),
  ('Exact cancellation of the mass and stiffness effects.', 'Cancellation would leave the frequency unchanged, contrary to the stated rise.'),
  ('A higher F0 automatically carried into F2.', 'F0 describes source periodicity. The stated change concerns a tract resonance and a local constriction.')],
 'narrow-two': [
  ('One formant belongs to the source and the other to the tract.', 'Both F1 and F2 are tract resonances. Their differing mode patterns explain opposite shifts.'),
  ('The constriction changes the resonance labels without changing the frequencies.', 'The prediction concerns physical frequency shifts, not renaming unchanged resonances.'),
  ('The same narrowing must have the same dominant effect on both modes.', 'Motion and compression differ between modes at the same location.')],
 'u-both': [
  ('Both rise because adding effective mass speeds the vibration.', 'Inertial loading slows the strongly moving air in both modes.'),
  ('F1 rises and F2 falls because the first mode has a lip node.', 'The ideal lip end has substantial displacement in both first modes, supporting decreases in both.'),
  ('Neither changes because the lips are an open end.', 'An open end permits strong motion. Loading that moving region can alter its resonances.')],
 'i-opposite': [
  ('F1 rises while F2 falls.', 'That reverses the pictured /i/ relation. The front constriction is motion-heavy for Mode 1 and compression-heavy for Mode 2.'),
  ('Both rise because the same narrowing affects both modes.', 'The same location participates differently in the two modes, so their dominant effects differ.'),
  ('F1 and F2 stay fixed while only F0 changes.', 'Tongue configuration changes tract resonances. F0 is the separate source repetition rate.')],
 'a-opposite': [
  ('F1 falls while F2 rises.', 'That is the opposite direction from the illustrated /a/ constriction, where Mode 1 is stiffness-dominated and Mode 2 mass-dominated.'),
  ('Both fall because every constriction is equivalent to loading at the lips.', 'An internal constriction occupies a different place in each mode pattern than lip loading.'),
  ('Both become equal to F0.', 'Tract resonances remain different quantities from the source fundamental.')],
 'high-vowels': [
  ('A shared high tongue position fixes both formants at identical values.', 'Front-versus-back placement and lip shape still differ and change the resonances.'),
  ('Spelling differs while the vocal-tract configurations remain identical.', 'The two vowel sounds involve different physical tract configurations.'),
  ('High describes a large F0 rather than tongue position.', 'High vowel describes articulation. It does not by itself specify voice pitch.')],
 'source-spacing': [
  ('F1, because the first formant creates the first harmonic.', 'F1 is a tract resonance. Harmonic spacing follows the source fundamental F0.'),
  ('The amplitude of the strongest spectral peak.', 'Peak height describes strength, while the frequency gap is set by periodicity.'),
  ('The distance between the first two formants.', 'Tract-resonance spacing and source-harmonic spacing describe different relationships.')],
 'harmonics-150': [
  ('150, 450, 750, 1,050 and 1,350 Hz.', 'This skips every even harmonic. A periodic source’s harmonic series includes whole-number multiples, not only odd ones.'),
  ('150, 151, 152, 153 and 154 Hz.', 'Successive harmonics are spaced by F0, here 150 Hz, rather than by one hertz.'),
  ('0, 150, 300, 450 and 600 Hz.', 'Zero is not the first positive harmonic. The first five begin at F0 and end at five times F0.')],
 'filter-heights': [
  ('The spacing between the source harmonics.', 'With the periodic source held fixed, harmonic spacing stays tied to its F0. The filter changes relative strengths.'),
  ('The source period, making a new F0 for each formant.', 'Tract resonances shape a source rather than turning each resonance into another source fundamental.'),
  ('The source’s even harmonics into obligatory zeros.', 'A tract filter does not impose a universal odd-only harmonic series on a periodic source.')],
 'harmonic-formant': [
  ('A harmonic is a tract resonance and a formant is a source multiple.', 'This reverses the relationship. Harmonics follow source periodicity, while formants characterize tract resonances.'),
  ('F2 must equal the second harmonic in every vowel.', 'The shared ordinal number does not couple source spacing to tract resonance frequency.'),
  ('Both name any dark spectral line without a physical distinction.', 'A source line and a resonance envelope can be related in a recording while arising from different mechanisms.')],
 'pitch-change': [
  ('The formants must all rise by the same factor.', 'Similar tract configuration can preserve similar resonances while source harmonics spread farther apart.'),
  ('Only harmonic heights change while their spacing stays fixed.', 'Increasing F0 directly increases the gap between successive harmonics.'),
  ('The sound must change vowel category even if the tract configuration stays similar.', 'Pitch and vowel quality depend on different source and tract relationships.')],
 'sparse': [
  ('The tract loses its resonances whenever F0 is high.', 'The resonances can remain present while fewer source harmonics sample their envelope.'),
  ('High pitch necessarily makes every harmonic equally strong.', 'Filtering can still produce unequal strengths. Sparse frequency samples make the envelope harder to estimate.'),
  ('More harmonics crowd into each formant region as F0 rises.', 'Higher F0 increases spacing, leaving fewer harmonics within the same frequency range.')],
 'spectrum': [
  ('The entire time sequence of changing frequency patterns.', 'A spectrogram preserves that sequence. One spectrum describes an analysis window.'),
  ('Pressure against time at one recording position.', 'That is a waveform. A spectrum organizes the signal by frequency.'),
  ('Only the tract shape, independent of the recorded source.', 'A recorded spectrum contains the shaped source, so both source and filtering influence it.')],
 'spectrogram-axes': [
  ('Frequency is horizontal, amplitude vertical, and darkness encodes time.', 'Those axes resemble a spectrum combined with an incorrect color key. A spectrogram uses horizontal time and vertical frequency.'),
  ('Time is horizontal and frequency vertical, but darkness encodes pitch.', 'Darkness represents amplitude at a time-frequency location. Pitch is not the darkness value.'),
  ('Time is vertical and frequency horizontal, with darkness encoding amplitude.', 'The amplitude key is right, but the conventional axis orientation stated in the task is reversed.')],
 'spectrogram-rise': [
  ('Amplitude increases while frequency stays fixed.', 'Upward position means a higher frequency. Stronger amplitude would be represented by increased darkness.'),
  ('Time runs backward because the band changes height.', 'Time progresses horizontally. A vertical change encodes changing frequency.'),
  ('F0 must increase by exactly the same amount as the band.', 'A formant band reflects a resonance. Its change does not force an identical change in source F0.')],
 'i-to-a': [
  ('F1 falls and F2 rises.', 'That reverses the /i/-to-/a/ comparison. The expected movement is rising F1 and falling F2.'),
  ('Both stay fixed because the source can remain voiced.', 'Continued voicing does not keep tract resonances fixed when tongue configuration changes.'),
  ('Both rise because the more open vowel has higher values for every resonance.', 'Opening is not a rule that all formants rise. F1 and F2 follow different mode relationships.')],
 'splice-context': [
  ('The consonant fragment alone must determine the heard consonant.', 'The vowel transition also carries consonant-related information, so fragment origin does not uniquely determine perception.'),
  ('The following vowel provides only vowel identity and no consonant information.', 'Changes near the vowel onset reflect the preceding articulatory transition and can influence the consonant percept.'),
  ('The result requires the consonant’s steady portion to be physically replaced by /n/.', 'The exercise tests a splice whose contextual transition can shift perception even when the consonant fragment came from ma.')],
 'predict-test': [
  ('A waveform peak height with no timing or frequency measurement.', 'Height alone measures amplitude. Regular harmonic spacing requires frequency information or an analysis that establishes it.'),
  ('A tract drawing showing only where the tongue narrows.', 'The drawing supports a resonance prediction but does not measure the voice signal’s harmonic spacing.'),
  ('A spectrum from an unrelated noise signal.', 'The prediction concerns the measured periodic voiced source, so an unrelated signal does not test it.')],
 'membrane-rule': [
  ('Every real membrane has the demonstration’s exact harmonic frequencies.', 'The displayed settings illustrate a combination of modes. They do not establish a universal membrane frequency rule.'),
  ('Each measurement point must show every mode equally strongly.', 'A point’s measured contribution depends on whether that mode moves there.'),
  ('A complex trace is one additional independent mode.', 'A sum of existing spatial modes can look complex without adding another independent normal mode.')],
 'network-input': [
  ('The vowel’s correct category and its one-hot target.', 'Those identify the desired output. The classifier’s measured inputs are F1 and F2.'),
  ('F0 and overall amplitude.', 'Pitch and loudness are acoustic quantities, but the specified classifier receives the first two formants.'),
  ('The learning rate and the hidden-layer widths.', 'Those configure training and architecture, rather than describing the measured vowel token.')],
 'network-hidden': [
  ('Four, counting the five-category output layer as hidden.', 'Hidden layers lie between input and output. The final five-neuron layer is the output.'),
  ('Five, counting both the supplied input and final output as hidden.', 'The supplied measurements and the category outputs are the boundaries, leaving three intermediate processing layers.'),
  ('Two, using the number of measured inputs as the hidden-layer count.', 'Input width and number of processing stages are different aspects of architecture.')],
 'incoming-weights': [
  ('One, shared by all four incoming connections.', 'A fully connected receiving neuron has a separate weight for each incoming activation.'),
  ('Five, adding one for the receiving neuron itself.', 'The receiver is not another incoming activation. A bias, when present, is a separate parameter from the four connection weights.'),
  ('Sixteen, counting every connection between two four-neuron layers.', 'That can describe a whole layer’s weight count. The question asks about one receiving neuron.')],
 'weight-role': [
  ('It specifies which category is correct independently of the input.', 'The target specifies the known category. A weight scales one contribution during processing.'),
  ('It changes the number of input features at every forward pass.', 'A weight changes the transformation, while feature count follows architecture.'),
  ('It must equal the activation being passed across the connection.', 'Activation is the carried value and weight is its multiplier. They have different roles.')],
 'negative-sign': [
  ('It makes every incoming contribution positive.', 'Multiplication by a negative value reverses the incoming sign. A positive input therefore contributes negatively.'),
  ('It removes the connection exactly as a zero weight would.', 'A negative weight still scales and transmits a contribution. A zero weight removes that local contribution.'),
  ('It makes the final category probabilities negative.', 'An internal weighted contribution is not itself the final probability representation.')],
 'forward-role': [
  ('Changing the weights using the gradient of the error.', 'That is an update step. Forward propagation first computes activations with the current weights.'),
  ('Calculating the error contribution of each weight backward from the output.', 'That describes backpropagation, which depends on the prediction already computed.'),
  ('Supplying the correct target as the measured input.', 'The target is used to evaluate a prediction, rather than replacing the measured input in a forward pass.')],
 'random-wrong': [
  ('The distribution is invalid solely because its preferred category is wrong.', 'A list can satisfy probability constraints while assigning the highest value to an incorrect category.'),
  ('The measured input must be invalid whenever an untrained network is wrong.', 'Unhelpful random parameters can produce errors from valid measurements.'),
  ('The target changes to done because that output is largest.', 'The known category stays dean. A mistaken prediction does not relabel the recording.')],
 'valid-list': [
  ('[0, 0, 0, 0]', 'The entries are nonnegative, but their sum is zero rather than one.'),
  ('[-0.5, 0, 0.5, 1]', 'The sum is one, but the negative entry violates the probability constraint.'),
  ('[0.3, 0.3, 0.4, 0.5]', 'The entries are nonnegative, but they sum to 1.5 rather than one.')],
 'dean-target': [
  ('[1, 0, 0, 0, 0]', 'The first position identifies done in the stated order, rather than dean.'),
  ('[0, 1, 0, 0, 0]', 'The second position identifies dune. Dean occupies the third position.'),
  ('[0, 0, 0, 0, 1]', 'The last position identifies Dan. Target position must follow the stated output order.')],
 'last-target': [
  ('[1, 0, 0, 0, 0]', 'This identifies the first category rather than the last.'),
  ('[0.2, 0.2, 0.2, 0.2, 0.2]', 'This expresses equal support for all five categories. It does not identify the known last category.'),
  ('[0, 0, 1, 0, 0]', 'This identifies the middle category, not the fifth one.')],
 'paired-rows': [
  ('The target contains another pair of measured formants.', 'The input contains measurements. The matching target identifies the recording’s category.'),
  ('Any normalized target teaches the same association.', 'Normalization alone does not make the category correct. Mispaired rows teach the wrong association.'),
  ('Every numerical entry must be equal across an input and its target.', 'They encode different kinds of information, so numerical equality is not the pairing requirement.')],
 'backward-order': [
  ('Early weights do not influence the final decision.', 'They do influence it through later stages. Those downstream dependencies explain the backward calculation.'),
  ('The calculation changes the order of the input sequence to find the target.', 'Backpropagation calculates error gradients through the computation, rather than reversing the observed data.'),
  ('Each early weight can be evaluated without knowing any downstream effect.', 'Its final influence depends on the paths and transformations following it.')],
 'dp-reuse': [
  ('Recompute every shared downstream path independently for each earlier weight.', 'That discards the reuse that makes the dynamic-programming calculation efficient.'),
  ('Choose the largest immediate weight and ignore every later connection.', 'This resembles a local greedy choice. Backpropagation accounts for downstream effects.'),
  ('Reuse the same gradient forever without recomputing a new error.', 'Reuse occurs within the relevant dependent calculation. A new input or parameter state can require new gradients.')],
 'gradient-step': [
  ('The backward call applies the parameter change and the optimizer then measures error.', 'The backward call calculates gradients. The optimizer uses them to change parameters.'),
  ('Both calls declare the architecture without processing the current error.', 'Architecture declaration is separate. These operations participate in learning from the current computation.'),
  ('The optimizer replaces the target with the largest prediction.', 'Training changes parameters to improve agreement with targets. It does not make errors disappear by relabeling targets.')],
 'positive-output': [
  ('Its raw score falls because increasing any weight reduces error.', 'The local product rises for a positive activation. An increase is not automatically helpful.'),
  ('The raw score stays fixed because only hidden weights contribute to outputs.', 'A direct output weight contributes directly to that output’s weighted sum.'),
  ('The target’s one-hot entry increases along with the score.', 'The target is fixed supervision. Changing a weight changes processing, not the known category.')],
 'negative-output': [
  ('The contribution becomes more positive because the weight increased.', 'A fixed negative activation reverses that direction. Increasing the multiplier makes its product more negative.'),
  ('The contribution stays fixed because only a positive activation can carry a weight effect.', 'Negative activations also contribute and respond to weight changes.'),
  ('The target becomes negative to match the contribution.', 'Targets and internal contributions are distinct. Changing a weight does not rewrite the target.')],
 'early-weight': [
  ('An early weight is ignored during forward propagation.', 'Its contribution enters intermediate activations and can affect later outputs.'),
  ('Only the sign of that weight matters, with no role for later connections.', 'Downstream signs, magnitudes and transformations determine how its influence reaches the output.'),
  ('An early weight affects the target instead of the prediction.', 'The target stays fixed while the early weight changes the processing that leads to a prediction.')],
 'linear-dimensions': [
  ('Three hidden layers followed by two categories in the whole network.', 'The arguments specify the input and output widths of one processing layer, not a whole-network layer count.'),
  ('A layer accepting two values and producing three.', 'This reverses the argument order. The first width is incoming and the second outgoing.'),
  ('Three inputs whose numerical values must all equal two.', 'Widths count activations. They do not fix the numerical values of those activations.')],
 'insert-hidden': [
  ('A four-to-five layer followed by a three-to-five layer.', 'The first output width would be five, which does not match the next layer’s three-value input.'),
  ('A three-to-four layer followed by a five-to-three layer.', 'Neither incoming dimension connects the existing four activations through three neurons to five outputs.'),
  ('A four-to-five layer alone.', 'That keeps the old direct connection and does not insert the requested three-neuron stage.')],
 'input-processing': [
  ('The input already contains the correct category.', 'The input supplies measured features, while the correct category is represented by the target.'),
  ('The input performs a weighted transformation with its own incoming connections.', 'The supplied features precede the first learned Linear transformation in this definition.'),
  ('The input is hidden because it contains fewer values than the output.', 'Hidden describes an intermediate processing layer, not a comparison of widths.')],
 'clear-gradients': [
  ('To reset all learned parameters to their initial values.', 'Clearing stored gradients leaves the learned parameter values available for the next forward pass.'),
  ('To clear the target labels before every update.', 'Targets remain available for error calculation. The cleared values are accumulated gradients.'),
  ('To remove every nonlinear activation from the model.', 'Gradient storage and the model’s activation functions are different parts of the computation.')],
 'rate-size': [
  ('More hidden layers are inserted.', 'The learning rate scales the parameter correction. It does not change the declared architecture.'),
  ('The recorded formant measurements become larger.', 'The update changes model parameters, rather than the physical measurements supplied as data.'),
  ('The correction becomes smaller because learning finishes sooner.', 'With the same gradients, a larger learning rate directly produces larger steps. Faster convergence is not guaranteed.')],
 'sigmoid-low': [
  ('A large negative activation.', 'Sigmoid maps the weighted sum into a bounded positive range, approaching zero for very negative inputs.'),
  ('An activation close to one.', 'That is the limiting response to a very positive input, not a very negative one.'),
  ('Exactly one half for every input.', 'One half is the response at zero. Sigmoid changes with the incoming weighted sum.')],
 'sigmoid-mid': [
  ('Zero, because the input has no positive contribution.', 'Sigmoid’s midpoint is one half at an input of zero.'),
  ('One, because zero already reaches the maximum.', 'Finite zero input lies at the curve’s center, not its upper limit.'),
  ('An undefined value because sigmoid requires a nonzero input.', 'Sigmoid is defined at zero and returns one half.')],
 'sigmoid-nonlinear': [
  ('It only renames the layers while preserving every numerical mapping.', 'Sigmoid changes the mapping through a nonlinear bounded response.'),
  ('It guarantees a correct answer for every training example.', 'Nonlinear processing changes what the architecture can represent. Correct learning still depends on data and training.'),
  ('It forces the hidden width to equal the number of output categories.', 'An activation function transforms values without imposing equality between hidden and output widths.')],
 'sigmoid-probability': [
  ('They must be negative when a category is uncertain.', 'Sigmoid activations remain bounded between zero and one. Their sum is the separate issue.'),
  ('Each neuron’s bounded value makes the whole vector normalized.', 'Separate bounds do not guarantee that the entries across neurons add to one.'),
  ('They are one-hot targets because every activation is bounded.', 'A bounded computed activation is neither necessarily zero or one nor a supplied category target.')],
 'sigmoid-downstream': [
  ('Keep the old output probabilities because only a hidden value changed.', 'The changed hidden activation feeds later computations, so their results must be recalculated.'),
  ('Replace the measured inputs with the target category.', 'Applying a hidden nonlinearity does not change the role of measured inputs or supervision.'),
  ('Discard all outgoing weights because the hidden value is now bounded.', 'Later layers still combine transformed activations using their own weights.')],
 'vowel-overlap': [
  ('The labels are already completely separated by those two measurements.', 'Overlapping differently labeled regions show that the two measurements do not perfectly separate all tokens.'),
  ('Formants cannot be measured because the categories overlap.', 'The measurements can be valid while still providing incomplete category separation.'),
  ('Each plotted category must have exactly one F1 and one F2 value.', 'A category contains variation across tokens and speakers rather than a single fixed point.')],
 'scatter-axes': [
  ('Time and recorded pressure.', 'Those describe a waveform. This scatterplot locates tokens using F1 and F2.'),
  ('Training iteration and classification accuracy.', 'Those describe a learning curve, not a vowel’s acoustic feature coordinates.'),
  ('Source F0 and overall loudness.', 'Pitch and amplitude differ from the first two tract-formant measurements on these axes.')],
 'five-baseline': [
  ('Every finite random run must score exactly twenty percent.', 'Twenty percent is the expected chance rate under uniform guessing. A finite run can vary.'),
  ('Each formant must occupy twenty percent of the total frequency.', 'The baseline counts category choices, not acoustic frequency proportions.'),
  ('Every one-hot target contains five entries equal to twenty percent.', 'That is a uniform prediction. A one-hot target identifies one known category.')],
 'plateau': [
  ('All training decisions are correct because accuracy stopped changing.', 'A stable value below fifty percent still leaves more than half the measured decisions wrong.'),
  ('The same accuracy is established for new speakers.', 'The curve reports training performance. Generalization needs an appropriate separate evaluation.'),
  ('Every parameter must have stopped changing.', 'An unchanged aggregate accuracy can coexist with parameter changes and different individual decisions.')],
 'training-unseen': [
  ('More iterations on the same already measured training rows.', 'Further training alone does not measure performance on recordings from new speakers.'),
  ('Renaming the training rows as test data.', 'Changing a label does not create independent evaluation evidence.'),
  ('The fact that all runs use the same architecture.', 'Architectural consistency describes the model, rather than establishing its accuracy on unseen recordings.')],
 'restarts': [
  ('Identical final accuracy proves identical final weights.', 'Different parameter settings can yield the same aggregate accuracy.'),
  ('Different early curves prove different final category counts.', 'The task can retain the same categories while initialization changes the learning path.'),
  ('The matching endpoint establishes perfect classification.', 'A shared final accuracy can still be far below complete correctness.')],
 'restart-constant': [
  ('Arbitrarily changing every target while keeping starting weights fixed.', 'That changes the supervised task, rather than isolating initialization.'),
  ('Changing the number of output categories on every run.', 'That changes architecture and task size, preventing a comparison that isolates starting parameters.'),
  ('Replacing the dataset with different recordings on every run.', 'Changing the observations adds another explanation for the different learning paths.')],
 'linear-limit': [
  ('A necessarily nonlinear transformation because it has several stages.', 'Composition of purely linear transformations remains linear without an intervening nonlinearity.'),
  ('A constant output independent of input.', 'An overall linear mapping can still depend on its inputs.'),
  ('A category distribution guaranteed to be normalized.', 'Linearity alone does not ensure nonnegative entries summing to one.')],
 'recurrent-context': [
  ('Each item must be processed without information from preceding items.', 'Recurrence specifically allows state from an earlier step to affect the current computation.'),
  ('State replaces every learned parameter.', 'The state changes with context while learned weights still determine the processing.'),
  ('The correct next item is already included in every preceding input.', 'Context supplies evidence for prediction. The withheld target is not simply supplied as the answer.')],
 'same-item-context': [
  ('A word must have one fixed continuation regardless of its sentence.', 'The surrounding sequence changes which alternatives fit after that word.'),
  ('The model must update its learned weights before a new sentence can change its prediction.', 'Different context can change inference while the learned parameters stay fixed.'),
  ('The shortest continuation is always preferred regardless of context.', 'Length alone does not capture the relationships supplied by the preceding words.')],
 'vector-material': [
  ('The original physical materials must all be identical.', 'Numerical representation permits a shared computational form across physically different inputs.'),
  ('Every input vector must consist of written English letters.', 'A vector can encode acoustic, visual or other task-appropriate features.'),
  ('A shared numerical framework must ignore order in every modality.', 'A sequence predictor can use ordering relationships among the represented items.')],
 'distribution-uncertainty': [
  ('Negative probabilities for unobserved continuations.', 'Probabilities remain nonnegative. Uncertainty can be expressed by spreading support among alternatives.'),
  ('A value of one for an arbitrary single continuation.', 'Unjustified certainty fails to reflect the several plausible alternatives in the stated context.'),
  ('An all-zero vector because no single continuation is certain.', 'A distribution must still sum to one. Uncertainty changes the allocation, not the normalization requirement.')],
 'sequence-position': [
  ('Only the correct sixteenth item, already provided as the input.', 'That would supply the withheld answer rather than predict it from available context.'),
  ('Only the first vector, because the later context cannot matter.', 'The available sequence can contribute relationships beyond its first item.'),
  ('A requirement that all fifteen earlier representations be identical.', 'The preceding items can differ. Their relationships make the context informative.')],
 'onset': [
  ('The consonants after the syllable’s vowel.', 'That portion is the coda. The onset precedes the vowel.'),
  ('Every consonant anywhere in the written word.', 'Onset is a syllable position, not the set of all consonants in a word.'),
  ('The vowel that forms the syllable nucleus.', 'The nucleus is the vowel-centered portion. The onset is the consonantal material before it.')],
 'coda': [
  ('The consonants before the syllable’s vowel.', 'That portion is the onset. The coda follows the vowel.'),
  ('The vowel at the center of the syllable.', 'The vowel is the nucleus, rather than the following consonantal material.'),
  ('All consonants after the first written vowel in an entire word.', 'Coda is defined within a syllable. Later consonants can instead begin another syllable.')],
 'sp-choice': [
  ('Only n, producing an initial spn cluster.', 'The illustrated English onset permits a vowel, l or r after sp, rather than spn.'),
  ('Only another p, because the cluster must repeat before a vowel.', 'Repetition is not the illustrated onset restriction. A vowel can follow sp directly.'),
  ('Any consonant equally, because the existing onset supplies no restriction.', 'The preceding sp restricts which next sounds fit an English onset.')],
 'skr-choice': [
  ('Another l before the syllable vowel.', 'The illustrated skr onset proceeds into a vowel rather than extending to skrl.'),
  ('Another stop with no vowel required.', 'The consonantal onset must lead into a syllable nucleus in this example.'),
  ('No continuation, because skr cannot begin an English word.', 'An English word can begin with the sounds represented by skr and continue into a vowel.')],
 'syllable-break': [
  ('Sound-sequence restrictions disappear inside a long word.', 'The restrictions still apply, but a syllable boundary can divide the consonants into different structural positions.'),
  ('Every internal cluster must be possible as a single onset.', 'An internal sequence can combine a coda with a following onset rather than form one onset.'),
  ('Written position alone determines pronunciation independently of syllables.', 'The relevant account concerns sound sequence and syllable organization, rather than spelling location alone.')],
 'knee': [
  ('Its spelling establishes that /k/ and /n/ are both pronounced in the onset.', 'The initial written k is silent in ordinary English knee, so spelling does not establish /kn/.'),
  ('The word has no syllable because its spelling begins with a silent letter.', 'The pronounced vowel still supports a syllable with an /n/ onset.'),
  ('Any written two-letter beginning must be a two-consonant spoken onset.', 'Letters and pronounced sounds do not correspond one for one in every word.')],
 'cloze-learning': [
  ('Every restriction must first be entered as an explicit verbal rule.', 'Prediction training can adjust parameters from observed continuations without a separately coded rule for each restriction.'),
  ('The correct continuation is independent of the supplied context.', 'The training task uses the relationship between the preceding sequence and its observed continuation.'),
  ('Errors can teach the restriction without affecting later model behavior.', 'Learning must change processing so that later predictions better reflect the evidence.')],
 'broad-narrow': [
  ('The same uniform support across all letters.', 'A restrictive context provides information favoring fewer continuations, which a useful distribution can reflect.'),
  ('Negative support for disallowed letters.', 'A low or zero probability can represent exclusion. Probability values cannot be negative.'),
  ('A total probability smaller than one because fewer letters fit.', 'The total stays one while support is concentrated among fewer alternatives.')],
 'heads-parallel': [
  ('Heads are successive layers that must process one after another.', 'Heads contribute in parallel within a layer. Successive layers describe a different organization.'),
  ('Layers are separate complete agents exchanging final responses.', 'A layer transforms representations within a model. Agent coordination is a further organizational level.'),
  ('Head count must equal layer count in every model.', 'The counts describe different components and need not match.')],
 'head-expert': [
  ('The head is a separate person with guaranteed subject expertise.', 'Expert is an analogy for a specialized contribution, not evidence of personhood or guaranteed knowledge.'),
  ('The head is an outside critic receiving the model’s finished response.', 'A head is a component within a layer. The outside critic belongs to an agentic organization.'),
  ('Each head must predict an independent final category with its own supplied target.', 'Heads can contribute to a shared representation without each being a separately supervised final classifier.')],
 'layer-state': [
  ('Every successive stage must use exactly the same numerical weights.', 'Passing a representation onward does not require identical parameters at every stage.'),
  ('Every model representation must physically oscillate like a spring.', 'The comparison transfers sequential state change, not the spring’s literal physical motion.'),
  ('Later processing is independent of the representation produced before it.', 'The shared relationship is that a produced state becomes input to further transformation.')],
 'agent-critic': [
  ('The critic is one scalar activation inside the writer’s hidden layer.', 'The critic performs a task as a model in the larger system, rather than being one internal activation.'),
  ('The critic is another name for a parallel attention head.', 'A head contributes inside a layer. A critic evaluates work within a coordinated model system.'),
  ('The critic makes evidence checking unnecessary.', 'A checking procedure can still make errors. Its results require evaluation against evidence.')],
 'revision-loop': [
  ('The draft is passed onward and no information returns to affect another attempt.', 'A purely one-way handoff lacks the return influence that makes this a feedback relationship.'),
  ('The critic produces comments that the reviser never receives.', 'Comments must influence another attempt to close the described correction loop.'),
  ('The same text is returned without using the evaluation.', 'Repetition alone is not correction. The feedback must affect the later processing.')],
 'agent-certainty': [
  ('Every final claim is guaranteed true.', 'The procedure supplies checking, not proof that the checking or revision is reliable.'),
  ('The models no longer use learned parameters during the exchange.', 'Agent coordination adds organization around models that can still rely on learned parameters.'),
  ('Each attention head has become an independent outside evaluator.', 'Internal heads and task-performing agents remain different components.')],
 'software-one': [
  ('Task behavior is specified only by learned weights.', 'That describes the learned-parameter emphasis of Software 2.0. Explicit procedures characterize Software 1.0.'),
  ('The defining feature is models exchanging natural-language tasks.', 'That is the Software 3.0 organization in this comparison.'),
  ('An explicit program cannot be used anywhere in a trained system.', 'The categories can coexist. Training and model coordination can still use executable procedures.')],
 'software-two': [
  ('A hand-written response for every possible observation.', 'That supplies explicit cases rather than learning a mapping through parameters.'),
  ('Only the instructions exchanged among already trained agents.', 'Those organize Software 3.0 tasks. Learned parameters supply the Software 2.0 behavior being compared.'),
  ('A new correct label chosen to match every mistaken prediction.', 'Learning adjusts parameters using evidence. Changing targets to conceal errors would not learn the intended task.')],
 'software-three': [
  ('Discarding every learned parameter before inference.', 'Coordinating models can still use their trained parameters to perform the connected tasks.'),
  ('Renaming three internal layers as three independent agents.', 'Internal layers and models coordinating through tasks are different levels of organization.'),
  ('Requiring the user to implement the entire task in Python.', 'The comparison emphasizes instructions and model coordination while executable code can still support the system.')],
 'sequence-order': [
  ('Reordering forces every vector to become numerically identical.', 'The same vectors can preserve their values while occupying different contextual positions.'),
  ('A sequence model must ignore order and use only the set of items.', 'The available sequence order is part of the information that can change its next-item prediction.'),
  ('Changing the sequence automatically updates all learned weights.', 'New context can change inference without any optimizer update.')],
 'state-versus-update': [
  ('A necessary learning update to every weight.', 'State can change during inference while parameters remain fixed, as stated in the case.'),
  ('Removal of all earlier context.', 'The recurrent state can carry information forward from previous processing.'),
  ('An architectural change to the number of output categories.', 'Changing a processing state does not by itself change the model’s declared output width.')],
 'recurrent-backward': [
  ('Both operations reverse the observed sequence before prediction.', 'Recurrence carries state across processing steps. Backpropagation calculates error gradients through dependencies.'),
  ('Recurrence changes weights while backpropagation only stores the preceding word.', 'This exchanges the roles. Recurrent state supports context, while backpropagation supports learning calculations.'),
  ('Both require replacing every input with its target first.', 'Measured context remains the input. A target evaluates a prediction during training.')],
 'observed-next': [
  ('An arbitrary item unrelated to the recorded continuation.', 'The actual next item supplies the observed relationship that this prediction task is meant to learn.'),
  ('The prediction itself, automatically declared correct.', 'An independent observed continuation is needed to distinguish a successful prediction from an error.'),
  ('Only the preceding item, regardless of what followed it.', 'The context conditions the prediction. The actual next item supplies the target for this task.')],
 'sixteenth': [
  ('Only the first item, already present in the context.', 'The stated task withholds the item after the fifteen supplied vectors, so the immediate target is the sixteenth.'),
  ('Every future item independently of the supplied sequence.', 'The immediate task predicts the next item conditioned on the available preceding context.'),
  ('The correct sixteenth item supplied as another input before prediction.', 'Providing the withheld answer would remove the next-item prediction task.')],
 'vector-not-label': [
  ('Every word representation must be nonnegative and sum to one.', 'Those constraints apply to a probability distribution. A representation vector can serve another numerical purpose.'),
  ('Every list of numbers has the same interpretation.', 'The list’s role matters. Item representation and support across possible continuations encode different information.'),
  ('Distributions can describe vowel categories but never next words.', 'Probabilities can allocate support across possible next-word outcomes too.')],
 'possible-word': [
  ('Whether the sequence already has a known definition.', 'A possible sound pattern can fit English structure without being an existing meaningful word.'),
  ('Whether every sound can occur separately somewhere in English.', 'Individual sound membership alone does not establish that their particular sequence is permitted.'),
  ('Whether its written letters are in alphabetical order.', 'The task concerns sound-sequence restrictions, not alphabetical ordering.')],
 'split-cluster': [
  ('sblit', 'The illustrated onset pattern permits spl, rather than replacing its voiceless stop with b in sbl.'),
  ('lfat', 'The illustrated English onset restrictions exclude this initial lf sequence.'),
  ('bnack', 'The illustrated onset restrictions exclude initial bn, even though its individual sounds occur in English.')],
 'completion-implicit': [
  ('Knowledge exists only after a system writes a verbal grammar.', 'Appropriate predictions can demonstrate sensitivity to a restriction without a verbal account.'),
  ('Correct continuations are independent of the preceding sequence.', 'The informative result is that the continuation fits the specific contextual restriction.'),
  ('One fixed next letter must be copied after every beginning.', 'Different contexts can support different completions. The learned relationship is context-sensitive.')],
 'one-neuron-level': [
  ('A single neuron is already a collection of independent communicating agents.', 'A neuron supplies one modeled weighted response. Agents and networks add different levels of organization.'),
  ('A multilayer network contains no weighted responses.', 'It combines many weighted responses into successive processing stages.'),
  ('Adding layers makes every intermediate representation unnecessary.', 'Intermediate representations are precisely what successive hidden stages produce and transform.')],
 'biological-model': [
  ('It reproduces every chemical and electrical brain process.', 'A simplified arithmetic model preserves selected relationships without reproducing all physical details.'),
  ('Numerical values prevent any useful comparison with perception.', 'A numerical model can still test or explain selected processing relationships.'),
  ('Biological inspiration alone establishes human-like understanding.', 'Inspiration identifies a modeling connection. It does not establish equivalence to a complete human thinker.')],
 'heads-combine': [
  ('Only the first head is retained and all others are necessarily discarded.', 'The parallel contributions are combined into the representation used by further processing.'),
  ('Each head must become a separate outside critic model.', 'Combining internal contributions does not turn layer components into independent agents.'),
  ('The next layer receives only the original input and no head information.', 'The account passes the representation containing those contributions onward.')],
}
