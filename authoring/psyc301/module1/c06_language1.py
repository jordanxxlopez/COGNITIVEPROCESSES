"""Collection 06 · Language · Part 1 (source id 8). Version 22 wording, closing points and reasoning."""
ID = 8
S = {}
def s(page, points, closing, reason=None):
    S[page] = (points, closing, reason)

s(2, ["**Psycholinguistics** aims to discover the psychological processes by which humans acquire and process language.",
      "**Comprehension** is how people understand spoken and written language. **Speech production** is how people produce language.",
      "**Representation** is how language is represented in the mind and brain. **Acquisition** is how people learn language."],
  "This matters because the four terms divide the field. | They separate understanding language, producing it, representing it and learning it.")
s(3, ["**Phonemes** are the shortest segments of speech that, if changed, change the meaning of the word.",
      "The word “bit” has three phonemes, which are the b sound, the vowel and the t sound. | Changing one of them makes a different word. A phoneme does not need to have a meaning of its own."],
  "This matters because phonemes are defined by sound contrasts. | They are not the same as printed letters.")
s(4, ["**Morphemes** are the smallest units of language that have meaning or grammatical function.",
      "“Table” is one morpheme. “Bedroom” is two morphemes. “Bedrooms” is three morphemes. | The plural ending “s” carries grammatical information, although it is not a word."],
  "This matters because phonemes and morphemes use different tests. | A phoneme is a sound contrast, and a morpheme is a unit of meaning or function.")
s(5, ["Well-read adults can understand more than **50,000** different words.",
      "The **lexicon** is our knowledge of the forms of words, which gives access to their meanings. | The **mental lexicon** is the idea that word forms are stored for reuse.",
      "**Lichtheim** observed that written and spoken word recognition can be impaired separately. | The spoken-word processing model links auditory word representations, concepts and motor word representations."],
  "This matters because word recognition draws on it. | Written and spoken word recognition can be impaired separately.")
s(6, ["In the **word superiority experiment**, a letter string is flashed for about 50 milliseconds and then masked. | The participant then chooses between two letters, such as D and K.",
      "The target letter K appears in a word (WORK), alone (K), or in a nonword (ORWK).",
      "K is identified most accurately when it appears in the word."],
  "This matters because the task tests the recognition of a letter. | It does not ask whether the string is a word.",
  "The target letter was the same in all three conditions, so the higher accuracy comes from the letter being inside a word.")
s(7, ["In **bottom-up** word recognition, letters or phonemes are identified from features, and words are identified from letters.",
      "In **top-down** processing, activation from words feeds back to the letters or phonemes."],
  "This matters because the two directions interact. | The word superiority effect fits with feedback from the word to its letters.")
s(8, ["The **phonemic restoration effect** occurs when phonemes are perceived in speech even though their sound is covered up. | Listeners fill in the missing phoneme from the sentence context and from the rest of the word.",
      "When a cough covers the sound, listeners may be unable to tell where the cough occurred.",
      "The meaning of words that come after the missing phoneme also influences which phoneme is heard."],
  "This matters because it is **top-down processing** in speech. | The listener hears a sound that was not there.")
s(9, ["In the **word superiority effect**, a word, a letter or a nonword is flashed briefly and followed by a mask. | Two letters are then presented, and the task is to pick the one that was in the stimulus.",
      "Letters are easier to recognize when they are in a word than when they are alone or in a nonword."],
  "This matters because the word context improves recognition of a single letter. | Both answer choices would make a real word, so knowing it is a word does not give the answer.")
s(10, ["The **interactive activation model** connects a feature level, a letter level and a word level.",
       "Features activate the letters that fit them, and the letters activate the words that fit them. | Word candidates such as WEAR, WORK, WORD and WEAK compete.",
       "Activation from the word level feeds back to the letters."],
  "This matters because it explains the word superiority effect. | Bottom-up evidence and top-down word knowledge work in one network.")
s(11, ["A **corpus** is a large representative sample of utterances or written text. | It shows the frequency of words, of different meanings and of grammatical constructions.",
       "Frequency matters because much of comprehension is prediction. | The ability to perceive written words depends partly on how frequently they appear.",
       "In the estimates of **Speer (2022)**, “the” occurs 53,703 times per million words."],
  "This matters because frequency has to be measured before its effects can be tested. | A corpus is the source of those counts.")
s(12, ["A frequency count depends on which words, sources and periods are included.",
       "The **Google Books Ngram Viewer** samples printed books over time. | Its frequency says how often a word occurs in those books."],
  "This matters because a count describes its own sample. | A change in a count can come from a change in usage or a change in what was sampled.")
s(13, ["The **word frequency effect** is that people respond more rapidly to high frequency words.",
       "In a **lexical decision task**, participants read words and nonwords and say yes when the string is a word. | HOME is accepted quickly and HIKE more slowly. “Home” occurs 646 times per million and “hike” 9 times.",
       "During reading, low frequency words are looked at longer."],
  "This matters because two measures show it. | They are reaction time and fixation duration.",
  "Both strings are real words, so the faster response to HOME goes with its higher frequency.")
s(14, ["The **age of acquisition effect** is that words learned early in life are recognized and named faster, even when frequency is matched.",
       "The pairs are doll and thesis, puppy and clause, cookie and audit. | In each pair the two words have nearly the same frequency."],
  "This matters because it separates two explanations. | The advantage of early words is not just that they are more frequent.",
  "The two words in each pair have nearly the same frequency, so the faster response goes with being learned earlier.")
s(15, ["**Lexical ambiguity** means that words have more than one meaning. | “I saw her duck” can mean seeing her bird or seeing her lower her head.",
       "Some meanings are more likely than others. | **Traxler (2012)** wrote that these meanings “are not all created equal.”"],
  "This matters because two things decide which meaning is taken. | They are how frequent each meaning is and the context.")
s(16, ["In “I saw her duck,” a context about birds supports the animal meaning. A context about avoiding something supports the action meaning.",
       "More frequent meanings are more accessible."],
  "This matters because the word form stays the same while the meaning changes. | Context resolves the ambiguity among the meanings that were activated.")
s(17, ["**Meaning dominance** is the fact that some meanings of a word are used more frequently than others.",
       "**Biased dominance** is when the meanings differ in frequency. | TIN is usually the metal and less often the food container.",
       "**Balanced dominance** is when the meanings have about the same frequency. | CAST can be a member of a play or a plaster cast."],
  "This matters because it affects how meanings are accessed. | The two meanings of a balanced word compete.")
s(18, ["The measure is **fixation duration**, which is how long the eyes rest on a word.",
       "In “the cast worked,” both meanings of “cast” are activated. | Readers look longer at “cast” than at the control word “cook.”",
       "In “the tin was,” the dominant meaning of “tin” is favored. | Readers read “tin” as fast as a control word."],
  "This matters because competition between meanings takes time. | Two balanced meanings compete, and a dominant meaning does not.",
  "The control word “cook” was read in the same place in the sentence, so the longer fixation on “cast” reflects its two balanced meanings.")
s(19, ["Context also affects which meaning is accessible.",
       "In “The miners went to the store and saw that they had beans in a tin,” the context points to the less frequent container meaning. | Both meanings are activated, and reading takes longer than for the control word “cup.”"],
  "This matters because accessibility depends on dominance and context together. | When context supports the dominant meaning, there is little competition.")
s(20, ["Components of language are not processed in isolation. | **Semantics** is the meanings of words and sentences. **Syntax** is the rules for combining words into sentences.",
       "“The cats won’t eat” is acceptable. | “The cats won’t bake” is a **semantic anomaly**. “The cats won’t eating” is a **syntax error**."],
  "This matters because the two changes break different things. | One breaks the meaning and keeps the grammar. The other breaks the grammar.")
s(21, ["**Broca’s area** is in the frontal lobe, and **Wernicke’s area** is in the temporal lobe.",
       "**Broca’s aphasia** involves slow, labored, ungrammatical speech and trouble understanding some sentence structures. | “The apple was eaten by the girl” can be understood from plausible roles. “The boy was pushed by the girl” needs syntax to show who acted.",
       "**Wernicke’s aphasia** involves meaningless speech and difficulty understanding speech and writing. | People with Wernicke’s aphasia have difficulty with both example sentences."],
  "This matters because the two aphasias show different patterns. | Broca’s aphasia is tied to syntax, and Wernicke’s aphasia is tied to meaning.")
s(22, ["An **event-related potential (ERP)** is a rapid electrical response of the brain, measured in fractions of a second after a stimulus.",
       "Two components are the **N400** and the **P600**. | A semantic violation is associated with the N400, at about 400 milliseconds. A syntactic violation is associated with the P600, at about 600 milliseconds."],
  "This matters because ERP studies show that syntax and semantics are associated with different mechanisms. | The two violations give waves at different times.")
s(23, ["The **P600** is associated with structures in the **frontal lobe**. | Its example is “The spoiled child throw the toy on the floor,” which has a grammatical error.",
       "The **N400** is associated with structures in the **temporal lobe**. | Its example is “Whipped cream tastes anxious,” which has a semantic anomaly."],
  "This matters because each wave goes with a kind of error and a brain region. | Damage to the region can reduce the wave.")
s(24, ["**Parsing** is the mental grouping of the words in a sentence into phrases.",
       "**Garden path sentences** begin by appearing to mean one thing and end up meaning something else. | “After the musician played the piano was wheeled off the stage” is an example.",
       "This is **temporary ambiguity**. The first words are ambiguous, and the end of the sentence makes the meaning clear."],
  "This matters because the first grouping has to be revised. | “The piano” turns out to be the subject of the second clause.")
s(25, ["In “The horse raced past the barn fell,” the word “raced” is first read as the main verb. | Then “fell” is difficult to attach.",
       "The complete reading is “The horse that was raced past the barn fell.”"],
  "This matters because its ending forces a revision of the first reading. | That makes it a garden path sentence.")
s(26, ["“The burglar discovered behind the bushes fled” creates a garden path in the same way.",
       "The complete reading is “The burglar who was discovered behind the bushes fled.” | “Discovered” belongs to the description of the burglar, and “fled” is the main verb."],
  "This matters because later words make the first grouping fail. | They also show which structure is needed.")
s(27, ["In the **syntax-first approach**, words are first grouped into phrases by rules based on syntax.",
       "**Late closure** means the parser assumes that each new word is part of the current phrase. | The parser is the process that groups the words.",
       "If something is wrong with the parse, readers use other information to reinterpret the sentence."],
  "This matters because it explains why garden paths happen. | The parser attaches each word by syntax first and repairs later.")
s(28, ["The piano sentence is first grouped as “After the musician played the piano.” | “The piano” is attached to “played” as its object.",
       "The words “was wheeled” make that grouping fail.",
       "The repair is “After the musician played” and then “the piano was wheeled off the stage.”"],
  "This matters because it shows late closure and its repair. | The same words are regrouped.")

SUBJECT = {
    2: 'The four terms matter',
    3: 'The definition matters',
    4: 'The two units matter',
    5: 'The mental lexicon matters',
    6: 'The task matters',
    7: 'The two directions matter',
    8: 'Phonemic restoration matters',
    9: 'The word superiority effect matters',
    10: 'The model matters',
    11: 'A corpus matters',
    12: 'The sample matters',
    13: 'The word frequency effect matters',
    14: 'Matching frequency matters',
    15: 'Lexical ambiguity matters',
    16: 'Context matters',
    17: 'Meaning dominance matters',
    18: 'The comparison matters',
    19: 'Context matters',
    20: 'The two errors matter',
    21: 'The two aphasias matter',
    22: 'The two components matter',
    23: 'The pairing matters',
    24: 'Temporary ambiguity matters',
    25: 'The sentence matters',
    26: 'The second sentence matters',
    27: 'Late closure matters',
    28: 'The piano sentence matters',
}
