"""Collection 08 · Articles & Lab Presentations (source id 0). Version 22 wording. This collection offers
Versions 20 to 22, like the Module II articles collection, so it has no closing points."""
ID = 0
S = {}
def s(page, points):
    S[page] = (points, None, None)

s(1, ["**Signal detection** separates two things. | **Sensitivity** is the ability to tell a target from background noise. **Response bias** is the tendency to answer “present” or “absent.”",
      "Participants look for a slanted line hidden among random dots. | A **hit** is correctly reporting the line. A **miss** is failing to report it. A **false alarm** is reporting a line that is absent. A **correct rejection** is correctly saying it is absent.",
      "**d′** measures sensitivity by combining hits and false alarms. | A value of zero means the participant cannot tell target-present displays from target-absent displays. Larger values mean better discrimination. **log(alpha)** is another measure of sensitivity.",
      "**C** measures response bias. | Positive values are conservative, negative values are liberal, and values near zero are neutral. A conservative observer needs stronger evidence before saying “present.”"])
s(2, ["In the **Müller-Lyer illusion**, a line with outward wings looks longer than a line with inward wings, even when the two lines are equal.",
      "**Psychophysics** connects perceptual judgments with measurable properties of the stimulus.",
      "The **method of constant stimuli** presents preset lengths of a line without wings beside a standard line with outward wings. | Participants judge whether each comparison looks bigger or smaller.",
      "The **psychometric function** plots how often the observer says “bigger” at each length. | The **point of subjective equality** is where “bigger” and “smaller” are equally likely. The extra length needed to look equal measures the strength of the illusion."])
s(3, ["**Apparent motion** is seeing movement between stationary stimuli that are flashed one after the other.",
      "The **interstimulus interval (ISI)** is the gap between the first stimulus turning off and the next one turning on. | With a very short gap the dots look simultaneous. With a long gap they look like separate flashes. At an intermediate gap, one dot seems to travel to the other location.",
      "Participants adjust the gap until the movement looks strongest. | Dots that are farther apart need a longer gap, which is consistent with **Korte’s laws**."])
s(4, ["In **visual search**, participants look for a green circle.",
      "In a **feature search**, all the distractors are blue squares, so the target stands out. | In a **conjunctive search**, the distractors are green squares and blue circles, which share the target’s features.",
      "Feature searches stay fast as distractors are added. Conjunctive searches become slower, because more items need checking.",
      "**Target-absent** searches slow down more. | The observer has to finish checking every item, and a target-present search can stop when the target is found."])
s(5, ["The **Stroop effect** is slower naming of an ink color when the word names a different color. | For the word BLUE printed in red, the answer is “red,” and reading activates “blue.”",
      "Reading is highly practiced and happens with little deliberate attention. | The automatic word response interferes even when the participant tries to ignore it.",
      "In the lab, participants press the key for the ink color. Responses take longer when the word and the ink conflict."])
s(6, ["The **attentional blink** is difficulty reporting a second target shortly after attending to a first target. | It is a brief gap in attention and not a blink of the eyes.",
      "Letters rapidly replace one another at the same location. | Participants report whether J and K appeared, and the number of letters between them changes.",
      "The second target is often missed when it closely follows the first. Detection improves when the two are farther apart. | Detection of the first target changes little."])
s(7, ["**Inhibition of return** is slower responding to a target at a recently attended location.",
      "A cue appears at one possible position, followed by a target there or somewhere else. | The **stimulus onset asynchrony (SOA)** is the time between the start of the cue and the start of the target.",
      "With a short delay, responses are faster at the validly cued location. With a longer delay, responses are slower at the cued location than elsewhere. | The cue does not predict where the target will be."])
s(8, ["The **Simon effect** is faster, more accurate responding when the location of the stimulus matches the location of the response, even though location is irrelevant. | It concerns **response selection**, which is choosing the action.",
      "A red or green square appears left or right of fixation. | Participants press a right-hand key for green and a left-hand key for red.",
      "A green square on the right is **congruent**. A green square on the left is **incongruent**, and the response is slower. | The location of the square activates the left-hand response, which competes with the correct right-hand response."])
s(9, ["The **word superiority effect** means a letter is identified more accurately inside a word than alone.",
      "After a brief display, the observer chooses between two letters. | Both letters would make a real word, so knowing that it was a word does not give the answer.",
      "The advantage for words remains. | **Top-down** word knowledge supports recognition of the letter."])
s(10, ["The **phonological similarity effect** is poorer ordered recall for items that sound alike. | Letters such as t, p, b and d are harder to recall in order than k, r, s and q.",
       "The visible letters are converted into a **phonological code**, which is a sound-based representation. | Similar codes interfere with one another.",
       "During **articulatory suppression**, participants count repeatedly while viewing the letters. | Counting occupies the speech process used to recode and rehearse. The similarity effect is predicted to shrink or disappear, and overall recall is poorer."])
s(11, ["A **lexical decision task** asks whether a string of letters is a real word. | GIRL is a word and XLFFE is not.",
       "A word is recognized faster after a related word than after an unrelated word. | **High frequency words** are also recognized faster than low frequency words.",
       "**Pseudohomophones** are nonwords that sound like real words. | They are harder to reject, because the pronunciation activates a familiar word."])
s(12, ["**Puschmann, Baillet and Zatorre (2019)** asked whether musical training goes with better selective listening. | The **cocktail party problem** is following one speaker while other people speak.",
       "Participants heard two male speakers reading different stories. | They pressed a button when a target word occurred in the attended story.",
       "**MEG** recorded magnetic signals from brain activity. | **Speech envelope reconstruction** measured how closely the brain tracked the changing loudness of each story.",
       "Listeners with more musical training or better **auditory working memory** showed smaller drops in performance with competing speech.",
       "The brain tracked the attended story more strongly overall.",
       "More musical training went with stronger tracking of the **ignored** voice, and not with stronger tracking of the attended voice. | The authors proposed that keeping information about both speakers helps keep the two streams separate."])
s(13, ["**Chen, Shi and Li (2023)** studied **selective attention during emergency wayfinding**, which is finding an escape route under stress.",
       "Participants navigated a virtual indoor emergency with a VR headset that tracked their eyes. | Activity of the **sympathetic nervous system** was the measure of stress.",
       "An **Eriksen flanker task** tested attention. | Participants responded to a central target and ignored neighboring stimuli that matched or conflicted with it.",
       "Better selective attention supported route finding. | Response time on the attention task **statistically mediated** the relationship between stress and wayfinding. This means differences in attention accounted for part of the link between stress and wayfinding."])
s(14, ["**Tiffin-Richards and Schroeder (2018)** studied how children reject **pseudohomophones**, which are misspellings that sound like real words. | GREAN sounds like GREEN.",
       "The **baseword frequency effect** is faster rejection of nonwords that are based on frequent words. | **Activation** brings the real word to mind. **Verification** checks the spelling shown against the stored spelling.",
       "German schoolchildren and adults both rejected nonwords based on frequent words faster. | Children were much less accurate, near guessing overall.",
       "Better spellers rejected the nonwords more accurately. | Bringing the real word to mind quickly is not the same as checking its spelling reliably. Strong **orthographic representations**, which are the stored spellings of words, support verification."])
s(15, ["**Rioja, Cekic, Bavelier and Baumgartner (2023)** examined **media multitasking**, which is using several media at once, and **sustained attention**, which is keeping focus over time. | There were three samples, from MTurk, from Prolific and from a university.",
       "The **Media Multitasking Index (MMI)** measures how many media are typically used together, weighted by the time spent with each.",
       "In the **GradCPT**, city and mountain pictures gradually replace one another. | Participants press for the frequent city pictures and withhold the response for the occasional mountains.",
       "Higher MMI scores were associated with more reported attention problems, impulsivity and sensation seeking, and with poorer task performance. | The association was strongest in the MTurk sample. A shorter measure asks how often multitasking happens, and it related less strongly to task performance.",
       "Attention differences were linked to using media at the same time, and not to total media hours alone."])
s(16, ["**Boroditsky, Fuhrman and McCormick (2011)** asked whether English and Mandarin speakers represent time differently. | Both languages use horizontal terms for time. Mandarin also uses “shàng,” meaning up, for earlier events and “xià,” meaning down, for later events.",
       "Participants saw two photographs and judged whether the second showed an earlier or later moment. | The response keys were arranged left and right or top and bottom.",
       "A **canonicality effect** is faster responding when the key arrangement fits the person’s spatial representation of time.",
       "Both groups responded faster with earlier on the left. Only Mandarin speakers also responded faster with earlier on top."])
s(17, ["An **orthographic neighborhood** is the set of words made by changing one letter of a word. | “Cat” has neighbors such as “bat,” “cot” and “can.” A **phonological neighborhood** changes one speech sound.",
       "In ordered recall, words with larger neighborhoods are remembered better than comparable words with fewer neighbors.",
       "Short words tend to have more neighbors, so word length and neighborhood size are **confounded**. | When neighborhood size is equated, the usual recall advantage for short words has been found to disappear."])
s(18, ["The **Brown-Peterson procedure** presents a **trigram**, which is a group of three letters, followed by a number. | Participants count backward by threes before recalling the letters.",
       "Counting blocks **maintenance rehearsal**, which is repeating the material to keep it available. | Recall drops steeply over about 15 to 20 seconds. **Decay** is forgetting with the passage of time.",
       "Recall is better on the first trial than on later trials. | **Proactive interference** is old information disrupting new information. **Retroactive interference** is new information disrupting old information."])
s(19, ["**Sperling** examined what remains available after a briefly flashed array of letters disappears.",
       "In **whole report**, observers try to report every letter and manage only a few.",
       "In **partial report**, a cue after the array names one row. | Observers can report most or all of that row, although they did not know which row would be asked for. More letters were available at first than whole report shows.",
       "The advantage of partial report declines as the cue is delayed over about one second. | **Sensory memory** briefly holds a rich trace that fades quickly."])
s(20, ["The **position error effect** concerns remembering an item and recalling it in the wrong place. | An item that was third is more likely to be recalled second or fourth than far from its position.",
       "Participants see letters one at a time and then click the letters in the remembered order.",
       "Recall is better near the beginning and the end of the list, which are **primacy** and **recency**. | Misplaced items stay close to where they belong."])
s(21, ["The **modality effect** is better recall of the final items of a list after hearing them than after reading them silently. | The advantage is only at the end of the list.",
       "Participants receive a random sequence of digits, spoken or displayed, and then click them in order.",
       "Hearing improves recall of the final items. | The recent sound gives additional information from **echoic memory**, which is the brief auditory trace. **Iconic memory** is the brief visual trace."])
