"""Workspace aids for Collection 06 · Language · Part 1 (source id 8)."""
from aids_common import Aids
A = Aids(8)
t, q, card, contrast, hard = A.topic, A.q, A.card, A.contrast, A.hard

t('Psycholinguistics, phonemes and morphemes', [2, 3, 4, 5],
  'A phoneme changes meaning if changed. A morpheme is the smallest unit with meaning or grammatical function, so “bedrooms” has three.')
t('Word superiority and phonemic restoration', [6, 7, 8, 9, 10],
  'K is identified best in WORK. A covered phoneme is still heard from context. Word activation feeds back to letters.')
t('Word frequency and age of acquisition', [11, 12, 13, 14],
  'HOME (646 per million) is accepted faster than HIKE (9 per million). Early-learned words are faster even with frequency matched.')
t('Lexical ambiguity and meaning dominance', [15, 16, 17, 18, 19],
  'Readers look longer at balanced “cast” than at “cook.” Biased “tin” is read fast unless context points to the subordinate meaning.')
t('Semantics, syntax, aphasia and ERPs', [20, 21, 22, 23],
  'Broca’s aphasia gives labored, ungrammatical speech, and Wernicke’s aphasia gives meaningless speech. A semantic violation is associated with the N400, and a syntactic violation with the P600.')
t('Parsing and garden path sentences', [24, 25, 26, 27, 28],
  'Late closure attaches each new word to the current phrase, so “the piano” is first taken as the object of “played.”')

q(2, 'What does psycholinguistics study?')
q(3, 'What are phonemes?')
q(4, 'What are morphemes, and how many are in “table,” “bedroom” and “bedrooms”?')
q(5, 'What is the mental lexicon, and what did Lichtheim observe?')
q(6, 'What happens in the word superiority experiment?')
q(7, 'How do bottom-up and top-down word recognition differ?')
q(8, 'What is the phonemic restoration effect?')
q(9, 'What is the word superiority effect?')
q(10, 'How does the interactive activation model work?')
q(11, 'What is a corpus, and why does frequency matter?')
q(12, 'What does a frequency count measure?')
q(13, 'What is the word frequency effect, and how is it measured?')
q(14, 'What is the age of acquisition effect?')
q(15, 'What is lexical ambiguity?')
q(16, 'How does context select a meaning of “I saw her duck”?')
q(17, 'What is meaning dominance, and how do biased and balanced dominance differ?')
q(18, 'How does fixation duration differ for “cast” and “tin”?')
q(19, 'What happens when context points to a subordinate meaning?')
q(20, 'What is the difference between semantics and syntax?')
q(21, 'How do Broca’s and Wernicke’s aphasia differ?')
q(22, 'What is an event-related potential, and what are the N400 and the P600?')
q(23, 'Which brain structures are associated with the N400 and the P600?')
q(24, 'What is parsing, and what is a garden path sentence?')
q(25, 'Why is “The horse raced past the barn fell” hard to read?')
q(26, 'How is “The burglar discovered behind the bushes fled” a garden path?')
q(27, 'What is the syntax-first approach, and what is late closure?')
q(28, 'How is the piano sentence reanalyzed?')

A.relate([6, 8, 10], 'How do the word superiority effect and phonemic restoration both show top-down processing?',
         'A letter is identified better in a word than alone or in a nonword, and a covered phoneme is still heard from context. In both, knowledge of words feeds back to letters or phonemes.',
         ['In the **word superiority effect**, K is identified most accurately in WORK.',
          'In **phonemic restoration**, a phoneme covered by a cough is still perceived.',
          '- In both, activation from words feeds back to lower levels, as in the **interactive activation model**.'], 8.5)

card('Word superiority · a letter in context', 'Word superiority experiment (no researcher named)', [6, 9, 10],
     'Is a letter easier to identify inside a word?',
     'Whether the target letter appeared in a word (WORK), alone (K) or in a nonword (ORWK).',
     'Accuracy choosing between two letters after a 50 millisecond flash and a mask.',
     'K was identified most accurately when it appeared in the word.',
     'Word knowledge feeds back to letter recognition.')
card('Phonemic restoration · hearing a masked sound', 'Phonemic restoration (no researcher named)', [8],
     'Do listeners hear a phoneme that is covered up?',
     'Whether a phoneme was covered by a cough, and the words that came after it.',
     'What phoneme was heard and where the cough seemed to be.',
     'Listeners heard the missing phoneme and often could not tell where the cough occurred. Later words influenced which phoneme was heard.',
     'Context fills in speech, which is top-down processing.')
card('Lexical decision · word frequency', 'Lexical decision task (no researcher named)', [11, 13],
     'Are frequent words recognized faster?',
     'Word frequency, such as HOME (646 per million) and HIKE (9 per million).',
     'Speed of saying yes to words in a lexical decision task, and reading time.',
     'HOME was accepted quickly and HIKE more slowly. Low frequency words are looked at longer during reading.',
     'Frequency affects word recognition, which is the word frequency effect.')
card('Age of acquisition · frequency matched', 'Age of acquisition (no researcher named)', [14],
     'Do early-learned words have an advantage beyond frequency?',
     'Age of acquisition, with pairs such as doll and thesis matched in frequency.',
     'Recognition and naming speed.',
     'Words learned early in life were recognized and named faster.',
     'Age of acquisition matters even when frequency is matched.')
card('Meaning dominance · fixation duration', 'Meaning dominance and fixation duration (no researcher named)', [17, 18, 19],
     'Do the meanings of an ambiguous word compete during reading?',
     'Balanced (cast) or biased (tin) dominance, and whether context pointed to a subordinate meaning.',
     'Fixation duration compared with control words.',
     'Readers looked longer at “cast” than “cook,” read “tin” as fast as a control, and slowed on “tin” when context pointed to the container meaning.',
     'Meanings compete when they are equally strong or when context supports the weaker one.',
     trap='Biased “tin” is read fast unless the context points to its weaker meaning. Context pointing to the container meaning slows it.')
card('Broca’s and Wernicke’s aphasia', 'Broca’s and Wernicke’s aphasia', [21],
     'Are syntax and meaning handled separately in the brain?',
     'Not manipulated. Patients with damage to Broca’s or Wernicke’s area.',
     'Speech and understanding of sentences such as “The boy was pushed by the girl.”',
     'Broca’s patients had trouble when syntax was needed to show who acted. Wernicke’s patients had difficulty with both kinds of sentence.',
     'Syntax and meaning can be impaired separately.')
card('N400 and P600 · meaning and structure', 'Event-related potentials (no researcher named)', [22, 23],
     'Do semantic and syntactic violations produce different brain responses?',
     'Whether the sentence had a semantic anomaly or a grammatical error.',
     'Event-related potentials.',
     'A semantic violation went with the N400 and a syntactic violation with the P600.',
     'Meaning and structure are processed by different mechanisms.',
     trap='N400 is semantic (“tastes anxious”). P600 is syntactic (“child throw”).')
card('Garden path sentences · late closure', 'Syntax-first parsing (no researcher named)', [24, 25, 26, 27, 28],
     'How do readers group words before the sentence ends?',
     'Temporarily ambiguous sentences such as “After the musician played the piano was wheeled off the stage.”',
     'Not reported.',
     'On the syntax-first account, “the piano” is first attached to “played,” and the parse is repaired at “was wheeled.”',
     'The parser follows late closure and repairs the parse when it fails.')

contrast('Phoneme vs morpheme', [3, 4], 9.5,
         ('Phoneme', 'A phoneme is the shortest segment of speech that, if changed, changes the meaning of a word.'),
         ('Morpheme', 'A morpheme is the smallest unit of language that has meaning or grammatical function.'),
         'A phoneme does not need a meaning of its own. A morpheme carries meaning or grammatical function.',
         '“Bit” has three phonemes. “Bedrooms” has three morphemes.',
         'The plural “s” is a morpheme, although it is not a word.')
contrast('Word superiority vs phonemic restoration', [6, 8], 8.5,
         ('Word superiority effect', 'In the word superiority effect, a letter is easier to recognize in a word than alone or in a nonword.'),
         ('Phonemic restoration effect', 'In phonemic restoration, a phoneme is perceived even though its sound is covered up.'),
         'Word superiority is about seeing letters. Phonemic restoration is about hearing phonemes.',
         'K is identified better in WORK, and a phoneme covered by a cough is still heard.',
         'Both show top-down influence from words.')
contrast('Word frequency vs age of acquisition', [13, 14], 8.5,
         ('Word frequency effect', 'In the word frequency effect, people respond more rapidly to high frequency words.'),
         ('Age of acquisition effect', 'In the age of acquisition effect, words learned early are recognized faster, even with frequency matched.'),
         'Frequency is how often a word occurs. Age of acquisition is when it was learned.',
         'HOME is faster than HIKE. Doll is faster than thesis though their frequency is nearly the same.',
         'Age of acquisition is tested with frequency held constant.')
contrast('Biased vs balanced dominance', [17, 18], 9.5,
         ('Biased dominance', 'In biased dominance, the meanings of a word differ in frequency, as with TIN.'),
         ('Balanced dominance', 'In balanced dominance, the meanings have about the same frequency, as with CAST.'),
         'Balanced words activate both meanings and slow reading. Biased words favor the dominant meaning.',
         'Readers looked longer at “cast” than “cook,” and read “tin” as fast as a control word.',
         'Context pointing to the weaker meaning of a biased word slows reading.')
contrast('Semantics vs syntax', [20, 22, 23], 10,
         ('Semantics', 'Semantics is the meanings of words and sentences.'),
         ('Syntax', 'Syntax is the rules for combining words into sentences.'),
         'A semantic anomaly makes no sense. A syntax error breaks the rules.',
         '“The cats won’t bake” is a semantic anomaly (N400). “The cats won’t eating” is a syntax error (P600).',
         'The N400 is linked to the temporal lobe and the P600 to the frontal lobe.')
contrast('Broca’s vs Wernicke’s aphasia', [21], 10,
         ('Broca’s aphasia', 'Broca’s aphasia, after frontal damage, involves slow, labored, ungrammatical speech and trouble with some sentence structures.'),
         ('Wernicke’s aphasia', 'Wernicke’s aphasia, after temporal damage, involves meaningless speech and difficulty understanding speech and writing.'),
         'Broca’s affects structure. Wernicke’s affects meaning.',
         'A Broca’s patient understands “The apple was eaten by the girl” but has trouble with “The boy was pushed by the girl.”',
         'Wernicke’s patients have difficulty with both sentences.')

hard('How interactive activation produces word superiority', [7, 9, 10],
     [('Features activate the letters that fit them, and letters activate the words that fit them.', []),
      ('Words such as WEAR, WORK, WORD and WEAK compete.', []),
      ('Activation from the word level **feeds back** to the letters, so a letter in a word is identified better.', [])])
hard('Ambiguous words during reading', [17, 18, 19],
     [('**Balanced** “cast” activates both meanings, so readers look longer at it.', []),
      ('**Biased** “tin” activates its dominant meaning, so it is read as fast as a control word.', []),
      ('When context points to the subordinate meaning of “tin,” both meanings are activated and reading slows.', [])])
hard('Garden path sentences and late closure', [24, 27, 28],
     [('The **syntax-first approach** groups words into phrases by syntactic rules.', []),
      ('**Late closure** attaches each new word to the current phrase, so “the piano” becomes the object of “played.”', []),
      ('“Was wheeled” makes that grouping fail, and the reader reanalyzes the sentence.', [])])
