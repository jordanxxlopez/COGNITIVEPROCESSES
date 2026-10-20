"""Hand-authored slide explanations. Shared entries cover the same source animation."""
def paragraphs(text):
    return [p.strip().replace('\n', ' ') for p in text.strip().split('\n\n')]

COMMON = {
'one_mass': paragraphs('''An **oscillation** is repeated movement around equilibrium, the resting position. A stretched or compressed spring pulls or pushes the mass back toward that position. The mass has **inertia**, so it keeps moving through equilibrium. The spring is then displaced the other way and brings it back again.

In **longitudinal motion**, the mass moves along the spring. In **transverse motion**, it moves across the spring line. The transverse segments are already pulled tight. Moving the mass above or below their resting line changes the direction of their pull, giving a force back toward the line.

Both examples repeat at the same **frequency**, or number of cycles per unit of time, because their masses and total restoring stiffness are matched. Direction alone does not set the rate. These ideal examples have no damping, so the movement continues instead of gradually dying away.'''),
'mass_stiffness': paragraphs('''**Greater mass lowers frequency** when stiffness stays the same. A heavier mass is harder to speed up, slow down, and turn around. The same restoring action therefore takes longer to complete each back-and-forth cycle.

**Greater stiffness raises frequency** when mass stays the same. The same displacement produces a stronger force toward equilibrium, so the mass turns around more quickly and completes more cycles in the same time. Mass changes the resistance to changing motion; stiffness changes the strength of the return.

The longitudinal and transverse examples match within each comparison because their masses and **effective restoring stiffnesses** match. Effective stiffness means the restoring action in the actual direction of movement. Across the spring line, this depends on tension and arrangement. Making a spring harder to stretch along its length does not automatically increase its transverse restoring action.'''),
 'two_modes': paragraphs('''Two equal masses connected between fixed ends have **two normal modes**. A normal mode is a coordinated pattern that repeats at one frequency, with the parts maintaining a particular relationship.

In **Mode 1**, both masses move in the same direction together. Their separation changes little, so the middle connection changes relatively little. In **Mode 2**, they move against each other, strongly compressing and stretching that connection. The stronger restoring action makes Mode 2 faster. Its frequency is higher, without necessarily being exactly twice Mode 1’s frequency.

Both modes can contribute to the same masses at once. Their movements add at each mass, reinforcing in the same direction and canceling partly or completely in opposite directions. This addition is **superposition**. The combined motion contains both frequencies. The longitudinal and transverse versions preserve these relationships while changing the direction of movement.'''),
 'three_modes': paragraphs('''Three equal masses between fixed ends have **three normal modes**. In **Mode 1**, all move in the same direction, but the middle mass moves farthest. Moving together therefore does not require equal distances. This is the lowest-frequency pattern.

In **Mode 2**, the outer masses move oppositely while the middle mass stays at equilibrium because the pulls on it balance. That stationary location is a **node**. In **Mode 3**, the outer masses move together against the middle mass. Neighboring parts oppose one another more strongly, making this the fastest pattern.

The frequencies belong to this chain and are not necessarily one, two, and three times the lowest. When the modes combine, their movements add at each mass. The center can move through contributions from Modes 1 and 3 even though it is a node in Mode 2. The same relationships appear in the matched longitudinal and transverse models.'''),
 'atlas': paragraphs('''Each movable mass adds one independent **normal mode** in the direction being modeled. The chains with one through six masses therefore have one through six modes. The empty spaces mark modes that smaller chains do not have, giving 21 displayed comparisons altogether.

Within a chain, **Mode 1** has the broadest pattern, with the masses moving together. Higher modes introduce more groups moving in opposite directions. The connections undergo stronger relative changes, and the patterns repeat faster. Fixed endpoints remain still; a stationary mass inside one mode does not mean the whole chain has stopped.

Colors identify mode number, while each row identifies the number of masses. The largest movements are scaled to the same displayed size, so height cannot establish which mode is faster. **Amplitude** is movement size; frequency is repetition rate. These separate-mass chains generally lack the exact whole-number frequency spacing of an ideal continuous string.'''),
 'fixed_string': paragraphs('''A **fixed–fixed string** stays still at both endpoints, which are nodes. Mode 1 fits one half-wave into its length; Modes 2–5 fit two through five. More half-waves mean shorter wavelengths and faster repetition at the same wave speed. These frequencies are consecutive **harmonics**, including odd and even multiples of the fundamental.

The same string can contain all five modes. Their movements add at each position, reinforcing or canceling as their cycles progress. The combined outline changes even though the component patterns remain regular. Playback slows all modes equally, preserving their relative rates.

The marked **pickup** measures movement at one point. Its spectrum places frequency horizontally and amplitude vertically. The five peaks correspond to the five components. Their heights are equal because the mode strengths were chosen to give equal contributions at this pickup; another position can give different heights. Equal peaks do not mean equal movement everywhere.'''),
 'membrane': paragraphs('''A **membrane** moves across a surface with fixed outside edges. Its two-number labels count moving regions along the two surface directions. (1,1) has one broad region; (2,1) and (1,2) divide it in different directions; (2,2) makes four regions; and (3,1) makes three along one direction. Neighboring regions move oppositely, separated by stationary nodes.

The five movements add at every point. Contributions can reinforce or cancel, producing one changing surface. The combined panel uses a smaller vertical scale, so its apparent height cannot be compared directly with the individual panels.

The pickup records one location. The spectrum gives frequency horizontally and relative amplitude vertically. The component strengths were chosen to make equal peaks there. Frequencies of 100, 200, 300, 400, and 500 Hz were **assigned for the illustration**, rather than calculated as this rectangle’s natural resonances. Their equal spacing demonstrates combining frequencies; it does not establish that every membrane naturally has harmonic spacing.'''),
 'theory': paragraphs('''A **scientific theory** explains a system precisely enough to make a testable prediction. Differential equations describe how its quantities change. Their purpose here is to connect the proposed mechanism with an observable result, rather than to provide a calculation exercise.

The proposed theory treats the **vocal folds as a vibrating membrane**. It predicts **equidistant harmonics** in a laryngeal vibration signal: frequency peaks separated by equal intervals. Testing it requires recording actual laryngeal vibration and examining its spectrum. Regular spacing would agree with the prediction; a different pattern would question the model’s account of that signal.

The material proposes this experiment without reporting a measured outcome. The membrane animation uses assigned harmonic frequencies, so replaying that illustration is not an independent test of natural vocal-fold vibration.'''),
 'fixed_free': paragraphs('''A **fixed–free system** must have a node at the fixed end and an **antinode**, a place of maximum movement, at the free end. The simplest pattern fits one quarter-wave. The next patterns fit three, five, and seven quarter-waves, giving the first, third, fifth, and seventh harmonics. Mode 2 is therefore the third harmonic, not the second.

Odd quarter-wave counts preserve the different endpoint conditions. Even counts would put a node at the free end. Higher patterns fit shorter wavelengths into the same length and repeat faster. The mixture’s spectrum gives frequency horizontally and amplitude vertically. Equal excitation produces equal peaks at the free-end pickup; uniformly slowed playback preserves the relative rates.

The fixed–fixed and fixed–free examples were **separately tuned** to the same fundamental. Changing only one endpoint while keeping length and wave speed unchanged would halve the fundamental. Matching displayed labels therefore does not isolate the endpoint’s effect.'''),
 'air_modes': paragraphs('''Air has **inertia**, so moving air tends to keep moving. Compression produces a restoring effect, represented by the model’s spring-like links. The air elements move **longitudinally**, back and forth along the tube, rather than traveling steadily from the glottis to the lips.

The glottal end is treated as fixed and the open lips as free. **Mode 1 is F1-like**, the lowest resonance pattern; **Mode 2 is F2-like**, with another internal reversal. In the ideal uniform reference, Mode 2 repeats three times as fast. A changed tract shape can alter that simple relationship.

The /a/ marker is about one-third of the distance from the glottis, /i/ about two-thirds, and /u/ at the lips. Each marks the same place in both modes. Added mass matters where a mode moves strongly; increased springiness matters where it compresses strongly. Comparing these local roles explains why one narrowing can affect F1 and F2 differently.'''),
 'air_motion': paragraphs('''**Air movement** concerns how far an element travels; **compression** concerns changes in the gaps between neighbors. Elements can travel together with little change in spacing. Elsewhere, neighbors can approach and separate strongly around a point whose own movement is small. Smaller gaps mean compression, while wider gaps mean rarefaction, or more spread-out air.

The moving **Schwa** row supplies the uniform-tube reference. The F1, F2, and F3 rows separate resonance patterns of that same air column. The closed left end restricts movement and the open right end allows it. Higher modes fit more alternating regions of movement and compression into the tube.

Following an element over a cycle reveals movement; following neighboring gaps reveals compression. Added mass matters most where movement is strong, while added stiffness matters most where compression changes strongly. These locations differ between modes. The rows represent different resonances, not separate air streams.'''),
 'vowels': paragraphs('''**Tongue height** and **front–back position** describe vowel articulation. The vowel in **dean** is high and front, with its marked narrowing about two-thirds of the way from the glottis to the lips. **Dune** is high and back, with a highlighted narrowing at the lips. Sharing tongue height does not give them the same tract shape.

**Dan** is low and front; **Don** is low and back, with its narrowing marked about one-third of the distance from the glottis. **Done** is central and labeled “No constriction,” providing the relatively unconstricted reference. Dan has no numbered narrowing position.

These fractions locate changes along the air passage, starting at the glottis. A narrowing changes the local mass-like and spring-like effects. Its acoustic consequence depends on how each mode moves and compresses that region, connecting vowel shape with the direction of a formant change.'''),
 'local_rules': paragraphs('''**Increasing mass lowers frequency** when stiffness is unchanged, because the moving load becomes harder to turn around. **Increasing stiffness raises frequency** when mass is unchanged, because the stronger restoring force changes the movement more quickly.

Location matters within a larger system. Added mass strongly affects a mode where the material moves a lot. Extra stiffness matters where neighboring parts stretch or compress strongly. Neighbors can travel together without greatly changing their separation, so strong movement and strong compression are different. Their largest regions alternate in these ideal patterns.

Each movable mass supplies one independent chain mode, generally without exact harmonic spacing. Endpoint conditions select different continuous patterns: fixed–fixed systems fit whole half-waves; fixed–free systems fit odd quarter-waves. The mode’s shape and the changed region together determine how strongly a local mass or stiffness change affects its frequency.'''),
 'u': paragraphs('''The **/u/ model** adds loading near the open lips, the free end of the air column. Both the F1-like and F2-like patterns have substantial movement there. The enlarged elements represent greater **effective mass**, not heavier individual air molecules.

More moving mass is harder to speed up and reverse. Where this effect dominates, each cycle takes longer and frequency falls. Because both modes move strongly near the lips, the result is **F1 down and F2 down** relative to the uniform reference.

The shared direction follows from the changed location’s role in both patterns. It is not a rule that every constriction lowers every resonance. The air continues moving back and forth around its usual positions; the larger elements identify the load involved in that movement.'''),
 'i': paragraphs('''The **/i/ constriction** lies near the front, about two-thirds of the way from the glottis to the lips. It changes the same physical region in both modes, but that region contributes differently to their movement and compression.

For **Mode 1**, movement makes the **mass effect** more important. The extra effective load is harder to reverse, slowing the cycle and lowering F1. For **Mode 2**, compression makes the **springiness effect** more important. A stronger restoring response speeds the cycle and raises F2.

The result is **lower F1 and higher F2** relative to the uniform reference. Increasing mass-like and spring-like effects together does not mean they cancel. Their importance depends on how each mode uses the narrowed region, so one constriction can move the two resonances in opposite directions.'''),
 'a': paragraphs('''The **/a/ constriction** lies farther back, about one-third of the way from the glottis to the lips. This changes a different part of each mode from the front /i/ narrowing, while the basic effects of mass and stiffness remain the same.

For **Mode 1**, compression is important at the changed region. Greater springiness supplies a stronger restoring response, making the cycle faster and raising F1. For **Mode 2**, movement matters more there. Greater effective mass makes the moving air harder to reverse, slowing the cycle and lowering F2.

The result is **higher F1 and lower F2**, reversing the /i/ pattern. The explanation connects constriction location with local movement or compression, then with the effect on frequency. The directions describe the model’s predicted change rather than numerical measurements of its size.'''),
 'constriction': paragraphs('''A **constriction** narrows the air passage. In the lecture’s account, bunching air increases its local density and mass-like effect. Compression also increases resistance to further compression, producing a stronger spring-like effect.

The **mass effect** matters where the air moves strongly. A greater moving load is harder to turn around, tending to lower frequency. The **stiffness effect** matters where the air compresses and expands strongly. A stronger return toward usual spacing makes the vibration faster, tending to raise frequency.

These effects do not automatically cancel. Neighbors can move together with little spacing change, or compress strongly near a point with little movement. Each mode places these regions differently. The same narrowing can therefore act mainly through mass for one formant and mainly through stiffness for another, explaining opposite frequency changes without reversing either physical rule.'''),
}

SPECIFIC = {
(12, 2): paragraphs('''A **dynamic system** changes over time as its parts influence one another. Woodford’s **Dynamic Stochastic General Equilibrium**, or DSGE, is the theory named in the economic example. Economics provides another setting for explaining fluctuations and considering how to reduce harmful extremes.

In the stabilization illustration, the **black curve represents unemployment** and the **gray curve inflation**. Large, jagged peaks and troughs become smaller and smoother. Stabilization means reducing those swings, rather than stopping all change or turning the two quantities into the same thing.

The connection with physical systems is the concern with what produces a fluctuation and what can reduce it. Here, the practical aim is to avoid extremes such as high unemployment or runaway inflation. The changing curves illustrate that aim without supplying a measured test of a particular policy.'''),
(12, 11): paragraphs('''The highlighted region lies left of the string’s midpoint. **Mode 4** moves that region strongly, with neighboring positions traveling similarly. **Mode 5** has relatively little movement there but stronger local stretching and compression because neighboring positions move differently.

Adding **mass** strongly slows Mode 4 because its movement has to carry the extra load. The same mass change matters less to Mode 5, which hardly moves the region. This concerns movement over a cycle, rather than whether one still frame happens to catch a point at rest.

Increasing **stiffness** matters more to Mode 5 because it strongly stretches the region, adding restoring action and raising its frequency. Mode 4 stretches it less, so the stiffness effect is smaller. If mass and stiffness both increase there, the main prediction is **Mode 4 lower and Mode 5 higher**. The same location has different roles in the two patterns.'''),
(12, 22): paragraphs('''**More mass slows vibration** when stiffness stays the same, while **more stiffness speeds it** when mass stays the same. Within a mode, added mass matters most where movement is strong; added stiffness matters most where stretching or compression is strong. Neighbors can move together without greatly changing their spacing, so these are different locations to identify.

The vowel models apply that distinction. At the lip-end **/u/** location, the mass effect dominates both modes, lowering F1 and F2. At the front **/i/** location, mass lowers F1 while springiness raises F2. At the back **/a/** location, springiness raises F1 while mass lowers F2.

The allowed pattern also depends on the endpoints. Separate-mass chains have one mode per movable mass, generally without exact harmonic spacing. Ideal fixed–fixed strings fit whole half-waves; fixed–free systems fit odd quarter-waves. Location explains the local effect, while endpoint conditions determine which patterns can occur.'''),
(13, 4): paragraphs('''Both ends of a **fixed–fixed string** must remain stationary, so they are **nodes**. The simplest standing pattern fits one half-wave between them, with one broad moving region. Mode 2 fits two half-waves and adds a stationary middle point; its two regions move oppositely.

Modes 3, 4, and 5 fit three, four, and five half-waves into the same length. More sections make the wavelength shorter. At the same wave speed, shorter wavelengths give faster repetition, producing whole-number multiples of the **fundamental**, the lowest frequency. Both odd and even multiples satisfy the two fixed endpoints.

The numbered sections identify places within the standing-wave shape. Every mode has a first section, but only higher modes have the additional ones. These sections stay in place while the string moves up and down; they do not count elapsed cycles or travel sequentially along the string.'''),
(13, 8): paragraphs('''A **quarter-wave** joins a node to an antinode. The fixed bottom must be a node, while the free top must be an antinode. One quarter-wave satisfies both conditions. Adding a pair of quarter-waves preserves them while adding an internal reversal.

The four allowed patterns contain **one, three, five, and seven quarter-waves** in the same length. More sections mean shorter wavelengths and faster vibration at unchanged wave speed. The second mode is the third harmonic, the third is the fifth, and the fourth is the seventh. An even quarter-wave count would finish at a node, giving the wrong condition at the free top.

The numbered pieces count sections of these shapes. Only higher modes contain the extra pieces, and only the fourth contains sections six and seven. The pieces mark positions in a standing pattern while the material moves back and forth.'''),
(13, 9): paragraphs('''Read each **fixed–free pattern** from its endpoint conditions. The fixed bottom is a node, and the free top is an antinode. Each change from a node to an antinode, or back again, spans a quarter-wave. The four patterns contain one, three, five, and seven such sections.

Fitting more sections into the same length shortens the wavelength. With wave speed unchanged, the higher patterns therefore repeat faster. The numbered divisions describe the standing shape; they remain at fixed positions as the material moves.

**Mode number** counts the allowed patterns in order. **Harmonic number** compares frequency with the fundamental. They differ here because only odd quarter-wave counts meet both endpoint conditions. The fourth allowed mode is consequently the seventh harmonic, rather than the fourth.'''),
(13, 20): paragraphs('''**Source–filter theory** separates vocal-fold vibration from the vocal tract’s shaping of that sound. The repeating source has a fundamental frequency, **F0**, and harmonics at whole-number multiples. F0 sets the spacing between the source lines. The harmonics are 100 Hz apart and extend to 4000 Hz; their equal heights simplify the example.

The tract acts as a **filter**, strengthening harmonics near its resonances, or **formants**, and weakening others. In this comparison, the source frequency positions stay fixed while their relative heights change. The broad pattern of strengths is the **spectral envelope**. The schwa example labels four resonance regions, F1–F4, with its strongest group at low frequency.

Frequency runs horizontally and amplitude vertically. A taller line is stronger, not necessarily higher in frequency. **F0 is source repetition; F1 is the lowest tract resonance**. The vowel still contains many harmonics, rather than just four tones. The illustrated resonance values describe this comparison, not fixed values for every speaker.'''),
(13, 21): paragraphs('''The **/i/ filter** has a low first formant and a high second formant. Its first strong harmonic group is near the low-frequency end; the next is much farther right, with a weak region between them. Further groups occur around F3 and F4.

The regularly spaced source harmonics stay in the same positions. Changing the tract changes their strengths, making the filter’s effect visible separately from source repetition. The front-constriction account connects this low-F1, high-F2 pattern with the different roles of movement and compression in the two modes.

A line’s horizontal position gives **frequency**, while its height gives **amplitude**. A tall low-frequency line remains low in frequency even if a higher-frequency line is weaker. The narrow harmonic lines sample the broad formant regions. These illustrated values describe one /i/ comparison, rather than an identical numerical pattern for every speaker.'''),
(13, 22): paragraphs('''Compared with /i/, the **/a/ filter raises F1 and lowers F2**, bringing the first two resonance regions closer together. Groups around F3 and F4 remain higher in frequency. The same regularly spaced source can therefore produce a different vowel pattern when the tract changes.

The filter changes the broad pattern of harmonic **strengths**. Moving a formant changes the favored frequency region horizontally; changing a harmonic’s amplitude changes its height. Those are different changes to read in the spectrum.

A formant can lie **between two source harmonics**. For example, the marked 750 Hz target lies between lines at 700 and 800 Hz. Nearby supplied harmonics can become stronger without creating a new source line exactly at the target. A formant names the tract’s resonance region; a harmonic names a component of the repeating source. The drawing’s values are specific to this simplified comparison.'''),
(13, 23): paragraphs('''A **spectrum** describes frequency components during one short slice of sound. The successive spectra follow /i/ and then /a/. In each spectrum, frequency runs horizontally and amplitude vertically.

A **spectrogram** places these slices in time from left to right, with frequency running upward. A peak near the right of a spectrum therefore becomes a mark higher in its spectrogram strip. Moving right in the spectrogram means a later time, rather than a higher frequency.

In this grayscale display, **black means high amplitude, gray medium, and white low**. Peak height becomes darkness, while vertical position gives frequency. A darkening band grows stronger; a rising band moves to a higher frequency. During the /i/ to /a/ transition, **F1 rises and F2 falls**, bringing them closer together. Higher bands remain above them with smaller changes. The display follows changing tract resonances through time.'''),
(13, 25): paragraphs('''Closely spaced **source harmonics** provide many samples around each formant. Their heights trace the rise and fall of the vocal tract’s response, making the broad resonance regions easier to identify.

Increasing **F0** widens the harmonic gaps. With the filter held constant, fewer source frequencies now describe each resonance, and a formant can fall between them. With 100 Hz spacing, the example’s F1 at 300 Hz and F2 at 2100 Hz can shape many harmonics. The 250 Hz sequence supplies fewer nearby components. A single strong line may be near a formant without marking its exact center. Several nearby lines provide a clearer picture of that region’s shape.

The three spectra and corresponding spectrograms show this change from closely spaced components to more isolated traces. The **toddler** sequence starts at 400 Hz and the **soprano** sequence at 800 Hz. Their higher-pitched voices leave wider gaps, making formants harder to read. The tract does not have to lose a resonance or shift it upward. The source has changed which frequencies are available to reveal the same filter.'''),
}

SPECIFIC.update({
(14, 4): paragraphs('''A **quarter-wavelength** connects a node with an antinode. One quarter-wave fits between the stationary fixed bottom and moving free top, giving the simplest allowed pattern without an internal node.

Adding another quarter-wave would end at a node, which is wrong for the free top. Adding two preserves an antinode there. The allowed patterns therefore fit **one, three, five, and seven quarter-waves** into the same length. More sections mean shorter wavelengths and faster repetition at unchanged wave speed.

The numbered pieces divide the standing-wave shape. They do not move sequentially up the string. The material moves back and forth while the pattern’s stationary points stay in place. The odd frequency pattern follows from the two endpoint conditions, rather than an arbitrary decision to omit even frequencies.'''),
(14, 6): paragraphs('''**Movement** is how far an air element travels. **Compression** is how much the spacing between neighbors changes. Several elements can travel together while their gaps remain nearly constant. Elsewhere, gaps close and open strongly near a point with little movement of its own.

Follow one circle through a cycle to see movement. Compare neighboring gaps to see compressed and more spread-out regions. Changing compression supplies a spring-like restoring effect, while the air’s inertia keeps it moving.

The closed end restricts movement and the open end permits it. Higher modes place their alternating regions differently within the same tube. The moving Schwa reference and **F1, F2, and F3** rows describe resonances of one air system. A constriction can strongly affect moving mass in one mode and compression in another, so its effect depends on the mode as well as its location.'''),
(14, 7): paragraphs('''Follow a marked location through a complete cycle. Watching its air element reveals how far it moves; comparing its neighbors reveals changes in spacing. A single still frame cannot establish whether that location usually has large movement or strong compression changes.

Where movement is strong, greater **effective mass** makes the air harder to speed up and reverse. The cycle takes longer, tending to lower the resonance. Where compression changes strongly, greater **stiffness** produces a stronger return toward usual spacing. When that effect dominates, the cycle becomes faster and the resonance rises.

**Modes 1, 2, and 3** arrange these regions differently. Predicting a local change therefore requires identifying both the position and the mode. The same physical location can strongly involve movement in one pattern and compression in another.'''),
(14, 10): paragraphs('''**Mode 1 and Mode 2** belong to the same air column, with a constrained glottal end and open lips. Both move strongly near the lips, but Mode 2 has an additional internal reversal and a different arrangement of movement and compression.

The back, front, and lip markers identify the same physical places in both patterns. A narrowing at one marker changes that region for both modes. Strong movement makes its mass-like effect important, tending to slow the vibration. Strong compression makes its spring-like effect important, tending to speed it.

This explains why one narrowing can move **F1 and F2** in different directions. The three-times frequency relation belongs to the ideal uniform reference. Formants are tract resonances that can change with tract shape; they are different from source harmonics, whose spacing comes from vocal-fold repetition.'''),
(14, 15): paragraphs('''The vocal folds supply the voiced **source**. **F0** is its repetition rate and sets the spacing between harmonic components. The 100, 250, and 350 Hz examples spread the harmonic lines progressively farther apart, leaving fewer components in the same frequency window.

The comparison links heavier, looser folds with slower repetition and lighter, tighter folds with faster repetition. Mass resists changes in movement, while restoring action brings the folds back. The membrane illustration separates patterns and combines their movements; its harmonic frequencies are assigned, rather than a general result about all natural membranes.

A voiced vowel contains **multiple frequencies**. Source repetition determines the available harmonics. The vocal tract then strengthens some regions and weakens others. Changing pitch therefore changes source spacing, while changing vowel shape changes the tract’s favored regions. These are distinct contributions to the same sound.'''),
(14, 16): paragraphs('''The **vocal-tract filter** changes the relative strengths of harmonics supplied by the source. Its resonances, or **formants**, favor nearby components. Changing the tongue and lips changes these favored frequency regions.

Schwa has separated first and second resonances. The /u/ filter places both lower and also marks a third. The front /i/ or /I/ example has low F1 and much higher F2. The /a/ drawing places its first two targets close together at **800 and 900 Hz**. Those values belong to this particular illustration.

A formant target identifies a tract resonance; a harmonic line identifies a source component. The target can lie between source lines and still strengthen nearby harmonics. Filtering changes their heights without requiring a new component exactly at each target. Source spacing and the filter’s pattern are therefore different properties.'''),
(14, 17): paragraphs('''Within a **vowel column**, the filter stays fixed while F0 changes. Across a row, harmonic spacing stays fixed while the vowel filter changes. These comparisons separate effects of the source from effects of tract shape.

Low F0 puts many harmonics near each resonance. Their heights describe the filter’s **envelope**, the smooth pattern of favored strengths. Higher F0 leaves wider gaps and fewer samples. A strong line may lie beside a formant target rather than exactly on it, even though the target has not moved.

The nearby /a/ targets can consequently look like one grouped region. Closer harmonics provide more information without guaranteeing two visibly separate peaks. Difficulty reading them does not establish that a resonance disappeared. A line’s horizontal position gives frequency and its height gives strength; unchanged targets with wider-spaced lines indicate a source change.'''),
(14, 18): paragraphs('''A **spectrum** gives frequency horizontally and amplitude by peak height for one short slice of sound. The sequence contains three /i/ slices followed by three /a/ slices. A **spectrogram** places those slices from left to right through time, with frequency running upward.

Peak amplitude becomes **darkness**: black is high, gray medium, and white low. A rising band moves to a higher frequency; a darkening band becomes stronger at its present frequency. Moving right in a spectrum means higher frequency, while moving right in the spectrogram means later time.

During the **/i/ to /a/** transition, the first strong band rises and the second falls. One upper band also moves downward while a fainter band remains in the higher-frequency region. Connecting adjacent slices traces the changing resonance pattern. Position and darkness carry different information about that change.'''),
(14, 21): paragraphs('''**F1 and F2** describe the first two resonance regions emphasized by the vocal tract. They provide a compact pair of sound measurements for the vowel-recognition task, rather than every individual point in the waveform.

The **input** gives measurements; the intended **output** distinguishes candidate vowel categories. These are different kinds of information. Knowing the formant pair supplies evidence about the sound, while knowing the true label tells which category that example belongs to. Recognition requires relating the measured pattern to the category.

The proposed exercise trains a network with students’ formant measurements, connecting the physical explanation of speech with AI. This establishes the inputs and task. Demonstrating successful recognition would require results from training and testing, which are not supplied by the proposal itself.'''),
(14, 22): paragraphs('''The network receives **two inputs, F1 and F2**, whose order preserves their meanings. In a **fully connected layer**, every receiving neuron connects to every neuron in the previous layer. Each connection has a weight. The receiving neuron multiplies each incoming value by its weight and adds the products.

The hidden layers contain **three, two, and four neurons**, followed by five outputs. Hidden values are intermediate combinations, not new measured formants or already-correct categories. Different weights let neurons combine the same inputs differently.

From top to bottom, the outputs correspond to **/done/, /dune/, /dean/, /Don/, and /Dan/**. Keeping that order preserves the meaning of each value. The layers are **purely linear**, with no activation function between their weighted sums. Passing these sums onward describes the computation, but does not itself ensure that the final values are probabilities.'''),
(14, 23): paragraphs('''The input example gives **F1 as 320 and F2 as 2000**. Inputs are measurements of the sound; **weights** are settings that determine how the network combines those measurements. Changing weights can change internal results even when the input pair stays fixed.

Each connection supplies one weight. A neuron multiplies its incoming values by their weights and adds the products. A neuron receiving F1 and F2 therefore has two incoming weights, while the three receiving neurons can form different combinations of that same pair. The heading says **blue positive and orange negative**, but negative labels are green in the rendered figure. Use the written signs to identify direction and the sizes to identify strength. Contributions can reinforce or oppose one another.

The displayed weights are **random starting values**, not learned vowel knowledge. A **forward pass** processes an example using the current weights. **Learning** changes those settings. Naming the outputs does not prove that the initial network recognizes their categories correctly.'''),
(14, 24): paragraphs('''A **forward pass** carries the formant information through the layers using their current weights. Each layer combines values from the previous one. This produces an output; learning would additionally change the weights.

The illustrated distribution assigns **0.5 to /done/, 0.2 to /Dan/, and 0.1 to each other candidate**. /done/ is therefore the favored prediction. The alternatives retain some support. Valid probabilities lie between zero and one and add to one. These bars satisfy that condition, but the purely linear code lacks a step ensuring such a distribution, so they illustrate an intended output rather than a verified result of the shown weights.

The **predicted category** is the one favored by the model. The **true category** is the example’s actual label. Judging correctness requires that true label; the largest bar and reaction symbol alone do not supply it.'''),
(14, 25): paragraphs('''The code imports **torch** and its neural-network tools as **nn**, then assigns the model to **net**. **nn.Sequential** puts its layers in the order information passes through them. Each **nn.Linear** produces weighted sums from incoming values.

In **nn.Linear(2, 3, bias=False)**, two inputs feed three receiving neurons. The remaining layers change three values to two, two to four, and four to five. Each output count matches the next layer’s input count, allowing information to pass through the sequence. The final five values correspond to the five candidate labels.

Every incoming connection keeps its weight. **bias=False** removes an extra constant added to a weighted sum, rather than removing weights or preventing learning. No activation layers appear, so the sequence remains linear. Declaring this structure does not train it or compute the illustrated probability bars; training would require examples and a process for changing weights.'''),
})

# Each mapping is explicit: repeated explanations are used only for the same
# reviewed source demonstration, never selected by a keyword heuristic.
MAPPING = {
11: {2:'one_mass',3:'mass_stiffness',4:'two_modes',6:'three_modes',7:'atlas',8:'fixed_string',9:'membrane',10:'theory',11:'fixed_free'},
12: {3:'one_mass',4:'mass_stiffness',5:'two_modes',6:'three_modes',7:'atlas',8:'fixed_string',9:'local_rules',10:'fixed_string',12:'membrane',13:'theory',14:'fixed_free',15:'air_modes',16:'vowels',18:'air_modes',19:'u',20:'i',21:'a',23:'air_motion'},
13: {2:'local_rules',3:'atlas',5:'fixed_string',6:'membrane',7:'fixed_free',10:'air_modes',11:'air_motion',12:'vowels',13:'constriction',14:'air_motion',15:'air_modes',16:'u',17:'i',18:'a',19:'air_motion'},
14: {2:'membrane',3:'fixed_free',5:'air_modes',8:'vowels',9:'constriction',11:'u',12:'i',13:'a',14:'air_motion'},
}

# These explanations expand the mechanism or a source-visible distinction.
# The requested 200–250-word median is not applied as a minimum to every page.
DEPTH = {
'one_mass': '''The return force and the continued movement play different roles. If the mass is on one side of equilibrium, the spring acts toward equilibrium from that side. After the mass crosses, the spring’s displacement reverses and so does the restoring direction. The back-and-forth pattern comes from this repeated interaction, rather than from a force that always points the same way. The longitudinal and transverse pictures change how that return is arranged, while keeping the same basic relationship between movement and restoring action.''',
'mass_stiffness': '''Each comparison keeps one property unchanged so that the cause of the rate change is clear. The heavier-mass example repeats the same kind of motion but completes fewer cycles than its reference. The stiffer example completes more. A larger visible movement would concern amplitude, or how far the mass travels, rather than establishing a faster rate. To identify frequency, follow complete repetitions over the same interval instead of judging which picture is tallest or which way the mass moves.''',
 'two_modes': '''In Mode 1, the masses can travel while keeping nearly the same distance between them. In Mode 2, their distance repeatedly shrinks and grows. That difference explains why the middle connection matters more in the faster pattern, even though the physical masses and connections have not been replaced. A mode describes the relationship across the whole system. It does not mean that one mass belongs to the first mode and the other belongs to the second; both masses participate in each pattern.''',
 'three_modes': '''The order follows how the masses move relative to their neighbors. Mode 1 keeps their broad movement together. Mode 2 makes the outer masses oppose one another but leaves the middle balanced. Mode 3 makes the middle oppose both outer masses, strongly changing their connecting links. These are different arrangements of movement in the same system, not a progression in which an extra mass starts moving at each stage. The colors track the individual masses and the resting marks show what each displacement is measured from.''',
 'atlas': '''Within each chain, the masses and connections are equal and both outer supports remain fixed. Changing the mode changes how those same parts move in relation to one another. A higher pattern has more reversals across the chain, so neighboring parts pull against one another in more places. This explains the faster restoring pattern without claiming that a higher mode uses smaller masses or physically stronger replacement springs. Mode number identifies the pattern, not the identity of a particular moving mass.''',
 'fixed_string': '''The displayed components are 100, 200, 300, 400, and 500 Hz. These labels identify their repetition rates, whereas the half-wave count identifies their shapes along the string. As the mixture moves, a position can become nearly flat through cancellation and later move strongly as the contributions change. This does not mean that a component frequency has been destroyed and replaced. The measured motion still combines the original patterns, with each contribution depending on how that particular mode moves the pickup location.''',
 'membrane': '''A node stays still throughout that mode’s cycle. A moving region can also pass briefly through the resting surface, but that momentary crossing does not make it a node. The distinction matters when reading an animation from one frame. Follow the same region as it rises, crosses rest, and falls while its neighbor moves oppositely. The two numbers describe divisions across the surface, rather than two separate frequencies, two different membranes, or a count of cycles that have already elapsed.''',
 'theory': '''The proposed observation is more specific than simply seeing movement. The vocal folds could vibrate while the measured frequencies fail to follow the predicted equal spacing. Examining the spectrum connects the theory with the particular feature it predicts. The animation demonstrates what an assigned collection of frequencies looks like when combined; a recording asks whether an actual vocal-fold signal has the proposed pattern. Keeping those roles separate distinguishes an illustration of an idea from evidence obtained by testing that idea.''',
 'fixed_free': '''An antinode is a place with the greatest movement over a cycle, not a point that stays at its farthest position. It passes through rest and moves to the other side while the fixed endpoint remains still. The illustrated frequencies are 100, 300, 500, and 700 Hz. The second, third, and fourth allowed modes are consequently the third, fifth, and seventh harmonics. Counting allowed shapes and comparing their frequencies answer different questions, even though both descriptions use numbers.''',
 'air_modes': '''A resonance pattern describes the air system’s coordinated back-and-forth movement. F1 and F2 do not identify two separate streams or two positions from which sound is emitted. At one location, neighboring elements may move together while their gaps hardly change. At another, the gaps may repeatedly close and open. A constriction acts on both modes at the same physical place, but their different movement and compression patterns give the changed region a different role in each.''',
 'air_motion': '''Compression changes supply a restoring response because crowded air pushes back toward its usual spacing. The moving air also has inertia, so it continues moving as that restoring response changes. Together they support repeated motion around the usual positions. A region with large movement can carry substantial moving mass without being the region that squeezes most strongly. A region with large spacing changes can supply strong restoring action without its central element traveling far. These observations connect the visible circles and gaps with the mass-and-spring explanation.''',
 'vowels': '''The labels describe related but different features. High versus low concerns tongue height; front versus back concerns its position along the mouth; the marked fraction concerns distance along the air path. A shared label such as high therefore leaves other shape differences open. Dean and dune can both be high while narrowing different places, and those places can play different roles in the second resonance pattern. Describing articulation identifies what changed physically; comparing the air modes explains what that change does to the sound.''',
 'local_rules': '''A normal mode is a coordinated movement that repeats at one frequency. Its parts can move different distances or in opposite directions while still belonging to that pattern. A local change therefore has to be compared with the whole mode’s shape. The same added mass can be important where one mode moves strongly and relatively unimportant where another hardly moves. A point that is a node in one pattern is not necessarily stationary in other patterns or in their combined movement.''',
 'u': '''The two rows make it possible to compare the same lip location across different resonance patterns. Both have strong movement there, even though their internal arrangements differ. Increasing the load therefore slows both without requiring that their shapes or frequencies become identical. F1 remains the lower resonance and F2 the next one. The important comparison is the direction of each change relative to its own uniform reference, not whether the two frequencies have become equal or whether all parts of the tract move equally.''',
 'i': '''The marked region is not moved to a new location when the mode changes. What changes is the role of that same region within the coordinated movement. Neighbors moving together make extra moving load important; neighbors repeatedly approaching and separating make the restoring response important. Comparing both rows prevents the narrowing from being treated as a single instruction to raise or lower every frequency. The two arrows summarize separate causal explanations, one involving slower movement of added mass and the other a faster return from compression.''',
 'a': '''The narrowing affects the same back location in both rows, but the rows describe different coordinated movements of the air. A region can have little movement of its own while its neighbors repeatedly squeeze together and spread apart. It can also move strongly with relatively little spacing change. Those two roles explain why the spring-like effect dominates the first mode here while the moving-load effect dominates the second. Changing constriction location changes which role is most important; it does not change what mass or stiffness means.''',
 'constriction': '''To distinguish the two effects, follow one air element and then compare it with its neighbors through the cycle. Its travel shows the movement involved in carrying the local load. The closing and opening gaps show compression and the restoring response. Neither a tongue-height label nor one frozen frame gives both pieces of information. The constriction’s position identifies where the properties changed, and the mode’s movement identifies how that change contributes to the particular resonance being considered.''',
}
for name, explanation in DEPTH.items():
    COMMON[name].insert(2, explanation)

# The repeated principles page explains its own source rules, without turning
# the slide into a recap of separate vowel demonstrations.
SPECIFIC[(12, 22)] = list(COMMON['local_rules'])
