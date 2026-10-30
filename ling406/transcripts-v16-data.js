window.LING406_TRANSCRIPTS_V16 = {
  "revision": "ling406-transcripts-v16",
  "scripts": {
    "speech1-01": [],
    "speech1-02": [
      {
        "text": "**Speech perception** is the process of recovering a linguistic message from the sound of speech. We take an acoustic signal that looks like a mess and retrieve a message as clear as “I can see you.”",
        "children": [
          "A **spectrogram** of “I can see you” has time along the bottom and frequency up the side, with darker regions marking stronger energy. The dark bands run into one another, and no clean gaps line up with separate letters or even separate words.",
          "The **vocal tract** image from the USC SPAN real-time MRI traces the tongue, lips and other articulators during speech. These articulators move continuously, and the movement for one sound overlaps with the movement for the next. Because the movements overlap, their acoustic effects overlap too."
        ]
      },
      {
        "text": "We also extract **the same message from very different physical stimuli**. People differ in voice and vocal tract size, so the same word comes out with different acoustic properties from each speaker. Listeners still hear it as the same word.",
        "children": [
          "The vowel plot graphs the **frequency of the second formant against the frequency of the first formant** for ten vowels produced by 76 speakers. Each vowel fills a large oval region rather than a single point.",
          "Many of those ovals **overlap**. One pair of frequency values can belong to one vowel for one speaker and to a different vowel for another."
        ]
      },
      {
        "text": "Recognizing speech therefore means finding a **stable linguistic identity** inside a great deal of physical variation.",
        "children": []
      }
    ],
    "speech1-03": [
      {
        "text": "One working premise is that we have to **turn a highly variable, analog signal into something more abstract**, so the language system can operate on it. An **analog signal** changes continuously. Frequency, loudness and timing can each shift by tiny amounts.",
        "children": [
          "A continuous signal has no built-in boundaries marking where one speech sound ends and the next begins.",
          "Many small changes in the signal leave the speech sound the same. Two productions can differ physically and still count as the same sound."
        ]
      },
      {
        "text": "The abstract form is a **symbolic representation**. A symbol identifies a language unit, such as a particular consonant or vowel, and sets aside its fine physical detail. The relevant unit is the **phoneme**, a sound category that distinguishes words in a language.",
        "children": [
          "The /b/ in “bat” and the /p/ in “pat” are different phonemes because swapping them changes the word.",
          "Many slightly different acoustic versions of /b/ all count as the same phoneme."
        ]
      },
      {
        "text": "**Categorical perception** is thought to reflect this **“translation” from physical to symbolic**. Listeners become less sensitive to differences inside a category and more sensitive to similar-sized differences that cross a category boundary.",
        "children": [
          "A change is especially noticeable when it changes the identity a listener assigns to the sound.",
          "A change of the same physical size can go almost unnoticed when both sounds still count as the same phoneme. Categorical perception is one account of this translation, and there are alternative ideas about how it happens."
        ]
      }
    ],
    "speech1-04": [
      {
        "text": "The **vocal tract** is the passage sound travels through during speech, from the larynx through the throat and mouth to the lips. Its shape changes as the tongue, jaw and lips move. The shape of the vocal tract is related in systematic ways to **which resonant frequencies get amplified**, following Ladefoged (1996).",
        "children": [
          "A **resonant frequency** is a frequency that a space naturally strengthens. A tube of a particular shape boosts some frequencies and weakens others.",
          "Changing the shape of the vocal tract changes which frequencies get the strongest boost."
        ]
      },
      {
        "text": "**Formants** are the resonant frequencies the vocal tract emphasizes. Each vowel has its own combination of formants, and the drawings pair a vocal tract shape with a graph of amplified frequencies for each vowel.",
        "children": [
          "For **heed, hid, head and had**, the tongue moves from high and front toward lower in the mouth. In heed, the second peak sits far above the first, and the two peaks move closer together across hid, head and had.",
          "For **hod, hawed, hood and who’d**, the tongue is farther back and the lips become more rounded. The amplified frequencies cluster at the low end, so the first and second peaks sit close together.",
          "A vowel is characterized by the **relationship among its resonances**, which stays similar across speakers even when the exact frequencies shift."
        ]
      },
      {
        "text": "A **formant transition** is a change in a formant’s frequency over time. When the mouth moves from a consonant into a vowel, the resonances glide from one set of values to another.",
        "children": [
          "The steady part of a vowel carries information about the vowel itself.",
          "The moving part carries information about how the neighboring sound is produced."
        ]
      }
    ],
    "speech1-05": [
      {
        "text": "A **spectrogram** displays acoustic energy across time and frequency. Time runs from left to right, frequency runs from bottom to top, and darker shading marks stronger energy. Each vowel has several dark horizontal bands, and these bands are its **formants**.",
        "children": [
          "The vowel samples come from Rob Hagiwara’s English vowel recordings.",
          "Yellow lines mark the centers of the formant bands so their frequencies can be compared across words."
        ]
      },
      {
        "text": "The words **bead, bid, bade, bed, bad, bod, baud, bode, “bood” and booed** all begin with /b/ and end with /d/. Because the consonants match, the differences in the spectrograms come mainly from the vowels.",
        "children": [
          "In **bead**, the first formant is very low, and the second formant is very high, above 2,000 Hz. The two bands are far apart.",
          "Moving through bid, bade, bed and bad, the first formant rises and the second formant comes down, so the bands get closer together.",
          "In the back rounded vowels such as **bode, “bood” and booed**, the second formant drops close to 1,000 Hz or below and sits near the first formant."
        ]
      },
      {
        "text": "**F1** is the lowest formant and **F2** is the second-lowest. Both resonances run through the whole vowel at the same time.",
        "children": [
          "The pattern of these two lowest formants carries most of what distinguishes one vowel from another.",
          "Bead combines a low F1 with a high F2, while booed combines a low F1 with a low F2."
        ]
      }
    ],
    "speech1-06": [
      {
        "text": "**Source-filter synthesis** builds speech sounds by treating them as two parts. The **source** is the sound energy produced by the voice, and the **filter** is the shaping of that energy by the vocal tract. Separating the two lets us change one while holding the other constant.",
        "children": [
          "The analysis uses **Praat**, free software for speech analysis available at praat.org. Praat can display recordings, measure formants and resynthesize sounds."
        ]
      },
      {
        "text": "The recording is a speaker saying the vowel **/u/**, the vowel in “booed.” The top panel is a **waveform**, which tracks changes in air pressure over time. The bottom panel is a **spectrogram** of the same sound, which separates it into its frequency components.",
        "children": [
          "The waveform makes timing and loudness easy to see.",
          "The spectrogram makes the resonance pattern easy to see."
        ]
      },
      {
        "text": "In this /u/, the **first formant is at about 300 Hz** and the **second formant is very low, around 900 Hz**. The cursor sits on the first formant, and the display reads close to 296 Hz at that point.",
        "children": [
          "Both resonances are present together throughout the vowel.",
          "Low values for both F1 and F2 fit the back rounded quality of /u/."
        ]
      },
      {
        "text": "If only the filter changes and the vowel changes with it, the vowel’s identity must come from the filter, which is the pattern of formants. The measured values of about 300 Hz and 900 Hz become the starting point for building new filters.",
        "children": []
      }
    ],
    "speech1-07": [
      {
        "text": "**Praat can find formants automatically**. It tracks each resonance through the recording and marks its frequency at each moment. In this /u/ recording, Praat identifies **five formants**, and each track follows one resonance across time.",
        "children": [
          "Several tracks running at once describe several frequency components of the same spoken sound.",
          "Automatic tracking measures the resonance pattern without estimating each frequency by eye."
        ]
      },
      {
        "text": "**Only the first three formants are usually important for phonemic processing**. F1, F2 and F3 carry most of the information that tells one phoneme from another, while the higher formants depend more on individual voice properties.",
        "children": [
          "The numbers refer to the order of the resonances from low frequency to high frequency. F1 is the lowest, F2 is the next one up, and F3 is the third."
        ]
      },
      {
        "text": "The manipulation focuses on just **the first two formants**. In this /u/, F1 is near 300 Hz and F2 is near 900 Hz.",
        "children": [
          "Changing just these two resonances is enough to turn one vowel into another, because they carry most of the information that distinguishes vowels.",
          "F3 and the higher formants stay fixed, so any change listeners hear can be traced to F1 or F2 alone."
        ]
      }
    ],
    "speech1-08": [
      {
        "text": "The **source** can be **extracted** from the recorded /u/. Praat builds a model of the filter from the measured formant frequencies and uses that model to remove the filter’s effect from the recording. What remains is a **more-or-less “unfiltered” version of the voice**.",
        "children": [
          "Removing the estimated filter leaves the sound energy that the vocal folds supplied.",
          "The result is called more-or-less unfiltered because the separation is an estimate."
        ]
      },
      {
        "text": "The extracted source **sounds like a buzz**. It still has energy and a pitch, but it has lost the resonance pattern that made it sound like /u/.",
        "children": [
          "The spectrogram of the source has energy spread across many frequencies, without the strong low bands that marked the formants of /u/.",
          "The pitch stays because it comes from the vibration of the vocal folds. The vowel quality disappears because it comes from the filter."
        ]
      },
      {
        "text": "The separation is **a little bit like doing a multiple regression analysis**. In multiple regression, the contribution of one predictor is estimated and removed so the remaining contribution can be examined.",
        "children": [
          "Here the contribution of the filter is estimated and removed, and the remaining signal is treated as the source.",
          "Once the source is isolated, new filters can be applied to it. Keeping the same source while swapping the filter makes the effect of the resonance pattern testable."
        ]
      }
    ],
    "speech1-09": [
      {
        "text": "Three different **filters** can be applied to the same source. A filter specifies which frequencies get more emphasis and which get less, so each filter is a resonance pattern. The three spectrograms each run from 0 to 2.5 seconds in time and from 0 to 5,000 Hz in frequency.",
        "children": [
          "The **first filter** is just the first four formants from the original /u/ recording. Applying it to the source should restore the original vowel quality.",
          "The **second filter** raises **the first formant a little**, and the other formants stay roughly where they were.",
          "The **third filter** raises **the second formant a lot**, while F1 and the higher formants stay roughly where they were."
        ]
      },
      {
        "text": "Each manipulation changes one part of the resonance pattern rather than shifting every frequency together.",
        "children": [
          "In the original filter, F1 and F2 are both low, which matches /u/.",
          "Raising F1 moves only the lowest band upward. Raising F2 moves only the second band upward, and by a much larger amount."
        ]
      },
      {
        "text": "The **sound source stays the same** across all three filters. Any difference in vowel quality therefore comes from the filter.",
        "children": [
          "No new speaker and no new recording are needed.",
          "Comparing the outputs isolates what a change in the lowest resonance does compared with a change in the second resonance."
        ]
      }
    ],
    "speech1-10": [
      {
        "text": "**Multiplying the source by the filters gives new vowels**. In source-filter terms, the output sound is the source shaped by the filter. Each filter boosts a different set of frequencies, so each combination comes out as a different vowel.",
        "children": [
          "The source supplies the raw sound energy.",
          "The filter decides how much of that energy stays prominent in each frequency region."
        ]
      },
      {
        "text": "The three resulting spectrograms come from one source and three filters.",
        "children": [
          "With the **original filter**, F1 and F2 stay low and the result keeps the quality of /u/.",
          "With **F1 raised a little**, the lowest band moves upward and the vowel quality changes.",
          "With **F2 raised a lot**, the second band moves far upward and the vowel quality changes in a different way. Raising F2 for a back rounded vowel moves it toward a more front vowel quality."
        ]
      },
      {
        "text": "**Source-filter synthesis** therefore separates two contributions that are combined in ordinary speech. The voice supplies the sound, and the vocal tract resonances shape its quality.",
        "children": [
          "All three outputs share the same buzz, pitch and timing, yet they sound like different vowels.",
          "A researcher can change vowel quality by replacing only the filter, without asking a speaker to produce a new utterance for every version."
        ]
      }
    ],
    "speech1-11": [
      {
        "text": "Formant values are only **partly** determined by which vowel a speaker intends. They are also shaped by **anatomical features** that differ between speakers of the same language, by **different rates of speech**, and by **context**, such as the phones produced before and after a vowel.",
        "children": [
          "**Anatomy** matters because vocal tracts differ in length and shape. A longer vocal tract produces lower resonances overall.",
          "**Speaking rate** matters because fast speech gives the articulators less time to reach their targets.",
          "**Context** matters because the tongue and lips are already moving toward the next sound or away from the previous one. A **phone** is a specific spoken realization of a speech sound."
        ]
      },
      {
        "text": "The F2-by-F1 plot for ten vowels from 76 speakers displays this variability. Each vowel forms a cloud of points enclosed by an oval, and the ovals overlap.",
        "children": [
          "The same F1 and F2 values can belong to different vowels for different speakers.",
          "No single pair of frequencies defines a vowel for everyone."
        ]
      },
      {
        "text": "Formant values can **nonetheless** provide a pretty good description of **vowel space**, especially for **a specific talker speaking carefully**. Vowel space is the arrangement of a language’s vowels by their formant frequencies.",
        "children": [
          "Within one careful talker, the vowels separate much more cleanly than they do across many talkers.",
          "All else being equal, we can produce **reasonable approximations of vowels by manipulating steady-state formants**. A **steady-state formant** is the resonance during the stable middle part of a vowel, as opposed to the transitions at its edges."
        ]
      }
    ],
    "speech1-12": [
      {
        "text": "The **pattern playback synthesizer** turns a painted spectrographic pattern back into sound. Researchers paint dark bands on a transparent sheet where they want acoustic energy to occur across time and frequency, and the machine plays that pattern aloud.",
        "children": [
          "Changing the painted pattern changes the sound.",
          "Researchers could create controlled, speech-like sounds instead of relying on natural recordings that differ in many uncontrolled ways."
        ]
      },
      {
        "text": "The machine works by passing light through the painted pattern.",
        "children": [
          "A **light source** shines through a **cylindrical lens** onto a rotating **tone wheel**. The tone wheel has rings that modulate the light at different frequencies, so the beam carries many frequencies at once.",
          "A lens and a **mirror** direct the modulated light onto the **spectrogram** painted on the sheet. The painted areas reflect light at particular positions and let the matching frequencies through.",
          "A **light collector** and a **photocell** convert the reflected light into an electrical signal. An **amplifier** strengthens the signal, and a **loudspeaker** turns it into audible sound."
        ]
      },
      {
        "text": "With this device, a researcher can alter one formant band or one transition and hear the result immediately.",
        "children": [
          "Every other part of the pattern stays exactly the same.",
          "Differences in what listeners hear can then be traced to the single acoustic change that was painted. Painting a series of patterns that differ in tiny steps made it possible to discover how formant transitions signal consonants."
        ]
      }
    ],
    "speech1-13": [
      {
        "text": "**Stop consonants are distinguished by formant transitions**. The stop consonants **/b/, /d/ and /g/** are made by briefly closing the vocal tract and then releasing it. The audible part of a /b/, /d/ or /g/ happens **while the jaw is opening**.",
        "children": [
          "During the opening movement, the vocal tract shape is changing rapidly.",
          "The changing shape makes the formants glide from the consonant’s position toward the vowel’s position. The consonant’s identity is carried by how the formant frequencies move."
        ]
      },
      {
        "text": "**Liberman and colleagues (1957)** used the **pattern playback synthesizer** to create speech-like sounds that replicated these transitions. Each painted pattern has two formants plotted against time in milliseconds, with frequency in cycles per second from 0 up to about 2,400.",
        "children": [
          "The **lower formant** looks nearly the same in every stimulus. It rises briefly and then stays steady near 600 cycles per second or below.",
          "The **upper formant** starts at a different frequency in each stimulus before settling at the same steady level near 1,800 cycles per second.",
          "In the early stimuli, the upper formant starts low and **rises** into the vowel. In the middle stimuli, it is nearly **flat**. In the later stimuli, it starts high and **falls** into the vowel."
        ]
      },
      {
        "text": "The fourteen numbered patterns keep the following vowel alike and change only the onset of the upper transition.",
        "children": [
          "A rising transition is heard as /b/, a roughly flat one as /d/ and a falling one as /g/.",
          "Because only the transition differs, listeners’ responses can be tied directly to it."
        ]
      }
    ],
    "speech1-14": [
      {
        "text": "A **speech continuum** is a set of sounds that change gradually along one controlled acoustic property. These stimuli are built by **keeping F1 constant** and **varying the F2 onset frequency linearly** from stimulus 1 to stimulus 13. The **F2 onset frequency** is the frequency at which the second formant begins its transition.",
        "children": [
          "Keeping F1 constant removes one possible source of difference between stimuli.",
          "Varying the F2 onset **linearly** means the onset frequency changes by the same step every time. **Adjacent stimuli differ by the same amount across the entire continuum**."
        ]
      },
      {
        "text": "The F2 transitions move gradually along the continuum.",
        "children": [
          "At the start, F2 begins well below its steady vowel frequency, so the transition rises.",
          "As the onset frequency increases, the rise shrinks until the transition is nearly flat.",
          "Further along, F2 starts above the vowel frequency, and the transition falls."
        ]
      },
      {
        "text": "Because each step is physically equal, the continuum is a fair test of whether perception follows the acoustics or the categories.",
        "children": [
          "Some neighboring pairs fall inside one consonant category, and some pairs cross a category boundary.",
          "A purely acoustic listener would hear every step as the same size of change.",
          "If perception is categorical, steps within a category will sound alike while steps across a boundary will sound different. Any advantage for boundary-crossing pairs comes from the boundary itself."
        ]
      }
    ],
    "speech1-15": [
      {
        "text": "An **ideal observer model** predicts how a listener would respond if perception worked according to a particular account. This version assumes that perception is **non-categorical**, so it tracks the acoustic signal gradually without sharp category boundaries.",
        "children": [
          "The model is a baseline. Real data can be compared against it to see whether perception is more categorical than a gradual account allows."
        ]
      },
      {
        "text": "The first prediction is that **categorization gets “blurry” as you move away from category prototypes**. A **prototype** is the clearest example of a category. The endpoints of the continuum are /b/ and /g/, with /d/ in the middle.",
        "children": [
          "Between two prototypes, **stimulus ambiguity scales with the distance from the prototype**. The farther a stimulus is from the /b/ prototype, the less /b/-like and the more /d/-like it sounds.",
          "**Stimulus 2** would be heard as **75% /b/ and 25% /d/**. It is a quarter of the way from the /b/ prototype toward the /d/ prototype, so the responses split in the same proportion."
        ]
      },
      {
        "text": "The predicted **labeling** graph plots the proportion of /b/, /d/ and /g/ responses from 0 to 1 across stimuli 1 to 11.",
        "children": [
          "The /b/ line stays at 1 through stimulus 2 and then falls in a straight line to 0 at stimulus 6.",
          "The /d/ line rises in a straight line from stimulus 2 to a peak of 1 at stimulus 6 and then falls back to 0 at stimulus 10.",
          "The /g/ line starts rising after stimulus 6 and reaches 1 at stimulus 10. Neighboring lines cross at 0.5 halfway between their prototypes. Every change is a gradual straight slope rather than a sharp step."
        ]
      }
    ],
    "speech1-16": [
      {
        "text": "The same ideal observer can also assume that perception is **linear**, so equal acoustic differences are perceived as equally large. This leads to a second prediction, which is that **discrimination performance should be independent of labeling**.",
        "children": [
          "**Labeling** asks a listener to identify a sound as /b/, /d/ or /g/.",
          "**Discrimination** asks only whether two sounds are the **same or different**. These are separate tasks, even when they use the same continuum."
        ]
      },
      {
        "text": "Labeling **has to have a “peaked” function**. There are three categories, and listeners are choosing between labels, so each category’s responses rise toward its prototype and fall away from it.",
        "children": [
          "In the predicted labeling graph, the /d/ line forms a peak at stimulus 6 while /b/ and /g/ rise toward opposite ends.",
          "These peaks come from the structure of the labeling task."
        ]
      },
      {
        "text": "The predicted **discrimination** graph plots accuracy for pairs two steps apart, from **1 vs. 3** through **9 vs. 11**. Accuracy is a flat line at about 0.8 for every pair.",
        "children": [
          "If the perception of differences in F2 onset were constant across the continuum, discrimination accuracy would also be constant.",
          "Each pair has the same physical separation, so a linear account gives each pair the same chance of being heard as different.",
          "Under this account, discrimination stays level even where labeling changes. A flat line would mean category boundaries play no role in hearing differences, while a peaked line would mean the boundaries make some differences easier to hear."
        ]
      }
    ],
    "speech1-17": [
      {
        "text": "**Liberman and colleagues (1957)** measured actual labeling and discrimination along the /b/–/d/–/g/ continuum. Their results departed sharply from the non-categorical, linear predictions.",
        "children": [
          "Listeners labeled each stimulus and also judged pairs of stimuli in discrimination tests.",
          "The discrimination tests compared stimuli **one step**, **two steps** and **three steps** apart."
        ]
      },
      {
        "text": "The **labeling data** show **sharp changes** in identification.",
        "children": [
          "Stimuli 1 through about 3 are labeled /b/ close to 100% of the time.",
          "Around stimuli 4 and 5, /b/ responses drop steeply and /d/ responses climb to nearly 100%. /d/ stays dominant through about stimulus 8.",
          "Around stimuli 9 and 10, /d/ responses drop steeply and /g/ responses rise to near 100%. These switches are far more abrupt than the straight-line slopes the ideal observer predicted."
        ]
      },
      {
        "text": "**Listeners were best at discriminating sounds near the category boundaries**.",
        "children": [
          "In each discrimination graph, the solid line is the obtained accuracy and the dashed line is the accuracy predicted from the labeling data.",
          "Accuracy peaks around the /b/–/d/ boundary and again around the /d/–/g/ boundary. Between those peaks, the predicted accuracy falls to about 50%, which is chance.",
          "The peaks appear in one-step, two-step and three-step comparisons. Larger steps raise accuracy overall, but the peaks stay at the boundaries."
        ]
      },
      {
        "text": "The predictions derived from labeling capture much of the shape of the obtained discrimination.",
        "children": [
          "Obtained accuracy is often somewhat higher than the prediction, especially within categories.",
          "Listeners therefore keep some sensitivity to acoustic differences beyond pure category labels."
        ]
      }
    ],
    "speech1-18": [],
    "speech1-19": [
      {
        "text": "Class data from prior years tested categorical perception along a **beach–peach** continuum. The words differ in their first consonant, /b/ versus /p/. Each panel pair gives one listener’s **identification** results and that listener’s **discrimination** results.",
        "children": [
          "The identification graphs plot the proportion of one word label across stimuli 1 to 9.",
          "The discrimination graphs plot accuracy for pairs two steps apart, from **1–3** through **7–9**."
        ]
      },
      {
        "text": "For the first listener, identification stays at one word for the early stimuli and then **switches to the other word** around the middle of the continuum.",
        "children": [
          "Responses are mixed for a small region near the switch, and past that region the other word becomes the consistent answer.",
          "The acoustic change is gradual, but the label changes within a narrow region."
        ]
      },
      {
        "text": "That listener’s discrimination is highest for **pairs 4–6 and 5–7**, which straddle the identification boundary.",
        "children": [
          "Pairs well inside one category are discriminated less accurately even though their physical separation is the same.",
          "Pair 6–8 falls between these two patterns because stimulus 6 itself received mixed labels."
        ]
      },
      {
        "text": "The second listener **switches word labels later** along the continuum and has stronger discrimination near that later boundary.",
        "children": [
          "Different people can place their category boundaries at different points.",
          "For both listeners, the best discrimination falls close to their own identification boundary."
        ]
      }
    ],
    "speech1-20": [
      {
        "text": "The class data lead to some general observations. **Not everyone has exactly the same category boundary**. A sound near the beach–peach boundary for one listener can sit inside a category for another.",
        "children": [
          "A pair that crosses one person’s boundary can stay within one category for someone else.",
          "Group averages can therefore blur the boundary peak when individual boundaries differ."
        ]
      },
      {
        "text": "**In general, discrimination is best for stimuli perceived as being in different categories**.",
        "children": [
          "A listener may miss a physical difference between two versions of the same phoneme.",
          "A difference of the same physical size becomes much more noticeable when the two sounds are heard as different words."
        ]
      },
      {
        "text": "To make the lab doable in a short time, the discrimination experiment included **only “different” trials**. Every pair contained two physically different stimuli.",
        "children": [
          "The correct answer on every trial was therefore **“different,”** if the listener could discriminate the two sounds.",
          "A “same” response meant the listener missed a difference that was really there.",
          "Accuracy is the proportion of pairs a listener heard as different. A listener who always answered different would score perfectly, so low accuracy for within-category pairs means listeners often failed to hear real differences."
        ]
      }
    ],
    "speech1-21": [
      {
        "text": "Further class results compare a **bear–pear** continuum with the **beach–peach** continuum.",
        "children": [
          "The **bear–pear identification** graph has a fairly clear switch from one word label to the other across stimuli 1 to 9.",
          "The **bear–pear discrimination** graph, for pairs 1–3 through 6–8, varies irregularly. Accuracy is 0 for pairs 1–3 and 2–4, jumps to 1 for 3–5, drops back to 0 for 4–6, returns to 1 for 5–7 and falls to 0 for 6–8.",
          "The **beach–peach** graphs from another listener fluctuate even more. Identification zigzags across the continuum instead of switching once, and discrimination bounces between high and low values."
        ]
      },
      {
        "text": "The one iron-clad law of experimental research is that **stuff happens**. Responses to a carefully built continuum can still bounce up and down.",
        "children": [
          "Identification records which word a listener chooses, while discrimination records whether a difference is detected. These two behaviors can vary differently across trials and people.",
          "An isolated rise in discrimination reflects noise in a few responses."
        ]
      },
      {
        "text": "The data raise the question of how the experiment could be improved.",
        "children": [
          "Only “different” trials were used, so there was no measure of how often listeners said “different” when the sounds were identical.",
          "A short session gave each listener few trials per pair, so single responses could move accuracy a great deal.",
          "The scientific test is whether better discrimination lines up with the place where identification changes, compared across the whole continuum."
        ]
      }
    ],
    "speech1-22": [
      {
        "text": "The key question is **how categorical perception would help**. Put another way, **what is the advantage of being worse at hearing some differences between sounds**? Categorical perception makes listeners worse at hearing differences within a category, which at first sounds like throwing away useful detail.",
        "children": []
      },
      {
        "text": "The advantage is **stable word recognition**. Different productions of the same phoneme are always physically different, because of speakers, speaking rates and surrounding sounds.",
        "children": [
          "If every small acoustic change were heard as a new identity, ordinary versions of one word would seem like unrelated sounds.",
          "Being less sensitive to within-category differences lets many acoustic versions count as the same phoneme."
        ]
      },
      {
        "text": "Differences that separate categories stay easy to hear, so the distinctions that change words are preserved.",
        "children": [
          "Variation within a category is tolerated because it does not change the word.",
          "Ignoring small differences within a category lets the listener focus on the differences that change meaning."
        ]
      }
    ],
    "speech1-23": [],
    "speech1-24": [
      {
        "text": "**Categorical perception in infants** can be tested even though infants cannot name sounds. Researchers measure a behavior that changes when an infant notices something new, since infants respond to novelty.",
        "children": [
          "The **conditioned head turn procedure**, from Janet Werker’s infant studies lab, trains an infant to turn toward a sound when the sound changes. A correct head turn is rewarded with an interesting visual display, such as a moving toy.",
          "Once the infant learns this association, a head turn after a change is evidence that the infant detected the change."
        ]
      },
      {
        "text": "The results of interest here come from **high-amplitude sucking**. The infant sucks on a pacifier connected to a recording device, and strong sucks trigger the presentation of a sound.",
        "children": [
          "When the same sound repeats, the infant gets used to it, a process called **habituation**, and the sucking rate drops.",
          "If a new sound makes sucking **increase again**, the infant has noticed the change."
        ]
      },
      {
        "text": "Both methods make perception testable before an infant can speak.",
        "children": [
          "The experimenter controls exactly which sound difference is presented.",
          "The infant’s head turn or renewed sucking then reveals sensitivity to that difference without any labeling task. These methods allow testing of infants who are months away from producing words."
        ]
      }
    ],
    "speech1-25": [
      {
        "text": "**Eimas and colleagues (1971)** tested categorical perception in **4-month-old infants** using **high-amplitude sucking**. The acoustic dimension was **voice onset time**, or **VOT**, which is the delay between the release of a consonant and the start of vocal fold vibration.",
        "children": [
          "Adults hear a short VOT as a voiced consonant such as /b/ and a longer VOT as a voiceless consonant such as /p/.",
          "The spectrograms compare a syllable with a VOT of **+10 milliseconds** and one with **+100 milliseconds**. With the longer VOT, the voicing bars start much later after the release."
        ]
      },
      {
        "text": "Infants heard one synthetic syllable repeatedly until their sucking rate declined, and then the sound changed or stayed the same.",
        "children": [
          "In condition **20D**, the VOT changed from **+20 to +40 milliseconds**. This 20-millisecond difference **crossed** the adult boundary between two phonemic categories.",
          "In condition **20S**, the VOT also changed by **20 milliseconds**, either from **−20 to 0** or from **+60 to +80 milliseconds**. Both stimuli came from the **same** adult category.",
          "In condition **0**, the control group heard the same stimulus throughout."
        ]
      },
      {
        "text": "The graphs plot mean sucking responses per minute, with the shift marked by a dashed line.",
        "children": [
          "Sucking rose early and then declined to around 30 to 40 responses per minute before the shift.",
          "In **20D**, sucking **recovered** sharply after the shift, back up near 50.",
          "In **20S**, sucking kept dropping, with little recovery. In **0**, it continued to decline toward about 15."
        ]
      },
      {
        "text": "Infants discriminated the change that crossed an adult category boundary but not the equally large change within a category.",
        "children": [
          "The two changed conditions were matched at 20 milliseconds, so the difference comes from crossing the boundary.",
          "The control condition establishes what continued repetition alone does to sucking."
        ]
      }
    ],
    "speech1-26": [
      {
        "text": "**Perceptual narrowing** is the process in which experience tunes perception to the sounds of the surrounding language, while sensitivity to some distinctions from other languages declines. **Werker and Tees** tested how age and experience affect infants’ ability to discriminate two **non-English contrasts**.",
        "children": [
          "The **Hindi contrast** is a distinction between two “ta”-like sounds that English does not use.",
          "The **Salish contrast** is a distinction between “ki” and “qi” in Nthlakampx, a Salish language, which English also does not use."
        ]
      },
      {
        "text": "The bar graph gives the **percentage of infants reaching the discrimination criterion** at each age.",
        "children": [
          "At **6–8 months**, English-learning infants did well, with about 95% meeting criterion for Hindi and about 80% for Salish.",
          "At **8–10 months**, performance dropped to about 67% for Hindi and about 52% for Salish.",
          "At **10–12 months**, performance was much lower, near 20% for Hindi and near 10% for Salish.",
          "**Hindi- and Salish-learning infants** met criterion close to 100% for the contrast in their own language."
        ]
      },
      {
        "text": "These results are described as **perceptual reorganization during the first year of life**.",
        "children": [
          "Young infants can detect these nonnative contrasts.",
          "With experience of English, English-learning infants become much less likely to discriminate them by around their first birthday.",
          "Infants who hear the contrast in their own language keep strong discrimination, so the decline depends on language experience. Contrasts used in the native language are kept, and contrasts absent from it become hard to hear."
        ]
      }
    ],
    "speech1-27": [
      {
        "text": "There is **a very compelling narrative** about speech perception built from these findings. It has three connected claims.",
        "children": [
          "First, speech perception depends on **categorical perception abilities that are a special property of the language system**. The mechanism that sorts sounds into categories is claimed to be specialized for language.",
          "Second, these abilities are **present very early in development**. The infant experiments with sucking and head turns are taken as evidence that the mechanism is in place long before children talk."
        ]
      },
      {
        "text": "Third, children **start off as “citizens of the world,”** able to hear **all** speech contrasts. They then **rapidly tune their perceptual systems to their specific language**.",
        "children": [
          "“Citizens of the world” means an infant could learn any human language and is ready to hear the distinctions of every one.",
          "Tuning means contrasts used in the surrounding language stay available while contrasts from other languages fade, as in the Werker and Tees results."
        ]
      },
      {
        "text": "The narrative is an account of both the **starting state** and **developmental change**.",
        "children": [
          "It claims broad, language-specific abilities at birth.",
          "It describes development mainly as narrowing from that broad starting point.",
          "Each early finding seems to support it, since infants discriminate categorically before they talk, hear contrasts from many languages and lose nonnative contrasts with experience."
        ]
      }
    ],
    "speech1-28": [
      {
        "text": "The compelling narrative runs into **some issues**. For **categorical perception**, three problems stand out.",
        "children": [
          "Categorical perception is **not limited to language**. It also occurs with nonspeech sounds, which challenges the claim that it is special to language.",
          "Categorical perception is **not limited to humans**. Nonhuman animals also show categorical patterns for speech sounds, which challenges the claim that it is special to humans.",
          "Categorical perception is **task-dependent**. How categorical the results look depends on what the listener is asked to do. Choosing between labels tends to make responses more categorical than a task that measures fine acoustic differences."
        ]
      },
      {
        "text": "For **infant speech perception**, the problem is that it is **not actually “universal.”**",
        "children": [
          "Some contrasts are already harder for infants to detect than others early in life.",
          "Development therefore includes initial differences in sensitivity, along with changes driven by experience."
        ]
      },
      {
        "text": "Together these issues challenge the strong claim that every speech distinction begins equally available within a mechanism devoted only to language.",
        "children": []
      }
    ],
    "speech1-29": [
      {
        "text": "**Cutting and Rosner (1974)** tested categorical perception with **non-speech sounds**. The acoustic dimension was **rise time**, which is how quickly a sound reaches its full loudness after it begins.",
        "children": [
          "A sound with a **rapid rise time** sounds **plucked**, like a plucked string.",
          "A sound with a **slow rise time** sounds **bowed**, like a bowed string."
        ]
      },
      {
        "text": "The stimuli included **sawtooth waves**, **sine waves** and **speech syllables**, displayed as oscillograms with **10-millisecond** and **70-millisecond** rise times. An **oscillogram** tracks the shape of the sound wave over time.",
        "children": [
          "With a 10-millisecond rise, the waveform reaches full size almost immediately.",
          "With a 70-millisecond rise, the waveform grows gradually.",
          "Pluck and bow are perceptual labels for two kinds of onset, not phonemes."
        ]
      },
      {
        "text": "The results for **sawtooth waves** plot identification and discrimination against rise time from 0 to 80 milliseconds.",
        "children": [
          "**Pluck responses** start near 100% for short rise times and fall steeply around 30 to 50 milliseconds. **Bow responses** rise in the same region to near 100% at long rise times.",
          "**Discrimination** of pairs differing by 10 milliseconds stays around 55 to 60% for most pairs. It **peaks near 75%** for the pairs around 30 to 50 milliseconds, right where the labels switch."
        ]
      },
      {
        "text": "The link between a label boundary and improved discrimination therefore appears for a non-linguistic sound distinction. The physical continuum is gradual, but the preferred label changes over a narrow region and discrimination improves there.",
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
        "text": "The three conditions were **no change**, a change **within categories** and a change **between categories**. Each graph plots mean sucking responses per minute, with time measured from the shift and a baseline rate marked “B.”",
        "children": [
          "In every condition, sucking started near 20 per minute and declined to about 12 before the shift as the sound became familiar.",
          "After **no change**, sucking stayed low, near 12.",
          "After a **within-category** change, sucking also stayed low.",
          "After a **between-category** change, sucking jumped back up to about 18 and then declined again as the new sound became familiar."
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
          "The chinchillas learned that either the **0-millisecond lag** stimulus or the **80-millisecond lag** stimulus was an **SD** for food. **SD** stands for **discriminative stimulus**, a signal that a response will be rewarded.",
          "The lag is **voice onset time**. Humans hear a 0-millisecond lag as /ga/ and an 80-millisecond lag as /ka/."
        ]
      },
      {
        "text": "After training, the chinchillas were tested with **intermediate VOTs** along the **/ga/–/ka/** continuum.",
        "children": [
          "The graphs plot the proportion labeled /ga/ against VOT from 0 to 120 milliseconds for two chinchillas and two human listeners. Separate curves compare a 0–80 millisecond continuum, a 0–120 millisecond continuum and stimuli with an enhanced burst.",
          "In every panel, /ga/ labeling stays near 1 for short VOTs and then drops steeply to near 0, mostly between about 30 and 70 milliseconds.",
          "The chinchilla curves have the same steep, categorical shape as the human curves."
        ]
      },
      {
        "text": "The comparison also varied the **burst** and **aspiration noise**. The **burst** is the brief noise at the release of a stop consonant, and **aspiration** is the breathy noise that follows a voiceless release.",
        "children": [
          "Increasing the intensity of the burst and aspiration noise shifted the boundary to a shorter VOT, made the curve steeper, or both.",
          "This happened for one chinchilla and for one human listener, so the two species were affected in a similar way.",
          "Animals without human language can therefore sort a speech continuum into categories, which argues against the view that categorical perception is special to human language."
        ]
      }
    ],
    "speech1-32": [
      {
        "text": "Some speech contrasts are **less salient than others** for infants. A **salient** contrast is one that is easy to notice.",
        "children": [
          "The contrasts tested here differ in **place of articulation**, which is where in the mouth a sound is made.",
          "In **[ma]**, the nasal is made with the lips. In **[na]**, it is made with the tongue near the ridge behind the teeth. In **[ŋa]**, the sound at the end of “sing,” it is made with the back of the tongue against the soft palate."
        ]
      },
      {
        "text": "Infants’ **looking time** was compared on **same** trials, where the syllable did not change, and **change** trials, where it switched. Longer looking on change trials is evidence that the infant noticed the change. Error bars mark the standard error of each mean.",
        "children": [
          "At **4–5 months**, English-hearing infants looked about 3.3 seconds on same trials and about 5.4 seconds on change trials for the native **[ma]–[na]** contrast.",
          "For the nonnative **[na]–[ŋa]** contrast, the same infants looked about 4.5 seconds on same trials and about 4.2 seconds on change trials. There was no increase for the change, and English does not use [ŋ] at the start of syllables."
        ]
      },
      {
        "text": "**Filipino-learning infants** hear [na]–[ŋa] as a contrast in their own language.",
        "children": [
          "At **6–8 months**, their looking time was about 3.8 seconds on both same and change trials, so the change produced no detectable response.",
          "By **10–12 months**, looking rose from about 3.3 seconds on same trials to about 4.8 seconds on change trials."
        ]
      },
      {
        "text": "Some contrasts therefore start out hard for infants to hear, even when they are native. Experience with the language **strengthens** sensitivity to such contrasts over the first year, so development includes gains as well as losses.",
        "children": []
      }
    ],
    "speech2-01": [],
    "speech2-02": [
      {
        "text": "**Klatt (1979)** describes a very old and very general model of speech perception. It treats recognition as a series of stages, and each stage transforms the output of the stage before it.",
        "children": [
          "The **speech waveform** enters the **peripheral auditory system**, which performs a **spectral analysis**. The **cochlea** in the inner ear breaks the incoming sound into its frequency components.",
          "**Acoustic property detectors** respond to particular properties of the sound, and their outputs change over time.",
          "**Phonetic feature detectors** use those outputs to estimate the probability of features such as voicing at each moment.",
          "**Segmental analysis** combines the features into a sequence of speech segments, called a **segmental feature matrix**.",
          "**Lexical search** compares that sequence with stored words and produces **lexical hypotheses**, which are candidate words that might match the input."
        ]
      },
      {
        "text": "Categorical perception fits this picture. Somewhere between the **analog signal** coming through the cochlea and the **activation of phonemes** during segmental analysis, **information is lost**. Many physically different sounds end up as the same phoneme.",
        "children": [
          "This **loss of information is helpful**, because a shared phoneme sequence can be matched directly against stored words at higher levels of representation.",
          "One assumption that follows is that **in order to identify words, we need to first identify their constituent phonemes**."
        ]
      },
      {
        "text": "Two problems challenge this simple view.",
        "children": [
          "The first is **cascaded processing**, in which partial information is passed forward to the next level before the earlier decision is finished.",
          "The second is **feedback**, in which a higher level, such as the word level, sends influence back down to a lower level, such as the phoneme level."
        ]
      }
    ],
    "speech2-03": [
      {
        "text": "The **beach–peach** continuum is a familiar **voicing continuum**. The words differ in their first consonant, /b/ in beach and /p/ in peach, and these consonants differ mainly in **voice onset time**, or **VOT**. VOT is the delay between the release of the lips and the start of vocal fold vibration.",
        "children": [
          "The spectrograms run from **“peach”** to **“beach”** along an arrow labeled **shorter voice onset time**.",
          "As VOT gets shorter, the gap between the release and the voicing bars shrinks. A long gap sounds like peach, and a short gap sounds like beach."
        ]
      },
      {
        "text": "In the **identification** results, a listener labels stimuli 1 through 5 consistently as one word.",
        "children": [
          "At stimulus 6, responses become mixed, with the proportion near 0.33, and this point is circled.",
          "From stimulus 7 onward, the listener consistently gives the other word.",
          "The **category boundary** is the narrow region where the preferred label switches."
        ]
      },
      {
        "text": "In the **discrimination** results, accuracy is near 0 for pairs inside one category.",
        "children": [
          "Accuracy jumps to 1 for pairs **4–6** and **5–7**, which straddle the identification boundary.",
          "Pair 6–8 is intermediate, near 0.33, and accuracy falls back to 0 for pair 7–9.",
          "Equal changes in VOT are much easier to detect across the boundary, where they change the word, than inside one category, where the word stays the same."
        ]
      }
    ],
    "speech2-04": [
      {
        "text": "**How does categorical perception happen?** One answer is a **threshold model**. In a threshold model, **activity is only passed forward from one level to the next when an activity threshold is crossed**.",
        "children": [
          "A **threshold** is a set level of activity that must be reached before anything is sent onward.",
          "Activity below the threshold can change without any effect on the next level."
        ]
      },
      {
        "text": "In this kind of model, **categorical perception arises at phoneme identification**.",
        "children": [
          "The **feature activation** graph plots voicing evidence over time. It swings up and down between a **+voiced** threshold line and a **−voiced** threshold line.",
          "The **phoneme activation** graph stays flat at zero for /b/ and /p/ while the feature activity is still below threshold.",
          "Only when +voiced activity finally crosses its threshold does **/b/** activation jump up abruptly at the end."
        ]
      },
      {
        "text": "The circled point in the beach–peach identification graph is the ambiguous stimulus with mixed responses. Under a threshold model, that stimulus either crosses a threshold or does not.",
        "children": [
          "The word level receives a finished /b/ or a finished /p/. The history of uncertainty stays behind at the feature level.",
          "Two acoustically different inputs that both end up as /b/ become identical by the time they reach word recognition.",
          "This all-or-none switch would produce categorical perception directly at the phoneme level."
        ]
      }
    ],
    "speech2-05": [
      {
        "text": "A different answer is a **cascaded model**. In a cascaded model, **activity is passed forward continuously over time from one level to the next**. The next level responds to whatever activity is present at each moment, while the decision is still forming.",
        "children": []
      },
      {
        "text": "In the **feature activation** and **phoneme activation** graphs for this model, both curves swing up and down together.",
        "children": [
          "As +voiced evidence rises, **/b/** activation rises.",
          "As the evidence moves toward −voiced, activation shifts toward **/p/**.",
          "The phoneme level mirrors the feature level continuously."
        ]
      },
      {
        "text": "In this kind of model, **categorical perception might happen later on, or might even be an artifact of the task structure**. An **artifact** is a result produced by the way a measurement is taken rather than by the process being studied.",
        "children": [
          "In an identification task, a listener must click either beach or peach, even if both words were partly active.",
          "The answer is categorical because the response options are categorical.",
          "Two sounds that both end up labeled /b/ can still differ in how much support they gave /p/ along the way."
        ]
      },
      {
        "text": "When the voicing evidence is mixed, both /b/ and /p/ receive some activation in proportion to the evidence for each.",
        "children": [
          "Graded activation at the phoneme level passes graded activation to words, so a sound near the boundary partly activates both beach and peach.",
          "The processing before the final choice still carries fine-grained information about how ambiguous the sound was."
        ]
      }
    ],
    "speech2-06": [
      {
        "text": "**Making furniture** is a metaphor for **thresholded activity**. Each operation takes a specific input and turns it into a specific output.",
        "children": [
          "A **lumber mill** takes **trees** as input and produces **lumber** as output.",
          "A **furniture factory** takes **lumber** as input and produces **unassembled furniture** as output.",
          "An **IKEA customer** takes **unassembled furniture** as input and produces finished **furniture** as output."
        ]
      },
      {
        "text": "Each step depends on receiving a completed product in the form it can use. Trees become lumber before any furniture is made, and lumber becomes furniture parts before any assembly begins.",
        "children": [
          "**Thresholded processing** has the same dependence. A higher level waits until the lower level supplies the required representation.",
          "Information moves forward only as a completed product."
        ]
      }
    ],
    "speech2-07": [
      {
        "text": "In the furniture metaphor, each **“layer”** of the system **can only take a specific input that has been transformed completely by the previous layer**. We have to wait for the shipment of lumber before manufacturing can start. Many computer programs work this way.",
        "children": [
          "Each stage performs its own transformation and passes on only its finished output.",
          "Activity at a lower stage can keep changing while the higher stage sits idle, waiting for a finished product."
        ]
      },
      {
        "text": "In speech recognition, a strict threshold account makes **word processing depend on an identified phoneme**.",
        "children": [
          "A partly resolved acoustic signal stays at the lower level until it is identified as a phoneme.",
          "The word level receives only the completed segment."
        ]
      },
      {
        "text": "This arrangement also determines **what information is lost**.",
        "children": [
          "If different sounds are converted into the same phoneme, their earlier differences never reach word recognition.",
          "This is useful for treating varied sounds alike. The cost is that later stages never see the uncertainty that earlier stages resolved."
        ]
      }
    ],
    "speech2-08": [
      {
        "text": "A **food web** is a metaphor for **cascaded processing**. In a food web, the **“levels” continuously interact with one another**. The desert food web links **desert plants**, **insects**, **kangaroo rats**, **small lizards**, **large lizards**, **scorpions**, **snakes**, **desert foxes** and **hawks** through arrows marking who eats whom.",
        "children": [
          "A drought that reduces the number of plants **immediately** affects the health of kangaroo rats.",
          "The change in kangaroo rats then affects the snakes that eat them, and so on up the web.",
          "No population waits for the level below it to reach a finished state before being affected."
        ]
      },
      {
        "text": "**Cascaded processing** has the same continuous dependence.",
        "children": [
          "Changing feature evidence changes phoneme activity as it happens.",
          "Changing phoneme activity in turn changes support for words. Each level responds to partial information as it arrives."
        ]
      },
      {
        "text": "The food web also contains clear **feedback loops**. Adding more hawks affects the populations of snakes, lizards and rats, and those changes then affect the hawks’ own food supply.",
        "children": [
          "In a recognition model, **feedback** means influence that travels from a higher level back down to a lower level.",
          "Cascading and feedback are different ideas. Cascading passes developing evidence forward, while feedback lets activity at a higher level change an earlier representation."
        ]
      }
    ],
    "speech2-09": [
      {
        "text": "The central question is whether **phoneme identification for word recognition** is more like **thresholded processing**, as in the lumber mill, or **cascaded processing**, as in the food web.",
        "children": [
          "In a **thresholded account**, word recognition begins only after a phoneme decision is finished.",
          "In a **cascaded account**, a word can gain support while the phoneme is still uncertain."
        ]
      },
      {
        "text": "The difference concerns how much of the developing acoustic evidence reaches candidate words.",
        "children": [
          "Two sounds can both end up labeled **/b/** while differing in how much they resemble **/p/**.",
          "A thresholded system reduces both to the same finished /b/, so pear should not compete with bear.",
          "A cascaded system passes along more /p/ support for the more ambiguous sound, so pear should compete with bear for a while."
        ]
      },
      {
        "text": "Both accounts can predict the same final word. They differ in what happens before the final choice, so the test that separates them measures temporary support for a competing word during recognition.",
        "children": []
      }
    ],
    "speech2-10": [
      {
        "text": "**McMurray, Tanenhaus, Aslin and Spivey (2003)** tested this question in a study titled **probabilistic constraint satisfaction at the lexical/phonetic interface**, published in the Journal of Psycholinguistic Research. They looked for **gradient effects of within-category VOT on lexical access**. **Lexical access** is the retrieval of a word from memory during recognition.",
        "children": [
          "**Gradient** means that an effect changes by degrees.",
          "**Within-category VOT** refers to differences in voice onset time between sounds that are all heard as the same phoneme."
        ]
      },
      {
        "text": "The study used identification of a **/b/–/p/ continuum** in a **“visual world” display** for **eye-tracking**. Listeners hear speech while looking at a display of pictures, and a camera records where their eyes move.",
        "children": [
          "Each display contained a **target**, such as **pear**, a **competitor**, such as **bear**, and two **filler** items, a **lamp** and a **ship**.",
          "The target and competitor differ only in their first consonant, and the fillers are unrelated."
        ]
      },
      {
        "text": "Eye movements happen quickly and continuously while a word is being recognized. Listeners look at objects as they think about them, often before they are aware of deciding.",
        "children": [
          "A listener can eventually choose bear after briefly looking at the pear.",
          "The number and timing of such looks measure how strongly the competitor was active before the final click."
        ]
      }
    ],
    "speech2-11": [
      {
        "text": "Participants used the **mouse to select the picture** most consistent with what they heard, such as a **“bear”** or a **“pear,”** in the same way as a bear–pear task done at home.",
        "children": [
          "Each trial presented one sound from the VOT continuum along with the four pictures.",
          "The click records which word the listener finally settled on."
        ]
      },
      {
        "text": "A **typical, step-like identification function** was observed. The graph plots the proportion of /p/ responses against VOT from 0 to 40 milliseconds.",
        "children": [
          "For VOTs from 0 to about 15 milliseconds, /p/ responses stay near 0.",
          "Between about 15 and 20 milliseconds, /p/ responses jump up steeply.",
          "From about 20 milliseconds onward, /p/ responses stay near 1.",
          "The **category boundary** falls at **17.5 milliseconds**, plus or minus 0.83 milliseconds."
        ]
      },
      {
        "text": "The final choices group acoustically different sounds together. Several VOTs on the short side all produce bear, and several on the long side all produce pear.",
        "children": [
          "Taken alone, this sharp curve would seem to support the threshold model.",
          "A mouse click records only the word chosen at the end of recognition. Eye movements record which other words received support before that choice, so a sharp identification function can sit alongside gradual differences in competition."
        ]
      }
    ],
    "speech2-12": [
      {
        "text": "**Eye movements reveal that ambiguity is gradient**. There are **more looks to the competitor close to the boundary**. Gradient ambiguity means that uncertainty varies by degree.",
        "children": [
          "The analysis holds the final response constant. It compares only trials where the listener clicked bear, or only trials where the listener clicked pear.",
          "Every trial in one graph ended with the same click, so differences in competitor looks cannot come from listeners changing their answer."
        ]
      },
      {
        "text": "The left graph covers trials where the **response was bear** and plots the proportion of fixations to the **pear** competitor over time. Separate lines show VOTs of **0, 5, 10 and 15 milliseconds**.",
        "children": [
          "Competitor looks rise after the word begins, peak around 400 to 600 milliseconds, and then decline as bear wins.",
          "The lines for VOTs closer to the boundary, such as 15 milliseconds, sit higher and stay elevated longer than the line for 0 milliseconds."
        ]
      },
      {
        "text": "The right graph covers trials where the **response was pear** and plots fixations to the **bear** competitor. Separate lines show VOTs of **20, 25, 30, 35 and 40 milliseconds**.",
        "children": [
          "The VOTs closest to the boundary, such as 20 milliseconds, produce the most looks to bear.",
          "The clearest pear sounds, at 40 milliseconds, produce the fewest."
        ]
      },
      {
        "text": "A clear gradient effect of VOT appears in both graphs. The effect is mainly on the **duration of activation**, meaning how long the competitor stays active.",
        "children": [
          "Two sounds that are both accepted as bear can still produce different amounts of looking at the pear.",
          "The recognition system keeps track of how ambiguous each sound was, information that a threshold model would throw away."
        ]
      }
    ],
    "speech2-13": [
      {
        "text": "The effect is clearer when the competitor looks are plotted against **VOT** directly. The graph has fixation proportion to the competitor on the vertical axis and VOT from 0 to 40 milliseconds on the horizontal axis, with the **category boundary** marked in the middle.",
        "children": [
          "To the left of the boundary, the response is bear, and the curves track **looks to pear**.",
          "To the right of the boundary, the response is pear, and the curves track **looks to bear**."
        ]
      },
      {
        "text": "Two time windows are plotted separately.",
        "children": [
          "The **early** window, drawn with a dotted line, covers **300–1100 milliseconds** after word onset.",
          "The **late** window, drawn with a solid line, covers **1100–1900 milliseconds** after word onset."
        ]
      },
      {
        "text": "In both windows, competitor looks **increase as VOT approaches the boundary from either side**.",
        "children": [
          "On the bear side, late looks to pear rise from about 0.02 at 0 milliseconds to about 0.045 near 15 milliseconds.",
          "On the pear side, late looks to bear are highest near 20 milliseconds, around 0.04, and fall to about 0.01 by 40 milliseconds.",
          "Early looks are higher overall, but they follow the same pattern of peaking near the boundary. The rise is gradual on both sides."
        ]
      },
      {
        "text": "Because the effect appears in both windows, uncertainty about the first sound influences looking throughout recognition. A sound can support the eventual winner while still supporting its rival, and the closer the sound is to the boundary, the stronger that rival support is.",
        "children": []
      }
    ],
    "speech2-14": [
      {
        "text": "This finding fits the idea that **activation flows in a cascaded way from features to phonemes**. Changing acoustic features affect phonemes, and changing phoneme activity affects words, all while recognition is still going on.",
        "children": [
          "**Even stimuli identified as /b/ 100% of the time can vary in how strongly and unambiguously the “voiced” feature is activated**.",
          "A clear /b/ strongly activates voicing, while a /b/ near the boundary activates voicing only weakly."
        ]
      },
      {
        "text": "**/b/ and /p/** share most of their features. Both are **bilabial**, which means the two lips form the closure, and both are **stops**, which means the airflow is completely blocked and then released.",
        "children": [
          "If a stimulus is obviously **+bilabial** and **+stop**, those features support /b/ and /p/ equally.",
          "Only voicing separates them, so weak voicing evidence creates **momentary ambiguity between /b/ and /p/**.",
          "That ambiguity appears in the **eye movements** while the participant decides where to click."
        ]
      },
      {
        "text": "The **TRACE** model represents this kind of cascade with three layers.",
        "children": [
          "The **feature layer** receives a **pseudo-spectral input representation**, a simplified stand-in for the sound’s frequency content over time. Its detectors are POW, VOC, DIFF, ACU, GRD, VOI and BUR, which stand for power, vocalic, diffuseness, acuteness, gradualness of onset, voicing and burst.",
          "The **phoneme layer** has units for phonemes such as /b/, /p/, /r/ and /t/, copied at every possible position in time.",
          "The **word layer** has units for words, also copied across time positions.",
          "Arrows pass activity upward from features to phonemes and from phonemes to words. Within each layer, units compete with each other through inhibition."
        ]
      }
    ],
    "speech2-15": [
      {
        "text": "There is evidence that **partial activation can reach all the way to the lexical level**, the level of stored words and their meanings. **Andruski and colleagues (1994)** found that **semantic priming** can occur even with **nonwords**. Semantic priming is the speed-up in responding to a word after hearing a word related in meaning.",
        "children": [
          "**“Beace”** primes **“war.”** Beace is peace with a voiced first consonant, and peace is related in meaning to war.",
          "**“Ging”** primes **“queen,”** because ging is king with a voiced first consonant.",
          "In the **word-to-word** items, altering the voicing of the first consonant of one real word produces another real word, as in **“pet”** becoming **“bet.”** One such item is **“bill”** priming **“drug,”** because bill is an altered form of pill."
        ]
      },
      {
        "text": "Priming was measured with a lexical decision task, in which participants decide as quickly as possible whether a target is a real word. Primes were **unaltered**, altered by reducing VOT by **one third**, altered by **two thirds**, or **unrelated** to the target.",
        "children": [
          "Black bars give mean reaction times for word-to-word items, and shaded bars give them for word-to-nonword items.",
          "Faster responses than in the unrelated condition indicate priming."
        ]
      },
      {
        "text": "Mean reaction times in milliseconds reveal the priming.",
        "children": [
          "Unrelated primes produce the slowest responses, near 950 to 970 milliseconds.",
          "Unaltered primes produce much faster responses, around 810 to 860 milliseconds.",
          "With one third of the VOT removed, responses stay fast, around 825 to 855 milliseconds.",
          "With two thirds removed, word-to-nonword items still stay near 820 milliseconds, while word-to-word items slow to about 890 milliseconds."
        ]
      },
      {
        "text": "**Lexical representations can be activated even by incomplete or imperfect input**. Beace never becomes a real word, but it matches peace closely enough to partly activate it, and that activation spreads to meaning and speeds recognition of war. This fits cascaded processing.",
        "children": []
      }
    ],
    "speech2-16": [
      {
        "text": "The bear–pear eye-tracking result is one piece of evidence for **cascaded processing** in speech perception. It would be hard to explain why **the number of looks to the other member of the minimal pair increases gradually as you approach the category boundary** in a thresholded model. A **minimal pair** is two words that differ by only one sound, such as bear and pear.",
        "children": [
          "The competitor looks rise steadily as VOT approaches the boundary.",
          "The effect holds even when the final response is the same, so it comes from graded activation within one category."
        ]
      },
      {
        "text": "In the threshold diagram, the arrow from **feature activation** to **phoneme activation** is crossed out with a red X.",
        "children": [
          "The feature activation keeps swinging between +voiced and −voiced.",
          "The phoneme activation stays flat until /b/ suddenly jumps at the end.",
          "No graded information passes to the phoneme level before the threshold is crossed."
        ]
      },
      {
        "text": "In a threshold-only account, every token assigned to a category sends the **same finished phoneme** to the word level.",
        "children": [
          "Word-level competition should then be the same for every token of /b/, with no varying input to produce gradually changing competitor looks.",
          "A cascaded account explains the effect directly. More support for the competing phoneme passes along more support for its word."
        ]
      }
    ],
    "speech2-17": [
      {
        "text": "The **TRACE** model also incorporates **feedback from the lexical layer to the phoneme layer**. In the TRACE diagram, arrows run up from the phoneme layer to the word layer and back down from the word layer to the phoneme layer.",
        "children": [
          "**Lexical feedback** means that an activated word sends support back to its own phonemes.",
          "An uncertain sound can partly activate a word, and that word can then strengthen the interpretation of the sound that fits it."
        ]
      },
      {
        "text": "Influence can therefore run in both directions.",
        "children": [
          "Acoustic evidence changes which words are active.",
          "Active words change the balance between possible phonemes while the phoneme decision is still forming.",
          "This helps listeners recover from noisy or ambiguous input."
        ]
      },
      {
        "text": "**Feedback is different from cascading**.",
        "children": [
          "Cascading passes incomplete evidence forward from features to phonemes and from phonemes to words.",
          "Feedback sends influence from words back down to phonemes.",
          "An interactive model can include both. Findings in which knowledge of words changes how sounds are heard, such as the Ganong effect, are what motivate adding feedback."
        ]
      }
    ],
    "speech2-18": [
      {
        "text": "**The Ganong effect** is named after **Ganong (1980)**, who looked at how **phoneme identification is affected by word knowledge**. The heading “Gisses and kifts for Valentine’s day” plays on the effect by swapping the voicing of the first consonants in “kisses and gifts.”",
        "children": [
          "The question is whether knowing which sound sequences form real words changes how an ambiguous sound is heard."
        ]
      },
      {
        "text": "Ganong created **word/nonword pairs** such as **“corpse/gorpse.”** One end of the continuum is a real word and the other end is a nonword.",
        "children": [
          "In corpse, the /k/ interpretation produces a familiar word.",
          "In gorpse, the /g/ interpretation produces something that is not a word.",
          "He built continua spanning the relevant phoneme boundary in **5-millisecond steps** of VOT."
        ]
      },
      {
        "text": "The design combines **uncertain phonetic evidence** with a **difference in lexical status**.",
        "children": [
          "The rest of the word, “-orpse,” is the same at every step and tells the listener which beginning would complete a real word.",
          "If lexical knowledge affects identification, an ambiguous first consonant should more often be heard as the sound that makes a real word.",
          "The important test is in the ambiguous middle of the continuum, where word knowledge has the most room to act."
        ]
      }
    ],
    "speech2-19": [
      {
        "text": "One possibility is a **late “correction” process**. Under this account, **categorical perception works as usual, but there is a bias to report having heard a word**.",
        "children": [
          "The listener first categorizes the sound with no help from word knowledge.",
          "At the response stage, the listener leans toward saying the option that forms a real word."
        ]
      },
      {
        "text": "This account predicts a **general reporting bias**. The prediction graphs plot the **proportion of voiced responses** across the continuum from short VOT to long VOT, with the boundary in the middle at −7.5, −2.5, +2.5 and +7.5 milliseconds.",
        "children": [
          "Three conditions are compared. In **word–nonword**, the voiced end forms a word. In **neutral**, neither end has a lexical advantage. In **nonword–word**, the voiceless end forms a word.",
          "The word–nonword curve is shifted up by a constant amount everywhere, including the long VOT end, where it stays near 0.25 instead of falling to 0.",
          "The nonword–word curve is shifted down at the short VOT end, starting near 0.75 instead of 1."
        ]
      },
      {
        "text": "The top graph plots the **lexical effect**, which is the difference between the two lexical conditions at each step. Under this account, it is a flat line near **0.25** across the whole continuum.",
        "children": [
          "A reporting bias added after categorization favors the word equally at every point, with the same size at clear and ambiguous steps.",
          "Perception and knowledge stay separate, and word knowledge only nudges the reported response."
        ]
      }
    ],
    "speech2-20": [
      {
        "text": "A second possibility is that **word knowledge shifts the categorical boundary**. Under this account, word knowledge changes where the listener switches from one phoneme category to the other.",
        "children": [
          "Near an ambiguous onset, the interpretation that forms a real word gets extra support.",
          "The effect changes categorization itself."
        ]
      },
      {
        "text": "In the prediction graphs, the word–nonword, neutral and nonword–word curves all start near 1 at short VOT and end near 0 at long VOT.",
        "children": [
          "The curves separate only in the middle, near the boundary.",
          "The word–nonword curve crosses the boundary later, and the nonword–word curve crosses earlier."
        ]
      },
      {
        "text": "The **lexical effect** graph forms a peak. It is near 0 at the endpoints, rises to about **0.35** for the items closest to the boundary, and falls again.",
        "children": [
          "The lexical effect is **strongest for items closest to the category boundary**, because those are the stimuli for which lexical information can help resolve ambiguity about the first phoneme.",
          "At the endpoints, strong acoustic evidence already settles the consonant, leaving little room for word knowledge to help."
        ]
      },
      {
        "text": "The word ending provides the same lexical advantage at every step, but the onset is not equally uncertain at every step. Where the effect occurs therefore matters. A flat effect points to a reporting bias, while a peaked effect points to a shift in the boundary itself.",
        "children": []
      }
    ],
    "speech2-21": [
      {
        "text": "**Ganong’s results** are strikingly consistent with the **second model**, the boundary-shift account.",
        "children": [
          "The proportion of voiced responses for **word–nonword** and **nonword–word** conditions starts near 1 at short VOT and falls toward 0 at long VOT.",
          "The two curves separate most in the middle, near the boundary.",
          "The **lexical effect** graph rises from about 0.1 at the endpoints to a peak near **0.3** at the boundary and then falls back."
        ]
      },
      {
        "text": "The peaked effect rules out a simple reporting bias. Word knowledge matters most where the acoustic evidence is weakest.",
        "children": [
          "At the boundary, the word that fits the context tips the balance.",
          "At the endpoints, the acoustic evidence decides the answer on its own."
        ]
      },
      {
        "text": "Ganong raised a number of possibilities for how this could happen, focusing on different kinds of **guessing strategies**.",
        "children": [
          "A guessing strategy would let listeners use word knowledge only when they were unsure about the sound."
        ]
      },
      {
        "text": "Other models emphasize the potential role of **feedback** in these shifts.",
        "children": [
          "In **interactive models**, an activated word sends support back to its own phonemes.",
          "The whole-word representation can therefore affect how an ambiguous part of the word is interpreted during recognition."
        ]
      }
    ],
    "speech2-22": [
      {
        "text": "A **simulation of the Ganong effect in the TRACE model** tracks **phoneme-level and word-level activations** at several points as a segment unfolds. The input begins with a sound **ambiguous between /b/ and /p/**, followed by **/l/**, the vowel **/ʌ/**, and **/g/**, which together make the word **plug**.",
        "children": [
          "The figure has four time frames from left to right. Each frame has word activations in the upper panel and phoneme activations in the lower panel."
        ]
      },
      {
        "text": "In the **first frame**, only the ambiguous first sound has arrived.",
        "children": [
          "**/b/** and **/p/** are both weakly active at about the same level, near 0.15 to 0.2.",
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
          "**Plug** rises to the top of the word panel, at about 0.45, while the alternatives fall away.",
          "/p/ ends up more active than /b/ at the phoneme level."
        ]
      }
    ],
    "speech2-23": [
      {
        "text": "As the input unfolds, **activity accumulates for “plug,”** especially when the **final /g/** arrives. The /g/ is highly inconsistent with **“blood”** and **“blush,”** which were also activated in the third frame.",
        "children": [
          "Blood and blush fit the early part of the input, so they were plausible candidates for a while.",
          "Once /g/ arrives, they lose support because their endings do not match."
        ]
      },
      {
        "text": "TRACE therefore explains **word effects on phoneme category boundaries** in terms of **top-down processing**. Top-down processing means that higher-level knowledge influences lower-level analysis.",
        "children": [
          "**Activity at the lexical level produces feedback to the phoneme level**.",
          "The feedback gives **greater activation to the phoneme consistent with a word**. Because plug is the winning word, /p/ receives extra support."
        ]
      },
      {
        "text": "The ambiguous beginning becomes less ambiguous because /p/ belongs to the word supported by the full sequence.",
        "children": [
          "Information that arrives at the end of a word can reach back and shape how an earlier sound is heard.",
          "The effect happens through interactions during recognition, so the ambiguous first sound comes to be heard as /p/."
        ]
      }
    ],
    "speech2-24": [
      {
        "text": "The **TRACE** model is a version of the **Interactive Activation model** for **written word recognition**, from McClelland and Rumelhart (1981). Many of the principles are the same in both models.",
        "children": [
          "In the Interactive Activation network, **feature** units at the bottom connect to **letter** units, and letter units connect to **word** units such as **WEAR, WORK, WORD** and **WEAK**.",
          "Compatible units at different levels support each other, and competing units at the same level inhibit each other.",
          "Activated words send support back down to their own letters."
        ]
      },
      {
        "text": "A hypothetical set of features extracted on a trial of a word perception experiment gives the letters **W, O** and **R** clearly, while ink blots cover part of the last letter.",
        "children": [
          "The visible features of the last letter are consistent with both **R** and **K**.",
          "W, O and R activate words such as WORK and WORD. Only WORK fits the visible features of the last letter, so WORK becomes the strongest word.",
          "WORK sends support back to **K**, so the ambiguous letter is perceived as K. This parallels plug supporting /p/ in speech."
        ]
      },
      {
        "text": "A key issue in speech perception is that **the stimuli unfold over time**.",
        "children": [
          "A written word is all on the page at once, but a spoken word arrives one sound after another.",
          "TRACE handles this by copying feature, phoneme and word units at every possible position in time. A candidate can fit the beginning, gain activation, and then weaken when the ending conflicts."
        ]
      }
    ],
    "speech2-25": [
      {
        "text": "**Categorical perception** shapes perception through **category boundaries**. **Given the same physical difference, it is harder to distinguish stimuli from the same category than from different categories**. Equal acoustic steps have different perceptual effects depending on whether they cross a boundary.",
        "children": []
      },
      {
        "text": "However, **ambiguity about phoneme identity does have an impact on word recognition**.",
        "children": [
          "Sounds assigned the same label still differ in how strongly they activate a competing word.",
          "The word level keeps information about how uncertain each token was, so labels can be categorical even when the processing behind them is graded."
        ]
      },
      {
        "text": "In addition, **word-level information seems to have an impact on phoneme categorization**.",
        "children": [
          "In the Ganong effect, word knowledge shifts the category boundary.",
          "In TRACE, this happens through lexical feedback to the phoneme level."
        ]
      },
      {
        "text": "It therefore **cannot be the case that the word recognition system just sits there waiting for the phoneme recognition system to finish its job**, the way a furniture factory waits for a lumber mill.",
        "children": [
          "**Spoken word recognition is more interactive** than this, more like the food web.",
          "Partial information passes forward, and activated words send support back down, while uncertainty is still being resolved."
        ]
      }
    ],
    "speech2-26": [],
    "speech2-27": [
      {
        "text": "**Spoken word recognition is also very fast**. **Allopenna and colleagues (1994)** used a visual world eye-tracking task to track how quickly candidate words become active.",
        "children": [
          "Participants saw a grid of pictures and geometric shapes and followed spoken instructions to move objects.",
          "The display included a **beaker**, the **referent** or target, a **beetle**, a **speaker** and a **carriage**."
        ]
      },
      {
        "text": "The pictures were chosen for their sound overlap with the target word **beaker**.",
        "children": [
          "**Beetle** is a **cohort competitor** because it shares the beginning of the word.",
          "**Speaker** is a **rhyme competitor** because it shares the ending of the word.",
          "**Carriage** is **unrelated** and shares no sounds with beaker."
        ]
      },
      {
        "text": "The graph plots the **probability of fixating each item type** over the first 1,000 milliseconds after the target word begins. The average target offset, the moment the spoken word ends, falls a little before 400 milliseconds.",
        "children": [
          "Looks to both **beaker** and **beetle** rise together early, starting around 200 milliseconds, because both fit the beginning.",
          "Looks to beetle peak near 0.2 around 500 milliseconds and then fall once the distinguishing sounds arrive.",
          "Looks to beaker keep climbing, passing 0.8 by about 800 milliseconds and approaching 1 by 1,000 milliseconds.",
          "Looks to **speaker** rise later and stay smaller, peaking near 0.1. Looks to **carriage** stay near zero."
        ]
      },
      {
        "text": "Fixations on the target start rising before the word has even finished. Recognition begins while the word is still unfolding, and competitors that match the input at a given moment become active and then drop out when they stop matching.",
        "children": []
      }
    ],
    "speech2-28": [
      {
        "text": "The eye-tracking data can be compared with a **TRACE simulation** of the same task. Two graphs plot the **fixation probability** or the **predicted fixation probability** from TRACE over 1,000 milliseconds after target onset.",
        "children": [
          "The left graph compares referent and **cohort** curves from TRACE and from real fixations.",
          "The right graph compares referent and **rhyme** curves from TRACE and from real fixations."
        ]
      },
      {
        "text": "The TRACE predictions closely match the eye-movement data.",
        "children": [
          "The **referent** curves from TRACE and from fixations both rise steadily from about 300 milliseconds and approach 1 by 1,000 milliseconds.",
          "The **cohort** curves rise early and peak near 0.17 to 0.2 around 500 milliseconds, then fall, in both the model and the data.",
          "The **rhyme** curves rise later and stay small, peaking near 0.1, in both the model and the data."
        ]
      },
      {
        "text": "The **granularity** of the simulation is fine-grained, meaning it predicts activity moment by moment.",
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
        "text": "**“The horse raced past the barn fell”** is a grammatical English sentence, even though it usually feels broken on first reading. The difficulty comes from how the beginning of the sentence leads the reader to build the wrong structure.",
        "children": [
          "Most readers first take **raced** as the main verb, so “the horse raced past the barn” seems to describe a complete event in which the horse did the racing.",
          "When **fell** arrives, there is no place left for it in that structure, and the sentence seems to fall apart."
        ]
      },
      {
        "text": "The sentence describes **two events**. Someone raced the horse past the barn, and the horse then fell.",
        "children": [
          "The intended meaning is **“The horse that was raced past the barn fell.”**",
          "In that reading, “raced past the barn” describes which horse is being talked about, and **fell** is the main verb that says what happened to it."
        ]
      },
      {
        "text": "The sentence can be **disambiguated** by putting back the missing words, as in “the horse that was raced past the barn fell.”",
        "children": [
          "Adding “that was” makes the modifying relationship explicit, so raced can no longer be taken as the main verb.",
          "Comprehension depends on assigning relationships among words as well as recognizing their meanings."
        ]
      },
      {
        "text": "This sentence could fairly be called **the sentence that launched a thousand experiments**. It has been used again and again to study how readers build sentence structure as words arrive.",
        "children": []
      }
    ],
    "sentence-03": [
      {
        "text": "**“The horse raced past the barn fell”** is almost as famous as **“Colorless green ideas sleep furiously.”** Both are well-known example sentences in the study of language.",
        "children": [
          "“Colorless green ideas sleep furiously” is grammatical but meaningless.",
          "“The horse raced past the barn fell” is grammatical and meaningful, but very hard to process."
        ]
      },
      {
        "text": "It is the classic example of the **“garden path” effect**. A **garden path sentence** leads the reader into one interpretation early on, and later words reveal that this interpretation was wrong.",
        "children": [
          "The phrase comes from the expression “to lead someone down the garden path,” meaning to mislead them.",
          "Here, raced looks like the main verb, and fell then conflicts with the structure already built. The reader has to go back and reinterpret “raced past the barn” as “that was raced past the barn.”",
          "Garden paths happen because readers build structure word by word, choosing one analysis before the sentence is complete."
        ]
      },
      {
        "text": "A dinosaur comic strip pokes fun at this sentence. One dinosaur explains garden path sentences and offers the horse example. A second dinosaur insists nobody would ever say such a thing, and the first replies that farmers could say it if horses were constantly falling over, adding that farmers call them nature’s dominoes.",
        "children": [
          "The joke rests on the sentence being grammatical even though it sounds wrong."
        ]
      },
      {
        "text": "**Grammaticality and processing difficulty are different things**.",
        "children": [
          "A sentence can have a perfectly acceptable structure and still be very hard to understand as it unfolds.",
          "The garden path concerns which analysis is chosen first and how hard it is to replace."
        ]
      }
    ],
    "sentence-04": [
      {
        "text": "**Syntactic explanations** of the garden path effect start with the idea of a **parser**. A parser is a mental process whose job is to build a **syntactic tree** for the sentences we hear or read. A syntactic tree represents how words group into phrases and how those phrases relate to one another.",
        "children": [
          "The tree for the correct reading has **S**, for sentence, at the top, splitting into a large **NP**, or noun phrase, and a **VP**, or verb phrase.",
          "The large NP contains **D** for determiner, “the,” and **N** for noun, “horse,” plus a reduced clause, marked **S′**, holding “that was raced past the barn.” The words “that” and “was” are silent in the actual sentence, and an empty position marked **e** stands where the missing subject would be.",
          "Inside that clause, raced is a verb with a **prepositional phrase**, or **PP**, “past the barn,” and the main **VP** at the far right contains only **fell**."
        ]
      },
      {
        "text": "The **failed parse** is drawn below the words.",
        "children": [
          "In that tree, “the horse” forms an ordinary NP, and “raced past the barn” forms the VP, with raced as the main verb.",
          "**Fell** is left dangling with nowhere to attach, and the failed tree ends with the exclamation **“¡ACK!”**",
          "The trees and the dinosaur comic both come from a Language Log piece on this sentence."
        ]
      },
      {
        "text": "Any parser has to cope with the fact that it runs inside a cognitive system with **limited memory** and **time constraints**.",
        "children": [
          "Words arrive quickly, and the parser cannot wait until the end of the sentence to start building structure.",
          "It can also keep track of only a limited number of structures at once."
        ]
      }
    ],
    "sentence-05": [
      {
        "text": "The **grammatical version** of the horse sentence is **much more complex syntactically** than the failed parse. Specifically, it has **many more nodes**. A **node** is a point in a syntactic tree that represents a grammatical grouping, such as an NP, a VP or an S.",
        "children": [
          "The correct tree needs extra nodes for the embedded clause, S′ and S, plus nodes for the silent “that” and “was.”",
          "The failed parse simply attaches “raced past the barn” as the main VP, which takes far fewer nodes."
        ]
      },
      {
        "text": "One strategy that saves space is to **initially prefer smaller trees**. This strategy is called **“minimal attachment.”**",
        "children": [
          "Under minimal attachment, the parser attaches each new word into the existing structure using the fewest possible new nodes.",
          "Building fewer nodes means less structure to construct and hold in memory at that moment."
        ]
      },
      {
        "text": "In the horse sentence, minimal attachment favors treating **raced as the main verb**, because that analysis needs the fewest nodes.",
        "children": [
          "The alternative, where raced past the barn modifies horse, needs an embedded relative clause, so the parser does not choose it first.",
          "Choosing the smaller structure reduces the immediate processing load, but it creates a garden path. When fell arrives, it requires the larger structure that was not chosen, and the reader has to rebuild the tree."
        ]
      }
    ],
    "sentence-06": [
      {
        "text": "Another parsing strategy in this framework is **“late closure.”** Late closure is a bias to **keep the current clause “open” as long as possible**, so that new words get attached to the phrase currently being built.",
        "children": [
          "Keeping a clause open means the parser keeps adding incoming material to it rather than closing it off and starting a new structure."
        ]
      },
      {
        "text": "In **“The burglar blew open the safe with the dynamite,”** the phrase **“with the dynamite”** wants to associate with the big **verb phrase** starting with **“blew open.”** Frazier (1987) gives two trees for this sentence.",
        "children": [
          "In the **preferred** tree, the PP “with the dynamite” attaches to the **VP**. This is **verb-phrase attachment**, and it means the dynamite is the **instrument** the burglar used to blow open the safe.",
          "In the **unpreferred** tree, the PP attaches to the **NP** “the safe.” This is **noun-phrase attachment**, and it means the phrase describes which safe was blown open, namely the safe that had the dynamite."
        ]
      },
      {
        "text": "Both attachments are grammatical, but they express different relationships.",
        "children": [
          "Late closure keeps the verb phrase open, so the incoming phrase joins it.",
          "The preferred VP attachment is also the minimal attachment here, because it needs fewer nodes than building an extra NP around “the safe with the dynamite.”",
          "For this sentence, the preferred parse is also the sensible one, so readers reach the right meaning without difficulty."
        ]
      }
    ],
    "sentence-07": [
      {
        "text": "Late closure can be seen at work in a sentence that **requires the “unpreferred” parse to be sensible**, such as **“The burglar blew open the safe with the jewels.”**",
        "children": [
          "Jewels are an implausible tool for blowing open a safe.",
          "The sensible meaning is that the burglar blew open **the safe that contained the jewels**. That meaning requires attaching “with the jewels” to the noun phrase “the safe,” which is the unpreferred NP attachment."
        ]
      },
      {
        "text": "In **careful tests of reading time and eye movements**, people are **slower to read sentences where the sensible reading requires the unpreferred parse**.",
        "children": [
          "Reading time measures how long readers spend on each part of a sentence.",
          "Eye movement recordings track where readers look and when they jump back to reread earlier words.",
          "The extra time appears at the point where the parse has to change."
        ]
      },
      {
        "text": "Readers **momentarily entertain the idea that the jewels were used to blow open the safe**, and then have to **retrace their steps**.",
        "children": [
          "The parser first attaches the phrase to the verb phrase, following its usual preference.",
          "The meaning of jewels conflicts with the instrument reading, so the parser revises the attachment to the noun phrase.",
          "The final meaning is easy to understand, but the route to it carries a measurable processing cost."
        ]
      }
    ],
    "sentence-08": [
      {
        "text": "This syntactic explanation rests on the idea of a **parser that deals exclusively with the abstract syntactic structure** of the sentence. This parallels the **“lumber mill”** model of thresholded processing in speech perception.",
        "children": [
          "In the lumber mill picture, each stage works on its own kind of input and hands a finished product to the next stage.",
          "Here, the parser builds a syntactic structure using only grammatical categories, without consulting meaning or context. Meaning is worked out afterward from the finished structure."
        ]
      },
      {
        "text": "The parser has **its own operating characteristics**.",
        "children": [
          "It wants to make **the simplest tree possible**, which is **minimal attachment**.",
          "It accomplishes this partly by **leaving clauses open as long as possible**, which is **late closure**.",
          "These preferences limit how much structure must be built and held in memory at once."
        ]
      },
      {
        "text": "This is one way of dealing with ambiguity **very efficiently**. The strategy is to **ignore ambiguity until it becomes a problem**.",
        "children": [
          "The parser commits to one likely structure and builds only that one. Most of the time the first choice works, and no extra effort is needed.",
          "When a later word does not fit, the structure has to be revised. That revision is the source of garden path difficulty, and it is the price of an efficient strategy."
        ]
      }
    ],
    "sentence-09": [
      {
        "text": "There are **problems with a purely syntactic explanation**. One is that **syntactically “difficult” sentences are not always difficult to parse**.",
        "children": [
          "A table of examples gives sentences containing **reduced relative clauses**, with the verb that introduces each reduced relative written in capital letters.",
          "A **reduced relative clause** is a relative clause with “that was” or “that were” left out, as in “the horse raced past the barn fell.”"
        ]
      },
      {
        "text": "The examples come from published research articles.",
        "children": [
          "“Thus, a noun phrase **FOLLOWED** by a **MORPHOLOGICALLY AMBIGUOUS VERB** … will be temporarily ambiguous,” from Trueswell, Tanenhaus and Garnsey (1994).",
          "“Referential information **PROVIDED** by the discourse is of no help,” from Britt, Perfetti, Garrod and Rayner (1992).",
          "“Recent research **REPORTED** by **FERREIRA AND CLIFTON** (1986) has demonstrated that syntactic processing is quite independent and that the initial syntactic analysis **ASSIGNED** to a sentence is little influenced by the semantic information **ALREADY ANALYZED**,” from Frazier and Rayner (1987).",
          "“The pattern of results **OBTAINED** with global reading times is reflected by differences **LOCATED** on the critical disambiguating phrase,” from Altmann and Steedman (1988)."
        ]
      },
      {
        "text": "Each capitalized verb begins a reduced relative with exactly the structure of the horse sentence. **But these are not impossibly difficult sentences**. Readers understand them easily, with no feeling of being led down a garden path.",
        "children": [
          "In “recent research reported by Ferreira and Clifton,” reported describes research that someone reported."
        ]
      },
      {
        "text": "The alternative argument, from **MacDonald, Perlmutter and Seidenberg (1994)**, is that **semantic factors and statistical regularities interact with parsing from very early on**.",
        "children": [
          "Semantic factors concern meaning, and statistical regularities are patterns of how often words appear in particular structures.",
          "Particular words and their familiar uses can support a reduced relative reading from the start."
        ]
      }
    ],
    "sentence-10": [
      {
        "text": "The table of reduced relatives is a **wonderfully passive-aggressive** table. **Many of its examples are drawn from papers that use the difficulty of parsing reduced relatives as evidence for an autonomous parser**. An **autonomous parser** builds syntactic structure without help from meaning or context.",
        "children": [
          "The authors of those papers argued that reduced relatives are hard to process.",
          "Yet they wrote reduced relatives in their own articles, and readers understood them easily."
        ]
      },
      {
        "text": "More examples from the table make the same point.",
        "children": [
          "In “a noun phrase **FOLLOWED** by a morphologically ambiguous verb,” followed modifies noun phrase.",
          "In “the initial syntactic analysis **ASSIGNED** to a sentence,” assigned modifies analysis.",
          "In “differences **LOCATED** on the critical disambiguating phrase,” located modifies differences.",
          "“A person **PRESENTED** with the evidence **EXAMINED** by the lawyer may interpret the evidence as a theme, not an agent, because examined requires an animate agent,” from Ferreira and Clifton (1986). Here presented modifies person, and examined modifies evidence."
        ]
      },
      {
        "text": "A note on the table states that the examples cited were **not the only reduced relatives** in those articles.",
        "children": [
          "The rate of reduced relative use was about **one per journal page** in this sample of articles.",
          "Reduced relatives are therefore common in ordinary scientific writing, and in a supportive context a formally complex structure is easy to understand."
        ]
      }
    ],
    "sentence-11": [
      {
        "text": "The argument is that, when we read **“Recent research reported by…,”** several factors besides syntax come into play.",
        "children": [
          "**Semantics**. Research is an **inanimate** object, meaning it is not a living thing. It is unlikely to be the **subject** of a verb like **report**, because research cannot report anything. Taking research as something that was reported fits the meanings of the words.",
          "**Lexical statistics**. **“Reported” occurs frequently in reduced relatives**. Lexical statistics are learned patterns of how often particular words appear in particular structures.",
          "**Lexical statistics and “world knowledge.”** “Reported” occurs very frequently in reduced relatives **in scientific papers, especially when following the word “research.”** World knowledge here means knowledge of how people actually write in this setting."
        ]
      },
      {
        "text": "These and **many other factors interact with the syntax of the sentence very early on**. They act from the first moments of reading and help decide which structure is chosen in the first place.",
        "children": []
      },
      {
        "text": "A pair of sentences makes the role of meaning clear.",
        "children": [
          "**“The burglar arrested in the parking lot was charged today.”** Burglars are likely to be arrested, so it is easy to take arrested as part of a reduced relative describing the burglar.",
          "**“The policeman arrested in the parking lot was charged today.”** Policemen are likely to be the ones doing the arresting, so arrested is first taken as the main verb, and “was charged” causes a garden path.",
          "The grammar of the two sentences is identical. The difference in difficulty comes from what we know about burglars and policemen."
        ]
      }
    ],
    "sentence-12": [
      {
        "text": "**“World knowledge” can be very local**. It can come from the immediate visual situation as well as from general knowledge. **Spivey and colleagues (1995)** tested this in a visual world task.",
        "children": [
          "Participants saw real objects, namely **a pencil, a box, an empty towel, and an apple sitting on a towel**.",
          "They heard the instruction **“Put the apple on the towel in the box”** and carried it out while their eye movements were recorded."
        ]
      },
      {
        "text": "With **minimal attachment**, “the towel” would temporarily seem like the end of the clause **“put the apple on the towel.”**",
        "children": [
          "On that reading, “on the towel” names the **destination**, the place the apple should go.",
          "In the intended reading, “on the towel” describes **which apple** to move, the one already on a towel, and **“in the box”** is the destination."
        ]
      },
      {
        "text": "People **do seem to look at the empty towel while planning their movements**, as though they are considering it as a target, before planning a movement to the box.",
        "children": [
          "The diagram of a typical sequence of eye movements in the **one-referent context**, with one apple, marks each look with a letter. **A** is a look to the apple, **B** is a look to the empty towel, the incorrect destination, and **C** is a look to the box.",
          "For the **ambiguous** instruction, the timeline puts A near 1,000 milliseconds, B shortly after, and C near 2,000 milliseconds.",
          "For the **unambiguous** instruction, **“Put the apple that’s on the towel in the box,”** the looks go from the apple, marked **A′**, straight to the box, marked **B′**, with no look to the empty towel."
        ]
      },
      {
        "text": "The listener recognizes every word correctly. The error comes from treating the location phrase as the destination, which briefly changes the planned action.",
        "children": []
      }
    ],
    "sentence-13": [
      {
        "text": "A **two-referent context** changes the display so that it contains **two apples**. One apple sits on a towel, and the other sits elsewhere in the display. The empty towel and the box are still present.",
        "children": [
          "Now “the apple” alone does not say which apple to move.",
          "The phrase **“on the towel”** becomes useful, because it picks out one apple from the two."
        ]
      },
      {
        "text": "The diagram gives the typical sequence of eye movements in the two-referent context.",
        "children": [
          "Participants look first at the apple on the towel, marked **A**, and then at the box, marked **C**.",
          "Looks to the empty towel, marked **B**, are much less common.",
          "The note under the figure states that **the sequence and the timing of eye movements**, measured relative to the nouns in the speech stream, **did not differ** for the ambiguous and the unambiguous instructions."
        ]
      },
      {
        "text": "In this setting, the ambiguous instruction is processed just like the explicit instruction with “that’s on the towel.”",
        "children": [
          "With two apples present, the listener needs to know which apple, so a phrase that picks one out is expected.",
          "Listeners treat “on the towel” as a description of the apple from the start, and the destination reading never takes hold. The same sentence gets a different grammatical interpretation because the visual context is different."
        ]
      }
    ],
    "sentence-14": [
      {
        "text": "With **two apples in the display**, it suddenly becomes **felicitous** to provide more information about **which apple** the speaker means. **Felicitous** means appropriate and natural in the situation.",
        "children": [
          "With only one apple, there is no need to say which apple, so “on the towel” seems like extra information and is easily taken as a destination.",
          "With two apples, “on the towel” has a clear job, which is to identify the right apple."
        ]
      },
      {
        "text": "So **people do not look at the empty towel as much**. The bar graph plots the **proportion of trials with eye movements to the incorrect destination**, the empty towel, for ambiguous and unambiguous instructions in each context.",
        "children": [
          "In the **one-referent context**, ambiguous instructions led to looks at the incorrect destination on about **55%** of trials. Unambiguous instructions led to almost none.",
          "In the **two-referent context**, ambiguous instructions led to such looks on only about **17%** of trials, close to the roughly **12%** for unambiguous instructions."
        ]
      },
      {
        "text": "The words of the instruction were identical in both contexts, so the visual context alone changed how often listeners were misled.",
        "children": [
          "This is an effect of **referential context**, meaning the set of objects that a phrase could refer to.",
          "Referential context influences which grammatical relationship listeners assign while the sentence is still being heard."
        ]
      }
    ],
    "sentence-15": [
      {
        "text": "The Spivey results are **a big problem for purely syntactic accounts**. **Different parses of the same sentence are favored under different semantic and pragmatic conditions, and this effect happens very early**.",
        "children": [
          "**Semantic** conditions concern meaning.",
          "**Pragmatic** conditions concern how language is used in a particular situation, such as whether a speaker needs to specify which object they mean."
        ]
      },
      {
        "text": "In the bar graph of looks to the incorrect destination, the same ambiguous sentence produces looks to the empty towel on about 55% of trials with one apple, but only about 17% with two apples.",
        "children": [
          "The words are identical in both conditions.",
          "Only the visual situation changes, and it changes the parse the listener first adopts."
        ]
      },
      {
        "text": "The difference shows up in **eye movements during the sentence**, before the action is carried out. Eye movements capture the parse as it is being built.",
        "children": [
          "If context only corrected the parse afterward, listeners in both contexts should first look at the empty towel.",
          "The reduction in those looks with two apples means context shaped the first parse. A parser that always picks the same first structure would fail to predict this."
        ]
      }
    ],
    "sentence-16": [
      {
        "text": "**Mouse movements** have more recently been used to study these questions. **Farmer and colleagues (2007)** tracked the path of the computer mouse while participants carried out spoken instructions in a version of the apple and towel display.",
        "children": [
          "It is not just eye movements but **the actual execution of arm movements** that can be influenced by **syntactic ambiguity** and its **interaction with the visually defined context**.",
          "Mouse tracking records the full path of the hand, so a competing interpretation can pull the movement toward another location before the hand reaches the target."
        ]
      },
      {
        "text": "In the **one-referent context**, the plotted trajectories move from the apple at the top left toward the box at the bottom right.",
        "children": [
          "The **ambiguous trajectory** curves slightly toward the empty towel at the top right, compared with the **unambiguous trajectory**.",
          "Points along each path mark the 30th, 40th, 50th and 60th time steps, and the two paths separate most in the middle of the movement."
        ]
      },
      {
        "text": "In the **two-referent context**, the ambiguous and unambiguous trajectories lie almost on top of each other. The second apple makes the location phrase useful for identification, so it is no longer taken as a destination.",
        "children": []
      },
      {
        "text": "A separate graph plots the **Euclidean distance between the ambiguous and unambiguous trajectories** over normalized time. Euclidean distance is the straight-line distance between the two paths at each moment.",
        "children": [
          "In the one-referent context, the distance rises to a peak of about 200 pixels around 40% of the way through the movement.",
          "In the two-referent context, it peaks lower, at about 140 pixels, and earlier, around 30%, and then drops off.",
          "Comprehension and action planning interact while both are underway. The competing interpretation bends the path of the hand even when the movement ends at the correct place."
        ]
      }
    ],
    "sentence-17": [],
    "sentence-18": [
      {
        "text": "**The** is a **determiner**, a word that introduces a **noun phrase**. When the parser encounters “the,” it expects a noun to follow, possibly with an adjective or other modifier in between.",
        "children": [
          "“The” does not name anything by itself.",
          "It limits which kinds of words can come next, which helps the parser anticipate the shape of the phrase."
        ]
      },
      {
        "text": "This expectation is about a **grammatical category**, not about a particular word.",
        "children": [
          "Many different nouns could follow, such as pizza, dog or book.",
          "An adjective could also come first, as in “the hot pizza.” The parser predicts the form of the phrase while its specific meaning is still open. Words that fit the expectation are processed smoothly, while words that break it cause difficulty."
        ]
      }
    ],
    "sentence-19": [
      {
        "text": "**Pizza** is a **noun**, and it completes the noun phrase begun by “the.” It serves as the **head of the noun phrase**, the central word around which the rest of the phrase is organized.",
        "children": [
          "“The” combines with “pizza” to form “the pizza,” which can now act as the subject of the sentence.",
          "With a complete noun phrase in place, the parser expects a verb or verb phrase to tell what the pizza did or what happened to it."
        ]
      },
      {
        "text": "Recognizing the word makes two kinds of information available.",
        "children": [
          "Its **category**, noun, tells the parser how it can combine with other words.",
          "Its **meaning** identifies a kind of food, which also sets up expectations about plausible events, such as being eaten or baked. Both grammatical and meaning-based expectations guide the processing of the next words."
        ]
      }
    ],
    "sentence-20": [
      {
        "text": "**Was** is a past-tense form of the verb **be**. It can act as an **auxiliary**, a helping verb that combines with another verb to express grammatical information such as tense or voice.",
        "children": [
          "In “the pizza was eaten,” was helps form a **passive** construction with the participle eaten.",
          "In “the pizza was in the oven,” was links the subject to a location phrase."
        ]
      },
      {
        "text": "When “was” arrives, the sentence could continue in several ways. It could describe where the pizza was, what it was like or what was done to it.",
        "children": [
          "A location phrase would follow with a preposition, and a passive construction would follow with a participle such as eaten.",
          "The parser has to keep the developing structure available while more words arrive, because the role of was depends partly on what comes next."
        ]
      }
    ],
    "sentence-21": [
      {
        "text": "**In** is a **preposition**, a word that expresses a relationship such as location or containment. It begins a **prepositional phrase**.",
        "children": [
          "“In” does not name the location by itself.",
          "It sets up the expectation of a noun phrase that will supply the location, as in “in the oven” or “in the box.”"
        ]
      },
      {
        "text": "After “the pizza was,” the arrival of “in” narrows the possible structures. The sentence is now heading toward a statement about where the pizza was.",
        "children": [
          "The parser expects a noun phrase to complete the prepositional phrase.",
          "This expectation is grammatical, so the next word must be able to start a noun phrase, such as “the,” “an” or a noun."
        ]
      }
    ],
    "sentence-22": [
      {
        "text": "**The** begins a new **noun phrase** inside the prepositional phrase “in the …” It is the start of the phrase that will name the location.",
        "children": [
          "“The” itself does not supply the location.",
          "A noun is still needed, possibly with modifiers before it, as in “in the hot oven.”"
        ]
      },
      {
        "text": "The parser now strongly expects a **noun**. This expectation concerns a **word category**, not just a sensible topic.",
        "children": [
          "Whatever comes next must work grammatically as part of a noun phrase.",
          "Knowing that the sentence is about pizza makes words like oven or box likely, but the grammatical requirement holds regardless of meaning. Any word that cannot be part of a noun phrase will clash with this expectation."
        ]
      }
    ],
    "sentence-23": [
      {
        "text": "**Eaten** is the **past participle** of the verb **eat**. It is a verb form, not a noun, so it cannot complete the noun phrase that “in the” has set up.",
        "children": [
          "The phrase **“in the eaten”** places a verb form exactly where a noun is required.",
          "This is a **word-category violation**, meaning a word of the wrong grammatical category appears at a position that demands a different category."
        ]
      },
      {
        "text": "This kind of error differs from a strange but grammatical meaning.",
        "children": [
          "“The pizza was in the ocean” is odd in meaning but grammatically fine, because ocean is a noun.",
          "“The pizza was in the eaten” cannot be fixed by imagining an unusual situation. The problem lies in the grammatical type of the arriving word, which breaks the structure itself."
        ]
      },
      {
        "text": "This contrast between category errors and meaning errors makes such sentences useful for studying the brain. Brain responses to the two kinds of errors can be compared to see whether grammar and meaning are processed differently.",
        "children": []
      }
    ],
    "sentence-24": [
      {
        "text": "The **early left anterior negativity**, or **ELAN**, is an **ERP** response elicited by **word class violations**. An **ERP**, or **event-related potential**, is the pattern of electrical brain activity recorded from the scalp and averaged across many trials, time-locked to an event such as the onset of a word.",
        "children": [
          "A **word class** is a grammatical category, such as noun, verb or preposition."
        ]
      },
      {
        "text": "Some classic ELAN stimuli are word-category violations.",
        "children": [
          "**“The pizza was in the eaten,”** where a participle appears where a noun is expected.",
          "**“The scientist criticized Max’s of proof the theorem,”** where the preposition **of** appears where a noun is expected after “Max’s.”"
        ]
      },
      {
        "text": "The ELAN has three main features.",
        "children": [
          "It is **early**, appearing about **100–200 milliseconds** after the critical word.",
          "It is **left and anterior**, meaning it is strongest over the left front of the scalp. This location has raised the question of whether it is language-specific.",
          "It occurs **specifically for word category violations**, such as a noun when a verb is expected, or a preposition in place of a noun."
        ]
      },
      {
        "text": "The grand average ERPs from the syntactic-category violation condition overlay waveforms for **correct** and **incorrect** sentences at many electrode sites.",
        "children": [
          "At the left frontal sites, such as F7, F3, AL and SL, circled in red, the incorrect sentences produce an early negative deflection, shaded black, soon after the critical word.",
          "Gray shading marks a left frontal negativity, and dotted shading marks a positivity over the back of the head.",
          "The ELAN appears so quickly that it was taken as evidence for a very fast syntactic analysis that checks word categories before meaning is processed."
        ]
      }
    ],
    "sentence-25": [
      {
        "text": "**The ELAN came from visual cortex** when words were presented visually. **Visual cortex** is the region at the back of the brain that processes what we see. This finding comes from **Dikker, Rabagliati, Farmer and Pylkkänen (2010)**, in a paper titled “Early occipital sensitivity to syntactic category is based on form typicality.” The **occipital** lobe is where visual cortex is located.",
        "children": [
          "The graph plots **dipole strength** in nanoampere-meters, a measure of activity in a localized brain source, from −100 to 400 milliseconds after the word.",
          "For **bimorphemic nouns**, nouns that end in an identifiable noun suffix, the response to **“The beautifully princess …”** peaks higher than the response to **“The beautiful princess …”** at about **120 to 130 milliseconds**.",
          "Beautiful is an adjective, which correctly predicts a noun. Beautifully is an adverb, which predicts a verb or an adjective, so princess is unexpected."
        ]
      },
      {
        "text": "When we are expecting a verb, for example, **that prediction can feed back down to the earliest parts of the visual system** and predict visual patterns that are consistent with **the way verbs are written**.",
        "children": [
          "A predicted grammatical category implies likely visual forms, such as typical word endings.",
          "The very early response to the error might reflect **a mismatch between that predictive process and what finally appears on the screen**."
        ]
      },
      {
        "text": "This raises a question. **Does this only work for items that are morphologically marked as nouns or verbs?** Or does it work for **open-class versus closed-class** words?",
        "children": [
          "A word is **morphologically marked** when it contains a part, such as a suffix, that signals its category.",
          "**Open-class** words are content words such as nouns and verbs, which constantly gain new members. **Closed-class** words are function words such as prepositions and determiners, which form a small fixed set."
        ]
      }
    ],
    "sentence-26": [
      {
        "text": "Many English words can function as either a **noun** or a **verb**, and the rest of the sentence decides which.",
        "children": [
          "**(3a)** “Chris and Ben are glad that the bird **perches seem** easy to install.” Here perches is a **noun**, meaning the bars that birds sit on, and seem is the verb.",
          "**(3b)** “Chris and Ben are glad that the bird **perches comfortably** in the cage.” Here perches is a **verb**, describing what the bird does.",
          "**(4a)** “The teacher told the principal that the student **needs were** not being met.” Here needs is a **noun**, meaning the student’s requirements.",
          "**(4b)** “The teacher told the principal that the student **needs to be** more focused.” Here needs is a **verb**."
        ]
      },
      {
        "text": "Recognizing the word form alone does not settle its grammatical role. The **continuation** after the ambiguous word resolves it.",
        "children": []
      },
      {
        "text": "Words also differ in **phonological form typicality**, which is how much a word’s sound pattern resembles the sound patterns of typical nouns or typical verbs. The scatterplot covers **3,158 words** from a corpus analysis.",
        "children": [
          "Each word is placed by its **mean distance** in phonological feature space from **all nouns**, on the horizontal axis, and from **all verbs**, on the vertical axis. A small distance means the word sounds similar to that category.",
          "**Nouns**, drawn as gray squares, tend to cluster in the upper left, closer to other nouns. **Verbs**, drawn as black diamonds, tend to cluster in the lower right, closer to other verbs.",
          "Labeled points mark the centers of **noun-like nouns**, **verb-like nouns**, **verb-like verbs** and **noun-like verbs**. A word can sound statistically like one category while actually belonging to the other."
        ]
      }
    ],
    "sentence-27": [
      {
        "text": "In terms of form typicality, **“perches” is noun-like**, and **“needs” is verb-like**.",
        "children": [
          "These are learned statistical tendencies in how words sound. Both words can still appear in either role.",
          "On the scatterplot of 3,158 words, perches would fall among the noun-like forms and needs among the verb-like forms."
        ]
      },
      {
        "text": "For **perches**, the noun-like form matches one sentence and clashes with the other.",
        "children": [
          "In **“the bird perches seem easy to install,”** perches is used as a noun, which matches its noun-like form.",
          "In **“the bird perches comfortably in the cage,”** perches must be a verb, which goes against its noun-like form."
        ]
      },
      {
        "text": "For **needs**, the pattern is reversed.",
        "children": [
          "In **“the student needs to be more focused,”** needs is used as a verb, which matches its verb-like form.",
          "In **“the student needs were not being met,”** needs must be a noun, which goes against its verb-like form."
        ]
      },
      {
        "text": "Each word appears once as a noun and once as a verb, so the same word form can be studied in a matching and a mismatching use.",
        "children": [
          "If form typicality guides parsing, mismatching uses should be harder to process, even though both uses are grammatical."
        ]
      }
    ],
    "sentence-28": [
      {
        "text": "Reading is **slower when a word’s required category conflicts with its form typicality**. The bar graph plots **mean length-adjusted difference scores** in milliseconds, which is reading time at **disambiguation** minus reading time at the **point of ambiguity**.",
        "children": [
          "The **point of ambiguity** is the ambiguous word itself, such as perches or needs.",
          "**Disambiguation** is the point where the continuation makes the intended category clear, such as “seem” or “comfortably.”",
          "**Length-adjusted** means the times are corrected for how long the words are. Rising bars signal difficulty."
        ]
      },
      {
        "text": "For **noun-like homonyms** such as perches, the **noun-resolved** sentences show an increase of about **50 milliseconds**. The **verb-resolved** sentences show a much larger increase, about **120 milliseconds**.",
        "children": [
          "A noun-like form is harder to resolve as a verb."
        ]
      },
      {
        "text": "For **verb-like homonyms** such as needs, the **noun-resolved** sentences show an increase of about **110 milliseconds**. The **verb-resolved** sentences show almost none, under 10 milliseconds.",
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
        "text": "The **ELAN effect for nouns where a verb is expected** is limited to cases where there is either **syntactic information**, meaning morphemes that indicate noun-ness, or **statistical form-based information**, meaning “nouniness,” that is **physically available** in the word. **No effect was observed for neutral nouns like “infant” that lack strong cues**.",
        "children": [
          "A **morpheme** is the smallest meaningful part of a word, such as the suffix that marks a noun.",
          "“Nouniness” is how much a word’s form resembles typical nouns, even without a noun suffix."
        ]
      },
      {
        "text": "The figure compares three kinds of nouns, with responses plotted as dipole strength from −100 to 400 milliseconds and the **M100** response marked. The M100 is a brain response peaking about 100 milliseconds after a word appears.",
        "children": [
          "**(a) Bimorphemic nouns**, in “The beautiful princess …” versus “The beautifully princess …” Princess has a noun-marking suffix, and the unexpected version produces a significantly larger peak.",
          "**(b) Typical nouns**, in “The tasteless soda …” versus “The tastelessly soda …” Soda has a statistically noun-like form, and the unexpected version again produces a significantly larger peak.",
          "**(c) Neutral nouns**, in “The cute infant …” versus “The cutely infant …” Infant has neither a suffix nor a typical noun form, and the two waveforms do not differ.",
          "Asterisks mark significant differences between expected and unexpected nouns. They appear for the bimorphemic and typical nouns but not for the neutral nouns."
        ]
      },
      {
        "text": "An abstract category mismatch alone is therefore not enough to produce this earliest visual response.",
        "children": [
          "An expected category generates predictions about what the next word will look like.",
          "The early response appears only when the arriving word carries physical evidence that conflicts with that prediction."
        ]
      }
    ],
    "sentence-30": [
      {
        "text": "**Sentence processing can be summarized in four sentences**, each tied to one key idea.",
        "children": [
          "**“Colorless green ideas sleep furiously.”** **Syntax is independent of semantics to some extent**. In the limit, a sentence can be grammatically correct but meaningless, because words can fit a grammatical structure without describing a sensible event."
        ]
      },
      {
        "text": "**“The horse raced past the barn fell.”** The syntactic structure of a sentence is often highly **ambiguous**, or more precisely **vague**, but we do not notice except where things fail.",
        "children": [
          "**Reading times** for preferred versus unpreferred structures suggest that syntactic processes **take shortcuts to save memory**, rather than activating every possible parse of a sentence.",
          "When the shortcut picks the wrong structure, as in the horse sentence, the reader is led down the garden path."
        ]
      },
      {
        "text": "**“Put the apple on the towel in the box.”** **Context, pragmatics and other factors interact with syntactic processing from very early on**.",
        "children": [
          "With two apples in view, listeners take “on the towel” as a description of the apple rather than a destination.",
          "The visual situation shapes the parse during the sentence."
        ]
      },
      {
        "text": "**“The bird perches were comfortable.”** **The very earliest syntactic effects observable in the brain are driven in part by form typicality**, not necessarily by morphosyntactic structures.",
        "children": [
          "**Morphosyntactic** structure is grammatical structure signaled by word parts and word order.",
          "These early effects seem to be related to **predictions about the physical forms of words**. Perches has a noun-like form, so its use as a noun here matches the expectation set up by its form."
        ]
      }
    ],
    "sentence-31": [],
    "aphasias-01": [],
    "aphasias-02": [
      {
        "text": "**Aphasia** is a loss or impairment of language ability caused by brain damage. In the **1870s**, a number of German neurologists, including **Lichtheim** and **Wernicke**, began making **more systematic observations of aphasia**.",
        "children": [
          "They ascribed specific losses of function to **“disconnections” between “centers.”**",
          "A **center** is a brain region that stores one kind of language representation. A disconnection is damage to the pathway linking two centers."
        ]
      },
      {
        "text": "**Lichtheim’s “House” model** draws these centers and pathways in the shape of a house.",
        "children": [
          "**A** is the center for **sound images**, the stored sound patterns of words. **M** is the center for **movement images**, the stored motor plans for saying words. **B** is the center for **concepts**, at the peak of the roof.",
          "**a** is the **acoustic pathway** bringing heard speech into A, and **m** is the **motor pathway** carrying plans from M out to the speech muscles.",
          "The numbers **1 through 7** mark different forms of aphasia., depending on which center or pathway is destroyed."
        ]
      },
      {
        "text": "Different patterns of loss follow from different damage sites.",
        "children": [
          "A loss of the ability to **understand spoken words** might be due to a disconnection between **A and B**. The sound of the word arrives, but it cannot reach the concept.",
          "A loss of the ability to do **verbatim repetition** might be due to a disconnection between **A and M**. The heard word cannot be passed directly to the plans for saying it."
        ]
      },
      {
        "text": "This kind of **“box and arrow” model** is foundational in **aphasiology**, the study of aphasia, and in modeling typical language function.",
        "children": [
          "The **Interactive Activation model** of word recognition has the same basic form, with levels of representation connected by pathways.",
          "The historical account comes from Eling and Whitaker (2009), “History of aphasia, from brain to language.”"
        ]
      }
    ],
    "aphasias-03": [
      {
        "text": "The **“Geschwind–Wernicke model”** of brain and language links language functions to particular brain regions and the pathways between them. In the **1970s, Norman Geschwind revived** the box-and-arrow approach of Wernicke and Lichtheim.",
        "children": [
          "**Broca’s area** sits toward the front of the left hemisphere, in the frontal lobe.",
          "**Wernicke’s area** sits farther back, in the temporal lobe.",
          "The **arcuate fasciculus** is a bundle of nerve fibers that connects Wernicke’s area with Broca’s area."
        ]
      },
      {
        "text": "The brain drawing marks two major grooves used as landmarks.",
        "children": [
          "The **central sulcus**, also called the **fissure of Rolando**, runs down the side of the brain and separates the frontal lobe from the parietal lobe behind it.",
          "The **lateral sulcus**, also called the **fissure of Sylvius**, runs along the side and separates the temporal lobe below it from the frontal and parietal lobes above."
        ]
      },
      {
        "text": "In the century between Wernicke and Geschwind, **the field of linguistics evolved dramatically**.",
        "children": [
          "Linguists developed a theoretical model in which **syntax was independent of other aspects of language** and had **its own computational principles**.",
          "This opened the door to theorizing about **dissociations** and **double dissociations** of language functions in more sophisticated ways."
        ]
      },
      {
        "text": "A **dissociation** occurs when one ability is impaired while another is spared. A **double dissociation** occurs when one patient has the first ability impaired and the second spared, while another patient has the reverse pattern.",
        "children": [
          "A double dissociation is strong evidence that two abilities depend on separate systems.",
          "Once syntax, word knowledge and meaning are treated as separate parts of language, a patient can be described as impaired in one specific part while the others work well."
        ]
      }
    ],
    "aphasias-04": [
      {
        "text": "**Fromkin (1997)**, in “Some thoughts about the brain/mind/language interface,” describes the classic profiles of the two main aphasias.",
        "children": [
          "The speech of **Broca’s aphasia** patients has **word-finding pauses**, **loss of grammatical morphemes**, and quite often **disturbed word order**. A **grammatical morpheme** is a small word or word part that expresses a grammatical relationship, such as “the,” “is” or the past-tense ending “-ed.”",
          "Auditory comprehension of everyday conversation **gives the impression of being generally good**, although **controlled testing reveals considerable impairments**."
        ]
      },
      {
        "text": "The term **agrammatism**, meaning difficulty producing or understanding grammatical structure, is almost a synonym for Broca’s aphasia.",
        "children": [
          "Even so, **some patients with lesions in Broca’s area are not agrammatic**.",
          "And **some agrammatic patients would not be classified neurologically as Broca’s aphasics**.",
          "The behavioral symptom and the damaged brain region overlap heavily but imperfectly. A label such as Broca’s aphasia describes a pattern of behavior, and that pattern does not always follow damage to the area with the same name."
        ]
      },
      {
        "text": "Patients with **Wernicke’s aphasia** produce **fluent speech** with **good intonation and pronunciation**.",
        "children": [
          "Their speech contains **many word substitutions**, some related in meaning to the intended word and some unrelated.",
          "They also produce **neologisms**, which are invented words, as well as **phonological errors**, which are errors in the sounds of words.",
          "They also have **comprehension difficulties**. Fluency describes how smoothly speech is delivered, which is separate from whether the words carry a coherent message."
        ]
      }
    ],
    "aphasias-05": [
      {
        "text": "An attractive **dichotomy**, or two-way division, contrasts the two aphasias. **Wernicke’s aphasia** is described as **“word salad”** or **“Jabberwocky,”** often with **neologisms**, while **syntax is roughly intact**. “Jabberwocky” is Lewis Carroll’s grammatical nonsense poem.",
        "children": [
          "One Wernicke’s patient, asked about his health, replied **“I felt worse because I can no longer keep in mind from the mind of the minds to keep me from mind and up to the ear which can be to find among ourselves,”** from Kriendler and colleagues (1971).",
          "Another patient, asked about his poor vision, said **“My wires don’t hire right.”**",
          "An aphasic physician, asked if he was a doctor, replied **“Me? Yes, sir, I’m a male demaploze on my own. I still know my tubaboys what for I have that’s gone hell and some of them go.”** **Demaploze** and **tubaboys** are neologisms.",
          "One patient described a **fork** as **“a need for a schedule”** and a **spoon** as **“How many schemes on your throat.”**"
        ]
      },
      {
        "text": "**Broca’s aphasia** is described as **“telegraphic” speech**, with **difficulty with word order and grammatical particles** and **relative sparing of important content words**.",
        "children": [
          "One Broca’s patient, asked what brought him to the hospital, said **“Yes … ah … Monday … ah … Dad and P.H. (the patient’s name) and Dad … hospital. Two … ah doctors … and ah … thirty minutes … and yes … ah … hospital. And, er Wednesday … nine o’clock and eh Thursday, ten o’clock … doctors. Two doctors … and ah … teeth. Yeah … fine,”** from Badecker and Caramazza (1985).",
          "Content words such as Dad, hospital and doctors carry the story, while the grammatical words that would connect them are missing."
        ]
      },
      {
        "text": "The two patterns look like mirror images, fluent grammar with wrong words versus meaningful words with little grammar.",
        "children": []
      }
    ],
    "aphasias-06": [
      {
        "text": "The dichotomy can also be stated in terms of what is damaged. **Wernicke’s aphasia** reflects **problems with activation, or possibly inhibition, in the lexicon**, and **Broca’s aphasia** reflects **problems with grammar**.",
        "children": [
          "The **lexicon** is the mental store of words.",
          "**Activation** makes a word candidate available. **Inhibition** suppresses competing words that should not be chosen, so weak inhibition could let wrong words slip into speech."
        ]
      },
      {
        "text": "This description is **fairly distant from how Broca described his original cases**. Paul Broca’s presentation of **Leborgne**, known as **“Tan,”** gives this behavioral description.",
        "children": [
          "Tan **could only produce one jargon syllable**, “tan.”",
          "He **seemed otherwise to be in possession of his senses**, and he in fact **seemed to understand what was being said**."
        ]
      },
      {
        "text": "Broca’s presentation raises several questions.",
        "children": [
          "Why is it critical that Leborgne had his other senses intact? Intact senses show that the loss is specific to speech, which makes it a dissociation.",
          "Why does a “capacity for articulate speech” sound like a more plausible function for a brain region than “criminality” or “philoprogenitiveness,” a phrenology term for love of one’s children?",
          "If Tan could be examined today, what measurements would specify his deficits in terms of the **levels of description used in modern linguistics**, such as phonetic, phonological, lexical and syntactic?"
        ]
      },
      {
        "text": "This creates a confusion. **Broca’s actual patients would not necessarily be classified as Broca’s aphasics** today.",
        "children": [
          "They were arguably **unable to produce speech at all**, apparently because of **motor control problems**.",
          "They would be classified as having **apraxia of speech**, a disorder in planning and coordinating the movements needed to speak. Apraxia of speech can limit output severely without any loss of grammatical knowledge."
        ]
      }
    ],
    "aphasias-07": [
      {
        "text": "The Wernicke-as-lexicon, Broca-as-grammar dichotomy is interesting partly because it **aligns well with a sharp distinction drawn in late 20th-century formal linguistics between the grammar and the lexicon**.",
        "children": [
          "The **grammar** is the system of rules for combining words into sentences.",
          "The **lexicon** is the store of individual words, which must be memorized."
        ]
      },
      {
        "text": "This distinction starts with **Chomsky’s formulation of the computational problem of language learning**.",
        "children": [
          "We recognize a new item as a sentence **not because it matches some familiar item in any simple way**, but because **it is generated by the grammar** that each person has internalized.",
          "A sentence never heard before can still be understood because we can work out how the grammar builds its structure."
        ]
      },
      {
        "text": "Chomsky also gave **compelling demonstrations of the independence of syntax and semantics**. In Chomsky (1955), neither **(a) “colorless green ideas sleep furiously”** nor **(b) “furiously sleep ideas green colorless”** has ever occurred in an English speaker’s past experience, and yet **(a) is grammatical while (b) is not**.",
        "children": [
          "Sentence (a) has no sensible meaning, but its word order follows English grammar.",
          "Sentence (b) uses the same words in an order the grammar does not allow.",
          "The two are equally unfamiliar and equally meaningless, so the difference comes from grammar as its own system."
        ]
      },
      {
        "text": "The aphasia dichotomy maps onto this split. Wernicke’s aphasia would be a disorder of the lexicon, and Broca’s aphasia would be a disorder of the grammar.",
        "children": []
      }
    ],
    "aphasias-08": [
      {
        "text": "The dichotomy also fits the levels of the **speech production model**, particularly the difference between the **functional level** and the **positional level**.",
        "children": [
          "The **message level**, which is conceptual, involves **choosing a story angle and arousing concepts of referents and event structure**.",
          "The **functional level**, the first linguistic level, involves **arousing word meanings and semantic roles**. A **semantic role** is the part a participant plays in an event, such as the doer or the receiver.",
          "The **positional level**, the second linguistic level, involves **getting word forms in grammatically appropriate order**.",
          "The **phonological encoding level** supplies the sounds of the words, and the **speech gesture level** handles **articulation**, the physical movements of speaking."
        ]
      },
      {
        "text": "At the functional level, **lemmas have an arbitrary relationship to their referents**. A **lemma** is a word’s entry in the lexicon, linking its meaning to its grammatical properties.",
        "children": [
          "Nothing about the concept determines the word, so there is no reason a dog must be called “dog.”"
        ]
      },
      {
        "text": "At the positional level, **syntactic trees, affixes and so on are the product of abstract syntactic processes**. An **affix** is a word part added to a stem, such as “-ed” or “-ly.” This is the grammatical side of language, built by rules.",
        "children": []
      },
      {
        "text": "An objection is that words like **HOUSEBOAT** and **DOGHOUSE** have meanings that are clearly not arbitrary, since they are built from parts.",
        "children": [
          "The reply comes from **speech error evidence** that **derivational morphology** is done at the positional level. **Derivational morphology** builds new words from existing parts, such as adding “-ly” to make an adverb.",
          "In the error **“easy enoughly,”** the speaker meant “easily enough,” but the “-ly” suffix attached to the wrong word. The suffix moved as a separate piece, so a grammatical operation at the positional level added it."
        ]
      }
    ],
    "aphasias-09": [
      {
        "text": "Popular theories of **sentence processing** hold that **the syntactic structure of a sentence is computed independently of meaning** as we listen or read. An autonomous parser builds the structure first, and meaning is worked out afterward.",
        "children": []
      },
      {
        "text": "**Isolating these “parsing” mechanisms requires carefully constructing stimulus materials**.",
        "children": [
          "In **“The burglar blew open the safe with the dynamite,”** the **preferred** structure attaches “with the dynamite” to the **verb phrase**, so the dynamite is the instrument.",
          "The **unpreferred** structure attaches it to the **noun phrase** “the safe,” so the phrase describes which safe.",
          "The words are the same in both structures. Only the attachment changes, so a test built on such sentences can target parsing without changing word meanings."
        ]
      },
      {
        "text": "**One possibility** is that **Broca’s patients generally understand what is being said even though they have a core grammatical deficit**.",
        "children": [
          "In ordinary conversation, word meanings, familiar events and context all point toward the same message.",
          "A listener can use these cues to understand without fully computing the grammar.",
          "Testing a parsing deficit therefore requires sentences where the grammatical relationships cannot be recovered by guessing the most likely event, such as reversible sentences in which either person could plausibly do the action."
        ]
      }
    ],
    "aphasias-10": [
      {
        "text": "**None of this theory was available to Broca back in the 1860s**. For him, it was interesting enough to **dissociate “articulate speech” from comprehension**.",
        "children": [
          "Leborgne could produce only one syllable, yet he appeared to understand what was said to him.",
          "Showing that speaking and understanding can come apart was the key finding at the time."
        ]
      },
      {
        "text": "The modern question is different. Suppose we want to show that **some patients have a difficulty that is more generally with syntax**.",
        "children": [
          "A **syntactic impairment** would concern the organization of grammatical relationships.",
          "Such an impairment should affect both producing and understanding sentences."
        ]
      },
      {
        "text": "The answer is to **test comprehension**.",
        "children": [
          "A comprehension test lets the patient respond without speaking, which takes motor problems out of the picture.",
          "If a patient struggles to understand grammatical relationships, the deficit goes beyond articulation.",
          "Leborgne’s presentation already points this way, with its question of what measurements would specify his deficits at phonetic, phonological, lexical and syntactic levels."
        ]
      }
    ],
    "aphasias-11": [
      {
        "text": "Showing that **Broca’s patients have comprehension deficits** was interesting for several reasons.",
        "children": [
          "**Broca’s aphasia is almost always accompanied by some level of motor dysfunction**.",
          "Agrammatic speech might **merely reflect an attempt to communicate despite motor limitations**. If speaking is very effortful, a patient might drop the small grammatical words and keep only the most informative content words."
        ]
      },
      {
        "text": "**Hughlings Jackson** made a related point. **We are observing what the individual can do despite the impairment**.",
        "children": [
          "Just because a brain injury leads to agrammatic speech does not literally mean that **the grammar itself is injured**.",
          "Caramazza and Zurif (1976) cite a version of this idea from Lenneberg (1973). If anterior damage spares the patient’s tacit knowledge of language, the telegraphic output can be blamed on a neuromuscular problem. **The strain of speaking is so great that the patient speaks asyntactically in order to economize effort**."
        ]
      },
      {
        "text": "**Chomsky’s distinction between competence and performance** also applies.",
        "children": [
          "**Competence** is a person’s underlying knowledge of language.",
          "**Performance** is the actual use of that knowledge in speaking or understanding, which can be disrupted by memory limits, distraction or motor problems.",
          "**When motor deficits obviously interfere with performance, comprehension may provide a clearer window into competence**."
        ]
      },
      {
        "text": "**Caramazza and Zurif (1976)** therefore tested comprehension in Broca’s patients. Speech production cannot separate the two explanations, because both predict telegraphic speech.",
        "children": [
          "If these patients understand grammar normally, their agrammatic speech is a motor performance problem.",
          "If they also fail to understand grammatical relationships, the deficit reaches the grammar itself."
        ]
      }
    ],
    "aphasias-12": [
      {
        "text": "**“Man bites dog”** is the newspaper example of an unexpected event. We need **psycholinguistic tests** to observe grammatical difficulties in comprehension because **in conversation, there are lots of redundant cues to what a speaker intends**. **Redundant** cues are several different sources of information that all point to the same meaning.",
        "children": []
      },
      {
        "text": "In **“The dog bit the man,”** there are **many ways to get the right meaning**.",
        "children": [
          "The listener can form the **most likely combination of DOG, BITE and MAN into an event representation**, **with or without syntax**. Dogs bite people much more often than people bite dogs.",
          "The sentence also follows **canonical word order**, which is **agent, then verb, then undergoer**, or **subject, then verb, then object**. The **agent** is the doer of the action, and the **undergoer** is the one the action happens to. In English, the first noun is usually the agent.",
          "In addition, a lot of comprehension happens in a **discourse context**, the surrounding conversation, which clarifies a great deal."
        ]
      },
      {
        "text": "Broca’s patients’ comprehension might depend on these **compensatory heuristics**. A **heuristic** is a mental shortcut, and a compensatory one makes up for a weakness elsewhere.",
        "children": [
          "A patient might simply assume the most plausible event, or assume the first noun is the doer.",
          "These shortcuts give the right answer for “The dog bit the man” without any grammatical analysis."
        ]
      },
      {
        "text": "To test grammar directly, the sentences need to defeat the shortcuts, as in **“The dog that the man is biting is angry.”** Here the **man** is doing the biting, even though dog comes first and dogs are more likely biters, so only grammatical analysis gets it right.",
        "children": []
      }
    ],
    "aphasias-13": [
      {
        "text": "**Caramazza and Zurif** built **a list of exactly this kind of sentence, along with a set of control sentences**. Their table has four groups of eight sentences each.",
        "children": [
          "**A. Control sentences** are simple sentences in canonical order, such as **“The girl is kicking a green ball,” “The cat is chasing a blue bird”** and **“The boy is riding a new bicycle.”**"
        ]
      },
      {
        "text": "**B. Center-embedded sentences with semantic constraints** contain a clause inside another clause, but meaning makes the roles obvious. A **center-embedded** sentence has a relative clause placed in the middle of the main clause.",
        "children": [
          "Examples include **“The apple that the boy is eating is red,” “The wagon that the horse is pulling is green”** and **“The balloon that the clown is holding is round.”** Apples cannot eat boys, so meaning alone reveals who did what."
        ]
      },
      {
        "text": "**C. Reversible center-embedded sentences** use two participants who could each plausibly do the action.",
        "children": [
          "Examples include **“The cow that the monkey is scaring is yellow,” “The horse that the bear is kicking is brown”** and **“The girl that the boy is tickling is happy.”** Meaning gives no help, so only grammar reveals the roles."
        ]
      },
      {
        "text": "**D. Improbable center-embedded sentences** describe events that go against expectations.",
        "children": [
          "Examples include **“The bird that the worm is eating is blue,” “The man that the horse is riding is fat”** and **“The policeman that the robber is chasing is skinny.”** Common sense points to the wrong answer here."
        ]
      },
      {
        "text": "In all the embedded sentences, the first noun is the one acted upon, and the doer is inside the relative clause.",
        "children": [
          "A listener who relies on meaning should succeed on groups A and B and fail on C and D. A listener who parses normally should succeed on all four."
        ]
      }
    ],
    "aphasias-14": [
      {
        "text": "The data come from a **sentence-picture matching task**. Participants heard a sentence and chose which picture matched its meaning.",
        "children": [
          "Accuracy reveals whether the listener understood who did what to whom, without requiring a spoken answer.",
          "The graph plots **mean correct responses** for each patient group across four sentence types. **C** is control sentences, **CE-S** is semantically constrained, **CE-R** is reversible, and **CE-I** is improbable. The groups are **N** for normal, **B** for Broca’s, **C** for conduction and **W** for Wernicke’s aphasia."
        ]
      },
      {
        "text": "**Healthy controls are more or less equally good at all stimulus types**. Their line stays flat near the maximum score.",
        "children": []
      },
      {
        "text": "**Wernicke’s patients are poor overall**.",
        "children": [
          "Their scores are low even on the simple control sentences.",
          "This is probably a result of their **general comprehension deficits**, which affect understanding of words as well as grammar."
        ]
      },
      {
        "text": "**Broca’s patients** have a **particular difficulty keeping “who did what to whom” straight** when **syntax conflicts with common sense** or with the probable semantic roles for nouns.",
        "children": [
          "Their scores are high on control sentences and on semantically constrained sentences, where meaning supplies the answer.",
          "Their scores drop on reversible and improbable sentences, where only grammar can reveal the roles."
        ]
      },
      {
        "text": "This **specific comprehension deficit** was taken as evidence that **Broca’s aphasia affects syntax specifically**.",
        "children": [
          "The deficit appeared in understanding as well as speaking, which places it in the grammar itself.",
          "The paper’s title, “Dissociation of algorithmic and heuristic processes,” captures the idea. Broca’s patients lose the **algorithmic** process of grammatical analysis but keep the **heuristic** shortcuts based on meaning."
        ]
      }
    ],
    "aphasias-15": [
      {
        "text": "A more **specific theory of the “parts of language”** opens up **new ways of exploring structure-function relationships**. A **structure-function relationship** is a link between a brain structure and the function it supports.",
        "children": []
      },
      {
        "text": "**Rather than just dividing aphasics into those with good and poor comprehension, or those who are more or less fluent**, researchers can **isolate problems with particular aspects of language**.",
        "children": [
          "One patient might know word meanings well but assign the wrong roles in complex sentences.",
          "Another might produce a fluent grammatical frame filled with words that fail to carry the intended message.",
          "A single fluency rating would hide the difference between these two patients."
        ]
      },
      {
        "text": "The key division is **the grammar versus the lexicon**.",
        "children": [
          "**Grammar** concerns the rules that relate words to one another in a sentence.",
          "The **lexicon** concerns stored words and the ability to retrieve the right ones."
        ]
      },
      {
        "text": "This division gives specific hypotheses to test, and controlled tasks can relate an impaired operation to a particular brain region.",
        "children": [
          "A grammar deficit predicts trouble with reversible sentences but not with word meanings.",
          "A lexical deficit predicts trouble with word meanings and naming but not with grammatical structure."
        ]
      }
    ],
    "aphasias-16": [
      {
        "text": "There are **problems with this dichotomy**. **Dick and colleagues** had participants listen to **four types of sentences** and **indicate which animal was doing the action**.",
        "children": [
          "Two pictures appeared on a computer screen, one of a dog and one of a cat, and participants pressed a button on a response box to choose the animal.",
          "The event is always a dog biting a cat, but the sentence structure changes."
        ]
      },
      {
        "text": "Two sentence types put the doer first.",
        "children": [
          "**Active**, as in **“The dog is biting the cat.”**",
          "**Subject cleft**, as in **“It’s the dog that is biting the cat.”** A **cleft** sentence splits a simple sentence to put focus on one part, using “It’s … that.” In a subject cleft, the focused noun is the subject, the doer.",
          "For these two types, a shortcut of choosing the first animal mentioned gives the right answer."
        ]
      },
      {
        "text": "Two sentence types put the receiver of the action first.",
        "children": [
          "**Object cleft**, as in **“It’s the cat that the dog is biting.”** The focused noun is the object, the one being bitten.",
          "**Passive**, as in **“The cat is bitten by the dog.”** The passive makes the receiver the grammatical subject.",
          "For these two types, the first-animal shortcut gives the wrong answer. A listener who parses the grammar succeeds on all four types."
        ]
      }
    ],
    "aphasias-17": [
      {
        "text": "When **aphasia patients and healthy aging controls** do this task, **a pattern emerges much like what Caramazza and Zurif observed**. The graph plots percent correct for each group across active, subject cleft, object cleft and passive sentences, with patients grouped by the Western Aphasia Battery.",
        "children": [
          "**Elderly controls** score close to 100% on all four sentence types.",
          "**Anomic** patients, whose main problem is word finding, score about 89% on actives and subject clefts, dropping to about 69% on object clefts and about 73% on passives.",
          "**Conduction** aphasia patients score about 75% on actives and subject clefts and fall to about 42% on object clefts.",
          "**Broca’s** patients score about 61% on actives and 65% on subject clefts, then drop to about 42% on object clefts and about 54% on passives.",
          "**Wernicke’s** patients score low across the board, around 43% to 50% for every sentence type."
        ]
      },
      {
        "text": "**Broca’s aphasia patients have particular difficulty with the syntactically complex stimuli**, the object clefts and passives.",
        "children": [
          "These are **noncanonical** structures, meaning they depart from the usual doer-first order."
        ]
      },
      {
        "text": "**Their performance is overall not so great**, however.",
        "children": [
          "Even on simple active sentences, Broca’s patients are far below the elderly controls.",
          "The pattern combines a general drop in performance with an extra cost for complex structures. The groups differ in both overall accuracy and the size of that extra cost."
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
        "text": "Under **single-stress conditions**, accuracy stays near 99% for the normal condition and stays high for actives and subject clefts in every condition.",
        "children": [
          "Object clefts suffer most. With **noise**, accuracy falls from about 97% on actives to about 86% on object clefts.",
          "Passives also drop under noise, to about 91%."
        ]
      },
      {
        "text": "Under **dual-stress conditions**, which combine two stressors, the effects grow larger.",
        "children": [
          "With **low-pass filtering plus compression**, accuracy is about 91% on actives and 90% on subject clefts, but drops to about 66% on object clefts and 68% on passives.",
          "Other combinations, such as compression plus visual digits, lower object clefts to about 90% while leaving actives near 98%."
        ]
      },
      {
        "text": "**Object cleft and passive sentences are particularly vulnerable to all the manipulations**, the same pattern seen in Broca’s aphasia. These students have no brain damage, so stressing their processing system is enough to produce an aphasia-like profile.",
        "children": [
          "This suggests that **the comprehension deficits in Broca’s aphasia may be a “performance” issue after all**.",
          "Complex structures may demand more processing resources, so any reduction in resources hurts them first. The patients may keep their grammatical competence but lack the resources to use it efficiently."
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
        "text": "The bar graph gives accuracy for each version.",
        "children": [
          "In the non-linguistic version, controls scored **98.5%** and aphasic patients **93.4%**.",
          "In the linguistic version, controls scored **99.4%** and aphasic patients **87.5%**.",
          "**Broca’s aphasics had difficulty with this task whether the stimuli were linguistic or not**."
        ]
      },
      {
        "text": "A second graph breaks down accuracy by the type of wrong choice offered, called the **distractor**.",
        "children": [
          "With **unrelated** distractors, controls scored 99.8% and aphasic patients 93.3%.",
          "With **semantic** distractors, which are related in meaning to the correct object, controls scored 99.2% and aphasic patients dropped to **86.3%**.",
          "With **affordance-based** distractors, controls scored 97.7% and aphasic patients 91.6%. An **affordance** is an action an object allows, such as a different object that can also be licked."
        ]
      },
      {
        "text": "The nonverbal version removes language from the input while keeping meaning in the task. A pantomimed action has to be understood and linked to the right object, just as a verb would be linked to its object.",
        "children": [
          "A purely grammatical deficit predicts good performance on the nonverbal version.",
          "Difficulty on that version points to a broader problem with action meanings, shared with language."
        ]
      }
    ],
    "aphasias-20": [
      {
        "text": "**Performance in the non-verbal version of this task was significantly correlated with damage to Broca’s area**. The lesion maps give the brain areas linked to deficits in **non-linguistic pantomime interpretation**.",
        "children": [
          "Three horizontal slices of the brain appear, at levels marked on a small side view of the brain.",
          "The colored regions mark where damage was associated with poorer performance, with red and yellow marking the strongest relationships.",
          "The strongest associations fall in the left frontal region in front of the **central sulcus**, marked **CS**, which includes Broca’s area."
        ]
      },
      {
        "text": "Participants only had to interpret a pantomimed action and choose an object.",
        "children": [
          "They did not have to produce a sentence.",
          "They did not have to work out the grammar of a spoken instruction."
        ]
      },
      {
        "text": "Damage to Broca’s area therefore affects more than syntax.",
        "children": [
          "Patients with damage there can struggle to connect an action with its meaning even when no language is involved.",
          "Any account of Broca’s area has to explain both the grammatical comprehension findings and this nonlinguistic difficulty with actions."
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
        "text": "The bar graph gives accuracy for each group in each version.",
        "children": [
          "**Controls** scored 99.2% verbal and 98.1% nonverbal.",
          "Patients with **right hemisphere damage**, labeled **RHD**, scored 99.1% and 98.2%.",
          "**Anomic** patients scored 98.6% and 96.7%.",
          "**Broca’s** patients scored 96.3% and 95.2%.",
          "**Wernicke’s** patients scored **90.0% verbal** and **91.3% nonverbal**."
        ]
      },
      {
        "text": "The groups differed in overall accuracy. Controls, right hemisphere patients and anomic patients performed equally well, Broca’s patients performed worse, and Wernicke’s patients performed worst.",
        "children": [
          "**Wernicke’s patients were particularly bad at this task**.",
          "**No significant difference was observed between the verbal and nonverbal versions**."
        ]
      },
      {
        "text": "The deficit therefore goes beyond understanding spoken words.",
        "children": [
          "Wernicke’s patients also struggle to connect a meaningful nonverbal sound with the object that makes it.",
          "Their difficulty concerns linking sounds of any kind to their meanings, whether the meaning arrives through language or through ordinary sounds."
        ]
      }
    ],
    "aphasias-22": [
      {
        "text": "**Deficits in both verbal and nonverbal sound-picture matching are associated with Wernicke’s area**. The lesion overlays mark where damage occurred in patients who were impaired on each version.",
        "children": [
          "The top row covers patients **impaired in the nonverbal version**, with **n = 8**.",
          "The bottom row covers patients **impaired in the verbal version**, with **n = 10**.",
          "Each row has three horizontal brain slices, and red and yellow mark areas damaged in the largest number of patients."
        ]
      },
      {
        "text": "The two rows look very similar.",
        "children": [
          "In both, the region of greatest overlap falls in the posterior temporal area of the left hemisphere, around Wernicke’s area.",
          "The verbal and nonverbal impairments therefore come from damage to the same general region."
        ]
      },
      {
        "text": "The two versions differ in their input, but they share a common demand.",
        "children": [
          "A spoken phrase conveys the meaning through words, while an animal call conveys it without language.",
          "Both tasks require connecting meaningful sounds to what they represent. Wernicke’s area appears to support meaningful sound processing in general, with language as one important case."
        ]
      }
    ],
    "aphasias-23": [
      {
        "text": "**How language-specific are the deficits in aphasia?** This is **still a controversy**.",
        "children": [
          "Some patients show particular vulnerability to complex grammatical structures, which suggests some aspects of language are handled in specialized ways.",
          "The same patients can also struggle with action meanings or environmental sounds in tasks that involve no language, which suggests language shares brain systems with other kinds of meaning.",
          "An explanation has to account for both kinds of finding."
        ]
      },
      {
        "text": "What should be clear is **how the terms of the debate have evolved**. The field now relies on three kinds of tools.",
        "children": [
          "**Relatively sophisticated tests that tap specific aspects of language**, such as reversible and improbable sentences, cleft sentences and nonverbal matching tasks.",
          "**Quantitative analyses of behavior**, which measure accuracy across sentence types, patient groups and stress conditions.",
          "**Quantitative analyses of structure-function relationships**, which relate patterns of brain damage to performance across many patients."
        ]
      },
      {
        "text": "These methods have come **a long way from the 19th century**.",
        "children": [
          "Wernicke and Lichtheim drew boxes and arrows from a small number of individual cases.",
          "Modern research can test which specific operations are impaired and map those impairments onto damaged tissue across large groups of patients."
        ]
      }
    ],
    "aphasias-24": [],
    "aphasias-25": [
      {
        "text": "**Structure-function relationships** in aphasia data can be **formalized** using MRI data. **Voxel-based lesion-symptom mapping**, from Bates, Wilson, Saygin, Dick, Sereno, Knight and Dronkers, relates the location of brain damage to the severity of symptoms across many patients.",
        "children": [
          "A **voxel** is a small three-dimensional unit of an MRI brain image, like a 3D pixel.",
          "For each voxel, patients with damage there are compared with patients without damage there.",
          "If damaged patients score much worse, that voxel is associated with the symptom. The colors in the maps, from blue for weaker to red for stronger, mark how strong that association is."
        ]
      },
      {
        "text": "The **“symptoms”** here are **defined very broadly**.",
        "children": [
          "Maps **(a) through (c)** mark regions likely to be damaged in individuals with **fluency deficits**. The strongest associations fall in the front part of the left hemisphere.",
          "Maps **(d) through (f)** mark regions associated with **comprehension deficits**. The strongest associations fall farther back, in the posterior temporal region."
        ]
      },
      {
        "text": "**Data from a large number of patients is consistent with a rough double dissociation**.",
        "children": [
          "**Posterior regions** are associated with **perception**, or comprehension.",
          "**Anterior regions** are associated with **production**, or fluency.",
          "Because each patient contributes both a damage pattern and a continuous score, the method turns many individual cases into one statistical map linking brain location to symptoms."
        ]
      }
    ],
    "development1-01": [],
    "development1-02": [
      {
        "text": "**Nature and nurture in child language** concerns how much of language comes from built-in capacities and how much comes from experience. **“Nativist” positions** grew out of **Chomsky’s critique of Skinner**.",
        "children": [
          "**Skinner** was a behaviorist who explained behavior, including language, through general learning mechanisms such as reward and punishment.",
          "**Chomsky** argued that these mechanisms could not explain how children acquire grammar."
        ]
      },
      {
        "text": "For Chomsky, **the important feature of language is its generativity**. **Generativity** is the ability to produce and understand an unlimited number of new sentences.",
        "children": [
          "**Acquiring a language** means **identifying the abstract grammar that produces the sentences of the language**."
        ]
      },
      {
        "text": "The **general learning mechanisms studied by behaviorists were not up to this task**, for two reasons.",
        "children": [
          "**Grammatical and ungrammatical sentences are not “similar” in any straightforward way**. A tiny change can make a sentence ungrammatical, while two grammatical sentences can look completely different.",
          "**The context for language acquisition does not look like operant conditioning**. **Operant conditioning** shapes behavior through rewards and punishments that follow it. Children are not reliably rewarded for grammatical sentences or punished for ungrammatical ones, so the **reward and punishment contingencies do not hold**."
        ]
      },
      {
        "text": "Instead, **nativist approaches** assert two things.",
        "children": [
          "Children have **innate knowledge of what language is like**, called **Universal Grammar**, a built-in set of principles that limits which grammars a child will consider.",
          "Children use **language-specific acquisition processes**, meaning learning mechanisms designed specifically for language."
        ]
      },
      {
        "text": "Chomsky put it this way. **“The fact that all normal children acquire essentially comparable grammars of great complexity with remarkable rapidity suggests that human beings are somehow specially designed to do this, with data-handling or ‘hypothesis-formulating’ ability of unknown character and complexity.”**",
        "children": [
          "Every typical child arrives at a complex grammar quickly, despite very different experiences."
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
        "text": "The classic evidence comes from a synthetic consonant continuum.",
        "children": [
          "The upper formant transitions change in equal steps across fourteen stimuli, while the lower formant stays the same.",
          "In the **labeling data**, listeners switch sharply from **/b/** to **/d/** around stimuli 4 and 5, and from /d/ to **/g/** around stimuli 9 and 10.",
          "In the **one-step, two-step and three-step discrimination** results, accuracy peaks near those boundaries and falls lower inside each category. The solid line marks obtained accuracy and the dashed line marks accuracy predicted from labeling."
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
        "text": "**Categorical perception in infants** can be tested using behaviors that change when an infant notices something new. Head turns and sucking reveal what an infant hears without any need for words.",
        "children": []
      },
      {
        "text": "The **conditioned head turn procedure**, pictured in a photo from Janet Werker’s infant studies lab, trains an infant to turn toward a sound when it changes.",
        "children": [
          "The infant sits on a parent’s lap while an experimenter keeps the infant’s attention forward with toys.",
          "When the sound changes, a correct head turn is rewarded by an interesting visual display, such as a lighted, moving toy.",
          "Once the infant learns this link, a head turn after a sound change is evidence that the infant heard the change."
        ]
      },
      {
        "text": "**High-amplitude sucking** is a second method, which relies on the infant’s natural response to something new.",
        "children": [
          "The infant sucks on a pacifier connected to a pressure recorder, and strong sucks trigger the presentation of a sound.",
          "As one sound is repeated, the infant becomes used to it, which is called **habituation**, and sucking slows down.",
          "If a new sound makes sucking **increase again**, the infant has noticed the change."
        ]
      },
      {
        "text": "Neither method requires the infant to name or produce sounds. The experimenter controls exactly which acoustic difference is presented, and the infant’s head turn or renewed sucking reveals whether infants hear the same distinctions that adults hear.",
        "children": []
      }
    ],
    "development1-05": [
      {
        "text": "**Eimas and colleagues (1971)** tested categorical perception in **4-month-old infants** using **high-amplitude sucking**. The acoustic dimension was **voice onset time**, or **VOT**, the delay between the release of a stop consonant and the start of vocal fold vibration.",
        "children": [
          "Spectrograms compare syllables with VOTs of **+10 milliseconds** and **+100 milliseconds**. With the longer VOT, voicing starts much later after the release, with the first formant cut back at the start."
        ]
      },
      {
        "text": "In the main experiment, there were **three conditions**. Infants heard a syllable repeatedly until sucking declined, and then the sound changed or stayed the same.",
        "children": [
          "In **20D**, the two stimuli differed by **20 milliseconds** of VOT, **+20 versus +40 milliseconds**, and came from **different adult phonemic categories**.",
          "In **20S**, the stimuli also differed by **20 milliseconds**, either **−20 versus 0** or **+60 versus +80 milliseconds**, but came from the **same** phonemic category.",
          "In **0**, the **control** condition, the same stimulus continued throughout."
        ]
      },
      {
        "text": "The graph plots the **mean number of sucking responses per minute**, with time measured from the stimulus shift. The letter **B** marks the baseline rate, and a dashed line marks the shift.",
        "children": [
          "In every condition, sucking rose above baseline and then declined before the shift.",
          "In **20D**, sucking jumped back up after the shift, to around 50 responses per minute.",
          "In **20S**, sucking showed little recovery and continued downward.",
          "In **0**, sucking kept declining, down to about 15 responses per minute."
        ]
      },
      {
        "text": "Infants responded to the change that crossed an adult phoneme boundary but not to the equally large change within a category.",
        "children": [
          "The two changed conditions were matched in acoustic size, so the difference comes from crossing the boundary.",
          "The control condition establishes what happens with continued repetition alone."
        ]
      }
    ],
    "development1-06": [
      {
        "text": "Eimas’s finding was **a big deal** for several reasons. **Categorical perception was considered to be the first step in turning speech into a symbolic format** that later linguistic processes could use.",
        "children": [
          "A **symbolic** format represents a sound as a category, such as /b/.",
          "Finding this ability in infants suggested that the starting point for language processing was already in place."
        ]
      },
      {
        "text": "**Four-month-olds are really little**. Some **gross motor milestones** at that age are **manipulating objects with two hands** and **holding the head and chest up while lying prone**, meaning face down.",
        "children": [
          "Gross motor skills involve large body movements."
        ]
      },
      {
        "text": "Their **color vision and general visual acuity are still “in progress.”** **Visual acuity** is the sharpness of vision.",
        "children": [
          "Basic perceptual abilities in other areas are still maturing."
        ]
      },
      {
        "text": "Four-month-olds are also **just starting to produce vowel-like sounds instead of creaky whines**. They cannot yet produce speech sounds well at all.",
        "children": []
      },
      {
        "text": "This is **very, very early in development for an apparently language-specific ability to emerge**, so it **seemed like evidence for innateness**.",
        "children": [
          "Infants categorize speech sounds before they can produce them, while other abilities are still immature.",
          "Speech categorization seemed far ahead of other developing skills, so it appeared to be built in rather than learned through long experience."
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
        "text": "The bar graph gives the **percentage of infants reaching the discrimination criterion** at each age.",
        "children": [
          "At **6–8 months**, about **95%** of English-learning infants discriminated the Hindi contrast and about **80%** discriminated the Salish contrast.",
          "At **8–10 months**, these fell to about **67%** and **52%**.",
          "At **10–12 months**, they fell to about **20%** and **10%**.",
          "**Hindi- and Salish-learning infants** discriminated their native contrast close to **100%** of the time."
        ]
      },
      {
        "text": "The figure describes **perceptual reorganization during the first year of life**.",
        "children": [
          "Without experience of a contrast, English-learning infants lose much of their ability to discriminate it by about their first birthday.",
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
        "text": "There is **a very compelling narrative** built from these findings.",
        "children": [
          "**Speech perception depends on categorical perception abilities that are a special property of the language system**.",
          "**These abilities are present very early in development**, as the infant studies suggest."
        ]
      },
      {
        "text": "**Children start off as “citizens of the world,”** able to hear **all** contrasts. This means **they have innate, language-general knowledge about speech**.",
        "children": [
          "**Language-general** means the knowledge applies to the speech sounds of every language.",
          "“Citizens of the world” captures the idea that a newborn is ready to learn any human language.",
          "Children then **rapidly tune their perceptual systems to the specific language in their environment**."
        ]
      },
      {
        "text": "Under this narrative, **the role of learning is to select** among the many possible **innately specified phonetic contrasts** and **narrow down the inventory** to just those that are **meaningful in the child’s native language**.",
        "children": [
          "An **inventory** here is the full set of phonetic contrasts the child can perceive.",
          "Learning is a process of elimination. It removes the contrasts the native language does not use and keeps the innate categories that the language needs."
        ]
      }
    ],
    "development1-09": [
      {
        "text": "There are **some problems for this view**. For **categorical perception**, three issues stand out.",
        "children": [
          "Categorical perception is **not limited to language**. It also occurs for nonspeech sounds, so the mechanism extends beyond language.",
          "Categorical perception is **not limited to humans**. Animals without language also show categorical patterns for speech sounds.",
          "Categorical perception is **task-dependent**. How categorical the results look depends on what the listener is asked to do, such as naming a sound versus judging whether two sounds differ."
        ]
      },
      {
        "text": "For **infant speech perception**, the issue is that it is **not actually “universal.”**",
        "children": [
          "Infants do not start out able to hear every contrast equally well.",
          "Some contrasts are hard for infants to detect early on, even when those contrasts occur in their own language."
        ]
      },
      {
        "text": "Together, these issues challenge the claim that every speech distinction is innately available in a mechanism devoted only to language. An account of development must explain contrasts that improve with experience as well as contrasts that are lost, so learning has to build categories as well as remove them.",
        "children": []
      }
    ],
    "development1-10": [
      {
        "text": "**Cutting and Rosner (1974)** tested categorical perception with **non-speech sounds**. The dimension they varied was **rise time**, which is how quickly a sound grows to full loudness after it starts.",
        "children": [
          "A **short rise time** produces a sound like a **plucked** string.",
          "A **long rise time** produces a sound like a **bowed** string."
        ]
      },
      {
        "text": "The stimuli included **sawtooth waves**, **speech syllables** and **sine waves**, displayed as **oscillograms**, which are plots of the sound wave over time.",
        "children": [
          "Each kind of sound was made with a **10-millisecond** rise time and a **70-millisecond** rise time.",
          "With a 10-millisecond rise, the wave reaches full size almost immediately. With a 70-millisecond rise, it grows gradually."
        ]
      },
      {
        "text": "The results for **sawtooth waves** plot identification and discrimination against rise time from 0 to 80 milliseconds.",
        "children": [
          "**Pluck responses** start near 100% at short rise times and drop steeply between about 30 and 50 milliseconds. **Bow responses** rise in the same region to near 100% at long rise times.",
          "**Discrimination** of pairs 10 milliseconds apart stays near 55 to 60% for most pairs. It **peaks near 75%** for pairs around 30 to 50 milliseconds, where the labels switch."
        ]
      },
      {
        "text": "The link between a label boundary and better discrimination appears for a sound distinction that has nothing to do with phonemes.",
        "children": [
          "Pluck and bow are perceptual labels for kinds of sound onsets, not speech categories.",
          "Categorical perception can therefore arise in general auditory processing, without a mechanism specific to language."
        ]
      }
    ],
    "development1-11": [
      {
        "text": "**Jusczyk and colleagues (1977)** tested whether **infants** show categorical perception of **non-speech sounds**, using high-amplitude sucking.",
        "children": [
          "Infants heard a sound repeatedly until sucking declined.",
          "The sound was then shifted, and three conditions were compared."
        ]
      },
      {
        "text": "The conditions were **no change**, a change **within categories**, and a change **between categories**. Each graph plots **mean sucking rates** per minute, with time measured from the shift, marked by a vertical dashed line, and the baseline rate marked by the letter **B**.",
        "children": [
          "In all three conditions, sucking started near 20 per minute and declined to about 12 before the shift.",
          "After **no change**, sucking stayed near 12.",
          "After a **within-category** change, sucking also stayed near 12.",
          "After a **between-category** change, sucking jumped back up to about 18 and then declined again."
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
          "The chinchillas learned that either the **0-millisecond lag** stimulus or the **80-millisecond lag** stimulus was an **SD** for food. **SD** stands for **discriminative stimulus**, a signal that a response will be rewarded.",
          "The lag is the **voice onset time**. Humans hear a 0-millisecond lag as /ga/ and an 80-millisecond lag as /ka/."
        ]
      },
      {
        "text": "After training, the animals were tested with **intermediate VOTs** along the **/ga/–/ka/** continuum. The graphs plot the **proportion of stimuli labeled /ga/** against VOT from 0 to 120 milliseconds for two chinchillas, C1 and C3, and two human listeners, S3 and S4.",
        "children": [
          "Separate curves cover a 0–80 millisecond continuum, a 0–120 millisecond continuum and stimuli with an **enhanced burst**.",
          "In every panel, /ga/ responses stay near 1 at short VOTs and then fall steeply to near 0, mostly between about 30 and 70 milliseconds.",
          "The chinchilla curves have the same steep categorical shape as the human curves."
        ]
      },
      {
        "text": "**Increasing the intensity of the burst and aspiration noise** shifted the category boundary to a **shorter VOT**, made the curve steeper, or both, for one chinchilla and one human listener.",
        "children": [
          "The **burst** is the brief noise at the release of a stop, and **aspiration** is the breathy noise that follows a voiceless release.",
          "Both species responded to these acoustic properties in a similar way.",
          "Animals without language sort a speech continuum into categories, so categorical perception of speech is shared with other species."
        ]
      }
    ],
    "development1-13": [
      {
        "text": "**Some contrasts are less salient than others for infants**, according to **Narayan and colleagues (2010)**. A **salient** contrast is one that is easy to notice.",
        "children": [
          "The contrasts involve **nasal consonants** at the start of a syllable, which is the **onset**.",
          "They differ in **place of articulation**, which is where in the mouth the sound is made. **/m/** is made with the lips, **/n/** with the tongue behind the teeth, and **/ŋ/**, the final sound in “sing,” with the back of the tongue against the soft palate."
        ]
      },
      {
        "text": "Infants’ **looking time** was compared on **same** trials, where the syllable did not change, and **change** trials, where it switched. Longer looking on change trials is evidence that the infant noticed the change. Error bars mark the standard error.",
        "children": [
          "For the native **[ma]–[na]** contrast, English-hearing infants at **4–5 months** looked about 3.3 seconds on same trials and about 5.4 seconds on change trials.",
          "For the nonnative **[na]–[ŋa]** contrast, the same infants looked about 4.5 seconds on same trials and about 4.2 seconds on change trials, with no increase for the change."
        ]
      },
      {
        "text": "A **place contrast for nasals in onset**, **/na/–/ŋa/**, is **not readily perceived by four-month-olds, independent of language experience**.",
        "children": [
          "In contrast, **/ma/–/na/** is **relatively salient**.",
          "The difference lies in the sounds themselves. Some contrasts are acoustically harder to detect than others from the start, which challenges the idea that all contrasts begin equally available."
        ]
      }
    ],
    "development1-14": [
      {
        "text": "**Between 6 and 10 months, exposure to the /na/–/ŋa/ contrast in a Filipino language environment increases its salience**, according to **Narayan and colleagues (2010)**. In Filipino, [na] and [ŋa] are different syllables, so Filipino-learning infants hear this contrast regularly.",
        "children": [
          "At **6–8 months**, Filipino-learning infants looked about 3.8 seconds on both same and change trials, so the change had no measurable effect.",
          "At **10–12 months**, looking rose from about 3.3 seconds on same trials to about 4.8 seconds on change trials.",
          "English-hearing infants at 4–5 months showed no response to this contrast, while they did respond to [ma]–[na]."
        ]
      },
      {
        "text": "**It cannot be that all speech contrasts are available innately**.",
        "children": [
          "The [na]–[ŋa] contrast is weak at the start, even for infants whose language uses it.",
          "Experience with the contrast improves sensitivity over the first year."
        ]
      },
      {
        "text": "**Exposure to contrasts in the environment is necessary for acquisition in some cases**.",
        "children": [
          "Learning can strengthen a contrast as well as preserve it.",
          "Development includes building up sensitivity to hard contrasts, beyond selecting from a complete innate inventory, so experience plays an active role in shaping speech categories."
        ]
      }
    ],
    "development1-15": [
      {
        "text": "The alternative to the nativist approach is the **emergentist approach**. **Emergentist approaches assume that associative learning mechanisms are sensitive to statistical regularities in the environment**.",
        "children": [
          "**Associative learning** is learning that two things go together because they repeatedly occur together.",
          "**Statistical regularities** are patterns in how often things occur and which things occur together.",
          "In an emergentist view, language structure emerges from general learning mechanisms working on these patterns in rich input."
        ]
      },
      {
        "text": "Classical conditioning is the simplest example of associative learning. The neural diagram has three neurons, a **bell** neuron, a **food detector** neuron and a **salivation** neuron.",
        "children": [
          "The food detector already connects strongly to salivation, so food produces salivation.",
          "When the bell repeatedly occurs together with food, the **synapse** between the bell neuron and the salivation neuron is **strengthened**. A synapse is a connection between neurons.",
          "After enough pairings, the bell alone can produce salivation."
        ]
      },
      {
        "text": "The question is **how this can extend beyond conditioning to support learning for pattern recognition**. **Pattern recognition** is the ability to identify a recurring structure, such as a speech sound, across many varied examples.",
        "children": [
          "The same strengthening of connections could link acoustic features that tend to occur together.",
          "Repeated co-occurrence in speech could then build up categories without every category being specified beforehand. Infants would learn categories by tracking which sounds occur together and how often."
        ]
      }
    ],
    "development1-16": [
      {
        "text": "The **American vowels** offer an example of statistical regularities. When **Kuhl and others** talk about **learning the statistics of distributions in the environment**, they mean things like this. A **distribution** describes how often each value occurs across many examples.",
        "children": []
      },
      {
        "text": "The plot, titled “Why is speech categorization difficult?”, places many vowel tokens in a **vowel space** defined by the **first formant** on the horizontal axis, from 300 to 1,200 Hz, and the **second formant** on the vertical axis, from 600 to 3,400 Hz.",
        "children": [
          "Each colored dot is one production of a vowel.",
          "Each vowel forms a cloud of dots, enclosed by an oval.",
          "The ovals **overlap** heavily, so a single pair of formant values can belong to more than one vowel. Listeners must learn where each vowel’s cloud is centered and how far it spreads."
        ]
      },
      {
        "text": "**We might learn the vowels of our language by extracting the statistics of these distributions**.",
        "children": [
          "Over many exposures, the listener tracks where tokens of each vowel tend to cluster.",
          "The categories reflect the shape of the input."
        ]
      },
      {
        "text": "A **“prototypical” /a/** would then be **just the mean, or perhaps the mode, of the distribution of all the /a/ sounds we hear**.",
        "children": [
          "The **mean** is the average of all the values.",
          "The **mode** is the most frequent value.",
          "Either way, the prototype comes from experience, so it can differ across languages and listeners."
        ]
      }
    ],
    "development1-17": [
      {
        "text": "**Maye and colleagues** tested whether infants actually learn from distributions. They had infants **listen passively** to stimuli from a **[da]–[ta] continuum** of eight steps that differed in **voice onset time**. Passive listening means the infants simply heard the sounds, with no task or reward.",
        "children": []
      },
      {
        "text": "The two groups heard different **distributions** during familiarization. The graph plots how often each stimulus was presented.",
        "children": [
          "The **dashed line** marks a **bimodal distribution**. Stimuli 2 and 7 were presented most often, 16 times each, while the middle stimuli were rare. Two peaks give **evidence for two different categories**.",
          "The **solid line** marks a **unimodal distribution**. Stimuli 4 and 5 in the middle were presented most often, while the ends were rare. One peak gives **evidence for a single category**."
        ]
      },
      {
        "text": "**At test, infants heard stimuli 3 and 6** in either **alternating** or **non-alternating** trials.",
        "children": [
          "In alternating trials, the two stimuli switched back and forth. In non-alternating trials, one stimulus repeated.",
          "If infants treat 3 and 6 as different, the two kinds of trials should hold their attention differently."
        ]
      },
      {
        "text": "The table gives **mean looking times** in seconds.",
        "children": [
          "**Six-month-olds after unimodal exposure** looked 4.85 seconds on alternating trials and 4.53 seconds on non-alternating trials.",
          "**Eight-month-olds after unimodal exposure** looked 4.98 and 5.20 seconds.",
          "**Six-month-olds after bimodal exposure** looked 5.66 and 6.41 seconds.",
          "**Eight-month-olds after bimodal exposure** looked 5.45 and 6.15 seconds."
        ]
      },
      {
        "text": "**Only infants pre-exposed to the bimodal distribution were sensitive to the difference between conditions**.",
        "children": [
          "It is **as if the infants in the unimodal condition had learned to treat stimuli 3 and 6 as members of the same category**.",
          "A few minutes of exposure to a distribution changed how infants grouped the sounds, which supports statistical learning of speech categories."
        ]
      }
    ],
    "development1-18": [
      {
        "text": "There is experimental evidence that **social interaction is important for learning**. **Nine-month-old American infants** were exposed to **Mandarin Chinese** in **twelve 25-minute sessions**.",
        "children": [
          "Some infants had **live exposure**, with a Mandarin speaker playing and reading with them in person. Others heard Mandarin through **auditory or audiovisual** recordings, and controls had English.",
          "On a **Mandarin phonetic contrast** tested with the **head-turn technique**, infants with **live Mandarin exposure** scored about **65% correct**, above the English control group at about **56%**.",
          "Infants with **TV** or **audio** exposure scored like controls.",
          "**The same exposure to a Mandarin speaker is more effective for learning when it happens in person and is interactive than when it is viewed as a video**."
        ]
      },
      {
        "text": "A second experiment manipulated **social responses**. **Eight-month-old infants** received feedback from their mothers in response to their vocalizations.",
        "children": [
          "In the **contingent condition**, mothers responded right after the infant vocalized.",
          "In the **yoked-control condition**, mothers responded on a schedule copied from another infant, so the responses were **noncontingent**.",
          "Each session had a familiarization phase of 30 minutes, then a 10-minute baseline, a 10-minute social response phase and a 10-minute **extinction** phase, in which responses stopped."
        ]
      },
      {
        "text": "The graph plots the **proportion of syllables** among the infants’ vocalizations.",
        "children": [
          "At baseline, both groups produced about 0.05 to 0.08.",
          "During social response, the **contingent** group rose to about **0.32**, while the noncontingent group stayed near **0.05**.",
          "During extinction, the contingent group stayed higher at about 0.2, compared with about 0.1.",
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
        "text": "**Statistical learning with constraints** describes learning from patterns in the input that is guided and limited in several ways. **Constraints** can mean a lot of things.",
        "children": [
          "First, constraints on **which stimulus properties can be contrastive**. A **contrastive** property is one that distinguishes words, such as voicing in /b/ versus /p/. Properties such as **speaker** identity and **speech rate** change the sound a great deal but do not change which word is said, so they are **not** contrastive.",
          "A learner tracking every statistical pattern would create categories for different voices and speeds. Learning has to focus on the properties that matter for meaning."
        ]
      },
      {
        "text": "Second, constraints **based on earlier learning**.",
        "children": [
          "What a learner has already acquired shapes what is easy to learn next.",
          "Once native categories are in place, new distinctions that cut across them become harder to notice and learn. Constraints of this kind are central to **sensitive periods**, in which earlier experience limits later learning."
        ]
      },
      {
        "text": "Third, **social and interactive contexts for learning**.",
        "children": [
          "The same sounds are learned more effectively in live, responsive interaction than from a recording.",
          "Contingent responses from caregivers shape infants’ own vocal behavior."
        ]
      },
      {
        "text": "Learning therefore depends on the patterns in the input, on what the learner already knows, and on the social situation in which the input arrives. These constraints help explain why learning is fast and why it focuses on the distinctions that matter.",
        "children": []
      }
    ],
    "development2-01": [],
    "development2-02": [
      {
        "text": "Speech is **messy**. **There are no physical boundaries between words** in the speech signal. **Word segmentation** is the process of finding where one word ends and the next begins in continuous speech.",
        "children": [
          "The spectrogram of the utterance **“I hope it’s in my desk”** runs from 0 to about 1,800 milliseconds, with a pitch track drawn above it and the speech sounds transcribed along the top.",
          "The dark energy of one word runs straight into the energy of the next, with no blank space separating them."
        ]
      },
      {
        "text": "**Where there are pauses in the speech stream, they come from closures that are as likely to happen within words as between them**.",
        "children": [
          "A **closure** is a moment when the vocal tract is completely blocked, as during the consonants /p/, /t/, /d/ and /k/. While the tract is closed, almost no sound comes out, so a short silence appears.",
          "In “hope” and “it’s,” such silences fall inside or at the edges of words in ways that do not line up with word boundaries.",
          "Treating every silence as a word boundary would chop some words in half and run others together."
        ]
      },
      {
        "text": "**We are nonetheless really good at finding words in this “sea of sounds.”** Listeners hear separate words without effort, even though the signal does not mark them.",
        "children": [
          "The **harder question** is **how we learn to do this**.",
          "An adult can use knowledge of words already known, but an infant has to discover the words in the stream before learning what they mean."
        ]
      }
    ],
    "development2-03": [
      {
        "text": "There are **several cues to word boundaries**, though none works for every word.",
        "children": [
          "Some words **appear in isolation**, as in **“Hello.” “No.” “Please.” “Go.” “Stop.”** **Not all words** are heard this way."
        ]
      },
      {
        "text": "**Phonotactics** is the set of patterns governing which sequences of sounds occur in a language. **Some sequences of phonemes are very unlikely to occur within words**.",
        "children": [
          "In **“wordboundary,”** the sequence /db/ rarely occurs inside an English word, so it hints at a boundary between word and boundary.",
          "In **“speechcode,”** the sequence /tʃk/ marks a boundary in the same way.",
          "**“Movement”** is a caution. It contains the sequence /vm/, which might look like a boundary, but movement is a single word."
        ]
      },
      {
        "text": "**Stress patterns** offer another cue. **In English, most words are stressed on the first syllable**, from **Jusczyk and colleagues (1999)**. **Stress** makes a syllable louder, longer or higher.",
        "children": [
          "Jusczyk and colleagues familiarized **7.5-month-old infants** with a word and then played them passages. The **kingdom passage** repeats “kingdom,” as in “Your kingdom is in a faraway place. The prince used to sail to that kingdom when he came home from school.” The **device passage** repeats “device,” as in “Your device can do a lot. Her device only fixes things. My new red device makes ice cream.”",
          "Infants familiarized with **“kingdom,”** stressed on its first syllable, **showed a preference for the kingdom passage**.",
          "Infants familiarized with **“device,”** stressed on its second syllable, **did not show the same kind of preference**."
        ]
      },
      {
        "text": "In connected speech, **stress may help signal the beginnings of words**. An infant who treats each stressed syllable as a word beginning will find kingdom easily but will split device in the wrong place.",
        "children": [
          "**This will not work in every language, or for every word in English**, because languages differ in where they place stress."
        ]
      }
    ],
    "development2-04": [
      {
        "text": "**Transitional probabilities** provide another cue to word boundaries, through **statistical learning**. **Statistical learning** is learning from the patterns of how often things occur together.",
        "children": [
          "Consider the phrase **“pretty baby.”**"
        ]
      },
      {
        "text": "Across English words, the syllable **/ti/** is **very strongly predicted by the syllable /prɪ/**.",
        "children": [
          "When a listener hears “pre,” the next syllable is very often “ty,” because pretty is a common word.",
          "This is **less likely to be true for syllable pairs across words**. After “ty,” many different words can follow, so “ba” is not well predicted."
        ]
      },
      {
        "text": "The comparison can be written as a relationship between frequencies, where **f** means frequency of occurrence.",
        "children": [
          "The frequency of “pretty” divided by the frequency of “pre” is the probability that “pre” is followed by “ty.”",
          "The frequency of “tyba” divided by the frequency of “ty” is the probability that “ty” is followed by “ba.” \\[\\frac{f(\\mathrm{pretty})}{f(\\mathrm{pre})}\\gg\\frac{f(\\mathrm{tyba})}{f(\\mathrm{ty})}\\]",
          "The first value is much greater than the second. The syllables inside pretty predict each other strongly, while the syllables across the boundary between pretty and baby predict each other weakly."
        ]
      },
      {
        "text": "A learner who keeps track of how often each syllable follows each other syllable can therefore find the joints in the speech stream. Pairs inside words recur together again and again, while pairs across word boundaries recur much less reliably.",
        "children": []
      }
    ],
    "development2-05": [
      {
        "text": "Put more abstractly, **the likelihood of syllable B following syllable A is greater within words than between words**. This likelihood is the **transitional probability** from A to B.",
        "children": [
          "Inside a word, the same syllables always appear in the same order, so the probability is high.",
          "At a word boundary, the next word can be almost anything, so the probability is lower.",
          "A dip in transitional probability is therefore a good guess for where a word boundary falls."
        ]
      },
      {
        "text": "**Of course this is probabilistic**, meaning it works most of the time but not always.",
        "children": [
          "**“What’s that in the road a/head?”** can be heard as “a head” or “ahead.” The sounds are the same, so the listener settles the boundary using the meaning of the whole sentence.",
          "**“I scream, you scream, we all scream for ice cream”** plays on the fact that “I scream” and “ice cream” contain nearly the same sounds. The same sequence can be divided into words in two ways."
        ]
      },
      {
        "text": "Transitional probabilities shift the odds toward one segmentation or another, alongside stress, phonotactics and isolated words.",
        "children": [
          "When cues agree, segmentation is easy.",
          "When cues conflict or are missing, as in a head versus ahead, the listener relies on context to settle the boundary."
        ]
      }
    ],
    "development2-06": [
      {
        "text": "**Saffran and colleagues (1996)** isolated **statistical information from other cues** to test whether transitional probabilities alone can be used to identify words. To do this, the stimuli were **tightly controlled**.",
        "children": [
          "The speech was **monotone**, with **no changes in pitch, duration or amplitude**. Amplitude is loudness. Without these changes, stress could not mark word beginnings.",
          "The syllables were **simple CV syllables**, each one consonant followed by one vowel. With only CV syllables, there were **no phonotactic cues** to word boundaries, because no unusual consonant clusters appeared.",
          "The syllables were **presented continuously**, with **no pauses**, so silence could not mark the boundaries."
        ]
      },
      {
        "text": "The researchers created an **artificial language** made of **three-syllable “words,”** such as **tokibu, gikoba** and **gopila**.",
        "children": [
          "The words were strung together in random order into one long stream.",
          "The only information about where words began and ended was in the transitional probabilities between syllables."
        ]
      },
      {
        "text": "If infants could still find the words, transitional probabilities must be enough on their own. The design isolates the one cue being tested.",
        "children": []
      }
    ],
    "development2-07": [
      {
        "text": "The artificial language stream runs together with no breaks, as in **“tokibugikobagopilatipolutokibu,” “gopilatipolutokibugikobagopila,”** and **“gikobatokibugopilatipolugikoba.”**",
        "children": [
          "This is the kind of input the infant receives, with no spaces and no pauses.",
          "The four words, tokibu, gikoba, gopila and tipolu, are hidden inside the stream, and each repeats many times in random order."
        ]
      },
      {
        "text": "Even without any marked boundaries, the syllables follow regular patterns.",
        "children": [
          "Within **tokibu**, “to” is always followed by “ki,” and “ki” is always followed by “bu.”",
          "After “bu,” however, the stream can continue with “gi,” “go” or “ti,” depending on which word comes next."
        ]
      },
      {
        "text": "The stream contains all the information needed to find the words.",
        "children": [
          "A learner who tracks which syllables follow which can discover that some pairs are completely predictable while others are not.",
          "The words emerge from the statistics of the sequence."
        ]
      }
    ],
    "development2-08": [
      {
        "text": "In the color-coded version of the same stream, each word has its own color, with **tokibu** in red, **gikoba** in green, **gopila** in pink and **tipolu** in purple.",
        "children": [
          "The colors make the four words visible to the eye.",
          "The infant hears no colors. It hears only the continuous stream of syllables."
        ]
      },
      {
        "text": "Each word keeps its internal order every time it appears, while its neighbors change.",
        "children": [
          "“To-ki-bu” always comes in that order, but tokibu can be followed by gikoba, gopila or tipolu.",
          "The transitional probabilities inside each word are therefore high, while those across word boundaries are lower."
        ]
      },
      {
        "text": "The boundaries the colors mark are exactly the places where transitional probability drops.",
        "children": [
          "The signal itself has no spaces.",
          "Tracking that drop in predictability is how the learner recovers where one word ends and another begins."
        ]
      }
    ],
    "development2-09": [
      {
        "text": "**Testing for an effect of transitional probabilities** requires some care. **After listening to a long stream of syllables, it is trivial to show that infants are more familiar with sequences they have heard than ones they have not**. A preference for heard sequences could come from simple familiarity, without any use of transitional probabilities.",
        "children": []
      },
      {
        "text": "**Two additional details** rule this out.",
        "children": [
          "**Half of the words were repeated more frequently than the other half**.",
          "The test compared words against **“part-words”** that were **matched for frequency of occurrence** with real words. A **part-word** is a three-syllable sequence that crosses a word boundary, made of the end of one word and the beginning of the next."
        ]
      },
      {
        "text": "In the example stream **“tokibu gikoba gopila gikoba tokibu gopila tokibu gikoba gikoba tokibu,”** the word **GOPILA** and the part-word **BU-GIKO** both appear **twice**. Their overall frequencies are the same, while their transitional probabilities differ.",
        "children": []
      },
      {
        "text": "The transitional probability of **GI given BU** is **2 out of 4**.",
        "children": [
          "BU appears four times, at the end of each tokibu, but is followed by GI only twice. \\[\\frac{2}{4}=0.5\\]",
          "The transitional probabilities inside **GOPILA** are **both 2 out of 2**. GO is followed by PI both times, and PI is followed by LA both times. \\[\\frac{2}{2}=1\\]"
        ]
      },
      {
        "text": "If infants treat gopila differently from bu-giko, they are sensitive to transitional probabilities. Matching the frequencies removes the familiarity explanation, so any difference must come from how predictable the syllables are.",
        "children": []
      }
    ],
    "development2-10": [
      {
        "text": "The test produced **a novelty effect**. **Infants looked longer in the direction of “part-word” stimuli**.",
        "children": [
          "The bar graph gives mean looking time in seconds. Words received about **6.8 seconds** of looking, and part-words about **7.6 seconds**.",
          "An asterisk marks the difference as statistically significant."
        ]
      },
      {
        "text": "Longer looking toward part-words is a **novelty preference**.",
        "children": [
          "Infants often look longer at things that seem new.",
          "The words had become familiar during exposure, so they held less interest. The part-words seemed less familiar, even though they had been heard just as often."
        ]
      },
      {
        "text": "This suggests that infants **had learned the statistical regularities of the speech stream**, and **were not merely picking up on simple frequency of occurrence**.",
        "children": [
          "Words and part-words were matched for frequency, so the difference comes from the transitional probabilities that distinguished them.",
          "In a short exposure, infants extracted units from a continuous stream using only the predictability of syllable sequences."
        ]
      }
    ],
    "development2-11": [
      {
        "text": "**Identifying word referents** is the next problem. Once children can **“find” the words** in speech, **how do they learn what they mean?** A **referent** is the thing a word refers to.",
        "children": [
          "A child might hear the word **“cat”** while looking at a cat.",
          "Recognizing the sound pattern “cat” is one achievement. Knowing that it names the furry animal is another."
        ]
      },
      {
        "text": "Segmentation recovers a recurring unit of sound but says nothing about its meaning.",
        "children": [
          "Any scene contains many objects, parts, properties and actions.",
          "The learner needs further evidence to work out which of these the speaker means."
        ]
      },
      {
        "text": "Word learning therefore requires additional evidence about reference. The child has to connect the word form with the speaker’s intended meaning, using evidence from the situation in which the word is used.",
        "children": []
      }
    ],
    "development2-12": [
      {
        "text": "**The inductive problem of early word learning** is that any single experience is compatible with many possible meanings. **Induction** is reasoning from specific examples to a general rule, and here the rule is the meaning of a word.",
        "children": [
          "A child hears a new word while looking at a cat. The word could mean **CAT**, **ANIMAL** or **PET**, which are categories at different levels.",
          "It could mean **FELIX**, the name of this particular cat.",
          "It could mean a property such as **FURRY** or **ALIVE**, an action such as **WALKING**, or a part such as **WHISKERS** or **LEG**."
        ]
      },
      {
        "text": "The set of possible meanings is called the **hypothesis space**.",
        "children": [
          "Every one of these candidates is consistent with what the child sees.",
          "Nothing in the single scene picks out which one the speaker intends."
        ]
      },
      {
        "text": "This is a version of **Quine’s “gavagai” problem**.",
        "children": [
          "In Quine’s example, a linguist visiting an unknown language hears a speaker say “gavagai” while a rabbit runs past.",
          "“Gavagai” could mean rabbit, but it could also mean undetached rabbit parts, a stage of a rabbit or something else entirely.",
          "Children face this problem with every new word and still learn words quickly. Joint attention, intentional cues and default word-learning strategies narrow the possibilities."
        ]
      }
    ],
    "development2-13": [
      {
        "text": "One way children acquire word meanings is through **joint attention**. Joint attention is **sharing an attentional focus with another person**.",
        "children": [
          "The drawing has two figures looking and pointing at the same object, with arrows linking each figure to the object and to the other figure.",
          "Each person knows that the other is attending to the same thing."
        ]
      },
      {
        "text": "**Gaze following emerges around 9 months of age**.",
        "children": [
          "**Gaze following** is looking where another person is looking.",
          "When an adult looks at an object, the infant follows the adult’s eyes to that object."
        ]
      },
      {
        "text": "Gaze following **signals an understanding of reference**.",
        "children": [
          "The infant understands that the adult’s attention is directed at something specific.",
          "When the adult then says a word, the object of shared attention becomes the most likely referent. Joint attention narrows the hypothesis space by linking the word to what the speaker is attending to."
        ]
      }
    ],
    "development2-14": [
      {
        "text": "**Joint attention optimizes word learning**, according to **Baldwin and colleagues**. Two groups of infants heard a novel word while playing with an object.",
        "children": [
          "In the **joint attention group**, an **adult interacting with the baby labeled the object the baby was playing with**.",
          "In the **no joint attention group**, a **voice from behind a screen labeled the object the baby was playing with**."
        ]
      },
      {
        "text": "The two conditions are matched in important ways.",
        "children": [
          "In both, the word was spoken while the infant was focused on the same object.",
          "The only difference was whether a visible person was engaged with the infant and the object."
        ]
      },
      {
        "text": "**Eighteen-month-olds learned the novel word in the joint attention group but not in the no joint attention group**.",
        "children": [
          "Hearing a word at the same moment as seeing an object was insufficient for learning.",
          "Infants needed evidence that a speaker was using the word to refer to that object. The voice behind the screen supplied the same word at the same moment, so the difference in learning came from the visible, engaged speaker."
        ]
      }
    ],
    "development2-15": [
      {
        "text": "Children narrow the hypothesis space for new words partly through **intentional cues from the speaker**, such as **eye gaze direction**. An **intentional cue** is a signal of what a speaker means to refer to.",
        "children": [
          "The photo of a woman’s face looking toward a small toy cat at one side gives the kind of cue involved. Her eyes indicate which object she is attending to."
        ]
      },
      {
        "text": "**Baldwin** taught new words to **16–17-month-olds** and **18–19-month-olds** in two conditions.",
        "children": [
          "In **follow-in labeling**, the adult **looked at the toy the infant was focused on** while saying the new word. Both cues point to the same toy.",
          "In **discrepant labeling**, the adult **looked at a toy in a bucket**, a different toy from the one the infant was focused on, while saying the new word."
        ]
      },
      {
        "text": "The discrepant condition separates the infant’s own focus from the speaker’s focus.",
        "children": [
          "If infants simply attach a new word to whatever they are looking at, they would map the word onto their own toy.",
          "If they use the speaker’s gaze, they would map it onto the toy in the bucket.",
          "The comparison tests whether infants treat the speaker’s gaze as evidence of what the word means."
        ]
      }
    ],
    "development2-16": [
      {
        "text": "**Gaze direction** helps a child identify which object a speaker is naming when several objects are present.",
        "children": [
          "A speaker who looks at one object while saying a new word links that word to the object.",
          "The child can follow the speaker’s gaze to find the intended referent."
        ]
      },
      {
        "text": "The speaker’s focus can differ from the child’s own focus.",
        "children": [
          "Following it means using information about another person’s attention.",
          "A new word can then be attached to an object the child was not looking at when the word was said."
        ]
      },
      {
        "text": "Gaze narrows the possible meanings without the word’s sound giving anything away.",
        "children": [
          "The child combines the new word with evidence about what the speaker intends.",
          "Following gaze requires understanding that a speaker’s eyes point to what the speaker means, which yields a more specific mapping than linking the word to everything in view."
        ]
      }
    ],
    "development2-17": [
      {
        "text": "Intentional cues also include **affective and behavioral cues** from the speaker. **Affective** cues are emotional expressions, and **behavioral** cues are the speaker’s actions.",
        "children": [
          "A speaker’s expression can indicate whether an object is the one they were looking for.",
          "A speaker’s actions, such as reaching for an object, can reveal what they want."
        ]
      },
      {
        "text": "**Akhtar and colleagues** found that **infants used adults’ facial expressions to identify the intended referent of a novel word**.",
        "children": [
          "The adult’s emotional reaction to an object indicated whether it was the one the adult meant.",
          "Infants linked the new word to the object that the adult’s expression marked as intended."
        ]
      },
      {
        "text": "Several objects can be present when a word is spoken, but the speaker’s reaction can single out one of them.",
        "children": [
          "A satisfied expression signals that the speaker found what they wanted, and a disappointed expression signals that the object is not the one meant.",
          "Word learning therefore involves understanding the goal of the interaction."
        ]
      }
    ],
    "development2-18": [
      {
        "text": "A speaker’s **emotional reaction** is an **intentional cue** that can identify the intended object among several candidates.",
        "children": [
          "A reaction of satisfaction or excitement can link one object to what the speaker was trying to find or do.",
          "The learner can use that link to interpret a new label."
        ]
      },
      {
        "text": "**Intention is conveyed through more than gaze direction**.",
        "children": [
          "Facial expressions and actions also reveal what a speaker means.",
          "A word can be spoken near several objects without all of them being equally good candidates."
        ]
      },
      {
        "text": "The useful information lies in how the adult responds to each object.",
        "children": [
          "Relating the label to that response narrows the word’s **hypothesis space**, the set of meanings it could have.",
          "Infants who use emotional reactions are tracking the speaker’s goals. The word becomes linked to the object that satisfies the goal, and objects that disappoint the speaker are ruled out."
        ]
      }
    ],
    "development2-19": [
      {
        "text": "Children also use **word learning strategies**. These are **default strategies that children bring to the word learning situation**.",
        "children": [
          "A **default** is a starting assumption that holds unless there is evidence against it.",
          "These strategies **function to narrow the hypothesis space for new words**, giving children a starting point when other cues are weak."
        ]
      },
      {
        "text": "One example is the **whole object assumption**.",
        "children": [
          "Under this assumption, a child expects a new word to name **a whole object** rather than one of its parts, its color, its texture or an action it is doing.",
          "When a child hears a new word while looking at a cat, the assumption favors “cat” over “whiskers,” “furry” or “walking.”"
        ]
      },
      {
        "text": "The whole object assumption removes many unlikely meanings at once and matches how adults usually label objects for children.",
        "children": [
          "It is a starting preference that later evidence can override.",
          "Further evidence can show that a word names a part or a property, and children do eventually learn such words."
        ]
      }
    ],
    "development2-20": [
      {
        "text": "Another word learning strategy is **mutual exclusivity**, from **Markman (1989)**.",
        "children": [
          "**As a default, objects can have only one name**.",
          "The **implication** is that **new words map to nameless objects**.",
          "Mutual exclusivity **emerges during the second half of the second year**, that is, between about 18 and 24 months of age."
        ]
      },
      {
        "text": "Pictures of a parrot and a dog stand for a typical situation.",
        "children": [
          "Suppose a child already knows the word “dog” but has no word for a parrot.",
          "If the child hears a new word, the child assumes it refers to the parrot, because the dog already has a name. No gaze or emotion cue is needed for this choice."
        ]
      },
      {
        "text": "Mutual exclusivity works together with the whole object assumption.",
        "children": [
          "The whole object assumption says a new word names an object, and mutual exclusivity says it names an object without a name yet.",
          "It is a default inference, so later learning can override it when an object turns out to have more than one name."
        ]
      }
    ],
    "development2-21": [
      {
        "text": "Under **mutual exclusivity**, a child who hears an unfamiliar word assigns it to an object that does not yet have a known name.",
        "children": [
          "An object the child can already name is unlikely to be the target of a new word.",
          "The choice depends on comparing the objects that are present."
        ]
      },
      {
        "text": "**Prior vocabulary** decides which objects count as already named.",
        "children": [
          "Two children could make different guesses in the same scene if they know different words.",
          "The strategy builds on what the child has already learned."
        ]
      },
      {
        "text": "Vocabulary growth therefore builds on itself.",
        "children": [
          "A child who knows many names has more objects to rule out.",
          "The unnamed objects that remain become the most likely referents for new words, so each known word helps narrow the meaning of the next one."
        ]
      }
    ],
    "development2-22": [
      {
        "text": "**How do children start putting words together?** **In production, it can be hard to tell what is going on when children produce only one, two or three words at a time**. A short utterance can come from several very different processes.",
        "children": []
      },
      {
        "text": "**Menn** distinguishes among four kinds of early utterances.",
        "children": [
          "**“Just a bunch of relevant words.”** The child strings together words related to the situation without any grammatical structure linking them.",
          "**Formulas**. A formula is a phrase memorized as a whole unit, without the child knowing it has separate parts.",
          "**Word combinations**. The child puts separate words together productively, creating new combinations.",
          "**Stable constructions**, which are consistent patterns the child uses to build utterances. These are **not necessarily adult-like**."
        ]
      },
      {
        "text": "A child might say **“Up!”**, **“Pick you up!”** and **“Mommy up!”**",
        "children": [
          "“Pick you up!” sounds more advanced, but it could be a formula copied as a whole from what adults say.",
          "“Mommy up!” is shorter, but it might be a true combination of two separate words.",
          "Telling which process produced each one requires more than utterance length."
        ]
      },
      {
        "text": "In practice, **a full description of the context in which an utterance is produced is necessary, but often not sufficient, to distinguish among these**.",
        "children": [
          "Context reveals what the child intends and how the utterance is used across situations.",
          "Even with full context, the source of a particular utterance can stay uncertain."
        ]
      }
    ],
    "development2-23": [
      {
        "text": "There is a difference between **comprehension** and **production**. **Even children at the one-word stage in production are able to use basic transitive word order in comprehension**.",
        "children": [
          "The **one-word stage** is the period when a child speaks only in single words.",
          "A **transitive** sentence has a verb with a subject and an object. In English, transitive word order puts the actor first and the person acted upon after the verb."
        ]
      },
      {
        "text": "The **structure-mapping account** of **early syntactic bootstrapping**, from **Gertner and Fisher**, describes how this works. **Syntactic bootstrapping** is using sentence structure to help learn about meaning.",
        "children": [
          "The **input sentence** is **“The boy is tickling the girl!”** The child forms a **partial sentence representation**, **tickle[N1 = boy, N2 = girl]**, noting the verb and the two nouns in order.",
          "The **observed scene** has a boy tickling a girl. The child forms **conceptual representations** of possible events, such as **Giggle(agent = girl)**, **Tickle(agent = boy, patient = girl)**, **Play(agent = boy)** and **Play(agent = girl)**. An **agent** is the doer of an action, and a **patient** is the one affected by it.",
          "A **one-to-one mapping between nouns and participant roles** links the two nouns in the sentence to the two participants in the tickling event. The sentence has two nouns, so it fits the event with two participants."
        ]
      },
      {
        "text": "Understanding can therefore run ahead of production.",
        "children": [
          "A child who says only single words can still use the order of nouns to work out who did what.",
          "Aligning the nouns with the participants in the scene helps the child work out the meaning of the verb."
        ]
      }
    ],
    "development2-24": [
      {
        "text": "A **generalization test** checks whether children have really learned the **transitive structure**. **If children have really learned the transitive structure, they will generalize it to new verbs**.",
        "children": [
          "A child who has only memorized particular sentences will be stuck with an unfamiliar verb.",
          "A child who knows the structure can use word order to interpret any verb."
        ]
      },
      {
        "text": "To select the picture that could depict **“The duck is gorping the bunny”** from two novel actions, a child needs to know that the first noun is the doer and the second is the one acted upon. The verb **“gorp”** is made up, so only the order of the nouns can help.",
        "children": []
      },
      {
        "text": "**Gertner and colleagues (2006)** showed that **two-year-olds can understand this**. The procedure alternated blank screens with test trials.",
        "children": [
          "During a **5-second blank screen**, children heard “Hey look! The duck’s gonna gorp the bunny!”",
          "In the **first 8-second test trial**, two scenes appeared side by side. In one, a person in a duck costume acted on a person in a bunny costume by pushing them in a wagon. In the other, the bunny acted on the duck. Children heard “The duck is gorping the bunny! The duck is gorping the bunny! See?”",
          "During a **4-second blank screen**, children heard “The duck gorped the bunny! Find gorping!”",
          "In the **second 8-second test trial**, the scenes appeared again with “The duck is gorping the bunny! Find gorping. Find gorping!”",
          "Children **looked significantly longer at the duck acting on the rabbit than the reverse**."
        ]
      },
      {
        "text": "At this age, children typically have a **mean length of utterance**, or **MLU**, of **around 2**. MLU is the average number of **morphemes**, meaningful words or word parts, per utterance.",
        "children": [
          "Their three-morpheme utterances might be like **“Duck gorp bunny.”**",
          "Their speech is short and incomplete, yet they understand the full transitive structure."
        ]
      }
    ],
    "l1-critical-01": [],
    "l1-critical-02": [
      {
        "text": "**Critical periods** and **sensitive or “optimal” periods** are two ways of describing how the timing of experience affects learning. They differ in how strict the time limits are.",
        "children": []
      },
      {
        "text": "**Critical periods** have two defining characteristics.",
        "children": [
          "They have a **discrete, “programmed” onset and offset**. The window opens and closes at set points in development, as if following a biological schedule.",
          "**Change in response to the environment, which is learning, is strictly limited to this period**. There is **no sensitivity to the environment before or after** the window. Outside the window, the relevant experience has no effect at all."
        ]
      },
      {
        "text": "**Sensitive or “optimal” periods** describe a weaker relationship between timing and learning.",
        "children": [
          "**Learning is possible throughout the life span**.",
          "**Learning is optimal during particular windows**, meaning it is easiest or most effective then.",
          "**These windows can have a gradual onset and offset**, and their timing **can itself be affected by experience**."
        ]
      },
      {
        "text": "The difference is between impossibility and reduced effectiveness.",
        "children": [
          "A critical period predicts that late exposure produces no learning of the relevant ability, so any late improvement argues against it.",
          "A sensitive period predicts that late learning is harder but still possible, alongside a lasting early advantage.",
          "Even the classic critical period in vision fits the term “sensitive period” better, and the same question applies to language learning."
        ]
      }
    ],
    "l1-critical-03": [
      {
        "text": "**Amblyopia** is **poor vision in one eye despite normal peripheral function**. **Peripheral function** is the working of the eye itself, so the eye can be healthy while vision through it stays poor. The problem lies in how the brain processes input from that eye.",
        "children": []
      },
      {
        "text": "Three conditions can cause amblyopia.",
        "children": [
          "**Strabismus** is a misalignment of the eyes, so the two eyes point in different directions and the brain receives two conflicting images.",
          "A **cataract** is a clouding of the lens of the eye, which blocks or blurs the light reaching the back of the eye.",
          "**Anisometropia** is a large difference in focusing power between the two eyes, so one eye’s image is much blurrier than the other’s."
        ]
      },
      {
        "text": "**Periods of deprivation from normal visual input** caused by these conditions **can result in poor vision long after the conditions themselves have been remediated**, or corrected.",
        "children": [
          "Correcting the misalignment, removing the cataract or fixing the focus restores the input from the eye.",
          "The brain may still fail to use that input properly.",
          "A temporary problem early in life can therefore leave a permanent effect, so the timing of the problem matters as much as the problem itself."
        ]
      }
    ],
    "l1-critical-04": [
      {
        "text": "**Amblyopia occurs because of competitive dynamics between cortical inputs**. The two eyes send input to **visual cortex**, and those inputs **compete** for control of the neurons there.",
        "children": [
          "When both eyes work normally, they share the cortical neurons in balance.",
          "**Abnormal vision in one eye can lead to “colonization” of the cortical representation of that eye by the other eye**. The stronger eye takes over neurons that would have responded to the weaker eye."
        ]
      },
      {
        "text": "The diagram of **monocular deprivation** in mice traces how this happens over time. **Monocular deprivation** means blocking or degrading input to one eye.",
        "children": [
          "After **2–3 days**, there is **increased spine motility**. **Dendritic spines** are small projections on neurons that receive connections from other neurons. Increased motility means they become unstable and move around.",
          "After **3–4 days**, there is **spine loss and Wallerian degeneration**. Connections from the deprived eye are lost, and **Wallerian degeneration** is the breakdown of nerve fibers that have been cut off from their source.",
          "After **more than a week**, there is **axon sprouting and new spine birth**. The open eye’s fibers grow new branches and form new connections in the space the deprived eye lost."
        ]
      },
      {
        "text": "**When normal function is restored to the deprived eye, it remains at a competitive disadvantage**.",
        "children": [
          "The other eye now controls the connections.",
          "**Normal cortical responses cannot be restored by normal experience**, because ordinary vision with both eyes open keeps favoring the stronger eye."
        ]
      }
    ],
    "l1-critical-05": [
      {
        "text": "**Treatments for amblyopia are based on competition**. **One of the most effective treatments involves intermittently patching the “good” eye**.",
        "children": [
          "A patch over the stronger eye blocks its input for part of the day.",
          "This forces the brain to rely on the weaker eye."
        ]
      },
      {
        "text": "Patching **restores the competitive balance between the eyes** and **permits the brain’s own plasticity to restore normal function**. **Plasticity** is the brain’s ability to change its connections in response to experience.",
        "children": [
          "With the strong eye patched, the weaker eye’s input can win back cortical connections.",
          "The treatment does not repair the eye itself. It changes the experience the brain receives, and the brain’s plasticity does the rest."
        ]
      },
      {
        "text": "**This treatment is most effective early in development**, and it **may be ineffective by late childhood, around 10 years**.",
        "children": [
          "Young brains are highly plastic, so rebalancing the input leads to rapid reorganization.",
          "As the visual system matures, the same treatment has less and less effect, so the timing of treatment matters as much as the treatment itself."
        ]
      }
    ],
    "l1-critical-06": [
      {
        "text": "**Human adult plasticity after the critical period** is not entirely gone. **Levi and Polat (1996)** found that **plasticity is not abolished entirely, even well into adulthood**. **Some of these patients were in their 50s**, an age normally considered past the point where treatment works.",
        "children": []
      },
      {
        "text": "**Long-term, intensive training on specific psychophysical tasks** in the affected eye can lead to **improvements in both task performance and general visual function**. A **psychophysical task** measures the relationship between a physical stimulus and what a person perceives, such as the smallest contrast a person can detect.",
        "children": [
          "Participants practiced visual judgments with the amblyopic eye over a very long period.",
          "The benefits extended beyond the trained task to vision more broadly."
        ]
      },
      {
        "text": "The graph plots the visual threshold against **kilotrials of training**, where one kilotrial is a thousand trials, from 0 to about 50 kilotrials. A **threshold** is the smallest stimulus a person can reliably detect, so a lower threshold means better vision.",
        "children": [
          "Over the first 19 kilotrials, the threshold dropped steadily, a highly significant change marked with p = 8.2 × 10⁻¹¹.",
          "From about 20 to 35 kilotrials, the threshold leveled off with little further change, marked with p = 0.97.",
          "Around 36 kilotrials, the threshold dropped again to a new, lower level and stayed there."
        ]
      },
      {
        "text": "The adult visual system therefore keeps some **experience-dependent plasticity**. The right kind and amount of training can still produce change after ordinary late treatment stops working.",
        "children": []
      }
    ],
    "l1-critical-07": [
      {
        "text": "**Li, Ngo, Nguyen, Lam and Levi (2008)** found that **playing video games enhances visual acuity and visual attention in adult amblyopia**. Participants played an action video game, a first-person shooting game set in a battle scene, using their amblyopic eye.",
        "children": [
          "**Visual acuity** is the sharpness of vision, the ability to see fine detail. Improved acuity means sharper vision through the weak eye.",
          "**Visual attention** is the ability to select and focus on relevant parts of the visual scene, such as what matters in a busy battle scene."
        ]
      },
      {
        "text": "Action games demand fast visual judgments and constant attention, which push the visual system to use the amblyopic eye’s input.",
        "children": [
          "The participants were adults whose childhood visual development was long over, so their improvement came from the training itself.",
          "Intensive visual experience improved function well after the age when patching usually works best."
        ]
      },
      {
        "text": "Video game training adds to the evidence for adult **plasticity** in amblyopia.",
        "children": [
          "A demanding, engaging visual task can drive change in an adult visual system.",
          "An early optimal window can close without removing every possibility of improvement."
        ]
      }
    ],
    "l1-critical-08": [
      {
        "text": "An **interim summary** brings the vision evidence together. **Amblyopia is a classic example of a sensitive period**.",
        "children": [
          "A **peripheral disturbance in early experience can lead to life-long disruption in visual function**. A problem with the eye itself during early development leaves a permanent effect on vision.",
          "**The long-term loss of function is the sequela of a temporary deficit during experience-dependent organization of the brain**. A **sequela** is a lasting consequence of an earlier condition. The brain organized itself around the abnormal input, and that organization persists.",
          "**Treatment is most effective during a limited developmental window**. Patching works best early and loses effectiveness by late childhood."
        ]
      },
      {
        "text": "**New evidence suggests that the right kind of experience can reverse deficits late into adulthood**.",
        "children": [
          "Intensive perceptual training and video game play improved vision in adults.",
          "Later learning is harder and requires special conditions, but it still happens."
        ]
      },
      {
        "text": "This pattern fits a **sensitive period** better than a strict critical period.",
        "children": [
          "A strict critical period would rule out any later improvement.",
          "Amblyopia combines a strong early window with some capacity for change later in life, which is what defines a sensitive period."
        ]
      }
    ],
    "l1-critical-09": [
      {
        "text": "The question is **how the vision evidence relates to language**. Two lines of work connect them.",
        "children": [
          "**Lenneberg’s early attempts to combine developmental neurology with the notion of a “language acquisition device.”** **Developmental neurology** is the study of how the nervous system develops. A **language acquisition device** is a proposed innate mental capacity for learning language.",
          "**Studies of early deprivation**, which include **data from neglected children** and from **Deaf children with limited input to sign language**."
        ]
      },
      {
        "text": "Lenneberg asked whether changes in the developing brain could open and close a window for acquiring language.",
        "children": [
          "He linked language milestones to brain development.",
          "If such a window exists, language learning would depend on the state of the brain as well as on the input."
        ]
      },
      {
        "text": "Deprivation studies look at people who first encountered an accessible language unusually late.",
        "children": [
          "Neglected children were cut off from normal language input.",
          "Some Deaf children have no access to sign language in early childhood.",
          "Comparing these cases with typical development tests whether the timing of first exposure affects the final outcome."
        ]
      }
    ],
    "l1-critical-10": [
      {
        "text": "In **Biological Foundations of Language (1967)**, **Lenneberg was attempting to combine contemporary linguistics with what was known about brain development**. **Studies of language development were starting to show a fairly robust and stage-like pattern**.",
        "children": []
      },
      {
        "text": "The graph plots the **percentage of children** reaching each milestone between **8 and 36 months** of age, combining data from Austrian, British and American children.",
        "children": [
          "The curve for **words** rises first, climbing steeply between about 10 and 18 months to near 100%.",
          "The curve for **two-word phrases** rises next, mostly between about 18 and 26 months.",
          "The curve for **spontaneous construction of sentences with five words or more** rises last, between about 28 and 36 months."
        ]
      },
      {
        "text": "A table of milestones pairs motor development with language development at each age.",
        "children": [
          "At **8 months**, infants stand holding on and pick up small objects, and their **reduplicated** babbling, such as repeated syllables, becomes frequent.",
          "At **10 months**, infants creep efficiently and pull to standing, and their vocalizations mix with sound play such as gurgling and bubble-blowing.",
          "At **12 months**, infants walk with one hand held, identical sound sequences are repeated more often, and words such as **mama** or **dada** emerge. They show definite signs of understanding some words and simple commands.",
          "At **18 months**, children have a definite vocabulary of more than three but fewer than fifty words. Much babbling continues, and comprehension progresses rapidly."
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
        "text": "The graph of **neuron size** plots the **cell body volume** of neurons in the cerebral cortex against age. Separate curves are drawn for neurons in cortical **layers III, IV and V**.",
        "children": [
          "Neuron size grows rapidly in the first two years and then levels off.",
          "The lines are broken between ages **2 and 18**, because **no measurements were available** for that period. A shaded band marks the period of **language acquisition**."
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
        "text": "**More extensive data were available from studies of recovery from stroke**. **Aphasia is surprisingly rare in children with brain lesions**. A **lesion** is an area of damaged brain tissue.",
        "children": [
          "Damage that causes lasting aphasia in adults often has much milder effects in children."
        ]
      },
      {
        "text": "In extreme cases, a **hemispherectomy** was performed. This is surgery that removes or disconnects one entire **cerebral hemisphere**, typically **to relieve seizures in people with epilepsy**.",
        "children": [
          "**Children in whom the left hemisphere is removed nonetheless seem to develop typical language abilities**.",
          "**Adults do not recover language after this procedure**."
        ]
      },
      {
        "text": "Lenneberg’s table of hemispherectomy outcomes, based on Basser (1962), sorts cases by when the lesion was acquired.",
        "children": [
          "**Before the teens**, of the children whose **left** hemisphere was removed, **49** had speech that was **not affected or improved** after the operation. Only **3** had permanent aphasia, all present before surgery.",
          "**Before the teens**, of the children whose **right** hemisphere was removed, **38** had speech not affected or improved, and **5** had permanent aphasia, all present before surgery.",
          "**During puberty**, in a single case of **left** removal, there was **slow improvement**, with some residual aphasia to the end of life, 27 months after surgery.",
          "In **adults** with **left** removal, **none** had speech unaffected or improved, and **6** had permanent aphasia.",
          "In **adults** with **right** removal, **25** had speech unaffected or improved, and **none** had permanent aphasia."
        ]
      },
      {
        "text": "These findings led Lenneberg to hypothesize that **a key factor in closing the critical period was the development of adult-like cerebral dominance**.",
        "children": [
          "**Cerebral dominance** is the specialization of one hemisphere, usually the left, for language.",
          "In young children, language is not yet fixed in the left hemisphere, so the right hemisphere can take over. Once dominance is established in adulthood, removing the left hemisphere leaves permanent aphasia."
        ]
      }
    ],
    "l1-critical-13": [
      {
        "text": "**As always, things are more complicated**. **Systematic studies of children with perinatal strokes** add important detail. A **perinatal stroke** occurs between the **prenatal period and 28 days after birth**.",
        "children": [
          "**Outcomes are clearly much better than for adults with similar injuries**.",
          "Children still show some effects of the damage, however."
        ]
      },
      {
        "text": "**Early language deficits appear in both right- and left-hemisphere patients**.",
        "children": [
          "In adults, language problems mainly follow left-hemisphere damage.",
          "In young children, damage to either side causes early language delays.",
          "**Some deficits are worse for children with right-hemisphere damage**, which is the opposite of the adult pattern."
        ]
      },
      {
        "text": "**Language outcomes are generally in the low-normal range**.",
        "children": [
          "This suggests **a persistent delay rather than catching up**.",
          "Children recover far better than adults, but they often do not reach the level of children without injury."
        ]
      },
      {
        "text": "Early plasticity is therefore real but limited. The young brain can reorganize to support language, but the reorganized system may not work as well as the original one would have.",
        "children": []
      }
    ],
    "l1-critical-14": [
      {
        "text": "**Curtiss and colleagues (1974)** studied the **effects of early deprivation** in the case of **Genie**.",
        "children": [
          "Genie was born in **April 1957**.",
          "When researchers first met her, she was **13 years and 7 months old**, a painfully thin child who looked six or seven."
        ]
      },
      {
        "text": "Her early history involved extreme isolation and abuse.",
        "children": [
          "**From the age of 20 months**, Genie was confined to a small room under conditions of increasing physical restraint.",
          "Most of the time she was harnessed to an infant’s potty chair. Otherwise she was confined in a homemade sleeping bag in an infant’s crib covered with wire mesh.",
          "She received minimal care from a mother who was rapidly losing her sight, and she was fed only infant food.",
          "She was **physically punished by her father if she made any sounds**. Her father and older brother did not speak to her, but at times barked at her like dogs.",
          "There was no television or radio in the home, and her contact with other people was extremely limited."
        ]
      },
      {
        "text": "When she was hospitalized for malnutrition, Genie **could not stand up straight or chew food**, was **not toilet trained**, and **did not speak, cry or produce any vocal sounds**.",
        "children": [
          "Her case reveals what happens when first-language learning starts in adolescence.",
          "Her lack of language came together with severe physical, social and emotional deprivation, so language deprivation cannot be separated from her other hardships."
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
        "text": "A test of prepositions used **buttons and plastic boxes** of different colors and sizes. Genie’s task was to move the buttons and boxes according to the instructions.",
        "children": [
          "A sample item was **“Put the red box behind the blue box.”**",
          "The test covered **under, over, in, on, behind** and **in front of**, along with **in back of** and **next to**."
        ]
      },
      {
        "text": "The results, collected between October 1972 and August 1973, show more correct than incorrect responses for every preposition.",
        "children": [
          "**On** had 36 correct and 9 incorrect, and **in** had 37 correct and 4 incorrect.",
          "**Over** had 11 correct and 2 incorrect, and **under** had 17 correct and 7 incorrect.",
          "**In front of** had 20 correct and 6 incorrect, **in back of** had 7 correct and 3 incorrect, **next to** had 7 correct and 1 incorrect, and **behind** had 12 correct and 5 incorrect."
        ]
      },
      {
        "text": "Some language can therefore be acquired late. This learning took place after puberty, long after the window Lenneberg proposed, but it was uneven across different parts of language.",
        "children": []
      }
    ],
    "l1-critical-16": [
      {
        "text": "There were also things Genie **did not learn**. **Genie’s production lagged severely behind her comprehension**.",
        "children": [
          "**Some lag is typical of development**. All children understand more than they can say.",
          "Genie had been **punished for making sounds** as a child, which could also limit how much she spoke, so her speech showed less than she actually knew."
        ]
      },
      {
        "text": "**Her grammatical abilities developed much more slowly than her vocabulary**. A test of **conjunctions** placed **five familiar objects in a row** in front of Genie and asked her to point to one or more of them.",
        "children": [
          "Sample items included **“Show me the fork and pencil,” “Show me the crayon or the knife”** and **“Show me either the spoon or the crayon.”**",
          "**And** requires picking every named object. **Or** requires picking one of them, which depends on understanding a logical relationship."
        ]
      },
      {
        "text": "**Early responses** treated **or** sentences the same as **and** sentences, so Genie pointed to both objects. **Later responses** distinguished and from or, but she still did not understand the meaning of **either/or**.",
        "children": [
          "Between October 1971 and December 1973, **and** sentences produced **100 correct**, **3 incorrect** and **0 unanalyzable** responses.",
          "**Or** sentences produced only **7 correct**, **51 incorrect** and **6 unanalyzable** responses.",
          "Genie grasped and almost perfectly but failed or almost entirely, despite a vocabulary of hundreds of words. Her strong vocabulary and weak grammar fit the idea that grammar depends more on early exposure than vocabulary does."
        ]
      }
    ],
    "l1-critical-17": [
      {
        "text": "Genie’s case raises **lots of questions**.",
        "children": [
          "**Was Genie learning disabled?** She might have had difficulties from birth that would have affected her language regardless of deprivation.",
          "**What were the residual effects of neglect and abuse on her social development?** Severe trauma could affect learning in many ways beyond the lack of language input."
        ]
      },
      {
        "text": "A further limit is that **after four years, funding to study her was pulled**.",
        "children": [
          "**We cannot know what she might have learned after a longer time**.",
          "The evidence covers only what she learned within that four-year window."
        ]
      },
      {
        "text": "**Nonetheless, the disparity between her vocabulary development and her grammatical development is widely interpreted as suggesting that grammar learning in a first language is specifically impaired after a sensitive period**.",
        "children": [
          "She learned hundreds of words but made little progress with grammar.",
          "On this interpretation, vocabulary can be learned at any age, while grammar depends on early exposure.",
          "Disability, abuse and late exposure could each affect grammar learning, and no single case can separate them. Even so, her pattern became an influential piece of evidence for a sensitive period in first-language learning."
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
        "text": "The results come from two tasks.",
        "children": [
          "**(a) ASL performance** of deaf adults was measured with a task requiring **recall of complex ASL sentences**. Adults with **no early language** scored about **36%**, while adults with **early spoken language** scored about **78%**.",
          "**(b) English performance** was measured with a task requiring **judgments of whether complex English sentences were grammatically correct**, where **chance is 50%**. Deaf adults with **no early language** scored about **52%**, close to chance. Deaf adults who had **early signed language**, ASL in infancy, scored about **80%**. Hearing adults with an **early spoken language** other than English scored about **80%**."
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
        "text": "The evidence bears on whether there is a **“critical period”** or a **“sensitive period”** for a first language, or **L1**.",
        "children": [
          "**Recovery from stroke, and certainly hemispherectomy, looks very, very different in childhood and adulthood**. Children can develop language after damage that would leave adults with permanent aphasia.",
          "This supports a strong effect of age on the brain’s ability to reorganize for language."
        ]
      },
      {
        "text": "**Deprivation of input does not appear to extend the critical period**.",
        "children": [
          "One might expect that a child without language input would keep the window open until input arrives.",
          "Instead, Genie and the late-signing deaf adults show lasting difficulty, especially with grammar.",
          "The window seems to follow a maturational schedule, whether or not language has been experienced."
        ]
      },
      {
        "text": "**All of these data come from highly unusual cases with many other things going on**, so it is **difficult to reach firm conclusions**.",
        "children": [
          "Stroke, brain surgery, abuse and neglect each bring complications beyond the timing of language input.",
          "There is also a **lack of animal models**. Animals do not learn human language, so their development cannot directly answer the question.",
          "Experiments such as **gene knockouts**, which disable specific genes to test their role, **cannot be done with people**."
        ]
      }
    ],
    "l1-critical-20": [],
    "l1-critical-21": [],
    "l2-learning-01": [],
    "l2-learning-02": [
      {
        "text": "**Babies are overrated** as language learners. When **sensitive periods** for a second language, or **L2**, are taken to mean that infants, toddlers and children are “better” at learning language than adults, it is important not to get carried away.",
        "children": [
          "A typical child **by 18 months** understands the concepts of “in and out” and “off and on,” points to several body parts when asked, **uses at least 20 words**, responds with words or gestures to simple questions such as “Where’s teddy?” and “What’s that?”, shows some pretend play, such as giving teddy a drink, makes at least four different consonant sounds, such as b, n, d, g, w and h, enjoys being read to, and points to pictures using one finger.",
          "An adult who **only knew about 20 words after 18 months of language instruction** would be considered a very poor learner."
        ]
      },
      {
        "text": "**Adults initially learn more quickly than children**. This is due largely to two advantages.",
        "children": [
          "**Transfer from L1**, the first language. Adults can build on what they already know about how language works.",
          "**Better general cognitive skills**, such as memory, attention and reasoning."
        ]
      },
      {
        "text": "**Where adults do worse is ultimate attainment**, meaning the final level of skill they eventually reach.",
        "children": [
          "Adults **rarely become native-like** in a second language.",
          "This may also be **due in part to transfer**. The first language that helps adults start quickly may also hold them back from native-like skill.",
          "Speed of early learning and final level of success are different measures, and children and adults compare differently on each."
        ]
      }
    ],
    "l2-learning-03": [
      {
        "text": "Some of the **“language milestones”** in a toddler’s development are actually **general conceptual abilities**.",
        "children": [
          "Understanding **“in and out”** and **“off and on”** depends on understanding **spatial relations between objects**.",
          "**Pretend play**, such as giving teddy a drink, depends on **event representations**, which are mental representations of who does what in an event.",
          "A toddler learning these is building new ideas about the world as well as new words."
        ]
      },
      {
        "text": "**Later learners of a second language already have much of this in place**.",
        "children": [
          "An adult learning Spanish already understands what “in” and “on” mean as concepts.",
          "Adults can **focus on learning how these concepts are represented in the target language**, meaning the language being learned. This is a smaller job than building the concepts and the words at the same time."
        ]
      },
      {
        "text": "Later learners **also already know another language**, which affects **how the second language is learned**.",
        "children": [
          "The first language provides ready-made ways of expressing concepts.",
          "Some of these fit the second language and help. Others clash with it and cause errors."
        ]
      }
    ],
    "l2-learning-04": [
      {
        "text": "**Transfer** is **the use of native-language, or L1, processes and representations for a second language, or L2**.",
        "children": [
          "A learner brings L1 habits for hearing sounds, building sentences and finding words into L2.",
          "The learner approaches L2 with a fully working language system already in place."
        ]
      },
      {
        "text": "**Transfer can have both positive and negative effects on second-language learning and performance**.",
        "children": [
          "**Positive transfer** happens when an L1 pattern matches what L2 requires. Shared sounds, words and structures give the learner a head start.",
          "**Negative transfer** happens when an L1 pattern conflicts with L2. Differences between the languages are where errors appear, because the learner’s habits point the wrong way."
        ]
      },
      {
        "text": "A cartoon of two men at a bar has one asking **“Do you not be happy with me as the translator of the books of you?”**",
        "children": [
          "The sentence uses English words, but its structure follows the grammar of another language.",
          "Word-by-word translation carries over the word order and phrasing of the first language, which is negative transfer in grammar."
        ]
      }
    ],
    "l2-learning-05": [
      {
        "text": "Transfer affects **phonetic and phonological learning**, the learning of speech sounds. **Categorical perception** leads to **acquired similarity** for sounds in the same category. **Acquired similarity** means that sounds a language groups into one category come to sound more alike through experience with that language.",
        "children": []
      },
      {
        "text": "**Minimal pairs in Hindi** reveal the problem. A **minimal pair** is two words that differ in only one sound.",
        "children": [
          "One pair of words both sound like “tap” to English ears. One means **hot**, and the other means **a kind of beat**.",
          "One pair both sound like “dab.” One means **pressure**, and the other means **a kind of fruit**.",
          "One pair both sound like “ari.” One means **saw**, the tool, and the other means **crooked**.",
          "In each pair, one word has a **dental** consonant, made with the tongue against the teeth, and the other has a **retroflex** consonant, made with the tongue curled back toward the roof of the mouth."
        ]
      },
      {
        "text": "**Native English speakers tend to use the English “alveolar” category to interpret both dental and retroflex consonants**. An **alveolar** consonant, like English /t/ or /d/, is made with the tongue on the ridge just behind the teeth.",
        "children": [
          "English has only the alveolar category, so both Hindi sounds get mapped onto it and seem the same."
        ]
      },
      {
        "text": "**In this case, transfer makes learning the L2 contrast more difficult**.",
        "children": [
          "The English category was learned successfully, but it now hides a difference that Hindi uses to distinguish words.",
          "The learner has to learn to separate sounds that the first language taught them to treat as one."
        ]
      }
    ],
    "l2-learning-06": [
      {
        "text": "Transfer also affects **grammar learning**. **Classifiers** are a **somewhat unusual grammatical feature across languages**. A **classifier** is a word that must appear between a number or demonstrative and a noun, chosen according to the kind of thing the noun names.",
        "children": [
          "The structure is **demonstrative pronoun, then nominal classifier, then noun**, as in **yí gè rén**, “one person,” where **gè** is the classifier."
        ]
      },
      {
        "text": "Chinese has many classifiers, each used with a particular kind of noun.",
        "children": [
          "**Gè** is the **general classifier**.",
          "**Bǎ** is used with **objects that have a handle**.",
          "**Běn** is used with **books and similar objects**.",
          "**Kuài** is used with **objects that are divided into pieces**.",
          "**Liàng** is used with **wheeled vehicles**.",
          "**Tái** is used with **devices and gadgets**.",
          "**Xiē** is used to indicate an **indeterminate amount**, or with the **plural** of pronouns and demonstratives.",
          "**Zhāng** is used with **flat objects**.",
          "**Zhī** is used with **long, thin objects**."
        ]
      },
      {
        "text": "**Native English speakers learning Chinese have difficulty learning these**.",
        "children": [
          "In English, to say **“a chair,” “that dog,” “the car”** or **“one book,”** we do not pay attention to what kind of thing the noun names.",
          "**In Chinese, different classifiers are required by different nouns**, so the learner must notice properties such as shape and function."
        ]
      },
      {
        "text": "One way to think about this is that **English speakers have learned to ignore the different cues for classifiers** as part of learning English grammar. Those features of objects are irrelevant to English grammar, so learning Chinese requires attending again to cues English taught them to ignore.",
        "children": []
      }
    ],
    "l2-learning-07": [
      {
        "text": "**Grammatical gender** is another area where **transfer causes problems**. **Grammatical gender is different from social or cultural gender**. It is a system that sorts nouns into classes, often called masculine and feminine.",
        "children": [
          "**There is nothing “male” about a book or “female” about liberty**. In French, **le livre**, the book, is masculine, and **la liberté**, liberty, is feminine.",
          "Other French examples include masculine **le cheval** (the horse), **le chien** (the dog) and **le bruit** (the noise), and feminine **la colombe** (the dove), **la chemise** (the shirt) and **la maison** (the house)."
        ]
      },
      {
        "text": "**Grammatical gender has implications for agreement**. **Agreement** means that related words must match the noun’s gender. **Pronouns, adjectives, some forms of verbs** and other words **all need to be coordinated with noun gender**.",
        "children": [
          "English has no grammatical gender on nouns, so English speakers have no habit of tracking it."
        ]
      },
      {
        "text": "French is famous for having **synonyms with different genders**.",
        "children": [
          "**Auto** and **voiture**, both meaning car, are masculine and feminine.",
          "**Rivière** and **fleuve**, both meaning river, are feminine and masculine.",
          "**Vélo** and **bicyclette**, both meaning bicycle, are masculine and feminine.",
          "Gender therefore has to be learned word by word."
        ]
      },
      {
        "text": "Common **word endings** give statistical clues to gender.",
        "children": [
          "Endings common with **masculine nouns** include **-age**, as in le fromage (the cheese), **-r**, as in le professeur (the teacher), **-t**, as in le chat (the cat), and **-isme**, as in le capitalisme.",
          "Endings common with **feminine nouns** include **-ie**, as in la boulangerie (the bakery), **-ion**, as in la nation, **-ité** or **-tié**, as in la fraternité (brotherhood), **-ance**, as in la balance (the scales), and **-nne, -mme** and **-lle**, as in la fille (the girl) and l’indienne."
        ]
      }
    ],
    "l2-learning-08": [
      {
        "text": "**Transfer is not all bad**. **Vocabulary learning in some L1–L2 situations is aided by the similarity of words across languages**.",
        "children": [
          "French **auto** resembles English “auto” and refers to a car.",
          "French **rivière** resembles English “river,” and French **bicyclette** resembles English “bicycle.”",
          "Japanese **コロッケ, korokke**, refers to a croquette, and Japanese **モノレール, monoreru**, refers to a monorail."
        ]
      },
      {
        "text": "Sometimes the similarity is **due to shared etymology**. **Etymology** is the history of where a word comes from.",
        "children": [
          "Words with a shared origin are called **cognates**. French rivière and English river both come from the same older word."
        ]
      },
      {
        "text": "Sometimes the similarity is **due to more recent “borrowing.”**",
        "children": [
          "A **loan word** is a word one language takes from another.",
          "Japanese korokke and monoreru are borrowed from European languages, with their sounds adapted to Japanese."
        ]
      },
      {
        "text": "Cognates and loan words are **positive transfer** for vocabulary.",
        "children": [
          "The learner already knows a similar form with a similar meaning, which gives the new word a familiar anchor.",
          "A learner who knows river can quickly link it to rivière, which makes the new word easier to store and to recall."
        ]
      }
    ],
    "l2-learning-09": [
      {
        "text": "**Not all similar-sounding words are cognates**. **The bias to interpret L2 words as related to similar-sounding L1 words can be very strong**. **Sometimes the result is embarrassing**.",
        "children": [
          "A word that looks or sounds like a word in another language but means something different is called a **false friend**."
        ]
      },
      {
        "text": "Spanish **“Arnold está embarazado”** does not mean that Arnold is embarrassed.",
        "children": [
          "Spanish **embarazado** means **pregnant**.",
          "An English speaker relying on the similar sound of embarrassed would get the meaning badly wrong."
        ]
      },
      {
        "text": "The link to a familiar word happens before the learner checks the meaning.",
        "children": [
          "When the meanings match, the link speeds up learning, as with cognates.",
          "When the meanings differ, the same link leads to errors. The only difference between a helpful cognate and a misleading false friend is whether the meanings actually match."
        ]
      }
    ],
    "l2-learning-10": [
      {
        "text": "**De Groot and Keijzer (2000)** tested in the lab whether people **use cognates in “second language” learning**.",
        "children": [
          "They used **paired-associate learning of made-up words**. In **paired-associate learning**, participants study pairs of items and later have to recall one item when given the other.",
          "The made-up words **varied in their similarity to their Dutch partners**, so some were cognate-like and some were not.",
          "The words **also varied in “concreteness.”** A **concrete** word names something that can be seen or touched, while an **abstract** word names an idea."
        ]
      },
      {
        "text": "Crossing the two factors gave four kinds of pairs, so the effect of each factor can be measured separately.",
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
          "They were Dutch speakers, so the Dutch words stood in for their first language, and the made-up words stood in for a new second language.",
          "**They were then tested a week later on retention**, meaning how well they remembered the pairs after a delay without further study."
        ]
      }
    ],
    "l2-learning-11": [
      {
        "text": "The results show that **cognates are learned more rapidly and also remembered more easily**. A table gives **recall scores** and **response times** across four sessions, with **session 4** coming **after one week with no training**.",
        "children": []
      },
      {
        "text": "**Recall scores** in percent increased across the three training sessions.",
        "children": [
          "For **concrete cognates**, recall was 69.7% in session 1, rising to 91.7% and then 93.4%. **Concrete non-cognates** started at only 43.7% and rose to 92.0% by session 3.",
          "For **abstract cognates**, recall was 42.7% in session 1, rising to 86.0% by session 3. **Abstract non-cognates** started at just 19.0% and reached 72.7%.",
          "After a week without training, in session 4, concrete cognates dropped to 78.4% and concrete non-cognates to 69.0%. Abstract cognates dropped to 68.4%, while abstract non-cognates fell sharply to **36.0%**."
        ]
      },
      {
        "text": "**Response times**, in milliseconds, were faster for cognates in every session.",
        "children": [
          "In session 1, concrete cognates took about 1,880 milliseconds, while abstract non-cognates took about 3,641.",
          "In session 3, concrete cognates took about 1,080 milliseconds and concrete non-cognates about 1,643.",
          "In session 4, concrete cognates took about 1,833 milliseconds and abstract non-cognates about 3,412."
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
        "text": "The experiment needs a closer look. **If de Groot and Keijzer had only tested “receptive” vocabulary**, meaning **how easily participants could produce the Dutch word given its made-up partner**, **this would not be very impressive**.",
        "children": [
          "In receptive testing, the learner sees the new word and has to supply the familiar Dutch word.",
          "For cognate-like pairs, the new word already looks like the Dutch word, so a participant could answer correctly just by noticing the resemblance."
        ]
      },
      {
        "text": "**Many of the meanings, such as gitaar, tijger and domein, could be guessed without any Dutch training**, because they resemble English guitar, tiger and domain. The **concrete cognates** in the study reveal how close the resemblance is.",
        "children": [
          "**Broer–breur**, **brood–brodde**, **gitaar–gettar**, **jongen–jange** and **lepel–lippel**.",
          "**Lichaam–lechem**, **naald–nadel**, **paraplu–parredu**, **rivier–riffer** and **schaar–skare**.",
          "**Stier–stire**, **trein–trinen**, **varken–vark**, **viool–vialo** and **vrouw–vrauk**.",
          "In each pair, the made-up word is a slightly changed version of the Dutch word."
        ]
      },
      {
        "text": "The study **also tested “expressive” vocabulary**, which the authors call **“productive” testing**.",
        "children": [
          "In productive testing, the learner sees the Dutch word and has to produce the new made-up word.",
          "The learner has to remember the exact new form, gettar, out of many similar possibilities.",
          "Productive testing removes the shortcut, so a cognate advantage there reflects real learning of new forms."
        ]
      }
    ],
    "l2-learning-13": [
      {
        "text": "A second table compares **productive testing** and **receptive testing** **immediately after learning, in session 3**, and **at retest a week later, in session 4**. The **effect** row gives the drop in recall over the week.",
        "children": []
      },
      {
        "text": "In **productive testing**, learners had to produce the new word.",
        "children": [
          "**Concrete** words fell from 92.7% to 73.7%, an effect of 19.0 points. **Abstract** words fell from 79.3% to 52.2%, an effect of 27.1 points.",
          "**Cognates** fell from 89.7% to 73.3%, an effect of 16.4 points. **Non-cognates** fell from 82.3% to 52.5%, an effect of 29.8 points."
        ]
      },
      {
        "text": "In **receptive testing**, learners had to give the Dutch word.",
        "children": [
          "**Concrete** words fell from 97.7% to 88.9%, an effect of 8.8 points. **Abstract** words fell from 91.5% to 64.9%, an effect of 26.6 points.",
          "**Cognates** fell from 98.5% to 90.7%, an effect of 7.8 points. **Non-cognates** fell from 90.7% to 63.0%, an effect of 27.7 points."
        ]
      },
      {
        "text": "Productive scores were lower than receptive scores, because generating a new form is harder than recognizing a familiar one.",
        "children": [
          "Cognates and concrete words were forgotten less in **both** directions, so their advantage extends from initial learning to long-term retention.",
          "The cognate advantage held up in productive testing, where the learner had to recall the new form. Similarity to a known word helped learners form a lasting memory of the new word."
        ]
      }
    ],
    "l2-learning-14": [
      {
        "text": "A key **research question** is whether **similar L1 words are always activated when processing L2**. **There have been many, many studies of this**.",
        "children": [
          "If a bilingual person hears a word in their second language, words in their first language that sound similar might also become active.",
          "This activation could happen automatically, even when the person is trying to use only the second language. If so, the two languages are never fully separate in the mind."
        ]
      },
      {
        "text": "**One clear example** comes from a **“visual world” experiment** by **Marian and Spivey (2003)**.",
        "children": [
          "In a visual world experiment, participants hear spoken instructions while viewing a display of objects, and their eye movements are recorded.",
          "Looks toward an object whose L1 name sounds like the spoken L2 word would reveal that the L1 word was activated.",
          "Eye movements capture this activation without asking the person to report it, while the participant goes on to choose the correct object."
        ]
      }
    ],
    "l2-learning-15": [
      {
        "text": "This kind of experiment parallels **McMurray, Tanenhaus, Aslin and Spivey (2003)**, a study of **gradient effects of within-category VOT on lexical access**.",
        "children": [
          "In that study, participants saw a display with a **lamp**, a **ship**, a **bear** and a **pear**, and heard a word from a continuum between “bear” and “pear.”",
          "The bear and pear differ only in their first consonant, and the lamp and ship are unrelated fillers."
        ]
      },
      {
        "text": "**Eye movements reveal competition between possible responses that participants are considering**.",
        "children": [
          "A participant could click on the bear while having looked briefly at the pear.",
          "Those looks reveal that “pear” was active as a competitor."
        ]
      },
      {
        "text": "In the McMurray study, **the amount of competition between BEAR and PEAR depended on distance from the category boundary**.",
        "children": [
          "Sounds closer to the /b/–/p/ boundary produced more looks to the competitor, and sounds farther from it produced fewer.",
          "The eye-tracking method therefore measures how strongly an alternative word is active, even when the participant chooses correctly.",
          "Applying the same method across languages lets researchers ask whether a word in one language competes with a similar word in another."
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
        "text": "The graph plots the **probability of fixating** each item over the first 1,000 milliseconds after the target word begins.",
        "children": [
          "Looks to the **beaker** and the **beetle** rise together early, because both fit the first sounds of the word.",
          "Looks to the beetle peak near 0.2 at around 500 milliseconds and then fall once the sounds that distinguish the words arrive.",
          "Looks to the beaker keep rising, approaching 1 by about 1,000 milliseconds.",
          "Looks to the **speaker** rise later and stay smaller, peaking near 0.1, because its overlap comes at the end of the word. Looks to the carriage stay near zero."
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
        "text": "**Marian and Spivey** examined the cohort effect with **“cross-language competitors.”** A cross-language competitor is an object whose name in the **other language** shares its beginning with the spoken target word.",
        "children": []
      },
      {
        "text": "**If L1 words are always activated, native Russian speakers should look at a book of matches when the target is “speaker” in English**.",
        "children": [
          "English **speaker** begins with the same sounds as Russian **спички, spichki**, meaning **matches**.",
          "If Russian is active while the participant listens to English, the picture of matches should attract looks."
        ]
      },
      {
        "text": "For **English targets**, each target was paired with an **English competitor** and a **Russian competitor**.",
        "children": [
          "**Speaker** was paired with **spear** in English and **spichki**, matches, in Russian.",
          "**Boot** was paired with **book** and **buben**, tambourine. **Shark** was paired with **shovel** and **sharik**, balloon.",
          "**Chair** was paired with **chess set** and **cherepaha**, turtle. **Marker** was paired with **marbles** and **marka**, stamp.",
          "**Barbed wire** was paired with **bark** and **barhat**, velvet. **Plug** was paired with **plum** and **platye**, dress.",
          "**Gun** was paired with **gum** and **gaika**, nut. **Lock** was paired with **lobster** and **lak dlea nogtei**, nail polish."
        ]
      },
      {
        "text": "For **Russian targets**, the pairing was reversed.",
        "children": [
          "Russian **spichki**, matches, was paired with English **spear** and Russian **spitsi**, knitting needles.",
          "Russian **marka**, stamp, was paired with English **marker** and Russian **marlya**, cheese cloth.",
          "Russian **platye**, dress, was paired with English **plum** and Russian **plashch**, raincoat."
        ]
      },
      {
        "text": "The connection between the target and the cross-language competitor is purely in **sound**.",
        "children": [
          "Speakers and matches have nothing to do with each other in meaning.",
          "Only the Russian competitor’s overlap depends on knowing Russian, so looks to the matches during an English task directly measure activation of the Russian word spichki."
        ]
      }
    ],
    "l2-learning-18": [
      {
        "text": "The results for **competition during L2 spoken word recognition**, when Russian–English bilinguals followed instructions in **English**, come from a table giving the **percent of trials** in which participants looked at each competitor.",
        "children": [
          "When only the **between-language competitor** was present, participants looked at it on **18%** of trials.",
          "When only the **within-language competitor** was present, participants looked at it on **18%** of trials.",
          "When **both competitors** were present, participants looked at the between-language competitor on **13%** of trials and the within-language competitor on **19%**.",
          "When **no competitor** was present, participants looked at a control filler object on only **7%** of trials."
        ]
      },
      {
        "text": "**When only one competitor was present, participants looked at within- and between-language competitors to the same extent**.",
        "children": [
          "The Russian name of the matches pulled the eyes just as strongly as a similar English word did."
        ]
      },
      {
        "text": "**When both competitors were present, participants looked at the within-language competitor more**, **but still looked at the between-language competitor a lot**, about **twice as often as the control condition**.",
        "children": [
          "The English competitor won out when the two were side by side.",
          "The Russian competitor still attracted far more looks than an unrelated object."
        ]
      },
      {
        "text": "The first language therefore stays active during second-language listening. Bilinguals still select the correct object, but L1 words compete along the way.",
        "children": []
      }
    ],
    "l2-learning-19": [
      {
        "text": "The results for **competition during L1 spoken word recognition**, when the same bilinguals followed instructions in **Russian**, come from a second table.",
        "children": [
          "When only the **between-language competitor**, an object with a similar **English** name, was present, participants looked at it on **8%** of trials.",
          "When only the **within-language competitor** was present, participants looked at it on **14%** of trials.",
          "When **both** were present, they looked at the between-language competitor on **8%** of trials and the within-language competitor on **13%**.",
          "With **no competitor**, looks to the control filler occurred on **5%** of trials."
        ]
      },
      {
        "text": "**English words do not seem to be activated when native Russian speakers do this experiment in Russian**.",
        "children": [
          "The **small numerical difference between the between-language and control conditions**, 8% versus 5%, is **not statistically significant**.",
          "A difference that is not statistically significant is within the range of chance variation."
        ]
      },
      {
        "text": "The within-language competitor still produced a reliable cohort effect in Russian.",
        "children": [
          "The pattern across the two experiments is **asymmetric**. Russian words became active during English tasks, but English words did not become reliably active during Russian tasks.",
          "This asymmetry fits a picture in which the first language is more strongly established and more easily activated than the second."
        ]
      }
    ],
    "l2-learning-20": [
      {
        "text": "**The Revised Hierarchical Model** of **Kroll and Stewart** explains **L1–L2 interactions in terms of spreading activation**. **Spreading activation** is the idea that activating one representation partly activates the representations connected to it.",
        "children": [
          "The model has three boxes. An **L1** box holds the first-language vocabulary, an **L2** box holds the second-language vocabulary, and a **concepts** box holds meanings.",
          "**Lexical links** connect the L1 and L2 words directly. **Conceptual links** connect each vocabulary to the concepts."
        ]
      },
      {
        "text": "**The L1 lexicon is assumed to be larger and more strongly connected to relevant concepts**.",
        "children": [
          "In the model diagram, the L1 box is drawn bigger than the L2 box.",
          "The conceptual link from L1 to concepts is a thick, solid arrow, while the link from L2 to concepts is a thin, dashed line."
        ]
      },
      {
        "text": "**The L2 lexicon is assumed to have strong forward connections to the L1 lexicon**.",
        "children": [
          "The lexical link from L2 to L1 is drawn as a solid arrow, while the link from L1 to L2 is dashed.",
          "**Activation can spread more readily from an L2 word to an L1 word than the other way**."
        ]
      },
      {
        "text": "**This occurs because this direction is emphasized in learning**.",
        "children": [
          "People usually learn each new L2 word by connecting it to its L1 translation, which builds a strong route from L2 words to L1 words.",
          "The link from L2 words directly to concepts stays weaker, at least early in learning. As proficiency grows, the L2 conceptual links can strengthen."
        ]
      }
    ],
    "l2-learning-21": [
      {
        "text": "The **Revised Hierarchical Model of Kroll and Stewart (1990, 1994)** can explain the Marian and Spivey results. Consider what happens in the model during the task in **L2**, with the target “speaker.”",
        "children": [
          "**The concept for “matches” partially activates the Russian word for matches**, spichki, because L1 words are strongly connected to their concepts.",
          "Spichki is also partly activated by the sounds of the English word **speaker**, since the two words begin alike.",
          "**This activity feeds back to the conceptual activation for “matches.”**",
          "**Conceptual activation for matches leads to eye movements toward the L1 competitor**, the picture of matches."
        ]
      },
      {
        "text": "The link between speaker and spichki is only **sound overlap**.",
        "children": [
          "Speakers and matches share no meaning.",
          "The extra activation of spichki strengthens the concept of matches, which draws the eyes to that picture."
        ]
      },
      {
        "text": "**When the task is done in L1**, **the conceptual links with L2 might be too weak to create this kind of interference reliably**.",
        "children": [
          "In the Russian version, an English competitor would need strong links from the English word to its concept.",
          "In the model, L2 words have only weak conceptual links, too weak to drive looks to their objects.",
          "The asymmetry in looks follows directly from the asymmetry in links."
        ]
      }
    ],
    "l2-learning-22": [
      {
        "text": "The Revised Hierarchical Model makes a **counter-intuitive prediction** even for **“balanced bilinguals.”** A **balanced bilingual** is a person who is about equally skilled in both languages.",
        "children": [
          "One might expect balanced bilinguals to work like **“two monolinguals in one,”** with each language running separately.",
          "The model predicts the opposite."
        ]
      },
      {
        "text": "In a balanced bilingual, **the conceptual links are similarly strong for both languages**.",
        "children": [
          "Every concept strongly activates its word in both languages, so both vocabularies become active whenever either is used.",
          "**Competitive dynamics and inhibition will be engaged all the time**. **Competitive dynamics** means that the two languages’ words constantly compete for selection. **Inhibition** is the suppression of the word from the language not being used."
        ]
      },
      {
        "text": "This prediction **has led to a lot of work on bilinguals’ advantages in nonlinguistic cognitive control tasks**.",
        "children": [
          "**Cognitive control** is the ability to manage attention and suppress irrelevant responses.",
          "If bilinguals constantly practice selecting one language and suppressing the other, they might become better at controlling attention in general, including in tasks that have nothing to do with language."
        ]
      }
    ],
    "l2-learning-23": [
      {
        "text": "The usual sequence of second-language learning runs along a timeline.",
        "children": [
          "A person **begins learning L1**.",
          "Later, the person **learns L2**.",
          "At the same time, the person **continues learning and using L1**. Both languages are kept in use from then on."
        ]
      },
      {
        "text": "**What happens when someone stops using L1 after L2 is introduced?**",
        "children": [
          "In the second timeline, the person begins learning L1 and later learns L2, but “continue learning/using L1” is crossed out.",
          "L1 is no longer heard or used, while L2 takes over."
        ]
      },
      {
        "text": "This situation separates two factors that usually go together, learning a language early and continuing to use it.",
        "children": [
          "If early learning leaves a permanent foundation, traces of L1 should remain even without use.",
          "If continued use is needed, L1 might fade or disappear."
        ]
      }
    ],
    "l2-learning-24": [
      {
        "text": "**Pallier, Dehaene, Poline, LeBihan, Argenti, Dupoux and Mehler** studied **brain imaging of language plasticity in adopted adults**, asking **whether a second language can replace the first**.",
        "children": [
          "**Adults aged 20 to 32** who **had been adopted into French homes from Korean orphanages between the ages of 3 and 8** were tested.",
          "These adults had learned Korean as young children but then moved into homes where only French was spoken.",
          "They stopped using Korean entirely after adoption, so they are a natural test of the second timeline."
        ]
      },
      {
        "text": "The researchers tested whether the adoptees **had any residual knowledge of Korean**. **Residual knowledge** is any remaining trace of the earlier language.",
        "children": [
          "Monolingual French speakers with no Korean experience served as a comparison group.",
          "If the adoptees did better than the French speakers on Korean-related tasks, some Korean knowledge would have survived. Any surviving knowledge would reveal what early learning leaves behind when a language is no longer used."
        ]
      }
    ],
    "l2-learning-25": [
      {
        "text": "Korean has a **three-way stop contrast**. A **stop** is a consonant made by fully blocking the airflow and then releasing it, such as /p/, /t/ or /k/.",
        "children": [
          "English and French distinguish two kinds of stops at each place, such as /b/ and /p/.",
          "Korean distinguishes three kinds at each place, which are **aspirated**, **plain** and **tense**. An **aspirated** stop is released with a strong puff of air. A **plain** stop has a lighter release. A **tense** stop is produced with a stiffened, tightened throat."
        ]
      },
      {
        "text": "The contrast appears in three series, recorded in the UCLA Phonetics Archive.",
        "children": [
          "The **bilabial** series, made with the lips, has **pʰul**, “grass,” **pul**, “fire,” and **p’ul**, “horn.”",
          "The **dental** series, made with the tongue at the teeth, has **tʰal**, “mask,” **tal**, “moon,” and **t’al**, “daughter.”",
          "The **velar** series, made with the back of the tongue, has **kʰo**, “nose,” **kok**, “music,” and **k’ok**, “exactly.”"
        ]
      },
      {
        "text": "In each series, the three words are made at the same place in the mouth and differ only in the type of stop.",
        "children": [
          "French speakers have no such contrast, so they tend to hear the three Korean sounds as two, while a Korean speaker hears all three as different.",
          "Adoptees who kept any Korean sound knowledge should hear the differences better than French speakers."
        ]
      }
    ],
    "l2-learning-26": [
      {
        "text": "**Ventureyra and colleagues** found that **Korean adoptees in France were no better than monolingual French speakers** at discriminating the Korean contrasts. The graph plots the percentage of **“different” responses** for **adoptees**, **French native speakers** and **Korean native speakers**.",
        "children": [
          "**DC1** is the **plain–tense** contrast for p and k. Korean speakers responded “different” on about 96% of trials, while adoptees scored about 8% and French speakers about 3%.",
          "**DC2** is the **plain–aspirated** contrast for p and k. Korean speakers scored about 90%, adoptees about 19% and French speakers about 26%.",
          "**DC3** is the **tense–aspirated** contrast for p and k. Korean speakers scored about 95%, adoptees about 23% and French speakers about 20%.",
          "**DS** is the **plain–tense** contrast for s. Korean speakers scored about 79%, adoptees about 26% and French speakers about 23%."
        ]
      },
      {
        "text": "Two control conditions checked general performance.",
        "children": [
          "**DV** is a **vowel** contrast. All three groups said “different” on about 97 to 99% of trials.",
          "**P** is the **same** condition, where the two sounds were identical. All groups rarely said “different,” at about 3 to 13%."
        ]
      },
      {
        "text": "The adoptees could do the task, as their near-perfect vowel discrimination and correct “same” responses confirm.",
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
          "**(a) Distinguishing Korean from a collection of largely unrelated languages**, which tapped familiarity with the overall sound of Korean. Participants rated on a scale of 1 to 7 how much each sentence sounded like Korean. Both groups rated Korean sentences around 4, but they also rated **Japanese** sentences around 4 to 5. **Polish** sentences got about 2, and **Swedish** and **Wolof** sentences got about 2.5 to 3.",
          "**(b) Identifying the correct Korean translation of French words**, which tapped memory for vocabulary. Adoptees scored about 55% correct and French speakers about 50%, close to chance for both.",
          "**(c) Determining whether a short excerpt was repeated from a recorded sentence they had just heard**, which tapped sensitivity to sound sequences. Both groups detected segments in French sentences about 95% of the time. For **Korean**, **Japanese** and **Polish** sentences, both groups scored about 80%, with no adoptee advantage for Korean."
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
        "text": "Pallier and colleagues also used brain imaging. **Listening to French activated the classical language network, including superior temporal and inferior frontal regions**, in both groups.",
        "children": [
          "The **superior temporal** region is the upper part of the temporal lobe, involved in processing speech sounds.",
          "The **inferior frontal** region is the lower part of the frontal lobe, including Broca’s area."
        ]
      },
      {
        "text": "The comparisons subtracted brain activity for other languages from activity for French.",
        "children": [
          "**(A) French minus Polish**, **(B) French minus Japanese** and **(C) French minus Korean** were computed for the **French group** and the **Korean group**, the adoptees.",
          "In every comparison, French produced more activity in the language network than the foreign language did."
        ]
      },
      {
        "text": "**Subtracting Korean from French might have revealed some difference between groups**, if there were **any residual processing ability for Korean left**.",
        "children": [
          "If adoptees still processed Korean as a language, Korean would activate their language network more than it did for French speakers, and the French-minus-Korean difference would be smaller.",
          "**It was not**. The adoptees’ brains responded to Korean like a foreign language, much as they responded to Polish and Japanese. The imaging results agree with the behavioral results."
        ]
      }
    ],
    "l2-learning-29": [
      {
        "text": "**L2–L1 interactions** can also be understood in terms of **competitive dynamics**.",
        "children": [
          "**L1 can be thought of as a set of connections within and between different brain regions**.",
          "These connections are built and maintained through use."
        ]
      },
      {
        "text": "The same process that occurs in **monocular deprivation** in vision could apply to language.",
        "children": [
          "In monocular deprivation in mice, after **2–3 days** the deprived eye’s connections show **increased spine motility**. After **3–4 days**, there is **spine loss and Wallerian degeneration**, the breakdown of cut-off nerve fibers. After **more than a week**, the other eye’s fibers show **axon sprouting and new spine birth**, taking over the lost space.",
          "The eye that keeps receiving input gains control of connections that the deprived eye loses."
        ]
      },
      {
        "text": "**If the L1 connections are never activated again, they could be “taken over” by L2**.",
        "children": [
          "L2 receives constant use, so its connections strengthen and spread.",
          "L1 receives no use, so its connections weaken and can be claimed by L2.",
          "On this view, L2 replaces L1 through competition for the same neural resources."
        ]
      }
    ],
    "l2-learning-30": [
      {
        "text": "The answer to whether **a second language can replace the first** appears to be **“Apparently yes!”** The adoptees showed no behavioral or brain evidence of their childhood Korean.",
        "children": [
          "As far as these tests could measure, French had completely replaced Korean."
        ]
      },
      {
        "text": "A remaining question is whether **traces of L1 are left behind that can be “salvaged.”**",
        "children": [
          "**Salvaging** a trace would mean recovering or using some leftover effect of the earlier language.",
          "A trace might not show up on a test of current ability but could still make relearning easier."
        ]
      },
      {
        "text": "Testing current recognition and testing later learning ask different questions.",
        "children": [
          "One asks what the person can do with the language now.",
          "The other asks whether new learning benefits from something left over from the past, and relearning is the measure that can reveal such a trace."
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
        "text": "The table compares **native speakers**, **childhood overhearers** and **typical late L2 learners** on several measures.",
        "children": [
          "**Childhood slang**, in percent correct. For **production**, native speakers scored 79, overhearers 17 and late learners 3. For **comprehension**, 88, 22 and 3.",
          "**Voice onset time** in milliseconds. For **word-initial voiceless stops**, native speakers had 19.3, overhearers 19.6 and late learners 36.2. For **word-medial voiceless stops**, 22.4, 23.4 and 31.2.",
          "**Percentage lenited**. **Lenition** is a softening of a consonant, which Spanish applies to voiced stops between vowels. For **word-initial voiced stops**, native speakers lenited 43%, overhearers 24% and late learners 1%. For **word-medial voiced stops**, 72%, 63% and 23%.",
          "**Accent rating** on a 5-point scale, where higher means more native-like. For **voiceless stops**, native speakers scored 4.3, overhearers 3.5 and late learners 2.2. For **voiced stops**, 4.4, 3.3 and 2.7."
        ]
      },
      {
        "text": "Other measures showed little or no overhearer advantage.",
        "children": [
          "**Morphology production**. For **gender agreement**, native speakers scored 93%, overhearers 70% and late learners 68%. For **number agreement**, 92%, 88% and 85%.",
          "**Grammaticality judgment**. **Accuracy** was 94% for native speakers, 64% for overhearers and 63% for late learners. **Reaction time** was 1,042 milliseconds for native speakers, 2,475 for overhearers and 2,209 for late learners."
        ]
      },
      {
        "text": "Childhood overhearing gave a clear advantage in **pronunciation** but not in grammar.",
        "children": [
          "Early listening left traces in the sound system that were unmasked when the students later studied Spanish, while grammar seems to need more than overheard input."
        ]
      }
    ],
    "l2-learning-32": [
      {
        "text": "Taking **the data from Korean adoptees together with the data from overhearers**, a picture emerges.",
        "children": [
          "**If L1 is removed from the environment entirely, L2 can appear to completely replace it**. The adoptees showed no trace of Korean on any test of current ability.",
          "**But this replacement is not necessarily complete**. **There may be some residual knowledge that can be “unmasked” with later learning**, as with the Spanish overhearers’ pronunciation."
        ]
      },
      {
        "text": "The two populations also differ in **potentially important ways**.",
        "children": [
          "The adoptees were tested on their current knowledge without any new Korean instruction.",
          "The overhearers were tested after two years of Spanish classes, which gave hidden knowledge a chance to show itself.",
          "These and other differences between the groups make the two sets of results hard to compare directly."
        ]
      }
    ],
    "l2-learning-33": [
      {
        "text": "Several **potentially important differences between these populations** could explain why one group showed traces of early language and the other did not.",
        "children": [
          "**Korean is rarely heard or encountered in France**. **Spanish is common in Los Angeles**, so overhearers may have kept hearing it throughout their lives, which could have kept their Spanish sound knowledge active.",
          "A **“heritage language”** spoken by other family members differs from **a language not spoken by anyone you know**. The overhearers often heard Spanish from relatives, while the adoptees lost all contact with Korean speakers.",
          "**Cognates** are common between Spanish and English but rare between Korean and French. Shared vocabulary could help overhearers relearn.",
          "**Shared writing system**. Spanish and English use the same alphabet, while Korean uses a different script from French."
        ]
      },
      {
        "text": "**This is a general issue** with research on **second language acquisition and bilingualism**.",
        "children": [
          "**Languages and learning situations differ in many, many ways that are hard, perhaps impossible, to control experimentally**.",
          "Researchers cannot assign people to grow up hearing particular languages in particular settings.",
          "Untangling these factors would require comparing populations that differ in only one way, which is rarely possible with real language histories."
        ]
      }
    ],
    "l2-sensitive-01": [],
    "l2-sensitive-02": [
      {
        "text": "**Second-language, or L2, learning** serves as **a model system for sensitive period research**. A **model system** is a situation that is common and easy to study, used to answer questions about a process that is hard to study directly.",
        "children": []
      },
      {
        "text": "**Lenneberg (1967)** developed an influential theory that **the sensitive period had to do with the development of cerebral dominance**, or **developmental changes in language laterality**.",
        "children": [
          "**Cerebral dominance** is the specialization of one hemisphere of the brain, usually the left, for language.",
          "**Language laterality** is the degree to which language depends on one side of the brain rather than both.",
          "Under this theory, the window for learning language closes as language becomes fixed in the left hemisphere."
        ]
      },
      {
        "text": "Two kinds of evidence motivated the theory.",
        "children": [
          "**A rough alignment of the literature on brain development with new insights about language milestones**. The graph of neuron growth in cortical layers III, IV and V rises rapidly in the first two years and then levels off, with no measurements between ages 2 and 18 and a shaded band marking the period of language acquisition. Lenneberg linked the end of rapid brain growth to the start of language learning.",
          "**A review of the literature on resilience after brain injury or surgery**. Children who lost the left hemisphere often developed language, while adults did not recover it."
        ]
      },
      {
        "text": "The theory concerns the brain’s **maturational state**, its stage of physical development. A young, less specialized brain can shift language to other tissue, while a mature, specialized brain has fewer options.",
        "children": []
      }
    ],
    "l2-sensitive-03": [
      {
        "text": "**Much of what is known about first-language, or L1, sensitive periods comes from research on idiosyncratic cases or relatively rare phenomena**. **Idiosyncratic** means peculiar to an individual.",
        "children": [
          "Evidence comes from cases such as children recovering from brain surgery to remove one hemisphere, and Genie, who was isolated from language until age 13.",
          "Each case involves many unusual circumstances, such as injury, illness or abuse, so it is hard to tell which factor caused the outcome."
        ]
      },
      {
        "text": "**In contrast, many people learn second languages at different times in their lives, often with somewhat limited success**.",
        "children": [
          "Second-language learners are common, so researchers can study large groups instead of relying on one unusual case.",
          "They start learning at many different ages, from early childhood to late adulthood, and their eventual success can be measured."
        ]
      },
      {
        "text": "**The limits of L2 success have also been used to reason about the timing of the sensitive or critical period**.",
        "children": [
          "If people who start L2 learning later consistently reach lower levels, that pattern could reveal when the sensitive period closes.",
          "The first language complicates the comparison. Every L2 learner already knows a language, and that knowledge shapes how the new one is learned."
        ]
      }
    ],
    "l2-sensitive-04": [
      {
        "text": "**Johnson and Newport** studied **critical period effects in second-language learning**, in a paper about **the influence of maturational state on the acquisition of English as a second language**. **Lenneberg (1967) hypothesized that language could be acquired only within a critical period**, from early infancy until puberty.",
        "children": [
          "In its basic form, the hypothesis only has consequences for first-language acquisition.",
          "It is important to find out whether it extends to second-language acquisition as well.",
          "If it does, young children should be better second-language learners than adults and should reach higher final levels of proficiency."
        ]
      },
      {
        "text": "The prediction was tested by comparing the **English proficiency of 46 native Korean or Chinese speakers** who had **arrived in the United States between the ages of 3 and 39**.",
        "children": [
          "By the time of testing, they had lived in the United States **between 3 and 26 years**.",
          "They were tested on **a wide variety of structures of English grammar** using a **grammaticality judgment task**."
        ]
      },
      {
        "text": "The results showed **a clear and strong advantage for earlier arrivals over later arrivals**.",
        "children": [
          "**Test performance was linearly related to age of arrival up to puberty**. Each additional year of age at arrival meant a lower score.",
          "**After puberty, performance was low but highly variable and unrelated to age of arrival**."
        ]
      },
      {
        "text": "The age effect was **not an accidental result of differences in amount of experience with English, motivation, self-consciousness or American identification**.",
        "children": [
          "The effect **appeared on every grammatical structure tested**, although the structures varied greatly in how well later learners mastered them.",
          "The authors concluded that **a critical period for language acquisition extends its effects to second-language acquisition**."
        ]
      }
    ],
    "l2-sensitive-05": [
      {
        "text": "**Johnson and Newport** created a **grammaticality judgment test**, or **GJT**. **Participants listened to recorded sentences and simply had to say whether each sentence was grammatical or not**. **The test was untimed**.",
        "children": [
          "A **grammaticality judgment** is a decision about whether a sentence follows the rules of the language.",
          "Untimed means participants could take as long as they needed to decide."
        ]
      },
      {
        "text": "Each test item came in a grammatical version and an ungrammatical version, marked with an asterisk. Each pair tests one rule of English, and the test covers many different rules.",
        "children": [
          "**(1a) “The farmer bought two pigs at the market”** versus **(1b) “The farmer bought two pig at the market”** tests **plural marking** on nouns.",
          "**(2a) “The little boy is speaking to a policeman”** versus **(2b) “The little boy is speak to a policeman”** tests the **progressive -ing** form of the verb."
        ]
      },
      {
        "text": "**(6a) “Tom is reading a book in the bathtub”** versus **(6b) “Tom is reading book in the bathtub”** tests the use of a **determiner**, here the article “a.”",
        "children": [
          "**(7a) “The boys are going to the zoo this Saturday”** versus **(7b) “A boys are going to the zoo this Saturday”** tests whether the determiner matches the noun in number.",
          "**(8a) “Larry went home after the party”** versus **(8b) “Larry went the home after the party”** tests a case where English does **not** allow an article."
        ]
      },
      {
        "text": "**(23a) “When will Sam fix his car?”** versus **(23b) “When Sam will fix his car?”** tests **wh-question** word order, where the helping verb must come before the subject.",
        "children": [
          "**(24a) “What do they sell at the corner store?”** versus **(24b) “What they sell at the corner store?”** tests the need for the helping verb “do” in a question."
        ]
      }
    ],
    "l2-sensitive-06": [
      {
        "text": "**The data** are plotted as **items correct** out of 276 against **age of arrival**, or **AOA**, with one point for each participant. The two graphs split the participants at puberty, the end of the critical period in Lenneberg’s proposal.",
        "children": [
          "The left graph covers **early arrivals**, aged **3 to 15**, with a correlation of **r = −0.87**.",
          "The right graph covers **late arrivals**, aged **17 to 39**, with a correlation of **r = −0.16**.",
          "A **correlation**, written r, measures how closely two variables are related, from −1 to +1. A value near −1 means one variable falls steadily as the other rises. A value near 0 means little relationship."
        ]
      },
      {
        "text": "Among **early arrivals**, scores fall steadily as age of arrival increases.",
        "children": [
          "Children arriving between about 3 and 7 score near the maximum, around 270.",
          "Scores fall to around 250 for arrivals near age 10 and to around 210 to 230 for arrivals near age 15.",
          "The strong negative correlation means age of arrival predicts much of the score in this group."
        ]
      },
      {
        "text": "Among **late arrivals**, scores are lower overall and widely scattered, from about 160 to 250.",
        "children": [
          "Some late arrivals score around 250, while others of similar age score below 180.",
          "The weak correlation means age of arrival predicts little about who does well among adults. The pattern combines a strong age effect in childhood with lower, highly variable performance in adulthood."
        ]
      }
    ],
    "l2-sensitive-07": [
      {
        "text": "The **Johnson and Newport data** have three main features.",
        "children": [
          "There is **a strong relationship between AOA and accuracy**. Earlier arrival goes with higher scores.",
          "**Early learners, up to about age 8, are often near-perfect**, which means **native-like**. Their scores cluster at the top of the scale, close to native English speakers.",
          "There is a **nearly random distribution of accuracy for late arrivals**. Among adults, age of arrival barely predicts the score."
        ]
      },
      {
        "text": "The first two features describe childhood learners.",
        "children": [
          "Children arriving very young reach native-like grammar.",
          "Children arriving between about 8 and 15 reach progressively lower levels, so the decline starts well before puberty."
        ]
      },
      {
        "text": "The phrase **“nearly random distribution”** has a specific meaning.",
        "children": [
          "It refers to the weak relationship between age of arrival and score among late arrivals.",
          "Late arrivals scored well above chance, but their scores varied greatly from person to person. Two adults who arrived at the same age could end up with very different scores."
        ]
      }
    ],
    "l2-sensitive-08": [
      {
        "text": "**Johnson and Newport argue that these data are consistent with a sensitive period**, which they actually call a **“critical period,”** for L2 learning. Their argument has two parts.",
        "children": []
      },
      {
        "text": "**First, the dependence of ultimate attainment on AOA is consistent with a loss of language-learning ability over development**.",
        "children": [
          "**Ultimate attainment** is the final level of skill a learner reaches.",
          "The steady drop in scores with later arrival in childhood suggests that the ability to learn language declines as children mature.",
          "**The timing is not entirely consistent with Lenneberg’s hypothesis**. Lenneberg placed the end of the critical period at puberty, but the decline in these data starts much earlier, around age 7 or 8.",
          "Lenneberg **was working with a large gap in the data between early childhood and adolescence**, since there were no brain measurements between ages 2 and 18, so his timing was a rough estimate."
        ]
      },
      {
        "text": "**Second, attainment in late acquisition is all over the place**, with adults who arrived at the same age reaching very different levels.",
        "children": []
      },
      {
        "text": "**After the sensitive period closes, attainment depends on idiosyncratic learning abilities, not on the usual language acquisition processes**.",
        "children": [
          "**Idiosyncratic learning abilities** are individual differences in skills such as memory, motivation or analytical ability.",
          "Children all learn through the same natural acquisition process, so they reach similar levels at similar ages.",
          "Adults no longer have that process available and must rely on their individual abilities, which vary greatly from person to person."
        ]
      }
    ],
    "l2-sensitive-09": [
      {
        "text": "There are **two versions of the “critical period” hypothesis**.",
        "children": []
      },
      {
        "text": "**Version one is the exercise hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**If the capacity is not exercised during this time, it will disappear or decline with maturation**.",
          "**If the capacity is exercised, however, further language-learning abilities will remain intact throughout life**.",
          "On this view, an adult who learned L1 normally should still be able to learn L2 as well as a child."
        ]
      },
      {
        "text": "**Version two is the maturational state hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**This capacity disappears or declines with maturation**, whether or not it has been used.",
          "On this view, even someone who learned L1 normally will learn L2 less well as an adult."
        ]
      },
      {
        "text": "Johnson and Newport’s participants all had a normal first language, yet their L2 learning was worse when they started later.",
        "children": [
          "This fits the **maturational state hypothesis**, matching the title of the paper."
        ]
      },
      {
        "text": "This raises the question of **whether the L1 critical period data should be interpreted differently**.",
        "children": [
          "Cases like Genie involve a capacity that was never exercised, which both hypotheses predict would lead to poor learning.",
          "Only second-language data can tell the two versions apart, because only L2 learners have exercised the capacity before learning another language."
        ]
      }
    ],
    "l2-sensitive-10": [
      {
        "text": "A **methodological issue** concerns **test design**. **The grammaticality judgment task is very different from fluent language use**.",
        "children": [
          "In fluent speech, people produce and understand language quickly, without stopping to think about rules.",
          "In a grammaticality judgment task, people consider each sentence and decide whether it is correct."
        ]
      },
      {
        "text": "**One concern is the use of “metalinguistic” or “explicit” knowledge**. **Metalinguistic knowledge** is conscious knowledge about language, such as knowing the rule that English plurals add “-s.”",
        "children": []
      },
      {
        "text": "**Ellis (2005)** contrasts **implicit** and **explicit knowledge** on several characteristics.",
        "children": [
          "**Awareness**. Implicit knowledge involves **intuitive awareness** of linguistic norms, while explicit knowledge involves **conscious awareness**.",
          "**Type of knowledge**. Implicit knowledge is **procedural** knowledge of rules and fragments, meaning knowing how to do something. Explicit knowledge is **declarative** knowledge of grammatical rules and fragments, meaning knowing facts that can be stated.",
          "**Systematicity**. Implicit knowledge is variable but systematic. Explicit knowledge is often anomalous and inconsistent.",
          "**Accessibility**. Implicit knowledge is accessed through **automatic processing**. Explicit knowledge is accessed through **controlled processing**, which takes effort.",
          "**Use of L2 knowledge**. Implicit knowledge is used during **fluent performance**. Explicit knowledge is used when a speaker is **planning** and having difficulty.",
          "**Self-report**. Implicit knowledge is **nonverbalizable**, so people cannot explain it. Explicit knowledge is **verbalizable**.",
          "**Learnability**. Implicit knowledge is **potentially only learnable within the critical period**. Explicit knowledge is learnable at **any age**."
        ]
      },
      {
        "text": "If an untimed GJT allows people to use explicit knowledge, it may not measure the implicit knowledge that the critical period is supposed to affect. A learner could reach the right answer by consciously applying a taught rule, and the score would be the same.",
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
        "text": "A table gives the **correlations between starting age and years of formal instruction** and each test.",
        "children": [
          "For **imitation**, the correlations were −0.11 with starting age and 0.10 with formal instruction.",
          "For **oral narrative**, they were 0.03 and −0.05.",
          "For the **timed GJT**, starting age had a significant correlation of **−0.23**, while formal instruction had 0.17.",
          "For the **untimed GJT with grammatical items**, they were −0.05 and 0.03.",
          "For the **untimed GJT with ungrammatical items**, starting age had −0.02, while formal instruction had a significant **0.27**.",
          "For **metalinguistic knowledge**, they were 0.05 and 0.18."
        ]
      },
      {
        "text": "**Consistent with this, untimed GJT performance is correlated with years of formal education in L2**.",
        "children": [
          "Formal classroom instruction teaches explicit rules, which help on the untimed test.",
          "Starting age was related to the timed GJT, which limits the use of explicit rules.",
          "An age effect found with an untimed GJT may therefore partly reflect explicit, taught knowledge rather than natural grammar acquisition."
        ]
      }
    ],
    "l2-sensitive-12": [
      {
        "text": "Another **methodological and theoretical issue** is **transfer**. **Transfer** is the use of first-language knowledge in learning a second language.",
        "children": [
          "**Languages that are typologically more similar can benefit more from transfer**. **Typological** similarity is similarity in how languages are structured, such as their word order and word forms.",
          "Cognates and loan words, such as French **auto**, **rivière** and **bicyclette**, and Japanese **korokke** and **monoreru**, give learners familiar words to build on."
        ]
      },
      {
        "text": "**Johnson and Newport tested people with English as their L2 and Chinese or Korean as their L1**.",
        "children": [
          "Chinese and Korean are very different from English in grammar and vocabulary.",
          "These learners got little help from transfer."
        ]
      },
      {
        "text": "The question is **what would happen if the languages were more similar**.",
        "children": [
          "Speakers of a language close to English could use much of what they already know.",
          "They might show a different relationship between age and attainment. If so, the age pattern in Johnson and Newport’s data would depend on the particular languages involved as well as on age."
        ]
      }
    ],
    "l2-sensitive-13": [
      {
        "text": "**Not all aspects of the grammar are equally difficult**. A graph plots the **mean percentage of errors on 12 types of English rules** for native speakers and for groups that arrived at ages **3–7**, **8–10**, **11–15**, **17–24** and **25–39**.",
        "children": [
          "The rule types are **determiners** (DET), **plurals** (PLU), **verb subcategorization** (SUB), **past tense** (PST), **pronouns** (PRO), **particles** (PAR), **auxiliaries** (AUX), **third-person singular** (3P), **wh-questions** (WHQ), **yes/no questions** (YNQ), **word order** (ORD) and **progressive -ing** (ING). **Verb subcategorization** is the set of rules for which kinds of words or phrases a verb can take after it.",
          "Native speakers and the youngest arrivals make very few errors on any rule.",
          "The latest arrivals, aged 17–24 and 25–39, make the most errors on **determiners**, around 65 to 68%, and on **plurals**, around 45 to 55%.",
          "Errors on **word order** and **progressive -ing** are low for every group, under about 10%."
        ]
      },
      {
        "text": "**Some of this looks like the order in which children learn language**. **Progressive -ing and word order are easiest**, and these are also among the first structures children master.",
        "children": []
      },
      {
        "text": "**Some could be transfer**.",
        "children": [
          "**Chinese has no determiners**. Chinese speakers have no L1 category for “a” and “the,” so they find English articles especially hard.",
          "**Children learn questions very late, but questions are among the easiest structures for late learners**. Adults may benefit from general cognitive skills or knowledge from their L1 when learning question forms.",
          "Which structures are hard depends on both the structure itself and what the learner already knows from their first language."
        ]
      }
    ],
    "l2-sensitive-14": [
      {
        "text": "**Birdsong and Molis (2001)** repeated the Johnson and Newport study with **Spanish speakers learning English**. The graphs compare the two studies.",
        "children": [
          "For **Chinese and Korean speakers learning English**, from Johnson and Newport, early arrivals aged 3–15 had a correlation of **r = −0.87**, and late arrivals aged 17–39 had **r = −0.16**.",
          "For **Spanish speakers learning English**, early arrivals aged 3–16 had a correlation of only **r = −0.23**, and late arrivals aged 17–44 had **r = −0.69**."
        ]
      },
      {
        "text": "The Spanish speakers showed almost the reverse pattern.",
        "children": [
          "**Early arrivals** scored near the maximum regardless of age, with only a slight decline even for those arriving around 16.",
          "**Late arrivals** showed a strong decline with age, with scores falling from around 260 for those arriving near 18 to around 160 for those arriving after 40."
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
        "text": "It may not even be possible to call these findings **“conclusions.”** **Overall, L2 attainment is lower for older learners**. This much holds across studies.",
        "children": []
      },
      {
        "text": "**How much lower depends on several factors**.",
        "children": [
          "**What constructions are tested**. Some structures, like determiners, are much harder for late learners than others, like word order.",
          "**How they are tested**. A timed test and an untimed test can give different results, because the untimed test allows explicit knowledge.",
          "**Language pairings**. Spanish speakers and Chinese or Korean speakers show different age patterns when learning English."
        ]
      },
      {
        "text": "**It is hard to separate** several factors that tend to go together.",
        "children": [
          "**Age of acquisition from the amount and quality of experience**. People who arrive younger usually have more years of exposure and more immersive experiences, such as schooling in the language.",
          "**Transfer effects from L2 acquisition**. Performance in L2 reflects both what is learned and what carries over from L1.",
          "**Performance from competence**, generally speaking. **Competence** is underlying knowledge of the language, and **performance** is how well that knowledge is used on a particular task. A test score reflects performance, which may not directly reveal competence."
        ]
      }
    ],
    "l2-sensitive-16": [],
    "review-1": [],
    "review-2": [
      {
        "text": "A **speech continuum** is a set of sounds that change gradually along one controlled acoustic property. These stimuli are built by **keeping F1 constant** and **varying the F2 onset frequency linearly** from stimulus 1 to stimulus 13. The **F2 onset frequency** is the frequency at which the second formant begins its transition.",
        "children": [
          "Keeping F1 constant removes one possible source of difference between stimuli.",
          "Varying the F2 onset **linearly** means the onset frequency changes by the same step every time. **Adjacent stimuli differ by the same amount across the entire continuum**."
        ]
      },
      {
        "text": "The F2 transitions move gradually along the continuum.",
        "children": [
          "At the start, F2 begins well below its steady vowel frequency, so the transition rises.",
          "As the onset frequency increases, the rise shrinks until the transition is nearly flat.",
          "Further along, F2 starts above the vowel frequency, and the transition falls."
        ]
      },
      {
        "text": "Because each step is physically equal, the continuum is a fair test of whether perception follows the acoustics or the categories.",
        "children": [
          "Some neighboring pairs fall inside one consonant category, and some pairs cross a category boundary.",
          "A purely acoustic listener would hear every step as the same size of change.",
          "If perception is categorical, steps within a category will sound alike while steps across a boundary will sound different. Any advantage for boundary-crossing pairs comes from the boundary itself."
        ]
      }
    ],
    "review-3": [
      {
        "text": "An **ideal observer model** predicts how a listener would respond if perception worked according to a particular account. This version assumes that perception is **non-categorical**, so it tracks the acoustic signal gradually without sharp category boundaries.",
        "children": [
          "The model is a baseline. Real data can be compared against it to see whether perception is more categorical than a gradual account allows."
        ]
      },
      {
        "text": "The first prediction is that **categorization gets “blurry” as you move away from category prototypes**. A **prototype** is the clearest example of a category. The endpoints of the continuum are /b/ and /g/, with /d/ in the middle.",
        "children": [
          "Between two prototypes, **stimulus ambiguity scales with the distance from the prototype**. The farther a stimulus is from the /b/ prototype, the less /b/-like and the more /d/-like it sounds.",
          "**Stimulus 2** would be heard as **75% /b/ and 25% /d/**. It is a quarter of the way from the /b/ prototype toward the /d/ prototype, so the responses split in the same proportion."
        ]
      },
      {
        "text": "The predicted **labeling** graph plots the proportion of /b/, /d/ and /g/ responses from 0 to 1 across stimuli 1 to 11.",
        "children": [
          "The /b/ line stays at 1 through stimulus 2 and then falls in a straight line to 0 at stimulus 6.",
          "The /d/ line rises in a straight line from stimulus 2 to a peak of 1 at stimulus 6 and then falls back to 0 at stimulus 10.",
          "The /g/ line starts rising after stimulus 6 and reaches 1 at stimulus 10. Neighboring lines cross at 0.5 halfway between their prototypes. Every change is a gradual straight slope rather than a sharp step."
        ]
      }
    ],
    "review-4": [
      {
        "text": "The same ideal observer can also assume that perception is **linear**, so equal acoustic differences are perceived as equally large. This leads to a second prediction, which is that **discrimination performance should be independent of labeling**.",
        "children": [
          "**Labeling** asks a listener to identify a sound as /b/, /d/ or /g/.",
          "**Discrimination** asks only whether two sounds are the **same or different**. These are separate tasks, even when they use the same continuum."
        ]
      },
      {
        "text": "Labeling **has to have a “peaked” function**. There are three categories, and listeners are choosing between labels, so each category’s responses rise toward its prototype and fall away from it.",
        "children": [
          "In the predicted labeling graph, the /d/ line forms a peak at stimulus 6 while /b/ and /g/ rise toward opposite ends.",
          "These peaks come from the structure of the labeling task."
        ]
      },
      {
        "text": "The predicted **discrimination** graph plots accuracy for pairs two steps apart, from **1 vs. 3** through **9 vs. 11**. Accuracy is a flat line at about 0.8 for every pair.",
        "children": [
          "If the perception of differences in F2 onset were constant across the continuum, discrimination accuracy would also be constant.",
          "Each pair has the same physical separation, so a linear account gives each pair the same chance of being heard as different.",
          "Under this account, discrimination stays level even where labeling changes. A flat line would mean category boundaries play no role in hearing differences, while a peaked line would mean the boundaries make some differences easier to hear."
        ]
      }
    ],
    "review-5": [
      {
        "text": "**Liberman and colleagues (1957)** measured actual labeling and discrimination along the /b/–/d/–/g/ continuum. Their results departed sharply from the non-categorical, linear predictions.",
        "children": [
          "Listeners labeled each stimulus and also judged pairs of stimuli in discrimination tests.",
          "The discrimination tests compared stimuli **one step**, **two steps** and **three steps** apart."
        ]
      },
      {
        "text": "The **labeling data** show **sharp changes** in identification.",
        "children": [
          "Stimuli 1 through about 3 are labeled /b/ close to 100% of the time.",
          "Around stimuli 4 and 5, /b/ responses drop steeply and /d/ responses climb to nearly 100%. /d/ stays dominant through about stimulus 8.",
          "Around stimuli 9 and 10, /d/ responses drop steeply and /g/ responses rise to near 100%. These switches are far more abrupt than the straight-line slopes the ideal observer predicted."
        ]
      },
      {
        "text": "**Listeners were best at discriminating sounds near the category boundaries**.",
        "children": [
          "In each discrimination graph, the solid line is the obtained accuracy and the dashed line is the accuracy predicted from the labeling data.",
          "Accuracy peaks around the /b/–/d/ boundary and again around the /d/–/g/ boundary. Between those peaks, the predicted accuracy falls to about 50%, which is chance.",
          "The peaks appear in one-step, two-step and three-step comparisons. Larger steps raise accuracy overall, but the peaks stay at the boundaries."
        ]
      },
      {
        "text": "The predictions derived from labeling capture much of the shape of the obtained discrimination.",
        "children": [
          "Obtained accuracy is often somewhat higher than the prediction, especially within categories.",
          "Listeners therefore keep some sensitivity to acoustic differences beyond pure category labels."
        ]
      }
    ],
    "review-6": [
      {
        "text": "The bear–pear eye-tracking result is one piece of evidence for **cascaded processing** in speech perception. It would be hard to explain why **the number of looks to the other member of the minimal pair increases gradually as you approach the category boundary** in a thresholded model. A **minimal pair** is two words that differ by only one sound, such as bear and pear.",
        "children": [
          "The competitor looks rise steadily as VOT approaches the boundary.",
          "The effect holds even when the final response is the same, so it comes from graded activation within one category."
        ]
      },
      {
        "text": "In the threshold diagram, the arrow from **feature activation** to **phoneme activation** is crossed out with a red X.",
        "children": [
          "The feature activation keeps swinging between +voiced and −voiced.",
          "The phoneme activation stays flat until /b/ suddenly jumps at the end.",
          "No graded information passes to the phoneme level before the threshold is crossed."
        ]
      },
      {
        "text": "In a threshold-only account, every token assigned to a category sends the **same finished phoneme** to the word level.",
        "children": [
          "Word-level competition should then be the same for every token of /b/, with no varying input to produce gradually changing competitor looks.",
          "A cascaded account explains the effect directly. More support for the competing phoneme passes along more support for its word."
        ]
      }
    ],
    "review-7": [
      {
        "text": "The **TRACE** model also incorporates **feedback from the lexical layer to the phoneme layer**. In the TRACE diagram, arrows run up from the phoneme layer to the word layer and back down from the word layer to the phoneme layer.",
        "children": [
          "**Lexical feedback** means that an activated word sends support back to its own phonemes.",
          "An uncertain sound can partly activate a word, and that word can then strengthen the interpretation of the sound that fits it."
        ]
      },
      {
        "text": "Influence can therefore run in both directions.",
        "children": [
          "Acoustic evidence changes which words are active.",
          "Active words change the balance between possible phonemes while the phoneme decision is still forming.",
          "This helps listeners recover from noisy or ambiguous input."
        ]
      },
      {
        "text": "**Feedback is different from cascading**.",
        "children": [
          "Cascading passes incomplete evidence forward from features to phonemes and from phonemes to words.",
          "Feedback sends influence from words back down to phonemes.",
          "An interactive model can include both. Findings in which knowledge of words changes how sounds are heard, such as the Ganong effect, are what motivate adding feedback."
        ]
      }
    ],
    "review-8": [
      {
        "text": "One possibility is a **late “correction” process**. Under this account, **categorical perception works as usual, but there is a bias to report having heard a word**.",
        "children": [
          "The listener first categorizes the sound with no help from word knowledge.",
          "At the response stage, the listener leans toward saying the option that forms a real word."
        ]
      },
      {
        "text": "This account predicts a **general reporting bias**. The prediction graphs plot the **proportion of voiced responses** across the continuum from short VOT to long VOT, with the boundary in the middle at −7.5, −2.5, +2.5 and +7.5 milliseconds.",
        "children": [
          "Three conditions are compared. In **word–nonword**, the voiced end forms a word. In **neutral**, neither end has a lexical advantage. In **nonword–word**, the voiceless end forms a word.",
          "The word–nonword curve is shifted up by a constant amount everywhere, including the long VOT end, where it stays near 0.25 instead of falling to 0.",
          "The nonword–word curve is shifted down at the short VOT end, starting near 0.75 instead of 1."
        ]
      },
      {
        "text": "The top graph plots the **lexical effect**, which is the difference between the two lexical conditions at each step. Under this account, it is a flat line near **0.25** across the whole continuum.",
        "children": [
          "A reporting bias added after categorization favors the word equally at every point, with the same size at clear and ambiguous steps.",
          "Perception and knowledge stay separate, and word knowledge only nudges the reported response."
        ]
      }
    ],
    "review-9": [
      {
        "text": "A second possibility is that **word knowledge shifts the categorical boundary**. Under this account, word knowledge changes where the listener switches from one phoneme category to the other.",
        "children": [
          "Near an ambiguous onset, the interpretation that forms a real word gets extra support.",
          "The effect changes categorization itself."
        ]
      },
      {
        "text": "In the prediction graphs, the word–nonword, neutral and nonword–word curves all start near 1 at short VOT and end near 0 at long VOT.",
        "children": [
          "The curves separate only in the middle, near the boundary.",
          "The word–nonword curve crosses the boundary later, and the nonword–word curve crosses earlier."
        ]
      },
      {
        "text": "The **lexical effect** graph forms a peak. It is near 0 at the endpoints, rises to about **0.35** for the items closest to the boundary, and falls again.",
        "children": [
          "The lexical effect is **strongest for items closest to the category boundary**, because those are the stimuli for which lexical information can help resolve ambiguity about the first phoneme.",
          "At the endpoints, strong acoustic evidence already settles the consonant, leaving little room for word knowledge to help."
        ]
      },
      {
        "text": "The word ending provides the same lexical advantage at every step, but the onset is not equally uncertain at every step. Where the effect occurs therefore matters. A flat effect points to a reporting bias, while a peaked effect points to a shift in the boundary itself.",
        "children": []
      }
    ],
    "review-10": [
      {
        "text": "**Ganong’s results** are strikingly consistent with the **second model**, the boundary-shift account.",
        "children": [
          "The proportion of voiced responses for **word–nonword** and **nonword–word** conditions starts near 1 at short VOT and falls toward 0 at long VOT.",
          "The two curves separate most in the middle, near the boundary.",
          "The **lexical effect** graph rises from about 0.1 at the endpoints to a peak near **0.3** at the boundary and then falls back."
        ]
      },
      {
        "text": "The peaked effect rules out a simple reporting bias. Word knowledge matters most where the acoustic evidence is weakest.",
        "children": [
          "At the boundary, the word that fits the context tips the balance.",
          "At the endpoints, the acoustic evidence decides the answer on its own."
        ]
      },
      {
        "text": "Ganong raised a number of possibilities for how this could happen, focusing on different kinds of **guessing strategies**.",
        "children": [
          "A guessing strategy would let listeners use word knowledge only when they were unsure about the sound."
        ]
      },
      {
        "text": "Other models emphasize the potential role of **feedback** in these shifts.",
        "children": [
          "In **interactive models**, an activated word sends support back to its own phonemes.",
          "The whole-word representation can therefore affect how an ambiguous part of the word is interpreted during recognition."
        ]
      }
    ],
    "review-11": [
      {
        "text": "A **simulation of the Ganong effect in the TRACE model** tracks **phoneme-level and word-level activations** at several points as a segment unfolds. The input begins with a sound **ambiguous between /b/ and /p/**, followed by **/l/**, the vowel **/ʌ/**, and **/g/**, which together make the word **plug**.",
        "children": [
          "The figure has four time frames from left to right. Each frame has word activations in the upper panel and phoneme activations in the lower panel."
        ]
      },
      {
        "text": "In the **first frame**, only the ambiguous first sound has arrived.",
        "children": [
          "**/b/** and **/p/** are both weakly active at about the same level, near 0.15 to 0.2.",
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
          "**Plug** rises to the top of the word panel, at about 0.45, while the alternatives fall away.",
          "/p/ ends up more active than /b/ at the phoneme level."
        ]
      }
    ],
    "review-12": [
      {
        "text": "As the input unfolds, **activity accumulates for “plug,”** especially when the **final /g/** arrives. The /g/ is highly inconsistent with **“blood”** and **“blush,”** which were also activated in the third frame.",
        "children": [
          "Blood and blush fit the early part of the input, so they were plausible candidates for a while.",
          "Once /g/ arrives, they lose support because their endings do not match."
        ]
      },
      {
        "text": "TRACE therefore explains **word effects on phoneme category boundaries** in terms of **top-down processing**. Top-down processing means that higher-level knowledge influences lower-level analysis.",
        "children": [
          "**Activity at the lexical level produces feedback to the phoneme level**.",
          "The feedback gives **greater activation to the phoneme consistent with a word**. Because plug is the winning word, /p/ receives extra support."
        ]
      },
      {
        "text": "The ambiguous beginning becomes less ambiguous because /p/ belongs to the word supported by the full sequence.",
        "children": [
          "Information that arrives at the end of a word can reach back and shape how an earlier sound is heard.",
          "The effect happens through interactions during recognition, so the ambiguous first sound comes to be heard as /p/."
        ]
      }
    ],
    "review-13": [
      {
        "text": "**Syntactic explanations** of the garden path effect start with the idea of a **parser**. A parser is a mental process whose job is to build a **syntactic tree** for the sentences we hear or read. A syntactic tree represents how words group into phrases and how those phrases relate to one another.",
        "children": [
          "The tree for the correct reading has **S**, for sentence, at the top, splitting into a large **NP**, or noun phrase, and a **VP**, or verb phrase.",
          "The large NP contains **D** for determiner, “the,” and **N** for noun, “horse,” plus a reduced clause, marked **S′**, holding “that was raced past the barn.” The words “that” and “was” are silent in the actual sentence, and an empty position marked **e** stands where the missing subject would be.",
          "Inside that clause, raced is a verb with a **prepositional phrase**, or **PP**, “past the barn,” and the main **VP** at the far right contains only **fell**."
        ]
      },
      {
        "text": "The **failed parse** is drawn below the words.",
        "children": [
          "In that tree, “the horse” forms an ordinary NP, and “raced past the barn” forms the VP, with raced as the main verb.",
          "**Fell** is left dangling with nowhere to attach, and the failed tree ends with the exclamation **“¡ACK!”**",
          "The trees and the dinosaur comic both come from a Language Log piece on this sentence."
        ]
      },
      {
        "text": "Any parser has to cope with the fact that it runs inside a cognitive system with **limited memory** and **time constraints**.",
        "children": [
          "Words arrive quickly, and the parser cannot wait until the end of the sentence to start building structure.",
          "It can also keep track of only a limited number of structures at once."
        ]
      }
    ],
    "review-14": [
      {
        "text": "The **grammatical version** of the horse sentence is **much more complex syntactically** than the failed parse. Specifically, it has **many more nodes**. A **node** is a point in a syntactic tree that represents a grammatical grouping, such as an NP, a VP or an S.",
        "children": [
          "The correct tree needs extra nodes for the embedded clause, S′ and S, plus nodes for the silent “that” and “was.”",
          "The failed parse simply attaches “raced past the barn” as the main VP, which takes far fewer nodes."
        ]
      },
      {
        "text": "One strategy that saves space is to **initially prefer smaller trees**. This strategy is called **“minimal attachment.”**",
        "children": [
          "Under minimal attachment, the parser attaches each new word into the existing structure using the fewest possible new nodes.",
          "Building fewer nodes means less structure to construct and hold in memory at that moment."
        ]
      },
      {
        "text": "In the horse sentence, minimal attachment favors treating **raced as the main verb**, because that analysis needs the fewest nodes.",
        "children": [
          "The alternative, where raced past the barn modifies horse, needs an embedded relative clause, so the parser does not choose it first.",
          "Choosing the smaller structure reduces the immediate processing load, but it creates a garden path. When fell arrives, it requires the larger structure that was not chosen, and the reader has to rebuild the tree."
        ]
      }
    ],
    "review-15": [
      {
        "text": "Another parsing strategy in this framework is **“late closure.”** Late closure is a bias to **keep the current clause “open” as long as possible**, so that new words get attached to the phrase currently being built.",
        "children": [
          "Keeping a clause open means the parser keeps adding incoming material to it rather than closing it off and starting a new structure."
        ]
      },
      {
        "text": "In **“The burglar blew open the safe with the dynamite,”** the phrase **“with the dynamite”** wants to associate with the big **verb phrase** starting with **“blew open.”** Frazier (1987) gives two trees for this sentence.",
        "children": [
          "In the **preferred** tree, the PP “with the dynamite” attaches to the **VP**. This is **verb-phrase attachment**, and it means the dynamite is the **instrument** the burglar used to blow open the safe.",
          "In the **unpreferred** tree, the PP attaches to the **NP** “the safe.” This is **noun-phrase attachment**, and it means the phrase describes which safe was blown open, namely the safe that had the dynamite."
        ]
      },
      {
        "text": "Both attachments are grammatical, but they express different relationships.",
        "children": [
          "Late closure keeps the verb phrase open, so the incoming phrase joins it.",
          "The preferred VP attachment is also the minimal attachment here, because it needs fewer nodes than building an extra NP around “the safe with the dynamite.”",
          "For this sentence, the preferred parse is also the sensible one, so readers reach the right meaning without difficulty."
        ]
      }
    ],
    "review-16": [
      {
        "text": "Late closure can be seen at work in a sentence that **requires the “unpreferred” parse to be sensible**, such as **“The burglar blew open the safe with the jewels.”**",
        "children": [
          "Jewels are an implausible tool for blowing open a safe.",
          "The sensible meaning is that the burglar blew open **the safe that contained the jewels**. That meaning requires attaching “with the jewels” to the noun phrase “the safe,” which is the unpreferred NP attachment."
        ]
      },
      {
        "text": "In **careful tests of reading time and eye movements**, people are **slower to read sentences where the sensible reading requires the unpreferred parse**.",
        "children": [
          "Reading time measures how long readers spend on each part of a sentence.",
          "Eye movement recordings track where readers look and when they jump back to reread earlier words.",
          "The extra time appears at the point where the parse has to change."
        ]
      },
      {
        "text": "Readers **momentarily entertain the idea that the jewels were used to blow open the safe**, and then have to **retrace their steps**.",
        "children": [
          "The parser first attaches the phrase to the verb phrase, following its usual preference.",
          "The meaning of jewels conflicts with the instrument reading, so the parser revises the attachment to the noun phrase.",
          "The final meaning is easy to understand, but the route to it carries a measurable processing cost."
        ]
      }
    ],
    "review-17": [
      {
        "text": "This syntactic explanation rests on the idea of a **parser that deals exclusively with the abstract syntactic structure** of the sentence. This parallels the **“lumber mill”** model of thresholded processing in speech perception.",
        "children": [
          "In the lumber mill picture, each stage works on its own kind of input and hands a finished product to the next stage.",
          "Here, the parser builds a syntactic structure using only grammatical categories, without consulting meaning or context. Meaning is worked out afterward from the finished structure."
        ]
      },
      {
        "text": "The parser has **its own operating characteristics**.",
        "children": [
          "It wants to make **the simplest tree possible**, which is **minimal attachment**.",
          "It accomplishes this partly by **leaving clauses open as long as possible**, which is **late closure**.",
          "These preferences limit how much structure must be built and held in memory at once."
        ]
      },
      {
        "text": "This is one way of dealing with ambiguity **very efficiently**. The strategy is to **ignore ambiguity until it becomes a problem**.",
        "children": [
          "The parser commits to one likely structure and builds only that one. Most of the time the first choice works, and no extra effort is needed.",
          "When a later word does not fit, the structure has to be revised. That revision is the source of garden path difficulty, and it is the price of an efficient strategy."
        ]
      }
    ],
    "review-18": [
      {
        "text": "**“World knowledge” can be very local**. It can come from the immediate visual situation as well as from general knowledge. **Spivey and colleagues (1995)** tested this in a visual world task.",
        "children": [
          "Participants saw real objects, namely **a pencil, a box, an empty towel, and an apple sitting on a towel**.",
          "They heard the instruction **“Put the apple on the towel in the box”** and carried it out while their eye movements were recorded."
        ]
      },
      {
        "text": "With **minimal attachment**, “the towel” would temporarily seem like the end of the clause **“put the apple on the towel.”**",
        "children": [
          "On that reading, “on the towel” names the **destination**, the place the apple should go.",
          "In the intended reading, “on the towel” describes **which apple** to move, the one already on a towel, and **“in the box”** is the destination."
        ]
      },
      {
        "text": "People **do seem to look at the empty towel while planning their movements**, as though they are considering it as a target, before planning a movement to the box.",
        "children": [
          "The diagram of a typical sequence of eye movements in the **one-referent context**, with one apple, marks each look with a letter. **A** is a look to the apple, **B** is a look to the empty towel, the incorrect destination, and **C** is a look to the box.",
          "For the **ambiguous** instruction, the timeline puts A near 1,000 milliseconds, B shortly after, and C near 2,000 milliseconds.",
          "For the **unambiguous** instruction, **“Put the apple that’s on the towel in the box,”** the looks go from the apple, marked **A′**, straight to the box, marked **B′**, with no look to the empty towel."
        ]
      },
      {
        "text": "The listener recognizes every word correctly. The error comes from treating the location phrase as the destination, which briefly changes the planned action.",
        "children": []
      }
    ],
    "review-19": [
      {
        "text": "A **two-referent context** changes the display so that it contains **two apples**. One apple sits on a towel, and the other sits elsewhere in the display. The empty towel and the box are still present.",
        "children": [
          "Now “the apple” alone does not say which apple to move.",
          "The phrase **“on the towel”** becomes useful, because it picks out one apple from the two."
        ]
      },
      {
        "text": "The diagram gives the typical sequence of eye movements in the two-referent context.",
        "children": [
          "Participants look first at the apple on the towel, marked **A**, and then at the box, marked **C**.",
          "Looks to the empty towel, marked **B**, are much less common.",
          "The note under the figure states that **the sequence and the timing of eye movements**, measured relative to the nouns in the speech stream, **did not differ** for the ambiguous and the unambiguous instructions."
        ]
      },
      {
        "text": "In this setting, the ambiguous instruction is processed just like the explicit instruction with “that’s on the towel.”",
        "children": [
          "With two apples present, the listener needs to know which apple, so a phrase that picks one out is expected.",
          "Listeners treat “on the towel” as a description of the apple from the start, and the destination reading never takes hold. The same sentence gets a different grammatical interpretation because the visual context is different."
        ]
      }
    ],
    "review-20": [
      {
        "text": "With **two apples in the display**, it suddenly becomes **felicitous** to provide more information about **which apple** the speaker means. **Felicitous** means appropriate and natural in the situation.",
        "children": [
          "With only one apple, there is no need to say which apple, so “on the towel” seems like extra information and is easily taken as a destination.",
          "With two apples, “on the towel” has a clear job, which is to identify the right apple."
        ]
      },
      {
        "text": "So **people do not look at the empty towel as much**. The bar graph plots the **proportion of trials with eye movements to the incorrect destination**, the empty towel, for ambiguous and unambiguous instructions in each context.",
        "children": [
          "In the **one-referent context**, ambiguous instructions led to looks at the incorrect destination on about **55%** of trials. Unambiguous instructions led to almost none.",
          "In the **two-referent context**, ambiguous instructions led to such looks on only about **17%** of trials, close to the roughly **12%** for unambiguous instructions."
        ]
      },
      {
        "text": "The words of the instruction were identical in both contexts, so the visual context alone changed how often listeners were misled.",
        "children": [
          "This is an effect of **referential context**, meaning the set of objects that a phrase could refer to.",
          "Referential context influences which grammatical relationship listeners assign while the sentence is still being heard."
        ]
      }
    ],
    "review-21": [
      {
        "text": "An attractive **dichotomy**, or two-way division, contrasts the two aphasias. **Wernicke’s aphasia** is described as **“word salad”** or **“Jabberwocky,”** often with **neologisms**, while **syntax is roughly intact**. “Jabberwocky” is Lewis Carroll’s grammatical nonsense poem.",
        "children": [
          "One Wernicke’s patient, asked about his health, replied **“I felt worse because I can no longer keep in mind from the mind of the minds to keep me from mind and up to the ear which can be to find among ourselves,”** from Kriendler and colleagues (1971).",
          "Another patient, asked about his poor vision, said **“My wires don’t hire right.”**",
          "An aphasic physician, asked if he was a doctor, replied **“Me? Yes, sir, I’m a male demaploze on my own. I still know my tubaboys what for I have that’s gone hell and some of them go.”** **Demaploze** and **tubaboys** are neologisms.",
          "One patient described a **fork** as **“a need for a schedule”** and a **spoon** as **“How many schemes on your throat.”**"
        ]
      },
      {
        "text": "**Broca’s aphasia** is described as **“telegraphic” speech**, with **difficulty with word order and grammatical particles** and **relative sparing of important content words**.",
        "children": [
          "One Broca’s patient, asked what brought him to the hospital, said **“Yes … ah … Monday … ah … Dad and P.H. (the patient’s name) and Dad … hospital. Two … ah doctors … and ah … thirty minutes … and yes … ah … hospital. And, er Wednesday … nine o’clock and eh Thursday, ten o’clock … doctors. Two doctors … and ah … teeth. Yeah … fine,”** from Badecker and Caramazza (1985).",
          "Content words such as Dad, hospital and doctors carry the story, while the grammatical words that would connect them are missing."
        ]
      },
      {
        "text": "The two patterns look like mirror images, fluent grammar with wrong words versus meaningful words with little grammar.",
        "children": []
      }
    ],
    "review-22": [
      {
        "text": "The dichotomy can also be stated in terms of what is damaged. **Wernicke’s aphasia** reflects **problems with activation, or possibly inhibition, in the lexicon**, and **Broca’s aphasia** reflects **problems with grammar**.",
        "children": [
          "The **lexicon** is the mental store of words.",
          "**Activation** makes a word candidate available. **Inhibition** suppresses competing words that should not be chosen, so weak inhibition could let wrong words slip into speech."
        ]
      },
      {
        "text": "This description is **fairly distant from how Broca described his original cases**. Paul Broca’s presentation of **Leborgne**, known as **“Tan,”** gives this behavioral description.",
        "children": [
          "Tan **could only produce one jargon syllable**, “tan.”",
          "He **seemed otherwise to be in possession of his senses**, and he in fact **seemed to understand what was being said**."
        ]
      },
      {
        "text": "Broca’s presentation raises several questions.",
        "children": [
          "Why is it critical that Leborgne had his other senses intact? Intact senses show that the loss is specific to speech, which makes it a dissociation.",
          "Why does a “capacity for articulate speech” sound like a more plausible function for a brain region than “criminality” or “philoprogenitiveness,” a phrenology term for love of one’s children?",
          "If Tan could be examined today, what measurements would specify his deficits in terms of the **levels of description used in modern linguistics**, such as phonetic, phonological, lexical and syntactic?"
        ]
      },
      {
        "text": "This creates a confusion. **Broca’s actual patients would not necessarily be classified as Broca’s aphasics** today.",
        "children": [
          "They were arguably **unable to produce speech at all**, apparently because of **motor control problems**.",
          "They would be classified as having **apraxia of speech**, a disorder in planning and coordinating the movements needed to speak. Apraxia of speech can limit output severely without any loss of grammatical knowledge."
        ]
      }
    ],
    "review-23": [
      {
        "text": "The Wernicke-as-lexicon, Broca-as-grammar dichotomy is interesting partly because it **aligns well with a sharp distinction drawn in late 20th-century formal linguistics between the grammar and the lexicon**.",
        "children": [
          "The **grammar** is the system of rules for combining words into sentences.",
          "The **lexicon** is the store of individual words, which must be memorized."
        ]
      },
      {
        "text": "This distinction starts with **Chomsky’s formulation of the computational problem of language learning**.",
        "children": [
          "We recognize a new item as a sentence **not because it matches some familiar item in any simple way**, but because **it is generated by the grammar** that each person has internalized.",
          "A sentence never heard before can still be understood because we can work out how the grammar builds its structure."
        ]
      },
      {
        "text": "Chomsky also gave **compelling demonstrations of the independence of syntax and semantics**. In Chomsky (1955), neither **(a) “colorless green ideas sleep furiously”** nor **(b) “furiously sleep ideas green colorless”** has ever occurred in an English speaker’s past experience, and yet **(a) is grammatical while (b) is not**.",
        "children": [
          "Sentence (a) has no sensible meaning, but its word order follows English grammar.",
          "Sentence (b) uses the same words in an order the grammar does not allow.",
          "The two are equally unfamiliar and equally meaningless, so the difference comes from grammar as its own system."
        ]
      },
      {
        "text": "The aphasia dichotomy maps onto this split. Wernicke’s aphasia would be a disorder of the lexicon, and Broca’s aphasia would be a disorder of the grammar.",
        "children": []
      }
    ],
    "review-24": [
      {
        "text": "**“Man bites dog”** is the newspaper example of an unexpected event. We need **psycholinguistic tests** to observe grammatical difficulties in comprehension because **in conversation, there are lots of redundant cues to what a speaker intends**. **Redundant** cues are several different sources of information that all point to the same meaning.",
        "children": []
      },
      {
        "text": "In **“The dog bit the man,”** there are **many ways to get the right meaning**.",
        "children": [
          "The listener can form the **most likely combination of DOG, BITE and MAN into an event representation**, **with or without syntax**. Dogs bite people much more often than people bite dogs.",
          "The sentence also follows **canonical word order**, which is **agent, then verb, then undergoer**, or **subject, then verb, then object**. The **agent** is the doer of the action, and the **undergoer** is the one the action happens to. In English, the first noun is usually the agent.",
          "In addition, a lot of comprehension happens in a **discourse context**, the surrounding conversation, which clarifies a great deal."
        ]
      },
      {
        "text": "Broca’s patients’ comprehension might depend on these **compensatory heuristics**. A **heuristic** is a mental shortcut, and a compensatory one makes up for a weakness elsewhere.",
        "children": [
          "A patient might simply assume the most plausible event, or assume the first noun is the doer.",
          "These shortcuts give the right answer for “The dog bit the man” without any grammatical analysis."
        ]
      },
      {
        "text": "To test grammar directly, the sentences need to defeat the shortcuts, as in **“The dog that the man is biting is angry.”** Here the **man** is doing the biting, even though dog comes first and dogs are more likely biters, so only grammatical analysis gets it right.",
        "children": []
      }
    ],
    "review-25": [
      {
        "text": "**Caramazza and Zurif** built **a list of exactly this kind of sentence, along with a set of control sentences**. Their table has four groups of eight sentences each.",
        "children": [
          "**A. Control sentences** are simple sentences in canonical order, such as **“The girl is kicking a green ball,” “The cat is chasing a blue bird”** and **“The boy is riding a new bicycle.”**"
        ]
      },
      {
        "text": "**B. Center-embedded sentences with semantic constraints** contain a clause inside another clause, but meaning makes the roles obvious. A **center-embedded** sentence has a relative clause placed in the middle of the main clause.",
        "children": [
          "Examples include **“The apple that the boy is eating is red,” “The wagon that the horse is pulling is green”** and **“The balloon that the clown is holding is round.”** Apples cannot eat boys, so meaning alone reveals who did what."
        ]
      },
      {
        "text": "**C. Reversible center-embedded sentences** use two participants who could each plausibly do the action.",
        "children": [
          "Examples include **“The cow that the monkey is scaring is yellow,” “The horse that the bear is kicking is brown”** and **“The girl that the boy is tickling is happy.”** Meaning gives no help, so only grammar reveals the roles."
        ]
      },
      {
        "text": "**D. Improbable center-embedded sentences** describe events that go against expectations.",
        "children": [
          "Examples include **“The bird that the worm is eating is blue,” “The man that the horse is riding is fat”** and **“The policeman that the robber is chasing is skinny.”** Common sense points to the wrong answer here."
        ]
      },
      {
        "text": "In all the embedded sentences, the first noun is the one acted upon, and the doer is inside the relative clause.",
        "children": [
          "A listener who relies on meaning should succeed on groups A and B and fail on C and D. A listener who parses normally should succeed on all four."
        ]
      }
    ],
    "review-26": [
      {
        "text": "The data come from a **sentence-picture matching task**. Participants heard a sentence and chose which picture matched its meaning.",
        "children": [
          "Accuracy reveals whether the listener understood who did what to whom, without requiring a spoken answer.",
          "The graph plots **mean correct responses** for each patient group across four sentence types. **C** is control sentences, **CE-S** is semantically constrained, **CE-R** is reversible, and **CE-I** is improbable. The groups are **N** for normal, **B** for Broca’s, **C** for conduction and **W** for Wernicke’s aphasia."
        ]
      },
      {
        "text": "**Healthy controls are more or less equally good at all stimulus types**. Their line stays flat near the maximum score.",
        "children": []
      },
      {
        "text": "**Wernicke’s patients are poor overall**.",
        "children": [
          "Their scores are low even on the simple control sentences.",
          "This is probably a result of their **general comprehension deficits**, which affect understanding of words as well as grammar."
        ]
      },
      {
        "text": "**Broca’s patients** have a **particular difficulty keeping “who did what to whom” straight** when **syntax conflicts with common sense** or with the probable semantic roles for nouns.",
        "children": [
          "Their scores are high on control sentences and on semantically constrained sentences, where meaning supplies the answer.",
          "Their scores drop on reversible and improbable sentences, where only grammar can reveal the roles."
        ]
      },
      {
        "text": "This **specific comprehension deficit** was taken as evidence that **Broca’s aphasia affects syntax specifically**.",
        "children": [
          "The deficit appeared in understanding as well as speaking, which places it in the grammar itself.",
          "The paper’s title, “Dissociation of algorithmic and heuristic processes,” captures the idea. Broca’s patients lose the **algorithmic** process of grammatical analysis but keep the **heuristic** shortcuts based on meaning."
        ]
      }
    ],
    "review-27": [
      {
        "text": "There are **problems with this dichotomy**. **Dick and colleagues** had participants listen to **four types of sentences** and **indicate which animal was doing the action**.",
        "children": [
          "Two pictures appeared on a computer screen, one of a dog and one of a cat, and participants pressed a button on a response box to choose the animal.",
          "The event is always a dog biting a cat, but the sentence structure changes."
        ]
      },
      {
        "text": "Two sentence types put the doer first.",
        "children": [
          "**Active**, as in **“The dog is biting the cat.”**",
          "**Subject cleft**, as in **“It’s the dog that is biting the cat.”** A **cleft** sentence splits a simple sentence to put focus on one part, using “It’s … that.” In a subject cleft, the focused noun is the subject, the doer.",
          "For these two types, a shortcut of choosing the first animal mentioned gives the right answer."
        ]
      },
      {
        "text": "Two sentence types put the receiver of the action first.",
        "children": [
          "**Object cleft**, as in **“It’s the cat that the dog is biting.”** The focused noun is the object, the one being bitten.",
          "**Passive**, as in **“The cat is bitten by the dog.”** The passive makes the receiver the grammatical subject.",
          "For these two types, the first-animal shortcut gives the wrong answer. A listener who parses the grammar succeeds on all four types."
        ]
      }
    ],
    "review-28": [
      {
        "text": "When **aphasia patients and healthy aging controls** do this task, **a pattern emerges much like what Caramazza and Zurif observed**. The graph plots percent correct for each group across active, subject cleft, object cleft and passive sentences, with patients grouped by the Western Aphasia Battery.",
        "children": [
          "**Elderly controls** score close to 100% on all four sentence types.",
          "**Anomic** patients, whose main problem is word finding, score about 89% on actives and subject clefts, dropping to about 69% on object clefts and about 73% on passives.",
          "**Conduction** aphasia patients score about 75% on actives and subject clefts and fall to about 42% on object clefts.",
          "**Broca’s** patients score about 61% on actives and 65% on subject clefts, then drop to about 42% on object clefts and about 54% on passives.",
          "**Wernicke’s** patients score low across the board, around 43% to 50% for every sentence type."
        ]
      },
      {
        "text": "**Broca’s aphasia patients have particular difficulty with the syntactically complex stimuli**, the object clefts and passives.",
        "children": [
          "These are **noncanonical** structures, meaning they depart from the usual doer-first order."
        ]
      },
      {
        "text": "**Their performance is overall not so great**, however.",
        "children": [
          "Even on simple active sentences, Broca’s patients are far below the elderly controls.",
          "The pattern combines a general drop in performance with an extra cost for complex structures. The groups differ in both overall accuracy and the size of that extra cost."
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
        "text": "Under **single-stress conditions**, accuracy stays near 99% for the normal condition and stays high for actives and subject clefts in every condition.",
        "children": [
          "Object clefts suffer most. With **noise**, accuracy falls from about 97% on actives to about 86% on object clefts.",
          "Passives also drop under noise, to about 91%."
        ]
      },
      {
        "text": "Under **dual-stress conditions**, which combine two stressors, the effects grow larger.",
        "children": [
          "With **low-pass filtering plus compression**, accuracy is about 91% on actives and 90% on subject clefts, but drops to about 66% on object clefts and 68% on passives.",
          "Other combinations, such as compression plus visual digits, lower object clefts to about 90% while leaving actives near 98%."
        ]
      },
      {
        "text": "**Object cleft and passive sentences are particularly vulnerable to all the manipulations**, the same pattern seen in Broca’s aphasia. These students have no brain damage, so stressing their processing system is enough to produce an aphasia-like profile.",
        "children": [
          "This suggests that **the comprehension deficits in Broca’s aphasia may be a “performance” issue after all**.",
          "Complex structures may demand more processing resources, so any reduction in resources hurts them first. The patients may keep their grammatical competence but lack the resources to use it efficiently."
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
        "text": "The bar graph gives accuracy for each version.",
        "children": [
          "In the non-linguistic version, controls scored **98.5%** and aphasic patients **93.4%**.",
          "In the linguistic version, controls scored **99.4%** and aphasic patients **87.5%**.",
          "**Broca’s aphasics had difficulty with this task whether the stimuli were linguistic or not**."
        ]
      },
      {
        "text": "A second graph breaks down accuracy by the type of wrong choice offered, called the **distractor**.",
        "children": [
          "With **unrelated** distractors, controls scored 99.8% and aphasic patients 93.3%.",
          "With **semantic** distractors, which are related in meaning to the correct object, controls scored 99.2% and aphasic patients dropped to **86.3%**.",
          "With **affordance-based** distractors, controls scored 97.7% and aphasic patients 91.6%. An **affordance** is an action an object allows, such as a different object that can also be licked."
        ]
      },
      {
        "text": "The nonverbal version removes language from the input while keeping meaning in the task. A pantomimed action has to be understood and linked to the right object, just as a verb would be linked to its object.",
        "children": [
          "A purely grammatical deficit predicts good performance on the nonverbal version.",
          "Difficulty on that version points to a broader problem with action meanings, shared with language."
        ]
      }
    ],
    "review-31": [
      {
        "text": "**Performance in the non-verbal version of this task was significantly correlated with damage to Broca’s area**. The lesion maps give the brain areas linked to deficits in **non-linguistic pantomime interpretation**.",
        "children": [
          "Three horizontal slices of the brain appear, at levels marked on a small side view of the brain.",
          "The colored regions mark where damage was associated with poorer performance, with red and yellow marking the strongest relationships.",
          "The strongest associations fall in the left frontal region in front of the **central sulcus**, marked **CS**, which includes Broca’s area."
        ]
      },
      {
        "text": "Participants only had to interpret a pantomimed action and choose an object.",
        "children": [
          "They did not have to produce a sentence.",
          "They did not have to work out the grammar of a spoken instruction."
        ]
      },
      {
        "text": "Damage to Broca’s area therefore affects more than syntax.",
        "children": [
          "Patients with damage there can struggle to connect an action with its meaning even when no language is involved.",
          "Any account of Broca’s area has to explain both the grammatical comprehension findings and this nonlinguistic difficulty with actions."
        ]
      }
    ],
    "review-32": [
      {
        "text": "**Categorical perception in infants** can be tested using behaviors that change when an infant notices something new. Head turns and sucking reveal what an infant hears without any need for words.",
        "children": []
      },
      {
        "text": "The **conditioned head turn procedure**, pictured in a photo from Janet Werker’s infant studies lab, trains an infant to turn toward a sound when it changes.",
        "children": [
          "The infant sits on a parent’s lap while an experimenter keeps the infant’s attention forward with toys.",
          "When the sound changes, a correct head turn is rewarded by an interesting visual display, such as a lighted, moving toy.",
          "Once the infant learns this link, a head turn after a sound change is evidence that the infant heard the change."
        ]
      },
      {
        "text": "**High-amplitude sucking** is a second method, which relies on the infant’s natural response to something new.",
        "children": [
          "The infant sucks on a pacifier connected to a pressure recorder, and strong sucks trigger the presentation of a sound.",
          "As one sound is repeated, the infant becomes used to it, which is called **habituation**, and sucking slows down.",
          "If a new sound makes sucking **increase again**, the infant has noticed the change."
        ]
      },
      {
        "text": "Neither method requires the infant to name or produce sounds. The experimenter controls exactly which acoustic difference is presented, and the infant’s head turn or renewed sucking reveals whether infants hear the same distinctions that adults hear.",
        "children": []
      }
    ],
    "review-33": [
      {
        "text": "**Eimas and colleagues (1971)** tested categorical perception in **4-month-old infants** using **high-amplitude sucking**. The acoustic dimension was **voice onset time**, or **VOT**, the delay between the release of a stop consonant and the start of vocal fold vibration.",
        "children": [
          "Spectrograms compare syllables with VOTs of **+10 milliseconds** and **+100 milliseconds**. With the longer VOT, voicing starts much later after the release, with the first formant cut back at the start."
        ]
      },
      {
        "text": "In the main experiment, there were **three conditions**. Infants heard a syllable repeatedly until sucking declined, and then the sound changed or stayed the same.",
        "children": [
          "In **20D**, the two stimuli differed by **20 milliseconds** of VOT, **+20 versus +40 milliseconds**, and came from **different adult phonemic categories**.",
          "In **20S**, the stimuli also differed by **20 milliseconds**, either **−20 versus 0** or **+60 versus +80 milliseconds**, but came from the **same** phonemic category.",
          "In **0**, the **control** condition, the same stimulus continued throughout."
        ]
      },
      {
        "text": "The graph plots the **mean number of sucking responses per minute**, with time measured from the stimulus shift. The letter **B** marks the baseline rate, and a dashed line marks the shift.",
        "children": [
          "In every condition, sucking rose above baseline and then declined before the shift.",
          "In **20D**, sucking jumped back up after the shift, to around 50 responses per minute.",
          "In **20S**, sucking showed little recovery and continued downward.",
          "In **0**, sucking kept declining, down to about 15 responses per minute."
        ]
      },
      {
        "text": "Infants responded to the change that crossed an adult phoneme boundary but not to the equally large change within a category.",
        "children": [
          "The two changed conditions were matched in acoustic size, so the difference comes from crossing the boundary.",
          "The control condition establishes what happens with continued repetition alone."
        ]
      }
    ],
    "review-34": [
      {
        "text": "Eimas’s finding was **a big deal** for several reasons. **Categorical perception was considered to be the first step in turning speech into a symbolic format** that later linguistic processes could use.",
        "children": [
          "A **symbolic** format represents a sound as a category, such as /b/.",
          "Finding this ability in infants suggested that the starting point for language processing was already in place."
        ]
      },
      {
        "text": "**Four-month-olds are really little**. Some **gross motor milestones** at that age are **manipulating objects with two hands** and **holding the head and chest up while lying prone**, meaning face down.",
        "children": [
          "Gross motor skills involve large body movements."
        ]
      },
      {
        "text": "Their **color vision and general visual acuity are still “in progress.”** **Visual acuity** is the sharpness of vision.",
        "children": [
          "Basic perceptual abilities in other areas are still maturing."
        ]
      },
      {
        "text": "Four-month-olds are also **just starting to produce vowel-like sounds instead of creaky whines**. They cannot yet produce speech sounds well at all.",
        "children": []
      },
      {
        "text": "This is **very, very early in development for an apparently language-specific ability to emerge**, so it **seemed like evidence for innateness**.",
        "children": [
          "Infants categorize speech sounds before they can produce them, while other abilities are still immature.",
          "Speech categorization seemed far ahead of other developing skills, so it appeared to be built in rather than learned through long experience."
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
        "text": "The bar graph gives the **percentage of infants reaching the discrimination criterion** at each age.",
        "children": [
          "At **6–8 months**, about **95%** of English-learning infants discriminated the Hindi contrast and about **80%** discriminated the Salish contrast.",
          "At **8–10 months**, these fell to about **67%** and **52%**.",
          "At **10–12 months**, they fell to about **20%** and **10%**.",
          "**Hindi- and Salish-learning infants** discriminated their native contrast close to **100%** of the time."
        ]
      },
      {
        "text": "The figure describes **perceptual reorganization during the first year of life**.",
        "children": [
          "Without experience of a contrast, English-learning infants lose much of their ability to discriminate it by about their first birthday.",
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
        "text": "There is **a very compelling narrative** built from these findings.",
        "children": [
          "**Speech perception depends on categorical perception abilities that are a special property of the language system**.",
          "**These abilities are present very early in development**, as the infant studies suggest."
        ]
      },
      {
        "text": "**Children start off as “citizens of the world,”** able to hear **all** contrasts. This means **they have innate, language-general knowledge about speech**.",
        "children": [
          "**Language-general** means the knowledge applies to the speech sounds of every language.",
          "“Citizens of the world” captures the idea that a newborn is ready to learn any human language.",
          "Children then **rapidly tune their perceptual systems to the specific language in their environment**."
        ]
      },
      {
        "text": "Under this narrative, **the role of learning is to select** among the many possible **innately specified phonetic contrasts** and **narrow down the inventory** to just those that are **meaningful in the child’s native language**.",
        "children": [
          "An **inventory** here is the full set of phonetic contrasts the child can perceive.",
          "Learning is a process of elimination. It removes the contrasts the native language does not use and keeps the innate categories that the language needs."
        ]
      }
    ],
    "review-37": [
      {
        "text": "**The inductive problem of early word learning** is that any single experience is compatible with many possible meanings. **Induction** is reasoning from specific examples to a general rule, and here the rule is the meaning of a word.",
        "children": [
          "A child hears a new word while looking at a cat. The word could mean **CAT**, **ANIMAL** or **PET**, which are categories at different levels.",
          "It could mean **FELIX**, the name of this particular cat.",
          "It could mean a property such as **FURRY** or **ALIVE**, an action such as **WALKING**, or a part such as **WHISKERS** or **LEG**."
        ]
      },
      {
        "text": "The set of possible meanings is called the **hypothesis space**.",
        "children": [
          "Every one of these candidates is consistent with what the child sees.",
          "Nothing in the single scene picks out which one the speaker intends."
        ]
      },
      {
        "text": "This is a version of **Quine’s “gavagai” problem**.",
        "children": [
          "In Quine’s example, a linguist visiting an unknown language hears a speaker say “gavagai” while a rabbit runs past.",
          "“Gavagai” could mean rabbit, but it could also mean undetached rabbit parts, a stage of a rabbit or something else entirely.",
          "Children face this problem with every new word and still learn words quickly. Joint attention, intentional cues and default word-learning strategies narrow the possibilities."
        ]
      }
    ],
    "review-38": [
      {
        "text": "One way children acquire word meanings is through **joint attention**. Joint attention is **sharing an attentional focus with another person**.",
        "children": [
          "The drawing has two figures looking and pointing at the same object, with arrows linking each figure to the object and to the other figure.",
          "Each person knows that the other is attending to the same thing."
        ]
      },
      {
        "text": "**Gaze following emerges around 9 months of age**.",
        "children": [
          "**Gaze following** is looking where another person is looking.",
          "When an adult looks at an object, the infant follows the adult’s eyes to that object."
        ]
      },
      {
        "text": "Gaze following **signals an understanding of reference**.",
        "children": [
          "The infant understands that the adult’s attention is directed at something specific.",
          "When the adult then says a word, the object of shared attention becomes the most likely referent. Joint attention narrows the hypothesis space by linking the word to what the speaker is attending to."
        ]
      }
    ],
    "review-39": [
      {
        "text": "**Joint attention optimizes word learning**, according to **Baldwin and colleagues**. Two groups of infants heard a novel word while playing with an object.",
        "children": [
          "In the **joint attention group**, an **adult interacting with the baby labeled the object the baby was playing with**.",
          "In the **no joint attention group**, a **voice from behind a screen labeled the object the baby was playing with**."
        ]
      },
      {
        "text": "The two conditions are matched in important ways.",
        "children": [
          "In both, the word was spoken while the infant was focused on the same object.",
          "The only difference was whether a visible person was engaged with the infant and the object."
        ]
      },
      {
        "text": "**Eighteen-month-olds learned the novel word in the joint attention group but not in the no joint attention group**.",
        "children": [
          "Hearing a word at the same moment as seeing an object was insufficient for learning.",
          "Infants needed evidence that a speaker was using the word to refer to that object. The voice behind the screen supplied the same word at the same moment, so the difference in learning came from the visible, engaged speaker."
        ]
      }
    ],
    "review-40": [
      {
        "text": "Children narrow the hypothesis space for new words partly through **intentional cues from the speaker**, such as **eye gaze direction**. An **intentional cue** is a signal of what a speaker means to refer to.",
        "children": [
          "The photo of a woman’s face looking toward a small toy cat at one side gives the kind of cue involved. Her eyes indicate which object she is attending to."
        ]
      },
      {
        "text": "**Baldwin** taught new words to **16–17-month-olds** and **18–19-month-olds** in two conditions.",
        "children": [
          "In **follow-in labeling**, the adult **looked at the toy the infant was focused on** while saying the new word. Both cues point to the same toy.",
          "In **discrepant labeling**, the adult **looked at a toy in a bucket**, a different toy from the one the infant was focused on, while saying the new word."
        ]
      },
      {
        "text": "The discrepant condition separates the infant’s own focus from the speaker’s focus.",
        "children": [
          "If infants simply attach a new word to whatever they are looking at, they would map the word onto their own toy.",
          "If they use the speaker’s gaze, they would map it onto the toy in the bucket.",
          "The comparison tests whether infants treat the speaker’s gaze as evidence of what the word means."
        ]
      }
    ],
    "review-41": [
      {
        "text": "Intentional cues also include **affective and behavioral cues** from the speaker. **Affective** cues are emotional expressions, and **behavioral** cues are the speaker’s actions.",
        "children": [
          "A speaker’s expression can indicate whether an object is the one they were looking for.",
          "A speaker’s actions, such as reaching for an object, can reveal what they want."
        ]
      },
      {
        "text": "**Akhtar and colleagues** found that **infants used adults’ facial expressions to identify the intended referent of a novel word**.",
        "children": [
          "The adult’s emotional reaction to an object indicated whether it was the one the adult meant.",
          "Infants linked the new word to the object that the adult’s expression marked as intended."
        ]
      },
      {
        "text": "Several objects can be present when a word is spoken, but the speaker’s reaction can single out one of them.",
        "children": [
          "A satisfied expression signals that the speaker found what they wanted, and a disappointed expression signals that the object is not the one meant.",
          "Word learning therefore involves understanding the goal of the interaction."
        ]
      }
    ],
    "review-42": [
      {
        "text": "Children also use **word learning strategies**. These are **default strategies that children bring to the word learning situation**.",
        "children": [
          "A **default** is a starting assumption that holds unless there is evidence against it.",
          "These strategies **function to narrow the hypothesis space for new words**, giving children a starting point when other cues are weak."
        ]
      },
      {
        "text": "One example is the **whole object assumption**.",
        "children": [
          "Under this assumption, a child expects a new word to name **a whole object** rather than one of its parts, its color, its texture or an action it is doing.",
          "When a child hears a new word while looking at a cat, the assumption favors “cat” over “whiskers,” “furry” or “walking.”"
        ]
      },
      {
        "text": "The whole object assumption removes many unlikely meanings at once and matches how adults usually label objects for children.",
        "children": [
          "It is a starting preference that later evidence can override.",
          "Further evidence can show that a word names a part or a property, and children do eventually learn such words."
        ]
      }
    ],
    "review-43": [
      {
        "text": "Another word learning strategy is **mutual exclusivity**, from **Markman (1989)**.",
        "children": [
          "**As a default, objects can have only one name**.",
          "The **implication** is that **new words map to nameless objects**.",
          "Mutual exclusivity **emerges during the second half of the second year**, that is, between about 18 and 24 months of age."
        ]
      },
      {
        "text": "Pictures of a parrot and a dog stand for a typical situation.",
        "children": [
          "Suppose a child already knows the word “dog” but has no word for a parrot.",
          "If the child hears a new word, the child assumes it refers to the parrot, because the dog already has a name. No gaze or emotion cue is needed for this choice."
        ]
      },
      {
        "text": "Mutual exclusivity works together with the whole object assumption.",
        "children": [
          "The whole object assumption says a new word names an object, and mutual exclusivity says it names an object without a name yet.",
          "It is a default inference, so later learning can override it when an object turns out to have more than one name."
        ]
      }
    ],
    "review-44": [
      {
        "text": "**Second-language, or L2, learning** serves as **a model system for sensitive period research**. A **model system** is a situation that is common and easy to study, used to answer questions about a process that is hard to study directly.",
        "children": []
      },
      {
        "text": "**Lenneberg (1967)** developed an influential theory that **the sensitive period had to do with the development of cerebral dominance**, or **developmental changes in language laterality**.",
        "children": [
          "**Cerebral dominance** is the specialization of one hemisphere of the brain, usually the left, for language.",
          "**Language laterality** is the degree to which language depends on one side of the brain rather than both.",
          "Under this theory, the window for learning language closes as language becomes fixed in the left hemisphere."
        ]
      },
      {
        "text": "Two kinds of evidence motivated the theory.",
        "children": [
          "**A rough alignment of the literature on brain development with new insights about language milestones**. The graph of neuron growth in cortical layers III, IV and V rises rapidly in the first two years and then levels off, with no measurements between ages 2 and 18 and a shaded band marking the period of language acquisition. Lenneberg linked the end of rapid brain growth to the start of language learning.",
          "**A review of the literature on resilience after brain injury or surgery**. Children who lost the left hemisphere often developed language, while adults did not recover it."
        ]
      },
      {
        "text": "The theory concerns the brain’s **maturational state**, its stage of physical development. A young, less specialized brain can shift language to other tissue, while a mature, specialized brain has fewer options.",
        "children": []
      }
    ],
    "review-45": [
      {
        "text": "**Much of what is known about first-language, or L1, sensitive periods comes from research on idiosyncratic cases or relatively rare phenomena**. **Idiosyncratic** means peculiar to an individual.",
        "children": [
          "Evidence comes from cases such as children recovering from brain surgery to remove one hemisphere, and Genie, who was isolated from language until age 13.",
          "Each case involves many unusual circumstances, such as injury, illness or abuse, so it is hard to tell which factor caused the outcome."
        ]
      },
      {
        "text": "**In contrast, many people learn second languages at different times in their lives, often with somewhat limited success**.",
        "children": [
          "Second-language learners are common, so researchers can study large groups instead of relying on one unusual case.",
          "They start learning at many different ages, from early childhood to late adulthood, and their eventual success can be measured."
        ]
      },
      {
        "text": "**The limits of L2 success have also been used to reason about the timing of the sensitive or critical period**.",
        "children": [
          "If people who start L2 learning later consistently reach lower levels, that pattern could reveal when the sensitive period closes.",
          "The first language complicates the comparison. Every L2 learner already knows a language, and that knowledge shapes how the new one is learned."
        ]
      }
    ],
    "review-46": [
      {
        "text": "**Johnson and Newport** studied **critical period effects in second-language learning**, in a paper about **the influence of maturational state on the acquisition of English as a second language**. **Lenneberg (1967) hypothesized that language could be acquired only within a critical period**, from early infancy until puberty.",
        "children": [
          "In its basic form, the hypothesis only has consequences for first-language acquisition.",
          "It is important to find out whether it extends to second-language acquisition as well.",
          "If it does, young children should be better second-language learners than adults and should reach higher final levels of proficiency."
        ]
      },
      {
        "text": "The prediction was tested by comparing the **English proficiency of 46 native Korean or Chinese speakers** who had **arrived in the United States between the ages of 3 and 39**.",
        "children": [
          "By the time of testing, they had lived in the United States **between 3 and 26 years**.",
          "They were tested on **a wide variety of structures of English grammar** using a **grammaticality judgment task**."
        ]
      },
      {
        "text": "The results showed **a clear and strong advantage for earlier arrivals over later arrivals**.",
        "children": [
          "**Test performance was linearly related to age of arrival up to puberty**. Each additional year of age at arrival meant a lower score.",
          "**After puberty, performance was low but highly variable and unrelated to age of arrival**."
        ]
      },
      {
        "text": "The age effect was **not an accidental result of differences in amount of experience with English, motivation, self-consciousness or American identification**.",
        "children": [
          "The effect **appeared on every grammatical structure tested**, although the structures varied greatly in how well later learners mastered them.",
          "The authors concluded that **a critical period for language acquisition extends its effects to second-language acquisition**."
        ]
      }
    ],
    "review-47": [
      {
        "text": "The **Johnson and Newport data** have three main features.",
        "children": [
          "There is **a strong relationship between AOA and accuracy**. Earlier arrival goes with higher scores.",
          "**Early learners, up to about age 8, are often near-perfect**, which means **native-like**. Their scores cluster at the top of the scale, close to native English speakers.",
          "There is a **nearly random distribution of accuracy for late arrivals**. Among adults, age of arrival barely predicts the score."
        ]
      },
      {
        "text": "The first two features describe childhood learners.",
        "children": [
          "Children arriving very young reach native-like grammar.",
          "Children arriving between about 8 and 15 reach progressively lower levels, so the decline starts well before puberty."
        ]
      },
      {
        "text": "The phrase **“nearly random distribution”** has a specific meaning.",
        "children": [
          "It refers to the weak relationship between age of arrival and score among late arrivals.",
          "Late arrivals scored well above chance, but their scores varied greatly from person to person. Two adults who arrived at the same age could end up with very different scores."
        ]
      }
    ],
    "review-48": [
      {
        "text": "There are **two versions of the “critical period” hypothesis**.",
        "children": []
      },
      {
        "text": "**Version one is the exercise hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**If the capacity is not exercised during this time, it will disappear or decline with maturation**.",
          "**If the capacity is exercised, however, further language-learning abilities will remain intact throughout life**.",
          "On this view, an adult who learned L1 normally should still be able to learn L2 as well as a child."
        ]
      },
      {
        "text": "**Version two is the maturational state hypothesis**.",
        "children": [
          "**Early in life, humans have a superior capacity for acquiring languages**.",
          "**This capacity disappears or declines with maturation**, whether or not it has been used.",
          "On this view, even someone who learned L1 normally will learn L2 less well as an adult."
        ]
      },
      {
        "text": "Johnson and Newport’s participants all had a normal first language, yet their L2 learning was worse when they started later.",
        "children": [
          "This fits the **maturational state hypothesis**, matching the title of the paper."
        ]
      },
      {
        "text": "This raises the question of **whether the L1 critical period data should be interpreted differently**.",
        "children": [
          "Cases like Genie involve a capacity that was never exercised, which both hypotheses predict would lead to poor learning.",
          "Only second-language data can tell the two versions apart, because only L2 learners have exercised the capacity before learning another language."
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
        "text": "The graph plots the **probability of fixating** each item over the first 1,000 milliseconds after the target word begins.",
        "children": [
          "Looks to the **beaker** and the **beetle** rise together early, because both fit the first sounds of the word.",
          "Looks to the beetle peak near 0.2 at around 500 milliseconds and then fall once the sounds that distinguish the words arrive.",
          "Looks to the beaker keep rising, approaching 1 by about 1,000 milliseconds.",
          "Looks to the **speaker** rise later and stay smaller, peaking near 0.1, because its overlap comes at the end of the word. Looks to the carriage stay near zero."
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
        "text": "**Marian and Spivey** examined the cohort effect with **“cross-language competitors.”** A cross-language competitor is an object whose name in the **other language** shares its beginning with the spoken target word.",
        "children": []
      },
      {
        "text": "**If L1 words are always activated, native Russian speakers should look at a book of matches when the target is “speaker” in English**.",
        "children": [
          "English **speaker** begins with the same sounds as Russian **спички, spichki**, meaning **matches**.",
          "If Russian is active while the participant listens to English, the picture of matches should attract looks."
        ]
      },
      {
        "text": "For **English targets**, each target was paired with an **English competitor** and a **Russian competitor**.",
        "children": [
          "**Speaker** was paired with **spear** in English and **spichki**, matches, in Russian.",
          "**Boot** was paired with **book** and **buben**, tambourine. **Shark** was paired with **shovel** and **sharik**, balloon.",
          "**Chair** was paired with **chess set** and **cherepaha**, turtle. **Marker** was paired with **marbles** and **marka**, stamp.",
          "**Barbed wire** was paired with **bark** and **barhat**, velvet. **Plug** was paired with **plum** and **platye**, dress.",
          "**Gun** was paired with **gum** and **gaika**, nut. **Lock** was paired with **lobster** and **lak dlea nogtei**, nail polish."
        ]
      },
      {
        "text": "For **Russian targets**, the pairing was reversed.",
        "children": [
          "Russian **spichki**, matches, was paired with English **spear** and Russian **spitsi**, knitting needles.",
          "Russian **marka**, stamp, was paired with English **marker** and Russian **marlya**, cheese cloth.",
          "Russian **platye**, dress, was paired with English **plum** and Russian **plashch**, raincoat."
        ]
      },
      {
        "text": "The connection between the target and the cross-language competitor is purely in **sound**.",
        "children": [
          "Speakers and matches have nothing to do with each other in meaning.",
          "Only the Russian competitor’s overlap depends on knowing Russian, so looks to the matches during an English task directly measure activation of the Russian word spichki."
        ]
      }
    ],
    "review-51": [
      {
        "text": "The results for **competition during L2 spoken word recognition**, when Russian–English bilinguals followed instructions in **English**, come from a table giving the **percent of trials** in which participants looked at each competitor.",
        "children": [
          "When only the **between-language competitor** was present, participants looked at it on **18%** of trials.",
          "When only the **within-language competitor** was present, participants looked at it on **18%** of trials.",
          "When **both competitors** were present, participants looked at the between-language competitor on **13%** of trials and the within-language competitor on **19%**.",
          "When **no competitor** was present, participants looked at a control filler object on only **7%** of trials."
        ]
      },
      {
        "text": "**When only one competitor was present, participants looked at within- and between-language competitors to the same extent**.",
        "children": [
          "The Russian name of the matches pulled the eyes just as strongly as a similar English word did."
        ]
      },
      {
        "text": "**When both competitors were present, participants looked at the within-language competitor more**, **but still looked at the between-language competitor a lot**, about **twice as often as the control condition**.",
        "children": [
          "The English competitor won out when the two were side by side.",
          "The Russian competitor still attracted far more looks than an unrelated object."
        ]
      },
      {
        "text": "The first language therefore stays active during second-language listening. Bilinguals still select the correct object, but L1 words compete along the way.",
        "children": []
      }
    ],
    "review-52": [
      {
        "text": "The results for **competition during L1 spoken word recognition**, when the same bilinguals followed instructions in **Russian**, come from a second table.",
        "children": [
          "When only the **between-language competitor**, an object with a similar **English** name, was present, participants looked at it on **8%** of trials.",
          "When only the **within-language competitor** was present, participants looked at it on **14%** of trials.",
          "When **both** were present, they looked at the between-language competitor on **8%** of trials and the within-language competitor on **13%**.",
          "With **no competitor**, looks to the control filler occurred on **5%** of trials."
        ]
      },
      {
        "text": "**English words do not seem to be activated when native Russian speakers do this experiment in Russian**.",
        "children": [
          "The **small numerical difference between the between-language and control conditions**, 8% versus 5%, is **not statistically significant**.",
          "A difference that is not statistically significant is within the range of chance variation."
        ]
      },
      {
        "text": "The within-language competitor still produced a reliable cohort effect in Russian.",
        "children": [
          "The pattern across the two experiments is **asymmetric**. Russian words became active during English tasks, but English words did not become reliably active during Russian tasks.",
          "This asymmetry fits a picture in which the first language is more strongly established and more easily activated than the second."
        ]
      }
    ],
    "review-53": [
      {
        "text": "**The Revised Hierarchical Model** of **Kroll and Stewart** explains **L1–L2 interactions in terms of spreading activation**. **Spreading activation** is the idea that activating one representation partly activates the representations connected to it.",
        "children": [
          "The model has three boxes. An **L1** box holds the first-language vocabulary, an **L2** box holds the second-language vocabulary, and a **concepts** box holds meanings.",
          "**Lexical links** connect the L1 and L2 words directly. **Conceptual links** connect each vocabulary to the concepts."
        ]
      },
      {
        "text": "**The L1 lexicon is assumed to be larger and more strongly connected to relevant concepts**.",
        "children": [
          "In the model diagram, the L1 box is drawn bigger than the L2 box.",
          "The conceptual link from L1 to concepts is a thick, solid arrow, while the link from L2 to concepts is a thin, dashed line."
        ]
      },
      {
        "text": "**The L2 lexicon is assumed to have strong forward connections to the L1 lexicon**.",
        "children": [
          "The lexical link from L2 to L1 is drawn as a solid arrow, while the link from L1 to L2 is dashed.",
          "**Activation can spread more readily from an L2 word to an L1 word than the other way**."
        ]
      },
      {
        "text": "**This occurs because this direction is emphasized in learning**.",
        "children": [
          "People usually learn each new L2 word by connecting it to its L1 translation, which builds a strong route from L2 words to L1 words.",
          "The link from L2 words directly to concepts stays weaker, at least early in learning. As proficiency grows, the L2 conceptual links can strengthen."
        ]
      }
    ],
    "review-54": [
      {
        "text": "The **Revised Hierarchical Model of Kroll and Stewart (1990, 1994)** explains interactions between a first language, **L1**, and a second language, **L2**, in terms of **spreading activation**. Spreading activation means that activating one representation partly activates the representations connected to it.",
        "children": [
          "The model connects an L1 vocabulary, an L2 vocabulary and a shared store of concepts.",
          "**Lexical links** join words across the two languages, and **conceptual links** join each vocabulary to meanings.",
          "L1 words have strong links to concepts, while L2 words have weaker conceptual links."
        ]
      },
      {
        "text": "Consider what happens in the model during the **Marian and Spivey** task in **L2**, when Russian–English bilinguals hear the English instruction to pick up the **speaker**.",
        "children": [
          "**The concept for “speaker” partially activates the Russian word for “matches,”** which is **spichki**.",
          "The link between speaker and spichki is **sound overlap**. The two words begin with the same sounds, so activity for speaker spreads to the similar-sounding Russian word. Speakers and matches share no meaning."
        ]
      },
      {
        "text": "**The activity of spichki feeds back to the conceptual activation for “matches.”**",
        "children": [
          "Because L1 words are strongly connected to their concepts, the partly active Russian word strengthens the concept it names.",
          "**Conceptual activation for “matches” leads to eye movements toward the L1 competitor**, the picture of matches, even though the listener still picks up the speaker correctly."
        ]
      },
      {
        "text": "**When the task is done in L1**, the **conceptual links with L2 might be too weak to create this kind of interference reliably**.",
        "children": [
          "An English competitor would need a strong link from its English name to its concept to attract the eyes during a Russian task.",
          "L2 words have only weak conceptual links in this model, so the other language interferes in one direction but not the other."
        ]
      }
    ],
    "review-55": [
      {
        "text": "The Revised Hierarchical Model makes a **counter-intuitive prediction** even for **“balanced bilinguals.”** A **balanced bilingual** is a person who is about equally skilled in both languages.",
        "children": [
          "One might expect balanced bilinguals to work like **“two monolinguals in one,”** with each language running separately.",
          "The model predicts the opposite."
        ]
      },
      {
        "text": "In a balanced bilingual, **the conceptual links are similarly strong for both languages**.",
        "children": [
          "Every concept strongly activates its word in both languages, so both vocabularies become active whenever either is used.",
          "**Competitive dynamics and inhibition will be engaged all the time**. **Competitive dynamics** means that the two languages’ words constantly compete for selection. **Inhibition** is the suppression of the word from the language not being used."
        ]
      },
      {
        "text": "This prediction **has led to a lot of work on bilinguals’ advantages in nonlinguistic cognitive control tasks**.",
        "children": [
          "**Cognitive control** is the ability to manage attention and suppress irrelevant responses.",
          "If bilinguals constantly practice selecting one language and suppressing the other, they might become better at controlling attention in general, including in tasks that have nothing to do with language."
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
