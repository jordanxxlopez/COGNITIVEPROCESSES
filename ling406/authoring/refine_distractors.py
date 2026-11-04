"""Plausible competing explanations for the canonical original questions."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
B=json.loads((ROOT/'questions.json').read_text());Q={q['id']:q for q in B}
def refine(module,rows):
 for line in rows.strip().splitlines():
  number,a,b,c=line.split('|');Q[f'{module}-q{int(number):02}']['choices'][1:]=[a,b,c]
refine('speech1',r'''
1|Each speaker's voice establishes a separate word meaning|Only differences between identical physical tokens can be recognized|Recognition requires the listener to reproduce the speaker's acoustics
2|The timing between consonant release and voicing|The source's fundamental repetition rate|The listener's decision boundary while acoustics remain fixed
3|Each band represents one successive phoneme|The bands primarily show syllable intensity rather than resonance|F1 and F2 name the first two syllables
4|How changing voicing onset affects a stop-consonant boundary|How source pitch changes while the filter remains fixed|How different natural speakers' many acoustic differences combine
5|The source retains the original resonance pattern unchanged|Applying a filter changes the listener's vocabulary directly|The procedure holds the output constant while changing its interpretation
6|Each vowel occupies one nonoverlapping acoustic point|Every overlapping token must be the same linguistic vowel|F2 can be ignored once F1 is measured accurately
7|To guarantee identical discrimination before collecting responses|To compare naturally co-varying speaker and syllable properties|To replace the identification task with an acoustic measurement
8|To determine whether greater physical distance improves discrimination|To compare identification accuracy without a discrimination task|To locate the most frequent vowel in natural speech
9|Any peaked identification curve necessarily proves information loss|The endpoints alone determine sensitivity in every interior pair|Discrimination is redundant once three labels are available
10|Higher accuracy wherever the labeling curve changes fastest|Lower accuracy within a category despite equal physical spacing|Increasing accuracy only when a pair is assigned different labels
11|Only final labels matter; discrimination adds no independent evidence|The pattern identifies a uniquely human speech mechanism|The measured categories establish that no graded information survives
12|Use one fixed physical boundary for every participant|Compare group-average discrimination only with the endpoints|Treat a shifted boundary as failure to form any category
13|A same judgment establishes that the acoustic files matched|The design directly estimates the rate of correct same judgments|Any different response demonstrates equal sensitivity everywhere
14|It improves recognition by preserving every physical difference equally|It helps only if all within-category variation is deleted at every level|It stabilizes recognition by preventing sensitivity at boundaries
15|Explicit knowledge of which word the sound begins|A demonstrated label change rather than only discrimination|A stable preference for one phoneme regardless of repetition
16|Discrimination tracks acoustic spacing without category effects|Infants show mature lexical recognition of the syllables|Recovery proves all linguistic categories were innately specified
17|A general age-related decrease in hearing acuity|A loss of all categorical organization after early infancy|Evidence that later infants have forgotten specific Hindi word meanings
18|Categorical perception cannot be measured using labels|Categorical effects are absent in speech|Only experience-free categories can occur outside speech
19|The animals acquired the same lexical meanings as adults|Reward training proves that human phoneme categories require explicit rewards|Speech categories necessarily reflect a mechanism exclusive to language
20|Learning only preserves distinctions already equally clear at birth|Age alone strengthens every contrast regardless of environment|Experience improves vocabulary but cannot change sound discrimination
''')
refine('speech2',r'''
1|Final identification selects one word rather than two|Listeners discriminate some cross-boundary sound pairs well|Acoustic features and words use different representations
2|More competitor activation for every token nearer the boundary|A boundary shift produced by lexical feedback|Continuous downstream sensitivity despite identical transmitted symbols
3|Thresholded because the final response can be categorical|Feedback because information reaches more than one level|Cascaded only if words also influence phonemes
4|Several levels use partially transformed material at the same time|Later stages revise earlier stages through reciprocal connections|A finished response hides earlier uncertainty from measurement
5|Each level waits for another level's completed product|Only the final state can influence the next level|Reverse connections alone establish graded forward transmission
6|To establish the final label without measuring its time course|To remove lexical competition by presenting visual objects|To infer that every briefly viewed object was selected
7|The categorical click proves a completed phoneme gate|Graded looks mean no categorical identification occurred|The eye movements measure only response errors after selection
8|The categorical label assigned to the token|The word's dictionary meaning|The number of possible lexical candidates in the display
9|A constant competitor level until a phoneme threshold switches|Competitor activity determined only by the final click|Greater competitor activation only after the listener chooses it
10|A discrete /b/ signal is identical across tokens, so lexical uncertainty is added later independently|The eye trace measures a second final answer rather than partial activation|The competitor activates only because its picture is visually similar
11|The nonword must first be accepted as a complete dictionary entry|The prime's resemblance influences responses without activating a related word|Priming arises only from a shared initial phoneme with the target
12|Final categorization directly specifies how every earlier stage transmitted information|All word recognition must be thresholded because it ends in one choice|A labeling task can measure lexical feedback without changing lexical context
13|A feature continuously activates a compatible phoneme|A partially active phoneme activates several words|Competing words inhibit each other at the same lexical level
14|To compare familiar and unfamiliar talkers' articulation|To ensure that the same response label always creates a word|To vary word frequency while removing phoneme ambiguity
15|Whether endpoint tokens are ever correctly labeled|Whether participants are able to perform any labeling task|Whether all responses are shifted equally across the continuum
16|Clear endpoints because word knowledge is needed most when sound is certain|All continuum positions equally because the bias concerns reporting a word|Only the nonword endpoint because no acoustic evidence is used
17|A uniform response correction unrelated to ambiguity|Identical labeling functions regardless of lexical context|Complete elimination of category distinctions by word knowledge
18|Final /g/ resolves only the current sound with no effect on lexical candidates|Initial phoneme identity must have been fully settled before any word activated|Word activation changes, but lexical-to-phoneme influence is excluded
19|Feedback is possible only in speech, not written-word models|The acoustic input becomes available all at once|Only written words can activate competing lexical representations
20|Lexical processing begins only after a complete word is delivered|An onset competitor must share the target's meaning|A competitor's brief activation necessarily changes the final response
''')
refine('aphasias',r'''
1|Comprehension and repetition are one operation with different names|A repetition error identifies a loss of every lexical meaning|Fluency alone determines whether the heard word was understood
2|Fluent articulation establishes intact comprehension despite substitutions|Neologisms are direct evidence of an isolated motor-planning deficit|Syntactically shaped output guarantees intact lexical selection
3|The underlying grammatical system independently of task demands|A uniquely localized lesion defined only by its anatomical name|The speed of articulation without reference to grammatical form
4|A fluent comprehension disorder is the defining historical observation|The later syndrome concerns only articulation and never comprehension|All agrammatic output directly identifies the original motor deficit
5|They equate choosing a lemma with arranging its affixes|They imply grammatical assembly is unnecessary once meanings are selected|They identify lexical meanings solely through speech-movement timing
6|It removes all memory and attention demands from the task|It establishes competence directly regardless of the chosen sentences|It tests only whether the patient can recognize the nouns
7|Only sentence length can determine successful comprehension|The sentence is ungrammatical and cannot test interpretation|A correct picture choice necessarily uses every syntactic relation
8|The dog bites the man, and the dog is angry|The man bites the dog, and the man is angry|The dog and man exchange grammatical roles at the main verb
9|To measure lexical familiarity while holding event plausibility irrelevant|To ensure every embedded sentence can be solved by likely event knowledge|To infer grammar from speech production without a comprehension response
10|Broca's patients showed fully intact comprehension across conditions|The two patient groups differed only in articulation rate|The comparison directly ruled out general processing demands
11|Specific task contrasts eliminate all individual variability|A syndrome name independently establishes a single underlying mechanism|Broad symptom totals identify structural computation more directly than contrasts
12|Cat, because the first noun is always the agent|Both, because a cleft assigns equal actor roles|Cat, because the embedded object becomes the main-clause agent
13|Only the overall difference between patients and controls|The number of nouns correctly recognized without assigning roles|The first-mentioned animal independently of grammatical form
14|The sentence-specific pattern uniquely proves loss of grammar|Speed stress changes the sentence's grammatical structure|Healthy listeners' mistakes cannot inform patient processing accounts
15|To replace an interpretation task with a pure articulation task|To determine whether visual input can repair every linguistic deficit|To hold language constant while changing the action relation
16|Any association with Broca's area must be syntactic by definition|A nonverbal task measures only visual acuity rather than event relations|The anatomical result proves that the clinical group has no language difficulty
17|Selecting the correct grammatical suffix for an action|Mapping the first noun onto an agent without sound interpretation|Planning the articulatory form of a pictured object's name
18|Imaging establishes the task's computation independently of behavioral design|The overlap proves verbal and nonverbal representations are identical|A posterior association uniquely identifies word-specific representations
19|Classify each patient by syndrome before considering the task pattern|Use a single fluent-speech score as the measure of grammar|Infer a missing computation from the clinical label alone
20|A complete grammar–lexicon dissociation independent of task definition|A one-to-one map between every syndrome and named region|Proof that posterior tissue processes only words and no other sounds
''')
refine('development1',r'''
1|Children retain frequent complete sentences more accurately than rare ones|Children recognize some sounds before naming objects|Vocabulary contains arbitrary links between sounds and referents
2|Children receive encouragement when a message is communicatively successful|Grammatical and ungrammatical utterances differ in surface frequency|Children repeat a form after an adult has just used it
3|Identification tasks always require a small set of response categories|Formant differences can be manipulated without changing lexical context|Listeners can recognize the same message from variable speakers
4|A high sucking rate without a comparable unchanged condition|Recovery measured only before a new token is presented|A final word choice without measuring the infant's behavioral change
5|To assume that within-category tokens are physically identical|To ensure the two conditions have equal perceived differences|To make a labeling task unnecessary for defining every adult boundary
6|The infants' sucking response measures the complete grammar directly|Early appearance implies that no experience could have affected the behavior|The method directly separates innate auditory capacity from every learned influence
7|Older English-learning infants tested only on the native contrast|Younger English-learning infants tested only on an easier contrast|Adult English readers' explicit knowledge of the contrast names
8|All contrasts require native-language exposure to become initially detectable|The native categories emerge only after word meanings are acquired|Every early category boundary remains unchanged by experience
9|Early infant speech discrimination and adult speech labeling alone|Two native-language contrasts with different acoustic distances|A native speaker's vocabulary size and sentence-production speed
10|The nonspeech sounds are implicitly treated as linguistic units|Any sharp labeling function alone identifies the perceptual mechanism|Category-linked discrimination must disappear without meaningful words
11|The within-category condition contains no acoustic shift|Infants recover because they recognize a new word|The result identifies a uniquely phonemic form of habituation
12|That the animal has formed a complete human phoneme inventory|That every intermediate stimulus will receive the same response|That successful responding necessarily involves lexical meaning
13|Initial speech perception is already narrowed to one adult language|All speech contrasts depend on conscious explicit instruction|The easier contrast must have larger syllable meanings
14|Selective retention of two initially equally discriminable categories|A general improvement independent of the language environment|The appearance of vocabulary without a change in perception
15|The bell first becomes a symbolic word for food|Food and bell connections strengthen equally without co-occurrence|Reward eliminates the need for any representation of the stimulus
16|One exact acoustic point defining every possible vowel token|A prototype supplied entirely by an adult verbal label|The total token frequency without their acoustic distribution
17|It guarantees identical category learning in both conditions|It makes the two overall distributions equivalent|It rules out any contribution of surrounding input structure
18|Unimodal exposure supports greater separation of the test tokens|Both groups must label the tokens explicitly as different phonemes|The critical difference is simply how often tokens 3 and 6 occurred
19|Only the number of Mandarin words infants can already produce|A purely acoustic exposure count independent of interaction|The necessity of television-specific visual cues for category learning
20|A learner extracts every varying property with equal readiness|Social interaction is a reward added after statistical learning is complete|Earlier categories affect final responses but never subsequent learning
''')
refine('development2',r'''
1|Every closure consistently marks the beginning of a new word|Pauses locate syllable boundaries and thereby uniquely locate all words|Knowing the acoustic waveform automatically supplies the segmentation
2|A language-independent preference for the longest familiarized word|A guarantee that every English word has initial stress|Explicit knowledge of the two words' meanings
3|It uniquely determines the intended meaning of each segment|It supplies the same boundary cues in every language|It makes stress irrelevant once one sound pair is recognized
4|The count of the pair alone measures its conditional predictability|The denominator should contain only successful pair repetitions|The ratio measures whether the two syllables share a meaning
5|Speech statistics cannot ever support word segmentation|Every acoustic sequence has one invariant boundary structure|Stress alone always resolves competing divisions correctly
6|To make each word recognizable through isolated presentation|To emphasize stress as the only remaining boundary cue|To test whether familiar meanings improve statistical learning
7|The meanings of the units from conditional probability alone|A unique grouping supplied by physical pauses|An explicit rule that an adult had to teach verbally
8|The colors changed how frequently each auditory unit occurred|The infant received the same colored word labels as the experimenter|The visualization demonstrates that the sound had audible boundaries
9|It ensures equal conditional predictability inside both sequences|It compares familiar words with sequences never heard at all|It removes differences in segmentation while testing only referent learning
10|Only the complete strings' raw frequencies|Only the experimental test duration|The probability of the whole stream independent of the starting syllable
11|Part-words were more familiar because longer looking always indicates familiarity|Part-words were unfamiliar solely because they never occurred during exposure|The response establishes knowledge of what the artificial words mean
12|The sound category alone specifies which part of the scene is named|The most visually salient feature must be the referent by definition|Recognizing a segmented form already establishes a whole-object meaning
13|A requirement that the child and adult look at the same time without communication|Direct evidence that every gaze shift establishes a new word meaning|A default rule that only the object in the child's hand can be named
14|Infants can never learn from recordings in any task|The spoken label was sufficient regardless of communicative setting|The infant's current attention alone uniquely established the intended referent
15|Mapping to the child's held toy because it co-occurs with the label|Choosing the most visually familiar object regardless of gaze|Treating the adult's word as a label for the bucket itself
16|Associating the label with whichever object was seen most recently|Mapping equally to every object that appeared during the search|Using only which object the infant handled at the moment of labeling
17|Naming the visually distinctive part before the whole|Selecting a property because it varies more than object identity|Interpreting every novel noun as an action performed with the object
18|The already named dog because familiar referents always take priority|Either object equally because known labels supply no information|The unfamiliar object's most salient property rather than the entity
19|The number of words uniquely determines the underlying construction|A formula must already have the same productive grammar as an adult pattern|Context is irrelevant once two different nouns have appeared
20|It tests a familiar action name without structural generalization|It shows that production length and comprehension must coincide|It makes actor–recipient roles recoverable from the verb's known meaning
''')
refine('l1-critical',r'''
1|A critical period in which the relevant learning is impossible afterward|An age-independent system with equal learning efficiency throughout life|An early window that remains open indefinitely whenever input is absent
2|The peripheral deficit must be unchanged despite treatment|The better eye prevents light from reaching the corrected eye|The outcome reflects only current input, not earlier organization
3|The stronger eye physically displaces the weaker eye's retinal tissue|The weaker eye has no initial cortical connections at all|The two eyes become identical inputs after the first exposure
4|It repairs the weaker eye's optical defect directly|It improves vision by reducing input from both eyes equally|It prevents experience from changing the already formed cortical balance
5|Early input history has no persistent effect once training begins|Ordinary adult exposure automatically restores normal vision|The early advantage was only a difference in peripheral anatomy
6|Current optical repair immediately restores the original cortical balance|The cortical outcome is independent of the initial deprivation|Treatment helps by reinforcing the stronger eye's existing advantage
7|Sign can serve only as a second language after spoken language|Any ambient speech provides equivalent accessible linguistic input|Early access matters only for vocabulary and not structural knowledge
8|A direct observation of one neural switch at a fixed closing age|Evidence that stages are learned only through explicit reward|Identical recovery after the same injury in children and adults
9|It confirms that no developmental changes occurred in the missing ages|It independently establishes the exact onset and offset of the window|It makes a sparse neurological description a controlled acquisition experiment
10|They demonstrated equivalent outcomes after early and adult injury|They proved the remaining hemisphere always restores every skill completely|They directly measured the quality of all childhood language input
11|Better outcomes establish complete recovery to the same trajectory|Low-normal outcomes show no early advantage over adulthood|The outcome is explained only by the side of injury, irrespective of age
12|Vocabulary is a direct substitute measure for all grammatical knowledge|A single age score would already identify which component changed|Comprehension and production necessarily reflect identical demands
13|A persistent disadvantage for grammar relative to vocabulary|A role for early experience in later outcomes|A difference between comprehension and production development
14|Her spoken output uniquely measures everything she understands|Vocabulary size and grammatical production must develop at equal rates|Punishment of vocalization rules out any later comprehension learning
15|Complete absence of later vocabulary learning|A controlled age manipulation with all other experience matched|Preservation of a fully acquired first language from early childhood
16|It equates both the onset of ASL and the onset of any language|It isolates language modality while holding all prior linguistic experience constant|It compares two groups whose early language foundations are identical
17|Age at learning ASL alone determines performance regardless of early access|Spoken input is required because sign cannot establish a first language|Late L1 and late L2 impose the same learning problem by definition
18|Maturation can affect learning even without normal input|Early accessible language contributes to later learning|Vocabulary and grammar can show different learning outcomes
19|Every later learning success rules out any sensitive-period effect|All components share one exact cutoff regardless of experience|A rare case is equivalent to experimentally randomized deprivation
20|It establishes identical neural representations for vision and grammar|It directly determines the treatment needed for every late L1 learner|It shows later learning has the same efficiency as early acquisition
''')
refine('sentence',r'''
1|The horse raced and then fell, with raced as the sole main verb throughout|The barn is the understood subject of fell|Raced and fell jointly form one unchanged main predicate without a modifier
2|Difficulty appears only after a completed sentence has been assigned no structure|All structurally ambiguous sentences lack a grammatical interpretation|A single correct endpoint reveals the absence of earlier commitment
3|The analysis most consistent with world knowledge before any structural choice|Every possible analysis maintained equally until the final word|The analysis containing the richest set of embedded relations
4|A property identifying which safe was opened|The subject performing the opening action|A modifier of the burglar's identity rather than the action
5|The noun attachment is ungrammatical but semantically attractive|Jewels is simply less familiar, independent of attachment|The structural preference automatically changes before meaning is evaluated
6|Meaning corrects a structural analysis only after a mismatch|A parser favors economical trees in an ambiguous sentence|A later word sometimes requires reanalysis
7|Reduced relatives are intrinsically difficult regardless of lexical content|Semantics matters only after an independent parser completes its task|Only the number of structural nodes determines reading cost
8|Burglar is more likely than policeman to perform an arrest|The two nouns favor exactly the same agent expectations|The difference eliminates reduced-relative structure from the first sentence
9|They establish that the empty towel was the final required destination|They measure knowledge of towel without interpreting the instruction|They show the listener had already resolved the full instruction correctly
10|More looks to the empty towel because two apples increase every ambiguity equally|Identical early looks because context can act only after syntactic completion|An inability to select either apple despite the identifying phrase
11|The number of apples and their locations|The need to distinguish one referent from another|All contextual information supplied by the scene
12|It directly identifies one stored syntactic tree|It proves the incorrect destination was ultimately selected|It measures only the completed response with greater spatial precision
13|Which single linguistic module must generate the entire response|Whether grammar knowledge is present independently of task design|Only whether the participant eventually notices an error
14|The word cannot be recognized because it is not in the lexicon|It is semantically odd but structurally expected after the determiner|The context supplies no category expectation before eaten appears
15|A demonstrated grammar-only computation independent of perceptual cues|Proof that semantic and visual predictions cannot operate rapidly|A universal response to every unexpected word regardless of form
16|The expected grammatical category changes the printed letters themselves|Syntactic effects must wait for all visual processing to finish|Only explicit grammatical rules can generate visual expectations
17|Contextual category is fixed because the written form stays identical|The manipulation isolates meaning while holding grammatical role unchanged|A form's typical category completely determines its role in every sentence
18|Whether typical form fixes grammatical role regardless of context|Whether the same spelling can ever occur in two categories|Whether statistical form information is available only after sentence completion
19|A category effect must occur equally for every noun once its role is known|Neutral nouns cannot be integrated syntactically at all|The early effect establishes an exclusively abstract syntactic computation
20|Horse-raced: a grammatical sentence cannot create a processing cost|Colorless-green: sensible meaning is necessary for grammatical structure|Bird-perches: early word-category effects are independent of form statistics
''')
refine('l2-learning',r'''
1|Ultimate attainment is the number of words acquired in the first lesson|Adults' initial advantage guarantees native-like eventual performance|Children must outperform adults at every phase for an age effect to exist
2|Existing concepts eliminate the need to learn new grammatical mappings|General knowledge guarantees that L1 representations cannot interfere|The learner can acquire L2 only by memorizing complete translations
3|Whenever prior knowledge becomes active, even if it supports the correct mapping|Only when the learner benefits from a shared meaning|Whenever the learner consciously notices a linguistic similarity
4|The two Hindi categories must have identical acoustic properties|The listener has no established category relevant to the sounds|The difficulty concerns only producing the English word labels
5|Only the pronunciation of one form, with no change in attention to nouns|A requirement to classify every object by social gender|A direct copy of English determiner choice with different vocabulary
6|The referents' shared meaning uniquely fixes their grammatical class|Grammatical gender can be inferred from the object's social identity|Agreement follows only word meaning, not noun-class membership
7|Similarity ensures that every associated meaning is the same|Cognates benefit only advanced learners, not initial acquisition|Useful transfer requires the same grammatical gender in both languages
8|The new form is processed without activating any known representation|The error demonstrates a failure of all transfer rather than a misleading mapping|The L2 word necessarily has the English meaning despite its use
9|The pairs reproduce fully known foreign words rather than new learning|Similarity can be tested only after participants become fluent|The design holds similarity fixed while changing only retention delay
10|Similarity helps recognition but cannot contribute to initial learning|Delayed retention is independent of how a mapping was acquired|Only the immediate receptive response supports a benefit
11|It eliminates all differences between cognate and noncognate items|It supplies the unfamiliar form directly and asks for its meaning|It measures only how transparent a new form looks
12|Concrete meanings necessarily make every item a cognate|The delay changes cognate status into concreteness|The two effects are different labels for one manipulation
13|A word related to the target's meaning without onset overlap|Any picture that resembles the target object visually|Only the target's direct translation regardless of sound overlap
14|The English names of the pictured objects share their onset|Speaker and matches are semantic synonyms|The task requires a conscious decision to translate the target
15|The Russian object must become the final selected target|An English competitor prevents all simultaneous Russian activation|The result establishes equal competitor strength in every display
16|The small numerical gap proves a reliable effect equal to L2 competition|The result establishes exactly zero activation for every learner and task|The reverse-language condition is theoretically redundant
17|Identical lexical and conceptual links for all levels of experience|Completely separate conceptual stores without cross-language routes|A requirement that L2 concepts always become stronger than L1 concepts first
18|Balance guarantees no competitor activates in the nonrequired language|Stronger shared access removes the need for any inhibitory control|The model predicts two fully independent systems whenever proficiency matches
19|The task proves every possible early representation was erased permanently|Their early acquisition history therefore could not have included Korean|The test directly establishes that later relearning cannot show an advantage
20|The groups differ only in the language named on the test|Early exposure has the same retention consequences regardless of later input|A negative initial test guarantees identical outcomes after retraining
''')
refine('l2-sensitive',r'''
1|The direct strengthening of every grammatical rule through formal schooling|A capacity preserved completely by early use regardless of later maturation|A change in vocabulary size used as the definition of hemispheric dominance
2|They provide randomized onset ages with all exposure quality matched|They remove transfer by including an already acquired L1|Their prior language makes task design irrelevant
3|The speed of acquiring the first few words|The participant's age rather than a proficiency outcome|The closing time of a neural window measured independently of language
4|Only spontaneous implicit processing under conversational speed|Articulatory ability without grammatical knowledge|The amount of speech heard independently of response strategy
5|The overall correlation independently identifies a discrete closing event|The early and late ranges must have identical within-group slopes|Each range measures a different language rather than onset age
6|All participants in the late group answered the sentences randomly|Late learners produced the same low score regardless of individual differences|The points show a precise additional decline with every later arrival year
7|Uniform chance accuracy in all childhood arrivals|No difference between the earliest and latest childhood arrivals|An identical attainment score for every learner arriving before puberty
8|It predicts that every adult has precisely the same low final score|It treats later scatter as proof that language exposure stopped|It explains age patterns without any assumptions about learning capacity
9|A fixed native vocabulary size independent of continued experience|Equal attainment for all language pairings regardless of transfer|Preserved capacity only for the original language and no possible later language
10|Complete preservation of subsequent acquisition ability through early use|A lack of any first language in the older learners|An explanation based only on never exercising language in childhood
11|Receptive vocabulary versus productive vocabulary with identical access demands|A grammatical representation versus no linguistic knowledge whatsoever|A difference explained solely by the printed forms of words
12|The test directly measures maturation without any schooling contribution|The correlation establishes that arrival age is irrelevant to every task|Formal instruction supplies a measure of implicit fluency alone
13|Age alone fixes identical outcomes regardless of the prior language|Every tested English construction has an equivalent L1 mapping|A language pair changes only pronunciation and never grammar learning
14|Different constructions can have different transfer support|A total attainment score pools distinct grammatical structures|Older learners bring prior representations to a new language
15|The difficulty must be explained only by global hearing acuity|A missing L1 equivalent makes the English construction unlearnable|The absence of determiners in L1 has no effect on attention to the pattern
16|The same arrival age guarantees equivalent experience and test knowledge|A single downward overall correlation proves a language-pair-independent mechanism|The changed group automatically invalidates every earlier age observation
17|It is the same measure as years of formal education by definition|It directly records the brain's capacity independently of exposure|It guarantees identical amount and quality of input after arrival
18|All tests measure the same knowledge with the same processing demands|One result must be discarded because any task difference is irrelevant|Untimed judgment necessarily measures only implicit competence
19|An early advantage requires adults to learn more slowly in every initial lesson|Any adult success eliminates the possibility of a sensitive-period effect|One distribution establishes an absolute postpubertal inability to acquire grammar
20|It proves late first-language deprivation has no lasting effects|It establishes identical developmental histories for late L1 and late L2 learners|It shows every grammatical construction declines at the same rate
''')
assert all(len(set(q['choices']))==4 for q in B)
(ROOT/'questions.json').write_text(json.dumps(B,ensure_ascii=False,indent=2)+'\n')
print('Refined all 540 distractors with competing course interpretations.')
