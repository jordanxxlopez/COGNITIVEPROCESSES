"""Workspace study aids for Collection 16 (Long-Term Memory: Structure).

One master list of questions and answers feeds "What you can be asked" (grouped under the study-guide
topics), the Q&A bank and Q&A Versions 3, 4 and 5. Cards, contrasts and hard topics follow.
Researchers and years are written as the slides give them. Scores are a study-priority heuristic
(named study with year, a stated result, a must-know slide), not a prediction of the exam.
"""

TOPIC_TITLES = [
 'What long-term memory is',
 'The serial position curve: primacy and recency',
 'Coding in short-term and long-term memory',
 'Sachs (1967): memory for meaning and memory for wording',
 'H.M., K.F. and the double dissociation for STM and LTM',
 'Episodic and semantic memory',
 'How episodic and semantic memory interact',
 'How time affects memories and the remember/know procedure',
 'Memory and the future',
 'Explicit and implicit memory',
 'Procedural memory and H.M.’s mirror tracing',
 'Priming and Graf and colleagues (1985)',
 'The propaganda effect and Perfect and Askew (1994)',
 'Classical conditioning and implicit memory',
]

REMEMBER = {
 0: 'Long-term memory starts a few moments after an event and reaches back as far as a person can remember, and recent memories are more detailed.',
 1: 'Primacy comes from rehearsal and long-term memory. Recency comes from short-term memory, and a 30-second delay removes it.',
 2: 'Visual, auditory and semantic coding all occur in both systems. Release from proactive interference shows semantic coding in short-term memory.',
 3: 'After a delay, people keep the meaning of a sentence and lose its wording, so long-term memory stores the gist.',
 4: 'H.M. has working short-term memory and impaired long-term memory. K.F. has the reverse. Together they form a double dissociation.',
 5: 'Episodic memory is reliving a personal event. Semantic memory is knowing a fact. K.C. and L.P. form the double dissociation.',
 6: 'Knowledge may start as episodic and fade to semantic, and autobiographical memory has both episodic and personal semantic parts.',
 7: 'Over time, “remember” answers drop while “know” answers stay, which is the semanticization of remote memories.',
 8: 'Episodic memories are recombined to simulate future events, which helps a person plan.',
 9: 'Explicit memory is conscious and has episodic and semantic types. Implicit memory is not conscious and has procedural memory, priming and conditioning.',
 10: 'H.M. improved at mirror tracing over three days while saying each day that he had never seen the task.',
 11: 'Amnesic patients recalled far fewer words on the explicit test but completed word stems with studied words as often as controls.',
 12: 'People recognized about 11 percent of the ads but still rated the ads they had seen as more appealing.',
 13: 'Conditioning is implicit memory when the response remains but the original pairing is forgotten.',
}

QA = []


def qa(slides, topic, score, q, a, deep, who=None, bank=False, kind='slide', note=None):
    """note: shown under the answer as "Outside the slides". It records where the accepted literature differs from
    the slides. The answer itself always follows the slides."""
    QA.append(dict(slides=slides, topic=topic, score=score, q=q, a=a, deep=deep, who=who, bank=bank, kind=kind, note=note))


# 0 · What long-term memory is
qa([3], 0, 4.5, 'What is long-term memory, and how does it relate to working memory?',
   'Long-term memory is an archive of information about past events and knowledge a person has learned. It works closely with working memory, which draws on it to make sense of current information.',
   ['**Long-term memory (LTM)** is an **archive of information about past events and knowledge learned**.',
    '- It **works closely with working memory**, which holds what a person is using right now.',
    '- Working memory draws on long-term memory to make sense of that information.'])
qa([3, 4], 0, 5, 'How far back does long-term memory reach, and when does it begin?',
   'Long-term memory stretches from a few moments ago to as far back as a person can remember. Only about the last 30 seconds is still in short-term memory, so an event from 5 minutes ago is already a long-term memory.',
   ['Long-term memory **stretches from a few moments ago to as far back as one can remember**.',
    '- The thought “I just sat down,” from about 30 seconds ago, is still in **short-term memory**.',
    '- Walking to class 5 minutes ago, shopping yesterday and elementary school 10 years ago are all in **long-term memory**.'], bank=True)
qa([3, 4], 0, 3.5, 'How do recent long-term memories differ from old ones?',
   'More recent memories are more detailed. A memory from 5 minutes ago is rich in detail, and a memory from 10 years ago is less detailed.',
   ['**More recent memories are more detailed.**',
    '- A memory of walking to class 5 minutes ago is rich in detail.',
    '- A memory of elementary school from 10 years ago is less detailed.'])

# 1 · Serial position curve
qa([5], 1, 8, 'What did participants do in Murdoch (1962), and what is the serial position curve?',
   'In Murdoch (1962), participants heard a list of words and then wrote down all the words they remembered. The serial position curve plots the percent recalled for each word against the position the word had in the list.',
   ['In **Murdoch (1962)**, a stimulus list was read and participants **wrote down all the words they remembered**.',
    '- The **serial position curve** plots the percent recalled for each word against its **serial position**, which is its place in the list.',
    '- Recall was best for the last words, good for the first words and lowest for the middle words.'], who='Murdoch (1962)', bank=True,
   note='The slide spells the name Murdoch. In the published literature the name is usually spelled Murdock (1962).')
qa([6], 1, 9, 'What is the primacy effect, and why does it occur?',
   'The primacy effect is better memory for the words at the beginning of a list. It occurs because the first words get more time to be rehearsed, and more rehearsal makes them more likely to enter long-term memory.',
   ['The **primacy effect** is **better memory for stimuli presented at the beginning** of a list.',
    '- The first words **get more time to be rehearsed**. The first word can be rehearsed alone, and each later word shares rehearsal with the words before it.',
    '- More rehearsal makes a word **more likely to enter long-term memory**, so the first words are recalled from long-term memory.',
    '- Rehearsal counts support this, because the first words are rehearsed the most.'], bank=True)
qa([7], 1, 9, 'What is the recency effect, and why does it occur?',
   'The recency effect is better memory for the words at the end of a list. It occurs because those words are still in short-term memory when recall begins.',
   ['The **recency effect** is **better memory for stimuli presented at the end** of a list.',
    '- Those words are **still in short-term memory** when recall begins.',
    '- Participants can write them down straight from short-term memory.'], bank=True)
qa([7], 1, 9.5, 'What happens to the serial position curve when recall is delayed by 30 seconds, and what does that show?',
   'A 30-second delay eliminates the recency effect, and the primacy effect remains. This is the evidence that the recency effect comes from short-term memory, while the primacy effect comes from long-term memory.',
   ['With **no delay**, recall is high for the last words. With a **30-second delay**, the **recency effect is eliminated**.',
    '- After the delay, the last words are recalled no better than the middle words.',
    '- The **primacy effect remains**, because the first words are held in long-term memory.',
    '- This is the **evidence that the recency effect is due to short-term memory**.'], bank=True,
   note='The slide names no researcher for this figure and states only the 30-second delay. The delay result is usually credited to Glanzer and Cunitz (1966), whose participants counted backward during the delay, which prevented rehearsal.')
qa([5, 6, 7], 1, 7.5, 'How does the serial position curve separate short-term memory from long-term memory?',
   'The two ends of the curve come from different memory systems. The primacy effect at the start of the list comes from long-term memory, and the recency effect at the end comes from short-term memory.',
   ['The two ends of the curve come from **two different memory systems**.',
    '- The **primacy effect** comes from **long-term memory**, because early words are rehearsed more.',
    '- The **recency effect** comes from **short-term memory**, because the last words are still held there.',
    '- A delay removes only the recency effect, which shows the two effects have different causes.'], kind='relate')

# 2 · Coding
qa([8], 2, 5.5, 'What is coding, and which kinds of coding occur in short-term and long-term memory?',
   'Coding is the form in which information is represented in memory. Visual, auditory and semantic coding all occur in both short-term memory and long-term memory.',
   ['**Coding** is the **form in which information is represented** in memory.',
    '- **Visual** and **auditory** coding occur in both short-term and long-term memory.',
    '- **Semantic** coding, which is coding by meaning, also occurs in both.'])
qa([9], 2, 7.5, 'What were the two groups in Wickens and colleagues (1976)?',
   'In Wickens and colleagues (1976), the fruits group was given fruit names on all four trials. The professions followed by fruits group was given professions on the first three trials and fruits on the fourth trial.',
   ['In **Wickens and colleagues (1976)**, people were given three words on each of four trials and then tried to recall them.',
    '- The **fruits group** got fruit names on **all four trials**.',
    '- The **professions followed by fruits group** got professions on **Trials 1 to 3** and fruits on **Trial 4**.',
    '- Both groups got the same fruits on Trial 4, so only the earlier trials differed.'], who='Wickens and colleagues (1976)')
qa([10], 2, 9.5, 'What did Wickens and colleagues (1976) find, and what is release from proactive interference?',
   'In the fruits group, recall dropped on each trial, which is proactive interference. In the group that switched from professions to fruits, recall went back up on Trial 4. That recovery is release from proactive interference.',
   ['In the **fruits group**, recall dropped on every trial. This drop is **proactive interference**, which is when earlier information makes new information harder to remember.',
    '- In the **professions followed by fruits group**, recall also dropped over the first three trials.',
    '- On **Trial 4**, when the words changed to fruits, recall **went back up**. This recovery is **release from proactive interference**.',
    '- Both groups got the same fruits on Trial 4, so any difference in recall comes from the earlier words. The group that switched recalled far more of them.'], who='Wickens and colleagues (1976)', bank=True)
qa([8, 10], 2, 9, 'Why does release from proactive interference show semantic coding in short-term memory?',
   'Recall recovered only when the meaning category of the words changed. Interference that depends on meaning can only occur if short-term memory is coding what the words mean.',
   ['Recall recovered **only when the meaning category changed** from professions to fruits.',
    '- The professions did not interfere with the fruits, because they belong to a different category.',
    '- So the **interference depended on the meanings of the words**.',
    '- That can only happen if short-term memory is **coding the words semantically**.'], bank=True)
qa([14], 2, 8.5, 'Which studies are the examples of visual, auditory and semantic coding in short-term memory?',
   'Della Sala and colleagues (1999) is the example of visual coding, Conrad (1964) is the example of auditory coding, and Wickens and colleagues (1976) is the example of semantic coding.',
   ['Each code has its own example in short-term memory.',
    '- **Visual** is holding an image in mind to reproduce a visual pattern that was just seen, as in **Della Sala and colleagues (1999)**.',
    '- **Auditory** is representing the sounds of letters just after hearing them, as in **Conrad (1964)**.',
    '- **Semantic** is placing words into categories based on their meaning, as in **Wickens and colleagues (1976)**.'], who='Della Sala and colleagues (1999), Conrad (1964)', bank=True)
qa([14], 2, 4.5, 'What are examples of visual, auditory and semantic coding in long-term memory?',
   'Visual coding is visualizing what a place looked like when it was seen last summer. Auditory coding is replaying a familiar song in the mind. Semantic coding is recalling the general plot of a novel read last week.',
   ['Each code also appears in long-term memory.',
    '- **Visual** is visualizing what the Lincoln Memorial looked like when it was seen last summer.',
    '- **Auditory** is repeating a song heard many times before, over and over in the mind.',
    '- **Semantic** is recalling the general plot of a novel read last week, which matches what **Sachs** found.'])

# 3 · Sachs
qa([11], 3, 5.5, 'What is recognition memory?',
   'Recognition memory is the identification of a stimulus that was encountered before. In a recognition test, a person is shown an item and judges whether it was presented earlier.',
   ['**Recognition memory** is the **identification of a previously encountered stimulus**.',
    '- In a recognition test, a person sees an item and judges whether it was presented before.',
    '- **Sachs (1967)** used recognition memory to test memory for sentences.'])
qa([12], 3, 8.5, 'What was the task in Sachs (1967), and what was manipulated?',
   'In Sachs (1967), participants listened to tape-recorded passages and then got a surprise recognition test on one target sentence. The delay before the test was manipulated. The test came with no delay, after 80 syllables (about 27 seconds) or after 160 syllables (about 46 seconds).',
   ['In **Sachs (1967)**, participants **listened to tape-recorded passages**, and one sentence in each passage was the target.',
    '- The **delay before the test** was manipulated. The recording stopped immediately, after **80 syllables** (about 27 seconds) or after **160 syllables** (about 46 seconds).',
    '- Participants then got a **surprise recognition test**, judging whether a test sentence was identical to the target or changed.'], who='Sachs (1967)', bank=True)
qa([12], 3, 7.5, 'What were the three kinds of changed test sentences in Sachs (1967)?',
   'A semantic change altered the meaning of the sentence. A syntactic change switched the sentence between active and passive and kept the meaning. A formal change moved the words around and kept the meaning.',
   ['The test sentence could be changed in three ways.',
    '- A **semantic change** altered the **meaning**, so that Galileo sent the letter.',
    '- A **syntactic change** made the sentence passive and kept the meaning.',
    '- A **formal change** altered the word order and kept the meaning.',
    '- Only the semantic change altered what the sentence meant.'])
qa([13], 3, 10, 'What did Sachs (1967) find, and what does it show about long-term memory?',
   'When tested immediately, participants detected changes in wording and changes in meaning. After 80 or 160 syllables, they could no longer detect wording changes but still detected meaning changes about 80 percent of the time. Long-term memory stores the gist and not the exact words.',
   ['At **0 syllables delay**, participants detected changes in wording and changes in meaning, because the sentence was **still active in working memory**.',
    '- After **80 or 160 syllables**, memory for exact wording and grammar fell to **near chance**.',
    '- Memory for **meaning stayed high**, at about **80 percent** accuracy.',
    '- Long-term memory stores the **gist**, the abstract meaning, and not a **verbatim** record of the exact words.'], who='Sachs (1967)', bank=True)

# 4 · H.M., K.F.
qa([15], 4, 9, 'What did H.M. lose after surgery removed his hippocampus, and what did he keep?',
   'H.M. kept his short-term memory, but he was unable to transfer information to long-term memory. So he was unable to form new long-term memories.',
   ['In **H.M.**, **surgery removed the hippocampus**.',
    '- He **retained short-term memory**.',
    '- He was **unable to transfer information to long-term memory**, so he was **unable to form new long-term memories**.'], who='H.M.', bank=True)
qa([15], 4, 8.5, 'What pattern of memory did K.F. show?',
   'K.F. had impaired short-term memory, shown by a reduced digit span, after an accident damaged the parietal lobe. K.F.’s long-term memory worked, so K.F. could form and hold new memories.',
   ['In **K.F.**, an **accident damaged the parietal lobe**.',
    '- K.F. had **impaired short-term memory**, shown by a **reduced digit span**, which is the number of digits a person can repeat back in order.',
    '- K.F. had **functional long-term memory** and was able to form and hold new memories.',
    '- This is the opposite pattern from H.M.'], who='K.F.', bank=True)
qa([16], 4, 9.5, 'What is a double dissociation, and which patients form one for short-term and long-term memory?',
   'A double dissociation is when one patient has function A working and function B impaired, and another patient has the reverse. H.M. and Clive Wearing have working short-term memory and impaired long-term memory, and K.F. has the reverse.',
   ['A **double dissociation** is when one patient has one function working and another impaired, and a second patient has the **reverse** pattern.',
    '- **H.M. and Clive Wearing** have working short-term memory and impaired long-term memory.',
    '- **K.F.** has impaired short-term memory and working long-term memory.',
    '- Each kind of memory can be damaged while the other works, so they rely on **different mechanisms**.'], bank=True)
qa([15, 16], 4, 6, 'What is neuropsychology, and why are patients like H.M. and K.F. useful?',
   'Neuropsychology studies people with brain damage to learn what different brain areas do. H.M. and K.F. are useful because each lost one kind of memory while keeping the other.',
   ['**Neuropsychology** studies people with brain damage to learn what different brain areas do.',
    '- H.M. lost the ability to form long-term memories and kept short-term memory.',
    '- K.F. lost short-term memory capacity and kept long-term memory.',
    '- The opposite patterns show that the two kinds of memory can be separated.'])

# 5 · Episodic and semantic
qa([18], 5, 9, 'How did Endel Tulving (1985) distinguish episodic memory from semantic memory?',
   'Tulving (1985) said episodic memory involves mental time travel, so remembering is reliving a personal experience. Semantic memory does not involve mental time travel, and it holds general knowledge and facts.',
   ['**Endel Tulving (1985)** separated the two by the experience that goes with each one.',
    '- **Episodic memory** **involves mental time travel**. It is tied to personal experience, and remembering is reliving. Tulving called this **“self-knowing.”**',
    '- **Semantic memory** **does not involve mental time travel**. It holds general knowledge and facts. Tulving called this **“knowing.”**'], who='Endel Tulving (1985)', bank=True)
qa([19], 5, 9, 'What do the patients K.C. and L.P. show about episodic and semantic memory?',
   'K.C. lost his episodic memory and kept his semantic memory. The Italian woman L.P. had impaired semantic memory and intact episodic memory. The two patients show that the two kinds of memory can be damaged separately.',
   ['**K.C.** had a **damaged hippocampus**. He has **no episodic memory** and cannot relive past events, but his **semantic memory is intact**.',
    '- The **Italian woman L.P.** has **impaired semantic memory**, but her **episodic memory is intact**.',
    '- L.P. can remember past events and create new event memories.',
    '- The two patients show opposite patterns.'], who='K.C. and L.P.', bank=True)
qa([20], 5, 8.5, 'Which patients form the double dissociation for semantic and episodic memory?',
   'K.C. and the Italian woman L.P. form it. K.C. has working semantic memory and poor episodic memory, and L.P. has poor semantic memory and working episodic memory.',
   ['**K.C.** has working semantic memory and poor episodic memory.',
    '- **L.P.** has poor semantic memory and working episodic memory.',
    '- This is a **double dissociation for semantic and episodic memory**, so the two rely on different mechanisms.'])
qa([21], 5, 7, 'What did the fMRI results of Levine and colleagues (2004) show?',
   'Levine and colleagues (2004) found that retrieving episodic memories and retrieving semantic memories activate different areas of the brain.',
   ['**fMRI**, a brain scan that shows which areas are active, shows that **retrieving episodic and semantic memories activates different areas of the brain**.',
    '- In the image from **Levine and colleagues (2004)**, the yellow areas go with episodic memories and the blue areas go with semantic memories.',
    '- This agrees with the patients K.C. and L.P.'], who='Levine and colleagues (2004)', bank=True)
qa([19, 20, 21], 5, 7, 'What two kinds of evidence separate episodic memory from semantic memory?',
   'The first kind is brain damage. K.C. and L.P. form a double dissociation. The second kind is brain imaging. Levine and colleagues (2004) found that the two kinds of retrieval activate different brain areas.',
   ['Two kinds of evidence point the same way.',
    '- The evidence from **brain damage** is that K.C. lost episodic memory and kept semantic memory, and L.P. showed the reverse.',
    '- The evidence from **brain imaging** is that **Levine and colleagues (2004)** found different areas active for episodic and semantic retrieval.'], kind='relate')

# 6 · Interaction
qa([22], 6, 7, 'How can knowledge change from episodic to semantic?',
   'Acquiring knowledge may start as episodic and then fade to semantic. A person first remembers the event of learning a fact, and later keeps the fact without the memory of when or where it was learned.',
   ['**Episodic memory can be lost, leaving only semantic memory.**',
    '- **Acquiring knowledge may start as episodic but then fade to semantic.**',
    '- A person first remembers the event of learning a fact.',
    '- Later the person keeps the fact and loses the memory of when and where it was learned.'])
qa([22], 6, 6.5, 'How does episodic memory help semantic memory?',
   'Semantic memory can be enhanced if it is associated with episodic memory. Knowledge tied to a personal experience is easier to remember.',
   ['**Semantic memory can be enhanced if it is associated with episodic memory.**',
    '- Knowledge that is connected to a personal experience is easier to remember than knowledge with no personal connection.'])
qa([22, 23], 6, 8, 'What is autobiographical memory, and what are personal semantic memories?',
   'Autobiographical memory is memory for specific experiences from a person’s own life, and it includes both episodic and semantic components. The semantic components are personal semantic memories, which are facts that have personal significance.',
   ['**Autobiographical memory** is people’s memory for **experiences from their own lives**.',
    '- It has **episodic components**, which are relived specific events.',
    '- It has **semantic components**, which are facts related to those events.',
    '- The semantic components are **personal semantic memories**.'], bank=True)
qa([23], 6, 6, 'In the Le Buzz example, which part is episodic and which part is personal semantic?',
   'Remembering meeting Gil and Mary at Le Buzz yesterday morning is the episodic part. Knowing that the favorite table near the window is often difficult to get is the personal semantic part.',
   ['The example is one autobiographical memory with two parts.',
    '- “I met Gil and Mary at Le Buzz yesterday morning” is the **episodic** part, because it is a relived specific event.',
    '- The favorite table near the window “is often difficult to get in the morning” is the **personal semantic** part, because it is a fact with personal significance.',
    '- A plain **semantic** memory is “There is a Starbucks down the road from Le Buzz.”'])

# 7 · Time
qa([24], 7, 7.5, 'How do familiarity and recollection differ, and which type of memory goes with each?',
   'Familiarity goes with semantic memory, because the person knows something without recalling the circumstances of learning it. Recollection goes with episodic memory, because the person recalls the details of the original experience.',
   ['**Forgetting is not an all-or-nothing process**, because part of a memory can remain.',
    '- **Familiarity** goes with **semantic memory**. The item is known, but the circumstances are not recalled.',
    '- **Recollection** goes with **episodic memory**. The details of the original experience are recalled.'], bank=True)
qa([24], 7, 7.5, 'What is the remember/know procedure?',
   'In the remember/know procedure, a person answers “remember” when they can recall the circumstances of experiencing something, “know” when it is only familiar, and “don’t know” when it is not remembered.',
   ['The **remember/know procedure** measures recollection and familiarity.',
    '- **“Remember”** means the person can recall the circumstances. This reflects episodic memory.',
    '- **“Know”** means the item is familiar but the circumstances cannot be recalled. This reflects semantic memory.',
    '- **“Don’t know”** means the item is not remembered.'])
qa([24, 25], 7, 9, 'What is the semanticization of remote memories, and what result shows it?',
   'The semanticization of remote memories is the loss of episodic details for memories of long-ago events. For events from 40 to 50 years ago, “remember” answers dropped sharply while “know” answers stayed about the same.',
   ['The **semanticization of remote memories** is the **loss of episodic details for memories of long-ago events**.',
    '- For events from **10 years ago or less**, about a third of the answers were “remember.”',
    '- For events from **40 to 50 years ago**, “remember” answers **dropped sharply**, to less than half as many, and “know” answers **stayed about the same**.',
    '- “Don’t know” answers went up, so more of the old events were forgotten completely.'], bank=True)
qa([24], 7, 5, 'How does forgetting change as more time passes after encoding?',
   'Forgetting increases with longer intervals after encoding. It is not all-or-nothing, because the episodic details of a memory can be lost while the semantic part remains.',
   ['**Forgetting increases with longer intervals after encoding**, which means storing the memory.',
    '- Forgetting is **not all-or-nothing**.',
    '- The episodic details can be lost while the person still knows that the event happened.'])

# 8 · Future
qa([26], 8, 8.5, 'What is the constructive episodic simulation hypothesis of Addis and colleagues (2007)?',
   'The constructive episodic simulation hypothesis of Addis and colleagues (2007) states that episodic memories are extracted and recombined to create simulations of future events.',
   ['**Addis and colleagues (2007)** proposed the **constructive episodic simulation hypothesis**.',
    '- **Episodic memories are extracted and recombined to create simulations of future events.**',
    '- Details from past experiences are put together in new ways to imagine something that has not happened yet.'], who='Addis and colleagues (2007)', bank=True,
   note='The slide gives Addis et al. (2007). The hypothesis itself is usually credited to Schacter and Addis (2007).')
qa([26], 8, 6.5, 'Why is simulating the future useful?',
   'Simulating future events helps people anticipate future needs and guide future behavior. This is an adaptive function, and mind wandering has a similar function.',
   ['Simulating the future **helps us to anticipate future needs and guide future behaviors**.',
    '- This is an **adaptive function**, which means it helps a person do well in daily life.',
    '- Mind wandering has a similar adaptive function.'])

# 9 · Explicit and implicit
qa([27], 9, 9, 'What are the two branches of long-term memory, and what types belong to each?',
   'Explicit memory is conscious, and its types are episodic memory and semantic memory. Implicit memory is not conscious, and its types are procedural memory, priming and conditioning.',
   ['Long-term memory has two branches.',
    '- **Explicit memory** is **conscious**. Its types are **episodic** memory (personal events) and **semantic** memory (facts, knowledge).',
    '- **Implicit memory** is **not conscious**. Its types are **procedural memory**, **priming** and **conditioning**.'], bank=True)
qa([29], 9, 8, 'What is implicit memory?',
   'Implicit memory occurs when learning from experience is not accompanied by conscious remembering. The experience changes behavior, but the person is not aware of using a memory.',
   ['**Implicit memory** occurs when **learning from experience is not accompanied by conscious remembering**.',
    '- The experience changes how the person acts or responds.',
    '- The person is not aware of using a memory.',
    '- Its three kinds are procedural memories, priming and conditioning.'])

# 10 · Procedural
qa([30], 10, 7.5, 'What is procedural memory?',
   'Procedural memory is skill memory, which is memory for actions. A person has no memory of where or when the skill was learned and performs it without being consciously aware of how to do it.',
   ['**Procedural memory** is **skill memory**, which is memory for actions.',
    '- There is **no memory of where or when** the skill was learned.',
    '- People **perform procedures without being consciously aware of how to do them**.',
    '- **People who cannot form new long-term memories can still learn new skills.** H.M. could not form new explicit memories, yet he learned mirror tracing.'])
qa([31], 10, 10, 'What happened when H.M. practiced the mirror-tracing task (Brenda Milner, 1962)?',
   'H.M. traced a five-pointed star while seeing his hand only in a mirror. Over three days his speed and accuracy improved dramatically. Each day he said he had never seen the task before.',
   ['In the mirror-tracing task of **Brenda Milner (1962)**, **H.M.** traced the outline of a **five-pointed star** while seeing his hand and the star only in a mirror.',
    '- Over **three consecutive days of practice**, his **speed and accuracy improved dramatically**, and his errors fell to almost zero.',
    '- **Every day he claimed he had never seen the task before**, yet his hands performed the skill.'], who='Brenda Milner (1962)', bank=True,
   note='The task slide gives Brenda Milner (1962). The error figure on the procedural memory slide is adapted from Milner (1965).')
qa([30, 31], 10, 9, 'What does H.M.’s mirror tracing show about procedural memory?',
   'It shows that procedural memory is implicit and separate from explicit memory. H.M. could not remember practicing, but the skill was still learned and kept.',
   ['H.M. learned the skill without any explicit memory of practicing it.',
    '- He could not form new explicit memories, so he did not remember the practice sessions.',
    '- His procedural memory still worked, so the skill was learned and kept.',
    '- So **procedural memory is implicit** and does not depend on conscious remembering.'], bank=True)

# 11 · Priming and Graf
qa([32], 11, 7.5, 'What are priming and repetition priming?',
   'Priming occurs when the presentation of a priming stimulus changes a person’s response to a test stimulus. In repetition priming, the test stimulus is the same as or similar to the priming stimulus.',
   ['**Priming** occurs when the **presentation of a priming stimulus changes a person’s response to a test stimulus**.',
    '- In **repetition priming**, the test stimulus is the **same as or similar to** the priming stimulus.',
    '- It is called **implicit memory**, because the person may or may not remember the original presentation.'])
qa([33], 11, 8.5, 'What were the two memory tests in Graf and colleagues (1985)?',
   'The explicit test was cued recall. Participants saw a three-letter stem and were asked to use it to recall a word from the study list. The implicit test was word-stem completion. Participants saw the same stem and were told to complete it with the first word that came to mind.',
   ['In **Graf and colleagues (1985)**, amnesic patients and control participants read a list of common words and rated how much they liked each word.',
    '- The **explicit memory test** was **cued recall**. A three-letter stem such as MOT was a clue to recall a word from the study list.',
    '- The **implicit memory test** was **word-stem completion**. The same stem was completed with the first word that came to mind, and the list was not mentioned.'], who='Graf and colleagues (1985)', bank=True)
qa([34], 11, 10, 'What did Graf and colleagues (1985) find?',
   'On the explicit test, the amnesic patients recalled far fewer words than the control participants. On the implicit test, the amnesic patients completed the stems with studied words as often as the controls, about 50 percent of the time.',
   ['On the **explicit test**, control participants recalled **far more words** than the amnesic patients.',
    '- On the **implicit test**, amnesic patients completed the stems with the studied words at the **same elevated rate as controls**, about **50 percent**.',
    '- This happened even though the amnesic patients often did not remember seeing a word list.',
    '- **Priming does not depend on conscious remembering.**'], who='Graf and colleagues (1985)', bank=True,
   note='The results slide gives about 50 percent. The figure on the following slide shows about 40 to 43 percent for all three groups, so the two slides do not match exactly.')
qa([35], 11, 7, 'Who were the three groups in Graf and colleagues (1985), and why was the alcoholic control group included?',
   'AMN were amnesic patients with severe anterograde amnesia. ALC were alcoholic controls without Korsakoff’s amnesia. INPT were medical inpatients with no memory impairment. The alcoholic controls show that the memory deficit was not simply caused by alcoholism.',
   ['**Graf and colleagues (1985)** tested three groups.',
    '- **AMN** were amnesic patients with severe anterograde amnesia, which is the loss of the ability to form new explicit memories. The group included patients with Korsakoff’s syndrome, a memory disorder linked to long-term alcohol use, and hippocampal damage.',
    '- **ALC** were alcoholic controls, with chronic alcohol use but without Korsakoff’s amnesia. They show the deficit was **not simply caused by alcoholism**.',
    '- **INPT** were medical inpatients, who give a healthy memory baseline.',
    '- In recall, the amnesic group scored about 15 percent and the other two groups about 37 percent. In the implicit test, all three groups scored about 40 to 43 percent.'])

# 12 · Propaganda effect
qa([36], 12, 8.5, 'What is the propaganda effect, and why does it involve implicit memory?',
   'The propaganda effect is that people are more likely to rate statements they have read or heard before as being true. It involves implicit memory because it can occur when people are not aware of having seen or heard the statement before.',
   ['The **propaganda effect** is being **more likely to rate statements read or heard before as being true**.',
    '- It **involves implicit memory**, because it can occur when people are **not aware** of previously seeing or hearing the statement.',
    '- It has implications for advertisements.'], bank=True,
   note='The slides attach the propaganda effect to Perfect and Askew (1994), who measured ratings of advertisements. The finding that repeated statements are rated as more true is cited in the Goldstein textbook from Begg and colleagues (1992), and it was first reported by Hasher, Goldstein and Toppino (1977).')
qa([37], 12, 8, 'What was the task in Perfect and Askew (1994)?',
   'In Perfect and Askew (1994), participants flipped through a magazine that held 25 real advertisements. The incidental group was told only to read the articles, and the intentional group was told to pay attention to the ads. Afterward, everyone saw 50 ads and took a recognition test and a liking rating.',
   ['In **Perfect and Askew (1994)**, participants flipped through a magazine with **25 real advertisements** for unfamiliar products.',
    '- The **incidental group** was told only to read the articles. The **intentional group** was told to pay attention to the ads.',
    '- Afterward they saw **50 ads**, the 25 old ads mixed with 25 new ads.',
    '- The **explicit test** was recognition. The **implicit test** was a liking rating on a 1-to-7 scale.'], who='Perfect and Askew (1994)', bank=True)
qa([38], 12, 10, 'What did Perfect and Askew (1994) find?',
   'The incidental group recognized only about 11 percent of the ads they had flipped past. They still rated the ads they had seen as significantly more appealing than the new ads. In this study the rating was liking for the ads, not whether a statement was true.',
   ['**Explicit recognition was poor.** The incidental group recognized only about **11 percent** of the ads.',
    '- **Implicit liking was high.** They rated the previously seen ads as **significantly more appealing** than the brand-new ads.',
    '- This happened even though they did not consciously remember seeing the ads.',
    '- Repeated exposure makes people more likely to rate something as **true, credible or likable** later.'], who='Perfect and Askew (1994)', bank=True)

# 13 · Conditioning
qa([39], 13, 7, 'What is classical conditioning, and when does it involve implicit memory?',
   'Classical conditioning is pairing a neutral stimulus with a reflexive response. It involves implicit memory when the person has forgotten about the original pairing of the stimulus and the response.',
   ['**Classical conditioning** is **pairing a neutral stimulus with a reflexive response**.',
    '- It **involves implicit memory when the person has forgotten the original pairing**.',
    '- The response still occurs, but the person does not remember how it was learned.'], bank=True)
qa([39], 13, 5.5, 'What everyday examples show conditioning as implicit memory?',
   'An adult bitten by a dog as a toddler feels a spike in heart rate around large dogs with no memory of the bite. An old song from a stressful period causes a tight feeling in the chest before the person remembers why.',
   ['Two everyday examples show a response without a memory of its cause.',
    '- An adult bitten by a dog as a toddler feels a spike in heart rate and anxiety around large dogs, with no conscious memory of the bite.',
    '- An old song from a stressful period causes a sudden tight feeling in the chest before the person remembers why.'])

qa([16], 4, 7.5, 'Which pattern of memory does Clive Wearing show?',
   'Clive Wearing shows the same pattern as H.M. His short-term memory works, and his long-term memory is impaired.',
   ['**Clive Wearing** is grouped with **H.M.**',
    '- Both have working short-term memory and impaired long-term memory.',
    '- **K.F.** shows the reverse pattern.'], who='Clive Wearing')

# Putting it together
qa([5, 12, 14, 18, 21, 26, 31, 33, 37], 3, 9, 'Which year goes with each named study?',
   'Murdoch is 1962, and Brenda Milner’s mirror tracing is also 1962. Conrad is 1964 and Sachs is 1967. Wickens and colleagues is 1976. Endel Tulving and Graf and colleagues are both 1985. Perfect and Askew is 1994, Della Sala and colleagues is 1999, Levine and colleagues is 2004, and Addis and colleagues is 2007.',
   ['The years are the ones given with each study.',
    '- **Murdoch (1962)** is the serial position curve, and **Brenda Milner (1962)** is H.M.’s mirror tracing.',
    '- **Conrad (1964)** is auditory coding, and **Sachs (1967)** is memory for meaning.',
    '- **Wickens and colleagues (1976)** is release from proactive interference.',
    '- **Endel Tulving (1985)** is episodic and semantic memory, and **Graf and colleagues (1985)** is priming in amnesic patients.',
    '- **Perfect and Askew (1994)** is the propaganda effect, and **Della Sala and colleagues (1999)** is visual coding.',
    '- **Levine and colleagues (2004)** is the fMRI study, and **Addis and colleagues (2007)** is memory and the future.'], kind='relate')
qa([15, 30, 31], 10, 8, 'H.M. could not form new long-term memories, yet he learned mirror tracing. How do both hold?',
   'H.M. could not form new explicit memories, which are conscious memories of events and facts. Procedural memory is implicit, and it still worked, so he learned the skill without remembering the practice.',
   ['The two findings concern two different branches of long-term memory.',
    '- H.M. could not form new **explicit** memories, so he did not remember practicing.',
    '- **Procedural memory is implicit**, and it still worked.',
    '- So his skill improved over three days without any conscious memory of the task.'], kind='relate')
qa([31, 34, 38], 11, 8.5, 'What do H.M.’s mirror tracing, Graf and colleagues (1985) and Perfect and Askew (1994) have in common?',
   'In all three, past experience changed behavior without conscious remembering. H.M. improved at a skill, amnesic patients completed stems with studied words, and readers rated ads they had seen as more appealing, each without an explicit memory of the earlier experience.',
   ['All three show **implicit memory working without explicit memory**.',
    '- In **Brenda Milner (1962)**, H.M. improved at mirror tracing while saying the task was new.',
    '- In **Graf and colleagues (1985)**, amnesic patients completed stems with studied words as often as controls.',
    '- In **Perfect and Askew (1994)**, readers recognized about 11 percent of the ads and still liked the seen ads more.'], kind='relate')
qa([16, 20], 5, 8, 'How are the two double dissociations alike, and what does each one separate?',
   'Each uses two patients with opposite patterns. H.M. and K.F. separate short-term memory from long-term memory. K.C. and L.P. separate episodic memory from semantic memory.',
   ['Both use two patients with opposite patterns of loss.',
    '- **H.M. and K.F.** separate **short-term memory** from **long-term memory**.',
    '- **K.C. and L.P.** separate **episodic memory** from **semantic memory**.',
    '- In each case, the two functions rely on different mechanisms.'], kind='relate')
qa([10, 13, 14], 3, 7.5, 'Which studies show semantic coding in short-term memory and in long-term memory?',
   'Wickens and colleagues (1976) showed semantic coding in short-term memory through release from proactive interference. Sachs (1967) showed semantic coding in long-term memory, because meaning was remembered after a delay and wording was not.',
   ['Each system has its own study.',
    '- For **short-term memory**, **Wickens and colleagues (1976)** found that interference depended on the meaning category of the words.',
    '- For **long-term memory**, **Sachs (1967)** found that meaning was remembered after a delay while exact wording was lost.'], kind='relate')
qa([18, 24, 25], 7, 7, 'How does the remember/know procedure connect to the episodic and semantic distinction of Endel Tulving (1985)?',
   'A “remember” answer means the person relives the circumstances, which is episodic memory. A “know” answer means the item is familiar without those details, which is semantic memory. Over many years, “remember” answers fall and “know” answers stay.',
   ['The two answers map onto the two kinds of explicit memory.',
    '- **“Remember”** is recollection, which is **episodic** memory and involves reliving.',
    '- **“Know”** is familiarity, which is **semantic** memory.',
    '- Over 40 to 50 years, “remember” answers drop and “know” answers stay, so old memories become more semantic.'], kind='relate')


CARDS = []


def card(title, researcher, pages, aim, manipulated, measured, found, means, blocks, trap=None):
    CARDS.append(dict(title=title, researcher=researcher, pages=pages, aim=aim, manipulated=manipulated, measured=measured,
                      found=found, means=means, trap=trap, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


card('Murdoch · the serial position curve', 'Murdoch (1962)', [5, 6, 7],
     'Does memory for a word depend on where the word was in the list?',
     'The serial position of each word in a list that was read to participants.',
     'The percent recalled for each word when participants wrote down all the words they remembered.',
     'Recall was good for the first words (primacy effect), best for the last words (recency effect) and lowest for the middle words.',
     'The primacy effect comes from long-term memory, and the recency effect comes from short-term memory.',
     [('**Murdoch (1962)** asked whether memory for a word depends on its place in a list. Participants heard a list of words and then **wrote down all the words they remembered**.', []),
      ('The **serial position curve** from **Murdoch (1962)** showed good recall for the first words, the **primacy effect**, and the best recall for the last words, the **recency effect**.',
       ['Words in the middle of the list were recalled the least.']),
      ('The two effects come from two memory systems. The first words are rehearsed more, so they enter **long-term memory**. The last words are still in **short-term memory** when recall begins.',
       ['Separately, a 30-second delay before recall eliminates the recency effect and leaves the primacy effect.'])],
     trap='The delay removes the recency effect, not the primacy effect.')
card('Wickens and colleagues · release from proactive interference', 'Wickens and colleagues (1976)', [8, 9, 10],
     'Does short-term memory code the meaning of words?',
     'The meaning category of the words. One group got fruits on all four trials. The other got professions on three trials and fruits on the fourth.',
     'The percent of the three words recalled on each trial.',
     'In the fruits group, recall dropped on every trial. In the group that switched to fruits, recall went back up on Trial 4.',
     'Interference depended on the meaning of the words, so short-term memory codes semantically.',
     [('**Wickens and colleagues (1976)** asked whether short-term memory codes the **meaning** of words. People were given three words on each of four trials and tried to recall them.', []),
      ('The **fruits group** got fruits on every trial. The **professions followed by fruits group** got professions on Trials 1 to 3 and fruits on Trial 4.',
       ['Both groups got the same fruits on Trial 4, so any difference in recall comes from the earlier words.']),
      ('In the fruits group, recall dropped on every trial, which is **proactive interference**. In the other group, recall went back up on Trial 4, which is **release from proactive interference**.',
       ['Recall recovered because fruits are a different meaning category from professions.']),
      ('**Wickens and colleagues (1976)** therefore showed **semantic coding in short-term memory**, because the interference depended on meaning.', [])],
     trap='Release happened in the group whose category changed, not in the fruits group.')
card('Sachs · memory for meaning and wording', 'Sachs (1967)', [11, 12, 13],
     'Do people remember the exact wording of a sentence or its meaning?',
     'The delay before a surprise recognition test (0, 80 or 160 syllables) and the kind of change in the test sentence (semantic, syntactic or formal).',
     'Whether participants correctly judged the test sentence as identical or changed.',
     'Immediately, all changes were detected. After 80 or 160 syllables, wording changes were detected at near chance, and meaning changes were still detected about 80 percent of the time.',
     'Long-term memory stores the gist, the abstract meaning, and not a verbatim record of the words.',
     [('**Sachs (1967)** asked whether people remember the **wording** of a sentence or its **meaning**. Participants listened to tape-recorded passages and then got a **surprise recognition test** on one target sentence.', []),
      ('The test came with no delay, after **80 syllables** or after **160 syllables**. The test sentence was identical or was changed in meaning (**semantic**), in grammar (**syntactic**) or in word order (**formal**).',
       ['Only the semantic change altered what the sentence meant.']),
      ('Tested immediately, participants detected every kind of change. After a delay, they could no longer detect changes in wording, but they still detected changes in meaning about **80 percent** of the time.', []),
      ('**Sachs (1967)** showed that long-term memory stores the **gist** and not a **verbatim** record.', ['This is semantic coding in long-term memory.'])],
     trap='At 0 delay everything was detected, because the sentence was still in working memory.')
card('Della Sala and colleagues, Conrad · visual and auditory coding', 'Della Sala and colleagues (1999) and Conrad (1964)', [14],
     'What do visual and auditory coding look like in short-term memory?',
     'Not reported. Each study is listed as an example of one code.',
     'Not reported.',
     'Della Sala and colleagues (1999) is the example of visual coding. Conrad (1964) is the example of auditory coding.',
     'Short-term memory can hold information by how it looks and by how it sounds, and long-term memory can too.',
     [('**Della Sala and colleagues (1999)** is the example of **visual coding in short-term memory**. A person holds an image in the mind to reproduce a visual pattern that was just seen.', []),
      ('**Conrad (1964)** is the example of **auditory coding in short-term memory**. A person represents the sounds of letters in the mind just after hearing them.', []),
      ('Semantic coding in short-term memory has its own example, **Wickens and colleagues (1976)**. All three codes also occur in long-term memory.', [])])
card('H.M., Clive Wearing and K.F. · short-term and long-term memory', 'H.M., Clive Wearing and K.F.', [15, 16],
     'Do short-term memory and long-term memory depend on different mechanisms?',
     'These are patients, so nothing was manipulated. The patients differ in which brain area was damaged.',
     'What each patient could and could not remember.',
     'H.M. and Clive Wearing have working short-term memory and impaired long-term memory. K.F. has impaired short-term memory and working long-term memory.',
     'The two patterns form a double dissociation, so short-term and long-term memory rely on different mechanisms.',
     [('**H.M.** had surgery that **removed his hippocampus**. He kept his short-term memory but was **unable to form new long-term memories**.', []),
      ('**K.F.** had an accident that **damaged the parietal lobe**. K.F. had **impaired short-term memory**, shown by a reduced digit span, and working long-term memory.', []),
      ('**H.M. and Clive Wearing** show one pattern and **K.F.** shows the reverse. This is a **double dissociation for short-term and long-term memory**.',
       ['Each kind of memory can be damaged while the other still works.'])],
     trap='H.M. alone is not a double dissociation. It needs K.F. with the opposite pattern.')
card('Endel Tulving · episodic and semantic memory', 'Endel Tulving (1985)', [18],
     'How do episodic memory and semantic memory differ?',
     'Not an experiment. Tulving described the experience that goes with each kind of memory.',
     'Not reported.',
     'Episodic memory involves mental time travel. Semantic memory does not.',
     'Remembering an episode is reliving it (“self-knowing”). Semantic memory is knowing a fact (“knowing”).',
     [('**Endel Tulving (1985)** separated two kinds of long-term memory by the experience that goes with each.', []),
      ('**Episodic memory** involves **mental time travel**. It is tied to personal experience, and remembering is reliving. Tulving called this **“self-knowing.”**', []),
      ('**Semantic memory** does **not** involve mental time travel. It holds general knowledge and facts. Tulving called this **“knowing.”**', [])])
card('K.C. and L.P. · semantic and episodic memory', 'K.C. and the Italian woman L.P.', [19, 20],
     'Can episodic memory and semantic memory be damaged separately?',
     'These are patients, so nothing was manipulated.',
     'What each patient could and could not remember.',
     'K.C. has no episodic memory and intact semantic memory. L.P. has impaired semantic memory and intact episodic memory.',
     'The two patterns form a double dissociation for semantic and episodic memory.',
     [('**K.C.** had a **damaged hippocampus**. He has **no episodic memory** and cannot relive past events, but his **semantic memory is intact**.', []),
      ('The **Italian woman L.P.** has **impaired semantic memory**, but her **episodic memory is intact**. She can remember past events and create new event memories.', []),
      ('**K.C.** and **L.P.** form a **double dissociation for semantic and episodic memory**, so the two kinds of memory rely on different mechanisms.', [])],
     trap='K.C. lost episodic memory. L.P. had impaired semantic memory.')
card('Levine and colleagues · fMRI of episodic and semantic retrieval', 'Levine and colleagues (2004)', [21],
     'Do episodic and semantic retrieval use the same brain areas?',
     'The kind of memory being retrieved, episodic or semantic.',
     'Brain activity measured with fMRI.',
     'Retrieving episodic memories and retrieving semantic memories activated different areas of the brain.',
     'Brain imaging agrees with the patients. The two kinds of memory are served by different areas.',
     [('**Levine and colleagues (2004)** used **fMRI** to compare retrieving **episodic** memories with retrieving **semantic** memories.', []),
      ('The two kinds of retrieval **activated different areas of the brain**. In the image from **Levine and colleagues (2004)**, yellow areas go with episodic memories and blue areas go with semantic memories.', [])])
card('Remember/know procedure · recent and remote events', 'Remember/know procedure', [24, 25],
     'What happens to memories of events as they become very old?',
     'Nothing was manipulated. Events of two ages are compared, 10 years or less and 40 to 50 years ago.',
     'The proportion of events given a “remember,” “know” or “don’t know” answer.',
     '“Remember” answers dropped sharply for the older events. “Know” answers stayed about the same. “Don’t know” answers went up.',
     'Episodic details are lost over time while semantic memory remains, which is the semanticization of remote memories.',
     [('The **remember/know procedure** asks whether a person can recall the circumstances of an event (**“remember”**), finds it only familiar (**“know”**) or does not remember it (**“don’t know”**).', []),
      ('For events from **40 to 50 years ago**, “remember” answers were far lower than for events from **10 years ago or less**. “Know” answers stayed about the same.',
       ['“Don’t know” answers went up for the older events.']),
      ('This is the **semanticization of remote memories**, the **loss of episodic details for memories of long-ago events**.', [])])
card('Addis and colleagues · memory and the future', 'Addis and colleagues (2007)', [26],
     'What does episodic memory have to do with imagining the future?',
     'Not reported.',
     'Not reported.',
     'No result is reported. The hypothesis and its function are given.',
     'Episodic memories are extracted and recombined to simulate future events, which helps a person anticipate needs and guide behavior.',
     [('**Addis and colleagues (2007)** proposed the **constructive episodic simulation hypothesis**.', []),
      ('The hypothesis of **Addis and colleagues (2007)** states that **episodic memories are extracted and recombined to create simulations of future events**.',
       ['This helps people anticipate future needs and guide future behavior.', 'It is an adaptive function, similar to mind wandering.'])])
card('Brenda Milner · H.M. and mirror tracing', 'Brenda Milner (1962)', [30, 31],
     'Can a person who cannot form new long-term memories still learn a new skill?',
     'Practice across three consecutive days.',
     'H.M.’s speed and accuracy when tracing a five-pointed star seen only in a mirror.',
     'H.M.’s speed and accuracy improved dramatically, and his errors fell to almost zero. Each day he said he had never seen the task before.',
     'Procedural memory is implicit. A skill can be learned and kept without any explicit memory of practicing it.',
     [('In the mirror-tracing task of **Brenda Milner (1962)**, **H.M.** traced the outline of a **five-pointed star** while seeing his hand and the star only in a mirror.', []),
      ('Over **three consecutive days**, his speed and accuracy **improved dramatically**. Each day he **claimed he had never seen the task before**.', []),
      ('**Brenda Milner (1962)** showed that **procedural memory** can work when explicit memory does not.', ['H.M. could not remember practicing, but the skill was learned and kept.'])],
     trap='The mirror-tracing task is dated 1962. The error figure for the task is adapted from Milner (1965).')
card('Graf and colleagues · priming in amnesic patients', 'Graf and colleagues (1985)', [32, 33, 34, 35],
     'Does priming depend on consciously remembering the earlier presentation?',
     'The kind of test (explicit cued recall or implicit word-stem completion) and the group (amnesic patients, alcoholic controls, medical inpatients).',
     'The percent of studied words recalled on the explicit test and the percent of stems completed with studied words on the implicit test.',
     'On the explicit test, amnesic patients recalled far fewer words than controls. On the implicit test, they completed stems with studied words as often as controls, about 50 percent.',
     'Priming is implicit memory. It does not depend on conscious remembering.',
     [('**Graf and colleagues (1985)** asked whether priming depends on conscious remembering. **Amnesic patients** and **control participants** read a list of words and rated how much they liked each word.', []),
      ('In the **explicit test**, cued recall, a three-letter stem was a clue to recall a word from the list. In the **implicit test**, word-stem completion, the same stem was completed with the first word that came to mind.', []),
      ('On the explicit test, the amnesic patients recalled far fewer words than the controls. On the implicit test, they completed the stems with studied words **as often as the controls**.',
       ['They often did not remember seeing a word list at all.']),
      ('**Graf and colleagues (1985)** showed that **repetition priming is implicit memory**.', [])],
     trap='Both tests used the same stems. Only the instruction differed.')
card('Perfect and Askew · the propaganda effect', 'Perfect and Askew (1994)', [36, 37, 38],
     'Does seeing an advertisement before change how people rate it later, even when they do not remember it?',
     'Whether an ad had been seen before in the magazine, and whether readers were told only to read the articles (incidental) or to attend to the ads (intentional).',
     'Recognition of the ads (explicit) and a 1-to-7 liking rating of each ad (implicit).',
     'The incidental group recognized only about 11 percent of the ads, but rated the ads they had seen as significantly more appealing than new ads.',
     'Earlier exposure changes later judgments without conscious memory of the exposure, which is the propaganda effect.',
     [('**Perfect and Askew (1994)** had participants flip through a magazine that held **25 real advertisements**. The **incidental group** was told only to read the articles, and the **intentional group** was told to attend to the ads.', []),
      ('Afterward, participants saw **50 ads**, 25 old and 25 new. They took a **recognition test** and gave each ad a **liking rating**.', []),
      ('The incidental group recognized only about **11 percent** of the ads. They still rated the ads they had seen as **more appealing** than the new ads.', []),
      ('**Perfect and Askew (1994)** showed the **propaganda effect**, here measured as liking for ads. It works through implicit memory.', ['Repeated exposure makes people more likely to rate something as true, credible or likable.'])],
     trap='Poor recognition and high liking occurred together. Liking did not depend on remembering.')


CONTRASTS = []


def contrast(title, pages, score, a, b, diff, example, watch, blocks):
    CONTRASTS.append(dict(title=title, pages=pages, score=score, a=dict(term=a[0], definition=a[1]), b=dict(term=b[0], definition=b[1]),
                          diff=diff, example=example, watch=watch, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


contrast('Primacy effect vs recency effect', [6, 7], 9.5,
         ('Primacy effect', 'The primacy effect is better memory for the words at the beginning of a list.'),
         ('Recency effect', 'The recency effect is better memory for the words at the end of a list.'),
         'The primacy effect comes from long-term memory, because the first words are rehearsed more. The recency effect comes from short-term memory, because the last words are still held there at recall.',
         'A 30-second delay before recall eliminates the recency effect and leaves the primacy effect.',
         'The delay removes the recency effect. The primacy effect stays.',
         [('The **primacy effect** is better memory for the **first** words in a list. The **recency effect** is better memory for the **last** words.', []),
          ('They have different causes. The first words get more rehearsal, so they enter **long-term memory**. The last words are **still in short-term memory** when recall begins.',
           ['A 30-second delay eliminates the recency effect and leaves the primacy effect.'])])
contrast('Short-term memory vs long-term memory', [3, 4, 15, 16], 8,
         ('Short-term memory', 'Short-term memory holds very recent information, such as a thought from 30 seconds ago.'),
         ('Long-term memory', 'Long-term memory is an archive of past events and learned knowledge, from a few moments ago to as far back as one can remember.'),
         'They cover different spans of time and rely on different mechanisms. One can be damaged while the other still works.',
         'H.M. kept short-term memory and could not form new long-term memories. K.F. had impaired short-term memory and working long-term memory.',
         'A memory from 5 minutes ago is already a long-term memory.',
         [('**Short-term memory** holds very recent information, such as a thought from 30 seconds ago. **Long-term memory** holds everything from a few moments ago to as far back as a person can remember.', []),
          ('The two rely on **different mechanisms**. **H.M.** kept short-term memory and lost the ability to form long-term memories, and **K.F.** showed the reverse.',
           ['This is a double dissociation.'])])
contrast('H.M. vs K.F.', [15, 16], 9.5,
         ('H.M.', 'Surgery removed H.M.’s hippocampus. His short-term memory worked, but he was unable to form new long-term memories.'),
         ('K.F.', 'An accident damaged K.F.’s parietal lobe. K.F. had impaired short-term memory, shown by a reduced digit span, and working long-term memory.'),
         'The two patients have opposite patterns. H.M. lost long-term memory formation and kept short-term memory. K.F. had impaired short-term memory and kept long-term memory.',
         'H.M. could hold information briefly but it never became a lasting memory. K.F. could repeat back only a short string of digits but could form and hold new memories.',
         'Clive Wearing goes with H.M., not with K.F.',
         [('**H.M.** had his **hippocampus** removed. His short-term memory worked, but he was **unable to form new long-term memories**.', []),
          ('**K.F.** had damage to the **parietal lobe**. K.F. had **impaired short-term memory** and working long-term memory.', ['Together they form the double dissociation for short-term and long-term memory.'])])
contrast('Semantic coding in STM vs semantic coding in LTM', [10, 13, 14], 8,
         ('Semantic coding in short-term memory', 'Wickens and colleagues (1976) found that interference depended on the meaning category of the words.'),
         ('Semantic coding in long-term memory', 'Sachs (1967) found that meaning was remembered after a delay while wording was lost.'),
         'Both show coding by meaning, in different systems and with different evidence. The first uses release from proactive interference, and the second uses a delayed recognition test.',
         'Recall recovered when professions changed to fruits (short-term). Changes in who sent the letter were still noticed after 160 syllables (long-term).',
         'Do not swap the studies. Wickens is short-term memory and Sachs is long-term memory.',
         [('**Wickens and colleagues (1976)** showed semantic coding in **short-term memory**. Recall recovered when the meaning category of the words changed.', []),
          ('**Sachs (1967)** showed semantic coding in **long-term memory**. After a delay, people remembered the meaning of a sentence and not its wording.', [])])
contrast('Proactive interference vs release from proactive interference', [10], 8.5,
         ('Proactive interference', 'Earlier information makes new information harder to remember, so recall drops across trials.'),
         ('Release from proactive interference', 'Release from proactive interference is the recovery of recall when the new information comes from a different meaning category.'),
         'Interference builds while the words stay in one category. Release happens when the category changes, because the earlier words no longer interfere.',
         'In Wickens and colleagues (1976), the fruits group kept dropping. The group that switched from professions to fruits recovered on Trial 4.',
         'The fruits group showed no release, because its category never changed.',
         [('**Proactive interference** is when earlier information makes new information harder to remember. In the fruits group of **Wickens and colleagues (1976)**, recall dropped on every trial.', []),
          ('**Release from proactive interference** is the recovery of recall when the category changes. It happened on Trial 4 in the group that switched from professions to fruits.', [])])
contrast('Gist vs verbatim memory', [13], 8.5,
         ('Gist', 'The gist is the abstract meaning of an experience.'),
         ('Verbatim', 'A verbatim memory is a word-for-word record of the exact words.'),
         'Long-term memory keeps the gist and loses the verbatim wording within seconds.',
         'In Sachs (1967), after 80 or 160 syllables people noticed a change in meaning about 80 percent of the time but could not tell active from passive wording.',
         'Verbatim memory was good only at 0 delay, while the sentence was still in working memory.',
         [('The **gist** is the abstract meaning. A **verbatim** memory is a word-for-word record.', []),
          ('**Sachs (1967)** showed that long-term memory stores the gist. After a delay, people detected changes in meaning but not changes in wording.', [])])
contrast('Semantic change vs syntactic and formal changes', [12], 6.5,
         ('Semantic change', 'The meaning of the sentence is altered, so that Galileo sends the letter.'),
         ('Syntactic and formal changes', 'The grammar or the word order of the sentence is altered, and the meaning is preserved.'),
         'Only the semantic change alters the meaning. The other two alter the surface form.',
         '“A letter about it was sent to Galileo” is syntactic. “He sent Galileo, the great Italian scientist, a letter about it” is formal.',
         'After a delay, only the semantic change was still detected.',
         [('In **Sachs (1967)**, a **semantic change** altered the meaning of the target sentence. **Syntactic** and **formal** changes altered the grammar or the word order and kept the meaning.', []),
          ('After a delay, people still detected the semantic change. They could not detect the other two.', [])])
contrast('Episodic memory vs semantic memory', [18, 23], 10,
         ('Episodic memory', 'Episodic memory is memory for specific personal experiences. It involves mental time travel. Endel Tulving (1985) called this experience “self-knowing.”'),
         ('Semantic memory', 'Semantic memory is memory for facts and general knowledge. It does not involve mental time travel. Endel Tulving (1985) called this experience “knowing.”'),
         'Episodic memory is reliving a personal event. Semantic memory is knowing a fact without returning to when it was learned.',
         '“I remember going to get coffee at Le Buzz yesterday morning” is episodic. “There is a Starbucks down the road from Le Buzz” is semantic.',
         'Both are explicit memories. The difference is mental time travel.',
         [('**Episodic memory** is memory for **personal experiences**, and remembering is reliving. **Semantic memory** is memory for **facts and general knowledge**.', []),
          ('**Endel Tulving (1985)** said episodic memory involves **mental time travel** and semantic memory does not.', ['Both are types of explicit memory.'])])
contrast('K.C. vs L.P.', [19, 20], 9,
         ('K.C.', 'K.C. had a damaged hippocampus. He has no episodic memory, and his semantic memory is intact.'),
         ('L.P.', 'L.P. is the Italian woman. Her semantic memory is impaired, and her episodic memory is intact.'),
         'The two patients have opposite patterns, which is a double dissociation for semantic and episodic memory.',
         'K.C. can remember general information about the past but cannot relive it. L.P. can remember past events and create new event memories.',
         'K.C. lost episodic memory. L.P. had impaired semantic memory.',
         [('**K.C.** has **no episodic memory**, and his semantic memory is intact. **L.P.** has **impaired semantic memory**, and her episodic memory is intact.', []),
          ('Together they form the **double dissociation for semantic and episodic memory**.', [])])
contrast('Autobiographical memory, episodic memory and personal semantic memory', [22, 23], 7,
         ('Autobiographical memory', 'Autobiographical memory is memory for specific experiences from a person’s own life. It includes episodic and semantic components.'),
         ('Personal semantic memory', 'Personal semantic memories are semantic memories that have personal significance. They are the semantic components of autobiographical memory.'),
         'Autobiographical memory is the whole memory. Personal semantic memories are its factual parts.',
         'Meeting Gil and Mary at Le Buzz is the episodic part. Knowing the favorite table is hard to get is a personal semantic memory.',
         'Autobiographical memory is not the same as episodic memory. An episodic memory is one relived event, and autobiographical memory has both episodic and semantic content.',
         [('**Autobiographical memory** is memory for experiences from a person’s own life. It has **episodic** parts and **semantic** parts.', []),
          ('The semantic parts are **personal semantic memories**, which are facts that have personal significance.', [])])
contrast('Remember vs know', [24, 25], 9,
         ('Remember', 'The person can recall the circumstances of the event. This is recollection, which goes with episodic memory.'),
         ('Know', 'The item is familiar, but the circumstances are not recalled. This is familiarity, which goes with semantic memory.'),
         'A “remember” answer includes reliving details. A “know” answer does not.',
         'For events from 40 to 50 years ago, “remember” answers dropped sharply while “know” answers stayed about the same.',
         '“Know” is different from “don’t know,” which means the event is not remembered.',
         [('In the **remember/know procedure**, **“remember”** means the circumstances can be recalled, which is **recollection** and episodic memory. **“Know”** means the item is only familiar, which is **familiarity** and semantic memory.', []),
          ('Over 40 to 50 years, “remember” answers drop and “know” answers stay. This is the **semanticization of remote memories**.', [])])
contrast('Explicit memory vs implicit memory', [27, 29], 10,
         ('Explicit memory', 'Explicit memory is conscious. Its types are episodic memory and semantic memory.'),
         ('Implicit memory', 'Implicit memory is not conscious. Its types are procedural memory, priming and conditioning.'),
         'With explicit memory, the person is aware of remembering. With implicit memory, experience changes behavior without conscious remembering.',
         'Recalling a word list is explicit. Completing MOT with MOTEL after reading it earlier, without thinking of the list, is implicit.',
         'Semantic memory is explicit, not implicit.',
         [('**Explicit memory** is **conscious**, and its types are episodic and semantic memory. **Implicit memory** is **not conscious**, and its types are procedural memory, priming and conditioning.', []),
          ('Implicit memory occurs when learning from experience is **not accompanied by conscious remembering**.', [])])
contrast('Explicit test vs implicit test', [33, 34], 9.5,
         ('Explicit test (cued recall)', 'Participants use the stem MOT as a clue to recall a word from the study list.'),
         ('Implicit test (word-stem completion)', 'Participants complete the stem MOT with the first word that comes to mind, and the list is not mentioned.'),
         'The stems are the same. Only the instruction differs, which decides whether conscious remembering is required.',
         'In Graf and colleagues (1985), amnesic patients did far worse than controls on cued recall and as well as controls on word-stem completion.',
         'Amnesic patients were impaired only on the explicit test.',
         [('In **Graf and colleagues (1985)**, the **explicit test** asked people to use a stem to recall a studied word. The **implicit test** asked them to complete the same stem with the first word that came to mind.', []),
          ('Amnesic patients did far worse than controls on the explicit test and as well as controls on the implicit test.', ['So priming does not depend on conscious remembering.'])])
contrast('Incidental group vs intentional group', [37, 38], 7,
         ('Incidental group', 'The incidental group was told only to read the articles and was not told to look at the ads.'),
         ('Intentional group', 'The intentional group was explicitly told to look at and pay attention to the advertisements.'),
         'The groups differ in whether they were directed to the ads. The incidental group matches how people normally glance past ads.',
         'In Perfect and Askew (1994), the incidental group recognized only about 11 percent of the ads and still rated seen ads as more appealing.',
         'The key result comes from the incidental group.',
         [('In **Perfect and Askew (1994)**, the **incidental group** was told only to read the articles. The **intentional group** was told to pay attention to the ads.', []),
          ('The incidental group recognized about **11 percent** of the ads, yet rated the ads they had seen as more appealing than new ads.', [])])
contrast('Procedural memory vs priming vs conditioning', [29, 30, 32, 39], 7.5,
         ('Procedural memory', 'Procedural memory is skill memory. It is memory for actions that are performed without awareness of how they are done.'),
         ('Priming and conditioning', 'Priming is a changed response to a stimulus seen before. Conditioning is a reflexive response to a once-neutral stimulus.'),
         'All three are implicit. Procedural memory is about skills, priming is about an earlier stimulus changing a later response, and conditioning is about a learned pairing.',
         'H.M.’s mirror tracing is procedural. Completing MOT with MOTEL is priming. A racing heart around dogs after a forgotten bite is conditioning.',
         'None of the three requires conscious remembering.',
         [('**Procedural memory** is memory for skills. **Priming** is when an earlier stimulus changes the response to a later one. **Conditioning** is when a neutral stimulus comes to produce a reflexive response.', []),
          ('All three are **implicit memory**, so they work without conscious remembering.', [])])


HARD = []


def hard(title, pages, blocks):
    HARD.append(dict(title=title, pages=pages, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


hard('Why the two ends of the serial position curve have different causes', [5, 6, 7],
     [('The serial position curve shows good recall at the start of a list and the best recall at the end. The two ends look alike, but they have different causes.', []),
      ('The **primacy effect** comes from **rehearsal**. The first word can be rehearsed alone, and each later word shares rehearsal time. More rehearsal makes a word more likely to enter **long-term memory**.',
       ['So the first words are recalled from long-term memory.']),
      ('The **recency effect** comes from **short-term memory**. The last words were just presented, so they are still held there when recall begins.',
       ['A 30-second delay eliminates the recency effect and leaves the primacy effect, which is the evidence for two different causes.'])])
hard('How release from proactive interference shows coding by meaning', [9, 10],
     [('**Proactive interference** is when earlier information makes new information harder to remember. In **Wickens and colleagues (1976)**, recall dropped across trials when the words stayed in one category.', []),
      ('One group changed category on Trial 4, from professions to fruits. Recall **went back up** for that group. This is **release from proactive interference**.',
       ['The fruits group got the same Trial 4 words and recalled far fewer of them.']),
      ('The only difference between the groups was the **meaning** of the earlier words. So the interference depended on meaning, which means short-term memory was **coding semantically**.', [])])
hard('How a double dissociation works', [15, 16, 19, 20],
     [('A single patient who loses one function and keeps another shows only that the two can come apart in one direction.', []),
      ('A **double dissociation** needs a **second patient with the reverse pattern**. Then each function can be damaged while the other still works.',
       ['This shows the two functions rely on different mechanisms.']),
      ('**H.M.** and **K.F.** form one for short-term and long-term memory. **K.C.** and **L.P.** form one for episodic and semantic memory.', [])])
hard('What the semanticization of remote memories means', [24, 25],
     [('A memory has an **episodic** part, the relived details, and a **semantic** part, the knowledge that the event happened.', []),
      ('Over time, the episodic details are lost and the semantic part remains. This is the **semanticization of remote memories**.', []),
      ('The **remember/know procedure** shows it. For events from 40 to 50 years ago, **“remember”** answers dropped sharply and **“know”** answers stayed about the same.',
       ['Old events are still known, but they are relived much less often.'])])
hard('How memory can work without conscious remembering', [29, 31, 34, 38],
     [('**Implicit memory** occurs when learning from experience is **not accompanied by conscious remembering**. Three studies show it.', []),
      ('In **Brenda Milner (1962)**, **H.M.** improved at mirror tracing over three days while saying each day that he had never seen the task.', []),
      ('In **Graf and colleagues (1985)**, amnesic patients completed word stems with studied words as often as controls, even though they often did not remember the list.', []),
      ('In **Perfect and Askew (1994)**, readers recognized about 11 percent of the ads and still rated the ads they had seen as more appealing.',
       ['In each case, the earlier experience changed behavior without an explicit memory of it.'])])
