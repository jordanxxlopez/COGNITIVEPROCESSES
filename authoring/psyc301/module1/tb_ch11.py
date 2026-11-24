"""Test Bank curation for Goldstein chapter 11 (Collections 06 and 07, source ids 8 and 1).

Source: the supplied Goldstein Cognero bank, chapter 11, all 50 multiple-choice items
(testbank-source-ch11.json). Each row: (collection id, slide), 'extra' or 'review', and an explanation.
Open-response prompts 51 to 56 are not converted into invented multiple-choice questions.
"""
HOME = 8
L1, L2 = 8, 1
CURATION = {
 1: ('extra', 'The properties of language are not listed on the slides. In the chapter, language is hierarchical, because small components such as words combine into phrases, sentences and stories.'),
 2: ('extra', 'The properties that make human language unique are not listed on the slides. In the chapter, they are hierarchical structure and rules for arranging symbols, while communication is shared with other animals.'),
 3: ('extra', 'Rule-governed structure is not on the slides as a property of language. Yoda’s word order breaks the rules of English syntax, which the slides define as the rules for combining words into sentences.'),
 4: ('extra', 'Deaf children inventing a sign language is not on the slides. The chapter uses it as evidence that humans have a strong drive to create language.'),
 5: ('extra', 'The isolated New Guinea groups are not on the slides. In the chapter, they had large numbers of sophisticated language systems, which shows language is universal.'),
 6: ((L2, 24), 'Skinner’s Verbal Behavior explained language learning by operant conditioning. Correct speech is rewarded, which is reinforcement.'),
 7: ((L2, 24), 'Chomsky’s 1959 review challenged Skinner and argued for internal cognitive structure. The bank describes this as humans being genetically programmed to acquire language.'),
 8: ((L2, 24), 'Chomsky (1959) pointed out that children produce sentences they have never heard and make errors that were never rewarded. Imitation and reinforcement alone cannot explain that.'),
 9: ((L1, 2), 'Psycholinguistics aims to discover the psychological processes by which humans acquire and process language. A study of how adults understand words belongs there.'),
 10: ((L1, 2), 'Acquisition is how people learn language, one of the areas of psycholinguistics. Learning a second language later in life is language acquisition.'),
 11: ((L1, 5), 'The lexicon is our knowledge of the forms of words, which gives access to their meanings. Learning “wanderlust” adds a word to Ron’s lexicon.'),
 12: ('extra', 'Pollack and Pickett’s experiment is not on the slides. In the chapter, single words cut out of conversation were identified only about half the time, which shows how much context helps.'),
 13: ('review', 'A sentence whose first part can be read two ways until the end clears it up is temporary ambiguity, as the slides define it. The bank keys speech segmentation, so this item is shown for review and is not scored.'),
 14: ((L1, 13), 'The word frequency effect is that people respond more rapidly to high frequency words. HOME is accepted quickly and HIKE more slowly.'),
 15: ((L1, 13), 'A lexical decision task asks whether a string is a word, so it needs real words and nonwords. “Pibble” and “girk” are nonwords.'),
 16: ((L1, 13), 'In a lexical decision task, participants read words and nonwords and say yes when the string is a word.'),
 17: ((L1, 13), 'Low frequency words are looked at longer during reading. Lamb, cottage and pasture are less frequent than dog, house and yard, so Trial 1 is slower.'),
 18: ((L2, 15), 'Conversation depends on shared knowledge. The given-new contract builds sentences from given information the listener already knows and new information.'),
 19: ((L1, 17), 'Meaning dominance is the fact that some meanings of a word are used more often than others. The more frequent meaning is more accessible.'),
 20: ('extra', 'This lexical priming study is not on the slides. In the chapter, “bugs” briefly activates both the insect and the listening-device meanings, so ANT and SPY are primed and the unrelated SKY is slowest.'),
 21: ((L1, 20), 'Syntax is the rules for combining words into sentences. Semantics is the meanings of words and sentences.'),
 22: ((L1, 23), 'The N400, for semantic anomalies, is associated with the temporal lobe. The P600, for grammatical errors, is associated with the frontal lobe.'),
 23: ((L2, 2), 'In the syntax-first approach, the grouping of words into phrases is governed at first by syntactic rules. The bank calls this the garden path approach.'),
 24: ((L1, 24), 'Garden path sentences begin by appearing to mean one thing and end up meaning something else. “The Toyota” is first read as the object of “stopped,” like “the piano” after “played.”'),
 25: ((L2, 2), 'Late closure means the parser assumes each new word is part of the current phrase. So “a mile” is first added to “Because he always jogs.”'),
 26: ((L2, 4), 'In the interactionist approach, which the bank calls constraint-based, semantics and syntax both influence processing as a sentence is read.'),
 27: ((L2, 4), 'Both approaches use semantics. The syntax-first approach brings it in only when the first parse fails, and the interactionist approach uses it as the sentence is read, so the question is when.'),
 28: ((L2, 5), 'Tanenhaus and colleagues (1995) showed that the scene a person is looking at changes how the sentence is interpreted. That is environmental context.'),
 29: ('extra', 'Coherence is not defined on the slides. In the chapter, it is the representation of a text in which information in one part is related to information in another part.'),
 30: ((L2, 10), 'Making a coherent story includes inferences, which use our own knowledge to determine what the text means. Readers infer the hammer in the birdhouse passage.'),
 31: ('extra', 'Anaphoric inference is not named on the slides. In the chapter, it links a pronoun such as “he” or “it” to the person or thing mentioned earlier.'),
 32: ('extra', 'Anaphoric inference is not named on the slides. In the chapter, it links a pronoun to an earlier noun, so “them” is linked to the fish.'),
 33: ('extra', 'Instrument inference is not named on the slides, though the birdhouse passage is an example of one. In the chapter, it infers the tool or method, such as the hammer or the radio.'),
 34: ('extra', 'Causal inference is not named on the slides. In the chapter, it infers that one event caused another, such as the ice causing Ramona to fall.'),
 35: ((L2, 11), 'A situation model is a mental representation of what a text is about. It represents events as if the reader were experiencing them, often from the protagonist’s point of view, so it is about the people, objects, places and events in the story and not about phrases and paragraphs.'),
 36: ((L2, 11), 'A situation model represents events as if the reader were experiencing them, often from the protagonist’s point of view. Keeping track of Jorge’s location is such a simulation.'),
 37: ((L2, 15), 'The given-new contract says a speaker builds sentences with given information, which the listener already knows, and new information. It makes conversation understandable.'),
 38: ((L2, 16), 'Syntactic priming occurs when one person’s use of a construction increases the chance that the other person will use it.'),
 39: ('review', 'The bank keys “system.” The slides do not describe language with any of these single words, so this item is shown for review and is not scored.'),
 40: ('review', 'The bank keys the statement that semantics and lexicons are equal in scope. The slides do not compare the scope of the lexicon and semantics, so this item is shown for review and is not scored.'),
 41: ((5, 19), 'Speech segmentation is the ability to tell where one word ends and the next begins. It divides a continuous stream into words, as cutting divides taffy into pieces.'),
 42: ((L1, 17), 'Meaning dominance is the fact that some meanings of a word are used more frequently than others. Dictionaries list the most frequent meaning first.'),
 43: ('review', 'The bank keys the comma. Parsing power of punctuation is not on the slides, so this item is shown for review and is not scored.'),
 44: ('review', 'The bank keys “rules.” Heuristics in language are not on the slides, so this item is shown for review and is not scored.'),
 45: ((L2, 16), 'Entrainment is conversation partners becoming more alike as they talk. Syntactic coordination on the slides, using similar grammatical constructions, is one form of it, so the key idea is similarity.'),
 46: ((L1, 24), 'Sentences are often temporarily ambiguous. The first words can be read more than one way, and the end of the sentence makes the meaning clear.'),
 47: ('review', 'The bank keys “dynamic.” The slides do describe conversation as dynamic and rapid, but this item asks about reading stories, so it is shown for review and is not scored.'),
 48: ('extra', 'Theory of mind is not on the slides. In the chapter, it is the ability to understand what others feel, think or believe. It is not itself a language process, while anaphoric inference, causal inference and syntactic priming all are.'),
 49: ('extra', 'Prosody is not on the slides. In the chapter, it is the pattern of intonation and rhythm in spoken language, which carries sound and structure and not word meaning.'),
 50: ('extra', 'The tonic is not on the slides. In the chapter’s comparison of music and language, the tonic is the key note of a piece of music, such as E.'),
}
STEMS = {4: 'Evidence that humans have a strong drive to create language comes from the fact that when deaf children find themselves in an environment where no one speaks or uses sign language, they', 28: 'Tanenhaus and colleagues’ eye movement study presented participants with different pictures for interpreting the sentence, “Put the apple on the towel in the box.” Their results showed the importance of ____________________ in how we understand sentences in real-life situations.'}
OPTIONS = {}
