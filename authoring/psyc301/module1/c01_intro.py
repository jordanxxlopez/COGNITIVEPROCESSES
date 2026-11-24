"""Collection 01 · Introduction to Cognitive Psychology (source id 3). Version 22 wording, closing points and
reasoning sentences for the numbered note versions. Every claim stays within the existing Original and
slide-wording notes for the same page."""
ID = 3
S = {}
def s(page, points, closing, reason=None):
    S[page] = (points, closing, reason)

s(2, ["**Cognitive psychology** studies the mind by asking how information is represented and how it is changed. | This is the **information-processing perspective**.",
      "Perception, attention, memory and reasoning can each be studied this way. | A **computational** explanation also says what problem a system solves."],
  "This matters because it gives one question to ask about any mental ability, which is what the mind does with information. | Each later topic is studied through its observable effects.")
s(3, ["**Literature, philosophy and astrology** are other ways of trying to understand the mind. | They can talk about the same mind and still work in different ways.",
      "Three questions separate the approaches. They are what each one tries to explain, how it tests whether a claim is true, and how its practitioners reach agreement."],
  "This matters because the word “mind” does not make an approach scientific. | **Evidence and methods of testing** are what set cognitive psychology apart.")
s(4, ["**Cognitive psychology** tries to explain how people process information about their environment. | It also tries to explain the mechanisms involved in perceiving, acting and thinking.",
      "Claims are tested with **controlled laboratory experiments** and with **models**. | An experiment compares conditions. A simulation or statistical model turns an explanation into a prediction that can be compared with data.",
      "**Publications and replications** let other researchers check a claim. | Agreement is often incomplete."],
  "This matters because an explanation in this field has to be tied to evidence about what people do. | Researchers can agree on a result and still disagree about the best explanation.")
s(7, ["An intelligent robot would need to perceive and interpret its environment and select the relevant information. | It would also need to learn, remember, communicate, plan, decide and act safely.",
      "Uses such as **care, disaster response, logistics and assistance** need several of these abilities at once. | One correct identification is not enough."],
  "This matters because it shows how many abilities ordinary intelligent behavior needs. | These abilities have to work together.")
s(8, ["**Cognition** includes perception, attention, remembering, telling apart the items in a category, visualizing, understanding and producing language, problem solving, reasoning and decision making.",
      "All of these include **hidden processes** that we may not be aware of. | A response can feel immediate and still depend on several operations."],
  "This matters because how easy something feels does not show how it is done. | The hidden processes are what cognitive psychology tries to uncover.")
s(9, ["**Cognitive psychology** is the branch of psychology concerned with the scientific study of the mind.",
      "Everyday uses of the word “mind” point to different functions. | Calling something to mind is remembering. Putting your mind to a problem is thinking. Making up your mind is deciding.",
      "“Sound mind” refers to mental functioning, and “a brilliant mind” refers to intellectual ability."],
  "This matters because “the mind” is not one visible object. | Science turns the word into questions about particular mental processes.")
s(10, ["The mind creates and controls **mental processes** such as perception, attention, memory, emotions, language, deciding, thinking and reasoning.",
       "The mind also creates **representations** of the world so that we can act in it to reach our goals. | A representation is information about something. A process uses or changes information.",
       "Some theories question whether processes and representations can always be separated."],
  "This matters because most explanations of the mind name a representation, a process, or both. | The distinction is a starting point, and theories still debate it.")
s(11, ["Many philosophers wrote about the mind. | **Socrates** had a distinct **epistemology**, which is an approach to knowledge. **Laozi** discussed the unreliability of perception.",
       "The scientific approach uses **quantifiable, repeatable measurement**. | A claim has to be tied to observations that can be measured and made again."],
  "This matters because the questions are old and the method is what is new. | The procedures for asking questions and reaching agreement set cognitive psychology apart.")
s(12, ["**Franciscus Donders (1868)**, a Dutch physiologist, ran one of the first cognitive psychology experiments. | He wanted to measure how long it takes a person to make a decision.",
       "**Reaction time** is the interval between the presentation of a stimulus and the person’s response. | The interval includes detecting the stimulus and making the response, as well as any decision."],
  "This matters because a decision cannot be seen, but the time a response takes can be measured. | A comparison between tasks is needed to find the part that belongs to the decision.",
  "A single reaction time mixes detecting, deciding and responding, so one measurement cannot show the decision time.")
s(13, ["In the **simple reaction time task**, the participant pushes a button as quickly as possible after a light appears. | There is only one response.",
       "In the **choice reaction time task**, the participant pushes one button if the light is on the left and another if it is on the right. | The choice task adds a decision about which response is correct."],
  "This matters because the two tasks differ in one step, which is the decision. | Comparing them gives an estimate of the time that step takes.")
s(14, ["The reaction time apparatus records the interval from the stimulus to the response. | The equipment makes that interval measurable.",
       "The interval includes perceiving the light, any decision, and pressing the button. | The apparatus records the total and does not show a thought directly."],
  "This matters because one raw time cannot be divided into its parts. | **Comparing conditions** is what makes the measurement useful.")
s(15, ["In the simple task, the light flashes, the person perceives the light, and then presses the button.",
       "In the choice task, the left light flashes, the person perceives it and decides which button to push, and then presses the left button.",
       "The **behavioral response** can be recorded. The **mental response** in between is inferred."],
  "This matters because it separates what is observed from what is inferred. | The subtraction works when the two tasks share every step except the added decision.")
s(16, ["**Decision time** equals choice reaction time minus simple reaction time.",
       "Choice reaction time was about **0.10 seconds** longer than simple reaction time. | Donders concluded that the decision took about 0.10 seconds, which is 100 milliseconds.",
       "The estimate assumes that the shared steps take about the same time in both tasks."],
  "This matters because subtraction gives a way to time a mental step. | The result is an inference from two reaction times, and the decision itself was never observed.",
  "Both tasks include perceiving a light and pressing a button. Those shared steps are assumed to take about the same time, so the extra 0.10 seconds goes with the added decision.")
s(17, ["**Donders (1868)** showed that mental responses cannot be measured directly. They can be inferred from behavior. | He measured reaction times and inferred how long the added mental step took.",
       "The **subtraction approach** is still used in **neuroimaging**. | Researchers compare brain activity across conditions to estimate what an added operation contributes."],
  "This matters because the whole field uses the same logic. | Researchers measure an observable response and ask what it implies about the mind.")
s(18, ["**Wilhelm Wundt (1879)** founded the first experimental psychology laboratory in Leipzig. | He used controlled self-observation to study conscious experience.",
       "**Titchener** and **structuralism** used trained observers to describe the basic elements of experience. | **Analytic introspection** was the method of reporting on one’s own experience to find those elements.",
       "Introspection proved difficult to quantify and replicate."],
  "This matters because it shows why self-report alone could not settle scientific disagreements. | Reports varied, so different researchers could not verify the same result.")
s(19, ["**Ebbinghaus (1885/1913)** measured how quickly learned information is lost over time. | He used **nonsense syllables**, which reduce the help that familiar meanings give.",
       "He read a list aloud many times and counted the repetitions needed to repeat it without errors. After a delay, he relearned the list.",
       "Short delays meant fewer repetitions to relearn. | He used many lists and many **retention intervals**, which are the delays between learning and relearning."],
  "This matters because it was a **quantitative** method for measuring memory. | Forgetting became a number that changes with the delay.",
  "Ebbinghaus (1885/1913) learned and relearned many lists in the same way and changed the delay, so the change in relearning goes with the length of the retention interval.")
s(20, ["**Savings** equals the original time to learn the list minus the time to relearn it after a delay. | More savings means more benefit from the earlier learning.",
       "With 1,000 seconds of original learning, relearning after 19 minutes took 400 seconds, so 600 seconds were saved. | After one day, relearning took 650 seconds, so 350 seconds were saved. After six days, relearning took 730 seconds, so 270 seconds were saved.",
       "**Percent savings** is the saved time divided by the original learning time, multiplied by 100.",
       "The **savings curve** shows savings at each retention interval. | Savings drops rapidly at first and then more slowly."],
  "This matters because savings measures memory even when a person cannot immediately reproduce the list. | Faster relearning shows that some of the earlier learning remains.",
  "The original learning time was the same in each comparison, so lower savings goes with the longer delay.")
s(21, ["**William James** wrote **Principles of Psychology**. | It covered thinking, consciousness, attention, memory, perception, imagination and reasoning.",
       "James taught the first psychology course at Harvard University. | His observations were based on the functioning of his own mind and not on experiments.",
       "His brother Henry wrote psychological novels. William later studied parapsychology and tried to apply scientific methods to séances."],
  "This matters because James described many topics that the field still studies. | His method was observation of his own mind, which differs from the controlled comparisons of Donders and Ebbinghaus.")
s(22, ["**John Watson (1878–1958)** saw two problems with introspection. | Results were extremely variable from person to person. Results were also difficult to verify, because they were explained by invisible inner processes.",
       "Watson proposed **behaviorism**. | Behaviorism removes the mind as a topic of study and studies directly observable behavior.",
       "Reasoning, thinking and emotions were left out because they cannot be observed."],
  "This matters because behaviorism was a response to a real weakness in the evidence. | The aim was evidence that anyone could measure.")
s(23, ["**Watson’s behaviorist manifesto (1913)** called psychology “a purely objective experimental branch of natural science.”",
       "The goal was to **predict and control behavior** without appealing to consciousness. | Observable stimuli and responses were the basis for explanation."],
  "This matters because it states the behaviorist goal in one line. | The approach gained measurable evidence and gave up explanations that use internal mental states.")
s(24, ["Watson replaced the mind with observable behavior as the thing psychology studies.",
       "The question changed from “What does behavior tell us about the mind?” to “What is the relationship between environmental stimuli and behavior?”",
       "Both approaches can record the same action. They differ in what counts as an explanation of it."],
  "This matters because the two questions separate behaviorism from cognitive psychology. | Cognitive psychology uses behavior to infer mental operations. Behaviorism stops at the **stimulus and response relationship**.")
s(25, ["**Watson and Rayner (1920)** studied the conditioning of fear in the **Little Albert** experiment. | A nine-month-old child became frightened by a rat after a loud noise was paired with the rat.",
       "The rat did not cause this fear at first. After the pairings, the rat alone caused fear.",
       "This is **classical conditioning**, because the key relationship is between two stimuli. | It is not operant conditioning, which works through the consequences of an action."],
  "This matters because Watson used it to show that behavior can be explained without reference to the mind. | Pairing one stimulus with another changed the child’s behavior.",
  "In Watson and Rayner (1920), the rat was the same before and after, so the new fear goes with the pairing of the rat and the loud noise.")
s(26, ["In **classical conditioning**, a neutral stimulus is paired with a stimulus that naturally produces a response. | After repeated pairings, the neutral stimulus produces the response.",
       "**Pavlov** studied digestion. | Conditioning came from his observation of **anticipatory salivation**, which is salivation before the food arrives."],
  "This matters because it shows that behavior changes when the relationship between stimuli changes. | The learned response depends on one stimulus predicting another.")
s(27, ["**B. F. Skinner (1940s–1960s)** studied the relationships among situations, actions and consequences.",
       "In **operant conditioning**, consequences shape future behavior. | **Reinforcement** makes a behavior more likely. **Punishment** makes a behavior less likely."],
  "This matters because it is the second kind of conditioning, and the two are easy to confuse. | Operant conditioning is about an action and what follows it. Classical conditioning is about two stimuli.")
s(28, ["The early dates are **Donders’ reaction time work in 1868**, **Wundt’s laboratory in 1879**, **Ebbinghaus’ forgetting curve in 1885** and **James’ Principles of Psychology in 1890**.",
       "**Watson’s behaviorism** is dated **1913**, and **Skinner’s operant conditioning** is dated **1938**."],
  "This matters because the order shows the shift toward observable behavior. | The earlier experimental methods stayed useful after behaviorism became dominant.")
s(29, ["Behaviorism dominated American psychology for decades, but some researchers were not strict behaviorists. | **Tolman (1938)** trained rats to find food in a four-armed maze.",
       "First the rat explored the maze. Then it was placed in arm A with food in arm B, and it learned to **turn right** to get the food.",
       "When the rat was placed in arm C, it **turned left** and reached the same food."],
  "This matters because changing the starting point separates two things a rat could have learned. | One is a turn, and the other is a place.",
  "In Tolman (1938), the food stayed in the same arm and only the starting point changed, so the new turn goes with knowing where the food is.")
s(30, ["From arm A, a right turn reaches the food in arm B. From arm C, reaching B needs a left turn.",
       "The food location stays the same and the required turn changes. | A learned “turn right” response predicts a right turn. Knowing where the food is predicts a left turn."],
  "This matters because the two explanations predict different turns. | The rats turned left, which keeps the goal location the same.")
s(31, ["A simple behaviorist account says the rats learned “turn right to find food.” | The rats turned left from the new starting point, so that account was not supported.",
       "Tolman believed the rats had formed a **cognitive map**. | A cognitive map is a mental representation of the layout of the maze.",
       "Turning right had been rewarded, and the map still pointed to a left turn from arm C."],
  "This matters because it is evidence for an internal representation in an animal, at a time when behaviorism rejected them. | The same represented place guided a different action.")
s(32, ["In **Verbal Behavior (1957)**, **Skinner** argued that children learn language through **operant conditioning**.",
       "Children imitate the speech they hear, and correct speech is rewarded. | Rewarded forms should then become more likely."],
  "This matters because it is the behaviorist explanation of language. | The question is whether imitation and reward can explain what children actually say.")
s(33, ["**Chomsky (1959)** pointed out that children produce sentences they have never heard. | They also make new errors that were never rewarded.",
       "Imitation and reinforcement alone cannot explain language acquisition.",
       "Chomsky concluded that language reflects **internal cognitive structure**, and not only learned stimulus and response associations."],
  "This matters because it showed a limit of the stimulus and response account. | The critique does not say that experience plays no role in language.")
s(34, ["The **1950s** are recognized as the beginning of the **cognitive revolution**. | Psychology shifted from stimulus and response relationships to the operations of the mind.",
       "The aim became to explain behavior in terms of the mind. | Behavior was still the evidence, and internal processes were again something to explain."],
  "This matters because it is the change that created cognitive psychology. | Researchers could ask what happens between the stimulus and the response.")
s(35, ["Early digital computers in the 1950s processed information in a **sequence of stages**. | One example sequence is input, input processor, memory unit, arithmetic unit and output.",
       "The **information-processing approach** used this idea to build testable models of the mind.",
       "Two questions followed. How much information can the mind absorb? How does attention select some information and ignore the rest?"],
  "This matters because the computer gave psychologists a way to describe mental operations step by step. | A model with stages can be tested.")
s(36, ["In the **dichotic listening task** of **Cherry (1953)**, a different message was presented to each ear.",
       "The participant **shadowed** one message, which means repeating it aloud as it arrived. | Shadowing checked that the person was following that message.",
       "People reported little from the unattended message."],
  "This matters because the result raised the question of where selection happens. | That question led to a model of the stages a message passes through.",
  "In Cherry (1953), both messages reached the ears, so the difference in what was reported goes with which message was attended.")
s(37, ["**Broadbent (1958)** drew a **flow diagram** of what happens when a person attends to one stimulus.",
       "Sounds from the attended and unattended messages both enter the system. | The **filter** lets the attended message through and blocks the unattended message.",
       "The attended message goes on to the **detector** and then to memory."],
  "This matters because it treats the mind as a sequence of processing stages. | A flow diagram of this kind is a **process model**. It says which information should get through, so other researchers can test it.")
s(38, ["**John McCarthy and colleagues** asked whether computers could model intelligent behavior. | The **1956 Dartmouth summer project** helped establish **artificial intelligence** as a field.",
       "A working definition of artificial intelligence is making a machine behave in ways that would be called intelligent in a person.",
       "Computers became both tools and metaphors for studying cognition."],
  "This matters because it tied the study of the mind to machines that can be built and examined. | A computer can run an explicit model, and it also gives a way to think about operations on information.")
s(39, ["The **Logic Theorist** of **Newell and Simon** used **heuristic search** to prove mathematical theorems. | It was demonstrated at the 1956 Dartmouth summer project.",
       "It modeled problem solving as a sequence of operations that a machine could carry out."],
  "This matters because it made a theory of reasoning concrete enough to test. | The operations and results could be run and compared.")
s(40, ["The dates of the cognitive revolution include **Tolman’s cognitive map in 1948**, **Cherry’s attention experiment in 1953** and the first commercially available digital computer in **1954**.",
       "The **Dartmouth and MIT conferences** are dated **1956**. | They are followed by Skinner’s Verbal Behavior in 1957, Broadbent’s flow diagram in 1958, Chomsky’s review in 1959 and **Neisser’s** cognitive psychology book in **1967**.",
       "The maze experiment is dated 1938, and the cognitive map is dated 1948."],
  "This matters because several separate developments pointed the same way within a few years. | Representations, attention, computing and explicit models became one research direction.")
s(41, ["**Models** are selective representations used to explain, visualize and predict.",
       "A **structural model** represents the parts of a system and how they are organized. | A **process model** represents operations and how information changes over time."],
  "This matters because the two kinds of model answer different questions. | One shows what is there, and the other shows what it does.")
s(42, ["**Structural models** represent a physical structure. | Some copy the form of an object, such as a brain model that shows where brain structures are.",
       "Others are diagrams that do not look like the structure and show its connections."],
  "This matters because a structural model does not have to look like the real thing. | It has to keep the locations of the parts or the connections among them.")
s(43, ["Models simplify complex systems. They are not identical copies of the real thing.",
       "A model keeps the structural details that matter for a question. | Simplifying makes those structures easier to study."],
  "This matters because a model is judged by what it explains or predicts. | More detail helps only when the question needs it.")
s(44, ["In a **process model**, boxes represent processes and arrows show the flow of information.",
       "One example starts with input, then **sensory memory**, then **short-term memory**. | Short-term memory exchanges information with **long-term memory**, leads to an output, and has a **rehearsal** loop.",
       "The arrangement can generate testable predictions."],
  "This matters because a diagram of operations is a process model even when it looks nothing like a brain. | Following the arrows shows what the model says happens to information.")
s(45, ["To understand complex cognitive behavior, researchers measure observable behavior and make inferences about the cognitive activity behind it.",
       "Reaction times, accuracy and errors are measurable outcomes. | A proposed mechanism has to explain why those outcomes change across conditions."],
  "This matters because the mind is always studied indirectly. | The strongest comparisons are ones where competing explanations predict different results.")

SUBJECT = {
    2: 'The information-processing perspective matters',
    3: 'The comparison matters',
    4: 'The methods matter',
    7: 'The robot example matters',
    8: 'The hidden processes matter',
    9: 'The everyday uses matter',
    10: 'The distinction matters',
    11: 'Repeatable measurement matters',
    12: 'Reaction time matters',
    13: 'The two tasks matter',
    14: 'The total interval matters',
    15: 'The comparison matters',
    16: 'Donders’ subtraction matters',
    17: 'Donders’ inference matters',
    18: 'The failure of introspection matters',
    19: 'The relearning method matters',
    20: 'Savings matters',
    21: 'William James matters',
    22: 'Watson’s criticism matters',
    23: 'The manifesto matters',
    24: 'The change of question matters',
    25: 'The Little Albert experiment matters',
    26: 'Classical conditioning matters',
    27: 'Operant conditioning matters',
    28: 'The dates matter',
    29: 'The new starting point matters',
    30: 'The required turn matters',
    31: 'The cognitive map matters',
    32: 'Skinner’s account matters',
    33: 'Chomsky’s critique matters',
    34: 'The cognitive revolution matters',
    35: 'The computer matters',
    36: 'Cherry’s result matters',
    37: 'Broadbent’s model matters',
    38: 'Artificial intelligence matters',
    39: 'The Logic Theorist matters',
    40: 'The dates matter',
    41: 'The distinction matters',
    42: 'The diagram form matters',
    43: 'Simplification matters',
    44: 'The process model matters',
    45: 'Inference from behavior matters',
}
