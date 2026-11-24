"""Test Bank curation for Collection 18 (Knowledge).

Source: the supplied Goldstein Cognero bank, chapter 9, all 60 multiple-choice items
(testbank-source-ch09.json keeps the extracted stems, options and original keyed answers).
Each row: source question number, slide number, 'extra' (chapter material beyond the slides) or
'review' (ambiguous source key, shown unscored), and an authored explanation.
Open-response prompts 61 to 66 are not converted into invented multiple-choice questions.
"""

CURATION = {
 1: (2, 'A concept is a mental representation used for a variety of cognitive functions. It can be the mental representation of a class or individual, and it covers the meaning of objects, events and abstract ideas.'),
 2: (6, 'The definitional approach decides membership by whether an object meets the definition of the category. It does not work well because not all members of everyday categories have the same defining features.'),
 3: (6, 'The definitional approach works well for some things, such as geometric objects, but not for natural objects and human-made objects. Not all members of everyday categories have the same defining features.'),
 4: (7, 'In family resemblance, things in a category resemble one another in a number of ways, which allows for some variation within a category. No single member has to have every characteristic property.'),
 5: (8, 'A prototype is a representation of the typical member of a category. It is an average of category members encountered in the past, and it is not an actual member.'),
 6: (8, 'In the prototype approach, the standard representation of a category is a prototype. The prototype is an average of the category members that a person has encountered in the past.'),
 7: (8, 'The prototype approach determines membership by comparing an object to a prototype, which is an average of category members encountered in the past. The exemplar approach uses actual examples and no average.'),
 8: (15, 'In the exemplar approach, a concept is represented by multiple examples that are actual category members. Jorge has encountered many more birds than Bob, so he has more stored exemplars.'),
 9: (9, 'In Rosch (1975), participants saw a category title and a list of members and rated the extent to which each member represented the category title. That rating measures how prototypical each member is.'),
 10: (11, 'Prototypicality is related to family resemblance. More prototypical items, such as chairs and sofas, share many characteristics with other members, so they have strong family resemblance.'),
 11: (12, 'The typicality effect is that prototypical objects are processed preferentially, with faster responses. Sparrow is the most typical bird, so it should have the fastest time, and penguin, the least typical, should have the slowest.'),
 12: (12, 'The typicality effect is that prototypical objects are processed preferentially. In a sentence verification task, faster responses are made to items that are high in prototypicality.'),
 13: (13, 'Prototypical category members are more affected by a priming stimulus. Banana is rated as a more typical fruit than kiwi, so the word “fruit” should prime banana more.'),
 14: (13, 'Priming occurs when one stimulus facilitates the response to a stimulus that follows it. In the color experiment, the prime was the word “green,” and it was followed two seconds later by a pair of colors.'),
 15: (14, 'Hearing the color name creates a prototype for that color, and good examples match the prototype better than poor examples, so they are judged faster. The result supports the prototype approach.'),
 16: ('review', 'The question bank keys the exemplar approach, because a Labrador retriever is an actual member of the category. The word “typical” also fits the prototype approach, in which a prototype is the typical member, so this item is shown for review and is not scored.'),
 17: (15, 'In the exemplar approach, a concept is represented by multiple examples. The examples are actual category members that a person has encountered, not abstract averages.'),
 18: (16, 'The exemplar approach explains the typicality effect. Objects that are like more of the stored exemplars are classified faster, and the approach also takes atypical cases into account.'),
 19: (16, 'The exemplar approach takes into account atypical cases. Rather than comparing a penguin to an average bird, we remember that there are some birds that do not fly.'),
 20: (15, 'To categorize in the exemplar approach, a new item is compared with stored examples. A hairless, teacup-sized dog is unlike both of the dogs she has met and unlike their average, so it is the hardest to categorize.'),
 21: (16, 'People may use both approaches. Exemplars may work best for small categories, and prototypes may work best for larger categories.'),
 22: (21, 'Rosch’s experiments were carried out on college undergraduates. The result was a category level, which they called basic, that reflects college undergraduates’ everyday experience.'),
 23: (17, 'The basic level is a category such as “table.” Truck is at that level, vehicle and transportation are more general, and pickup truck is more specific.'),
 24: (18, 'Going above the basic level results in a large loss of information, so moving from the superordinate level down to the basic level gives the largest gain. Going below the basic level results in little gain of information.'),
 25: (20, 'When people name objects, they use the basic-level name. They say guitar, rather than a specific name such as Stratocaster or a global name such as instrument.'),
 26: ('extra', 'This priming experiment with category labels and pictures is not on the slides. It is further evidence from the chapter that the basic level is special, which matches the slide evidence from listing common features and from naming objects.'),
 27: (21, 'In Coley, Medin and Atran (1997), 75 percent of undergraduates used “trees.” People of the Guatemalan Itzaj culture call an oak tree an “oak,” and for them “oak” behaves like a basic-level category.'),
 28: (23, 'In the semantic network model of Collins and Quillian (1969), a node is a category or concept. Nodes are linked by structured pointers such as “is a” and “has.”'),
 29: (26, 'Spreading activation is a property of semantic networks. When a node is activated, activity spreads out along all connected links, and concepts that receive activation are primed.'),
 30: (24, 'Cognitive economy belongs to the semantic network model. It means that shared properties are stored only at higher-level nodes.'),
 31: (24, 'Cognitive economy means shared properties are only stored at higher-level nodes. Including “can fly” for every bird would be inefficient, so “can fly” is stored at the node for bird.'),
 32: (25, 'The testable prediction of the semantic network model is that the time it takes to retrieve information about a concept is determined by the distance that must be traveled through the network.'),
 33: (25, 'Retrieval time depends on the distance traveled through the network. “A field sparrow is an animal” requires traveling the most levels, so it should be the slowest.'),
 34: (23, 'The semantic network model is hierarchical, uses cognitive economy and has spreading activation. Family resemblance is an idea about similarity among category members and is not part of the network model.'),
 35: (25, 'It takes longer to answer “yes” to “A canary is an animal” than to “A canary is a bird,” because more levels must be traveled. Turtle to animal is the longest path among the options.'),
 36: (26, 'Spreading activation explains priming in a semantic network. When a node is activated, activity spreads along connected links, and the concepts that receive it are primed.'),
 37: (26, 'Concepts that receive activation are primed and more easily accessed from memory. Activating “robin” spreads activation to “bird” and primes “canary,” “ostrich” and “animal.”'),
 38: (27, 'Meyer and Schvaneveldt tested spreading activation with a lexical decision task using pairs of words. In a lexical decision task, the person decides whether the presented letter strings are words.'),
 39: (28, 'The Collins and Quillian model predicts equally fast reaction times for “canary” and “ostrich,” because both are one node away from “bird.” This is why the model cannot explain typicality effects.'),
 40: (29, 'Connectionism is also called parallel distributed processing. Knowledge is represented in the distributed activity of many units.'),
 41: (30, 'A connectionist network has input units, which are activated by stimuli from the environment, hidden units, and output units, which receive input from hidden units. There are no working units.'),
 42: (31, 'In the connectionist approach, a stimulus is represented by the pattern of activity that is distributed across units. Information about each concept is contained in the distributed pattern of activity.'),
 43: (35, 'Connectionist networks are not totally disrupted by damage, and they can explain generalization of learning. The slides do not say that all weights equal zero before learning, and that statement is the one that is not a property.'),
 44: (33, 'In back-propagation, the error signal is transmitted back through the circuit. It indicates how the weights should be changed so the output signal matches the correct signal.'),
 45: (33, 'Back-propagation is how connectionist networks learn. The error signal is transmitted back through the circuit, and changes are made in the connection weights.'),
 46: (32, 'For a connectionist network to operate properly, the connection weights have to be adjusted through a learning process. The network modifies its weights to increase the match between its response and the correct response.'),
 47: (33, 'The learning process repeats until the error signal is zero. At that point, the output signal matches the correct signal, so the correct properties are assigned.'),
 48: (35, 'Graceful degradation means disruption of performance occurs gradually as parts of the system are damaged. The operation of a connectionist network is not totally disrupted by damage.'),
 49: (38, 'The sensory-functional hypothesis states that our ability to differentiate living things and artifacts depends on a semantic memory system that distinguishes sensory attributes and a system that distinguishes function.'),
 50: (40, 'The semantic category approach proposes specific neural circuits in the brain for specific categories. These circuits are distributed over a number of different cortical areas.'),
 51: (42, 'Crowding is when different concepts within a category share many properties. Animals all share eyes, legs and the ability to move, which makes them hard to tell apart.'),
 52: (44, 'The approaches agree that information about concepts is distributed across many structures in the brain. The slides summarize three approaches, and the question bank counts four proposals.'),
 53: ('review', 'On the slides, connection weights determine how strongly an incoming signal will activate the next unit. The question bank keys synapse activity, a phrase the slides do not use for weights, so this item is shown for review and is not scored.'),
 54: (32, 'For a connectionist network to operate properly, its connection weights have to be adjusted through a learning process. Learning is what gives the network its knowledge.'),
 55: (38, 'In the sensory-functional hypothesis, living things are contrasted with artifacts. An artifact is a human-made object, such as a tool, and artifacts are more strongly associated with their uses.'),
 56: ('review', 'Crowding is when different concepts within a category share many properties, and it is one factor that differentiates animals from artifacts in the multiple factors approach. The wording of this question does not match that definition, so it is shown for review and is not scored.'),
 57: (43, 'In the embodied approach, knowledge of concepts is based on reactivation of the sensory and motor processes that occur when we interact with an object.'),
 58: ('extra', 'This criticism of the embodied approach is not on the slides. In the chapter, the approach is questioned because it does not easily explain knowledge of abstract concepts, which are not tied to sensory and motor experience.'),
 59: ('extra', 'Semantic dementia is not on the slides. In the chapter, it is a condition with a general loss of knowledge for all concepts, so both living things and artifacts are affected.'),
 60: ('extra', 'The hub and spoke model is not on the slides. In the chapter, it proposes that areas of the brain for specific functions are connected to the anterior temporal lobe, which acts as the hub.'),
}

# Self-contained stems. The tested idea and the source's keyed answer stay the same.
STEMS = {
 1: 'Two different definitions of ___________ include (a) “the mental representation of a class or individual,” and (b) “categories of objects, events, and abstract ideas.”',
 24: 'Among the levels of categories, jumping from ___________ categories results in the largest gain in information.',
 27: 'Cross-cultural studies of categorization compared U.S. and Itzaj participants. Given the results of these studies, if asked to name basic level objects for a category, U.S. participants would answer ___________ and Itzaj participants would answer ___________.',
}
OPTIONS = {}
