"""Collection 03 · Perception · Part 2 (source id 2). Version 22 wording, closing points and reasoning."""
ID = 2
S = {}
def s(page, points, closing, reason=None):
    S[page] = (points, closing, reason)

s(2, ["The **Gestalt laws of perceptual organization** include the law of **good continuation**, the law of **Prägnanz** and the law of **similarity**. | Prägnanz is also called simplicity or good figure.",
      "Gestalt psychologists claimed these laws are **intrinsic**, which means built in and not learned."],
  "This matters because it is about where grouping comes from. | Whether grouping happens is not in question.")
s(3, ["Perception is influenced by knowledge of **regularities in the environment**. This connects with Helmholtz’s **unconscious inference**. | **Physical regularities** are regularly occurring physical properties. **Semantic regularities** are characteristics associated with what is done in different types of scenes.",
      "Encoding regularities helps us infer what is in the environment when information is limited.",
      "**Ontogeny** is the development of one individual. **Phylogeny** is evolutionary history."],
  "This matters because it could be learning during development or evolution. | It could also come from both.")
s(4, ["The **oblique effect** is that people perceive verticals and horizontals more easily than other orientations.",
      "Vertical and horizontal edges are common in natural and built environments."],
  "This matters because sensitivity follows what is common in the environment. | Vertical and horizontal edges are what the visual system meets most.")
s(5, ["The **light-from-above assumption** is that light comes from above, as it usually does.",
      "We perceive shadows as information about depth and distance. | A pattern of shading can look raised or indented depending on the assumed direction of light."],
  "This matters because the image gives only shading. | The assumption selects the depth reading.")
s(6, ["The sand pattern is an example of the light-from-above assumption. | Its bright and dark regions can be seen as shapes raised out of the sand or carved into it.",
      "Turning the photograph changes which reading fits light from above."],
  "This matters because the sand itself has not changed. | Only the orientation of the photograph changed.")
s(7, ["In a photograph of a deer, the shadows help you see the deer as the foreground. | They give information about which contours appear raised.",
      "When the orientation changes, the same pattern can be organized differently into foreground and background."],
  "This matters because shading also affects which part of an image is seen as the figure. | The light-from-above assumption supports the depth reading.")
s(8, ["**Semantic regularities** are characteristics associated with the functions carried out in different types of scenes.",
      "A **scene schema** is knowledge of what a given scene ordinarily contains. | Thinking of a cognitive neuroscience classroom brings expectations about its objects and activities."],
  "This matters because the expectations come from past experience with the setting. | They narrow what an ambiguous object could be.")
s(9, ["**Palmer (1975)** asked whether context affects perception. | A scene was shown for two seconds, and then an object was shown to identify.",
      "Participants identified objects most accurately after an appropriate context. Accuracy was worst after an inappropriate context. | A kitchen is appropriate for a loaf of bread and inappropriate for a mailbox."],
  "This matters because the measure is identification accuracy. | Scene information contributed to recognizing the object.",
  "In Palmer (1975), each object was identified after a scene, and only the fit between scene and object differed, so the difference in accuracy reflects whether the scene was appropriate.")
s(10, ["The **inferential approach** combines two ideas. | One is Helmholtz’s proposal that we resolve ambiguities by the likelihood principle. The other is that regularities in the environment provide the information for resolving them.",
       "Given an image and knowledge of the regularities of the physical world, perception selects the most probable interpretation."],
  "This matters because both sources contribute. | The image limits what fits, and experience ranks the alternatives that fit.")
s(11, ["**Thomas Bayes (1701–1761)** is associated with a formal account of updating probabilities.",
       "The **prior probability** is our initial belief about the probability of an outcome. | The **likelihood** is the extent to which the evidence is consistent with each possible outcome.",
       "The updated estimate is called the **posterior probability**."],
  "This matters because each term has a separate job. | The posterior combines the prior with the support from the evidence.")
s(12, ["In Bayesian hypothesis testing, P(H|E) = P(E|H)P(H) / P(E). | H is a perceptual hypothesis and E is the image received.",
       "P(H) is the prior probability of percept H. P(E|H) is the probability of seeing image E if H is correct. P(E) is the probability of seeing E under any hypothesis.",
       "People start with a prior and use additional evidence to update it, as described by **Kording and Wolpert (2006)**."],
  "This matters because it states what the brain is proposed to do. | It picks the most probable percept given the image.")
s(13, ["A prior belief combined with the likelihood of the evidence gives a conclusion.",
       "Mary’s cough is most likely a **cold**. | Colds are common, which is a high prior. Colds reliably cause coughing, which is a high likelihood.",
       "Lung disease has a lower prior. Heartburn has a lower likelihood of causing a cough."],
  "This matters because it shows the two factors working together. | The cold is supported by both the prior and the likelihood.")
s(14, ["Four approaches to object perception are compared. | They are **Helmholtz’s unconscious inference**, the **Gestalt laws of organization**, **regularities in the environment** and **Bayesian inference**.",
       "Helmholtz, regularities and Bayesian inference all use data about the environment gathered through past experience. | **Top-down processing** is important in all three.",
       "The classical **Gestalt** position emphasizes built-in principles that can override experience."],
  "This matters because three approaches share a basis in experience and one does not. | Modern accounts propose that the laws of organization could also be shaped by experience.")
s(15, ["In the **Müller-Lyer illusion**, two central lines of equal length appear unequal because of the fins at their ends.",
       "The line with outward fins appears longer than the line with inward fins."],
  "This matters because the display is used to test whether experience changes a visual illusion. | The judgment is about the central lines and not the fins.")
s(16, ["In **Segall and colleagues (1966)**, line a had to be about one fifth longer than line b before the two were perceived as equal. | That is an adjustment of about 20 percent.",
       "**San foragers in the Kalahari** were unaffected by the illusion."],
  "This matters because the strength of the illusion differed across populations. | Experience and environment are linked to differences in perceived length.",
  "In Segall and colleagues (1966), the lines were the same for every group, so the difference in the size of the illusion goes with the population.")
s(17, ["One view is that low-level processes such as vision should not vary much across people. | This view is associated with **Fodor (1983)**.",
       "The Müller-Lyer comparison suggests that even visual perception can vary substantially across populations, as discussed by **Henrich and colleagues (2010)**.",
       "**Henrich (2008)** connects the illusion with **carpentered corners**, which are the right-angled corners of built environments."],
  "This matters because they give an experience-based reason for the illusion. | In Bayesian terms, our priors are set by experience with a particular kind of environment.")
s(18, ["**WEIRD** means Western, Educated, Industrialized, Rich and Democratic. | Much psychological research is done in these countries.",
       "**Henrich, Heine and Norenzayan (2010)** challenge generalizing from these heavily studied populations.",
       "The related **MYOPICS** critique stands for Materialist, Young, Obsessed with self, Pleasure-seeking, Isolated, Consumerist and Sedentary."],
  "This matters because who is tested affects what is found. | Sampling matters even for processes assumed to be basic.")
s(19, ["The question is whether people’s psychological repertoire is universal. | **Fodor (1983)** represents the expectation that low-level cognition such as vision varies little.",
       "**Henrich and colleagues (2010)** suggest that even visual perception can vary substantially across populations."],
  "This matters because repeated exposure to one kind of environment can shape expectations about objects and geometry. | The question is how the environment shapes perceptual processes over development.")
s(20, ["Some neurons respond best to things that occur regularly in the environment. | Horizontals and verticals are examples.",
       "The evidence comes from **single-neuron recordings** in monkey visual cortex and from brain scanning in humans.",
       "**Natural selection** favors characteristics that enhance survival and reproduction. Learning can also shape how neurons respond."],
  "This matters because it could come from evolution or from experience. | The two contributions have to be told apart.")
s(21, ["**Experience-dependent plasticity** is the mechanism through which the structure of the brain is changed by experience.",
       "**Blakemore and Cooper (1970)** reared kittens in a space containing vertical black and white stripes. | The kittens batted at a moving vertical stick and ignored horizontal sticks.",
       "Their visual cortex contained neurons that responded mainly to vertical orientations."],
  "This matters because a restricted environment changed both behavior and neural tuning. | Experience shapes what the visual system processes well.",
  "In Blakemore and Cooper (1970), the kittens were reared with vertical stripes, and their neurons responded mainly to verticals, so the tuning reflects the environment they were reared in.")
s(22, ["The **fusiform face area (FFA)** is a region in the ventral visual system that responds to faces. | Faces produce stronger activity there than comparison categories."],
  "This matters because the FFA is the region used to test the role of expertise. | The question is whether experience can change its activity.")
s(23, ["The **parahippocampal place area (PPA)** responds strongly to places and scenes. | Its preference differs from the FFA’s stronger response to faces."],
  "This matters because it is evidence for specialization within visual processing. | Faces and scenes go with different regions.")
s(24, ["Faces and places produce different response patterns in the **ventral stream**. | The FFA responds most to faces. The PPA responds most to places and scenes."],
  "This matters because both regions are part of the recognition pathway. | The kind of object perceived goes with where the response is stronger.")
s(25, ["**Gauthier and colleagues (1999)** asked whether experience-dependent plasticity plays a role in FFA activation.",
       "Participants completed four days of **Greeble** recognition training. | Greebles are a set of novel objects.",
       "After training, the FFA responded as much to Greebles as to faces."],
  "This matters because learning a new object class changed activity in a face area. | **Expertise** is a possible reason for the FFA’s response.",
  "In Gauthier and colleagues (1999), the Greebles were the same before and after, so the stronger FFA response comes from the training.")
s(26, ["In **Gauthier and colleagues (1999)**, FFA activation for Greebles rose after four days of training to the level reported for faces.",
       "This raises a question. Can a lifetime of experience with faces be what makes the FFA respond so strongly to faces?"],
  "This matters because it offers an experience-based explanation for face selectivity. | The study is an example of experience-dependent plasticity.")
s(27, ["**Gauthier and colleagues (1999)** compared responses to Greebles before and after recognition training. | That is a comparison of novices and experts.",
       "Greater expertise went with stronger activity in face-associated ventral regions."],
  "This matters because learning changed two things. | It changed how well people told the objects apart and how the brain responded to them.")
s(28, ["Movement helps us perceive things more accurately than still images do. | A horse standing still in the distance can be harder to make out than the same horse walking across a field.",
       "Walking around the horse to see it from different angles also helps."],
  "This matters because it adds evidence. | A moving object gives dynamic information, and a moving observer gets more viewpoints.")
s(29, ["Acting on the environment involves a constant stream of updated perceptions.",
       "Picking up a cup has three steps, which are perceiving the cup, reaching for it and grasping it. | Location and shape information are used as the hand approaches."],
  "This matters because perception guides the next part of an action. | The action then produces new input.")
s(30, ["Visual development may be related to manual exploration. | Some aspects of visual development may be sped up by improving infants’ ability to explore objects with their hands.",
       "**Sticky mittens** let infants contact and act on objects before they can grasp well."],
  "This matters because they connect action with visual development. | Infants see objects while touching and moving them.")
s(31, ["In **Garner interference**, participants classify stimuli on one dimension while a second, irrelevant dimension stays fixed or varies from trial to trial.",
       "For **integral dimensions**, such as brightness and saturation, irrelevant variation slows responses. | That cost is Garner interference.",
       "For **separable dimensions**, such as shape and color, there is little or no cost."],
  "This matters because perception limits what attention can select. | What counts as an object for attention is set by how perception groups features.",
  "The task was the same in both cases, so the slowing goes with whether the two dimensions are integral or separable.")
s(32, ["Two people can experience different percepts from the same stimulus. | They bring different knowledge and experience to ambiguous input.",
       "Perception depends on knowledge about the characteristics of the environment. | Experience-dependent plasticity can tune the brain to things that are likely to appear."],
  "This matters because perception is not set by the stimulus alone. | Current input, stored knowledge and the organization of the brain all shape perception.")

SUBJECT = {
    2: 'The Gestalt claim matters',
    3: 'The source of a regularity matters',
    4: 'The oblique effect matters',
    5: 'The assumption matters',
    6: 'The sand pattern matters',
    7: 'The shadows matter',
    8: 'The schema matters',
    9: 'Palmer’s result matters',
    10: 'The inferential approach matters',
    11: 'Bayes’ terms matter',
    12: 'The equation matters',
    13: 'Mary’s cough matters',
    14: 'The comparison matters',
    15: 'The illusion matters',
    16: 'The cross-cultural result matters',
    17: 'Carpentered corners matter',
    18: 'The WEIRD critique matters',
    19: 'The developmental question matters',
    20: 'Neural tuning matters',
    21: 'The kitten study matters',
    22: 'The FFA matters',
    23: 'The PPA matters',
    24: 'The two regions matter',
    25: 'Greeble training matters',
    26: 'The question matters',
    27: 'The comparison of novices and experts matters',
    28: 'Movement matters',
    29: 'The interaction matters',
    30: 'Sticky mittens matter',
    31: 'Garner interference matters',
    32: 'The difference between perceivers matters',
}
