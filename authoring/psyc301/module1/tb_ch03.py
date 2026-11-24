"""Test Bank curation for Goldstein chapter 3 (Collections 02 and 03, source ids 5 and 2).

Source: the supplied Goldstein Cognero bank, chapter 3, all 50 multiple-choice items
(testbank-source-ch03.json). Each row: (collection id, slide), 'extra' (chapter material beyond the
slides) or 'review' (a source key that the slides do not settle, shown unscored), and an explanation.
Open-response prompts 43 to 47 are not converted into invented multiple-choice questions.
"""
HOME = 5
P1, P2 = 5, 2
CURATION = {
 1: ((P1, 4), 'Perception is the experience every other cognitive process is built on. It provides information for attention, memory, language and reasoning, which covers solving problems, communicating and answering questions, but not neuromodulation.'),
 2: ((P1, 4), 'Perception provides the information that memory, knowledge, language and reasoning use. Improving empathy is not one of the cognitive processes named as built on perception.'),
 3: ((P1, 9), 'The inverse projection problem is the task of determining which object produced a particular image on the retina. One image could have come from infinitely many objects.'),
 4: ((P1, 11), 'Viewpoint invariance is the ability to recognize an object as the same across changes in viewing angle. Each team member sees the box from a different angle and still recognizes it.'),
 5: ((P1, 11), 'Viewpoint invariance is the ability to recognize an object as the same object across changes in viewing angle, although each rotation produces a different retinal image.'),
 6: ((P1, 13), 'Bottom-up processing starts where energy stimulates the receptors. The sequence is light, an image on the retina, signals in the optic nerve and signals in the brain.'),
 7: ((P1, 14), 'Top-down processing originates in the brain and brings knowledge and expectation. A sentence supplies context, so knowledge of the sentence helps identify the word.'),
 8: ((P1, 14), 'Top-down processing includes expectation, which is what you predict you are about to experience. Maria expected milk, so the orange juice clashed with her expectation.'),
 9: ((P1, 14), 'Top-down processing brings knowledge and expectation to the evidence. Postal workers know what addresses usually say, which helps them read unclear writing.'),
 10: ((P1, 20), 'Hearing separate words in speech depends on knowledge of the language, because speech has almost no physical gaps between words. That is a top-down effect.'),
 11: ((P1, 19), 'Speech segmentation is the ability to tell where one word ends and the next begins. Speech has almost no physical gaps that mark word boundaries.'),
 12: ((P1, 19), 'Speech segmentation is telling where one word ends and the next begins. An unfamiliar language can sound like an unbroken stream, so Carlos could not segment English at first.'),
 13: ((P1, 14), 'Top-down processing uses knowledge and expectation to interpret the evidence. Hearing a word despite static means knowledge filled in what the signal did not supply.'),
 14: ('review', 'The bank keys “rapid processes.” Perception is fast, but the slides also say it feels automatic and effortless, which makes “mostly automatic” defensible. This item is shown for review and is not scored.'),
 15: ((P1, 23), 'Helmholtz’s theory of unconscious inference includes the likelihood principle, which says we perceive the world in the way that is most likely, given past experience.'),
 16: ((P1, 23), 'The likelihood principle says we perceive the world in the way that is most likely, given our past experience. We perceive the object most likely to have caused the image.'),
 17: ((P1, 27), 'Perceptual organization is the process by which the visual field is divided into objects. The Gestalt laws describe how the mind groups parts into units.'),
 18: ((P1, 30), 'Good continuation means lines tend to be seen as following the smoothest path. The coiled rope is seen as one continuous strand.'),
 19: ((P1, 32), 'Similarity means that similar things appear grouped together. Bands in the same uniform color are grouped, as dots of the same color group into columns.'),
 20: ((P1, 31), 'Prägnanz, also called simplicity or good figure, means a pattern is organized so the result is as simple as possible.'),
 21: ((P1, 41), 'A scene schema is knowledge of what a kind of scene typically contains and where those things are. Food carts at an altar break that knowledge.'),
 22: ((P1, 31), 'The Olympic symbol is seen as five overlapping circles and not as nine irregular shapes, because Prägnanz, or simplicity, organizes it as simply as possible.'),
 23: ((P1, 36), 'Physical regularities include verticals and horizontals being more common than obliques and light coming from above. In the chapter, a partly covered object that continues out the other side is also a physical regularity. An angled orientation is the uncommon case, not a regularity.'),
 24: ((P1, 37), 'The oblique effect is that people perceive verticals and horizontals more easily than other orientations. The environment is full of verticals and horizontals.'),
 25: ((P1, 13), 'Bottom-up processing starts at the bottom of the system, where energy from the environment stimulates the receptors.'),
 26: ((P1, 36), 'Semantic regularities are the characteristics associated with what is done in different scenes. People know more about offices and stores than about lions’ habitats or microscope views.'),
 27: ((P2, 25), 'In Gauthier and colleagues (1999), four days of Greeble training made the FFA respond to Greebles as much as to faces. That is experience-dependent plasticity.'),
 28: ('extra', 'The object discrimination problem is not described on the slides, which mention only that Ungerleider and Mishkin (1982) used lesion work in monkeys. In it, the monkey picks a previously seen object for a reward.'),
 29: ('extra', 'The landmark discrimination problem is not described on the slides. In the chapter, it depends on the dorsal where pathway, which runs to the parietal lobe, so parietal damage makes it harder.'),
 30: ((P1, 36), 'Semantic regularities are characteristics associated with what is done in different types of scenes. Semantics refers to the meaning of a scene.'),
 31: ((P1, 23), 'Helmholtz’s unconscious inference says some perceptions result from unconscious assumptions about the environment. Perceptions are the result of inferences we cannot inspect.'),
 32: ((P1, 45), 'The ventral what pathway is also called the perception pathway. The dorsal where or how pathway is also called the action pathway.'),
 33: ((P1, 5), 'Perception is experience resulting from stimulation of the senses. Feeling, hearing and seeing are senses, so they are starting points for perception. Thinking is not a sense.'),
 34: ('review', 'The bank keys “conscious” as least connected to perception, since much of perceptual processing is unconscious. The other words are loose fits too, so this item is shown for review and is not scored.'),
 35: ('review', 'The bank keys “interpret.” The slides describe perception as inference about the most likely cause, which makes “infer” defensible. This item is shown for review and is not scored.'),
 36: ((P1, 12), 'Bottom-up information flows up from the receptors. Top-down information flows down from what you already know. They differ in the source of information.'),
 37: ('extra', 'Transitional probabilities are not on the slides. In the chapter, knowing which sounds tend to follow others lets listeners anticipate what comes next, which helps segment speech.'),
 38: ('review', 'The bank links the saying to the likelihood principle, perceiving what is most likely from past experience. The link is loose, so this item is shown for review and is not scored.'),
 39: ('review', 'The bank keys the whole cake, reflecting the Gestalt idea that the whole differs from its parts. The item is a loose analogy, so it is shown for review and is not scored.'),
 40: ('review', 'The bank keys a shopping mall. The slides define semantic regularities as what is typically done and found in a type of scene, but they do not rank scenes by how many regularities they have, so this item is shown for review and is not scored.'),
 41: ('review', 'The bank keys “beliefs,” because Bayesian inference combines prior beliefs with the likelihood. The wording “Bayesian influence” is unclear, so this item is shown for review and is not scored.'),
 42: ((P1, 45), 'The dorsal pathway runs from the occipital to the parietal lobe. It is the where or how pathway and is also called the action pathway.'),
 48: ((P1, 23), 'Helmholtz’s unconscious inference says perceptions come from assumptions about the environment. Seeing a covered car as continuing beneath the cover is such an assumption, as with perceptual completion.'),
 49: ((P1, 29), 'In apparent movement, movement is perceived even though nothing physically moves through the path that is seen. The perceptual system creates the movement from stationary flashes.'),
 50: ((P1, 29), 'The Gestalt psychologists rejected the idea that perceptions are formed by adding up sensations. The whole is different from the sum of its parts.'),
 51: ((P1, 36), 'Physical regularities are regularly occurring physical properties of the environment. Verticals and horizontals are more common than obliques.'),
 52: ('review', 'The bank keys “meaning between properties of an object.” The slides define semantic regularities as characteristics associated with what is done in different scenes, which no option states. Shown for review and not scored.'),
 53: ((P1, 41), 'A scene schema is knowledge of what a given kind of scene typically contains and where those things usually are. It is built through repeated exposure.'),
 54: ((P2, 11), 'In Bayesian inference, the prior probability is combined with the likelihood to give the posterior probability, the updated estimate of an outcome.'),
 55: ((P2, 14), 'The classical Gestalt position emphasizes built-in principles that can override experience. Helmholtz, regularities and Bayesian inference rely on experience and top-down processing.'),
}
STEMS = {1: 'Perception goes beyond the simple receipt of sensory information. It is involved in many different cognitive skills. Which of the following is NOT one of those skills?',
         22: 'In the Olympic Rings example, which Gestalt law contributes to the correct perception of five interlocking circles rather than nine separate segments?',
         23: 'Which of the following is NOT an example of a physical regularity?',
         26: 'A demonstration asks you to visualize scenes such as an office, a department store clothing section, a lion, and a microscope. It often results in more details in the scene of the office or department store than the scene with the lion or microscope. The latter two tend to have fewer details because most individuals from modern society have less knowledge of _____ in those scenes.'}
OPTIONS = {23: {0: 'Verticals and horizontals being more common than obliques'}}
