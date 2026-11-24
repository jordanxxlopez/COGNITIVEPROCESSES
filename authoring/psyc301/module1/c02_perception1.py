"""Collection 02 · Perception · Part 1 (source id 5). Version 22 wording, closing points and reasoning."""
ID = 5
S = {}
def s(page, points, closing, reason=None):
    S[page] = (points, closing, reason)

s(2, ["“You have never once been in contact with the world, only with your brain’s reconstruction of it.” | What we experience is the result of the brain processing sensory information.",
      "The question is why the reconstruction is almost always right. | The answer connects the brain’s processing with regularities in the world."],
  "This matters because sensory evidence alone does not explain why perception is accurate. | Sensory evidence and knowledge of the world together help the brain choose a useful interpretation.")
s(3, ["The black and white pattern by **R. C. James** contains a **Dalmatian dog**. | At first the patches may not look like an animal.",
      "Once the dog is recognized, the patches are seen as parts of the dog and its surroundings. | The image on the retina is the same as before."],
  "This matters because the same image is experienced in two ways. | Knowing what to look for changes how the pattern is organized.")
s(4, ["**Perception** is the experience that every other cognitive process is built on. | It provides the information that attention, memory, language and reasoning use."],
  "This matters because attention, memory, language and reasoning all depend on it. | What is attended, remembered or reasoned about depends partly on how it was perceived.")
s(5, ["**Perception** is experience resulting from stimulation of the senses. | Every other kind of cognition starts from it.",
      "Four properties matter. Perceptions change when information is added. Perception involves a process much like reasoning or problem solving. Perceptions occur together with actions. Prior knowledge shapes how we resolve ambiguous stimuli."],
  "This matters because perception is not a copy of the sensory signal. | It depends on the incoming signal and on the knowledge the perceiver brings.")
s(6, ["Perception is fast and effortless, so it feels automatic. | The processing behind it is largely invisible to us.",
      "Roughly **half the primate cortex** is devoted to vision alone.",
      "**Machine perception** has repeatedly fallen short. | Machines handled chess, proofs and algebra decades before reliable object recognition. The **DARPA Urban Challenge (2007)** showed how hard it is for robot vehicles to interpret a changing environment."],
  "This matters because the ease of perception hides how difficult it is. | If perception were simple, it would have been the easy part of artificial intelligence.")
s(7, ["In **2007**, machine vision relied on hand-written rules and on combining sensors. | Vehicles finished a 60-mile urban course slowly, on a closed course.",
      "Now deep networks trained on millions of labeled images match or exceed human accuracy on benchmark object recognition.",
      "Four problems remain. They are novel viewpoints, occlusion, unusual lighting, and scenes with odd context."],
  "This matters because the gap that remains is in interpreting ambiguous input, and not just in sensing. | A system can label a thousand stop signs and still miss one with stickers on it.")
s(8, ["Building a perceiving machine is hard because of three problems. | They are **inverse projection**, **hidden or blurred objects**, and **different viewpoints**.",
      "The visual system solves these problems before we notice there was a problem."],
  "This matters because the sensory image does not identify the object that produced it. | Each problem is a kind of ambiguity.")
s(9, ["The **inverse projection problem** is the task of determining which object produced a particular image on the retina. | We start with the retinal image and work outward to its source.",
      "One image could have come from infinitely many objects. | A small object nearby and a huge object far away can produce identical retinal images."],
  "This matters because it makes perception an inference about what most likely caused the image. | The source cannot be read directly from the image.")
s(10, ["Most objects in a normal scene are partly **occluded**, which means partly hidden by other objects. People still identify them from fragments. | We also recognize objects that are blurred, poorly lit, or seen at the edge of vision.",
       "The visual system treats a partial view as a partial view, and not as a new shape.",
       "**Perceptual completion** means the visual system extends contours behind the object that hides them. | A wheelbarrow behind a wall is still seen as one wheelbarrow."],
  "This matters because the image does not label which edges belong to the same object. | The visual system has to work that out.")
s(11, ["**Viewpoint invariance** is the ability to recognize an object as the same object across changes in viewing angle. | Every rotation produces a physically different retinal image.",
       "We have never seen most objects from most angles, and we recognize them anyway. | This is difficult for machine vision and easy for young children."],
  "This matters because one object has many projections and stays the same object. | Recognition cannot depend on an exact match to one image.")
s(12, ["There are two directions of processing. | Information flows up from the receptors, which is **bottom-up**. Information flows down from what you already know, which is **top-down**.",
       "The incoming signal supplies sensory evidence. Knowledge, expectations and attention influence how that evidence is interpreted."],
  "This matters because both directions contribute to the same perception. | They are not two separate kinds of experience.")
s(13, ["**Bottom-up processing** starts at the bottom of the system, where energy from the environment stimulates the receptors. | It is also called **data-driven processing**.",
       "When a person looks at a woman named Mary, the sequence is light reflected from Mary, then an image on the retina, then signals in the optic nerve, then signals in the brain. | In general the sequence is stimulus, receptors, neural signal and representation."],
  "This matters because this chain begins with incoming evidence. | It does not require already knowing who Mary is.")
s(14, ["**Top-down processing** originates in the brain, at the top of the perceptual system. | It is also called **knowledge-driven processing**.",
       "The perceiver brings **knowledge**, which is what you already know about Mary. The perceiver brings **expectation**, which is what you predict you are about to see. The perceiver brings **attention**, which decides which features are sampled."],
  "This matters because bottom-up and top-down are two contributions to one perception. | The useful question is how much each one contributes, and when.")
s(15, ["**Direct perception theories** say that perception comes from the stimuli available in the environment. | **Gibson** emphasized the **optic array**, which is the pattern of light available to a moving observer. It specifies the layout of the scene.",
       "**Constructive perception theories** say that people actively construct perceptions using expectations. | Knowledge, experience and context do part of the work. Illusions show that what is perceived can depart from the stimulus."],
  "This matters because most current accounts take something from each. | Perception is constructive, and it is constrained by information the environment reliably provides.")
s(16, ["The **recognition-by-components theory** of **Irving Biederman (1987)** says we perceive objects by first perceiving elementary three-dimensional features. | These building blocks are called **geons**.",
       "About **36 geons** are proposed. | Three geons in the right arrangement identify most common objects.",
       "The same parts can form different objects when they are arranged differently."],
  "This matters because recognizing parts explains how a partial or new view can be recognized. | An exact match to one full image is not needed.")
s(17, ["A region taken out of a photograph and shown on its own can be hard to identify. | The patch gives only its local shape, shading and texture.",
       "Several objects can fit that limited information."],
  "This matters because it shows what the surrounding scene adds. | Putting the scene back narrows the possible objects.")
s(18, ["In the demonstration by **Torralba and Oliva**, the circled blobs are identical pixel for pixel. | They are perceived as a shoe, a car and a pedestrian.",
       "Orientation and context did the identifying, and the shape did not."],
  "This matters because it shows that **knowledge affects perception**. | The same region is given a different identity according to the scene around it.",
  "In Torralba and Oliva’s demonstration, the blobs are identical, so the three different identities come from the surrounding scene.")
s(19, ["**Speech segmentation** is the ability to tell where one word ends and the next begins. | Speech has almost no physical gaps that mark word boundaries.",
       "In “I hope it’s in my desk,” the sound has no clean gap at each word boundary. | An unfamiliar language can sound like an unbroken stream."],
  "This matters because the gaps we hear between words come from knowledge of the language. | Understanding which word you heard from context is **top-down processing**.")
s(20, ["In **spectral rotation**, the same sentence is played once rotated in frequency and once intact.",
       "In the rotated version, only the longest pauses stand out. In the intact version, the words feel separate in time.",
       "The timing of the sound is the same in both versions. | No pauses were added between words."],
  "This matters because the only difference is whether the listener can use knowledge of the language. | Linguistic knowledge contributes to hearing separate words.",
  "The timing is identical in the two versions, so the difference in hearing separate words goes with the listener’s knowledge of the language.")
s(21, ["The **direct pathway model** is an early account of pain. | In it, **nociceptors** in the skin send pain messages straight to the brain. Nociceptors are receptors that respond to damaging stimulation.",
       "A purely bottom-up account predicts that pain intensity should follow tissue damage.",
       "Expectation, attention and distraction all change how much pain is experienced. | In **Atlas and colleagues (2012)**, participants could see pain medication being delivered. Activity increased in frontal regions and decreased in areas associated with nociception."],
  "This matters because the same stimulation can produce different amounts of pain. | Pain includes top-down influences as well as the incoming signal.",
  "Identical stimulation can produce different amounts of pain, so the difference goes with what the person believes is happening.")
s(22, ["**Perception as inference** is an answer to ambiguity. | If the image is ambiguous, what is perceived has to be an inference about the most likely cause.",
       "**Helmholtz’s unconscious inference** and **Bayesian inference** describe how the inference is made."],
  "This matters because more than one source can fit the same evidence. | The system favors one interpretation and does not derive a single object from the image alone.")
s(23, ["**Helmholtz’s theory of unconscious inference (around 1860)** says that some perceptions result from unconscious assumptions we make about the environment. | It is a top-down account.",
       "The **likelihood principle** says we perceive the world in the way that is most likely, given our past experience.",
       "The inference is unconscious and involuntary. | Unconscious here means that we cannot inspect it. It is not meant in the Freudian sense."],
  "This matters because it is an answer to the inverse projection problem. | Knowing about an illusion does not necessarily switch it off.")
s(24, ["A retinal image, labeled (a), could come from two sources. | Source (b) is two overlapping rectangles. Source (c) is a rectangle and an oddly notched shape lined up exactly.",
       "Both sources fit the image. Almost everyone chooses (b)."],
  "This matters because they show the likelihood principle at work. | The notched shape needs a precise coincidence, and coincidences are rare in our experience.")
s(25, ["**Bayesian inference** makes the likelihood principle quantitative.",
       "The **prior probability** is what you believed before the stimulus arrived. | One prior is that light usually comes from above.",
       "The **likelihood** is how well each interpretation would explain the stimulus. | The **posterior** combines the prior and the likelihood into an updated interpretation. The posterior is proportional to the prior times the likelihood."],
  "This matters because it gives the three terms needed to explain an ambiguous image. | A strong prior can decide between two readings that fit the image equally well.")
s(26, ["The stimulus is a disc that is light at the top and dark at the bottom.",
       "The **likelihood** is ambiguous. | A bump lit from above and a dent lit from below produce the identical image.",
       "The **prior** favors light from above, so the **posterior** favors seeing a bump. | Turning the image upside down can turn bumps into dents."],
  "This matters because it is a worked case of prior, likelihood and posterior. | Rotation changes which reading fits the prior, and the object itself has not changed.")
s(27, ["**Perceptual organization** is the process by which the visual field is divided into objects before they are identified.",
       "The image does not label which features belong together. | The **Gestalt laws of perceptual organization** describe how the mind groups the field into units."],
  "This matters because grouping has to happen before recognition. | Objects cannot be identified until the field is divided.")
s(28, ["In **Wundt’s structuralism**, overall experience is built by combining basic elements called **sensations**. | Perception is the adding up of sensations.",
       "Movement would be built by adding up snapshots of an object in different places over time. | **Muybridge’s** sequence of still photographs shows this idea."],
  "This matters because it is the view the Gestalt psychologists rejected. | Structuralism says the whole is the parts added together.")
s(29, ["The **Gestalt psychologists (around 1912)** rejected the idea that perceptions are formed by adding up sensations. | They said the mind groups patterns according to laws of perceptual organization.",
       "In **apparent movement**, movement is perceived even though nothing physically moves through the path that is seen."],
  "This matters because the whole is different from the sum of its parts. | The seen movement is not in any of the still parts.")
s(30, ["**Good continuation** means that lines tend to be seen as following the smoothest path. | Points that connect into straight or smoothly curving lines are seen as belonging together.",
       "A contour that disappears behind an object is seen as continuing behind it."],
  "This matters because it explains how one line is followed through a crossing. | Following one cable in a tangle uses this principle.")
s(31, ["**Prägnanz**, also called **simplicity** or **good figure**, means that a pattern is organized so the result is as simple as possible.",
       "The **Olympic symbol** is seen as five overlapping circles. | It is not seen as nine irregular closed shapes fitted together, although that also fits the lines."],
  "This matters because it links Gestalt and Helmholtz. | Gestalt picks the simplest interpretation, and Helmholtz picks the most likely one.")
s(32, ["**Similarity** means that similar things appear grouped together. | In one panel all the dots are red. When the color varies, the display reorganizes into columns. The positions of the dots stay the same.",
       "Grouping can depend on color, shape, size, orientation and lightness."],
  "This matters because grouping happens before recognition. | Organization comes first, and identification comes second.")
s(33, ["In the beach scene, **good continuation** makes the horizon and waterline continue behind the person. | **Similarity** groups sand with sand, water with water and sky with sky.",
       "**Prägnanz** favors three simple horizontal bands. **Figure and ground** separates one person from the background."],
  "This matters because several principles work together in one scene. | There are more than four Gestalt laws. Common region and proximity are also present.")
s(34, ["The **Gestalt position** is that the laws are built into the visual system. | Experience plays a minor role, so the laws should be universal across cultures and present very early in life.",
       "An experience-based view is that smooth contours and similar surfaces really do tend to belong to one object. | The laws may reflect regularities the system has learned."],
  "This matters because it is a disagreement about where the laws come from. | On the experience-based view, the laws work because the environment is regular.")
s(35, ["The world is not random, and perception uses that.",
       "**Physical regularities** include common orientations and lighting. **Semantic regularities** include the objects typical of a kitchen."],
  "This matters because they make some interpretations more probable than others. | Perception uses them without a conscious decision.")
s(36, ["**Physical regularities** are regularly occurring physical properties of the environment. | Verticals and horizontals are more common than obliques. Light comes from above. Surfaces are mostly one color. Objects tend to be opaque and rigid.",
       "**Semantic regularities** are the characteristics associated with what is done in different types of scenes. | Kitchens contain stoves, kettles and sinks. Streets contain cars, signs and pedestrians."],
  "This matters because the two are easy to confuse. | Physical regularities are about how the world is put together. Semantic regularities are about what the world is used for.")
s(37, ["The **oblique effect** is that people perceive verticals and horizontals more easily than other orientations.",
       "The environment is full of verticals and horizontals, in forests and rock formations as well as in buildings.",
       "More neurons in the cortex are tuned to vertical and horizontal than to oblique orientations."],
  "This matters because one regularity shows up in the environment, in behavior and in the brain. | The neurons are tuned to what is common.")
s(38, ["The **light-from-above assumption** is that light comes from above, as it usually does. | Shading is then read as depth.",
       "Light on top and shadow below is seen as a bump. Shadow on top and light below is seen as a dent.",
       "The two panels are the same image, with one rotated 180 degrees."],
  "This matters because the same image gives opposite percepts after rotation. | The percept follows the assumed direction of light.",
  "The image is the same in both panels, so the change from bump to dent comes from the rotation.")
s(39, ["The sand sculpture can be read in two ways. | The shapes are raised out of the sand, or they are carved into it.",
       "Under the light-from-above assumption, one of the two readings is favored."],
  "This matters because it is a real photograph in which shading decides depth. | The bright and dark regions are the only cue.")
s(40, ["One image gives two incompatible percepts after one rotation. | The sand did not change. The photograph was turned and nothing else.",
       "What changed is which reading is consistent with light arriving from above."],
  "This matters because the reading is not freely chosen. | The regularity changes what is seen even when the observer knows why.")
s(41, ["A **scene schema** is knowledge of what a given kind of scene typically contains and where those things usually are. | It is built through repeated exposure to scenes of that type.",
       "Imagining a kitchen brings up a stove, a sink and cabinets.",
       "We approach a scene expecting a short list of likely objects in likely places."],
  "This matters because it narrows what an object could be. | Semantic regularities limit which objects are probable in a place.")
s(42, ["In **Palmer (1975)**, participants saw a scene and then a briefly flashed object. | Objects that fit the scene, such as a loaf of bread in a kitchen, were identified far more accurately than objects that did not fit, such as a mailbox.",
       "In **Potter (1976)**, pictures were shown in rapid succession, about an eighth of a second each. | Observers could still say whether a described scene had appeared. The gist of a scene arrives faster than its details.",
       "In **Torralba and Oliva**, identical image regions were read as a shoe, a car and a pedestrian."],
  "This matters because three experiments show the same thing. | The scene supplies a short list of probable objects, and the object is matched against that list.",
  "In Palmer (1975), the bread and the mailbox followed the same kitchen scene, so the difference in accuracy goes with whether the object fit the scene.")
s(43, ["Perceptions occur together with actions. | Perception guides what we do, and what we do changes the information available to perception.",
       "Moving around an object or reaching for it gives evidence that one still image does not."],
  "This matters because perception is not only for seeing. | We perceive in order to act, and we act in order to perceive better.")
s(44, ["We move around objects, pick them up and turn them over. | Movement helps resolve ambiguity.",
       "Near and far objects move differently across the visual field. Moving around an object reveals a hidden part.",
       "In **motion parallax**, near objects sweep past and distant objects drift slowly."],
  "This matters because it provides depth information that a single view does not. | Perceiving and acting are continuous with each other.")
s(45, ["The **ventral pathway**, or **what pathway**, runs from the occipital lobe to the temporal lobe. | It supports identifying objects. It is also called the **perception pathway**.",
       "The **dorsal pathway**, or **where or how pathway**, runs from the occipital lobe to the parietal lobe. | It supports locating objects and guiding action toward them. It is also called the **action pathway**.",
       "**Ungerleider and Mishkin (1982)** established the division with lesion work in monkeys. | **Milner and Goodale** argued that “how” fits better than “where.”"],
  "This matters because damage to one pathway can spare the function of the other. | The two streams interact, so the division is one of emphasis.")
s(46, ["**Patient D.F.** had ventral damage after carbon monoxide poisoning. | She could not report the orientation of a slot or match it with a card. She could post the card through the same slot accurately.",
       "**Mirror neurons** are premotor neurons that fire when an action is performed and when the same action is observed."],
  "This matters because her case shows that knowing what something is and acting on it are separable. | Orientation information guided her hand even when she could not use it for a judgment.",
  "For patient D.F., the slot and the card were the same in both tasks, so the difference goes with judging the orientation versus acting on it.")
s(47, ["One retinal image fits many possible scenes. | Inverse projection, occlusion and viewpoint are the reasons.",
       "Perception resolves the ambiguity with knowledge, expectation, attention and context. | Bottom-up and top-down processing both contribute.",
       "Organization comes before recognition. The priors come from the world."],
  "This matters because perception has to resolve it. | The assumptions that resolve it are useful because the environment is regular.")
s(48, ["Helmholtz’s unconscious inference and the Gestalt laws are not fundamentally incompatible. | Both are about how one interpretation is selected from many that fit the image.",
       "Helmholtz selects the most likely interpretation. The Gestalt psychologists select the simplest."],
  "This matters because in most ordinary scenes the simplest interpretation is also the most likely. | The two differ in emphasis, which is learned probabilities versus built-in principles.")
s(49, ["The reconstruction is almost always right because the world is regular, and the assumptions were built from it.",
       "Perception uses sensory evidence together with expectations suited to recurring patterns."],
  "This matters because it explains why perception is usually right. | When a display breaks the usual patterns, the same useful processes produce an illusion.")

SUBJECT = {
    2: 'The question matters',
    3: 'The Dalmatian pattern matters',
    4: 'Perception matters',
    5: 'The definition matters',
    6: 'Machine perception matters',
    7: 'The four problems matter',
    8: 'The three problems matter',
    9: 'The inverse projection problem matters',
    10: 'Occlusion matters',
    11: 'Viewpoint invariance matters',
    12: 'The two directions matter',
    13: 'Bottom-up processing matters',
    14: 'The distinction matters',
    15: 'The two theories matter',
    16: 'Geons matter',
    17: 'The isolated patch matters',
    18: 'The demonstration matters',
    19: 'Speech segmentation matters',
    20: 'Spectral rotation matters',
    21: 'The pain findings matter',
    22: 'Inference matters',
    23: 'Unconscious inference matters',
    24: 'The rectangles matter',
    25: 'Bayesian inference matters',
    26: 'The shaded disc matters',
    27: 'Perceptual organization matters',
    28: 'Structuralism matters',
    29: 'Apparent movement matters',
    30: 'Good continuation matters',
    31: 'Prägnanz matters',
    32: 'Similarity matters',
    33: 'The beach scene matters',
    34: 'The disagreement matters',
    35: 'Regularities matter',
    36: 'The two kinds of regularity matter',
    37: 'The oblique effect matters',
    38: 'The rotated image matters',
    39: 'The sand sculpture matters',
    40: 'The rotation matters',
    41: 'A scene schema matters',
    42: 'The three experiments matter',
    43: 'Action matters',
    44: 'Movement matters',
    45: 'The two pathways matter',
    46: 'Patient D.F. matters',
    47: 'The ambiguity of the image matters',
    48: 'The comparison matters',
    49: 'The regularity of the world matters',
}
