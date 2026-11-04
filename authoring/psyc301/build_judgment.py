"""Append collection 13 from the supplied judgment PDF, preserving earlier content."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sections=[]
def section(page,title,*paragraphs):
    sections.append(dict(page=page,title=title,bullets=list(paragraphs),image=page-1))
section(1,'Judgment, Decision Making, and Reasoning · title')
sections[-1]['sourceOnly']=True
section(2,'Decisions choose between alternatives, while reasoning draws conclusions',
 '<strong>Decisions</strong> are the process of making choices between alternatives. <strong>Reasoning</strong> is the process of drawing conclusions. A choice concerns which alternative to take, while a conclusion concerns what follows from the information available. The two processes can contribute to the same activity without being identical.',
 'Decisions are based on the <strong>judgments</strong> people make. Applying those judgments can involve reasoning about the available evidence and what it means for the alternatives. The assessment of a situation supplies information that can influence which course of action is chosen.',
 '<strong>Inductive reasoning</strong> is one of the primary mechanisms involved in making judgments. It means reasoning based on observations and reaching conclusions from evidence. Information about what has been observed supports a conclusion about the situation, rather than the conclusion being selected without reference to evidence.',
 'A judgment can therefore contribute to a decision through an evidence-based inference. Drawing a conclusion and selecting an alternative describe different parts of that relationship. The conclusion expresses what the observations support, and the decision concerns what to do among the alternatives available.')
section(3,'Inductive conclusions depend on the strength of the observations',
 '<strong>Inductive reasoning</strong> is the basis of scientific investigations. Observations are made, data are collected, and conclusions are drawn from that evidence. The conclusions are <strong>probably, but not definitely, true</strong> because the observations support an inference rather than guarantee every case to which it might be applied.',
 'The <strong>strength of an argument</strong> depends on the representativeness, number, and quality of the observations. Representativeness concerns how well the observed cases reflect the group being described. A conclusion about a whole group is less secure when the observed cases leave out relevant variation within that group.',
 'More observations can provide more evidence, but their number is not the only consideration. <strong>Quality</strong> concerns how compelling the observation is for the claim being considered. Repeated weak evidence and a highly informative observation can contribute differently to the certainty of a conclusion.',
 'A <strong>black swan among white swans</strong> makes the difference concrete. Numerous white swans can support an expectation about swan color, but a single clearly observed black swan contradicts the claim that every swan is white. One high-quality observation can carry substantial weight because of what it establishes about that particular claim.')
section(4,'Induction uses past experience to guide present behavior',
 '<strong>Scientific discoveries</strong> use inductive reasoning when observations support hypotheses and general conclusions. The evidence concerns what has been observed, while the hypothesis extends that evidence into a broader account. The reasoning connects particular observations with a proposed regularity.',
 'In <strong>everyday life</strong>, people predict what will happen from observations about what has happened in the past. A familiar situation supplies previous experience that can guide a present prediction. The person uses the earlier pattern as evidence about what is likely under the current circumstances.',
 'Predictions and choices are especially likely to draw on experience when the situation is <strong>familiar</strong>. The relationship between a current situation and remembered experience allows past information to affect present behavior. The prediction concerns an expected outcome, and a choice can be made in light of that expectation.',
 'Some inductive reasoning happens <strong>automatically</strong>, without a person deliberately listing observations and constructing an argument. Experience can guide a response rapidly because a familiar pattern already supports an expectation. Automatic use of past experience is still based on a relationship between earlier observations and a present inference.')
section(5,'Heuristics are rapid rules of thumb that can produce errors',
 '<strong>Heuristics</strong> are shortcuts that help people reach conclusions rapidly when they use past experience to guide present behavior. They are <strong>rules of thumb</strong> that are likely to provide a correct answer but are not foolproof. A useful shortcut can simplify a judgment without guaranteeing that the conclusion will be right.',
 'The shortcut reduces the amount of information a person has to consider before responding. Rather than examining every relevant possibility, the person can rely on a readily available cue. The cue often fits the situation well enough to support a useful conclusion, but it can also point away from the correct judgment.',
 'The <strong>availability heuristic</strong> uses how readily examples come to mind, while the <strong>representativeness heuristic</strong> uses how much a case resembles a category. Both allow rapid judgment from a limited basis. Their difference concerns which property supplies the shortcut, remembered accessibility or similarity to a familiar kind of case.')
section(6,'Availability substitutes ease of remembering for event probability',
 'The <strong>availability heuristic</strong> makes events that are more easily remembered seem more probable than events that are harder to remember. A person tries to call examples to mind and uses the accessible examples as a basis for judging how often an event occurs.',
 'The more examples a person can think of, the more probable the event is judged to be. This can be useful when readily remembered examples reflect frequent events. The difficulty is that the ability to remember an event is affected by properties other than its actual probability.',
 '<strong>Distinctiveness</strong> makes an event stand out from others. <strong>Emotional salience</strong> makes an event especially noticeable because of its emotional impact. Frequent <strong>encoding or retrieval</strong> means that an event has repeatedly been stored or brought back to mind. Each can increase availability without making the underlying event more common.',
 'An event can therefore feel probable because it is memorable. The judgment is based on the accessibility of examples, even when that accessibility comes from attention, emotion, or repeated exposure. Probability and ease of remembering are related cues in some situations, but they are different properties.')
section(7,'Words beginning with r are easier to retrieve than words with r third',
 'The word judgment asks whether English contains more words that <strong>begin with r</strong> or more words with <strong>r as the third letter</strong>. Both alternatives concern how often a letter occurs in a particular position. Answering accurately requires comparing the sizes of those two sets of words.',
 'About <strong>70% of respondents</strong> choose words beginning with r, even though words with r in the third position are actually <strong>three times more common</strong>. The more popular response therefore reverses the underlying frequency relationship.',
 'Retrieving words by their first letter is easier than searching for a letter in the third position. Words beginning with r come to mind readily, so that set feels more numerous. The ease of producing examples affects the judgment even though it does not reflect which position is more prevalent.',
 'The <strong>availability heuristic</strong> connects that retrieval difference to the error. Respondents judge frequency through examples they can recall, and the search cue favors one set. The mistaken judgment concerns how memory is searched, rather than an actual excess of words beginning with the letter.')
section(8,'Memorable causes of death can seem more likely than common causes',
 'The paired judgments ask which of two causes would be more likely to kill a randomly selected person in the United States during the following year. The alternatives include <strong>homicide versus appendicitis</strong>, <strong>drowning versus an auto–train collision</strong>, <strong>asthma versus botulism</strong>, <strong>asthma versus a tornado</strong>, and <strong>appendicitis versus pregnancy</strong>. Each choice concerns relative likelihood rather than how frightening a cause sounds.',
 'In the supplied comparisons, <strong>asthma is more likely than botulism or a tornado</strong>, yet many respondents select the less likely cause. A dramatic event can be highly available in memory even when the more common cause attracts little attention. The same mismatch between accessibility and frequency can affect the other pairs.',
 'A death from <strong>botulism</strong> can become front-page news, while deaths from <strong>asthma</strong> can go virtually unnoticed. The difference in exposure supplies more accessible examples of the unusual cause. A person remembering the news can therefore judge that cause as more probable than its actual frequency warrants.',
 'The <strong>availability heuristic</strong> operates through those remembered examples. Distinctive coverage changes what comes to mind during the comparison. The judgment error arises when memory accessibility is treated as a direct measure of the chance of dying from the cause.')
section(9,'Representativeness can displace the base rate in the Robert problem',
 'The <strong>representativeness heuristic</strong> bases a judgment on how much one event resembles another. A person estimates whether A belongs to class B from how well A’s properties resemble the properties normally associated with B. Similarity supplies the basis for category membership.',
 '<strong>Robert wears glasses, speaks quietly, and reads a lot</strong>. After hearing that description, many people judge him more likely to be a librarian than a farmer. The description resembles their expectations about a librarian, so it makes that occupation seem like the better match.',
 'The supplied prevalence information is about <strong>2.2 million farms and 120,000 libraries</strong> in America. The comparison introduces the <strong>base rate</strong>, the background prevalence of the categories, as information relevant to judging which occupation is more likely. A resemblance-based answer can disregard that background information.',
 'The error concerns treating a fitting description as sufficient for a probability judgment. Robert can resemble a librarian without the descriptive match settling how likely the occupation is relative to the alternative. <strong>Base-rate neglect</strong> occurs when the similarity-based response displaces the category-frequency information.')
section(10,'The lawyer–engineer judgment changes when Jack is described',
 'A group contains <strong>70 lawyers and 30 engineers</strong>. If a person is selected at random and no other information is supplied, the chance of selecting an engineer is <strong>30 out of 100</strong>. Respondents generally use the base-rate information correctly when it is all they have.',
 '<strong>Jack</strong> is described as a 45-year-old married man with four children who is conservative, careful, and ambitious. He is uninterested in political and social issues and enjoys home carpentry, sailing, and mathematical puzzles. The description supplies personal characteristics without changing the stated composition of the group.',
 'Respondents tend to call Jack an <strong>engineer</strong> because those characteristics resemble their expectations about that occupation. Descriptive information can dominate the judgment even though the group still contains more lawyers. The response is driven by the fit between Jack and an occupational category.',
 'The pattern is to <strong>use base rates when they are all that is available</strong>, then <strong>disregard them when descriptive information is available</strong>. Knowing how to use a base rate in the bare numerical question does not ensure that it continues to guide the judgment after a vivid description is added.')
section(11,'The Linda problem violates the conjunction rule',
 'The <strong>conjunction rule</strong> states that the probability of two events occurring together cannot be greater than the probability of either constituent event alone. Every case satisfying both conditions also satisfies each individual condition. Adding a requirement restricts the set of possible cases rather than enlarging it.',
 '<strong>Linda</strong> is described as single, outspoken, bright, trained in philosophy, concerned with discrimination and social justice, and involved in antinuclear demonstrations. Respondents choose between <strong>Linda is a bank teller</strong> and <strong>Linda is a bank teller and active in the feminist movement</strong>. The second alternative adds a condition to the first.',
 'About <strong>82% choose the conjunction</strong>. The added description of feminist activity makes that answer resemble the person they have been told about. A more representative description can therefore feel more probable even though the conjunction cannot exceed the probability of bank-teller status alone.',
 'The set of <strong>feminist bank tellers</strong> lies inside the larger set of <strong>bank tellers</strong>. Linda belonging to the smaller set automatically puts her in the larger one. The error is choosing the more detailed, better-fitting story over the probability relationship between the two nested sets.')
section(12,'The hospital question requires considering how many births are sampled',
 'Two hospitals record the proportion of boys born each day. The <strong>larger hospital has about 45 births per day</strong>, and the <strong>smaller hospital has about 15</strong>. About half of all babies are boys, but the daily percentage can vary above or below that population proportion.',
 'The question asks which hospital records more days when <strong>over 60% of the babies are boys</strong>. The alternatives are the larger hospital, the smaller hospital, or about the same number of days. The outcome concerns unusually high daily proportions, rather than the total number of boys born over the year.',
 'Most respondents, <strong>56%</strong>, choose about the same. That answer treats the shared overall proportion of boys as enough to determine how often each hospital exceeds the daily threshold. It leaves out the difference between observing a proportion in 15 births and observing it in 45 births.',
 '<strong>Sample size</strong> affects how much an observed proportion varies. Both hospitals can draw from the same population while their daily proportions differ in stability. A judgment about extreme days therefore has to consider the number of births contributing to each day’s observation, as well as the underlying proportion.')
section(13,'The smaller hospital has more days above 60 percent boys',
 'The <strong>smaller hospital</strong> is the correct answer to the comparison of days with more than 60% boys. Its daily sample contains about 15 births rather than 45. Smaller samples vary more from one observation to another, so an extreme proportion is more likely in the smaller daily group.',
 'Both hospitals draw from a population in which about <strong>50% of babies are boys</strong>. That common population proportion does not make their day-to-day variation identical. A daily result can depart substantially from half when relatively few births determine the proportion.',
 'The <strong>larger hospital’s daily proportion is more stable</strong> because it includes more births. High and low outcomes contribute to a larger group, making the overall fraction less susceptible to a small run of one kind of outcome. The comparison concerns relative variability in the daily percentages.',
 'Choosing <strong>about the same</strong> ignores the number of observations supporting each percentage. Choosing the larger hospital because it has more babies confuses an absolute count with the frequency of an extreme proportion. The question asks which hospital more often crosses the 60% threshold, not which produces more boys in total.')
section(14,'The law of large numbers connects sample size with representativeness',
 'The <strong>law of large numbers</strong> states that, as more individuals are randomly drawn from a population, the resulting group becomes more representative of that population. A larger random sample is more likely to reflect the population pattern than a small random sample.',
 'The relationship concerns the <strong>number of observations</strong> supporting a judgment. A small group can depart substantially from the population because only a few outcomes determine its overall composition. Increasing the number reduces the influence of those short runs on the aggregate result.',
 'People often assume that <strong>representativeness holds for small samples</strong> as well. They expect a small group to resemble the population closely simply because it was drawn from that population. That expectation understates the amount of variation possible when few observations are involved.',
 'A small sample and a large sample can have the same underlying population without providing equally stable estimates of it. The law concerns the general improvement in representativeness with larger random samples. Treating every small sample as a miniature copy of the population leads to errors in judgments about its likely composition.')
section(15,'Illusory correlations can be reinforced by stereotype-consistent attention',
 'An <strong>illusory correlation</strong> is a relationship that appears to exist even though it does not exist or is much weaker than assumed. The person perceives two things as strongly related without evidence supporting that degree of association. An expectation about the relationship can shape which observations receive attention.',
 '<strong>Stereotypes</strong> are oversimplified generalizations about a group or class of people, often emphasizing negative characteristics. A stereotype can direct attention toward behaviors that fit the expected description. Those behaviors become especially noticeable while other behavior contributes less to the person’s impression.',
 'Selective attention can create an apparent association between <strong>the group and the stereotyped behavior</strong>. Remembering matching instances reinforces the original expectation, making the stereotype feel supported. The apparent evidence is shaped by what was noticed and retained.',
 'The relationship to the <strong>availability heuristic</strong> concerns the accessibility of those selected examples. Stereotype-consistent behaviors are easier to bring to mind because they received particular attention. Their availability can then be mistaken for evidence that the behavior is strongly associated with the group.')
section(16,'Lord and colleagues found belief-consistent evaluation of the same article',
 '<strong>Lord and coworkers (1979)</strong> had people who favored capital punishment and people who opposed it read the same article. The participants began with different opinions, but the material they evaluated was shared. Their judgments therefore concerned the same information approached from opposing positions.',
 'Those <strong>in favor of capital punishment</strong> interpreted the article as favorable to their position. Those <strong>against capital punishment</strong> interpreted it as favorable to theirs. The existing attitude influenced how the evidence was evaluated, rather than the shared article producing one common interpretation.',
 'The <strong>myside bias</strong> is the tendency to generate and evaluate evidence, and to test hypotheses, in ways biased toward one’s own opinions and attitudes. The person gives greater weight to information that agrees with the position already held.',
 'Participants <strong>focused on information that agreed with their beliefs and disregarded information that did not</strong>. The disagreement persisted through selective evaluation of a common source. The bias concerns how evidence is accepted or discounted in relation to an existing belief.')
section(17,'Confirmation bias narrows the search in the 2, 4, 6 task',
 '<strong>Confirmation bias</strong> is the tendency to seek information that fits a hypothesis and overlook information that argues against it. The <strong>myside bias</strong> is one form of this pattern. Evidence is selected or evaluated in a way that favors the account already believed.',
 'In the number-rule task, participants receive <strong>2, 4, 6</strong> as a sequence that conforms to a hidden rule. They write their own sets of three numbers and give reasons for choosing them. For each set, they receive feedback only about whether it fits the experimenter’s rule, then propose the rule when confident.',
 'The most common hypothesis is <strong>increasing intervals of two</strong>. Testing only sequences that satisfy that hypothesis can produce repeated positive feedback. Those successful tests also fit a broader rule, so confirmation alone does not distinguish the narrow hypothesis from another account.',
 'The actual rule is <strong>three numbers in increasing order of magnitude</strong>. Equal intervals of two are unnecessary because any ascending triple satisfies it. Searching for possible contradictions would test the boundaries of the hypothesis, while selecting only confirming triples can leave the narrower, incorrect belief intact.')
section(18,'Expected utility theory predicts choices with maximum expected benefit',
 '<strong>Decision making</strong> involves judgments that select between different courses of action. The alternatives have outcomes that can be evaluated according to their desirability. A decision concerns which course to choose in light of those possible outcomes.',
 '<strong>Utility</strong> refers to outcomes that are desirable because they serve the person’s interests. It expresses how beneficial an outcome is to the decision maker. Desirability gives the outcomes value, while uncertainty concerns how likely those outcomes are to occur.',
 '<strong>Expected utility theory</strong> assumes that people are rational and, with all relevant information, choose the alternative with <strong>maximum expected utility</strong>. The judgment combines the value of possible outcomes with their chances rather than choosing solely by how attractive one outcome sounds.',
 'The monetary version emphasizes the <strong>maximum expected monetary payoff</strong>. A large possible payoff and a likely payoff are different features of a choice, and expected value depends on their combination. The theory supplies a standard for choosing among alternatives on the basis of expected benefit.')
section(19,'Utility procedures do not fully describe what people choose',
 'The <strong>utility approach</strong> supplies specific procedures for determining the best choice according to expected benefit. It offers a consistent basis for comparing alternatives when their outcomes and probabilities are available. The chosen alternative is the one that maximizes the relevant expected value.',
 'People can find value in <strong>things other than money</strong>. Maximizing monetary payoff therefore does not capture every consideration that can make an outcome desirable. A choice involving money can still depend on what the person values about the activity or its possible consequences.',
 'Many decisions also fail to maximize the probability of the best outcome. People are <strong>not utility-maximization machines</strong> whose behavior always follows the calculated best monetary prospect. The attractive feature of a choice can influence behavior even when the numerical odds favor another response.',
 '<strong>Casino gambling</strong> is an example in which people continue to choose an activity despite knowing that the odds are strongly against them. Knowing the unfavorable odds does not automatically eliminate the choice. Actual decision behavior therefore involves considerations that extend beyond selecting the maximum expected monetary payoff.')
section(20,'Seven red jellybeans can attract choices despite a lower winning proportion',
 'Participants can earn <strong>one dollar whenever they draw a red jellybean</strong>, with an opportunity to earn up to seven dollars. They choose between two bowls before drawing. The relevant outcome is drawing a red bean, so the proportion of red beans determines the chance of winning on a draw.',
 'One bowl offers <strong>1 red bean out of 10</strong>, while the other offers <strong>7 red beans out of 100</strong>. The first chance is 10%, and the second is 7%. Although the larger bowl contains more winning beans, its winning proportion is lower because it also contains many more nonwinning beans.',
 'Most participants choose the <strong>7-out-of-100 bowl</strong>. The greater number of red beans is attractive even though the probability of drawing one is worse. Comparing the winning counts alone favors seven, while comparing the complete ratios favors one out of ten.',
 'The decision depends on considerations other than the actual probabilities of winning. A larger number of favorable items can draw attention away from the denominator, the total number of possible draws. The two bowls separate the <strong>number of opportunities that look favorable</strong> from the <strong>chance that a random draw succeeds</strong>.')
section(21,'Avoiding air travel after September 11 increased exposure to road risk',
 'After <strong>September 11</strong>, air travel decreased and driving increased. Some people avoided flying by choosing road travel instead. The decision changed the mode of transportation rather than removing the risks associated with traveling.',
 'The probability of dying in a <strong>car accident is much greater than the probability of dying while flying</strong>. Avoiding the feared event can therefore increase exposure to a more likely danger. The emotional impact of the air attacks and the relative probabilities of the travel alternatives are different bases for a decision.',
 'The reported number of Americans who died on the road while avoiding flying exceeded the total number of passengers killed on the <strong>four hijacked flights</strong>. The consequence concerns additional deaths associated with the shift in travel behavior. A choice intended to avoid one danger was accompanied by greater harm through another.',
 'The risk comparison requires considering <strong>both alternatives</strong>. Concentrating on the frightening possibility of an air disaster can make road travel seem safer without an adequate comparison of its probability of harm. Perceived danger can guide behavior in a direction that differs from the lower-risk option.')
section(22,'The convoy dilemma separates net lives saved from willingness to reroute',
 'A <strong>convoy of food trucks</strong> is traveling to a refugee camp during a famine, and airplanes cannot be used. A second camp contains more refugees. Rerouting the convoy saves <strong>1,000 people</strong> at the second camp, but <strong>100 people</strong> in the first camp die because the trucks no longer arrive there.',
 'Counting lives saved against lives lost gives <strong>100 − 1,000 = −900</strong> for retaining the original route and <strong>1,000 − 100 = 900</strong> for rerouting. Under that comparison, rerouting has the better net outcome. The original destination still creates a conflict because changing the route contributes to deaths there.',
 '<strong>Ritov and Baron (1999)</strong> found that <strong>63% did not choose to reroute</strong>. Most respondents rejected the alternative with the better net count of lives saved. Their decision therefore could not be described solely by choosing the larger numerical benefit.',
 'Some respondents would retain the original route even if only <strong>one person</strong> at the first camp would die after the change. Reluctance to cause that loss can outweigh the larger number saved elsewhere. The dilemma concerns how a choice is evaluated when improving the overall outcome requires an action that also harms others.')
section(23,'Sacred values change responses to taboo and tragic tradeoffs',
 'The <strong>Sacred Value Protection Model</strong> of <strong>Tetlock, Kristel, Elson, Green, and Lerner (2000)</strong> proposes that people want to protect what they hold sacred. A sacred value is treated as something whose protection cannot be reduced to an ordinary exchange for material advantage.',
 '<strong>Sacred values</strong> are compartmentalized separately from <strong>secular values</strong>. Secular values can enter ordinary practical exchanges, while sacred values are treated as belonging to a different domain. The distinction affects whether a proposed comparison itself feels acceptable.',
 'A <strong>taboo tradeoff</strong> intermingles the sacred and secular domains. Treating a sacred concern as exchangeable for a secular benefit can feel threatening and provoke <strong>moral outrage</strong>. The objection concerns the kind of comparison being made, rather than only whether the offered benefit is large enough.',
 'A <strong>tragic tradeoff</strong> compares two sacred values with one another. People are less morally outraged by that kind of conflict because either choice protects one sacred concern at the expense of another. The decision can remain painful while being evaluated differently from trading a sacred value for material gain.')
section(24,'Saving Johnny competes with money in one scenario and another life in the other',
 'In the <strong>taboo tradeoff</strong>, Robert can save <strong>Johnny, a five-year-old child who needs a liver transplant</strong>. The procedure costs the hospital <strong>one million dollars</strong>. Johnny is seriously ill and waiting for a transplant, while a shortage of local organ donors makes obtaining a liver expensive.',
 'The money could instead support other hospital needs, including <strong>better equipment and salaries to recruit talented doctors</strong>. Robert chooses between saving Johnny and using the funds for those other purposes. A child’s life is placed in a comparison with how hospital money could otherwise be spent.',
 'In the <strong>tragic tradeoff</strong>, <strong>two children need a liver transplant, but only one liver is available</strong>. Saving one child means the other cannot receive that organ. The conflict is between two lives rather than between a life and an amount of money.',
 'The distinction concerns the <strong>kind of competing value</strong>. Both decisions involve a serious loss, but only the taboo version places the sacred value of a child’s life against a monetary allocation. The tragic version makes the scarcity of an organ create a conflict between two equally life-preserving aims.')
section(25,'Moral outrage depends on tradeoff type and whether Johnny is saved',
 'In <strong>Tetlock and colleagues’ (2000)</strong> results, <strong>moral outrage</strong> is rated for taboo and tragic tradeoffs, with separate outcomes for <strong>saving Johnny</strong> and <strong>not saving Johnny</strong>. The comparison concerns how the proposed tradeoff and its outcome jointly affect the response.',
 'Under the <strong>taboo tradeoff</strong>, not saving Johnny produces much greater outrage than saving him. Choosing other uses for the money instead of the child’s life receives the strongest negative response. Saving the child rather than making that monetary exchange produces substantially less outrage.',
 'Under the <strong>tragic tradeoff</strong>, outrage is similar whether Johnny is saved or not. The two outcomes are evaluated in the context of only one liver being available for two children. Choosing either child leaves another sacred concern unmet, so Johnny’s particular outcome does not produce the same separation in ratings.',
 'The large outcome difference belongs to the <strong>taboo condition</strong>, while the <strong>tragic condition</strong> has little difference between its two outcomes. The highest outrage occurs when Johnny is not saved in the taboo scenario. The findings concern an interaction between the type of value conflict and the decision made within it.')
section(26,'Ginges and colleagues examined tradeoff judgments among conflict-involved groups',
 '<strong>Ginges, Atran, Medin, and Shikaki (2007)</strong> examined sacred-value tradeoffs in a setting involving an ongoing political conflict. They interviewed <strong>Israeli settlers, Palestinian refugees, and Palestinian students affiliated with different political groups</strong>. The judgments came from groups with direct concerns about the issues being negotiated.',
 'The samples included <strong>601 settlers, 535 refugees, and 719 students</strong>. These are separate participant groups rather than one uniform population. The research concerned how people situated within the conflict responded to proposed arrangements affecting the issues at stake.',
 'Participants were offered <strong>three types of tradeoff deals</strong> as possible solutions. Varying the deal made it possible to examine reactions to different ways of handling a contested value. The proposed exchange was part of what participants evaluated, rather than an assumption that every additional benefit would make agreement more attractive.',
 'The research connects <strong>sacred-value protection</strong> with negotiations involving real commitments and group interests. Responses concern proposed compromises over matters that some participants regard as sacred. The content of an offer can therefore affect whether it is experienced as an acceptable exchange or a threat to those commitments.')
section(27,'Material payment and symbolic recognition change the proposed deal differently',
 'The <strong>taboo proposal</strong> asks Palestinians to recognize the sacred and historic right of the Jewish people to Israel. It specifies two states, a Jewish state of Israel and a Palestinian state in <strong>99% of the West Bank and Gaza</strong>. The proposal involves recognition concerning an issue that can be held sacred.',
 'The <strong>Taboo+</strong> version adds a material incentive. Israel would pay Palestine <strong>one billion U.S. dollars a year for ten years</strong>. The additional term changes the economic benefit without itself supplying reciprocal recognition of the other group’s sacred claim.',
 'The <strong>symbolic</strong> version adds recognition by Israel of the historic and legitimate right of Palestinians to their own state. It also includes an <strong>apology for wrongs done to the Palestinian people</strong>. Those terms concern acknowledgment and respect rather than increasing the cash payment.',
 'The offers differ in what is added to the basic arrangement. <strong>Material compensation</strong> proposes an economic exchange, while <strong>symbolic recognition</strong> addresses the status of a group’s claim. A participant can respond differently to those additions because they engage different values, even when both are presented as improvements to the agreement.')
section(28,'Moral absolutists reject compromise regardless of material benefit',
 '<strong>Moral absolutists</strong> treat an issue under dispute as a <strong>sacred value</strong>. Their position is that the proposed compromise is unacceptable regardless of how much benefit it could produce. The commitment differs from a strong preference that could be outweighed by a sufficiently favorable exchange.',
 'Among the <strong>settlers</strong>, the sacred-value response concerns never giving up part of the <strong>Land of Israel</strong>, no matter how great the benefit. About <strong>46%</strong> of the sample held that position. The criterion is the refusal of benefit-based tradeoffs over the territory, rather than the intensity of an ordinary dislike.',
 'Among the <strong>Palestinian students</strong>, about <strong>54%</strong> treated both the <strong>right of return and Jerusalem</strong> as sacred values. The issue regarded as sacred can differ between groups, while the refusal to exchange it for benefits supplies a common basis for the classification.',
 '<strong>Non-absolutists</strong> also have strong preferences against compromise but do not treat the issues as sacred. They are not simply indifferent to the dispute. The distinction concerns whether consequences and benefits can enter the decision at all, rather than whether the person cares about the issue.')
section(29,'Material incentives can increase opposition when the disputed value is sacred',
 'For <strong>moral absolutists</strong>, adding money in <strong>Taboo+</strong> increases <strong>anger and disgust</strong> relative to the basic taboo offer. <strong>Support for violence</strong> also increases. A material sweetener can make the proposed exchange more objectionable when the issue is treated as sacred.',
 '<strong>Non-absolutists</strong> respond in the opposite direction. Adding the material benefit reduces anger and disgust and lowers support for violence. The same change to the offer therefore has different effects depending on whether participants treat the contested issue as a sacred value.',
 'The comparison of <strong>taboo and symbolic offers</strong> associates symbolic recognition with <strong>lower anger or disgust and lower support for violence</strong>. Acknowledgment of a group’s claim affects responses differently from offering money for compromise. The symbolic term addresses a value that the material exchange can leave threatened.',
 'The findings distinguish <strong>material benefit from symbolic reciprocity</strong>. Increasing an economic incentive is not automatically an improvement in a negotiation over sacred concerns. What the offer asks people to exchange, and how it treats their commitments, affects the emotional and behavioral judgments they report.')
section(30,'Sacred-value negotiations can involve incentives as well as sanctions',
 '<strong>Material incentives and disincentives</strong> are possible tools in negotiations involving sacred values. An incentive offers a benefit for agreement, while a disincentive imposes a cost for refusing. Their psychological effects concern how the targeted population evaluates the proposed compromise and the pressure attached to it.',
 'Studies by <strong>Dehghani, Atran, and colleagues (2010)</strong> and <strong>Dehghani, Iliev, and colleagues (2009)</strong> investigated these issues in relation to <strong>Iran’s nuclear program</strong>. The question was whether people who treated the program as a sacred value would be amenable to material benefits or costs in exchange for compromise.',
 '<strong>Economic sanctions</strong> are a disincentive because refusing an agreement carries an additional material penalty. Offering economic funds changes the benefits of accepting, while sanctions change the costs of refusing. Both attempt to alter the practical consequences attached to the decision.',
 'The psychological question concerns whether changing those consequences produces the intended response when the program is held sacred. A commitment that excludes ordinary benefit-based tradeoffs can be evaluated differently from a negotiable preference. Reactions to an offer therefore depend on the status of the disputed value as well as the material terms.')
section(31,'The Iranian study classifies sacred values through refusal of any consequence-based tradeoff',
 'The online study involved <strong>1,997 Iranian participants</strong> and was conducted in <strong>Farsi</strong>. The measured outcomes included <strong>approval, anger, and whether a proposal was considered misleading</strong>. These are judgments about a proposed deal and reactions to it, rather than the same response measured under three names.',
 'The <strong>sacred-value measure</strong>, based on <strong>Baron and Spranca (1997)</strong>, asks what participants think about Iran giving up its nuclear energy or weapons program. Responses range from saying it definitely should happen, through not objecting, to accepting it only if the benefits are great enough.',
 'The sacred-value response is that giving up the program <strong>should not be done no matter how great the consequences</strong>. Participants choosing that alternative are classified as having a sacred value. Those willing to decide according to sufficiently large benefits do not meet that consequence-independent criterion.',
 'About <strong>14% for nuclear energy and 13% for nuclear weapons</strong> select the sacred-value response. The classification identifies a subgroup within the participants. Holding a sacred value concerns rejecting the exchange regardless of consequences, while the dependent judgments concern responses to the proposed negotiation.')
section(32,'The scenarios cross nuclear-program type with three kinds of deal',
 'The experiment uses a <strong>2 × 3 design</strong>. The nuclear program concerns either <strong>energy or weapons</strong>, and the deal is <strong>Taboo, Taboo+, or Taboo−</strong>. Combining two program types with three deal types yields six conditions.',
 'The <strong>Taboo</strong> agreement has Iran give up its relevant nuclear program and surrender its current facilities to the United Nations. In return, Israel gives up the corresponding nuclear program and surrenders its facilities. The baseline proposal is a reciprocal relinquishment rather than a payment or a sanction.',
 '<strong>Taboo+</strong> adds <strong>40 billion dollars in economic funds</strong> from the United Nations to Iran. <strong>Taboo−</strong> adds the threat of <strong>additional sanctions</strong> if Iran refuses the deal. The additions respectively change the material benefit of agreement and the cost of refusal.',
 'Participants rate whether they <strong>personally approve</strong>, whether people would be <strong>angry if the Iranian government approved</strong>, and whether the proposed deal seems <strong>misleading</strong>. The anger question concerns anticipated public reaction to government acceptance. It is different from asking only for a participant’s own approval of the arrangement.')
section(33,'Energy-program results differ between sacred-value and non-sacred-value participants',
 'For participants treating <strong>nuclear energy as a sacred value</strong>, <strong>approval</strong> is lower with the financial incentive in <strong>Taboo+</strong> than with the basic taboo deal. The sanctions condition, <strong>Taboo−</strong>, also has lower approval than the baseline. Adding a benefit or threatening a cost does not make the proposed compromise more attractive in this group.',
 'The <strong>anger</strong> rating asks whether people would be angry if the government accepted the deal. Among sacred-value participants, anticipated anger is highest with the <strong>financial incentive</strong> and is also elevated with the <strong>sanctions threat</strong> relative to the baseline. The highest approval and lowest anger within this group belong to the unmodified offer.',
 'Participants without a <strong>sacred value</strong> have much higher approval and lower anger across the energy conditions. Their ratings vary relatively little between the baseline, financial incentive, and sanctions versions. The large separation in responses concerns whether nuclear energy is treated as sacred.',
 'The energy results connect the effects of material terms with <strong>the participant’s value commitment</strong>. A financial addition can backfire rather than purchase agreement, and a threatened material cost can accompany greater opposition. For a sacred commitment, improving the material balance of an exchange does not necessarily improve its acceptability.')
questions=[]
def question(page,kind,stem,correct,*distractors,why):
    assert len(distractors)==3
    questions.append(dict(id=6001+len(questions),module=12,page=page,kind=kind,stem=stem,options=[correct,*distractors],correct=0,why=why))
question(2,'application','A student concludes from observations that one alternative is more likely to work, then chooses it. Which distinction correctly separates the two processes?',
 'Drawing the conclusion is reasoning, and choosing between the alternatives is decision making.',
 'Drawing the conclusion is decision making, and selecting an alternative is reasoning only if no evidence is used.',
 'Both are decisions because reasoning excludes conclusions based on observations.',
 'Neither involves judgment because judgment occurs only after a choice has been completed.',why='Reasoning draws conclusions, while decisions choose between alternatives. A judgment based on observations can supply the conclusion that guides the subsequent choice.')
question(3,'design','An investigator has many observations from a narrow subset of a population and claims that number alone makes the conclusion certain. Which evaluation fits inductive reasoning?',
 'The conclusion remains probabilistic, and its strength depends on representativeness and quality as well as number.',
 'Any sufficiently long list of observations makes an inductive conclusion definitely true for all unobserved cases.',
 'Representativeness matters only when the number of observations is exactly one.',
 'Quality and number are interchangeable, so no feature of the observations besides their count is relevant.',why='Induction supports probable conclusions with varying strength. Representativeness, number, and quality each affect the argument; observation count alone does not guarantee certainty.')
question(3,'application','A person has observed many white swans and claims that every swan is white. A clear observation of a black swan challenges the claim. Why can that one observation carry considerable weight?',
 'Its quality and relevance directly contradict the universal claim, despite the larger number of white observations.',
 'A single observation always establishes any generalization more strongly than a large set of observations.',
 'A black swan is relevant only if it is more frequent than white swans in the observed group.',
 'Inductive reasoning requires ignoring an unusual observation whenever it differs from previous experience.',why='The universal claim excludes every black swan. One reliable counterexample therefore matters directly to that claim, illustrating why quality cannot be reduced to observation count.')
question(4,'definition','Which account describes everyday inductive reasoning as used in familiar situations?',
 'Past observations support predictions and choices, sometimes automatically, about what is likely to happen now.',
 'A present choice counts as inductive only if the person writes a formal list of every remembered observation.',
 'Experience guides behavior only when the present situation is entirely unrelated to all previous situations.',
 'An inference from past events guarantees that the predicted outcome will occur in every future instance.',why='Induction provides a mechanism for using past experience to guide present behavior. Familiar patterns can support predictions automatically, without turning those predictions into guarantees.')
question(5,'definition','A heuristic usually supplies a useful answer quickly, but a particular judgment is wrong. Which description of heuristics accommodates both observations?',
 'They are rules of thumb that simplify judgment and often work, without guaranteeing the correct answer.',
 'They are exhaustive procedures that guarantee correctness whenever a person uses past experience.',
 'They are random guesses that cannot draw on information stored in memory.',
 'They are defined as errors, so a correct response cannot have used a heuristic.',why='A heuristic is a rapid shortcut rather than a foolproof procedure. The same kind of cue can be informative in one situation and misleading in another.')
question(6,'application','Two events are equally frequent, but one is emotionally vivid and repeatedly recalled. A person judges that event more probable because examples come to mind readily. What accounts for the judgment?',
 'Availability is being used as a cue for probability even though emotion and repeated retrieval can increase accessibility independently of frequency.',
 'Representativeness is being used because the person compared how closely the event matches an occupational stereotype.',
 'The law of large numbers guarantees that the most emotional event is also the most frequent one.',
 'The conjunction rule makes repeated memories more probable than the event from which they originated.',why='Availability judgments rely on accessible examples. Distinctiveness, emotional salience, and repeated encoding or retrieval can make an event memorable without increasing its probability.')
question(7,'application','Most respondents choose words beginning with r as more common than words with r third, although the latter are three times more common. Which explanation identifies the relevant mental operation?',
 'Searching memory by an initial letter produces examples readily, and that retrieval ease is mistaken for greater frequency.',
 'Respondents correctly apply the actual frequency ratio but reverse their answer only when asked for a category label.',
 'The error depends on believing that every English word contains an r in both positions.',
 'The first-letter set must be larger because an easier retrieval cue changes which words exist in the language.',why='The two word sets differ in how easily examples can be retrieved. Availability can favor first-letter words even when the underlying frequencies favor the third position.')
question(8,'application','In a cause-of-death comparison, a respondent chooses botulism over asthma after readily recalling dramatic botulism reports. What distinguishes the judgment cue from the requested quantity?',
 'The cue is memory availability, while the question asks for relative likelihood of death from each cause.',
 'The cue is the total number of hospitals, while the question asks which illness has the longer name.',
 'The question asks how memorable each cause is, so the respondent has correctly substituted recall for probability.',
 'Remembering a news report makes botulism more frequent than asthma in the underlying comparison.',why='The task asks about probability, but dramatic coverage can supply accessible examples of a less common cause. The accessibility of a cause is not its mortality frequency.')
question(9,'application','Robert wears glasses, speaks quietly, and reads a lot. Respondents choose librarian despite the supplied difference in the prevalence of farms and libraries. What feature makes this a representativeness judgment?',
 'His description resembles the expected category, and the similarity displaces background prevalence information.',
 'Respondents first retrieve all librarians they have personally met and explicitly count their remembered examples.',
 'The choice is determined by a conjunction between two nested sets of bank tellers.',
 'The description changes the supplied base rates so that the librarian category is now more prevalent.',why='Representativeness uses a match to typical category properties. The error is neglecting relevant base-rate information because the description fits the less prevalent category.')
question(10,'design','Participants correctly answer the bare 70-lawyer/30-engineer question, then favor engineer after reading Jack’s hobbies. What comparison is supported by those responses?',
 'They can use a base rate when it is alone but can disregard it when a representative description is supplied.',
 'They cannot understand any numerical probability, because answering the bare base-rate question correctly is impossible.',
 'Adding a description experimentally changes the group from 30 engineers to 70 engineers.',
 'Descriptive information has no influence because the two questions use the same category labels.',why='The group composition remains fixed. The change in responses after a fitting description indicates that descriptive similarity can override base-rate information the participants previously used.')
question(11,'application','A respondent ranks “Linda is a bank teller and active in the feminist movement” above “Linda is a bank teller.” Which relationship makes that ranking inconsistent with the conjunction rule?',
 'Every feminist bank teller is also a bank teller, so the added condition cannot make the combined event more probable.',
 'Every bank teller is necessarily active in the feminist movement, so the two statements contain identical information.',
 'A description containing more personality details must always be more probable than a shorter description.',
 'The conjunction rule applies only when the two categories have no members in common.',why='The conjunction is a subset of the bank-teller event. A good descriptive match can favor the detailed option psychologically, but cannot make its probability exceed that of its constituent.')
question(12,'design','The hospital question asks about days with over 60% boys, using daily samples of 15 and 45 births. Which response addresses the quantity actually being compared?',
 'Compare how often each daily sample produces an extreme proportion, taking sample size into account.',
 'Compare the total number of boys born in each hospital during the entire year.',
 'Assume both daily samples must contain exactly 50% boys because that is the population proportion.',
 'Choose the larger hospital solely because it has more births, regardless of the daily percentage threshold.',why='The outcome is the frequency of days crossing a proportion threshold. Daily sample size affects that frequency; it is not a question about the total annual count of boys.')
question(13,'application','Both hospitals draw from a population with about half boys. Why should the hospital with 15 daily births have more days above 60% boys than the hospital with 45?',
 'Its smaller daily samples have more variable proportions, making departures from the population proportion more likely.',
 'Its underlying population must contain more boys because a smaller sample changes the biological base rate.',
 'It has more births in total, so every proportion is necessarily larger.',
 'The larger hospital cannot ever exceed 60% because large samples prohibit all random variation.',why='Small samples fluctuate more in composition. The populations can have the same proportion while differing in how stable the daily sample percentages are.')
question(14,'definition','Which statement matches the law of large numbers without treating a small sample as a guaranteed miniature population?',
 'Larger random samples tend to be more representative of their population than smaller random samples.',
 'Every random sample exactly reproduces its population as soon as the first individual is selected.',
 'Increasing sample size guarantees that every observation has the same value.',
 'Random sampling makes sample size irrelevant to how far the observed composition can depart from the population.',why='The law concerns the general improvement in representativeness as the number randomly drawn increases. Small random samples can still depart substantially from the population.')
question(15,'application','A stereotype leads someone to notice and recall matching behaviors while overlooking other behavior, then judge the group strongly associated with the stereotype. Which account connects the processes?',
 'Selective attention makes matching instances available, reinforcing an illusory correlation that may be absent or much weaker than believed.',
 'An illusory correlation means that a genuine relationship has been measured accurately with a representative sample.',
 'A stereotype prevents any matching instance from entering memory, so the apparent relationship cannot involve availability.',
 'The conjunction rule establishes that a group must possess every behavior attributed to it.',why='Stereotype-consistent attention can bias the evidence that is accessible. Those remembered matches reinforce a perceived association beyond what the actual relationship supports.')
question(16,'researcher','Lord and coworkers (1979) gave the same article to people favoring and opposing capital punishment. Each group found support for its own view. What does the shared article help establish about the pattern?',
 'Different existing attitudes can guide selective evaluation of common information in a belief-consistent direction.',
 'The groups necessarily received different articles because one article cannot be interpreted differently.',
 'Reading the same article eliminates all influence of prior beliefs on the evaluation of evidence.',
 'Myside bias occurs only when participants are forbidden to read any information about the issue.',why='The material was common, but participants focused on agreeing information and disregarded disagreeing information. The result concerns attitude-biased evaluation rather than different assigned evidence.')
question(17,'application','In the 2, 4, 6 task, a participant repeatedly tests triples increasing by two and receives “fits the rule” feedback. Why does that feedback fail to establish the participant’s narrow hypothesis?',
 'Those triples also fit the broader rule of any three increasing numbers, so the tests do not discriminate the hypotheses.',
 'Positive feedback means the experimenter has explicitly confirmed the participant’s verbal rule in full.',
 'The actual rule requires decreasing numbers, so every increasing triple must receive negative feedback.',
 'The task provides feedback about whether each participant has personally discovered a new mathematical law.',why='Feedback concerns whether a triple fits the hidden rule, not whether the proposed verbal hypothesis is the only possible rule. Confirming cases can fit both a narrow and a broader account.')
question(18,'definition','According to expected utility theory, what should a rational decision maker with all relevant information choose?',
 'The alternative with the greatest expected utility, considering desirable outcomes and their probabilities.',
 'The alternative with the single largest possible monetary prize regardless of its chance of occurring.',
 'Whichever alternative contains the greatest number of visibly favorable objects, regardless of the total.',
 'The option most recently retrieved from memory even when its expected benefit is lower.',why='The theory predicts maximizing expected benefit, not simply the most attractive possible outcome. Probability and outcome value both contribute to the comparison.')
question(19,'application','A person knows casino odds are unfavorable but still chooses to gamble. Which conclusion is supported by the discussion of utility?',
 'Actual choices can involve considerations beyond maximizing expected monetary payoff, and people can value things besides money.',
 'Any choice to gamble proves the person has no knowledge of the available odds.',
 'Expected monetary payoff is guaranteed to be positive whenever someone chooses an activity.',
 'Utility means that all desirable outcomes must be expressed as identical amounts of money.',why='Knowing unfavorable odds does not prevent gambling. The utility discussion distinguishes a formal best-payoff comparison from actual choices and acknowledges that value is not restricted to money.')
question(20,'application','A person chooses seven red jellybeans among 100 rather than one red bean among 10, with the same dollar reward per red draw. Which comparison explains why the chosen option has worse odds?',
 'Seven is the larger winning count, but 7/100 is below 1/10 because the denominator also increases.',
 'Seven red beans provide a 70% winning chance because every bowl must be treated as containing ten beans.',
 'The two choices are equally probable because both contain at least one red bean.',
 'A larger total number of beans guarantees a larger winning fraction regardless of their colors.',why='The winning probabilities are 7% and 10%. The greater number of winning beans can attract choice while obscuring the much larger total in that bowl.')
question(21,'application','After September 11, some travelers avoided flying and drove instead. Which feature of the risk comparison makes the behavioral shift potentially harmful?',
 'Road travel has the higher probability of death, so avoiding a salient air threat can increase exposure to a more likely danger.',
 'Choosing a different travel mode removes all possibility of death during the journey.',
 'A frightening event must be more probable than a less salient event by definition.',
 'Risk comparisons are determined only by whether a person has personally seen an accident.',why='The supplied comparison places car-accident mortality risk above flying risk. Avoiding the feared mode is not the same as selecting the lower-risk alternative.')
question(22,'researcher','In Ritov and Baron’s (1999) convoy dilemma, rerouting saves 1,000 but costs 100 lives at the original camp. Most respondents refuse. Which interpretation fits that response?',
 'The numerical advantage in net lives saved does not by itself determine willingness to take an action that also causes loss elsewhere.',
 'Respondents maximize the stated net number of lives saved because refusing necessarily saves more people.',
 'Rerouting saves no one at the second camp, so the question contains no genuine outcome difference.',
 'The dilemma concerns a choice between two identical routes with no difference in who receives food.',why='The net count favors rerouting, yet 63% refuse. The refusal therefore involves considerations beyond choosing the numerically better balance of lives saved and lost.')
question(23,'researcher','Tetlock and colleagues’ (2000) Sacred Value Protection Model distinguishes taboo from tragic tradeoffs. Which pairing is accurate?',
 'Taboo mixes sacred and secular values; tragic places sacred values in conflict with each other.',
 'Taboo compares two sacred values; tragic exchanges a sacred value for an ordinary monetary benefit.',
 'Both categories mean the offered amount is too small, with no difference in the kind of value compared.',
 'Sacred values are defined by willingness to exchange them for the highest available payment.',why='The model treats the mixing of sacred and secular domains as threatening. A conflict between two sacred concerns is tragic and produces a different moral response.')
question(24,'application','Which change converts the Johnny liver-transplant scenario from a taboo tradeoff to a tragic tradeoff?',
 'Replace the alternative use of one million dollars with another child needing the only available liver.',
 'Increase the money available for equipment while keeping the choice between money and Johnny’s life.',
 'Keep both options unchanged but describe the hospital’s budget in more detail.',
 'Remove the child’s need for a transplant so that neither alternative has a life-preserving outcome.',why='The tragic scenario compares two lives competing for one organ. The taboo scenario compares saving the child with alternative uses of money, crossing sacred and secular domains.')
question(25,'researcher','Which pattern matches the moral-outrage results for saving or not saving Johnny?',
 'Not saving Johnny produces much higher outrage than saving him under taboo, while the two outcomes receive similar outrage under tragic.',
 'Saving Johnny always produces more outrage than not saving him, equally in both kinds of tradeoff.',
 'The tragic condition has the same large save-versus-not-save difference as the taboo condition.',
 'Outrage depends only on whether Johnny survives and is entirely unaffected by tradeoff type.',why='The taboo outcome difference is large, with greatest outrage when the child is not saved. In the tragic scenario, outrage is similar for the two outcomes because another child also needs the organ.')
question(26,'researcher','Ginges, Atran, Medin, and Shikaki (2007) interviewed settlers, refugees, and politically affiliated students about proposed deals. What feature distinguishes the research setting?',
 'The judgments came from conflict-involved groups evaluating proposed compromises over issues relevant to them.',
 'All participants were randomly selected laboratory observers with no connection to the conflict.',
 'The method measured only memory for word lists and never asked about any tradeoff.',
 'Every participant belonged to one identical category and held the same sacred value by definition.',why='The participants came from distinct groups directly situated within the conflict. The tradeoff offers concerned their interests, without assuming every member held the issues sacred.')
question(27,'design','Which change differentiates the symbolic offer from Taboo+ in the Israeli–Palestinian proposals?',
 'The symbolic offer adds recognition and apology, while Taboo+ adds an annual monetary payment.',
 'The symbolic offer increases the annual payment, while Taboo+ contains no material term.',
 'Both offers change only the color of the written proposal and keep its substantive terms identical.',
 'The symbolic offer removes all recognition of historical or legitimate claims from the agreement.',why='The material addition is one billion dollars per year for ten years. The symbolic addition concerns recognition of a legitimate state and an apology, engaging a different kind of value.')
question(28,'definition','Two participants strongly oppose territorial compromise. One rejects it no matter how large the benefit; the other allows benefits to enter the decision. How does the sacred-value measure distinguish them?',
 'Only the consequence-independent refusal meets the moral-absolutist criterion; strong opposition alone does not.',
 'Both must be moral absolutists because any strong preference is identical to a sacred value.',
 'The participant considering benefits is the absolutist because sacred values maximize monetary gain.',
 'Neither can have a sacred value because the criterion requires indifference to the disputed issue.',why='Moral absolutism concerns refusal regardless of benefit. Non-absolutists may still strongly oppose compromise, so the classification is not a simple measure of caring versus indifference.')
question(29,'researcher','In Ginges and colleagues’ (2007) results, adding a material incentive increases anger among moral absolutists but reduces it among non-absolutists. What does this comparison imply?',
 'The effect of the offer depends on whether the disputed issue is treated as sacred, rather than money having one uniform effect.',
 'Material additions are always accepted by every group when their nominal value is positive.',
 'Moral absolutists and non-absolutists have identical response changes, so value status is irrelevant.',
 'The monetary addition converted every participant’s preference into a sacred value before the ratings.',why='The directions differ across the sacred-value classifications. Material incentives can backfire for absolutists while reducing opposition among participants who treat the issue as negotiable.')
question(30,'design','The Iranian nuclear-program studies consider economic funds and additional sanctions. How do these terms differ as negotiation manipulations?',
 'Funds add a benefit of agreement, while sanctions add a cost of refusal.',
 'Funds and sanctions both supply only symbolic recognition with no material consequences.',
 'Sanctions are defined as an additional financial reward for accepting the agreement.',
 'Funds change the sacred-value classification directly, while sanctions measure approval without changing the deal.',why='An incentive increases what accepting provides; a disincentive increases what refusing costs. The studies investigate how those material consequences affect judgments when a value is sacred.')
question(31,'design','In the Farsi online study, which response classifies a participant as treating the nuclear program as sacred?',
 'Giving it up should not be done no matter how great the consequences.',
 'Giving it up is acceptable if the benefits of stopping the program are great enough.',
 'Giving it up is something the participant does not object to.',
 'Giving it up definitely needs to happen.',why='The sacred-value criterion is consequence-independent refusal. Accepting a sufficiently beneficial exchange is a different response even if the participant initially favors retaining the program.')
question(32,'design','The Iranian scenarios combine energy versus weapons with Taboo, Taboo+, and Taboo−. Which description correctly identifies the design and additions?',
 'There are six program-by-deal conditions; Taboo+ adds funds and Taboo− adds sanctions for refusal.',
 'There are three conditions because the two program types are the dependent variables rather than a manipulation.',
 'There are six conditions; Taboo+ adds sanctions and Taboo− adds economic funds.',
 'There are two conditions because every deal has exactly the same terms.',why='Two program types crossed with three deal types produce six conditions. The positive material addition is funding, and the negative addition threatens extra sanctions if the deal is refused.')
question(33,'researcher','Which account matches the nuclear-energy results for sacred-value participants?',
 'Adding funds lowers approval and raises anticipated anger compared with the baseline offer; sanctions also lower approval and elevate anger.',
 'Funds and sanctions both raise approval above the baseline while eliminating anticipated anger.',
 'Participants without sacred values show the largest opposition in every condition, while sacred-value participants approve all three offers.',
 'The plots report actual nuclear disarmament rather than judgments of a proposed agreement.',why='In the energy results, sacred-value participants show lower approval and greater anticipated anger under the material additions. The no-sacred-value group has relatively high approval and low anger across conditions.')
question(6,'design','A study wants to separate event probability from memory availability. Which comparison most directly targets that distinction?',
 'Hold the event frequency constant while changing how distinctive or repeatedly retrieved its examples are, then ask for probability judgments.',
 'Change both event frequency and exposure together, then assume any judgment difference comes only from availability.',
 'Ask participants to select an occupation from a personality description without measuring retrieval accessibility.',
 'Count the number of conjunctions in a sentence and treat that count as a memory measure.',why='Availability can be increased by distinctiveness or repeated retrieval independently of actual frequency. Holding frequency fixed isolates the cue whose influence the explanation proposes.')
question(9,'application','A respondent correctly defines a base rate but ignores it after hearing a category-fitting description. Which explanation differs from an availability account?',
 'The respondent judges category membership by resemblance to a typical member, rather than by ease of recalling examples.',
 'The respondent counts more memorable news reports and uses their retrieval ease as the main cue.',
 'The respondent considers only which event occurred most recently in a recalled list.',
 'The respondent applies the rule that a conjunction cannot be more probable than either of its parts.',why='Representativeness depends on similarity to a category. Availability depends on accessible instances. Both are shortcuts, but the information used as a cue differs.')
question(10,'design','In the Jack problem, what must remain visible when assessing whether descriptive information has displaced the base rate?',
 'The original group still contains 70 lawyers and 30 engineers after the personality description is added.',
 'Jack’s stated age must be interpreted as the probability that he is an engineer.',
 'The hobbies must be counted as additional engineers and added to the population total.',
 'The group must be redefined as containing only engineers before any descriptive judgment is possible.',why='The description changes what is salient, not the stated numerical composition. Base-rate neglect is meaningful because the relevant background information remains available.')
question(11,'design','The Linda alternatives are drawn as a set of bank tellers containing a smaller set of feminist bank tellers. Which comparison does the set relationship resolve?',
 'The joint event cannot be more probable than bank-teller status alone, regardless of how well Linda fits the added description.',
 'The smaller set is more probable because a more specific description always has more members.',
 'The set relationship establishes that Linda cannot possibly be a bank teller.',
 'The two sets are unrelated because sharing one condition cannot constrain their membership.',why='The containment relation holds independently of the personality description. Every member of the conjunction belongs to the bank-teller set, limiting the conjunction’s probability.')
question(13,'design','A classmate chooses the larger hospital because it produces more boys over the year. Which correction addresses the question without changing its terms?',
 'The outcome is days above a percentage threshold, so compare variability of daily proportions rather than annual totals.',
 'The outcome is annual boy count, so the percentage threshold should be removed as irrelevant.',
 'The smaller hospital must have a different underlying sex ratio because it has fewer daily births.',
 'Neither hospital can exceed half boys on any day if the population proportion is half.',why='More births can produce more boys in absolute number while producing fewer extreme daily percentages. The requested comparison concerns sample-proportion variability, not the annual count.')
question(15,'design','Which pattern would most directly support the proposed link between stereotypes and illusory correlation?',
 'Attention and recall disproportionately favor stereotype-consistent instances, and the perceived association exceeds the actual relationship.',
 'All behaviors receive equal attention and the perceived association exactly matches the observed relationship.',
 'The participant never notices or remembers any behavior related to the group.',
 'The association is defined only by whether the group contains more than 30 individuals.',why='The explanation involves selective noticing and availability of confirming behaviors. An illusion requires a perceived relationship absent from, or stronger than, the underlying evidence.')
question(16,'application','People with opposed capital-punishment views read the same article and each dismisses its disagreeing material. Which label best captures the role of their existing attitudes?',
 'Myside bias, a belief-consistent way of generating or evaluating evidence.',
 'The conjunction rule, because the article must contain two nested occupations.',
 'The law of large numbers, because opposed attitudes imply different sample sizes.',
 'Maximum expected monetary utility, because the task pays each reader for agreeing.',why='Myside bias concerns evidence processing in favor of one’s own opinions. The same material can be selectively accepted or discounted in different directions according to prior attitudes.')
question(17,'design','What kind of number-rule test would provide more information than repeatedly submitting only triples increasing by two?',
 'A triple that could separate the narrow “intervals of two” hypothesis from the broader “increasing numbers” rule.',
 'Another triple selected solely because it satisfies every aspect of the current narrow hypothesis.',
 'A request that the experimenter stop giving any feedback about whether triples fit.',
 'A decision to write the current hypothesis as correct without considering any alternative rule.',why='A diagnostic test distinguishes competing hypotheses. Repeated confirmations shared by a narrow and broad rule can leave the participant unaware that the narrow restriction is unnecessary.')
question(20,'design','To assess the jellybean choice, a student reports only “seven red beans versus one.” What essential information has been omitted?',
 'The total beans in each bowl, which are needed to compare the winning proportions of 7/100 and 1/10.',
 'The age of the person who placed the jellybeans, which determines all drawing probabilities.',
 'The total number of dollars earned by every participant in the entire experiment.',
 'Whether the red color was described using a conjunction of two adjectives.',why='A count of favorable items is insufficient without the possible-outcome total. Seven winners in 100 offer a worse chance than one in ten even though seven is a larger count.')
question(22,'application','A respondent refuses to reroute the convoy even when the loss at the first camp is reduced to one person while 1,000 are saved elsewhere. What does that refusal most directly contradict?',
 'An account in which the decision is determined solely by maximizing the stated net count of lives saved.',
 'The fact that the original destination receives no food after the convoy is rerouted.',
 'The claim that decisions can involve considerations other than the numerical balance of outcomes.',
 'The premise that the convoy has a choice between two camps.',why='Reducing the loss makes the net benefit of rerouting even larger, yet the respondent still refuses. That pattern is inconsistent with net numerical benefit being the only determinant.')
question(25,'design','An analyst summarizes Tetlock’s results as “saving Johnny has the same effect regardless of tradeoff type.” Which comparison challenges that summary?',
 'The save-versus-not-save difference is large under taboo but small under tragic.',
 'The tragic condition has no possible outcome in which any child receives an organ.',
 'The taboo condition includes no money and therefore cannot be compared with the tragic condition.',
 'Every bar has exactly the same outrage rating, making all effects identical.',why='The pattern depends on both the outcome and the tradeoff. Not saving Johnny especially increases outrage under taboo, whereas the tragic outcomes receive similar ratings.')
question(29,'design','What result distinguishes the symbolic offer from simply raising the economic reward for a sacred-value concession?',
 'Symbolic recognition is associated with lower anger and violence support, while added money increases those responses among moral absolutists.',
 'Symbolic recognition is defined as the same annual payment with a different currency name.',
 'Both additions necessarily increase outrage equally in every participant group.',
 'Neither offer changes any substantive term of the agreement participants evaluate.',why='Symbolic reciprocity addresses recognition, while a payment frames the sacred issue as exchangeable. The results associate those additions with different responses among those holding sacred commitments.')
question(28,'application','A non-absolutist strongly opposes a proposed agreement. Why is it inaccurate to classify that person as indifferent merely because the issue is not sacred?',
 'Non-absolutists can have strong preferences against compromise while allowing benefits and consequences to enter their evaluation.',
 'Not holding a sacred value means the person cannot have any opinion about the disputed issue.',
 'Every person who dislikes an agreement necessarily refuses it regardless of all possible consequences.',
 'Moral absolutism is determined by membership in a participant group rather than the person’s response.',why='The distinction is about whether a value is excluded from consequence-based tradeoffs. Both classifications can care strongly; only one treats compromise as unacceptable regardless of benefit.')
question(31,'design','Which distinction keeps the Iranian study’s sacred-value classification separate from its outcome measures?',
 'Refusal regardless of consequences classifies the value, while approval, anger, and misleading judgments measure responses to the deal.',
 'Approval alone defines the sample size, while all other responses are unrelated background decoration.',
 'Every participant is classified as sacred-value because the study was conducted in Farsi.',
 'The number 1,997 identifies the year of the study rather than the participant count.',why='The study involved 1,997 participants. Sacred-value status comes from the consequence-independent position, and the separate dependent judgments assess how the proposed deal is received.')
question(32,'design','What is specifically being rated when the Iranian scenarios ask about anger?',
 'Whether people would be angry if the Iranian government approved the deal.',
 'Only the participant’s remembered anger while reading an unrelated article.',
 'The number of sanctions that the United Nations has already imposed.',
 'Whether the nuclear facilities physically produce a measurable anger response.',why='The wording asks for anticipated public anger conditional on government acceptance. It is a judgment distinct from the participant’s personal approval and from the misleading rating.')
question(33,'design','The final energy plots show similar low anger across the three conditions for no-SV participants, but greater anger with added funds among SV participants. Which conclusion stays within those observations?',
 'Responses to material additions depend on value status; the displayed results concern energy approval and anticipated anger.',
 'The plots establish the unreported weapons results and misleading ratings with the same numerical values.',
 'The plots demonstrate that every Iranian regards nuclear energy as sacred.',
 'The plots show funds causing higher approval in the sacred-value group than the baseline deal.',why='The displayed findings concern energy and differentiate sacred-value from no-sacred-value responses. They do not supply numerical findings for every measured outcome or every program type.')
question(32,'design','Which comparison best isolates the effect of attaching an economic reward to the proposed nuclear agreement?',
 'Compare Taboo with Taboo+ for the same program type and sacred-value classification, retaining the reciprocal agreement in both.',
 'Compare energy under Taboo with weapons under Taboo− and attribute every difference only to added funds.',
 'Compare the number of participants with the number of deal types and call their difference an approval effect.',
 'Compare approval of the deal with whether a participant speaks Farsi, without varying the offer.',why='Taboo+ adds funds to the basic reciprocal proposal. Holding program type and value classification fixed makes the monetary addition the relevant difference in that comparison.')
assert len(sections)==33 and [s['page'] for s in sections]==list(range(1,34))
assert len(questions)==50,len(questions)
collection=dict(id=12,title='Judgment, Decision Making, and Reasoning',file='CogPsych_Ch13_1 F26.pdf',sourcePdf='sources/CogPsych_Ch13_1_F26.pdf',sections=sections,original=[f'media/judgment/slide-{p:02}.webp' for p in range(1,34)],optional=False)
path=ROOT/'module2-data.js';bank=json.loads(path.read_text().split('window.SECOND_HALF = ',1)[1].rstrip(';\n'))
bank['collections']=[c for c in bank['collections'] if c['id']!=12]+[collection]
bank['questions']=[q for q in bank['questions'] if q['module']!=12]+questions
bank['modules']=[m for m in bank['modules'] if m!=12]+[12]
bank['lectureNumbers']['12']='13';bank['revision']='judgment-balanced-100'
for key in ['topics','coreReview','experiments']:bank[key]=[g for g in bank[key] if g.get('module')!=12]
for title,pages in [
 ('Judgments, decisions, and inductive evidence',[2,3,4]),
 ('Availability, representativeness, and sample size',[5,6,7,8,9,10,11,12,13,14]),
 ('Illusory correlation, myside bias, and hypothesis testing',[15,16,17]),
 ('Utility, probabilities, and choices that cause harm',[18,19,20,21,22]),
 ('Sacred values, taboo and tragic tradeoffs',[23,24,25]),
 ('Sacred values in intergroup negotiation',[26,27,28,29]),
 ('Nuclear-program study, manipulations, measures, and energy results',[30,31,32,33])]:bank['topics'].append(dict(module=12,title=title,pages=pages,progressKey='m2-topic-12-'+str(pages[0])))
for title,pages in [
 ('Induction and probability shortcuts',[3,5,6,7,9,10,11,13,14]),
 ('Selective evidence and confirmation bias',[15,16,17]),
 ('Utility and decision outcomes',[18,20,22]),
 ('Sacred-value distinctions, designs, and results',[23,24,25,27,28,29,31,32,33])]:bank['coreReview'].append(dict(module=12,title=title,pages=pages))
for title,pages in [
 ('Availability judgments · letter positions and causes of death',[6,7,8]),
 ('Representativeness · Robert, Jack, and Linda',[9,10,11]),
 ('Hospital samples · extreme proportions and sample size',[12,13,14]),
 ('Lord and coworkers · myside bias in article evaluation',[16]),
 ('Hidden number rule · confirmation and diagnostic tests',[17]),
 ('Jellybeans · favorable counts versus winning probability',[20]),
 ('Ritov and Baron · convoy rerouting and lives saved',[22]),
 ('Tetlock and colleagues · taboo and tragic outcomes',[23,24,25]),
 ('Ginges and colleagues · payment, recognition, and sacred commitments',[26,27,28,29]),
 ('Iranian online study · sacred values, funds, sanctions, and energy results',[30,31,32,33])]:bank['experiments'].append(dict(module=12,title=title,pages=pages))
path.write_text('window.SECOND_HALF = '+json.dumps(bank,ensure_ascii=False,indent=2)+';\n')
print('Added collection 13:',len(sections),'slides,',len(questions),'new questions. Current lecture IDs:',bank['modules'])
