"""Collection 05 · Attention · Part 2 (source id 4). Version 22 wording, closing points and reasoning."""
ID = 4
S = {}
def s(page, points, closing, reason=None):
    S[page] = (points, closing, reason)

s(2, ["Cognitive psychology “in the wild” studies behavior with no experimenter present.",
      "The naturalistic driving work collected data in privately owned vehicles with unobtrusive instruments. | These included hidden radar, a face camera behind smoked glass, and other cameras about one inch by one inch.",
      "The design is **quasi-experimental**. | Researchers observe crashes that happen naturally and examine what was happening before each crash."],
  "This matters because they are evidence about attention from everyday driving. | The recordings show the seconds before an event.")
s(3, ["The **100-car study** collected crash, pre-crash, near-crash and conflict data in a naturalistic setting.",
      "One hundred drivers used their own or leased cars on public roads for up to **13 months**. | No experimenter was present.",
      "Drivers were not coached or told to do anything other than drive normally."],
  "This matters because the drivers behaved as close to unobserved as possible. | Periods of normal driving give a comparison for the hazardous events.")
s(4, ["The 100-car database held **42,300 hours** of driving, about two million miles. | It had 82 crashes and collisions, 761 near crashes, 8,295 incidents and 20,000 matched periods of normal baseline driving.",
      "A **crash or collision** is contact with another vehicle, a fixed object, a pedestrian, a pedalcyclist or an animal. | A **near crash** is a conflict that requires a rapid, severe evasive maneuver. An **incident** requires a smaller evasive maneuver."],
  "This matters because the three categories separate events by severity. | Each category can then be compared with baseline driving.")
s(5, ["In the 100-car results, **inattention to the forward roadway** was a primary contributing factor in many crashes.",
      "**80 percent of crashes** and **65 percent of near crashes** involved at least one form of inattention within three seconds before the conflict began.",
      "93 percent of lead-vehicle crashes and minor collisions involved looking away. | In 86 percent of those, the **headway** was greater than 2.0 seconds. Headway is the time gap between vehicles."],
  "This matters because they tie real crashes to where the driver was looking. | Drivers were looking away even when the gap to the car ahead was more than two seconds.")
s(6, ["Secondary tasks that are moderately to very complex, and driver drowsiness, carry the highest crash risk.",
      "The graphs compare crash, near-crash, incident and baseline periods on three measures. | They are the time the eyes were off the forward roadway, the number of glances away, and the mean length of the longest glance away."],
  "This matters because crash periods show more time looking away than baseline. | The three measures are different. One long glance is not the same as several short ones.")
s(7, ["With video recorders placed in cars, the risk of an accident was about **four times higher** during cell phone use. | This is an association and not an experiment.",
      "**Strayer and Johnston (2001)** used a simulated driving task. | Participants on a cell phone missed twice as many red lights and took longer to apply the brakes.",
      "The same pattern occurred with a **hands-free** cell phone."],
  "This matters because the problem is **divided attention**, and not holding the phone. | Freeing the hands does not remove the demands of the conversation.",
  "In Strayer and Johnston (2001), the driving task was the same with and without the phone, so the missed red lights go with the phone conversation.")
s(8, ["**Cartwright-Finch and Lavie (2007)** flashed a cross five times. | On each trial participants said which arm of the cross was longer.",
      "On the sixth trial a square was added. Only **10 percent** of participants saw it.",
      "**Inattentional blindness** is the failure to perceive an unattended stimulus, even when a person may be looking right at it."],
  "This matters because looking is not the same as seeing. | Attention stayed on the cross, and the square was missed.",
  "In Cartwright-Finch and Lavie (2007), the square was added to the display the participants were looking at, so missing it reflects attention being on the cross judgment.")
s(9, ["**Change blindness** occurs when differences between two versions of a picture are not immediately apparent.",
      "Finding the differences requires concentrated attention and search."],
  "This matters because change blindness is easy to confuse with inattentional blindness. | Change blindness is about a difference between two versions. Inattentional blindness is about an unexpected stimulus that is missed.")
s(10, ["**Levin and Simons (1997)** tested change detection during a visual event.",
       "Viewers can fail to notice a change and still understand the overall event."],
  "This matters because the failure is in noticing a difference across time. | The changed item is easy to see once it is pointed out.")
s(11, ["**Binding** is the process by which features such as color, form, motion and location are combined to create the perception of a coherent object.",
       "The visual system has to establish which properties belong together. | Detecting red, round and moving separately does not yet give one red moving ball."],
  "This matters because features are processed separately and have to be joined. | This is the **binding problem**. It connects with Gestalt and direct perception views.")
s(12, ["The binding problem is addressed by **Treisman’s feature integration theory**, or **FIT**.",
       "The sequence is object, **preattentive stage**, **focused attention stage** and perception. | The first stage analyzes the object into features. The second stage combines the features."],
  "This matters because the two stages make a prediction. | Features can be detected without being paired correctly.")
s(13, ["In the **preattentive stage**, the object is analyzed into features.",
       "The stage is automatic. | It needs no deliberate effort or attention, and the observer is unaware of it."],
  "This matters because the features are registered separately at first. | A color and a shape can both be available before they are joined.")
s(14, ["In the **focused attention stage**, attention plays a key role and the features are combined.",
       "Knowing which colors and shapes appeared is not the same as knowing which color belonged to which shape."],
  "This matters because it explains what attention adds. | With less attention, the features are still available and the pairing is less reliable.")
s(15, ["In the preattentive stage, a rolling red ball is analyzed into red color, round shape and movement to the right. | These features are processed by different mechanisms.",
       "In **Treisman and Schmidt (1982)**, participants reported combinations of features from different stimuli. | These are **illusory conjunctions**.",
       "The features are described as **free-floating**, which means they are not yet attached to their objects."],
  "This matters because the errors recombine features that were really shown. | The errors do not invent features.")
s(16, ["The display has a yellow vertical rectangle, a gray horizontal rectangle and a blue oval.",
       "Correct binding attaches each color to its own shape. | A report that combines properties from different objects is a **binding error**."],
  "This matters because it shows that a binding error uses real features. | The features in a binding error were all present.")
s(17, ["The stimulus has the black digits 1 and 8 together with four colored shapes. | The shapes are a small red triangle, a large blue triangle, a yellow circle and a green circle.",
       "Reporting the black digits first directs attention away from the colored shapes."],
  "This matters because the digit task competes with binding the shapes. | A conjunction error can then come from divided processing.")
s(18, ["The display separates **registering features** from **identifying objects**. | The features include yellow, gray, blue, vertical, horizontal and oval.",
       "Accurate perception needs the original combinations."],
  "This matters because FIT treats these as two steps. | Detecting features comes first, and binding them to the right object and location comes second.")
s(19, ["In **Treisman and Schmidt (1982)**, the image was flashed for one fifth of a second, which is 200 milliseconds. | It was followed by a **random dot mask**.",
       "Participants reported the black numbers first. Then they reported what they saw at each of the four locations of the shapes."],
  "This matters because each part of the procedure limits focused attention on the shapes. | The later reports test whether the features were bound correctly.")
s(20, ["In **18 percent of trials**, participants reported an object made of features from two different stimuli. | Examples are a small red circle or a small green triangle.",
       "Those colors and shapes were present, but not in that pairing."],
  "This matters because it is the main evidence for illusory conjunctions. | Registering features and binding them are separate when attention is limited.",
  "In Treisman and Schmidt (1982), the colors and shapes were all in the display, so the wrong pairings come from the limit on focused attention.")
s(21, ["FIT predicts illusory conjunctions. | In another brief display, participants reported digits first and then the letters and their colors. They mixed up letters and colors on **39 percent** of trials.",
       "They reported a letter or color that was absent on **15 percent** of trials. | The first is a binding error, and the second is an error in reporting a feature.",
       "Illusory conjunctions can occur even when the stimuli differ greatly in shape and size. | FIT also predicts **object-based attention**."],
  "This matters because they are different. | Binding errors occurred on 39 percent of trials, and absent features were reported on 15 percent.")
s(22, ["In the focused attention stage, the free-floating features are combined.",
       "Attending to an object combines its color, form and location."],
  "This matters because attention is what attaches features to the right object. | Without enough binding, features from different objects are combined.")
s(23, ["**R.M.**, a patient with **Balint’s syndrome**, was unable to focus attention on individual objects.",
       "R.M. reported a high number of illusory conjunctions."],
  "This matters because it is patient evidence for FIT. | A loss of focused attention went with the binding errors the theory predicts.",
  "R.M. could not focus attention on individual objects and made many illusory conjunctions, which is the error FIT predicts when focused attention is missing.")
s(24, ["FIT is mostly **bottom-up**, but **top-down** processing also contributes. | Being told what they would see helped participants perceive the objects accurately. An example is “You are being shown a carrot, a lake and a tire.”",
       "In **Treisman and Schmidt (1982)**, participants who ignored the black numbers and focused on the objects could pair shapes and colors correctly."],
  "This matters because two things improved binding without changing the objects. | One is knowledge of what to expect, and the other is where attention is placed.")
s(25, ["Attention enhances neural responding. | Attentional processing is distributed across a large number of brain areas.",
       "A **topographic map** is a spatial map of visual stimuli on the visual cortex. | Each point of a stimulus causes activity at a specific place on the cortex. Neighboring points cause activity at neighboring places."],
  "This matters because the map says where a location is represented. | Attention can then be tested by the strength of the response at that place.")
s(26, ["A topographic map keeps the order between positions in the visual field and positions in the visual cortex.",
       "The left and right visual fields project mainly to opposite hemispheres."],
  "This matters because it lets researchers connect an attended location with a place in the brain. | Nearby positions stay nearby on the map.")
s(27, ["During a search task, **fMRI** detects cortical activity.",
       "Attention to an expected direction of motion increases activity in a number of brain areas."],
  "This matters because attention is not handled at one point in the brain. | Its effect is distributed across the cortex.")
s(28, ["Visual patterns at locations A, B and C on a disk produce spatially organized activity.",
       "When the activity reaches higher visual areas, the observer perceives the patterns at A, B and C."],
  "This matters because it sets up a test of attention to a location. | Researchers can ask whether activity rises at the place that represents the attended location.")
s(29, ["**Datta and DeYoe (2009)** used fMRI to ask what happens when an observer pays attention to different locations on a disk.",
       "Activity increased in the areas that corresponded to the locations being attended."],
  "This matters because attention changed the strength of the neural response at a specific place. | The display stayed similar while the attended location changed.",
  "In Datta and DeYoe (2009), the display stayed similar, so the increase in activity goes with where the observer was attending.")
s(30, ["**Datta and DeYoe** created **attention maps** and trained classifiers to predict where a person was paying attention from the activity patterns.",
       "The classifiers predicted the attended location with **100 percent** accuracy in the task."],
  "This matters because the pattern of brain activity was enough to tell where attention was. | An attention map links an attended location with a pattern of activity.")
s(31, ["In **O’Craven and colleagues (1999)**, a face and a house were shown overlapping.",
       "Paying attention to the house increased activity in the **parahippocampal gyrus**. | Paying attention to the face increased activity in the **fusiform face area (FFA)**."],
  "This matters because both objects were present the whole time. | Attention changed which category-selective area responded more.",
  "In O’Craven and colleagues (1999), the face and the house were both in the display, so the change in activity reflects which one was attended.")
s(32, ["**William James (1890)** described attention as “the taking possession by the mind, in clear and vivid form, of one out of what seem several simultaneously possible objects or trains of thought.”",
       "He wrote that it “implies withdrawal from some things in order to deal effectively with others.”"],
  "This matters because the description already has both sides of attention. | The attended thing is processed well, and the other things are limited.")

SUBJECT = {
    2: 'Naturalistic data matter',
    3: 'The design matters',
    4: 'The three categories matter',
    5: 'The inattention figures matter',
    6: 'The glance measures matter',
    7: 'The hands-free result matters',
    8: 'Inattentional blindness matters',
    9: 'The distinction matters',
    10: 'The result matters',
    11: 'Binding matters',
    12: 'The two stages matter',
    13: 'The preattentive stage matters',
    14: 'The focused attention stage matters',
    15: 'Illusory conjunctions matter',
    16: 'The display matters',
    17: 'The digit task matters',
    18: 'The separation matters',
    19: 'The procedure matters',
    20: 'The 18 percent result matters',
    21: 'The two error types matter',
    22: 'Attention matters',
    23: 'The case of R.M. matters',
    24: 'Top-down help matters',
    25: 'The topographic map matters',
    26: 'The order of the map matters',
    27: 'The fMRI result matters',
    28: 'The disk display matters',
    29: 'The result matters',
    30: 'The attention maps matter',
    31: 'The overlapping display matters',
    32: 'James’ description matters',
}
