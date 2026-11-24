"""Workspace aids for Collection 08 · Articles & Lab Presentations (source id 0).
Kept conceptual, as Collection 15 is: what each lab and article asks, what it shows and why."""
from aids_common import Aids
A = Aids(0)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('Perception labs', [1, 2, 3],
  'd′ measures sensitivity and C measures response bias. The point of subjective equality measures the Müller-Lyer illusion. Farther dots need a longer gap for apparent motion.')
t('Attention labs', [4, 5, 6, 7, 8],
  'Conjunctive search slows with more distractors. Stroop and Simon show automatic interference. The attentional blink misses a close second target.')
t('Language labs', [9, 11],
  'A letter is identified better in a word, related words speed lexical decisions, and pseudohomophones are hard to reject.')
t('Articles', [12, 13, 14, 15, 16],
  'Musical training went with stronger tracking of the ignored voice. Attention mediated stress and wayfinding. Mandarin speakers also showed earlier on top.')
t('Memory labs', [10, 17, 18, 19, 20, 21],
  'Similar-sounding letters are recalled worse. Brown-Peterson recall drops over 15 to 20 seconds. Partial report shows a rich, fading sensory memory.')

q(1, 'What do sensitivity and response bias mean in signal detection, and how are d′ and C used?')
q(2, 'How does the method of constant stimuli measure the Müller-Lyer illusion?')
q(3, 'What is apparent motion, and how does the interstimulus interval change it?')
q(4, 'How do feature and conjunctive searches differ, and why are target-absent searches slower?')
q(5, 'What is the Stroop effect, and why does it happen?')
q(6, 'What is the attentional blink?')
q(7, 'What is inhibition of return?')
q(8, 'What is the Simon effect?')
q(9, 'Why does the word superiority lab use two letters that both make a word?')
q(10, 'What is the phonological similarity effect, and what does articulatory suppression do to it?')
q(11, 'What does the lexical decision lab show about related words, frequency and pseudohomophones?')
q(12, 'What did Puschmann, Baillet and Zatorre (2019) find about musical training and selective listening?')
q(13, 'What did Chen, Shi and Li (2023) find about stress, attention and emergency wayfinding?')
q(14, 'What did Tiffin-Richards and Schroeder (2018) find about children rejecting pseudohomophones?')
q(15, 'What did Rioja, Cekic, Bavelier and Baumgartner (2023) find about media multitasking?')
q(16, 'What did Boroditsky, Fuhrman and McCormick (2011) find about English and Mandarin time representations?')
q(17, 'What is the neighborhood size effect, and why is it confounded with word length?')
q(18, 'What does the Brown-Peterson procedure show?')
q(19, 'What did Sperling’s whole and partial report show?')
q(20, 'What is the position error effect?')
q(21, 'What is the modality effect?')

card('Signal detection', 'Signal detection lab (no researcher named)', [1],
     'Can sensitivity be separated from the tendency to say “present”?',
     'Whether a slanted line was present among random dots.',
     'Hits, misses, false alarms and correct rejections, combined into d′ and C.',
     'd′ shows how well targets are told from noise, and C shows whether the observer is conservative or liberal.',
     'Two observers can have the same sensitivity and different response bias.')
card('Müller-Lyer · method of constant stimuli', 'Müller-Lyer lab (no researcher named)', [2],
     'How strong is the Müller-Lyer illusion?',
     'The length of a comparison line without wings beside a standard with outward wings.',
     'How often the comparison was judged bigger.',
     'The point of subjective equality shows how much extra length makes the lines look equal.',
     'Psychophysics turns an illusion into a measurable size.')
card('Apparent motion · the interstimulus interval', 'Apparent motion lab (no researcher named)', [3],
     'When do two flashed dots look like one moving dot?',
     'The gap between the flashes and the distance between the dots.',
     'The gap at which movement looks strongest.',
     'Dots farther apart needed a longer gap, consistent with Korte’s laws.',
     'Seen motion depends on timing and distance, not on anything moving.')
card('Visual search · feature and conjunction', 'Visual search lab (no researcher named)', [4],
     'Why are some targets found at once and others slowly?',
     'Search type (feature or conjunctive), number of distractors, and whether the target was present.',
     'Search time.',
     'Feature searches stayed fast, conjunctive searches slowed with more items, and target-absent searches slowed more.',
     'A target that differs by one feature stands out, and a conjunction has to be checked item by item.')
card('Attentional blink', 'Attentional blink lab (no researcher named)', [6],
     'Does attending to one target hide a second one that follows?',
     'The number of letters between the two targets.',
     'Detection of each target.',
     'The second target was often missed when close to the first and detected better when farther apart.',
     'Attention needs time to recover after a target.',
     trap='It is a gap in attention, not a blink of the eyes.')
card('Inhibition of return', 'Inhibition of return lab (no researcher named)', [7],
     'What happens to attention at a cued location over time?',
     'The stimulus onset asynchrony (SOA), the time from the start of the cue to the start of the target, and whether the target was at the cued place.',
     'Response time.',
     'Responses were faster at the cued location after a short delay and slower there after a longer delay.',
     'Attention is discouraged from returning to a recently attended place.')
card('Simon effect', 'Simon lab (no researcher named)', [8],
     'Does irrelevant location affect response selection?',
     'Whether the square’s side matched the side of the correct key.',
     'Response time and accuracy.',
     'Incongruent trials were slower.',
     'The square’s location activates the response on that side, which competes with the correct response.')
card('Word superiority lab', 'Word superiority lab (no researcher named)', [9],
     'Is a letter identified better inside a word?',
     'Whether the letter appeared inside a word or alone.',
     'Accuracy choosing between two letters that would both make a real word.',
     'The advantage for words remained.',
     'Top-down word knowledge supports recognition of the letter.')
card('Lexical decision lab', 'Lexical decision lab (no researcher named)', [11],
     'What makes a letter string quick to accept or hard to reject?',
     'Related or unrelated preceding words, word frequency, and pseudohomophones among the nonwords.',
     'Speed of deciding whether a string is a word.',
     'Words were faster after a related word and when frequent. Pseudohomophones were harder to reject.',
     'Meaning, frequency and pronunciation all affect word recognition.')
card('Phonological similarity and articulatory suppression', 'Phonological similarity lab (no researcher named)', [10],
     'Are letters remembered as sounds?',
     'Whether the letters sounded alike, and whether participants counted aloud (articulatory suppression).',
     'Ordered recall.',
     'Similar-sounding letters were recalled worse. Suppression is predicted to shrink the effect and lower recall.',
     'Visible letters are recoded into a phonological code.')
card('Puschmann, Baillet and Zatorre · musical training and listening', 'Puschmann, Baillet and Zatorre (2019)', [12],
     'Does musical training go with better selective listening?',
     'Not assigned. Musical training and auditory working memory were measured, with competing speech present or absent.',
     'Target-word detection, and MEG tracking of each story.',
     'More training or better auditory working memory went with smaller drops with competing speech, and with stronger tracking of the ignored voice.',
     'Keeping information about both speakers may help keep the streams apart.',
     trap='Training went with stronger tracking of the ignored voice, not the attended one.')
card('Chen, Shi and Li · emergency wayfinding', 'Chen, Shi and Li (2023)', [13],
     'How are stress, attention and finding an escape route related?',
     'Not assigned. Stress was measured by sympathetic nervous system activity during a virtual indoor emergency.',
     'Sympathetic nervous system activity, flanker task performance and wayfinding.',
     'Attention task response time statistically mediated the link between stress and wayfinding.',
     'Differences in selective attention account for part of the link between stress and wayfinding.')
card('Tiffin-Richards and Schroeder · baseword frequency', 'Tiffin-Richards and Schroeder (2018)', [14],
     'How do children reject misspellings that sound like words?',
     'The frequency of the real word behind each pseudohomophone, in children and adults.',
     'Speed and accuracy of rejection, and spelling skill.',
     'Both groups rejected nonwords based on frequent words faster. Children were far less accurate, and better spellers were more accurate.',
     'Activating the real word is not the same as verifying its spelling.')
card('Rioja and colleagues · media multitasking', 'Rioja, Cekic, Bavelier and Baumgartner (2023)', [15],
     'Is media multitasking related to sustained attention?',
     'Not assigned. Media multitasking was measured in three samples.',
     'Reported attention problems and GradCPT performance.',
     'Higher multitasking scores went with more attention problems and poorer task performance, most strongly in the MTurk sample.',
     'The link is with using media at the same time, and it is an association, not a cause.')
card('Boroditsky, Fuhrman and McCormick · time in English and Mandarin', 'Boroditsky, Fuhrman and McCormick (2011)', [16],
     'Do English and Mandarin speakers represent time differently?',
     'Key arrangement (left and right, or top and bottom) and the speaker’s language.',
     'Speed of judging whether a photo showed an earlier or later moment.',
     'Both groups were faster with earlier on the left. Only Mandarin speakers were also faster with earlier on top.',
     'Language can shape the spatial representation of time.')
card('Brown-Peterson · decay and interference', 'Brown-Peterson lab (no researcher named)', [18],
     'How fast is unrehearsed information lost?',
     'The counting delay before recall, with rehearsal blocked.',
     'Recall of the trigram.',
     'Recall dropped steeply over about 15 to 20 seconds and was better on the first trial.',
     'Without rehearsal, recall drops within seconds. Better recall on the first trial points to proactive interference from earlier trials.')
card('Sperling · whole and partial report', 'Sperling', [19],
     'How much is available just after a brief display?',
     'Whole report or partial report, and the delay of the cue.',
     'The number of letters reported.',
     'Partial report showed more letters were available, and the advantage faded over about one second.',
     'Sensory memory briefly holds a rich trace that fades quickly.')
card('Modality effect', 'Modality lab (no researcher named)', [21],
     'Does hearing a list help recall?',
     'Whether digits were spoken or displayed.',
     'Ordered recall by position.',
     'Hearing improved recall of the final items only.',
     'Echoic memory adds information about the last items.')

contrast('Sensitivity vs response bias', [1], 9.5,
         ('Sensitivity (d′)', 'Sensitivity is the ability to tell a target from background noise, measured by d′.'),
         ('Response bias (C)', 'Response bias is the tendency to answer “present” or “absent,” measured by C.'),
         'Sensitivity is how well you discriminate. Bias is how willing you are to say yes.',
         'A conservative observer needs stronger evidence before saying “present.”',
         'A d′ of zero means no discrimination.')
contrast('Feature vs conjunctive search', [4], 9,
         ('Feature search', 'In a feature search, the target differs from all distractors by one feature, so it stands out.'),
         ('Conjunctive search', 'In a conjunctive search, distractors share the target’s features, so more items need checking.'),
         'Feature search stays fast with more distractors. Conjunctive search slows.',
         'A green circle among blue squares stands out. A green circle among green squares and blue circles has to be searched for.',
         'Target-absent searches slow down more.')
contrast('Stroop vs Simon effect', [5, 8], 9,
         ('Stroop effect', 'The Stroop effect is slower naming of an ink color when the word names a different color.'),
         ('Simon effect', 'The Simon effect is slower responding when the stimulus location does not match the response location.'),
         'In Stroop the word interferes. In Simon the irrelevant location interferes with response selection.',
         'BLUE printed in red slows naming “red.” A green square on the left slows the right-hand green response.',
         'Both come from automatic activation that competes with the correct response.')
contrast('Attentional blink vs inhibition of return', [6, 7], 8.5,
         ('Attentional blink', 'The attentional blink is difficulty reporting a second target shortly after a first.'),
         ('Inhibition of return', 'Inhibition of return is slower responding at a recently attended location.'),
         'The blink is about time after a target. Inhibition of return is about a place after a cue.',
         'K is often missed just after J. After a long SOA, responses at the cued spot are slower.',
         'With a short delay, the cued location is faster, not slower.')
contrast('Proactive vs retroactive interference', [18], 9,
         ('Proactive interference', 'Proactive interference is old information disrupting new information.'),
         ('Retroactive interference', 'Retroactive interference is new information disrupting old information.'),
         'Proactive works forward. Retroactive works backward.',
         'Better recall on the first Brown-Peterson trial shows proactive interference on later trials.',
         'Decay is forgetting with the passage of time.')
contrast('Echoic vs iconic memory', [19, 21], 8.5,
         ('Echoic memory', 'Echoic memory is the brief auditory trace.'),
         ('Iconic memory', 'Iconic memory is the brief visual trace.'),
         'Echoic memory is for sound and iconic memory for sight.',
         'The modality effect comes from echoic memory. Sperling’s partial report shows iconic memory.',
         'The modality advantage is only at the end of the list.')
contrast('Activation vs verification', [14], 8,
         ('Activation', 'Activation brings the real word to mind from a pseudohomophone.'),
         ('Verification', 'Verification checks the spelling shown against the stored spelling.'),
         'Activation is fast access. Verification is a careful check.',
         'Children, like adults, rejected nonwords based on frequent words faster, but their accuracy was near guessing overall.',
         'Strong orthographic representations support verification.')

hard('What d′ and C tell you', [1],
     [('A **hit** and a **false alarm** are both “present” responses. A miss and a correct rejection are both “absent.”', []),
      ('**d′** tells how well the observer separates the target from noise, which is sensitivity.', []),
      ('**C** tells how much evidence the observer needs before saying “present,” which is response bias.', [])])
hard('Why neighborhood size and word length are confounded', [17],
     [('An **orthographic neighborhood** is the set of words made by changing one letter of a word.', []),
      ('Words with larger neighborhoods are recalled better, and short words tend to have more neighbors.', []),
      ('When neighborhood size is equated, the usual recall advantage for short words has been found to disappear.', [])])
hard('Why partial report beats whole report', [19],
     [('In **whole report**, observers report only a few letters.', []),
      ('In **partial report**, a cue after the display names one row, and observers report most of it.', []),
      ('They did not know which row would be asked for, so more letters were available at first. The advantage fades within about a second.', [])])
hard('Statistical mediation in Chen, Shi and Li (2023)', [13],
     [('The study asked how stress, measured by sympathetic nervous system activity, relates to wayfinding.', []),
      ('Better selective attention, measured with a flanker task, supported route finding.', []),
      ('Attention **statistically mediated** the link, so differences in attention accounted for part of it.', [])])
