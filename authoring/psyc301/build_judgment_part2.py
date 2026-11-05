"""Append collection 14 from the supplied Judgment, Decision, and Reasoning Part II PDF, preserving earlier content."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sections=[]
def section(page,title,*paragraphs):
    sections.append(dict(page=page,title=title,bullets=list(paragraphs),image=page-1))
section(1,'Judgment, Decision, and Reasoning · Part II · title')
sections[-1]['sourceOnly']=True
section(2,'Emotions shape decisions',
 '<strong>Emotions</strong> take part in decision making rather than only getting in its way. <strong>People with damage to an area of their prefrontal cortex, who suffer from flattened emotions, have impaired decision making.</strong> Flattened emotions are emotions that are weakened, so the person feels much less than usual. When emotion is reduced in this way, decisions get worse rather than better.',
 '<strong>Anxious people tend to avoid making decisions that could potentially lead to large negative consequences.</strong> This pattern is <strong>risk avoidance</strong>. A choice that carries the chance of a large loss feels too threatening to an anxious person, so that option is passed up even when it might turn out well.',
 '<strong>Optimistic people are more likely to ignore negative information and focus on positive information.</strong> Some optimism can be useful, but <strong>too much optimism can lead to poor decision making</strong>. A person who sets aside the negative information about a choice is deciding without the whole picture, so the decision is more likely to go wrong.')
section(3,'Expected emotions and risk aversion',
 '<strong>Expected emotions</strong> are <strong>emotions that people predict they will feel concerning an outcome</strong>. Before choosing, a person imagines how a good result or a bad result would feel. Those predicted feelings then guide which option the person is willing to take.',
 '<strong>Expected emotions are one of the determinants of risk aversion</strong>, and <strong>risk aversion</strong> is <strong>the tendency to avoid taking risks</strong>. A person who expects to feel very bad after a loss is less willing to accept a chance of that loss. The prediction about feelings, rather than the outcome alone, pushes the person toward the safer option.',
 '<strong>People inaccurately predict their emotions.</strong> In particular, people show a <strong>tendency to believe that a particular loss will have a greater impact than a gain of the same size</strong>, and that belief <strong>increases risk aversion</strong>. Because a loss is expected to hurt more than an equal gain would help, people turn down risks that would be reasonable if the two were weighed evenly.')
section(4,'Kermer and colleagues compared expected and actual emotions',
 '<strong>Kermer and colleagues (2006)</strong> <strong>compared people’s expected emotions with their actual emotions</strong>. Participants were <strong>given $5</strong> and <strong>told that, based on a coin flip, they would either win an additional $5 or lose $3</strong>. They <strong>rated their happiness before the experiment started</strong>, and that rating served as each person’s baseline.',
 'Participants then <strong>predicted how they would feel if they won or lost</strong>. Before the coin flip, they expected losing $3 to lower their happiness by about 4 points below baseline and winning $5 to raise it by about 2 points. The expected loss was about twice the size of the expected gain, even though the loss was the smaller amount of money.',
 'After the coin flip, the actual drop from losing was only about 1 point, and the actual rise from winning was about 1.2 points. Participants <strong>overestimated their negative feeling</strong>, since losing hurt far less than they had predicted. <strong>People usually have coping mechanisms that get activated, but they do not consider them when predicting emotions.</strong> Those coping mechanisms soften the real feeling after a loss, which is why the prediction misses.')
section(5,'Incidental emotions and the weather',
 '<strong>Incidental emotions</strong> are <strong>emotions that are not specifically related to decision making</strong>. They <strong>may be related to one’s general disposition or personality, some recent experience, or one’s general environment or surroundings</strong>. A disposition is a person’s usual emotional tendency, a recent experience can leave a mood behind, and the surroundings, such as the weather, can change how a person feels while deciding.',
 '<strong>Simonsohn (2007)</strong> analyzed <strong>university admissions decisions</strong> and found that <strong>applicants’ academic attributes were more heavily weighted on cloudy days than on sunny days</strong>. The weather had nothing to do with the applicants. It still changed what the people making the decisions paid the most attention to.',
 '<strong>Simonsohn (2009)</strong> found that <strong>prospective students visiting an academically highly rated university were more likely to enroll if they had visited the campus on a cloudy day</strong>. The weather on the day of the visit is unrelated to the quality of the school. These findings place weather among the incidental factors that can carry into important decisions.')
section(6,'Lerner and colleagues: mood changes buying and selling prices',
 '<strong>Lerner and colleagues (2004)</strong> had participants view one of three film clips. The <strong>sad condition</strong> clip was of <strong>a person dying</strong>, the <strong>disgust condition</strong> clip was of <strong>a person using a dirty toilet</strong>, and the <strong>neutral</strong> clip was of <strong>fish at the Great Barrier Reef</strong>. Each clip set up a different mood before any decision was made.',
 'Participants were then <strong>given a set of highlighters</strong> and <strong>asked to determine a price</strong>. One price was <strong>what they would be willing to sell the highlighters for</strong>, and the other was <strong>what they would be willing to pay to buy them</strong>. The clips had nothing to do with highlighters, so any difference in price came from the mood the clip produced.',
 'For the <strong>selling price</strong>, the neutral group asked about $4.50, the disgust group about $2.70 and the sad group about $3.00. For the <strong>buying price</strong>, the neutral group offered about $3.50, the disgust group about $3.00 and the sad group about $4.50. Disgust lowered both prices, while sadness lowered the selling price and raised the buying price above the neutral group.',
 'These results support the conclusion that <strong>a person’s mood can influence decision making</strong>. The emotions came from film clips that were unrelated to the choice, which makes them incidental emotions. Even so, they changed how much the same object seemed worth.')
section(7,'Earlier cases change a physician’s decision',
 '<strong>Decisions can depend on the context within which they are made.</strong> <strong>Physicians were presented with a hypothetical test case involving a possible candidate for cesarean section</strong>, a surgical delivery of a baby. The test case itself was always the same, and only what came before it changed across <strong>three different contexts</strong>.',
 'In the <strong>control</strong> context, <strong>the test case was presented first</strong>. In the <strong>serious previous cases</strong> context, <strong>the test case was preceded by four other cases in which there were serious complications</strong>. In the <strong>not serious previous cases</strong> context, <strong>the test case was preceded by four other cases that were fairly routine</strong>.',
 '<strong>Significantly more doctors recommended cesarean after reading about non-serious cases first.</strong> Because the test case did not change, the difference in recommendations came from the cases read just before it. The context of a decision includes the other cases a person has recently considered, and those cases changed how the same patient was judged.')
section(8,'Opt-in, opt-out, and the status quo bias',
 '<strong>Decisions depend on how choices are presented.</strong> In an <strong>opt-in procedure</strong>, a person must take an <strong>active step to be an organ donor</strong>, and <strong>countries with opt-in procedures have less than a 28% consent rate</strong>. In an <strong>opt-out procedure</strong>, a person is an <strong>organ donor unless they request not to be</strong>, and <strong>countries with opt-out procedures have over a 99% consent rate</strong>.',
 'The <strong>status quo bias</strong> is <strong>the tendency to do nothing when faced with a difficult decision</strong>. Under opt-in, doing nothing leaves a person as a non-donor, and under opt-out, doing nothing leaves a person as a donor. Since many people do nothing either way, the consent rates end up far apart.',
 'The short story <strong>The International Community</strong> presents a choice of the same kind. <strong>A chicken, a duck, a turkey, a pheasant, a quail and a partridge were summoned and traveled together to the summit</strong>, where <strong>the king’s chef</strong> told them he had called them <strong>so they could tell him what sauce they would like to be eaten with</strong>. When one bird said it did not want to be eaten at all, the chef answered that <strong>that is out of the question</strong>, so the only choice offered was which sauce.')
section(9,'The framing effect',
 'The <strong>framing effect</strong> is when <strong>decisions are influenced by how a decision is stated</strong>. The way a choice is stated <strong>can highlight one aspect of the situation</strong>, such as what might be gained or what might be lost. The facts of the choice can stay the same while the statement changes what people focus on.',
 '<strong>Tversky and Kahneman (1981)</strong> studied how framing changes the amount of risk people accept. <strong>When situations are framed in terms of gains, people tend toward a risk-aversion strategy</strong>, which means they prefer the sure option. <strong>When situations are framed in terms of losses, people tend toward a risk-taking strategy</strong>, which means they prefer the gamble.',
 'A <strong>risk-aversion strategy</strong> avoids an uncertain outcome in favor of a certain one. A <strong>risk-taking strategy</strong> accepts an uncertain outcome in the hope of avoiding a certain loss. The same people can switch between the two strategies depending only on whether the outcomes are described as gains or as losses.')
section(10,'Risky Decisions Lab')
sections[-1]['sourceOnly']=True
section(11,'The gain frame favors the sure option',
 'In this problem, <strong>a disease is expected to kill 600 people</strong>, and <strong>two alternative programs to combat the disease have been proposed</strong>. The outcomes are stated in terms of people saved, which makes this the gain frame.',
 'With <strong>Program A</strong>, <strong>200 people will be saved</strong> for certain. With <strong>Program B</strong>, there is <strong>a 1/3 probability that 600 people will be saved and a 2/3 probability that no people will be saved</strong>. Program A is the sure option, and Program B is the gamble.',
 '<strong>72% chose Program A</strong>, and 28% chose Program B. When the outcomes were described as lives saved, most people avoided the risk and took the certain result. That choice fits the risk-aversion strategy that the gain frame encourages.',
 'Program A keeps 200 of the 600 people alive for certain, which is one third of the people at risk. Program B puts all 600 lives on a single chance, with a 1/3 chance that everyone is saved and a 2/3 chance that no one is. Choosing A means giving up the chance to save everyone in exchange for certainty.')
section(12,'The loss frame favors the gamble',
 'In the second version, the same disease is expected to kill 600 people, and two programs are again proposed. This time the outcomes are stated in terms of people who will die, which makes this the loss frame.',
 'With <strong>Program C</strong>, <strong>400 people will die</strong> for certain. With <strong>Program D</strong>, there is <strong>a 1/3 probability that no one will die and a 2/3 probability that 600 people will die</strong>. Program C is the sure option, and Program D is the gamble.',
 '<strong>78% chose Program D</strong>, and 22% chose Program C. Program C has the same outcome as Program A, since saving 200 of 600 people means that 400 die, and Program D is the same gamble as Program B. Only the wording changed, yet the majority switched from the sure option to the gamble, which is the framing effect.',
 'Program C means that 400 of the 600 people die for certain, which is two thirds of the people at risk. Program D accepts a 2/3 chance that all 600 die in exchange for a 1/3 chance that no one dies. Choosing D means taking a risk to avoid a certain loss, which is the risk-taking strategy that a loss frame encourages.')
section(13,'Neuroeconomics',
 '<strong>Neuroeconomics</strong> <strong>combines research from psychology, neuroscience, and economics</strong>. Psychology contributes how people think and decide, neuroscience contributes what happens in the brain, and economics contributes how choices about money and value are analyzed.',
 '<strong>One finding is that decisions are influenced by emotions, and those emotions are associated with activity in specific areas of the brain.</strong> This finding connects the emotional side of decisions to measurable brain activity. Emotion is part of the decision process, and its effects can be traced to particular brain areas.',
 'Neuroeconomics therefore asks how emotion and brain activity shape economic choices, such as whether to accept a sum of money. A choice that looks purely economic can depend on how a person feels about it, and those feelings have a basis in the brain.')
section(14,'The ultimatum game',
 '<strong>Sanfey and coworkers (2003)</strong> used the <strong>ultimatum game</strong>, which has <strong>two players</strong>, a <strong>proposer</strong> and a <strong>responder</strong>. The <strong>proposer gets $10</strong> and <strong>makes an offer to the responder as to how this money should be split</strong>.',
 'The <strong>responder can accept or reject the offer</strong>. <strong>If the responder rejects it, neither player receives anything</strong>, so a rejection costs both players. If the responder accepts, the money is divided the way the proposer offered. Because the proposer decides the split and the responder decides whether anyone gets paid, each player’s outcome depends on the other player’s choice. A low offer leaves the responder deciding between a small amount of money and nothing at all.',
 'According to <strong>utility theory</strong>, <strong>the rational decision for the responder</strong> is to <strong>accept any offer</strong>. Utility theory judges a choice by the value of its outcome, and any offer, even $1, is worth more than the nothing that comes from rejecting. The way real responders behave can then be compared with that standard.')
section(15,'Sanfey and coworkers: unfair offers and the anterior insula',
 'In <strong>Sanfey’s experiment</strong>, <strong>participants played 20 separate games</strong>, <strong>10 with human partners and 10 with computer partners</strong>. Offers of $5 and $5 and of $7 and $3 were accepted almost every time, at about 100% and about 95% for both kinds of partner.',
 'Lower offers separated the two kinds of partner. An offer of $8 and $2 was accepted about 53% of the time from a human and about 85% from a computer. An offer of $9 and $1 was accepted about 37% of the time from a human and about 68% from a computer.',
 'Participants <strong>often rejected low offers because they became angry that the offers were unfair</strong>, and they were <strong>less angry with an unfair computer</strong>. That is why the same low offer was accepted more often when a computer made it.',
 'Participants with <strong>more activation of the right anterior insula</strong>, an area <strong>connected with emotional states</strong>, were <strong>more likely to reject more offers</strong>. Rejecting an offer meant getting nothing, so the emotion linked to this area led people to give up money. <strong>Emotion is important in decision making.</strong>')
section(16,'Deductive reasoning and syllogisms',
 '<strong>Deductive reasoning</strong> is <strong>determining whether a conclusion logically follows from premises</strong>. A premise is a statement that the reasoning starts from. Deductive reasoning is concerned with whether the conclusion follows from those premises.',
 'A <strong>syllogism</strong> is <strong>the basic form of deductive reasoning</strong>, and it was <strong>introduced by Aristotle</strong>. A syllogism has <strong>two statements called premises</strong> and <strong>a third statement called the conclusion</strong>, and the conclusion is what the reasoning arrives at from the two premises.',
 'A <strong>categorical syllogism</strong> <strong>describes the relation between two categories using all, no, or some</strong>. In one example, <strong>Premise 1</strong> is <strong>All birds are animals</strong>, <strong>Premise 2</strong> is <strong>All animals eat food</strong>, and the <strong>conclusion</strong> is <strong>Therefore, all birds eat food</strong>. Birds fall inside the category of animals, and animals fall inside the category of things that eat food, so birds fall inside that category too.')
section(17,'Validity is not truth',
 '<strong>A syllogism is valid if its conclusion follows logically from its two premises.</strong> <strong>If the two premises of a valid syllogism are true, the syllogism’s conclusion must be true.</strong> Validity depends on the form of the reasoning, while truth depends on whether the statements match the world.',
 '<strong>Validity should not be confused with truth.</strong> The syllogism <strong>All birds are animals</strong>, <strong>All animals have four legs</strong>, <strong>All birds have four legs</strong> is <strong>valid</strong>, because it has <strong>the same form as the first example</strong>. Its conclusion is false only because the second premise is false.',
 '<strong>Validity is about whether the conclusion logically follows from the premises.</strong> <strong>If it does, and the premises are true, then the conclusion must be true.</strong> A valid form with a false premise can still produce a false conclusion, so a valid syllogism does not guarantee a true conclusion on its own.')
section(18,'Judging validity and belief bias',
 '<strong>The difference between validity and truth can make it difficult to judge whether reasoning is logical or not.</strong> <strong>Valid syllogisms can result in false conclusions</strong>, and <strong>syllogisms can be invalid even though each of the premises and the conclusion seem reasonable</strong>.',
 'In the syllogism <strong>All of the students are tired</strong>, <strong>Some tired people are irritable</strong>, <strong>Some of the students are irritable</strong>, every statement sounds reasonable. The syllogism is still <strong>not valid</strong>, because the conclusion does not follow from the premises.',
 'People make <strong>many errors in evaluation</strong>, because <strong>good reasoning and truth are not the same thing</strong>. <strong>Belief bias</strong> is <strong>the tendency to think that a syllogism is valid if its conclusion is believable</strong>. <strong>71% of participants judged invalid syllogisms with believable conclusions as valid</strong>, so a believable conclusion led most people to accept reasoning that did not hold.')
section(19,'Solving problems by imagining the situation',
 '<strong>There is no easy method for determining whether a syllogism is valid or invalid.</strong> People therefore need some way to work out what follows from a set of statements. One way is to picture the situation the statements describe.',
 'In the pool table problem, <strong>there is a black ball directly above the cue ball</strong>, <strong>the green ball is on the right side of the cue ball</strong>, and <strong>there is a red ball between them</strong>. The speaker then moves so the red ball is between the speaker and the black ball, and the task is to say which side of the speaker’s line of sight the cue ball is on.',
 'The answer is that the cue ball is to the <strong>left</strong> of the line of sight. Picturing the table puts the black ball above the cue ball, with the red ball and then the green ball to the cue ball’s right. Standing so the red ball blocks the black ball means looking past it toward the black ball, and from there the cue ball sits off to the left.',
 '<strong>Most people solve this by imagining the way the balls are arranged on the pool table.</strong> <strong>The idea that people can imagine situations is the basis of Johnson-Laird’s proposal that people use mental models to solve deductive reasoning problems.</strong>')
section(20,'The mental model approach',
 'In the <strong>mental model approach (Johnson-Laird, 1999)</strong>, a <strong>mental model</strong> is <strong>a specific situation represented in a person’s mind that can be used to help determine the validity of syllogisms in deductive reasoning</strong>. The person builds a picture of the situation described by the premises and reasons from that picture.',
 'The person first <strong>creates a model of the situation</strong> and then <strong>generates tentative conclusions about the model</strong>, which are conclusions that might hold. Next the person <strong>looks for exceptions to falsify the model</strong>, which means searching for a case where the premises are true but the conclusion is not. Finally the person <strong>determines the validity of the syllogism</strong> from whether any exception was found.',
 '<strong>A conclusion is valid only if it cannot be refuted by any model of the premises.</strong> To refute a conclusion is to prove that it can be false. If even one model fits the premises but not the conclusion, the conclusion does not follow, so searching for exceptions is how a person can reject an invalid conclusion.')
section(21,'Conditional syllogisms',
 '<strong>Conditional syllogisms</strong> <strong>have two premises and a conclusion</strong>, and <strong>the first premise is of the form If p, then q</strong>. The letter p stands for a condition, and q stands for what follows when that condition is met.',
 '<strong>There are four major types of conditional syllogism.</strong> All four share the same first premise, If p, then q. They differ in the second premise, which states either p, not p, q or not q, and in the conclusion drawn from it. Syllogism 1 goes from p to therefore q, syllogism 2 from not q to therefore not p, syllogism 3 from q to therefore p, and syllogism 4 from not p to therefore not q.',
 'Two of the four types are valid and two are not. Telling them apart depends on whether the conclusion truly follows from If p, then q together with the second premise, and people judge some of the types correctly far more often than others.')
section(22,'Conditional syllogism 1 is modus ponens',
 '<strong>Conditional syllogism 1</strong> is called <strong>modus ponens</strong>. The premises are <strong>If I study, I’ll get a good grade</strong> and <strong>I studied</strong>, and the conclusion is <strong>Therefore, I’ll get a good grade</strong>.',
 'In letters, the first premise is If p, then q, the second premise is p, and the conclusion is therefore q. Since the condition p is met, what follows from it, q, has to follow too. With any content at all, a premise of the form If p, then q together with p leads to q, and that is what makes this form valid.',
 'This syllogism is <strong>valid</strong>, and <strong>97%</strong> of participants judged it correctly. Modus ponens is the easiest of the four types for people to evaluate. Nearly everyone accepts that studying, together with the rule that studying leads to a good grade, means the good grade follows.')
section(23,'Conditional syllogism 2 is modus tollens',
 '<strong>Conditional syllogism 2</strong> is called <strong>modus tollens</strong>. The premises are <strong>If I study, I’ll get a good grade</strong> and <strong>I didn’t get a good grade</strong>, and the conclusion is <strong>Therefore, I didn’t study</strong>.',
 'In letters, the first premise is If p, then q, the second premise is not q, and the conclusion is therefore not p. If studying always leads to a good grade, then missing the good grade means the studying did not happen. With any content, If p, then q together with not q leads to not p, so this form is valid even though it reasons from a result that did not happen back to a condition that did not happen.',
 'This syllogism is <strong>valid</strong>, but only <strong>60%</strong> of participants judged it correctly. Modus tollens is just as valid as modus ponens, yet people find it much harder to evaluate.')
section(24,'Conditional syllogism 3 is not valid',
 'In <strong>conditional syllogism 3</strong>, the premises are <strong>If I study, I’ll get a good grade</strong> and <strong>I got a good grade</strong>, and the conclusion is <strong>Therefore, I studied</strong>. In letters, the second premise is q and the conclusion is therefore p.',
 'This syllogism is <strong>not valid</strong>, and only <strong>40%</strong> of participants judged it correctly. The first premise says what happens when someone studies, but it does not say that studying is the only way to get a good grade.',
 'The same form with different content is <strong>If I live in Tucson, then I live in Arizona</strong>, <strong>I live in Arizona</strong>, <strong>Therefore, I live in Tucson</strong>. With this content the conclusion is easier to see as not following, since a person can live in Arizona without living in Tucson.')
section(25,'Conditional syllogism 4 is not valid',
 'In <strong>conditional syllogism 4</strong>, the premises are <strong>If I study, I’ll get a good grade</strong> and <strong>I didn’t study</strong>, and the conclusion is <strong>Therefore, I didn’t get a good grade</strong>. In letters, the second premise is not p and the conclusion is therefore not q.',
 'This syllogism is <strong>not valid</strong>, and only <strong>40%</strong> of participants judged it correctly. The first premise says nothing about what happens when someone does not study, so not studying does not settle whether the grade was good. A person could get a good grade for some other reason, so the conclusion does not follow.',
 'Across the four types, the two valid syllogisms were judged correctly at 97% and 60%, while the two invalid ones were judged correctly at 40% each. Both valid types were judged correctly more often than both invalid types.')
section(26,'The Wason four-card problem',
 'The <strong>Wason four-card problem</strong> tests the <strong>effect of using real-world items in a conditional-reasoning problem</strong>. Four cards read <strong>E</strong>, <strong>K</strong>, <strong>4</strong> and <strong>7</strong>, and the task is to <strong>determine the minimum number of cards to turn over to test the rule if there is a vowel on one side, then there is an even number on the other side</strong>.',
 '<strong>E needs to be turned over.</strong> <strong>46% of participants indicated that 4 would need to be turned over</strong>, which is an error. <strong>Only 7% indicated that 7 needs to be turned over</strong>, which is correct.',
 'A 7 with a vowel on its other side would break the rule, so turning over the 7 is a real test of it. A 4 cannot break the rule whatever is on its back, so turning it over does not test the rule. The answer is therefore to turn over the E and the 7.')
section(27,'The falsification principle and the concrete version',
 'The <strong>falsification principle</strong> states that <strong>to test a rule, you must look for situations that falsify the rule</strong>. To falsify a rule is to prove that it is false. <strong>Most participants fail to do this</strong>, which is why so few chose the 7 card.',
 '<strong>When the problem is stated in concrete everyday terms, correct responses greatly increase.</strong> In the concrete version, the rule is <strong>If drinking beer, then 21 years old</strong>, and the four cards read <strong>Beer</strong>, <strong>Soda</strong>, <strong>16 years old</strong> and <strong>21 years old</strong>.',
 '<strong>73%</strong> of participants answered this version correctly. The rule has the same if p, then q form as the vowel and number rule, but it is about familiar items, and that change raised correct responses far above the 7% who chose the 7 card in the abstract version. Following the falsification principle, the cards to turn over are <strong>beer</strong> and <strong>16 years old</strong>, because someone drinking beer while under 21 is the only case that breaks the rule.')
section(28,'Permission schemas',
 'A <strong>permission schema</strong> is the idea that <strong>if A is satisfied, B can be carried out</strong>. A schema is a familiar pattern of knowledge, and a permission schema is the pattern of a rule that grants permission once a condition is met.',
 '<strong>Permission schemas are used in the concrete versions</strong>, since <strong>people are familiar with rules</strong> of this kind, such as a drinking age. A rule that grants permission is easier to reason about than an abstract rule about letters and numbers. In the beer version, being 21 years old is the condition that must be satisfied, and drinking beer is what can then be carried out.',
 '<strong>Context is important</strong>, because the same logical problem becomes easier in a familiar setting that calls up a permission schema. <strong>Familiarity is not always important</strong>, so the improvement does not come from familiarity alone.')
questions=[]
def question(page,kind,stem,correct,*distractors,why):
    assert len(distractors)==3
    questions.append(dict(id=7001+len(questions),module=13,page=page,kind=kind,stem=stem,options=[correct,*distractors],correct=0,why=why))
question(2,'application','A patient with prefrontal damage reports feeling very little emotion and makes a series of poor choices. Which conclusion fits the finding about flattened emotions?',
 'Reduced emotion is linked to impaired decision making, so emotion contributes to good decisions.',
 'Reduced emotion improves decisions because choices are then made without any feeling interfering.',
 'Prefrontal damage affects decisions only when the patient is also highly optimistic.',
 'Flattened emotions change memory for past choices but leave new decisions unaffected.',why='People with damage to an area of the prefrontal cortex who suffer from flattened emotions have impaired decision making. Weakened emotion goes with worse decisions, not better ones.')
question(2,'definition','An anxious investor refuses any option that could lead to a large loss, even one with a good chance of success. What is this pattern called?',
 'Risk avoidance, the tendency of anxious people to avoid decisions with potentially large negative consequences.',
 'The status quo bias, the tendency to choose whichever option was presented first.',
 'Belief bias, the tendency to accept a conclusion because it is believable.',
 'The framing effect, the tendency to prefer gains that are stated as losses.',why='Anxious people tend to avoid making decisions that could potentially lead to large negative consequences. That pattern is labeled risk avoidance.')
question(3,'definition','Before accepting a bet, a person imagines how disappointed they would feel if they lost. What kind of emotion is this?',
 'An expected emotion, an emotion a person predicts they will feel concerning an outcome.',
 'An incidental emotion, an emotion produced by the weather on the day of the bet.',
 'A permission schema, a familiar rule that grants permission once a condition is met.',
 'A flattened emotion, an emotion weakened by damage to the prefrontal cortex.',why='Expected emotions are emotions that people predict that they will feel concerning an outcome. They are one of the determinants of risk aversion.')
question(3,'application','A person believes that losing $20 would hurt much more than winning $20 would help, and so declines an even bet. Which statement explains the choice?',
 'Believing a loss will have a greater impact than an equal gain increases risk aversion.',
 'Believing a gain will have a greater impact than an equal loss increases risk aversion.',
 'Expected emotions affect only risk taking and never the avoidance of risk.',
 'People predict their emotions accurately, so the choice reflects the true size of the feelings.',why='The tendency to believe that a particular loss will have a greater impact than a gain of the same size increases risk aversion. People also inaccurately predict their emotions.')
question(3,'design','Which comparison would directly test the claim that people inaccurately predict their emotions?',
 'Compare the feelings people predict for an outcome with the feelings they report after the outcome happens.',
 'Compare how many people choose a sure option when outcomes are stated as gains rather than losses.',
 'Compare consent rates in countries that use opt-in and opt-out procedures.',
 'Compare how often people turn over the E card and the 4 card in the four-card problem.',why='An inaccurate prediction can be identified only by setting the predicted emotion beside the actual emotion. Kermer and colleagues made exactly this comparison.')
question(4,'researcher','In Kermer and colleagues (2006), participants were given $5 and then flipped a coin. What were the possible outcomes of the flip?',
 'They would either win an additional $5 or lose $3.',
 'They would either win an additional $3 or lose $5.',
 'They would either double the $5 or lose all of it.',
 'They would either keep the $5 or give it to another participant.',why='Participants were given $5 and told that, based on a coin flip, they would either win an additional $5 or lose $3. They rated their happiness before the experiment and predicted how they would feel.')
question(4,'researcher','What did Kermer and colleagues (2006) find when they compared predicted and actual feelings about losing?',
 'People overestimated their negative feeling, since losing hurt much less than they predicted.',
 'People underestimated their negative feeling, since losing hurt much more than they predicted.',
 'Predicted and actual feelings about losing were identical in size.',
 'Losing raised happiness above baseline, while winning lowered it.',why='Before the flip, people expected losing to lower happiness by about 4 points, but the actual drop was only about 1 point. They overestimated their negative feeling.')
question(4,'application','Why did participants in the coin-flip study predict their feelings so poorly?',
 'Coping mechanisms get activated after a loss, but people do not consider them when predicting emotions.',
 'Participants forgot the size of the possible loss before making their predictions.',
 'The happiness scale did not allow participants to report any negative feelings.',
 'Participants were told in advance that they would win, so losing came as a surprise.',why='We usually have coping mechanisms that get activated, but we do not consider them when predicting emotions. Those mechanisms soften the actual feeling after a loss.')
question(4,'design','In the coin-flip study, the expected drop from losing $3 was about twice the expected rise from winning $5. Why is this pattern notable?',
 'The loss was the smaller amount of money, yet it was expected to affect happiness more than the larger gain.',
 'The gain was the smaller amount of money, so a smaller expected rise is exactly what the amounts predict.',
 'The two amounts were equal, so any difference in expected feeling reflects random error.',
 'The expected changes were measured after the flip, so they describe actual rather than predicted feelings.',why='Losing $3 is less money than winning $5, but people expected the loss to change happiness about twice as much. This fits the belief that losses have a greater impact than gains.')
question(5,'definition','A person in a bad mood from a traffic jam makes a quick hiring decision later that day. What kind of emotion could be affecting the decision?',
 'An incidental emotion, one not specifically related to the decision that comes from a recent experience.',
 'An expected emotion, one the person predicts they will feel about the hiring outcome.',
 'A sacred value, one treated as beyond any tradeoff with money.',
 'A mental model, a represented situation used to test validity.',why='Incidental emotions are emotions that are not specifically related to decision making. They may be related to disposition or personality, some recent experience, or the general environment.')
question(5,'researcher','What did Simonsohn (2007) find in university admissions decisions?',
 'Applicants’ academic attributes were more heavily weighted on cloudy days than on sunny days.',
 'Applicants’ academic attributes were more heavily weighted on sunny days than on cloudy days.',
 'Admissions decisions were unaffected by the weather on the day they were made.',
 'Applicants who visited on cloudy days were less likely to be admitted.',why='Simonsohn (2007) found that academic attributes were weighted more heavily on cloudy days. The weather, an incidental factor, changed what the decision makers emphasized.')
question(6,'researcher','In Lerner and colleagues (2004), which clip created the disgust condition?',
 'A clip of a person using a dirty toilet.',
 'A clip of a person dying.',
 'A clip of fish at the Great Barrier Reef.',
 'A clip of a person selling highlighters.',why='The sad clip showed a person dying, the disgust clip showed a person using a dirty toilet, and the neutral clip showed fish at the Great Barrier Reef.')
question(6,'researcher','Compared with the neutral group, how did sadness affect prices in Lerner and colleagues (2004)?',
 'Sadness lowered the selling price and raised the buying price.',
 'Sadness raised the selling price and lowered the buying price.',
 'Sadness lowered both the selling price and the buying price.',
 'Sadness left both prices at the neutral level.',why='The sad group asked about $3.00 to sell, below the neutral $4.50, and offered about $4.50 to buy, above the neutral $3.50.')
question(6,'design','Why do the highlighter prices in Lerner and colleagues (2004) count as evidence about incidental emotions?',
 'The film clips had nothing to do with highlighters, so price differences came from mood unrelated to the decision.',
 'The film clips were about highlighters, so the price differences reflect expected emotions about owning them.',
 'Every group saw the same clip, so the differences must come from personality alone.',
 'Participants chose their own clip, so mood was matched to the price they preferred.',why='Each clip set up a mood that was unrelated to the highlighters. A change in price after an unrelated clip means that a person’s mood can influence decision making.')
question(7,'researcher','Physicians judged the same cesarean test case in three contexts. After which context did significantly more doctors recommend cesarean?',
 'After reading four fairly routine, non-serious cases first.',
 'After reading four cases with serious complications first.',
 'When the test case was presented first, as the control.',
 'After reading the test case twice in a row.',why='Significantly more doctors recommended cesarean after reading about non-serious cases first. The test case did not change, so the preceding cases changed the decision.')
question(7,'design','Why does the cesarean study support the claim that decisions depend on context?',
 'The test case was identical in every condition, and only the cases read before it changed.',
 'The test case changed in every condition, while the earlier cases stayed the same.',
 'Physicians in each condition were told which answer the researchers expected.',
 'Each physician saw a different patient, so differences reflect the patients.',why='Holding the test case constant and varying only the preceding cases isolates the effect of context on the recommendation.')
question(8,'application','A country switches from requiring people to sign up as organ donors to counting everyone as a donor unless they request otherwise. What change in consent is expected?',
 'A rise from under 28% toward over 99%, because people tend to do nothing either way.',
 'A drop from over 99% toward under 28%, because people resist the new default.',
 'No change, because people decide about donation based only on its benefits.',
 'A rise only among people who were already anxious about donation.',why='Opt-in countries have less than 28% consent and opt-out countries have over 99%. The status quo bias, doing nothing when facing a difficult decision, keeps people in whichever option is the default.')
question(8,'definition','What is the status quo bias?',
 'The tendency to do nothing when faced with a difficult decision.',
 'The tendency to choose the gamble when outcomes are framed as losses.',
 'The tendency to judge a syllogism valid when its conclusion is believable.',
 'The tendency to weight academic attributes more on cloudy days.',why='The status quo bias is the tendency to do nothing when faced with a difficult decision, which is why the default option in organ donation matters so much.')
question(8,'application','In the story The International Community, the chef asks the birds which sauce they want to be eaten with. What does the chef’s reply to the bird that does not want to be eaten indicate about the choice?',
 'The only choice offered was which sauce, and not being eaten was never one of the options presented.',
 'The birds were free to choose not to be eaten if they asked politely.',
 'The chef let the birds choose between being eaten and being released.',
 'The birds chose the sauce themselves before being summoned to the summit.',why='The chef answers that not being eaten is out of the question. The choices presented were limited to sauces, which connects to the point that decisions depend on how choices are presented.')
question(9,'definition','What is the framing effect?',
 'Decisions are influenced by how a decision is stated.',
 'Decisions are influenced only by the probabilities of the outcomes.',
 'Decisions are influenced by the weather on the day they are made.',
 'Decisions are influenced by how many premises a syllogism has.',why='The framing effect is that decisions are influenced by how a decision is stated, which can highlight one aspect of the situation such as gains or losses.')
question(9,'researcher','According to Tversky and Kahneman (1981), how do people tend to respond when a situation is framed in terms of losses?',
 'They tend toward a risk-taking strategy.',
 'They tend toward a risk-aversion strategy.',
 'They tend to do nothing because of the status quo bias.',
 'They tend to reject every option offered.',why='When situations are framed in terms of gains, people tend toward risk aversion, and when they are framed in terms of losses, people tend toward risk taking.')
question(11,'researcher','In the gain version of the disease problem, which program did most people choose?',
 'Program A, in which 200 people will be saved, chosen by 72%.',
 'Program B, the 1/3 chance of saving 600 people, chosen by 72%.',
 'Program A, in which 400 people will die, chosen by 78%.',
 'Program B, the 2/3 chance of saving everyone, chosen by 78%.',why='With outcomes stated as lives saved, 72% chose the sure Program A and 28% chose the gamble, Program B.')
question(12,'researcher','In the loss version of the disease problem, which program did most people choose?',
 'Program D, the gamble with a 1/3 chance that no one dies, chosen by 78%.',
 'Program C, in which 400 people will die, chosen by 78%.',
 'Program D, the gamble, chosen by 22%.',
 'Program C, in which 200 people will be saved, chosen by 72%.',why='With outcomes stated as deaths, 78% chose the gamble, Program D, and 22% chose the sure Program C.')
question(12,'application','Program A saves 200 of 600 people for certain, and Program C means 400 of 600 people die for certain. Why does the shift from 72% choosing A to 22% choosing C count as framing?',
 'A and C have the same outcome, so only the wording changed between the two versions.',
 'A saves more people than C, so the shift reflects the better outcome of A.',
 'C has a higher probability of success than A, so the shift is rational.',
 'A and C were offered to different diseases, so the two choices cannot be compared.',why='Saving 200 of 600 people means that 400 die, so A and C are the same outcome. The majority choice changed only because the outcome was stated as saving rather than dying.')
question(13,'definition','Which fields does neuroeconomics combine?',
 'Psychology, neuroscience, and economics.',
 'Psychology, linguistics, and philosophy.',
 'Neuroscience, logic, and computer science.',
 'Economics, sociology, and anthropology.',why='Neuroeconomics combines research from psychology, neuroscience, and economics. One finding is that decisions are influenced by emotions associated with activity in specific brain areas.')
question(13,'application','A researcher records brain activity while people decide whether to accept money. Which finding from neuroeconomics would the researcher expect to build on?',
 'Decisions are influenced by emotions, and those emotions are associated with activity in specific brain areas.',
 'Decisions about money are purely rational and show no link to emotional brain activity.',
 'Brain activity during decisions reflects only the size of the amount offered.',
 'Emotion affects decisions only when people are told how a choice is framed.',why='One finding of neuroeconomics is that decisions are influenced by emotions, and those emotions are associated with activity in specific areas of the brain.')
question(14,'application','In the ultimatum game, what happens if the responder rejects the proposer’s offer?',
 'Neither player receives anything.',
 'The proposer keeps the whole $10.',
 'The responder receives the whole $10.',
 'The money is split evenly between the players.',why='The proposer gets $10 and offers a split. The responder can accept or reject it, and if the responder rejects, neither player receives anything.')
question(14,'design','Why does the rule that a rejection leaves both players with nothing make the ultimatum game useful for studying emotion in decisions?',
 'Rejecting an offer has a real cost, so a rejection points to something other than the money driving the choice.',
 'Rejecting an offer earns the responder more money, so rejections point to greed.',
 'The proposer must accept the responder’s counteroffer, so both players always gain.',
 'The amount of money changes every round, so responders cannot compare offers.',why='Because a rejection costs both players, choosing to reject means giving up money. That makes it possible to see when something like anger, rather than the money, drives the decision.')
question(15,'researcher','In Sanfey and coworkers (2003), how were low offers from computer partners treated compared with the same offers from human partners?',
 'Low offers from computers were accepted more often, because participants were less angry with an unfair computer.',
 'Low offers from computers were rejected more often, because participants distrusted machines.',
 'Low offers were treated identically regardless of the type of partner.',
 'Computer partners never made low offers, so no comparison was possible.',why='An $8 and $2 offer was accepted about 53% of the time from a human but about 85% from a computer. Participants were less angry with an unfair computer.')
question(15,'researcher','In Sanfey and coworkers (2003), which brain finding was linked to rejecting more offers?',
 'More activation of the right anterior insula, an area connected with emotional states.',
 'Less activation of the right anterior insula, an area connected with language.',
 'More activation of the hippocampus, an area connected with memory for numbers.',
 'Damage to the prefrontal cortex, which flattens emotion.',why='Participants with more activation of the right anterior insula, which is connected with emotional states, were more likely to reject more offers.')
question(16,'definition','What is deductive reasoning?',
 'Determining whether a conclusion logically follows from premises.',
 'Reaching probable conclusions from repeated observations.',
 'Choosing between alternatives based on expected emotions.',
 'Judging the probability of an event by how easily examples come to mind.',why='Deductive reasoning is determining whether a conclusion logically follows from premises. The syllogism is its basic form.')
question(17,'application','All birds are animals. All animals have four legs. Therefore, all birds have four legs. How should this syllogism be evaluated?',
 'It is valid, because the conclusion follows from the premises, even though the conclusion is false.',
 'It is invalid, because the conclusion is false.',
 'It is both valid and true, because it has the same form as a true syllogism.',
 'It is invalid, because a categorical syllogism cannot mention legs.',why='Validity is about whether the conclusion follows from the premises. This syllogism has the same form as the valid bird example, but its second premise is false, so its conclusion is false.')
question(17,'design','A student says that a valid syllogism always has a true conclusion. What correction is needed?',
 'A valid syllogism must have a true conclusion only if its premises are also true.',
 'A valid syllogism always has a true conclusion regardless of its premises.',
 'A valid syllogism never has a true conclusion, because validity concerns form.',
 'A valid syllogism has a true conclusion only when it uses the word some.',why='If the two premises of a valid syllogism are true, the conclusion must be true. A valid form with a false premise can produce a false conclusion.')
question(18,'application','All of the students are tired. Some tired people are irritable. Therefore, some of the students are irritable. Why does this example matter?',
 'Every statement seems reasonable, yet the syllogism is not valid.',
 'Every statement is false, yet the syllogism is valid.',
 'It is valid because its conclusion is believable.',
 'It is invalid because it uses the word some.',why='Syllogisms can be invalid even though each of the premises and the conclusion seem reasonable. The conclusion does not follow from the premises.')
question(18,'definition','What is belief bias?',
 'The tendency to think a syllogism is valid if its conclusion is believable.',
 'The tendency to think a syllogism is invalid if its premises are long.',
 'The tendency to believe a loss will hurt more than an equal gain.',
 'The tendency to stay with the default option in a difficult decision.',why='Belief bias is the tendency to think that a syllogism is valid if its conclusions are believable. 71% of participants judged invalid, believable conclusions as valid.')
question(19,'application','How do most people solve the pool table problem about the black, green, red and cue balls?',
 'By imagining the way the balls are arranged on the pool table.',
 'By applying a formal rule for checking the validity of syllogisms.',
 'By counting how many balls lie on each side of the table.',
 'By recalling a previous game with the same arrangement.',why='Most people solve this by imagining the arrangement of the balls. The idea that people can imagine situations is the basis of Johnson-Laird’s mental model proposal.')
question(20,'definition','In Johnson-Laird’s mental model approach (1999), what is a mental model?',
 'A specific situation represented in a person’s mind that can help determine the validity of syllogisms.',
 'A general rule stored in memory that grants permission when a condition is met.',
 'A list of premises written in the form if p, then q.',
 'An emotion a person predicts they will feel about an outcome.',why='A mental model is a specific situation represented in a person’s mind that can be used to help determine the validity of syllogisms in deductive reasoning.')
question(20,'application','A reasoner builds a model of the premises and finds one arrangement in which the premises are true but the conclusion is false. What follows under the mental model approach?',
 'The conclusion is not valid, because a valid conclusion cannot be refuted by any model of the premises.',
 'The conclusion is valid, because at least one model of the premises exists.',
 'The conclusion is valid only if the reasoner finds the exception quickly.',
 'The exception should be ignored, because tentative conclusions are always accepted.',why='A conclusion is valid only if it cannot be refuted by any model of the premises. One counterexample is enough to show the conclusion does not follow.')
question(20,'design','Which step of the mental model approach is aimed directly at finding a counterexample?',
 'Looking for exceptions to falsify the model.',
 'Creating a model of the situation.',
 'Generating tentative conclusions about the model.',
 'Introducing a second premise of the form if p, then q.',why='The steps are creating a model, generating tentative conclusions, looking for exceptions to falsify the model, and determining validity. Looking for exceptions is the search for a counterexample.')
question(21,'definition','What form does the first premise of a conditional syllogism take?',
 'If p, then q.',
 'All p are q.',
 'Some p are not q.',
 'No p are q.',why='Conditional syllogisms have two premises and a conclusion, and the first premise is of the form if p, then q. There are four major types.')
question(22,'application','If I study, I will get a good grade. I studied. Therefore, I will get a good grade. Which type of syllogism is this, and how often was it judged correctly?',
 'Modus ponens, a valid form judged correctly by 97% of participants.',
 'Modus tollens, a valid form judged correctly by 60% of participants.',
 'An invalid form judged correctly by 40% of participants.',
 'Modus ponens, an invalid form judged correctly by 40% of participants.',why='Conditional syllogism 1, modus ponens, has the second premise p and the conclusion q. It is valid and was judged correctly 97% of the time.')
question(23,'application','If I study, I will get a good grade. I did not get a good grade. Therefore, I did not study. How should this be evaluated?',
 'It is valid modus tollens, but only 60% of participants judged it correctly.',
 'It is invalid, and 97% of participants judged it correctly.',
 'It is invalid, because not q can never lead to not p.',
 'It is valid modus ponens, judged correctly by 97% of participants.',why='Conditional syllogism 2, modus tollens, has the second premise not q and the conclusion not p. It is valid, but only 60% judged it correctly.')
question(24,'application','If I live in Tucson, then I live in Arizona. I live in Arizona. Therefore, I live in Tucson. What makes this syllogism invalid?',
 'A person can live in Arizona without living in Tucson, so q does not establish p.',
 'Tucson is not in Arizona, so the first premise is false.',
 'The conclusion is believable, so belief bias makes it invalid.',
 'Its second premise is not p, which can never support any conclusion.',why='This has the form of conditional syllogism 3, with second premise q and conclusion p. The first premise does not say that Tucson is the only place in Arizona to live, so the conclusion does not follow.')
question(25,'application','If I study, I will get a good grade. I did not study. Therefore, I did not get a good grade. How should this be evaluated?',
 'It is not valid, and only 40% of participants judged it correctly.',
 'It is valid, and 97% of participants judged it correctly.',
 'It is valid, because not p always leads to not q.',
 'It is not valid, and 60% of participants judged it correctly.',why='Conditional syllogism 4 has the second premise not p and the conclusion not q. The first premise says nothing about what happens without studying, so the syllogism is not valid, and only 40% judged it correctly.')
question(25,'design','Which pattern holds across the accuracy results for the four conditional syllogisms?',
 'Both valid forms were judged correctly more often than both invalid forms.',
 'Both invalid forms were judged correctly more often than both valid forms.',
 'All four forms were judged correctly equally often.',
 'Modus tollens was judged correctly more often than modus ponens.',why='The valid forms were judged correctly at 97% and 60%, and the invalid forms at 40% each, so both valid forms exceeded both invalid ones.')
question(26,'application','To test the rule that a card with a vowel on one side has an even number on the other, which cards must be turned over among E, K, 4 and 7?',
 'E and 7, because only those cards could reveal a violation of the rule.',
 'E and 4, because those cards match the vowel and the even number in the rule.',
 'Only E, because the rule mentions vowels first.',
 'All four cards, because any card could hide a vowel.',why='E needs to be turned over, and the 7 needs to be turned over because a vowel behind it would break the rule. A 4 cannot break the rule, yet 46% chose it and only 7% chose the 7.')
question(27,'definition','What does the falsification principle state?',
 'To test a rule, you must look for situations that falsify the rule.',
 'To test a rule, you must look for situations that confirm the rule.',
 'A rule is valid if its conclusion is believable.',
 'A rule is true if most people accept it.',why='The falsification principle states that to test a rule, you must look for situations that falsify it. Most participants fail to do this in the abstract four-card problem.')
question(27,'researcher','When the four-card problem was stated as If drinking beer, then 21 years old, what happened to performance?',
 'Correct responses greatly increased, with 73% answering correctly.',
 'Correct responses fell to 7%.',
 'Correct responses stayed the same as in the vowel and number version.',
 'Participants refused to answer because the rule was unfamiliar.',why='When the problem is stated in concrete everyday terms, correct responses greatly increase. 73% answered the beer version correctly.')
question(28,'definition','What is a permission schema?',
 'The idea that if A is satisfied, B can be carried out.',
 'The idea that if B is carried out, A must have been satisfied.',
 'The idea that a conclusion is valid if it is believable.',
 'The idea that losses have a greater impact than equal gains.',why='A permission schema is the idea that if A is satisfied, B can be carried out. Permission schemas are used in the concrete versions because people are familiar with such rules.')
question(28,'application','Which conclusion about the concrete four-card problems fits both points that context is important and that familiarity is not always important?',
 'A familiar setting that calls up a permission schema helps, but familiarity alone does not explain the improvement.',
 'Familiarity alone explains every improvement, so context does not matter.',
 'Context matters only for abstract letters and numbers, not everyday rules.',
 'Neither context nor familiarity has any effect on performance.',why='Context is important, because the same logic becomes easier in a familiar setting, but familiarity is not always important, so it does not account for the improvement on its own.')
assert len(sections)==28 and [s['page'] for s in sections]==list(range(1,29))
assert len(questions)==50,len(questions)
collection=dict(id=13,title='Judgment, Decision, and Reasoning · Part II',file='CogPsych_Ch13_2 F26.pdf',sourcePdf='sources/CogPsych_Ch13_2_F26.pdf',sections=sections,original=[f'media/judgment-part2/slide-{p:02}.webp' for p in range(1,29)],optional=False)
path=ROOT/'module2-data.js';bank=json.loads(path.read_text().split('window.SECOND_HALF = ',1)[1].rstrip(';\n'))
bank['collections']=[c for c in bank['collections'] if c['id']!=13]+[collection]
bank['questions']=[q for q in bank['questions'] if q['module']!=13]+questions
bank['modules']=[m for m in bank['modules'] if m!=13]+[13]
bank['lectureNumbers']['13']='14';bank['revision']='judgment-part2-balanced-100'
for key in ['topics','coreReview','experiments']:bank[key]=[g for g in bank[key] if g.get('module')!=13]
for title,pages in [
 ('Emotions, expected emotions, and risk aversion',[2,3,4]),
 ('Incidental emotions and mood',[5,6]),
 ('Context, defaults, and the status quo bias',[7,8]),
 ('Framing gains and losses',[9,11,12]),
 ('Neuroeconomics and the ultimatum game',[13,14,15]),
 ('Deductive reasoning, validity, and belief bias',[16,17,18]),
 ('Mental models',[19,20]),
 ('Conditional syllogisms',[21,22,23,24,25]),
 ('The Wason four-card problem and permission schemas',[26,27,28])]:bank['topics'].append(dict(module=13,title=title,pages=pages,progressKey='m2-topic-13-'+str(pages[0])))
for title,pages in [
 ('Emotion and decisions',[2,3,4,5,6]),
 ('Context, presentation, and framing',[7,8,9,11,12]),
 ('Emotion and the brain',[13,15]),
 ('Validity, mental models, and conditional reasoning',[16,17,18,20,21,22,23,24,25]),
 ('Testing rules',[26,27,28])]:bank['coreReview'].append(dict(module=13,title=title,pages=pages))
for title,pages in [
 ('Kermer and colleagues · expected and actual emotions after a coin flip',[4]),
 ('Simonsohn · cloudy days, admissions, and enrollment',[5]),
 ('Lerner and colleagues · mood and highlighter prices',[6]),
 ('Physicians · earlier cases and cesarean recommendations',[7]),
 ('Organ donation · opt-in and opt-out consent',[8]),
 ('Tversky and Kahneman · the disease problem in gain and loss frames',[9,11,12]),
 ('Sanfey and coworkers · the ultimatum game and the anterior insula',[14,15]),
 ('Belief bias · judging invalid believable conclusions',[18]),
 ('Conditional syllogisms · four forms and accuracy',[22,23,24,25]),
 ('Wason four-card problem · abstract and concrete versions',[26,27,28])]:bank['experiments'].append(dict(module=13,title=title,pages=pages))
path.write_text('window.SECOND_HALF = '+json.dumps(bank,ensure_ascii=False,indent=2)+';\n')
print('Added collection 14:',len(sections),'slides,',len(questions),'new questions. Current lecture IDs:',bank['modules'])
