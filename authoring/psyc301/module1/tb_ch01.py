"""Test Bank curation for Goldstein chapter 1 (Collection 01, source id 3).

Source: the supplied Goldstein Cognero bank, chapter 1, all 57 multiple-choice items
(testbank-source-ch01.json keeps the extracted stems, options and original keyed answers).
Each row: (collection id, slide) or 'extra' (chapter material beyond the slides) or 'review'
(source key that the slides do not settle, shown unscored), and an explanation.
Open-response prompts 58 to 62 are not converted into invented multiple-choice questions.
"""
HOME = 3
C = 3
CURATION = {
 1: ((C, 8), 'Cognition includes perception, attention, remembering, language, problem solving, reasoning and decision making. These are the mental processes the mind engages in, so together they are types of cognition.'),
 2: ((C, 9), 'Cognitive psychology is the branch of psychology concerned with the scientific study of the mind. Introspection is a method and behaviorism is the approach that set the mind aside.'),
 3: ((C, 12), 'Donders (1868) wanted to measure how long it takes a person to make a decision. The choice reaction time task added a decision about which button to press.'),
 4: ((C, 16), 'Decision time equals choice reaction time minus simple reaction time. Donders read the extra time in the choice task as the time needed to decide which response was correct.'),
 5: ((C, 12), 'The point of Donders’ experiments was to measure how long a decision takes. He compared simple and choice reaction times to estimate the time of the added decision.'),
 6: ((C, 13), 'In the simple reaction time task, the participant pushes a button as quickly as possible after a light appears. There is only one response, so no choice has to be made.'),
 7: ((C, 12), 'Reaction time is the interval between the presentation of a stimulus and the person’s response. It includes detecting the stimulus, any decision and making the response.'),
 8: ((C, 13), 'In the choice reaction time task, the participant pushes one button if the left light is on and another if the right light is on. The task adds a decision about which response is correct.'),
 9: ((C, 9), 'Putting your mind to a problem refers to thinking and problem solving. Calling something to mind is remembering, and making up your mind is deciding.'),
 10: ((C, 16), 'Choice reaction time was about 0.10 seconds longer than simple reaction time. Donders concluded that the decision took about 0.10 seconds, which is far less than one second.'),
 11: ((C, 17), 'Donders (1868) showed that mental responses cannot be measured directly. They can be inferred from behavior, such as the reaction times he measured.'),
 12: ((C, 15), 'The behavioral response can be recorded, but the mental response in between is inferred. So the relationship between the task and the mental response is not measured directly.'),
 13: ((C, 9), '“Sound mind” refers to mental functioning. Being “out of one’s mind” uses the same sense, a mind that is not functioning normally.'),
 14: ((C, 20), 'Savings dropped as the retention interval grew. After 19 minutes 600 seconds were saved, after one day 350 and after six days 270, so savings is a function of elapsed time.'),
 15: ((C, 20), 'Ebbinghaus plotted the savings curve, which shows savings at each retention interval. It was a measured function describing how memory works over time.'),
 16: ((C, 10), 'The mind creates representations of the world so that we can act in it to reach our goals. That definition stresses what the mind does for acting and surviving in the world.'),
 17: ((C, 10), 'The mind is described as creating and controlling mental processes, creating representations of the world, and solving problems, so the first three statements fit. Nothing in that description says the mind is extraordinary only when it is used for extraordinary purposes.'),
 18: ((C, 18), 'Wundt (1879) used controlled self-observation in his Leipzig laboratory. Analytic introspection, used by Titchener and structuralism, is reporting on one’s own experience to find its basic elements.'),
 19: ((C, 18), 'Analytic introspection is the method of reporting on one’s own experience under controlled conditions to find the basic elements of experience. Wundt’s laboratory used controlled self-observation.'),
 20: ((C, 9), 'Cognitive psychology is the scientific study of the mind. It studies how the mind operates by asking how information is represented and changed.'),
 21: ((C, 22), 'Watson saw two problems with introspection. Results were extremely variable from person to person, and they were hard to verify because they were explained by invisible inner processes.'),
 22: ((C, 22), 'Watson proposed behaviorism, which removes the mind as a topic of study and studies directly observable behavior.'),
 23: ((C, 18), 'Wilhelm Wundt (1879) founded the first experimental psychology laboratory in Leipzig. He used controlled self-observation to study conscious experience.'),
 24: ((C, 25), 'In Little Albert, a loud noise was paired with a rat until the rat alone caused fear. The key relationship is between two stimuli, so it is classical conditioning.'),
 25: ((C, 27), 'In operant conditioning, reinforcement makes a behavior more likely and punishment makes it less likely. Presenting a positive reinforcer increases how often the behavior occurs.'),
 26: ((C, 27), 'B. F. Skinner studied the relationships among situations, actions and consequences. In operant conditioning, consequences shape future behavior.'),
 27: ((C, 27), 'Strengthening behavior through its consequences is operant conditioning, studied by Skinner. Reinforcement makes a behavior more likely.'),
 28: ((C, 31), 'Tolman believed his rats had formed a cognitive map, a mental representation of the layout of the maze, because they turned left from a new starting point to reach the same food.'),
 29: ((C, 31), 'A cognitive map is a mental representation of the layout of a space. Tolman used it to explain why rats reached the food from a new starting arm.'),
 30: ((C, 33), 'Chomsky (1959) pointed out that children produce sentences they have never heard. He concluded that language reflects internal cognitive structure, which the bank calls an inborn biological program.'),
 31: ((C, 32), 'In Verbal Behavior (1957), Skinner argued that children learn language through operant conditioning. They imitate speech, and correct speech is rewarded.'),
 32: ('review', 'The bank keys Skinner’s Verbal Behavior, because Chomsky’s critique of that book helped bring the mind back into psychology. Tolman’s cognitive map is also tied to the mind, so this item is shown for review and is not scored.'),
 33: ((C, 35), 'The information-processing approach describes the mind as a sequence of stages, using early computers as a model. Stimulus and response relationships belong to behaviorism, not to this approach.'),
 34: ((C, 35), 'Early digital computers in the 1950s processed information in a sequence of stages. The information-processing approach used this idea to model the mind, so the cognitive revolution ran alongside computers.'),
 35: ((5, 28), 'Wundt’s structuralism says overall experience is built by combining basic elements called sensations. Analytic introspection was the method and sensations were the elements, so the approach itself was structuralism.'),
 36: ((C, 36), 'In Cherry’s (1953) dichotic listening task, people shadowed one message and reported little from the other. Nothing about deaf listeners was tested.'),
 37: ((C, 37), 'Broadbent (1958) drew a flow diagram of what happens when a person attends to one stimulus, with a filter, a detector and memory.'),
 38: ((C, 37), 'Broadbent (1958) drew the flow diagram of attention. Sounds enter, the filter passes the attended message, and it goes on to the detector and memory.'),
 39: ((C, 18), 'Analytic introspection is the method of reporting on one’s own experience, used by trained observers to find the basic elements of experience.'),
 40: ((C, 22), 'Watson objected that introspection results were hard to verify, because they were explained by invisible inner processes. They also varied from person to person.'),
 41: ((C, 38), 'John McCarthy and colleagues asked whether computers could model intelligent behavior, and their 1956 Dartmouth summer project helped establish artificial intelligence as a field. In the chapter, McCarthy is the one who coined the term.'),
 42: ((C, 39), 'The Logic Theorist of Newell and Simon used heuristic search to prove mathematical theorems. It was demonstrated at the 1956 Dartmouth summer project.'),
 43: ('extra', 'George Miller’s paper on the limits of information processing is not on the slides. It connects with the question raised on the slides of how much information the mind can absorb.'),
 44: ((C, 31), 'Tolman used the rats’ behavior, a left turn from a new arm, to infer a mental representation of the maze. Inferring the mind from behavior is what cognitive psychologists do.'),
 45: ((C, 40), 'The dates on the slides run from Tolman’s cognitive map in 1948 through the 1956 conferences and Chomsky’s 1959 review to Neisser’s book in 1967. That is about two decades, so the change was gradual and did not happen within a few years.'),
 46: ((C, 32), 'Verbal Behavior (1957) was written by B. F. Skinner. In it he argued that children learn language through operant conditioning.'),
 47: ('extra', 'Thomas Kuhn’s The Structure of Scientific Revolutions is not on the slides. The chapter uses Kuhn’s idea of a paradigm shift to describe the move from behaviorism to cognitive psychology.'),
 48: ((C, 26), 'In classical conditioning, a neutral stimulus is paired with a stimulus that naturally produces a response. After repeated pairings, the neutral stimulus produces the response.'),
 49: ((C, 31), 'A cognitive map is a mental representation of the layout of the maze. Tolman proposed it to explain how the rats reached the food from a new starting arm.'),
 50: ((C, 34), 'The 1950s are recognized as the beginning of the cognitive revolution. Psychology shifted from stimulus and response relationships to the operations of the mind.'),
 51: ('extra', 'Neuropsychology, the study of the behavior of people with brain damage, is not defined on the Collection 01 slides. It is chapter material on how cognition is related to the brain.'),
 52: ('extra', 'The date of positron emission tomography is not on the slides. In the chapter, PET was introduced in 1976 and made it possible to see which brain areas are active during cognitive activity.'),
 53: ((C, 44), 'The process model on the slides starts with input, then sensory memory, then short-term memory. Sensory memory holds incoming information for a fraction of a second.'),
 54: ('extra', 'The history of PET and fMRI is not on the slides. In the chapter, PET was followed by fMRI, which does not use radioactive tracers and gives higher resolution.'),
 55: ('extra', 'The journal NeuroImage is not on the slides. In the chapter, it was founded in 1992 as a journal devoted to brain imaging research, part of the growth of imaging in the 1990s.'),
 56: ('extra', 'Tulving’s division of long-term memory is not on the Collection 01 slides. In the chapter, episodic, semantic and procedural memory are parts of long-term memory, and short-term memory is not.'),
 57: ('extra', 'Procedural memory is not on the Collection 01 slides. In the chapter, procedural memory is the long-term memory for physical actions and skills.'),
}
STEMS = {17: 'Which of the following statements does NOT fit the description of the mind?', 34: 'Dramatic changes took place in the way psychology was studied during the “cognitive revolution.” This revolution occurred parallel to (and, in part, because of) the introduction of'}
OPTIONS = {}
