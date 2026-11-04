window.LING406_TRANSCRIPTS_V6 = {
  "revision": "ling406-transcripts-v6",
  "scripts": {
    "speech1-01": [],
    "speech1-02": [
      {
        "text": "**Speech perception** allows a listener to recognize words in a changing sound signal. Somehow, the sound of “I can see you” becomes a message with recognizable words, even though the recording contains no separate acoustic pieces corresponding to the written letters. The movements used to produce neighboring sounds overlap, so their acoustic effects overlap as well.",
        "children": []
      },
      {
        "text": "A speaker’s voice also changes the physical form of an utterance. Different speakers can produce the same vowel with different frequencies, and some frequencies can overlap across vowels. Matching a recording to one fixed sound pattern would therefore leave many ordinary productions unrecognized.",
        "children": []
      },
      {
        "text": "Recognizing speech requires finding a linguistic identity within this physical variation. The words can remain the same when the voice changes, because the message depends on how the sounds function in the language rather than on an exact repetition of every acoustic detail.",
        "children": []
      }
    ],
    "speech1-03": [
      {
        "text": "Somehow we have to turn a **highly variable, analog signal into something more abstract**, so the language system can operate on it. An **analog signal** changes continuously. Frequency, loudness, and timing can each vary by small amounts, but every small change does not create a different speech sound.",
        "children": []
      },
      {
        "text": "A **symbolic representation** identifies a language unit rather than preserving every physical detail of the recording. A **phoneme** is a sound category that helps distinguish words. Different acoustic productions can count as the same phoneme, allowing different recordings to supply the same linguistic unit.",
        "children": []
      },
      {
        "text": "**Categorical perception** is one proposed way of making this translation. Listeners become less sensitive to some differences within a category and more sensitive to similar differences that cross its boundary. A change in the sound is especially noticeable when it changes the identity assigned to it. This organization can preserve useful distinctions while allowing variation within one identity.",
        "children": []
      }
    ],
    "speech1-04": [
      {
        "text": "The **vocal tract** is the passage through which sound travels during speech. Its shape changes as the tongue, lips, and mouth move. Those changes affect which frequencies receive the strongest amplification, so the sound reaching the listener depends partly on the shape of this passage.",
        "children": []
      },
      {
        "text": "**Formants** are the resonant frequencies emphasized by the vocal tract. Vowels such as those in heed, hid, head, and had differ in their combinations of formants. The remaining examples, including hod, hawed, hood, and who’d, involve other combinations. A vowel is characterized by the relationship among resonances rather than by one frequency that stays identical across speakers.",
        "children": []
      },
      {
        "text": "A **formant transition** is a change in one of these resonances over time. The transition occurs because the vocal tract is moving into or out of a sound. A steady portion supplies information about a vowel, while the movement toward that portion also carries information about how the sound is produced.",
        "children": []
      }
    ],
    "speech1-05": [
      {
        "text": "A **spectrogram** represents acoustic energy across time and frequency. Time describes when parts of the sound occur, and frequency describes how rapidly the air pressure is vibrating. Stronger energy appears darker. The prominent bands associated with a vowel include its resonances, called **formants**.",
        "children": []
      },
      {
        "text": "The vowels in **bead, bid, bade, bed, bad, bod, baud, bode, “bood,” and booed** differ even though their surrounding consonants are similar. Their resonance patterns change with vowel quality. Bead combines a relatively low first formant with a high second formant, while the second formant is much lower for rounded back vowels such as the vowel in booed.",
        "children": []
      },
      {
        "text": "**F1** is the lowest formant, and **F2** is the second-lowest. These are two resonances occurring within one vowel, rather than successive sounds in a word. Comparing their frequencies provides a way to describe how vowels differ without treating every acoustic component as a separate speech sound.",
        "children": []
      }
    ],
    "speech1-06": [
      {
        "text": "The vowel **/u/** contains several resonances within one continuous sound. In this recording, **F1 is near 300 Hz and F2 is near 900 Hz**. These values identify two frequency regions with strong energy. They do not mean that the speaker produces one sound at 300 Hz and then another at 900 Hz.",
        "children": []
      },
      {
        "text": "A **waveform** records changes in air pressure over time. A **spectrogram** separates the recording into frequency components, allowing its resonance pattern to be examined. Both representations describe the same spoken vowel, but they make different properties available for analysis.",
        "children": []
      },
      {
        "text": "**Praat** is software used to analyze speech sounds and estimate their formant frequencies. In **source–filter synthesis**, the sound energy supplied by the voice is separated from the filtering associated with the vocal tract. This separation allows the resonance pattern to be changed while the underlying sound source is kept constant.",
        "children": []
      }
    ],
    "speech1-07": [
      {
        "text": "**Praat can automatically identify formants** and track how their frequencies change during a recording. The analysis of /u/ includes five resonances. Each track follows one resonance through time, so several tracks can describe different frequency components of the same spoken sound.",
        "children": []
      },
      {
        "text": "**F1, F2, and F3** are usually most relevant to identifying phonemes. Their numbers refer to their order from low to high frequency. F1 is the lowest resonance, F2 is the next, and F3 is the third. The labels do not describe the order in which separate sounds are spoken.",
        "children": []
      },
      {
        "text": "The manipulation focuses on **F1 and F2**, which are near 300 Hz and 900 Hz in this /u/. Holding the remaining formants constant allows the effect of changing these lower resonances to be examined. A difference in the resulting vowel can then be connected to a particular part of its frequency pattern.",
        "children": []
      }
    ],
    "speech1-08": [
      {
        "text": "The voice supplies a **source** of sound energy, and the vocal tract acts as a **filter**. A filter changes how strongly different frequencies contribute to the final sound. The formants describe the resonances created by this filtering, so a recorded vowel contains effects of both the source and the filter.",
        "children": []
      },
      {
        "text": "Estimating the filter makes it possible to remove much of its contribution from the recording. The remaining signal approximates an **unfiltered voice** and sounds like a buzz. It still contains acoustic energy, but the vowel’s characteristic pattern of amplification has been reduced.",
        "children": []
      },
      {
        "text": "This estimation is comparable to separating a contribution within a combined signal. A filter can then be applied to the extracted source to produce a vowel again. Keeping that source unchanged while replacing the filter makes the role of the resonance pattern available for controlled testing.",
        "children": []
      },
      {
        "text": "The filter estimate comes from the formant frequencies in the recording. Removing that estimated pattern is comparable to separating one contribution from a combined measurement. The extracted source is approximate, so it is described as more-or-less unfiltered rather than a perfect direct recording of the source alone.",
        "children": []
      }
    ],
    "speech1-09": [
      {
        "text": "A **filter** specifies which frequencies in a source receive more or less emphasis. The original /u/ filter has low first and second formants. Applying that pattern to the source preserves the combination of resonances associated with the original vowel.",
        "children": []
      },
      {
        "text": "A second filter **raises F1** while keeping the higher formants approximately unchanged. A third filter **raises F2 substantially** instead. These manipulations change different parts of the resonance pattern, rather than moving every frequency together.",
        "children": []
      },
      {
        "text": "The **sound source remains the same** across the three filters. Any resulting difference in vowel quality therefore occurs without requiring a different voice or a new natural recording. The comparison isolates how a change in the lowest resonance differs from a change in the second resonance.",
        "children": []
      },
      {
        "text": "The first filter uses the first four formants from the original recording. Raising one of the lower formants changes the pattern without replacing the remaining resonances. This distinction matters because a vowel can change when only part of its spectral organization changes.",
        "children": []
      }
    ],
    "speech1-10": [
      {
        "text": "**Combining a source with different filters produces different vowels** because each filter emphasizes a different pattern of frequencies. The source supplies the available sound energy. The filter shapes how much of that energy remains prominent in each frequency region.",
        "children": []
      },
      {
        "text": "With the original filter, the low-formant pattern of /u/ is retained. Raising **F1** changes the lowest strong resonance, while raising **F2** changes the second. The resulting sounds can have different vowel qualities even though they come from the same underlying source.",
        "children": []
      },
      {
        "text": "**Source–filter synthesis** therefore separates two contributions that are combined in ordinary speech. The voice supplies the sound, and the vocal tract’s resonances shape its quality. A researcher can change that quality by replacing the filter without asking a speaker to produce a completely new utterance.",
        "children": []
      }
    ],
    "speech1-11": [
      {
        "text": "**Vowel space** describes relationships among vowels through their formant frequencies. F1 and F2 are useful because different vowel qualities involve different combinations of these resonances. A vowel occupies a range of values rather than one exact point that every speaker must reproduce.",
        "children": []
      },
      {
        "text": "**Anatomy, speaking rate, and surrounding sounds** affect these values. Different vocal tracts have different resonances, and the movements required for neighboring sounds affect the vowel as it is produced. The measured frequencies of different vowels can therefore overlap.",
        "children": []
      },
      {
        "text": "Formants still provide a useful description, especially for **one talker speaking carefully**. Changing the **steady-state formants**, meaning the resonances during a relatively stable part of the vowel, can produce recognizable vowel approximations. Natural speech also contains changes over time, so these stable values describe an important part of the signal without accounting for all its variation.",
        "children": []
      }
    ],
    "speech1-12": [
      {
        "text": "The **pattern playback synthesizer** turns a painted spectrographic pattern into sound. The pattern specifies where acoustic energy should occur across time and frequency. Changing the pattern changes the sound produced, allowing researchers to create controlled speech-like signals without relying on repeated natural utterances.",
        "children": []
      },
      {
        "text": "A **cylindrical lens** and rotating **tone wheel** produce changing light. A lens and mirror direct it toward the painted pattern, which allows different amounts of light through at different positions. The pattern therefore controls the fluctuations that continue through the device.",
        "children": []
      },
      {
        "text": "A **light collector and photocell** convert those fluctuations into an electrical signal. An amplifier strengthens the signal, and a loudspeaker produces the audible output. The researcher can alter a frequency band or transition in the pattern and hear the corresponding change in the synthesized sound.",
        "children": []
      }
    ],
    "speech1-13": [
      {
        "text": "The stop consonants **/b/, /d/, and /g/** differ partly in their **formant transitions**. These transitions are movements in resonance as the vocal tract opens into the following vowel. The audible part of a stop is produced during movement, so consonant information is carried by how the frequencies change rather than only by a stable portion of sound.",
        "children": []
      },
      {
        "text": "**Liberman and colleagues (1957)** created synthetic syllables with a similar lower formant and different starting frequencies for the upper formant. The upper transition could rise, remain relatively flat, or fall before reaching a similar vowel region. The following vowel could remain alike while its onset changed.",
        "children": []
      },
      {
        "text": "The **pattern playback synthesizer** allowed these properties to be controlled. Listeners heard speech-like sounds whose transitions differed in a specified way. Their responses could then be related to the transition itself, rather than to an uncontrolled collection of differences between natural utterances.",
        "children": []
      }
    ],
    "speech1-14": [
      {
        "text": "A **speech continuum** contains sounds that change gradually along a controlled acoustic property. Here, **F1 stays constant while F2 onset frequency changes linearly** across thirteen stimuli. A linear change means that each neighboring pair differs by the same programmed amount.",
        "children": []
      },
      {
        "text": "When F2 begins below the stable vowel frequency, its transition rises. Higher starting frequencies make the transition flatter and then produce a falling transition. The acoustic property changes gradually throughout this sequence, even if the listener begins assigning a different consonant label at particular positions.",
        "children": []
      },
      {
        "text": "Equally spaced pairs can fall within one category or cross a category boundary. Comparing those pairs holds their physical separation constant. If a boundary-crossing pair is easier to distinguish, its advantage cannot be explained simply by a larger change in the synthesized signal.",
        "children": []
      }
    ],
    "speech1-15": [
      {
        "text": "An **ideal observer model** describes responses expected under a particular account of perception. In a **noncategorical** account, uncertainty grows gradually as a sound moves away from a clear category example. That clear example is called a **prototype**. A sound between prototypes can resemble more than one category to different degrees.",
        "children": []
      },
      {
        "text": "The continuum extends from **/b/** through **/d/** to **/g/**. Moving away from the /b/ prototype gradually reduces support for /b/ and increases support for /d/. The proposed response to stimulus 2 is about **75% /b/ and 25% /d/**, representing partial uncertainty rather than an immediate change in identity.",
        "children": []
      },
      {
        "text": "The same gradual exchange occurs between /d/ and /g/. Labeling becomes blurry between prototypes because two labels are plausible. This account predicts smooth changes across the continuum, rather than sharp switches confined to narrow category boundaries.",
        "children": []
      }
    ],
    "speech1-16": [
      {
        "text": "A **labeling task** asks a listener to identify a sound as /b/, /d/, or /g/. A **discrimination task** asks whether two sounds are the same or different. Naming a category and detecting an acoustic difference are separate responses, even when both tasks use the same continuum.",
        "children": []
      },
      {
        "text": "If sensitivity to F2 onset is **linear**, equal acoustic differences should be equally noticeable. Sounds 1 and 3 should be about as easy to distinguish as sounds 5 and 7 because each pair has the same physical separation. Their position along the continuum should not by itself change discrimination.",
        "children": []
      },
      {
        "text": "This account predicts **discrimination independent of labeling**. Choosing among three names produces rises and falls in labeling responses near the prototypes. Detecting equally sized physical differences should remain approximately constant, rather than becoming better specifically where a label changes.",
        "children": []
      },
      {
        "text": "A listener can be uncertain which of two names to choose while still hearing that two sounds differ. The model therefore makes separate predictions for the two tasks. A labeling peak is not automatically a prediction of a discrimination peak at the same position.",
        "children": []
      }
    ],
    "speech1-17": [
      {
        "text": "**Liberman and colleagues (1957)** found sharp changes in consonant identification across an evenly changing acoustic continuum. Early stimuli mainly received **/b/** labels, middle stimuli **/d/** labels, and later stimuli **/g/** labels. The changes near category boundaries were more abrupt than the gradual uncertainty predicted by a noncategorical account.",
        "children": []
      },
      {
        "text": "Listeners were **best at discriminating sounds near the category boundaries**. Equally spaced sounds were easier to tell apart when they received different consonant labels. This relationship appeared with one-step, two-step, and three-step comparisons, so it was not limited to one chosen pair size.",
        "children": []
      },
      {
        "text": "Increasing physical separation generally improved discrimination, but it did not explain why performance peaked near the boundaries. Predictions derived from labeling captured much of that pattern. Some acoustic sensitivity remained beyond the simplest categorical prediction, so category identification and discrimination were related without being identical measures.",
        "children": []
      }
    ],
    "speech1-18": [],
    "speech1-19": [
      {
        "text": "In **beach–peach identification**, one listener keeps the same label through the early continuum and gives mixed responses near the boundary. Further along, the other word becomes the consistent answer. The acoustic input changes gradually, while the chosen word changes within a narrower region.",
        "children": []
      },
      {
        "text": "That listener is better at distinguishing pairs **4–6 and 5–7**, which cross the identification boundary. Pairs well inside one category are harder to tell apart despite a similar physical separation. Pair 6–8 falls between these patterns because stimulus 6 itself receives mixed labels.",
        "children": []
      },
      {
        "text": "Another listener changes word labels later and has stronger discrimination closer to that later boundary. People can therefore differ in exactly where they switch categories. The shared relationship is stronger discrimination around the region where their own word identification changes.",
        "children": []
      }
    ],
    "speech1-20": [
      {
        "text": "**Category boundaries differ across listeners**. The same sound can lie near the beach–peach boundary for one person but farther inside a category for another. A pair that crosses one person’s boundary might therefore remain within the other person’s category.",
        "children": []
      },
      {
        "text": "**Discrimination is generally better across categories** than within them. A listener may fail to detect a physical difference between two versions of the same phoneme. A similarly sized difference becomes more noticeable when the sounds are assigned different linguistic identities.",
        "children": []
      },
      {
        "text": "The shortened task used only **physically different pairs**. Every trial therefore had “different” as its correct physical answer. A “same” response indicated that the listener had not detected the difference, not that the recording contained identical sounds. The responses concern what was perceived, while the construction of the stimuli establishes what physically changed.",
        "children": []
      }
    ],
    "speech1-21": [
      {
        "text": "The **bear–pear** identification results contain a fairly clear change in word label, while discrimination varies irregularly across pairs. The **beach–peach** results also include fluctuations. A carefully constructed continuum does not guarantee that every measured response will form a smooth curve.",
        "children": []
      },
      {
        "text": "Identification records the word a listener chooses, whereas discrimination records whether a difference is detected. These behaviors can vary differently across trials and people. An isolated rise in discrimination does not establish that an additional phoneme category exists at that location.",
        "children": []
      },
      {
        "text": "The scientific comparison concerns whether easier discrimination tends to occur where identification changes. Class responses can contain that relationship alongside substantial variability. Evaluating the account requires relating the two measurements, rather than treating every fluctuation as a new categorical distinction.",
        "children": []
      }
    ],
    "speech1-22": [
      {
        "text": "**Reduced sensitivity to some sound differences can support stable word recognition**. Different productions of the same phoneme are physically different. Treating every small acoustic change as a new identity would make ordinary versions of one word seem unrelated.",
        "children": []
      },
      {
        "text": "**Categorical perception** allows different acoustic versions to count as members of the same category. Differences inside that category become less noticeable, while differences separating categories remain useful. The listener can recognize the same language unit across changes that do not alter the word.",
        "children": []
      },
      {
        "text": "This advantage does not require equal sensitivity to every detail of the sound. What matters is preserving differences that separate linguistic identities while tolerating variation within them. Being worse at detecting some physical changes can therefore be compatible with being better at recognizing a stable message.",
        "children": []
      }
    ],
    "speech1-23": [],
    "speech1-24": [
      {
        "text": "The **conditioned head turn procedure** measures whether an infant detects a change in sound. The infant learns an association between the change and a visual reward. Turning toward the sound provides an observable response without requiring the infant to name what was heard.",
        "children": []
      },
      {
        "text": "**High-amplitude sucking** measures a different behavior. Sucking can decline as a repeated sound becomes familiar. If a new sound causes sucking to increase again, the change has affected the infant’s behavior and provides evidence that the sounds were distinguished.",
        "children": []
      },
      {
        "text": "Both methods make perception testable before spoken responses are available. The experimenter controls the sound difference and measures a learned turn or renewed sucking. These responses establish sensitivity to the change, rather than requiring an infant to perform an adult labeling task.",
        "children": []
      }
    ],
    "speech1-25": [
      {
        "text": "**Eimas and colleagues (1971)** used **high-amplitude sucking** to test infant speech discrimination. Infants first heard a repeated synthetic syllable until sucking declined. The sound then changed across an adult phoneme boundary, changed within a category, or remained unchanged.",
        "children": []
      },
      {
        "text": "**Voice onset time**, or **VOT**, describes when voicing begins relative to the consonant release. In **20D**, a change from **+20 to +40 milliseconds** crossed the adult boundary and sucking recovered. In **20S**, an equally large change remained within a category, either **−20 to 0** or **+60 to +80 milliseconds**, and did not produce comparable recovery.",
        "children": []
      },
      {
        "text": "In the **0 condition**, the sound stayed the same and sucking continued to decline. The equal size of the two changed conditions matters because acoustic distance alone cannot explain their different effects. Infants responded more strongly when the change crossed the adult category boundary, before they could provide verbal labels.",
        "children": []
      },
      {
        "text": "A recovery in sucking is the measured behavior, while discrimination is the inference drawn from it. The unchanged control establishes what continued repetition does. The within-category comparison then tests whether any equally sized acoustic change is enough to produce the recovery seen across the boundary.",
        "children": []
      }
    ],
    "speech1-26": [
      {
        "text": "**Perceptual narrowing** occurs when experience tunes perception to the surrounding language while sensitivity to some other distinctions decreases. English-learning infants initially distinguish the tested **Hindi and Salish contrasts** relatively well. Their performance becomes poorer as the first year progresses.",
        "children": []
      },
      {
        "text": "Many infants meet the discrimination criterion at **6–8 months**. Fewer do so at **8–10 months**, and performance is much lower at **10–12 months**. Infants learning Hindi or Salish retain stronger discrimination for the contrast used in their language.",
        "children": []
      },
      {
        "text": "**Werker and Tees** relate this developmental change to experience with a particular sound system. The infant becomes adapted to distinctions that occur in that system. The same development can leave distinctions from other languages harder to detect, rather than preserving equally strong sensitivity to every speech contrast.",
        "children": []
      }
    ],
    "speech1-27": [
      {
        "text": "One proposal treats **categorical perception as a special property of the language system**. Under this account, infants begin life with category-organizing abilities that support speech perception. Their early responses are attributed to a starting system prepared for linguistic distinctions.",
        "children": []
      },
      {
        "text": "The description **“citizens of the world”** captures the claim that young infants can initially detect contrasts used across languages. Experience rapidly tunes this broad sensitivity to the language heard around them. Distinctions used in that language remain available, while sensitivity to others declines.",
        "children": []
      },
      {
        "text": "This is an account of both the initial state and developmental change. It proposes broad early abilities followed mainly by narrowing. The claim is stronger than saying that adults recognize native speech well, because it also specifies what infants can distinguish before extensive language experience.",
        "children": []
      }
    ],
    "speech1-28": [
      {
        "text": "**Categorical perception also occurs outside human language**. Category-related responses have been observed with nonspeech sounds and in other animals. A categorical pattern therefore does not by itself establish that the mechanism is unique to human speech.",
        "children": []
      },
      {
        "text": "The strength of the pattern also depends on the **task**. Naming a sound, detecting a difference, and making a learned response place different demands on a listener. A categorical final answer can be especially pronounced when the task requires a choice between labels.",
        "children": []
      },
      {
        "text": "**Infant perception is not completely universal**. Some contrasts are already harder to detect than others early in life. Development includes initial differences in sensitivity as well as changes caused by experience. These observations challenge the stronger claim that every speech distinction begins equally available in a system devoted only to language.",
        "children": []
      }
    ],
    "speech1-29": [
      {
        "text": "**Cutting and Rosner (1974)** tested categorical perception with **nonspeech sounds** that differed in **rise time**. Rise time is how quickly a sound becomes stronger after it begins. A rapid onset sounds plucked, while a slower onset sounds bowed.",
        "children": []
      },
      {
        "text": "The materials included **sawtooth and sine waves**, with speech syllables included for comparison. Listeners could assign pluck or bow labels even though the manipulated sounds were not different phonemes. The relevant property was the rate of increase in amplitude.",
        "children": []
      },
      {
        "text": "For sawtooth waves, increasing rise time changed the preferred label from pluck to bow. Discrimination was strongest near that labeling change rather than remaining constant for equally spaced sounds. The relationship between a category boundary and improved discrimination can therefore occur with a nonlinguistic auditory distinction.",
        "children": []
      },
      {
        "text": "Pluck and bow are perceptual labels for different onset qualities, not names of phonemes. The physical continuum remains gradual across the change in preferred label. Improved discrimination near that change links the result to categorical organization without requiring the listener to interpret the sounds as speech.",
        "children": []
      }
    ],
    "speech1-30": [
      {
        "text": "**Jusczyk and colleagues (1977)** tested infants’ responses to **nonspeech sounds**. After a sound was repeated, the experiment compared no change, a change within a category, and a change between categories. Sucking behavior provided the measure of whether the change was detected.",
        "children": []
      },
      {
        "text": "Sucking declined as the repeated sound became familiar in all conditions. It stayed relatively low after no change and after a within-category change. A between-category change caused sucking to increase again, followed by another decline as that sound became familiar.",
        "children": []
      },
      {
        "text": "The boundary-crossing change affected behavior more strongly than a change within the category. Infants can therefore display category-related discrimination for sounds that are not speech. An ability’s early appearance does not establish that it operates only on phonemes or only within language.",
        "children": []
      }
    ],
    "speech1-31": [
      {
        "text": "Chinchillas learned to respond to speech sounds through **operant conditioning**, in which consequences change the likelihood of a behavior. A stimulus with **0-millisecond or 80-millisecond lag** signaled that a response would produce food. This rewarded signal is called the **SD**, or discriminative stimulus.",
        "children": []
      },
      {
        "text": "Tests with intermediate **voice onset times** measured how the response extended across a **/ga/–/ka/** continuum. Chinchillas and human comparison listeners changed their responses sharply within part of that continuum. The animals could categorize the acoustic distinction without possessing human language.",
        "children": []
      },
      {
        "text": "**Ohlemiller and colleagues (1999)** and **Kuhl and Miller (1975)** are associated with these comparisons. Making the initial burst and aspiration noise stronger could shift the boundary toward shorter VOTs or change how sharply responses switched. The categorization depended on acoustic properties in both the animal and human responses.",
        "children": []
      }
    ],
    "speech1-32": [
      {
        "text": "Some speech distinctions are **less salient**, meaning harder to notice, than others early in development. At **4–5 months**, English-learning infants respond more clearly to **[ma]–[na]** than to the nonnative **[na]–[ŋa]** contrast. Increased looking after a change provides evidence that the infant detected it.",
        "children": []
      },
      {
        "text": "These contrasts involve different **places of articulation**. The nasal in [ma] is made with the lips, the nasal in [na] near the ridge behind the teeth, and the nasal in [ŋa] farther back in the mouth. The comparison concerns whether changing that place changes the infant’s response.",
        "children": []
      },
      {
        "text": "Filipino-learning infants respond weakly to their native [na]–[ŋa] contrast at **6–8 months**, but more clearly at **10–12 months**. Experience can therefore strengthen a distinction that begins difficult to hear. Speech development includes increased sensitivity to some contrasts as well as declining sensitivity to others.",
        "children": []
      }
    ],
    "speech2-01": [],
    "speech2-02": [
      {
        "text": "In **Klatt’s model of speech perception (1979)**, the auditory system begins by analyzing the incoming sound. The **cochlea**, in the inner ear, responds to its frequency components. Acoustic property detectors supply information that phonetic feature detectors use to estimate properties such as voicing.",
        "children": []
      },
      {
        "text": "**Segmental analysis** organizes these features into speech segments. A segmental feature matrix represents the resulting sequence, and **lexical search** uses that sequence to activate possible words. These possible words are lexical hypotheses, meaning candidates that might match what was heard.",
        "children": []
      },
      {
        "text": "A strict staged account completes a phoneme decision before passing it to word recognition. **Cascaded processing** instead passes partial information forward while a decision is developing. **Feedback** sends influence in the other direction, allowing an activated word to affect the interpretation of its sounds. These describe different ways that the levels can communicate.",
        "children": []
      },
      {
        "text": "A phoneme sequence is more abstract than the incoming waveform. Reducing different recordings to shared segments makes them usable for lexical search. The strict staged claim adds a timing requirement, however, by making word identification wait until those component identities have been selected.",
        "children": []
      }
    ],
    "speech2-03": [
      {
        "text": "The **beach–peach continuum** varies **voice onset time**, or VOT. VOT measures when vocal-fold vibration begins relative to the release of a stop consonant. A shorter delay supports the /b/ in beach, while a longer delay supports the /p/ in peach. Much of the remaining word stays similar.",
        "children": []
      },
      {
        "text": "In **identification**, the listener selects a word. Early continuum steps receive one label, responses become mixed near the middle, and later steps receive the other. The **category boundary** is the region where the preferred label changes and the input is most uncertain between the alternatives.",
        "children": []
      },
      {
        "text": "In **discrimination**, the listener decides whether two sounds differ. Performance is strongest for pairs near the identification boundary, including pairs 4–6 and 5–7. Equal physical changes are less noticeable within a category than across categories. The acoustic distance alone therefore does not determine how easily a difference is heard.",
        "children": []
      }
    ],
    "speech2-04": [
      {
        "text": "A **threshold model** requires activity to reach a particular amount before it can affect the next level. Evidence below that threshold can fluctuate without producing a response at the higher level. The higher stage waits until the lower stage has enough support to deliver its selected output.",
        "children": []
      },
      {
        "text": "Feature evidence varies between **+voiced and −voiced**. Early fluctuations remain below the relevant thresholds, so the phoneme level receives no completed decision. When +voiced activity crosses its threshold, support for **/b/** appears abruptly at that level.",
        "children": []
      },
      {
        "text": "Under this account, word recognition receives the selected phoneme rather than the entire history of uncertainty. Two acoustically different inputs that both produce /b/ can therefore become identical for the word stage. The transformation preserves the category but discards differences that existed before the threshold was crossed.",
        "children": []
      }
    ],
    "speech2-05": [
      {
        "text": "In **cascaded processing**, developing activity affects the next level before a decision is complete. Changing feature evidence can therefore change phoneme activity throughout recognition. The system does not wait for a single feature to cross a threshold before passing any information onward.",
        "children": []
      },
      {
        "text": "Stronger voicing evidence increases support for **/b/**, while weaker voicing favors **/p/**. A sound can activate both to different degrees. Two sounds eventually labeled /b/ can still differ in how much support they temporarily give /p/.",
        "children": []
      },
      {
        "text": "A **categorical final response** does not establish that all preceding processing was categorical. A listener must click either beach or peach, even if both words were active. The selected answer identifies the winner, while cascading preserves differences in the evidence that contributed to the competition.",
        "children": []
      }
    ],
    "speech2-06": [
      {
        "text": "A **lumber mill** changes trees into lumber, and a **furniture factory** changes lumber into furniture parts. An **IKEA customer** assembles those parts into usable furniture. Each operation depends on receiving a product in a form it can use.",
        "children": []
      },
      {
        "text": "A factory cannot treat an unprocessed tree as finished lumber, and the customer cannot assemble the intended furniture directly from a tree. Work at one operation does not automatically become usable input for the next. The required transformation must be completed first.",
        "children": []
      },
      {
        "text": "**Thresholded processing** has this dependence on a completed product. A higher level waits for the lower level to supply the required representation. Unfinished information is not continually passed forward merely because some processing has already occurred.",
        "children": []
      }
    ],
    "speech2-07": [
      {
        "text": "**Thresholded activity** means that one level begins only when the preceding level supplies the required kind of input. The stages carry out separate transformations. Activity at the lower stage can change while the higher stage still waits for a finished representation.",
        "children": []
      },
      {
        "text": "In speech recognition, a strict threshold account makes word processing depend on an identified phoneme. A partially resolved acoustic signal is not yet that phoneme. The word level receives the completed segment rather than all the evidence that competed during its identification.",
        "children": []
      },
      {
        "text": "This arrangement also determines which information is lost. If different sounds are converted into the same phoneme, their earlier differences no longer reach word recognition through that pathway. The output is useful for treating varied sounds alike, but later processing cannot recover uncertainty that was never passed forward.",
        "children": []
      }
    ],
    "speech2-08": [
      {
        "text": "In a **food web**, a population can respond while its food supply is still changing. A drought reduces desert plants, which affects kangaroo rats and then animals that feed on them. A snake population does not wait for the rat population to reach a final, completed state before being affected.",
        "children": []
      },
      {
        "text": "**Cascaded processing** has a similar continuous dependence. Changing feature evidence alters phoneme activity, and changing phoneme activity alters support for words. Each level can respond to partial information instead of waiting for the previous level to finish.",
        "children": []
      },
      {
        "text": "The food web also contains reciprocal influences among predators and prey. In a recognition model, **feedback** means influence from a higher level back to a lower one. Cascading and feedback are distinct. One passes developing evidence forward, while the other allows activity farther along the system to affect an earlier representation.",
        "children": []
      }
    ],
    "speech2-09": [
      {
        "text": "A **thresholded account** begins word recognition with a completed phoneme decision. A **cascaded account** allows a word to receive support while the phoneme is still uncertain. The difference concerns how much of the developing acoustic evidence remains available to possible words.",
        "children": []
      },
      {
        "text": "Two sounds can both receive a final **/b/** label while differing in their resemblance to **/p/**. If both are reduced to the same completed /b/, a strict threshold system supplies the word level with the same input. Cascading can preserve greater /p/ support for the more ambiguous sound.",
        "children": []
      },
      {
        "text": "The accounts can therefore agree about the word eventually selected while predicting different competition before that selection. A final answer alone does not separate them. Evidence about temporary support for a competing word tests whether uncertainty continues to influence recognition.",
        "children": []
      }
    ],
    "speech2-10": [
      {
        "text": "**McMurray, Tanenhaus, Aslin, and Spivey (2003)** tested spoken-word recognition using a **visual-world eye-tracking task**. Participants listened to sounds varying between /b/ and /p/ while viewing pictures. The sound manipulation changed the evidence for the initial consonant without replacing the whole word on every trial.",
        "children": []
      },
      {
        "text": "The pictures included **bear and pear**, which differ in that initial sound, along with unrelated objects such as **a lamp and a ship**. Participants chose the picture matching what they heard. Their eye movements were measured while recognition was still developing.",
        "children": []
      },
      {
        "text": "A participant could eventually select bear after briefly looking at pear. Those competitor looks provided evidence that the alternative had received some support. The method therefore measured competition preceding the final click, including activity for a word that was ultimately rejected.",
        "children": []
      }
    ],
    "speech2-11": [
      {
        "text": "Participants **clicked the picture** matching the spoken word. Increasing VOT made the onset more /p/-like, and pear responses rose sharply. The identification boundary occurred near **17.5 milliseconds**, where the preferred interpretation changed between the two words.",
        "children": []
      },
      {
        "text": "The final choices formed a **step-like pattern**. Several different sounds on the /b/ side produced bear responses, and several on the /p/ side produced pear responses. The final label grouped acoustically different inputs together.",
        "children": []
      },
      {
        "text": "A mouse click records the word selected at the end of recognition. It does not record every candidate that received support beforehand. The sharp identification change is therefore compatible with gradual differences in competition among sounds that receive the same final label.",
        "children": []
      }
    ],
    "speech2-12": [
      {
        "text": "**Gradient ambiguity** means that uncertainty varies by degree. Sounds near the bear–pear boundary provide more support for both alternatives than clear sounds farther away. This uncertainty affects looking even when the listener eventually chooses the same word.",
        "children": []
      },
      {
        "text": "Among trials ending in **bear**, sounds closer to the boundary produce more looks toward **pear**. Among trials ending in pear, approaching the boundary increases looks toward bear. Each comparison holds the final answer constant while changing how ambiguous the input is.",
        "children": []
      },
      {
        "text": "Competitor looking rises after the spoken word begins and declines as the target gains enough support. More ambiguous inputs keep the alternative involved for longer. The final answer is categorical, but the strength and duration of competition depend on the remaining acoustic evidence.",
        "children": []
      },
      {
        "text": "The comparison does not merely contrast correct bear trials with correct pear trials. It asks whether two sounds both accepted as bear can nevertheless produce different looking toward pear. That difference is evidence that the recognition system retained information beyond the final shared label.",
        "children": []
      }
    ],
    "speech2-13": [
      {
        "text": "A listener’s own **category boundary** provides a reference for measuring ambiguity. Approaching that boundary increases looks toward the other member of the bear–pear pair. This happens even when all trials in the comparison end with the same selected word.",
        "children": []
      },
      {
        "text": "The analysis separates an **early interval, 300–1100 milliseconds**, from a **late interval, 1100–1900 milliseconds** after onset. Increased competitor looking near the boundary occurs in both. Uncertainty therefore affects more than a brief initial response.",
        "children": []
      },
      {
        "text": "A sound can support the eventual winner while continuing to support its rival. Using each listener’s boundary relates this continuing competition to the ambiguity that person experiences. The effect concerns differences within a final response category, rather than only the obvious difference between choosing bear and choosing pear.",
        "children": []
      }
    ],
    "speech2-14": [
      {
        "text": "In a **cascade**, changing acoustic features affect phonemes, and changing phoneme activity affects words. A sound eventually identified as /b/ can still vary in how strongly it supports voicing. That partial evidence can reach the word level while recognition continues.",
        "children": []
      },
      {
        "text": "**/b/ and /p/** are both **bilabial stops**. Bilabial means that the lips form the closure, and a stop includes a closure followed by release. Their shared properties support both candidates, while voicing helps distinguish them.",
        "children": []
      },
      {
        "text": "Greater support for /p/ can temporarily strengthen pear even when bear eventually wins. Looks toward pear can therefore increase without a change in the final word. **TRACE** represents this developing activity with feature, phoneme, and word units at possible times in the input, allowing candidates to gain support as the signal unfolds.",
        "children": []
      }
    ],
    "speech2-15": [
      {
        "text": "**Andruski and colleagues (1994)** tested whether an imperfect sound match can activate a word’s meaning. **Semantic priming** occurs when one item makes a meaning-related target easier to process. A priming benefit after an altered spoken form indicates that some information has reached the corresponding word and its meaning.",
        "children": []
      },
      {
        "text": "The nonword **beace** facilitated responding to **war** through partial activation of **peace**. Similarly, **ging** facilitated **queen** through **king**. The input did not have to be accepted as a correctly pronounced word for its partly matching lexical candidate to affect a related meaning.",
        "children": []
      },
      {
        "text": "Related word primes, including **bill before drug**, were compared with unrelated primes. Altering an initial sound could weaken the benefit rather than eliminating all access. The amount of sound overlap influenced the strength of lexical and semantic activation, instead of acting only as an all-or-none gate.",
        "children": []
      },
      {
        "text": "Beace resembles peace closely enough to provide partial support, even though its beginning is altered. War is related to the meaning of peace rather than to the altered input as a valid dictionary word. The priming relationship therefore reaches beyond phonetic similarity to the activated word’s semantic associations.",
        "children": []
      }
    ],
    "speech2-16": [
      {
        "text": "A **minimal pair** contains two words distinguished by one speech sound. As the input approaches the boundary between the pair, looking toward the competitor increases gradually. The effect remains when the final response is held constant, so it cannot be explained only by different words being selected.",
        "children": []
      },
      {
        "text": "A **cascaded account** allows the remaining acoustic uncertainty to influence possible words. More support for the competing phoneme supplies more support for its word. Recognition can therefore retain information about how close the sound was to the alternative category.",
        "children": []
      },
      {
        "text": "A strict **threshold-only account** passes the same finished phoneme for every token assigned to that category. Once the earlier differences have been removed, the word level has no varying input to produce the changing competitor looks. The problem is the loss of useful distinctions before lexical competition begins.",
        "children": []
      }
    ],
    "speech2-17": [
      {
        "text": "**Lexical feedback** occurs when an activated word sends support back to its component phonemes. An uncertain sound can partly activate a word, and the word can then strengthen the sound interpretation compatible with its full form. Word knowledge contributes while phoneme identification is still developing.",
        "children": []
      },
      {
        "text": "Influence is therefore possible in both directions. Acoustic evidence changes which words are active, while those words change the balance between possible phonemes. The higher level contributes information instead of simply waiting for a finished lower-level decision.",
        "children": []
      },
      {
        "text": "**Feedback differs from cascading**. Cascading passes incomplete evidence forward from features to phonemes and words. Feedback sends influence from words toward phonemes. An interactive account can include both, allowing developing representations to affect one another during recognition.",
        "children": []
      }
    ],
    "speech2-18": [
      {
        "text": "**Ganong (1980)** tested whether **word knowledge changes phoneme identification**. Participants heard a continuum whose endpoints formed a real word and a nonword. In **corpse–gorpse**, one interpretation of the initial consonant produces a familiar word, while the other does not.",
        "children": []
      },
      {
        "text": "The onset changed in **5-millisecond steps**, varying the acoustic evidence near the consonant boundary. The remaining sounds supplied information about whether each possible beginning would complete a word. The manipulation therefore combined uncertain phonetic evidence with a difference in lexical status.",
        "children": []
      },
      {
        "text": "If lexical knowledge affects identification, an ambiguous consonant should be more likely to receive the interpretation forming the real word. The question concerns the uncertain part of the input. Recognizing an unmistakable word endpoint would not establish the same influence on phoneme categorization.",
        "children": []
      }
    ],
    "speech2-19": [
      {
        "text": "A **late-correction account** leaves initial phoneme perception unchanged and adds a word preference when the listener reports an answer. In corpse–gorpse, the listener would favor saying corpse after the sound has already been categorized. Lexical knowledge affects the response rather than changing the earlier perceptual boundary.",
        "children": []
      },
      {
        "text": "This account predicts a **general reporting bias**. Favoring a real word should adjust responses across the continuum, rather than producing its main effect only where the sound is maximally ambiguous. The bias is added after the phoneme decision.",
        "children": []
      },
      {
        "text": "The **word–nonword, neutral, and nonword–word conditions** vary which consonant interpretation forms a word. A reporting adjustment can favor the lexical option in these conditions without relocating the perceptual boundary. That distinguishes the proposal from one in which word knowledge helps resolve uncertainty during identification itself.",
        "children": []
      }
    ],
    "speech2-20": [
      {
        "text": "A **boundary-shift account** proposes that word knowledge changes where the listener switches phoneme categories. Near an ambiguous onset, the interpretation forming a real word receives extra support. The effect changes categorization rather than merely correcting a report afterward.",
        "children": []
      },
      {
        "text": "The largest difference is expected **near the category boundary**. At clear endpoints, the acoustic evidence strongly favors one consonant. Near the boundary, neither interpretation has that advantage, leaving more room for lexical information to affect the choice.",
        "children": []
      },
      {
        "text": "Identification differences between lexical conditions should therefore be large in the uncertain region and small at the endpoints. A uniform reporting bias predicts a different distribution of effects. Where the lexical effect occurs is as important as whether listeners favor a word overall.",
        "children": []
      },
      {
        "text": "The word ending provides the same kind of lexical advantage at every continuum position, but the onset does not remain equally uncertain. Near an endpoint, strong acoustic evidence limits the effect of that knowledge. Near the boundary, competing phoneme interpretations leave more uncertainty for the lexical information to resolve.",
        "children": []
      }
    ],
    "speech2-21": [
      {
        "text": "**Ganong’s results** contain the largest lexical differences near the **phoneme boundary**. The curves shift according to which consonant interpretation forms a real word. Differences are smaller near clear endpoints, where acoustic evidence already strongly supports one category.",
        "children": []
      },
      {
        "text": "This pattern is compatible with word knowledge affecting phoneme labeling. It differs from adding an equal preference across the entire continuum. The lexical influence depends on how much uncertainty remains in the sound.",
        "children": []
      },
      {
        "text": "Ganong considered possible guessing strategies, while **interactive models** implement the effect through **lexical-to-phoneme feedback**. An activated word supports the phonemes that compose it. The whole-word representation can therefore affect how an ambiguous part is interpreted during recognition.",
        "children": []
      }
    ],
    "speech2-22": [
      {
        "text": "A **TRACE simulation of the Ganong effect** begins with a sound ambiguous between **/b/ and /p/**. The following input contains /l/, the vowel in plug, and a final /g/. Both initial phonemes can receive support before the rest of the word resolves the uncertainty.",
        "children": []
      },
      {
        "text": "Partial /b/ evidence activates possible **bl-** words, while /p/ evidence activates **pl-** words. Candidates gain support when new sounds fit them and lose support when the input conflicts. The word is processed as it arrives rather than only after its ending is complete.",
        "children": []
      },
      {
        "text": "**Plug, blood, and blush** can all receive some early support. The final **/g/** fits plug but not the endings of blood or blush. Plug becomes stronger as the alternatives weaken, and feedback from the winning word favors its compatible phonemes.",
        "children": []
      }
    ],
    "speech2-23": [
      {
        "text": "The word **plug** gains support as its sounds arrive, especially when the **final /g/** becomes available. **Blood and blush** fit some earlier information, but their endings do not match /g/. A candidate can therefore be plausible initially and lose support once the input continues.",
        "children": []
      },
      {
        "text": "Stronger activation of plug sends feedback to **/p/**. The beginning becomes less ambiguous because /p/ belongs to the word favored by the full sequence. Information near the end of the word can thus influence interpretation of an earlier sound.",
        "children": []
      },
      {
        "text": "This is **top-down processing** in TRACE. A representation of the whole word affects a representation of a component phoneme. The effect operates through interactions during recognition, rather than only as a final preference for reporting a familiar word.",
        "children": []
      }
    ],
    "speech2-24": [
      {
        "text": "**TRACE** adapts the **Interactive Activation model** of written-word recognition to speech. Compatible representations at different levels support one another, while alternatives compete. A candidate can influence other levels before it becomes the final response.",
        "children": []
      },
      {
        "text": "In written-word recognition, visual features support letters and letters support words such as **WORK, WORD, WEAR, and WORM**. Activated words also support compatible letters. Information about a whole word can therefore help resolve incomplete evidence about one of its components.",
        "children": []
      },
      {
        "text": "Spoken input unfolds over time. TRACE represents features, phonemes, and words at possible positions in that unfolding signal. A candidate can fit the beginning, gain activation, and then weaken when the ending conflicts. The model represents the changing evidence rather than treating recognition as one decision over a fully completed string.",
        "children": []
      }
    ],
    "speech2-25": [
      {
        "text": "**Categorical perception** combines relatively poor discrimination within a category with better discrimination across its boundary. Equally sized physical differences can therefore have different perceptual effects. A listener’s final labels divide a continuous acoustic range into distinct identities.",
        "children": []
      },
      {
        "text": "That categorical answer can coexist with **graded word competition**. Sounds assigned the same label still vary in how much they activate an alternative word. The word level retains information about uncertainty instead of receiving only an identical completed category for every token.",
        "children": []
      },
      {
        "text": "**Lexical knowledge can also affect phoneme categorization**. Partial information passes forward, and activated words can send support back. Speech recognition can therefore involve interaction among levels while uncertainty is being resolved, even though the task ultimately requires one word or phoneme as the answer.",
        "children": []
      }
    ],
    "speech2-26": [],
    "speech2-27": [
      {
        "text": "In **Allopenna and colleagues’ (1994) task**, listeners hear a word while viewing possible referents. For **beaker**, **beetle** shares the beginning and is called a **cohort competitor**. **Speaker** shares the ending and is a **rhyme competitor**, while **carriage** is unrelated.",
        "children": []
      },
      {
        "text": "The initial sounds support both beaker and beetle, so looks toward both increase early. Once the sounds distinguishing the words arrive, target looking continues to rise while beetle looking declines. The competitor loses support because the later input no longer matches.",
        "children": []
      },
      {
        "text": "Speaker overlaps at a later point, so its competition has a different time course. Eye movements record when each candidate attracts attention before the final choice. Correctly selecting beaker does not mean that beaker was the only word considered throughout recognition.",
        "children": []
      },
      {
        "text": "Cohort and rhyme overlap are not interchangeable. Beetle is supported while only the beginning has been heard, whereas speaker has a mismatching beginning and gains overlap later. The time at which evidence becomes available determines when each candidate can plausibly compete.",
        "children": []
      }
    ],
    "speech2-28": [
      {
        "text": "**Eye movements** provide a record of changing word competition. Looks toward the target and its cohort competitor rise early because both fit the beginning. Rhyme competition is later and smaller because the matching information occurs toward the end of the spoken word.",
        "children": []
      },
      {
        "text": "A **TRACE simulation** predicts changing activation for these same kinds of candidates. Early input can support more than one word, and later input can remove support from an initially plausible alternative. A rhyme competitor receives matching evidence at a different time from a cohort competitor.",
        "children": []
      },
      {
        "text": "The timing of fixations can therefore be compared with the timing of model activity. A correct final answer alone cannot distinguish candidates that were never active from candidates that became active and then lost. The developing pattern supplies information about how recognition reaches its final result.",
        "children": []
      }
    ],
    "sentence-01": [],
    "sentence-02": [
      {
        "text": "**“The horse raced past the barn fell”** is grammatical, but the beginning encourages an interpretation that does not fit the ending. A reader can initially take **raced** as the horse’s main action. That makes the words before fell seem to describe a complete event, leaving the final verb difficult to incorporate.",
        "children": []
      },
      {
        "text": "The intended meaning is **“The horse that was raced past the barn fell.”** The phrase raced past the barn identifies the horse. Fell then states what happened to it. Omitting “that was” leaves this modifying relationship less explicit.",
        "children": []
      },
      {
        "text": "Sentence comprehension depends on assigning relationships among words, not only recognizing their individual meanings. Here, one action belongs inside the description of the horse and the other is the main event. Difficulty arises when the early interpretation assigns those roles incorrectly.",
        "children": []
      },
      {
        "text": "The horse is the one that fell, not a second participant introduced by the last word. Raced belongs within the description of that horse. Keeping those relationships distinct supplies a complete interpretation without deleting either verb or treating the original sentence as an ungrammatical word list.",
        "children": []
      }
    ],
    "sentence-03": [
      {
        "text": "A **garden path effect** occurs when a plausible early interpretation leads the reader toward the wrong grammatical structure. In **“The horse raced past the barn fell,”** raced initially appears to be the main verb. Fell then conflicts with the structure already being built.",
        "children": []
      },
      {
        "text": "The sentence becomes understandable when raced past the barn is interpreted as meaning **“that was raced past the barn.”** That phrase modifies horse, leaving fell as the main verb. The reader must revise the earlier relationship rather than simply add the last word to it.",
        "children": []
      },
      {
        "text": "**Grammaticality and processing difficulty are different**. A sentence can have an acceptable structure while being difficult to interpret as it unfolds. The garden path concerns which analysis is selected first and how hard it is to replace, rather than whether a correct analysis exists.",
        "children": []
      }
    ],
    "sentence-04": [
      {
        "text": "A **parser** assigns grammatical structure while a person reads or listens. It determines which words form groups and how those groups relate. A **syntactic tree** represents these relationships, including which phrase modifies a noun and which verb states the main event.",
        "children": []
      },
      {
        "text": "A **noun phrase, or NP**, groups a noun with related words. A **verb phrase, or VP**, contains a verb and the material associated with it. A **prepositional phrase, or PP**, combines a preposition with its object. Grouping the words differently can change how the same sentence is understood.",
        "children": []
      },
      {
        "text": "Parsing operates with **limited time and memory**. Treating raced as the main verb initially requires less structure than treating raced past the barn as an embedded modifier. The latter analysis contains a clause inside the noun phrase while keeping fell available as the main verb. A processing account must explain how those alternatives are handled during comprehension.",
        "children": []
      }
    ],
    "sentence-05": [
      {
        "text": "**Minimal attachment** is a preference for building the smaller available syntactic structure first. The nodes in a syntactic tree represent grammatical groupings. Fewer nodes mean less structure to construct and maintain at that moment.",
        "children": []
      },
      {
        "text": "In the horse sentence, treating **raced as the main verb** produces the simpler initial analysis. The alternative makes raced past the barn a modifier inside the noun phrase. It requires an embedded relationship equivalent to “that was raced past the barn.”",
        "children": []
      },
      {
        "text": "Choosing the smaller structure can reduce the immediate processing demand, but it can also create a garden path. The final word fell requires the analysis that was not initially preferred. Difficulty then comes from replacing the earlier structure, even though the grammar permits the correct alternative.",
        "children": []
      }
    ],
    "sentence-06": [
      {
        "text": "**Late closure** is a tendency to attach new words to the phrase or clause currently being processed. In **“The burglar blew open the safe with the dynamite,”** the phrase with the dynamite is preferentially connected to blew open. It describes how the action was carried out.",
        "children": []
      },
      {
        "text": "This **verb-phrase attachment** makes the dynamite the instrument used to open the safe. An alternative **noun-phrase attachment** groups the safe with the dynamite together. In that version, the phrase describes or identifies the safe instead of describing the action.",
        "children": []
      },
      {
        "text": "Both attachments are grammatically available, but they express different relationships. A preference for attaching the phrase to the action makes one interpretation easier to reach initially. The words alone do not fix whether the dynamite belongs to the event as an instrument or to the object as a property.",
        "children": []
      }
    ],
    "sentence-07": [
      {
        "text": "In **“The burglar blew open the safe with the jewels,”** attaching with the jewels to the action would make jewels the instrument used to open the safe. That is an unlikely event. The intended interpretation instead identifies **the safe containing the jewels**.",
        "children": []
      },
      {
        "text": "Reaching that meaning requires **noun-phrase attachment**, connecting with the jewels to safe. The difficult part is not recognizing the word jewels. It is assigning the phrase to the object rather than to the action.",
        "children": []
      },
      {
        "text": "Longer reading times and changes in eye movements occur when the sensible meaning requires this unpreferred attachment. A reader can briefly adopt the action-related interpretation and then revise it. The eventual meaning is straightforward, but the route to it can still impose a processing cost.",
        "children": []
      }
    ],
    "sentence-08": [
      {
        "text": "An **autonomous parser** is proposed to select its earliest grammatical structure independently of meaning. Its initial choices follow abstract syntactic preferences. Semantic information can contribute afterward, but it does not choose the first analysis in this account.",
        "children": []
      },
      {
        "text": "**Minimal attachment** favors a smaller tree, and **late closure** favors attaching incoming material to the structure already being processed. These preferences limit how much structure must be maintained at once. The parser selects a likely route rather than fully building every possible alternative.",
        "children": []
      },
      {
        "text": "When the continuation does not fit, the selected structure must be revised. Garden-path difficulty is attributed to that revision. The account therefore separates an initial structure-based choice from a later adjustment when the developing meaning or grammar conflicts with it.",
        "children": []
      }
    ],
    "sentence-09": [
      {
        "text": "A **reduced relative clause** modifies a noun while omitting words such as “that was.” In **“Recent research reported by Ferreira and Clifton,”** reported describes research that someone reported. Research is not itself performing the reporting as the main action of the sentence.",
        "children": []
      },
      {
        "text": "**“Referential information provided by the discourse,” “results obtained with global reading times,”** and **“examples cited here”** have the same kind of modifier. Provided, obtained, and cited relate to their preceding nouns. These forms can be understood readily despite the complexity associated with reduced relatives.",
        "children": []
      },
      {
        "text": "**MacDonald, Perlmutter, and Seidenberg (1994)** argue that meaning and learned usage patterns contribute early to parsing. The formal structure alone does not determine difficulty. Particular words and their familiar relationships can support a reduced-relative interpretation without producing a strong garden path.",
        "children": []
      }
    ],
    "sentence-10": [
      {
        "text": "In **“a noun phrase followed by a morphologically ambiguous verb,”** followed modifies noun phrase. In **“the initial syntactic analysis assigned to a sentence,”** assigned modifies analysis. In each case, the verb form introduces information about a noun rather than automatically serving as a new main verb.",
        "children": []
      },
      {
        "text": "**“Differences located on the critical disambiguating phrase”** uses located in the same way. **“A person presented with the evidence examined by the lawyer”** contains two such relationships. Presented modifies person, while examined modifies evidence.",
        "children": []
      },
      {
        "text": "Understanding these expressions requires assigning each modifier to the appropriate noun. The constructions occur in readable scientific prose, including arguments for an autonomous parser. Their occurrence supports a distinction between having a formally complex structure and necessarily being difficult to understand in every context.",
        "children": []
      }
    ],
    "sentence-11": [
      {
        "text": "In **“Recent research reported by…”**, the meaning of research favors a reduced relative. Research is **inanimate**, so it is unlikely to be the entity doing the reporting. Interpreting it as something reported by another person fits the relationship among the words.",
        "children": []
      },
      {
        "text": "**Reported** also occurs often in reduced relatives, particularly with research in scientific writing. These **lexical statistics** are learned patterns associated with particular words. Familiar usage and plausible meaning both favor treating reported as a modifier.",
        "children": []
      },
      {
        "text": "**“The burglar arrested in the parking lot was charged today”** similarly makes the burglar a plausible person being arrested. **“The policeman arrested…”** also supports an agent who performs an arrest, creating more competition. The grammatical options remain similar, but the nouns’ likely roles change which analysis is easiest to select.",
        "children": []
      },
      {
        "text": "World knowledge and word-specific frequency provide different sources of support. Research is an unlikely reporter because of its meaning. Reported is also familiar in this modifying construction because of its usage. Both favor the same parse without being the same kind of information.",
        "children": []
      }
    ],
    "sentence-12": [
      {
        "text": "**Spivey and colleagues (1995)** asked people to follow spoken instructions while viewing objects. The one-apple display contained **a pencil, a box, an empty towel, and an apple on a towel**. Participants heard **“Put the apple on the towel in the box.”**",
        "children": []
      },
      {
        "text": "The phrase **on the towel** can initially sound like a destination, prompting a plan to put the apple on the empty towel. In the intended interpretation, it identifies where the apple already is. **In the box** supplies the actual destination.",
        "children": []
      },
      {
        "text": "Participants often looked toward the empty towel before turning toward the box. With **“Put the apple that’s on the towel in the box,”** the modifier is explicit and this temporary error is reduced. Eye movements reveal a competing interpretation considered before the final action is completed.",
        "children": []
      },
      {
        "text": "The two towels play different roles. One already supports the apple, while the empty towel is the competing destination. Confusing the current-location modifier with the destination changes the planned action, even though the listener recognizes all the object names correctly.",
        "children": []
      }
    ],
    "sentence-13": [
      {
        "text": "A **two-apple display** changes what information is needed to identify the intended object. One apple rests on a towel and another rests elsewhere. Saying the apple does not yet distinguish them, so **on the towel** can specify which apple should be moved.",
        "children": []
      },
      {
        "text": "In that setting, participants look toward the intended apple and then toward the box. They make fewer detours toward the empty towel. The ambiguous wording produces a sequence more like the explicit instruction containing “that’s on the towel.”",
        "children": []
      },
      {
        "text": "The phrase’s usefulness changes with the objects available. With two apples, a location modifier solves a real identification problem. Context can therefore affect the developing grammatical interpretation, even though the ambiguous sentence itself has not changed.",
        "children": []
      }
    ],
    "sentence-14": [
      {
        "text": "With **one apple**, the ambiguous instruction often produces looks toward the empty towel as a possible destination. With **two apples**, those looks are reduced. The same wording therefore creates different early interpretations depending on the visual context.",
        "children": []
      },
      {
        "text": "The **unambiguous instruction** produces relatively few destination errors in either setting. Its grammar already identifies the towel phrase as a modifier. The major ambiguity cost occurs when the display contains only one apple and extra identifying information is less useful.",
        "children": []
      },
      {
        "text": "When two apples are available, **on the towel** distinguishes the target before **in the box** gives its destination. This is an effect of **referential context**, meaning the set of objects a phrase could identify. It influences which relationship the listener assigns while the sentence is still being understood.",
        "children": []
      }
    ],
    "sentence-15": [
      {
        "text": "**Semantic context** concerns meaning, while **pragmatic context** concerns how an expression is used in a particular situation. If two apples are present, describing one as on the towel helps identify the intended object. The phrase has a useful modifying role in that situation.",
        "children": []
      },
      {
        "text": "With one apple, the object is already identifiable. The same phrase can then be taken temporarily as the destination of put. Changing the display changes the developing interpretation without changing the ambiguous instruction.",
        "children": []
      },
      {
        "text": "The difference occurs in eye movements before the final action. Context therefore affects processing early rather than merely correcting a completed interpretation afterward. An account that always selects the same initial structure independently of context has difficulty explaining this contrast.",
        "children": []
      }
    ],
    "sentence-16": [
      {
        "text": "A developing sentence interpretation can affect **arm movement** as well as eye movement. **Mouse tracking** records the path of an action while the instruction is being processed. A competing interpretation can pull the movement toward another destination before the participant reaches the correct target.",
        "children": []
      },
      {
        "text": "Ambiguous and unambiguous instructions produce more different trajectories in a **one-referent context**. Their trajectories are more similar when two referents are available. A referent is the object identified by the phrase, so the comparison concerns whether one or two apples could be intended.",
        "children": []
      },
      {
        "text": "The second apple makes the location phrase useful for identification and reduces interference from the destination interpretation. Comprehension and action planning can therefore interact while both are underway. A correct endpoint does not mean the competing interpretation had no influence on the movement.",
        "children": []
      }
    ],
    "sentence-17": [],
    "sentence-18": [
      {
        "text": "**The** is a **determiner**, a word that introduces a noun phrase. It creates an expectation for a noun or for words that modify a noun. It does not name the object by itself, but it limits which kinds of continuation can complete the phrase.",
        "children": []
      },
      {
        "text": "That expectation is grammatical rather than a prediction of one exact word. Many nouns could follow, and an adjective could occur before the noun. The category information helps the parser anticipate the form of the phrase while its specific meaning remains incomplete.",
        "children": []
      }
    ],
    "sentence-19": [
      {
        "text": "**Pizza** is a **noun** that names what the phrase refers to. It can be the **head of a noun phrase**, meaning the central word around which the rest of that phrase is organized. A determiner such as the combines with it to form the pizza.",
        "children": []
      },
      {
        "text": "The word supplies both category information and meaning. Its noun status determines how it can combine grammatically, while its meaning identifies a kind of food. Recognizing a word therefore makes more than its sound or spelling available to sentence processing.",
        "children": []
      }
    ],
    "sentence-20": [
      {
        "text": "**Was** is a past-tense form of **be**. It can act as an **auxiliary**, helping another verb express the sentence’s grammatical structure. Its arrival does not yet determine a single completed continuation.",
        "children": []
      },
      {
        "text": "A location phrase can follow, or a participle can contribute to a passive construction. The reader must retain the developing relationship while more words arrive. The same word can support several structures, so its grammatical role depends partly on the continuation.",
        "children": []
      }
    ],
    "sentence-21": [
      {
        "text": "**In** is a **preposition** that expresses a relationship such as location. It begins a prepositional phrase rather than naming the location on its own. More material is required to identify what the relation connects to.",
        "children": []
      },
      {
        "text": "A following noun phrase can supply that location or container. The parser therefore uses in to establish a grammatical expectation. Understanding the phrase requires combining the preposition with the words that complete its relationship.",
        "children": []
      }
    ],
    "sentence-22": [
      {
        "text": "**The** introduces a noun phrase within the developing prepositional phrase. It does not itself supply the location expected after in. A noun, potentially preceded by modifiers, is still needed to complete that part of the structure.",
        "children": []
      },
      {
        "text": "The expectation concerns a **word category**, not simply a sensible topic. A continuation must function grammatically as the required phrase. Knowing that the sentence concerns pizza does not remove the need for the next words to fit that structure.",
        "children": []
      }
    ],
    "sentence-23": [
      {
        "text": "**Eaten** is the **participial form of eat**. It is not the noun expected to complete the intended phrase **“in the eaten.”** Its category conflicts with the developing structure, producing a **word-category violation**.",
        "children": []
      },
      {
        "text": "The problem differs from an unusual but grammatical meaning. The words cannot be combined in the intended construction simply by imagining an uncommon event. The mismatch concerns the grammatical type of the arriving word and the type required at that position.",
        "children": []
      }
    ],
    "sentence-24": [
      {
        "text": "The **early left anterior negativity**, or **ELAN**, is an **event-related potential** associated with word-class violations. An event-related potential is a measured brain response aligned to an event such as a word’s onset. This response occurs roughly **100–200 milliseconds** after the critical word, with a left/anterior distribution.",
        "children": []
      },
      {
        "text": "In **“The pizza was in the eaten,”** a participle appears where the intended phrase expects a noun. In **“The scientist criticized Max’s of proof the theorem,”** the preposition of appears where it does not fit the developing noun phrase. Both involve a mismatch in grammatical category.",
        "children": []
      },
      {
        "text": "The early response motivated an account involving rapid syntactic analysis. The critical distinction is between a word of an unexpected grammatical type and a correctly positioned word with an implausible meaning. The measurement concerns a response very soon after the relevant form becomes available.",
        "children": []
      }
    ],
    "sentence-25": [
      {
        "text": "For **visually presented words**, an early category-related response was localized to **visual cortex**, which processes what is seen. **Dikker and colleagues (2010)** proposed that grammatical expectations also generate predictions about the physical forms of upcoming words. An early response can therefore depend on visible form cues.",
        "children": []
      },
      {
        "text": "**“The beautiful princess”** and **“The beautifully princess”** differ in an ending that changes the expected continuation. The form beautifully supports a different grammatical relationship from beautiful. The arriving noun can conflict with that expectation before the complete sentence is interpreted.",
        "children": []
      },
      {
        "text": "**Form typicality** describes how characteristic a word’s form is of a category. A predicted category can therefore imply likely visual properties. An early category-sensitive response in a reading task is not necessarily produced only by a separate mechanism operating on abstract syntax.",
        "children": []
      },
      {
        "text": "The predicted form does not have to identify one exact upcoming word. A category can favor a set of likely forms. When the arriving word has properties incompatible with that expectation, the visual system can respond to the mismatch very early in processing.",
        "children": []
      }
    ],
    "sentence-26": [
      {
        "text": "**Perches** can function as a noun or a verb. In **“the bird perches seem easy to install,”** it names supports for birds. In **“the bird perches comfortably in the cage,”** it describes what the bird does. The continuation resolves how the same word must be interpreted.",
        "children": []
      },
      {
        "text": "**Needs** is similarly ambiguous. **“The student needs were not being met”** uses needs as a noun naming requirements. **“The student needs to be more focused”** uses it as a verb. Recognizing the word form alone does not settle its grammatical role.",
        "children": []
      },
      {
        "text": "**Phonological form typicality** concerns how much a word’s sound pattern resembles other nouns or verbs. An analysis of **3,158 words** compared those similarities. A form can resemble one category statistically while being used as another in a particular sentence.",
        "children": []
      }
    ],
    "sentence-27": [
      {
        "text": "**Perches is relatively noun-like, while needs is relatively verb-like** in their form-based patterns. These are learned statistical tendencies rather than rules restricting grammatical use. Both forms remain available as nouns and verbs.",
        "children": []
      },
      {
        "text": "**“The bird perches seem easy to install”** uses the noun-like form as a noun. **“The bird perches comfortably in the cage”** requires a verb. The same form can therefore agree with its usual category pattern in one sentence and conflict with it in another.",
        "children": []
      },
      {
        "text": "The pattern reverses for needs. **“The student needs were not being met”** requires a noun, while **“The student needs to be more focused”** requires a verb. Comparing these sentences separates what the form tends to suggest from what the grammatical continuation actually requires.",
        "children": []
      }
    ],
    "sentence-28": [
      {
        "text": "Reading becomes slower when a word’s required category conflicts with its **form typicality**. A noun-like form such as **perches** is harder to resolve as a verb. A verb-like form is harder to resolve as a noun. The cost depends on the relationship between the form’s tendency and its use in the sentence.",
        "children": []
      },
      {
        "text": "The analysis compares length-adjusted reading time at the **point of ambiguity** with time at **disambiguation**. Disambiguation is where the continuation makes the intended category clear. Extra time there indicates difficulty resolving the word’s grammatical role.",
        "children": []
      },
      {
        "text": "The ambiguous form itself can remain unchanged while the continuation determines a different use. Greater cost for the mismatching continuation connects parsing to learned form statistics. Grammatical interpretation uses information associated with word forms as well as the structure eventually required.",
        "children": []
      }
    ],
    "sentence-29": [
      {
        "text": "The early **ELAN** response depends partly on how much a word’s form reveals about its category. It occurs for nouns with informative **morphological marking**, meaning meaningful word parts, and for forms strongly associated with nouns. A neutral form such as **infant** does not produce the same early pattern.",
        "children": []
      },
      {
        "text": "The comparisons include **beautiful princess versus beautifully princess**, **tasteless soda versus tastelessly soda**, and **cute infant versus cutely infant**. Princess provides informative morphology, soda has a statistically noun-like form, and infant supplies weaker form-based category evidence.",
        "children": []
      },
      {
        "text": "The abstract category mismatch is therefore not sufficient to determine this earliest visual response. An expected grammatical category can generate predictions about word form. The response depends partly on whether the word that arrives contains physical evidence conflicting with that prediction.",
        "children": []
      }
    ],
    "sentence-30": [
      {
        "text": "**“Colorless green ideas sleep furiously”** has an acceptable grammatical organization but an implausible combined meaning. **Syntax and semantics are partly independent** because words can fit a structure without forming a sensible event. Grammatical organization is not simply the same property as plausibility.",
        "children": []
      },
      {
        "text": "**“The horse raced past the barn fell”** becomes difficult when an early structural preference cannot accommodate the final verb. Such preferences can reduce memory demands while leaving some sentences vulnerable to revision. In the apple instruction, however, the available objects affect early interpretation of the ambiguous phrase.",
        "children": []
      },
      {
        "text": "Word forms also carry learned category information. **“The bird perches were comfortable”** uses a noun-like form as a noun, while other continuations require a different use. Early category-related brain responses depend partly on such form-based expectations. Parsing therefore involves grammatical relationships together with meaning, context, and learned regularities in the available input.",
        "children": []
      }
    ],
    "sentence-31": [],
    "aphasias-01": [],
    "aphasias-02": [
      {
        "text": "**Aphasia** is impaired language function following brain damage. In the **1870s, Lichtheim and Wernicke** proposed that different symptoms could arise from damage to different processing centers or their connections. A task could fail because a representation was damaged or because information could no longer travel along a required route.",
        "children": []
      },
      {
        "text": "In **Lichtheim’s House**, **A** contains sound images, **M** contains speech-movement images, and **B** represents concepts. Acoustic input enters through a, while output from M travels through m toward articulation. Understanding requires a connection from the sound representation to concepts. Repetition requires sound information to reach the movement representation.",
        "children": []
      },
      {
        "text": "The numbered sites distinguish these possible disruptions. **1 and 2** affect M and A, while **3, 4, and 6** interrupt connections among the centers. **5 and 7** interrupt motor output and acoustic input. The proposal explains different task failures through different combinations of representations and pathways.",
        "children": []
      }
    ],
    "aphasias-03": [
      {
        "text": "The **Geschwind–Wernicke model** links language functions to brain regions and connecting pathways. **Norman Geschwind revived this approach in the 1970s**. Broca’s area lies toward the front in the frontal region, while Wernicke’s area lies farther back in the temporal region. The **arcuate fasciculus** is a fiber pathway connecting them.",
        "children": []
      },
      {
        "text": "The **central sulcus**, or **fissure of Rolando**, and **lateral sulcus**, or **fissure of Sylvius**, are major brain grooves used as anatomical landmarks. The lateral sulcus helps distinguish the temporal region from regions above it. These locations provide a way to relate damaged tissue to observed language problems.",
        "children": []
      },
      {
        "text": "A **dissociation** occurs when one ability is impaired while another is relatively preserved. A **double dissociation** includes a reverse pattern in another patient. Distinguishing syntax, word knowledge, and meaning makes those comparisons more specific than simply classifying language as present or absent.",
        "children": []
      }
    ],
    "aphasias-04": [
      {
        "text": "In **Fromkin’s (1997)** description, **Broca’s aphasia** includes effortful word finding, missing grammatical material, and disrupted word order. **Grammatical morphemes** are small words or word parts expressing grammatical relationships. Content words can remain available even when the material connecting them into sentences is reduced.",
        "children": []
      },
      {
        "text": "Everyday comprehension can appear fairly good while controlled tests reveal difficulty. **Agrammatism** refers to problems producing or interpreting grammatical structure, but it does not correspond perfectly to a Broca-area lesion or diagnosis. Some patients with such lesions are not agrammatic, and some agrammatic patients do not fit that neurological classification.",
        "children": []
      },
      {
        "text": "**Wernicke’s aphasia** often involves fluent speech with relatively good pronunciation and intonation. Word selection and comprehension are impaired. Substitutions may be related or unrelated in meaning, and **neologisms** are invented word forms. Fluency describes the delivery of speech, not whether its words communicate a coherent message.",
        "children": []
      }
    ],
    "aphasias-05": [
      {
        "text": "**Wernicke’s aphasia** can involve fluent **“word salad” or “Jabberwocky.”** A patient describing a visual problem said **“My wires don’t hire right.”** The expression has a sentence-like arrangement, but the selected words fail to communicate the intended problem with vision.",
        "children": []
      },
      {
        "text": "Other responses continue with grammatical-sounding phrases that do not form a clear message. **“I felt worse because I can no longer keep in mind from the mind of the minds…”** retains fluency without a coherent explanation. Invented forms such as **“demaploze” and “tubaboys”** are neologisms. Calling a fork “a need for a schedule” similarly fails to identify the object despite producing familiar words.",
        "children": []
      },
      {
        "text": "**Broca’s aphasia** can instead produce **telegraphic speech**. A hospital account retains words about Dad, the hospital, doctors, appointments, and teeth, but pauses and missing grammatical connections make the event hard to express. The surviving content words convey parts of the experience even though sentence production is restricted.",
        "children": []
      }
    ],
    "aphasias-06": [
      {
        "text": "A traditional account assigns **lexical activation or inhibition problems** to Wernicke’s aphasia and **grammatical problems** to Broca’s aphasia. The **lexicon** contains stored word knowledge. Activation makes a candidate available, while inhibition reduces competing words that should not be selected.",
        "children": []
      },
      {
        "text": "Broca’s original patient **Leborgne**, known as **Tan**, could produce essentially one syllable while appearing to retain comprehension and other abilities. This extremely restricted output differs from the partly informative, agrammatic speech associated with the broader later syndrome.",
        "children": []
      },
      {
        "text": "**Apraxia of speech** is a problem organizing the movements needed to speak. That could account for restricted output without requiring the same loss of grammatical knowledge. The amount a person says is therefore insufficient to distinguish a problem selecting or arranging language from a problem planning its articulation.",
        "children": []
      }
    ],
    "aphasias-07": [
      {
        "text": "A distinction between **grammar and the lexicon** separates rules for combining words from stored word knowledge. Grammar allows a sentence to be understood even when that complete sentence has never been encountered. Its structure can be constructed rather than retrieved as one memorized unit.",
        "children": []
      },
      {
        "text": "**“Colorless green ideas sleep furiously”** has a grammatical organization despite its implausible meaning. **“Furiously sleep ideas green colorless”** contains the same words in an unacceptable order. Familiarity with the words alone does not explain the difference between the two sequences.",
        "children": []
      },
      {
        "text": "The traditional aphasia account links Wernicke’s aphasia to disrupted lexical processing and Broca’s aphasia to disrupted grammar. This proposes distinct impaired operations rather than simply different levels of fluency. It predicts that patients will differ in what they can do with words and grammatical relationships across controlled tasks.",
        "children": []
      }
    ],
    "aphasias-08": [
      {
        "text": "The **message level** organizes the event, concepts, referents, and perspective that a speaker intends to communicate. A **referent** is the person, object, or event being discussed. These intentions must be connected with words and arranged into a form that can be spoken.",
        "children": []
      },
      {
        "text": "At the **functional level**, lexical meanings and semantic roles are selected. **Lemmas** connect concepts with lexical items. At the **positional level**, forms are ordered and grammatical operations add the required structure and affixes. **Phonological encoding** supplies the sounds, and speech gestures organize their production.",
        "children": []
      },
      {
        "text": "Problems can arise at any of these operations rather than only at a single language center. **HOUSEBOAT and DOGHOUSE** involve meaningful combinations of forms. The error **“easy enoughly”** supplies evidence for an operation adding morphology, rather than selection of an already stored whole word. A production account must distinguish choosing a message from constructing its linguistic form.",
        "children": []
      },
      {
        "text": "A lemma’s connection with its referent is generally arbitrary, meaning that the concept does not determine the word’s form by resemblance alone. Positional operations have a different role. They combine and arrange forms according to grammatical patterns, including meaningful combinations whose parts already have established lexical representations.",
        "children": []
      }
    ],
    "aphasias-09": [
      {
        "text": "An **autonomous parsing account** treats early grammatical structure as separate from meaning. In conversation, familiar events and surrounding context can support comprehension even when a listener struggles to compute every grammatical relationship. Successful everyday communication therefore does not test syntax in isolation.",
        "children": []
      },
      {
        "text": "In **“The burglar blew open the safe with the dynamite,”** the final phrase can attach to the action or describe the safe. The words and their individual meanings stay the same. The attachment determines the relationship expressed.",
        "children": []
      },
      {
        "text": "Testing a **specific parsing deficit** requires sentences in which grammatical relationships cannot be replaced by guessing the most familiar event. A listener must identify which words belong together and who plays each role. That demand is more specific than understanding a conversation in which many cues point toward the same message.",
        "children": []
      }
    ],
    "aphasias-10": [
      {
        "text": "Broca distinguished the ability to produce **articulate speech** from the ability to comprehend language. A person might understand what others say but struggle to produce intelligible speech. Poor output alone does not establish an equivalent loss of comprehension.",
        "children": []
      },
      {
        "text": "A **syntactic impairment** concerns the organization of grammatical relationships. Unlike a problem only with speech movements, it could affect both production and sentence understanding. Comprehension can therefore be tested without requiring the patient to produce a complete spoken answer.",
        "children": []
      },
      {
        "text": "This separates available knowledge from the ability to express it. Restricted speech might reflect an articulation problem while leaving more grammatical knowledge intact than the output suggests. A sentence-interpretation task provides evidence about that knowledge through a different response.",
        "children": []
      }
    ],
    "aphasias-11": [
      {
        "text": "**Broca’s aphasia** is usually accompanied by some motor dysfunction. Speaking can become effortful, encouraging the use of informative content words with less grammatical material. Such speech may reflect an attempt to communicate under difficult conditions rather than directly expressing the full extent of retained grammar.",
        "children": []
      },
      {
        "text": "**Competence** refers to linguistic knowledge, while **performance** concerns using that knowledge in a task. Chomsky’s distinction allows poor performance to coexist with knowledge that cannot be expressed effectively. Hughlings Jackson likewise emphasized what a patient manages despite impairment.",
        "children": []
      },
      {
        "text": "**Caramazza and Zurif (1976)** investigated comprehension to test whether the difficulty extended beyond articulation. Their task required interpreting grammatical relationships without producing a full sentence. Difficulty under those conditions would concern more than the physical effort of speaking.",
        "children": []
      }
    ],
    "aphasias-12": [
      {
        "text": "Ordinary conversation provides **redundant cues** to meaning. In **“The dog bit the man,”** knowledge of dogs and biting favors the dog as the actor. English **subject–verb–object order** supports the same interpretation, so meaning and word order point in the same direction.",
        "children": []
      },
      {
        "text": "A **heuristic** is a shortcut based on a regular pattern. A listener might select the most plausible actor or assume that the first noun performs the action. These strategies can support an answer without requiring every grammatical relationship to be analyzed.",
        "children": []
      },
      {
        "text": "In **“The dog that the man is biting is angry,”** the man performs the biting even though dog occurs first. The embedded clause and the main clause assign different roles. Correct interpretation requires tracking those relationships because familiar-event knowledge and a first-noun strategy favor the wrong answer.",
        "children": []
      }
    ],
    "aphasias-13": [
      {
        "text": "**Caramazza and Zurif** compared ordinary control sentences with **center-embedded sentences**, which contain a clause inside another clause. A control such as **“The girl is kicking a green ball”** aligns familiar event knowledge with ordinary word order. The actor is easy to identify through several available cues.",
        "children": []
      },
      {
        "text": "In **semantically constrained** items, an embedded clause still contains a highly plausible actor. **“The apple that the boy is eating is red”** makes the boy the likely eater. Meaning can support the grammatical relationship even when the structure is more complex.",
        "children": []
      },
      {
        "text": "**Reversible** items, such as **“The horse that the bear is kicking is brown,”** allow either participant to act plausibly. **Improbable** items, such as **“The bird that the worm is eating is blue,”** make ordinary expectations favor the wrong relationship. Grammar must identify who acts on whom when plausibility either fails to distinguish them or actively misleads.",
        "children": []
      },
      {
        "text": "The embedded items place the actor inside the modifying clause rather than making the first noun perform its action. In the apple sentence, the boy eats the apple. In the worm sentence, the worm eats the bird. The grammatical relationship stays comparable while plausibility changes dramatically.",
        "children": []
      }
    ],
    "aphasias-14": [
      {
        "text": "In **sentence–picture matching**, a participant hears a sentence and selects the picture expressing its meaning. The conditions differ in whether familiar event knowledge helps identify the actor. Accuracy measures whether the listener recovered the correct relationship, without requiring a spoken explanation.",
        "children": []
      },
      {
        "text": "**Healthy controls** perform similarly well across the conditions. **Wernicke’s patients** perform poorly overall. **Broca’s patients** do better when plausible event roles support the sentence and worse when the relationship must be recovered without that support.",
        "children": []
      },
      {
        "text": "**Caramazza and Zurif** interpreted the Broca pattern as a **syntactic comprehension impairment**. The deficit appeared in understanding, not just producing speech. Its dependence on the sentence conditions suggested particular difficulty assigning grammatical roles when ordinary expectations could not supply the answer.",
        "children": []
      }
    ],
    "aphasias-15": [
      {
        "text": "Distinguishing **grammar from the lexicon** makes an impairment claim more precise. Grammar concerns relationships among words, while lexical processing concerns stored words and access to the appropriate entries. Problems with either operation can disrupt communication, but they predict different behavior.",
        "children": []
      },
      {
        "text": "A person might know the meanings of content words while assigning them the wrong roles in a complex sentence. Another person might produce a fluent grammatical frame containing words that fail to express the intended message. A single measure of overall fluency would conceal those differences.",
        "children": []
      },
      {
        "text": "A **structure–function hypothesis** links a particular operation to the system supporting it. Controlled tasks test whether the predicted operation is impaired. Explaining the pattern across those tasks requires more detail than describing someone as fluent, nonfluent, or generally poor at comprehension.",
        "children": []
      }
    ],
    "aphasias-16": [
      {
        "text": "In **Dick and colleagues’ task**, listeners identify **which animal performs the action**. The event is a dog biting a cat, but the sentence structure changes. Knowing the animal names is insufficient because the answer depends on assigning their roles.",
        "children": []
      },
      {
        "text": "**“The dog is biting the cat”** is active, and **“It’s the dog that is biting the cat”** is a subject cleft. Both place the actor first. A strategy of treating the first animal as the actor gives the correct answer in these conditions.",
        "children": []
      },
      {
        "text": "**“It’s the cat that the dog is biting”** is an object cleft, and **“The cat is bitten by the dog”** is passive. Both begin with the animal receiving the action. Correctly selecting the dog now requires the grammatical relationship rather than a first-noun shortcut.",
        "children": []
      }
    ],
    "aphasias-17": [
      {
        "text": "**Healthy aging controls** identify the actor accurately across active sentences, subject clefts, object clefts, and passives. Aphasia groups differ in both their overall accuracy and the additional cost of harder structures. They do not produce one uniform pattern of impaired comprehension.",
        "children": []
      },
      {
        "text": "**Anomic aphasia**, associated with word-finding difficulty, has relatively better performance, although harder structures still reduce accuracy. **Broca’s and conduction aphasia** involve a marked decline for object clefts and poorer performance for passives. **Wernicke’s patients** have low accuracy across all four forms.",
        "children": []
      },
      {
        "text": "Broca’s patients are especially vulnerable to **noncanonical structures**, which depart from the usual actor-first arrangement. Their active-sentence accuracy is also below the healthy level. The pattern combines a broader performance reduction with a disproportionate difficulty assigning roles in the less usual structures.",
        "children": []
      }
    ],
    "aphasias-18": [
      {
        "text": "Comprehension also becomes less accurate in **healthy undergraduates** when processing is stressed. Manipulations include compressed speech, noise, **low-pass filtering**, and remembering digit lists while interpreting sentences. Low-pass filtering removes higher-frequency information, while a concurrent memory task uses resources during comprehension.",
        "children": []
      },
      {
        "text": "**Object clefts and passives** are particularly vulnerable under these conditions. Active sentences and subject clefts remain relatively easier. Combining manipulations, such as filtering and compression, produces greater losses than ordinary listening.",
        "children": []
      },
      {
        "text": "These participants have no aphasic injury, but difficult conditions produce a pattern resembling some aphasia findings. A disproportionate cost for complex grammar can therefore reflect **performance demands**, not only loss of a grammatical rule. The comparison concerns how effectively a system can use its knowledge when processing becomes difficult.",
        "children": []
      }
    ],
    "aphasias-19": [
      {
        "text": "**Saygin and colleagues (2004)** asked participants to match **actions with objects**. A nonverbal version conveyed an action such as licking without spoken language and required choosing a fitting object, such as an ice cream. A linguistic version supplied language-based information for the same general decision.",
        "children": []
      },
      {
        "text": "Aphasic participants were less accurate than controls in both versions. The difficulty was therefore not confined to understanding grammatical sentences. The nonverbal task still required identifying the relevant action meaning and connecting it to an appropriate object.",
        "children": []
      },
      {
        "text": "**Semantically related distractors** caused more difficulty than unrelated choices. An object related in meaning competed more strongly with the correct match. Selecting the intended meaning could therefore be disrupted even when no linguistic sentence had to be interpreted.",
        "children": []
      },
      {
        "text": "The nonverbal comparison removes a linguistic expression without removing meaning from the task. The patient still has to identify what the action calls for and select the corresponding object. Similar difficulty in that condition therefore concerns a demand shared with language rather than grammar alone.",
        "children": []
      }
    ],
    "aphasias-20": [
      {
        "text": "Poorer **nonverbal action matching** was significantly associated with **damage to Broca’s area**. Participants interpreted a pantomimed action and chose an appropriate object. They did not have to produce a sentence or extract the grammar of spoken instructions to identify the action.",
        "children": []
      },
      {
        "text": "This relationship extends the affected behavior beyond grammatical processing. A patient can have difficulty connecting an action with its meaning even when language is removed from the input. The nonverbal task still requires successful comprehension and selection.",
        "children": []
      },
      {
        "text": "The result challenges a description of every Broca-related difficulty as exclusively syntactic. The task establishes which operation is required, while the lesion analysis relates failure to damaged tissue. A proposed explanation must account for both the grammatical findings and the nonlinguistic action difficulty.",
        "children": []
      }
    ],
    "aphasias-21": [
      {
        "text": "**Saygin and colleagues** compared matching **environmental sounds to pictures** with matching spoken descriptions. A cow’s moo supplies nonverbal auditory information, while **“cow mooing”** supplies words. Both versions require selecting the appropriate picture from alternatives.",
        "children": []
      },
      {
        "text": "**Wernicke’s patients** were particularly impaired, with accuracy around **90% in both versions**. Their verbal and nonverbal performance did not differ significantly. Controls, right-hemisphere-damage patients, and the other aphasia groups performed more accurately in these comparisons.",
        "children": []
      },
      {
        "text": "The impairment therefore extended beyond recognizing spoken word forms. Connecting an environmental sound with the event or object it represents was also difficult. Meaning-related alternatives could compete with the target regardless of whether the auditory information consisted of language or an ordinary sound.",
        "children": []
      }
    ],
    "aphasias-22": [
      {
        "text": "Impaired **verbal and nonverbal sound–picture matching** was associated with damage involving **Wernicke’s area**. Lesion overlap occurred in posterior language-related regions for patients impaired on either task. The input differed, but both tasks required connecting auditory information with meaning.",
        "children": []
      },
      {
        "text": "A spoken description conveys that information through words. An environmental sound, such as an animal call, conveys it without a linguistic expression. Difficulty in both conditions cannot be described only as a failure to identify word forms.",
        "children": []
      },
      {
        "text": "The common demand is recovering what meaningful auditory input represents and selecting the matching object or event. Relating that performance to lesion location extends the anatomical account beyond a simple language-versus-nonlanguage division. The result concerns an association between damaged regions and measured comprehension difficulty.",
        "children": []
      }
    ],
    "aphasias-23": [
      {
        "text": "The **language specificity of aphasia** remains disputed. Some patients are especially vulnerable to particular grammatical structures. Others also struggle with action meanings or environmental sounds in tasks that do not require language. An explanation must accommodate both kinds of finding.",
        "children": []
      },
      {
        "text": "**Controlled behavioral tests** separate demands such as selecting a word, assigning grammatical roles, matching an action, and identifying an auditory event. Measuring those tasks makes it possible to describe what is impaired more precisely than a general comprehension score permits.",
        "children": []
      },
      {
        "text": "**Lesion analyses** relate the resulting patterns to damaged tissue. A structure–function explanation must connect the task’s required operation with the observed performance and lesion distribution. Fluency and diagnostic labels describe broad behavior, but they do not by themselves establish which underlying operations are language-specific.",
        "children": []
      }
    ],
    "aphasias-24": [],
    "aphasias-25": [
      {
        "text": "**Voxel-based lesion–symptom mapping** relates the location of brain damage to behavioral impairment across patients. A **voxel** is a small three-dimensional unit of an MRI image. Comparing damaged and spared locations against symptom measures identifies regions associated with reduced performance.",
        "children": []
      },
      {
        "text": "**Fluency deficits** have stronger associations with anterior, or front, regions. **Comprehension deficits** have stronger associations with posterior, or back, regions. These measures concern broad speaking and understanding abilities rather than direct tests of one grammatical operation.",
        "children": []
      },
      {
        "text": "The distributions support a rough **double dissociation** between production-related and comprehension-related difficulties. Different patterns of damage have different behavioral associations. Mapping across patients provides a quantitative relationship between tissue location and symptoms rather than relying only on a single case description.",
        "children": []
      }
    ],
    "development1-01": [],
    "development1-02": [
      {
        "text": "The **nature-and-nurture question** concerns how built-in capacities and experience contribute to language acquisition. **Nativist positions** developed from **Chomsky’s critique of Skinner**. Skinner relied on general learning mechanisms such as reward and punishment, while Chomsky argued that these mechanisms could not explain the grammar children acquire.",
        "children": []
      },
      {
        "text": "For Chomsky, language’s important property is **generativity**. People understand and produce new sentences they have never heard. Acquiring a language therefore means identifying the **abstract grammar that produces its sentences**, rather than memorizing a collection of earlier utterances.",
        "children": []
      },
      {
        "text": "Grammatical and ungrammatical sentences are not **similar in any straightforward way**. A small change can make a sentence unacceptable, while two acceptable sentences can look very different. Grouping expressions by surface resemblance cannot simply separate everything permitted by the grammar from everything excluded.",
        "children": []
      },
      {
        "text": "**Operant conditioning** changes behavior through rewards and punishments. Children are not consistently rewarded for grammatical sentences and punished for ungrammatical ones, so those required contingencies do not reliably occur. Nativist accounts instead propose **Universal Grammar** and language-specific acquisition processes. Innate constraints limit the grammars considered, while a specially equipped **“data-handling” or “hypothesis-formulating” ability** helps identify the surrounding language.",
        "children": []
      },
      {
        "text": "An abstract grammar captures relationships that extend beyond the particular sentences a child has heard. Generativity creates the learning problem because memorized utterances cannot supply every novel sentence. The proposed innate constraints concern the kinds of grammar considered, while experience still determines which language the child acquires.",
        "children": []
      }
    ],
    "development1-03": [
      {
        "text": "Early accounts treated **categorical perception** as both **language-specific and species-specific**. The claim was that its organization reflected a specialized human-language ability. Language-specific means restricted to language, while species-specific means restricted to one species.",
        "children": []
      },
      {
        "text": "In a synthetic consonant continuum, formant transitions change by equal amounts while listeners assign **/b/, /d/, and /g/** labels in relatively distinct regions. Acoustic distance changes continuously, but perceived identity switches more sharply. The categories organize how the physical differences are experienced.",
        "children": []
      },
      {
        "text": "**Discrimination is better near category boundaries** than within a category. This pattern appears with one-step, two-step, and three-step comparisons. Physical separation matters, but an equal separation can also be easier to hear when it crosses a phoneme boundary.",
        "children": []
      }
    ],
    "development1-04": [
      {
        "text": "The **conditioned head turn procedure** tests whether an infant detects a sound change. The infant learns to turn toward a sound associated with a rewarding visual event. An observable orienting response replaces the spoken judgment that an adult could give.",
        "children": []
      },
      {
        "text": "**High-amplitude sucking** uses a different behavior. Sucking often declines as the same sound is repeated. If a changed sound renews sucking, the change has affected behavior and provides evidence that the infant distinguished the input.",
        "children": []
      },
      {
        "text": "Neither response requires naming or producing the sounds. The experimenter controls the acoustic comparison and measures whether the infant reacts differently. These methods make speech discrimination available for study before the child can perform a verbal identification task.",
        "children": []
      }
    ],
    "development1-05": [
      {
        "text": "**Eimas and colleagues (1971)** tested infants with synthetic syllables differing in **voice onset time**, or VOT. VOT describes when vocal-fold vibration begins relative to the stop release. Sucking declined during repetition, after which a controlled change tested whether responding recovered.",
        "children": []
      },
      {
        "text": "In **20D**, VOT changed from **+20 to +40 milliseconds**, crossing an adult phoneme boundary. Sucking increased. In **20S**, an equally large change stayed within a category, either **−20 to 0** or **+60 to +80 milliseconds**, and produced much less recovery.",
        "children": []
      },
      {
        "text": "The **0 condition** kept the sound unchanged, and sucking continued to decline. The equal 20-millisecond differences in the changed conditions are essential to the comparison. Their different effects indicate sensitivity to the category relationship rather than only the amount of physical change, before infants can provide phoneme labels.",
        "children": []
      }
    ],
    "development1-06": [
      {
        "text": "**Categorical perception** was proposed as a way to convert variable sound into a **symbolic representation**. A symbolic unit preserves a recognizable identity despite acoustic changes. Finding such organization in very young infants contributed to an interpretation based on an innate speech-processing ability.",
        "children": []
      },
      {
        "text": "At roughly **four months**, infants are still developing basic motor and visual abilities. They are beginning to manipulate objects with both hands and support their head and chest while prone. Vocal production is also limited, with more vowel-like sounds only beginning to replace earlier vocalizations.",
        "children": []
      },
      {
        "text": "Category-related perception therefore occurs well before mature speech production. That timing motivated the claim that perception is specially prepared for language. The comparison concerns the early availability of organized responses to speech, rather than an ability to articulate the same sounds accurately.",
        "children": []
      },
      {
        "text": "Color vision and general visual acuity are also still developing at this age. The contrast with these broad developmental changes contributed to the interpretation of speech categorization as an unusually early ability. Early timing motivated the innateness claim without itself specifying every mechanism producing the response.",
        "children": []
      }
    ],
    "development1-07": [
      {
        "text": "**Perceptual narrowing** is a reduction in sensitivity to some sound distinctions as perception becomes adapted to the surrounding language. Young English-learning infants can distinguish certain contrasts not used in English. Some become harder to hear toward the end of the first year.",
        "children": []
      },
      {
        "text": "**Werker and Tees** tested **Hindi and Salish contrasts**. Discrimination was relatively strong at **6–8 months**, lower at **8–10 months**, and much lower at **10–12 months** for English-learning infants. Infants with relevant language experience retained stronger discrimination.",
        "children": []
      },
      {
        "text": "The change depends on the sound system being experienced. A distinction available early does not necessarily remain equally easy to perceive. Learning a native system can improve adaptation to its useful categories while reducing sensitivity to distinctions outside them.",
        "children": []
      }
    ],
    "development1-08": [
      {
        "text": "The **“citizens of the world” account** proposes broad, innate sensitivity to speech contrasts. **Language-general** means that this starting ability is not restricted to one native language. The proposal treats categorical organization as part of the infant’s initial language capacity.",
        "children": []
      },
      {
        "text": "Experience then **selects among innately specified contrasts**. Exposure establishes which distinctions matter in the language being learned. The child becomes tuned to those differences instead of remaining equally sensitive to every available contrast.",
        "children": []
      },
      {
        "text": "Under this account, development mainly narrows a broad initial inventory. Learning preserves or emphasizes existing distinctions rather than building every category from the beginning. It is therefore a claim about the infant’s starting knowledge as well as the role that experience plays afterward.",
        "children": []
      }
    ],
    "development1-09": [
      {
        "text": "**Categorical perception is not restricted to speech or to humans**. Category-related patterns also occur with nonspeech sounds and in animals without human language. A categorical result alone therefore cannot establish a mechanism devoted only to human phonemes.",
        "children": []
      },
      {
        "text": "Performance also depends on the **task**. Naming a sound and deciding whether two sounds differ place different demands on the participant. A task requiring one label can produce a sharply categorical answer without recording all the uncertainty present during processing.",
        "children": []
      },
      {
        "text": "Infants also do not begin equally sensitive to every possible contrast. Some distinctions are weak initially and strengthen with relevant experience. An account of development must therefore explain gains in sensitivity as well as narrowing, rather than only removing contrasts from a complete starting inventory.",
        "children": []
      }
    ],
    "development1-10": [
      {
        "text": "**Cutting and Rosner (1974)** investigated categorical perception with **nonspeech sounds**. They varied **rise time**, the speed with which a sound grows stronger after onset. A faster rise sounds more plucked, while a slower rise sounds more bowed.",
        "children": []
      },
      {
        "text": "The materials included **sawtooth and sine waves**. As rise time increased, listeners changed from pluck labels to bow labels. The input differed in an auditory property rather than in which phoneme a speaker produced.",
        "children": []
      },
      {
        "text": "Discrimination was strongest around the labeling transition instead of remaining constant for equal rise-time changes. The relationship between category assignment and sensitivity can therefore occur outside speech. The result concerns the organization of auditory input without requiring linguistic categories as the explanation.",
        "children": []
      }
    ],
    "development1-11": [
      {
        "text": "**Jusczyk and colleagues (1977)** tested infant responses to **nonspeech sound changes**. Sucking declined as a repeated sound became familiar. The sound then either remained unchanged, changed within a category, or crossed a category boundary.",
        "children": []
      },
      {
        "text": "No change and a within-category change produced relatively little renewed sucking. A **between-category change** increased responding, which then declined again as the new sound became familiar. The category relationship affected the infant’s response to the difference.",
        "children": []
      },
      {
        "text": "This pattern appears early without speech as the stimulus. It is therefore compatible with a broader auditory ability. Early categorical organization and language-specific organization are different claims, and the nonspeech result separates evidence for the former from evidence for the latter.",
        "children": []
      }
    ],
    "development1-12": [
      {
        "text": "Chinchillas learned responses to speech sounds through **operant conditioning**. Food rewarded the trained behavior after a **0-millisecond-lag or 80-millisecond-lag** stimulus. The rewarded signal is called the **SD**, or discriminative stimulus, because it indicates when the response will have that consequence.",
        "children": []
      },
      {
        "text": "Testing intermediate values measured how the learned response generalized across a **/ga/–/ka/ VOT continuum**. Responses changed sharply within part of the range, broadly resembling the human pattern. The animals responded systematically to the acoustic distinction without possessing human language.",
        "children": []
      },
      {
        "text": "**Ohlemiller and colleagues (1999)** and **Kuhl and Miller (1975)** are associated with these comparisons. Changing burst and aspiration intensity could shift the boundary or alter its steepness. Acoustic properties and training affected the resulting categorical behavior.",
        "children": []
      }
    ],
    "development1-13": [
      {
        "text": "**Narayan and colleagues (2010)** compared infants’ responses to **nasal place contrasts**. **/ma/–/na/** changes from a nasal made with the lips to one made near the ridge behind the teeth. **/na/–/ŋa/** changes from that location to one farther back in the mouth.",
        "children": []
      },
      {
        "text": "At **4–5 months**, English-hearing infants looked longer after a /ma/–/na/ change. Their same-versus-change responses differed much less for /na/–/ŋa/. The first contrast was more **salient**, meaning easier to notice.",
        "children": []
      },
      {
        "text": "Broad early speech sensitivity therefore does not imply equal sensitivity to every contrast. An infant can detect one place change more readily than another. The initial system has uneven sensitivities, leaving some distinctions especially dependent on subsequent learning.",
        "children": []
      }
    ],
    "development1-14": [
      {
        "text": "A **Filipino language environment** is associated with improving sensitivity to the native **/na/–/ŋa/** distinction. At **6–8 months**, Filipino-learning infants have similar looking times for same and change trials. At **10–12 months**, looking is longer after the sound changes.",
        "children": []
      },
      {
        "text": "The distinction begins weak rather than simply remaining strong from birth. English-hearing infants also have weak early sensitivity to it, despite clearer responses to /ma/–/na/. Relevant experience is associated with a gain over the first year.",
        "children": []
      },
      {
        "text": "**Learning can strengthen a contrast**, not just preserve it. Development therefore includes constructing more effective distinctions from the input as well as losing sensitivity to unused ones. A model based only on narrowing an initially complete set cannot account for this improvement by itself.",
        "children": []
      }
    ],
    "development1-15": [
      {
        "text": "**Emergentist approaches** propose that language patterns develop through learning from structured experience. **Associative learning** detects relationships among events that repeatedly occur together or predict one another. Experience changes connections so that a familiar pattern becomes more likely to produce a particular response.",
        "children": []
      },
      {
        "text": "In conditioning, food produces salivation. Repeatedly pairing a bell with food can make the bell produce the response as well. The learned effect depends on the experienced relationship between the two events rather than on the bell’s physical resemblance to food.",
        "children": []
      },
      {
        "text": "Applied to **pattern recognition**, this means learning which stimulus properties tend to occur together. Repeated relationships in acoustic input can shape speech categories. The proposal does not require every category to be fully specified before the learner encounters the distribution of sounds.",
        "children": []
      }
    ],
    "development1-16": [
      {
        "text": "A **vowel space** describes vowels through combinations of **F1 and F2**, the first two vocal-tract resonances. Natural tokens vary, so a vowel forms a distribution rather than occupying one exact location. Different vowel distributions can overlap even though listeners usually identify them successfully.",
        "children": []
      },
      {
        "text": "In the account associated with **Kuhl and others**, experience teaches regularities within these distributions. Common combinations receive repeated support. Learning concerns the pattern across many productions rather than memorizing a single ideal recording.",
        "children": []
      },
      {
        "text": "A **prototypical /a/** can develop around a central or especially frequent part of its distribution. The **mean** is an average position, while the **mode** is the most frequent value or region. The prototype can therefore reflect what the listener has experienced instead of one universal acoustic value fixed in advance.",
        "children": []
      }
    ],
    "development1-17": [
      {
        "text": "**Maye and colleagues** exposed infants to different distributions along a **VOT continuum**. A **bimodal distribution** concentrates examples in two regions, supporting a distinction between two groups. A **unimodal distribution** concentrates examples near the middle, supporting one group.",
        "children": []
      },
      {
        "text": "At test, the same **stimuli 3 and 6** either alternated or repeated without alternation. Both exposure groups heard the same test contrast, so any difference depended on the preceding distribution rather than a larger acoustic separation at test.",
        "children": []
      },
      {
        "text": "The **bimodal-exposure groups** distinguished the test conditions, while the **unimodal-exposure groups** did not reliably do so. The distribution of heard sounds therefore affected how later input was organized. Experience with two clusters supported treating the tokens differently, while one central cluster supported grouping them together.",
        "children": []
      },
      {
        "text": "Alternating trials repeatedly switch between the two test tokens, while non-alternating trials do not. The relevant comparison is therefore the infants’ different treatment of those arrangements after exposure. It does not require a spoken statement that there are two categories or an adult-style decision naming the sounds.",
        "children": []
      }
    ],
    "development1-18": [
      {
        "text": "**Social interaction affects language learning from exposure**. Nine-month-old American infants received **twelve 25-minute sessions** before a head-turn test of a Mandarin contrast. Live Mandarin interaction improved performance compared with English exposure. Television and audio-only Mandarin did not produce the same benefit.",
        "children": []
      },
      {
        "text": "The interactive setting changed the effect of hearing another language. Exposure through a recording was not equivalent to exchanging behavior with a live speaker. The result connects learning to how the acoustic input is encountered, not only to whether it is available.",
        "children": []
      },
      {
        "text": "Maternal responses also differed in whether they were **contingent**, timed to an infant’s vocalization, or **noncontingent**, delivered at unrelated times. Contingent feedback more strongly increased syllable-like vocalizations. Proposed explanations include an early attraction to social interaction and the ability to use another person’s cues. The timing of a response can affect the learner’s own vocal behavior.",
        "children": []
      },
      {
        "text": "Contingent and noncontingent responses differ in their relationship to the infant’s behavior. A contingent response follows the vocalization at the relevant time, making the exchange responsive. The contrast tests that relationship rather than merely whether an adult is present or whether the infant hears speech at all.",
        "children": []
      }
    ],
    "development1-19": [
      {
        "text": "**Statistical learning is constrained** by which properties the learner treats as relevant. A **contrastive property** distinguishes linguistic units. Speaker identity and speaking rate also alter acoustic input, but they do not necessarily identify different phonemes. Learning must handle variation without creating a new category for every difference.",
        "children": []
      },
      {
        "text": "**Earlier learning changes later learning**. An established pattern affects which new distinctions are easy to notice and acquire. The learner’s response to a new distribution therefore depends partly on the organization already developed through experience.",
        "children": []
      },
      {
        "text": "**Social context** also changes how input is used. The same sounds can occur during responsive interaction or in an unresponsive recording. Learning depends on the information encountered, its relationship to prior knowledge, and the circumstances in which the learner experiences it.",
        "children": []
      }
    ],
    "development2-01": [],
    "development2-02": [
      {
        "text": "**Word segmentation** is the process of finding words in continuous speech. Spoken language does not contain a reliable equivalent of written spaces. Listeners recover recurring forms from a **“sea of sounds”** even when the acoustic signal does not clearly mark each beginning and ending.",
        "children": []
      },
      {
        "text": "Silence is not a dependable word boundary. A brief closure of the vocal tract can create silence inside a word during consonant production. Treating every silent interval as a boundary would therefore divide some words incorrectly.",
        "children": []
      },
      {
        "text": "Segmentation requires using evidence about how sounds group together. Identifying a recurring sound unit is also different from knowing its meaning. A learner can begin detecting a word-shaped sequence before establishing what object, action, or property it names.",
        "children": []
      }
    ],
    "development2-03": [
      {
        "text": "Some words are heard **in isolation**, including **“Hello,” “No,” “Please,” “Go,” and “Stop.”** Their boundaries are relatively accessible because the whole utterance contains one word. Many words occur mainly within longer utterances, so isolated examples cannot explain all segmentation.",
        "children": []
      },
      {
        "text": "**Phonotactics** concerns which sound combinations are common or permitted in a language. Unusual combinations in wordboundary or speechcode can support a boundary, although movement cautions against treating every apparent join as two whole words. These cues concern learned sound patterns rather than visible spaces.",
        "children": []
      },
      {
        "text": "**Stress** supplies another cue because many English words begin with a strong syllable. **Jusczyk and colleagues (1999)** familiarized **7.5-month-olds** with kingdom or device. Infants preferred passages containing the initially stressed kingdom but not the same way for device, stressed on its second syllable. Detecting a familiar form in running speech depended on how stress aligned with its boundary.",
        "children": []
      },
      {
        "text": "Stress is not a universal solution to segmentation. Different languages organize stress differently, and not every English word begins with a strong syllable. The kingdom–device contrast identifies how a useful regularity can favor one word pattern while leaving another harder to recognize in connected speech.",
        "children": []
      }
    ],
    "development2-04": [
      {
        "text": "In **pretty baby**, pre strongly predicts the following ty, while ty can be followed by the beginning of many different words. The within-word sequence is therefore more reliable than the sequence crossing into baby. Differences in predictability can supply evidence about where words belong.",
        "children": []
      },
      {
        "text": "**Transitional probability** is the probability of a next syllable given the syllable just heard. The frequency of the pair is divided by the frequency of its first member. A pair occurring often is not necessarily highly predictable if its first syllable also has many other continuations.",
        "children": []
      },
      {
        "text": "**f** means frequency of occurrence. The relationship is \\[\\frac{f(\\mathrm{pretty})}{f(\\mathrm{pre})}\\gg\\frac{f(\\mathrm{tyba})}{f(\\mathrm{ty})}\\] Within pretty, pre predicts ty much more reliably than ty predicts ba across the word boundary. The stronger internal relationship supports treating pretty as one unit within the continuous sequence.",
        "children": []
      }
    ],
    "development2-05": [
      {
        "text": "One syllable tends to predict the next more reliably **within a word** than across a word boundary. A learner can use this difference to group sounds. It is a statistical cue rather than a physical gap that fixes every possible interpretation.",
        "children": []
      },
      {
        "text": "**“What’s that in the road a/head?”** permits competing divisions involving a and head. **“I scream, you scream, we all scream for ice cream”** similarly contains overlapping sound sequences grouped into different words. The same acoustic material can support more than one segmentation.",
        "children": []
      },
      {
        "text": "**Lower transitional probability** can suggest a boundary, while stronger internal transitions favor a unit. A cue changes the relative support for those possibilities. It does not eliminate the need to interpret how the sequence fits the utterance.",
        "children": []
      }
    ],
    "development2-06": [
      {
        "text": "**Saffran and colleagues (1996)** created an **artificial language** to test statistical segmentation without the usual mixture of natural-language cues. It contained repeated three-syllable forms such as **tokibu, gikoba, and gopila**. The input was constructed so that sequence regularities supplied the relevant grouping information.",
        "children": []
      },
      {
        "text": "The stream was **monotone**. Pitch, duration, and amplitude did not systematically mark the intended boundaries. Simple **consonant–vowel syllables** also prevented unusual boundary combinations from providing an alternative cue.",
        "children": []
      },
      {
        "text": "There were **no pauses between words**. Listeners heard one continuous syllable stream rather than separately presented items. Detecting the intended groups therefore required using relationships within the sequence, rather than relying on silence, stress, or a special boundary sound.",
        "children": []
      }
    ],
    "development2-07": [
      {
        "text": "In **tokibugikobagopila**, recurring syllables occur without heard spaces between the intended units. A longer sequence such as **tokibugikobagopilatipolu** places several groups directly next to one another. The learner receives the stream, not an already separated list of words.",
        "children": []
      },
      {
        "text": "Repetition makes particular syllable transitions reliable. The syllables within tokibu or gopila recur together even when the surrounding units change. Their relationship can be learned without an explicit signal announcing each boundary.",
        "children": []
      },
      {
        "text": "Segmentation therefore involves recovering organization from the sequence itself. The evidence lies in which syllables regularly follow one another. A recurring group can become recognizable even though no pause marks where it begins or ends.",
        "children": []
      }
    ],
    "development2-08": [
      {
        "text": "The forms **tokibu, gikoba, gopila, and tipolu** preserve their internal order across repetitions. The words next to them can change. This makes the relationships within each form more reliable than many relationships across its boundaries.",
        "children": []
      },
      {
        "text": "A first syllable strongly predicts its next syllable within an intended word. At the end, several different words can follow, making the next syllable less predictable. This contrast supplies evidence about which adjacent sounds form a stable group.",
        "children": []
      },
      {
        "text": "The signal still contains no actual spaces. The learner uses differences in predictability to infer units within it. Knowing that a sequence belongs together is therefore an outcome of learning its statistical structure, rather than detecting gaps that were already present.",
        "children": []
      }
    ],
    "development2-09": [
      {
        "text": "**Transitional probability must be distinguished from raw frequency**. A whole sequence can occur often because its syllables reliably belong together or because it repeatedly spans a boundary. A **part-word** is a test sequence crossing an intended word boundary.",
        "children": []
      },
      {
        "text": "In the given stream, **GOPILA and BU-GIKO each occur twice**. Their full-string frequencies match, but the transitions inside them differ. **GO–PI and PI–LA** each have probability \\[\\frac{2}{2}=1\\] Every relevant first syllable is followed by the specified next syllable.",
        "children": []
      },
      {
        "text": "**BU–GI** has probability \\[\\frac{2}{4}=0.5\\] BU occurs four times but leads to GI only twice. The part-word therefore contains a weaker transition despite matching GOPILA’s total count. Discriminating the two kinds of sequence requires sensitivity to conditional predictability, not merely familiarity with how often the whole string occurred.",
        "children": []
      },
      {
        "text": "Half of the intended words occurred more frequently than the others. Choosing frequency-matched part-words prevented simple whole-string repetition from distinguishing every test item. The learner had to be sensitive to how the syllables predicted each other within those equally frequent strings.",
        "children": []
      }
    ],
    "development2-10": [
      {
        "text": "Infants **looked longer toward part-words** than toward words from the artificial language. The test sequences were matched in total occurrence frequency. Their different treatment therefore cannot be explained simply by hearing one full sequence fewer times.",
        "children": []
      },
      {
        "text": "This was a **novelty preference**. A boundary-spanning sequence was treated as different from a unit whose syllables reliably belonged together. Looking supplied a response without requiring infants to report the word boundaries.",
        "children": []
      },
      {
        "text": "The learned distinction depended on how reliably one syllable predicted the next. Infants extracted organization from a continuous stream and used it when hearing the test items. Statistical segmentation therefore involves relationships among occurrences, beyond a count of repeated whole strings.",
        "children": []
      }
    ],
    "development2-11": [
      {
        "text": "Learning a word’s **referent** means learning what it names. Recognizing the sound pattern cat and knowing which entity cat refers to are different accomplishments. One concerns the form in speech, and the other concerns the connection between that form and meaning.",
        "children": []
      },
      {
        "text": "**Segmentation** can recover a recurring unit without identifying its referent. A scene contains many possible objects, parts, properties, and actions. The presence of a word during that scene does not itself specify which candidate the speaker intends.",
        "children": []
      },
      {
        "text": "Word learning therefore requires additional evidence about reference. The child must connect the recognized form with the speaker’s intended meaning. A reliable syllable sequence solves a problem of grouping sounds, but not automatically the problem of what that group names.",
        "children": []
      }
    ],
    "development2-12": [
      {
        "text": "The **inductive problem of early word learning** arises because an encounter supports many possible meanings. A word heard near a cat could mean **CAT, ANIMAL, PET, or FELIX**. These candidates refer to different levels of category or to one particular individual.",
        "children": []
      },
      {
        "text": "The word could instead refer to **FURRY, ALIVE, WALKING, WHISKERS, or LEG**. Those candidates concern a property, a state, an action, or part of the animal. Seeing the same event does not uniquely select one interpretation.",
        "children": []
      },
      {
        "text": "The **hypothesis space** is the set of possible meanings compatible with the experience. **Quine’s gavagai problem** captures this uncertainty about reference. Learning requires evidence or constraints that narrow the possibilities instead of assuming that a single word and scene make the intended meaning obvious.",
        "children": []
      }
    ],
    "development2-13": [
      {
        "text": "**Joint attention** occurs when two people share a focus on an object or event. An adult and child coordinate what the interaction concerns. This provides information about reference beyond whatever happens to attract the child’s attention independently.",
        "children": []
      },
      {
        "text": "**Gaze following** develops around **nine months**. Following the adult’s eyes can reveal which object the adult is attending to. When a label is spoken, that focus provides evidence about the object it may name.",
        "children": []
      },
      {
        "text": "Shared attention narrows the possible referents of the word. The child can relate the expression to the adult’s focus rather than associating it equally with everything nearby. The useful information concerns a relationship among the speaker, the learner, and the object.",
        "children": []
      }
    ],
    "development2-14": [
      {
        "text": "In **Baldwin and colleagues’ joint-attention condition**, an adult interacted with an infant and labeled the object occupying the infant’s attention. The label occurred within an exchange involving a shared object. The adult’s behavior provided a visible connection between the sound and its intended referent.",
        "children": []
      },
      {
        "text": "In the **no-joint-attention condition**, a voice behind a screen supplied the label while the object remained present. Both conditions contained a word and an object, but only one included visible coordination with the speaker.",
        "children": []
      },
      {
        "text": "**Eighteen-month-olds** learned the word in the joint-attention condition but not in the other condition. Temporal co-occurrence did not produce the same result by itself. How the speaker organized the interaction affected the mapping learned from the available experience.",
        "children": []
      },
      {
        "text": "A visible speaker gives the learner evidence that the sound is being used to refer to that object. The screened voice supplies temporal overlap without the same coordinated exchange. Their different outcomes distinguish a social relationship supporting reference from the mere presence of the relevant sound and object.",
        "children": []
      }
    ],
    "development2-15": [
      {
        "text": "**Intentional cues** indicate what a speaker is trying to refer to. The adult’s gaze can identify a different object from the one currently occupying the child’s attention. A new word therefore should not automatically be assigned to whatever the child happens to be handling.",
        "children": []
      },
      {
        "text": "Baldwin tested **16–17-month-olds and 18–19-month-olds** with two labeling conditions. In **follow-in labeling**, the adult looked at the child’s current toy. In **discrepant labeling**, the adult looked toward a toy in a bucket instead.",
        "children": []
      },
      {
        "text": "The contrast separates the learner’s own interest from the adult’s indicated referent. Gaze can supply evidence about which of the available objects the speaker means. The intended mapping depends on the social information accompanying the word, not merely on which objects are present.",
        "children": []
      }
    ],
    "development2-16": [
      {
        "text": "**Gaze direction** helps identify the intended referent when several objects are available. The adult can look at an object while labeling it, linking the spoken form with a particular focus. The child can use that behavior to distinguish the candidate from other items nearby.",
        "children": []
      },
      {
        "text": "The speaker’s focus can differ from the child’s. Following it therefore requires using information about another person rather than simply continuing one’s own attention. A label can concern an object the child was not initially watching.",
        "children": []
      },
      {
        "text": "This cue reduces uncertainty without making the word’s meaning transparent from its sound. The learner combines the expression with evidence about the speaker’s intention. The resulting choice is more specific than associating the new form with everything occurring during the utterance.",
        "children": []
      }
    ],
    "development2-17": [
      {
        "text": "**Affective and behavioral cues** include the speaker’s emotional expressions and actions. A reaction can indicate whether a candidate object satisfies what the speaker is trying to do. The child can use that information when deciding which object a new word names.",
        "children": []
      },
      {
        "text": "In **Akhtar and colleagues’ study**, infants used adults’ facial expressions to identify the intended object. The relevant information was the adult’s response to the candidate, rather than its mere presence near the spoken word.",
        "children": []
      },
      {
        "text": "Several objects can coincide with an utterance, but the adult may treat only one as the intended target. Interpreting that reaction narrows the alternatives. Word learning therefore includes tracking the purpose of the exchange as well as forming associations between sounds and objects.",
        "children": []
      }
    ],
    "development2-18": [
      {
        "text": "An adult’s **emotional reaction** can distinguish the intended object from other candidates. A response indicating success or satisfaction can connect one object with the goal of the interaction. The learner can use that connection to interpret a new label.",
        "children": []
      },
      {
        "text": "**Intention is conveyed through more than gaze direction**. Facial expressions and behavior also supply evidence about what the speaker means. The word can occur near several objects without all of them receiving equal support as its referent.",
        "children": []
      },
      {
        "text": "The useful information lies in how the adult responds to each candidate. Relating the label to that response reduces the word’s **hypothesis space**, meaning its possible interpretations. The child learns from the organization of the exchange rather than from co-occurrence alone.",
        "children": []
      }
    ],
    "development2-19": [
      {
        "text": "A **default word-learning strategy** favors one interpretation unless other evidence supports an alternative. It narrows the set of meanings considered initially. A default is a useful starting preference, not an absolute rule governing every word.",
        "children": []
      },
      {
        "text": "The **whole-object assumption** favors assigning a new label to an entire object. A scene also contains parts, properties, and actions, any of which could in principle be named. The assumption gives the whole object greater initial support than those alternatives.",
        "children": []
      },
      {
        "text": "This reduces the **hypothesis space** without requiring the child to test every candidate equally. Further evidence can establish that a word refers to a part or property instead. The strategy supports an early inference while leaving room for learning a different kind of meaning.",
        "children": []
      }
    ],
    "development2-20": [
      {
        "text": "**Mutual exclusivity**, associated with **Markman (1989)**, is a default expectation that an object has one name. If one candidate already has a known label, an unfamiliar label is more likely to refer to another object. Existing vocabulary helps constrain the new mapping.",
        "children": []
      },
      {
        "text": "The strategy develops during the **second half of the second year**. Its operation depends on what the child already knows, because a familiar object is excluded only if its name is available to that learner. The sound of the new word alone does not select the referent.",
        "children": []
      },
      {
        "text": "An unnamed object therefore becomes a stronger candidate when contrasted with an already named one. This is a default inference rather than a claim that an object can never receive another expression. Its role is to reduce uncertainty during the initial interpretation.",
        "children": []
      }
    ],
    "development2-21": [
      {
        "text": "Under **mutual exclusivity**, an unfamiliar label is preferentially assigned to an object lacking a known name. The known name of another object makes that object less likely to be the intended target. The choice depends on a comparison among the available candidates.",
        "children": []
      },
      {
        "text": "**Prior vocabulary** determines which candidates count as already named. Two children could therefore make different inferences from the same scene if they know different words. The strategy uses learned information rather than treating every new encounter independently.",
        "children": []
      },
      {
        "text": "Combining the novel label with existing names narrows its possible referents. The learner does not have to infer meaning directly from the word’s sound. A relationship among vocabulary, objects, and the speaker’s expression supplies evidence for the otherwise unnamed candidate.",
        "children": []
      }
    ],
    "development2-22": [
      {
        "text": "The length of a child’s utterance does not directly establish how it was generated. **Menn** distinguishes selecting relevant words, repeating a memorized **formula**, making a productive combination, and using a **stable construction**. These can produce similarly short expressions through different kinds of organization.",
        "children": []
      },
      {
        "text": "**“Up!”**, **“Pick you up!”**, and **“Mommy up!”** differ in length, but the longer expression might be stored as a unit. The shorter one could involve selecting and combining separate elements. Counting words therefore cannot by itself distinguish memorization from productive grammar.",
        "children": []
      },
      {
        "text": "Context helps identify what the child intends and how the expression functions. A stable construction can also differ from adult grammar. Even with detailed observation, a particular utterance may leave uncertainty about its source, so production length is an incomplete measure of linguistic knowledge.",
        "children": []
      }
    ],
    "development2-23": [
      {
        "text": "**Comprehension can develop beyond what a child regularly produces**. A one-word speaker can use basic **transitive word order** to interpret an event involving an actor and someone affected by the action. Limited spoken output therefore does not establish equally limited understanding of structure.",
        "children": []
      },
      {
        "text": "In **“The boy is tickling the girl,”** the first noun identifies the actor and the second identifies the recipient. Knowing boy and girl alone does not specify that relationship. Their positions help distinguish who performs the tickling from who receives it.",
        "children": []
      },
      {
        "text": "The **structure-mapping account** relates a partial sentence representation to an event representation. A child can map noun positions onto event roles without yet producing a fully adult-like sentence. Understanding these relationships can therefore precede fluent expression of the same grammatical construction.",
        "children": []
      }
    ],
    "development2-24": [
      {
        "text": "**Gertner and colleagues (2006)** tested whether two-year-olds apply **transitive structure to a novel verb**. Children heard **“The duck is gorping the bunny”** while viewing unfamiliar actions with reversed actor roles. The word gorping had no learned action meaning that could identify who did what.",
        "children": []
      },
      {
        "text": "Children looked longer at the event in which the **duck acted on the rabbit**. Noun order supplied the relationship even without prior knowledge of the verb. The task therefore tested generalization of a construction rather than recall of a familiar sentence or event.",
        "children": []
      },
      {
        "text": "Instructions occurred during blank-screen intervals, and the sentence accompanied the test events. **Preferential looking** measured interpretation without requiring spoken production. Children’s **mean length of utterance, or MLU**, was typically near two **morphemes**, meaning meaningful words or word parts. Their output could be less complete than the adult structure they could already understand.",
        "children": []
      },
      {
        "text": "Reversing the characters’ roles makes knowing duck and bunny insufficient. Both possible events contain those participants and unfamiliar actions. The child must use the sentence’s ordered relationship to prefer the duck acting on the rabbit, even though the verb cannot be matched to a previously learned action.",
        "children": []
      }
    ],
    "l1-critical-01": [],
    "l1-critical-02": [
      {
        "text": "A strict **critical period** is a developmental window with a programmed opening and closing. The relevant experience can shape the system during that interval. Under the strict definition, the same sensitivity is unavailable before the window opens or after it closes.",
        "children": []
      },
      {
        "text": "A **sensitive period**, also called an optimal period, is an interval when learning is easier or more effective. Its boundaries can be gradual, and learning remains possible outside it. Experience can also influence how sensitivity develops.",
        "children": []
      },
      {
        "text": "The distinction is between a loss of possibility and a reduction in effectiveness. Early advantages followed by some capacity for later improvement fit a sensitive-period account. Poor ordinary learning at a later age does not by itself establish that all later change is impossible.",
        "children": []
      }
    ],
    "l1-critical-03": [
      {
        "text": "**Amblyopia** is poor vision in one eye despite normal peripheral function. A developmental problem can leave a lasting impairment even after the original optical disturbance is corrected. The eye’s ability to supply input and the brain’s ability to use it are therefore different parts of the condition.",
        "children": []
      },
      {
        "text": "**Strabismus** misaligns the eyes, while a **cataract** blocks light through the lens. **Anisometropia** gives the eyes different refractive properties, so their input is not equally focused. Each can disrupt the coordinated visual experience available during development.",
        "children": []
      },
      {
        "text": "Correcting the physical problem does not automatically restore the organization of visual processing. The system may continue using one eye less effectively. A temporary disturbance in the incoming signal can therefore have consequences that outlast the disturbance itself.",
        "children": []
      }
    ],
    "l1-critical-04": [
      {
        "text": "The two eyes’ inputs **compete for influence in visual cortex**. When one supplies abnormal information, the other can gain influence over connections that would otherwise support the disadvantaged eye. The pathways develop in relation to one another rather than independently.",
        "children": []
      },
      {
        "text": "During **monocular deprivation**, input from one eye is reduced or abnormal. After **2–3 days**, dendritic spines become more mobile. Around **3–4 days**, spine loss and degeneration occur. After **more than a week**, axon sprouting and new spine formation contribute to reorganization.",
        "children": []
      },
      {
        "text": "**Dendritic spines** receive input at connections between neurons, while **axon sprouting** adds branches through which neurons communicate. These changes alter which input effectively drives the system. Restoring normal input can leave the previously deprived eye at a competitive disadvantage, so ordinary binocular experience does not immediately undo the imbalance.",
        "children": []
      },
      {
        "text": "The stronger eye can continue driving the reorganized system when both eyes are open again. That competition explains why repairing the input does not necessarily repair the later function. The lasting disadvantage concerns how cortical connections now use the restored signal, rather than an ongoing absence of light at the eye.",
        "children": []
      }
    ],
    "l1-critical-05": [
      {
        "text": "**Patching the stronger eye intermittently** gives the weaker eye more opportunity to drive visual processing. The patch reduces the stronger input’s ongoing advantage. Treatment therefore uses competition between the pathways rather than simply correcting the original optical disturbance.",
        "children": []
      },
      {
        "text": "**Plasticity** is the capacity to change with experience. Increasing use of the weaker input can encourage functional improvement because the system can reorganize how it responds. Patching the better eye creates conditions favoring the disadvantaged pathway.",
        "children": []
      },
      {
        "text": "This treatment is most effective early and becomes less effective with age. By late childhood, around **ten years** in the comparison, the benefit can be very limited. The same manipulation therefore has different effects depending on the developmental state of the visual system.",
        "children": []
      }
    ],
    "l1-critical-06": [
      {
        "text": "**Levi and Polat (1996)** found improvement in adults with amblyopia after **long-term, intensive perceptual training**. Participants used the affected eye to perform controlled visual judgments. Some were in their **fifties**, beyond the usual childhood treatment window.",
        "children": []
      },
      {
        "text": "Learning occurred over **tens of thousands of trials**. Progress included periods of faster change and periods with little improvement. Benefits extended beyond performance on the practiced task to broader visual function.",
        "children": []
      },
      {
        "text": "The adult system therefore retained some **experience-dependent plasticity**. Limited success with an ordinary late treatment does not mean that no kind of experience can produce change. The type and intensity of training matter when assessing how much learning remains possible.",
        "children": []
      }
    ],
    "l1-critical-07": [
      {
        "text": "**Li, Ngo, Nguyen, Lam, and Levi (2008)** reported benefits from video-game experience in adults with amblyopia. Improvement involved **visual acuity**, the ability to resolve fine detail, and **visual attention**, the selection of relevant visual information. These were changes in an already impaired adult system.",
        "children": []
      },
      {
        "text": "The participants’ earlier visual development had left a persistent deficit. Improvement therefore did not simply reflect normal childhood growth. Intensive experience was associated with better function after the age when ordinary treatment is usually most effective.",
        "children": []
      },
      {
        "text": "These findings support remaining adult **plasticity**. An early optimal period can become less favorable without eliminating every possibility of improvement. The result concerns functional change under particular conditions, rather than an absence of developmental limits.",
        "children": []
      }
    ],
    "l1-critical-08": [
      {
        "text": "An early **peripheral disturbance** can alter how the brain organizes visual input. One eye may supply reduced or abnormal information while connections are developing. The resulting imbalance can remain even after that eye becomes physically capable of providing normal input.",
        "children": []
      },
      {
        "text": "This is **experience-dependent organization**. The pattern of input changes which connections are effective, and competition can give the stronger eye a lasting advantage. Removing the original disturbance does not automatically reverse the history of neural change.",
        "children": []
      },
      {
        "text": "Treatment works best within an early developmental window, but specialized adult training can still help. Amblyopia therefore combines strong early sensitivity with some later capacity for learning. That pattern fits a **sensitive period** more closely than an absolute claim that change becomes impossible after childhood.",
        "children": []
      }
    ],
    "l1-critical-09": [
      {
        "text": "**Lenneberg** connected neurological development with a proposed **language acquisition device**. This refers to a biologically supported capacity for acquiring language. The developmental question concerns whether changes in the brain alter how effectively that capacity can use experience.",
        "children": []
      },
      {
        "text": "**Early language deprivation** provides evidence about people first encountering an accessible language unusually late. Relevant histories include neglected children and Deaf children without early access to sign language. These differ from ordinary acquisition beginning early in life.",
        "children": []
      },
      {
        "text": "The issue is the timing of a **first language**, not simply the size of someone’s later vocabulary. Comparing early and delayed exposure tests how developmental state relates to the eventual outcome. A biological account must explain how age and available language interact during learning.",
        "children": []
      }
    ],
    "l1-critical-10": [
      {
        "text": "In **Biological Foundations of Language (1967)**, **Lenneberg** related language acquisition to maturation. Development follows a broadly ordered sequence, with early words preceding telegraphic combinations and longer spontaneous sentences. **Telegraphic speech** preserves important content words while leaving out some grammatical material.",
        "children": []
      },
      {
        "text": "Repeated vocal patterns and early play with sounds occur before a clear vocabulary. Around **twelve months**, recurring forms and emerging words such as mama and dada appear. By roughly **eighteen months**, vocabulary is clearer while complex babbling and comprehension continue to expand.",
        "children": []
      },
      {
        "text": "Lenneberg interpreted this ordered progression as compatible with an unfolding **biological program**. Language changes occurred alongside wider developmental changes, rather than being attributed only to the accumulated quantity of input. The proposal assigns a role to the changing state of the child as well as to experience.",
        "children": []
      }
    ],
    "l1-critical-11": [
      {
        "text": "Lenneberg’s evidence about typical brain development came largely from **post-mortem tissue**, examined after death. The measurements did not follow the same children continuously. In the neuron-size comparison, observations were absent across a long interval from roughly two to eighteen years.",
        "children": []
      },
      {
        "text": "**Neuron size** increased rapidly early in development, together with changes in **packing density**, meaning how closely cells occupy the tissue. Lenneberg proposed that these early changes helped prepare the brain for language acquisition. The favorable window would open after the initial rapid growth.",
        "children": []
      },
      {
        "text": "The proposal relates learning to maturation, but the measurements and the interpretation are different kinds of evidence. Sampling gaps do not establish that a continuous biological switch was directly observed. The age pattern must be interpreted in light of which developmental stages were actually measured.",
        "children": []
      }
    ],
    "l1-critical-12": [
      {
        "text": "Language outcomes after major brain injury can be much better in children than adults. **Hemispherectomy** removes one cerebral hemisphere to treat severe seizures. Substantial language development can follow early removal even when the removed hemisphere is the **left** one.",
        "children": []
      },
      {
        "text": "Historical childhood cases often had speech that was unaffected or improved after the operation. A case around puberty improved more slowly, while adult left-hemisphere removal was associated with permanent aphasia. Adult right-hemisphere removal had a different language outcome.",
        "children": []
      },
      {
        "text": "**Cerebral dominance** refers to specialization of the hemispheres for particular functions. Lenneberg proposed that language organization is less fixed early, permitting more reassignment after damage. The age difference concerns changing capacity for reorganization, not a claim that extensive childhood injury has no consequences.",
        "children": []
      }
    ],
    "l1-critical-13": [
      {
        "text": "A **perinatal stroke** occurs before birth or within **28 days after birth**. It damages tissue while the systems supporting language are still developing. Outcomes are generally better than after comparable adult injury, but development is not always unaffected.",
        "children": []
      },
      {
        "text": "Early language difficulties follow damage to **either hemisphere**. Some initial problems can be greater after right-hemisphere injury. This differs from simply applying the usual adult pattern of language specialization to a newborn brain.",
        "children": []
      },
      {
        "text": "Later performance often remains in the **low-normal range**. Better recovery than in adult aphasia does not necessarily mean complete catch-up. The trajectory combines substantial developmental flexibility with possible lasting costs, so reorganization and absence of impairment are different claims.",
        "children": []
      }
    ],
    "l1-critical-14": [
      {
        "text": "**Curtiss and colleagues (1974)** studied **Genie** after severe early abuse, isolation, and restricted language access. She was first studied at **thirteen years and seven months**. Her confinement began around **twenty months**, leaving a long period without ordinary linguistic and social experience.",
        "children": []
      },
      {
        "text": "She was physically restrained, minimally cared for, and punished for making sounds. Language deprivation occurred alongside many other developmental hardships. Accessible speech and normal interaction were both severely limited.",
        "children": []
      },
      {
        "text": "On admission, she was malnourished, did not speak, and had major physical difficulties. Her later acquisition therefore began after a history affecting more than language input alone. The case provides evidence about delayed learning within those circumstances rather than isolating age of exposure as the only variable.",
        "children": []
      }
    ],
    "l1-critical-15": [
      {
        "text": "Across **four years of observation**, Genie learned to understand **hundreds of words**, some **morphology**, and several **prepositions**. Morphology concerns meaningful word parts. Plurals were a relative strength, indicating some ability to use changes in form to distinguish number.",
        "children": []
      },
      {
        "text": "Preposition tests used actions with objects rather than requiring spoken definitions. **“Put the red box behind the blue box”** tested understanding of a spatial relationship. Her placement of the boxes supplied the response.",
        "children": []
      },
      {
        "text": "Correct answers exceeded errors for relations including **on, in, over, under, in front of, in back of, next to, and behind**. Learning therefore extended beyond object labels. Genie acquired some ways of expressing relationships among objects as well as vocabulary and grammatical forms.",
        "children": []
      }
    ],
    "l1-critical-16": [
      {
        "text": "**Genie’s comprehension developed more than her spoken production**. She understood information she could not readily express. Her history of punishment for vocalizing could also affect how much knowledge appeared in speech, so output alone did not capture all learning.",
        "children": []
      },
      {
        "text": "**Grammar remained weaker than vocabulary**. Instructions such as **“Show me the fork and pencil”** and **“Show me the crayon or the knife”** tested how conjunctions changed the required response. Knowing the individual object names was insufficient to distinguish those instructions.",
        "children": []
      },
      {
        "text": "Genie initially treated **or** much like **and**. She later distinguished the words without consistently understanding the either/or relationship. Her strong performance with and contrasted with frequent errors on or, identifying a difficulty with the relation expressed by the connecting word despite substantial vocabulary growth.",
        "children": []
      }
    ],
    "l1-critical-17": [
      {
        "text": "Genie learned much more **vocabulary than grammar**. This uneven development has been interpreted as evidence that delayed first-language acquisition particularly affects grammatical learning. Learning many words did not bring equally rapid improvement in the relationships tested by grammatical instructions.",
        "children": []
      },
      {
        "text": "Her history also included abuse, neglect, and possible learning difficulties. These accompanied delayed exposure and could contribute to the outcome. The observed pattern therefore does not isolate age of first language from all other developmental influences.",
        "children": []
      },
      {
        "text": "Funding ended after **four years**, limiting the period of systematic observation. The evidence concerns what she learned within that interval rather than proving what any longer period would have produced. The uneven outcome and the qualifications attached to this unusual history both belong to the scientific account.",
        "children": []
      }
    ],
    "l1-critical-18": [
      {
        "text": "**Mayberry, Lock, and Kazmi (2002)** compared late first-language learning with later acquisition after an early language. Deaf children first encountering **American Sign Language, or ASL, at 9–15 years** showed persistent difficulty. They were acquiring a first language rather than adding another one to an established linguistic system.",
        "children": []
      },
      {
        "text": "Children who became deaf **after acquiring a spoken language** did better when they learned ASL later. Both groups encountered sign relatively late, but only one had early language. Their comparison separates timing of first-language experience from timing of sign-language exposure itself.",
        "children": []
      },
      {
        "text": "Adults without early language were poorer at recalling complex ASL sentences. English grammaticality judgments also favored groups with an early signed or spoken language. The advantage therefore concerned accessible early linguistic experience across modalities, not a requirement that the early and later languages both be spoken or both signed.",
        "children": []
      },
      {
        "text": "The comparison group had early language but did not have to retain normal hearing throughout childhood. Their better later sign learning connects the benefit with prior linguistic experience rather than continued access to spoken sound. An accessible early signed or spoken language can provide a foundation for later acquisition.",
        "children": []
      }
    ],
    "l1-critical-19": [
      {
        "text": "Outcomes after **stroke and hemispherectomy** differ between childhood and adulthood. A developing system can support language after damage that would produce more severe adult impairment. This supports a developmental role in the capacity for recovery and reorganization.",
        "children": []
      },
      {
        "text": "**Absence of input does not indefinitely preserve an unused first-language window**. Delayed access can leave persistent difficulties even after language becomes available. Maturation does not simply wait until the relevant experience begins.",
        "children": []
      },
      {
        "text": "The evidence comes from unusual human histories involving deprivation or injury, often with additional influences. There is no equivalent experimental animal model that reproduces human language acquisition. An explanation of biological constraints must account for both the developmental patterns and the qualifications attached to these cases.",
        "children": []
      }
    ],
    "l1-critical-20": [],
    "l1-critical-21": [],
    "l2-learning-01": [],
    "l2-learning-02": [
      {
        "text": "**Adults often begin learning a second language faster than children**. They already have a first language and more developed cognitive abilities. Those resources provide a starting point that an infant acquiring a first language does not yet have.",
        "children": []
      },
      {
        "text": "An **eighteen-month-old with about twenty words** is still developing pointing, pretend play, spatial understanding, questions, and vocal patterns. Adult learners have many of these capacities available already. Comparing ages therefore involves different starting knowledge, not simply the same learner receiving input at different dates.",
        "children": []
      },
      {
        "text": "**Ultimate attainment** means the level eventually reached. Adults are less likely to become fully native-like despite their initial speed. Their first language can support new learning while also affecting it through transfer, so early progress and final success address different aspects of acquisition.",
        "children": []
      }
    ],
    "l2-learning-03": [
      {
        "text": "Language development includes learning concepts as well as learning how a language expresses them. Understanding that an object is inside or outside another is different from knowing the words for that relationship. A later learner can already possess the concept without knowing its L2 expression.",
        "children": []
      },
      {
        "text": "This gives **second-language learners** an advantage for some kinds of learning. They can connect new forms with familiar events, objects, and spatial relationships. They are not acquiring every part of the conceptual system from the beginning.",
        "children": []
      },
      {
        "text": "Their **first language** also provides established patterns for expressing those relationships. Some transfer effectively, while others conflict with the new language. Adult acquisition therefore combines conceptual resources with the continuing influence of an already organized linguistic system.",
        "children": []
      }
    ],
    "l2-learning-04": [
      {
        "text": "**Transfer** occurs when processes or representations from a **first language, L1**, influence a **second language, L2**. A familiar way of hearing a sound, arranging a sentence, or retrieving a word remains available during new learning. The learner does not approach L2 without prior linguistic organization.",
        "children": []
      },
      {
        "text": "**Positive transfer** occurs when that organization fits the new requirement. An established distinction or form provides useful support. **Negative transfer** occurs when the old pattern favors an interpretation or response that does not fit L2.",
        "children": []
      },
      {
        "text": "Transfer is therefore not inherently a benefit or an error. Its effect depends on the relationship between the languages. A category useful in L1 can make L2 easier when the distinction matches, but harder when the new language requires separating sounds that L1 groups together.",
        "children": []
      }
    ],
    "l2-learning-05": [
      {
        "text": "Hindi distinguishes **dental and retroflex consonants**, while English listeners often assimilate both to an **alveolar** category. Dental articulation involves the teeth. Alveolar articulation is near the ridge behind them, while retroflex articulation involves a tongue configuration farther back.",
        "children": []
      },
      {
        "text": "In Hindi **minimal pairs**, changing only that consonant changes word identity. The examples distinguish meanings such as pressure from a kind of fruit, or a saw from crooked. A listener who hears both consonants as equivalent loses a distinction the language uses for meaning.",
        "children": []
      },
      {
        "text": "English experience produces **acquired similarity** among sounds grouped within its category. Applying that grouping to Hindi reduces their perceived difference. Negative transfer can therefore arise from successful earlier learning, because the learner must now distinguish inputs previously treated as versions of the same sound.",
        "children": []
      }
    ],
    "l2-learning-06": [
      {
        "text": "A **classifier** is a grammatical form chosen in relation to a noun. Chinese requires choices in expressions for objects such as chairs, dogs, cars, and books where English does not make the same grammatical selection. The learner must use properties that English allowed to remain irrelevant to this operation.",
        "children": []
      },
      {
        "text": "**Gè** is a general classifier. **Bǎ** applies to handled objects, **běn** to books and related objects, and **kuài** to pieces. **Liàng** applies to wheeled vehicles and **tái** to devices or gadgets. These choices connect forms with properties of the noun’s referent.",
        "children": []
      },
      {
        "text": "**Xiē** expresses an indeterminate plural quantity, **zhāng** is associated with flat objects, and **zhī** with long thin objects. Acquiring the system requires learning the appropriate grammatical category as well as the object name. Understanding what the object is does not automatically supply the classifier required with its noun.",
        "children": []
      }
    ],
    "l2-learning-07": [
      {
        "text": "**Grammatical gender** divides nouns into classes and affects related forms. It does not mean that an object has a social or cultural gender. French **livre** is grammatically masculine and **liberté** feminine without making a book socially male or liberty socially female.",
        "children": []
      },
      {
        "text": "**Agreement** requires forms such as adjectives and pronouns to fit the noun’s class. The learner must retrieve that class even when the object offers no obvious cue. Similar meanings can have different genders, as in **auto/voiture, rivière/fleuve, and vélo/bicyclette**.",
        "children": []
      },
      {
        "text": "Word endings provide useful statistical patterns. The examples associate forms such as **-age, -r, -t, and -sme** with masculine nouns, and **-ie, -ion, -ité/-tié, -ance, -me, -mme, and -lle** with feminine nouns. Learning therefore involves form and lexical knowledge as well as meaning. A meaning-only strategy cannot supply every gender and agreement choice.",
        "children": []
      }
    ],
    "l2-learning-08": [
      {
        "text": "**Cognates** are similar words sharing a historical origin. **Loan words** enter one language by borrowing from another. Both can make an L2 form partly familiar because the learner already knows a related form or meaning.",
        "children": []
      },
      {
        "text": "French **auto, rivière, and bicyclette** resemble forms associated with a car, river, and bicycle. Japanese **コロッケ, korokke**, refers to a croquette, while **モノレール, monoreru**, refers to a monorail. Borrowing can preserve recognizable overlap while adapting spelling and pronunciation.",
        "children": []
      },
      {
        "text": "These existing connections provide **positive vocabulary transfer**. The learner has information to connect with the new expression instead of starting with a wholly unfamiliar association. The advantage depends on the relationship actually supporting the intended form and meaning.",
        "children": []
      }
    ],
    "l2-learning-09": [
      {
        "text": "A **false friend** is a similar form that encourages an incorrect meaning across languages. Familiarity with its appearance or sound can create confidence without supplying the right interpretation. Similarity alone does not establish equivalent meanings.",
        "children": []
      },
      {
        "text": "Spanish **embarazado** concerns pregnancy rather than ordinary embarrassment. **“Arnold esta embarazado”** therefore does not convey the intended English idea that Arnold is embarrassed. The error comes from relying on a familiar-looking form whose meaning differs.",
        "children": []
      },
      {
        "text": "An L2 word can activate a similar L1 word during recognition or learning. Matching meanings can make that activation helpful, while different meanings make it misleading. The same general reliance on overlap can therefore produce positive transfer or a false interpretation.",
        "children": []
      }
    ],
    "l2-learning-10": [
      {
        "text": "**De Groot and Keijzer (2000)** used **paired-associate learning** to examine how known vocabulary supports new forms. Participants learned Dutch words paired with invented associates and were tested again after **one week**. This separated immediate learning from retention after a delay.",
        "children": []
      },
      {
        "text": "**Gitaar–gettar** is concrete and cognate-like, while **tijger–duunze** is concrete without the resemblance. **Domein–domaan** is abstract and cognate-like, while **herstel–groop** is abstract without the form overlap. The meanings include guitar, tiger, domain, and repair.",
        "children": []
      },
      {
        "text": "**Concreteness** concerns how readily the referent can be imagined, while cognate-like status concerns form similarity. Crossing those factors tests whether resemblance helps within both kinds of meaning. Participants must still learn the correct association rather than merely notice that two strings look alike.",
        "children": []
      }
    ],
    "l2-learning-11": [
      {
        "text": "**Cognate-like forms were learned faster and retained better** than dissimilar forms. The difference was especially visible early in learning. Repeated practice allowed some non-cognate conditions to approach cognates in immediate recall, but matching immediate accuracy did not make the learned associations equivalent.",
        "children": []
      },
      {
        "text": "After **one week without training**, cognate advantages remained. Abstract non-cognates showed a particularly large loss. The delayed result distinguishes being able to answer after recent practice from retaining that information when practice stops.",
        "children": []
      },
      {
        "text": "**Response times** also favored cognates. Their benefit therefore included more successful retrieval and faster access. Accuracy and speed capture different aspects of learning, and form overlap supported both rather than only making the first encounter feel familiar.",
        "children": []
      },
      {
        "text": "The delay separates a practiced response from a durable association. Two conditions can approach similar accuracy immediately after repeated training while differing in how readily the information is recovered later. Measuring response speed as well as correctness makes that difference visible even when both groups can often supply an answer.",
        "children": []
      }
    ],
    "l2-learning-12": [
      {
        "text": "A **receptive test** presents the unfamiliar associate and asks for its known Dutch partner. For cognate-like pairs such as **gitaar–gettar, trein–trien, and viool–vialo**, resemblance can help identify the familiar word. Correct responses in that direction alone could partly reflect recognition or guessing from the input.",
        "children": []
      },
      {
        "text": "A **productive or expressive test** reverses the direction. The Dutch word is supplied, and the learner must retrieve the unfamiliar form. Knowing gitaar does not automatically provide the exact learned associate gettar without some memory of the new pairing.",
        "children": []
      },
      {
        "text": "Testing both directions distinguishes access to a familiar meaning from the ability to generate a new form. A resemblance advantage in productive recall provides evidence that similarity supported learning itself. It cannot be explained entirely by recognizing the old word when a new look-alike is presented.",
        "children": []
      }
    ],
    "l2-learning-13": [
      {
        "text": "Both **productive and receptive recall** decreased after a week. Producing the unfamiliar form was harder overall than identifying its familiar partner. The two directions impose different demands because one requires generating the newly learned expression.",
        "children": []
      },
      {
        "text": "**Concrete forms** were better retained than abstract forms, and **cognates** were better retained than non-cognates. These advantages appeared in both directions. Practice had not made every condition equally resistant to forgetting.",
        "children": []
      },
      {
        "text": "The productive advantage matters for interpreting the cognate effect. Learners had to supply the new form rather than merely guess a known word from resemblance. Similarity therefore supported a retrievable association, although the level of success still depended on the type of material, direction of testing, and delay.",
        "children": []
      }
    ],
    "l2-learning-14": [
      {
        "text": "**Cross-language competition** occurs when a word from one language receives activation during use of another. That candidate may never become an intended or permitted answer. Partial activation can still influence processing before the correct word is selected.",
        "children": []
      },
      {
        "text": "**Marian and Spivey (2003)** tested whether similar **L1 words** become active during **L2 recognition**. Their visual-world task included objects whose names overlapped with the target across languages. Eye movements measured temporary attraction to those alternatives.",
        "children": []
      },
      {
        "text": "Looking at an object with a competing L1 name provides evidence beyond the final answer. Participants do not have to deliberately translate the target for its sounds to activate another language. The question is which candidates receive support during recognition in the designated task language.",
        "children": []
      }
    ],
    "l2-learning-15": [
      {
        "text": "**Eye tracking** records temporary competition during spoken-word recognition. In **McMurray and colleagues’ task**, listeners viewed **bear, pear, lamp, and ship** while hearing a /b/–/p/ continuum. Bear and pear supplied close lexical alternatives, while the other objects did not.",
        "children": []
      },
      {
        "text": "Changing **voice onset time**, the timing of voicing relative to release, changed the ambiguity of the input. Sounds nearer the category boundary produced more competitor looking. A listener could look at the alternative and still click the correct target.",
        "children": []
      },
      {
        "text": "The final click therefore identifies the winner without recording every candidate involved beforehand. The eyes provide a time-sensitive measure of support for those candidates. This makes the method useful for testing an alternative that never becomes the participant’s overt answer.",
        "children": []
      }
    ],
    "l2-learning-16": [
      {
        "text": "A **cohort competitor** shares the beginning of a target word. **Beetle** competes early with **beaker**, while **speaker** shares its ending and is a rhyme competitor. **Carriage** provides an unrelated comparison. The position of overlap affects when a candidate receives matching evidence.",
        "children": []
      },
      {
        "text": "In **Allopenna and colleagues’ (1994) task**, looks toward the target and cohort rise early. Later sounds fit beaker but not beetle, so target looks continue increasing while cohort looks decline. The initial match does not guarantee continued support.",
        "children": []
      },
      {
        "text": "Rhyme competition occurs later because its overlap becomes useful at a different point. Recognition therefore changes as the signal unfolds. Eye movements can record those temporary candidates even when the participant ultimately identifies the word correctly.",
        "children": []
      }
    ],
    "l2-learning-17": [
      {
        "text": "**Marian and Spivey** tested Russian–English bilinguals for **cross-language cohort competition**. English **speaker** begins similarly to Russian **спички, spichki**, meaning matches. The picture of matches can therefore become a competitor through its Russian name during an English instruction.",
        "children": []
      },
      {
        "text": "**Spear** provides a within-English competitor. A display can contain that object, the Russian-name competitor, or both. Comparing these displays separates competition within the selected language from competition supplied by the other vocabulary.",
        "children": []
      },
      {
        "text": "Other pairs include **boot–buben**, referring to a tambourine, **chair–cherepaha**, referring to a turtle, and **marker–marka**, referring to a stamp. Their relationship is **phonological**, meaning sound-based. Speaker and matches do not share a meaning, so looks toward matches must be related to its other-language name rather than semantic similarity between the objects.",
        "children": []
      }
    ],
    "l2-learning-18": [
      {
        "text": "During **L2 English recognition**, both within-language and between-language competitors attracted more looks than unrelated objects. A Russian-name alternative could therefore receive support while the listener was following English. Selecting a task language did not prevent all activation of the other vocabulary.",
        "children": []
      },
      {
        "text": "When both kinds of competitor appeared together, the **within-language competitor was stronger**. The Russian-name competitor nevertheless attracted more attention than the unrelated control. Competition across languages remained present even when another plausible alternative was available.",
        "children": []
      },
      {
        "text": "These effects concern temporary activation rather than a requirement to choose the wrong object. A participant can complete the English instruction correctly after looking at an L1-supported candidate. Recognition therefore includes alternatives beyond the final intended response.",
        "children": []
      },
      {
        "text": "When just one competitor was present, within-language and between-language alternatives attracted looking to a similar extent. Their unequal strength became clearer when both were available together. The presence of other candidates therefore changed the competition, without eliminating the influence of the other-language name.",
        "children": []
      }
    ],
    "l2-learning-19": [
      {
        "text": "During **L1 Russian recognition**, within-language competitors reliably attracted more looks than controls. The native-language cohort effect remained whether that competitor appeared alone or alongside the other-language alternative. Similar beginnings therefore affected recognition within Russian.",
        "children": []
      },
      {
        "text": "English-name competitors produced a smaller numerical increase over controls, but the difference was **not statistically significant**. The observed trend did not establish a reliable reverse cross-language effect. A numerical difference and a supported effect are not interchangeable.",
        "children": []
      },
      {
        "text": "The reported pattern was **asymmetric**. L1 words affected L2 recognition more clearly than L2 words affected L1 recognition. An explanation must account for unequal influence in the two directions rather than assuming that both vocabularies activate one another with identical strength.",
        "children": []
      }
    ],
    "l2-learning-20": [
      {
        "text": "The **Revised Hierarchical Model**, associated with **Kroll and Stewart**, connects L1 words, L2 words, and concepts. **Spreading activation** means activity at one representation influences connected representations. A lexical connection joins words, while a conceptual connection links a word with its meaning.",
        "children": []
      },
      {
        "text": "The **L1 lexicon** is larger and more strongly connected to concepts. A developing **L2 lexicon** has stronger links toward L1 than the reverse direction. Early use of L2 often relies on the established L1 counterpart to support access to meaning.",
        "children": []
      },
      {
        "text": "Unequal connection strengths predict unequal effects. Activity can spread from an L2 word toward L1 more readily than in reverse. The model allows both languages to interact without assuming equivalent routes to their word forms and shared concepts.",
        "children": []
      }
    ],
    "l2-learning-21": [
      {
        "text": "In the **Revised Hierarchical Model**, the matches picture activates the concept of matches. This can activate its Russian name, **spichki**, which partly overlaps in sound with the English target **speaker**. The competing word can then reinforce its associated concept.",
        "children": []
      },
      {
        "text": "Stronger support for that concept contributes to looking at the matches picture. The relationship between speaker and spichki is **sound overlap**, not shared meaning. Activating the competing word strengthens the representation of its own object rather than making speakers and matches semantically equivalent.",
        "children": []
      },
      {
        "text": "**Kroll and Stewart (1990, 1994)** explain directional differences through unequal lexical and conceptual connections. Weaker routes involving L2 can make reverse interference less reliable during an L1 task. The mechanism involves the strength and direction of activation without requiring deliberate translation.",
        "children": []
      }
    ],
    "l2-learning-22": [
      {
        "text": "A **balanced bilingual** has relatively strong proficiency in both languages. In this model, increasing proficiency does not create **“two monolinguals in one.”** Both vocabularies can remain linked through concepts and interacting pathways.",
        "children": []
      },
      {
        "text": "**Competitive dynamics** means that active alternatives affect which representation is selected. **Inhibition** reduces candidates inappropriate for the current task. Strong knowledge of both languages can preserve control demands because both systems contain available alternatives.",
        "children": []
      },
      {
        "text": "These predictions motivated work on **nonlinguistic cognitive control**. The immediate language-model claim is that proficiency does not remove interaction. A balanced bilingual can recognize a word correctly while still managing competition from representations belonging to the other language.",
        "children": []
      }
    ],
    "l2-learning-23": [
      {
        "text": "One language history involves learning **L1**, adding **L2**, and continuing to use both. The first language keeps receiving practice and input. Its early acquisition is followed by maintenance rather than disappearance from the environment.",
        "children": []
      },
      {
        "text": "Another history involves adding L2 and **stopping L1 use**. The first language no longer receives the same repeated activation. A language learned early can therefore have a very different subsequent history from another equally early language.",
        "children": []
      },
      {
        "text": "Current ability depends on more than the original starting age. Continued exposure, reduced use, and later dominance change the opportunities for earlier learning to remain accessible. Comparing bilingual outcomes requires distinguishing an early start from ongoing support for the first language.",
        "children": []
      }
    ],
    "l2-learning-24": [
      {
        "text": "**Pallier and colleagues** studied adults adopted from Korean orphanages into French homes. They were adopted between **three and eight years** and tested as adults. Their early Korean experience was followed by a major shift to a French-speaking environment.",
        "children": []
      },
      {
        "text": "The question concerned **residual Korean knowledge**, meaning a surviving influence of the earlier language. An individual might no longer use Korean while retaining some advantage on tasks sensitive to its sounds or words. Current fluency and detectable traces are different outcomes.",
        "children": []
      },
      {
        "text": "French speakers without that early history provided a comparison. Better Korean-related performance among adoptees would indicate a retained effect of childhood exposure. The study tested the persistence and accessibility of learning after continued use of the original language had ended.",
        "children": []
      }
    ],
    "l2-learning-25": [
      {
        "text": "Korean distinguishes **aspirated, plain, and tense stops**. Stops involve closure followed by release, but these three categories can occur at the same place in the mouth. Their difference therefore cannot be reduced to where the closure is made.",
        "children": []
      },
      {
        "text": "The contrast occurs in **bilabial, dental, and velar series**. The examples include grass, fire, and horn in one series, and mask, moon, and daughter in another. Changing the laryngeal category can distinguish words even when the place of articulation remains the same.",
        "children": []
      },
      {
        "text": "**Laryngeal** refers to the voice-producing system and its configuration or timing. Retaining the Korean contrast requires sensitivity to that three-way organization. A language without the same categories supplies a different starting pattern, even if its speakers can distinguish lip-produced from tongue-produced stops.",
        "children": []
      }
    ],
    "l2-learning-26": [
      {
        "text": "**Ventureyra and colleagues** tested Korean adoptees in France alongside French and Korean listeners. Comparisons included **plain–tense, plain–aspirated, and tense–aspirated stops**. Vowel differences and identical pairs provided additional auditory judgments.",
        "children": []
      },
      {
        "text": "**Native Korean listeners** discriminated the stop distinctions more successfully. Adoptees performed no better than monolingual French listeners on those contrasts. The experiment therefore did not detect a retained phonetic advantage from their childhood Korean exposure.",
        "children": []
      },
      {
        "text": "Their performance on vowel and same trials differed from the difficult consonant comparisons. The result was not simply a failure to perform any auditory task. It specifically concerned accessible sensitivity to the tested Korean contrasts after the language environment had changed.",
        "children": []
      }
    ],
    "l2-learning-27": [
      {
        "text": "**Pallier and colleagues** used several tasks to search for remaining Korean knowledge. In **language identification**, adoptees distinguished Korean sentences from **Japanese, Polish, Swedish, and Wolof**. They did not reliably outperform monolingual French comparison listeners.",
        "children": []
      },
      {
        "text": "**Word recognition** tested selection of Korean translations for French words. **Speech-segment detection** tested whether a brief excerpt had occurred in a recorded sentence. Neither provided a dependable adoptee advantage.",
        "children": []
      },
      {
        "text": "The tasks examined different possible remnants, including familiarity with the language, vocabulary, and sound sequences. Earlier exposure did not produce a detectable current benefit on these measures. This describes what the tests could access, rather than directly establishing that every possible influence of early learning had disappeared.",
        "children": []
      }
    ],
    "l2-learning-28": [
      {
        "text": "Hearing **French** activated the adoptees’ broad **language network**, including **superior temporal and inferior frontal regions**. Their current dominant language therefore produced a clear neural response. The system was not generally unresponsive to speech.",
        "children": []
      },
      {
        "text": "Comparisons involved French alongside **Polish, Japanese, and Korean**. The analysis tested whether Korean produced a distinctive retained effect relative to the other speech. The French-minus-Korean comparison did not reveal the expected group difference associated with an accessible childhood-language advantage.",
        "children": []
      },
      {
        "text": "The imaging findings agreed with the absence of a detectable behavioral advantage under the tested conditions. These are measurements of current responses to speech. They do not directly count every connection or establish what renewed training might make available.",
        "children": []
      }
    ],
    "l2-learning-29": [
      {
        "text": "A language is supported by **connections within and between brain regions**. Repeated use affects those connections and their influence. L1 is therefore not a single stored object remaining unchanged independently of experience.",
        "children": []
      },
      {
        "text": "If **L1 stops receiving activation**, pathways associated with L2 can become dominant. **Competitive dynamics** describes this changing balance. Increasing use and support for one pattern can reduce the effective influence of another within the same broad system.",
        "children": []
      },
      {
        "text": "The proposal resembles **experience-dependent competition in vision**. Reduced input changes which pathways remain effective. Apparent replacement of a language can therefore result from changes in support and accessibility, rather than requiring a complete language object to be physically removed or transferred elsewhere.",
        "children": []
      }
    ],
    "l2-learning-30": [
      {
        "text": "**Residual knowledge** is a surviving influence of earlier language experience. It may not provide an advantage on an ordinary current-performance test. Being unable to use the language readily is different from having no remaining effect of that learning.",
        "children": []
      },
      {
        "text": "**Relearning** supplies renewed opportunities to activate earlier forms. Training can expose an influence that was not accessible before practice. A past language history might therefore affect how readily a person learns the forms again.",
        "children": []
      },
      {
        "text": "Current recognition and later learning test different consequences of experience. One asks what can be used now, while the other asks whether new exposure benefits from something retained. A lack of present fluency does not by itself answer the relearning question.",
        "children": []
      }
    ],
    "l2-learning-31": [
      {
        "text": "**Au and colleagues** studied students who had often overheard **Spanish in childhood** without learning to speak it. They began classroom Spanish around **age fourteen** and were tested after a second-year college course. Early listening was therefore followed much later by active instruction.",
        "children": []
      },
      {
        "text": "Their pronunciation was more native-like than that of typical late learners. **Voice onset time, or VOT,** for initial voiceless stops was closer to the native pattern, and accent ratings also favored overhearers. **Lenition**, the weakening of particular consonant articulations, provided further pronunciation measures.",
        "children": []
      },
      {
        "text": "The benefit was not uniform across language. Childhood slang knowledge remained well below native levels, and morphology and grammaticality judgments were closer to typical late learners than native speakers. Early hearing supported some sound patterns without producing native-like mastery of every component.",
        "children": []
      },
      {
        "text": "The students were not fluent childhood Spanish speakers simply retaining a practiced skill. They had frequently heard Spanish but began active classroom learning much later. Their later pronunciation advantage concerns a benefit of that earlier listening history after renewed instruction, alongside continuing weaknesses on other language measures.",
        "children": []
      }
    ],
    "l2-learning-32": [
      {
        "text": "When **L1 disappears from the environment**, L2 can appear to replace it in current behavior. Recognition or language identification may reveal no obvious advantage from childhood exposure. That outcome concerns access under the conditions being tested.",
        "children": []
      },
      {
        "text": "**Renewed learning** offers a different opportunity for residual knowledge to contribute. Earlier experience can affect practice even when it does not produce a clear untrained response. Present inability and absence of all learning effects are therefore distinct claims.",
        "children": []
      },
      {
        "text": "Korean-adoptee studies test accessibility after a major language shift. Childhood-overhearer studies include performance after renewed formal instruction. Their histories and tests provide different opportunities for early learning to matter, so the results should not be treated as identical measures of the same exposure pattern.",
        "children": []
      }
    ],
    "l2-learning-33": [
      {
        "text": "**Korean is rarely encountered in France**, while **Spanish is widely available in Los Angeles**. A person may continue hearing a childhood language through family or community without speaking it. Continued incidental exposure therefore differs across the histories being compared.",
        "children": []
      },
      {
        "text": "The language pairs also differ in **cognates and writing systems**. Familiar forms can support vocabulary learning, and shared writing conventions provide another kind of overlap. Later outcomes can reflect these advantages alongside the original childhood experience.",
        "children": []
      },
      {
        "text": "Comparing residual knowledge requires considering the **duration, form, and social setting of exposure**. Continued hearing, renewed instruction, and language similarity can each change performance. Having encountered a language early does not make all subsequent opportunities for maintaining or recovering it equivalent.",
        "children": []
      }
    ],
    "l2-sensitive-01": [],
    "l2-sensitive-02": [
      {
        "text": "**Lenneberg (1967)** linked language-learning conditions to the development of **cerebral dominance**. This means increasing specialization of the hemispheres. **Language laterality** describes how strongly language functions depend on one side rather than the other.",
        "children": []
      },
      {
        "text": "His proposal combined typical language milestones with observations about neural development and injury. Children often achieved better language outcomes than adults after extensive damage or surgery. Such outcomes suggested that the organization supporting language changes with age.",
        "children": []
      },
      {
        "text": "The hypothesis concerns the brain’s **maturational state**. Greater early flexibility could allow functions to develop through different tissue after injury, while a more specialized adult system has fewer possibilities for reassignment. This is a proposed change in organization, rather than simply an effect of how many words a learner has heard.",
        "children": []
      }
    ],
    "l2-sensitive-03": [
      {
        "text": "Evidence about **first-language sensitive periods** often comes from rare injuries or unusual deprivation histories. Such cases differ in many individual circumstances. Delayed language can occur alongside changes in health, social experience, or other developmental conditions.",
        "children": []
      },
      {
        "text": "**Second-language acquisition** is more common and begins across a broad range of ages. Larger groups provide variation in starting age and eventual attainment. Researchers can compare these patterns without relying entirely on a few exceptional first-language cases.",
        "children": []
      },
      {
        "text": "The question is whether age at the beginning of learning predicts later proficiency. L2 learners already possess a first language, so the comparison is not identical to delayed first-language acquisition. Both prior linguistic knowledge and later experience must be considered when interpreting an age relationship.",
        "children": []
      }
    ],
    "l2-sensitive-04": [
      {
        "text": "**Johnson and Newport** tested **46 Korean- or Chinese-speaking immigrants** who arrived in the United States between **ages 3 and 39**. They had substantial subsequent English experience. The study compared eventual proficiency rather than only progress during the first weeks of exposure.",
        "children": []
      },
      {
        "text": "Participants listened to English sentences and judged their grammaticality across several constructions. Earlier arrivals generally performed better. Before puberty, increasing arrival age strongly predicted lower accuracy, while adult-arrival scores were lower but much more variable.",
        "children": []
      },
      {
        "text": "Measured differences in English experience, motivation, self-consciousness, and American identification did not explain the reported pattern. Johnson and Newport interpreted it as evidence for an effect of **maturational state**. The observed age–performance relationship and that proposed biological explanation are related but distinct parts of the argument.",
        "children": []
      }
    ],
    "l2-sensitive-05": [
      {
        "text": "A **grammaticality judgment task, or GJT**, asks whether a sentence follows the language’s grammar. Johnson and Newport used an **untimed** task with recorded sentences. A participant judged the form rather than simply deciding whether the described event was sensible.",
        "children": []
      },
      {
        "text": "**“Two pigs” versus “two pig”** tests plural marking. **“Is speaking” versus “is speak”** tests the required verb form. **“Reading a book” versus “reading book”** tests the article, while **“The boys” versus “A boys”** tests another determiner relationship.",
        "children": []
      },
      {
        "text": "**“Larry went home” versus “went the home”** tests a context in which an article is inappropriate. **“When will Sam fix his car?”** and **“What do they sell at the corner store?”** test English question structure against versions lacking the required auxiliary arrangement. The score combines several grammatical demands rather than one repeated rule.",
        "children": []
      }
    ],
    "l2-sensitive-06": [
      {
        "text": "**Age of arrival, or AOA**, related differently to accuracy in early and late arrivals. For the **3–15-year** range, the correlation was about **−0.87**. Later arrival strongly accompanied lower grammaticality scores within that group.",
        "children": []
      },
      {
        "text": "For **17–39-year** arrivals, the correlation was about **−0.16**. Scores were lower overall but widely dispersed, with only a weak ordering by arrival age. An older adult arrival did not reliably score below every younger adult arrival.",
        "children": []
      },
      {
        "text": "The pattern is therefore not one equally strong decline throughout life. It combines a pronounced childhood gradient with substantial variation among later learners. Keeping those ranges separate preserves what the data actually contribute to the developmental argument.",
        "children": []
      }
    ],
    "l2-sensitive-07": [
      {
        "text": "Learners arriving **by about age eight** often performed near the native level on the grammaticality task. Later childhood arrival was associated with progressively lower scores. The early sample therefore contained both a very high-performing youngest range and a decline further into childhood.",
        "children": []
      },
      {
        "text": "Adult-arrival scores varied much more without the same strong age ordering. The description **“nearly random distribution”** refers to that weak relationship between adult arrival age and score. It does not mean that these learners answered the test at chance.",
        "children": []
      },
      {
        "text": "Adults with similar starting ages could differ substantially. Early learning had a population advantage, while later performance left more individual variation to explain. A description based only on average early and late scores would miss the different relationships within those groups.",
        "children": []
      }
    ],
    "l2-sensitive-08": [
      {
        "text": "**Johnson and Newport** interpreted the childhood decline as a reduction in **language-learning capacity with development**. Early exposure occurred in a more favorable maturational state. Later learners encountered English after those conditions had changed.",
        "children": []
      },
      {
        "text": "The timing did not reproduce every feature of **Lenneberg’s** proposal. His account relied on sparse neural evidence across much of childhood. The grammaticality study supplied a behavioral pattern rather than directly measuring the proposed change in the brain.",
        "children": []
      },
      {
        "text": "They related the wide spread among late learners to greater reliance on **individual learning abilities**. Under this interpretation, successful later acquisition depends less uniformly on the processes supporting ordinary early acquisition. The account connects a regular early advantage with more varied routes to later success.",
        "children": []
      }
    ],
    "l2-sensitive-09": [
      {
        "text": "The **exercise hypothesis** proposes an early superior capacity for acquiring languages. If it is unused during the favorable period, it declines with maturation. If exercised through early language acquisition, it remains available for learning further languages throughout life.",
        "children": []
      },
      {
        "text": "The **maturational-state hypothesis** also proposes an early advantage, but its decline occurs even after successful childhood language learning. Using the ability does not permanently preserve the same developmental state. Early L1 acquisition can therefore coexist with reduced later L2-learning capacity.",
        "children": []
      },
      {
        "text": "The disagreement concerns what early use protects. Exercise predicts continued availability after a normal first language. Maturational state predicts that the learning conditions still change with development. Later learners who already possess L1 provide an important comparison between these predictions.",
        "children": []
      }
    ],
    "l2-sensitive-10": [
      {
        "text": "**Implicit knowledge** supports language use without conscious rule explanation. In **Ellis’s (2005)** distinction, it is procedural and accessed automatically during fluent performance. A person can use a construction appropriately without being able to state the rule governing it.",
        "children": []
      },
      {
        "text": "**Explicit knowledge** consists of consciously available grammatical information. It can be verbalized and used through deliberate, controlled processing. In this theoretical comparison, learning such information remains possible at any age.",
        "children": []
      },
      {
        "text": "An **untimed GJT** can permit **metalinguistic knowledge**, meaning conscious knowledge about language. A participant may inspect the form and recall a taught rule. The proposed developmental restriction concerns implicit acquisition, so success on a task drawing on both kinds of knowledge is not a pure measure of automatic language use.",
        "children": []
      },
      {
        "text": "A grammatical answer can be reached by automatically recognizing the form or by consciously applying a rule. The identical response does not identify which route produced it. Test timing and emphasis on meaning or form affect the opportunity to use those routes.",
        "children": []
      }
    ],
    "l2-sensitive-11": [
      {
        "text": "Different tasks draw on different kinds of linguistic knowledge. An **untimed GJT** allows deliberate attention to form and consultation of explicit rules. Imitation and oral narrative emphasize meaning under more pressured conditions, leaving different opportunities for conscious checking.",
        "children": []
      },
      {
        "text": "In **Ellis (2005)**, formal instruction was related to untimed judgments of ungrammatical items, with a correlation around **0.27**. Starting age had a significant relationship with the **timed GJT**, around **−0.23**, but little relationship with the relevant untimed judgments.",
        "children": []
      },
      {
        "text": "The pattern connects test design with the knowledge available for answering. Unlimited time can make a task more sensitive to taught rules than fluent performance is. Interpreting an age effect therefore requires identifying whether the measure favors automatic use, deliberate analysis, or a mixture.",
        "children": []
      }
    ],
    "l2-sensitive-12": [
      {
        "text": "**Typological similarity** concerns how similarly languages organize their forms. An L1 structure resembling an L2 structure can provide positive transfer. A different starting system can instead leave the learner acquiring distinctions that prior language use did not require.",
        "children": []
      },
      {
        "text": "Johnson and Newport tested **Chinese- and Korean-speaking learners of English**. Those pairings do not offer the same transfer opportunities as every other first language. An observed age pattern belongs to learners bringing particular linguistic systems to English.",
        "children": []
      },
      {
        "text": "**Cognates, loan words, and grammatical similarities** can each supply familiar information. Language pairing therefore contributes to what must be learned and what is already partly supported. Age cannot be interpreted independently of these differences in the learning problem.",
        "children": []
      }
    ],
    "l2-sensitive-13": [
      {
        "text": "English constructions differ in difficulty for later learners. **Progressive -ing and word order** are relatively easy in the reported comparison. **Determiners and plural marking** produce larger costs for some later-arriving groups. Age does not reduce every grammatical ability by the same amount.",
        "children": []
      },
      {
        "text": "The tested categories also include **verb subcategorization**, meaning which complements a verb permits, along with past tense, pronouns, particles, auxiliaries, third-person singular forms, and questions. Each introduces requirements that can differ from the learner’s L1.",
        "children": []
      },
      {
        "text": "Some patterns resemble child development, while others fit **transfer**. Chinese lacks the same determiner system as English, creating a particular learning demand. Questions that develop relatively late in children can be easier for older L2 learners. The required construction and existing knowledge both affect the outcome.",
        "children": []
      }
    ],
    "l2-sensitive-14": [
      {
        "text": "**Birdsong and Molis (2001)** tested **Spanish-speaking learners of English**. Their age-of-arrival pattern differed from Johnson and Newport’s Korean- and Chinese-speaking sample. The relationship changed when the language pairing changed.",
        "children": []
      },
      {
        "text": "Spanish-speaking early arrivals remained high-performing without the same strong childhood decline. Their early correlation was about **−0.23**. Among late arrivals, the negative relationship was stronger, about **−0.69**, unlike the weak adult relationship in the earlier study.",
        "children": []
      },
      {
        "text": "A single fixed maturational cutoff does not explain both patterns by itself. Transfer opportunities and learning histories must also be considered. The comparison concerns differences in the shape of the age–attainment relationship, beyond a general claim that starting earlier is advantageous.",
        "children": []
      }
    ],
    "l2-sensitive-15": [
      {
        "text": "**Later L2 learners generally have lower ultimate attainment**, but the measured outcome depends on the constructions, task, and language pairing. A grammaticality score describes performance on particular items under particular conditions. It does not directly represent every component of language ability.",
        "children": []
      },
      {
        "text": "**Age of acquisition** is related to the amount and quality of experience. **Transfer** changes which new distinctions are supported by existing knowledge. Learners sharing an arrival age can differ in both their linguistic starting point and their subsequent opportunities to use the language.",
        "children": []
      },
      {
        "text": "**Competence and performance** must also be distinguished. Deliberate rule checking and rapid fluent use can produce different outcomes. Explaining age-related success therefore requires identifying which knowledge and demands contribute to the observed score, rather than treating all tests as one uniform measure of maturation.",
        "children": []
      }
    ],
    "l2-sensitive-16": [],
    "review-1": [],
    "review-2": [
      {
        "text": "A **speech continuum** contains sounds that change gradually along a controlled acoustic property. Here, **F1 stays constant while F2 onset frequency changes linearly** across thirteen stimuli. A linear change means that each neighboring pair differs by the same programmed amount.",
        "children": []
      },
      {
        "text": "When F2 begins below the stable vowel frequency, its transition rises. Higher starting frequencies make the transition flatter and then produce a falling transition. The acoustic property changes gradually throughout this sequence, even if the listener begins assigning a different consonant label at particular positions.",
        "children": []
      },
      {
        "text": "Equally spaced pairs can fall within one category or cross a category boundary. Comparing those pairs holds their physical separation constant. If a boundary-crossing pair is easier to distinguish, its advantage cannot be explained simply by a larger change in the synthesized signal.",
        "children": []
      }
    ],
    "review-3": [
      {
        "text": "An **ideal observer model** describes responses expected under a particular account of perception. In a **noncategorical** account, uncertainty grows gradually as a sound moves away from a clear category example. That clear example is called a **prototype**. A sound between prototypes can resemble more than one category to different degrees.",
        "children": []
      },
      {
        "text": "The continuum extends from **/b/** through **/d/** to **/g/**. Moving away from the /b/ prototype gradually reduces support for /b/ and increases support for /d/. The proposed response to stimulus 2 is about **75% /b/ and 25% /d/**, representing partial uncertainty rather than an immediate change in identity.",
        "children": []
      },
      {
        "text": "The same gradual exchange occurs between /d/ and /g/. Labeling becomes blurry between prototypes because two labels are plausible. This account predicts smooth changes across the continuum, rather than sharp switches confined to narrow category boundaries.",
        "children": []
      }
    ],
    "review-4": [
      {
        "text": "A **labeling task** asks a listener to identify a sound as /b/, /d/, or /g/. A **discrimination task** asks whether two sounds are the same or different. Naming a category and detecting an acoustic difference are separate responses, even when both tasks use the same continuum.",
        "children": []
      },
      {
        "text": "If sensitivity to F2 onset is **linear**, equal acoustic differences should be equally noticeable. Sounds 1 and 3 should be about as easy to distinguish as sounds 5 and 7 because each pair has the same physical separation. Their position along the continuum should not by itself change discrimination.",
        "children": []
      },
      {
        "text": "This account predicts **discrimination independent of labeling**. Choosing among three names produces rises and falls in labeling responses near the prototypes. Detecting equally sized physical differences should remain approximately constant, rather than becoming better specifically where a label changes.",
        "children": []
      },
      {
        "text": "A listener can be uncertain which of two names to choose while still hearing that two sounds differ. The model therefore makes separate predictions for the two tasks. A labeling peak is not automatically a prediction of a discrimination peak at the same position.",
        "children": []
      }
    ],
    "review-5": [
      {
        "text": "**Liberman and colleagues (1957)** found sharp changes in consonant identification across an evenly changing acoustic continuum. Early stimuli mainly received **/b/** labels, middle stimuli **/d/** labels, and later stimuli **/g/** labels. The changes near category boundaries were more abrupt than the gradual uncertainty predicted by a noncategorical account.",
        "children": []
      },
      {
        "text": "Listeners were **best at discriminating sounds near the category boundaries**. Equally spaced sounds were easier to tell apart when they received different consonant labels. This relationship appeared with one-step, two-step, and three-step comparisons, so it was not limited to one chosen pair size.",
        "children": []
      },
      {
        "text": "Increasing physical separation generally improved discrimination, but it did not explain why performance peaked near the boundaries. Predictions derived from labeling captured much of that pattern. Some acoustic sensitivity remained beyond the simplest categorical prediction, so category identification and discrimination were related without being identical measures.",
        "children": []
      }
    ],
    "review-6": [
      {
        "text": "A **minimal pair** contains two words distinguished by one speech sound. As the input approaches the boundary between the pair, looking toward the competitor increases gradually. The effect remains when the final response is held constant, so it cannot be explained only by different words being selected.",
        "children": []
      },
      {
        "text": "A **cascaded account** allows the remaining acoustic uncertainty to influence possible words. More support for the competing phoneme supplies more support for its word. Recognition can therefore retain information about how close the sound was to the alternative category.",
        "children": []
      },
      {
        "text": "A strict **threshold-only account** passes the same finished phoneme for every token assigned to that category. Once the earlier differences have been removed, the word level has no varying input to produce the changing competitor looks. The problem is the loss of useful distinctions before lexical competition begins.",
        "children": []
      }
    ],
    "review-7": [
      {
        "text": "**Lexical feedback** occurs when an activated word sends support back to its component phonemes. An uncertain sound can partly activate a word, and the word can then strengthen the sound interpretation compatible with its full form. Word knowledge contributes while phoneme identification is still developing.",
        "children": []
      },
      {
        "text": "Influence is therefore possible in both directions. Acoustic evidence changes which words are active, while those words change the balance between possible phonemes. The higher level contributes information instead of simply waiting for a finished lower-level decision.",
        "children": []
      },
      {
        "text": "**Feedback differs from cascading**. Cascading passes incomplete evidence forward from features to phonemes and words. Feedback sends influence from words toward phonemes. An interactive account can include both, allowing developing representations to affect one another during recognition.",
        "children": []
      }
    ],
    "review-8": [
      {
        "text": "A **late-correction account** leaves initial phoneme perception unchanged and adds a word preference when the listener reports an answer. In corpse–gorpse, the listener would favor saying corpse after the sound has already been categorized. Lexical knowledge affects the response rather than changing the earlier perceptual boundary.",
        "children": []
      },
      {
        "text": "This account predicts a **general reporting bias**. Favoring a real word should adjust responses across the continuum, rather than producing its main effect only where the sound is maximally ambiguous. The bias is added after the phoneme decision.",
        "children": []
      },
      {
        "text": "The **word–nonword, neutral, and nonword–word conditions** vary which consonant interpretation forms a word. A reporting adjustment can favor the lexical option in these conditions without relocating the perceptual boundary. That distinguishes the proposal from one in which word knowledge helps resolve uncertainty during identification itself.",
        "children": []
      }
    ],
    "review-9": [
      {
        "text": "A **boundary-shift account** proposes that word knowledge changes where the listener switches phoneme categories. Near an ambiguous onset, the interpretation forming a real word receives extra support. The effect changes categorization rather than merely correcting a report afterward.",
        "children": []
      },
      {
        "text": "The largest difference is expected **near the category boundary**. At clear endpoints, the acoustic evidence strongly favors one consonant. Near the boundary, neither interpretation has that advantage, leaving more room for lexical information to affect the choice.",
        "children": []
      },
      {
        "text": "Identification differences between lexical conditions should therefore be large in the uncertain region and small at the endpoints. A uniform reporting bias predicts a different distribution of effects. Where the lexical effect occurs is as important as whether listeners favor a word overall.",
        "children": []
      },
      {
        "text": "The word ending provides the same kind of lexical advantage at every continuum position, but the onset does not remain equally uncertain. Near an endpoint, strong acoustic evidence limits the effect of that knowledge. Near the boundary, competing phoneme interpretations leave more uncertainty for the lexical information to resolve.",
        "children": []
      }
    ],
    "review-10": [
      {
        "text": "**Ganong’s results** contain the largest lexical differences near the **phoneme boundary**. The curves shift according to which consonant interpretation forms a real word. Differences are smaller near clear endpoints, where acoustic evidence already strongly supports one category.",
        "children": []
      },
      {
        "text": "This pattern is compatible with word knowledge affecting phoneme labeling. It differs from adding an equal preference across the entire continuum. The lexical influence depends on how much uncertainty remains in the sound.",
        "children": []
      },
      {
        "text": "Ganong considered possible guessing strategies, while **interactive models** implement the effect through **lexical-to-phoneme feedback**. An activated word supports the phonemes that compose it. The whole-word representation can therefore affect how an ambiguous part is interpreted during recognition.",
        "children": []
      }
    ],
    "review-11": [
      {
        "text": "A **TRACE simulation of the Ganong effect** begins with a sound ambiguous between **/b/ and /p/**. The following input contains /l/, the vowel in plug, and a final /g/. Both initial phonemes can receive support before the rest of the word resolves the uncertainty.",
        "children": []
      },
      {
        "text": "Partial /b/ evidence activates possible **bl-** words, while /p/ evidence activates **pl-** words. Candidates gain support when new sounds fit them and lose support when the input conflicts. The word is processed as it arrives rather than only after its ending is complete.",
        "children": []
      },
      {
        "text": "**Plug, blood, and blush** can all receive some early support. The final **/g/** fits plug but not the endings of blood or blush. Plug becomes stronger as the alternatives weaken, and feedback from the winning word favors its compatible phonemes.",
        "children": []
      }
    ],
    "review-12": [
      {
        "text": "The word **plug** gains support as its sounds arrive, especially when the **final /g/** becomes available. **Blood and blush** fit some earlier information, but their endings do not match /g/. A candidate can therefore be plausible initially and lose support once the input continues.",
        "children": []
      },
      {
        "text": "Stronger activation of plug sends feedback to **/p/**. The beginning becomes less ambiguous because /p/ belongs to the word favored by the full sequence. Information near the end of the word can thus influence interpretation of an earlier sound.",
        "children": []
      },
      {
        "text": "This is **top-down processing** in TRACE. A representation of the whole word affects a representation of a component phoneme. The effect operates through interactions during recognition, rather than only as a final preference for reporting a familiar word.",
        "children": []
      }
    ],
    "review-13": [
      {
        "text": "A **parser** assigns grammatical structure while a person reads or listens. It determines which words form groups and how those groups relate. A **syntactic tree** represents these relationships, including which phrase modifies a noun and which verb states the main event.",
        "children": []
      },
      {
        "text": "A **noun phrase, or NP**, groups a noun with related words. A **verb phrase, or VP**, contains a verb and the material associated with it. A **prepositional phrase, or PP**, combines a preposition with its object. Grouping the words differently can change how the same sentence is understood.",
        "children": []
      },
      {
        "text": "Parsing operates with **limited time and memory**. Treating raced as the main verb initially requires less structure than treating raced past the barn as an embedded modifier. The latter analysis contains a clause inside the noun phrase while keeping fell available as the main verb. A processing account must explain how those alternatives are handled during comprehension.",
        "children": []
      }
    ],
    "review-14": [
      {
        "text": "**Minimal attachment** is a preference for building the smaller available syntactic structure first. The nodes in a syntactic tree represent grammatical groupings. Fewer nodes mean less structure to construct and maintain at that moment.",
        "children": []
      },
      {
        "text": "In the horse sentence, treating **raced as the main verb** produces the simpler initial analysis. The alternative makes raced past the barn a modifier inside the noun phrase. It requires an embedded relationship equivalent to “that was raced past the barn.”",
        "children": []
      },
      {
        "text": "Choosing the smaller structure can reduce the immediate processing demand, but it can also create a garden path. The final word fell requires the analysis that was not initially preferred. Difficulty then comes from replacing the earlier structure, even though the grammar permits the correct alternative.",
        "children": []
      }
    ],
    "review-15": [
      {
        "text": "**Late closure** is a tendency to attach new words to the phrase or clause currently being processed. In **“The burglar blew open the safe with the dynamite,”** the phrase with the dynamite is preferentially connected to blew open. It describes how the action was carried out.",
        "children": []
      },
      {
        "text": "This **verb-phrase attachment** makes the dynamite the instrument used to open the safe. An alternative **noun-phrase attachment** groups the safe with the dynamite together. In that version, the phrase describes or identifies the safe instead of describing the action.",
        "children": []
      },
      {
        "text": "Both attachments are grammatically available, but they express different relationships. A preference for attaching the phrase to the action makes one interpretation easier to reach initially. The words alone do not fix whether the dynamite belongs to the event as an instrument or to the object as a property.",
        "children": []
      }
    ],
    "review-16": [
      {
        "text": "In **“The burglar blew open the safe with the jewels,”** attaching with the jewels to the action would make jewels the instrument used to open the safe. That is an unlikely event. The intended interpretation instead identifies **the safe containing the jewels**.",
        "children": []
      },
      {
        "text": "Reaching that meaning requires **noun-phrase attachment**, connecting with the jewels to safe. The difficult part is not recognizing the word jewels. It is assigning the phrase to the object rather than to the action.",
        "children": []
      },
      {
        "text": "Longer reading times and changes in eye movements occur when the sensible meaning requires this unpreferred attachment. A reader can briefly adopt the action-related interpretation and then revise it. The eventual meaning is straightforward, but the route to it can still impose a processing cost.",
        "children": []
      }
    ],
    "review-17": [
      {
        "text": "An **autonomous parser** is proposed to select its earliest grammatical structure independently of meaning. Its initial choices follow abstract syntactic preferences. Semantic information can contribute afterward, but it does not choose the first analysis in this account.",
        "children": []
      },
      {
        "text": "**Minimal attachment** favors a smaller tree, and **late closure** favors attaching incoming material to the structure already being processed. These preferences limit how much structure must be maintained at once. The parser selects a likely route rather than fully building every possible alternative.",
        "children": []
      },
      {
        "text": "When the continuation does not fit, the selected structure must be revised. Garden-path difficulty is attributed to that revision. The account therefore separates an initial structure-based choice from a later adjustment when the developing meaning or grammar conflicts with it.",
        "children": []
      }
    ],
    "review-18": [
      {
        "text": "**Spivey and colleagues (1995)** asked people to follow spoken instructions while viewing objects. The one-apple display contained **a pencil, a box, an empty towel, and an apple on a towel**. Participants heard **“Put the apple on the towel in the box.”**",
        "children": []
      },
      {
        "text": "The phrase **on the towel** can initially sound like a destination, prompting a plan to put the apple on the empty towel. In the intended interpretation, it identifies where the apple already is. **In the box** supplies the actual destination.",
        "children": []
      },
      {
        "text": "Participants often looked toward the empty towel before turning toward the box. With **“Put the apple that’s on the towel in the box,”** the modifier is explicit and this temporary error is reduced. Eye movements reveal a competing interpretation considered before the final action is completed.",
        "children": []
      },
      {
        "text": "The two towels play different roles. One already supports the apple, while the empty towel is the competing destination. Confusing the current-location modifier with the destination changes the planned action, even though the listener recognizes all the object names correctly.",
        "children": []
      }
    ],
    "review-19": [
      {
        "text": "A **two-apple display** changes what information is needed to identify the intended object. One apple rests on a towel and another rests elsewhere. Saying the apple does not yet distinguish them, so **on the towel** can specify which apple should be moved.",
        "children": []
      },
      {
        "text": "In that setting, participants look toward the intended apple and then toward the box. They make fewer detours toward the empty towel. The ambiguous wording produces a sequence more like the explicit instruction containing “that’s on the towel.”",
        "children": []
      },
      {
        "text": "The phrase’s usefulness changes with the objects available. With two apples, a location modifier solves a real identification problem. Context can therefore affect the developing grammatical interpretation, even though the ambiguous sentence itself has not changed.",
        "children": []
      }
    ],
    "review-20": [
      {
        "text": "With **one apple**, the ambiguous instruction often produces looks toward the empty towel as a possible destination. With **two apples**, those looks are reduced. The same wording therefore creates different early interpretations depending on the visual context.",
        "children": []
      },
      {
        "text": "The **unambiguous instruction** produces relatively few destination errors in either setting. Its grammar already identifies the towel phrase as a modifier. The major ambiguity cost occurs when the display contains only one apple and extra identifying information is less useful.",
        "children": []
      },
      {
        "text": "When two apples are available, **on the towel** distinguishes the target before **in the box** gives its destination. This is an effect of **referential context**, meaning the set of objects a phrase could identify. It influences which relationship the listener assigns while the sentence is still being understood.",
        "children": []
      }
    ],
    "review-21": [
      {
        "text": "**Wernicke’s aphasia** can involve fluent **“word salad” or “Jabberwocky.”** A patient describing a visual problem said **“My wires don’t hire right.”** The expression has a sentence-like arrangement, but the selected words fail to communicate the intended problem with vision.",
        "children": []
      },
      {
        "text": "Other responses continue with grammatical-sounding phrases that do not form a clear message. **“I felt worse because I can no longer keep in mind from the mind of the minds…”** retains fluency without a coherent explanation. Invented forms such as **“demaploze” and “tubaboys”** are neologisms. Calling a fork “a need for a schedule” similarly fails to identify the object despite producing familiar words.",
        "children": []
      },
      {
        "text": "**Broca’s aphasia** can instead produce **telegraphic speech**. A hospital account retains words about Dad, the hospital, doctors, appointments, and teeth, but pauses and missing grammatical connections make the event hard to express. The surviving content words convey parts of the experience even though sentence production is restricted.",
        "children": []
      }
    ],
    "review-22": [
      {
        "text": "A traditional account assigns **lexical activation or inhibition problems** to Wernicke’s aphasia and **grammatical problems** to Broca’s aphasia. The **lexicon** contains stored word knowledge. Activation makes a candidate available, while inhibition reduces competing words that should not be selected.",
        "children": []
      },
      {
        "text": "Broca’s original patient **Leborgne**, known as **Tan**, could produce essentially one syllable while appearing to retain comprehension and other abilities. This extremely restricted output differs from the partly informative, agrammatic speech associated with the broader later syndrome.",
        "children": []
      },
      {
        "text": "**Apraxia of speech** is a problem organizing the movements needed to speak. That could account for restricted output without requiring the same loss of grammatical knowledge. The amount a person says is therefore insufficient to distinguish a problem selecting or arranging language from a problem planning its articulation.",
        "children": []
      }
    ],
    "review-23": [
      {
        "text": "A distinction between **grammar and the lexicon** separates rules for combining words from stored word knowledge. Grammar allows a sentence to be understood even when that complete sentence has never been encountered. Its structure can be constructed rather than retrieved as one memorized unit.",
        "children": []
      },
      {
        "text": "**“Colorless green ideas sleep furiously”** has a grammatical organization despite its implausible meaning. **“Furiously sleep ideas green colorless”** contains the same words in an unacceptable order. Familiarity with the words alone does not explain the difference between the two sequences.",
        "children": []
      },
      {
        "text": "The traditional aphasia account links Wernicke’s aphasia to disrupted lexical processing and Broca’s aphasia to disrupted grammar. This proposes distinct impaired operations rather than simply different levels of fluency. It predicts that patients will differ in what they can do with words and grammatical relationships across controlled tasks.",
        "children": []
      }
    ],
    "review-24": [
      {
        "text": "Ordinary conversation provides **redundant cues** to meaning. In **“The dog bit the man,”** knowledge of dogs and biting favors the dog as the actor. English **subject–verb–object order** supports the same interpretation, so meaning and word order point in the same direction.",
        "children": []
      },
      {
        "text": "A **heuristic** is a shortcut based on a regular pattern. A listener might select the most plausible actor or assume that the first noun performs the action. These strategies can support an answer without requiring every grammatical relationship to be analyzed.",
        "children": []
      },
      {
        "text": "In **“The dog that the man is biting is angry,”** the man performs the biting even though dog occurs first. The embedded clause and the main clause assign different roles. Correct interpretation requires tracking those relationships because familiar-event knowledge and a first-noun strategy favor the wrong answer.",
        "children": []
      }
    ],
    "review-25": [
      {
        "text": "**Caramazza and Zurif** compared ordinary control sentences with **center-embedded sentences**, which contain a clause inside another clause. A control such as **“The girl is kicking a green ball”** aligns familiar event knowledge with ordinary word order. The actor is easy to identify through several available cues.",
        "children": []
      },
      {
        "text": "In **semantically constrained** items, an embedded clause still contains a highly plausible actor. **“The apple that the boy is eating is red”** makes the boy the likely eater. Meaning can support the grammatical relationship even when the structure is more complex.",
        "children": []
      },
      {
        "text": "**Reversible** items, such as **“The horse that the bear is kicking is brown,”** allow either participant to act plausibly. **Improbable** items, such as **“The bird that the worm is eating is blue,”** make ordinary expectations favor the wrong relationship. Grammar must identify who acts on whom when plausibility either fails to distinguish them or actively misleads.",
        "children": []
      },
      {
        "text": "The embedded items place the actor inside the modifying clause rather than making the first noun perform its action. In the apple sentence, the boy eats the apple. In the worm sentence, the worm eats the bird. The grammatical relationship stays comparable while plausibility changes dramatically.",
        "children": []
      }
    ],
    "review-26": [
      {
        "text": "In **sentence–picture matching**, a participant hears a sentence and selects the picture expressing its meaning. The conditions differ in whether familiar event knowledge helps identify the actor. Accuracy measures whether the listener recovered the correct relationship, without requiring a spoken explanation.",
        "children": []
      },
      {
        "text": "**Healthy controls** perform similarly well across the conditions. **Wernicke’s patients** perform poorly overall. **Broca’s patients** do better when plausible event roles support the sentence and worse when the relationship must be recovered without that support.",
        "children": []
      },
      {
        "text": "**Caramazza and Zurif** interpreted the Broca pattern as a **syntactic comprehension impairment**. The deficit appeared in understanding, not just producing speech. Its dependence on the sentence conditions suggested particular difficulty assigning grammatical roles when ordinary expectations could not supply the answer.",
        "children": []
      }
    ],
    "review-27": [
      {
        "text": "In **Dick and colleagues’ task**, listeners identify **which animal performs the action**. The event is a dog biting a cat, but the sentence structure changes. Knowing the animal names is insufficient because the answer depends on assigning their roles.",
        "children": []
      },
      {
        "text": "**“The dog is biting the cat”** is active, and **“It’s the dog that is biting the cat”** is a subject cleft. Both place the actor first. A strategy of treating the first animal as the actor gives the correct answer in these conditions.",
        "children": []
      },
      {
        "text": "**“It’s the cat that the dog is biting”** is an object cleft, and **“The cat is bitten by the dog”** is passive. Both begin with the animal receiving the action. Correctly selecting the dog now requires the grammatical relationship rather than a first-noun shortcut.",
        "children": []
      }
    ],
    "review-28": [
      {
        "text": "**Healthy aging controls** identify the actor accurately across active sentences, subject clefts, object clefts, and passives. Aphasia groups differ in both their overall accuracy and the additional cost of harder structures. They do not produce one uniform pattern of impaired comprehension.",
        "children": []
      },
      {
        "text": "**Anomic aphasia**, associated with word-finding difficulty, has relatively better performance, although harder structures still reduce accuracy. **Broca’s and conduction aphasia** involve a marked decline for object clefts and poorer performance for passives. **Wernicke’s patients** have low accuracy across all four forms.",
        "children": []
      },
      {
        "text": "Broca’s patients are especially vulnerable to **noncanonical structures**, which depart from the usual actor-first arrangement. Their active-sentence accuracy is also below the healthy level. The pattern combines a broader performance reduction with a disproportionate difficulty assigning roles in the less usual structures.",
        "children": []
      }
    ],
    "review-29": [
      {
        "text": "Comprehension also becomes less accurate in **healthy undergraduates** when processing is stressed. Manipulations include compressed speech, noise, **low-pass filtering**, and remembering digit lists while interpreting sentences. Low-pass filtering removes higher-frequency information, while a concurrent memory task uses resources during comprehension.",
        "children": []
      },
      {
        "text": "**Object clefts and passives** are particularly vulnerable under these conditions. Active sentences and subject clefts remain relatively easier. Combining manipulations, such as filtering and compression, produces greater losses than ordinary listening.",
        "children": []
      },
      {
        "text": "These participants have no aphasic injury, but difficult conditions produce a pattern resembling some aphasia findings. A disproportionate cost for complex grammar can therefore reflect **performance demands**, not only loss of a grammatical rule. The comparison concerns how effectively a system can use its knowledge when processing becomes difficult.",
        "children": []
      }
    ],
    "review-30": [
      {
        "text": "**Saygin and colleagues (2004)** asked participants to match **actions with objects**. A nonverbal version conveyed an action such as licking without spoken language and required choosing a fitting object, such as an ice cream. A linguistic version supplied language-based information for the same general decision.",
        "children": []
      },
      {
        "text": "Aphasic participants were less accurate than controls in both versions. The difficulty was therefore not confined to understanding grammatical sentences. The nonverbal task still required identifying the relevant action meaning and connecting it to an appropriate object.",
        "children": []
      },
      {
        "text": "**Semantically related distractors** caused more difficulty than unrelated choices. An object related in meaning competed more strongly with the correct match. Selecting the intended meaning could therefore be disrupted even when no linguistic sentence had to be interpreted.",
        "children": []
      },
      {
        "text": "The nonverbal comparison removes a linguistic expression without removing meaning from the task. The patient still has to identify what the action calls for and select the corresponding object. Similar difficulty in that condition therefore concerns a demand shared with language rather than grammar alone.",
        "children": []
      }
    ],
    "review-31": [
      {
        "text": "Poorer **nonverbal action matching** was significantly associated with **damage to Broca’s area**. Participants interpreted a pantomimed action and chose an appropriate object. They did not have to produce a sentence or extract the grammar of spoken instructions to identify the action.",
        "children": []
      },
      {
        "text": "This relationship extends the affected behavior beyond grammatical processing. A patient can have difficulty connecting an action with its meaning even when language is removed from the input. The nonverbal task still requires successful comprehension and selection.",
        "children": []
      },
      {
        "text": "The result challenges a description of every Broca-related difficulty as exclusively syntactic. The task establishes which operation is required, while the lesion analysis relates failure to damaged tissue. A proposed explanation must account for both the grammatical findings and the nonlinguistic action difficulty.",
        "children": []
      }
    ],
    "review-32": [
      {
        "text": "The **conditioned head turn procedure** tests whether an infant detects a sound change. The infant learns to turn toward a sound associated with a rewarding visual event. An observable orienting response replaces the spoken judgment that an adult could give.",
        "children": []
      },
      {
        "text": "**High-amplitude sucking** uses a different behavior. Sucking often declines as the same sound is repeated. If a changed sound renews sucking, the change has affected behavior and provides evidence that the infant distinguished the input.",
        "children": []
      },
      {
        "text": "Neither response requires naming or producing the sounds. The experimenter controls the acoustic comparison and measures whether the infant reacts differently. These methods make speech discrimination available for study before the child can perform a verbal identification task.",
        "children": []
      }
    ],
    "review-33": [
      {
        "text": "**Eimas and colleagues (1971)** tested infants with synthetic syllables differing in **voice onset time**, or VOT. VOT describes when vocal-fold vibration begins relative to the stop release. Sucking declined during repetition, after which a controlled change tested whether responding recovered.",
        "children": []
      },
      {
        "text": "In **20D**, VOT changed from **+20 to +40 milliseconds**, crossing an adult phoneme boundary. Sucking increased. In **20S**, an equally large change stayed within a category, either **−20 to 0** or **+60 to +80 milliseconds**, and produced much less recovery.",
        "children": []
      },
      {
        "text": "The **0 condition** kept the sound unchanged, and sucking continued to decline. The equal 20-millisecond differences in the changed conditions are essential to the comparison. Their different effects indicate sensitivity to the category relationship rather than only the amount of physical change, before infants can provide phoneme labels.",
        "children": []
      }
    ],
    "review-34": [
      {
        "text": "**Categorical perception** was proposed as a way to convert variable sound into a **symbolic representation**. A symbolic unit preserves a recognizable identity despite acoustic changes. Finding such organization in very young infants contributed to an interpretation based on an innate speech-processing ability.",
        "children": []
      },
      {
        "text": "At roughly **four months**, infants are still developing basic motor and visual abilities. They are beginning to manipulate objects with both hands and support their head and chest while prone. Vocal production is also limited, with more vowel-like sounds only beginning to replace earlier vocalizations.",
        "children": []
      },
      {
        "text": "Category-related perception therefore occurs well before mature speech production. That timing motivated the claim that perception is specially prepared for language. The comparison concerns the early availability of organized responses to speech, rather than an ability to articulate the same sounds accurately.",
        "children": []
      },
      {
        "text": "Color vision and general visual acuity are also still developing at this age. The contrast with these broad developmental changes contributed to the interpretation of speech categorization as an unusually early ability. Early timing motivated the innateness claim without itself specifying every mechanism producing the response.",
        "children": []
      }
    ],
    "review-35": [
      {
        "text": "**Perceptual narrowing** is a reduction in sensitivity to some sound distinctions as perception becomes adapted to the surrounding language. Young English-learning infants can distinguish certain contrasts not used in English. Some become harder to hear toward the end of the first year.",
        "children": []
      },
      {
        "text": "**Werker and Tees** tested **Hindi and Salish contrasts**. Discrimination was relatively strong at **6–8 months**, lower at **8–10 months**, and much lower at **10–12 months** for English-learning infants. Infants with relevant language experience retained stronger discrimination.",
        "children": []
      },
      {
        "text": "The change depends on the sound system being experienced. A distinction available early does not necessarily remain equally easy to perceive. Learning a native system can improve adaptation to its useful categories while reducing sensitivity to distinctions outside them.",
        "children": []
      }
    ],
    "review-36": [
      {
        "text": "The **“citizens of the world” account** proposes broad, innate sensitivity to speech contrasts. **Language-general** means that this starting ability is not restricted to one native language. The proposal treats categorical organization as part of the infant’s initial language capacity.",
        "children": []
      },
      {
        "text": "Experience then **selects among innately specified contrasts**. Exposure establishes which distinctions matter in the language being learned. The child becomes tuned to those differences instead of remaining equally sensitive to every available contrast.",
        "children": []
      },
      {
        "text": "Under this account, development mainly narrows a broad initial inventory. Learning preserves or emphasizes existing distinctions rather than building every category from the beginning. It is therefore a claim about the infant’s starting knowledge as well as the role that experience plays afterward.",
        "children": []
      }
    ],
    "review-37": [
      {
        "text": "The **inductive problem of early word learning** arises because an encounter supports many possible meanings. A word heard near a cat could mean **CAT, ANIMAL, PET, or FELIX**. These candidates refer to different levels of category or to one particular individual.",
        "children": []
      },
      {
        "text": "The word could instead refer to **FURRY, ALIVE, WALKING, WHISKERS, or LEG**. Those candidates concern a property, a state, an action, or part of the animal. Seeing the same event does not uniquely select one interpretation.",
        "children": []
      },
      {
        "text": "The **hypothesis space** is the set of possible meanings compatible with the experience. **Quine’s gavagai problem** captures this uncertainty about reference. Learning requires evidence or constraints that narrow the possibilities instead of assuming that a single word and scene make the intended meaning obvious.",
        "children": []
      }
    ],
    "review-38": [
      {
        "text": "**Joint attention** occurs when two people share a focus on an object or event. An adult and child coordinate what the interaction concerns. This provides information about reference beyond whatever happens to attract the child’s attention independently.",
        "children": []
      },
      {
        "text": "**Gaze following** develops around **nine months**. Following the adult’s eyes can reveal which object the adult is attending to. When a label is spoken, that focus provides evidence about the object it may name.",
        "children": []
      },
      {
        "text": "Shared attention narrows the possible referents of the word. The child can relate the expression to the adult’s focus rather than associating it equally with everything nearby. The useful information concerns a relationship among the speaker, the learner, and the object.",
        "children": []
      }
    ],
    "review-39": [
      {
        "text": "In **Baldwin and colleagues’ joint-attention condition**, an adult interacted with an infant and labeled the object occupying the infant’s attention. The label occurred within an exchange involving a shared object. The adult’s behavior provided a visible connection between the sound and its intended referent.",
        "children": []
      },
      {
        "text": "In the **no-joint-attention condition**, a voice behind a screen supplied the label while the object remained present. Both conditions contained a word and an object, but only one included visible coordination with the speaker.",
        "children": []
      },
      {
        "text": "**Eighteen-month-olds** learned the word in the joint-attention condition but not in the other condition. Temporal co-occurrence did not produce the same result by itself. How the speaker organized the interaction affected the mapping learned from the available experience.",
        "children": []
      },
      {
        "text": "A visible speaker gives the learner evidence that the sound is being used to refer to that object. The screened voice supplies temporal overlap without the same coordinated exchange. Their different outcomes distinguish a social relationship supporting reference from the mere presence of the relevant sound and object.",
        "children": []
      }
    ],
    "review-40": [
      {
        "text": "**Intentional cues** indicate what a speaker is trying to refer to. The adult’s gaze can identify a different object from the one currently occupying the child’s attention. A new word therefore should not automatically be assigned to whatever the child happens to be handling.",
        "children": []
      },
      {
        "text": "Baldwin tested **16–17-month-olds and 18–19-month-olds** with two labeling conditions. In **follow-in labeling**, the adult looked at the child’s current toy. In **discrepant labeling**, the adult looked toward a toy in a bucket instead.",
        "children": []
      },
      {
        "text": "The contrast separates the learner’s own interest from the adult’s indicated referent. Gaze can supply evidence about which of the available objects the speaker means. The intended mapping depends on the social information accompanying the word, not merely on which objects are present.",
        "children": []
      }
    ],
    "review-41": [
      {
        "text": "**Affective and behavioral cues** include the speaker’s emotional expressions and actions. A reaction can indicate whether a candidate object satisfies what the speaker is trying to do. The child can use that information when deciding which object a new word names.",
        "children": []
      },
      {
        "text": "In **Akhtar and colleagues’ study**, infants used adults’ facial expressions to identify the intended object. The relevant information was the adult’s response to the candidate, rather than its mere presence near the spoken word.",
        "children": []
      },
      {
        "text": "Several objects can coincide with an utterance, but the adult may treat only one as the intended target. Interpreting that reaction narrows the alternatives. Word learning therefore includes tracking the purpose of the exchange as well as forming associations between sounds and objects.",
        "children": []
      }
    ],
    "review-42": [
      {
        "text": "A **default word-learning strategy** favors one interpretation unless other evidence supports an alternative. It narrows the set of meanings considered initially. A default is a useful starting preference, not an absolute rule governing every word.",
        "children": []
      },
      {
        "text": "The **whole-object assumption** favors assigning a new label to an entire object. A scene also contains parts, properties, and actions, any of which could in principle be named. The assumption gives the whole object greater initial support than those alternatives.",
        "children": []
      },
      {
        "text": "This reduces the **hypothesis space** without requiring the child to test every candidate equally. Further evidence can establish that a word refers to a part or property instead. The strategy supports an early inference while leaving room for learning a different kind of meaning.",
        "children": []
      }
    ],
    "review-43": [
      {
        "text": "**Mutual exclusivity**, associated with **Markman (1989)**, is a default expectation that an object has one name. If one candidate already has a known label, an unfamiliar label is more likely to refer to another object. Existing vocabulary helps constrain the new mapping.",
        "children": []
      },
      {
        "text": "The strategy develops during the **second half of the second year**. Its operation depends on what the child already knows, because a familiar object is excluded only if its name is available to that learner. The sound of the new word alone does not select the referent.",
        "children": []
      },
      {
        "text": "An unnamed object therefore becomes a stronger candidate when contrasted with an already named one. This is a default inference rather than a claim that an object can never receive another expression. Its role is to reduce uncertainty during the initial interpretation.",
        "children": []
      }
    ],
    "review-44": [
      {
        "text": "**Lenneberg (1967)** linked language-learning conditions to the development of **cerebral dominance**. This means increasing specialization of the hemispheres. **Language laterality** describes how strongly language functions depend on one side rather than the other.",
        "children": []
      },
      {
        "text": "His proposal combined typical language milestones with observations about neural development and injury. Children often achieved better language outcomes than adults after extensive damage or surgery. Such outcomes suggested that the organization supporting language changes with age.",
        "children": []
      },
      {
        "text": "The hypothesis concerns the brain’s **maturational state**. Greater early flexibility could allow functions to develop through different tissue after injury, while a more specialized adult system has fewer possibilities for reassignment. This is a proposed change in organization, rather than simply an effect of how many words a learner has heard.",
        "children": []
      }
    ],
    "review-45": [
      {
        "text": "Evidence about **first-language sensitive periods** often comes from rare injuries or unusual deprivation histories. Such cases differ in many individual circumstances. Delayed language can occur alongside changes in health, social experience, or other developmental conditions.",
        "children": []
      },
      {
        "text": "**Second-language acquisition** is more common and begins across a broad range of ages. Larger groups provide variation in starting age and eventual attainment. Researchers can compare these patterns without relying entirely on a few exceptional first-language cases.",
        "children": []
      },
      {
        "text": "The question is whether age at the beginning of learning predicts later proficiency. L2 learners already possess a first language, so the comparison is not identical to delayed first-language acquisition. Both prior linguistic knowledge and later experience must be considered when interpreting an age relationship.",
        "children": []
      }
    ],
    "review-46": [
      {
        "text": "**Johnson and Newport** tested **46 Korean- or Chinese-speaking immigrants** who arrived in the United States between **ages 3 and 39**. They had substantial subsequent English experience. The study compared eventual proficiency rather than only progress during the first weeks of exposure.",
        "children": []
      },
      {
        "text": "Participants listened to English sentences and judged their grammaticality across several constructions. Earlier arrivals generally performed better. Before puberty, increasing arrival age strongly predicted lower accuracy, while adult-arrival scores were lower but much more variable.",
        "children": []
      },
      {
        "text": "Measured differences in English experience, motivation, self-consciousness, and American identification did not explain the reported pattern. Johnson and Newport interpreted it as evidence for an effect of **maturational state**. The observed age–performance relationship and that proposed biological explanation are related but distinct parts of the argument.",
        "children": []
      }
    ],
    "review-47": [
      {
        "text": "Learners arriving **by about age eight** often performed near the native level on the grammaticality task. Later childhood arrival was associated with progressively lower scores. The early sample therefore contained both a very high-performing youngest range and a decline further into childhood.",
        "children": []
      },
      {
        "text": "Adult-arrival scores varied much more without the same strong age ordering. The description **“nearly random distribution”** refers to that weak relationship between adult arrival age and score. It does not mean that these learners answered the test at chance.",
        "children": []
      },
      {
        "text": "Adults with similar starting ages could differ substantially. Early learning had a population advantage, while later performance left more individual variation to explain. A description based only on average early and late scores would miss the different relationships within those groups.",
        "children": []
      }
    ],
    "review-48": [
      {
        "text": "The **exercise hypothesis** proposes an early superior capacity for acquiring languages. If it is unused during the favorable period, it declines with maturation. If exercised through early language acquisition, it remains available for learning further languages throughout life.",
        "children": []
      },
      {
        "text": "The **maturational-state hypothesis** also proposes an early advantage, but its decline occurs even after successful childhood language learning. Using the ability does not permanently preserve the same developmental state. Early L1 acquisition can therefore coexist with reduced later L2-learning capacity.",
        "children": []
      },
      {
        "text": "The disagreement concerns what early use protects. Exercise predicts continued availability after a normal first language. Maturational state predicts that the learning conditions still change with development. Later learners who already possess L1 provide an important comparison between these predictions.",
        "children": []
      }
    ],
    "review-49": [
      {
        "text": "A **cohort competitor** shares the beginning of a target word. **Beetle** competes early with **beaker**, while **speaker** shares its ending and is a rhyme competitor. **Carriage** provides an unrelated comparison. The position of overlap affects when a candidate receives matching evidence.",
        "children": []
      },
      {
        "text": "In **Allopenna and colleagues’ (1994) task**, looks toward the target and cohort rise early. Later sounds fit beaker but not beetle, so target looks continue increasing while cohort looks decline. The initial match does not guarantee continued support.",
        "children": []
      },
      {
        "text": "Rhyme competition occurs later because its overlap becomes useful at a different point. Recognition therefore changes as the signal unfolds. Eye movements can record those temporary candidates even when the participant ultimately identifies the word correctly.",
        "children": []
      }
    ],
    "review-50": [
      {
        "text": "**Marian and Spivey** tested Russian–English bilinguals for **cross-language cohort competition**. English **speaker** begins similarly to Russian **спички, spichki**, meaning matches. The picture of matches can therefore become a competitor through its Russian name during an English instruction.",
        "children": []
      },
      {
        "text": "**Spear** provides a within-English competitor. A display can contain that object, the Russian-name competitor, or both. Comparing these displays separates competition within the selected language from competition supplied by the other vocabulary.",
        "children": []
      },
      {
        "text": "Other pairs include **boot–buben**, referring to a tambourine, **chair–cherepaha**, referring to a turtle, and **marker–marka**, referring to a stamp. Their relationship is **phonological**, meaning sound-based. Speaker and matches do not share a meaning, so looks toward matches must be related to its other-language name rather than semantic similarity between the objects.",
        "children": []
      }
    ],
    "review-51": [
      {
        "text": "During **L2 English recognition**, both within-language and between-language competitors attracted more looks than unrelated objects. A Russian-name alternative could therefore receive support while the listener was following English. Selecting a task language did not prevent all activation of the other vocabulary.",
        "children": []
      },
      {
        "text": "When both kinds of competitor appeared together, the **within-language competitor was stronger**. The Russian-name competitor nevertheless attracted more attention than the unrelated control. Competition across languages remained present even when another plausible alternative was available.",
        "children": []
      },
      {
        "text": "These effects concern temporary activation rather than a requirement to choose the wrong object. A participant can complete the English instruction correctly after looking at an L1-supported candidate. Recognition therefore includes alternatives beyond the final intended response.",
        "children": []
      },
      {
        "text": "When just one competitor was present, within-language and between-language alternatives attracted looking to a similar extent. Their unequal strength became clearer when both were available together. The presence of other candidates therefore changed the competition, without eliminating the influence of the other-language name.",
        "children": []
      }
    ],
    "review-52": [
      {
        "text": "During **L1 Russian recognition**, within-language competitors reliably attracted more looks than controls. The native-language cohort effect remained whether that competitor appeared alone or alongside the other-language alternative. Similar beginnings therefore affected recognition within Russian.",
        "children": []
      },
      {
        "text": "English-name competitors produced a smaller numerical increase over controls, but the difference was **not statistically significant**. The observed trend did not establish a reliable reverse cross-language effect. A numerical difference and a supported effect are not interchangeable.",
        "children": []
      },
      {
        "text": "The reported pattern was **asymmetric**. L1 words affected L2 recognition more clearly than L2 words affected L1 recognition. An explanation must account for unequal influence in the two directions rather than assuming that both vocabularies activate one another with identical strength.",
        "children": []
      }
    ],
    "review-53": [
      {
        "text": "The **Revised Hierarchical Model**, associated with **Kroll and Stewart**, connects L1 words, L2 words, and concepts. **Spreading activation** means activity at one representation influences connected representations. A lexical connection joins words, while a conceptual connection links a word with its meaning.",
        "children": []
      },
      {
        "text": "The **L1 lexicon** is larger and more strongly connected to concepts. A developing **L2 lexicon** has stronger links toward L1 than the reverse direction. Early use of L2 often relies on the established L1 counterpart to support access to meaning.",
        "children": []
      },
      {
        "text": "Unequal connection strengths predict unequal effects. Activity can spread from an L2 word toward L1 more readily than in reverse. The model allows both languages to interact without assuming equivalent routes to their word forms and shared concepts.",
        "children": []
      }
    ],
    "review-54": [
      {
        "text": "The **Revised Hierarchical Model of Kroll and Stewart (1990, 1994)** connects both lexicons with concepts through routes of different strengths. In the **Marian and Spivey** English task, a Russian competitor can receive partial activation and reinforce the concept associated with its picture. The interaction can affect looking without changing the final instructed answer.",
        "children": []
      },
      {
        "text": "English **speaker** overlaps in initial sound with Russian **spichki**, meaning **matches**. Their meanings are not alike. Sound overlap supports the competing Russian word, which can in turn strengthen the concept of matches and attract attention to that object.",
        "children": []
      },
      {
        "text": "This **feedback to conceptual activity** explains how a candidate from the other language can become a visible competitor. The listener may still select speaker correctly. In an **L1 task**, weaker routes involving L2 make the reverse influence less reliable, accounting for the asymmetry through connection strengths rather than assuming equal activation in both directions.",
        "children": []
      }
    ],
    "review-55": [
      {
        "text": "A **balanced bilingual** has relatively strong proficiency in both languages. In this model, increasing proficiency does not create **“two monolinguals in one.”** Both vocabularies can remain linked through concepts and interacting pathways.",
        "children": []
      },
      {
        "text": "**Competitive dynamics** means that active alternatives affect which representation is selected. **Inhibition** reduces candidates inappropriate for the current task. Strong knowledge of both languages can preserve control demands because both systems contain available alternatives.",
        "children": []
      },
      {
        "text": "These predictions motivated work on **nonlinguistic cognitive control**. The immediate language-model claim is that proficiency does not remove interaction. A balanced bilingual can recognize a word correctly while still managing competition from representations belonging to the other language.",
        "children": []
      }
    ]
  },
  "mathSpeech": {
    "\\frac{f(\\mathrm{pretty})}{f(\\mathrm{pre})}\\gg\\frac{f(\\mathrm{tyba})}{f(\\mathrm{ty})}": "the frequency of pretty divided by the frequency of pre is much greater than the frequency of tyba divided by the frequency of ty",
    "\\frac{2}{2}=1": "two divided by two equals one",
    "\\frac{2}{4}=0.5": "two divided by four equals zero point five"
  }
};
