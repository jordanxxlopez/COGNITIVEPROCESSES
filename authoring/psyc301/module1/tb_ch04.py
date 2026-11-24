"""Test Bank curation for Goldstein chapter 4 (Collections 04 and 05, source ids 7 and 4).

Source: the supplied Goldstein Cognero bank, chapter 4, all 52 multiple-choice items
(testbank-source-ch04.json). Each row: (collection id, slide), 'extra' or 'review', and an explanation.
Open-response prompts 53 to 58 are not converted into invented multiple-choice questions.
"""
HOME = 7
A1, A2 = 7, 4
CURATION = {
 1: ((A1, 3), 'Selective attention is the ability to focus on one message and ignore others. Sam attends to Susan and filters out the other conversations.'),
 2: ((A1, 4), 'Dichotic listening, used by Colin Cherry (1953), presents one message to the left ear and a different message to the right ear. It studies how attention handles competing stimuli.'),
 3: ('review', 'The bank keys dichotic listening, but repeating the attended message aloud is shadowing, which is done within a dichotic listening task. Two options are defensible, so this item is shown for review and is not scored.'),
 4: ((A1, 5), 'Listening to one voice among many is the cocktail party effect. It is focusing on one stimulus while filtering out others.'),
 5: ((A1, 5), 'In Cherry’s task, participants shadowed one message and could not report the content of the other. They could focus on one message and ignore the other.'),
 6: ((A1, 5), 'The cocktail party effect is listening to one voice among many, which is paying attention to one stimulus while filtering out others.'),
 7: ((A1, 8), 'In Broadbent’s model, the filter identifies the attended message by its physical characteristics, such as the ear, the pitch and the voice.'),
 8: ((A1, 7), 'Broadbent’s filter model is an early selection model because it filters the message before the information is analyzed for meaning, near the start of the flow.'),
 9: ((A1, 17), 'Treisman’s analysis goes from physical cues to syllable patterns, then words, grammatical structure and meaning. In the chapter, physical cues include whether a message is fast or slow. Perceptual load belongs to load theory, not to the attenuator.'),
 10: ((A1, 7), 'Broadbent’s model filters the message before it is analyzed for meaning. Sensory memory holds everything, and the filter removes the unattended message early.'),
 11: ((A1, 16), 'Treisman’s dictionary unit contains words, and each word has a threshold for being activated. Common or important words have low thresholds.'),
 12: ((A1, 13), 'Treisman’s attenuator can separate messages by physical characteristics, language or meaning. Twin sisters have similar voices and speak the same language, so only their different topics, the meaning, separate the two messages.'),
 13: ((A1, 16), 'The dictionary unit belongs to Treisman’s attenuation theory. Each word in it has a threshold for being activated.'),
 14: ((A1, 16), 'In the dictionary unit, common or important words have low thresholds and uncommon words have high thresholds. “Platypus” is the least common word.'),
 15: ((A1, 16), 'The dictionary unit is where thresholds are. Each word in it has a threshold for being activated, and the attenuator itself has none.'),
 16: ((A1, 16), 'Uncommon words have high thresholds, so a weak attenuated message cannot activate them. It takes a strong signal.'),
 17: ((A2, 11), 'Binding is the process by which features such as color, form, motion and location are combined to create the perception of a coherent object.'),
 18: ((A1, 20), 'A late selection account says all inputs receive full processing, so the meaning of the unattended commercial was analyzed and could bring the sauce to mind.'),
 19: ((A1, 25), 'A low load task uses less processing capacity. Folding towels is easy, so capacity is left for following the show.'),
 20: ((A1, 24), 'In the Stroop task, reading the word interferes with naming the ink color, because reading is automatic. People cannot ignore what the word means.'),
 21: ((A1, 24), 'Stroop interference happens when the word and the ink color conflict. Naming the ink is slowest when the color named by the word differs from the ink.'),
 22: ((A1, 24), 'In the Stroop task, participants name the ink color and try to ignore the word. Reading the word interferes when the two conflict.'),
 23: ((A1, 27), 'Overt attention shifts by moving the eyes, and an eye tracker measures saccades and fixations. Covert attention shifts with the eyes fixed.'),
 24: ((A1, 28), 'Stimulus salience is a bottom-up process that depends on the physical characteristics of the stimulus. Areas that stand out capture attention.'),
 25: ((A1, 28), 'Salient areas stand out and capture attention through physical characteristics such as color and motion, so early fixations go to high salience areas.'),
 26: ((A1, 31), 'Eye movements are influenced by the task. In meal preparation, gaze goes to the objects needed for the current or next action.'),
 27: ((A2, 8), 'Inattentional blindness is the failure to perceive an unattended stimulus, even when a person may be looking right at it.'),
 28: ((A1, 34), 'The same-object advantage shows that when attention is directed to one place on an object, its effect spreads to other places on that object.'),
 29: ((A1, 40), 'Dividing attention depends on practice, on automatic processing, and on task difficulty, because automatic processing is task dependent. Task cueing is not one of these.'),
 30: ((A1, 40), 'Automatic processing is task dependent, and a hard task may never become automatic. Driving an unfamiliar, difficult vehicle leaves less capacity for anything else.'),
 31: ((A1, 38), 'Schneider and Shiffrin (1977) suggested that practice made it possible to divide attention. After about 600 trials, the task had become automatic.'),
 32: ((A1, 27), 'Central vision is the area being looked at, and it falls on the fovea. Peripheral vision is off to the side.'),
 33: ((A1, 27), 'Fixations are short pauses on points of interest, such as a face. Saccades are the rapid eye movements between them.'),
 34: ((A1, 39), 'Automatic processing occurs without intention and uses only some cognitive resources. Close attention is what automatic processing does not need.'),
 35: ('review', 'The slides define saccades as rapid eye movements from one place to another, which matches the first option. The bank keys a reaction to physical properties of the stimulus, so this item is shown for review and is not scored.'),
 36: ((A2, 7), 'In Strayer and Johnston (2001), phone users missed twice as many red lights and braked later, with hands-free phones too. The cost comes from the conversation using attention.'),
 37: ((A2, 7), 'Strayer and Johnston (2001) found the same pattern of missed red lights and late braking with a hands-free phone as with a handheld one.'),
 38: ((A2, 9), 'Change blindness occurs when differences between two versions of a picture are not immediately apparent.'),
 39: ((A1, 29), 'A scene schema is knowledge about what is contained in typical scenes. Schemas help guide fixations from one area of a scene to another.'),
 40: ('extra', 'Mind wandering is not on the slides. In the chapter, it is thought drifting away from the current task to unrelated topics, as when Lan thinks about dinner instead of reading.'),
 41: ((A2, 13), 'In feature integration theory, the first stage is the preattentive stage, where the object is analyzed into features automatically.'),
 42: ((A2, 15), 'Illusory conjunctions are reports of combinations of features from different stimuli, such as a small red circle when red was on a triangle.'),
 43: ((A2, 11), 'Binding is the process by which color, form, motion and location are combined to create the perception of a coherent object.'),
 44: ((A2, 11), 'Binding combines features into coherent objects. Seeing the painting as complete pictures means the features have been combined.'),
 45: ((A1, 2), 'Divided attention is paying attention to more than one thing at a time, which supporters of multitasking point to. Distraction is one stimulus interfering with the processing of another, which opponents point to.'),
 46: ((A1, 15), 'Treisman’s attenuator passes the attended message at full strength and the unattended message at a much weaker strength, so it produces two levels of output.'),
 47: ('review', 'The bank keys “perceptual load is individual and processing capacity is universal.” The slides define load as the difficulty of a task and capacity as how much a person can handle, which no option states. Shown for review and not scored.'),
 48: ((A1, 28), 'Stimulus salience refers to areas that stand out and capture attention. The more salient an area, the more likely it is to be fixated.'),
 49: ((A1, 29), 'A scene schema is knowledge about what is contained in typical scenes. It depends on the individual’s knowledge more than salience or precueing do.'),
 50: ((A2, 25), 'Attention enhances neural responding. Attending to something increases the brain activity it causes, as in O’Craven and colleagues (1999).'),
 51: ((A2, 11), 'Binding is combining features into coherent objects. Seeing dots turn into recognizable flowers is features being combined into objects.'),
 52: ((A2, 14), 'In the focused attention stage of feature integration theory, the separate features are combined into one object, as the ingredients are combined into salsa.'),
}
STEMS = {29: 'The ability to divide attention depends on all of the following EXCEPT'}
OPTIONS = {}
