"""Test Bank curation for Collection 16 (Long-Term Memory: Structure).

Source: the supplied Goldstein Cognero bank, chapter 6, all 50 multiple-choice items
(testbank-source-ch06.json keeps the extracted stems, options and original keyed answers).
Each row: source question number, slide number or 'extra', and an authored explanation.
Open-response prompts 51 to 56 are not converted into invented multiple-choice questions.
"""

# number: (slide or 'extra', explanation)
CURATION = {
 1: (6, 'The primacy effect is better recall of the first words in a list. Those words get more rehearsal, so they are more likely to enter long-term memory and are recalled from there.'),
 2: (6, 'Words at the beginning of a list are rehearsed more, which makes them more likely to enter long-term memory. The recency effect is the part of the curve tied to short-term memory.'),
 3: (5, 'The serial position curve shows better memory for words at the beginning of the list, the primacy effect, and for words at the end, the recency effect. Words in the middle are recalled the least.'),
 4: (7, 'A 30-second delay before recall eliminates the recency effect, because the last words are no longer available from short-term memory. The primacy effect is not increased by the delay.'),
 5: ('extra', 'The slide states that a 30-second delay eliminates the recency effect, which matches the option about inserting a 30-second delay. The question bank keys counting backward because the stem asks what prevents rehearsal. In the original delay study, participants counted backward during the 30 seconds, and that counting is what prevented rehearsal of the last words.'),
 6: (7, 'The recency effect depends on the last words still being in short-term memory. Counting backward for 30 seconds after the list removes those words from short-term memory, so the recency effect disappears.'),
 7: (13, 'Long-term memory mainly stores meaning, which is semantic coding. Sachs (1967) showed that after a delay people remembered the meaning of a sentence but not its exact wording.'),
 8: (11, 'Recognition memory is the identification of a previously encountered stimulus. A multiple-choice question presents the answer among the options, so the task is to recognize it and not to recall it.'),
 9: (10, 'Recall fell across the first three groups because similar items, first names only, interfered with one another, which is proactive interference. The accountant was a different kind of information, so recall recovered, which is release from proactive interference.'),
 10: (10, 'Release from proactive interference occurs when the meaning category changes. The fruits group received fruits on every trial, so the category never changed and recall kept dropping.'),
 11: (20, 'A double dissociation needs two patients with opposite patterns. One has good semantic memory with poor episodic memory, and the other has good episodic memory with poor semantic memory, like K.C. and L.P.'),
 12: (15, 'Surgery removed H.M.’s hippocampus, and afterward he was unable to form new long-term memories. His case shows that the hippocampus is crucial for forming long-term memories.'),
 13: (15, 'H.M. retained short-term memory but could not form new long-term memories. One patient alone shows only one direction of the dissociation, so the double dissociation also needs K.F., who shows the reverse pattern.'),
 14: (15, 'H.M. lost the ability to form new long-term memories after his hippocampus was removed, so long-term memory was clearly affected by that damage. The other three options are conclusions that his case contributes to, together with K.F.'),
 15: (16, 'H.M. and K.F. show opposite patterns, which is a double dissociation. Each kind of memory can be impaired while the other still works, so the two rely on different mechanisms that act independently.'),
 16: (27, 'Implicit memory is the branch of long-term memory that is not conscious. Explicit memory is conscious, and declarative memory is another name for it, so those options cannot all be correct.'),
 17: (27, 'Explicit memory is conscious, so the person is aware of remembering. Implicit memory is not conscious, so experience changes behavior without the person being aware of using a memory.'),
 18: (27, 'Implicit memory includes procedural memory, priming and conditioning. Semantic memory is memory for facts and knowledge, and it belongs to explicit memory together with episodic memory.'),
 19: (18, 'Episodic memory is tied to personal experience, and semantic memory holds general knowledge and facts. Procedural and implicit memories do not fit either half of the comparison.'),
 20: (18, 'Endel Tulving (1985) described episodic memory as involving mental time travel, in which remembering is reliving. Knowledge that is not tied to a personal experience describes semantic memory.'),
 21: (23, 'Semantic memory is memory for facts, such as the fact that the big island of Hawaii has many active volcanoes. The other options describe remembering specific personal events, which are episodic memories.'),
 22: (23, 'The statement is a fact about the world that can be known without reliving any personal event. Memory for facts is semantic memory.'),
 23: (23, 'The statement describes a specific personal experience and the feeling of going back to it. Memory for specific personal experiences, with mental time travel, is episodic memory.'),
 24: (19, 'K.C. cannot relive past events, so his episodic memory is lost. He still remembers general information and facts, so his semantic memory is intact.'),
 25: (19, 'The Italian woman L.P. had impaired semantic memory, so she had difficulty with people and facts she had known. Her episodic memory was intact, so she could remember life events and form new event memories.'),
 26: (18, 'Episodic memory is memory for personal experiences that are relived through mental time travel. Remembering graduating from college is a specific personal event, while the other options rely on knowledge or skill.'),
 27: (22, 'Autobiographical memory is memory for specific experiences from a person’s life, and it includes both episodic and semantic components. The semantic components are personal semantic memories.'),
 28: (22, 'Acquiring knowledge may start as episodic and then fade to semantic. A person first remembers the event of learning something, and later keeps the knowledge without the memory of the event.'),
 29: (22, 'Semantic memory can be enhanced if it is associated with episodic memory. The singer’s name is tied to a personal experience, attending the concert, so it is easier to recall.'),
 30: (29, 'Implicit memory occurs when learning from experience is not accompanied by conscious remembering. The person is not aware of using the memory.'),
 31: (30, 'Procedural memory is skill memory, which is memory for actions such as holding a racquet and making shots. People perform these skills without being consciously aware of how they do them.'),
 32: ('extra', 'Korsakoff’s syndrome causes severe anterograde amnesia, which is the loss of the ability to form new memories. Older memories formed long before the illness, such as a childhood home, are more likely to remain. Memory for remote events in Korsakoff’s syndrome is not covered on the slides.'),
 33: (32, 'In repetition priming, the test stimulus is the same as or similar to the priming stimulus. The earlier presentation changes the response to the later one.'),
 34: (34, 'Amnesic patients show normal priming in Graf and colleagues (1985), and H.M. learned mirror tracing without remembering the practice (Brenda Milner, 1962). Implicit memory and procedural memory therefore do not depend on conscious memory.'),
 35: (30, 'Reading is a practiced skill that is carried out without conscious awareness of how it is done, so it relies on procedural memory. Recalling a childhood event or knowing how an engine works relies on explicit memory.'),
 36: (36, 'The propaganda effect is that people are more likely to rate statements they have read or heard before as true. It can occur even when people are not aware of having seen the statement before.'),
 37: (36, 'The propaganda effect involves implicit memory, because it can occur when people are not aware of previously seeing or hearing the statement. The other options concern explicit memory or short-term memory.'),
 38: (39, 'Classical conditioning pairs a neutral stimulus with a reflexive response. It involves implicit memory when the person responds without remembering the original pairing that produced the response.'),
 39: ('extra', 'This question refers to a discussion of memory loss in movies that is not part of the slides. In that discussion, 50 First Dates is the film whose memory problem does not match a real pattern of amnesia.'),
 40: (18, 'Endel Tulving (1985) described the experience of semantic memory as “knowing” and the experience of episodic memory as “self-knowing,” in which remembering is reliving. So semantic goes with knowing and episodic goes with remembering.'),
 41: ('review', 'This ordering of visual, semantic and episodic memory from least to most complex is the answer keyed in the supplied question bank. It is not stated on the slides and could not be confirmed against a second source, so it is shown for review and is not scored.'),
 42: ('extra', 'Coding refers to the form in which information is represented in memory. The same word can be coded visually by how it looks, auditorily by how it sounds, or semantically by what it means. The slides use the term without defining it, so this definition is extra material.'),
 43: ('extra', 'Visual, auditory and semantic coding can each occur in short-term and long-term memory. Which one is used in a given situation depends mainly on the task, a point from the chapter text that the slides do not state directly.'),
 44: (24, 'The semanticization of remote memories is the loss of episodic details for memories of long-ago events. Older memories keep their semantic content, the facts, while the feeling of reliving fades. The question words this as people getting older, and the idea it tests is that memories of long-ago experiences come to emphasize facts.'),
 45: (26, 'The constructive episodic simulation hypothesis states that episodic memories are extracted and recombined to create simulations of future events. It connects memory to anticipating and planning the future.'),
 46: ('extra', 'K.F. had impaired short-term memory, shown by a reduced digit span. The slides report the reduced span without a number, so the figure of two digits is extra material from the question bank.'),
 47: (18, 'According to Endel Tulving (1985), episodic memory is tied to personal experience and remembering is reliving. This reliving, or mental time travel, is what distinguishes it from the knowing of semantic memory.'),
 48: (22, 'Autobiographical memory is memory for specific experiences from a person’s own life. It includes both episodic components and semantic components.'),
 49: (30, 'Procedural memory is skill memory, which is memory for actions. People perform the skill without remembering where or when they learned it.'),
 50: (36, 'The propaganda effect is being more likely to rate a statement as true because it was read or heard before. It involves implicit memory because it can occur without awareness of the earlier exposure.'),
}

# Self-contained stems. The tested idea and the source's keyed answer stay the same.
STEMS = {
 13: 'Patient H.M. underwent brain surgery to relieve severe epileptic seizures. H.M.’s case has been extremely informative to psychologists by demonstrating that',
 25: 'An Italian woman, after an attack of encephalitis, had difficulty remembering people or facts she knew before. She could, however, remember her life events and daily tasks. Her memory behavior reflects',
 28: 'Episodic and semantic memories are interconnected. When we experience events,',
 39: 'In Goldstein’s discussion of memory loss in the movies, which of the following films is LEAST accurate in its portrayal of a memory problem?',
 45: 'The constructive episodic simulation hypothesis describes how our memories are connected to our ________.',
}
OPTIONS = {}
