'use strict';
// Version 21 side-by-side contrasts, lecture 9 (Short-Term Memory). Same pairs, terms and scores as Version 20.
// Explanations use the slide terms as written, then explain them in connected sentences.
(window.CONTRASTS_V21 = window.CONTRASTS_V21 || []).push(
{module:6,title:"Whole report vs partial report",tier:"mid",score:8.1,
 a:{term:"Whole report",definition:"The person sees a flashed array of letters and names as many as they can. In Sperling's (1960) display, the array had 12 letters in three rows of four."},
 b:{term:"Partial report",definition:"A tone played after the display disappears tells the person which one row to name. The person cannot know in advance which row the tone will pick."},
 blocks:[
  {text:"In **whole report**, the person sees a flashed array of letters and names as many as they can. In **Sperling's (1960)** display, the array held **12 letters in three rows of four**, and people averaged about **4.5 of 12 letters**, or **37.5%**."},
  {text:"In **partial report**, a **tone played after the display disappears** tells the person which one row to name. Because the row is not known until after viewing, the person cannot memorize just one row in advance. Even so, people reported about **3.3 of 4 letters**, or **82%**, from whichever row was cued.",children:["Whole report asks for everything, so its result reflects what can be reported.","Partial report asks for one cued row, so its result reveals what was available."]},
  {text:"The contrast shows that the **whole-report limit** reflects how much can be reported before the trace fades, not how much was perceived. The 82% does not prove that every letter was stored perfectly, because it is accuracy on the cued row. What matters is that the tone came after the display was gone, so information about all the rows must have been available at the start."}
 ]},
{module:6,title:"Immediate vs delayed partial report",tier:"mid",score:8.1,
 a:{term:"Immediate partial report",definition:"The cue tone sounds right as the display ends, so the person selects the cued row while the trace is still strong. Accuracy was about 3.3 of 4 letters, or 82%."},
 b:{term:"Delayed partial report",definition:"The cue tone is held back by an extra delay before the person selects a row. Accuracy fell to about 1 of 4 letters, or 25%."},
 blocks:[
  {text:"In both conditions, the person selects a row after a cue tone. The only difference is the delay. In **immediate partial report**, the cue comes right as the display ends, and accuracy was about **3.3 of 4 letters**, or **82%**. In **delayed partial report**, the cue is held back, and accuracy fell to about **1 of 4 letters**, or **25%**."},
  {text:"Because the delay is the only thing that changes, the drop shows that the **sensory trace fades quickly**. As the cue is delayed, partial-report accuracy falls toward the **whole-report** level. In **Sperling (1960)**, the same cue that gave about 82% when it was immediate gave about 25% when it arrived after the delay.",children:["Longer delay produces lower accuracy, moving toward the whole-report level."]},
  {text:"This is why **sensory memory has a large capacity but a very short duration**, with most of the information lost within about **one second** unless it is selected. The drop does not mean the letters were never seen. It means the representation faded before the cue could be used to select from it.",children:["A large capacity does not protect information from fast decay."]}
 ]},
{module:6,title:"Sensory memory vs short-term memory",tier:"mid",score:8.9,
 a:{term:"Sensory memory",definition:"Briefly retains incoming stimulation for seconds or fractions of a second. It has a very large capacity but fades quickly unless attention selects part of it."},
 b:{term:"Short-term memory",definition:"Holds about five to seven items for roughly fifteen to twenty seconds. Rehearsal can keep the contents available and move them toward long-term memory."},
 blocks:[
  {text:"**Sensory memory** and **short-term memory** are two stores in **Atkinson and Shiffrin's (1968)** modal model, and they differ in how much they hold and how long they hold it. Sensory memory briefly retains incoming stimulation for seconds or fractions of a second, with a **very large capacity**. Short-term memory holds about **five to seven items** for roughly **fifteen to twenty seconds**.",children:["Sensory memory holds a great deal for an instant.","Short-term memory holds a small amount for longer."]},
  {text:"In **Sperling's (1960)** study, an immediate cue let people report almost any row, because so much was still in sensory memory. A delayed cue arrived after most of it had faded. **Attention** is what moves selected information from the first store into the second. For example, a phone directory floods sensory memory with many numbers, attention picks out the one you want, and rehearsing it keeps it in short-term memory long enough to dial.",children:["Attention is the gate between the two stores.","Rehearsal keeps the selected item available."]},
  {text:"It would be a mistake to describe short-term memory as a longer version of sensory memory. Sensory memory is large and fleeting, while short-term memory is small and depends on selection and rehearsal. The two stores differ in kind, not only in duration."}
 ]},
{module:6,title:"Icon vs echo",tier:"low",score:3.6,
 a:{term:"Icon",definition:"The fleeting visual trace left by stimulation. It is the visual form of sensory memory, shown by persistence of vision, such as a sparkler seeming to leave a trail."},
 b:{term:"Echo",definition:"The brief continuation of auditory information after a sound ends. It is the auditory form of sensory memory."},
 blocks:[
  {text:"An **icon** is the fleeting **visual** trace left by stimulation, and an **echo** is the brief continuation of **auditory** information after a sound ends. Both are forms of **sensory memory**. The only real difference is the sense involved, seeing for the icon and hearing for the echo."},
  {text:"**Persistence of vision**, such as a sparkler seeming to leave a trail, shows the icon at work. **Sperling (1960)** studied iconic memory with flashed letters. For the echo, think of how you can still replay the last few words someone said for a moment after they stop speaking.",children:["Each trace lingers briefly after the stimulus is gone."]},
  {text:"Both traces fade within seconds or fractions of a second. Neither is the durable representation used to remember something much later. A large capacity does not mean a long duration."}
 ]},
{module:6,title:"Decay vs interference",tier:"high",score:10.4,
 a:{term:"Decay",definition:"A memory trace weakens simply because time passes. It predicts the same loss at the same delay on every trial."},
 b:{term:"Interference",definition:"Other memories compete with the one being tested. It predicts that loss depends on how much competing material there is, not only on time."},
 blocks:[
  {text:"**Decay** says a memory trace weakens simply because **time passes**, so it predicts the same loss at the same delay on every trial. **Interference** says other memories compete with the one being tested, so the loss depends on **how much competing material there is**, not only on time."},
  {text:"In the **Brown (1958)** and **Peterson and Peterson (1959)** procedure, participants saw **three letters and a number** and counted backward by threes for **3 to 18 seconds**. Counting backward blocks rehearsal. Averaged over all trials, recall fell steadily, and Peterson and Peterson read that fall as decay.",children:["Backward counting blocks rehearsal, so the forgetting could be attributed to time."]},
  {text:"Trial by trial, though, recall at 18 seconds was relatively **high on trial 1**, lower by trial 3, and **very low after many trials**. The same delay did far more damage once more earlier sets had piled up. This trial-history pattern points to **proactive interference**, which **Keppel and Underwood (1962)** offered as the alternative account. A pattern that changes with trial history is evidence for interference, not decay alone.",children:["The same delay produces different recall, so time alone cannot explain the loss."]}
 ]},
{module:6,title:"Retroactive vs proactive interference",tier:"low",score:3.8,
 a:{term:"Retroactive interference",definition:"New information disrupts memory for older information. The memory that suffers is the old one, and the competitor arrived later."},
 b:{term:"Proactive interference",definition:"Old information disrupts memory for newer information. The memory that suffers is the new one, and the competitor arrived earlier."},
 blocks:[
  {text:"**Retroactive interference** is when **new information disrupts memory for older information**. The memory that suffers is the old one, and the competing information arrived later. **Proactive interference** is when **old information disrupts memory for newer information**. The memory that suffers is the new one, and the competing information arrived earlier."},
  {text:"To label a case, first identify **which information the person is trying to recall**. Then check whether the competing information came before or after it. Earlier competing material is proactive, and later competing material is retroactive. The direction of the harm is measured from the item being recalled, not from which memory is newer in general.",children:["Identify the target first, then decide whether the competitor came before or after it."]},
  {text:"For example, learning a new phone number and then struggling to recall the old one is retroactive. Remembering yesterday's parking spot and making today's spot hard to recall is proactive. Earlier trigrams that harm recall of the current trigram in **Brown (1958)** and **Peterson and Peterson (1959)** are also proactive. Similar, routine memories compete the most, and distinctive events are less affected by either kind."}
 ]},
{module:6,title:"Average over all trials vs trial-by-trial recall",tier:"mid",score:8.1,
 a:{term:"Average over all trials",definition:"Pools every trial together, so recall appears to drop steadily as the delay grows from 3 to 18 seconds, as though short-term memory simply decays."},
 b:{term:"Trial-by-trial recall",definition:"Looks at early and late trials separately. Early trials keep high recall even at 18 seconds, and later trials show very low recall at the same delay."},
 blocks:[
  {text:"The **average over all trials** pools every trial together, so recall appears to drop steadily as the delay grows from **3 to 18 seconds**, which looks like decay. **Trial-by-trial recall** looks at early and late trials separately. Early trials keep **high recall even at 18 seconds**, while later trials show **very low recall at the same delay**."},
  {text:"In **Brown (1958)** and **Peterson and Peterson (1959)**, recall at 18 seconds was relatively high on trial one, lower by trial three, and substantially reduced after many trials. The average blends early trials with high recall and late trials with very low recall, so it hides where the steep drop comes from.",children:["Averaging combines good early trials with poor late trials."]},
  {text:"The steep drop in the average comes mostly from the later trials, where **proactive interference** has built up. Averaging therefore makes interference look like decay. This is why the Brown-Peterson pattern is evidence for interference and not only for time-based decay."}
 ]},
{module:6,title:"Maintenance rehearsal vs elaborative rehearsal",tier:"low",score:4.5,
 a:{term:"Maintenance rehearsal",definition:"Repeating information, such as silently saying a label or number, to prolong how long it stays available in short-term memory."},
 b:{term:"Elaborative rehearsal",definition:"Linking new information to knowledge already in long-term memory, such as explaining how it relates to what you already know."},
 blocks:[
  {text:"**Maintenance rehearsal** is repeating information, such as silently saying a label or number, to prolong how long it stays available in **short-term memory**. It keeps information available only as long as the repeating continues."},
  {text:"**Elaborative rehearsal** is linking new information to **knowledge already in long-term memory**, such as explaining how it relates to what you already know. Because it adds meaning and connections, it supports learning that lasts longer. Explaining how the same label relates to something familiar is the elaborative version.",children:["Maintenance repeats the item, and elaboration connects it to what you know."]},
  {text:"Repetition alone is not the same as understanding. If the question emphasizes meaning or links to existing knowledge, the answer is elaborative. **Recoding** is a third control process, which reorganizes or modifies information that is already in short-term memory."}
 ]},
{module:6,title:"Miller's seven plus or minus two vs three to four items",tier:"mid",score:8.8,
 a:{term:"Seven plus or minus two units",definition:"Miller's (1956) estimate of short-term capacity, where a unit can be a digit, word, number or phrase, and the unit differs across tasks."},
 b:{term:"About three to four items",definition:"Alvarez and Cavanagh's (2004) estimate for visual short-term memory from change detection, where accuracy falls sharply above roughly four items."},
 blocks:[
  {text:"**Miller's (1956)** estimate of short-term capacity is **seven plus or minus two units**. A unit can be a digit, word, number or phrase, and the unit changes from task to task. Because units can hold different amounts of information, the estimate does not show that every system holds exactly seven raw items."},
  {text:"**Alvarez and Cavanagh (2004)** estimated **about three to four items** for visual short-term memory using change detection. The first array was shown for **100 milliseconds**, the second for **2,000 milliseconds**, and participants judged whether the two arrays matched. Accuracy fell sharply above roughly four items. Colored squares gave a higher estimated capacity than complex polygons or shaded cubes.",children:["Visual change detection gives a smaller estimate, and the estimate depends on object complexity."]},
  {text:"The numbers come from different sources. **Five to seven** is the modal-model estimate for short-term memory, **seven plus or minus two** is Miller's estimate, and **three to four** is Alvarez and Cavanagh's estimate for visual objects. Each number belongs to its own source and task, so seven should not be treated as a universal limit for visual memory."}
 ]},
{module:6,title:"Single item vs chunk",tier:"high",score:10,
 a:{term:"Item",definition:"One basic unit, such as a single digit, letter or word."},
 b:{term:"Chunk",definition:"A larger meaningful unit built from smaller ones, such as a familiar group of digits."},
 blocks:[
  {text:"An **item** is one basic unit, such as a single digit, letter or word. A **chunk** is a larger meaningful unit built from smaller ones, such as a familiar group of digits. **Chunking** lets each slot in short-term memory carry more information, so the same limited number of slots holds more."},
  {text:"For example, **Ericsson and colleagues (1980)** trained a student to reach a digit span of **79** by treating strings of digits as familiar **running times**, so each running time became one chunk. The gain came from knowledge-based organization, not from enlarging every raw limit.",children:["Familiar knowledge creates the chunks."]},
  {text:"A large span after training does not mean the memory system itself grew. It means each unit holds more information."}
 ]},
{module:6,title:"Episodic vs semantic memory",tier:"low",score:4.8,
 a:{term:"Episodic memory",definition:"Memory for personal events tied to a particular time and place. Tulving described it as a kind of mental time travel."},
 b:{term:"Semantic memory",definition:"Memory for facts and general knowledge that is not tied to the moment you learned them."},
 blocks:[
  {text:"**Episodic memory** is memory for **personal events tied to a particular time and place**. **Tulving** described it as a kind of mental time travel. **Semantic memory** is memory for **facts and general knowledge** that is not tied to the moment you learned them. Episodic memory answers what happened to you then, and semantic memory answers what you know."},
  {text:"For example, remembering one particular birthday party is episodic, and knowing what a birthday is is semantic. The party is an event, and the concept is a fact.",children:["Both are branches of declarative memory inside long-term memory."]},
  {text:"The other major branch of long-term memory is **procedural memory**, which concerns skills. The memory tree classifies these systems by **function**, not by how long they last. Episodic and semantic memory both sit in long-term memory, so neither is an additional short-term store."}
 ]},
{module:6,title:"Duration vs capacity",tier:"mid",score:8.7,
 a:{term:"Duration",definition:"How long information stays available in short-term memory, roughly fifteen to twenty seconds without rehearsal."},
 b:{term:"Capacity",definition:"How much information can be held at once, traditionally about seven plus or minus two units."},
 blocks:[
  {text:"**Duration** is how long information stays available in short-term memory, roughly **fifteen to twenty seconds** without rehearsal. **Capacity** is how much information can be held at once, traditionally about **seven plus or minus two units**. A question about how long is a question about duration, and a question about how much is a question about capacity."},
  {text:"Each property can be changed by a strategy. **Rehearsal prolongs duration**, and **chunking raises effective capacity**. Counting backward blocks rehearsal in **Brown (1958)** and **Peterson and Peterson (1959)**, so a trigram is lost within about fifteen to twenty seconds. **Ericsson and colleagues (1980)** raised a digit span to **79** by chunking.",children:["Rehearsal affects duration.","Chunking affects capacity."]},
  {text:"When a result changes, identify which strategy was used before deciding which property changed. Mixing up duration and capacity is a common mistake."}
 ]},
{module:6,title:"Short-term memory vs long-term memory",tier:"mid",score:8.9,
 a:{term:"Short-term memory",definition:"Holds about five to seven items for roughly fifteen to twenty seconds and is easily disrupted by interruption and interference."},
 b:{term:"Long-term memory",definition:"Retains large amounts of information for years or even decades."},
 blocks:[
  {text:"**Short-term memory** holds about **five to seven items** for roughly **fifteen to twenty seconds**, and it is easily disrupted by interruption and interference. **Long-term memory** retains large amounts of information for **years or even decades**. The two systems differ in both capacity and duration, so long-term memory should not be treated as simply more short-term memory."},
  {text:"**Rehearsal** moves information from short-term toward long-term memory, and **retrieval** moves it back. For example, you look up a phone number, repeat it to keep it in short-term memory, and later retrieve it from long-term memory to dial it. The flow goes in both directions.",children:["Rehearsal moves information toward long-term memory.","Retrieval moves it back into short-term memory."]},
  {text:"Short-term memory is the active window on the present, and long-term memory is the large store of knowledge kept outside current awareness."}
 ]},
{module:6,title:"Declarative vs procedural memory",tier:"low",score:4.5,
 a:{term:"Declarative memory",definition:"Long-term memory for events and knowledge, with two branches: episodic memory for events and semantic memory for facts."},
 b:{term:"Procedural memory",definition:"Long-term memory for skills."},
 blocks:[
  {text:"**Declarative memory** is long-term memory for events and knowledge, with two branches, **episodic memory** for events and **semantic memory** for facts. **Procedural memory** is long-term memory for **skills**. Episodic and semantic memory are both inside declarative memory."},
  {text:"The memory tree sorts long-term memory by **function**, not by how long things last. Declarative memory is knowledge you can state, and procedural memory is knowledge you show by doing.",children:["Declarative memory is knowing that.","Procedural memory is knowing how."]},
  {text:"For example, knowing what a bicycle is belongs to declarative memory, and knowing how to ride one belongs to procedural memory."}
 ]},
{module:6,title:"Encoding, storage and retrieval failure",tier:"low",score:6.7,
 a:{term:"Encoding and storage",definition:"Encoding converts information into a form that can be stored, and storage keeps it."},
 b:{term:"Retrieval",definition:"Bringing stored information back out when it is needed."},
 blocks:[
  {text:"**Encoding** converts information into a form that can be stored, and **storage** keeps it. **Retrieval** is bringing stored information back out when it is needed. A failure to remember could come from a problem at any of these three operations."},
  {text:"Forgetting by itself does not show which operation failed. For example, forgetting a familiar name could mean the name was never encoded well, was lost from storage, or cannot be retrieved at the moment. A failure alone does not identify the stage.",children:["The same failure can have more than one cause."]},
  {text:"Memory is also an active system that can organize and alter information, so it is not a recording that stays unchanged."}
 ]},
{module:6,title:"Simple vs complex objects in visual short-term memory",tier:"mid",score:8.8,
 a:{term:"Simple objects",definition:"Objects such as colored squares need little information to represent, so more of them can be held."},
 b:{term:"Complex objects",definition:"Objects such as polygons, shaded cubes or Chinese-character-like forms need more information to represent, so fewer can be held."},
 blocks:[
  {text:"**Simple objects**, such as colored squares, need little information to represent, so more of them can be held. **Complex objects**, such as polygons, shaded cubes or Chinese-character-like forms, need more information to represent, so fewer can be held."},
  {text:"**Alvarez and Cavanagh (2004)** found that same-different performance depends on how complex the stimuli are. In the change-detection task, colored squares supported a higher estimated capacity than shaded cubes. Capacity is therefore limited by the amount of information needed to represent the objects.",children:["The estimated capacity shrinks as complexity rises."]},
  {text:"A capacity estimate for one kind of stimulus does not apply to every visual object. Each object should not be counted as an equally sized item, because capacity depends on object complexity."}
 ]}
);
