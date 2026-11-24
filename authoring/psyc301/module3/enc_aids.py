"""Workspace study aids for Collection 17 (Long-Term Memory: Encoding, Retrieval, and Consolidation).

Same structure as ltm_aids.py: one master Q&A list feeds "What you can be asked", the Q&A bank and
Q&A Versions 3, 4 and 5. Cards, contrasts and hard topics follow. Researchers and years are written as
the slides give them. Scores are a study-priority heuristic, not a prediction of the exam.
"""

TOPIC_TITLES = [
 'Encoding, retrieval and rehearsal',
 'Levels of processing and Craik and Tulving (1975)',
 'Other factors that aid encoding',
 'Organization and Bransford and Johnson (1972)',
 'The retrieval practice effect and Karpicke and Roediger (2008)',
 'Effective studying',
 'Retrieval and retrieval cues',
 'Encoding specificity and state-dependent learning',
 'Transfer-appropriate processing and Morris and colleagues (1977)',
 'Consolidation and Müller and Pilzecker (1900)',
 'Synaptic consolidation and long-term potentiation',
 'The standard model and memory loss',
 'The multiple trace model',
 'Consolidation and sleep',
 'Reconsolidation in rats and in humans',
 'Reconsolidation and PTSD',
]

REMEMBER = {
 0: 'Maintenance rehearsal only repeats. Elaborative rehearsal uses meaning and connections, and it is what transfers information to long-term memory.',
 1: 'Deeper processing gives better memory. Capital letters is shallow, rhyme is intermediate and fill in the blank is deep.',
 2: 'Imagery, self-reference, generation, organization, survival value and retrieval practice all aid encoding.',
 3: 'The picture helped only when it came before the passage, because a framework has to be there while reading.',
 4: 'Less studying did not hurt (81 percent). Less testing did (36 percent).',
 5: 'Elaborate, self-test, space out study, sleep, and do not mistake familiarity for comprehension.',
 6: 'Most memory failures are failures to retrieve, and cues a person creates work best (91 percent against 55 percent).',
 7: 'Memory is best when the place, the noise or the mood at retrieval matches the one at encoding.',
 8: 'Rhyme encoding won on the rhyming test (49 to 33), and meaning encoding won on the standard test (84 to 63).',
 9: 'A second list right away hurt the first list (28 percent). A 6-minute rest protected it (48 percent).',
 10: 'Repeated stimulation changes the synapse and increases firing, which is long-term potentiation.',
 11: 'In the standard model the hippocampus fades out, and graded amnesia fits because recent memories are less consolidated.',
 12: 'In the multiple trace model the hippocampus stays active for remote memories too.',
 13: 'Sleep helps consolidation, and memories expected to be tested are consolidated more.',
 14: 'A retrieved memory is fragile again. Anisomycin weakened it in rats, and a reminder let new items join it in humans.',
 15: 'Propranolol after recall lowered the stress response and left the factual memory intact.',
}

QA = []


def qa(slides, topic, score, q, a, deep, who=None, bank=False, kind='slide', note=None):
    QA.append(dict(slides=slides, topic=topic, score=score, q=q, a=a, deep=deep, who=who, bank=bank, kind=kind, note=note))


# 0
qa([3], 0, 6, 'What are encoding and retrieval?',
   'Encoding is acquiring information and transforming it into memory. Retrieval is transferring information from long-term memory to working memory.',
   ['**Encoding** is **acquiring information and transforming it into memory**.',
    '- **Retrieval** is **transferring information from long-term memory to working memory**.',
    '- Encoding puts information in, and retrieval brings it back out.'])
qa([3], 0, 8.5, 'How do maintenance rehearsal and elaborative rehearsal differ?',
   'Maintenance rehearsal is repetition that maintains information but does not transfer it to long-term memory. Elaborative rehearsal uses meanings and connections, and it helps transfer information to long-term memory.',
   ['**Maintenance rehearsal** is the **repetition of stimuli**. It maintains information but **does not transfer it to long-term memory**.',
    '- **Elaborative rehearsal** uses **meanings and connections**.',
    '- Elaborative rehearsal **helps transfer information to long-term memory**.'], bank=True)

# 1
qa([4], 1, 8, 'What does levels of processing theory state?',
   'Levels of processing theory states that memory depends on how information is encoded. Shallow processing focuses on physical features and gives poor memory. Deep processing pays close attention to meaning and gives better memory.',
   ['**Levels of processing theory** states that **memory depends on how information is encoded**, which is the **depth of processing**.',
    '- **Shallow processing** pays little attention to meaning and focuses on physical features. It gives **poor memory**.',
    '- **Deep processing** pays close attention to meaning. It gives **better memory**.'], bank=True)
qa([5], 1, 8.5, 'What were the three kinds of questions in Craik and Tulving (1975)?',
   'The shallow question asked about physical appearance, such as whether the word was in capital letters. The intermediate question asked about sound, such as whether the word rhymed with weight. The deep question asked whether the word fit in a sentence.',
   ['In **Craik and Tulving (1975)**, a question about each word set the depth of processing.',
    '- **Shallow (structural or visual)** was “Is the word in capital letters?”',
    '- **Intermediate (phonemic or acoustic)** was “Does the word rhyme with weight?”',
    '- **Deep (semantic or meaning)** was “Does the word fit in the sentence: ‘He met a ______ in the street’?”'], who='Craik and Tulving (1975)', bank=True)
qa([6], 1, 9.5, 'What did Craik and Tulving (1975) find?',
   'Memory was lowest after the capital letters question, higher after the rhyme question and highest after the fill-in-the-blank question. Deeper processing produced better memory.',
   ['Each trial had three steps. A question was asked, a word was presented, and the question was answered.',
    '- The percent correct was about **15** for capital letters, about **48** for rhyme and about **80** for fill in the blanks.',
    '- **Deeper processing produced better memory**, which is what levels of processing theory predicts.'], who='Craik and Tulving (1975)', bank=True)

# 2
qa([7], 2, 7, 'Which factors aid encoding?',
   'Visual imagery, the self-reference effect, the generation effect, organizing to-be-remembered information, relating words to survival value and retrieval practice all aid encoding.',
   ['Six factors aid encoding.',
    '- **Visual imagery** and the **self-reference effect** aid encoding.',
    '- The **generation effect** and **organizing** to-be-remembered information aid encoding.',
    '- **Relating words to survival value** and **retrieval practice** aid encoding.'], bank=True)
qa([7], 2, 7, 'How did the imagery group compare with the repetition group?',
   'The imagery group formed an image of the two items together, such as a boat in a tree, and the repetition group repeated the pair. The imagery group recalled more than twice as many pairs.',
   ['Two groups learned word pairs such as boat and tree.',
    '- The **repetition group** repeated the pair.',
    '- The **imagery group** formed an image of the two items together.',
    '- Percent correct recall was **more than twice as high** for the imagery group.'],
   note='The slide names no researcher for this figure. In the textbook it is from Bower and Winzenz (1970).')
qa([7], 2, 5.5, 'What are the self-reference effect and the generation effect?',
   'The self-reference effect is better memory for information that is related to oneself. The generation effect is better memory for material a person generates than for material the person only reads.',
   ['Both effects add meaning or connections at encoding, as visual imagery does.',
    '- The **self-reference effect** is better memory for information related to oneself.',
    '- The **generation effect** is better memory for material a person generates than for material the person only reads.'],
   note='The slide lists these two effects by name only. The definitions given here are the standard ones.')

# 3
qa([9], 3, 9.5, 'What did Bransford and Johnson (1972) do, and what did they find?',
   'Bransford and Johnson (1972) presented a passage that was difficult to comprehend. Group 1 saw a picture that explained it before reading, Group 2 saw the picture after reading, and the control group did not see it. Group 1 outperformed the others.',
   ['**Bransford and Johnson (1972)** **presented difficult-to-comprehend information**.',
    '- **Group 1** saw a picture that helped explain the information **before** reading it.',
    '- **Group 2** saw the picture **after** reading the passage, and the **control group** did not see it.',
    '- **Group 1 outperformed the others.**'], who='Bransford and Johnson (1972)', bank=True)
qa([9, 11], 3, 8.5, 'Why did the picture help only when it came before the passage?',
   'Having a mental framework of comprehension aided memory encoding and retrieval. The picture gave people one organized scene to fit each sentence into as they read, which it could not do after the reading was finished.',
   ['**Having a mental framework of comprehension aided memory encoding and retrieval.**',
    '- The picture shows a man playing a guitar below a tall building, with a loudspeaker held up by balloons near a woman’s window.',
    '- Seeing it first let people place each sentence into one organized scene as they read.',
    '- Seeing it afterward was too late to organize the sentences during encoding.'], bank=True)

# 4
qa([12], 4, 9, 'What were the three groups in Karpicke and Roediger (2008)?',
   'Group 1 studied and was tested on all word pairs in all sessions. Group 2 studied only the pairs it had missed but was tested on all pairs. Group 3 studied all pairs but was tested only on the pairs it had missed.',
   ['**Karpicke and Roediger (2008)** ran a **study-and-test experiment with word pairs**.',
    '- **Group 1** studied and was tested on all words in all sessions.',
    '- **Group 2** (less studying) studied only words missed in previous tests and was tested on all words.',
    '- **Group 3** (less testing) studied all words and was tested only on words missed in previous tests.'], who='Karpicke and Roediger (2008)', bank=True)
qa([12, 13], 4, 10, 'What did Karpicke and Roediger (2008) find, and what is the retrieval practice effect?',
   'After one week, Group 1 scored 81 percent, Group 2 scored 81 percent and Group 3 scored 36 percent. The group with less testing did much worse. The retrieval practice effect is that testing memory retrieval can improve memory.',
   ['On the **test after one week**, Group 1 scored **81 percent** and Group 2 scored **81 percent**.',
    '- Group 3, which had **less testing**, scored **36 percent**.',
    '- Cutting back on studying did not hurt memory, and cutting back on testing did.',
    '- This is the **retrieval practice effect**. **Testing memory retrieval can improve memory.**'], who='Karpicke and Roediger (2008)', bank=True)

# 5
qa([15], 5, 7.5, 'What are the principles of effective studying?',
   'Elaborate by associating what you are learning to what you already know. Generate questions and self-test. Take breaks, because of the spacing effect and because sleep enhances consolidation. Avoid the illusion of learning.',
   ['Four principles of effective studying follow from memory research.',
    '- **Elaborate**, which is associating what you are learning to what you already know.',
    '- **Generate questions and self-test.**',
    '- **Take breaks.** Memory is better for multiple short study sessions, and consolidation is enhanced by sleep.',
    '- **Avoid the illusion of learning.**'], bank=True)
qa([15], 5, 7, 'What are the spacing effect and the illusion of learning?',
   'The spacing effect is that memory is better for multiple short study sessions. The illusion of learning is mistaking familiarity for comprehension, and familiarity does not mean comprehension.',
   ['The **spacing effect** is that **memory is better for multiple short study sessions**.',
    '- The **illusion of learning** is believing material is learned because it feels familiar.',
    '- **Familiarity does not mean comprehension.**'])

# 6
qa([17], 6, 7, 'What is retrieval, and what are most failures of memory?',
   'Retrieval is the process of transferring information from long-term memory back into working memory, which is consciousness. Most failures of memory are failures to retrieve.',
   ['**Retrieval** is the **process of transferring information from long-term memory back into working memory**.',
    '- **Most of our failures of memory are failures to retrieve.**',
    '- The information is often still stored, but it cannot be brought back at that moment.'])
qa([18], 6, 9, 'What is cued recall, and which retrieval cues are most effective?',
   'In cued recall, a cue is presented to aid recall, and performance is better than in free recall. Retrieval cues are most effective when created by the person who uses them. People remembered 91 percent of nouns with their own cues and 55 percent with another person’s cues.',
   ['In **cued recall**, a **cue is presented to aid recall**. It gives **increased performance over free recall**.',
    '- **Retrieval cues are most effective when created by the person who uses them.**',
    '- People remembered **91 percent** of nouns using self-generated cues and **55 percent** using other-person-generated cues.',
    '- People who never saw the nouns produced **17 percent** from another person’s cues.'], bank=True,
   note='The slide names no researcher for this figure. In the textbook it is from Mantyla (1986).')

# 7
qa([19], 7, 9, 'What is encoding specificity?',
   'Encoding specificity is the principle that we learn information together with its context. Recall is best when encoding and retrieval occur in the same context.',
   ['**Encoding specificity** is the principle that **we learn information together with its context**.',
    '- The context is stored with the information and can act as a retrieval cue.',
    '- In **Baddeley’s (1975) “diving experiment,”** the best recall occurred when encoding and retrieval occurred in the same location.'], bank=True,
   note='One slide credits the diving experiment to Baddeley (1975), and a later slide credits it to Godden and Baddeley (1975). The published study is Godden and Baddeley (1975).')
qa([20, 21], 7, 9.5, 'What were the results of the diving experiment?',
   'In Godden and Baddeley’s (1975) diving experiment, words learned and recalled underwater gave 32 percent, and words learned and recalled on land gave 38 percent. When the locations did not match, recall was 23 percent and 24 percent. Recall was best when the learning location and the recall location were the same.',
   ['In **Godden and Baddeley’s (1975) “diving” experiment**, words were learned underwater or on land and recalled underwater or on land.',
    '- Matching locations gave **32 percent** (underwater both times) and **38 percent** (on land both times).',
    '- Different locations gave **23 percent** and **24 percent**.',
    '- **Best recall occurred when encoding and retrieval occurred in the same location.**',
    '- **Baddeley’s (1975) “diving experiment”** and **Godden and Baddeley’s (1975) “diving” experiment** are the same experiment.'], who='Godden and Baddeley (1975)', bank=True)
qa([21], 7, 9, 'What did Grant and colleagues (1998) and Eich and Metcalfe (1989) show?',
   'In Grant and colleagues’ (1998) studying experiment, scores were highest when the noise condition at test matched the one at study. In Eich and Metcalfe’s (1989) mood experiment, scores were highest when the mood at test matched the mood at study.',
   ['Two more experiments show the same matching pattern.',
    '- In **Grant and colleagues’ (1998) “studying” experiment**, people studied in noise or in quiet. Scores were highest when the test condition matched.',
    '- In **Eich and Metcalfe’s (1989) “mood” experiment**, people studied while sad or happy. Scores were highest when the mood at test matched.'], who='Grant and colleagues (1998)', bank=True)
qa([22], 7, 8, 'What is state-dependent learning?',
   'State-dependent learning is learning that is associated with a particular internal state. Memory is better if a person’s mood at encoding matches the mood during retrieval.',
   ['**State-dependent learning** is **learning associated with a particular internal state**.',
    '- There is **better memory if a person’s mood at encoding matches the mood during retrieval**.',
    '- Encoding specificity is usually shown with an outside context, and state-dependent learning is the same kind of match for the internal state.',
    '- The mood experiment of **Eich and Metcalfe (1989)** is also an encoding specificity experiment, so it fits both terms.'], bank=True)

# 8
qa([23], 8, 9, 'What is transfer-appropriate processing?',
   'Transfer-appropriate processing is the principle that memory task results improve if the type of processing used during encoding is the same as the type used during retrieval.',
   ['**Transfer-appropriate processing** means **memory task results improve if the type of processing used during encoding is the same as the type during retrieval**.',
    '- **Morris and colleagues (1977)** tested it with rhyme and meaning tasks.'], bank=True)
qa([24], 8, 8.5, 'What were the encoding conditions and the tests in Morris and colleagues (1977)?',
   'At encoding, people answered either a semantic question, about whether a word fit in a sentence, or a rhyme question. At retrieval, they took either a standard recognition test of the studied words or a rhyming recognition test of words that rhymed with the studied words.',
   ['In **Morris and colleagues (1977)**, there were two encoding conditions and two tests, and each participant got one encoding question type and one test.',
    '- **Semantic (deep) processing** asked whether a word fit in a sentence. **Rhyme (shallow) processing** asked whether a word rhymed with another word.',
    '- The **standard recognition test** asked for the exact studied words.',
    '- The **rhyming recognition test** asked for words that rhymed with the studied words, such as regal for eagle.'], who='Morris and colleagues (1977)', bank=True)
qa([25], 8, 10, 'What did Morris and colleagues (1977) find?',
   'On the standard recognition test, semantic processing beat rhyme processing, 84 percent to 63 percent. On the rhyming recognition test, rhyme processing beat semantic processing, 49 percent to 33 percent.',
   ['**On the standard recognition test**, **semantic processing beat rhyme processing**, 84 percent to 63 percent.',
    '- **On the rhyming recognition test**, **rhyme processing beat semantic processing**, 49 percent to 33 percent.',
    '- Each kind of encoding did best on the test that required the same kind of processing.',
    '- So deep processing is not always best.'], who='Morris and colleagues (1977)', bank=True)

# 9
qa([27, 28], 9, 9, 'What is consolidation, and what are its two types?',
   'Consolidation transforms new memories from a fragile state to a more permanent state. Synaptic consolidation is rapid and occurs at synapses. Systems consolidation is gradual and is the reorganization of neural circuits.',
   ['**Consolidation** **transforms new memories from a fragile state to a more permanent state**.',
    '- **Synaptic consolidation** is **rapid** and **occurs at synapses**. It is a structural change at the synapse.',
    '- **Systems consolidation** is **gradual**. It is the **reorganization of neural circuits**.'], bank=True)
qa([29], 9, 9.5, 'What did Müller and Pilzecker (1900) do, and what did they find?',
   'Participants memorized a list of nonsense syllables and then learned a second list. The immediate group learned the second list right away, and the delayed group rested for 6 minutes first. Recall of the first list was 28 percent for the immediate group and 48 percent for the delayed group.',
   ['In **Müller and Pilzecker (1900)**, participants memorized **nonsense syllables** (List A) and then learned a second list (List B).',
    '- The **immediate group** learned List B within seconds.',
    '- The **delayed group** had a **6-minute break** before List B.',
    '- Recall of the first list was **28 percent** for the immediate group and **48 percent** for the delayed group.'], who='Müller and Pilzecker (1900)', bank=True)
qa([30], 9, 9, 'What is the perseveration-consolidation hypothesis?',
   'Müller and Pilzecker proposed that neural activity continues for a short period after an experience ends. This period is required for the fragile memory trace to consolidate into a stable long-term memory. If a new task interrupts it, consolidation is disrupted and the memory is lost.',
   ['**Müller and Pilzecker** proposed that **neural activity continues (“perseverates”) for a short period after an experience ends**.',
    '- This period is **required for the fragile memory trace to consolidate** into a stable long-term memory.',
    '- **If a new cognitive task interrupts this window, consolidation is disrupted and the memory is lost.**'], who='Müller and Pilzecker (1900)', bank=True)

# 10
qa([31], 10, 8.5, 'What did Hebb (1948) propose about memory and the synapse?',
   'Hebb (1948) proposed that learning and memory are represented in the brain by physiological changes at the synapse. These changes are a neural record of experience.',
   ['**Hebb (1948)** proposed that **learning and memory are represented in the brain by physiological changes at the synapse**.',
    '- These changes provide a **neural record of experience**.'], who='Hebb (1948)', bank=True,
   note='The slide gives Hebb (1948). Hebb’s idea is usually cited from his 1949 book, The Organization of Behavior.')
qa([31, 32], 10, 9, 'What is long-term potentiation (LTP)?',
   'Long-term potentiation is the enhanced firing of neurons after repeated stimulation. It involves structural changes at the synapse and enhanced responding.',
   ['**Long-term potentiation (LTP)** is the **enhanced firing of neurons after repeated stimulation**.',
    '- At the first presentation of a stimulus, the second neuron fires at a low rate.',
    '- Continued presentation leads to **structural changes** at the synapse.',
    '- When the same stimulus is presented later, there is **increased firing**.'], bank=True)

# 11
qa([33], 11, 9, 'What does the standard model of consolidation state?',
   'The standard model of consolidation states that after encoding, the activity of the hippocampus fades with time. The connections among cortical areas grow stronger, and in the end the hippocampus is no longer needed for the memory.',
   ['In the **standard model of consolidation**, **after encoding, the activity of the hippocampus fades with time**.',
    '- At first, the hippocampus links the cortical areas that hold the memory.',
    '- Over time, the connections among the cortical areas strengthen and the hippocampal connections weaken.',
    '- In the end, the cortical areas are connected directly.'], bank=True)
qa([34, 35], 11, 9, 'What are retrograde amnesia and graded amnesia?',
   'Retrograde amnesia is the loss of memory for events prior to the trauma. Graded amnesia means that memory for recent events is more fragile than memory for remote events, so the loss is worst just before the injury.',
   ['**Retrograde amnesia** is the **loss of memory for events prior to the trauma**.',
    '- **Graded amnesia** means **memory for recent events is more fragile than for remote events**.',
    '- The amnesia is strongest for the period just before the injury and weaker for remote memories.',
    '- **Anterograde** amnesia concerns the period after the injury.'], bank=True)
qa([34], 11, 8, 'Why does graded amnesia support the standard model?',
   'The standard model is based partly on memory loss after injury. Recent memories have had less time to be consolidated, so they are more fragile. That is the pattern graded amnesia shows.',
   ['The **standard model** is **based partly on observation of injury or trauma-related memory loss**.',
    '- Recent memories have had less time to consolidate, so they still depend on the hippocampus.',
    '- Remote memories are already consolidated, so they survive the injury better.'])

# 12
qa([36], 12, 9, 'What does the multiple trace model state, and what evidence supports it?',
   'In the multiple trace model, the hippocampus stays involved in memories over time. Gilboa and colleagues (2004) found that the hippocampus is activated during retrieval of both recent and remote memories. Viskontas and colleagues (2009) found that the response of the hippocampus can change over time.',
   ['In the **multiple trace model of consolidation**, the hippocampus stays involved in remote memories.',
    '- **Gilboa and colleagues (2004)** found that the **hippocampus is activated during retrieval of both recent and remote memories**.',
    '- **Viskontas and colleagues (2009)** found that the **response of the hippocampus can change over time**.'], who='Gilboa and colleagues (2004)', bank=True)
qa([33, 36, 37], 12, 8.5, 'How do the standard model and the multiple trace model differ?',
   'In the standard model, the activity of the hippocampus fades with time, so remote memories do not need it. In the multiple trace model, the hippocampus stays connected and is active for both recent and remote memories.',
   ['The two models differ in the role of the hippocampus for old memories.',
    '- In the **standard model**, hippocampal activity **fades with time**.',
    '- In the **multiple trace model**, the hippocampus **stays connected** to the cortical areas.'], kind='relate')

# 13
qa([38], 13, 8.5, 'How does sleep affect consolidation?',
   'Memory consolidation appears to be enhanced during sleep (Gais and colleagues, 2006). One reason is that sleeping stops interference from environmental stimuli.',
   ['**Gais and colleagues (2006)** found that **memory consolidation appears to be enhanced during sleep**.',
    '- **One reason** is that **sleeping stops interference from environmental stimuli**.'], who='Gais and colleagues (2006)', bank=True)
qa([38], 13, 8.5, 'What did Wilhelm and colleagues (2011) find?',
   'Wilhelm and colleagues (2011) found that some memories are consolidated more than others. Memory for a task was stronger when participants expected to be tested after awaking.',
   ['**Wilhelm and colleagues (2011)** found that **some memories are consolidated more than others**.',
    '- **Memory for a task was stronger when participants expected to be tested after awaking.**'], who='Wilhelm and colleagues (2011)', bank=True)

# 14
qa([40], 14, 9, 'What is reconsolidation?',
   'Reconsolidation is the process in which retrieved memories become fragile and are consolidated again. It makes memory a work in progress that is constantly constructed and remodeled.',
   ['**Retrieved memories become fragile and are consolidated again.** This is **reconsolidation**.',
    '- Memory is a **“work in progress.”**',
    '- It is **constantly constructed and remodeled in response to learning and conditions**.'], bank=True)
qa([41], 14, 10, 'What did Nader and colleagues (2000) do, and what did they find?',
   'Rats learned to associate a tone with a mild shock, so the tone alone caused freezing. After the memory had consolidated, the tone was played again, and some rats then received anisomycin in the amygdala. Those rats showed much less freezing later, and control rats kept the fear response.',
   ['In **Nader and colleagues (2000)**, rats were trained to **associate a tone with a mild electric shock**, so the tone triggered **freezing**.',
    '- After the fear memory had consolidated, the tone was played again to **reactivate the memory**.',
    '- Some rats then received **anisomycin**, a drug that **inhibits protein synthesis**, in the amygdala.',
    '- Those rats showed **substantially reduced freezing** later. Rats with a control infusion **retained the fear response**.'], who='Nader and colleagues (2000)', bank=True)
qa([41], 14, 8.5, 'What is the conclusion of Nader and colleagues (2000)?',
   'Even established memories may require protein synthesis to become stable again after retrieval. A retrieved memory can be weakened while it is fragile.',
   ['**Even established memories may require protein synthesis to become stable again after retrieval.**',
    '- The drug was given after the memory was reactivated, and the fear response was reduced.',
    '- So a retrieved memory is in a fragile state.'])
qa([42], 14, 10, 'What did Hupbach and colleagues (2007) do, and what did they find?',
   'Participants learned List 1. Two days later, some were reminded of the first session before learning List 2, and others learned List 2 without the reminder. When tested on List 1, the reminded group was more likely to mistakenly recall List 2 objects as belonging to List 1.',
   ['In **Hupbach and colleagues (2007)**, participants **learned a list of objects (List 1)**.',
    '- Two days later, some **returned to the same context and were reminded of the first session** before learning **List 2**.',
    '- Others learned List 2 **without the reminder**.',
    '- The reminded group was **more likely to mistakenly recall objects from List 2 as belonging to List 1**.'], who='Hupbach and colleagues (2007)', bank=True)
qa([42], 14, 9, 'Why is the result of Hupbach and colleagues (2007) important?',
   'It shows that reactivating an existing memory can allow new information to become integrated into that memory. Reconsolidation can involve updating memories, not simply strengthening them.',
   ['**Reactivating an existing memory can allow new information to become integrated into that memory.**',
    '- **Reconsolidation can involve updating memories, not simply strengthening them.**'])

# 15
qa([43, 44], 15, 9.5, 'What did Brunet and colleagues (2008) do?',
   'People with chronic PTSD wrote a detailed script of their traumatic event, which reactivated the memory. Immediately after recall, they received either propranolol or a placebo. One week later, their heart rate and skin conductance were measured while they listened to the script.',
   ['**Brunet and colleagues (2008)** tested whether **blocking reconsolidation after memory retrieval reduces physiological PTSD symptoms**.',
    '- For **reactivation**, participants wrote a detailed script of their traumatic event.',
    '- For the **intervention**, they received **propranolol** or a **placebo** immediately after recall.',
    '- For the **test** one week later, heart rate and skin conductance were measured while they listened to the script.'], who='Brunet and colleagues (2008)', bank=True)
qa([44], 15, 10, 'What did Brunet and colleagues (2008) find?',
   'The propranolol group showed significantly lower physiological fear responses than the placebo group. Factual memory remained intact, and only the intense emotional charge was blunted.',
   ['**The propranolol group showed significantly lower physiological fear responses than the placebo group.**',
    '- **Factual memory remained intact.**',
    '- Only the **intense emotional charge was blunted**.'], who='Brunet and colleagues (2008)', bank=True)

# Putting it together
qa([6, 25], 8, 9, 'Craik and Tulving (1975) found that deep processing is best. Morris and colleagues (1977) found that rhyme processing can win. How do both hold?',
   'Both hold because the tests were different. On a standard test of the words, deep processing gave better memory in both studies. On a rhyming test, rhyme processing gave better memory, because the processing at encoding matched the processing at the test.',
   ['The two findings come from different tests.',
    '- On a **standard recognition test**, semantic processing won in both studies.',
    '- On the **rhyming recognition test** of **Morris and colleagues (1977)**, rhyme processing won.',
    '- So depth helps most when the test is about meaning, and matching helps when the test is about something else.'], kind='relate')
qa([19, 22, 23], 7, 9, 'How do encoding specificity, state-dependent learning and transfer-appropriate processing differ?',
   'All three are about a match between encoding and retrieval. Encoding specificity is a match of context, such as location. State-dependent learning is a match of internal state, such as mood. Transfer-appropriate processing is a match of the type of processing.',
   ['All three state that memory is better when retrieval matches encoding.',
    '- **Encoding specificity** is a match of **context**, as in the diving experiment.',
    '- **State-dependent learning** is a match of **internal state**, such as mood.',
    '- **Transfer-appropriate processing** is a match of the **type of processing**, as in Morris and colleagues (1977).'], kind='relate')
qa([29, 30, 38], 9, 8.5, 'How do Müller and Pilzecker (1900) and the sleep findings fit together?',
   'Both show that a memory is protected when nothing interferes with it after learning. In Müller and Pilzecker (1900), a 6-minute rest protected the first list. During sleep, interference from environmental stimuli stops, which is one reason consolidation is enhanced.',
   ['Both findings are about interference after learning.',
    '- In **Müller and Pilzecker (1900)**, a rest after learning protected the first list.',
    '- **Gais and colleagues (2006)** found that consolidation is enhanced during sleep, and sleeping stops interference.'], kind='relate')
qa([27, 40, 41, 42], 14, 9, 'How does reconsolidation change the idea of consolidation?',
   'Consolidation makes a new memory more permanent. Reconsolidation shows that a consolidated memory becomes fragile again when it is retrieved, so it can be weakened, as in Nader and colleagues (2000), or updated, as in Hupbach and colleagues (2007).',
   ['Consolidation is not a single step that finishes forever.',
    '- **Consolidation** makes a new memory more permanent.',
    '- **Reconsolidation** makes a retrieved memory fragile and then stable again.',
    '- The memory can be weakened, as in **Nader and colleagues (2000)**, or updated, as in **Hupbach and colleagues (2007)**.'], kind='relate')
qa([5, 9, 12, 21, 24, 29, 31, 36, 38, 41, 42, 44], 8, 9, 'Which year goes with each named study?',
   'Müller and Pilzecker is 1900, and Hebb is 1948. Bransford and Johnson is 1972. Craik and Tulving and Godden and Baddeley are both 1975. Morris and colleagues is 1977. Eich and Metcalfe is 1989, and Grant and colleagues is 1998. Nader and colleagues is 2000, Gilboa and colleagues is 2004, Gais and colleagues is 2006, Hupbach and colleagues is 2007, Karpicke and Roediger and Brunet and colleagues are both 2008, Viskontas and colleagues is 2009, and Wilhelm and colleagues is 2011.',
   ['The years are the ones given with each study.',
    '- **Müller and Pilzecker (1900)** is consolidation, and **Hebb (1948)** is the synapse.',
    '- **Bransford and Johnson (1972)** is the picture and passage. **Craik and Tulving (1975)** is levels of processing, and **Godden and Baddeley (1975)** is the diving experiment.',
    '- **Morris and colleagues (1977)** is transfer-appropriate processing. **Eich and Metcalfe (1989)** is mood, and **Grant and colleagues (1998)** is studying in noise or quiet.',
    '- **Nader and colleagues (2000)** is reconsolidation in rats, and **Hupbach and colleagues (2007)** is reconsolidation in humans.',
    '- **Gilboa and colleagues (2004)** and **Viskontas and colleagues (2009)** are the multiple trace model.',
    '- **Gais and colleagues (2006)** and **Wilhelm and colleagues (2011)** are sleep.',
    '- **Karpicke and Roediger (2008)** is retrieval practice, and **Brunet and colleagues (2008)** is PTSD.'], kind='relate')


CARDS = []


def card(title, researcher, pages, aim, manipulated, measured, found, means, blocks, trap=None):
    CARDS.append(dict(title=title, researcher=researcher, pages=pages, aim=aim, manipulated=manipulated, measured=measured,
                      found=found, means=means, trap=trap, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


card('Craik and Tulving · levels of processing', 'Craik and Tulving (1975)', [5, 6],
     'Does memory depend on how deeply a word is processed?',
     'The kind of question asked about each word. Capital letters (shallow), rhyme (intermediate) or fill in the blank (deep).',
     'The percent of words remembered correctly afterward.',
     'About 15 percent for capital letters, about 48 percent for rhyme and about 80 percent for fill in the blanks.',
     'Deeper processing leads to better memory, as levels of processing theory states.',
     [('**Craik and Tulving (1975)** asked whether memory depends on the **depth of processing**. People answered a question about each word.', []),
      ('The question was about **capital letters** (shallow), about **rhyme** (intermediate) or about whether the word **fit in a sentence** (deep).', []),
      ('Memory was lowest for capital letters, higher for rhyme and highest for the sentence question.', ['**Craik and Tulving (1975)** showed that deeper processing leads to better memory.'])],
     trap='In Craik and Tulving (1975), rhyme is the intermediate level. In Morris and colleagues (1977), rhyme processing is labelled shallow.')
card('Bransford and Johnson · picture before or after the passage', 'Bransford and Johnson (1972)', [9, 11],
     'Does a framework for comprehension help memory?',
     'When the explaining picture was shown. Before the passage (Group 1), after the passage (Group 2) or not at all (control).',
     'Memory for the difficult passage.',
     'Group 1 outperformed the others.',
     'Having a mental framework of comprehension aids memory encoding and retrieval.',
     [('**Bransford and Johnson (1972)** presented a passage that was **difficult to comprehend**.', []),
      ('**Group 1** saw a picture that explained the passage **before** reading. **Group 2** saw it **after** reading. The **control group** did not see it.', []),
      ('**Group 1 outperformed the others**, because a **mental framework for comprehension** aided encoding and retrieval.', ['The picture helped only when it came first.'])],
     trap='Group 1, which saw the picture first, is the group that outperformed the others.')
card('Karpicke and Roediger · retrieval practice', 'Karpicke and Roediger (2008)', [12, 13],
     'Which matters more for later memory, repeated studying or repeated testing?',
     'What each group kept doing after the first session. Group 2 dropped recalled pairs from studying, and Group 3 dropped recalled pairs from testing.',
     'Percent correct on a test of the word pairs after one week.',
     'Group 1 scored 81 percent, Group 2 (less studying) scored 81 percent and Group 3 (less testing) scored 36 percent.',
     'Testing memory retrieval can improve memory, which is the retrieval practice effect.',
     [('**Karpicke and Roediger (2008)** had people study and take tests on **word pairs**. All groups began by studying and being tested on all pairs.', []),
      ('**Group 2** then studied only the pairs it had missed, which is **less studying**. **Group 3** was tested only on the pairs it had missed, which is **less testing**.', []),
      ('After one week, Groups 1 and 2 scored **81 percent**, and Group 3 scored **36 percent**.', ['**Karpicke and Roediger (2008)** showed the **retrieval practice effect**.'])],
     trap='The group that lost points was the one with less testing, not the one with less studying.')
card('Godden and Baddeley · the diving experiment', 'Godden and Baddeley (1975)', [19, 20, 21],
     'Is memory better when retrieval happens in the same place as encoding?',
     'Where the words were learned (underwater or on land) and where they were recalled (underwater or on land).',
     'The average percent of words recalled.',
     'Matching locations gave 32 percent (underwater) and 38 percent (on land). Different locations gave 23 and 24 percent.',
     'We learn information together with its context, which is encoding specificity.',
     [('In **Godden and Baddeley’s (1975) “diving” experiment**, people learned words **underwater** or **on land** and recalled them underwater or on land.', []),
      ('Recall was **32 percent** and **38 percent** when the locations matched, and **23 percent** and **24 percent** when they did not.', []),
      ('**Godden and Baddeley (1975)** showed **encoding specificity**. Recall was best when encoding and retrieval occurred in the same location.', [])],
     trap='Neither location was better on its own. The match is what mattered.')
card('Grant and colleagues, Eich and Metcalfe · studying and mood', 'Grant and colleagues (1998) and Eich and Metcalfe (1989)', [21, 22],
     'Does the match between study and test conditions matter for noise and for mood?',
     'Grant and colleagues varied noise or quiet at study and at test. Eich and Metcalfe varied sad or happy mood at study and at test.',
     'Scores on the memory test in each combination.',
     'In both experiments, scores were highest when the condition at test matched the condition at study.',
     'Memory is best when retrieval conditions match encoding conditions. The mood result is state-dependent learning.',
     [('In **Grant and colleagues’ (1998) “studying” experiment**, people studied in noise or in quiet. Scores were highest when the test had the same condition.', []),
      ('In **Eich and Metcalfe’s (1989) “mood” experiment**, people studied while sad or happy. Scores were highest when the mood at test matched.', ['The mood result is **state-dependent learning**.'])])
card('Morris and colleagues · transfer-appropriate processing', 'Morris and colleagues (1977)', [23, 24, 25],
     'Is deep processing always best, or does the test matter?',
     'The type of encoding question (semantic or rhyme) and the type of test (standard recognition or rhyming recognition).',
     'Percent correct on each test.',
     'On the standard test, semantic processing scored 84 percent and rhyme processing scored 63 percent. On the rhyming test, rhyme processing scored 49 percent and semantic processing scored 33 percent.',
     'Memory is better when the type of processing at encoding matches the type at retrieval.',
     [('**Morris and colleagues (1977)** had people encode words with a **semantic** question or a **rhyme** question.', []),
      ('People then took a **standard recognition test** or a **rhyming recognition test**.', []),
      ('Semantic processing won on the standard test, 84 percent to 63 percent. Rhyme processing won on the rhyming test, 49 percent to 33 percent.', ['**Morris and colleagues (1977)** showed **transfer-appropriate processing**.'])],
     trap='On the rhyming test the shallow condition won.')
card('Müller and Pilzecker · consolidation', 'Müller and Pilzecker (1900)', [29, 30],
     'Does a memory need time after learning to become stable?',
     'The delay between the first list and the second list. No delay or a 6-minute rest.',
     'Recall of the first list of nonsense syllables.',
     '28 percent for the immediate group and 48 percent for the delayed group.',
     'Neural activity continues after learning, and this period is needed for the memory to consolidate.',
     [('In **Müller and Pilzecker (1900)**, people memorized **nonsense syllables** and then learned a second list.', []),
      ('The **immediate group** learned the second list right away, and the **delayed group** rested for **6 minutes** first.', []),
      ('Recall of the first list was **28 percent** for the immediate group and **48 percent** for the delayed group.', ['This supports the **perseveration-consolidation hypothesis**.'])],
     trap='The test was on the first list, not the second list.')
card('Hebb · the synapse and long-term potentiation', 'Hebb (1948)', [31, 32],
     'How is a memory recorded in the brain?',
     'Hebb made a proposal and did not run an experiment here. Long-term potentiation is the process observed at the synapse.',
     'Not reported.',
     'Repeated stimulation leads to structural changes at the synapse and to increased firing.',
     'Learning and memory are represented by physiological changes at the synapse.',
     [('**Hebb (1948)** proposed that learning and memory are represented by **physiological changes at the synapse**.', []),
      ('**Long-term potentiation (LTP)** is the **enhanced firing of neurons after repeated stimulation**.', ['It involves structural changes and enhanced responding.'])])
card('Gilboa and colleagues, Viskontas and colleagues · multiple trace model', 'Gilboa and colleagues (2004) and Viskontas and colleagues (2009)', [36, 37],
     'Does the hippocampus stay involved in old memories?',
     'Not reported.',
     'Activity of the hippocampus during retrieval.',
     'The hippocampus is activated during retrieval of both recent and remote memories, and its response can change over time.',
     'This supports the multiple trace model and does not fit the standard model.',
     [('**Gilboa and colleagues (2004)** found that the **hippocampus is activated during retrieval of both recent and remote memories**.', []),
      ('**Viskontas and colleagues (2009)** found that the **response of the hippocampus can change over time**.', ['Both findings support the **multiple trace model**.'])])
card('Gais and colleagues, Wilhelm and colleagues · sleep', 'Gais and colleagues (2006) and Wilhelm and colleagues (2011)', [38],
     'Does sleep help consolidation, and for which memories?',
     'In Wilhelm and colleagues (2011), the manipulation was whether participants expected to be tested after waking.',
     'Memory after sleep.',
     'Consolidation appears to be enhanced during sleep. Memory was stronger when participants expected to be tested.',
     'Sleep stops interference, and memories that are expected to be needed are consolidated more.',
     [('**Gais and colleagues (2006)** found that **memory consolidation appears to be enhanced during sleep**.', ['One reason is that sleeping stops interference from environmental stimuli.']),
      ('**Wilhelm and colleagues (2011)** found that memory for a task was **stronger when participants expected to be tested after awaking**.', [])])
card('Nader and colleagues · reconsolidation in rats', 'Nader and colleagues (2000)', [41],
     'Does a consolidated memory become fragile again when it is retrieved?',
     'Whether rats received anisomycin or a control infusion in the amygdala after the fear memory was reactivated.',
     'Freezing to the tone when tested later.',
     'Rats that received anisomycin showed substantially reduced freezing. Control rats kept the fear response.',
     'Even established memories may require protein synthesis to become stable again after retrieval.',
     [('In **Nader and colleagues (2000)**, rats learned to associate a **tone** with a **mild shock**, so the tone caused **freezing**.', []),
      ('After the memory had consolidated, the tone was played to **reactivate** it. Some rats then received **anisomycin**, which inhibits protein synthesis.', []),
      ('Those rats froze much less later, and control rats kept the fear response.', ['**Nader and colleagues (2000)** showed reconsolidation.'])],
     trap='The drug was given after the memory was reactivated, not during the original training.')
card('Hupbach and colleagues · reconsolidation in humans', 'Hupbach and colleagues (2007)', [42],
     'Can new information become part of an old memory when the old memory is reactivated?',
     'Whether participants were reminded of the first session before learning List 2.',
     'Recall of List 1, and how many List 2 objects were mistakenly recalled as List 1.',
     'Reminded participants were more likely to mistakenly recall List 2 objects as belonging to List 1.',
     'Reactivating a memory can allow new information to become integrated into it. Reconsolidation can update a memory.',
     [('In **Hupbach and colleagues (2007)**, people learned **List 1**. Two days later, some were **reminded** of that session before learning **List 2**.', []),
      ('The reminded group later **mistakenly recalled List 2 objects as part of List 1** more often.', []),
      ('**Hupbach and colleagues (2007)** showed that reconsolidation can **update** a memory and does not only strengthen it.', [])],
     trap='The errors went into List 1. After the reminder, new items could become part of the old memory.')
card('Brunet and colleagues · reconsolidation and PTSD', 'Brunet and colleagues (2008)', [43, 44],
     'Does blocking reconsolidation after memory retrieval reduce physiological PTSD symptoms?',
     'Whether participants received propranolol or a placebo immediately after recalling their traumatic event.',
     'Heart rate and skin conductance one week later while listening to the trauma script.',
     'The propranolol group showed significantly lower physiological fear responses than the placebo group.',
     'Blocking reconsolidation lowered the emotional response to the memory, and factual memory remained intact.',
     [('**Brunet and colleagues (2008)** tested people with **chronic PTSD**. They wrote a detailed script of their traumatic event, which reactivated the memory.', []),
      ('Right after recall, they received **propranolol** or a **placebo**. One week later, their stress responses were measured while they listened to the script.', []),
      ('The **propranolol group showed lower physiological fear responses**. Factual memory stayed intact.', [])],
     trap='The memory of what happened was not erased.')
card('Visual imagery · repetition group and imagery group', 'Visual imagery (no researcher named)', [7],
     'Does forming an image help memory for word pairs more than repeating them?',
     'Whether the group repeated the pair or formed an image of the two items together.',
     'Percent correct recall of the pairs.',
     'The imagery group recalled more than twice as many pairs as the repetition group.',
     'Visual imagery aids encoding because the image connects the two items.',
     [('Two groups learned word pairs such as boat and tree. The **repetition group** repeated the pair, and the **imagery group** formed an image of the two items together.', []),
      ('Recall was **more than twice as high** for the imagery group.', ['**Visual imagery** is one of the factors that aid encoding.'])])
card('Retrieval cues · self-generated and other-person-generated', 'Retrieval cues (no researcher named)', [18],
     'Which retrieval cues work best?',
     'Who created the retrieval cues, and whether the person had seen the nouns.',
     'The percent of nouns remembered.',
     '91 percent with self-generated cues, 55 percent with other-person-generated cues, and 17 percent for people who never saw the nouns.',
     'Retrieval cues are most effective when created by the person who uses them.',
     [('People remembered **91 percent** of nouns using **self-generated retrieval cues** and **55 percent** using **other-person-generated cues**.', []),
      ('People who had never seen the nouns produced **17 percent** from another person’s cues.', ['So retrieval cues are most effective when created by the person who uses them.'])],
     trap='The 17 percent group never saw the nouns, so it shows what the cues alone give.')


CONTRASTS = []


def contrast(title, pages, score, a, b, diff, example, watch, blocks):
    CONTRASTS.append(dict(title=title, pages=pages, score=score, a=dict(term=a[0], definition=a[1]), b=dict(term=b[0], definition=b[1]),
                          diff=diff, example=example, watch=watch, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


contrast('Maintenance rehearsal vs elaborative rehearsal', [3], 9,
         ('Maintenance rehearsal', 'Maintenance rehearsal is repetition that maintains information but does not transfer it to long-term memory.'),
         ('Elaborative rehearsal', 'Elaborative rehearsal uses meanings and connections to help transfer information to long-term memory.'),
         'Maintenance rehearsal only repeats. Elaborative rehearsal thinks about meaning, which is what stores the information.',
         'Repeating a phone number is maintenance rehearsal. Linking the number to dates a person already knows is elaborative rehearsal.',
         'Repetition alone does not transfer information to long-term memory.',
         [('**Maintenance rehearsal** is repetition. It maintains information but does not transfer it to long-term memory.', []),
          ('**Elaborative rehearsal** uses meanings and connections, and it helps transfer information to long-term memory.', [])])
contrast('Shallow processing vs deep processing', [4, 5, 6], 9.5,
         ('Shallow processing', 'Shallow processing pays little attention to meaning and focuses on physical features. It gives poor memory.'),
         ('Deep processing', 'Deep processing pays close attention to meaning. It gives better memory.'),
         'The two differ in how much attention is paid to meaning.',
         'In Craik and Tulving (1975), the capital letters question was shallow and the fill-in-the-blank sentence was deep.',
         'The rhyme question is intermediate, between the two.',
         [('**Shallow processing** focuses on physical features and gives poor memory. **Deep processing** pays close attention to meaning and gives better memory.', []),
          ('**Craik and Tulving (1975)** found the lowest memory for the capital letters question and the highest for the sentence question.', [])])
contrast('Less studying vs less testing', [12, 13], 9.5,
         ('Group 2 (less studying)', 'Group 2 studied only the pairs it had missed and was tested on all pairs.'),
         ('Group 3 (less testing)', 'Group 3 studied all pairs and was tested only on the pairs it had missed.'),
         'Dropping pairs from studying did not hurt later memory. Dropping pairs from testing did.',
         'In Karpicke and Roediger (2008), Group 2 scored 81 percent after one week and Group 3 scored 36 percent.',
         'Group 2 matched Group 1, which did everything.',
         [('In **Karpicke and Roediger (2008)**, **Group 2** had less studying and **Group 3** had less testing.', []),
          ('After one week, Group 2 scored **81 percent** and Group 3 scored **36 percent**.', ['Testing memory retrieval improves memory.'])])
contrast('Free recall vs cued recall', [18], 7.5,
         ('Free recall', 'In free recall, the person recalls the items without any cues.'),
         ('Cued recall', 'In cued recall, a cue is presented to aid recall.'),
         'Cued recall gives better performance than free recall, because the cue helps retrieval.',
         'People remembered 91 percent of nouns with cues they had created themselves.',
         'Cues work best when the person who uses them created them.',
         [('In **free recall**, no cues are given. In **cued recall**, a cue is presented to aid recall, and performance is better.', []),
          ('Retrieval cues are most effective when created by the person who uses them.', [])])
contrast('Self-generated cues vs other-person-generated cues', [18], 8,
         ('Self-generated cues', 'Self-generated cues are retrieval cues created by the person who uses them. They gave 91 percent of nouns remembered.'),
         ('Other-person-generated cues', 'Other-person-generated cues are retrieval cues created by someone else. They gave 55 percent of nouns remembered.'),
         'A cue a person creates is tied to that person’s own encoding, so it works better.',
         'People who had never seen the nouns produced 17 percent of them from another person’s cues.',
         'The 17 percent condition shows how much can be guessed from the cues alone.',
         [('People remembered **91 percent** of nouns using **self-generated cues** and **55 percent** using **other-person-generated cues**.', []),
          ('Retrieval cues are most effective when created by the person who uses them.', [])])
contrast('Encoding specificity vs state-dependent learning', [19, 22], 9,
         ('Encoding specificity', 'Encoding specificity is the principle that we learn information together with its context.'),
         ('State-dependent learning', 'State-dependent learning is learning that is associated with a particular internal state.'),
         'Encoding specificity is usually shown with an outside context, such as a location. State-dependent learning is the same kind of match for the internal state, such as a mood.',
         'Godden and Baddeley’s (1975) diving experiment is encoding specificity. Better memory when mood at encoding matches mood at retrieval is state-dependent learning.',
         'Both are about a match between encoding and retrieval. The mood experiment of Eich and Metcalfe (1989) is also an encoding specificity experiment, so it fits both terms.',
         [('**Encoding specificity** is a match of **context**, such as the place of learning. **State-dependent learning** is a match of **internal state**, such as mood.', []),
          ('In both, memory is better when the condition at retrieval matches the condition at encoding.', [])])
contrast('Encoding specificity vs transfer-appropriate processing', [19, 23], 8.5,
         ('Encoding specificity', 'Encoding specificity is a match of the context at encoding and at retrieval.'),
         ('Transfer-appropriate processing', 'Transfer-appropriate processing is a match of the type of processing at encoding and at retrieval.'),
         'One matches where or in what conditions learning happened. The other matches the kind of thinking that was done.',
         'Learning and recalling underwater is a context match. Encoding by rhyme and taking a rhyming test is a processing match.',
         'Morris and colleagues (1977) is transfer-appropriate processing, not encoding specificity.',
         [('**Encoding specificity** matches the **context**. **Transfer-appropriate processing** matches the **type of processing**.', []),
          ('**Morris and colleagues (1977)** showed transfer-appropriate processing with rhyme and meaning tasks.', [])])
contrast('Levels of processing vs transfer-appropriate processing', [6, 25], 9,
         ('Levels of processing', 'Levels of processing theory states that deeper processing gives better memory.'),
         ('Transfer-appropriate processing', 'Transfer-appropriate processing states that memory is better when processing at encoding matches processing at retrieval.'),
         'Levels of processing predicts that deep always wins. Transfer-appropriate processing predicts that the matching kind wins.',
         'In Morris and colleagues (1977), rhyme processing beat semantic processing on the rhyming test, 49 percent to 33 percent.',
         'On the standard test, semantic processing still won, 84 percent to 63 percent.',
         [('**Levels of processing** states that deep processing gives better memory. **Transfer-appropriate processing** states that the best processing is the kind the test requires.', []),
          ('In **Morris and colleagues (1977)**, shallow rhyme processing won on the rhyming test.', [])])
contrast('Synaptic consolidation vs systems consolidation', [27, 28], 9.5,
         ('Synaptic consolidation', 'Synaptic consolidation is rapid and occurs at synapses. It is a structural change at the synapse.'),
         ('Systems consolidation', 'Systems consolidation is gradual. It is the reorganization of neural circuits.'),
         'They differ in speed and in scale. One is fast and at a single connection, and the other is slow and across a circuit.',
         'Long-term potentiation is synaptic. The fading role of the hippocampus in the standard model is systems consolidation.',
         'Synaptic is the faster one.',
         [('**Synaptic consolidation** is **rapid** and occurs at synapses. **Systems consolidation** is **gradual** and reorganizes neural circuits.', [])])
contrast('Immediate group vs delayed group', [29, 30], 9,
         ('Immediate group', 'The immediate group learned the second list within seconds of the first list and recalled 28 percent of the first list.'),
         ('Delayed group', 'The delayed group rested for 6 minutes before the second list and recalled 48 percent of the first list.'),
         'The only difference was the delay before the second list. The delay gave the first list time to consolidate.',
         'In Müller and Pilzecker (1900), recall of the first list was 28 percent against 48 percent.',
         'Both groups were tested on the first list.',
         [('In **Müller and Pilzecker (1900)**, the **immediate group** learned the second list right away, and the **delayed group** rested for 6 minutes.', []),
          ('The delayed group recalled more of the first list, 48 percent against 28 percent.', [])])
contrast('Standard model vs multiple trace model', [33, 36, 37], 10,
         ('Standard model', 'In the standard model, the activity of the hippocampus fades with time after encoding.'),
         ('Multiple trace model', 'In the multiple trace model, the hippocampus is activated during retrieval of both recent and remote memories.'),
         'The models disagree about whether the hippocampus is needed for old memories.',
         'Graded amnesia fits the standard model. Gilboa and colleagues (2004) found the hippocampus active for remote memories, which supports the multiple trace model, so the two findings point in opposite directions.',
         'Both models agree that the hippocampus is involved when a memory is new.',
         [('In the **standard model**, hippocampal activity **fades with time**. In the **multiple trace model**, the hippocampus **stays involved**.', []),
          ('**Gilboa and colleagues (2004)** found the hippocampus active for both recent and remote memories.', [])])
contrast('Retrograde amnesia vs anterograde amnesia', [34, 35], 9,
         ('Retrograde amnesia', 'Retrograde amnesia is the loss of memory for events prior to the trauma.'),
         ('Anterograde amnesia', 'Anterograde amnesia concerns the period after the injury.'),
         'Retrograde is about events in the past, before the injury. Anterograde is about events in the future, after the injury.',
         'Forgetting the hour before an accident is retrograde. Memory loss for the period after the accident is anterograde.',
         'Graded amnesia is a feature of retrograde amnesia.',
         [('**Retrograde amnesia** is loss of memory for events **before** the trauma. **Anterograde** amnesia concerns the period **after** the injury.', []),
          ('**Graded amnesia** means recent memories are more fragile than remote ones.', [])])
contrast('Consolidation vs reconsolidation', [27, 40], 9.5,
         ('Consolidation', 'Consolidation transforms new memories from a fragile state to a more permanent state.'),
         ('Reconsolidation', 'Reconsolidation is when a retrieved memory becomes fragile and is consolidated again.'),
         'Consolidation acts on a new memory. Reconsolidation acts on an old memory that has just been retrieved.',
         'A rest after learning a list supports consolidation. Giving anisomycin after a fear memory is reactivated disrupts reconsolidation.',
         'A consolidated memory is not fixed forever.',
         [('**Consolidation** makes a **new** memory more permanent. **Reconsolidation** makes a **retrieved** memory stable again after it has become fragile.', [])])
contrast('Nader and colleagues (2000) vs Hupbach and colleagues (2007)', [41, 42], 9.5,
         ('Nader and colleagues (2000)', 'Nader and colleagues (2000) studied rats. Anisomycin after reactivation reduced freezing to the tone.'),
         ('Hupbach and colleagues (2007)', 'Hupbach and colleagues (2007) studied humans. A reminder before List 2 caused List 2 objects to be recalled as List 1.'),
         'The rat study shows that a reactivated memory can be weakened. The human study shows that a reactivated memory can be updated.',
         'Rats given anisomycin froze less. People given the reminder mixed List 2 objects into List 1.',
         'Do not swap them. The drug study is the rat study.',
         [('**Nader and colleagues (2000)** showed in **rats** that a reactivated memory can be **weakened**.', []),
          ('**Hupbach and colleagues (2007)** showed in **humans** that a reactivated memory can be **updated** with new information.', [])])
contrast('Anisomycin vs propranolol', [41, 44], 8.5,
         ('Anisomycin', 'Anisomycin is a drug that inhibits protein synthesis. It was given to rats in Nader and colleagues (2000).'),
         ('Propranolol', 'Propranolol is a beta-blocker, a drug that blocks stress hormones in the amygdala. It was given to people in Brunet and colleagues (2008).'),
         'Both were given right after a memory was reactivated. They are different drugs in different studies.',
         'Anisomycin reduced freezing in rats. Propranolol lowered physiological fear responses in people with PTSD.',
         'Propranolol left factual memory intact.',
         [('**Anisomycin** inhibits protein synthesis and was used in **Nader and colleagues (2000)**.', []),
          ('**Propranolol** blocks stress hormones in the amygdala and was used in **Brunet and colleagues (2008)**.', [])])
contrast('Gais and colleagues (2006) vs Wilhelm and colleagues (2011)', [38], 9,
         ('Gais and colleagues (2006)', 'Gais and colleagues (2006) found that memory consolidation appears to be enhanced during sleep.'),
         ('Wilhelm and colleagues (2011)', 'Wilhelm and colleagues (2011) found that some memories are consolidated more than others.'),
         'Both are about sleep. The first is that sleep helps consolidation, and the second is about which memories are helped most.',
         'In Wilhelm and colleagues (2011), memory for a task was stronger when participants expected to be tested after awaking.',
         'The expectation of a test belongs to Wilhelm and colleagues (2011).',
         [('**Gais and colleagues (2006)** found that consolidation appears to be **enhanced during sleep**. One reason is that sleeping stops interference.', []),
          ('**Wilhelm and colleagues (2011)** found that memory was **stronger when participants expected to be tested** after awaking.', [])])
contrast('Gilboa and colleagues (2004) vs Viskontas and colleagues (2009)', [36], 9,
         ('Gilboa and colleagues (2004)', 'Gilboa and colleagues (2004) found that the hippocampus is activated during retrieval of both recent and remote memories.'),
         ('Viskontas and colleagues (2009)', 'Viskontas and colleagues (2009) found that the response of the hippocampus can change over time.'),
         'Both support the multiple trace model. One is about recent and remote memories, and the other is about change over time.',
         'The finding about recent and remote memories goes with 2004, and the finding about change over time goes with 2009.',
         'Both studies are about the hippocampus, so the year and the finding have to be learned together.',
         [('**Gilboa and colleagues (2004)** found the hippocampus **activated during retrieval of both recent and remote memories**.', []),
          ('**Viskontas and colleagues (2009)** found that the **response of the hippocampus can change over time**.', [])])
contrast('Grant and colleagues (1998) vs Eich and Metcalfe (1989)', [21, 22], 8.5,
         ('Grant and colleagues (1998)', 'Grant and colleagues (1998) ran the “studying” experiment, with noise or quiet at study and at test.'),
         ('Eich and Metcalfe (1989)', 'Eich and Metcalfe (1989) ran the “mood” experiment, with sad or happy mood at study and at test.'),
         'Both found the highest scores when the test condition matched the study condition. They differ in what was matched.',
         'Noise at study and noise at test gave 6.2, against 5.4 for a quiet test. Sad at study and sad at test gave 27, against 17 for a happy test.',
         'The mood experiment is also an example of state-dependent learning.',
         [('**Grant and colleagues (1998)** matched **noise or quiet** at study and test.', []),
          ('**Eich and Metcalfe (1989)** matched **sad or happy mood** at study and test.', ['In both, scores were highest when the conditions matched.'])])


HARD = []


def hard(title, pages, blocks):
    HARD.append(dict(title=title, pages=pages, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


hard('Why testing beats restudying', [12, 13],
     [('In **Karpicke and Roediger (2008)**, every group studied and was tested on all the word pairs at first.', []),
      ('**Group 2** stopped **studying** the pairs it already knew. **Group 3** stopped being **tested** on the pairs it already knew.', []),
      ('After one week, Group 2 scored **81 percent**, the same as the group that did everything. Group 3 scored **36 percent**.',
       ['So retrieving a pair from memory is what keeps it there. This is the **retrieval practice effect**.'])])
hard('Three kinds of matching between encoding and retrieval', [19, 22, 23],
     [('Three principles state that memory is better when retrieval matches encoding. They differ in what is matched.', []),
      ('**Encoding specificity** matches the **context**, such as the location in the diving experiment.', []),
      ('**State-dependent learning** matches the **internal state**, such as mood.', []),
      ('**Transfer-appropriate processing** matches the **type of processing**, such as rhyme encoding with a rhyming test.', [])])
hard('How Morris and colleagues (1977) fits with levels of processing', [6, 24, 25],
     [('**Levels of processing theory** states that deep processing gives better memory. **Craik and Tulving (1975)** found exactly that on a standard test.', []),
      ('**Morris and colleagues (1977)** added a second test, a **rhyming recognition test**.', []),
      ('On the standard test, semantic processing won, 84 percent to 63 percent. On the rhyming test, **rhyme processing won**, 49 percent to 33 percent.',
       ['So the best encoding is the kind the test requires, which is **transfer-appropriate processing**.'])])
hard('Why a rest after learning protects a memory', [29, 30],
     [('**Müller and Pilzecker (1900)** proposed that neural activity **continues for a short period after an experience ends**.', []),
      ('That period is needed for the fragile memory trace to **consolidate**. A new task during the period disrupts it.', []),
      ('The immediate group started a second list during that period and recalled **28 percent** of the first list. The delayed group rested for 6 minutes and recalled **48 percent**.', [])])
hard('The standard model and the multiple trace model', [33, 34, 36, 37],
     [('Both models describe **systems consolidation**, and both start with the hippocampus linking the cortical areas that hold a memory.', []),
      ('In the **standard model**, the activity of the hippocampus **fades with time**. **Graded amnesia** fits this, because recent memories are more fragile than remote ones.', []),
      ('In the **multiple trace model**, the hippocampus **stays involved**. **Gilboa and colleagues (2004)** found it active during retrieval of both recent and remote memories.', [])])
hard('What reconsolidation means', [40, 41, 42, 44],
     [('**Reconsolidation** is when a **retrieved memory becomes fragile and is consolidated again**.', []),
      ('While the memory is fragile, it can be **weakened**. In **Nader and colleagues (2000)**, anisomycin after reactivation reduced freezing in rats.', []),
      ('It can also be **updated**. In **Hupbach and colleagues (2007)**, a reminder let List 2 objects become part of List 1.', []),
      ('**Brunet and colleagues (2008)** used this for PTSD. Propranolol after recall lowered the fear response and left factual memory intact.', [])])
