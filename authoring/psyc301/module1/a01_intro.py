"""Workspace aids for Collection 01 · Introduction to Cognitive Psychology (source id 3)."""
from aids_common import Aids
A = Aids(3)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('What cognitive psychology studies', [2, 3, 4, 7, 8, 9, 10, 11],
  'The mind is studied as an information-processing system, with representations and processes, tested by quantifiable and repeatable measurement.')
t('Donders (1868) and reaction time', [12, 13, 14, 15, 16, 17],
  'Decision time equals choice reaction time minus simple reaction time, about 0.10 seconds in Donders (1868).')
t('Wundt, Titchener, Ebbinghaus and James', [18, 19, 20, 21],
  'Wundt (1879) used controlled self-observation, Ebbinghaus (1885/1913) measured savings, and James wrote Principles of Psychology.')
t('Watson and behaviorism', [22, 23, 24, 25, 26, 27, 28],
  'Watson replaced the mind with observable behavior. Little Albert is classical conditioning, and Skinner studied operant conditioning.')
t('Tolman (1938) and the cognitive map', [29, 30, 31],
  'From arm C the rat turned left to reach the same food, so it had learned where the food was, a cognitive map.')
t('Chomsky and the cognitive revolution', [32, 33, 34, 35, 36, 37, 38, 39, 40],
  'Chomsky (1959) showed that children produce sentences they never heard. Cherry (1953), Broadbent (1958) and the 1956 Dartmouth project followed the information-processing idea.')
t('Models and inferring cognition', [41, 42, 43, 44, 45],
  'A structural model shows parts and their organization. A process model shows operations and the flow of information.')

q(2, 'What is the information-processing perspective?')
q(3, 'What three questions separate cognitive psychology from other ways of understanding the mind?')
q(4, 'How does cognitive psychology test its claims?')
q(7, 'What would an intelligent robot need to be able to do?')
q(8, 'What does cognition include, and what do all of these abilities have in common?')
q(9, 'What is cognitive psychology, and what do everyday uses of the word “mind” refer to?')
q(10, 'What is the difference between a mental process and a representation?')
q(11, 'What makes the scientific approach to the mind different from philosophy?')
q(12, 'What did Donders (1868) want to measure, and what is reaction time?')
q(13, 'What is the difference between the simple and the choice reaction time task?')
q(14, 'What does the reaction time apparatus record?')
q(15, 'In Donders’ tasks, which part is recorded and which part is inferred?')
q(16, 'How did Donders calculate decision time, and what did he find?')
q(17, 'What did Donders (1868) show about measuring the mind, and where is his approach still used?')
q(18, 'What did Wundt (1879), Titchener and structuralism do, and what was the problem with introspection?')
q(19, 'How did Ebbinghaus (1885/1913) measure forgetting?')
q(20, 'What is savings, and what does the savings curve show?', 9)
q(21, 'What did William James contribute, and what were his observations based on?')
q(22, 'What two problems did Watson see with introspection, and what did he propose?')
q(23, 'What did Watson’s behaviorist manifesto (1913) set as the goal of psychology?')
q(24, 'How did the question psychology asks change under behaviorism?')
q(25, 'What happened in the Little Albert experiment of Watson and Rayner (1920), and what kind of conditioning is it?',
  note='Outside the slides, Albert is usually described as about eleven months old when the conditioning began. The slides give nine months.')
q(26, 'What is classical conditioning, and how did Pavlov come to study it?')
q(27, 'What is operant conditioning?')
q(28, 'What are the dates of the early history and of behaviorism?', 6)
q(29, 'What did the rats learn first in Tolman’s (1938) maze?',
  note='Outside the slides, the maze experiment is usually cited as Tolman and colleagues (1946), and the cognitive map paper as Tolman (1948). The slides date the maze to 1938.')
q(30, 'Why does changing the starting point test what the rat learned?')
q(31, 'What is a cognitive map, and why did Tolman conclude the rats had one?')
q(32, 'How did Skinner explain language learning in Verbal Behavior (1957)?')
q(33, 'What did Chomsky (1959) point out, and what did he conclude?')
q(34, 'What was the cognitive revolution?')
q(35, 'How did early digital computers shape the information-processing approach?')
q(36, 'What happened in Cherry’s (1953) dichotic listening task?')
q(37, 'What does Broadbent’s (1958) flow diagram show?')
q(38, 'What was the 1956 Dartmouth summer project, and how is artificial intelligence defined?')
q(39, 'What was the Logic Theorist of Newell and Simon?')
q(40, 'What dates belong to the cognitive revolution?', 6,
  note='Outside the slides, the first commercial digital computer, UNIVAC I, was sold in 1951. The slides give 1954.')
q(41, 'What are models, and how does a structural model differ from a process model?')
q(42, 'What do structural models represent?')
q(43, 'Why do models simplify?')
q(44, 'How is a process model drawn, and what is one example?')
q(45, 'How do researchers study cognition they cannot see?')

A.relate([16, 20],'How do Donders (1868) and Ebbinghaus (1885/1913) both turn a hidden mental event into a number?',
         'Donders subtracted simple reaction time from choice reaction time to estimate decision time. Ebbinghaus subtracted relearning time from original learning time to measure savings. Both inferred a hidden process from a measured difference.',
         ['**Donders (1868)** subtracted simple reaction time from choice reaction time to estimate decision time.',
          '**Ebbinghaus (1885/1913)** subtracted the time to relearn a list from the original learning time to get **savings**.',
          '- Both inferred a hidden mental event from a difference between measured times.'], 7.5)
A.relate([22, 31, 33], 'Which findings pushed psychology back toward the mind after behaviorism?',
         'Tolman’s rats turned left from a new starting point, which a learned “turn right” response cannot explain. Chomsky (1959) showed that children produce sentences they have never heard. Both pointed to internal representations.',
         ['In **Tolman (1938)**, the rats turned left from arm C to reach the same food, so they had a **cognitive map**.',
          '**Chomsky (1959)** pointed out that children produce sentences they have never heard and make errors that were never rewarded.',
          '- Both results need something inside the mind, a representation, and not only stimulus and response links.'], 8)

card('Donders · timing a decision', 'Donders (1868)', [12, 13, 15, 16, 17],
     'How long does it take to make a decision?',
     'Whether the task was simple reaction time (one light, one button) or choice reaction time (left or right light, matching button).',
     'Reaction time, the interval from the light to the button press.',
     'Choice reaction time was about 0.10 seconds longer than simple reaction time.',
     'The decision took about 0.10 seconds. A mental response cannot be measured directly, but it can be inferred from behavior.',
     trap='Decision time is the difference between the two tasks, not the choice reaction time itself.')
card('Ebbinghaus · relearning and savings', 'Ebbinghaus (1885/1913)', [19, 20],
     'How quickly is learned information lost over time?',
     'The retention interval, the delay between learning a list of nonsense syllables and relearning it.',
     'The time or repetitions needed to relearn the list, used to compute savings.',
     'After 19 minutes 600 seconds were saved, after one day 350 and after six days 270. Savings dropped rapidly at first and then more slowly.',
     'Forgetting is fast at first and then slows, which the savings curve shows.',
     trap='More savings means less forgetting.')
card('Watson and Rayner · Little Albert', 'Watson and Rayner (1920)', [25],
     'Can fear be conditioned?',
     'Whether the rat was paired with a loud noise.',
     'Whether the child showed fear of the rat.',
     'The rat did not cause fear at first. After the pairings, the rat alone caused fear.',
     'Fear can be learned through classical conditioning, a relationship between two stimuli.',
     trap='This is classical conditioning, not operant conditioning.')
card('Pavlov · classical conditioning', 'Pavlov', [26],
     'How does a neutral stimulus come to produce a response?',
     'Not reported.',
     'The response to the neutral stimulus alone.',
     'Conditioning came from Pavlov’s observation of anticipatory salivation, salivation before the food arrives.',
     'Pairing two stimuli can create a learned response.')
card('Skinner · consequences and behavior', 'B. F. Skinner (1940s–1960s)', [27],
     'How do consequences shape behavior?',
     'The consequence of an action, reinforcement or punishment.',
     'How likely the behavior is in the future.',
     'Not reported. Reinforcement is defined as making a behavior more likely, and punishment as making it less likely.',
     'In operant conditioning, consequences shape future behavior.')
card('Tolman · maze learning and cognitive maps', 'Tolman (1938)', [29, 30, 31],
     'Did the rats learn a response or the location of the food?',
     'The starting arm. Rats were trained from arm A and then placed in arm C.',
     'Which way the rat turned.',
     'Trained to turn right from arm A, the rat turned left from arm C and reached the same food.',
     'The rats had formed a cognitive map, a mental representation of the maze.',
     trap='A learned “turn right” response predicts a right turn from arm C. The rats turned left.')
card('Broadbent · the flow diagram of attention', 'Broadbent (1958)', [37],
     'What happens when a person attends to one stimulus?',
     'Not reported.',
     'Not reported.',
     'Broadbent drew a flow diagram in which the filter lets the attended message through to the detector and memory and blocks the unattended message.',
     'The mind can be described as stages of information processing, the idea behind the cognitive revolution.')
card('Cherry · dichotic listening', 'Cherry (1953)', [36],
     'What do people take in from a message they are not attending to?',
     'A different message was presented to each ear, and one was shadowed.',
     'What people could report from the unattended message.',
     'People reported little from the unattended message.',
     'Attention selects one message, which became a question for the information-processing approach.')
card('Newell and Simon · the Logic Theorist', 'Newell and Simon', [39],
     'Can a machine carry out problem solving?',
     'Not reported.',
     'Whether the program could prove mathematical theorems.',
     'The Logic Theorist used heuristic search to prove theorems and was demonstrated in 1956 at Dartmouth.',
     'Problem solving can be modeled as a sequence of operations a machine can carry out.')

contrast('Simple vs choice reaction time', [13, 16], 9.5,
         ('Simple reaction time', 'In the simple reaction time task, the participant pushes one button as quickly as possible after a light appears.'),
         ('Choice reaction time', 'In the choice reaction time task, the participant pushes one button for a left light and another for a right light.'),
         'The choice task adds a decision about which response is correct. The simple task has only one response.',
         'Choice reaction time was about 0.10 seconds longer, so Donders (1868) estimated the decision at about 0.10 seconds.',
         'The estimate assumes the shared steps take the same time in both tasks.')
contrast('Process vs representation', [10], 8.5,
         ('Mental process', 'A mental process, such as perception, attention or memory, uses or changes information.'),
         ('Representation', 'A representation is information about something in the world.'),
         'A representation is the information. A process is what is done with it.',
         'A cognitive map is a representation of a maze. Deciding which way to turn is a process that uses it.',
         'Some theories question whether the two can always be separated.')
contrast('Introspection vs behaviorism', [18, 22, 24], 9,
         ('Introspection', 'Analytic introspection is reporting on one’s own experience to find its basic elements, as Titchener and structuralism did.'),
         ('Behaviorism', 'Behaviorism, proposed by Watson, removes the mind as a topic and studies directly observable behavior.'),
         'Introspection studies conscious experience through self-report. Behaviorism studies only stimuli and responses that can be observed.',
         'Watson objected that introspection results varied from person to person and were hard to verify.',
         'Watson’s objection was to the evidence. Self-reports varied from person to person and were hard to verify.')
contrast('Classical vs operant conditioning', [25, 26, 27], 10,
         ('Classical conditioning', 'In classical conditioning, a neutral stimulus is paired with a stimulus that naturally produces a response, until the neutral stimulus produces the response.'),
         ('Operant conditioning', 'In operant conditioning, the consequences of an action shape future behavior through reinforcement and punishment.'),
         'Classical conditioning links two stimuli. Operant conditioning links an action to its consequence.',
         'Little Albert (Watson and Rayner, 1920) is classical conditioning. A rewarded behavior becoming more likely is operant conditioning (Skinner).',
         'Little Albert is often mistaken for operant conditioning because fear is a response, but the key relationship is between the rat and the noise.')
contrast('Response learning vs cognitive map', [29, 30, 31], 9.5,
         ('Learned response', 'A simple behaviorist account says the rat learned the response “turn right to find food.”'),
         ('Cognitive map', 'A cognitive map is a mental representation of the layout of the maze.'),
         'A learned response predicts the same turn from any arm. A map predicts the turn that reaches the food.',
         'From arm C, Tolman’s (1938) rats turned left, which only the map predicts.',
         'Turning right had been rewarded, and the rats still turned left.')
contrast('Skinner (1957) vs Chomsky (1959) on language', [32, 33], 9,
         ('Skinner, Verbal Behavior (1957)', 'Skinner argued that children learn language by imitating speech and having correct speech rewarded, through operant conditioning.'),
         ('Chomsky (1959)', 'Chomsky argued that language reflects internal cognitive structure, because children produce new sentences and new errors.'),
         'Skinner explained language with reinforcement. Chomsky said imitation and reinforcement alone cannot explain it.',
         'Children say sentences they have never heard and make errors that were never rewarded.',
         'Chomsky’s review is one of the steps of the cognitive revolution.')
contrast('Structural model vs process model', [41, 42, 44], 9,
         ('Structural model', 'A structural model represents the parts of a system and how they are organized.'),
         ('Process model', 'A process model represents operations and how information changes over time, with boxes and arrows.'),
         'A structural model shows what the parts are. A process model shows what happens to information.',
         'A brain model is structural. Input to sensory memory to short-term memory, with rehearsal, is a process model.',
         'Both are selective simplifications, not copies.')

hard('Donders’ subtraction logic', [13, 15, 16],
     [('The **simple** task has perceiving the light and pressing the button. The **choice** task adds a **decision** about which button to press.', []),
      ('Subtracting simple reaction time from choice reaction time leaves the time for the decision.', []),
      ('Choice reaction time was about **0.10 seconds** longer, so **Donders (1868)** estimated the decision at about 0.10 seconds.',
       ['The estimate assumes the shared steps take the same time in both tasks.'])])
hard('Computing savings', [20],
     [('**Savings** is the original learning time minus the relearning time.', []),
      ('With 1,000 seconds of learning, relearning after 19 minutes took 400 seconds, so **600 seconds** were saved, which is 60 percent.', []),
      ('After one day 350 seconds were saved, and after six days 270.', ['Savings drops rapidly at first and then more slowly.'])])
hard('What Tolman’s rats learned', [29, 30, 31],
     [('From arm A, the food in arm B is reached by **turning right**. From arm C, it is reached by **turning left**.', []),
      ('If the rats learned “turn right,” they should turn right from arm C. If they learned where the food is, they should turn left.', []),
      ('They turned left, so **Tolman (1938)** concluded they had a **cognitive map**.', [])])
hard('From behaviorism to the cognitive revolution', [22, 33, 34, 35],
     [('**Watson** removed the mind and studied stimuli and responses.', []),
      ('**Chomsky (1959)** showed that imitation and reinforcement alone cannot explain language.', []),
      ('In the **1950s**, psychology turned again to the operations of the mind, using the computer’s **sequence of stages** as a model.',
       ['Behavior was still the evidence.'])])
