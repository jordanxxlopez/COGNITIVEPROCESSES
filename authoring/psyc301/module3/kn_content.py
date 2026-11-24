"""Collection 18 · Knowledge (Module III, source id 17).

Authored from sources/CogPsych_Ch09_Knowledge_F26.pdf, one entry per source slide, in source order.
Each slide has an Original transcript (HTML paragraphs that keep the slide wording in bold) and a
Version 22 transcript (main points with sub-points, researchers and years in the sentences).
Researcher names and years are written as the slides give them, with "and colleagues" for "et al.".
"""

SECTIONS = []


def slide(page, title, original=(), v22=(), core=None):
    SECTIONS.append(dict(page=page, title=title, original=list(original),
                         v22=[dict(text=t, children=list(c)) for t, c in v22], core=core))


slide(1, 'Knowledge · title')

slide(2, 'Conceptual knowledge, concepts and categorization',
 original=[
  '<strong>Conceptual knowledge</strong> is <strong>knowledge that enables us to recognize objects and events and to make inferences about their properties</strong>. An inference is a conclusion about something that has not been observed directly.',
  'A <strong>concept</strong> is a <strong>mental representation used for a variety of cognitive functions</strong>. It can be the <strong>meaning of objects, events, and abstract ideas</strong>, and it can be the <strong>mental representation of a class or individual</strong>.',
  '<strong>Categorization</strong> is <strong>the process by which things are placed into groups called categories</strong>. <strong>Categories are all possible examples of a particular concept</strong>, and <strong>our knowledge of the world is organized in categories</strong>.'],
 v22=[
  ('**Conceptual knowledge** is knowledge that lets us **recognize objects and events** and **make inferences about their properties**.', []),
  ('A **concept** is a **mental representation** that is used for many cognitive functions. It can be the meaning of an object, an event or an abstract idea.', []),
  ('**Categorization** is the process of **placing things into groups called categories**. A **category** is all the possible examples of a concept.',
   ['Our knowledge of the world is organized in categories.'])],
 core='Concepts and categories')

slide(3, 'Why categories are useful: the category “cat”',
 original=[
  'The <strong>category “cat” includes tabbies, Siamese cats, Persian cats, wild cats</strong> and more. <strong>Identifying something as a “cat” allows you to assume a number of things about its anatomy, behavior</strong> and other properties.',
  'Knowing that an animal is a cat tells a person that it probably has whiskers, catches mice, meows and purrs, and sleeps a lot. <strong>That is good because we do not have to treat each new cat we encounter as sui generis</strong>, which means as one of a kind. The category supplies the knowledge.'],
 v22=[
  ('The category **“cat”** includes tabbies, Siamese cats, Persian cats and wild cats.', []),
  ('**Identifying something as a cat lets a person assume many things about it**, such as its anatomy and behavior.',
   ['So each new cat does not have to be treated as one of a kind.'])])

slide(4, 'Why categories are useful: pointers to knowledge',
 original=[
  'Categories <strong>help to understand individual cases not previously encountered</strong>. A person who meets a new animal and recognizes it as a cat already knows a great deal about it.',
  'Categories are <strong>“pointers to knowledge.”</strong> They <strong>provide a wealth of general information about an item</strong>, and they <strong>allow us to identify the special characteristics of a particular item</strong>. Knowing what cats are usually like makes it easy to notice what is unusual about one cat.',
  '<strong>If there were no such things as categories, we would have a very hard time dealing with the world</strong>. Every object would have to be learned about separately.'],
 v22=[
  ('Categories **help us understand individual cases we have not met before**.', []),
  ('Categories are **“pointers to knowledge.”** They **give general information about an item**, and they let us **notice the special characteristics of a particular item**.', []),
  ('**Without categories, we would have a very hard time dealing with the world.**',
   ['Every object would have to be learned about separately.'])])

slide(5, 'Why categories are complicated',
 original=[
  'Two questions show why categories are complicated. <strong>If I cut a cat’s whiskers off, or show that it can easily be trained, does it cease to be a cat?</strong> It does not. The animal is still a cat without one or two of the usual properties.',
  '<strong>If I start meowing and purring, does that make me a cat?</strong> It does not. A person who has several properties of cats is still not a cat.',
  '<strong>These seem like absurd propositions, but explaining why turns out to be very hard</strong>. No single property decides whether something is a cat, so a list of required properties does not work as a rule for membership.'],
 v22=[
  ('A cat with its whiskers cut off is **still a cat**. A person who meows, purrs and sleeps a lot is **still not a cat**.', []),
  ('These answers seem obvious, but **explaining why is very hard**.',
   ['No single property decides whether something belongs to the category.'])])

slide(6, 'The definitional approach to categorization',
 original=[
  'In the <strong>definitional approach to categorization</strong>, we <strong>determine category membership based on whether the object meets the definition of the category</strong>.',
  'This approach <strong>does not work well</strong>. It <strong>works well for some things, such as geometric objects</strong>. A square can be defined as a figure with four equal sides and four right angles. It does <strong>not</strong> work <strong>for natural objects and human-made objects</strong>.',
  'The reason is that <strong>not all members of everyday categories have the same defining features</strong>. An armchair, a straight wooden chair, a round cushioned chair and a rock that someone sits on can all be called chairs, and no one definition covers all of them.'],
 v22=[
  ('The **definitional approach** decides category membership by **whether the object meets the definition of the category**.', []),
  ('It **works for some things, such as geometric objects**. It **does not work well for natural objects and human-made objects**.', []),
  ('This is because **not all members of everyday categories have the same defining features**.',
   ['Chairs come in very different forms, and no one definition covers all of them.'])],
 core='Definitional approach and family resemblance')

slide(7, 'Family resemblance',
 original=[
  '<strong>Wittgenstein proposed the idea of family resemblance to deal with the problem that definitions often do not include all members of a category</strong>. In <strong>family resemblance</strong>, <strong>things in a category resemble one another in a number of ways</strong>.',
  'Family resemblance <strong>allows for some variation within a category</strong>. Members do not all have to share one defining feature. They only have to overlap with other members in several features.',
  'This leads to a different view of categorization. <strong>Categorization may be based on determining how similar an object is to some standard representation of a category</strong>.'],
 v22=[
  ('**Wittgenstein** proposed **family resemblance** because **definitions often do not include all members of a category**.', []),
  ('In family resemblance, **things in a category resemble one another in a number of ways**. This **allows some variation within a category**.', []),
  ('So categorization may be based on **how similar an object is to a standard representation of the category**.', [])],
 core='Definitional approach and family resemblance')

slide(8, 'The prototype approach',
 original=[
  'A <strong>prototype</strong> is <strong>a representation of the “typical” member of a category</strong>. It has the <strong>characteristic features that describe what members of that concept are like</strong>. It is <strong>an average of category members encountered in the past</strong>.',
  'In the <strong>prototype approach to categorization</strong>, <strong>membership in a category is determined by comparing the object to a prototype that represents the category</strong>. The prototype for “bird” is not a sparrow, a robin or a blue jay. It is an average of the birds a person has seen.'],
 v22=[
  ('A **prototype** is a representation of the **“typical” member of a category**. It is an **average of the category members a person has encountered**.', []),
  ('In the **prototype approach**, **membership in a category is decided by comparing the object to the prototype**.',
   ['The prototype for “bird” is an average bird and not any one real bird.'])],
 core='Prototype approach')

slide(9, 'Rosch (1975): typicality ratings',
 original=[
  '<strong>Not all birds are like robins, blue jays, or sparrows</strong>. <strong>Owls and penguins are also birds</strong>. <strong>These variations represent differences in typicality</strong>.',
  'In <strong>Rosch (1975)</strong>, participants <strong>saw a category title (e.g. birds), and a list of about 50 members of the category</strong>. They <strong>were asked to rate the extent to which each member represented the category title</strong>. A rating of 1 meant a very good example, and a rating of 7 meant a poor example.',
  'For the category <strong>birds</strong>, sparrow was rated 1.18, owl 2.96, penguin 4.53 and bat 6.15. For the category <strong>furniture</strong>, chair and sofa were rated 1.04, china closet 2.59, mirror 4.39 and telephone 6.68. People agree that some members are better examples of a category than others.'],
 v22=[
  ('Robins and sparrows are birds, and so are owls and penguins. These differences are **differences in typicality**.', []),
  ('In **Rosch (1975)**, people saw a category title, such as birds, and a list of about 50 members. They **rated how well each member represented the category**.',
   ['A rating of 1 meant a very good example, and 7 meant a poor example.']),
  ('For **birds**, sparrow was rated 1.18 and bat 6.15. For **furniture**, chair and sofa were rated 1.04 and telephone 6.68.',
   ['So some members are better examples of a category than others.'])],
 core='Prototype approach')

slide(10, 'High and low prototypicality',
 original=[
  '<strong>High prototypicality</strong> means that a <strong>category member closely resembles the category prototype</strong>. It is a <strong>“typical” member</strong>. <strong>For the category “bird,”</strong> a high-prototypicality member is a <strong>robin</strong>.',
  '<strong>Low prototypicality</strong> means that a <strong>category member does not closely resemble the category prototype</strong>. <strong>For the category “bird,”</strong> a low-prototypicality member is an <strong>ostrich</strong>. Both are birds, but the robin is much closer to the average bird.'],
 v22=[
  ('**High prototypicality** means a member **closely resembles the category prototype**. For “bird,” a **robin** is a high-prototypicality member.', []),
  ('**Low prototypicality** means a member **does not closely resemble the prototype**. For “bird,” an **ostrich** is a low-prototypicality member.', [])],
 core='Prototype approach')

slide(11, 'Prototypicality and family resemblance',
 original=[
  '<strong>Prototypicality is related to family resemblance</strong>. In <strong>Rosch and Mervis’s (1975)</strong> study, the instructions asked participants to list as many characteristics and attributes as they could for each of several common objects, such as chair, sofa, mirror and telephone.',
  '<strong>Chairs, sofas, tables, and other “more prototypical” items of furniture share many characteristics with one another, whereas a mirror or a telephone share relatively few</strong>. Items with high prototypicality are the ones with high family resemblance.',
  '<strong>This will become important when we consider arguments about how to model categorical knowledge (e.g., connectionist networks)</strong>.'],
 v22=[
  ('**Prototypicality is related to family resemblance.** In **Rosch and Mervis (1975)**, people listed the characteristics of common objects such as chair, sofa, mirror and telephone.', []),
  ('**More prototypical items of furniture, such as chairs and sofas, share many characteristics with one another.** A mirror or a telephone shares relatively few.',
   ['So the items with high prototypicality are the ones with high family resemblance.'])])

slide(12, 'The typicality effect',
 original=[
  'The <strong>typicality effect</strong> is that <strong>prototypical objects are processed preferentially</strong>. In a <strong>sentence verification task</strong>, participants answer yes or no to sentences such as <strong>“An apple is a fruit”</strong> and <strong>“A pomegranate is a fruit.”</strong>',
  '<strong>Faster responses were made to prototypical items</strong>. Reaction time was about 520 milliseconds for a high-prototypicality item such as apple and about 650 milliseconds for a low-prototypicality item such as pomegranate.',
  '<strong>Further, when asked to list as many objects in a category as possible, participants tend to list the most prototypical members first</strong>.'],
 v22=[
  ('The **typicality effect** is that **prototypical objects are processed preferentially**, which means faster and before other objects.', []),
  ('In a **sentence verification task**, people answer yes or no to sentences such as “An apple is a fruit.” **Responses are faster for prototypical items**, such as apple, than for items such as pomegranate.', []),
  ('When people list as many members of a category as they can, they **list the most prototypical members first**.', [])],
 core='Typicality effects')

slide(13, 'Prototypical members and priming',
 original=[
  '<strong>Prototypical category members are more affected by a priming stimulus</strong>. Participants <strong>heard the prime (e.g. “green”)</strong>. <strong>Two seconds later, they saw a pair of colors side by side</strong>. They <strong>were asked to press a key as quickly as possible if the two were the same</strong>.',
  'When the two colors were the same and were <strong>good examples</strong> of green, the reaction time for “same” was <strong>610 milliseconds</strong>. When the two colors were the same and were <strong>poor examples</strong> of green, the reaction time was <strong>780 milliseconds</strong>. After the prime, the good examples were judged faster than the poor examples.'],
 v22=[
  ('**Prototypical category members are more affected by a priming stimulus.** People heard a prime, such as “green,” and two seconds later saw two colors side by side.',
   ['They pressed a key as quickly as possible if the two colors were the same.']),
  ('For two **good examples** of green, the “same” response took **610 milliseconds**. For two **poor examples** of green, it took **780 milliseconds**.',
   ['So after the prime, the good examples were judged faster than the poor examples.'])],
 core='Typicality effects')

slide(14, 'Why the prime helps good examples',
 original=[
  'Hearing the word “green” leads a person to form a <strong>prototype for green</strong>. This prototype is a good, typical green.',
  'A pair of good green examples is a <strong>good match</strong> to that prototype, so the person responds quickly. A pair of light green examples is a <strong>poor match</strong> to the prototype, so the person responds more slowly. The priming result therefore fits the prototype approach.'],
 v22=[
  ('Hearing “green” leads a person to form a **prototype for green**, which is a typical green.', []),
  ('Two good green examples are a **good match** to the prototype, so the response is fast. Two light green examples are a **poor match**, so the response is slower.', [])])

slide(15, 'The exemplar approach',
 original=[
  'In the <strong>exemplar approach</strong>, a <strong>concept is represented by multiple examples rather than a single averaged prototype</strong>. The <strong>examples are actual category members, not abstract averages</strong>. <strong>To categorize, compare the new item to stored examples</strong>.',
  '<strong>This approach can explain Rosch’s results</strong>. <strong>Objects that are like more of the exemplars are classified faster</strong>. A sparrow is like many stored birds, so it is classified quickly.',
  'The exemplar approach is <strong>similar to the prototype view</strong> in that <strong>representing a category is not defining it</strong>. It is <strong>different</strong> in that the <strong>representation is not abstract</strong>. It consists of <strong>descriptions of specific examples</strong>.'],
 v22=[
  ('In the **exemplar approach**, a concept is represented by **multiple examples** and not by a single averaged prototype. The **examples are actual category members**.', []),
  ('To categorize, a person **compares the new item to the stored examples**. Objects that are like more of the exemplars are classified faster, which **explains Rosch’s results**.', []),
  ('The exemplar approach is like the prototype approach because neither defines the category. It is different because its representation is **not abstract**.',
   ['It is made of descriptions of specific examples.'])],
 core='Exemplar approach')

slide(16, 'What the exemplar approach explains',
 original=[
  'The exemplar approach <strong>explains the typicality effect</strong>. It also <strong>takes into account atypical cases</strong>. <strong>Rather than comparing a penguin to an “average” bird, we remember that there are some birds that don’t fly</strong>.',
  'It <strong>deals with variable categories</strong>, in which the members differ a great deal from one another.',
  '<strong>Which approach do we use? We may use both</strong>. <strong>Exemplars may work best for small categories</strong>, and <strong>prototypes may work best for larger categories</strong>.'],
 v22=[
  ('The exemplar approach **explains the typicality effect** and **takes atypical cases into account**. We do not compare a penguin to an average bird. We remember that some birds do not fly.', []),
  ('It also **deals with variable categories**, which are categories whose members differ a lot from one another.', []),
  ('People **may use both approaches**. **Exemplars may work best for small categories**, and **prototypes may work best for larger categories**.', [])],
 core='Exemplar approach')

slide(17, 'A hierarchical organization of categories',
 original=[
  '<strong>Rosch’s research indicates that there are different levels of categories</strong>. The <strong>superordinate level (or global level)</strong> is a general category such as <strong>“furniture.”</strong> The <strong>basic level</strong> is a category such as <strong>“table.”</strong> The <strong>subordinate level (or specific level)</strong> is a category such as <strong>“kitchen table.”</strong>',
  'Two questions follow. <strong>Is this just an intuitive description of different levels of categories, or is this how concepts are organized in the mind?</strong> <strong>Also, what is “basic” about the “basic level”?</strong> The evidence shows that the basic level is special in the mind. Going above it loses a lot of information, going below it gains only a little, and people name objects at the basic level.'],
 v22=[
  ('**Rosch’s research** indicates that categories have **different levels**.', []),
  ('The **superordinate level**, or global level, is a category such as “furniture.” The **basic level** is a category such as “table.” The **subordinate level**, or specific level, is a category such as “kitchen table.”', []),
  ('The levels are **how concepts are organized in the mind**, and not only a description. The basic level is the level where a name **carries a lot of information without being overly specific**.',
   ['Going above it loses a lot of information, and going below it gains only a little.'])],
 core='Basic level')

slide(18, 'Rosch and colleagues (1976): the basic level is special',
 original=[
  'In <strong>Rosch and colleagues (1976)</strong>, participants <strong>were asked to list as many features as they could that would be common to all or most of the objects in the category</strong>. They listed about 3 common features for the global category furniture, about 9 for the basic category table and about 10.3 for the specific category kitchen table.',
  '<strong>Going above basic level results in a large loss of information</strong>. <strong>Many fewer features are shared by members of the category “furniture” than by members of the category “table.”</strong>',
  '<strong>Going below basic level results in little gain of information</strong>. <strong>“Kitchen tables” do not have a ton more in common with one another than “tables.”</strong> The basic level is the level at which a category name carries a lot of information without becoming overly specific.'],
 v22=[
  ('In **Rosch and colleagues (1976)**, people **listed the features that were common to all or most objects in a category**.',
   ['They listed about 3 features for furniture, about 9 for table and about 10.3 for kitchen table.']),
  ('**Going above the basic level loses a lot of information.** Members of “furniture” share many fewer features than members of “table.”', []),
  ('**Going below the basic level gains little information.** Kitchen tables do not have much more in common than tables do.', [])],
 core='Basic level')

slide(19, 'Naming objects: guitar and fish',
 original=[
  'Two objects are shown, an electric guitar and a fish, with the instruction <strong>“Quick, name these objects.”</strong> Most people say “guitar” and “fish.”',
  'These names are basic-level names. A person could have said “instrument” or “Stratocaster” for the first object and “animal” or “trout” for the second, but those are not the names that come to mind first.'],
 v22=[
  ('When people are asked to quickly name an electric guitar and a fish, most say **“guitar”** and **“fish.”**',
   ['These are basic-level names.'])])

slide(20, 'People name objects at the basic level',
 original=[
  '<strong>When participants are asked to name these objects, they named them by their basic level name</strong>. They said <strong>guitar, rather than Stratocaster (specific) or instrument (global)</strong>. They said <strong>fish, rather than trout or animal</strong>.',
  'This is further evidence that the basic level is special. It is the level people use first when they name an object.'],
 v22=[
  ('When people name objects, they **use the basic-level name**. They say **guitar**, not Stratocaster (specific) or instrument (global).',
   ['They say **fish**, not trout or animal.'])],
 core='Basic level')

slide(21, 'Culture and categorization',
 original=[
  '<strong>Rosch’s experiments were carried out on college undergraduates</strong>. The result was that <strong>there is a category level, which they called “basic,” that reflects college undergraduates’ everyday experience</strong>.',
  '<strong>Coley, Medin & Atran (1997)</strong> <strong>asked both undergraduates and horticulturalists to walk around campus and name as specifically as possible 44 different plants</strong>. <strong>75% of the undergraduates used “trees.”</strong> <strong>Horticulturalists used “specific” categories instead, such as “oak.”</strong>',
  'People of the <strong>Guatemalan Itzaj culture call an oak tree an “oak” and not a tree</strong>. <strong>For people who speak their language, “oak” behaves like a basic-level category</strong>. The level that is basic therefore depends on a person’s experience and culture.'],
 v22=[
  ('**Rosch’s experiments used college undergraduates.** The level they called “basic” **reflects undergraduates’ everyday experience**.', []),
  ('**Coley, Medin and Atran (1997)** asked undergraduates and horticulturalists to **name 44 plants as specifically as possible**. **75 percent of the undergraduates said “trees.”** The horticulturalists used specific names such as “oak.”', []),
  ('In the **Guatemalan Itzaj culture**, an oak tree is called an “oak” and not a tree. For them, **“oak” behaves like a basic-level category**.',
   ['So which level is basic depends on experience and culture.'])],
 core='Knowledge and the basic level')

slide(22, 'Tanaka and Taylor (1991): experts and the basic level',
 original=[
  '<strong>Tanaka and Taylor (1991)</strong> <strong>asked bird experts and non-experts to name pictures of objects</strong>. <strong>Experts responded by specifying the birds’ species</strong>, with names such as “sparrow” and “robin.” Non-experts mostly responded with the basic-level name “bird.”',
  '<strong>Experts had learned to pay attention to features of birds that non-experts were unaware of</strong>. Their knowledge changed the level at which they named the birds.',
  '<strong>People’s knowledge and properties of objects are both important factors in categorization</strong>.'],
 v22=[
  ('**Tanaka and Taylor (1991)** asked **bird experts and non-experts** to name pictures of objects.', []),
  ('**Experts named the species of the birds**, such as “sparrow” or “robin.” Non-experts mostly said “bird.”',
   ['Experts had learned to pay attention to features of birds that non-experts were unaware of.']),
  ('So **both a person’s knowledge and the properties of objects are important in categorization**.', [])],
 core='Knowledge and the basic level')

slide(23, 'Semantic networks: Collins and Quillian (1969)',
 original=[
  'In the semantic network approach, <strong>concepts are arranged in networks that represent the way concepts are organized in the mind</strong>.',
  'In the model of <strong>Collins and Quillian (1969)</strong>, a <strong>node</strong> is a <strong>category or concept</strong>. <strong>Concepts are linked by structured pointers</strong> such as <strong>“is a”</strong> and <strong>“has.”</strong> For example, a canary “is a” bird, and a bird “has” feathers.',
  'The network is a <strong>model for how concepts and properties are associated in the mind</strong>. It is a <strong>hierarchical model, more specific to more general</strong>. Canary is below bird, bird is below animal, and animal is below living thing.'],
 v22=[
  ('In a **semantic network**, **concepts are arranged in networks that represent how concepts are organized in the mind**.', []),
  ('In the model of **Collins and Quillian (1969)**, a **node** is a category or concept. Nodes are **linked by pointers such as “is a” and “has.”**', []),
  ('The model is **hierarchical**. It goes from **more specific concepts to more general ones**, such as canary, bird, animal.', [])],
 core='Semantic networks')

slide(24, 'Inheritance and cognitive economy',
 original=[
  '<strong>Inheritance</strong> means that <strong>lower-level items share properties of higher-level items</strong>. A canary is a bird, so a canary has the properties of birds.',
  '<strong>Cognitive economy</strong> means that <strong>shared properties are only stored at higher-level nodes</strong>. <strong>Including “can fly” for every node would be inefficient</strong>, so “can fly” is stored once at the node for bird.',
  '<strong>Exceptions are stored at lower nodes</strong>. For example, <strong>“ostrich” would have the property “can’t fly.”</strong>'],
 v22=[
  ('**Inheritance** means that **lower-level items share the properties of higher-level items**.', []),
  ('**Cognitive economy** means that **shared properties are stored only at higher-level nodes**. Storing “can fly” at every bird would be inefficient, so it is stored once at “bird.”', []),
  ('**Exceptions are stored at lower nodes.** For example, “ostrich” has the property “can’t fly.”', [])],
 core='Semantic networks')

slide(25, 'Testing the network: distance and response time',
 original=[
  '<strong>Given the network’s hierarchical organization, general concepts are at the top, and specific ones at the bottom</strong>.',
  'This gives a <strong>testable prediction</strong>. <strong>The time it takes for a person to retrieve information about a concept should be determined by the distance that must be traveled through the network</strong>.',
  'The prediction was supported. <strong>It takes longer to answer “yes” to “A canary is an animal” compared to “A canary is a bird.”</strong> Response time rose with the number of levels to be traversed, both for category statements and for property statements such as “A canary can sing,” “A canary can fly” and “A canary has skin.”'],
 v22=[
  ('In the network, **general concepts are at the top and specific ones are at the bottom**.', []),
  ('The model predicts that the **time to retrieve information depends on the distance traveled through the network**.', []),
  ('This was found. **“A canary is an animal” takes longer to verify than “A canary is a bird.”**',
   ['Response time rose with the number of levels that had to be traversed.'])],
 core='Semantic networks')

slide(26, 'Spreading activation',
 original=[
  '<strong>Spreading activation</strong> is a property of semantic networks. <strong>Activation is the arousal level of a node</strong>. <strong>When a node is activated, activity spreads out along all connected links</strong>.',
  '<strong>Concepts that receive activation are primed and more easily accessed from memory</strong>. For example, activating “robin” sends activation to “bird,” and from there it spreads to “canary,” “ostrich” and “animal,” which are then primed.'],
 v22=[
  ('**Activation** is the **arousal level of a node**. In **spreading activation**, when a node is activated, **activity spreads out along all connected links**.', []),
  ('**Concepts that receive activation are primed**, so they are **more easily accessed from memory**.',
   ['Activating “robin” spreads activation to “bird” and then primes “canary,” “ostrich” and “animal.”'])],
 core='Spreading activation and criticism')

slide(27, 'Meyer and Schvaneveldt: the lexical decision task',
 original=[
  '<strong>Meyer & Schvaneveldt tested for “spreading activation” with a lexical decision task using pairs of words</strong>. In a lexical decision task, a person decides as quickly as possible whether the letter strings are real words. Some pairs were two nonwords, some had one nonword, some were two unrelated words such as chair and money, and some were two related words such as bread and wheat.',
  '<strong>People were faster to respond to related pairs than unrelated pairs</strong>. Reaction time was about 855 milliseconds for words that were associated and about 940 milliseconds for words that were not associated. Reading the first word spread activation to related words, so the second word was easier to access.',
  '<strong>Many studies involving semantic priming have produced similar results</strong>.'],
 v22=[
  ('**Meyer and Schvaneveldt** tested spreading activation with a **lexical decision task** using **pairs of words**.',
   ['In a lexical decision task, a person decides as quickly as possible whether the letter strings are real words.']),
  ('**People responded faster to related pairs**, such as bread and wheat, **than to unrelated pairs**, such as chair and money.',
   ['This is because the first word spread activation to related words.']),
  ('Many studies of **semantic priming** have found similar results.', [])],
 core='Spreading activation and criticism')

slide(28, 'Criticism of Collins and Quillian',
 original=[
  'The model of Collins and Quillian <strong>cannot explain typicality effects</strong>. The <strong>typicality effect</strong> is that <strong>reaction times for statements about an object are faster for more typical members of a category</strong>. <strong>The model instead predicts equal fast reaction times to both “canary” and “ostrich,” as they are one node away from “bird.”</strong>',
  'The idea of <strong>cognitive economy</strong> is also questioned. There is <strong>some evidence that people store specific properties of concepts right at the node for the concept</strong>.',
  '<strong>Some sentence-verification results are problematic for the model</strong>. <strong>“A pig is a mammal” is slower than “A pig is an animal.”</strong> In the network, mammal is closer to pig than animal is, so the model predicts the opposite.'],
 v22=[
  ('The model of **Collins and Quillian** **cannot explain typicality effects**. It predicts equally fast responses for “canary” and “ostrich,” because both are one node away from “bird.”', []),
  ('**Cognitive economy** is doubted. There is evidence that people **store specific properties right at the node for the concept**.', []),
  ('**Some sentence-verification results do not fit.** “A pig is a mammal” is verified more slowly than “A pig is an animal.”',
   ['The model predicts the opposite, because mammal is closer to pig in the network.'])],
 core='Spreading activation and criticism')

slide(29, 'The connectionist approach',
 original=[
  'The <strong>connectionist approach</strong> is a <strong>“new” (late 80’s) approach to networks</strong>. It is based on <strong>criticism of structured networks</strong> and on <strong>advances in understanding how information is represented in the brain</strong>.',
  '<strong>Connectionism</strong> is <strong>an approach to creating computer models for representing cognitive processes</strong>. It is <strong>also called parallel distributed processing</strong>, because <strong>knowledge is represented in the distributed activity of many units</strong>.',
  '<strong>Weights determine at each connection how strongly an incoming signal will activate the next unit</strong>.'],
 v22=[
  ('The **connectionist approach** came in the late 1980s. It grew from **criticism of structured networks** and from **advances in understanding how the brain represents information**.', []),
  ('**Connectionism** is an approach to **creating computer models of cognitive processes**. It is also called **parallel distributed processing**.',
   ['Knowledge is represented in the **distributed activity of many units**.']),
  ('**Weights** determine, at each connection, **how strongly an incoming signal will activate the next unit**.', [])],
 core='Connectionist networks')

slide(30, 'Units, connections and weights',
 original=[
  '<strong>Units</strong> are <strong>inspired by the neurons in the brain</strong>. <strong>Patterns of activity in these units represent concepts and their properties</strong>. The <strong>lines</strong> are <strong>connections that transfer activation between the units</strong>, and they are <strong>inspired by axons</strong>.',
  '<strong>Input units</strong> are <strong>units activated by stimuli from the environment</strong>. Hidden units lie between the input units and the output units. <strong>Output units receive input from hidden units</strong>.',
  'A <strong>connection weight</strong> determines <strong>how signals sent from one unit either increase or decrease the activity in the next unit</strong>.'],
 v22=[
  ('**Units** are inspired by **neurons**. **Patterns of activity in the units represent concepts and their properties.**', []),
  ('The **lines** are **connections that transfer activation between units**. They are inspired by axons.', []),
  ('**Input units** are activated by stimuli from the environment. **Output units** receive input from the **hidden units**, which lie in between.', []),
  ('A **connection weight** determines how a signal from one unit **increases or decreases the activity of the next unit**.', [])],
 core='Connectionist networks')

slide(31, 'Connection weights and patterns of activity',
 original=[
  '<strong>High connection weights result in a strong tendency to excite the next unit</strong>. <strong>Negative connection weights can decrease excitation or inhibit activation of the receiving unit</strong>.',
  '<strong>Activation of units in a network depends on two things</strong>. One is <strong>the signal that originates in the input units</strong>. The other is <strong>the connection weights throughout the network</strong>.',
  '<strong>A stimulus is represented by the pattern of activity that is distributed across the other units</strong>. The pattern across the units is what stands for the stimulus.'],
 v22=[
  ('**High connection weights** give a **strong tendency to excite the next unit**. **Negative connection weights** can **decrease excitation or inhibit** the receiving unit.', []),
  ('The activation of units depends on two things. They are **the signal from the input units** and **the connection weights throughout the network**.', []),
  ('**A stimulus is represented by the pattern of activity distributed across the other units.**', [])],
 core='Connectionist networks')

slide(32, 'How a connectionist network learns',
 original=[
  '<strong>For the network to operate properly, the connection weights have to be adjusted via a learning process</strong>.',
  'Learning occurs in steps. The <strong>network responds to a stimulus</strong>. It <strong>produces a “guess.”</strong> It is <strong>provided with the correct response</strong>. It then <strong>modifies weights to increase the match between its response and the correct response</strong>.'],
 v22=[
  ('For the network to work, **the connection weights have to be adjusted through a learning process**.', []),
  ('The network **responds to a stimulus** and **produces a guess**. It is then **given the correct response**.',
   ['It **modifies its weights** so that its response matches the correct response more closely.'])])

slide(33, 'The error signal and back-propagation',
 original=[
  'The <strong>error signal</strong> is the <strong>difference between the actual activity of each output unit and the correct activity</strong>. In <strong>back-propagation</strong>, the <strong>error signal is transmitted back through the circuit</strong>. This <strong>indicates how weights should be changed to allow the output signal to match the correct signal</strong>.',
  '<strong>The process repeats until the error signal is zero</strong>. There is <strong>initially weak and undifferentiated activation of property units, with many errors</strong>. <strong>Error signals are then sent back</strong>, and <strong>changes are made in connection weights</strong>.',
  '<strong>Each learning experience causes only a small change in the connection weights</strong>, so learning is gradual.'],
 v22=[
  ('The **error signal** is the **difference between the actual activity of each output unit and the correct activity**.', []),
  ('In **back-propagation**, the **error signal is sent back through the circuit**. It shows **how the weights should be changed** so the output matches the correct signal.', []),
  ('The process **repeats until the error signal is zero**. **Each learning experience changes the weights only a little.**',
   ['At first the property units are weakly activated and there are many errors.'])],
 core='Learning in connectionist networks')

slide(34, 'Learning in the hidden units',
 original=[
  'The activity of the hidden units changes as the network learns. Activity in the hidden units is shown for three concepts, rose, daisy and canary, after <strong>0, 250, 750 and 2,500 learning trials</strong>.',
  'At 0 trials, the patterns of activity for the three concepts look alike. As learning continues, the patterns become different. By 2,500 trials, rose and daisy have similar patterns, and canary has a different pattern. The network has learned to represent similar concepts with similar patterns of activity.'],
 v22=[
  ('The activity of the **hidden units** changes as the network learns. It is shown for rose, daisy and canary after **0, 250, 750 and 2,500 learning trials**.', []),
  ('At the start, the three patterns look alike. After many trials, **rose and daisy have similar patterns, and canary has a different pattern**.',
   ['So the network comes to represent similar concepts with similar patterns of activity.'])])

slide(35, 'Properties of connectionist networks',
 original=[
  '<strong>In connectionist networks, information about each concept is contained in the distributed pattern of activity across a number of units</strong>.',
  '<strong>The operation of connectionist networks is not totally disrupted by damage</strong>. <strong>Graceful degradation</strong> means that <strong>disruption of performance occurs gradually as parts of the system are damaged</strong>.',
  '<strong>Connectionist networks can explain generalization of learning</strong>. The <strong>slow learning process creates a network capable of handling a wide range of inputs</strong>.'],
 v22=[
  ('In a connectionist network, **information about each concept is in the distributed pattern of activity across many units**.', []),
  ('**Damage does not totally disrupt the network.** **Graceful degradation** means that **performance is disrupted gradually as parts of the system are damaged**.', []),
  ('Connectionist networks can explain **generalization of learning**. The slow learning process creates a network that can **handle a wide range of inputs**.', [])],
 core='Learning in connectionist networks')

slide(36, 'Google and Connectionism · video link')

slide(37, 'Categories in the brain',
 original=[
  '<strong>Different areas of the brain may be specialized to process information about different categories</strong>. There is a <strong>double dissociation for the categories “living things” and “nonliving things.”</strong> Some patients have trouble with living things and not with nonliving things, and other patients show the reverse.',
  'Each side of the dissociation is a <strong>category-specific memory impairment</strong>, which is an impairment in which a person loses the ability to identify one type of object and keeps the ability to identify other types.',
  '<strong>Do different semantic categories “live” in different parts of the brain?</strong> The areas involved are <strong>mostly in the temporal lobe</strong>, and the approaches that follow give different answers about how category knowledge is laid out.'],
 v22=[
  ('**Different areas of the brain may be specialized for different categories.** There is a **double dissociation for “living things” and “nonliving things.”**',
   ['Some patients have trouble with living things only, and others have trouble with nonliving things only.']),
  ('Each side of the dissociation is a **category-specific memory impairment**, in which a person cannot identify one type of object but can identify other types.', []),
  ('So different areas may be specialized for different categories, **mostly in the temporal lobe**. The approaches disagree about how category knowledge is arranged.', [])],
 core='Categories in the brain')

slide(38, 'The sensory-functional hypothesis',
 original=[
  'The <strong>sensory-functional hypothesis</strong> states that <strong>our ability to differentiate living things and artifacts depends on a semantic memory system that distinguishes sensory attributes and a system that distinguishes function</strong>. An artifact is a human-made object.',
  'It <strong>predicts</strong> that <strong>a patient who can’t identify living things should have a more general impairment processing sensory attributes</strong>.',
  'The reason is that <strong>animals and other natural kinds are more strongly associated with their sensory attributes, whereas artifacts are more strongly associated with their uses</strong>. Ratings fit this. Animals were rated higher than artifacts on color and motion, and artifacts were rated higher than animals on performed action.'],
 v22=[
  ('The **sensory-functional hypothesis** states that we tell **living things** from **artifacts** using one system for **sensory attributes** and one system for **function**.',
   ['An artifact is a human-made object.']),
  ('It predicts that **a patient who cannot identify living things should have a more general impairment in processing sensory attributes**.', []),
  ('This is because **animals are more strongly associated with their sensory attributes**, and **artifacts are more strongly associated with their uses**.', [])],
 core='Sensory-functional hypothesis')

slide(39, 'Evidence for the sensory-functional hypothesis',
 original=[
  'The <strong>sensory-functional hypothesis predicts an association between deficits in processing of sensory attributes and deficits in recognizing animals (but not artifacts)</strong>.',
  '<strong>Warrington and Shallice found evidence for this (Patients K.C. and E.W.)</strong>. Both patients performed at about 90 percent correct for nonanimals, which were nonliving things, fruits and vegetables, and much lower for living animals. <strong>Other studies confirmed this, and further found an association between functional attributes and artifacts</strong>.',
  '<strong>But there are a number of exceptions to this overall pattern</strong>, so the hypothesis does not explain every patient.'],
 v22=[
  ('The hypothesis predicts that **deficits in processing sensory attributes go with deficits in recognizing animals**, but not artifacts.', []),
  ('**Warrington and Shallice** found evidence for this in **patients K.C. and E.W.** Both patients did much worse with living animals than with nonanimals.',
   ['Other studies confirmed this and also linked functional attributes with artifacts.']),
  ('But there are **a number of exceptions** to this pattern.', [])],
 core='Sensory-functional hypothesis')

slide(40, 'The semantic category approach',
 original=[
  'The <strong>semantic category approach</strong> proposes that there are <strong>specific neural circuits in the brain for specific categories</strong>. These circuits are <strong>distributed over a number of different cortical areas</strong>.',
  '<strong>There may be a limited number of categories that are innately determined because of their importance for survival</strong>.',
  'A different possibility is that the unusual impairments are haphazard results of strokes that people have late in life. One reported case, for example, was a category-specific naming deficit for medical terms after a hemorrhage.'],
 v22=[
  ('The **semantic category approach** proposes **specific neural circuits in the brain for specific categories**. The circuits are **distributed over a number of cortical areas**.', []),
  ('**A limited number of categories may be innately determined**, because they are important for survival.',
   ['Another possibility is that unusual impairments are haphazard results of strokes late in life.'])],
 core='Semantic category and multiple factors approaches')

slide(41, 'The multiple factors approach',
 original=[
  'The <strong>multiple factors approach</strong> <strong>looks at how concepts are divided up within a category rather than identifying specific brain areas or networks for different concepts</strong>.',
  '<strong>Mechanical devices (e.g. musical instruments) overlap with artifacts</strong>, because they <strong>involve performing actions</strong>, and with <strong>animals</strong>, because they <strong>involve sound and motion</strong>. As a result, <strong>mechanical devices have a widely distributed semantic representation</strong>, in <strong>regions important for the representation of both living things and artifacts</strong>.',
  'For this reason, <strong>patients may be able to identify mechanical devices even if they perform poorly for other types of artifacts</strong>.'],
 v22=[
  ('The **multiple factors approach** looks at **how concepts are divided up within a category**. It does not look for specific brain areas for different concepts.', []),
  ('**Mechanical devices**, such as musical instruments, **overlap with artifacts** because they involve performing actions. They **overlap with animals** because they involve sound and motion.', []),
  ('So mechanical devices have a **widely distributed semantic representation**, which means the knowledge about them is spread over many brain regions. **Patients may identify mechanical devices even if they do poorly with other artifacts.**', [])],
 core='Semantic category and multiple factors approaches')

slide(42, 'Crowding',
 original=[
  '<strong>Another differentiating factor between animals and artifacts is crowding</strong>. <strong>Crowding</strong> occurs <strong>when different concepts within a category share many properties</strong>. For example, <strong>“animals” all share “eyes,” “legs,” and “the ability to move.”</strong> <strong>In contrast, artifacts share fewer properties</strong>.',
  '<strong>Patients with category-specific impairments may not have a category impairment at all</strong>. <strong>Patients may have difficulty recognizing living things because they have difficulty distinguishing between items that share similar features</strong>.'],
 v22=[
  ('**Crowding** occurs **when different concepts within a category share many properties**. Animals all share eyes, legs and the ability to move. **Artifacts share fewer properties.**', []),
  ('So **patients with category-specific impairments may not have a category impairment at all**.',
   ['They may have difficulty with living things because they have difficulty **telling apart items that share similar features**.'])],
 core='Multiple factors and embodied approaches')

slide(43, 'The embodied approach',
 original=[
  'In the <strong>embodied approach</strong>, <strong>our knowledge of concepts is based on reactivation of sensory and motor processes that occur when we interact with the object</strong>.',
  'When we use a hammer, <strong>different sensory areas are activated due to the hammer’s size and shape</strong>, and <strong>motor areas are activated that are involved in carrying out actions involved in using a hammer</strong>. <strong>When we see a hammer, or see the word “hammer,” the same areas get activated</strong>.',
  'This shows an <strong>interaction between action and perception</strong>. In brain imaging, different motor areas are active for leg and foot actions, for arm and hand actions, and for face and mouth actions.'],
 v22=[
  ('In the **embodied approach**, our knowledge of a concept is based on **reactivating the sensory and motor processes** that occur when we interact with the object.', []),
  ('When we use a hammer, **sensory areas** respond to its size and shape, and **motor areas** carry out the actions of using it.',
   ['**When we see a hammer or the word “hammer,” the same areas are activated.**']),
  ('So there is an **interaction between action and perception**.', [])],
 core='Multiple factors and embodied approaches')

slide(44, 'Summary: three approaches to categories in the brain',
 original=[
  '<strong>The three approaches agree: information about concepts is distributed across many structures in the brain</strong>.',
  '<strong>The approaches differ in their emphasis on the type of information that is most important</strong>. The <strong>category-specific approach</strong>, which is the semantic category approach, emphasizes <strong>specialized areas of the brain and networks connecting them</strong>. The <strong>multiple-factor approach</strong> emphasizes <strong>the role of many different features and properties</strong>. The <strong>embodied approach</strong> emphasizes <strong>activity caused by the sensory and motor properties of objects</strong>.'],
 v22=[
  ('The three approaches agree that **information about concepts is distributed across many structures in the brain**.', []),
  ('They differ in which kind of information they treat as most important.',
   ['The **category-specific approach**, which is the semantic category approach, emphasizes **specialized areas of the brain and the networks connecting them**.',
    'The **multiple-factor approach** emphasizes **many different features and properties**.',
    'The **embodied approach** emphasizes **activity caused by the sensory and motor properties of objects**.'])],
 core='Multiple factors and embodied approaches')


TOPICS = [
 ('Concepts, categories and why categories are useful', [2, 3, 4]),
 ('The definitional approach and family resemblance', [5, 6, 7]),
 ('The prototype approach and typicality', [8, 9, 10, 11]),
 ('The typicality effect and priming', [12, 13, 14]),
 ('The exemplar approach', [15, 16]),
 ('Levels of categories and the basic level', [17, 18, 19, 20]),
 ('Knowledge, culture and the basic level', [21, 22]),
 ('Semantic networks and Collins and Quillian (1969)', [23, 24, 25]),
 ('Spreading activation and criticism of the model', [26, 27, 28]),
 ('The connectionist approach: units and weights', [29, 30, 31]),
 ('How connectionist networks learn', [32, 33, 34, 35]),
 ('Categories in the brain and the sensory-functional hypothesis', [37, 38, 39]),
 ('Semantic category, multiple factors and embodied approaches', [40, 41, 42, 43, 44]),
]

EXPERIMENTS = [
 ('Rosch (1975) · Typicality ratings', [9, 10]),
 ('Rosch and Mervis (1975) · Family resemblance and prototypicality', [11]),
 ('Sentence verification · The typicality effect', [12]),
 ('Priming with a color name · Good and poor examples', [13, 14]),
 ('Rosch and colleagues (1976) · Common features at three levels', [17, 18]),
 ('Naming objects · Basic-level names', [19, 20]),
 ('Coley, Medin and Atran (1997) · Naming plants', [21]),
 ('Tanaka and Taylor (1991) · Bird experts and non-experts', [22]),
 ('Collins and Quillian (1969) · Semantic network and response time', [23, 24, 25]),
 ('Meyer and Schvaneveldt · Lexical decision task', [26, 27]),
 ('Connectionist network · Learning in the hidden units', [33, 34]),
 ('Warrington and Shallice · Patients K.C. and E.W.', [38, 39]),
]

QUESTIONS = []


def q(page, kind, stem, correct, d1, d2, d3, why):
    QUESTIONS.append(dict(page=page, kind=kind, stem=stem, options=[correct, d1, d2, d3], correct=0, why=why))


q(2, 'definition', 'What is categorization?',
  'The process by which things are placed into groups called categories.',
  'The process by which a mental representation is used to make inferences.',
  'The process by which the typical member of a group is averaged.',
  'The process by which an object is compared with a definition only.',
  'Categorization is the process by which things are placed into groups called categories. Categories are all possible examples of a particular concept.')
q(2, 'definition', 'What is a concept?',
  'A mental representation used for a variety of cognitive functions.',
  'All possible examples that belong to one particular category.',
  'A list of features that every member of a category must have.',
  'A typical member formed by averaging the examples met so far.',
  'A concept is a mental representation used for a variety of cognitive functions, such as the meaning of objects, events and abstract ideas.')
q(4, 'definition', 'Why are categories called “pointers to knowledge”?',
  'They provide a wealth of general information about an item.',
  'They store every property separately for every item a person has seen.',
  'They work only for geometric objects with definitions.',
  'They prevent people from noticing unusual items.',
  'Categories are pointers to knowledge because they provide a wealth of general information about an item and allow us to identify the special characteristics of a particular item.')
q(6, 'definition', 'Why does the definitional approach not work well for everyday categories?',
  'Not all members of everyday categories have the same defining features.',
  'All members of everyday categories have exactly the same defining features.',
  'Everyday categories have only one member each.',
  'Definitions can be written only for natural objects.',
  'The definitional approach works for some things, such as geometric objects, but not for natural and human-made objects, because not all members of everyday categories have the same defining features.')
q(7, 'researcher', 'Who proposed the idea of family resemblance?',
  'Wittgenstein.',
  'Rosch.',
  'Collins and Quillian.',
  'Tanaka and Taylor.',
  'Wittgenstein proposed family resemblance to deal with the problem that definitions often do not include all members of a category.')
q(7, 'definition', 'What does family resemblance mean?',
  'Things in a category resemble one another in a number of ways.',
  'Things in a category all share one defining feature that sets them apart.',
  'Things in a category are stored at one node in a network.',
  'Things in a category are named at the specific level.',
  'In family resemblance, things in a category resemble one another in a number of ways, which allows for some variation within a category.')
q(8, 'definition', 'What is a prototype?',
  'A representation of the typical member of a category, based on an average.',
  'An actual member of a category that was encountered in the past and stored as it was.',
  'A definition that every member of a category must meet.',
  'A property that is stored at the highest node in a network.',
  'A prototype is a representation of the “typical” member of a category. It is an average of category members encountered in the past.')
q(9, 'researcher', 'What did participants do in Rosch (1975)?',
  'They rated how well each member represented the category title.',
  'They listed features common to all or most objects in a category.',
  'They named pictures of birds as specifically as they could.',
  'They decided whether pairs of letter strings were words.',
  'In Rosch (1975), participants saw a category title and a list of about 50 members, and rated the extent to which each member represented the category title.')
q(9, 'researcher', 'In Rosch (1975), which item was rated as the best example of the category “birds”?',
  'Sparrow, at 1.18.',
  'Owl, at 2.96.',
  'Penguin, at 4.53.',
  'Bat, at 6.15.',
  'On the scale, 1 was a very good example and 7 was a poor example. Sparrow was rated 1.18, owl 2.96, penguin 4.53 and bat 6.15.')
q(10, 'application', 'For the category “bird,” which pair gives a high-prototypicality member and a low-prototypicality member?',
  'Robin is high, and ostrich is low.',
  'Ostrich is high, and robin is low.',
  'Robin is high, and sparrow is low.',
  'Penguin is high, and robin is low.',
  'High prototypicality means the member closely resembles the category prototype. For “bird,” a robin is a high-prototypicality member and an ostrich is a low-prototypicality member.')
q(11, 'researcher', 'What does the work of Rosch and Mervis (1975) show about prototypical items?',
  'Prototypical items share many characteristics with other members of the category.',
  'Prototypical items share few characteristics with other members of the category.',
  'Prototypical items are named at the superordinate level.',
  'Prototypical items are stored as exceptions at lower nodes.',
  'Prototypicality is related to family resemblance. Chairs, sofas and tables share many characteristics with one another, whereas a mirror or a telephone share relatively few.')
q(12, 'definition', 'What is the typicality effect?',
  'Prototypical objects are processed preferentially.',
  'Prototypical objects are processed more slowly.',
  'Atypical objects are listed first in a category.',
  'Atypical objects are named at the basic level.',
  'The typicality effect is that prototypical objects are processed preferentially. In sentence verification, responses are faster to prototypical items.')
q(12, 'application', 'In a sentence verification task, which sentence is verified faster?',
  '“An apple is a fruit,” because apple is a prototypical fruit.',
  '“A pomegranate is a fruit,” because pomegranate is less common.',
  'Neither, because both sentences are true.',
  '“A pomegranate is a fruit,” because it has more letters to read.',
  'Faster responses were made to prototypical items. An apple is a high-prototypicality fruit, and a pomegranate is a low-prototypicality fruit.')
q(13, 'design', 'After hearing the prime “green,” which pair of colors was judged “same” faster?',
  'Two good examples of green, at 610 milliseconds.',
  'Two poor examples of green, at 610 milliseconds.',
  'Two poor examples of green, at 780 milliseconds.',
  'Two different colors, at 610 milliseconds.',
  'Prototypical category members are more affected by a priming stimulus. The “same” response took 610 milliseconds for good examples and 780 milliseconds for poor examples.')
q(15, 'definition', 'How does the exemplar approach represent a concept?',
  'By multiple examples that are actual category members.',
  'By a single averaged prototype that stands for the whole category.',
  'By a definition that every member must meet.',
  'By one node at the top of a hierarchy.',
  'In the exemplar approach, a concept is represented by multiple examples rather than a single averaged prototype. The examples are actual category members, not abstract averages.')
q(15, 'definition', 'How do the prototype approach and the exemplar approach differ?',
  'The prototype is an abstract average, and exemplars are specific examples.',
  'The prototype is a specific example, and exemplars are abstract averages.',
  'The prototype approach defines the category, and the exemplar approach does not.',
  'The prototype approach uses networks, and the exemplar approach uses weights.',
  'Both approaches represent a category without defining it. They differ because the exemplar representation is not abstract. It is made of descriptions of specific examples.')
q(16, 'application', 'According to the exemplar approach, how do we handle a penguin?',
  'We remember that there are some birds that do not fly.',
  'We compare the penguin with an average bird and reject it.',
  'We store the penguin at the superordinate level.',
  'We decide that a penguin does not meet the definition of bird.',
  'The exemplar approach takes atypical cases into account. Rather than comparing a penguin to an “average” bird, we remember that there are some birds that do not fly.')
q(16, 'definition', 'When might exemplars and prototypes each work best?',
  'Exemplars for small categories, and prototypes for larger categories.',
  'Exemplars for larger categories, and prototypes for small categories.',
  'Exemplars for artifacts, and prototypes for living things.',
  'Exemplars for experts, and prototypes for children only.',
  'People may use both approaches. Exemplars may work best for small categories, and prototypes may work best for larger categories.')
q(17, 'application', 'Which list gives the superordinate, basic and subordinate levels in order?',
  'Furniture, table, kitchen table.',
  'Kitchen table, table, furniture.',
  'Table, furniture, kitchen table.',
  'Furniture, kitchen table, table.',
  'The superordinate or global level is “furniture,” the basic level is “table,” and the subordinate or specific level is “kitchen table.”')
q(18, 'researcher', 'What did Rosch and colleagues (1976) find about the number of common features?',
  'About 3 for furniture, about 9 for table and about 10.3 for kitchen table.',
  'About 9 for furniture, about 3 for table and about 10.3 for kitchen table.',
  'About 10.3 for furniture, about 9 for table and about 3 for kitchen table.',
  'About 3 for furniture, about 10.3 for table and about 9 for kitchen table.',
  'Participants listed about 3 common features at the global level, about 9 at the basic level and about 10.3 at the specific level.')
q(18, 'design', 'Why is the basic level special, according to Rosch and colleagues (1976)?',
  'Going above it loses a lot of information, and going below it gains little.',
  'Going above it gains a lot of information, and going below it loses little.',
  'It has the fewest common features of the three levels.',
  'It is the only level that experts ever use.',
  'Going above the basic level results in a large loss of information. Going below the basic level results in little gain of information.')
q(20, 'application', 'Shown an electric guitar, what do most people call it?',
  'A guitar, which is the basic-level name.',
  'A Stratocaster, which is the specific name.',
  'An instrument, which is the global name.',
  'An artifact, which is the category name.',
  'When participants named the objects, they used the basic-level name. They said guitar, rather than Stratocaster (specific) or instrument (global).')
q(21, 'researcher', 'What did Coley, Medin and Atran (1997) find when people named 44 plants?',
  '75 percent of undergraduates said “trees,” and horticulturalists used specific names such as “oak.”',
  '75 percent of horticulturalists said “trees,” and undergraduates used specific names such as “oak.”',
  'Undergraduates and horticulturalists both used specific names such as “oak.”',
  'Undergraduates and horticulturalists both used the global name “plant.”',
  'Coley, Medin and Atran (1997) asked undergraduates and horticulturalists to name plants as specifically as possible. 75 percent of the undergraduates used “trees,” and horticulturalists used specific categories such as “oak.”')
q(21, 'application', 'For people of the Guatemalan Itzaj culture, which word behaves like a basic-level category?',
  '“Oak.”',
  '“Tree.”',
  '“Plant.”',
  '“Living thing.”',
  'People of the Guatemalan Itzaj culture call an oak tree an “oak” and not a tree. For people who speak their language, “oak” behaves like a basic-level category.')
q(22, 'researcher', 'What did Tanaka and Taylor (1991) find?',
  'Bird experts named the species, and non-experts mostly said “bird.”',
  'Bird experts mostly said “bird,” and non-experts named the species.',
  'Experts and non-experts both named the species.',
  'Experts and non-experts both said “animal.”',
  'Tanaka and Taylor (1991) asked bird experts and non-experts to name pictures. Experts responded by specifying the birds’ species, because they had learned to attend to features non-experts were unaware of.')
q(23, 'researcher', 'In the model of Collins and Quillian (1969), what is a node?',
  'A category or concept.',
  'A connection weight.',
  'An error signal.',
  'A priming stimulus.',
  'In Collins and Quillian (1969), a node is a category or concept. Concepts are linked by structured pointers such as “is a” and “has.”')
q(24, 'definition', 'What is cognitive economy?',
  'Shared properties are stored only at higher-level nodes.',
  'Shared properties are stored at every node in the network.',
  'Exceptions are stored only at the highest node.',
  'Lower-level items share the properties of higher-level items.',
  'Cognitive economy means shared properties are only stored at higher-level nodes. Including “can fly” for every node would be inefficient.')
q(24, 'application', 'In the semantic network, where is the property “can’t fly” stored for ostrich?',
  'At the lower node for ostrich, as an exception.',
  'At the node for bird, together with the property “can fly.”',
  'At the node for animal, with “can move.”',
  'At the top node for living thing.',
  'Exceptions are stored at lower nodes. “Ostrich” would have the property “can’t fly.”')
q(25, 'design', 'What does the Collins and Quillian (1969) model predict about retrieval time?',
  'It depends on the distance that must be traveled through the network.',
  'It depends on how typical the member is, with typical members retrieved faster.',
  'It depends on how many letters the words have.',
  'It is the same for every statement about a concept.',
  'The testable prediction is that the time to retrieve information about a concept is determined by the distance that must be traveled through the network.')
q(25, 'application', 'Which statement takes longer to verify, according to the semantic network results?',
  '“A canary is an animal,” because it is two levels away.',
  '“A canary is a bird,” because it is one level away.',
  '“A canary is a canary,” because it is at the same node.',
  'All three take the same time.',
  'It takes longer to answer “yes” to “A canary is an animal” than to “A canary is a bird,” because more levels must be traversed.')
q(26, 'definition', 'What is spreading activation?',
  'When a node is activated, activity spreads along all connected links.',
  'When a weight is changed, the error signal for that unit becomes zero at once.',
  'When a category is damaged, performance falls gradually.',
  'When an object is named, the basic-level name is used.',
  'In spreading activation, when a node is activated, activity spreads out along all connected links. Concepts that receive activation are primed and more easily accessed from memory.')
q(27, 'researcher', 'What did Meyer and Schvaneveldt find in the lexical decision task?',
  'People were faster to respond to related pairs than to unrelated pairs.',
  'People were faster to respond to unrelated pairs than to related pairs.',
  'People were equally fast for related and unrelated pairs.',
  'People were fastest when both items were nonwords.',
  'Meyer and Schvaneveldt tested spreading activation with a lexical decision task using pairs of words. People were faster to respond to related pairs than unrelated pairs.')
q(28, 'design', 'Why can the Collins and Quillian model not explain the typicality effect?',
  'It predicts equal times for “canary” and “ostrich,” which are both one node from “bird.”',
  'It predicts faster times for “ostrich” than for “canary,” because ostrich is stored higher in the network.',
  'It predicts that typical members are stored at higher nodes.',
  'It predicts that atypical members are not in the network.',
  'The model predicts equally fast reaction times to “canary” and “ostrich,” because both are one node away from “bird.” In fact, reaction times are faster for more typical members.')
q(28, 'application', 'Which sentence-verification result is a problem for the Collins and Quillian model?',
  '“A pig is a mammal” is slower than “A pig is an animal.”',
  '“A canary is an animal” is slower than “A canary is a bird.”',
  '“A canary has skin” is slower than “A canary can sing.”',
  '“A canary is a bird” is slower than “A canary is a canary.”',
  '“A pig is a mammal” is slower than “A pig is an animal.” Mammal is closer to pig in the network, so the model predicts the opposite.')
q(29, 'definition', 'What is connectionism?',
  'An approach to creating computer models for representing cognitive processes.',
  'An approach that defines each category by listing the features every member must have.',
  'An approach that stores each concept at one node in a hierarchy.',
  'An approach that explains concepts by motor actions only.',
  'Connectionism is an approach to creating computer models for representing cognitive processes. It is also called parallel distributed processing.')
q(31, 'definition', 'In a connectionist network, how is a stimulus represented?',
  'By the pattern of activity distributed across the units.',
  'By a single unit that stands for the stimulus and for nothing else.',
  'By the definition of the category it belongs to.',
  'By the distance between two nodes.',
  'A stimulus is represented by the pattern of activity that is distributed across the other units.')
q(31, 'definition', 'What do negative connection weights do?',
  'They can decrease excitation or inhibit activation of the receiving unit.',
  'They result in a strong tendency to excite the next unit in the network.',
  'They send the error signal back through the circuit.',
  'They store exceptions at lower nodes.',
  'High connection weights result in a strong tendency to excite the next unit. Negative connection weights can decrease excitation or inhibit activation of the receiving unit.')
q(33, 'definition', 'What is the error signal?',
  'The difference between the actual activity of each output unit and the correct activity.',
  'The difference between the activity of the input units and the activity of the hidden units.',
  'The number of levels traveled through a network.',
  'The time taken to verify a sentence.',
  'The error signal is the difference between the actual activity of each output unit and the correct activity.')
q(33, 'definition', 'What is back-propagation?',
  'The error signal is transmitted back through the circuit to show how weights should change.',
  'The network responds to a stimulus and produces a first guess about its properties.',
  'The weights are set so that the input units excite the hidden units strongly.',
  'Performance falls gradually as units in the network are damaged.',
  'In back-propagation, the error signal is transmitted back through the circuit. It indicates how weights should be changed to allow the output signal to match the correct signal.')
q(33, 'design', 'How quickly does a connectionist network learn?',
  'Slowly, because each learning experience changes the weights only a little.',
  'Quickly, because one learning experience sets all the weights to their final values.',
  'Not at all, because the weights are fixed.',
  'Quickly, because the error signal starts at zero.',
  'Each learning experience causes only a small change in the connection weights, and the process repeats until the error signal is zero.')
q(35, 'definition', 'What is graceful degradation?',
  'Performance is disrupted gradually as parts of the system are damaged.',
  'Performance stops completely as soon as a single unit in the system is damaged.',
  'Performance improves as parts of the system are damaged.',
  'Performance depends on the distance between nodes.',
  'The operation of connectionist networks is not totally disrupted by damage. Graceful degradation means disruption of performance occurs gradually as parts of the system are damaged.')
q(37, 'definition', 'Which categories show a double dissociation in patients?',
  'Living things and nonliving things.',
  'Sensory attributes and functional attributes.',
  'Mechanical devices and musical instruments.',
  'Animals and fruits and vegetables.',
  'There is a double dissociation for the categories “living things” and “nonliving things.” Each side of the dissociation is a category-specific memory impairment.')
q(38, 'definition', 'What does the sensory-functional hypothesis state?',
  'Telling living things from artifacts depends on a system for sensory attributes and a system for function.',
  'Telling living things from artifacts depends on one definition for living things and one definition for artifacts.',
  'Telling living things from artifacts depends on the number of nodes between them.',
  'Telling living things from artifacts depends on motor areas only.',
  'The sensory-functional hypothesis states that our ability to differentiate living things and artifacts depends on a semantic memory system that distinguishes sensory attributes and a system that distinguishes function.')
q(38, 'application', 'According to the sensory-functional hypothesis, what are artifacts more strongly associated with?',
  'Their uses.',
  'Their colors.',
  'Their motion.',
  'Their sounds.',
  'Animals and other natural kinds are more strongly associated with their sensory attributes, whereas artifacts are more strongly associated with their uses.')
q(39, 'researcher', 'Who found evidence for the sensory-functional hypothesis in patients K.C. and E.W.?',
  'Warrington and Shallice.',
  'Collins and Quillian.',
  'Meyer and Schvaneveldt.',
  'Tanaka and Taylor.',
  'Warrington and Shallice found evidence for the sensory-functional hypothesis in patients K.C. and E.W. There are also a number of exceptions to the overall pattern.')
q(42, 'definition', 'What is crowding?',
  'Different concepts within a category share many properties.',
  'Different categories are stored together in the same area of the brain.',
  'Different units in a network have the same weight.',
  'Different levels of a hierarchy have the same name.',
  'Crowding occurs when different concepts within a category share many properties. Animals all share eyes, legs and the ability to move, and artifacts share fewer properties.')
q(42, 'application', 'According to the idea of crowding, why might a patient have difficulty recognizing living things?',
  'The patient has difficulty distinguishing between items that share similar features.',
  'The patient has lost the one brain area that stores knowledge about every living thing.',
  'The patient cannot process any functional attributes.',
  'The patient names living things only at the basic level.',
  'Patients with category-specific impairments may not have a category impairment at all. They may have difficulty recognizing living things because they have difficulty distinguishing between items that share similar features.')
q(41, 'application', 'Why might a patient identify mechanical devices while doing poorly with other artifacts?',
  'Mechanical devices have a widely distributed semantic representation.',
  'Mechanical devices are stored in a single small brain area that is rarely damaged.',
  'Mechanical devices are named only at the specific level.',
  'Mechanical devices share no properties with animals.',
  'Mechanical devices overlap with artifacts and with animals, so they have a widely distributed semantic representation. Patients may identify them even if they perform poorly for other types of artifacts.')
q(43, 'definition', 'What does the embodied approach state?',
  'Knowledge of concepts is based on reactivating sensory and motor processes from interacting with the object.',
  'Knowledge of concepts is based on the definition of each category, which lists the features every member must have.',
  'Knowledge of concepts is stored at one node per concept.',
  'Knowledge of concepts is innately determined for a few categories.',
  'In the embodied approach, our knowledge of concepts is based on reactivation of sensory and motor processes that occur when we interact with the object.')
q(43, 'application', 'According to the embodied approach, what happens when we see the word “hammer”?',
  'The same sensory and motor areas are activated as when we use a hammer.',
  'Only the areas for reading are activated, and no sensory or motor areas respond.',
  'A single node for “hammer” is activated and nothing else.',
  'No motor areas are activated unless we pick up a hammer.',
  'When we use a hammer, sensory and motor areas are activated. When we see a hammer, or see “hammer,” the same areas get activated.')
q(44, 'definition', 'On what do the category-specific, multiple-factor and embodied approaches agree?',
  'Information about concepts is distributed across many structures in the brain.',
  'Information about concepts is stored in one small area of the temporal lobe and nowhere else.',
  'Information about concepts is stored as definitions.',
  'Information about concepts cannot be studied in patients.',
  'The three approaches agree that information about concepts is distributed across many structures in the brain. They differ in the type of information they emphasize.')
q(40, 'definition', 'What does the semantic category approach propose?',
  'Specific neural circuits in the brain for specific categories.',
  'One neural circuit in the brain that handles every category in the same way.',
  'No role for the brain in category knowledge.',
  'Specific connection weights for each letter of a word.',
  'The semantic category approach proposes specific neural circuits in the brain for specific categories, distributed over a number of different cortical areas.')
q(22, 'researcher', 'Which study compared how bird experts and non-experts named pictures of birds?',
  'Tanaka and Taylor (1991).',
  'Coley, Medin and Atran (1997).',
  'Rosch and colleagues (1976).',
  'Rosch and Mervis (1975).',
  'Tanaka and Taylor (1991) asked bird experts and non-experts to name pictures of objects. Coley, Medin and Atran (1997) had people name plants.')
q(18, 'researcher', 'Which study asked people to list features common to all or most objects in a category?',
  'Rosch and colleagues (1976).',
  'Rosch (1975).',
  'Tanaka and Taylor (1991).',
  'Collins and Quillian (1969).',
  'Rosch and colleagues (1976) asked participants to list common features. Rosch (1975) asked participants to rate how well members represented a category title.')

q(11, 'researcher', 'Which study had people list the characteristics of single objects such as chair, sofa, mirror and telephone?',
  'Rosch and Mervis (1975).',
  'Rosch (1975).',
  'Rosch and colleagues (1976).',
  'Tanaka and Taylor (1991).',
  'In Rosch and Mervis (1975), participants listed characteristics of common objects, and prototypical items shared many characteristics. In Rosch (1975), participants rated members. In Rosch and colleagues (1976), participants listed features common to a whole category.')
q(23, 'researcher', 'Which year goes with the semantic network model of Collins and Quillian?',
  '1969.',
  '1975.',
  '1976.',
  '1991.',
  'The semantic network model is Collins and Quillian (1969). Rosch and Rosch and Mervis are 1975, Rosch and colleagues is 1976, and Tanaka and Taylor is 1991.')
q(44, 'definition', 'Which approach emphasizes activity caused by the sensory and motor properties of objects?',
  'The embodied approach.',
  'The category-specific approach.',
  'The multiple-factor approach.',
  'The definitional approach.',
  'The category-specific approach emphasizes specialized brain areas and networks. The multiple-factor approach emphasizes many features and properties. The embodied approach emphasizes activity caused by the sensory and motor properties of objects.')
q(30, 'definition', 'In a connectionist network, which units are activated by stimuli from the environment?',
  'Input units.',
  'Hidden units.',
  'Output units.',
  'Connection weights.',
  'Input units are activated by stimuli from the environment. Output units receive input from hidden units.')
q(32, 'design', 'What does a connectionist network do after it is given the correct response?',
  'It modifies its weights to increase the match between its response and the correct response.',
  'It stores the correct response at one node and stops responding to the stimulus.',
  'It removes the hidden units that took part in producing the wrong guess.',
  'It repeats the same guess until the stimulus is taken away from the input units.',
  'The network responds to a stimulus, produces a guess, is provided with the correct response, and modifies its weights to increase the match between its response and the correct response.')
q(34, 'application', 'After 2,500 learning trials, how do the hidden-unit patterns for rose, daisy and canary compare?',
  'Rose and daisy have similar patterns, and canary has a different pattern.',
  'Rose and canary have similar patterns, and daisy has a different pattern.',
  'All three have the same pattern, as they did before learning began.',
  'All three have completely different patterns from one another.',
  'At 0 trials the three patterns look alike. By 2,500 trials, rose and daisy have similar patterns and canary has a different pattern.')
q(35, 'definition', 'Why can connectionist networks explain generalization of learning?',
  'The slow learning process creates a network that can handle a wide range of inputs.',
  'The fast learning process stores each input at its own separate node.',
  'The network keeps a definition for every category it has learned.',
  'The network stops changing its weights after the first learning trial.',
  'Connectionist networks can explain generalization of learning, because the slow learning process creates a network capable of handling a wide range of inputs.')
q(28, 'design', 'What evidence goes against cognitive economy in the Collins and Quillian model?',
  'People seem to store specific properties right at the node for the concept.',
  'People seem to store every property only at the highest node in the network.',
  'People take longer to verify statements that require more levels.',
  'People respond faster to related word pairs than to unrelated pairs.',
  'There is some evidence that people store specific properties of concepts right at the node for the concept, which goes against storing shared properties only at higher-level nodes.')
q(15, 'design', 'How does the exemplar approach explain Rosch’s results?',
  'Objects that are like more of the stored exemplars are classified faster.',
  'Objects that are like fewer of the stored exemplars are classified faster.',
  'Objects are compared with a definition, and typical ones match it sooner.',
  'Objects are stored at higher nodes when they are more typical.',
  'The exemplar approach can explain Rosch’s results, because objects that are like more of the exemplars are classified faster.')

q(12, 'application', 'When people list as many members of a category as they can, which members do they list first?',
  'The most prototypical members of the category.',
  'The least prototypical members of the category.',
  'The members they learned most recently.',
  'The members with the longest names.',
  'When asked to list as many objects in a category as possible, participants tend to list the most prototypical members first. This is part of the typicality effect.')
q(39, 'design', 'How well does the sensory-functional hypothesis fit the patient evidence?',
  'Some evidence supports it, but there are a number of exceptions to the pattern.',
  'All of the evidence supports it, and no exceptions have been found.',
  'None of the evidence supports it, so it was replaced by the exemplar approach.',
  'It has not been compared with any patients.',
  'Warrington and Shallice found evidence for the hypothesis, and other studies confirmed it. But there are a number of exceptions to this overall pattern.')
