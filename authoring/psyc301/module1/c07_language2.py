"""Collection 07 · Language · Part 2 (source id 1). Version 22 wording, closing points and reasoning."""
ID = 1
S = {}
def s(page, points, closing, reason=None):
    S[page] = (points, closing, reason)

s(2, ["In the **syntax-first approach**, the grouping of words into phrases is governed at first by rules based on syntax.",
      "**Late closure** means the parser, which is the process that groups the words, assumes that a new word is part of the current phrase. | It keeps adding words to that phrase for as long as possible.",
      "If something is wrong with the grouping, readers use other information to reinterpret the sentence."],
  "This matters because it is one of two accounts of parsing. | Syntax comes first, and other information is used only for repair.")
s(3, ["The syntax-first approach separates **syntax** from **semantics**. | The parser is assumed to work automatically and to follow simple rules.",
      "When the rules fail, a repair process that demands attention comes in."],
  "This matters because it gives parsing two steps. | The first is automatic, and the repair is effortful.")
s(4, ["In the **interactionist approach** to parsing, semantics and syntax both influence processing as a sentence is read.",
      "“The spy saw the man with the binoculars” has two readings. | The spy used the binoculars, or the man had them.",
      "“The bird saw the man with the binoculars” favors the man having the binoculars."],
  "This matters because meaning changed the grouping from the start. | Semantics does not wait until a syntax-only reading fails.",
  "The two sentences have the same structure, so the different reading comes from the meaning of “spy” versus “bird.”")
s(5, ["How a sentence is interpreted is also influenced by the scene a person is looking at.",
      "**Tanenhaus and colleagues (1995)** used the **visual world paradigm**. | Participants’ eye movements were measured while they viewed a scene and heard an instruction.",
      "Eye movements change when the interpretation of the sentence has to be revised."],
  "This matters because it supports the interactionist approach. | Syntactic and semantic information are used at the same time.")
s(6, ["The instruction is “Place the apple on the towel in the box.” | “On the towel” could say which apple is meant, or it could say where to move the apple.",
      "With **two apples**, listeners expect to be told which apple is meant. | “On the towel” is taken as identifying the apple that is on the towel.",
      "The first eye movements go to that apple."],
  "This matters because the scene decided how the phrase was read. | With two apples, the phrase is taken as saying which apple is meant.")
s(7, ["With **only one apple**, the other reading is also considered. | The listener takes “on the towel” as the place to move the apple, and looks at the other towel.",
      "On hearing “in the box,” the person looks back at the apple, which shows a revision."],
  "This matters because the sentence is the same and the scene is different. | The comparison shows that the scene changes parsing.",
  "In Tanenhaus and colleagues (1995), the instruction was the same in both scenes, so the different eye movements go with the number of apples.")
s(8, ["We use knowledge of the environment to predict what we are about to read or hear.",
      "“Every morning he drove for a few minutes, and then boarded the…” | With a car and a neighboring island, a likely completion is “ferry.”"],
  "This matters because it goes beyond grammar. | Many nouns fit the grammar, and knowledge of the situation picks one.")
s(9, ["Experience with sentence constructions influences predictions about how a sentence will be organized.",
      "**Fine and colleagues (2013)** used the **moving window paradigm**. | Participants read one word at a time and pressed the space bar for the next word.",
      "At first, “The experienced soldiers warned about the dangers conducted the midnight raid” took longer to read than the version with “who were.” | After exposure, the difference was no longer significant."],
  "This matters because readers adjusted their expectations with experience. | Parsing predictions are learned and can change.",
  "In Fine and colleagues (2013), the same two constructions were compared at first and after exposure, so the drop in reading cost reflects the readers’ experience with the construction.")
s(10, ["A story is more than the meanings of its individual sentences. | Making a coherent story includes **inferences**, which use our own knowledge to determine what the text means.",
       "“John was trying to fix the birdhouse. He was pounding the nail when his father came out.” The passage never names the tool.",
       "Readers later accept a sentence saying that John was using a hammer. | This connects **unconscious inference** with the **constructive nature of memory**."],
  "This matters because the hammer came from the reader’s knowledge. | An inferred detail can be remembered as part of the original wording.")
s(11, ["A **situation model** is a mental representation of what a text is about. | It represents events as if the reader were experiencing them, often from the protagonist’s point of view.",
       "These representations are **simulations** of the perceptual and motor characteristics of the objects and actions in a story.",
       "After “He hammered the nail into the wall,” a horizontal nail is identified faster than a nail in an orientation that does not match the sentence."],
  "This matters because readers represent more than the words. | The orientation of the nail was implied and never stated.",
  "The nail was the same object in both drawings, so the faster response reflects the orientation that matches the sentence.")
s(12, ["“The ranger saw the eagle in the sky” implies an eagle with its wings extended.",
       "A drawing that matches the implied shape is responded to faster than one that does not."],
  "This matters because readers create perceptual representations that match the situation. | The sentence did not mention the wings.")
s(13, ["Approximately the same cortical areas are activated by actual movements and by reading related action words. | Activation is more extensive for actual movements.",
       "Foot movements go with leg words. Finger movements go with arm words. Tongue movements go with face words."],
  "This matters because it is physiological evidence for simulation. | Reading an action word activates areas for that body part.")
s(14, ["We access information about situations as we read. | **Ross Metusalem and colleagues (2012)** measured the size of the **N400** while participants read short passages.",
       "A passage about a concert ended with the band walking onto the “stage,” the “guitar” or the “barn.” | “Stage” is expected, “guitar” is related and “barn” is unrelated.",
       "“Guitar” produced a smaller N400 than “barn.”"],
  "This matters because “guitar” is wrong in the sentence and still partly expected. | A situation model activates knowledge of the whole event.",
  "In Ross Metusalem and colleagues (2012), neither “guitar” nor “barn” fits the sentence, so the smaller N400 for “guitar” comes from its link to the concert.")
s(15, ["**Conversation** is the most common form of language production. | It is dynamic and rapid, and it depends on shared knowledge.",
       "The **given-new contract** says that a speaker builds sentences with **given information**, which the listener already knows, and **new information**.",
       "New information becomes given information later in the conversation."],
  "This matters because it explains how a listener keeps up. | Each sentence ties something new to something already shared.")
s(16, ["**Syntactic coordination** is when speakers use similar grammatical constructions.",
       "**Syntactic priming** occurs when one person’s use of a construction increases the chance that the other person will use it."],
  "This matters because matching constructions reduces the work of conversation. | The structure is reused even when the words are different.")
s(17, ["In a syntactic priming experiment, two people talk while doing a task.",
       "One person is a **confederate**, who uses a set prime. | The prime is “The girl gave the book to the boy” or “The girl gave the boy the book.”",
       "The participant then describes a card to the other person."],
  "This matters because it is the grammatical form of the description. | Picking the right card is not what is scored.")
s(18, ["In **78 percent of trials**, the form of the participant’s description matched the form of the confederate’s prime.",
       "Speakers are sensitive to how other speakers talk, and they adjust to match."],
  "This matters because it is the evidence for syntactic priming. | Common ground is established and syntactic forms become aligned.",
  "The cards described were different from the prime, so the matching form goes with the construction the confederate used.")
s(19, ["The **Sapir-Whorf hypothesis** proposes that language influences thought. | It is associated with **Whorf (1956)**.",
       "**Winawer and colleagues (2007)** tested judgments of blue squares. | Russian has “siniy” for darker blue and “goluboy” for lighter blue.",
       "Russian speakers responded more quickly when the two colors came from different categories. | The result differed between cultures."],
  "This matters because a category in the language went with faster discrimination. | The advantage appeared when the colors crossed the boundary between the two words.",
  "In Winawer and colleagues (2007), all of the squares were blue, so the faster response goes with whether the two colors have different names in Russian.")
s(20, ["**Gilbert and colleagues (2006)** tested the left and right hemispheres separately. | The task was to say which side contained the odd color. Some differences were within a color category and some were between categories.",
       "Language is more strongly associated with the **left hemisphere**. | The right visual field projects first to the left hemisphere.",
       "The effect of color categories was stronger when the colors appeared in the right visual field."],
  "This matters because the effect was strongest where language is processed. | That supports the idea that color names affect telling colors apart.",
  "In Gilbert and colleagues (2006), the task was the same on both sides, so the larger category effect reflects the field that projects first to the left hemisphere.")
s(21, ["Nearby space is often described **egocentrically**, as left, right, in front or behind. | These directions change when the speaker turns.",
       "**Tzeltal**, a Mayan language spoken in Chiapas, uses **absolute directions** much more. | Similar systems occur in some languages in Bali and Queensland."],
  "This matters because the two systems depend on different things. | “Raise your east hand” depends on the environment and not on the body.")
s(22, ["**Tzeltal** has a system that was historically based on landmarks. Things are described as **uphill** or **downhill** from one another. | Uphill is south and downhill is north. They work as cardinal directions, so the system is absolute.",
       "A speaker in an unfamiliar city at night asked whether the hot tap was the uphill or the downhill tap. | **Levinson and colleagues (2002)** connect this with keeping track of orientation."],
  "This matters because the direction words are used even indoors and far from home. | Speakers have to keep track of their orientation.")
s(23, ["In the **chips task**, participants saw a card with a large dot and a small dot on one table. | After 30 seconds they were turned 180 degrees and chose the matching card from four cards at a second table. There were eight trials.",
       "A **relative** response keeps the arrangement the same with respect to the body. An **absolute** response keeps it the same with respect to the environment.",
       "Dutch responses were mostly relative. Tzeltal responses favored absolute direction. | A consistent speaker used one response style on at least six of the eight trials. Among consistent Tzeltal speakers, over 80 percent were absolute."],
  "This matters because the pattern of responses followed the language. | The rotation makes the two frames of reference give different answers.",
  "The task was the same for both groups, so the different choices go with the language each group speaks.")
s(24, ["Much experimental psychology in the 1950s and 1960s resisted explanations that used internal states.",
       "**Skinner’s Verbal Behavior** explained language learning by operant conditioning. | **Chomsky’s 1959 review** challenged that account and argued for internal cognitive structure."],
  "This matters because it was an important part of the **cognitive revolution**. | Internal representations became acceptable scientific explanations.")
s(25, ["**Substrate dependence** means a theory of language may have to include how the brain carries language out.",
       "The brain can constrain learning and processing through memory limits, errors and associative learning."],
  "This matters because it argues for including the brain in the explanation. | An abstract description may not be enough.")
s(26, ["**David Marr**, a visual neuroscientist, distinguished three levels of analysis.",
       "The **computational level** states the problem and its purpose. The **algorithmic level** states the representations and operations used to solve it. The **implementational level** is how the operations are physically carried out.",
       "Chomsky’s formal approach is associated with the computational level."],
  "This matters because the levels separate three questions. | They are what is computed, how it is computed, and what carries it out.")
s(27, ["For a **cash register**, the computational level is to find the amount due from the prices and the change due from the payment.",
       "The algorithmic level is addition for the total and subtraction for the change.",
       "At the implementational level, different devices or programs can do those calculations."],
  "This matters because it shows the levels on a simple case. | The function can be described without choosing the hardware.")
s(28, ["**Type I problems** are problems that can be studied one level at a time.",
       "Treating language as Type I allows work at the computational level, such as **Universal Grammar**, and at the algorithmic level, such as language-specific processes, without explaining implementation at first. | Implementation concerns include errors, memory limits and associative learning.",
       "Chomsky’s critique came about a decade before Marr’s theoretical work. | Both influenced artificial intelligence and the symbolic tradition called **GOFAI**."],
  "This matters because treating language this way is the opposite position to substrate dependence. | The question is whether implementation can be left out of an account of language.")
s(29, ["A model that predicts the next letter can find words in a continuous sequence with no spaces.",
       "In **Elman’s model**, prediction error goes down within a word and rises where the next letter is less predictable."],
  "This matters because it connects prediction with segmentation. | Learning which letters follow which gives information about word boundaries.")

SUBJECT = {
    2: 'The syntax-first approach matters',
    3: 'The repair process matters',
    4: 'The interactionist approach matters',
    5: 'The visual world paradigm matters',
    6: 'The two apples matter',
    7: 'The one apple scene matters',
    8: 'Prediction matters',
    9: 'The result matters',
    10: 'Inference matters',
    11: 'The situation model matters',
    12: 'The eagle sentence matters',
    13: 'The activation matters',
    14: 'The N400 result matters',
    15: 'The given-new contract matters',
    16: 'Syntactic priming matters',
    17: 'The measure matters',
    18: 'The 78 percent result matters',
    19: 'The Russian result matters',
    20: 'The visual field result matters',
    21: 'The two systems matter',
    22: 'The Tzeltal system matters',
    23: 'The chips task matters',
    24: 'The debate matters',
    25: 'Substrate dependence matters',
    26: 'Marr’s levels matter',
    27: 'The cash register matters',
    28: 'Type I problems matter',
    29: 'Elman’s model matters',
}
