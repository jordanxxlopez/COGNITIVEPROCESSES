"""Original conceptual practice grounded in the Lecture 17 upload."""
from weekly_practice import build
M=[
(2,'Static vectors','interpretation','The vowel network decides from a “static vector” of formants. What is a static vector here?','What does “static vector” mean for the 1943–1986 networks?','One fixed list of numbers measured at a single moment, such as F1 and F2.',[
('A sequence of formants recorded over a whole sentence.','A sequence unfolds over time. A static vector is one snapshot.'),
('The set of weights that never changes during training.','Weights change when the network learns. The static vector is the input.'),
('The five word categories the network chooses among.','The categories are the outputs. The vector is what comes in.')]),
(2,'The stated problem','cause-effect','What problem with these networks is named under the vowel network?','Why are static-vector classifiers called too limited?','Human cognition is far more complex than deciding among a few categories from one fixed vector.',[
('The networks had too few output categories to name five vowels.','The network does name five vowels. The limit is the kind of task, not the count.'),
('The networks could not compute inner products.','Inner products are exactly what these networks compute.'),
('The networks could only be trained without backpropagation.','The issue named is the complexity of cognition, not the training method.')]),
(2,'McCulloch and Pitts','interpretation','What feature of nervous activity does the 1943 McCulloch and Pitts paper start from?','Which assumption lets McCulloch and Pitts treat neural events with logic?','The “all-or-none” character of nervous activity, where a neuron either fires or does not.',[
('Neurons fire at a smoothly varying rate with no threshold.','The paper starts from all-or-none behavior, which is what makes logic apply.'),
('Neurons store words as sound patterns.','The paper concerns neural events and logic, not stored words.'),
('Neurons learn by backpropagation.','Backpropagation came much later. The paper is about the logic of firing.')]),
(2,'Endpoints of the period','interpretation','Which two sources mark the 1943 and 1986 ends of the early neural-network period?','What bookends the 1943–1986 span on the page?','The McCulloch and Pitts logical calculus paper and the two Parallel Distributed Processing volumes.',[
('Jordan’s recurrent network and the first LLM.','Jordan’s 1985 recurrent networks come at the end of this period and lead beyond it.'),
('The vowel scatterplot and the training curves.','Those are data and results, not historical sources.'),
('Two textbooks on English phonotactics.','The books shown are the Parallel Distributed Processing volumes.')]),
(3,'Recurrence','distinction','What makes Jordan’s 1985 network recurrent?','Which connections turn the network into a recurrent one?','The outputs feed back into state units, and each state unit also feeds back into itself.',[
('Every layer is fully connected to the next.','Full connectivity alone is feedforward. Recurrence needs connections that loop back.'),
('It has three hidden layers instead of one.','The number of layers does not make a network recurrent.'),
('Its weights are fixed and never trained.','Recurrence describes the loops, not whether weights change.')]),
(3,'Plan units','interpretation','In Jordan’s network, what do the plan units supply?','What is the job of the plan units?','Outside input that says which sequence the network should produce.',[
('A copy of the network’s previous outputs.','Copies of past outputs go to the state units.'),
('The final articulatory features over time.','Those are the output units’ responses.'),
('The error signal for backpropagation.','Plan units are inputs to the network during production.')]),
(3,'Memory through feedback','cause-effect','Why can a recurrent network’s next output depend on what it just produced?','How do state units give the network a memory?','State units hold a trace of recent outputs and feed it back with the plan, so each output reflects the ones before it.',[
('The plan units change after every time step.','The plan specifies the sequence. The trace of past outputs comes through the state units.'),
('Each input passes through once and is then discarded.','That describes a feedforward network, which has no such memory.'),
('The output units are connected only to the inputs.','The loops back into the state units are what carry past outputs forward.')]),
(3,'Reading the feature plot','interpretation','In the plot Performance on /istrstry/, what does each row show?','What is plotted in each row against time?','How strongly one articulatory feature, such as Voice or Round, is present in the output at each time step.',[
('The probability of one word at each step.','The rows are articulatory features, not words.'),
('The weight on one connection during training.','The plot shows the network’s output features over time.'),
('A separate recording of a different speaker.','All rows describe one produced sequence.')]),
(3,'Feature spreading','prediction','The Round line rises early and stays high across most of the sequence. What does that show about the network’s output?','What does the shape of the Round line reveal?','Rounding spreads across neighboring sounds instead of switching on and off for each one.',[
('Rounding is absent throughout the sequence.','The line rises and stays high, so rounding is present.'),
('Every feature changes at exactly the same moment.','Sibilant has separate bumps while Round stays high, so features change at different times.'),
('The network failed and produced only one sound.','The features vary over 32 steps, so a sequence is produced.')]),
(4,'One neuron','interpretation','What does a single neuron do, according to the first column?','“Vector in, 1 number out” describes which computation?','It multiplies each input by its weight and sums the products, an inner product.',[
('It chooses the largest input and passes it on.','The neuron combines all inputs through weights.'),
('It outputs a probability distribution over tokens.','That is the LLM’s output, vector 16.'),
('It stores a sequence of past outputs.','Storing past outputs is the role of recurrent state, not a single neuron.')]),
(4,'Decision vector','interpretation','What does the network in the second column output?','“Vector in, decision vector out” means what?','One value for each possible answer, produced after layers W₁, W₂ and W₃ transform the input.',[
('A single number, the inner product.','That is the single neuron in the first column.'),
('The next token in a sequence of 15.','That is the LLM column.'),
('A critique of a written draft.','That is the agentic system’s Critic LLM.')]),
(4,'LLM output','interpretation','In the LLM column, what is vector 16, drawn as a bar chart labeled PDF?','What does the top of the LLM produce?','A probability distribution over the next token.',[
('A copy of the first input vector.','Vector 16 is the prediction of what comes next, not a copy.'),
('The weights of the fifth layer.','Weights are drawn as W blocks inside the model.'),
('The final edited text from the agentic loop.','The agentic system is a separate column built from several LLMs.')]),
(4,'Agentic systems','interpretation','How is an agentic system described in the fourth column?','What makes the fourth column an agentic system?','A graph of LLMs, Outline, Write, Critic, Revise and Final, with a loop between Critic and Revise.',[
('One LLM with more layers.','The column shows several separate LLMs connected together.'),
('A single neuron with feedback.','The parts are full LLMs, not neurons.'),
('A list of training seeds.','The boxes are models with roles, not seeds.')]),
(4,'Inference and learning','distinction','Which pairing matches the bottom line of the page?','What are the two operations named under all four columns?','Inference is inner products, and learning is SGD plus dynamic programming.',[
('Inference is backpropagation, and learning is softmax.','Inference runs forward through weighted sums, and learning uses SGD with backpropagation.'),
('Inference is SGD, and learning is inner products.','The roles are reversed.'),
('Inference is sigmoid, and learning is sampling seeds.','Neither matches the stated operations.')]),
(4,'Kinds of weights','interpretation','In the LLM column, what do the six colors of W stand for?','Why are the W blocks drawn in six colors?','Six different kinds of weight sets.',[
('Six different input tokens.','The tokens are vectors 1 through 15 at the bottom.'),
('Six separate LLMs in an agentic graph.','The agentic graph is the fourth column.'),
('Six training seeds.','Color marks the kind of weight set, not a seed.')]),
(5,'Sentence example','interpretation','For “The cat that the dog chased ran up the old tree and sat on the ___,” what is x₁₆?','What does the sixteenth vector stand for in the sentence example?','The missing next word.',[
('The first word of the sentence.','x₁ is the first word. x₁₆ is the slot after the fifteenth.'),
('A summary of the whole sentence.','x₁₆ is the next item in the sequence.'),
('The word “cat.”','“cat” is already among the fifteen given words.')]),
(5,'Image example','interpretation','When an image is cut into 16 patches and read row by row, what is x₁₆?','In the image version, which patch is missing?','The missing bottom-right patch.',[
('The top-left patch.','Read row by row, the top-left patch comes first.'),
('The whole image at lower resolution.','Each vector is one patch, not the whole image.'),
('The sun in the top-right corner.','The sun is visible among the given patches.')]),
(5,'Protein example','interpretation','For the insulin B chain read as 15 amino acids, what is x₁₆?','What fills the sixteenth slot in the protein example?','The next amino acid in the chain, Y.',[
('The first amino acid, F.','F is x₁, the start of the sequence.'),
('The shape of the helix.','The helix is drawn, but x₁₆ is the next residue.'),
('A word describing the protein.','The vectors stand for amino acids, not words.')]),
(5,'Only vectors','cause-effect','Why can one LLM-style machine handle words, sounds, pixels and molecules?','What does “The LLM only ever sees vectors” imply?','Every kind of sequence is turned into vectors, so the same machine predicts the next vector for any of them.',[
('Each kind of data needs a completely different machine.','The point is that one machine handles all of them as vectors.'),
('The machine understands what a cat or a protein is.','The page stresses that it only sees vectors, not the things they stand for.'),
('Only text can be turned into vectors.','Sound frames, image patches and amino acids are also vectors.')]),
(6,'Impossible English words','interpretation','Which of these is starred as impossible in English?','Which string cannot be an English word?','*lfat.',[
('flat.','flat is a real English word with an allowed onset.'),
('help.','help is a real word with an allowed coda.'),
('At·lan·tic.','Atlantic is fine because t and l are split by a syllable break.')]),
(6,'Syllable breaks','cause-effect','Why is At·lan·tic a word while *tlantic is impossible?','What lets t and l appear together in Atlantic?','In Atlantic a syllable break falls between t and l, but tl cannot start a syllable.',[
('English never allows t and l anywhere in the same word.','Atlantic has both, separated by a syllable break.'),
('*tlantic has too many letters to be a word.','The problem is the onset tl, not the length.'),
('Atlantic is a borrowed name, so the rules do not apply.','The page explains it by syllable structure, which applies to all words.')]),
(6,'ng position','prediction','Based on ring and *ngapkin, where can ng appear in an English syllable?','What do ring and *ngapkin show about ng?','At the end of a syllable but never at the start.',[
('Only at the start of a word.','*ngapkin is starred precisely because ng cannot start a syllable.'),
('Anywhere, since it is a single sound.','It is allowed at the end, as in ring, but not at the start.'),
('Only between two vowels inside a syllable.','The examples contrast syllable-final with syllable-initial position.')]),
(6,'Mirrored order','distinction','flat is a word and *lfat is not. What does the pair show about clusters?','What does reversing a cluster reveal about English syllables?','Order matters, and allowed orders mirror around the vowel.',[
('Any two consonants can begin a word in either order.','*lfat shows the reversed order is not allowed at the start.'),
('Clusters are never allowed in English.','flat, split and desk all contain clusters.'),
('Only vowels decide whether a string is a word.','Both strings share the vowel. The consonant order makes the difference.')]),
(7,'Constrained continuations','prediction','Each item starts an English word. After skr_, what can the next letter be?','What is the only kind of letter that can follow skr_?','Only a vowel.',[
('Any consonant, as after a vowel.','After skr_ the choices are restricted. Open choices come after a vowel, as in ra_.'),
('l, as in *skrl.','*skrl is marked as never possible.'),
('Nothing, because skr cannot start a word.','skr starts many words. It must be followed by a vowel.')]),
(7,'Next-letter guessing and GPT','cause-effect','Why does a GPT trained only on next-letter guessing learn English sounds and spelling?','How does “guessing the next letter is predicting x₁₆” connect to phonotactics?','To predict well, its distribution over next letters must match which letters English allows, flat after a vowel and peaked after skr_.',[
('It memorizes a dictionary that lists every rule.','It learns from the prediction task, not from an explicit rule list.'),
('Next-letter guessing has nothing to do with sound patterns.','The allowed next letters are exactly the phonotactic patterns.'),
('It predicts every letter with equal probability.','A good predictor is peaked where English is restrictive, as after skr_.')]),
]
W=[
(2,'Static-vector classifiers','interpretation','Explain what a static-vector classifier like the vowel network can do and what it cannot do.','What kind of task fits the 1943–1986 networks, and where do they fall short?','Given one fixed vector, such as F1 and F2, the network can decide among a few categories. It cannot take in a sequence or keep track of earlier inputs, which speech and language require.',['State the decision-among-categories task.','Identify the missing handling of sequences.']),
(2,'Historical endpoints','interpretation','Explain why McCulloch and Pitts (1943) and the Parallel Distributed Processing volumes (1986) mark the period on the page.','What do the two sources contribute to the 1943–1986 span?','McCulloch and Pitts treated neurons as all-or-none units whose activity could be described with logic. The 1986 Parallel Distributed Processing volumes brought networks of many simple connected units, trained by adjusting weights, into wide use.',['Describe the all-or-none starting point.','Describe the trainable-network endpoint.']),
(2,'Why cognition is more complex','cause-effect','Explain why “human cognition is far more complex” than the vowel network’s task.','What does the vowel network leave out that language needs?','Language unfolds in time. Words are sequences of changing sounds and sentences are sequences of words, and what comes next depends on what came before. A network that maps one snapshot to a label has no memory of earlier parts.',['Mention sequences in time.','Mention dependence on earlier parts.']),
(3,'Jordan’s architecture','interpretation','Describe the four kinds of units in Jordan’s 1985 network and how they connect.','What do the plan, state, hidden and output units each do?','Plan units supply which sequence to produce. Hidden units combine information, and output units give the response. Outputs loop back into state units, which also feed back to themselves and pass their trace to the hidden units.',['Name all four unit types.','Describe the feedback into state units.']),
(3,'Recurrence as memory','cause-effect','Explain how the loops in Jordan’s network give it a kind of memory.','Why does each output depend on earlier outputs?','The state units keep a trace of what the network just produced and feed it back with the plan. The next output is therefore shaped by recent outputs, unlike a feedforward network where each input passes through once.',['Explain the trace in state units.','Contrast with a feedforward network.']),
(3,'Reading the feature plot','interpretation','Describe what the Sibilant and Round lines in Performance on /istrstry/ show.','How do Sibilant and Round behave over the 32 time steps?','Sibilant rises in separate bumps where the s sounds occur. Round rises early and stays high for most of the sequence, so rounding spreads across several sounds instead of switching for each one.',['Describe Sibilant’s bumps.','Describe Round’s early, sustained rise.']),
(3,'From recurrence to LLMs','cause-effect','Explain the link the page draws from Jordan’s recurrent networks to LLMs and agentic AI.','What idea carries over from recurrent networks to language models?','Jordan’s network produced sequences by feeding its own past outputs back in, so each output depended on what came before. Modeling sequences by using earlier items to shape the next one is what LLMs do, and agentic systems are built from LLMs.',['Identify use of past outputs.','Connect sequence modeling to LLMs.']),
(4,'Neuron to network','interpretation','Describe the step from one neuron to a network in the first two columns.','How do “vector in, 1 number out” and “vector in, decision vector out” differ?','One neuron multiplies its input vector by weights and sums to one number, an inner product. A network stacks layers joined by W₁, W₂ and W₃, each turning one vector into the next, and ends with a decision vector of one value per answer.',['Describe the single inner product.','Describe stacked layers ending in a decision vector.']),
(4,'LLM input and output','interpretation','Explain what goes into and comes out of the LLM in the third column.','What are vectors 1 to 15 and vector 16 in the LLM column?','Vectors 1 through 15, one per token, go in at the bottom and pass up through 5 layers of weight blocks. Vector 16 comes out at the top as a probability distribution over the next token.',['Identify the 15 token vectors and layers.','Identify vector 16 as a next-token distribution.']),
(4,'Agentic graph','interpretation','Describe the agentic system in the fourth column and the role of its loop.','How do the five LLMs in the agentic system work together?','Separate LLMs outline, write, critique, revise and finish the work in order. The loop between Critic and Revise lets the critique send a draft back for more revision before the Final LLM completes it.',['Name the roles in order.','Explain the Critic–Revise loop.']),
(4,'Shared operations','distinction','Explain the bottom line “Inference: inner products, Learning: SGD + DP” and why it applies to all four columns.','What two operations underlie a neuron, a network, an LLM and an agentic system?','Running any of these models means passing weighted sums, inner products, from layer to layer. Training them means adjusting weights with stochastic gradient descent, using gradients computed by backpropagation’s dynamic programming. The same operations scale from one neuron to an LLM.',['Explain inference as inner products.','Explain learning as SGD with dynamic programming.']),
(4,'Dynamical system','interpretation','The LLM is called “a dynamical system with many vectors in, 1 decision vector out.” Explain the inputs and output in that description.','What are the many vectors in and the one decision vector out?','The many vectors in are the 15 token vectors, which pass through the layers together. The one decision vector out is vector 16, the probability distribution over the next token.',['Identify the input vectors.','Identify the single output distribution.']),
(5,'Sentence prediction','cause-effect','Explain what x₁₆ is in the sentence example and why distant words matter for it.','Why does filling in “sat on the ___” depend on earlier words?','x₁₆ is the missing word after “sat on the.” Predicting it depends on knowing that the cat, mentioned near the start, is the one that sat, so information from far back in the sequence shapes the guess.',['Identify x₁₆ as the missing word.','Explain the use of earlier words.']),
(5,'Sound and image sequences','interpretation','Explain how a spectrogram and an image are turned into sequences of 15 vectors with a missing sixteenth.','What are the vectors in the spectrogram and image examples?','The spectrogram is cut into 15 frames of sound over time, from 0 to 5 kHz, and x₁₆ is the next frame. The image is cut into 16 patches read row by row, and x₁₆ is the missing bottom-right patch.',['Describe spectrogram frames.','Describe image patches read row by row.']),
(5,'Protein sequence','interpretation','Explain the protein example on the page.','How is the insulin B chain treated as a sequence?','The insulin B chain is read as 15 amino acids, F V N Q H L C G S H L V E A L. Each amino acid is a vector, and x₁₆ is the next residue, Y.',['Identify amino acids as the vectors.','Identify the next residue.']),
(5,'Only vectors','cause-effect','Explain the takeaway “The LLM only ever sees vectors.”','Why does the same machine work for words, sounds, pixels and molecules?','Each kind of data is turned into a sequence of vectors before the model sees it. The model only predicts the next vector, so the same machine and the same question, what is x₁₆, apply whatever the vectors stand for.',['Explain conversion to vectors.','Connect to one shared prediction question.']),
(6,'CVC syllables','interpretation','Explain the CVC rule using words from the first row.','What pattern do Don, mat, sit and fish share?','Each is one syllable with a single consonant, then a single vowel, then a single consonant, which is a simple English syllable. Silent letters such as the e in shave do not add a sound.',['State consonant, vowel, consonant.','Use examples from the row.']),
(6,'Onsets and codas','distinction','Explain the difference between onset and coda clusters, using the real words and their starred twins.','What do split and desk show, and what do *sblit and *desb show?','Onsets are clusters before the vowel, as in split, flat and stop. Codas are clusters after the vowel, as in desk, help and lamp. Each has a starred twin, such as *sblit and *desb, that English does not allow in that position.',['Define onset and coda.','Use a real word and a starred twin.']),
(6,'Mirrored order','cause-effect','Explain what pairs like flat and *lfat, or help and *hepl, show about English clusters.','Why can the same letters form a word in one order but not the other?','The same consonants are allowed only in certain orders, and the allowed order mirrors around the vowel. fl can start a word but lf cannot, and lp can end a word but pl cannot.',['State that order matters.','Explain the mirroring around the vowel.']),
(6,'Chains of syllables','cause-effect','Explain why At·lan·tic, ath·lete and ad·mit are words while *tlantic, *thlete and *dmit are impossible.','How do syllable breaks allow clusters that cannot start a word?','A long word is a chain of syllables, each following the same rules. In Atlantic, athlete and admit, a break falls between t and l, th and l, and d and m. Those pairs cannot start a syllable, so the starred forms are impossible. ng works the same way, ending a syllable in ring but never starting one.',['Explain the syllable break.','Explain why the starred forms fail.']),
(6,'Phonotactic knowledge','interpretation','Define phonotactics and explain what is notable about speakers’ knowledge of it.','What kind of knowledge lets people judge *bnack as impossible?','Phonotactics is knowledge of which sound sequences a language allows in its syllables. English speakers can judge forms like *bnack or *tsop as impossible without ever having been taught the rules.',['Define phonotactics.','Note that it is untaught.']),
(7,'Open and narrow choices','distinction','Explain why many letters can follow ra_ while few can follow sp_.','Compare the next-letter choices after a vowel and at the start of a word.','After a vowel, as in ra_, almost anything can follow, such as t, n, r or l. At the start of a word, only allowed onsets can form, so after sp_ the next letter must be l, r or a vowel, and *spn is impossible.',['Describe the open choice after a vowel.','Describe the narrowed choice at a word start.']),
(7,'Most constrained starts','interpretation','Explain the answers for skr_, m_ and bram_.','What can follow skr_, m_ and bram_?','After skr_ and m_ at the start of a word, only a vowel can come next, never *skrl or *mb. After bram_, b is nearly forced, as in bramble, though a new syllable could also begin.',['State that only vowels follow skr_ and m_.','Explain bram_.']),
(7,'GPT and phonotactics','cause-effect','Explain how a GPT trained only on next-letter guessing comes to know English phonotactics.','What does the shape of its predicted distribution show?','To predict well, the model’s distribution over the next letter must match what English allows. It ends up spread flat after a vowel, as in fa_, and sharply peaked on a few vowels after skr_, so it has learned the sound and spelling patterns.',['Link prediction accuracy to matching English patterns.','Describe flat versus peaked distributions.']),
(5,'Next letter as x₁₆','application','Connect the next-letter pop quiz to the 15-vectors-and-x₁₆ picture of an LLM.','Why is guessing the next letter the same task as predicting x₁₆?','In the quiz, the letters typed so far are the given sequence and the next letter is the missing item. That is exactly the LLM task of reading vectors x₁ to x₁₅ and predicting x₁₆, here with letters as the vectors.',['Map typed letters to the given sequence.','Map the next letter to x₁₆.']),
]
if __name__=='__main__':build(17,M,W)
