window.LING406_TRANSCRIPTS_V18 = {
  "revision": "ling406-transcripts-v18",
  "scripts": {
    "speech1-01": [],
    "speech1-02": [
      {
        "text": "**Speech perception** is the process of recovering a linguistic message from the sound of speech. Listeners take an acoustic signal that seems like a mess and pull out a message as clear as “I can see you.”",
        "children": [
          "In the acoustic signal for “I can see you,” the energy of each sound runs into the next, and nothing in the signal cleanly separates letters or even words.",
          "Real-time MRI of the **vocal tract**, from USC SPAN, reveals why. The tongue, lips and other articulators move without pause, and the movement for one sound overlaps the movement for the next, so their acoustic effects overlap as well."
        ]
      },
      {
        "text": "We also get **the same message from very different physical stimuli**. Voices and vocal tract sizes differ, so one word has different acoustic properties from each speaker, yet listeners hear the same word.",
        "children": [
          "Across 76 speakers, each of ten vowels covers a broad range of first and second formant values instead of a single point.",
          "Many of those ranges **overlap**, so one pair of formant values can be one vowel for one speaker and another vowel for a different speaker."
        ]
      },
      {
        "text": "Recognizing speech therefore means finding a **stable linguistic identity** inside enormous physical variation.",
        "children": []
      }
    ],
    "speech1-03": [
      {
        "text": "A working premise is that we must **turn a highly variable, analog signal into something more abstract** that the language system can use. An **analog signal** varies continuously, so frequency, loudness and timing can each shift by tiny amounts.",
        "children": [
          "A continuous signal has no built-in markers of where one speech sound stops and the next starts.",
          "Many small changes leave the speech sound the same, so two physically different productions can still be the same sound."
        ]
      },
      {
        "text": "The abstract form is a **symbolic representation**, which identifies a language unit such as a particular consonant or vowel and sets its fine physical detail aside. The unit is the **phoneme**, a sound category that distinguishes words in a language.",
        "children": [
          "/b/ in “bat” and /p/ in “pat” are different phonemes, because swapping them changes the word.",
          "Many slightly different acoustic versions of /b/ all count as one phoneme."
        ]
      },
      {
        "text": "**Categorical perception** is thought to reflect this **“translation” from physical to symbolic**. Listeners grow less sensitive to differences inside a category and more sensitive to equally large differences that cross a category boundary.",
        "children": [
          "A change stands out when it alters the identity the listener gives the sound.",
          "A change of the same physical size can pass almost unnoticed when both sounds remain the same phoneme. Categorical perception is one account of the translation, and other accounts exist."
        ]
      }
    ],
    "speech1-04": [
      {
        "text": "The **vocal tract** is the passage sound travels through in speech, from the larynx through the throat and mouth to the lips, and its shape changes as the tongue, jaw and lips move. Following Ladefoged (1996), the shape of the vocal tract is related in systematic ways to **which resonant frequencies get amplified**.",
        "children": [
          "A **resonant frequency** is one that a space naturally strengthens, so a tube of a given shape boosts some frequencies and dampens others.",
          "Changing the vocal tract’s shape changes which frequencies get the biggest boost."
        ]
      },
      {
        "text": "**Formants** are the resonant frequencies the vocal tract emphasizes, and every vowel has its own combination of them.",
        "children": [
          "Across **heed, hid, head and had**, the tongue moves from high and front toward low. Heed has its second formant far above its first, and the two draw closer through hid, head and had.",
          "Across **hod, hawed, hood and who’d**, the tongue moves back and the lips round more. The amplified frequencies gather at the low end, with the first and second formants close together.",
          "A vowel is defined by the **relationship among its resonances**, which stays similar across speakers even when the exact frequencies differ."
        ]
      },
      {
        "text": "A **formant transition** is a change in a formant’s frequency over time. As the mouth moves from a consonant into a vowel, the resonances glide from one set of values to another.",
        "children": [
          "The steady part of a vowel carries information about the vowel.",
          "The moving part carries information about how the neighboring sound is made."
        ]
      }
    ],
    "speech1-05": [
      {
        "text": "A **spectrogram** maps acoustic energy over time and frequency. Each vowel has several bands of strong energy, and these bands are its **formants**.",
        "children": [
          "The vowel recordings come from Rob Hagiwara’s English vowel samples."
        ]
      },
      {
        "text": "The words **bead, bid, bade, bed, bad, bod, baud, bode, “bood” and booed** all start with /b/ and end with /d/, so the differences between them come mainly from the vowels.",
        "children": [
          "**Bead** has a very low first formant and a very high second formant, so the two are far apart.",
          "Through bid, bade, bed and bad, the first formant rises and the second falls, so they move closer together.",
          "In the back rounded vowels such as **bode, “bood” and booed**, the second formant drops low and sits near the first."
        ]
      },
      {
        "text": "**F1** is the lowest formant and **F2** is the next one up, and both run through the whole vowel at once.",
        "children": [
          "The pattern of these two lowest formants carries most of what tells vowels apart.",
          "Bead pairs a low F1 with a high F2, while booed pairs a low F1 with a low F2."
        ]
      }
    ],
    "speech1-06": [
      {
        "text": "**Source-filter synthesis** builds speech sounds from two parts. The **source** is the sound energy the voice produces, and the **filter** is how the vocal tract shapes that energy. Pulling the two apart makes it possible to change one while the other stays fixed.",
        "children": [
          "The work is done in **Praat**, free speech analysis software from praat.org that displays recordings, measures formants and resynthesizes sounds."
        ]
      },
      {
        "text": "The recording is a speaker saying **/u/**, the vowel in “booed.” A **waveform** records changes in air pressure over time, and a **spectrogram** breaks the same sound into its frequency components.",
        "children": [
          "The waveform captures timing and loudness.",
          "The spectrogram captures the resonance pattern."
        ]
      },
      {
        "text": "This /u/ has its **first formant at about 300 Hz** and a **very low second formant, around 900 Hz**.",
        "children": [
          "Both resonances run together through the whole vowel.",
          "Low F1 and low F2 together fit the back rounded quality of /u/."
        ]
      },
      {
        "text": "If changing only the filter changes the vowel, the vowel’s identity must lie in the filter, its pattern of formants. These measured formants are the starting point for new filters.",
        "children": []
      }
    ],
    "speech1-07": [
      {
        "text": "**Praat can find formants automatically**. It follows each resonance through a recording and marks its frequency moment by moment, and in this recording of /u/ it identifies **five formants**.",
        "children": [
          "Several resonances run at the same time, each one a frequency component of the same sound.",
          "Automatic tracking measures the resonance pattern without anyone estimating frequencies by eye."
        ]
      },
      {
        "text": "**Only the first three formants are usually important for phonemic processing**. F1, F2 and F3 carry most of the information that separates phonemes, while higher formants depend more on the individual voice.",
        "children": [
          "The numbers give the order of the resonances from low to high, with F1 the lowest, F2 next and F3 third."
        ]
      },
      {
        "text": "The manipulation targets just **the first two formants**, which in this /u/ sit near 300 Hz and 900 Hz.",
        "children": [
          "Changing only these two is enough to turn one vowel into another, since they carry most of the vowel information.",
          "F3 and the higher formants stay fixed, so any change listeners hear comes from F1 or F2 alone."
        ]
      }
    ],
    "speech1-08": [
      {
        "text": "The **source** can be **extracted** from the recorded /u/. Praat models the filter from the measured formants and uses that model to strip the filter’s effect from the recording, leaving a **more-or-less “unfiltered” version of the voice**.",
        "children": [
          "What remains is the sound energy the vocal folds supplied.",
          "It is only more or less unfiltered, because the separation is an estimate."
        ]
      },
      {
        "text": "The extracted source **sounds like a buzz**. It keeps its energy and pitch but loses the resonance pattern that made it sound like /u/.",
        "children": [
          "Its energy is spread across many frequencies, without the strong low formants of /u/.",
          "Pitch survives because it comes from vocal fold vibration, and vowel quality vanishes because it comes from the filter."
        ]
      },
      {
        "text": "The separation is **a little bit like doing a multiple regression analysis**, where one predictor’s contribution is estimated and removed so the rest can be examined.",
        "children": [
          "Here the filter’s contribution is estimated and removed, and what is left is treated as the source.",
          "With the source isolated, new filters can be applied to it. Keeping one source while swapping filters makes the effect of the resonance pattern testable."
        ]
      }
    ],
    "speech1-09": [
      {
        "text": "Three **filters** can be applied to one source. A filter specifies which frequencies get more emphasis and which get less, so every filter is a resonance pattern.",
        "children": [
          "The **first filter** is simply the first four formants of the original /u/, so applying it should bring back the original vowel.",
          "The **second filter** raises **the first formant a little** and leaves the others roughly where they were.",
          "The **third filter** raises **the second formant a lot** and leaves F1 and the higher formants roughly in place."
        ]
      },
      {
        "text": "Each version changes one part of the resonance pattern instead of shifting every frequency together.",
        "children": [
          "In the original, F1 and F2 are both low, which fits /u/.",
          "Raising F1 moves only the lowest resonance up, and raising F2 moves only the second resonance up, by a much larger amount."
        ]
      },
      {
        "text": "The **sound source stays the same** for all three filters, so any change in vowel quality comes from the filter.",
        "children": [
          "No new speaker or recording is needed.",
          "Comparing the outputs isolates what a change in the lowest resonance does compared with a change in the second."
        ]
      }
    ],
    "speech1-10": [
      {
        "text": "**Multiplying the source by the filters gives new vowels**. In source-filter terms, the output is the source shaped by the filter, and each filter boosts a different set of frequencies, so each combination is a different vowel.",
        "children": [
          "The source provides the raw sound energy.",
          "The filter decides how much of that energy stays strong in each frequency region."
        ]
      },
      {
        "text": "One source and three filters give three results.",
        "children": [
          "With the **original filter**, F1 and F2 stay low and the result keeps the quality of /u/.",
          "With **F1 raised a little**, the lowest resonance rises and the vowel changes.",
          "With **F2 raised a lot**, the second resonance rises far and the vowel changes another way, moving the back rounded /u/ toward a more front vowel."
        ]
      },
      {
        "text": "**Source-filter synthesis** pulls apart two contributions that ordinary speech combines. The voice provides the sound, and the vocal tract resonances shape its quality.",
        "children": [
          "All three outputs share the same buzz, pitch and timing, yet they sound like different vowels.",
          "A researcher can change vowel quality by swapping only the filter, without asking a speaker to record each version."
        ]
      }
    ],
    "speech1-11": [
      {
        "text": "A speaker’s intended vowel only **partly** determines formant values. They are also shaped by **anatomical features** that differ between speakers of the same language, by **different rates of speech**, and by **context**, such as the phones before and after a vowel.",
        "children": [
          "**Anatomy** matters because vocal tracts vary in length and shape, and a longer tract gives lower resonances overall.",
          "**Speaking rate** matters because fast speech gives the articulators less time to reach their targets.",
          "**Context** matters because the tongue and lips are already heading toward the next sound or leaving the previous one. A **phone** is one particular spoken realization of a speech sound."
        ]
      },
      {
        "text": "Across 76 speakers, each of ten vowels covers a wide range of formant values, and those ranges overlap.",
        "children": [
          "The same F1 and F2 values can be different vowels for different speakers.",
          "No single pair of frequencies defines a vowel for everyone."
        ]
      },
      {
        "text": "Formant values **nonetheless** give a pretty good description of **vowel space**, especially for **a specific talker speaking carefully**. Vowel space is the layout of a language’s vowels by their formant frequencies.",
        "children": [
          "Within one careful talker, the vowels separate far more cleanly than across many talkers.",
          "All else being equal, **reasonable approximations of vowels** can be made **by manipulating steady-state formants**. A **steady-state formant** is the resonance in the stable middle of a vowel, as opposed to the transitions at its edges."
        ]
      }
    ],
    "speech1-12": [
      {
        "text": "The **pattern playback synthesizer** turns a painted spectrographic pattern back into sound. Researchers paint bands on a transparent sheet wherever they want acoustic energy in time and frequency, and the machine plays the pattern aloud.",
        "children": [
          "Changing the painting changes the sound.",
          "Researchers could therefore build controlled, speech-like sounds instead of relying on natural recordings that vary in many uncontrolled ways."
        ]
      },
      {
        "text": "The machine works by shining light through the painted pattern.",
        "children": [
          "Light passes through a **cylindrical lens** onto a spinning **tone wheel**, whose rings modulate the light at many frequencies at once.",
          "A lens and **mirror** send that light onto the painted **spectrogram**, and the painted areas pass along the matching frequencies.",
          "A **light collector** and **photocell** turn the light into an electrical signal, and an **amplifier** and **loudspeaker** turn that signal into sound."
        ]
      },
      {
        "text": "A researcher can alter a single formant band or transition and hear the result right away.",
        "children": [
          "Every other part of the pattern stays exactly the same.",
          "Any change in what listeners hear can be traced to the one painted change. Series of patterns differing in tiny steps revealed how formant transitions signal consonants."
        ]
      }
    ],
    "speech1-13": [
      {
        "text": "**Stop consonants are distinguished by formant transitions**. **/b/, /d/ and /g/** are made by briefly closing the vocal tract and then opening it, and the audible part of each happens **while the jaw is opening**.",
        "children": [
          "During that opening, the vocal tract changes shape quickly.",
          "The changing shape makes the formants glide from the consonant’s position toward the vowel’s, so the consonant’s identity lies in how the formants move."
        ]
      },
      {
        "text": "**Liberman and colleagues (1957)** used the **pattern playback synthesizer** to build speech-like sounds that copied these transitions. Each pattern had two formants.",
        "children": [
          "The **lower formant** was nearly the same in every stimulus.",
          "The **upper formant** started at a different frequency in each stimulus and then settled at the same steady vowel level.",
          "In some stimuli it started low and **rose** into the vowel, in others it was nearly **flat**, and in others it started high and **fell** into the vowel."
        ]
      },
      {
        "text": "The fourteen patterns kept the vowel the same and changed only where the upper transition began.",
        "children": [
          "A rising transition was heard as /b/, a roughly flat one as /d/ and a falling one as /g/.",
          "Since only the transition differed, listeners’ responses could be tied directly to it."
        ]
      }
    ],
    "speech1-14": [
      {
        "text": "A **speech continuum** is a series of sounds that change step by step along one controlled acoustic property. In this one, **F1 is kept constant** and the **F2 onset frequency** is **varied linearly** from stimulus 1 to stimulus 13. The **F2 onset frequency** is where the second formant begins its transition.",
        "children": [
          "Holding F1 constant removes one possible difference between stimuli.",
          "Varying the F2 onset **linearly** means it changes by the same step every time, so **adjacent stimuli differ by the same amount across the entire continuum**."
        ]
      },
      {
        "text": "The F2 transition shifts gradually along the series.",
        "children": [
          "Early on, F2 starts well below the vowel frequency, so it rises.",
          "As the onset climbs, the rise shrinks until the transition is nearly flat.",
          "Later, F2 starts above the vowel frequency and falls."
        ]
      },
      {
        "text": "Because every step is physically equal, the continuum fairly tests whether perception follows the acoustics or the categories.",
        "children": [
          "Some neighboring pairs fall inside one consonant category, and others straddle a boundary.",
          "A purely acoustic listener would hear every step as the same size.",
          "If perception is categorical, steps within a category will sound alike and steps across a boundary will sound different, so any advantage for boundary pairs comes from the boundary itself."
        ]
      }
    ],
    "speech1-15": [
      {
        "text": "An **ideal observer model** predicts how a listener would respond if perception worked according to a particular account. This version assumes that perception is **non-categorical**. It tracks the acoustic signal gradually, with no sharp category boundaries.",
        "children": [
          "The model is a baseline. Real data can be compared against it to see whether perception is more categorical than a gradual account allows."
        ]
      },
      {
        "text": "The first prediction is that **categorization gets “blurry” as you move away from category prototypes**. A **prototype** is the clearest example of a category. The endpoints of the continuum are /b/ and /g/, with /d/ in the middle.",
        "children": [
          "Between two prototypes, **stimulus ambiguity scales with the distance from the prototype**. The farther a stimulus is from the /b/ prototype, the less /b/-like it sounds and the more /d/-like it sounds.",
          "**Stimulus 2** would be heard as **75% /b/ and 25% /d/**. It sits a quarter of the way from the /b/ prototype toward the /d/ prototype, so the responses split in that same proportion."
        ]
      },
      {
        "text": "Under this account, **labeling** changes smoothly. Responses for one category fade out in a straight slope while responses for the neighboring category fade in.",
        "children": [
          "Two neighboring labels are equally likely halfway between their prototypes.",
          "Every change is gradual, with no sudden step from one label to the next."
        ]
      }
    ],
    "speech1-16": [
      {
        "text": "The same ideal observer can also assume that perception is **linear**, so equal acoustic differences are perceived as equally large. This leads to a second prediction. **Discrimination performance should be independent of labeling**.",
        "children": [
          "**Labeling** asks a listener to identify a sound as /b/, /d/ or /g/.",
          "**Discrimination** asks only whether two sounds are the **same or different**. These are separate tasks, even when they use the same continuum."
        ]
      },
      {
        "text": "Labeling **has to have a “peaked” function**. There are three categories, and listeners are choosing between labels, so each category’s responses rise toward its prototype and fall away from it. These peaks come from the structure of the labeling task itself.",
        "children": []
      },
      {
        "text": "Discrimination works differently under the linear account. Pairs are compared two steps apart, from **1 vs. 3** through **9 vs. 11**, and every pair has the same physical separation.",
        "children": [
          "If listeners perceived differences in F2 onset equally well across the whole continuum, every pair would be equally easy to tell apart.",
          "Discrimination would then stay level everywhere, even where labeling changes. A flat pattern would mean category boundaries play no role in hearing differences. A peaked pattern would mean the boundaries make some differences easier to hear."
        ]
      }
    ],
    "speech1-17": [
      {
        "text": "**Liberman and colleagues (1957)** measured actual labeling and discrimination along the /b/–/d/–/g/ continuum. Their results departed sharply from the non-categorical, linear predictions.",
        "children": [
          "Listeners labeled each stimulus and also judged pairs of stimuli as same or different.",
          "The pairs were **one step**, **two steps** or **three steps** apart."
        ]
      },
      {
        "text": "Labeling showed **sharp changes** in identification. The first few stimuli were heard as /b/ almost every time. Over just a step or two, responses switched almost completely to /d/, and later they switched again, just as quickly, to /g/.",
        "children": [
          "These switches are far more abrupt than the gradual slopes the ideal observer predicted.",
          "The narrow region where the label flips is the **category boundary**."
        ]
      },
      {
        "text": "**Listeners were best at discriminating sounds near the category boundaries**.",
        "children": [
          "Accuracy peaked at the /b/–/d/ boundary and again at the /d/–/g/ boundary.",
          "Pairs inside one category were discriminated poorly, close to **chance**, the level expected from guessing.",
          "Larger steps raised accuracy overall, but the peaks stayed at the boundaries."
        ]
      },
      {
        "text": "Liberman and colleagues also predicted discrimination from the labeling data, assuming listeners can tell two sounds apart only when they give them different labels. The predictions captured much of the real pattern.",
        "children": [
          "Real accuracy was often a little higher than predicted, especially within categories.",
          "Listeners therefore keep some sensitivity to acoustic differences beyond the category labels alone."
        ]
      }
    ],
    "speech1-18": [],
    "speech1-19": [
      {
        "text": "Class data from prior years tested categorical perception along a **beach–peach** continuum. The two words differ in their first consonant, /b/ versus /p/. Each listener completed an **identification** task, labeling every stimulus, and a **discrimination** task, judging pairs two steps apart.",
        "children": []
      },
      {
        "text": "For the first listener, identification stays on one word for the early stimuli and then **switches to the other word** around the middle of the continuum.",
        "children": [
          "Responses are mixed only in a small region near the switch.",
          "The acoustic change is gradual, but the label changes within a narrow region."
        ]
      },
      {
        "text": "That listener discriminates best for the pairs that straddle the identification boundary.",
        "children": [
          "Pairs well inside one category are hard to tell apart, even though their physical separation is the same.",
          "A pair that includes a stimulus with mixed labels falls in between."
        ]
      },
      {
        "text": "The second listener **switches word labels later** along the continuum and discriminates best near that later boundary.",
        "children": [
          "Different people can place their category boundaries at different points.",
          "For each listener, the best discrimination falls close to that person’s own identification boundary."
        ]
      }
    ],
    "speech1-20": [
      {
        "text": "The class data support a few general points. **Not everyone has exactly the same category boundary**, so a sound near the beach–peach boundary for one listener can fall squarely inside a category for another.",
        "children": [
          "A pair that straddles one person’s boundary may stay inside one category for someone else.",
          "When individual boundaries differ, averaging across the group can flatten the boundary peak."
        ]
      },
      {
        "text": "**In general, discrimination is best for stimuli perceived as being in different categories**.",
        "children": [
          "Listeners may miss a physical difference between two versions of the same phoneme.",
          "The same size of difference becomes far easier to hear when the two sounds are heard as different words."
        ]
      },
      {
        "text": "To fit the lab into a short session, the discrimination test used **only “different” trials**, so every pair held two physically different stimuli.",
        "children": [
          "The correct answer was always **“different,”** provided the listener could tell the sounds apart.",
          "Answering “same” meant missing a real difference.",
          "Accuracy is the share of pairs heard as different. Someone who always said different would score perfectly, so low accuracy on within-category pairs means listeners often failed to hear differences that were really there."
        ]
      }
    ],
    "speech1-21": [
      {
        "text": "Further class results compare a **bear–pear** continuum with the **beach–peach** continuum.",
        "children": [
          "For bear–pear, identification switches fairly clearly from one word to the other. Discrimination, however, jumps up and down from one pair to the next, including a miss on a pair that crosses the boundary.",
          "Another listener’s beach–peach data fluctuate even more. Identification zigzags instead of switching once, and discrimination bounces between high and low values."
        ]
      },
      {
        "text": "The one iron-clad law of experimental research is that **stuff happens**. Responses to a carefully built continuum can still bounce around.",
        "children": [
          "Identification records which word a listener chooses, while discrimination records whether a difference is detected. These two behaviors can vary in different ways across trials and people.",
          "An isolated rise or drop in discrimination reflects noise in a few responses."
        ]
      },
      {
        "text": "The data raise the question of how the experiment could be improved.",
        "children": [
          "Only “different” trials were used, so there was no measure of how often listeners said “different” when the sounds were identical.",
          "A short session gave each listener few trials per pair, so a single response could move accuracy a great deal.",
          "The real test is whether better discrimination lines up with the place where identification changes, across the whole continuum."
        ]
      }
    ],
    "speech1-22": [
      {
        "text": "The central question is **how categorical perception would help**, or **what is the advantage of being worse at hearing some differences between sounds**? Being worse at within-category differences can seem like throwing away useful detail.",
        "children": []
      },
      {
        "text": "The payoff is **stable word recognition**. Every production of a phoneme differs physically from every other, because of speakers, speaking rates and neighboring sounds.",
        "children": [
          "If each small acoustic change were heard as a new identity, everyday versions of one word would sound like unrelated sounds.",
          "Reduced sensitivity within a category lets many acoustic versions count as one phoneme."
        ]
      },
      {
        "text": "Differences between categories stay easy to hear, so the distinctions that change words are kept.",
        "children": [
          "Variation inside a category is tolerated because it leaves the word unchanged.",
          "Ignoring small within-category differences frees the listener to focus on the differences that change meaning."
        ]
      }
    ],
    "speech1-23": [],
    "speech1-24": [
      {
        "text": "**Categorical perception in infants** can be tested even though infants cannot name sounds. Researchers watch for a behavior that changes when an infant notices something new, since infants react to novelty.",
        "children": [
          "In the **conditioned head turn procedure**, from Janet Werker’s infant studies lab, an infant learns to turn toward a sound when it changes, and a correct turn earns an interesting visual reward such as a moving toy.",
          "After the infant learns this link, a head turn following a change means the infant detected the change."
        ]
      },
      {
        "text": "The results of interest here come from **high-amplitude sucking**. The infant sucks on a pacifier attached to a recorder, and strong sucks make a sound play.",
        "children": [
          "As the same sound repeats, the infant grows used to it, which is **habituation**, and sucking slows.",
          "If a new sound makes sucking **increase again**, the infant has noticed the change."
        ]
      },
      {
        "text": "Both methods make perception testable before an infant can talk.",
        "children": [
          "The experimenter controls exactly which sound difference is presented.",
          "A head turn or renewed sucking reveals sensitivity to that difference without any labeling, even in infants who are months from saying words."
        ]
      }
    ],
    "speech1-25": [
      {
        "text": "**Eimas and colleagues (1971)** tested categorical perception in **4-month-old infants** using **high-amplitude sucking**. The sounds varied in **voice onset time**, or **VOT**, which is the delay between the release of a consonant and the start of vocal fold vibration.",
        "children": [
          "Adults hear a short VOT as a voiced consonant such as /b/ and a longer VOT as a voiceless consonant such as /p/.",
          "In a syllable with a long VOT, voicing begins much later after the release."
        ]
      },
      {
        "text": "Infants heard one synthetic syllable over and over until their sucking slowed down. Then the sound either changed or stayed the same.",
        "children": [
          "In condition **20D**, the VOT changed from **+20 to +40 milliseconds**. This 20-millisecond change **crossed** the adult boundary between two consonant categories.",
          "In condition **20S**, the VOT also changed by **20 milliseconds**, but both sounds came from the **same** adult category, such as **−20 and 0** or **+60 and +80**.",
          "In condition **0**, the control group kept hearing the same sound."
        ]
      },
      {
        "text": "In every group, sucking rose at first and then dropped as the sound became familiar.",
        "children": [
          "After a change across the category boundary, sucking **recovered** sharply.",
          "After a change within one category, sucking kept falling with little recovery, much like the control group."
        ]
      },
      {
        "text": "The two changed conditions were matched at 20 milliseconds, so the difference comes from crossing the boundary. Infants noticed a change that adults would hear as a new consonant, but not an equally large change inside one category. Even at four months, infants perceive voicing categorically.",
        "children": []
      }
    ],
    "speech1-26": [
      {
        "text": "**Perceptual narrowing** is the process in which experience tunes perception to the sounds of the surrounding language. Sensitivity to some distinctions from other languages declines along the way. **Werker and Tees** tested how age and experience affect infants’ ability to discriminate two **non-English contrasts**.",
        "children": [
          "The **Hindi contrast** is a distinction between two “ta”-like sounds that English does not use.",
          "The **Salish contrast** is a distinction between “ki” and “qi” in Nthlakampx, a Salish language, which English also does not use."
        ]
      },
      {
        "text": "The measure was the share of infants who reached a **discrimination criterion** at each age.",
        "children": [
          "At **6–8 months**, most English-learning infants discriminated both contrasts, nearly all of them for Hindi.",
          "At **8–10 months**, fewer succeeded, roughly two thirds for Hindi and half for Salish.",
          "At **10–12 months**, very few succeeded, about one in five for Hindi and one in ten for Salish.",
          "**Hindi- and Salish-learning infants** discriminated the contrast from their own language nearly every time."
        ]
      },
      {
        "text": "These results are described as **perceptual reorganization during the first year of life**.",
        "children": [
          "Young infants can detect these nonnative contrasts.",
          "With experience of English, English-learning infants become much less likely to discriminate them by about their first birthday.",
          "Infants who hear the contrast in their own language keep it, so the decline depends on language experience. Contrasts the language uses are kept, and contrasts it lacks become hard to hear."
        ]
      }
    ],
    "speech1-27": [
      {
        "text": "These findings feed **a very compelling narrative** about speech perception, built from three linked claims.",
        "children": [
          "First, speech perception depends on **categorical perception abilities that are a special property of the language system**, so the mechanism that sorts sounds into categories is specialized for language.",
          "Second, these abilities are **present very early in development**, as the infant sucking and head-turn experiments suggest, long before children talk."
        ]
      },
      {
        "text": "Third, children **start off as “citizens of the world,”** able to hear **all** speech contrasts, and then **rapidly tune their perceptual systems to their specific language**.",
        "children": [
          "As “citizens of the world,” infants could learn any human language and are ready to hear the distinctions of every one.",
          "Tuning means the contrasts of the surrounding language stay available while contrasts from other languages fade, as in the Werker and Tees results."
        ]
      },
      {
        "text": "The narrative covers both the **starting state** and **developmental change**.",
        "children": [
          "It proposes broad, language-specific abilities at birth.",
          "It treats development mostly as narrowing from that broad start.",
          "Each early result seems to fit, since infants discriminate categorically before talking, hear contrasts from many languages and lose nonnative contrasts with experience."
        ]
      }
    ],
    "speech1-28": [
      {
        "text": "The compelling narrative meets **some issues**, three of them about **categorical perception**.",
        "children": [
          "Categorical perception is **not limited to language**, since it also shows up with nonspeech sounds, which undercuts the claim that it is special to language.",
          "Categorical perception is **not limited to humans**, since nonhuman animals also perceive speech sounds categorically, which undercuts the claim that it is special to humans.",
          "Categorical perception is **task-dependent**. Results look more or less categorical depending on the task, and choosing between labels makes responses more categorical than a task that measures fine acoustic differences."
        ]
      },
      {
        "text": "Another issue concerns **infant speech perception**, which is **not actually “universal.”**",
        "children": [
          "Some contrasts are harder for infants to detect than others from early on.",
          "Development therefore includes initial differences in sensitivity as well as changes driven by experience."
        ]
      },
      {
        "text": "Together, these issues weaken the strong claim that every speech distinction starts out equally available in a mechanism devoted only to language.",
        "children": []
      }
    ],
    "speech1-29": [
      {
        "text": "**Cutting and Rosner (1974)** tested categorical perception with **non-speech sounds**. The sounds varied in **rise time**, which is how quickly a sound reaches full loudness after it begins.",
        "children": [
          "A sound with a **rapid rise time** sounds **plucked**, like a plucked string.",
          "A sound with a **slow rise time** sounds **bowed**, like a bowed string."
        ]
      },
      {
        "text": "The stimuli included **sawtooth waves**, **sine waves** and **speech syllables**, each made with short and long rise times, such as **10** and **70 milliseconds**.",
        "children": [
          "With a short rise, the sound reaches full strength almost at once.",
          "With a long rise, it builds up gradually.",
          "Pluck and bow are labels for two kinds of sound onset, not speech sounds."
        ]
      },
      {
        "text": "For the sawtooth waves, listeners labeled short rise times as pluck and long rise times as bow. The label switched over a narrow range in the middle of the continuum.",
        "children": [
          "Discrimination was only a little above chance for most pairs.",
          "It **peaked** for the pairs near the middle, right where the labels switched."
        ]
      },
      {
        "text": "The link between a label boundary and better discrimination therefore appears for a sound distinction that has nothing to do with language. The physical continuum is gradual, yet the preferred label changes over a narrow region, and discrimination improves there.",
        "children": []
      }
    ],
    "speech1-30": [
      {
        "text": "**Jusczyk and colleagues (1977)** tested whether **infants** show categorical perception of **non-speech sounds**. They used high-amplitude sucking to measure whether a change in sound was detected.",
        "children": [
          "Infants heard one sound repeatedly until their sucking declined.",
          "The sound was then shifted, and the change was compared across three conditions."
        ]
      },
      {
        "text": "The three conditions were **no change**, a change **within categories** and a change **between categories**.",
        "children": [
          "In every condition, sucking declined before the shift as the sound became familiar.",
          "After **no change**, sucking stayed low.",
          "After a **within-category** change, sucking also stayed low.",
          "After a **between-category** change, sucking jumped back up and then declined again as the new sound became familiar."
        ]
      },
      {
        "text": "Infants responded more strongly to a non-speech change that crossed a category boundary than to a change within a category.",
        "children": [
          "This mirrors the pattern Eimas and colleagues found for speech.",
          "Infants cannot be drawing on knowledge of words or phonemes when they respond to plucked and bowed sounds. Their categorical response must come from more general auditory processing, which could also underlie their categorical response to speech."
        ]
      }
    ],
    "speech1-31": [
      {
        "text": "Categorical perception of speech sounds has also been found in **chinchillas**, following **Ohlemiller and colleagues (1999)** and the earlier work of **Kuhl and Miller (1975)**. The animals were trained with **operant conditioning**, a form of learning in which consequences change how often a behavior occurs.",
        "children": [
          "Each chinchilla learned that either the **0-millisecond lag** sound or the **80-millisecond lag** sound was an **SD** for food. **SD** stands for **discriminative stimulus**, a signal that a response will be rewarded.",
          "The lag is **voice onset time**. Humans hear a 0-millisecond lag as /ga/ and an 80-millisecond lag as /ka/."
        ]
      },
      {
        "text": "After training, the chinchillas were tested with sounds in between, all along the **/ga/–/ka/** continuum. Human listeners were tested on the same sounds.",
        "children": [
          "Short VOTs were labeled /ga/ almost every time, and long VOTs almost never.",
          "The switch happened over a fairly narrow range of VOTs, and the chinchilla curves had the same steep, categorical shape as the human curves."
        ]
      },
      {
        "text": "The study also varied the **burst** and **aspiration noise**. The **burst** is the brief noise at the release of a stop consonant, and **aspiration** is the breathy noise that follows a voiceless release.",
        "children": [
          "Making the burst and aspiration louder shifted the boundary toward shorter VOTs, made the switch steeper, or both.",
          "This happened for one chinchilla and for one human listener, so both species responded to these sound properties in a similar way.",
          "Animals without human language can sort a speech continuum into categories. This argues against the view that categorical perception is special to human language."
        ]
      }
    ],
    "speech1-32": [
      {
        "text": "Some speech contrasts are **less salient than others** for infants. A **salient** contrast is one that is easy to notice.",
        "children": [
          "The contrasts tested here differ in **place of articulation**, which is where in the mouth a sound is made.",
          "In **[ma]**, the nasal is made with the lips. In **[na]**, it is made with the tongue near the ridge behind the teeth. In **[ŋa]**, which begins with the sound at the end of “sing,” it is made with the back of the tongue against the soft palate."
        ]
      },
      {
        "text": "Researchers compared infants’ **looking time** on **same** trials, where the syllable stayed the same, and **change** trials, where it switched. Longer looking on change trials means the infant noticed the change.",
        "children": [
          "At **4–5 months**, English-hearing infants looked clearly longer on change trials for the native **[ma]–[na]** contrast.",
          "For the nonnative **[na]–[ŋa]** contrast, looking was about the same on both kinds of trials. These infants did not detect this change, and English never uses [ŋ] at the start of a syllable."
        ]
      },
      {
        "text": "**Filipino-learning infants** hear [na]–[ŋa] as a contrast in their own language.",
        "children": [
          "At **6–8 months**, they also looked about equally on both kinds of trials, so they did not yet detect the change.",
          "By **10–12 months**, they looked longer on change trials."
        ]
      },
      {
        "text": "Some contrasts therefore start out hard for infants to hear, even when they belong to the native language. Experience with the language **strengthens** sensitivity to such contrasts over the first year, so development includes gains as well as losses.",
        "children": []
      }
    ],
    "speech2-01": [],
    "speech2-02": [
      {
        "text": "**Klatt (1979)** describes a very old and very general model of speech perception, in which recognition runs through a series of stages and each stage transforms the output of the one before.",
        "children": [
          "The **speech waveform** enters the **peripheral auditory system**, which carries out a **spectral analysis**, as the **cochlea** in the inner ear splits the sound into its frequency components.",
          "**Acoustic property detectors** respond to particular properties of the sound, and their outputs change over time.",
          "**Phonetic feature detectors** use those outputs to estimate the probability of features such as voicing at each moment.",
          "**Segmental analysis** combines features into a sequence of speech segments, a **segmental feature matrix**.",
          "**Lexical search** compares that sequence with stored words and yields **lexical hypotheses**, candidate words that might match."
        ]
      },
      {
        "text": "Categorical perception fits this model. Somewhere between the **analog signal** leaving the cochlea and the **activation of phonemes** in segmental analysis, **information is lost**, and many physically different sounds become the same phoneme.",
        "children": [
          "This **loss of information is helpful**, since a shared phoneme sequence can be matched directly against stored words at higher levels.",
          "It follows that **in order to identify words, we need to first identify their constituent phonemes**."
        ]
      },
      {
        "text": "Two problems challenge this simple picture.",
        "children": [
          "**Cascaded processing**, in which partial information moves on to the next level before the earlier decision is complete.",
          "**Feedback**, in which a higher level, such as words, sends influence back down to a lower level, such as phonemes."
        ]
      }
    ],
    "speech2-03": [
      {
        "text": "The **beach–peach** continuum is a familiar **voicing continuum**. The words differ in their first consonant, /b/ in beach and /p/ in peach. These consonants differ mainly in **voice onset time**, or **VOT**, which is the delay between the release of the lips and the start of vocal fold vibration.",
        "children": [
          "Along the continuum, VOT gets shorter in equal steps.",
          "A long delay before voicing sounds like peach, and a short delay sounds like beach."
        ]
      },
      {
        "text": "One listener’s **identification** results have a sharp, step-like shape.",
        "children": [
          "The early stimuli are labeled as one word every time, and the late stimuli as the other word every time.",
          "Only one stimulus near the middle gets mixed labels.",
          "The **category boundary** is the narrow region where the preferred label switches."
        ]
      },
      {
        "text": "The same listener’s **discrimination** results follow the boundary.",
        "children": [
          "Pairs inside one category are almost never heard as different.",
          "Pairs that straddle the boundary are heard as different every time.",
          "Equal changes in VOT are much easier to detect across the boundary, where they change the word, than inside one category, where the word stays the same."
        ]
      }
    ],
    "speech2-04": [
      {
        "text": "**How does categorical perception happen?** One answer is a **threshold model**. In a threshold model, **activity is only passed forward from one level to the next when an activity threshold is crossed**.",
        "children": [
          "A **threshold** is a set level of activity that must be reached before anything is sent onward.",
          "Activity below the threshold can rise and fall without any effect on the next level."
        ]
      },
      {
        "text": "In this kind of model, **categorical perception arises at phoneme identification**. Consider the voicing evidence for a sound between /b/ and /p/.",
        "children": [
          "At the feature level, the voicing evidence swings up and down over time, between a **+voiced** threshold and a **−voiced** threshold.",
          "At the phoneme level, nothing happens while the evidence wavers below threshold. Both /b/ and /p/ stay silent.",
          "Only when the evidence finally crosses the +voiced threshold does **/b/** switch on, all at once."
        ]
      },
      {
        "text": "An ambiguous sound with mixed responses either crosses a threshold or does not.",
        "children": [
          "The word level receives a finished /b/ or a finished /p/, and the history of uncertainty stays behind at the feature level.",
          "Two acoustically different sounds that both end up as /b/ become identical by the time they reach word recognition.",
          "This all-or-none switch would produce categorical perception directly at the phoneme level."
        ]
      }
    ],
    "speech2-05": [
      {
        "text": "A **cascaded model** gives a different answer. In it, **activity is passed forward continuously over time from one level to the next**, and each level responds to whatever activity exists at the moment, while decisions are still forming.",
        "children": []
      },
      {
        "text": "Feature activity and phoneme activity rise and fall together.",
        "children": [
          "As evidence for +voiced grows, **/b/** activation grows.",
          "As the evidence shifts toward −voiced, activation moves toward **/p/**.",
          "The phoneme level tracks the feature level continuously."
        ]
      },
      {
        "text": "In such a model, **categorical perception might happen later on, or might even be an artifact of the task structure**. An **artifact** is a result created by the way something is measured instead of by the process under study.",
        "children": [
          "An identification task forces a listener to click beach or peach, even if both words were partly active.",
          "The answer looks categorical because the choices are categorical.",
          "Two sounds that both end up labeled /b/ can still differ in how much they supported /p/ along the way."
        ]
      },
      {
        "text": "When voicing evidence is mixed, /b/ and /p/ each get activation in proportion to their evidence.",
        "children": [
          "Graded phoneme activation passes graded activation to words, so a sound near the boundary partly activates both beach and peach.",
          "Processing before the final choice keeps fine-grained information about how ambiguous the sound was."
        ]
      }
    ],
    "speech2-06": [
      {
        "text": "**Making furniture** works as a metaphor for **thresholded activity**, where each operation turns one specific input into one specific output.",
        "children": [
          "A **lumber mill** turns **trees** into **lumber**.",
          "A **furniture factory** turns **lumber** into **unassembled furniture**.",
          "An **IKEA customer** turns **unassembled furniture** into finished **furniture**."
        ]
      },
      {
        "text": "Each step needs a finished product in a form it can use. Trees must become lumber before furniture is made, and lumber must become parts before assembly starts.",
        "children": [
          "**Thresholded processing** depends on its inputs the same way, with a higher level waiting until the lower level delivers the required representation.",
          "Information moves forward only as a completed product."
        ]
      }
    ],
    "speech2-07": [
      {
        "text": "In the furniture metaphor, each **“layer”** **can only take a specific input that has been transformed completely by the previous layer**, so manufacturing waits until the lumber shipment arrives. Many computer programs run this way.",
        "children": [
          "Each stage does its own transformation and hands on only its finished output.",
          "A lower stage can keep working while the higher stage sits idle, waiting for a finished product."
        ]
      },
      {
        "text": "In speech recognition, a strict threshold account makes **word processing depend on an identified phoneme**.",
        "children": [
          "A partly resolved acoustic signal stays at the lower level until it is identified as a phoneme.",
          "The word level receives only the finished segment."
        ]
      },
      {
        "text": "This design also decides **what information is lost**.",
        "children": [
          "When different sounds become the same phoneme, their earlier differences never reach word recognition.",
          "That helps treat varied sounds alike, but later stages never learn how uncertain the earlier stages were."
        ]
      }
    ],
    "speech2-08": [
      {
        "text": "A **food web** works as a metaphor for **cascaded processing**, because its **“levels” continuously interact with one another**. A desert food web links **desert plants**, **insects**, **kangaroo rats**, **small lizards**, **large lizards**, **scorpions**, **snakes**, **desert foxes** and **hawks** by who eats whom.",
        "children": [
          "A drought that cuts back the plants **immediately** affects the health of kangaroo rats.",
          "The change in kangaroo rats then affects the snakes that eat them, and so on up the web.",
          "No population waits for the level below to reach a finished state."
        ]
      },
      {
        "text": "**Cascaded processing** has the same continuous dependence.",
        "children": [
          "Shifting feature evidence changes phoneme activity as it happens.",
          "Shifting phoneme activity changes support for words, so each level reacts to partial information as it arrives."
        ]
      },
      {
        "text": "The food web also has clear **feedback loops**. More hawks change the numbers of snakes, lizards and rats, and those changes in turn affect the hawks’ food supply.",
        "children": [
          "In a recognition model, **feedback** is influence traveling from a higher level back down to a lower one.",
          "Cascading and feedback are different ideas. Cascading sends developing evidence forward, and feedback lets higher-level activity change an earlier representation."
        ]
      }
    ],
    "speech2-09": [
      {
        "text": "The central question is whether **phoneme identification for word recognition** works like **thresholded processing**, the lumber mill, or like **cascaded processing**, the food web.",
        "children": [
          "In a **thresholded account**, word recognition starts only once a phoneme decision is complete.",
          "In a **cascaded account**, a word can gather support while the phoneme is still uncertain."
        ]
      },
      {
        "text": "The two accounts differ in how much developing acoustic evidence reaches candidate words.",
        "children": [
          "Two sounds can both be labeled **/b/** and still differ in how much they resemble **/p/**.",
          "A thresholded system turns both into the same finished /b/, so pear should not compete with bear.",
          "A cascaded system passes along more /p/ support for the more ambiguous sound, so pear should compete with bear for a while."
        ]
      },
      {
        "text": "Both accounts can predict the same final word. They part ways before the final choice, so the deciding test measures temporary support for a competing word during recognition.",
        "children": []
      }
    ],
    "speech2-10": [
      {
        "text": "**McMurray, Tanenhaus, Aslin and Spivey (2003)** tested the question in **probabilistic constraint satisfaction at the lexical/phonetic interface**, in the Journal of Psycholinguistic Research. They searched for **gradient effects of within-category VOT on lexical access**. **Lexical access** is retrieving a word from memory during recognition.",
        "children": [
          "**Gradient** means changing by degrees.",
          "**Within-category VOT** means differences in voice onset time among sounds all heard as the same phoneme."
        ]
      },
      {
        "text": "Listeners identified sounds from a **/b/–/p/ continuum** in a **“visual world” display** while **eye-tracking** recorded where they looked among pictures.",
        "children": [
          "Each display had a **target** such as **pear**, a **competitor** such as **bear**, and two unrelated **fillers**, a **lamp** and a **ship**.",
          "Target and competitor differ only in their first consonant."
        ]
      },
      {
        "text": "Eye movements are fast and continuous during word recognition, and listeners look at objects as they think about them, often before they know they have decided.",
        "children": [
          "A listener may end up choosing bear after a quick look at the pear.",
          "How often and when such looks happen measures how active the competitor was before the final click."
        ]
      }
    ],
    "speech2-11": [
      {
        "text": "Participants used the **mouse to select the picture** that best matched what they heard, such as a **“bear”** or a **“pear,”** in the same way as a bear–pear task done at home.",
        "children": [
          "Each trial presented one sound from the VOT continuum along with the four pictures.",
          "The click records which word the listener finally settled on."
        ]
      },
      {
        "text": "The clicks produced a **typical, step-like identification function**.",
        "children": [
          "Short VOTs were almost never heard as pear, and long VOTs almost always were.",
          "The switch happened abruptly at a **category boundary** of about **17.5 milliseconds**, with very little variation."
        ]
      },
      {
        "text": "Judged by the clicks alone, perception looks fully categorical. A sound well inside the /b/ category and a sound just short of the boundary both produce bear nearly every time.",
        "children": [
          "On its own, this sharp shift in labels would seem to support the threshold model.",
          "A click records only the word chosen at the end of recognition. Eye movements record which other words received support before that choice, so a sharp identification function can sit alongside gradual differences in competition."
        ]
      }
    ],
    "speech2-12": [
      {
        "text": "**Eye movements reveal that ambiguity is gradient**. There are **more looks to the competitor close to the boundary**. Gradient means that uncertainty varies by degree rather than all at once.",
        "children": [
          "The analysis holds the final response constant. It compares only trials where the listener clicked bear, or only trials where the listener clicked pear.",
          "Since every trial in a comparison ended with the same click, differences in competitor looks cannot come from listeners changing their answer."
        ]
      },
      {
        "text": "On trials where listeners clicked **bear**, they still glanced at the **pear** for a while.",
        "children": [
          "Those looks rose after the word began and then faded as bear won.",
          "Sounds closer to the boundary drew more looks to the pear, and those looks lasted longer, than the clearest /b/ sounds."
        ]
      },
      {
        "text": "On trials where listeners clicked **pear**, the pattern was the mirror image.",
        "children": [
          "Sounds just past the boundary drew the most looks to the bear.",
          "The clearest /p/ sounds drew the fewest."
        ]
      },
      {
        "text": "The effect of VOT is mainly on the **duration of activation**, meaning how long the competitor stays active. Two sounds that both end up as bear can still produce different amounts of looking at the pear. The recognition system keeps track of how ambiguous each sound was, which is information a threshold model would throw away.",
        "children": []
      }
    ],
    "speech2-13": [
      {
        "text": "The gradient effect is easiest to see when looks to the competitor are compared across the whole VOT range. On one side of the **category boundary**, listeners clicked bear, and the measure is how often they looked at the pear. On the other side, they clicked pear, and the measure is how often they looked at the bear.",
        "children": []
      },
      {
        "text": "Looks were measured in two time windows.",
        "children": [
          "The **early** window covers **300–1100 milliseconds** after the word begins.",
          "The **late** window covers **1100–1900 milliseconds** after the word begins."
        ]
      },
      {
        "text": "In both windows, competitor looks **increase as VOT approaches the boundary from either side**.",
        "children": [
          "On the bear side, looks to the pear grow steadily as the sound moves closer to the boundary.",
          "On the pear side, looks to the bear are highest just past the boundary and fall steadily as the sound becomes a clearer /p/.",
          "Early looks are higher overall, since listeners are still uncertain early in the word, but they follow the same pattern."
        ]
      },
      {
        "text": "The effect appears in both windows, so uncertainty about the first sound shapes looking throughout recognition. A sound can support the eventual winner while still supporting its rival. The closer the sound is to the boundary, the stronger that rival support is.",
        "children": []
      }
    ],
    "speech2-14": [
      {
        "text": "The result fits the idea that **activation flows in a cascaded way from features to phonemes**, with changing features affecting phonemes and changing phonemes affecting words while recognition is under way.",
        "children": [
          "**Even stimuli identified as /b/ 100% of the time can vary in how strongly and unambiguously the “voiced” feature is activated**.",
          "A clear /b/ activates voicing strongly, while a /b/ near the boundary activates it only weakly."
        ]
      },
      {
        "text": "**/b/ and /p/** share most features. Both are **bilabial**, with the closure made by the two lips, and both are **stops**, with airflow fully blocked and then released.",
        "children": [
          "A stimulus that is clearly **+bilabial** and **+stop** supports /b/ and /p/ equally.",
          "Only voicing tells them apart, so weak voicing evidence creates **momentary ambiguity between /b/ and /p/**.",
          "That ambiguity surfaces in the **eye movements** while the listener decides where to click."
        ]
      },
      {
        "text": "The **TRACE** model captures this cascade with three layers.",
        "children": [
          "The **feature layer** takes a **pseudo-spectral input representation**, a simplified version of the sound’s frequency content over time. Its detectors are POW, VOC, DIFF, ACU, GRD, VOI and BUR, for power, vocalic, diffuseness, acuteness, gradualness of onset, voicing and burst.",
          "The **phoneme layer** has units for phonemes such as /b/, /p/, /r/ and /t/, repeated at every point in time.",
          "The **word layer** has word units, also repeated across time.",
          "Activity passes up from features to phonemes and from phonemes to words, and units within a layer compete through inhibition."
        ]
      }
    ],
    "speech2-15": [
      {
        "text": "There is evidence that **partial activation can reach all the way to the lexical level**, the level of stored words and their meanings. **Andruski and colleagues (1994)** found that **semantic priming** can occur even with **nonwords**. Semantic priming is the speed-up in recognizing a word after hearing a word related in meaning.",
        "children": [
          "**“Beace”** primes **“war.”** Beace is peace with a voiced first consonant, and peace is related in meaning to war.",
          "**“Ging”** primes **“queen,”** because ging is king with a voiced first consonant.",
          "In the **word-to-word** items, changing the voicing of the first consonant of one real word produces another real word, as in **“pet”** becoming **“bet.”** One such item is **“bill”** priming **“drug,”** because bill is an altered form of pill."
        ]
      },
      {
        "text": "Priming was measured with a **lexical decision task**, in which participants decide as quickly as possible whether a target is a real word. Faster responses than after an unrelated prime indicate priming.",
        "children": [
          "Primes were **unaltered**, had their VOT reduced by **one third**, had it reduced by **two thirds**, or were **unrelated** to the target."
        ]
      },
      {
        "text": "Every related prime sped up responses compared with unrelated primes.",
        "children": [
          "For word-to-nonword items, priming stayed strong at every level of alteration. A prime drifting toward a nonword still activated the meaning of the real word it came from.",
          "For word-to-word items, priming weakened at two thirds. There the altered prime also partly activates a competing real word, such as bill competing with pill, which reduces the benefit."
        ]
      },
      {
        "text": "**Lexical representations can be activated even by incomplete or imperfect input**. Beace never becomes a real word, but it matches peace closely enough to partly activate it. That activation spreads to meaning and speeds recognition of war, which fits cascaded processing.",
        "children": []
      }
    ],
    "speech2-16": [
      {
        "text": "The bear–pear eye-tracking result is evidence for **cascaded processing** in speech perception. A thresholded model would struggle to explain why **the number of looks to the other member of the minimal pair increases gradually as you approach the category boundary**. A **minimal pair** is two words that differ in a single sound, such as bear and pear.",
        "children": [
          "Looks to the competitor climb steadily as VOT nears the boundary.",
          "This happens even when the final answer is the same, so it reflects graded activation within one category."
        ]
      },
      {
        "text": "In a thresholded model, graded feature activity never reaches the phoneme level.",
        "children": [
          "Feature evidence can swing between +voiced and −voiced.",
          "The phoneme level stays silent until /b/ is chosen all at once."
        ]
      },
      {
        "text": "Under a threshold-only account, every token placed in a category sends the **same finished phoneme** to the word level.",
        "children": [
          "Word-level competition would then be identical for every /b/, leaving nothing to produce gradually changing competitor looks.",
          "A cascaded account explains the effect directly, because more support for the competing phoneme passes on more support for its word."
        ]
      }
    ],
    "speech2-17": [
      {
        "text": "**TRACE** also includes **feedback from the lexical layer to the phoneme layer**, so activity runs up from phonemes to words and back down from words to phonemes.",
        "children": [
          "**Lexical feedback** means that an active word sends support back to its own phonemes.",
          "An uncertain sound can partly activate a word, and that word can then boost the reading of the sound that fits it."
        ]
      },
      {
        "text": "Influence therefore travels both ways.",
        "children": [
          "Acoustic evidence changes which words are active.",
          "Active words shift the balance between possible phonemes while the phoneme decision is still forming.",
          "This helps listeners cope with noisy or ambiguous input."
        ]
      },
      {
        "text": "**Feedback is different from cascading**.",
        "children": [
          "Cascading sends incomplete evidence forward, from features to phonemes and from phonemes to words.",
          "Feedback sends influence from words back down to phonemes.",
          "An interactive model can have both, and findings where word knowledge changes how sounds are heard, such as the Ganong effect, are the reason to add feedback."
        ]
      }
    ],
    "speech2-18": [
      {
        "text": "**The Ganong effect** comes from **Ganong (1980)**, who examined how **phoneme identification is affected by word knowledge**. The heading “Gisses and kifts for Valentine’s day” plays on it by swapping the voicing of the first consonants in “kisses and gifts.”",
        "children": [
          "The question is whether knowing which sound sequences are real words changes how an ambiguous sound is heard."
        ]
      },
      {
        "text": "Ganong built **word/nonword pairs** such as **“corpse/gorpse,”** with a real word at one end of the continuum and a nonword at the other.",
        "children": [
          "Hearing /k/ yields the familiar word corpse.",
          "Hearing /g/ yields gorpse, which is not a word.",
          "The continua crossed the relevant phoneme boundary in **5-millisecond steps** of VOT."
        ]
      },
      {
        "text": "The design pairs **uncertain phonetic evidence** with a **difference in lexical status**.",
        "children": [
          "The rest of the word, “-orpse,” never changes, and it tells the listener which beginning would complete a real word.",
          "If word knowledge affects identification, an ambiguous first consonant should more often be heard as the sound that makes a word.",
          "The crucial test lies in the ambiguous middle of the continuum, where word knowledge has the most room to act."
        ]
      }
    ],
    "speech2-19": [
      {
        "text": "One possibility is a **late “correction” process**. Under this account, **categorical perception works as usual, but there is a bias to report having heard a word**.",
        "children": [
          "The listener first categorizes the sound with no help from word knowledge.",
          "At the response stage, the listener leans toward the option that forms a real word."
        ]
      },
      {
        "text": "This account predicts a **general reporting bias**. Three kinds of continua are compared.",
        "children": [
          "In **word–nonword**, the voiced end forms a word. In **nonword–word**, the voiceless end forms a word. In **neutral**, neither end has a lexical advantage.",
          "If the bias is added after perception, it should push responses toward the word by the same amount everywhere.",
          "Even a clearly voiceless sound would sometimes be reported as voiced when the voiced version makes a word, and the reverse would hold at the other end."
        ]
      },
      {
        "text": "The **lexical effect** is the difference in voiced responses between the two lexical conditions. Under this account, the lexical effect is the same size at every step of the continuum.",
        "children": [
          "The bias favors the word equally at clear and ambiguous steps.",
          "Perception and knowledge stay separate, and word knowledge only nudges the reported answer."
        ]
      }
    ],
    "speech2-20": [
      {
        "text": "A second possibility is that **word knowledge shifts the categorical boundary**. Under this account, word knowledge changes where the listener switches from one phoneme category to the other.",
        "children": [
          "Near an ambiguous onset, the interpretation that forms a real word gets extra support.",
          "The effect changes categorization itself, not just the reported answer."
        ]
      },
      {
        "text": "This account predicts that the lexical conditions differ only in the middle of the continuum.",
        "children": [
          "At both ends, the sound is clear, so every condition gives the same answer.",
          "Near the boundary, the word–nonword condition crosses later and the nonword–word condition crosses earlier."
        ]
      },
      {
        "text": "The **lexical effect** should therefore form a peak. It is near zero at the endpoints and largest for the items closest to the boundary.",
        "children": [
          "The effect is **strongest for items closest to the category boundary**, because those are the stimuli where lexical information can help resolve ambiguity about the first phoneme.",
          "At the endpoints, strong acoustic evidence already settles the consonant, leaving little room for word knowledge to help."
        ]
      },
      {
        "text": "The word ending gives the same lexical advantage at every step, but the onset is not equally uncertain at every step. Where the effect occurs therefore matters. A flat effect points to a reporting bias, while a peaked effect points to a shift in the boundary itself.",
        "children": []
      }
    ],
    "speech2-21": [
      {
        "text": "**Ganong’s results** are strikingly consistent with the **second model**, the boundary-shift account.",
        "children": [
          "At the short and long ends of the VOT continuum, the word and nonword conditions give nearly the same answers.",
          "The **lexical effect** is small at the endpoints and largest near the boundary, where it reaches about **0.3**."
        ]
      },
      {
        "text": "A peak at the boundary rules out a simple reporting bias, because word knowledge matters most where the acoustic evidence is weakest.",
        "children": [
          "At the boundary, the word that fits the context tips the balance.",
          "At the endpoints, the acoustics settle the answer alone."
        ]
      },
      {
        "text": "Ganong considered several ways this could happen, centered on different **guessing strategies**.",
        "children": [
          "A guessing strategy would let listeners use word knowledge only when unsure of the sound."
        ]
      },
      {
        "text": "Other models stress a possible role for **feedback** in these shifts.",
        "children": [
          "In **interactive models**, an active word sends support back to its own phonemes.",
          "The whole-word representation can then shape how an ambiguous part of the word is interpreted during recognition."
        ]
      }
    ],
    "speech2-22": [
      {
        "text": "A **simulation of the Ganong effect in the TRACE model** tracks **phoneme-level and word-level activations** at several points as a segment unfolds. The input begins with a sound **ambiguous between /b/ and /p/**, followed by **/l/**, the vowel **/ʌ/**, and **/g/**, which together make the word **plug**.",
        "children": [
          "Activations are recorded at four moments, as each new sound arrives."
        ]
      },
      {
        "text": "In the **first frame**, only the ambiguous first sound has arrived.",
        "children": [
          "**/b/** and **/p/** are both weakly active, at about the same level.",
          "Word activation is still very low."
        ]
      },
      {
        "text": "In the **second and third frames**, /l/ and the vowel arrive.",
        "children": [
          "Partial /b/ evidence supports words beginning with **bl-**, and partial /p/ evidence supports words beginning with **pl-**.",
          "Several candidates gain activation together, including **plug**, **blood** and **blush**, which all fit the beginning heard so far.",
          "Phoneme activity for /p/ starts to pull ahead of /b/."
        ]
      },
      {
        "text": "In the **fourth frame**, the final **/g/** arrives.",
        "children": [
          "/g/ fits plug but does not fit the endings of blood or blush.",
          "**Plug** becomes the most active word by a wide margin, while the alternatives fall away.",
          "/p/ ends up more active than /b/ at the phoneme level."
        ]
      }
    ],
    "speech2-23": [
      {
        "text": "As the input continues, **activity accumulates for “plug,”** above all when the **final /g/** arrives, since /g/ clashes with **“blood”** and **“blush,”** which had also become active.",
        "children": [
          "Blood and blush matched the early part of the input, so they were plausible for a while.",
          "When /g/ arrives, they lose support because their endings do not fit."
        ]
      },
      {
        "text": "TRACE therefore explains **word effects on phoneme category boundaries** through **top-down processing**, in which higher-level knowledge influences lower-level analysis.",
        "children": [
          "**Activity at the lexical level produces feedback to the phoneme level**.",
          "That feedback gives **greater activation to the phoneme consistent with a word**, so /p/ gains extra support from plug, the winning word."
        ]
      },
      {
        "text": "The ambiguous beginning becomes clearer because /p/ belongs to the word the whole sequence supports.",
        "children": [
          "Information arriving at the end of a word can reach back and shape how an earlier sound is heard.",
          "This happens through interactions during recognition, and the ambiguous first sound comes to be heard as /p/."
        ]
      }
    ],
    "speech2-24": [
      {
        "text": "**TRACE** is a version of the **Interactive Activation model** of **written word recognition**, from McClelland and Rumelhart (1981), and the two share many principles.",
        "children": [
          "In the Interactive Activation network, **feature** units connect to **letter** units, and letter units connect to **word** units such as **WEAR, WORK, WORD** and **WEAK**.",
          "Compatible units at different levels support each other, and competing units within a level inhibit each other.",
          "Active words send support back down to their own letters."
        ]
      },
      {
        "text": "Suppose a reader sees **W, O** and **R** clearly, while ink blots hide part of the final letter.",
        "children": [
          "The visible parts of that letter fit both **R** and **K**.",
          "W, O and R activate words such as WORK and WORD, but only WORK fits the visible features of the final letter, so WORK becomes the strongest word.",
          "WORK sends support back to **K**, and the ambiguous letter is perceived as K, just as plug supports /p/ in speech."
        ]
      },
      {
        "text": "A key issue in speech perception is that **the stimuli unfold over time**.",
        "children": [
          "A written word is on the page all at once, while a spoken word arrives one sound at a time.",
          "TRACE handles this by repeating feature, phoneme and word units at every point in time, so a candidate can match the beginning, gain activation and then fade when the ending conflicts."
        ]
      }
    ],
    "speech2-25": [
      {
        "text": "**Categorical perception** shapes perception through **category boundaries**. **Given the same physical difference, it is harder to distinguish stimuli from the same category than from different categories**, so equal acoustic steps have unequal perceptual effects depending on whether they cross a boundary.",
        "children": []
      },
      {
        "text": "Even so, **ambiguity about phoneme identity does have an impact on word recognition**.",
        "children": [
          "Sounds with the same label differ in how strongly they activate a competing word.",
          "The word level keeps information about how uncertain each token was, so labels can be categorical while the processing behind them is graded."
        ]
      },
      {
        "text": "**Word-level information** also **seems to have an impact on phoneme categorization**.",
        "children": [
          "In the Ganong effect, word knowledge moves the category boundary.",
          "In TRACE, that happens through lexical feedback to the phoneme level."
        ]
      },
      {
        "text": "It therefore **cannot be the case that the word recognition system just sits there waiting for the phoneme recognition system to finish its job**, the way a furniture factory waits on a lumber mill.",
        "children": [
          "**Spoken word recognition is more interactive** than that, more like the food web.",
          "Partial information moves forward and active words send support back down, all while uncertainty is still being resolved."
        ]
      }
    ],
    "speech2-26": [],
    "speech2-27": [
      {
        "text": "**Spoken word recognition is also very fast**. **Allopenna and colleagues (1994)** used a visual world eye-tracking task to measure how quickly candidate words become active.",
        "children": [
          "Participants saw a grid of pictures and geometric shapes and followed spoken instructions to move objects.",
          "The display included a **beaker**, which was the **referent** or target, along with a **beetle**, a **speaker** and a **carriage**."
        ]
      },
      {
        "text": "The pictures were chosen for their sound overlap with the word **beaker**.",
        "children": [
          "**Beetle** is a **cohort competitor** because it shares the beginning of the word.",
          "**Speaker** is a **rhyme competitor** because it shares the ending of the word.",
          "**Carriage** is **unrelated** and shares no sounds with beaker."
        ]
      },
      {
        "text": "Looks to the beaker began rising before the word had even finished.",
        "children": [
          "Early on, listeners looked at the beaker and the beetle about equally, since both fit the first sounds.",
          "Once the sounds that separate the two words arrived, looks to the beetle dropped away, and looks to the beaker kept climbing.",
          "Looks to the speaker rose later and stayed smaller, since it matches only the end of the word. Looks to the carriage stayed near zero."
        ]
      },
      {
        "text": "Recognition begins while the word is still unfolding. Words that match the input at a given moment become active, and they drop out as soon as they stop matching.",
        "children": []
      }
    ],
    "speech2-28": [
      {
        "text": "The eye-tracking data can be compared with a **TRACE simulation** of the same task. The model’s word activations over time were converted into predicted looks and compared with real fixations.",
        "children": []
      },
      {
        "text": "The TRACE predictions closely match the eye movements.",
        "children": [
          "For the **referent**, the predicted and real curves rise together and level off at nearly the same point.",
          "For the **cohort** competitor, the model predicts an early rise followed by a decline, matching the real looks in timing and size.",
          "For the **rhyme** competitor, the model predicts a smaller and later rise, again matching the real looks."
        ]
      },
      {
        "text": "The **granularity** of the simulation is fine-grained, meaning it predicts activity moment by moment rather than only the final choice.",
        "children": [
          "**Eye movements give an idea of the changes in “activity” for different competitors over time**.",
          "This makes it possible to **see cognitive processing before a final response is given**."
        ]
      },
      {
        "text": "This parallels the **graded effects of category goodness** in categorical perception. Sounds that are better or worse examples of a category produce different amounts of competitor activity, even when the final label is the same.",
        "children": []
      }
    ],
    "sentence-01": [],
    "sentence-02": [
      {
        "text": "**“The horse raced past the barn fell”** is grammatical English, even though it usually feels broken the first time through. The trouble comes from the way the opening words push the reader toward the wrong structure.",
        "children": [
          "Most readers take **raced** as the main verb, so “the horse raced past the barn” seems to be a complete event in which the horse did the racing.",
          "When **fell** shows up, that structure has no room for it, and the sentence seems to collapse."
        ]
      },
      {
        "text": "The sentence actually describes **two events**. Someone raced the horse past the barn, and afterward the horse fell.",
        "children": [
          "The intended meaning is **“The horse that was raced past the barn fell.”**",
          "In this reading, “raced past the barn” picks out which horse is meant, and **fell** is the main verb telling what happened to it."
        ]
      },
      {
        "text": "Restoring the missing words **disambiguates** the sentence, as in “the horse that was raced past the barn fell.”",
        "children": [
          "“That was” makes the modifying relationship explicit, so raced can no longer be read as the main verb.",
          "Understanding a sentence depends on assigning relationships among its words, not only on knowing what each word means."
        ]
      },
      {
        "text": "It could fairly be called **the sentence that launched a thousand experiments**, since researchers have used it over and over to study how readers build structure as words come in.",
        "children": []
      }
    ],
    "sentence-03": [
      {
        "text": "**“The horse raced past the barn fell”** is nearly as famous as **“Colorless green ideas sleep furiously.”**",
        "children": [
          "The colorless green ideas sentence is grammatical but makes no sense.",
          "The horse sentence is grammatical and makes sense, but it is very hard to process."
        ]
      },
      {
        "text": "It is the classic case of the **“garden path” effect**. A **garden path sentence** steers the reader into one reading early on, and later words reveal that reading to be wrong.",
        "children": [
          "The name comes from the saying “to lead someone down the garden path,” meaning to mislead.",
          "Raced looks like the main verb, and fell then clashes with the structure already built, so the reader must go back and treat “raced past the barn” as “that was raced past the barn.”",
          "Garden paths arise because readers build structure word by word, committing to one analysis before the sentence is over."
        ]
      },
      {
        "text": "One comic strip jokes that nobody would ever say such a sentence, and the reply is that farmers might, if their horses kept falling over.",
        "children": [
          "The joke works only because the sentence really is grammatical, even though it sounds wrong."
        ]
      },
      {
        "text": "**Grammaticality and processing difficulty are different things**.",
        "children": [
          "A sentence can have a perfectly acceptable structure and still be very hard to follow as it unfolds.",
          "The garden path is about which analysis the reader picks first and how hard that analysis is to replace."
        ]
      }
    ],
    "sentence-04": [
      {
        "text": "**Syntactic explanations** of the garden path effect begin with a **parser**, a mental process that builds a **syntactic tree** for each sentence we hear or read. A syntactic tree records how words group into phrases and how the phrases relate to each other.",
        "children": []
      },
      {
        "text": "In the correct tree, the subject is a large noun phrase, or **NP**, that contains “the horse” plus a reduced clause meaning “that was raced past the barn.”",
        "children": [
          "“That” and “was” are silent in the actual sentence, and the clause also has an empty subject position.",
          "Inside the clause, raced takes the prepositional phrase, or **PP**, “past the barn.”",
          "The main verb phrase, or **VP**, contains only **fell**."
        ]
      },
      {
        "text": "In the failed parse, “the horse” is an ordinary NP and “raced past the barn” is the main VP, with raced as the main verb.",
        "children": [
          "**Fell** is then left with nowhere to attach, and the parse breaks down."
        ]
      },
      {
        "text": "Any parser has to work inside a mind with **limited memory** and **time constraints**.",
        "children": [
          "Words come quickly, so the parser cannot wait for the end of the sentence before building structure.",
          "It can keep only a limited number of structures in play at once."
        ]
      }
    ],
    "sentence-05": [
      {
        "text": "The **grammatical version** of the horse sentence is **much more complex syntactically** than the failed parse, because it has **many more nodes**. A **node** is a point in a syntactic tree that stands for a grammatical grouping, such as an NP, a VP or a sentence.",
        "children": [
          "The correct tree needs extra nodes for the embedded clause and for the silent “that” and “was.”",
          "The failed parse simply makes “raced past the barn” the main VP, which takes far fewer nodes."
        ]
      },
      {
        "text": "One space-saving strategy is to **initially prefer smaller trees**, a strategy called **“minimal attachment.”**",
        "children": [
          "Under minimal attachment, each new word is fitted into the existing structure with the fewest possible new nodes.",
          "Fewer nodes means less structure to build and keep in memory at that moment."
        ]
      },
      {
        "text": "In the horse sentence, minimal attachment favors **raced as the main verb**, because that reading needs the fewest nodes.",
        "children": [
          "The reading where “raced past the barn” modifies horse needs an embedded relative clause, so the parser passes it over at first.",
          "The smaller structure lightens the immediate load but leads down the garden path. When fell arrives, it demands the larger structure that was passed over, and the reader must rebuild the tree."
        ]
      }
    ],
    "sentence-06": [
      {
        "text": "**“Late closure”** is another parsing strategy in this framework. It is a bias to **keep the current clause “open” as long as possible**, so new words get attached to the phrase under construction.",
        "children": [
          "Keeping a clause open means adding incoming words to it instead of closing it and starting something new."
        ]
      },
      {
        "text": "In **“The burglar blew open the safe with the dynamite,”** the phrase **“with the dynamite”** wants to join the big **verb phrase** that begins with **“blew open.”** Frazier (1987) contrasts two structures for the sentence.",
        "children": [
          "In the **preferred** structure, the PP attaches to the **VP**. This **verb-phrase attachment** makes the dynamite the **instrument** used to blow open the safe.",
          "In the **unpreferred** structure, the PP attaches to the **NP** “the safe.” This **noun-phrase attachment** makes the phrase describe which safe was blown open, the one that had the dynamite."
        ]
      },
      {
        "text": "Both attachments are grammatical, but they say different things.",
        "children": [
          "Late closure keeps the verb phrase open, so the new phrase joins it.",
          "Here the preferred VP attachment is also the minimal attachment, since it needs fewer nodes than building an extra NP around “the safe with the dynamite.”",
          "For this sentence, the preferred parse happens to be the sensible one, so readers reach the right meaning easily."
        ]
      }
    ],
    "sentence-07": [
      {
        "text": "Late closure shows its effect in a sentence that **requires the “unpreferred” parse to be sensible**, such as **“The burglar blew open the safe with the jewels.”**",
        "children": [
          "Jewels make a poor tool for blowing open a safe.",
          "The sensible meaning is that the burglar blew open **the safe that contained the jewels**, which requires attaching “with the jewels” to the noun phrase “the safe,” the unpreferred NP attachment."
        ]
      },
      {
        "text": "**Careful tests of reading time and eye movements** reveal that people are **slower to read sentences where the sensible reading requires the unpreferred parse**.",
        "children": [
          "Reading time measures how long readers spend on each part of the sentence.",
          "Eye movement records track where readers look and when they jump back to reread.",
          "The extra time shows up right where the parse has to change."
        ]
      },
      {
        "text": "Readers **momentarily entertain the idea that the jewels were used to blow open the safe**, and then must **retrace their steps**.",
        "children": [
          "Following its usual preference, the parser first attaches the phrase to the verb phrase.",
          "The meaning of jewels clashes with the instrument reading, so the parser moves the attachment to the noun phrase.",
          "The final meaning is easy, but getting there carries a measurable processing cost."
        ]
      }
    ],
    "sentence-08": [
      {
        "text": "This syntactic explanation depends on a **parser that deals exclusively with the abstract syntactic structure** of the sentence. It parallels the **“lumber mill”** model of thresholded processing in speech perception.",
        "children": [
          "In a lumber mill, each stage works on its own material and hands a finished product to the next stage.",
          "In the same way, the parser builds structure from grammatical categories alone, without checking meaning or context, and meaning is computed afterward from the finished structure."
        ]
      },
      {
        "text": "The parser has **its own operating characteristics**.",
        "children": [
          "It aims for **the simplest tree possible**, which is **minimal attachment**.",
          "It does this partly by **leaving clauses open as long as possible**, which is **late closure**.",
          "Both preferences limit how much structure has to be built and held at once."
        ]
      },
      {
        "text": "This handles ambiguity **very efficiently**, by choosing to **ignore ambiguity until it becomes a problem**.",
        "children": [
          "The parser commits to one likely structure and builds only that one, and most of the time the first choice is right.",
          "When a later word fails to fit, the structure must be revised. That revision causes garden path difficulty, which is the price of an efficient strategy."
        ]
      }
    ],
    "sentence-09": [
      {
        "text": "A **purely syntactic explanation** runs into **problems**, and one is that **syntactically “difficult” sentences are not always difficult to parse**.",
        "children": [
          "Many published sentences contain **reduced relative clauses**, relative clauses with “that was” or “that were” left out, as in “the horse raced past the barn fell.”"
        ]
      },
      {
        "text": "Examples come straight from research articles, with the verb that opens each reduced relative written in capitals.",
        "children": [
          "“Thus, a noun phrase **FOLLOWED** by a **MORPHOLOGICALLY AMBIGUOUS VERB** … will be temporarily ambiguous,” from Trueswell, Tanenhaus and Garnsey (1994).",
          "“Referential information **PROVIDED** by the discourse is of no help,” from Britt, Perfetti, Garrod and Rayner (1992).",
          "“Recent research **REPORTED** by **FERREIRA AND CLIFTON** (1986) has demonstrated that syntactic processing is quite independent and that the initial syntactic analysis **ASSIGNED** to a sentence is little influenced by the semantic information **ALREADY ANALYZED**,” from Frazier and Rayner (1987).",
          "“The pattern of results **OBTAINED** with global reading times is reflected by differences **LOCATED** on the critical disambiguating phrase,” from Altmann and Steedman (1988)."
        ]
      },
      {
        "text": "Every capitalized verb begins a reduced relative with the same structure as the horse sentence. **But these are not impossibly difficult sentences**, and readers follow them easily without any garden path.",
        "children": [
          "In “recent research reported by Ferreira and Clifton,” reported describes research that someone reported."
        ]
      },
      {
        "text": "**MacDonald, Perlmutter and Seidenberg (1994)** argue instead that **semantic factors and statistical regularities interact with parsing from very early on**.",
        "children": [
          "Semantic factors are about meaning, and statistical regularities are patterns in how often words occur in particular structures.",
          "Particular words and their familiar uses can favor a reduced relative reading right from the start."
        ]
      }
    ],
    "sentence-10": [
      {
        "text": "The collection of reduced relatives is **wonderfully passive-aggressive**, because **many of its examples are drawn from papers that use the difficulty of parsing reduced relatives as evidence for an autonomous parser**. An **autonomous parser** builds syntactic structure with no help from meaning or context.",
        "children": [
          "Those authors argued that reduced relatives are hard to process.",
          "Yet they wrote reduced relatives in their own articles, and readers understood them without trouble."
        ]
      },
      {
        "text": "More examples make the same point.",
        "children": [
          "In “a noun phrase **FOLLOWED** by a morphologically ambiguous verb,” followed modifies noun phrase.",
          "In “the initial syntactic analysis **ASSIGNED** to a sentence,” assigned modifies analysis.",
          "In “differences **LOCATED** on the critical disambiguating phrase,” located modifies differences.",
          "“A person **PRESENTED** with the evidence **EXAMINED** by the lawyer may interpret the evidence as a theme, not an agent, because examined requires an animate agent,” from Ferreira and Clifton (1986). Presented modifies person, and examined modifies evidence."
        ]
      },
      {
        "text": "These were **not the only reduced relatives** in those articles.",
        "children": [
          "They turned up at about **one per journal page** across the sample.",
          "Reduced relatives are therefore routine in scientific writing, and in a supportive context a formally complex structure is easy to grasp."
        ]
      }
    ],
    "sentence-11": [
      {
        "text": "When we read **“Recent research reported by…,”** several factors beyond syntax are at work.",
        "children": [
          "**Semantics**. Research is **inanimate**, not a living thing, so it is an unlikely **subject** for a verb like **report**. Treating research as something that was reported fits the word meanings.",
          "**Lexical statistics**. **“Reported” occurs frequently in reduced relatives**, and lexical statistics are learned patterns of how often particular words appear in particular structures.",
          "**Lexical statistics and “world knowledge.”** “Reported” is especially common in reduced relatives **in scientific papers, especially when following the word “research,”** and world knowledge here means knowing how people actually write in that setting."
        ]
      },
      {
        "text": "These and **many other factors interact with the syntax of the sentence very early on**. They act from the first moments of reading and help decide which structure gets chosen at all.",
        "children": []
      },
      {
        "text": "A sentence pair makes the role of meaning clear.",
        "children": [
          "**“The burglar arrested in the parking lot was charged today.”** Burglars tend to be arrested, so arrested is easily read as starting a reduced relative about the burglar.",
          "**“The policeman arrested in the parking lot was charged today.”** Policemen tend to do the arresting, so arrested is first read as the main verb, and “was charged” sets off a garden path.",
          "The two sentences share the same grammar. The difference in difficulty comes from what we know about burglars and policemen."
        ]
      }
    ],
    "sentence-12": [
      {
        "text": "**“World knowledge” can be very local**, coming from the visual scene right in front of us as well as from general knowledge. **Spivey and colleagues (1995)** tested this with a visual world task.",
        "children": [
          "Participants saw real objects, **a pencil, a box, an empty towel, and an apple sitting on a towel**.",
          "They heard **“Put the apple on the towel in the box”** and carried it out while their eyes were tracked."
        ]
      },
      {
        "text": "With **minimal attachment**, “the towel” would briefly seem to end the clause **“put the apple on the towel.”**",
        "children": [
          "In that reading, “on the towel” names the **destination** for the apple.",
          "In the intended reading, “on the towel” says **which apple** to move, the one already on a towel, and **“in the box”** is the destination."
        ]
      },
      {
        "text": "People **do seem to look at the empty towel while planning their movements**, as if treating it as a target, before they plan a movement to the box.",
        "children": [
          "With one apple in view and the ambiguous instruction, a typical sequence runs from the apple to the empty towel and then to the box.",
          "With the unambiguous instruction **“Put the apple that’s on the towel in the box,”** the eyes go from the apple straight to the box."
        ]
      },
      {
        "text": "The listener recognizes every word correctly. The error lies in taking the location phrase as the destination, which briefly changes the planned action.",
        "children": []
      }
    ],
    "sentence-13": [
      {
        "text": "In a **two-referent context**, the display holds **two apples**, one on a towel and one elsewhere, along with the empty towel and the box.",
        "children": [
          "“The apple” by itself no longer says which apple to move.",
          "**“On the towel”** now does useful work, since it picks out one of the two apples."
        ]
      },
      {
        "text": "Here participants usually look at the apple on the towel and then at the box.",
        "children": [
          "Looks to the empty towel become much less common.",
          "**The sequence and the timing of eye movements**, measured against the nouns in the speech, **did not differ** between the ambiguous and the unambiguous instructions."
        ]
      },
      {
        "text": "In this setting, the ambiguous instruction is handled exactly like the explicit one with “that’s on the towel.”",
        "children": [
          "With two apples in view, the listener needs to know which apple, so a phrase that singles one out is expected.",
          "Listeners take “on the towel” as describing the apple from the start, and the destination reading never takes hold. The same sentence receives a different grammatical analysis because the visual context differs."
        ]
      }
    ],
    "sentence-14": [
      {
        "text": "Once **two apples** are in view, it suddenly becomes **felicitous**, meaning natural and appropriate, to add information about **which apple** the speaker means.",
        "children": [
          "With one apple, there is no reason to say which apple, so “on the towel” looks like extra information and is easily heard as a destination.",
          "With two apples, “on the towel” has a clear purpose, picking out the right apple."
        ]
      },
      {
        "text": "As a result, **people do not look at the empty towel as much**.",
        "children": [
          "With one apple, the ambiguous instruction drew looks to the empty towel on about **55%** of trials.",
          "With two apples, the same instruction drew such looks on only about **17%** of trials, close to the level for the unambiguous instruction."
        ]
      },
      {
        "text": "The instruction’s words were the same in both displays, so the visual context alone changed how often listeners were misled.",
        "children": [
          "This is an effect of **referential context**, the set of objects a phrase could refer to.",
          "Referential context affects which grammatical relationship listeners assign while they are still hearing the sentence."
        ]
      }
    ],
    "sentence-15": [
      {
        "text": "For **purely syntactic accounts**, the Spivey results are **a big problem**. **Different parses of the same sentence are favored under different semantic and pragmatic conditions, and this effect happens very early**.",
        "children": [
          "**Semantic** conditions have to do with meaning.",
          "**Pragmatic** conditions have to do with how language is used in a situation, such as whether a speaker must specify which object is meant."
        ]
      },
      {
        "text": "One ambiguous sentence misleads listeners often when one apple is present and rarely when two are present.",
        "children": [
          "Its words never change.",
          "Only the scene changes, and the scene alters the parse the listener adopts first."
        ]
      },
      {
        "text": "The difference appears in **eye movements during the sentence**, before the action begins, so it captures the parse while it is being built.",
        "children": [
          "If context only repaired the parse afterward, listeners in both displays should first look at the empty towel.",
          "Because those looks drop with two apples, context must have shaped the first parse, which a parser that always starts with the same structure cannot predict."
        ]
      }
    ],
    "sentence-16": [
      {
        "text": "**Mouse movements** have more recently been used to study these questions. **Farmer and colleagues (2007)** tracked the path of the computer mouse while participants carried out spoken instructions in a version of the apple and towel display.",
        "children": [
          "It is not just eye movements but **the actual execution of arm movements** that can be influenced by **syntactic ambiguity** and its **interaction with the visually defined context**.",
          "Mouse tracking records the whole path of the hand, so a competing interpretation can pull the movement toward another location before the hand reaches its target."
        ]
      },
      {
        "text": "With one apple, the hand moved from the apple toward the box, but on ambiguous instructions its path **curved toward the empty towel**.",
        "children": [
          "The bend was largest in the middle of the movement.",
          "The hand still ended at the correct place."
        ]
      },
      {
        "text": "With two apples, the paths for ambiguous and unambiguous instructions were nearly identical. The second apple makes the location phrase useful for picking out an apple, so it is no longer taken as a destination.",
        "children": []
      },
      {
        "text": "Researchers also measured the **Euclidean distance between the ambiguous and unambiguous paths** at each moment. Euclidean distance is the straight-line distance between two points.",
        "children": [
          "With one apple, the two paths grew far apart before coming back together.",
          "With two apples, they separated less and came together sooner.",
          "Comprehension and action planning interact while both are underway. A competing interpretation bends the path of the hand even when the movement ends correctly."
        ]
      }
    ],
    "sentence-17": [],
    "sentence-18": [
      {
        "text": "**The** is a **determiner**, a word that opens a **noun phrase**. Once the parser meets “the,” it expects a noun soon, perhaps with an adjective or another modifier first.",
        "children": [
          "“The” names nothing on its own.",
          "It restricts which kinds of words can come next, so the parser can anticipate the shape of the phrase."
        ]
      },
      {
        "text": "The expectation concerns a **grammatical category**, not one particular word.",
        "children": [
          "Many nouns could follow, such as pizza, dog or book.",
          "An adjective could also come first, as in “the hot pizza.”",
          "The parser predicts the form of the phrase while its meaning is still open. Words that fit the prediction go through smoothly, and words that break it cause trouble."
        ]
      }
    ],
    "sentence-19": [
      {
        "text": "**Pizza** is a **noun** that completes the noun phrase opened by “the.” It is the **head of the noun phrase**, the central word that the rest of the phrase is built around.",
        "children": [
          "“The” and “pizza” together form “the pizza,” which can now serve as the subject of the sentence.",
          "With a full noun phrase in place, the parser expects a verb or verb phrase saying what the pizza did or what happened to it."
        ]
      },
      {
        "text": "Recognizing the word delivers two kinds of information.",
        "children": [
          "Its **category**, noun, tells the parser how it can combine with other words.",
          "Its **meaning**, a kind of food, raises expectations about likely events, such as being eaten or baked.",
          "Grammatical expectations and meaning-based expectations both shape how the next words are handled."
        ]
      }
    ],
    "sentence-20": [
      {
        "text": "**Was** is a past-tense form of **be**. It can serve as an **auxiliary**, a helping verb that joins another verb to mark grammatical information such as tense or voice.",
        "children": [
          "In “the pizza was eaten,” was helps build a **passive** with the participle eaten.",
          "In “the pizza was in the oven,” was links the subject to a phrase giving a location."
        ]
      },
      {
        "text": "Once “was” arrives, the sentence could go several ways, describing where the pizza was, what it was like or what was done to it.",
        "children": [
          "A location would come next with a preposition, and a passive would come next with a participle such as eaten.",
          "The parser must keep the growing structure available while more words arrive, because the role of was depends partly on what follows."
        ]
      }
    ],
    "sentence-21": [
      {
        "text": "**In** is a **preposition**, a word that expresses a relationship such as location or containment, and it opens a **prepositional phrase**.",
        "children": [
          "“In” does not name the location itself.",
          "It creates the expectation of a noun phrase that supplies the location, as in “in the oven” or “in the box.”"
        ]
      },
      {
        "text": "Coming after “the pizza was,” the word “in” narrows the possible structures, and the sentence now heads toward saying where the pizza was.",
        "children": [
          "The parser expects a noun phrase to finish the prepositional phrase.",
          "That expectation is grammatical, so the next word must be able to begin a noun phrase, such as “the,” “an” or a noun."
        ]
      }
    ],
    "sentence-22": [
      {
        "text": "**The** opens a new **noun phrase** inside “in the …,” the phrase that will name the location.",
        "children": [
          "“The” does not supply the location by itself.",
          "A noun is still required, maybe with modifiers in front, as in “in the hot oven.”"
        ]
      },
      {
        "text": "The parser now strongly expects a **noun**, and the expectation concerns a **word category**, not merely a sensible topic.",
        "children": [
          "Whatever comes next has to work grammatically inside a noun phrase.",
          "Knowing the sentence is about pizza makes words such as oven or box likely, but the grammatical requirement holds whatever the meaning. A word that cannot belong to a noun phrase will clash with it."
        ]
      }
    ],
    "sentence-23": [
      {
        "text": "**Eaten** is the **past participle** of **eat**. It is a verb form, not a noun, so it cannot finish the noun phrase that “in the” has started.",
        "children": [
          "**“In the eaten”** puts a verb form exactly where a noun is required.",
          "That is a **word-category violation**, a word of the wrong grammatical category in a position that demands a different one."
        ]
      },
      {
        "text": "A category error differs from a strange but grammatical meaning.",
        "children": [
          "“The pizza was in the ocean” is odd in meaning but grammatically fine, since ocean is a noun.",
          "No unusual situation can rescue “the pizza was in the eaten,” because the problem lies in the grammatical type of the word, which breaks the structure itself."
        ]
      },
      {
        "text": "The contrast between category errors and meaning errors makes such sentences valuable for brain research. Comparing brain responses to the two kinds of error can reveal whether grammar and meaning are handled differently.",
        "children": []
      }
    ],
    "sentence-24": [
      {
        "text": "The **early left anterior negativity**, or **ELAN**, is an **ERP** response triggered by **word class violations**. An **ERP**, or **event-related potential**, is electrical brain activity recorded at the scalp and averaged over many trials, timed to an event such as the start of a word.",
        "children": [
          "A **word class** is a grammatical category such as noun, verb or preposition."
        ]
      },
      {
        "text": "Classic ELAN sentences contain word-category violations.",
        "children": [
          "**“The pizza was in the eaten,”** with a participle where a noun belongs.",
          "**“The scientist criticized Max’s of proof the theorem,”** with the preposition **of** where a noun should follow “Max’s.”"
        ]
      },
      {
        "text": "The ELAN has three main features.",
        "children": [
          "It is **early**, arising about **100–200 milliseconds** after the critical word.",
          "It is **left and anterior**, strongest over the left front of the scalp, which has raised the question of whether it is specific to language.",
          "It appears **specifically for word category violations**, such as a noun where a verb is expected or a preposition in place of a noun."
        ]
      },
      {
        "text": "Incorrect sentences produce an early negative response over left frontal sites shortly after the critical word, while correct sentences do not.",
        "children": [
          "The response comes so fast that it was taken as evidence for a very quick syntactic check of word categories that runs before meaning is processed."
        ]
      }
    ],
    "sentence-25": [
      {
        "text": "With visually presented words, **the ELAN came from visual cortex**, the region at the back of the brain that processes sight. The result comes from **Dikker, Rabagliati, Farmer and Pylkkänen (2010)**, “Early occipital sensitivity to syntactic category is based on form typicality.” Visual cortex sits in the **occipital** lobe.",
        "children": [
          "For **bimorphemic nouns**, which end in a recognizable noun suffix, **“The beautifully princess …”** drew a larger visual response than **“The beautiful princess …”** about 120 to 130 milliseconds after the noun appeared.",
          "Beautiful is an adjective, which correctly predicts a noun. Beautifully is an adverb, which predicts a verb or adjective, so princess comes as a surprise."
        ]
      },
      {
        "text": "When a verb is expected, for example, **that prediction can feed back down to the earliest parts of the visual system** and anticipate visual patterns that fit **the way verbs are written**.",
        "children": [
          "A predicted grammatical category implies likely visual forms, such as typical word endings.",
          "The very early response to the error might reflect **a mismatch between that predictive process and what finally appears on the screen**."
        ]
      },
      {
        "text": "That raises a question. **Does this only work for items that are morphologically marked as nouns or verbs?** Or does it work for **open-class versus closed-class** words?",
        "children": [
          "A word is **morphologically marked** when part of it, such as a suffix, signals its category.",
          "**Open-class** words are content words like nouns and verbs, which keep gaining new members. **Closed-class** words are function words like prepositions and determiners, a small fixed set."
        ]
      }
    ],
    "sentence-26": [
      {
        "text": "Many English words can be either a **noun** or a **verb**, and the rest of the sentence decides which.",
        "children": [
          "**(3a)** “Chris and Ben are glad that the bird **perches seem** easy to install.” Perches is a **noun** here, meaning the rods birds sit on, and seem is the verb.",
          "**(3b)** “Chris and Ben are glad that the bird **perches comfortably** in the cage.” Perches is a **verb** here, saying what the bird does.",
          "**(4a)** “The teacher told the principal that the student **needs were** not being met.” Needs is a **noun**, the student’s requirements.",
          "**(4b)** “The teacher told the principal that the student **needs to be** more focused.” Needs is a **verb**."
        ]
      },
      {
        "text": "The word form alone does not fix its grammatical role, and the **continuation** after it settles the question.",
        "children": []
      },
      {
        "text": "Words also vary in **phonological form typicality**, how closely a word’s sound pattern matches typical nouns or typical verbs. An analysis of **3,158 words** measured how much each word sounds like nouns and like verbs.",
        "children": [
          "Nouns generally sound more like other nouns, and verbs more like other verbs.",
          "Some words run against the trend. Besides **noun-like nouns** and **verb-like verbs**, there are **verb-like nouns** and **noun-like verbs**, words that sound like one category while belonging to the other."
        ]
      }
    ],
    "sentence-27": [
      {
        "text": "In **form typicality**, **“perches” is noun-like** and **“needs” is verb-like**.",
        "children": [
          "These are learned statistical tendencies in how words sound, and both words can still fill either role.",
          "Among thousands of English words, perches sounds like a typical noun and needs sounds like a typical verb."
        ]
      },
      {
        "text": "For **perches**, its noun-like form fits one sentence and clashes with another.",
        "children": [
          "In **“the bird perches seem easy to install,”** perches is a noun, matching its form.",
          "In **“the bird perches comfortably in the cage,”** perches must be a verb, against its form."
        ]
      },
      {
        "text": "For **needs**, the pattern flips.",
        "children": [
          "In **“the student needs to be more focused,”** needs is a verb, matching its form.",
          "In **“the student needs were not being met,”** needs must be a noun, against its form."
        ]
      },
      {
        "text": "Each word appears once as a noun and once as a verb, so the same form can be compared in a matching use and a mismatching use.",
        "children": [
          "If form typicality guides parsing, the mismatching uses should be harder to process, even though every one of these sentences is grammatical."
        ]
      }
    ],
    "sentence-28": [
      {
        "text": "Reading is **slower when a word’s required category conflicts with its form typicality**. The measure is the extra reading time at **disambiguation**, compared with reading time at the **point of ambiguity**.",
        "children": [
          "The **point of ambiguity** is the ambiguous word itself, such as perches or needs.",
          "**Disambiguation** is the point where the continuation makes the intended category clear, such as “seem” or “comfortably.”",
          "The times are adjusted for word length, and a larger increase signals more difficulty."
        ]
      },
      {
        "text": "For **noun-like homonyms** such as perches, a noun reading added only a small cost, about **50 milliseconds**. A verb reading added a much larger cost, about **120 milliseconds**.",
        "children": [
          "A noun-like form is harder to resolve as a verb."
        ]
      },
      {
        "text": "For **verb-like homonyms** such as needs, the pattern reversed. A noun reading added about **110 milliseconds**, while a verb reading added almost nothing.",
        "children": [
          "A verb-like form is harder to resolve as a noun."
        ]
      },
      {
        "text": "The ambiguous word stays the same in each pair, and only the continuation changes.",
        "children": [
          "The extra cost appears specifically when the continuation demands the category that does not match the form.",
          "Parsing therefore uses learned statistics about how word forms sound, along with the structure the sentence finally requires."
        ]
      }
    ],
    "sentence-29": [
      {
        "text": "The **ELAN effect for nouns where a verb is expected** is limited to cases where there is either **syntactic information**, morphemes that indicate noun-ness, or **statistical form-based information**, “nouniness,” that is **physically available** in the word. **No effect was observed for neutral nouns like “infant” that lack strong cues**.",
        "children": [
          "A **morpheme** is the smallest meaningful unit of a word, such as a suffix that marks a noun.",
          "“Nouniness” is how closely a word’s form resembles typical nouns, even with no noun suffix."
        ]
      },
      {
        "text": "The early brain response studied here is the **M100**, which peaks about 100 milliseconds after a word appears. Three kinds of nouns were compared.",
        "children": [
          "**Bimorphemic nouns**, as in “The beautiful princess …” versus “The beautifully princess …” Princess carries a noun-marking suffix, and the unexpected version produced a reliably larger response.",
          "**Typical nouns**, as in “The tasteless soda …” versus “The tastelessly soda …” Soda has a statistically noun-like form, and the unexpected version again produced a reliably larger response.",
          "**Neutral nouns**, as in “The cute infant …” versus “The cutely infant …” Infant has neither a suffix nor a typical noun form, and the two versions did not differ."
        ]
      },
      {
        "text": "An abstract category mismatch is therefore not enough to trigger this earliest visual response.",
        "children": [
          "An expected category produces predictions about what the next word will look like.",
          "The early response appears only when the arriving word carries physical evidence that contradicts that prediction."
        ]
      }
    ],
    "sentence-30": [
      {
        "text": "**Sentence processing can be summarized in four sentences**, each carrying one key idea.",
        "children": [
          "**“Colorless green ideas sleep furiously.”** **Syntax is independent of semantics to some extent**. At the extreme, a sentence can be grammatical but meaningless, because words can fill a grammatical structure without describing a sensible event."
        ]
      },
      {
        "text": "**“The horse raced past the barn fell.”** A sentence’s syntactic structure is often highly **ambiguous**, or more precisely **vague**, but we notice only where processing fails.",
        "children": [
          "**Reading times** for preferred and unpreferred structures suggest that syntactic processes **take shortcuts to save memory** instead of activating every possible parse.",
          "When a shortcut picks the wrong structure, as in the horse sentence, the reader goes down the garden path."
        ]
      },
      {
        "text": "**“Put the apple on the towel in the box.”** **Context, pragmatics and other factors interact with syntactic processing from very early on**.",
        "children": [
          "With two apples in view, listeners read “on the towel” as describing the apple instead of naming a destination.",
          "The visual scene shapes the parse while the sentence is still unfolding."
        ]
      },
      {
        "text": "**“The bird perches were comfortable.”** **The very earliest syntactic effects observable in the brain are driven in part by form typicality**, not necessarily by morphosyntactic structures.",
        "children": [
          "**Morphosyntactic** structure is grammatical structure signaled by word parts and word order.",
          "These early effects seem tied to **predictions about the physical forms of words**. Perches has a noun-like form, so its use here as a noun matches the prediction its form creates."
        ]
      }
    ],
    "sentence-31": [],
    "aphasias-01": [],
    "aphasias-02": [
      {
        "text": "**Aphasia** is a loss or impairment of language caused by brain damage. In the **1870s**, several German neurologists, among them **Lichtheim** and **Wernicke**, started making **more systematic observations of aphasia**.",
        "children": [
          "They traced particular losses of function to **“disconnections” between “centers.”**",
          "A **center** is a brain region holding one kind of language representation, and a disconnection is damage to the pathway between two centers."
        ]
      },
      {
        "text": "**Lichtheim’s “House” model** arranges these centers and pathways in the shape of a house.",
        "children": [
          "**A** is the center for **sound images**, the stored sound patterns of words. **M** is the center for **movement images**, the stored motor plans for saying words. **B** is the center for **concepts**.",
          "**a** is the **acoustic pathway** carrying heard speech into A, and **m** is the **motor pathway** carrying plans from M to the speech muscles.",
          "Seven numbered sites mark different forms of aphasia, each tied to damage at a particular center or pathway."
        ]
      },
      {
        "text": "Each damage site predicts its own pattern of loss.",
        "children": [
          "Losing the ability to **understand spoken words** could come from a break between **A and B**, since the word’s sound arrives but cannot reach its concept.",
          "Losing **verbatim repetition** could come from a break between **A and M**, since a heard word cannot pass straight to the plan for saying it."
        ]
      },
      {
        "text": "**“Box and arrow” models** of this kind are foundational in **aphasiology**, the study of aphasia, and in modeling normal language.",
        "children": [
          "The **Interactive Activation model** of word recognition shares the same basic form, with levels of representation joined by pathways.",
          "This history comes from Eling and Whitaker (2009), “History of aphasia, from brain to language.”"
        ]
      }
    ],
    "aphasias-03": [
      {
        "text": "The **“Geschwind–Wernicke model”** ties language functions to specific brain regions and the pathways that join them. **Norman Geschwind revived** the box-and-arrow approach of Wernicke and Lichtheim **in the 1970s**.",
        "children": [
          "**Broca’s area** lies toward the front of the left hemisphere, in the frontal lobe.",
          "**Wernicke’s area** lies farther back, in the temporal lobe.",
          "The **arcuate fasciculus** is a bundle of nerve fibers linking Wernicke’s area to Broca’s area."
        ]
      },
      {
        "text": "Two major grooves serve as landmarks.",
        "children": [
          "The **central sulcus**, or **fissure of Rolando**, divides the frontal lobe from the parietal lobe behind it.",
          "The **lateral sulcus**, or **fissure of Sylvius**, divides the temporal lobe from the frontal and parietal lobes above it."
        ]
      },
      {
        "text": "In the hundred years between Wernicke and Geschwind, **the field of linguistics evolved dramatically**.",
        "children": [
          "Linguists built a theory in which **syntax was independent of other aspects of language** and ran on **its own computational principles**.",
          "That opened the way to more sophisticated thinking about **dissociations** and **double dissociations** of language functions."
        ]
      },
      {
        "text": "In a **dissociation**, one ability is impaired while another is spared. In a **double dissociation**, one patient loses the first ability and keeps the second, while another patient shows the opposite.",
        "children": [
          "A double dissociation is strong evidence that the two abilities rely on separate systems.",
          "Once syntax, word knowledge and meaning are treated as distinct parts of language, a patient can be described as impaired in one part while the others work."
        ]
      }
    ],
    "aphasias-04": [
      {
        "text": "In “Some thoughts about the brain/mind/language interface,” **Fromkin (1997)** describes the classic profiles of the two main aphasias.",
        "children": [
          "**Broca’s aphasia** patients speak with **word-finding pauses**, **loss of grammatical morphemes**, and quite often **disturbed word order**. A **grammatical morpheme** is a small word or word part that marks a grammatical relationship, such as “the,” “is” or past-tense “-ed.”",
          "Their understanding of everyday conversation **gives the impression of being generally good**, though **controlled testing reveals considerable impairments**."
        ]
      },
      {
        "text": "**Agrammatism**, difficulty producing or understanding grammatical structure, is almost a synonym for Broca’s aphasia.",
        "children": [
          "Still, **some patients with lesions in Broca’s area are not agrammatic**.",
          "And **some agrammatic patients would not be classified neurologically as Broca’s aphasics**.",
          "The behavior and the damaged region overlap a great deal but not perfectly. Broca’s aphasia names a pattern of behavior, and that pattern does not always follow damage to Broca’s area."
        ]
      },
      {
        "text": "**Wernicke’s aphasia** patients produce **fluent speech** with **good intonation and pronunciation**.",
        "children": [
          "Their speech has **many word substitutions**, some related in meaning to the intended word and some not.",
          "They produce **neologisms**, invented words, and **phonological errors**, mistakes in the sounds of words.",
          "They also have **comprehension difficulties**. Fluency describes how smoothly speech flows, which is separate from whether it carries a coherent message."
        ]
      }
    ],
    "aphasias-05": [
      {
        "text": "An appealing **dichotomy**, a two-way split, sets the two aphasias against each other. **Wernicke’s aphasia** is called **“word salad”** or **“Jabberwocky,”** often full of **neologisms**, while **syntax is roughly intact**. “Jabberwocky” is Lewis Carroll’s grammatical nonsense poem.",
        "children": [
          "Asked about his health, one Wernicke’s patient said **“I felt worse because I can no longer keep in mind from the mind of the minds to keep me from mind and up to the ear which can be to find among ourselves,”** from Kriendler and colleagues (1971).",
          "Asked about his poor vision, another said **“My wires don’t hire right.”**",
          "Asked whether he was a doctor, an aphasic physician answered **“Me? Yes, sir, I’m a male demaploze on my own. I still know my tubaboys what for I have that’s gone hell and some of them go.”** **Demaploze** and **tubaboys** are neologisms.",
          "One patient called a **fork** **“a need for a schedule”** and a **spoon** **“How many schemes on your throat.”**"
        ]
      },
      {
        "text": "**Broca’s aphasia** is called **“telegraphic” speech**, with **difficulty with word order and grammatical particles** and **relative sparing of important content words**.",
        "children": [
          "Asked what brought him to the hospital, one Broca’s patient said **“Yes … ah … Monday … ah … Dad and P.H. (the patient’s name) and Dad … hospital. Two … ah doctors … and ah … thirty minutes … and yes … ah … hospital. And, er Wednesday … nine o’clock and eh Thursday, ten o’clock … doctors. Two doctors … and ah … teeth. Yeah … fine,”** from Badecker and Caramazza (1985).",
          "Words such as Dad, hospital and doctors carry the story, and the small grammatical words that would join them are missing."
        ]
      },
      {
        "text": "The two patterns look like mirror images, with fluent grammar and wrong words on one side and meaningful words with little grammar on the other.",
        "children": []
      }
    ],
    "aphasias-06": [
      {
        "text": "The dichotomy can also be put in terms of what is damaged. **Wernicke’s aphasia** reflects **problems with activation, or possibly inhibition, in the lexicon**, and **Broca’s aphasia** reflects **problems with grammar**.",
        "children": [
          "The **lexicon** is the mental store of words.",
          "**Activation** makes candidate words available, and **inhibition** holds back competitors that should not be chosen, so weak inhibition could let wrong words into speech."
        ]
      },
      {
        "text": "That description is **fairly distant from how Broca described his original cases**. Paul Broca’s account of **Leborgne**, known as **“Tan,”** reads differently.",
        "children": [
          "Tan **could only produce one jargon syllable**, “tan.”",
          "He **seemed otherwise to be in possession of his senses** and in fact **seemed to understand what was being said**."
        ]
      },
      {
        "text": "Broca’s account raises several questions.",
        "children": [
          "Why does it matter that Leborgne’s other senses were intact? Intact senses mean the loss was specific to speech, which makes it a dissociation.",
          "Why does a “capacity for articulate speech” seem a more believable job for a brain region than “criminality” or “philoprogenitiveness,” a phrenology term for love of one’s children?",
          "If Tan could be tested today, which measurements would pin down his deficits at the **levels of description used in modern linguistics**, such as phonetic, phonological, lexical and syntactic?"
        ]
      },
      {
        "text": "The result is a confusion. **Broca’s actual patients would not necessarily be classified as Broca’s aphasics** today.",
        "children": [
          "They were arguably **unable to produce speech at all**, seemingly because of **motor control problems**.",
          "Today they would be diagnosed with **apraxia of speech**, a disorder of planning and coordinating speech movements, which can sharply limit output without any loss of grammatical knowledge."
        ]
      }
    ],
    "aphasias-07": [
      {
        "text": "The split between Wernicke’s aphasia as a lexicon problem and Broca’s aphasia as a grammar problem is appealing partly because it **aligns well with a sharp distinction drawn in late 20th-century formal linguistics between the grammar and the lexicon**.",
        "children": [
          "The **grammar** is the rule system for combining words into sentences.",
          "The **lexicon** is the store of individual words, which have to be memorized."
        ]
      },
      {
        "text": "The distinction begins with **Chomsky’s formulation of the computational problem of language learning**.",
        "children": [
          "We recognize a new string as a sentence **not because it matches some familiar item in any simple way**, but because **it is generated by the grammar** each speaker has internalized.",
          "A sentence never heard before can be understood because the listener can work out how the grammar builds it."
        ]
      },
      {
        "text": "Chomsky also offered **compelling demonstrations of the independence of syntax and semantics**. In Chomsky (1955), neither **(a) “colorless green ideas sleep furiously”** nor **(b) “furiously sleep ideas green colorless”** has ever occurred in an English speaker’s past experience, and yet **(a) is grammatical while (b) is not**.",
        "children": [
          "Sentence (a) makes no sense, but its word order obeys English grammar.",
          "Sentence (b) puts the same words in an order the grammar forbids.",
          "Both are equally unfamiliar and equally meaningless, so the contrast must come from grammar as a separate system."
        ]
      },
      {
        "text": "The aphasia split lines up with this division, with Wernicke’s aphasia as a disorder of the lexicon and Broca’s aphasia as a disorder of the grammar.",
        "children": []
      }
    ],
    "aphasias-08": [
      {
        "text": "The dichotomy also matches levels of the **speech production model**, especially the contrast between the **functional level** and the **positional level**.",
        "children": [
          "At the conceptual **message level**, the speaker is **choosing a story angle and arousing concepts of referents and event structure**.",
          "At the **functional level**, the first linguistic level, the speaker is **arousing word meanings and semantic roles**. A **semantic role** is a participant’s part in an event, such as the doer or the receiver.",
          "At the **positional level**, the second linguistic level, the speaker is **getting word forms in grammatically appropriate order**.",
          "The **phonological encoding level** then supplies the word sounds, and the **speech gesture level** handles **articulation**, the physical movements of speech."
        ]
      },
      {
        "text": "At the functional level, **lemmas have an arbitrary relationship to their referents**. A **lemma** is a word’s lexical entry, linking its meaning to its grammatical properties.",
        "children": [
          "Nothing about a concept fixes its word, so there is no reason a dog has to be called “dog.”"
        ]
      },
      {
        "text": "At the positional level, **syntactic trees, affixes and so on are the product of abstract syntactic processes**. An **affix** is a word part attached to a stem, such as “-ed” or “-ly,” and this level is the rule-built, grammatical side of language.",
        "children": []
      },
      {
        "text": "One objection is that **HOUSEBOAT** and **DOGHOUSE** have meanings that are clearly not arbitrary, since they are built from parts.",
        "children": [
          "The answer comes from **speech error evidence** that **derivational morphology** happens at the positional level. **Derivational morphology** forms new words from existing parts, such as adding “-ly” to make an adverb.",
          "In the slip **“easy enoughly,”** the speaker meant “easily enough,” but “-ly” attached to the wrong word. The suffix moved as a separate piece, so a grammatical operation at the positional level must have added it."
        ]
      }
    ],
    "aphasias-09": [
      {
        "text": "Popular theories of **sentence processing** hold that **the syntactic structure of a sentence is computed independently of meaning** while we listen or read. An autonomous parser builds the structure first, and meaning comes after.",
        "children": []
      },
      {
        "text": "**Isolating these “parsing” mechanisms requires carefully constructing stimulus materials**.",
        "children": [
          "In **“The burglar blew open the safe with the dynamite,”** the **preferred** structure attaches “with the dynamite” to the **verb phrase**, making the dynamite the instrument.",
          "The **unpreferred** structure attaches it to the **noun phrase** “the safe,” so the phrase tells which safe.",
          "The words are identical in both readings and only the attachment differs, so sentences like this can probe parsing without changing word meanings."
        ]
      },
      {
        "text": "**One possibility** is that **Broca’s patients generally understand what is being said even though they have a core grammatical deficit**.",
        "children": [
          "In everyday conversation, word meanings, familiar events and context all point to one message.",
          "A listener can follow along using these cues without fully computing the grammar.",
          "A real test of a parsing deficit needs sentences whose grammatical relations cannot be guessed from the likeliest event, such as reversible sentences where either person could plausibly do the action."
        ]
      }
    ],
    "aphasias-10": [
      {
        "text": "**None of this theory was available to Broca back in the 1860s**, and for him it was remarkable enough to **dissociate “articulate speech” from comprehension**.",
        "children": [
          "Leborgne could say only one syllable but seemed to understand what was said to him.",
          "Proving that speaking and understanding can separate was the central result of its time."
        ]
      },
      {
        "text": "The modern question is different. Suppose the goal is to show that **some patients have a difficulty that is more generally with syntax**.",
        "children": [
          "A **syntactic impairment** affects how grammatical relationships are organized.",
          "Such an impairment should disrupt both producing and understanding sentences."
        ]
      },
      {
        "text": "The way to find out is to **test comprehension**.",
        "children": [
          "A comprehension test lets the patient answer without speaking, which removes motor problems from the picture.",
          "If the patient still struggles to understand grammatical relationships, the deficit goes beyond articulation."
        ]
      }
    ],
    "aphasias-11": [
      {
        "text": "Finding out whether **Broca’s patients have comprehension deficits** mattered for several reasons.",
        "children": [
          "**Broca’s aphasia is almost always accompanied by some level of motor dysfunction**.",
          "Agrammatic speech might **merely reflect an attempt to communicate despite motor limitations**. When speaking takes great effort, a patient might drop the small grammatical words and keep only the most informative content words."
        ]
      },
      {
        "text": "**Hughlings Jackson** made a related point, that **we are observing what the individual can do despite the impairment**.",
        "children": [
          "A brain injury that produces agrammatic speech does not literally mean that **the grammar itself is injured**.",
          "Caramazza and Zurif (1976) cite a version of this idea from Lenneberg (1973). If anterior damage leaves the patient’s tacit knowledge of language intact, the telegraphic output can be blamed on a neuromuscular problem, because **the strain of speaking is so great that the patient speaks asyntactically in order to economize effort**."
        ]
      },
      {
        "text": "**Chomsky’s distinction between competence and performance** applies here too.",
        "children": [
          "**Competence** is a speaker’s underlying knowledge of language.",
          "**Performance** is the use of that knowledge in speaking or understanding, which memory limits, distraction or motor problems can disrupt.",
          "**When motor deficits obviously interfere with performance, comprehension may provide a clearer window into competence**."
        ]
      },
      {
        "text": "**Caramazza and Zurif (1976)** therefore tested comprehension in Broca’s patients, since speech alone cannot separate the two explanations.",
        "children": [
          "If these patients understand grammar normally, their agrammatic speech is a motor performance problem.",
          "If they also fail to understand grammatical relationships, the deficit reaches the grammar itself."
        ]
      }
    ],
    "aphasias-12": [
      {
        "text": "**“Man bites dog”** is the classic newspaper example of an unexpected event. **Psycholinguistic tests** are needed to reveal grammatical problems in comprehension, because **in conversation, there are lots of redundant cues to what a speaker intends**. **Redundant** cues are separate sources of information that all point to the same meaning.",
        "children": []
      },
      {
        "text": "**“The dog bit the man”** offers **many ways to get the right meaning**.",
        "children": [
          "A listener can build the **most likely combination of DOG, BITE and MAN into an event representation**, **with or without syntax**, since dogs bite people far more often than the reverse.",
          "The sentence also uses **canonical word order**, **agent, then verb, then undergoer**, which is **subject, then verb, then object**. The **agent** performs the action and the **undergoer** receives it, and in English the first noun is usually the agent.",
          "Much comprehension also takes place in a **discourse context**, the surrounding conversation, which clears up a great deal."
        ]
      },
      {
        "text": "Broca’s patients might understand by leaning on these **compensatory heuristics**. A **heuristic** is a mental shortcut, and a compensatory one covers for a weakness somewhere else.",
        "children": [
          "A patient could just assume the most plausible event, or assume the first noun is the doer.",
          "Either shortcut handles “The dog bit the man” with no grammatical analysis."
        ]
      },
      {
        "text": "Testing grammar directly takes sentences that defeat the shortcuts, such as **“The dog that the man is biting is angry.”** The **man** is the biter, although the dog comes first and dogs are likelier biters, so only grammatical analysis gives the right answer.",
        "children": []
      }
    ],
    "aphasias-13": [
      {
        "text": "**Caramazza and Zurif** wrote **a list of exactly this kind of sentence, along with a set of control sentences**, organized in four groups of eight.",
        "children": [
          "**A. Control sentences** are simple and in canonical order, such as **“The girl is kicking a green ball,” “The cat is chasing a blue bird”** and **“The boy is riding a new bicycle.”**"
        ]
      },
      {
        "text": "**B. Center-embedded sentences with semantic constraints** put one clause inside another, but meaning makes the roles obvious. A **center-embedded** sentence has a relative clause in the middle of the main clause.",
        "children": [
          "Examples are **“The apple that the boy is eating is red,” “The wagon that the horse is pulling is green”** and **“The balloon that the clown is holding is round.”** Apples cannot eat boys, so meaning alone reveals who does what."
        ]
      },
      {
        "text": "**C. Reversible center-embedded sentences** have two participants who could each sensibly do the action.",
        "children": [
          "Examples are **“The cow that the monkey is scaring is yellow,” “The horse that the bear is kicking is brown”** and **“The girl that the boy is tickling is happy.”** Meaning offers no help, so only grammar reveals the roles."
        ]
      },
      {
        "text": "**D. Improbable center-embedded sentences** describe events that run against expectations.",
        "children": [
          "Examples are **“The bird that the worm is eating is blue,” “The man that the horse is riding is fat”** and **“The policeman that the robber is chasing is skinny.”** Common sense points to the wrong answer."
        ]
      },
      {
        "text": "In every embedded sentence, the first noun is acted on, and the doer sits inside the relative clause.",
        "children": [
          "A listener who relies on meaning should pass groups A and B and fail C and D.",
          "A listener who parses normally should pass all four."
        ]
      }
    ],
    "aphasias-14": [
      {
        "text": "Caramazza and Zurif used a **sentence-picture matching task**, in which a listener hears a sentence and picks the picture that fits it.",
        "children": [
          "Accuracy reveals whether the listener grasped who did what to whom, with no spoken answer required.",
          "Healthy listeners and patients with Broca’s, conduction and Wernicke’s aphasia each heard all four sentence types."
        ]
      },
      {
        "text": "**Healthy controls are more or less equally good at all stimulus types**, scoring near the top on each one.",
        "children": []
      },
      {
        "text": "**Wernicke’s patients are poor overall**.",
        "children": [
          "They do badly even on the simple control sentences.",
          "That likely reflects their **general comprehension deficits**, which reach word meanings as well as grammar."
        ]
      },
      {
        "text": "**Broca’s patients** have a **particular difficulty keeping “who did what to whom” straight** when **syntax conflicts with common sense** or with the likely semantic roles of the nouns.",
        "children": [
          "They do well on control sentences and on semantically constrained sentences, where meaning gives the answer away.",
          "They do poorly on reversible and improbable sentences, where only grammar can settle the roles."
        ]
      },
      {
        "text": "This **specific comprehension deficit** was read as evidence that **Broca’s aphasia affects syntax specifically**.",
        "children": [
          "Because the trouble shows up in understanding as well as speaking, it lies in the grammar itself.",
          "The paper’s title, “Dissociation of algorithmic and heuristic processes,” sums it up. Broca’s patients lose the **algorithmic** route of grammatical analysis and keep the **heuristic** shortcuts that run on meaning."
        ]
      }
    ],
    "aphasias-15": [
      {
        "text": "A more **specific theory of the “parts of language”** creates **new ways of exploring structure-function relationships**, meaning links between a brain structure and the function it supports.",
        "children": []
      },
      {
        "text": "**Rather than just dividing aphasics into those with good and poor comprehension, or those who are more or less fluent**, researchers can **isolate problems with particular aspects of language**.",
        "children": [
          "One patient might know word meanings well but assign the wrong roles in complex sentences.",
          "Another might produce a fluent grammatical frame filled with words that miss the intended message.",
          "A single fluency score would hide the difference between them."
        ]
      },
      {
        "text": "The central division is **the grammar versus the lexicon**.",
        "children": [
          "**Grammar** covers the rules that relate words to one another within a sentence.",
          "The **lexicon** covers stored words and the ability to retrieve the right one."
        ]
      },
      {
        "text": "This division yields specific predictions, and controlled tasks can connect an impaired operation to a particular brain region.",
        "children": [
          "A grammar deficit predicts trouble with reversible sentences but not with word meanings.",
          "A lexical deficit predicts trouble with word meanings and naming but not with grammatical structure."
        ]
      }
    ],
    "aphasias-16": [
      {
        "text": "The dichotomy runs into **problems**. **Dick and colleagues** had participants hear **four types of sentences** and **indicate which animal was doing the action**.",
        "children": [
          "A dog and a cat were pictured on a screen, and participants pressed a button to pick the animal.",
          "The event was always a dog biting a cat, while the sentence structure varied."
        ]
      },
      {
        "text": "Two sentence types put the doer first.",
        "children": [
          "**Active**, as in **“The dog is biting the cat.”**",
          "**Subject cleft**, as in **“It’s the dog that is biting the cat.”** A **cleft** sentence breaks a simple sentence apart with “It’s … that” to focus on one part, and in a subject cleft the focused noun is the doer.",
          "For both types, picking the first animal mentioned gives the right answer."
        ]
      },
      {
        "text": "Two types put the receiver of the action first.",
        "children": [
          "**Object cleft**, as in **“It’s the cat that the dog is biting,”** where the focused noun is the one bitten.",
          "**Passive**, as in **“The cat is bitten by the dog,”** where the receiver becomes the grammatical subject.",
          "For both, the first-animal shortcut fails. Only a listener who parses the grammar succeeds on all four types."
        ]
      }
    ],
    "aphasias-17": [
      {
        "text": "When **aphasia patients and healthy aging controls** do this task, **a pattern emerges much like what Caramazza and Zurif observed**. Patients were grouped by type of aphasia using the Western Aphasia Battery.",
        "children": [
          "**Elderly controls** were nearly perfect on all four sentence types.",
          "**Anomic** patients, whose main problem is finding words, were fairly accurate on actives and subject clefts but dropped on object clefts and passives.",
          "**Conduction** aphasia patients dropped sharply on object clefts.",
          "**Wernicke’s** patients scored low on every sentence type, near chance."
        ]
      },
      {
        "text": "**Broca’s aphasia patients have particular difficulty with the syntactically complex stimuli**, the object clefts and passives.",
        "children": [
          "On object clefts, they were barely above chance.",
          "These are **noncanonical** structures, meaning they depart from the usual doer-first order."
        ]
      },
      {
        "text": "**Their performance is overall not so great**, however.",
        "children": [
          "Even on simple active sentences, Broca’s patients were well below the elderly controls.",
          "The pattern combines a general drop in performance with an extra cost for complex structures. The groups differ in both their overall accuracy and the size of that extra cost."
        ]
      }
    ],
    "aphasias-18": [
      {
        "text": "The same task was given to **healthy undergraduates** under **conditions that stress the language system** in different ways. **Stress conditions** included **speeding up the speech**, adding noise, and **asking people to remember lists of numbers as a secondary task**.",
        "children": [
          "**Compressed** speech is speech played faster than normal.",
          "A **low-pass filter** removes the higher frequencies from speech, making it sound muffled.",
          "**Auditory digits** and **visual digits** are number lists that participants had to remember while listening, which uses up memory resources."
        ]
      },
      {
        "text": "With a single stressor, accuracy stayed high on actives and subject clefts.",
        "children": [
          "Object clefts suffered most, especially under noise.",
          "Passives also dropped somewhat."
        ]
      },
      {
        "text": "When two stressors were combined, the effects grew larger.",
        "children": [
          "With muffled speech that was also sped up, students stayed accurate on actives and subject clefts.",
          "On object clefts and passives, their accuracy fell to about two thirds."
        ]
      },
      {
        "text": "**Object cleft and passive sentences are particularly vulnerable to all the manipulations**, the same pattern found in Broca’s aphasia. These students have no brain damage, so stressing their processing system is enough to produce an aphasia-like profile.",
        "children": [
          "This suggests that **the comprehension deficits in Broca’s aphasia may be a “performance” issue after all**.",
          "Complex structures may need more processing resources, so any reduction in resources hurts them first. The patients may keep their grammatical knowledge but lack the resources to use it well."
        ]
      }
    ],
    "aphasias-19": [
      {
        "text": "A further question is whether **Broca’s aphasics’ comprehension deficits are language-specific**. **Saygin and colleagues (2004)** asked patients to **match an action to an object**.",
        "children": [
          "In the **non-linguistic** version, a drawing has a boy pantomiming an action, such as licking. Participants chose the matching object from pictures such as an ice cream cone, a cake, broccoli and a rooster.",
          "In the **linguistic** version, the action was given in words rather than by pantomime."
        ]
      },
      {
        "text": "Controls were nearly perfect in both versions. Aphasic patients made more errors in both.",
        "children": [
          "In the non-linguistic version, controls scored **98.5%** and patients **93.4%**.",
          "In the linguistic version, controls scored **99.4%** and patients **87.5%**.",
          "**Broca’s aphasics had difficulty with this task whether the stimuli were linguistic or not**."
        ]
      },
      {
        "text": "Accuracy also depended on the kind of wrong choice offered, called the **distractor**.",
        "children": [
          "Patients made the most errors when the distractor was **semantic**, meaning related in meaning to the correct object.",
          "They made fewer errors with **unrelated** distractors and with **affordance-based** distractors. An **affordance** is an action an object allows, such as a different object that can also be licked."
        ]
      },
      {
        "text": "The nonverbal version removes language from the input but keeps meaning in the task. A pantomimed action has to be understood and linked to the right object, much as a verb is linked to its object.",
        "children": [
          "A purely grammatical deficit predicts good performance on the nonverbal version.",
          "Difficulty on that version points to a broader problem with action meanings, shared with language."
        ]
      }
    ],
    "aphasias-20": [
      {
        "text": "**Performance in the non-verbal version of this task was significantly correlated with damage to Broca’s area**. Damage linked to deficits in **non-linguistic pantomime interpretation** clustered in the left frontal region in front of the **central sulcus**, which includes Broca’s area.",
        "children": []
      },
      {
        "text": "The task asked participants only to interpret a pantomimed action and pick an object.",
        "children": [
          "No sentence had to be produced.",
          "No spoken instruction had to be parsed."
        ]
      },
      {
        "text": "Damage to Broca’s area therefore affects more than syntax.",
        "children": [
          "Patients with damage there can have trouble linking an action to its meaning even when no language is involved.",
          "Any account of Broca’s area must explain the grammatical comprehension findings and this nonlinguistic difficulty with actions together."
        ]
      }
    ],
    "aphasias-21": [
      {
        "text": "A parallel question is whether **Wernicke’s aphasics’ comprehension deficits are language-specific**. **Saygin and colleagues** asked patients to **match environmental sounds to pictures**.",
        "children": [
          "In the **nonverbal** version, a speaker plays an environmental sound, such as a cow mooing, and participants choose between pictures, such as a cow and a sheep.",
          "In the **verbal** version, the speaker plays a spoken phrase, such as **“cow mooing,”** and participants choose between pictures, such as a cow and a violin."
        ]
      },
      {
        "text": "The groups differed in overall accuracy.",
        "children": [
          "Controls, patients with **right hemisphere damage** and anomic patients were all nearly perfect.",
          "Broca’s patients were a little less accurate.",
          "**Wernicke’s patients were particularly bad at this task**, scoring **90.0% verbal** and **91.3% nonverbal**."
        ]
      },
      {
        "text": "**No significant difference was observed between the verbal and nonverbal versions**.",
        "children": [
          "Wernicke’s patients struggled just as much with an animal call as with a spoken phrase.",
          "The deficit therefore goes beyond understanding spoken words. Their difficulty concerns linking sounds of any kind to their meanings, whether the meaning arrives through language or through ordinary sounds."
        ]
      }
    ],
    "aphasias-22": [
      {
        "text": "**Deficits in both verbal and nonverbal sound-picture matching are associated with Wernicke’s area**.",
        "children": [
          "Eight patients were **impaired in the nonverbal version**, and ten were **impaired in the verbal version**.",
          "In both groups, the damage most often overlapped in the posterior temporal area of the left hemisphere, around Wernicke’s area."
        ]
      },
      {
        "text": "The verbal and nonverbal impairments therefore come from damage to the same general region.",
        "children": [
          "A spoken phrase carries meaning through words.",
          "An animal call carries meaning without language."
        ]
      },
      {
        "text": "Both tasks demand the same thing, connecting meaningful sounds to what they stand for. Wernicke’s area seems to support meaningful sound processing in general, and language is one important case of it.",
        "children": []
      }
    ],
    "aphasias-23": [
      {
        "text": "**How language-specific are the deficits in aphasia?** The question is **still a controversy**.",
        "children": [
          "Some patients are especially vulnerable to complex grammatical structures, which suggests that some parts of language are handled in specialized ways.",
          "The same patients can also struggle with action meanings or environmental sounds in tasks with no language, which suggests that language shares brain systems with other kinds of meaning.",
          "A full explanation has to cover both kinds of result."
        ]
      },
      {
        "text": "What is clear is **how the terms of the debate have evolved**. The field now relies on three kinds of tools.",
        "children": [
          "**Relatively sophisticated tests that tap specific aspects of language**, such as reversible and improbable sentences, cleft sentences and nonverbal matching tasks.",
          "**Quantitative analyses of behavior**, measuring accuracy across sentence types, patient groups and stress conditions.",
          "**Quantitative analyses of structure-function relationships**, relating patterns of brain damage to performance across many patients."
        ]
      },
      {
        "text": "These methods have come **a long way from the 19th century**.",
        "children": [
          "Wernicke and Lichtheim built boxes and arrows from a handful of individual cases.",
          "Modern research can test which specific operations are impaired and map those impairments onto damaged tissue across large patient groups."
        ]
      }
    ],
    "aphasias-24": [],
    "aphasias-25": [
      {
        "text": "**Structure-function relationships** in aphasia can be **formalized** with MRI data. **Voxel-based lesion-symptom mapping**, from Bates, Wilson, Saygin, Dick, Sereno, Knight and Dronkers, relates where the brain is damaged to how severe the symptoms are across many patients.",
        "children": [
          "A **voxel** is a small three-dimensional unit of an MRI image, a kind of 3D pixel.",
          "At each voxel, patients with damage there are compared with patients without it.",
          "If the damaged patients score much worse, that voxel is linked to the symptom."
        ]
      },
      {
        "text": "The **“symptoms”** are **defined very broadly**.",
        "children": [
          "**Fluency deficits** are linked most strongly to damage toward the front of the left hemisphere.",
          "**Comprehension deficits** are linked most strongly to damage farther back, in the posterior temporal region."
        ]
      },
      {
        "text": "**Data from a large number of patients is consistent with a rough double dissociation**.",
        "children": [
          "**Posterior regions** are associated with **perception**, or comprehension.",
          "**Anterior regions** are associated with **production**, or fluency.",
          "Every patient supplies a damage pattern and a continuous score, so the method turns many single cases into one statistical map that ties brain location to symptoms."
        ]
      }
    ],
    "development1-01": [],
    "development1-02": [
      {
        "text": "**Nature and nurture in child language** asks how much of language comes from built-in capacities and how much comes from experience. **“Nativist” positions** arose from **Chomsky’s critique of Skinner**.",
        "children": [
          "**Skinner**, a behaviorist, explained behavior, language included, with general learning mechanisms such as reward and punishment.",
          "**Chomsky** argued that those mechanisms could not account for how children acquire grammar."
        ]
      },
      {
        "text": "For Chomsky, **the important feature of language is its generativity**. **Generativity** is the capacity to produce and understand an unlimited number of new sentences.",
        "children": [
          "**Acquiring a language** therefore means **identifying the abstract grammar that produces the sentences of the language**."
        ]
      },
      {
        "text": "The **general learning mechanisms studied by behaviorists were not up to this task**, for two reasons.",
        "children": [
          "**Grammatical and ungrammatical sentences are not “similar” in any straightforward way**. One small change can make a sentence ungrammatical, and two grammatical sentences can look nothing alike.",
          "**The context for language acquisition does not look like operant conditioning**. **Operant conditioning** shapes behavior with rewards and punishments that follow it. Children are not dependably rewarded for grammatical sentences or punished for ungrammatical ones, so the **reward and punishment contingencies do not hold**."
        ]
      },
      {
        "text": "**Nativist approaches** make two claims instead.",
        "children": [
          "Children have **innate knowledge of what language is like**, known as **Universal Grammar**, a built-in set of principles that limits the grammars a child will consider.",
          "Children rely on **language-specific acquisition processes**, learning mechanisms built specifically for language."
        ]
      },
      {
        "text": "In Chomsky’s words, **“The fact that all normal children acquire essentially comparable grammars of great complexity with remarkable rapidity suggests that human beings are somehow specially designed to do this, with data-handling or ‘hypothesis-formulating’ ability of unknown character and complexity.”**",
        "children": [
          "Typical children reach a complex grammar quickly, even though their experiences differ widely."
        ]
      }
    ],
    "development1-03": [
      {
        "text": "**Categorical perception** is the pattern in which listeners hear differences between speech sounds in terms of categories. **Early theories treated it as a language-specific and species-specific phenomenon**.",
        "children": [
          "**Language-specific** means it was thought to occur only for language. **Species-specific** means it was thought to occur only in humans.",
          "At the time, **only humans were known to show categorical perception, and only for speech sounds**, so it looked like a unique feature of human language."
        ]
      },
      {
        "text": "The classic evidence comes from a synthetic consonant continuum. The upper formant transition changes in equal steps from one stimulus to the next, while everything else stays the same.",
        "children": [
          "In **labeling**, listeners switch sharply from **/b/** to **/d/**, and later from /d/ to **/g/**, each over just a step or two.",
          "In **discrimination**, accuracy peaks near those boundaries and drops inside each category, whether the pairs are one, two or three steps apart."
        ]
      },
      {
        "text": "Categorical perception is **a compelling example of how similarity between stimuli is defined in linguistic, rather than physical, terms**.",
        "children": [
          "Two sounds that differ by the same acoustic amount can sound almost identical if they belong to the same category.",
          "They can sound clearly different if they fall on opposite sides of a category boundary."
        ]
      }
    ],
    "development1-04": [
      {
        "text": "**Categorical perception in infants** can be measured through behaviors that change when an infant notices something new. Head turns and sucking reveal what an infant hears without the infant saying anything.",
        "children": []
      },
      {
        "text": "In the **conditioned head turn procedure**, used in Janet Werker’s infant studies lab, an infant learns to turn toward a sound when it changes.",
        "children": [
          "The infant sits on a parent’s lap while an experimenter holds the infant’s attention forward with toys.",
          "A correct head turn after a change earns an interesting visual reward, such as a lit-up moving toy.",
          "Once the infant has learned this link, turning after a sound change means the infant heard the change."
        ]
      },
      {
        "text": "**High-amplitude sucking** relies on infants’ natural interest in novelty.",
        "children": [
          "The infant sucks on a pacifier attached to a pressure recorder, and strong sucks make a sound play.",
          "As the same sound repeats, the infant grows used to it, which is **habituation**, and sucking slows.",
          "If a new sound makes sucking **increase again**, the infant has noticed the change."
        ]
      },
      {
        "text": "Neither method asks the infant to name or produce a sound. The experimenter decides exactly which acoustic difference is presented, and a head turn or renewed sucking reveals whether infants hear the same distinctions adults hear.",
        "children": []
      }
    ],
    "development1-05": [
      {
        "text": "**Eimas and colleagues (1971)** tested categorical perception in **4-month-old infants** using **high-amplitude sucking**. The sounds varied in **voice onset time**, or **VOT**, the delay between the release of a stop consonant and the start of vocal fold vibration.",
        "children": [
          "In a syllable with a long VOT, voicing starts much later after the release than in a syllable with a short VOT."
        ]
      },
      {
        "text": "The experiment had **three conditions**. Infants heard a syllable over and over until their sucking slowed down, and then the sound either changed or stayed the same.",
        "children": [
          "In **20D**, the two sounds differed by **20 milliseconds** of VOT, **+20 versus +40 milliseconds**, and came from **different adult phonemic categories**.",
          "In **20S**, the sounds also differed by **20 milliseconds**, such as **−20 versus 0** or **+60 versus +80 milliseconds**, but came from the **same** category.",
          "In **0**, the **control** condition, the same sound continued throughout."
        ]
      },
      {
        "text": "In every condition, sucking rose at first and then declined as the sound became familiar.",
        "children": [
          "In **20D**, sucking jumped back up after the change.",
          "In **20S**, sucking showed little recovery and kept falling.",
          "In the control condition, sucking kept declining."
        ]
      },
      {
        "text": "Infants responded to a change that crossed an adult phoneme boundary but not to an equally large change within a category.",
        "children": [
          "The two changed conditions were matched in acoustic size, so the difference comes from crossing the boundary.",
          "The control condition establishes what happens with repetition alone."
        ]
      }
    ],
    "development1-06": [
      {
        "text": "Eimas’s result was **a big deal** for several reasons. **Categorical perception was considered to be the first step in turning speech into a symbolic format** that later stages of language processing could use.",
        "children": [
          "A **symbolic** format stores a sound as a category, such as /b/.",
          "Finding this ability in infants suggested that the starting point for processing language was already present."
        ]
      },
      {
        "text": "**Four-month-olds are really little**. Typical **gross motor milestones** at this age are **manipulating objects with two hands** and **holding the head and chest up while lying prone**, that is, lying face down.",
        "children": [
          "Gross motor skills involve large movements of the body."
        ]
      },
      {
        "text": "Their **color vision and general visual acuity are still “in progress.”** **Visual acuity** means sharpness of vision.",
        "children": [
          "Basic perception in other areas is still developing."
        ]
      },
      {
        "text": "Four-month-olds are also **just starting to produce vowel-like sounds instead of creaky whines**, and they cannot yet make speech sounds well.",
        "children": []
      },
      {
        "text": "That is **very, very early in development for an apparently language-specific ability to emerge**, so it **seemed like evidence for innateness**.",
        "children": [
          "Infants sort speech sounds into categories before they can produce them and while other skills are immature.",
          "Because speech categorization ran so far ahead of other abilities, it looked built in instead of learned through long experience."
        ]
      }
    ],
    "development1-07": [
      {
        "text": "**“Perceptual narrowing”** for speech categories is the decline in sensitivity to sound distinctions that are not used in the language a child hears. **At around six months, English-learning infants show evidence of discriminating speech contrasts they have never heard before**. **Over the course of development, the ability to perceive these contrasts declines**.",
        "children": [
          "**Werker and Tees** tested English-learning infants on two non-English contrasts.",
          "The **Hindi contrast** is a distinction between two “ta”-like sounds. The **Salish contrast** is a distinction between “ki” and “qi” from Nthlakampx, a Salish language."
        ]
      },
      {
        "text": "The measure was the share of infants at each age who reached a **discrimination criterion**.",
        "children": [
          "At **6–8 months**, most English-learning infants discriminated both contrasts.",
          "At **8–10 months**, fewer did.",
          "At **10–12 months**, only a small minority did.",
          "**Hindi- and Salish-learning infants** discriminated their own native contrast nearly every time."
        ]
      },
      {
        "text": "This is **perceptual reorganization during the first year of life**.",
        "children": [
          "Without experience of a contrast, English-learning infants lose much of their ability to hear it by about their first birthday.",
          "Infants who hear the contrast in their language keep it, so the decline depends on language experience."
        ]
      },
      {
        "text": "This raises the question of **how perceptual narrowing relates to categorical perception**.",
        "children": [
          "As infants form the categories of their native language, sounds that their language groups together become harder to tell apart.",
          "A nonnative distinction that falls within one native category comes to be heard as a within-category difference."
        ]
      }
    ],
    "development1-08": [
      {
        "text": "These findings support **a very compelling narrative**.",
        "children": [
          "**Speech perception depends on categorical perception abilities that are a special property of the language system**.",
          "**These abilities are present very early in development**, according to the infant studies."
        ]
      },
      {
        "text": "**Children start off as “citizens of the world,”** able to hear **all** contrasts, which means **they have innate, language-general knowledge about speech**.",
        "children": [
          "**Language-general** knowledge applies to the speech sounds of every language.",
          "Calling infants “citizens of the world” captures the idea that a newborn is ready for any human language.",
          "Children then **rapidly tune their perceptual systems to the specific language in their environment**."
        ]
      },
      {
        "text": "In this narrative, **the role of learning is to select** among many **innately specified phonetic contrasts** and **narrow down the inventory** to those that are **meaningful in the child’s native language**.",
        "children": [
          "The **inventory** is the full set of phonetic contrasts the child can perceive.",
          "Learning works by elimination. It drops the contrasts the native language does not use and keeps the innate categories the language needs."
        ]
      }
    ],
    "development1-09": [
      {
        "text": "This view faces **some problems**. Three concern **categorical perception**.",
        "children": [
          "Categorical perception is **not limited to language**, since it also appears for nonspeech sounds.",
          "Categorical perception is **not limited to humans**, since animals without language also perceive speech sounds categorically.",
          "Categorical perception is **task-dependent**. Results look more or less categorical depending on the task, such as naming a sound versus judging whether two sounds differ."
        ]
      },
      {
        "text": "Another concerns **infant speech perception**, which is **not actually “universal.”**",
        "children": [
          "Infants do not begin able to hear every contrast equally well.",
          "Some contrasts are hard for young infants to detect, even contrasts that occur in their own language."
        ]
      },
      {
        "text": "Taken together, these problems weaken the claim that every speech distinction is innately available in a mechanism used only for language. A full account of development has to explain contrasts that get better with experience as well as contrasts that are lost, so learning must build categories as well as remove them.",
        "children": []
      }
    ],
    "development1-10": [
      {
        "text": "**Cutting and Rosner (1974)** tested categorical perception with **non-speech sounds**. The sounds varied in **rise time**, which is how quickly a sound grows to full loudness after it starts.",
        "children": [
          "A **short rise time** produces a sound like a **plucked** string.",
          "A **long rise time** produces a sound like a **bowed** string."
        ]
      },
      {
        "text": "The stimuli included **sawtooth waves**, **speech syllables** and **sine waves**, each made with short and long rise times, such as **10** and **70 milliseconds**.",
        "children": [
          "With a short rise, the sound reaches full strength almost at once.",
          "With a long rise, it builds up gradually."
        ]
      },
      {
        "text": "For the sawtooth waves, listeners called short rise times pluck and long rise times bow, with a fairly sharp switch in the middle of the range.",
        "children": [
          "Discrimination was only a little above chance for most pairs.",
          "It **peaked** for the pairs right where the labels switched."
        ]
      },
      {
        "text": "The link between a label boundary and better discrimination appears for a sound distinction that has nothing to do with phonemes.",
        "children": [
          "Pluck and bow are labels for kinds of sound onset, not speech categories.",
          "Categorical perception can therefore arise in general auditory processing, without a mechanism specific to language."
        ]
      }
    ],
    "development1-11": [
      {
        "text": "**Jusczyk and colleagues (1977)** tested whether **infants** show categorical perception of **non-speech sounds**, using high-amplitude sucking.",
        "children": [
          "Infants heard a sound over and over until their sucking slowed down.",
          "The sound was then changed, and three conditions were compared."
        ]
      },
      {
        "text": "The conditions were **no change**, a change **within categories**, and a change **between categories**.",
        "children": [
          "In all three, sucking declined before the change as the sound became familiar.",
          "After no change, sucking stayed low.",
          "After a change within a category, sucking also stayed low.",
          "After a change between categories, sucking jumped back up, then declined again as the new sound became familiar."
        ]
      },
      {
        "text": "Infants responded more strongly to a non-speech change that crossed a category boundary than to a change within a category.",
        "children": [
          "This is the same pattern Eimas and colleagues found for speech.",
          "Adults show categorical labeling for plucked and bowed sounds, and infants show categorical discrimination for nonspeech changes. Neither group needs language knowledge, so early categorical perception reflects a general auditory ability."
        ]
      }
    ],
    "development1-12": [
      {
        "text": "**Chinchillas** also show categorical perception of **speech sounds**, following **Ohlemiller and colleagues (1999)** and the earlier work of **Kuhl and Miller (1975)**. The animals were trained using **operant conditioning**, a form of learning in which a behavior becomes more likely when it is followed by a reward.",
        "children": [
          "Each chinchilla learned that either the **0-millisecond lag** sound or the **80-millisecond lag** sound was an **SD** for food. **SD** stands for **discriminative stimulus**, a signal that a response will be rewarded.",
          "The lag is the **voice onset time**. Humans hear a 0-millisecond lag as /ga/ and an 80-millisecond lag as /ka/."
        ]
      },
      {
        "text": "After training, the animals were tested with sounds in between, all along the **/ga/–/ka/** continuum, and human listeners heard the same sounds.",
        "children": [
          "Short VOTs were labeled /ga/ almost every time, and long VOTs almost never.",
          "The switch happened over a narrow range of VOTs, and the chinchilla curves had the same steep, categorical shape as the human curves."
        ]
      },
      {
        "text": "**Increasing the intensity of the burst and aspiration noise** shifted the category boundary to a **shorter VOT**, made the switch steeper, or both, for one chinchilla and one human listener.",
        "children": [
          "The **burst** is the brief noise at the release of a stop, and **aspiration** is the breathy noise that follows a voiceless release.",
          "Both species responded to these sound properties in a similar way.",
          "Animals without language sort a speech continuum into categories, so categorical perception of speech is shared with other species."
        ]
      }
    ],
    "development1-13": [
      {
        "text": "According to **Narayan and colleagues (2010)**, **some contrasts are less salient than others for infants**. A **salient** contrast is easy to notice.",
        "children": [
          "The contrasts tested use **nasal consonants** at the start of a syllable, the **onset**.",
          "They differ in **place of articulation**, the spot in the mouth where the sound is made. **/m/** uses the lips, **/n/** uses the tongue just behind the teeth, and **/ŋ/**, the last sound of “sing,” uses the back of the tongue against the soft palate."
        ]
      },
      {
        "text": "Infants heard either the same syllable repeated or a syllable that switched, and longer looking at a switch meant they noticed it.",
        "children": [
          "English-hearing infants at **4–5 months** noticed the native **[ma]–[na]** switch.",
          "The same infants did not notice the nonnative **[na]–[ŋa]** switch."
        ]
      },
      {
        "text": "A **place contrast for nasals in onset**, **/na/–/ŋa/**, is **not readily perceived by four-month-olds, independent of language experience**.",
        "children": [
          "By comparison, **/ma/–/na/** is **relatively salient**.",
          "The gap comes from the sounds themselves. Some contrasts start out harder to hear than others, which undercuts the idea that every contrast begins equally available."
        ]
      }
    ],
    "development1-14": [
      {
        "text": "**Narayan and colleagues (2010)** found that **between 6 and 10 months, exposure to the /na/–/ŋa/ contrast in a Filipino language environment increases its salience**. Filipino treats [na] and [ŋa] as different syllables, so infants learning Filipino hear the contrast often.",
        "children": [
          "At **6–8 months**, Filipino-learning infants did not yet notice the switch.",
          "At **10–12 months**, they did.",
          "English-hearing infants at 4–5 months missed this contrast while still noticing [ma]–[na]."
        ]
      },
      {
        "text": "**It cannot be that all speech contrasts are available innately**.",
        "children": [
          "Sensitivity to [na]–[ŋa] starts out weak, even in infants whose language uses it.",
          "Hearing the contrast over the first year makes it easier to detect."
        ]
      },
      {
        "text": "**Exposure to contrasts in the environment is necessary for acquisition in some cases**.",
        "children": [
          "Learning can strengthen a contrast, not only keep it.",
          "Development therefore involves building sensitivity to hard contrasts, beyond choosing from a complete innate set, and experience actively shapes speech categories."
        ]
      }
    ],
    "development1-15": [
      {
        "text": "The **emergentist approach** is the main alternative to nativism. **Emergentist approaches assume that associative learning mechanisms are sensitive to statistical regularities in the environment**.",
        "children": [
          "**Associative learning** means learning that two things go together because they keep occurring together.",
          "**Statistical regularities** are patterns in how often things occur and what occurs with what.",
          "On this view, the structure of language emerges from general learning mechanisms applied to these patterns in rich input."
        ]
      },
      {
        "text": "Classical conditioning is the simplest case of associative learning. It can be described with three neurons, one for a **bell**, one that detects **food** and one that triggers **salivation**.",
        "children": [
          "The food detector already has a strong link to salivation, so food causes salivation.",
          "When the bell keeps occurring along with food, the **synapse** joining the bell neuron to the salivation neuron is **strengthened**. A synapse is a connection between neurons.",
          "After enough pairings, the bell alone triggers salivation."
        ]
      },
      {
        "text": "The question is **how this can extend beyond conditioning to support learning for pattern recognition**. **Pattern recognition** means identifying a recurring structure, such as a speech sound, across many varied examples.",
        "children": [
          "The same strengthening could link acoustic features that tend to occur together.",
          "Repeated co-occurrence in speech could then build categories that were never specified in advance. Infants would learn categories by keeping track of which sounds occur together and how often."
        ]
      }
    ],
    "development1-16": [
      {
        "text": "The **American vowels** give an example of statistical regularities. When **Kuhl and others** talk about **learning the statistics of distributions in the environment**, they mean patterns like these. A **distribution** describes how often each value turns up across many examples.",
        "children": []
      },
      {
        "text": "Each English vowel, measured by its **first** and **second formants** over many productions, occupies a region of **vowel space**.",
        "children": [
          "The regions **overlap** heavily, so a single pair of formant values can belong to more than one vowel.",
          "That overlap is what makes speech categorization hard. Listeners must learn where each vowel is centered and how widely it varies."
        ]
      },
      {
        "text": "**We might learn the vowels of our language by extracting the statistics of these distributions**.",
        "children": [
          "Across many exposures, the listener keeps track of where each vowel’s productions cluster.",
          "The resulting categories mirror the shape of the input."
        ]
      },
      {
        "text": "A **“prototypical” /a/** would then be **just the mean, or perhaps the mode, of the distribution of all the /a/ sounds we hear**.",
        "children": [
          "The **mean** is the average value.",
          "The **mode** is the most frequent value.",
          "Either way, the prototype grows out of experience, so it can differ between languages and between listeners."
        ]
      }
    ],
    "development1-17": [
      {
        "text": "**Maye and colleagues** tested whether infants actually learn from distributions. They had infants **listen passively** to sounds from a **[da]–[ta] continuum** of eight steps that differed in **voice onset time**. Passive listening means the infants simply heard the sounds, with no task or reward.",
        "children": []
      },
      {
        "text": "Two groups heard different **distributions** of these sounds.",
        "children": [
          "In the **bimodal distribution**, sounds near each end of the continuum were played most often and sounds in the middle were rare. Two peaks give **evidence for two different categories**.",
          "In the **unimodal distribution**, sounds in the middle were played most often and the ends were rare. One peak gives **evidence for a single category**."
        ]
      },
      {
        "text": "**At test, infants heard stimuli 3 and 6** in either **alternating** or **non-alternating** trials.",
        "children": [
          "In alternating trials, the two sounds switched back and forth. In non-alternating trials, one sound repeated.",
          "If infants treat 3 and 6 as different sounds, the two kinds of trials should hold their attention differently."
        ]
      },
      {
        "text": "**Only infants pre-exposed to the bimodal distribution were sensitive to the difference between conditions**.",
        "children": [
          "At both six and eight months, bimodal infants looked longer on non-alternating trials than on alternating ones.",
          "Unimodal infants looked about equally on both. It is **as if the infants in the unimodal condition had learned to treat stimuli 3 and 6 as members of the same category**.",
          "A few minutes of exposure to a distribution changed how infants grouped the sounds, which supports statistical learning of speech categories."
        ]
      }
    ],
    "development1-18": [
      {
        "text": "There is experimental evidence that **social interaction is important for learning**. **Nine-month-old American infants** were exposed to **Mandarin Chinese** in **twelve 25-minute sessions**.",
        "children": [
          "Some infants had **live exposure**, with a Mandarin speaker playing and reading with them in person. Others heard Mandarin through **auditory or audiovisual** recordings, and a control group heard English.",
          "Later, infants were tested on a **Mandarin phonetic contrast** with the **head-turn technique**. Only infants with **live** exposure discriminated it better than the English controls.",
          "Infants who heard the same Mandarin through **TV** or **audio** scored like the controls. **The same exposure to a Mandarin speaker is more effective for learning when it happens in person and is interactive than when it is viewed as a video**."
        ]
      },
      {
        "text": "A second experiment manipulated **social responses**. **Eight-month-old infants** received feedback from their mothers in response to their vocalizations.",
        "children": [
          "In the **contingent condition**, mothers responded right after the infant vocalized.",
          "In the **yoked-control condition**, mothers responded on a schedule copied from another infant, so the responses were **noncontingent**.",
          "Each session moved from a baseline phase to a social response phase and then to an **extinction** phase, in which the responses stopped."
        ]
      },
      {
        "text": "Infants in the contingent group produced far more syllable-like sounds during the social response phase, and they stayed higher even after the responses stopped. The noncontingent group barely changed.",
        "children": [
          "**Contingent social feedback increased the quantity and complexity of infants’ vocalizations**."
        ]
      },
      {
        "text": "**Social interactions contingent on the production of different sounds seem to work much like a reinforcing stimulus**.",
        "children": [
          "**One idea is that humans find social interaction with other humans innately reinforcing**.",
          "**Another is that we are innately good at using social cues to learn from other people**."
        ]
      }
    ],
    "development1-19": [
      {
        "text": "**Statistical learning with constraints** means learning from patterns in the input in a way that is guided and limited. **Constraints** can mean a lot of things.",
        "children": [
          "One kind limits **which stimulus properties can be contrastive**. A **contrastive** property tells words apart, such as voicing in /b/ versus /p/. **Speaker** identity and **speech rate** change the sound a lot but do not change which word is spoken, so they are **not** contrastive.",
          "A learner who tracked every pattern would form categories for different voices and speeds. Learning has to focus on the properties that carry meaning."
        ]
      },
      {
        "text": "A second kind is **based on earlier learning**.",
        "children": [
          "What has already been learned shapes what is easy to learn next.",
          "Once native categories exist, new distinctions that cut across them are harder to notice and learn. Constraints like this are central to **sensitive periods**, when earlier experience limits later learning."
        ]
      },
      {
        "text": "A third kind comes from **social and interactive contexts for learning**.",
        "children": [
          "Sounds are learned better in live, responsive interaction than from a recording.",
          "Caregivers’ contingent responses shape the sounds infants produce."
        ]
      },
      {
        "text": "Learning depends on the patterns in the input, on what the learner already knows and on the social setting of the input. Together these constraints explain why learning is fast and why it settles on the distinctions that matter.",
        "children": []
      }
    ],
    "development2-01": [],
    "development2-02": [
      {
        "text": "Speech is **messy**, because **there are no physical boundaries between words** in the speech signal. **Word segmentation** is the job of working out where one word stops and the next one starts in continuous speech.",
        "children": [
          "In an utterance such as **“I hope it’s in my desk,”** the sound energy of each word flows straight into the next word.",
          "No silent gap separates the words from one another."
        ]
      },
      {
        "text": "**Where there are pauses in the speech stream, they come from closures that are as likely to happen within words as between them**.",
        "children": [
          "A **closure** is a moment when the vocal tract is fully blocked, as for the consonants /p/, /t/, /d/ and /k/. Very little sound escapes during a closure, so a brief silence appears.",
          "In “hope” and “it’s,” these silences fall inside words or at their edges, and they do not match the word boundaries.",
          "A listener who treated every silence as a boundary would split some words and merge others."
        ]
      },
      {
        "text": "**We are nonetheless really good at finding words in this “sea of sounds.”** Adults hear separate words with no effort, although the signal does not mark them.",
        "children": [
          "The **harder question** is **how we learn to do this**.",
          "Adults can lean on the words they already know. Infants have to discover the words in the stream before they can learn what those words mean."
        ]
      }
    ],
    "development2-03": [
      {
        "text": "Listeners have **several cues to word boundaries**, but no single cue works for every word.",
        "children": [
          "Some words **appear in isolation**, as in **“Hello.” “No.” “Please.” “Go.” “Stop.”**",
          "**Not all words** are ever heard alone, so this cue covers only part of the vocabulary."
        ]
      },
      {
        "text": "**Phonotactics** describes which sound sequences a language allows. **Some sequences of phonemes are very unlikely to occur within words**.",
        "children": [
          "In **“wordboundary,”** the sequence /db/ almost never occurs inside an English word, so it suggests a break between word and boundary.",
          "In **“speechcode,”** the sequence /tʃk/ suggests a break in the same way.",
          "**“Movement”** calls for caution, since its /vm/ sequence might suggest a break even though movement is one word."
        ]
      },
      {
        "text": "**Stress patterns** give another cue. **In English, most words are stressed on the first syllable**, according to **Jusczyk and colleagues (1999)**. A **stressed** syllable is louder, longer or higher in pitch.",
        "children": [
          "**7.5-month-old infants** first heard a single word repeated and then heard passages. One passage kept using “kingdom,” as in “The prince used to sail to that kingdom when he came home from school.” Another kept using “device,” as in “My new red device makes ice cream.”",
          "Infants who had heard **“kingdom,”** with first-syllable stress, **showed a preference for the kingdom passage**.",
          "Infants who had heard **“device,”** with second-syllable stress, **did not show the same kind of preference**."
        ]
      },
      {
        "text": "In connected speech, **stress may help signal the beginnings of words**. An infant who starts a new word at every stressed syllable finds kingdom easily but cuts device in the wrong place.",
        "children": [
          "**This will not work in every language, or for every word in English**, since languages put stress in different places."
        ]
      }
    ],
    "development2-04": [
      {
        "text": "**Transitional probabilities** offer one more cue to word boundaries, through **statistical learning**. **Statistical learning** means picking up patterns in how often things occur together.",
        "children": [
          "The phrase **“pretty baby”** makes the idea concrete."
        ]
      },
      {
        "text": "In English, the syllable **/ti/** is **very strongly predicted by the syllable /prɪ/**.",
        "children": [
          "After “pre,” the next syllable is very often “ty,” since pretty is a common word.",
          "This is **less likely to be true for syllable pairs across words**. Many different words can follow “ty,” so “ba” is poorly predicted."
        ]
      },
      {
        "text": "The comparison can be written with frequencies, where **f** stands for frequency of occurrence.",
        "children": [
          "Dividing the frequency of “pretty” by the frequency of “pre” gives the chance that “pre” is followed by “ty.”",
          "Dividing the frequency of “tyba” by the frequency of “ty” gives the chance that “ty” is followed by “ba.” \\[\\frac{f(\\mathrm{pretty})}{f(\\mathrm{pre})}\\gg\\frac{f(\\mathrm{tyba})}{f(\\mathrm{ty})}\\]",
          "The first value is far larger than the second. Syllables inside pretty predict each other strongly, and syllables that straddle pretty and baby predict each other weakly."
        ]
      },
      {
        "text": "A learner who counts how often each syllable follows each other syllable can find the joints in speech. Syllable pairs inside a word recur together again and again, while pairs that cross a word boundary recur much less reliably.",
        "children": []
      }
    ],
    "development2-05": [
      {
        "text": "In general terms, **the likelihood of syllable B following syllable A is greater within words than between words**. That likelihood is the **transitional probability** from A to B.",
        "children": [
          "Inside a word, the same syllables always come in the same order, so the probability is high.",
          "At a word boundary, almost any word can come next, so the probability is lower.",
          "A drop in transitional probability is therefore a good guess for a word boundary."
        ]
      },
      {
        "text": "**Of course this is probabilistic**, so it works most of the time but not every time.",
        "children": [
          "**“What’s that in the road a/head?”** can be heard as “a head” or as “ahead.” The sounds are identical, and the meaning of the whole sentence decides the boundary.",
          "**“I scream, you scream, we all scream for ice cream”** plays on “I scream” and “ice cream” having almost the same sounds, so one sequence can be split into words two ways."
        ]
      },
      {
        "text": "Transitional probabilities tip the odds toward one way of splitting the stream. They work alongside stress, phonotactics and words heard alone.",
        "children": [
          "When the cues agree, segmentation is easy.",
          "When cues clash or are missing, as with a head and ahead, listeners fall back on context."
        ]
      }
    ],
    "development2-06": [
      {
        "text": "**Saffran and colleagues (1996)** separated **statistical information from other cues** to find out whether transitional probabilities by themselves are enough to identify words. The stimuli were **tightly controlled** for this purpose.",
        "children": [
          "The speech was **monotone**, with **no changes in pitch, duration or amplitude**. Amplitude means loudness. With none of these changes, stress could not mark where words begin.",
          "Every syllable was a **simple CV syllable**, one consonant followed by one vowel. That left **no phonotactic cues**, since no unusual consonant clusters ever occurred.",
          "The syllables were **presented continuously**, with **no pauses**, so silence could not signal a boundary."
        ]
      },
      {
        "text": "The researchers built an **artificial language** of **three-syllable “words,”** such as **tokibu, gikoba** and **gopila**.",
        "children": [
          "These words were joined in random order into one long stream.",
          "The only clue to where each word began and ended was the transitional probability between syllables."
        ]
      },
      {
        "text": "Infants who found the words under these conditions must have used transitional probabilities alone, because every other cue had been removed.",
        "children": []
      }
    ],
    "development2-07": [
      {
        "text": "The stream in the artificial language has no breaks at all, as in **“tokibugikobagopilatipolutokibu,” “gopilatipolutokibugikobagopila,”** and **“gikobatokibugopilatipolugikoba.”**",
        "children": [
          "This is exactly what the infant hears, with no spaces and no pauses.",
          "Four words, tokibu, gikoba, gopila and tipolu, are buried in the stream, and each recurs many times in random order."
        ]
      },
      {
        "text": "Even with no marked boundaries, the syllables follow regular patterns.",
        "children": [
          "Inside **tokibu**, “to” is always followed by “ki,” and “ki” is always followed by “bu.”",
          "After “bu,” though, the stream may go on with “gi,” “go” or “ti,” depending on the next word."
        ]
      },
      {
        "text": "Everything needed to find the words is in the stream.",
        "children": [
          "A learner who keeps track of which syllables follow which can discover that some pairs are fully predictable and others are not.",
          "The words come out of the statistics of the sequence."
        ]
      }
    ],
    "development2-08": [
      {
        "text": "Marking each of the four words separately makes their positions in the stream visible to a reader.",
        "children": [
          "**Tokibu**, **gikoba**, **gopila** and **tipolu** each appear many times.",
          "The infant gets no such marking and hears only one unbroken run of syllables."
        ]
      },
      {
        "text": "Each word keeps the same inner order every time, while its neighbors keep changing.",
        "children": [
          "“To-ki-bu” always comes in that order, but tokibu may be followed by gikoba, gopila or tipolu.",
          "Transitional probabilities are therefore high inside each word and lower across word edges."
        ]
      },
      {
        "text": "The word edges are exactly where transitional probability falls.",
        "children": [
          "The signal itself contains no spaces.",
          "By noticing where predictability drops, the learner recovers where one word ends and the next begins."
        ]
      }
    ],
    "development2-09": [
      {
        "text": "**Testing for an effect of transitional probabilities** takes some care. **After listening to a long stream of syllables, it is trivial to show that infants are more familiar with sequences they have heard than ones they have not**. Infants could prefer heard sequences just because they are familiar, without using transitional probabilities at all.",
        "children": []
      },
      {
        "text": "**Two additional details** remove that possibility.",
        "children": [
          "**Half of the words were repeated more frequently than the other half**.",
          "Test items compared words with **“part-words”** that were **matched for frequency of occurrence** with real words. A **part-word** is a three-syllable sequence that spans a word boundary, joining the end of one word to the start of the next."
        ]
      },
      {
        "text": "In the stream **“tokibu gikoba gopila gikoba tokibu gopila tokibu gikoba gikoba tokibu,”** the word **GOPILA** and the part-word **BU-GIKO** each occur **twice**. They are equally frequent, but their transitional probabilities differ.",
        "children": []
      },
      {
        "text": "The transitional probability of **GI given BU** is **2 out of 4**.",
        "children": [
          "BU occurs four times, once at the end of every tokibu, but only two of those are followed by GI. \\[\\frac{2}{4}=0.5\\]",
          "Inside **GOPILA**, both transitional probabilities are **2 out of 2**, because GO is always followed by PI and PI is always followed by LA. \\[\\frac{2}{2}=1\\]"
        ]
      },
      {
        "text": "Since frequency is equal, familiarity cannot explain a difference between gopila and bu-giko. Any difference must come from how predictable the syllables are.",
        "children": []
      }
    ],
    "development2-10": [
      {
        "text": "Testing revealed **a novelty effect**, since **infants looked longer in the direction of “part-word” stimuli**.",
        "children": [
          "Part-words kept infants’ attention longer than words did.",
          "The difference was statistically significant."
        ]
      },
      {
        "text": "This longer looking is a **novelty preference**.",
        "children": [
          "Infants tend to look longer at whatever seems new.",
          "The words had grown familiar during listening, so they were less interesting. The part-words felt less familiar, even though infants had heard them just as often."
        ]
      },
      {
        "text": "The pattern suggests that infants **had learned the statistical regularities of the speech stream**, and **were not merely picking up on simple frequency of occurrence**.",
        "children": [
          "Frequency was equal for words and part-words, so only their transitional probabilities could separate them.",
          "After a brief exposure, infants pulled units out of a continuous stream using nothing but how predictable the syllables were."
        ]
      }
    ],
    "development2-11": [
      {
        "text": "**Identifying word referents** comes after segmentation. Once children can **“find” the words** in speech, **how do they learn what they mean?** A **referent** is whatever a word refers to.",
        "children": [
          "A child may hear **“cat”** while looking at a cat.",
          "Recognizing the sound pattern “cat” is one achievement, and knowing that it names the furry animal is a separate one."
        ]
      },
      {
        "text": "Segmentation delivers a recurring chunk of sound, but it carries no information about meaning.",
        "children": [
          "Any scene holds many objects, parts, properties and actions.",
          "The learner needs more evidence to tell which of these the speaker has in mind."
        ]
      },
      {
        "text": "Learning a word therefore means linking its form to the speaker’s intended meaning. The child gathers that evidence from the situation in which the word is used.",
        "children": []
      }
    ],
    "development2-12": [
      {
        "text": "**The inductive problem of early word learning** is that a single experience fits many possible meanings. **Induction** means reasoning from particular examples to a general rule, and the rule here is a word’s meaning.",
        "children": [
          "A child hears a new word while watching a cat. It might mean **CAT**, **ANIMAL** or **PET**, which are categories at different levels.",
          "It might be **FELIX**, this particular cat’s name.",
          "It might name a property such as **FURRY** or **ALIVE**, an action such as **WALKING**, or a part such as **WHISKERS** or **LEG**."
        ]
      },
      {
        "text": "All the candidate meanings together make up the **hypothesis space**.",
        "children": [
          "Each candidate fits what the child sees.",
          "Nothing in one scene singles out the meaning the speaker intends."
        ]
      },
      {
        "text": "This is a form of **Quine’s “gavagai” problem**.",
        "children": [
          "In Quine’s example, a linguist studying an unknown language hears a speaker say “gavagai” as a rabbit runs by.",
          "“Gavagai” might mean rabbit, but it might also mean undetached rabbit parts, a stage of a rabbit or something else.",
          "Children meet this problem with every new word and still learn words fast. Joint attention, cues to the speaker’s intention and default strategies cut down the possibilities."
        ]
      }
    ],
    "development2-13": [
      {
        "text": "Children learn word meanings partly through **joint attention**, which is **sharing an attentional focus with another person**.",
        "children": [
          "Two people look at the same object.",
          "Each knows that the other is attending to it too."
        ]
      },
      {
        "text": "**Gaze following emerges around 9 months of age**.",
        "children": [
          "**Gaze following** means looking where someone else is looking.",
          "When an adult looks over at an object, the infant follows the adult’s eyes to it."
        ]
      },
      {
        "text": "Gaze following **signals an understanding of reference**.",
        "children": [
          "The infant grasps that the adult’s attention is aimed at something specific.",
          "If the adult then says a word, the shared object becomes the most likely referent.",
          "Joint attention therefore shrinks the hypothesis space by tying the word to what the speaker is attending to."
        ]
      }
    ],
    "development2-14": [
      {
        "text": "According to **Baldwin and colleagues**, **joint attention optimizes word learning**. Two groups of infants heard a new word while they played with an object.",
        "children": [
          "In the **joint attention group**, an **adult interacting with the baby labeled the object the baby was playing with**.",
          "In the **no joint attention group**, a **voice from behind a screen labeled the object the baby was playing with**."
        ]
      },
      {
        "text": "The two conditions matched closely.",
        "children": [
          "In each, the word came while the infant was focused on the same object.",
          "They differed only in whether a visible person was engaged with the infant and the object."
        ]
      },
      {
        "text": "**Eighteen-month-olds learned the novel word in the joint attention group but not in the no joint attention group**.",
        "children": [
          "Hearing a word while seeing an object was not enough.",
          "Infants needed evidence that a speaker meant the word to refer to that object.",
          "The hidden voice gave the same word at the same moment, so the learning difference came from the visible, engaged speaker."
        ]
      }
    ],
    "development2-15": [
      {
        "text": "Children also narrow the meanings of new words with **intentional cues from the speaker**, such as **eye gaze direction**. An **intentional cue** is a signal of what the speaker means to refer to.",
        "children": [
          "When a speaker looks toward one toy, the direction of the eyes marks the object of the speaker’s attention."
        ]
      },
      {
        "text": "**Baldwin** taught new words to **16–17-month-olds** and **18–19-month-olds** in two conditions.",
        "children": [
          "In **follow-in labeling**, the adult **looked at the toy the infant was focused on** while saying the new word, so both cues pointed to one toy.",
          "In **discrepant labeling**, the adult **looked at a toy in a bucket**, a different toy from the infant’s, while saying the new word."
        ]
      },
      {
        "text": "The discrepant condition pulls the infant’s focus apart from the speaker’s focus.",
        "children": [
          "Infants who simply attach a new word to whatever they are looking at would link it to their own toy.",
          "Infants who follow the speaker’s gaze would link it to the toy in the bucket.",
          "Comparing the two conditions reveals whether infants treat the speaker’s gaze as evidence of meaning."
        ]
      }
    ],
    "development2-16": [
      {
        "text": "**Gaze direction** helps a child work out which object a speaker is naming when several objects are present.",
        "children": [
          "A speaker who looks at one object while saying a new word ties the word to that object.",
          "The child can follow the speaker’s eyes to the intended referent."
        ]
      },
      {
        "text": "A speaker’s focus can be different from the child’s own.",
        "children": [
          "Following it means using information about someone else’s attention.",
          "The child can then attach a new word to an object it was not looking at when the word was spoken."
        ]
      },
      {
        "text": "Gaze narrows the possible meanings even though the word’s sound gives no clue.",
        "children": [
          "The child combines the new word with evidence of what the speaker intends.",
          "Following gaze rests on understanding that a speaker’s eyes point to what the speaker means, which produces a far more specific mapping than linking the word to everything in view."
        ]
      }
    ],
    "development2-17": [
      {
        "text": "Intentional cues include **affective and behavioral cues** from the speaker. **Affective** cues are emotional expressions, and **behavioral** cues are the speaker’s actions.",
        "children": [
          "An expression can reveal whether an object is the one the speaker was searching for.",
          "An action, such as reaching for something, can reveal what the speaker wants."
        ]
      },
      {
        "text": "**Akhtar and colleagues** found that **infants used adults’ facial expressions to identify the intended referent of a novel word**.",
        "children": [
          "The adult’s emotional reaction to each object signaled whether it was the one meant.",
          "Infants linked the new word to the object that the adult’s expression picked out."
        ]
      },
      {
        "text": "Several objects may be present when a word is spoken, and the speaker’s reaction can single out one.",
        "children": [
          "Satisfaction signals that the speaker found the desired object, and disappointment signals that an object is not the one meant.",
          "Word learning therefore involves grasping the goal behind the interaction."
        ]
      }
    ],
    "development2-18": [
      {
        "text": "A speaker’s **emotional reaction** works as an **intentional cue** that can pick out the intended object from several candidates.",
        "children": [
          "Satisfaction or excitement can tie one object to what the speaker was trying to find or do.",
          "The learner can use that tie to interpret a new label."
        ]
      },
      {
        "text": "**Intention is conveyed through more than gaze direction**.",
        "children": [
          "Expressions and actions also reveal what a speaker means.",
          "A word may be said near several objects that are not all equally likely referents."
        ]
      },
      {
        "text": "The helpful information lies in how the adult responds to each object.",
        "children": [
          "Connecting the label to that response shrinks the word’s **hypothesis space**, the set of meanings it might have.",
          "Infants who use emotional reactions are following the speaker’s goals. The word attaches to the object that meets the goal, and objects that disappoint the speaker drop out."
        ]
      }
    ],
    "development2-19": [
      {
        "text": "Children also bring **word learning strategies** to the task. These are **default strategies that children bring to the word learning situation**.",
        "children": [
          "A **default** is a starting assumption that holds until evidence says otherwise.",
          "These strategies **function to narrow the hypothesis space for new words**, which gives children a place to start when other cues are weak."
        ]
      },
      {
        "text": "The **whole object assumption** is one example.",
        "children": [
          "It leads a child to expect a new word to name **a whole object**, not a part of it, its color, its texture or something it is doing.",
          "A child who hears a new word while looking at a cat will favor “cat” over “whiskers,” “furry” or “walking.”"
        ]
      },
      {
        "text": "This assumption rules out many unlikely meanings at once, and it fits the way adults usually name objects for children.",
        "children": [
          "It is only a starting preference, and later evidence can override it.",
          "Children do eventually learn words for parts and properties once the evidence points that way."
        ]
      }
    ],
    "development2-20": [
      {
        "text": "**Mutual exclusivity**, from **Markman (1989)**, is another word learning strategy.",
        "children": [
          "**As a default, objects can have only one name**.",
          "The **implication** is that **new words map to nameless objects**.",
          "Mutual exclusivity **emerges during the second half of the second year**, roughly between 18 and 24 months."
        ]
      },
      {
        "text": "Suppose a child knows the word “dog” but has no word for a parrot, and both animals are in view.",
        "children": [
          "When the child hears a new word, the child takes it to mean the parrot, since the dog already has a name.",
          "No gaze or emotional cue is needed for this choice."
        ]
      },
      {
        "text": "Mutual exclusivity combines with the whole object assumption.",
        "children": [
          "The whole object assumption says a new word names an object, and mutual exclusivity says it names an object that has no name yet.",
          "Because it is a default, later learning can override it when an object turns out to have two names."
        ]
      }
    ],
    "development2-21": [
      {
        "text": "With **mutual exclusivity**, a child who hears an unfamiliar word gives it to an object that has no known name yet.",
        "children": [
          "An object the child can already name is an unlikely target for a new word.",
          "The choice comes from comparing the objects in view."
        ]
      },
      {
        "text": "**Prior vocabulary** determines which objects count as already named.",
        "children": [
          "Two children in the same scene can guess differently if they know different words.",
          "The strategy builds directly on earlier learning."
        ]
      },
      {
        "text": "Vocabulary growth therefore feeds itself.",
        "children": [
          "A child who knows many names can rule out many objects.",
          "The unnamed objects left over become the likeliest referents for new words, so every word the child knows helps narrow the meaning of the next."
        ]
      }
    ],
    "development2-22": [
      {
        "text": "**How do children start putting words together?** **In production, it can be hard to tell what is going on when children produce only one, two or three words at a time**, since very different processes can produce the same short utterance.",
        "children": []
      },
      {
        "text": "**Menn** separates early utterances into four kinds.",
        "children": [
          "**“Just a bunch of relevant words.”** The child strings together words that fit the situation, with no grammar linking them.",
          "**Formulas**, phrases memorized as whole units without the child knowing they have separate parts.",
          "**Word combinations**, in which the child joins separate words productively to make new combinations.",
          "**Stable constructions**, consistent patterns the child uses to build utterances. They are **not necessarily adult-like**."
        ]
      },
      {
        "text": "A child might say **“Up!”**, **“Pick you up!”** and **“Mommy up!”**",
        "children": [
          "“Pick you up!” sounds more advanced, but it may be a formula copied whole from adult speech.",
          "“Mommy up!” is shorter, but it may be a real combination of two separate words.",
          "Utterance length alone cannot tell which process produced each one."
        ]
      },
      {
        "text": "**A full description of the context in which an utterance is produced is necessary, but often not sufficient, to distinguish among these**.",
        "children": [
          "Context reveals what the child intends and how the utterance is used across situations.",
          "Even with complete context, the source of a given utterance can remain uncertain."
        ]
      }
    ],
    "development2-23": [
      {
        "text": "**Comprehension** and **production** develop at different rates. **Even children at the one-word stage in production are able to use basic transitive word order in comprehension**.",
        "children": [
          "In the **one-word stage**, a child speaks only in single words.",
          "A **transitive** sentence has a verb with a subject and an object. English transitive order puts the actor first and the person acted on after the verb."
        ]
      },
      {
        "text": "The **structure-mapping account** of **early syntactic bootstrapping**, from **Gertner and Fisher**, describes how children manage this. **Syntactic bootstrapping** means using sentence structure to help learn meaning.",
        "children": [
          "From the **input sentence** **“The boy is tickling the girl!”** the child builds a **partial sentence representation**, **tickle[N1 = boy, N2 = girl]**, which records the verb and the two nouns in order.",
          "From the **observed scene** of a boy tickling a girl, the child builds **conceptual representations** of possible events, such as **Giggle(agent = girl)**, **Tickle(agent = boy, patient = girl)**, **Play(agent = boy)** and **Play(agent = girl)**. An **agent** performs an action, and a **patient** is affected by it.",
          "A **one-to-one mapping between nouns and participant roles** lines up the two nouns with the two participants in the tickling event. Two nouns fit an event with two participants."
        ]
      },
      {
        "text": "Comprehension can therefore get ahead of production.",
        "children": [
          "A child who says only single words can still use noun order to tell who did what.",
          "Matching nouns to the participants in a scene helps the child figure out what the verb means."
        ]
      }
    ],
    "development2-24": [
      {
        "text": "A **generalization test** checks whether children have truly learned the **transitive structure**. **If children have really learned the transitive structure, they will generalize it to new verbs**.",
        "children": [
          "A child who has only memorized particular sentences will be lost with an unfamiliar verb.",
          "A child who knows the structure can use word order to interpret any verb."
        ]
      },
      {
        "text": "Picking out the scene that fits **“The duck is gorping the bunny”** requires knowing that the first noun is the doer and the second is the one acted on. **“Gorp”** is invented, so only noun order can help.",
        "children": []
      },
      {
        "text": "**Gertner and colleagues (2006)** found that **two-year-olds can understand this**.",
        "children": [
          "Children first heard “Hey look! The duck’s gonna gorp the bunny!”",
          "Two scenes then appeared side by side. In one, a person dressed as a duck pushed a person dressed as a bunny in a wagon. In the other, the bunny acted on the duck. Children heard “The duck is gorping the bunny! See?”",
          "After a short break they heard “The duck gorped the bunny! Find gorping!” and the scenes appeared again.",
          "Children **looked significantly longer at the duck acting on the rabbit than the reverse**."
        ]
      },
      {
        "text": "Children this age usually have a **mean length of utterance**, or **MLU**, of **around 2**. MLU is the average number of **morphemes**, meaningful words or word parts, in each utterance.",
        "children": [
          "Their three-morpheme utterances might sound like **“Duck gorp bunny.”**",
          "Their own speech is short and incomplete, yet they understand the full transitive structure."
        ]
      }
    ],
    "l1-critical-01": [],
    "l1-critical-02": [
      {
        "text": "**Critical periods** and **sensitive or “optimal” periods** are two ways to describe how the timing of experience shapes learning. They differ in how strict their time limits are.",
        "children": []
      },
      {
        "text": "A **critical period** has two defining features.",
        "children": [
          "It has a **discrete, “programmed” onset and offset**, so the window opens and shuts at fixed points in development, as if on a biological timetable.",
          "**Change in response to the environment, which is learning, is strictly limited to this period**. There is **no sensitivity to the environment before or after** the window, so experience outside it has no effect."
        ]
      },
      {
        "text": "A **sensitive or “optimal” period** describes a looser link between timing and learning.",
        "children": [
          "**Learning is possible throughout the life span**.",
          "**Learning is optimal during particular windows**, when it is easiest or works best.",
          "**These windows can have a gradual onset and offset**, and their timing **can itself be affected by experience**."
        ]
      },
      {
        "text": "The two ideas differ as impossibility differs from reduced effectiveness.",
        "children": [
          "A critical period predicts no learning at all after the window, so any late improvement counts against it.",
          "A sensitive period predicts that late learning is harder but still possible, with a lasting advantage for early learners.",
          "Even the classic critical period in vision fits the label sensitive period better, and the same question arises for language."
        ]
      }
    ],
    "l1-critical-03": [
      {
        "text": "**Amblyopia** is **poor vision in one eye despite normal peripheral function**. **Peripheral function** means the working of the eye itself, so the eye can be healthy while vision through it is poor. The trouble lies in how the brain handles that eye’s input.",
        "children": []
      },
      {
        "text": "Three conditions can lead to amblyopia.",
        "children": [
          "**Strabismus** is a misalignment of the eyes, so they point in different directions and send the brain two conflicting images.",
          "A **cataract** clouds the lens of the eye and blurs or blocks the light that reaches the back of the eye.",
          "**Anisometropia** is a large difference in focusing power between the eyes, which makes one eye’s image much blurrier than the other’s."
        ]
      },
      {
        "text": "**Periods of deprivation from normal visual input** due to these conditions **can result in poor vision long after the conditions themselves have been remediated**, meaning corrected.",
        "children": [
          "Straightening the eyes, removing the cataract or correcting the focus restores the eye’s input.",
          "The brain may still fail to use that input well.",
          "A short-lived problem early in life can leave a permanent effect, so when the problem occurs matters as much as what it is."
        ]
      }
    ],
    "l1-critical-04": [
      {
        "text": "**Amblyopia occurs because of competitive dynamics between cortical inputs**. Both eyes send input to **visual cortex**, and the two inputs **compete** to control the neurons there.",
        "children": [
          "With both eyes working normally, they share cortical neurons evenly.",
          "**Abnormal vision in one eye can lead to “colonization” of the cortical representation of that eye by the other eye**, so the stronger eye takes over neurons that would have served the weaker one."
        ]
      },
      {
        "text": "**Monocular deprivation**, blocking or degrading input to one eye, reveals how the takeover unfolds in mice.",
        "children": [
          "Within **2–3 days**, **dendritic spines**, the small projections where neurons receive connections, become unstable and move around, which is **increased spine motility**.",
          "Within **3–4 days**, there is **spine loss and Wallerian degeneration**. Connections from the deprived eye disappear, and **Wallerian degeneration** is the breakdown of nerve fibers cut off from their source.",
          "After **more than a week**, there is **axon sprouting and new spine birth**, as the open eye’s fibers branch out and form connections in the space the deprived eye lost."
        ]
      },
      {
        "text": "**When normal function is restored to the deprived eye, it remains at a competitive disadvantage**.",
        "children": [
          "The other eye now holds the connections.",
          "**Normal cortical responses cannot be restored by normal experience**, since ordinary viewing with both eyes open keeps favoring the stronger eye."
        ]
      }
    ],
    "l1-critical-05": [
      {
        "text": "**Treatments for amblyopia are based on competition**, and **one of the most effective treatments involves intermittently patching the “good” eye**.",
        "children": [
          "A patch on the stronger eye shuts off its input for part of the day.",
          "The brain then has to rely on the weaker eye."
        ]
      },
      {
        "text": "Patching **restores the competitive balance between the eyes** and **permits the brain’s own plasticity to restore normal function**. **Plasticity** is the brain’s capacity to rewire its connections in response to experience.",
        "children": [
          "With the strong eye covered, the weak eye’s input can win back cortical connections.",
          "The patch leaves the eye itself unchanged. It alters the brain’s experience, and plasticity does the rest."
        ]
      },
      {
        "text": "**This treatment is most effective early in development**, and it **may be ineffective by late childhood, around 10 years**.",
        "children": [
          "A young brain is highly plastic, so evening out the input leads to fast reorganization.",
          "As the visual system matures, the same treatment helps less and less, so when treatment happens matters as much as the treatment itself."
        ]
      }
    ],
    "l1-critical-06": [
      {
        "text": "**Human adult plasticity after the critical period** is not entirely gone. **Levi and Polat (1996)** found that **plasticity is not abolished entirely, even well into adulthood**. **Some of these patients were in their 50s**, an age normally considered past the point where treatment works.",
        "children": []
      },
      {
        "text": "**Long-term, intensive training on specific psychophysical tasks** in the affected eye can lead to **improvements in both task performance and general visual function**. A **psychophysical task** measures the relationship between a physical stimulus and what a person perceives, such as the faintest contrast a person can detect.",
        "children": [
          "Participants practiced visual judgments with the amblyopic eye over many thousands of trials.",
          "The benefits spread beyond the trained task to vision more broadly."
        ]
      },
      {
        "text": "Improvement was measured as a falling **threshold**, the smallest stimulus a person can reliably detect. A lower threshold means better vision.",
        "children": [
          "Early in training, the threshold dropped steadily, and this change was highly significant.",
          "It then leveled off for a long stretch of training.",
          "With continued practice, it dropped again to a new, lower level and stayed there."
        ]
      },
      {
        "text": "The adult visual system therefore keeps some **experience-dependent plasticity**. The right kind and amount of training can still produce change after ordinary late treatment stops working.",
        "children": []
      }
    ],
    "l1-critical-07": [
      {
        "text": "**Li, Ngo, Nguyen, Lam and Levi (2008)** found that **playing video games enhances visual acuity and visual attention in adult amblyopia**. Adults played an action video game, a first-person shooter set on a battlefield, with their amblyopic eye.",
        "children": [
          "**Visual acuity** is sharpness of vision, the ability to see fine detail. Better acuity means clearer vision through the weak eye.",
          "**Visual attention** is the ability to pick out and focus on the important parts of a scene, such as targets in a busy battle."
        ]
      },
      {
        "text": "Action games demand quick visual decisions and constant attention, which force the visual system to use the amblyopic eye’s input.",
        "children": [
          "These adults were long past childhood visual development, so their gains came from the training itself.",
          "Intensive visual experience improved vision well beyond the age when patching normally works best."
        ]
      },
      {
        "text": "Video game training adds to the evidence for **plasticity** in adult amblyopia.",
        "children": [
          "A demanding, engaging visual task can drive change in a mature visual system.",
          "The closing of an early optimal window does not remove every chance of improvement."
        ]
      }
    ],
    "l1-critical-08": [
      {
        "text": "An **interim summary** pulls the vision evidence together. **Amblyopia is a classic example of a sensitive period**.",
        "children": [
          "A **peripheral disturbance in early experience can lead to life-long disruption in visual function**, so an early problem with the eye itself permanently affects vision.",
          "**The long-term loss of function is the sequela of a temporary deficit during experience-dependent organization of the brain**. A **sequela** is a lasting result of an earlier condition. The brain wired itself around abnormal input, and that wiring remains.",
          "**Treatment is most effective during a limited developmental window**, since patching works best early and loses its power by late childhood."
        ]
      },
      {
        "text": "**New evidence suggests that the right kind of experience can reverse deficits late into adulthood**.",
        "children": [
          "Intensive perceptual training and video game play improved adults’ vision.",
          "Late learning is harder and needs special conditions, but it does happen."
        ]
      },
      {
        "text": "This pattern matches a **sensitive period** better than a strict critical period.",
        "children": [
          "A strict critical period would forbid any late improvement.",
          "Amblyopia pairs a strong early window with some ability to change later, which is what defines a sensitive period."
        ]
      }
    ],
    "l1-critical-09": [
      {
        "text": "The vision evidence connects to language through two lines of work.",
        "children": [
          "**Lenneberg’s early attempts to combine developmental neurology with the notion of a “language acquisition device.”** **Developmental neurology** studies how the nervous system develops, and a **language acquisition device** is a proposed innate capacity for learning language.",
          "**Studies of early deprivation**, including **data from neglected children** and from **Deaf children with limited input to sign language**."
        ]
      },
      {
        "text": "Lenneberg asked whether changes in the maturing brain could open and close a window for language.",
        "children": [
          "He tied language milestones to stages of brain development.",
          "If such a window exists, learning language depends on the state of the brain as well as on the input."
        ]
      },
      {
        "text": "Deprivation studies examine people who met an accessible language unusually late.",
        "children": [
          "Neglected children were cut off from ordinary language input.",
          "Some Deaf children have no access to sign language in early childhood.",
          "Comparing them with typical learners tests whether the age of first exposure affects the final outcome."
        ]
      }
    ],
    "l1-critical-10": [
      {
        "text": "In **Biological Foundations of Language (1967)**, **Lenneberg was attempting to combine contemporary linguistics with what was known about brain development**. **Studies of language development were starting to show a fairly robust and stage-like pattern**.",
        "children": []
      },
      {
        "text": "Data from Austrian, British and American children follow the same order.",
        "children": [
          "**Single words** appear first, mostly between about 10 and 18 months.",
          "**Two-word phrases** come next.",
          "**Sentences of five words or more** come last, toward the end of the third year."
        ]
      },
      {
        "text": "Lenneberg paired these language milestones with motor milestones at each age.",
        "children": [
          "Around **8 months**, infants stand while holding on, and **reduplicated** babbling, such as repeated syllables, becomes frequent.",
          "Around **12 months**, infants walk with one hand held, and words such as **mama** or **dada** emerge. They understand some words and simple commands.",
          "By **18 months**, children have a small vocabulary of more than three but fewer than fifty words, and comprehension grows rapidly."
        ]
      },
      {
        "text": "**The idea that language might have maturational milestones was seen as consistent with the unfolding of a biological program**.",
        "children": [
          "Language milestones line up with motor milestones, which suggests a shared biological timetable.",
          "Lenneberg proposed that brain maturation sets the pace for both, so the timing of language learning depends on the developing brain."
        ]
      }
    ],
    "l1-critical-11": [
      {
        "text": "**Data on typical brain development were sparse** in Lenneberg’s time, **because they were almost entirely based on post-mortem analyses of tissue**. **Post-mortem** means after death.",
        "children": [
          "Researchers could not follow the same children’s brains as they grew.",
          "They had to piece together development from the brains of children who had died at different ages."
        ]
      },
      {
        "text": "Measurements of **neuron size** in the cerebral cortex show rapid growth in the first two years, followed by leveling off.",
        "children": [
          "The data have a large gap between ages **2 and 18**, because **no measurements were available** for that period.",
          "That gap overlaps much of the period of **language acquisition**."
        ]
      },
      {
        "text": "Lenneberg observed that **abrupt changes in neuron size and packing density before age two might be permissive for the beginning of language acquisition**.",
        "children": [
          "**Packing density** is how closely neurons are crowded together in the tissue.",
          "**Permissive** means these changes make language acquisition possible without directly causing it."
        ]
      },
      {
        "text": "On this view, **the critical period seems to open after this initial period of rapid development**.",
        "children": [
          "The brain first goes through a burst of physical growth, and once that growth settles, the window for learning language opens.",
          "Lenneberg filled the gap in the data with a reasonable guess about how the brain matures, which later research would need to test directly."
        ]
      }
    ],
    "l1-critical-12": [
      {
        "text": "**More extensive data were available from studies of recovery from stroke**, and they reveal that **aphasia is surprisingly rare in children with brain lesions**. A **lesion** is an area of damaged brain tissue.",
        "children": [
          "Damage that leaves an adult with lasting aphasia often has much milder effects in a child."
        ]
      },
      {
        "text": "The most extreme cases involve **hemispherectomy**, surgery that removes or disconnects a whole **cerebral hemisphere**, usually **to relieve seizures in people with epilepsy**.",
        "children": [
          "**Children in whom the left hemisphere is removed nonetheless seem to develop typical language abilities**.",
          "**Adults do not recover language after this procedure**."
        ]
      },
      {
        "text": "Lenneberg’s summary of hemispherectomy outcomes, drawn from Basser (1962), sorts cases by age at injury.",
        "children": [
          "Among children injured **before the teens** whose **left** hemisphere was removed, **49** had speech that was **not affected or improved**, and only **3** had permanent aphasia, all of whom had it before surgery.",
          "Children who lost the right hemisphere did similarly well.",
          "Among **adults** whose **left** hemisphere was removed, **none** had speech unaffected or improved, and **6** had permanent aphasia.",
          "Adults who lost the right hemisphere kept their speech."
        ]
      },
      {
        "text": "These outcomes led Lenneberg to propose that **a key factor in closing the critical period was the development of adult-like cerebral dominance**.",
        "children": [
          "**Cerebral dominance** is the specialization of one hemisphere, usually the left, for language.",
          "A young child’s language is not yet locked into the left hemisphere, so the right hemisphere can take over. Once dominance is set in adulthood, losing the left hemisphere leaves permanent aphasia."
        ]
      }
    ],
    "l1-critical-13": [
      {
        "text": "**As always, things are more complicated**. **Systematic studies of children with perinatal strokes** add important detail. A **perinatal stroke** happens between the **prenatal period and 28 days after birth**.",
        "children": [
          "**Outcomes are clearly much better than for adults with similar injuries**.",
          "The children still show some effects of the injury."
        ]
      },
      {
        "text": "**Early language deficits appear in both right- and left-hemisphere patients**.",
        "children": [
          "Adults mainly lose language after damage to the left side.",
          "Young children show early language delays after damage to either side.",
          "**Some deficits are worse for children with right-hemisphere damage**, the reverse of the adult pattern."
        ]
      },
      {
        "text": "**Language outcomes are generally in the low-normal range**.",
        "children": [
          "That points to **a persistent delay rather than catching up**.",
          "Children recover far better than adults but often fall short of children without injury."
        ]
      },
      {
        "text": "Early plasticity is therefore real but limited. A young brain can reorganize to support language, yet the reorganized system may work less well than the original would have.",
        "children": []
      }
    ],
    "l1-critical-14": [
      {
        "text": "**Curtiss and colleagues (1974)** studied the **effects of early deprivation** through the case of **Genie**.",
        "children": [
          "Genie was born in **April 1957**.",
          "When researchers first met her, she was **13 years and 7 months old** and so thin that she looked six or seven."
        ]
      },
      {
        "text": "Her early life involved extreme isolation and abuse.",
        "children": [
          "**From the age of 20 months**, she was shut in a small room under ever tighter physical restraint.",
          "She spent most of her time harnessed to an infant’s potty chair, and otherwise lay in a homemade sleeping bag inside a crib covered with wire mesh.",
          "Her care came from a mother who was quickly losing her sight, and she ate only infant food.",
          "She was **physically punished by her father if she made any sounds**. Her father and older brother never spoke to her, though they sometimes barked at her like dogs.",
          "The home had no television or radio, and she had almost no contact with other people."
        ]
      },
      {
        "text": "When she was hospitalized for malnutrition, Genie **could not stand up straight or chew food**, was **not toilet trained**, and **did not speak, cry or produce any vocal sounds**.",
        "children": [
          "Her case reveals what happens when a first language is learned starting in adolescence.",
          "Her lack of language came with severe physical, social and emotional deprivation, so the effects of missing language input cannot be pulled apart from her other hardships."
        ]
      }
    ],
    "l1-critical-15": [
      {
        "text": "**During the four years that her language was observed, Genie learned quite a bit**.",
        "children": [
          "She came to **comprehend hundreds of words**.",
          "She came to **comprehend some aspects of morphology**, and she was **particularly good with plurals**. **Morphology** is the system of meaningful word parts, such as the plural ending “-s.”",
          "She came to **comprehend some prepositions**, words for spatial relationships between objects."
        ]
      },
      {
        "text": "A test of prepositions used **buttons and plastic boxes** of different colors and sizes. Genie moved the buttons and boxes according to spoken instructions.",
        "children": [
          "A sample item was **“Put the red box behind the blue box.”**",
          "The test covered **under, over, in, on, behind** and **in front of**, along with **in back of** and **next to**."
        ]
      },
      {
        "text": "Across the year of testing, Genie gave more correct than incorrect responses for every preposition.",
        "children": [
          "She was strongest on **in** and **on**, with **37 correct out of 41** for in and **36 out of 45** for on.",
          "She also did well on spatial phrases such as in front of and next to."
        ]
      },
      {
        "text": "Some language can therefore be acquired late. This learning took place after puberty, long after the window Lenneberg proposed, but it was uneven across different parts of language.",
        "children": []
      }
    ],
    "l1-critical-16": [
      {
        "text": "Genie also **did not learn** several things. **Genie’s production lagged severely behind her comprehension**.",
        "children": [
          "**Some lag is typical of development**, since every child understands more than they can say.",
          "Genie had been **punished for making sounds**, which could also hold back her speech, so what she said understated what she knew."
        ]
      },
      {
        "text": "**Her grammatical abilities developed much more slowly than her vocabulary**. In a test of **conjunctions**, **five familiar objects in a row** were set in front of her, and she was asked to point to one or more of them.",
        "children": [
          "Items included **“Show me the fork and pencil,” “Show me the crayon or the knife”** and **“Show me either the spoon or the crayon.”**",
          "**And** calls for pointing to every named object. **Or** calls for pointing to just one, which depends on grasping a logical relationship."
        ]
      },
      {
        "text": "At first she treated **or** exactly like **and** and pointed to both objects. **Later responses** told and from or apart, but she never understood **either/or**.",
        "children": [
          "Over about two years of testing, she answered almost every **and** sentence correctly.",
          "She answered only a handful of **or** sentences correctly and got most of them wrong.",
          "She mastered and while failing or, despite knowing hundreds of words. That combination of strong vocabulary and weak grammar fits the idea that grammar depends more on early exposure than vocabulary does."
        ]
      }
    ],
    "l1-critical-17": [
      {
        "text": "Genie’s case leaves **lots of questions**.",
        "children": [
          "**Was Genie learning disabled?** She may have had difficulties from birth that would have affected her language even without deprivation.",
          "**What were the residual effects of neglect and abuse on her social development?** Severe trauma could disrupt learning in many ways besides the missing language input."
        ]
      },
      {
        "text": "Another limit is that **after four years, funding to study her was pulled**.",
        "children": [
          "**We cannot know what she might have learned after a longer time**.",
          "The evidence reaches only as far as those four years."
        ]
      },
      {
        "text": "**Nonetheless, the disparity between her vocabulary development and her grammatical development is widely interpreted as suggesting that grammar learning in a first language is specifically impaired after a sensitive period**.",
        "children": [
          "She picked up hundreds of words but made little headway with grammar.",
          "On this reading, words can be learned at any age, while grammar relies on early exposure.",
          "Disability, abuse and late exposure could each have affected her grammar, and one case cannot separate them. Her pattern still became an influential piece of evidence for a sensitive period in first-language learning."
        ]
      }
    ],
    "l1-critical-18": [
      {
        "text": "**Mayberry, Lock and Kazmi (2002)** studied deaf people who acquired a first language late. **Many deaf children do not get sign language input but have an otherwise typical upbringing**.",
        "children": [
          "Unlike Genie, these children grow up in ordinary, caring homes.",
          "Their only unusual experience is a lack of accessible language early in life, which makes them a cleaner test of first-language timing."
        ]
      },
      {
        "text": "**Children aged 9 to 15 have difficulty learning American Sign Language, or ASL, if it is their first time learning a language**.",
        "children": [
          "A **comparison group** of children who **went deaf after initially learning a spoken language** **do much better** at learning ASL.",
          "Both groups learned ASL late, but only one group had an earlier language.",
          "**These differences persist into adulthood**."
        ]
      },
      {
        "text": "Two tasks measured the outcome in adulthood.",
        "children": [
          "In **recall of complex ASL sentences**, adults with **no early language** scored about **36%**, while adults with an **early spoken language** scored about twice as well.",
          "In **judging whether complex English sentences were grammatical**, where chance is 50%, deaf adults with **no early language** were close to chance. Deaf adults who had ASL in infancy did about as well as hearing adults with an early spoken language."
        ]
      },
      {
        "text": "The advantage comes from **having any language early**, whatever its type.",
        "children": [
          "Early ASL helped later English learning as much as an early spoken language did.",
          "People with no early language struggled with both ASL and English. Early accessible language, signed or spoken, provides the foundation for learning languages later."
        ]
      }
    ],
    "l1-critical-19": [
      {
        "text": "The evidence speaks to whether a first language, or **L1**, has a **“critical period”** or a **“sensitive period.”**",
        "children": [
          "**Recovery from stroke, and certainly hemispherectomy, looks very, very different in childhood and adulthood**. Children can build language after damage that would leave an adult permanently aphasic.",
          "Age therefore strongly affects the brain’s ability to reorganize for language."
        ]
      },
      {
        "text": "**Deprivation of input does not appear to extend the critical period**.",
        "children": [
          "It might seem that a child with no language input would keep the window open until input arrives.",
          "Instead, Genie and deaf adults who learned sign late both show lasting trouble, especially with grammar.",
          "The window appears to follow a maturational schedule whether or not language has been experienced."
        ]
      },
      {
        "text": "**All of these data come from highly unusual cases with many other things going on**, so it is **difficult to reach firm conclusions**.",
        "children": [
          "Stroke, brain surgery, abuse and neglect all add complications beyond the timing of input.",
          "There is also a **lack of animal models**, since animals do not learn human language.",
          "Experiments such as **gene knockouts**, which switch off specific genes to test what they do, **cannot be done with people**."
        ]
      }
    ],
    "l1-critical-20": [],
    "l1-critical-21": [],
    "l2-learning-01": [],
    "l2-learning-02": [
      {
        "text": "**Babies are overrated** as language learners. If **sensitive periods** for a second language, or **L2**, are taken to mean that infants, toddlers and children learn language “better” than adults, it is important not to get carried away.",
        "children": [
          "A typical child **by 18 months** understands “in and out” and “off and on,” points to several body parts when asked, **uses at least 20 words**, answers simple questions such as “Where’s teddy?” and “What’s that?” with words or gestures, shows some pretend play such as giving teddy a drink, makes at least four different consonant sounds such as b, n, d, g, w and h, enjoys being read to, and points to pictures with one finger.",
          "An adult who **only knew about 20 words after 18 months of language instruction** would count as a very poor learner."
        ]
      },
      {
        "text": "**Adults initially learn more quickly than children**, mostly because of two advantages.",
        "children": [
          "**Transfer from L1**, the first language, which lets adults build on what they already know about how language works.",
          "**Better general cognitive skills**, such as memory, attention and reasoning."
        ]
      },
      {
        "text": "**Where adults do worse is ultimate attainment**, the final level of skill they eventually reach.",
        "children": [
          "Adults **rarely become native-like** in a second language.",
          "That too may be **due in part to transfer**, since the first language that gives adults a fast start can also keep them from native-like skill.",
          "Early learning speed and final success are separate measures, and children and adults rank differently on each."
        ]
      }
    ],
    "l2-learning-03": [
      {
        "text": "Several toddler **“language milestones”** are really **general conceptual abilities**.",
        "children": [
          "Grasping **“in and out”** and **“off and on”** rests on understanding **spatial relations between objects**.",
          "**Pretend play**, such as giving teddy a drink, rests on **event representations**, mental models of who does what in an event.",
          "A toddler meeting these milestones is forming new ideas about the world along with new words."
        ]
      },
      {
        "text": "**Later learners of a second language already have much of this in place**.",
        "children": [
          "An adult learning Spanish already has the concepts behind “in” and “on.”",
          "Adults can **focus on learning how these concepts are represented in the target language**, the language being learned, which is a smaller job than building concepts and words together."
        ]
      },
      {
        "text": "Later learners **also already know another language**, and that affects **how the second language is learned**.",
        "children": [
          "The first language offers ready-made ways to express concepts.",
          "Some of those ways fit the second language and help, while others clash with it and lead to errors."
        ]
      }
    ],
    "l2-learning-04": [
      {
        "text": "**Transfer** is **the use of native-language, or L1, processes and representations for a second language, or L2**.",
        "children": [
          "A learner carries L1 habits for perceiving sounds, building sentences and retrieving words into the L2.",
          "The learner comes to the L2 with a complete working language system already in place."
        ]
      },
      {
        "text": "**Transfer can have both positive and negative effects on second-language learning and performance**.",
        "children": [
          "**Positive transfer** occurs when an L1 pattern matches what the L2 needs, so shared sounds, words and structures give a head start.",
          "**Negative transfer** occurs when an L1 pattern conflicts with the L2. Errors appear wherever the languages differ, because the learner’s habits point the wrong way."
        ]
      },
      {
        "text": "In one cartoon, a man in a pub asks **“Do you not be happy with me as the translator of the books of you?”**",
        "children": [
          "The words are English, but the structure follows another language’s grammar.",
          "Translating word by word carries over the first language’s word order and phrasing, which is negative transfer in grammar."
        ]
      }
    ],
    "l2-learning-05": [
      {
        "text": "Transfer shapes **phonetic and phonological learning**, the learning of speech sounds. **Categorical perception** produces **acquired similarity** for sounds in one category. **Acquired similarity** means that sounds a language groups together come to sound more alike with experience in that language.",
        "children": []
      },
      {
        "text": "**Minimal pairs in Hindi** make the problem clear. A **minimal pair** is two words that differ in just one sound.",
        "children": [
          "Two words both sound like “tap” to an English speaker. One means **hot**, and the other means **a kind of beat**.",
          "Two words both sound like “dab.” One means **pressure**, and the other means **a kind of fruit**.",
          "Two words both sound like “ari.” One means **saw**, the tool, and the other means **crooked**.",
          "Each pair contrasts a **dental** consonant, made with the tongue against the teeth, with a **retroflex** consonant, made with the tongue curled back toward the roof of the mouth."
        ]
      },
      {
        "text": "**Native English speakers tend to use the English “alveolar” category to interpret both dental and retroflex consonants**. An **alveolar** consonant, such as English /t/ or /d/, is made with the tongue on the ridge behind the teeth.",
        "children": [
          "English has only the alveolar category, so both Hindi sounds fall into it and seem identical."
        ]
      },
      {
        "text": "**In this case, transfer makes learning the L2 contrast more difficult**.",
        "children": [
          "The English category was learned perfectly well, but now it hides a difference that Hindi uses to tell words apart.",
          "The learner must learn to separate sounds that the first language trained them to treat as one."
        ]
      }
    ],
    "l2-learning-06": [
      {
        "text": "Transfer also shapes **grammar learning**. **Classifiers** are a **somewhat unusual grammatical feature across languages**. A **classifier** is a word that must come between a number or demonstrative and a noun, and which classifier is used depends on the kind of thing the noun names.",
        "children": [
          "The pattern is **demonstrative pronoun, then nominal classifier, then noun**, as in **yí gè rén**, “one person,” with **gè** as the classifier."
        ]
      },
      {
        "text": "Chinese has many classifiers, each tied to a kind of noun.",
        "children": [
          "**Gè** is the **general classifier**.",
          "**Bǎ** goes with **objects that have a handle**.",
          "**Běn** goes with **books and similar objects**.",
          "**Kuài** goes with **objects that are divided into pieces**.",
          "**Liàng** goes with **wheeled vehicles**.",
          "**Tái** goes with **devices and gadgets**.",
          "**Xiē** marks an **indeterminate amount**, or goes with the **plural** of pronouns and demonstratives.",
          "**Zhāng** goes with **flat objects**.",
          "**Zhī** goes with **long, thin objects**."
        ]
      },
      {
        "text": "**Native English speakers learning Chinese have difficulty learning these**.",
        "children": [
          "In English, saying **“a chair,” “that dog,” “the car”** or **“one book”** never requires noticing what kind of thing the noun names.",
          "**In Chinese, different classifiers are required by different nouns**, so the learner has to attend to properties such as shape and function."
        ]
      },
      {
        "text": "In learning English grammar, **English speakers have learned to ignore the different cues for classifiers**. Those object features play no role in English, so learning Chinese means paying attention again to cues English taught them to disregard.",
        "children": []
      }
    ],
    "l2-learning-07": [
      {
        "text": "**Grammatical gender** is another place where **transfer causes problems**. **Grammatical gender is different from social or cultural gender**. It sorts nouns into classes, often labeled masculine and feminine.",
        "children": [
          "**There is nothing “male” about a book or “female” about liberty**, yet French **le livre**, the book, is masculine and **la liberté**, liberty, is feminine.",
          "More French examples are masculine **le cheval** (the horse), **le chien** (the dog) and **le bruit** (the noise), and feminine **la colombe** (the dove), **la chemise** (the shirt) and **la maison** (the house)."
        ]
      },
      {
        "text": "**Grammatical gender has implications for agreement**. **Agreement** means related words must match the noun’s gender, so **pronouns, adjectives, some forms of verbs** and other words **all need to be coordinated with noun gender**.",
        "children": [
          "English nouns have no grammatical gender, so English speakers have no habit of tracking it."
        ]
      },
      {
        "text": "French is known for **synonyms with different genders**.",
        "children": [
          "**Auto** and **voiture** both mean car, and one is masculine while the other is feminine.",
          "**Rivière** and **fleuve** both mean river, feminine and masculine.",
          "**Vélo** and **bicyclette** both mean bicycle, masculine and feminine.",
          "Gender therefore has to be learned one word at a time."
        ]
      },
      {
        "text": "**Word endings** offer statistical hints about gender.",
        "children": [
          "**Masculine nouns** often end in **-age**, as in le fromage (the cheese), **-r**, as in le professeur (the teacher), **-t**, as in le chat (the cat), or **-isme**, as in le capitalisme.",
          "**Feminine nouns** often end in **-ie**, as in la boulangerie (the bakery), **-ion**, as in la nation, **-ité** or **-tié**, as in la fraternité (brotherhood), **-ance**, as in la balance (the scales), or **-nne, -mme** and **-lle**, as in la fille (the girl) and l’indienne."
        ]
      }
    ],
    "l2-learning-08": [
      {
        "text": "**Transfer is not all bad**, because **vocabulary learning in some L1–L2 situations is aided by the similarity of words across languages**.",
        "children": [
          "French **auto** looks like English “auto” and means a car.",
          "French **rivière** looks like English “river,” and French **bicyclette** looks like English “bicycle.”",
          "Japanese **コロッケ, korokke**, means a croquette, and Japanese **モノレール, monoreru**, means a monorail."
        ]
      },
      {
        "text": "Sometimes the resemblance is **due to shared etymology**, meaning a shared word history.",
        "children": [
          "Words with a common origin are **cognates**, such as French rivière and English river, which descend from the same older word."
        ]
      },
      {
        "text": "Sometimes the resemblance is **due to more recent “borrowing.”**",
        "children": [
          "A **loan word** is a word taken from another language.",
          "Japanese korokke and monoreru were borrowed from European languages and reshaped to fit Japanese sounds."
        ]
      },
      {
        "text": "Cognates and loan words give **positive transfer** for vocabulary.",
        "children": [
          "The learner already knows a similar form with a similar meaning, which anchors the new word.",
          "Someone who knows river can link it to rivière right away, so the new word is easier to store and recall."
        ]
      }
    ],
    "l2-learning-09": [
      {
        "text": "**Not all similar-sounding words are cognates**. **The bias to interpret L2 words as related to similar-sounding L1 words can be very strong**, and **sometimes the result is embarrassing**.",
        "children": [
          "A **false friend** is a word that looks or sounds like a word in another language but means something else."
        ]
      },
      {
        "text": "Spanish **“Arnold está embarazado”** does not mean that Arnold is embarrassed.",
        "children": [
          "**Embarazado** means **pregnant**.",
          "An English speaker going by the sound of embarrassed would badly misread the sentence."
        ]
      },
      {
        "text": "The link to the familiar word forms before the learner checks the meaning.",
        "children": [
          "If the meanings match, as with cognates, the link speeds learning.",
          "If they do not, the same link produces errors. A helpful cognate and a misleading false friend differ only in whether the meanings really match."
        ]
      }
    ],
    "l2-learning-10": [
      {
        "text": "**De Groot and Keijzer (2000)** tested in the lab whether people **use cognates in “second language” learning**.",
        "children": [
          "The task was **paired-associate learning of made-up words**. In **paired-associate learning**, people study pairs and later recall one member of a pair when given the other.",
          "The made-up words **varied in their similarity to their Dutch partners**, so some resembled the Dutch word and some did not.",
          "They **also varied in “concreteness.”** A **concrete** word names something that can be seen or touched, and an **abstract** word names an idea."
        ]
      },
      {
        "text": "Combining the two factors produced four kinds of pairs, which lets each factor be measured on its own.",
        "children": [
          "**Gitaar–gettar**, “guitar,” is **concrete and cognate-like**.",
          "**Tijger–duunze**, “tiger,” is **concrete and non-cognate**.",
          "**Domein–domaan**, “domain,” is **abstract and cognate-like**.",
          "**Herstel–groop**, “repair,” is **abstract and non-cognate**."
        ]
      },
      {
        "text": "**Participants were simply presented with pairs of Dutch words and their nonword partners and asked to learn the pairs**.",
        "children": [
          "They were Dutch speakers, so Dutch played the role of the first language and the made-up words played the role of a new second language.",
          "**They were then tested a week later on retention**, that is, on how well they remembered the pairs after a week without study."
        ]
      }
    ],
    "l2-learning-11": [
      {
        "text": "The results show that **cognates are learned more rapidly and also remembered more easily**. Recall was tested over three training sessions and again in a fourth session **after one week with no training**.",
        "children": []
      },
      {
        "text": "Recall improved across the three training sessions for every kind of word, but the starting points differed a great deal.",
        "children": [
          "**Concrete cognates** were easiest from the start, with **69.7%** recalled after the first session.",
          "**Concrete non-cognates** started much lower, at **43.7%**, and abstract non-cognates started lowest of all.",
          "By the third session, most kinds of words were recalled well."
        ]
      },
      {
        "text": "The week without training separated the kinds of words again.",
        "children": [
          "Concrete cognates kept most of what had been learned.",
          "**Abstract non-cognates** fell sharply, to **36.0%**.",
          "Responses were also faster for cognates in every session."
        ]
      },
      {
        "text": "This is evidence that **cognate status can contribute to the very earliest stages of word learning in a second language**.",
        "children": [
          "The cognate advantage was largest in the first session and reappeared after a week, when non-cognates were forgotten more.",
          "Concreteness also had a large effect, and the two factors add together. Abstract non-cognates have neither source of support and were the hardest of all.",
          "One explanation for concreteness effects is called **context availability**, the idea that concrete words are easier to link with a supporting context."
        ]
      }
    ],
    "l2-learning-12": [
      {
        "text": "The experiment deserves a closer look. **If de Groot and Keijzer had only tested “receptive” vocabulary**, meaning **how easily participants could produce the Dutch word given its made-up partner**, **this would not be very impressive**.",
        "children": [
          "Receptive testing shows the new word and asks for the familiar Dutch word.",
          "A cognate-like new word already resembles the Dutch word, so a participant could answer just by spotting the resemblance."
        ]
      },
      {
        "text": "**Many of the meanings, such as gitaar, tijger and domein, could be guessed without any Dutch training**, since they resemble English guitar, tiger and domain. The **concrete cognates** in the study are very close to their Dutch partners.",
        "children": [
          "**Broer–breur**, **brood–brodde**, **gitaar–gettar**, **jongen–jange** and **lepel–lippel**.",
          "**Lichaam–lechem**, **naald–nadel**, **paraplu–parredu**, **rivier–riffer** and **schaar–skare**.",
          "**Stier–stire**, **trein–trinen**, **varken–vark**, **viool–vialo** and **vrouw–vrauk**.",
          "Each made-up word is a slightly altered Dutch word."
        ]
      },
      {
        "text": "The study **also tested “expressive” vocabulary**, which the authors call **“productive” testing**.",
        "children": [
          "Productive testing shows the Dutch word and asks for the made-up word.",
          "The learner must recall the exact new form, such as gettar, from many near possibilities.",
          "That removes the shortcut, so a cognate advantage on productive testing reflects genuine learning of new forms."
        ]
      }
    ],
    "l2-learning-13": [
      {
        "text": "A second comparison looks at **productive testing** and **receptive testing**, both **immediately after learning** and **at retest a week later**. The key measure is how much recall dropped over the week.",
        "children": []
      },
      {
        "text": "In **productive testing**, learners had to produce the new word.",
        "children": [
          "Concrete words were forgotten less than abstract words.",
          "Cognates lost about **16 points** over the week, while non-cognates lost about **30 points**."
        ]
      },
      {
        "text": "In **receptive testing**, learners had to give the Dutch word.",
        "children": [
          "Scores were higher overall, because recognizing a familiar word is easier than producing a new one.",
          "Cognates lost only about **8 points**, while non-cognates again lost much more, about **28 points**."
        ]
      },
      {
        "text": "Cognates and concrete words were forgotten less in **both** directions, so their advantage extends from initial learning to long-term retention.",
        "children": [
          "The cognate advantage held up in productive testing, where the learner had to recall the new form itself.",
          "Similarity to a known word helped learners form a lasting memory of the new word."
        ]
      }
    ],
    "l2-learning-14": [
      {
        "text": "A central **research question** is whether **similar L1 words are always activated when processing L2**, and **there have been many, many studies of this**.",
        "children": [
          "When a bilingual hears a second-language word, first-language words that sound alike might become active too.",
          "That activation could happen automatically, even while the person tries to use only the second language. If it does, the two languages are never fully separate in the mind."
        ]
      },
      {
        "text": "**Marian and Spivey (2003)** give **one clear example** with a **“visual world” experiment**.",
        "children": [
          "In this kind of experiment, people hear spoken instructions while looking at a set of objects, and their eye movements are tracked.",
          "Glances toward an object whose L1 name sounds like the spoken L2 word would reveal that the L1 word became active.",
          "Eye movements capture that activation without asking for any report, while the person still goes on to pick the correct object."
        ]
      }
    ],
    "l2-learning-15": [
      {
        "text": "The design follows **McMurray, Tanenhaus, Aslin and Spivey (2003)**, who studied **gradient effects of within-category VOT on lexical access**.",
        "children": [
          "Participants saw a **lamp**, a **ship**, a **bear** and a **pear**, and heard a word from a continuum running between “bear” and “pear.”",
          "Bear and pear differ only in their first consonant, while the lamp and ship are unrelated fillers."
        ]
      },
      {
        "text": "**Eye movements reveal competition between possible responses that participants are considering**.",
        "children": [
          "Someone can click on the bear after glancing briefly at the pear.",
          "Those glances mean “pear” was active as a competitor."
        ]
      },
      {
        "text": "**The amount of competition between BEAR and PEAR depended on distance from the category boundary**.",
        "children": [
          "Sounds near the /b/–/p/ boundary drew more looks to the competitor, and sounds far from it drew fewer.",
          "Eye tracking therefore measures how active an alternative word is, even when the final choice is correct.",
          "The same method can ask whether a word in one language competes with a similar word in another."
        ]
      }
    ],
    "l2-learning-16": [
      {
        "text": "**Allopenna and colleagues (1994)** demonstrated the **“cohort effect.”** A **cohort** is the set of words that share the same beginning sounds.",
        "children": [
          "Participants viewed a grid containing pictures and shapes and followed spoken instructions.",
          "The display included a **beaker**, the target, a **beetle**, which shares its beginning with beaker, a **speaker**, which rhymes with beaker, and a **carriage**, which is unrelated."
        ]
      },
      {
        "text": "Looks to the **beaker** and the **beetle** rose together early, because both fit the first sounds of the word.",
        "children": [
          "Once the sounds that separate the two words arrived, looks to the beetle dropped away, while looks to the beaker kept climbing.",
          "Looks to the **speaker** rose later and stayed smaller, because its overlap comes at the end of the word.",
          "Looks to the carriage stayed near zero."
        ]
      },
      {
        "text": "The **cohort effect** is this early competition from words that share a beginning with the target.",
        "children": [
          "Words compete as soon as they match the incoming sounds.",
          "They drop out when the input stops matching them, and eye movements track this rise and fall moment by moment."
        ]
      }
    ],
    "l2-learning-17": [
      {
        "text": "**Marian and Spivey** tested the cohort effect with **“cross-language competitors.”** A cross-language competitor is an object whose name in the **other language** begins like the spoken target word.",
        "children": []
      },
      {
        "text": "**If L1 words are always activated, native Russian speakers should look at a book of matches when the target is “speaker” in English**.",
        "children": [
          "English **speaker** starts with the same sounds as Russian **спички, spichki**, which means **matches**.",
          "If Russian is active during English listening, the matches should draw looks."
        ]
      },
      {
        "text": "For **English targets**, each target came with an **English competitor** and a **Russian competitor**.",
        "children": [
          "**Speaker** came with English **spear** and Russian **spichki**, matches.",
          "**Boot** came with **book** and **buben**, tambourine, and **shark** came with **shovel** and **sharik**, balloon.",
          "**Chair** came with **chess set** and **cherepaha**, turtle, and **marker** came with **marbles** and **marka**, stamp.",
          "**Barbed wire** came with **bark** and **barhat**, velvet, and **plug** came with **plum** and **platye**, dress.",
          "**Gun** came with **gum** and **gaika**, nut, and **lock** came with **lobster** and **lak dlea nogtei**, nail polish."
        ]
      },
      {
        "text": "For **Russian targets**, the roles were reversed.",
        "children": [
          "Russian **spichki**, matches, came with English **spear** and Russian **spitsi**, knitting needles.",
          "Russian **marka**, stamp, came with English **marker** and Russian **marlya**, cheese cloth.",
          "Russian **platye**, dress, came with English **plum** and Russian **plashch**, raincoat."
        ]
      },
      {
        "text": "The tie between a target and its cross-language competitor is only **sound**.",
        "children": [
          "Speakers and matches share no meaning.",
          "The overlap exists only for someone who knows Russian, so looks to the matches during an English task directly measure activation of spichki."
        ]
      }
    ],
    "l2-learning-18": [
      {
        "text": "Russian–English bilinguals first followed instructions in **English**, which tests **competition during L2 spoken word recognition**.",
        "children": [
          "When only the **between-language competitor** was present, it drew looks on **18%** of trials.",
          "An unrelated control object drew looks on only **7%** of trials."
        ]
      },
      {
        "text": "**When only one competitor was present, participants looked at within- and between-language competitors to the same extent**.",
        "children": [
          "The Russian name of the matches pulled the eyes as strongly as a similar English word did."
        ]
      },
      {
        "text": "**When both competitors were present, participants looked at the within-language competitor more**, **but still looked at the between-language competitor a lot**, about **twice as often as the control condition**.",
        "children": [
          "With both side by side, the English competitor won out.",
          "The Russian competitor still drew far more looks than an unrelated object."
        ]
      },
      {
        "text": "The first language therefore stays active during second-language listening. Bilinguals still choose the correct object, but L1 words compete on the way there.",
        "children": []
      }
    ],
    "l2-learning-19": [
      {
        "text": "The same bilinguals then followed instructions in **Russian**, which tests **competition during L1 spoken word recognition**.",
        "children": [
          "The within-language competitor, a Russian word, still drew extra looks, so the cohort effect appeared in Russian.",
          "An object with a similar **English** name drew looks on **8%** of trials, compared with **5%** for the control object."
        ]
      },
      {
        "text": "**English words do not seem to be activated when native Russian speakers do this experiment in Russian**.",
        "children": [
          "The **small numerical difference between the between-language and control conditions** is **not statistically significant**.",
          "A difference that is not statistically significant falls within ordinary chance variation."
        ]
      },
      {
        "text": "The two experiments together produce an **asymmetric** pattern.",
        "children": [
          "Russian words became active during English tasks.",
          "English words did not become reliably active during Russian tasks.",
          "The asymmetry fits the idea that the first language is more firmly established and more easily activated than the second."
        ]
      }
    ],
    "l2-learning-20": [
      {
        "text": "**The Revised Hierarchical Model** of **Kroll and Stewart** explains **L1–L2 interactions in terms of spreading activation**. **Spreading activation** means that activating one representation partly activates the representations linked to it.",
        "children": [
          "The model has an **L1** vocabulary, an **L2** vocabulary and a store of **concepts**, or meanings.",
          "**Lexical links** join L1 and L2 words directly, and **conceptual links** join each vocabulary to the concepts."
        ]
      },
      {
        "text": "**The L1 lexicon is assumed to be larger and more strongly connected to relevant concepts**.",
        "children": [
          "First-language words have strong links to their meanings.",
          "Second-language words have weaker links to their meanings."
        ]
      },
      {
        "text": "**The L2 lexicon is assumed to have strong forward connections to the L1 lexicon**.",
        "children": [
          "The lexical link from L2 to L1 is strong, and the link from L1 to L2 is weak.",
          "**Activation can spread more readily from an L2 word to an L1 word than the other way**."
        ]
      },
      {
        "text": "**This occurs because this direction is emphasized in learning**.",
        "children": [
          "Learners usually attach each new L2 word to its L1 translation, which builds a strong path from L2 words to L1 words.",
          "The direct path from L2 words to concepts stays weaker, at least early on, and it can grow stronger as proficiency rises."
        ]
      }
    ],
    "l2-learning-21": [
      {
        "text": "The **Revised Hierarchical Model of Kroll and Stewart (1990, 1994)** accounts for the Marian and Spivey results. During the **L2** task with the target “speaker,” several things happen in the model.",
        "children": [
          "**The concept for “matches” partially activates the Russian word for matches**, spichki, because L1 words are tightly linked to their concepts.",
          "The sounds of English **speaker** also partly activate spichki, since the two words start alike.",
          "**This activity feeds back to the conceptual activation for “matches.”**",
          "**Conceptual activation for matches leads to eye movements toward the L1 competitor**, the matches."
        ]
      },
      {
        "text": "Speaker and spichki are linked only by **sound overlap**.",
        "children": [
          "They share no meaning.",
          "The extra activation of spichki boosts the concept of matches, which pulls the eyes toward the matches."
        ]
      },
      {
        "text": "**When the task is done in L1**, **the conceptual links with L2 might be too weak to create this kind of interference reliably**.",
        "children": [
          "In the Russian task, an English competitor would need strong links from the English word to its concept.",
          "The model gives L2 words only weak conceptual links, too weak to drive looks to their objects.",
          "The imbalance in looks follows directly from the imbalance in links."
        ]
      }
    ],
    "l2-learning-22": [
      {
        "text": "The Revised Hierarchical Model makes a **counter-intuitive prediction** even for **“balanced bilinguals,”** people who are about equally skilled in both languages.",
        "children": [
          "It might seem that a balanced bilingual is **“two monolinguals in one,”** with each language running on its own.",
          "The model predicts the reverse."
        ]
      },
      {
        "text": "For a balanced bilingual, **the conceptual links are similarly strong for both languages**.",
        "children": [
          "Each concept strongly activates its word in both languages, so both vocabularies wake up whenever either is used.",
          "**Competitive dynamics and inhibition will be engaged all the time**. **Competitive dynamics** means that words from the two languages keep competing for selection, and **inhibition** means suppressing the word from the language not in use."
        ]
      },
      {
        "text": "This prediction **has led to a lot of work on bilinguals’ advantages in nonlinguistic cognitive control tasks**.",
        "children": [
          "**Cognitive control** is the ability to direct attention and hold back irrelevant responses.",
          "Bilinguals who constantly practice choosing one language and suppressing the other might get better at controlling attention in general, even on tasks unrelated to language."
        ]
      }
    ],
    "l2-learning-23": [
      {
        "text": "Second-language learning usually follows a familiar sequence.",
        "children": [
          "A person **begins learning L1**.",
          "Later, the person **learns L2**.",
          "Meanwhile, the person **continues learning and using L1**, so both languages stay in use."
        ]
      },
      {
        "text": "**What happens when someone stops using L1 after L2 is introduced?**",
        "children": [
          "Here L1 is learned first and L2 later, but use of L1 stops.",
          "L1 is no longer heard or spoken, and L2 takes its place."
        ]
      },
      {
        "text": "This situation pulls apart two things that normally go together, learning a language early and continuing to use it.",
        "children": [
          "If early learning lays a permanent foundation, traces of L1 should survive without use.",
          "If ongoing use is required, L1 might fade or vanish."
        ]
      }
    ],
    "l2-learning-24": [
      {
        "text": "**Pallier, Dehaene, Poline, LeBihan, Argenti, Dupoux and Mehler** used **brain imaging of language plasticity in adopted adults** to ask **whether a second language can replace the first**.",
        "children": [
          "They tested **adults aged 20 to 32** who **had been adopted into French homes from Korean orphanages between the ages of 3 and 8**.",
          "These adults learned Korean as young children and then grew up in homes where only French was spoken.",
          "They stopped using Korean altogether after adoption, which makes them a natural case of L1 use stopping."
        ]
      },
      {
        "text": "The question was whether the adoptees **had any residual knowledge of Korean**, meaning any leftover trace of the earlier language.",
        "children": [
          "French speakers with no exposure to Korean served as the comparison group.",
          "If adoptees beat the French speakers on Korean-related tasks, some Korean knowledge must have survived.",
          "Whatever survived would reveal what early learning leaves behind once a language falls out of use."
        ]
      }
    ],
    "l2-learning-25": [
      {
        "text": "Korean has a **three-way stop contrast**. A **stop** is a consonant made by fully blocking the airflow and then releasing it, such as /p/, /t/ or /k/.",
        "children": [
          "English and French have two kinds of stop at each place in the mouth, such as /b/ and /p/.",
          "Korean has three kinds at each place, **aspirated**, **plain** and **tense**. An **aspirated** stop comes with a strong puff of air, a **plain** stop has a lighter release, and a **tense** stop is made with a stiffened throat."
        ]
      },
      {
        "text": "The contrast appears at three places of articulation, in recordings from the UCLA Phonetics Archive.",
        "children": [
          "At the lips, the **bilabial** series is **pʰul**, “grass,” **pul**, “fire,” and **p’ul**, “horn.”",
          "At the teeth, the **dental** series is **tʰal**, “mask,” **tal**, “moon,” and **t’al**, “daughter.”",
          "At the back of the tongue, the **velar** series is **kʰo**, “nose,” **kok**, “music,” and **k’ok**, “exactly.”"
        ]
      },
      {
        "text": "The words in each series share a place of articulation and differ only in stop type.",
        "children": [
          "French has no such contrast, so French speakers tend to hear the three Korean sounds as two, while Korean speakers hear three distinct sounds.",
          "Adoptees who kept any Korean sound knowledge should hear these differences better than French speakers do."
        ]
      }
    ],
    "l2-learning-26": [
      {
        "text": "**Ventureyra and colleagues** found that **Korean adoptees in France were no better than monolingual French speakers** at discriminating the Korean contrasts. Listeners heard pairs of sounds and judged whether they were different.",
        "children": []
      },
      {
        "text": "The test pairs used the Korean stop contrasts, plain versus tense, plain versus aspirated, and tense versus aspirated, along with a plain–tense contrast for s.",
        "children": [
          "Korean speakers heard these differences nearly every time.",
          "Adoptees and French speakers rarely heard them, and the adoptees were no better than the French speakers."
        ]
      },
      {
        "text": "Two control conditions checked general performance.",
        "children": [
          "On a **vowel** contrast, all three groups heard the difference nearly every time.",
          "On pairs of **identical** sounds, all groups correctly said “same” almost every time."
        ]
      },
      {
        "text": "The adoptees could do the task, as their vowel results and their correct “same” responses confirm.",
        "children": [
          "The difficulty was specific to the Korean stop contrasts.",
          "On those contrasts, the adoptees heard the differences at the same level as people who had never heard Korean, far below Korean speakers."
        ]
      }
    ],
    "l2-learning-27": [
      {
        "text": "In **a more extensive study**, **Pallier and colleagues** found that **adoptees were no better than monolingual French speakers** on three tasks, each tapping a different kind of knowledge.",
        "children": [
          "**(a) Distinguishing Korean from a collection of largely unrelated languages** tapped familiarity with the overall sound of Korean. Participants rated how much each sentence sounded like Korean. Both groups rated Korean and Japanese sentences as similarly Korean-like, and gave lower ratings to Polish, Swedish and Wolof. Adoptees did not pick out Korean any better.",
          "**(b) Identifying the correct Korean translation of French words** tapped memory for vocabulary. Both groups scored close to chance.",
          "**(c) Deciding whether a short excerpt came from a sentence they had just heard** tapped sensitivity to sound sequences. Both groups did best on French, and they did equally well on Korean, Japanese and Polish, with no advantage for Korean among the adoptees."
        ]
      },
      {
        "text": "**These are not standard psycholinguistic tasks**.",
        "children": [
          "Pallier and colleagues **were looking for any remaining trace of Korean**, using tasks designed to catch even weak knowledge.",
          "They **did not find any**. On every measure, the adoptees looked like people who had never learned Korean."
        ]
      }
    ],
    "l2-learning-28": [
      {
        "text": "Pallier and colleagues also scanned the participants’ brains. In both groups, **listening to French activated the classical language network, including superior temporal and inferior frontal regions**.",
        "children": [
          "The **superior temporal** region, in the upper temporal lobe, handles speech sounds.",
          "The **inferior frontal** region, in the lower frontal lobe, includes Broca’s area."
        ]
      },
      {
        "text": "For each group, brain activity for French was compared with activity for **Polish**, **Japanese** and **Korean**.",
        "children": [
          "French always produced more language-network activity than any of the foreign languages.",
          "This held for the **French group** and for the **Korean group**, the adoptees."
        ]
      },
      {
        "text": "**Subtracting Korean from French might have revealed some difference between groups**, if there were **any residual processing ability for Korean left**.",
        "children": [
          "Adoptees who still processed Korean as a language would show more language-network activity for Korean than French speakers would, which would shrink the French-minus-Korean difference.",
          "**It was not** so. The adoptees’ brains treated Korean as a foreign language, much like Polish and Japanese, and the imaging agrees with the behavioral tests."
        ]
      }
    ],
    "l2-learning-29": [
      {
        "text": "**L2–L1 interactions** can also be framed as **competitive dynamics**.",
        "children": [
          "**L1 can be thought of as a set of connections within and between different brain regions**.",
          "Use builds these connections and keeps them in place."
        ]
      },
      {
        "text": "The process seen in **monocular deprivation** in vision could also apply to language.",
        "children": [
          "When one eye of a mouse is deprived, its connections first become unstable, with **increased spine motility**.",
          "Next come **spine loss and Wallerian degeneration**, the breakdown of nerve fibers cut off from input.",
          "After more than a week, the other eye’s fibers show **axon sprouting and new spine birth** and take over the vacated space.",
          "The eye that keeps getting input wins the connections the deprived eye loses."
        ]
      },
      {
        "text": "**If the L1 connections are never activated again, they could be “taken over” by L2**.",
        "children": [
          "L2 is used constantly, so its connections grow stronger and spread.",
          "L1 goes unused, so its connections weaken and become available to L2.",
          "On this account, L2 replaces L1 by winning a competition for the same neural resources."
        ]
      }
    ],
    "l2-learning-30": [
      {
        "text": "Asked whether **a second language can replace the first**, the evidence answers **“Apparently yes!”** The adoptees showed no behavioral or brain sign of their childhood Korean.",
        "children": [
          "As far as these tests could detect, French had fully replaced Korean."
        ]
      },
      {
        "text": "The open question is whether **traces of L1 are left behind that can be “salvaged.”**",
        "children": [
          "**Salvaging** a trace means recovering or making use of some lingering effect of the earlier language.",
          "Such a trace might not appear on a test of present ability yet could still make relearning easier."
        ]
      },
      {
        "text": "Testing present recognition and testing later learning ask different questions.",
        "children": [
          "The first asks what the person can do with the language right now.",
          "The second asks whether new learning profits from something left over, and relearning is the measure that could expose such a trace."
        ]
      }
    ],
    "l2-learning-31": [
      {
        "text": "**Terry Au and colleagues** at UCLA studied this question in **“Overhearing a language during childhood,”** by **Au, Knightly, Jun and Oh**.",
        "children": [
          "They studied **undergraduate students who overheard Spanish frequently as children but never learned to speak it**.",
          "**All participants started classroom instruction of Spanish at around age 14** and **were tested at the end of a second-year college Spanish course**."
        ]
      },
      {
        "text": "The overhearers were compared with **native speakers** and **typical late L2 learners**. On measures of pronunciation, the overhearers came out far ahead of the late learners.",
        "children": [
          "Their **voice onset time** for voiceless stops matched native speakers almost exactly, about **19.3** milliseconds for natives and **19.6** for overhearers. Late learners produced much longer, English-like values, about **36.2** milliseconds.",
          "They also softened voiced stops between vowels more like native speakers. This softening is called **lenition**.",
          "Their **accent ratings** fell between native speakers and late learners, with native speakers rated about **4.3** on a 5-point scale.",
          "They knew some childhood slang that late learners did not."
        ]
      },
      {
        "text": "On grammar, the overhearers had little or no advantage.",
        "children": [
          "In **gender agreement** and **number agreement**, they performed about like late learners.",
          "Their **grammaticality judgments** were no more accurate than those of late learners."
        ]
      },
      {
        "text": "Childhood overhearing gave a clear advantage in **pronunciation** but not in grammar. Early listening left traces in the sound system that were unmasked when the students later studied Spanish, while grammar seems to need more than overheard input.",
        "children": []
      }
    ],
    "l2-learning-32": [
      {
        "text": "Combining **the data from Korean adoptees together with the data from overhearers** yields a picture.",
        "children": [
          "**If L1 is removed from the environment entirely, L2 can appear to completely replace it**, as the adoptees showed no Korean on any test of present ability.",
          "**But this replacement is not necessarily complete**. **There may be some residual knowledge that can be “unmasked” with later learning**, as with the Spanish overhearers’ pronunciation."
        ]
      },
      {
        "text": "The two groups also differ in **potentially important ways**.",
        "children": [
          "The adoptees were tested on what they knew, with no new Korean instruction.",
          "The overhearers were tested after two years of Spanish classes, which gave hidden knowledge a chance to surface.",
          "These and other differences make the two sets of results hard to compare directly."
        ]
      }
    ],
    "l2-learning-33": [
      {
        "text": "Several **potentially important differences between these populations** might explain why one group kept traces of an early language and the other did not.",
        "children": [
          "**Korean is rarely heard or encountered in France**, but **Spanish is common in Los Angeles**, so overhearers may have kept hearing Spanish all their lives, which could keep their sound knowledge alive.",
          "A **“heritage language”** spoken by family members differs from **a language not spoken by anyone you know**. Overhearers often heard Spanish from relatives, while adoptees lost all contact with Korean speakers.",
          "**Cognates** are plentiful between Spanish and English but scarce between Korean and French, and shared vocabulary could help overhearers relearn.",
          "**Shared writing system**. Spanish and English use the same alphabet, while Korean uses a script different from French."
        ]
      },
      {
        "text": "**This is a general issue** in research on **second language acquisition and bilingualism**.",
        "children": [
          "**Languages and learning situations differ in many, many ways that are hard, perhaps impossible, to control experimentally**.",
          "Researchers cannot assign people to grow up with particular languages in particular settings.",
          "Separating these factors would take groups that differ in just one way, which real language histories rarely provide."
        ]
      }
    ],
    "l2-sensitive-01": [],
    "l2-sensitive-02": [
      {
        "text": "**Second-language, or L2, learning** works as **a model system for sensitive period research**. A **model system** is a common, easily studied situation used to answer questions about a process that is hard to study directly.",
        "children": []
      },
      {
        "text": "**Lenneberg (1967)** proposed the influential idea that **the sensitive period had to do with the development of cerebral dominance**, also described as **developmental changes in language laterality**.",
        "children": [
          "**Cerebral dominance** means one hemisphere, usually the left, becomes specialized for language.",
          "**Language laterality** is how much language relies on one side of the brain instead of both.",
          "On this idea, the language-learning window shuts once language settles into the left hemisphere."
        ]
      },
      {
        "text": "Two kinds of evidence led to the theory.",
        "children": [
          "**A rough alignment of the literature on brain development with new insights about language milestones**. Cortical neurons grow quickly for about two years and then level off, and no measurements were available from age 2 to 18. Lenneberg tied the end of fast brain growth to the start of language learning.",
          "**A review of the literature on resilience after brain injury or surgery**. Children who lost the left hemisphere often went on to develop language, while adults did not regain it."
        ]
      },
      {
        "text": "The theory is about the brain’s **maturational state**, meaning its stage of physical development. A young, less specialized brain can move language to other tissue, and a mature, specialized brain has fewer ways to do so.",
        "children": []
      }
    ],
    "l2-sensitive-03": [
      {
        "text": "**Much of what is known about first-language, or L1, sensitive periods comes from research on idiosyncratic cases or relatively rare phenomena**. **Idiosyncratic** means particular to one individual.",
        "children": [
          "The evidence includes children recovering from surgery that removed a hemisphere, and Genie, who was cut off from language until age 13.",
          "Every one of these cases carries other unusual circumstances, such as injury, illness or abuse, so the true cause of an outcome is hard to identify."
        ]
      },
      {
        "text": "**In contrast, many people learn second languages at different times in their lives, often with somewhat limited success**.",
        "children": [
          "Second-language learners are plentiful, so researchers can study large groups instead of single rare cases.",
          "They begin at every age from early childhood to late adulthood, and their final success can be measured."
        ]
      },
      {
        "text": "**The limits of L2 success have also been used to reason about the timing of the sensitive or critical period**.",
        "children": [
          "If later starters reliably end up at lower levels, the age where the decline appears could mark when the sensitive period closes.",
          "The first language complicates matters, since every L2 learner already knows a language and that knowledge shapes how the new one is learned."
        ]
      }
    ],
    "l2-sensitive-04": [
      {
        "text": "**Johnson and Newport** examined **critical period effects in second-language learning**, in a paper on **the influence of maturational state on the acquisition of English as a second language**. **Lenneberg (1967) hypothesized that language could be acquired only within a critical period**, running from early infancy to puberty.",
        "children": [
          "In its basic form, the hypothesis concerns only first-language acquisition.",
          "Whether it also applies to second-language acquisition is an important open question.",
          "If it does, young children should learn a second language better than adults and reach higher final proficiency."
        ]
      },
      {
        "text": "The researchers compared the **English proficiency of 46 native Korean or Chinese speakers** who had **arrived in the United States between the ages of 3 and 39**.",
        "children": [
          "When tested, they had lived in the United States **between 3 and 26 years**.",
          "A **grammaticality judgment task** probed **a wide variety of structures of English grammar**."
        ]
      },
      {
        "text": "Earlier arrivals held **a clear and strong advantage** over later arrivals.",
        "children": [
          "**Test performance was linearly related to age of arrival up to puberty**, so each extra year of age at arrival meant a lower score.",
          "**After puberty, performance was low but highly variable and unrelated to age of arrival**."
        ]
      },
      {
        "text": "The age effect was **not an accidental result of differences in amount of experience with English, motivation, self-consciousness or American identification**.",
        "children": [
          "It **appeared on every grammatical structure tested**, even though later learners mastered some structures far better than others.",
          "The authors concluded that **a critical period for language acquisition extends its effects to second-language acquisition**."
        ]
      }
    ],
    "l2-sensitive-05": [
      {
        "text": "**Johnson and Newport** built a **grammaticality judgment test**, or **GJT**. **Participants listened to recorded sentences and simply had to say whether each sentence was grammatical or not**, and **the test was untimed**.",
        "children": [
          "A **grammaticality judgment** is a decision about whether a sentence obeys the rules of the language.",
          "Being untimed, the test let participants take as long as they liked."
        ]
      },
      {
        "text": "Every item had a grammatical version and an ungrammatical version, marked with an asterisk, and each pair targets one rule of English.",
        "children": [
          "**(1a) “The farmer bought two pigs at the market”** and **(1b) “The farmer bought two pig at the market”** test **plural marking** on nouns.",
          "**(2a) “The little boy is speaking to a policeman”** and **(2b) “The little boy is speak to a policeman”** test the **progressive -ing** form of the verb."
        ]
      },
      {
        "text": "Several pairs target articles and other **determiners**.",
        "children": [
          "**(6a) “Tom is reading a book in the bathtub”** and **(6b) “Tom is reading book in the bathtub”** test whether a needed article is present.",
          "**(7a) “The boys are going to the zoo this Saturday”** and **(7b) “A boys are going to the zoo this Saturday”** test whether the determiner agrees with the noun in number.",
          "**(8a) “Larry went home after the party”** and **(8b) “Larry went the home after the party”** test a spot where English forbids an article."
        ]
      },
      {
        "text": "Other pairs target questions.",
        "children": [
          "**(23a) “When will Sam fix his car?”** and **(23b) “When Sam will fix his car?”** test **wh-question** word order, where the helping verb comes before the subject.",
          "**(24a) “What do they sell at the corner store?”** and **(24b) “What they sell at the corner store?”** test the need for the helping verb “do” in a question."
        ]
      }
    ],
    "l2-sensitive-06": [
      {
        "text": "**The data** relate each participant’s score on the grammar test to their **age of arrival**, or **AOA**. The participants are split at puberty, which marks the end of the critical period in Lenneberg’s proposal.",
        "children": [
          "A **correlation**, written r, measures how closely two variables are related, from −1 to +1. A value near −1 means one variable falls steadily as the other rises. A value near 0 means little relationship."
        ]
      },
      {
        "text": "Among **early arrivals**, aged **3 to 15**, the correlation was **r = −0.87**.",
        "children": [
          "Children who arrived youngest scored near the maximum.",
          "Scores fell steadily with each year of later arrival.",
          "Age of arrival predicts most of the score in this group."
        ]
      },
      {
        "text": "Among **late arrivals**, aged **17 to 39**, the correlation was only **r = −0.16**.",
        "children": [
          "Scores were lower overall and widely scattered.",
          "Some adults scored nearly as well as older child arrivals, while others who arrived at the same age scored far lower.",
          "Age of arrival predicts little about who does well among adults."
        ]
      },
      {
        "text": "The pattern combines a strong age effect in childhood with lower, highly variable performance in adulthood.",
        "children": []
      }
    ],
    "l2-sensitive-07": [
      {
        "text": "The **Johnson and Newport data** have three main features.",
        "children": [
          "**AOA**, age of arrival, is strongly related to accuracy, with earlier arrival going with higher scores.",
          "**Early learners, up to about age 8, are often near-perfect**, meaning **native-like**, scoring close to native English speakers.",
          "Late arrivals show a **nearly random distribution of accuracy**, since among adults age of arrival barely predicts the score."
        ]
      },
      {
        "text": "The first two features concern learners who arrived as children.",
        "children": [
          "The youngest arrivals reach native-like grammar.",
          "Arrivals between about 8 and 15 reach steadily lower levels, so the decline begins well before puberty."
        ]
      },
      {
        "text": "A **“nearly random distribution”** has a specific meaning here.",
        "children": [
          "It means that among late arrivals, age of arrival and score are only weakly related.",
          "Late arrivals scored well above chance, but individual scores varied enormously. Two adults who arrived at the same age could end up far apart."
        ]
      }
    ],
    "l2-sensitive-08": [
      {
        "text": "**Johnson and Newport argue that these data are consistent with a sensitive period** for L2 learning, though they call it a **“critical period.”** The argument has two parts.",
        "children": []
      },
      {
        "text": "**First, the dependence of ultimate attainment on AOA is consistent with a loss of language-learning ability over development**.",
        "children": [
          "**Ultimate attainment** is the final level a learner reaches.",
          "Scores fall steadily as childhood arrival age rises, which suggests that language-learning ability declines as children mature.",
          "**The timing is not entirely consistent with Lenneberg’s hypothesis**, which put the end of the critical period at puberty, while the decline here starts around age 7 or 8.",
          "Lenneberg **was working with a large gap in the data between early childhood and adolescence**, with no brain measurements between ages 2 and 18, so his timing was only a rough estimate."
        ]
      },
      {
        "text": "**Second, attainment in late acquisition is all over the place**, and adults who arrived at the same age reach very different levels.",
        "children": []
      },
      {
        "text": "**After the sensitive period closes, attainment depends on idiosyncratic learning abilities, not on the usual language acquisition processes**.",
        "children": [
          "**Idiosyncratic learning abilities** are individual differences in skills such as memory, motivation or analytical skill.",
          "Children share one natural acquisition process, so they reach similar levels at similar ages.",
          "Adults have lost that process and must lean on their own abilities, which differ a great deal between people."
        ]
      }
    ],
    "l2-sensitive-09": [
      {
        "text": "The **“critical period” hypothesis** comes in **two versions**.",
        "children": []
      },
      {
        "text": "**Version one is the exercise hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**If the capacity is not exercised during this time, it will disappear or decline with maturation**.",
          "**If the capacity is exercised, however, further language-learning abilities will remain intact throughout life**.",
          "An adult who learned an L1 normally should then learn an L2 as well as a child does."
        ]
      },
      {
        "text": "**Version two is the maturational state hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**This capacity disappears or declines with maturation**, whether or not it has been used.",
          "Even a person with a normal L1 should then learn an L2 less well as an adult."
        ]
      },
      {
        "text": "Every Johnson and Newport participant had a normal first language, yet later starters learned the L2 less well.",
        "children": [
          "That result supports the **maturational state hypothesis**, which is the idea named in the paper’s title."
        ]
      },
      {
        "text": "This prompts the question of **whether the L1 critical period data should be interpreted differently**.",
        "children": [
          "In cases like Genie, the capacity was never exercised, and both hypotheses predict poor learning for such cases.",
          "Only second-language data can separate the two versions, because only L2 learners have already exercised the capacity before learning another language."
        ]
      }
    ],
    "l2-sensitive-10": [
      {
        "text": "**Test design** raises a **methodological issue**, because **the grammaticality judgment task is very different from fluent language use**.",
        "children": [
          "In fluent use, people speak and understand quickly without stopping to consider rules.",
          "In a grammaticality judgment task, people weigh each sentence and decide whether it is correct."
        ]
      },
      {
        "text": "**One concern is the use of “metalinguistic” or “explicit” knowledge**. **Metalinguistic knowledge** is conscious knowledge about language, such as knowing that English plurals add “-s.”",
        "children": []
      },
      {
        "text": "**Ellis (2005)** compares **implicit** and **explicit knowledge** on several dimensions.",
        "children": [
          "**Awareness**. Implicit knowledge brings **intuitive awareness** of linguistic norms, and explicit knowledge brings **conscious awareness**.",
          "**Type of knowledge**. Implicit knowledge is **procedural**, a knowing-how of rules and fragments. Explicit knowledge is **declarative**, a knowing-that about grammatical rules and fragments.",
          "**Systematicity**. Implicit knowledge is variable but systematic, and explicit knowledge is often anomalous and inconsistent.",
          "**Accessibility**. Implicit knowledge is reached through **automatic processing**, and explicit knowledge through effortful **controlled processing**.",
          "**Use of L2 knowledge**. Implicit knowledge serves **fluent performance**, and explicit knowledge serves a speaker who is **planning** or struggling.",
          "**Self-report**. Implicit knowledge is **nonverbalizable**, so people cannot explain it, and explicit knowledge is **verbalizable**.",
          "**Learnability**. Implicit knowledge is **potentially only learnable within the critical period**, and explicit knowledge is learnable at **any age**."
        ]
      },
      {
        "text": "An untimed GJT lets people draw on explicit knowledge, so it may miss the implicit knowledge the critical period is thought to affect. A learner who consciously applies a classroom rule can earn the same score as one who knows the rule implicitly.",
        "children": []
      }
    ],
    "l2-sensitive-11": [
      {
        "text": "One suggestion is that **the task demands of the untimed GJT make it a better measure of explicit learning of “metalinguistic” knowledge than of grammar acquisition**. **Ellis (2005)** compared the **design features** of five tests.",
        "children": [
          "**Imitation** and **oral narrative** rely on feel, are done under time pressure, and focus on meaning. They require no metalinguistic knowledge.",
          "The **timed GJT** relies on feel and is done under time pressure, but focuses on form. It requires no metalinguistic knowledge.",
          "The **untimed GJT** relies on rules, is done without time pressure, and focuses on form. It **does** allow metalinguistic knowledge.",
          "The **metalanguage** test, which asks people to state rules, also relies on rules, has no time pressure, focuses on form and requires metalinguistic knowledge."
        ]
      },
      {
        "text": "Ellis then related each test to two background measures, the age when people started learning and their years of formal instruction. Only two relationships were significant.",
        "children": [
          "Starting age was related to the **timed GJT**, with a correlation of **−0.23**.",
          "Years of formal instruction were related to the **untimed GJT with ungrammatical items**, with a correlation of **0.27**.",
          "The other tests showed only weak relationships with either measure."
        ]
      },
      {
        "text": "**Consistent with this, untimed GJT performance is correlated with years of formal education in L2**.",
        "children": [
          "Formal classroom instruction teaches explicit rules, which help on the untimed test.",
          "Starting age matters for the timed test, which limits the use of explicit rules.",
          "An age effect found with an untimed GJT may therefore partly reflect explicit, taught knowledge rather than natural grammar acquisition."
        ]
      }
    ],
    "l2-sensitive-12": [
      {
        "text": "**Transfer** raises another **methodological and theoretical issue**. **Transfer** means using first-language knowledge while learning a second language.",
        "children": [
          "**Languages that are typologically more similar can benefit more from transfer**. **Typological** similarity is similarity in structure, such as word order and word forms.",
          "Cognates and loan words, such as French **auto**, **rivière** and **bicyclette**, and Japanese **korokke** and **monoreru**, hand learners familiar words to build on."
        ]
      },
      {
        "text": "**Johnson and Newport tested people with English as their L2 and Chinese or Korean as their L1**.",
        "children": [
          "Chinese and Korean differ greatly from English in grammar and vocabulary.",
          "Those learners could get little help from transfer."
        ]
      },
      {
        "text": "The open question is **what would happen if the languages were more similar**.",
        "children": [
          "Speakers of a language close to English could reuse much of what they know.",
          "Their scores might relate to age differently. If so, the age pattern in Johnson and Newport’s data would depend on the specific languages involved as well as on age."
        ]
      }
    ],
    "l2-sensitive-13": [
      {
        "text": "**Not all aspects of the grammar are equally difficult**. Johnson and Newport compared errors on **12 types of English rules** across native speakers and groups who arrived at different ages.",
        "children": [
          "The rule types are **determiners**, **plurals**, **verb subcategorization**, **past tense**, **pronouns**, **particles**, **auxiliaries**, **third-person singular**, **wh-questions**, **yes/no questions**, **word order** and **progressive -ing**. **Verb subcategorization** covers which kinds of words or phrases may follow a given verb.",
          "Native speakers and the youngest arrivals make very few errors of any type.",
          "The latest arrivals struggle most with **determiners** and **plurals**.",
          "**Word order** and **progressive -ing** cause few errors for anyone."
        ]
      },
      {
        "text": "**Some of this looks like the order in which children learn language**, because **progressive -ing and word order are easiest** for late learners and are among the first structures children master.",
        "children": []
      },
      {
        "text": "**Some could be transfer**.",
        "children": [
          "**Chinese has no determiners**, so Chinese speakers have no L1 category for “a” and “the,” which makes English articles especially hard.",
          "**Children learn questions very late, but questions are among the easiest structures for late learners**. Adults may bring general cognitive skills or L1 knowledge to question forms.",
          "How hard a structure is depends on the structure itself and on what the learner’s first language provides."
        ]
      }
    ],
    "l2-sensitive-14": [
      {
        "text": "**Birdsong and Molis (2001)** repeated the Johnson and Newport study with **Spanish speakers learning English**.",
        "children": [
          "For **Chinese and Korean speakers**, in Johnson and Newport’s data, early arrivals had a strong correlation with age, **r = −0.87**, and late arrivals had a weak one, **r = −0.16**.",
          "For **Spanish speakers**, early arrivals had only a weak correlation, **r = −0.23**, and late arrivals had a strong one, **r = −0.69**."
        ]
      },
      {
        "text": "The Spanish speakers showed almost the reverse pattern.",
        "children": [
          "**Early arrivals** scored near the top regardless of age, with only a slight decline even for those arriving in their mid-teens.",
          "**Late arrivals** declined steadily with age, so adults who arrived later reached lower levels."
        ]
      },
      {
        "text": "This raises the question of **what these results mean for the idea that AOA effects on GJT performance reflect maturational constraints**. **Maturational constraints** are limits on learning caused by the brain’s development.",
        "children": [
          "If a fixed maturational schedule controlled learning, the pattern should look the same for every first language.",
          "Instead, the pattern changed with the learners’ first language.",
          "Spanish is much closer to English than Chinese or Korean, so transfer may help Spanish speakers reach native-like grammar even when they arrive late in childhood. The age effect depends on the language pairing as well as on age."
        ]
      }
    ],
    "l2-sensitive-15": [
      {
        "text": "Calling these findings **“conclusions”** may go too far. **Overall, L2 attainment is lower for older learners**, and that much holds across studies.",
        "children": []
      },
      {
        "text": "**How much lower depends on several factors**.",
        "children": [
          "**What constructions are tested**, since some structures, such as determiners, are far harder for late learners than others, such as word order.",
          "**How they are tested**, since timed and untimed tests can disagree, with untimed tests leaving room for explicit knowledge.",
          "**Language pairings**, since Spanish speakers and Chinese or Korean speakers show different age patterns in learning English."
        ]
      },
      {
        "text": "**It is hard to separate** several factors that usually travel together.",
        "children": [
          "**Age of acquisition from the amount and quality of experience**. Younger arrivals usually get more years of exposure and more immersion, such as schooling in the language.",
          "**Transfer effects from L2 acquisition**. L2 performance reflects what was learned and also what carries over from the L1.",
          "**Performance from competence**, generally speaking. **Competence** is underlying knowledge of a language, and **performance** is how well that knowledge is used on a given task. A score measures performance, which may not reveal competence directly."
        ]
      }
    ],
    "l2-sensitive-16": [],
    "review-1": [],
    "review-2": [
      {
        "text": "A **speech continuum** is a series of sounds that change step by step along one controlled acoustic property. In this one, **F1 is kept constant** and the **F2 onset frequency** is **varied linearly** from stimulus 1 to stimulus 13. The **F2 onset frequency** is where the second formant begins its transition.",
        "children": [
          "Holding F1 constant removes one possible difference between stimuli.",
          "Varying the F2 onset **linearly** means it changes by the same step every time, so **adjacent stimuli differ by the same amount across the entire continuum**."
        ]
      },
      {
        "text": "The F2 transition shifts gradually along the series.",
        "children": [
          "Early on, F2 starts well below the vowel frequency, so it rises.",
          "As the onset climbs, the rise shrinks until the transition is nearly flat.",
          "Later, F2 starts above the vowel frequency and falls."
        ]
      },
      {
        "text": "Because every step is physically equal, the continuum fairly tests whether perception follows the acoustics or the categories.",
        "children": [
          "Some neighboring pairs fall inside one consonant category, and others straddle a boundary.",
          "A purely acoustic listener would hear every step as the same size.",
          "If perception is categorical, steps within a category will sound alike and steps across a boundary will sound different, so any advantage for boundary pairs comes from the boundary itself."
        ]
      }
    ],
    "review-3": [
      {
        "text": "An **ideal observer model** predicts how a listener would respond if perception worked according to a particular account. This version assumes that perception is **non-categorical**. It tracks the acoustic signal gradually, with no sharp category boundaries.",
        "children": [
          "The model is a baseline. Real data can be compared against it to see whether perception is more categorical than a gradual account allows."
        ]
      },
      {
        "text": "The first prediction is that **categorization gets “blurry” as you move away from category prototypes**. A **prototype** is the clearest example of a category. The endpoints of the continuum are /b/ and /g/, with /d/ in the middle.",
        "children": [
          "Between two prototypes, **stimulus ambiguity scales with the distance from the prototype**. The farther a stimulus is from the /b/ prototype, the less /b/-like it sounds and the more /d/-like it sounds.",
          "**Stimulus 2** would be heard as **75% /b/ and 25% /d/**. It sits a quarter of the way from the /b/ prototype toward the /d/ prototype, so the responses split in that same proportion."
        ]
      },
      {
        "text": "Under this account, **labeling** changes smoothly. Responses for one category fade out in a straight slope while responses for the neighboring category fade in.",
        "children": [
          "Two neighboring labels are equally likely halfway between their prototypes.",
          "Every change is gradual, with no sudden step from one label to the next."
        ]
      }
    ],
    "review-4": [
      {
        "text": "The same ideal observer can also assume that perception is **linear**, so equal acoustic differences are perceived as equally large. This leads to a second prediction. **Discrimination performance should be independent of labeling**.",
        "children": [
          "**Labeling** asks a listener to identify a sound as /b/, /d/ or /g/.",
          "**Discrimination** asks only whether two sounds are the **same or different**. These are separate tasks, even when they use the same continuum."
        ]
      },
      {
        "text": "Labeling **has to have a “peaked” function**. There are three categories, and listeners are choosing between labels, so each category’s responses rise toward its prototype and fall away from it. These peaks come from the structure of the labeling task itself.",
        "children": []
      },
      {
        "text": "Discrimination works differently under the linear account. Pairs are compared two steps apart, from **1 vs. 3** through **9 vs. 11**, and every pair has the same physical separation.",
        "children": [
          "If listeners perceived differences in F2 onset equally well across the whole continuum, every pair would be equally easy to tell apart.",
          "Discrimination would then stay level everywhere, even where labeling changes. A flat pattern would mean category boundaries play no role in hearing differences. A peaked pattern would mean the boundaries make some differences easier to hear."
        ]
      }
    ],
    "review-5": [
      {
        "text": "**Liberman and colleagues (1957)** measured actual labeling and discrimination along the /b/–/d/–/g/ continuum. Their results departed sharply from the non-categorical, linear predictions.",
        "children": [
          "Listeners labeled each stimulus and also judged pairs of stimuli as same or different.",
          "The pairs were **one step**, **two steps** or **three steps** apart."
        ]
      },
      {
        "text": "Labeling showed **sharp changes** in identification. The first few stimuli were heard as /b/ almost every time. Over just a step or two, responses switched almost completely to /d/, and later they switched again, just as quickly, to /g/.",
        "children": [
          "These switches are far more abrupt than the gradual slopes the ideal observer predicted.",
          "The narrow region where the label flips is the **category boundary**."
        ]
      },
      {
        "text": "**Listeners were best at discriminating sounds near the category boundaries**.",
        "children": [
          "Accuracy peaked at the /b/–/d/ boundary and again at the /d/–/g/ boundary.",
          "Pairs inside one category were discriminated poorly, close to **chance**, the level expected from guessing.",
          "Larger steps raised accuracy overall, but the peaks stayed at the boundaries."
        ]
      },
      {
        "text": "Liberman and colleagues also predicted discrimination from the labeling data, assuming listeners can tell two sounds apart only when they give them different labels. The predictions captured much of the real pattern.",
        "children": [
          "Real accuracy was often a little higher than predicted, especially within categories.",
          "Listeners therefore keep some sensitivity to acoustic differences beyond the category labels alone."
        ]
      }
    ],
    "review-6": [
      {
        "text": "The bear–pear eye-tracking result is evidence for **cascaded processing** in speech perception. A thresholded model would struggle to explain why **the number of looks to the other member of the minimal pair increases gradually as you approach the category boundary**. A **minimal pair** is two words that differ in a single sound, such as bear and pear.",
        "children": [
          "Looks to the competitor climb steadily as VOT nears the boundary.",
          "This happens even when the final answer is the same, so it reflects graded activation within one category."
        ]
      },
      {
        "text": "In a thresholded model, graded feature activity never reaches the phoneme level.",
        "children": [
          "Feature evidence can swing between +voiced and −voiced.",
          "The phoneme level stays silent until /b/ is chosen all at once."
        ]
      },
      {
        "text": "Under a threshold-only account, every token placed in a category sends the **same finished phoneme** to the word level.",
        "children": [
          "Word-level competition would then be identical for every /b/, leaving nothing to produce gradually changing competitor looks.",
          "A cascaded account explains the effect directly, because more support for the competing phoneme passes on more support for its word."
        ]
      }
    ],
    "review-7": [
      {
        "text": "**TRACE** also includes **feedback from the lexical layer to the phoneme layer**, so activity runs up from phonemes to words and back down from words to phonemes.",
        "children": [
          "**Lexical feedback** means that an active word sends support back to its own phonemes.",
          "An uncertain sound can partly activate a word, and that word can then boost the reading of the sound that fits it."
        ]
      },
      {
        "text": "Influence therefore travels both ways.",
        "children": [
          "Acoustic evidence changes which words are active.",
          "Active words shift the balance between possible phonemes while the phoneme decision is still forming.",
          "This helps listeners cope with noisy or ambiguous input."
        ]
      },
      {
        "text": "**Feedback is different from cascading**.",
        "children": [
          "Cascading sends incomplete evidence forward, from features to phonemes and from phonemes to words.",
          "Feedback sends influence from words back down to phonemes.",
          "An interactive model can have both, and findings where word knowledge changes how sounds are heard, such as the Ganong effect, are the reason to add feedback."
        ]
      }
    ],
    "review-8": [
      {
        "text": "One possibility is a **late “correction” process**. Under this account, **categorical perception works as usual, but there is a bias to report having heard a word**.",
        "children": [
          "The listener first categorizes the sound with no help from word knowledge.",
          "At the response stage, the listener leans toward the option that forms a real word."
        ]
      },
      {
        "text": "This account predicts a **general reporting bias**. Three kinds of continua are compared.",
        "children": [
          "In **word–nonword**, the voiced end forms a word. In **nonword–word**, the voiceless end forms a word. In **neutral**, neither end has a lexical advantage.",
          "If the bias is added after perception, it should push responses toward the word by the same amount everywhere.",
          "Even a clearly voiceless sound would sometimes be reported as voiced when the voiced version makes a word, and the reverse would hold at the other end."
        ]
      },
      {
        "text": "The **lexical effect** is the difference in voiced responses between the two lexical conditions. Under this account, the lexical effect is the same size at every step of the continuum.",
        "children": [
          "The bias favors the word equally at clear and ambiguous steps.",
          "Perception and knowledge stay separate, and word knowledge only nudges the reported answer."
        ]
      }
    ],
    "review-9": [
      {
        "text": "A second possibility is that **word knowledge shifts the categorical boundary**. Under this account, word knowledge changes where the listener switches from one phoneme category to the other.",
        "children": [
          "Near an ambiguous onset, the interpretation that forms a real word gets extra support.",
          "The effect changes categorization itself, not just the reported answer."
        ]
      },
      {
        "text": "This account predicts that the lexical conditions differ only in the middle of the continuum.",
        "children": [
          "At both ends, the sound is clear, so every condition gives the same answer.",
          "Near the boundary, the word–nonword condition crosses later and the nonword–word condition crosses earlier."
        ]
      },
      {
        "text": "The **lexical effect** should therefore form a peak. It is near zero at the endpoints and largest for the items closest to the boundary.",
        "children": [
          "The effect is **strongest for items closest to the category boundary**, because those are the stimuli where lexical information can help resolve ambiguity about the first phoneme.",
          "At the endpoints, strong acoustic evidence already settles the consonant, leaving little room for word knowledge to help."
        ]
      },
      {
        "text": "The word ending gives the same lexical advantage at every step, but the onset is not equally uncertain at every step. Where the effect occurs therefore matters. A flat effect points to a reporting bias, while a peaked effect points to a shift in the boundary itself.",
        "children": []
      }
    ],
    "review-10": [
      {
        "text": "**Ganong’s results** are strikingly consistent with the **second model**, the boundary-shift account.",
        "children": [
          "At the short and long ends of the VOT continuum, the word and nonword conditions give nearly the same answers.",
          "The **lexical effect** is small at the endpoints and largest near the boundary, where it reaches about **0.3**."
        ]
      },
      {
        "text": "A peak at the boundary rules out a simple reporting bias, because word knowledge matters most where the acoustic evidence is weakest.",
        "children": [
          "At the boundary, the word that fits the context tips the balance.",
          "At the endpoints, the acoustics settle the answer alone."
        ]
      },
      {
        "text": "Ganong considered several ways this could happen, centered on different **guessing strategies**.",
        "children": [
          "A guessing strategy would let listeners use word knowledge only when unsure of the sound."
        ]
      },
      {
        "text": "Other models stress a possible role for **feedback** in these shifts.",
        "children": [
          "In **interactive models**, an active word sends support back to its own phonemes.",
          "The whole-word representation can then shape how an ambiguous part of the word is interpreted during recognition."
        ]
      }
    ],
    "review-11": [
      {
        "text": "A **simulation of the Ganong effect in the TRACE model** tracks **phoneme-level and word-level activations** at several points as a segment unfolds. The input begins with a sound **ambiguous between /b/ and /p/**, followed by **/l/**, the vowel **/ʌ/**, and **/g/**, which together make the word **plug**.",
        "children": [
          "Activations are recorded at four moments, as each new sound arrives."
        ]
      },
      {
        "text": "In the **first frame**, only the ambiguous first sound has arrived.",
        "children": [
          "**/b/** and **/p/** are both weakly active, at about the same level.",
          "Word activation is still very low."
        ]
      },
      {
        "text": "In the **second and third frames**, /l/ and the vowel arrive.",
        "children": [
          "Partial /b/ evidence supports words beginning with **bl-**, and partial /p/ evidence supports words beginning with **pl-**.",
          "Several candidates gain activation together, including **plug**, **blood** and **blush**, which all fit the beginning heard so far.",
          "Phoneme activity for /p/ starts to pull ahead of /b/."
        ]
      },
      {
        "text": "In the **fourth frame**, the final **/g/** arrives.",
        "children": [
          "/g/ fits plug but does not fit the endings of blood or blush.",
          "**Plug** becomes the most active word by a wide margin, while the alternatives fall away.",
          "/p/ ends up more active than /b/ at the phoneme level."
        ]
      }
    ],
    "review-12": [
      {
        "text": "As the input continues, **activity accumulates for “plug,”** above all when the **final /g/** arrives, since /g/ clashes with **“blood”** and **“blush,”** which had also become active.",
        "children": [
          "Blood and blush matched the early part of the input, so they were plausible for a while.",
          "When /g/ arrives, they lose support because their endings do not fit."
        ]
      },
      {
        "text": "TRACE therefore explains **word effects on phoneme category boundaries** through **top-down processing**, in which higher-level knowledge influences lower-level analysis.",
        "children": [
          "**Activity at the lexical level produces feedback to the phoneme level**.",
          "That feedback gives **greater activation to the phoneme consistent with a word**, so /p/ gains extra support from plug, the winning word."
        ]
      },
      {
        "text": "The ambiguous beginning becomes clearer because /p/ belongs to the word the whole sequence supports.",
        "children": [
          "Information arriving at the end of a word can reach back and shape how an earlier sound is heard.",
          "This happens through interactions during recognition, and the ambiguous first sound comes to be heard as /p/."
        ]
      }
    ],
    "review-13": [
      {
        "text": "**Syntactic explanations** of the garden path effect begin with a **parser**, a mental process that builds a **syntactic tree** for each sentence we hear or read. A syntactic tree records how words group into phrases and how the phrases relate to each other.",
        "children": []
      },
      {
        "text": "In the correct tree, the subject is a large noun phrase, or **NP**, that contains “the horse” plus a reduced clause meaning “that was raced past the barn.”",
        "children": [
          "“That” and “was” are silent in the actual sentence, and the clause also has an empty subject position.",
          "Inside the clause, raced takes the prepositional phrase, or **PP**, “past the barn.”",
          "The main verb phrase, or **VP**, contains only **fell**."
        ]
      },
      {
        "text": "In the failed parse, “the horse” is an ordinary NP and “raced past the barn” is the main VP, with raced as the main verb.",
        "children": [
          "**Fell** is then left with nowhere to attach, and the parse breaks down."
        ]
      },
      {
        "text": "Any parser has to work inside a mind with **limited memory** and **time constraints**.",
        "children": [
          "Words come quickly, so the parser cannot wait for the end of the sentence before building structure.",
          "It can keep only a limited number of structures in play at once."
        ]
      }
    ],
    "review-14": [
      {
        "text": "The **grammatical version** of the horse sentence is **much more complex syntactically** than the failed parse, because it has **many more nodes**. A **node** is a point in a syntactic tree that stands for a grammatical grouping, such as an NP, a VP or a sentence.",
        "children": [
          "The correct tree needs extra nodes for the embedded clause and for the silent “that” and “was.”",
          "The failed parse simply makes “raced past the barn” the main VP, which takes far fewer nodes."
        ]
      },
      {
        "text": "One space-saving strategy is to **initially prefer smaller trees**, a strategy called **“minimal attachment.”**",
        "children": [
          "Under minimal attachment, each new word is fitted into the existing structure with the fewest possible new nodes.",
          "Fewer nodes means less structure to build and keep in memory at that moment."
        ]
      },
      {
        "text": "In the horse sentence, minimal attachment favors **raced as the main verb**, because that reading needs the fewest nodes.",
        "children": [
          "The reading where “raced past the barn” modifies horse needs an embedded relative clause, so the parser passes it over at first.",
          "The smaller structure lightens the immediate load but leads down the garden path. When fell arrives, it demands the larger structure that was passed over, and the reader must rebuild the tree."
        ]
      }
    ],
    "review-15": [
      {
        "text": "**“Late closure”** is another parsing strategy in this framework. It is a bias to **keep the current clause “open” as long as possible**, so new words get attached to the phrase under construction.",
        "children": [
          "Keeping a clause open means adding incoming words to it instead of closing it and starting something new."
        ]
      },
      {
        "text": "In **“The burglar blew open the safe with the dynamite,”** the phrase **“with the dynamite”** wants to join the big **verb phrase** that begins with **“blew open.”** Frazier (1987) contrasts two structures for the sentence.",
        "children": [
          "In the **preferred** structure, the PP attaches to the **VP**. This **verb-phrase attachment** makes the dynamite the **instrument** used to blow open the safe.",
          "In the **unpreferred** structure, the PP attaches to the **NP** “the safe.” This **noun-phrase attachment** makes the phrase describe which safe was blown open, the one that had the dynamite."
        ]
      },
      {
        "text": "Both attachments are grammatical, but they say different things.",
        "children": [
          "Late closure keeps the verb phrase open, so the new phrase joins it.",
          "Here the preferred VP attachment is also the minimal attachment, since it needs fewer nodes than building an extra NP around “the safe with the dynamite.”",
          "For this sentence, the preferred parse happens to be the sensible one, so readers reach the right meaning easily."
        ]
      }
    ],
    "review-16": [
      {
        "text": "Late closure shows its effect in a sentence that **requires the “unpreferred” parse to be sensible**, such as **“The burglar blew open the safe with the jewels.”**",
        "children": [
          "Jewels make a poor tool for blowing open a safe.",
          "The sensible meaning is that the burglar blew open **the safe that contained the jewels**, which requires attaching “with the jewels” to the noun phrase “the safe,” the unpreferred NP attachment."
        ]
      },
      {
        "text": "**Careful tests of reading time and eye movements** reveal that people are **slower to read sentences where the sensible reading requires the unpreferred parse**.",
        "children": [
          "Reading time measures how long readers spend on each part of the sentence.",
          "Eye movement records track where readers look and when they jump back to reread.",
          "The extra time shows up right where the parse has to change."
        ]
      },
      {
        "text": "Readers **momentarily entertain the idea that the jewels were used to blow open the safe**, and then must **retrace their steps**.",
        "children": [
          "Following its usual preference, the parser first attaches the phrase to the verb phrase.",
          "The meaning of jewels clashes with the instrument reading, so the parser moves the attachment to the noun phrase.",
          "The final meaning is easy, but getting there carries a measurable processing cost."
        ]
      }
    ],
    "review-17": [
      {
        "text": "This syntactic explanation depends on a **parser that deals exclusively with the abstract syntactic structure** of the sentence. It parallels the **“lumber mill”** model of thresholded processing in speech perception.",
        "children": [
          "In a lumber mill, each stage works on its own material and hands a finished product to the next stage.",
          "In the same way, the parser builds structure from grammatical categories alone, without checking meaning or context, and meaning is computed afterward from the finished structure."
        ]
      },
      {
        "text": "The parser has **its own operating characteristics**.",
        "children": [
          "It aims for **the simplest tree possible**, which is **minimal attachment**.",
          "It does this partly by **leaving clauses open as long as possible**, which is **late closure**.",
          "Both preferences limit how much structure has to be built and held at once."
        ]
      },
      {
        "text": "This handles ambiguity **very efficiently**, by choosing to **ignore ambiguity until it becomes a problem**.",
        "children": [
          "The parser commits to one likely structure and builds only that one, and most of the time the first choice is right.",
          "When a later word fails to fit, the structure must be revised. That revision causes garden path difficulty, which is the price of an efficient strategy."
        ]
      }
    ],
    "review-18": [
      {
        "text": "**“World knowledge” can be very local**, coming from the visual scene right in front of us as well as from general knowledge. **Spivey and colleagues (1995)** tested this with a visual world task.",
        "children": [
          "Participants saw real objects, **a pencil, a box, an empty towel, and an apple sitting on a towel**.",
          "They heard **“Put the apple on the towel in the box”** and carried it out while their eyes were tracked."
        ]
      },
      {
        "text": "With **minimal attachment**, “the towel” would briefly seem to end the clause **“put the apple on the towel.”**",
        "children": [
          "In that reading, “on the towel” names the **destination** for the apple.",
          "In the intended reading, “on the towel” says **which apple** to move, the one already on a towel, and **“in the box”** is the destination."
        ]
      },
      {
        "text": "People **do seem to look at the empty towel while planning their movements**, as if treating it as a target, before they plan a movement to the box.",
        "children": [
          "With one apple in view and the ambiguous instruction, a typical sequence runs from the apple to the empty towel and then to the box.",
          "With the unambiguous instruction **“Put the apple that’s on the towel in the box,”** the eyes go from the apple straight to the box."
        ]
      },
      {
        "text": "The listener recognizes every word correctly. The error lies in taking the location phrase as the destination, which briefly changes the planned action.",
        "children": []
      }
    ],
    "review-19": [
      {
        "text": "In a **two-referent context**, the display holds **two apples**, one on a towel and one elsewhere, along with the empty towel and the box.",
        "children": [
          "“The apple” by itself no longer says which apple to move.",
          "**“On the towel”** now does useful work, since it picks out one of the two apples."
        ]
      },
      {
        "text": "Here participants usually look at the apple on the towel and then at the box.",
        "children": [
          "Looks to the empty towel become much less common.",
          "**The sequence and the timing of eye movements**, measured against the nouns in the speech, **did not differ** between the ambiguous and the unambiguous instructions."
        ]
      },
      {
        "text": "In this setting, the ambiguous instruction is handled exactly like the explicit one with “that’s on the towel.”",
        "children": [
          "With two apples in view, the listener needs to know which apple, so a phrase that singles one out is expected.",
          "Listeners take “on the towel” as describing the apple from the start, and the destination reading never takes hold. The same sentence receives a different grammatical analysis because the visual context differs."
        ]
      }
    ],
    "review-20": [
      {
        "text": "Once **two apples** are in view, it suddenly becomes **felicitous**, meaning natural and appropriate, to add information about **which apple** the speaker means.",
        "children": [
          "With one apple, there is no reason to say which apple, so “on the towel” looks like extra information and is easily heard as a destination.",
          "With two apples, “on the towel” has a clear purpose, picking out the right apple."
        ]
      },
      {
        "text": "As a result, **people do not look at the empty towel as much**.",
        "children": [
          "With one apple, the ambiguous instruction drew looks to the empty towel on about **55%** of trials.",
          "With two apples, the same instruction drew such looks on only about **17%** of trials, close to the level for the unambiguous instruction."
        ]
      },
      {
        "text": "The instruction’s words were the same in both displays, so the visual context alone changed how often listeners were misled.",
        "children": [
          "This is an effect of **referential context**, the set of objects a phrase could refer to.",
          "Referential context affects which grammatical relationship listeners assign while they are still hearing the sentence."
        ]
      }
    ],
    "review-21": [
      {
        "text": "An appealing **dichotomy**, a two-way split, sets the two aphasias against each other. **Wernicke’s aphasia** is called **“word salad”** or **“Jabberwocky,”** often full of **neologisms**, while **syntax is roughly intact**. “Jabberwocky” is Lewis Carroll’s grammatical nonsense poem.",
        "children": [
          "Asked about his health, one Wernicke’s patient said **“I felt worse because I can no longer keep in mind from the mind of the minds to keep me from mind and up to the ear which can be to find among ourselves,”** from Kriendler and colleagues (1971).",
          "Asked about his poor vision, another said **“My wires don’t hire right.”**",
          "Asked whether he was a doctor, an aphasic physician answered **“Me? Yes, sir, I’m a male demaploze on my own. I still know my tubaboys what for I have that’s gone hell and some of them go.”** **Demaploze** and **tubaboys** are neologisms.",
          "One patient called a **fork** **“a need for a schedule”** and a **spoon** **“How many schemes on your throat.”**"
        ]
      },
      {
        "text": "**Broca’s aphasia** is called **“telegraphic” speech**, with **difficulty with word order and grammatical particles** and **relative sparing of important content words**.",
        "children": [
          "Asked what brought him to the hospital, one Broca’s patient said **“Yes … ah … Monday … ah … Dad and P.H. (the patient’s name) and Dad … hospital. Two … ah doctors … and ah … thirty minutes … and yes … ah … hospital. And, er Wednesday … nine o’clock and eh Thursday, ten o’clock … doctors. Two doctors … and ah … teeth. Yeah … fine,”** from Badecker and Caramazza (1985).",
          "Words such as Dad, hospital and doctors carry the story, and the small grammatical words that would join them are missing."
        ]
      },
      {
        "text": "The two patterns look like mirror images, with fluent grammar and wrong words on one side and meaningful words with little grammar on the other.",
        "children": []
      }
    ],
    "review-22": [
      {
        "text": "The dichotomy can also be put in terms of what is damaged. **Wernicke’s aphasia** reflects **problems with activation, or possibly inhibition, in the lexicon**, and **Broca’s aphasia** reflects **problems with grammar**.",
        "children": [
          "The **lexicon** is the mental store of words.",
          "**Activation** makes candidate words available, and **inhibition** holds back competitors that should not be chosen, so weak inhibition could let wrong words into speech."
        ]
      },
      {
        "text": "That description is **fairly distant from how Broca described his original cases**. Paul Broca’s account of **Leborgne**, known as **“Tan,”** reads differently.",
        "children": [
          "Tan **could only produce one jargon syllable**, “tan.”",
          "He **seemed otherwise to be in possession of his senses** and in fact **seemed to understand what was being said**."
        ]
      },
      {
        "text": "Broca’s account raises several questions.",
        "children": [
          "Why does it matter that Leborgne’s other senses were intact? Intact senses mean the loss was specific to speech, which makes it a dissociation.",
          "Why does a “capacity for articulate speech” seem a more believable job for a brain region than “criminality” or “philoprogenitiveness,” a phrenology term for love of one’s children?",
          "If Tan could be tested today, which measurements would pin down his deficits at the **levels of description used in modern linguistics**, such as phonetic, phonological, lexical and syntactic?"
        ]
      },
      {
        "text": "The result is a confusion. **Broca’s actual patients would not necessarily be classified as Broca’s aphasics** today.",
        "children": [
          "They were arguably **unable to produce speech at all**, seemingly because of **motor control problems**.",
          "Today they would be diagnosed with **apraxia of speech**, a disorder of planning and coordinating speech movements, which can sharply limit output without any loss of grammatical knowledge."
        ]
      }
    ],
    "review-23": [
      {
        "text": "The split between Wernicke’s aphasia as a lexicon problem and Broca’s aphasia as a grammar problem is appealing partly because it **aligns well with a sharp distinction drawn in late 20th-century formal linguistics between the grammar and the lexicon**.",
        "children": [
          "The **grammar** is the rule system for combining words into sentences.",
          "The **lexicon** is the store of individual words, which have to be memorized."
        ]
      },
      {
        "text": "The distinction begins with **Chomsky’s formulation of the computational problem of language learning**.",
        "children": [
          "We recognize a new string as a sentence **not because it matches some familiar item in any simple way**, but because **it is generated by the grammar** each speaker has internalized.",
          "A sentence never heard before can be understood because the listener can work out how the grammar builds it."
        ]
      },
      {
        "text": "Chomsky also offered **compelling demonstrations of the independence of syntax and semantics**. In Chomsky (1955), neither **(a) “colorless green ideas sleep furiously”** nor **(b) “furiously sleep ideas green colorless”** has ever occurred in an English speaker’s past experience, and yet **(a) is grammatical while (b) is not**.",
        "children": [
          "Sentence (a) makes no sense, but its word order obeys English grammar.",
          "Sentence (b) puts the same words in an order the grammar forbids.",
          "Both are equally unfamiliar and equally meaningless, so the contrast must come from grammar as a separate system."
        ]
      },
      {
        "text": "The aphasia split lines up with this division, with Wernicke’s aphasia as a disorder of the lexicon and Broca’s aphasia as a disorder of the grammar.",
        "children": []
      }
    ],
    "review-24": [
      {
        "text": "**“Man bites dog”** is the classic newspaper example of an unexpected event. **Psycholinguistic tests** are needed to reveal grammatical problems in comprehension, because **in conversation, there are lots of redundant cues to what a speaker intends**. **Redundant** cues are separate sources of information that all point to the same meaning.",
        "children": []
      },
      {
        "text": "**“The dog bit the man”** offers **many ways to get the right meaning**.",
        "children": [
          "A listener can build the **most likely combination of DOG, BITE and MAN into an event representation**, **with or without syntax**, since dogs bite people far more often than the reverse.",
          "The sentence also uses **canonical word order**, **agent, then verb, then undergoer**, which is **subject, then verb, then object**. The **agent** performs the action and the **undergoer** receives it, and in English the first noun is usually the agent.",
          "Much comprehension also takes place in a **discourse context**, the surrounding conversation, which clears up a great deal."
        ]
      },
      {
        "text": "Broca’s patients might understand by leaning on these **compensatory heuristics**. A **heuristic** is a mental shortcut, and a compensatory one covers for a weakness somewhere else.",
        "children": [
          "A patient could just assume the most plausible event, or assume the first noun is the doer.",
          "Either shortcut handles “The dog bit the man” with no grammatical analysis."
        ]
      },
      {
        "text": "Testing grammar directly takes sentences that defeat the shortcuts, such as **“The dog that the man is biting is angry.”** The **man** is the biter, although the dog comes first and dogs are likelier biters, so only grammatical analysis gives the right answer.",
        "children": []
      }
    ],
    "review-25": [
      {
        "text": "**Caramazza and Zurif** wrote **a list of exactly this kind of sentence, along with a set of control sentences**, organized in four groups of eight.",
        "children": [
          "**A. Control sentences** are simple and in canonical order, such as **“The girl is kicking a green ball,” “The cat is chasing a blue bird”** and **“The boy is riding a new bicycle.”**"
        ]
      },
      {
        "text": "**B. Center-embedded sentences with semantic constraints** put one clause inside another, but meaning makes the roles obvious. A **center-embedded** sentence has a relative clause in the middle of the main clause.",
        "children": [
          "Examples are **“The apple that the boy is eating is red,” “The wagon that the horse is pulling is green”** and **“The balloon that the clown is holding is round.”** Apples cannot eat boys, so meaning alone reveals who does what."
        ]
      },
      {
        "text": "**C. Reversible center-embedded sentences** have two participants who could each sensibly do the action.",
        "children": [
          "Examples are **“The cow that the monkey is scaring is yellow,” “The horse that the bear is kicking is brown”** and **“The girl that the boy is tickling is happy.”** Meaning offers no help, so only grammar reveals the roles."
        ]
      },
      {
        "text": "**D. Improbable center-embedded sentences** describe events that run against expectations.",
        "children": [
          "Examples are **“The bird that the worm is eating is blue,” “The man that the horse is riding is fat”** and **“The policeman that the robber is chasing is skinny.”** Common sense points to the wrong answer."
        ]
      },
      {
        "text": "In every embedded sentence, the first noun is acted on, and the doer sits inside the relative clause.",
        "children": [
          "A listener who relies on meaning should pass groups A and B and fail C and D.",
          "A listener who parses normally should pass all four."
        ]
      }
    ],
    "review-26": [
      {
        "text": "Caramazza and Zurif used a **sentence-picture matching task**, in which a listener hears a sentence and picks the picture that fits it.",
        "children": [
          "Accuracy reveals whether the listener grasped who did what to whom, with no spoken answer required.",
          "Healthy listeners and patients with Broca’s, conduction and Wernicke’s aphasia each heard all four sentence types."
        ]
      },
      {
        "text": "**Healthy controls are more or less equally good at all stimulus types**, scoring near the top on each one.",
        "children": []
      },
      {
        "text": "**Wernicke’s patients are poor overall**.",
        "children": [
          "They do badly even on the simple control sentences.",
          "That likely reflects their **general comprehension deficits**, which reach word meanings as well as grammar."
        ]
      },
      {
        "text": "**Broca’s patients** have a **particular difficulty keeping “who did what to whom” straight** when **syntax conflicts with common sense** or with the likely semantic roles of the nouns.",
        "children": [
          "They do well on control sentences and on semantically constrained sentences, where meaning gives the answer away.",
          "They do poorly on reversible and improbable sentences, where only grammar can settle the roles."
        ]
      },
      {
        "text": "This **specific comprehension deficit** was read as evidence that **Broca’s aphasia affects syntax specifically**.",
        "children": [
          "Because the trouble shows up in understanding as well as speaking, it lies in the grammar itself.",
          "The paper’s title, “Dissociation of algorithmic and heuristic processes,” sums it up. Broca’s patients lose the **algorithmic** route of grammatical analysis and keep the **heuristic** shortcuts that run on meaning."
        ]
      }
    ],
    "review-27": [
      {
        "text": "The dichotomy runs into **problems**. **Dick and colleagues** had participants hear **four types of sentences** and **indicate which animal was doing the action**.",
        "children": [
          "A dog and a cat were pictured on a screen, and participants pressed a button to pick the animal.",
          "The event was always a dog biting a cat, while the sentence structure varied."
        ]
      },
      {
        "text": "Two sentence types put the doer first.",
        "children": [
          "**Active**, as in **“The dog is biting the cat.”**",
          "**Subject cleft**, as in **“It’s the dog that is biting the cat.”** A **cleft** sentence breaks a simple sentence apart with “It’s … that” to focus on one part, and in a subject cleft the focused noun is the doer.",
          "For both types, picking the first animal mentioned gives the right answer."
        ]
      },
      {
        "text": "Two types put the receiver of the action first.",
        "children": [
          "**Object cleft**, as in **“It’s the cat that the dog is biting,”** where the focused noun is the one bitten.",
          "**Passive**, as in **“The cat is bitten by the dog,”** where the receiver becomes the grammatical subject.",
          "For both, the first-animal shortcut fails. Only a listener who parses the grammar succeeds on all four types."
        ]
      }
    ],
    "review-28": [
      {
        "text": "When **aphasia patients and healthy aging controls** do this task, **a pattern emerges much like what Caramazza and Zurif observed**. Patients were grouped by type of aphasia using the Western Aphasia Battery.",
        "children": [
          "**Elderly controls** were nearly perfect on all four sentence types.",
          "**Anomic** patients, whose main problem is finding words, were fairly accurate on actives and subject clefts but dropped on object clefts and passives.",
          "**Conduction** aphasia patients dropped sharply on object clefts.",
          "**Wernicke’s** patients scored low on every sentence type, near chance."
        ]
      },
      {
        "text": "**Broca’s aphasia patients have particular difficulty with the syntactically complex stimuli**, the object clefts and passives.",
        "children": [
          "On object clefts, they were barely above chance.",
          "These are **noncanonical** structures, meaning they depart from the usual doer-first order."
        ]
      },
      {
        "text": "**Their performance is overall not so great**, however.",
        "children": [
          "Even on simple active sentences, Broca’s patients were well below the elderly controls.",
          "The pattern combines a general drop in performance with an extra cost for complex structures. The groups differ in both their overall accuracy and the size of that extra cost."
        ]
      }
    ],
    "review-29": [
      {
        "text": "The same task was given to **healthy undergraduates** under **conditions that stress the language system** in different ways. **Stress conditions** included **speeding up the speech**, adding noise, and **asking people to remember lists of numbers as a secondary task**.",
        "children": [
          "**Compressed** speech is speech played faster than normal.",
          "A **low-pass filter** removes the higher frequencies from speech, making it sound muffled.",
          "**Auditory digits** and **visual digits** are number lists that participants had to remember while listening, which uses up memory resources."
        ]
      },
      {
        "text": "With a single stressor, accuracy stayed high on actives and subject clefts.",
        "children": [
          "Object clefts suffered most, especially under noise.",
          "Passives also dropped somewhat."
        ]
      },
      {
        "text": "When two stressors were combined, the effects grew larger.",
        "children": [
          "With muffled speech that was also sped up, students stayed accurate on actives and subject clefts.",
          "On object clefts and passives, their accuracy fell to about two thirds."
        ]
      },
      {
        "text": "**Object cleft and passive sentences are particularly vulnerable to all the manipulations**, the same pattern found in Broca’s aphasia. These students have no brain damage, so stressing their processing system is enough to produce an aphasia-like profile.",
        "children": [
          "This suggests that **the comprehension deficits in Broca’s aphasia may be a “performance” issue after all**.",
          "Complex structures may need more processing resources, so any reduction in resources hurts them first. The patients may keep their grammatical knowledge but lack the resources to use it well."
        ]
      }
    ],
    "review-30": [
      {
        "text": "A further question is whether **Broca’s aphasics’ comprehension deficits are language-specific**. **Saygin and colleagues (2004)** asked patients to **match an action to an object**.",
        "children": [
          "In the **non-linguistic** version, a drawing has a boy pantomiming an action, such as licking. Participants chose the matching object from pictures such as an ice cream cone, a cake, broccoli and a rooster.",
          "In the **linguistic** version, the action was given in words rather than by pantomime."
        ]
      },
      {
        "text": "Controls were nearly perfect in both versions. Aphasic patients made more errors in both.",
        "children": [
          "In the non-linguistic version, controls scored **98.5%** and patients **93.4%**.",
          "In the linguistic version, controls scored **99.4%** and patients **87.5%**.",
          "**Broca’s aphasics had difficulty with this task whether the stimuli were linguistic or not**."
        ]
      },
      {
        "text": "Accuracy also depended on the kind of wrong choice offered, called the **distractor**.",
        "children": [
          "Patients made the most errors when the distractor was **semantic**, meaning related in meaning to the correct object.",
          "They made fewer errors with **unrelated** distractors and with **affordance-based** distractors. An **affordance** is an action an object allows, such as a different object that can also be licked."
        ]
      },
      {
        "text": "The nonverbal version removes language from the input but keeps meaning in the task. A pantomimed action has to be understood and linked to the right object, much as a verb is linked to its object.",
        "children": [
          "A purely grammatical deficit predicts good performance on the nonverbal version.",
          "Difficulty on that version points to a broader problem with action meanings, shared with language."
        ]
      }
    ],
    "review-31": [
      {
        "text": "**Performance in the non-verbal version of this task was significantly correlated with damage to Broca’s area**. Damage linked to deficits in **non-linguistic pantomime interpretation** clustered in the left frontal region in front of the **central sulcus**, which includes Broca’s area.",
        "children": []
      },
      {
        "text": "The task asked participants only to interpret a pantomimed action and pick an object.",
        "children": [
          "No sentence had to be produced.",
          "No spoken instruction had to be parsed."
        ]
      },
      {
        "text": "Damage to Broca’s area therefore affects more than syntax.",
        "children": [
          "Patients with damage there can have trouble linking an action to its meaning even when no language is involved.",
          "Any account of Broca’s area must explain the grammatical comprehension findings and this nonlinguistic difficulty with actions together."
        ]
      }
    ],
    "review-32": [
      {
        "text": "**Categorical perception in infants** can be measured through behaviors that change when an infant notices something new. Head turns and sucking reveal what an infant hears without the infant saying anything.",
        "children": []
      },
      {
        "text": "In the **conditioned head turn procedure**, used in Janet Werker’s infant studies lab, an infant learns to turn toward a sound when it changes.",
        "children": [
          "The infant sits on a parent’s lap while an experimenter holds the infant’s attention forward with toys.",
          "A correct head turn after a change earns an interesting visual reward, such as a lit-up moving toy.",
          "Once the infant has learned this link, turning after a sound change means the infant heard the change."
        ]
      },
      {
        "text": "**High-amplitude sucking** relies on infants’ natural interest in novelty.",
        "children": [
          "The infant sucks on a pacifier attached to a pressure recorder, and strong sucks make a sound play.",
          "As the same sound repeats, the infant grows used to it, which is **habituation**, and sucking slows.",
          "If a new sound makes sucking **increase again**, the infant has noticed the change."
        ]
      },
      {
        "text": "Neither method asks the infant to name or produce a sound. The experimenter decides exactly which acoustic difference is presented, and a head turn or renewed sucking reveals whether infants hear the same distinctions adults hear.",
        "children": []
      }
    ],
    "review-33": [
      {
        "text": "**Eimas and colleagues (1971)** tested categorical perception in **4-month-old infants** using **high-amplitude sucking**. The sounds varied in **voice onset time**, or **VOT**, the delay between the release of a stop consonant and the start of vocal fold vibration.",
        "children": [
          "In a syllable with a long VOT, voicing starts much later after the release than in a syllable with a short VOT."
        ]
      },
      {
        "text": "The experiment had **three conditions**. Infants heard a syllable over and over until their sucking slowed down, and then the sound either changed or stayed the same.",
        "children": [
          "In **20D**, the two sounds differed by **20 milliseconds** of VOT, **+20 versus +40 milliseconds**, and came from **different adult phonemic categories**.",
          "In **20S**, the sounds also differed by **20 milliseconds**, such as **−20 versus 0** or **+60 versus +80 milliseconds**, but came from the **same** category.",
          "In **0**, the **control** condition, the same sound continued throughout."
        ]
      },
      {
        "text": "In every condition, sucking rose at first and then declined as the sound became familiar.",
        "children": [
          "In **20D**, sucking jumped back up after the change.",
          "In **20S**, sucking showed little recovery and kept falling.",
          "In the control condition, sucking kept declining."
        ]
      },
      {
        "text": "Infants responded to a change that crossed an adult phoneme boundary but not to an equally large change within a category.",
        "children": [
          "The two changed conditions were matched in acoustic size, so the difference comes from crossing the boundary.",
          "The control condition establishes what happens with repetition alone."
        ]
      }
    ],
    "review-34": [
      {
        "text": "Eimas’s result was **a big deal** for several reasons. **Categorical perception was considered to be the first step in turning speech into a symbolic format** that later stages of language processing could use.",
        "children": [
          "A **symbolic** format stores a sound as a category, such as /b/.",
          "Finding this ability in infants suggested that the starting point for processing language was already present."
        ]
      },
      {
        "text": "**Four-month-olds are really little**. Typical **gross motor milestones** at this age are **manipulating objects with two hands** and **holding the head and chest up while lying prone**, that is, lying face down.",
        "children": [
          "Gross motor skills involve large movements of the body."
        ]
      },
      {
        "text": "Their **color vision and general visual acuity are still “in progress.”** **Visual acuity** means sharpness of vision.",
        "children": [
          "Basic perception in other areas is still developing."
        ]
      },
      {
        "text": "Four-month-olds are also **just starting to produce vowel-like sounds instead of creaky whines**, and they cannot yet make speech sounds well.",
        "children": []
      },
      {
        "text": "That is **very, very early in development for an apparently language-specific ability to emerge**, so it **seemed like evidence for innateness**.",
        "children": [
          "Infants sort speech sounds into categories before they can produce them and while other skills are immature.",
          "Because speech categorization ran so far ahead of other abilities, it looked built in instead of learned through long experience."
        ]
      }
    ],
    "review-35": [
      {
        "text": "**“Perceptual narrowing”** for speech categories is the decline in sensitivity to sound distinctions that are not used in the language a child hears. **At around six months, English-learning infants show evidence of discriminating speech contrasts they have never heard before**. **Over the course of development, the ability to perceive these contrasts declines**.",
        "children": [
          "**Werker and Tees** tested English-learning infants on two non-English contrasts.",
          "The **Hindi contrast** is a distinction between two “ta”-like sounds. The **Salish contrast** is a distinction between “ki” and “qi” from Nthlakampx, a Salish language."
        ]
      },
      {
        "text": "The measure was the share of infants at each age who reached a **discrimination criterion**.",
        "children": [
          "At **6–8 months**, most English-learning infants discriminated both contrasts.",
          "At **8–10 months**, fewer did.",
          "At **10–12 months**, only a small minority did.",
          "**Hindi- and Salish-learning infants** discriminated their own native contrast nearly every time."
        ]
      },
      {
        "text": "This is **perceptual reorganization during the first year of life**.",
        "children": [
          "Without experience of a contrast, English-learning infants lose much of their ability to hear it by about their first birthday.",
          "Infants who hear the contrast in their language keep it, so the decline depends on language experience."
        ]
      },
      {
        "text": "This raises the question of **how perceptual narrowing relates to categorical perception**.",
        "children": [
          "As infants form the categories of their native language, sounds that their language groups together become harder to tell apart.",
          "A nonnative distinction that falls within one native category comes to be heard as a within-category difference."
        ]
      }
    ],
    "review-36": [
      {
        "text": "These findings support **a very compelling narrative**.",
        "children": [
          "**Speech perception depends on categorical perception abilities that are a special property of the language system**.",
          "**These abilities are present very early in development**, according to the infant studies."
        ]
      },
      {
        "text": "**Children start off as “citizens of the world,”** able to hear **all** contrasts, which means **they have innate, language-general knowledge about speech**.",
        "children": [
          "**Language-general** knowledge applies to the speech sounds of every language.",
          "Calling infants “citizens of the world” captures the idea that a newborn is ready for any human language.",
          "Children then **rapidly tune their perceptual systems to the specific language in their environment**."
        ]
      },
      {
        "text": "In this narrative, **the role of learning is to select** among many **innately specified phonetic contrasts** and **narrow down the inventory** to those that are **meaningful in the child’s native language**.",
        "children": [
          "The **inventory** is the full set of phonetic contrasts the child can perceive.",
          "Learning works by elimination. It drops the contrasts the native language does not use and keeps the innate categories the language needs."
        ]
      }
    ],
    "review-37": [
      {
        "text": "**The inductive problem of early word learning** is that a single experience fits many possible meanings. **Induction** means reasoning from particular examples to a general rule, and the rule here is a word’s meaning.",
        "children": [
          "A child hears a new word while watching a cat. It might mean **CAT**, **ANIMAL** or **PET**, which are categories at different levels.",
          "It might be **FELIX**, this particular cat’s name.",
          "It might name a property such as **FURRY** or **ALIVE**, an action such as **WALKING**, or a part such as **WHISKERS** or **LEG**."
        ]
      },
      {
        "text": "All the candidate meanings together make up the **hypothesis space**.",
        "children": [
          "Each candidate fits what the child sees.",
          "Nothing in one scene singles out the meaning the speaker intends."
        ]
      },
      {
        "text": "This is a form of **Quine’s “gavagai” problem**.",
        "children": [
          "In Quine’s example, a linguist studying an unknown language hears a speaker say “gavagai” as a rabbit runs by.",
          "“Gavagai” might mean rabbit, but it might also mean undetached rabbit parts, a stage of a rabbit or something else.",
          "Children meet this problem with every new word and still learn words fast. Joint attention, cues to the speaker’s intention and default strategies cut down the possibilities."
        ]
      }
    ],
    "review-38": [
      {
        "text": "Children learn word meanings partly through **joint attention**, which is **sharing an attentional focus with another person**.",
        "children": [
          "Two people look at the same object.",
          "Each knows that the other is attending to it too."
        ]
      },
      {
        "text": "**Gaze following emerges around 9 months of age**.",
        "children": [
          "**Gaze following** means looking where someone else is looking.",
          "When an adult looks over at an object, the infant follows the adult’s eyes to it."
        ]
      },
      {
        "text": "Gaze following **signals an understanding of reference**.",
        "children": [
          "The infant grasps that the adult’s attention is aimed at something specific.",
          "If the adult then says a word, the shared object becomes the most likely referent.",
          "Joint attention therefore shrinks the hypothesis space by tying the word to what the speaker is attending to."
        ]
      }
    ],
    "review-39": [
      {
        "text": "According to **Baldwin and colleagues**, **joint attention optimizes word learning**. Two groups of infants heard a new word while they played with an object.",
        "children": [
          "In the **joint attention group**, an **adult interacting with the baby labeled the object the baby was playing with**.",
          "In the **no joint attention group**, a **voice from behind a screen labeled the object the baby was playing with**."
        ]
      },
      {
        "text": "The two conditions matched closely.",
        "children": [
          "In each, the word came while the infant was focused on the same object.",
          "They differed only in whether a visible person was engaged with the infant and the object."
        ]
      },
      {
        "text": "**Eighteen-month-olds learned the novel word in the joint attention group but not in the no joint attention group**.",
        "children": [
          "Hearing a word while seeing an object was not enough.",
          "Infants needed evidence that a speaker meant the word to refer to that object.",
          "The hidden voice gave the same word at the same moment, so the learning difference came from the visible, engaged speaker."
        ]
      }
    ],
    "review-40": [
      {
        "text": "Children also narrow the meanings of new words with **intentional cues from the speaker**, such as **eye gaze direction**. An **intentional cue** is a signal of what the speaker means to refer to.",
        "children": [
          "When a speaker looks toward one toy, the direction of the eyes marks the object of the speaker’s attention."
        ]
      },
      {
        "text": "**Baldwin** taught new words to **16–17-month-olds** and **18–19-month-olds** in two conditions.",
        "children": [
          "In **follow-in labeling**, the adult **looked at the toy the infant was focused on** while saying the new word, so both cues pointed to one toy.",
          "In **discrepant labeling**, the adult **looked at a toy in a bucket**, a different toy from the infant’s, while saying the new word."
        ]
      },
      {
        "text": "The discrepant condition pulls the infant’s focus apart from the speaker’s focus.",
        "children": [
          "Infants who simply attach a new word to whatever they are looking at would link it to their own toy.",
          "Infants who follow the speaker’s gaze would link it to the toy in the bucket.",
          "Comparing the two conditions reveals whether infants treat the speaker’s gaze as evidence of meaning."
        ]
      }
    ],
    "review-41": [
      {
        "text": "Intentional cues include **affective and behavioral cues** from the speaker. **Affective** cues are emotional expressions, and **behavioral** cues are the speaker’s actions.",
        "children": [
          "An expression can reveal whether an object is the one the speaker was searching for.",
          "An action, such as reaching for something, can reveal what the speaker wants."
        ]
      },
      {
        "text": "**Akhtar and colleagues** found that **infants used adults’ facial expressions to identify the intended referent of a novel word**.",
        "children": [
          "The adult’s emotional reaction to each object signaled whether it was the one meant.",
          "Infants linked the new word to the object that the adult’s expression picked out."
        ]
      },
      {
        "text": "Several objects may be present when a word is spoken, and the speaker’s reaction can single out one.",
        "children": [
          "Satisfaction signals that the speaker found the desired object, and disappointment signals that an object is not the one meant.",
          "Word learning therefore involves grasping the goal behind the interaction."
        ]
      }
    ],
    "review-42": [
      {
        "text": "Children also bring **word learning strategies** to the task. These are **default strategies that children bring to the word learning situation**.",
        "children": [
          "A **default** is a starting assumption that holds until evidence says otherwise.",
          "These strategies **function to narrow the hypothesis space for new words**, which gives children a place to start when other cues are weak."
        ]
      },
      {
        "text": "The **whole object assumption** is one example.",
        "children": [
          "It leads a child to expect a new word to name **a whole object**, not a part of it, its color, its texture or something it is doing.",
          "A child who hears a new word while looking at a cat will favor “cat” over “whiskers,” “furry” or “walking.”"
        ]
      },
      {
        "text": "This assumption rules out many unlikely meanings at once, and it fits the way adults usually name objects for children.",
        "children": [
          "It is only a starting preference, and later evidence can override it.",
          "Children do eventually learn words for parts and properties once the evidence points that way."
        ]
      }
    ],
    "review-43": [
      {
        "text": "**Mutual exclusivity**, from **Markman (1989)**, is another word learning strategy.",
        "children": [
          "**As a default, objects can have only one name**.",
          "The **implication** is that **new words map to nameless objects**.",
          "Mutual exclusivity **emerges during the second half of the second year**, roughly between 18 and 24 months."
        ]
      },
      {
        "text": "Suppose a child knows the word “dog” but has no word for a parrot, and both animals are in view.",
        "children": [
          "When the child hears a new word, the child takes it to mean the parrot, since the dog already has a name.",
          "No gaze or emotional cue is needed for this choice."
        ]
      },
      {
        "text": "Mutual exclusivity combines with the whole object assumption.",
        "children": [
          "The whole object assumption says a new word names an object, and mutual exclusivity says it names an object that has no name yet.",
          "Because it is a default, later learning can override it when an object turns out to have two names."
        ]
      }
    ],
    "review-44": [
      {
        "text": "**Second-language, or L2, learning** works as **a model system for sensitive period research**. A **model system** is a common, easily studied situation used to answer questions about a process that is hard to study directly.",
        "children": []
      },
      {
        "text": "**Lenneberg (1967)** proposed the influential idea that **the sensitive period had to do with the development of cerebral dominance**, also described as **developmental changes in language laterality**.",
        "children": [
          "**Cerebral dominance** means one hemisphere, usually the left, becomes specialized for language.",
          "**Language laterality** is how much language relies on one side of the brain instead of both.",
          "On this idea, the language-learning window shuts once language settles into the left hemisphere."
        ]
      },
      {
        "text": "Two kinds of evidence led to the theory.",
        "children": [
          "**A rough alignment of the literature on brain development with new insights about language milestones**. Cortical neurons grow quickly for about two years and then level off, and no measurements were available from age 2 to 18. Lenneberg tied the end of fast brain growth to the start of language learning.",
          "**A review of the literature on resilience after brain injury or surgery**. Children who lost the left hemisphere often went on to develop language, while adults did not regain it."
        ]
      },
      {
        "text": "The theory is about the brain’s **maturational state**, meaning its stage of physical development. A young, less specialized brain can move language to other tissue, and a mature, specialized brain has fewer ways to do so.",
        "children": []
      }
    ],
    "review-45": [
      {
        "text": "**Much of what is known about first-language, or L1, sensitive periods comes from research on idiosyncratic cases or relatively rare phenomena**. **Idiosyncratic** means particular to one individual.",
        "children": [
          "The evidence includes children recovering from surgery that removed a hemisphere, and Genie, who was cut off from language until age 13.",
          "Every one of these cases carries other unusual circumstances, such as injury, illness or abuse, so the true cause of an outcome is hard to identify."
        ]
      },
      {
        "text": "**In contrast, many people learn second languages at different times in their lives, often with somewhat limited success**.",
        "children": [
          "Second-language learners are plentiful, so researchers can study large groups instead of single rare cases.",
          "They begin at every age from early childhood to late adulthood, and their final success can be measured."
        ]
      },
      {
        "text": "**The limits of L2 success have also been used to reason about the timing of the sensitive or critical period**.",
        "children": [
          "If later starters reliably end up at lower levels, the age where the decline appears could mark when the sensitive period closes.",
          "The first language complicates matters, since every L2 learner already knows a language and that knowledge shapes how the new one is learned."
        ]
      }
    ],
    "review-46": [
      {
        "text": "**Johnson and Newport** examined **critical period effects in second-language learning**, in a paper on **the influence of maturational state on the acquisition of English as a second language**. **Lenneberg (1967) hypothesized that language could be acquired only within a critical period**, running from early infancy to puberty.",
        "children": [
          "In its basic form, the hypothesis concerns only first-language acquisition.",
          "Whether it also applies to second-language acquisition is an important open question.",
          "If it does, young children should learn a second language better than adults and reach higher final proficiency."
        ]
      },
      {
        "text": "The researchers compared the **English proficiency of 46 native Korean or Chinese speakers** who had **arrived in the United States between the ages of 3 and 39**.",
        "children": [
          "When tested, they had lived in the United States **between 3 and 26 years**.",
          "A **grammaticality judgment task** probed **a wide variety of structures of English grammar**."
        ]
      },
      {
        "text": "Earlier arrivals held **a clear and strong advantage** over later arrivals.",
        "children": [
          "**Test performance was linearly related to age of arrival up to puberty**, so each extra year of age at arrival meant a lower score.",
          "**After puberty, performance was low but highly variable and unrelated to age of arrival**."
        ]
      },
      {
        "text": "The age effect was **not an accidental result of differences in amount of experience with English, motivation, self-consciousness or American identification**.",
        "children": [
          "It **appeared on every grammatical structure tested**, even though later learners mastered some structures far better than others.",
          "The authors concluded that **a critical period for language acquisition extends its effects to second-language acquisition**."
        ]
      }
    ],
    "review-47": [
      {
        "text": "The **Johnson and Newport data** have three main features.",
        "children": [
          "**AOA**, age of arrival, is strongly related to accuracy, with earlier arrival going with higher scores.",
          "**Early learners, up to about age 8, are often near-perfect**, meaning **native-like**, scoring close to native English speakers.",
          "Late arrivals show a **nearly random distribution of accuracy**, since among adults age of arrival barely predicts the score."
        ]
      },
      {
        "text": "The first two features concern learners who arrived as children.",
        "children": [
          "The youngest arrivals reach native-like grammar.",
          "Arrivals between about 8 and 15 reach steadily lower levels, so the decline begins well before puberty."
        ]
      },
      {
        "text": "A **“nearly random distribution”** has a specific meaning here.",
        "children": [
          "It means that among late arrivals, age of arrival and score are only weakly related.",
          "Late arrivals scored well above chance, but individual scores varied enormously. Two adults who arrived at the same age could end up far apart."
        ]
      }
    ],
    "review-48": [
      {
        "text": "The **“critical period” hypothesis** comes in **two versions**.",
        "children": []
      },
      {
        "text": "**Version one is the exercise hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**If the capacity is not exercised during this time, it will disappear or decline with maturation**.",
          "**If the capacity is exercised, however, further language-learning abilities will remain intact throughout life**.",
          "An adult who learned an L1 normally should then learn an L2 as well as a child does."
        ]
      },
      {
        "text": "**Version two is the maturational state hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**This capacity disappears or declines with maturation**, whether or not it has been used.",
          "Even a person with a normal L1 should then learn an L2 less well as an adult."
        ]
      },
      {
        "text": "Every Johnson and Newport participant had a normal first language, yet later starters learned the L2 less well.",
        "children": [
          "That result supports the **maturational state hypothesis**, which is the idea named in the paper’s title."
        ]
      },
      {
        "text": "This prompts the question of **whether the L1 critical period data should be interpreted differently**.",
        "children": [
          "In cases like Genie, the capacity was never exercised, and both hypotheses predict poor learning for such cases.",
          "Only second-language data can separate the two versions, because only L2 learners have already exercised the capacity before learning another language."
        ]
      }
    ],
    "review-49": [
      {
        "text": "**Allopenna and colleagues (1994)** demonstrated the **“cohort effect.”** A **cohort** is the set of words that share the same beginning sounds.",
        "children": [
          "Participants viewed a grid containing pictures and shapes and followed spoken instructions.",
          "The display included a **beaker**, the target, a **beetle**, which shares its beginning with beaker, a **speaker**, which rhymes with beaker, and a **carriage**, which is unrelated."
        ]
      },
      {
        "text": "Looks to the **beaker** and the **beetle** rose together early, because both fit the first sounds of the word.",
        "children": [
          "Once the sounds that separate the two words arrived, looks to the beetle dropped away, while looks to the beaker kept climbing.",
          "Looks to the **speaker** rose later and stayed smaller, because its overlap comes at the end of the word.",
          "Looks to the carriage stayed near zero."
        ]
      },
      {
        "text": "The **cohort effect** is this early competition from words that share a beginning with the target.",
        "children": [
          "Words compete as soon as they match the incoming sounds.",
          "They drop out when the input stops matching them, and eye movements track this rise and fall moment by moment."
        ]
      }
    ],
    "review-50": [
      {
        "text": "**Marian and Spivey** tested the cohort effect with **“cross-language competitors.”** A cross-language competitor is an object whose name in the **other language** begins like the spoken target word.",
        "children": []
      },
      {
        "text": "**If L1 words are always activated, native Russian speakers should look at a book of matches when the target is “speaker” in English**.",
        "children": [
          "English **speaker** starts with the same sounds as Russian **спички, spichki**, which means **matches**.",
          "If Russian is active during English listening, the matches should draw looks."
        ]
      },
      {
        "text": "For **English targets**, each target came with an **English competitor** and a **Russian competitor**.",
        "children": [
          "**Speaker** came with English **spear** and Russian **spichki**, matches.",
          "**Boot** came with **book** and **buben**, tambourine, and **shark** came with **shovel** and **sharik**, balloon.",
          "**Chair** came with **chess set** and **cherepaha**, turtle, and **marker** came with **marbles** and **marka**, stamp.",
          "**Barbed wire** came with **bark** and **barhat**, velvet, and **plug** came with **plum** and **platye**, dress.",
          "**Gun** came with **gum** and **gaika**, nut, and **lock** came with **lobster** and **lak dlea nogtei**, nail polish."
        ]
      },
      {
        "text": "For **Russian targets**, the roles were reversed.",
        "children": [
          "Russian **spichki**, matches, came with English **spear** and Russian **spitsi**, knitting needles.",
          "Russian **marka**, stamp, came with English **marker** and Russian **marlya**, cheese cloth.",
          "Russian **platye**, dress, came with English **plum** and Russian **plashch**, raincoat."
        ]
      },
      {
        "text": "The tie between a target and its cross-language competitor is only **sound**.",
        "children": [
          "Speakers and matches share no meaning.",
          "The overlap exists only for someone who knows Russian, so looks to the matches during an English task directly measure activation of spichki."
        ]
      }
    ],
    "review-51": [
      {
        "text": "Russian–English bilinguals first followed instructions in **English**, which tests **competition during L2 spoken word recognition**.",
        "children": [
          "When only the **between-language competitor** was present, it drew looks on **18%** of trials.",
          "An unrelated control object drew looks on only **7%** of trials."
        ]
      },
      {
        "text": "**When only one competitor was present, participants looked at within- and between-language competitors to the same extent**.",
        "children": [
          "The Russian name of the matches pulled the eyes as strongly as a similar English word did."
        ]
      },
      {
        "text": "**When both competitors were present, participants looked at the within-language competitor more**, **but still looked at the between-language competitor a lot**, about **twice as often as the control condition**.",
        "children": [
          "With both side by side, the English competitor won out.",
          "The Russian competitor still drew far more looks than an unrelated object."
        ]
      },
      {
        "text": "The first language therefore stays active during second-language listening. Bilinguals still choose the correct object, but L1 words compete on the way there.",
        "children": []
      }
    ],
    "review-52": [
      {
        "text": "The same bilinguals then followed instructions in **Russian**, which tests **competition during L1 spoken word recognition**.",
        "children": [
          "The within-language competitor, a Russian word, still drew extra looks, so the cohort effect appeared in Russian.",
          "An object with a similar **English** name drew looks on **8%** of trials, compared with **5%** for the control object."
        ]
      },
      {
        "text": "**English words do not seem to be activated when native Russian speakers do this experiment in Russian**.",
        "children": [
          "The **small numerical difference between the between-language and control conditions** is **not statistically significant**.",
          "A difference that is not statistically significant falls within ordinary chance variation."
        ]
      },
      {
        "text": "The two experiments together produce an **asymmetric** pattern.",
        "children": [
          "Russian words became active during English tasks.",
          "English words did not become reliably active during Russian tasks.",
          "The asymmetry fits the idea that the first language is more firmly established and more easily activated than the second."
        ]
      }
    ],
    "review-53": [
      {
        "text": "**The Revised Hierarchical Model** of **Kroll and Stewart** explains **L1–L2 interactions in terms of spreading activation**. **Spreading activation** means that activating one representation partly activates the representations linked to it.",
        "children": [
          "The model has an **L1** vocabulary, an **L2** vocabulary and a store of **concepts**, or meanings.",
          "**Lexical links** join L1 and L2 words directly, and **conceptual links** join each vocabulary to the concepts."
        ]
      },
      {
        "text": "**The L1 lexicon is assumed to be larger and more strongly connected to relevant concepts**.",
        "children": [
          "First-language words have strong links to their meanings.",
          "Second-language words have weaker links to their meanings."
        ]
      },
      {
        "text": "**The L2 lexicon is assumed to have strong forward connections to the L1 lexicon**.",
        "children": [
          "The lexical link from L2 to L1 is strong, and the link from L1 to L2 is weak.",
          "**Activation can spread more readily from an L2 word to an L1 word than the other way**."
        ]
      },
      {
        "text": "**This occurs because this direction is emphasized in learning**.",
        "children": [
          "Learners usually attach each new L2 word to its L1 translation, which builds a strong path from L2 words to L1 words.",
          "The direct path from L2 words to concepts stays weaker, at least early on, and it can grow stronger as proficiency rises."
        ]
      }
    ],
    "review-54": [
      {
        "text": "The **Revised Hierarchical Model of Kroll and Stewart (1990, 1994)** accounts for interactions between a first language, **L1**, and a second language, **L2**, through **spreading activation**, where activating one representation partly activates the representations linked to it.",
        "children": [
          "The model joins an L1 vocabulary, an L2 vocabulary and a shared store of concepts.",
          "**Lexical links** connect words across the two languages, and **conceptual links** connect each vocabulary to meanings.",
          "L1 words are strongly linked to concepts, and L2 words are linked more weakly."
        ]
      },
      {
        "text": "In the **Marian and Spivey** task in **L2**, Russian–English bilinguals hear an English instruction to pick up the **speaker**.",
        "children": [
          "**The concept for “speaker” partially activates the Russian word for “matches,”** which is **spichki**.",
          "Speaker and spichki are connected only by **sound overlap**. They begin with the same sounds, so activity spreads from one to the other, although speakers and matches share no meaning."
        ]
      },
      {
        "text": "**The activity of spichki feeds back to the conceptual activation for “matches.”**",
        "children": [
          "L1 words are tightly linked to their concepts, so the partly active Russian word strengthens the concept it names.",
          "**Conceptual activation for “matches” leads to eye movements toward the L1 competitor**, the matches, even though the listener still picks up the speaker."
        ]
      },
      {
        "text": "**When the task is done in L1**, the **conceptual links with L2 might be too weak to create this kind of interference reliably**.",
        "children": [
          "An English competitor would need a strong link from its English name to its concept to draw the eyes during a Russian task.",
          "The model gives L2 words only weak conceptual links, so interference runs from the first language into the second but not the other way."
        ]
      }
    ],
    "review-55": [
      {
        "text": "The Revised Hierarchical Model makes a **counter-intuitive prediction** even for **“balanced bilinguals,”** people who are about equally skilled in both languages.",
        "children": [
          "It might seem that a balanced bilingual is **“two monolinguals in one,”** with each language running on its own.",
          "The model predicts the reverse."
        ]
      },
      {
        "text": "For a balanced bilingual, **the conceptual links are similarly strong for both languages**.",
        "children": [
          "Each concept strongly activates its word in both languages, so both vocabularies wake up whenever either is used.",
          "**Competitive dynamics and inhibition will be engaged all the time**. **Competitive dynamics** means that words from the two languages keep competing for selection, and **inhibition** means suppressing the word from the language not in use."
        ]
      },
      {
        "text": "This prediction **has led to a lot of work on bilinguals’ advantages in nonlinguistic cognitive control tasks**.",
        "children": [
          "**Cognitive control** is the ability to direct attention and hold back irrelevant responses.",
          "Bilinguals who constantly practice choosing one language and suppressing the other might get better at controlling attention in general, even on tasks unrelated to language."
        ]
      }
    ]
  },
  "mathSpeech": {
    "\\frac{f(\\mathrm{pretty})}{f(\\mathrm{pre})}\\gg\\frac{f(\\mathrm{tyba})}{f(\\mathrm{ty})}": "the frequency of pretty divided by the frequency of pre is much greater than the frequency of tyba divided by the frequency of ty",
    "\\frac{2}{2}=1": "two divided by two equals one",
    "\\frac{2}{4}=0.5": "two divided by four equals zero point five"
  }
};
