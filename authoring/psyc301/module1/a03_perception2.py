"""Workspace aids for Collection 03 · Perception · Part 2 (source id 2)."""
from aids_common import Aids
A = Aids(2)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('Gestalt laws and regularities', [2, 3, 4, 5, 6, 7],
  'The Gestalt laws were claimed to be intrinsic. Physical regularities include common verticals and horizontals, seen in the oblique effect, and light from above.')
t('Semantic regularities and Palmer (1975)', [8, 9],
  'After a kitchen scene, a loaf of bread was identified most accurately, and a mailbox was identified worst.')
t('The inferential approach and Bayesian inference', [10, 11, 12, 13, 14],
  'P(H|E) = P(E|H)P(H) / P(E). Mary’s cough is most likely a cold, because colds have a high prior and a high likelihood.')
t('Culture, the Müller-Lyer illusion and WEIRD samples', [15, 16, 17, 18, 19],
  'In Segall and colleagues (1966), line a had to be about one fifth longer. San foragers were unaffected. WEIRD samples may not generalize.')
t('Neural tuning and experience-dependent plasticity', [20, 21],
  'Blakemore and Cooper (1970) reared kittens with vertical stripes, and their cortex responded mainly to vertical orientations.')
t('Faces, places and Greebles', [22, 23, 24, 25, 26, 27],
  'The FFA responds to faces and the PPA to places. After four days of Greeble training, the FFA responded to Greebles as much as to faces.')
t('Movement, action and Garner interference', [28, 29, 30, 31, 32],
  'Movement and action help perception. Integral dimensions show Garner interference, and separable dimensions show little or none.')

q(2, 'What are the Gestalt laws, and what did the Gestalt psychologists claim about them?')
q(3, 'How do physical and semantic regularities influence perception?')
q(4, 'What is the oblique effect?')
q(5, 'What is the light-from-above assumption, and how does it affect shading?')
q(6, 'How does the sand pattern show the light-from-above assumption?')
q(7, 'How do shadows help organize foreground and background?')
q(8, 'What are semantic regularities, and what is a scene schema?')
q(9, 'What did Palmer (1975) find about context and identifying objects?')
q(10, 'What is the inferential approach?')
q(11, 'What are the prior, the likelihood and the posterior probability?')
q(12, 'What does Bayes’ rule say in perceptual hypothesis testing?')
q(13, 'Why is Mary’s cough most likely a cold?')
q(14, 'How do the four approaches to object perception compare?')
q(15, 'What is the Müller-Lyer illusion?')
q(16, 'What did Segall and colleagues (1966) find across cultures?')
q(17, 'What does the Müller-Lyer comparison suggest about whether vision varies across people?',
  note='Outside the slides, the carpentered-world idea is usually traced to Segall and colleagues (1966). The slides tie it to Henrich (2008).')
q(18, 'What are WEIRD samples, and what is the MYOPICS critique?')
q(19, 'Is the psychological repertoire universal?')
q(20, 'Why do some neurons respond best to horizontals and verticals?')
q(21, 'What is experience-dependent plasticity, and what did Blakemore and Cooper (1970) find?')
q(22, 'What is the fusiform face area?')
q(23, 'What is the parahippocampal place area?')
q(24, 'How do faces and places differ in the ventral stream?')
q(25, 'What did Gauthier and colleagues (1999) do with Greebles?')
q(26, 'What question does the Greeble result raise about faces?')
q(27, 'How did novices and experts differ in Gauthier and colleagues (1999)?')
q(28, 'How does movement help perception?')
q(29, 'How do perception and action interact when picking up a cup?')
q(30, 'What do sticky mittens show about visual development?')
q(31, 'What is Garner interference, and how do integral and separable dimensions differ?')
q(32, 'Why can two people perceive the same stimulus differently?')

A.relate([21, 25], 'How do Blakemore and Cooper (1970) and Gauthier and colleagues (1999) both show experience-dependent plasticity?',
         'Kittens reared with vertical stripes had cortical neurons that responded mainly to vertical orientations. After four days of Greeble training, the FFA responded to Greebles as much as to faces. In both, experience changed how the brain responds.',
         ['In **Blakemore and Cooper (1970)**, kittens reared with vertical stripes had neurons that responded mainly to vertical orientations.',
          'In **Gauthier and colleagues (1999)**, after Greeble training, the FFA responded as much to Greebles as to faces.',
          '- Both are **experience-dependent plasticity**, the brain changed by experience.'], 8.5)

card('Palmer · context and object identification', 'Palmer (1975)', [9],
     'Does context affect perception?',
     'Whether the scene shown for two seconds was an appropriate or an inappropriate context for the object.',
     'Accuracy in identifying the object.',
     'Accuracy was highest after an appropriate context and worst after an inappropriate one.',
     'Scene schemas guide object identification.',
     trap='A kitchen is appropriate for a loaf of bread and inappropriate for a mailbox.')
card('Segall and colleagues · the Müller-Lyer illusion across cultures', 'Segall and colleagues (1966)', [15, 16, 17],
     'Is the Müller-Lyer illusion the same in every population?',
     'The population tested.',
     'How much longer line a had to be before the lines were perceived as equal.',
     'Line a had to be about one fifth longer in some groups. San foragers in the Kalahari were unaffected.',
     'Even visual perception can vary across populations.')
card('Blakemore and Cooper · restricted visual experience', 'Blakemore and Cooper (1970)', [21],
     'Does visual experience shape the visual cortex?',
     'Kittens were reared in a space containing vertical black and white stripes.',
     'Behavior toward moving sticks, and the orientations that cortical neurons responded to.',
     'The kittens batted at a vertical stick and ignored horizontal sticks. Their neurons responded mainly to vertical orientations.',
     'Experience-dependent plasticity tunes the brain to what is in the environment.')
card('Gauthier and colleagues · Greeble expertise', 'Gauthier and colleagues (1999)', [25, 26, 27],
     'Does experience-dependent plasticity play a role in FFA activation?',
     'Four days of Greeble recognition training, comparing novices and experts.',
     'FFA activation to Greebles and to faces.',
     'After training, the FFA responded as much to Greebles as to faces.',
     'A lifetime of experience with faces may be what makes the FFA respond so strongly to faces.')
card('Sticky mittens · infant exploration', 'Sticky mittens (no researcher named)', [30],
     'Can manual exploration speed visual development?',
     'Not reported.',
     'Not reported.',
     'Not reported. Improving infants’ manual exploration, as sticky mittens do, may speed some aspects of visual development.',
     'Perception and action develop together.')
card('Garner interference · integral and separable dimensions', 'Garner interference (no researcher named)', [31],
     'Can people ignore one dimension while classifying another?',
     'Whether the irrelevant dimension stayed fixed or varied from trial to trial.',
     'Classification speed.',
     'Irrelevant variation slowed responses for integral dimensions such as brightness and saturation, and had little cost for separable ones such as shape and color.',
     'Integral dimensions are processed together, and separable dimensions can be attended separately.')

contrast('Physical vs semantic regularities', [3, 4, 5, 8], 9,
         ('Physical regularities', 'Physical regularities are regularly occurring physical properties of the environment, such as common verticals and horizontals and light from above.'),
         ('Semantic regularities', 'Semantic regularities are characteristics associated with the functions carried out in different types of scenes.'),
         'Physical regularities are about the physical world. Semantic regularities are about what scenes are for and what they contain.',
         'The oblique effect and the light-from-above assumption come from physical regularities. A scene schema comes from semantic regularities.',
         'Both help us infer what is in the environment when information is limited.')
contrast('Ontogeny vs phylogeny', [3], 7.5,
         ('Ontogeny', 'Ontogeny is the development of one individual.'),
         ('Phylogeny', 'Phylogeny is evolutionary history.'),
         'Ontogeny is change within a lifetime. Phylogeny is change across generations.',
         'Kittens tuned by stripes show ontogeny. Neurons shaped by natural selection show phylogeny.',
         'Both can explain why perception fits environmental regularities.')
contrast('Prior vs posterior', [11, 12, 13], 10,
         ('Prior probability', 'The prior is the initial belief about the probability of an outcome, before the evidence.'),
         ('Posterior probability', 'The posterior probability is the updated estimate after the prior is combined with the likelihood of the evidence.'),
         'The prior comes before the evidence. The posterior comes after it, updated by the likelihood.',
         'A cold has a high prior and a high likelihood for a cough. Lung disease has a lower prior. Heartburn has a lower likelihood.',
         'In P(H|E) = P(E|H)P(H) / P(E), P(H) is the prior and P(E|H) is the likelihood.')
contrast('Gestalt vs the experience-based approaches', [14], 9,
         ('Gestalt laws', 'The classical Gestalt position emphasizes built-in principles that can override experience.'),
         ('Helmholtz, regularities and Bayes', 'Helmholtz’s inference, regularities in the environment and Bayesian inference use data gathered through past experience.'),
         'Gestalt is about intrinsic laws. The other three depend on top-down use of experience.',
         'Light from above is a regularity of the environment that perception uses. Prägnanz was claimed to be built in.',
         'Top-down processing is important in Helmholtz, regularities and Bayes.')
contrast('Fodor (1983) vs Henrich and colleagues (2010)', [17, 19], 8.5,
         ('Fodor (1983)', 'Fodor represents the expectation that low-level cognition such as vision varies little across people.'),
         ('Henrich and colleagues (2010)', 'Henrich and colleagues suggest that even visual perception can vary substantially across populations.'),
         'Fodor expects universal vision. Henrich and colleagues use the Müller-Lyer data to argue it varies.',
         'San foragers were unaffected by the Müller-Lyer illusion.',
         'WEIRD samples are the populations most studied.')
contrast('FFA vs PPA', [22, 23, 24], 9,
         ('Fusiform face area (FFA)', 'The FFA is a region in the ventral visual system that responds most to faces.'),
         ('Parahippocampal place area (PPA)', 'The PPA responds most strongly to places and scenes.'),
         'Both are in the ventral stream. The FFA prefers faces and the PPA prefers places.',
         'After Greeble training, the FFA also responded to Greebles.',
         'Preference means a stronger response, not a response only to that category.')
contrast('Integral vs separable dimensions', [31], 9,
         ('Integral dimensions', 'Integral dimensions, such as brightness and saturation, cannot be attended to separately, so irrelevant variation slows responses.'),
         ('Separable dimensions', 'Separable dimensions, such as shape and color, can be attended separately, with little or no cost.'),
         'Garner interference appears for integral dimensions and not for separable ones.',
         'Classifying by brightness while saturation varies is slower. Classifying by shape while color varies is not.',
         'The cost is called Garner interference.')

hard('Using Bayes’ rule on a percept', [11, 12, 13],
     [('**P(H)** is the prior probability of a percept, before the image arrives.', []),
      ('**P(E|H)** is the likelihood, the probability of the image if the percept is correct.', []),
      ('The **posterior** P(H|E) combines them. A cold explains a cough because it is common and reliably causes coughing.', [])])
hard('Is vision the same everywhere?', [16, 17, 18],
     [('**Fodor (1983)** expected low-level vision to vary little across people.', []),
      ('In **Segall and colleagues (1966)**, San foragers were unaffected by the Müller-Lyer illusion, while other groups needed line a about one fifth longer.', []),
      ('**Henrich and colleagues (2010)** argue that findings from **WEIRD** samples may not generalize.', [])])
hard('How experience tunes the brain', [20, 21, 25],
     [('Some neurons respond best to things that occur regularly, such as verticals and horizontals.', []),
      ('Kittens reared with vertical stripes had neurons tuned to vertical orientations, in **Blakemore and Cooper (1970)**.', []),
      ('In **Gauthier and colleagues (1999)**, training made the FFA respond to Greebles as much as to faces.', [])])
