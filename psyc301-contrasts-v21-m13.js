'use strict';
// Version 21 side-by-side contrasts, lecture 14 (Judgment, Decision, and Reasoning, Part II). Same pairs, terms and scores as Version 20.
(window.CONTRASTS_V21 = window.CONTRASTS_V21 || []).push(
{module:13,title:"Valid vs true",tier:"mid",score:8.5,
 a:{term:"Valid",definition:"The conclusion follows logically from the premises. It depends on the form of the reasoning."},
 b:{term:"True",definition:"The statements match the world."},
 blocks:[
  {text:"**Validity** and **truth** answer two separate questions. Validity asks whether the conclusion **follows logically from the premises**, so it depends on the **form** of the reasoning. Truth asks whether the statements **match the world**."},
  {text:"The two can come apart. For example, \"All birds are animals, all animals have four legs, therefore all birds have four legs\" is **valid**, but its conclusion is **false**, because the second premise is false. A valid argument does not guarantee a true conclusion, and an invalid argument can still have a true conclusion.",children:["Ask separately whether the conclusion follows and whether the statements are correct."]}
 ]},
{module:13,title:"Modus ponens vs modus tollens",tier:"mid",score:7.9,
 a:{term:"Modus ponens",definition:"If p then q; p; therefore q. Valid, and 97 percent judged it correctly."},
 b:{term:"Modus tollens",definition:"If p then q; not q; therefore not p. Valid, but only 60 percent judged it correctly."},
 blocks:[
  {text:"In **modus ponens**, you start with if p then q, affirm **p**, and conclude **q**. In **modus tollens**, you deny **q** and conclude **not p**. Both forms are **valid**.",children:["Ponens affirms p to get q.","Tollens denies q to get not p."]},
  {text:"They are not judged equally, though. **97 percent** judged modus ponens correctly, but only **60 percent** judged modus tollens correctly, so tollens feels harder. For example, \"If I study, I'll get a good grade; I didn't get a good grade; therefore I didn't study\" is valid, even though it feels less natural."},
  {text:"Both valid forms were still judged correctly more often than the invalid forms. Tollens is harder than ponens, but it is not in the same trouble as an invalid form."}
 ]},
{module:13,title:"Modus tollens vs syllogism 3",tier:"mid",score:7.9,
 a:{term:"Modus tollens",definition:"From if p then q, plus not q, you may conclude not p. This form is valid."},
 b:{term:"Syllogism 3",definition:"From if p then q, plus q, you may not conclude p. This form is not valid, and only 40 percent judged it correctly."},
 blocks:[
  {text:"Valid forms move from p to q, or from not q to not p. **Modus tollens** is the second kind, so it is valid. **Syllogism 3** goes from q back to p, which is **not valid**, and only **40 percent** judged it correctly."},
  {text:"Going from q back to p fails because there may be other ways to get q. For example, \"If I live in Tucson, I live in Arizona; I live in Arizona; therefore I live in Tucson\" does not follow. The first premise says what follows from being in Tucson. It does not say that Tucson is the only way to be in Arizona.",children:["Other routes to q mean that q cannot send you back to p."]}
 ]},
{module:13,title:"Syllogism 3 vs syllogism 4",tier:"mid",score:7.9,
 a:{term:"Syllogism 3",definition:"If p then q; q; therefore p. Not valid."},
 b:{term:"Syllogism 4",definition:"If p then q; not p; therefore not q. Not valid."},
 blocks:[
  {text:"**Syllogism 3** and **syllogism 4** are both **not valid**, and **40 percent** judged each one correctly. They differ only in the second premise. In syllogism 3 it is **q**, and in syllogism 4 it is **not p**."},
  {text:"Syllogism 4 reads: if p then q; not p; therefore not q. The first premise says nothing about what happens when p does not occur. For example, \"If I study, I'll get a good grade; I did not study; so I did not get a good grade\" does not follow, because a good grade could come another way.",children:["Denying p says nothing about q, since q can arise another way."]},
  {text:"Do not mistake these invalid forms for the valid forms that use the same premises."}
 ]},
{module:13,title:"Inductive vs deductive reasoning",tier:"low",score:3.6,
 a:{term:"Inductive reasoning",definition:"Reasoning from observations to conclusions that are probably but not definitely true."},
 b:{term:"Deductive reasoning",definition:"Determining whether a conclusion logically follows from the premises."},
 blocks:[
  {text:"**Inductive reasoning** goes from observations to conclusions that are **probably but not definitely true**. Its strength depends on the **representativeness**, **number** and **quality** of the observations. For example, many white swans support the expectation that the next swan is white, and one clearly observed black swan contradicts it.",children:["Induction gives probable conclusions that new evidence can overturn."]},
  {text:"**Deductive reasoning** asks a different question: whether a conclusion **logically follows** from the premises. It does not ask whether the conclusion is probable. Checking whether a conclusion follows from two premises is deductive, and the answer is either valid or invalid."}
 ]},
{module:13,title:"Abstract vs concrete Wason problem",tier:"mid",score:8.1,
 a:{term:"Abstract version",definition:"Cards E, K, 4, 7 with the rule vowel then even number. The correct cards are E and 7. 46 percent chose the 4 and only 7 percent chose the 7."},
 b:{term:"Concrete version",definition:"The rule is 'If drinking beer, then 21 years old', with cards Beer, Soda, 16 years old and 21 years old. The correct cards are beer and 16 years old, and 73 percent answered correctly."},
 blocks:[
  {text:"Both versions of the Wason problem have the same **if p then q** form. In the **abstract version**, the cards are E, K, 4 and 7, and the rule is vowel then even number. The correct cards are **E and 7**, yet **46 percent** chose the 4 and only **7 percent** chose the 7."},
  {text:"In the **concrete version**, the rule is \"If drinking beer, then 21 years old,\" with cards Beer, Soda, 16 years old and 21 years old. The correct cards are **beer and 16 years old**, and **73 percent** answered correctly. Familiar content calls up a **permission schema**, which makes the **falsification principle** easier to apply. Look for the situations that could falsify the rule, and someone drinking beer while under 21 is the case that breaks it.",children:["Same logical form, but 73 percent were correct with concrete content."]},
  {text:"Context matters, but familiarity alone does not explain the improvement. The permission schema is what helps."}
 ]},
{module:13,title:"Permission schema vs plain familiarity",tier:"low",score:6.4,
 a:{term:"Permission schema",definition:"Stored knowledge that if a condition is satisfied, an action may be carried out, for example that being 21 permits drinking beer. It leads you to check for anyone doing the action without the condition."},
 b:{term:"Plain familiarity",definition:"Simply having experience with the content. By itself it does not always improve reasoning."},
 blocks:[
  {text:"A **permission schema** is stored knowledge that if a condition is satisfied, an action may be carried out. For example, being 21 is the condition, and drinking beer is the action it permits. The schema leads you to check for anyone doing the action **without the condition**.",children:["A permission schema points you toward action without the condition."]},
  {text:"**Plain familiarity** is simply having experience with the content, and by itself it does not always improve reasoning. The improvement therefore does not come from familiarity alone. A permission rule is easier to reason about than an abstract rule about letters and numbers, because the setting calls up the schema."}
 ]},
{module:13,title:"Gain frame vs loss frame",tier:"high",score:10.1,
 a:{term:"Gain frame",definition:"Outcomes are described as people saved. Program A saves 200 for certain, while Program B has a 1/3 chance that all 600 are saved and a 2/3 chance that none are. 72 percent chose the sure A, a risk-averse choice."},
 b:{term:"Loss frame",definition:"The same outcomes are described as people who die. Program C means 400 die for certain, while Program D has a 1/3 chance that no one dies and a 2/3 chance that 600 die. 78 percent chose the gamble D, a risk-taking choice."},
 blocks:[
  {text:"In the **gain frame**, Program A saves **200 for certain**, while Program B has a **1/3 chance** that all 600 are saved and a **2/3 chance** that none are. **72 percent** chose the sure option, A, a risk-averse choice. In the **loss frame**, Program C means **400 die for certain**, while Program D has a **1/3 chance** that no one dies and a **2/3 chance** that 600 die. **78 percent** chose the gamble, D, a risk-taking choice.",children:["Gain wording pushed people toward the sure option.","Loss wording pushed people toward the gamble."]},
  {text:"Program A has the same outcome as C, and B is the same gamble as D, so only the **wording** changed (Tversky and Kahneman, 1981). In the gain frame, people avoid the uncertain option. In the loss frame, they accept uncertainty in the hope of avoiding a certain loss. With 600 people expected to die, the same facts led to opposite choices."}
 ]},
{module:13,title:"Opt-in vs opt-out",tier:"mid",score:7.7,
 a:{term:"Opt-in",definition:"You must take a step to be an organ donor. Consent is under 28 percent."},
 b:{term:"Opt-out",definition:"You are a donor unless you request otherwise. Consent is over 99 percent."},
 blocks:[
  {text:"Under **opt-in**, you must take a step to be an organ donor, and consent is **under 28 percent**. Under **opt-out**, you are a donor unless you request otherwise, and consent is **over 99 percent**."},
  {text:"The easiest way to see the difference is to ask what doing nothing gives you. Doing nothing leaves you a non-donor under opt-in and a donor under opt-out. The **status quo bias** is the tendency to do nothing when faced with a difficult decision, so the **default decides the result**.",children:["Doing nothing produces a different outcome under each default."]},
  {text:"The rates differ because of the default, not because of a difference in underlying attitude."}
 ]},
{module:13,title:"Expected emotions vs incidental emotions",tier:"high",score:10.2,
 a:{term:"Expected emotions",definition:"Emotions people predict they will feel about an outcome."},
 b:{term:"Incidental emotions",definition:"Emotions not specifically related to the decision, from disposition, recent experience or surroundings."},
 blocks:[
  {text:"**Expected emotions** are the emotions people predict they will feel about an outcome. They are predictions about the outcome itself. **Kermer and colleagues (2006)** studied predicted feelings about a coin flip."},
  {text:"**Incidental emotions** are not specifically related to the decision. They come from disposition, recent experience or surroundings, and they can still change the decision. **Lerner and colleagues (2004)** induced mood with a film clip. A person's general disposition also counts as an incidental source, so it can change a decision even when it has nothing to do with the choice.",children:["Incidental emotions come from something unrelated to the choice.","Even unrelated emotions can change the decision."]}
 ]},
{module:13,title:"Predicted vs actual feelings (Kermer, 2006)",tier:"high",score:9.5,
 a:{term:"Predicted feelings",definition:"Participants expected losing $3 to lower happiness about 4 points and winning $5 to raise it about 2."},
 b:{term:"Actual feelings",definition:"The actual drop from losing was about 1 point and the rise from winning about 1.2."},
 blocks:[
  {text:"**Kermer and colleagues (2006)** gave participants **$5** and a coin flip to win $5 more or lose $3. **Predicted feelings** were that losing $3 would lower happiness by about **4 points**, and that winning $5 would raise it by about **2**."},
  {text:"The **actual feelings** were much milder. The drop from losing was about **1 point**, and the rise from winning was about **1.2**. People overestimate the negative feeling because they do not account for the **coping mechanisms** that soften a loss.",children:["The real loss hurt far less than predicted.","Ignoring coping makes a loss seem worse than it feels."]},
  {text:"That gap feeds **risk aversion**, because people believe a loss will have a greater impact than a gain of the same size. Overpredicting the impact of a loss pushes people toward avoiding risk."}
 ]},
{module:13,title:"Sadness vs disgust: buying and selling prices (Lerner, 2004)",tier:"high",score:9.9,
 a:{term:"Sadness",definition:"Lowered the selling price to about $3.00 but raised the buying price to about $4.50."},
 b:{term:"Disgust",definition:"Lowered both prices: selling about $2.70 versus $4.50 neutral, and buying about $3.00 versus $3.50 neutral."},
 blocks:[
  {text:"In **Lerner and colleagues (2004)**, participants saw a sad clip of a person dying, a disgust clip of a dirty toilet, or a neutral clip of fish at the Great Barrier Reef. They then set prices for highlighters. The clips were unrelated to the choice, so they were **incidental emotions**, and they still changed how much the same object seemed worth."},
  {text:"**Sadness** lowered the selling price to about **$3.00**, but it raised the buying price to about **$4.50**. **Disgust** lowered both prices: selling about **$2.70** versus **$4.50** neutral, and buying about **$3.00** versus **$3.50** neutral.",children:["Sadness raised the buying price, while disgust lowered it.","Different negative emotions can push the same decision in different directions."]}
 ]},
{module:13,title:"Cloudy vs sunny days (Simonsohn, 2007, 2009)",tier:"high",score:9.5,
 a:{term:"Cloudy days",definition:"Applicants' academic attributes were weighted more heavily, and prospective students were more likely to enroll."},
 b:{term:"Sunny days",definition:"Academic attributes were weighted less heavily."},
 blocks:[
  {text:"The weather has nothing to do with the applicants or the school, but it still changed the decision. Surroundings such as the weather are **incidental emotions** in this sense. **Simonsohn (2007)** analyzed admissions decisions."},
  {text:"On **cloudy days**, applicants' academic attributes were weighted **more heavily**, and on **sunny days** they were weighted **less heavily**. **Simonsohn (2009)** found that visitors to a highly rated university were **more likely to enroll** if they came on a cloudy day.",children:["Cloudy days increased the weight on academics.","Sunny days decreased that weight."]},
  {text:"These are not decisions about the weather, which is why the effect counts as incidental. The weather changed the decision without being part of it."}
 ]},
{module:13,title:"Human vs computer partner (Sanfey, 2003)",tier:"mid",score:8.9,
 a:{term:"Human partner",definition:"An $8 and $2 offer was accepted about 53 percent of the time, and $9 and $1 about 37 percent."},
 b:{term:"Computer partner",definition:"The same offers were accepted about 85 percent and 68 percent."},
 blocks:[
  {text:"**Sanfey and colleagues (2003)** had participants play **20 games**, **10 with each partner type**. The offers were identical, and only the partner changed. With a **human partner**, an $8 and $2 offer was accepted about **53 percent** of the time, and a $9 and $1 offer about **37 percent**."},
  {text:"With a **computer partner**, the same offers were accepted about **85 percent** and **68 percent**. Participants became angry at unfair offers from a human, and they were less angry at an unfair computer. Fair offers were accepted almost every time for both partners.",children:["Anger at unfairness is weaker for a computer, so more unfair offers are accepted."]}
 ]},
{module:13,title:"Rational responder vs actual responder",tier:"low",score:6.8,
 a:{term:"Rational responder",definition:"According to utility theory, accept any offer, because even $1 is worth more than nothing."},
 b:{term:"Actual responders",definition:"Often rejected low offers, and participants with more right anterior insula activation rejected more, even though rejecting meant getting nothing."},
 blocks:[
  {text:"According to **utility theory**, a **rational responder** should accept any offer, because even **$1** is worth more than nothing. Actual responders did not behave this way. They often rejected low offers, and participants with more **right anterior insula** activation rejected more, even though rejecting meant getting nothing."},
  {text:"In the game, the proposer gets $10 and offers the responder a split, and if the responder rejects, neither player receives anything. In **Sanfey and colleagues (2003)**, fair offers of **$5 and $5** and **$7 and $3** were accepted almost every time, while lower offers were often rejected. **Emotion** plays an important role in decision making, and it can lead people to give up money. **Neuroeconomics** combines psychology, neuroscience and economics to study this.",children:["Rejecting is irrational by utility theory, yet it is common.","Emotion can make people give up money."]}
 ]},
{module:13,title:"Validity vs believability (belief bias and mental models)",tier:"mid",score:7,
 a:{term:"Validity",definition:"Asks whether the conclusion must follow if the premises are true. It depends on the form of the argument and not on what the words say."},
 b:{term:"Believability",definition:"Asks whether the conclusion sounds true given what you know. Belief bias is judging a syllogism valid because its conclusion is believable."},
 blocks:[
  {text:"**Validity** asks whether the conclusion must follow if the premises are true, so it depends on the **form** of the argument and not on what the words say. **Believability** asks whether the conclusion sounds true given what you know. These are separate questions.",children:["Validity is about form.","Believability is about what you know."]},
  {text:"**Belief bias** is answering the second question when asked the first, judging a syllogism valid because its conclusion is believable. **71 percent** judged invalid syllogisms with believable conclusions as valid. For example, \"All of the students are tired, some tired people are irritable, so some of the students are irritable\" seems reasonable but is invalid. A believable conclusion does not make a syllogism valid, and an unbelievable one does not make it invalid.",children:["Belief bias judges validity by believability.","71 percent called believable but invalid syllogisms valid."]},
  {text:"The **mental model** approach (**Johnson-Laird, 1999**) works as a safeguard. You build a model of the premises, form a tentative conclusion, and then search for an exception in which the premises hold but the conclusion fails. The conclusion is valid only if **no such model exists**."}
 ]},
{module:13,title:"Context of a decision (cesarean case)",tier:"mid",score:7.7,
 a:{term:"Seen alone",definition:"Physicians read the hypothetical cesarean test case by itself as the control."},
 b:{term:"Seen after other cases",definition:"Physicians read the same case after four cases with serious complications, or after four fairly routine cases."},
 blocks:[
  {text:"In the cesarean case, some physicians read the hypothetical test case **by itself**, as the control. Others read the same case **after four cases** with serious complications, or after four fairly routine cases."},
  {text:"**Significantly more doctors** recommended cesarean after reading the non-serious cases first. The earlier cases changed how the same patient was judged, which shows that decisions depend on **context** and on how choices are presented.",children:["Prior cases changed the judgment of an identical patient."]}
 ]},
{module:13,title:"Emotion as a help vs a hindrance in decisions",tier:"low",score:4.5,
 a:{term:"Emotion that helps",definition:"People with damage to an area of the prefrontal cortex who have flattened emotions have impaired decision making, so emotion takes part in decisions."},
 b:{term:"Emotion in excess",definition:"Anxious people tend toward risk avoidance, and optimistic people ignore negative information, which in excess can lead to poor decisions."},
 blocks:[
  {text:"**Emotion helps** decision making in a basic way. People with damage to an area of the prefrontal cortex who have **flattened emotions** have **impaired decision making**, so emotion takes part in decisions.",children:["Losing emotion impairs decisions, so emotion is part of deciding."]},
  {text:"**Emotion in excess** can lead to poor decisions. **Anxious people** tend toward risk avoidance, such as passing up choices that could lead to large negative consequences, and **optimistic people** ignore negative information. Emotions take part in decision making and do not only get in its way. Emotion is not simply the opposite of good decision making, because whether it helps depends on how it pushes the choice."}
 ]},
{module:13,title:"Categorical vs conditional syllogism",tier:"mid",score:7,
 a:{term:"Categorical syllogism",definition:"Describes the relation between two categories using all, no or some, such as All birds are animals, All animals eat food, therefore all birds eat food."},
 b:{term:"Conditional syllogism",definition:"Has a first premise of the form If p, then q, where p is the condition and q is what follows."},
 blocks:[
  {text:"Both kinds of syllogism have **two premises and a conclusion**, and Aristotle introduced the syllogism. A **categorical syllogism** describes the relation between two categories using **all, no or some**, such as \"All birds are animals, all animals eat food, therefore all birds eat food.\""},
  {text:"A **conditional syllogism** has a first premise of the form **if p, then q**, where p is the condition and q is what follows. For example, \"If I study, I'll get a good grade\" is a conditional first premise. The conditional kind has **four types** that differ in the second premise, **two valid and two not valid**. A syllogism can be invalid even when every statement seems reasonable.",children:["Conditional syllogisms start from if p then q.","There are four types, two valid and two not valid."]}
 ]}
);
