"""Collection 17 · Long-Term Memory: Encoding, Retrieval, and Consolidation (Module III, source id 16).

Authored from sources/CogPsych_Ch07_LTM_Encoding_F26.pdf, one entry per source slide, in source order.
Each slide has an Original transcript (HTML paragraphs that keep the slide wording in bold) and a
Version 22 transcript (main points with sub-points, researchers and years in the sentences).
Researcher names and years are written as the slides give them, with "and colleagues" for "coworkers".
"""

SECTIONS = []


def slide(page, title, original=(), v22=(), core=None):
    SECTIONS.append(dict(page=page, title=title, original=list(original),
                         v22=[dict(text=t, children=list(c)) for t, c in v22], core=core))


slide(1, 'LTM: Encoding, Retrieval, and Consolidation · title')
slide(2, 'Encoding: Getting Information into Long-Term Memory · divider')

slide(3, 'Getting information into long-term memory',
 original=[
  '<strong>Encoding</strong> is <strong>acquiring information and transforming it into memory</strong>. <strong>Retrieval</strong> is <strong>transferring information from LTM to working memory</strong>. Encoding puts information into long-term memory, and retrieval brings it back out so that it can be used.',
  '<strong>Maintenance rehearsal</strong> is the <strong>repetition of stimuli that maintains information but does not transfer it to LTM</strong>. Repeating a phone number over and over keeps it available for the moment. Once the repetition stops, the number is usually lost, because repetition alone does not store it.',
  '<strong>Elaborative rehearsal</strong> is <strong>using meanings and connections to help transfer information to LTM</strong>. The person thinks about what the information means and links it to other things they know. This kind of rehearsal is what moves information into long-term memory.'],
 v22=[
  ('**Encoding** is **acquiring information and transforming it into memory**. **Retrieval** is **transferring information from long-term memory back to working memory**.',
   ['Encoding puts information in, and retrieval brings it back out.']),
  ('**Maintenance rehearsal** is repeating information over and over. It **maintains** the information but **does not transfer it to long-term memory**.',
   ['Repeating a phone number keeps it available only while the repetition continues.']),
  ('**Elaborative rehearsal** is **using meanings and connections** to think about the information. It **helps transfer the information to long-term memory**.', [])],
 core='Encoding and rehearsal')

slide(4, 'Levels of processing theory',
 original=[
  '<strong>Levels of processing theory</strong> states that <strong>memory depends on how information is encoded</strong>. What matters is the <strong>depth of processing</strong> the information receives, and not simply how long it is studied.',
  '<strong>Shallow processing</strong> involves <strong>little attention to meaning</strong> and a <strong>focus on physical features</strong>, such as what a word looks like. Shallow processing leads to <strong>poor memory</strong>.',
  '<strong>Deep processing</strong> involves <strong>close attention to meaning</strong>. The person thinks about what the item means and how it relates to other things. Deep processing leads to <strong>better memory</strong>.'],
 v22=[
  ('**Levels of processing theory** states that **memory depends on how information is encoded**. What matters is the **depth of processing**.', []),
  ('**Shallow processing** pays **little attention to meaning** and focuses on **physical features**, such as how a word looks. It leads to **poor memory**.', []),
  ('**Deep processing** pays **close attention to meaning**. It leads to **better memory**.',
   ['So thinking about what something means stores it better than noticing what it looks like.'])],
 core='Levels of processing')

slide(5, 'Craik and Tulving (1975): three kinds of questions',
 original=[
  'In <strong>Craik and Tulving’s (1975) experiment</strong>, participants answered a question about each word. The question controlled how deeply the word was processed.',
  '<strong>Shallow processing (structural or visual)</strong> <strong>focused on physical appearance</strong>, with a question such as <strong>“Is the word in capital letters?”</strong> for the word TABLE. <strong>Intermediate processing (phonemic or acoustic)</strong> <strong>focused on sound</strong>, with a question such as <strong>“Does the word rhyme with weight?”</strong> for the word crate.',
  '<strong>Deep processing (semantic or meaning)</strong> <strong>focused on meaning and context using a fill-in-the-blank sentence</strong>, such as <strong>“Does the word fit in the sentence: ‘He met a ______ in the street’?”</strong> for the word FRIEND. To answer, the participant has to think about what the word means.'],
 v22=[
  ('In **Craik and Tulving (1975)**, people answered a question about each word. The kind of question set how deeply the word was processed.', []),
  ('A **shallow** question was about **physical appearance**, such as whether the word was in capital letters. An **intermediate** question was about **sound**, such as whether the word rhymed with weight.', []),
  ('A **deep** question was about **meaning**. People judged whether the word fit in a sentence, such as “He met a ______ in the street.”',
   ['Answering it requires thinking about what the word means.'])])

slide(6, 'Craik and Tulving (1975): procedure and results',
 original=[
  'Each trial in <strong>Craik and Tulving (1975)</strong> had three steps. First a <strong>question was asked</strong>, for example whether the word is in capital letters. Then a <strong>word was presented</strong>, for example bird. Then the participant <strong>answered the question</strong>, for example “No.”',
  'Memory for the words was tested afterward, and the <strong>percent correct</strong> depended on the kind of question. It was lowest for the <strong>capital letters</strong> question, at about 15 percent. It was higher for the <strong>rhyme</strong> question, at about 48 percent. It was highest for the <strong>fill in the blanks</strong> question, at about 80 percent.',
  'Deeper processing therefore produced better memory. The words were the same kind of words in every condition, and only the depth of the question changed. This is the result that levels of processing theory predicts.'],
 v22=[
  ('Each trial in **Craik and Tulving (1975)** had three steps. A **question** was asked, a **word** was presented, and the person **answered** the question.', []),
  ('Memory was **lowest** after the capital letters question, **higher** after the rhyme question and **highest** after the fill-in-the-blank question.',
   ['The percent correct was about 15 for capital letters, about 48 for rhyme and about 80 for fill in the blanks.']),
  ('**Craik and Tulving (1975)** showed that **deeper processing leads to better memory**, which is what levels of processing theory predicts.', [])],
 core='Levels of processing')

slide(7, 'Other factors that aid encoding',
 original=[
  'Several other factors aid encoding. They are <strong>visual imagery</strong>, the <strong>self-reference effect</strong>, the <strong>generation effect</strong>, <strong>organizing to-be-remembered information</strong>, <strong>relating words to survival value</strong>, and <strong>retrieval practice</strong>.',
  'Visual imagery means forming a mental image that connects the items to be remembered. The self-reference effect is better memory for information that is related to oneself. The generation effect is better memory for material a person generates than for material the person only reads. Visual imagery, the self-reference effect and the generation effect each add meaning or connections at encoding.',
  'A comparison of two groups shows the effect of visual imagery on word pairs such as boat and tree. A <strong>repetition group</strong> repeated the pair, and an <strong>imagery group</strong> formed an image that combined the two items, such as a boat in a tree. The <strong>percent correct recall</strong> was more than twice as high for the imagery group as for the repetition group.'],
 v22=[
  ('Several factors **aid encoding**. They are **visual imagery**, the **self-reference effect**, the **generation effect**, **organizing** the information, **relating words to survival value** and **retrieval practice**.', []),
  ('The **self-reference effect** is better memory for information related to oneself. The **generation effect** is better memory for material a person generates than for material the person only reads.', []),
  ('**Visual imagery** helps memory for word pairs such as boat and tree. A group that formed an image of the two items together recalled **more than twice as many** pairs as a group that repeated the pair.',
   ['Forming the image connects the two words, which repetition alone does not do.'])],
 core='Factors that aid encoding')

slide(8, 'Blank page')

slide(9, 'Bransford and Johnson (1972): organization and comprehension',
 original=[
  '<strong>Bransford & Johnson (1972)</strong> <strong>presented difficult-to-comprehend information</strong>. Participants read a passage that was hard to understand on its own, and their memory for it was tested.',
  '<strong>Experimental Group 1 saw a picture that helped explain the information before reading it</strong>. <strong>Experimental Group 2 saw the picture after reading the passage</strong>. The <strong>Control Group did not see the picture</strong>.',
  '<strong>Group 1 outperformed the others</strong>. <strong>Having a mental framework of comprehension aided memory encoding and retrieval</strong>. The picture helped only when it came before the passage, because it gave participants a way to organize the sentences as they read them.'],
 v22=[
  ('**Bransford and Johnson (1972)** had people read a passage that was **difficult to comprehend** on its own.', []),
  ('**Group 1** saw a **picture that explained the passage before** reading it. **Group 2** saw the picture **after** reading it. The **control group** did not see the picture.', []),
  ('**Group 1 outperformed the others.** This is because **a mental framework for comprehension aids encoding and retrieval**.',
   ['The picture helped only when it came first, because it let people organize the sentences as they read them.'])],
 core='Organization and comprehension')

slide(10, 'Blank page')

slide(11, 'Bransford and Johnson (1972): the picture',
 original=[
  'The picture used by <strong>Bransford and Johnson (1972)</strong> shows a man playing a guitar on the street below a tall building, with a woman at a high window. A loudspeaker hangs in front of her window, held up by balloons.',
  'The passage was difficult to comprehend on its own. With the picture seen first, each sentence can be placed into one organized scene, which is the mental framework that aided memory.'],
 v22=[
  ('The picture from **Bransford and Johnson (1972)** shows a man playing a guitar below a tall building. A loudspeaker held up by balloons hangs near a woman at a high window.', []),
  ('The passage was difficult to comprehend on its own. Seeing the picture first gave people **one organized scene** to fit each sentence into.',
   ['That organized scene is the mental framework that aided memory.'])])

slide(12, 'The retrieval practice effect: Karpicke and Roediger (2008)',
 original=[
  '<strong>Karpicke and Roediger (2008)</strong> ran a <strong>study-and-test experiment with word pairs</strong>. All groups first studied and were tested on all of the pairs. The groups then differed in what they kept studying and what they kept being tested on.',
  '<strong>Group 1 studied and was tested on all words in all sessions</strong>. <strong>Group 2 studied only the words missed in previous tests</strong> and was <strong>tested on all words</strong>. <strong>Group 3 studied all words</strong> and was <strong>tested only on the words missed in previous tests</strong>.',
  '<strong>Group 3’s later performance was lower than that of Groups 1 and 2</strong>. Group 3 was the group that had less testing. This <strong>shows that testing memory retrieval can improve memory</strong>, which is the <strong>retrieval practice effect</strong>.'],
 v22=[
  ('**Karpicke and Roediger (2008)** had people study and take tests on **word pairs**. Three groups differed in how much they kept studying and how much they kept being tested.', []),
  ('**Group 1** studied and was tested on all pairs. **Group 2** studied only the pairs it had missed but was **tested on all pairs**. **Group 3** studied all pairs but was **tested only on the pairs it had missed**.',
   ['Group 2 had less studying, and Group 3 had less testing.']),
  ('**Group 3 did worse later** than Groups 1 and 2. This is the **retrieval practice effect**, which is that **testing memory retrieval can improve memory**.', [])])

slide(13, 'Karpicke and Roediger (2008): design and result',
 original=[
  'In the <strong>first study and test session</strong> of <strong>Karpicke and Roediger (2008)</strong>, every group studied <strong>all pairs</strong> and was tested on <strong>all pairs</strong>. The groups differed in the <strong>repeat study and test sessions</strong>.',
  '<strong>Group 1</strong> kept studying all pairs and being tested on all pairs. <strong>Group 2 (less studying)</strong> studied <strong>only pairs not recalled in previous tests</strong> and was tested on all pairs. <strong>Group 3 (less testing)</strong> studied all pairs and was tested on <strong>only pairs not recalled in previous tests</strong>.',
  'On the <strong>test after one week</strong>, Group 1 scored <strong>81 percent correct</strong>, Group 2 scored <strong>81 percent correct</strong>, and Group 3 scored <strong>36 percent correct</strong>. Cutting back on studying did not hurt memory, but cutting back on testing did. Being tested on the pairs is what kept them in memory.'],
 v22=[
  ('In **Karpicke and Roediger (2008)**, all three groups started the same way. They studied all pairs and were tested on all pairs.', []),
  ('In the repeat sessions, **Group 2 had less studying** and **Group 3 had less testing**. Each dropped only the pairs it had already recalled.', []),
  ('After **one week**, Group 1 scored **81 percent**, Group 2 scored **81 percent** and Group 3 scored **36 percent**.',
   ['Less studying did not hurt memory, and less testing did.', 'So being tested on the pairs is what kept them in memory.'])],
 core='Retrieval practice effect')

slide(14, 'Effective Studying · divider')

slide(15, 'Memory and effective studying',
 original=[
  'The first principle of effective studying is to <strong>elaborate</strong>, which means to <strong>associate what you are learning to what you already know</strong>. The second is to <strong>generate questions and self-test</strong>. Self-testing is retrieval practice, and it improves later memory.',
  'The third principle is to <strong>take breaks</strong>. The <strong>spacing effect</strong> is that <strong>memory is better for multiple short study sessions</strong> than for one long session. In addition, <strong>consolidation is enhanced by sleep after studying</strong>.',
  'The fourth principle is to <strong>avoid the “illusion of learning.”</strong> <strong>Familiarity does not mean comprehension</strong>. Rereading makes material feel familiar, and that feeling can be mistaken for understanding it.'],
 v22=[
  ('**Elaborate** when studying, which means **connecting what you are learning to what you already know**. Also **generate questions and self-test**.',
   ['Self-testing is retrieval practice.']),
  ('**Take breaks.** The **spacing effect** is that memory is **better for multiple short study sessions**. **Sleep after studying** also enhances consolidation, which is the process that makes a new memory more permanent.', []),
  ('Avoid the **illusion of learning**. **Familiarity does not mean comprehension.**',
   ['Rereading makes material feel familiar, and that feeling can be mistaken for understanding.'])],
 core='Effective studying')

slide(16, 'Retrieval: Getting Information Out of Memory · divider')

slide(17, 'Retrieving information from long-term memory',
 original=[
  '<strong>Retrieval</strong> is the <strong>process of transferring information from LTM back into working memory (consciousness)</strong>. Information that is stored in long-term memory is not in awareness until it is retrieved.',
  '<strong>Most of our failures of memory are failures to retrieve</strong>. The information is often still stored, but the person cannot bring it back at that moment. This is why the conditions at retrieval, such as the cues that are available, matter so much for memory.'],
 v22=[
  ('**Retrieval** is the process of **transferring information from long-term memory back into working memory**, which is consciousness.', []),
  ('**Most failures of memory are failures to retrieve.**',
   ['The information is often still stored, but the person cannot bring it back at that moment.'])])

slide(18, 'Cued recall and retrieval cues',
 original=[
  'In <strong>cued recall</strong>, a <strong>cue is presented to aid recall</strong>. A cue is a word or other stimulus that is related to the information to be remembered. Cued recall gives <strong>increased performance over free recall</strong>, in which the person recalls without any cues.',
  '<strong>Retrieval cues are most effective when created by the person who uses them</strong>. In a comparison of three conditions, participants <strong>remembered 91 percent of the nouns using self-generated retrieval cues</strong>. Participants <strong>remembered 55 percent of the nouns using other-person-generated retrieval cues</strong>.',
  'Participants who <strong>never saw the nouns</strong> and were <strong>presented with other-person-generated retrieval cues</strong> produced 17 percent of the words. This last condition shows how many of the words could be guessed from the cues alone. Cues that a person creates are far more effective than cues created by someone else.'],
 v22=[
  ('In **cued recall**, a **cue is presented to aid recall**. Performance is **better than in free recall**, where no cues are given.', []),
  ('**Retrieval cues work best when the person who uses them created them.** People recalled **91 percent** of the nouns with cues they had made themselves and **55 percent** with cues another person had made.', []),
  ('People who had **never seen the nouns** produced **17 percent** of them from another person’s cues.',
   ['This shows how many words could be guessed from the cues alone.'])],
 core='Retrieval cues')

slide(19, 'Encoding specificity',
 original=[
  '<strong>Encoding specificity</strong> is the principle that <strong>we learn information together with its context</strong>. The context, such as the place where learning occurs, is stored along with the information. The same context can later act as a retrieval cue.',
  '<strong>Baddeley’s (1975) “diving experiment”</strong> tested this principle. Divers learned words in one location and were tested either in the same location or in a different one. The <strong>best recall occurred when encoding and retrieval occurred in the same location</strong>.'],
 v22=[
  ('**Encoding specificity** is the principle that **we learn information together with its context**. The context is stored with the information and can later act as a retrieval cue.', []),
  ('**Baddeley’s (1975) “diving experiment”** tested this. **Recall was best when encoding and retrieval occurred in the same location.**', [])])

slide(20, 'The diving experiment: results',
 original=[
  'In <strong>Godden and Baddeley’s (1975) diving experiment</strong>, words were learned either <strong>underwater</strong> or <strong>on land</strong>, and recall was tested either underwater or on land. The measure was the <strong>average percent of words recalled</strong>.',
  'Words learned underwater and recalled underwater gave <strong>32 percent</strong>. Words learned underwater and recalled on land gave <strong>23 percent</strong>. Words learned on land and recalled on land gave <strong>38 percent</strong>. Words learned on land and recalled underwater gave <strong>24 percent</strong>.',
  'Recall was higher in the two conditions where the learning location and the recall location matched. Neither location was better on its own, because each location helped only the words that had been learned there. This is the pattern that encoding specificity predicts.'],
 v22=[
  ('In **Godden and Baddeley’s (1975) diving experiment**, words were learned **underwater** or **on land** and then recalled underwater or on land.', []),
  ('When the two locations **matched**, recall was **32 percent** (underwater both times) and **38 percent** (on land both times). When they **did not match**, recall was **23 percent** and **24 percent**.', []),
  ('Recall was better when the **learning location and the recall location were the same**.',
   ['Neither location was better on its own. Each location helped only the words learned there.'])],
 core='Encoding specificity')

slide(21, 'Encoding specificity: three experiments',
 original=[
  'Three experiments show the same pattern. In <strong>Godden and Baddeley’s (1975) “diving” experiment</strong>, participants studied underwater or on land and were tested underwater or on land. Scores were highest when study and test matched, at 11.5 for underwater both times and 13.5 for on land both times, compared with 8.5 and 9.05 when they did not match.',
  'In <strong>Grant and colleagues’ (1998) “studying” experiment</strong>, participants studied in noise or in quiet and were tested in noise or in quiet. Scores were 6.2 for noise both times and 6.7 for quiet both times, compared with 5.4 and 4.6 when the conditions did not match.',
  'In <strong>Eich and Metcalfe’s (1989) “mood” experiment</strong>, participants studied while sad or happy and were tested while sad or happy. Scores were 27 for sad both times and 32 for happy both times, compared with 17 and 17 when the moods did not match. In all three experiments, memory was best when the conditions at retrieval matched the conditions at encoding.'],
 v22=[
  ('In **Godden and Baddeley’s (1975) “diving” experiment**, people studied underwater or on land. Scores were highest when the test was in the **same place** as the study.', []),
  ('In **Grant and colleagues’ (1998) “studying” experiment**, people studied in noise or in quiet. Scores were highest when the test had the **same noise condition** as the study.', []),
  ('In **Eich and Metcalfe’s (1989) “mood” experiment**, people studied while sad or happy. Scores were highest when the **mood at test matched the mood at study**.',
   ['In all three, memory was best when the conditions at retrieval matched the conditions at encoding.'])],
 core='Encoding specificity')

slide(22, 'State-dependent learning',
 original=[
  '<strong>State-dependent learning</strong> is <strong>learning that is associated with a particular internal state</strong>. An internal state is a condition of the person, such as a mood. The state present during learning is stored with the information.',
  'There is <strong>better memory if a person’s mood at encoding matches the mood during retrieval</strong>. Encoding specificity is usually shown with the match of an outside context, such as a location. State-dependent learning is the same kind of match for the person’s internal state, and the mood experiment of Eich and Metcalfe (1989) fits both terms.'],
 v22=[
  ('**State-dependent learning** is **learning that is associated with a particular internal state**, such as a mood.', []),
  ('Memory is **better when a person’s mood at encoding matches the mood during retrieval**.',
   ['Encoding specificity is usually shown with an outside context, such as a location. State-dependent learning is the same kind of match for the person’s internal state.',
    'The mood experiment of Eich and Metcalfe (1989) is also an encoding specificity experiment, so it fits both terms.'])],
 core='Encoding specificity')

slide(23, 'Transfer-appropriate processing',
 original=[
  '<strong>Transfer-appropriate processing</strong> is the principle that <strong>memory task results improve if the type of processing used during encoding is the same as the type during retrieval</strong>. The match is between the kinds of thinking done at the two times.',
  '<strong>Morris and colleagues (1977)</strong> tested this principle. With <strong>rhyming-based encoding</strong>, participants did a <strong>rhyming task</strong> and then took a <strong>rhyming test</strong>, and they scored <strong>49 percent</strong>. With <strong>meaning-based encoding</strong>, participants did a <strong>meaning task</strong> and then took the same rhyming test, and they scored <strong>33 percent</strong>.',
  'The rhyming test was passed more often by the group that had encoded by rhyme. Meaning-based encoding is deeper, but it did not match the rhyming test. Matching the type of processing mattered more than depth for that test.'],
 v22=[
  ('**Transfer-appropriate processing** means memory is **better when the type of processing at encoding is the same as the type at retrieval**.', []),
  ('**Morris and colleagues (1977)** gave a **rhyming test** to two groups. The group that had encoded by **rhyme** scored **49 percent**, and the group that had encoded by **meaning** scored **33 percent**.',
   ['Meaning-based encoding is deeper, but it did not match the rhyming test.'])])

slide(24, 'Morris and colleagues (1977): the task',
 original=[
  'In the <strong>encoding phase</strong> of <strong>Morris and colleagues (1977)</strong>, <strong>participants read a list of target words (e.g., eagle or train) and answered one of two types of “Yes/No” questions</strong>. <strong>Semantic (deep) processing</strong> used a question such as <strong>“Does the word fit in the sentence: ‘The ______ had a silver engine’?”</strong>, which focuses on meaning. <strong>Rhyme (shallow) processing</strong> used a question such as <strong>“Does the word rhyme with ‘legal’?”</strong>, which focuses on sound.',
  'In the <strong>retrieval phase</strong>, there were <strong>two different memory tests</strong>. Instead of only giving a standard meaning-based recognition test, as Craik and Tulving did, Morris and colleagues gave participants one of two tests.',
  'The <strong>standard recognition test</strong> asked participants to <strong>identify the exact studied words from a list of new distractors</strong>, which favors meaning or semantic processing. The <strong>rhyming recognition test</strong> asked participants to <strong>identify words on the test list that rhyme with the words studied earlier</strong>, such as seeing regal and recognizing that it rhymes with eagle, which was on the study list.'],
 v22=[
  ('In **Morris and colleagues (1977)**, people read target words and answered one of two kinds of questions. A **semantic** question asked whether the word fit in a sentence. A **rhyme** question asked whether the word rhymed with another word.',
   ['The semantic question is deep processing, and the rhyme question is shallow processing.']),
  ('People then took one of **two memory tests**. The **standard recognition test** asked them to pick out the exact words they had studied.', []),
  ('The **rhyming recognition test** asked them to pick out words that **rhymed with** the studied words, such as regal for eagle.',
   ['This test matches rhyme processing, and the standard test favors meaning processing.'])])

slide(25, 'Morris and colleagues (1977): results',
 original=[
  '<strong>On the standard recognition test</strong> in <strong>Morris and colleagues (1977)</strong>, <strong>semantic (deep) processing beat rhyme processing (84% vs. 63%)</strong>, <strong>replicating Craik and Tulving’s classic finding</strong>. When the test is about the words themselves, deeper encoding gives better memory.',
  '<strong>On the rhyming recognition test</strong>, <strong>rhyme (shallow) processing beat semantic processing (49% vs. 33%)</strong>. Shallow encoding gave better memory than deep encoding on this test.',
  'The better kind of encoding therefore depended on the test. Each kind of encoding did best on the test that required the same kind of processing. This is transfer-appropriate processing, and it shows that deep processing is not always best.'],
 v22=[
  ('On the **standard recognition test** in **Morris and colleagues (1977)**, **semantic processing beat rhyme processing**, 84 percent to 63 percent.',
   ['This replicated the finding of Craik and Tulving.']),
  ('On the **rhyming recognition test**, **rhyme processing beat semantic processing**, 49 percent to 33 percent.', []),
  ('**Morris and colleagues (1977)** showed that the best kind of encoding **depends on the test**. Each kind did best on the test that required the same kind of processing.',
   ['So deep processing is not always best.'])],
 core='Transfer-appropriate processing')

slide(26, 'Consolidation: Establishing Memories · divider')

slide(27, 'Consolidation',
 original=[
  '<strong>Consolidation</strong> <strong>transforms new memories from a fragile state to a more permanent state</strong>. A new memory can be disrupted easily, and consolidation makes it more resistant to disruption.',
  '<strong>Synaptic consolidation</strong> is <strong>rapid</strong> and <strong>occurs at synapses</strong>. A synapse is the small gap where one neuron passes a signal to the next.',
  '<strong>Systems consolidation</strong> is <strong>gradual</strong> and involves the <strong>reorganization of neural circuits</strong>. It concerns how groups of neurons in different brain areas come to be connected over a long period.'],
 v22=[
  ('**Consolidation** **transforms new memories from a fragile state to a more permanent state**.', []),
  ('**Synaptic consolidation** is **rapid** and **occurs at synapses**, the gaps where one neuron signals the next.', []),
  ('**Systems consolidation** is **gradual** and is the **reorganization of neural circuits**.', [])])

slide(28, 'Synaptic consolidation and systems consolidation',
 original=[
  '<strong>Synaptic consolidation</strong> is a <strong>structural change at the synapse</strong>, and it is the <strong>faster</strong> process. The change happens at the connection between two neurons.',
  '<strong>Systems consolidation</strong> is the <strong>reorganization of a neural circuit</strong>, and it is the <strong>slow</strong> process. The change happens across a network of many neurons. The two processes work at different scales and at different speeds.'],
 v22=[
  ('**Synaptic consolidation** is a **structural change at the synapse**, and it is the **faster** process.', []),
  ('**Systems consolidation** is the **reorganization of a neural circuit**, and it is the **slow** process.',
   ['One works at a single connection, and the other works across a network of neurons.'])])

slide(29, 'Müller and Pilzecker (1900): the experiment',
 original=[
  'In <strong>Müller and Pilzecker (1900)</strong>, <strong>participants memorized a list of nonsense syllables (List A, such as ZOF, BIK, TUP) using paired-associate learning</strong>. The manipulation was the <strong>timing of interference</strong>. <strong>After learning List A, participants were given a second list of nonsense syllables (List B) to learn, varying the time delay between the two lists</strong>.',
  'The <strong>immediate group</strong> <strong>learned List B immediately (within seconds) after finishing List A</strong>. The <strong>delayed group</strong> <strong>had a 6-minute break (quiet rest) after finishing List A before learning List B</strong>. <strong>Both groups were later tested on their memory for List A</strong>.',
  'Recall of the first list was <strong>28 percent</strong> for the immediate group and <strong>48 percent</strong> for the delay group. Learning the second list right away interfered with memory for the first list. A 6-minute rest protected it.'],
 v22=[
  ('In **Müller and Pilzecker (1900)**, people memorized a list of **nonsense syllables** and then learned a second list.', []),
  ('The **immediate group** learned the second list **right away**. The **delayed group** rested for **6 minutes** first. Both groups were later tested on the **first list**.', []),
  ('The immediate group recalled **28 percent** of the first list, and the delayed group recalled **48 percent**.',
   ['Learning the second list right away interfered with memory for the first list.'])],
 core='Consolidation')

slide(30, 'The perseveration-consolidation hypothesis',
 original=[
  '<strong>Müller and Pilzecker proposed that neural activity continues (“perseverates”) for a short period after an experience ends</strong>. This is the <strong>perseveration-consolidation hypothesis</strong>.',
  '<strong>This post-learning period is required for the fragile memory trace to consolidate (harden) into a stable long-term memory</strong>. The memory is not finished at the moment learning ends.',
  '<strong>If a new cognitive task interrupts this window, consolidation is disrupted and the memory is lost</strong>. This explains their result. The immediate group began the second list during this window, so the first list was not consolidated. The delayed group rested through the window, so the first list was consolidated.'],
 v22=[
  ('**Müller and Pilzecker** proposed the **perseveration-consolidation hypothesis**. It states that **neural activity continues for a short period after an experience ends**.', []),
  ('This period after learning is **required for the fragile memory trace to consolidate** into a stable long-term memory.', []),
  ('**If a new task interrupts this period, consolidation is disrupted and the memory is lost.**',
   ['The immediate group started the second list during this period, so the first list was not consolidated.'])],
 core='Consolidation')

slide(31, 'Synaptic consolidation: Hebb and long-term potentiation',
 original=[
  '<strong>Hebb (1948)</strong> proposed that <strong>learning and memory are represented in the brain by physiological changes at the synapse</strong>. These changes provide a <strong>neural record of experience</strong>.',
  '<strong>Long-term potentiation (LTP)</strong> is the <strong>enhanced firing of neurons after repeated stimulation</strong>. When a synapse is stimulated again and again, the neuron on the receiving side responds more strongly than before.',
  'Long-term potentiation involves <strong>structural changes and enhanced responding</strong>. The synapse itself changes physically, and the changed synapse produces more firing to the same stimulus. This is a way that experience can leave a lasting record at the synapse.'],
 v22=[
  ('**Hebb (1948)** proposed that learning and memory are represented in the brain by **physiological changes at the synapse**. These changes are a **neural record of experience**.', []),
  ('**Long-term potentiation (LTP)** is the **enhanced firing of neurons after repeated stimulation**.',
   ['It involves **structural changes** at the synapse and **enhanced responding**.'])],
 core='Synaptic consolidation')

slide(32, 'Long-term potentiation at the synapse',
 original=[
  'At the <strong>first presentation of a stimulus</strong>, the first neuron releases a small amount of signal across the synapse, and the second neuron fires at a low rate.',
  'With <strong>continued presentation of the stimulus</strong>, activity at the synapse is repeated. This repeated activity leads to <strong>structural changes</strong> at the synapse.',
  '<strong>Later, when the same stimulus is presented again</strong>, the synapse has changed, and there is <strong>increased firing (LTP)</strong>. The same stimulus now produces a larger response than it did the first time.'],
 v22=[
  ('At the **first presentation of a stimulus**, the second neuron fires at a low rate.', []),
  ('With **continued presentation**, the repeated activity causes **structural changes** at the synapse.', []),
  ('**Later, when the same stimulus is presented again**, there is **increased firing**. This increase is **long-term potentiation (LTP)**.', [])])

slide(33, 'Systems consolidation: the standard model',
 original=[
  'The <strong>standard model of consolidation</strong> describes systems consolidation. According to this model, <strong>after encoding, the activity of the hippocampus fades with time</strong>.',
  'At first, the hippocampus is connected to the areas of the cortex that were active during the experience, and it links them together. Over time, the connections among the cortical areas themselves become stronger, and the connections with the hippocampus become weaker.',
  'In the end, the cortical areas are connected directly to one another, and the hippocampus is no longer needed for that memory. In the standard model, the hippocampus is essential for recent memories and is not needed for remote memories.'],
 v22=[
  ('The **standard model of consolidation** states that **after encoding, the activity of the hippocampus fades with time**.', []),
  ('At first, the hippocampus, a brain area, links the areas of the cortex that hold the memory. The cortex is the outer layer of the brain. Over time, the connections **among the cortical areas grow stronger**, and the connections with the hippocampus grow weaker.', []),
  ('In the end, the cortical areas are connected directly, and the **hippocampus is no longer needed** for that memory.', [])],
 core='Systems consolidation')

slide(34, 'Memory loss and injury',
 original=[
  'The <strong>standard model of consolidation is based partly on observation of injury or trauma-related memory loss</strong>. What people forget after an injury gives evidence about how memories are consolidated.',
  '<strong>Retrograde amnesia</strong> is the <strong>loss of memory for events prior to the trauma</strong>. The person cannot remember things that happened before the injury.',
  '<strong>Graded amnesia</strong> means that <strong>memory for recent events is more fragile than for remote events</strong>. The amnesia is worst for events just before the injury and becomes less severe for earlier events. This fits the standard model, because recent memories have had less time to be consolidated.'],
 v22=[
  ('The **standard model** is based partly on **memory loss after injury or trauma**.', []),
  ('**Retrograde amnesia** is the **loss of memory for events before the trauma**.', []),
  ('**Graded amnesia** means that **memory for recent events is more fragile than memory for remote events**.',
   ['The amnesia is worst for events just before the injury.', 'This fits the standard model, because recent memories have had less time to consolidate.'])],
 core='Systems consolidation')

slide(35, 'Retrograde and anterograde amnesia',
 original=[
  'Memory loss after an injury is described by its direction in time. <strong>Retrograde</strong> amnesia concerns the <strong>past</strong>, which is the period before the injury. <strong>Anterograde</strong> amnesia concerns the <strong>future</strong>, which is the period after the injury.',
  '<strong>Graded amnesia</strong> affects the period just before the <strong>injury</strong> most strongly. The loss becomes smaller for events further back in time, and <strong>remote memory</strong>, which is memory for events from long ago, is the least affected.'],
 v22=[
  ('**Retrograde** amnesia is about events in the **past**, before the injury. **Anterograde** amnesia is about events in the **future**, after the injury.', []),
  ('**Graded amnesia** is strongest for the period just before the injury. **Remote memory**, which is memory for events from long ago, is affected the least.', [])])

slide(36, 'Systems consolidation: the multiple trace model',
 original=[
  'The <strong>multiple trace model of consolidation</strong> gives the hippocampus a longer-lasting role than the standard model does.',
  'In support of this model, the <strong>hippocampus is activated during retrieval of both recent and remote memories (Gilboa and colleagues, 2004)</strong>. In the standard model, the hippocampus would not be needed for remote memories, so this finding does not fit the standard model.',
  'In addition, the <strong>response of the hippocampus can change over time (Viskontas and colleagues, 2009)</strong>. The hippocampus does not stop taking part as a memory gets older. Its involvement can remain and can change.'],
 v22=[
  ('The **multiple trace model of consolidation** states that the hippocampus stays involved in memories, including old ones.', []),
  ('**Gilboa and colleagues (2004)** found that the **hippocampus is activated during retrieval of both recent and remote memories**.',
   ['In the standard model, the hippocampus would not be needed for remote memories.']),
  ('**Viskontas and colleagues (2009)** found that the **response of the hippocampus can change over time**.', [])],
 core='Multiple trace model')

slide(37, 'The multiple trace model process',
 original=[
  'In the <strong>multiple trace model process</strong>, the hippocampus is connected to the cortical areas when a memory is first formed, as in the standard model.',
  'Later, the connections among the cortical areas become stronger, but the hippocampus remains connected to those areas. The hippocampus continues to take part in the memory. This is the difference from the standard model, in which the hippocampal connections fade away.'],
 v22=[
  ('In the **multiple trace model**, the hippocampus is connected to the cortical areas when the memory is first formed.', []),
  ('Later, the cortical connections grow stronger, and the **hippocampus stays connected**.',
   ['In the standard model, the connections with the hippocampus fade away.'])])

slide(38, 'Consolidation and sleep',
 original=[
  '<strong>Memory consolidation appears to be enhanced during sleep (Gais and colleagues, 2006)</strong>. <strong>One reason</strong> is that <strong>sleeping stops interference from environmental stimuli</strong>. During sleep, no new experiences arrive to disrupt the memories that are being consolidated.',
  '<strong>Some memories are consolidated more than others (Wilhelm and colleagues, 2011)</strong>. <strong>Memory for a task was stronger when participants expected to be tested after awaking</strong>. Memories that a person expects to need later are more likely to be strengthened during sleep.'],
 v22=[
  ('**Gais and colleagues (2006)** found that **memory consolidation appears to be enhanced during sleep**.',
   ['One reason is that **sleeping stops interference** from environmental stimuli.']),
  ('**Wilhelm and colleagues (2011)** found that **some memories are consolidated more than others**. Memory for a task was **stronger when people expected to be tested after waking**.', [])],
 core='Consolidation and sleep')

slide(39, 'Reconsolidation: The Dynamics of Memory · divider')

slide(40, 'Reconsolidation: memory updating',
 original=[
  '<strong>Retrieved memories become fragile and are consolidated again</strong>, and this process is <strong>reconsolidation</strong>. Retrieving a memory returns it to a state like that of a new memory, and it then has to be made stable again.',
  'Two experiments studied reconsolidation. <strong>Nader and colleagues (2000)</strong> ran a <strong>rat experiment</strong>, and <strong>Hupbach and colleagues (2007)</strong> ran a <strong>human reconsolidation experiment</strong>.',
  'Because of reconsolidation, <strong>memory is a “work in progress.”</strong> It is <strong>constantly constructed and remodeled in response to learning and conditions</strong>. A memory can be changed each time it is retrieved.'],
 v22=[
  ('**Reconsolidation** is the process in which **retrieved memories become fragile and are consolidated again**.', []),
  ('**Nader and colleagues (2000)** studied reconsolidation in **rats**, and **Hupbach and colleagues (2007)** studied it in **humans**.', []),
  ('Memory is a **“work in progress.”** It is **constantly constructed and remodeled** in response to learning and conditions.',
   ['A memory can be changed each time it is retrieved.'])],
 core='Reconsolidation')

slide(41, 'Nader and colleagues (2000): reconsolidation in rats',
 original=[
  'In <strong>Nader and colleagues (2000)</strong>, <strong>researchers trained rats to associate a tone with a mild electric shock</strong>. <strong>Eventually, the tone alone triggered freezing, a fear response</strong>.',
  '<strong>After the fear memory had consolidated, researchers played the tone again to reactivate the memory</strong>. <strong>Some rats then received anisomycin, a drug that inhibits protein synthesis, in the amygdala</strong>.',
  '<strong>Rats that received anisomycin after memory reactivation showed substantially reduced freezing when tested later</strong>. <strong>Rats receiving a control infusion retained the fear response</strong>. The conclusion is that <strong>even established memories may require protein synthesis to become stable again after retrieval</strong>.'],
 v22=[
  ('In **Nader and colleagues (2000)**, rats learned to **associate a tone with a mild electric shock**. The tone alone then caused **freezing**, which is a fear response.', []),
  ('After the fear memory had consolidated, the tone was played again to **reactivate the memory**. Some rats then received **anisomycin**, a drug that **inhibits protein synthesis**, in the amygdala, a brain area involved in fear.', []),
  ('Rats that received anisomycin showed **much less freezing** later. Rats that received a control infusion **kept the fear response**.',
   ['So even an established memory may need protein synthesis to become stable again after it is retrieved.'])],
 core='Reconsolidation')

slide(42, 'Hupbach and colleagues (2007): reconsolidation in humans',
 original=[
  'In <strong>Hupbach and colleagues (2007)</strong>, <strong>participants first learned a list of objects (List 1)</strong>. <strong>Two days later, some participants returned to the same experimental context and were reminded of the first session before learning a new list (List 2)</strong>. <strong>Other participants learned List 2 without the same reminder</strong>.',
  '<strong>When tested on List 1 two days afterward, participants who received the reminder were more likely to mistakenly recall objects from List 2 as belonging to List 1</strong>.',
  'The conclusion is that <strong>reactivating an existing memory can allow new information to become integrated into that memory</strong>. <strong>This is important because it demonstrates that reconsolidation can involve updating memories, not simply strengthening them</strong>.'],
 v22=[
  ('In **Hupbach and colleagues (2007)**, people learned a list of objects, **List 1**. Two days later, some were **reminded of the first session** before learning a new list, **List 2**. Others learned List 2 **without the reminder**.', []),
  ('When tested on List 1, the people who got the **reminder** were more likely to **mistakenly recall List 2 objects as part of List 1**.', []),
  ('**Hupbach and colleagues (2007)** showed that **reactivating a memory lets new information become part of it**.',
   ['So reconsolidation can update a memory and does not only strengthen it.'])],
 core='Reconsolidation')

slide(43, 'Reconsolidation and PTSD',
 original=[
  '<strong>Posttraumatic stress disorder (PTSD) causes severe emotional responses to traumatic memories</strong>. Reconsolidation suggests a way to weaken those responses, because a retrieved memory becomes fragile.',
  '<strong>Brunet and colleagues (2008)</strong> set out to <strong>test whether blocking reconsolidation after memory retrieval reduces physiological PTSD symptoms</strong>. The participants were <strong>individuals diagnosed with chronic posttraumatic stress disorder (PTSD)</strong>.'],
 v22=[
  ('**Posttraumatic stress disorder (PTSD)** causes **severe emotional responses to traumatic memories**.', []),
  ('**Brunet and colleagues (2008)** tested whether **blocking reconsolidation after memory retrieval reduces physiological PTSD symptoms**. The participants had **chronic PTSD**.', [])])

slide(44, 'Brunet and colleagues (2008): procedure and findings',
 original=[
  'In the <strong>reactivation</strong> step of <strong>Brunet and colleagues (2008)</strong>, <strong>participants wrote a detailed script of their traumatic event</strong>, which made the memory fragile. In the <strong>intervention</strong> step, <strong>immediately after recall, participants received either propranolol (a beta-blocker that blocks stress hormones in the amygdala) or a placebo</strong>.',
  'In the <strong>test one week later</strong>, the researchers <strong>measured physiological stress responses (heart rate, skin conductance) while participants listened to their trauma script</strong>.',
  '<strong>The propranolol group showed significantly lower physiological fear responses than the placebo group</strong>. <strong>Factual memory remained intact, and only the intense emotional charge was blunted</strong>. The participants still remembered what had happened, but the memory produced a weaker stress response.'],
 v22=[
  ('In **Brunet and colleagues (2008)**, people with PTSD **wrote a detailed script of their traumatic event**, which reactivated the memory and made it fragile.', []),
  ('Right after recall, they received either **propranolol**, a drug that blocks stress hormones in the amygdala, or a **placebo**.',
   ['One week later, heart rate and skin conductance were measured while they listened to their script.']),
  ('The **propranolol group showed lower physiological fear responses** than the placebo group. **Factual memory stayed intact**, and only the emotional charge was reduced.', [])],
 core='Reconsolidation and PTSD')

slide(45, 'Blank page')


TOPICS = [
 ('Encoding, retrieval and rehearsal', [3]),
 ('Levels of processing and Craik and Tulving (1975)', [4, 5, 6]),
 ('Other factors that aid encoding', [7]),
 ('Organization and Bransford and Johnson (1972)', [9, 11]),
 ('The retrieval practice effect and Karpicke and Roediger (2008)', [12, 13]),
 ('Effective studying', [15]),
 ('Retrieval and retrieval cues', [17, 18]),
 ('Encoding specificity and state-dependent learning', [19, 20, 21, 22]),
 ('Transfer-appropriate processing and Morris and colleagues (1977)', [23, 24, 25]),
 ('Consolidation and Müller and Pilzecker (1900)', [27, 28, 29, 30]),
 ('Synaptic consolidation and long-term potentiation', [31, 32]),
 ('The standard model and memory loss', [33, 34, 35]),
 ('The multiple trace model', [36, 37]),
 ('Consolidation and sleep', [38]),
 ('Reconsolidation in rats and in humans', [40, 41, 42]),
 ('Reconsolidation and PTSD', [43, 44]),
]

EXPERIMENTS = [
 ('Craik and Tulving (1975) · Levels of processing', [5, 6]),
 ('Visual imagery · Repetition group and imagery group', [7]),
 ('Bransford and Johnson (1972) · Picture before or after the passage', [9, 11]),
 ('Karpicke and Roediger (2008) · Retrieval practice effect', [12, 13]),
 ('Retrieval cues · Self-generated and other-person-generated cues', [18]),
 ('Godden and Baddeley (1975) · Diving experiment', [19, 20, 21]),
 ('Grant and colleagues (1998), Eich and Metcalfe (1989) · Studying and mood experiments', [21, 22]),
 ('Morris and colleagues (1977) · Transfer-appropriate processing', [23, 24, 25]),
 ('Müller and Pilzecker (1900) · Perseveration-consolidation hypothesis', [29, 30]),
 ('Hebb (1948) · Synapse and long-term potentiation', [31, 32]),
 ('Gilboa and colleagues (2004), Viskontas and colleagues (2009) · Multiple trace model', [36, 37]),
 ('Gais and colleagues (2006), Wilhelm and colleagues (2011) · Consolidation and sleep', [38]),
 ('Nader and colleagues (2000) · Reconsolidation in rats', [41]),
 ('Hupbach and colleagues (2007) · Reconsolidation in humans', [42]),
 ('Brunet and colleagues (2008) · Reconsolidation and PTSD', [43, 44]),
]

QUESTIONS = []


def q(page, kind, stem, correct, d1, d2, d3, why):
    QUESTIONS.append(dict(page=page, kind=kind, stem=stem, options=[correct, d1, d2, d3], correct=0, why=why))


q(3, 'definition', 'What is the difference between maintenance rehearsal and elaborative rehearsal?',
  'Maintenance rehearsal repeats information, and elaborative rehearsal uses meaning and connections.',
  'Maintenance rehearsal uses meaning and connections, and elaborative rehearsal repeats information.',
  'Maintenance rehearsal transfers information to long-term memory, and elaborative rehearsal does not.',
  'Maintenance rehearsal happens at retrieval, and elaborative rehearsal happens during consolidation.',
  'Maintenance rehearsal is repetition that maintains information but does not transfer it to long-term memory. Elaborative rehearsal uses meanings and connections to help transfer information to long-term memory.')
q(3, 'definition', 'What is encoding?',
  'Acquiring information and transforming it into memory.',
  'Transferring information from long-term memory to working memory.',
  'Changing a fragile memory into a more permanent memory.',
  'Making a retrieved memory stable for a second time.',
  'Encoding is acquiring information and transforming it into memory. Retrieval is transferring information from long-term memory to working memory.')
q(4, 'definition', 'According to levels of processing theory, what leads to better memory?',
  'Deep processing, which pays close attention to meaning.',
  'Shallow processing, which focuses on physical features.',
  'Longer study time, whatever kind of processing is used.',
  'Repeating the item many times without thinking about it.',
  'Levels of processing theory states that memory depends on how information is encoded. Deep processing, with close attention to meaning, gives better memory than shallow processing, which focuses on physical features.')
q(5, 'design', 'In Craik and Tulving (1975), which question produced deep processing?',
  '“Does the word fit in the sentence: ‘He met a ______ in the street’?”',
  '“Is the word printed in capital letters, such as the word TABLE?”',
  '“Does the word rhyme with weight, such as the word crate?”',
  '“Does the word rhyme with legal, such as the word eagle?”',
  'The fill-in-the-blank sentence focused on meaning and context, which is deep or semantic processing. The capital letters question was shallow, and the rhyme question was intermediate.')
q(6, 'researcher', 'What did Craik and Tulving (1975) find?',
  'Memory was best after the meaning question and worst after the capital letters question.',
  'Memory was best after the capital letters question and worst after the meaning question.',
  'Memory was the same after all three kinds of question.',
  'Memory was best after the rhyme question and worst after the meaning question.',
  'The percent correct was lowest for the capital letters question, higher for the rhyme question and highest for the fill-in-the-blank question. Deeper processing produced better memory.')
q(7, 'application', 'One group repeats the word pair boat and tree. Another group forms an image of a boat in a tree. Which group recalls more pairs?',
  'The imagery group, which recalls more than twice as many pairs.',
  'The repetition group, which recalls more than twice as many pairs.',
  'Neither group, because both recall the same number of pairs.',
  'The repetition group, but only when the test is delayed.',
  'Visual imagery aids encoding. The percent correct recall was more than twice as high for the imagery group as for the repetition group.')
q(7, 'definition', 'Which list contains only factors that aid encoding?',
  'Visual imagery, the self-reference effect and the generation effect.',
  'Visual imagery, maintenance rehearsal and the generation effect.',
  'Shallow processing, the self-reference effect and retrieval practice.',
  'Visual imagery, the self-reference effect and shallow processing.',
  'The factors that aid encoding are visual imagery, the self-reference effect, the generation effect, organizing information, relating words to survival value and retrieval practice.')
q(9, 'researcher', 'In Bransford and Johnson (1972), which group remembered the passage best?',
  'The group that saw the picture before reading the passage.',
  'The group that saw the picture after reading the passage.',
  'The control group that never saw the picture.',
  'All three groups remembered the passage equally well.',
  'Group 1, which saw the picture before reading, outperformed the others. Having a mental framework of comprehension aided memory encoding and retrieval.')
q(9, 'design', 'Why did the picture in Bransford and Johnson (1972) help only when it came before the passage?',
  'It gave a framework for organizing the sentences during reading.',
  'It gave extra time to rehearse the sentences after they had been read.',
  'It replaced the passage, so participants did not need to read it.',
  'It made the passage more familiar because it was shown twice.',
  'Having a mental framework of comprehension aided encoding. Seeing the picture first let participants organize the sentences as they read them, which seeing it afterward could not do.')
q(12, 'researcher', 'In Karpicke and Roediger (2008), which group did worst on the test one week later?',
  'Group 3, which studied all pairs but was tested only on the pairs it had missed.',
  'Group 2, which was tested on all pairs but studied only the pairs it had missed.',
  'Group 1, which studied all pairs and was tested on all pairs.',
  'No group, because all three groups scored the same.',
  'Group 3 had less testing, and its later performance was lower than that of Groups 1 and 2. This shows that testing memory retrieval can improve memory.')
q(13, 'researcher', 'What were the scores after one week in Karpicke and Roediger (2008)?',
  'Group 1 scored 81 percent, Group 2 scored 81 percent and Group 3 scored 36 percent.',
  'Group 1 scored 81 percent, Group 2 scored 36 percent and Group 3 scored 81 percent.',
  'Group 1 scored 36 percent, Group 2 scored 81 percent and Group 3 scored 81 percent.',
  'Group 1 scored 81 percent, Group 2 scored 36 percent and Group 3 scored 36 percent.',
  'Group 1 and Group 2, which had less studying, both scored 81 percent. Group 3, which had less testing, scored 36 percent.')
q(13, 'definition', 'What is the retrieval practice effect?',
  'Testing memory retrieval improves later memory.',
  'Studying in several short sessions improves later memory.',
  'Matching the mood at study and test improves later memory.',
  'Sleeping after studying improves later memory.',
  'The retrieval practice effect is that testing memory retrieval can improve memory. In Karpicke and Roediger (2008), the group with less testing did worst.')
q(15, 'definition', 'What is the spacing effect?',
  'Memory is better for multiple short study sessions.',
  'Memory is better for one long study session before a test.',
  'Memory is better when the study room is kept very quiet.',
  'Memory is better for the first items in a list of words.',
  'The spacing effect is that memory is better for multiple short study sessions. Taking breaks is one of the principles of effective studying.')
q(15, 'application', 'A student rereads a chapter until it feels familiar and decides she understands it. Which studying error is this?',
  'The illusion of learning, because familiarity is not comprehension.',
  'The spacing effect, because the rereading was spread over time.',
  'The generation effect, because she produced the material herself.',
  'The retrieval practice effect, because rereading is a kind of test.',
  'Effective studying means avoiding the illusion of learning. Familiarity does not mean comprehension.')
q(17, 'definition', 'What causes most failures of memory?',
  'A failure to retrieve the information.',
  'A failure to encode the information deeply.',
  'A failure to rehearse the information.',
  'A failure to consolidate the information.',
  'Retrieval is transferring information from long-term memory back into working memory. Most of our failures of memory are failures to retrieve.')
q(18, 'researcher', 'Which retrieval cues were most effective?',
  'Cues created by the person using them, with 91 percent remembered.',
  'Cues created by another person, with 91 percent remembered.',
  'Cues created by another person, with 55 percent remembered.',
  'No cues of any kind during recall, with 91 percent remembered.',
  'Retrieval cues are most effective when created by the person who uses them. Participants remembered 91 percent of nouns with self-generated cues and 55 percent with cues another person generated.')
q(18, 'definition', 'How does cued recall compare with free recall?',
  'Cued recall gives better performance, because a cue aids recall.',
  'Cued recall gives worse performance, because a cue adds interference.',
  'Cued recall and free recall give the same performance on every list.',
  'Cued recall gives better performance only for nonsense syllables.',
  'In cued recall, a cue is presented to aid recall, and performance is higher than in free recall.')
q(19, 'definition', 'What is encoding specificity?',
  'We learn information together with its context.',
  'We learn information better when it is processed deeply.',
  'We learn information better when we are tested on it.',
  'We learn information better in several short sessions.',
  'Encoding specificity is the principle that we learn information together with its context. Recall is best when encoding and retrieval occur in the same context.')
q(20, 'researcher', 'What did Godden and Baddeley’s (1975) diving experiment show?',
  'Recall was best when words were learned and recalled in the same location.',
  'Recall was best when words were learned underwater, wherever they were recalled.',
  'Recall was best when words were recalled on land, wherever they were learned.',
  'Recall was the same in all four combinations of locations.',
  'Recall was 32 percent underwater both times and 38 percent on land both times, compared with 23 and 24 percent when the locations differed. Best recall occurred when encoding and retrieval were in the same location.')
q(21, 'researcher', 'Which experiment studied the match between noise and quiet at study and at test?',
  'Grant and colleagues’ (1998) “studying” experiment.',
  'Godden and Baddeley’s (1975) “diving” experiment.',
  'Eich and Metcalfe’s (1989) “mood” experiment.',
  'Morris and colleagues’ (1977) rhyming experiment.',
  'Grant and colleagues (1998) had participants study in noise or in quiet and tested them in noise or in quiet. Scores were highest when the conditions matched.')
q(21, 'researcher', 'Which experiment studied the match between mood at study and mood at test?',
  'Eich and Metcalfe’s (1989) “mood” experiment.',
  'Grant and colleagues’ (1998) “studying” experiment.',
  'Godden and Baddeley’s (1975) “diving” experiment.',
  'Karpicke and Roediger’s (2008) word-pair experiment.',
  'Eich and Metcalfe (1989) had participants study while sad or happy and tested them while sad or happy. Scores were highest when the moods matched.')
q(22, 'definition', 'What is state-dependent learning?',
  'Learning that is associated with a particular internal state, such as a mood.',
  'Learning that is associated with a particular place, such as a classroom.',
  'Learning that depends on how deeply the material is processed.',
  'Learning that depends on how long the person sleeps afterward.',
  'State-dependent learning is learning associated with a particular internal state. Memory is better if a person’s mood at encoding matches the mood during retrieval.')
q(23, 'definition', 'What is transfer-appropriate processing?',
  'Memory is better when the type of processing at encoding matches the type at retrieval.',
  'Memory is better when the location at encoding matches the location at retrieval.',
  'Memory is better when the mood at encoding matches the mood at retrieval.',
  'Memory is better when processing at encoding is as deep as possible.',
  'Transfer-appropriate processing means memory task results improve if the type of processing used during encoding is the same as the type during retrieval.')
q(25, 'researcher', 'What did Morris and colleagues (1977) find on the rhyming recognition test?',
  'Rhyme processing beat semantic processing, 49 percent to 33 percent.',
  'Semantic processing beat rhyme processing, 49 percent to 33 percent.',
  'Rhyme processing and semantic processing gave the same score.',
  'Semantic processing beat rhyme processing, 84 percent to 63 percent.',
  'On the rhyming recognition test, rhyme (shallow) processing beat semantic processing, 49 percent to 33 percent. On the standard recognition test, semantic processing won, 84 percent to 63 percent.')
q(25, 'design', 'Why do the results of Morris and colleagues (1977) show that deep processing is not always best?',
  'Shallow rhyme processing gave better memory on the rhyming test.',
  'Shallow rhyme processing gave better memory on both tests.',
  'Deep semantic processing gave worse memory on the standard test.',
  'Deep semantic processing could not be measured by either test.',
  'Each kind of encoding did best on the test that required the same kind of processing. Rhyme processing beat semantic processing on the rhyming test.')
q(24, 'design', 'What made the study by Morris and colleagues (1977) different from that of Craik and Tulving?',
  'It added a rhyming recognition test beside the standard test.',
  'It added a picture that was shown before or after the passage.',
  'It tested memory for the words both underwater and on land.',
  'It used lists of nonsense syllables in place of real words.',
  'Instead of only giving a standard meaning-based recognition test, Morris and colleagues gave one of two tests, a standard recognition test or a rhyming recognition test.')
q(27, 'definition', 'What does consolidation do?',
  'It changes new memories from a fragile state to a more permanent one.',
  'It transfers information from long-term memory to working memory.',
  'It repeats information so that it stays in short-term memory longer.',
  'It links information to the place and the mood in which it was learned.',
  'Consolidation transforms new memories from a fragile state to a more permanent state.')
q(28, 'definition', 'How do synaptic consolidation and systems consolidation differ?',
  'Synaptic consolidation is rapid and occurs at synapses, and systems consolidation is gradual and reorganizes neural circuits.',
  'Synaptic consolidation is gradual and reorganizes neural circuits, and systems consolidation is rapid and occurs at synapses.',
  'Synaptic consolidation occurs during sleep, and systems consolidation occurs only while awake.',
  'Synaptic consolidation occurs in the hippocampus, and systems consolidation occurs only in the amygdala.',
  'Synaptic consolidation is rapid and occurs at synapses. Systems consolidation is gradual and involves the reorganization of neural circuits.')
q(29, 'researcher', 'What did Müller and Pilzecker (1900) find?',
  'Recall of the first list was 48 percent after a 6-minute delay and 28 percent with no delay.',
  'Recall of the first list was 28 percent after a 6-minute delay and 48 percent with no delay.',
  'Recall of the first list was the same with a delay and with no delay.',
  'Recall of the second list was 48 percent after a delay and 28 percent with no delay.',
  'The immediate group, which learned the second list right away, recalled 28 percent of the first list. The delay group, which rested for 6 minutes, recalled 48 percent.')
q(30, 'definition', 'What does the perseveration-consolidation hypothesis state?',
  'Neural activity continues after an experience, and this period is needed for consolidation.',
  'Neural activity stops when an experience ends, and the memory is complete at that moment.',
  'The hippocampus stays active during retrieval of both recent and remote memories.',
  'A retrieved memory becomes fragile and must be consolidated again.',
  'Müller and Pilzecker proposed that neural activity continues for a short period after an experience ends. This period is required for the fragile memory trace to consolidate, and a new task during it disrupts consolidation.')
q(31, 'researcher', 'What did Hebb (1948) propose?',
  'Learning and memory are represented by changes at the synapse.',
  'Learning and memory are stored only while neural activity continues.',
  'Learning and memory depend on the hippocampus for all memories.',
  'Learning and memory are best when processing is deep.',
  'Hebb (1948) proposed that learning and memory are represented in the brain by physiological changes at the synapse, which give a neural record of experience.')
q(31, 'definition', 'What is long-term potentiation (LTP)?',
  'Enhanced firing of neurons after repeated stimulation.',
  'Reduced firing of neurons after repeated stimulation.',
  'Loss of memory for events before an injury.',
  'Fading of hippocampal activity after encoding.',
  'Long-term potentiation is the enhanced firing of neurons after repeated stimulation. It involves structural changes and enhanced responding.')
q(33, 'definition', 'What does the standard model of consolidation state about the hippocampus?',
  'After encoding, the activity of the hippocampus fades with time.',
  'After encoding, the activity of the hippocampus grows stronger with time.',
  'The hippocampus is active during retrieval of both recent and remote memories.',
  'The hippocampus is not involved when a memory is first formed.',
  'In the standard model of consolidation, the activity of the hippocampus fades with time after encoding.')
q(34, 'definition', 'What is graded amnesia?',
  'Memory for recent events is more fragile than memory for remote events.',
  'Memory for remote events is more fragile than memory for recent events.',
  'Memory for events after the injury cannot be formed.',
  'Memory for skills is lost while memory for facts remains.',
  'Graded amnesia means memory for recent events is more fragile than for remote events. It is strongest for the period just before the injury.')
q(35, 'application', 'After a head injury, a person cannot remember the hour before the accident but remembers childhood well. Which term describes losing memory for events before the injury?',
  'Retrograde amnesia.',
  'Anterograde amnesia.',
  'State-dependent learning.',
  'Long-term potentiation.',
  'Retrograde amnesia is loss of memory for events prior to the trauma. Anterograde amnesia concerns the period after the injury.')
q(36, 'researcher', 'What did Gilboa and colleagues (2004) find?',
  'The hippocampus is activated during retrieval of recent and remote memories.',
  'The hippocampus is activated only during retrieval of recent memories.',
  'The hippocampus is activated only during sleep after a day of learning.',
  'The hippocampus is not activated during retrieval of any kind of memory.',
  'Gilboa and colleagues (2004) found that the hippocampus is activated during retrieval of both recent and remote memories, which supports the multiple trace model.')
q(36, 'definition', 'How does the multiple trace model differ from the standard model?',
  'In the multiple trace model, the hippocampus stays involved in old memories.',
  'In the multiple trace model, the hippocampus is never involved in memory.',
  'In the multiple trace model, consolidation happens only at the synapse.',
  'In the multiple trace model, memories cannot change after encoding.',
  'In the standard model, hippocampal activity fades with time. In the multiple trace model, the hippocampus is activated during retrieval of both recent and remote memories.')
q(38, 'researcher', 'What did Wilhelm and colleagues (2011) find about sleep?',
  'Memory for a task was stronger when participants expected to be tested after waking.',
  'Memory for a task was weaker when participants expected to be tested after waking.',
  'Memory for a task was the same whether or not participants slept.',
  'Memory for a task was stronger when participants stayed awake all night.',
  'Wilhelm and colleagues (2011) found that some memories are consolidated more than others. Memory for a task was stronger when participants expected to be tested after awaking.')
q(38, 'researcher', 'What is one reason memory consolidation is enhanced during sleep (Gais and colleagues, 2006)?',
  'Sleeping stops interference from environmental stimuli.',
  'Sleeping increases interference from environmental stimuli.',
  'Sleeping erases the memories that were formed that day.',
  'Sleeping moves memories from the cortex to the hippocampus.',
  'Memory consolidation appears to be enhanced during sleep (Gais and colleagues, 2006). One reason is that sleeping stops interference from environmental stimuli.')
q(40, 'definition', 'What is reconsolidation?',
  'A retrieved memory becomes fragile and is consolidated again.',
  'A new memory becomes permanent for the first time.',
  'A memory is lost because a second list was learned.',
  'A memory is retrieved more easily in the place where it was learned.',
  'Retrieved memories become fragile and are consolidated again, which is reconsolidation. Memory is a work in progress that is constantly remodeled.')
q(41, 'researcher', 'What happened in Nader and colleagues (2000) to rats that received anisomycin after the fear memory was reactivated?',
  'They showed much less freezing when tested later.',
  'They showed much more freezing when tested later.',
  'They showed the same freezing as the control rats.',
  'They froze only when the shock was given again.',
  'Rats that received anisomycin after memory reactivation showed substantially reduced freezing later. Rats receiving a control infusion retained the fear response.')
q(41, 'design', 'What does anisomycin do in Nader and colleagues (2000)?',
  'It inhibits protein synthesis.',
  'It blocks stress hormones.',
  'It increases firing at the synapse.',
  'It removes the hippocampus.',
  'Anisomycin is a drug that inhibits protein synthesis. The conclusion is that even established memories may require protein synthesis to become stable again after retrieval.')
q(42, 'researcher', 'What did Hupbach and colleagues (2007) find?',
  'People who were reminded of List 1 later mixed List 2 objects into List 1.',
  'People who were reminded of List 1 before learning List 2 later forgot all of List 1.',
  'People who were not reminded of List 1 later mixed List 2 objects into List 1 more often.',
  'People who were reminded of List 1 recalled List 1 perfectly with no errors.',
  'Participants who received the reminder were more likely to mistakenly recall objects from List 2 as belonging to List 1. Reactivating a memory can allow new information to become integrated into it.')
q(42, 'design', 'Why is the result of Hupbach and colleagues (2007) important?',
  'It shows that reconsolidation can update a memory, not only strengthen it.',
  'It shows that reconsolidation occurs only in rats and never in humans.',
  'It shows that a reminder protects an old memory from any later change.',
  'It shows that reconsolidation requires a drug before it can occur.',
  'The result demonstrates that reconsolidation can involve updating memories, not simply strengthening them.')
q(44, 'researcher', 'What did Brunet and colleagues (2008) find?',
  'The propranolol group had lower physiological fear responses, and factual memory stayed intact.',
  'The propranolol group had higher physiological fear responses, and factual memory stayed intact.',
  'The propranolol group had lower physiological fear responses, and factual memory was erased.',
  'The propranolol group and the placebo group had the same physiological fear responses.',
  'The propranolol group showed significantly lower physiological fear responses than the placebo group. Factual memory remained intact, and only the intense emotional charge was blunted.')
q(44, 'design', 'In Brunet and colleagues (2008), when did participants receive propranolol or a placebo?',
  'Immediately after recalling the event by writing a script.',
  'One week before writing a script of the traumatic event.',
  'One week after the physiological test was finished.',
  'While sleeping on the night after the experiment.',
  'Participants wrote a detailed script of their traumatic event, which reactivated the memory. Immediately after recall, they received either propranolol or a placebo.')
q(43, 'researcher', 'Which study tested whether blocking reconsolidation reduces physiological PTSD symptoms?',
  'Brunet and colleagues (2008).',
  'Nader and colleagues (2000).',
  'Hupbach and colleagues (2007).',
  'Wilhelm and colleagues (2011).',
  'Brunet and colleagues (2008) tested whether blocking reconsolidation after memory retrieval reduces physiological PTSD symptoms in people with chronic PTSD.')
q(29, 'researcher', 'Which study compared learning a second list immediately with learning it after a 6-minute rest?',
  'Müller and Pilzecker (1900).',
  'Karpicke and Roediger (2008).',
  'Hupbach and colleagues (2007).',
  'Nader and colleagues (2000).',
  'Müller and Pilzecker (1900) had an immediate group and a delayed group that rested for 6 minutes before the second list. Both were tested on the first list.')

q(36, 'researcher', 'Which study found that the response of the hippocampus can change over time?',
  'Viskontas and colleagues (2009).',
  'Gilboa and colleagues (2004).',
  'Gais and colleagues (2006).',
  'Wilhelm and colleagues (2011).',
  'Viskontas and colleagues (2009) found that the response of the hippocampus can change over time. Gilboa and colleagues (2004) found the hippocampus activated during retrieval of both recent and remote memories.')
q(38, 'researcher', 'Which study found that memory consolidation appears to be enhanced during sleep?',
  'Gais and colleagues (2006).',
  'Wilhelm and colleagues (2011).',
  'Gilboa and colleagues (2004).',
  'Viskontas and colleagues (2009).',
  'Gais and colleagues (2006) found that memory consolidation appears to be enhanced during sleep. Wilhelm and colleagues (2011) found that some memories are consolidated more than others.')
q(42, 'researcher', 'Which study showed that a reminder let new objects become part of an old list?',
  'Hupbach and colleagues (2007).',
  'Nader and colleagues (2000).',
  'Brunet and colleagues (2008).',
  'Karpicke and Roediger (2008).',
  'In Hupbach and colleagues (2007), participants who were reminded of List 1 before learning List 2 later recalled List 2 objects as belonging to List 1. Nader and colleagues (2000) used rats and a drug.')
q(25, 'researcher', 'In Morris and colleagues (1977), what happened on the standard recognition test?',
  'Semantic processing beat rhyme processing, 84 percent to 63 percent.',
  'Rhyme processing beat semantic processing, 84 percent to 63 percent.',
  'Semantic processing beat rhyme processing, 49 percent to 33 percent.',
  'Rhyme processing beat semantic processing, 49 percent to 33 percent.',
  'On the standard recognition test, semantic (deep) processing beat rhyme processing, 84 percent to 63 percent, replicating the finding of Craik and Tulving. On the rhyming test the order reversed, 49 percent to 33 percent.')
q(18, 'design', 'People who never saw the nouns still produced 17 percent of them from another person’s cues. What does this condition show?',
  'How many of the words could be produced from the cues alone.',
  'How many of the words were forgotten after one week.',
  'How many of the words were recalled without any cues.',
  'How many of the words were recognized on a later test.',
  'Participants who never saw the nouns and were given other-person-generated cues produced 17 percent of the words. That is far below the 91 percent and 55 percent of participants who had seen the nouns.')
q(44, 'design', 'What does propranolol do in Brunet and colleagues (2008)?',
  'It blocks stress hormones in the amygdala.',
  'It inhibits protein synthesis in the amygdala.',
  'It increases firing at the synapse.',
  'It stops interference during sleep.',
  'Propranolol is a beta-blocker that blocks stress hormones in the amygdala. Anisomycin, the drug in Nader and colleagues (2000), inhibits protein synthesis.')
q(35, 'definition', 'What is anterograde amnesia about?',
  'Events after the injury, in the future direction.',
  'Events before the injury, in the past direction.',
  'Events that are remote and were learned long ago.',
  'Events that were learned in a different mood.',
  'Retrograde amnesia is loss of memory for events prior to the trauma. Anterograde concerns the period after the injury.')
q(31, 'researcher', 'Which researcher proposed that learning and memory are represented by physiological changes at the synapse?',
  'Hebb (1948).',
  'Müller and Pilzecker (1900).',
  'Craik and Tulving (1975).',
  'Gilboa and colleagues (2004).',
  'Hebb (1948) proposed that learning and memory are represented in the brain by physiological changes at the synapse, which provide a neural record of experience.')
