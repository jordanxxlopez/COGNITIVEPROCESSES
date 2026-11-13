# M2 · sentence · Sentence processing

31 pages. Pages marked EMPTY get an empty line (`page|`).


=====================
## Page 1 · Understanding sentences while they unfold · EMPTY (title or logistics page, write nothing)
Slide image: ling406/assets/slides/sentence/01.webp

### Original slide text
Sentence Processing


=====================
## Page 2 · The horse raced past the barn fell
Slide image: ling406/assets/slides/sentence/02.webp

### Original slide text
The horse raced past the barn fell.
What events are described in this sentence?
How could you disambiguate it?
Could this be the sentence that launched a thousand experiments?

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **“The horse raced past the barn fell”** is grammatical English, even though it usually feels broken the first time through. The trouble comes from the way the opening words push the reader toward the wrong structure.
  - Most readers take **raced** as the main verb, so “the horse raced past the barn” seems to be a complete event in which the horse did the racing.
  - When **fell** shows up, that structure has no room for it, and the sentence seems to collapse.
- The sentence actually describes **two events**. Someone raced the horse past the barn, and afterward the horse fell.
  - The intended meaning is **“The horse that was raced past the barn fell.”**
  - In this reading, “raced past the barn” picks out which horse is meant, and **fell** is the main verb telling what happened to it.
- Restoring the missing words **disambiguates** the sentence, as in “the horse that was raced past the barn fell.”
  - “That was” makes the modifying relationship explicit, so raced can no longer be read as the main verb.
  - Understanding a sentence depends on assigning relationships among its words, not only on knowing what each word means.
- It could fairly be called **the sentence that launched a thousand experiments**, since researchers have used it over and over to study how readers build structure as words come in.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **“The horse raced past the barn fell”** is a grammatical English sentence, even though it usually feels broken on first reading. The difficulty comes from how the beginning of the sentence leads the reader to build the wrong structure.
  - Most readers first take **raced** as the main verb, so “the horse raced past the barn” seems to describe a complete event in which the horse did the racing.
  - When **fell** arrives, there is no place left for it in that structure, and the sentence seems to fall apart.
- The sentence describes **two events**. Someone raced the horse past the barn, and the horse then fell.
  - The intended meaning is **“The horse that was raced past the barn fell.”**
  - In that reading, “raced past the barn” describes which horse is being talked about, and **fell** is the main verb that says what happened to it.
  - The horse is the one that fell, so the last word tells us what happened to the horse already named.
- The sentence can be **disambiguated** by putting back the missing words, as in “the horse that was raced past the barn fell.”
  - Adding “that was” makes the modifying relationship explicit, so raced can no longer be taken as the main verb.
  - Sentence comprehension depends on assigning relationships among words as well as recognizing their meanings. Here, one action belongs inside the description of the horse and the other is the main event.
- This sentence could fairly be called **the sentence that launched a thousand experiments**. It has been used again and again to study how readers build sentence structure as words arrive.


=====================
## Page 3 · What a garden path is
Slide image: ling406/assets/slides/sentence/03.webp

### Original slide text
The horse raced past the barn fell.
This sentence is almost as famous as “Colorless green ideas sleep furiously.”
The “garden path” effect.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **“The horse raced past the barn fell”** is nearly as famous as **“Colorless green ideas sleep furiously.”**
  - The colorless green ideas sentence is grammatical but makes no sense.
  - The horse sentence is grammatical and makes sense, but it is very hard to process.
- It is the classic case of the **“garden path” effect**. A **garden path sentence** steers the reader into one reading early on, and later words reveal that reading to be wrong.
  - The name comes from the saying “to lead someone down the garden path,” meaning to mislead.
  - Raced looks like the main verb, and fell then clashes with the structure already built, so the reader must go back and treat “raced past the barn” as “that was raced past the barn.”
  - Garden paths arise because readers build structure word by word, committing to one analysis before the sentence is over.
- One comic strip jokes that nobody would ever say such a sentence, and the reply is that farmers might, if their horses kept falling over.
  - The joke works only because the sentence really is grammatical, even though it sounds wrong.
- **Grammaticality and processing difficulty are different things**.
  - A sentence can have a perfectly acceptable structure and still be very hard to follow as it unfolds.
  - The garden path is about which analysis the reader picks first and how hard that analysis is to replace.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **“The horse raced past the barn fell”** is almost as famous as **“Colorless green ideas sleep furiously.”** Both are well-known example sentences in the study of language.
  - “Colorless green ideas sleep furiously” is grammatical but meaningless.
  - “The horse raced past the barn fell” is grammatical and meaningful, but very hard to process.
- It is the classic example of the **“garden path” effect**. A **garden path sentence** tricks the reader into one interpretation early on and then reveals, as more words arrive, that this interpretation was wrong.
  - The phrase comes from the expression “to lead someone down the garden path,” meaning to mislead them.
  - In this sentence, raced looks like the main verb, and fell then conflicts with the structure already built.
  - Understanding requires going back and reinterpreting “raced past the barn” as meaning “that was raced past the barn.”
- A dinosaur comic strip pokes fun at this sentence. One dinosaur explains garden path sentences and offers the horse example. A second dinosaur insists nobody would ever say such a thing, and the first replies that farmers could say it if horses were constantly falling over, adding that farmers call them nature’s dominoes.
  - The joke rests on the sentence being grammatical even though it sounds wrong.
- **Grammaticality and processing difficulty are different things**.
  - A sentence can have a perfectly acceptable structure and still be very hard to understand as it unfolds.
  - The garden path concerns which analysis is chosen first and how hard it is to replace.
- The garden path effect reveals that the parser commits to an interpretation as words arrive. If it waited until the end of the sentence, it would never be led astray.
  - Readers build structure word by word, choosing one analysis before the sentence is complete.
  - When later words conflict with that choice, the reader has to go back and rebuild the structure.


=====================
## Page 4 · A parser under memory and time constraints
Slide image: ling406/assets/slides/sentence/04.webp

### Original slide text
(these trees, and the dinosaur 
comic are both from the Laguage
Log piece on this: 
http://languagelog.ldc.upenn.ed
u/nll/?p=167 )
Syntactic explanations of the “garden path” effect
If we imagine that there is a 
parser whose job is to construct 
a syntactic tree for the 
sentences we hear/read, we 
have to have some way of 
dealing with the fact that it is 
implemented in a cognitive 
system with:
- limited memory
- time constraints

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **Syntactic explanations** of the garden path effect begin with a **parser**, a mental process that builds a **syntactic tree** for each sentence we hear or read. A syntactic tree records how words group into phrases and how the phrases relate to each other.
- In the correct tree, the subject is a large noun phrase, or **NP**, that contains “the horse” plus a reduced clause meaning “that was raced past the barn.”
  - “That” and “was” are silent in the actual sentence, and the clause also has an empty subject position.
  - Inside the clause, raced takes the prepositional phrase, or **PP**, “past the barn.”
  - The main verb phrase, or **VP**, contains only **fell**.
- In the failed parse, “the horse” is an ordinary NP and “raced past the barn” is the main VP, with raced as the main verb.
  - **Fell** is then left with nowhere to attach, and the parse breaks down.
- Any parser has to work inside a mind with **limited memory** and **time constraints**.
  - Words come quickly, so the parser cannot wait for the end of the sentence before building structure.
  - It can keep only a limited number of structures in play at once.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **Syntactic explanations** of the garden path effect start with the idea of a **parser**. A parser is a mental process whose job is to build a **syntactic tree** for the sentences we hear or read. A syntactic tree represents how words group into phrases and how those phrases relate to one another.
  - The tree for the correct reading of the horse sentence has **S**, for sentence, at the top, splitting into a large **NP**, or noun phrase, and a **VP**, or verb phrase.
  - The large NP contains **D** for determiner, “the,” and **N** for noun, “horse,” plus a reduced clause, marked **S′**, holding “that was raced past the barn.” The words “that” and “was” are silent in the actual sentence, and an empty position marked **e** stands where the missing subject would be.
  - Inside that clause, raced is a verb with a **prepositional phrase**, or **PP**, “past the barn,” and the main **VP** at the far right contains only **fell**.
- The **failed parse** is drawn below the words.
  - In that tree, “the horse” forms an ordinary NP, and “raced past the barn” forms the VP, with raced as the main verb.
  - **Fell** is left dangling with nowhere to attach, and the failed tree ends with the exclamation **“¡ACK!”**
- The trees and the dinosaur comic both come from a Language Log piece on this sentence.
- Any parser has to cope with the fact that it runs inside a cognitive system with **limited memory** and **time constraints**.
  - Words arrive quickly, one after another, and the parser cannot wait until the end of the sentence to start building structure.
  - It also has room to keep track of only a limited number of structures at once. A processing account has to explain how the parser handles these limits when a sentence is ambiguous.


=====================
## Page 5 · Minimal attachment
Slide image: ling406/assets/slides/sentence/05.webp

### Original slide text
Syntactic explanations of the “garden path” effect
You can see that the 
grammatical version of this 
sentence is much more 
complex syntactically than the 
failed parse.
Specifically, it has many more 
nodes.
One strategy you might take to 
save space is to initially prefer 
smaller trees.
This is called “minimal 
attachment”

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- The **grammatical version** of the horse sentence is **much more complex syntactically** than the failed parse, because it has **many more nodes**. A **node** is a point in a syntactic tree that stands for a grammatical grouping, such as an NP, a VP or a sentence.
  - The correct tree needs extra nodes for the embedded clause and for the silent “that” and “was.”
  - The failed parse simply makes “raced past the barn” the main VP, which takes far fewer nodes.
- One space-saving strategy is to **initially prefer smaller trees**, a strategy called **“minimal attachment.”**
  - Under minimal attachment, each new word is fitted into the existing structure with the fewest possible new nodes.
  - Fewer nodes means less structure to build and keep in memory at that moment.
- In the horse sentence, minimal attachment favors **raced as the main verb**, because that reading needs the fewest nodes.
  - The reading where “raced past the barn” modifies horse needs an embedded relative clause, so the parser passes it over at first.
  - The smaller structure lightens the immediate load but leads down the garden path. When fell arrives, it demands the larger structure that was passed over, and the reader must rebuild the tree.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- The **grammatical version** of the horse sentence is **much more complex syntactically** than the failed parse. Specifically, it has **many more nodes**. A **node** is a point in a syntactic tree that represents a grammatical grouping, such as an NP, a VP or an S.
  - The correct tree needs extra nodes for the embedded clause, S′ and S, plus nodes for the silent “that” and “was.”
  - The failed parse simply attaches “raced past the barn” as the main VP, which takes far fewer nodes.
- One strategy that saves space is to **initially prefer smaller trees**. This strategy is called **“minimal attachment.”**
  - Under minimal attachment, the parser attaches each new word into the existing structure using the fewest possible new nodes.
  - Building fewer nodes means less structure to construct and hold in memory at that moment.
- In the horse sentence, minimal attachment favors treating **raced as the main verb**, because that analysis needs the fewest nodes.
  - The alternative, where raced past the barn modifies horse, needs an embedded relative clause.
  - Choosing the smaller structure reduces the immediate processing load, but it creates a garden path. When fell arrives, it requires the larger structure that was not chosen, and the reader has to rebuild the tree.
- Minimal attachment explains why the horse sentence is so hard. The parser favors the analysis with the fewest nodes, which treats raced as the main verb.
  - The correct analysis needs extra nodes for a reduced relative clause, so the parser does not choose it first.
  - When fell arrives, there is no place for it in the simple structure, and the parser has to switch to the larger one.


=====================
## Page 6 · Late closure and dynamite
Slide image: ling406/assets/slides/sentence/06.webp

### Original slide text
Syntactic explanations of the “garden path” effect
Another parsing strategy in this 
framework is “late closure.” The 
idea here is that there is a bias 
to keep the current clause 
“open” as long as possible. 
In this case, “with the 
dynamite” wants to associate 
with the big verb phrase 
starting with “blew open.”   
Frazier, L. (1987) Sentence processing: a tutorial 
review, in Attentionand Performance XII: The 
Psychology of Reading (Coltheart, M., ed.),pp. 
559–586, Erlbaum

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **“Late closure”** is another parsing strategy in this framework. It is a bias to **keep the current clause “open” as long as possible**, so new words get attached to the phrase under construction.
  - Keeping a clause open means adding incoming words to it instead of closing it and starting something new.
- In **“The burglar blew open the safe with the dynamite,”** the phrase **“with the dynamite”** wants to join the big **verb phrase** that begins with **“blew open.”** Frazier (1987) contrasts two structures for the sentence.
  - In the **preferred** structure, the PP attaches to the **VP**. This **verb-phrase attachment** makes the dynamite the **instrument** used to blow open the safe.
  - In the **unpreferred** structure, the PP attaches to the **NP** “the safe.” This **noun-phrase attachment** makes the phrase describe which safe was blown open, the one that had the dynamite.
- Both attachments are grammatical, but they say different things.
  - Late closure keeps the verb phrase open, so the new phrase joins it.
  - Here the preferred VP attachment is also the minimal attachment, since it needs fewer nodes than building an extra NP around “the safe with the dynamite.”
  - For this sentence, the preferred parse happens to be the sensible one, so readers reach the right meaning easily.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- Another parsing strategy in this framework is **“late closure.”** Late closure is a bias to **keep the current clause “open” as long as possible**, so that new words get attached to the phrase currently being built.
  - Keeping a clause open means the parser keeps adding incoming material to it rather than closing it off and starting a new structure.
- In **“The burglar blew open the safe with the dynamite,”** the phrase **“with the dynamite”** wants to associate with the big **verb phrase** starting with **“blew open.”** Frazier (1987) gives two trees for this sentence.
  - In the **preferred** tree, the PP “with the dynamite” attaches to the **VP**. This is **verb-phrase attachment**, and it means the dynamite is the **instrument** the burglar used to blow open the safe.
  - In the **unpreferred** tree, the PP attaches to the **NP** “the safe.” This is **noun-phrase attachment**, and it means the phrase describes which safe was blown open, namely the safe that had the dynamite.
- Both attachments are grammatical, but they express different relationships.
  - The preferred VP attachment is also the minimal attachment here, because it needs fewer nodes than building an extra NP around “the safe with the dynamite.”
  - The parser’s preference makes the instrument reading easier to reach first, and for this sentence the preferred reading is also the sensible one.
- Late closure and minimal attachment work together in the burglar sentence. Both strategies favor attaching with the dynamite to the verb phrase.
  - Late closure keeps the verb phrase open, so the incoming phrase joins it.
  - Minimal attachment prefers this attachment because it needs fewer nodes.
- For this sentence, the preferred parse is also the sensible one, so readers reach the right meaning without any difficulty.


=====================
## Page 7 · Why jewels create a processing cost
Slide image: ling406/assets/slides/sentence/07.webp

### Original slide text
Syntactic explanations of the “garden path” effect
We can see late closure at work 
if we consider a sentence that 
requires the “unpreferred” 
parse to be sensible:
“The burglar blew open the 
safe with the jewels.”
In careful tests of reading time 
and eye movements, we can 
see that people are slower to 
read sentences where the 
sensible reading requires the 
unpreferred parse. 
That is, you momentarily 
entertain the idea that the 
jewels were used to blow open 
the safe, and then have to 
retrace your steps.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- Late closure shows its effect in a sentence that **requires the “unpreferred” parse to be sensible**, such as **“The burglar blew open the safe with the jewels.”**
  - Jewels make a poor tool for blowing open a safe.
  - The sensible meaning is that the burglar blew open **the safe that contained the jewels**, which requires attaching “with the jewels” to the noun phrase “the safe,” the unpreferred NP attachment.
- **Careful tests of reading time and eye movements** reveal that people are **slower to read sentences where the sensible reading requires the unpreferred parse**.
  - Reading time measures how long readers spend on each part of the sentence.
  - Eye movement records track where readers look and when they jump back to reread.
  - The extra time shows up right where the parse has to change.
- Readers **momentarily entertain the idea that the jewels were used to blow open the safe**, and then must **retrace their steps**.
  - Following its usual preference, the parser first attaches the phrase to the verb phrase.
  - The meaning of jewels clashes with the instrument reading, so the parser moves the attachment to the noun phrase.
  - The final meaning is easy, but getting there carries a measurable processing cost.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- Late closure can be seen at work in a sentence that **requires the “unpreferred” parse to be sensible**, such as **“The burglar blew open the safe with the jewels.”**
  - Jewels are an implausible tool for blowing open a safe.
  - The sensible meaning is that the burglar blew open **the safe that contained the jewels**. That meaning requires attaching “with the jewels” to the noun phrase “the safe,” which is the unpreferred NP attachment.
- In **careful tests of reading time and eye movements**, people are **slower to read sentences where the sensible reading requires the unpreferred parse**.
  - Reading time measures how long readers spend on each part of a sentence.
  - Eye movement recordings show where readers look and when they jump back to reread earlier words.
  - The extra time appears at the point where the parse has to change.
- Readers **momentarily entertain the idea that the jewels were used to blow open the safe**, and then have to **retrace their steps**.
  - The parser first attaches the phrase to the verb phrase, following its usual preference.
  - The meaning of jewels conflicts with the instrument reading, so the parser revises the attachment to the noun phrase.
  - The final meaning is easy to understand, but the route to it carries a processing cost.
- The jewels sentence reveals the cost of the preferred parse when it is wrong. The parser first attaches with the jewels to the verb phrase, just as it did for the dynamite.
  - The meaning of jewels conflicts with the role of an instrument for blowing open a safe.
  - The reader then reattaches the phrase to the noun phrase, the safe, and this repair takes measurable time.


=====================
## Page 8 · An autonomous structural parser
Slide image: ling406/assets/slides/sentence/08.webp

### Original slide text
Syntactic explanations of the “garden path” effect
The explanation rests on the idea of a parser that deals exclusively with the abstract 
syntactic structure of the sentence (remember the “lumber mill” example from speech 
perception).
The parser has its own operating characteristics. It wants to make the simplest tree possible 
(minimal attachment) and it accomplishes this, in part, by leaving clauses open as long as 
possible (late closure).
This is one way of dealing with ambiguity very efficiently – ignore it until it becomes a 
problem!

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- This syntactic explanation depends on a **parser that deals exclusively with the abstract syntactic structure** of the sentence. It parallels the **“lumber mill”** model of thresholded processing in speech perception.
  - In a lumber mill, each stage works on its own material and hands a finished product to the next stage.
  - In the same way, the parser builds structure from grammatical categories alone, without checking meaning or context, and meaning is computed afterward from the finished structure.
- The parser has **its own operating characteristics**.
  - It aims for **the simplest tree possible**, which is **minimal attachment**.
  - It does this partly by **leaving clauses open as long as possible**, which is **late closure**.
  - Both preferences limit how much structure has to be built and held at once.
- This handles ambiguity **very efficiently**, by choosing to **ignore ambiguity until it becomes a problem**.
  - The parser commits to one likely structure and builds only that one, and most of the time the first choice is right.
  - When a later word fails to fit, the structure must be revised. That revision causes garden path difficulty, which is the price of an efficient strategy.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- This syntactic explanation rests on the idea of a **parser that deals exclusively with the abstract syntactic structure** of the sentence. This parallels the **“lumber mill”** model of thresholded processing in speech perception.
  - In the lumber mill picture, each stage works on its own kind of input and hands a finished product to the next stage.
  - Here, the parser builds a syntactic structure using only grammatical categories, without consulting meaning or context. Meaning is worked out afterward from the finished structure.
- The parser has **its own operating characteristics**.
  - It wants to make **the simplest tree possible**, which is **minimal attachment**.
  - It accomplishes this partly by **leaving clauses open as long as possible**, which is **late closure**.
  - These preferences limit how much structure must be built and held in memory at once.
- This is one way of dealing with ambiguity **very efficiently**. The strategy is to **ignore ambiguity until it becomes a problem**.
  - The parser commits to one likely structure and builds only that one.
  - Most of the time the first choice works, and no extra effort is needed.
  - When a later word does not fit, the structure has to be revised, and that revision is the source of garden path difficulty.
- The autonomous parser account explains garden paths as the price of efficiency. Building only one structure at a time saves memory and effort, and most of the time the first choice is right.
  - When the first choice is wrong, the reader pays a small cost to repair it.
  - Ignoring ambiguity until it matters is a good strategy on average.


=====================
## Page 9 · Reduced relatives are not always difficult
Slide image: ling406/assets/slides/sentence/09.webp

### Original slide text
Some problems with a purely syntactic explanation
Syntactically “difficult” sentences aren’t always difficult to parse.
In all of these sentences, 
the verbs in ALL CAPS 
introduce a “reduced 
relative” clause, as in “the 
horse raced past the barn 
fell.”
But these are not 
impossibly difficult 
sentences.
The alternative argument 
advanced by MacDonald, 
Perlmutter & Seidenberg 
(1994), is that semantic 
factors and statistical 
regularities interact with 
“parsing” from very early 
on.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- A **purely syntactic explanation** runs into **problems**, and one is that **syntactically “difficult” sentences are not always difficult to parse**.
  - Many published sentences contain **reduced relative clauses**, relative clauses with “that was” or “that were” left out, as in “the horse raced past the barn fell.”
- Examples come straight from research articles, with the verb that opens each reduced relative written in capitals.
  - “Thus, a noun phrase **FOLLOWED** by a **MORPHOLOGICALLY AMBIGUOUS VERB** … will be temporarily ambiguous,” from Trueswell, Tanenhaus and Garnsey (1994).
  - “Referential information **PROVIDED** by the discourse is of no help,” from Britt, Perfetti, Garrod and Rayner (1992).
  - “Recent research **REPORTED** by **FERREIRA AND CLIFTON** (1986) has demonstrated that syntactic processing is quite independent and that the initial syntactic analysis **ASSIGNED** to a sentence is little influenced by the semantic information **ALREADY ANALYZED**,” from Frazier and Rayner (1987).
  - “The pattern of results **OBTAINED** with global reading times is reflected by differences **LOCATED** on the critical disambiguating phrase,” from Altmann and Steedman (1988).
- Every capitalized verb begins a reduced relative with the same structure as the horse sentence. **But these are not impossibly difficult sentences**, and readers follow them easily without any garden path.
  - In “recent research reported by Ferreira and Clifton,” reported describes research that someone reported.
- **MacDonald, Perlmutter and Seidenberg (1994)** argue instead that **semantic factors and statistical regularities interact with parsing from very early on**.
  - Semantic factors are about meaning, and statistical regularities are patterns in how often words occur in particular structures.
  - Particular words and their familiar uses can favor a reduced relative reading right from the start.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- There are **problems with a purely syntactic explanation**. One is that **syntactically “difficult” sentences are not always difficult to parse**.
  - A table of examples gives sentences containing **reduced relative clauses**, with the verb that introduces each reduced relative written in capital letters.
  - A **reduced relative clause** is a relative clause with the words “that was” or “that were” left out, as in “the horse raced past the barn fell.”
- The examples come from published research articles.
  - “Thus, a noun phrase **FOLLOWED** by a **MORPHOLOGICALLY AMBIGUOUS VERB** … will be temporarily ambiguous,” from Trueswell, Tanenhaus and Garnsey (1994).
  - “Referential information **PROVIDED** by the discourse is of no help,” from Britt, Perfetti, Garrod and Rayner (1992).
  - “Recent research **REPORTED** by **FERREIRA AND CLIFTON** (1986) has demonstrated that syntactic processing is quite independent and that the initial syntactic analysis **ASSIGNED** to a sentence is little influenced by the semantic information **ALREADY ANALYZED**,” from Frazier and Rayner (1987).
  - “The pattern of results **OBTAINED** with global reading times is reflected by differences **LOCATED** on the critical disambiguating phrase,” from Altmann and Steedman (1988).
- In every case, the capitalized verb begins a reduced relative with exactly the structure of the horse sentence. **But these are not impossibly difficult sentences**. Readers understand them easily, with no feeling of being led down a garden path.
  - In “recent research reported by Ferreira and Clifton,” reported describes research that someone reported. Research is not the one doing the reporting.
- The alternative argument, from **MacDonald, Perlmutter and Seidenberg (1994)**, is that **semantic factors and statistical regularities interact with parsing from very early on**.
  - Semantic factors concern meaning.
  - Statistical regularities are patterns of how often words appear in particular structures.
  - Under this view, particular words and their familiar uses can support a reduced relative reading from the start, which makes the sentence easy to read.


=====================
## Page 10 · Why the example table matters
Slide image: ling406/assets/slides/sentence/10.webp

### Original slide text
Some problems with a purely syntactic explanation
Syntactically “difficult” sentences aren’t always difficult to parse.
This is a wonderfully 
passive-aggressive table, 
BTW:
Many of the examples are 
drawn from papers that 
use the difficulty of parsing 
reduced relatives as 
evidence for an 
autonomous parser.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- The collection of reduced relatives is **wonderfully passive-aggressive**, because **many of its examples are drawn from papers that use the difficulty of parsing reduced relatives as evidence for an autonomous parser**. An **autonomous parser** builds syntactic structure with no help from meaning or context.
  - Those authors argued that reduced relatives are hard to process.
  - Yet they wrote reduced relatives in their own articles, and readers understood them without trouble.
- More examples make the same point.
  - In “a noun phrase **FOLLOWED** by a morphologically ambiguous verb,” followed modifies noun phrase.
  - In “the initial syntactic analysis **ASSIGNED** to a sentence,” assigned modifies analysis.
  - In “differences **LOCATED** on the critical disambiguating phrase,” located modifies differences.
  - “A person **PRESENTED** with the evidence **EXAMINED** by the lawyer may interpret the evidence as a theme, not an agent, because examined requires an animate agent,” from Ferreira and Clifton (1986). Presented modifies person, and examined modifies evidence.
- These were **not the only reduced relatives** in those articles.
  - They turned up at about **one per journal page** across the sample.
  - Reduced relatives are therefore routine in scientific writing, and in a supportive context a formally complex structure is easy to grasp.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- The table of reduced relatives is a **wonderfully passive-aggressive** table. **Many of its examples are drawn from papers that use the difficulty of parsing reduced relatives as evidence for an autonomous parser**. An **autonomous parser** is one that builds syntactic structure without help from meaning or context.
  - The authors of those papers argued that reduced relatives are hard to process.
  - Yet they wrote reduced relatives in their own articles, and readers understood them easily.
- More examples from the table make the same point.
  - In “a noun phrase **FOLLOWED** by a morphologically ambiguous verb,” followed modifies noun phrase.
  - In “the initial syntactic analysis **ASSIGNED** to a sentence,” assigned modifies analysis.
  - In “differences **LOCATED** on the critical disambiguating phrase,” located modifies differences.
  - “A person **PRESENTED** with the evidence **EXAMINED** by the lawyer may interpret the evidence as a theme, not an agent, because examined requires an animate agent,” from Ferreira and Clifton (1986). Here presented modifies person, and examined modifies evidence.
- A note on the table states that the examples cited were **not the only reduced relatives** in those articles.
  - The rate of reduced relative use was about **one per journal page** in this sample of articles.
  - Reduced relatives are therefore common in ordinary scientific writing.
- Understanding each example requires attaching each modifier to the correct noun, and readers do this easily in context.
  - In a supportive context, a formally complex structure is easy to understand.


=====================
## Page 11 · Research reported and the arrested burglar
Slide image: ling406/assets/slides/sentence/11.webp

### Original slide text
The argument goes that, when we see “Recent research reported by…”
- the fact that “research” is an inanimate object, and unlikely to be the subject of a verb 
like “report” (semantics)
-The fact that “reported” occurs frequently in reduced relatives (lexical statistics) 
- the fact that “reported” occurs very frequently in reduced relatives in scientific papers, 
especially when following the word “research” (lexical statistics and “world knowledge”)
…and many other factors interact with the syntax of the sentence very early on.
Consider:
The burglar arrested in the parking lot was charged today.
The policeman arrested in the parking lot was charged today. 
Why?

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- When we read **“Recent research reported by…,”** several factors beyond syntax are at work.
  - **Semantics**. Research is **inanimate**, not a living thing, so it is an unlikely **subject** for a verb like **report**. Treating research as something that was reported fits the word meanings.
  - **Lexical statistics**. **“Reported” occurs frequently in reduced relatives**, and lexical statistics are learned patterns of how often particular words appear in particular structures.
  - **Lexical statistics and “world knowledge.”** “Reported” is especially common in reduced relatives **in scientific papers, especially when following the word “research,”** and world knowledge here means knowing how people actually write in that setting.
- These and **many other factors interact with the syntax of the sentence very early on**. They act from the first moments of reading and help decide which structure gets chosen at all.
- A sentence pair makes the role of meaning clear.
  - **“The burglar arrested in the parking lot was charged today.”** Burglars tend to be arrested, so arrested is easily read as starting a reduced relative about the burglar.
  - **“The policeman arrested in the parking lot was charged today.”** Policemen tend to do the arresting, so arrested is first read as the main verb, and “was charged” sets off a garden path.
  - The two sentences share the same grammar. The difference in difficulty comes from what we know about burglars and policemen.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- The argument is that, when we read **“Recent research reported by…,”** several factors besides syntax come into play.
  - **Semantics**. Research is an **inanimate** object, meaning it is not a living thing. It is unlikely to be the **subject** of a verb like **report**, because research cannot report anything. Taking research as something that was reported fits the meanings of the words.
  - **Lexical statistics**. **“Reported” occurs frequently in reduced relatives**. Lexical statistics are learned patterns of how often particular words appear in particular structures.
  - **Lexical statistics and “world knowledge.”** “Reported” occurs very frequently in reduced relatives **in scientific papers, especially when following the word “research.”** World knowledge here means knowledge of how people actually write in this setting.
- These and **many other factors interact with the syntax of the sentence very early on**.
  - They act from the first moments of reading.
  - They help decide which structure is chosen in the first place.
- A pair of sentences makes the role of meaning clear.
  - **“The burglar arrested in the parking lot was charged today.”** Burglars are likely to be arrested, so it is easy to take arrested as part of a reduced relative describing the burglar.
  - **“The policeman arrested in the parking lot was charged today.”** Policemen are likely to be the ones doing the arresting, so arrested is first taken as the main verb, and “was charged” causes a garden path.
  - The grammar of the two sentences is identical. The difference in difficulty comes from what we know about burglars and policemen.


=====================
## Page 12 · Spivey · an apple, a towel, and a box
Slide image: ling406/assets/slides/sentence/12.webp

### Original slide text
“World knowledge” can be very local
Spivey et al. (1995) gave people a visual world with 
a pencil, a box, a towel and an apple on a towel.
People were then instructed to “put the apple on 
the towel in the box.”
You can imagine that with minimal attachment, 
“the towel” would temporarily seem like it should 
be the end of the clause “put the apple on the 
towel.” 
And lo, people do seem to look at the towel while 
planning their movements, as though they are 
considering it as a target, before planning a 
movement to the box.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **“World knowledge” can be very local**, coming from the visual scene right in front of us as well as from general knowledge. **Spivey and colleagues (1995)** tested this with a visual world task.
  - Participants saw real objects, **a pencil, a box, an empty towel, and an apple sitting on a towel**.
  - They heard **“Put the apple on the towel in the box”** and carried it out while their eyes were tracked.
- With **minimal attachment**, “the towel” would briefly seem to end the clause **“put the apple on the towel.”**
  - In that reading, “on the towel” names the **destination** for the apple.
  - In the intended reading, “on the towel” says **which apple** to move, the one already on a towel, and **“in the box”** is the destination.
- People **do seem to look at the empty towel while planning their movements**, as if treating it as a target, before they plan a movement to the box.
  - With one apple in view and the ambiguous instruction, a typical sequence runs from the apple to the empty towel and then to the box.
  - With the unambiguous instruction **“Put the apple that’s on the towel in the box,”** the eyes go from the apple straight to the box.
- The listener recognizes every word correctly. The error lies in taking the location phrase as the destination, which briefly changes the planned action.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **“World knowledge” can be very local**. It can come from the immediate visual situation as well as from general knowledge. **Spivey and colleagues (1995)** tested this in a visual world task.
  - Participants saw real objects, namely **a pencil, a box, an empty towel, and an apple sitting on a towel**.
  - They heard the instruction **“Put the apple on the towel in the box”** and carried it out while their eye movements were recorded.
- With **minimal attachment**, “the towel” would temporarily seem like the end of the clause **“put the apple on the towel.”**
  - On that reading, “on the towel” names the **destination**, the place the apple should go.
  - In the intended reading, “on the towel” describes **which apple** to move, the one already on a towel, and **“in the box”** is the destination.
- People **do seem to look at the empty towel while planning their movements**, as though they are considering it as a target, before planning a movement to the box.
  - The diagram of a typical sequence of eye movements, in the **one-referent context** with one apple, marks each look with a letter. **A** is a look to the apple, **B** is a look to the empty towel, the incorrect destination, and **C** is a look to the box.
  - For the **ambiguous** instruction, the timeline puts A near 1,000 milliseconds, B shortly after, and C near 2,000 milliseconds.
  - For the **unambiguous** instruction, **“Put the apple that’s on the towel in the box,”** the looks go from the apple, marked **A′**, straight to the box, marked **B′**, with no look to the empty towel.
- The listener recognizes every word correctly. The error comes from treating the location phrase as the destination, which briefly changes the planned action.


=====================
## Page 13 · Two-referent context and initial attachment
Slide image: ling406/assets/slides/sentence/13.webp

### Original slide text
“World knowledge” can be very local

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- In a **two-referent context**, the display holds **two apples**, one on a towel and one elsewhere, along with the empty towel and the box.
  - “The apple” by itself no longer says which apple to move.
  - **“On the towel”** now does useful work, since it picks out one of the two apples.
- Here participants usually look at the apple on the towel and then at the box.
  - Looks to the empty towel become much less common.
  - **The sequence and the timing of eye movements**, measured against the nouns in the speech, **did not differ** between the ambiguous and the unambiguous instructions.
- In this setting, the ambiguous instruction is handled exactly like the explicit one with “that’s on the towel.”
  - With two apples in view, the listener needs to know which apple, so a phrase that singles one out is expected.
  - Listeners take “on the towel” as describing the apple from the start, and the destination reading never takes hold. The same sentence receives a different grammatical analysis because the visual context differs.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- A **two-referent context** changes the display so that it contains **two apples**. One apple sits on a towel, and the other sits elsewhere in the display. The empty towel and the box are still present.
  - Now “the apple” alone does not say which apple to move.
  - The phrase **“on the towel”** becomes useful, because it picks out one apple from the two.
- The diagram gives the typical sequence of eye movements in the two-referent context.
  - Participants look first at the apple on the towel, marked **A**, and then at the box, marked **C**.
  - Looks to the empty towel, marked **B**, are much less common.
  - The note under the figure states that **the sequence and the timing of eye movements**, measured relative to the nouns in the speech stream, **did not differ** for the ambiguous and the unambiguous instructions.
- In this setting, the ambiguous instruction is processed just like the explicit instruction with “that’s on the towel.”
  - The visual context makes the modifier reading the natural one from the start.
  - The usefulness of the phrase depends on the objects available, so the visual context shapes the grammatical interpretation of the same sentence.
- The two-apple display gives the phrase on the towel a clear job before the listener even reaches in the box. With two apples present, the listener needs to know which apple, so a phrase that picks one out is expected.
  - Listeners treat on the towel as a description of the apple from the start.
  - The destination interpretation never takes hold, so looks to the empty towel are rare.


=====================
## Page 14 · Adding a second apple
Slide image: ling406/assets/slides/sentence/14.webp

### Original slide text
“World knowledge” can be very local
Now consider what happens when there are two apples
in the display.
All of a sudden it is felicitous to provide more 
information regarding which apple you’re talking about.
So people don’t look at the towel as much.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- Once **two apples** are in view, it suddenly becomes **felicitous**, meaning natural and appropriate, to add information about **which apple** the speaker means.
  - With one apple, there is no reason to say which apple, so “on the towel” looks like extra information and is easily heard as a destination.
  - With two apples, “on the towel” has a clear purpose, picking out the right apple.
- As a result, **people do not look at the empty towel as much**.
  - With one apple, the ambiguous instruction drew looks to the empty towel on about **55%** of trials.
  - With two apples, the same instruction drew such looks on only about **17%** of trials, close to the level for the unambiguous instruction.
- The instruction’s words were the same in both displays, so the visual context alone changed how often listeners were misled.
  - This is an effect of **referential context**, the set of objects a phrase could refer to.
  - Referential context affects which grammatical relationship listeners assign while they are still hearing the sentence.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- With **two apples in the display**, it suddenly becomes **felicitous** to provide more information about **which apple** the speaker means. **Felicitous** means appropriate and natural in the situation.
  - With only one apple, there is no need to say which apple, so “on the towel” seems like extra information and is easily taken as a destination.
  - With two apples, “on the towel” has a clear job, which is to identify the right apple.
- So **people do not look at the empty towel as much**. The bar graph plots the **proportion of trials with eye movements to the incorrect destination**, the empty towel, for ambiguous and unambiguous instructions in each context.
  - In the **one-referent context**, ambiguous instructions led to looks at the incorrect destination on about **55%** of trials. Unambiguous instructions led to almost none.
  - In the **two-referent context**, ambiguous instructions led to such looks on only about **17%** of trials, close to the roughly **12%** for unambiguous instructions.
- The large ambiguity cost appears only when the display contains one apple.
  - This is an effect of **referential context**, meaning the set of objects that a phrase could refer to.
  - Referential context influences which grammatical relationship listeners assign while the sentence is still being heard.
- The bar graph puts numbers on the context effect. With one apple, about 55% of ambiguous trials included a look to the incorrect destination. With two apples, the figure dropped to about 17%, close to the 12% for unambiguous instructions.
  - The words of the instruction were identical in both contexts.
  - The visual context alone changed how often listeners were misled.


=====================
## Page 15 · What the context comparison shows
Slide image: ling406/assets/slides/sentence/15.webp

### Original slide text
“World knowledge” can be very local
This is a big problem for purely syntactic accounts.
Different parses of the same sentence seem to be 
favored under different semantic/pragmatic conditions, 
and this effect happens very early.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- For **purely syntactic accounts**, the Spivey results are **a big problem**. **Different parses of the same sentence are favored under different semantic and pragmatic conditions, and this effect happens very early**.
  - **Semantic** conditions have to do with meaning.
  - **Pragmatic** conditions have to do with how language is used in a situation, such as whether a speaker must specify which object is meant.
- One ambiguous sentence misleads listeners often when one apple is present and rarely when two are present.
  - Its words never change.
  - Only the scene changes, and the scene alters the parse the listener adopts first.
- The difference appears in **eye movements during the sentence**, before the action begins, so it captures the parse while it is being built.
  - If context only repaired the parse afterward, listeners in both displays should first look at the empty towel.
  - Because those looks drop with two apples, context must have shaped the first parse, which a parser that always starts with the same structure cannot predict.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- The Spivey results are **a big problem for purely syntactic accounts**. **Different parses of the same sentence are favored under different semantic and pragmatic conditions, and this effect happens very early**.
  - **Semantic** conditions concern meaning.
  - **Pragmatic** conditions concern how language is used in a particular situation, such as whether a speaker needs to specify which object they mean.
- In the bar graph of looks to the incorrect destination, the same ambiguous sentence produces looks to the empty towel on about 55% of trials with one apple, but only about 17% with two apples.
  - The words are identical in both conditions.
  - Only the visual situation changes, and it changes the parse the listener first adopts.
- The difference shows up in **eye movements during the sentence**, before the action is carried out.
  - Context therefore affects the initial parse.
  - The garden path nearly disappears with two apples, which a parser that always picks the same first structure would fail to predict.
- The early timing of the context effect is the key finding. Eye movements happen while the sentence is still being heard, so they capture the parse as it is being built.
  - If context only corrected the parse afterward, listeners in both contexts should first look at the empty towel.
  - The reduction in those looks with two apples means context shaped the first parse.


=====================
## Page 16 · Mouse trajectories and competing actions
Slide image: ling406/assets/slides/sentence/16.webp

### Original slide text
More recently, researchers have begun 
using data from mouse movements to look 
at these questions.
It’s not just eye-movements, but the actual 
execution of arm movements that can be 
influenced by syntactic ambiguity and its 
interaction with the visually-defined 
context.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **Mouse movements** have more recently been used to study these questions. **Farmer and colleagues (2007)** tracked the path of the computer mouse while participants carried out spoken instructions in a version of the apple and towel display.
  - It is not just eye movements but **the actual execution of arm movements** that can be influenced by **syntactic ambiguity** and its **interaction with the visually defined context**.
  - Mouse tracking records the whole path of the hand, so a competing interpretation can pull the movement toward another location before the hand reaches its target.
- With one apple, the hand moved from the apple toward the box, but on ambiguous instructions its path **curved toward the empty towel**.
  - The bend was largest in the middle of the movement.
  - The hand still ended at the correct place.
- With two apples, the paths for ambiguous and unambiguous instructions were nearly identical. The second apple makes the location phrase useful for picking out an apple, so it is no longer taken as a destination.
- Researchers also measured the **Euclidean distance between the ambiguous and unambiguous paths** at each moment. Euclidean distance is the straight-line distance between two points.
  - With one apple, the two paths grew far apart before coming back together.
  - With two apples, they separated less and came together sooner.
  - Comprehension and action planning interact while both are underway. A competing interpretation bends the path of the hand even when the movement ends correctly.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **Mouse movements** have more recently been used to study these questions. **Farmer and colleagues (2007)** tracked the path of the computer mouse while participants carried out spoken instructions in a version of the apple and towel display.
  - It is not just eye movements but **the actual execution of arm movements** that can be influenced by **syntactic ambiguity** and its **interaction with the visually defined context**.
  - Mouse tracking records the full path of the hand as the instruction is processed, so a competing interpretation can pull the movement toward another location before the hand reaches the target.
- In the **one-referent context**, the plotted trajectories move from the apple at the top left toward the box at the bottom right.
  - The **ambiguous trajectory** curves slightly toward the empty towel at the top right, compared with the **unambiguous trajectory**.
  - Points along each path mark the 30th, 40th, 50th and 60th time steps, and the two paths separate most in the middle of the movement.
- In the **two-referent context**, the ambiguous and unambiguous trajectories lie almost on top of each other.
  - The second apple makes the location phrase useful for identification, so it is no longer taken as a destination.
- A separate graph plots the **Euclidean distance between the ambiguous and unambiguous trajectories** over normalized time. Euclidean distance is the straight-line distance between the two paths at each moment.
  - In the one-referent context, the distance rises to a peak of about 200 pixels around 40% of the way through the movement.
  - In the two-referent context, it peaks lower, at about 140 pixels, and earlier, around 30%, and then drops off.
  - Comprehension and action planning interact while both are underway. The competing interpretation bends the path of the hand even when the movement ends at the correct place.


=====================
## Page 17 · Brain responses to structural expectations · EMPTY (title or logistics page, write nothing)
Slide image: ling406/assets/slides/sentence/17.webp

### Original slide text
Psychophysiological investigations of syntax.


=====================
## Page 18 · The · starting the incremental sentence
Slide image: ling406/assets/slides/sentence/18.webp

### Original slide text
The

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **The** is a **determiner**, a word that opens a **noun phrase**. Once the parser meets “the,” it expects a noun soon, perhaps with an adjective or another modifier first.
  - “The” names nothing on its own.
  - It restricts which kinds of words can come next, so the parser can anticipate the shape of the phrase.
- The expectation concerns a **grammatical category**, not one particular word.
  - Many nouns could follow, such as pizza, dog or book.
  - An adjective could also come first, as in “the hot pizza.”
  - The parser predicts the form of the phrase while its meaning is still open. Words that fit the prediction go through smoothly, and words that break it cause trouble.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **The** is a **determiner**, a word that introduces a **noun phrase**. When the parser encounters “the,” it expects a noun to follow, possibly with an adjective or other modifier in between.
  - “The” does not name anything by itself.
  - It limits which kinds of words can come next, which helps the parser anticipate the shape of the phrase.
- This expectation is about a **grammatical category**, not about a particular word.
  - Many different nouns could follow, such as pizza, dog or book.
  - An adjective could also come first, as in “the hot pizza.” The parser predicts the form of the phrase while its specific meaning is still open.
- Processing a sentence one word at a time reveals how each word sets expectations for the next. After the, the parser expects a noun phrase to continue.
  - The expectation narrows which kinds of words can come next.
  - Words that fit the expectation are processed smoothly, while words that break it cause difficulty.


=====================
## Page 19 · Pizza · establishing the noun phrase
Slide image: ling406/assets/slides/sentence/19.webp

### Original slide text
pizza

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **Pizza** is a **noun** that completes the noun phrase opened by “the.” It is the **head of the noun phrase**, the central word that the rest of the phrase is built around.
  - “The” and “pizza” together form “the pizza,” which can now serve as the subject of the sentence.
  - With a full noun phrase in place, the parser expects a verb or verb phrase saying what the pizza did or what happened to it.
- Recognizing the word delivers two kinds of information.
  - Its **category**, noun, tells the parser how it can combine with other words.
  - Its **meaning**, a kind of food, raises expectations about likely events, such as being eaten or baked.
  - Grammatical expectations and meaning-based expectations both shape how the next words are handled.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **Pizza** is a **noun**, and it completes the noun phrase begun by “the.” It can serve as the **head of the noun phrase**, the central word around which the rest of the phrase is organized.
  - “The” combines with “pizza” to form “the pizza,” which can now act as the subject of the sentence.
  - At this point the parser has a complete noun phrase and expects a verb phrase to follow.
- Recognizing the word makes two kinds of information available.
  - Its **category**, noun, tells the parser how it can combine with other words.
  - Its **meaning** identifies a kind of food, which is what the phrase refers to. Word recognition therefore supplies more than a sound or a spelling to sentence processing.
- After the pizza, the noun phrase is complete and can serve as the subject of the sentence. The parser now expects a verb or verb phrase to tell what the pizza did or what happened to it.
  - The meaning of pizza also sets up expectations about plausible events, such as being eaten or baked.
  - Both grammatical and meaning-based expectations guide the processing of the next words.


=====================
## Page 20 · Was · opening a new structural expectation
Slide image: ling406/assets/slides/sentence/20.webp

### Original slide text
was

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **Was** is a past-tense form of **be**. It can serve as an **auxiliary**, a helping verb that joins another verb to mark grammatical information such as tense or voice.
  - In “the pizza was eaten,” was helps build a **passive** with the participle eaten.
  - In “the pizza was in the oven,” was links the subject to a phrase giving a location.
- Once “was” arrives, the sentence could go several ways, describing where the pizza was, what it was like or what was done to it.
  - A location would come next with a preposition, and a passive would come next with a participle such as eaten.
  - The parser must keep the growing structure available while more words arrive, because the role of was depends partly on what follows.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **Was** is a past-tense form of the verb **be**. It can act as an **auxiliary**, which is a helping verb that combines with another verb to express grammatical information such as tense or voice.
  - In “the pizza was eaten,” was helps form a **passive** construction with the participle eaten.
  - In “the pizza was in the oven,” was links the subject to a location phrase.
- When “was” arrives, the sentence could continue in several ways.
  - A location phrase, an adjective or a participle could all follow.
  - The parser has to keep the developing structure available while more words arrive. The grammatical role of was depends partly on what comes next.
- Was can introduce several different structures, so it keeps several possibilities open. The sentence could describe where the pizza was, what it was like or what was done to it.
  - A location phrase would follow with a preposition.
  - A passive construction would follow with a participle such as eaten.


=====================
## Page 21 · In · introducing a prepositional phrase
Slide image: ling406/assets/slides/sentence/21.webp

### Original slide text
in

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **In** is a **preposition**, a word that expresses a relationship such as location or containment, and it opens a **prepositional phrase**.
  - “In” does not name the location itself.
  - It creates the expectation of a noun phrase that supplies the location, as in “in the oven” or “in the box.”
- Coming after “the pizza was,” the word “in” narrows the possible structures, and the sentence now heads toward saying where the pizza was.
  - The parser expects a noun phrase to finish the prepositional phrase.
  - That expectation is grammatical, so the next word must be able to begin a noun phrase, such as “the,” “an” or a noun.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **In** is a **preposition**, a word that expresses a relationship such as location or containment. It begins a **prepositional phrase**.
  - “In” does not name the location by itself.
  - It sets up the expectation of a noun phrase that will supply the location, as in “in the oven” or “in the box.”
- After “the pizza was,” the arrival of “in” narrows the possible structures.
  - The sentence is now heading toward a statement about where the pizza was.
  - The parser expects a noun phrase to complete the prepositional phrase, and understanding the phrase requires combining the preposition with that noun phrase.
- In narrows the structure toward a location. After in, the parser expects a noun phrase that names a place or container.
  - This expectation is grammatical, so the next word must be able to start a noun phrase.
  - Words like the, an or a noun would fit the expectation.


=====================
## Page 22 · The · expecting a noun after the preposition
Slide image: ling406/assets/slides/sentence/22.webp

### Original slide text
the

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **The** opens a new **noun phrase** inside “in the …,” the phrase that will name the location.
  - “The” does not supply the location by itself.
  - A noun is still required, maybe with modifiers in front, as in “in the hot oven.”
- The parser now strongly expects a **noun**, and the expectation concerns a **word category**, not merely a sensible topic.
  - Whatever comes next has to work grammatically inside a noun phrase.
  - Knowing the sentence is about pizza makes words such as oven or box likely, but the grammatical requirement holds whatever the meaning. A word that cannot belong to a noun phrase will clash with it.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **The** begins a new **noun phrase** inside the prepositional phrase “in the …” It is the start of the phrase that will name the location.
  - “The” itself does not supply the location.
  - A noun is still needed, possibly with modifiers before it, as in “in the hot oven.”
- The parser now strongly expects a **noun**. This expectation concerns a **word category**, not just a sensible topic.
  - Whatever comes next must work grammatically as part of a noun phrase.
  - Knowing that the sentence is about pizza makes words like oven or box likely, but the grammatical requirement holds regardless of meaning.
- The second the confirms that a noun phrase has started. Now the parser strongly expects a noun, possibly with an adjective in front of it.
  - The grammatical frame is now very specific.
  - Any word that cannot be part of a noun phrase will clash with this expectation.


=====================
## Page 23 · Eaten · a word-category violation
Slide image: ling406/assets/slides/sentence/23.webp

### Original slide text
eaten

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **Eaten** is the **past participle** of **eat**. It is a verb form, not a noun, so it cannot finish the noun phrase that “in the” has started.
  - **“In the eaten”** puts a verb form exactly where a noun is required.
  - That is a **word-category violation**, a word of the wrong grammatical category in a position that demands a different one.
- A category error differs from a strange but grammatical meaning.
  - “The pizza was in the ocean” is odd in meaning but grammatically fine, since ocean is a noun.
  - No unusual situation can rescue “the pizza was in the eaten,” because the problem lies in the grammatical type of the word, which breaks the structure itself.
- The contrast between category errors and meaning errors makes such sentences valuable for brain research. Comparing brain responses to the two kinds of error can reveal whether grammar and meaning are handled differently.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **Eaten** is the **past participle** of the verb **eat**. It is a verb form, not a noun, so it cannot complete the noun phrase that “in the” has set up.
  - The phrase **“in the eaten”** places a verb form exactly where a noun is required.
  - This is a **word-category violation**, meaning a word of the wrong grammatical category appears at a position that demands a different category.
- This kind of error differs from a strange but grammatical meaning.
  - “The pizza was in the ocean” is odd in meaning but grammatically fine, because ocean is a noun.
  - “The pizza was in the eaten” cannot be fixed by imagining an unusual situation. The problem lies in the grammatical type of the arriving word.
- Eaten is a verb form arriving where only a noun or adjective can go. The grammatical frame the parser built leaves no place for it.
  - A strange but grammatical word, such as ocean, would only make the meaning odd.
  - A word of the wrong category, such as eaten, breaks the structure itself.
- This contrast between category errors and meaning errors is what makes such sentences useful for studying the brain. Brain responses to the two kinds of errors can be compared to see whether grammar and meaning are processed differently.


=====================
## Page 24 · The early left anterior negativity
Slide image: ling406/assets/slides/sentence/24.webp

### Original slide text
Psychophysiological investigations of syntax.
The early left anterior negativity 
(ELAN) is an ERP phenomenon 
elicited for word class violations.
Some classic ELAN stimuli:
The pizza was in the eaten.
The scientist criticized Max’s of
proof the theorem.
Features of the ELAN:
- early (100-200ms)
- left/anterior (language-
specific?)
- specifically for word category
violations, i.e., a noun when a verb is 
expected, or a preposition.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- The **early left anterior negativity**, or **ELAN**, is an **ERP** response triggered by **word class violations**. An **ERP**, or **event-related potential**, is electrical brain activity recorded at the scalp and averaged over many trials, timed to an event such as the start of a word.
  - A **word class** is a grammatical category such as noun, verb or preposition.
- Classic ELAN sentences contain word-category violations.
  - **“The pizza was in the eaten,”** with a participle where a noun belongs.
  - **“The scientist criticized Max’s of proof the theorem,”** with the preposition **of** where a noun should follow “Max’s.”
- The ELAN has three main features.
  - It is **early**, arising about **100–200 milliseconds** after the critical word.
  - It is **left and anterior**, strongest over the left front of the scalp, which has raised the question of whether it is specific to language.
  - It appears **specifically for word category violations**, such as a noun where a verb is expected or a preposition in place of a noun.
- Incorrect sentences produce an early negative response over left frontal sites shortly after the critical word, while correct sentences do not.
  - The response comes so fast that it was taken as evidence for a very quick syntactic check of word categories that runs before meaning is processed.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- The **early left anterior negativity**, or **ELAN**, is an **ERP** response elicited by **word class violations**. An **ERP**, or **event-related potential**, is the pattern of electrical brain activity recorded from the scalp and averaged across many trials, time-locked to an event such as the onset of a word.
  - A **word class** is a grammatical category, such as noun, verb or preposition.
- Some classic ELAN stimuli are word-category violations.
  - **“The pizza was in the eaten,”** where a participle appears where a noun is expected.
  - **“The scientist criticized Max’s of proof the theorem,”** where the preposition **of** appears where a noun is expected after “Max’s.”
- The ELAN has three main features.
  - It is **early**, appearing about **100–200 milliseconds** after the critical word.
  - It is **left and anterior**, meaning it is strongest over the left front of the scalp. This location has raised the question of whether it is language-specific.
  - It occurs **specifically for word category violations**, such as a noun when a verb is expected, or a preposition in place of a noun.
- The grand average ERPs from the syntactic-category violation condition overlay waveforms for **correct** and **incorrect** sentences at many electrode sites.
  - At the left frontal sites, such as F7, F3, AL and SL, circled in red, the incorrect sentences produce an early negative deflection, shaded black, soon after the critical word.
  - Gray shading marks a left frontal negativity, and dotted shading marks a positivity over the back of the head.
  - The ELAN appears so quickly that it was taken as evidence for a very fast syntactic analysis that checks word categories before meaning is processed.


=====================
## Page 25 · Early visual predictions and form typicality
Slide image: ling406/assets/slides/sentence/25.webp

### Original slide text
The ELAN: It came from visual cortex
(with visually presented words).
This is interesting.
It suggests that, when we’re expecting a 
verb (for example), that prediction can feed 
back down to the earliest parts of the visual 
system, and predict certain visual patterns 
that are consistent with the way verbs are 
written.
The very early response to the error might 
reflect a mismatch between that predictive 
process and what finally appears on the 
screen.
Question: Does this only work for items that 
are morphologically marked as nouns or 
verbs? Or for open vs. closed class words?
Dikker, S., Rabagliati, H., Farmer, T. A., & Pylkkänen, L. (2010). Early occipital sensitivity to syntactic 
category is based on form typicality. Psychological Science 121, 629-34.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- With visually presented words, **the ELAN came from visual cortex**, the region at the back of the brain that processes sight. The result comes from **Dikker, Rabagliati, Farmer and Pylkkänen (2010)**, “Early occipital sensitivity to syntactic category is based on form typicality.” Visual cortex sits in the **occipital** lobe.
  - For **bimorphemic nouns**, which end in a recognizable noun suffix, **“The beautifully princess …”** drew a larger visual response than **“The beautiful princess …”** about 120 to 130 milliseconds after the noun appeared.
  - Beautiful is an adjective, which correctly predicts a noun. Beautifully is an adverb, which predicts a verb or adjective, so princess comes as a surprise.
- When a verb is expected, for example, **that prediction can feed back down to the earliest parts of the visual system** and anticipate visual patterns that fit **the way verbs are written**.
  - A predicted grammatical category implies likely visual forms, such as typical word endings.
  - The very early response to the error might reflect **a mismatch between that predictive process and what finally appears on the screen**.
- That raises a question. **Does this only work for items that are morphologically marked as nouns or verbs?** Or does it work for **open-class versus closed-class** words?
  - A word is **morphologically marked** when part of it, such as a suffix, signals its category.
  - **Open-class** words are content words like nouns and verbs, which keep gaining new members. **Closed-class** words are function words like prepositions and determiners, a small fixed set.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **The ELAN came from visual cortex** when words were presented visually. **Visual cortex** is the region at the back of the brain that processes what we see. This finding comes from **Dikker, Rabagliati, Farmer and Pylkkänen (2010)**, in a paper titled “Early occipital sensitivity to syntactic category is based on form typicality.” The **occipital** lobe is where visual cortex is located.
  - The graph plots **dipole strength** in nanoampere-meters, a measure of brain activity in a localized source, from −100 to 400 milliseconds after the word.
  - For **bimorphemic nouns**, nouns that end in an identifiable noun suffix, the response to **“The beautifully princess …”** peaks higher than the response to **“The beautiful princess …”** at about **120 to 130 milliseconds**.
  - Beautiful is an adjective, which correctly predicts a noun. Beautifully is an adverb, which predicts a verb or an adjective, so princess is unexpected.
- This suggests that, when we are expecting a verb, for example, **that prediction can feed back down to the earliest parts of the visual system** and predict visual patterns that are consistent with **the way verbs are written**.
  - A predicted grammatical category implies likely visual forms, such as typical word endings.
  - The prediction favors a set of likely forms.
- The very early response to the error might reflect **a mismatch between that predictive process and what finally appears on the screen**.
  - When the arriving word has visual properties that conflict with the expected category, the visual system responds within about 130 milliseconds.
  - An early category-sensitive response can therefore come from predictions about word form.
- This raises a question. **Does this only work for items that are morphologically marked as nouns or verbs?** Or does it work for **open-class versus closed-class** words?
  - A word is **morphologically marked** when it contains a part, such as a suffix, that signals its category.
  - **Open-class** words are content words such as nouns and verbs, which constantly gain new members. **Closed-class** words are function words such as prepositions and determiners, which form a small fixed set.


=====================
## Page 26 · Perches and needs can change category
Slide image: ling406/assets/slides/sentence/26.webp

### Original slide text
Psychophysiological investigations of syntax.
(3a) Chris and Ben are glad that 
the bird perches seem easy to 
install.
(3b) Chris and Ben are glad that 
the bird perches comfortably in 
the cage.
(4a) The teacher told the principal 
that the student needs were
not being met.
(4b) The teacher told the principal 
that the student needs to be more 
focused.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- Many English words can be either a **noun** or a **verb**, and the rest of the sentence decides which.
  - **(3a)** “Chris and Ben are glad that the bird **perches seem** easy to install.” Perches is a **noun** here, meaning the rods birds sit on, and seem is the verb.
  - **(3b)** “Chris and Ben are glad that the bird **perches comfortably** in the cage.” Perches is a **verb** here, saying what the bird does.
  - **(4a)** “The teacher told the principal that the student **needs were** not being met.” Needs is a **noun**, the student’s requirements.
  - **(4b)** “The teacher told the principal that the student **needs to be** more focused.” Needs is a **verb**.
- The word form alone does not fix its grammatical role, and the **continuation** after it settles the question.
- Words also vary in **phonological form typicality**, how closely a word’s sound pattern matches typical nouns or typical verbs. An analysis of **3,158 words** measured how much each word sounds like nouns and like verbs.
  - Nouns generally sound more like other nouns, and verbs more like other verbs.
  - Some words run against the trend. Besides **noun-like nouns** and **verb-like verbs**, there are **verb-like nouns** and **noun-like verbs**, words that sound like one category while belonging to the other.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- Many English words can function as either a **noun** or a **verb**, and the rest of the sentence decides which.
  - **(3a)** “Chris and Ben are glad that the bird **perches seem** easy to install.” Here perches is a **noun**, meaning the bars that birds sit on, and seem is the verb.
  - **(3b)** “Chris and Ben are glad that the bird **perches comfortably** in the cage.” Here perches is a **verb**, describing what the bird does.
  - **(4a)** “The teacher told the principal that the student **needs were** not being met.” Here needs is a **noun**, meaning the student’s requirements.
  - **(4b)** “The teacher told the principal that the student **needs to be** more focused.” Here needs is a **verb**.
- Recognizing the word form alone does not settle its grammatical role. The **continuation** after the ambiguous word resolves it.
- Words also differ in **phonological form typicality**, which is how much a word’s sound pattern resembles the sound patterns of typical nouns or typical verbs. The scatterplot covers **3,158 words** from a corpus analysis.
  - Each word is placed according to its **mean distance** in phonological feature space from **all nouns**, on the horizontal axis, and from **all verbs**, on the vertical axis. A small distance means the word sounds similar to that category.
  - **Nouns**, shown as gray squares, tend to cluster in the upper left, closer to other nouns. **Verbs**, shown as black diamonds, tend to cluster in the lower right, closer to other verbs.
  - Labeled points mark the centers of **noun-like nouns**, **verb-like nouns**, **verb-like verbs** and **noun-like verbs**. A word can sound statistically like one category while actually belonging to the other.


=====================
## Page 27 · Noun-like and verb-like forms
Slide image: ling406/assets/slides/sentence/27.webp

### Original slide text
Psychophysiological investigations of syntax.
(3a) Chris and Ben are glad that 
the bird perches seem easy to 
install.
(3b) Chris and Ben are glad that 
the bird perches comfortably in 
the cage.
(4a) The teacher told the principal 
that the student needs were
not being met.
(4b) The teacher told the principal 
that the student needs to be more 
focused.
[BTW “perches” is noun-like, and 
“needs” is verb-like]

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- In **form typicality**, **“perches” is noun-like** and **“needs” is verb-like**.
  - These are learned statistical tendencies in how words sound, and both words can still fill either role.
  - Among thousands of English words, perches sounds like a typical noun and needs sounds like a typical verb.
- For **perches**, its noun-like form fits one sentence and clashes with another.
  - In **“the bird perches seem easy to install,”** perches is a noun, matching its form.
  - In **“the bird perches comfortably in the cage,”** perches must be a verb, against its form.
- For **needs**, the pattern flips.
  - In **“the student needs to be more focused,”** needs is a verb, matching its form.
  - In **“the student needs were not being met,”** needs must be a noun, against its form.
- Each word appears once as a noun and once as a verb, so the same form can be compared in a matching use and a mismatching use.
  - If form typicality guides parsing, the mismatching uses should be harder to process, even though every one of these sentences is grammatical.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- In terms of form typicality, **“perches” is noun-like**, and **“needs” is verb-like**.
  - These are learned statistical tendencies in how words sound. Both words can still appear in either role.
  - The tendencies affect how easily each use is processed.
- For **perches**, the noun-like form matches one sentence and clashes with the other.
  - In **“the bird perches seem easy to install,”** perches is used as a noun, which matches its noun-like form.
  - In **“the bird perches comfortably in the cage,”** perches must be a verb, which goes against its noun-like form.
- For **needs**, the pattern is reversed.
  - In **“the student needs to be more focused,”** needs is used as a verb, which matches its verb-like form.
  - In **“the student needs were not being met,”** needs must be a noun, which goes against its verb-like form.
- Comparing these four sentences separates what a word’s form suggests from what the grammar of the sentence requires.
  - On the scatterplot of 3,158 words, perches would fall among the noun-like forms and needs among the verb-like forms.
  - The question is whether readers have more trouble when the required category conflicts with the form’s typical category.
- The perches and needs sentences set up a direct test of form typicality. Each word appears once as a noun and once as a verb, so the same word form can be studied in a matching and a mismatching use.
  - A matching use fits the word’s typical sound pattern.
  - A mismatching use goes against it.
- If form typicality guides parsing, mismatching uses should be harder to process, even though both uses are grammatical.


=====================
## Page 28 · Comparing form-based and syntactic expectations
Slide image: ling406/assets/slides/sentence/28.webp

### Original slide text
Psychophysiological investigations of syntax.
(3a) Chris and Ben are glad that 
the bird perches seem easy to 
install.
(3b) Chris and Ben are glad that 
the bird perches comfortably in 
the cage.
(4a) The teacher told the principal 
that the student needs were
not being met.
(4b) The teacher told the principal 
that the student needs to be more 
focused.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- Reading is **slower when a word’s required category conflicts with its form typicality**. The measure is the extra reading time at **disambiguation**, compared with reading time at the **point of ambiguity**.
  - The **point of ambiguity** is the ambiguous word itself, such as perches or needs.
  - **Disambiguation** is the point where the continuation makes the intended category clear, such as “seem” or “comfortably.”
  - The times are adjusted for word length, and a larger increase signals more difficulty.
- For **noun-like homonyms** such as perches, a noun reading added only a small cost, about **50 milliseconds**. A verb reading added a much larger cost, about **120 milliseconds**.
  - A noun-like form is harder to resolve as a verb.
- For **verb-like homonyms** such as needs, the pattern reversed. A noun reading added about **110 milliseconds**, while a verb reading added almost nothing.
  - A verb-like form is harder to resolve as a noun.
- The ambiguous word stays the same in each pair, and only the continuation changes.
  - The extra cost appears specifically when the continuation demands the category that does not match the form.
  - Parsing therefore uses learned statistics about how word forms sound, along with the structure the sentence finally requires.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- Reading is **slower when a word’s required category conflicts with its form typicality**. The bar graph plots **mean length-adjusted difference scores** in milliseconds, which is reading time at **disambiguation** minus reading time at the **point of ambiguity**.
  - The **point of ambiguity** is the ambiguous word itself, such as perches or needs.
  - **Disambiguation** is the point where the continuation makes the intended category clear, such as “seem” or “comfortably.”
  - **Length-adjusted** means the times are corrected for how long the words are.
  - Rising bars indicate that reading times increased from the point of ambiguity to disambiguation, which signals difficulty.
- For **noun-like homonyms** such as perches, the **noun-resolved** sentences show an increase of about **50 milliseconds**. The **verb-resolved** sentences show a much larger increase, about **120 milliseconds**.
  - A noun-like form is harder to resolve as a verb.
- For **verb-like homonyms** such as needs, the **noun-resolved** sentences show an increase of about **110 milliseconds**. The **verb-resolved** sentences show almost none, under 10 milliseconds.
  - A verb-like form is harder to resolve as a noun.
- The ambiguous word stays the same in each pair, and only the continuation changes.
  - The extra cost appears specifically when the continuation demands the category that does not match the form.
  - Parsing therefore uses learned statistics about how word forms sound, along with the structure the sentence finally requires.
- The reading time results confirm the prediction. The extra cost at disambiguation was largest when the sentence required the category that did not match the word’s typical form.
  - Perches, a noun-like form, was harder to read as a verb.
  - Needs, a verb-like form, was harder to read as a noun.


=====================
## Page 29 · When a category violation produces the early effect
Slide image: ling406/assets/slides/sentence/29.webp

### Original slide text
Psychophysiological investigations of syntax.
The ELAN effect for nouns where a verb is 
expected is limited to those cases where there 
is either syntactic (i.e., morphemes indicating 
noun-ness) or statistical form-based 
information (i.e., “nouniness”) physically 
available.
No effect was observed for neutral nouns like 
“infant” that lack strong cues.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- The **ELAN effect for nouns where a verb is expected** is limited to cases where there is either **syntactic information**, morphemes that indicate noun-ness, or **statistical form-based information**, “nouniness,” that is **physically available** in the word. **No effect was observed for neutral nouns like “infant” that lack strong cues**.
  - A **morpheme** is the smallest meaningful unit of a word, such as a suffix that marks a noun.
  - “Nouniness” is how closely a word’s form resembles typical nouns, even with no noun suffix.
- The early brain response studied here is the **M100**, which peaks about 100 milliseconds after a word appears. Three kinds of nouns were compared.
  - **Bimorphemic nouns**, as in “The beautiful princess …” versus “The beautifully princess …” Princess carries a noun-marking suffix, and the unexpected version produced a reliably larger response.
  - **Typical nouns**, as in “The tasteless soda …” versus “The tastelessly soda …” Soda has a statistically noun-like form, and the unexpected version again produced a reliably larger response.
  - **Neutral nouns**, as in “The cute infant …” versus “The cutely infant …” Infant has neither a suffix nor a typical noun form, and the two versions did not differ.
- An abstract category mismatch is therefore not enough to trigger this earliest visual response.
  - An expected category produces predictions about what the next word will look like.
  - The early response appears only when the arriving word carries physical evidence that contradicts that prediction.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- The **ELAN effect for nouns where a verb is expected** is limited to cases where there is either **syntactic information**, meaning morphemes that indicate noun-ness, or **statistical form-based information**, meaning “nouniness,” that is **physically available** in the word. **No effect was observed for neutral nouns like “infant” that lack strong cues**.
  - A **morpheme** is the smallest meaningful part of a word, such as the suffix that marks a noun.
  - “Nouniness” is how much a word’s form resembles typical nouns, even without a noun suffix.
- The figure compares three kinds of nouns, with responses plotted as dipole strength from −100 to 400 milliseconds and the **M100** response marked. The M100 is a brain response peaking about 100 milliseconds after a word appears.
  - **(a) Bimorphemic nouns**, in “The beautiful princess …” versus “The beautifully princess …” Princess has a noun-marking suffix, and the unexpected version produces a significantly larger peak.
  - **(b) Typical nouns**, in “The tasteless soda …” versus “The tastelessly soda …” Soda has a statistically noun-like form, and the unexpected version again produces a significantly larger peak.
  - **(c) Neutral nouns**, in “The cute infant …” versus “The cutely infant …” Infant has neither a suffix nor a typical noun form, and the two waveforms do not differ.
  - Asterisks mark significant differences between expected and unexpected nouns, and they appear for the bimorphemic and typical nouns but not for the neutral nouns.
- An abstract category mismatch alone is therefore not enough to produce this earliest visual response.
  - An expected category generates predictions about what the next word will look like.
  - The early response appears only when the arriving word carries physical evidence that conflicts with that prediction.
- The three-way comparison pinpoints what drives the early brain response. Bimorphemic nouns carry a suffix that marks them as nouns, typical nouns sound like nouns without a suffix, and neutral nouns carry neither cue.
  - The early response appears for the first two types.
  - It is absent for neutral nouns, so the response depends on physical cues to category in the word itself.


=====================
## Page 30 · Four sentences, four connected lessons
Slide image: ling406/assets/slides/sentence/30.webp

### Original slide text
Sentence processing in four sentences.
Colorless green ideas sleep furiously.
Syntax is independent of semantics to some extent. In the limit you can have sentences 
that are grammatically correct but meaningless.
The horse raced past the barn fell.
The syntactic structure of a sentence is often highly ambiguous (actually vague), but we 
don’t notice except where things fail. Reading times for “preferred” vs. “unpreferred” 
structures suggest that syntactic processes take shortcuts to save memory, rather than 
activating every possible parse of a sentence.
Put the apple on the towel in the box.
Context, pragmatics, and other factors seem to interact with syntactic processing from 
very early on.
The bird perches were comfortable.
The very earliest syntactic effects observable in the brain are driven in part by form 
typicality, not necessarily by morphosyntactic structures, and seem to be related to 
predictions about the physical forms of words.

### Existing reviewed notes (Version 18), for facts only, do not copy the wording
- **Sentence processing can be summarized in four sentences**, each carrying one key idea.
  - **“Colorless green ideas sleep furiously.”** **Syntax is independent of semantics to some extent**. At the extreme, a sentence can be grammatical but meaningless, because words can fill a grammatical structure without describing a sensible event.
- **“The horse raced past the barn fell.”** A sentence’s syntactic structure is often highly **ambiguous**, or more precisely **vague**, but we notice only where processing fails.
  - **Reading times** for preferred and unpreferred structures suggest that syntactic processes **take shortcuts to save memory** instead of activating every possible parse.
  - When a shortcut picks the wrong structure, as in the horse sentence, the reader goes down the garden path.
- **“Put the apple on the towel in the box.”** **Context, pragmatics and other factors interact with syntactic processing from very early on**.
  - With two apples in view, listeners read “on the towel” as describing the apple instead of naming a destination.
  - The visual scene shapes the parse while the sentence is still unfolding.
- **“The bird perches were comfortable.”** **The very earliest syntactic effects observable in the brain are driven in part by form typicality**, not necessarily by morphosyntactic structures.
  - **Morphosyntactic** structure is grammatical structure signaled by word parts and word order.
  - These early effects seem tied to **predictions about the physical forms of words**. Perches has a noun-like form, so its use here as a noun matches the prediction its form creates.

### Existing reviewed notes (Version 12, more detail), for facts only, do not copy the wording
- **Sentence processing can be summarized in four sentences**, each tied to one key idea.
  - **“Colorless green ideas sleep furiously.”** **Syntax is independent of semantics to some extent**. In the limit, a sentence can be grammatically correct but meaningless. Words can fit a grammatical structure without describing a sensible event.
- **“The horse raced past the barn fell.”** The syntactic structure of a sentence is often highly **ambiguous**, or more precisely **vague**, but we do not notice except where things fail.
  - **Reading times** for preferred versus unpreferred structures suggest that syntactic processes **take shortcuts to save memory**, rather than activating every possible parse of a sentence.
  - When the shortcut picks the wrong structure, as in the horse sentence, the reader is led down the garden path.
- **“Put the apple on the towel in the box.”** **Context, pragmatics and other factors interact with syntactic processing from very early on**.
  - With two apples in view, listeners take “on the towel” as a description of the apple rather than a destination.
  - The visual situation shapes the parse during the sentence.
- **“The bird perches were comfortable.”** **The very earliest syntactic effects observable in the brain are driven in part by form typicality**, not necessarily by morphosyntactic structures.
  - **Morphosyntactic** structure is grammatical structure signaled by word parts and word order.
  - These early effects seem to be related to **predictions about the physical forms of words**. Perches has a noun-like form, so its use as a noun here matches the expectation set up by its form.
- The four sentences summarize how grammar, meaning, context and word form all contribute to sentence processing. Syntax can be separated from meaning, as colorless green ideas reveals. Structure is built quickly with shortcuts, as the horse sentence reveals.
  - Context guides the parse from the first moments, as the apple instruction reveals.
  - Predictions about the forms of upcoming words shape the earliest brain responses, as the bird perches sentence reveals.


=====================
## Page 31 · From parsing to aphasia · EMPTY (title or logistics page, write nothing)
Slide image: ling406/assets/slides/sentence/31.webp

### Original slide text
For next class
Read Menn, Chapter 6 (on aphasias)
