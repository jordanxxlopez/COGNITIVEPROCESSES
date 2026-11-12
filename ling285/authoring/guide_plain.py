"""Plain-wording version of the Module II "What to know by the end" guide.

Same 19 topics and the same questions as the original guide (modern/content.js guides + qa),
rewritten the way the transcript notes are written: the answer first, then the reason, in
short cause-to-effect sentences that still use the course terms. "What to know" for each topic
is taken from the Version 10.1 notes for that topic's source pages.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PLAIN_GUIDE = [
 {
  "id": "oscillation", "title": "Why a mass on a spring keeps vibrating",
  "pages": [("lecture11", 2), ("lecture11", 3)],
  "qs": [
   ("Why does a moving mass keep going past equilibrium even though the spring pulls it back?",
    "Because a moving mass tends to keep moving, which is inertia. The spring pulls the mass back toward equilibrium, but when the mass gets there it is still moving, so it overshoots. The spring then pulls it back the other way, and the cycle repeats."),
   ("Longitudinal and transverse vibration look different. Why do they work the same way?",
    "Both have the same two ingredients: a spring that pulls the mass back toward equilibrium and a mass that keeps moving and overshoots. Longitudinal means the mass moves back and forth along the spring, and transverse means it moves up and down across it. Only the direction changes."),
   ("What changes between longitudinal and transverse vibration, and what stays the same?",
    "The direction of motion changes, along the spring versus across it. What stays the same is the pull back toward equilibrium and the overshoot, so the vibration works the same way in both."),
   ("Why does more mass lower the frequency, while more stiffness raises it?",
    "More mass is harder to get moving and harder to turn around, so each cycle takes longer and the frequency goes down. A stiffer spring pulls back harder, so the mass returns faster and the frequency goes up."),
   ("Why do you have to say what stayed the same when you predict a frequency change?",
    "Because mass and stiffness push the frequency in opposite directions. If only the mass goes up, the frequency goes down. If the mass and the stiffness both change, you have to think about both effects instead of using one rule."),
  ],
 },
 {
  "id": "modes", "title": "Modes: the different ways a whole system can vibrate",
  "pages": [("lecture11", 4), ("lecture11", 6), ("lecture11", 7)],
  "qs": [
   ("Why does adding a third mass give the system another mode?",
    "Because N masses give N modes. Each mass that can move on its own adds one more way for the whole system to vibrate, so three masses have three modes."),
   ("How are the two modes of a two-mass system different?",
    "In Mode 1 the two masses move together in the same direction. In Mode 2 they move in opposite directions. Each mode is a pattern of the whole system, not of one mass."),
   ("Why does Mode 2 of the two-mass system have a higher frequency than Mode 1?",
    "When the masses move in opposite directions, the spring between them stretches and compresses more. More stretching means more stiffness in that mode, so the frequency is higher."),
   ("What are the three modes of a three-mass system?",
    "In Mode 1 all three masses move together. In Mode 2 the outer masses move in opposite directions and the middle mass stays still. In Mode 3 each mass moves opposite to its neighbor, which stretches the springs the most, so Mode 3 has the highest frequency."),
   ("Why does adding mass to the middle mass not change Mode 2?",
    "Because the middle mass does not move in Mode 2. Extra mass only matters where a mode is moving, so Mode 2 stays the same."),
   ("Why does a system gain a mode every time you add a mass?",
    "Because each new mass can move on its own, which adds one more way for the system to vibrate. N masses always give N modes."),
   ("What do you get with an infinite number of masses and springs?",
    "You get a string. The masses and springs are spread all along it, so instead of a few modes, the string has a whole series of modes."),
  ],
 },
 {
  "id": "perturbation", "title": "What a local change in mass or stiffness does",
  "pages": [("lecture12", 9), ("lecture12", 11), ("lecture13", 13)],
  "qs": [
   ("How can adding mass and stiffness at one spot raise one mode and lower another?",
    "The same spot can be stretching in one mode and moving in another. In the mode where it stretches, the extra stiffness matters, so that mode goes up. In the mode where it moves, the extra mass matters, so that mode goes down."),
   ("Why does extra mass at one spot depend on the mode?",
    "Because extra mass only matters where the mode is moving. If the spot is moving a lot in that mode, the frequency goes down. If the spot is still in that mode, the frequency does not change."),
   ("How can the same added mass and stiffness move two modes in opposite directions?",
    "At that spot, one mode is mostly stretching and the other is mostly moving. The extra stiffness raises the mode that stretches there, and the extra mass lowers the mode that moves there."),
   ("Why does a constriction change more than one thing about the air?",
    "A constriction (narrowing) packs the air into a smaller space. That makes the air heavier, so its mass goes up, and harder to compress, so its stiffness goes up too. Which one matters depends on whether the air there is moving or compressed in that mode."),
   ("A constriction raises a formant. What does that tell you about the air there?",
    "It tells you the air there was mostly compressed, like a spring, and hardly moving in that mode. The extra stiffness won, so the formant went up."),
  ],
 },
 {
  "id": "boundaries", "title": "Fixed-fixed and fixed-free: why the modes are spaced the way they are",
  "pages": [("lecture13", 4), ("lecture13", 5), ("lecture13", 7), ("lecture13", 8), ("lecture13", 9)],
  "qs": [
   ("Why does a string fixed at both ends have all whole-number harmonics, but a fixed-free system only odd ones?",
    "A string fixed at both ends must be still at both ends, so any whole number of half-waves fits: 1, 2, 3, 4 times the first. A fixed-free system must be still at the fixed end and moving the most at the free end, so only an odd number of quarter-waves fits: 1, 3, 5, 7 times the first."),
   ("How do two fixed ends decide which modes a string can have?",
    "Both ends must stay still in every mode. Only patterns made of whole half-waves start and end still, so those are the only modes the string can have."),
   ("Why are the harmonics whole-number multiples of the first one?",
    "Mode N fits N copies of Mode 1 between the two ends. Each copy is shorter, so the frequency is N times the first, such as 100, 200, 300 Hz."),
   ("Why do only odd numbers of quarter-waves fit a fixed-free system?",
    "The fixed end must be still and the free end must be moving the most. One quarter-wave goes from still to moving the most, and to end at a moving point again you add two quarter-waves at a time, so you get 1, 3, 5 and 7. An even number would end still at the free end, which is not allowed."),
   ("What do the vocal tract and the building have in common?",
    "Both are fixed at one end and free at the other. The building is fixed to the ground and free at the top, and the air in the vocal tract is fixed at the closed vocal folds and free at the open lips. So both have modes at 1, 3, 5 times the first."),
  ],
 },
 {
  "id": "test-theory", "title": "Testing the theory that the vocal folds are a membrane",
  "pages": [("lecture11", 9), ("lecture11", 10)],
  "qs": [
   ("What can a spectrum of a vowel test about the vocal folds?",
    "It can test whether the harmonics are evenly spaced. The theory that the vocal folds are a membrane predicts equidistant harmonics, and a recording shows evenly spaced peaks, so the prediction holds."),
   ("How can a membrane vibrate in several modes at once?",
    "The modes add together. The membrane's actual motion is all of its modes happening at the same time, which makes a complex vibration."),
   ("What does a spectrum show about a membrane vibrating in many modes?",
    "It separates the complex vibration into its modes and shows each one as a peak at its frequency. A spot that does not move in a mode will not pick up that mode."),
   ("How can you test a prediction about voice harmonics with a recording?",
    "Record a vowel, look at its spectrum in Praat, and check whether the peaks are evenly spaced. Evenly spaced peaks are what the membrane theory predicts."),
   ("How do a theory, a prediction and a measurement fit together?",
    "The theory says how something works, such as the vocal folds being a membrane. The prediction says what you should see if the theory is right, such as evenly spaced harmonics. The measurement checks whether you see it."),
  ],
 },
 {
  "id": "air", "title": "Moving air versus compressed air in the vocal tract",
  "pages": [("lecture12", 15), ("lecture12", 23)],
  "qs": [
   ("Can air be strongly compressed at a spot where it hardly moves?",
    "Yes. Where the air hardly moves, the air on both sides crowds in toward it and then pulls away from it, so that spot is compressed and stretched the most. Moving the least and being compressed the most go together."),
   ("In the vocal tract diagram, the curve goes up and down. Does the air move up and down?",
    "No. The air moves back and forth along the tube, from the glottis toward the lips. The height of the curve only shows how much the air moves at each spot."),
   ("Why is the air compressed the most where it moves the least?",
    "Because compression comes from the air on either side moving toward or away from that spot. The neighbors move a lot while that spot stays put, so it gets squashed and stretched the most."),
  ],
 },
 {
  "id": "vowels", "title": "Constriction location and the vowels /i/, /a/ and /u/",
  "pages": [("lecture12", 16), ("lecture12", 19), ("lecture12", 20), ("lecture12", 21)],
  "qs": [
   ("What makes /i/ and /a/ different, without memorizing frequencies?",
    "The constriction is in a different place. For /i/ (dean) it is two-thirds of the way from the glottis, so F1 goes down and F2 goes up. For /a/ (Don) it is one-third of the way, so F1 goes up and F2 goes down."),
   ("How do the tongue and lips change which vowel you hear?",
    "They change where the constriction is and what shape the vocal tract has. That changes the formants, and the formants are what make each vowel sound different."),
   ("Why can the same voice make many different vowels?",
    "The vocal folds stay the same source, and the vocal tract acts as the filter. Changing the shape of the vocal tract changes the formants, so the same source can make different vowels."),
   ("Why does /u/ (dune) lower both F1 and F2?",
    "The constriction is at the lips, from lip rounding. The air at the lips is moving in both Mode 1 and Mode 2, so the extra mass counts in both, and both formants go down."),
   ("Why does the location of a constriction matter more than just calling it a constriction?",
    "The same constriction does different things depending on where it is. At a spot where the air moves, the formant goes down, and at a spot where the air is compressed, the formant goes up."),
   ("Why does /i/ (dean) lower F1 but raise F2?",
    "The constriction is two-thirds of the way from the glottis. There, the air moves in Mode 1, so the extra mass lowers F1, and it is compressed in Mode 2, so the extra stiffness raises F2. The formants move apart."),
   ("For /i/, what is the air at the constriction doing in Mode 1 and Mode 2?",
    "In Mode 1 it is moving, so mass matters and F1 goes down. In Mode 2 it is compressed, so stiffness matters and F2 goes up."),
   ("Why does /a/ (Don) raise F1 and lower F2?",
    "The constriction is one-third of the way from the glottis, toward the back of the throat. There, the air is compressed in Mode 1, so the extra stiffness raises F1, and it moves in Mode 2, so the extra mass lowers F2. The formants move together."),
   ("Why do /i/ and /a/ have opposite patterns?",
    "Their constrictions are at opposite spots. At one-third, the air is compressed in Mode 1 and moving in Mode 2, and at two-thirds it is the other way around, so the effects on F1 and F2 flip."),
  ],
 },
 {
  "id": "source-filter", "title": "Source and filter: harmonics from the folds, formants from the tract",
  "pages": [("lecture14", 15), ("lecture14", 16), ("lecture14", 17)],
  "qs": [
   ("Does raising your pitch turn /i/ into /a/?",
    "No. Raising pitch raises F0, which spreads the harmonics farther apart. The vowel depends on the formants, which come from the shape of the vocal tract, so the vowel stays the same. A very high F0 can only make the formants harder to see."),
   ("What decides how far apart the harmonics are?",
    "F0 does. The harmonics are at whole-number multiples of F0, so with an F0 of 150 Hz they are at 150, 300, 450 Hz, 150 Hz apart."),
   ("Why do the mass and stiffness of the vocal folds change F0?",
    "Heavy, loose vocal folds vibrate slowly, so F0 is low. Tight, light vocal folds vibrate quickly, so F0 is high."),
   ("How do formants decide which harmonics are loud?",
    "A formant makes the harmonics closest to it louder, and the harmonics far from any formant come out weaker. The outline of the harmonic heights, the envelope, shows the formants."),
   ("Why are pitch and vowel two different things?",
    "Pitch comes from the source, how fast the vocal folds vibrate, which is F0. The vowel comes from the filter, the formants of the vocal tract. You can change one without changing the other."),
   ("Why are vowels hard to identify when F0 is very high?",
    "With a high F0 the harmonics are far apart, so few of them fall near each formant. With so few harmonics, the envelope is hard to see, which is why a soprano's or a toddler's vowels are hard to identify."),
   ("If a formant is hard to see, does that mean it is gone?",
    "No. The vocal tract still has the formant. There just are not enough harmonics close to it to show it clearly."),
  ],
 },
 {
  "id": "acoustic-displays", "title": "Spectrum and spectrogram",
  "pages": [("lecture13", 23), ("lecture14", 19)],
  "qs": [
   ("How does a spectrogram show a vowel changing?",
    "Time is on the horizontal axis, frequency is on the vertical axis, and darkness shows amplitude. The dark bands are the formants, so following them over time shows how the vocal tract is moving."),
   ("What can a spectrogram show that one spectrum cannot?",
    "A spectrum shows only one instant. A spectrogram lines up many spectra over time, so it shows how the formants change."),
   ("What do the horizontal axis, the vertical axis and the darkness show in a spectrogram?",
    "The horizontal axis is time, the vertical axis is frequency, and the darkness is amplitude. The darkest bands are the formants, with F1 the lowest band and F2 the next one up."),
   ("Why do the formant bands keep moving in connected speech?",
    "Because the vocal tract keeps changing shape. Every sound moves the constriction, so the formants never stay still, as in \"Where were you a year ago?\""),
   ("What do the formant transitions add beyond the middle of a vowel?",
    "They show how the vocal tract is moving into and out of the vowel, which carries information about the sounds next to it. A slice from the middle of the vowel leaves that out."),
  ],
 },
 {
  "id": "context", "title": "The ma and na splicing experiment",
  "pages": [("lecture14", 20)],
  "qs": [
   ("Why can the vowel from na change what you hear for the m of ma?",
    "The vowel from na still has the formant transition that comes from the n. When the m of ma is joined to the a of na, listeners hear na, because they decide on the consonant during the vowel, after the consonant is over."),
   ("What does the splicing result mean for recognizing speech one small slice at a time?",
    "It shows that you cannot decide what a sound is from its own slice alone. Listeners use information from the sounds around it, so speech has to be heard as a sequence."),
  ],
 },
 {
  "id": "classifier", "title": "The vowel network: from F1 and F2 to a decision",
  "pages": [("lecture14", 21), ("lecture14", 22), ("lecture14", 23), ("lecture15", 3)],
  "qs": [
   ("What does the vowel network learn?",
    "It learns its weights. The weights decide how F1 and F2 affect each hidden layer and, in the end, the probabilities for the five vowels."),
   ("How do F1 and F2 work as inputs to the vowel network?",
    "They are the two numbers fed into the two input neurons. The weights turn them into scores for the five output neurons, one for each of done, dune, dean, Don and Dan."),
   ("Why does a low F1 and a high F2 go with dean?",
    "Dean is /i/, and /i/ has a low F1 and a high F2. So the right answer for that input is dean, even if an untrained network guesses something else."),
   ("How does a neuron combine its inputs?",
    "It multiplies each incoming activation by its weight and adds the results. This is the inner product."),
   ("Why does the sign of a contribution depend on both the input and the weight?",
    "A positive weight keeps the input's sign and a negative weight flips it. So a positive input times a negative weight pushes the neuron down, and a positive input times a positive weight pushes it up."),
   ("What happens during forward propagation?",
    "The input is carried layer by layer from the input to the output, with inner products at each layer. The result at the end is the network's guess."),
   ("Why can a forward pass give the wrong answer?",
    "Because the weights may not be learned yet. At the start the weights are random, so the calculation runs correctly but the guess can still be wrong."),
  ],
 },
 {
  "id": "target", "title": "A valid prediction versus the right answer",
  "pages": [("lecture15", 6), ("lecture15", 9)],
  "qs": [
   ("Can a prediction add up to 1 and still be wrong?",
    "Yes. Adding up to 1 only makes it a valid probability distribution. It can still put the highest probability on the wrong vowel, and the desired output, such as 0, 0, 1, 0, 0 for dean, shows what it should have been."),
   ("What makes a list of numbers a valid probability distribution?",
    "Every number is between 0 and 1, and all of them add up to 1. If they do not add up to 1, it is not a probability distribution."),
   ("How is the desired output different from a prediction that is valid but wrong?",
    "The desired output puts 1 on the correct vowel and 0 on the rest. A valid prediction adds up to 1 too, but it can favor the wrong vowel. Being valid and being correct are different."),
   ("Why must each row of formants stay paired with its vowel?",
    "Each row is one recording, its F1 and F2 and the vowel that was said. The network learns by comparing its guess with that vowel, so the pairs have to match."),
   ("What happens if the formants and the vowels get mixed up?",
    "The network learns the wrong pairing. It would be told that one recording's formants belong to a different vowel, so it would learn the wrong thing."),
  ],
 },
 {
  "id": "backward", "title": "Why backpropagation starts at the end",
  "pages": [("lecture15", 7), ("lecture15", 8)],
  "qs": [
   ("Why does backpropagation start at the output instead of the first layer?",
    "The last weights affect the output directly, so it is easy to tell whether each one should go up or down. A first-layer weight affects the output only through every later layer, so its effect depends on all the later weights. Solving the last layer first and reusing that answer is dynamic programming."),
   ("How do you tell whether raising an output weight helps?",
    "Look at the sign of the activation coming in and at whether that output's probability should go up or down. If the activation is positive and the probability should go up, raising the weight helps."),
   ("Why is an early weight's effect harder to figure out?",
    "Its effect passes through every later layer before it reaches the output. So whether it helps depends on all the weights after it, not just on its own sign."),
   ("Why does backpropagation work out the later layers before the earlier ones?",
    "The earlier weights' effects depend on the later layers. Once the later layers are worked out, that answer can be reused for the earlier ones, which is dynamic programming."),
   ("What do dynamic programming and SGD each do in backpropagation?",
    "Dynamic programming sets the order, solving the last layer first and reusing the answer. Stochastic gradient descent changes each weight a little in the direction that lowers the error. Backpropagation is SGD plus dynamic programming."),
  ],
 },
 {
  "id": "program", "title": "Reading the PyTorch code",
  "pages": [("lecture14", 25), ("lecture15", 10)],
  "qs": [
   ("What changes if you add a 3-neuron hidden layer right before the 5 outputs?",
    "The line before it must now end in 3, and you add a line that takes 3 and gives 5, such as nn.Linear(3, 5). The input stays 2, because there are two formants, and each line's first number must equal the second number on the line before it."),
   ("What does nn.Sequential mean?",
    "The network is a sequence of layers, one after another. Each layer passes its output to the next one, so the sizes of neighboring layers must match."),
   ("Why must the layer sizes match when you add a layer?",
    "Each layer has to take in exactly as many numbers as the layer before it gives out. If the sizes do not match, the numbers cannot pass from one layer to the next."),
   ("What do loss, backward and step each do?",
    "The loss measures the mistake. Backward runs backpropagation to work out how each weight should change. Step changes the weights."),
   ("Why are the old gradients cleared before the next step?",
    "Otherwise the changes from the last step would pile up on top of the new ones. Clearing them starts each step fresh, and the learned weights stay as they are."),
  ],
 },
 {
  "id": "nonlinearity", "title": "The sigmoid between layers",
  "pages": [("lecture15", 11), ("lecture15", 12), ("lecture15", 13)],
  "qs": [
   ("Why do the later layers have to be recalculated after the sigmoid changes a hidden value?",
    "The later layers take that hidden value as their input. If it changes, their inner products change too, so the final probabilities must be recalculated."),
   ("What does the sigmoid do to a negative, zero or positive input?",
    "A large negative input gives about 0, which is off. An input of exactly 0 gives 0.5. A large positive input gives about 1, which is on."),
   ("Is a hidden neuron's sigmoid value a probability for a vowel?",
    "No. Each sigmoid value is between 0 and 1, but the values do not have to add up to 1. A probability distribution over the vowels has to add up to 1."),
   ("Why do the later values change when the sigmoid is applied to a hidden neuron?",
    "The next layer uses the sigmoid's output as its input. A different input gives different inner products, so everything after it changes."),
   ("What does putting a sigmoid between layers do to the network?",
    "It turns each inner product into a number between 0 and 1, like a neuron that is mostly off or mostly on. That changes what the network computes, even before any weight is changed."),
  ],
 },
 {
  "id": "training-result", "title": "Reading the training results",
  "pages": [("lecture16", 5), ("lecture16", 15), ("lecture16", 16)],
  "qs": [
   ("Several runs start with different random weights and end at the same accuracy. What does that show?",
    "It shows that learning ends in the same place even though the runs take different paths. That accuracy is on the training data, so it does not show by itself how well the network does on new speakers."),
   ("What does the overlap between vowels in the F1 and F2 plot mean for the network?",
    "Many recordings with nearly the same F1 and F2 belong to different vowels. For a point in the overlap, even a person would have to guess, so the network cannot reach 100 percent."),
   ("Why does the accuracy only tell you about the data it was trained on?",
    "It counts how many of those recordings the network got right. To know how it does on new speakers, you have to test it on recordings it never trained on."),
   ("Why does accuracy start at 20 percent?",
    "There are five vowels, and with random weights the network knows nothing, so it is guessing. A random guess among five is right one time in five, which is 20 percent."),
   ("What does it mean when the accuracy levels off?",
    "The network has stopped improving. Leveling off near 45 percent means it still gets many recordings wrong, because the vowel data overlap."),
   ("Why do different starting weights give different learning paths?",
    "Each run starts with different random weights, so it makes different early guesses and corrections. The path changes, but the end point is about the same."),
   ("What does it mean that the runs end at the same accuracy?",
    "The end point is the same even though the paths are different. Agreeing at the end does not mean the runs learned in the same way."),
  ],
 },
 {
  "id": "sequence", "title": "From one vector to a sequence",
  "pages": [("lecture17", 3), ("lecture17", 5)],
  "qs": [
   ("How is predicting the next item different from classifying one vector?",
    "Classifying uses one static vector from one moment, as the vowel network does. Predicting the next item uses the whole sequence so far, so the items before it change what comes next."),
   ("How does a recurrent network let earlier items matter?",
    "It sends its own output back into part of its input. What it produced at one moment helps it predict the next moment, as in Jordan's network."),
   ("Why does a sequence need more than one static vector?",
    "In speech and language, what comes next depends on what came before. A network that sees one vector at a time loses that information."),
   ("What stays the same when an LLM predicts words, sounds or images?",
    "The task stays the same: given 15 vectors, predict the sixteenth. The vectors can stand for words, spectrogram frames, image patches or amino acids, because the LLM only sees lists of numbers."),
   ("How do the items so far change the prediction for the next one?",
    "They limit what can come next. When many things can follow, the probability distribution is spread out, and when few things can follow, it is piled onto a few choices."),
  ],
 },
 {
  "id": "phonotactics", "title": "Phonotactics and guessing the next letter",
  "pages": [("lecture18", 6), ("lecture18", 7), ("lecture17", 6), ("lecture17", 7)],
  "qs": [
   ("Why does a good next-letter guesser know English word patterns?",
    "To guess well, it has to follow the rules for which sounds can come next, which is phonotactics. Its guesses can only get better by matching English syllables, so it ends up learning them."),
   ("How do the onset and the coda limit which sounds can go together?",
    "A cluster before the vowel is an onset, as in split, and a cluster after the vowel is a coda, as in lamp. Only some clusters are allowed in each place, and the order is a mirror image around the vowel, so flat is a word but lfat is impossible."),
   ("Why is Atlantic a word but tlantic impossible?",
    "In Atlantic, the t ends one syllable and the l starts the next, so tl never has to start a syllable. In tlantic, tl would start a syllable, and English does not allow tl at the start of a syllable."),
   ("What can a guess about the next letter show about word beginnings?",
    "At the start of a word the choices narrow to what an English onset allows. After sp only l, r or a vowel can come, never n, and after skr only a vowel can come."),
   ("Why is the next-letter distribution spread out after some starts and peaked after others?",
    "After a vowel, as in ra, almost any letter can come next, so the distribution is flat. After skr only a vowel can come, so the probability piles onto a few vowels and the distribution is sharply peaked."),
  ],
 },
 {
  "id": "architecture", "title": "Heads, layers and agents",
  "pages": [("lecture18", 3), ("lecture18", 4), ("lecture18", 2)],
  "qs": [
   ("How is a critic agent different from a head?",
    "A head is one expert inside a layer of one LLM, a set of weights. A critic agent is a whole LLM in an agentic system whose job is to check the draft and send it back for revision."),
   ("How are heads different from layers?",
    "Heads sit side by side inside a layer, and the layer combines their opinions into improved vectors. Layers go one after another from the input to the output, so each layer improves the vectors again."),
   ("Why is a head not the same as an agent?",
    "A head is a part inside one LLM. An agent is a whole LLM with its own job in a larger system, such as the critic."),
   ("How is an LLM like a dynamical system?",
    "In both, the output of one step becomes the input to the next. In an LLM, each layer takes the vectors from the layer before and makes them better, the way the oscillator updates its position and velocity step by step."),
   ("Does the dynamical-system comparison mean every layer has the same weights?",
    "No. Each layer has its own learned weights. The comparison is about one step feeding the next, not about using the same numbers at every step."),
  ],
 },
]


def parse_notes(path):
    pages, cur = {}, None
    for line in path.read_text().splitlines():
        m = re.match(r"^## p(\d+)", line)
        if m:
            cur = int(m.group(1)); pages[cur] = []
        elif cur is not None and line.strip():
            pages[cur].append(line.rstrip())
    return pages


def notes_v10_1():
    out = {}
    for f in sorted((ROOT / "authoring" / "notes-v10.1").glob("*.md")):
        out["lecture" + f.stem] = parse_notes(f)
    return out


def build_plain_guide():
    notes = notes_v10_1()
    topics = []
    for t in PLAIN_GUIDE:
        know = []
        for lec, page in t["pages"]:
            lines = notes.get(lec, {}).get(page)
            if lines:
                know.append({"ref": f"Lecture {lec[7:]} · p{page}", "lines": lines})
        topics.append({"id": t["id"], "title": t["title"], "know": know,
                       "questions": [{"q": q, "a": a} for q, a in t["qs"]]})
    return topics
