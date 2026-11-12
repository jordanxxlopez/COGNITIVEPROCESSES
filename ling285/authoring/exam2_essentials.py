"""Build modern/essentials.js: the "Study this first" Exam 2 sheet and the Lab material section.

Sources: the Exam 2 review sheet (21 questions), HW5 answers, the Lab 5 to Lab 9 answer
keys (Lab 9 is the TA's Exam 2 review), and the Nov 10 review statement that Exam 2 goes
"up to right before we got to LLMs" (the LLM part is for the final).

Topics merge material that was repeated across Lectures 11 to 16. Every question has an
answer written the way the Exam 1 key grades: the answer first, then the reason, in two to
five full sentences. "Predicted" questions change one thing in a real review, homework or
lab question (a different vowel, mode, mass, base frequency or layer size).
"""
import json
from pathlib import Path
from guide_plain import build_plain_guide
from unlabel import bullet
from module1_layout import build_v6, lab_blocks
from exam2_versions import build_v8, build_v9, build_v10, build_v11, build_v12

_PLAIN = Path(__file__).resolve().parent / "plain"


def build_v7(topics):
    blocks = json.load(open(_PLAIN / "study_blocks.json"))
    answers = json.load(open(_PLAIN / "study_answers.json"))
    out = []
    for t in topics:
        qs = answers[t["id"]]
        assert len(qs) == len(t["questions"]), t["id"]
        out.append(dict(t, blocks=blocks[t["id"]],
                        questions=[dict(source=o["source"], q=n["q"], a=n["a"]) for o, n in zip(t["questions"], qs)]))
    return out


def plain_labs(labs):
    lp = json.load(open(_PLAIN / "labs_plain.json"))
    out = []
    for l in labs:
        p = lp[l["id"]]
        assert len(p["questions"]) == len(l["questions"]), l["id"]
        out.append(dict(l, blocks=p["blocks"], questions=p["questions"]))
    return out
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HOW_TO_ANSWER = [
    "Answer first, then the reason: Name the direction or the count in the first sentence, then explain why in one to three more sentences.",
    "Say what the spot is doing: For any mass, stiffness or constriction question, first say whether that location is moving or stretching in that mode.",
    "Use the course terms: Mode, harmonic, formant, fixed-fixed, fixed-free, constriction, inner product, weight, activation and loss should appear where they belong.",
    "Describe questions need steps: For \"describe a spectrogram\" or \"why does backpropagation start at the end\", walk through the process in full sentences.",
    "No arithmetic beyond simple multiples: He does not ask you to multiply decimals, give years, use the word seed, or write PyTorch from scratch.",
]

SCOPE = {
    "covers": "Lectures 11 to 16 and the start of Lecture 17, everything up to right before large language models.",
    "final": "Large language models, heads and layers, Gestalt completion and the cloze test, agentic systems, the LLM as a dynamical system, and Software 3.0 are saved for the final exam.",
    "evidence": "On Exam 1, about 15 of the 25 questions came almost word for word from the review sheet, with only the sounds, numbers or positions changed.",
}

TOPICS = [
 {
  "id": "modes", "tier": "Almost certain", "lectures": "Lectures 11, 12 and 13",
  "title": "Masses, springs and modes",
  "know": [
   "Why it vibrates: The spring tends to return to **equilibrium**, and a moving mass tends to **keep moving**, so the mass overshoots and the cycle repeats.",
   "Mass and stiffness: **More mass lowers the frequency, and more stiffness raises the frequency.**",
   "Directions: **Longitudinal** motion (back and forth along the spring) and **transverse** motion (up and down) behave the same way.",
   "Mode: A **mode** is one way a system can vibrate. **N masses give N modes.**",
   "Higher modes: The more the masses move **against each other**, the more the springs stretch and compress, so the mode has more stiffness and a **higher frequency**.",
   "Local rule: **A mass changes the frequency only where it moves, and a spring changes the frequency only where it stretches.**",
   "Infinitely many: An infinite number of masses and springs along a line is a **string**. Spread over a surface, it is a **membrane**, such as a drum or the vocal folds.",
  ],
  "questions": [
   ["Review 1", "Why do multiple mass systems have multiple frequencies?", "A system with several masses can vibrate in several ways, called modes, because the masses can move together or against each other. When the masses move against each other, the springs between them stretch and compress more, so more stiffness is working and that mode vibrates faster. Each mode therefore has its own frequency, and a system with N masses has N modes and N frequencies."],
   ["Review 2", "How many modes does a 3-mass system have?", "A 3-mass system has three modes, because a system with N masses has N modes of vibration."],
   ["Lab 9", "Four masses are joined by springs between two walls. How many modes does the system have, and what are the masses doing in the lowest and highest modes?", "The system has four modes, one for each mass. In the lowest mode, Mode 1, all four masses move in the same direction at the same time. In the highest mode, Mode 4, every mass moves opposite to its neighbors, so every spring is stretched and compressed and the frequency is highest."],
   ["Review 3", "Which mode of the 3-mass system has the highest frequency? Why?", "Mode 3 has the highest frequency. In Mode 3 the middle mass moves opposite to the two outer masses, so every spring is stretched and compressed as much as possible. That puts the most stiffness to work, and more stiffness makes the system vibrate faster."],
   ["Predicted", "Which mode of a 2-mass system has the lowest frequency, and why?", "Mode 1 has the lowest frequency. In Mode 1 the two masses move together, so the middle spring is carried along without stretching. Only the two outer springs are working, so Mode 1 has less stiffness than Mode 2 and vibrates more slowly."],
   ["Review 4", "If you increase mass 2, what happens to the frequencies of each of the modes?", "Mode 1 and Mode 3 go down, and Mode 2 stays the same. The middle mass moves in Mode 1 and in Mode 3, so making it heavier slows those modes. In Mode 2 the middle mass does not move, and a mass that does not move has no effect on the frequency."],
   ["Predicted", "In the 3-mass system, what happens to each mode if you make mass 1 (an outer mass) heavier?", "All three modes go down. The outer mass moves in Mode 1, Mode 2 and Mode 3, and a heavier mass that is moving lowers the frequency. No mode leaves an outer mass still, so none of the three frequencies stays the same."],
   ["Predicted", "In a 2-mass system, what happens to each mode if you make the middle spring stiffer?", "Mode 1 stays the same and Mode 2 goes up. In Mode 1 the masses move together, so the middle spring is never stretched and its extra stiffness does nothing. In Mode 2 the masses move against each other, so the middle spring is stretched and compressed and the extra stiffness raises the frequency."],
   ["Review 5", "What do you get when you have an infinite number of masses and springs?", "You get a string, like a guitar or piano string. Every small piece of a string has mass, and every small piece stretches like a spring, so a string vibrates in modes like a chain of masses, only with infinitely many of them. Spread over a surface instead of a line, the same idea gives a membrane such as a drum or the vocal folds."],
   ["Predicted", "What happens to the frequency of a single mass on a spring if you make the spring stiffer? If you make the mass heavier?", "A stiffer spring raises the frequency, because it pulls the mass back toward equilibrium with more force and turns it around sooner. A heavier mass lowers the frequency, because a heavier mass is harder to start and stop, so each back-and-forth cycle takes longer."],
  ],
 },
 {
  "id": "springiness", "tier": "Almost certain", "lectures": "Lectures 12, 13 and 14",
  "title": "Where the springiness is, and what a local change does",
  "know": [
   "Alternation: **Where a vibrating system moves the most, it stretches the least, and where it does not move, it stretches the most.**",
   "Shortcut: The springiest locations are the points of **no movement**, which are the fixed ends and the points where the mode crosses its resting line.",
   "Ends: A **fixed end is always springy**, and a **free end is always moving**, in every mode.",
   "Added mass: Extra mass lowers a mode's frequency **only where that mode is moving**.",
   "Added stiffness: Extra stiffness raises a mode's frequency **only where that mode is stretching**.",
   "Both at once: Adding mass and stiffness together does **not** cancel out, except for a single mass on a single spring, because at one spot in one mode only one of the two matters.",
   "Perturbation theory: It predicts how a small change in one location affects vibration. In the late nineteenth century, wax placed where a drum vibrated a lot lowered its pitch, and wax placed where it did not vibrate had no effect.",
  ],
  "questions": [
   ["Review 6", "This is Mode 5 of a string fixed at both ends. Circle the areas where there is the most springiness.", "Circle the two fixed ends and the four points where the string crosses its middle line, six places in all. At those points the string does not move, but the pieces on either side move in opposite directions, so the string there is stretched and compressed the most. The tops of the five bumps have the most motion and the least springiness."],
   ["Predicted", "This is Mode 3 of a string fixed at both ends. Where is the most springiness, and where is the most motion?", "The most springiness is at the two fixed ends and at the two points where the string crosses its middle line, four places in all, because the string does not move there. The most motion is at the tops of the three bumps, where the string swings the most and is hardly stretched."],
   ["Review 11", "This picture shows Mode 4 of a building. Circle the areas where there is the most springiness.", "Circle the fixed base and the three points where the building crosses its resting position, four places in all. Those points do not move, but the parts above and below them move in opposite directions, so the structure there stretches and compresses the most. The free top moves the most and is the least springy, so it is not circled."],
   ["Predicted", "This diagram shows Mode 2 of a building. Where is the most springiness?", "The most springiness is at the fixed base and at the one point above it where the building crosses its resting position. Those two points do not move, so the structure there is stretched and compressed the most. The free top moves the most and is the least springy."],
   ["Review 14", "If we increase the stiffness and mass of the string at the boxed location (where Mode 3 crosses its middle line and Mode 4 is at the top of a bump), what happens to Mode 3 and Mode 4's frequencies, and why?", "Mode 3 goes up and Mode 4 goes down. In Mode 3 the boxed spot does not move but is stretched the most, so the added mass does nothing and the added stiffness raises the frequency. In Mode 4 the boxed spot moves the most and is not stretched, so the added mass lowers the frequency and the added stiffness does nothing."],
   ["Predicted", "The box is moved to a spot where Mode 3 is at the top of a bump and Mode 4 crosses its middle line. Mass and stiffness are added there. What happens?", "Now Mode 3 goes down and Mode 4 goes up. In Mode 3 the spot moves the most and is hardly stretched, so the added mass lowers the frequency. In Mode 4 the spot does not move but is stretched the most, so the added stiffness raises the frequency."],
   ["Review 15", "If we increase the mass and stiffness of the building at its very top, what happens to the frequency of Mode 4, and why?", "The frequency of Mode 4 goes down. The top of the building is the free end, so in every mode it moves the most and is hardly stretched. The added mass matters there and lowers the frequency, while the added stiffness does nothing because nothing is stretching at the top."],
   ["Predicted", "If we increase the mass and stiffness of the building at its very base, what happens to the frequency of Mode 4, and why?", "The frequency of Mode 4 goes up. The base is the fixed end, so it never moves but is always stretched and compressed. The added mass does nothing there because the base does not move, while the added stiffness raises the frequency."],
   ["Lab 9", "In Mode 3 of a string fixed at both ends, point B does not move and point C is at the bottom of a bump. What happens to Mode 3 if you add a small weight at B? At C? If you stiffen the string at B?", "A weight at B leaves Mode 3 the same, because B does not move in Mode 3. A weight at C lowers Mode 3's frequency, because C swings the most and the extra mass counts there. Stiffening the string at B raises Mode 3's frequency, because B is where the string stretches the most."],
   ["Lab 9", "The same spot B is moving in Mode 1. Does a weight at B change Mode 1's frequency?", "Yes, the weight lowers Mode 1's frequency. In Mode 1 the whole string is one bump, so the spot at B is moving, and extra mass at a moving spot slows the vibration."],
  ],
 },
 {
  "id": "harmonics-formants", "tier": "Almost certain", "lectures": "Lectures 11, 12, 13 and 14",
  "title": "Harmonics and formants: fixed-fixed and fixed-free systems",
  "know": [
   "Fixed-fixed: A system fixed at both ends, such as a string or the **vocal folds**, has modes at **1, 2, 3, 4 times** the first. These are **harmonics**.",
   "Why whole numbers: The first mode is **half a wave**, and each higher mode must fit a whole number of those half-waves between the two fixed ends. Mode N contains N copies of Mode 1.",
   "Fixed-free: A system fixed at one end and free at the other, such as a **building** or the **air in the vocal tract**, has modes at **1, 3, 5, 7 times** the first. These are **formants**.",
   "Why odd numbers: The first mode is a **quarter-wave packet** from no motion to the most motion. The free end must always be moving, so packets are added two at a time, giving one, three, five and seven packets.",
   "Spacing: Fixed-fixed modes are spaced by the first frequency. Fixed-free modes are spaced by **twice** the first frequency.",
   "Building analogy: A building is fixed to the ground and free at the top, just as the air in the vocal tract is fixed at the closed vocal folds and free at the open lips.",
   "Spectrum: A **spectrum** has frequency on the horizontal axis and amplitude on the vertical axis, with one spike for each mode that is present.",
   "Scientific method: The theory that the vocal folds are a membrane predicts **equidistant harmonics** (evenly spaced harmonics). Recordings in Praat confirmed the prediction.",
  ],
  "questions": [
   ["Review 7", "A string is fixed on both sides. If Mode 1 has frequency 200 Hz, what frequency does Mode 5 have?", "Mode 5 has a frequency of 1000 Hz. In a string fixed at both ends, each mode is a whole-number multiple of the first, and Mode 5 contains five copies of Mode 1, so it is five times 200 Hz."],
   ["Lab 9", "A string fixed at both ends has Mode 1 at 150 Hz. What are Modes 2 and 3? If one end is freed and Mode 1 stays at 150 Hz, what are Modes 2 and 3 now?", "Fixed at both ends, Modes 2 and 3 are 300 and 450 Hz, which are two and three times 150. Fixed at one end and free at the other, Modes 2 and 3 are 450 and 750 Hz, which are three and five times 150, because only the odd multiples occur. The fixed-fixed modes are 150 Hz apart, and the fixed-free modes are 300 Hz apart."],
   ["Review 8", "Why are the frequencies of fixed-fixed vibratory systems spaced the way they are?", "In a system fixed at both ends, the first mode is half a wave, going from no motion at one end to the most motion in the middle and back to no motion. Every higher mode must fit a whole number of those half-waves into the same length, because both ends must stay still. Mode 2 fits two, so it vibrates twice as fast, and Mode 3 fits three, so the frequencies are evenly spaced whole-number multiples of the first."],
   ["Review 16", "Why are the formants of a fixed-free system 1, 3, 5, etc. multiples of the base frequency?", "In a fixed-free system the basic piece is a quarter-wave packet, which runs from no motion at the fixed end to the most motion at the free end. Every mode must start still at the fixed end and end with the most motion at the free end. One extra packet would leave a still point at the free end, which cannot happen, so packets are added two at a time, giving one, three, five and seven packets and odd-multiple frequencies."],
   ["Predicted", "If F1 is 500 Hz, what are F2 and F3?", "F2 is 1500 Hz and F3 is 2500 Hz. The air in the vocal tract is a fixed-free system, so its formants are odd multiples of the first, which are three times and five times 500 Hz, not two and three times."],
   ["Review 17", "What aspect of speech has the properties in the fixed-free question?", "The formants of the air in the vocal tract have these properties. The air is fixed at the closed vocal folds and free at the open lips, so its frequencies of vibration, the formants, are odd multiples of the first formant."],
   ["Predicted", "What aspect of speech has frequencies at whole-number multiples, and why?", "The harmonics of the vocal folds have whole-number multiples. The vocal folds are a membrane held in place along their edges, so they behave like a system fixed at both ends, and each mode is a whole number of copies of the first."],
   ["Review 12 and 13", "What in speech is a building analogous to, and why does the analogy hold?", "A building is analogous to the air in the vocal tract. Both are fixed at one end and free at the other: the building is fixed to the ground and free at the top, and the air is fixed at the closed vocal folds and free at the open lips. Because the ends match, both have springiness at the fixed end, the most motion at the free end, and frequencies at odd multiples of the first."],
   ["Predicted", "How is a building different from the air in the vocal tract?", "Engineers design a building to sway only in Mode 1, because higher modes would move floors in opposite directions and could break the structure. The air in the vocal tract vibrates in all of its modes at once, and speaking changes the mass and stiffness of the air at different locations to move those formants."],
   ["Review 9", "Draw the spectrum for a string fixed at both ends with Mode 1 at 200 Hz, up to Mode 6.", "Draw frequency along the horizontal axis and amplitude up the vertical axis. Put six evenly spaced spikes at 200, 400, 600, 800, 1000 and 1200 Hz, one for each mode. If the modes are equally strong, the spikes can be drawn the same height."],
   ["Predicted", "Draw the spectrum for a fixed-free system with Mode 1 at 200 Hz, up to Mode 4.", "Draw spikes only at the odd multiples: 200, 600, 1000 and 1400 Hz. A fixed-free system has no even multiples, because an even number of quarter-wave packets would leave a still point at the free end."],
   ["Review 10", "If the vocal folds have their base frequency, F0, at 150 Hz, draw the spectrum for the first 5 harmonics.", "Draw spikes at 150, 300, 450, 600 and 750 Hz, with frequency along the bottom and amplitude going up. The vocal folds are a membrane fixed along its edges, so their harmonics are whole-number multiples of F0 and the spikes are evenly spaced 150 Hz apart."],
  ],
 },
 {
  "id": "constrictions", "tier": "Almost certain", "lectures": "Lectures 12, 13 and 14",
  "title": "The vocal tract, constrictions and the vowels /i/, /a/ and /u/",
  "know": [
   "Fixed-free tube: The air in the vocal tract is **fixed at the glottis** (closed vocal folds, so the air can only be compressed) and **free at the lips** (the air moves in and out).",
   "Schwa: With no constriction, as in **done**, the formants are about **500, 1500 and 2500 Hz**.",
   "Constriction: A **constriction** (narrowing) packs the air into a smaller space, which makes it both **heavier** (denser) and **stiffer**.",
   "Four steps: Find the location, decide whether the air there is mostly **moving** or mostly **compressed** in that mode, pick the extra that counts (mass if moving, stiffness if compressed), then say whether the formant goes **down** or **up**.",
   "/u/ (dune): The constriction is at the lips, where the air is moving in both modes, so **F1 and F2 both go down**.",
   "/i/ (dean): The constriction is two-thirds of the way from the glottis. The air there moves in Mode 1 and is compressed in Mode 2, so **F1 goes down and F2 goes up** (the formants move apart).",
   "/a/ (Don): The constriction is one-third of the way from the glottis. The air there is compressed in Mode 1 and moves in Mode 2, so **F1 goes up and F2 goes down** (the formants move together).",
   "Reasoning backward: A large rise means the air there was springy and hardly moving. A large fall means the air there was moving a lot.",
  ],
  "questions": [
   ["Review 19", "If I constrict the vocal tract somewhere and I raise the formant a great deal, what must be true of air motion versus springiness at this location?", "At that location the air must be very springy and hardly moving in that mode. A constriction adds both mass and stiffness, and the formant went up, so the added stiffness is what counted. Stiffness only counts where the air is compressed and expanded, and the added mass did nothing because the air there was not moving."],
   ["Predicted", "If I constrict the vocal tract somewhere and I lower the formant a great deal, what must be true at this location?", "At that location the air must be moving a lot and hardly compressed in that mode. The formant went down, so the added mass is what counted, and mass only counts where the air is moving. This is what happens at the lips for /u/."],
   ["Lab 9", "A classmate says more mass lowers the frequency and more stiffness raises it, so a constriction always cancels out. What is wrong with this argument?", "In any one mode, at most locations only one of the two changes matters. If the air at the constriction is mostly moving, it is not being compressed, so only the extra mass counts and the formant goes down. If the air there is mostly compressed, it is not moving, so only the extra stiffness counts and the formant goes up, which is why the same constriction can push F1 and F2 in opposite directions."],
   ["Lab 9", "Why is the air in the vocal tract a fixed-free system? Say which end is which.", "The glottis end is closed off by the vocal folds, so the air there cannot move and can only be compressed and expanded, which makes it the fixed end. The lip end is open, so the air there moves freely in and out without being compressed against anything, which makes it the free end."],
   ["Predicted", "Compared with done, what happens to F1 and F2 in dune, and why?", "Both F1 and F2 go down. Lip rounding creates a constriction at the free end, where the air moves the most in every mode. The added mass therefore counts in both Mode 1 and Mode 2, and extra mass at a moving location lowers the frequency."],
   ["Predicted", "Compared with done, what happens to F1 and F2 in dean, and why?", "F1 goes down and F2 goes up. The constriction is about two-thirds of the way from the glottis. In Mode 1 the air there is moving, so the added mass lowers F1, and in Mode 2 the air there is compressed, so the added stiffness raises F2."],
   ["Predicted", "Compared with done, what happens to F1 and F2 in Don, and why?", "F1 goes up and F2 goes down. The constriction is about one-third of the way from the glottis. In Mode 1 the air there is compressed, so the added stiffness raises F1, and in Mode 2 the air there is moving, so the added mass lowers F2."],
   ["Lab 9", "A new constriction is placed deep in the throat, one-fifth of the way from the glottis, where the air is compressed in both Mode 1 and Mode 2. What happens to F1 and F2?", "Both F1 and F2 go up. The location is near the fixed end, where the air is compressed in both modes, so the added stiffness is what counts in both, and extra stiffness raises the frequency."],
   ["Predicted", "Why does rounding the lips lower every formant?", "The lips are the free end of the vocal tract, and the free end is a location of maximum motion in every mode. A constriction there adds mass where the air is moving, so it lowers every formant. This is the same reason that adding mass at the top of a building lowers every mode."],
  ],
 },
 {
  "id": "source-filter", "tier": "Likely", "lectures": "Lectures 13 and 14",
  "title": "Source and filter, and F0",
  "know": [
   "Source: The **vocal folds** are the source. They produce **harmonics** at whole-number multiples of **F0**, the base frequency.",
   "Filter: The **air in the vocal tract** is the filter. Its **formants** decide which harmonics are loud.",
   "Core rule: **A formant makes the harmonics closest to it louder, and harmonics far from any formant come out weaker.** The outline of the harmonic heights is the **envelope**.",
   "Vowels: The harmonics stay the same from vowel to vowel. Only their heights change, and the envelope is what makes each vowel distinct.",
   "F0: Heavy, loose vocal folds give a low F0. Tight, light vocal folds give a high F0, so the harmonics are spaced farther apart.",
   "High voices: With a high F0, few harmonics fall near each formant, so the formants are hard to see. This is why a toddler's or a soprano's vowels are hard to identify.",
   "F0 carries meaning: F0 falls at the end of a statement and rises at the end of a question, and it signals sarcasm or pretending.",
  ],
  "questions": [
   ["Predicted", "What does the source supply and what does the filter do in speech?", "The vocal folds are the source, and they supply the harmonics, which are whole-number multiples of F0. The air in the vocal tract is the filter, and its formants make the harmonics near them louder and the ones far from them weaker. So the source decides which frequencies are present, and the filter decides which of them are loud."],
   ["Predicted", "Two vowels are said at the same pitch. What is the same and what is different in their spectra?", "The harmonics are the same, because the vocal folds vibrate at the same F0 for both vowels. The heights of the harmonics are different, because each vowel has its constriction in a different place, which moves the formants and changes the envelope."],
   ["Predicted", "Why are a toddler's vowels hard to identify?", "A toddler has a very high F0, so the harmonics are spaced far apart. Few harmonics fall near each formant, and a formant can fall between two harmonics, so the envelope is hard to see. The formants are still there, but there are too few harmonics to reveal them."],
   ["Predicted", "If the vocal folds become tighter, what happens to F0 and to the spacing of the harmonics?", "F0 goes up, because tighter vocal folds are stiffer, and more stiffness raises the frequency. The harmonics are multiples of F0, so they are spaced farther apart."],
  ],
 },
 {
  "id": "spectrogram", "tier": "Almost certain", "lectures": "Lectures 13 and 14",
  "title": "Spectra, spectrograms and speech over time",
  "know": [
   "Spectrum: A **spectrum** shows one instant, with frequency on the horizontal axis and amplitude on the vertical axis.",
   "Spectrogram: A **spectrogram** lines up many spectra over time. Time is on the horizontal axis, frequency on the vertical axis, and **darkness** shows amplitude.",
   "Dark bands: The **dark bands are the formants**. F1 is the lowest band and F2 is the next one up.",
   "Transitions: From schwa to /i/, the bands move apart. From schwa to /u/, both drop. From schwa to /a/, they move together.",
   "Where were you a year ago?: The formants never stay still, because every sound moves the constriction. Speech is a continuous series of constrictions, not a list of separate vowels.",
   "ma and na: When the m of ma is joined to the a of na, listeners hear na. Listeners decide on the consonant during the vowel, after the consonant is over (Malécot, 1950s).",
  ],
  "questions": [
   ["Review 18", "Describe a spectrogram.", "A spectrogram lines up many spectra side by side over time. Time runs along the horizontal axis and frequency runs up the vertical axis, and the darkness of each spot shows how much amplitude there is at that frequency and time. The formants appear as dark bands, so you can follow them as they rise and fall, for example F1 rising and F2 falling from /i/ to /a/."],
   ["Predicted", "How is a spectrum different from a spectrogram?", "A spectrum shows one frozen instant, with frequency on the horizontal axis and amplitude on the vertical axis. A spectrogram shows how the spectrum changes over time, with time on the horizontal axis, frequency on the vertical axis and amplitude shown as darkness. Real speech is always changing, so a spectrogram shows the formants moving."],
   ["Lab 9", "A speaker starts on schwa and switches to another vowel. F1 goes down and F2 goes up. Which vowel? What if both go down?", "When F1 goes down and F2 goes up, the bands move apart, so the vowel is /i/ as in dean. When both F1 and F2 go down, the vowel is /u/ as in dune, because lip rounding lowers every formant."],
   ["Predicted", "Describe the spectrogram of a speaker going from schwa to the vowel of Don.", "F1 goes up and F2 goes down, so the two lowest dark bands move toward each other. The constriction one-third of the way from the glottis is compressed in Mode 1 and moving in Mode 2, so it raises F1 and lowers F2."],
   ["Predicted", "Why do listeners hear na when the m of ma is joined to the a of na?", "The information about the consonant is carried mostly by the vowel that follows it. After n, one formant of the vowel drops, and after m, that formant stays flat, so the a from na still signals n. Listeners therefore decide which consonant they heard during the vowel, after the consonant is over."],
  ],
 },
 {
  "id": "network-forward", "tier": "Likely", "lectures": "Lectures 14, 15 and 16",
  "title": "Neural networks: inner products, weights and decisions",
  "know": [
   "Task: The vowel network takes **F1 and F2** and decides among five words, **done, dune, dean, Don and Dan**.",
   "Knowledge: **The network's knowledge is stored in its weights**, which are positive or negative numbers.",
   "Inner product: Each neuron multiplies each incoming activation by its weight and adds the results. This **inner product** is the core calculation of all AI.",
   "Forward propagation: The inner products are carried layer by layer from the input to the output.",
   "Output: The output is a **probability distribution**, numbers between 0 and 1 that **add up to 1**. The largest one is the decision.",
   "Desired output: The right answer is a **one-hot** list, 1 for the correct word and 0 everywhere else, such as 0, 0, 1, 0, 0 for dean.",
   "Direction questions: A positive activation times a positive weight is positive, so raising either one pushes that output's probability **up**. A negative weight would push it down.",
  ],
  "questions": [
   ["Predicted", "If an activation of 1.57 feeds the done output through a weight of positive 0.1, what happens to the probability of done if the weight goes up? If the activation goes up?", "The probability of done goes up in both cases. The contribution to the done output is the activation times the weight, and both are positive, so raising either one makes the product larger and pushes done up. No multiplication is needed, only the signs."],
   ["Predicted", "What happens to the probability of done if that same weight were negative and the activation went up?", "The probability of done goes down. A positive activation times a negative weight is negative, so a larger activation makes the contribution more negative and pushes the done output down."],
   ["Predicted", "Is 0.2, 0.3, 0.1, 0.2, 0.3 a valid probability distribution?", "No. The numbers add up to 1.1, and a probability distribution must add up to exactly 1."],
   ["Based on HW5 5", "The first of five categories is correct. Write the desired output.", "The desired output is 1, 0, 0, 0, 0. It puts all of the probability on the correct category and zero on every other category."],
   ["Lab 9", "The desired output over done, dune, dean, Don, Dan is 0, 0, 0, 1, 0, and the network outputs 0.10, 0.15, 0.60, 0.10, 0.05. Which vowel was said, which did the network guess, and what is the loss?", "Don was said, and the network guessed dean, because dean has the largest probability, 0.60. The loss is a number that measures how far the computed output is from the desired output, for example how much probability it put on dean where there should be a 0."],
   ["Based on HW5 3", "What does Linear mean in the network code?", "Linear means the layer computes inner products. Each neuron multiplies each incoming number by its weight and adds the results, with no other step."],
  ],
 },
 {
  "id": "backprop", "tier": "Almost certain", "lectures": "Lectures 15 and 16",
  "title": "Backpropagation: why learning starts at the end",
  "know": [
   "Learning: Every network starts with **random weights** and learns by correcting its mistakes, one small step at a time.",
   "Order: **The last set of weights is updated first, and the first set of weights is updated last.**",
   "Why the end is easy: The last weights affect the output probabilities **directly**, so one inner product shows whether each should go up or down.",
   "Why the start is hard: A first-layer weight affects the first hidden layer, which affects the next layer and the next, so its effect on the decision passes through every layer and depends on all the later weights.",
   "Dynamic programming: Solve the easy problem first and reuse its answer for the bigger problem that contains it (Bellman and Viterbi).",
   "Formula: **Backpropagation is stochastic gradient descent plus dynamic programming.** SGD changes each weight a little, and dynamic programming sets the order.",
   "Credit: Backpropagation was worked out in the mid-1980s, and Geoffrey Hinton won the 2024 Nobel Prize in Physics for it.",
  ],
  "questions": [
   ["Based on HW5 6", "In what order are the weights updated?", "The last set of weights is updated first, and the first set of weights is updated last. Each layer's update reuses what was already worked out for the layers after it."],
   ["Based on HW5 7", "Why does backpropagation start at the end?", "The last set of weights affects the output probabilities, which are the decision, directly, so it is easy to tell whether raising or lowering each one makes the loss go up or down. A weight from the input to the first hidden layer affects the first hidden layer, then the second, then the third, and only then the output, so working out how to change it is a very complex problem that contains the problem of changing the last weights. Following dynamic programming, the simplest problem is solved first, and its answer makes the harder problems easier until the most complex one is solved."],
   ["Based on HW5 8", "What two methods together train the network's weights?", "Stochastic gradient descent and backpropagation. Backpropagation works backward from the error to find which way each weight should change, and stochastic gradient descent moves each weight a small step in that direction."],
   ["Predicted", "Backpropagation is made of what two parts?", "Backpropagation is stochastic gradient descent plus dynamic programming. Stochastic gradient descent nudges each weight a small step in the direction that lowers the error, and dynamic programming sets the order, from the last weights back to the first."],
   ["Lab 9", "Which part of training is the SGD part, and which is the dynamic programming part? What are the small problem and the big problem?", "The SGD part is the adjusting, where each weight takes a small step, sized by the learning rate, in the direction that lowers the error. The dynamic programming part is the order of assigning blame, last layer first, reusing each layer's blame for the layer before it. The small problem is the blame of the last layer's weights, and the big problem is the blame of the early weights."],
   ["Predicted", "The network said done but the answer was dean. Should a last weight that pushes done up go up or down? Why?", "It should go down. The probability of done is too high, because the desired output for done is zero. Lowering a weight that pushes done up shrinks its contribution and pulls the probability of done toward zero."],
   ["Predicted", "If the network already makes the right decision on a recording, what does it learn from it?", "It learns nothing from that recording, because there is no error to correct. This can be a problem, because a network can keep getting the right answers by memorizing its data without learning the pattern underneath."],
  ],
 },
 {
  "id": "pytorch", "tier": "Almost certain", "lectures": "Lectures 14, 15 and 16",
  "title": "Reading the PyTorch code",
  "know": [
   "Import lines: They bring in the **torch library**, which already contains the programs for inner products and backpropagation, so none of it has to be written by hand.",
   "Sequential: The network is **a sequence of layers, one after another**.",
   "nn.Linear(2, 3): A processing layer that **takes input from 2 neurons and has 3 neurons**. It computes inner products.",
   "Counting layers: The **input layer gets no line**, because it does no processing. The **last line is always the output layer**. nn.Sigmoid lines are not layers.",
   "Matching: The first number on each line must equal the second number on the line before it.",
   "Training lines: **SGD** is stochastic gradient descent, **lr** is the learning rate, **loss** is the mistake, **backward** runs backpropagation and **step** updates the weights.",
   "Learning rate: **A higher learning rate learns faster but less accurately. A lower one learns more accurately but more slowly.**",
  ],
  "questions": [
   ["Review 20", "How many hidden layers does this network have: Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)?", "It has three hidden layers, with three, two and four neurons. The network has five layers in all, the input layer, three hidden layers and the output layer, but only four Linear lines, because the input layer does no processing and the last line is the output layer."],
   ["Review 21", "Write the code for the network with an additional hidden layer of 3 neurons right before the output layer, and adjust the other layers.", "Keep the first three lines, change the old last line from Linear(4, 5) to Linear(4, 3), and add a new last line, Linear(3, 5). The network becomes Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 3), Linear(3, 5), so every layer still takes in exactly as many numbers as the layer before it produces."],
   ["Predicted", "Add a hidden layer of 6 neurons right after the input instead. What changes?", "The first line becomes Linear(2, 6), and a new second line, Linear(6, 3), feeds the old first hidden layer. The rest stays the same, giving Linear(2, 6), Linear(6, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)."],
   ["Lab 9", "A network is written Linear(4, 3), Linear(3, 5), Linear(5, 2), Linear(2, 4). How many hidden layers, inputs and outputs does it have?", "It has three hidden layers, with 3, 5 and 2 neurons. It takes 4 numbers as input and has 4 output neurons, so it decides among 4 categories."],
   ["Predicted", "How many hidden layers does a network have if its code is Linear(2, 3), Sigmoid, Linear(3, 2), Sigmoid, Linear(2, 4), Sigmoid, Linear(4, 5)?", "It still has three hidden layers. Sigmoid lines are not layers, because they only apply the sigmoid to the layer before them, so only the four Linear lines count, and the last one is the output layer."],
   ["Predicted", "What do the import lines do, and what does Sequential mean?", "The import lines bring the torch library into Python, so the programs for inner products and backpropagation do not have to be written by hand. Sequential means the network is a sequence of layers, one after another, with each layer taking its input from the layer before it."],
   ["Based on HW5 9", "What happens if the learning rate is raised from 0.1 to 0.3?", "The network learns faster, but its accuracy goes down. A larger learning rate takes bigger steps, so it approaches the answer quickly but keeps overshooting."],
   ["Lab 9", "Two learning curves differ only in learning rate. One rises fast and jumps around, and the other rises slowly and smoothly. Which used the larger learning rate?", "The one that rises fast and jumps around used the larger learning rate. Bigger steps get near the answer quickly but overshoot, while smaller steps are slower but smoother."],
  ],
 },
 {
  "id": "sigmoid", "tier": "Likely", "lectures": "Lectures 15 and 16",
  "title": "The sigmoid and where the idea came from",
  "know": [
   "From the brain: **Lord Edgar Adrian** won the Nobel Prize in 1932 for showing that **neurons are nearly digital**, either firing or not firing.",
   "What it does: The **sigmoid** takes an inner product and returns a number between 0 and 1.",
   "Values: A large negative input gives about **0** (off), a large positive input gives about **1** (on), and an input of exactly 0 gives **0.5**.",
   "Perception: Very different things can be perceived as the same (a friend with or without a hat), and very similar things as different (USC and UCLA), just like the flat parts and the steep middle of the sigmoid.",
   "In code: nn.Sigmoid goes after each hidden layer. The last layer has no sigmoid, because its outputs go to the loss, which turns them into probabilities.",
   "Bigger idea: Many basic ideas in AI, including neurons, inner products and near-digital firing, come from discoveries about real brains.",
  ],
  "questions": [
   ["Predicted", "Where does the idea of the sigmoid come from?", "It comes from biology. Lord Edgar Adrian discovered that real neurons are nearly digital, firing or not firing, and won the Nobel Prize in 1932. The sigmoid copies this by squashing any inner product into a number between 0 and 1, so a neuron is nearly off or nearly on."],
   ["Lab 9", "A hidden neuron's inner product is minus 2. Is its sigmoid activation closer to 0 or 1, and what does that mean?", "It is closer to 0, because the input is negative. The neuron is mostly off and fires only rarely."],
   ["Lab 9", "If one input to that neuron goes up through a positive weight, what happens to its linear activation and its sigmoid activation?", "Both go up. The larger input times a positive weight raises the inner product, and the sigmoid always rises when its input rises, so the neuron fires more often."],
   ["Lab 9", "What is the sigmoid activation if the linear activation is exactly 0?", "It is 0.5, halfway between off and on, so the neuron is half active."],
   ["Predicted", "How does the sigmoid match human perception?", "Some very different things are perceived as the same, and some very similar things are perceived as different. The flat parts of the sigmoid give the same output for very different inputs, such as minus 100 and minus 1000, while the steep middle gives very different outputs for two nearly equal inputs on either side of zero."],
  ],
 },
 {
  "id": "training", "tier": "Likely", "lectures": "Lecture 16",
  "title": "Training results: chance, overlap and repeated runs",
  "know": [
   "Chance: Accuracy starts at **20 percent**, because with random weights the network knows nothing, and a random guess among **five** vowels is right one time in five.",
   "Other counts: With ten categories, chance would be 10 percent.",
   "Epoch: Each pass of learning is an **epoch**, and a problem like this takes thousands of them.",
   "Leveling off: The network jumps to about 40 percent and levels off near **45 percent**, because the real vowel data **overlap** so much.",
   "Overlap: Peterson and Barney found this overlap in the early 1950s. Even a person would have to guess for a point in the middle of the overlap.",
   "Repeated runs: Ten runs from different random starting weights take **different paths but end at the same accuracy**, like children who hear different input but learn the same language.",
   "Memorizing: Children first say went correctly by memory, then say goed after learning the pattern, then learn the exception (Carol Chomsky).",
  ],
  "questions": [
   ["Based on HW5 10", "Why does accuracy start at 20 percent?", "There are five categories, and with random weights the network knows nothing, so its guesses are no better than chance. Guessing at random among five vowels is right one time in five, which is 20 percent."],
   ["Predicted", "Why does accuracy start at 10 percent for a network with ten output categories?", "With random weights the network's guesses are no better than chance, and a random guess among ten categories is right one time in ten, which is 10 percent."],
   ["Predicted", "Why does the vowel network level off near 40 to 45 percent instead of 100 percent?", "The real formant data for the five vowels overlap a great deal, so many recordings with nearly the same F1 and F2 belong to different vowels. For a point in the middle of the overlap, even a person would have to guess, so no network can classify those points reliably."],
   ["Predicted", "Ten training runs start from different random weights. What happens?", "The runs take different paths, with some jumping up early and some staying at chance longer, but all of them end at about the same accuracy. Stochastic gradient descent involves chance along the way, but the end point is the same."],
  ],
 },
 {
  "id": "possible-llm", "tier": "Possible", "lectures": "Lecture 17 (start)",
  "title": "Possible: from the vowel network to sequences",
  "note": "The professor said on Nov 10 that the LLM part is for the final. The TA's Lab 9 review still included these questions, so read them once.",
  "know": [
   "One vector versus many: The vowel network takes one vector (F1 and F2) and chooses among five categories. An LLM takes many vectors in sequence and predicts what comes next.",
   "Recurrent network: Michael Jordan's 1985 network fed its output back into its input to model speech production over time.",
   "Phonotactics: The rules for which sounds can follow which are **phonotactics**. A network trained only to guess the next letter learns them.",
  ],
  "questions": [
   ["Lab 9", "What is the difference between the input and output of the vowel network and those of an LLM?", "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."],
   ["Lab 9", "Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp?", "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."],
  ],
 },
]

LABS = [
 {
  "id": "lab5", "title": "Lab 5: Simple and complex vibrations", "date": "Module II, first lab",
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
   "Spectral slice axes: Frequency in hertz on the horizontal axis, amplitude in decibels on the vertical axis.",
  ],
  "questions": [
   ["What do all mass-spring systems do in Mode 1?", "All the masses move up and down together, as if they were one mass, so no spring stretches. Mode 1 is always the lowest-frequency mode."],
   ["How does the frequency of a string change from Mode 1 to Mode 5?", "It increases by the same step each time, such as 100, 200, 300, 400 and 500 Hz. Mode N has N bumps, so it is N times the frequency of Mode 1."],
   ["What two things does a recorded vowel need to show to support the theory that the vocal folds are a membrane?", "The waveform must be a complex vibration, not a simple sine wave, and its spectrum must be a combination of simple vibrations at equidistant frequencies. A recorded vowel shows both, so the prediction holds."],
  ],
 },
 {
  "id": "lab6", "title": "Lab 6: Fixed-fixed, fixed-free and the vocal tract", "date": "Oct 19",
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
   "Vocal tract table: Don (one-third) compressed in Mode 1 and moving in Mode 2, so F1 up and F2 down. Dean (two-thirds) moving in Mode 1 and compressed in Mode 2, so F1 down and F2 up. Dune (lips) moving in both, so both down.",
  ],
  "questions": [
   ["In Mode 2 of a 3-mass system, is mass 2 moving, and are its springs stretching?", "Mass 2 is not moving, but the springs attached to it are stretching. Its neighbors move in opposite directions, so the springs on both sides are pulled and compressed."],
   ["You add extra mass at the free top of a fixed-free string. What happens to Mode 1 and Mode 2?", "Both go down. The free end moves the most in every mode, so the extra mass counts in both modes and lowers both frequencies."],
   ["You stiffen a fixed-free string at its fixed bottom. What happens to Mode 1 and Mode 2?", "Both go up. The fixed end stretches the most in every mode, so the extra stiffness counts in both and raises both frequencies."],
   ["Does the extra mass and stiffness of a constriction simply cancel out?", "No. At a location where the air mostly moves, the extra mass wins and the formant goes down, and at a location where the air is mostly compressed, the extra stiffness wins and the formant goes up. The same constriction can affect F1 and F2 differently."],
  ],
 },
 {
  "id": "lab7", "title": "Lab 7: Formants, constrictions and the first neural network", "date": "Late October",
  "use": "Matches review questions 16 to 19 and the network basics. The tables are good to memorize.",
  "material": [
   "Names: In a fixed-fixed system such as the vocal folds, each mode is a **harmonic**, at multiples of the first. In a fixed-free system such as the air in the vocal tract, each mode is a **formant**, at odd multiples of the first.",
   "Example with a first mode of 100 Hz: The 1st, 2nd and 3rd harmonics are 100, 200 and 300 Hz. The 1st, 2nd and 3rd formants are 100, 300 and 500 Hz.",
   "Fitting: The 1st harmonic fits into the 2nd harmonic two times. The 1st formant fits into the 2nd formant three times.",
   "Constriction effects: Compressing air raises its stiffness, and packing it tighter makes it harder to move, so its mass rises too.",
   "Summary table: Dune (lips) both F1 and F2 down. Dean (two-thirds) F1 down and F2 up, so the formants move **away** from each other. Don (one-third) F1 up and F2 down, so the formants move **together**.",
   "Formant transitions in Praat: Going from schwa to each vowel without stopping shows the bands moving in exactly the directions of the table, which is how a spectrogram can be read without hearing the sound.",
   "Network anatomy: Three kinds of neurons (input, hidden, output). A **weight** is the strength of a connection. A neuron's activation is the **inner product** of the previous activations and their weights.",
   "Output: The output neurons form a **probability distribution**, with the options on the horizontal axis and probabilities that sum to 1 on the vertical axis.",
  ],
  "questions": [
   ["Assuming the first mode is 100 Hz, what are the first three modes of a fixed-fixed system and of a fixed-free system, and what are they called?", "The fixed-fixed system has its 1st, 2nd and 3rd harmonics at 100, 200 and 300 Hz. The fixed-free system has its 1st, 2nd and 3rd formants at 100, 300 and 500 Hz, because only the odd multiples occur."],
   ["For dean, go through the four steps for F2.", "The constriction is two-thirds of the way from the glottis. In Mode 2 the air there is compressed and stretched, so it behaves like a spring. The added stiffness is what matters, so F2 goes up."],
   ["A hidden neuron receives activations 5, minus 2 and 7 through weights minus 3, 4 and 10. How is its activation computed?", "Multiply each activation by its weight and add the results, which is the inner product. Here that is 5 times minus 3, plus minus 2 times 4, plus 7 times 10, which equals 47. The exam asks about the direction of such changes rather than the arithmetic."],
  ],
  "flags": [
   "The lab's Praat activity says the vowel in year decreases F1 and F2. That is incorrect, because /i/ lowers F1 and raises F2, as the lab's own summary table states.",
   "The lab's table calls the third fixed-free mode the 2nd formant. It is the 3rd formant, at 500 Hz.",
  ],
 },
 {
  "id": "lab8", "title": "Lab 8: How a network learns, and the code", "date": "Nov 2",
  "use": "Matches HW5 and review questions 20 and 21. Read the training cycle and the code notes.",
  "material": [
   "Training cycle: Start with random weights once, make a guess (forward pass), measure the error (the loss), assign blame backward to each weight, adjust each weight a little, and repeat many times.",
   "Why backward: A last-layer weight affects the output directly, so its effect is easy to judge. A first-layer weight affects the output only through every later layer, so its blame is tangled with all the later weights. Settling the last layer first and reusing that answer is dynamic programming, the same idea as Viterbi.",
   "When to stop: Keep some data the network never trains on (validation data). When accuracy on it stops improving, stop training.",
   "Data: 525 recordings with F1, F2 and the vowel. Each vowel name becomes a number from 0 to 4, because the network works with numbers.",
   "Architecture: 2 input neurons (F1 and F2), hidden layers of 3, 2 and 4, and 5 outputs. The two ends are set by the data, and the hidden layers are a design choice.",
   "Sigmoid in code: nn.Sigmoid applies the sigmoid to the layer before it. The last layer has no sigmoid, because its five numbers are the scores for the five vowels.",
   "Code pieces: The optimizer (SGD) is given the weights it may change. The loss measures the error, backward computes each weight's blame, and step adjusts the weights. Repeating the cycle 1000 times is 1000 epochs.",
  ],
  "questions": [
   ["Which steps of training belong to the forward pass, and which to the backward pass?", "The forward pass makes a guess by sending the input through the network and measures the error. The backward pass works back from the error to assign blame to each weight and adjusts the weights."],
   ["Why is the optimizer created before backward runs?", "The optimizer has to be given the list of weights it is allowed to change. It does not change anything until step runs."],
  ],
 },
 {
  "id": "lab9", "title": "Lab 9: The TA's Exam 2 review", "date": "Nov 9",
  "use": "This lab is an Exam 2 review written by the TA, so it is the closest lab to the exam. It covers all four parts, from vibration to LLMs and agents. Its questions appear in the topics of Study this first, marked Lab 9.",
  "material": [
   "Part 1, vibration: N masses have N modes. A mass on the boundary between two peaks does not move. Fixed-fixed modes are harmonics at 1, 2, 3 times the first, and fixed-free modes are formants at 1, 3, 5 times the first.",
   "Reading a complex vibration: If the shape repeats every 10 ms, the period is 10 ms and F0 is 100 Hz. In a vowel, the vocal folds vibrate at that F0, which is the pitch.",
   "Part 2, vocal tract: A plain tube gives about 500, 1500 and 2500 Hz. The four steps are location, moving or compressed, which extra counts, and up or down.",
   "Part 3, networks: A neuron's linear activation is an inner product. The sigmoid turns it into a number between 0 and 1. The loss measures how far the computed output is from the desired output. Backpropagation is SGD plus dynamic programming.",
   "Weights between layers: Between a 4-neuron layer and a 2-neuron layer there are 4 times 2, which is 8 weights, one from each of the 4 neurons to each of the 2.",
   "Part 4, from the vowel network to LLMs: The vowel network takes one vector, F1 and F2, and decides among a few categories. An LLM takes a sequence of many vectors and gives a probability distribution over what the next item could be.",
   "Part 4, agents: An agentic system is a group of LLMs all talking to each other, sometimes back and forth in loops.",
   "Part 4, phonotactics: Which letter can come next in an English word is decided by syllable structure, called **phonotactics**. A GPT trained only to guess the next letter ends up with that knowledge.",
  ],
  "questions": [
   ["A vibration repeats every 10 ms. What is its F0, and which part of the speech system vibrates at that F0 in a vowel?", "F0 is 100 Hz, because F0 is one divided by the period, and one divided by 10 ms is 100 per second. In a vowel, the vocal folds vibrate at F0, so F0 is how often they open and close, which is the pitch."],
   ["How many weights connect a 4-neuron layer to a 2-neuron layer?", "Eight. Each of the 2 neurons receives one weight from each of the 4 neurons that feed it, so there are 4 times 2 connections."],
   ["What is the difference between the input and output of the vowel network and those of an LLM?", "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."],
   ["Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp?", "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."],
   ["What could come next after pl_, st_ and th_, and what could not?", "After pl only a vowel can come, as in play. After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n."],
   ["What is an agentic system, and what does its critic loop prevent?", "It is a graph of LLMs, each with its own job, where one's output becomes the next one's input: outline, write, critique, revise and produce the final version. The loop between the critic and the reviser sends the draft back until the critic is satisfied, which prevents hallucination."],
  ],
 },
]

FLAGS = [
 "HW5 questions are labeled Based on HW5, because only the HW5 answer key was available. The answers come from the key, and the question wording is reconstructed from them.",
 "Lab 7 says the vowel in year decreases F1 and F2. The correct pattern is F1 down and F2 up, which Lab 7's own table, Lab 9 and the lectures all give.",
 "Lab 7 labels the third fixed-free mode the 2nd formant. It is the 3rd formant.",
 "Lab 9 Part 4 (LLMs, phonotactics, agents) was in the TA's review, but the professor said on Nov 10 that the LLM part is for the final.",
 "The studio's earlier answer to review question 4 said Mode 3 drops more than Mode 1 because the middle mass moves more in Mode 3. Lab 6 shows the middle mass moves the most in Mode 1, so that reason was wrong. The answer here gives only what is certain: Mode 1 and Mode 3 go down, and Mode 2 stays the same.",
]

# ---- Version 2: Lectures 11 to 18 (Jordan's scope). Version 1 above is kept unchanged.
SCOPE_V2 = {
    "covers": "Lectures 11 to 18: vibration and formants, spectrograms, the vowel network and its code, and large language models, heads and layers, Gestalt completion, agentic systems and phonotactics.",
    "final": "",
    "evidence": "On Exam 1, about 15 of the 25 questions came almost word for word from the review sheet, with only the sounds, numbers or positions changed. On Nov 5 he said heads are a question on the exam. Questions marked Predicted change one thing in a real review, homework, lab or lecture question. They are predictions, not confirmed exam questions.",
}

LLM_TOPICS = [
 {
  "id": "heads-layers", "tier": "Almost certain", "lectures": "Lecture 18",
  "title": "Heads and layers",
  "note": "On Nov 5 he said heads are a question on the exam, and the Lecture 18 slide says the same.",
  "know": [
   "Layer: A layer is one round of improvement. Layers go one after another, from the input to the output.",
   "Head: A head is one expert, and it is a set of weights. Heads sit side by side inside each layer.",
   "What a layer does: Each head gives its own opinion on how to improve the vectors, and the layer combines all of the heads' opinions into improved vectors. The next layer then does the same thing again.",
   "Classroom comparison: The classes you visit one after another are the layers, and the students in each class who each give you an opinion are the heads.",
   "Depth and width: Layers give an LLM depth, one round of improvement after another. Heads give it width, many experts asked at the same time in each round.",
   "Why so many: Predicting the next word is so hard that large systems have a hundred or more layers with about a hundred heads in each.",
   "How heads learn: If the predicted next word is wrong, every head in every layer adjusts its weights with backpropagation, so the next prediction is closer to the right word.",
  ],
  "questions": [
   ["Lecture 18", "What are heads, and how do they relate to layers?", "A head is one expert, a set of weights that gives its own opinion on how to improve the vectors. Heads sit side by side inside each layer, and the layer combines all of their opinions into improved vectors. Layers go one after another from the input to the output, so each layer improves the vectors again."],
   ["Predicted", "In the classroom comparison, what are the classes and what are the students?", "The classes are the layers, because you visit them one after another. The students in each class are the heads, because each one gives you a separate opinion at the same time, and you combine those opinions before moving on to the next class."],
   ["Predicted", "Which gives an LLM depth and which gives it width, heads or layers?", "Layers give it depth, because they are rounds of improvement that come one after another. Heads give it width, because many of them work side by side inside the same layer."],
   ["Predicted", "An LLM has 5 layers with 4 heads in each layer. How many heads does it have, and which of them work at the same time?", "It has 20 heads, because each of the 5 layers has 4. The 4 heads inside one layer work side by side at the same time, and the layers come one after another, so layer 2 works on the vectors that layer 1 improved."],
   ["Predicted", "The LLM predicts bark instead of barks after \"the dog that my parents ... \". Which weights change?", "The weights of every head in every layer change. Backpropagation assigns each weight its share of the blame for the wrong prediction, and each one is adjusted a little so that the next prediction is closer to barks."],
   ["Predicted", "Where is the knowledge of an LLM stored?", "It is stored in its weights. Each head is a set of weights, so the knowledge is spread across all the heads in all the layers, the same way the vowel network's knowledge is in its weights."],
  ],
 },
 {
  "id": "llm-sequences", "tier": "Likely", "lectures": "Lectures 17 and 18",
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
   "Hallucination: An LLM predicts from past data, so something its data does not cover can make it make things up.",
  ],
  "questions": [
   ["Lab 9", "What is the difference between the input and output of the vowel network and those of an LLM?", "The vowel network takes one vector, F1 and F2, and decides among five categories. An LLM takes many vectors in sequence, such as the words so far, and decides among a whole vocabulary for the next item."],
   ["Predicted", "What does a single neuron take in and give back? What about a neural network, and an LLM?", "A neuron takes in a vector and gives back one number, the inner product of the inputs and their weights. A neural network takes in one vector and gives back a vector of decisions. An LLM takes in many vectors, one for each moment of a sequence, and gives back a prediction of what comes next."],
   ["Predicted", "Why can't the vowel network model a sentence?", "It takes one static vector from one moment and makes one decision. A sentence is many words, one after another, and the right next word depends on the words before it, so it needs a system that takes a whole sequence of vectors."],
   ["Predicted", "An LLM is given 15 vectors and predicts the sixteenth. Name three things the vectors can stand for.", "They can be the words of a sentence, the frames of a spectrogram or the patches of an image, and they can also be the amino acids of a protein. The LLM only sees lists of numbers, so the same prediction game works for all of them."],
   ["Predicted", "What does the sixteenth vector look like, and does it add up to anything?", "It is a probability distribution over what could come next, with one number for each possible next item, such as each English word. Because it is a probability distribution, its numbers add up to one."],
   ["Predicted", "Why is the next word barks and not bark in \"the dog that my parents, who I love very much, ... \"?", "Barks goes with the singular word dog, no matter how many words come in between, even the plural word parents. To predict it, an LLM has to use a word far back in the sequence, which it learns from data by doing inner products layer after layer."],
   ["Predicted", "Why can an LLM hallucinate?", "It predicts from past data. When it meets something its data does not cover, its prediction can turn into a guess, so it can make things up."],
  ],
 },
 {
  "id": "gestalt-cloze", "tier": "Likely", "lectures": "Lecture 17",
  "title": "Gestalt completion and the cloze test",
  "note": "",
  "know": [
   "Gestalt completion: Gestalt psychology studies how people see whole patterns. People see a triangle in the Gestalt figure even though no triangle is drawn, because a large part of human knowledge is completing what is missing.",
   "Closure: Closure is the Gestalt word for completing a familiar pattern that is not quite finished, such as seeing a broken circle as whole.",
   "Cloze test: Words are removed from a text and people fill them in. The name comes from closure, and it tests knowledge by asking someone to complete a sequence.",
   "LLM learning: An LLM predicting the next word is playing a cloze game again and again. Training a system only to predict the missing piece turns out to copy human thinking.",
  ],
  "questions": [
   ["Predicted", "Describe the Gestalt principle of closure, and how an LLM uses it to learn.", "Closure is completing a familiar pattern that is not quite finished, such as seeing a triangle where none is drawn or a broken circle as whole. An LLM learns the same way, by predicting the missing next piece of a sequence again and again and correcting its weights when it is wrong."],
   ["Predicted", "What is a cloze test, and why is an LLM's training like one?", "In a cloze test, words are removed from a text and people fill them in, so knowledge is tested by completing a sequence. An LLM is trained by filling in the next word over and over, so for an LLM, completion is what knowledge is."],
   ["Predicted", "Why do people see a triangle in the Gestalt figure?", "No triangle is drawn, but people complete the missing parts because the pattern is familiar. This completion is the Gestalt principle of closure."],
  ],
 },
 {
  "id": "recurrent-dynamical", "tier": "Possible", "lectures": "Lectures 17 and 18",
  "title": "Recurrent networks and the LLM as a dynamical system",
  "note": "",
  "know": [
   "Recurrent network: Michael Jordan's network sends its own output back into part of its input, so what it produces at one moment helps predict the next moment. He built it because speech production changes over time.",
   "Plan and state units: Plan units and state units feed the hidden layer, the hidden layer feeds the output, and the output is copied back into the state units. The same weights are used at every step.",
   "GPT one word at a time: GPT predicts the next word, adds it to the prompt, and feeds everything back in to predict the word after that.",
   "Dynamical system: A dynamical system is a rule that is fed its own output again and again. In the harmonic oscillator, position and velocity take turns updating, and step by step the rule draws a cosine.",
   "The LLM as a dynamical system: In an LLM, each layer is the rule and the depth of the layers plays the role of time. The input vectors are the initial conditions, and each layer turns them into better vectors until the last layer can predict the next word.",
  ],
  "questions": [
   ["Predicted", "What makes Jordan's network recurrent?", "It sends its own output back into part of its input. Its output is copied into the state units, so what it produced at one moment helps it predict the next moment."],
   ["Predicted", "How is a recurrent network different from an nn.Sequential network?", "In a Sequential network, the input passes through the layers once, from the input to the output, and makes one decision. A recurrent network loops its output back into its input, so it works through a sequence step by step."],
   ["Predicted", "Why is an LLM called a dynamical system?", "A dynamical system is a rule fed its own output again and again, starting from initial conditions. In an LLM the input vectors are the initial conditions, and each layer applies its weights to turn them into better vectors, so the depth of the layers plays the role of time."],
   ["Predicted", "In the harmonic oscillator, which two numbers update, and in what order?", "Position x and velocity v take turns. First the new x is calculated from the old v, then the new v is calculated from the new x, and step by step the rule draws a cosine for x."],
  ],
 },
 {
  "id": "agentic", "tier": "Possible", "lectures": "Lectures 17 and 18",
  "title": "Agentic systems and Software 3.0",
  "note": "Lab 9 Part 4 asks what an agentic system is and what its loop prevents.",
  "know": [
   "Agentic system: An agentic system is a group of LLMs connected so that one's output becomes the next one's input. An agent in AI today is just an LLM.",
   "The lecture example: An outline LLM plans the answer, a writing LLM writes it, a critic LLM checks it, a revision LLM works back and forth with the critic, and a final LLM produces the answer the user sees.",
   "The critic loop: The draft goes back and forth between the critic and the reviser until the critic is satisfied or a limit is reached. The loop greatly reduced hallucination.",
   "Shared memory and fixed weights: Once each LLM is trained its weights usually do not change, and the agents share a common memory where they write and read information.",
   "Software 1.0, 2.0 and 3.0: Software 1.0 is writing a program in a language such as Python. Software 2.0 is training a neural network on input and output data, so the program is its weights. Software 3.0 is having an agentic system build and run the program from plain English instructions, which is called vibe coding.",
  ],
  "questions": [
   ["Lab 9", "What is an agentic system, in terms of LLMs? Describe the example from lecture.", "It is a graph of LLMs, each with its own job, connected so that one's output becomes the next one's input. One LLM outlines, one writes, one critiques, one revises and one produces the final version, with a loop between the critic and the reviser until the critic is satisfied or the limit is reached."],
   ["Lab 9", "What does the critic loop do, and what does it prevent that was common in earlier LLMs?", "It sends the draft back until the critic is satisfied, so errors are caught and fixed instead of being presented. It prevents hallucination, which was a common problem for earlier LLMs."],
   ["Predicted", "What would happen if the critic LLM were removed?", "The draft would go straight from writing to the final answer without being checked. More made-up statements would reach the user, because the critic loop is what greatly reduced hallucination."],
   ["Predicted", "What is the difference between Software 2.0 and Software 3.0?", "In Software 2.0, a neural network is trained on input and output data, so the program is its weights. In Software 3.0, an agentic system builds and runs the program from plain English instructions, as in vibe coding."],
  ],
 },
 {
  "id": "phonotactics", "tier": "Possible", "lectures": "Lectures 17 and 18",
  "title": "Phonotactics and guessing the next letter",
  "note": "Lab 9 Part 4 asks these directly.",
  "know": [
   "Phonotactics: The rules for which sounds can follow which are **phonotactics**. Every speaker knows them without being taught.",
   "Simple syllable: A simple English syllable is a consonant, a vowel and a consonant, as in Don or cup. The pattern is about sounds, not letters, so the silent e of shave does not count.",
   "Onset and coda: A cluster before the vowel is an onset, as in split, and a cluster after the vowel is a coda, as in lamp. The order is a mirror image around the vowel, so flat is a word and lfat is impossible.",
   "Syllable breaks: Atlantic is a word because t and l are on opposite sides of a syllable break, but tlantic is impossible because tl cannot start an English syllable. The sound ng can end a syllable but never start one.",
   "Other languages: Mandarin allows only nasal sounds at the end of a syllable, Russian and Polish allow clusters like zb or dl at the start of a word, and Spanish speakers add an e before st, as in estadio.",
   "Next-letter guessing: After a vowel, almost any letter can come next, so the probability distribution is flat. At the start of a word, the choices narrow to what an English onset allows, so after skr the distribution is sharply peaked on a few vowels.",
   "The GPT link: Guessing the next letter is predicting the sixteenth item, so a GPT trained only on this game learns English syllable structure.",
  ],
  "questions": [
   ["Lab 9", "Which could be English words: blick, bnick, sblat, splat, dlag, lisk, lisb, lapm, lamp? For each one that could not, name the problem.", "Blick, splat, lisk and lamp could be English words. Bnick, sblat and dlag are impossible because bn, sb and dl cannot start a syllable, and lisb and lapm are impossible because sb and pm cannot end one."],
   ["Lab 9", "Each of these starts an English word: pl_, st_ and th_. What could come next, and what could not?", "After pl only a vowel can come, as in play, so a consonant such as n cannot. After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n."],
   ["Predicted", "After which start is the next-letter distribution flatter, ra_ or skr_? Why?", "It is flatter after ra, because after a vowel almost any letter can come next, so the probability is spread over many letters. After skr only a vowel can come, so the probability piles onto a few vowels and the distribution is sharply peaked."],
   ["Predicted", "Why is Atlantic an English word but tlantic impossible?", "In Atlantic, the t and the l are on opposite sides of a syllable break, so each syllable follows the rules. In tlantic, tl would have to start a syllable, and English does not allow tl at the start of a syllable."],
   ["Predicted", "Could ngop be an English word? Could flim?", "Ngop could not, because the sound ng can end a syllable, as in ring, but can never start one. Flim could, because fl is an allowed onset, as in flat, and im is an allowed ending."],
   ["Predicted", "Why does a GPT trained only to guess the next letter end up knowing English syllable structure?", "Its predictions can only improve by matching the patterns of English syllables, because those patterns decide which letters can come next. So the knowledge ends up in the shape of its probability distributions, flat after a vowel and peaked after a start like skr."],
  ],
 },
]

TOPICS_V2 = [t for t in TOPICS if t["id"] != "possible-llm"] + LLM_TOPICS

FLAGS_V2 = [f for f in FLAGS if not f.startswith("Lab 9 Part 4")]

# ---- Version 3: Lectures 11 to 18 are fair game, emphasis on what he asked. Versions 1 and 2 are kept.
import copy

SCOPE_V3 = {
    "covers": "Lectures 11 to 18 are all fair game here. Everything leading up to large language models is described in full, and the LLM part is kept.",
    "final": "",
    "evidence": "Emphasis goes to what he asked: the 21 review questions, HW5 and his cues in class, including heads (Nov 5: heads are a question on the exam). On Nov 10 he said the review and homework questions go \"up to right before we got to LLMs\" and that the LLM part is kept for the final, so the LLM topics are marked Possible. On Exam 1, about 15 of the 25 questions came almost word for word from the review sheet. Questions marked Predicted change one thing in a real question and are predictions, not confirmed exam questions.",
}

LLM_NOTE = "LLM part: On Nov 10 he said the LLM part is kept for the final, so study it after the topics marked Almost certain and Likely."

LEADUP = {
 "id": "lead-up", "tier": "Likely", "lectures": "Lecture 17 (start) and Lecture 18",
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
  "The path to GPT: GPT works the same way, one word at a time. It predicts the next word, adds it to the prompt, and feeds everything back in to predict the word after that. Years like 1943, 1985 and 2017 give the history, but years are not asked on the exam.",
 ],
 "questions": [
  ["Predicted", "How does the all-or-none behavior of neurons connect to the sigmoid?", "They are the same idea. A real neuron is either firing or not firing, and the sigmoid turns an inner product into a number near 0 (off) or near 1 (on), with a steep change in between."],
  ["Predicted", "What do parallel and distributed mean in Parallel Distributed Processing?", "Parallel means many neurons calculate their activations at the same time. Distributed means the information from the inputs is spread across all the neurons rather than stored in one place."],
  ["Predicted", "What does a single neuron take in and give back? What about a neural network?", "A neuron takes in a vector and gives back one number, the inner product of the inputs and their weights. A neural network repeats the inner product layer after layer, so it takes in one vector and gives back a vector of decisions."],
  ["Predicted", "Why can't the vowel network model a sentence or speech over time?", "It takes one static vector, F1 and F2 from one moment, and makes one decision. Speech changes all the time and a sentence is many words one after another, so it needs a network that works through a sequence."],
  ["Predicted", "What makes Jordan's network recurrent, and why did he build it?", "It sends its own output back into part of its input, copying the output into the state units, so what it produced at one moment helps predict the next. He built it because speech production changes over time, as features like nasality and lip rounding switch on and off."],
  ["Predicted", "How is a recurrent network different from an nn.Sequential network?", "In a Sequential network, the input passes through the layers once, from the input to the output, and makes one decision. A recurrent network loops its output back into its input, so it works through a sequence step by step."],
  ["Predicted", "How does GPT use the same idea as Jordan's network?", "GPT also feeds its own output back in. It predicts the next word, adds that word to the prompt, and predicts again, one word at a time."],
 ],
}

PHONO_WORDS = [
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
 "Lab 9 starts: After pl_ only a vowel can come, as in play. After st_ a vowel or r can come, as in star and street, but not l or k. After th_ r, w or a vowel can come, as in three, thwart and thin, but not l or n.",
]

PHONO_QUESTIONS = [
 ["Predicted", "Which letter cannot come next after sp_ at the start of a word: l, r, n or a?", "N cannot. After sp only l, r or a vowel can come, as in split, spring and spa, because spn is not an allowed English onset."],
 ["Predicted", "Which letter cannot come next after k_ at the start of a word: a, n or t?", "T cannot. After k only a vowel or n can come, as in knee, because kt cannot start an English syllable."],
 ["Predicted", "What can come next after b_ or f_ at the start of a word, and what cannot?", "Only r, l or a vowel can come next, as in bring, black, frog and flat. N cannot, because bn and fn cannot start an English syllable."],
 ["Predicted", "What can come next after sh_ at the start of a word?", "Only a vowel or r can come next, as in ship and shrimp. Shr is the only cluster English allows there."],
 ["Predicted", "What can come next after skr_?", "Only a vowel can come next, as in scream and scrap. Skr already fills the onset, so no other consonant can be added."],
 ["Predicted", "Why are lfat, hepl and lapm impossible when flat, help and lamp are words?", "The order of a cluster is a mirror image around the vowel. In flat and help the l sits right next to the vowel, and in lamp the m does, so each impossible twin puts the wrong consonant next to the vowel."],
 ["Predicted", "Is ship a consonant, vowel, consonant word even though it has four letters?", "Yes. The pattern is about sounds, not letters, and sh is one sound. So ship is consonant sh, vowel i, consonant p."],
]

def _v3_topics():
    llm = {t["id"]: copy.deepcopy(t) for t in LLM_TOPICS}
    heads = llm["heads-layers"]
    heads["note"] = "On Nov 5 he said heads are a question on the exam, and the Lecture 18 slide says the same. This is the one LLM topic he named for the exam, so it stays Almost certain."
    seq = llm["llm-sequences"]
    seq["know"] = [k for k in seq["know"] if not k.startswith(("Levels:", "Static versus sequence:"))]
    seq["questions"] = [q for q in seq["questions"] if not q[1].startswith(("What does a single neuron", "Why can't the vowel network"))]
    dyn = llm["recurrent-dynamical"]
    dyn["title"] = "The LLM as a dynamical system"
    dyn["know"] = [k for k in dyn["know"] if not k.startswith(("Recurrent network:", "Plan and state units:", "GPT one word"))]
    dyn["questions"] = [q for q in dyn["questions"] if not q[1].startswith(("What makes Jordan", "How is a recurrent"))]
    for key in ["llm-sequences", "gestalt-cloze", "recurrent-dynamical", "agentic", "phonotactics"]:
        t = llm[key]
        t["tier"] = "Possible"
        t["note"] = LLM_NOTE + (" " + t["note"] if t["note"] else "")
    ph = llm["phonotactics"]
    ph["know"] = ph["know"] + PHONO_WORDS
    ph["questions"] = ph["questions"] + PHONO_QUESTIONS
    base = [t for t in TOPICS if t["id"] != "possible-llm"]
    return base + [LEADUP, heads] + [llm[k] for k in ["llm-sequences", "gestalt-cloze", "recurrent-dynamical", "agentic", "phonotactics"]]

TOPICS_V3 = _v3_topics()


def build(out_path):
    conv = lambda ts: [dict(t, questions=[dict(source=s, q=q, a=a) for s, q, a in t["questions"]]) for t in ts]
    topics, topics_v2, topics_v3 = conv(TOPICS), conv(TOPICS_V2), conv(TOPICS_V3)
    labs = [dict(l, blocks=lab_blocks(l), points=[bullet(m) for m in l["material"]], questions=[dict(q=q, a=a) for q, a in l["questions"]]) for l in LABS]
    data = {
        "versions": {
            "exam2-v1": {
                "label": "Exam 2 · Study this first (v1, Lectures 11–16)",
                "range": "Lectures 11 to 16",
                "howToAnswer": HOW_TO_ANSWER, "scope": SCOPE, "topics": topics, "flags": FLAGS,
            },
            "exam2-v2": {
                "label": "Exam 2 · Study this first (v2, Lectures 11–18)",
                "range": "Lectures 11 to 18",
                "howToAnswer": HOW_TO_ANSWER, "scope": SCOPE_V2, "topics": topics_v2, "flags": FLAGS_V2,
            },
            "exam2-v5": {
                "label": "Exam 2 · Study this first (Lectures 11–18, plain sentences)",
                "range": "Lectures 11 to 18",
                "howToAnswer": [], "scope": SCOPE_V3, "flags": FLAGS_V2,
                "topics": [dict(t, points=[bullet(k) for k in t["know"]]) for t in topics_v3],
            },
            "exam2-v6": {
                "label": "Exam 2 · Study this first (Lectures 11–18, Module I layout)",
                "range": "Lectures 11 to 18",
                "howToAnswer": [], "scope": SCOPE_V3, "flags": FLAGS_V2,
                "topics": build_v6(topics_v3),
            },
            "exam2-v7": {
                "label": "Exam 2 · Study this first (Lectures 11–18, rewritten in your notes style)",
                "range": "Lectures 11 to 18",
                "howToAnswer": [], "scope": SCOPE_V3, "flags": FLAGS_V2,
                "topics": build_v7(topics_v3),
            },
            "exam2-v8": {
                "label": "Exam 2 · Study this first (Lectures 11–18, standalone questions, no figures needed)",
                "range": "Lectures 11 to 18", "noTags": True,
                "howToAnswer": [], "flags": FLAGS_V2,
                "scope": {"covers": SCOPE_V3["covers"], "final": "", "evidence": "Topics marked Almost certain and Likely come first. The LLM topics are marked Possible. Every question here is written so it makes sense on its own, without a figure."},
                "topics": build_v8(build_v7(topics_v3)),
            },
            "exam2-v9": {
                "label": "Exam 2 · Study this first (Lectures 11–18, questions with figures)",
                "range": "Lectures 11 to 18",
                "howToAnswer": [], "scope": SCOPE_V3, "flags": FLAGS_V2,
                "topics": build_v9(build_v7(topics_v3)),
            },
            "exam2-v10": {
                "label": "Exam 2 · Study this first (Lectures 11–18, notes with slides and videos beside them)",
                "range": "Lectures 11 to 18", "split": True,
                "howToAnswer": [], "scope": SCOPE_V3, "flags": FLAGS_V2,
                "topics": build_v10(build_v9(build_v7(topics_v3))),
            },
            "exam2-v11": {
                "label": "Exam 2 · Study this first (Lectures 11–18, slides with the videos played on them)",
                "range": "Lectures 11 to 18", "split": True,
                "howToAnswer": [], "scope": SCOPE_V3, "flags": FLAGS_V2,
                "topics": build_v11(build_v9(build_v7(topics_v3))),
            },
            "exam2-v12": {
                "label": "Exam 2 · Study this first (Simpler v3, Lectures 11–18, slides with the videos played on them)",
                "range": "Lectures 11 to 18", "split": True,
                "howToAnswer": [], "scope": SCOPE_V3, "flags": FLAGS_V2,
                "topics": build_v12(build_v11(build_v9(build_v7(topics_v3)))),
            },
            "exam2-v3": {
                "label": "Exam 2 · Study this first (v3, Lectures 11–18, his questions first)",
                "range": "Lectures 11 to 18",
                "howToAnswer": HOW_TO_ANSWER, "scope": SCOPE_V3, "topics": topics_v3, "flags": FLAGS_V2,
            },
        },
        "labs": plain_labs(labs),
        "guidePlain": build_plain_guide(),
    }
    data["versions"] = dict(sorted(data["versions"].items(), key=lambda kv: int(kv[0].split("-v")[1])))
    n_q = sum(len(t["questions"]) for t in topics_v3)
    out_path.write_text("window.LING285_ESSENTIALS = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
    return len(topics_v3), n_q, sum(len(l["questions"]) for l in labs)


if __name__ == "__main__":
    print(build(ROOT / "modern" / "essentials.js"))
