"""Test Bank curation for Collection 17 (Long-Term Memory: Encoding, Retrieval, and Consolidation).

Source: the supplied Goldstein Cognero bank, chapter 7, all 50 multiple-choice items
(testbank-source-ch07.json keeps the extracted stems, options and original keyed answers).
Each row: source question number, slide number, 'extra' (chapter material beyond the slides) or
'review' (ambiguous source key, shown unscored), and an authored explanation.
Open-response prompts 51 to 57 are not converted into invented multiple-choice questions.
"""

CURATION = {
 1: (3, 'Encoding is acquiring information and transforming it into memory. Consolidation makes a new memory more permanent, and the other two options are about matching conditions at retrieval.'),
 2: (3, 'Elaborative rehearsal uses meanings and connections. Repeating a word over and over is maintenance rehearsal, which maintains the word without connecting it to anything.'),
 3: (3, 'Maintenance rehearsal maintains information but does not transfer it to long-term memory. Elaborative rehearsal uses meanings and connections, and it helps transfer information to long-term memory.'),
 4: (3, 'Using the familiar word HOMES connects the names of the lakes to something already known. Using meanings and connections in this way is elaborative rehearsal, which works better than repeating the names.'),
 5: (3, 'Maintenance rehearsal is repetition that does not transfer information to long-term memory. Seeing and using the keychain every day for three years is repetition without elaboration, and it left no detailed memory.'),
 6: (3, 'Maintenance rehearsal maintains information for the moment but does not transfer it to long-term memory. It can produce some short-term remembering without producing longer-term memories.'),
 7: (4, 'Levels of processing theory states that memory depends on how information is encoded. The depth of processing at encoding is what determines how well the information is remembered.'),
 8: (4, 'Deep processing pays close attention to meaning and gives better memory. Connecting each word to something already learned is deep, while counting vowels, rhyming and repeating are shallower.'),
 9: (4, 'Levels of processing theory separates shallow processing, which pays little attention to meaning, from deep processing, which pays close attention to meaning and gives better memory.'),
 10: (4, 'Repeating a license plate sequence out loud focuses on its form and involves no attention to meaning, so it is shallow processing. The other three learners connect the material to meaning or to things they already know.'),
 11: (7, 'Visual imagery aids encoding because an image can connect the items to be remembered. In the boat and tree example, forming an image of the two together gave more than twice the recall of repeating the pair.'),
 12: (7, 'The self-reference effect is better memory for information that is related to oneself. Linking the new dance to her own experience and her own affection for dance uses that effect.'),
 13: (7, 'The generation effect is better memory for material a person generates than for material the person only reads. Filling in the second word of a pair is generating it. The slides list the generation effect without naming Slameka and Graf (1978).'),
 14: (18, 'In cued recall, a cue is presented to aid recall. Cues that help bring back information stored in memory are retrieval cues.'),
 15: ('extra', 'Organizing to-be-remembered information aids encoding, which is on the slides. That people recall items from the same category in clusters, so that fruits, clothing and furniture come out together, is extra material from the chapter.'),
 16: ('extra', 'Jenkins and Russell (1952) is not on the slides. The result shows the tendency of items from the same category to become organized in recall, which matches the slide point that organizing to-be-remembered information aids encoding.'),
 17: (9, 'In Bransford and Johnson (1972), the picture gave an organizing context for a passage that was difficult to comprehend. Having a mental framework of comprehension aided memory encoding and retrieval. The question says participants heard the passage, and the slides say they read it.'),
 18: (11, 'The balloon picture organized the sentences of the passage into one scene. It illustrates the role of organization in memory, as part of organization, comprehension and memory.'),
 19: (18, 'A location, a song or a smell that brings back an old memory is acting as a retrieval cue. In cued recall, a cue is presented to aid recall.'),
 20: (18, 'Retrieval cues are most effective when created by the person who uses them. People remembered 91 percent of nouns with self-generated cues and 55 percent with cues another person generated. The slides show this result without naming Mantyla.'),
 21: (19, 'Encoding specificity is the principle that we learn information together with its context. Returning to the first room restores the context in which the intention was formed, so the memory comes back.'),
 22: (19, 'Encoding specificity is the principle that we learn information together with its context. Recall is best when encoding and retrieval occur in the same context.'),
 23: ('review', 'State-dependent learning is learning associated with a particular internal state, with better memory when the mood at encoding matches the mood at retrieval. The question bank keys the song example, but a song is an outside cue and not an internal state, so this item is shown for review and is not scored.'),
 24: (22, 'State-dependent learning means memory is better when the internal state at retrieval matches the state at encoding. The studying was done in a relaxed state, so a relaxed mindset at the test gives the best match.'),
 25: (23, 'Transfer-appropriate processing means memory task results improve if the type of processing used during encoding is the same as the type used during retrieval.'),
 26: (23, 'Transfer-appropriate processing occurs when the type of processing at encoding matches the type at retrieval. In Morris and colleagues (1977), rhyme encoding did best on the rhyming test.'),
 27: (27, 'Consolidation transforms new memories from a fragile state to a more permanent state. A consolidated memory is more resistant to disruption.'),
 28: (27, 'Systems consolidation is gradual and involves the reorganization of neural circuits. Synaptic consolidation is the rapid kind and occurs at synapses.'),
 29: (33, 'In the standard model of consolidation, the activity of the hippocampus fades with time after encoding. It is active when a memory is new and less active for older memories that are already consolidated.'),
 30: (31, 'Long-term potentiation is the enhanced firing of neurons after repeated stimulation. It involves structural changes at the synapse and enhanced responding.'),
 31: (34, 'Retrograde amnesia is loss of memory for events prior to the trauma, and recent memories are the most fragile. A memory formed just before a blow to the head has not had time to consolidate, so it is lost.'),
 32: (34, 'Graded amnesia means memory for recent events is more fragile than memory for remote events. Retrograde amnesia is therefore less severe for remote memories.'),
 33: (38, 'Memory consolidation appears to be enhanced during sleep, and one reason is that sleeping stops interference from environmental stimuli. Kim sleeps after studying, while the movie adds new stimuli for Lakeisha.'),
 34: (36, 'The multiple trace model is supported by the finding that the hippocampus is activated during retrieval of both recent and remote memories (Gilboa and colleagues, 2004). The standard model does not predict activity for remote memories. The question bank specifies episodic memories, a detail the slides do not give.'),
 35: (41, 'In Nader and colleagues (2000), a fear memory that had already consolidated could be weakened after it was reactivated. A retrieved memory becomes fragile and has to be consolidated again, which is reconsolidation.'),
 36: (43, 'Brunet and colleagues (2008) tested whether blocking reconsolidation after memory retrieval reduces physiological PTSD symptoms. The treatment idea comes from research on reconsolidation.'),
 37: (15, 'The spacing effect is that memory is better for multiple short study sessions. Short sessions spread across several days use this effect.'),
 38: (15, 'The spacing effect is that memory is better for multiple short study sessions. Katie studies in three short sessions on three days, so she should do better than Alana, who studies once for three hours.'),
 39: ('extra', 'Highlighting is not on the slides. In the chapter, highlighting is a study habit that feels productive but does not make the reader connect the material to meaning, so it does not encourage elaborative processing.'),
 40: (44, 'In Brunet and colleagues (2008), propranolol lowered the physiological fear response while factual memory remained intact. The work focuses on the emotional charge of the traumatic memory.'),
 41: (7, 'Relating words to survival value is one of the factors that aid encoding. The slides list the factor without naming a researcher, and the question bank attributes the idea to James Nairne.'),
 42: (12, 'The retrieval practice effect is that testing memory retrieval can improve memory. In Karpicke and Roediger (2008), the group with less testing did worst, so testing is the key part of such research.'),
 43: ('extra', 'Highlighting is not on the slides. The related slide point is the illusion of learning, in which familiarity is mistaken for comprehension. The question bank treats highlighting as a habit that creates that illusion.'),
 44: ('extra', 'The slides list generating questions and self-testing as a principle of effective studying. The question bank keys engagement as the benefit, a word the slides do not use, so this item is extra material.'),
 45: (19, 'In Godden and Baddeley’s (1975) diving experiment, the best recall occurred when encoding and retrieval occurred in the same location. Encoding specificity is about learning information together with its context, such as a location.'),
 46: ('review', 'Sleeping stops interference from environmental stimuli, which helps consolidation. The question bank keys distraction, which fits only if it is read as the absence of distraction during sleep, so this item is shown for review and is not scored.'),
 47: (40, 'Retrieved memories become fragile and are consolidated again, which is reconsolidation. The idea rests on the fragility of a memory after it is retrieved.'),
 48: ('extra', 'The slides cite Viskontas and colleagues (2009) only for the point that the response of the hippocampus can change over time. The remember and know coding of picture pairs in that study is extra material from the chapter.'),
 49: (23, 'Transfer-appropriate processing is the principle that memory is better when the type of processing used during encoding is the same as the type used during retrieval.'),
 50: (28, 'Synaptic consolidation is a structural change at the synapse, and systems consolidation is the reorganization of a neural circuit. The key difference is the scale at which each one works, along with speed.'),
}

# Self-contained stems. The tested idea and the source's keyed answer stay the same.
STEMS = {
 11: 'Imagery enhances memory because',
 18: 'The passage about the balloons that were used to suspend a speaker in mid-air illustrates the role of ___________ in memory.',
 19: 'Real experiences of how memories, even ones from a long time ago, can be stimulated by locations, songs, and smells highlight the importance of ___________ in long-term memory.',
 31: 'Brief episodes of retrograde amnesia (e.g., the traumatic disruption of newly formed memories when a football player takes a hit to the head and can’t recall the last play before the hit) reflect',
}
OPTIONS = {}
