# Board fixes applied on top of the per-topic answer lists.
# SUB: (topic, index, old text, new text) replaces text inside the answer. DEL: (topic, index, text) drops a sub-point containing text.
# LEAD: (topic, index, researcher text) prefixes the first main point with the study the answer is about.
SUB = [
 (6, 5, " These are the main branches that the rest of the material builds on.", ""),
 (6, 10, "- Repeating a phone number is the example: the repetition", "- For instance, when a phone number is repeated, the repetition"),
 (6, 34, "is presented as a case relevant to **memory impairment**", "is a case of **memory impairment**"),
 (6, 65, " The material introduces that topic but does not contain a full separate working-memory model.", ""),
 (6, 74, "The material gives several estimates.", "There are several estimates."),
 (6, 53, "**Miller’s estimate applies", "**Miller’s (1956) estimate applies"),
 (6, 86, "In change detection, the", "In change detection (Alvarez and Cavanagh, 2004), the"),
 (9, 66, "The slide frames the buffer’s capacity as", "The buffer’s capacity is"),
 (10, 40, "According to Newell and Simon,", "According to Newell and Simon (1956),"),
]
DEL = [
 (6, 34, "A case name by itself does not specify"),
 (11, 0, "one of the three ideas this topic returns to"),
]
LEAD = [
 (6, 40, "Brown (1958) and Peterson and Peterson (1959)"),
 (6, 41, "Brown (1958) and Peterson and Peterson (1959)"),
 (6, 43, "Brown (1958) and Peterson and Peterson (1959)"),
 (9, 20, "Conrad (1964)"),
 (9, 34, "Brooks (1968)"),
 (9, 47, "Vogel and colleagues (2005)"),
 (9, 52, "Vogel and colleagues (2005)"),
 (10, 10, "Metcalfe and Wiebe (1987)"),
 (10, 11, "Metcalfe and Wiebe (1987)"),
 (12, 56, "Ginges, Atran, Medin and Shikaki (2007)"),
 (12, 58, "Ginges, Atran, Medin and Shikaki (2007)"),
 (12, 59, "Ginges, Atran, Medin and Shikaki (2007)"),
 (12, 60, "Ginges, Atran, Medin and Shikaki (2007)"),
 (12, 61, "Ginges, Atran, Medin and Shikaki (2007)"),
 (12, 88, "Ginges, Atran, Medin and Shikaki (2007)"),
 (12, 65, "Dehghani and colleagues (2009, 2010)"),
 (12, 66, "Dehghani and colleagues (2009, 2010)"),
 (12, 67, "Dehghani and colleagues (2009, 2010)"),
 (12, 68, "Dehghani and colleagues (2009, 2010)"),
 (12, 69, "Dehghani and colleagues (2009, 2010)"),
 (12, 90, "Dehghani and colleagues (2009, 2010)"),
 (12, 85, "Tetlock and colleagues (2000)"),
 (13, 8, "Kermer and colleagues (2006)"),
 (13, 23, "Tversky and Kahneman (1981)"),
 (13, 24, "Tversky and Kahneman (1981)"),
 (13, 25, "Tversky and Kahneman (1981)"),
 (13, 31, "Sanfey and colleagues (2003)"),
 (13, 67, "Sanfey and colleagues (2003)"),
]
SUB += [
 (6, 9, ", which makes it the opposite of the other two in both capacity and duration.", ", and it is the only store described as lasting years or decades."),
 (6, 13, "What is attended is carried forward and the rest is lost.", "What is attended is carried forward, and the rest does not have to remain accessible."),
 (6, 28, "so the loss is due to the delay.", "so the pattern links the loss to the delay."),
 (6, 1, ", which separates episodic memory from knowledge in general.", "."),
 (9, 10, ", which is why they are handled by a different component.", "."),
 (10, 69, "- That is why they are treated as **insight problems.**", "- **Metcalfe and Wiebe (1987)** classed them as **insight problems.**"),
 (11, 65, "whether **similar-looking objects** in **Chi et al. (1982)**", "whether **similar-looking objects** for the **novices in Chi et al. (1982)**"),
 (12, 91, "so **a larger benefit should raise the expected utility.**", "so a larger benefit is predicted to raise the expected utility."),
 (12, 5, "- It shows that quality can matter as much as the number of observations.", "- It shows how much weight one high-quality observation can carry."),
 (13, 63, "so **the default determines whether they end up donors.**", "so **the default sets what happens if they do nothing.**"),
]
DEL += [
 (6, 45, "With rehearsal blocked and earlier material competing"),
 (6, 1, "The event is not simply known as a fact"),
 (6, 47, "The word retroactive points backward"),
]
SAFE = {'Participants', 'People', 'Most', 'Both', 'Each', 'The', 'A', 'An', 'This', 'That', 'These', 'Those', 'It', 'Their', 'There',
        'When', 'After', 'Before', 'For', 'Because', 'Older', 'Younger', 'Offloading', 'Speech', 'Adolescents', 'Only', 'Among',
        'Under', 'Across', 'Anger', 'Disgust', 'Symbolic', 'Taboo', 'Approval', 'Material', 'Rejecting', 'Outrage', 'Moral',
        'Notice', 'Expected', 'Actual', 'Not', 'Money', 'Sanctions'}

def lead(a0, who):
    prefix = 'In **' + who + '**, '
    body = a0
    i = 0
    while i < len(body) and body[i] == '*':
        i += 1
    j = i
    while j < len(body) and (body[j].isalpha()):
        j += 1
    if body[i:j] in SAFE and i < len(body):
        body = body[:i] + body[i].lower() + body[i + 1:]
    return prefix + body

# Full replacements for answers the board found thin (topic -> {index: answer list}). Filled by patches_deep.py.
SET = {}
try:
    from patches_deep import SET as _S
    SET.update(_S)
except Exception:
    pass

def apply(m, A):
    A = [list(a) for a in A]
    for t, i, old, new in SUB:
        if t == m:
            joined = False
            for k, line in enumerate(A[i]):
                if old in line:
                    A[i][k] = line.replace(old, new); joined = True; break
            assert joined, (m, i, old)
    for t, i, text in DEL:
        if t == m:
            n = len(A[i]); A[i] = [l for l in A[i] if text not in l]; assert len(A[i]) < n, (m, i, text)
    for t, i, who in LEAD:
        if t == m:
            A[i][0] = lead(A[i][0], who)
    for i, ans in SET.get(m, {}).items():
        A[i] = ans
    return A
