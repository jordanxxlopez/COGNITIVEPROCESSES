"""Approved wording-only corrections shared by the preserved transcript editions."""
REPLACEMENTS = {
 'Individual curves need not align':'Individual curves do not have to align',
 'Bear–pear and beach–peach need not produce':'Bear–pear and beach–peach do not always produce',
 'A sharply divided label curve need not mean':'A sharply divided label curve does not necessarily mean',
 'A phoneme need not be fully settled':'A phoneme does not have to be fully settled',
 'The system need not wait':'The system does not have to wait',
 'A correct endpoint need not mean':'A correct endpoint does not necessarily mean',
 'Those predictions need not wait':'Those predictions do not have to wait',
 'a category violation need not produce':'a category violation does not have to produce',
 'which need not be identical':'which is not necessarily identical',
 'poor spoken comprehension need not identify':'poor spoken comprehension does not necessarily identify',
 'the same sound sequence need not carry':'the same sound sequence does not have to carry',
 'A child need not produce':'A child does not have to produce',
 'it need not specify':'it does not have to specify',
 'and need not reflect':'and does not necessarily reflect',
 "The picture's English name need not resemble":"The picture's English name does not have to resemble",
 'in an initial task need not settle':'in an initial task does not settle',
 'The stimulus need not literally contain':'The stimulus does not have to literally contain',
 'an early category-violation response need not establish':'an early category-violation response does not necessarily establish',
 'balanced bilinguals need not behave':'balanced bilinguals do not have to behave',
 'A child, an adult, and another talker need not produce':'A child, an adult, and another talker do not have to produce',
 'Evidence against one restriction need not by itself test':'Evidence against one restriction does not by itself test',
 'the patient need not articulate':'the patient does not have to articulate',
 'perceptual organization that need not be tied':'perceptual organization that does not have to be tied',
 'characteristics need not produce':'characteristics do not have to produce',
 'Replacement need not mean':'Replacement does not necessarily mean',
 'Their learning problems need not be identical':'Their learning problems are not necessarily identical',
}

def direct_wording(text):
    for old, new in REPLACEMENTS.items():
        text = text.replace(old, new)
    return text
