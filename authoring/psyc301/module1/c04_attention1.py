"""Collection 04 · Attention · Part 1 (source id 7). Version 22 wording, closing points and reasoning."""
ID = 7
S = {}
def s(page, points, closing, reason=None):
    S[page] = (points, closing, reason)

s(2, ["**Attention** is the ability to focus on specific stimuli or locations in our environment.",
      "**Selective attention** is attending to one thing while ignoring others. **Divided attention** is paying attention to more than one thing at a time.",
      "**Distraction** is one stimulus interfering with the processing of another. | **Attentional capture** is a rapid shift of attention, usually caused by a loud noise, a bright light or a sudden movement."],
  "This matters because the four terms are easy to mix up. | Two are about where attention is placed on purpose, and two are about what pulls it away.")
s(3, ["**Selective attention** is the ability to focus on one message and ignore others. | We do not attend to a large fraction of the information in the environment.",
      "We filter out some information and promote other information for further processing."],
  "This matters because a message can be present and still not be processed like the attended one. | The models of attention try to explain how selection works.")
s(4, ["**Colin Cherry (1953)** used **dichotic listening**. | One message is presented to the left ear and a different message to the right ear.",
      "The participant **shadows** one message, which means repeating it aloud as it arrives. | Shadowing ensures that attention is on that message."],
  "This matters because it tests whether the other message can be completely filtered out. | Researchers then test what is still available from the unattended ear.")
s(5, ["Participants could not report the content of the message in the unattended ear. | They knew that there was a message, and they knew the speaker’s gender.",
      "A change in gender or a change to a tone was noticed.",
      "Listening to one voice among many is the **cocktail party effect**."],
  "This matters because the unattended ear is processed at some level. | Physical properties were available even when the meaning was not.",
  "In Cherry (1953), both messages reached the ears, so what was reported depends on which message was attended.")
s(6, ["Models of selective attention ask where the filter is. | It could be early in processing or later.",
      "The **early selection** model is **Broadbent’s filter model (1958)**. The **intermediate selection** model is **Treisman’s attenuation theory (1964)**. **Late selection** is supported by **MacKay (1973)**."],
  "This matters because the three models differ on one point. | The point is whether meaning is analyzed before selection.")
s(7, ["Broadbent’s filter model is an early selection model. | It filters the message before the information is analyzed for meaning.",
      "**Sensory memory** holds all incoming information for a fraction of a second. | Both messages are registered at this stage."],
  "This matters because registering a message is not the same as understanding it. | The filter that comes next decides which message goes on.")
s(8, ["In Broadbent’s model, the **filter** identifies the attended message by its **physical characteristics**. | These include the ear it arrives at, its pitch and the voice.",
      "Only the attended message is passed to the next stage."],
  "This matters because this is what makes the model **early selection**. | The message is filtered before it is analyzed for meaning.")
s(9, ["The **detector** processes the information to determine higher-level characteristics of the message, including its **meaning**.",
      "The detector receives only the message that passed the filter."],
  "This matters because a blocked message should never reach the stage that analyzes meaning. | That is the prediction later studies tested.")
s(10, ["**Short-term memory** receives the output of the detector. | It holds information for about 10 to 15 seconds and may transfer it to long-term memory.",
       "The full sequence is sensory memory, filter, detector and short-term memory."],
  "This matters because the claim about attention depends on where the filter sits. | The filter comes before the detector and before short-term memory.")
s(11, ["Broadbent’s model is also called a **bottleneck model**, because the filter restricts the flow of information.",
       "The filter lets information through based on specific physical characteristics."],
  "This matters because the restriction comes before meaning. | The model predicts little access to the content of the rejected message.")
s(12, ["A strict filter has a problem, which is that participants’ names get through. | In **Moray (1959)**, about one third of listeners detected their own name in the unattended ear.",
       "Participants can also shadow meaningful messages that switch ears. | This was shown in the **“Dear Aunt Jane” experiment** of **Gray and Wedderburn (1960)**. The left ear received “Dear, 4, Jane.” The shadowed right ear received “8, Aunt, 2.”",
       "Participants reported “Dear Aunt Jane.”"],
  "This matters because both show meaning from the unattended ear. | A filter based only on physical characteristics cannot explain that.",
  "In Gray and Wedderburn (1960), “Dear” and “Jane” arrived at the ear that was not being shadowed, so reporting the whole phrase reflects following meaning across ears.")
s(13, ["**Treisman’s attenuation theory** is an **intermediate selection** model. | The attended message can be separated from the unattended message early, and selection can also occur later.",
       "The **attenuator** analyzes the incoming message by its physical characteristics, its language and its meaning. | It weakens the unattended message and does not remove it."],
  "This matters because it keeps the difference between attended and unattended messages and still lets some unattended meaning through. | That fits the results a strict filter could not explain.")
s(14, ["In Treisman’s theory, the attended message passes through the attenuator at full strength.",
       "A full strength message gives stronger input to the **dictionary unit**, so it is more likely to activate words."],
  "This matters because attention gives the selected message an advantage. | The contrast is between full strength and weakened, and not between on and off.")
s(15, ["The unattended message passes through at a much weaker strength. | It is **attenuated**, and it is not shut off.",
       "A weak message can still activate a word if that word’s **threshold** is low enough."],
  "This matters because it explains why an unattended name is sometimes noticed. | The rest of the unattended message stays hard to report.")
s(16, ["Treisman’s **dictionary unit** contains words, and each word has a **threshold** for being activated.",
       "Common or important words have low thresholds. Uncommon words have high thresholds.",
       "A person’s own name can have a low threshold, so it can be activated by a weakened message."],
  "This matters because two things decide whether a word is detected. | They are the strength of the message and the threshold of the word.")
s(17, ["Unattended inputs are attenuated and not shut off.",
       "Analysis follows an order. It goes from physical cues to syllable patterns, then specific words, then grammatical structure, then meaning."],
  "This matters because weakening a message limits how far it gets through these levels. | A low threshold word can still break through.")
s(18, ["In **late selection models**, selection for final processing does not occur until after the information has been analyzed for meaning.",
       "In **MacKay (1973)**, the attended ear heard “They were throwing stones at the bank.” | The unattended ear received either “river” or “money.”"],
  "This matters because it can be read in two ways. | If the unattended word changes how it is understood, the word was processed for meaning.")
s(19, ["In **MacKay (1973)**, participants chose which test sentence was closest in meaning to the attended sentence. | One test sentence was about the side of a river, and the other was about a savings and loan association.",
       "The meaning of the biasing word shifted the choice. | “River” favored the river sentence, and “money” favored the financial sentence.",
       "Participants were unaware that the biasing words had been presented."],
  "This matters because the unattended word was processed for meaning without awareness. | MacKay took this as evidence for late selection.",
  "In MacKay (1973), the attended sentence was the same in both conditions, so the shift in choice goes with the unattended biasing word.")
s(20, ["A late selection account says that all inputs receive full processing.",
       "Only important, task-relevant inputs enter short-term memory and lead to a response."],
  "This matters because it places the filter after meaning. | A message can be analyzed and still not be reportable.")
s(21, ["**Broadbent (1958)** proposed the filter model. Selection is early, before meaning is analyzed. Only the attended channel gets through, selected by physical features.",
       "**Treisman (1964)** proposed attenuation theory. Selection is intermediate. Unattended input is weakened, and low threshold words can still be activated.",
       "**Deutsch and Deutsch (1963)** and **MacKay (1973)** support late selection. Information is analyzed for meaning before selection controls response and awareness."],
  "This matters because each model is tied to its evidence. | Shadowing supports Broadbent. Own name detection and “Dear Aunt Jane” support Treisman. The biasing word supports late selection.")
s(22, ["There is no single answer to the early versus late controversy. | Early selection can be shown under some conditions, and late selection under others.",
       "Researchers now focus on the factors that control attention."],
  "This matters because the question changed. | The goal is to predict when unattended information will matter.")
s(23, ["**Automatic processes** are processes that do not demand attentional control.",
       "In a **visual search task**, a target with a distinctive feature is detected readily among the other items."],
  "This matters because a target that stands out does not need item by item inspection. | Automatic processing here helps performance.")
s(24, ["Automatic processes do not demand attentional control, but they can interfere with processes that do.",
       "In the **Stroop task**, reading the word interferes with naming the **ink color** when the word and the color conflict."],
  "This matters because automatic processing can help or hurt. | It depends on whether the automatic response is the one the task asks for.")
s(25, ["**Processing capacity** is how much information a person can handle at any given moment. | **Perceptual load** is the difficulty of a given task.",
       "High load tasks use more processing capacity. Low load tasks use less.",
       "When a task leaves spare capacity, task-irrelevant stimuli are processed and can interfere."],
  "This matters because **load theory** predicts when distraction happens. | Easy tasks leave spare capacity for distractors, and hard tasks leave less.")
s(26, ["In **Forster and Lavie (2008)**, a task-irrelevant stimulus slowed response time.",
       "The distraction was stronger for easier tasks than for harder tasks. | In the harder task, less perceptual capacity remains for the irrelevant stimulus."],
  "This matters because it is the evidence for load theory. | The cost of a distractor is larger when the main task leaves more capacity free.",
  "In Forster and Lavie (2008), a task-irrelevant stimulus was presented in both the easy and the hard task, so the larger slowing goes with the easier task.")
s(27, ["**Overt attention** shifts by moving the eyes. **Covert attention** shifts while the eyes stay fixed.",
       "**Saccades** are rapid eye movements from one place to another. **Fixations** are short pauses on points of interest. | An **eye tracker** measures both.",
       "**Central vision** is the area being looked at, and it falls on the **fovea**. **Peripheral vision** is off to the side. | The fovea has much higher resolution than the periphery."],
  "This matters because attention and eye position can be separated. | Looking at something and attending to it are not always the same.")
s(28, ["**Stimulus salience** refers to areas that stand out and capture attention. | It is a **bottom-up** process that depends on the physical characteristics of the stimulus.",
       "Color and motion are highly salient.",
       "**Attentional capture** is an involuntary shift of attention due to stimulus salience."],
  "This matters because attention can be driven by the image itself. | A sudden movement draws attention even when it has nothing to do with the current goal.")
s(29, ["**Top-down** determinants of eye movements are cognitive factors and the meaning of features.",
       "A **scene schema** is knowledge about what is contained in typical scenes. | Schemas help guide fixations from one area of a scene to another."],
  "This matters because people scan the same scene in different ways. | The guidance comes from expectations and goals, and not only from salience.")
s(30, ["A scene schema helps guide fixations from one area to another.",
       "**Võ and Henderson (2009)** compared how people viewed objects that were **semantically consistent** or **inconsistent** with a scene. | An object that does not belong is viewed differently from one that fits.",
       "**Fixation duration** measures part of that difference."],
  "This matters because eye movements reveal expectations about a scene. | The viewing pattern changes when an object breaks the schema.",
  "In Võ and Henderson (2009), the comparison was between objects that fit the scene and objects that did not, so the difference in viewing reflects whether the object fit the scene.")
s(31, ["Eye movements are influenced by the task.",
       "In meal preparation, gaze goes to the objects needed for the current or next action. | A useful object can be fixated even when something else is more conspicuous."],
  "This matters because changing it changes the scan pattern within the same scene. | It is top-down guidance of eye movements.")
s(32, ["**Precueing** is directing attention without moving the eyes.",
       "In **Posner and colleagues (1978)**, participants responded faster to a light at an expected location than at an unexpected location. | Their eyes stayed fixed."],
  "This matters because it is evidence for **covert attention**. | Keeping the eyes fixed rules out an eye movement as the reason.",
  "In Posner and colleagues (1978), the eyes stayed fixed in both conditions, so the faster response goes with where attention was directed.")
s(33, ["In **Posner and colleagues (1978)**, a **valid cue** indicates the location where the target appears. | An **invalid cue** directs attention somewhere else.",
       "Responses were faster after a valid cue than after an invalid cue."],
  "This matters because the difference shows attention without eye movements. | After an invalid cue, attention has to be moved to the real target.")
s(34, ["The **same-object advantage** shows that we can covertly attend to specific objects. | When attention is directed to one place on an object, its effect spreads to other places on that object.",
       "In **Egly and colleagues (1994)**, a cue was followed by a target at the cued position, at another position on the same object, or on a different object.",
       "The two uncued positions were the same distance from the cue."],
  "This matters because attention can select objects and not only locations. | Detection was faster within the same object.",
  "In Egly and colleagues (1994), the two uncued positions were equally far from the cue, so the faster detection comes from being on the same object.")
s(35, ["A is the cued position. C is another position on the same object, and B is equally far away on a different object. | Whether C has an advantage over B depends on which objects the positions belong to.",
       "In the changed arrangement, C has no advantage over B. | When A and C are on the same object again, the advantage returns."],
  "This matters because it links attention with perceptual organization. | Changing object membership removes or restores the benefit while distance stays comparable.")
s(36, ["Practice lets people do two things at once that were difficult at first.",
       "**Schneider and Shiffrin (1977)** divided attention between remembering a target and monitoring rapidly presented stimuli. | The **memory set** had one to four target characters. The **test frames** could contain random dot patterns, a target, or distractors."],
  "This matters because the task has two demands at once. | The target has to be held in memory while the frames are checked.")
s(37, ["The procedure starts with the target stimulus in the memory set. | It is followed by a series of 20 rapidly presented test frames.",
       "The participant decides whether a target from the memory set appeared in a frame."],
  "This matters because repeating the trials shows the effect of practice. | Each trial needs both remembering and monitoring.")
s(38, ["After about **600 trials**, the task had become automatic.",
       "Practice improved how well participants combined remembering the target and monitoring the frames."],
  "This matters because they show that practice produces **automatic processing**. | The practiced response needed less deliberate control.",
  "In Schneider and Shiffrin (1977), the task stayed the same across trials, so the improvement goes with the amount of practice.")
s(39, ["Schneider and Shiffrin suggested that practice made it possible to divide attention.",
       "**Automatic processing** occurs without intention and uses only some of a person’s cognitive resources.",
       "For skilled performers, paying attention to their own performance has sometimes been argued to make it worse."],
  "This matters because it explains how two tasks can be done together. | An automatic task leaves more capacity for the other task.")
s(40, ["Automatic processing is **task dependent**. | A task can be hard enough that automatic processing is never reached, even with practice.",
       "Automatic processing occurs without intention and still uses some cognitive resources."],
  "This matters because practice does not make every task automatic. | The difficulty of the task decides whether another activity can be added without interference.")

SUBJECT = {
    2: 'The four terms matter',
    3: 'Selection matters',
    4: 'Dichotic listening matters',
    5: 'The unattended ear matters',
    6: 'The location of the filter matters',
    7: 'Sensory memory matters',
    8: 'The filter matters',
    9: 'The detector matters',
    10: 'The order of the stages matters',
    11: 'The bottleneck matters',
    12: 'The two results matter',
    13: 'The attenuator matters',
    14: 'Full strength matters',
    15: 'Attenuation matters',
    16: 'The threshold matters',
    17: 'The order of analysis matters',
    18: 'The ambiguous sentence matters',
    19: 'MacKay’s result matters',
    20: 'Late selection matters',
    21: 'The comparison matters',
    22: 'The resolution matters',
    23: 'Automatic processing matters',
    24: 'The Stroop task matters',
    25: 'Perceptual load matters',
    26: 'The result matters',
    27: 'The distinction matters',
    28: 'Salience matters',
    29: 'Scene schemas matter',
    30: 'Fixation duration matters',
    31: 'The task matters',
    32: 'Precueing matters',
    33: 'The cue comparison matters',
    34: 'The same-object advantage matters',
    35: 'Object membership matters',
    36: 'The task matters',
    37: 'The procedure matters',
    38: 'The 600 trials matter',
    39: 'Automatic processing matters',
    40: 'Task dependence matters',
}
