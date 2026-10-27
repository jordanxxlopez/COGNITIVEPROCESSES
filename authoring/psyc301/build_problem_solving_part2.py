"""Append collection 12 from the supplied Part II PDF without changing prior material."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sections=[]
def section(page,title,*paragraphs):sections.append(dict(page=page,title=title,bullets=list(paragraphs),image=page-1))
section(1,'Problem Solving and Reasoning · Part II · title')
sections[-1]['sourceOnly']=True
section(2,'Problem solving involves representation, search, and how the task is stated',
 '<strong>Reorganization and insight</strong> concern how a problem is represented in the mind. A person can initially organize the elements in a way that hides a useful relationship. Reorganizing that representation can make a solution available, sometimes with the sudden realization associated with insight.',
 '<strong>Problem solving as search</strong> concerns the activity between posing a problem and reaching its solution. The solver has to find a route through possible states. Specifying the starting conditions and the goal does not by itself identify the sequence that connects them.',
 '<strong>How a problem is stated</strong> can affect its difficulty because the presentation influences the relationships a person represents. In the mutilated-checkerboard problem, the board and dominoes can be considered through their total area or through the pairing of different-colored squares. The color relationship makes a constraint available that the area calculation alone does not supply.')
section(3,'The Russian marriage problem depends on equal numbers of two groups',
 'The <strong>Russian marriage problem</strong> begins with <strong>32 bachelors and 32 unmarried women</strong>. A matchmaker arranges 32 heterosexual marriages, pairing one person from each group. The initial numbers allow every person to belong to one of the required pairs.',
 'Two bachelors then die after a contest involving pierogies. There are <strong>62 survivors</strong>, but they consist of <strong>30 men and 32 women</strong>. The question asks whether rearranging the surviving people can produce 31 heterosexual marriages under the same one-person-from-each-group requirement.',
 'The answer is <strong>no</strong> because the two groups no longer have equal numbers. At most 30 of the required marriages can be formed, leaving two women without a partner from the other group. Dividing 62 people by two gives 31 possible pairs by total size, but it does not satisfy the requirement about which kinds of person each pair must contain.',
 'The obstacle remains even if every existing marriage is rearranged. No rearrangement creates an additional member of the smaller group. Solving depends on recognizing the imbalance between the two categories rather than searching through possible matches one at a time.')
section(4,'Opposite missing corners leave an imbalance between square colors',
 'A <strong>domino</strong> covers two adjacent checkerboard squares, one of each color. Removing two opposite corner squares removes two squares of the <strong>same color</strong>. The remaining board therefore contains unequal numbers of the two colors, even though its 62 squares have the same total area as 31 dominoes.',
 'Every proposed complete covering would have to pair each square of one color with a square of the other color. Because one color is more numerous, some squares would remain unmatched. Moving the dominoes into a different arrangement cannot change that imbalance.',
 'The two square colors play the roles of the two kinds of member needed for each pair. Total area gives the number of pairs that would be needed, while the color counts determine whether those particular pairs can exist. The impossibility follows from the pairing requirement shared by all legal domino placements.')
section(5,'Analogical transfer maps a source problem onto a target problem',
 '<strong>Analogical problem solving</strong> uses the solution to a similar problem to guide the solution to a new problem. The <strong>target problem</strong> is the problem currently being solved. A <strong>source problem</strong> is another problem that shares relevant similarities with it.',
 'The <strong>Russian marriage problem</strong> can serve as the source and the <strong>mutilated-checkerboard problem</strong> as the target. Marriages correspond to dominoes, and the two groups of people correspond to the two square colors. A valid marriage needs one member of each group, just as a domino placement needs one square of each color.',
 'Removing two bachelors corresponds to removing two squares of the same color. Both changes leave an imbalance between the categories that must be paired. The shared relationship makes the source solution useful even though arranging marriages and covering a board involve different objects.',
 '<strong>Analogical transfer</strong> is the transfer from the source problem to the target problem. Learning about the Russian marriage problem improves the ability to solve the checkerboard problem because the source supplies a way to recognize the required one-of-each pairing. The useful information is the relationship among the elements, rather than their identical appearance.')
section(6,'Duncker’s radiation problem requires a strong effect without damaging the path',
 '<strong>Duncker’s radiation problem</strong> concerns a patient with a malignant tumor in the stomach. An operation is impossible, and the tumor must be destroyed for the patient to survive. A ray can destroy the tumor if sufficiently high intensity reaches it at once.',
 'A <strong>high-intensity ray</strong> would also destroy the healthy tissue that it passes through on the way to the tumor. A <strong>low-intensity ray</strong> would spare that healthy tissue but would not destroy the tumor. Choosing a single high or low intensity therefore fails one of the two requirements.',
 'Several <strong>low-intensity rays can converge on the tumor from different directions at the same time</strong>. Each path through the surrounding tissue receives a low intensity, while the combined intensity at the tumor is sufficient to destroy it. The strong effect is concentrated at the target rather than delivered through one surrounding path.',
 'Only about <strong>10% of participants</strong> arrive at the correct solution without the helpful analogy. The problem requires changing how the necessary intensity is delivered. Splitting the delivery across paths preserves the total effect at the tumor while avoiding a damaging intensity along an individual path.')
section(7,'The fortress problem separates safe routes from the force needed at the target',
 'A dictator rules from a <strong>strong fortress</strong> in the middle of a country, with roads approaching through farms and villages. A rebel general has an army strong enough to capture the fortress if the entire force attacks it. The difficulty concerns getting that force to the fortress safely.',
 '<strong>Mines on each road</strong> allow small groups to pass but detonate when a large force travels together. Sending the entire army down one road would destroy the road and damage neighboring villages. A small group can travel safely but lacks the force required to capture the fortress on its own.',
 'The general can divide the army into <strong>small groups approaching along different roads</strong>. Each group remains below the danger threshold on its route. If the groups arrive together, their combined force at the fortress is sufficient for the attack.',
 'The relevant arrangement combines weak individual approaches into a strong effect at a central target. The roads impose a limit on what can pass safely, while the fortress imposes a requirement on the total force that must arrive. Coordinating separate groups satisfies those two constraints together.')
section(8,'Small attacking groups correspond to converging low-intensity rays',
 'In the <strong>fortress solution</strong>, small groups approach along several roads and arrive at the central fortress together. Each road carries a group small enough to avoid detonating its mines. At the fortress, the groups combine into the large attacking force needed to capture it.',
 'In the <strong>radiation solution</strong>, low-intensity rays approach the tumor along several paths. Healthy tissue along an individual path receives only a low intensity. Where the rays meet at the tumor, their combined effect supplies the intensity needed to destroy it.',
 'The <strong>fortress corresponds to the tumor</strong>, the <strong>small groups correspond to low-intensity rays</strong>, and the <strong>roads correspond to paths through surrounding tissue</strong>. Sending one large force down one road corresponds to sending one damaging high-intensity ray through healthy tissue.',
 '<strong>Convergence</strong> preserves a strong effect at the destination while limiting what travels through each approach. Timing is part of that relationship because the separate contributions must combine at the target. Merely dividing the army or lowering every ray’s intensity without combining the effects would leave the target requirement unmet.')
section(9,'Noticing, mapping, and applying an analogy are separate steps',
 '<strong>Gick and Holyoak</strong> distinguished <strong>noticing an analogous relationship</strong>, <strong>mapping correspondences</strong>, and <strong>applying the mapping</strong>. Noticing concerns recognizing that a source problem may be relevant to the current target. It is crucial and can be the most difficult step.',
 '<strong>Mapping</strong> connects the elements and relationships of the source to those of the target. For the fortress and radiation problems, the central target, the separate approaches, and the limited safe intensity have corresponding roles. <strong>Applying the mapping</strong> uses those correspondences to generate a parallel solution for the target.',
 'After reading the fortress story, about <strong>30% of participants</strong> solved the radiation problem. Many participants had encountered the source without recognizing how it applied to the medical target. Availability of the story in memory therefore did not guarantee spontaneous use of its solution.',
 'When participants were <strong>told to think about the story they had read</strong>, success rose to about <strong>75%</strong>. The reminder helped make a relevant source available for mapping and application. The difference separates encountering a useful analogy from noticing and using the relationship when solving another problem.')
section(10,'Surface features can hide a shared relationship',
 '<strong>Surface features</strong> are the specific elements of a problem, such as a fortress, an army, a tumor, or a ray. Those details help describe the situation, but two problems can use very different objects while sharing the relationship needed for a solution.',
 'A fortress and a tumor do not look alike and belong to different kinds of situation. Focusing on that difference can keep a person from noticing that both tasks require a strong combined effect at a central target while keeping the separate approaches safe.',
 'Making surface features more similar can make an analogous relationship easier to notice. A source that resembles the current target offers a more readily recognizable connection. Noticing concerns finding a potentially relevant source, while mapping concerns working out how its elements and relationships correspond to the target.')
section(11,'The lightbulb problem preserves a target-and-surroundings constraint',
 'Ruth finds an expensive laboratory <strong>lightbulb with a broken filament</strong>. The bulb must produce precisely controlled light, but its surrounding glass is sealed, so she cannot open it to repair the filament directly. The task is to fuse the two broken parts while leaving the surrounding glass intact.',
 'A brief, <strong>high-intensity laser beam</strong> could fuse the filament, but it would also break the fragile glass. A <strong>low-intensity beam</strong> would preserve the glass but would not fuse the filament. A single beam at either intensity fails one of the task’s requirements.',
 'Several <strong>low-intensity laser beams</strong> can be directed toward the filament from different directions at once. Their combined effect at the filament supplies enough intensity to fuse it, while each part of the surrounding glass receives only a low-intensity beam.',
 'The filament needs a strong local effect, while the glass limits the intensity that can pass safely along an individual path. Separating the paths and combining their effects at the filament meets both requirements. The arrangement uses the relationship between the target and its vulnerable surroundings to organize the repair.')
section(12,'A radiation source improves transfer to the lightbulb target',
 '<strong>Duncker’s radiation problem</strong> can act as a <strong>source</strong> for the <strong>lightbulb problem</strong>. The tumor and broken filament are targets requiring a strong local effect. Healthy tissue and fragile glass are surroundings that a single high-intensity approach would damage.',
 'The two tasks also share relatively similar <strong>surface features</strong>. Both involve directing a beam toward an internal target. That similarity makes it easier to notice a possible connection than when comparing medical radiation with an army approaching a fortress.',
 'About <strong>81% of participants who knew the radiation problem</strong> solved the lightbulb problem, compared with about <strong>10% in the control group</strong>. Knowledge of the source was associated with much greater success on the target. Surface similarity can help make a useful analogy available, allowing its converging-beam solution to be applied to the new task.')
section(13,'Surface features name objects, while structural features govern the solution',
 '<strong>Surface features</strong> are the specific elements used to describe a problem. Lightbulbs and lasers are surface elements, just as tumors and radiation rays are elements of the medical problem. Similar objects can help a person notice that two situations may be related.',
 '<strong>Structural features</strong> concern the underlying principle that governs the solution. In the radiation problem, a strong ray destroys healthy tissue on its way to the tumor. In the fragile-glass lightbulb problem, a strong laser breaks the glass on its way to the filament.',
 'Both problems require enough intensity at an internal target while restricting the intensity delivered through its surroundings. That relationship explains why several low-intensity approaches must converge. The structure includes the constraints that make a particular solution useful, rather than only the names of the objects.',
 'Two versions of the lightbulb problem can keep the <strong>same surface features</strong> while changing the <strong>structural features</strong>. Using the same bulb, filament, and lasers holds the object descriptions similar. Changing why a single laser fails changes the relationship between the source and the radiation target.')
section(14,'Fragile glass supplies the same structural obstacle as vulnerable tissue',
 'In the <strong>fragile-glass source problem</strong>, a high-intensity beam would fuse the broken filament but would also break the surrounding glass. Lower intensity would protect the glass but fail to repair the filament. The source therefore contains both a target-intensity requirement and a surrounding-damage constraint.',
 'Ruth places <strong>several lasers around the lightbulb</strong> and directs their low-intensity beams toward the filament at the same time. Their combined effect is strong enough where they converge to fuse the filament. Each location on the surrounding glass receives only a low-intensity beam, so the glass remains intact.',
 'The <strong>radiation target</strong> has the same relevant structure. Healthy tissue limits the strength of an individual incoming ray, but the tumor requires a stronger combined intensity. The source’s reason for using convergence therefore corresponds to the target’s reason for requiring it.',
 'About <strong>69% of participants</strong> who read the fragile-glass solution solved the radiation problem. The source supplies both a converging-beam procedure and the constraint that explains why that procedure is needed. The useful correspondence concerns the relationship between a strong target effect and protected surroundings.')
section(15,'Insufficient laser intensity changes the source’s structural features',
 'In the <strong>insufficient-intensity source problem</strong>, the laser generates only low-intensity beams that cannot fuse the filament. The obstacle is an inadequate intensity from the available source. This version does not make damage to surrounding fragile glass the reason that a single high-intensity beam cannot be used.',
 'Ruth again places several lasers around the bulb and directs their beams toward the filament together. Their combined effect supplies the intensity needed to fuse it. The physical convergence procedure resembles the fragile-glass solution, but the problem gives a different reason for combining the beams.',
 'The <strong>radiation problem</strong> requires both a sufficient effect at the tumor and protection of the surrounding healthy tissue. The insufficient-intensity version shares the need for a stronger combined effect but does not supply the same surrounding-damage constraint. The surface objects remain similar while that structural correspondence changes.',
 'About <strong>33% of participants</strong> who read this source solution solved the radiation problem, compared with about <strong>69%</strong> after the fragile-glass source. The different transfer rates accompany a difference in the underlying constraints, even though both source solutions use converging laser beams.')
section(16,'Analogical encoding compares problems to identify structural similarities',
 '<strong>Structural features</strong> are the underlying principles that govern a problem’s solution. Making these relationships more apparent can improve analogical problem solving because a solver has to recognize what can be transferred from the source to the target.',
 '<strong>Analogical encoding</strong> is the process of comparing two problems and determining the similarities between them. Comparing the problems encourages attention to relationships that appear in both, rather than considering each set of surface details in isolation.',
 'For example, comparison can make the shared need for <strong>convergence</strong> apparent across source stories with different objects. Separate weak approaches combine at one target, while constraints along the approaches prevent a single strong delivery. The transferable information concerns those roles and relationships.',
 'Having participants <strong>compare source stories</strong> can direct their reasoning toward the structural features that govern the solution. A later target can then be approached through the common relationship identified across the sources, instead of depending entirely on the appearance of one familiar object or situation.')
section(17,'Analogies can be difficult to transfer in a lab and common in everyday work',
 'The <strong>analogical paradox</strong> is the contrast between difficulty applying analogies in laboratory tasks and the routine use of analogies in real-world settings. A person can fail to recognize an experimentally supplied source yet use relationships from other situations during ordinary problem solving.',
 'Scientists use about <strong>3–15 analogies in a one-hour laboratory meeting</strong>. Their discussion can involve connecting a current question with another situation or known solution. Analogical reasoning therefore occurs within ongoing work, rather than only when an experiment explicitly assigns a source and target problem.',
 '<strong>In vivo problem-solving research</strong> observes people solving problems in real-world settings. The naturalistic setting retains the context in which the activity ordinarily occurs, including the information and interactions that are part of that work.',
 'These observations can be <strong>time-consuming</strong>, and researchers cannot isolate and control variables as they can in a more constrained experiment. The method trades that experimental control for access to problem solving in its ordinary setting. The difference concerns the research conditions under which analogical activity is observed.')
section(18,'Expertise develops through learning, practice, and application in a field',
 'An <strong>expert</strong> is a person recognized as extremely knowledgeable or skilled in a particular field after devoting a large amount of time to learning, practicing, and applying that learning. The definition connects expertise to substantial experience within a domain, rather than simply confidence about a task.',
 'A <strong>chess expert</strong> can have spent approximately <strong>10,000–20,000 hours</strong> studying and playing chess. That sustained work includes encountering arrangements and applying knowledge during play. Expertise concerns the accumulated learning made available through that experience.',
 'Experts solve problems <strong>within their field faster and with a higher success rate</strong> than beginners. The relevant comparison is performance in the area in which their knowledge and skill have developed. Greater success within a field concerns how that accumulated experience can be used when a problem is encountered.')
section(19,'Chase and Simon linked chess recall to familiar, meaningful chunks',
 '<strong>Chase and Simon (1973)</strong> compared a chess master with a beginner who had fewer than 100 hours of chess experience. Each person viewed a chessboard arrangement for <strong>five seconds</strong> and then attempted to reproduce where the pieces had been. The task measured memory for the piece positions after the brief view.',
 'One condition used <strong>actual game positions</strong>, while the other used <strong>random arrangements</strong>. The expert performed much better than the beginner for actual game positions. Those arrangements contained relationships familiar from extensive chess experience.',
 '<strong>Long-term memory</strong> made meaningful arrangements available as <strong>chunks</strong>. A chunk groups related information into a useful unit, allowing the expert to access more than isolated piece locations. Knowledge of recurring chess relationships supports the reproduction of a meaningful position.',
 'The same familiar chunks were not available for the <strong>random condition</strong>. Randomizing the pieces removes the ordinary relationships that chess experience makes useful. The contrast connects the expert’s strong recall to organized domain knowledge rather than an equally large advantage for every possible arrangement of the same pieces.')
section(20,'Chi and colleagues compared how experts and novices group physics problems',
 '<strong>Knowledge organization</strong> affects how information can be accessed when solving a problem. Knowing more facts is accompanied by differences in how relevant problems are grouped and related to the principles needed to solve them.',
 '<strong>Chi et al. (1982)</strong> presented <strong>24 physics problems</strong> to experts who were physics professors and novices who were students with one semester of physics. Participants sorted the problems into groups according to their similarities. The task concerned how they represented relationships among problems, rather than merely whether they could recite a definition.',
 '<strong>Novices grouped problems by surface features</strong>, such as the appearance of the objects involved. Two problems containing inclined planes could therefore be treated as alike because they involved similar-looking physical setups.',
 '<strong>Experts grouped problems by structural features</strong>, including the underlying principles involved. Problems with different-looking objects could belong together if the same physics principle governed their solutions. The organization makes knowledge accessible through a relationship relevant to solving, rather than only through a matching object description.')
section(21,'Inclined planes can look alike while an expert groups by conservation of energy',
 'The novice groups <strong>problems 23 and 24</strong> together because both involve <strong>inclined planes</strong>. One has a block moving along a slope, and the other has blocks on an incline. Their similar objects and layouts supply the surface basis for the grouping.',
 'Problem 23 gives a block’s weight of <strong>2 pounds</strong>, an initial speed of <strong>4 feet per second</strong>, and a friction coefficient of <strong>0.2</strong>. Problem 24 includes labels for a length and friction between the relevant surfaces. These setups both contain an incline, but the novice grouping is based on that visible similarity rather than an identified common solving principle.',
 'The expert groups <strong>problems 21 and 24</strong> together through <strong>conservation of energy</strong>. Problem 21 contains a block and spring on a horizontal surface, while problem 24 contains blocks on an incline. Their objects look different, but the shared principle supplies a structural relationship between the tasks.',
 'The <strong>same problem 24</strong> therefore belongs with a different partner under the two organizations. One pairing emphasizes the inclined-plane setup, while the other emphasizes the principle used to reason about the physical change. Expertise affects which relationship serves as the basis for similarity.')
section(22,'Expert analysis helps within a field but familiar procedures can restrict flexibility',
 '<strong>Experts spend more time analyzing a problem</strong> before proceeding with a solution. Their initial approach can be slower because they examine the problem and identify relevant relationships. That investment can pay off in solving the overall problem efficiently.',
 'The advantage is <strong>specific to the expert’s field</strong>. Experts are no better than novices when given problems outside that field. The knowledge and organization developed through practice do not automatically supply the relationships required by an unrelated problem.',
 'Expertise can also make a person <strong>less open to new ways of looking at a problem</strong>. A highly familiar approach can remain the preferred interpretation even when the task calls for another one. Being knowledgeable does not guarantee that the most familiar procedure is suitable for every new situation.',
 'Some problems require <strong>rejecting usual procedures in favor of less frequently used procedures</strong>. Under those conditions, reliance on an established approach can become a disadvantage. Flexible thinking involves reconsidering which representation or procedure fits the particular problem rather than applying familiarity as the only guide.')
section(23,'Creative problem solving includes generating, evaluating, and implementing ideas',
 '<strong>Creativity</strong> includes innovative thinking, novel ideas, and new connections between existing ideas. <strong>Divergent thinking</strong> is open-ended and allows a large number of potential solutions. The activity concerns generating possibilities rather than being confined to a single immediately available response.',
 'Creative problem solving usually involves more than obtaining an idea. It can include a <strong>lengthy period of trial and error</strong> as possibilities are developed and tested. An idea becomes part of a process that also determines what the problem is and how a proposed response can be carried out.',
 '<strong>Problem generation</strong> includes problem finding and fact finding. <strong>Problem formulation</strong> includes defining the problem and finding ideas. These activities establish what needs to be addressed and develop possible approaches to it.',
 '<strong>Problem solving</strong> includes evaluation and planning, while <strong>solution implementation</strong> means taking action. Generating several ideas does not itself evaluate them, plan a response, or put that response into practice. Those activities are additional parts of carrying a creative solution through to an outcome.')
section(24,'Ideas are necessary, and flexible thinking can require rejecting familiar procedures',
 '<strong>Generating ideas</strong> is one part of the creative process. Without ideas, the process stops because there is no proposed approach to develop. Producing an idea, however, does not complete the evaluation, planning, and action involved in carrying a solution out.',
 '<strong>Too much knowledge can sometimes hinder creative problem solving</strong> when familiar approaches constrain which possibilities are considered. An accepted procedure can dominate the representation even when the problem requires a different relationship or a less familiar approach.',
 '<strong>Thinking flexibly</strong> includes being willing to reject an accepted procedure when it does not fit the problem. Knowledge remains available, but the solver has to reconsider how it is being used. The difficulty concerns relying rigidly on an established way of proceeding rather than considering another possible solution.')
questions=[]
def question(page,kind,stem,correct,*distractors,why):
 assert len(distractors)==3
 questions.append(dict(id=5001+len(questions),module=11,page=page,kind=kind,stem=stem,options=[correct,*distractors],correct=0,why=why))
question(2,'application','Two descriptions give the same checkerboard starting arrangement and covering goal, but one description makes the two square colors salient. Why can the versions differ in difficulty?',
 'The description can make a useful pairing constraint more available in the solver’s representation.',
 'Giving the same initial and goal states guarantees that all solvers will consider exactly the same route.',
 'Changing which property is emphasized necessarily changes the physical number of squares on the board.',
 'A stated goal eliminates the need to represent relationships among the problem’s elements.',why='How a task is stated can affect which relationships the solver represents. The physical board can remain the same while the one-of-each-color requirement becomes easier to recognize.')
question(3,'application','After two bachelors die, the Russian village contains 30 men and 32 women. A matchmaker proposes 31 heterosexual marriages because 62 divided by 2 equals 31. Which constraint does that calculation omit?',
 'Each marriage requires one member of each group, and the smaller group supplies only 30 such partners.',
 'All previous marriages must remain intact, even though the story permits rearranging the surviving people.',
 'The goal requires 32 new marriages rather than the 31 specified in the problem.',
 'The remaining people cannot be counted because their original partnerships have changed.',why='The total population gives enough people for 31 pairs by size, but not for 31 pairs containing one person from each group. Rearrangement cannot remove the imbalance between 30 and 32.')
question(4,'application','Every domino covers one square of each color. After two opposite same-color corners are removed, why does trying many new domino arrangements fail to overcome the central obstacle?',
 'All legal arrangements preserve the same pairing requirement, while the board’s two color counts remain unequal.',
 'A different arrangement changes the number of squares of each color before a domino is placed.',
 'The obstacle concerns only the first domino chosen, so changing that first placement guarantees a covering.',
 'The board has an odd number of remaining squares and therefore cannot hold any complete domino.',why='The remaining 62 squares have even total area. The decisive constraint is unequal color counts under a rule that uses one square of each color. It applies to every arrangement.')
question(5,'definition','A student uses the already-solved Russian marriage problem to work out why the mutilated checkerboard cannot be covered. Which assignment of roles is correct?',
 'The marriage problem is the source, the checkerboard is the target, and applying the shared pairing relation is analogical transfer.',
 'The checkerboard is the source because it is currently being solved, and the marriage problem is the target.',
 'Both problems are targets, because a source must contain the same physical objects as the new problem.',
 'The marriage problem is a surface feature of the board, so the transfer involves no relationship between categories.',why='The target is the current problem, while the source supplies a relevant solution from another problem. The analogy maps the categories and one-of-each pairing rule despite different physical elements.')
question(6,'application','In Duncker’s radiation problem, a single strong ray destroys both the tumor and tissue along its path, while a weak ray spares tissue but fails to destroy the tumor. Which plan meets both stated constraints?',
 'Converge several weak rays on the tumor simultaneously from different directions.',
 'Send the original strong ray along one path and assume its intensity changes only after reaching the tumor.',
 'Use one weak ray without combining its effect with any other ray at the tumor.',
 'Distribute weak rays toward different locations so that no rays ever meet at the tumor.',why='Each separate path receives a low intensity, while simultaneous convergence provides a strong combined effect at the tumor. Simply choosing a high or low single intensity fails one requirement.')
question(7,'application','The fortress can be captured by a large army, but a large force on one road detonates mines. Small groups travel safely. Which relationship makes a coordinated attack possible?',
 'Separate small groups can use different safe routes and combine their force at the fortress at the same time.',
 'The entire army can use one mined road safely if the general knows the fortress is the goal.',
 'Each small group can capture the fortress alone, so their arrival times and combination are irrelevant.',
 'The general must weaken the fortress before considering any way to divide the army.',why='The task separates what is safe along a route from what is required at the destination. Dividing the army protects the approaches, and coordinated arrival supplies the required combined force.')
question(8,'application','A solver maps the fortress story onto the radiation problem. Which correspondence preserves the relationship that governs the solution?',
 'Small attacking groups correspond to low-intensity rays that combine at a central target.',
 'The surrounding villages correspond to the tumor because both must be destroyed for success.',
 'The fortress corresponds to an individual incoming ray because both travel down a road.',
 'A single full army on one road corresponds to several weak rays approaching from different directions.',why='The source and target share separate safe contributions that converge into a strong local effect. Mapping individual names without preserving their roles would not generate the parallel solution.')
question(9,'researcher','In Gick and Holyoak’s comparison, more people solved the radiation problem after being reminded to consider the fortress story than after reading that story alone. Which difficulty does this difference most directly address?',
 'Noticing that an available source is relevant to the target can fail even when the source has been encountered.',
 'The fortress story cannot contain a useful solution unless a reminder physically changes its ending.',
 'Reading any source automatically guarantees that its corresponding solution will be applied.',
 'The reminder makes mapping unnecessary because the tumor and fortress become identical objects.',why='The reminder draws attention to a relevant source. Success rose from about 30 percent after the story to about 75 percent with the reminder, distinguishing source exposure from spontaneous use.')
question(10,'definition','Which pair consists of surface features rather than the shared structure of the fortress and radiation problems?',
 'The fortress and the tumor as the specific objects occupying the central target role.',
 'The need to combine several weak contributions at a central destination.',
 'A constraint that makes one strong approach unsafe along its route.',
 'The relationship between separate safe approaches and a strong combined target effect.',why='Surface features concern specific objects and settings. Structural features concern the roles, constraints and relationships that make a solution work across those settings.')
question(11,'application','Ruth cannot open the sealed bulb. A strong laser fuses the filament but breaks the glass, while a weak laser does neither. Which alteration preserves the desired repair and protects the surrounding glass?',
 'Aim several low-intensity beams at the filament simultaneously from different directions.',
 'Keep one high-intensity beam and treat the glass damage as if it satisfied the original goal.',
 'Use one low-intensity beam without any increase in its effect where the filament is broken.',
 'Direct each laser toward a different unrelated part of the bulb so their effects cannot combine.',why='Convergence provides the needed combined effect at the filament while limiting intensity at individual glass locations. The goal requires both fusion and preservation of the sealed glass.')
question(12,'design','Participants familiar with the radiation solution solve the lightbulb target more often than controls. What feature of these tasks makes them a useful comparison with fortress-to-radiation transfer?',
 'Radiation and lightbulb tasks share beam-like surface elements as well as a relevant convergence relationship.',
 'The lightbulb task removes the need to protect any surrounding material.',
 'Knowing the radiation solution physically repairs the bulb before the participant begins.',
 'The radiation and lightbulb tasks have no structural relationship, so only their stories’ length can matter.',why='Both tasks involve beams directed toward an internal target. Greater surface similarity can facilitate noticing a source that also supplies a useful structural solution.')
question(13,'definition','What distinguishes a structural feature from a surface feature in the two lightbulb versions?',
 'The reason a single beam fails is structural, while the bulb, filament and lasers are surface elements.',
 'Any number written in a problem is structural, while every relationship between elements is merely surface detail.',
 'A named laser is structural, while protection of surrounding glass is only a difference in wording.',
 'Structural features require the problems to use different objects, so two lightbulb stories cannot differ structurally.',why='Structure concerns the underlying constraints and principles governing the solution. The same named objects can participate in different relationships, as in fragile glass versus insufficient available intensity.')
question(14,'application','In the fragile-glass source, Ruth’s weak beams fuse the filament where they converge while leaving the glass intact. Which part maps onto the radiation target’s healthy-tissue constraint?',
 'Each approach must remain weak enough to avoid damage before the beams combine at the internal target.',
 'The filament and tumor must remain undamaged because both are protective surroundings.',
 'A single sufficiently strong beam is safe everywhere along its path in both problems.',
 'The glass must be opened first, just as an operation is required in the radiation problem.',why='Fragile glass and healthy tissue both constrain the intensity along the approach. Converging weak beams preserves those surroundings while supplying a stronger effect at the target.')
question(15,'design','Why does the insufficient-intensity lightbulb source differ structurally from the fragile-glass source even though Ruth uses converging lasers in both?',
 'It explains the need for convergence by weak available output rather than damage caused by a strong approach through the surroundings.',
 'It changes all surface objects from bulbs and lasers to armies and fortresses.',
 'It requires the beams to avoid meeting, so the described solutions have opposite spatial arrangements.',
 'It contains no target that needs a stronger combined effect.',why='Both stories use the same objects and convergence procedure. Only the fragile-glass version shares the radiation problem’s crucial constraint on damage along the incoming path.')
question(16,'definition','Which activity most directly qualifies as analogical encoding?',
 'Compare two problems and identify the similarities in the relationships governing their solutions.',
 'Memorize the specific nouns of one story without considering any second problem.',
 'Count how many objects two stories name while ignoring how those objects relate.',
 'Apply the first familiar procedure to a new target without considering a source relationship.',why='Analogical encoding involves comparison and identification of similarities. Its value is directing attention to structural features that can support transfer.')
question(17,'definition','Which observation expresses the analogical paradox?',
 'People can struggle to transfer analogies in controlled tasks while routinely using analogies during real-world problem solving.',
 'People solve all laboratory analogies but never use relationships from prior experience in everyday work.',
 'A source problem must always use the same objects as the target for any analogy to be possible.',
 'Scientists cannot use analogies because their meetings occur outside a formal experiment.',why='The paradox is the contrast between difficult laboratory transfer and common real-world use. In vivo observations provide access to analogy use within ordinary activity.')
question(18,'application','An experienced chess player solves chess problems quickly. Which claim stays within the definition of expertise presented here?',
 'Extensive learning, practice and application can produce recognized skill in that particular field.',
 'Recognition as a chess expert establishes equal expertise in every unrelated domain.',
 'A large number of practice hours alone guarantees flexible success on all new kinds of problem.',
 'An expert must begin every problem faster than a beginner because analysis is unnecessary.',why='Expertise is domain-specific knowledge and skill developed through sustained experience. It does not imply universal superiority, infallibility or an absence of deliberate analysis.')
question(19,'researcher','Chase and Simon (1973) compared recall of actual-game and random chess arrangements after a brief view. Why is the random condition important for interpreting the expert advantage?',
 'It reduces familiar chess relationships, testing whether meaningful domain-specific chunks support the recall advantage.',
 'It lets the expert view the board for longer while the beginner receives less exposure.',
 'It measures only the speed of moving a piece, removing memory from the task.',
 'It changes the number of squares on the board so that a different game must be learned.',why='The familiar chunks are useful for game positions but unavailable for random arrangements. The comparison links the advantage to organized long-term chess knowledge rather than an equal advantage for arbitrary layouts.')
question(20,'researcher','Chi et al. (1982) asked physics professors and students with one semester of physics to sort problems by similarity. Which difference matches their reported organization?',
 'Novices grouped by surface objects, while experts grouped by underlying physics principles.',
 'Experts grouped only by the visible shape of the objects, while novices consistently used underlying principles.',
 'Both groups were instructed to use the same named principle, so the study contained no difference in grouping.',
 'The task compared the groups’ ability to memorize a chessboard rather than organize physics problems.',why='The sorting task concerns the organization of knowledge. Experts’ categories reflected structural relationships relevant to solving, while novices’ categories emphasized surface features.')
question(21,'application','A novice puts problems 23 and 24 together because both contain inclined planes. An expert puts problems 21 and 24 together even though one involves a spring. Which relationship explains the expert’s grouping?',
 'Problems 21 and 24 share conservation of energy as a relevant solving principle.',
 'The expert ignores all problem relationships and groups only by the identical appearance of the diagrams.',
 'The novice’s grouping establishes that an inclined plane and a spring must be physically identical.',
 'All three problem numbers identify the same physical task with no difference in setup.',why='The expert groups by a structural principle across different surface objects. The novice pairing emphasizes the shared incline instead. Problem 24 can belong to different categories depending on the represented similarity.')
question(22,'application','An expert spends longer examining a problem before beginning a solution than a novice but reaches a correct solution more efficiently overall. Which interpretation fits the account of expertise?',
 'More initial analysis can identify relevant structure and support an efficient overall route.',
 'A slower beginning disproves expertise regardless of the quality or total time of the solution.',
 'Experts never analyze problems, so any observed analysis must be a measurement error.',
 'The initial analysis establishes that the same advantage must occur in every unrelated field.',why='Experts can invest more time at the start while benefiting over the whole task. The initial analysis and overall success are different aspects of performance.')
question(23,'application','A team generates many possible approaches but has not evaluated them, planned a response or taken action. Which parts of creative problem solving remain incomplete?',
 'Evaluation and planning, followed by implementation of a selected solution.',
 'All stages are complete because a large number of ideas is itself the finished outcome.',
 'Only the naming of the original problem, because implementation does not belong to creative work.',
 'Only the number of alternatives, because generating more ideas automatically evaluates them.',why='Idea generation is necessary but is only part of the process. Evaluation, planning and implementation are additional activities, not consequences that automatically follow from having many ideas.')
question(24,'application','A knowledgeable solver repeatedly applies an accepted procedure even though the task requires a less familiar approach. How can that knowledge hinder creative solving?',
 'The familiar procedure can restrict the possibilities considered and make it harder to adopt a better-fitting alternative.',
 'Any amount of knowledge eliminates the ability to produce a new connection between ideas.',
 'The accepted procedure must become correct simply because an experienced person prefers it.',
 'Flexible thinking requires discarding all relevant knowledge rather than reconsidering how it is applied.',why='Knowledge can hinder flexibility when familiar approaches dominate the representation. The relevant change is reconsidering the fit of the procedure, not treating all knowledge as harmful.')
# Additional source-aligned applications and experimental inferences.
question(5,'application','In transferring the marriage solution to the checkerboard, which mapping preserves the decisive pairing relationship?',
 'The two groups of people correspond to the two square colors, and each marriage corresponds to one domino pairing.',
 'Every individual person corresponds to a complete domino, so each marriage corresponds to four board squares.',
 'The two dead bachelors correspond to one removed square of each color.',
 'The matchmaker corresponds to a square color, while the two groups of people correspond to the board’s total area.',why='The analogy preserves the requirement for one member of each category in a pair. Removing two from the same category creates the corresponding imbalance in each problem.')
question(6,'design','A proposed radiation solution uses several low-intensity rays, but they reach different parts of the patient and never meet at the tumor. Which requirement remains unsatisfied?',
 'A sufficiently strong combined intensity must reach the tumor, not merely several weak intensities at unrelated locations.',
 'Every individual path must contain a high-intensity ray that destroys its surrounding tissue.',
 'The tumor must be reached through an operation before any ray can have an effect.',
 'The task requires all radiation to be excluded from the tumor while treating only healthy tissue.',why='Dividing the approaches is only part of the solution. The weak contributions must converge at the target to supply the required intensity there.')
question(8,'application','A participant maps the tumor to the fortress but cannot say what corresponds to the roads or small attacking groups. Which part of analogical problem solving is incomplete?',
 'Mapping the system of relevant correspondences between the source and target.',
 'The physical construction of an additional medical target that was not specified.',
 'The claim that the source was never encountered, which follows necessarily from remembering the fortress.',
 'The definition of creativity, because mapping has no role in using an analogy.',why='Naming one corresponding object is insufficient if the relationships governing the solution are not mapped. Roads, limited safe approaches and converging contributions are relevant parts of the system.')
question(9,'design','A researcher wants to distinguish failure to notice a relevant source from lack of exposure to it. Which comparison follows the fortress-reminder logic?',
 'Give both groups the source, then remind only one group to consider it when solving the target.',
 'Give the source only to the reminder group, making exposure and reminder inseparable.',
 'Let one group alter the target’s constraints while the other must preserve them.',
 'Compare a group with a completed target solution to a group that is not allowed to attempt the target.',why='Holding exposure constant while varying the reminder tests the role of access or noticing. Giving only one group the story would combine source availability with the reminder manipulation.')
question(9,'researcher','Which interpretation best fits Gick and Holyoak’s finding that a reminder improved radiation solving after the fortress story?',
 'A useful source can be remembered or available without being spontaneously recognized as relevant to the target.',
 'A useful source necessarily produces transfer as soon as it has been read, so the reminder has no possible role.',
 'The story’s different surface setting proves that it cannot share a structural relationship with the radiation problem.',
 'A reminder replaces the need to generate any corresponding procedure for the target.',why='The improvement concerns using an available source. Noticing, mapping and applying remain distinguishable; a reminder can help without physically supplying the completed target procedure.')
question(10,'application','A learner rejects the fortress story as irrelevant to radiation because “one is military and the other is medical.” What relationship is being overlooked?',
 'Both require a strong combined effect at a central target while limiting the danger of each separate approach.',
 'Both require the same named people and objects for a source to be valid.',
 'Both permit a single unrestricted high-intensity approach through the surrounding area.',
 'Both are solved solely by recognizing that the words fortress and tumor have identical meanings.',why='Military and medical descriptions differ in surface features. Their structural relationship concerns safe separate approaches and a sufficient combined target effect.')
question(12,'researcher','The radiation-to-lightbulb comparison reports greater success among participants familiar with the radiation solution than among controls. Which conclusion is supported?',
 'A relevant source with similar surface elements can facilitate generating the target’s converging-beam solution.',
 'The source changes the actual glass so that it no longer breaks under a high-intensity beam.',
 'Surface similarity guarantees perfect transfer for every participant.',
 'The control group’s difficulty proves that the lightbulb target has no possible solution.',why='Prior source knowledge was associated with greater solving success. It did not change the physical target, guarantee success for everyone, or make control failures evidence of impossibility.')
question(13,'design','An experiment keeps the bulb, filament and laser descriptions similar while changing whether a strong beam would damage the glass or whether the available laser is simply too weak. What factor is being varied?',
 'Structural features that determine why combining beams is needed.',
 'Only the surface category of objects, because constraints are not part of a problem’s structure.',
 'The number of target problems, with no change in any solution-relevant relationship.',
 'Whether any solution uses a filament, because one version replaces the bulb with a fortress.',why='The same surface setting can support different constraints. The manipulation changes the underlying reason for convergence while keeping the named objects similar.')
question(14,'application','A learner remembers that Ruth used several lasers but omits the need to protect glass. What useful correspondence to the radiation problem is missing?',
 'The surrounding glass and healthy tissue both limit the intensity that can safely pass along an individual path.',
 'The filament and tumor are identical in every physical and biological property.',
 'The surrounding material must receive the strongest intensity before any ray reaches the target.',
 'Both tasks permit opening the surrounding material and directly removing the target.',why='The fragile-surroundings constraint explains why a single strong approach fails in both tasks. Remembering only several lasers leaves out this important structural relationship.')
question(15,'researcher','Transfer to the radiation problem is greater after the fragile-glass solution than after the insufficient-intensity solution. Both sources use a bulb and converging lasers. Which explanation matches the comparison?',
 'Sharing the target’s surrounding-damage constraint can help transfer beyond similarity of the surface objects and final beam arrangement.',
 'Only the fragile-glass source contains any beam, so the comparison eliminates all structural information.',
 'The insufficient-intensity solution uses no convergence and therefore provides no common procedure at all.',
 'Transfer must depend solely on whether the source and target have the same title.',why='The two sources preserve surface elements and use convergence but differ in their constraints. The fragile-glass version shares both the need for target intensity and the need to protect the approach.')
question(16,'design','Which study activity most directly encourages analogical encoding rather than memorization of isolated story details?',
 'Ask learners to compare source stories and explain the shared relationships that make their solutions work.',
 'Ask learners to list only the characters’ names without comparing any problems.',
 'Prevent learners from considering more than one story during all of the learning period.',
 'Sort the sources only by the number of sentences they contain.',why='Comparing source stories can make common structural principles apparent. Memorizing names or superficial counts does not require identifying the relationships that transfer.')
question(16,'application','A student identifies convergence across an army story and a radiation story. What would make the identified similarity structural?',
 'It connects safe separate approaches with the strong combined effect needed at the destination.',
 'It depends only on both stories containing a person who wants to succeed.',
 'It requires the army and radiation to have identical surface appearances.',
 'It concerns only whether both stories were printed on the same page.',why='The structural similarity is a relationship that explains how the solution satisfies the constraints. Shared generic details or presentation location do not supply that mechanism.')
question(17,'design','A researcher observes scientists solving problems during their ordinary meetings. Which advantage and limitation fit in vivo research?',
 'It retains a naturalistic context but is time-consuming and offers less control for isolating variables.',
 'It guarantees experimental control over every contribution while removing the ordinary work context.',
 'It measures only final written answers and cannot contain any observation of ongoing reasoning.',
 'It eliminates the need to determine whether people actually use analogies in their work.',why='In vivo research observes real-world problem solving in context. Naturalistic access comes with the stated limits on time and variable control.')
question(17,'application','Scientists use analogies repeatedly during ordinary work, yet many participants fail to use an experimentally supplied source. Which response preserves both observations?',
 'The conditions under which analogies are noticed and used can differ between laboratory tasks and ongoing real-world activity.',
 'Every failed laboratory transfer establishes that analogical reasoning never occurs outside the laboratory.',
 'Any observed analogy in a meeting proves that every controlled transfer task must be easy.',
 'The two observations concern no common process because source-target relationships can exist only in a laboratory.',why='The analogical paradox concerns these contrasting observations. Neither observation justifies discarding the other or claiming that source-target reasoning is restricted to one setting.')
question(18,'application','A participant is highly skilled in chess after extensive study but has little experience with a new professional field. What prediction is consistent with domain-specific expertise?',
 'The participant’s organized chess knowledge does not by itself establish an expert advantage on problems in the unfamiliar field.',
 'The participant must outperform beginners in the unfamiliar field by the same amount as in chess.',
 'The participant’s chess expertise disappears as soon as an unrelated problem is presented.',
 'Expertise is defined entirely by confidence, so knowledge of the new field is irrelevant.',why='Expertise concerns knowledge and skill in a particular domain. The advantage does not automatically generalize to problems outside that domain.')
question(19,'design','In the chess recall comparison, which manipulation most directly tests the usefulness of familiar long-term chunks?',
 'Compare actual game positions with random arrangements of the same kind of pieces after the brief viewing period.',
 'Allow the expert to inspect a meaningful board indefinitely while giving the novice only a brief glimpse.',
 'Ask the expert to play chess and the novice to solve a different unrelated task.',
 'Replace recall with a rating of how much each participant likes chess.',why='Meaningful versus random organization changes availability of familiar relationships. Unequal exposure or unrelated tasks would introduce another basis for the apparent advantage.')
question(19,'researcher','Why does the Chase and Simon (1973) result not require treating each piece location as an independent remembered item for the expert?',
 'Familiar relations allow multiple positions to be accessed together as a chunk supported by long-term knowledge.',
 'Experts do not have to view a board before reproducing any possible random arrangement.',
 'Every chess piece physically marks its previous position after it has been moved.',
 'The recall task explicitly forbids using any knowledge from earlier chess experience.',why='Chunking groups related information into meaningful units. The result connects strong recall for meaningful positions with organized experience rather than an identical advantage for random positions.')
question(20,'design','Which procedure matches Chi and colleagues’ investigation of knowledge organization?',
 'Have professors and beginning physics students sort the same set of problems according to similarity, then compare their categories.',
 'Give professors only chess positions and students only radiation stories, then compare the number of answers.',
 'Require both groups to copy a supplied categorization so that no individual sorting decisions remain.',
 'Measure only total years of education without asking either group to organize any problems.',why='The sorting task exposes how participants relate problems to one another. Its result concerns categories based on surface features versus underlying principles.')
question(20,'application','A student groups every problem involving a spring together, while a professor groups a spring problem with an incline problem under an energy principle. Which contrast is most accurate?',
 'The student is using surface features, while the professor is using a structural relationship relevant to solving.',
 'The student is necessarily using deeper structure because all named objects define the same physical principle.',
 'The professor’s grouping means that springs and inclined planes are the same physical object.',
 'Neither group uses knowledge organization because sorting can reveal only factual recall.',why='The difference concerns the basis for similarity. Shared objects can guide a surface grouping, while shared solving principles can relate different-looking problems.')
question(21,'application','Problem 24 appears in both the novice and expert groupings, but with different partners. What does that difference indicate?',
 'The same problem can be represented through visible object similarity or through an underlying principle.',
 'Problem 24 must have changed its physical setup between the two printed groupings.',
 'Every physics problem has exactly one possible partner regardless of the relationship used.',
 'Experts sort entirely at random when the surface objects look different.',why='The novice pairs the inclined-plane problems, while the expert links the energy-related problems. The comparison concerns which relationship organizes knowledge, not a change in the shared problem.')
question(22,'application','A familiar procedure works in many expert tasks but fails on a new problem requiring flexibility. Which response best addresses the obstacle?',
 'Reconsider the problem’s representation and whether a less familiar procedure fits its constraints.',
 'Repeat the usual procedure indefinitely because expertise makes it valid under every possible constraint.',
 'Discard all information about the current problem and rely only on the solver’s status as an expert.',
 'Assume that a novice must be worse on every task, including all tasks outside the expert’s field.',why='Expertise can restrict openness to unfamiliar approaches. Flexible solving can require rejecting a usual procedure when a different one fits the problem.')
question(22,'design','To examine whether an expert advantage is domain-specific, which comparison is most informative?',
 'Compare expert and novice performance on problems both inside and outside the expert’s field.',
 'Compare only problems the expert has already memorized and infer the same result for every field.',
 'Measure only whether the expert is recognized by colleagues without observing any problem solving.',
 'Give the novice no chance to attempt the outside-field tasks.',why='Testing both domains addresses whether an advantage depends on field-specific knowledge. An inside-field result alone does not establish the pattern outside the domain.')
question(23,'definition','Which description best fits divergent thinking?',
 'An open-ended search that generates a range of potential solutions or new connections.',
 'Immediate commitment to one accepted procedure before considering any alternatives.',
 'Implementation of a fully selected plan without any production of new possibilities.',
 'Recall of one familiar label with no opportunity for alternative responses.',why='Divergent thinking is open-ended and permits many potential solutions. It is part of creative activity, distinct from selecting and carrying out a single plan.')
question(23,'application','A group has defined a problem and proposed several ideas. It then compares those ideas and develops a plan before taking action. Which distinction matches the stated creative-process stages?',
 'Evaluation and planning belong to problem solving, while taking action belongs to solution implementation.',
 'Taking action is problem generation, while evaluating ideas is unrelated to creative work.',
 'Every stage ends when an idea first appears, making planning and action outside the process.',
 'Fact finding is solution implementation, while taking action means only identifying a new problem.',why='The stages distinguish finding and defining a problem, developing ideas, evaluating and planning, and implementing a response. An idea does not automatically carry out the later activities.')
question(24,'application','A team has many ideas but refuses to revise an accepted procedure that conflicts with the task. Which interpretation follows from the account of creative problem solving?',
 'Idea production is useful, but rigid reliance on accepted procedures can still block a workable creative solution.',
 'The existence of many ideas proves that evaluation and implementation have already succeeded.',
 'Accepted procedures can never hinder a person who has enough experience.',
 'Creativity requires avoiding every connection to existing knowledge or previous ideas.',why='Ideas are necessary without being the entire process. Flexible use of knowledge can require revising a familiar procedure that does not fit the current problem.')
question(9,'application','A learner identifies the fortress story as relevant, correctly maps its roads and target, and then directs several weak rays to converge at the tumor. Which sequence of analogical operations is present?',
 'Noticing the relationship, mapping correspondences, and applying the mapping to generate a target solution.',
 'Applying a mapping before recognizing any relationship, followed only by memorizing surface names.',
 'Noticing alone, because generating a target procedure adds no further operation.',
 'Divergent thinking without any source-target correspondence.',why='The account distinguishes recognition of relevance, construction of correspondences, and use of those correspondences to generate the parallel solution.')
question(15,'design','An analyst argues that the two lightbulb sources test only surface similarity because both mention lasers and a filament. What feature of the manipulation contradicts that claim?',
 'The reason one beam fails changes, so the underlying constraints differ while the surface objects stay similar.',
 'One source replaces the filament with a chessboard, changing the entire set of surface objects.',
 'Neither source provides a solution, so no transfer comparison can be made.',
 'Only the titles differ, and both stories describe identical constraints in every respect.',why='Fragile-glass and insufficient-intensity sources keep similar objects but differ in whether damage to the surroundings constrains a strong approach. That is a structural difference.')
assert len(sections)==24 and [s['page'] for s in sections]==list(range(1,25))
assert len(questions)==50,len(questions)
collection=dict(id=11,title='Problem Solving and Reasoning · Part II',file='CogPsych_Ch12_2 F26.pdf',sourcePdf='sources/CogPsych_Ch12_2_F26.pdf',sections=sections,original=[f'media/problem-solving-part2/slide-{p:02}.webp' for p in range(1,25)],optional=False)
path=ROOT/'module2-data.js';bank=json.loads(path.read_text().split('window.SECOND_HALF = ',1)[1].rstrip(';\n'))
bank['collections']=[c for c in bank['collections'] if c['id']!=11]+[collection]
bank['questions']=[q for q in bank['questions'] if q['module']!=11]+questions
bank['modules']=[m for m in bank['modules'] if m!=11]+[11]
bank['lectureNumbers']['11']='12';bank['revision']='problem-solving-part2-balanced-100'
for key in ['topics','coreReview','experiments']:bank[key]=[g for g in bank[key] if g.get('module')!=11]
for title,pages in [
 ('Analogical sources, targets, and convergence',[2,3,4,5,6,7,8,9]),
 ('Noticing, surface similarity, and structural correspondence',[10,11,12,13,14,15,16]),
 ('Real-world analogy and research conditions',[17]),
 ('Expert knowledge, chunks, and problem organization',[18,19,20,21,22]),
 ('Creativity, divergent thinking, and implementing solutions',[23,24])]:bank['topics'].append(dict(module=11,title=title,pages=pages,progressKey='m2-topic-11-'+str(pages[0])))
for title,pages in [
 ('Analogical transfer and convergence constraints',[5,6,8,9]),
 ('Surface versus structural similarity and analogical encoding',[10,12,13,14,15,16]),
 ('Naturalistic analogy, expert knowledge, and flexibility',[17,19,20,21,22]),
 ('Creative thinking and carrying an idea into action',[23,24])]:bank['coreReview'].append(dict(module=11,title=title,pages=pages))
for title,pages in [
 ('Marriage and checkerboard · mapping a shared pairing constraint',[3,4,5]),
 ('Duncker and Gick–Holyoak · radiation, fortress, and reminders',[6,7,8,9,10]),
 ('Lightbulb transfer · surface and structural similarities',[11,12,13,14,15,16]),
 ('In vivo observation · analogies in scientific work',[17]),
 ('Chase and Simon · game positions, random layouts, and chunks',[19]),
 ('Chi and colleagues · surface-based and principle-based sorting',[20,21])]:bank['experiments'].append(dict(module=11,title=title,pages=pages))
path.write_text('window.SECOND_HALF = '+json.dumps(bank,ensure_ascii=False,indent=2)+';\n')
print('Added collection 12:',len(sections),'slides,',len(questions),'new questions. Current lecture IDs:',bank['modules'])
