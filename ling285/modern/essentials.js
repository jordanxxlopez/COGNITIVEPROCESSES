window.LING285_ESSENTIALS = {
 "versions": {
  "exam2-v1": {
   "label": "Exam 2 · Study this first (v1, Lectures 11–16)",
   "range": "Lectures 11 to 16",
   "howToAnswer": [
    "Answer first, then the reason: Name the direction or the count in the first sentence, then explain why in one to three more sentences.",
    "Say what the spot is doing: For any mass, stiffness or constriction question, first say whether that location is moving or stretching in that mode.",
    "Use the course terms: Mode, harmonic, formant, fixed-fixed, fixed-free, constriction, inner product, weight, activation and loss should appear where they belong.",
    "Describe questions need steps: For \"describe a spectrogram\" or \"why does backpropagation start at the end\", walk through the process in full sentences.",
    "No arithmetic beyond simple multiples: He does not ask you to multiply decimals, give years, use the word seed, or write PyTorch from scratch."
   ],
   "scope": {
    "covers": "Lectures 11 to 16 and the start of Lecture 17, everything up to right before large language models.",
    "final": "Large language models, heads and layers, Gestalt completion and the cloze test, agentic systems, the LLM as a dynamical system, and Software 3.0 are saved for the final exam.",
    "evidence": "On Exam 1, about 15 of the 25 questions came almost word for word from the review sheet, with only the sounds, numbers or positions changed."
   },
   "topics": [
    {
     "id": "modes",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12 and 13",
     "title": "Masses, springs and modes",
     "know": [
      "Why it vibrates: The spring tends to return to **equilibrium**, and a moving mass tends to **keep moving**, so the mass overshoots and the cycle repeats.",
      "Mass and stiffness: **More mass lowers the frequency, and more stiffness raises the frequency.**",
      "Directions: **Longitudinal** motion (back and forth along the spring) and **transverse** motion (up and down) behave the same way.",
      "Mode: A **mode** is one way a system can vibrate. **N masses give N modes.**",
      "Higher modes: The more the masses move **against each other**, the more the springs stretch and compress, so the mode has more stiffness and a **higher frequency**.",
      "Local rule: **A mass changes the frequency only where it moves, and a spring changes the frequency only where it stretches.**",
      "Infinitely many: An infinite number of masses and springs along a line is a **string**. Spread over a surface, it is a **membrane**, such as a drum or the vocal folds."
     ],
     "questions": [
      {
       "source": "Review 1",
       "q": "Why do multiple mass systems have multiple frequencies?",
       "a": "A system with several masses can vibrate in several ways, called modes, because the masses can move together or against each other. When the masses move against each other, the springs between them stretch and compress more, so more stiffness is working and that mode vibrates faster. Each mode therefore has its own frequency, and a system with N masses has N modes and N frequencies."
      },
      {
       "source": "Review 2",
       "q": "How many modes does a 3-mass system have?",
       "a": "A 3-mass system has three modes, because a system with N masses has N modes of vibration."
      },
      {
       "source": "Lab 9",
       "q": "Four masses are joined by springs between two walls. How many modes does the system have, and what are the masses doing in the lowest and highest modes?",
       "a": "The system has four modes, one for each mass. In the lowest mode, Mode 1, all four masses move in the same direction at the same time. In the highest mode, Mode 4, every mass moves opposite to its neighbors, so every spring is stretched and compressed and the frequency is highest."
      },
      {
       "source": "Review 3",
       "q": "Which mode of the 3-mass system has the highest frequency? Why?",
       "a": "Mode 3 has the highest frequency. In Mode 3 the middle mass moves opposite to the two outer masses, so every spring is stretched and compressed as much as possible. That puts the most stiffness to work, and more stiffness makes the system vibrate faster."
      },
      {
       "source": "Predicted",
       "q": "Which mode of a 2-mass system has the lowest frequency, and why?",
       "a": "Mode 1 has the lowest frequency. In Mode 1 the two masses move together, so the middle spring is carried along without stretching. Only the two outer springs are working, so Mode 1 has less stiffness than Mode 2 and vibrates more slowly."
      },
      {
       "source": "Review 4",
       "q": "If you increase mass 2, what happens to the frequencies of each of the modes?",
       "a": "Mode 1 and Mode 3 go down, and Mode 2 stays the same. The middle mass moves in Mode 1 and in Mode 3, so making it heavier slows those modes. In Mode 2 the middle mass does not move, and a mass that does not move has no effect on the frequency."
      },
      {
       "source": "Predicted",
       "q": "In the 3-mass system, what happens to each mode if you make mass 1 (an outer mass) heavier?",
       "a": "All three modes go down. The outer mass moves in Mode 1, Mode 2 and Mode 3, and a heavier mass that is moving lowers the frequency. No mode leaves an outer mass still, so none of the three frequencies stays the same."
      },
      {
       "source": "Predicted",
       "q": "In a 2-mass system, what happens to each mode if you make the middle spring stiffer?",
       "a": "Mode 1 stays the same and Mode 2 goes up. In Mode 1 the masses move together, so the middle spring is never stretched and its extra stiffness does nothing. In Mode 2 the masses move against each other, so the middle spring is stretched and compressed and the extra stiffness raises the frequency."
      },
      {
       "source": "Review 5",
       "q": "What do you get when you have an infinite number of masses and springs?",
       "a": "You get a string, like a guitar or piano string. Every small piece of a string has mass, and every small piece stretches like a spring, so a string vibrates in modes like a chain of masses, only with infinitely many of them. Spread over a surface instead of a line, the same idea gives a membrane such as a drum or the vocal folds."
      },
      {
       "source": "Predicted",
       "q": "What happens to the frequency of a single mass on a spring if you make the spring stiffer? If you make the mass heavier?",
       "a": "A stiffer spring raises the frequency, because it pulls the mass back toward equilibrium with more force and turns it around sooner. A heavier mass lowers the frequency, because a heavier mass is harder to start and stop, so each back-and-forth cycle takes longer."
      }
     ]
    },
    {
     "id": "springiness",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "Where the springiness is, and what a local change does",
     "know": [
      "Alternation: **Where a vibrating system moves the most, it stretches the least, and where it does not move, it stretches the most.**",
      "Shortcut: The springiest locations are the points of **no movement**, which are the fixed ends and the points where the mode crosses its resting line.",
      "Ends: A **fixed end is always springy**, and a **free end is always moving**, in every mode.",
      "Added mass: Extra mass lowers a mode's frequency **only where that mode is moving**.",
      "Added stiffness: Extra stiffness raises a mode's frequency **only where that mode is stretching**.",
      "Both at once: Adding mass and stiffness together does **not** cancel out, except for a single mass on a single spring, because at one spot in one mode only one of the two matters.",
      "Perturbation theory: It predicts how a small change in one location affects vibration. In the late nineteenth century, wax placed where a drum vibrated a lot lowered its pitch, and wax placed where it did not vibrate had no effect."
     ],
     "questions": [
      {
       "source": "Review 6",
       "q": "This is Mode 5 of a string fixed at both ends. Circle the areas where there is the most springiness.",
       "a": "Circle the two fixed ends and the four points where the string crosses its middle line, six places in all. At those points the string does not move, but the pieces on either side move in opposite directions, so the string there is stretched and compressed the most. The tops of the five bumps have the most motion and the least springiness."
      },
      {
       "source": "Predicted",
       "q": "This is Mode 3 of a string fixed at both ends. Where is the most springiness, and where is the most motion?",
       "a": "The most springiness is at the two fixed ends and at the two points where the string crosses its middle line, four places in all, because the string does not move there. The most motion is at the tops of the three bumps, where the string swings the most and is hardly stretched."
      },
      {
       "source": "Review 11",
       "q": "This picture shows Mode 4 of a building. Circle the areas where there is the most springiness.",
       "a": "Circle the fixed base and the three points where the building crosses its resting position, four places in all. Those points do not move, but the parts above and below them move in opposite directions, so the structure there stretches and compresses the most. The free top moves the most and is the least springy, so it is not circled."
      },
      {
       "source": "Predicted",
       "q": "This diagram shows Mode 2 of a building. Where is the most springiness?",
       "a": "The most springiness is at the fixed base and at the one point above it where the building crosses its resting position. Those two points do not move, so the structure there is stretched and compressed the most. The free top moves the most and is the least springy."
      },
      {
       "source": "Review 14",
       "q": "If we increase the stiffness and mass of the string at the boxed location (where Mode 3 crosses its middle line and Mode 4 is at the top of a bump), what happens to Mode 3 and Mode 4's frequencies, and why?",
       "a": "Mode 3 goes up and Mode 4 goes down. In Mode 3 the boxed spot does not move but is stretched the most, so the added mass does nothing and the added stiffness raises the frequency. In Mode 4 the boxed spot moves the most and is not stretched, so the added mass lowers the frequency and the added stiffness does nothing."
      },
      {
       "source": "Predicted",
       "q": "The box is moved to a spot where Mode 3 is at the top of a bump and Mode 4 crosses its middle line. Mass and stiffness are added there. What happens?",
       "a": "Now Mode 3 goes down and Mode 4 goes up. In Mode 3 the spot moves the most and is hardly stretched, so the added mass lowers the frequency. In Mode 4 the spot does not move but is stretched the most, so the added stiffness raises the frequency."
      },
      {
       "source": "Review 15",
       "q": "If we increase the mass and stiffness of the building at its very top, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes down. The top of the building is the free end, so in every mode it moves the most and is hardly stretched. The added mass matters there and lowers the frequency, while the added stiffness does nothing because nothing is stretching at the top."
      },
      {
       "source": "Predicted",
       "q": "If we increase the mass and stiffness of the building at its very base, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes up. The base is the fixed end, so it never moves but is always stretched and compressed. The added mass does nothing there because the base does not move, while the added stiffness raises the frequency."
      },
      {
       "source": "Lab 9",
       "q": "In Mode 3 of a string fixed at both ends, point B does not move and point C is at the bottom of a bump. What happens to Mode 3 if you add a small weight at B? At C? If you stiffen the string at B?",
       "a": "A weight at B leaves Mode 3 the same, because B does not move in Mode 3. A weight at C lowers Mode 3's frequency, because C swings the most and the extra mass counts there. Stiffening the string at B raises Mode 3's frequency, because B is where the string stretches the most."
      },
      {
       "source": "Lab 9",
       "q": "The same spot B is moving in Mode 1. Does a weight at B change Mode 1's frequency?",
       "a": "Yes, the weight lowers Mode 1's frequency. In Mode 1 the whole string is one bump, so the spot at B is moving, and extra mass at a moving spot slows the vibration."
      }
     ]
    },
    {
     "id": "harmonics-formants",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12, 13 and 14",
     "title": "Harmonics and formants: fixed-fixed and fixed-free systems",
     "know": [
      "Fixed-fixed: A system fixed at both ends, such as a string or the **vocal folds**, has modes at **1, 2, 3, 4 times** the first. These are **harmonics**.",
      "Why whole numbers: The first mode is **half a wave**, and each higher mode must fit a whole number of those half-waves between the two fixed ends. Mode N contains N copies of Mode 1.",
      "Fixed-free: A system fixed at one end and free at the other, such as a **building** or the **air in the vocal tract**, has modes at **1, 3, 5, 7 times** the first. These are **formants**.",
      "Why odd numbers: The first mode is a **quarter-wave packet** from no motion to the most motion. The free end must always be moving, so packets are added two at a time, giving one, three, five and seven packets.",
      "Spacing: Fixed-fixed modes are spaced by the first frequency. Fixed-free modes are spaced by **twice** the first frequency.",
      "Building analogy: A building is fixed to the ground and free at the top, just as the air in the vocal tract is fixed at the closed vocal folds and free at the open lips.",
      "Spectrum: A **spectrum** has frequency on the horizontal axis and amplitude on the vertical axis, with one spike for each mode that is present.",
      "Scientific method: The theory that the vocal folds are a membrane predicts **equidistant harmonics** (evenly spaced harmonics). Recordings in Praat confirmed the prediction."
     ],
     "questions": [
      {
       "source": "Review 7",
       "q": "A string is fixed on both sides. If Mode 1 has frequency 200 Hz, what frequency does Mode 5 have?",
       "a": "Mode 5 has a frequency of 1000 Hz. In a string fixed at both ends, each mode is a whole-number multiple of the first, and Mode 5 contains five copies of Mode 1, so it is five times 200 Hz."
      },
      {
       "source": "Lab 9",
       "q": "A string fixed at both ends has Mode 1 at 150 Hz. What are Modes 2 and 3? If one end is freed and Mode 1 stays at 150 Hz, what are Modes 2 and 3 now?",
       "a": "Fixed at both ends, Modes 2 and 3 are 300 and 450 Hz, which are two and three times 150. Fixed at one end and free at the other, Modes 2 and 3 are 450 and 750 Hz, which are three and five times 150, because only the odd multiples occur. The fixed-fixed modes are 150 Hz apart, and the fixed-free modes are 300 Hz apart."
      },
      {
       "source": "Review 8",
       "q": "Why are the frequencies of fixed-fixed vibratory systems spaced the way they are?",
       "a": "In a system fixed at both ends, the first mode is half a wave, going from no motion at one end to the most motion in the middle and back to no motion. Every higher mode must fit a whole number of those half-waves into the same length, because both ends must stay still. Mode 2 fits two, so it vibrates twice as fast, and Mode 3 fits three, so the frequencies are evenly spaced whole-number multiples of the first."
      },
      {
       "source": "Review 16",
       "q": "Why are the formants of a fixed-free system 1, 3, 5, etc. multiples of the base frequency?",
       "a": "In a fixed-free system the basic piece is a quarter-wave packet, which runs from no motion at the fixed end to the most motion at the free end. Every mode must start still at the fixed end and end with the most motion at the free end. One extra packet would leave a still point at the free end, which cannot happen, so packets are added two at a time, giving one, three, five and seven packets and odd-multiple frequencies."
      },
      {
       "source": "Predicted",
       "q": "If F1 is 500 Hz, what are F2 and F3?",
       "a": "F2 is 1500 Hz and F3 is 2500 Hz. The air in the vocal tract is a fixed-free system, so its formants are odd multiples of the first, which are three times and five times 500 Hz, not two and three times."
      },
      {
       "source": "Review 17",
       "q": "What aspect of speech has the properties in the fixed-free question?",
       "a": "The formants of the air in the vocal tract have these properties. The air is fixed at the closed vocal folds and free at the open lips, so its frequencies of vibration, the formants, are odd multiples of the first formant."
      },
      {
       "source": "Predicted",
       "q": "What aspect of speech has frequencies at whole-number multiples, and why?",
       "a": "The harmonics of the vocal folds have whole-number multiples. The vocal folds are a membrane held in place along their edges, so they behave like a system fixed at both ends, and each mode is a whole number of copies of the first."
      },
      {
       "source": "Review 12 and 13",
       "q": "What in speech is a building analogous to, and why does the analogy hold?",
       "a": "A building is analogous to the air in the vocal tract. Both are fixed at one end and free at the other: the building is fixed to the ground and free at the top, and the air is fixed at the closed vocal folds and free at the open lips. Because the ends match, both have springiness at the fixed end, the most motion at the free end, and frequencies at odd multiples of the first."
      },
      {
       "source": "Predicted",
       "q": "How is a building different from the air in the vocal tract?",
       "a": "Engineers design a building to sway only in Mode 1, because higher modes would move floors in opposite directions and could break the structure. The air in the vocal tract vibrates in all of its modes at once, and speaking changes the mass and stiffness of the air at different locations to move those formants."
      },
      {
       "source": "Review 9",
       "q": "Draw the spectrum for a string fixed at both ends with Mode 1 at 200 Hz, up to Mode 6.",
       "a": "Draw frequency along the horizontal axis and amplitude up the vertical axis. Put six evenly spaced spikes at 200, 400, 600, 800, 1000 and 1200 Hz, one for each mode. If the modes are equally strong, the spikes can be drawn the same height."
      },
      {
       "source": "Predicted",
       "q": "Draw the spectrum for a fixed-free system with Mode 1 at 200 Hz, up to Mode 4.",
       "a": "Draw spikes only at the odd multiples: 200, 600, 1000 and 1400 Hz. A fixed-free system has no even multiples, because an even number of quarter-wave packets would leave a still point at the free end."
      },
      {
       "source": "Review 10",
       "q": "If the vocal folds have their base frequency, F0, at 150 Hz, draw the spectrum for the first 5 harmonics.",
       "a": "Draw spikes at 150, 300, 450, 600 and 750 Hz, with frequency along the bottom and amplitude going up. The vocal folds are a membrane fixed along its edges, so their harmonics are whole-number multiples of F0 and the spikes are evenly spaced 150 Hz apart."
      }
     ]
    },
    {
     "id": "constrictions",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "The vocal tract, constrictions and the vowels /i/, /a/ and /u/",
     "know": [
      "Fixed-free tube: The air in the vocal tract is **fixed at the glottis** (closed vocal folds, so the air can only be compressed) and **free at the lips** (the air moves in and out).",
      "Schwa: With no constriction, as in **done**, the formants are about **500, 1500 and 2500 Hz**.",
      "Constriction: A **constriction** (narrowing) packs the air into a smaller space, which makes it both **heavier** (denser) and **stiffer**.",
      "Four steps: Find the location, decide whether the air there is mostly **moving** or mostly **compressed** in that mode, pick the extra that counts (mass if moving, stiffness if compressed), then say whether the formant goes **down** or **up**.",
      "/u/ (dune): The constriction is at the lips, where the air is moving in both modes, so **F1 and F2 both go down**.",
      "/i/ (dean): The constriction is two-thirds of the way from the glottis. The air there moves in Mode 1 and is compressed in Mode 2, so **F1 goes down and F2 goes up** (the formants move apart).",
      "/a/ (Don): The constriction is one-third of the way from the glottis. The air there is compressed in Mode 1 and moves in Mode 2, so **F1 goes up and F2 goes down** (the formants move together).",
      "Reasoning backward: A large rise means the air there was springy and hardly moving. A large fall means the air there was moving a lot."
     ],
     "questions": [
      {
       "source": "Review 19",
       "q": "If I constrict the vocal tract somewhere and I raise the formant a great deal, what must be true of air motion versus springiness at this location?",
       "a": "At that location the air must be very springy and hardly moving in that mode. A constriction adds both mass and stiffness, and the formant went up, so the added stiffness is what counted. Stiffness only counts where the air is compressed and expanded, and the added mass did nothing because the air there was not moving."
      },
      {
       "source": "Predicted",
       "q": "If I constrict the vocal tract somewhere and I lower the formant a great deal, what must be true at this location?",
       "a": "At that location the air must be moving a lot and hardly compressed in that mode. The formant went down, so the added mass is what counted, and mass only counts where the air is moving. This is what happens at the lips for /u/."
      },
      {
       "source": "Lab 9",
       "q": "A classmate says more mass lowers the frequency and more stiffness raises it, so a constriction always cancels out. What is wrong with this argument?",
       "a": "In any one mode, at most locations only one of the two changes matters. If the air at the constriction is mostly moving, it is not being compressed, so only the extra mass counts and the formant goes down. If the air there is mostly compressed, it is not moving, so only the extra stiffness counts and the formant goes up, which is why the same constriction can push F1 and F2 in opposite directions."
      },
      {
       "source": "Lab 9",
       "q": "Why is the air in the vocal tract a fixed-free system? Say which end is which.",
       "a": "The glottis end is closed off by the vocal folds, so the air there cannot move and can only be compressed and expanded, which makes it the fixed end. The lip end is open, so the air there moves freely in and out without being compressed against anything, which makes it the free end."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dune, and why?",
       "a": "Both F1 and F2 go down. Lip rounding creates a constriction at the free end, where the air moves the most in every mode. The added mass therefore counts in both Mode 1 and Mode 2, and extra mass at a moving location lowers the frequency."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dean, and why?",
       "a": "F1 goes down and F2 goes up. The constriction is about two-thirds of the way from the glottis. In Mode 1 the air there is moving, so the added mass lowers F1, and in Mode 2 the air there is compressed, so the added stiffness raises F2."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in Don, and why?",
       "a": "F1 goes up and F2 goes down. The constriction is about one-third of the way from the glottis. In Mode 1 the air there is compressed, so the added stiffness raises F1, and in Mode 2 the air there is moving, so the added mass lowers F2."
      },
      {
       "source": "Lab 9",
       "q": "A new constriction is placed deep in the throat, one-fifth of the way from the glottis, where the air is compressed in both Mode 1 and Mode 2. What happens to F1 and F2?",
       "a": "Both F1 and F2 go up. The location is near the fixed end, where the air is compressed in both modes, so the added stiffness is what counts in both, and extra stiffness raises the frequency."
      },
      {
       "source": "Predicted",
       "q": "Why does rounding the lips lower every formant?",
       "a": "The lips are the free end of the vocal tract, and the free end is a location of maximum motion in every mode. A constriction there adds mass where the air is moving, so it lowers every formant. This is the same reason that adding mass at the top of a building lowers every mode."
      }
     ]
    },
    {
     "id": "source-filter",
     "tier": "Likely",
     "lectures": "Lectures 13 and 14",
     "title": "Source and filter, and F0",
     "know": [
      "Source: The **vocal folds** are the source. They produce **harmonics** at whole-number multiples of **F0**, the base frequency.",
      "Filter: The **air in the vocal tract** is the filter. Its **formants** decide which harmonics are loud.",
      "Core rule: **A formant makes the harmonics closest to it louder, and harmonics far from any formant come out weaker.** The outline of the harmonic heights is the **envelope**.",
      "Vowels: The harmonics stay the same from vowel to vowel. Only their heights change, and the envelope is what makes each vowel distinct.",
      "F0: Heavy, loose vocal folds give a low F0. Tight, light vocal folds give a high F0, so the harmonics are spaced farther apart.",
      "High voices: With a high F0, few harmonics fall near each formant, so the formants are hard to see. This is why a toddler's or a soprano's vowels are hard to identify.",
      "F0 carries meaning: F0 falls at the end of a statement and rises at the end of a question, and it signals sarcasm or pretending."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "What does the source supply and what does the filter do in speech?",
       "a": "The vocal folds are the source, and they supply the harmonics, which are whole-number multiples of F0. The air in the vocal tract is the filter, and its formants make the harmonics near them louder and the ones far from them weaker. So the source decides which frequencies are present, and the filter decides which of them are loud."
      },
      {
       "source": "Predicted",
       "q": "Two vowels are said at the same pitch. What is the same and what is different in their spectra?",
       "a": "The harmonics are the same, because the vocal folds vibrate at the same F0 for both vowels. The heights of the harmonics are different, because each vowel has its constriction in a different place, which moves the formants and changes the envelope."
      },
      {
       "source": "Predicted",
       "q": "Why are a toddler's vowels hard to identify?",
       "a": "A toddler has a very high F0, so the harmonics are spaced far apart. Few harmonics fall near each formant, and a formant can fall between two harmonics, so the envelope is hard to see. The formants are still there, but there are too few harmonics to reveal them."
      },
      {
       "source": "Predicted",
       "q": "If the vocal folds become tighter, what happens to F0 and to the spacing of the harmonics?",
       "a": "F0 goes up, because tighter vocal folds are stiffer, and more stiffness raises the frequency. The harmonics are multiples of F0, so they are spaced farther apart."
      }
     ]
    },
    {
     "id": "spectrogram",
     "tier": "Almost certain",
     "lectures": "Lectures 13 and 14",
     "title": "Spectra, spectrograms and speech over time",
     "know": [
      "Spectrum: A **spectrum** shows one instant, with frequency on the horizontal axis and amplitude on the vertical axis.",
      "Spectrogram: A **spectrogram** lines up many spectra over time. Time is on the horizontal axis, frequency on the vertical axis, and **darkness** shows amplitude.",
      "Dark bands: The **dark bands are the formants**. F1 is the lowest band and F2 is the next one up.",
      "Transitions: From schwa to /i/, the bands move apart. From schwa to /u/, both drop. From schwa to /a/, they move together.",
      "Where were you a year ago?: The formants never stay still, because every sound moves the constriction. Speech is a continuous series of constrictions, not a list of separate vowels.",
      "ma and na: When the m of ma is joined to the a of na, listeners hear na. Listeners decide on the consonant during the vowel, after the consonant is over (Malécot, 1950s)."
     ],
     "questions": [
      {
       "source": "Review 18",
       "q": "Describe a spectrogram.",
       "a": "A spectrogram lines up many spectra side by side over time. Time runs along the horizontal axis and frequency runs up the vertical axis, and the darkness of each spot shows how much amplitude there is at that frequency and time. The formants appear as dark bands, so you can follow them as they rise and fall, for example F1 rising and F2 falling from /i/ to /a/."
      },
      {
       "source": "Predicted",
       "q": "How is a spectrum different from a spectrogram?",
       "a": "A spectrum shows one frozen instant, with frequency on the horizontal axis and amplitude on the vertical axis. A spectrogram shows how the spectrum changes over time, with time on the horizontal axis, frequency on the vertical axis and amplitude shown as darkness. Real speech is always changing, so a spectrogram shows the formants moving."
      },
      {
       "source": "Lab 9",
       "q": "A speaker starts on schwa and switches to another vowel. F1 goes down and F2 goes up. Which vowel? What if both go down?",
       "a": "When F1 goes down and F2 goes up, the bands move apart, so the vowel is /i/ as in dean. When both F1 and F2 go down, the vowel is /u/ as in dune, because lip rounding lowers every formant."
      },
      {
       "source": "Predicted",
       "q": "Describe the spectrogram of a speaker going from schwa to the vowel of Don.",
       "a": "F1 goes up and F2 goes down, so the two lowest dark bands move toward each other. The constriction one-third of the way from the glottis is compressed in Mode 1 and moving in Mode 2, so it raises F1 and lowers F2."
      },
      {
       "source": "Predicted",
       "q": "Why do listeners hear na when the m of ma is joined to the a of na?",
       "a": "The information about the consonant is carried mostly by the vowel that follows it. After n, one formant of the vowel drops, and after m, that formant stays flat, so the a from na still signals n. Listeners therefore decide which consonant they heard during the vowel, after the consonant is over."
      }
     ]
    },
    {
     "id": "network-forward",
     "tier": "Likely",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Neural networks: inner products, weights and decisions",
     "know": [
      "Task: The vowel network takes **F1 and F2** and decides among five words, **done, dune, dean, Don and Dan**.",
      "Knowledge: **The network's knowledge is stored in its weights**, which are positive or negative numbers.",
      "Inner product: Each neuron multiplies each incoming activation by its weight and adds the results. This **inner product** is the core calculation of all AI.",
      "Forward propagation: The inner products are carried layer by layer from the input to the output.",
      "Output: The output is a **probability distribution**, numbers between 0 and 1 that **add up to 1**. The largest one is the decision.",
      "Desired output: The right answer is a **one-hot** list, 1 for the correct word and 0 everywhere else, such as 0, 0, 1, 0, 0 for dean.",
      "Direction questions: A positive activation times a positive weight is positive, so raising either one pushes that output's probability **up**. A negative weight would push it down."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "If an activation of 1.57 feeds the done output through a weight of positive 0.1, what happens to the probability of done if the weight goes up? If the activation goes up?",
       "a": "The probability of done goes up in both cases. The contribution to the done output is the activation times the weight, and both are positive, so raising either one makes the product larger and pushes done up. No multiplication is needed, only the signs."
      },
      {
       "source": "Predicted",
       "q": "What happens to the probability of done if that same weight were negative and the activation went up?",
       "a": "The probability of done goes down. A positive activation times a negative weight is negative, so a larger activation makes the contribution more negative and pushes the done output down."
      },
      {
       "source": "Predicted",
       "q": "Is 0.2, 0.3, 0.1, 0.2, 0.3 a valid probability distribution?",
       "a": "No. The numbers add up to 1.1, and a probability distribution must add up to exactly 1."
      },
      {
       "source": "Based on HW5 5",
       "q": "The first of five categories is correct. Write the desired output.",
       "a": "The desired output is 1, 0, 0, 0, 0. It puts all of the probability on the correct category and zero on every other category."
      },
      {
       "source": "Lab 9",
       "q": "The desired output over done, dune, dean, Don, Dan is 0, 0, 0, 1, 0, and the network outputs 0.10, 0.15, 0.60, 0.10, 0.05. Which vowel was said, which did the network guess, and what is the loss?",
       "a": "Don was said, and the network guessed dean, because dean has the largest probability, 0.60. The loss is a number that measures how far the computed output is from the desired output, for example how much probability it put on dean where there should be a 0."
      },
      {
       "source": "Based on HW5 3",
       "q": "What does Linear mean in the network code?",
       "a": "Linear means the layer computes inner products. Each neuron multiplies each incoming number by its weight and adds the results, with no other step."
      }
     ]
    },
    {
     "id": "backprop",
     "tier": "Almost certain",
     "lectures": "Lectures 15 and 16",
     "title": "Backpropagation: why learning starts at the end",
     "know": [
      "Learning: Every network starts with **random weights** and learns by correcting its mistakes, one small step at a time.",
      "Order: **The last set of weights is updated first, and the first set of weights is updated last.**",
      "Why the end is easy: The last weights affect the output probabilities **directly**, so one inner product shows whether each should go up or down.",
      "Why the start is hard: A first-layer weight affects the first hidden layer, which affects the next layer and the next, so its effect on the decision passes through every layer and depends on all the later weights.",
      "Dynamic programming: Solve the easy problem first and reuse its answer for the bigger problem that contains it (Bellman and Viterbi).",
      "Formula: **Backpropagation is stochastic gradient descent plus dynamic programming.** SGD changes each weight a little, and dynamic programming sets the order.",
      "Credit: Backpropagation was worked out in the mid-1980s, and Geoffrey Hinton won the 2024 Nobel Prize in Physics for it."
     ],
     "questions": [
      {
       "source": "Based on HW5 6",
       "q": "In what order are the weights updated?",
       "a": "The last set of weights is updated first, and the first set of weights is updated last. Each layer's update reuses what was already worked out for the layers after it."
      },
      {
       "source": "Based on HW5 7",
       "q": "Why does backpropagation start at the end?",
       "a": "The last set of weights affects the output probabilities, which are the decision, directly, so it is easy to tell whether raising or lowering each one makes the loss go up or down. A weight from the input to the first hidden layer affects the first hidden layer, then the second, then the third, and only then the output, so working out how to change it is a very complex problem that contains the problem of changing the last weights. Following dynamic programming, the simplest problem is solved first, and its answer makes the harder problems easier until the most complex one is solved."
      },
      {
       "source": "Based on HW5 8",
       "q": "What two methods together train the network's weights?",
       "a": "Stochastic gradient descent and backpropagation. Backpropagation works backward from the error to find which way each weight should change, and stochastic gradient descent moves each weight a small step in that direction."
      },
      {
       "source": "Predicted",
       "q": "Backpropagation is made of what two parts?",
       "a": "Backpropagation is stochastic gradient descent plus dynamic programming. Stochastic gradient descent nudges each weight a small step in the direction that lowers the error, and dynamic programming sets the order, from the last weights back to the first."
      },
      {
       "source": "Lab 9",
       "q": "Which part of training is the SGD part, and which is the dynamic programming part? What are the small problem and the big problem?",
       "a": "The SGD part is the adjusting, where each weight takes a small step, sized by the learning rate, in the direction that lowers the error. The dynamic programming part is the order of assigning blame, last layer first, reusing each layer's blame for the layer before it. The small problem is the blame of the last layer's weights, and the big problem is the blame of the early weights."
      },
      {
       "source": "Predicted",
       "q": "The network said done but the answer was dean. Should a last weight that pushes done up go up or down? Why?",
       "a": "It should go down. The probability of done is too high, because the desired output for done is zero. Lowering a weight that pushes done up shrinks its contribution and pulls the probability of done toward zero."
      },
      {
       "source": "Predicted",
       "q": "If the network already makes the right decision on a recording, what does it learn from it?",
       "a": "It learns nothing from that recording, because there is no error to correct. This can be a problem, because a network can keep getting the right answers by memorizing its data without learning the pattern underneath."
      }
     ]
    },
    {
     "id": "pytorch",
     "tier": "Almost certain",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Reading the PyTorch code",
     "know": [
      "Import lines: They bring in the **torch library**, which already contains the programs for inner products and backpropagation, so none of it has to be written by hand.",
      "Sequential: The network is **a sequence of layers, one after another**.",
      "nn.Linear(2, 3): A processing layer that **takes input from 2 neurons and has 3 neurons**. It computes inner products.",
      "Counting layers: The **input layer gets no line**, because it does no processing. The **last line is always the output layer**. nn.Sigmoid lines are not layers.",
      "Matching: The first number on each line must equal the second number on the line before it.",
      "Training lines: **SGD** is stochastic gradient descent, **lr** is the learning rate, **loss** is the mistake, **backward** runs backpropagation and **step** updates the weights.",
      "Learning rate: **A higher learning rate learns faster but less accurately. A lower one learns more accurately but more slowly.**"
     ],
     "questions": [
      {
       "source": "Review 20",
       "q": "How many hidden layers does this network have: Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)?",
       "a": "It has three hidden layers, with three, two and four neurons. The network has five layers in all, the input layer, three hidden layers and the output layer, but only four Linear lines, because the input layer does no processing and the last line is the output layer."
      },
      {
       "source": "Review 21",
       "q": "Write the code for the network with an additional hidden layer of 3 neurons right before the output layer, and adjust the other layers.",
       "a": "Keep the first three lines, change the old last line from Linear(4, 5) to Linear(4, 3), and add a new last line, Linear(3, 5). The network becomes Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 3), Linear(3, 5), so every layer still takes in exactly as many numbers as the layer before it produces."
      },
      {
       "source": "Predicted",
       "q": "Add a hidden layer of 6 neurons right after the input instead. What changes?",
       "a": "The first line becomes Linear(2, 6), and a new second line, Linear(6, 3), feeds the old first hidden layer. The rest stays the same, giving Linear(2, 6), Linear(6, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)."
      },
      {
       "source": "Lab 9",
       "q": "A network is written Linear(4, 3), Linear(3, 5), Linear(5, 2), Linear(2, 4). How many hidden layers, inputs and outputs does it have?",
       "a": "It has three hidden layers, with 3, 5 and 2 neurons. It takes 4 numbers as input and has 4 output neurons, so it decides among 4 categories."
      },
      {
       "source": "Predicted",
       "q": "How many hidden layers does a network have if its code is Linear(2, 3), Sigmoid, Linear(3, 2), Sigmoid, Linear(2, 4), Sigmoid, Linear(4, 5)?",
       "a": "It still has three hidden layers. Sigmoid lines are not layers, because they only apply the sigmoid to the layer before them, so only the four Linear lines count, and the last one is the output layer."
      },
      {
       "source": "Predicted",
       "q": "What do the import lines do, and what does Sequential mean?",
       "a": "The import lines bring the torch library into Python, so the programs for inner products and backpropagation do not have to be written by hand. Sequential means the network is a sequence of layers, one after another, with each layer taking its input from the layer before it."
      },
      {
       "source": "Based on HW5 9",
       "q": "What happens if the learning rate is raised from 0.1 to 0.3?",
       "a": "The network learns faster, but its accuracy goes down. A larger learning rate takes bigger steps, so it approaches the answer quickly but keeps overshooting."
      },
      {
       "source": "Lab 9",
       "q": "Two learning curves differ only in learning rate. One rises fast and jumps around, and the other rises slowly and smoothly. Which used the larger learning rate?",
       "a": "The one that rises fast and jumps around used the larger learning rate. Bigger steps get near the answer quickly but overshoot, while smaller steps are slower but smoother."
      }
     ]
    },
    {
     "id": "sigmoid",
     "tier": "Likely",
     "lectures": "Lectures 15 and 16",
     "title": "The sigmoid and where the idea came from",
     "know": [
      "From the brain: **Lord Edgar Adrian** won the Nobel Prize in 1932 for showing that **neurons are nearly digital**, either firing or not firing.",
      "What it does: The **sigmoid** takes an inner product and returns a number between 0 and 1.",
      "Values: A large negative input gives about **0** (off), a large positive input gives about **1** (on), and an input of exactly 0 gives **0.5**.",
      "Perception: Very different things can be perceived as the same (a friend with or without a hat), and very similar things as different (USC and UCLA), just like the flat parts and the steep middle of the sigmoid.",
      "In code: nn.Sigmoid goes after each hidden layer. The last layer has no sigmoid, because its outputs go to the loss, which turns them into probabilities.",
      "Bigger idea: Many basic ideas in AI, including neurons, inner products and near-digital firing, come from discoveries about real brains."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Where does the idea of the sigmoid come from?",
       "a": "It comes from biology. Lord Edgar Adrian discovered that real neurons are nearly digital, firing or not firing, and won the Nobel Prize in 1932. The sigmoid copies this by squashing any inner product into a number between 0 and 1, so a neuron is nearly off or nearly on."
      },
      {
       "source": "Lab 9",
       "q": "A hidden neuron's inner product is minus 2. Is its sigmoid activation closer to 0 or 1, and what does that mean?",
       "a": "It is closer to 0, because the input is negative. The neuron is mostly off and fires only rarely."
      },
      {
       "source": "Lab 9",
       "q": "If one input to that neuron goes up through a positive weight, what happens to its linear activation and its sigmoid activation?",
       "a": "Both go up. The larger input times a positive weight raises the inner product, and the sigmoid always rises when its input rises, so the neuron fires more often."
      },
      {
       "source": "Lab 9",
       "q": "What is the sigmoid activation if the linear activation is exactly 0?",
       "a": "It is 0.5, halfway between off and on, so the neuron is half active."
      },
      {
       "source": "Predicted",
       "q": "How does the sigmoid match human perception?",
       "a": "Some very different things are perceived as the same, and some very similar things are perceived as different. The flat parts of the sigmoid give the same output for very different inputs, such as minus 100 and minus 1000, while the steep middle gives very different outputs for two nearly equal inputs on either side of zero."
      }
     ]
    },
    {
     "id": "training",
     "tier": "Likely",
     "lectures": "Lecture 16",
     "title": "Training results: chance, overlap and repeated runs",
     "know": [
      "Chance: Accuracy starts at **20 percent**, because with random weights the network knows nothing, and a random guess among **five** vowels is right one time in five.",
      "Other counts: With ten categories, chance would be 10 percent.",
      "Epoch: Each pass of learning is an **epoch**, and a problem like this takes thousands of them.",
      "Leveling off: The network jumps to about 40 percent and levels off near **45 percent**, because the real vowel data **overlap** so much.",
      "Overlap: Peterson and Barney found this overlap in the early 1950s. Even a person would have to guess for a point in the middle of the overlap.",
      "Repeated runs: Ten runs from different random starting weights take **different paths but end at the same accuracy**, like children who hear different input but learn the same language.",
      "Memorizing: Children first say went correctly by memory, then say goed after learning the pattern, then learn the exception (Carol Chomsky)."
     ],
     "questions": [
      {
       "source": "Based on HW5 10",
       "q": "Why does accuracy start at 20 percent?",
       "a": "There are five categories, and with random weights the network knows nothing, so its guesses are no better than chance. Guessing at random among five vowels is right one time in five, which is 20 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does accuracy start at 10 percent for a network with ten output categories?",
       "a": "With random weights the network's guesses are no better than chance, and a random guess among ten categories is right one time in ten, which is 10 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does the vowel network level off near 40 to 45 percent instead of 100 percent?",
       "a": "The real formant data for the five vowels overlap a great deal, so many recordings with nearly the same F1 and F2 belong to different vowels. For a point in the middle of the overlap, even a person would have to guess, so no network can classify those points reliably."
      },
      {
       "source": "Predicted",
       "q": "Ten training runs start from different random weights. What happens?",
       "a": "The runs take different paths, with some jumping up early and some staying at chance longer, but all of them end at about the same accuracy. Stochastic gradient descent involves chance along the way, but the end point is the same."
      }
     ]
    },
    {
     "id": "possible-llm",
     "tier": "Possible",
     "lectures": "Lecture 17 (start)",
     "title": "Possible: from the vowel network to sequences",
     "note": "The professor said on Nov 10 that the LLM part is for the final. The TA's Lab 9 review still included these questions, so read them once.",
     "know": [
      "One vector versus many: The vowel network takes one vector (F1 and F2) and chooses among five categories. An LLM takes many vectors in sequence and predicts what comes next.",
      "Recurrent network: Michael Jordan's 1985 network fed its output back into its input to model speech production over time.",
      "Phonotactics: The rules for which sounds can follow which are **phonotactics**. A network trained only to guess the next letter learns them."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "What is the difference between the input and output of the vowel network and those of an LLM?",
       "a": "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."
      },
      {
       "source": "Lab 9",
       "q": "Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp?",
       "a": "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."
      }
     ]
    }
   ],
   "flags": [
    "HW5 questions are labeled Based on HW5, because only the HW5 answer key was available. The answers come from the key, and the question wording is reconstructed from them.",
    "Lab 7 says the vowel in year decreases F1 and F2. The correct pattern is F1 down and F2 up, which Lab 7's own table, Lab 9 and the lectures all give.",
    "Lab 7 labels the third fixed-free mode the 2nd formant. It is the 3rd formant.",
    "Lab 9 Part 4 (LLMs, phonotactics, agents) was in the TA's review, but the professor said on Nov 10 that the LLM part is for the final.",
    "The studio's earlier answer to review question 4 said Mode 3 drops more than Mode 1 because the middle mass moves more in Mode 3. Lab 6 shows the middle mass moves the most in Mode 1, so that reason was wrong. The answer here gives only what is certain: Mode 1 and Mode 3 go down, and Mode 2 stays the same."
   ]
  },
  "exam2-v2": {
   "label": "Exam 2 · Study this first (v2, Lectures 11–18)",
   "range": "Lectures 11 to 18",
   "howToAnswer": [
    "Answer first, then the reason: Name the direction or the count in the first sentence, then explain why in one to three more sentences.",
    "Say what the spot is doing: For any mass, stiffness or constriction question, first say whether that location is moving or stretching in that mode.",
    "Use the course terms: Mode, harmonic, formant, fixed-fixed, fixed-free, constriction, inner product, weight, activation and loss should appear where they belong.",
    "Describe questions need steps: For \"describe a spectrogram\" or \"why does backpropagation start at the end\", walk through the process in full sentences.",
    "No arithmetic beyond simple multiples: He does not ask you to multiply decimals, give years, use the word seed, or write PyTorch from scratch."
   ],
   "scope": {
    "covers": "Lectures 11 to 18: vibration and formants, spectrograms, the vowel network and its code, and large language models, heads and layers, Gestalt completion, agentic systems and phonotactics.",
    "final": "",
    "evidence": "On Exam 1, about 15 of the 25 questions came almost word for word from the review sheet, with only the sounds, numbers or positions changed. On Nov 5 he said heads are a question on the exam. Questions marked Predicted change one thing in a real review, homework, lab or lecture question. They are predictions, not confirmed exam questions."
   },
   "topics": [
    {
     "id": "modes",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12 and 13",
     "title": "Masses, springs and modes",
     "know": [
      "Why it vibrates: The spring tends to return to **equilibrium**, and a moving mass tends to **keep moving**, so the mass overshoots and the cycle repeats.",
      "Mass and stiffness: **More mass lowers the frequency, and more stiffness raises the frequency.**",
      "Directions: **Longitudinal** motion (back and forth along the spring) and **transverse** motion (up and down) behave the same way.",
      "Mode: A **mode** is one way a system can vibrate. **N masses give N modes.**",
      "Higher modes: The more the masses move **against each other**, the more the springs stretch and compress, so the mode has more stiffness and a **higher frequency**.",
      "Local rule: **A mass changes the frequency only where it moves, and a spring changes the frequency only where it stretches.**",
      "Infinitely many: An infinite number of masses and springs along a line is a **string**. Spread over a surface, it is a **membrane**, such as a drum or the vocal folds."
     ],
     "questions": [
      {
       "source": "Review 1",
       "q": "Why do multiple mass systems have multiple frequencies?",
       "a": "A system with several masses can vibrate in several ways, called modes, because the masses can move together or against each other. When the masses move against each other, the springs between them stretch and compress more, so more stiffness is working and that mode vibrates faster. Each mode therefore has its own frequency, and a system with N masses has N modes and N frequencies."
      },
      {
       "source": "Review 2",
       "q": "How many modes does a 3-mass system have?",
       "a": "A 3-mass system has three modes, because a system with N masses has N modes of vibration."
      },
      {
       "source": "Lab 9",
       "q": "Four masses are joined by springs between two walls. How many modes does the system have, and what are the masses doing in the lowest and highest modes?",
       "a": "The system has four modes, one for each mass. In the lowest mode, Mode 1, all four masses move in the same direction at the same time. In the highest mode, Mode 4, every mass moves opposite to its neighbors, so every spring is stretched and compressed and the frequency is highest."
      },
      {
       "source": "Review 3",
       "q": "Which mode of the 3-mass system has the highest frequency? Why?",
       "a": "Mode 3 has the highest frequency. In Mode 3 the middle mass moves opposite to the two outer masses, so every spring is stretched and compressed as much as possible. That puts the most stiffness to work, and more stiffness makes the system vibrate faster."
      },
      {
       "source": "Predicted",
       "q": "Which mode of a 2-mass system has the lowest frequency, and why?",
       "a": "Mode 1 has the lowest frequency. In Mode 1 the two masses move together, so the middle spring is carried along without stretching. Only the two outer springs are working, so Mode 1 has less stiffness than Mode 2 and vibrates more slowly."
      },
      {
       "source": "Review 4",
       "q": "If you increase mass 2, what happens to the frequencies of each of the modes?",
       "a": "Mode 1 and Mode 3 go down, and Mode 2 stays the same. The middle mass moves in Mode 1 and in Mode 3, so making it heavier slows those modes. In Mode 2 the middle mass does not move, and a mass that does not move has no effect on the frequency."
      },
      {
       "source": "Predicted",
       "q": "In the 3-mass system, what happens to each mode if you make mass 1 (an outer mass) heavier?",
       "a": "All three modes go down. The outer mass moves in Mode 1, Mode 2 and Mode 3, and a heavier mass that is moving lowers the frequency. No mode leaves an outer mass still, so none of the three frequencies stays the same."
      },
      {
       "source": "Predicted",
       "q": "In a 2-mass system, what happens to each mode if you make the middle spring stiffer?",
       "a": "Mode 1 stays the same and Mode 2 goes up. In Mode 1 the masses move together, so the middle spring is never stretched and its extra stiffness does nothing. In Mode 2 the masses move against each other, so the middle spring is stretched and compressed and the extra stiffness raises the frequency."
      },
      {
       "source": "Review 5",
       "q": "What do you get when you have an infinite number of masses and springs?",
       "a": "You get a string, like a guitar or piano string. Every small piece of a string has mass, and every small piece stretches like a spring, so a string vibrates in modes like a chain of masses, only with infinitely many of them. Spread over a surface instead of a line, the same idea gives a membrane such as a drum or the vocal folds."
      },
      {
       "source": "Predicted",
       "q": "What happens to the frequency of a single mass on a spring if you make the spring stiffer? If you make the mass heavier?",
       "a": "A stiffer spring raises the frequency, because it pulls the mass back toward equilibrium with more force and turns it around sooner. A heavier mass lowers the frequency, because a heavier mass is harder to start and stop, so each back-and-forth cycle takes longer."
      }
     ]
    },
    {
     "id": "springiness",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "Where the springiness is, and what a local change does",
     "know": [
      "Alternation: **Where a vibrating system moves the most, it stretches the least, and where it does not move, it stretches the most.**",
      "Shortcut: The springiest locations are the points of **no movement**, which are the fixed ends and the points where the mode crosses its resting line.",
      "Ends: A **fixed end is always springy**, and a **free end is always moving**, in every mode.",
      "Added mass: Extra mass lowers a mode's frequency **only where that mode is moving**.",
      "Added stiffness: Extra stiffness raises a mode's frequency **only where that mode is stretching**.",
      "Both at once: Adding mass and stiffness together does **not** cancel out, except for a single mass on a single spring, because at one spot in one mode only one of the two matters.",
      "Perturbation theory: It predicts how a small change in one location affects vibration. In the late nineteenth century, wax placed where a drum vibrated a lot lowered its pitch, and wax placed where it did not vibrate had no effect."
     ],
     "questions": [
      {
       "source": "Review 6",
       "q": "This is Mode 5 of a string fixed at both ends. Circle the areas where there is the most springiness.",
       "a": "Circle the two fixed ends and the four points where the string crosses its middle line, six places in all. At those points the string does not move, but the pieces on either side move in opposite directions, so the string there is stretched and compressed the most. The tops of the five bumps have the most motion and the least springiness."
      },
      {
       "source": "Predicted",
       "q": "This is Mode 3 of a string fixed at both ends. Where is the most springiness, and where is the most motion?",
       "a": "The most springiness is at the two fixed ends and at the two points where the string crosses its middle line, four places in all, because the string does not move there. The most motion is at the tops of the three bumps, where the string swings the most and is hardly stretched."
      },
      {
       "source": "Review 11",
       "q": "This picture shows Mode 4 of a building. Circle the areas where there is the most springiness.",
       "a": "Circle the fixed base and the three points where the building crosses its resting position, four places in all. Those points do not move, but the parts above and below them move in opposite directions, so the structure there stretches and compresses the most. The free top moves the most and is the least springy, so it is not circled."
      },
      {
       "source": "Predicted",
       "q": "This diagram shows Mode 2 of a building. Where is the most springiness?",
       "a": "The most springiness is at the fixed base and at the one point above it where the building crosses its resting position. Those two points do not move, so the structure there is stretched and compressed the most. The free top moves the most and is the least springy."
      },
      {
       "source": "Review 14",
       "q": "If we increase the stiffness and mass of the string at the boxed location (where Mode 3 crosses its middle line and Mode 4 is at the top of a bump), what happens to Mode 3 and Mode 4's frequencies, and why?",
       "a": "Mode 3 goes up and Mode 4 goes down. In Mode 3 the boxed spot does not move but is stretched the most, so the added mass does nothing and the added stiffness raises the frequency. In Mode 4 the boxed spot moves the most and is not stretched, so the added mass lowers the frequency and the added stiffness does nothing."
      },
      {
       "source": "Predicted",
       "q": "The box is moved to a spot where Mode 3 is at the top of a bump and Mode 4 crosses its middle line. Mass and stiffness are added there. What happens?",
       "a": "Now Mode 3 goes down and Mode 4 goes up. In Mode 3 the spot moves the most and is hardly stretched, so the added mass lowers the frequency. In Mode 4 the spot does not move but is stretched the most, so the added stiffness raises the frequency."
      },
      {
       "source": "Review 15",
       "q": "If we increase the mass and stiffness of the building at its very top, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes down. The top of the building is the free end, so in every mode it moves the most and is hardly stretched. The added mass matters there and lowers the frequency, while the added stiffness does nothing because nothing is stretching at the top."
      },
      {
       "source": "Predicted",
       "q": "If we increase the mass and stiffness of the building at its very base, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes up. The base is the fixed end, so it never moves but is always stretched and compressed. The added mass does nothing there because the base does not move, while the added stiffness raises the frequency."
      },
      {
       "source": "Lab 9",
       "q": "In Mode 3 of a string fixed at both ends, point B does not move and point C is at the bottom of a bump. What happens to Mode 3 if you add a small weight at B? At C? If you stiffen the string at B?",
       "a": "A weight at B leaves Mode 3 the same, because B does not move in Mode 3. A weight at C lowers Mode 3's frequency, because C swings the most and the extra mass counts there. Stiffening the string at B raises Mode 3's frequency, because B is where the string stretches the most."
      },
      {
       "source": "Lab 9",
       "q": "The same spot B is moving in Mode 1. Does a weight at B change Mode 1's frequency?",
       "a": "Yes, the weight lowers Mode 1's frequency. In Mode 1 the whole string is one bump, so the spot at B is moving, and extra mass at a moving spot slows the vibration."
      }
     ]
    },
    {
     "id": "harmonics-formants",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12, 13 and 14",
     "title": "Harmonics and formants: fixed-fixed and fixed-free systems",
     "know": [
      "Fixed-fixed: A system fixed at both ends, such as a string or the **vocal folds**, has modes at **1, 2, 3, 4 times** the first. These are **harmonics**.",
      "Why whole numbers: The first mode is **half a wave**, and each higher mode must fit a whole number of those half-waves between the two fixed ends. Mode N contains N copies of Mode 1.",
      "Fixed-free: A system fixed at one end and free at the other, such as a **building** or the **air in the vocal tract**, has modes at **1, 3, 5, 7 times** the first. These are **formants**.",
      "Why odd numbers: The first mode is a **quarter-wave packet** from no motion to the most motion. The free end must always be moving, so packets are added two at a time, giving one, three, five and seven packets.",
      "Spacing: Fixed-fixed modes are spaced by the first frequency. Fixed-free modes are spaced by **twice** the first frequency.",
      "Building analogy: A building is fixed to the ground and free at the top, just as the air in the vocal tract is fixed at the closed vocal folds and free at the open lips.",
      "Spectrum: A **spectrum** has frequency on the horizontal axis and amplitude on the vertical axis, with one spike for each mode that is present.",
      "Scientific method: The theory that the vocal folds are a membrane predicts **equidistant harmonics** (evenly spaced harmonics). Recordings in Praat confirmed the prediction."
     ],
     "questions": [
      {
       "source": "Review 7",
       "q": "A string is fixed on both sides. If Mode 1 has frequency 200 Hz, what frequency does Mode 5 have?",
       "a": "Mode 5 has a frequency of 1000 Hz. In a string fixed at both ends, each mode is a whole-number multiple of the first, and Mode 5 contains five copies of Mode 1, so it is five times 200 Hz."
      },
      {
       "source": "Lab 9",
       "q": "A string fixed at both ends has Mode 1 at 150 Hz. What are Modes 2 and 3? If one end is freed and Mode 1 stays at 150 Hz, what are Modes 2 and 3 now?",
       "a": "Fixed at both ends, Modes 2 and 3 are 300 and 450 Hz, which are two and three times 150. Fixed at one end and free at the other, Modes 2 and 3 are 450 and 750 Hz, which are three and five times 150, because only the odd multiples occur. The fixed-fixed modes are 150 Hz apart, and the fixed-free modes are 300 Hz apart."
      },
      {
       "source": "Review 8",
       "q": "Why are the frequencies of fixed-fixed vibratory systems spaced the way they are?",
       "a": "In a system fixed at both ends, the first mode is half a wave, going from no motion at one end to the most motion in the middle and back to no motion. Every higher mode must fit a whole number of those half-waves into the same length, because both ends must stay still. Mode 2 fits two, so it vibrates twice as fast, and Mode 3 fits three, so the frequencies are evenly spaced whole-number multiples of the first."
      },
      {
       "source": "Review 16",
       "q": "Why are the formants of a fixed-free system 1, 3, 5, etc. multiples of the base frequency?",
       "a": "In a fixed-free system the basic piece is a quarter-wave packet, which runs from no motion at the fixed end to the most motion at the free end. Every mode must start still at the fixed end and end with the most motion at the free end. One extra packet would leave a still point at the free end, which cannot happen, so packets are added two at a time, giving one, three, five and seven packets and odd-multiple frequencies."
      },
      {
       "source": "Predicted",
       "q": "If F1 is 500 Hz, what are F2 and F3?",
       "a": "F2 is 1500 Hz and F3 is 2500 Hz. The air in the vocal tract is a fixed-free system, so its formants are odd multiples of the first, which are three times and five times 500 Hz, not two and three times."
      },
      {
       "source": "Review 17",
       "q": "What aspect of speech has the properties in the fixed-free question?",
       "a": "The formants of the air in the vocal tract have these properties. The air is fixed at the closed vocal folds and free at the open lips, so its frequencies of vibration, the formants, are odd multiples of the first formant."
      },
      {
       "source": "Predicted",
       "q": "What aspect of speech has frequencies at whole-number multiples, and why?",
       "a": "The harmonics of the vocal folds have whole-number multiples. The vocal folds are a membrane held in place along their edges, so they behave like a system fixed at both ends, and each mode is a whole number of copies of the first."
      },
      {
       "source": "Review 12 and 13",
       "q": "What in speech is a building analogous to, and why does the analogy hold?",
       "a": "A building is analogous to the air in the vocal tract. Both are fixed at one end and free at the other: the building is fixed to the ground and free at the top, and the air is fixed at the closed vocal folds and free at the open lips. Because the ends match, both have springiness at the fixed end, the most motion at the free end, and frequencies at odd multiples of the first."
      },
      {
       "source": "Predicted",
       "q": "How is a building different from the air in the vocal tract?",
       "a": "Engineers design a building to sway only in Mode 1, because higher modes would move floors in opposite directions and could break the structure. The air in the vocal tract vibrates in all of its modes at once, and speaking changes the mass and stiffness of the air at different locations to move those formants."
      },
      {
       "source": "Review 9",
       "q": "Draw the spectrum for a string fixed at both ends with Mode 1 at 200 Hz, up to Mode 6.",
       "a": "Draw frequency along the horizontal axis and amplitude up the vertical axis. Put six evenly spaced spikes at 200, 400, 600, 800, 1000 and 1200 Hz, one for each mode. If the modes are equally strong, the spikes can be drawn the same height."
      },
      {
       "source": "Predicted",
       "q": "Draw the spectrum for a fixed-free system with Mode 1 at 200 Hz, up to Mode 4.",
       "a": "Draw spikes only at the odd multiples: 200, 600, 1000 and 1400 Hz. A fixed-free system has no even multiples, because an even number of quarter-wave packets would leave a still point at the free end."
      },
      {
       "source": "Review 10",
       "q": "If the vocal folds have their base frequency, F0, at 150 Hz, draw the spectrum for the first 5 harmonics.",
       "a": "Draw spikes at 150, 300, 450, 600 and 750 Hz, with frequency along the bottom and amplitude going up. The vocal folds are a membrane fixed along its edges, so their harmonics are whole-number multiples of F0 and the spikes are evenly spaced 150 Hz apart."
      }
     ]
    },
    {
     "id": "constrictions",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "The vocal tract, constrictions and the vowels /i/, /a/ and /u/",
     "know": [
      "Fixed-free tube: The air in the vocal tract is **fixed at the glottis** (closed vocal folds, so the air can only be compressed) and **free at the lips** (the air moves in and out).",
      "Schwa: With no constriction, as in **done**, the formants are about **500, 1500 and 2500 Hz**.",
      "Constriction: A **constriction** (narrowing) packs the air into a smaller space, which makes it both **heavier** (denser) and **stiffer**.",
      "Four steps: Find the location, decide whether the air there is mostly **moving** or mostly **compressed** in that mode, pick the extra that counts (mass if moving, stiffness if compressed), then say whether the formant goes **down** or **up**.",
      "/u/ (dune): The constriction is at the lips, where the air is moving in both modes, so **F1 and F2 both go down**.",
      "/i/ (dean): The constriction is two-thirds of the way from the glottis. The air there moves in Mode 1 and is compressed in Mode 2, so **F1 goes down and F2 goes up** (the formants move apart).",
      "/a/ (Don): The constriction is one-third of the way from the glottis. The air there is compressed in Mode 1 and moves in Mode 2, so **F1 goes up and F2 goes down** (the formants move together).",
      "Reasoning backward: A large rise means the air there was springy and hardly moving. A large fall means the air there was moving a lot."
     ],
     "questions": [
      {
       "source": "Review 19",
       "q": "If I constrict the vocal tract somewhere and I raise the formant a great deal, what must be true of air motion versus springiness at this location?",
       "a": "At that location the air must be very springy and hardly moving in that mode. A constriction adds both mass and stiffness, and the formant went up, so the added stiffness is what counted. Stiffness only counts where the air is compressed and expanded, and the added mass did nothing because the air there was not moving."
      },
      {
       "source": "Predicted",
       "q": "If I constrict the vocal tract somewhere and I lower the formant a great deal, what must be true at this location?",
       "a": "At that location the air must be moving a lot and hardly compressed in that mode. The formant went down, so the added mass is what counted, and mass only counts where the air is moving. This is what happens at the lips for /u/."
      },
      {
       "source": "Lab 9",
       "q": "A classmate says more mass lowers the frequency and more stiffness raises it, so a constriction always cancels out. What is wrong with this argument?",
       "a": "In any one mode, at most locations only one of the two changes matters. If the air at the constriction is mostly moving, it is not being compressed, so only the extra mass counts and the formant goes down. If the air there is mostly compressed, it is not moving, so only the extra stiffness counts and the formant goes up, which is why the same constriction can push F1 and F2 in opposite directions."
      },
      {
       "source": "Lab 9",
       "q": "Why is the air in the vocal tract a fixed-free system? Say which end is which.",
       "a": "The glottis end is closed off by the vocal folds, so the air there cannot move and can only be compressed and expanded, which makes it the fixed end. The lip end is open, so the air there moves freely in and out without being compressed against anything, which makes it the free end."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dune, and why?",
       "a": "Both F1 and F2 go down. Lip rounding creates a constriction at the free end, where the air moves the most in every mode. The added mass therefore counts in both Mode 1 and Mode 2, and extra mass at a moving location lowers the frequency."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dean, and why?",
       "a": "F1 goes down and F2 goes up. The constriction is about two-thirds of the way from the glottis. In Mode 1 the air there is moving, so the added mass lowers F1, and in Mode 2 the air there is compressed, so the added stiffness raises F2."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in Don, and why?",
       "a": "F1 goes up and F2 goes down. The constriction is about one-third of the way from the glottis. In Mode 1 the air there is compressed, so the added stiffness raises F1, and in Mode 2 the air there is moving, so the added mass lowers F2."
      },
      {
       "source": "Lab 9",
       "q": "A new constriction is placed deep in the throat, one-fifth of the way from the glottis, where the air is compressed in both Mode 1 and Mode 2. What happens to F1 and F2?",
       "a": "Both F1 and F2 go up. The location is near the fixed end, where the air is compressed in both modes, so the added stiffness is what counts in both, and extra stiffness raises the frequency."
      },
      {
       "source": "Predicted",
       "q": "Why does rounding the lips lower every formant?",
       "a": "The lips are the free end of the vocal tract, and the free end is a location of maximum motion in every mode. A constriction there adds mass where the air is moving, so it lowers every formant. This is the same reason that adding mass at the top of a building lowers every mode."
      }
     ]
    },
    {
     "id": "source-filter",
     "tier": "Likely",
     "lectures": "Lectures 13 and 14",
     "title": "Source and filter, and F0",
     "know": [
      "Source: The **vocal folds** are the source. They produce **harmonics** at whole-number multiples of **F0**, the base frequency.",
      "Filter: The **air in the vocal tract** is the filter. Its **formants** decide which harmonics are loud.",
      "Core rule: **A formant makes the harmonics closest to it louder, and harmonics far from any formant come out weaker.** The outline of the harmonic heights is the **envelope**.",
      "Vowels: The harmonics stay the same from vowel to vowel. Only their heights change, and the envelope is what makes each vowel distinct.",
      "F0: Heavy, loose vocal folds give a low F0. Tight, light vocal folds give a high F0, so the harmonics are spaced farther apart.",
      "High voices: With a high F0, few harmonics fall near each formant, so the formants are hard to see. This is why a toddler's or a soprano's vowels are hard to identify.",
      "F0 carries meaning: F0 falls at the end of a statement and rises at the end of a question, and it signals sarcasm or pretending."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "What does the source supply and what does the filter do in speech?",
       "a": "The vocal folds are the source, and they supply the harmonics, which are whole-number multiples of F0. The air in the vocal tract is the filter, and its formants make the harmonics near them louder and the ones far from them weaker. So the source decides which frequencies are present, and the filter decides which of them are loud."
      },
      {
       "source": "Predicted",
       "q": "Two vowels are said at the same pitch. What is the same and what is different in their spectra?",
       "a": "The harmonics are the same, because the vocal folds vibrate at the same F0 for both vowels. The heights of the harmonics are different, because each vowel has its constriction in a different place, which moves the formants and changes the envelope."
      },
      {
       "source": "Predicted",
       "q": "Why are a toddler's vowels hard to identify?",
       "a": "A toddler has a very high F0, so the harmonics are spaced far apart. Few harmonics fall near each formant, and a formant can fall between two harmonics, so the envelope is hard to see. The formants are still there, but there are too few harmonics to reveal them."
      },
      {
       "source": "Predicted",
       "q": "If the vocal folds become tighter, what happens to F0 and to the spacing of the harmonics?",
       "a": "F0 goes up, because tighter vocal folds are stiffer, and more stiffness raises the frequency. The harmonics are multiples of F0, so they are spaced farther apart."
      }
     ]
    },
    {
     "id": "spectrogram",
     "tier": "Almost certain",
     "lectures": "Lectures 13 and 14",
     "title": "Spectra, spectrograms and speech over time",
     "know": [
      "Spectrum: A **spectrum** shows one instant, with frequency on the horizontal axis and amplitude on the vertical axis.",
      "Spectrogram: A **spectrogram** lines up many spectra over time. Time is on the horizontal axis, frequency on the vertical axis, and **darkness** shows amplitude.",
      "Dark bands: The **dark bands are the formants**. F1 is the lowest band and F2 is the next one up.",
      "Transitions: From schwa to /i/, the bands move apart. From schwa to /u/, both drop. From schwa to /a/, they move together.",
      "Where were you a year ago?: The formants never stay still, because every sound moves the constriction. Speech is a continuous series of constrictions, not a list of separate vowels.",
      "ma and na: When the m of ma is joined to the a of na, listeners hear na. Listeners decide on the consonant during the vowel, after the consonant is over (Malécot, 1950s)."
     ],
     "questions": [
      {
       "source": "Review 18",
       "q": "Describe a spectrogram.",
       "a": "A spectrogram lines up many spectra side by side over time. Time runs along the horizontal axis and frequency runs up the vertical axis, and the darkness of each spot shows how much amplitude there is at that frequency and time. The formants appear as dark bands, so you can follow them as they rise and fall, for example F1 rising and F2 falling from /i/ to /a/."
      },
      {
       "source": "Predicted",
       "q": "How is a spectrum different from a spectrogram?",
       "a": "A spectrum shows one frozen instant, with frequency on the horizontal axis and amplitude on the vertical axis. A spectrogram shows how the spectrum changes over time, with time on the horizontal axis, frequency on the vertical axis and amplitude shown as darkness. Real speech is always changing, so a spectrogram shows the formants moving."
      },
      {
       "source": "Lab 9",
       "q": "A speaker starts on schwa and switches to another vowel. F1 goes down and F2 goes up. Which vowel? What if both go down?",
       "a": "When F1 goes down and F2 goes up, the bands move apart, so the vowel is /i/ as in dean. When both F1 and F2 go down, the vowel is /u/ as in dune, because lip rounding lowers every formant."
      },
      {
       "source": "Predicted",
       "q": "Describe the spectrogram of a speaker going from schwa to the vowel of Don.",
       "a": "F1 goes up and F2 goes down, so the two lowest dark bands move toward each other. The constriction one-third of the way from the glottis is compressed in Mode 1 and moving in Mode 2, so it raises F1 and lowers F2."
      },
      {
       "source": "Predicted",
       "q": "Why do listeners hear na when the m of ma is joined to the a of na?",
       "a": "The information about the consonant is carried mostly by the vowel that follows it. After n, one formant of the vowel drops, and after m, that formant stays flat, so the a from na still signals n. Listeners therefore decide which consonant they heard during the vowel, after the consonant is over."
      }
     ]
    },
    {
     "id": "network-forward",
     "tier": "Likely",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Neural networks: inner products, weights and decisions",
     "know": [
      "Task: The vowel network takes **F1 and F2** and decides among five words, **done, dune, dean, Don and Dan**.",
      "Knowledge: **The network's knowledge is stored in its weights**, which are positive or negative numbers.",
      "Inner product: Each neuron multiplies each incoming activation by its weight and adds the results. This **inner product** is the core calculation of all AI.",
      "Forward propagation: The inner products are carried layer by layer from the input to the output.",
      "Output: The output is a **probability distribution**, numbers between 0 and 1 that **add up to 1**. The largest one is the decision.",
      "Desired output: The right answer is a **one-hot** list, 1 for the correct word and 0 everywhere else, such as 0, 0, 1, 0, 0 for dean.",
      "Direction questions: A positive activation times a positive weight is positive, so raising either one pushes that output's probability **up**. A negative weight would push it down."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "If an activation of 1.57 feeds the done output through a weight of positive 0.1, what happens to the probability of done if the weight goes up? If the activation goes up?",
       "a": "The probability of done goes up in both cases. The contribution to the done output is the activation times the weight, and both are positive, so raising either one makes the product larger and pushes done up. No multiplication is needed, only the signs."
      },
      {
       "source": "Predicted",
       "q": "What happens to the probability of done if that same weight were negative and the activation went up?",
       "a": "The probability of done goes down. A positive activation times a negative weight is negative, so a larger activation makes the contribution more negative and pushes the done output down."
      },
      {
       "source": "Predicted",
       "q": "Is 0.2, 0.3, 0.1, 0.2, 0.3 a valid probability distribution?",
       "a": "No. The numbers add up to 1.1, and a probability distribution must add up to exactly 1."
      },
      {
       "source": "Based on HW5 5",
       "q": "The first of five categories is correct. Write the desired output.",
       "a": "The desired output is 1, 0, 0, 0, 0. It puts all of the probability on the correct category and zero on every other category."
      },
      {
       "source": "Lab 9",
       "q": "The desired output over done, dune, dean, Don, Dan is 0, 0, 0, 1, 0, and the network outputs 0.10, 0.15, 0.60, 0.10, 0.05. Which vowel was said, which did the network guess, and what is the loss?",
       "a": "Don was said, and the network guessed dean, because dean has the largest probability, 0.60. The loss is a number that measures how far the computed output is from the desired output, for example how much probability it put on dean where there should be a 0."
      },
      {
       "source": "Based on HW5 3",
       "q": "What does Linear mean in the network code?",
       "a": "Linear means the layer computes inner products. Each neuron multiplies each incoming number by its weight and adds the results, with no other step."
      }
     ]
    },
    {
     "id": "backprop",
     "tier": "Almost certain",
     "lectures": "Lectures 15 and 16",
     "title": "Backpropagation: why learning starts at the end",
     "know": [
      "Learning: Every network starts with **random weights** and learns by correcting its mistakes, one small step at a time.",
      "Order: **The last set of weights is updated first, and the first set of weights is updated last.**",
      "Why the end is easy: The last weights affect the output probabilities **directly**, so one inner product shows whether each should go up or down.",
      "Why the start is hard: A first-layer weight affects the first hidden layer, which affects the next layer and the next, so its effect on the decision passes through every layer and depends on all the later weights.",
      "Dynamic programming: Solve the easy problem first and reuse its answer for the bigger problem that contains it (Bellman and Viterbi).",
      "Formula: **Backpropagation is stochastic gradient descent plus dynamic programming.** SGD changes each weight a little, and dynamic programming sets the order.",
      "Credit: Backpropagation was worked out in the mid-1980s, and Geoffrey Hinton won the 2024 Nobel Prize in Physics for it."
     ],
     "questions": [
      {
       "source": "Based on HW5 6",
       "q": "In what order are the weights updated?",
       "a": "The last set of weights is updated first, and the first set of weights is updated last. Each layer's update reuses what was already worked out for the layers after it."
      },
      {
       "source": "Based on HW5 7",
       "q": "Why does backpropagation start at the end?",
       "a": "The last set of weights affects the output probabilities, which are the decision, directly, so it is easy to tell whether raising or lowering each one makes the loss go up or down. A weight from the input to the first hidden layer affects the first hidden layer, then the second, then the third, and only then the output, so working out how to change it is a very complex problem that contains the problem of changing the last weights. Following dynamic programming, the simplest problem is solved first, and its answer makes the harder problems easier until the most complex one is solved."
      },
      {
       "source": "Based on HW5 8",
       "q": "What two methods together train the network's weights?",
       "a": "Stochastic gradient descent and backpropagation. Backpropagation works backward from the error to find which way each weight should change, and stochastic gradient descent moves each weight a small step in that direction."
      },
      {
       "source": "Predicted",
       "q": "Backpropagation is made of what two parts?",
       "a": "Backpropagation is stochastic gradient descent plus dynamic programming. Stochastic gradient descent nudges each weight a small step in the direction that lowers the error, and dynamic programming sets the order, from the last weights back to the first."
      },
      {
       "source": "Lab 9",
       "q": "Which part of training is the SGD part, and which is the dynamic programming part? What are the small problem and the big problem?",
       "a": "The SGD part is the adjusting, where each weight takes a small step, sized by the learning rate, in the direction that lowers the error. The dynamic programming part is the order of assigning blame, last layer first, reusing each layer's blame for the layer before it. The small problem is the blame of the last layer's weights, and the big problem is the blame of the early weights."
      },
      {
       "source": "Predicted",
       "q": "The network said done but the answer was dean. Should a last weight that pushes done up go up or down? Why?",
       "a": "It should go down. The probability of done is too high, because the desired output for done is zero. Lowering a weight that pushes done up shrinks its contribution and pulls the probability of done toward zero."
      },
      {
       "source": "Predicted",
       "q": "If the network already makes the right decision on a recording, what does it learn from it?",
       "a": "It learns nothing from that recording, because there is no error to correct. This can be a problem, because a network can keep getting the right answers by memorizing its data without learning the pattern underneath."
      }
     ]
    },
    {
     "id": "pytorch",
     "tier": "Almost certain",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Reading the PyTorch code",
     "know": [
      "Import lines: They bring in the **torch library**, which already contains the programs for inner products and backpropagation, so none of it has to be written by hand.",
      "Sequential: The network is **a sequence of layers, one after another**.",
      "nn.Linear(2, 3): A processing layer that **takes input from 2 neurons and has 3 neurons**. It computes inner products.",
      "Counting layers: The **input layer gets no line**, because it does no processing. The **last line is always the output layer**. nn.Sigmoid lines are not layers.",
      "Matching: The first number on each line must equal the second number on the line before it.",
      "Training lines: **SGD** is stochastic gradient descent, **lr** is the learning rate, **loss** is the mistake, **backward** runs backpropagation and **step** updates the weights.",
      "Learning rate: **A higher learning rate learns faster but less accurately. A lower one learns more accurately but more slowly.**"
     ],
     "questions": [
      {
       "source": "Review 20",
       "q": "How many hidden layers does this network have: Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)?",
       "a": "It has three hidden layers, with three, two and four neurons. The network has five layers in all, the input layer, three hidden layers and the output layer, but only four Linear lines, because the input layer does no processing and the last line is the output layer."
      },
      {
       "source": "Review 21",
       "q": "Write the code for the network with an additional hidden layer of 3 neurons right before the output layer, and adjust the other layers.",
       "a": "Keep the first three lines, change the old last line from Linear(4, 5) to Linear(4, 3), and add a new last line, Linear(3, 5). The network becomes Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 3), Linear(3, 5), so every layer still takes in exactly as many numbers as the layer before it produces."
      },
      {
       "source": "Predicted",
       "q": "Add a hidden layer of 6 neurons right after the input instead. What changes?",
       "a": "The first line becomes Linear(2, 6), and a new second line, Linear(6, 3), feeds the old first hidden layer. The rest stays the same, giving Linear(2, 6), Linear(6, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)."
      },
      {
       "source": "Lab 9",
       "q": "A network is written Linear(4, 3), Linear(3, 5), Linear(5, 2), Linear(2, 4). How many hidden layers, inputs and outputs does it have?",
       "a": "It has three hidden layers, with 3, 5 and 2 neurons. It takes 4 numbers as input and has 4 output neurons, so it decides among 4 categories."
      },
      {
       "source": "Predicted",
       "q": "How many hidden layers does a network have if its code is Linear(2, 3), Sigmoid, Linear(3, 2), Sigmoid, Linear(2, 4), Sigmoid, Linear(4, 5)?",
       "a": "It still has three hidden layers. Sigmoid lines are not layers, because they only apply the sigmoid to the layer before them, so only the four Linear lines count, and the last one is the output layer."
      },
      {
       "source": "Predicted",
       "q": "What do the import lines do, and what does Sequential mean?",
       "a": "The import lines bring the torch library into Python, so the programs for inner products and backpropagation do not have to be written by hand. Sequential means the network is a sequence of layers, one after another, with each layer taking its input from the layer before it."
      },
      {
       "source": "Based on HW5 9",
       "q": "What happens if the learning rate is raised from 0.1 to 0.3?",
       "a": "The network learns faster, but its accuracy goes down. A larger learning rate takes bigger steps, so it approaches the answer quickly but keeps overshooting."
      },
      {
       "source": "Lab 9",
       "q": "Two learning curves differ only in learning rate. One rises fast and jumps around, and the other rises slowly and smoothly. Which used the larger learning rate?",
       "a": "The one that rises fast and jumps around used the larger learning rate. Bigger steps get near the answer quickly but overshoot, while smaller steps are slower but smoother."
      }
     ]
    },
    {
     "id": "sigmoid",
     "tier": "Likely",
     "lectures": "Lectures 15 and 16",
     "title": "The sigmoid and where the idea came from",
     "know": [
      "From the brain: **Lord Edgar Adrian** won the Nobel Prize in 1932 for showing that **neurons are nearly digital**, either firing or not firing.",
      "What it does: The **sigmoid** takes an inner product and returns a number between 0 and 1.",
      "Values: A large negative input gives about **0** (off), a large positive input gives about **1** (on), and an input of exactly 0 gives **0.5**.",
      "Perception: Very different things can be perceived as the same (a friend with or without a hat), and very similar things as different (USC and UCLA), just like the flat parts and the steep middle of the sigmoid.",
      "In code: nn.Sigmoid goes after each hidden layer. The last layer has no sigmoid, because its outputs go to the loss, which turns them into probabilities.",
      "Bigger idea: Many basic ideas in AI, including neurons, inner products and near-digital firing, come from discoveries about real brains."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Where does the idea of the sigmoid come from?",
       "a": "It comes from biology. Lord Edgar Adrian discovered that real neurons are nearly digital, firing or not firing, and won the Nobel Prize in 1932. The sigmoid copies this by squashing any inner product into a number between 0 and 1, so a neuron is nearly off or nearly on."
      },
      {
       "source": "Lab 9",
       "q": "A hidden neuron's inner product is minus 2. Is its sigmoid activation closer to 0 or 1, and what does that mean?",
       "a": "It is closer to 0, because the input is negative. The neuron is mostly off and fires only rarely."
      },
      {
       "source": "Lab 9",
       "q": "If one input to that neuron goes up through a positive weight, what happens to its linear activation and its sigmoid activation?",
       "a": "Both go up. The larger input times a positive weight raises the inner product, and the sigmoid always rises when its input rises, so the neuron fires more often."
      },
      {
       "source": "Lab 9",
       "q": "What is the sigmoid activation if the linear activation is exactly 0?",
       "a": "It is 0.5, halfway between off and on, so the neuron is half active."
      },
      {
       "source": "Predicted",
       "q": "How does the sigmoid match human perception?",
       "a": "Some very different things are perceived as the same, and some very similar things are perceived as different. The flat parts of the sigmoid give the same output for very different inputs, such as minus 100 and minus 1000, while the steep middle gives very different outputs for two nearly equal inputs on either side of zero."
      }
     ]
    },
    {
     "id": "training",
     "tier": "Likely",
     "lectures": "Lecture 16",
     "title": "Training results: chance, overlap and repeated runs",
     "know": [
      "Chance: Accuracy starts at **20 percent**, because with random weights the network knows nothing, and a random guess among **five** vowels is right one time in five.",
      "Other counts: With ten categories, chance would be 10 percent.",
      "Epoch: Each pass of learning is an **epoch**, and a problem like this takes thousands of them.",
      "Leveling off: The network jumps to about 40 percent and levels off near **45 percent**, because the real vowel data **overlap** so much.",
      "Overlap: Peterson and Barney found this overlap in the early 1950s. Even a person would have to guess for a point in the middle of the overlap.",
      "Repeated runs: Ten runs from different random starting weights take **different paths but end at the same accuracy**, like children who hear different input but learn the same language.",
      "Memorizing: Children first say went correctly by memory, then say goed after learning the pattern, then learn the exception (Carol Chomsky)."
     ],
     "questions": [
      {
       "source": "Based on HW5 10",
       "q": "Why does accuracy start at 20 percent?",
       "a": "There are five categories, and with random weights the network knows nothing, so its guesses are no better than chance. Guessing at random among five vowels is right one time in five, which is 20 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does accuracy start at 10 percent for a network with ten output categories?",
       "a": "With random weights the network's guesses are no better than chance, and a random guess among ten categories is right one time in ten, which is 10 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does the vowel network level off near 40 to 45 percent instead of 100 percent?",
       "a": "The real formant data for the five vowels overlap a great deal, so many recordings with nearly the same F1 and F2 belong to different vowels. For a point in the middle of the overlap, even a person would have to guess, so no network can classify those points reliably."
      },
      {
       "source": "Predicted",
       "q": "Ten training runs start from different random weights. What happens?",
       "a": "The runs take different paths, with some jumping up early and some staying at chance longer, but all of them end at about the same accuracy. Stochastic gradient descent involves chance along the way, but the end point is the same."
      }
     ]
    },
    {
     "id": "heads-layers",
     "tier": "Almost certain",
     "lectures": "Lecture 18",
     "title": "Heads and layers",
     "note": "On Nov 5 he said heads are a question on the exam, and the Lecture 18 slide says the same.",
     "know": [
      "Layer: A layer is one round of improvement. Layers go one after another, from the input to the output.",
      "Head: A head is one expert, and it is a set of weights. Heads sit side by side inside each layer.",
      "What a layer does: Each head gives its own opinion on how to improve the vectors, and the layer combines all of the heads' opinions into improved vectors. The next layer then does the same thing again.",
      "Classroom comparison: The classes you visit one after another are the layers, and the students in each class who each give you an opinion are the heads.",
      "Depth and width: Layers give an LLM depth, one round of improvement after another. Heads give it width, many experts asked at the same time in each round.",
      "Why so many: Predicting the next word is so hard that large systems have a hundred or more layers with about a hundred heads in each.",
      "How heads learn: If the predicted next word is wrong, every head in every layer adjusts its weights with backpropagation, so the next prediction is closer to the right word."
     ],
     "questions": [
      {
       "source": "Lecture 18",
       "q": "What are heads, and how do they relate to layers?",
       "a": "A head is one expert, a set of weights that gives its own opinion on how to improve the vectors. Heads sit side by side inside each layer, and the layer combines all of their opinions into improved vectors. Layers go one after another from the input to the output, so each layer improves the vectors again."
      },
      {
       "source": "Predicted",
       "q": "In the classroom comparison, what are the classes and what are the students?",
       "a": "The classes are the layers, because you visit them one after another. The students in each class are the heads, because each one gives you a separate opinion at the same time, and you combine those opinions before moving on to the next class."
      },
      {
       "source": "Predicted",
       "q": "Which gives an LLM depth and which gives it width, heads or layers?",
       "a": "Layers give it depth, because they are rounds of improvement that come one after another. Heads give it width, because many of them work side by side inside the same layer."
      },
      {
       "source": "Predicted",
       "q": "An LLM has 5 layers with 4 heads in each layer. How many heads does it have, and which of them work at the same time?",
       "a": "It has 20 heads, because each of the 5 layers has 4. The 4 heads inside one layer work side by side at the same time, and the layers come one after another, so layer 2 works on the vectors that layer 1 improved."
      },
      {
       "source": "Predicted",
       "q": "The LLM predicts bark instead of barks after \"the dog that my parents ... \". Which weights change?",
       "a": "The weights of every head in every layer change. Backpropagation assigns each weight its share of the blame for the wrong prediction, and each one is adjusted a little so that the next prediction is closer to barks."
      },
      {
       "source": "Predicted",
       "q": "Where is the knowledge of an LLM stored?",
       "a": "It is stored in its weights. Each head is a set of weights, so the knowledge is spread across all the heads in all the layers, the same way the vowel network's knowledge is in its weights."
      }
     ]
    },
    {
     "id": "llm-sequences",
     "tier": "Likely",
     "lectures": "Lectures 17 and 18",
     "title": "From the vowel network to an LLM: many vectors in, the next item out",
     "note": "Lab 9 Part 4 asks this comparison directly.",
     "know": [
      "Levels: A neuron takes in a vector and gives back one number, the inner product. A neural network takes in one vector and gives back a vector of decisions. An LLM takes in many vectors and predicts what comes next. An agentic system is a group of LLMs.",
      "Static versus sequence: The vowel network takes one static vector, F1 and F2, from one moment. Speech and language change over time, so one fixed list of numbers cannot model them.",
      "The prediction game: An LLM is given 15 vectors and predicts the sixteenth. The sixteenth is a probability distribution over what could come next, such as each of about 30,000 English words.",
      "Vectors can be anything: The vectors can be words, frames of a spectrogram, patches of an image or the amino acids of a protein. The LLM only ever sees lists of numbers, so the same design works for all of them.",
      "Long-distance connections: In \"the dog that my parents, who I love very much, ... \", the next word is barks, because it goes with the singular dog no matter how many words come in between. An LLM learns this from data, not from a taught rule.",
      "How an LLM learns: It predicts the next word, such as mat after \"the cat sat on the\". When the prediction is wrong, backpropagation adjusts the weights, and this is repeated with a huge number of sentences.",
      "Underneath everything: Inference is inner products, and learning is stochastic gradient descent plus dynamic programming.",
      "Hallucination: An LLM predicts from past data, so something its data does not cover can make it make things up."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "What is the difference between the input and output of the vowel network and those of an LLM?",
       "a": "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."
      },
      {
       "source": "Predicted",
       "q": "What does a single neuron take in and give back? What about a neural network, and an LLM?",
       "a": "A neuron takes in a vector and gives back one number, the inner product of the inputs and their weights. A neural network takes in one vector and gives back a vector of decisions. An LLM takes in many vectors, one for each moment of a sequence, and gives back a prediction of what comes next."
      },
      {
       "source": "Predicted",
       "q": "Why can't the vowel network model a sentence?",
       "a": "It takes one static vector from one moment and makes one decision. A sentence is many words, one after another, and the right next word depends on the words before it, so it needs a system that takes a whole sequence of vectors."
      },
      {
       "source": "Predicted",
       "q": "An LLM is given 15 vectors and predicts the sixteenth. Name three things the vectors can stand for.",
       "a": "They can be the words of a sentence, the frames of a spectrogram or the patches of an image, and they can also be the amino acids of a protein. The LLM only sees lists of numbers, so the same prediction game works for all of them."
      },
      {
       "source": "Predicted",
       "q": "What does the sixteenth vector look like, and does it add up to anything?",
       "a": "It is a probability distribution over what could come next, with one number for each possible next item, such as each English word. Because it is a probability distribution, its numbers add up to one."
      },
      {
       "source": "Predicted",
       "q": "Why is the next word barks and not bark in \"the dog that my parents, who I love very much, ... \"?",
       "a": "Barks goes with the singular word dog, no matter how many words come in between, even the plural word parents. To predict it, an LLM has to use a word far back in the sequence, which it learns from data by doing inner products layer after layer."
      },
      {
       "source": "Predicted",
       "q": "Why can an LLM hallucinate?",
       "a": "It predicts from past data. When it meets something its data does not cover, its prediction can turn into a guess, so it can make things up."
      }
     ]
    },
    {
     "id": "gestalt-cloze",
     "tier": "Likely",
     "lectures": "Lecture 17",
     "title": "Gestalt completion and the cloze test",
     "note": "",
     "know": [
      "Gestalt completion: People see a triangle in the Gestalt figure even though no triangle is drawn, because a large part of human knowledge is completing what is missing.",
      "Closure: Closure is the Gestalt word for completing a familiar pattern that is not quite finished, such as seeing a broken circle as whole.",
      "Cloze test: Words are removed from a text and people fill them in. The name comes from closure, and it tests knowledge by asking someone to complete a sequence.",
      "LLM learning: An LLM predicting the next word is playing a cloze game again and again. Training a system only to predict the missing piece turns out to copy human thinking."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Describe the Gestalt principle of closure, and how an LLM uses it to learn.",
       "a": "Closure is completing a familiar pattern that is not quite finished, such as seeing a triangle where none is drawn or a broken circle as whole. An LLM learns the same way, by predicting the missing next piece of a sequence again and again and correcting its weights when it is wrong."
      },
      {
       "source": "Predicted",
       "q": "What is a cloze test, and why is an LLM's training like one?",
       "a": "In a cloze test, words are removed from a text and people fill them in, so knowledge is tested by completing a sequence. An LLM is trained by filling in the next word over and over, so for an LLM, completion is what knowledge is."
      },
      {
       "source": "Predicted",
       "q": "Why do people see a triangle in the Gestalt figure?",
       "a": "No triangle is drawn, but people complete the missing parts because the pattern is familiar. This completion is the Gestalt principle of closure."
      }
     ]
    },
    {
     "id": "recurrent-dynamical",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "Recurrent networks and the LLM as a dynamical system",
     "note": "",
     "know": [
      "Recurrent network: Michael Jordan's network sends its own output back into part of its input, so what it produces at one moment helps predict the next moment. He built it because speech production changes over time.",
      "Plan and state units: Plan units and state units feed the hidden layer, the hidden layer feeds the output, and the output is copied back into the state units. The same weights are used at every step.",
      "GPT one word at a time: GPT predicts the next word, adds it to the prompt, and feeds everything back in to predict the word after that.",
      "Dynamical system: A dynamical system is a rule that is fed its own output again and again. In the harmonic oscillator, position and velocity take turns updating, and step by step the rule draws a cosine.",
      "The LLM as a dynamical system: In the lecture's account, each layer is the rule and the depth of the layers plays the role of time. The input vectors are the initial conditions, and each layer turns them into better vectors until the last layer can predict the next word."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "What makes Jordan's network recurrent?",
       "a": "It sends its own output back into part of its input. Its output is copied into the state units, so what it produced at one moment helps it predict the next moment."
      },
      {
       "source": "Predicted",
       "q": "How is a recurrent network different from an nn.Sequential network?",
       "a": "In a Sequential network, the input passes through the layers once, from the input to the output, and makes one decision. A recurrent network loops its output back into its input, so it works through a sequence step by step."
      },
      {
       "source": "Predicted",
       "q": "Why is an LLM called a dynamical system?",
       "a": "A dynamical system is a rule fed its own output again and again, starting from initial conditions. In an LLM the input vectors are the initial conditions, and each layer applies its weights to turn them into better vectors, so the depth of the layers plays the role of time."
      },
      {
       "source": "Predicted",
       "q": "In the harmonic oscillator, which two numbers update, and in what order?",
       "a": "Position x and velocity v take turns. First the new x is calculated from the old v, then the new v is calculated from the new x, and step by step the rule draws a cosine for x."
      }
     ]
    },
    {
     "id": "agentic",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "Agentic systems and Software 3.0",
     "note": "Lab 9 Part 4 asks what an agentic system is and what its loop prevents.",
     "know": [
      "Agentic system: An agentic system is a group of LLMs connected so that one's output becomes the next one's input. An agent in AI today is just an LLM.",
      "The lecture example: An outline LLM plans the answer, a writing LLM writes it, a critic LLM checks it, a revision LLM works back and forth with the critic, and a final LLM produces the answer the user sees.",
      "The critic loop: The draft goes back and forth between the critic and the reviser until the critic is satisfied or a limit is reached. The loop greatly reduced hallucination.",
      "Shared memory and fixed weights: Once each LLM is trained its weights usually do not change, and the agents share a common memory where they write and read information.",
      "Software 1.0, 2.0 and 3.0: Software 1.0 is writing a program in a language such as Python. Software 2.0 is training a neural network on input and output data, so the program is its weights. Software 3.0 is having an agentic system build and run the program from plain English instructions, which is called vibe coding."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "What is an agentic system, in terms of LLMs? Describe the example from lecture.",
       "a": "It is a graph of LLMs, each with its own job, connected so that one's output becomes the next one's input. One LLM outlines, one writes, one critiques, one revises and one produces the final version, with a loop between the critic and the reviser until the critic is satisfied or the limit is reached."
      },
      {
       "source": "Lab 9",
       "q": "What does the critic loop do, and what does it prevent that was common in earlier LLMs?",
       "a": "It sends the draft back until the critic is satisfied, so errors are caught and fixed instead of being presented. It prevents hallucination, which was a common problem for earlier LLMs."
      },
      {
       "source": "Predicted",
       "q": "What would happen if the critic LLM were removed?",
       "a": "The draft would go straight from writing to the final answer without being checked. More made-up statements would reach the user, because the critic loop is what greatly reduced hallucination."
      },
      {
       "source": "Predicted",
       "q": "What is the difference between Software 2.0 and Software 3.0?",
       "a": "In Software 2.0, a neural network is trained on input and output data, so the program is its weights. In Software 3.0, an agentic system builds and runs the program from plain English instructions, as in vibe coding."
      }
     ]
    },
    {
     "id": "phonotactics",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "Phonotactics and guessing the next letter",
     "note": "Lab 9 Part 4 asks these directly.",
     "know": [
      "Phonotactics: The rules for which sounds can follow which are **phonotactics**. Every speaker knows them without being taught.",
      "Simple syllable: A simple English syllable is a consonant, a vowel and a consonant, as in Don or cup. The pattern is about sounds, not letters, so the silent e of shave does not count.",
      "Onset and coda: A cluster before the vowel is an onset, as in split, and a cluster after the vowel is a coda, as in lamp. The order is a mirror image around the vowel, so flat is a word and lfat is impossible.",
      "Syllable breaks: Atlantic is a word because t and l are on opposite sides of a syllable break, but tlantic is impossible because tl cannot start an English syllable. The sound ng can end a syllable but never start one.",
      "Other languages: Mandarin allows only nasal sounds at the end of a syllable, Russian and Polish allow clusters like zb or dl at the start of a word, and Spanish speakers add an e before st, as in estadio.",
      "Next-letter guessing: After a vowel, almost any letter can come next, so the probability distribution is flat. At the start of a word, the choices narrow to what an English onset allows, so after skr the distribution is sharply peaked on a few vowels.",
      "The GPT link: Guessing the next letter is predicting the sixteenth item, so a GPT trained only on this game learns English syllable structure."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp? For each one that could not, name the problem.",
       "a": "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."
      },
      {
       "source": "Lab 9",
       "q": "Each of these starts an English word: pl_, st_ and th_. What could come next, and what could not?",
       "a": "After pl only a vowel can come, as in play, so a consonant such as n cannot. After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n."
      },
      {
       "source": "Predicted",
       "q": "After which start is the next-letter distribution flatter, ra_ or skr_? Why?",
       "a": "It is flatter after ra, because after a vowel almost any letter can come next, so the probability is spread over many letters. After skr only a vowel can come, so the probability piles onto a few vowels and the distribution is sharply peaked."
      },
      {
       "source": "Predicted",
       "q": "Why is Atlantic an English word but tlantic impossible?",
       "a": "In Atlantic, the t and the l are on opposite sides of a syllable break, so each syllable follows the rules. In tlantic, tl would have to start a syllable, and English does not allow tl at the start of a syllable."
      },
      {
       "source": "Predicted",
       "q": "Could ngop be an English word? Could flim?",
       "a": "Ngop could not, because the sound ng can end a syllable, as in ring, but can never start one. Flim could, because fl is an allowed onset, as in flat, and im is an allowed ending."
      },
      {
       "source": "Predicted",
       "q": "Why does a GPT trained only to guess the next letter end up knowing English syllable structure?",
       "a": "Its predictions can only improve by matching the patterns of English syllables, because those patterns decide which letters can come next. So the knowledge ends up in the shape of its probability distributions, flat after a vowel and peaked after a start like skr."
      }
     ]
    }
   ],
   "flags": [
    "HW5 questions are labeled Based on HW5, because only the HW5 answer key was available. The answers come from the key, and the question wording is reconstructed from them.",
    "Lab 7 says the vowel in year decreases F1 and F2. The correct pattern is F1 down and F2 up, which Lab 7's own table, Lab 9 and the lectures all give.",
    "Lab 7 labels the third fixed-free mode the 2nd formant. It is the 3rd formant.",
    "The studio's earlier answer to review question 4 said Mode 3 drops more than Mode 1 because the middle mass moves more in Mode 3. Lab 6 shows the middle mass moves the most in Mode 1, so that reason was wrong. The answer here gives only what is certain: Mode 1 and Mode 3 go down, and Mode 2 stays the same."
   ]
  },
  "exam2-v3": {
   "label": "Exam 2 · Study this first (v3, Lectures 11–18, his questions first)",
   "range": "Lectures 11 to 18",
   "howToAnswer": [
    "Answer first, then the reason: Name the direction or the count in the first sentence, then explain why in one to three more sentences.",
    "Say what the spot is doing: For any mass, stiffness or constriction question, first say whether that location is moving or stretching in that mode.",
    "Use the course terms: Mode, harmonic, formant, fixed-fixed, fixed-free, constriction, inner product, weight, activation and loss should appear where they belong.",
    "Describe questions need steps: For \"describe a spectrogram\" or \"why does backpropagation start at the end\", walk through the process in full sentences.",
    "No arithmetic beyond simple multiples: He does not ask you to multiply decimals, give years, use the word seed, or write PyTorch from scratch."
   ],
   "scope": {
    "covers": "Lectures 11 to 18 are all fair game here. Everything leading up to large language models is described in full, and the LLM part is kept.",
    "final": "",
    "evidence": "Emphasis goes to what he asked: the 21 review questions, HW5 and his cues in class, including heads (Nov 5: heads are a question on the exam). On Nov 10 he said the review and homework questions go \"up to right before we got to LLMs\" and that the LLM part is kept for the final, so the LLM topics are marked Possible. On Exam 1, about 15 of the 25 questions came almost word for word from the review sheet. Questions marked Predicted change one thing in a real question and are predictions, not confirmed exam questions."
   },
   "topics": [
    {
     "id": "modes",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12 and 13",
     "title": "Masses, springs and modes",
     "know": [
      "Why it vibrates: The spring tends to return to **equilibrium**, and a moving mass tends to **keep moving**, so the mass overshoots and the cycle repeats.",
      "Mass and stiffness: **More mass lowers the frequency, and more stiffness raises the frequency.**",
      "Directions: **Longitudinal** motion (back and forth along the spring) and **transverse** motion (up and down) behave the same way.",
      "Mode: A **mode** is one way a system can vibrate. **N masses give N modes.**",
      "Higher modes: The more the masses move **against each other**, the more the springs stretch and compress, so the mode has more stiffness and a **higher frequency**.",
      "Local rule: **A mass changes the frequency only where it moves, and a spring changes the frequency only where it stretches.**",
      "Infinitely many: An infinite number of masses and springs along a line is a **string**. Spread over a surface, it is a **membrane**, such as a drum or the vocal folds."
     ],
     "questions": [
      {
       "source": "Review 1",
       "q": "Why do multiple mass systems have multiple frequencies?",
       "a": "A system with several masses can vibrate in several ways, called modes, because the masses can move together or against each other. When the masses move against each other, the springs between them stretch and compress more, so more stiffness is working and that mode vibrates faster. Each mode therefore has its own frequency, and a system with N masses has N modes and N frequencies."
      },
      {
       "source": "Review 2",
       "q": "How many modes does a 3-mass system have?",
       "a": "A 3-mass system has three modes, because a system with N masses has N modes of vibration."
      },
      {
       "source": "Lab 9",
       "q": "Four masses are joined by springs between two walls. How many modes does the system have, and what are the masses doing in the lowest and highest modes?",
       "a": "The system has four modes, one for each mass. In the lowest mode, Mode 1, all four masses move in the same direction at the same time. In the highest mode, Mode 4, every mass moves opposite to its neighbors, so every spring is stretched and compressed and the frequency is highest."
      },
      {
       "source": "Review 3",
       "q": "Which mode of the 3-mass system has the highest frequency? Why?",
       "a": "Mode 3 has the highest frequency. In Mode 3 the middle mass moves opposite to the two outer masses, so every spring is stretched and compressed as much as possible. That puts the most stiffness to work, and more stiffness makes the system vibrate faster."
      },
      {
       "source": "Predicted",
       "q": "Which mode of a 2-mass system has the lowest frequency, and why?",
       "a": "Mode 1 has the lowest frequency. In Mode 1 the two masses move together, so the middle spring is carried along without stretching. Only the two outer springs are working, so Mode 1 has less stiffness than Mode 2 and vibrates more slowly."
      },
      {
       "source": "Review 4",
       "q": "If you increase mass 2, what happens to the frequencies of each of the modes?",
       "a": "Mode 1 and Mode 3 go down, and Mode 2 stays the same. The middle mass moves in Mode 1 and in Mode 3, so making it heavier slows those modes. In Mode 2 the middle mass does not move, and a mass that does not move has no effect on the frequency."
      },
      {
       "source": "Predicted",
       "q": "In the 3-mass system, what happens to each mode if you make mass 1 (an outer mass) heavier?",
       "a": "All three modes go down. The outer mass moves in Mode 1, Mode 2 and Mode 3, and a heavier mass that is moving lowers the frequency. No mode leaves an outer mass still, so none of the three frequencies stays the same."
      },
      {
       "source": "Predicted",
       "q": "In a 2-mass system, what happens to each mode if you make the middle spring stiffer?",
       "a": "Mode 1 stays the same and Mode 2 goes up. In Mode 1 the masses move together, so the middle spring is never stretched and its extra stiffness does nothing. In Mode 2 the masses move against each other, so the middle spring is stretched and compressed and the extra stiffness raises the frequency."
      },
      {
       "source": "Review 5",
       "q": "What do you get when you have an infinite number of masses and springs?",
       "a": "You get a string, like a guitar or piano string. Every small piece of a string has mass, and every small piece stretches like a spring, so a string vibrates in modes like a chain of masses, only with infinitely many of them. Spread over a surface instead of a line, the same idea gives a membrane such as a drum or the vocal folds."
      },
      {
       "source": "Predicted",
       "q": "What happens to the frequency of a single mass on a spring if you make the spring stiffer? If you make the mass heavier?",
       "a": "A stiffer spring raises the frequency, because it pulls the mass back toward equilibrium with more force and turns it around sooner. A heavier mass lowers the frequency, because a heavier mass is harder to start and stop, so each back-and-forth cycle takes longer."
      }
     ]
    },
    {
     "id": "springiness",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "Where the springiness is, and what a local change does",
     "know": [
      "Alternation: **Where a vibrating system moves the most, it stretches the least, and where it does not move, it stretches the most.**",
      "Shortcut: The springiest locations are the points of **no movement**, which are the fixed ends and the points where the mode crosses its resting line.",
      "Ends: A **fixed end is always springy**, and a **free end is always moving**, in every mode.",
      "Added mass: Extra mass lowers a mode's frequency **only where that mode is moving**.",
      "Added stiffness: Extra stiffness raises a mode's frequency **only where that mode is stretching**.",
      "Both at once: Adding mass and stiffness together does **not** cancel out, except for a single mass on a single spring, because at one spot in one mode only one of the two matters.",
      "Perturbation theory: It predicts how a small change in one location affects vibration. In the late nineteenth century, wax placed where a drum vibrated a lot lowered its pitch, and wax placed where it did not vibrate had no effect."
     ],
     "questions": [
      {
       "source": "Review 6",
       "q": "This is Mode 5 of a string fixed at both ends. Circle the areas where there is the most springiness.",
       "a": "Circle the two fixed ends and the four points where the string crosses its middle line, six places in all. At those points the string does not move, but the pieces on either side move in opposite directions, so the string there is stretched and compressed the most. The tops of the five bumps have the most motion and the least springiness."
      },
      {
       "source": "Predicted",
       "q": "This is Mode 3 of a string fixed at both ends. Where is the most springiness, and where is the most motion?",
       "a": "The most springiness is at the two fixed ends and at the two points where the string crosses its middle line, four places in all, because the string does not move there. The most motion is at the tops of the three bumps, where the string swings the most and is hardly stretched."
      },
      {
       "source": "Review 11",
       "q": "This picture shows Mode 4 of a building. Circle the areas where there is the most springiness.",
       "a": "Circle the fixed base and the three points where the building crosses its resting position, four places in all. Those points do not move, but the parts above and below them move in opposite directions, so the structure there stretches and compresses the most. The free top moves the most and is the least springy, so it is not circled."
      },
      {
       "source": "Predicted",
       "q": "This diagram shows Mode 2 of a building. Where is the most springiness?",
       "a": "The most springiness is at the fixed base and at the one point above it where the building crosses its resting position. Those two points do not move, so the structure there is stretched and compressed the most. The free top moves the most and is the least springy."
      },
      {
       "source": "Review 14",
       "q": "If we increase the stiffness and mass of the string at the boxed location (where Mode 3 crosses its middle line and Mode 4 is at the top of a bump), what happens to Mode 3 and Mode 4's frequencies, and why?",
       "a": "Mode 3 goes up and Mode 4 goes down. In Mode 3 the boxed spot does not move but is stretched the most, so the added mass does nothing and the added stiffness raises the frequency. In Mode 4 the boxed spot moves the most and is not stretched, so the added mass lowers the frequency and the added stiffness does nothing."
      },
      {
       "source": "Predicted",
       "q": "The box is moved to a spot where Mode 3 is at the top of a bump and Mode 4 crosses its middle line. Mass and stiffness are added there. What happens?",
       "a": "Now Mode 3 goes down and Mode 4 goes up. In Mode 3 the spot moves the most and is hardly stretched, so the added mass lowers the frequency. In Mode 4 the spot does not move but is stretched the most, so the added stiffness raises the frequency."
      },
      {
       "source": "Review 15",
       "q": "If we increase the mass and stiffness of the building at its very top, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes down. The top of the building is the free end, so in every mode it moves the most and is hardly stretched. The added mass matters there and lowers the frequency, while the added stiffness does nothing because nothing is stretching at the top."
      },
      {
       "source": "Predicted",
       "q": "If we increase the mass and stiffness of the building at its very base, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes up. The base is the fixed end, so it never moves but is always stretched and compressed. The added mass does nothing there because the base does not move, while the added stiffness raises the frequency."
      },
      {
       "source": "Lab 9",
       "q": "In Mode 3 of a string fixed at both ends, point B does not move and point C is at the bottom of a bump. What happens to Mode 3 if you add a small weight at B? At C? If you stiffen the string at B?",
       "a": "A weight at B leaves Mode 3 the same, because B does not move in Mode 3. A weight at C lowers Mode 3's frequency, because C swings the most and the extra mass counts there. Stiffening the string at B raises Mode 3's frequency, because B is where the string stretches the most."
      },
      {
       "source": "Lab 9",
       "q": "The same spot B is moving in Mode 1. Does a weight at B change Mode 1's frequency?",
       "a": "Yes, the weight lowers Mode 1's frequency. In Mode 1 the whole string is one bump, so the spot at B is moving, and extra mass at a moving spot slows the vibration."
      }
     ]
    },
    {
     "id": "harmonics-formants",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12, 13 and 14",
     "title": "Harmonics and formants: fixed-fixed and fixed-free systems",
     "know": [
      "Fixed-fixed: A system fixed at both ends, such as a string or the **vocal folds**, has modes at **1, 2, 3, 4 times** the first. These are **harmonics**.",
      "Why whole numbers: The first mode is **half a wave**, and each higher mode must fit a whole number of those half-waves between the two fixed ends. Mode N contains N copies of Mode 1.",
      "Fixed-free: A system fixed at one end and free at the other, such as a **building** or the **air in the vocal tract**, has modes at **1, 3, 5, 7 times** the first. These are **formants**.",
      "Why odd numbers: The first mode is a **quarter-wave packet** from no motion to the most motion. The free end must always be moving, so packets are added two at a time, giving one, three, five and seven packets.",
      "Spacing: Fixed-fixed modes are spaced by the first frequency. Fixed-free modes are spaced by **twice** the first frequency.",
      "Building analogy: A building is fixed to the ground and free at the top, just as the air in the vocal tract is fixed at the closed vocal folds and free at the open lips.",
      "Spectrum: A **spectrum** has frequency on the horizontal axis and amplitude on the vertical axis, with one spike for each mode that is present.",
      "Scientific method: The theory that the vocal folds are a membrane predicts **equidistant harmonics** (evenly spaced harmonics). Recordings in Praat confirmed the prediction."
     ],
     "questions": [
      {
       "source": "Review 7",
       "q": "A string is fixed on both sides. If Mode 1 has frequency 200 Hz, what frequency does Mode 5 have?",
       "a": "Mode 5 has a frequency of 1000 Hz. In a string fixed at both ends, each mode is a whole-number multiple of the first, and Mode 5 contains five copies of Mode 1, so it is five times 200 Hz."
      },
      {
       "source": "Lab 9",
       "q": "A string fixed at both ends has Mode 1 at 150 Hz. What are Modes 2 and 3? If one end is freed and Mode 1 stays at 150 Hz, what are Modes 2 and 3 now?",
       "a": "Fixed at both ends, Modes 2 and 3 are 300 and 450 Hz, which are two and three times 150. Fixed at one end and free at the other, Modes 2 and 3 are 450 and 750 Hz, which are three and five times 150, because only the odd multiples occur. The fixed-fixed modes are 150 Hz apart, and the fixed-free modes are 300 Hz apart."
      },
      {
       "source": "Review 8",
       "q": "Why are the frequencies of fixed-fixed vibratory systems spaced the way they are?",
       "a": "In a system fixed at both ends, the first mode is half a wave, going from no motion at one end to the most motion in the middle and back to no motion. Every higher mode must fit a whole number of those half-waves into the same length, because both ends must stay still. Mode 2 fits two, so it vibrates twice as fast, and Mode 3 fits three, so the frequencies are evenly spaced whole-number multiples of the first."
      },
      {
       "source": "Review 16",
       "q": "Why are the formants of a fixed-free system 1, 3, 5, etc. multiples of the base frequency?",
       "a": "In a fixed-free system the basic piece is a quarter-wave packet, which runs from no motion at the fixed end to the most motion at the free end. Every mode must start still at the fixed end and end with the most motion at the free end. One extra packet would leave a still point at the free end, which cannot happen, so packets are added two at a time, giving one, three, five and seven packets and odd-multiple frequencies."
      },
      {
       "source": "Predicted",
       "q": "If F1 is 500 Hz, what are F2 and F3?",
       "a": "F2 is 1500 Hz and F3 is 2500 Hz. The air in the vocal tract is a fixed-free system, so its formants are odd multiples of the first, which are three times and five times 500 Hz, not two and three times."
      },
      {
       "source": "Review 17",
       "q": "What aspect of speech has the properties in the fixed-free question?",
       "a": "The formants of the air in the vocal tract have these properties. The air is fixed at the closed vocal folds and free at the open lips, so its frequencies of vibration, the formants, are odd multiples of the first formant."
      },
      {
       "source": "Predicted",
       "q": "What aspect of speech has frequencies at whole-number multiples, and why?",
       "a": "The harmonics of the vocal folds have whole-number multiples. The vocal folds are a membrane held in place along their edges, so they behave like a system fixed at both ends, and each mode is a whole number of copies of the first."
      },
      {
       "source": "Review 12 and 13",
       "q": "What in speech is a building analogous to, and why does the analogy hold?",
       "a": "A building is analogous to the air in the vocal tract. Both are fixed at one end and free at the other: the building is fixed to the ground and free at the top, and the air is fixed at the closed vocal folds and free at the open lips. Because the ends match, both have springiness at the fixed end, the most motion at the free end, and frequencies at odd multiples of the first."
      },
      {
       "source": "Predicted",
       "q": "How is a building different from the air in the vocal tract?",
       "a": "Engineers design a building to sway only in Mode 1, because higher modes would move floors in opposite directions and could break the structure. The air in the vocal tract vibrates in all of its modes at once, and speaking changes the mass and stiffness of the air at different locations to move those formants."
      },
      {
       "source": "Review 9",
       "q": "Draw the spectrum for a string fixed at both ends with Mode 1 at 200 Hz, up to Mode 6.",
       "a": "Draw frequency along the horizontal axis and amplitude up the vertical axis. Put six evenly spaced spikes at 200, 400, 600, 800, 1000 and 1200 Hz, one for each mode. If the modes are equally strong, the spikes can be drawn the same height."
      },
      {
       "source": "Predicted",
       "q": "Draw the spectrum for a fixed-free system with Mode 1 at 200 Hz, up to Mode 4.",
       "a": "Draw spikes only at the odd multiples: 200, 600, 1000 and 1400 Hz. A fixed-free system has no even multiples, because an even number of quarter-wave packets would leave a still point at the free end."
      },
      {
       "source": "Review 10",
       "q": "If the vocal folds have their base frequency, F0, at 150 Hz, draw the spectrum for the first 5 harmonics.",
       "a": "Draw spikes at 150, 300, 450, 600 and 750 Hz, with frequency along the bottom and amplitude going up. The vocal folds are a membrane fixed along its edges, so their harmonics are whole-number multiples of F0 and the spikes are evenly spaced 150 Hz apart."
      }
     ]
    },
    {
     "id": "constrictions",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "The vocal tract, constrictions and the vowels /i/, /a/ and /u/",
     "know": [
      "Fixed-free tube: The air in the vocal tract is **fixed at the glottis** (closed vocal folds, so the air can only be compressed) and **free at the lips** (the air moves in and out).",
      "Schwa: With no constriction, as in **done**, the formants are about **500, 1500 and 2500 Hz**.",
      "Constriction: A **constriction** (narrowing) packs the air into a smaller space, which makes it both **heavier** (denser) and **stiffer**.",
      "Four steps: Find the location, decide whether the air there is mostly **moving** or mostly **compressed** in that mode, pick the extra that counts (mass if moving, stiffness if compressed), then say whether the formant goes **down** or **up**.",
      "/u/ (dune): The constriction is at the lips, where the air is moving in both modes, so **F1 and F2 both go down**.",
      "/i/ (dean): The constriction is two-thirds of the way from the glottis. The air there moves in Mode 1 and is compressed in Mode 2, so **F1 goes down and F2 goes up** (the formants move apart).",
      "/a/ (Don): The constriction is one-third of the way from the glottis. The air there is compressed in Mode 1 and moves in Mode 2, so **F1 goes up and F2 goes down** (the formants move together).",
      "Reasoning backward: A large rise means the air there was springy and hardly moving. A large fall means the air there was moving a lot."
     ],
     "questions": [
      {
       "source": "Review 19",
       "q": "If I constrict the vocal tract somewhere and I raise the formant a great deal, what must be true of air motion versus springiness at this location?",
       "a": "At that location the air must be very springy and hardly moving in that mode. A constriction adds both mass and stiffness, and the formant went up, so the added stiffness is what counted. Stiffness only counts where the air is compressed and expanded, and the added mass did nothing because the air there was not moving."
      },
      {
       "source": "Predicted",
       "q": "If I constrict the vocal tract somewhere and I lower the formant a great deal, what must be true at this location?",
       "a": "At that location the air must be moving a lot and hardly compressed in that mode. The formant went down, so the added mass is what counted, and mass only counts where the air is moving. This is what happens at the lips for /u/."
      },
      {
       "source": "Lab 9",
       "q": "A classmate says more mass lowers the frequency and more stiffness raises it, so a constriction always cancels out. What is wrong with this argument?",
       "a": "In any one mode, at most locations only one of the two changes matters. If the air at the constriction is mostly moving, it is not being compressed, so only the extra mass counts and the formant goes down. If the air there is mostly compressed, it is not moving, so only the extra stiffness counts and the formant goes up, which is why the same constriction can push F1 and F2 in opposite directions."
      },
      {
       "source": "Lab 9",
       "q": "Why is the air in the vocal tract a fixed-free system? Say which end is which.",
       "a": "The glottis end is closed off by the vocal folds, so the air there cannot move and can only be compressed and expanded, which makes it the fixed end. The lip end is open, so the air there moves freely in and out without being compressed against anything, which makes it the free end."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dune, and why?",
       "a": "Both F1 and F2 go down. Lip rounding creates a constriction at the free end, where the air moves the most in every mode. The added mass therefore counts in both Mode 1 and Mode 2, and extra mass at a moving location lowers the frequency."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dean, and why?",
       "a": "F1 goes down and F2 goes up. The constriction is about two-thirds of the way from the glottis. In Mode 1 the air there is moving, so the added mass lowers F1, and in Mode 2 the air there is compressed, so the added stiffness raises F2."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in Don, and why?",
       "a": "F1 goes up and F2 goes down. The constriction is about one-third of the way from the glottis. In Mode 1 the air there is compressed, so the added stiffness raises F1, and in Mode 2 the air there is moving, so the added mass lowers F2."
      },
      {
       "source": "Lab 9",
       "q": "A new constriction is placed deep in the throat, one-fifth of the way from the glottis, where the air is compressed in both Mode 1 and Mode 2. What happens to F1 and F2?",
       "a": "Both F1 and F2 go up. The location is near the fixed end, where the air is compressed in both modes, so the added stiffness is what counts in both, and extra stiffness raises the frequency."
      },
      {
       "source": "Predicted",
       "q": "Why does rounding the lips lower every formant?",
       "a": "The lips are the free end of the vocal tract, and the free end is a location of maximum motion in every mode. A constriction there adds mass where the air is moving, so it lowers every formant. This is the same reason that adding mass at the top of a building lowers every mode."
      }
     ]
    },
    {
     "id": "source-filter",
     "tier": "Likely",
     "lectures": "Lectures 13 and 14",
     "title": "Source and filter, and F0",
     "know": [
      "Source: The **vocal folds** are the source. They produce **harmonics** at whole-number multiples of **F0**, the base frequency.",
      "Filter: The **air in the vocal tract** is the filter. Its **formants** decide which harmonics are loud.",
      "Core rule: **A formant makes the harmonics closest to it louder, and harmonics far from any formant come out weaker.** The outline of the harmonic heights is the **envelope**.",
      "Vowels: The harmonics stay the same from vowel to vowel. Only their heights change, and the envelope is what makes each vowel distinct.",
      "F0: Heavy, loose vocal folds give a low F0. Tight, light vocal folds give a high F0, so the harmonics are spaced farther apart.",
      "High voices: With a high F0, few harmonics fall near each formant, so the formants are hard to see. This is why a toddler's or a soprano's vowels are hard to identify.",
      "F0 carries meaning: F0 falls at the end of a statement and rises at the end of a question, and it signals sarcasm or pretending."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "What does the source supply and what does the filter do in speech?",
       "a": "The vocal folds are the source, and they supply the harmonics, which are whole-number multiples of F0. The air in the vocal tract is the filter, and its formants make the harmonics near them louder and the ones far from them weaker. So the source decides which frequencies are present, and the filter decides which of them are loud."
      },
      {
       "source": "Predicted",
       "q": "Two vowels are said at the same pitch. What is the same and what is different in their spectra?",
       "a": "The harmonics are the same, because the vocal folds vibrate at the same F0 for both vowels. The heights of the harmonics are different, because each vowel has its constriction in a different place, which moves the formants and changes the envelope."
      },
      {
       "source": "Predicted",
       "q": "Why are a toddler's vowels hard to identify?",
       "a": "A toddler has a very high F0, so the harmonics are spaced far apart. Few harmonics fall near each formant, and a formant can fall between two harmonics, so the envelope is hard to see. The formants are still there, but there are too few harmonics to reveal them."
      },
      {
       "source": "Predicted",
       "q": "If the vocal folds become tighter, what happens to F0 and to the spacing of the harmonics?",
       "a": "F0 goes up, because tighter vocal folds are stiffer, and more stiffness raises the frequency. The harmonics are multiples of F0, so they are spaced farther apart."
      }
     ]
    },
    {
     "id": "spectrogram",
     "tier": "Almost certain",
     "lectures": "Lectures 13 and 14",
     "title": "Spectra, spectrograms and speech over time",
     "know": [
      "Spectrum: A **spectrum** shows one instant, with frequency on the horizontal axis and amplitude on the vertical axis.",
      "Spectrogram: A **spectrogram** lines up many spectra over time. Time is on the horizontal axis, frequency on the vertical axis, and **darkness** shows amplitude.",
      "Dark bands: The **dark bands are the formants**. F1 is the lowest band and F2 is the next one up.",
      "Transitions: From schwa to /i/, the bands move apart. From schwa to /u/, both drop. From schwa to /a/, they move together.",
      "Where were you a year ago?: The formants never stay still, because every sound moves the constriction. Speech is a continuous series of constrictions, not a list of separate vowels.",
      "ma and na: When the m of ma is joined to the a of na, listeners hear na. Listeners decide on the consonant during the vowel, after the consonant is over (Malécot, 1950s)."
     ],
     "questions": [
      {
       "source": "Review 18",
       "q": "Describe a spectrogram.",
       "a": "A spectrogram lines up many spectra side by side over time. Time runs along the horizontal axis and frequency runs up the vertical axis, and the darkness of each spot shows how much amplitude there is at that frequency and time. The formants appear as dark bands, so you can follow them as they rise and fall, for example F1 rising and F2 falling from /i/ to /a/."
      },
      {
       "source": "Predicted",
       "q": "How is a spectrum different from a spectrogram?",
       "a": "A spectrum shows one frozen instant, with frequency on the horizontal axis and amplitude on the vertical axis. A spectrogram shows how the spectrum changes over time, with time on the horizontal axis, frequency on the vertical axis and amplitude shown as darkness. Real speech is always changing, so a spectrogram shows the formants moving."
      },
      {
       "source": "Lab 9",
       "q": "A speaker starts on schwa and switches to another vowel. F1 goes down and F2 goes up. Which vowel? What if both go down?",
       "a": "When F1 goes down and F2 goes up, the bands move apart, so the vowel is /i/ as in dean. When both F1 and F2 go down, the vowel is /u/ as in dune, because lip rounding lowers every formant."
      },
      {
       "source": "Predicted",
       "q": "Describe the spectrogram of a speaker going from schwa to the vowel of Don.",
       "a": "F1 goes up and F2 goes down, so the two lowest dark bands move toward each other. The constriction one-third of the way from the glottis is compressed in Mode 1 and moving in Mode 2, so it raises F1 and lowers F2."
      },
      {
       "source": "Predicted",
       "q": "Why do listeners hear na when the m of ma is joined to the a of na?",
       "a": "The information about the consonant is carried mostly by the vowel that follows it. After n, one formant of the vowel drops, and after m, that formant stays flat, so the a from na still signals n. Listeners therefore decide which consonant they heard during the vowel, after the consonant is over."
      }
     ]
    },
    {
     "id": "network-forward",
     "tier": "Likely",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Neural networks: inner products, weights and decisions",
     "know": [
      "Task: The vowel network takes **F1 and F2** and decides among five words, **done, dune, dean, Don and Dan**.",
      "Knowledge: **The network's knowledge is stored in its weights**, which are positive or negative numbers.",
      "Inner product: Each neuron multiplies each incoming activation by its weight and adds the results. This **inner product** is the core calculation of all AI.",
      "Forward propagation: The inner products are carried layer by layer from the input to the output.",
      "Output: The output is a **probability distribution**, numbers between 0 and 1 that **add up to 1**. The largest one is the decision.",
      "Desired output: The right answer is a **one-hot** list, 1 for the correct word and 0 everywhere else, such as 0, 0, 1, 0, 0 for dean.",
      "Direction questions: A positive activation times a positive weight is positive, so raising either one pushes that output's probability **up**. A negative weight would push it down."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "If an activation of 1.57 feeds the done output through a weight of positive 0.1, what happens to the probability of done if the weight goes up? If the activation goes up?",
       "a": "The probability of done goes up in both cases. The contribution to the done output is the activation times the weight, and both are positive, so raising either one makes the product larger and pushes done up. No multiplication is needed, only the signs."
      },
      {
       "source": "Predicted",
       "q": "What happens to the probability of done if that same weight were negative and the activation went up?",
       "a": "The probability of done goes down. A positive activation times a negative weight is negative, so a larger activation makes the contribution more negative and pushes the done output down."
      },
      {
       "source": "Predicted",
       "q": "Is 0.2, 0.3, 0.1, 0.2, 0.3 a valid probability distribution?",
       "a": "No. The numbers add up to 1.1, and a probability distribution must add up to exactly 1."
      },
      {
       "source": "Based on HW5 5",
       "q": "The first of five categories is correct. Write the desired output.",
       "a": "The desired output is 1, 0, 0, 0, 0. It puts all of the probability on the correct category and zero on every other category."
      },
      {
       "source": "Lab 9",
       "q": "The desired output over done, dune, dean, Don, Dan is 0, 0, 0, 1, 0, and the network outputs 0.10, 0.15, 0.60, 0.10, 0.05. Which vowel was said, which did the network guess, and what is the loss?",
       "a": "Don was said, and the network guessed dean, because dean has the largest probability, 0.60. The loss is a number that measures how far the computed output is from the desired output, for example how much probability it put on dean where there should be a 0."
      },
      {
       "source": "Based on HW5 3",
       "q": "What does Linear mean in the network code?",
       "a": "Linear means the layer computes inner products. Each neuron multiplies each incoming number by its weight and adds the results, with no other step."
      }
     ]
    },
    {
     "id": "backprop",
     "tier": "Almost certain",
     "lectures": "Lectures 15 and 16",
     "title": "Backpropagation: why learning starts at the end",
     "know": [
      "Learning: Every network starts with **random weights** and learns by correcting its mistakes, one small step at a time.",
      "Order: **The last set of weights is updated first, and the first set of weights is updated last.**",
      "Why the end is easy: The last weights affect the output probabilities **directly**, so one inner product shows whether each should go up or down.",
      "Why the start is hard: A first-layer weight affects the first hidden layer, which affects the next layer and the next, so its effect on the decision passes through every layer and depends on all the later weights.",
      "Dynamic programming: Solve the easy problem first and reuse its answer for the bigger problem that contains it (Bellman and Viterbi).",
      "Formula: **Backpropagation is stochastic gradient descent plus dynamic programming.** SGD changes each weight a little, and dynamic programming sets the order.",
      "Credit: Backpropagation was worked out in the mid-1980s, and Geoffrey Hinton won the 2024 Nobel Prize in Physics for it."
     ],
     "questions": [
      {
       "source": "Based on HW5 6",
       "q": "In what order are the weights updated?",
       "a": "The last set of weights is updated first, and the first set of weights is updated last. Each layer's update reuses what was already worked out for the layers after it."
      },
      {
       "source": "Based on HW5 7",
       "q": "Why does backpropagation start at the end?",
       "a": "The last set of weights affects the output probabilities, which are the decision, directly, so it is easy to tell whether raising or lowering each one makes the loss go up or down. A weight from the input to the first hidden layer affects the first hidden layer, then the second, then the third, and only then the output, so working out how to change it is a very complex problem that contains the problem of changing the last weights. Following dynamic programming, the simplest problem is solved first, and its answer makes the harder problems easier until the most complex one is solved."
      },
      {
       "source": "Based on HW5 8",
       "q": "What two methods together train the network's weights?",
       "a": "Stochastic gradient descent and backpropagation. Backpropagation works backward from the error to find which way each weight should change, and stochastic gradient descent moves each weight a small step in that direction."
      },
      {
       "source": "Predicted",
       "q": "Backpropagation is made of what two parts?",
       "a": "Backpropagation is stochastic gradient descent plus dynamic programming. Stochastic gradient descent nudges each weight a small step in the direction that lowers the error, and dynamic programming sets the order, from the last weights back to the first."
      },
      {
       "source": "Lab 9",
       "q": "Which part of training is the SGD part, and which is the dynamic programming part? What are the small problem and the big problem?",
       "a": "The SGD part is the adjusting, where each weight takes a small step, sized by the learning rate, in the direction that lowers the error. The dynamic programming part is the order of assigning blame, last layer first, reusing each layer's blame for the layer before it. The small problem is the blame of the last layer's weights, and the big problem is the blame of the early weights."
      },
      {
       "source": "Predicted",
       "q": "The network said done but the answer was dean. Should a last weight that pushes done up go up or down? Why?",
       "a": "It should go down. The probability of done is too high, because the desired output for done is zero. Lowering a weight that pushes done up shrinks its contribution and pulls the probability of done toward zero."
      },
      {
       "source": "Predicted",
       "q": "If the network already makes the right decision on a recording, what does it learn from it?",
       "a": "It learns nothing from that recording, because there is no error to correct. This can be a problem, because a network can keep getting the right answers by memorizing its data without learning the pattern underneath."
      }
     ]
    },
    {
     "id": "pytorch",
     "tier": "Almost certain",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Reading the PyTorch code",
     "know": [
      "Import lines: They bring in the **torch library**, which already contains the programs for inner products and backpropagation, so none of it has to be written by hand.",
      "Sequential: The network is **a sequence of layers, one after another**.",
      "nn.Linear(2, 3): A processing layer that **takes input from 2 neurons and has 3 neurons**. It computes inner products.",
      "Counting layers: The **input layer gets no line**, because it does no processing. The **last line is always the output layer**. nn.Sigmoid lines are not layers.",
      "Matching: The first number on each line must equal the second number on the line before it.",
      "Training lines: **SGD** is stochastic gradient descent, **lr** is the learning rate, **loss** is the mistake, **backward** runs backpropagation and **step** updates the weights.",
      "Learning rate: **A higher learning rate learns faster but less accurately. A lower one learns more accurately but more slowly.**"
     ],
     "questions": [
      {
       "source": "Review 20",
       "q": "How many hidden layers does this network have: Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)?",
       "a": "It has three hidden layers, with three, two and four neurons. The network has five layers in all, the input layer, three hidden layers and the output layer, but only four Linear lines, because the input layer does no processing and the last line is the output layer."
      },
      {
       "source": "Review 21",
       "q": "Write the code for the network with an additional hidden layer of 3 neurons right before the output layer, and adjust the other layers.",
       "a": "Keep the first three lines, change the old last line from Linear(4, 5) to Linear(4, 3), and add a new last line, Linear(3, 5). The network becomes Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 3), Linear(3, 5), so every layer still takes in exactly as many numbers as the layer before it produces."
      },
      {
       "source": "Predicted",
       "q": "Add a hidden layer of 6 neurons right after the input instead. What changes?",
       "a": "The first line becomes Linear(2, 6), and a new second line, Linear(6, 3), feeds the old first hidden layer. The rest stays the same, giving Linear(2, 6), Linear(6, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)."
      },
      {
       "source": "Lab 9",
       "q": "A network is written Linear(4, 3), Linear(3, 5), Linear(5, 2), Linear(2, 4). How many hidden layers, inputs and outputs does it have?",
       "a": "It has three hidden layers, with 3, 5 and 2 neurons. It takes 4 numbers as input and has 4 output neurons, so it decides among 4 categories."
      },
      {
       "source": "Predicted",
       "q": "How many hidden layers does a network have if its code is Linear(2, 3), Sigmoid, Linear(3, 2), Sigmoid, Linear(2, 4), Sigmoid, Linear(4, 5)?",
       "a": "It still has three hidden layers. Sigmoid lines are not layers, because they only apply the sigmoid to the layer before them, so only the four Linear lines count, and the last one is the output layer."
      },
      {
       "source": "Predicted",
       "q": "What do the import lines do, and what does Sequential mean?",
       "a": "The import lines bring the torch library into Python, so the programs for inner products and backpropagation do not have to be written by hand. Sequential means the network is a sequence of layers, one after another, with each layer taking its input from the layer before it."
      },
      {
       "source": "Based on HW5 9",
       "q": "What happens if the learning rate is raised from 0.1 to 0.3?",
       "a": "The network learns faster, but its accuracy goes down. A larger learning rate takes bigger steps, so it approaches the answer quickly but keeps overshooting."
      },
      {
       "source": "Lab 9",
       "q": "Two learning curves differ only in learning rate. One rises fast and jumps around, and the other rises slowly and smoothly. Which used the larger learning rate?",
       "a": "The one that rises fast and jumps around used the larger learning rate. Bigger steps get near the answer quickly but overshoot, while smaller steps are slower but smoother."
      }
     ]
    },
    {
     "id": "sigmoid",
     "tier": "Likely",
     "lectures": "Lectures 15 and 16",
     "title": "The sigmoid and where the idea came from",
     "know": [
      "From the brain: **Lord Edgar Adrian** won the Nobel Prize in 1932 for showing that **neurons are nearly digital**, either firing or not firing.",
      "What it does: The **sigmoid** takes an inner product and returns a number between 0 and 1.",
      "Values: A large negative input gives about **0** (off), a large positive input gives about **1** (on), and an input of exactly 0 gives **0.5**.",
      "Perception: Very different things can be perceived as the same (a friend with or without a hat), and very similar things as different (USC and UCLA), just like the flat parts and the steep middle of the sigmoid.",
      "In code: nn.Sigmoid goes after each hidden layer. The last layer has no sigmoid, because its outputs go to the loss, which turns them into probabilities.",
      "Bigger idea: Many basic ideas in AI, including neurons, inner products and near-digital firing, come from discoveries about real brains."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Where does the idea of the sigmoid come from?",
       "a": "It comes from biology. Lord Edgar Adrian discovered that real neurons are nearly digital, firing or not firing, and won the Nobel Prize in 1932. The sigmoid copies this by squashing any inner product into a number between 0 and 1, so a neuron is nearly off or nearly on."
      },
      {
       "source": "Lab 9",
       "q": "A hidden neuron's inner product is minus 2. Is its sigmoid activation closer to 0 or 1, and what does that mean?",
       "a": "It is closer to 0, because the input is negative. The neuron is mostly off and fires only rarely."
      },
      {
       "source": "Lab 9",
       "q": "If one input to that neuron goes up through a positive weight, what happens to its linear activation and its sigmoid activation?",
       "a": "Both go up. The larger input times a positive weight raises the inner product, and the sigmoid always rises when its input rises, so the neuron fires more often."
      },
      {
       "source": "Lab 9",
       "q": "What is the sigmoid activation if the linear activation is exactly 0?",
       "a": "It is 0.5, halfway between off and on, so the neuron is half active."
      },
      {
       "source": "Predicted",
       "q": "How does the sigmoid match human perception?",
       "a": "Some very different things are perceived as the same, and some very similar things are perceived as different. The flat parts of the sigmoid give the same output for very different inputs, such as minus 100 and minus 1000, while the steep middle gives very different outputs for two nearly equal inputs on either side of zero."
      }
     ]
    },
    {
     "id": "training",
     "tier": "Likely",
     "lectures": "Lecture 16",
     "title": "Training results: chance, overlap and repeated runs",
     "know": [
      "Chance: Accuracy starts at **20 percent**, because with random weights the network knows nothing, and a random guess among **five** vowels is right one time in five.",
      "Other counts: With ten categories, chance would be 10 percent.",
      "Epoch: Each pass of learning is an **epoch**, and a problem like this takes thousands of them.",
      "Leveling off: The network jumps to about 40 percent and levels off near **45 percent**, because the real vowel data **overlap** so much.",
      "Overlap: Peterson and Barney found this overlap in the early 1950s. Even a person would have to guess for a point in the middle of the overlap.",
      "Repeated runs: Ten runs from different random starting weights take **different paths but end at the same accuracy**, like children who hear different input but learn the same language.",
      "Memorizing: Children first say went correctly by memory, then say goed after learning the pattern, then learn the exception (Carol Chomsky)."
     ],
     "questions": [
      {
       "source": "Based on HW5 10",
       "q": "Why does accuracy start at 20 percent?",
       "a": "There are five categories, and with random weights the network knows nothing, so its guesses are no better than chance. Guessing at random among five vowels is right one time in five, which is 20 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does accuracy start at 10 percent for a network with ten output categories?",
       "a": "With random weights the network's guesses are no better than chance, and a random guess among ten categories is right one time in ten, which is 10 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does the vowel network level off near 40 to 45 percent instead of 100 percent?",
       "a": "The real formant data for the five vowels overlap a great deal, so many recordings with nearly the same F1 and F2 belong to different vowels. For a point in the middle of the overlap, even a person would have to guess, so no network can classify those points reliably."
      },
      {
       "source": "Predicted",
       "q": "Ten training runs start from different random weights. What happens?",
       "a": "The runs take different paths, with some jumping up early and some staying at chance longer, but all of them end at about the same accuracy. Stochastic gradient descent involves chance along the way, but the end point is the same."
      }
     ]
    },
    {
     "id": "lead-up",
     "tier": "Likely",
     "lectures": "Lecture 17 (start) and Lecture 18",
     "title": "Leading up to LLMs: from one neuron to networks that unfold over time",
     "note": "This is the part of Lecture 17 before LLMs, so it falls inside \"up to right before we got to LLMs.\" Lecture 18 opens by reviewing the same ideas.",
     "know": [
      "All-or-none: The first paper on artificial neural networks, by McCulloch and Pitts, started from the all-or-none behavior of real neurons. A neuron is either firing or not firing, which is the same idea as the **sigmoid**.",
      "From biology: The earliest neural network work tried to model how the mind works, including mental illness, so the field began in biology rather than in technology.",
      "Parallel Distributed Processing: **Parallel** means many neurons calculate their activations at the same time. **Distributed** means the information from the inputs is spread across all the neurons. By the time of these books, forward propagation and backpropagation were well worked out.",
      "Neuron: A neuron takes in a vector and gives back one number. It multiplies each input by its weight and adds the results, which is the **inner product**.",
      "Neural network: A neural network repeats the inner product layer after layer. It takes in one vector and gives back a vector of decisions.",
      "The limit: The vowel network takes one **static** vector, a fixed list of numbers from one moment, and makes one decision. Speech changes all the time and a sentence is many words one after another, so one fixed list of numbers cannot model thinking that unfolds over time.",
      "Recurrent network: Michael Jordan built the **recurrent** network to model speech production, because features such as nasality and lip rounding switch on and off at different moments. The network sends its own output back into part of its input, so what it produces at one moment helps predict the next.",
      "Plan and state units: Plan units and state units feed the hidden layer, the hidden layer feeds the output, and the output is copied back into the state units. The same weights are used at every step.",
      "The path to GPT: GPT works the same way, one word at a time. It predicts the next word, adds it to the prompt, and feeds everything back in to predict the word after that. Years like 1943, 1985 and 2017 give the history, but he said years are not asked."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "How does the all-or-none behavior of neurons connect to the sigmoid?",
       "a": "They are the same idea. A real neuron is either firing or not firing, and the sigmoid turns an inner product into a number near 0 (off) or near 1 (on), with a steep change in between."
      },
      {
       "source": "Predicted",
       "q": "What do parallel and distributed mean in Parallel Distributed Processing?",
       "a": "Parallel means many neurons calculate their activations at the same time. Distributed means the information from the inputs is spread across all the neurons rather than stored in one place."
      },
      {
       "source": "Predicted",
       "q": "What does a single neuron take in and give back? What about a neural network?",
       "a": "A neuron takes in a vector and gives back one number, the inner product of the inputs and their weights. A neural network repeats the inner product layer after layer, so it takes in one vector and gives back a vector of decisions."
      },
      {
       "source": "Predicted",
       "q": "Why can't the vowel network model a sentence or speech over time?",
       "a": "It takes one static vector, F1 and F2 from one moment, and makes one decision. Speech changes all the time and a sentence is many words one after another, so it needs a network that works through a sequence."
      },
      {
       "source": "Predicted",
       "q": "What makes Jordan's network recurrent, and why did he build it?",
       "a": "It sends its own output back into part of its input, copying the output into the state units, so what it produced at one moment helps predict the next. He built it because speech production changes over time, as features like nasality and lip rounding switch on and off."
      },
      {
       "source": "Predicted",
       "q": "How is a recurrent network different from an nn.Sequential network?",
       "a": "In a Sequential network, the input passes through the layers once, from the input to the output, and makes one decision. A recurrent network loops its output back into its input, so it works through a sequence step by step."
      },
      {
       "source": "Predicted",
       "q": "How does GPT use the same idea as Jordan's network?",
       "a": "GPT also feeds its own output back in. It predicts the next word, adds that word to the prompt, and predicts again, one word at a time."
      }
     ]
    },
    {
     "id": "heads-layers",
     "tier": "Almost certain",
     "lectures": "Lecture 18",
     "title": "Heads and layers",
     "note": "On Nov 5 he said heads are a question on the exam, and the Lecture 18 slide says the same. This is the one LLM topic he named for the exam, so it stays Almost certain.",
     "know": [
      "Layer: A layer is one round of improvement. Layers go one after another, from the input to the output.",
      "Head: A head is one expert, and it is a set of weights. Heads sit side by side inside each layer.",
      "What a layer does: Each head gives its own opinion on how to improve the vectors, and the layer combines all of the heads' opinions into improved vectors. The next layer then does the same thing again.",
      "Classroom comparison: The classes you visit one after another are the layers, and the students in each class who each give you an opinion are the heads.",
      "Depth and width: Layers give an LLM depth, one round of improvement after another. Heads give it width, many experts asked at the same time in each round.",
      "Why so many: Predicting the next word is so hard that large systems have a hundred or more layers with about a hundred heads in each.",
      "How heads learn: If the predicted next word is wrong, every head in every layer adjusts its weights with backpropagation, so the next prediction is closer to the right word."
     ],
     "questions": [
      {
       "source": "Lecture 18",
       "q": "What are heads, and how do they relate to layers?",
       "a": "A head is one expert, a set of weights that gives its own opinion on how to improve the vectors. Heads sit side by side inside each layer, and the layer combines all of their opinions into improved vectors. Layers go one after another from the input to the output, so each layer improves the vectors again."
      },
      {
       "source": "Predicted",
       "q": "In the classroom comparison, what are the classes and what are the students?",
       "a": "The classes are the layers, because you visit them one after another. The students in each class are the heads, because each one gives you a separate opinion at the same time, and you combine those opinions before moving on to the next class."
      },
      {
       "source": "Predicted",
       "q": "Which gives an LLM depth and which gives it width, heads or layers?",
       "a": "Layers give it depth, because they are rounds of improvement that come one after another. Heads give it width, because many of them work side by side inside the same layer."
      },
      {
       "source": "Predicted",
       "q": "An LLM has 5 layers with 4 heads in each layer. How many heads does it have, and which of them work at the same time?",
       "a": "It has 20 heads, because each of the 5 layers has 4. The 4 heads inside one layer work side by side at the same time, and the layers come one after another, so layer 2 works on the vectors that layer 1 improved."
      },
      {
       "source": "Predicted",
       "q": "The LLM predicts bark instead of barks after \"the dog that my parents ... \". Which weights change?",
       "a": "The weights of every head in every layer change. Backpropagation assigns each weight its share of the blame for the wrong prediction, and each one is adjusted a little so that the next prediction is closer to barks."
      },
      {
       "source": "Predicted",
       "q": "Where is the knowledge of an LLM stored?",
       "a": "It is stored in its weights. Each head is a set of weights, so the knowledge is spread across all the heads in all the layers, the same way the vowel network's knowledge is in its weights."
      }
     ]
    },
    {
     "id": "llm-sequences",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "From the vowel network to an LLM: many vectors in, the next item out",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely. Lab 9 Part 4 asks this comparison directly.",
     "know": [
      "The prediction game: An LLM is given 15 vectors and predicts the sixteenth. The sixteenth is a probability distribution over what could come next, such as each of about 30,000 English words.",
      "Vectors can be anything: The vectors can be words, frames of a spectrogram, patches of an image or the amino acids of a protein. The LLM only ever sees lists of numbers, so the same design works for all of them.",
      "Long-distance connections: In \"the dog that my parents, who I love very much, ... \", the next word is barks, because it goes with the singular dog no matter how many words come in between. An LLM learns this from data, not from a taught rule.",
      "How an LLM learns: It predicts the next word, such as mat after \"the cat sat on the\". When the prediction is wrong, backpropagation adjusts the weights, and this is repeated with a huge number of sentences.",
      "Underneath everything: Inference is inner products, and learning is stochastic gradient descent plus dynamic programming.",
      "Hallucination: An LLM predicts from past data, so something its data does not cover can make it make things up."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "What is the difference between the input and output of the vowel network and those of an LLM?",
       "a": "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."
      },
      {
       "source": "Predicted",
       "q": "An LLM is given 15 vectors and predicts the sixteenth. Name three things the vectors can stand for.",
       "a": "They can be the words of a sentence, the frames of a spectrogram or the patches of an image, and they can also be the amino acids of a protein. The LLM only sees lists of numbers, so the same prediction game works for all of them."
      },
      {
       "source": "Predicted",
       "q": "What does the sixteenth vector look like, and does it add up to anything?",
       "a": "It is a probability distribution over what could come next, with one number for each possible next item, such as each English word. Because it is a probability distribution, its numbers add up to one."
      },
      {
       "source": "Predicted",
       "q": "Why is the next word barks and not bark in \"the dog that my parents, who I love very much, ... \"?",
       "a": "Barks goes with the singular word dog, no matter how many words come in between, even the plural word parents. To predict it, an LLM has to use a word far back in the sequence, which it learns from data by doing inner products layer after layer."
      },
      {
       "source": "Predicted",
       "q": "Why can an LLM hallucinate?",
       "a": "It predicts from past data. When it meets something its data does not cover, its prediction can turn into a guess, so it can make things up."
      }
     ]
    },
    {
     "id": "gestalt-cloze",
     "tier": "Possible",
     "lectures": "Lecture 17",
     "title": "Gestalt completion and the cloze test",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely.",
     "know": [
      "Gestalt completion: People see a triangle in the Gestalt figure even though no triangle is drawn, because a large part of human knowledge is completing what is missing.",
      "Closure: Closure is the Gestalt word for completing a familiar pattern that is not quite finished, such as seeing a broken circle as whole.",
      "Cloze test: Words are removed from a text and people fill them in. The name comes from closure, and it tests knowledge by asking someone to complete a sequence.",
      "LLM learning: An LLM predicting the next word is playing a cloze game again and again. Training a system only to predict the missing piece turns out to copy human thinking."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Describe the Gestalt principle of closure, and how an LLM uses it to learn.",
       "a": "Closure is completing a familiar pattern that is not quite finished, such as seeing a triangle where none is drawn or a broken circle as whole. An LLM learns the same way, by predicting the missing next piece of a sequence again and again and correcting its weights when it is wrong."
      },
      {
       "source": "Predicted",
       "q": "What is a cloze test, and why is an LLM's training like one?",
       "a": "In a cloze test, words are removed from a text and people fill them in, so knowledge is tested by completing a sequence. An LLM is trained by filling in the next word over and over, so for an LLM, completion is what knowledge is."
      },
      {
       "source": "Predicted",
       "q": "Why do people see a triangle in the Gestalt figure?",
       "a": "No triangle is drawn, but people complete the missing parts because the pattern is familiar. This completion is the Gestalt principle of closure."
      }
     ]
    },
    {
     "id": "recurrent-dynamical",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "The LLM as a dynamical system",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely.",
     "know": [
      "Dynamical system: A dynamical system is a rule that is fed its own output again and again. In the harmonic oscillator, position and velocity take turns updating, and step by step the rule draws a cosine.",
      "The LLM as a dynamical system: In the lecture's account, each layer is the rule and the depth of the layers plays the role of time. The input vectors are the initial conditions, and each layer turns them into better vectors until the last layer can predict the next word."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Why is an LLM called a dynamical system?",
       "a": "A dynamical system is a rule fed its own output again and again, starting from initial conditions. In an LLM the input vectors are the initial conditions, and each layer applies its weights to turn them into better vectors, so the depth of the layers plays the role of time."
      },
      {
       "source": "Predicted",
       "q": "In the harmonic oscillator, which two numbers update, and in what order?",
       "a": "Position x and velocity v take turns. First the new x is calculated from the old v, then the new v is calculated from the new x, and step by step the rule draws a cosine for x."
      }
     ]
    },
    {
     "id": "agentic",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "Agentic systems and Software 3.0",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely. Lab 9 Part 4 asks what an agentic system is and what its loop prevents.",
     "know": [
      "Agentic system: An agentic system is a group of LLMs connected so that one's output becomes the next one's input. An agent in AI today is just an LLM.",
      "The lecture example: An outline LLM plans the answer, a writing LLM writes it, a critic LLM checks it, a revision LLM works back and forth with the critic, and a final LLM produces the answer the user sees.",
      "The critic loop: The draft goes back and forth between the critic and the reviser until the critic is satisfied or a limit is reached. The loop greatly reduced hallucination.",
      "Shared memory and fixed weights: Once each LLM is trained its weights usually do not change, and the agents share a common memory where they write and read information.",
      "Software 1.0, 2.0 and 3.0: Software 1.0 is writing a program in a language such as Python. Software 2.0 is training a neural network on input and output data, so the program is its weights. Software 3.0 is having an agentic system build and run the program from plain English instructions, which is called vibe coding."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "What is an agentic system, in terms of LLMs? Describe the example from lecture.",
       "a": "It is a graph of LLMs, each with its own job, connected so that one's output becomes the next one's input. One LLM outlines, one writes, one critiques, one revises and one produces the final version, with a loop between the critic and the reviser until the critic is satisfied or the limit is reached."
      },
      {
       "source": "Lab 9",
       "q": "What does the critic loop do, and what does it prevent that was common in earlier LLMs?",
       "a": "It sends the draft back until the critic is satisfied, so errors are caught and fixed instead of being presented. It prevents hallucination, which was a common problem for earlier LLMs."
      },
      {
       "source": "Predicted",
       "q": "What would happen if the critic LLM were removed?",
       "a": "The draft would go straight from writing to the final answer without being checked. More made-up statements would reach the user, because the critic loop is what greatly reduced hallucination."
      },
      {
       "source": "Predicted",
       "q": "What is the difference between Software 2.0 and Software 3.0?",
       "a": "In Software 2.0, a neural network is trained on input and output data, so the program is its weights. In Software 3.0, an agentic system builds and runs the program from plain English instructions, as in vibe coding."
      }
     ]
    },
    {
     "id": "phonotactics",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "Phonotactics and guessing the next letter",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely. Lab 9 Part 4 asks these directly.",
     "know": [
      "Phonotactics: The rules for which sounds can follow which are **phonotactics**. Every speaker knows them without being taught.",
      "Simple syllable: A simple English syllable is a consonant, a vowel and a consonant, as in Don or cup. The pattern is about sounds, not letters, so the silent e of shave does not count.",
      "Onset and coda: A cluster before the vowel is an onset, as in split, and a cluster after the vowel is a coda, as in lamp. The order is a mirror image around the vowel, so flat is a word and lfat is impossible.",
      "Syllable breaks: Atlantic is a word because t and l are on opposite sides of a syllable break, but tlantic is impossible because tl cannot start an English syllable. The sound ng can end a syllable but never start one.",
      "Other languages: Mandarin allows only nasal sounds at the end of a syllable, Russian and Polish allow clusters like zb or dl at the start of a word, and Spanish speakers add an e before st, as in estadio.",
      "Next-letter guessing: After a vowel, almost any letter can come next, so the probability distribution is flat. At the start of a word, the choices narrow to what an English onset allows, so after skr the distribution is sharply peaked on a few vowels.",
      "The GPT link: Guessing the next letter is predicting the sixteenth item, so a GPT trained only on this game learns English syllable structure.",
      "Simple syllable words: Don, mat, sit, cup, dog, fish and shave are all consonant, vowel, consonant. Ship, chin and bath also count, because sh, ch and th are each one sound spelled with two letters.",
      "Allowed onsets (before the vowel): split, flat, black and glad.",
      "Allowed codas (after the vowel): desk, help, milk and lamp.",
      "Impossible twins: flat and *lfat, help and *hepl, lamp and *lapm. Each impossible twin puts the wrong consonant next to the vowel. *Sblit and *desb are impossible too, which is why a product called desb would sound un-English.",
      "After ra_: Almost any letter can come next, such as t, n, r or l, so the distribution is flat.",
      "After sp_: Only l, r or a vowel can come next, never n.",
      "After k_: Only a vowel or n can come next, as in knee, never t.",
      "After b_ and f_: Only r, l or a vowel can come next, never n.",
      "After sh_: Only a vowel or r can come next, as in shrimp.",
      "After skr_, or m_ at the start of a word: Only a vowel can come next.",
      "After bram_: The letter b is almost certain, as in bramble, though a new syllable could also start there.",
      "Lab 9 starts: After pl_ only a vowel can come, as in play. After st_ a vowel or r can come, as in star and street, but not l or k. After th_ r, w or a vowel can come, as in three, thwart and thin, but not l or n."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp? For each one that could not, name the problem.",
       "a": "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."
      },
      {
       "source": "Lab 9",
       "q": "Each of these starts an English word: pl_, st_ and th_. What could come next, and what could not?",
       "a": "After pl only a vowel can come, as in play, so a consonant such as n cannot. After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n."
      },
      {
       "source": "Predicted",
       "q": "After which start is the next-letter distribution flatter, ra_ or skr_? Why?",
       "a": "It is flatter after ra, because after a vowel almost any letter can come next, so the probability is spread over many letters. After skr only a vowel can come, so the probability piles onto a few vowels and the distribution is sharply peaked."
      },
      {
       "source": "Predicted",
       "q": "Why is Atlantic an English word but tlantic impossible?",
       "a": "In Atlantic, the t and the l are on opposite sides of a syllable break, so each syllable follows the rules. In tlantic, tl would have to start a syllable, and English does not allow tl at the start of a syllable."
      },
      {
       "source": "Predicted",
       "q": "Could ngop be an English word? Could flim?",
       "a": "Ngop could not, because the sound ng can end a syllable, as in ring, but can never start one. Flim could, because fl is an allowed onset, as in flat, and im is an allowed ending."
      },
      {
       "source": "Predicted",
       "q": "Why does a GPT trained only to guess the next letter end up knowing English syllable structure?",
       "a": "Its predictions can only improve by matching the patterns of English syllables, because those patterns decide which letters can come next. So the knowledge ends up in the shape of its probability distributions, flat after a vowel and peaked after a start like skr."
      },
      {
       "source": "Predicted",
       "q": "Which letter cannot come next after sp_ at the start of a word: l, r, n or a?",
       "a": "N cannot. After sp only l, r or a vowel can come, as in split, spring and spa, because spn is not an allowed English onset."
      },
      {
       "source": "Predicted",
       "q": "Which letter cannot come next after k_ at the start of a word: a, n or t?",
       "a": "T cannot. After k only a vowel or n can come, as in knee, because kt cannot start an English syllable."
      },
      {
       "source": "Predicted",
       "q": "What can come next after b_ or f_ at the start of a word, and what cannot?",
       "a": "Only r, l or a vowel can come next, as in bring, black, frog and flat. N cannot, because bn and fn cannot start an English syllable."
      },
      {
       "source": "Predicted",
       "q": "What can come next after sh_ at the start of a word?",
       "a": "Only a vowel or r can come next, as in ship and shrimp. Shr is the only cluster English allows there."
      },
      {
       "source": "Predicted",
       "q": "What can come next after skr_?",
       "a": "Only a vowel can come next, as in scream and scrap. Skr already fills the onset, so no other consonant can be added."
      },
      {
       "source": "Predicted",
       "q": "Why are lfat, hepl and lapm impossible when flat, help and lamp are words?",
       "a": "The order of a cluster is a mirror image around the vowel. In flat and help the l sits right next to the vowel, and in lamp the m does, so each impossible twin puts the wrong consonant next to the vowel."
      },
      {
       "source": "Predicted",
       "q": "Is ship a consonant, vowel, consonant word even though it has four letters?",
       "a": "Yes. The pattern is about sounds, not letters, and sh is one sound. So ship is consonant sh, vowel i, consonant p."
      }
     ]
    }
   ],
   "flags": [
    "HW5 questions are labeled Based on HW5, because only the HW5 answer key was available. The answers come from the key, and the question wording is reconstructed from them.",
    "Lab 7 says the vowel in year decreases F1 and F2. The correct pattern is F1 down and F2 up, which Lab 7's own table, Lab 9 and the lectures all give.",
    "Lab 7 labels the third fixed-free mode the 2nd formant. It is the 3rd formant.",
    "The studio's earlier answer to review question 4 said Mode 3 drops more than Mode 1 because the middle mass moves more in Mode 3. Lab 6 shows the middle mass moves the most in Mode 1, so that reason was wrong. The answer here gives only what is certain: Mode 1 and Mode 3 go down, and Mode 2 stays the same."
   ]
  },
  "exam2-v5": {
   "label": "Exam 2 · Study this first (Lectures 11–18, plain sentences)",
   "range": "Lectures 11 to 18",
   "howToAnswer": [],
   "scope": {
    "covers": "Lectures 11 to 18 are all fair game here. Everything leading up to large language models is described in full, and the LLM part is kept.",
    "final": "",
    "evidence": "Emphasis goes to what he asked: the 21 review questions, HW5 and his cues in class, including heads (Nov 5: heads are a question on the exam). On Nov 10 he said the review and homework questions go \"up to right before we got to LLMs\" and that the LLM part is kept for the final, so the LLM topics are marked Possible. On Exam 1, about 15 of the 25 questions came almost word for word from the review sheet. Questions marked Predicted change one thing in a real question and are predictions, not confirmed exam questions."
   },
   "flags": [
    "HW5 questions are labeled Based on HW5, because only the HW5 answer key was available. The answers come from the key, and the question wording is reconstructed from them.",
    "Lab 7 says the vowel in year decreases F1 and F2. The correct pattern is F1 down and F2 up, which Lab 7's own table, Lab 9 and the lectures all give.",
    "Lab 7 labels the third fixed-free mode the 2nd formant. It is the 3rd formant.",
    "The studio's earlier answer to review question 4 said Mode 3 drops more than Mode 1 because the middle mass moves more in Mode 3. Lab 6 shows the middle mass moves the most in Mode 1, so that reason was wrong. The answer here gives only what is certain: Mode 1 and Mode 3 go down, and Mode 2 stays the same."
   ],
   "topics": [
    {
     "id": "modes",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12 and 13",
     "title": "Masses, springs and modes",
     "know": [
      "Why it vibrates: The spring tends to return to **equilibrium**, and a moving mass tends to **keep moving**, so the mass overshoots and the cycle repeats.",
      "Mass and stiffness: **More mass lowers the frequency, and more stiffness raises the frequency.**",
      "Directions: **Longitudinal** motion (back and forth along the spring) and **transverse** motion (up and down) behave the same way.",
      "Mode: A **mode** is one way a system can vibrate. **N masses give N modes.**",
      "Higher modes: The more the masses move **against each other**, the more the springs stretch and compress, so the mode has more stiffness and a **higher frequency**.",
      "Local rule: **A mass changes the frequency only where it moves, and a spring changes the frequency only where it stretches.**",
      "Infinitely many: An infinite number of masses and springs along a line is a **string**. Spread over a surface, it is a **membrane**, such as a drum or the vocal folds."
     ],
     "questions": [
      {
       "source": "Review 1",
       "q": "Why do multiple mass systems have multiple frequencies?",
       "a": "A system with several masses can vibrate in several ways, called modes, because the masses can move together or against each other. When the masses move against each other, the springs between them stretch and compress more, so more stiffness is working and that mode vibrates faster. Each mode therefore has its own frequency, and a system with N masses has N modes and N frequencies."
      },
      {
       "source": "Review 2",
       "q": "How many modes does a 3-mass system have?",
       "a": "A 3-mass system has three modes, because a system with N masses has N modes of vibration."
      },
      {
       "source": "Lab 9",
       "q": "Four masses are joined by springs between two walls. How many modes does the system have, and what are the masses doing in the lowest and highest modes?",
       "a": "The system has four modes, one for each mass. In the lowest mode, Mode 1, all four masses move in the same direction at the same time. In the highest mode, Mode 4, every mass moves opposite to its neighbors, so every spring is stretched and compressed and the frequency is highest."
      },
      {
       "source": "Review 3",
       "q": "Which mode of the 3-mass system has the highest frequency? Why?",
       "a": "Mode 3 has the highest frequency. In Mode 3 the middle mass moves opposite to the two outer masses, so every spring is stretched and compressed as much as possible. That puts the most stiffness to work, and more stiffness makes the system vibrate faster."
      },
      {
       "source": "Predicted",
       "q": "Which mode of a 2-mass system has the lowest frequency, and why?",
       "a": "Mode 1 has the lowest frequency. In Mode 1 the two masses move together, so the middle spring is carried along without stretching. Only the two outer springs are working, so Mode 1 has less stiffness than Mode 2 and vibrates more slowly."
      },
      {
       "source": "Review 4",
       "q": "If you increase mass 2, what happens to the frequencies of each of the modes?",
       "a": "Mode 1 and Mode 3 go down, and Mode 2 stays the same. The middle mass moves in Mode 1 and in Mode 3, so making it heavier slows those modes. In Mode 2 the middle mass does not move, and a mass that does not move has no effect on the frequency."
      },
      {
       "source": "Predicted",
       "q": "In the 3-mass system, what happens to each mode if you make mass 1 (an outer mass) heavier?",
       "a": "All three modes go down. The outer mass moves in Mode 1, Mode 2 and Mode 3, and a heavier mass that is moving lowers the frequency. No mode leaves an outer mass still, so none of the three frequencies stays the same."
      },
      {
       "source": "Predicted",
       "q": "In a 2-mass system, what happens to each mode if you make the middle spring stiffer?",
       "a": "Mode 1 stays the same and Mode 2 goes up. In Mode 1 the masses move together, so the middle spring is never stretched and its extra stiffness does nothing. In Mode 2 the masses move against each other, so the middle spring is stretched and compressed and the extra stiffness raises the frequency."
      },
      {
       "source": "Review 5",
       "q": "What do you get when you have an infinite number of masses and springs?",
       "a": "You get a string, like a guitar or piano string. Every small piece of a string has mass, and every small piece stretches like a spring, so a string vibrates in modes like a chain of masses, only with infinitely many of them. Spread over a surface instead of a line, the same idea gives a membrane such as a drum or the vocal folds."
      },
      {
       "source": "Predicted",
       "q": "What happens to the frequency of a single mass on a spring if you make the spring stiffer? If you make the mass heavier?",
       "a": "A stiffer spring raises the frequency, because it pulls the mass back toward equilibrium with more force and turns it around sooner. A heavier mass lowers the frequency, because a heavier mass is harder to start and stop, so each back-and-forth cycle takes longer."
      }
     ],
     "points": [
      {
       "main": "The spring tends to return to **equilibrium**, and a moving mass tends to **keep moving**, so the mass overshoots and the cycle repeats.",
       "sub": ""
      },
      {
       "main": "**More mass lowers the frequency, and more stiffness raises the frequency.**",
       "sub": ""
      },
      {
       "main": "**Longitudinal** motion (back and forth along the spring) and **transverse** motion (up and down) behave the same way.",
       "sub": ""
      },
      {
       "main": "A **mode** is one way a system can vibrate.",
       "sub": "**N masses give N modes.**"
      },
      {
       "main": "The more the masses move **against each other**, the more the springs stretch and compress, so the mode has more stiffness and a **higher frequency**.",
       "sub": ""
      },
      {
       "main": "**A mass changes the frequency only where it moves, and a spring changes the frequency only where it stretches.**",
       "sub": ""
      },
      {
       "main": "An infinite number of masses and springs along a line is a **string**.",
       "sub": "Spread over a surface, it is a **membrane**, such as a drum or the vocal folds."
      }
     ]
    },
    {
     "id": "springiness",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "Where the springiness is, and what a local change does",
     "know": [
      "Alternation: **Where a vibrating system moves the most, it stretches the least, and where it does not move, it stretches the most.**",
      "Shortcut: The springiest locations are the points of **no movement**, which are the fixed ends and the points where the mode crosses its resting line.",
      "Ends: A **fixed end is always springy**, and a **free end is always moving**, in every mode.",
      "Added mass: Extra mass lowers a mode's frequency **only where that mode is moving**.",
      "Added stiffness: Extra stiffness raises a mode's frequency **only where that mode is stretching**.",
      "Both at once: Adding mass and stiffness together does **not** cancel out, except for a single mass on a single spring, because at one spot in one mode only one of the two matters.",
      "Perturbation theory: It predicts how a small change in one location affects vibration. In the late nineteenth century, wax placed where a drum vibrated a lot lowered its pitch, and wax placed where it did not vibrate had no effect."
     ],
     "questions": [
      {
       "source": "Review 6",
       "q": "This is Mode 5 of a string fixed at both ends. Circle the areas where there is the most springiness.",
       "a": "Circle the two fixed ends and the four points where the string crosses its middle line, six places in all. At those points the string does not move, but the pieces on either side move in opposite directions, so the string there is stretched and compressed the most. The tops of the five bumps have the most motion and the least springiness."
      },
      {
       "source": "Predicted",
       "q": "This is Mode 3 of a string fixed at both ends. Where is the most springiness, and where is the most motion?",
       "a": "The most springiness is at the two fixed ends and at the two points where the string crosses its middle line, four places in all, because the string does not move there. The most motion is at the tops of the three bumps, where the string swings the most and is hardly stretched."
      },
      {
       "source": "Review 11",
       "q": "This picture shows Mode 4 of a building. Circle the areas where there is the most springiness.",
       "a": "Circle the fixed base and the three points where the building crosses its resting position, four places in all. Those points do not move, but the parts above and below them move in opposite directions, so the structure there stretches and compresses the most. The free top moves the most and is the least springy, so it is not circled."
      },
      {
       "source": "Predicted",
       "q": "This diagram shows Mode 2 of a building. Where is the most springiness?",
       "a": "The most springiness is at the fixed base and at the one point above it where the building crosses its resting position. Those two points do not move, so the structure there is stretched and compressed the most. The free top moves the most and is the least springy."
      },
      {
       "source": "Review 14",
       "q": "If we increase the stiffness and mass of the string at the boxed location (where Mode 3 crosses its middle line and Mode 4 is at the top of a bump), what happens to Mode 3 and Mode 4's frequencies, and why?",
       "a": "Mode 3 goes up and Mode 4 goes down. In Mode 3 the boxed spot does not move but is stretched the most, so the added mass does nothing and the added stiffness raises the frequency. In Mode 4 the boxed spot moves the most and is not stretched, so the added mass lowers the frequency and the added stiffness does nothing."
      },
      {
       "source": "Predicted",
       "q": "The box is moved to a spot where Mode 3 is at the top of a bump and Mode 4 crosses its middle line. Mass and stiffness are added there. What happens?",
       "a": "Now Mode 3 goes down and Mode 4 goes up. In Mode 3 the spot moves the most and is hardly stretched, so the added mass lowers the frequency. In Mode 4 the spot does not move but is stretched the most, so the added stiffness raises the frequency."
      },
      {
       "source": "Review 15",
       "q": "If we increase the mass and stiffness of the building at its very top, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes down. The top of the building is the free end, so in every mode it moves the most and is hardly stretched. The added mass matters there and lowers the frequency, while the added stiffness does nothing because nothing is stretching at the top."
      },
      {
       "source": "Predicted",
       "q": "If we increase the mass and stiffness of the building at its very base, what happens to the frequency of Mode 4, and why?",
       "a": "The frequency of Mode 4 goes up. The base is the fixed end, so it never moves but is always stretched and compressed. The added mass does nothing there because the base does not move, while the added stiffness raises the frequency."
      },
      {
       "source": "Lab 9",
       "q": "In Mode 3 of a string fixed at both ends, point B does not move and point C is at the bottom of a bump. What happens to Mode 3 if you add a small weight at B? At C? If you stiffen the string at B?",
       "a": "A weight at B leaves Mode 3 the same, because B does not move in Mode 3. A weight at C lowers Mode 3's frequency, because C swings the most and the extra mass counts there. Stiffening the string at B raises Mode 3's frequency, because B is where the string stretches the most."
      },
      {
       "source": "Lab 9",
       "q": "The same spot B is moving in Mode 1. Does a weight at B change Mode 1's frequency?",
       "a": "Yes, the weight lowers Mode 1's frequency. In Mode 1 the whole string is one bump, so the spot at B is moving, and extra mass at a moving spot slows the vibration."
      }
     ],
     "points": [
      {
       "main": "**Where a vibrating system moves the most, it stretches the least, and where it does not move, it stretches the most.**",
       "sub": ""
      },
      {
       "main": "The springiest locations are the points of **no movement**, which are the fixed ends and the points where the mode crosses its resting line.",
       "sub": ""
      },
      {
       "main": "A **fixed end is always springy**, and a **free end is always moving**, in every mode.",
       "sub": ""
      },
      {
       "main": "Extra mass lowers a mode's frequency **only where that mode is moving**.",
       "sub": ""
      },
      {
       "main": "Extra stiffness raises a mode's frequency **only where that mode is stretching**.",
       "sub": ""
      },
      {
       "main": "Adding mass and stiffness together does **not** cancel out, except for a single mass on a single spring, because at one spot in one mode only one of the two matters.",
       "sub": ""
      },
      {
       "main": "**Perturbation theory** predicts how a small change in one location affects vibration.",
       "sub": "In the late nineteenth century, wax placed where a drum vibrated a lot lowered its pitch, and wax placed where it did not vibrate had no effect."
      }
     ]
    },
    {
     "id": "harmonics-formants",
     "tier": "Almost certain",
     "lectures": "Lectures 11, 12, 13 and 14",
     "title": "Harmonics and formants: fixed-fixed and fixed-free systems",
     "know": [
      "Fixed-fixed: A system fixed at both ends, such as a string or the **vocal folds**, has modes at **1, 2, 3, 4 times** the first. These are **harmonics**.",
      "Why whole numbers: The first mode is **half a wave**, and each higher mode must fit a whole number of those half-waves between the two fixed ends. Mode N contains N copies of Mode 1.",
      "Fixed-free: A system fixed at one end and free at the other, such as a **building** or the **air in the vocal tract**, has modes at **1, 3, 5, 7 times** the first. These are **formants**.",
      "Why odd numbers: The first mode is a **quarter-wave packet** from no motion to the most motion. The free end must always be moving, so packets are added two at a time, giving one, three, five and seven packets.",
      "Spacing: Fixed-fixed modes are spaced by the first frequency. Fixed-free modes are spaced by **twice** the first frequency.",
      "Building analogy: A building is fixed to the ground and free at the top, just as the air in the vocal tract is fixed at the closed vocal folds and free at the open lips.",
      "Spectrum: A **spectrum** has frequency on the horizontal axis and amplitude on the vertical axis, with one spike for each mode that is present.",
      "Scientific method: The theory that the vocal folds are a membrane predicts **equidistant harmonics** (evenly spaced harmonics). Recordings in Praat confirmed the prediction."
     ],
     "questions": [
      {
       "source": "Review 7",
       "q": "A string is fixed on both sides. If Mode 1 has frequency 200 Hz, what frequency does Mode 5 have?",
       "a": "Mode 5 has a frequency of 1000 Hz. In a string fixed at both ends, each mode is a whole-number multiple of the first, and Mode 5 contains five copies of Mode 1, so it is five times 200 Hz."
      },
      {
       "source": "Lab 9",
       "q": "A string fixed at both ends has Mode 1 at 150 Hz. What are Modes 2 and 3? If one end is freed and Mode 1 stays at 150 Hz, what are Modes 2 and 3 now?",
       "a": "Fixed at both ends, Modes 2 and 3 are 300 and 450 Hz, which are two and three times 150. Fixed at one end and free at the other, Modes 2 and 3 are 450 and 750 Hz, which are three and five times 150, because only the odd multiples occur. The fixed-fixed modes are 150 Hz apart, and the fixed-free modes are 300 Hz apart."
      },
      {
       "source": "Review 8",
       "q": "Why are the frequencies of fixed-fixed vibratory systems spaced the way they are?",
       "a": "In a system fixed at both ends, the first mode is half a wave, going from no motion at one end to the most motion in the middle and back to no motion. Every higher mode must fit a whole number of those half-waves into the same length, because both ends must stay still. Mode 2 fits two, so it vibrates twice as fast, and Mode 3 fits three, so the frequencies are evenly spaced whole-number multiples of the first."
      },
      {
       "source": "Review 16",
       "q": "Why are the formants of a fixed-free system 1, 3, 5, etc. multiples of the base frequency?",
       "a": "In a fixed-free system the basic piece is a quarter-wave packet, which runs from no motion at the fixed end to the most motion at the free end. Every mode must start still at the fixed end and end with the most motion at the free end. One extra packet would leave a still point at the free end, which cannot happen, so packets are added two at a time, giving one, three, five and seven packets and odd-multiple frequencies."
      },
      {
       "source": "Predicted",
       "q": "If F1 is 500 Hz, what are F2 and F3?",
       "a": "F2 is 1500 Hz and F3 is 2500 Hz. The air in the vocal tract is a fixed-free system, so its formants are odd multiples of the first, which are three times and five times 500 Hz, not two and three times."
      },
      {
       "source": "Review 17",
       "q": "What aspect of speech has the properties in the fixed-free question?",
       "a": "The formants of the air in the vocal tract have these properties. The air is fixed at the closed vocal folds and free at the open lips, so its frequencies of vibration, the formants, are odd multiples of the first formant."
      },
      {
       "source": "Predicted",
       "q": "What aspect of speech has frequencies at whole-number multiples, and why?",
       "a": "The harmonics of the vocal folds have whole-number multiples. The vocal folds are a membrane held in place along their edges, so they behave like a system fixed at both ends, and each mode is a whole number of copies of the first."
      },
      {
       "source": "Review 12 and 13",
       "q": "What in speech is a building analogous to, and why does the analogy hold?",
       "a": "A building is analogous to the air in the vocal tract. Both are fixed at one end and free at the other: the building is fixed to the ground and free at the top, and the air is fixed at the closed vocal folds and free at the open lips. Because the ends match, both have springiness at the fixed end, the most motion at the free end, and frequencies at odd multiples of the first."
      },
      {
       "source": "Predicted",
       "q": "How is a building different from the air in the vocal tract?",
       "a": "Engineers design a building to sway only in Mode 1, because higher modes would move floors in opposite directions and could break the structure. The air in the vocal tract vibrates in all of its modes at once, and speaking changes the mass and stiffness of the air at different locations to move those formants."
      },
      {
       "source": "Review 9",
       "q": "Draw the spectrum for a string fixed at both ends with Mode 1 at 200 Hz, up to Mode 6.",
       "a": "Draw frequency along the horizontal axis and amplitude up the vertical axis. Put six evenly spaced spikes at 200, 400, 600, 800, 1000 and 1200 Hz, one for each mode. If the modes are equally strong, the spikes can be drawn the same height."
      },
      {
       "source": "Predicted",
       "q": "Draw the spectrum for a fixed-free system with Mode 1 at 200 Hz, up to Mode 4.",
       "a": "Draw spikes only at the odd multiples: 200, 600, 1000 and 1400 Hz. A fixed-free system has no even multiples, because an even number of quarter-wave packets would leave a still point at the free end."
      },
      {
       "source": "Review 10",
       "q": "If the vocal folds have their base frequency, F0, at 150 Hz, draw the spectrum for the first 5 harmonics.",
       "a": "Draw spikes at 150, 300, 450, 600 and 750 Hz, with frequency along the bottom and amplitude going up. The vocal folds are a membrane fixed along its edges, so their harmonics are whole-number multiples of F0 and the spikes are evenly spaced 150 Hz apart."
      }
     ],
     "points": [
      {
       "main": "A system fixed at both ends, such as a string or the **vocal folds**, has modes at **1, 2, 3, 4 times** the first.",
       "sub": "These are **harmonics**."
      },
      {
       "main": "The first mode is **half a wave**, and each higher mode must fit a whole number of those half-waves between the two fixed ends.",
       "sub": "Mode N contains N copies of Mode 1."
      },
      {
       "main": "A system fixed at one end and free at the other, such as a **building** or the **air in the vocal tract**, has modes at **1, 3, 5, 7 times** the first.",
       "sub": "These are **formants**."
      },
      {
       "main": "The first mode is a **quarter-wave packet** from no motion to the most motion.",
       "sub": "The free end must always be moving, so packets are added two at a time, giving one, three, five and seven packets."
      },
      {
       "main": "Fixed-fixed modes are spaced by the first frequency.",
       "sub": "Fixed-free modes are spaced by **twice** the first frequency."
      },
      {
       "main": "A building is fixed to the ground and free at the top, just as the air in the vocal tract is fixed at the closed vocal folds and free at the open lips.",
       "sub": ""
      },
      {
       "main": "A **spectrum** has frequency on the horizontal axis and amplitude on the vertical axis, with one spike for each mode that is present.",
       "sub": ""
      },
      {
       "main": "The theory that the vocal folds are a membrane predicts **equidistant harmonics** (evenly spaced harmonics).",
       "sub": "Recordings in Praat confirmed the prediction."
      }
     ]
    },
    {
     "id": "constrictions",
     "tier": "Almost certain",
     "lectures": "Lectures 12, 13 and 14",
     "title": "The vocal tract, constrictions and the vowels /i/, /a/ and /u/",
     "know": [
      "Fixed-free tube: The air in the vocal tract is **fixed at the glottis** (closed vocal folds, so the air can only be compressed) and **free at the lips** (the air moves in and out).",
      "Schwa: With no constriction, as in **done**, the formants are about **500, 1500 and 2500 Hz**.",
      "Constriction: A **constriction** (narrowing) packs the air into a smaller space, which makes it both **heavier** (denser) and **stiffer**.",
      "Four steps: Find the location, decide whether the air there is mostly **moving** or mostly **compressed** in that mode, pick the extra that counts (mass if moving, stiffness if compressed), then say whether the formant goes **down** or **up**.",
      "/u/ (dune): The constriction is at the lips, where the air is moving in both modes, so **F1 and F2 both go down**.",
      "/i/ (dean): The constriction is two-thirds of the way from the glottis. The air there moves in Mode 1 and is compressed in Mode 2, so **F1 goes down and F2 goes up** (the formants move apart).",
      "/a/ (Don): The constriction is one-third of the way from the glottis. The air there is compressed in Mode 1 and moves in Mode 2, so **F1 goes up and F2 goes down** (the formants move together).",
      "Reasoning backward: A large rise means the air there was springy and hardly moving. A large fall means the air there was moving a lot."
     ],
     "questions": [
      {
       "source": "Review 19",
       "q": "If I constrict the vocal tract somewhere and I raise the formant a great deal, what must be true of air motion versus springiness at this location?",
       "a": "At that location the air must be very springy and hardly moving in that mode. A constriction adds both mass and stiffness, and the formant went up, so the added stiffness is what counted. Stiffness only counts where the air is compressed and expanded, and the added mass did nothing because the air there was not moving."
      },
      {
       "source": "Predicted",
       "q": "If I constrict the vocal tract somewhere and I lower the formant a great deal, what must be true at this location?",
       "a": "At that location the air must be moving a lot and hardly compressed in that mode. The formant went down, so the added mass is what counted, and mass only counts where the air is moving. This is what happens at the lips for /u/."
      },
      {
       "source": "Lab 9",
       "q": "A classmate says more mass lowers the frequency and more stiffness raises it, so a constriction always cancels out. What is wrong with this argument?",
       "a": "In any one mode, at most locations only one of the two changes matters. If the air at the constriction is mostly moving, it is not being compressed, so only the extra mass counts and the formant goes down. If the air there is mostly compressed, it is not moving, so only the extra stiffness counts and the formant goes up, which is why the same constriction can push F1 and F2 in opposite directions."
      },
      {
       "source": "Lab 9",
       "q": "Why is the air in the vocal tract a fixed-free system? Say which end is which.",
       "a": "The glottis end is closed off by the vocal folds, so the air there cannot move and can only be compressed and expanded, which makes it the fixed end. The lip end is open, so the air there moves freely in and out without being compressed against anything, which makes it the free end."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dune, and why?",
       "a": "Both F1 and F2 go down. Lip rounding creates a constriction at the free end, where the air moves the most in every mode. The added mass therefore counts in both Mode 1 and Mode 2, and extra mass at a moving location lowers the frequency."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in dean, and why?",
       "a": "F1 goes down and F2 goes up. The constriction is about two-thirds of the way from the glottis. In Mode 1 the air there is moving, so the added mass lowers F1, and in Mode 2 the air there is compressed, so the added stiffness raises F2."
      },
      {
       "source": "Predicted",
       "q": "Compared with done, what happens to F1 and F2 in Don, and why?",
       "a": "F1 goes up and F2 goes down. The constriction is about one-third of the way from the glottis. In Mode 1 the air there is compressed, so the added stiffness raises F1, and in Mode 2 the air there is moving, so the added mass lowers F2."
      },
      {
       "source": "Lab 9",
       "q": "A new constriction is placed deep in the throat, one-fifth of the way from the glottis, where the air is compressed in both Mode 1 and Mode 2. What happens to F1 and F2?",
       "a": "Both F1 and F2 go up. The location is near the fixed end, where the air is compressed in both modes, so the added stiffness is what counts in both, and extra stiffness raises the frequency."
      },
      {
       "source": "Predicted",
       "q": "Why does rounding the lips lower every formant?",
       "a": "The lips are the free end of the vocal tract, and the free end is a location of maximum motion in every mode. A constriction there adds mass where the air is moving, so it lowers every formant. This is the same reason that adding mass at the top of a building lowers every mode."
      }
     ],
     "points": [
      {
       "main": "The air in the vocal tract is **fixed at the glottis** (closed vocal folds, so the air can only be compressed) and **free at the lips** (the air moves in and out).",
       "sub": ""
      },
      {
       "main": "With no constriction, as in **done**, the formants are about **500, 1500 and 2500 Hz**.",
       "sub": "This neutral vowel is schwa."
      },
      {
       "main": "A **constriction** (narrowing) packs the air into a smaller space, which makes it both **heavier** (denser) and **stiffer**.",
       "sub": ""
      },
      {
       "main": "To work out what a constriction does, find its location, decide whether the air there is mostly **moving** or mostly **compressed** in that mode, pick the extra that counts (mass if moving, stiffness if compressed), and then say whether the formant goes **down** or **up**.",
       "sub": ""
      },
      {
       "main": "In **dune** (/u/), the constriction is at the lips, where the air is moving in both modes, so **F1 and F2 both go down**.",
       "sub": ""
      },
      {
       "main": "In **dean** (/i/), the constriction is two-thirds of the way from the glottis.",
       "sub": "The air there moves in Mode 1 and is compressed in Mode 2, so **F1 goes down and F2 goes up**, and the formants move apart."
      },
      {
       "main": "In **Don** (/a/), the constriction is one-third of the way from the glottis.",
       "sub": "The air there is compressed in Mode 1 and moves in Mode 2, so **F1 goes up and F2 goes down**, and the formants move together."
      },
      {
       "main": "You can also work backward.",
       "sub": "A large rise in a formant means the air at the constriction was springy and hardly moving, and a large fall means the air there was moving a lot."
      }
     ]
    },
    {
     "id": "source-filter",
     "tier": "Likely",
     "lectures": "Lectures 13 and 14",
     "title": "Source and filter, and F0",
     "know": [
      "Source: The **vocal folds** are the source. They produce **harmonics** at whole-number multiples of **F0**, the base frequency.",
      "Filter: The **air in the vocal tract** is the filter. Its **formants** decide which harmonics are loud.",
      "Core rule: **A formant makes the harmonics closest to it louder, and harmonics far from any formant come out weaker.** The outline of the harmonic heights is the **envelope**.",
      "Vowels: The harmonics stay the same from vowel to vowel. Only their heights change, and the envelope is what makes each vowel distinct.",
      "F0: Heavy, loose vocal folds give a low F0. Tight, light vocal folds give a high F0, so the harmonics are spaced farther apart.",
      "High voices: With a high F0, few harmonics fall near each formant, so the formants are hard to see. This is why a toddler's or a soprano's vowels are hard to identify.",
      "F0 carries meaning: F0 falls at the end of a statement and rises at the end of a question, and it signals sarcasm or pretending."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "What does the source supply and what does the filter do in speech?",
       "a": "The vocal folds are the source, and they supply the harmonics, which are whole-number multiples of F0. The air in the vocal tract is the filter, and its formants make the harmonics near them louder and the ones far from them weaker. So the source decides which frequencies are present, and the filter decides which of them are loud."
      },
      {
       "source": "Predicted",
       "q": "Two vowels are said at the same pitch. What is the same and what is different in their spectra?",
       "a": "The harmonics are the same, because the vocal folds vibrate at the same F0 for both vowels. The heights of the harmonics are different, because each vowel has its constriction in a different place, which moves the formants and changes the envelope."
      },
      {
       "source": "Predicted",
       "q": "Why are a toddler's vowels hard to identify?",
       "a": "A toddler has a very high F0, so the harmonics are spaced far apart. Few harmonics fall near each formant, and a formant can fall between two harmonics, so the envelope is hard to see. The formants are still there, but there are too few harmonics to reveal them."
      },
      {
       "source": "Predicted",
       "q": "If the vocal folds become tighter, what happens to F0 and to the spacing of the harmonics?",
       "a": "F0 goes up, because tighter vocal folds are stiffer, and more stiffness raises the frequency. The harmonics are multiples of F0, so they are spaced farther apart."
      }
     ],
     "points": [
      {
       "main": "The **vocal folds** are the source.",
       "sub": "They produce **harmonics** at whole-number multiples of **F0**, the base frequency."
      },
      {
       "main": "The **air in the vocal tract** is the filter.",
       "sub": "Its **formants** decide which harmonics are loud."
      },
      {
       "main": "**A formant makes the harmonics closest to it louder, and harmonics far from any formant come out weaker.** The outline of the harmonic heights is the **envelope**.",
       "sub": ""
      },
      {
       "main": "The harmonics stay the same from vowel to vowel.",
       "sub": "Only their heights change, and the envelope is what makes each vowel distinct."
      },
      {
       "main": "Heavy, loose vocal folds give a low F0.",
       "sub": "Tight, light vocal folds give a high F0, so the harmonics are spaced farther apart."
      },
      {
       "main": "With a high F0, few harmonics fall near each formant, so the formants are hard to see.",
       "sub": "This is why a toddler's or a soprano's vowels are hard to identify."
      },
      {
       "main": "F0 falls at the end of a statement and rises at the end of a question, and it signals sarcasm or pretending.",
       "sub": ""
      }
     ]
    },
    {
     "id": "spectrogram",
     "tier": "Almost certain",
     "lectures": "Lectures 13 and 14",
     "title": "Spectra, spectrograms and speech over time",
     "know": [
      "Spectrum: A **spectrum** shows one instant, with frequency on the horizontal axis and amplitude on the vertical axis.",
      "Spectrogram: A **spectrogram** lines up many spectra over time. Time is on the horizontal axis, frequency on the vertical axis, and **darkness** shows amplitude.",
      "Dark bands: The **dark bands are the formants**. F1 is the lowest band and F2 is the next one up.",
      "Transitions: From schwa to /i/, the bands move apart. From schwa to /u/, both drop. From schwa to /a/, they move together.",
      "Where were you a year ago?: The formants never stay still, because every sound moves the constriction. Speech is a continuous series of constrictions, not a list of separate vowels.",
      "ma and na: When the m of ma is joined to the a of na, listeners hear na. Listeners decide on the consonant during the vowel, after the consonant is over (Malécot, 1950s)."
     ],
     "questions": [
      {
       "source": "Review 18",
       "q": "Describe a spectrogram.",
       "a": "A spectrogram lines up many spectra side by side over time. Time runs along the horizontal axis and frequency runs up the vertical axis, and the darkness of each spot shows how much amplitude there is at that frequency and time. The formants appear as dark bands, so you can follow them as they rise and fall, for example F1 rising and F2 falling from /i/ to /a/."
      },
      {
       "source": "Predicted",
       "q": "How is a spectrum different from a spectrogram?",
       "a": "A spectrum shows one frozen instant, with frequency on the horizontal axis and amplitude on the vertical axis. A spectrogram shows how the spectrum changes over time, with time on the horizontal axis, frequency on the vertical axis and amplitude shown as darkness. Real speech is always changing, so a spectrogram shows the formants moving."
      },
      {
       "source": "Lab 9",
       "q": "A speaker starts on schwa and switches to another vowel. F1 goes down and F2 goes up. Which vowel? What if both go down?",
       "a": "When F1 goes down and F2 goes up, the bands move apart, so the vowel is /i/ as in dean. When both F1 and F2 go down, the vowel is /u/ as in dune, because lip rounding lowers every formant."
      },
      {
       "source": "Predicted",
       "q": "Describe the spectrogram of a speaker going from schwa to the vowel of Don.",
       "a": "F1 goes up and F2 goes down, so the two lowest dark bands move toward each other. The constriction one-third of the way from the glottis is compressed in Mode 1 and moving in Mode 2, so it raises F1 and lowers F2."
      },
      {
       "source": "Predicted",
       "q": "Why do listeners hear na when the m of ma is joined to the a of na?",
       "a": "The information about the consonant is carried mostly by the vowel that follows it. After n, one formant of the vowel drops, and after m, that formant stays flat, so the a from na still signals n. Listeners therefore decide which consonant they heard during the vowel, after the consonant is over."
      }
     ],
     "points": [
      {
       "main": "A **spectrum** shows one instant, with frequency on the horizontal axis and amplitude on the vertical axis.",
       "sub": ""
      },
      {
       "main": "A **spectrogram** lines up many spectra over time.",
       "sub": "Time is on the horizontal axis, frequency on the vertical axis, and **darkness** shows amplitude."
      },
      {
       "main": "The **dark bands are the formants**.",
       "sub": "F1 is the lowest band and F2 is the next one up."
      },
      {
       "main": "From schwa to /i/, the bands move apart.",
       "sub": "From schwa to /u/, both drop. From schwa to /a/, they move together."
      },
      {
       "main": "In \"Where were you a year ago?\" the formants never stay still, because every sound moves the constriction.",
       "sub": "Speech is a continuous series of constrictions, not a list of separate vowels."
      },
      {
       "main": "When the m of ma is joined to the a of na, listeners hear na.",
       "sub": "Listeners decide on the consonant during the vowel, after the consonant is over (Malécot, 1950s)."
      }
     ]
    },
    {
     "id": "network-forward",
     "tier": "Likely",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Neural networks: inner products, weights and decisions",
     "know": [
      "Task: The vowel network takes **F1 and F2** and decides among five words, **done, dune, dean, Don and Dan**.",
      "Knowledge: **The network's knowledge is stored in its weights**, which are positive or negative numbers.",
      "Inner product: Each neuron multiplies each incoming activation by its weight and adds the results. This **inner product** is the core calculation of all AI.",
      "Forward propagation: The inner products are carried layer by layer from the input to the output.",
      "Output: The output is a **probability distribution**, numbers between 0 and 1 that **add up to 1**. The largest one is the decision.",
      "Desired output: The right answer is a **one-hot** list, 1 for the correct word and 0 everywhere else, such as 0, 0, 1, 0, 0 for dean.",
      "Direction questions: A positive activation times a positive weight is positive, so raising either one pushes that output's probability **up**. A negative weight would push it down."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "If an activation of 1.57 feeds the done output through a weight of positive 0.1, what happens to the probability of done if the weight goes up? If the activation goes up?",
       "a": "The probability of done goes up in both cases. The contribution to the done output is the activation times the weight, and both are positive, so raising either one makes the product larger and pushes done up. No multiplication is needed, only the signs."
      },
      {
       "source": "Predicted",
       "q": "What happens to the probability of done if that same weight were negative and the activation went up?",
       "a": "The probability of done goes down. A positive activation times a negative weight is negative, so a larger activation makes the contribution more negative and pushes the done output down."
      },
      {
       "source": "Predicted",
       "q": "Is 0.2, 0.3, 0.1, 0.2, 0.3 a valid probability distribution?",
       "a": "No. The numbers add up to 1.1, and a probability distribution must add up to exactly 1."
      },
      {
       "source": "Based on HW5 5",
       "q": "The first of five categories is correct. Write the desired output.",
       "a": "The desired output is 1, 0, 0, 0, 0. It puts all of the probability on the correct category and zero on every other category."
      },
      {
       "source": "Lab 9",
       "q": "The desired output over done, dune, dean, Don, Dan is 0, 0, 0, 1, 0, and the network outputs 0.10, 0.15, 0.60, 0.10, 0.05. Which vowel was said, which did the network guess, and what is the loss?",
       "a": "Don was said, and the network guessed dean, because dean has the largest probability, 0.60. The loss is a number that measures how far the computed output is from the desired output, for example how much probability it put on dean where there should be a 0."
      },
      {
       "source": "Based on HW5 3",
       "q": "What does Linear mean in the network code?",
       "a": "Linear means the layer computes inner products. Each neuron multiplies each incoming number by its weight and adds the results, with no other step."
      }
     ],
     "points": [
      {
       "main": "The vowel network takes **F1 and F2** and decides among five words, **done, dune, dean, Don and Dan**.",
       "sub": ""
      },
      {
       "main": "**The network's knowledge is stored in its weights**, which are positive or negative numbers.",
       "sub": ""
      },
      {
       "main": "Each neuron multiplies each incoming activation by its weight and adds the results.",
       "sub": "This **inner product** is the core calculation of all AI."
      },
      {
       "main": "The inner products are carried layer by layer from the input to the output.",
       "sub": ""
      },
      {
       "main": "The output is a **probability distribution**, numbers between 0 and 1 that **add up to 1**.",
       "sub": "The largest one is the decision."
      },
      {
       "main": "The right answer is a **one-hot** list, 1 for the correct word and 0 everywhere else, such as 0, 0, 1, 0, 0 for dean.",
       "sub": ""
      },
      {
       "main": "A positive activation times a positive weight is positive, so raising either one pushes that output's probability **up**.",
       "sub": "A negative weight would push it down."
      }
     ]
    },
    {
     "id": "backprop",
     "tier": "Almost certain",
     "lectures": "Lectures 15 and 16",
     "title": "Backpropagation: why learning starts at the end",
     "know": [
      "Learning: Every network starts with **random weights** and learns by correcting its mistakes, one small step at a time.",
      "Order: **The last set of weights is updated first, and the first set of weights is updated last.**",
      "Why the end is easy: The last weights affect the output probabilities **directly**, so one inner product shows whether each should go up or down.",
      "Why the start is hard: A first-layer weight affects the first hidden layer, which affects the next layer and the next, so its effect on the decision passes through every layer and depends on all the later weights.",
      "Dynamic programming: Solve the easy problem first and reuse its answer for the bigger problem that contains it (Bellman and Viterbi).",
      "Formula: **Backpropagation is stochastic gradient descent plus dynamic programming.** SGD changes each weight a little, and dynamic programming sets the order.",
      "Credit: Backpropagation was worked out in the mid-1980s, and Geoffrey Hinton won the 2024 Nobel Prize in Physics for it."
     ],
     "questions": [
      {
       "source": "Based on HW5 6",
       "q": "In what order are the weights updated?",
       "a": "The last set of weights is updated first, and the first set of weights is updated last. Each layer's update reuses what was already worked out for the layers after it."
      },
      {
       "source": "Based on HW5 7",
       "q": "Why does backpropagation start at the end?",
       "a": "The last set of weights affects the output probabilities, which are the decision, directly, so it is easy to tell whether raising or lowering each one makes the loss go up or down. A weight from the input to the first hidden layer affects the first hidden layer, then the second, then the third, and only then the output, so working out how to change it is a very complex problem that contains the problem of changing the last weights. Following dynamic programming, the simplest problem is solved first, and its answer makes the harder problems easier until the most complex one is solved."
      },
      {
       "source": "Based on HW5 8",
       "q": "What two methods together train the network's weights?",
       "a": "Stochastic gradient descent and backpropagation. Backpropagation works backward from the error to find which way each weight should change, and stochastic gradient descent moves each weight a small step in that direction."
      },
      {
       "source": "Predicted",
       "q": "Backpropagation is made of what two parts?",
       "a": "Backpropagation is stochastic gradient descent plus dynamic programming. Stochastic gradient descent nudges each weight a small step in the direction that lowers the error, and dynamic programming sets the order, from the last weights back to the first."
      },
      {
       "source": "Lab 9",
       "q": "Which part of training is the SGD part, and which is the dynamic programming part? What are the small problem and the big problem?",
       "a": "The SGD part is the adjusting, where each weight takes a small step, sized by the learning rate, in the direction that lowers the error. The dynamic programming part is the order of assigning blame, last layer first, reusing each layer's blame for the layer before it. The small problem is the blame of the last layer's weights, and the big problem is the blame of the early weights."
      },
      {
       "source": "Predicted",
       "q": "The network said done but the answer was dean. Should a last weight that pushes done up go up or down? Why?",
       "a": "It should go down. The probability of done is too high, because the desired output for done is zero. Lowering a weight that pushes done up shrinks its contribution and pulls the probability of done toward zero."
      },
      {
       "source": "Predicted",
       "q": "If the network already makes the right decision on a recording, what does it learn from it?",
       "a": "It learns nothing from that recording, because there is no error to correct. This can be a problem, because a network can keep getting the right answers by memorizing its data without learning the pattern underneath."
      }
     ],
     "points": [
      {
       "main": "Every network starts with **random weights** and learns by correcting its mistakes, one small step at a time.",
       "sub": ""
      },
      {
       "main": "**The last set of weights is updated first, and the first set of weights is updated last.**",
       "sub": ""
      },
      {
       "main": "The end is easy because the last weights affect the output probabilities **directly**, so one inner product shows whether each should go up or down.",
       "sub": ""
      },
      {
       "main": "The start is hard because a first-layer weight affects the first hidden layer, which affects the next layer and the next, so its effect on the decision passes through every layer and depends on all the later weights.",
       "sub": ""
      },
      {
       "main": "**Dynamic programming** means solving the easy problem first and reusing its answer for the bigger problem that contains it (Bellman and Viterbi).",
       "sub": ""
      },
      {
       "main": "**Backpropagation is stochastic gradient descent plus dynamic programming.** SGD changes each weight a little, and dynamic programming sets the order.",
       "sub": ""
      },
      {
       "main": "Backpropagation was worked out in the mid-1980s, and Geoffrey Hinton won the 2024 Nobel Prize in Physics for it.",
       "sub": ""
      }
     ]
    },
    {
     "id": "pytorch",
     "tier": "Almost certain",
     "lectures": "Lectures 14, 15 and 16",
     "title": "Reading the PyTorch code",
     "know": [
      "Import lines: They bring in the **torch library**, which already contains the programs for inner products and backpropagation, so none of it has to be written by hand.",
      "Sequential: The network is **a sequence of layers, one after another**.",
      "nn.Linear(2, 3): A processing layer that **takes input from 2 neurons and has 3 neurons**. It computes inner products.",
      "Counting layers: The **input layer gets no line**, because it does no processing. The **last line is always the output layer**. nn.Sigmoid lines are not layers.",
      "Matching: The first number on each line must equal the second number on the line before it.",
      "Training lines: **SGD** is stochastic gradient descent, **lr** is the learning rate, **loss** is the mistake, **backward** runs backpropagation and **step** updates the weights.",
      "Learning rate: **A higher learning rate learns faster but less accurately. A lower one learns more accurately but more slowly.**"
     ],
     "questions": [
      {
       "source": "Review 20",
       "q": "How many hidden layers does this network have: Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)?",
       "a": "It has three hidden layers, with three, two and four neurons. The network has five layers in all, the input layer, three hidden layers and the output layer, but only four Linear lines, because the input layer does no processing and the last line is the output layer."
      },
      {
       "source": "Review 21",
       "q": "Write the code for the network with an additional hidden layer of 3 neurons right before the output layer, and adjust the other layers.",
       "a": "Keep the first three lines, change the old last line from Linear(4, 5) to Linear(4, 3), and add a new last line, Linear(3, 5). The network becomes Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 3), Linear(3, 5), so every layer still takes in exactly as many numbers as the layer before it produces."
      },
      {
       "source": "Predicted",
       "q": "Add a hidden layer of 6 neurons right after the input instead. What changes?",
       "a": "The first line becomes Linear(2, 6), and a new second line, Linear(6, 3), feeds the old first hidden layer. The rest stays the same, giving Linear(2, 6), Linear(6, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)."
      },
      {
       "source": "Lab 9",
       "q": "A network is written Linear(4, 3), Linear(3, 5), Linear(5, 2), Linear(2, 4). How many hidden layers, inputs and outputs does it have?",
       "a": "It has three hidden layers, with 3, 5 and 2 neurons. It takes 4 numbers as input and has 4 output neurons, so it decides among 4 categories."
      },
      {
       "source": "Predicted",
       "q": "How many hidden layers does a network have if its code is Linear(2, 3), Sigmoid, Linear(3, 2), Sigmoid, Linear(2, 4), Sigmoid, Linear(4, 5)?",
       "a": "It still has three hidden layers. Sigmoid lines are not layers, because they only apply the sigmoid to the layer before them, so only the four Linear lines count, and the last one is the output layer."
      },
      {
       "source": "Predicted",
       "q": "What do the import lines do, and what does Sequential mean?",
       "a": "The import lines bring the torch library into Python, so the programs for inner products and backpropagation do not have to be written by hand. Sequential means the network is a sequence of layers, one after another, with each layer taking its input from the layer before it."
      },
      {
       "source": "Based on HW5 9",
       "q": "What happens if the learning rate is raised from 0.1 to 0.3?",
       "a": "The network learns faster, but its accuracy goes down. A larger learning rate takes bigger steps, so it approaches the answer quickly but keeps overshooting."
      },
      {
       "source": "Lab 9",
       "q": "Two learning curves differ only in learning rate. One rises fast and jumps around, and the other rises slowly and smoothly. Which used the larger learning rate?",
       "a": "The one that rises fast and jumps around used the larger learning rate. Bigger steps get near the answer quickly but overshoot, while smaller steps are slower but smoother."
      }
     ],
     "points": [
      {
       "main": "The **import lines** bring in the torch library, which already contains the programs for inner products and backpropagation, so none of it has to be written by hand.",
       "sub": ""
      },
      {
       "main": "**Sequential** means the network is a sequence of layers, one after another.",
       "sub": ""
      },
      {
       "main": "**nn.Linear(2, 3)** is a processing layer that takes input from 2 neurons and has 3 neurons.",
       "sub": "It computes inner products."
      },
      {
       "main": "The **input layer gets no line**, because it does no processing.",
       "sub": "The **last line is always the output layer**. nn.Sigmoid lines are not layers."
      },
      {
       "main": "In the code, the first number on each line must equal the second number on the line before it.",
       "sub": ""
      },
      {
       "main": "**SGD** is stochastic gradient descent, **lr** is the learning rate, **loss** is the mistake, **backward** runs backpropagation and **step** updates the weights.",
       "sub": ""
      },
      {
       "main": "**A higher learning rate learns faster but less accurately.",
       "sub": "A lower one learns more accurately but more slowly.**"
      }
     ]
    },
    {
     "id": "sigmoid",
     "tier": "Likely",
     "lectures": "Lectures 15 and 16",
     "title": "The sigmoid and where the idea came from",
     "know": [
      "From the brain: **Lord Edgar Adrian** won the Nobel Prize in 1932 for showing that **neurons are nearly digital**, either firing or not firing.",
      "What it does: The **sigmoid** takes an inner product and returns a number between 0 and 1.",
      "Values: A large negative input gives about **0** (off), a large positive input gives about **1** (on), and an input of exactly 0 gives **0.5**.",
      "Perception: Very different things can be perceived as the same (a friend with or without a hat), and very similar things as different (USC and UCLA), just like the flat parts and the steep middle of the sigmoid.",
      "In code: nn.Sigmoid goes after each hidden layer. The last layer has no sigmoid, because its outputs go to the loss, which turns them into probabilities.",
      "Bigger idea: Many basic ideas in AI, including neurons, inner products and near-digital firing, come from discoveries about real brains."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Where does the idea of the sigmoid come from?",
       "a": "It comes from biology. Lord Edgar Adrian discovered that real neurons are nearly digital, firing or not firing, and won the Nobel Prize in 1932. The sigmoid copies this by squashing any inner product into a number between 0 and 1, so a neuron is nearly off or nearly on."
      },
      {
       "source": "Lab 9",
       "q": "A hidden neuron's inner product is minus 2. Is its sigmoid activation closer to 0 or 1, and what does that mean?",
       "a": "It is closer to 0, because the input is negative. The neuron is mostly off and fires only rarely."
      },
      {
       "source": "Lab 9",
       "q": "If one input to that neuron goes up through a positive weight, what happens to its linear activation and its sigmoid activation?",
       "a": "Both go up. The larger input times a positive weight raises the inner product, and the sigmoid always rises when its input rises, so the neuron fires more often."
      },
      {
       "source": "Lab 9",
       "q": "What is the sigmoid activation if the linear activation is exactly 0?",
       "a": "It is 0.5, halfway between off and on, so the neuron is half active."
      },
      {
       "source": "Predicted",
       "q": "How does the sigmoid match human perception?",
       "a": "Some very different things are perceived as the same, and some very similar things are perceived as different. The flat parts of the sigmoid give the same output for very different inputs, such as minus 100 and minus 1000, while the steep middle gives very different outputs for two nearly equal inputs on either side of zero."
      }
     ],
     "points": [
      {
       "main": "**Lord Edgar Adrian** won the Nobel Prize in 1932 for showing that **neurons are nearly digital**, either firing or not firing.",
       "sub": ""
      },
      {
       "main": "The **sigmoid** takes an inner product and returns a number between 0 and 1.",
       "sub": ""
      },
      {
       "main": "A large negative input gives about **0** (off), a large positive input gives about **1** (on), and an input of exactly 0 gives **0.5**.",
       "sub": ""
      },
      {
       "main": "Very different things can be perceived as the same (a friend with or without a hat), and very similar things as different (USC and UCLA), just like the flat parts and the steep middle of the sigmoid.",
       "sub": ""
      },
      {
       "main": "In the code, nn.Sigmoid goes after each hidden layer.",
       "sub": "The last layer has no sigmoid, because its outputs go to the loss, which turns them into probabilities."
      },
      {
       "main": "Many basic ideas in AI, including neurons, inner products and near-digital firing, come from discoveries about real brains.",
       "sub": ""
      }
     ]
    },
    {
     "id": "training",
     "tier": "Likely",
     "lectures": "Lecture 16",
     "title": "Training results: chance, overlap and repeated runs",
     "know": [
      "Chance: Accuracy starts at **20 percent**, because with random weights the network knows nothing, and a random guess among **five** vowels is right one time in five.",
      "Other counts: With ten categories, chance would be 10 percent.",
      "Epoch: Each pass of learning is an **epoch**, and a problem like this takes thousands of them.",
      "Leveling off: The network jumps to about 40 percent and levels off near **45 percent**, because the real vowel data **overlap** so much.",
      "Overlap: Peterson and Barney found this overlap in the early 1950s. Even a person would have to guess for a point in the middle of the overlap.",
      "Repeated runs: Ten runs from different random starting weights take **different paths but end at the same accuracy**, like children who hear different input but learn the same language.",
      "Memorizing: Children first say went correctly by memory, then say goed after learning the pattern, then learn the exception (Carol Chomsky)."
     ],
     "questions": [
      {
       "source": "Based on HW5 10",
       "q": "Why does accuracy start at 20 percent?",
       "a": "There are five categories, and with random weights the network knows nothing, so its guesses are no better than chance. Guessing at random among five vowels is right one time in five, which is 20 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does accuracy start at 10 percent for a network with ten output categories?",
       "a": "With random weights the network's guesses are no better than chance, and a random guess among ten categories is right one time in ten, which is 10 percent."
      },
      {
       "source": "Predicted",
       "q": "Why does the vowel network level off near 40 to 45 percent instead of 100 percent?",
       "a": "The real formant data for the five vowels overlap a great deal, so many recordings with nearly the same F1 and F2 belong to different vowels. For a point in the middle of the overlap, even a person would have to guess, so no network can classify those points reliably."
      },
      {
       "source": "Predicted",
       "q": "Ten training runs start from different random weights. What happens?",
       "a": "The runs take different paths, with some jumping up early and some staying at chance longer, but all of them end at about the same accuracy. Stochastic gradient descent involves chance along the way, but the end point is the same."
      }
     ],
     "points": [
      {
       "main": "Accuracy starts at **20 percent**, because with random weights the network knows nothing, and a random guess among **five** vowels is right one time in five.",
       "sub": ""
      },
      {
       "main": "With ten categories, chance would be 10 percent.",
       "sub": ""
      },
      {
       "main": "Each pass of learning is an **epoch**, and a problem like this takes thousands of them.",
       "sub": ""
      },
      {
       "main": "The network jumps to about 40 percent and levels off near **45 percent**, because the real vowel data **overlap** so much.",
       "sub": ""
      },
      {
       "main": "Peterson and Barney found this overlap in the early 1950s.",
       "sub": "Even a person would have to guess for a point in the middle of the overlap."
      },
      {
       "main": "Ten runs from different random starting weights take **different paths but end at the same accuracy**, like children who hear different input but learn the same language.",
       "sub": ""
      },
      {
       "main": "Children first say went correctly by memory, then say goed after learning the pattern, then learn the exception (Carol Chomsky).",
       "sub": ""
      }
     ]
    },
    {
     "id": "lead-up",
     "tier": "Likely",
     "lectures": "Lecture 17 (start) and Lecture 18",
     "title": "Leading up to LLMs: from one neuron to networks that unfold over time",
     "note": "This is the part of Lecture 17 before LLMs, so it falls inside \"up to right before we got to LLMs.\" Lecture 18 opens by reviewing the same ideas.",
     "know": [
      "All-or-none: The first paper on artificial neural networks, by McCulloch and Pitts, started from the all-or-none behavior of real neurons. A neuron is either firing or not firing, which is the same idea as the **sigmoid**.",
      "From biology: The earliest neural network work tried to model how the mind works, including mental illness, so the field began in biology rather than in technology.",
      "Parallel Distributed Processing: **Parallel** means many neurons calculate their activations at the same time. **Distributed** means the information from the inputs is spread across all the neurons. By the time of these books, forward propagation and backpropagation were well worked out.",
      "Neuron: A neuron takes in a vector and gives back one number. It multiplies each input by its weight and adds the results, which is the **inner product**.",
      "Neural network: A neural network repeats the inner product layer after layer. It takes in one vector and gives back a vector of decisions.",
      "The limit: The vowel network takes one **static** vector, a fixed list of numbers from one moment, and makes one decision. Speech changes all the time and a sentence is many words one after another, so one fixed list of numbers cannot model thinking that unfolds over time.",
      "Recurrent network: Michael Jordan built the **recurrent** network to model speech production, because features such as nasality and lip rounding switch on and off at different moments. The network sends its own output back into part of its input, so what it produces at one moment helps predict the next.",
      "Plan and state units: Plan units and state units feed the hidden layer, the hidden layer feeds the output, and the output is copied back into the state units. The same weights are used at every step.",
      "The path to GPT: GPT works the same way, one word at a time. It predicts the next word, adds it to the prompt, and feeds everything back in to predict the word after that. Years like 1943, 1985 and 2017 give the history, but he said years are not asked."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "How does the all-or-none behavior of neurons connect to the sigmoid?",
       "a": "They are the same idea. A real neuron is either firing or not firing, and the sigmoid turns an inner product into a number near 0 (off) or near 1 (on), with a steep change in between."
      },
      {
       "source": "Predicted",
       "q": "What do parallel and distributed mean in Parallel Distributed Processing?",
       "a": "Parallel means many neurons calculate their activations at the same time. Distributed means the information from the inputs is spread across all the neurons rather than stored in one place."
      },
      {
       "source": "Predicted",
       "q": "What does a single neuron take in and give back? What about a neural network?",
       "a": "A neuron takes in a vector and gives back one number, the inner product of the inputs and their weights. A neural network repeats the inner product layer after layer, so it takes in one vector and gives back a vector of decisions."
      },
      {
       "source": "Predicted",
       "q": "Why can't the vowel network model a sentence or speech over time?",
       "a": "It takes one static vector, F1 and F2 from one moment, and makes one decision. Speech changes all the time and a sentence is many words one after another, so it needs a network that works through a sequence."
      },
      {
       "source": "Predicted",
       "q": "What makes Jordan's network recurrent, and why did he build it?",
       "a": "It sends its own output back into part of its input, copying the output into the state units, so what it produced at one moment helps predict the next. He built it because speech production changes over time, as features like nasality and lip rounding switch on and off."
      },
      {
       "source": "Predicted",
       "q": "How is a recurrent network different from an nn.Sequential network?",
       "a": "In a Sequential network, the input passes through the layers once, from the input to the output, and makes one decision. A recurrent network loops its output back into its input, so it works through a sequence step by step."
      },
      {
       "source": "Predicted",
       "q": "How does GPT use the same idea as Jordan's network?",
       "a": "GPT also feeds its own output back in. It predicts the next word, adds that word to the prompt, and predicts again, one word at a time."
      }
     ],
     "points": [
      {
       "main": "The first paper on artificial neural networks, by McCulloch and Pitts, started from the all-or-none behavior of real neurons.",
       "sub": "A neuron is either firing or not firing, which is the same idea as the **sigmoid**."
      },
      {
       "main": "The earliest neural network work tried to model how the mind works, including mental illness, so the field began in biology rather than in technology.",
       "sub": ""
      },
      {
       "main": "The 1986 **Parallel Distributed Processing** books gave the field its name.",
       "sub": "**Parallel** means many neurons calculate their activations at the same time, and **distributed** means the information from the inputs is spread across all the neurons. By then, forward propagation and backpropagation were well worked out."
      },
      {
       "main": "A neuron takes in a vector and gives back one number.",
       "sub": "It multiplies each input by its weight and adds the results, which is the **inner product**."
      },
      {
       "main": "A neural network repeats the inner product layer after layer.",
       "sub": "It takes in one vector and gives back a vector of decisions."
      },
      {
       "main": "The vowel network takes one **static** vector, a fixed list of numbers from one moment, and makes one decision.",
       "sub": "Speech changes all the time and a sentence is many words one after another, so one fixed list of numbers cannot model thinking that unfolds over time."
      },
      {
       "main": "Michael Jordan built the **recurrent** network to model speech production, because features such as nasality and lip rounding switch on and off at different moments.",
       "sub": "The network sends its own output back into part of its input, so what it produces at one moment helps predict the next."
      },
      {
       "main": "Plan units and state units feed the hidden layer, the hidden layer feeds the output, and the output is copied back into the state units.",
       "sub": "The same weights are used at every step."
      },
      {
       "main": "GPT works the same way, one word at a time.",
       "sub": "It predicts the next word, adds it to the prompt, and feeds everything back in to predict the word after that. Years like 1943, 1985 and 2017 give the history, but he said years are not asked."
      }
     ]
    },
    {
     "id": "heads-layers",
     "tier": "Almost certain",
     "lectures": "Lecture 18",
     "title": "Heads and layers",
     "note": "On Nov 5 he said heads are a question on the exam, and the Lecture 18 slide says the same. This is the one LLM topic he named for the exam, so it stays Almost certain.",
     "know": [
      "Layer: A layer is one round of improvement. Layers go one after another, from the input to the output.",
      "Head: A head is one expert, and it is a set of weights. Heads sit side by side inside each layer.",
      "What a layer does: Each head gives its own opinion on how to improve the vectors, and the layer combines all of the heads' opinions into improved vectors. The next layer then does the same thing again.",
      "Classroom comparison: The classes you visit one after another are the layers, and the students in each class who each give you an opinion are the heads.",
      "Depth and width: Layers give an LLM depth, one round of improvement after another. Heads give it width, many experts asked at the same time in each round.",
      "Why so many: Predicting the next word is so hard that large systems have a hundred or more layers with about a hundred heads in each.",
      "How heads learn: If the predicted next word is wrong, every head in every layer adjusts its weights with backpropagation, so the next prediction is closer to the right word."
     ],
     "questions": [
      {
       "source": "Lecture 18",
       "q": "What are heads, and how do they relate to layers?",
       "a": "A head is one expert, a set of weights that gives its own opinion on how to improve the vectors. Heads sit side by side inside each layer, and the layer combines all of their opinions into improved vectors. Layers go one after another from the input to the output, so each layer improves the vectors again."
      },
      {
       "source": "Predicted",
       "q": "In the classroom comparison, what are the classes and what are the students?",
       "a": "The classes are the layers, because you visit them one after another. The students in each class are the heads, because each one gives you a separate opinion at the same time, and you combine those opinions before moving on to the next class."
      },
      {
       "source": "Predicted",
       "q": "Which gives an LLM depth and which gives it width, heads or layers?",
       "a": "Layers give it depth, because they are rounds of improvement that come one after another. Heads give it width, because many of them work side by side inside the same layer."
      },
      {
       "source": "Predicted",
       "q": "An LLM has 5 layers with 4 heads in each layer. How many heads does it have, and which of them work at the same time?",
       "a": "It has 20 heads, because each of the 5 layers has 4. The 4 heads inside one layer work side by side at the same time, and the layers come one after another, so layer 2 works on the vectors that layer 1 improved."
      },
      {
       "source": "Predicted",
       "q": "The LLM predicts bark instead of barks after \"the dog that my parents ... \". Which weights change?",
       "a": "The weights of every head in every layer change. Backpropagation assigns each weight its share of the blame for the wrong prediction, and each one is adjusted a little so that the next prediction is closer to barks."
      },
      {
       "source": "Predicted",
       "q": "Where is the knowledge of an LLM stored?",
       "a": "It is stored in its weights. Each head is a set of weights, so the knowledge is spread across all the heads in all the layers, the same way the vowel network's knowledge is in its weights."
      }
     ],
     "points": [
      {
       "main": "A layer is one round of improvement.",
       "sub": "Layers go one after another, from the input to the output."
      },
      {
       "main": "A head is one expert, and it is a set of weights.",
       "sub": "Heads sit side by side inside each layer."
      },
      {
       "main": "Each head gives its own opinion on how to improve the vectors, and the layer combines all of the heads' opinions into improved vectors.",
       "sub": "The next layer then does the same thing again."
      },
      {
       "main": "In the classroom comparison, the classes you visit one after another are the layers, and the students in each class who each give you an opinion are the heads.",
       "sub": ""
      },
      {
       "main": "Layers give an LLM depth, one round of improvement after another.",
       "sub": "Heads give it width, many experts asked at the same time in each round."
      },
      {
       "main": "Predicting the next word is so hard that large systems have a hundred or more layers with about a hundred heads in each.",
       "sub": ""
      },
      {
       "main": "If the predicted next word is wrong, every head in every layer adjusts its weights with backpropagation, so the next prediction is closer to the right word.",
       "sub": ""
      }
     ]
    },
    {
     "id": "llm-sequences",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "From the vowel network to an LLM: many vectors in, the next item out",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely. Lab 9 Part 4 asks this comparison directly.",
     "know": [
      "The prediction game: An LLM is given 15 vectors and predicts the sixteenth. The sixteenth is a probability distribution over what could come next, such as each of about 30,000 English words.",
      "Vectors can be anything: The vectors can be words, frames of a spectrogram, patches of an image or the amino acids of a protein. The LLM only ever sees lists of numbers, so the same design works for all of them.",
      "Long-distance connections: In \"the dog that my parents, who I love very much, ... \", the next word is barks, because it goes with the singular dog no matter how many words come in between. An LLM learns this from data, not from a taught rule.",
      "How an LLM learns: It predicts the next word, such as mat after \"the cat sat on the\". When the prediction is wrong, backpropagation adjusts the weights, and this is repeated with a huge number of sentences.",
      "Underneath everything: Inference is inner products, and learning is stochastic gradient descent plus dynamic programming.",
      "Hallucination: An LLM predicts from past data, so something its data does not cover can make it make things up."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "What is the difference between the input and output of the vowel network and those of an LLM?",
       "a": "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."
      },
      {
       "source": "Predicted",
       "q": "An LLM is given 15 vectors and predicts the sixteenth. Name three things the vectors can stand for.",
       "a": "They can be the words of a sentence, the frames of a spectrogram or the patches of an image, and they can also be the amino acids of a protein. The LLM only sees lists of numbers, so the same prediction game works for all of them."
      },
      {
       "source": "Predicted",
       "q": "What does the sixteenth vector look like, and does it add up to anything?",
       "a": "It is a probability distribution over what could come next, with one number for each possible next item, such as each English word. Because it is a probability distribution, its numbers add up to one."
      },
      {
       "source": "Predicted",
       "q": "Why is the next word barks and not bark in \"the dog that my parents, who I love very much, ... \"?",
       "a": "Barks goes with the singular word dog, no matter how many words come in between, even the plural word parents. To predict it, an LLM has to use a word far back in the sequence, which it learns from data by doing inner products layer after layer."
      },
      {
       "source": "Predicted",
       "q": "Why can an LLM hallucinate?",
       "a": "It predicts from past data. When it meets something its data does not cover, its prediction can turn into a guess, so it can make things up."
      }
     ],
     "points": [
      {
       "main": "An LLM is given 15 vectors and predicts the sixteenth.",
       "sub": "The sixteenth is a probability distribution over what could come next, such as each of about 30,000 English words."
      },
      {
       "main": "The vectors can be words, frames of a spectrogram, patches of an image or the amino acids of a protein.",
       "sub": "The LLM only ever sees lists of numbers, so the same design works for all of them."
      },
      {
       "main": "In \"the dog that my parents, who I love very much, ...",
       "sub": "\", the next word is barks, because it goes with the singular dog no matter how many words come in between. An LLM learns this from data, not from a taught rule."
      },
      {
       "main": "An LLM learns by predicting the next word, such as mat after \"the cat sat on the\".",
       "sub": "When the prediction is wrong, backpropagation adjusts the weights, and this is repeated with a huge number of sentences."
      },
      {
       "main": "Underneath everything, inference is inner products, and learning is stochastic gradient descent plus dynamic programming.",
       "sub": ""
      },
      {
       "main": "An LLM predicts from past data, so something its data does not cover can make it make things up.",
       "sub": ""
      }
     ]
    },
    {
     "id": "gestalt-cloze",
     "tier": "Possible",
     "lectures": "Lecture 17",
     "title": "Gestalt completion and the cloze test",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely.",
     "know": [
      "Gestalt completion: People see a triangle in the Gestalt figure even though no triangle is drawn, because a large part of human knowledge is completing what is missing.",
      "Closure: Closure is the Gestalt word for completing a familiar pattern that is not quite finished, such as seeing a broken circle as whole.",
      "Cloze test: Words are removed from a text and people fill them in. The name comes from closure, and it tests knowledge by asking someone to complete a sequence.",
      "LLM learning: An LLM predicting the next word is playing a cloze game again and again. Training a system only to predict the missing piece turns out to copy human thinking."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Describe the Gestalt principle of closure, and how an LLM uses it to learn.",
       "a": "Closure is completing a familiar pattern that is not quite finished, such as seeing a triangle where none is drawn or a broken circle as whole. An LLM learns the same way, by predicting the missing next piece of a sequence again and again and correcting its weights when it is wrong."
      },
      {
       "source": "Predicted",
       "q": "What is a cloze test, and why is an LLM's training like one?",
       "a": "In a cloze test, words are removed from a text and people fill them in, so knowledge is tested by completing a sequence. An LLM is trained by filling in the next word over and over, so for an LLM, completion is what knowledge is."
      },
      {
       "source": "Predicted",
       "q": "Why do people see a triangle in the Gestalt figure?",
       "a": "No triangle is drawn, but people complete the missing parts because the pattern is familiar. This completion is the Gestalt principle of closure."
      }
     ],
     "points": [
      {
       "main": "People see a triangle in the Gestalt figure even though no triangle is drawn, because a large part of human knowledge is completing what is missing.",
       "sub": ""
      },
      {
       "main": "Closure is the Gestalt word for completing a familiar pattern that is not quite finished, such as seeing a broken circle as whole.",
       "sub": ""
      },
      {
       "main": "In a **cloze test**, words are removed from a text and people fill them in.",
       "sub": "The name comes from closure, and it tests knowledge by asking someone to complete a sequence."
      },
      {
       "main": "An LLM predicting the next word is playing a cloze game again and again.",
       "sub": "Training a system only to predict the missing piece turns out to copy human thinking."
      }
     ]
    },
    {
     "id": "recurrent-dynamical",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "The LLM as a dynamical system",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely.",
     "know": [
      "Dynamical system: A dynamical system is a rule that is fed its own output again and again. In the harmonic oscillator, position and velocity take turns updating, and step by step the rule draws a cosine.",
      "The LLM as a dynamical system: In the lecture's account, each layer is the rule and the depth of the layers plays the role of time. The input vectors are the initial conditions, and each layer turns them into better vectors until the last layer can predict the next word."
     ],
     "questions": [
      {
       "source": "Predicted",
       "q": "Why is an LLM called a dynamical system?",
       "a": "A dynamical system is a rule fed its own output again and again, starting from initial conditions. In an LLM the input vectors are the initial conditions, and each layer applies its weights to turn them into better vectors, so the depth of the layers plays the role of time."
      },
      {
       "source": "Predicted",
       "q": "In the harmonic oscillator, which two numbers update, and in what order?",
       "a": "Position x and velocity v take turns. First the new x is calculated from the old v, then the new v is calculated from the new x, and step by step the rule draws a cosine for x."
      }
     ],
     "points": [
      {
       "main": "A dynamical system is a rule that is fed its own output again and again.",
       "sub": "In the harmonic oscillator, position and velocity take turns updating, and step by step the rule draws a cosine."
      },
      {
       "main": "In the lecture's account, each layer is the rule and the depth of the layers plays the role of time.",
       "sub": "The input vectors are the initial conditions, and each layer turns them into better vectors until the last layer can predict the next word."
      }
     ]
    },
    {
     "id": "agentic",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "Agentic systems and Software 3.0",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely. Lab 9 Part 4 asks what an agentic system is and what its loop prevents.",
     "know": [
      "Agentic system: An agentic system is a group of LLMs connected so that one's output becomes the next one's input. An agent in AI today is just an LLM.",
      "The lecture example: An outline LLM plans the answer, a writing LLM writes it, a critic LLM checks it, a revision LLM works back and forth with the critic, and a final LLM produces the answer the user sees.",
      "The critic loop: The draft goes back and forth between the critic and the reviser until the critic is satisfied or a limit is reached. The loop greatly reduced hallucination.",
      "Shared memory and fixed weights: Once each LLM is trained its weights usually do not change, and the agents share a common memory where they write and read information.",
      "Software 1.0, 2.0 and 3.0: Software 1.0 is writing a program in a language such as Python. Software 2.0 is training a neural network on input and output data, so the program is its weights. Software 3.0 is having an agentic system build and run the program from plain English instructions, which is called vibe coding."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "What is an agentic system, in terms of LLMs? Describe the example from lecture.",
       "a": "It is a graph of LLMs, each with its own job, connected so that one's output becomes the next one's input. One LLM outlines, one writes, one critiques, one revises and one produces the final version, with a loop between the critic and the reviser until the critic is satisfied or the limit is reached."
      },
      {
       "source": "Lab 9",
       "q": "What does the critic loop do, and what does it prevent that was common in earlier LLMs?",
       "a": "It sends the draft back until the critic is satisfied, so errors are caught and fixed instead of being presented. It prevents hallucination, which was a common problem for earlier LLMs."
      },
      {
       "source": "Predicted",
       "q": "What would happen if the critic LLM were removed?",
       "a": "The draft would go straight from writing to the final answer without being checked. More made-up statements would reach the user, because the critic loop is what greatly reduced hallucination."
      },
      {
       "source": "Predicted",
       "q": "What is the difference between Software 2.0 and Software 3.0?",
       "a": "In Software 2.0, a neural network is trained on input and output data, so the program is its weights. In Software 3.0, an agentic system builds and runs the program from plain English instructions, as in vibe coding."
      }
     ],
     "points": [
      {
       "main": "An agentic system is a group of LLMs connected so that one's output becomes the next one's input.",
       "sub": "An agent in AI today is just an LLM."
      },
      {
       "main": "In the lecture example, an outline LLM plans the answer, a writing LLM writes it, a critic LLM checks it, a revision LLM works back and forth with the critic, and a final LLM produces the answer the user sees.",
       "sub": ""
      },
      {
       "main": "The draft goes back and forth between the critic and the reviser until the critic is satisfied or a limit is reached.",
       "sub": "The loop greatly reduced hallucination."
      },
      {
       "main": "Once each LLM is trained its weights usually do not change, and the agents share a common memory where they write and read information.",
       "sub": ""
      },
      {
       "main": "Software 1.0 is writing a program in a language such as Python.",
       "sub": "Software 2.0 is training a neural network on input and output data, so the program is its weights. Software 3.0 is having an agentic system build and run the program from plain English instructions, which is called vibe coding."
      }
     ]
    },
    {
     "id": "phonotactics",
     "tier": "Possible",
     "lectures": "Lectures 17 and 18",
     "title": "Phonotactics and guessing the next letter",
     "note": "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely. Lab 9 Part 4 asks these directly.",
     "know": [
      "Phonotactics: The rules for which sounds can follow which are **phonotactics**. Every speaker knows them without being taught.",
      "Simple syllable: A simple English syllable is a consonant, a vowel and a consonant, as in Don or cup. The pattern is about sounds, not letters, so the silent e of shave does not count.",
      "Onset and coda: A cluster before the vowel is an onset, as in split, and a cluster after the vowel is a coda, as in lamp. The order is a mirror image around the vowel, so flat is a word and lfat is impossible.",
      "Syllable breaks: Atlantic is a word because t and l are on opposite sides of a syllable break, but tlantic is impossible because tl cannot start an English syllable. The sound ng can end a syllable but never start one.",
      "Other languages: Mandarin allows only nasal sounds at the end of a syllable, Russian and Polish allow clusters like zb or dl at the start of a word, and Spanish speakers add an e before st, as in estadio.",
      "Next-letter guessing: After a vowel, almost any letter can come next, so the probability distribution is flat. At the start of a word, the choices narrow to what an English onset allows, so after skr the distribution is sharply peaked on a few vowels.",
      "The GPT link: Guessing the next letter is predicting the sixteenth item, so a GPT trained only on this game learns English syllable structure.",
      "Simple syllable words: Don, mat, sit, cup, dog, fish and shave are all consonant, vowel, consonant. Ship, chin and bath also count, because sh, ch and th are each one sound spelled with two letters.",
      "Allowed onsets (before the vowel): split, flat, black and glad.",
      "Allowed codas (after the vowel): desk, help, milk and lamp.",
      "Impossible twins: flat and *lfat, help and *hepl, lamp and *lapm. Each impossible twin puts the wrong consonant next to the vowel. *Sblit and *desb are impossible too, which is why a product called desb would sound un-English.",
      "After ra_: Almost any letter can come next, such as t, n, r or l, so the distribution is flat.",
      "After sp_: Only l, r or a vowel can come next, never n.",
      "After k_: Only a vowel or n can come next, as in knee, never t.",
      "After b_ and f_: Only r, l or a vowel can come next, never n.",
      "After sh_: Only a vowel or r can come next, as in shrimp.",
      "After skr_, or m_ at the start of a word: Only a vowel can come next.",
      "After bram_: The letter b is almost certain, as in bramble, though a new syllable could also start there.",
      "Lab 9 starts: After pl_ only a vowel can come, as in play. After st_ a vowel or r can come, as in star and street, but not l or k. After th_ r, w or a vowel can come, as in three, thwart and thin, but not l or n."
     ],
     "questions": [
      {
       "source": "Lab 9",
       "q": "Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp? For each one that could not, name the problem.",
       "a": "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."
      },
      {
       "source": "Lab 9",
       "q": "Each of these starts an English word: pl_, st_ and th_. What could come next, and what could not?",
       "a": "After pl only a vowel can come, as in play, so a consonant such as n cannot. After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n."
      },
      {
       "source": "Predicted",
       "q": "After which start is the next-letter distribution flatter, ra_ or skr_? Why?",
       "a": "It is flatter after ra, because after a vowel almost any letter can come next, so the probability is spread over many letters. After skr only a vowel can come, so the probability piles onto a few vowels and the distribution is sharply peaked."
      },
      {
       "source": "Predicted",
       "q": "Why is Atlantic an English word but tlantic impossible?",
       "a": "In Atlantic, the t and the l are on opposite sides of a syllable break, so each syllable follows the rules. In tlantic, tl would have to start a syllable, and English does not allow tl at the start of a syllable."
      },
      {
       "source": "Predicted",
       "q": "Could ngop be an English word? Could flim?",
       "a": "Ngop could not, because the sound ng can end a syllable, as in ring, but can never start one. Flim could, because fl is an allowed onset, as in flat, and im is an allowed ending."
      },
      {
       "source": "Predicted",
       "q": "Why does a GPT trained only to guess the next letter end up knowing English syllable structure?",
       "a": "Its predictions can only improve by matching the patterns of English syllables, because those patterns decide which letters can come next. So the knowledge ends up in the shape of its probability distributions, flat after a vowel and peaked after a start like skr."
      },
      {
       "source": "Predicted",
       "q": "Which letter cannot come next after sp_ at the start of a word: l, r, n or a?",
       "a": "N cannot. After sp only l, r or a vowel can come, as in split, spring and spa, because spn is not an allowed English onset."
      },
      {
       "source": "Predicted",
       "q": "Which letter cannot come next after k_ at the start of a word: a, n or t?",
       "a": "T cannot. After k only a vowel or n can come, as in knee, because kt cannot start an English syllable."
      },
      {
       "source": "Predicted",
       "q": "What can come next after b_ or f_ at the start of a word, and what cannot?",
       "a": "Only r, l or a vowel can come next, as in bring, black, frog and flat. N cannot, because bn and fn cannot start an English syllable."
      },
      {
       "source": "Predicted",
       "q": "What can come next after sh_ at the start of a word?",
       "a": "Only a vowel or r can come next, as in ship and shrimp. Shr is the only cluster English allows there."
      },
      {
       "source": "Predicted",
       "q": "What can come next after skr_?",
       "a": "Only a vowel can come next, as in scream and scrap. Skr already fills the onset, so no other consonant can be added."
      },
      {
       "source": "Predicted",
       "q": "Why are lfat, hepl and lapm impossible when flat, help and lamp are words?",
       "a": "The order of a cluster is a mirror image around the vowel. In flat and help the l sits right next to the vowel, and in lamp the m does, so each impossible twin puts the wrong consonant next to the vowel."
      },
      {
       "source": "Predicted",
       "q": "Is ship a consonant, vowel, consonant word even though it has four letters?",
       "a": "Yes. The pattern is about sounds, not letters, and sh is one sound. So ship is consonant sh, vowel i, consonant p."
      }
     ],
     "points": [
      {
       "main": "The rules for which sounds can follow which are **phonotactics**.",
       "sub": "Every speaker knows them without being taught."
      },
      {
       "main": "A simple English syllable is a consonant, a vowel and a consonant, as in Don or cup.",
       "sub": "The pattern is about sounds, not letters, so the silent e of shave does not count."
      },
      {
       "main": "A cluster before the vowel is an onset, as in split, and a cluster after the vowel is a coda, as in lamp.",
       "sub": "The order is a mirror image around the vowel, so flat is a word and lfat is impossible."
      },
      {
       "main": "Atlantic is a word because t and l are on opposite sides of a syllable break, but tlantic is impossible because tl cannot start an English syllable.",
       "sub": "The sound ng can end a syllable but never start one."
      },
      {
       "main": "Mandarin allows only nasal sounds at the end of a syllable, Russian and Polish allow clusters like zb or dl at the start of a word, and Spanish speakers add an e before st, as in estadio.",
       "sub": ""
      },
      {
       "main": "After a vowel, almost any letter can come next, so the probability distribution is flat.",
       "sub": "At the start of a word, the choices narrow to what an English onset allows, so after skr the distribution is sharply peaked on a few vowels."
      },
      {
       "main": "Guessing the next letter is predicting the sixteenth item, so a GPT trained only on this game learns English syllable structure.",
       "sub": ""
      },
      {
       "main": "Don, mat, sit, cup, dog, fish and shave are all consonant, vowel, consonant.",
       "sub": "Ship, chin and bath also count, because sh, ch and th are each one sound spelled with two letters."
      },
      {
       "main": "Allowed onsets, the clusters before the vowel, include split, flat, black and glad.",
       "sub": ""
      },
      {
       "main": "Allowed codas, the clusters after the vowel, include desk, help, milk and lamp.",
       "sub": ""
      },
      {
       "main": "Real words have impossible twins, such as flat and *lfat, help and *hepl, and lamp and *lapm.",
       "sub": "Each impossible twin puts the wrong consonant next to the vowel. *Sblit and *desb are impossible too, which is why a product called desb would sound un-English."
      },
      {
       "main": "After ra, almost any letter can come next, such as t, n, r or l, so the distribution is flat.",
       "sub": ""
      },
      {
       "main": "After sp at the start of a word, only l, r or a vowel can come next, never n.",
       "sub": ""
      },
      {
       "main": "After k at the start of a word, only a vowel or n can come next, as in knee, never t.",
       "sub": ""
      },
      {
       "main": "After b or f at the start of a word, only r, l or a vowel can come next, never n.",
       "sub": ""
      },
      {
       "main": "After sh at the start of a word, only a vowel or r can come next, as in shrimp.",
       "sub": ""
      },
      {
       "main": "After skr, or after m at the start of a word, only a vowel can come next.",
       "sub": ""
      },
      {
       "main": "After bram, the letter b is almost certain, as in bramble, though a new syllable could also start there.",
       "sub": ""
      },
      {
       "main": "In Lab 9, after pl only a vowel can come, as in play.",
       "sub": "After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n."
      }
     ]
    }
   ]
  }
 },
 "labs": [
  {
   "id": "lab5",
   "title": "Lab 5: Simple and complex vibrations",
   "date": "Module II, first lab",
   "use": "Matches review questions 1 to 9. Worth reading.",
   "material": [
    "Mode 1 in every chain: All masses move up and down together as if they were one mass, and no spring stretches. It is always the lowest-frequency mode.",
    "Mode 2: The masses split into two groups moving in opposite directions. A mass sitting at the boundary between the two halves, such as the middle mass when there is an odd number, does not move.",
    "Mode N: Mode N has N bumps, and neighboring bumps move in opposite directions. The highest mode of N masses is Mode N, where every mass moves opposite to its neighbor.",
    "String: A string is a mass-spring system with infinitely many masses. Its modes rise in equal steps, 100, 200, 300 Hz, because Mode N contains N copies of Mode 1.",
    "Complex vibration: Adding the simple modes together gives a complex vibration. Its shape is hard to read, but one point on the string repeats every period, and F0 is one divided by that period.",
    "Fourier transform: Recovering which simple sine waves make up a complex wave is the Fourier transform. A **spectral slice** in Praat is the result of that calculation.",
    "Membrane: The same idea works on a surface. A mode labeled (2, 1) has two bumps along the length and one across the width.",
    "Praat test of the theory: Theory, the vocal folds are a membrane. Prediction, a vowel is a complex vibration whose spectrum has **equidistant** peaks. Result, the peaks in a recorded vowel's spectral slice are evenly spaced, so the prediction held.",
    "Spectral slice axes: Frequency in hertz on the horizontal axis, amplitude in decibels on the vertical axis."
   ],
   "questions": [
    {
     "q": "What do all mass-spring systems do in Mode 1?",
     "a": "All the masses move up and down together, as if they were one mass, so no spring stretches. Mode 1 is always the lowest-frequency mode."
    },
    {
     "q": "How does the frequency of a string change from Mode 1 to Mode 5?",
     "a": "It increases by the same step each time, such as 100, 200, 300, 400 and 500 Hz. Mode N has N bumps, so it is N times the frequency of Mode 1."
    },
    {
     "q": "What two things does a recorded vowel need to show to support the theory that the vocal folds are a membrane?",
     "a": "The waveform must be a complex vibration, not a simple sine wave, and its spectrum must be a combination of simple vibrations at equidistant frequencies. A recorded vowel shows both, so the prediction holds."
    }
   ],
   "points": [
    {
     "main": "In Mode 1 of every chain, all the masses move up and down together as if they were one mass, and no spring stretches.",
     "sub": "It is always the lowest-frequency mode."
    },
    {
     "main": "In Mode 2, the masses split into two groups moving in opposite directions.",
     "sub": "A mass sitting at the boundary between the two halves, such as the middle mass when there is an odd number, does not move."
    },
    {
     "main": "Mode N has N bumps, and neighboring bumps move in opposite directions.",
     "sub": "The highest mode of N masses is Mode N, where every mass moves opposite to its neighbor."
    },
    {
     "main": "A string is a mass-spring system with infinitely many masses.",
     "sub": "Its modes rise in equal steps, 100, 200, 300 Hz, because Mode N contains N copies of Mode 1."
    },
    {
     "main": "Adding the simple modes together gives a complex vibration.",
     "sub": "Its shape is hard to read, but one point on the string repeats every period, and F0 is one divided by that period."
    },
    {
     "main": "Recovering which simple sine waves make up a complex wave is the Fourier transform.",
     "sub": "A **spectral slice** in Praat is the result of that calculation."
    },
    {
     "main": "A **membrane** works the same way on a surface.",
     "sub": "A mode labeled (2, 1) has two bumps along the length and one across the width."
    },
    {
     "main": "Praat was used to test the theory that the vocal folds are a membrane.",
     "sub": "The theory predicts that a vowel is a complex vibration whose spectrum has **equidistant** peaks, and the peaks in a recorded vowel's spectral slice are evenly spaced, so the prediction held."
    },
    {
     "main": "A spectral slice has frequency in hertz on the horizontal axis and amplitude in decibels on the vertical axis.",
     "sub": ""
    }
   ]
  },
  {
   "id": "lab6",
   "title": "Lab 6: Fixed-fixed, fixed-free and the vocal tract",
   "date": "Oct 19",
   "use": "Matches review questions 4, 6, 7, 11 to 17 and 19. The most useful lab for the physics questions.",
   "material": [
    "Reading formants in Praat: In a spectrogram, **F1 is the lowest dark band and F2 is the next one up**. Clicking a band shows its frequency, and Praat's formant tracker gives the same values as red dots.",
    "Typical results: dean or dune has the lowest F1, Don or Dan the highest F1, and dean the highest F2. Many Californians front their oo, so dune can have a high F2.",
    "Three masses, Mode 2: The middle mass does not move, but the springs on both sides of it are stretched and compressed, because its neighbors move.",
    "Three masses, Mode 1: The middle mass moves the most, and the two springs next to the walls stretch the most.",
    "String points: At the top of a hump the string moves the most and does not stretch. Where it crosses the resting line it does not move and stretches the most.",
    "Extra mass in the middle of a string: Mode 2 stays the same (the middle is still), and Mode 3 goes down (the middle swings).",
    "Extra stiffness in the middle: Mode 2 goes up (the middle stretches the most), and Mode 3 stays the same (no stretching at the bottom of a hump).",
    "Fixed-free string: Modes at 100, 300 and 500 Hz, one, three and five quarter-waves, 200 Hz apart. The free top always moves the most and the fixed bottom always stretches the most.",
    "Vocal tract table: Don (one-third) compressed in Mode 1 and moving in Mode 2, so F1 up and F2 down. Dean (two-thirds) moving in Mode 1 and compressed in Mode 2, so F1 down and F2 up. Dune (lips) moving in both, so both down."
   ],
   "questions": [
    {
     "q": "In Mode 2 of a 3-mass system, is mass 2 moving, and are its springs stretching?",
     "a": "Mass 2 is not moving, but the springs attached to it are stretching. Its neighbors move in opposite directions, so the springs on both sides are pulled and compressed."
    },
    {
     "q": "You add extra mass at the free top of a fixed-free string. What happens to Mode 1 and Mode 2?",
     "a": "Both go down. The free end moves the most in every mode, so the extra mass counts in both modes and lowers both frequencies."
    },
    {
     "q": "You stiffen a fixed-free string at its fixed bottom. What happens to Mode 1 and Mode 2?",
     "a": "Both go up. The fixed end stretches the most in every mode, so the extra stiffness counts in both and raises both frequencies."
    },
    {
     "q": "Does the extra mass and stiffness of a constriction simply cancel out?",
     "a": "No. At a location where the air mostly moves, the extra mass wins and the formant goes down, and at a location where the air is mostly compressed, the extra stiffness wins and the formant goes up. The same constriction can affect F1 and F2 differently."
    }
   ],
   "points": [
    {
     "main": "In a spectrogram, **F1 is the lowest dark band and F2 is the next one up**.",
     "sub": "Clicking a band shows its frequency, and Praat's formant tracker gives the same values as red dots."
    },
    {
     "main": "In the class recordings, dean or dune has the lowest F1, Don or Dan the highest F1, and dean the highest F2.",
     "sub": "Many Californians front their oo, so dune can have a high F2."
    },
    {
     "main": "In Mode 2 of three masses, the middle mass does not move, but the springs on both sides of it are stretched and compressed, because its neighbors move.",
     "sub": ""
    },
    {
     "main": "In Mode 1 of three masses, the middle mass moves the most, and the two springs next to the walls stretch the most.",
     "sub": ""
    },
    {
     "main": "On a string, the top of a hump moves the most and does not stretch.",
     "sub": "Where the string crosses the resting line, it does not move and stretches the most."
    },
    {
     "main": "Extra mass in the middle of a string leaves Mode 2 the same, because the middle is still, and lowers Mode 3, because the middle swings.",
     "sub": ""
    },
    {
     "main": "Extra stiffness in the middle of a string raises Mode 2, because the middle stretches the most there, and leaves Mode 3 the same, because there is no stretching at the bottom of a hump.",
     "sub": ""
    },
    {
     "main": "A fixed-free string has modes at 100, 300 and 500 Hz, which are one, three and five quarter-waves, 200 Hz apart.",
     "sub": "Its free top always moves the most, and its fixed bottom always stretches the most."
    },
    {
     "main": "For Don, the constriction is one-third of the way from the glottis, where the air is compressed in Mode 1 and moving in Mode 2, so F1 goes up and F2 goes down.",
     "sub": "For dean, it is two-thirds of the way, where the air is moving in Mode 1 and compressed in Mode 2, so F1 goes down and F2 goes up. For dune, it is at the lips, where the air is moving in both modes, so both go down."
    }
   ]
  },
  {
   "id": "lab7",
   "title": "Lab 7: Formants, constrictions and the first neural network",
   "date": "Late October",
   "use": "Matches review questions 16 to 19 and the network basics. The tables are good to memorize.",
   "material": [
    "Names: In a fixed-fixed system such as the vocal folds, each mode is a **harmonic**, at multiples of the first. In a fixed-free system such as the air in the vocal tract, each mode is a **formant**, at odd multiples of the first.",
    "Example with a first mode of 100 Hz: The 1st, 2nd and 3rd harmonics are 100, 200 and 300 Hz. The 1st, 2nd and 3rd formants are 100, 300 and 500 Hz.",
    "Fitting: The 1st harmonic fits into the 2nd harmonic two times. The 1st formant fits into the 2nd formant three times.",
    "Constriction effects: Compressing air raises its stiffness, and packing it tighter makes it harder to move, so its mass rises too.",
    "Summary table: Dune (lips) both F1 and F2 down. Dean (two-thirds) F1 down and F2 up, so the formants move **away** from each other. Don (one-third) F1 up and F2 down, so the formants move **together**.",
    "Formant transitions in Praat: Going from schwa to each vowel without stopping shows the bands moving in exactly the directions of the table, which is how a spectrogram can be read without hearing the sound.",
    "Network anatomy: Three kinds of neurons (input, hidden, output). A **weight** is the strength of a connection. A neuron's activation is the **inner product** of the previous activations and their weights.",
    "Output: The output neurons form a **probability distribution**, with the options on the horizontal axis and probabilities that sum to 1 on the vertical axis."
   ],
   "questions": [
    {
     "q": "Assuming the first mode is 100 Hz, what are the first three modes of a fixed-fixed system and of a fixed-free system, and what are they called?",
     "a": "The fixed-fixed system has its 1st, 2nd and 3rd harmonics at 100, 200 and 300 Hz. The fixed-free system has its 1st, 2nd and 3rd formants at 100, 300 and 500 Hz, because only the odd multiples occur."
    },
    {
     "q": "For dean, go through the four steps for F2.",
     "a": "The constriction is two-thirds of the way from the glottis. In Mode 2 the air there is compressed and stretched, so it behaves like a spring. The added stiffness is what matters, so F2 goes up."
    },
    {
     "q": "A hidden neuron receives activations 5, minus 2 and 7 through weights minus 3, 4 and 10. How is its activation computed?",
     "a": "Multiply each activation by its weight and add the results, which is the inner product. Here that is 5 times minus 3, plus minus 2 times 4, plus 7 times 10, which equals 47. The exam asks about the direction of such changes rather than the arithmetic."
    }
   ],
   "flags": [
    "The lab's Praat activity says the vowel in year decreases F1 and F2. That is incorrect, because /i/ lowers F1 and raises F2, as the lab's own summary table states.",
    "The lab's table calls the third fixed-free mode the 2nd formant. It is the 3rd formant, at 500 Hz."
   ],
   "points": [
    {
     "main": "In a fixed-fixed system such as the vocal folds, each mode is a **harmonic**, at multiples of the first.",
     "sub": "In a fixed-free system such as the air in the vocal tract, each mode is a **formant**, at odd multiples of the first."
    },
    {
     "main": "With a first mode of 100 Hz, the 1st, 2nd and 3rd harmonics are 100, 200 and 300 Hz, and the 1st, 2nd and 3rd formants are 100, 300 and 500 Hz.",
     "sub": ""
    },
    {
     "main": "The 1st harmonic fits into the 2nd harmonic two times.",
     "sub": "The 1st formant fits into the 2nd formant three times."
    },
    {
     "main": "Compressing air raises its stiffness, and packing it tighter makes it harder to move, so its mass rises too.",
     "sub": ""
    },
    {
     "main": "For dune, the constriction at the lips lowers both F1 and F2.",
     "sub": "For dean, at two-thirds, F1 goes down and F2 goes up, so the formants move **away** from each other. For Don, at one-third, F1 goes up and F2 goes down, so the formants move **together**."
    },
    {
     "main": "In Praat, going from schwa to each vowel without stopping shows the bands moving in exactly the directions of the table, which is how a spectrogram can be read without hearing the sound.",
     "sub": ""
    },
    {
     "main": "A network has three kinds of neurons, input, hidden and output.",
     "sub": "A **weight** is the strength of a connection, and a neuron's activation is the **inner product** of the previous activations and their weights."
    },
    {
     "main": "The output neurons form a **probability distribution**, with the options on the horizontal axis and probabilities that sum to 1 on the vertical axis.",
     "sub": ""
    }
   ]
  },
  {
   "id": "lab8",
   "title": "Lab 8: How a network learns, and the code",
   "date": "Nov 2",
   "use": "Matches HW5 and review questions 20 and 21. Read the training cycle and the code notes.",
   "material": [
    "Training cycle: Start with random weights once, make a guess (forward pass), measure the error (the loss), assign blame backward to each weight, adjust each weight a little, and repeat many times.",
    "Why backward: A last-layer weight affects the output directly, so its effect is easy to judge. A first-layer weight affects the output only through every later layer, so its blame is tangled with all the later weights. Settling the last layer first and reusing that answer is dynamic programming, the same idea as Viterbi.",
    "When to stop: Keep some data the network never trains on (validation data). When accuracy on it stops improving, stop training.",
    "Data: 525 recordings with F1, F2 and the vowel. Each vowel name becomes a number from 0 to 4, because the network works with numbers.",
    "Architecture: 2 input neurons (F1 and F2), hidden layers of 3, 2 and 4, and 5 outputs. The two ends are set by the data, and the hidden layers are a design choice.",
    "Sigmoid in code: nn.Sigmoid applies the sigmoid to the layer before it. The last layer has no sigmoid, because its five numbers are the scores for the five vowels.",
    "Code pieces: The optimizer (SGD) is given the weights it may change. The loss measures the error, backward computes each weight's blame, and step adjusts the weights. Repeating the cycle 1000 times is 1000 epochs."
   ],
   "questions": [
    {
     "q": "Which steps of training belong to the forward pass, and which to the backward pass?",
     "a": "The forward pass makes a guess by sending the input through the network and measures the error. The backward pass works back from the error to assign blame to each weight and adjusts the weights."
    },
    {
     "q": "Why is the optimizer created before backward runs?",
     "a": "The optimizer has to be given the list of weights it is allowed to change. It does not change anything until step runs."
    }
   ],
   "points": [
    {
     "main": "Training starts with random weights once.",
     "sub": "Then the network makes a guess (forward pass), measures the error (the loss), assigns blame backward to each weight, adjusts each weight a little, and repeats this many times."
    },
    {
     "main": "A last-layer weight affects the output directly, so its effect is easy to judge.",
     "sub": "A first-layer weight affects the output only through every later layer, so its blame is tangled with all the later weights. Settling the last layer first and reusing that answer is dynamic programming, the same idea as Viterbi."
    },
    {
     "main": "To know when to stop, keep some data the network never trains on, called validation data.",
     "sub": "When accuracy on it stops improving, stop training."
    },
    {
     "main": "The data are 525 recordings, each with F1, F2 and the vowel.",
     "sub": "Each vowel name becomes a number from 0 to 4, because the network works with numbers."
    },
    {
     "main": "The network has 2 input neurons (F1 and F2), hidden layers of 3, 2 and 4, and 5 outputs.",
     "sub": "The two ends are set by the data, and the hidden layers are a design choice."
    },
    {
     "main": "nn.Sigmoid applies the sigmoid to the layer before it.",
     "sub": "The last layer has no sigmoid, because its five numbers are the scores for the five vowels."
    },
    {
     "main": "The optimizer (SGD) is given the weights it may change.",
     "sub": "The loss measures the error, backward computes each weight's blame, and step adjusts the weights. Repeating the cycle 1000 times is 1000 epochs."
    }
   ]
  },
  {
   "id": "lab9",
   "title": "Lab 9: The TA's Exam 2 review",
   "date": "Nov 9",
   "use": "This lab is an Exam 2 review written by the TA, so it is the closest lab to the exam. It covers all four parts, from vibration to LLMs and agents. Its questions appear in the topics of Study this first, marked Lab 9.",
   "material": [
    "Part 1, vibration: N masses have N modes. A mass on the boundary between two peaks does not move. Fixed-fixed modes are harmonics at 1, 2, 3 times the first, and fixed-free modes are formants at 1, 3, 5 times the first.",
    "Reading a complex vibration: If the shape repeats every 10 ms, the period is 10 ms and F0 is 100 Hz. In a vowel, the vocal folds vibrate at that F0, which is the pitch.",
    "Part 2, vocal tract: A plain tube gives about 500, 1500 and 2500 Hz. The four steps are location, moving or compressed, which extra counts, and up or down.",
    "Part 3, networks: A neuron's linear activation is an inner product. The sigmoid turns it into a number between 0 and 1. The loss measures how far the computed output is from the desired output. Backpropagation is SGD plus dynamic programming.",
    "Weights between layers: Between a 4-neuron layer and a 2-neuron layer there are 4 times 2, which is 8 weights, one from each of the 4 neurons to each of the 2.",
    "Part 4, from the vowel network to LLMs: The vowel network takes one vector, F1 and F2, and decides among a few categories. An LLM takes a sequence of many vectors and gives a probability distribution over what the next item could be.",
    "Part 4, agents: An agentic system is a group of LLMs all talking to each other, sometimes back and forth in loops.",
    "Part 4, phonotactics: Which letter can come next in an English word is decided by syllable structure, called **phonotactics**. A GPT trained only to guess the next letter ends up with that knowledge."
   ],
   "questions": [
    {
     "q": "A vibration repeats every 10 ms. What is its F0, and which part of the speech system vibrates at that F0 in a vowel?",
     "a": "F0 is 100 Hz, because F0 is one divided by the period, and one divided by 10 ms is 100 per second. In a vowel, the vocal folds vibrate at F0, so F0 is how often they open and close, which is the pitch."
    },
    {
     "q": "How many weights connect a 4-neuron layer to a 2-neuron layer?",
     "a": "Eight. Each of the 2 neurons receives one weight from each of the 4 neurons that feed it, so there are 4 times 2 connections."
    },
    {
     "q": "What is the difference between the input and output of the vowel network and those of an LLM?",
     "a": "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."
    },
    {
     "q": "Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp?",
     "a": "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."
    },
    {
     "q": "What could come next after pl_, st_ and th_, and what could not?",
     "a": "After pl only a vowel can come, as in play. After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n."
    },
    {
     "q": "What is an agentic system, and what does its critic loop prevent?",
     "a": "It is a graph of LLMs, each with its own job, where one's output becomes the next one's input: outline, write, critique, revise and produce the final version. The loop between the critic and the reviser sends the draft back until the critic is satisfied, which prevents hallucination."
    }
   ],
   "points": [
    {
     "main": "In the vibration part, N masses have N modes, and a mass on the boundary between two peaks does not move.",
     "sub": "Fixed-fixed modes are harmonics at 1, 2, 3 times the first, and fixed-free modes are formants at 1, 3, 5 times the first."
    },
    {
     "main": "If the shape repeats every 10 ms, the period is 10 ms and F0 is 100 Hz.",
     "sub": "In a vowel, the vocal folds vibrate at that F0, which is the pitch."
    },
    {
     "main": "In the vocal tract part, a plain tube gives about 500, 1500 and 2500 Hz.",
     "sub": "The four steps are location, moving or compressed, which extra counts, and up or down."
    },
    {
     "main": "In the network part, a neuron's linear activation is an inner product, and the sigmoid turns it into a number between 0 and 1.",
     "sub": "The loss measures how far the computed output is from the desired output, and backpropagation is SGD plus dynamic programming."
    },
    {
     "main": "Between a 4-neuron layer and a 2-neuron layer there are 4 times 2, which is 8 weights, one from each of the 4 neurons to each of the 2.",
     "sub": ""
    },
    {
     "main": "In the LLM part, the vowel network takes one vector, F1 and F2, and decides among a few categories.",
     "sub": "An LLM takes a sequence of many vectors and gives a probability distribution over what the next item could be."
    },
    {
     "main": "An agentic system is a group of LLMs all talking to each other, sometimes back and forth in loops.",
     "sub": ""
    },
    {
     "main": "Which letter can come next in an English word is decided by syllable structure, called **phonotactics**.",
     "sub": "A GPT trained only to guess the next letter ends up with that knowledge."
    }
   ]
  }
 ],
 "guidePlain": [
  {
   "id": "oscillation",
   "title": "Why a mass on a spring keeps vibrating",
   "know": [
    {
     "ref": "Lecture 11 · p2",
     "lines": [
      "- **A mass-spring system vibrates because the spring keeps pulling the mass back, and the moving mass keeps going past the middle.** A **mass-spring system** is a mass attached to a spring. The spring has a resting length, called its **equilibrium position**.",
      "  - The spring always pulls or pushes toward its equilibrium position. If the spring is stretched, it pulls. If the spring is compressed, it pushes.",
      "  - A moving mass keeps moving until something stops it. It does not stop by itself.",
      "  - In short, the spring \"wants\" to rest, and the moving mass \"wants\" to keep going.",
      "- **The vibration happens in four steps that repeat.**",
      "  - First, the mass is pulled out and let go, and the stretched spring pulls the mass back toward the middle.",
      "  - Second, the mass reaches the middle while it is still moving, so it keeps going and compresses the spring.",
      "  - Third, the compressed spring pushes the mass back the other way.",
      "  - Fourth, the mass passes the middle again and stretches the spring, and the cycle starts over. This repeating back and forth is called **vibration**.",
      "- **Friction is left out of the model.** On a real table, friction slowly stops the motion. In the model there is no friction, so the mass vibrates forever.",
      "- **The same system can move in two directions.** Both directions follow the same rules, but some systems are easier to understand in one direction than the other.",
      "  - Longitudinal motion: The mass moves **left and right**, along the line of the spring.",
      "  - Transverse motion: The mass sits between **two walls** with one spring on each side, and the mass moves **up and down**, across the line of the springs.",
      "- **Longitudinal motion and transverse motion work in exactly the same way.** In transverse motion, pulling the mass up stretches both springs, and the stretched springs pull the mass back down.",
      "  - When the mass passes the middle, the springs are not stretched. The mass is still moving, so it keeps going and stretches the springs on the other side.",
      "  - Both versions vibrate at the **same rate**, because they have the same mass and the same total stiffness in the direction the mass moves."
     ]
    },
    {
     "ref": "Lecture 11 · p3",
     "lines": [
      "- **Two things set how fast a system vibrates, the mass and the stiffness.** **Frequency** is the number of back-and-forth cycles a system completes in one second. Mass and stiffness change frequency in the same way for longitudinal motion and transverse motion.",
      "- **A heavier mass vibrates more slowly.** A heavy mass is hard to start moving and hard to turn around, so each trip back and forth takes longer.",
      "  - An everyday example is tree branches. Heavy branches sway back and forth slowly, and small branches sway quickly.",
      "  - Making the mass **four times heavier cuts the rate in half**.",
      "- **A stiffer spring makes the system vibrate faster.** A stiffer spring pulls back harder, so it turns the mass around sooner.",
      "  - Making the spring **four times stiffer doubles the rate**.",
      "- **The two rules go in opposite directions. Raising the mass lowers the frequency. Raising the stiffness raises the frequency.**",
      "  - A mass changes the frequency only when the mass is moving. A mass that never moves could be made a thousand pounds heavier, and the frequency would not change at all.",
      "  - A spring changes the frequency only when the spring is stretching or compressing. A spring that never stretches adds no stiffness."
     ]
    }
   ],
   "questions": [
    {
     "q": "Why does a moving mass keep going past equilibrium even though the spring pulls it back?",
     "a": "Because a moving mass tends to keep moving, which is inertia. The spring pulls the mass back toward equilibrium, but when the mass gets there it is still moving, so it overshoots. The spring then pulls it back the other way, and the cycle repeats."
    },
    {
     "q": "Longitudinal and transverse vibration look different. Why do they work the same way?",
     "a": "Both have the same two ingredients: a spring that pulls the mass back toward equilibrium and a mass that keeps moving and overshoots. Longitudinal means the mass moves back and forth along the spring, and transverse means it moves up and down across it. Only the direction changes."
    },
    {
     "q": "What changes between longitudinal and transverse vibration, and what stays the same?",
     "a": "The direction of motion changes, along the spring versus across it. What stays the same is the pull back toward equilibrium and the overshoot, so the vibration works the same way in both."
    },
    {
     "q": "Why does more mass lower the frequency, while more stiffness raises it?",
     "a": "More mass is harder to get moving and harder to turn around, so each cycle takes longer and the frequency goes down. A stiffer spring pulls back harder, so the mass returns faster and the frequency goes up."
    },
    {
     "q": "Why do you have to say what stayed the same when you predict a frequency change?",
     "a": "Because mass and stiffness push the frequency in opposite directions. If only the mass goes up, the frequency goes down. If the mass and the stiffness both change, you have to think about both effects instead of using one rule."
    }
   ]
  },
  {
   "id": "modes",
   "title": "Modes: the different ways a whole system can vibrate",
   "know": [
    {
     "ref": "Lecture 11 · p4",
     "lines": [
      "- **Two masses can vibrate in two different ways, and each way is called a mode.** The system has two walls, one spring from each wall to a mass, and **one spring between the two masses**. All the masses are equal, and all the springs have the same stiffness.",
      "  - A **mode** is a way of vibrating. The modes are told apart by one question, which is whether the masses move together or against each other.",
      "- **In Mode 1, the masses move together.** Both masses are pulled up and let go, and they rise and fall side by side. In longitudinal motion, both masses are pulled to the left, and they move left and right as a pair.",
      "- **In Mode 2, the masses move against each other.** One mass is pulled down and the other mass is pulled up. After they are let go, one mass rises whenever the other mass falls. In longitudinal motion, the masses move toward each other and then apart.",
      "- **A system can also vibrate in both modes at the same time.** To start this mixed motion, both masses are pulled up, but one mass is pulled higher than the other.",
      "  - Both masses fall together, which is Mode 1.",
      "  - The masses start at different heights, so the middle spring also pushes them against each other, which is Mode 2.",
      "  - So the masses move together and against each other at once. Real movement and real speech production do this all the time.",
      "- **Mode 2 has a higher frequency than Mode 1.** When the masses move together, they go back and forth slowly. When the masses move against each other, they go back and forth quickly.",
      "- **The reason is how many springs are actually stretching.** Both modes use the same two masses and the same three springs, so the answer comes from checking what each spring does.",
      "  - In both modes, the **two outer springs** stretch and compress.",
      "  - Mode 1: The masses move together, so the **middle spring never stretches or compresses**. The middle spring moves with the masses like a solid bar, so **Mode 1 effectively has only two springs**.",
      "  - Mode 2: The masses move against each other, so the middle spring is stretched and compressed again and again. **All three springs are working**, so Mode 2 has three units of stiffness instead of two.",
      "- **More working stiffness gives a stronger pull back to the middle, and a stronger pull gives a higher frequency.** The springs themselves did not change. Only the way each mode uses the springs changed.",
      "  - The general rule is that **the more the masses move against each other, the more the springs stretch, so the higher the frequency**.",
      "  - A higher mode does not have stiffer springs. A higher mode makes the same springs do more stretching."
     ]
    },
    {
     "ref": "Lecture 11 · p6",
     "lines": [
      "- **Each of the three modes has its own frequency, from lowest to highest.** The system has three masses and four springs.",
      "  - Mode 1: All three masses move **together**. Mode 1 has the **lowest frequency**.",
      "  - Mode 2: The **middle mass stays still** while the two outer masses move against each other. Mode 2 has the **middle frequency**. To start Mode 2, the outer masses are pulled apart without touching the middle mass.",
      "  - Mode 3: The **middle mass moves opposite to the two outer masses**. Mode 3 has the **highest frequency**. In transverse motion, the middle mass goes down while both outer masses go up.",
      "- **The frequencies follow the same stiffness rule.**",
      "  - Mode 1 is slow because the masses move together, so the **two middle springs do not stretch**, and springs that do not stretch add no stiffness.",
      "  - In Mode 2, the springs stretch and compress, but less than they could.",
      "  - In Mode 3, **every mass moves against its neighbor**, so the springs stretch the most. Mode 3 has the most stiffness and the fastest motion.",
      "- **Changing one mass only affects the modes where that mass moves.** A mass changes frequency only by moving.",
      "  - Making the **middle mass heavier lowers the frequency of Mode 1 and Mode 3**, because the middle mass moves in both of those modes.",
      "  - The same change leaves **Mode 2 the same**, because the middle mass does not move in Mode 2.",
      "- **All three modes can happen at the same time.** However the system is started, the system vibrates as some mix of these **pure modes**.",
      "  - Learning a musical instrument means learning to make the masses and springs vibrate in some modes and not others. How a string is plucked or a violin is bowed decides which modes start, and those modes are heard as **notes**.",
      "  - A **trained singer** does the same thing with the vocal folds, controlling their mass and stiffness to sing in tune."
     ]
    },
    {
     "ref": "Lecture 11 · p7",
     "lines": [
      "- **Every added mass adds one more mode, so N masses give N modes.** One mass has one mode, two masses have two modes, and six masses have six modes.",
      "  - Higher modes have more **reversals**. A reversal is a place where two neighboring masses move in opposite directions.",
      "  - More reversals mean more stretching, so **higher modes have higher frequencies**.",
      "  - In a chain of separate masses like this, the mode frequencies are usually **not whole-number multiples** of the lowest frequency.",
      "- **The same mode has the same pattern in every chain, no matter how many masses the chain has.**",
      "  - **Mode 1** always has all the masses moving up and down together.",
      "  - **Mode 2** always has the **left side moving against the right side**. With an odd number of masses, the middle mass stays still.",
      "  - **Mode 3** always has the **middle moving against the two sides**.",
      "  - With **four masses**, the four modes are all four together, the left pair against the right pair, the middle pair against the outer pair, and every mass against its neighbors.",
      "- **A chain with an infinite number of masses and springs is a string**, like a guitar string or a piano string. Every small piece of a string has mass, and every small piece stretches like a spring, so a string has an infinite number of modes.",
      "  - In the **lowest mode**, the whole string moves up and down together with almost no stretching, and this mode gives the **lowest note**.",
      "  - In each higher mode, more parts of the string move against each other.",
      "  - A string plucked without skill vibrates in many modes at once."
     ]
    }
   ],
   "questions": [
    {
     "q": "Why does adding a third mass give the system another mode?",
     "a": "Because N masses give N modes. Each mass that can move on its own adds one more way for the whole system to vibrate, so three masses have three modes."
    },
    {
     "q": "How are the two modes of a two-mass system different?",
     "a": "In Mode 1 the two masses move together in the same direction. In Mode 2 they move in opposite directions. Each mode is a pattern of the whole system, not of one mass."
    },
    {
     "q": "Why does Mode 2 of the two-mass system have a higher frequency than Mode 1?",
     "a": "When the masses move in opposite directions, the spring between them stretches and compresses more. More stretching means more stiffness in that mode, so the frequency is higher."
    },
    {
     "q": "What are the three modes of a three-mass system?",
     "a": "In Mode 1 all three masses move together. In Mode 2 the outer masses move in opposite directions and the middle mass stays still. In Mode 3 each mass moves opposite to its neighbor, which stretches the springs the most, so Mode 3 has the highest frequency."
    },
    {
     "q": "Why does adding mass to the middle mass not change Mode 2?",
     "a": "Because the middle mass does not move in Mode 2. Extra mass only matters where a mode is moving, so Mode 2 stays the same."
    },
    {
     "q": "Why does a system gain a mode every time you add a mass?",
     "a": "Because each new mass can move on its own, which adds one more way for the system to vibrate. N masses always give N modes."
    },
    {
     "q": "What do you get with an infinite number of masses and springs?",
     "a": "You get a string. The masses and springs are spread all along it, so instead of a few modes, the string has a whole series of modes."
    }
   ]
  },
  {
   "id": "perturbation",
   "title": "What a local change in mass or stiffness does",
   "know": [
    {
     "ref": "Lecture 12 · p9",
     "lines": [
      "- **All of these results come from a short list of principles about masses and springs.** The principles connect to each other, so they do not need to be memorized as separate facts.",
      "  - **Raising the mass lowers the frequency, and raising the stiffness raises the frequency.**",
      "  - **A system with n masses has n modes of vibration**, and each higher mode has a higher frequency.",
      "  - **Adding mass lowers the frequency in proportion to how much that mass moves.** How much the mass moves depends on where the mass is.",
      "  - **Where there is the most movement there is no stretching, and where there is the most stretching there is no movement.**",
      "  - **Adding stiffness raises the frequency in proportion to how much that spring stretches and compresses.** This also depends on where the spring is.",
      "  - In a **fixed-fixed system**, the harmonics are **whole-number multiples of the base frequency**, because the first mode fits a whole number of times into each mode.",
      "  - In a **fixed-free system**, the frequencies are **odd multiples of the base frequency**, because the first mode fits an odd number of times into each mode."
     ]
    },
    {
     "ref": "Lecture 12 · p11",
     "lines": [
      "- **One small change to a string can make one mode lower and another mode higher.** Choose a spot where **Mode 4 moves the most** and where **Mode 5 crosses its middle line**, so Mode 5 does not move at that spot. Then raise both the **mass** and the **stiffness** of that spot.",
      "  - **For Mode 4**, the spot is moving, so the extra mass **lowers** the frequency. The spot is barely stretched, so the extra stiffness does nothing.",
      "  - **For Mode 5**, the spot does not move, so the extra mass does nothing. The spot is stretched the most, so the extra stiffness **raises** the frequency.",
      "  - So the same change **lowers Mode 4 and raises Mode 5**.",
      "- **Each mode is checked separately with one question, which is whether the spot is moving or stretching in that mode.** If the spot is moving, the mass is what matters. If the spot is stretching, the stiffness is what matters.",
      "- **This reasoning about small local changes is called perturbation theory, and it was first tested on drums.** A drum is also made of countless masses and springs. In the late nineteenth century, before cameras could record fast motion, small amounts of **wax** were stuck onto different spots on a drum.",
      "  - Wax on a spot predicted to vibrate a lot added moving mass, and listeners heard the drum's frequency **drop**.",
      "  - Wax on a spot predicted not to move made **no difference** to the sound."
     ]
    },
    {
     "ref": "Lecture 13 · p13",
     "lines": [
      "- **A constriction raises both the stiffness and the mass of the air.**",
      "  - Stiffness: **Compressing air raises its stiffness**, the same way compressing the air in a tire makes it stiffer. So a constriction at a location with a lot of compression **raises the frequency**.",
      "  - Mass: **A constriction raises the mass of the air**, because it packs the air into a smaller space and raises its **density**. So a constriction at a location where the air moves a lot **lowers the frequency**.",
      "- **Even though a constriction raises both, it still changes the formants, because moving places and compressing places take turns.** At any one spot, in any one mode, only the extra mass or only the extra stiffness counts.",
      "  - A reliable way to answer any constriction question is to ask two questions in order. First, is the air at this spot mostly moving or mostly compressing in this mode? Second, which change counts there, the extra mass or the extra stiffness?",
      "- **The same two questions answer a question about a string fixed at both ends.** Choose a small spot where **Mode 3 crosses its middle line** while **Mode 4 is at the top of a bump**, and raise both the mass and the stiffness of that spot.",
      "  - Mode 3: The string does not move at that spot but is stretched the most, so only the extra stiffness counts, and **Mode 3's frequency goes up**.",
      "  - Mode 4: The string moves the most at that spot and hardly stretches, so only the extra mass counts, and **Mode 4's frequency goes down**."
     ]
    }
   ],
   "questions": [
    {
     "q": "How can adding mass and stiffness at one spot raise one mode and lower another?",
     "a": "The same spot can be stretching in one mode and moving in another. In the mode where it stretches, the extra stiffness matters, so that mode goes up. In the mode where it moves, the extra mass matters, so that mode goes down."
    },
    {
     "q": "Why does extra mass at one spot depend on the mode?",
     "a": "Because extra mass only matters where the mode is moving. If the spot is moving a lot in that mode, the frequency goes down. If the spot is still in that mode, the frequency does not change."
    },
    {
     "q": "How can the same added mass and stiffness move two modes in opposite directions?",
     "a": "At that spot, one mode is mostly stretching and the other is mostly moving. The extra stiffness raises the mode that stretches there, and the extra mass lowers the mode that moves there."
    },
    {
     "q": "Why does a constriction change more than one thing about the air?",
     "a": "A constriction (narrowing) packs the air into a smaller space. That makes the air heavier, so its mass goes up, and harder to compress, so its stiffness goes up too. Which one matters depends on whether the air there is moving or compressed in that mode."
    },
    {
     "q": "A constriction raises a formant. What does that tell you about the air there?",
     "a": "It tells you the air there was mostly compressed, like a spring, and hardly moving in that mode. The extra stiffness won, so the formant went up."
    }
   ]
  },
  {
   "id": "boundaries",
   "title": "Fixed-fixed and fixed-free: why the modes are spaced the way they are",
   "know": [
    {
     "ref": "Lecture 13 · p4",
     "lines": [
      "- **In a string fixed at both ends, each higher mode is made of more copies of the first mode.** The first mode is **one half-wave**. A half-wave is one bump that goes from no motion at one end, to the most motion in the middle, to no motion at the other end.",
      "  - **Mode 2 holds two half-waves.** One half goes up while the other half goes down. Each half acts like a copy of Mode 1, so Mode 2 has **twice the stiffness** and **twice the frequency**.",
      "  - **Mode 3 holds three half-waves**, and **Mode 5 holds five**, so the fifth mode has five times the frequency of the first.",
      "  - So the frequencies climb in equal steps. If the first harmonic is 100 hertz, the next harmonics are 200, 300, 400 and 500 hertz.",
      "- **The numbers do not have to start at 100.** A voice with a base frequency of **250 hertz** has its next harmonics at 500, 750 and 1000 hertz. Each harmonic is still a whole number of copies of the first.",
      "  - The short exam answer is that **the fifth mode has the first mode fitted into it five times**, so it has five times the stiffness and five times the frequency."
     ]
    },
    {
     "ref": "Lecture 13 · p5",
     "lines": [
      "- **A string fixed at both ends vibrates in all its modes at once, and its spectrum has evenly spaced spikes.** A **spectrum** has **frequency** along the bottom and **amplitude**, or strength, going up. Each spike is one harmonic.",
      "  - The **vocal folds** are fixed on all sides, just behind the Adam's apple. So the vocal folds behave like this kind of fixed-fixed system and produce harmonics."
     ]
    },
    {
     "ref": "Lecture 13 · p7",
     "lines": [
      "- **A building is fixed at the bottom and free at the top.** In strong wind or an earthquake, engineers want a building to sway only in **Mode 1**, with the whole building moving together.",
      "  - Mode 1 feels unpleasant on a high floor, but it is safe.",
      "  - A higher mode would send some floors one way and other floors the other way, and the building could break apart.",
      "- **A string can also be fixed at the bottom and free at the top.** The first mode of this string is not a full half-wave. The first mode goes from **no motion at the fixed end** to **the most motion at the free end**, which is only **one quarter of a wave**."
     ]
    },
    {
     "ref": "Lecture 13 · p8",
     "lines": [
      "- **In a fixed-free system, each mode is built from quarter-wave pieces.** Each piece goes from no motion to the most motion.",
      "  - **Mode 1 holds one piece.**",
      "  - **Mode 2 holds three pieces.**",
      "  - **Mode 3 holds five pieces.**",
      "  - **Mode 4 holds seven pieces.**",
      "  - So with a base of 100 hertz, the modes come at 100, 300, 500 and 700 hertz.",
      "- **Two pieces can never fit, so the steps are always odd.**",
      "  - First, two pieces stacked together give no motion, then the most motion, then no motion again.",
      "  - That puts a still point at the top as well as the bottom, which would make the system **fixed at both ends**.",
      "  - So the next possible mode adds one more piece, for **three** pieces in total, and that ends with motion at the free top again.",
      "  - The simple version is that the free end must always be moving, and only an odd number of quarter-waves ends on a moving point.",
      "- **The frequencies of a fixed-free system are called formants.** A **formant** is a frequency of vibration of a system that is fixed at one end and completely free at the other end. Formants are **odd multiples** of the lowest one, and they are written **F1**, **F2** and **F3**."
     ]
    },
    {
     "ref": "Lecture 13 · p9",
     "lines": [
      "- **Counting quarter-wave pieces gives every formant from the first one.** If **F1 is 500 hertz**, then **F2 is three times that, 1500 hertz**, and **F3 is five times that, 2500 hertz**.",
      "  - Each step between formants is twice F1, because each new mode adds two more quarter-wave pieces."
     ]
    }
   ],
   "questions": [
    {
     "q": "Why does a string fixed at both ends have all whole-number harmonics, but a fixed-free system only odd ones?",
     "a": "A string fixed at both ends must be still at both ends, so any whole number of half-waves fits: 1, 2, 3, 4 times the first. A fixed-free system must be still at the fixed end and moving the most at the free end, so only an odd number of quarter-waves fits: 1, 3, 5, 7 times the first."
    },
    {
     "q": "How do two fixed ends decide which modes a string can have?",
     "a": "Both ends must stay still in every mode. Only patterns made of whole half-waves start and end still, so those are the only modes the string can have."
    },
    {
     "q": "Why are the harmonics whole-number multiples of the first one?",
     "a": "Mode N fits N copies of Mode 1 between the two ends. Each copy is shorter, so the frequency is N times the first, such as 100, 200, 300 Hz."
    },
    {
     "q": "Why do only odd numbers of quarter-waves fit a fixed-free system?",
     "a": "The fixed end must be still and the free end must be moving the most. One quarter-wave goes from still to moving the most, and to end at a moving point again you add two quarter-waves at a time, so you get 1, 3, 5 and 7. An even number would end still at the free end, which is not allowed."
    },
    {
     "q": "What do the vocal tract and the building have in common?",
     "a": "Both are fixed at one end and free at the other. The building is fixed to the ground and free at the top, and the air in the vocal tract is fixed at the closed vocal folds and free at the open lips. So both have modes at 1, 3, 5 times the first."
    }
   ]
  },
  {
   "id": "test-theory",
   "title": "Testing the theory that the vocal folds are a membrane",
   "know": [
    {
     "ref": "Lecture 11 · p9",
     "lines": [
      "- **The vocal folds are a membrane, so their modes spread across a surface instead of along a line.** A **membrane** is a sheet, and the vocal folds are a sheet of muscle. The same rules of modes still apply.",
      "  - Mode 1: The whole surface moves up and down together.",
      "  - Mode 2: The **left half moves against the right half**.",
      "  - Mode 3: The surface splits the other way. A middle line stays still, and the two halves on either side of the line move against each other.",
      "  - Mode 4: Four sections move against each other. Higher modes get more and more complicated. Each mode is labeled by two numbers, which count the bumps along the length and the bumps across the width.",
      "- **Real vocal folds vibrate in all their modes at the same time, so a voice has a spectrum full of spikes.**",
      "  - The evenly spaced frequencies attached to these membrane modes are teaching values.",
      "  - The vocal folds are held fixed along their edges, so they **behave like a string**, and a string has evenly spaced harmonics."
     ]
    },
    {
     "ref": "Lecture 11 · p10",
     "lines": [
      "- **Science works by stating a clear theory, solving it to get a prediction, and then measuring to check the prediction.** Theories are often written as **differential equations**, which describe how quantities change over time.",
      "  - The spring equations are one example. Solving them predicts that a pulled spring goes back and a pushed spring also goes back.",
      "- **The theory for the voice leads to a specific prediction.**",
      "  - The **theory** is that the **vocal folds are a membrane**, so their vibration has **evenly spaced peaks in its spectrum**. These evenly spaced peaks are called **harmonics**.",
      "  - The equations for the vocal folds are the same type as the spring equations. There are many more of them, and they are slightly more complicated, so the ideas from masses and springs are enough to reason with.",
      "  - The **prediction** is that **anyone's voice, when measured, will have a spectrum with evenly spaced harmonics**.",
      "- **The prediction was tested by recording two voices in Praat.** **Praat** is a program for analyzing speech. Each speaker made a sound with the **mouth wide open**, so no particular vowel was being made.",
      "  - In the first voice, the lowest spike was near **100 hertz**. The next spikes were close to two, three, four and five times that value, so they were **evenly spaced as predicted**.",
      "  - In the second voice, the lowest spike was near **220 hertz**. The next spikes were near two and three times that value, so they were also evenly spaced, but farther apart.",
      "  - **The prediction was correct for both voices.** A theory built from simple masses and springs predicted real speech precisely.",
      "- **The two voices differ because of the mass rule.** The second voice has a **higher pitch**, so the second speaker's vocal folds are probably **smaller and thinner**. Thinner folds have less mass, and less mass gives a higher frequency, so every harmonic is higher and farther apart.",
      "- **Each person's vocal folds give their voice its own spectrum, which is part of how people recognize voices.**",
      "  - Twins share genetics and have similar vocal folds, so twins can be hard to tell apart on the phone.",
      "  - How a person says vowels also matters, but vowels depend on the vibration of the **air** above the vocal folds, not on the folds themselves."
     ]
    }
   ],
   "questions": [
    {
     "q": "What can a spectrum of a vowel test about the vocal folds?",
     "a": "It can test whether the harmonics are evenly spaced. The theory that the vocal folds are a membrane predicts equidistant harmonics, and a recording shows evenly spaced peaks, so the prediction holds."
    },
    {
     "q": "How can a membrane vibrate in several modes at once?",
     "a": "The modes add together. The membrane's actual motion is all of its modes happening at the same time, which makes a complex vibration."
    },
    {
     "q": "What does a spectrum show about a membrane vibrating in many modes?",
     "a": "It separates the complex vibration into its modes and shows each one as a peak at its frequency. A spot that does not move in a mode will not pick up that mode."
    },
    {
     "q": "How can you test a prediction about voice harmonics with a recording?",
     "a": "Record a vowel, look at its spectrum in Praat, and check whether the peaks are evenly spaced. Evenly spaced peaks are what the membrane theory predicts."
    },
    {
     "q": "How do a theory, a prediction and a measurement fit together?",
     "a": "The theory says how something works, such as the vocal folds being a membrane. The prediction says what you should see if the theory is right, such as evenly spaced harmonics. The measurement checks whether you see it."
    }
   ]
  },
  {
   "id": "air",
   "title": "Moving air versus compressed air in the vocal tract",
   "know": [
    {
     "ref": "Lecture 12 · p15",
     "lines": [
      "- **The air in the vocal tract can be modeled as a chain of masses and springs that is fixed at the glottis end and free at the lip end.** In this model, the masses stand for the air's inertia, which is its resistance to being moved, and the springs stand for its springiness.",
      "  - The lowest mode of the chain is like the **first formant**, written **F1**. The next mode is like the **second formant**, written **F2**.",
      "  - The frequencies of a fixed-free system are called **formants**. The frequencies of a fixed-fixed system are called **harmonics**.",
      "  - The second mode vibrates **three times faster** than the first, because the second mode holds three quarter-wave pieces.",
      "  - The masses near the free end move very freely in both modes.",
      "- **Three places along the tube matter for vowels.**",
      "  - /a/: The constriction is **one-third of the way from the glottis**.",
      "  - /i/: The constriction is **two-thirds of the way from the glottis**.",
      "  - /u/: The constriction is at the **lips**, which is the free end."
     ]
    },
    {
     "ref": "Lecture 12 · p23",
     "lines": [
      "- **The air in the tube can be modeled as lines of air particles.** Each particle stands for billions of real air molecules. The closed vocal folds sit at the **fixed end**, and the open lips sit at the **free end**.",
      "  - Where the lines bunch close together and then spread far apart, the air is **compressing and expanding**, which is called **springiness**.",
      "  - Where the lines move back and forth without changing their spacing, the air is acting as a **mass**. This is easiest to see at the **free end**, where the air simply moves in and out.",
      "  - At the fixed end, the air cannot move, but the air there compresses and expands a lot.",
      "- **The modes of the air match the modes of a building.**",
      "  - **F1** has one point of no motion, at the fixed end.",
      "  - **F2** has two points of no motion, one at the fixed end and one inside the tube.",
      "  - **F3** has three points of no motion. Between them, the air takes turns between places of most motion and places of most compression.",
      "- **The schwa matches the prediction for a uniform tube.** The **schwa** is the central vowel with no constriction. F2 should be three times F1, and F3 should be five times F1. A measured schwa had formants near **500, 1500 and 2500 hertz**, which are those odd multiples."
     ]
    }
   ],
   "questions": [
    {
     "q": "Can air be strongly compressed at a spot where it hardly moves?",
     "a": "Yes. Where the air hardly moves, the air on both sides crowds in toward it and then pulls away from it, so that spot is compressed and stretched the most. Moving the least and being compressed the most go together."
    },
    {
     "q": "In the vocal tract diagram, the curve goes up and down. Does the air move up and down?",
     "a": "No. The air moves back and forth along the tube, from the glottis toward the lips. The height of the curve only shows how much the air moves at each spot."
    },
    {
     "q": "Why is the air compressed the most where it moves the least?",
     "a": "Because compression comes from the air on either side moving toward or away from that spot. The neighbors move a lot while that spot stays put, so it gets squashed and stretched the most."
    }
   ]
  },
  {
   "id": "vowels",
   "title": "Constriction location and the vowels /i/, /a/ and /u/",
   "know": [
    {
     "ref": "Lecture 12 · p16",
     "lines": [
      "- **Images of the vocal tract show where constrictions (narrowings) occur.** A **constriction** is a location where the tongue or lips narrow the vocal tract. The **glottis** is the space between the vocal folds at the fixed end, so distances are measured from the glottis.",
      "  - Done: There is **no significant constriction**, so air flows freely along the whole tract.",
      "  - Dean: The constriction occurs under the roof of the mouth, about **two-thirds of the way from the glottis**, producing a **high front** vowel.",
      "  - Don: The constriction occurs far back in the throat, about **one-third of the way from the glottis**, producing a **low back** vowel.",
      "  - Dune: The constriction occurs **at the lips** because of **lip rounding**, producing a **high back** vowel.",
      "  - Dan: The tongue is positioned low and toward the front of the mouth, producing a **low front** vowel."
     ]
    },
    {
     "ref": "Lecture 12 · p19",
     "lines": [
      "- **For /u/, rounding the lips lowers both F1 and F2.** **Lip rounding** creates a constriction at the **free end**, which raises the mass and the stiffness of the air there.",
      "  - Mode 1: The air at the free end moves a lot and hardly compresses, so **motion matters most**. The extra mass lowers **F1**.",
      "  - Mode 2: The air at the free end again moves a lot, so **motion matters most**. The extra mass lowers **F2**.",
      "  - The extra stiffness does not matter in either mode, because the air at the lips is moving, not stretching.",
      "- **A recording confirmed the prediction.** A speaker started from the central vowel, with formants near 500, 1500 and 2500 hertz, and then said /u/. **Both formants dropped**, because the rounded lips added mass right where the air moves the most."
     ]
    },
    {
     "ref": "Lecture 12 · p20",
     "lines": [
      "- **For /i/, F1 goes down and F2 goes up.** The constriction is about **two-thirds of the way from the glottis**, and that one location acts differently in the two modes.",
      "  - Mode 1: This spot has lots of motion and hardly any compression, so **mass matters most**. The extra mass **lowers F1**.",
      "  - Mode 2: This spot has lots of compression, so **springiness matters most**. The extra stiffness **raises F2**.",
      "  - The same constriction is at a location of motion for F1 and at a location of compression for F2, so one formant falls while the other rises.",
      "- **A recording confirmed the prediction.** A speaker went from the central vowel into /i/. The **first formant dropped a lot**, and the **second formant went up**."
     ]
    },
    {
     "ref": "Lecture 12 · p21",
     "lines": [
      "- **For /a/, F1 goes up and F2 goes down, which is the reverse of /i/.** The constriction is about **one-third of the way from the glottis**.",
      "  - Mode 1: This spot near the fixed end has lots of compression, so **springiness matters most**. The extra stiffness **raises F1**.",
      "  - Mode 2: This spot has lots of motion, so **mass matters most**. The extra mass **lowers F2**.",
      "  - So F1 and F2 move toward each other, and the two formants end up close together.",
      "- **The same reasoning works backward.**",
      "  - If a constriction raises a formant a lot, the air at that spot must be **springy and hardly moving** in that mode.",
      "  - If a constriction lowers a formant a lot, the air at that spot must be **moving a lot** in that mode."
     ]
    }
   ],
   "questions": [
    {
     "q": "What makes /i/ and /a/ different, without memorizing frequencies?",
     "a": "The constriction is in a different place. For /i/ (dean) it is two-thirds of the way from the glottis, so F1 goes down and F2 goes up. For /a/ (Don) it is one-third of the way, so F1 goes up and F2 goes down."
    },
    {
     "q": "How do the tongue and lips change which vowel you hear?",
     "a": "They change where the constriction is and what shape the vocal tract has. That changes the formants, and the formants are what make each vowel sound different."
    },
    {
     "q": "Why can the same voice make many different vowels?",
     "a": "The vocal folds stay the same source, and the vocal tract acts as the filter. Changing the shape of the vocal tract changes the formants, so the same source can make different vowels."
    },
    {
     "q": "Why does /u/ (dune) lower both F1 and F2?",
     "a": "The constriction is at the lips, from lip rounding. The air at the lips is moving in both Mode 1 and Mode 2, so the extra mass counts in both, and both formants go down."
    },
    {
     "q": "Why does the location of a constriction matter more than just calling it a constriction?",
     "a": "The same constriction does different things depending on where it is. At a spot where the air moves, the formant goes down, and at a spot where the air is compressed, the formant goes up."
    },
    {
     "q": "Why does /i/ (dean) lower F1 but raise F2?",
     "a": "The constriction is two-thirds of the way from the glottis. There, the air moves in Mode 1, so the extra mass lowers F1, and it is compressed in Mode 2, so the extra stiffness raises F2. The formants move apart."
    },
    {
     "q": "For /i/, what is the air at the constriction doing in Mode 1 and Mode 2?",
     "a": "In Mode 1 it is moving, so mass matters and F1 goes down. In Mode 2 it is compressed, so stiffness matters and F2 goes up."
    },
    {
     "q": "Why does /a/ (Don) raise F1 and lower F2?",
     "a": "The constriction is one-third of the way from the glottis, toward the back of the throat. There, the air is compressed in Mode 1, so the extra stiffness raises F1, and it moves in Mode 2, so the extra mass lowers F2. The formants move together."
    },
    {
     "q": "Why do /i/ and /a/ have opposite patterns?",
     "a": "Their constrictions are at opposite spots. At one-third, the air is compressed in Mode 1 and moving in Mode 2, and at two-thirds it is the other way around, so the effects on F1 and F2 flip."
    }
   ]
  },
  {
   "id": "source-filter",
   "title": "Source and filter: harmonics from the folds, formants from the tract",
   "know": [
    {
     "ref": "Lecture 14 · p15",
     "lines": [
      "- **The vocal folds are the source, and their mass and stiffness set F0 and the spacing of the harmonics.**",
      "  - **Big, heavy, loose vocal folds** have a large mass and a small stiffness, so their **F0 is low**, around 100 hertz, with harmonics at 200, 300 and so on.",
      "  - **Tighter, lighter vocal folds** have a higher F0, such as 250 hertz, with harmonics at 500 and 750 hertz.",
      "  - **Very tight, light vocal folds** have an even higher F0, such as 350 hertz, with harmonics at 700 and 1050 hertz.",
      "- **F0 keeps changing while people talk.** Only a robot keeps F0 constant. Speakers change F0 by tightening and loosening the vocal folds with the muscles in the larynx, and listeners use those changes to understand meaning.",
      "  - When **\"The dog slept here\"** is a statement, F0 falls at the very end. When the same words are a question, F0 rises at the end.",
      "  - The way F0 moves also tells listeners whether a person is being sarcastic, pretending, or even lying.",
      "- **F0 can be measured in Praat.** Take a short piece of speech, view a spectral slice, and pick the lowest harmonic. One measured voice had F0 around 170 hertz, and the next harmonic was at about twice that value, as the theory predicts."
     ]
    },
    {
     "ref": "Lecture 14 · p16",
     "lines": [
      "- **The air in the vocal tract is the filter, and the formants depend on where the constriction is.** Typical values show the patterns.",
      "  - **Schwa** has F1 near **500** and F2 near **1500** hertz.",
      "  - **/u/** has F1 near 300, F2 near 1000 and F3 near 2000 hertz, so all of them are lower.",
      "  - **/i/** has F1 near 300 and F2 near 2200 hertz, so they are very far apart.",
      "  - **/a/** has F1 and F2 both near 800 to 900 hertz, so they are very close together.",
      "- **The main rule is that a formant makes the nearby harmonics loud, and harmonics far from any formant are muted.** During a schwa, harmonics near 500 hertz are loud. The farther a harmonic is from 500, the weaker it is. Between two formants the harmonics get weaker, and near the next formant they get stronger again.",
      "  - **The vowel shape is the filter. The voice supplies the harmonics, and the filter chooses which harmonics survive.**"
     ]
    },
    {
     "ref": "Lecture 14 · p17",
     "lines": [
      "- **The lower F0 is, the more harmonics the formants can shape.** Heavy, loose vocal folds give harmonics every 100 hertz. Many harmonics sit under each formant, so the shaped spectrum follows the formant peaks smoothly and is easy to read.",
      "- **With very light, tight vocal folds, the harmonics are far apart, so a formant can be missed.** A formant at 500 hertz may have **no harmonic near it to make loud**. Sparse harmonics can miss a formant or make it unclear.",
      "  - An **opera singer** is an extreme case. The harmonics are so far apart that the formants do not line up with any harmonic, so listeners struggle to hear which vowel is being sung. Singers are even trained to shape the mouth so the formants line up with the harmonics.",
      "  - A **small child** of two or three has an F0 near 500 hertz, so very few harmonics fall near the formants. A child's speech is very hard to understand unless the listener is a caretaker who is used to it.",
      "  - A simple way to see it is that the formants are the same in every case, but a high voice gives the listener only a few harmonics to hear them through."
     ]
    }
   ],
   "questions": [
    {
     "q": "Does raising your pitch turn /i/ into /a/?",
     "a": "No. Raising pitch raises F0, which spreads the harmonics farther apart. The vowel depends on the formants, which come from the shape of the vocal tract, so the vowel stays the same. A very high F0 can only make the formants harder to see."
    },
    {
     "q": "What decides how far apart the harmonics are?",
     "a": "F0 does. The harmonics are at whole-number multiples of F0, so with an F0 of 150 Hz they are at 150, 300, 450 Hz, 150 Hz apart."
    },
    {
     "q": "Why do the mass and stiffness of the vocal folds change F0?",
     "a": "Heavy, loose vocal folds vibrate slowly, so F0 is low. Tight, light vocal folds vibrate quickly, so F0 is high."
    },
    {
     "q": "How do formants decide which harmonics are loud?",
     "a": "A formant makes the harmonics closest to it louder, and the harmonics far from any formant come out weaker. The outline of the harmonic heights, the envelope, shows the formants."
    },
    {
     "q": "Why are pitch and vowel two different things?",
     "a": "Pitch comes from the source, how fast the vocal folds vibrate, which is F0. The vowel comes from the filter, the formants of the vocal tract. You can change one without changing the other."
    },
    {
     "q": "Why are vowels hard to identify when F0 is very high?",
     "a": "With a high F0 the harmonics are far apart, so few of them fall near each formant. With so few harmonics, the envelope is hard to see, which is why a soprano's or a toddler's vowels are hard to identify."
    },
    {
     "q": "If a formant is hard to see, does that mean it is gone?",
     "a": "No. The vocal tract still has the formant. There just are not enough harmonics close to it to show it clearly."
    }
   ]
  },
  {
   "id": "acoustic-displays",
   "title": "Spectrum and spectrogram",
   "know": [
    {
     "ref": "Lecture 13 · p23",
     "lines": [
      "- **A spectrogram shows how the spectrum changes over time.** A **spectrum** shows one instant. Speech changes over time, because the tongue and lips keep moving and constrictions are made and released.",
      "  - **Time** runs along the **horizontal axis**.",
      "  - **Frequency** runs up the **vertical axis**. In a single spectrum, frequency was the horizontal axis.",
      "  - **Amplitude** is shown as **darkness** on the display. The louder a frequency is, the darker it looks.",
      "- **Formants appear as dark bands that move as the speaker moves.** In **/ia/**, the two lowest bands start **far apart** during /i/. As the speaker moves into /a/, **F1 rises and F2 falls**, so the bands **come close together**.",
      "  - Reading a spectrogram means following the dark bands, because the dark bands are the formants changing over time."
     ]
    },
    {
     "ref": "Lecture 14 · p19",
     "lines": [
      "- **\"Where were you a year ago?\" brings every idea about speech together in one short sentence.** The vocal folds supply harmonics the whole time. Every new sound changes where the tongue and lips form a constriction, so the formants keep moving from one moment to the next.",
      "  - On a spectrogram of the sentence, **time** runs along the bottom, **frequency** runs up, and the **dark bands are the formants**.",
      "  - Where the vowel sounds like **/i/**, **F2 rises high and F1 stays low**, because the constriction is at a location that is springy in Mode 2 and moving in Mode 1.",
      "  - During \"you,\" the formants **drop**, because rounding the lips adds mass right where the air moves the most, and that lowers all of them.",
      "  - Through \"a year ago,\" F2 goes up and then down again as the tongue moves from one vowel to the next.",
      "- **All the formants keep changing during speech, so speech is not a string of frozen vowels.** Every rise and fall of a formant can be predicted with the same mass-spring steps. Find the constriction, then check whether the air there is moving or compressing in each mode.",
      "  - This constant change is why a network that sees two formants from one frozen moment cannot understand real speech. Speech recognition needs systems that take in whole stretches of sound over time.",
      "  - A spectrogram of a real sentence is a moving record of the tongue and lips, and reading it means following the dark bands as they rise and fall."
     ]
    }
   ],
   "questions": [
    {
     "q": "How does a spectrogram show a vowel changing?",
     "a": "Time is on the horizontal axis, frequency is on the vertical axis, and darkness shows amplitude. The dark bands are the formants, so following them over time shows how the vocal tract is moving."
    },
    {
     "q": "What can a spectrogram show that one spectrum cannot?",
     "a": "A spectrum shows only one instant. A spectrogram lines up many spectra over time, so it shows how the formants change."
    },
    {
     "q": "What do the horizontal axis, the vertical axis and the darkness show in a spectrogram?",
     "a": "The horizontal axis is time, the vertical axis is frequency, and the darkness is amplitude. The darkest bands are the formants, with F1 the lowest band and F2 the next one up."
    },
    {
     "q": "Why do the formant bands keep moving in connected speech?",
     "a": "Because the vocal tract keeps changing shape. Every sound moves the constriction, so the formants never stay still, as in \"Where were you a year ago?\""
    },
    {
     "q": "What do the formant transitions add beyond the middle of a vowel?",
     "a": "They show how the vocal tract is moving into and out of the vowel, which carries information about the sounds next to it. A slice from the middle of the vowel leaves that out."
    }
   ]
  },
  {
   "id": "context",
   "title": "The ma and na splicing experiment",
   "know": [
    {
     "ref": "Lecture 14 · p20",
     "lines": [
      "- **Listeners identify a consonant from the vowel that comes after it, as a spliced recording proves.** A speaker said **ma** and **na**. The **m** part of \"ma\" was cut out and joined to the **a** part of \"na.\" The consonant came from \"ma,\" so the result should sound like \"ma,\" but **listeners clearly hear \"na.\"**",
      "- **The m or n is heard more from the vowel than from the nasal sound itself.** The vowel's formants are different depending on the consonant before the vowel.",
      "  - After **m**, one formant of the vowel stays fairly **steady**.",
      "  - After **n**, that formant **drops sharply** at the start of the vowel.",
      "  - So the vowel carries the information about the consonant. Listeners decide which consonant they heard **during the vowel**, after the consonant is already over.",
      "- **Listeners take in whole stretches of speech and decide about the sounds that came first using the sounds that follow.** This was one of the first striking results in speech perception, published in the **1950s** by the linguist **André Malécot**.",
      "  - For about seventy years, speech recognition machines treated each slice of sound by itself, and they **failed**, despite billions of dollars of effort.",
      "  - A machine that understands speech has to use the sound that follows to decide about the sound that came before. That is why modern speech recognition uses large language models built from many neural networks."
     ]
    }
   ],
   "questions": [
    {
     "q": "Why can the vowel from na change what you hear for the m of ma?",
     "a": "The vowel from na still has the formant transition that comes from the n. When the m of ma is joined to the a of na, listeners hear na, because they decide on the consonant during the vowel, after the consonant is over."
    },
    {
     "q": "What does the splicing result mean for recognizing speech one small slice at a time?",
     "a": "It shows that you cannot decide what a sound is from its own slice alone. Listeners use information from the sounds around it, so speech has to be heard as a sequence."
    }
   ]
  },
  {
   "id": "classifier",
   "title": "The vowel network: from F1 and F2 to a decision",
   "know": [
    {
     "ref": "Lecture 14 · p21",
     "lines": [
      "- **A neural network can learn to recognize vowels from formants.** The network has **two inputs**, **F1 and F2**, measured from real recordings of five vowels. The network's job is to decide which vowel was spoken.",
      "  - **The network's knowledge is stored in its weights.** The weights are learned from the data."
     ]
    },
    {
     "ref": "Lecture 14 · p22",
     "lines": [
      "- **The vowel network has five outputs and three hidden layers.** There is one output neuron for each word, **done, dune, dean, Don and Dan**. The **three hidden layers** have **3, 2 and 4 neurons**.",
      "  - Information enters at the input, a little like sound reaching the ear.",
      "  - Each hidden layer turns the numbers it receives into new numbers, a little like the stages of processing in the brain.",
      "  - The output layer gives the network's decision about which vowel it heard.",
      "- **Every neuron connects to every neuron in the next layer, so the network is fully connected.** This version is **purely linear**, which means it has **no activation functions**. Each neuron just passes on the result of its inner product."
     ]
    },
    {
     "ref": "Lecture 14 · p23",
     "lines": [
      "- **Before training, every weight is a random number between minus one and one.** A **positive** weight makes its input push the next neuron up. A **negative** weight makes its input push the next neuron down.",
      "- **The example input is F1 of 320 hertz and F2 of 2000 hertz.** A very low F1 with a very high F2 is the pattern of **/i/**, so the correct answer is **dean**."
     ]
    },
    {
     "ref": "Lecture 15 · p3",
     "lines": [
      "- **Forward propagation carries one input through the network to a decision.** The example input is **F1 of 320 and F2 of 2000**, which is the pattern of **dean**.",
      "  - Each neuron computes an **inner product**. For the top neuron of the first hidden layer, the weight on F1 is multiplied by 320, the weight on F2 is multiplied by 2000, and the two results are added.",
      "  - The result of that inner product, with nothing else done to it, is called the neuron's **linear activation**. Here it comes out slightly below zero.",
      "  - Each layer's activations become the inputs to the next layer. The next layer does more inner products, and this continues until the output layer.",
      "- **At the end, the output numbers are turned into a probability distribution, which is the network's decision.** A **probability distribution** is a set of numbers between zero and one that **add up to one**. The step that makes this distribution is called **softmax**.",
      "  - The only thing to know about softmax is that a bigger number gives a bigger probability.",
      "  - Probabilities and percentages are the same idea. A probability of 0.55 is a 55 percent chance.",
      "  - Here the network gives **done about 56 percent** and much less to the other words. So the network decides it heard done, even though the input was dean.",
      "- **The network's knowledge is just positive and negative numbers, and its decisions come from multiplying and adding.** Multiplying and adding are second-grade operations. **Inference** means working out a decision, and the AI systems people use every day make decisions with these simple operations.",
      "  - Brains are chemical machines, so this is less surprising than it sounds. The chemistry of ions such as sodium, potassium and calcium inside neurons does operations close to adding and multiplying."
     ]
    }
   ],
   "questions": [
    {
     "q": "What does the vowel network learn?",
     "a": "It learns its weights. The weights decide how F1 and F2 affect each hidden layer and, in the end, the probabilities for the five vowels."
    },
    {
     "q": "How do F1 and F2 work as inputs to the vowel network?",
     "a": "They are the two numbers fed into the two input neurons. The weights turn them into scores for the five output neurons, one for each of done, dune, dean, Don and Dan."
    },
    {
     "q": "Why does a low F1 and a high F2 go with dean?",
     "a": "Dean is /i/, and /i/ has a low F1 and a high F2. So the right answer for that input is dean, even if an untrained network guesses something else."
    },
    {
     "q": "How does a neuron combine its inputs?",
     "a": "It multiplies each incoming activation by its weight and adds the results. This is the inner product."
    },
    {
     "q": "Why does the sign of a contribution depend on both the input and the weight?",
     "a": "A positive weight keeps the input's sign and a negative weight flips it. So a positive input times a negative weight pushes the neuron down, and a positive input times a positive weight pushes it up."
    },
    {
     "q": "What happens during forward propagation?",
     "a": "The input is carried layer by layer from the input to the output, with inner products at each layer. The result at the end is the network's guess."
    },
    {
     "q": "Why can a forward pass give the wrong answer?",
     "a": "Because the weights may not be learned yet. At the start the weights are random, so the calculation runs correctly but the guess can still be wrong."
    }
   ]
  },
  {
   "id": "target",
   "title": "A valid prediction versus the right answer",
   "know": [
    {
     "ref": "Lecture 15 · p6",
     "lines": [
      "- **Every network starts out knowing nothing, because its weights start out random.** The network only improves when it is told the right answer.",
      "  - The right answer is given as a **desired output**. For a recording of dean, the desired output is **0, 0, 1, 0, 0**. That says there is a 100 percent chance it was dean and zero for every other word. A list with a single one and zeros everywhere else is called a **one-hot encoding**.",
      "  - The output the network actually produced is the **computed output**. The difference between the computed output and the desired output is the network's **error**.",
      "  - The desired outputs come from real data, such as a table of each student's formants and the vowel that student actually said.",
      "- **Backpropagation is the method that changes the weights so the network makes better decisions.** After learning, if 320 and 2000 are given again, the probability of done should go down and the probability of dean should go up.",
      "  - **Learning happens gradually, one small step at a time.** As in stochastic gradient descent, the weights do not jump to the right values at once. Each piece of data nudges the weights a little.",
      "  - Each weight moves a small step in whichever direction makes the error smaller. The **learning rate** sets the size of each step.",
      "  - The weights are updated **starting from the end**. First the weights into the output change, then the weights into the third hidden layer, then the second, then the first. The activations from the forward pass stay the same during this backward pass.",
      "- **This is why AI needs huge data centers.** A modern chatbot can have **trillions of weights**. Backpropagation has to nudge every one of them, over and over, for months."
     ]
    },
    {
     "ref": "Lecture 15 · p9",
     "lines": [
      "- **Training needs two tables of numbers, called matrices, and each row pairs one recording with its true vowel.**",
      "  - The **input matrix** has one row per recording and **two columns**, F1 and F2, because the network takes two numbers in. With about 110 recordings, the input matrix is 110 by 2.",
      "  - The **output matrix** has one row per recording and **five columns**, one for each word. A **1 marks the true vowel**, and the other columns hold 0. The output matrix is 110 by 5.",
      "  - So each row tells the network the right answer. Formants like 800 and 1700 go with one vowel, and formants like 700 and 1100 go with another."
     ]
    }
   ],
   "questions": [
    {
     "q": "Can a prediction add up to 1 and still be wrong?",
     "a": "Yes. Adding up to 1 only makes it a valid probability distribution. It can still put the highest probability on the wrong vowel, and the desired output, such as 0, 0, 1, 0, 0 for dean, shows what it should have been."
    },
    {
     "q": "What makes a list of numbers a valid probability distribution?",
     "a": "Every number is between 0 and 1, and all of them add up to 1. If they do not add up to 1, it is not a probability distribution."
    },
    {
     "q": "How is the desired output different from a prediction that is valid but wrong?",
     "a": "The desired output puts 1 on the correct vowel and 0 on the rest. A valid prediction adds up to 1 too, but it can favor the wrong vowel. Being valid and being correct are different."
    },
    {
     "q": "Why must each row of formants stay paired with its vowel?",
     "a": "Each row is one recording, its F1 and F2 and the vowel that was said. The network learns by comparing its guess with that vowel, so the pairs have to match."
    },
    {
     "q": "What happens if the formants and the vowels get mixed up?",
     "a": "The network learns the wrong pairing. It would be told that one recording's formants belong to a different vowel, so it would learn the wrong thing."
    }
   ]
  },
  {
   "id": "backward",
   "title": "Why backpropagation starts at the end",
   "know": [
    {
     "ref": "Lecture 15 · p7",
     "lines": [
      "- **For the last weight, it is easy to tell which way to change it.** The last weight is the 0.1 that connects the top neuron of the last hidden layer to **done**.",
      "  - That weight multiplies an activation of about 1.57, so raising the weight would raise the probability of done.",
      "  - The desired probability of done is **zero**, so raising the weight would make the error **worse**.",
      "  - So that weight should be **lowered**, which pulls the probability of done toward zero. Only one inner product is needed to work this out.",
      "- **For the first weight, it is very hard to tell which way to change it.** The first weight is the 0.005 near the input.",
      "  - Changing it changes one activation in the first hidden layer. That changes the second hidden layer, which changes the third, which finally changes the output probabilities.",
      "  - **Its effect on the decision passes through every layer in between**, and it also depends on all the later weights. So looking at the first weight alone cannot show whether it should go up or down. Backpropagation still works it out."
     ]
    },
    {
     "ref": "Lecture 15 · p8",
     "lines": [
      "- **Backpropagation starts at the end because the last weights are the easiest problem.**",
      "  - **The last weights decide the output probabilities directly**, so the error can be used right away to improve them.",
      "  - **The first weights affect their activations, which affect two more layers of activations.** It is very hard to tell how much an early weight is to blame for a mistake at the end. The effect of an early weight also **includes the effect of the last weights**, which come after it.",
      "- **Improving the last weights is the easy problem, and improving the first weights is a bigger problem that contains the easy one.** The method for solving small problems first and then reusing their answers for bigger problems is **dynamic programming**, developed by **Bellman** and **Viterbi**.",
      "  - **Backpropagation is stochastic gradient descent plus dynamic programming.** Stochastic gradient descent changes the numbers gradually. Dynamic programming supplies the order, which is the \"back\" in backpropagation.",
      "  - Backpropagation was worked out in the **mid-1980s**. In 2024 a Nobel Prize recognized it, because there would be no AI without it.",
      "  - Research from the last ten years suggests that single neurons in the brain also work forward and then backward, using their chemistry.",
      "- **The short exam answer is this.** The last weight affects the decision in one simple step. The first weight's effect passes through many layers and depends on the later weights. So the easy problem is solved first, and its answer is reused for the harder problems."
     ]
    }
   ],
   "questions": [
    {
     "q": "Why does backpropagation start at the output instead of the first layer?",
     "a": "The last weights affect the output directly, so it is easy to tell whether each one should go up or down. A first-layer weight affects the output only through every later layer, so its effect depends on all the later weights. Solving the last layer first and reusing that answer is dynamic programming."
    },
    {
     "q": "How do you tell whether raising an output weight helps?",
     "a": "Look at the sign of the activation coming in and at whether that output's probability should go up or down. If the activation is positive and the probability should go up, raising the weight helps."
    },
    {
     "q": "Why is an early weight's effect harder to figure out?",
     "a": "Its effect passes through every later layer before it reaches the output. So whether it helps depends on all the weights after it, not just on its own sign."
    },
    {
     "q": "Why does backpropagation work out the later layers before the earlier ones?",
     "a": "The earlier weights' effects depend on the later layers. Once the later layers are worked out, that answer can be reused for the earlier ones, which is dynamic programming."
    },
    {
     "q": "What do dynamic programming and SGD each do in backpropagation?",
     "a": "Dynamic programming sets the order, solving the last layer first and reusing the answer. Stochastic gradient descent changes each weight a little in the direction that lowers the error. Backpropagation is SGD plus dynamic programming."
    }
   ]
  },
  {
   "id": "program",
   "title": "Reading the PyTorch code",
   "know": [
    {
     "ref": "Lecture 14 · p25",
     "lines": [
      "- **PyTorch describes the network as a list of layers.** **Sequential** means the network has **one layer after another**. **Linear** means the layer **does inner products** of weights and the previous activations.",
      "  - **nn.Linear(2, 3)** means **take input from 2 neurons and have 3 neurons**. The next lines read 3 in and 2 out, then 2 in and 4 out, then 4 in and 5 out.",
      "  - Setting the **bias** to False keeps every layer purely linear, which matches the diagram of the network. This code only describes the network. It does not train it.",
      "- **Only layers that do calculations get a line of code.** The **input layer** has no weights coming into it and does no inner products. The input layer only receives numbers, so it never gets its own line. The first line describes the **first hidden layer**.",
      "  - This network has **five layers in total**, which are the input layer, three hidden layers and the output layer.",
      "  - This network has **three hidden layers**, and the **last line is always the output layer**.",
      "  - \"How many layers\" and \"how many hidden layers\" are different questions, so read each question carefully.",
      "- **To add a hidden layer of 3 neurons right before the output, change only the end.** The first three lines stay the same. The old last line, 4 in and 5 out, becomes **4 in and 3 out**. A new last line takes **3 in and gives 5 out**.",
      "  - A quick check is that each line's first number must match the previous line's second number, because each layer takes its input from the layer before it.",
      "- **The same reading works for any network written this way.** A network written as 4 in and 3 out, 3 in and 8 out, 8 in and 4 out, 4 in and 4 out, and 4 in and 5 out takes **4 numbers as input**, has **four hidden layers** with 3, 8, 4 and 4 neurons, and chooses among **5 categories**.",
      "  - Drawn as a network, it has a column of **4 input neurons**, then hidden columns of **3, 8, 4 and 4 neurons**, then a column of **5 output neurons**.",
      "  - When the first category is correct, the target puts a **1 in the first slot and 0 in every other slot**."
     ]
    },
    {
     "ref": "Lecture 15 · p10",
     "lines": [
      "- **A short Python program using the PyTorch library builds the network and runs one training step.**",
      "  - The **import** lines tell the program to use the **torch library**. The library does all the background work, so the network can be described in a few lines.",
      "  - The two **load** lines read the two matrices from files. The formants become X, and the true vowels become Y.",
      "- **The layer lines describe the network.** **Sequential** means the network is a **sequence of layers**, one after another. **Linear** means the layer **does inner products**, because a linear layer only multiplies and adds.",
      "  - **nn.Linear(2, 3)** describes the **first hidden layer**, which takes **2 inputs and gives 3 outputs**. The next lines take 3 and give 2, take 2 and give 4, and take 4 and give 5.",
      "  - The network has **five layers** but only **four lines**, because the **input layer does no processing**. The input layer only receives numbers, so its only trace in the code is the 2 in the first line.",
      "- **The last lines run one training step using all 110 rows at once.**",
      "  - **SGD** is stochastic gradient descent. **lr** is the **learning rate**, which sets the size of each step.",
      "  - The **loss** measures the network's mistakes by comparing its outputs with the true vowels.",
      "  - **backward** runs backpropagation to work out how each weight should change, and **step** actually changes the weights.",
      "  - The program describes the network, shows it the data, measures how wrong it is, works backward to find which weights caused the mistake, and then adjusts the weights a little."
     ]
    }
   ],
   "questions": [
    {
     "q": "What changes if you add a 3-neuron hidden layer right before the 5 outputs?",
     "a": "The line before it must now end in 3, and you add a line that takes 3 and gives 5, such as nn.Linear(3, 5). The input stays 2, because there are two formants, and each line's first number must equal the second number on the line before it."
    },
    {
     "q": "What does nn.Sequential mean?",
     "a": "The network is a sequence of layers, one after another. Each layer passes its output to the next one, so the sizes of neighboring layers must match."
    },
    {
     "q": "Why must the layer sizes match when you add a layer?",
     "a": "Each layer has to take in exactly as many numbers as the layer before it gives out. If the sizes do not match, the numbers cannot pass from one layer to the next."
    },
    {
     "q": "What do loss, backward and step each do?",
     "a": "The loss measures the mistake. Backward runs backpropagation to work out how each weight should change. Step changes the weights."
    },
    {
     "q": "Why are the old gradients cleared before the next step?",
     "a": "Otherwise the changes from the last step would pile up on top of the new ones. Clearing them starts each step fresh, and the learned weights stay as they are."
    }
   ]
  },
  {
   "id": "nonlinearity",
   "title": "The sigmoid between layers",
   "know": [
    {
     "ref": "Lecture 15 · p11",
     "lines": [
      "- **Real neurons are nearly digital, either on or off, and the sigmoid copies that.** **Lord Edgar Adrian** won the **Nobel Prize in Physiology or Medicine in 1932** for discovering that **neurons are nearly digital**. A real neuron is roughly **on or off**, firing or not firing. The neurons in the network so far are not like that, because their activations can be any number, such as slightly below zero, about 6.6, or about 2.7.",
      "- **The sigmoid is an activation function that squashes an inner product into a number between zero and one.**",
      "  - A **large negative** inner product gives about **0**, so the neuron is **off**. Minus 4, minus 10, minus 100 and minus 1000 all give about zero.",
      "  - A **large positive** inner product gives about **1**, so the neuron is **on**. 4, 6 and 100 all give about one.",
      "  - Only inner products **near zero** give values in between. So the sigmoid **makes the neuron nearly digital**, like the chemistry that keeps real neurons from firing without limit.",
      "- **The sigmoid also matches how perception works.** **Some things that are very different are perceived as the same, and some things that are very similar are perceived as different.**",
      "  - A friend is recognized as the same person with a hat or without one, or in a different shirt on a different day. Perception ignores real differences, the same way the sigmoid gives minus 1000, minus 100 and minus 20 the same value.",
      "  - USC and UCLA are both large universities with similar labs and football, yet people perceive them as completely different. A small difference can matter a lot, the same way two inputs just below and just above zero land on opposite sides of the sigmoid's jump.",
      "  - The flat parts of the curve treat different things as the same, and the steep middle separates nearly identical things."
     ]
    },
    {
     "ref": "Lecture 15 · p12",
     "lines": [
      "- **Adding the sigmoid to each hidden neuron changes every number after it.** The inputs stay as formants, but each hidden neuron now passes on its sigmoid value instead of its raw inner product.",
      "  - The first hidden neuron's inner product, slightly below zero, becomes about **0.4**.",
      "  - The second, about 6.6, becomes about **1**, so that neuron is fully on.",
      "  - Each time a neuron changes, the activations in the later layers are recalculated, and the output probabilities shift.",
      "- **With the same random weights and the sigmoid on all nine hidden neurons, the network is still wrong.** The network spreads its probability more evenly and gives its highest probability, about one third, to **Dan**. The sigmoid changes how the network calculates, but only training with backpropagation can give it good weights."
     ]
    },
    {
     "ref": "Lecture 15 · p13",
     "lines": [
      "- **The program changes in only one way. nn.Sigmoid is added after each hidden linear layer.** nn.Sigmoid means \"apply the sigmoid,\" which makes that layer nearly digital.",
      "  - The **last layer has no sigmoid**, because its outputs go straight into the loss calculation, which turns them into probabilities.",
      "  - The rest of the training program, with SGD and a learning rate of 0.1, stays the same.",
      "- **Training both versions tests whether the sigmoid makes the vowel recognizer better or worse.** Other activation functions that look somewhat like the sigmoid, such as **ReLU**, can be swapped in to test them too.",
      "  - **Many of the most basic ideas in AI come from how real brains work.** Neurons, inner products that gather input from many neurons, and nearly digital firing all come from the brain."
     ]
    }
   ],
   "questions": [
    {
     "q": "Why do the later layers have to be recalculated after the sigmoid changes a hidden value?",
     "a": "The later layers take that hidden value as their input. If it changes, their inner products change too, so the final probabilities must be recalculated."
    },
    {
     "q": "What does the sigmoid do to a negative, zero or positive input?",
     "a": "A large negative input gives about 0, which is off. An input of exactly 0 gives 0.5. A large positive input gives about 1, which is on."
    },
    {
     "q": "Is a hidden neuron's sigmoid value a probability for a vowel?",
     "a": "No. Each sigmoid value is between 0 and 1, but the values do not have to add up to 1. A probability distribution over the vowels has to add up to 1."
    },
    {
     "q": "Why do the later values change when the sigmoid is applied to a hidden neuron?",
     "a": "The next layer uses the sigmoid's output as its input. A different input gives different inner products, so everything after it changes."
    },
    {
     "q": "What does putting a sigmoid between layers do to the network?",
     "a": "It turns each inner product into a number between 0 and 1, like a neuron that is mostly off or mostly on. That changes what the network computes, even before any weight is changed."
    }
   ]
  },
  {
   "id": "training-result",
   "title": "Reading the training results",
   "know": [
    {
     "ref": "Lecture 16 · p5",
     "lines": [
      "- **The real formant data from the class shows why AI is hard.** Each recording is a dot. **F1** is on the horizontal axis, and **F2** is on the vertical axis. There are 525 dots, 105 for each vowel.",
      "  - The data has a pattern. The **/i/ dots sit high**, with a **high F2 and a low F1**, as the theory predicts. /i/ is clearly different from /u/.",
      "  - The data also has **a lot of overlap**. Many /æ/ dots sit among the /i/ dots, and many others overlap with schwa. The /u/, /a/ and schwa groups pile on top of each other.",
      "  - Some dots are probably measurement mistakes. Real data always has errors, the same way speech to a phone on a noisy train has errors, so the dots were left in.",
      "- **If each vowel formed its own separate group, AI would be easy.** Because the groups overlap, a network has to see the data many times to learn where each vowel is most likely. Even then, many points are unclear.",
      "  - For a new speaker whose formants land in the middle of the overlap, the best answer is the vowel whose dots are most common there.",
      "  - Removing the differences between speakers is called **normalization**. People tried it for about seventy years without success. Hearing a lot of speech from the same speaker does help, because it gives the system more information about that person.",
      "- **This overlap was first discovered in the early 1950s by Peterson and Barney.** Spectrograms had been kept secret by the military during the Second World War, and the overlap was found once spectrograms became available.",
      "  - Good speech recognition only arrived around 2011 or 2012, using neural networks trained by backpropagation.",
      "  - Surprisingly, speech that changes over time turned out to be easier for modern systems than this frozen, one-moment problem. Large language models use information from before and after each moment."
     ]
    },
    {
     "ref": "Lecture 16 · p15",
     "lines": [
      "- **The full training program runs 2000 updates and records the accuracy after each one.** Each update uses all the recordings, with a learning rate of 0.1. The formants are divided by a thousand first, which turns hertz into kilohertz.",
      "  - **Accuracy** is the percent of recordings the network classifies correctly. The word with the largest score counts as the network's answer.",
      "- **The accuracy starts at 20 percent, which is chance.** With random weights, the network knows nothing. With **five vowels**, a random guess is right **one time out of five**, which is 20 percent. This level is called **chance**.",
      "  - With **ten categories**, chance would be **10 percent**, because a random guess would be right one time in ten.",
      "- **After a while, the accuracy jumps up to about 40 percent and then levels off near 45 percent.** The jump shows the network is learning something. Each pass of learning is called an **epoch**, and a problem like this takes thousands of epochs."
     ]
    },
    {
     "ref": "Lecture 16 · p16",
     "lines": [
      "- **Ten training runs from ten different starting points all end at the same accuracy.** Each run started from a **different set of random weights**. A starting set of random numbers is called a **seed**, though the word itself will not be asked.",
      "  - The runs take **different paths**. One run stays at chance for about 500 epochs before jumping up. Another run jumps up very early. Another run climbs more slowly.",
      "  - **All ten runs end at the same accuracy**, close to 45 percent. Stochastic gradient descent always involves chance along the way, but the end point is the same.",
      "- **Children learning language are similar.** One child's home might talk mostly about sports, and another child's home might talk mostly about politics. Each child hears very different words and voices. By about age four, both children speak the same language, because the basic patterns underneath their different inputs are the same.",
      "- **The network levels off near 40 percent, not 100 percent, because the vowel data overlap so much.** For a point in the middle of the overlap, even a person looking carefully would have to guess. AI is not magic, so a problem that is very hard for people is also hard for machines.",
      "  - The next experiment is to add or remove layers, or change the number of neurons in each layer, to see whether the 40 percent gets better or worse."
     ]
    }
   ],
   "questions": [
    {
     "q": "Several runs start with different random weights and end at the same accuracy. What does that show?",
     "a": "It shows that learning ends in the same place even though the runs take different paths. That accuracy is on the training data, so it does not show by itself how well the network does on new speakers."
    },
    {
     "q": "What does the overlap between vowels in the F1 and F2 plot mean for the network?",
     "a": "Many recordings with nearly the same F1 and F2 belong to different vowels. For a point in the overlap, even a person would have to guess, so the network cannot reach 100 percent."
    },
    {
     "q": "Why does the accuracy only tell you about the data it was trained on?",
     "a": "It counts how many of those recordings the network got right. To know how it does on new speakers, you have to test it on recordings it never trained on."
    },
    {
     "q": "Why does accuracy start at 20 percent?",
     "a": "There are five vowels, and with random weights the network knows nothing, so it is guessing. A random guess among five is right one time in five, which is 20 percent."
    },
    {
     "q": "What does it mean when the accuracy levels off?",
     "a": "The network has stopped improving. Leveling off near 45 percent means it still gets many recordings wrong, because the vowel data overlap."
    },
    {
     "q": "Why do different starting weights give different learning paths?",
     "a": "Each run starts with different random weights, so it makes different early guesses and corrections. The path changes, but the end point is about the same."
    },
    {
     "q": "What does it mean that the runs end at the same accuracy?",
     "a": "The end point is the same even though the paths are different. Agreeing at the end does not mean the runs learned in the same way."
    }
   ]
  },
  {
   "id": "sequence",
   "title": "From one vector to a sequence",
   "know": [
    {
     "ref": "Lecture 17 · p3",
     "lines": [
      "- **Michael Jordan invented the recurrent neural network in 1985 to model how speech is produced over time.** **Speech production** means how the tongue, the velum and the lips move during speech. Features such as nasality, backness and lip rounding switch on and off at different moments across a sequence of sounds. Jordan saw that a regular network could not handle something that complex and that changes so much over time.",
      "  - Jordan's network is **not only sequential**. It has **two layers working side by side**.",
      "  - It is called **recurrent** because it **sends its own output back into part of its input**. It produces something at one moment, then uses that output to predict the next moment, and then the moment after that.",
      "- **GPT works the same way, one word at a time.**",
      "  - First, GPT takes the words of the prompt and predicts the next word. That word becomes the first word of its answer.",
      "  - Second, GPT feeds the prompt plus that new word back in and predicts the next word again.",
      "  - Third, GPT keeps repeating this. So the idea behind GPT began in 1985 with thinking about how speech unfolds over time.",
      "  - People kept improving the recurrent network from 1985 until **2017**, when the **large language model** was invented.",
      "- **Science and technology grow from other people's ideas over long periods of time.** An idea from 1943 was improved into the networks of 1986. Jordan's idea from 1985 was improved into the large language models of 2017. The people who came up with these ideas were mostly not the people who made a lot of money from them.",
      "  - These years give a sense of the history, but they will not be asked about on the exam."
     ]
    },
    {
     "ref": "Lecture 17 · p5",
     "lines": [
      "- **An LLM takes 15 vectors and predicts the sixteenth, and the vectors can stand for almost anything.** A vector is just a list of numbers. Whatever the numbers stand for, the machine plays the same game of predicting the next one.",
      "- **The vectors can be words.** In \"The cat that the dog chased ran up the old tree and sat on the,\" the sixteenth vector is the missing next word. A speaker of English knows a likely answer, such as branch or mat.",
      "  - Getting it right means using the whole sentence, because the cat sat, not the dog.",
      "- **The vectors can be slices of sound.** A spectrogram is cut into small frames. Each frame becomes one vector of frequencies and amplitudes. The system learns to predict the next small piece of speech from all the pieces before it.",
      "  - In 2019 this method gave the **best speech recognition in 75 years**. It is also the basis for computer voices that are now very hard to tell apart from humans.",
      "  - The newest systems can hold a spoken conversation. The only clue left is a short delay before each response, and as that delay gets shorter, phone scams become a real danger.",
      "- **The vectors can be pieces of an image.** An image is cut into **16 patches**, read row by row, and the system predicts the missing patch. After training on huge numbers of images, the system learns what a dog, a dolphin or a boat is. This became the basis of modern **computer vision**.",
      "- **The vectors can be amino acids.** A protein is a chain of amino acids, and there are **20 kinds** of amino acids. The order of the chain decides how the protein folds into its shape. Treating a protein as a sequence and playing the same prediction game moved the **protein folding problem** many years ahead, which helps with designing drugs and vaccines.",
      "  - That work won the **2024 Nobel Prize in Chemistry**.",
      "- **The LLM only ever sees vectors.** Words, sounds, images and molecules all reach the LLM the same way, so one design asks the same question every time, which is what comes sixteenth.",
      "  - These systems predict from past data. Something new that the past data does not cover can make them **hallucinate**. A prediction far into an unfamiliar future can end up as a guess, or as an honest \"I don't know.\""
     ]
    }
   ],
   "questions": [
    {
     "q": "How is predicting the next item different from classifying one vector?",
     "a": "Classifying uses one static vector from one moment, as the vowel network does. Predicting the next item uses the whole sequence so far, so the items before it change what comes next."
    },
    {
     "q": "How does a recurrent network let earlier items matter?",
     "a": "It sends its own output back into part of its input. What it produced at one moment helps it predict the next moment, as in Jordan's network."
    },
    {
     "q": "Why does a sequence need more than one static vector?",
     "a": "In speech and language, what comes next depends on what came before. A network that sees one vector at a time loses that information."
    },
    {
     "q": "What stays the same when an LLM predicts words, sounds or images?",
     "a": "The task stays the same: given 15 vectors, predict the sixteenth. The vectors can stand for words, spectrogram frames, image patches or amino acids, because the LLM only sees lists of numbers."
    },
    {
     "q": "How do the items so far change the prediction for the next one?",
     "a": "They limit what can come next. When many things can follow, the probability distribution is spread out, and when few things can follow, it is piled onto a few choices."
    }
   ]
  },
  {
   "id": "phonotactics",
   "title": "Phonotactics and guessing the next letter",
   "know": [
    {
     "ref": "Lecture 18 · p6",
     "lines": [
      "- **Speakers know a small system of sounds that decides how vowels and consonants can follow each other.** English has about 30,000 words, so training an LLM on words takes enormous data, money and energy. The sound system has **only a few dozen sounds**, so an LLM for it can be small enough to study closely.",
      "- **A simple English syllable is a consonant, then a vowel, then a consonant**, as in Don, sit, shave, cup, dog and fish. The pattern is about sounds, so the silent e of shave does not count.",
      "  - English also allows **clusters**, as in split, flat, black, glad, desk, help and milk. Only some clusters are allowed, so **sblit**, **lfat**, **desb** and **lapm** are impossible. A product called \"desb\" would sound un-English right away.",
      "  - Long words are chains of syllables. **Atlantic** is fine because t and l are on opposite sides of a syllable break. **Tlantic** is impossible, because tl cannot start an English syllable.",
      "- **Every language has its own sequence rules, and speakers learn them without being taught.**",
      "  - **Mandarin** allows only nasal sounds at the end of a syllable, so words like mat, sit and shave are impossible in Mandarin.",
      "  - **Cantonese** also allows a final p, as in cup.",
      "  - **Russian and Polish** allow clusters like zb or dl at the start of a word, which English never allows.",
      "  - **Spanish** does not allow a word to start with s and t together, so Spanish speakers add an e at the start of a word like stadium, which keeps each syllable simple."
     ]
    },
    {
     "ref": "Lecture 18 · p7",
     "lines": [
      "- **Guessing the next letter of an English word shows what a speaker knows about sounds.** **After a vowel, almost any letter can come next.** **At the start of a word, the choices narrow sharply.**",
      "  - After **sp**, only l, r or a vowel can come. After **skr**, or after **m** at the start of a word, only a vowel can come.",
      "  - After **k**, a vowel or n can come, as in knee. After **sh**, a vowel or r can come, as in shrimp.",
      "- **Guessing the next letter is predicting the 16th vector.** A GPT that only plays this game learns English sounds and spelling. Its predicted probability distribution is **flat** after a vowel. After skr, the distribution is **sharply peaked**, because English allows almost nothing else there."
     ]
    },
    {
     "ref": "Lecture 17 · p6",
     "lines": [
      "- **English allows only certain sequences of sounds in its words, and every speaker knows which sequences are allowed.** **A simple English syllable is a consonant, then a vowel, then a consonant**, as in Don, mat, sit, cup, dog and fish.",
      "  - The pattern is about **sounds, not letters**. The silent e in shave, kite and rope does not count. Two letters can spell one consonant sound, as in ship, chin and bath.",
      "- **Syllables can also have clusters, and only some clusters are allowed.** A **cluster** is a group of consonants together. A cluster before the vowel is an **onset**, as in split, flat and black. A cluster after the vowel is a **coda**, as in desk, help and lamp.",
      "  - Each real word has an impossible twin marked with a star, such as **flat** and **lfat**, **help** and **hepl**, and **lamp** and **lapm**. Many twins use the same letters in a different order, so the order matters.",
      "  - **The order is a mirror image around the vowel.** In flat, the l is right next to the vowel and the f is farther out. In help, the l is again right next to the vowel, now on the other side, and the p is farther out. Each impossible twin puts the wrong consonant next to the vowel.",
      "  - A made-up product name like \"desb\" or \"lapm\" sounds un-English right away, because it breaks these rules.",
      "- **A long word is a chain of syllables, and each syllable follows the same rules.** Examples are ba-na-na, At-lan-tic and ath-lete.",
      "  - The sounds t and l are fine across a syllable break, but **tl cannot start a syllable**. That is why Atlantic is a word but tlantic is impossible.",
      "  - The sound **ng** can end a syllable, as in ring, but it can never start one.",
      "  - So whether a sequence of sounds is allowed depends on where the syllable breaks are.",
      "- **Every language has its own sequence rules.**",
      "  - Mandarin allows only nasal sounds at the end of a syllable.",
      "  - Cantonese also allows a final p, as in cup.",
      "  - Russian and Polish allow clusters like zb or dl at the start of a word, which English never allows.",
      "  - Spanish speakers change a word like stadium so that it starts with e, because Spanish does not allow s and t together at the start of a word."
     ]
    },
    {
     "ref": "Lecture 17 · p7",
     "lines": [
      "- **Guessing the next letter of an English word reveals what a speaker knows about sounds, and GPT plays the same guessing game.** Each item is the start of an English word, and the task is to guess the next letter. People agree on their guesses quickly, and how much they agree changes from item to item.",
      "- **After a vowel, almost any letter can come next.** After \"ra,\" likely letters include t, n, r and l, and many other letters are possible too.",
      "- **At the start of a word, the choices narrow to exactly what an English onset allows.**",
      "  - After **sp**, the next letter is l, r or a vowel, and never n.",
      "  - After **k**, the next letter is a vowel or n, as in knee, and never t.",
      "  - After **b** and **f**, the next letter is r, l or a vowel, and never n.",
      "  - After **sh**, the next letter is a vowel or r, as in shrimp.",
      "  - After **skr**, or after **m** at the start of a word, only a vowel can come.",
      "  - After **bram**, the letter b is almost certain, as in bramble, though a new syllable could also start there.",
      "- **Guessing the next letter is predicting the sixteenth item, which is the same game an LLM plays.** A GPT trained only on this game learns English sounds and spelling, because its predictions can only improve by matching the patterns of English syllables.",
      "  - The GPT's prediction is a **probability distribution** over the next letter, and the shape of that distribution holds the knowledge.",
      "  - After \"ra,\" the distribution is **flat**, spread over many letters. After \"skr,\" it is **sharply peaked** on a few vowels, because English allows nothing else there.",
      "  - The more the letters so far limit what can come next, the more the probability piles onto a few letters."
     ]
    }
   ],
   "questions": [
    {
     "q": "Why does a good next-letter guesser know English word patterns?",
     "a": "To guess well, it has to follow the rules for which sounds can come next, which is phonotactics. Its guesses can only get better by matching English syllables, so it ends up learning them."
    },
    {
     "q": "How do the onset and the coda limit which sounds can go together?",
     "a": "A cluster before the vowel is an onset, as in split, and a cluster after the vowel is a coda, as in lamp. Only some clusters are allowed in each place, and the order is a mirror image around the vowel, so flat is a word but lfat is impossible."
    },
    {
     "q": "Why is Atlantic a word but tlantic impossible?",
     "a": "In Atlantic, the t ends one syllable and the l starts the next, so tl never has to start a syllable. In tlantic, tl would start a syllable, and English does not allow tl at the start of a syllable."
    },
    {
     "q": "What can a guess about the next letter show about word beginnings?",
     "a": "At the start of a word the choices narrow to what an English onset allows. After sp only l, r or a vowel can come, never n, and after skr only a vowel can come."
    },
    {
     "q": "Why is the next-letter distribution spread out after some starts and peaked after others?",
     "a": "After a vowel, as in ra, almost any letter can come next, so the distribution is flat. After skr only a vowel can come, so the probability piles onto a few vowels and the distribution is sharply peaked."
    }
   ]
  },
  {
   "id": "architecture",
   "title": "Heads, layers and agents",
   "know": [
    {
     "ref": "Lecture 18 · p3",
     "lines": [
      "- **Predicting the next word is so hard that an LLM needs many layers, and many parallel heads inside each layer.** A **head** is one expert. In each layer, the knowledge from all the heads is combined to make **improved vectors**. Then the next layer does the same thing again.",
      "  - **This is a question for the exam.** **Layers go one after another from the input to the output. Heads sit side by side inside each layer.**",
      "- **A classroom comparison explains heads and layers.** Imagine trying to improve yourself by visiting a series of classes, one class after another.",
      "  - In each class, every student gives you their own opinion on how to improve. Each student is like a **head**.",
      "  - You then **combine** all of those opinions into one improved version of yourself. Combining the heads' opinions is what a layer does.",
      "  - Then you go to the next class and do the same thing again. **The classes are the layers.**",
      "  - Layers give an LLM depth, which is one round of improvement after another. Heads give it width, which is many experts asked at the same time within each round.",
      "- **Each head is a set of weights, and every head learns.** An expert's knowledge is in its weights. Every head in every layer learns how to improve the vectors so that the last layer can predict the next word.",
      "  - Large systems have **a hundred or more layers** and about **a hundred heads** in each layer. That shows how complicated language, vision and the other tasks really are.",
      "  - The heads and layers are trained like everything else. A sentence such as \"the dog that ... barks\" is taken from text, and the system predicts the next word. If the prediction is wrong, **every head in every layer** adjusts its weights with backpropagation so the next prediction is closer to barks.",
      "  - Training at this size uses enormous resources. In some states, a large share of the water goes to the data centers that run this training."
     ]
    },
    {
     "ref": "Lecture 18 · p4",
     "lines": [
      "- **A dynamical system is a rule that is fed its own output again and again.** Numbers go in, the rule acts on them, and numbers come out. The output is then fed back in as the next input. The goal is to understand this general structure, not to memorize formulas.",
      "  - In the **harmonic oscillator**, the two numbers are the position x and the velocity v. If x starts at one and v starts at zero, the first step leaves x the same and makes v go down.",
      "  - x and v **take turns**. First the new x is calculated from the old v. Then the new v is calculated from the new x. Step by step, the rule draws a **cosine** for x.",
      "  - Fields as different as finance use the same idea with different rules. Stock prices are modeled with equations that feed back on themselves, although the real market never follows them exactly.",
      "- **Jordan's network combined neural networks with dynamical systems.** Jordan built it because speech production changes over time.",
      "  - The network's **output is copied back into its state units**. The state units also keep a fading copy of their own previous values.",
      "  - **Plan units** and **state units** feed the hidden layer, the hidden layer feeds the output, and the output loops back into the state units. The same weights are used at every step.",
      "  - After more than **thirty years of improvements**, this idea became the **LLM**.",
      "- **In an LLM, each layer is the rule, and the depth of the layers plays the role of time.** Each layer applies its weights to every vector, and the next layer works on the result. If you follow one number up through the layers, it traces a curve, similar to the oscillator's curve, though not an exact cosine.",
      "  - So an LLM is a recurrent network laid out layer by layer, the same way the spring's motion was laid out step by step when it was calculated on a computer.",
      "  - The rule in each layer is the weights of its heads, and those weights are learned through backpropagation by predicting the next word.",
      "  - Agentic systems also contain loops, such as the critic and revision loop. So dynamical systems appear at every level of AI.",
      "  - The math of inner products that LLMs rely on was first studied deeply in **quantum mechanics**, about a hundred years ago. So physics and AI are closely connected in more than one way."
     ]
    },
    {
     "ref": "Lecture 18 · p2",
     "lines": [
      "- **All of modern AI is built from one simple idea, the neuron.** A **neuron** takes information from other neurons, multiplies each input by its weight, and adds the results. This is the **inner product**, and it stands in for neurons communicating with chemicals and electricity. People who move science forward usually start from very simple ideas like this one and repeat them many times.",
      "  - A **neural network** repeats the inner product layer after layer. It takes a vector in and gives a **decision** out. Even something as complex as a person making a decision can be built from inner products and a function like the sigmoid, combined many times.",
      "  - A network that makes one **static decision**, such as hearing one vowel from two formants, cannot capture thinking that **unfolds over time**.",
      "- **Language depends on connections between words that are far apart.** In \"the dog that my parents, who I love very much, who live in a state far, far away,\" the next word is **barks**, not bark.",
      "  - **Barks** goes with the singular word **dog**, no matter how many words come in between, even plural words like parents.",
      "  - Nobody teaches this rule directly. Speakers pick it up from the language around them. An LLM learns it the same way, from data, by doing inner products layer after layer until it predicts barks.",
      "  - English sentence structure, called **syntax**, is so complicated that many linguists spend their careers studying it. That is why an LLM needs so many layers.",
      "- **LLMs can work across many languages and across many kinds of input.** The first use of LLMs, in 2017, was **translation** between languages. Translation is now nearly solved for hundreds of languages.",
      "  - A system trained on several languages, such as English, Dutch and Japanese, learns how words go together in general. So it also gets good at very different languages, such as Navajo.",
      "  - A **multimodal** system connects different kinds of input, such as text, speech and images. A multimodal system can write a caption for a photo or create an image from a spoken description.",
      "- **Nobody fully understands what all the weights are doing.** The designs were not planned from the start. Over about 75 years, people changed something that worked a little so it worked a little better, again and again. Dogs were bred into today's breeds in a similar way over a few hundred years. Researchers are now trying to figure out what the weights do, partly so that smaller and less wasteful systems can be built.",
      "- **An agentic system is a team of LLMs that talk to each other in English.**",
      "  - An outline LLM plans the answer, and a writing LLM writes it.",
      "  - A critic LLM checks whether each statement follows from the one before. A revision LLM works back and forth with the critic.",
      "  - Sometimes a **controller** agent passes the work from one LLM to the next.",
      "  - The agents also know **computer languages**, such as Python and database languages, because they were trained to predict whole programs too.",
      "- **Agents usually stop learning once they are trained, and they share a common memory.**",
      "  - Once each LLM is trained, its weights usually **do not change** while the agents work together. Some new systems are starting to learn their own connections, which makes them partly self-designing.",
      "  - Agents share a **common memory**, where they can write and read information. The shared memory gives them a lot of their power, and it is also a source of danger, because it lets them coordinate in ways nobody planned.",
      "  - The same tools can do good work. One agentic system acts as a patient teacher for a Native American language that is nearly lost, even though there is far too little text in that language to train an ordinary LLM."
     ]
    }
   ],
   "questions": [
    {
     "q": "How is a critic agent different from a head?",
     "a": "A head is one expert inside a layer of one LLM, a set of weights. A critic agent is a whole LLM in an agentic system whose job is to check the draft and send it back for revision."
    },
    {
     "q": "How are heads different from layers?",
     "a": "Heads sit side by side inside a layer, and the layer combines their opinions into improved vectors. Layers go one after another from the input to the output, so each layer improves the vectors again."
    },
    {
     "q": "Why is a head not the same as an agent?",
     "a": "A head is a part inside one LLM. An agent is a whole LLM with its own job in a larger system, such as the critic."
    },
    {
     "q": "How is an LLM like a dynamical system?",
     "a": "In both, the output of one step becomes the input to the next. In an LLM, each layer takes the vectors from the layer before and makes them better, the way the oscillator updates its position and velocity step by step."
    },
    {
     "q": "Does the dynamical-system comparison mean every layer has the same weights?",
     "a": "No. Each layer has its own learned weights. The comparison is about one step feeding the next, not about using the same numbers at every step."
    }
   ]
  }
 ]
};
