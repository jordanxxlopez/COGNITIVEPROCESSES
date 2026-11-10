"""Section 07. New explanations of all 21 uploaded Exam 2 review prompts."""
REVIEW=[]
def R(n,question,answer,teaching,change,changed_answer,collection,pages,code=''):
    REVIEW.append(dict(id=f'modern-review-{n:02d}',number=n,question=question,answer=answer,
      teaching=teaching,change=change,changedAnswer=changed_answer,
      collection=collection,pages=pages,code=code))

R(1,'Why do systems with multiple masses have multiple frequencies?',
 'The masses can coordinate their motion in **different normal modes**. Each mode has its own pattern of movement and restoring forces, giving it a characteristic frequency.',
 ['The system is not required to move as one rigid block. Neighboring masses can move together or oppositely, changing which connections deform and how strongly the system is restored.',
  'A complicated motion can combine several of these patterns. The frequencies belong to the coordinated modes rather than being assigned one by one to separate masses.'],
 'If two modes are present at once, has the system gained a new independent mass?',
 'No. It is combining patterns already permitted by its moving parts. **A mixture is different from another independent mode**.', 'lecture11',[4,6,7])
R(2,'How many normal modes does a three-mass system have?',
 '**Three normal modes** in the one-direction coupled model. The three independently moving masses provide three degrees of freedom.',
 ['The count concerns independent motion in the model, not the number of springs drawn. The fixed supports constrain the ends rather than adding moving masses.',
  'The three modes are different organized patterns of the entire chain. They are not three isolated movements, one belonging to each mass.'],
 'How many modes would the corresponding four-mass model have?',
 '**Four**, with one independent mode for each moving degree of freedom in this model.','lecture11',[6,7])
R(3,'Which mode of the three-mass system has the highest frequency, and why?',
 '**Mode 3** has the highest frequency. Adjacent masses move oppositely, creating the strongest alternating deformation and restoring action of the three patterns.',
 ['The first mode is broad shared movement, while the highest mode changes direction more often along the chain. Those relative movements make the connections push back more strongly.',
  'The faster vibration follows from the restoring interaction rather than from a claim that the masses became lighter. The comparison keeps the physical masses the same.'],
 'Would the lowest mode be the pattern with the most rapid spatial alternation?',
 'No. The **lowest mode has the broadest coordinated pattern**, with less alternation than the highest one.','lecture11',[6])
R(4,'If the middle mass becomes heavier, what happens to each of the three mode frequencies?',
 '**Modes 1 and 3 decrease**, because the middle mass moves in both. **Mode 2 stays unchanged** in the ideal symmetric system because the middle mass is a displacement node.',
 ['Added inertia affects a mode through the motion occurring at that location. A stationary middle mass contributes no moving-mass effect to the second mode.',
  'The direction of each shift can be predicted from the mode patterns. The apparent height of a drawn oscillation alone is not a reliable basis for comparing the sizes of different frequency shifts.'],
 'Would adding mass at a moving outer position necessarily leave Mode 2 unchanged?',
 'No. **Mode 2 has moving outer masses**, so loading one of those positions can affect its frequency.','lecture11',[6])
R(5,'What does the many-mass-and-spring model approach as the parts become continuous?',
 'It approaches a **continuous vibrating medium**, such as a string. Distributed moving material and elastic coupling allow a sequence of spatial modes.',
 ['The limit replaces separately drawn blocks with material spread along the system. It extends the idea of coordinated motion rather than removing the roles of inertia and restoring force.',
  'The allowed mode shapes and their frequencies still depend on the boundary conditions. Merely making a medium continuous does not establish the same frequency spacing for every shape.'],
 'Does every continuous vibrating surface have the same harmonic series as a uniform string?',
 'No. **Geometry and boundary conditions matter**. The membrane example’s assigned harmonic frequencies are a teaching construction rather than a universal membrane rule.','lecture11',[7,8,9])
R(6,'Where is the greatest spring action in the pictured fifth string mode?',
 'Mark the **displacement nodes**, including the fixed ends and the four interior crossings of the resting line. Those locations have little motion while neighboring parts undergo the strongest relative deformation.',
 ['The five moving lobes are separated by still points. The middle of a lobe moves most, so it should not be circled merely because it is the highest part of the drawn curve.',
  'The word springiness refers to the restoring action associated with deformation in this model. It is a different feature from the visible size of displacement.'],
 'Where would extra mass matter most instead?',
 'Near the **displacement antinodes**, where the string has the largest motion during the mode.','lecture13',[4,5])
R(7,'A string fixed at both ends has a 200 Hz first mode. What is the fifth-mode frequency?',
 '**1,000 Hz**. The fifth mode is five times the 200 Hz fundamental in the ideal uniform fixed-at-both-ends string.',
 ['The frequency multiplier follows from fitting five half-waves into the same string length. With wave speed unchanged, that pattern cycles five times as fast as the first mode.',
  'This is the kind of small numerical relationship the review explicitly asks for. The explanation does not require a differential-equation calculation.'],
 'If the fundamental becomes 150 Hz instead, what is the fifth harmonic?',
 '**750 Hz**, because the fifth harmonic remains five times the new fundamental.','lecture13',[4,5])
R(8,'Why are the frequencies of an ideal string fixed at both ends evenly spaced?',
 'Each allowed pattern fits a whole number of **half-waves** between two still endpoints. At the same wave speed, those patterns have frequencies of one, two, three and further whole-number multiples of the fundamental.',
 ['Both ends must return to zero displacement, which restricts the spatial patterns. Adding another half-wave preserves the two fixed-end conditions.',
  'The equal spacing is a consequence of the ideal string’s geometry and wave speed. It should not be generalized automatically to every object with two supported edges.'],
 'Why does a fixed–free tube not use that same sequence?',
 'Its ends impose different displacement conditions, allowing **odd quarter-wave counts** rather than every whole number of half-waves.','lecture13',[4,8,9])
R(9,'Draw the spectrum through Mode 6 for the string with a 200 Hz fundamental.',
 'Place frequency peaks at **200, 400, 600, 800, 1,000 and 1,200 Hz**. Frequency belongs on the horizontal axis, with peak height representing amplitude.',
 ['The peaks are separated by 200 Hz because the source is the ideal fixed-at-both-ends string. The fifth peak is the 1,000 Hz mode identified in the preceding question.',
  'The question gives the frequency positions, not a measured amplitude for every mode. The positions are required, while equal peak heights would be an additional assumption.'],
 'What changes in the frequency positions if the fundamental doubles?',
 '**Every harmonic position doubles**, and the gap between adjacent peaks doubles as well.','lecture13',[5])
R(10,'A periodic vocal-fold source has F0 at 150 Hz. Draw its first five harmonics.',
 'Place peaks at **150, 300, 450, 600 and 750 Hz**. These are the first five whole-number multiples of the 150 Hz repetition rate.',
 ['F0 determines the source’s harmonic spacing. A vowel filter can change the relative heights of those peaks without turning the harmonic sequence into an odd-only series.',
  'The formant resonances of a neutral fixed–free tract describe the filter, which is a separate part of the sound-production account. Keeping those roles separate prevents the two series from being confused.'],
 'Should the 300 Hz peak be omitted because a neutral vocal tract has odd-multiple resonances?',
 'No. **The source harmonics include even and odd multiples**. The tract’s resonance pattern affects their relative strengths.','lecture14',[15,16])
R(11,'Where is the greatest spring action in the pictured fourth building mode?',
 'Mark the **fixed base and the three interior displacement nodes**. The free top is a point of strong motion, so it is not one of the spring-dominated locations in this ideal comparison.',
 ['The fourth fixed–free pattern contains seven quarter-wave portions. Its still points and moving regions alternate along the height.',
  'The building supplies an analogy for a supported end and a freely moving end. The relevant task is recognizing the local roles, rather than memorizing engineering details of a real structure.'],
 'Which end is most strongly affected by added moving mass in every pictured mode?',
 'The **free top**, because it has strong displacement in the ideal fixed–free pattern.','lecture13',[7,8])
R(12,'What part of speech production is analogous to the fixed–free building?',
 'The **air column in the vocal tract** is the relevant analogy. The glottal end is treated as closed and the lips as open in the neutral-tube model.',
 ['The analogy concerns the different end constraints, not the materials. A building bends transversely, while the air particles move longitudinally.',
  'Both can be represented with a still end and a strongly moving free end in the teaching model. Those conditions help explain which mode patterns are allowed.'],
 'Does the analogy mean air particles bend sideways like the building?',
 'No. **The particle motion is longitudinal**. The shared feature is the organization of the boundary conditions.','lecture13',[7,10,11])
R(13,'Why is the building analogy useful for the vocal tract?',
 'The two systems have **one constrained end and one free end** in the comparison. This shared relationship organizes their mode shapes despite the different materials and directions of physical movement.',
 ['The analogy makes it easier to recognize strong motion near the free end and strong restoring action near still locations. Those roles are later used to reason about local loading and constrictions.',
  'An analogy transfers a relationship rather than every physical detail. The neutral tube’s ideal odd-multiple series is not a claim that every real building has exactly those resonance ratios.'],
 'What should remain the same for an analogy to support a prediction?',
 'The **relevant constraints and causal relationships** must match, even if the visible objects differ.','lecture13',[7,10])
R(14,'Mass and stiffness increase in the boxed string region. What happens to Modes 3 and 4, and why?',
 '**Mode 3 rises and Mode 4 falls** in the pictured comparison. The boxed region is dominated by deformation for Mode 3 and by motion for Mode 4, so the stiffness and inertial effects dominate in different modes.',
 ['The third-mode curve is near a displacement node in that region. Increased stiffness strengthens the restoring effect there, while added mass has little influence on that mode’s local motion.',
  'The fourth mode moves strongly in the boxed region. Increased inertia therefore slows it, making a lower frequency the expected direction despite the simultaneous stiffness change.'],
 'Would a different boxed location necessarily give the same pair of directions?',
 'No. **The local role must be checked again for each mode**. Moving the perturbation can change which effect dominates.','lecture12',[11])
R(15,'Mass and stiffness increase at the free top of the building. What happens to Mode 4?',
 '**Its frequency decreases** in the ideal comparison. The top has strong motion and little local restoring deformation, so inertial loading dominates there.',
 ['The free-end condition is important because it identifies the local role without requiring every point of the structure to be recalculated. The moving load is harder to accelerate and reverse.',
  'This relationship also motivates the free-end loading account of /u/. A similar local role can connect the building example with a vowel prediction.'],
 'What would dominate if stiffness were increased at a strongly deformed still location instead?',
 '**The restoring stiffness effect** would dominate, tending to raise the affected mode’s frequency.','lecture13',[7,16])
R(16,'Why does the ideal fixed–free resonance series use odd multiples of the base frequency?',
 'The first pattern contains **one quarter-wave** between its still end and maximally moving end. Further patterns must add two quarter-waves at a time to preserve those different end conditions, giving one, three, five and further odd counts.',
 ['An even quarter-wave count would end at the wrong kind of point. The odd sequence therefore follows from fitting the required spatial pattern.',
  'Real vowel constrictions change the tube’s shape and shift its resonances. The odd-multiple result describes the ideal neutral comparison, not a fixed ratio required of every spoken vowel.'],
 'Why can the neutral tube’s second resonance be three times the first rather than twice?',
 'The two-quarter-wave pattern fails the free-end requirement. **Three quarter-waves are the next allowed pattern**.','lecture13',[8,9])
R(17,'Which part of speech production is modeled by the fixed–free resonance pattern?',
 'The **resonances of air in the neutral vocal tract**, which are its formants. This is the filter part of the source-filter account.',
 ['The glottal and lip ends supply different constraints for the air column. Changing the tract configuration shifts the formants from the neutral comparison.',
  'The periodic vocal-fold source supplies another frequency structure, its harmonics. That source should not be assigned an odd-only harmonic series just because the tract is modeled as fixed–free.'],
 'Which part sets the spacing of the source harmonics?',
 'The **periodic vocal-fold source and its F0**, rather than the neutral tract’s first formant.','lecture14',[15,16])
R(18,'Describe a spectrogram.',
 'A **spectrogram displays frequency content over time**. Time runs horizontally, frequency vertically, and darkness represents amplitude, allowing changing formant bands to be followed through speech.',
 ['It combines information from successive short analysis windows. A dark region indicates stronger energy at its time and frequency.',
  'The vertical direction therefore represents frequency rather than loudness. The display can preserve a changing vowel transition that a single spectrum would leave out.'],
 'What does a band moving upward represent?',
 '**Its frequency is increasing**. A change in darkness would instead concern its amplitude.','lecture13',[23])
R(19,'A constriction raises a formant strongly. What must be true of motion and compression at that location for the mode?',
 '**Compression and restoring stiffness dominate there**, while motion is relatively small. The constriction’s increased stiffness therefore raises the resonance more strongly than its inertial loading lowers it.',
 ['The conclusion works backward from the observed direction of the frequency change. A fall would instead suggest that the motion-related inertial effect was stronger at the changed location.',
  'The statement concerns that particular mode. Another mode can have a different motion and compression pattern at the same location and respond in the opposite direction.'],
 'Would the same narrowing have to raise every other formant?',
 'No. **Each mode has its own spatial pattern**, so its dominant local effect must be checked separately.','lecture13',[13,17])
R(20,'How many hidden layers are in the pictured network?',
 '**Three hidden layers**, with three, two and four neurons. The last five-neuron layer supplies the output and is not a fourth hidden layer.',
 ['The two measured input values enter before the four processing declarations. Only the processing stages between those inputs and the output count as hidden.',
  'The four Linear lines therefore agree with three hidden layers and one output layer. Counting the input as another learned processing layer would also give the wrong total.'],
 'Would the number of hidden layers change if the last layer had six output categories?',
 'Not by itself. **Changing the output width does not add a hidden processing stage**.','lecture14',[22,25])
R(21,'Insert a three-neuron hidden layer immediately before the output, adjusting the neighboring layer sizes.',
 'Change the old final four-to-five connection to **four-to-three**, then add **three-to-five**. The new hidden group has three neurons, and the final layer still provides the five vowel categories.',
 ['Every layer must accept the number of values the preceding layer produces. The new three-neuron layer therefore needs a three-value connection into the final output stage.',
  'The input and earlier hidden groups stay the same. The required code change expresses the new architecture rather than demanding a fresh implementation of the learning algorithm.'],
 'What would fail if the old four-to-five line were left immediately before a new three-to-five line?',
 'The new line would expect **three inputs but receive five**. The adjacent dimensions would not match.','lecture14',[25],
 'net = nn.Sequential(\n    nn.Linear(2, 3),\n    nn.Linear(3, 2),\n    nn.Linear(2, 4),\n    nn.Linear(4, 3),\n    nn.Linear(3, 5)\n)')
