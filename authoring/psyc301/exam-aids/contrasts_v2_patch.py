"""Board-review fixes applied on top of contrasts_v2_content_a/b/c.py (Vera facts, Sage and Rook depth, Gideon and Flint rules),
plus pairs the board found missing. Researcher names are limited to those on the slides."""
from contrasts_v2_content_a import C

DELETE = {
    "What people see vs how it is remembered",           # duplicate of the sound-code vs look-code pair in lecture 15
    "Deductive reasoning vs belief bias",                 # merged into Validity vs believability
    "Mental models vs belief bias",                       # merged into Validity vs believability
}

def side(t, d): return {"term": t, "definition": d}

PATCH = {
"Icon vs echo": dict(
    diff="Both are sensory memory and both fade within seconds or fractions of a second, so the only difference is the sense involved: seeing for the icon and hearing for the echo. Neither is the durable representation used to remember something much later.",
    example="Sperling (1960) studied iconic memory with flashed letters. As an illustration of an echo, you can still replay the last few words someone said for a moment after they stop."),
"Decay vs interference": dict(
    a=side("Decay", "A memory trace weakens simply because time passes. It predicts the same loss at the same delay on every trial."),
    b=side("Interference", "Other memories compete with the one being tested. It predicts that loss depends on how much competing material there is, not only on time."),
    diff="In Brown (1958) and Peterson and Peterson (1959), participants saw three letters and a number and counted backward by threes for 3 to 18 seconds, which blocks rehearsal. The average over all trials fell steadily, and Peterson and Peterson read that as decay. But at 18 seconds recall was relatively high on trial 1, lower by trial 3, and very low after many trials, so the same delay did far more damage when more earlier sets had piled up. As presented, that trial-by-trial pattern points to proactive interference, which Keppel and Underwood (1962) offered as the alternative account.",
    example="The same 18-second delay gave high recall on the first trial and very low recall after many trials.",
    watch="If an answer says forgetting happened 'because of time' but ignores the trial history, it is describing decay when the pattern shows interference."),
"Average over all trials vs trial-by-trial recall": dict(
    watch="The average blends early trials with high recall and late trials with very low recall, so it hides where the steep drop actually comes from."),
"Sensory memory vs short-term memory": dict(
    diff="The two stores of Atkinson and Shiffrin's (1968) modal model differ in how much they hold and how long it lasts. Sensory memory holds a lot for an instant, which is why Sperling's (1960) immediate cue let people report almost any row, and a delayed cue arrived after most of it had faded. Short-term memory holds a little for longer, and attention is what moves selected information from the first into the second."),
"Maintenance rehearsal vs elaborative rehearsal": dict(
    example="Repeating a label over and over keeps it available (maintenance). Explaining how the label relates to something you already know supports longer-term learning (elaborative)."),
"Miller's seven plus or minus two vs three to four items": dict(
    diff="Miller's units can hold different amounts of information, so the title does not prove that every system holds exactly seven raw items. The figures come from different places: five to seven is the modal-model estimate for short-term memory, seven plus or minus two is Miller's, and three to four is Alvarez and Cavanagh's (2004) estimate for visual objects, where colored squares gave a higher estimated capacity than complex polygons or shaded cubes. Different tasks need not measure one identical capacity."),
"Single item vs chunk": dict(
    diff="Chunking raises effective capacity by letting each slot in short-term memory carry more information, so the same limited number of units holds more. The gain comes from knowledge-based organization, not from enlarging every raw limit equally.",
    example="Ericsson and colleagues (1980) trained a student to reach a digit span of 79 by treating strings of digits as familiar running times, so each running time was one chunk."),
"Episodic vs semantic memory": dict(
    example="As an illustration, remembering one particular birthday party is episodic, and knowing what a birthday is is semantic."),
"Duration vs capacity": dict(
    diff="Duration is how long information stays available, and capacity is how much can be held at once. Each can be changed by a strategy: rehearsal prolongs duration, and chunking raises effective capacity. So when a result changes, ask which strategy was used and not only which memory system is involved.",
    example="Counting backward blocks rehearsal in Brown (1958) and Peterson and Peterson (1959), so a trigram is lost within about fifteen to twenty seconds. Ericsson and colleagues (1980) raised a digit span to 79 by chunking."),
"Short-term memory vs working memory": dict(
    a=side("Short-term memory (Atkinson and Shiffrin, 1968)", "A single component that holds what has been selected for a short time. Rehearsal keeps its contents available, and the emphasis is on temporary availability.")),
"Brooks's sentence task vs F task": dict(
    example="Holding a sentence while speaking answers interfered in the sentence task, and holding an F while pointing to answers interfered in the F task."),
"Phonological store vs articulatory rehearsal": dict(
    example="As an illustration, repeating an unrelated word while trying to memorize a list leaves the rehearsal process busy."),
"Word-length effect vs phonological similarity effect": dict(
    example="Word length: Baddeley and colleagues (1975, 1984) found more short words were recalled than long words, and Ellis and Hennelly (1980) found Welsh-English bilingual children had a shorter digit span in Welsh because Welsh number names take longer to say. Phonological similarity: E is confused with B because they sound alike.",
    watch="Span tracks how much can be said in about 1.5 to 2 seconds, so the language difference follows the time to say the number names and not the numbers themselves."),
"Central executive vs the two storage systems": dict(
    diff="The executive is about control, and the other two are about content. Naming a controller does not explain how control is done, which is why the executive is criticized as a homunculus, and it is today often split into updating, shifting and inhibition (Miyake and colleagues, 2000).",
    example="As an illustration, following a phone number while giving directions needs the executive to split attention while the loop rehearses the digits."),
"Updating vs shifting": dict(
    example="As an illustration, replacing the contents you are holding with new ones is updating, switching from adding to multiplying is shifting, and ignoring a distracting number is inhibition."),
"High-capacity vs low-capacity participants": dict(
    diff="Vogel and colleagues (2005) recorded event-related potentials during a task where red bars were shown for 100 milliseconds and held across a 900 millisecond retention interval. Capacity was positively correlated with filtering efficiency, so people with higher capacity are also less distracted, and a lower score can reflect competing material occupying processing the targets needed."),
"Rotating a representation vs storing a fixed picture": dict(
    a=side("Storing an unchanged picture", "Holding the image as it was seen, with no operation applied. If this were all that happened, deciding whether two views match would take about the same time whatever the angle between them."),
    b=side("Mental rotation", "Turning an internal representation to line it up with the other view, in the picture plane or in depth. A bigger angle needs more turning, so it takes longer."),
    diff="Shepard and Metzler (1971) showed pairs of block-built objects at different orientations and asked whether they matched. For picture-plane pairs, reaction time rose approximately linearly with the angle, so small angles were answered faster than large ones. A static copy would predict no angle effect, so the pattern points to an active operation on a spatial representation.",
    watch="The evidence is the shape of the reaction-time curve and not what people say they felt, and the linear pattern was for picture-plane pairs."),
"Blank board vs bread-and-butter board": dict(
    a=side("Blank or colored board", "The squares are unlabeled or only colored, so nothing points the solver toward the pairing a domino needs."),
    example="With a think-aloud protocol, solvers in the bread-and-butter condition shift from treating squares as positions to considering the relationship between the two kinds of square."),
"Total area vs pairing (mutilated checkerboard)": dict(
    example="An ordinary board has 64 squares and 32 dominoes cover it. Remove two opposite corners and 62 squares remain, but they are 30 of one color and 32 of the other, while 31 dominoes would need 31 of each."),
"Noticing vs mapping vs applying": dict(
    diff="Gick and Holyoak distinguished these steps. After reading the fortress story only about 30 percent of participants solved the radiation problem, and when told to think about the story success rose to about 75 percent. Having the source in memory did not guarantee spontaneous use, which points to noticing as a major bottleneck."),
"Spontaneous vs prompted use of an analogy": dict(
    a=side("Spontaneous use", "A source in memory is used without a hint. After just reading the fortress story, about 30 percent of participants solved the radiation problem."),
    b=side("Prompted use", "The person is told to think about the story they read. Then about 75 percent solved the radiation problem."),
    diff="The people and the story in memory were the same, and only the hint differed. So having the source available was not enough: the reminder made the relevant source available for mapping and application, and noticing is a major bottleneck. Only about 10 percent reach the solution without a helpful analogy."),
"Fragile-glass vs insufficient-intensity lightbulb sources": dict(
    example="About 69 percent who read the fragile-glass version solved the radiation problem, against about 33 percent who read the insufficient-intensity version."),
"Lightbulb with vs without the radiation source": dict(
    a=side("With the radiation problem as a source", "The tumor and the filament are both targets needing a strong local effect, and healthy tissue and fragile glass are both surroundings that a single strong approach would damage. About 81 percent solved the lightbulb problem."),
    b=side("Without the source (control)", "About 10 percent solved the lightbulb problem."),
    diff="The radiation problem works as a source because it shares the structure, and the surface features also overlap, since both direct a beam toward an internal target, which makes the link easier to notice.",
    example="Ruth's sealed lightbulb has a broken filament, and several low-intensity lasers from different directions fuse it without breaking the glass.",
    watch="The solution is several weak beams converging, not one strong beam."),
"Experts vs novices organizing problems": dict(
    example="Chi et al. (1982) had physics professors and students sort 24 physics problems into groups by similarity."),
"Meaningful vs random chess positions": dict(
    a=side("Actual game positions", "A master sees familiar groups of pieces and recalls each group as one chunk drawn from long-term memory."),
    b=side("Random arrangements", "The same kinds of pieces on the same board with no meaningful relationships, so there are no familiar chunks and the master must remember piece by piece."),
    diff="Chase and Simon (1973) compared a chess master with a beginner who had fewer than 100 hours of experience, giving each five seconds with the board. The master was much better on real positions and the advantage was greatly reduced on random ones, so the edge comes from organized domain knowledge and not a general memory advantage.",
    example="The pieces were of the same kinds in both conditions, and only the meaning of the arrangement changed.",
    watch="A chess master does not have a better memory in general."),
"Comparing sources vs using one source": dict(
    a=side("Using one source", "Applying a single familiar story or problem to a new target, so what you notice depends on how much the target looks like that source."),
    b=side("Analogical encoding", "Comparing two sources and working out what they share, for example two stories in which separate weak forces converge on one target."),
    diff="With one source, the structure is buried in that story's details. With two sources the details do not match, so what is left in common is the structure, which directs reasoning toward structural features. A later target can then be approached through the common relationship and not through one familiar situation.",
    example="Compare the fortress story with a second convergence story, then try the radiation problem.",
    watch="Analogical encoding is about comparing sources, not about being reminded of one."),
"Laboratory analogies vs in vivo analogies": dict(
    a=side("Laboratory tasks", "Researchers give a source and a target under controlled conditions, and people often fail to use the analogy on their own, as when the fortress story helped only about 30 percent."),
    b=side("In vivo problem solving", "Researchers observe people solving real problems in their ordinary setting, where analogies are used routinely."),
    diff="This is the analogical paradox: analogies are hard to use in the laboratory and routine in real work. In vivo research keeps the ordinary context but is time-consuming and gives up control of variables, while laboratory work isolates variables but removes the context.",
    example="Fortress to radiation gave about 30 percent unprompted, while scientists use about 3 to 15 analogies in a one-hour laboratory meeting."),
"Expert strengths vs expert limits": dict(
    a=side("Within the field", "An expert is extremely knowledgeable after a very long time learning and practicing, perhaps 10,000 to 20,000 hours for chess. Experts solve problems in their field faster and more successfully than beginners and spend more time analyzing before proceeding."),
    b=side("Outside the field and in new situations", "The advantage is specific to the field, so experts are no better than novices outside it. Too much knowledge can lock in a familiar approach and make the expert less open to new ways of looking at a problem."),
    diff="The same knowledge causes both. It lets experts recognize the principle behind a problem, as in Chi et al. (1982), but when a problem needs the usual procedure dropped, the knowledge can act like a mental set.",
    example="Physics professors in Chi et al. (1982) sorted problems by principle, which is a strength. A familiar procedure dominating, as in the water-jug problems, shows the limit.",
    watch="Expert does not mean better at everything."),
"Conjunction rule vs representativeness": dict(
    a=side("Conjunction rule", "Two things together can never be more probable than either alone, because every case where both are true is also a case where each is true."),
    b=side("Representativeness", "Judging by how well a description fits a typical case, so a more detailed story that fits the person better feels more probable."),
    diff="One is a rule about nested sets and the other is a shortcut by resemblance. They conflict when the combined description fits better than its single part. About 82 percent chose that Linda is a bank teller and active in the feminist movement over bank teller alone, but feminist bank tellers are a subset of bank tellers.",
    watch="More detail can make a story fit better but never makes it more probable."),
"Number of winners vs probability of winning": dict(
    a=side("Attending to the number of favorable items", "Seven red beans looks like more chances than one red bean."),
    b=side("Using the probability", "Seven in 100 is 7 percent and one in 10 is 10 percent, so the bowl with fewer red beans is better."),
    diff="A larger number of favorable items draws attention away from the denominator, the total number of possible draws. The decision then depends on considerations other than the actual probabilities of winning.",
    example="In the jellybean problem a participant earns one dollar for each red bean drawn, and most participants chose the 7-out-of-100 bowl over the 1-out-of-10 bowl."),
"Saving vs not saving Johnny (Tetlock, 2000)": dict(
    title="Outrage by tradeoff type and decision (Tetlock and colleagues, 2000)",
    a=side("Taboo tradeoff", "A sacred value (Johnny's life) is weighed against a secular benefit (one million dollars). Not saving Johnny drew much greater outrage than saving him, and spending the money on other uses instead of the child received the strongest negative response."),
    b=side("Tragic tradeoff", "Two sacred values compete (two children, one available liver). Outrage was similar whether Johnny was saved or not, because either choice leaves a sacred concern unmet."),
    diff="How outraged people are depends on both the type of value conflict and the decision made within it, and that interaction is the finding.",
    example="Tetlock and colleagues (2000) rated moral outrage for each combination of tradeoff type and decision."),
"Money vs symbolic recognition": dict(
    b=side("Symbolic recognition", "Israeli recognition of the historic and legitimate right of Palestinians to their own state and an apology for wrongs done."),
    example="Ginges, Atran, Medin and Shikaki (2007) added to the deal either one billion dollars a year for ten years or the recognition and apology."),
"Incentive (Taboo+) vs disincentive (Taboo-)": dict(
    diff="Incentives change the benefit of accepting, and disincentives change the cost of refusing. In the study by Dehghani and colleagues (2009, 2010), participants with a sacred value showed lower approval for energy with both the incentive and the sanction than with the baseline.",
    example="Dehghani and colleagues (2009, 2010) asked Iranian participants about a deal to give up their nuclear program, with or without an incentive or a sanction."),
"Participants with vs without a sacred value (Dehghani)": dict(
    diff="For energy, anticipated anger was highest with the incentive and elevated with sanctions for those holding a sacred value. For participants without a sacred value, the deals barely mattered."),
"Net lives saved vs reluctance to cause a loss": dict(
    a=side("Net-count reasoning", "Choosing the option that saves more overall. Rerouting the convoy saves 1,000 at a second camp and costs 100 at the first, a net of 900."),
    b=side("Reluctance to cause a loss", "Resisting an action that makes others die even when more are saved elsewhere. In Ritov and Baron (1999), 63 percent did not choose to reroute."),
    diff="Counting treats the lives lost by acting and the lives lost by not acting the same, but many people do not, and some would keep the original route even if only one person at the first camp would die. The better net count did not decide the choice.",
    example="In the convoy dilemma, food trucks are traveling to a refugee camp during a famine."),
"Expected utility theory vs real choices": dict(
    a=side("Expected utility theory", "Assumes rational people with all relevant information choose the option with the highest expected utility, which combines how valuable each outcome is with its chance. The monetary version uses the highest expected payoff."),
    b=side("Real choices", "People find value in things other than money, and many decisions do not maximize the probability of the best outcome."),
    diff="The theory gives a procedure for the best choice, but people are not utility-maximization machines, so it describes what a maximizer would do and not what people do.",
    example="Casino gambling: people choose it despite knowing the odds are strongly against them.",
    watch="Utility is how desirable an outcome is to the person, which is not the same as money."),
"Valid vs true": dict(
    watch="Validity and truth can come apart in both directions: a valid argument can have a false conclusion, and an invalid one can have a true conclusion."),
"Modus tollens vs syllogism 3": dict(
    a=side("Modus tollens", "From if p then q, plus not q, you may conclude not p. This form is valid."),
    b=side("Syllogism 3", "From if p then q, plus q, you may not conclude p. This form is not valid, and only 40 percent judged it correctly."),
    watch="The first premise says what follows from being in Tucson, not that Tucson is the only way to be in Arizona."),
"Syllogism 3 vs syllogism 4": dict(
    example="If I study I'll get a good grade; I did not study; so I did not get a good grade does not follow, because a good grade could come another way."),
"Inductive vs deductive reasoning": dict(
    example="Seeing many white swans and expecting the next to be white is inductive. Checking whether a conclusion follows from two premises is deductive."),
"Abstract vs concrete Wason problem": dict(
    b=side("Concrete version", "The rule is 'If drinking beer, then 21 years old', with cards Beer, Soda, 16 years old and 21 years old. The correct cards are beer and 16 years old, and 73 percent answered correctly.")),
"Permission schema vs plain familiarity": dict(
    a=side("Permission schema", "Stored knowledge that if a condition is satisfied, an action may be carried out, for example that being 21 permits drinking beer. It leads you to check for anyone doing the action without the condition."),
    b=side("Plain familiarity", "Simply having experience with the content. By itself it does not always improve reasoning."),
    watch="The setting helps when it calls up a permission schema, and familiarity alone is not the reason."),
"Gain frame vs loss frame": dict(
    a=side("Gain frame", "Outcomes are described as people saved. Program A saves 200 for certain, while Program B has a 1/3 chance that all 600 are saved and a 2/3 chance that none are. 72 percent chose the sure A, a risk-averse choice."),
    b=side("Loss frame", "The same outcomes are described as people who die. Program C means 400 die for certain, while Program D has a 1/3 chance that no one dies and a 2/3 chance that 600 die. 78 percent chose the gamble D, a risk-taking choice."),
    diff="Program A is the same outcome as C, and B is the same gamble as D, so only the wording changed (Tversky and Kahneman, 1981). In the gain frame people avoid the uncertain option, and in the loss frame they accept uncertainty in the hope of avoiding a certain loss.",
    example="600 people are expected to die, and the choice is between a sure option and a gamble."),
"Expected emotions vs incidental emotions": dict(
    watch="A person's general disposition counts as an incidental source, so it can change a decision even when it has nothing to do with the choice."),
"Sadness vs disgust: buying and selling prices (Lerner, 2004)": dict(
    a=side("Sadness", "Lowered the selling price to about $3.00 but raised the buying price to about $4.50."),
    b=side("Disgust", "Lowered both prices: selling about $2.70 versus $4.50 neutral, and buying about $3.00 versus $3.50 neutral."),
    watch="Do not group the two emotions together, because they differ on the buying price."),
"Cloudy vs sunny days (Simonsohn)": dict(title="Cloudy vs sunny days (Simonsohn, 2007, 2009)"),
"Rational responder vs actual responder": dict(
    diff="Emotion is important in decision making, and it can lead people to give up money. In Sanfey and colleagues (2003), fair offers of $5 and $5 and $7 and $3 were accepted almost every time, while lower offers were often rejected. Neuroeconomics combines psychology, neuroscience and economics to study this."),
}

# Validity vs believability replaces the two deleted belief-bias pairs.
NEW = [
C(13, "Validity vs believability (belief bias and mental models)", ["belief bias", "believable", "mental model"],
  ("Validity", "Asks whether the conclusion must follow if the premises are true. It depends on the form of the argument and not on what the words say."),
  ("Believability", "Asks whether the conclusion sounds true given what you know. Belief bias is judging a syllogism valid because its conclusion is believable."),
  "These are separate questions, and belief bias is answering the second when asked the first: 71 percent judged invalid syllogisms with believable conclusions as valid. The mental model approach (Johnson-Laird, 1999) is the safeguard. You build a model of the premises, form a tentative conclusion, then search for an exception where the premises hold but the conclusion fails, and the conclusion is valid only if no such model exists.",
  "All of the students are tired, some tired people are irritable, so some of the students are irritable. It seems reasonable but is invalid.",
  "A believable conclusion does not make a syllogism valid, and an unbelievable one does not make it invalid."),

# ---- pairs the board found missing ----
C(6, "Short-term memory vs long-term memory", ["short-term memory", "long-term memory", "retrieve"],
  ("Short-term memory", "Holds about five to seven items for roughly fifteen to twenty seconds and is easily disrupted by interruption and interference."),
  ("Long-term memory", "Retains large amounts of information for years or even decades."),
  "Rehearsal moves information from short-term toward long-term memory, and retrieval moves it back, so the flow goes both ways and not only toward storage. Short-term memory is the active window on the present, and long-term memory is the large body of knowledge stored outside current awareness.",
  "You look up a phone number, repeat it to keep it in short-term memory, and later retrieve it from long-term memory back into short-term memory to dial it.",
  "Do not treat long-term memory as simply more of short-term memory. They differ in capacity and in duration."),
C(6, "Declarative vs procedural memory", ["declarative", "procedural"],
  ("Declarative memory", "Long-term memory for events and knowledge, with two branches: episodic memory for events and semantic memory for facts."),
  ("Procedural memory", "Long-term memory for skills."),
  "The memory tree sorts long-term memory by function and not by how long things last. Declarative memory is what you can state, and procedural memory is what you can do.",
  "Knowing what a bicycle is is declarative, and knowing how to ride one is procedural.",
  "Episodic and semantic memory are both inside declarative memory."),
C(6, "Encoding, storage and retrieval failure", ["encoding", "storage", "retrieval"],
  ("Encoding and storage", "Encoding converts information into a form that can be stored, and storage keeps it."),
  ("Retrieval", "Bringing stored information back out when it is needed."),
  "A failure to remember could come from a problem at any of the three operations, so forgetting on its own does not show which one failed. Memory is also an active system that can organize and even alter information, so it is not a recording kept unchanged.",
  "Forgetting a familiar name could mean it was never encoded well, was lost from storage, or cannot be retrieved right now.",
  "Do not name the failed stage from the failure alone."),
C(6, "Simple vs complex objects in visual short-term memory", ["alvarez", "complexity", "polygon"],
  ("Simple objects", "Objects such as colored squares need little information to represent, so more of them can be held."),
  ("Complex objects", "Objects such as polygons, shaded cubes or Chinese-character-like forms need more information to represent, so fewer can be held."),
  "Alvarez and Cavanagh (2004) found that same-different performance depends on how complex the stimuli are, so capacity is constrained by the amount of information needed to represent the objects. A capacity for one category of stimulus is not a universal estimate for all visual objects.",
  "Colored squares supported a higher estimated capacity than shaded cubes in the change-detection task.",
  "Do not count every object as an equally sized item."),
C(10, "Triangle problem vs chain problem", ["triangle problem", "chain problem", "metcalfe"],
  ("Triangle problem", "Ten dots form an upward-pointing triangle, and you must move exactly three dots to make it point down, with seven staying in place."),
  ("Chain problem", "Four short sections of chain must become one closed loop, where opening a link costs 2 cents, closing it costs 3 cents and the budget is 15 cents."),
  "Both are insight problems used by Metcalfe and Wiebe (1987), and both are solved by a change in representation. In the triangle the top dot becomes a new bottom point, and in the chain one three-link section is opened into separate links that join the other three sections.",
  "Metcalfe and Wiebe (1987) compared both with algebra and found warmth jumped late for them, from about 3 to 7.",
  "In the chain problem three open-and-close operations use the full 15 cents."),
C(10, "Problem vs knowing the goal", ["obstacle", "numbered-tile", "present state"],
  ("A problem", "A situation with a present state, a goal and an obstacle between them, where the solution is not immediately obvious."),
  ("Stating the goal", "Being able to describe exactly what the finished situation looks like."),
  "The difficulty is the route and not whether the goal has been stated. In the numbered-tile puzzle you can describe the goal arrangement exactly and still not know the sequence of moves that gets there.",
  "The initial state is 8, empty, 6 over 5, 4, 7 over 2, 3, 1, and the goal is empty, 1, 2 over 3, 4, 5 over 6, 7, 8.",
  "A tile being on the board does not mean it is in its required position, because the whole arrangement defines the state."),
C(11, "Russian marriage problem vs mutilated checkerboard", ["russian marriage", "checkerboard", "analogical"],
  ("Russian marriage problem (source)", "There are 32 bachelors and 32 unmarried women. After two bachelors die, 30 men and 32 women remain and the question is whether 31 heterosexual marriages can be formed. The answer is no."),
  ("Mutilated checkerboard (target)", "Removing two opposite corners leaves 62 squares, which matches the area of 31 dominoes, but the two removed squares are the same color so the covering is impossible."),
  "Marriages correspond to dominoes, the two groups of people correspond to the two square colors, and removing two bachelors corresponds to removing two same-colored squares. The useful information transferred from the source is the relationship among the elements and not their identical appearance.",
  "A valid marriage needs one member of each group, just as a domino needs one square of each color.",
  "Dividing 62 by two gives 31 pairs by total size but ignores which kinds each pair must contain."),
C(11, "Having an idea vs creative problem solving", ["creative", "divergent"],
  ("Having an idea", "Generating a novel idea or new connection. Divergent thinking is open-ended and allows many potential solutions."),
  ("Creative problem solving", "A fuller process that includes problem generation, formulation, solving with evaluation and planning, and solution implementation, usually after a lengthy period of trial and error."),
  "Ideas are necessary, since without them the process stops, but generating them does not evaluate, plan or carry out a response.",
  "Finding the problem, defining it and finding ideas come before evaluating and acting on them.",
  "Creativity is more than getting an idea."),
C(12, "Easy to recall vs actually frequent (availability)", ["r-words", "botulism", "asthma", "availability"],
  ("Easy to bring to mind", "Events or words that are distinctive, emotionally salient or retrieved easily, which makes them feel more numerous."),
  ("Actually frequent", "How often the event or word really occurs."),
  "About 70 percent say English has more words beginning with r than words with r as the third letter, but r-third words are about three times more common. A death from botulism can be front-page news while asthma deaths go virtually unnoticed, so people pick the less likely cause.",
  "Retrieving words by first letter is easier, so those words feel more numerous.",
  "Memorability is not frequency."),
C(12, "Illusory correlation vs a real association", ["illusory correlation", "stereotype"],
  ("Illusory correlation", "A relationship that appears to exist even though it does not exist or is much weaker than assumed."),
  ("Real association", "A relationship that is actually present in the data."),
  "Stereotypes direct attention to behaviors that fit the expected description, and remembering the matching instances makes the stereotype feel supported. Stereotype-consistent behaviors are easier to bring to mind, and their availability is mistaken for evidence that the behavior is strongly associated with the group.",
  "A stereotype feels confirmed because the fitting instances were noticed and retained.",
  "The apparent evidence is shaped by what was noticed and remembered."),
C(12, "Feared event vs actual risk (after September 11)", ["september 11", "driving"],
  ("Emotional impact", "The fear produced by the attacks led to a decision based on how the event felt."),
  ("Relative probability", "The probability of dying in a car accident is much greater than while flying."),
  "After September 11, air travel decreased and driving increased. The reported number of Americans who died on the road while avoiding flying exceeded the total number of passengers killed on the four hijacked flights.",
  "Avoiding the feared event increased exposure to a more likely danger.",
  "Emotional impact and probability are different bases for a decision."),
C(12, "Decision vs judgment vs reasoning", ["judgment", "reasoning", "inductive"],
  ("Decision", "The process of choosing between alternatives."),
  ("Judgment and reasoning", "Reasoning is the process of drawing conclusions, and decisions are based on the judgments people make."),
  "Inductive reasoning, from observations to conclusions that are probably but not definitely true, is one of the primary mechanisms involved in making judgments.",
  "In everyday life people use past experience to predict what will happen, especially in familiar situations.",
  "A decision is a choice, and a judgment is an estimate that feeds it."),
C(13, "Context of a decision (cesarean case)", ["cesarean", "context"],
  ("Seen alone", "Physicians read the hypothetical cesarean test case by itself as the control."),
  ("Seen after other cases", "Physicians read the same case after four cases with serious complications, or after four fairly routine cases."),
  "Significantly more doctors recommended cesarean after reading the non-serious cases first, so the cases just considered changed how the same patient was judged.",
  "The identical patient was judged differently depending on the cases read before.",
  "Decisions depend on context and on how choices are presented."),
C(13, "Emotion as a help vs a hindrance in decisions", ["emotion", "prefrontal", "anxious"],
  ("Emotion that helps", "People with damage to an area of the prefrontal cortex who have flattened emotions have impaired decision making, so emotion takes part in decisions."),
  ("Emotion in excess", "Anxious people tend toward risk avoidance, and optimistic people ignore negative information, which in excess can lead to poor decisions."),
  "Emotions take part in decision making and do not only get in its way. Whether they help depends on how they push the choice.",
  "Passing up choices that could lead to large negative consequences is the anxious pattern.",
  "Emotion is not simply the opposite of good decision making."),
C(13, "Categorical vs conditional syllogism", ["categorical syllogism", "conditional syllogism", "if p"],
  ("Categorical syllogism", "Describes the relation between two categories using all, no or some, such as All birds are animals, All animals eat food, therefore all birds eat food."),
  ("Conditional syllogism", "Has a first premise of the form If p, then q, where p is the condition and q is what follows."),
  "Both have two premises and a conclusion, and Aristotle introduced the syllogism. The conditional kind has four types that differ in the second premise, two valid and two not valid.",
  "If I study I'll get a good grade is a conditional first premise.",
  "A syllogism can be invalid even when every statement seems reasonable."),
]
