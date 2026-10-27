window.LING406_TRANSCRIPTS_V5 = {
  "revision": "ling406-transcripts-v5",
  "scripts": {
    "speech1-01": [],
    "speech1-02": [
      {
        "text": "**Speech perception** is the process of recognizing a spoken message from sound. Somehow we can take a continuously changing signal and retrieve “I can see you,” even though the recording does not contain a separate little sound for each written letter. The mouth is moving throughout the utterance, so information about neighboring sounds overlaps.",
        "children": []
      },
      {
        "text": "Different speakers can say the same words with different voices and different patterns of acoustic energy. Even the frequencies associated with a vowel can vary or overlap with those of another vowel. Recognizing the message therefore involves identifying what stays linguistically the same across physical changes in the sound, rather than matching every recording to one exact acoustic pattern.",
        "children": []
      }
    ],
    "speech1-03": [
      {
        "text": "Somehow we have to turn a **highly variable, analog signal into something more abstract**, so the language system can operate on it. **Analog** means that the physical sound can change continuously. A slight change in frequency, timing, or loudness does not automatically mean that a speaker has produced a different speech sound or word.",
        "children": []
      },
      {
        "text": "A **symbolic representation** treats the input as a recognizable language unit, such as a phoneme. A **phoneme** is a sound category that contributes to distinctions between words. Different physical versions can belong to that same category, allowing the language system to treat them alike.",
        "children": []
      },
      {
        "text": "**Categorical perception** is a proposed way of making that translation. Differences within one category become less noticeable, while a similar physical difference across a category boundary becomes easier to hear. The listener can retain a stable identity despite variation in the incoming sound.",
        "children": []
      }
    ],
    "speech1-04": [
      {
        "text": "The **vocal tract** is the passage through which the voice travels as the mouth produces speech. Its shape affects which sound frequencies are amplified most strongly. Moving the tongue or changing the mouth opening changes that shape, so a different set of frequencies becomes prominent.",
        "children": []
      },
      {
        "text": "These amplified resonant frequencies are called **formants**. The vowels in heed, hid, head, had, hod, hawed, hood, and who’d involve different combinations of formants. Recognizing a vowel depends on the pattern of resonances, rather than finding one frequency that identifies every production of it.",
        "children": []
      },
      {
        "text": "A **formant transition** is a change in a formant’s frequency over time. As the speaker moves into or out of a sound, the vocal tract changes shape and its resonances change with it. A steady formant characterizes part of a vowel, while a transition carries information about movement into that vowel.",
        "children": []
      }
    ],
    "speech1-05": [
      {
        "text": "A **spectrogram** represents how the energy in a sound changes across time and frequency. Time is measured in milliseconds and frequency in hertz. Darker areas contain stronger acoustic energy, and the prominent horizontal bands include the vowel’s resonances, or **formants**.",
        "children": []
      },
      {
        "text": "The vowels in **bead, bid, bade, bed, bad, bod, baud, bode, “bood,” and booed** have different formant patterns even though the surrounding consonants are similar. Bead has a relatively low first formant and a high second formant. Toward bad, the first formant is higher, while rounded back vowels near booed have a much lower second formant.",
        "children": []
      },
      {
        "text": "**F1** means the first, or lowest, formant. **F2** means the second-lowest formant. These labels identify two resonances within the same vowel, and their combination supplies information that helps distinguish one vowel from another.",
        "children": []
      }
    ],
    "speech1-06": [
      {
        "text": "The vowel **/u/** has a first formant near **300 Hz** and a second formant near **900 Hz** in this recording. The two values describe resonances within one vowel. They are not two separate sounds that the speaker says one after the other.",
        "children": []
      },
      {
        "text": "A **waveform** records changes in sound pressure over time. A **spectrogram** separates the same sound into its frequency components, making the low F1 and F2 available for analysis. These are two descriptions of one recording rather than two different productions.",
        "children": []
      },
      {
        "text": "**Praat** is software for analyzing speech. It can estimate formant frequencies so that the resonance pattern can be studied and changed. In **source–filter synthesis**, the energy supplied by the voice and the pattern imposed by the vocal tract are handled separately, allowing their contributions to the vowel to be examined.",
        "children": []
      }
    ],
    "speech1-07": [
      {
        "text": "**Praat can automatically find formants** in a recording. For this /u/, it identifies five resonances and tracks their frequencies over time. The analysis saves having to locate each band manually, while still treating the bands as parts of one spoken sound.",
        "children": []
      },
      {
        "text": "**F1, F2, and F3** are usually the formants most relevant to phonemic processing, meaning the identification of speech-sound categories. The number gives the formant’s order from low to high frequency. F1 is the lowest resonance, rather than the first sound spoken.",
        "children": []
      },
      {
        "text": "The manipulation concentrates on **F1 and F2**. Their frequencies are about 300 Hz and 900 Hz for this /u/, with the other resonances higher up. Changing those first two resonances changes part of the vowel’s acoustic pattern without requiring every frequency component to be changed together.",
        "children": []
      }
    ],
    "speech1-08": [
      {
        "text": "A recorded voice combines a **source** with a **filter**. The source supplies the sound energy, and the vocal tract changes which frequencies are emphasized. The formant frequencies describe the resonant pattern associated with that filtering.",
        "children": []
      },
      {
        "text": "An estimated model of the filter can be used to extract the source from the recorded sound. The resulting signal is approximately an **unfiltered voice**, which sounds like a buzz because the vowel’s particular pattern of amplification has been removed. The regression comparison concerns estimating the filter’s contribution within the combined signal.",
        "children": []
      },
      {
        "text": "The remaining source still supplies acoustic energy. Applying a filter to it can restore a vowel-like pattern of resonance. Separating the two contributions makes it possible to change the filtering while keeping the underlying source the same.",
        "children": []
      }
    ],
    "speech1-09": [
      {
        "text": "The original **filter** contains the first four formants estimated from the recording. Applying that pattern to the extracted source approximately restores the original resonances. It provides a comparison for changes to individual formants.",
        "children": []
      },
      {
        "text": "In the second filter, **F1 is raised slightly** while the other formants stay approximately the same. This changes the lowest resonance. In the third filter, **F2 is raised substantially**, changing the second resonance instead of the first.",
        "children": []
      },
      {
        "text": "The **source stays constant** across these versions. The different filters therefore act on the same underlying sound energy. A difference in the resulting vowel can be connected to the changed resonance pattern, rather than to a different speaker, a new recording, or a simultaneous change in every aspect of the voice.",
        "children": []
      }
    ],
    "speech1-10": [
      {
        "text": "**Multiplying the source by the filters gives new vowels** because a filter changes which frequencies in that source are emphasized. The original filter preserves the low-formant pattern. Raising F1 changes the lowest strong resonance, while raising F2 changes the second resonance instead.",
        "children": []
      },
      {
        "text": "**Source–filter synthesis** combines the same sound source with these different resonance patterns. The resulting vowel quality changes even though the underlying source has stayed the same. The sound that reaches the listener depends both on the energy supplied by the source and on how the filter shapes that energy.",
        "children": []
      },
      {
        "text": "Changing the filter is therefore a controlled way of changing vowel quality. A listener receives different acoustic patterns without the researcher having to obtain a new natural utterance for each vowel.",
        "children": []
      }
    ],
    "speech1-11": [
      {
        "text": "**Vowel space** describes vowels using combinations of formant frequencies. F1 and F2 provide useful coordinates because vowel qualities differ in the relationship between these resonances. A vowel occupies a range of possible values, rather than one point that every speaker must reproduce exactly.",
        "children": []
      },
      {
        "text": "**Anatomy, speaking rate, and context** affect those values. Speakers have different vocal tracts, and the sounds before and after a vowel influence how it is produced. These changes can make the measured formants of different vowels overlap.",
        "children": []
      },
      {
        "text": "Formant values can still provide a pretty good description of vowel space, especially for **one talker speaking carefully**. When other properties are held constant, changing the **steady-state formants**, the resonances in the relatively stable part of a sound, can produce recognizable approximations of different vowels. Natural speech also contains changes over time, so a steady resonance pattern is useful without being the entire signal.",
        "children": []
      }
    ],
    "speech1-12": [
      {
        "text": "The **pattern playback synthesizer** produces sound from a painted spectrographic pattern. The pattern specifies which frequencies contain energy at different times. Changing a painted band changes the acoustic pattern that the machine produces, allowing speech-like sounds to be constructed under controlled conditions.",
        "children": []
      },
      {
        "text": "Light passes through a **cylindrical lens** and a rotating **tone wheel**. A lens and a **45-degree mirror** direct the changing light toward the spectrogram pattern. Different parts of that pattern allow different amounts of light through.",
        "children": [
          "A **light collector and photocell** turn the resulting light fluctuations into an electrical signal. An amplifier strengthens that signal, and a loudspeaker turns it into audible sound."
        ]
      },
      {
        "text": "The researcher can change the frequency pattern without asking a speaker to repeat the utterance. The output depends on the specified acoustic pattern, which makes particular sound properties available for controlled manipulation.",
        "children": []
      }
    ],
    "speech1-13": [
      {
        "text": "The stop consonants **/b/, /d/, and /g/** are distinguished partly by **formant transitions**, the changes in resonance as the vocal tract moves into a vowel. Their audible release occurs while the jaw is opening, so information about the consonant is carried by this movement rather than only by a stable sound.",
        "children": []
      },
      {
        "text": "**Liberman and colleagues (1957)** used synthetic syllables in which the lower formant stayed similar while the upper formant started at different frequencies. The upper transition could rise into the vowel, stay relatively flat, or fall into the same stable vowel region.",
        "children": []
      },
      {
        "text": "The **pattern playback synthesizer** made these controlled speech-like sounds possible. Changing the onset of the upper formant changed the consonant information while leaving much of the following vowel alike. Listeners could therefore respond to differences in the transition without hearing entirely different utterances on every trial.",
        "children": []
      }
    ],
    "speech1-14": [
      {
        "text": "A **speech continuum** is a set of sounds that changes gradually along a controlled acoustic property. In the sequence from stimulus 1 to 13, **F1 stays constant** and **F2 onset frequency changes linearly**. Linearly means that each adjacent pair differs by the same programmed amount.",
        "children": []
      },
      {
        "text": "At one end, F2 starts below the vowel’s stable value and rises into it. As the starting frequency increases, the transition becomes flatter and eventually falls from above that stable value. The physical change is gradual even if the listener assigns different sound labels along the way.",
        "children": []
      },
      {
        "text": "A pair inside one phoneme category can be compared with an equally separated pair crossing a category boundary. Both pairs have the same physical difference. Better discrimination for one pair would therefore concern how the listener organizes the sounds, rather than a larger change built into the stimuli.",
        "children": []
      }
    ],
    "speech1-15": [
      {
        "text": "An **ideal observer model** states what responses would be expected under a particular account of perception. If perception is **noncategorical**, uncertainty should change gradually as a sound moves away from a clear example of a category. A **prototype** is that clear representative, rather than a boundary between categories.",
        "children": []
      },
      {
        "text": "The continuum has **/b/** at one end, **/g/** at the other, and **/d/** in the middle. Moving away from the /b/ prototype makes a sound less characteristic of /b/ and more characteristic of /d/. Under the proposed gradual pattern, stimulus 2 receives about **75% /b/** and **25% /d/** responses.",
        "children": []
      },
      {
        "text": "Categories become “blurry” between their prototypes because neighboring labels become plausible by degrees. The predicted /b/ responses fall as /d/ responses rise, and the same gradual exchange occurs between /d/ and /g/. The model predicts a smooth change in uncertainty rather than an abrupt switch.",
        "children": []
      }
    ],
    "speech1-16": [
      {
        "text": "A **labeling task** asks the listener to identify a sound, such as /b/, /d/, or /g/. A **discrimination task** asks whether two sounds are the same or different. One response names a category, while the other concerns whether a physical difference can be heard.",
        "children": []
      },
      {
        "text": "If perception of F2-onset differences is **linear**, equal physical differences should be equally easy to hear. For example, sounds 1 and 3 should be about as discriminable as sounds 5 and 7. Their positions on the continuum differ, but their programmed separation is equal.",
        "children": []
      },
      {
        "text": "This account predicts that **discrimination is independent of labeling**. Labeling responses can rise and fall around the prototypes because a category must be chosen. Discrimination should remain approximately constant across equally separated pairs, rather than improving specifically where the label changes.",
        "children": []
      }
    ],
    "speech1-17": [
      {
        "text": "**Liberman and colleagues (1957)** found **categorical perception** even though the acoustic continuum changed in equal steps. Early sounds mainly received /b/ labels, middle sounds /d/ labels, and later sounds /g/ labels. Responses changed abruptly near the boundaries instead of becoming gradually uncertain across the whole sequence.",
        "children": []
      },
      {
        "text": "**Discrimination was best near the /b/–/d/ and /d/–/g/ boundaries**. Sounds assigned to different phonemes were easier to distinguish than similarly spaced sounds assigned to the same phoneme. This relationship occurred in the one-step, two-step, and three-step comparisons, with chance near 50% correct.",
        "children": []
      },
      {
        "text": "Greater physical separation generally made discrimination easier, but separation alone did not explain the boundary peaks. Predictions based on labeling captured much of that pattern. Listeners also retained some sensitivity beyond the simplest categorical prediction, so identifying a category and detecting a difference were closely related without becoming the same measurement.",
        "children": []
      }
    ],
    "speech1-18": [],
    "speech1-19": [
      {
        "text": "In **beach–peach identification**, a listener uses one label through steps 1–5, gives mixed responses near step 6, and uses the other label by step 7. The abrupt change identifies the region where that listener stops treating the input as one word and begins treating it as the other.",
        "children": []
      },
      {
        "text": "For that listener, **discrimination is strongest for pairs 4–6 and 5–7**. Those pairs reach across the identification boundary. Pairs well inside a category are harder to distinguish, while 6–8 is intermediate because step 6 itself receives mixed labels.",
        "children": []
      },
      {
        "text": "Another listener switches labels later, around steps 6–7, and has stronger discrimination nearer that region. The exact boundary can differ between people. The shared relationship is that hearing a difference becomes easier near the point where a listener assigns different identities to the sounds.",
        "children": []
      }
    ],
    "speech1-20": [
      {
        "text": "**Not everyone has exactly the same category boundary**. One listener can change from beach to peach earlier in the continuum than another listener. The pairs that cross that boundary can therefore differ between people, even when everyone hears the same recordings.",
        "children": []
      },
      {
        "text": "**Discrimination is generally best between categories**. Two sounds can differ physically but remain hard to distinguish if both are heard as versions of the same phoneme. A similarly sized difference becomes easier to detect when the sounds receive different identities.",
        "children": []
      },
      {
        "text": "The shortened classroom task contained only **different trials**. Every pair was physically different, so “different” was always the correct physical answer. Responding “same” meant that the listener had failed to detect that difference. The procedure separates a difference present in the recordings from a difference the listener actually hears.",
        "children": []
      }
    ],
    "speech1-21": [
      {
        "text": "The **bear–pear identification** responses contain a fairly clear change in label, but the discrimination responses fluctuate across pairs. The **beach–peach** results also contain irregular changes rather than a perfectly smooth progression. A measured response curve can vary even when the stimuli were constructed systematically.",
        "children": []
      },
      {
        "text": "Identification and discrimination measure different behaviors. Naming a sound and detecting a difference can be affected differently across trials and listeners. A fluctuation at one tested position does not, by itself, mean that the listener has another phoneme category there.",
        "children": []
      },
      {
        "text": "The relevant comparison is between the region where labels change and the pairs that are easier to distinguish. Class data can contain that relationship alongside variability. The actual responses are evidence to evaluate, rather than a requirement that every tested pair reproduce an ideal curve exactly.",
        "children": []
      }
    ],
    "speech1-22": [
      {
        "text": "**Being worse at hearing some differences between sounds** can support recognizing a stable word. Different productions of the same phoneme vary physically. If every small difference created a new language identity, versions of the same sound or word would be treated as unrelated inputs.",
        "children": []
      },
      {
        "text": "**Categorical perception** reduces sensitivity to differences within a category while preserving distinctions between categories. The listener can treat several different acoustic versions as the same phoneme. Those versions then supply a stable unit for identifying a word.",
        "children": []
      },
      {
        "text": "The reduced sensitivity concerns variation that does not require a different linguistic identity. The system can overlook some differences between versions of one category while still responding to a difference that separates categories. Accurate recognition therefore does not require equally strong sensitivity to every physical detail.",
        "children": []
      }
    ],
    "speech1-23": [],
    "speech1-24": [
      {
        "text": "The **conditioned head turn procedure** measures whether an infant hears a sound change without asking for a spoken answer. The infant learns to turn toward the sound source when a change is associated with a visual reward. A learned turn provides a behavioral response that can be recorded.",
        "children": []
      },
      {
        "text": "**High-amplitude sucking** uses sucking behavior instead. As a sound repeats, sucking can decrease because the infant becomes accustomed to it. If changing the sound produces renewed sucking, the infant has responded differently to the new input.",
        "children": []
      },
      {
        "text": "Both procedures make auditory discrimination measurable before a child can name the sounds. The behaviors differ, but the question concerns whether the infant detects a controlled difference. The response is evidence about sensitivity to the change rather than an adult-style verbal judgment of the category.",
        "children": []
      }
    ],
    "speech1-25": [
      {
        "text": "**Eimas and colleagues (1971)** measured infant speech discrimination using **high-amplitude sucking**. Infants heard repeated synthetic syllables until responding declined. The sound then changed across an adult phoneme boundary, changed within a category, or stayed the same.",
        "children": []
      },
      {
        "text": "**Voice onset time**, or **VOT**, is the timing of voicing relative to the consonant release. In the **20D condition**, a change from **+20 to +40 milliseconds** crossed the adult category boundary. Sucking increased again after that change.",
        "children": [
          "In the **20S condition**, the change was also 20 milliseconds, but **−20 to 0** or **+60 to +80 milliseconds** stayed within a category. Sucking did not recover in the same way.",
          "In the **0 condition**, the sound did not change and sucking continued to decline."
        ]
      },
      {
        "text": "The larger response to a boundary-crossing change cannot be explained by its physical size alone, because the within-category change was equally large. Infants responded to category-related differences before they could produce word labels.",
        "children": []
      }
    ],
    "speech1-26": [
      {
        "text": "**Perceptual narrowing** means that sensitivity to some sound differences decreases as perception becomes tuned to the surrounding language. English-learning infants distinguish the tested **Hindi and Salish contrasts** more successfully early in infancy than near the end of the first year.",
        "children": []
      },
      {
        "text": "Many reach the discrimination criterion at **6–8 months**. Performance declines at **8–10 months** and is much lower by **10–12 months**. Infants who have experience with Hindi or Salish retain much stronger discrimination of the relevant contrast.",
        "children": []
      },
      {
        "text": "**Werker and Tees** connect this developmental change with language experience. Becoming better adapted to one sound system can accompany reduced sensitivity to distinctions outside that system. A developing speech-perception system therefore changes which differences remain easy to hear, rather than maintaining equal sensitivity to every contrast.",
        "children": []
      }
    ],
    "speech1-27": [
      {
        "text": "One account proposes that **categorical perception is a special property of the language system**. Under this account, the category-organizing abilities used in speech are already present very early. Their early appearance is treated as part of the explanation of how language develops.",
        "children": []
      },
      {
        "text": "The **“citizens of the world”** description proposes that children initially hear contrasts across languages. Exposure then tunes this broad system rapidly to the language the child hears. The surrounding language determines which distinctions remain useful.",
        "children": []
      },
      {
        "text": "In this account, development mainly narrows an initially broad set of abilities. The child preserves relevant early distinctions and loses sensitivity to others. The proposal concerns both the starting state of perception and the role of experience in shaping it, rather than simply the fact that adults hear their native language well.",
        "children": []
      }
    ],
    "speech1-28": [
      {
        "text": "**Categorical perception is not limited to language or to humans**. Similar category-related responses occur for nonspeech sounds and in animals without human language. A response pattern can therefore be categorical without requiring a mechanism devoted only to human phonemes.",
        "children": []
      },
      {
        "text": "Categorical behavior is also **task-dependent**. Naming a sound, deciding whether a pair differs, and giving a learned response place different demands on the listener. How the experiment asks for a response affects how strongly categorical the resulting performance appears.",
        "children": []
      },
      {
        "text": "**Infant speech perception is not completely universal**. Some early contrasts are easier to detect than others. Development involves differences in initial sensitivity as well as changes associated with language experience. These observations separate early category-related behavior from the stronger claim that every contrast starts equally available in a speech-specific system.",
        "children": []
      }
    ],
    "speech1-29": [
      {
        "text": "**Cutting and Rosner (1974)** tested **categorical perception of nonspeech sounds** by changing **rise time**. Rise time is how quickly a sound grows to a stronger amplitude after it begins. A rapid onset sounds more **plucked**, while a slower onset sounds more **bowed**.",
        "children": []
      },
      {
        "text": "The materials included **sawtooth waves and sine waves**, with speech syllables available for comparison. Changing the onset changed an auditory property without requiring the sounds to be different phonemes. The listener could still assign different perceptual labels.",
        "children": []
      },
      {
        "text": "For sawtooth waves, pluck responses decreased and bow responses increased over rise times from about **0 to 80 milliseconds**. Discrimination was strongest near the labeling change, around the middle of the range, rather than constant for equal rise-time differences. The relationship between category labels and discrimination can therefore occur in hearing sounds that are not speech.",
        "children": []
      }
    ],
    "speech1-30": [
      {
        "text": "**Jusczyk and colleagues (1977)** tested whether infants respond categorically to **nonspeech sounds**. They measured sucking after repeated exposure and compared a sound that stayed the same, a change within a category, and a change between categories.",
        "children": []
      },
      {
        "text": "Sucking declined as the repeated sound became familiar in all three conditions. With **no change** or a **within-category change**, responding stayed low. With a **between-category change**, sucking increased again before gradually declining.",
        "children": []
      },
      {
        "text": "The renewed response means that the category-crossing change was more effective at attracting a response than the within-category change. Infants can therefore display category-related discrimination for nonspeech input. Early appearance of this pattern does not make it exclusive to speech perception.",
        "children": []
      }
    ],
    "speech1-31": [
      {
        "text": "Chinchillas were trained through **operant conditioning**, in which a response is learned through its consequences. A **0-millisecond-lag** or **80-millisecond-lag** speech stimulus signaled that responding would lead to food. This rewarded signal is called an **SD**, or discriminative stimulus.",
        "children": []
      },
      {
        "text": "Intermediate **VOT** values tested how the trained response extended across a **/ga/–/ka/** continuum. Responses changed sharply across a limited range of timings in chinchillas and in human comparison listeners. The animals responded to the acoustic distinction without needing human language.",
        "children": []
      },
      {
        "text": "**Ohlemiller and colleagues (1999)**, with **Kuhl and Miller (1975)** also identified, connect this comparison to speech categorization. Increasing the initial burst and aspiration-noise intensity could shift the boundary toward a shorter VOT or change the curve’s steepness. Categorization therefore depended on acoustic properties in the animal responses as well as in human responses.",
        "children": []
      }
    ],
    "speech1-32": [
      {
        "text": "Some speech contrasts are **less salient**, meaning less noticeable, to infants than others. At **4–5 months**, English-learning infants respond more clearly to the native **[ma]–[na]** change than to the nonnative **[na]–[ŋa]** change. Longer looking after a change provides evidence that it was detected.",
        "children": []
      },
      {
        "text": "These sounds differ in the place where the nasal consonant is produced. **[ma]** begins with a bilabial nasal made with the lips, **[na]** with an alveolar nasal near the ridge behind the teeth, and **[ŋa]** with a velar nasal farther back. The comparison concerns sensitivity to these different places of articulation.",
        "children": []
      },
      {
        "text": "Filipino-learning infants have little same-versus-change difference for their native **[na]–[ŋa]** contrast at **6–8 months**, but a clearer difference at **10–12 months**. Experience can strengthen a distinction that starts weak. Development therefore includes learning to hear some differences more clearly, as well as narrowing sensitivity to others.",
        "children": []
      }
    ],
    "speech2-01": [],
    "speech2-02": [
      {
        "text": "In **Klatt’s speech-perception model (1979)**, sound reaches the **cochlea**, part of the inner ear. The peripheral auditory system analyzes the waveform into its frequency components. **Acoustic property detectors** respond to properties of that sound, and their activity changes as the input changes.",
        "children": []
      },
      {
        "text": "**Phonetic feature detectors** use those outputs to estimate features such as voicing. **Segmental analysis** organizes the features into a sequence of speech segments. A **segmental feature matrix** records that sequence, and **lexical search** uses it to activate possible words, or lexical hypotheses.",
        "children": [
          "A strict staged system finishes identifying the phonemes before identifying the word. Some physical differences are lost as the variable sound becomes a set of categories, allowing different recordings to activate the same unit."
        ]
      },
      {
        "text": "**Cascaded processing** passes partial information onward before a stage has finished. **Feedback** passes information in the reverse direction, allowing word knowledge to influence the interpretation of a phoneme. These are different ways in which stages can exchange information.",
        "children": []
      }
    ],
    "speech2-03": [
      {
        "text": "The **beach–peach continuum** changes **voice onset time**, or VOT. VOT is the delay between the release of the initial stop consonant and the start of vocal-fold vibration. A shorter delay supports the voiced /b/ in beach, while a longer delay supports the voiceless /p/ in peach. The rest of the word stays largely similar.",
        "children": []
      },
      {
        "text": "In **identification**, listeners give one word label through steps 1–5, mixed labels around step 6, and the other label for steps 7–9. The abrupt change marks the **category boundary**, where the sound is most ambiguous between the alternatives.",
        "children": []
      },
      {
        "text": "**Discrimination** is strongest near that change, particularly for pairs 4–6 and 5–7. Those pairs are easier to tell apart than equally separated pairs inside a category. The physical difference is held constant, while the category relationship affects how noticeable it is.",
        "children": []
      }
    ],
    "speech2-04": [
      {
        "text": "In a **threshold model**, activity passes to the next level only after reaching a required amount, the **threshold**. Evidence can change at the lower level without yet producing activity above it. The higher level waits for enough support to pass that requirement.",
        "children": []
      },
      {
        "text": "Feature activity fluctuates between evidence for **+voiced** and **−voiced**. Early changes stay below both thresholds, so the phoneme level remains inactive. A final rise crosses the +voiced threshold, and activation for **/b/** appears abruptly.",
        "children": []
      },
      {
        "text": "In this account, categorical perception occurs when the phoneme is identified. Word recognition receives the selected /b/ output, rather than every earlier fluctuation in the evidence. Two sounds that both cross the same threshold can therefore supply the same completed phoneme to the next stage.",
        "children": []
      }
    ],
    "speech2-05": [
      {
        "text": "In **cascaded processing**, activity passes forward continuously while processing is still underway. The phoneme level can respond to changing feature evidence instead of waiting until one feature has crossed a fixed threshold. A partially resolved input can already influence the next level.",
        "children": []
      },
      {
        "text": "More evidence for voicing gradually increases support for **/b/**. Evidence against voicing favors **/p/**. Different amounts of uncertainty remain available, so two sounds that eventually receive the same label can still produce different patterns of activation on the way to that choice.",
        "children": []
      },
      {
        "text": "A task can require one **categorical final answer** even when processing is graded. Clicking beach rather than peach does not establish that uncertainty disappeared at the earliest stage. The listener has to select one alternative, but several candidates can have been active before the decision.",
        "children": []
      }
    ],
    "speech2-06": [
      {
        "text": "A **lumber mill** transforms trees into lumber. A **furniture factory** accepts that lumber and produces unassembled furniture. An **IKEA customer** accepts the parts and assembles usable furniture. Each operation needs a particular product from the operation before it.",
        "children": []
      },
      {
        "text": "The factory cannot use an unprocessed tree as though it were finished lumber. The customer also cannot assemble the intended furniture directly from a tree. The required transformation has to occur before the next operation receives an input it can use.",
        "children": []
      },
      {
        "text": "**Thresholded processing** has that waiting relationship. A higher stage begins with the completed representation required from the lower stage. Partial work is not continuously passed onward in whatever unfinished form happens to be available.",
        "children": []
      }
    ],
    "speech2-07": [
      {
        "text": "In **thresholded activity**, each level accepts a specific kind of input that the previous level has already transformed completely. The next operation waits until the input has the required form. A changing but unfinished representation does not yet become its working material.",
        "children": []
      },
      {
        "text": "Applied to speech, word recognition waits for a completed phoneme output. It does not continuously receive every unresolved acoustic fluctuation while the phoneme is still being identified. The required product is the identified segment, just as furniture production requires lumber rather than an unprocessed tree.",
        "children": []
      },
      {
        "text": "This arrangement limits what later processing can know about earlier uncertainty. If several different sounds become the same completed phoneme, the word level receives that shared output. Distinctions removed during the transformation are no longer available through that strict forward pathway.",
        "children": []
      }
    ],
    "speech2-08": [
      {
        "text": "In a **food web**, connected populations affect each other while they are still changing. A drought reduces desert plants, which affects kangaroo rats and the snakes that depend on them. A downstream population responds to the changing food supply without waiting for the earlier population to reach a final state.",
        "children": []
      },
      {
        "text": "**Cascaded processing** has the same continuous dependence. Changing feature evidence can affect phonemes, and changing phoneme activity can affect words. The information does not have to be complete before influencing the next level.",
        "children": []
      },
      {
        "text": "Food-web relations also include reciprocal effects among hawks, snakes, lizards, rats, insects, scorpions, and desert foxes. **Feedback** in a processing network means that activity at a higher level can influence a lower level. Cascading concerns passing incomplete information forward, while feedback concerns influence in the reverse direction.",
        "children": []
      }
    ],
    "speech2-09": [
      {
        "text": "A **thresholded account** of word recognition waits for a completed phoneme decision. A **cascaded account** allows developing phoneme evidence to affect possible words while that decision is still unresolved. The difference concerns what information reaches word recognition before the final answer.",
        "children": []
      },
      {
        "text": "Two sounds can both receive a **/b/** label while differing in how ambiguous they are between /b/ and /p/. In a strict threshold system, the shared /b/ output makes them alike for the later word stage. In a cascade, the more ambiguous sound can continue to provide some support for the competing /p/ word.",
        "children": []
      },
      {
        "text": "Both systems can therefore predict the same final word choice while differing in the competition that comes before it. Measuring that earlier competition makes the accounts distinguishable even when final identification looks categorical.",
        "children": []
      }
    ],
    "speech2-10": [
      {
        "text": "**McMurray, Tanenhaus, Aslin, and Spivey (2003)** used a **visual-world eye-tracking task** to measure competition during spoken-word recognition. Participants heard sounds along a /b/–/p/ continuum while looking at objects. Changing VOT changed the evidence about the initial consonant.",
        "children": []
      },
      {
        "text": "The display contained **bear**, its sound-related competitor **pear**, and unrelated pictures of a **lamp and ship**. Participants selected the object matching what they heard. The target and competitor differed in their initial phoneme, while the fillers did not provide close word alternatives.",
        "children": []
      },
      {
        "text": "Eye movements recorded which pictures attracted attention before the final selection. A listener could eventually choose bear while having looked at pear during recognition. Those looks measured temporary support for a losing word, rather than requiring the losing word to become the final answer.",
        "children": []
      }
    ],
    "speech2-11": [
      {
        "text": "Participants used a **mouse click** to select the picture that best matched the spoken input. As VOT changed from a /b/-like onset toward a /p/-like onset, pear choices increased sharply. The identification boundary was near **17.5 milliseconds**.",
        "children": []
      },
      {
        "text": "The final responses formed a **step-like identification pattern**. Several different /b/-side tokens produced bear choices, while several /p/-side tokens produced pear choices. The task ended with one selected word even when nearby sounds differed physically.",
        "children": []
      },
      {
        "text": "A click records the **winning interpretation**. It does not record every candidate considered before that winner was selected. Categorical final choices therefore leave open whether the recognition process treated all sounds on one side of the boundary identically.",
        "children": []
      }
    ],
    "speech2-12": [
      {
        "text": "**Ambiguity is gradient**, meaning it varies by degree. Near the bear–pear boundary, more looking is directed toward the competing picture. This happens even when the compared trials end with the same word selected.",
        "children": []
      },
      {
        "text": "Among trials ending in **bear**, VOTs closer to the boundary produce more looks to **pear**. Among trials ending in pear, sounds closer to the boundary produce more looks to bear. The final label stays fixed within each comparison, but competitor activity changes.",
        "children": []
      },
      {
        "text": "Competitor looks rise after word onset and then decline as the target wins. More ambiguous sounds keep the competing word involved longer. The listener’s final answer is categorical, while the amount and duration of competition depend on the remaining acoustic uncertainty.",
        "children": []
      }
    ],
    "speech2-13": [
      {
        "text": "Each listener’s **category boundary** provides a reference for comparing competitor looks. Among bear responses, approaching that boundary increases looks to pear. Among pear responses, approaching it from the other side increases looks to bear. The effect is present within a final response category rather than only between different final choices.",
        "children": []
      },
      {
        "text": "The **early interval** is **300–1100 milliseconds** after onset. The **late interval** is **1100–1900 milliseconds**. Greater competitor looking near the boundary remains present in the later interval as well as during the earlier processing period.",
        "children": []
      },
      {
        "text": "Uncertainty therefore affects how long lexical competition lasts. A sound can support one eventual answer while still allowing a rival word to attract attention. Aligning the analysis to the listener’s own boundary connects that competition to the degree of ambiguity the listener experiences.",
        "children": []
      }
    ],
    "speech2-14": [
      {
        "text": "In a **cascade**, features pass developing evidence to phonemes, and phonemes pass it to words. A sound can consistently receive a /b/ label while varying in how strongly it supports the **voiced** feature. That variation can influence word candidates before one of them wins.",
        "children": []
      },
      {
        "text": "**/b/ and /p/** are both **bilabial stops**. Bilabial means produced with both lips, and a stop involves a closure followed by a release. Those shared properties support both sounds, leaving voicing as the uncertain property separating them.",
        "children": []
      },
      {
        "text": "Partial support for the losing phoneme also supports its word. Greater /p/ support during a bear response can keep pear active and increase looks toward its picture. The uncertainty is carried into lexical competition rather than erased immediately.",
        "children": []
      },
      {
        "text": "**TRACE** represents features, phonemes, and words at different possible times in the input. Repeated units allow a candidate to become active at a particular position as the spoken signal unfolds.",
        "children": []
      }
    ],
    "speech2-15": [
      {
        "text": "**Andruski and colleagues (1994)** found **semantic priming from nonwords** that partly matched real words. Semantic priming means that an earlier item makes a meaning-related target easier to process. It tests whether partial sound information can affect a word’s meaning.",
        "children": []
      },
      {
        "text": "Hearing **beace** facilitated a response to **war** because beace partly activates **peace**. Hearing **ging** facilitated **queen** because ging partly activates **king**. Neither altered input has to be accepted as a correctly formed word for a related lexical representation to receive some activation.",
        "children": []
      },
      {
        "text": "Ordinary related word primes, such as **bill before drug**, were compared with unrelated primes. Related inputs produced faster responses, while changing the prime’s initial sound could weaken that benefit. The amount of phonetic match therefore affected how much lexical and semantic support became available, rather than simply switching all access on or off.",
        "children": []
      }
    ],
    "speech2-16": [
      {
        "text": "As a sound approaches the **category boundary**, looks toward the other member of the **minimal pair** increase gradually. A minimal pair contains two words distinguished by one speech sound. The graded looking effect occurs even among sounds given the same final phoneme label.",
        "children": []
      },
      {
        "text": "A **cascaded account** retains the partial evidence that differs across those sounds. More support for the competing phoneme can pass into stronger activity for its word. The later word process receives information about degree of uncertainty, not only the eventual category name.",
        "children": []
      },
      {
        "text": "A strict **threshold-only account** passes the same completed phoneme for all those tokens. If their earlier differences have been discarded, the word level lacks the changing information needed to explain different amounts of competitor looking. The difficulty concerns the loss of distinctions before lexical processing begins.",
        "children": []
      }
    ],
    "speech2-17": [
      {
        "text": "**Lexical feedback** means that an activated word sends support back to the phonemes that make up that word. A partly matching sound can activate a possible word, and that word can then favor the phoneme interpretation compatible with its full form.",
        "children": []
      },
      {
        "text": "Influence can therefore operate in both directions. Sound evidence changes which words are active, while active words change the balance between interpretations of the sounds. The word level does not merely wait for a final lower-level output.",
        "children": []
      },
      {
        "text": "**Cascading and feedback are separate properties**. Cascading passes partial information forward, whereas feedback sends influence back toward an earlier level. A model can use both while the listener is still recognizing the word.",
        "children": []
      }
    ],
    "speech2-18": [
      {
        "text": "**Ganong (1980)** tested how **word knowledge affects phoneme identification**. Participants heard continua with a real word at one end and a nonword at the other. In **corpse–gorpse**, choosing one initial consonant produces a familiar word, while choosing the other does not.",
        "children": []
      },
      {
        "text": "The initial consonant changed across its category boundary in **5-millisecond steps**. This varied acoustic evidence while keeping a lexical difference between the endpoint interpretations. The listener had information about both the sound and whether a possible interpretation belonged to the vocabulary.",
        "children": []
      },
      {
        "text": "An ambiguous consonant could therefore receive extra support for the interpretation forming a real word. The task concerns whether lexical knowledge affects the way that consonant is identified, rather than only whether listeners can recognize the clear word endpoint.",
        "children": []
      }
    ],
    "speech2-19": [
      {
        "text": "A **late-correction account** lets phoneme perception proceed normally and adds a preference for reporting a real word afterward. With **corpse–gorpse**, a listener is biased toward saying corpse after the initial sound has already been categorized. The word preference affects the report rather than the earlier phoneme decision.",
        "children": []
      },
      {
        "text": "This predicts a **general reporting bias** across the continuum. The tendency to favor the word should not be restricted to only the most acoustically ambiguous region. Word knowledge supplies a later adjustment to the response.",
        "children": []
      },
      {
        "text": "The **word–nonword, neutral, and nonword–word conditions** differ in which consonant interpretation produces a real word. A late correction can shift reporting in those conditions without changing the location of the perceptual category boundary itself. That is a different prediction from having word knowledge resolve uncertainty during phoneme identification.",
        "children": []
      }
    ],
    "speech2-20": [
      {
        "text": "Under a **boundary-shift account**, word knowledge changes where the listener switches between phoneme categories. An ambiguous sound is more likely to receive the interpretation that forms a real word. The effect concerns the category decision, rather than a correction added only after that decision.",
        "children": []
      },
      {
        "text": "The largest lexical effect is expected **near the category boundary**. Clear endpoint sounds strongly support one consonant, so there is little uncertainty for word knowledge to resolve. Near the boundary, both interpretations are plausible and lexical information can exert more influence.",
        "children": []
      },
      {
        "text": "Differences between the lexical conditions should therefore grow in the ambiguous region and shrink at the endpoints. This pattern differs from a uniform report bias across all positions. The location of the effect is part of what separates the two explanations.",
        "children": []
      }
    ],
    "speech2-21": [
      {
        "text": "**Ganong’s results** have the largest word-related differences near the **phoneme category boundary**, with smaller differences toward the clearer endpoints. The identification curves shift depending on which consonant interpretation forms a real word. The effect is not an equal adjustment at every point in the continuum.",
        "children": []
      },
      {
        "text": "This pattern is consistent with a **shift in phoneme labeling** rather than only a uniform preference for saying a word afterward. Acoustic clarity still matters because the lexical effect is concentrated where the consonant is uncertain.",
        "children": []
      },
      {
        "text": "Ganong considered guessing strategies, while **interactive models** produce the effect through **lexical-to-phoneme feedback**. An active word supports its compatible sounds. This mechanism allows knowledge of a whole word to change the balance between interpretations of an ambiguous part.",
        "children": []
      }
    ],
    "speech2-22": [
      {
        "text": "A **TRACE simulation of the Ganong effect** begins with an onset ambiguous between **/b/ and /p/**. The following input supplies **/l/**, the vowel in plug, and a final **/g/** over time. Both onset candidates initially receive support because the first sound is uncertain.",
        "children": []
      },
      {
        "text": "Partial /b/ evidence can support **bl-** words, while partial /p/ evidence supports **pl-** words. Candidates receive more or less activation as additional sounds match or conflict with them. Recognition proceeds while the input is still arriving.",
        "children": []
      },
      {
        "text": "**Plug, blood, and blush** can receive support before the ending settles the competition. The final /g/ matches plug but conflicts with the endings of blood and blush. Activation for plug increases, competing words lose support, and feedback favors the phonemes compatible with plug.",
        "children": []
      }
    ],
    "speech2-23": [
      {
        "text": "As the input unfolds, **plug** gains support, especially when the **final /g/** arrives. **Blood and blush** can fit some earlier information, but their endings conflict with /g/. A candidate that was plausible at the beginning can lose support when the rest of the word arrives.",
        "children": []
      },
      {
        "text": "Stronger activation of **plug** sends feedback to **/p/**. The word’s beginning becomes favored because it matches the interpretation supported by the complete input. Later information therefore changes the balance between interpretations of an earlier ambiguous sound.",
        "children": []
      },
      {
        "text": "This is **top-down processing** within TRACE. A word-level representation influences a phoneme-level representation through the model’s connections. Lexical context contributes during recognition instead of being applied only as a final correction to an already completed report.",
        "children": []
      }
    ],
    "speech2-24": [
      {
        "text": "**TRACE** adapts the **Interactive Activation model** of written-word recognition to spoken language. Representations at different levels support compatible interpretations, while competing alternatives limit one another’s activity. A partially supported candidate can affect other levels before a final response.",
        "children": []
      },
      {
        "text": "In written-word recognition, visual features support letters and letters support words such as **WORK, WORD, WEAR, and WORM**. Word activity can also support compatible letters. Incomplete lower-level information can therefore be interpreted partly through knowledge of whole words.",
        "children": []
      },
      {
        "text": "Speech arrives over time rather than as one completed letter string. TRACE includes feature, phoneme, and word units at possible temporal positions. A word can receive early support and later lose it when new sound information no longer fits. The changing time course is part of the representation, rather than an afterthought added to a finished word decision.",
        "children": []
      }
    ],
    "speech2-25": [
      {
        "text": "**Categorical perception** means that equally separated sounds are harder to distinguish within a category than across categories. The category relationship affects sensitivity even when the physical difference is held constant. The final response can therefore divide a continuous acoustic range into distinct labels.",
        "children": []
      },
      {
        "text": "At the same time, acoustic ambiguity affects **word recognition**, and word knowledge affects **phoneme categorization**. Tokens with one final label can produce different amounts of lexical competition. Activated words can also support one interpretation of an unclear sound.",
        "children": []
      },
      {
        "text": "A categorical final answer therefore does not require completely isolated processing stages. Spoken-word recognition can begin while phonetic uncertainty is still being resolved. **Partial forward activation and lexical feedback** allow the levels to interact during that process.",
        "children": []
      }
    ],
    "speech2-26": [],
    "speech2-27": [
      {
        "text": "In **Allopenna and colleagues’ (1994) task**, listeners hear a word while viewing possible objects. For **beaker**, **beetle** is a **cohort competitor** because it shares the beginning. **Speaker** is a **rhyme competitor** because it shares the ending, and **carriage** is unrelated.",
        "children": []
      },
      {
        "text": "Looks toward the target and cohort competitor rise early because the initial sounds fit both beaker and beetle. When later sounds distinguish them, beaker looks keep increasing and beetle looks decline. The changing input removes support from a candidate that initially fit.",
        "children": []
      },
      {
        "text": "Rhyme competition follows a different time course because the overlapping sounds occur later. Eye movements record when candidates gain and lose support as the word unfolds. The final correct choice can therefore be preceded by temporary attention to more than one plausible object.",
        "children": []
      }
    ],
    "speech2-28": [
      {
        "text": "**Eye movements** measure changes in support for competing words over time. Target and cohort competition rise early, while rhyme competition follows a later and smaller pattern. The difference depends on when the overlapping sound information becomes available.",
        "children": []
      },
      {
        "text": "The **TRACE simulation** predicts a changing activation pattern for the same types of competitors. A candidate can fit the beginning, gain support, and then lose support as later sounds rule it out. A rhyme competitor receives useful matching information at a different point in the signal.",
        "children": []
      },
      {
        "text": "A final correct response does not preserve that history of competition. **Fixation probability across milliseconds** records when an alternative attracted looking and when it stopped doing so. That time course can be compared with the model’s changing activity, rather than judging the model only by which word ultimately wins.",
        "children": []
      }
    ],
    "sentence-01": [],
    "sentence-02": [
      {
        "text": "**“The horse raced past the barn fell”** is grammatical, but its beginning encourages an interpretation that makes the ending hard to understand. At first, **raced** can seem to be the main action performed by the horse. The words then appear to form a complete event before **fell** arrives.",
        "children": []
      },
      {
        "text": "The intended meaning is that **the horse that was raced past the barn fell**. “Raced past the barn” identifies which horse is being discussed, and “fell” states what happened to that horse. The shorter sentence leaves out “that was,” making this structure less immediately apparent.",
        "children": []
      },
      {
        "text": "The difficulty comes from assigning an early structure that the final word cannot fit. Recognizing each word is not enough to understand the sentence. Their grammatical relationships determine which action identifies the horse and which action is the main event.",
        "children": []
      }
    ],
    "sentence-03": [
      {
        "text": "The **garden path effect** occurs when an initially plausible sentence structure leads processing in the wrong direction. In **“The horse raced past the barn fell,”** a reader can first treat raced as the main verb. The final verb fell then conflicts with that interpretation.",
        "children": []
      },
      {
        "text": "Understanding requires treating **raced past the barn** as a modifier meaning “that was raced past the barn.” Fell becomes the main verb of the sentence. The early interpretation has to be revised rather than simply extended with another word.",
        "children": []
      },
      {
        "text": "A sentence can therefore be **grammatical but difficult to process**. The available correct structure does not guarantee that it is the structure selected first. Garden-path difficulty concerns the route taken while interpreting the sentence, not proof that the sentence has no possible grammatical meaning.",
        "children": []
      }
    ],
    "sentence-04": [
      {
        "text": "A **parser** works out a sentence’s grammatical structure as words are heard or read. It identifies which words belong together and how their groups relate. A **syntactic tree** represents these relationships, rather than merely listing the meanings of the individual words.",
        "children": []
      },
      {
        "text": "A **noun phrase, or NP**, groups a noun with associated material. A **verb phrase, or VP**, groups a verb with its complements. A **prepositional phrase, or PP**, includes a preposition and its object. These groupings determine how a modifier or action belongs in the sentence.",
        "children": []
      },
      {
        "text": "The parser works with **limited memory and limited time**. In the reduced-relative interpretation, the horse contains a modifier equivalent to “that was raced past the barn,” while fell remains the main verb. Maintaining that embedded structure is more complex than initially treating raced as the main verb. A processing account has to explain how a real cognitive system handles such alternatives as the input arrives.",
        "children": []
      }
    ],
    "sentence-05": [
      {
        "text": "**Minimal attachment** is a preference for initially building the **smaller syntactic tree**. A tree’s nodes represent grammatical groupings, so an analysis with fewer nodes requires less structure to be constructed at that point. The parser does not begin by fully building every possible interpretation.",
        "children": []
      },
      {
        "text": "Treating **raced** as the main verb gives a simpler early analysis of the horse sentence. Treating “raced past the barn” as a modifier requires an embedded clause inside the noun phrase. Under that more complex analysis, fell is the main predicate outside the modifier.",
        "children": []
      },
      {
        "text": "Choosing the simpler structure can reduce the initial demands on memory. It can also cause difficulty when a later word requires the more complex alternative. The garden path occurs because the initially preferred structure cannot incorporate the continuation, not because the correct structure is unavailable in the grammar.",
        "children": []
      }
    ],
    "sentence-06": [
      {
        "text": "**Late closure** is a tendency to attach new material to the clause or phrase currently being processed, keeping that structure open. In **“The burglar blew open the safe with the dynamite,”** “with the dynamite” is preferentially linked to **blew open**. The phrase then describes how the safe was opened.",
        "children": []
      },
      {
        "text": "Under this **verb-phrase attachment**, the dynamite is the instrument used in the action. Under the alternative **noun-phrase attachment**, the words form “the safe with the dynamite,” so the phrase identifies or describes the safe instead.",
        "children": []
      },
      {
        "text": "The same words allow both grammatical arrangements. The attachment determines whether the dynamite belongs to the action as its instrument or to the object as a property. A preference for one arrangement affects which event interpretation becomes available first.",
        "children": []
      }
    ],
    "sentence-07": [
      {
        "text": "In **“The burglar blew open the safe with the jewels,”** the preferred action-related attachment would make the jewels the instrument used to open the safe. That event is implausible. The sensible interpretation instead takes **with the jewels** as identifying the safe that contains them.",
        "children": []
      },
      {
        "text": "The parser has to use the **unpreferred noun-phrase attachment** to obtain that meaning. The difference is not that jewels is an unfamiliar word. It concerns which part of the sentence the phrase modifies.",
        "children": []
      },
      {
        "text": "**Reading times and eye movements** indicate slower processing when the sensible meaning requires this alternative attachment. The listener or reader can briefly adopt the wrong relationship and then revise it. A familiar grammatical preference can therefore create a processing cost even when the final meaning is straightforward.",
        "children": []
      }
    ],
    "sentence-08": [
      {
        "text": "An **autonomous parser** is proposed to make its earliest decisions using **abstract syntactic structure** rather than meaning. Autonomous means that its initial structural choices follow its own operating preferences. Semantic information is not used to choose the first parse in this account.",
        "children": []
      },
      {
        "text": "**Minimal attachment** favors a smaller tree, while **late closure** favors attaching incoming words to the structure already being processed. These preferences reduce the need to maintain every alternative fully. A preferred interpretation is selected before the continuation has necessarily resolved the ambiguity.",
        "children": []
      },
      {
        "text": "When a later word cannot fit, the parser revises that interpretation. Difficulty is expected when the initial structural preference has to be abandoned. This account therefore separates the earliest choice of structure from later correction based on the developing sentence.",
        "children": []
      }
    ],
    "sentence-09": [
      {
        "text": "A **reduced relative clause** modifies a noun without spelling out words such as “that was.” In **“Recent research reported by Ferreira and Clifton,”** reported means that someone reported the research. It is not the main verb describing an action performed by research.",
        "children": []
      },
      {
        "text": "Similar forms include **“referential information provided by the discourse,” “results obtained with global reading times,”** and **“examples cited here.”** The verbs introduce modifiers of information, results, and examples. These phrases can be understood readily despite using a structure associated with garden paths.",
        "children": []
      },
      {
        "text": "**MacDonald, Perlmutter, and Seidenberg (1994)** propose that **meaning and learned statistical regularities** affect parsing early. A structure’s formal complexity alone does not determine how difficult every use will be. The words involved, their usual grammatical patterns, and their plausible meanings can support the required interpretation.",
        "children": []
      }
    ],
    "sentence-10": [
      {
        "text": "In **“a noun phrase followed by a morphologically ambiguous verb,”** followed modifies noun phrase. In **“the initial syntactic analysis assigned to a sentence,”** assigned modifies analysis. In **“differences located on the critical disambiguating phrase,”** located modifies differences. Each verb belongs to a reduced-relative modifier rather than automatically becoming a new main verb.",
        "children": []
      },
      {
        "text": "**“A person presented with the evidence examined by the lawyer”** contains two such relationships. Presented modifies person, while examined modifies evidence. Understanding depends on keeping track of which noun each piece of information describes.",
        "children": []
      },
      {
        "text": "These constructions occur in readable scientific prose, including writing that argues for an autonomous parser. The presence of a reduced relative therefore does not make a sentence uniformly difficult. Lexical and semantic context can support the correct grouping even when its formal structure is complex.",
        "children": []
      }
    ],
    "sentence-11": [
      {
        "text": "In **“Recent research reported by…”**, research is **inanimate**, so it is unlikely to be the entity performing the reporting. Its meaning supports the interpretation that someone reported the research. The reduced-relative structure fits the expected relationship between the event and its participant.",
        "children": []
      },
      {
        "text": "**Reported** also occurs frequently in reduced relatives, particularly after research in scientific writing. **Lexical statistics** means these learned word-specific patterns of use. Familiarity with the construction and knowledge of the topic both favor the same analysis.",
        "children": []
      },
      {
        "text": "In **“The burglar arrested in the parking lot was charged today,”** the burglar is a plausible recipient of arrest. In the version beginning **“The policeman arrested…”**, policeman is also a plausible agent doing the arresting. More than one interpretation receives support. The grammatical structure remains alike, while the nouns’ likely roles change the competition between parses.",
        "children": []
      }
    ],
    "sentence-12": [
      {
        "text": "**Spivey and colleagues (1995)** asked participants to follow spoken instructions while viewing objects. The one-apple display contained **a pencil, a box, an empty towel, and an apple on a towel**. The instruction was **“Put the apple on the towel in the box.”**",
        "children": []
      },
      {
        "text": "**On the towel** can first sound like the destination of put, encouraging a plan to move the apple to the empty towel. In the intended meaning, it identifies the apple’s current location. **In the box** is the actual destination.",
        "children": []
      },
      {
        "text": "Participants often looked toward the empty towel before turning toward the box. The wording **“Put the apple that’s on the towel in the box”** makes the modifier explicit and reduces this temporary destination error. The eyes record an interpretation that can be considered before the final movement is completed.",
        "children": []
      }
    ],
    "sentence-13": [
      {
        "text": "In the **two-apple display**, one apple is on a towel and another is on a different support. “The apple” no longer identifies a unique object. The words **on the towel** can supply the information needed to select the intended apple.",
        "children": []
      },
      {
        "text": "With that visual context, eye movements proceed toward the target apple and then toward the box, rather than making the same detour toward the empty towel. The ambiguous wording and the explicit “that’s on the towel” wording have similar sequences and timing.",
        "children": []
      },
      {
        "text": "The local situation changes what the phrase is useful for. When there are two apples, a location modifier answers which apple is meant. Sentence interpretation can therefore depend on the objects currently available, not only on the sentence’s grammatical form in isolation.",
        "children": []
      }
    ],
    "sentence-14": [
      {
        "text": "With **one apple**, listeners hearing the ambiguous instruction make more looks toward the empty towel as a possible destination. With **two apples**, these incorrect-destination looks are substantially reduced. The same words can receive different early interpretations in the two contexts.",
        "children": []
      },
      {
        "text": "The **unambiguous instruction** produces relatively few destination errors in either display. Its wording already marks the towel phrase as a modifier. The largest cost of ambiguity therefore occurs when only one apple is present.",
        "children": []
      },
      {
        "text": "Two possible apples make extra identifying information useful. **On the towel** can then select the correct object before **in the box** gives its destination. The referential context, meaning which objects a phrase could refer to, helps determine the attachment of the location phrase.",
        "children": []
      }
    ],
    "sentence-15": [
      {
        "text": "**Semantic context** concerns meaning, while **pragmatic context** concerns how an expression is used in a particular situation. The same phrase can be interpreted differently depending on what a speaker must identify. With two apples, the location can specify which apple is intended.",
        "children": []
      },
      {
        "text": "With one apple, that identifying job is unnecessary, so the same location phrase can temporarily be taken as a movement destination. The comparison changes the local visual context while keeping the ambiguous sentence the same.",
        "children": []
      },
      {
        "text": "Incorrect-destination looks change during sentence processing, before the final action is completed. Context therefore affects the developing interpretation early. A purely syntactic account that chooses the same initial structure independently of context has difficulty explaining this difference between the displays.",
        "children": []
      }
    ],
    "sentence-16": [
      {
        "text": "**Syntactic ambiguity** can influence an actual arm movement, not only where the eyes look. Mouse-tracking measurements record the developing path of an action while the participant is interpreting the instruction. A competing destination can affect the route before the final target is selected.",
        "children": []
      },
      {
        "text": "In a **one-referent context**, ambiguous and unambiguous instructions produce more separated movement trajectories. In a **two-referent context**, their paths are more alike. A referent is the object that a phrase identifies, so the distinction concerns whether one or two apples could be meant.",
        "children": []
      },
      {
        "text": "The second apple makes a location modifier more appropriate and reduces interference from the competing destination interpretation. Sentence interpretation and action planning can therefore interact while both are still underway. The eventual correct movement does not erase the competition that affected its earlier path.",
        "children": []
      }
    ],
    "sentence-17": [],
    "sentence-18": [
      {
        "text": "**The** is a **determiner**, a word that introduces a noun phrase. It supports an expectation for a noun or words modifying a noun. The word does not yet identify the referent by itself, but it constrains the kinds of material that can complete the phrase.",
        "children": []
      }
    ],
    "sentence-19": [
      {
        "text": "**Pizza** is a **noun** naming the referent. It can serve as the head of a noun phrase, meaning the main word that the phrase is organized around. Its grammatical category identifies its role, while its meaning identifies a kind of food.",
        "children": []
      }
    ],
    "sentence-20": [
      {
        "text": "**Was** is a past-tense form of **be** and can function as an auxiliary. It supplies tense while allowing more than one grammatical continuation. A following phrase can describe a location, or a following participle can contribute to a passive construction.",
        "children": []
      }
    ],
    "sentence-21": [
      {
        "text": "**In** is a **preposition** expressing a relationship such as location. It begins a prepositional phrase that requires additional material to complete that relationship. A noun phrase can identify the place or container that the preposition relates to the rest of the sentence.",
        "children": []
      }
    ],
    "sentence-22": [
      {
        "text": "**The** is a **determiner**, so it introduces a noun phrase rather than naming a place on its own. After a preposition, this supports an expectation for a noun or a modifier leading to a noun. The construction is waiting for a phrase that can complete the preposition’s relationship.",
        "children": []
      }
    ],
    "sentence-23": [
      {
        "text": "**Eaten** is the **participial form of eat**, not a noun or the simple past-tense form. In the intended construction **“in the eaten,”** it appears where a noun is expected. This is a **word-category violation** because the type of word conflicts with the grammatical requirement, rather than merely producing an unusual food-related meaning.",
        "children": []
      }
    ],
    "sentence-24": [
      {
        "text": "The **early left anterior negativity**, or **ELAN**, is a brain response associated with **word-class violations**. It is an **event-related potential**, meaning a measured brain response aligned to an event such as the onset of a word. It appears about **100–200 milliseconds** after the critical word and is strongest at left/anterior recording locations.",
        "children": []
      },
      {
        "text": "**“The pizza was in the eaten”** places a participial form where the intended phrase expects a noun. **“The scientist criticized Max’s of proof the theorem”** places the preposition of where it does not fit the expected noun phrase. The mismatch concerns grammatical category.",
        "children": []
      },
      {
        "text": "The early timing prompted an account based on rapid **syntactic analysis**. The measurement concerns how the system responds when the arriving word is of an unexpected type. An unexpected category differs from a grammatically appropriate word with an implausible meaning.",
        "children": []
      }
    ],
    "sentence-25": [
      {
        "text": "For **visually presented words**, the early category-related response was localized to **visual cortex**. Visual cortex processes information about what is seen. In **Dikker and colleagues’ (2010)** account, an expected grammatical category generates predictions about the physical forms of upcoming words.",
        "children": []
      },
      {
        "text": "**“The beautiful princess”** and **“The beautifully princess”** differ in a visible ending that changes which kind of continuation is expected. The mismatch can involve an available form cue before the whole sentence has been interpreted.",
        "children": []
      },
      {
        "text": "**Form typicality** means how characteristic a word’s form is of a grammatical category. An early response can therefore concern a mismatch between a predicted word form and the form received. A category-sensitive effect in a visual task does not have to come entirely from a separate, abstract syntax mechanism.",
        "children": []
      }
    ],
    "sentence-26": [
      {
        "text": "**Perches** can belong to different grammatical categories. In **“Chris and Ben are glad that the bird perches seem easy to install,”** it names supports for birds and is a noun. In **“…the bird perches comfortably in the cage,”** it describes the bird’s action and is a verb.",
        "children": []
      },
      {
        "text": "**Needs** is also ambiguous. In **“The teacher told the principal that the student needs were not being met,”** it names requirements. In **“…the student needs to be more focused,”** it is a verb. The continuation resolves the category required in each sentence.",
        "children": []
      },
      {
        "text": "**Phonological form typicality** concerns how much a word’s sound form resembles noun forms or verb forms. A corpus analysis of **3,158 words** compared each form’s average distance from nouns and verbs. A word’s current grammatical role can differ from the category that its form usually resembles.",
        "children": []
      }
    ],
    "sentence-27": [
      {
        "text": "**Perches is noun-like and needs is verb-like** in their form-based tendencies. These descriptions concern statistical resemblance to word categories, not a rule restricting how either word can be used. Both words can function as nouns or verbs.",
        "children": []
      },
      {
        "text": "In **“the bird perches seem easy to install,”** the noun-like form is used as a noun. In **“the bird perches comfortably in the cage,”** the continuation requires a verb. The same visible form can therefore either match or conflict with its typical category.",
        "children": []
      },
      {
        "text": "**“The student needs were not being met”** uses the verb-like form as a noun, while **“the student needs to be more focused”** uses it as a verb. Comparing these versions separates the category required by the sentence from the category suggested by learned form similarities.",
        "children": []
      }
    ],
    "sentence-28": [
      {
        "text": "Reading slows when a word’s required category conflicts with its **form typicality**. A noun-like form such as **perches** produces a larger cost when the continuation resolves it as a verb. A verb-like form produces a larger cost when it must instead be understood as a noun.",
        "children": []
      },
      {
        "text": "The measure compares length-adjusted reading time at **disambiguation** with reading time at the earlier **point of ambiguity**. Disambiguation is where the continuation makes the grammatical role clear. A positive difference means that processing takes longer at that resolution.",
        "children": []
      },
      {
        "text": "The critical form can stay the same while the continuation changes its role. The larger cost for a mismatching role connects parsing with learned form statistics. A reader uses information about what a word looks or sounds like as well as the grammatical relationship eventually required.",
        "children": []
      }
    ],
    "sentence-29": [
      {
        "text": "The early **ELAN** response to a noun where a verb is expected depends on available form information. An effect occurs for nouns with informative **morphological marking**, meaning meaningful word parts, and for forms strongly associated with nouns. Neutral forms such as **infant** do not produce the same effect.",
        "children": []
      },
      {
        "text": "The comparisons include **“The beautiful princess” versus “The beautifully princess,” “The tasteless soda” versus “The tastelessly soda,”** and **“The cute infant” versus “The cutely infant.”** Princess supplies informative morphology, soda has a statistically noun-like form, and infant has weaker category-form evidence.",
        "children": []
      },
      {
        "text": "An abstract category violation alone therefore does not determine this earliest visual response. The expected grammatical category can predict a physical word form, and the observed response depends partly on whether the arriving form provides evidence of that mismatch.",
        "children": []
      }
    ],
    "sentence-30": [
      {
        "text": "**“Colorless green ideas sleep furiously”** has an acceptable grammatical organization but an implausible combined meaning. **Syntax and semantics are partly independent** because words can fit a grammatical structure without describing a sensible event.",
        "children": []
      },
      {
        "text": "**“The horse raced past the barn fell”** is difficult when the preferred early analysis cannot accommodate the final verb. Faster processing for preferred structures is consistent with shortcuts that reduce memory demands instead of fully maintaining every possible parse.",
        "children": []
      },
      {
        "text": "**“Put the apple on the towel in the box”** receives different early interpretations in different visual contexts. Meaning and communicative circumstances can affect the structure being selected before the sentence is finished.",
        "children": []
      },
      {
        "text": "**“The bird perches were comfortable”** uses a noun-like form as a noun. Very early category-related brain responses depend partly on learned form typicality and predictions about physical word patterns. They are not simply a pure readout of abstract grammatical structure.",
        "children": []
      }
    ],
    "sentence-31": [],
    "aphasias-01": [],
    "aphasias-02": [
      {
        "text": "**Aphasia** is a loss or impairment of language function after brain damage. In the **1870s, Lichtheim and Wernicke** proposed that different language problems could result from damage to different centers or the connections between them. A patient could lose one route through the system while retaining another.",
        "children": []
      },
      {
        "text": "In **Lichtheim’s House**, **A** stores sound images, **M** stores speech-movement images, and **B** represents concepts. The acoustic input route **a** carries sound to A, while the motor route **m** carries output from M toward articulation. These labels distinguish incoming sound, stored representations, meaning, and outgoing movement.",
        "children": [
          "Understanding requires the sound representation in A to reach B. Repeating a heard word requires A to communicate with M so that the sound can be reproduced."
        ]
      },
      {
        "text": "The numbered sites distinguish kinds of damage. **1** damages M and **2** damages A. **3** interrupts the connection between A and M, **4** the connection between M and B, and **6** the connection between A and B. **5** interrupts motor output and **7** acoustic input. Different tasks depend on different combinations of centers and pathways.",
        "children": []
      }
    ],
    "aphasias-03": [
      {
        "text": "The **Geschwind–Wernicke model** connects language functions with brain regions and the pathways between them. **Norman Geschwind revived the approach in the 1970s**. **Broca’s area** is toward the front in the frontal region, and **Wernicke’s area** is farther back in the temporal region. The **arcuate fasciculus** is a nerve-fiber pathway connecting them.",
        "children": []
      },
      {
        "text": "The **central sulcus**, also called the **fissure of Rolando**, and the **lateral sulcus**, or **fissure of Sylvius**, are major grooves in the brain. The lateral sulcus lies above the temporal region and helps locate that region relative to frontal areas.",
        "children": []
      },
      {
        "text": "Linguistic theories distinguished **syntax**, the grammatical organization of words, from word knowledge and meaning. A **dissociation** occurs when one ability is impaired while another is relatively preserved. A **double dissociation** adds a patient with the reverse pattern. Such comparisons make it possible to test more specific functional distinctions than simply language present versus absent.",
        "children": []
      }
    ],
    "aphasias-04": [
      {
        "text": "In **Fromkin’s (1997)** description, **Broca’s aphasia** includes pauses during word finding, missing grammatical material, and disturbed word order. **Grammatical morphemes** are small words or word parts that express grammatical relationships. Important content words can remain while the connections that normally organize a sentence are reduced.",
        "children": []
      },
      {
        "text": "Everyday spoken comprehension can appear relatively good, but controlled tests can reveal substantial difficulty. **Agrammatism** means difficulty producing or interpreting grammatical structure. Its association with Broca’s aphasia is imperfect. Some patients with Broca-area lesions are not agrammatic, and some agrammatic patients do not fit the neurological classification.",
        "children": []
      },
      {
        "text": "**Wernicke’s aphasia** often involves fluent speech with good pronunciation and intonation but poor word selection and comprehension. Substituted words can be related or unrelated to the intended meaning. **Neologisms** are invented word forms. Fluent delivery therefore does not ensure that the selected words express a coherent message.",
        "children": []
      }
    ],
    "aphasias-05": [
      {
        "text": "**Wernicke’s aphasia** can produce fluent **“word salad” or “Jabberwocky”**, including **neologisms**. A patient describing impaired vision said **“My wires don’t hire right.”** The sentence has a recognizable subject and verb pattern, but the selected words fail to express the intended visual problem.",
        "children": []
      },
      {
        "text": "Another health response began **“I felt worse because I can no longer keep in mind from the mind of the minds…”** Grammatical-sounding phrases continue without a coherent message. An aphasic physician also used invented forms such as **“demaploze” and “tubaboys.”**",
        "children": [
          "A fork was described as **“a need for a schedule,”** and a spoon as **“How many schemes on your throat.”** Words are produced fluently, but their selection does not provide an adequate object description."
        ]
      },
      {
        "text": "**Broca’s aphasia** can instead produce **telegraphic speech**, with important content words and few grammatical connections. A hospital account retained **“Monday,” “Dad,” “hospital,” “two doctors,” “thirty minutes,” “Wednesday,” “nine o’clock,” “Thursday,” “ten o’clock,” and “teeth.”** Pauses and missing grammatical particles make the account difficult to produce and follow, while surviving content words still convey parts of the event.",
        "children": []
      }
    ],
    "aphasias-06": [
      {
        "text": "A traditional division assigns **lexical activation or inhibition problems** to Wernicke’s aphasia and **grammar problems** to Broca’s aphasia. The **lexicon** is the system of stored word knowledge. Activation makes a word available, while inhibition reduces competing words that should not be selected.",
        "children": []
      },
      {
        "text": "**Broca’s original patient Leborgne**, nicknamed **Tan**, could produce essentially one syllable. He appeared to understand what was said and retain other abilities. His very restricted output was different from the partly informative but agrammatic speech associated with the later syndrome.",
        "children": []
      },
      {
        "text": "Those original cases may fit **apraxia of speech**, a problem organizing the movements needed to speak. A difficulty planning speech movements and a loss of grammatical knowledge are different proposed causes of limited output. The amount a person can say does not, by itself, identify which operation is impaired.",
        "children": []
      }
    ],
    "aphasias-07": [
      {
        "text": "A sharp distinction between **grammar and the lexicon** separates rules for combining words from stored word representations. Under the formal linguistic account, a new sentence is understood by constructing its grammatical structure. It is not necessary for the complete sentence to have been memorized before.",
        "children": []
      },
      {
        "text": "**“Colorless green ideas sleep furiously”** has a grammatical organization despite its unusual meaning. **“Furiously sleep ideas green colorless”** contains the same words without that organization. Knowing the word meanings and a familiar event is insufficient to explain why the two orders differ.",
        "children": []
      },
      {
        "text": "The proposed aphasia division links Wernicke’s aphasia with disrupted access to lexical items and Broca’s aphasia with disrupted grammar. This is a claim about separate processes, beyond the observation that one group tends to speak fluently and another does not. It predicts differences in the operations affected by damage.",
        "children": []
      }
    ],
    "aphasias-08": [
      {
        "text": "The **message level** organizes what the speaker intends to communicate, including the concepts, referents, event, and chosen perspective. A **referent** is the person, thing, or event being talked about. These intentions have to be converted into linguistic forms before speech can be produced.",
        "children": []
      },
      {
        "text": "At the **functional level**, word meanings and semantic roles are selected. **Lemmas** link intended concepts with lexical items, whose relation to their referents is generally arbitrary. At the **positional level**, word forms are ordered and grammatical operations organize sentence structure and affixes.",
        "children": [
          "**Phonological encoding** supplies the sound forms. Speech gestures then organize their articulation. Problems can therefore arise in choosing concepts, selecting words, arranging grammar, encoding sounds, or producing movements."
        ]
      },
      {
        "text": "**HOUSEBOAT and DOGHOUSE** have meanings related to their parts, but their formation still involves combining forms. The error **“easy enoughly”** supports an operation that adds morphology at the positional level. It is not simply the selection of one already stored, indivisible word.",
        "children": []
      }
    ],
    "aphasias-09": [
      {
        "text": "An **autonomous parsing account** proposes that sentence structure is computed independently of meaning. A person can use familiar words and context to follow everyday conversation while still struggling with the grammatical relationships required by a controlled test. Conversation supplies several sources of help at once.",
        "children": []
      },
      {
        "text": "In **“The burglar blew open the safe with the dynamite,”** the final phrase can describe the instrument of the action or modify the safe. The individual words remain the same, but their grammatical grouping changes. Understanding each word does not automatically determine that grouping.",
        "children": []
      },
      {
        "text": "A test of a **specific parsing deficit** must separate structural demands from easier routes based on familiar events or likely word relationships. Success in ordinary conversation does not establish intact comprehension of every grammatical arrangement. The task has to require the particular operation being investigated.",
        "children": []
      }
    ],
    "aphasias-10": [
      {
        "text": "Broca distinguished **articulate speech from comprehension**. A person who understands others but cannot produce intelligible speech provides evidence that these abilities can be affected differently. Poor production alone does not establish a loss of the ability to interpret language.",
        "children": []
      },
      {
        "text": "A proposed **syntactic impairment** is broader than difficulty moving the speech organs. It concerns grammatical organization and can affect both production and comprehension. Testing it therefore requires asking how the person understands sentences with different structural relationships.",
        "children": []
      },
      {
        "text": "A patient might produce little speech because articulation is difficult while retaining more grammatical knowledge than the output expresses. A comprehension task can test the interpretation without requiring a full spoken sentence. The distinction concerns what language knowledge is available versus what the patient can physically produce.",
        "children": []
      }
    ],
    "aphasias-11": [
      {
        "text": "**Broca’s aphasia** is almost always accompanied by some motor dysfunction. If speaking is effortful, a person may preserve the words carrying the most information and omit grammatical material. Such output can reflect an attempt to communicate despite impairment, rather than directly revealing that grammar itself has been lost.",
        "children": []
      },
      {
        "text": "**Competence** means linguistic knowledge, and **performance** means using that knowledge in a task. Chomsky’s distinction allows limited output to coexist with greater retained knowledge. Hughlings Jackson’s observation concerns what a patient manages despite impairment, not simply a transparent expression of everything the patient knows.",
        "children": []
      },
      {
        "text": "**Caramazza and Zurif (1976)** investigated comprehension as a way to test the grammatical claim beyond articulation. A sentence-interpretation task can require grammatical relationships without demanding a full spoken answer. Persistent structural difficulty there would extend beyond the physical effort of producing speech.",
        "children": []
      }
    ],
    "aphasias-12": [
      {
        "text": "**Conversation contains redundant cues** to a speaker’s intended meaning. In **“The dog bit the man,”** the meanings of dog, bite, and man support a familiar event. Ordinary English **subject–verb–object order** also favors taking the first noun as the agent, the participant performing the action.",
        "children": []
      },
      {
        "text": "A **heuristic** is a simplifying strategy that uses a regular pattern instead of a complete analysis. A listener might choose the likely biter or assume the first noun performs the action. Discourse context can supply further clues, allowing comprehension even if the grammar is not fully analyzed.",
        "children": []
      },
      {
        "text": "**“The dog that the man is biting is angry”** conflicts with those shortcuts. The **man** is doing the biting, and the **dog** receives it despite appearing first. The main-clause subject and the agent inside the relative clause are different roles. Correct understanding requires tracking the sentence’s relationships rather than relying only on plausibility or noun order.",
        "children": []
      }
    ],
    "aphasias-13": [
      {
        "text": "**Caramazza and Zurif** compared control sentences with several kinds of **center-embedded sentence**, in which one clause occurs inside another. Controls included **“The girl is kicking a green ball,” “The cat is chasing a blue bird,” “The girl is pulling a red wagon,”** and **“The man is reading a yellow book.”** The other controls involve a boy riding a new bicycle, a girl holding a broken doll, a boy throwing a round ball, and a boy carrying a sharp pencil. Normal order and event knowledge support the same actor.",
        "children": []
      },
      {
        "text": "**Semantically constrained** items contain an embedded clause but make the likely actor clear. Examples are **“The apple that the boy is eating is red,” “The wagon that the horse is pulling is green,” “The book that the girl is reading is yellow,”** and **“The bat that the boy is carrying is brown.”** Other items involve a boy holding a bicycle, a girl wearing a coat, a woman washing a dress, and a clown holding a balloon. Plausibility supplies a strong cue alongside grammar.",
        "children": []
      },
      {
        "text": "**Reversible** items allow either participant to act plausibly. They include **“The cow that the monkey is scaring is yellow,” “The horse that the bear is kicking is brown,” “The cat that the dog is biting is black,”** and **“The fish that the frog is biting is green.”** Other pairs concern a tiger chasing a lion, a boy hitting a girl, a woman hugging a man, and a boy kicking a girl. Grammar must distinguish who does what because either direction is possible.",
        "children": []
      },
      {
        "text": "**Improbable** items make ordinary expectations favor the wrong actor. They include **“The horse that the bird is kicking is brown,” “The lion that the baby is scaring is yellow,” “The bird that the worm is eating is blue,”** and **“The dog that the man is biting is black.”** Other items make a horse ride a man, a boy spank a woman, a robber chase a policeman, and a cat pat a girl. The noun inside the embedded clause performs the action even when that event is unusual.",
        "children": []
      }
    ],
    "aphasias-14": [
      {
        "text": "In **sentence–picture matching**, a patient hears a sentence and selects the picture that matches its meaning. The controlled conditions vary whether ordinary event knowledge helps identify the actor or whether grammar must carry that information. Accuracy is the measured outcome.",
        "children": []
      },
      {
        "text": "**Healthy controls** perform about equally well across controls, semantically constrained, reversible, and improbable sentences. **Wernicke’s patients** perform poorly overall. **Broca’s patients** do better when plausible event roles support the grammatical meaning and worse when they must track the roles without that help.",
        "children": []
      },
      {
        "text": "**Caramazza and Zurif** interpreted the Broca pattern as evidence of a **syntactic comprehension impairment**. The difficulty is not limited to producing speech. It appears when understanding who acted on whom requires the structural relationships, particularly when ordinary expectations cannot substitute for them.",
        "children": []
      }
    ],
    "aphasias-15": [
      {
        "text": "Distinguishing **grammar from the lexicon** makes the proposed impairment more specific than a label such as fluent or nonfluent. Grammar concerns relationships among words. Lexical processing concerns the stored words and how the relevant entries become available. Different impaired operations can produce different patterns across tasks.",
        "children": []
      },
      {
        "text": "A person can know a content word’s meaning but fail to assign it the correct role in a complex sentence. Another person can produce a fluent frame but choose words that do not express the intended message. The same broad measure of speaking ability would conceal that difference.",
        "children": []
      },
      {
        "text": "A **structure–function hypothesis** links a particular operation with the system supporting it. It must explain the controlled behavioral pattern, not only the patient’s general appearance. Testing specific operations allows more precise claims about what a lesion has affected.",
        "children": []
      }
    ],
    "aphasias-16": [
      {
        "text": "In **Dick and colleagues’ task**, listeners select **which animal performs the action**. The event remains the dog biting the cat, while the grammar changes. Recognizing the animal names alone is insufficient because the task asks which one is the actor.",
        "children": []
      },
      {
        "text": "**“The dog is biting the cat”** is an **active** sentence. **“It’s the dog that is biting the cat”** is a **subject cleft**. Both introduce the dog before the cat and put the actor first.",
        "children": []
      },
      {
        "text": "**“It’s the cat that the dog is biting”** is an **object cleft**. **“The cat is bitten by the dog”** is a **passive**. Both begin with the participant receiving the action. A first-noun-is-actor strategy gives the wrong answer, so grammar must distinguish the dog’s role from the cat’s role.",
        "children": []
      }
    ],
    "aphasias-17": [
      {
        "text": "**Healthy aging controls** identify the actor accurately across active, subject-cleft, object-cleft, and passive sentences. Aphasia groups have different levels and patterns of difficulty. **Anomic aphasia**, associated with word-finding difficulty, has better overall performance than several other groups but still declines on harder forms.",
        "children": []
      },
      {
        "text": "**Broca’s aphasia and conduction aphasia** produce a marked decline for object clefts and poorer performance for passives than for the easier forms. **Wernicke’s patients** have low accuracy across all four structures. The groups are not interchangeable in either overall accuracy or sensitivity to sentence form.",
        "children": []
      },
      {
        "text": "Broca’s patients are particularly vulnerable to **noncanonical structures**, forms that depart from the usual actor-first arrangement. Their active-sentence accuracy is also below the healthy level. The pattern therefore combines a general performance reduction with an additional cost for harder grammatical relationships.",
        "children": []
      }
    ],
    "aphasias-18": [
      {
        "text": "**Healthy undergraduates** also lose comprehension accuracy when processing is stressed. Conditions include faster or compressed speech, **low-pass filtering**, added noise, and remembering auditory or visual digit lists during sentence interpretation. Low-pass filtering removes higher-frequency information, while a digit-memory task adds a competing demand.",
        "children": []
      },
      {
        "text": "**Object clefts and passives** are especially vulnerable across the manipulations. Active sentences and subject clefts remain relatively easier. Combining stresses, including filtering with compression, produces larger losses than ordinary listening.",
        "children": []
      },
      {
        "text": "These listeners have no aphasic brain injury, yet taxing processing produces a disproportionate cost for difficult structures. A similar aphasia pattern can therefore reflect a **performance limitation**, not uniquely the loss of a grammatical rule. The comparison concerns how much processing demand an intact or injured system can handle.",
        "children": []
      }
    ],
    "aphasias-19": [
      {
        "text": "**Saygin and colleagues (2004)** asked participants to **match an action with an object**. In a nonverbal condition, an action such as licking is conveyed without spoken language and must be matched to something such as an ice cream. A linguistic condition supplies language-based information for the matching decision.",
        "children": []
      },
      {
        "text": "Aphasic participants are less accurate in both conditions. Their accuracy is about **93.4% for nonlinguistic items and 87.5% for linguistic items**, compared with **98.5% and 99.4%** for controls. Difficulties therefore extend beyond interpreting spoken sentences.",
        "children": []
      },
      {
        "text": "**Semantically related distractors** are more disruptive than unrelated alternatives. A wrong object related in meaning competes more with the correct action–object match. The task tests selecting the relevant meaning even when no grammatical sentence is required.",
        "children": []
      }
    ],
    "aphasias-20": [
      {
        "text": "Poorer **nonverbal action matching** is significantly associated with **damage to Broca’s area**. Participants must interpret a pantomimed action and choose the fitting object. The task does not require producing a spoken sentence or extracting the grammar of a heard sentence.",
        "children": []
      },
      {
        "text": "The lesion–performance relationship connects frontal damage with a comprehension demand outside language. A person can struggle to recover the relevant action meaning even when linguistic forms have been removed from the input.",
        "children": []
      },
      {
        "text": "The proposed deficit therefore has to account for action interpretation as well as grammatical findings. An association with Broca’s area does not, by itself, restrict every affected operation to syntax. The behavioral task identifies what information the patient has to use, while the lesion analysis identifies where damage is related to poorer performance.",
        "children": []
      }
    ],
    "aphasias-21": [
      {
        "text": "**Saygin and colleagues** compared matching **environmental sounds to pictures** with matching spoken descriptions. Hearing a cow moo requires selecting its picture in the nonverbal condition. Hearing **“cow mooing”** supplies language instead. Alternatives can be meaning-related, such as another animal, or unrelated, such as a violin.",
        "children": []
      },
      {
        "text": "Verbal and nonverbal accuracy is about **99.2% and 98.1% for controls** and **99.1% and 98.2% after right-hemisphere damage**. The corresponding values are **98.6% and 96.7% for anomic aphasia** and **96.3% and 95.2% for Broca’s aphasia**. These comparisons retain high performance in both versions.",
        "children": []
      },
      {
        "text": "**Wernicke’s aphasia** has the lowest accuracy, about **90.0% verbal and 91.3% nonverbal**. The verbal and nonverbal versions do not differ significantly. The difficulty therefore extends to retrieving meaning from environmental sounds, not only recognizing spoken words. Selecting a picture requires connecting either kind of auditory input with what it represents.",
        "children": []
      }
    ],
    "aphasias-22": [
      {
        "text": "Deficits in **verbal and nonverbal sound–picture matching** are associated with damage involving **Wernicke’s area**. Patients impaired on the environmental-sound task and patients impaired on the verbal task have overlap in posterior language-related regions. The input differs, but both tasks require connecting a sound with meaning.",
        "children": []
      },
      {
        "text": "A spoken description supplies words, while an environmental sound supplies information from an event such as an animal call. Poor performance across both types indicates that the impairment cannot be described solely as failure to recognize linguistic word forms.",
        "children": []
      },
      {
        "text": "The anatomical comparison connects the distribution of damaged tissue with a measured behavioral difficulty. Posterior damage is associated with problems in auditory comprehension that extend beyond language. The relevant common demand is relating meaningful auditory information to the correct object or event.",
        "children": []
      }
    ],
    "aphasias-23": [
      {
        "text": "The **language specificity of aphasia deficits** remains contested. Some patients are especially impaired on particular grammatical constructions. Some also struggle to interpret actions or environmental sounds without language. A complete account must accommodate both the specific linguistic vulnerabilities and the broader task difficulties.",
        "children": []
      },
      {
        "text": "**Controlled behavioral tests** quantify performance under conditions with different demands. They can distinguish word selection, grammatical-role assignment, action matching, and auditory meaning, rather than treating comprehension as one undifferentiated ability.",
        "children": []
      },
      {
        "text": "**Lesion analyses** relate those performance measures to the location of damage. A proposed structure–function relationship has to explain which operation the task requires and why damage in a particular region is associated with reduced success. Fluency or a broad diagnostic label alone does not provide that level of explanation.",
        "children": []
      }
    ],
    "aphasias-24": [],
    "aphasias-25": [
      {
        "text": "**Voxel-based lesion–symptom mapping** relates damaged brain locations to behavioral impairment across patients. A **voxel** is a small three-dimensional unit in an MRI image. Comparing damaged and spared voxels with symptom measures tests which locations are associated with particular difficulties.",
        "children": []
      },
      {
        "text": "**Fluency deficits** are more strongly associated with anterior, or front, regions. **Comprehension deficits** are more strongly associated with posterior, or back, regions. These are broad measures of speaking and understanding, rather than direct tests of one grammatical rule.",
        "children": []
      },
      {
        "text": "The pattern supports a rough **double dissociation**. Different damage distributions have different associations with production- and comprehension-related performance. MRI-based mapping makes the relationship measurable across patients instead of relying only on a single case and a broad description of its symptoms.",
        "children": []
      }
    ],
    "development1-01": [],
    "development1-02": [
      {
        "text": "The **nature-and-nurture question** asks how experience and built-in capacities contribute to language acquisition. **Nativist positions** developed from **Chomsky’s critique of Skinner**. Skinner’s behaviorist approach relied on general learning mechanisms such as reward and punishment, while Chomsky argued that these mechanisms could not explain the grammar children acquire.",
        "children": []
      },
      {
        "text": "For Chomsky, the important feature of language is **generativity**. Speakers can understand and produce new sentences they have never heard before. **Acquiring a language means identifying the abstract grammar that produces its sentences**, rather than memorizing a list of earlier utterances.",
        "children": []
      },
      {
        "text": "Grammatical and ungrammatical sentences are not **similar in any straightforward way**. A small change can make a sentence ungrammatical, while two grammatical sentences can look very different. Grouping sentences by surface resemblance does not directly separate everything the grammar allows from everything it excludes.",
        "children": []
      },
      {
        "text": "**Operant conditioning** changes behavior through rewards and punishments. Children are not consistently rewarded for grammatical sentences and punished for ungrammatical ones, so the required **reward/punishment contingencies** do not reliably occur during acquisition.",
        "children": []
      },
      {
        "text": "Nativist approaches propose **Universal Grammar**, innate knowledge about what languages can be like, and **language-specific acquisition processes**. Built-in constraints restrict possible grammars, while learning identifies the surrounding language’s grammar. Chomsky linked children’s rapid acquisition of comparably complex grammars to a specially equipped **“data-handling” or “hypothesis-formulating” ability**.",
        "children": []
      }
    ],
    "development1-03": [
      {
        "text": "Early theories treated **categorical perception** as **language-specific and species-specific** because it was then known mainly for human speech. Language-specific means restricted to language, and species-specific means restricted to a particular species. The proposal was that speech categories reflected a specialized human-language system.",
        "children": []
      },
      {
        "text": "Synthetic syllables change in equal steps along a **formant-transition continuum**, but listeners change labels abruptly among **/b/, /d/, and /g/**. The physical steps remain equal while their perceived identities divide into groups. Similarity is therefore partly organized by the language categories rather than acoustic distance alone.",
        "children": []
      },
      {
        "text": "**Discrimination is better near category boundaries** than inside a category. This relationship appears when sounds are compared one, two, or three acoustic steps apart. Increasing the distance can improve performance, but a fixed distance is also easier to hear when it crosses a phoneme boundary.",
        "children": []
      }
    ],
    "development1-04": [
      {
        "text": "The **conditioned head turn procedure** measures an infant’s detection of a sound change through an orienting response. An auditory event predicts a rewarding visual event, and the infant learns to turn toward its source. Detecting the auditory difference can therefore be recorded without a spoken judgment.",
        "children": []
      },
      {
        "text": "**High-amplitude sucking** uses a different behavior. Sucking can decline as a sound is repeated and becomes familiar. If changing that sound renews sucking, the infant has responded to a difference in the auditory input.",
        "children": []
      },
      {
        "text": "The procedures measure speech discrimination before infants can name or pronounce the tested sounds. A head turn and a sucking response are not phoneme labels, but they provide measurable evidence of sensitivity. The experiment controls what changes in the sound and examines how the infant’s behavior changes with it.",
        "children": []
      }
    ],
    "development1-05": [
      {
        "text": "**Eimas and colleagues (1971)** varied **voice onset time**, the delay from stop-consonant release to vocal-fold vibration. Infants first heard repeated synthetic syllables, and sucking declined during repetition. A controlled sound change then tested whether responding recovered.",
        "children": []
      },
      {
        "text": "In **20D**, VOT changed by **20 milliseconds**, from **+20 to +40 milliseconds**, crossing an adult phoneme boundary. Sucking increased again. The infant responded to the difference even though no verbal labeling response was required.",
        "children": [
          "In **20S**, the same 20-millisecond difference stayed within one adult category. The pairs were **−20 to 0** or **+60 to +80 milliseconds**, and sucking recovered much less.",
          "In the **0 control**, the sound remained unchanged and responding continued to decline."
        ]
      },
      {
        "text": "The two kinds of change had equal physical size. Their different effects therefore connect infant sensitivity with the category relationship, rather than only the amount of VOT change. Category-related discrimination is present before mature speech production.",
        "children": []
      }
    ],
    "development1-06": [
      {
        "text": "**Categorical perception** was proposed as a way of turning speech into a **symbolic representation** that language processes could use. A stable sound identity could be recovered from variable acoustic input. Finding this organization very early was taken as possible evidence of an innate speech-processing ability.",
        "children": []
      },
      {
        "text": "At about **four months**, infants are still developing basic motor skills, including using two hands to manipulate objects and holding up their head and chest while lying prone. Color vision and general visual acuity are also still developing. These are broad developmental comparisons, not the speech-discrimination measure itself.",
        "children": []
      },
      {
        "text": "Vocal production is only beginning to include more vowel-like sounds rather than creaky whines. Category-related perception therefore precedes mature production. The early timing contributed to the innateness interpretation, because the infants could respond systematically to speech differences long before speaking in an adult-like way.",
        "children": []
      }
    ],
    "development1-07": [
      {
        "text": "**Perceptual narrowing** is a developmental reduction in sensitivity to some sound distinctions. Around six months, English-learning infants can distinguish certain contrasts outside their own language. Some of those differences become harder to hear as experience tunes the system to the language used around them.",
        "children": []
      },
      {
        "text": "**Werker and Tees** compared discrimination of **Hindi and Salish contrasts**. Performance is relatively strong at **6–8 months**, lower at **8–10 months**, and much lower at **10–12 months** for English-learning infants. Infants with relevant Hindi or Salish experience retain stronger discrimination.",
        "children": []
      },
      {
        "text": "The developmental change is therefore related to which sound system is experienced. A distinction that can be detected early does not necessarily remain equally available. Adapting to native-language categories changes the differences to which perception stays sensitive.",
        "children": []
      }
    ],
    "development1-08": [
      {
        "text": "The **“citizens of the world” account** proposes that infants begin with broad, innate knowledge about speech. **Language-general** means that the starting knowledge is not limited to one particular native language. Categorical perception is treated as an early capacity of the language system itself.",
        "children": []
      },
      {
        "text": "Learning then **selects among innately specified contrasts**. The child’s experience identifies which of the available distinctions matter for the surrounding language. The result is a system tuned to that language rather than equally sensitive to every possible contrast.",
        "children": []
      },
      {
        "text": "Under this account, the main developmental change is narrowing a broad initial inventory. Experience preserves or emphasizes useful distinctions instead of having to build every category from an initially undifferentiated signal. This is a proposal about both the starting abilities and the work performed by learning.",
        "children": []
      }
    ],
    "development1-09": [
      {
        "text": "**Categorical perception occurs beyond language and beyond humans**. Nonspeech sounds can be organized categorically, and animals without human language can produce similar patterns. The behavior therefore does not establish a speech-only mechanism by itself.",
        "children": []
      },
      {
        "text": "The pattern is also **task-dependent**. Naming a stimulus and detecting a difference require different responses, so the form of the task can affect how categorical performance looks. A final label is not a direct record of every uncertainty during processing.",
        "children": []
      },
      {
        "text": "**Infant perception is not uniformly universal**. Some distinctions begin weak and become easier with relevant experience. Development must therefore include gains in sensitivity as well as narrowing. An account that only removes distinctions from a complete starting set leaves those learning-related improvements unexplained.",
        "children": []
      }
    ],
    "development1-10": [
      {
        "text": "**Cutting and Rosner (1974)** tested **categorical perception of nonspeech sounds** by varying **rise time**. Rise time is how long a sound takes to build toward a stronger amplitude. A fast onset sounds more **plucked**, and a slower onset sounds more **bowed**.",
        "children": []
      },
      {
        "text": "The materials include **sawtooth and sine waves**. In the sawtooth continuum, pluck labels decline and bow labels increase across the **0–80 millisecond** range. The sounds differ in an auditory property rather than a phoneme contrast.",
        "children": []
      },
      {
        "text": "Discrimination is strongest near the labeling transition around the middle of the range. Equal changes in rise time are not equally easy to distinguish at every position. The relationship between category labels and sensitivity can therefore arise in ordinary auditory organization without the input containing speech.",
        "children": []
      }
    ],
    "development1-11": [
      {
        "text": "**Jusczyk and colleagues (1977)** measured infant responses to **nonspeech sound changes**. Sucking declined during repeated exposure, and the stimulus then either stayed the same, changed within a perceptual category, or changed between categories. The conditions distinguish repetition from two kinds of difference.",
        "children": []
      },
      {
        "text": "After **no change** and a **within-category change**, sucking stayed relatively low. A **between-category change** renewed responding before it declined again. The infant’s sensitivity depended on which side of a perceptual boundary the sounds occupied.",
        "children": []
      },
      {
        "text": "This category-related response occurs early and for nonspeech material. Its early developmental appearance is therefore compatible with a broader auditory ability. The result separates evidence for early categorical organization from evidence that the organization operates only on language.",
        "children": []
      }
    ],
    "development1-12": [
      {
        "text": "Chinchillas learned to respond through **operant conditioning**, with food rewarding the trained behavior. A **0-millisecond-lag** or **80-millisecond-lag** speech sound served as an **SD**, a discriminative stimulus signaling that the response would be rewarded. Training linked an endpoint sound with an outcome.",
        "children": []
      },
      {
        "text": "Intermediate timings tested how the response generalized along a **/ga/–/ka/ VOT continuum**. The response proportion changed sharply over part of the range, broadly resembling the human category pattern. The animal could respond systematically without possessing a human phoneme system.",
        "children": []
      },
      {
        "text": "**Ohlemiller and colleagues (1999)** and **Kuhl and Miller (1975)** connect this comparison with speech categorization in nonhuman subjects. Changes in burst and aspiration-noise intensity could shift the boundary or its steepness. Acoustic information and learned responses affected the apparent category organization.",
        "children": []
      }
    ],
    "development1-13": [
      {
        "text": "**Narayan and colleagues (2010)** compared infant sensitivity to two **nasal place contrasts**. **/ma/–/na/** changes from a bilabial nasal made with the lips to an alveolar nasal near the ridge behind the teeth. **/na/–/ŋa/** changes from that alveolar location to a velar location farther back.",
        "children": []
      },
      {
        "text": "At **4–5 months**, English-hearing infants look longer after a change in /ma/–/na/. Their response differs much less between same and change trials for /na/–/ŋa/. The first distinction is more **salient**, meaning easier to notice, at that age.",
        "children": []
      },
      {
        "text": "Broad early speech sensitivity therefore does not mean equal sensitivity to every contrast. The tested /na/–/ŋa/ onset difference is initially difficult even when language experience is considered. An early starting system can contain uneven sensitivities rather than a complete set of equally strong phonetic distinctions.",
        "children": []
      }
    ],
    "development1-14": [
      {
        "text": "Exposure in a **Filipino language environment** increases the salience of the native **/na/–/ŋa/** contrast between roughly **6 and 10 months**. Filipino-learning infants at **6–8 months** have similar looking times for same and change trials. At **10–12 months**, looking is longer after the change.",
        "children": []
      },
      {
        "text": "The distinction was weak early, rather than already strong and merely preserved. English-hearing infants also have weak early sensitivity to this contrast despite clearer sensitivity to /ma/–/na/. The relevant language environment is associated with a later gain in discrimination.",
        "children": []
      },
      {
        "text": "**Experience can strengthen a speech distinction**. Learning is therefore not restricted to narrowing an initially complete inventory. For some contrasts, exposure helps establish an effective distinction that was not readily perceived at the beginning.",
        "children": []
      }
    ],
    "development1-15": [
      {
        "text": "**Emergentist approaches** propose that language patterns can develop through learning from the structure of experience. **Associative learning** is sensitive to events that repeatedly occur together or predict one another. Statistical regularities in the environment change the connections that guide a response.",
        "children": []
      },
      {
        "text": "In conditioning, food produces a response such as salivation. When a bell is repeatedly paired with food, the connection can strengthen until the bell also produces the response. The learning depends on the relationship between experienced events.",
        "children": []
      },
      {
        "text": "Applying this idea to **pattern recognition** means learning which stimulus properties tend to go together. Repeated acoustic relationships can affect how speech sounds become grouped. The categories are shaped by the distribution of the input rather than each having to be fully specified in advance.",
        "children": []
      }
    ],
    "development1-16": [
      {
        "text": "A **vowel space** locates vowels using **F1 and F2**, the first and second resonant frequencies of the vocal tract. Repeated productions do not occupy one exact point. Each vowel forms a distribution, and the distributions of different vowels can overlap.",
        "children": []
      },
      {
        "text": "In the account associated with **Kuhl and others**, listeners learn regularities in these experienced distributions. Frequently encountered combinations provide more support than rare ones. Learning concerns the pattern of many sound tokens rather than memorizing one perfect recording.",
        "children": []
      },
      {
        "text": "A **prototypical /a/** can reflect a central or especially frequent part of the /a/ distribution. A **mean** is an average location, and a **mode** is the most frequent value or region. The prototype can therefore be learned from what the listener hears, rather than assigned one universal acoustic value before experience.",
        "children": []
      }
    ],
    "development1-17": [
      {
        "text": "**Maye and colleagues** gave infants passive exposure to different **VOT distributions**. A **bimodal distribution** has two concentrations of examples and supports two categories. A **unimodal distribution** concentrates examples near the middle and supports one category. The difference concerns how often sounds occur at different points in the range.",
        "children": []
      },
      {
        "text": "At test, **stimuli 3 and 6** were either alternated or repeated without alternation. The physical test sounds were the same for both exposure groups. Any group difference therefore concerns the earlier distribution rather than a larger test contrast.",
        "children": [
          "Six-month-old **unimodal** infants looked for **4.85 seconds alternating and 4.53 seconds non-alternating**. The eight-month-old values were **4.98 and 5.20 seconds**. Neither age group reliably differentiated these conditions.",
          "Six-month-old **bimodal** infants had values of **5.66 and 6.41 seconds**. Eight-month-olds had **5.45 and 6.15 seconds**. Only the bimodal-exposure groups were sensitive to the difference between conditions."
        ]
      },
      {
        "text": "Exposure to two clusters supported treating the tokens differently, while exposure to one central cluster supported treating them as members of one category. The distribution of experience affected how the same later sounds were organized perceptually.",
        "children": []
      }
    ],
    "development1-18": [
      {
        "text": "**Social interaction changes the effects of speech exposure**. Nine-month-old American infants received **twelve 25-minute sessions** and were tested on a Mandarin contrast with a head-turn procedure. Live interaction with a Mandarin speaker produced better performance than English exposure. Television and audio-only Mandarin did not produce the same benefit.",
        "children": []
      },
      {
        "text": "The conditions all supplied exposure, but the interactive setting changed what was learned. Hearing another language through a recording did not have the same consequence as taking part in a live exchange with its speaker.",
        "children": []
      },
      {
        "text": "In a separate manipulation, maternal responses were **contingent**, timed to the infant’s vocalization, or **noncontingent**, delivered at unrelated times. Contingent feedback increased syllable-like vocalizations more strongly.",
        "children": []
      },
      {
        "text": "Social responses can therefore reinforce vocal behavior. Proposed accounts include an innate attraction to social interaction and an early ability to use other people’s cues. The social timing and context of input can affect what the learner does with the acoustic information.",
        "children": []
      }
    ],
    "development1-19": [
      {
        "text": "**Statistical learning with constraints** means that not every acoustic difference becomes a new language category. A **contrastive property** helps distinguish language units. Differences in speaker identity or speaking rate change a sound without necessarily changing its phoneme identity.",
        "children": []
      },
      {
        "text": "**Earlier learning** also shapes later learning. An established perceptual pattern affects which new regularities are easy to notice and acquire. The learner does not approach every new input with exactly the same starting organization.",
        "children": []
      },
      {
        "text": "**Social and interactive context** affects how the input is used. The same sounds can occur during a responsive exchange or through a recording with no interaction. Learning therefore depends on which properties are treated as relevant, what has already been learned, and the conditions under which the sounds are experienced.",
        "children": []
      }
    ],
    "development2-01": [],
    "development2-02": [
      {
        "text": "**Word segmentation** is finding words within continuous speech. There are no physical boundaries that consistently separate every word. Listeners recover familiar word forms from a changing **“sea of sounds”** without receiving a space-like marker at each division.",
        "children": []
      },
      {
        "text": "A brief silence can occur inside a word because the speaker closes part of the vocal tract to produce a consonant. Silence therefore cannot always be treated as the end of a word. The same acoustic event can occur at different kinds of position.",
        "children": []
      },
      {
        "text": "Recognizing a word requires organizing the sound stream into units despite that uncertainty. Segmentation concerns where the sound form begins and ends. Finding a recurring unit is a distinct problem from already knowing what that unit means.",
        "children": []
      }
    ],
    "development2-03": [
      {
        "text": "Some words occur **in isolation**, such as **“Hello,” “No,” “Please,” “Go,” and “Stop.”** Those utterances make a word-sized form relatively clear. Many other words are heard mainly in connected speech, so isolated exposure cannot explain all word segmentation.",
        "children": []
      },
      {
        "text": "**Phonotactics** concerns which sound combinations are permitted or common in a language. The joins in **wordboundary** and **speechcode** can contain sequences unusual inside one word. **Movement** cautions that an apparent internal join does not necessarily separate two whole words.",
        "children": []
      },
      {
        "text": "**Stress** is another grouping cue. Many English words begin with a strong syllable. **Jusczyk and colleagues (1999)** familiarized **7.5-month-olds** with **kingdom**, stressed initially, or **device**, stressed on the second syllable. Infants preferred passages containing kingdom but did not show the same preference for device.",
        "children": []
      },
      {
        "text": "The passages included **“Your kingdom is in a faraway place”** and **“sail to that kingdom,”** with device likewise embedded in sentences. The comparison concerns detecting a familiar word in running speech. The position of stress can make one candidate boundary easier to use than another.",
        "children": []
      }
    ],
    "development2-04": [
      {
        "text": "In **pretty baby**, the first syllable of pretty strongly predicts its second syllable. The transition from the end of pretty to the beginning of baby crosses a word boundary and is less predictable. Words can therefore contain more reliable syllable transitions than the sequences joining neighboring words.",
        "children": []
      },
      {
        "text": "**Transitional probability** is the chance of a particular next syllable given the syllable just heard. It compares how often the pair occurs with how often the first syllable occurs. A frequent pair is not necessarily highly predictable if its first syllable also has many other continuations.",
        "children": []
      },
      {
        "text": "**f** means frequency of occurrence. The comparison is \\[\\frac{f(\\mathrm{pretty})}{f(\\mathrm{pre})}\\gg\\frac{f(\\mathrm{tyba})}{f(\\mathrm{ty})}\\] The left ratio asks how reliably pre leads to the rest of pretty. The right ratio asks how reliably ty leads into ba. The much stronger within-word relationship supplies evidence that pretty belongs together as a unit.",
        "children": []
      }
    ],
    "development2-05": [
      {
        "text": "The **likelihood of syllable B following syllable A** tends to be greater within a word than across a word boundary. This makes predictability a useful cue for grouping. It does not put a physical separator into the sound or guarantee one interpretation in every case.",
        "children": []
      },
      {
        "text": "**“What’s that in the road a/head?”** allows competing divisions around a and head. **“I scream, you scream, we all scream for ice cream”** contains similar sound sequences grouped into different words. A listener must decide how the sounds belong together.",
        "children": []
      },
      {
        "text": "**Low transitional probability** can support a possible boundary, while stronger internal transitions support a recurring unit. These are probabilistic relationships. The acoustic sequence and learned patterns can support more than one segmentation, so a cue changes the evidence rather than replacing the entire interpretation process.",
        "children": []
      }
    ],
    "development2-06": [
      {
        "text": "**Saffran and colleagues (1996)** used an **artificial language** to isolate statistical information in word segmentation. The language contained three-syllable units such as **tokibu, gikoba, and gopila**. Its construction allowed sequence regularities to be tested without the usual mix of other cues in natural speech.",
        "children": []
      },
      {
        "text": "The stream was **monotone**, with no systematic pitch, duration, or amplitude changes marking words. Its simple **consonant–vowel syllables** also prevented unusual sound combinations from identifying the intended boundaries. These controls reduced alternative reasons to group the syllables.",
        "children": []
      },
      {
        "text": "The syllables occurred continuously with **no pauses between words**. A listener therefore received an uninterrupted sequence rather than pre-separated items. Sensitivity to recurring groups had to depend on the organization of the syllable sequence rather than stress, silence, or a distinctive boundary sound.",
        "children": []
      }
    ],
    "development2-07": [
      {
        "text": "The continuous stream **tokibugikobagopila** includes recurring units such as **tokibu, gikoba, gopila, and tipolu**. In **tokibugikobagopilatipolu**, several units occur back to back. There are no heard spaces announcing where one stops and the next begins.",
        "children": []
      },
      {
        "text": "The learner receives the syllables in their actual sequence. Repetition makes particular transitions reliable, even though the input has not already been divided into words. Learning a unit therefore requires detecting a relationship among adjacent syllables.",
        "children": []
      },
      {
        "text": "**Stable internal sequences** can provide evidence about which sounds belong together. Their recurrence differs from simply hearing a pause after each group. Segmentation has to recover the organization from a continuous input rather than read off an explicit boundary marker.",
        "children": []
      }
    ],
    "development2-08": [
      {
        "text": "**Tokibu, gikoba, gopila, and tipolu** preserve their internal syllable order across repetitions. Their neighbors can change because different whole units can follow one another. The regularity inside a unit is therefore stronger than the regularity across its boundary.",
        "children": []
      },
      {
        "text": "A word’s first syllable reliably predicts its next syllable within this artificial language. The final syllable can instead lead into different words, so the next syllable is less predictable there. These local differences provide evidence for grouping a recurring sequence.",
        "children": []
      },
      {
        "text": "Identifying that statistical organization does not mean that gaps were present in the recording. The sound remains continuous. The learner has inferred units from the different predictability of within-word and between-word transitions.",
        "children": []
      }
    ],
    "development2-09": [
      {
        "text": "Testing **transitional probability** requires separating predictability from raw frequency. Half the intended words are repeated more frequently than the other half. A **part-word** spans an intended boundary. Test part-words can be chosen to occur as often as real words, so simply preferring a familiar three-syllable string cannot explain the distinction.",
        "children": []
      },
      {
        "text": "In **tokibu gikoba gopila gikoba tokibu gopila tokibu gikoba gikoba tokibu**, **GOPILA and BU-GIKO each occur twice**. Their full-string counts match, but their syllables do not predict each other equally reliably. The relevant question is how often a particular next syllable follows its predecessor, not simply how often three syllables occur somewhere in the stream.",
        "children": [
          "**GO–PI and PI–LA** each have probability \\[\\frac{2}{2}=1\\] Every relevant occurrence of the first syllable is followed by that next syllable.",
          "**BU–GI** has probability \\[\\frac{2}{4}=0.5\\] BU occurs four times, but only two instances lead into GI."
        ]
      },
      {
        "text": "A boundary-spanning part-word therefore contains a weaker internal transition despite matching the word in total frequency. Distinguishing them requires using the relationship between syllables, not only how often the complete test item occurred.",
        "children": []
      }
    ],
    "development2-10": [
      {
        "text": "Infants **looked longer toward part-words** than toward words from the artificial language. The test sequences differed in statistical organization even though their total occurrence frequencies were matched. The result is therefore not explained simply by having heard one whole test string less often.",
        "children": []
      },
      {
        "text": "The preference is a **novelty effect**. A sequence crossing the learned boundary is treated differently from a unit whose syllables consistently belong together. Looking provides a response measure without asking the infant to state a boundary.",
        "children": []
      },
      {
        "text": "The relevant learning concerns how reliably one syllable predicts another. Infants used structure in the continuous stream to distinguish a word from a frequency-matched part-word. Segmentation can therefore be sensitive to conditional relationships rather than raw repetition alone.",
        "children": []
      }
    ],
    "development2-11": [
      {
        "text": "**Identifying a word’s referent** means learning what the word names. Finding the sound pattern **cat** in speech and knowing which entity it refers to are different accomplishments. The first concerns the spoken form, while the second concerns its relationship to meaning.",
        "children": []
      },
      {
        "text": "**Segmentation** can identify a recurring unit without establishing its referent. The same surrounding situation can contain several objects, properties, and actions. Hearing a word while those things are present does not directly label which one is intended.",
        "children": []
      },
      {
        "text": "Word learning must connect the recognized sound form with the speaker’s intended referent. Detecting a reliable syllable sequence therefore solves part of acquisition without automatically solving the meaning problem. A child must also use evidence about what the expression is being used to name.",
        "children": []
      }
    ],
    "development2-12": [
      {
        "text": "The **inductive problem of early word learning** is that one encounter can support many possible meanings. Near a cat, a new word could name **CAT, ANIMAL, PET, or FELIX**. These alternatives differ in whether they pick out a category, a broader class, a role, or one individual.",
        "children": []
      },
      {
        "text": "The same event also supports **FURRY, ALIVE, WALKING, WHISKERS, or LEG**. Those are properties, a state, an action, and parts of the animal. Simply having a word and a visible cat together does not uniquely select one of them.",
        "children": []
      },
      {
        "text": "The **hypothesis space** is the set of candidate meanings consistent with the experience. **Quine’s gavagai problem** describes this uncertainty about reference. Word learning requires evidence or constraints that narrow the alternatives, rather than assuming that a single word–scene pairing makes the intended meaning obvious.",
        "children": []
      }
    ],
    "development2-13": [
      {
        "text": "**Joint attention** means sharing an attentional focus with another person. An adult and child coordinate which object or event the interaction concerns. This provides information about reference beyond whichever object happens to be most noticeable to the child alone.",
        "children": []
      },
      {
        "text": "**Gaze following** emerges around **nine months**. Infants can follow the direction of another person’s eyes toward something that person is attending to. The speaker’s gaze provides a cue about what a label may be intended to name.",
        "children": []
      },
      {
        "text": "Coordinating attention can narrow the possible referents of a new word. The child can connect the spoken expression with the adult’s focus, rather than pairing it indiscriminately with everything in the scene. Shared attention concerns the relationship between two people and a referent, not just looking at an object independently.",
        "children": []
      }
    ],
    "development2-14": [
      {
        "text": "In **Baldwin and colleagues’ joint-attention condition**, an adult interacted with an infant and labeled the object the infant was playing with. The spoken word occurred within a visibly shared focus. The adult’s behavior made the referential relationship part of an interaction.",
        "children": []
      },
      {
        "text": "In the **no-joint-attention condition**, a voice behind a screen supplied the label while the object was present. A word and an object were available in both conditions, but the visible coordination with a speaker differed.",
        "children": []
      },
      {
        "text": "**Eighteen-month-olds** learned the novel word in the joint-attention condition but not in the no-joint-attention condition. Temporal co-occurrence alone did not produce the same outcome. The social organization of reference affected which association the child learned.",
        "children": []
      }
    ],
    "development2-15": [
      {
        "text": "**Intentional cues** provide evidence about what a speaker is trying to refer to. **Eye gaze** can identify an object different from the one the child is currently handling. The speaker’s intended label does not have to match the child’s own immediate focus.",
        "children": []
      },
      {
        "text": "Baldwin tested **16–17-month-olds and 18–19-month-olds**. In **follow-in labeling**, the adult looked at the toy already occupying the child’s attention. In **discrepant labeling**, the adult looked toward a toy in a bucket instead.",
        "children": []
      },
      {
        "text": "The comparison separates the infant’s current interest from the adult’s indicated referent. Using gaze allows the child to connect the word with what the speaker means, rather than automatically assigning every new label to the toy already in hand. The same available objects can support different word mappings depending on the speaker’s attention.",
        "children": []
      }
    ],
    "development2-16": [
      {
        "text": "**Gaze direction** provides evidence about the intended referent of a word. When an adult looks toward an object while labeling, the child can relate the sound to that object. The adult’s attention helps distinguish the intended candidate from other things available in the interaction.",
        "children": []
      },
      {
        "text": "The child’s own current focus and the speaker’s focus can differ. Successful reference tracking therefore involves using another person’s behavior, not just pairing the label with whatever the child was already watching.",
        "children": []
      },
      {
        "text": "Coordinating the heard label with the indicated object narrows the word-learning problem. The gaze cue does not supply the sound’s meaning by itself. It supplies information about which available referent the speaker intends the child to connect with that sound.",
        "children": []
      }
    ],
    "development2-17": [
      {
        "text": "**Affective and behavioral cues** are information supplied by a speaker’s emotional expressions and actions. A reaction can indicate that an object satisfies a goal or is not the item being sought. The child can use that reaction to distinguish possible referents of a new word.",
        "children": []
      },
      {
        "text": "In **Akhtar and colleagues’ study**, infants used adult facial expressions to identify the intended object. The expression supplied evidence about the adult’s relation to the object, rather than merely adding another visible event.",
        "children": []
      },
      {
        "text": "A word can occur while several objects are present. Emotional and behavioral evidence helps determine which object the label concerns. Word learning therefore includes interpreting the adult’s intention, instead of treating every item near the utterance as an equally likely association.",
        "children": []
      }
    ],
    "development2-18": [
      {
        "text": "An adult’s **emotional reaction** can make one object a better candidate for a new word than another. The relevant information concerns which candidate the adult treats as fulfilling the intended goal. The child can relate the reaction to what the label is meant to identify.",
        "children": []
      },
      {
        "text": "**Intentional cues** therefore extend beyond the direction of the eyes. The expression accompanying an interaction can provide evidence about reference even when several objects could be associated with the sound.",
        "children": []
      },
      {
        "text": "Using that evidence narrows the hypothesis space for the word. The child is learning from the relationship between the speaker, the reaction, and the candidate object. Mere simultaneous presence of a word and an object does not capture the full information available in the exchange.",
        "children": []
      }
    ],
    "development2-19": [
      {
        "text": "A **default word-learning strategy** favors an interpretation unless other evidence supports an alternative. It reduces the number of candidate meanings considered initially. A default is a starting preference rather than a claim that every word must have that kind of meaning.",
        "children": []
      },
      {
        "text": "The **whole-object assumption** favors treating a new label as naming an entire object. Other possible meanings include one of its parts, a property, or an action involving it. The preference makes the whole object a stronger initial candidate.",
        "children": []
      },
      {
        "text": "The strategy narrows the **hypothesis space**, the possible meanings consistent with the scene. The child does not have to test every visible property and part equally before learning can proceed. Further evidence can still establish a different intended kind of reference.",
        "children": []
      }
    ],
    "development2-20": [
      {
        "text": "**Mutual exclusivity**, associated with **Markman (1989)**, is the default that an object has only one name. If a child already knows a label for one candidate, a new label is more likely to be assigned to an object without a known name. Existing vocabulary changes which referent seems plausible.",
        "children": []
      },
      {
        "text": "This strategy emerges during the **second half of the second year**. The child uses what has already been learned about one object to interpret an unfamiliar expression in the same scene. The new sound alone does not determine the choice.",
        "children": []
      },
      {
        "text": "Mutual exclusivity is a **default**, so its role is to constrain the initial inference. A familiar object with an established name becomes a less likely candidate for the novel label. An unnamed alternative becomes more likely because it does not create that competition between names.",
        "children": []
      }
    ],
    "development2-21": [
      {
        "text": "Under **mutual exclusivity**, a child tends to connect a new label with an object lacking a known name. The available alternatives matter because the child can use the established name of one object to reduce its suitability for a different unfamiliar label.",
        "children": []
      },
      {
        "text": "This inference depends on the child’s **existing vocabulary**. An object counts as already named only if the child knows its label. The same word–object scene can therefore support different inferences for learners with different prior knowledge.",
        "children": []
      },
      {
        "text": "The strategy reduces uncertainty about reference without requiring the new word’s meaning to be transparent from its sound. It combines the unfamiliar label with what the learner already knows about the candidates. That combination favors an otherwise unnamed object as the intended referent.",
        "children": []
      }
    ],
    "development2-22": [
      {
        "text": "Children producing **one, two, or three words** can be using different kinds of linguistic organization. **Menn** distinguishes a set of relevant words, a memorized **formula**, a productive combination, and a **stable construction**. These are different possible sources of a short utterance.",
        "children": []
      },
      {
        "text": "**“Up!”**, **“Pick you up!”**, and **“Mommy up!”** differ in length, but length does not establish how they were generated. A longer expression can be stored and repeated as a fixed unit. A shorter one can involve choosing and combining separate elements.",
        "children": []
      },
      {
        "text": "The interaction helps establish what the child means and how the expression is used. A stable child construction can also differ from an adult-like sentence. Even detailed context does not always settle whether an utterance is memorized or productively assembled, so output length alone is an incomplete measure of grammatical knowledge.",
        "children": []
      }
    ],
    "development2-23": [
      {
        "text": "**Comprehension can exceed production**. A child who usually produces one word at a time can already use basic **transitive word order** to understand who acts on whom. A transitive event involves an actor and a participant affected by that action.",
        "children": []
      },
      {
        "text": "In **“The boy is tickling the girl,”** the first noun identifies the actor and the second identifies the recipient of tickling. The scene can also contain giggling and playing, but the sentence’s order selects the particular role relationship. Knowing the nouns alone does not supply that ordered relationship.",
        "children": []
      },
      {
        "text": "The **structure-mapping account** links a partial sentence representation with a conceptual event representation. Even incomplete knowledge of the sentence can map the noun positions onto event roles. Understanding that relationship can develop before the child regularly produces a complete adult-like sentence with the same structure.",
        "children": []
      }
    ],
    "development2-24": [
      {
        "text": "**Gertner and colleagues (2006)** tested whether two-year-olds could generalize **transitive structure to a novel verb**. Children heard **“The duck is gorping the bunny”** while viewing unfamiliar actions that reversed which character acted on the other. Gorping had no previously learned action meaning to supply the roles.",
        "children": []
      },
      {
        "text": "Children looked longer at the event in which the **duck acted on the rabbit**. The noun order supported that choice. Their interpretation therefore depended on the construction’s role relationship rather than knowing what gorping meant beforehand.",
        "children": []
      },
      {
        "text": "Instructions occurred in blank-screen intervals, and the test events repeated the sentence. **Preferential looking** measured understanding without requiring a spoken response. The task could therefore reveal knowledge that the child was not yet expressing in full sentences.",
        "children": []
      },
      {
        "text": "Children at that age typically have a **mean length of utterance, or MLU, near two morphemes**. A morpheme is a meaningful word part or whole word. An output such as **“Duck gorp bunny”** can be shorter and less complete than the adult sentence the child can interpret.",
        "children": []
      }
    ],
    "l1-critical-01": [],
    "l1-critical-02": [
      {
        "text": "A strict **critical period** is a learning window with a discrete, programmed opening and closing. The relevant environmental input can change the system during that interval. Under the strict definition, the same kind of sensitivity is absent before the window opens and after it closes.",
        "children": []
      },
      {
        "text": "A **sensitive period**, or optimal period, means that learning remains possible across the lifespan but is easier or more effective during a particular interval. Its onset and offset can be gradual. Experience can also affect how that sensitivity develops.",
        "children": []
      },
      {
        "text": "The distinction concerns **impossibility versus reduced effectiveness**. An early advantage together with some later capacity to change fits a sensitive period. Evidence that ordinary late learning is difficult is not, by itself, evidence that all later change is impossible.",
        "children": []
      }
    ],
    "l1-critical-03": [
      {
        "text": "**Amblyopia** is poor vision in one eye despite normal peripheral function. **Peripheral function** concerns the eye and its incoming visual apparatus, rather than only the brain’s interpretation of the signal. A developmental disturbance can leave a lasting visual deficit even after the original eye problem has been corrected.",
        "children": []
      },
      {
        "text": "**Strabismus** misaligns the eyes. A **cataract** obstructs light transmission through the lens. **Anisometropia** gives the eyes different refractive properties, so they do not supply equally focused input. Each condition can deprive one eye of normal coordinated experience.",
        "children": []
      },
      {
        "text": "Correcting the optical problem does not automatically reverse the organization learned by the visual system. The eye can be physically capable of supplying input while the brain still makes inadequate use of it. The long-term impairment and its original peripheral cause are therefore different parts of the developmental process.",
        "children": []
      }
    ],
    "l1-critical-04": [
      {
        "text": "In amblyopia, the two eyes’ inputs **compete for influence in visual cortex**. If one eye provides abnormal information, the other can gain influence over representations that would otherwise support the disadvantaged eye. The inputs develop in interaction rather than complete independence.",
        "children": []
      },
      {
        "text": "During **monocular deprivation**, abnormal or reduced input affects one eye. After about **2–3 days**, dendritic spines become more mobile. Around **3–4 days**, spine loss and degeneration occur. After **more than a week**, axon sprouting and new spine formation reorganize connections.",
        "children": []
      },
      {
        "text": "**Dendritic spines** receive input at connections between nerve cells, while **axon sprouting** adds branches through which cells can communicate. These changes alter the routes carrying the eyes’ influence. When normal input returns, the deprived eye can remain at a competitive disadvantage. Ordinary use of both eyes can maintain the imbalance rather than immediately restoring normal function.",
        "children": []
      }
    ],
    "l1-critical-05": [
      {
        "text": "**Intermittently patching the stronger eye** reduces its opportunity to dominate visual input. The weaker eye then has more opportunity to drive the visual system. Treatment uses the competition between the inputs to encourage the brain’s own plasticity.",
        "children": []
      },
      {
        "text": "**Plasticity** is the capacity to change with experience. Temporarily altering the balance of input can help the weaker eye regain function instead of leaving the stronger pathway continuously advantaged. The patch is applied to the better eye so that the disadvantaged input gets more use.",
        "children": []
      },
      {
        "text": "The treatment works best early in development. Its effectiveness declines with age and can be very limited by late childhood, around **ten years** in the comparison. The outcome depends not only on the manipulation but also on the developmental state in which it occurs.",
        "children": []
      }
    ],
    "l1-critical-06": [
      {
        "text": "**Levi and Polat (1996)** reported improvements in adult amblyopia after **long-term, intensive perceptual training** using the affected eye. The psychophysical tasks required controlled visual judgments. Some participants were in their **fifties**, well beyond the usual childhood treatment window.",
        "children": []
      },
      {
        "text": "Performance changed across **tens of thousands of trials**. Improvement included faster-changing periods and flatter periods, so progress was not uniform from one practice block to another. Benefits extended to the trained task and broader visual function.",
        "children": []
      },
      {
        "text": "Adult visual plasticity therefore remains possible under particular conditions of experience. Poor results from an ordinary treatment late in life do not establish that the adult system cannot change at all. The intensity and kind of training matter when assessing the extent of remaining plasticity.",
        "children": []
      }
    ],
    "l1-critical-07": [
      {
        "text": "**Li, Ngo, Nguyen, Lam, and Levi (2008)** reported that playing video games improved **visual acuity and visual attention** in adults with amblyopia. Visual acuity concerns resolving fine detail. Visual attention concerns selecting and responding to relevant visual information.",
        "children": []
      },
      {
        "text": "The participants already had a developmental visual deficit. Improvement therefore involved a visual system whose earlier experience had left a persistent difficulty, rather than simply normal childhood visual development.",
        "children": []
      },
      {
        "text": "Intensive visual experience was associated with change beyond the early optimal period. These adult improvements support remaining **experience-dependent plasticity**. The learning window can become less favorable without eliminating every possibility of functional improvement afterward.",
        "children": []
      }
    ],
    "l1-critical-08": [
      {
        "text": "An early **peripheral disturbance** can produce lasting changes in the brain’s visual organization. A temporary problem with one eye changes the input available while the system is developing. The later functional deficit can persist after the original physical problem has ended.",
        "children": []
      },
      {
        "text": "**Experience-dependent organization** means that the pattern of input helps shape how neural connections are used. Competitive differences between the eyes can become established during deprivation. Restoring the eye does not automatically undo those accumulated changes.",
        "children": []
      },
      {
        "text": "Treatment is most effective during a restricted developmental window, yet specialized adult experience can still produce improvements. Amblyopia therefore combines strong early sensitivity with some later plasticity. That combination fits a **sensitive period** more readily than an absolute claim that no later learning is possible.",
        "children": []
      }
    ],
    "l1-critical-09": [
      {
        "text": "**Lenneberg** connected developmental neurology with the proposal of a **language acquisition device**. The device refers to a biologically supported capacity for acquiring language. The developmental question is whether changes in the brain alter the conditions under which that capacity operates.",
        "children": []
      },
      {
        "text": "Evidence from **early language deprivation** concerns people who encounter a first language late. These histories include neglected children and Deaf children without early access to sign. The timing of accessible language differs from the typical pattern of input from early life.",
        "children": []
      },
      {
        "text": "Delayed first-language experience can therefore be compared with early acquisition. The comparison concerns when language was available, not simply how much vocabulary a person knows at the time of testing. A biological account has to connect developmental state with the later capacity to learn from that input.",
        "children": []
      }
    ],
    "l1-critical-10": [
      {
        "text": "In **Biological Foundations of Language (1967)**, **Lenneberg** related language development to maturational changes. Development follows a broadly ordered pattern, with words preceding telegraphic phrases and longer spontaneous sentences emerging later. **Telegraphic speech** contains important content words with reduced grammatical material.",
        "children": []
      },
      {
        "text": "Repeated sound patterns and early vocal play occur before a clear vocabulary. Around **twelve months**, recurring sequences and emerging words such as mama and dada accompany expanding motor abilities. By about **eighteen months**, a more definite vocabulary coexists with complex babbling and growing understanding.",
        "children": []
      },
      {
        "text": "Lenneberg interpreted these regularities as compatible with an unfolding **biological program**. The proposal is that the state of the developing organism contributes to acquisition. Language milestones were connected with maturation rather than explained only by the accumulated quantity of input.",
        "children": []
      }
    ],
    "l1-critical-11": [
      {
        "text": "Lenneberg’s evidence about typical brain development came mostly from **post-mortem tissue**, measured after death. It was not a continuous series of measurements from the same living children. The neuron-size comparison had no observations between roughly **two and eighteen years**.",
        "children": []
      },
      {
        "text": "**Neuron size** increased rapidly early in development, alongside changes in **packing density**, how closely the cells occupy tissue. Lenneberg proposed that changes before about two years made the brain ready for language acquisition. The favorable window would open after that early rapid growth.",
        "children": []
      },
      {
        "text": "The account connects a proposed learning transition with measured tissue development. The ages actually represented matter because gaps in sampling do not provide direct observations of a continuous switch. The biological proposal and the available developmental measurements therefore have to be distinguished.",
        "children": []
      }
    ],
    "l1-critical-12": [
      {
        "text": "Children can have much better language outcomes than adults after severe injury to language-related tissue. In extreme cases, **hemispherectomy** removes one cerebral hemisphere to treat severe seizures. Substantial language development can follow early removal even of the **left hemisphere**.",
        "children": []
      },
      {
        "text": "Historical cases included many operations before the teenage years with speech unaffected or improved. A puberty case improved slowly. Adult left-hemisphere operations were associated with permanent aphasia, while adult right-hemisphere operations had a different language outcome.",
        "children": []
      },
      {
        "text": "**Cerebral dominance** means specialization of the hemispheres for particular functions. Lenneberg proposed that earlier organization is less fixed and permits greater reassignment of language. More adult-like dominance would reduce that flexibility.",
        "children": []
      },
      {
        "text": "This hypothesis connects age with the consequences of extensive injury. The same broad loss of tissue can have different outcomes depending on when it occurs. The proposed closing of the favorable window concerns the changing organization of the system, rather than damage being harmless in childhood.",
        "children": []
      }
    ],
    "l1-critical-13": [
      {
        "text": "A **perinatal stroke** occurs before birth or within **28 days after birth**. It can damage the brain while the systems supporting language are still developing. Outcomes are usually better than those following comparable adult injury, but they are not uniformly unaffected.",
        "children": []
      },
      {
        "text": "Early language deficits occur after **both left- and right-hemisphere damage**. Some early difficulties can be greater after right-hemisphere injury. The pattern does not simply reproduce the usual adult division of language functions.",
        "children": []
      },
      {
        "text": "Later performance often remains in the **low-normal range**. A better outcome than adult aphasia does not mean complete catch-up or absence of a developmental cost. The trajectory can involve a lasting delay while still revealing substantial capacity for reorganization.",
        "children": []
      }
    ],
    "l1-critical-14": [
      {
        "text": "**Curtiss and colleagues (1974)** studied **Genie** after severe early neglect and restricted language access. She was first studied at **thirteen years and seven months**. Her confinement had begun at about **twenty months**, making the period without ordinary language and social experience extensive.",
        "children": []
      },
      {
        "text": "She had been physically restrained, minimally cared for, and punished for producing sounds. Accessible spoken language and normal interaction were severely limited. Her history therefore involved deprivation in several developmental domains at once.",
        "children": []
      },
      {
        "text": "On admission, she was malnourished, did not speak, and had major difficulties in everyday physical functioning. Her later learning began after this history of abuse and isolation. The case concerns delayed language acquisition within that broader developmental context, not an otherwise typical childhood with only one experience removed.",
        "children": []
      }
    ],
    "l1-critical-15": [
      {
        "text": "During **four years of observation**, Genie learned to understand **hundreds of words**, some **morphology**, and some **prepositions**. Morphology concerns meaningful word parts, and plural forms were a relative strength. She could use some changes in form to distinguish one item from more than one.",
        "children": []
      },
      {
        "text": "Preposition tests required actions with buttons and boxes. **“Put the red box behind the blue box”** tested a spatial relationship without requiring her to define behind aloud. The response measured how she understood the instruction.",
        "children": []
      },
      {
        "text": "Correct responses exceeded errors for **on, in, over, under, in front of, in back of, next to, and behind**. Behind received **12 correct and 5 incorrect** responses, while in received **37 correct and 4 incorrect**. Learning therefore extended beyond object names to some grammatical forms and relations between objects.",
        "children": []
      }
    ],
    "l1-critical-16": [
      {
        "text": "**Genie’s production developed much more slowly than comprehension**. She could understand more than she could express through speech. Some receptive advantage is typical, but her punishment history could also affect how readily knowledge appeared in vocal behavior.",
        "children": []
      },
      {
        "text": "**Grammar lagged behind vocabulary**. Tests of conjunctions included **“Show me the fork and pencil,” “Show me the crayon or the knife,”** and **“Show me either the spoon or the crayon.”** These required understanding how the connecting word changed which response satisfied the instruction.",
        "children": []
      },
      {
        "text": "Genie initially treated **or** much like **and**. She later distinguished the words without reliably understanding the either/or relationship. And sentences received **100 correct and 3 incorrect** responses. Or sentences received **7 correct, 51 incorrect, and 6 unanalyzable** responses. The contrast identifies a difficulty with the relationship expressed by grammar despite substantial word learning.",
        "children": []
      }
    ],
    "l1-critical-17": [
      {
        "text": "Genie made much more progress in **vocabulary than grammar**. That difference has been interpreted as evidence that late first-language learning especially affects grammatical development. Her ability to learn many words did not bring equally rapid progress in the relationships required by grammatical tests.",
        "children": []
      },
      {
        "text": "Her history also involved possible learning difficulties and the effects of neglect and abuse. Those factors accompanied delayed language exposure. The observed outcome therefore cannot be attributed to age of first language alone.",
        "children": []
      },
      {
        "text": "Funding ended after **four years**, so the research program did not measure what she might have learned over a longer interval. Claims about her development concern the recorded period. Both the uneven learning pattern and the circumstances limiting its interpretation are part of the evidence.",
        "children": []
      }
    ],
    "l1-critical-18": [
      {
        "text": "**Mayberry, Lock, and Kazmi (2002)** compared delayed first-language learning with later learning after an early language. Deaf children first encountering **American Sign Language, or ASL, at 9–15 years** had persistent difficulty despite otherwise more typical upbringing. They were learning a first language, not just a new vocabulary for an established language system.",
        "children": []
      },
      {
        "text": "Children who became deaf **after first learning a spoken language** did better with later ASL. Both groups encountered sign later, but only one had early linguistic experience. The difference separates the timing of a first language from the timing of a second one.",
        "children": []
      },
      {
        "text": "In adulthood, the no-early-language group was poorer at recalling complex ASL sentences. In English grammaticality judgments, groups with an early signed or spoken language also performed better than the group lacking early language. Early linguistic experience therefore mattered across modalities, rather than requiring the first and later languages to be both spoken or both signed.",
        "children": []
      }
    ],
    "l1-critical-19": [
      {
        "text": "Language outcomes after **stroke and hemispherectomy** differ greatly between childhood and adulthood. The developing system can support language after injuries that would produce more severe and lasting adult impairment. That difference supports a developmental contribution to the capacity for recovery and reorganization.",
        "children": []
      },
      {
        "text": "**Lack of input does not keep a first-language window open indefinitely**. When accessible language becomes available only later, persistent difficulty can remain. Delaying experience is therefore different from postponing the whole maturational course until input arrives.",
        "children": []
      },
      {
        "text": "The human evidence comes from unusual histories of injury or deprivation, often with other influences present. There is also no equivalent experimental animal model of human language in which the relevant capacity can simply be removed and retested. Biological explanations must account for the patterns and qualifications in these observed human cases.",
        "children": []
      }
    ],
    "l1-critical-20": [],
    "l1-critical-21": [],
    "l2-learning-01": [],
    "l2-learning-02": [
      {
        "text": "**Adults often learn a second language faster at first than children do**. They already have a first language and more developed general cognitive skills. Early learning can use those established resources instead of beginning from the developmental state of an infant.",
        "children": []
      },
      {
        "text": "An **eighteen-month-old using about twenty words** is still developing pointing, pretend play, simple questions, spatial understanding, and vocal patterns. Adult learners already have many of those abilities. The comparison therefore involves different starting resources, not only different ages exposed to the same instruction.",
        "children": []
      },
      {
        "text": "**Ultimate attainment** is the level eventually reached. Adults are less likely to become fully native-like despite their faster initial progress. Their existing language can support new learning while also affecting it through transfer. Initial learning rate and final proficiency therefore answer different questions about age and acquisition.",
        "children": []
      }
    ],
    "l2-learning-03": [
      {
        "text": "Some language milestones involve **general conceptual knowledge** as well as language itself. Understanding spatial relations between objects or representing an event is different from knowing the words a particular language uses for them. The concepts of in and out can be available before their new labels are learned.",
        "children": []
      },
      {
        "text": "A later **second-language learner** already has many of these concepts. Learning can concentrate on how another language expresses familiar relationships. The learner does not have to discover every event or spatial distinction from the beginning.",
        "children": []
      },
      {
        "text": "The **first language** also supplies established categories and patterns. These can help with some new forms and interfere with others. Adult learning therefore combines a conceptual advantage with the influence of a language system that is already organized.",
        "children": []
      }
    ],
    "l2-learning-04": [
      {
        "text": "**Transfer** is using first-language, or **L1**, processes and representations while learning or using a second language, **L2**. An established way of perceiving speech, organizing a sentence, or retrieving a word can be applied to the new language. Prior knowledge continues to influence the task.",
        "children": []
      },
      {
        "text": "**Positive transfer** occurs when that organization fits what L2 requires. The existing pattern supplies a helpful starting point. **Negative transfer** occurs when applying it favors a form or interpretation that does not fit the new language.",
        "children": []
      },
      {
        "text": "Transfer is therefore not inherently helpful or harmful. Its effect depends on the relationship between the two languages and the operation required. A learned distinction can support an L2 contrast, while a learned grouping can make two L2 categories seem too similar.",
        "children": []
      }
    ],
    "l2-learning-05": [
      {
        "text": "Hindi distinguishes **dental and retroflex consonants**, while native English listeners often place both in an English **alveolar** category. Dental articulation involves the teeth. Alveolar articulation is near the ridge behind them, while retroflex articulation uses a farther-back tongue configuration.",
        "children": []
      },
      {
        "text": "Hindi **minimal pairs**, words differing in one speech sound, can distinguish meanings such as **pressure versus a kind of fruit** or **a saw versus crooked**. The consonant difference changes word identity for a native listener. Treating the two sounds alike loses that distinction.",
        "children": []
      },
      {
        "text": "English learning creates **acquired similarity** among sounds assigned to one category. Reusing that category for both Hindi sounds makes them less distinct perceptually. Negative transfer can therefore make a new contrast difficult because the learner’s existing system has already learned to group its members together.",
        "children": []
      }
    ],
    "l2-learning-06": [
      {
        "text": "A **classifier** is a grammatical form selected in relation to a noun. Chinese requires classifier choices in expressions where English uses forms such as **a chair, that dog, the car, or one book** without an equivalent choice. The learner must attend to properties that English grammar did not require for this operation.",
        "children": []
      },
      {
        "text": "**Gè** is a general classifier. **Bǎ** is used with handled objects, and **běn** with books and related objects. **Kuài** applies to pieces, **liàng** to wheeled vehicles, and **tái** to devices or gadgets.",
        "children": [
          "**Xiē** expresses an indeterminate plural quantity. **Zhāng** is used with flat objects, and **zhī** with long thin objects. Semantic and shape properties help determine the form accompanying the noun."
        ]
      },
      {
        "text": "English speakers have learned to use their language without selecting these forms. Acquiring the classifier system therefore requires making previously ignorable properties relevant to a grammatical decision. Knowing the object’s meaning alone does not automatically supply its classifier.",
        "children": []
      }
    ],
    "l2-learning-07": [
      {
        "text": "**Grammatical gender** classifies nouns and controls related grammatical forms. It is different from social or cultural gender. A book is not socially male because French **livre** is masculine, and liberty is not socially female because **liberté** is feminine.",
        "children": []
      },
      {
        "text": "**Agreement** means coordinating forms such as pronouns and adjectives with the noun’s class. A learner has to make those choices even when the referent provides no obvious gender cue. Similar meanings can also have different classes, as with **auto/voiture, rivière/fleuve, and vélo/bicyclette**.",
        "children": []
      },
      {
        "text": "**Word endings** supply statistical information. The examples include masculine-associated **-age, -r, -t, and -sme**, and feminine-associated **-ie, -ion, -ité/-tié, -ance, -me, -mme, and -lle**. These are form-based tendencies in the examples rather than descriptions of the objects’ identities.",
        "children": []
      },
      {
        "text": "Learning gender therefore involves the noun’s lexical and form properties as well as coordinating agreement. Transferring an expectation that meaning alone determines the choice can leave those grammatical requirements unexplained.",
        "children": []
      }
    ],
    "l2-learning-08": [
      {
        "text": "**Cognates** resemble one another because they share a historical origin. **Loan words** enter a language through borrowing. Both can make a new word partly familiar to someone who already knows a related form in another language.",
        "children": []
      },
      {
        "text": "French **auto, rivière, and bicyclette** resemble familiar forms connected with a car, a river, and a bicycle. Japanese **コロッケ, korokke**, names a croquette, and **モノレール, monoreru**, names a monorail through adapted borrowed forms. The pronunciation and spelling can be changed while some recognizable overlap remains.",
        "children": []
      },
      {
        "text": "A familiar form–meaning connection can support learning the new label. This is **positive transfer** in vocabulary. The learner has some existing information to connect with the L2 form instead of building an entirely unfamiliar association from scratch.",
        "children": []
      }
    ],
    "l2-learning-09": [
      {
        "text": "A **false friend** is a similar form that encourages the wrong meaning in another language. Similarity alone does not establish that two words share a meaning or are cognates. An apparently helpful familiar form can therefore lead vocabulary learning in the wrong direction.",
        "children": []
      },
      {
        "text": "Spanish **embarazado** concerns pregnancy rather than the English meaning of embarrassed. **“Arnold esta embarazado”** does not express ordinary embarrassment. Choosing the familiar-looking form without checking its meaning creates the error.",
        "children": []
      },
      {
        "text": "An L2 input can strongly activate a similar L1 word. When the meanings match, that overlap helps. When they do not, the same reliance on resemblance supports a false interpretation. The effect depends on both form overlap and the actual relationship between meanings.",
        "children": []
      }
    ],
    "l2-learning-10": [
      {
        "text": "**De Groot and Keijzer (2000)** used **paired-associate learning** to test how existing vocabulary affects new-word learning. Participants learned Dutch words paired with made-up forms. They were tested again after **one week**, allowing immediate learning and later retention to be compared.",
        "children": []
      },
      {
        "text": "**Gitaar–gettar**, meaning guitar, is **concrete and cognate-like**. **Tijger–duunze**, meaning tiger, is concrete without the form resemblance. **Domein–domaan**, meaning domain, is **abstract and cognate-like**, while **herstel–groop**, meaning repair, is abstract and non-cognate.",
        "children": []
      },
      {
        "text": "**Concreteness** distinguishes readily imaginable referents from abstract meanings. **Cognate-like status** distinguishes similar forms from dissimilar ones. Crossing the factors tests form resemblance within both kinds of meaning.",
        "children": []
      },
      {
        "text": "Learning requires linking an unfamiliar form to its correct familiar partner. Similarity supplies partial form support, but a successful association still has to be encoded and later retrieved. The design separates that support from whether the referent is concrete or abstract.",
        "children": []
      }
    ],
    "l2-learning-11": [
      {
        "text": "**Cognate-like associates were learned faster and retained better**. For concrete items, Session 1 recall was **69.7% for cognates and 43.7% for non-cognates**. By Session 3, the values reached **93.4% and 92.0%**. Practice allowed the initially weaker condition to approach the other in immediate accuracy.",
        "children": []
      },
      {
        "text": "After **one week without training**, Session 4 concrete recall was **78.4% versus 69.0%**. Abstract recall was **68.4% versus 36.0%**, compared with **86.0% versus 72.7%** immediately before the delay. The similarity advantage remained visible after the interruption.",
        "children": []
      },
      {
        "text": "**Response times** also favored cognates. Session 4 concrete responses averaged **1,833 versus 2,597 milliseconds**, and abstract responses **2,333 versus 3,412 milliseconds**. Faster retrieval accompanied the accuracy benefit.",
        "children": []
      },
      {
        "text": "Form similarity therefore supported both early learning and later retrieval. Reaching a similar immediate accuracy with practice did not make every condition equally well retained or equally fast. Accuracy and retrieval time capture different aspects of the learned association.",
        "children": []
      }
    ],
    "l2-learning-12": [
      {
        "text": "A **receptive vocabulary test** gives the unfamiliar associate and asks for its known Dutch partner. A similar-looking associate can help the participant recognize or guess the familiar word. Correct performance in that direction alone would therefore leave uncertainty about how well the new form had been learned.",
        "children": []
      },
      {
        "text": "The concrete cognate pairs include **broer–breur, brood–brodde, gitaar–gettar, jongen–jange, lepel–lippel, lichaam–lechem, naald–nadel, and paraplu–parredu**. The remaining pairs are **rivier–riffer, schaar–skare, stier–strire, trein–trien, varken–vark, viool–vialo, and vrouw–vrauk**. Their form overlap supplies information about the intended known word.",
        "children": []
      },
      {
        "text": "A **productive or expressive test** reverses the direction. The participant must retrieve and produce the unfamiliar learned form from the Dutch word. Success then requires the new associate itself, rather than only finding a familiar meaning from a resemblance. Testing both directions makes the learning claim more specific.",
        "children": []
      }
    ],
    "l2-learning-13": [
      {
        "text": "In **productive recall**, concrete performance fell from **92.7% immediately to 73.7% after a week**. Abstract performance fell from **79.3% to 52.2%**. Across concreteness conditions, cognates declined from **89.7% to 73.3%**, while non-cognates declined from **82.3% to 52.5%**.",
        "children": []
      },
      {
        "text": "**Receptive recall** was higher overall. Concrete scores declined from **97.7% to 88.9%**, and abstract scores from **91.5% to 64.9%**. Cognates declined from **98.5% to 90.7%**, while non-cognates declined from **90.7% to 63.0%**.",
        "children": []
      },
      {
        "text": "Producing an unfamiliar form and retrieving its familiar partner make different demands on memory. The delay reduces performance in both directions. Better cognate retention also occurs in both, including the direction requiring the new form to be generated. The effect therefore cannot be reduced entirely to guessing a familiar word from a similar input.",
        "children": []
      }
    ],
    "l2-learning-14": [
      {
        "text": "**Cross-language competition** concerns whether a word in one language becomes active while another language is being used. The activated word does not have to be an allowed or intended response. Its partial activation can still influence processing before a final choice.",
        "children": []
      },
      {
        "text": "**Marian and Spivey (2003)** tested whether similar **L1 words** are active during **L2 recognition**. A visual-world display supplied objects whose names could overlap with the spoken target across languages. Eye movements measured which alternatives attracted looking.",
        "children": []
      },
      {
        "text": "A look toward an object with a similar L1 name provides evidence about an unintended competitor. The task does not require participants deliberately to translate the target. The question concerns which word representations receive activation during recognition in the designated language.",
        "children": []
      }
    ],
    "l2-learning-15": [
      {
        "text": "**Eye movements** can reveal temporary lexical competition before a final response. In **McMurray and colleagues’ task**, participants saw **bear, pear, lamp, and ship** while hearing a /b/–/p/ continuum. Bear and pear provided closely related word alternatives.",
        "children": []
      },
      {
        "text": "**VOT**, the timing of voicing after consonant release, changed how ambiguous the input was. Competitor looking depended on the sound’s distance from the category boundary. A listener could look toward the rival picture and still make the correct final selection.",
        "children": []
      },
      {
        "text": "A completed click therefore does not describe the entire recognition process. Measuring where the eyes move identifies candidates considered while the input is being interpreted. This method can test competition from a word even when that word never becomes the final answer.",
        "children": []
      }
    ],
    "l2-learning-16": [
      {
        "text": "A **cohort competitor** shares the beginning of a spoken target. For **beaker**, **beetle** matches the early sounds, **speaker** overlaps at the ending, and **carriage** is unrelated. These alternatives receive useful matching information at different times.",
        "children": []
      },
      {
        "text": "In **Allopenna and colleagues’ (1994) task**, target and cohort looks rise early because the beginning fits both beaker and beetle. As later input distinguishes them, looks to the target continue increasing while cohort looks decline. **Rhyme competition** follows a different, later time course.",
        "children": []
      },
      {
        "text": "Spoken recognition therefore changes as matching and conflicting information arrives. Temporary support for a losing candidate can be visible before the final choice. The location of the sound overlap within the word helps determine when the competitor participates.",
        "children": []
      }
    ],
    "l2-learning-17": [
      {
        "text": "**Marian and Spivey** tested **cross-language cohort competition** in Russian–English bilinguals. English **speaker** begins similarly to Russian **спички, spichki**, meaning matches. During an English instruction, the picture of matches can receive support through its Russian name even though matches does not resemble speaker in English.",
        "children": []
      },
      {
        "text": "**Spear** provides an English within-language competitor. Displays can contain that competitor, the Russian-name competitor, or both. The arrangement separates competition within the task language from competition arising through the other language.",
        "children": []
      },
      {
        "text": "Other pairs are **boot with buben**, a tambourine, **chair with cherepaha**, a turtle, and **marker with marka**, a stamp. Looking toward one of those objects during English recognition connects the effect with its other-language form. The overlap is phonological, concerning the sound of the name, rather than similarity in the objects’ meanings.",
        "children": []
      }
    ],
    "l2-learning-18": [
      {
        "text": "During **L2 recognition**, a sole within-language competitor and a sole between-language competitor each attracted looks on about **18% of trials**. A Russian-name alternative could therefore compete while the participant was following English input. The final response language did not prevent all activation across languages.",
        "children": []
      },
      {
        "text": "When **both competitors** were present, within-language looks occurred on about **19% of trials** and between-language looks on about **13%**. The unrelated filler attracted looks on about **7%**. The two competitors had different strengths when directly available together.",
        "children": []
      },
      {
        "text": "Within-language competition was stronger in that combined display, but the cross-language object still attracted more looks than the control. The result concerns temporary activation during recognition. It does not require the participant to select the Russian-name object as the intended English target.",
        "children": []
      }
    ],
    "l2-learning-19": [
      {
        "text": "During **L1 Russian recognition**, a within-language competitor attracted looks on about **14% of trials when alone** and **13% when both competitors were present**. These rates exceeded looking to unrelated control objects. Native-language cohort competition was therefore present.",
        "children": []
      },
      {
        "text": "English-name competitors attracted looks on about **8%**, compared with a control rate near **5%**. That smaller difference was **not statistically significant**. The numerical trend alone did not establish the same reliable cross-language effect.",
        "children": []
      },
      {
        "text": "The reported interaction was **asymmetric**. L1 competitors clearly affected L2 recognition, while L2 competitors did not reliably produce the corresponding effect during L1 recognition. A model must account for the unequal directions rather than assume equally strong activation between the two vocabularies.",
        "children": []
      }
    ],
    "l2-learning-20": [
      {
        "text": "The **Revised Hierarchical Model**, associated with **Kroll and Stewart**, connects L1 words, L2 words, and shared concepts. **Spreading activation** means that activity in one representation can influence representations connected with it. A lexical connection joins words, while a conceptual connection links a word with meaning.",
        "children": []
      },
      {
        "text": "The **L1 lexicon** is larger and more strongly linked to concepts. A developing **L2 lexicon** has a stronger lexical route toward L1 than L1 has toward L2. Early learning emphasizes using an L1 counterpart to understand the new word.",
        "children": []
      },
      {
        "text": "Unequal connection strengths produce unequal cross-language effects. Activation can spread more readily from an L2 word to L1 than in the reverse direction. Both languages belong to one person, but the model does not assume their routes to words and meanings are identical in strength.",
        "children": []
      }
    ],
    "l2-learning-21": [
      {
        "text": "In the **Revised Hierarchical Model**, the visible **matches** object activates its concept. That concept partially activates the Russian word for matches. The Russian word can then send support back to the same conceptual representation, strengthening an unintended competitor during the English task.",
        "children": []
      },
      {
        "text": "The strengthened concept contributes to looking toward the matches picture. The target word is **speaker**, while the competing object is supported through **spichki**. Their relationship is sound overlap across languages, not a shared meaning of speakers and matches.",
        "children": []
      },
      {
        "text": "The model of **Kroll and Stewart (1990, 1994)** explains the directional difference through unequal connections. In the L1 task, routes involving the weaker L2 system may not produce equally reliable interference. The mechanism concerns the strength and direction of lexical and conceptual activation, rather than deliberate translation into the other language.",
        "children": []
      }
    ],
    "l2-learning-22": [
      {
        "text": "A **balanced bilingual** has relatively strong proficiency in both languages. The model does not predict that this person becomes **“two monolinguals in one.”** Strong conceptual connections can keep both lexical systems involved rather than isolating them.",
        "children": []
      },
      {
        "text": "**Competitive dynamics** means that activated alternatives influence which representation wins. **Inhibition** helps reduce alternatives that are inappropriate for the current task. These control demands can remain when both languages are highly proficient because the systems share concepts and interacting pathways.",
        "children": []
      },
      {
        "text": "This prediction motivated work on **nonlinguistic cognitive-control tasks**. The immediate model claim concerns interacting language representations and their competition. Equal proficiency does not mean that one language can always be processed with no influence from the other.",
        "children": []
      }
    ],
    "l2-learning-23": [
      {
        "text": "One language history begins with **L1**, adds **L2**, and continues using both. The first language keeps receiving input and practice after second-language learning begins. Both systems have continuing opportunities to be activated.",
        "children": []
      },
      {
        "text": "Another history adds L2 and then **stops using L1**. The earlier language no longer receives the same ongoing support. Later performance can therefore depend on both the age at which a language was learned and what happened to its use afterward.",
        "children": []
      },
      {
        "text": "These histories differ in exposure after the second language begins. Knowing that a language was learned first does not establish that it stayed available in the environment. A comparison of current ability must distinguish an early start from continued maintenance of that early language.",
        "children": []
      }
    ],
    "l2-learning-24": [
      {
        "text": "**Pallier and colleagues** tested adults who had been adopted into French homes from Korean orphanages. They were **20–32 years old** when tested and had been adopted between **3 and 8 years of age**. Early Korean experience was followed by a French-dominant environment.",
        "children": []
      },
      {
        "text": "The research asked whether any **residual Korean knowledge** was detectable. Residual knowledge means an influence of the earlier experience that survives the later change in language use. It can be investigated even when the person no longer uses Korean in everyday life.",
        "children": []
      },
      {
        "text": "French speakers without that childhood history provided a comparison. A retained benefit could appear as better performance on Korean-related measures. The question concerns the persistence and accessibility of early learning after a major shift in the language environment.",
        "children": []
      }
    ],
    "l2-learning-25": [
      {
        "text": "Korean has a **three-way stop contrast** among **aspirated, plain, and tense** consonants. Stops involve a closure and release. The three categories can occur at the same place of articulation, so their distinction concerns how the stop is produced rather than only where the closure occurs.",
        "children": []
      },
      {
        "text": "The **bilabial series** includes forms meaning **grass, fire, and horn**. The **dental series** includes **mask, moon, and daughter**, while the **velar series** includes **nose, music, and exactly** in the materials. Different categories identify different words within each series.",
        "children": []
      },
      {
        "text": "The **laryngeal contrast** concerns the configuration and timing associated with the voice-producing system. Retaining Korean knowledge would require separating these categories, not just distinguishing a lip closure from a tongue closure. A first language without the same three-way division supplies a different starting organization for those sounds.",
        "children": []
      }
    ],
    "l2-learning-26": [
      {
        "text": "**Ventureyra and colleagues** compared Korean adoptees in France with French and Korean listeners. Tests included **plain–tense, plain–aspirated, and tense–aspirated** stop differences. Vowel differences and **same trials** also tested auditory judgments under other conditions.",
        "children": []
      },
      {
        "text": "**Native Korean listeners** detected the Korean consonant distinctions much more successfully. Adoptees were no better on those contrasts than monolingual French listeners, despite the adoptees’ early Korean exposure. The test did not detect a retained phonetic advantage.",
        "children": []
      },
      {
        "text": "Vowel and same-trial performance differed from the difficult consonant conditions. The poor stop-contrast result was therefore not simply inability to perform any auditory judgment. The finding concerns current performance on the tested distinctions after the language-environment change.",
        "children": []
      }
    ],
    "l2-learning-27": [
      {
        "text": "**Pallier and colleagues** looked for remaining Korean knowledge using several tasks. In **language identification**, adoptees judged whether sentences were Korean rather than **Japanese, Polish, Swedish, or Wolof**. Their performance did not reliably exceed that of monolingual French listeners.",
        "children": []
      },
      {
        "text": "**Word recognition** required selecting Korean translations of French words. **Speech-segment detection** required deciding whether a short excerpt had occurred inside a recorded sentence. Neither task produced a dependable adoptee advantage.",
        "children": []
      },
      {
        "text": "The tasks targeted different possible remnants, including language familiarity, vocabulary, and sensitivity to sound sequences. Across these tests, earlier Korean exposure did not provide a detectable current behavioral benefit. That statement concerns the measures used to access the earlier learning, rather than a direct observation of every connection left in the brain.",
        "children": []
      }
    ],
    "l2-learning-28": [
      {
        "text": "Hearing **French** activated the adoptees’ broad **language network**, including **superior temporal and inferior frontal regions**. These regions are associated with processing their current dominant language. Their brain responses were therefore not absent or generally unresponsive to speech.",
        "children": []
      },
      {
        "text": "Comparisons involved French alongside **Polish, Japanese, and Korean**. The analysis assessed the response to the familiar language relative to other speech. Subtracting the Korean response from the French response did not reveal the distinguishing group difference expected from a readily accessible Korean advantage.",
        "children": []
      },
      {
        "text": "The reported imaging result agreed with the absence of a detectable behavioral benefit under those conditions. The contrast concerns the measured neural response to current language processing. It does not directly count every possible remnant of earlier exposure.",
        "children": []
      }
    ],
    "l2-learning-29": [
      {
        "text": "A first language is represented through **connections within and between brain regions**. Those pathways are affected by experience and continued activation. The language is not a single object placed in a storage location independently of use.",
        "children": []
      },
      {
        "text": "If **L1 stops being activated**, L2-related connections can become dominant in the same broad system. **Competitive dynamics** describes this changing balance among pathways. Increasing support for one pattern can reduce the functional influence of another.",
        "children": []
      },
      {
        "text": "The proposal resembles **experience-dependent competition between visual inputs**. Reduced input can change which connections remain effective. Apparent language replacement can therefore reflect a changed balance of activation and support, rather than requiring a complete language object simply to be moved or discarded.",
        "children": []
      }
    ],
    "l2-learning-30": [
      {
        "text": "**Residual knowledge** is a surviving effect of earlier language experience. It can exist without an obvious advantage on ordinary current-performance tests. Being unable to use an old language readily and having no remaining influence from it are different claims.",
        "children": []
      },
      {
        "text": "**Relearning** gives the earlier forms new opportunities to be activated. That renewed experience can reveal an influence not apparent before training. A past language history may affect how readily the person acquires the forms again.",
        "children": []
      },
      {
        "text": "Current access and later learning therefore measure different consequences of the earlier experience. A test of present recognition asks what can be used now. A relearning comparison asks whether renewed input benefits from something retained from the past.",
        "children": []
      }
    ],
    "l2-learning-31": [
      {
        "text": "**Au and colleagues** studied undergraduates who often overheard **Spanish in childhood** but did not learn to speak it then. They began classroom Spanish around **age fourteen** and were tested after a **second-year college course**. Early listening and later active instruction were separate parts of their history.",
        "children": []
      },
      {
        "text": "Pronunciation was more native-like than in typical late learners. For initial voiceless stops, mean **VOT** was about **19.6 milliseconds for overhearers**, **19.3 for native speakers**, and **36.2 for typical late learners**. VOT measures the timing of voicing relative to stop release.",
        "children": []
      },
      {
        "text": "**Accent ratings and lenition**, the weakening of certain consonant articulations, also favored overhearers on several measures. Childhood slang knowledge remained well below native levels. Earlier hearing therefore benefited some aspects of pronunciation without creating uniformly native-like language ability.",
        "children": []
      },
      {
        "text": "In morphology and grammaticality tests, overhearers and typical late learners were much closer to each other than to native speakers. Different language components retained different benefits. The effect of early exposure has to be described by the particular ability measured, not only an overall label of knowing Spanish.",
        "children": []
      }
    ],
    "l2-learning-32": [
      {
        "text": "When **L1 disappears from the environment**, L2 can appear to replace it completely in current behavior. The earlier language may no longer produce an obvious advantage in recognition or identification. That observation concerns what the person can access under those testing conditions.",
        "children": []
      },
      {
        "text": "**Residual knowledge** can become available through renewed learning. Current inability does not settle whether earlier experience can affect a later training outcome. The measurement changes when practice is reintroduced.",
        "children": []
      },
      {
        "text": "Korean-adoptee tests concern accessibility after a major language shift. Childhood-overhearer tests include performance after renewed formal instruction. The histories therefore provide different opportunities for early knowledge to contribute. Their outcomes should not be treated as the same test of an identical exposure pattern.",
        "children": []
      }
    ],
    "l2-learning-33": [
      {
        "text": "**Korean is rarely encountered in France**, whereas **Spanish is widely available in Los Angeles**. A childhood language can remain socially present through family and community even when the learner does not speak it. Incidental exposure therefore differs between these histories.",
        "children": []
      },
      {
        "text": "The language pairs also differ in **cognates and shared writing systems**. Cognates provide related forms that can support learning, while shared writing conventions create another kind of familiarity. Later success can reflect these influences as well as the original childhood exposure.",
        "children": []
      },
      {
        "text": "Comparing residual knowledge requires distinguishing the **duration, form, and social context of experience**. Continued hearing, renewed instruction, and cross-language similarities can all affect performance. The fact that two groups encountered a language early is not enough to make all of their later learning conditions equivalent.",
        "children": []
      }
    ],
    "l2-sensitive-01": [],
    "l2-sensitive-02": [
      {
        "text": "**Lenneberg (1967)** linked a favorable language-learning period with the development of **cerebral dominance**. Cerebral dominance means increasing specialization of the hemispheres. **Language laterality** concerns how strongly language functions are associated with one side rather than the other.",
        "children": []
      },
      {
        "text": "The proposal combined language milestones and neural-development observations with evidence from injury. Children often had better language outcomes than adults after extensive brain damage or surgery. These age differences suggested that the organization supporting language changes over development.",
        "children": []
      },
      {
        "text": "The hypothesis therefore connects learning capacity with the brain’s maturational state. Greater early flexibility would allow different outcomes from those expected in the more specialized adult system. The explanation concerns a developmental change in organization, not simply older learners having heard more words.",
        "children": []
      }
    ],
    "l2-sensitive-03": [
      {
        "text": "Much evidence about **first-language sensitive periods** comes from rare injuries or unusual deprivation histories. These cases are **idiosyncratic**, meaning that their individual circumstances differ substantially. Delayed language input can occur alongside other important developmental influences.",
        "children": []
      },
      {
        "text": "**Second-language learning** is much more common and begins at many ages. A larger population provides variation in both starting age and eventual success. These outcomes can be compared without relying entirely on a few unusual first-language histories.",
        "children": []
      },
      {
        "text": "The question is whether **age at the start of learning** predicts later attainment. That comparison offers evidence about developmental constraints, while also requiring attention to experience and the learner’s existing first language. A later L2 is learned by someone who already has linguistic knowledge, unlike a delayed first language.",
        "children": []
      }
    ],
    "l2-sensitive-04": [
      {
        "text": "**Johnson and Newport** tested **46 native Korean or Chinese speakers** who had arrived in the United States between **ages 3 and 39**. They had lived there for **3–26 years** at testing. The comparison concerned long-term English proficiency across different arrival ages.",
        "children": []
      },
      {
        "text": "Participants judged whether recorded English sentences were grammatical. The **grammaticality judgment task** covered multiple constructions. It measured eventual performance rather than only the speed of the first weeks of learning.",
        "children": []
      },
      {
        "text": "Earlier arrivals generally performed better. The age relationship was strong before puberty, while adult-arrival scores were lower overall but varied widely. Adult scores did not follow the same strong ordering by arrival age.",
        "children": []
      },
      {
        "text": "Measured differences in English experience, motivation, self-consciousness, and American identification did not explain the reported age effect. Johnson and Newport interpreted the pattern as evidence that **maturational state** affects language learning. That is an interpretation of the age–performance relationship, distinct from the scores themselves.",
        "children": []
      }
    ],
    "l2-sensitive-05": [
      {
        "text": "A **grammaticality judgment test, or GJT**, asks whether a sentence follows the language’s grammar. In Johnson and Newport’s **untimed** task, participants listened to recordings and judged the items without a strict response deadline. The question concerned grammatical form rather than whether the event was plausible.",
        "children": []
      },
      {
        "text": "**“The farmer bought two pigs at the market”** contrasts with **“two pig”** to test plural marking. **“The little boy is speaking to a policeman”** contrasts with **“is speak”** to test the required verb form.",
        "children": []
      },
      {
        "text": "**“Tom is reading a book in the bathtub”** contrasts with the missing article in **“reading book.”** **“The boys are going to the zoo”** contrasts with **“A boys,”** while **“Larry went home”** contrasts with **“went the home.”** The constructions require different choices about grammatical forms.",
        "children": []
      },
      {
        "text": "**“When will Sam fix his car?”** contrasts with **“When Sam will fix his car?”** **“What do they sell at the corner store?”** contrasts with **“What they sell at the corner store?”** These pairs test auxiliary placement and the requirements of English questions.",
        "children": []
      }
    ],
    "l2-sensitive-06": [
      {
        "text": "For arrivals at about **3–15 years**, grammaticality accuracy decreases as **age of arrival, or AOA**, increases. The reported correlation is about **−0.87**. A negative correlation means that later arrival tends to accompany a lower score, and its large magnitude indicates a strong relationship in this range.",
        "children": []
      },
      {
        "text": "For arrivals at about **17–39 years**, average scores are lower but much more dispersed. The correlation is about **−0.16**, a weak negative relationship. An older adult arrival does not reliably score below every younger adult arrival.",
        "children": []
      },
      {
        "text": "The result combines a strong early age gradient with considerable later individual variation. It is not one equally strong straight decline across all ages. Describing the full pattern requires distinguishing the two ranges rather than only reporting that earlier learners perform better overall.",
        "children": []
      }
    ],
    "l2-sensitive-07": [
      {
        "text": "Learners arriving **up to about age eight** are often near-perfect and **native-like** on the grammaticality test. Later childhood arrival is associated with progressively lower accuracy. The early group therefore contains both a high-performing youngest range and a declining pattern farther into childhood.",
        "children": []
      },
      {
        "text": "Adult-arrival scores vary substantially without the same strong ordering by age. The description **“nearly random distribution”** concerns the weak relationship between adult arrival age and individual accuracy. It does not mean that late learners answer every sentence at chance.",
        "children": []
      },
      {
        "text": "Individual adults can differ greatly despite similar starting ages. The population pattern favors early learning, while the later range leaves more variation to explain. Age and score therefore relate differently in the early and late parts of the sample.",
        "children": []
      }
    ],
    "l2-sensitive-08": [
      {
        "text": "**Johnson and Newport** interpreted the decline in childhood-arrival performance as a loss of some **language-learning capacity over development**. Earlier exposure occurred during a more favorable maturational state. Later learning took place after those conditions had changed.",
        "children": []
      },
      {
        "text": "The timing did not match every detail of **Lenneberg’s** original formulation. His developmental account relied on sparse neural information between early childhood and adolescence. The later study supplied a behavioral age pattern rather than directly measuring the same proposed neural transition.",
        "children": []
      },
      {
        "text": "They attributed the wide spread among late learners to greater dependence on **individual learning abilities** after the favorable period. Under this interpretation, ordinary early acquisition processes contribute less uniformly to later success. The explanation connects different learning conditions with the difference between early regularity and later variability.",
        "children": []
      }
    ],
    "l2-sensitive-09": [
      {
        "text": "The **exercise hypothesis** proposes an early superior capacity for acquiring languages. If the capacity is not used during the favorable period, it declines or disappears with maturation. If used early, it remains available for learning additional languages throughout life.",
        "children": []
      },
      {
        "text": "The **maturational-state hypothesis** also proposes an early advantage. Its decline follows development even if the person successfully acquired a language in childhood. Early use does not permanently preserve the same learning state.",
        "children": []
      },
      {
        "text": "The accounts therefore predict different outcomes for someone with a normal early **L1**. Exercise predicts that early use protects the capacity for later languages. Maturational state allows successful L1 acquisition to coexist with reduced later L2-learning capacity. The difference concerns whether using the early ability prevents its later decline.",
        "children": []
      }
    ],
    "l2-sensitive-10": [
      {
        "text": "**Implicit knowledge** supports language use without deliberate rule explanation. In **Ellis’s (2005)** distinction, it is procedural knowledge accessed automatically during fluent performance and is difficult to put directly into words. Knowing how to use a construction is different from consciously reciting its rule.",
        "children": []
      },
      {
        "text": "**Explicit knowledge** is consciously available information about grammatical rules and fragments. It is used through controlled processing and can be stated verbally. In the theoretical comparison, it can be learned at any age.",
        "children": []
      },
      {
        "text": "An **untimed GJT** can draw on **metalinguistic knowledge**, conscious knowledge about language itself. A participant can inspect a sentence, remember a taught rule, and choose an answer. A correct answer can therefore come from a different process than the automatic one used in fluent conversation.",
        "children": []
      },
      {
        "text": "The proposed critical-period restriction in this comparison concerns **implicit acquisition**. Explicit learning remains available across ages. A test that permits both sources of knowledge cannot automatically be treated as a pure measure of one of them.",
        "children": []
      }
    ],
    "l2-sensitive-11": [
      {
        "text": "An **untimed GJT** removes time pressure and focuses attention on form. It allows the participant to consult explicit grammatical knowledge. Imitation and oral narrative emphasize meaning under more pressured conditions, so the tasks do not make identical processing demands.",
        "children": []
      },
      {
        "text": "In **Ellis (2005)**, years of formal instruction correlate with untimed judgments of ungrammatical items at about **0.27**. Starting age has a significant negative relationship with the **timed GJT**, about **−0.23**, but little relationship with the untimed judgments in the reported comparisons.",
        "children": []
      },
      {
        "text": "**Task design changes what knowledge is measured**. An unlimited-time form judgment can reflect formal education differently from fluent language use. The score has to be interpreted in relation to whether the task encourages deliberate rules, automatic processing, or a mixture of both.",
        "children": []
      }
    ],
    "l2-sensitive-12": [
      {
        "text": "**Typological similarity** means similarity in how languages organize linguistic forms. A first language with structures resembling those of L2 can supply useful transfer. A learner with different starting structures may have to acquire distinctions that prior language use did not require.",
        "children": []
      },
      {
        "text": "Johnson and Newport tested **Chinese- and Korean-speaking learners of English**. Their transfer opportunities are not identical to those of every other L1–English pairing. A language-pair comparison must therefore consider what the existing language contributes.",
        "children": []
      },
      {
        "text": "**Cognates and borrowed forms** provide one type of overlap through familiar vocabulary. Grammatical similarities can provide others. An observed age relationship can be intertwined with differences in transfer support, so age cannot be interpreted independently of the language systems involved.",
        "children": []
      }
    ],
    "l2-sensitive-13": [
      {
        "text": "**English constructions differ in difficulty** for later learners. **Progressive -ing and word order** are relatively easy in the reported comparison. **Determiners and plural marking** generate substantially more errors for some later-arriving groups. Age does not lower performance by the same amount on every rule.",
        "children": []
      },
      {
        "text": "The categories also include **verb subcategorization, past tense, pronouns, particles, auxiliaries, third-person singular marking, wh-questions, and yes/no questions**. Subcategorization concerns which complements a verb permits. Particles and auxiliaries add grammatical requirements that can differ between languages.",
        "children": []
      },
      {
        "text": "Some difficulties resemble child development, while others fit **transfer**. Chinese lacks the same determiner system as English. Questions that appear late in young children can nevertheless be relatively easy for older L2 learners. The construction’s demands and the learner’s existing knowledge help determine the outcome.",
        "children": []
      }
    ],
    "l2-sensitive-14": [
      {
        "text": "**Birdsong and Molis (2001)** tested **Spanish speakers learning English**. The age-of-arrival pattern differed from that reported for Chinese and Korean speakers. Changing the language pair changed the relationship between age and grammaticality attainment.",
        "children": []
      },
      {
        "text": "In the Spanish-speaking sample, early-arrival scores remained high without the same strong childhood decline. The reported early correlation was about **−0.23**. Among late arrivals, the relationship was more strongly negative, about **−0.69**.",
        "children": []
      },
      {
        "text": "Johnson and Newport instead found a strong childhood relationship and a weak adult relationship. A single fixed maturational cutoff does not explain both shapes on its own. The comparison requires an account of how language pairing, transfer, and learning history can affect the age–performance pattern.",
        "children": []
      }
    ],
    "l2-sensitive-15": [
      {
        "text": "**Older L2 learners have lower attainment overall**, but the measured result depends on which constructions are tested, how the task works, and which languages are involved. A grammaticality score represents performance on particular items under particular demands. It is not a complete measure of every language ability.",
        "children": []
      },
      {
        "text": "**Age of acquisition** is connected with the quantity and quality of experience. **Transfer** changes which L2 properties are supported by L1. These influences can differ across learners who share an arrival age.",
        "children": []
      },
      {
        "text": "**Competence and performance** also differ. A task can permit deliberate rule use or require rapid, fluent processing. Explaining the overall age advantage requires distinguishing these contributions instead of assuming that every task and language pair measures one uniform developmental effect.",
        "children": []
      }
    ],
    "l2-sensitive-16": [],
    "review-1": [],
    "review-2": [
      {
        "text": "A **speech continuum** is a set of sounds that changes gradually along a controlled acoustic property. In the sequence from stimulus 1 to 13, **F1 stays constant** and **F2 onset frequency changes linearly**. Linearly means that each adjacent pair differs by the same programmed amount.",
        "children": []
      },
      {
        "text": "At one end, F2 starts below the vowel’s stable value and rises into it. As the starting frequency increases, the transition becomes flatter and eventually falls from above that stable value. The physical change is gradual even if the listener assigns different sound labels along the way.",
        "children": []
      },
      {
        "text": "A pair inside one phoneme category can be compared with an equally separated pair crossing a category boundary. Both pairs have the same physical difference. Better discrimination for one pair would therefore concern how the listener organizes the sounds, rather than a larger change built into the stimuli.",
        "children": []
      }
    ],
    "review-3": [
      {
        "text": "An **ideal observer model** states what responses would be expected under a particular account of perception. If perception is **noncategorical**, uncertainty should change gradually as a sound moves away from a clear example of a category. A **prototype** is that clear representative, rather than a boundary between categories.",
        "children": []
      },
      {
        "text": "The continuum has **/b/** at one end, **/g/** at the other, and **/d/** in the middle. Moving away from the /b/ prototype makes a sound less characteristic of /b/ and more characteristic of /d/. Under the proposed gradual pattern, stimulus 2 receives about **75% /b/** and **25% /d/** responses.",
        "children": []
      },
      {
        "text": "Categories become “blurry” between their prototypes because neighboring labels become plausible by degrees. The predicted /b/ responses fall as /d/ responses rise, and the same gradual exchange occurs between /d/ and /g/. The model predicts a smooth change in uncertainty rather than an abrupt switch.",
        "children": []
      }
    ],
    "review-4": [
      {
        "text": "A **labeling task** asks the listener to identify a sound, such as /b/, /d/, or /g/. A **discrimination task** asks whether two sounds are the same or different. One response names a category, while the other concerns whether a physical difference can be heard.",
        "children": []
      },
      {
        "text": "If perception of F2-onset differences is **linear**, equal physical differences should be equally easy to hear. For example, sounds 1 and 3 should be about as discriminable as sounds 5 and 7. Their positions on the continuum differ, but their programmed separation is equal.",
        "children": []
      },
      {
        "text": "This account predicts that **discrimination is independent of labeling**. Labeling responses can rise and fall around the prototypes because a category must be chosen. Discrimination should remain approximately constant across equally separated pairs, rather than improving specifically where the label changes.",
        "children": []
      }
    ],
    "review-5": [
      {
        "text": "**Liberman and colleagues (1957)** found **categorical perception** even though the acoustic continuum changed in equal steps. Early sounds mainly received /b/ labels, middle sounds /d/ labels, and later sounds /g/ labels. Responses changed abruptly near the boundaries instead of becoming gradually uncertain across the whole sequence.",
        "children": []
      },
      {
        "text": "**Discrimination was best near the /b/–/d/ and /d/–/g/ boundaries**. Sounds assigned to different phonemes were easier to distinguish than similarly spaced sounds assigned to the same phoneme. This relationship occurred in the one-step, two-step, and three-step comparisons, with chance near 50% correct.",
        "children": []
      },
      {
        "text": "Greater physical separation generally made discrimination easier, but separation alone did not explain the boundary peaks. Predictions based on labeling captured much of that pattern. Listeners also retained some sensitivity beyond the simplest categorical prediction, so identifying a category and detecting a difference were closely related without becoming the same measurement.",
        "children": []
      }
    ],
    "review-6": [
      {
        "text": "As a sound approaches the **category boundary**, looks toward the other member of the **minimal pair** increase gradually. A minimal pair contains two words distinguished by one speech sound. The graded looking effect occurs even among sounds given the same final phoneme label.",
        "children": []
      },
      {
        "text": "A **cascaded account** retains the partial evidence that differs across those sounds. More support for the competing phoneme can pass into stronger activity for its word. The later word process receives information about degree of uncertainty, not only the eventual category name.",
        "children": []
      },
      {
        "text": "A strict **threshold-only account** passes the same completed phoneme for all those tokens. If their earlier differences have been discarded, the word level lacks the changing information needed to explain different amounts of competitor looking. The difficulty concerns the loss of distinctions before lexical processing begins.",
        "children": []
      }
    ],
    "review-7": [
      {
        "text": "**Lexical feedback** means that an activated word sends support back to the phonemes that make up that word. A partly matching sound can activate a possible word, and that word can then favor the phoneme interpretation compatible with its full form.",
        "children": []
      },
      {
        "text": "Influence can therefore operate in both directions. Sound evidence changes which words are active, while active words change the balance between interpretations of the sounds. The word level does not merely wait for a final lower-level output.",
        "children": []
      },
      {
        "text": "**Cascading and feedback are separate properties**. Cascading passes partial information forward, whereas feedback sends influence back toward an earlier level. A model can use both while the listener is still recognizing the word.",
        "children": []
      }
    ],
    "review-8": [
      {
        "text": "A **late-correction account** lets phoneme perception proceed normally and adds a preference for reporting a real word afterward. With **corpse–gorpse**, a listener is biased toward saying corpse after the initial sound has already been categorized. The word preference affects the report rather than the earlier phoneme decision.",
        "children": []
      },
      {
        "text": "This predicts a **general reporting bias** across the continuum. The tendency to favor the word should not be restricted to only the most acoustically ambiguous region. Word knowledge supplies a later adjustment to the response.",
        "children": []
      },
      {
        "text": "The **word–nonword, neutral, and nonword–word conditions** differ in which consonant interpretation produces a real word. A late correction can shift reporting in those conditions without changing the location of the perceptual category boundary itself. That is a different prediction from having word knowledge resolve uncertainty during phoneme identification.",
        "children": []
      }
    ],
    "review-9": [
      {
        "text": "Under a **boundary-shift account**, word knowledge changes where the listener switches between phoneme categories. An ambiguous sound is more likely to receive the interpretation that forms a real word. The effect concerns the category decision, rather than a correction added only after that decision.",
        "children": []
      },
      {
        "text": "The largest lexical effect is expected **near the category boundary**. Clear endpoint sounds strongly support one consonant, so there is little uncertainty for word knowledge to resolve. Near the boundary, both interpretations are plausible and lexical information can exert more influence.",
        "children": []
      },
      {
        "text": "Differences between the lexical conditions should therefore grow in the ambiguous region and shrink at the endpoints. This pattern differs from a uniform report bias across all positions. The location of the effect is part of what separates the two explanations.",
        "children": []
      }
    ],
    "review-10": [
      {
        "text": "**Ganong’s results** have the largest word-related differences near the **phoneme category boundary**, with smaller differences toward the clearer endpoints. The identification curves shift depending on which consonant interpretation forms a real word. The effect is not an equal adjustment at every point in the continuum.",
        "children": []
      },
      {
        "text": "This pattern is consistent with a **shift in phoneme labeling** rather than only a uniform preference for saying a word afterward. Acoustic clarity still matters because the lexical effect is concentrated where the consonant is uncertain.",
        "children": []
      },
      {
        "text": "Ganong considered guessing strategies, while **interactive models** produce the effect through **lexical-to-phoneme feedback**. An active word supports its compatible sounds. This mechanism allows knowledge of a whole word to change the balance between interpretations of an ambiguous part.",
        "children": []
      }
    ],
    "review-11": [
      {
        "text": "A **TRACE simulation of the Ganong effect** begins with an onset ambiguous between **/b/ and /p/**. The following input supplies **/l/**, the vowel in plug, and a final **/g/** over time. Both onset candidates initially receive support because the first sound is uncertain.",
        "children": []
      },
      {
        "text": "Partial /b/ evidence can support **bl-** words, while partial /p/ evidence supports **pl-** words. Candidates receive more or less activation as additional sounds match or conflict with them. Recognition proceeds while the input is still arriving.",
        "children": []
      },
      {
        "text": "**Plug, blood, and blush** can receive support before the ending settles the competition. The final /g/ matches plug but conflicts with the endings of blood and blush. Activation for plug increases, competing words lose support, and feedback favors the phonemes compatible with plug.",
        "children": []
      }
    ],
    "review-12": [
      {
        "text": "As the input unfolds, **plug** gains support, especially when the **final /g/** arrives. **Blood and blush** can fit some earlier information, but their endings conflict with /g/. A candidate that was plausible at the beginning can lose support when the rest of the word arrives.",
        "children": []
      },
      {
        "text": "Stronger activation of **plug** sends feedback to **/p/**. The word’s beginning becomes favored because it matches the interpretation supported by the complete input. Later information therefore changes the balance between interpretations of an earlier ambiguous sound.",
        "children": []
      },
      {
        "text": "This is **top-down processing** within TRACE. A word-level representation influences a phoneme-level representation through the model’s connections. Lexical context contributes during recognition instead of being applied only as a final correction to an already completed report.",
        "children": []
      }
    ],
    "review-13": [
      {
        "text": "A **parser** works out a sentence’s grammatical structure as words are heard or read. It identifies which words belong together and how their groups relate. A **syntactic tree** represents these relationships, rather than merely listing the meanings of the individual words.",
        "children": []
      },
      {
        "text": "A **noun phrase, or NP**, groups a noun with associated material. A **verb phrase, or VP**, groups a verb with its complements. A **prepositional phrase, or PP**, includes a preposition and its object. These groupings determine how a modifier or action belongs in the sentence.",
        "children": []
      },
      {
        "text": "The parser works with **limited memory and limited time**. In the reduced-relative interpretation, the horse contains a modifier equivalent to “that was raced past the barn,” while fell remains the main verb. Maintaining that embedded structure is more complex than initially treating raced as the main verb. A processing account has to explain how a real cognitive system handles such alternatives as the input arrives.",
        "children": []
      }
    ],
    "review-14": [
      {
        "text": "**Minimal attachment** is a preference for initially building the **smaller syntactic tree**. A tree’s nodes represent grammatical groupings, so an analysis with fewer nodes requires less structure to be constructed at that point. The parser does not begin by fully building every possible interpretation.",
        "children": []
      },
      {
        "text": "Treating **raced** as the main verb gives a simpler early analysis of the horse sentence. Treating “raced past the barn” as a modifier requires an embedded clause inside the noun phrase. Under that more complex analysis, fell is the main predicate outside the modifier.",
        "children": []
      },
      {
        "text": "Choosing the simpler structure can reduce the initial demands on memory. It can also cause difficulty when a later word requires the more complex alternative. The garden path occurs because the initially preferred structure cannot incorporate the continuation, not because the correct structure is unavailable in the grammar.",
        "children": []
      }
    ],
    "review-15": [
      {
        "text": "**Late closure** is a tendency to attach new material to the clause or phrase currently being processed, keeping that structure open. In **“The burglar blew open the safe with the dynamite,”** “with the dynamite” is preferentially linked to **blew open**. The phrase then describes how the safe was opened.",
        "children": []
      },
      {
        "text": "Under this **verb-phrase attachment**, the dynamite is the instrument used in the action. Under the alternative **noun-phrase attachment**, the words form “the safe with the dynamite,” so the phrase identifies or describes the safe instead.",
        "children": []
      },
      {
        "text": "The same words allow both grammatical arrangements. The attachment determines whether the dynamite belongs to the action as its instrument or to the object as a property. A preference for one arrangement affects which event interpretation becomes available first.",
        "children": []
      }
    ],
    "review-16": [
      {
        "text": "In **“The burglar blew open the safe with the jewels,”** the preferred action-related attachment would make the jewels the instrument used to open the safe. That event is implausible. The sensible interpretation instead takes **with the jewels** as identifying the safe that contains them.",
        "children": []
      },
      {
        "text": "The parser has to use the **unpreferred noun-phrase attachment** to obtain that meaning. The difference is not that jewels is an unfamiliar word. It concerns which part of the sentence the phrase modifies.",
        "children": []
      },
      {
        "text": "**Reading times and eye movements** indicate slower processing when the sensible meaning requires this alternative attachment. The listener or reader can briefly adopt the wrong relationship and then revise it. A familiar grammatical preference can therefore create a processing cost even when the final meaning is straightforward.",
        "children": []
      }
    ],
    "review-17": [
      {
        "text": "An **autonomous parser** is proposed to make its earliest decisions using **abstract syntactic structure** rather than meaning. Autonomous means that its initial structural choices follow its own operating preferences. Semantic information is not used to choose the first parse in this account.",
        "children": []
      },
      {
        "text": "**Minimal attachment** favors a smaller tree, while **late closure** favors attaching incoming words to the structure already being processed. These preferences reduce the need to maintain every alternative fully. A preferred interpretation is selected before the continuation has necessarily resolved the ambiguity.",
        "children": []
      },
      {
        "text": "When a later word cannot fit, the parser revises that interpretation. Difficulty is expected when the initial structural preference has to be abandoned. This account therefore separates the earliest choice of structure from later correction based on the developing sentence.",
        "children": []
      }
    ],
    "review-18": [
      {
        "text": "**Spivey and colleagues (1995)** asked participants to follow spoken instructions while viewing objects. The one-apple display contained **a pencil, a box, an empty towel, and an apple on a towel**. The instruction was **“Put the apple on the towel in the box.”**",
        "children": []
      },
      {
        "text": "**On the towel** can first sound like the destination of put, encouraging a plan to move the apple to the empty towel. In the intended meaning, it identifies the apple’s current location. **In the box** is the actual destination.",
        "children": []
      },
      {
        "text": "Participants often looked toward the empty towel before turning toward the box. The wording **“Put the apple that’s on the towel in the box”** makes the modifier explicit and reduces this temporary destination error. The eyes record an interpretation that can be considered before the final movement is completed.",
        "children": []
      }
    ],
    "review-19": [
      {
        "text": "In the **two-apple display**, one apple is on a towel and another is on a different support. “The apple” no longer identifies a unique object. The words **on the towel** can supply the information needed to select the intended apple.",
        "children": []
      },
      {
        "text": "With that visual context, eye movements proceed toward the target apple and then toward the box, rather than making the same detour toward the empty towel. The ambiguous wording and the explicit “that’s on the towel” wording have similar sequences and timing.",
        "children": []
      },
      {
        "text": "The local situation changes what the phrase is useful for. When there are two apples, a location modifier answers which apple is meant. Sentence interpretation can therefore depend on the objects currently available, not only on the sentence’s grammatical form in isolation.",
        "children": []
      }
    ],
    "review-20": [
      {
        "text": "With **one apple**, listeners hearing the ambiguous instruction make more looks toward the empty towel as a possible destination. With **two apples**, these incorrect-destination looks are substantially reduced. The same words can receive different early interpretations in the two contexts.",
        "children": []
      },
      {
        "text": "The **unambiguous instruction** produces relatively few destination errors in either display. Its wording already marks the towel phrase as a modifier. The largest cost of ambiguity therefore occurs when only one apple is present.",
        "children": []
      },
      {
        "text": "Two possible apples make extra identifying information useful. **On the towel** can then select the correct object before **in the box** gives its destination. The referential context, meaning which objects a phrase could refer to, helps determine the attachment of the location phrase.",
        "children": []
      }
    ],
    "review-21": [
      {
        "text": "**Wernicke’s aphasia** can produce fluent **“word salad” or “Jabberwocky”**, including **neologisms**. A patient describing impaired vision said **“My wires don’t hire right.”** The sentence has a recognizable subject and verb pattern, but the selected words fail to express the intended visual problem.",
        "children": []
      },
      {
        "text": "Another health response began **“I felt worse because I can no longer keep in mind from the mind of the minds…”** Grammatical-sounding phrases continue without a coherent message. An aphasic physician also used invented forms such as **“demaploze” and “tubaboys.”**",
        "children": [
          "A fork was described as **“a need for a schedule,”** and a spoon as **“How many schemes on your throat.”** Words are produced fluently, but their selection does not provide an adequate object description."
        ]
      },
      {
        "text": "**Broca’s aphasia** can instead produce **telegraphic speech**, with important content words and few grammatical connections. A hospital account retained **“Monday,” “Dad,” “hospital,” “two doctors,” “thirty minutes,” “Wednesday,” “nine o’clock,” “Thursday,” “ten o’clock,” and “teeth.”** Pauses and missing grammatical particles make the account difficult to produce and follow, while surviving content words still convey parts of the event.",
        "children": []
      }
    ],
    "review-22": [
      {
        "text": "A traditional division assigns **lexical activation or inhibition problems** to Wernicke’s aphasia and **grammar problems** to Broca’s aphasia. The **lexicon** is the system of stored word knowledge. Activation makes a word available, while inhibition reduces competing words that should not be selected.",
        "children": []
      },
      {
        "text": "**Broca’s original patient Leborgne**, nicknamed **Tan**, could produce essentially one syllable. He appeared to understand what was said and retain other abilities. His very restricted output was different from the partly informative but agrammatic speech associated with the later syndrome.",
        "children": []
      },
      {
        "text": "Those original cases may fit **apraxia of speech**, a problem organizing the movements needed to speak. A difficulty planning speech movements and a loss of grammatical knowledge are different proposed causes of limited output. The amount a person can say does not, by itself, identify which operation is impaired.",
        "children": []
      }
    ],
    "review-23": [
      {
        "text": "A sharp distinction between **grammar and the lexicon** separates rules for combining words from stored word representations. Under the formal linguistic account, a new sentence is understood by constructing its grammatical structure. It is not necessary for the complete sentence to have been memorized before.",
        "children": []
      },
      {
        "text": "**“Colorless green ideas sleep furiously”** has a grammatical organization despite its unusual meaning. **“Furiously sleep ideas green colorless”** contains the same words without that organization. Knowing the word meanings and a familiar event is insufficient to explain why the two orders differ.",
        "children": []
      },
      {
        "text": "The proposed aphasia division links Wernicke’s aphasia with disrupted access to lexical items and Broca’s aphasia with disrupted grammar. This is a claim about separate processes, beyond the observation that one group tends to speak fluently and another does not. It predicts differences in the operations affected by damage.",
        "children": []
      }
    ],
    "review-24": [
      {
        "text": "**Conversation contains redundant cues** to a speaker’s intended meaning. In **“The dog bit the man,”** the meanings of dog, bite, and man support a familiar event. Ordinary English **subject–verb–object order** also favors taking the first noun as the agent, the participant performing the action.",
        "children": []
      },
      {
        "text": "A **heuristic** is a simplifying strategy that uses a regular pattern instead of a complete analysis. A listener might choose the likely biter or assume the first noun performs the action. Discourse context can supply further clues, allowing comprehension even if the grammar is not fully analyzed.",
        "children": []
      },
      {
        "text": "**“The dog that the man is biting is angry”** conflicts with those shortcuts. The **man** is doing the biting, and the **dog** receives it despite appearing first. The main-clause subject and the agent inside the relative clause are different roles. Correct understanding requires tracking the sentence’s relationships rather than relying only on plausibility or noun order.",
        "children": []
      }
    ],
    "review-25": [
      {
        "text": "**Caramazza and Zurif** compared control sentences with several kinds of **center-embedded sentence**, in which one clause occurs inside another. Controls included **“The girl is kicking a green ball,” “The cat is chasing a blue bird,” “The girl is pulling a red wagon,”** and **“The man is reading a yellow book.”** The other controls involve a boy riding a new bicycle, a girl holding a broken doll, a boy throwing a round ball, and a boy carrying a sharp pencil. Normal order and event knowledge support the same actor.",
        "children": []
      },
      {
        "text": "**Semantically constrained** items contain an embedded clause but make the likely actor clear. Examples are **“The apple that the boy is eating is red,” “The wagon that the horse is pulling is green,” “The book that the girl is reading is yellow,”** and **“The bat that the boy is carrying is brown.”** Other items involve a boy holding a bicycle, a girl wearing a coat, a woman washing a dress, and a clown holding a balloon. Plausibility supplies a strong cue alongside grammar.",
        "children": []
      },
      {
        "text": "**Reversible** items allow either participant to act plausibly. They include **“The cow that the monkey is scaring is yellow,” “The horse that the bear is kicking is brown,” “The cat that the dog is biting is black,”** and **“The fish that the frog is biting is green.”** Other pairs concern a tiger chasing a lion, a boy hitting a girl, a woman hugging a man, and a boy kicking a girl. Grammar must distinguish who does what because either direction is possible.",
        "children": []
      },
      {
        "text": "**Improbable** items make ordinary expectations favor the wrong actor. They include **“The horse that the bird is kicking is brown,” “The lion that the baby is scaring is yellow,” “The bird that the worm is eating is blue,”** and **“The dog that the man is biting is black.”** Other items make a horse ride a man, a boy spank a woman, a robber chase a policeman, and a cat pat a girl. The noun inside the embedded clause performs the action even when that event is unusual.",
        "children": []
      }
    ],
    "review-26": [
      {
        "text": "In **sentence–picture matching**, a patient hears a sentence and selects the picture that matches its meaning. The controlled conditions vary whether ordinary event knowledge helps identify the actor or whether grammar must carry that information. Accuracy is the measured outcome.",
        "children": []
      },
      {
        "text": "**Healthy controls** perform about equally well across controls, semantically constrained, reversible, and improbable sentences. **Wernicke’s patients** perform poorly overall. **Broca’s patients** do better when plausible event roles support the grammatical meaning and worse when they must track the roles without that help.",
        "children": []
      },
      {
        "text": "**Caramazza and Zurif** interpreted the Broca pattern as evidence of a **syntactic comprehension impairment**. The difficulty is not limited to producing speech. It appears when understanding who acted on whom requires the structural relationships, particularly when ordinary expectations cannot substitute for them.",
        "children": []
      }
    ],
    "review-27": [
      {
        "text": "In **Dick and colleagues’ task**, listeners select **which animal performs the action**. The event remains the dog biting the cat, while the grammar changes. Recognizing the animal names alone is insufficient because the task asks which one is the actor.",
        "children": []
      },
      {
        "text": "**“The dog is biting the cat”** is an **active** sentence. **“It’s the dog that is biting the cat”** is a **subject cleft**. Both introduce the dog before the cat and put the actor first.",
        "children": []
      },
      {
        "text": "**“It’s the cat that the dog is biting”** is an **object cleft**. **“The cat is bitten by the dog”** is a **passive**. Both begin with the participant receiving the action. A first-noun-is-actor strategy gives the wrong answer, so grammar must distinguish the dog’s role from the cat’s role.",
        "children": []
      }
    ],
    "review-28": [
      {
        "text": "**Healthy aging controls** identify the actor accurately across active, subject-cleft, object-cleft, and passive sentences. Aphasia groups have different levels and patterns of difficulty. **Anomic aphasia**, associated with word-finding difficulty, has better overall performance than several other groups but still declines on harder forms.",
        "children": []
      },
      {
        "text": "**Broca’s aphasia and conduction aphasia** produce a marked decline for object clefts and poorer performance for passives than for the easier forms. **Wernicke’s patients** have low accuracy across all four structures. The groups are not interchangeable in either overall accuracy or sensitivity to sentence form.",
        "children": []
      },
      {
        "text": "Broca’s patients are particularly vulnerable to **noncanonical structures**, forms that depart from the usual actor-first arrangement. Their active-sentence accuracy is also below the healthy level. The pattern therefore combines a general performance reduction with an additional cost for harder grammatical relationships.",
        "children": []
      }
    ],
    "review-29": [
      {
        "text": "**Healthy undergraduates** also lose comprehension accuracy when processing is stressed. Conditions include faster or compressed speech, **low-pass filtering**, added noise, and remembering auditory or visual digit lists during sentence interpretation. Low-pass filtering removes higher-frequency information, while a digit-memory task adds a competing demand.",
        "children": []
      },
      {
        "text": "**Object clefts and passives** are especially vulnerable across the manipulations. Active sentences and subject clefts remain relatively easier. Combining stresses, including filtering with compression, produces larger losses than ordinary listening.",
        "children": []
      },
      {
        "text": "These listeners have no aphasic brain injury, yet taxing processing produces a disproportionate cost for difficult structures. A similar aphasia pattern can therefore reflect a **performance limitation**, not uniquely the loss of a grammatical rule. The comparison concerns how much processing demand an intact or injured system can handle.",
        "children": []
      }
    ],
    "review-30": [
      {
        "text": "**Saygin and colleagues (2004)** asked participants to **match an action with an object**. In a nonverbal condition, an action such as licking is conveyed without spoken language and must be matched to something such as an ice cream. A linguistic condition supplies language-based information for the matching decision.",
        "children": []
      },
      {
        "text": "Aphasic participants are less accurate in both conditions. Their accuracy is about **93.4% for nonlinguistic items and 87.5% for linguistic items**, compared with **98.5% and 99.4%** for controls. Difficulties therefore extend beyond interpreting spoken sentences.",
        "children": []
      },
      {
        "text": "**Semantically related distractors** are more disruptive than unrelated alternatives. A wrong object related in meaning competes more with the correct action–object match. The task tests selecting the relevant meaning even when no grammatical sentence is required.",
        "children": []
      }
    ],
    "review-31": [
      {
        "text": "Poorer **nonverbal action matching** is significantly associated with **damage to Broca’s area**. Participants must interpret a pantomimed action and choose the fitting object. The task does not require producing a spoken sentence or extracting the grammar of a heard sentence.",
        "children": []
      },
      {
        "text": "The lesion–performance relationship connects frontal damage with a comprehension demand outside language. A person can struggle to recover the relevant action meaning even when linguistic forms have been removed from the input.",
        "children": []
      },
      {
        "text": "The proposed deficit therefore has to account for action interpretation as well as grammatical findings. An association with Broca’s area does not, by itself, restrict every affected operation to syntax. The behavioral task identifies what information the patient has to use, while the lesion analysis identifies where damage is related to poorer performance.",
        "children": []
      }
    ],
    "review-32": [
      {
        "text": "The **conditioned head turn procedure** measures an infant’s detection of a sound change through an orienting response. An auditory event predicts a rewarding visual event, and the infant learns to turn toward its source. Detecting the auditory difference can therefore be recorded without a spoken judgment.",
        "children": []
      },
      {
        "text": "**High-amplitude sucking** uses a different behavior. Sucking can decline as a sound is repeated and becomes familiar. If changing that sound renews sucking, the infant has responded to a difference in the auditory input.",
        "children": []
      },
      {
        "text": "The procedures measure speech discrimination before infants can name or pronounce the tested sounds. A head turn and a sucking response are not phoneme labels, but they provide measurable evidence of sensitivity. The experiment controls what changes in the sound and examines how the infant’s behavior changes with it.",
        "children": []
      }
    ],
    "review-33": [
      {
        "text": "**Eimas and colleagues (1971)** varied **voice onset time**, the delay from stop-consonant release to vocal-fold vibration. Infants first heard repeated synthetic syllables, and sucking declined during repetition. A controlled sound change then tested whether responding recovered.",
        "children": []
      },
      {
        "text": "In **20D**, VOT changed by **20 milliseconds**, from **+20 to +40 milliseconds**, crossing an adult phoneme boundary. Sucking increased again. The infant responded to the difference even though no verbal labeling response was required.",
        "children": [
          "In **20S**, the same 20-millisecond difference stayed within one adult category. The pairs were **−20 to 0** or **+60 to +80 milliseconds**, and sucking recovered much less.",
          "In the **0 control**, the sound remained unchanged and responding continued to decline."
        ]
      },
      {
        "text": "The two kinds of change had equal physical size. Their different effects therefore connect infant sensitivity with the category relationship, rather than only the amount of VOT change. Category-related discrimination is present before mature speech production.",
        "children": []
      }
    ],
    "review-34": [
      {
        "text": "**Categorical perception** was proposed as a way of turning speech into a **symbolic representation** that language processes could use. A stable sound identity could be recovered from variable acoustic input. Finding this organization very early was taken as possible evidence of an innate speech-processing ability.",
        "children": []
      },
      {
        "text": "At about **four months**, infants are still developing basic motor skills, including using two hands to manipulate objects and holding up their head and chest while lying prone. Color vision and general visual acuity are also still developing. These are broad developmental comparisons, not the speech-discrimination measure itself.",
        "children": []
      },
      {
        "text": "Vocal production is only beginning to include more vowel-like sounds rather than creaky whines. Category-related perception therefore precedes mature production. The early timing contributed to the innateness interpretation, because the infants could respond systematically to speech differences long before speaking in an adult-like way.",
        "children": []
      }
    ],
    "review-35": [
      {
        "text": "**Perceptual narrowing** is a developmental reduction in sensitivity to some sound distinctions. Around six months, English-learning infants can distinguish certain contrasts outside their own language. Some of those differences become harder to hear as experience tunes the system to the language used around them.",
        "children": []
      },
      {
        "text": "**Werker and Tees** compared discrimination of **Hindi and Salish contrasts**. Performance is relatively strong at **6–8 months**, lower at **8–10 months**, and much lower at **10–12 months** for English-learning infants. Infants with relevant Hindi or Salish experience retain stronger discrimination.",
        "children": []
      },
      {
        "text": "The developmental change is therefore related to which sound system is experienced. A distinction that can be detected early does not necessarily remain equally available. Adapting to native-language categories changes the differences to which perception stays sensitive.",
        "children": []
      }
    ],
    "review-36": [
      {
        "text": "The **“citizens of the world” account** proposes that infants begin with broad, innate knowledge about speech. **Language-general** means that the starting knowledge is not limited to one particular native language. Categorical perception is treated as an early capacity of the language system itself.",
        "children": []
      },
      {
        "text": "Learning then **selects among innately specified contrasts**. The child’s experience identifies which of the available distinctions matter for the surrounding language. The result is a system tuned to that language rather than equally sensitive to every possible contrast.",
        "children": []
      },
      {
        "text": "Under this account, the main developmental change is narrowing a broad initial inventory. Experience preserves or emphasizes useful distinctions instead of having to build every category from an initially undifferentiated signal. This is a proposal about both the starting abilities and the work performed by learning.",
        "children": []
      }
    ],
    "review-37": [
      {
        "text": "The **inductive problem of early word learning** is that one encounter can support many possible meanings. Near a cat, a new word could name **CAT, ANIMAL, PET, or FELIX**. These alternatives differ in whether they pick out a category, a broader class, a role, or one individual.",
        "children": []
      },
      {
        "text": "The same event also supports **FURRY, ALIVE, WALKING, WHISKERS, or LEG**. Those are properties, a state, an action, and parts of the animal. Simply having a word and a visible cat together does not uniquely select one of them.",
        "children": []
      },
      {
        "text": "The **hypothesis space** is the set of candidate meanings consistent with the experience. **Quine’s gavagai problem** describes this uncertainty about reference. Word learning requires evidence or constraints that narrow the alternatives, rather than assuming that a single word–scene pairing makes the intended meaning obvious.",
        "children": []
      }
    ],
    "review-38": [
      {
        "text": "**Joint attention** means sharing an attentional focus with another person. An adult and child coordinate which object or event the interaction concerns. This provides information about reference beyond whichever object happens to be most noticeable to the child alone.",
        "children": []
      },
      {
        "text": "**Gaze following** emerges around **nine months**. Infants can follow the direction of another person’s eyes toward something that person is attending to. The speaker’s gaze provides a cue about what a label may be intended to name.",
        "children": []
      },
      {
        "text": "Coordinating attention can narrow the possible referents of a new word. The child can connect the spoken expression with the adult’s focus, rather than pairing it indiscriminately with everything in the scene. Shared attention concerns the relationship between two people and a referent, not just looking at an object independently.",
        "children": []
      }
    ],
    "review-39": [
      {
        "text": "In **Baldwin and colleagues’ joint-attention condition**, an adult interacted with an infant and labeled the object the infant was playing with. The spoken word occurred within a visibly shared focus. The adult’s behavior made the referential relationship part of an interaction.",
        "children": []
      },
      {
        "text": "In the **no-joint-attention condition**, a voice behind a screen supplied the label while the object was present. A word and an object were available in both conditions, but the visible coordination with a speaker differed.",
        "children": []
      },
      {
        "text": "**Eighteen-month-olds** learned the novel word in the joint-attention condition but not in the no-joint-attention condition. Temporal co-occurrence alone did not produce the same outcome. The social organization of reference affected which association the child learned.",
        "children": []
      }
    ],
    "review-40": [
      {
        "text": "**Intentional cues** provide evidence about what a speaker is trying to refer to. **Eye gaze** can identify an object different from the one the child is currently handling. The speaker’s intended label does not have to match the child’s own immediate focus.",
        "children": []
      },
      {
        "text": "Baldwin tested **16–17-month-olds and 18–19-month-olds**. In **follow-in labeling**, the adult looked at the toy already occupying the child’s attention. In **discrepant labeling**, the adult looked toward a toy in a bucket instead.",
        "children": []
      },
      {
        "text": "The comparison separates the infant’s current interest from the adult’s indicated referent. Using gaze allows the child to connect the word with what the speaker means, rather than automatically assigning every new label to the toy already in hand. The same available objects can support different word mappings depending on the speaker’s attention.",
        "children": []
      }
    ],
    "review-41": [
      {
        "text": "**Affective and behavioral cues** are information supplied by a speaker’s emotional expressions and actions. A reaction can indicate that an object satisfies a goal or is not the item being sought. The child can use that reaction to distinguish possible referents of a new word.",
        "children": []
      },
      {
        "text": "In **Akhtar and colleagues’ study**, infants used adult facial expressions to identify the intended object. The expression supplied evidence about the adult’s relation to the object, rather than merely adding another visible event.",
        "children": []
      },
      {
        "text": "A word can occur while several objects are present. Emotional and behavioral evidence helps determine which object the label concerns. Word learning therefore includes interpreting the adult’s intention, instead of treating every item near the utterance as an equally likely association.",
        "children": []
      }
    ],
    "review-42": [
      {
        "text": "A **default word-learning strategy** favors an interpretation unless other evidence supports an alternative. It reduces the number of candidate meanings considered initially. A default is a starting preference rather than a claim that every word must have that kind of meaning.",
        "children": []
      },
      {
        "text": "The **whole-object assumption** favors treating a new label as naming an entire object. Other possible meanings include one of its parts, a property, or an action involving it. The preference makes the whole object a stronger initial candidate.",
        "children": []
      },
      {
        "text": "The strategy narrows the **hypothesis space**, the possible meanings consistent with the scene. The child does not have to test every visible property and part equally before learning can proceed. Further evidence can still establish a different intended kind of reference.",
        "children": []
      }
    ],
    "review-43": [
      {
        "text": "**Mutual exclusivity**, associated with **Markman (1989)**, is the default that an object has only one name. If a child already knows a label for one candidate, a new label is more likely to be assigned to an object without a known name. Existing vocabulary changes which referent seems plausible.",
        "children": []
      },
      {
        "text": "This strategy emerges during the **second half of the second year**. The child uses what has already been learned about one object to interpret an unfamiliar expression in the same scene. The new sound alone does not determine the choice.",
        "children": []
      },
      {
        "text": "Mutual exclusivity is a **default**, so its role is to constrain the initial inference. A familiar object with an established name becomes a less likely candidate for the novel label. An unnamed alternative becomes more likely because it does not create that competition between names.",
        "children": []
      }
    ],
    "review-44": [
      {
        "text": "**Lenneberg (1967)** linked a favorable language-learning period with the development of **cerebral dominance**. Cerebral dominance means increasing specialization of the hemispheres. **Language laterality** concerns how strongly language functions are associated with one side rather than the other.",
        "children": []
      },
      {
        "text": "The proposal combined language milestones and neural-development observations with evidence from injury. Children often had better language outcomes than adults after extensive brain damage or surgery. These age differences suggested that the organization supporting language changes over development.",
        "children": []
      },
      {
        "text": "The hypothesis therefore connects learning capacity with the brain’s maturational state. Greater early flexibility would allow different outcomes from those expected in the more specialized adult system. The explanation concerns a developmental change in organization, not simply older learners having heard more words.",
        "children": []
      }
    ],
    "review-45": [
      {
        "text": "Much evidence about **first-language sensitive periods** comes from rare injuries or unusual deprivation histories. These cases are **idiosyncratic**, meaning that their individual circumstances differ substantially. Delayed language input can occur alongside other important developmental influences.",
        "children": []
      },
      {
        "text": "**Second-language learning** is much more common and begins at many ages. A larger population provides variation in both starting age and eventual success. These outcomes can be compared without relying entirely on a few unusual first-language histories.",
        "children": []
      },
      {
        "text": "The question is whether **age at the start of learning** predicts later attainment. That comparison offers evidence about developmental constraints, while also requiring attention to experience and the learner’s existing first language. A later L2 is learned by someone who already has linguistic knowledge, unlike a delayed first language.",
        "children": []
      }
    ],
    "review-46": [
      {
        "text": "**Johnson and Newport** tested **46 native Korean or Chinese speakers** who had arrived in the United States between **ages 3 and 39**. They had lived there for **3–26 years** at testing. The comparison concerned long-term English proficiency across different arrival ages.",
        "children": []
      },
      {
        "text": "Participants judged whether recorded English sentences were grammatical. The **grammaticality judgment task** covered multiple constructions. It measured eventual performance rather than only the speed of the first weeks of learning.",
        "children": []
      },
      {
        "text": "Earlier arrivals generally performed better. The age relationship was strong before puberty, while adult-arrival scores were lower overall but varied widely. Adult scores did not follow the same strong ordering by arrival age.",
        "children": []
      },
      {
        "text": "Measured differences in English experience, motivation, self-consciousness, and American identification did not explain the reported age effect. Johnson and Newport interpreted the pattern as evidence that **maturational state** affects language learning. That is an interpretation of the age–performance relationship, distinct from the scores themselves.",
        "children": []
      }
    ],
    "review-47": [
      {
        "text": "Learners arriving **up to about age eight** are often near-perfect and **native-like** on the grammaticality test. Later childhood arrival is associated with progressively lower accuracy. The early group therefore contains both a high-performing youngest range and a declining pattern farther into childhood.",
        "children": []
      },
      {
        "text": "Adult-arrival scores vary substantially without the same strong ordering by age. The description **“nearly random distribution”** concerns the weak relationship between adult arrival age and individual accuracy. It does not mean that late learners answer every sentence at chance.",
        "children": []
      },
      {
        "text": "Individual adults can differ greatly despite similar starting ages. The population pattern favors early learning, while the later range leaves more variation to explain. Age and score therefore relate differently in the early and late parts of the sample.",
        "children": []
      }
    ],
    "review-48": [
      {
        "text": "The **exercise hypothesis** proposes an early superior capacity for acquiring languages. If the capacity is not used during the favorable period, it declines or disappears with maturation. If used early, it remains available for learning additional languages throughout life.",
        "children": []
      },
      {
        "text": "The **maturational-state hypothesis** also proposes an early advantage. Its decline follows development even if the person successfully acquired a language in childhood. Early use does not permanently preserve the same learning state.",
        "children": []
      },
      {
        "text": "The accounts therefore predict different outcomes for someone with a normal early **L1**. Exercise predicts that early use protects the capacity for later languages. Maturational state allows successful L1 acquisition to coexist with reduced later L2-learning capacity. The difference concerns whether using the early ability prevents its later decline.",
        "children": []
      }
    ],
    "review-49": [
      {
        "text": "A **cohort competitor** shares the beginning of a spoken target. For **beaker**, **beetle** matches the early sounds, **speaker** overlaps at the ending, and **carriage** is unrelated. These alternatives receive useful matching information at different times.",
        "children": []
      },
      {
        "text": "In **Allopenna and colleagues’ (1994) task**, target and cohort looks rise early because the beginning fits both beaker and beetle. As later input distinguishes them, looks to the target continue increasing while cohort looks decline. **Rhyme competition** follows a different, later time course.",
        "children": []
      },
      {
        "text": "Spoken recognition therefore changes as matching and conflicting information arrives. Temporary support for a losing candidate can be visible before the final choice. The location of the sound overlap within the word helps determine when the competitor participates.",
        "children": []
      }
    ],
    "review-50": [
      {
        "text": "**Marian and Spivey** tested **cross-language cohort competition** in Russian–English bilinguals. English **speaker** begins similarly to Russian **спички, spichki**, meaning matches. During an English instruction, the picture of matches can receive support through its Russian name even though matches does not resemble speaker in English.",
        "children": []
      },
      {
        "text": "**Spear** provides an English within-language competitor. Displays can contain that competitor, the Russian-name competitor, or both. The arrangement separates competition within the task language from competition arising through the other language.",
        "children": []
      },
      {
        "text": "Other pairs are **boot with buben**, a tambourine, **chair with cherepaha**, a turtle, and **marker with marka**, a stamp. Looking toward one of those objects during English recognition connects the effect with its other-language form. The overlap is phonological, concerning the sound of the name, rather than similarity in the objects’ meanings.",
        "children": []
      }
    ],
    "review-51": [
      {
        "text": "During **L2 recognition**, a sole within-language competitor and a sole between-language competitor each attracted looks on about **18% of trials**. A Russian-name alternative could therefore compete while the participant was following English input. The final response language did not prevent all activation across languages.",
        "children": []
      },
      {
        "text": "When **both competitors** were present, within-language looks occurred on about **19% of trials** and between-language looks on about **13%**. The unrelated filler attracted looks on about **7%**. The two competitors had different strengths when directly available together.",
        "children": []
      },
      {
        "text": "Within-language competition was stronger in that combined display, but the cross-language object still attracted more looks than the control. The result concerns temporary activation during recognition. It does not require the participant to select the Russian-name object as the intended English target.",
        "children": []
      }
    ],
    "review-52": [
      {
        "text": "During **L1 Russian recognition**, a within-language competitor attracted looks on about **14% of trials when alone** and **13% when both competitors were present**. These rates exceeded looking to unrelated control objects. Native-language cohort competition was therefore present.",
        "children": []
      },
      {
        "text": "English-name competitors attracted looks on about **8%**, compared with a control rate near **5%**. That smaller difference was **not statistically significant**. The numerical trend alone did not establish the same reliable cross-language effect.",
        "children": []
      },
      {
        "text": "The reported interaction was **asymmetric**. L1 competitors clearly affected L2 recognition, while L2 competitors did not reliably produce the corresponding effect during L1 recognition. A model must account for the unequal directions rather than assume equally strong activation between the two vocabularies.",
        "children": []
      }
    ],
    "review-53": [
      {
        "text": "The **Revised Hierarchical Model**, associated with **Kroll and Stewart**, connects L1 words, L2 words, and shared concepts. **Spreading activation** means that activity in one representation can influence representations connected with it. A lexical connection joins words, while a conceptual connection links a word with meaning.",
        "children": []
      },
      {
        "text": "The **L1 lexicon** is larger and more strongly linked to concepts. A developing **L2 lexicon** has a stronger lexical route toward L1 than L1 has toward L2. Early learning emphasizes using an L1 counterpart to understand the new word.",
        "children": []
      },
      {
        "text": "Unequal connection strengths produce unequal cross-language effects. Activation can spread more readily from an L2 word to L1 than in the reverse direction. Both languages belong to one person, but the model does not assume their routes to words and meanings are identical in strength.",
        "children": []
      }
    ],
    "review-54": [
      {
        "text": "The **Revised Hierarchical Model of Kroll and Stewart (1990, 1994)** links the two lexicons with concepts through connections of different strengths. In the English **Marian and Spivey** task, a competing Russian word can become active and send support to the meaning associated with its object.",
        "children": []
      },
      {
        "text": "English **speaker** and Russian **spichki**, meaning **matches**, overlap in their beginning sounds. Their competition does not mean that speaker and matches have similar meanings. Activating the Russian word can instead strengthen the concept of matches and draw looking toward that picture.",
        "children": []
      },
      {
        "text": "**Feedback to conceptual activity** allows an unintended word candidate to reinforce the corresponding object representation. The final instructed target can remain speaker while matches temporarily competes for attention.",
        "children": []
      },
      {
        "text": "In an **L1 task**, the model’s weaker routes involving L2 make the reverse interference less reliable. The unequal eye-movement effects are explained through connection strengths and direction of activation. The two languages interact without every route being equally strong.",
        "children": []
      }
    ],
    "review-55": [
      {
        "text": "A **balanced bilingual** has relatively strong proficiency in both languages. The model does not predict that this person becomes **“two monolinguals in one.”** Strong conceptual connections can keep both lexical systems involved rather than isolating them.",
        "children": []
      },
      {
        "text": "**Competitive dynamics** means that activated alternatives influence which representation wins. **Inhibition** helps reduce alternatives that are inappropriate for the current task. These control demands can remain when both languages are highly proficient because the systems share concepts and interacting pathways.",
        "children": []
      },
      {
        "text": "This prediction motivated work on **nonlinguistic cognitive-control tasks**. The immediate model claim concerns interacting language representations and their competition. Equal proficiency does not mean that one language can always be processed with no influence from the other.",
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
