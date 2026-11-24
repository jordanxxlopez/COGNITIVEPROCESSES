"""Workspace aids for Collection 02 · Perception · Part 1 (source id 5)."""
from aids_common import Aids
A = Aids(5)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('What perception is and why it is hard', [2, 3, 4, 5, 6, 7, 8],
  'Perception is experience resulting from stimulation of the senses. It feels effortless, but machines took decades to recognize objects.')
t('Inverse projection, occlusion and viewpoint', [9, 10, 11],
  'One retinal image fits many objects, most objects are partly hidden, and every viewpoint gives a different image.')
t('Bottom-up and top-down processing', [12, 13, 14, 15, 16],
  'Bottom-up processing starts at the receptors. Top-down processing brings knowledge, expectation and attention.')
t('Context, speech and pain', [17, 18, 19, 20, 21],
  'Identical blobs are seen as a shoe, a car or a pedestrian, speech has almost no physical gaps between words, and expectation changes pain.')
t('Perception as inference', [22, 23, 24, 25, 26],
  'Helmholtz’s likelihood principle picks the most likely cause. In Bayesian inference, the posterior is proportional to the prior times the likelihood.')
t('Gestalt organization', [27, 28, 29, 30, 31, 32, 33, 34],
  'The Gestalt psychologists said the mind groups patterns by laws such as good continuation, Prägnanz and similarity.')
t('Regularities in the environment', [35, 36, 37, 38, 39, 40, 41, 42],
  'Physical regularities include verticals, horizontals and light from above. Semantic regularities are what scenes contain, as in Palmer (1975).')
t('Perception and action', [43, 44, 45, 46],
  'The ventral (what) pathway identifies objects and the dorsal (where or how) pathway guides action. D.F. could post a card she could not match.')
t('Why perception is almost always right', [47, 48, 49],
  'The world is regular, and perception’s assumptions were built from it. Helmholtz picks the most likely reading and Gestalt the simplest.')

q(2, 'What question does perception raise about the brain’s reconstruction of the world?')
q(3, 'What does the Dalmatian pattern of R. C. James show?')
q(4, 'How is perception related to the other cognitive processes?')
q(5, 'How is perception defined, and what four properties does it have?')
q(6, 'Why does perception feel automatic, and what does machine perception show?')
q(7, 'How has machine vision changed since 2007, and what problems remain?')
q(8, 'What three problems make it hard to build a perceiving machine?')
q(9, 'What is the inverse projection problem?')
q(10, 'What is occlusion, and what is perceptual completion?')
q(11, 'What is viewpoint invariance?')
q(12, 'What are the two directions of processing in perception?')
q(13, 'What is bottom-up processing?')
q(14, 'What is top-down processing, and what does the perceiver bring to it?')
q(15, 'How do direct and constructive theories of perception differ?')
q(16, 'What is Biederman’s (1987) recognition-by-components theory?')
q(17, 'Why is a patch taken out of a photograph hard to identify?')
q(18, 'What did the identical blobs of Torralba and Oliva show?')
q(19, 'What is speech segmentation, and why is it hard?')
q(20, 'What does spectral rotation show about hearing words?')
q(21, 'How do top-down influences change pain, as in Atlas and colleagues (2012)?')
q(22, 'What is perception as inference?')
q(23, 'What is Helmholtz’s theory of unconscious inference, and what is the likelihood principle?')
q(24, 'Why do almost all people see two overlapping rectangles?')
q(25, 'What are the prior, the likelihood and the posterior in Bayesian inference?')
q(26, 'Why is a disc light at the top and dark at the bottom seen as a bump?')
q(27, 'What is perceptual organization?')
q(28, 'How did structuralism explain perception?',
  note='Outside the slides, structuralism is usually credited to Titchener, Wundt’s student. The slides call it Wundt’s structuralism.')
q(29, 'What did the Gestalt psychologists reject, and what is apparent movement?')
q(30, 'What is good continuation?')
q(31, 'What is Prägnanz, and how does the Olympic symbol show it?')
q(32, 'What is the principle of similarity?')
q(33, 'Which grouping principles work together in the beach scene?')
q(34, 'Are the Gestalt laws built in or learned?')
q(35, 'What kinds of regularity does perception use?')
q(36, 'What are physical and semantic regularities?')
q(37, 'What is the oblique effect, and why might it happen?')
q(38, 'What is the light-from-above assumption?')
q(39, 'Why can the sand sculpture be read in two ways?')
q(40, 'What changes when the sand photograph is rotated?')
q(41, 'What is a scene schema?')
q(42, 'What did Palmer (1975) and Potter (1976) find about context and scenes?')
q(43, 'How are perception and action linked?')
q(44, 'How does movement help perception, and what is motion parallax?')
q(45, 'What are the ventral and dorsal pathways, and who established them?')
q(46, 'What could Patient D.F. do and not do, and what are mirror neurons?')
q(47, 'Where does perceptual accuracy come from?')
q(48, 'How do Helmholtz’s unconscious inference and the Gestalt laws compare?')
q(49, 'How does the regularity of the world explain accurate perception?')

A.relate([9, 23, 25], 'How do the likelihood principle and Bayesian inference both answer the inverse projection problem?',
         'One retinal image fits many objects. Helmholtz’s likelihood principle says we perceive the most likely cause given past experience. Bayesian inference makes this quantitative by combining the prior with the likelihood into the posterior.',
         ['In the **inverse projection problem**, one retinal image could come from infinitely many objects.',
          '**Helmholtz** said we perceive the world in the way that is **most likely**, given past experience.',
          '- **Bayesian inference** makes that quantitative. The posterior is proportional to the prior times the likelihood.'], 8.5)
A.relate([18, 42], 'Which demonstrations show that context identifies objects?',
         'In Torralba and Oliva, identical blobs were seen as a shoe, a car and a pedestrian. In Palmer (1975), objects that fit a kitchen scene were identified more accurately than objects that did not fit.',
         ['In **Torralba and Oliva**, identical image regions were read as a shoe, a car and a pedestrian.',
          'In **Palmer (1975)**, a loaf of bread after a kitchen scene was identified more accurately than a mailbox.',
          '- In both, the scene does part of the identifying.'], 8)

card('R. C. James · the Dalmatian', 'R. C. James', [3],
     'Can knowing what is in an image change what is seen?',
     'Whether the viewer has recognized the dog.',
     'What the black and white patches are seen as.',
     'Once the dog is recognized, the patches are seen as parts of the dog and its surroundings.',
     'The retinal image is the same, so the change comes from top-down knowledge.')
card('Torralba and Oliva · the same blob in different scenes', 'Torralba and Oliva', [17, 18],
     'Does shape alone identify an object?',
     'The scene and orientation around a blob that was identical pixel for pixel.',
     'What the blob was perceived as.',
     'The blob was perceived as a shoe, a car and a pedestrian.',
     'Orientation and context did the identifying, and the shape did not.')
card('Spectral rotation · hearing words', 'Spectral rotation demonstration (no researcher named)', [19, 20],
     'Do pauses in the sound separate words?',
     'Whether the same sentence was rotated in frequency or played intact.',
     'Whether words felt separate in time.',
     'In the intact version the words felt separate. In the rotated version only the longest pauses stood out.',
     'The timing was the same, so knowledge of the language creates the word boundaries.',
     trap='No pauses were added between words in the intact version.')
card('Atlas and colleagues · expectation and pain', 'Atlas and colleagues (2012)', [21],
     'Does expectation change pain?',
     'Not reported. Participants could see pain medication being delivered.',
     'Brain activity in frontal regions and in areas associated with nociception.',
     'Activity increased in frontal regions and decreased in areas associated with nociception.',
     'Pain does not follow tissue damage alone. Top-down influences change it.')
card('Overlapping rectangles · unconscious inference', 'Overlapping rectangles (no researcher named)', [24],
     'Which source do people infer for an image that fits two sources?',
     'Not reported.',
     'Which source people choose, two overlapping rectangles or a rectangle and a notched shape lined up exactly.',
     'Almost everyone chooses two overlapping rectangles.',
     'People perceive the most likely cause, which is the likelihood principle.')
card('Bumps and dents · light from above', 'Light-from-above demonstration (no researcher named)', [26, 38, 39, 40],
     'How does assumed lighting turn shading into depth?',
     'The orientation of the image, upright or rotated 180 degrees.',
     'Whether shapes are seen as bumps or dents.',
     'Light on top is seen as a bump. Turning the image upside down turns bumps into dents.',
     'The prior that light comes from above decides between readings that the image alone cannot.',
     trap='The image itself did not change, only its orientation.')
card('Gestalt apparent motion', 'Gestalt psychologists (around 1912)', [29],
     'Is perception the adding up of sensations?',
     'Not reported.',
     'Whether movement is seen where nothing physically moves.',
     'Movement is perceived through a path where nothing physically moves.',
     'The perception cannot be the sum of the sensations, so the mind organizes the pattern.')
card('Palmer · context and object identification', 'Palmer (1975)', [42],
     'Does a scene help identify an object that fits it?',
     'Whether the briefly flashed object fit the scene, such as bread in a kitchen, or did not, such as a mailbox.',
     'How accurately the object was identified.',
     'Objects that fit the scene were identified far more accurately.',
     'Scene schemas guide object recognition.')
card('Potter · rapid scene recognition', 'Potter (1976)', [42],
     'How quickly is the gist of a scene taken in?',
     'Pictures shown in rapid succession, about an eighth of a second each.',
     'Whether observers could say if a described scene had appeared.',
     'Observers could still say whether the described scene had appeared.',
     'The gist of a scene arrives faster than its details.')
card('Ungerleider and Mishkin · what and where pathways', 'Ungerleider and Mishkin (1982)', [45],
     'Are identifying objects and locating them separate?',
     'Lesions in monkeys.',
     'Not reported.',
     'The lesion work established a ventral what pathway and a dorsal where pathway.',
     'Perception and action run through partly separate pathways. Milner and Goodale argued that “how” fits better than “where.”')
card('Patient D.F. · posting a card', 'Patient D.F.', [46],
     'Can action use visual information that perception cannot report?',
     'The task, reporting or matching the slot’s orientation, or posting the card through it.',
     'Accuracy at each task.',
     'She could not report or match the orientation, but she posted the card accurately.',
     'Ventral damage spared the dorsal pathway, which guides action.',
     trap='Her damage was ventral, so the what pathway was impaired.')

contrast('Recognition by components vs context', [16, 18], 8,
         ('Recognition by components', 'Biederman’s (1987) recognition-by-components theory says objects are perceived by first perceiving about 36 three-dimensional parts called geons.'),
         ('Context in object identity', 'Context is the surrounding scene, which can decide what an object is, as when identical blobs were perceived as a shoe, a car and a pedestrian in Torralba and Oliva.'),
         'Recognition by components builds objects from their parts. The Torralba and Oliva blobs show that the parts alone can be the same while the object differs.',
         'Three geons in the right arrangement identify most common objects. The same blob becomes a shoe or a car depending on the scene.',
         'The same geons can form different objects when they are arranged differently.')
contrast('Bottom-up vs top-down processing', [12, 13, 14], 10,
         ('Bottom-up processing', 'Bottom-up processing starts at the receptors, where energy from the environment stimulates them. It is also called data-driven processing.'),
         ('Top-down processing', 'Top-down processing originates in the brain and brings knowledge, expectation and attention. It is also called knowledge-driven processing.'),
         'Bottom-up supplies the sensory evidence. Top-down influences how that evidence is interpreted.',
         'Light from Mary reaching the retina is bottom-up. Knowing what Mary looks like is top-down.',
         'Both contribute to the same experience.')
contrast('Direct vs constructive theories of perception', [15], 8.5,
         ('Direct perception', 'Direct perception theories say perception comes from the stimuli in the environment, such as Gibson’s optic array.'),
         ('Constructive perception', 'Constructive perception theories say people actively construct perceptions using expectations, knowledge and context.'),
         'Direct theories put the information in the light. Constructive theories add the perceiver’s knowledge.',
         'Illusions show that what is perceived can depart from the stimulus, which supports construction.',
         'Gibson’s optic array is the pattern of light available to a moving observer.')
contrast('Prior vs likelihood', [25, 26], 9.5,
         ('Prior probability', 'The prior is what you believed before the stimulus arrived, such as light usually coming from above.'),
         ('Likelihood', 'The likelihood is how well each interpretation would explain the stimulus.'),
         'The prior exists before the stimulus. The likelihood is about the stimulus. The posterior combines them.',
         'A bump lit from above and a dent lit from below give the same likelihood, so the prior decides.',
         'The posterior is proportional to the prior times the likelihood.')
contrast('Structuralism vs Gestalt', [28, 29], 9,
         ('Structuralism', 'In structuralism, experience is built by adding up basic elements called sensations.'),
         ('Gestalt approach', 'The Gestalt psychologists said the mind groups patterns according to laws of perceptual organization.'),
         'Structuralism adds up parts. Gestalt says the whole is organized by laws.',
         'Apparent movement is seen where nothing moves, which adding up sensations cannot explain.',
         'Muybridge’s still photographs show the structuralist idea of movement as snapshots.')
contrast('Good continuation vs Prägnanz', [30, 31], 8.5,
         ('Good continuation', 'Good continuation means lines tend to be seen as following the smoothest path.'),
         ('Prägnanz', 'Prägnanz, also called simplicity or good figure, means a pattern is organized so the result is as simple as possible.'),
         'Good continuation is about the path of each line. Prägnanz is about the simplest overall organization.',
         'A contour behind an object is seen as continuing (good continuation). The Olympic symbol is seen as five circles (Prägnanz).',
         'Similarity is a third law, grouping things that look alike. In the beach scene several principles work at once.')
contrast('Physical vs semantic regularities', [36], 9,
         ('Physical regularities', 'Physical regularities are regularly occurring physical properties of the environment, such as verticals, horizontals and light from above.'),
         ('Semantic regularities', 'Semantic regularities are the characteristics associated with what is done in different types of scenes.'),
         'Physical regularities are about the physical world. Semantic regularities are about the meaning of scenes.',
         'The oblique effect comes from a physical regularity. Kitchens containing stoves is a semantic regularity.',
         'Scene schemas are built from semantic regularities.')
contrast('Ventral vs dorsal pathway', [45, 46], 10,
         ('Ventral (what) pathway', 'The ventral pathway runs from the occipital lobe to the temporal lobe and supports identifying objects.'),
         ('Dorsal (where or how) pathway', 'The dorsal pathway runs from the occipital lobe to the parietal lobe and supports locating objects and guiding action.'),
         'The ventral pathway is for perception. The dorsal pathway is for action.',
         'D.F., with ventral damage, could not match a slot’s orientation but could post a card through it.',
         'Milner and Goodale argued that “how” fits the dorsal pathway better than “where.”')
contrast('Helmholtz vs Gestalt', [48], 8,
         ('Helmholtz’s unconscious inference', 'Helmholtz selects the most likely interpretation, given past experience.'),
         ('Gestalt laws', 'The Gestalt psychologists select the simplest interpretation.'),
         'Both choose one interpretation from many that fit the image. They differ in the rule for choosing.',
         'Two overlapping rectangles are both the most likely and the simplest reading.',
         'The two approaches are not fundamentally incompatible.')

hard('Why one retinal image is ambiguous', [9, 10, 11],
     [('In the **inverse projection problem**, one retinal image could come from infinitely many objects.', []),
      ('Objects are often **occluded**, and the visual system completes their contours behind what hides them.', []),
      ('Every viewpoint gives a different retinal image, and **viewpoint invariance** lets us recognize the object anyway.', [])])
hard('How Bayesian inference picks a bump', [25, 26],
     [('The **likelihood** is the same for a bump lit from above and a dent lit from below.', []),
      ('The **prior** says light usually comes from above.', []),
      ('The **posterior**, proportional to the prior times the likelihood, favors the bump.', ['Turning the image upside down turns bumps into dents.'])])
hard('Are the Gestalt laws built in?', [34, 35, 36],
     [('The **Gestalt position** is that the laws are built into the visual system and should be universal.', []),
      ('An experience-based view is that smooth contours and similar surfaces really do tend to belong to one object.', []),
      ('Then the laws reflect **regularities** the system has learned from the environment.', [])])
hard('What D.F. shows about two pathways', [45, 46],
     [('The **ventral pathway** identifies objects. The **dorsal pathway** guides action.', []),
      ('**Patient D.F.** had ventral damage. She could not report or match the orientation of a slot.', []),
      ('She could post a card through the slot accurately, so the dorsal pathway still guided her action.', [])])
