"""Workspace aids for Collection 04 · Attention · Part 1 (source id 7)."""
from aids_common import Aids
A = Aids(7)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('Types of attention and dichotic listening', [2, 3, 4, 5],
  'In Cherry (1953), people shadowed one ear and could not report the content of the other, but knew the speaker’s gender and noticed a change in gender or to a tone.')
t('Broadbent’s filter model (1958)', [6, 7, 8, 9, 10, 11],
  'The stages are sensory memory, filter, detector and short-term memory. The filter selects by physical characteristics before meaning.')
t('Evidence against a strict filter', [12],
  'In Moray (1959) about one third heard their own name. In Gray and Wedderburn (1960) people reported “Dear Aunt Jane.”')
t('Treisman’s attenuation theory (1964)', [13, 14, 15, 16, 17],
  'The attenuator weakens the unattended message. Words with low thresholds, such as your name, can still be activated.')
t('Late selection and MacKay (1973)', [18, 19, 20, 21, 22],
  '“River” or “money” in the unattended ear shifted the meaning chosen for “bank,” although people were unaware of the word.')
t('Automatic processing and load theory', [23, 24, 25, 26],
  'In the Stroop task, reading the word interferes with naming the ink color. In Forster and Lavie (2008), distraction was stronger in easier tasks.')
t('Eye movements: salience, schemas and tasks', [27, 28, 29, 30, 31],
  'Overt attention moves the eyes. Salience is bottom-up, and scene schemas and task demands are top-down.')
t('Covert attention: Posner and Egly', [32, 33, 34, 35],
  'In Posner and colleagues (1978), responses were faster after a valid cue. In Egly and colleagues (1994), responses were faster on the same object.')
t('Practice and automaticity: Schneider and Shiffrin (1977)', [36, 37, 38, 39, 40],
  'After about 600 trials the task became automatic. Automatic processing is task dependent.')

q(2, 'What is attention, and what are selective attention, divided attention, distraction and attentional capture?')
q(3, 'What is selective attention?')
q(4, 'What is dichotic listening, and why do participants shadow?')
q(5, 'What could participants report about the unattended message in Cherry’s (1953) task?')
q(6, 'Where do the three selection models put the filter?')
q(7, 'What does sensory memory do in Broadbent’s filter model?')
q(8, 'How does Broadbent’s filter choose the attended message?')
q(9, 'What does Broadbent’s detector do?')
q(10, 'What does short-term memory do in Broadbent’s model?')
q(11, 'Why is Broadbent’s model called a bottleneck model?')
q(12, 'What evidence goes against a strict early filter?',
  note='Outside the slides, the usual textbook version of “Dear Aunt Jane” uses different digits, and participants shadow the other ear. The slides give the left ear “Dear, 4, Jane” and have the right ear (“8, Aunt, 2”) shadowed.')
q(13, 'What is Treisman’s attenuation theory?')
q(14, 'What happens to the attended message in Treisman’s theory?')
q(15, 'What happens to the unattended message in Treisman’s theory?')
q(16, 'What is the dictionary unit, and why does your own name get through?')
q(17, 'In what order does Treisman’s analysis proceed?')
q(18, 'What is a late selection model, and what did MacKay (1973) present?')
q(19, 'What did MacKay (1973) find?')
q(20, 'What does a late selection account say about processing?')
q(21, 'How do Broadbent (1958), Treisman (1964) and late selection compare?')
q(22, 'How was the early versus late selection debate resolved?')
q(23, 'What are automatic processes, and how do they show up in visual search?')
q(24, 'How does the Stroop task show that automatic processes can interfere?')
q(25, 'What do processing capacity and perceptual load mean in load theory?')
q(26, 'What did Forster and Lavie (2008) find?')
q(27, 'What are overt and covert attention, saccades and fixations?')
q(28, 'What is stimulus salience?')
q(29, 'What top-down factors guide eye movements?')
q(30, 'What did Võ and Henderson (2009) compare?')
q(31, 'How do task demands affect eye movements?')
q(32, 'What is precueing?')
q(33, 'What are valid and invalid cues, and what did Posner and colleagues (1978) find?')
q(34, 'What is the same-object advantage, and how did Egly and colleagues (1994) test it?')
q(35, 'How do object boundaries change the same-object advantage?')
q(36, 'What did Schneider and Shiffrin (1977) ask participants to do?')
q(37, 'What happened on each trial of Schneider and Shiffrin’s task?')
q(38, 'What changed with practice in Schneider and Shiffrin (1977)?')
q(39, 'What is automatic processing?')
q(40, 'What are the limits of automatic processing?')

A.relate([12, 16, 19], 'Which results show that unattended messages are processed for meaning?',
         'In Moray (1959) about one third of listeners heard their own name. In Gray and Wedderburn (1960) people reported “Dear Aunt Jane” across ears. In MacKay (1973) an unattended word shifted the meaning of “bank.”',
         ['In **Moray (1959)**, about one third detected their own name in the unattended ear.',
          'In **Gray and Wedderburn (1960)**, participants reported “Dear Aunt Jane,” following meaning across ears.',
          'In **MacKay (1973)**, “river” or “money” shifted the meaning chosen for “bank.”',
          '- Each goes against a strict filter that blocks meaning.'], 9)

card('Cherry · dichotic listening', 'Colin Cherry (1953)', [4, 5],
     'What is taken in from an unattended message?',
     'A different message in each ear, with one message shadowed.',
     'What participants could report about the unattended message.',
     'They could not report its content, but knew there was a message and the speaker’s gender. A change in gender or a tone was noticed.',
     'Attention selects one message, and physical features of the other still get through.')
card('Moray · your own name', 'Moray (1959)', [12],
     'Can meaningful words get through the unattended ear?',
     'The participant’s own name was presented in the unattended ear.',
     'Whether listeners detected their name.',
     'About one third of listeners detected their own name.',
     'A strict filter cannot explain this, since a name needs meaning to be recognized.')
card('Gray and Wedderburn · Dear Aunt Jane', 'Gray and Wedderburn (1960)', [12],
     'Do people follow meaning or ears?',
     'Words and digits split between the ears so that the meaningful phrase switched ears.',
     'What participants reported.',
     'Participants reported “Dear Aunt Jane.”',
     'Selection can follow meaning, which a filter based on physical features cannot do.')
card('MacKay · the meaning of an unattended word', 'MacKay (1973)', [18, 19],
     'Is an unattended word processed for meaning?',
     'Whether the unattended ear received “river” or “money” while the attended ear heard “They were throwing stones at the bank.”',
     'Which test sentence participants chose as closest in meaning.',
     '“River” favored the river sentence and “money” the financial sentence, although participants were unaware of the words.',
     'The unattended word was processed for meaning, which supports late selection.',
     trap='The biasing word was in the unattended ear, and participants did not know it had been presented.')
card('Stroop task · automatic processing', 'Stroop task (no researcher named)', [23, 24],
     'Do automatic processes need attention, and can they interfere?',
     'Whether the word and the ink color conflicted.',
     'Time to name the ink color.',
     'Reading the word interfered with naming the ink color when they conflicted.',
     'Automatic processes do not demand attentional control, but they can interfere with processes that do.')
card('Forster and Lavie · perceptual load', 'Forster and Lavie (2008)', [25, 26],
     'Does perceptual load change distraction?',
     'Task difficulty (perceptual load) and the presence of a task-irrelevant stimulus.',
     'Response time.',
     'The irrelevant stimulus slowed responses, more in easier tasks than in harder ones.',
     'A hard task leaves less capacity for irrelevant stimuli.',
     trap='Distraction is stronger in the easier, low load task.')
card('Võ and Henderson · scene consistency', 'Võ and Henderson (2009)', [30],
     'Do people look differently at objects that do not belong in a scene?',
     'Whether the object was semantically consistent or inconsistent with the scene.',
     'How people viewed the objects.',
     'An object that does not belong was viewed differently from one that fits.',
     'Scene schemas guide where and how long we look.')
card('Posner · valid and invalid cues', 'Posner and colleagues (1978)', [32, 33],
     'Can attention move without moving the eyes?',
     'Whether the cue was valid (pointing to where the target appeared) or invalid.',
     'Response time to the target, with eyes fixed.',
     'Responses were faster after a valid cue than after an invalid cue.',
     'Covert attention can be directed to a location.')
card('Egly and colleagues · the same-object advantage', 'Egly and colleagues (1994)', [34, 35],
     'Does attention spread within an object?',
     'Whether the target appeared at the cued position, elsewhere on the same object, or on a different object at the same distance.',
     'Response time.',
     'Responses were faster at the uncued position on the same object than on the other object.',
     'Attention can be directed to objects, not only locations.',
     trap='The two uncued positions were the same distance from the cue.')
card('Schneider and Shiffrin · practice and automaticity', 'Schneider and Shiffrin (1977)', [36, 37, 38, 39],
     'Can practice make it possible to divide attention?',
     'Memory set size (one to four targets) and amount of practice.',
     'Whether a target appeared among 20 rapidly presented test frames.',
     'After about 600 trials, the task had become automatic.',
     'Practice made divided attention possible through automatic processing.')

contrast('Selective vs divided attention', [2, 3], 8.5,
         ('Selective attention', 'Selective attention is attending to one thing while ignoring others.'),
         ('Divided attention', 'Divided attention is paying attention to more than one thing at a time.'),
         'Selective attention picks one. Divided attention spreads across several.',
         'Shadowing one ear is selective. Schneider and Shiffrin’s memory and monitoring task is divided.',
         'Shadowing is selective attention even though both ears receive a message.')
contrast('Broadbent vs Treisman', [8, 13, 21], 10,
         ('Broadbent’s filter model (1958)', 'Broadbent’s filter is early. It passes only the attended message, selected by physical features, before meaning is analyzed.'),
         ('Treisman’s attenuation theory (1964)', 'Treisman’s attenuator weakens the unattended message without removing it, so low threshold words can be activated.'),
         'Broadbent blocks the unattended message. Treisman weakens it.',
         'Hearing your own name in the unattended ear fits Treisman and not Broadbent.',
         'Treisman’s attenuator analyzes physical characteristics, language and meaning.')
contrast('Early vs late selection', [6, 21, 22], 9.5,
         ('Early selection', 'In early selection, the message is filtered before it is analyzed for meaning (Broadbent, 1958).'),
         ('Late selection', 'In late selection, selection occurs after information is analyzed for meaning (Deutsch and Deutsch, 1963, MacKay, 1973).'),
         'The difference is whether meaning is analyzed before or after selection.',
         'MacKay’s “river” and “money” result supports late selection.',
         'There is no single answer. Each can be shown under some conditions.')
contrast('Overt vs covert attention', [27, 32], 9,
         ('Overt attention', 'Overt attention shifts by moving the eyes, through saccades and fixations.'),
         ('Covert attention', 'Covert attention shifts while the eyes stay fixed.'),
         'Overt attention moves the eyes. Covert attention moves without them.',
         'An eye tracker measures overt attention. Posner’s precueing shows covert attention.',
         'Posner’s participants kept their eyes fixed, so faster responses show covert attention.')
contrast('Bottom-up salience vs top-down guidance', [28, 29, 31], 9,
         ('Stimulus salience', 'Stimulus salience is a bottom-up process that depends on physical characteristics such as color and motion.'),
         ('Top-down guidance', 'Top-down guidance comes from cognitive factors, scene schemas and task demands.'),
         'Salience comes from the stimulus. Top-down guidance comes from knowledge and goals.',
         'A bright color captures gaze. In meal preparation, gaze goes to the next object needed.',
         'Attentional capture is an involuntary shift due to salience.')
contrast('Location-based vs object-based attention', [33, 34], 8.5,
         ('Location-based attention', 'Location-based attention is attention directed to a place, shown when a valid cue sped responses there in Posner and colleagues (1978).'),
         ('Object-based attention', 'Object-based attention is attention directed to an object, so its effect spreads to other places on that object, as in Egly and colleagues (1994).'),
         'Posner shows attention to a place. Egly shows attention to an object.',
         'Position C on the same object was faster than B on another object at the same distance.',
         'Both are covert, with the eyes fixed.')
contrast('Automatic vs controlled processing', [23, 24, 39, 40], 8.5,
         ('Automatic processing', 'Automatic processing occurs without intention and uses only some cognitive resources.'),
         ('Controlled processing', 'Controlled processing demands attentional control.'),
         'Automatic processes do not need attention but can interfere with controlled ones.',
         'Reading in the Stroop task is automatic and interferes with naming ink color.',
         'Automatic processing is task dependent.')

hard('Three places to put the filter', [6, 13, 18, 21],
     [('In **Broadbent (1958)**, the filter is early and passes only the attended message, selected by physical features.', []),
      ('In **Treisman (1964)**, the attenuator weakens the unattended message, and words with low thresholds can still be activated.', []),
      ('In **late selection** (Deutsch and Deutsch, 1963, MacKay, 1973), everything is analyzed for meaning before selection controls response and awareness.', [])])
hard('Why your name gets through', [15, 16],
     [('In Treisman’s theory, the unattended message is **attenuated**, not shut off.', []),
      ('Each word in the **dictionary unit** has a **threshold**. Important words have low thresholds.', []),
      ('Your own name has a low threshold, so a weak message can still activate it.', [])])
hard('Load theory', [25, 26],
     [('**Perceptual load** is the difficulty of a task. **Processing capacity** is how much a person can handle.', []),
      ('A low load task leaves spare capacity, so irrelevant stimuli are processed and interfere.', []),
      ('In **Forster and Lavie (2008)**, distraction was stronger for easier tasks.', [])])
hard('The same-object advantage', [34, 35],
     [('A cue appears at position A on one of two rectangles.', []),
      ('The target appears at C on the same rectangle or at B on the other rectangle, equally far from A.', []),
      ('In **Egly and colleagues (1994)**, C was faster than B, so attention spread along the cued object.', [])])
