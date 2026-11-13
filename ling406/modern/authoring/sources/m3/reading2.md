# M3 · reading2 · Reading 2 · Computational models

31 pages. Pages marked EMPTY get an empty line (`page|`).


=====================
## Page 1 · Reading 2 · Computational models · EMPTY (title or logistics page, write nothing)
Slide image: ling406/module3/assets/reading2/001.webp

### Original slide text
Reading 2: Computational 
models


=====================
## Page 2 · Why propose two reading routes?
Slide image: ling406/module3/assets/reading2/002.webp

### Original slide text
Dual route models of visual word recognition 
This general form of model is motivated by the 
phenomena we reviewed in the last lecture:
- pseudoword reading is fast and automatic
- word reading is faster
- reading is fastest for high-frequency words
- accuracy and response time are also 
impacted by “regularity”
- frequency and regularity interact
- pseudoword reading and irregular word 
reading are dissociable in acquired dyslexia
Thus, the model hypothesize 
- a sublexical route for grapheme-to-
phoneme conversion (decoding)
- a lexical route for recognizing real words

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Dual-route models distinguish a lexical route from a sublexical route.** Lexical processing uses knowledge of particular words, while grapheme–phoneme conversion generates pronunciation from spelling units. A model must explain fast pseudoword reading, faster familiar-word reading, frequency effects, regularity effects and their interaction.
  - It must also explain why pseudoword and exception-word reading can be differently impaired after brain injury. These observations motivate the architecture but do not uniquely prove it.
- **The two-route proposal connects several reading findings to a common processing account.** Its success depends on explaining the full pattern, not only nonword reading.
  - A grapheme is a written unit associated with a sound. The route labels specify kinds of information used during reading.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Dual-route models distinguish a lexical route from a sublexical route.** Lexical processing uses knowledge of particular words, while grapheme–phoneme conversion generates pronunciation from spelling units.
  - A model must explain fast pseudoword reading, faster familiar-word reading, frequency effects, regularity effects and their interaction.
- It must also explain why pseudoword and exception-word reading can be differently impaired after brain injury. These observations motivate the architecture but do not uniquely prove it.
- A grapheme is a written unit associated with a sound. The route labels specify kinds of information used during reading.


=====================
## Page 3 · The Dual Route Cascaded model
Slide image: ling406/module3/assets/reading2/003.webp

### Original slide text
(image credit: http://www.maccs.mq.edu.au/~ssaunder/DRC/)
Coltheart et al. (2001, Psych Review)
This is the “DRC -- Dual Route 
Cascaded” model. 
Some key points:
The portion circled in red is 
just the Interactive Activation 
model.
There is no implementation 
of semantics, since both the 
orthographic and phonological 
lexicons are independent of 
semantics.
The Grapheme-Phoneme 
Rule System has completely 
different processing assumptions 
from the interactive portion of the 
model.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **The Dual Route Cascaded model, or DRC, combines interactive lexical processing with a separate grapheme–phoneme rule system.** The two routes can contribute activation toward a spoken response. The lexical portion includes orthographic and phonological lexicons, representing written and spoken word forms. These representations are distinguished from meanings.
  - The implementation described here does not implement semantics. The GPC rule system also has processing assumptions different from those of the interactive lexical network.
- **The DRC does not treat every connection as the same kind of computation.** Word-form activation and rule-based conversion are separate mechanisms.
  - The circled part of the diagram corresponds to interactive activation. The separate GPC path joins the output system rather than becoming another interactive lexical layer.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **The Dual Route Cascaded model, or DRC, combines interactive lexical processing with a separate grapheme–phoneme rule system.** The two routes can contribute activation toward a spoken response.
  - The lexical portion includes orthographic and phonological lexicons, representing written and spoken word forms. These representations are distinguished from meanings.
- The implementation described here does not implement semantics. The GPC rule system also has processing assumptions different from those of the interactive lexical network.
- The circled part of the diagram corresponds to interactive activation. The separate GPC path joins the output system rather than becoming another interactive lexical layer.


=====================
## Page 4 · How GPC processing works
Slide image: ling406/module3/assets/reading2/004.webp

### Original slide text
Some important features of the 
Grapheme-Phoneme Rule System:
Its rules are activated serially, 
letter by letter. 
It is not affected by frequency 
of occurrence in any way.
It has no feedback. 
It does not interact with the 
lexical route, except in the 
phoneme response buffer, where 
it is connected to the same output 
units (and therefore can compete 
to activate different patterns).
(image credit: http://www.maccs.mq.edu.au/~ssaunder/DRC/)
Coltheart et al. (2001, Psych Review)

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **The DRC's grapheme–phoneme conversion rules operate serially, letter by letter.** Their operation is not adjusted by word frequency and receives no lexical feedback. The GPC and lexical routes do not interact throughout their internal computations. They converge in the phoneme response buffer.
  - If the routes favor different phonemes, they can compete at that shared output. An exception word can therefore receive a correct lexical pronunciation and an incompatible regularized pronunciation.
- **Encapsulation does not mean that the routes never affect the same response.** They remain separate internally but meet at the phoneme output.
  - Follow the route to the response buffer. Shared output units explain how competing pronunciations can influence naming even without feedback into the GPC rules.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **The DRC's grapheme–phoneme conversion rules operate serially, letter by letter.** Their operation is not adjusted by word frequency and receives no lexical feedback.
  - The GPC and lexical routes do not interact throughout their internal computations. They converge in the phoneme response buffer.
- If the routes favor different phonemes, they can compete at that shared output. An exception word can therefore receive a correct lexical pronunciation and an incompatible regularized pronunciation.
- Follow the route to the response buffer. Shared output units explain how competing pronunciations can influence naming even without feedback into the GPC rules.


=====================
## Page 5 · Rules and rules for applying rules
Slide image: ling406/module3/assets/reading2/005.webp

### Original slide text
What are the GPC rules like?
<...>
(you also need some meta-rules for 
when to apply rules at different levels of 
analysis, e.g., larger-unit rules 
supersede smaller-unit rules)

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **GPC rules map written units onto phonemes.** Some rules concern individual letters, while others concern several letters or a particular letter context. A model also needs a way to decide which applicable rule takes priority. A larger-unit rule can supersede rules for its individual letters.
  - Context-sensitive rules restrict a pronunciation to specified surrounding letters or positions. This makes the procedure more than a simple lookup of one sound per letter.
- **A rule list is incomplete without a procedure for resolving overlapping rules.** Both the mapping and its conditions of application matter.
  - The table distinguishes multiletter rules from context-sensitive rules. Position labels specify whether a mapping applies at the beginning, middle, end or all positions.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **GPC rules map written units onto phonemes.** Some rules concern individual letters, while others concern several letters or a particular letter context.
  - A model also needs a way to decide which applicable rule takes priority. A larger-unit rule can supersede rules for its individual letters.
- Context-sensitive rules restrict a pronunciation to specified surrounding letters or positions. This makes the procedure more than a simple lookup of one sound per letter.
- The table distinguishes multiletter rules from context-sensitive rules. Position labels specify whether a mapping applies at the beginning, middle, end or all positions.


=====================
## Page 6 · Categorical rules and statistical support
Slide image: ling406/module3/assets/reading2/006.webp

### Original slide text
Actually, the rules aren’t totally independent of statistics.
They’re often based on the most frequent pronunciation for a letter or 
combination of letters.
But they are fixed and categorical. So, even though the rule for -OUGH has 
weaker statistical support than the rule for -EIGH, they are both rules and 
behave the same way during processing. 
{OUGH: (final != T)}
OUGH
{EIGH: (final != T)}
EIGH
-
-
1
0.667
/eI/
-
-
-
0.333
/aI/
0.27
0.53
-
-
/ɔ/
0.27
0.16
-
-
/әf/
0.18
0.16
-
-
/oʊ/
0.18
0.11
-
-
/aʊ/
0.09
0.05
-
-
/u/

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **A categorical rule does not express the strength of the evidence behind it.** The DRC can choose a mapping because it is frequent, yet treat that mapping as a fixed rule during processing. The possible pronunciations of OUGH have more divided statistical support than those of EIGH. A rule can still operate categorically for both spellings.
  - A probabilistic account instead allows alternatives to receive different strengths of support. The distinction concerns processing, not whether the model designer ever consulted frequency information.
- **Using statistics to select a rule differs from representing graded statistics while reading.** The two approaches can make different predictions for ambiguous spellings.
  - The table distributes pronunciation frequencies across alternatives. A spread across many rows indicates greater uncertainty than a distribution concentrated on one pronunciation.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **A categorical rule does not express the strength of the evidence behind it.** The DRC can choose a mapping because it is frequent, yet treat that mapping as a fixed rule during processing.
  - The possible pronunciations of OUGH have more divided statistical support than those of EIGH. A rule can still operate categorically for both spellings.
- A probabilistic account instead allows alternatives to receive different strengths of support. The distinction concerns processing, not whether the model designer ever consulted frequency information.
- The table distributes pronunciation frequencies across alternatives. A spread across many rows indicates greater uncertainty than a distribution concentrated on one pronunciation.


=====================
## Page 7 · Why imperfect rules were defended
Slide image: ling406/module3/assets/reading2/007.webp

### Original slide text
…by which I mean that they seem to miss a lot of cases.
This was seen as a feature, though, not a bug.
We could certainly come up with better rules if we took statistics into account more flexibly. 
(In fact the DRC’s rules went through several revisions to improve its nonword reading.)
But the argument from the DRC is that people don’t use such finely-tuned rules for the GPC 
route. 
If they did, you wouldn’t see the pattern of regularization errors that you see in surface 
dyslexia, or the slow-down in performance that you see for low-frequency exception words. 
These rules are kind of silly

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **The DRC's simple rules are intended to explain systematic human errors as well as correct reading.** More finely tuned rules might pronounce more exceptions correctly but remove behavior the model is meant to explain. A regularizing route helps account for errors in surface dyslexia and for slow naming of low-frequency exception words.
  - The theory therefore claims that people's sublexical computation is constrained, rather than assuming that the best possible spelling algorithm is the correct cognitive model.
- **A cognitively useful model should reproduce the relevant failures.** Maximizing pronunciation accuracy is not the only goal.
  - The crucial test is whether the same processing assumptions produce the observed pattern of success, interference and regularization, rather than an isolated incorrect response.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **The DRC's simple rules are intended to explain systematic human errors as well as correct reading.** More finely tuned rules might pronounce more exceptions correctly but remove behavior the model is meant to explain.
  - A regularizing route helps account for errors in surface dyslexia and for slow naming of low-frequency exception words.
- The theory therefore claims that people's sublexical computation is constrained, rather than assuming that the best possible spelling algorithm is the correct cognitive model.
- The crucial test is whether the same processing assumptions produce the observed pattern of success, interference and regularization, rather than an isolated incorrect response.


=====================
## Page 8 · Informational encapsulation
Slide image: ling406/module3/assets/reading2/008.webp

### Original slide text
Remember when we talked about models of syntax?
We saw that parsing strategies like “late closure” and 
“minimal attachment” were motivated by 
consideration of syntactic complexity only.
The idea was to explain syntactic processing as 
informationally encapsulated from world knowledge, 
lexical co-occurrence statistics, etc.
The dual-route models are designed to be similarly 
modular. 
The GPC chugs along and produces correct 
pronunciations for many words, incorrect responses 
to some “exceptions” to its rules. Occasionally, we can 
observe its operation when:
-people produce “regularization” errors
- we force people to name pseudowords
These rules are kind of silly

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Informational encapsulation means that a process does not freely use every source of relevant knowledge.** In the dual-route account, GPC conversion proceeds without consulting whole-word meaning or lexical feedback. This resembles a modular parsing proposal in which an early syntactic process follows structural principles without immediately using world knowledge.
  - Pseudoword naming exposes the conversion procedure because a familiar lexical entry is unavailable. Regularization errors expose it when conversion favors the wrong pronunciation.
- **A modular account predicts restricted access to information.** The GPC route may produce an inappropriate response even when another part of the system has word-specific knowledge.
  - The comparison with parsing concerns processing restrictions. It does not mean that syntactic parsing and letter–sound conversion use the same representations.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Informational encapsulation means that a process does not freely use every source of relevant knowledge.** In the dual-route account, GPC conversion proceeds without consulting whole-word meaning or lexical feedback.
  - This resembles a modular parsing proposal in which an early syntactic process follows structural principles without immediately using world knowledge.
- Pseudoword naming exposes the conversion procedure because a familiar lexical entry is unavailable. Regularization errors expose it when conversion favors the wrong pronunciation.
- The comparison with parsing concerns processing restrictions. It does not mean that syntactic parsing and letter–sound conversion use the same representations.


=====================
## Page 9 · Breadth of DRC simulations
Slide image: ling406/module3/assets/reading2/009.webp

### Original slide text
The DRC can simulate a lot of phenomena in visual 
word recognition. 
Coltheart et al., 2001, Psych Review

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **The DRC is evaluated against many reading phenomena.** These include frequency, lexicality, regularity, interactions, lexical decision and patterns in acquired dyslexia. Accounting for several effects with one architecture is stronger than fitting a single result. It also requires examining which assumptions stay fixed and which are changed between tasks.
  - The model's research strategy places strong weight on human behavioral evidence as a constraint on architecture.
- **A broad list of successful simulations is informative, but the conditions of each success also matter.** Model evaluation includes both coverage and the assumptions used to obtain it.
  - The listed effects span reading aloud, lexical decision and patient performance. These are related but distinct tasks, so a task-specific adjustment must be identified as such.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **The DRC is evaluated against many reading phenomena.** These include frequency, lexicality, regularity, interactions, lexical decision and patterns in acquired dyslexia.
  - Accounting for several effects with one architecture is stronger than fitting a single result. It also requires examining which assumptions stay fixed and which are changed between tasks.
- The model's research strategy places strong weight on human behavioral evidence as a constraint on architecture.
- The listed effects span reading aloud, lexical decision and patient performance. These are related but distinct tasks, so a task-specific adjustment must be identified as such.


=====================
## Page 10 · Modeling lexical decision
Slide image: ling406/module3/assets/reading2/010.webp

### Original slide text
This sometimes means going to extremes to make contact with data
Reduce letter-word inhibition. 
(This change makes the task harder, but 
without it, the results make no sense.) 
If any single word has an activity above a 
threshold of 0.69, answer “yes.”
If the activity over the orthographic 
input lexicon exceeds threshold S, 
answer “yes.”
(where S = 10 from 0-20 cycles, and is 
then reduced to 1.98 if activity in the 
orthographic lexicon exceeds 0.2 at 20 
cycles).
If neither of these criteria is met by D 
cycles, answer “no.”
(where D = 42 unless activity in the 
lexicon exceeds 0.112 after 20 cycles, in 
which case it is set to 48. Note that this 
nearly twice as fast as the model 
normally reads aloud).
How the lexical decision task is 
modeled in the DRC…

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Lexical decision requires deciding whether a written item is a word.** The DRC simulation adds decision criteria to the activation produced by its recognition system. A “yes” response can depend on a strongly activated single word or on total activity across the orthographic lexicon. A “no” response occurs if the criteria are not met by a deadline.
  - The implementation also changes inhibition and uses time-dependent thresholds. These choices help obtain a fit, but they add assumptions beyond the basic two-route diagram.
- **Fitting lexical decision requires an account of the decision itself.** Recognition activity does not automatically specify when to say yes or no.
  - The thresholds and cycle deadlines implement response rules. Their conceptual role is more important here than memorizing each numerical cutoff.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Lexical decision requires deciding whether a written item is a word.** The DRC simulation adds decision criteria to the activation produced by its recognition system.
  - A “yes” response can depend on a strongly activated single word or on total activity across the orthographic lexicon. A “no” response occurs if the criteria are not met by a deadline.
- The implementation also changes inhibition and uses time-dependent thresholds. These choices help obtain a fit, but they add assumptions beyond the basic two-route diagram.
- The thresholds and cycle deadlines implement response rules. Their conceptual role is more important here than memorizing each numerical cutoff.


=====================
## Page 11 · Modularity in the DRC
Slide image: ling406/module3/assets/reading2/011.webp

### Original slide text
Key feature of the DRC: Modularity
The GPC route and lexical route:
- each have their own processing assumptions
- are informationally encapsulated from one another
- are domain-specific, i.e., the GPC rules can only take letters as 
inputs and pass phoneme activations to the phoneme system

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **The DRC routes are modular in several related senses.** They use different processing assumptions, restrict information exchange and accept particular kinds of input. The GPC system takes letters as input and sends phoneme activation toward the response system. This is **domain specificity** in the account.
  - The absence of lexical feedback into the GPC system is **informational encapsulation**. Having two pathways alone would not establish those stronger restrictions.
- **Modularity is a claim about how components operate and communicate.** It is more specific than drawing two arrows in a model.
  - Distinguish the restrictions on inputs, the rules of computation and the restrictions on communication. These are separate properties of the proposed architecture.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **The DRC routes are modular in several related senses.** They use different processing assumptions, restrict information exchange and accept particular kinds of input.
  - The GPC system takes letters as input and sends phoneme activation toward the response system. This is **domain specificity** in the account.
- The absence of lexical feedback into the GPC system is **informational encapsulation**. Having two pathways alone would not establish those stronger restrictions.
- Distinguish the restrictions on inputs, the rules of computation and the restrictions on communication. These are separate properties of the proposed architecture.


=====================
## Page 12 · An emergentist reading model
Slide image: ling406/module3/assets/reading2/012.webp

### Original slide text
An emergentist approach: PDP models of visual word 
recognition
Seidenberg & McClelland (1989)
Conceived of reading skill as emerging from mappings 
among spelling, pronunciation, and meaning.
Modeled the learning of these mappings by training a 
simple associative network. 
Studied mappings from orthography to phonology (O 
P) in a single “route.”

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **PDP models treat reading as learned mappings among orthography, phonology and semantics.** Orthography is spelling, phonology is sound structure, and semantics is meaning. Seidenberg and McClelland trained an associative network to map spelling onto pronunciation. The modeled spelling-to-sound pathway used one learned mapping for different kinds of words.
  - Reading skill emerges from learning rather than being specified entirely as a hand-built list of rules and lexical entries.
- **An emergentist account asks how experience creates useful reading behavior.** Regularity can arise from learning across words rather than from a separate rule mechanism.
  - The triangle's labels identify representational domains. A connection between domains represents a learned mapping, not an additional stored dictionary for every item.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **PDP models treat reading as learned mappings among orthography, phonology and semantics.** Orthography is spelling, phonology is sound structure, and semantics is meaning.
  - Seidenberg and McClelland trained an associative network to map spelling onto pronunciation. The modeled spelling-to-sound pathway used one learned mapping for different kinds of words.
- Reading skill emerges from learning rather than being specified entirely as a hand-built list of rules and lexical entries.
- The triangle's labels identify representational domains. A connection between domains represents a learned mapping, not an additional stored dictionary for every item.


=====================
## Page 13 · Distributed knowledge and general learning
Slide image: ling406/module3/assets/reading2/013.webp

### Original slide text
PDP models of visual word recognition
Seidenberg & McClelland (1989)
Different assumptions from dual-route models:
- “rules” are just generalizations from lots of 
words, not a separate process
- the “lexicon” is also distributed. Some 
whole-word information is stored in O P 
mappings, some in  other parts of the system.
Different research strategy from dual-route 
models:
Explain reading in terms of domain-general 
learning mechanisms, rather than reverse-
engineer the system from adult/neuropsych data.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **In a PDP account, rules are generalizations learned across words.** Whole-word knowledge is distributed across learned mappings instead of being stored only in a distinct lexical route. The same learning mechanism can capture both patterns shared by many words and information specific to a familiar word.
  - The research strategy asks whether domain-general learning can explain reading. This contrasts with choosing separate adult processing components primarily from neuropsychological dissociations.
- **Word-specific knowledge and generalization can coexist in the same learned system.** They do not have to be implemented as a dictionary and a separate symbolic rule list.
  - “Distributed” refers to how knowledge is represented across the network. It does not mean that the model has no memory of individual words.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **In a PDP account, rules are generalizations learned across words.** Whole-word knowledge is distributed across learned mappings instead of being stored only in a distinct lexical route.
  - The same learning mechanism can capture both patterns shared by many words and information specific to a familiar word.
- The research strategy asks whether domain-general learning can explain reading. This contrasts with choosing separate adult processing components primarily from neuropsychological dissociations.
- “Distributed” refers to how knowledge is represented across the network. It does not mean that the model has no memory of individual words.


=====================
## Page 14 · Learning the frequency–regularity interaction
Slide image: ling406/module3/assets/reading2/014.webp

### Original slide text
Frequency by regularity interaction
The model captured the interaction between 
frequency and regularity without assuming 
that these effects resulted from different 
processes.
How?
- “regular” words are consistent with 
statistical patterns from many other words.
- “exception” words are inconsistent with 
these statistics.
- frequency also impacts how well words 
are learned. So, highly frequent words are 
less effected by inconsistency with other 
words.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **A learned network can produce a frequency-by-regularity interaction without separate frequency and rule mechanisms.** Regular words receive support from patterns shared across many words. An exception conflicts with those patterns, so learning its particular mapping is especially important. Frequent exposure strengthens that word-specific mapping.
  - A low-frequency exception has both weak item-specific learning and poor support from the dominant pattern. This combination creates a larger disadvantage than either factor alone.
- **Consistency supplies support from other words, while frequency strengthens experience with the particular word.** Their joint influence explains why infrequent exceptions are especially difficult.
  - The interaction is shared evidence that both architectures must explain. Producing it does not by itself establish whether the implementation contains symbolic rules.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **A learned network can produce a frequency-by-regularity interaction without separate frequency and rule mechanisms.** Regular words receive support from patterns shared across many words.
  - An exception conflicts with those patterns, so learning its particular mapping is especially important. Frequent exposure strengthens that word-specific mapping.
- A low-frequency exception has both weak item-specific learning and poor support from the dominant pattern. This combination creates a larger disadvantage than either factor alone.
- The interaction is shared evidence that both architectures must explain. Producing it does not by itself establish whether the implementation contains symbolic rules.


=====================
## Page 15 · Consistency rather than a single rule boundary
Slide image: ling406/module3/assets/reading2/015.webp

### Original slide text
Redefining “regularity”
Regular Consistent: Many friends and no 
enemies [LATE, DUST]
Regular Inconsistent: Many friends but at 
least one enemy [GAVE (cf.HAVE), MINT 
(cf.PINT)]
Ambiguous: About equal numbers of 
friends and enemies [DOWN, KNOWN; 
POUR, SOUR] 
Exception: Few if any friends and many 
enemies [HAVE (cf. GAVE), PINT (cf. 
MINT)]

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Consistency describes how many similar spellings support a pronunciation.** “Friends” have the relevant spelling pattern and a compatible pronunciation, while “enemies” support a competing pronunciation. LATE and DUST illustrate consistent patterns. GAVE and MINT have many friends but also enemies such as HAVE and PINT.
  - DOWN versus KNOWN and POUR versus SOUR illustrate ambiguity. An exception such as PINT has relatively little support compared with its competing neighborhood.
- **Spelling–sound support varies in degree.** A statistical description captures differences that a simple regular-versus-irregular label can hide.
  - Friend and enemy are labels for pronunciation relations among similar spellings. They do not refer to semantic relationships between the words.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Consistency describes how many similar spellings support a pronunciation.** “Friends” have the relevant spelling pattern and a compatible pronunciation, while “enemies” support a competing pronunciation.
  - LATE and DUST illustrate consistent patterns. GAVE and MINT have many friends but also enemies such as HAVE and PINT.
- DOWN versus KNOWN and POUR versus SOUR illustrate ambiguity. An exception such as PINT has relatively little support compared with its competing neighborhood.
- Friend and enemy are labels for pronunciation relations among similar spellings. They do not refer to semantic relationships between the words.


=====================
## Page 16 · Using learned weights for nonwords
Slide image: ling406/module3/assets/reading2/016.webp

### Original slide text
Reading words and nonwords in the same 
“route”
In principle: 
- nonwords named via the same set of weights used 
for words.
- generalization takes advantage of the same statistical 
patterns that give rise to regularity effects.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **A PDP model can pronounce nonwords using the weights learned from real words.** A new spelling activates patterns that overlap with familiar spellings, allowing the network to generalize. No stored entry for the particular nonword is required. The same learned correspondences that support consistent words can support a new combination.
  - This is a proposed mechanism for decoding without a separate GPC rule module.
- **Novel pronunciation can result from applying learned statistical structure.** Nonword reading therefore does not automatically establish a separate symbolic route.
  - The relevant comparison is whether one learned mapping can handle both familiar words and new items. The claim must still be checked against the model's actual performance.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **A PDP model can pronounce nonwords using the weights learned from real words.** A new spelling activates patterns that overlap with familiar spellings, allowing the network to generalize.
  - No stored entry for the particular nonword is required. The same learned correspondences that support consistent words can support a new combination.
- This is a proposed mechanism for decoding without a separate GPC rule module.
- The relevant comparison is whether one learned mapping can handle both familiar words and new items. The claim must still be checked against the model's actual performance.


=====================
## Page 17 · Theory versus implementation
Slide image: ling406/module3/assets/reading2/017.webp

### Original slide text
In practice, though, not so great…
Nonword accuracy was not very 
good.
Why?
This is a classic case of ambiguity in 
model evaluation.
Was the theoretical claim -- that 
nonwords and exceptions could 
be read by the same, associative 
mechanism – wrong?
Or, was the problem something 
specific to the way the model was 
made?

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Poor nonword performance can challenge either a theoretical proposal or a particular implementation.** The early model's nonword accuracy was weaker than desired. One possibility is that a single associative mechanism cannot explain the task. Another is that the chosen representations fail to capture the similarities needed for generalization.
  - Improving the implementation while retaining the theoretical mechanism helps distinguish these possibilities.
- **A failed simulation does not identify its own cause.** The failure must be traced to the architecture, learning assumptions, representations or other implementation choices.
  - The important question is what changes when the model is repaired. A representational improvement is a different theoretical move from adding a separate nonword route.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Poor nonword performance can challenge either a theoretical proposal or a particular implementation.** The early model's nonword accuracy was weaker than desired.
  - One possibility is that a single associative mechanism cannot explain the task. Another is that the chosen representations fail to capture the similarities needed for generalization.
- Improving the implementation while retaining the theoretical mechanism helps distinguish these possibilities.
- The important question is what changes when the model is repaired. A representational improvement is a different theoretical move from adding a separate nonword route.


=====================
## Page 18 · Phonological representation matters
Slide image: ling406/module3/assets/reading2/018.webp

### Original slide text
Nonword reading related to phonological representations
Many studies demonstrate a 
relationship between “decoding” 
(i.e., nonword reading) and 
phonological processing.
The phonological representations 
used in Seidenberg & McClelland 
were sort of weird:  Wickelfeatures.
Indeed, a model by Plaut et al. (1996, 
Psych Review) improved the 
phonological representations, and 
produced better performance on 
nonwords.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Generalization depends on how sound similarity is represented.** The early Seidenberg–McClelland model used Wickelfeatures, whose representation of phonology was problematic for nonword reading. Plaut and colleagues improved the phonological representations and obtained better nonword performance. This supports a representational explanation for at least part of the earlier failure.
  - Behavioral relations between phonological processing and decoding also make phonology a relevant target for explanation.
- **Changing the representation can improve decoding without adding a symbolic rule system.** That distinction matters when evaluating the original theoretical claim.
  - The comparison concerns models with different representations. Better performance after that change is evidence about implementation, not proof that every associative model will succeed.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Generalization depends on how sound similarity is represented.** The early Seidenberg–McClelland model used Wickelfeatures, whose representation of phonology was problematic for nonword reading.
  - Plaut and colleagues improved the phonological representations and obtained better nonword performance. This supports a representational explanation for at least part of the earlier failure.
- Behavioral relations between phonological processing and decoding also make phonology a relevant target for explanation.
- The comparison concerns models with different representations. Better performance after that change is evidence about implementation, not proof that every associative model will succeed.


=====================
## Page 19 · Why degraded phonology hurts generalization
Slide image: ling406/module3/assets/reading2/019.webp

### Original slide text
How are phonological representations and 
nonword generalization related?
Generalization depends on similarity. (In fact this principle is 
inherited from behaviorism.)
Poor phonological representations (like Wickelfeatures) fail to 
adequately capture the similarity space of words in the language.
Word-specific information is more robust to poor representations, 
because it doesn’t depend entirely on generalization.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **A network generalizes through similarity.** If its phonological representation poorly captures similarities among words, the learned mapping cannot transfer as effectively to new forms. A familiar word can retain support from its own training history. A nonword lacks that item-specific experience and depends more heavily on generalization.
  - This produces a reason for unfamiliar forms to be especially vulnerable to poor representations without requiring a dedicated nonword mechanism.
- **The same representational weakness can have unequal effects on words and nonwords.** Familiarity can partly compensate where new-item generalization cannot.
  - Distinguish a weaker shared representation from damage to a separate route. Both can create a task difference, but they locate the explanation differently.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **A network generalizes through similarity.** If its phonological representation poorly captures similarities among words, the learned mapping cannot transfer as effectively to new forms.
  - A familiar word can retain support from its own training history. A nonword lacks that item-specific experience and depends more heavily on generalization.
- This produces a reason for unfamiliar forms to be especially vulnerable to poor representations without requiring a dedicated nonword mechanism.
- Distinguish a weaker shared representation from damage to a separate route. Both can create a task difference, but they locate the explanation differently.


=====================
## Page 20 · Harm and Seidenberg's noise manipulation
Slide image: ling406/module3/assets/reading2/020.webp

### Original slide text
How are phonological representations and 
nonword generalization related?
Harm & Seidenberg (1999) investigated 
this more systematically, by 
manipulating the amount of “noise” in 
the phonological representations.
They were able to replicate a number of 
key findings in the literature on 
developmental dyslexia:
- relationship between degree of 
phonological deficit and phonological 
dyslexia
- relative sparing of word recognition

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Harm and Seidenberg manipulated noise in phonological representations.** Increasing noise makes the sound representations less reliable while keeping the model's general learning framework. The manipulation produced poorer nonword decoding and relative sparing of word recognition. It also linked the severity of the phonological deficit to the degree of decoding difficulty.
  - The model therefore connects a reading pattern to the quality of a more general phonological system.
- **A selective-looking reading deficit can emerge from degraded shared representations.** Nonwords are especially dependent on reliable generalization.
  - Noise is the manipulated model property. Word and nonword performance are outcomes, so the simulation tests a directional mechanistic proposal rather than merely observing a correlation.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Harm and Seidenberg manipulated noise in phonological representations.** Increasing noise makes the sound representations less reliable while keeping the model's general learning framework.
  - The manipulation produced poorer nonword decoding and relative sparing of word recognition. It also linked the severity of the phonological deficit to the degree of decoding difficulty.
- The model therefore connects a reading pattern to the quality of a more general phonological system.
- Noise is the manipulated model property. Word and nonword performance are outcomes, so the simulation tests a directional mechanistic proposal rather than merely observing a correlation.


=====================
## Page 21 · Semantics and surface dyslexia
Slide image: ling406/module3/assets/reading2/021.webp

### Original slide text
What about all of those double-dissociations?
We’ve already seen how nonword
reading can be specifically impaired, 
despite the model’s lack of a specific 
“nonword reading mechanism.”
Plaut et al. (1996) explored the other 
end of this dissociation: surface 
dyslexia. 
To do this, they implemented a 
simplified semantic system, and 
demonstrated that lesions to 
semantics resulted in a specific 
impairment on “exception” words.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Damaging semantic support in a triangle model can impair exception-word reading especially strongly.** Plaut and colleagues added a simplified semantic contribution and examined what happened when it was lesioned. An exception has weak support from typical spelling–sound regularities. Meaning-related support can help produce its learned pronunciation.
  - Reducing that support creates a surface-dyslexia-like pattern without defining a separate exception-word list as the sole explanation.
- **The model links exception reading to semantic processing.** A reading dissociation can reflect unequal dependence on broader language systems.
  - “Lesion” here means a controlled change to the computational model. It is distinct from directly observing where a particular patient's brain injury occurred.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Damaging semantic support in a triangle model can impair exception-word reading especially strongly.** Plaut and colleagues added a simplified semantic contribution and examined what happened when it was lesioned.
  - An exception has weak support from typical spelling–sound regularities. Meaning-related support can help produce its learned pronunciation.
- Reducing that support creates a surface-dyslexia-like pattern without defining a separate exception-word list as the sole explanation.
- “Lesion” here means a controlled change to the computational model. It is distinct from directly observing where a particular patient's brain injury occurred.


=====================
## Page 22 · Why the triangle is not just DRC renamed
Slide image: ling406/module3/assets/reading2/022.webp

### Original slide text
Why is this not just the dual route model now?
Semantic representations are directly involved, as opposed 
to a theoretical commitment to a lexicon independent 
of semantics.
[A later model (Harm & Seidenberg, 2004) would 
implement featural semantics, and simulate the 
mapping of spelling to meaning.]
The OP and SP mappings have the same processing 
assumptions and learning algorithm. Both are 
probabilistic. 
A key point of these simulations is that these pathways interact over the course of 
learning. So, the OP pathway develops differently in the context of an OSP 
pathway than it would otherwise.
This interactivity and gradedness permits the models to capture the fact that double 
dissociations are never entirely “clean.”
- Phonological dyslexics are not perfect on exception words. 
- Surface dyslexics are not perfect on nonwords.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **The triangle model's pathways share graded learning assumptions and interact during learning.** Semantic representations are directly involved rather than replaced by a lexicon defined as independent of meaning. Spelling-to-sound learning develops in the presence of meaning-related support. The contribution of one pathway therefore affects what another pathway learns.
  - This allows graded impairments. Phonological dyslexics can make some exception errors, and surface dyslexics can make some nonword errors.
- **Multiple pathways do not necessarily imply modular routes.** Their learning rules, information types and interactions distinguish the accounts.
  - O denotes orthography, P phonology and S semantics. O-to-P and S-to-P mappings use the same general probabilistic assumptions, unlike DRC's distinct GPC and lexical procedures.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **The triangle model's pathways share graded learning assumptions and interact during learning.** Semantic representations are directly involved rather than replaced by a lexicon defined as independent of meaning.
  - Spelling-to-sound learning develops in the presence of meaning-related support. The contribution of one pathway therefore affects what another pathway learns.
- This allows graded impairments. Phonological dyslexics can make some exception errors, and surface dyslexics can make some nonword errors.
- O denotes orthography, P phonology and S semantics. O-to-P and S-to-P mappings use the same general probabilistic assumptions, unlike DRC's distinct GPC and lexical procedures.


=====================
## Page 23 · Semantics and exception reading in patients
Slide image: ling406/module3/assets/reading2/023.webp

### Original slide text
Model predicts a strong association between 
semantic abilities and exception word reading 
(Woollams et al., 2007)

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Woollams and colleagues tested the predicted association between semantic ability and exception-word reading.** Lower semantic scores were associated with poorer low-frequency exception reading in patients with semantic dementia. The model and patient panels show comparable overall relationships, although individual patients vary. This supports an association between meaning and exceptional pronunciation.
  - The finding is informative because it links a reading weakness to a broader semantic measure rather than describing only a reading-task dissociation.
- **The triangle account predicts that exception reading should vary with semantic ability.** The patient data broadly follow that relationship.
  - The semantic score decreases from left to right on the patient plot. The downward slope therefore means that poorer semantics goes with poorer reading, not that better semantics harms reading.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Woollams and colleagues tested the predicted association between semantic ability and exception-word reading.** Lower semantic scores were associated with poorer low-frequency exception reading in patients with semantic dementia.
  - The model and patient panels show comparable overall relationships, although individual patients vary. This supports an association between meaning and exceptional pronunciation.
- The finding is informative because it links a reading weakness to a broader semantic measure rather than describing only a reading-task dissociation.
- The semantic score decreases from left to right on the patient plot. The downward slope therefore means that poorer semantics goes with poorer reading, not that better semantics harms reading.


=====================
## Page 24 · Interpreting apparent exceptions
Slide image: ling406/module3/assets/reading2/024.webp

### Original slide text
…this means the model misses a few data 
points
What should we make of 
this?
Patients to the left of the 
vertical line, and above the 
horizontal line are statistical 
outliers.
Woollams et al. would argue 
that these observations 
should be treated the way 
we normally treat outliers 
when evaluating the fit of a 
model to data…

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Some patients have relatively good exception reading despite low semantic scores.** These cases challenge a perfect one-to-one relationship, but an account of graded association does not predict zero variability. Woollams and colleagues interpret such observations in relation to the full distribution rather than treating each outlier as an automatic refutation.
  - The scientific issue is whether the unusual cases show a stable separate pattern or arise within a noisy overall association.
- **An outlier and a clean dissociation are not automatically the same thing.** The strength and reliability of the apparent exception matter.
  - Points above the horizontal reference line and left of the specified vertical boundary are singled out as unusual. Evaluate their location relative to the broader patient cloud and repeated measurements.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Some patients have relatively good exception reading despite low semantic scores.** These cases challenge a perfect one-to-one relationship, but an account of graded association does not predict zero variability.
  - Woollams and colleagues interpret such observations in relation to the full distribution rather than treating each outlier as an automatic refutation.
- The scientific issue is whether the unusual cases show a stable separate pattern or arise within a noisy overall association.
- Points above the horizontal reference line and left of the specified vertical boundary are singled out as unusual. Evaluate their location relative to the broader patient cloud and repeated measurements.


=====================
## Page 25 · Following semantic dementia over time
Slide image: ling406/module3/assets/reading2/025.webp

### Original slide text
Further, because they were studying 
patients with a progressive
condition (semantic dementia) they 
could observe how exception word 
reading changed as semantic 
abilities declined.
In most cases, when a patient’s 
semantic abilities declined over 
time, her reading ability also 
declined.
Note also the regression to the 
mean with multiple observations. If 
the dissociation between semantics 
and exception word reading were 
due to idiosyncratic outliers, it 
would show just this pattern.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Longitudinal observations track whether semantic and reading abilities change together within a patient.** Because semantic dementia progresses, repeated testing can reveal a trajectory rather than a single unusual score. In most cases, declining semantic ability accompanies declining exception-word reading. Some initially unusual observations move closer to the broader relation on retesting.
  - This strengthens the association while leaving room for variability between individuals.
- **Repeated observations help test whether an apparent dissociation persists.** A one-time exceptional score is less compelling if the patient's later trajectory follows the general relation.
  - Lines connect observations from the same person. Movement toward lower semantic scores and lower reading accuracy shows coupled decline rather than a comparison of unrelated people only.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Longitudinal observations track whether semantic and reading abilities change together within a patient.** Because semantic dementia progresses, repeated testing can reveal a trajectory rather than a single unusual score.
  - In most cases, declining semantic ability accompanies declining exception-word reading. Some initially unusual observations move closer to the broader relation on retesting.
- This strengthens the association while leaving room for variability between individuals.
- Lines connect observations from the same person. Movement toward lower semantic scores and lower reading accuracy shows coupled decline rather than a comparison of unrelated people only.


=====================
## Page 26 · Fitting the same patients with DRC
Slide image: ling406/module3/assets/reading2/026.webp

### Original slide text
DRC simulation of the same data
Coltheart et al. (2009, Psych Review) 
simulated surface dyslexia by 
generating a population of 40,000 
model “patients” varying on two 
parameters:
- integrity of lexical route
- integrity of GPC rules
For each patient in the Woollams et al. 
data, they then selected the run of the 
model that best fit that patient’s data.
In this way, they produce an excellent 
fit to the data.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Coltheart and colleagues generated 40,000 model patients with different lexical-route and GPC impairment levels.** For each real patient, they selected the model run that best matched the observed data. This produced an excellent fit to the patient scores. The selection procedure is part of how that fit was achieved.
  - The fit should be distinguished from predicting each patient's pattern before choosing among many possible parameter combinations.
- **A flexible model can closely reproduce observed data.** Evaluating the explanation also requires asking how the matching simulation was selected.
  - The plotted patient and model lines lie close together. That visual agreement describes goodness of fit, while the large search over simulated patients describes flexibility.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Coltheart and colleagues generated 40,000 model patients with different lexical-route and GPC impairment levels.** For each real patient, they selected the model run that best matched the observed data.
  - This produced an excellent fit to the patient scores. The selection procedure is part of how that fit was achieved.
- The fit should be distinguished from predicting each patient's pattern before choosing among many possible parameter combinations.
- The plotted patient and model lines lie close together. That visual agreement describes goodness of fit, while the large search over simulated patients describes flexibility.


=====================
## Page 27 · Fit and explanatory constraint
Slide image: ling406/module3/assets/reading2/027.webp

### Original slide text
Why would anyone argue that a better fit to the data 
is actually a bad thing in this case?

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **A better fit can be less informative if it relies on much greater flexibility.** Selecting the best match from many parameter combinations can reproduce a dataset without strongly constraining the underlying explanation. The question is not whether close agreement is bad in itself. It is whether the account predicts the relation with principled assumptions or accommodates each case after seeing the outcome.
  - Comparing theories therefore requires attention to both fit and how much freedom produced it.
- **Goodness of fit is only one part of model evaluation.** A model should explain why the pattern occurs, not only contain a setting that resembles it.
  - The contrast is between constrained prediction and flexible post hoc matching. It does not justify rejecting a model merely because its numerical fit is strong.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **A better fit can be less informative if it relies on much greater flexibility.** Selecting the best match from many parameter combinations can reproduce a dataset without strongly constraining the underlying explanation.
  - The question is not whether close agreement is bad in itself. It is whether the account predicts the relation with principled assumptions or accommodates each case after seeing the outcome.
- Comparing theories therefore requires attention to both fit and how much freedom produced it.
- The contrast is between constrained prediction and flexible post hoc matching. It does not justify rejecting a model merely because its numerical fit is strong.


=====================
## Page 28 · Shared targets for competing models
Slide image: ling406/module3/assets/reading2/028.webp

### Original slide text
Comparison of dual-route and “triangle” models.
Both models cover a range of data about reading, including some basic facts:
- decoding is fast and automatic (e.g., pseudoword reading)
- words that diverge from typical spelling-to-sound mappings are harder to read
- this “regularity” or “consistency” effect interacts with word frequency
- pseudoword reading and “exception” or “inconsistent” word reading are dissociable 
in neuropsych patients

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **Dual-route and triangle models address many of the same findings.** Both must explain rapid nonword decoding, exception difficulty, the frequency–regularity interaction and acquired reading dissociations. Agreement on the phenomena does not mean agreement on mechanisms. One account emphasizes specialized routes, while the other emphasizes learning across interacting representational systems.
- **The models compete over explanation, not over whether these basic reading patterns exist.** Shared behavioral success makes their differing assumptions especially important.
  - A useful comparison holds the phenomenon constant and asks what each model changes or computes to produce it.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **Dual-route and triangle models address many of the same findings.** Both must explain rapid nonword decoding, exception difficulty, the frequency–regularity interaction and acquired reading dissociations.
  - Agreement on the phenomena does not mean agreement on mechanisms. One account emphasizes specialized routes, while the other emphasizes learning across interacting representational systems.
- A useful comparison holds the phenomenon constant and asks what each model changes or computes to produce it.


=====================
## Page 29 · Comparing explanations across models
Slide image: ling406/module3/assets/reading2/029.webp

### Original slide text
Comparison of dual-route and “triangle” models.
Triangle
Dual-Route
Phenomenon
Statistical regularities 
learned over many words
Dedicated “grapheme-
phoneme conversion” (GPC) 
rule system
Pseudoword reading and 
regularity effects
More exposure to a word = 
better learning for that 
word
Distinct lexicons for input 
and output, separate from 
GPC rules
Frequency effects
Deficit/damage in 
phonological processing, 
generally
Deficit/damage in the GPC 
route
Phonological dyslexia
Deficit/damage in semantic 
processes, generally
Deficit/damage in the lexical 
route
Surface dyslexia

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **DRC attributes nonword decoding and regularity effects to GPC rules, while the triangle account attributes them to statistical learning.** Word-specific exposure strengthens learned mappings in the triangle account and affects lexical processing in DRC. For phonological dyslexia, DRC emphasizes GPC damage and the triangle account emphasizes broader phonological impairment.
  - For surface dyslexia, DRC emphasizes lexical-route damage and the triangle account emphasizes semantic impairment.
- **The same task pattern receives a different mechanistic explanation in each model.** Keep the observed phenomenon separate from the proposed locus of impairment.
  - Read each table row across the two model columns. The row identifies the finding, while the columns specify competing explanations rather than two names for identical components.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **DRC attributes nonword decoding and regularity effects to GPC rules, while the triangle account attributes them to statistical learning.** Word-specific exposure strengthens learned mappings in the triangle account and affects lexical processing in DRC.
  - For phonological dyslexia, DRC emphasizes GPC damage and the triangle account emphasizes broader phonological impairment.
- For surface dyslexia, DRC emphasizes lexical-route damage and the triangle account emphasizes semantic impairment.
- Read each table row across the two model columns. The row identifies the finding, while the columns specify competing explanations rather than two names for identical components.


=====================
## Page 30 · Dissociations and associations
Slide image: ling406/module3/assets/reading2/030.webp

### Original slide text
Comparison of dual-route and “triangle” models.
Triangle
Dual-Route
Phenomenon
Deficit/damage in 
phonological processing, 
generally
Deficit/damage in the GPC 
route
Phonological dyslexia
Deficit/damage in semantic 
processes, generally
Deficit/damage in the lexical 
route
Surface dyslexia
This is a key contrast: 
Dual route models (generally) are motivated by double-dissociations: 
Pseudowords and exception words can be impaired independently, so they should be 
modeled as independent processes.
Models informed by statistical learning instead reveal associations: Phonology is 
important for learning/using OP generalizations; semantics is important for words 
where OP generalization is ambiguous.

### Existing reviewed notes (PSYC301 v20-style edition), for facts only, do not copy the wording
- **A major contrast is whether the explanation begins with separate reading routes or broader language associations.** Dual-route models use different task impairments to motivate independent processes. The statistical-learning account links phonology to spelling–sound generalization and semantics to words whose pronunciation is poorly supported by that generalization.
  - Both dissociations and associations matter. A theory should explain selective weaknesses and the related abilities that vary with them.
- **Phonological and semantic measures can help identify what lies behind a reading dissociation.** They extend the evidence beyond the reading scores alone.
  - The table's dyslexia rows contrast GPC versus phonological damage and lexical-route versus semantic damage. These are the key theoretical alternatives, not just different diagnostic labels.

### Existing reviewed notes (Original C · Version 3, adds what the visual means), for facts only, do not copy the wording
- **A major contrast is whether the explanation begins with separate reading routes or broader language associations.** Dual-route models use different task impairments to motivate independent processes.
  - The statistical-learning account links phonology to spelling–sound generalization and semantics to words whose pronunciation is poorly supported by that generalization.
- Both dissociations and associations matter. A theory should explain selective weaknesses and the related abilities that vary with them.
- The table's dyslexia rows contrast GPC versus phonological damage and lexical-route versus semantic damage. These are the key theoretical alternatives, not just different diagnostic labels.


=====================
## Page 31 · Reading assignment · EMPTY (title or logistics page, write nothing)
Slide image: ling406/module3/assets/reading2/031.webp

### Original slide text
For next time:
Read Joanisse (2004) “Specific Language Impairments in Children”
http://publish.uwo.ca/~marcj/joanisse-cdps-2004.pdf
