"""Section 13. Teach the information in the original visuals without tracing every value."""
FIGURES=[]
def F(id,concept,collection,pages,title,takeaway):
    FIGURES.append(dict(id='modern-figure-'+id,concept=concept,collection=collection,pages=pages,
      moduleId='module2' if int(collection[7:9])>=11 else 'module1',title=title,takeaway=takeaway))

F('mass-rate','mass-stiffness','lecture11',[3],'Compare cycle rates over the same interval.',
  '**The slower row is the heavier system**, and the faster row is the stiffer system in the controlled comparison. The size of the drawn movement is a separate feature from the number of cycles.')
F('two-patterns','two-modes','lecture11',[4],'Read a shared-direction pattern and an opposing-direction pattern.',
  '**Opposing movement stretches the middle coupling more strongly**. The combined row adds the two patterns rather than introducing a third independent normal mode.')
F('three-patterns','three-modes','lecture11',[6],'Locate the stationary middle mass in the second mode.',
  '**Mode 2 leaves the middle mass still**, even while the outer masses move. Modes 1 and 3 use its motion, which is why middle-mass loading affects their frequencies.')
F('mode-atlas','many-modes','lecture11',[7],'Separate the number of masses from the number of the mode.',
  '**A row with more moving masses permits more independent mode patterns**. The column identifies a particular mode rather than a new object being added to the same system.')
F('fixed-packets','fixed-fixed','lecture13',[4,5],'Fit half-wave pieces between two still endpoints.',
  '**Every complete half-wave count preserves the two fixed ends**. The source animation’s construction explains the harmonic spacing instead of reducing it to an unexplained list of frequencies.')
F('membrane-patterns','membrane','lecture11',[9],'Follow more than one spatial direction on a vibrating surface.',
  '**A pickup records the combined local contribution of the modes**. A point at a node for a component will not move strongly because of that component.')
F('odd-packets','fixed-free','lecture13',[8,9],'Fit quarter-wave pieces without turning the free end into a node.',
  '**One, three, five and further odd quarter-wave counts** end at the required moving point. The original construction animation remains available, including where its static slide export is incomplete.')
F('air-displacement','air-modes','lecture13',[10,11],'Distinguish longitudinal air movement from its plotted representation.',
  '**The vertical curve records displacement size at each tract location**. It does not mean that the air particles physically travel upward and downward through the tract walls.')
F('vowel-mri','vowel-shape','lecture12',[16],'Connect tongue and lip configurations with the narrowed region.',
  '**The position of the narrowing differs across vowels**, so the two air modes encounter it in different roles. The anatomical image supplies the tract configuration, while the mode model supplies its acoustic interpretation.')
F('boxed-string','local-change','lecture12',[11],'Inspect the same boxed location in both mode patterns.',
  '**One mode moves strongly in the box while the other is spring-dominated there**. Local loading therefore has to be interpreted twice, once for each mode.')
F('u-loading','u','lecture13',[16],'Read the lip-region loading in both first modes.',
  '**Both modes have strong motion near the lips**, so the inertial effect lowers both frequencies. The result is a causal explanation of low F1 and F2 in this comparison.')
F('i-front','i','lecture13',[17],'Use one constriction location to explain opposite shifts.',
  '**Mode 1 is motion-dominated and Mode 2 compression-dominated** at the illustrated /i/ narrowing. The two formant directions follow from those different local roles.')
F('a-back','a','lecture13',[18],'Check how a different narrowing reverses the first two roles.',
  '**Compression dominates the first mode while motion dominates the second** at the /a/ location. F1 therefore rises while F2 falls in the source comparison.')
F('harmonic-comb','source','lecture14',[15],'Read the source peaks as a regular harmonic comb.',
  '**Higher F0 leaves wider gaps between peaks in the same frequency window**. It changes the sampling available to the tract filter rather than redefining each peak as a formant.')
F('neutral-filter','filter','lecture13',[20],'Compare the source comb with the shaped neutral-vowel envelope.',
  '**The harmonic frequency positions remain tied to the source**, while their heights follow the filter response. The broad envelope supplies information about the tract resonances.')
F('i-envelope','filter','lecture13',[21],'Recognize the low first formant and high second formant of /i/.',
  '**The envelope favors separated low-F1 and high-F2 regions**. Several source harmonics can contribute near each resonance, so a formant is not one isolated numbered harmonic.')
F('a-envelope','filter','lecture13',[22],'Compare the closer first and second formants of /a/.',
  '**The first two favored frequency regions lie closer together than in the /i/ comparison**. Their positions connect with the different tract constriction rather than a changed definition of F0.')
F('source-grid','sparse-harmonics','lecture14',[17],'Keep source-row changes separate from filter-column changes.',
  '**Rows change the source’s harmonic spacing and columns change the vowel filter**. The grid is useful because it varies those two contributions separately.')
F('spectrogram','spectrogram','lecture13',[23],'Follow frequency bands through time instead of reading height as loudness.',
  '**The rising first band and falling second band track the /i/ to /a/ transition**. Darkness records amplitude, while the bands’ vertical position records frequency.')
F('network-shape','network-shape','lecture15',[2],'Count the hidden groups and follow the incoming connections.',
  '**The three internal groups contain three, two and four neurons**. Each receiving neuron has one incoming weight for each value in the preceding group.')
F('forward-values','forward','lecture15',[3],'Connect the same two input measurements with the final category decision.',
  '**The displayed network favors done although the target is dean**. The mismatch separates completing a valid forward calculation from having learned an accurate classifier.')
F('error-directions','weight-direction','lecture15',[7],'Compare a marked final connection with a marked early connection.',
  '**The final connection has a more direct route to the output error**. The early connection’s effect is mediated by the remaining activations and weights.')
F('paired-tables','training-data','lecture15',[9],'Keep each formant row aligned with its target row.',
  '**The input table describes measurements and the target table identifies categories**. A one in the dean column belongs to the recording classified as dean, not to whichever input happens to occupy that row after an independent shuffle.')
F('sigmoid-curve','sigmoid','lecture15',[11],'Read the middle and extremes of the S-shaped response.',
  '**A weighted sum near zero produces a middle activation**, while large magnitudes approach the bounds. The curve’s slope explains why an equal input change can have different output effects at different locations.')
F('sigmoid-network','sigmoid-flow','lecture15',[12],'Distinguish the original weighted sum from the transformed hidden response.',
  '**The transformed value must be used by downstream connections**. Leaving the later values unchanged would no longer describe the network with sigmoid applied.')
F('vowel-scatter','overlap','lecture16',[5],'Read each point as one labeled vowel token.',
  '**The horizontal and vertical coordinates are F1 and F2**, while the category marking identifies the vowel. Overlap means nearby measured values can belong to different categories.')
F('training-curve','accuracy','lecture16',[15],'Read accuracy as a proportion of correct training decisions.',
  '**The curve rises from around the five-category guessing baseline and plateaus at 44.95 percent**. Its axes describe progress over updates and training accuracy, not how loud or clear the vowels were.')
F('restart-curves','initialization','lecture16',[16],'Compare different paths and a shared endpoint.',
  '**All displayed runs reach the same final training accuracy despite different early curves**. The result separates variability in the route from variability in the final proportion correct.')
F('recurrent-state','recurrent','lecture17',[3],'Locate the information passed between processing steps.',
  '**Feedback carries context into the next computation**. A recurrent state is not simply another independent classification of an isolated input.')
F('parallel-heads','heads','lecture18',[3],'Read horizontal parallel work separately from vertical depth.',
  '**Several heads contribute within one layer**, then the representation moves to a successive layer. Counting heads and counting layers answers different architectural questions.')
F('depth-state','dynamic-depth','lecture18',[4],'Follow a changing representation through repeated processing.',
  '**An output representation becomes an input to a later transformation**. The connection to dynamics concerns this repeated change rather than literal motion of the model’s internal numbers.')
F('sequence-vectors','next-token','lecture18',[5],'Keep the representation and next-item task separate.',
  '**The input items are represented as vectors even when their original materials differ**. Context across the sequence determines which continuation the model should favor.')
F('syllable-patterns','phonotactics','lecture18',[6],'Compare a valid onset with a cluster divided by a syllable boundary.',
  '**Position within the syllable changes which sequences are allowed**. A consonant cluster in the middle of a word does not automatically establish the same cluster as a possible word beginning.')
F('letter-options','letter-guess','lecture18',[7],'Read a restriction on continuations as information in the context.',
  '**Some beginnings allow many letters while others leave a narrow set of choices**. Their probability distributions should differ accordingly rather than treating every uncertain context as equally unconstrained.')
F('agent-graph','levels','lecture18',[2],'Separate the levels from one neuron to a graph of communicating models.',
  '**A model’s internal processing differs from messages between task-performing models**. The critic-to-reviser connection belongs to the larger system’s organization.')

F('fricative-table','fricatives','lecture02',[4],'Read voicing and place as separate dimensions.',
  '**A column can preserve place while a row changes voicing**. The comparison explains why two sounds can be similar on one dimension and different on another.')
F('stop-table','stops','lecture02',[5,6],'Keep oral closure distinct from the nasal airflow route.',
  '**A nasal stop still closes the mouth**, while its lowered velum permits nasal airflow. Shared place and voicing can therefore coexist with a different route for the air.')
F('sgd-trajectories','rate','lecture03',[30,31],'Compare adjustment speed and fluctuation on the same learning problem.',
  '**Larger corrections respond more strongly to each observation**. A faster path can therefore fluctuate more instead of being uniformly better at every step.')
F('path-values','value','lecture04',[13,16],'Read a state value as the best cost of finishing.',
  '**The stored value includes the remaining route**, rather than just the next edge. It makes an earlier choice sensitive to the future costs the greedy rule leaves out.')
F('basilar-membrane','cochlea','lecture08',[5,6,7],'Connect the membrane’s mechanical gradient with frequency-selective responses.',
  '**The light, stiff region favors high frequencies and the heavier, more compliant region favors low frequencies**. Neural activity associated with place carries information about the incoming mixture.')
F('euler-paths','euler','lecture08',[9,10,11],'Compare simulations by the update rule they actually use.',
  '**Using the old state for both updates differs from using a newly updated position**. Their different paths reflect numerical procedures as well as the intended oscillator model.')
