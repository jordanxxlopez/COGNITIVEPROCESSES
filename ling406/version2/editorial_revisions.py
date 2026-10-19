"""Integrated scripts for densely illustrated pages and closely related concepts."""

REVISIONS = {
 'speech2-04': [
  'In a **threshold model**, activity is only passed forward from one level to the next when an activity threshold is crossed. A threshold is the activation level that has to be reached before the next stage receives a signal.',
  'The lower feature level can contain changing evidence about whether a sound is voiced. Its activity can rise or fall while the higher phoneme level remains inactive, because the required threshold has not yet been reached.',
  'Once the threshold is crossed, the phoneme signal changes abruptly. The output acts like a gate: later processing receives the selected category, such as /b/, instead of a continuously changing account of the earlier acoustic uncertainty.',
  'Two physically different sounds could therefore produce the same phoneme output. If both cross the threshold for /b/, the word-recognition stage receives the same category even when one sound was closer to the /b/–/p/ boundary.',
  'This produces a prediction about word recognition. Within-category acoustic differences should stop influencing lexical competition once they have been converted into the same phoneme signal. Comparing those tokens tests whether that earlier uncertainty actually survives into the next level.'
 ],
 'speech2-05': [
  'In a **cascaded model**, activity is passed forward continuously over time from one level to the next. The higher level begins using partial information while the lower level is still processing the sound.',
  'Changing feature evidence can therefore change phoneme activity gradually. If the evidence increasingly favors a voiced sound, support for /b/ can rise while some support for the competing /p/ interpretation remains.',
  'That partial phoneme activity can influence words immediately. A token that favors /b/ can activate bear most strongly and still activate pear to a smaller degree. Moving the token closer to the category boundary should increase support for the competing word.',
  'The listener can still give a categorical final response. A task requiring a choice between bear and pear ends with one click, even if both candidates participated before the decision.',
  'Categorical perception might happen later on, or partly reflect the task structure. The useful question is therefore whether graded information reaches words during processing. Eye movements toward the competing picture provide a way to measure that information before the final choice.'
 ],
 'speech2-10': [
  '**McMurray and colleagues** ask whether phoneme identification for word recognition is more like thresholded processing, the lumber-mill analogy, or cascaded processing, the food-web analogy. The issue is whether words receive only a completed phoneme decision or also its developing uncertainty.',
  'They tested identification of a **/b/–/p/ continuum** in a **visual-world display for eye-tracking**. Voice onset time changes the evidence for the initial consonant, while the pictured alternatives make the possible word interpretations visible.',
  'Participants see a target, a competitor, and filler objects. For bear and pear, the two words form a minimal pair: their initial phoneme differs, while the rest of the word is the same. The participant hears a token and clicks the corresponding picture.',
  'Eye-tracking measures where the participant looks before that click. A glance toward pear during a bear response indicates that the competing word is involved, even though bear eventually wins.',
  'The crucial comparison varies VOT among tokens receiving the same final label. If competitor looks change as those tokens approach the category boundary, the word-recognition system is using information that the final bear-or-pear response does not preserve.'
 ],
 'speech2-19': [
  '**Ganong** investigated how phoneme identification is impacted by word knowledge. Word/nonword pairs such as **corpse/gorpse** let the surrounding sounds favor a real word for one interpretation of an ambiguous initial consonant.',
  'The consonant is varied across the relevant phoneme boundary in small, equally spaced steps. This creates clear endpoint tokens and intermediate tokens for which the acoustic evidence is less decisive.',
  'A **late correction process** proposes that categorical perception functions as usual, but a later reporting stage has a bias to report having heard a word. The word preference is applied after the earlier phoneme decision.',
  'That account makes a prediction about the response curves. A general reporting bias should affect the word response beyond only the most ambiguous point, because the correction belongs to the later response stage.',
  'The competing account changes the categorical boundary itself. Comparing where the lexical-context curves differ therefore helps locate the effect: a broad response bias and a difference concentrated near the boundary describe different ways word knowledge could influence the answer.'
 ],
 'sentence-11': [
  'In **“Recent research reported by…”**, several sources of information can support a reduced-relative interpretation very early. Research is inanimate and is unlikely to be the person doing the reporting, so its meaning favors research that someone else reported.',
  '**Lexical statistics** add another cue: reported occurs frequently in reduced relatives. Experience with scientific papers makes that pattern especially familiar after research. The particular word, its usual construction, and knowledge about scientific writing can all support the same analysis.',
  'These cues interact with syntax while the sentence is being processed. The reader does not have to wait for every word before information about likely events and familiar constructions becomes useful.',
  'Compare **“The burglar arrested in the parking lot was charged today”** with **“The policeman arrested in the parking lot was charged today.”** In both, arrested introduces a reduced relative: the burglar or policeman is the person who was arrested.',
  'A burglar is a more expected recipient of arrest, whereas a policeman is a plausible person doing the arresting. That difference can make the same grammatical continuation easier or harder to adopt. The example connects processing difficulty to the interaction of sentence structure, word statistics, and world knowledge.'
 ],
 'sentence-25': [
  '**Dikker and colleagues** connect early syntactic expectations with **form typicality**: how characteristic a word’s visible form is of a grammatical class. An expectation for a verb can prepare the visual system for patterns that verbs tend to have.',
  'The prediction therefore reaches beyond an abstract noun-or-verb label. If grammatical expectations feed back into perception, an expected category can also prepare physical properties associated with that category.',
  'An incoming word whose form conflicts with that expectation can produce an early visual response. This explains why sensitivity in visual cortex can arise before a complete analysis of the whole sentence.',
  'The distinction between a strongly category-typical form and a neutral form matters. An obvious form cue provides a clearer opportunity for an expected visual pattern to be confirmed or violated.',
  'The account links syntax to learned visual statistics. Grammatical context influences what form is expected, and the match between that prediction and the incoming word helps determine the early perceptual response.'
 ],
 'sentence-26': [
  'The sentences use the same written words in different grammatical roles. **Perches** can name objects that birds sit on, or describe what a bird does. **Needs** can name requirements, or express needing something.',
  'In **“Chris and Ben are glad that the bird perches seem easy to install,”** bird perches is a noun phrase. The perches are the things that seem easy to install, and the plural verb seem agrees with them.',
  'In **“Chris and Ben are glad that the bird perches comfortably in the cage,”** bird is the subject and perches is its verb. Comfortably describes the action or position of the bird.',
  'The same contrast appears in **“The teacher told the principal that the student needs were not being met”** and **“…that the student needs to be more focused.”** In the first, needs names the student’s requirements. In the second, needs is a verb describing what the student requires.',
  'The continuation makes the category clear even though the critical written word is unchanged. This lets grammatical context be compared with expectations associated with the word’s form: the form can look more typical of one category while the sentence uses the other.'
 ],
 'sentence-27': [
  '**Perches is noun-like, and needs is verb-like.** These labels describe the forms’ typicality, rather than a rule restricting each word to one grammatical use. Both words appear as nouns and as verbs in the sentence materials.',
  'In **“the bird perches seem easy to install,”** the noun-like form perches is used as a noun. In **“the bird perches comfortably in the cage,”** that same form is used as a verb. The latter combines a noun-like physical pattern with a verbal role.',
  'In **“the student needs were not being met,”** needs is a noun referring to requirements. Its verb-like form therefore appears in a nominal use.',
  'In **“the student needs to be more focused,”** needs is used as a verb. Here its form typicality and grammatical role align.',
  'Crossing the two properties separates the influence of sentence structure from the influence of word form. If early visual processing uses predicted physical patterns, the match between form typicality and the expected category should affect the response.'
 ],
 'sentence-28': [
  'The four sentences separate **syntactic category** from **form typicality**. Syntactic category is the noun or verb role required by the sentence. Form typicality concerns whether the visible word looks more characteristic of nouns or verbs.',
  '**“The bird perches seem easy to install”** uses perches as a noun, while **“the bird perches comfortably in the cage”** uses it as a verb. Because perches is noun-like, the second use pairs the same physical form with the less typical category.',
  '**“The student needs were not being met”** uses needs as a noun, while **“the student needs to be more focused”** uses it as a verb. Needs is verb-like, so the nominal use reverses the alignment found for perches.',
  'The comparison asks whether an early response follows abstract grammatical expectations alone or also the physical word patterns associated with those expectations. Reusing each critical form makes its grammatical role change without replacing the word itself.',
  'A form-based account predicts that the visible cues matter to the early perceptual effect. Sentence processing can therefore influence perception through expectations about how the next word is likely to look, connecting grammatical knowledge with the analysis of written input.'
 ],
 'aphasias-13': [
  'The sentence materials include **control**, **semantically constrained center-embedded**, **reversible center-embedded**, and **improbable center-embedded** sentences. The comparison changes how much sentence meaning can help recover the grammatical relationships.',
  'A control provides a relatively straightforward description of an action. **Center embedding** places one clause inside another, so the listener has to connect the nouns with their roles while keeping the larger sentence in mind.',
  'In **“The apple that the boy is eating is red,”** semantic plausibility strongly supports the intended relationship. A boy can eat an apple, so familiar event knowledge helps identify who is acting on what.',
  'In **“The cat that the dog is biting is black,”** either animal could plausibly bite the other. This is reversible: the listener needs the grammatical relationships to select the picture showing the dog biting the cat.',
  'In **“The dog that the man is biting is black,”** the intended action conflicts with the more familiar event of a dog biting a man. Choosing the correct picture requires following the sentence even when ordinary expectations favor the opposite direction. Comparing these conditions shows how grammatical processing and plausibility contribute to comprehension.'
 ],
 'development1-12': [
  'The **chinchilla experiment** asks whether speech categorization depends on possessing human language. The animals learn a rewarded response to endpoint speech stimuli and are then tested on sounds between those endpoints.',
  'A short-lag or long-lag voice-onset-time endpoint serves as an **SD**, a discriminative stimulus signaling that a response can receive food. The endpoint is therefore meaningful to the animal through the training contingency.',
  'Once that response has been learned, intermediate VOT tokens test generalization. The question is which trained response each unfamiliar token produces as its timing moves along the continuum.',
  'The resulting response curve changes in a category-like way, broadly resembling human labeling. Equal physical steps along the acoustic dimension can therefore produce a sharper change between response categories.',
  'Human speech can use an auditory organization also found in an animal without human language. This challenges the claim that the categorical pattern itself requires a uniquely human, language-specific mechanism, and supports considering more general perceptual capacities.'
 ],
 'development2-09': [
  'Testing **transitional probabilities** requires separating the predictability of a syllable sequence from how often it was heard. Hearing a familiar sequence more often could produce a preference without the infant having used its internal transitions.',
  'Half of the artificial words are repeated more frequently than the other half. The test compares words with **part-words matched for frequency of occurrence**. A part-word spans a boundary instead of corresponding to one of the intended words.',
  'The stream includes tokibu, gikoba, and gopila. **GOPILA** appears twice, and the boundary-spanning sequence **BU-GIKO** also appears twice. Those equal occurrence counts make simple frequency an insufficient explanation of their difference.',
  'Within GOPILA, the relevant transitions both have probability **2/2**. Each observed GO is followed by PI, and each observed PI is followed by LA. For the cross-boundary transition, GI follows BU on only **2/4** occasions, because BU also leads into another following word.',
  'Transitional probability asks how often the next syllable follows this particular preceding syllable. The word has more reliable internal transitions than the equally frequent part-word. Distinguishing them therefore provides evidence about sensitivity to that predictability, which can help locate word boundaries.'
 ],
 'development2-12': [
  'The **inductive problem of early word learning** is that a scene is compatible with many possible meanings. Hearing a sound while looking at an animal does not specify which aspect of the scene the speaker intends to name.',
  'The animal could be called **CAT**, **PET**, **ANIMAL**, or **FELIX**. These choices refer to different levels: a kind of animal, its relationship to people, a broad category, or one particular individual.',
  'Other possibilities include **FURRY**, **WHISKERS**, **LEG**, **WALKING**, and **ALIVE**. A new word might refer to a property, a body part, an action, or a state rather than the whole animal.',
  'Quine’s **gavagai problem** expresses this uncertainty about reference. An unfamiliar word and a visible scene alone leave several interpretations open. The **hypothesis space** is the set of meanings the learner could consider.',
  'Word learning therefore needs ways of narrowing that space. Attention, the speaker’s intention, and assumptions about what new labels usually name can help select a useful interpretation. The following word-learning strategies address how the child gets from many compatible possibilities to a more specific meaning.'
 ],
 'l1-critical-12': [
  '**Hemispherectomy** is removal of a cerebral hemisphere, discussed here in the treatment of severe seizures. The language outcome depends strongly on when the damage or surgery occurs.',
  'Children can develop substantial language after very early damage, including loss of left-hemisphere tissue normally associated with language. The developing system can assign important functions to remaining tissue.',
  'Adults show a very different pattern after comparable loss. The contrast suggests that the same anatomical damage has different consequences depending on the system’s developmental state.',
  'Lenneberg related this change to **cerebral dominance**, the developing asymmetry of language organization between the hemispheres. Earlier organization was proposed to allow more flexibility before adult-like specialization became established.',
  'The causal idea is functional reassignment: a less fixed early organization provides more opportunity for other tissue to support language. The developmental contrast therefore contributes to the proposal that biological maturation changes the conditions under which language can be acquired or reorganized.'
 ],
 'l2-learning-10': [
  '**De Groot and Keijzer** studied transfer using **paired-associate learning of made-up words**. Dutch words were paired with unfamiliar associates, and participants were asked to learn which forms belonged together.',
  'The pairs varied in similarity to their Dutch associates. **Gitaar–gettar**, meaning guitar, is a concrete cognate-like pair. **Tijger–duunze**, meaning tiger, is concrete but non-cognate: its new form provides much less resemblance to the familiar Dutch word.',
  'They also varied **concreteness**. **Domein–domaan**, meaning domain, is an abstract cognate-like pair, whereas **herstel–groop**, meaning repair, is abstract and non-cognate. This crosses form similarity with the kind of concept being learned.',
  'Participants see the paired forms and try to establish an association that can later be retrieved. Similarity can provide a bridge from a known word to the new label, while a dissimilar form requires learning a less familiar connection.',
  'Testing after a week examines retention as well as immediate learning. Comparing cognate-like and non-cognate pairs within this design asks whether existing language knowledge helps acquire and remember new vocabulary from the earliest stages.'
 ],
 'l2-learning-11': [
  'The reported pattern is that **cognates are learned more rapidly and remembered more easily**. Similarity between a familiar Dutch word and its newly learned associate helps performance during learning and later retention.',
  'A cognate-like form provides a connection to knowledge already available. Recognizing that connection makes the unfamiliar label easier to link with an existing word and meaning.',
  '**Session 4 follows one week without training.** Performance there therefore concerns how well the learned association persists, rather than the immediate benefit of seeing a pair again during practice.',
  'The table also distinguishes concrete and abstract items. These comparisons retain the design’s separate factors, so the cognate effect concerns similar versus dissimilar forms within that broader set of materials.',
  'The result places transfer at the beginning of learning. Existing form knowledge can help establish and later retrieve the new association before the learner has developed broad proficiency in the second-language vocabulary.'
 ],
 'l2-learning-12': [
  'The paired-associate study distinguishes **receptive** from **expressive or productive** vocabulary testing. The two directions place different demands on what has been learned.',
  'In the receptive direction described here, the new associate is supplied and the learner produces the Dutch word. A form resembling a familiar word can provide a strong clue about the intended answer.',
  'Gitaar, tijger, and domein also resemble words that an English speaker might already recognize. Guessing a meaning from a familiar-looking form is therefore easier than establishing that its exact unfamiliar partner can be retrieved.',
  'In productive testing, the familiar word is supplied and the learner has to produce the new associate. The participant must recall the learned form itself, rather than only recognizing which familiar meaning it resembles.',
  'Including this direction strengthens the interpretation of a cognate learning benefit. Similarity helps not only recognition or guessing, but also the acquisition of a form that can be produced when the known word is given.'
 ]
}
