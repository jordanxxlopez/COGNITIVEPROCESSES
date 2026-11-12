"""Turn "Label: sentence" lines into plain full sentences (no labels).

Most lines read correctly once the label is dropped. Where the label carries meaning
(a vowel name, a letter start, a lab part), the line is rewritten as one plain sentence.
"""
import re

OVERRIDES = {
 "Perturbation theory": "**Perturbation theory** predicts how a small change in one location affects vibration. In the late nineteenth century, wax placed where a drum vibrated a lot lowered its pitch, and wax placed where it did not vibrate had no effect.",
 "Schwa": "With no constriction, as in **done**, the formants are about **500, 1500 and 2500 Hz**. This neutral vowel is schwa.",
 "Four steps": "To work out what a constriction does, find its location, decide whether the air there is mostly **moving** or mostly **compressed** in that mode, pick the extra that counts (mass if moving, stiffness if compressed), and then say whether the formant goes **down** or **up**.",
 "/u/ (dune)": "In **dune** (/u/), the constriction is at the lips, where the air is moving in both modes, so **F1 and F2 both go down**.",
 "/i/ (dean)": "In **dean** (/i/), the constriction is two-thirds of the way from the glottis. The air there moves in Mode 1 and is compressed in Mode 2, so **F1 goes down and F2 goes up**, and the formants move apart.",
 "/a/ (Don)": "In **Don** (/a/), the constriction is one-third of the way from the glottis. The air there is compressed in Mode 1 and moves in Mode 2, so **F1 goes up and F2 goes down**, and the formants move together.",
 "Reasoning backward": "You can also work backward. A large rise in a formant means the air at the constriction was springy and hardly moving, and a large fall means the air there was moving a lot.",
 "Where were you a year ago?": "In \"Where were you a year ago?\" the formants never stay still, because every sound moves the constriction. Speech is a continuous series of constrictions, not a list of separate vowels.",
 "Why the end is easy": "The end is easy because the last weights affect the output probabilities **directly**, so one inner product shows whether each should go up or down.",
 "Why the start is hard": "The start is hard because a first-layer weight affects the first hidden layer, which affects the next layer and the next, so its effect on the decision passes through every layer and depends on all the later weights.",
 "Dynamic programming": "**Dynamic programming** means solving the easy problem first and reusing its answer for the bigger problem that contains it (Bellman and Viterbi).",
 "Import lines": "The **import lines** bring in the torch library, which already contains the programs for inner products and backpropagation, so none of it has to be written by hand.",
 "Sequential": "**Sequential** means the network is a sequence of layers, one after another.",
 "nn.Linear(2, 3)": "**nn.Linear(2, 3)** is a processing layer that takes input from 2 neurons and has 3 neurons. It computes inner products.",
 "Matching": "In the code, the first number on each line must equal the second number on the line before it.",
 "In code": "In the code, nn.Sigmoid goes after each hidden layer. The last layer has no sigmoid, because its outputs go to the loss, which turns them into probabilities.",
 "Classroom comparison": "In the classroom comparison, the classes you visit one after another are the layers, and the students in each class who each give you an opinion are the heads.",
 "How an LLM learns": "An LLM learns by predicting the next word, such as mat after \"the cat sat on the\". When the prediction is wrong, backpropagation adjusts the weights, and this is repeated with a huge number of sentences.",
 "Underneath everything": "Underneath everything, inference is inner products, and learning is stochastic gradient descent plus dynamic programming.",
 "Cloze test": "In a **cloze test**, words are removed from a text and people fill them in. The name comes from closure, and it tests knowledge by asking someone to complete a sequence.",
 "The lecture example": "In the example agentic system, an outline LLM plans the answer, a writing LLM writes it, a critic LLM checks it, a revision LLM works back and forth with the critic, and a final LLM produces the answer the user sees.",
 "Parallel Distributed Processing": "The 1986 **Parallel Distributed Processing** books gave the field its name. **Parallel** means many neurons calculate their activations at the same time, and **distributed** means the information from the inputs is spread across all the neurons. By then, forward propagation and backpropagation were well worked out.",
 "Allowed onsets (before the vowel)": "Allowed onsets, the clusters before the vowel, include split, flat, black and glad.",
 "Allowed codas (after the vowel)": "Allowed codas, the clusters after the vowel, include desk, help, milk and lamp.",
 "Impossible twins": "Real words have impossible twins, such as flat and *lfat, help and *hepl, and lamp and *lapm. Each impossible twin puts the wrong consonant next to the vowel. *Sblit and *desb are impossible too, which is why a product called desb would sound un-English.",
 "After ra_": "After ra, almost any letter can come next, such as t, n, r or l, so the distribution is flat.",
 "After sp_": "After sp at the start of a word, only l, r or a vowel can come next, never n.",
 "After k_": "After k at the start of a word, only a vowel or n can come next, as in knee, never t.",
 "After b_ and f_": "After b or f at the start of a word, only r, l or a vowel can come next, never n.",
 "After sh_": "After sh at the start of a word, only a vowel or r can come next, as in shrimp.",
 "After skr_, or m_ at the start of a word": "After skr, or after m at the start of a word, only a vowel can come next.",
 "After bram_": "After bram, the letter b is almost certain, as in bramble, though a new syllable could also start there.",
 "Lab 9 starts": "In Lab 9, after pl only a vowel can come, as in play. After st a vowel or r can come, as in star and street, but not l or k. After th, r, w or a vowel can come, as in three, thwart and thin, but not l or n.",
 "Mode 1 in every chain": "In Mode 1 of every chain, all the masses move up and down together as if they were one mass, and no spring stretches. It is always the lowest-frequency mode.",
 "Mode 2": "In Mode 2, the masses split into two groups moving in opposite directions. A mass sitting at the boundary between the two halves, such as the middle mass when there is an odd number, does not move.",
 "Membrane": "A **membrane** works the same way on a surface. A mode labeled (2, 1) has two bumps along the length and one across the width.",
 "Praat test of the theory": "Praat was used to test the theory that the vocal folds are a membrane. The theory predicts that a vowel is a complex vibration whose spectrum has **equidistant** peaks, and the peaks in a recorded vowel's spectral slice are evenly spaced, so the prediction held.",
 "Spectral slice axes": "A spectral slice has frequency in hertz on the horizontal axis and amplitude in decibels on the vertical axis.",
 "Typical results": "In recordings of these words, dean or dune has the lowest F1, Don or Dan the highest F1, and dean the highest F2. Many Californians front their oo, so dune can have a high F2.",
 "Three masses, Mode 2": "In Mode 2 of three masses, the middle mass does not move, but the springs on both sides of it are stretched and compressed, because its neighbors move.",
 "Three masses, Mode 1": "In Mode 1 of three masses, the middle mass moves the most, and the two springs next to the walls stretch the most.",
 "String points": "On a string, the top of a hump moves the most and does not stretch. Where the string crosses the resting line, it does not move and stretches the most.",
 "Extra mass in the middle of a string": "Extra mass in the middle of a string leaves Mode 2 the same, because the middle is still, and lowers Mode 3, because the middle swings.",
 "Extra stiffness in the middle": "Extra stiffness in the middle of a string raises Mode 2, because the middle stretches the most there, and leaves Mode 3 the same, because there is no stretching at the bottom of a hump.",
 "Fixed-free string": "A fixed-free string has modes at 100, 300 and 500 Hz, which are one, three and five quarter-waves, 200 Hz apart. Its free top always moves the most, and its fixed bottom always stretches the most.",
 "Vocal tract table": "For Don, the constriction is one-third of the way from the glottis, where the air is compressed in Mode 1 and moving in Mode 2, so F1 goes up and F2 goes down. For dean, it is two-thirds of the way, where the air is moving in Mode 1 and compressed in Mode 2, so F1 goes down and F2 goes up. For dune, it is at the lips, where the air is moving in both modes, so both go down.",
 "Example with a first mode of 100 Hz": "With a first mode of 100 Hz, the 1st, 2nd and 3rd harmonics are 100, 200 and 300 Hz, and the 1st, 2nd and 3rd formants are 100, 300 and 500 Hz.",
 "Summary table": "For dune, the constriction at the lips lowers both F1 and F2. For dean, at two-thirds, F1 goes down and F2 goes up, so the formants move **away** from each other. For Don, at one-third, F1 goes up and F2 goes down, so the formants move **together**.",
 "Formant transitions in Praat": "In Praat, going from schwa to each vowel without stopping shows the bands moving in exactly the directions of the table, which is how a spectrogram can be read without hearing the sound.",
 "Network anatomy": "A network has three kinds of neurons, input, hidden and output. A **weight** is the strength of a connection, and a neuron's activation is the **inner product** of the previous activations and their weights.",
 "Training cycle": "Training starts with random weights once. Then the network makes a guess (forward pass), measures the error (the loss), assigns blame backward to each weight, adjusts each weight a little, and repeats this many times.",
 "When to stop": "To know when to stop, keep some data the network never trains on, called validation data. When accuracy on it stops improving, stop training.",
 "Data": "The data are 525 recordings, each with F1, F2 and the vowel. Each vowel name becomes a number from 0 to 4, because the network works with numbers.",
 "Architecture": "The network has 2 input neurons (F1 and F2), hidden layers of 3, 2 and 4, and 5 outputs. The two ends are set by the data, and the hidden layers are a design choice.",
 "Part 1, vibration": "In the vibration part, N masses have N modes, and a mass on the boundary between two peaks does not move. Fixed-fixed modes are harmonics at 1, 2, 3 times the first, and fixed-free modes are formants at 1, 3, 5 times the first.",
 "Part 2, vocal tract": "In the vocal tract part, a plain tube gives about 500, 1500 and 2500 Hz. The four steps are location, moving or compressed, which extra counts, and up or down.",
 "Part 3, networks": "In the network part, a neuron's linear activation is an inner product, and the sigmoid turns it into a number between 0 and 1. The loss measures how far the computed output is from the desired output, and backpropagation is SGD plus dynamic programming.",
 "Part 4, from the vowel network to LLMs": "In the LLM part, the vowel network takes one vector, F1 and F2, and decides among a few categories. An LLM takes a sequence of many vectors and gives a probability distribution over what the next item could be.",
}

LABEL = re.compile(r"^([^:]{1,60}): (.+)$", re.S)


def unlabel(line):
    m = LABEL.match(line)
    if not m:
        return line
    label, rest = m.group(1), m.group(2)
    if label in OVERRIDES:
        return OVERRIDES[label]
    return rest[0].upper() + rest[1:] if rest[:1].islower() and not rest.startswith("nn.") else rest


SENT = re.compile(r"(?<=[.!?])\s+(?=[A-Z*\"])")


def bullet(line):
    """One plain bullet: the first sentence, then the rest as a sub-point (Module I layout)."""
    text = unlabel(line)
    parts = SENT.split(text, maxsplit=1)
    return {"main": parts[0], "sub": parts[1] if len(parts) > 1 else ""}
