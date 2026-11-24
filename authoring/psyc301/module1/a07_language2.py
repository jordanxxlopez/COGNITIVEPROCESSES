"""Workspace aids for Collection 07 · Language · Part 2 (source id 1)."""
from aids_common import Aids
A = Aids(1)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('Syntax-first and interactionist parsing', [2, 3, 4],
  'Syntax-first parsing follows rules such as late closure and repairs later. In the interactionist approach, meaning and syntax act together.')
t('The visual world paradigm: Tanenhaus and colleagues (1995)', [5, 6, 7],
  'With two apples, “on the towel” says which apple. With one apple, listeners first look at the other towel, then revise at “in the box.”')
t('Prediction and learning constructions', [8, 9],
  'In Fine and colleagues (2013), the reduced-clause sentence was slower at first, and after exposure the difference was no longer significant.')
t('Inference and situation models', [10, 11, 12, 13, 14],
  'Readers infer the hammer. A horizontal nail is identified faster after “hammered the nail into the wall.” “Guitar” gave a smaller N400 than “barn.”')
t('Conversation and syntactic priming', [15, 16, 17, 18],
  'Given information is known, new information is added. Participants matched the confederate’s construction on 78 percent of trials.')
t('Language and thought', [19, 20, 21, 22, 23],
  'Russian speakers were faster across siniy and goluboy. Category effects were stronger in the right visual field. Tzeltal speakers were mostly absolute.')
t('Language, levels of analysis and prediction', [24, 25, 26, 27, 28, 29],
  'Marr’s levels are computational, algorithmic and implementational. Chomsky’s approach is computational. Elman’s model finds word boundaries from prediction error.')

q(2, 'What is the syntax-first approach, and what does late closure mean?')
q(3, 'How does the syntax-first approach treat syntax, semantics and repair?')
q(4, 'What is the interactionist approach to parsing?')
q(5, 'What is the visual world paradigm of Tanenhaus and colleagues (1995)?')
q(6, 'Where do listeners look when there are two apples?',
  note='Outside the slides, the original instruction in Tanenhaus and colleagues (1995) is usually given as “Put the apple on the towel in the box.” The slides say “Place.”')
q(7, 'Where do listeners look when there is only one apple?')
q(8, 'How does knowledge of the environment help predict language?')
q(9, 'What did Fine and colleagues (2013) find with the moving window paradigm?')
q(10, 'What inference do readers make in the birdhouse passage?')
q(11, 'What is a situation model, and what does the nail result show?')
q(12, 'What does the eagle in the sky show about simulation?')
q(13, 'What neural evidence supports simulation during reading?')
q(14, 'What did Metusalem and colleagues (2012) find with the N400?')
q(15, 'What is the given-new contract?')
q(16, 'What are syntactic coordination and syntactic priming?')
q(17, 'How is syntactic priming tested?')
q(18, 'What did the syntactic priming experiment find?')
q(19, 'What is the Sapir-Whorf hypothesis, and what did Winawer and colleagues (2007) find?')
q(20, 'What did Gilbert and colleagues (2006) find about visual field and color categories?')
q(21, 'How do egocentric and absolute descriptions of space differ?')
q(22, 'How does Tzeltal describe direction?')
q(23, 'What is the chips task, and how did Dutch and Tzeltal speakers respond?')
q(24, 'How did Chomsky’s 1959 review fit the cognitive revolution?')
q(25, 'What is substrate dependence?')
q(26, 'What are Marr’s three levels of analysis?')
q(27, 'How does the cash register illustrate Marr’s levels?')
q(28, 'What are Type I problems, and how do they apply to language?',
  note='Outside the slides, Marr’s levels appeared in the late 1970s and in Vision (1982), about two decades after Chomsky’s 1959 review. The slides say about a decade.')
q(29, 'How does Elman’s model find word boundaries?')

A.relate([10, 11, 14], 'What do the birdhouse passage, the nail sentence and the N400 study show about reading?',
         'Readers infer things that the text never says, such as the hammer. They simulate what is described, so a horizontal nail is identified faster. They use event knowledge, so “guitar” gave a smaller N400 than “barn” at a concert.',
         ['In the **birdhouse passage**, readers accept that John used a hammer, although it was never named.',
          'Readers build a **situation model**, so after “He hammered the nail into the wall,” a horizontal nail is identified faster.',
          'In **Metusalem and colleagues (2012)**, “guitar” produced a smaller N400 than “barn.”',
          '- Reading builds a model of the situation from the text and from knowledge.'], 8.5)

card('Tanenhaus and colleagues · apples, towels and the visual world', 'Tanenhaus and colleagues (1995)', [5, 6, 7],
     'Does the scene change how a sentence is parsed?',
     'Whether the scene had one apple or two apples.',
     'Eye movements while hearing “Place the apple on the towel in the box.”',
     'With two apples, eyes went to the apple on the towel. With one apple, eyes went to the other towel and then back at “in the box.”',
     'The scene is used during parsing, which supports the interactionist approach.',
     trap='With one apple, “on the towel” is first taken as the destination.')
card('Fine and colleagues · adapting to constructions', 'Fine and colleagues (2013)', [9],
     'Does experience with a construction change predictions?',
     'Exposure to reduced relative clause sentences such as “The experienced soldiers warned about the dangers conducted the midnight raid.”',
     'Reading time, word by word, in the moving window paradigm.',
     'At first the reduced sentence took longer than the “who were” version. After exposure, the difference was no longer significant.',
     'Readers adjust their predictions from experience with sentence constructions.')
card('The birdhouse passage · the inferred hammer', 'Birdhouse passage (no researcher named)', [10],
     'Do readers infer what a text does not say?',
     'Not reported.',
     'Whether readers later accept a sentence saying John was using a hammer.',
     'Readers accepted that John used a hammer.',
     'Comprehension includes inference, which connects with the constructive nature of memory.')
card('Nails and eagles · situation-model simulations', 'Situation model studies (no researcher named)', [11, 12],
     'Do readers simulate the shapes and orientations described?',
     'Whether the picture matched the orientation or shape implied by the sentence.',
     'Speed of identifying or responding to the picture.',
     'A horizontal nail after “hammered the nail into the wall” and an eagle with extended wings after “in the sky” were responded to faster.',
     'Situation models simulate perceptual characteristics of what is described.')
card('Reading action words · neural simulation', 'Action word imaging (no researcher named)', [13],
     'Do action words activate movement areas?',
     'Whether people made movements or read related action words.',
     'Cortical activation.',
     'Approximately the same areas were activated, more extensively for actual movements.',
     'Reading involves simulation of motor characteristics.')
card('Metusalem and colleagues · event knowledge and the N400', 'Metusalem and colleagues (2012)', [14],
     'Is knowledge about situations used while reading?',
     'The final word of a concert passage, expected (“stage”), related (“guitar”) or unrelated (“barn”).',
     'The size of the N400.',
     '“Guitar” produced a smaller N400 than “barn.”',
     'Readers access event knowledge as they read.',
     trap='A smaller N400 means the word was easier to fit.')
card('Syntactic priming in conversation', 'Syntactic priming experiment (no researcher named)', [16, 17, 18],
     'Do speakers match each other’s grammar?',
     'The confederate’s prime, “gave the book to the boy” or “gave the boy the book.”',
     'The form of the participant’s card description.',
     'In 78 percent of trials, the participant’s form matched the prime.',
     'Speakers adjust to match how others talk, which is syntactic coordination.')
card('Winawer and colleagues · Russian blues', 'Winawer and colleagues (2007)', [19],
     'Does language affect color judgments?',
     'Whether two blue squares came from the same or different Russian categories (siniy, goluboy), and the language of the speaker.',
     'Response time.',
     'Russian speakers responded more quickly when the two colors came from different categories.',
     'Language can influence perception, as the Sapir-Whorf hypothesis proposes.')
card('Gilbert and colleagues · color categories across visual fields', 'Gilbert and colleagues (2006)', [20],
     'Is the language effect on color stronger in the left hemisphere?',
     'The visual field of the odd color, and whether the difference was within or between categories.',
     'Speed of finding the odd color.',
     'The category effect was stronger in the right visual field.',
     'The right visual field projects first to the left hemisphere, which is more associated with language.')
card('Chips task · absolute and relative spatial memory', 'Chips task (no researcher named)', [21, 22, 23],
     'Does a language’s spatial system change spatial memory?',
     'The speaker’s language, Dutch or Tzeltal, in the rotated chips task.',
     'Whether the chosen card kept the arrangement relative to the body or to the environment.',
     'Dutch responses were mostly relative. Among consistent Tzeltal speakers, over 80 percent were absolute.',
     'The way a language describes space goes with how speakers remember it.')
card('Elman · letter prediction and word boundaries', 'Elman’s model', [29],
     'Can prediction find words in a stream with no spaces?',
     'Not reported.',
     'Prediction error for each next letter.',
     'Error went down within a word and rose where the next letter was less predictable.',
     'Word boundaries can be found from prediction.')

contrast('Syntax-first vs interactionist parsing', [2, 3, 4], 10,
         ('Syntax-first approach', 'In the syntax-first approach, words are grouped into phrases first by syntactic rules such as late closure, with repair when the rules fail.'),
         ('Interactionist approach', 'In the interactionist approach, semantics and syntax both influence processing as a sentence is read.'),
         'Syntax-first separates syntax from semantics. Interactionist lets them work together.',
         '“The bird saw the man with the binoculars” favors the man having them, which is meaning shaping the parse.',
         'The visual world results support the interactionist approach.')
contrast('Tanenhaus and colleagues (1995) · two apples vs one apple', [6, 7], 9.5,
         ('Two apples', 'With two apples, “on the towel” is taken as saying which apple is meant, and eyes go to that apple.'),
         ('One apple', 'With one apple, “on the towel” is first taken as the destination, and eyes go to the other towel.'),
         'The scene decides whether the phrase describes the apple or where to move it.',
         'With one apple, people look back at the apple on hearing “in the box,” which shows a revision.',
         'The instruction was the same in both scenes.')
contrast('Substrate dependence vs Type I problems', [25, 28], 8.5,
         ('Substrate dependence', 'Substrate dependence means a theory of language may have to include how the brain carries language out.'),
         ('Type I problem', 'A Type I problem is a problem that can be studied one level at a time.'),
         'Substrate dependence says implementation may have to be included. Treating language as Type I lets it be left out at first.',
         'Universal Grammar is work at the computational level that does not explain memory limits, errors or associative learning.',
         'Universal Grammar is an example of treating language as Type I.')
contrast('Given vs new information', [15], 8,
         ('Given information', 'Given information is what the listener already knows.'),
         ('New information', 'New information is what the speaker adds.'),
         'The given-new contract says sentences combine both.',
         'New information becomes given information later in the conversation.',
         'Conversation depends on shared knowledge.')
contrast('Egocentric vs absolute directions', [21, 22, 23], 9.5,
         ('Egocentric (relative)', 'Egocentric directions, such as left and right, are defined by the body and change when the speaker turns.'),
         ('Absolute', 'Absolute directions, such as Tzeltal uphill and downhill, are defined by the environment.'),
         'Relative responses keep the arrangement fixed to the body. Absolute responses keep it fixed to the world.',
         'Dutch speakers were mostly relative. Consistent Tzeltal speakers were over 80 percent absolute.',
         'Uphill is south and downhill is north in Tzeltal.')
contrast('Winawer and colleagues (2007) vs Gilbert and colleagues (2006)', [19, 20], 8.5,
         ('Winawer and colleagues (2007)', 'Winawer and colleagues found that Russian speakers were faster when two blues crossed the siniy and goluboy boundary.'),
         ('Gilbert and colleagues (2006)', 'Gilbert and colleagues found the color category effect was stronger in the right visual field.'),
         'Winawer compares languages. Gilbert compares hemispheres.',
         'The right visual field projects first to the left hemisphere.',
         'Both support the Sapir-Whorf idea that language influences thought.')
contrast('Computational vs algorithmic level', [26, 27, 28], 10,
         ('Computational level', 'The computational level states the problem and its purpose.'),
         ('Algorithmic level', 'The algorithmic level states the representations and operations used to solve the problem.'),
         'The computational level says what problem is solved. The algorithmic level says how it is solved.',
         'A cash register finds the amount due and the change due (computational) by addition and subtraction (algorithmic).',
         'The implementational level is how the operations are physically carried out. Chomsky’s formal approach is associated with the computational level.')

hard('The chips task', [23],
     [('Participants saw a card with a large dot and a small dot, were turned 180 degrees, and chose the matching card at a second table.', []),
      ('A **relative** choice keeps the arrangement the same with respect to the body. An **absolute** choice keeps it the same with respect to the environment.', []),
      ('Dutch speakers were mostly relative. Among consistent Tzeltal speakers, over 80 percent were absolute.', [])])
hard('Substrate dependence and Type I problems', [25, 26, 28],
     [('Marr’s three levels are **computational**, **algorithmic** and **implementational**.', []),
      ('**Substrate dependence** says a theory of language may have to include how the brain carries language out, through memory limits, errors and associative learning.', []),
      ('A **Type I problem** can be studied one level at a time, so treating language as Type I allows work on Universal Grammar without explaining implementation first.', [])])
