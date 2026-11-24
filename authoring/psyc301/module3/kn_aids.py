"""Workspace study aids for Collection 18 (Knowledge).

Same structure as ltm_aids.py and enc_aids.py. Researchers and years are written as the slides give them.
Scores are a study-priority heuristic, not a prediction of the exam.
"""

TOPIC_TITLES = [
 'Concepts, categories and why categories are useful',
 'The definitional approach and family resemblance',
 'The prototype approach and typicality',
 'The typicality effect and priming',
 'The exemplar approach',
 'Levels of categories and the basic level',
 'Knowledge, culture and the basic level',
 'Semantic networks and Collins and Quillian (1969)',
 'Spreading activation and criticism of the model',
 'The connectionist approach: units and weights',
 'How connectionist networks learn',
 'Categories in the brain and the sensory-functional hypothesis',
 'Semantic category, multiple factors and embodied approaches',
]

REMEMBER = {
 0: 'A concept is a mental representation, a category is all the examples of a concept, and categories are pointers to knowledge.',
 1: 'Definitions work for geometric objects but not for everyday categories, so Wittgenstein proposed family resemblance.',
 2: 'A prototype is an average of the members met before. In Rosch (1975), sparrow was rated 1.18 and bat 6.15 as birds.',
 3: 'Prototypical items are verified faster and listed first. After a prime, good examples took 610 milliseconds and poor examples took 780.',
 4: 'Exemplars are actual members, not an average. They handle atypical cases such as birds that do not fly.',
 5: 'People listed about 3 common features for furniture, about 9 for table and about 10.3 for kitchen table, and people name objects at the basic level.',
 6: 'Undergraduates said “trees,” horticulturalists and the Itzaj said “oak,” and bird experts named the species.',
 7: 'Nodes are linked by “is a” and “has,” shared properties are stored higher up, and farther nodes take longer to verify.',
 8: 'Activation spreads to related concepts and primes them. The model cannot explain typicality or “A pig is a mammal.”',
 9: 'Knowledge is in the distributed activity of many units, and weights set how strongly one unit activates the next.',
 10: 'The error signal is sent back to change the weights a little at a time, and damage causes graceful degradation.',
 11: 'Animals go with sensory attributes and artifacts go with uses. Warrington and Shallice found this in K.C. and E.W.',
 12: 'Category-specific, multiple-factor and embodied approaches agree that concept information is distributed across the brain.',
}

QA = []


def qa(slides, topic, score, q, a, deep, who=None, bank=False, kind='slide', note=None):
    QA.append(dict(slides=slides, topic=topic, score=score, q=q, a=a, deep=deep, who=who, bank=bank, kind=kind, note=note))


# 0
qa([2], 0, 8, 'What are conceptual knowledge, a concept and categorization?',
   'Conceptual knowledge is knowledge that enables us to recognize objects and events and to make inferences about their properties. A concept is a mental representation used for a variety of cognitive functions. Categorization is the process by which things are placed into groups called categories.',
   ['**Conceptual knowledge** is knowledge that enables us to **recognize objects and events and to make inferences about their properties**.',
    '- A **concept** is a **mental representation used for a variety of cognitive functions**.',
    '- **Categorization** is the process by which things are **placed into groups called categories**.',
    '- **Categories are all possible examples of a particular concept.**'], bank=True)
qa([3, 4], 0, 7, 'Why are categories useful?',
   'Categories help us understand individual cases we have not encountered before. They are pointers to knowledge, because they provide general information about an item and let us identify the special characteristics of a particular item.',
   ['Categories **help to understand individual cases not previously encountered**.',
    '- They are **“pointers to knowledge.”** They provide a wealth of general information about an item.',
    '- They allow us to identify the **special characteristics** of a particular item.',
    '- Identifying something as a cat lets a person assume many things about its anatomy and behavior.'], bank=True)
qa([5], 0, 5.5, 'If a cat loses its whiskers, is it still a cat, and why does the question matter?',
   'It is still a cat. A person who meows and purrs is still not a cat. The answers are obvious, but explaining why is very hard, because no single property decides whether something belongs to a category.',
   ['A cat without whiskers is **still a cat**, and a person who meows and purrs is **still not a cat**.',
    '- These seem like absurd propositions, but **explaining why turns out to be very hard**.',
    '- No single property decides membership in the category.'])

# 1
qa([6], 1, 8.5, 'What is the definitional approach to categorization, and why does it not work well?',
   'The definitional approach determines category membership by whether the object meets the definition of the category. It works for some things, such as geometric objects, but not for natural and human-made objects, because not all members of everyday categories have the same defining features.',
   ['The **definitional approach** determines category membership **based on whether the object meets the definition of the category**.',
    '- It **works well for some things, such as geometric objects**.',
    '- It does **not** work for natural objects and human-made objects.',
    '- **Not all members of everyday categories have the same defining features.**'], bank=True)
qa([7], 1, 9, 'What is family resemblance, and who proposed it?',
   'Wittgenstein proposed family resemblance to deal with the problem that definitions often do not include all members of a category. In family resemblance, things in a category resemble one another in a number of ways, which allows for some variation within a category.',
   ['**Wittgenstein** proposed **family resemblance** because **definitions often do not include all members of a category**.',
    '- **Things in a category resemble one another in a number of ways.**',
    '- This **allows for some variation within a category**.',
    '- Categorization may be based on how similar an object is to a standard representation of the category.'], who='Wittgenstein', bank=True,
   note='The slide spells the name “Wittgenestein.” The philosopher’s name is Wittgenstein.')

# 2
qa([8], 2, 9, 'What is a prototype, and what is the prototype approach to categorization?',
   'A prototype is a representation of the typical member of a category, formed as an average of the category members encountered in the past. In the prototype approach, membership in a category is determined by comparing the object to a prototype that represents the category.',
   ['A **prototype** is a representation of the **“typical” member of a category**.',
    '- It is **an average of category members encountered in the past**.',
    '- In the **prototype approach**, membership is determined by **comparing the object to a prototype that represents the category**.'], bank=True)
qa([9], 2, 9.5, 'What did participants do in Rosch (1975), and what were some of the ratings?',
   'In Rosch (1975), participants saw a category title and a list of about 50 members and rated how well each member represented the category title. For birds, sparrow was rated 1.18 and bat 6.15. For furniture, chair and sofa were rated 1.04 and telephone 6.68.',
   ['In **Rosch (1975)**, participants **saw a category title (e.g. birds) and a list of about 50 members of the category**.',
    '- They **rated the extent to which each member represented the category title**. A rating of 1 was very good and 7 was poor.',
    '- For **birds**, sparrow was 1.18, owl 2.96, penguin 4.53 and bat 6.15.',
    '- For **furniture**, chair and sofa were 1.04, china closet 2.59, mirror 4.39 and telephone 6.68.'], who='Rosch (1975)', bank=True)
qa([10], 2, 7.5, 'What are high prototypicality and low prototypicality?',
   'High prototypicality means a category member closely resembles the category prototype, such as a robin for the category “bird.” Low prototypicality means a member does not closely resemble the prototype, such as an ostrich.',
   ['**High prototypicality** means a category member **closely resembles the category prototype**. For “bird,” an example is a **robin**.',
    '- **Low prototypicality** means a member **does not closely resemble the prototype**. For “bird,” an example is an **ostrich**.'])
qa([11], 2, 8, 'How is prototypicality related to family resemblance?',
   'Prototypicality is related to family resemblance. In Rosch and Mervis (1975), more prototypical items of furniture, such as chairs, sofas and tables, shared many characteristics with one another, whereas a mirror or a telephone shared relatively few.',
   ['**Prototypicality is related to family resemblance.**',
    '- In **Rosch and Mervis (1975)**, participants listed the characteristics of objects such as chair, sofa, mirror and telephone.',
    '- **Chairs, sofas and tables share many characteristics with one another.**',
    '- **A mirror or a telephone shares relatively few.**'], who='Rosch and Mervis (1975)', bank=True)

# 3
qa([12], 3, 9.5, 'What is the typicality effect, and how is it shown?',
   'The typicality effect is that prototypical objects are processed preferentially. In a sentence verification task, responses are faster to prototypical items, so “An apple is a fruit” is verified faster than “A pomegranate is a fruit.” People also list the most prototypical members of a category first.',
   ['The **typicality effect** is that **prototypical objects are processed preferentially**.',
    '- In a **sentence verification task**, people answer yes or no to sentences such as “An apple is a fruit.”',
    '- **Faster responses were made to prototypical items.**',
    '- When listing members of a category, people **list the most prototypical members first**.'], bank=True)
qa([13, 14], 3, 9, 'How does a priming stimulus affect prototypical and non-prototypical members?',
   'Prototypical category members are more affected by a priming stimulus. After hearing “green,” people judged two good examples of green as the same in 610 milliseconds and two poor examples in 780 milliseconds. Hearing “green” creates a prototype for green, and good examples match it better.',
   ['**Prototypical category members are more affected by a priming stimulus.**',
    '- Participants heard a prime, such as “green,” and two seconds later saw a pair of colors.',
    '- They pressed a key as quickly as possible if the two were the same.',
    '- Good examples of green took **610 milliseconds**, and poor examples took **780 milliseconds**.',
    '- The good examples are a good match to the prototype for green.'], bank=True,
   note='The slide names no researcher for this priming experiment. In the textbook it is Rosch (1975b).')

# 4
qa([15], 4, 9, 'What is the exemplar approach?',
   'In the exemplar approach, a concept is represented by multiple examples rather than a single averaged prototype. The examples are actual category members. To categorize, a person compares the new item to the stored examples.',
   ['In the **exemplar approach**, a concept is **represented by multiple examples rather than a single averaged prototype**.',
    '- The **examples are actual category members, not abstract averages**.',
    '- **To categorize, compare the new item to stored examples.**',
    '- It can explain Rosch’s results, because objects that are like more of the exemplars are classified faster.'], bank=True)
qa([15, 16], 4, 8.5, 'How are the exemplar approach and the prototype approach similar and different?',
   'They are similar because in both, representing a category is not defining it. They are different because the exemplar representation is not abstract. It consists of descriptions of specific examples, and the prototype is an abstract average.',
   ['They are **similar** because **representing a category is not defining it**.',
    '- They are **different** because the exemplar **representation is not abstract**.',
    '- Exemplars are **descriptions of specific examples**, and a prototype is an average.'], bank=True)
qa([16], 4, 8, 'What does the exemplar approach explain, and which approach do people use?',
   'The exemplar approach explains the typicality effect, takes atypical cases into account and deals with variable categories. People may use both approaches. Exemplars may work best for small categories, and prototypes may work best for larger categories.',
   ['The exemplar approach **explains the typicality effect** and **takes into account atypical cases**.',
    '- Rather than comparing a penguin to an average bird, we remember that some birds do not fly.',
    '- It **deals with variable categories**.',
    '- People **may use both** approaches. Exemplars may work best for **small** categories and prototypes for **larger** categories.'])

# 5
qa([17], 5, 8.5, 'What are the three levels of categories?',
   'The superordinate level, or global level, is a general category such as “furniture.” The basic level is a category such as “table.” The subordinate level, or specific level, is a category such as “kitchen table.”',
   ['**Rosch’s research indicates that there are different levels of categories.**',
    '- The **superordinate (global) level** is “furniture.”',
    '- The **basic level** is “table.”',
    '- The **subordinate (specific) level** is “kitchen table.”'], bank=True)
qa([18], 5, 10, 'What did Rosch and colleagues (1976) find, and why is the basic level special?',
   'In Rosch and colleagues (1976), participants listed features common to all or most objects in a category. They listed about 3 for furniture, about 9 for table and about 10.3 for kitchen table. Going above the basic level loses a lot of information, and going below it gains little.',
   ['In **Rosch and colleagues (1976)**, participants **listed as many features as they could that would be common to all or most of the objects in the category**.',
    '- They listed about **3** features for furniture, about **9** for table and about **10.3** for kitchen table.',
    '- **Going above basic level results in a large loss of information.**',
    '- **Going below basic level results in little gain of information.**'], who='Rosch and colleagues (1976)', bank=True)
qa([19, 20], 5, 8, 'At which level do people name objects?',
   'People name objects by their basic-level name. They say “guitar,” rather than “Stratocaster” (specific) or “instrument” (global), and “fish,” rather than “trout” or “animal.”',
   ['When participants are asked to name objects, they **name them by their basic level name**.',
    '- They say **guitar**, rather than Stratocaster (specific) or instrument (global).',
    '- They say **fish**, rather than trout or animal.'], bank=True)

# 6
qa([21], 6, 9.5, 'What did Coley, Medin and Atran (1997) find about naming plants?',
   'Coley, Medin and Atran (1997) asked undergraduates and horticulturalists to walk around campus and name 44 plants as specifically as possible. 75 percent of the undergraduates used “trees,” and horticulturalists used specific categories such as “oak.”',
   ['**Coley, Medin and Atran (1997)** asked **undergraduates and horticulturalists** to name **44 different plants** as specifically as possible.',
    '- **75% of the undergraduates used “trees.”**',
    '- **Horticulturalists used “specific” categories, such as “oak.”**',
    '- In the **Guatemalan Itzaj culture**, “oak” behaves like a basic-level category.'], who='Coley, Medin and Atran (1997)', bank=True)
qa([21], 6, 7.5, 'Why does culture matter for the basic level?',
   'Rosch’s experiments were carried out on college undergraduates, so the level called “basic” reflects undergraduates’ everyday experience. Horticulturalists used specific names such as “oak,” and for people of the Guatemalan Itzaj culture, “oak” behaves like a basic-level category.',
   ['**Rosch’s experiments were carried out on college undergraduates.**',
    '- The level called “basic” **reflects college undergraduates’ everyday experience**.',
    '- For people of the Guatemalan Itzaj culture, **“oak” behaves like a basic-level category**.'])
qa([22], 6, 9.5, 'What did Tanaka and Taylor (1991) find?',
   'Tanaka and Taylor (1991) asked bird experts and non-experts to name pictures of objects. Experts responded by specifying the birds’ species, and non-experts mostly said “bird.” Experts had learned to pay attention to features of birds that non-experts were unaware of.',
   ['**Tanaka and Taylor (1991)** asked **bird experts and non-experts to name pictures of objects**.',
    '- **Experts responded by specifying the birds’ species**, such as “sparrow” or “robin.”',
    '- Non-experts mostly used the basic-level name “bird.” About three quarters of the experts’ responses were specific, and about three quarters of the non-experts’ responses were basic.',
    '- **People’s knowledge and properties of objects are both important factors in categorization.**'], who='Tanaka and Taylor (1991)', bank=True)

# 7
qa([23], 7, 9, 'How is the semantic network of Collins and Quillian (1969) organized?',
   'In the model of Collins and Quillian (1969), a node is a category or concept. Concepts are linked by structured pointers such as “is a” and “has.” The model is hierarchical, going from more specific concepts to more general ones.',
   ['In **Collins and Quillian (1969)**, a **node** is a **category or concept**.',
    '- **Concepts are linked by structured pointers** such as “is a” and “has.”',
    '- It is a **model for how concepts and properties are associated in the mind**.',
    '- It is a **hierarchical model, more specific to more general**.'], who='Collins and Quillian (1969)', bank=True)
qa([24], 7, 9, 'What are inheritance and cognitive economy?',
   'Inheritance means that lower-level items share the properties of higher-level items. Cognitive economy means that shared properties are stored only at higher-level nodes, so “can fly” is stored once at “bird.” Exceptions are stored at lower nodes, so “ostrich” has the property “can’t fly.”',
   ['**Inheritance** means **lower-level items share properties of higher-level items**.',
    '- **Cognitive economy** means **shared properties are only stored at higher-level nodes**.',
    '- Including “can fly” for every node would be inefficient.',
    '- **Exceptions are stored at lower nodes**, such as “can’t fly” for ostrich.'], bank=True)
qa([25], 7, 9.5, 'What does the Collins and Quillian (1969) model predict about response time, and what was found?',
   'The model predicts that the time to retrieve information about a concept is determined by the distance that must be traveled through the network. The test of the model found this. It takes longer to answer “yes” to “A canary is an animal” than to “A canary is a bird.”',
   ['**General concepts are at the top** of the network, and **specific ones are at the bottom**.',
    '- The **testable prediction** is that retrieval time **is determined by the distance that must be traveled through the network**.',
    '- **“A canary is an animal” takes longer than “A canary is a bird.”**',
    '- Property statements also took longer with more levels, as in “can sing,” “can fly” and “has skin.”'], who='Collins and Quillian (1969)', bank=True)

# 8
qa([26], 8, 9, 'What is spreading activation?',
   'Activation is the arousal level of a node. In spreading activation, when a node is activated, activity spreads out along all connected links. Concepts that receive activation are primed and more easily accessed from memory.',
   ['**Activation is the arousal level of a node.**',
    '- **When a node is activated, activity spreads out along all connected links.**',
    '- **Concepts that receive activation are primed and more easily accessed from memory.**',
    '- Activating “robin” spreads activation to “bird,” which primes “canary,” “ostrich” and “animal.”'], bank=True)
qa([27], 8, 9.5, 'How did Meyer and Schvaneveldt test spreading activation, and what did they find?',
   'Meyer and Schvaneveldt used a lexical decision task with pairs of words. People were faster to respond to related pairs, such as bread and wheat, than to unrelated pairs, such as chair and money.',
   ['**Meyer and Schvaneveldt** tested spreading activation with a **lexical decision task using pairs of words**.',
    '- In a lexical decision task, a person decides as quickly as possible whether letter strings are words.',
    '- **People were faster to respond to related pairs than unrelated pairs.**',
    '- Reaction time was about 855 milliseconds for associated words and about 940 milliseconds for words that were not associated.'], who='Meyer and Schvaneveldt', bank=True,
   note='The slide gives no year for Meyer and Schvaneveldt. The study was published in 1971.')
qa([28], 8, 9.5, 'What are the criticisms of the Collins and Quillian model?',
   'The model cannot explain typicality effects, because it predicts equally fast responses for “canary” and “ostrich.” Cognitive economy is doubted, because there is evidence that people store specific properties right at the node for a concept. Some sentence-verification results do not fit, such as “A pig is a mammal” being slower than “A pig is an animal.”',
   ['The model **cannot explain typicality effects**.',
    '- It predicts equal reaction times for “canary” and “ostrich,” because both are one node away from “bird.”',
    '- **Cognitive economy** is doubted. There is evidence that people store specific properties right at the node for the concept.',
    '- **“A pig is a mammal” is slower than “A pig is an animal,”** which the model does not predict.'], bank=True)

# 9
qa([29], 9, 8.5, 'What is connectionism?',
   'Connectionism is an approach to creating computer models for representing cognitive processes. It is also called parallel distributed processing, because knowledge is represented in the distributed activity of many units. It came in the late 1980s from criticism of structured networks and from advances in understanding the brain.',
   ['**Connectionism** is **an approach to creating computer models for representing cognitive processes**.',
    '- It is **also called parallel distributed processing**.',
    '- **Knowledge is represented in the distributed activity of many units.**',
    '- It was based on criticism of structured networks and on advances in understanding how the brain represents information.'], bank=True)
qa([30], 9, 8, 'What are the parts of a connectionist network?',
   'Units are inspired by neurons, and patterns of activity in the units represent concepts and their properties. Lines are connections that transfer activation between units. Input units are activated by stimuli from the environment, and output units receive input from hidden units.',
   ['**Units** are **inspired by the neurons in the brain**.',
    '- **Lines** are **connections that transfer activation between the units**, inspired by axons.',
    '- **Input units** are activated by stimuli from the environment.',
    '- **Output units** receive input from **hidden units**.'])
qa([29, 31], 9, 9, 'What do connection weights do?',
   'Weights determine at each connection how strongly an incoming signal will activate the next unit. High connection weights result in a strong tendency to excite the next unit. Negative connection weights can decrease excitation or inhibit activation of the receiving unit.',
   ['**Weights determine at each connection how strongly an incoming signal will activate the next unit.**',
    '- **High connection weights** result in a strong tendency to excite the next unit.',
    '- **Negative connection weights** can decrease excitation or inhibit activation of the receiving unit.',
    '- Activation depends on the signal from the input units and on the weights throughout the network.'], bank=True)
qa([31], 9, 8.5, 'How is a stimulus represented in a connectionist network?',
   'A stimulus is represented by the pattern of activity that is distributed across the other units. That pattern depends on the signal from the input units and on the connection weights.',
   ['**A stimulus is represented by the pattern of activity that is distributed across the other units.**',
    '- The activation of units depends on **the signal that originates in the input units**.',
    '- It also depends on **the connection weights throughout the network**.'])

# 10
qa([32], 10, 8.5, 'How does a connectionist network learn?',
   'The connection weights have to be adjusted through a learning process. The network responds to a stimulus and produces a guess. It is provided with the correct response, and it modifies its weights to increase the match between its response and the correct response.',
   ['**The connection weights have to be adjusted via a learning process.**',
    '- The **network responds to a stimulus** and **produces a “guess.”**',
    '- It is **provided with the correct response**.',
    '- It **modifies weights to increase the match** between its response and the correct response.'], bank=True)
qa([33], 10, 9.5, 'What are the error signal and back-propagation?',
   'The error signal is the difference between the actual activity of each output unit and the correct activity. In back-propagation, the error signal is transmitted back through the circuit, which indicates how the weights should be changed. The process repeats until the error signal is zero.',
   ['The **error signal** is the **difference between the actual activity of each output unit and the correct activity**.',
    '- In **back-propagation**, the **error signal is transmitted back through the circuit**.',
    '- It **indicates how weights should be changed** to allow the output to match the correct signal.',
    '- **The process repeats until the error signal is zero**, and each learning experience causes only a small change in the weights.'], bank=True)
qa([34], 10, 7, 'How does activity in the hidden units change with learning?',
   'At the start of learning, the patterns of activity in the hidden units for rose, daisy and canary look alike. After many learning trials, rose and daisy have similar patterns and canary has a different pattern.',
   ['Activity in the hidden units is shown after 0, 250, 750 and 2,500 learning trials.',
    '- At 0 trials, the patterns for rose, daisy and canary look alike.',
    '- By 2,500 trials, **rose and daisy have similar patterns, and canary has a different pattern**.',
    '- Similar concepts come to be represented by similar patterns of activity.'])
qa([35], 10, 9, 'What are graceful degradation and generalization of learning?',
   'Graceful degradation means that disruption of performance occurs gradually as parts of the system are damaged, so the network is not totally disrupted by damage. Connectionist networks can also explain generalization of learning, because the slow learning process creates a network capable of handling a wide range of inputs.',
   ['**The operation of connectionist networks is not totally disrupted by damage.**',
    '- **Graceful degradation** is when **disruption of performance occurs gradually as parts of the system are damaged**.',
    '- Connectionist networks **can explain generalization of learning**.',
    '- The slow learning process creates a network capable of handling a wide range of inputs.'], bank=True)

# 11
qa([37], 11, 8, 'What evidence suggests that categories are handled by different brain areas?',
   'There is a double dissociation for the categories “living things” and “nonliving things.” Each side of it is a category-specific memory impairment. So different areas of the brain may be specialized for different categories, mostly in the temporal lobe, and the approaches disagree about how.',
   ['**Different areas of the brain may be specialized to process information about different categories.**',
    '- There is a **double dissociation for “living things” and “nonliving things.”**',
    '- Each side of the dissociation is a **category-specific memory impairment**, in which one type of object cannot be identified.',
    '- The areas involved are mostly in the temporal lobe.'], bank=True)
qa([38], 11, 9.5, 'What is the sensory-functional hypothesis, and what does it predict?',
   'The sensory-functional hypothesis states that our ability to differentiate living things and artifacts depends on a semantic memory system that distinguishes sensory attributes and a system that distinguishes function. It predicts that a patient who cannot identify living things should have a more general impairment in processing sensory attributes.',
   ['The **sensory-functional hypothesis** states that telling **living things** from **artifacts** depends on a system for **sensory attributes** and a system for **function**.',
    '- It **predicts** that a patient who can’t identify living things should have a **more general impairment processing sensory attributes**.',
    '- **Animals** are more strongly associated with their **sensory attributes**.',
    '- **Artifacts** are more strongly associated with their **uses**.',
    '- In ratings, animals were higher than artifacts on color and motion, and artifacts were higher on performed action.'], bank=True)
qa([39], 11, 9, 'What evidence is there for and against the sensory-functional hypothesis?',
   'Warrington and Shallice found evidence for it in patients K.C. and E.W., who did much worse with living animals than with nonanimals. Other studies confirmed this and found an association between functional attributes and artifacts. But there are a number of exceptions to the overall pattern.',
   ['**Warrington and Shallice found evidence** for the hypothesis in **patients K.C. and E.W.**',
    '- Both patients were about 90 percent correct for nonanimals and much lower for living animals.',
    '- **Other studies confirmed this** and found an association between functional attributes and artifacts.',
    '- **But there are a number of exceptions to this overall pattern.**'], who='Warrington and Shallice', bank=True,
   note='The slide gives no year for Warrington and Shallice. Their paper on category-specific impairments was published in 1984. Patients K.C. and E.W. in the figure come from later studies by other researchers (Blundo and colleagues, 2006; Caramazza and Shelton, 1998).')

# 12
qa([40], 12, 8, 'What is the semantic category approach?',
   'The semantic category approach proposes that there are specific neural circuits in the brain for specific categories, distributed over a number of different cortical areas. There may be a limited number of categories that are innately determined because of their importance for survival.',
   ['The **semantic category approach** proposes **specific neural circuits in the brain for specific categories**.',
    '- The circuits are **distributed over a number of different cortical areas**.',
    '- **A limited number of categories may be innately determined** because of their importance for survival.',
    '- Another possibility is that unusual impairments are haphazard results of strokes late in life.'], bank=True)
qa([41], 12, 8.5, 'What is the multiple factors approach, and what does it say about mechanical devices?',
   'The multiple factors approach looks at how concepts are divided up within a category instead of identifying specific brain areas for different concepts. Mechanical devices overlap with artifacts and with animals, so they have a widely distributed semantic representation, and patients may identify them even if they do poorly with other artifacts.',
   ['The **multiple factors approach** looks at **how concepts are divided up within a category**.',
    '- **Mechanical devices** overlap with **artifacts**, because they involve performing actions.',
    '- They overlap with **animals**, because they involve sound and motion.',
    '- So they have a **widely distributed semantic representation**, and patients may still identify them.'], bank=True)
qa([42], 12, 9, 'What is crowding, and how does it explain category-specific impairments?',
   'Crowding occurs when different concepts within a category share many properties. Animals all share eyes, legs and the ability to move, and artifacts share fewer properties. Patients may have difficulty recognizing living things because they have difficulty distinguishing between items that share similar features.',
   ['**Crowding** is **when different concepts within a category share many properties**.',
    '- **Animals** all share eyes, legs and the ability to move. **Artifacts share fewer properties.**',
    '- **Patients with category-specific impairments may not have a category impairment at all.**',
    '- They may have difficulty **distinguishing between items that share similar features**.'], bank=True)
qa([43], 12, 9, 'What is the embodied approach?',
   'In the embodied approach, our knowledge of concepts is based on reactivation of the sensory and motor processes that occur when we interact with the object. When we see a hammer, or the word “hammer,” the same sensory and motor areas are activated as when we use a hammer.',
   ['In the **embodied approach**, knowledge of concepts is based on **reactivation of sensory and motor processes that occur when we interact with the object**.',
    '- When we use a hammer, sensory areas and motor areas are activated.',
    '- **When we see a hammer, or see “hammer,” the same areas get activated.**',
    '- This is an **interaction between action and perception**.',
    '- The brain figure shows separate activations for leg and foot, for arm and hand, and for face and mouth.'], bank=True)
qa([44], 12, 8.5, 'How do the category-specific, multiple-factor and embodied approaches agree and differ?',
   'They agree that information about concepts is distributed across many structures in the brain. They differ in emphasis. The category-specific approach emphasizes specialized brain areas and networks, the multiple-factor approach emphasizes many features and properties, and the embodied approach emphasizes activity caused by the sensory and motor properties of objects.',
   ['**The three approaches agree** that **information about concepts is distributed across many structures in the brain**.',
    '- The **category-specific approach**, which is the semantic category approach, emphasizes specialized areas of the brain and networks connecting them.',
    '- The **multiple-factor approach** emphasizes the role of many different features and properties.',
    '- The **embodied approach** emphasizes activity caused by the sensory and motor properties of objects.'], bank=True)

# Putting it together
qa([6, 8, 15], 4, 9, 'How do the definitional, prototype and exemplar approaches differ?',
   'The definitional approach decides membership by whether an object meets a definition. The prototype approach compares the object to an average of past members. The exemplar approach compares the object to stored examples that are actual members.',
   ['The three approaches use three different standards for membership.',
    '- The **definitional approach** uses a **definition**.',
    '- The **prototype approach** uses an **average** of members encountered in the past.',
    '- The **exemplar approach** uses **stored examples** that are actual members.'], kind='relate')
qa([12, 28], 8, 9, 'Why is the typicality effect a problem for the semantic network model?',
   'The typicality effect is that responses are faster for more typical members of a category. In the Collins and Quillian model, “canary” and “ostrich” are both one node away from “bird,” so the model predicts equal response times and cannot explain the effect.',
   ['The **typicality effect** is that reaction times are faster for more typical members of a category.',
    '- In the network, “canary” and “ostrich” are both **one node away from “bird.”**',
    '- So the model **predicts equal reaction times** for both.',
    '- The prototype and exemplar approaches do explain the effect.'], kind='relate')
qa([23, 29, 31], 9, 9, 'How do semantic networks and connectionist networks differ?',
   'In a semantic network, each concept is a node, and nodes are linked by pointers such as “is a.” In a connectionist network, a concept is represented by a pattern of activity distributed across many units. The connection weights hold what the network has learned.',
   ['The two kinds of network represent a concept differently.',
    '- In the **semantic network** of **Collins and Quillian (1969)**, a **node** is a concept.',
    '- In a **connectionist network**, a concept is the **pattern of activity distributed across many units**.',
    '- Connectionist networks **learn** by adjusting weights, and they show **graceful degradation**.'], kind='relate')
qa([18, 21, 22], 6, 9, 'How do Coley, Medin and Atran (1997) and Tanaka and Taylor (1991) change the idea of a basic level?',
   'Rosch’s basic level came from college undergraduates. Coley, Medin and Atran (1997) found that horticulturalists named plants at a specific level, and Tanaka and Taylor (1991) found that bird experts named the species. So the level that is basic depends on a person’s knowledge.',
   ['Rosch’s basic level reflects the experience of **college undergraduates**.',
    '- In **Coley, Medin and Atran (1997)**, horticulturalists used specific names such as “oak.”',
    '- In **Tanaka and Taylor (1991)**, bird experts specified the species.',
    '- So **people’s knowledge** changes which level they use.'], kind='relate')
qa([9, 11, 18, 21, 22, 23], 2, 9, 'Which year goes with each named study?',
   'Collins and Quillian is 1969. Rosch is 1975, and Rosch and Mervis is also 1975. Rosch and colleagues is 1976. Tanaka and Taylor is 1991, and Coley, Medin and Atran is 1997.',
   ['The years are the ones given with each study.',
    '- **Collins and Quillian (1969)** is the semantic network.',
    '- **Rosch (1975)** is the typicality ratings, and **Rosch and Mervis (1975)** is family resemblance and prototypicality.',
    '- **Rosch and colleagues (1976)** is common features at three levels.',
    '- **Tanaka and Taylor (1991)** is bird experts, and **Coley, Medin and Atran (1997)** is naming plants.'], kind='relate')


CARDS = []


def card(title, researcher, pages, aim, manipulated, measured, found, means, blocks, trap=None):
    CARDS.append(dict(title=title, researcher=researcher, pages=pages, aim=aim, manipulated=manipulated, measured=measured,
                      found=found, means=means, trap=trap, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


card('Rosch · typicality ratings', 'Rosch (1975)', [9, 10],
     'Do people agree that some members represent a category better than others?',
     'The category member that was rated, from a list of about 50 members for each category title.',
     'A rating of how well each member represented the category title, from 1 (very good) to 7 (poor).',
     'For birds, sparrow was 1.18, owl 2.96, penguin 4.53 and bat 6.15. For furniture, chair and sofa were 1.04 and telephone was 6.68.',
     'Members of a category differ in typicality.',
     [('In **Rosch (1975)**, participants saw a category title, such as birds, and a list of about 50 members.', []),
      ('They **rated the extent to which each member represented the category title**.', ['A rating of 1 was a very good example, and 7 was a poor example.']),
      ('For birds, sparrow was rated 1.18 and bat 6.15. **Rosch (1975)** showed that members differ in **typicality**.', [])],
     trap='A low number means a good example.')
card('Rosch and Mervis · family resemblance', 'Rosch and Mervis (1975)', [11],
     'Is prototypicality related to family resemblance?',
     'The object for which characteristics were listed, such as chair, sofa, mirror or telephone.',
     'How many characteristics an item shares with other members of the category.',
     'Chairs, sofas and tables shared many characteristics with one another. A mirror or a telephone shared relatively few.',
     'Items with high prototypicality have high family resemblance.',
     [('In **Rosch and Mervis (1975)**, participants listed as many characteristics as they could for common objects.', []),
      ('**More prototypical items of furniture share many characteristics with one another**, and a mirror or a telephone shares relatively few.', ['So prototypicality is related to family resemblance.'])])
card('Sentence verification · the typicality effect', 'Typicality effect (no researcher named)', [12],
     'Are prototypical items processed faster?',
     'The prototypicality of the item in the sentence, such as apple (high) or pomegranate (low).',
     'Reaction time to answer yes or no.',
     'Faster responses were made to prototypical items, about 520 milliseconds for apple against about 650 for pomegranate.',
     'Prototypical objects are processed preferentially.',
     [('In a **sentence verification task**, people answer yes or no to sentences such as “An apple is a fruit.”', []),
      ('**Responses were faster for prototypical items**, which is the **typicality effect**.', ['People also list the most prototypical members of a category first.'])])
card('Priming with a color name · good and poor examples', 'Priming experiment (no researcher named)', [13, 14],
     'Does a prime help prototypical members more?',
     'Whether the two colors were good examples of the primed color, poor examples, or different colors.',
     'Reaction time to press a key when the two colors were the same.',
     '610 milliseconds for good examples and 780 milliseconds for poor examples.',
     'Prototypical category members are more affected by a priming stimulus.',
     [('Participants heard a prime, such as “green,” and two seconds later saw a pair of colors.', ['They pressed a key as quickly as possible if the two were the same.']),
      ('Two **good examples** of green took **610 milliseconds**, and two **poor examples** took **780 milliseconds**.', ['The good examples match the prototype for green.'])],
     trap='Both pairs were the same color. They differed in how good an example of green they were.')
card('Rosch and colleagues · common features at three levels', 'Rosch and colleagues (1976)', [17, 18],
     'What makes the basic level special?',
     'The level of the category, global (furniture), basic (table) or specific (kitchen table).',
     'The number of features listed as common to all or most objects in the category.',
     'About 3 for furniture, about 9 for table and about 10.3 for kitchen table.',
     'Going above the basic level loses a lot of information, and going below it gains little.',
     [('In **Rosch and colleagues (1976)**, participants listed features common to all or most objects in a category.', []),
      ('They listed about **3** for furniture, about **9** for table and about **10.3** for kitchen table.', []),
      ('**Rosch and colleagues (1976)** showed that going above the basic level loses a lot of information, and going below it gains little.', [])],
     trap='The jump is from 3 to 9. From 9 to 10.3 is a small gain.')
card('Naming objects · basic-level names', 'Naming objects (no researcher named)', [19, 20],
     'Which level do people use when they name an object?',
     'Not reported.',
     'The name people gave to pictures of objects.',
     'People said guitar, not Stratocaster or instrument, and fish, not trout or animal.',
     'People name objects at the basic level.',
     [('When people are asked to name objects, they **use the basic-level name**.', []),
      ('They say **guitar**, not Stratocaster (specific) or instrument (global), and **fish**, not trout or animal.', [])])
card('Coley, Medin and Atran · naming plants', 'Coley, Medin and Atran (1997)', [21],
     'Is the basic level the same for everyone?',
     'Who did the naming, undergraduates or horticulturalists.',
     'The names given to 44 plants on a walk around campus.',
     '75 percent of the undergraduates used “trees.” Horticulturalists used specific categories such as “oak.”',
     'The level that is basic depends on experience and culture.',
     [('**Coley, Medin and Atran (1997)** asked undergraduates and horticulturalists to name **44 plants** as specifically as possible.', []),
      ('**75 percent of the undergraduates said “trees,”** and horticulturalists used specific names such as “oak.”', ['In the Guatemalan Itzaj culture, “oak” behaves like a basic-level category.'])])
card('Tanaka and Taylor · bird experts', 'Tanaka and Taylor (1991)', [22],
     'Does knowledge change the level at which people name objects?',
     'Whether the participant was a bird expert or a non-expert.',
     'The category used to name pictures of birds, basic or specific.',
     'Experts specified the birds’ species. Non-experts mostly said “bird.”',
     'People’s knowledge and properties of objects are both important factors in categorization.',
     [('**Tanaka and Taylor (1991)** asked bird experts and non-experts to name pictures of objects.', []),
      ('**Experts specified the species**, and non-experts mostly said “bird.”', ['Experts had learned to pay attention to features that non-experts were unaware of.'])],
     trap='Experts named birds at the specific level, not the basic level.')
card('Collins and Quillian · semantic network', 'Collins and Quillian (1969)', [23, 24, 25],
     'Are concepts organized in the mind as a hierarchical network?',
     'The number of levels that must be traveled through the network to verify a statement.',
     'Mean response time to verify statements such as “A canary is a bird.”',
     '“A canary is an animal” took longer than “A canary is a bird.” Response time rose with the number of levels.',
     'Retrieval time is determined by the distance traveled through the network.',
     [('In **Collins and Quillian (1969)**, a **node** is a concept, and nodes are linked by pointers such as “is a” and “has.”', []),
      ('Shared properties are stored only at higher-level nodes, which is **cognitive economy**.', ['Exceptions are stored at lower nodes.']),
      ('The model predicts longer retrieval for longer distances. **“A canary is an animal” took longer than “A canary is a bird.”**', [])],
     trap='The model fails for typicality and for “A pig is a mammal.”')
card('Meyer and Schvaneveldt · lexical decision task', 'Meyer and Schvaneveldt', [26, 27],
     'Does activation spread from a word to related words?',
     'Whether the two words in a pair were related or unrelated.',
     'Reaction time in a lexical decision task.',
     'People were faster to respond to related pairs than to unrelated pairs, about 855 against about 940 milliseconds.',
     'Activation spreads to related concepts and primes them.',
     [('**Meyer and Schvaneveldt** tested **spreading activation** with a **lexical decision task** using pairs of words.', []),
      ('**People were faster to respond to related pairs**, such as bread and wheat, than to unrelated pairs, such as chair and money.', [])])
card('Connectionist network · learning in the hidden units', 'Connectionist network (no researcher named)', [33, 34],
     'What changes in a connectionist network as it learns?',
     'The number of learning trials, 0, 250, 750 or 2,500.',
     'The pattern of activity in the hidden units for rose, daisy and canary.',
     'The patterns looked alike at first. After many trials, rose and daisy were similar and canary was different.',
     'Learning changes the weights a little at a time until similar concepts have similar patterns of activity.',
     [('The network learns by **back-propagation**. The **error signal** is sent back, and the weights are changed a little.', []),
      ('At 0 trials, the hidden-unit patterns for rose, daisy and canary look alike. By 2,500 trials, **rose and daisy are similar and canary is different**.', [])])
card('Warrington and Shallice · patients K.C. and E.W.', 'Warrington and Shallice', [38, 39],
     'Do some patients have a deficit in recognizing animals while they can still recognize other things?',
     'These are patients, so nothing was manipulated. Performance was compared for living animals and for nonanimals.',
     'Percent correct performance.',
     'Both patients were about 90 percent correct for nonanimals and much lower for living animals.',
     'The figure shows the deficit for living animals. The sensory-functional hypothesis links it to sensory attributes, and there are a number of exceptions.',
     [('The **sensory-functional hypothesis** predicts that deficits in processing sensory attributes go with deficits in recognizing animals, but not artifacts.', []),
      ('**Warrington and Shallice** found evidence for this in **patients K.C. and E.W.**', ['Both did much worse with living animals than with nonanimals.']),
      ('There are **a number of exceptions** to this pattern.', [])],
     trap='The patients were poor with living animals, not with nonliving things.')


CONTRASTS = []


def contrast(title, pages, score, a, b, diff, example, watch, blocks):
    CONTRASTS.append(dict(title=title, pages=pages, score=score, a=dict(term=a[0], definition=a[1]), b=dict(term=b[0], definition=b[1]),
                          diff=diff, example=example, watch=watch, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


contrast('Concept vs category', [2], 7.5,
         ('Concept', 'A concept is a mental representation used for a variety of cognitive functions.'),
         ('Category', 'A category is all possible examples of a particular concept.'),
         'A concept is the mental representation. A category is the set of examples that the concept covers.',
         'The concept “cat” is the mental representation. The category “cat” includes tabbies, Siamese cats, Persian cats and wild cats.',
         'Categorization is the process of placing things into categories.',
         [('A **concept** is a mental representation. A **category** is all possible examples of a particular concept.', []),
          ('**Categorization** is the process by which things are placed into categories.', [])])
contrast('Definitional approach vs family resemblance', [6, 7], 9,
         ('Definitional approach', 'The definitional approach decides membership by whether the object meets the definition of the category.'),
         ('Family resemblance', 'In family resemblance, things in a category resemble one another in a number of ways.'),
         'A definition requires the same features for every member. Family resemblance allows variation within a category.',
         'A square fits a definition. Chairs do not all share one set of defining features, but they resemble one another.',
         'Wittgenstein proposed family resemblance because definitions often do not include all members.',
         [('The **definitional approach** asks whether an object meets a definition. It works for geometric objects and not for everyday categories.', []),
          ('**Family resemblance** means members resemble one another in a number of ways, which allows variation.', [])])
contrast('Prototype approach vs exemplar approach', [8, 15, 16], 10,
         ('Prototype approach', 'The prototype approach compares an object to a prototype, which is an average of category members encountered in the past.'),
         ('Exemplar approach', 'The exemplar approach compares an object to stored examples, which are actual category members.'),
         'The prototype is one abstract average. Exemplars are many specific examples.',
         'A penguin is unlike the average bird. In the exemplar approach, we remember that there are some birds that do not fly.',
         'Neither approach defines the category.',
         [('In the **prototype approach**, the standard is an **average** of past members. In the **exemplar approach**, the standard is the **actual examples** stored in memory.', []),
          ('Exemplars may work best for small categories, and prototypes may work best for larger categories.', [])])
contrast('Rosch (1975), Rosch and Mervis (1975) and Rosch and colleagues (1976)', [9, 11, 18], 9.5,
         ('Rosch (1975)', 'In Rosch (1975), participants rated how well each member represented a category title.'),
         ('Rosch and Mervis (1975) and Rosch and colleagues (1976)', 'In Rosch and Mervis (1975), participants listed the characteristics of single objects. In Rosch and colleagues (1976), participants listed features common to all or most objects in a category.'),
         'Rosch (1975) is about typicality ratings. Rosch and Mervis (1975) is about family resemblance. Rosch and colleagues (1976) is about levels of categories.',
         'The rating of 1.18 for sparrow comes from Rosch (1975). The counts of about 3, 9 and 10.3 common features come from Rosch and colleagues (1976).',
         'Two studies involve listing. Listing the characteristics of single objects is Rosch and Mervis (1975), and listing features common to a category is Rosch and colleagues (1976).',
         [('**Rosch (1975)** had participants **rate** how well members represented a category.', []),
          ('**Rosch and Mervis (1975)** had participants list the characteristics of single objects. **Rosch and colleagues (1976)** had participants **list common features** at three levels.', [])])
contrast('Superordinate level vs basic level vs subordinate level', [17, 18], 9.5,
         ('Superordinate (global) level', 'The superordinate level is a general category such as “furniture.”'),
         ('Basic and subordinate levels', 'The basic level is a category such as “table,” and the subordinate (specific) level is a category such as “kitchen table.”'),
         'The levels differ in how general they are. The basic level carries a lot of information without becoming overly specific.',
         'Furniture had about 3 common features, table about 9 and kitchen table about 10.3.',
         'Superordinate is the same as global, and subordinate is the same as specific.',
         [('The **superordinate** level is “furniture,” the **basic** level is “table,” and the **subordinate** level is “kitchen table.”', []),
          ('Going above the basic level loses a lot of information, and going below it gains little.', [])])
contrast('Coley, Medin and Atran (1997) vs Tanaka and Taylor (1991)', [21, 22], 9.5,
         ('Coley, Medin and Atran (1997)', 'Coley, Medin and Atran (1997) had undergraduates and horticulturalists name 44 plants.'),
         ('Tanaka and Taylor (1991)', 'Tanaka and Taylor (1991) had bird experts and non-experts name pictures of objects.'),
         'Both show that knowledge changes the level people use. One used plants, and the other used birds.',
         '75 percent of undergraduates said “trees.” Bird experts specified the species.',
         'Plants go with 1997, and birds go with 1991.',
         [('**Coley, Medin and Atran (1997)** compared undergraduates and horticulturalists naming **plants**.', []),
          ('**Tanaka and Taylor (1991)** compared experts and non-experts naming **birds**.', ['In both, people with more knowledge used more specific names.'])])
contrast('Inheritance vs cognitive economy', [24], 9,
         ('Inheritance', 'Inheritance means lower-level items share properties of higher-level items.'),
         ('Cognitive economy', 'Cognitive economy means shared properties are stored only at higher-level nodes.'),
         'Inheritance is about which properties an item has. Cognitive economy is about where those properties are stored.',
         'A canary can fly because birds can fly. “Can fly” is stored once at “bird” and not at every bird.',
         'Exceptions, such as “can’t fly” for ostrich, are stored at lower nodes.',
         [('**Inheritance** means lower-level items share the properties of higher-level items.', []),
          ('**Cognitive economy** means shared properties are stored only at higher-level nodes.', [])])
contrast('Semantic network vs connectionist network', [23, 29, 31], 10,
         ('Semantic network', 'In a semantic network, each node is a category or concept, and nodes are linked by pointers such as “is a” and “has.”'),
         ('Connectionist network', 'In a connectionist network, knowledge is represented in the distributed activity of many units.'),
         'A semantic network has one node per concept. A connectionist network represents a concept as a pattern of activity across units.',
         '“Canary” is a node in the model of Collins and Quillian (1969). In a connectionist network, canary is a pattern of activity in the hidden units.',
         'Connectionism is also called parallel distributed processing.',
         [('In a **semantic network**, a concept is a **node**. In a **connectionist network**, a concept is a **distributed pattern of activity**.', []),
          ('Connectionist networks learn by adjusting connection weights.', [])])
contrast('Sensory attributes vs functional attributes', [38, 39], 9.5,
         ('Sensory attributes', 'Sensory attributes, such as color and motion, are more strongly associated with animals and other natural kinds.'),
         ('Functional attributes', 'Functional attributes, such as uses, are more strongly associated with artifacts.'),
         'The sensory-functional hypothesis ties living things to sensory attributes and artifacts to function.',
         'A patient who cannot identify living things should have a more general impairment in processing sensory attributes.',
         'There are a number of exceptions to the overall pattern.',
         [('**Animals** are more strongly associated with their **sensory attributes**. **Artifacts** are more strongly associated with their **uses**.', []),
          ('This is the **sensory-functional hypothesis**.', [])])
contrast('Semantic category approach vs multiple factors approach', [40, 41, 42], 9,
         ('Semantic category approach', 'The semantic category approach proposes specific neural circuits in the brain for specific categories.'),
         ('Multiple factors approach', 'The multiple factors approach looks at how concepts are divided up within a category, such as by crowding.'),
         'One looks for circuits for whole categories. The other looks at the features and properties that concepts share.',
         'In the multiple factors approach, a patient may have trouble with living things because animals share many properties.',
         'Crowding belongs to the multiple factors approach.',
         [('The **semantic category approach** proposes specific neural circuits for specific categories.', []),
          ('The **multiple factors approach** looks at how concepts are divided up within a category, and at **crowding**.', [])])
contrast('Sensory-functional hypothesis vs embodied approach', [38, 43], 8.5,
         ('Sensory-functional hypothesis', 'The sensory-functional hypothesis explains category impairments by a system for sensory attributes and a system for function.'),
         ('Embodied approach', 'The embodied approach says knowledge of concepts is based on reactivating sensory and motor processes from interacting with the object.'),
         'The sensory-functional hypothesis is about which attributes distinguish living things from artifacts. The embodied approach is about sensory and motor areas being reactivated.',
         'Seeing the word “hammer” activates the same areas as using a hammer.',
         'Both involve sensory information, but only the embodied approach is about reactivating motor processes.',
         [('The **sensory-functional hypothesis** separates sensory attributes from function.', []),
          ('The **embodied approach** says knowing a concept means **reactivating sensory and motor processes**.', [])])
contrast('Typicality effect vs distance in the network', [12, 25, 28], 9,
         ('Typicality effect', 'The typicality effect is that responses are faster for more typical members of a category.'),
         ('Distance in the network', 'In the semantic network model, response time depends on the distance that must be traveled through the network.'),
         'Both come from sentence verification. One depends on how typical the member is, and the other depends on how many levels separate the two concepts.',
         '“An apple is a fruit” is faster than “A pomegranate is a fruit” because of typicality. “A canary is a bird” is faster than “A canary is an animal” because of distance.',
         'The network model cannot explain the typicality effect, because canary and ostrich are the same distance from bird.',
         [('The **typicality effect** is faster responses for more typical members. The **semantic network model** predicts response time from the **distance** between concepts.', []),
          ('Canary and ostrich are both one node from bird, so distance cannot explain why typical members are verified faster.', [])])
contrast('Sensory-functional hypothesis vs crowding', [38, 42], 9,
         ('Sensory-functional hypothesis', 'The sensory-functional hypothesis says trouble with living things comes from an impairment in processing sensory attributes.'),
         ('Crowding', 'Crowding is when different concepts within a category share many properties. Patients may then have trouble telling living things apart.'),
         'Both explain why a patient may have trouble with living things. One points to sensory attributes, and the other points to how many properties animals share.',
         'Animals all share eyes, legs and the ability to move, and artifacts share fewer properties.',
         'Crowding belongs to the multiple factors approach.',
         [('The **sensory-functional hypothesis** ties living things to **sensory attributes**.', []),
          ('**Crowding** is when concepts within a category **share many properties**, which makes them hard to tell apart.', [])])


HARD = []


def hard(title, pages, blocks):
    HARD.append(dict(title=title, pages=pages, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))


hard('Three ways to decide category membership', [6, 8, 15],
     [('The **definitional approach** asks whether an object meets the definition of the category. It fails for everyday categories, because members do not all share the same defining features.', []),
      ('The **prototype approach** compares the object to a **prototype**, which is an average of the members met in the past.', []),
      ('The **exemplar approach** compares the object to **stored examples**, which are actual members.',
       ['Exemplars handle atypical cases, such as birds that do not fly.'])])
hard('What is basic about the basic level', [17, 18, 20],
     [('Categories have a **superordinate** level (furniture), a **basic** level (table) and a **subordinate** level (kitchen table).', []),
      ('In **Rosch and colleagues (1976)**, people listed about 3 common features for furniture, about 9 for table and about 10.3 for kitchen table.', []),
      ('Going above the basic level **loses a lot of information**, and going below it **gains little**.',
       ['People also name objects at the basic level, such as “guitar” and “fish.”'])])
hard('How the semantic network predicts response time', [23, 24, 25],
     [('In **Collins and Quillian (1969)**, concepts are nodes in a hierarchy, with specific concepts at the bottom and general ones at the top.', []),
      ('Shared properties are stored once at a higher node, which is **cognitive economy**. A lower node gets them by **inheritance**.', []),
      ('To verify “A canary is an animal,” a person has to travel two levels. To verify “A canary is a bird,” a person has to travel one level.',
       ['So the first statement takes longer, which is what was found.'])])
hard('Why the semantic network model was criticized', [28],
     [('The model **cannot explain typicality effects**. “Canary” and “ostrich” are both one node from “bird,” so it predicts equal response times.', []),
      ('**Cognitive economy** is doubted, because people seem to store some properties right at the node for a concept.', []),
      ('**“A pig is a mammal” is slower than “A pig is an animal,”** although mammal is closer to pig in the network.', [])])
hard('How a connectionist network learns', [32, 33, 34],
     [('The network responds to a stimulus with a guess and is then given the correct response.', []),
      ('The **error signal** is the difference between the actual activity of each output unit and the correct activity. In **back-propagation**, it is sent back through the circuit.', []),
      ('The error signal shows how to change the weights. **Each experience changes the weights only a little**, and the process repeats until the error signal is zero.',
       ['After many trials, similar concepts have similar patterns of activity in the hidden units.'])])
hard('Four accounts of concepts in the brain', [38, 40, 42, 43],
     [('The **sensory-functional hypothesis** says living things depend on sensory attributes and artifacts depend on function.', []),
      ('The **semantic category approach** proposes specific neural circuits for specific categories.', []),
      ('The **multiple factors approach** points to **crowding**. Animals share many properties, so they are harder to tell apart.', []),
      ('The **embodied approach** says concept knowledge is the reactivation of sensory and motor processes.',
       ['The last three agree that information about concepts is distributed across many structures in the brain.'])])
