"""Workspace aids for Collection 05 · Attention · Part 2 (source id 4)."""
from aids_common import Aids
A = Aids(4)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('The 100-car naturalistic driving study', [2, 3, 4, 5, 6],
  '80 percent of crashes and 65 percent of near crashes involved inattention within three seconds before the conflict.')
t('Phones and driving', [7],
  'In Strayer and Johnston (2001), drivers on a phone missed twice as many red lights, and hands-free phones did the same.')
t('Inattentional blindness and change blindness', [8, 9, 10],
  'In Cartwright-Finch and Lavie (2007), only 10 percent saw the added square. Levin and Simons (1997) tested change blindness.')
t('Binding and feature integration theory', [11, 12, 13, 14, 22],
  'FIT has a preattentive stage that analyzes features and a focused attention stage that combines them.')
t('Illusory conjunctions: Treisman and Schmidt (1982)', [15, 16, 17, 18, 19, 20, 21],
  'Illusory conjunctions occurred on 18 percent of trials. In another display, letters and colors were mixed up on 39 percent.')
t('Balint’s syndrome and top-down help', [23, 24],
  'R.M. could not focus attention on individual objects and made many illusory conjunctions. Knowing what to expect helps binding.')
t('Attention in the brain', [25, 26, 27, 28, 29, 30, 31],
  'Datta and DeYoe (2009) predicted the attended location with 100 percent accuracy. In O’Craven and colleagues (1999), attending to the house raised parahippocampal activity, and attending to the face raised FFA activity.')
t('William James (1890) on attention', [32],
  'Attention is taking possession by the mind of one of several possible objects, and it implies withdrawal from some things.')

q(2, 'What is naturalistic driving research, and why is it quasi-experimental?')
q(3, 'How was the 100-car study run?')
q(4, 'What did the 100-car database hold, and how were crashes, near crashes and incidents defined?')
q(5, 'How much did inattention contribute to crashes in the 100-car study?')
q(6, 'What carries the highest crash risk, and what glance measures were compared?')
q(7, 'What did Strayer and Johnston (2001) find about phones and driving?',
  note='Outside the slides, the “four times higher” risk is usually traced to a 1997 study of phone billing records and crash reports, not to in-car video.')
q(8, 'What did Cartwright-Finch and Lavie (2007) find, and what is inattentional blindness?')
q(9, 'What is change blindness?')
q(10, 'What did Levin and Simons (1997) test?')
q(11, 'What is the binding problem?')
q(12, 'What are the stages of Treisman’s feature integration theory?')
q(13, 'What happens in the preattentive stage?')
q(14, 'What happens in the focused attention stage?')
q(15, 'What are illusory conjunctions and free-floating features?')
q(16, 'What is a binding error?')
q(17, 'Why did participants report the black digits first?')
q(18, 'How is registering features different from identifying objects?')
q(19, 'What was the procedure of Treisman and Schmidt (1982)?')
q(20, 'How often did illusory conjunctions occur in Treisman and Schmidt (1982)?')
q(21, 'How do binding errors and feature errors differ in frequency?')
q(22, 'What does focused attention do to free-floating features?')
q(23, 'What did patient R.M. with Balint’s syndrome show?')
q(24, 'How does top-down processing help binding?')
q(25, 'How does attention affect neural responding, and what is a topographic map?')
q(26, 'How is a topographic map organized?')
q(27, 'What does fMRI show during attention to expected motion?')
q(28, 'How are visual locations represented in the cortex?')
q(29, 'What did Datta and DeYoe (2009) find when observers attended to different locations?')
q(30, 'How well could Datta and DeYoe decode where a person was attending?')
q(31, 'What did O’Craven and colleagues (1999) find with an overlapping face and house?')
q(32, 'How did William James (1890) describe attention?')

A.relate([8, 9, 10], 'How do inattentional blindness and change blindness differ?',
         'Inattentional blindness is failing to perceive an unattended stimulus, such as the square only 10 percent saw in Cartwright-Finch and Lavie (2007). Change blindness is failing to notice differences between two versions of a picture or scene.',
         ['**Inattentional blindness** is failing to perceive an unattended stimulus, even when a person may be looking at it.',
          '- In **Cartwright-Finch and Lavie (2007)**, only 10 percent saw the added square.',
          '**Change blindness** is when differences between two versions of a scene are not immediately apparent.',
          '- **Levin and Simons (1997)** tested it during a visual event.'], 9)

card('The 100-car study · inattention before crashes', '100-car naturalistic driving study (no researcher named)', [2, 3, 4, 5, 6],
     'What is happening just before real crashes?',
     'Not manipulated. One hundred drivers drove normally for up to 13 months with hidden instruments.',
     'Crashes, near crashes, incidents and baseline driving, with glance behavior.',
     '80 percent of crashes and 65 percent of near crashes involved inattention within three seconds before the conflict.',
     'Inattention to the forward roadway is a primary contributing factor in crashes.',
     trap='The design is quasi-experimental. Crashes were observed, not caused.')
card('Strayer and Johnston · phone conversation while driving', 'Strayer and Johnston (2001)', [7],
     'Does talking on a phone impair driving?',
     'Whether participants were on a cell phone during a simulated driving task, handheld or hands-free.',
     'Missed red lights and time to apply the brakes.',
     'Phone users missed twice as many red lights and braked later, with hands-free phones too.',
     'The problem is divided attention, not holding the phone.')
card('Cartwright-Finch and Lavie · the unexpected square', 'Cartwright-Finch and Lavie (2007)', [8],
     'Do people see an unexpected stimulus while doing a task?',
     'A square was added on the sixth trial of a cross-judging task.',
     'Whether participants saw the square.',
     'Only 10 percent of participants saw it.',
     'Unattended stimuli can go unperceived, which is inattentional blindness.')
card('Levin and Simons · change blindness', 'Levin and Simons (1997)', [9, 10],
     'Do people notice changes during a visual event?',
     'Not reported. Change detection was tested during a visual event.',
     'Whether viewers noticed the change.',
     'Viewers can fail to notice a change and still understand the overall event.',
     'Noticing changes requires concentrated attention.')
card('Treisman and Schmidt · illusory conjunctions', 'Treisman and Schmidt (1982)', [15, 17, 19, 20, 21, 24],
     'Are features combined only with attention?',
     'Attention was directed away from the colored shapes by asking for the black digits first, in a 200 millisecond display with a mask.',
     'What participants reported at each shape location.',
     'Illusory conjunctions occurred on 18 percent of trials. Participants who focused on the objects paired shapes and colors correctly.',
     'Features are free-floating until focused attention binds them, as FIT predicts.',
     trap='The colors and shapes reported were present, but not in that pairing.')
card('R.M. · Balint’s syndrome', 'Patient R.M.', [23],
     'What happens when attention cannot focus on objects?',
     'Not manipulated. R.M. had Balint’s syndrome.',
     'Illusory conjunctions.',
     'R.M. reported a high number of illusory conjunctions.',
     'Focused attention is needed for binding.')
card('Datta and DeYoe · decoding attended locations', 'Datta and DeYoe (2009)', [25, 28, 29, 30],
     'Can brain activity show where a person is attending?',
     'Which location on a disk the observer attended.',
     'fMRI activity, used to make attention maps and train classifiers.',
     'Activity increased at the attended locations, and classifiers predicted the attended location with 100 percent accuracy.',
     'Attention changes location-specific activity in the visual cortex.')
card('O’Craven and colleagues · attending to a face or house', 'O’Craven and colleagues (1999)', [31],
     'Does attending to one of two overlapping objects change brain activity?',
     'Whether the observer attended to the face or the house.',
     'Activity in the parahippocampal gyrus and the fusiform face area.',
     'Attending to the house increased parahippocampal activity, and attending to the face increased FFA activity.',
     'Attention enhances the response to the attended object.',
     trap='The image was the same, only attention changed.')

contrast('Inattentional blindness vs change blindness', [8, 9], 9.5,
         ('Inattentional blindness', 'Inattentional blindness is the failure to perceive an unattended stimulus, even when a person may be looking at it.'),
         ('Change blindness', 'Change blindness occurs when differences between two versions of a picture are not immediately apparent.'),
         'Inattentional blindness misses a stimulus. Change blindness misses a difference.',
         'The added square in Cartwright-Finch and Lavie (2007) is inattentional blindness. Missing a change in Levin and Simons (1997) is change blindness.',
         'Both show that seeing needs attention.')
contrast('Preattentive vs focused attention stage', [12, 13, 14], 10,
         ('Preattentive stage', 'In the preattentive stage, an object is analyzed into features automatically, without attention or awareness.'),
         ('Focused attention stage', 'In the focused attention stage, attention combines the features into an object.'),
         'The first stage takes features apart. The second puts them together.',
         'A rolling red ball is analyzed into red, round and moving, and then bound into one ball.',
         'Free-floating features are not yet attached to objects.')
contrast('Binding error vs feature error', [21], 9,
         ('Binding error (illusory conjunction)', 'A binding error combines features that were present into the wrong pairing.'),
         ('Feature error', 'A feature error reports a letter or color that was absent.'),
         'A binding error pairs real features wrongly. A feature error reports a feature that was not shown.',
         'Letters and colors were mixed up on 39 percent of trials, and an absent letter or color was reported on 15 percent.',
         'Binding errors were more common than feature errors. The features were registered, and the pairing failed.')
contrast('Bottom-up vs top-down contributions to binding', [24], 8,
         ('Bottom-up processing in FIT', 'Feature integration theory is mostly bottom-up, building objects from their features.'),
         ('Top-down processing in binding', 'Top-down processing uses knowledge and expectations. Being told “a carrot, a lake and a tire” helped participants perceive the objects accurately.'),
         'Features come from the stimulus. Knowledge helps combine them correctly.',
         'Told “a carrot, a lake and a tire,” participants perceived the objects accurately.',
         'Focused attention and expectation both reduce illusory conjunctions.')
contrast('Datta and DeYoe (2009) vs O’Craven and colleagues (1999)', [29, 31], 8.5,
         ('Datta and DeYoe (2009)', 'Datta and DeYoe found that attending to a location increased activity in the areas for that location.'),
         ('O’Craven and colleagues (1999)', 'O’Craven and colleagues found that attending to a face or a house increased activity in the area for that object type.'),
         'Datta and DeYoe is attention to locations. O’Craven and colleagues is attention to objects.',
         'House attention raised parahippocampal activity, face attention raised FFA activity.',
         'Both show attention enhances neural responding.')

hard('Feature integration theory step by step', [11, 12, 13, 14, 22],
     [('In the **preattentive stage**, an object is analyzed into features such as color, shape and movement. This is automatic.', []),
      ('Before attention, the features are **free-floating**.', []),
      ('In the **focused attention stage**, attention combines them into one object.', ['Without attention, features can be combined wrongly, which is an illusory conjunction.'])])
hard('What Treisman and Schmidt (1982) showed', [17, 19, 20],
     [('A display of two black digits and four colored shapes was flashed for 200 milliseconds and masked.', []),
      ('Participants reported the digits first, which drew attention away from the shapes.', []),
      ('On **18 percent** of trials they reported shapes with the wrong colors, such as a small red circle.', [])])
