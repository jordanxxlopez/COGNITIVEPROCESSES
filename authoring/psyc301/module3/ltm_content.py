"""Collection 16 · Long-Term Memory: Structure (Module III, source id 15).

Authored from sources/CogPsych_Ch06_LTM_F26.pdf, one entry per source slide, in source order.
Each slide has an Original transcript (HTML paragraphs that keep the slide wording in bold) and a
Version 22 transcript (main points with sub-points, researchers and years in the sentences).
Researcher names and years are written as the slides give them.
"""

SECTIONS = []


def slide(page, title, original=(), v22=(), core=None):
    SECTIONS.append(dict(page=page, title=title, original=list(original),
                         v22=[dict(text=t, children=list(c)) for t, c in v22], core=core))


slide(1, 'Long-Term Memory: Structure · title')
slide(2, 'Comparing Short-Term and Long-Term Memory Processes · divider')

slide(3, 'Long-term memory',
 original=[
  '<strong>Long-term memory (LTM)</strong> is an <strong>“archive” of information about past events and knowledge learned</strong>. An archive is a place where records are kept so they can be found again later. Long-term memory keeps both what has happened to a person and what the person has learned.',
  'Long-term memory <strong>works closely with working memory</strong>. Working memory holds the information a person is using right now, and it draws on long-term memory to make sense of that information. The two systems operate together instead of taking turns.',
  'The <strong>storage stretches from a few moments ago to as far back as one can remember</strong>. Long-term memory therefore covers both very recent events and very old ones. <strong>More recent memories are more detailed</strong>, and older memories keep fewer details.'],
 v22=[
  ('**Long-term memory (LTM)** is the system that stores information for long periods of time. It is an **archive** of information about **past events** and **knowledge a person has learned**.',
   ['An archive is a place where records are kept so they can be found again later.']),
  ('Long-term memory **works closely with working memory**. Working memory holds what a person is using right now, and it draws on long-term memory to make sense of it.', []),
  ('Long-term memory covers a very wide span of time. It stretches **from a few moments ago to as far back as a person can remember**.',
   ['**More recent memories are more detailed.** Older memories keep fewer details.'])])

slide(4, 'Long-term memory covers recent and distant events',
 original=[
  'A student who has just sat down in class shows how the two memory systems divide up time. The thought <strong>“I just sat down,”</strong> from about <strong>30 seconds ago</strong>, is still held in <strong>short-term memory (STM)</strong>. Everything that happened before that point belongs to <strong>long-term memory (LTM)</strong>.',
  'Long-term memory holds events from very different times. The student remembers <strong>walking to class 5 minutes ago</strong>, <strong>shopping for clothes yesterday</strong>, <strong>going to the football game last week</strong>, <strong>starting college one year ago</strong>, and <strong>elementary school 10 years ago</strong>. All of these are long-term memories, even the one from only 5 minutes ago.',
  'Recent long-term memories are strong and detailed, and old ones are faint. The memory of walking to class is rich in detail, while the memory of elementary school keeps few details.'],
 v22=[
  ('A student has just sat down in class. The thought **“I just sat down,”** from about **30 seconds ago**, is still in **short-term memory (STM)**.',
   ['Everything that happened before that point is in **long-term memory (LTM)**.']),
  ('Long-term memory holds events from very different times. The student remembers walking to class **5 minutes ago**, shopping **yesterday** and a football game **last week**. The student also remembers starting college **one year ago** and elementary school **10 years ago**.',
   ['A memory from only 5 minutes ago is already a long-term memory.']),
  ('The recent memories are strong and detailed, and the old memories are faint. This fits the rule that **more recent memories are more detailed**.', [])])

slide(5, 'Murdoch (1962) and the serial position curve',
 original=[
  '<strong>Murdoch (1962)</strong> studied the <strong>distinction between short-term and long-term memories using the serial position curve</strong>. Participants had a <strong>stimulus list read</strong> to them and then had to <strong>write down all words remembered</strong>. They could write the words in any order.',
  'The <strong>serial position curve</strong> plots the <strong>percent recalled</strong> for each word against its <strong>serial position</strong>, which is the place the word held in the list. A word in position 1 was presented first, and a word in position 20 was presented last.',
  'Recall was not the same across the list. Words at the beginning of the list were recalled better than words in the middle, which is the <strong>primacy effect</strong>. Words at the end of the list were recalled best of all, which is the <strong>recency effect</strong>. Words in the middle were recalled the least.'],
 v22=[
  ('**Murdoch (1962)** used the **serial position curve** to separate short-term memory from long-term memory. Participants heard a list of words and then **wrote down all the words they remembered**.',
   ['They could write the words in any order.']),
  ('The **serial position curve** shows the percent recalled for each word, based on the word’s **serial position**. Serial position is the place the word had in the list.', []),
  ('In **Murdoch (1962)**, recall depended on where the word was in the list. Words at the **beginning** were recalled well, which is the **primacy effect**. Words at the **end** were recalled best, which is the **recency effect**.',
   ['Words in the middle of the list were recalled the least.'])])

slide(6, 'The primacy effect',
 original=[
  'The <strong>primacy effect</strong> is that <strong>memory is better for stimuli presented at the beginning</strong> of a list. In the serial position curve, the first few words are recalled more often than the words in the middle of the list.',
  'The primacy effect occurs because the words at the beginning <strong>gave more time to rehearse</strong> the information. The first word can be rehearsed alone, but each later word has to share rehearsal with all the words that came before it. Rehearsal makes information <strong>more likely to enter long-term memory (LTM)</strong>, so the early words are recalled from long-term memory.',
  'Rehearsal counts support this explanation. When participants repeat the words out loud as the list is presented, the <strong>mean number of rehearsals</strong> is highest for the first words and drops for later words. The percent recalled for the early positions follows the same drop, so more rehearsal goes with better recall.'],
 v22=[
  ('The **primacy effect** is better memory for the words presented **at the beginning** of a list.', []),
  ('The primacy effect happens because the first words get **more time to be rehearsed**, which means repeated. More rehearsal makes a word **more likely to enter long-term memory (LTM)**.',
   ['The first word can be rehearsed alone. Each later word has to share rehearsal time with the words before it.',
    'So the early words are recalled from **long-term memory**.']),
  ('Counting rehearsals supports this. The first words in the list are rehearsed the most, and the number of rehearsals drops for later words.',
   ['Recall for the early words drops in the same way, so more rehearsal goes with better recall.'])],
 core='Serial position curve')

slide(7, 'The recency effect',
 original=[
  'The <strong>recency effect</strong> is that <strong>memory is better for stimuli presented at the end of the list</strong>. The explanation is that these <strong>stimuli are still in STM</strong> when recall begins. The last few words were just presented, so participants can write them down straight from short-term memory.',
  'The <strong>evidence that the recency effect is due to STM</strong> comes from delaying recall. With <strong>no delay</strong>, recall rises sharply for the last words in the list. With a <strong>30-second delay</strong> between the end of the list and recall, that rise disappears, so the <strong>30-sec delay eliminates the recency effect</strong>.',
  'After the delay, the last words have no advantage over the middle words, which is the result expected if their advantage came from short-term memory. The primacy effect remains after the delay, because the early words are held in long-term memory. The curve therefore shows two memory systems at work, with long-term memory at the start of the list and short-term memory at the end.'],
 v22=[
  ('The **recency effect** is better memory for the words presented **at the end** of a list. It happens because those words are **still in short-term memory (STM)** when recall begins.', []),
  ('A delay tests this explanation. With **no delay**, recall is high for the last words. With a **30-second delay** before recall, the recency effect **disappears**.',
   ['After the delay, the last words are recalled no better than the middle words. This supports the idea that their advantage came from short-term memory.',
    'The primacy effect stays after the delay, because the early words are in long-term memory.']),
  ('The serial position curve therefore shows two memory systems. The **primacy effect** comes from **long-term memory**, and the **recency effect** comes from **short-term memory**.', [])],
 core='Serial position curve')

slide(8, 'Coding in short-term and long-term memory',
 original=[
  '<strong>Coding</strong> is the form in which information is represented in memory. The same word can be held as how it looks, how it sounds, or what it means. There is <strong>visual and auditory encoding in short- and long-term memory</strong>, so both systems can hold information by its appearance or by its sound.',
  'There is also <strong>semantic encoding in short- and long-term memory</strong>. Semantic encoding represents information by its meaning. Short-term memory is often described as relying on sound, but it can code by meaning as well.',
  '<strong>Wickens and colleagues (1976)</strong> demonstrated semantic coding in short-term memory. They found that <strong>interference</strong> was <strong>enhanced by the meanings of words</strong>. Interference built up when the words on successive trials came from the same meaning category, and recall recovered when the category changed. That recovery can only happen if short-term memory registers what the words mean.'],
 v22=[
  ('**Coding** is the form in which information is represented in memory. A word can be held by how it looks, how it sounds or what it means.', []),
  ('**Visual** and **auditory** coding occur in both short-term and long-term memory. **Semantic** coding, which is coding by meaning, also occurs in both.', []),
  ('**Wickens and colleagues (1976)** showed semantic coding in short-term memory. They found that **interference depended on the meaning category of the words**.',
   ['Interference is when earlier words make later words harder to remember.',
    'Interference could only depend on meaning if short-term memory was registering what the words mean.'])])

slide(9, 'Wickens and colleagues (1976): the two groups',
 original=[
  'In <strong>Wickens and colleagues (1976)</strong>, each trial presented three words, and participants then tried to recall them. There were four trials and two groups. The groups differed only in the meaning categories of the words.',
  'The <strong>fruits group</strong> received fruit names on every trial. Trial 1 was banana, peach and apple. Trial 2 was plum, apricot and lime. Trial 3 was melon, lemon and grape. Trial 4 was orange, cherry and pineapple. All four trials came from the same category.',
  'The <strong>professions followed by fruits</strong> group received professions on the first three trials. Trial 1 was lawyer, firefighter and teacher. Trial 2 was dancer, minister and executive. Trial 3 was grocer, doctor and editor. On Trial 4 this group received the same fruits as the other group, orange, cherry and pineapple, so the category changed from professions to fruits.'],
 v22=[
  ('In **Wickens and colleagues (1976)**, people were given three words on each trial and then tried to recall them. There were four trials and two groups.', []),
  ('The **fruits group** got fruit names on **all four trials**. Every trial came from the same meaning category.', []),
  ('The **professions followed by fruits group** got professions on **Trials 1 to 3** and fruits on **Trial 4**. For this group the meaning category changed on the last trial.',
   ['Both groups got the same fruit words on Trial 4, so only the earlier trials differed.'])])

slide(10, 'Wickens and colleagues (1976): proactive interference and release',
 original=[
  'In the <strong>fruits group</strong> of <strong>Wickens and colleagues (1976)</strong>, the <strong>percent recalled</strong> fell from more than 80 percent on Trial 1 to below 30 percent on Trial 4. This drop is <strong>proactive interference (PI)</strong>, which occurs when information learned earlier interferes with learning new information. The fruit names from earlier trials made the later fruit names harder to remember.',
  'In the <strong>professions followed by fruits</strong> group, recall also fell across the first three trials, because the professions interfered with one another. On Trial 4, when the words changed to fruits, recall rose again to about 70 percent. This recovery is <strong>release from PI</strong>.',
  'Release from proactive interference occurred because the fruits belonged to a different meaning category from the professions. The earlier professions did not interfere with the fruits. Interference therefore depended on the <strong>meanings of the words</strong>, which shows that short-term memory was coding the words <strong>semantically</strong>.'],
 v22=[
  ('In the **fruits group** of **Wickens and colleagues (1976)**, recall dropped on each trial. This drop is **proactive interference (PI)**, which is when earlier information makes new information harder to remember.',
   ['The fruits from earlier trials interfered with the fruits on later trials.']),
  ('In the **professions followed by fruits group**, recall also dropped over the first three trials. On **Trial 4**, when the words changed to fruits, recall went back up. This recovery is **release from proactive interference**.',
   ['Recall recovered because fruits are a different meaning category from professions, so the professions did not interfere with them.',
    'Both groups got the same fruits on Trial 4, yet this group recalled far more of them than the fruits group.']),
  ('**Wickens and colleagues (1976)** therefore showed **semantic coding in short-term memory**. Interference depended on the **meaning** of the words, so short-term memory must have been coding meaning.', [])],
 core='Semantic coding in short-term memory')

slide(11, 'Semantic coding in long-term memory',
 original=[
  'There is <strong>semantic coding in long-term memory</strong>, which means long-term memory represents information by its meaning. One way to measure this is with <strong>recognition memory</strong>, the <strong>identification of a previously encountered stimulus</strong>. In a recognition test, a person is shown an item and judges whether it was presented before.',
  '<strong>Sachs (1967)</strong> used recognition memory to ask whether <strong>participants remember wording versus meaning</strong>. The answer was meaning. After a delay, participants could tell when the meaning of a sentence had changed, but they could no longer tell when only the wording had changed.'],
 v22=[
  ('Long-term memory uses **semantic coding**, so it stores information by its **meaning**.', []),
  ('**Recognition memory** is the **identification of a stimulus that was encountered before**. In a recognition test, a person sees an item and judges whether it was presented earlier.', []),
  ('**Sachs (1967)** used recognition memory to test whether people remember the **wording** of a sentence or its **meaning**. People remembered the **meaning**.',
   ['After a delay, they noticed changes in meaning but did not notice changes in wording.'])])

slide(12, 'Sachs (1967): the task',
 original=[
  'In <strong>Sachs (1967)</strong>, <strong>participants listened to tape-recorded passages of connected prose</strong>, such as short stories or historical passages. One sentence within each passage was the target. An example of an <strong>original target sentence</strong> is <strong>“He sent a letter about it to Galileo, the great Italian scientist.”</strong>',
  'The manipulation was the <strong>delay before the test</strong>. After the target sentence, the recording was interrupted <strong>immediately (0 syllables later)</strong>, <strong>after 80 syllables (about 27 seconds)</strong>, or <strong>after 160 syllables (about 46 seconds)</strong>. Participants then received a <strong>surprise recognition test</strong>.',
  'Participants judged whether a test sentence was <strong>identical</strong> to the one they heard or had been <strong>changed</strong>. A <strong>semantic change</strong> altered the meaning, as in “Galileo, the great Italian scientist, sent him a letter about it,” where who sent the letter is reversed. A <strong>syntactic (passive-active) change</strong> altered the grammar but preserved the meaning, as in “A letter about it was sent to Galileo, the great Italian scientist.” A <strong>formal (word-order) change</strong> altered the surface wording but preserved the meaning, as in “He sent Galileo, the great Italian scientist, a letter about it.”'],
 v22=[
  ('In **Sachs (1967)**, people listened to **tape-recorded passages**. One sentence in the passage was the target, such as **“He sent a letter about it to Galileo, the great Italian scientist.”**', []),
  ('The recording stopped **right after** the target sentence, **80 syllables later** (about 27 seconds) or **160 syllables later** (about 46 seconds). People then got a **surprise recognition test**.',
   ['They judged whether a test sentence was identical to the one they heard or had been changed.']),
  ('The test sentence could be changed in three ways. A **semantic change** altered the **meaning**, so that Galileo sent the letter. A **syntactic change** made the sentence passive but kept the meaning. A **formal change** moved the words around but kept the meaning.',
   ['Only the semantic change altered what the sentence meant.'])])

slide(13, 'Sachs (1967): results',
 original=[
  'At <strong>0 syllables delay</strong>, the immediate test, participants in <strong>Sachs (1967)</strong> <strong>accurately spotted both changes in exact wording and grammar and changes in meaning</strong>. They could do this <strong>because the sentence was still active in working memory</strong>.',
  '<strong>After 80 or 160 syllables delay</strong>, <strong>memory for exact wording and grammar</strong> fell to <strong>near-chance levels</strong>. Participants could not tell whether the sentence had been active or passive. <strong>Memory for meaning remained very high</strong>, at about <strong>80 percent accuracy</strong>, and participants immediately noticed when the meaning had changed.',
  'These results show the difference between <strong>gist</strong> and <strong>verbatim</strong> memory. <strong>Long-term memory stores the abstract meaning (gist) of an experience rather than a verbatim tape recording of the exact words.</strong> The exact wording is lost within seconds, while the meaning is kept, which is semantic coding in long-term memory.'],
 v22=[
  ('In **Sachs (1967)**, people tested **immediately** noticed every kind of change, in wording and in meaning. This is because the sentence was **still active in working memory**.', []),
  ('**After a delay of 80 or 160 syllables**, people could **no longer detect changes in wording or grammar**. Their accuracy for those changes fell to near chance, which is the score a person gets by guessing.',
   ['They still **detected changes in meaning** about **80 percent** of the time.']),
  ('**Sachs (1967)** showed that long-term memory stores the **gist**, which is the general meaning. It does not store a **verbatim** record, which is a word-for-word copy.',
   ['This is semantic coding in long-term memory.'])],
 core='Sachs (1967)')

slide(14, 'Examples of coding in short-term and long-term memory',
 original=[
  '<strong>Visual coding</strong> occurs in both systems. In short-term memory, it is <strong>holding an image in the mind to reproduce a visual pattern that was just seen (Della Sala et al., 1999)</strong>. In long-term memory, it is <strong>visualizing what the Lincoln Memorial in Washington, D.C., looked like when you saw it last summer</strong>.',
  '<strong>Auditory coding</strong> also occurs in both. In short-term memory, it is <strong>representing the sounds of letters in the mind just after hearing them (Conrad, 1964)</strong>. In long-term memory, it is <strong>repeating a song you have heard many times before, over and over in your mind</strong>.',
  '<strong>Semantic coding</strong> occurs in both as well. In short-term memory, it is <strong>placing words in an STM task into categories based on their meaning (Wickens et al., 1976)</strong>. In long-term memory, it is <strong>recalling the general plot of a novel you read last week (Sachs)</strong>. All three codes therefore appear in both short-term and long-term memory.'],
 v22=[
  ('**Visual coding** occurs in both systems. In short-term memory, a person holds an image in mind to reproduce a pattern that was just seen. **Della Sala and colleagues (1999)** studied this. In long-term memory, a person visualizes a place seen last summer.', []),
  ('**Auditory coding** occurs in both systems. In short-term memory, a person represents the sounds of letters just after hearing them, as in **Conrad (1964)**. In long-term memory, a person replays a familiar song in the mind.', []),
  ('**Semantic coding** occurs in both systems. In short-term memory, words are grouped by meaning, as in **Wickens and colleagues (1976)**. In long-term memory, a person recalls the general plot of a novel, which matches what **Sachs** found.',
   ['All three codes appear in both short-term and long-term memory.'])],
 core='Coding in short-term and long-term memory')

slide(15, 'Locating memory in the brain: H.M. and K.F.',
 original=[
  '<strong>Neuropsychology</strong> studies the behavior of people with brain damage to learn what different brain areas do. Two patients show that short-term memory and long-term memory depend on different parts of the brain.',
  'In <strong>H.M.</strong>, <strong>surgery removed the hippocampus</strong>. He <strong>retained short-term memory (STM) but was unable to transfer information to long-term memory (LTM)</strong>. He was therefore <strong>unable to form new LTMs</strong>. He could hold information for a short time, but it did not become a lasting memory.',
  'In <strong>K.F.</strong>, an <strong>accident damaged the parietal lobe</strong>. K.F. had <strong>impaired STM</strong>, shown by a <strong>reduced digit span</strong>, which is the number of digits a person can repeat back in order. K.F. had <strong>functional LTM</strong> and was <strong>able to form and hold new memories</strong>. K.F. shows the opposite pattern from H.M.'],
 v22=[
  ('**Neuropsychology** studies people with brain damage to learn what different brain areas do.', []),
  ('**H.M.** had surgery that **removed his hippocampus**, a brain area. His **short-term memory still worked**, but he could not transfer information into long-term memory.',
   ['So H.M. was **unable to form new long-term memories**.']),
  ('**K.F.** had an accident that **damaged the parietal lobe**, another brain area. K.F. had **impaired short-term memory**, shown by a reduced digit span. K.F.’s **long-term memory worked**.',
   ['Digit span is the number of digits a person can repeat back in order.',
    'K.F. could still form and hold new memories, which is the opposite pattern from H.M.'])],
 core='Double dissociation for STM and LTM')

slide(16, 'A double dissociation for STM and LTM',
 original=[
  'A <strong>double dissociation</strong> occurs when one patient has function A intact and function B impaired, and another patient has function A impaired and function B intact. This pattern shows that the two functions rely on different mechanisms and can operate independently.',
  '<strong>H.M. and Clive Wearing</strong> have <strong>short-term memory that is OK</strong> and <strong>long-term memory that is impaired</strong>. <strong>K.F.</strong> has <strong>short-term memory that is impaired</strong> and <strong>long-term memory that is OK</strong>.',
  'Together these patients form <strong>a double dissociation for STM and LTM</strong>. Because each kind of memory can be damaged while the other still works, short-term memory and long-term memory are served by different mechanisms in the brain.'],
 v22=[
  ('A **double dissociation** is when one patient has function A working and function B impaired, and another patient has the reverse. It shows that the two functions rely on **different mechanisms**.', []),
  ('**H.M. and Clive Wearing** have **working short-term memory** and **impaired long-term memory**. **K.F.** has **impaired short-term memory** and **working long-term memory**.', []),
  ('These patients form a **double dissociation for short-term and long-term memory**. Each kind of memory can be damaged while the other still works.',
   ['So short-term memory and long-term memory depend on different mechanisms in the brain.'])],
 core='Double dissociation for STM and LTM')

slide(17, 'Episodic and Semantic Memory · divider')

slide(18, 'Episodic and semantic memory',
 original=[
  '<strong>Endel Tulving (1985)</strong> distinguished two kinds of long-term memory by the experience that goes with each one. <strong>Episodic memory involves mental time travel</strong>. It is <strong>tied to personal experience</strong>, and <strong>remembering is reliving</strong>. Tulving described this experience as <strong>“self-knowing.”</strong>',
  '<strong>Semantic memory does not involve mental time travel</strong>. It holds <strong>general knowledge and facts</strong>. Tulving described this experience as <strong>“knowing.”</strong> A person can know a fact without returning to the moment when the fact was learned.',
  'The two kinds of memory therefore differ in the experience of retrieving them. Retrieving an episodic memory means traveling back in the mind to a specific event in one’s own past. Retrieving a semantic memory means accessing knowledge that is not tied to any particular personal event.'],
 v22=[
  ('**Endel Tulving (1985)** separated two kinds of long-term memory by the experience that goes with each one.', []),
  ('**Episodic memory** is memory for **personal experiences**. It involves **mental time travel**, which means going back in the mind to relive the event. Tulving called this **“self-knowing.”**',
   ['Remembering an episodic memory is reliving it.']),
  ('**Semantic memory** is memory for **general knowledge and facts**. It does **not** involve mental time travel. Tulving called this **“knowing.”**',
   ['A person can know a fact without going back to the moment the fact was learned.'])],
 core='Episodic and semantic memory')

slide(19, 'Separation of episodic and semantic memories: K.C. and L.P.',
 original=[
  '<strong>K.C.</strong> had a <strong>damaged hippocampus</strong>. K.C. had <strong>no episodic memory and cannot relive past events</strong>. K.C.’s <strong>semantic memory was intact</strong>, so K.C. <strong>can remember general information about the past</strong>. K.C. can know facts about his own life without being able to relive any of the events.',
  'An <strong>Italian woman, L.P.</strong>, showed the opposite pattern. She had <strong>impaired semantic memory</strong>, so her general knowledge and facts were impaired. Her <strong>episodic memory was intact</strong>, and she <strong>can remember past events and create new event memories</strong>.',
  'In K.C., episodic memory is lost while semantic memory remains. In L.P., semantic memory is impaired while episodic memory remains. The two patients together show that episodic and semantic memory can be damaged separately.'],
 v22=[
  ('**K.C.** had a **damaged hippocampus**. He **lost his episodic memory**, so he cannot relive past events. His **semantic memory was intact**.',
   ['K.C. can still remember general information about the past.']),
  ('The **Italian woman L.P.** had the opposite pattern. Her **semantic memory was impaired**, and her **episodic memory was intact**.',
   ['L.P. can remember past events and form new memories of events.']),
  ('K.C. and L.P. show that episodic memory and semantic memory can be damaged **separately**.', [])],
 core='Episodic and semantic memory')

slide(20, 'A double dissociation for semantic and episodic memory',
 original=[
  '<strong>K.C.</strong> has <strong>semantic memory that is OK</strong> and <strong>episodic memory that is poor</strong>. The <strong>Italian woman L.P.</strong> has <strong>semantic memory that is poor</strong> and <strong>episodic memory that is OK</strong>.',
  'These two patients form <strong>a double dissociation for semantic and episodic memory</strong>. One kind of memory can be lost while the other is preserved, and this occurs in both directions. Episodic memory and semantic memory therefore rely on different mechanisms.'],
 v22=[
  ('**K.C.** has **working semantic memory** and **poor episodic memory**. **L.P.** has **poor semantic memory** and **working episodic memory**.', []),
  ('K.C. and L.P. form a **double dissociation for semantic and episodic memory**. Each kind of memory can be lost while the other still works.',
   ['So episodic memory and semantic memory rely on different mechanisms.'])])

slide(21, 'Levine and colleagues (2004): brain imaging of episodic and semantic memory',
 original=[
  'Brain imaging gives a second kind of evidence for the separation. <strong>fMRI demonstrates that retrieving episodic and semantic memories activates different areas of the brain</strong>.',
  'In the image from <strong>Levine and colleagues (2004)</strong>, <strong>the yellow areas represent brain regions associated with episodic memories</strong>, and <strong>the blue areas represent regions associated with semantic memories</strong>. The yellow and blue areas fall in different places, so the two kinds of retrieval do not use exactly the same brain regions.',
  'The patients showed that one kind of memory can be damaged without the other. The imaging result shows the same separation in brain activity, because the two kinds of memory produce different patterns of activity.'],
 v22=[
  ('**Levine and colleagues (2004)** used **fMRI**, a brain scan that shows which areas are active. Retrieving **episodic** memories and retrieving **semantic** memories **activated different areas of the brain**.',
   ['In their image, the yellow areas go with episodic memories and the blue areas go with semantic memories.']),
  ('This agrees with the patients K.C. and L.P. The patients show the separation through damage, and the imaging shows it through brain activity.', [])])

slide(22, 'How episodic and semantic memory interact',
 original=[
  'Episodic and semantic memory are separate, but they also interact. <strong>Episodic memory can be lost, leaving only semantic memory</strong>. <strong>Acquiring knowledge may start as episodic but then “fade” to semantic</strong>. A person first remembers the event of learning a fact, and later keeps the fact without the memory of when or where it was learned.',
  '<strong>Semantic memory can be enhanced if it is associated with episodic memory</strong>. Knowledge that is connected to a personal experience is easier to remember than knowledge with no personal connection.',
  '<strong>Autobiographical memory</strong> is memory for <strong>specific experiences</strong> from a person’s life, and it <strong>includes semantic and episodic</strong> components. <strong>Personal semantic memory</strong> refers to <strong>semantic memories that have personal significance</strong>, such as facts about one’s own life.'],
 v22=[
  ('Episodic memory can be **lost while semantic memory stays**. Knowledge **may start as episodic and then fade to semantic**.',
   ['A person first remembers the event of learning a fact. Later the person keeps the fact but loses the memory of when and where it was learned.']),
  ('Semantic memory is **stronger when it is connected to an episodic memory**. Knowledge tied to a personal experience is easier to remember.', []),
  ('**Autobiographical memory** is memory for specific experiences from a person’s own life. It includes **both episodic and semantic** parts.',
   ['**Personal semantic memories** are semantic memories that have personal significance, such as facts about one’s own life.'])])

slide(23, 'Types of long-term memory: episodic, semantic and autobiographical',
 original=[
  '<strong>Episodic memory</strong> is <strong>memory for specific personal experiences, involving mental time travel back in time to achieve a feeling of reliving the experience</strong>. An example is <strong>“I remember going to get coffee at Le Buzz yesterday morning and talking with Gil and Mary about their bike trip.”</strong>',
  '<strong>Semantic memory</strong> is <strong>memory for facts</strong>. An example is <strong>“There is a Starbucks down the road from Le Buzz.”</strong> This statement is knowledge that does not require reliving any event.',
  '<strong>Autobiographical memory</strong> is <strong>people’s memories for experiences from their own lives</strong>. These memories have both <strong>episodic components (relived specific events)</strong> and <strong>semantic components (facts related to these events)</strong>. The semantic components of autobiographical memory are <strong>personal semantic memories</strong>. An example is <strong>“I met Gil and Mary at Le Buzz yesterday morning. We sat at our favorite table near the window, which is often difficult to get in the morning when the coffee shop is busy.”</strong> Meeting Gil and Mary yesterday is the episodic part, and knowing that the favorite table is hard to get is the personal semantic part.'],
 v22=[
  ('**Episodic memory** is memory for **specific personal experiences**, with a feeling of reliving them. An example is remembering getting coffee at Le Buzz yesterday and talking with Gil and Mary about their bike trip.', []),
  ('**Semantic memory** is **memory for facts**. An example is knowing that there is a Starbucks down the road from Le Buzz.', []),
  ('**Autobiographical memory** is memory for experiences from a person’s own life. It has **episodic parts**, which are relived events, and **semantic parts**, which are facts related to those events.',
   ['Meeting Gil and Mary at Le Buzz yesterday is the episodic part.',
    'Knowing that the favorite table near the window is hard to get is a **personal semantic memory**.'])])

slide(24, 'How time affects memories',
 original=[
  '<strong>Forgetting increases with longer intervals after encoding</strong>. The more time that passes after an event is stored, the less of it is remembered. <strong>Forgetting is not an “all-or-nothing” process</strong>, because part of a memory can be lost while another part remains.',
  'Two experiences of memory show this. <strong>Familiarity</strong> is associated with <strong>semantic memory</strong>, because the person knows something without recalling the circumstances in which it was learned. <strong>Recollection</strong> is associated with <strong>episodic memory</strong>, because the person recalls the details of the original experience.',
  'The <strong>remember/know procedure</strong> measures the two. A participant responds “remember” when the stimulus is familiar and the circumstances of meeting it can also be recalled. The participant responds “know” when the stimulus is familiar but those circumstances cannot be recalled, and “don’t know” when the stimulus is not remembered at all. This procedure reveals the <strong>semanticization of remote memories</strong>, which is the <strong>loss of episodic details for memories of long-ago events</strong>.'],
 v22=[
  ('**Forgetting increases as more time passes after encoding**, which means storing the memory. Forgetting is **not all-or-nothing**, because part of a memory can be lost while another part stays.', []),
  ('**Familiarity** goes with **semantic memory**. The person knows something but cannot recall the circumstances of learning it. **Recollection** goes with **episodic memory**. The person recalls the details of the original experience.', []),
  ('The **remember/know procedure** measures this. A person answers **“remember”** when they can recall the circumstances, **“know”** when the item is only familiar, and **“don’t know”** when it is not remembered.',
   ['“Remember” answers reflect episodic memory, and “know” answers reflect semantic memory.']),
  ('The **semanticization of remote memories** is the **loss of episodic details for events from long ago**. The memory stays, but it becomes more semantic over time.', [])],
 core='How time affects memories')

slide(25, 'Remember/know results for recent and remote events',
 original=[
  'The remember/know procedure was applied to events from two time periods, events from <strong>10 years or less</strong> ago and events from <strong>40–50 years ago</strong>. The measure was the <strong>proportion of events</strong> that received each response, <strong>remember</strong>, <strong>know</strong> or <strong>don’t know</strong>.',
  'For events from 10 years or less ago, about a third of the responses were “remember,” and “know” was the most common response. For events from 40–50 years ago, far fewer responses were “remember.” The proportion of “know” responses stayed nearly the same across the two periods, and “don’t know” responses increased for the older events.',
  'The drop in “remember” responses shows that episodic details are lost over time, while the steady “know” responses show that semantic memory for the same events largely remains. This pattern is the semanticization of remote memories. Old events are still known, but they are relived much less often, and more of them are forgotten completely.'],
 v22=[
  ('The remember/know procedure was used for events from **10 years ago or less** and for events from **40 to 50 years ago**.', []),
  ('**“Remember” answers dropped sharply** for the older events. **“Know” answers stayed about the same.** “Don’t know” answers went up.', []),
  ('This is because **episodic details are lost over time while semantic memory remains**. Old events are still known, but they are relived much less often, and more of them are forgotten completely.',
   ['This result shows the **semanticization of remote memories**.'])])

slide(26, 'Addis and colleagues (2007): memory and the future',
 original=[
  '<strong>Addis and colleagues (2007)</strong> connected episodic memory to imagining the future. Their <strong>constructive episodic simulation hypothesis</strong> states that <strong>episodic memories are extracted and recombined to create simulations of future events</strong>. Details from past experiences are taken out of memory and put together in new ways to imagine something that has not happened yet.',
  'This ability <strong>helps us to anticipate future needs and guide future behaviors</strong>. A person who can simulate a future event can prepare for it before it occurs.',
  'Simulating the future has an <strong>adaptive function similar to mind wandering</strong>. Episodic memory is therefore useful for more than recalling the past. It also supplies the material for planning what to do next.'],
 v22=[
  ('**Addis and colleagues (2007)** proposed the **constructive episodic simulation hypothesis**. It states that **episodic memories are extracted and recombined to create simulations of future events**.',
   ['Details from past experiences are put together in new ways to imagine something that has not happened yet.']),
  ('Simulating the future **helps people anticipate future needs and guide future behavior**. This is an **adaptive function**, which means it helps a person do well in daily life. Mind wandering has a similar function.',
   ['So episodic memory is used for planning the future as well as for recalling the past.'])],
 core='Memory and the future')

slide(27, 'Types of long-term memory: explicit and implicit',
 original=[
  '<strong>Long-term memory</strong> divides into two branches. <strong>Explicit memory</strong> is <strong>conscious</strong>, which means the person is aware of remembering. <strong>Implicit memory</strong> is <strong>not conscious</strong>, which means experience affects behavior without the person being aware of remembering.',
  'Explicit memory has two types. <strong>Episodic memory</strong> is memory for <strong>personal events</strong>, and <strong>semantic memory</strong> is memory for <strong>facts and knowledge</strong>.',
  'Implicit memory has three types, <strong>procedural memory</strong>, <strong>priming</strong> and <strong>conditioning</strong>. In all three, a past experience changes how a person acts or responds, even when the person does not consciously remember that experience.'],
 v22=[
  ('Long-term memory has two branches. **Explicit memory** is **conscious**, so the person is aware of remembering. **Implicit memory** is **not conscious**, so experience changes behavior without the person being aware of remembering.', []),
  ('**Explicit memory** has two types. **Episodic memory** is for personal events, and **semantic memory** is for facts and knowledge.', []),
  ('**Implicit memory** has three types. They are **procedural memory**, **priming** and **conditioning**.', [])],
 core='Types of long-term memory')

slide(28, 'Procedural Memory, Priming, and Conditioning · divider')

slide(29, 'Implicit memory',
 original=[
  '<strong>Implicit memory</strong> <strong>occurs when learning from experience is not accompanied by conscious remembering</strong>. The experience has changed the person, and the change shows in behavior, but the person is not aware of using a memory.',
  'There are three kinds of implicit memory. They are <strong>procedural memories</strong>, <strong>priming</strong> and <strong>conditioning</strong>. Each one is a way that past experience affects present behavior without conscious remembering.'],
 v22=[
  ('**Implicit memory** occurs when **learning from experience is not accompanied by conscious remembering**. The experience changes behavior, but the person is not aware of using a memory.', []),
  ('The three kinds of implicit memory are **procedural memory**, **priming** and **conditioning**.', [])])

slide(30, 'Procedural memory',
 original=[
  '<strong>Procedural memory</strong> is <strong>skill memory</strong>, which is <strong>memory for actions</strong>. Tying shoes, typing and riding a bicycle are skills held in procedural memory.',
  'With procedural memory, there is <strong>no memory of where or when</strong> the skill was <strong>learned</strong>. People <strong>perform procedures without being consciously aware of how to do them</strong>. A skilled person carries out the action correctly but often cannot explain the individual steps.',
  '<strong>People who cannot form new LTMs can still learn new skills</strong>, and <strong>H.M.</strong> is an example. In <strong>the mirror-drawing task that Patient H.M. practiced</strong>, his <strong>number of errors per trial</strong> decreased across Day 1, Day 2 and Day 3, in data adapted from <strong>Milner (1965)</strong>. His skill improved even though he could not form new explicit memories.'],
 v22=[
  ('**Procedural memory** is **skill memory**, which is memory for actions. Typing and riding a bicycle are examples.', []),
  ('A person with a procedural memory has **no memory of where or when the skill was learned**. People perform the skill **without being consciously aware of how they do it**.', []),
  ('**People who cannot form new long-term memories can still learn new skills.** **H.M.** practiced a mirror-drawing task, and his errors dropped across three days.',
   ['The error data are adapted from **Milner (1965)**.'])])

slide(31, 'H.M. and the mirror-tracing task (Brenda Milner, 1962)',
 original=[
  'In the <strong>mirror-tracing task (Brenda Milner, 1962)</strong>, <strong>H.M. was asked to trace the outline of a five-pointed star while looking only at his hand and the star through a mirror</strong>. The mirror <strong>reverses left-to-right and up-to-down visual feedback, making it very difficult at first</strong>.',
  '<strong>Over three consecutive days of practice, H.M.’s speed and accuracy improved dramatically</strong>. His errors were cut down to almost zero, <strong>at the exact same rate as healthy participants</strong>. His procedural memory was therefore learning the skill normally.',
  'The <strong>striking paradox</strong> is that <strong>every single day when researchers brought the mirror-tracing apparatus into the room, H.M. claimed he had never seen the task before, yet his hands performed the skill effortlessly</strong>. He had no explicit memory of practicing, but his improvement showed that the skill had been stored. This separates procedural memory, which is implicit, from explicit memory, which H.M. could no longer form.'],
 v22=[
  ('In the mirror-tracing task of **Brenda Milner (1962)**, **H.M.** traced the outline of a **five-pointed star** while seeing his hand and the star only **in a mirror**. The mirror reverses what the person sees, so the task is very hard at first.', []),
  ('Over **three days of practice**, H.M.’s **speed and accuracy improved dramatically**. His errors fell to almost zero, at the same rate as healthy participants.', []),
  ('Each day, H.M. said he had **never seen the task before**, yet his hands performed the skill. This is because **procedural memory is implicit**.',
   ['H.M. could not form new explicit memories, so he did not remember practicing.',
    'His procedural memory still worked, so the skill itself was learned and kept.'])],
 core='Procedural memory and H.M.')

slide(32, 'Priming',
 original=[
  '<strong>Priming</strong> occurs when the <strong>presentation of a priming stimulus changes a person’s response to a test stimulus</strong>. The priming stimulus is the item presented first, and the test stimulus is the item presented later.',
  'In <strong>repetition priming</strong>, the <strong>test stimulus is the same as or similar to the priming stimulus</strong>. Seeing a word once makes a person respond to that word differently when it appears again.',
  'Repetition priming is <strong>called implicit memory</strong> because the <strong>person may or may not remember the original presentation of the priming stimuli</strong>. The earlier presentation can change the response even when the person has no conscious memory of it. <strong>Graf and colleagues (1985)</strong> tested this in patients with amnesia.'],
 v22=[
  ('**Priming** occurs when presenting one stimulus, the **priming stimulus**, **changes a person’s response to a later test stimulus**.', []),
  ('In **repetition priming**, the test stimulus is the **same as or similar to** the priming stimulus. Seeing a word once changes how a person responds to it the next time.', []),
  ('Repetition priming is **implicit memory**. This is because the priming works whether or not the person remembers the original presentation.',
   ['**Graf and colleagues (1985)** tested this in patients with amnesia, which is a loss of memory.'])])

slide(33, 'Graf and colleagues (1985): the two memory tests',
 original=[
  'In the <strong>study phase</strong> of <strong>Graf and colleagues (1985)</strong>, the priming stimulus was a word list. <strong>Participants (both amnesic patients and healthy control participants) read a list of common words (e.g., MOTEL, STUDY, WINDOW) and rated how much they liked each word</strong>.',
  'In the <strong>test phase</strong>, participants were given one of two memory tests. In the <strong>explicit memory test (cued recall)</strong>, they were <strong>shown a three-letter word stem (e.g., MOT___) and explicitly asked to use it as a clue to recall a word from the earlier study list</strong>.',
  'In the <strong>implicit memory test (word-stem completion, or priming)</strong>, they were <strong>shown the exact same three-letter stem (MOT___) and simply told to complete it with the first word that comes to mind</strong>, without any mention of the study list. The two tests used the same stems, so the only difference was whether participants were asked to remember the list.'],
 v22=[
  ('In **Graf and colleagues (1985)**, **amnesic patients** and **control participants** read a list of common words, such as MOTEL. They **rated how much they liked each word**. The words were the priming stimuli.', []),
  ('The **explicit memory test** was **cued recall**. People saw a three-letter stem, such as MOT, and were asked to use it to **recall a word from the list**.', []),
  ('The **implicit memory test** was **word-stem completion**. People saw the same stem and were told to complete it with the **first word that came to mind**.',
   ['The study list was not mentioned in the implicit test.',
    'Both tests used the same stems, so the only difference was whether people were asked to remember.'])])

slide(34, 'Graf and colleagues (1985): results',
 original=[
  '<strong>On the explicit test (cued recall)</strong> in <strong>Graf and colleagues (1985)</strong>, <strong>healthy control participants recalled far more words than the amnesic patients, who struggled severely to remember the study list</strong>. This is the expected result of amnesia, because cued recall requires consciously remembering the list.',
  '<strong>On the implicit test (word-stem completion)</strong>, <strong>amnesic patients completed the stems with the studied words (MOTEL instead of MOTHER or MOTOR) at the exact same elevated rate (about 50 percent) as healthy controls</strong>. This occurred <strong>even though the amnesic patients often did not remember ever seeing a word list</strong>.',
  'The studied words had been primed in the amnesic patients just as they were in the controls. Priming therefore does not depend on conscious remembering. The amnesic patients had impaired explicit memory and intact implicit memory.'],
 v22=[
  ('On the **explicit test** in **Graf and colleagues (1985)**, the **amnesic patients recalled far fewer words** than the control participants.', []),
  ('On the **implicit test**, the amnesic patients **completed the stems with studied words as often as the controls**, about **50 percent** of the time. They wrote MOTEL instead of MOTHER or MOTOR.',
   ['This happened even though the amnesic patients often did not remember seeing a word list.']),
  ('**Graf and colleagues (1985)** showed that **priming does not depend on conscious remembering**. The amnesic patients had impaired explicit memory and intact implicit memory.', [])],
 core='Graf and colleagues (1985)')

slide(35, 'Graf and colleagues (1985): the three groups',
 original=[
  'Three groups took part in <strong>Graf and colleagues (1985)</strong>. <strong>AMN (amnesic patients)</strong> were <strong>patients with severe anterograde amnesia (including patients with Korsakoff’s syndrome and hippocampal damage)</strong>. Anterograde amnesia is the loss of the ability to form new explicit memories.',
  '<strong>ALC (alcoholic controls)</strong> were <strong>patients with a history of chronic alcohol use without Korsakoff’s amnesia</strong>. They were <strong>a crucial control group to prove the deficit was not simply caused by alcoholism</strong>. <strong>INPT (medical inpatients)</strong> were <strong>hospitalized patients with no neurological or alcohol-related memory impairments</strong>, who provided a <strong>healthy memory baseline</strong>.',
  'In <strong>recall</strong>, the <strong>percent of words recalled</strong> was much lower for the AMN group than for the INPT and ALC groups. In the <strong>implicit memory test</strong>, the <strong>percent of words completed</strong> was as high for the AMN group as for the other two groups. The amnesic patients were impaired only on the test that required conscious remembering.'],
 v22=[
  ('**Graf and colleagues (1985)** tested three groups. **AMN** were **amnesic patients** with severe anterograde amnesia, including patients with Korsakoff’s syndrome and hippocampal damage.',
   ['Korsakoff’s syndrome is a memory disorder linked to long-term alcohol use.',
    'Anterograde amnesia is the loss of the ability to form new explicit memories.']),
  ('**ALC** were **alcoholic controls**, patients with chronic alcohol use but without Korsakoff’s amnesia. **INPT** were **medical inpatients** with no memory impairment.',
   ['The alcoholic controls show that the memory deficit was not simply caused by alcoholism.',
    'The medical inpatients give a healthy memory baseline.']),
  ('In **recall**, the amnesic group scored **far lower** than the other two groups. In the **implicit memory test**, the amnesic group scored **as high** as the other two groups.', [])])

slide(36, 'Priming in everyday experience: the propaganda effect',
 original=[
  '<strong>Perfect and Askew (1994)</strong> studied priming in everyday experience. The <strong>propaganda effect</strong> is that people are <strong>more likely to rate statements read or heard before as being true</strong>. Simply having met a statement earlier makes it seem more believable later.',
  'The propaganda effect <strong>involves implicit memory because it can occur when people are not aware of previously seeing or hearing the statement</strong>. The earlier exposure changes the later judgment without any conscious memory of the exposure.',
  'This has <strong>implications for advertisements</strong>. An advertisement that a person has seen before can be rated more favorably later, even when the person does not remember having seen it.'],
 v22=[
  ('The **propaganda effect** is that people are **more likely to rate a statement as true if they have read or heard it before**. **Perfect and Askew (1994)** studied this effect with advertisements.', []),
  ('The propaganda effect is **implicit memory**. This is because it occurs even when people are **not aware** that they saw or heard the statement before.',
   ['This matters for advertising, because an ad seen before can be judged more favorably later.'])])

slide(37, 'Perfect and Askew (1994): the task',
 original=[
  'In the <strong>study phase</strong> of <strong>Perfect and Askew (1994)</strong>, <strong>participants were asked to flip through a magazine and read several articles</strong>. <strong>The pages also contained 25 real advertisements (for unfamiliar products and brands) placed alongside the articles</strong>.',
  'The <strong>incidental group</strong> was <strong>told only to read the articles</strong>. They were not told to look at or memorize the ads, which simulates how people normally glance past ads while reading. The <strong>intentional group</strong> was <strong>explicitly told to look at and pay attention to the advertisements</strong>.',
  'In the <strong>test phase</strong>, <strong>participants were shown 50 advertisements (the 25 previously seen ads mixed with 25 new ads)</strong> and completed two tasks. The <strong>explicit memory test (recognition)</strong> asked them to <strong>identify which ads they remembered seeing in the magazine earlier</strong>. The <strong>implicit memory test (preference or liking rating)</strong> asked them to <strong>rate how much they liked or found each ad appealing on a 1-to-7 scale</strong>.'],
 v22=[
  ('In **Perfect and Askew (1994)**, people flipped through a magazine and read articles. The pages also held **25 real advertisements** for unfamiliar products.', []),
  ('The **incidental group** was told **only to read the articles**. The **intentional group** was told to **pay attention to the advertisements**.',
   ['The incidental group matches how people normally glance past ads while reading.']),
  ('Afterward, people saw **50 ads**, the 25 old ads mixed with 25 new ads. The **explicit test** was **recognition**, which asked which ads they had seen. The **implicit test** was a **liking rating** of each ad.', [])])

slide(38, 'Perfect and Askew (1994): results',
 original=[
  '<strong>Explicit recognition was poor for incidental readers</strong> in <strong>Perfect and Askew (1994)</strong>. <strong>Participants in the incidental group explicitly recognized only about 11 percent of the ads they had flipped past</strong>, which is barely above guessing.',
  '<strong>Implicit liking was high</strong>. <strong>Even though participants did not consciously remember seeing the ads, they rated the previously seen ads as significantly more appealing and likable than the brand-new ads</strong>. The earlier exposure changed their ratings without their awareness.',
  'This is <strong>the propaganda effect</strong>. <strong>Repeated exposure to a statement, brand, or advertisement makes people more likely to rate it as true, credible, or likable later, even when they have zero conscious memory of ever seeing it before</strong>, and even if they initially doubted it. The effect is priming in everyday experience, and it works through implicit memory.'],
 v22=[
  ('In **Perfect and Askew (1994)**, **explicit recognition was poor**. The incidental group recognized only about **11 percent** of the ads they had flipped past.', []),
  ('**Implicit liking was high.** People rated the **ads they had seen before as more appealing** than the new ads, even though they did not remember seeing them.', []),
  ('This is the **propaganda effect**. **Repeated exposure** to a statement, brand or advertisement makes people more likely to rate it as **true, credible or likable** later.',
   ['The effect occurs even with no conscious memory of the earlier exposure, so it is implicit memory.'])],
 core='Perfect and Askew (1994)')

slide(39, 'Classical conditioning and implicit memory',
 original=[
  '<strong>Classical conditioning</strong> involves <strong>pairing a neutral stimulus with a reflexive response</strong>. After the pairing, the neutral stimulus alone produces the response.',
  'Classical conditioning <strong>involves implicit memory when the person has forgotten about the original pairing of the stimulus and the response</strong>. The response still occurs, but the person has no conscious memory of how it was learned.',
  'Two everyday examples show this. In the <strong>fear of dogs after a childhood bite</strong>, <strong>an adult feels an automatic spike in heart rate and anxiety around large dogs, even though they were bitten as a toddler and have no conscious memory of the incident</strong>. In a <strong>song triggering sudden sadness or nostalgia</strong>, <strong>hearing an old song from a stressful period in life causes a sudden tight feeling in the chest before the person consciously remembers why</strong>.'],
 v22=[
  ('**Classical conditioning** is **pairing a neutral stimulus with a reflexive response**. After the pairing, the neutral stimulus alone produces the response.',
   ['A neutral stimulus causes no reaction at first. A reflexive response is an automatic reaction.']),
  ('Conditioning is **implicit memory** when the person has **forgotten the original pairing**. The response still occurs, but the person does not remember how it was learned.', []),
  ('An adult was bitten by a dog as a toddler. The adult’s heart rate jumps around large dogs, even though the adult does not remember the bite.',
   ['An old song from a stressful period can cause a tight feeling in the chest before the person remembers why.'])])


TOPICS = [
 ('What long-term memory is', [3, 4]),
 ('The serial position curve: primacy and recency', [5, 6, 7]),
 ('Coding in short-term and long-term memory', [8, 9, 10, 14]),
 ('Sachs (1967): memory for meaning and memory for wording', [11, 12, 13]),
 ('H.M., K.F. and the double dissociation for STM and LTM', [15, 16]),
 ('Episodic and semantic memory', [18, 19, 20, 21]),
 ('How episodic and semantic memory interact', [22, 23]),
 ('How time affects memories and the remember/know procedure', [24, 25]),
 ('Memory and the future', [26]),
 ('Explicit and implicit memory', [27, 29]),
 ('Procedural memory and H.M.’s mirror tracing', [30, 31]),
 ('Priming and Graf and colleagues (1985)', [32, 33, 34, 35]),
 ('The propaganda effect and Perfect and Askew (1994)', [36, 37, 38]),
 ('Classical conditioning and implicit memory', [39]),
]

EXPERIMENTS = [
 ('Murdoch (1962) · Serial position curve', [5]),
 ('Serial position curve · Rehearsal and the 30-second delay', [6, 7]),
 ('Wickens and colleagues (1976) · Release from proactive interference', [8, 9, 10]),
 ('Sachs (1967) · Memory for meaning and wording', [11, 12, 13]),
 ('Della Sala and colleagues (1999), Conrad (1964) · Examples of coding', [14]),
 ('H.M., Clive Wearing and K.F. · Double dissociation for STM and LTM', [15, 16]),
 ('Endel Tulving (1985) · Episodic and semantic memory', [18]),
 ('K.C. and L.P. · Double dissociation for semantic and episodic memory', [19, 20]),
 ('Levine and colleagues (2004) · fMRI of episodic and semantic memory', [21]),
 ('Remember/know procedure · Recent and remote events', [24, 25]),
 ('Addis and colleagues (2007) · Constructive episodic simulation hypothesis', [26]),
 ('Brenda Milner (1962) · H.M. and mirror tracing, with error data adapted from Milner (1965)', [30, 31]),
 ('Graf and colleagues (1985) · Priming in amnesic patients', [32, 33, 34, 35]),
 ('Perfect and Askew (1994) · Propaganda effect', [36, 37, 38]),
]

QUESTIONS = []


def q(page, kind, stem, correct, d1, d2, d3, why):
    QUESTIONS.append(dict(page=page, kind=kind, stem=stem, options=[correct, d1, d2, d3], correct=0, why=why))


q(3, 'definition', 'Which statement describes long-term memory?',
  'It stores past events and learned knowledge, and it works together with working memory.',
  'It holds only events from many years ago and operates separately from working memory.',
  'It holds information for about 30 seconds unless the person keeps rehearsing it.',
  'It stores older memories in more detail than recent memories.',
  'Long-term memory is an archive of past events and learned knowledge that works closely with working memory. It stretches from a few moments ago to as far back as one can remember, and more recent memories are more detailed.')
q(4, 'application', 'A student remembers walking to class 5 minutes ago. Which memory system holds this memory?',
  'Long-term memory, because it starts a few moments after an event.',
  'Short-term memory, because the event happened less than an hour ago.',
  'Sensory memory, because the event was seen and heard.',
  'Neither system, because the event is still too recent to have been stored.',
  'Only the last 30 seconds or so are in short-term memory. An event from 5 minutes ago is already in long-term memory, which stretches from a few moments ago to as far back as one can remember.')
q(5, 'researcher', 'What did participants do in Murdoch (1962)?',
  'They heard a list of words and wrote down all the words they remembered.',
  'They listened to passages and judged whether a test sentence had changed.',
  'They recalled three words on each of four trials.',
  'They completed three-letter word stems with the first word that came to mind.',
  'In Murdoch (1962), a stimulus list was read and participants wrote down all the words they remembered. The percent recalled at each serial position gives the serial position curve.')
q(6, 'definition', 'Why does the primacy effect occur?',
  'The first words are rehearsed more, so they are more likely to enter long-term memory.',
  'The first words are still held in short-term memory when recall begins.',
  'The first words are more meaningful than later words, so they are coded more deeply.',
  'The first words suffer the most proactive interference from the rest of the list.',
  'The primacy effect is better memory for words at the beginning of a list. Those words get more rehearsal, and rehearsal makes them more likely to enter long-term memory.')
q(7, 'definition', 'Why does the recency effect occur?',
  'The words at the end of the list are still in short-term memory when recall begins.',
  'The words at the end of the list were rehearsed more than any other words.',
  'The words at the end of the list have already entered long-term memory.',
  'The words at the end of the list are coded by meaning.',
  'The recency effect is better memory for the words at the end of a list. Those words are still in short-term memory when the person starts recalling.')
q(7, 'design', 'Recall of a word list is delayed by 30 seconds. What happens to the serial position curve?',
  'The recency effect is eliminated and the primacy effect remains.',
  'The primacy effect is eliminated and the recency effect remains.',
  'Both the primacy effect and the recency effect are eliminated.',
  'Neither effect changes, because both depend on long-term memory.',
  'A 30-second delay eliminates the recency effect, because the last words are no longer in short-term memory. The early words are in long-term memory, so the primacy effect remains.')
q(8, 'definition', 'Which statement about coding is correct?',
  'Visual, auditory and semantic coding all occur in both short-term and long-term memory.',
  'Short-term memory uses only auditory coding and long-term memory uses only semantic coding.',
  'Semantic coding occurs in long-term memory but never in short-term memory.',
  'Visual coding occurs in short-term memory but never in long-term memory.',
  'Visual, auditory and semantic coding each occur in both short-term and long-term memory. Wickens and colleagues (1976) showed semantic coding in short-term memory.')
q(10, 'researcher', 'In Wickens and colleagues (1976), what happened on Trial 4 in the group that switched from professions to fruits?',
  'Recall went back up, which is release from proactive interference.',
  'Recall kept dropping, because the fruits interfered with the professions.',
  'Recall stayed the same as on Trial 3.',
  'Recall dropped to zero, because the category was unexpected.',
  'When the category changed from professions to fruits, recall recovered. This is release from proactive interference, and it shows that the interference depended on meaning.')
q(10, 'design', 'Why does release from proactive interference in Wickens and colleagues (1976) show semantic coding in short-term memory?',
  'Interference depended on the meaning category of the words, so short-term memory must have coded their meaning.',
  'Interference depended on how the words sounded, so short-term memory must have coded their sound.',
  'Interference disappeared when participants were given more time to rehearse.',
  'Interference occurred only when the words were presented visually.',
  'Recall recovered when the meaning category changed. Interference that depends on meaning can only occur if short-term memory is coding meaning.')
q(10, 'definition', 'What is proactive interference?',
  'Information learned earlier interferes with learning new information.',
  'Information learned later interferes with remembering earlier information.',
  'Information is lost because it was never rehearsed.',
  'Information is recalled better because it shares a category with earlier information.',
  'Proactive interference occurs when earlier information makes new information harder to remember. In the fruits group, earlier fruits interfered with later fruits.')
q(11, 'definition', 'What is recognition memory?',
  'Judging that an item has been met before when it is presented again.',
  'The recall of a list of words in any order.',
  'The completion of a word stem with the first word that comes to mind.',
  'The ability to repeat digits back in order.',
  'Recognition memory is the identification of a previously encountered stimulus. Sachs (1967) used it to test memory for sentences.')
q(13, 'researcher', 'What did Sachs (1967) find after a delay of 80 or 160 syllables?',
  'Participants still detected changes in meaning but could no longer detect changes in wording.',
  'Participants still detected changes in wording but could no longer detect changes in meaning.',
  'Participants detected changes in wording and changes in meaning equally well.',
  'Participants could not detect any kind of change.',
  'After the delay, memory for exact wording and grammar fell to near chance, while memory for meaning stayed high at about 80 percent. Long-term memory stores the gist.')
q(13, 'application', 'A week after reading a novel, a reader can describe the plot but cannot quote any sentence. Which finding does this match?',
  'Sachs (1967), because long-term memory stores the gist and not the verbatim wording.',
  'Murdoch (1962), because the last sentences read are still in short-term memory.',
  'Wickens and colleagues (1976), because the plot causes release from proactive interference.',
  'Graf and colleagues (1985), because the plot was primed by the first chapter.',
  'Sachs (1967) showed that long-term memory keeps the abstract meaning, or gist, and loses the exact words. Recalling the plot of a novel is an example of semantic coding in long-term memory.')
q(12, 'design', 'In Sachs (1967), which test sentence was a semantic change to “He sent a letter about it to Galileo, the great Italian scientist”?',
  '“Galileo, the great Italian scientist, sent him a letter about it.”',
  '“A letter about it was sent to Galileo, the great Italian scientist.”',
  '“He sent Galileo, the great Italian scientist, a letter about it.”',
  '“He sent a letter about it to Galileo, the great Italian scientist.”',
  'The semantic change reverses who sent the letter, so the meaning is altered. The passive version and the word-order version keep the meaning.')
q(15, 'application', 'After surgery removed his hippocampus, what was H.M. able and unable to do?',
  'He kept his short-term memory but was unable to form new long-term memories.',
  'He lost his short-term memory but could still form new long-term memories.',
  'He lost both short-term memory and long-term memory.',
  'He kept both short-term memory and the ability to form new long-term memories.',
  'H.M. retained short-term memory but could not transfer information to long-term memory, so he could not form new long-term memories.')
q(15, 'application', 'Which pattern did K.F. show after damage to the parietal lobe?',
  'Impaired short-term memory, shown by a reduced digit span, with functional long-term memory.',
  'Functional short-term memory with an inability to form new long-term memories.',
  'Impaired episodic memory with intact semantic memory.',
  'Impaired semantic memory with intact episodic memory.',
  'K.F. had impaired short-term memory, shown by a reduced digit span, but functional long-term memory. K.F. could form and hold new memories.')
q(16, 'definition', 'Why do H.M. and K.F. together form a double dissociation?',
  'H.M. has working STM and impaired LTM, and K.F. has the reverse pattern.',
  'Both patients have impaired STM and working LTM after their brain damage.',
  'Both patients have damage to the hippocampus and the parietal lobe.',
  'H.M. has impaired episodic memory, and K.F. has impaired semantic memory.',
  'A double dissociation needs two opposite patterns. H.M. has short-term memory that is OK and long-term memory that is impaired, and K.F. has the reverse, so the two kinds of memory rely on different mechanisms.')
q(18, 'researcher', 'How did Endel Tulving (1985) distinguish episodic memory from semantic memory?',
  'Episodic memory involves mental time travel, and semantic memory does not.',
  'Episodic memory is implicit, and semantic memory is explicit.',
  'Episodic memory lasts for seconds, and semantic memory lasts for years.',
  'Episodic memory stores facts, and semantic memory stores personal events.',
  'Tulving (1985) described episodic memory as involving mental time travel, or “self-knowing.” Semantic memory holds general knowledge and facts without mental time travel, or “knowing.”')
q(19, 'application', 'A patient can state facts about his own past but cannot relive any event from it. Which patient is this?',
  'K.C., who has no episodic memory and intact semantic memory.',
  'L.P., who has impaired semantic memory and intact episodic memory.',
  'K.F., who has impaired short-term memory and functional long-term memory.',
  'Clive Wearing, who has impaired short-term memory and working long-term memory.',
  'K.C. had a damaged hippocampus. He has no episodic memory and cannot relive past events, but his semantic memory is intact.')
q(20, 'application', 'Which pair of patients forms a double dissociation for semantic and episodic memory?',
  'K.C. and the Italian woman L.P.',
  'H.M. and Clive Wearing.',
  'H.M. and K.F.',
  'K.F. and K.C.',
  'K.C. has semantic memory that is OK and episodic memory that is poor. L.P. has semantic memory that is poor and episodic memory that is OK.')
q(21, 'researcher', 'What did the fMRI results of Levine and colleagues (2004) show?',
  'Retrieving episodic memories and retrieving semantic memories activate different areas of the brain.',
  'Retrieving episodic memories and retrieving semantic memories activate exactly the same areas.',
  'Only episodic memories produce brain activity during retrieval.',
  'The hippocampus is removed in patients who lose episodic memory.',
  'In Levine and colleagues (2004), the regions associated with episodic memories and the regions associated with semantic memories were in different places.')
q(22, 'definition', 'What are personal semantic memories?',
  'Facts that matter to a person, such as facts about their own life.',
  'Episodic memories that have lost all of their original details.',
  'Memories for skills that were learned in childhood.',
  'Memories that occur without conscious remembering.',
  'Personal semantic memories are semantic memories with personal significance. They are the semantic components of autobiographical memory.')
q(24, 'definition', 'In the remember/know procedure, what does a “know” response indicate?',
  'The item is familiar, but the circumstances cannot be recalled.',
  'The person can relive the original event in detail.',
  'The person has no memory of the item at all.',
  'The item was primed by an earlier presentation.',
  'A “know” response reflects familiarity, which is associated with semantic memory. A “remember” response reflects recollection, which is associated with episodic memory.')
q(25, 'application', 'For events from 40 to 50 years ago, “remember” responses drop while “know” responses stay about the same. What does this show?',
  'The semanticization of remote memories, because episodic details are lost.',
  'The recency effect, because recent events are still in short-term memory.',
  'Release from proactive interference, because old events belong to a different category.',
  'The propaganda effect, because old events have been repeated many times.',
  'Episodic details are lost over time while semantic memory remains. This is the semanticization of remote memories.')
q(26, 'researcher', 'What does the constructive episodic simulation hypothesis of Addis and colleagues (2007) state?',
  'People reuse pieces of past events to imagine events that have not happened yet.',
  'People lose the details of past events as those events become more remote.',
  'People remember facts better when the facts are tied to personal events.',
  'People form some memories without any conscious remembering of the events.',
  'Addis and colleagues (2007) proposed that episodic memories are extracted and recombined to simulate future events. This helps people anticipate future needs and guide future behavior.')
q(27, 'definition', 'Which three types of memory are implicit?',
  'Procedural memory, priming and conditioning.',
  'Episodic memory, semantic memory and priming.',
  'Episodic memory, procedural memory and conditioning.',
  'Semantic memory, autobiographical memory and priming.',
  'Implicit memory, which is not conscious, includes procedural memory, priming and conditioning. Explicit memory, which is conscious, includes episodic and semantic memory.')
q(31, 'researcher', 'What happened when H.M. practiced the mirror-tracing task (Brenda Milner, 1962)?',
  'He improved over three days, yet each day he said the task was new to him.',
  'He did not improve, because he could not form new long-term memories.',
  'He improved over three days, and he remembered each practice session.',
  'He became worse each day, because earlier sessions interfered with later ones.',
  'H.M.’s speed and accuracy improved dramatically over three days, yet he claimed each day that he had never seen the task. Procedural memory is implicit, so it was learned without explicit memory of practicing.')
q(34, 'researcher', 'What did Graf and colleagues (1985) find on the implicit word-stem completion test?',
  'Amnesic patients completed the stems with studied words as often as the control participants.',
  'Amnesic patients completed far fewer stems with studied words than the control participants.',
  'Amnesic patients could not complete any stems.',
  'Control participants completed the stems only when told to recall the study list.',
  'On the implicit test, amnesic patients used the studied words as often as controls, about 50 percent of the time, even though they often did not remember seeing a list. On the explicit test they recalled far fewer words.')
q(33, 'design', 'In Graf and colleagues (1985), what was the difference between the explicit test and the implicit test?',
  'The explicit test asked for a word from the list, and the implicit test asked for the first word that came to mind.',
  'The explicit test showed three-letter word stems, and the implicit test showed whole words from the list.',
  'The explicit test was given to the control participants, and the implicit test was given to the amnesic patients.',
  'The explicit test was given right after the list, and the implicit test was given after a long delay.',
  'Both tests showed the same three-letter stems. Cued recall asked participants to recall a word from the study list, while word-stem completion asked only for the first word that came to mind.')
q(35, 'design', 'Why did Graf and colleagues (1985) include the alcoholic control group (ALC)?',
  'To rule out alcoholism as the cause of the memory deficit.',
  'To show that alcohol use improves implicit memory.',
  'To provide a group with hippocampal damage.',
  'To provide a group that had not read the word list.',
  'The alcoholic controls had a history of chronic alcohol use without Korsakoff’s amnesia. They show that the deficit in the amnesic group was not simply caused by alcoholism.')
q(38, 'researcher', 'What did Perfect and Askew (1994) find for the incidental group?',
  'They recognized about 11 percent of the ads, yet rated seen ads as more appealing.',
  'They recognized most of the ads, and rated seen ads as less appealing.',
  'They recognized none of the ads, and rated seen ads and new ads the same.',
  'They recognized most of the ads, and rated seen ads as more appealing.',
  'Explicit recognition was poor, at about 11 percent, but implicit liking was high. Previously seen ads were rated as more appealing even without conscious memory of seeing them.')
q(36, 'definition', 'What is the propaganda effect?',
  'A statement seems more likely to be true when a person has met it before.',
  'A statement seems less believable when a person has heard it many times.',
  'A statement is remembered by its meaning and not by its exact wording.',
  'A statement is recalled better when it comes first in a list of statements.',
  'The propaganda effect is that people are more likely to rate statements read or heard before as true. It involves implicit memory because it occurs without awareness of the earlier exposure.')
q(39, 'application', 'An adult feels sudden anxiety around large dogs and has no memory of being bitten as a toddler. Which kind of memory is this?',
  'Classical conditioning, which is implicit here because the bite is forgotten.',
  'Episodic memory, which applies here because the bite was a personal event.',
  'Semantic memory, which applies here because it is knowledge about dogs.',
  'Repetition priming, because the test stimulus matches the priming stimulus.',
  'Classical conditioning pairs a neutral stimulus with a reflexive response. It involves implicit memory when the person has forgotten the original pairing.')
q(30, 'definition', 'Which statement describes procedural memory?',
  'It is memory for actions, and people perform the skill without knowing how they do it.',
  'It is memory for facts, and people can state where and when each fact was learned.',
  'It is memory for personal events, and it involves mental time travel.',
  'It is memory that cannot be formed by people who are unable to form new long-term memories.',
  'Procedural memory is skill memory, or memory for actions. There is no memory of where or when the skill was learned, and people who cannot form new long-term memories can still learn new skills.')
q(32, 'definition', 'What is repetition priming?',
  'An earlier stimulus changes the response to the same or a similar stimulus later.',
  'A change of meaning category improves recall of the words on the next trial.',
  'A long delay removes the episodic details of events from long ago.',
  'A neutral stimulus comes to produce a reflexive response after pairing.',
  'Priming occurs when a priming stimulus changes the response to a test stimulus. In repetition priming the test stimulus is the same as or similar to the priming stimulus.')

q(7, 'researcher', 'Which result is the evidence that the recency effect comes from short-term memory?',
  'A 30-second delay before recall removed the advantage of the last words.',
  'The first words in the list were rehearsed more often than later words.',
  'Recall recovered when the words changed from professions to fruits.',
  'Meaning was remembered after a delay while exact wording was lost.',
  'With no delay, recall is high for the last words. With a 30-second delay, the recency effect is eliminated, which is the evidence that the recency effect is due to short-term memory.')
q(13, 'researcher', 'In Sachs (1967), what happened when the test came immediately after the target sentence?',
  'Participants detected changes in wording and changes in meaning.',
  'Participants detected changes in meaning but not changes in wording.',
  'Participants detected changes in wording but not changes in meaning.',
  'Participants could not detect either kind of change in the sentence.',
  'At 0 syllables delay, participants accurately spotted changes in wording, grammar and meaning, because the sentence was still active in working memory.')
q(14, 'researcher', 'Which study is the example of auditory coding in short-term memory?',
  'Conrad (1964), representing the sounds of letters just after hearing them.',
  'Della Sala and colleagues (1999), holding a visual pattern that was just seen.',
  'Wickens and colleagues (1976), placing words into categories by meaning.',
  'Sachs (1967), remembering the meaning of a sentence after a delay.',
  'Auditory coding in short-term memory is representing the sounds of letters in the mind just after hearing them (Conrad, 1964). Della Sala and colleagues (1999) is the example of visual coding, and Wickens and colleagues (1976) is the example of semantic coding.')
q(14, 'researcher', 'Which study is the example of visual coding in short-term memory?',
  'Della Sala and colleagues (1999), reproducing a visual pattern that was just seen.',
  'Conrad (1964), representing the sounds of letters just after hearing them.',
  'Wickens and colleagues (1976), placing words into categories by meaning.',
  'Murdoch (1962), writing down all the words remembered from a list.',
  'Visual coding in short-term memory is holding an image in the mind to reproduce a visual pattern that was just seen (Della Sala and colleagues, 1999).')
q(16, 'application', 'Which patients have working short-term memory and impaired long-term memory?',
  'H.M. and Clive Wearing.',
  'K.F. and Clive Wearing.',
  'K.C. and the Italian woman L.P.',
  'K.F. and K.C.',
  'H.M. and Clive Wearing have short-term memory that is OK and long-term memory that is impaired. K.F. has the reverse pattern.')
q(23, 'application', '“We sat at our favorite table near the window, which is often difficult to get in the morning.” Knowing that the table is hard to get is which kind of memory?',
  'A personal semantic memory, which is a semantic part of autobiographical memory.',
  'An episodic memory, because it involves reliving one specific morning.',
  'A procedural memory, because it concerns the routine of getting coffee.',
  'A primed memory, because the table was seen on an earlier visit.',
  'Autobiographical memory has episodic components, which are relived events, and semantic components, which are facts related to those events. The semantic components are personal semantic memories.')
q(24, 'definition', 'How do familiarity and recollection map onto the types of long-term memory?',
  'Familiarity goes with semantic memory, and recollection goes with episodic memory.',
  'Familiarity goes with episodic memory, and recollection goes with semantic memory.',
  'Familiarity goes with implicit memory, and recollection goes with procedural memory.',
  'Familiarity and recollection both go with semantic memory.',
  'Familiarity is associated with semantic memory, because the circumstances of learning are not recalled. Recollection is associated with episodic memory, because the details of the original experience are recalled.')
q(34, 'researcher', 'In Graf and colleagues (1985), how did the amnesic patients do on the explicit cued-recall test?',
  'They recalled far fewer words than the control participants.',
  'They recalled as many words as the control participants.',
  'They recalled more words than the control participants.',
  'They recalled words only when told to give the first word that came to mind.',
  'On the explicit test, control participants recalled far more words than the amnesic patients, who struggled severely to remember the study list.')
q(37, 'design', 'In Perfect and Askew (1994), how did the incidental group differ from the intentional group?',
  'The incidental group was told only to read the articles, and the intentional group was told to pay attention to the ads.',
  'The incidental group saw 25 ads, and the intentional group saw 50 ads in the magazine.',
  'The incidental group rated the ads for liking, and the intentional group took the recognition test.',
  'The incidental group saw ads for unfamiliar brands, and the intentional group saw ads for familiar brands.',
  'The incidental group was told only to read the articles, which simulates how people normally glance past ads. The intentional group was explicitly told to look at and pay attention to the advertisements.')
q(38, 'researcher', 'Which study showed that ads people did not remember seeing were still rated as more appealing than new ads?',
  'Perfect and Askew (1994).',
  'Graf and colleagues (1985).',
  'Sachs (1967).',
  'Addis and colleagues (2007).',
  'Perfect and Askew (1994) found poor explicit recognition of the ads but higher liking ratings for previously seen ads, which is the propaganda effect.')
q(10, 'researcher', 'Which study showed semantic coding in short-term memory through release from proactive interference?',
  'Wickens and colleagues (1976).',
  'Conrad (1964).',
  'Murdoch (1962).',
  'Sachs (1967).',
  'Wickens and colleagues (1976) found that recall recovered when the meaning category changed from professions to fruits, which shows semantic coding in short-term memory.')
