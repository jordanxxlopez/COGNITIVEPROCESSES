"""Append collection 11 to the current PSYC301 bank without rewriting prior material.

The source is the supplied 22-page CogPsych_Ch12_1 F26 PDF. All images are
unchanged page renders. Page 1 is a title page, retained in original pages.
"""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sections=[]
def section(page,title,*paragraphs):
 sections.append(dict(page=page,title=title,bullets=list(paragraphs),image=page-1))

section(2,'A problem has a present state, a goal, and an obstacle',
 'A <strong>problem</strong> involves an obstacle between a <strong>present state</strong> and a <strong>goal</strong>, with a solution that is not immediately obvious. The present state describes the situation as it currently exists. The goal describes the situation that the person is trying to reach, and the obstacle prevents an immediate move from one to the other.',
 'In the numbered-tile puzzle, the starting arrangement has 8 and 6 across the upper row with an empty space between them. The desired arrangement has the empty space in the upper-left corner, followed by 1 and 2. Reaching the goal requires changing the positions of the tiles rather than merely recognizing the numbers.',
 'Knowing the desired arrangement does not supply the sequence that produces it. A person can identify exactly what counts as a solution while still having a problem because the route from the current arrangement to that solution is unclear. The distinction concerns the goal and the means of reaching it, rather than whether the goal has been stated.')
section(3,'Gestalt representation and restructuring in Köhler’s circle problem',
 '<strong>Gestalt psychologists</strong> took a perceptual approach to learning, problem solving, and attitudes and beliefs as well as perception. Koffka (1935) is associated with this broader approach. Problem solving involves <strong>representing a problem in the mind</strong>, so the organization a person gives the problem can affect the solution that becomes available.',
 '<strong>Restructuring</strong> means reorganizing the problem’s representation. Different people can represent the same physical arrangement differently, and the mental representation can emphasize relationships that are not immediately obvious from the way the problem was first encountered. Changing that organization can make a previously hidden relationship usable.',
 'In <strong>Köhler’s circle problem</strong>, the task is to find the length of line <var>x</var> when the circle’s radius has length <var>r</var>. The black line is one diagonal of a rectangle whose lower-right corner is at the circle’s center. The dashed line runs from the upper-left corner on the circle to that center, so it is a radius.',
 'The two diagonals of a rectangle have equal length. Representing the arrangement as a rectangle therefore makes the black diagonal equal to the dashed radius, giving <strong><var>x</var> = <var>r</var></strong>. The useful change is recognizing the rectangle and its equal diagonals rather than treating the line as an isolated unknown inside a complicated circle.')
section(4,'Insight is a sudden realization after restructuring',
 '<strong>Insight</strong> is the sudden realization of a problem’s solution. A person can first perceive an object or problem in one way and then represent it differently. Discovering a crucial element within that changed representation can make the solution available all at once.',
 'Gestalt psychologists connected this reorganization with the <strong>“Aha” experience</strong>. The experience concerns how the solution becomes available to the solver. Instead of feeling a series of increasingly complete steps, the person experiences a sudden change from not having the solution to recognizing it.',
 'Problem solving also includes solutions reached without an “Aha” experience. Some problems permit a more methodical process in which successive operations bring the person closer to an answer. Sudden realization describes insight, but it does not describe every way that a problem can be solved.')
section(5,'Metcalfe and Wiebe measured perceived closeness to a solution',
 '<strong>Metcalfe and Wiebe (1987)</strong> compared <strong>insight problems</strong>, including the triangle and chain problems, with <strong>noninsight problems</strong>, including algebra. Participants attempted the problems and repeatedly judged how close they felt to a solution. The comparison concerned the course of solving, rather than only whether a final answer was correct.',
 'The prediction for an insight problem was that participants would not be very good at anticipating how near they were to a solution. A crucial change in representation could make the answer available without a steadily increasing feeling of progress. A solver could therefore feel relatively far from the answer shortly before reaching it.',
 'For noninsight problems, the predicted process was more methodical. Completing successive algebraic operations could give the solver information about progress, so perceived closeness should increase as the solution approaches. The two problem types therefore produced different predictions about awareness during solving.',
 'Participants made <strong>warmth judgments every 15 seconds</strong>. “Hot” ratings meant feeling close to the solution, and colder ratings meant feeling farther away. These reports supplied a repeated measure of subjective progress that could be compared with when the participant actually solved the problem.')
section(6,'Triangle and chain problems require a change in representation',
 'The <strong>triangle problem</strong> begins with ten blue dots arranged in four rows so that the triangle points upward. The task is to move <strong>exactly three dots</strong> and make the triangle point toward the bottom of the page. Seven dots must remain in place, so relocating the entire arrangement would violate the task.',
 'The original top dot can become a new bottom point beneath the center of the original bottom row. The two outer dots of the original bottom row can move to the outer ends of the original two-dot row. That row then contains four dots, with three, two, and one below it, producing a downward-pointing triangle while moving only three dots.',
 'The <strong>chain problem</strong> provides four short sections of chain that must become one closed loop. Opening a link costs <strong>2 cents</strong>, closing it costs <strong>3 cents</strong>, and the budget is <strong>15 cents</strong>. Opening and reclosing a link therefore costs 5 cents, so the budget permits three such operations.',
 'One three-link section can be opened into three separate links. Those links connect the remaining three sections into a closed loop, with each opened link closed once after serving as a connector. Treating one whole section as connecting material changes the organization of the problem and uses the full 15-cent budget.')
section(7,'Warmth rises gradually for algebra and suddenly for insight',
 'In <strong>Metcalfe and Wiebe’s (1987)</strong> warmth judgments, perceived progress differed between algebra and insight problems. For algebra, ratings increased gradually as the solution approached. The participants’ feeling of getting closer developed over a period of time rather than appearing only when the answer was reached.',
 'For <strong>insight problems</strong>, warmth remained relatively low until close to solution and then increased sharply. The large jump from about 3 to 7 contrasts with the more gradual algebra pattern. Participants could reach the answer without having reported an equally gradual approach to it.',
 'The ratings concern <strong>subjective closeness</strong> to a solution. A low rating shortly before an insight solution means that the person did not yet feel close, even though the answer was imminent. The contrast connects sudden insight with a different experience of progress from methodical noninsight solving, rather than making all successful problem solving equally sudden.')
section(8,'Functional fixedness in the candle problem',
 '<strong>Fixation</strong> is a tendency to focus on a specific characteristic of a problem in a way that prevents a solution. Gestalt psychologists treated it as a major obstacle to problem solving. A familiar interpretation can hold attention even when another interpretation would make the available materials useful.',
 '<strong>Functional fixedness</strong> restricts an object to its familiar functions. In the <strong>candle problem</strong>, a person has a candle, matches and their box, and tacks, and must mount the candle on a vertical corkboard so that it can burn without dripping wax onto the floor. The materials have to provide both a way to attach the candle and a suitable support.',
 'The matchbox can be attached to the corkboard and used as a platform for the candle. Treating the box only as a container for matches interferes with recognizing that support function. The obstacle comes from the familiar use assigned to the box rather than from an absence of useful material.',
 'Participants given <strong>empty matchboxes</strong> were twice as likely to solve the problem. Separating the box from its familiar contents made it easier to treat the box as an available object with another possible use. The changed presentation affected whether the support function became available to the solver.')
section(9,'Pliers can serve as a weight in the two-string problem',
 'The <strong>two-string problem</strong> requires tying together two strings hanging from the ceiling. They are far enough apart that a person holding one cannot simply reach the other. Recognizing the desired knot therefore does not resolve the difficulty of bringing the two strings within reach.',
 'A pair of <strong>pliers</strong> can be tied to one string and used as a weight. Setting that string swinging creates a <strong>pendulum</strong>. The person can hold the other string and catch the weighted string when it swings close enough, bringing the ends together.',
 '<strong>Functional fixedness</strong> occurs when the familiar tool function of the pliers prevents their use as a weight. The useful property is their weight rather than their ability to grip something. Reorganizing the object’s role makes the string move in a way that overcomes the original reach problem.')
section(10,'A swinging-string hint and a mental set affect representation',
 'In the two-string problem, an experimenter could “accidentally” set a string in motion. After that hint, most participants were able to solve the problem. The moving string made its potential use as a pendulum available, allowing the person to bring a previously unreachable string toward the other hand.',
 'In Gestalt terms, the solution involves <strong>restructuring the representation</strong>. The hanging string changes from something that must be reached where it is to something that can be made to swing within reach. The hint changes the relationship the person uses, while the task still requires tying the two strings together.',
 'A <strong>mental set</strong> is a preconceived notion about how to approach a problem, based on past experience with that problem or similar problems. The expectation concerns the method of solving. A person can continue applying a familiar procedure even when the current problem permits another approach.',
 'The <strong>water-jug problem</strong> asks for a required amount of water using three empty jugs with specified capacities. Previous success with one measuring procedure can establish a mental set. That learned expectation can affect which operations the solver considers when the available capacities change.')
section(11,'Water-jug experience can hide a simpler solution',
 'Each <strong>water-jug problem</strong> specifies capacities for jugs A, B, and C and a desired quantity. In the first problem, A holds 21 quarts, B holds 127, C holds 3, and the goal is 100. Filling B and removing one A-sized amount leaves 106, removing one C-sized amount leaves 103, and removing a second C-sized amount leaves 100.',
 'The procedure is <strong>B − A − 2C</strong>. Repeated success with this procedure across the early problems encourages the person to treat it as the expected method. The rule becomes a <strong>mental set</strong> because the solver brings that method to a new set of capacities.',
 'In problem 7, A holds 15 quarts, B holds 39, and C holds 3, with a goal of 18. The familiar method works because 39 − 15 − 6 gives 18. The same amount can be obtained more directly from A + C, using capacities 15 and 3.',
 'In problem 8, A holds 28, B holds 59, and C holds 3, with a goal of 25. A − C gives 25 directly, although B − A − 2C also works. A mental set can therefore inhibit a <strong>simpler solution</strong> even when the familiar solution remains possible. The obstacle concerns the method that experience makes available first.')
section(12,'Newell and Simon treated solving as search through a problem space',
 '<strong>Newell and Simon (1956)</strong> developed the <strong>Logic Theorist</strong> and described problem solving as a process involving <strong>search</strong>. Solving includes the activity between the posing of a problem and its solution. The person searches for a way to reach a goal while working around obstacles.',
 'A <strong>problem space</strong> includes an <strong>initial state</strong>, the <strong>intermediate states</strong>, and a <strong>goal state</strong>. The initial state contains the starting conditions. Intermediate states are the situations reached along the way, and the goal state meets the conditions for a solution.',
 'A search account considers possible routes between these states. Knowing the initial and goal states does not specify which intermediate states will connect them. Solving requires finding a sequence that reaches the goal, so the account concerns how a person proceeds through the available possibilities rather than only the final arrangement.')
section(13,'Operators define legal moves in the Tower of Hanoi',
 '<strong>Operators</strong> are rules specifying which moves are allowed and which are not. Applying an operator changes the problem from one state to another. The rules therefore determine which transitions can belong to a possible solution, even when another movement would physically be possible.',
 'In the <strong>Tower of Hanoi</strong>, disks begin stacked on one peg and must be transferred to the goal peg. A move transfers <strong>one disk at a time</strong>. A disk can be moved only when no other disk is on top of it, so a buried disk is unavailable until the disks above it have been moved.',
 'A <strong>larger disk cannot be placed on top of a smaller disk</strong>. That restriction also applies to intermediate arrangements, rather than only to the final stack. The solver must preserve the required size ordering while using the other pegs to make the necessary moves possible.',
 'The starting stack is the <strong>initial state</strong>, the completed stack on the target peg is the <strong>goal state</strong>, and temporary distributions across the pegs are <strong>intermediate states</strong>. A useful route consists of legal transitions through those intermediate states, with the operators constraining every move along the route.')
section(14,'Tower of Hanoi requires repeated intermediate rearrangements',
 'Transferring a Tower of Hanoi stack requires moving smaller disks out of the way before a larger disk becomes available. The smaller disks can occupy temporary positions on the other pegs, but their size ordering still has to obey the rule against placing a larger disk on a smaller one.',
 'Moving the largest disk to the goal peg does not complete the puzzle if smaller disks remain elsewhere. Those disks must then be rearranged onto the larger disk in the required order. The route therefore includes repeated transfers of smaller stacks as part of transferring the whole stack.',
 'The lecture describes the <strong>64-disk</strong> version as requiring roughly <strong>a trillion years</strong> even if every correct move took only one second. Increasing the number of disks creates a very large number of required moves. Executing each move quickly does not remove the many intermediate rearrangements imposed by the rules.')
section(15,'Numbered-tile arrangements define the start and goal',
 'The numbered-tile puzzle has eight tiles and one empty location in a three-by-three board. In the initial arrangement, the rows are 8–empty–6, 5–4–7, and 2–3–1. In the goal arrangement, the rows are empty–1–2, 3–4–5, and 6–7–8.',
 'The <strong>initial state</strong> specifies the complete starting arrangement, rather than only which tiles are present. The <strong>goal state</strong> specifies the desired arrangement of those same tiles and the empty location. A tile being present on the board does not mean that its required position has been achieved.',
 'A route to the goal changes the arrangement through <strong>intermediate states</strong>. The problem concerns obtaining the required relationships among the tile positions, so simply naming the goal or moving a single tile to a desirable position does not supply a complete solution. The current state has to be related to the goal through an allowable sequence of moves.')
section(16,'A search tree connects alternative tile-puzzle states',
 'A <strong>search tree</strong> represents possible states of a tile puzzle and the moves connecting them. The starting arrangement contains 2–8–3 in its first row, 1–6–4 in its second, and 7–empty–5 in its third. The empty location is the place into which an adjacent tile can move.',
 'From that initial arrangement, different legal moves produce different branches. The empty location can shift left, up, or right by exchanging position with the adjacent tile. Each resulting board is a different <strong>intermediate state</strong>, even though all states contain the same eight numbered tiles.',
 'Continuing the search produces further branches because each intermediate arrangement can allow more than one move. The <strong>goal</strong> is a particular board arrangement among those possibilities. A sequence of connected states supplies a route to it, while the other branches are alternatives that the search could consider.',
 'The numbered labels identify positions in the search, while the small boards specify the actual tile arrangements. Searching involves choosing which available states to pursue. The distinction between a state and a move matters because one state can permit several different successors under the same operator rules.')
section(17,'Means–end analysis uses subgoals to reduce a difference',
 'According to <strong>Newell and Simon</strong>, solving requires searching the <strong>problem space</strong> for a route to the goal. <strong>Means–end analysis</strong> organizes that search around reducing the difference between the current situation and the goal. The solver considers which changes would help remove an obstacle to the desired result.',
 '<strong>Subgoals</strong> create useful intermediate states. A subgoal is a condition that makes part of the larger task possible, rather than the complete final answer. Achieving it can reduce an obstacle that prevents a required move, allowing the search to proceed toward the overall goal.',
 'In the <strong>Tower of Hanoi</strong>, the large disk cannot be moved while smaller disks remain above it. Freeing that disk is therefore a useful subgoal. Organizing the smaller disks to permit the large move contributes to solving the entire problem even though a temporary arrangement is not the final stack.')
section(18,'Tower of Hanoi subgoals free the large disk and the target peg',
 'The Tower of Hanoi goal requires the large disk to move to the third peg, but the smaller disks initially block it. Moving the smallest disk to the third peg and the next disk to the middle peg removes the disks resting on the largest one. This achieves the first subgoal, <strong>freeing the large disk</strong>.',
 'The third peg must also be available for the large disk. A smaller disk there would block the move because a larger disk cannot be placed on a smaller one. Moving the smallest disk from the third peg onto the smaller stack on the middle peg achieves the second subgoal, <strong>freeing the third peg</strong>.',
 'The largest disk can then move from the starting peg to the third peg without breaking the size rule. This achieves the third subgoal, <strong>moving the large disk onto the third peg</strong>. The smaller disks still have to reach it, so achieving this intermediate goal is part of the route rather than the completed puzzle.',
 'The subgoals address different obstacles to the same move. One removes the material above the disk that must move, while another removes an obstruction at its destination. <strong>Means–end analysis</strong> can therefore require several coordinated intermediate changes before an action toward the overall goal becomes legal.')
section(19,'How a problem is stated can change its difficulty',
 '<strong>Newell and Simon’s approach</strong> provides a way to specify possible pathways from an <strong>initial state</strong> to a <strong>goal state</strong>. Identifying states and possible transitions makes the search explicit. A solution requires an allowable route between the beginning and the required endpoint.',
 '<strong>How a problem is stated</strong> can also affect its difficulty. The wording and presentation influence which relationships become part of the person’s representation. Two presentations can preserve the same underlying task while making a useful property easier or harder to recognize.',
 'The <strong>mutilated-checkerboard problem</strong> concerns covering a board with dominoes after squares have been removed. A solver must consider whether the covering is possible under the domino constraints. The relationships represented about the squares can determine whether the task is approached as trial-and-error placement or as a question about a constraint on all possible placements.')
section(20,'Opposite removed corners make a domino covering impossible',
 'An ordinary <strong>checkerboard</strong> contains <strong>64 squares</strong> and can be covered with <strong>32 dominoes</strong> when each domino covers two adjacent squares. The <strong>mutilated-checkerboard problem</strong> removes two opposite corner squares and asks whether 31 dominoes can cover the remaining board.',
 'Removing two squares leaves 62 squares, matching the area covered by 31 dominoes. Equal total area, however, does not guarantee that the dominoes can be arranged legally. Every domino covers adjacent squares of <strong>different colors</strong>, so every placement uses one square of each color.',
 'The two removed opposite corners have the <strong>same color</strong>. Removing both leaves fewer squares of that color than of the other color. A covering using dominoes would have to use equal numbers of the two colors, which the remaining board no longer contains.',
 'The board therefore <strong>cannot be completely covered</strong> by 31 dominoes. The obstacle is the imbalance between square colors rather than insufficient total domino area. Representing the color relationship supplies a reason that applies to every possible arrangement, so individual unsuccessful placement attempts are not required to establish the answer.')
section(21,'Bread-and-butter labels make the pairing constraint available',
 'The mutilated-checkerboard problem depends on two constraints. Each <strong>domino covers two squares</strong>, and those squares must be of <strong>different colors</strong>. A useful representation must preserve the difference between the two kinds of square, rather than treating all remaining squares as interchangeable units of area.',
 'The conditions varied the information supplied about the squares. Participants received a <strong>blank board</strong>, a <strong>colored board</strong>, a board labeled with the words <strong>black and pink</strong>, or one labeled <strong>bread and butter</strong>. The underlying covering problem remained a pairing problem across two kinds of square.',
 'The <strong>bread-and-butter condition</strong> emphasized the difference between the square types and their pairing. The labels made it easier to represent a domino as requiring one of each kind, which directs the solver toward the constraint that the removed corners disrupt.',
 'Participants solved the bread-and-butter condition <strong>twice as fast as the blank condition</strong>. Information that pointed toward the correct representation reduced solving time. The presentation changed access to the relevant relationship while leaving the need to cover adjacent pairs intact.')
section(22,'Think-aloud protocols record thoughts during solving',
 'A <strong>think-aloud protocol</strong> asks a person to say aloud what they are thinking while solving a problem. Participants are instructed to verbalize <strong>new thoughts</strong> rather than simply describe the actions they are performing. The record concerns the information receiving attention during the attempt.',
 'In the bread-and-butter version of the checkerboard problem, participants can reach the solution after recognizing that the words <strong>bread</strong> and <strong>butter</strong> are relevant to the required pairing. Their thinking shifts from considering squares only as positions to considering the relationship between the two kinds of square.',
 'That change is a <strong>representational shift</strong> related to the Gestalt account of restructuring. The objects and covering requirement remain the same, but the solver uses a different relationship among the elements. Verbal reports can identify when the pairing of the two labels enters the person’s reasoning during the attempt.')

# The current practice bank is extended below with independently authored items.
questions=[]
def question(page,kind,stem,correct,*distractors,why):
 assert len(distractors)==3
 questions.append(dict(id=4001+len(questions),module=10,page=page,kind=kind,stem=stem,options=[correct,*distractors],correct=0,why=why))
# 1–5. Definition, representation and insight.
question(2,'definition','A student knows the required final tile arrangement but cannot determine how to reach it from the current arrangement. Which feature makes the task a problem in the lecture’s sense?',
 'An obstacle separates the present state from the goal, and the route to the solution is not immediately obvious.',
 'The goal must be unknown, because knowing the desired final arrangement eliminates the possibility of a problem.',
 'The starting materials must be incomplete, because a problem cannot exist when all the required tiles are available.',
 'The student must already have attempted an incorrect move before the situation qualifies as a problem.',why='A problem has a present state, a goal, and an obstacle with no immediately obvious solution. The goal can be specified clearly while the route remains unclear. An incorrect attempt is not required by the definition.')
question(3,'researcher','Koffka (1935) is cited in the discussion of the Gestalt approach. Two people inspect the same circle problem, but only one recognizes a rectangle with equal diagonals. Which interpretation fits that approach?',
 'The people can organize the same physical elements differently, and restructuring the representation can make a solution available.',
 'The physical stimulus must contain different geometric information for the two people if their solutions differ.',
 'The relevant difference is how many legal disk moves each person has searched before inspecting the circle.',
 'Recognizing the rectangle changes the physical radius rather than changing the relationship used to find the line length.',why='The Gestalt account concerns how the problem is represented in the mind. The circle and lines remain physically unchanged while recognition of the rectangle supplies the relationship between its equal diagonals.')
question(3,'application','In Köhler’s circle problem, a solver treats the unknown black diagonal as an isolated segment. Another solver recognizes the rectangle whose other diagonal extends from the circle to its center. Why does the second representation permit an answer?',
 'The second diagonal is a radius, and the equal diagonals of the rectangle make the unknown segment equal to that radius.',
 'The second diagonal is a diameter, so the unknown segment must be twice the radius regardless of the rectangle.',
 'Every segment inside a circle equals a radius, so recognizing the rectangle is unnecessary to the geometric argument.',
 'The unknown diagonal becomes equal to half the radius because the rectangle occupies only one quadrant of the circle.',why='The dashed diagonal joins the circle’s center to its circumference, so its length is the radius. The black unknown is the rectangle’s other diagonal, which has the same length. The inference depends on that relationship, not on every interior line being a radius.')
question(4,'definition','Which description most precisely matches insight as used in the problem-solving lecture?',
 'A solution becomes available in a sudden realization, often after the problem’s representation has been reorganized.',
 'A solver reports a steady increase in perceived closeness after every successful intermediate operation.',
 'A solver repeatedly applies the same previously successful procedure even when a simpler one is available.',
 'A problem’s solution consists of any legal move that reduces the number of available operators.',why='Insight concerns sudden realization and the “Aha” experience. Gradual progress, a mental set, and legal moves describe different aspects of problem solving. The lecture also states that many solutions occur without insight.')
question(4,'application','A participant solves one task through a series of algebraic operations and another after suddenly reorganizing the available objects. Which statement follows from the lecture’s account of insight?',
 'The second task involves an insight experience, while successful solving of the first can occur without an “Aha” experience.',
 'Both tasks must involve the same sudden experience because both end with a correct solution.',
 'Only the algebra task counts as genuine problem solving because the other solution was not reached gradually.',
 'The sudden solution establishes that no mental activity occurred before the moment the answer was reported.',why='The Gestalt account relates insight to sudden restructuring, but the lecture does not make insight necessary for every solution. A sudden experience also does not imply that no earlier processing occurred.')
# 6–12. Insight experiments and their actual tasks.
question(5,'researcher','Metcalfe and Wiebe (1987) compared insight puzzles with algebra and obtained warmth judgments every 15 seconds. Which predicted difference motivated that procedure?',
 'Perceived closeness should increase gradually for algebra but may remain low until a sudden solution for insight puzzles.',
 'Both types should produce identical gradual increases because warmth ratings measure only final answer accuracy.',
 'Insight participants should predict their solutions more precisely because every useful restructuring is consciously anticipated.',
 'Algebra participants should remain unaware of all progress because a methodical procedure gives no information about distance to solution.',why='The hypothesis contrasted methodical noninsight progress with insight that the solver may not anticipate. Warmth ratings measured felt closeness repeatedly during solving, rather than simply classifying final answers.')
question(5,'design','A researcher records only whether a participant eventually solves a triangle puzzle or an algebra problem. What measurement from Metcalfe and Wiebe’s study is missing if the aim is to distinguish the experience of progress?',
 'Repeated judgments of how close the participant feels to the solution during the attempt.',
 'A second accuracy judgment after the participant has already supplied the same correct answer.',
 'A count of the total blue dots, without any reports about the participant’s changing thoughts.',
 'A replacement of the algebra task with a second copy of the identical triangle puzzle.',why='Final accuracy does not supply the time course of subjective closeness. The repeated warmth judgments were essential to testing whether perceived progress increased gradually or remained low until near solution.')
question(5,'design','Suppose warmth ratings for insight puzzles are collected only once, immediately after a correct solution. Why would this differ critically from the lecture’s study?',
 'A high final rating alone cannot distinguish a sudden jump from a gradual rise during the period before solution.',
 'Any rating obtained after success necessarily proves that the participant had consciously predicted the answer.',
 'A final rating measures the number of legal operators rather than the participant’s subjective closeness.',
 'Collecting ratings after solving would automatically convert every insight puzzle into an algebra problem.',why='The predicted difference concerns the trajectory before solution. Both a gradual and a sudden trajectory can end at a high rating. Repeated reports before success are needed to distinguish those possibilities.')
question(6,'application','The chain problem supplies four three-link sections. Opening a link costs 2 cents and closing one costs 3 cents, with only 15 cents available. Which plan satisfies both the budget and the required closed loop?',
 'Open all three links of one section and use those links to connect the other three sections into a loop, closing each connector.',
 'Open and reclose one link from each of the four sections, using four separate 5-cent operations.',
 'Join the four sections in a straight line using three connectors, leaving the two final ends unconnected.',
 'Keep every three-link section intact and count the gaps between sections as if they were closed connecting links.',why='Three opening-and-closing operations cost 15 cents. Using one section as three separate connectors allows the other three sections to form one closed loop. Four operations would exceed the budget, and an open line would not meet the goal.')
question(6,'application','A participant says the chain puzzle is impossible because “each original section has to remain one piece.” Which obstacle has the participant added to the actual task?',
 'A restriction on the representation that prevents using one section’s separate links as connectors for the others.',
 'The stated requirement that opening and closing any one link costs a total of 5 cents.',
 'The stated requirement that the final arrangement must form a single closed loop.',
 'The correct observation that three links can be opened and reclosed within the available budget.',why='The task permits opening links. Treating every original section as an indivisible unit is an added restriction that blocks the connector solution. Restructuring involves changing how one section can function within the final chain.')
question(6,'application','A proposed solution to the blue-dot triangle moves the top dot below the center and moves the two outer bottom dots to the ends of the original two-dot row. What must be checked for it to satisfy the task?',
 'The new arrangement points downward and exactly three dots change position while the other seven remain fixed.',
 'The new arrangement contains more dots than the original so that a new downward tip can be added.',
 'The original four rows remain in exactly the same positions and preserve the upward-pointing boundary.',
 'Every dot moves downward by the same distance so that the entire triangle is translated without being inverted.',why='The triangle task requires inversion by moving only three of the ten dots. The specified rearrangement gives rows of four, three, two and one from top to bottom while retaining the other seven positions.')
question(7,'researcher','In Metcalfe and Wiebe’s (1987) results, an insight solver reports low warmth shortly before a sharp increase at solution. An algebra solver reports a more gradual rise. Which conclusion matches the measured distinction?',
 'The insight solution can be imminent without a matching gradual increase in the solver’s reported feeling of closeness.',
 'Low warmth proves that the insight solver is farther from the answer than every algebra solver in objective time.',
 'The algebra solver’s higher intermediate ratings establish that algebra always takes less total time to solve.',
 'A sudden warmth increase establishes that insight requires no reorganization of the problem’s representation.',why='Warmth concerns subjective progress. The important result is that the insight trajectory does not rise in the same gradual manner as the algebra trajectory. Neither overall speed nor an absence of processing follows from that pattern.')
# 13–20. Functional fixedness and hints.
question(7,'design','Which hypothetical result would most directly weaken the predicted difference between insight and noninsight progress in the warmth-rating experiment?',
 'Both task types produce comparable gradual increases in warmth throughout the period before a correct solution.',
 'Both task types eventually produce a high warmth rating once a correct solution becomes available.',
 'Insight puzzles and algebra problems require different physical materials during the attempt.',
 'Some participants solve more than one of the problems included in the experiment.',why='The prediction concerns different pre-solution trajectories. Comparable gradual rises would conflict with that distinction. High ratings at the endpoint are compatible with either gradual or sudden approaches.')
question(8,'definition','A participant recognizes a matchbox only as something that contains matches and therefore does not consider using it to support a candle. Which relationship between terms is accurate?',
 'This is functional fixedness, a form of fixation involving restriction to an object’s familiar function.',
 'This is means–end analysis, because every familiar function automatically reduces the difference from the goal.',
 'This is a goal state, because knowing the box’s usual purpose completes the mounting task.',
 'This is an operator rule explicitly forbidding a matchbox from being attached to the corkboard.',why='Functional fixedness concerns the uses assigned to an object. It is a form of fixation, rather than an actual rule of the task. The candle problem permits the box to serve as a support.')
question(8,'design','In the candle problem, participants receive either matchboxes containing matches or empty matchboxes. Empty-box participants are more likely to solve it. What comparison best captures the manipulated obstacle?',
 'Presenting the box as a familiar container can interfere with recognizing its possible role as a candle support.',
 'The empty-box condition removes the requirement that the candle avoid dripping wax onto the floor.',
 'The filled-box condition contains no box that could physically be attached to the corkboard.',
 'The empty-box condition solves the task by making the original candle smaller and lighter.',why='Both conditions concern the same mounting goal, but the presentation changes the box’s association with its familiar container function. The lecture connects the difference in solving to availability of the support interpretation.')
question(8,'application','A solver removes the matches, tacks the box to the corkboard, and places the candle on it. Which change most directly overcomes functional fixedness?',
 'The box is treated as a supporting platform rather than only as the container in which the matches arrived.',
 'The solver changes the required goal from a mounted candle to a candle resting directly on the floor.',
 'The solver assumes that every object in the task must retain exactly the use it had before the task began.',
 'The matchbox becomes a newly supplied tool that was absent from the original materials.',why='The support already exists among the supplied materials. The successful change concerns its represented function, not a new goal or an additional object.')
question(8,'design','An investigator claims that the empty-matchbox result establishes that all failures to solve any problem are caused by functional fixedness. Which interpretation stays aligned with the evidence described?',
 'The manipulation supports a role for the matchbox’s familiar container function in this particular candle task.',
 'The manipulation establishes that past experience cannot influence how people approach a water-jug problem.',
 'The manipulation establishes that every insight solution requires a box that is empty at the outset.',
 'The manipulation establishes that the Tower of Hanoi can be solved without following its disk-movement rules.',why='The experiment changes how the box is presented within the candle problem. Its result concerns that functional interpretation. It does not establish a universal cause of all problem-solving failures or change the rules of other tasks.')
question(9,'application','In the two-string problem, a participant holds one string but cannot reach the other. The room contains pliers. Which use of the pliers addresses the reach obstacle while preserving the goal?',
 'Tie the pliers to one string as a weight, set it swinging, and catch it while holding the other string.',
 'Keep the pliers in their familiar gripping role and wait for both stationary strings to become reachable.',
 'Use the pliers to remove one string so that only one end remains to be tied.',
 'Place the pliers on the floor and redefine success as touching either hanging string once.',why='Weighting the string permits a pendulum movement that brings it within reach. The familiar gripping function can prevent recognizing that alternative use, while removing a string or redefining the task does not satisfy the original goal.')
question(9,'application','Which description distinguishes functional fixedness in the two-string problem from the mere presence of a physical reach limit?',
 'The reach limit is the physical obstacle, while fixedness restricts the pliers to a familiar tool role and blocks their use as a weight.',
 'The reach limit itself proves functional fixedness even if the solver immediately uses the pliers as a pendulum weight.',
 'Fixedness is the rule that no object may be attached to either string, explicitly stated in the lecture’s task.',
 'Fixedness disappears only if the strings become close enough that no pendulum movement is required.',why='The physical distance creates the problem. Functional fixedness is the representation of an available object that prevents a useful response to that distance. The solution does not require changing the distance between the ceiling attachments.')
question(10,'design','During the two-string task, an experimenter “accidentally” sets a string swinging, after which most participants solve it. What role does the hint have in the Gestalt interpretation?',
 'It makes the pendulum relationship available and permits restructuring while the original tying goal remains unchanged.',
 'It changes the goal to describing the experimenter’s action rather than tying the two strings together.',
 'It establishes a new rule that the solver may move both ceiling attachment points closer together.',
 'It substitutes a complete verbal solution for every participant’s attempt to use the available objects.',why='The movement points toward using the string as a pendulum. The lecture interprets the improvement as a change in representation, not a change in goal or permission to alter the room.')
# 21–28. Mental set and search.
question(10,'definition','Which description identifies a mental set rather than restricting an object to its familiar function?',
 'A solver approaches a new water-jug problem using the same measuring procedure that worked repeatedly on earlier problems.',
 'A solver cannot consider the matchbox as anything except the container for the matches.',
 'A solver represents pliers only as a gripping tool and never considers their weight.',
 'A solver identifies the legal disk moves allowed by the explicitly stated Tower of Hanoi rules.',why='A mental set is a preconceived approach based on past problem-solving experience. Functional fixedness concerns familiar object uses. Both can constrain representations, but the relevant source of the restriction differs.')
question(11,'application','A water-jug solver uses capacities A = 21, B = 127, C = 3 to obtain 100 quarts. Which sequence matches the lecture’s illustrated procedure?',
 'Start with B, remove one A-sized amount, and then remove two C-sized amounts, leaving 127 − 21 − 3 − 3.',
 'Start with A, add one C-sized amount, and then assume the result equals the full capacity of B.',
 'Start with B and remove only one C-sized amount, treating the resulting 124 quarts as the requested 100.',
 'Combine A and B, then remove C once, using 21 + 127 − 3 as the target quantity.',why='The lecture works through B − A − 2C. The intermediate quantities are 106, 103, and finally 100 quarts. The arithmetic expresses the actual sequence of measuring operations.')
question(11,'application','After practice with B − A − 2C, a participant receives A = 15, B = 39, C = 3 with a target of 18. The familiar method works, but the participant overlooks A + C. What is the relevant evidence of a mental set?',
 'The earlier successful procedure continues to organize the approach and inhibits recognition of the simpler 15 + 3 solution.',
 'The participant applies an incorrect calculation, because 39 − 15 − 6 cannot equal 18.',
 'The target quantity has no solution unless a new jug with capacity 18 is physically supplied.',
 'The participant has functional fixedness only because water is placed in a jug rather than another kind of container.',why='Both procedures yield 18, but A + C is simpler. The result concerns how an established approach can keep a simpler option from being considered, even when the familiar approach remains valid.')
question(11,'design','To test whether repeated water-jug practice creates a mental set, which comparison most directly addresses the claim?',
 'Compare use of a simpler available solution after repeated B − A − 2C practice with use of that solution without the practice.',
 'Compare the number of letters in the labels A, B and C while keeping every participant’s problem-solving history identical.',
 'Give one group a solvable jug problem and another a problem with no possible solution, then attribute any difference to practice.',
 'Change the target quantity and all capacities between groups without preserving an available simpler solution.',why='The proposed cause is experience with a successful procedure. The comparison must vary that experience while retaining a relevant opportunity to use the simpler approach. Changing solvability alone would confound the interpretation.')
question(12,'researcher','Newell and Simon (1956) described problem solving as search and developed the Logic Theorist. What does their problem-space account describe beyond merely naming the starting arrangement and final answer?',
 'Possible intermediate states and routes connecting the initial state to the goal under the available moves.',
 'Only the solver’s final warmth rating once the solution has already been reported.',
 'Only a sudden change of perception, with no consideration of the states encountered during the attempt.',
 'The physical appearance of the materials without specifying what would count as a successful goal state.',why='The information-processing account describes the search between posing the problem and solving it. Initial, intermediate and goal states specify the space through which a route must be found.')
question(12,'application','A researcher records a puzzle’s starting board, every temporary arrangement reached during the attempt, and the required final board. In problem-space terms, what are the temporary arrangements?',
 'Intermediate states that can form part of a route between the initial state and the goal state.',
 'Operators, because a state and the rule that changes it are interchangeable concepts.',
 'Alternative goal states, because every arrangement encountered satisfies the original task.',
 'Warmth judgments, because the tile locations directly report subjective closeness to solution.',why='An intermediate state is a situation reached during the search. An operator changes a state. A temporary arrangement can be legal without itself satisfying the goal, and it is not a subjective progress rating.')
question(12,'researcher','Which description best preserves the difference between Gestalt restructuring and Newell and Simon’s search account as presented in the lecture?',
 'Restructuring concerns reorganizing a mental representation, while search specifies possible routes through initial, intermediate and goal states.',
 'Restructuring is a physical change in the puzzle materials, while search concerns only the person’s final verbal answer.',
 'Both descriptions require every solution to feel sudden and therefore predict the same warmth trajectory for algebra.',
 'Search removes the need to represent a goal, while restructuring requires no internal representation of the problem.',why='The lecture contrasts attention to the organization of a representation with a specification of the route through a problem space. Both concern problem solving, but they describe different aspects of the process.')
question(13,'application','A Tower of Hanoi solver proposes moving the bottom disk while two smaller disks remain on top of it. Which operator constraint excludes the proposed transition?',
 'A disk can move only when no other disk is resting above it.',
 'A disk may move only if it is the largest disk anywhere in the puzzle.',
 'Every disk must move directly from the initial peg to the goal peg without using an intermediate peg.',
 'A smaller disk is prohibited from being placed on top of a larger disk.',why='Only an exposed top disk is available for a move. The lecture also permits smaller disks on larger ones, permits intermediate pegs, and restricts each move to one disk.')
# 29–36. Operators, visual states, and subgoals.
question(13,'design','A participant transfers a stack of three disks between pegs in one movement and reaches the desired final arrangement. Why does this fail as a Tower of Hanoi solution under the stated operators?',
 'The route violates the one-disk-at-a-time rule even though the final arrangement resembles the goal.',
 'Reaching the goal automatically makes every physically possible movement an allowed operator.',
 'The goal requires the disks to remain on the original peg, so moving any disk is prohibited.',
 'The task forbids placing a small disk on a large one, regardless of how the stack was moved.',why='Operators constrain the transitions, not just the final appearance. A correct final stack reached through a prohibited stack movement does not meet the problem’s move rules.')
question(13,'application','Which proposed Tower of Hanoi move is legal if the named disks are exposed and the destination peg has the stated top disk?',
 'Move a smaller disk onto a larger disk while transferring only that one disk.',
 'Move a larger disk onto a smaller disk because the resulting stack is closer to the goal peg.',
 'Move a covered disk without first removing the smaller disk resting on it.',
 'Move two exposed disks together because both are ultimately required on the same target peg.',why='The size rule permits a smaller disk on a larger one. Progress toward the goal cannot override the constraints against a larger disk on a smaller one, a covered-disk move, or moving multiple disks together.')
question(14,'application','The lecture describes the 64-disk Tower of Hanoi as requiring an enormous time even at one correct move per second. Which feature of the task explains why fast individual moves do not make the entire puzzle brief?',
 'The legal transfer requires many repeated intermediate rearrangements of the smaller disks.',
 'A solver must wait a fixed long interval between moves even when the selected move is correct.',
 'Adding disks removes the rule against moving a larger disk onto a smaller disk.',
 'The goal becomes undefined once more than three disks are used.',why='The disk constraints generate a very long sequence of required moves as the stack grows. The source’s large time estimate concerns how many moves are needed even when each move is fast and correct.')
question(15,'application','Two eight-tile boards contain the same numbers, but only one has empty–1–2, 3–4–5, and 6–7–8 across its three rows. Why can one count as the goal while the other does not?',
 'A state specifies the arrangement of the tiles and empty location, not just which numbers are present.',
 'A goal state is any board that contains eight numbers, regardless of their positions.',
 'The number of tiles must increase as a solver approaches the goal state.',
 'The empty location is excluded from a state description because it contains no numbered tile.',why='The task requires a specified arrangement of the same materials. Tile positions and the empty location distinguish states, so mere presence of all eight numbers is insufficient.')
question(16,'application','In the tile-puzzle search tree, the first board has an empty bottom-middle position. Moving an adjacent tile left, up or right relative to that vacancy produces three branches. What does a branch represent?',
 'A permitted transition from one board state to a possible successor state.',
 'A report that the solver feels exactly one rating unit warmer than before.',
 'A change in the final goal requirement every time another tile is moved.',
 'A separate physical puzzle with a different collection of numbered tiles.',why='Branches connect arrangements reachable by the puzzle’s legal moves. The tile set remains the same. A branch is not a warmth judgment or a redefinition of the goal.')
question(16,'design','A proposed search-tree diagram connects two boards that can be related only by exchanging two numbered tiles while leaving the empty location fixed. What must be checked before that connection can count as a search route?',
 'Whether the transition can actually be made using the task’s allowed operators rather than merely producing a plausible-looking successor.',
 'Whether both boards have the same number of tiles, because that alone guarantees a legal single move.',
 'Whether the later board is printed lower on the page, because vertical position establishes legality.',
 'Whether the solver calls the connection an insight, because that makes the move legal.',why='A path through a problem space is constrained by operators. Sharing a tile set or appearing nearer a labeled goal does not establish that two states are legally connected by the proposed move.')
question(17,'definition','Which description best matches means–end analysis in the lecture?',
 'Organize a search around reducing differences from the goal, using subgoals to create useful intermediate conditions.',
 'Choose an object’s most familiar function and prohibit alternative uses throughout the entire attempt.',
 'Record only the final answer and omit the states that made the answer attainable.',
 'Repeat the first successful procedure on all later problems without considering whether the present obstacle has changed.',why='Means–end analysis identifies differences and uses subgoals to address them. The other descriptions concern functional fixedness, omission of the search process, or a mental set.')
# 37–43. Means–end analysis and representation.
question(17,'researcher','In Newell and Simon’s account, a Hanoi solver first works out how to free the large disk before trying to transfer it. Why is this a subgoal?',
 'Freeing the disk creates an intermediate condition required for a move toward the overall goal.',
 'Freeing the disk is itself the complete goal, so the final arrangement on the target peg is irrelevant.',
 'Freeing the disk suspends the operator rules until the disk reaches its final location.',
 'Freeing the disk changes the puzzle into one with no initial or intermediate states.',why='A subgoal removes an obstacle that prevents a required action. It contributes to the larger task without replacing the final goal or overriding the legal-move rules.')
question(18,'application','A Hanoi solver has exposed the largest disk on the first peg, but the third peg still holds a smaller disk. Which additional subgoal must be addressed before the largest disk can move there?',
 'Free the third peg so that the largest disk will not be placed on top of a smaller disk.',
 'Restore the entire starting stack before attempting any further movement.',
 'Move the smaller disk and the largest disk together as one permitted operation.',
 'Redefine the goal peg as permanently unavailable so that the largest disk never has to move.',why='Exposing the largest disk satisfies one constraint, but its destination must also permit the move. Clearing the target peg addresses a different obstacle under the same size-order rule.')
question(18,'application','During Hanoi solving, a small disk temporarily moves onto the middle peg rather than the final goal peg. Which explanation is consistent with means–end analysis?',
 'The temporary move can help free a required disk or destination and therefore contribute to an overall route to the goal.',
 'Any move away from the final peg is necessarily illegal because all subgoals must already be completed solutions.',
 'A temporary intermediate state eliminates the need to return the small disk to the completed stack.',
 'Using the middle peg establishes functional fixedness because no object is assigned an unusual function.',why='Subgoals can require temporary arrangements that make a later move possible. The value of a move depends on the obstacle it removes within the larger route, while the operators still have to be obeyed.')
question(19,'application','Two descriptions preserve the same mutilated-checkerboard task but emphasize different properties of the squares. What claim from the lecture predicts that they can differ in difficulty?',
 'How a problem is stated can change the representation and make a useful relationship more or less available.',
 'A problem’s difficulty is determined entirely by the total number of squares, independently of all presentation.',
 'Any wording change necessarily creates a different physical board and a different number of legal placements.',
 'Once the goal is specified, people no longer use a mental representation of the board.',why='The lecture adds the importance of representation to a description of states and pathways. Presentations can retain the underlying problem while differing in how readily a solver recognizes the relevant constraint.')
question(20,'application','A student argues that 31 dominoes must cover the mutilated checkerboard because 31 times 2 equals the 62 remaining squares. Which missing relationship invalidates that argument?',
 'Every domino covers one square of each color, but removing opposite same-color corners leaves unequal color counts.',
 'Every domino can cover only two squares of the same color, so an ordinary checkerboard was never coverable.',
 'Removing two corners leaves 64 squares, making the student’s area calculation the only issue.',
 'Dominoes can cover only corner squares, so none can be used once any corner is removed.',why='The remaining area matches, but legal adjacent pairings require equal numbers of the two colors. Removing two same-color corners destroys that balance. The impossibility follows from the color constraint, not from area alone.')
question(20,'design','Which observation is sufficient to reject a complete covering of the lecture’s mutilated checkerboard without trying every domino arrangement?',
 'The removed corners share a color, while every allowed domino covers one square of each color.',
 'The first arrangement tried by one solver leaves a pair of squares uncovered.',
 'The solver reports low warmth during the first 15 seconds of the attempt.',
 'The remaining board has an even total number of squares.',why='A property shared by every legal domino makes the unequal color counts decisive. One failed attempt does not rule out all arrangements, and an even square count is compatible with but does not guarantee a covering.')
question(21,'design','The checkerboard study compares blank, colored, black-and-pink-word, and bread-and-butter-word versions. Which element should remain constant for the comparison to address problem representation?',
 'The underlying removed-corner configuration and the rule that each domino covers an adjacent pair.',
 'The exact visual and verbal labels that the conditions are specifically intended to vary.',
 'The number of dominoes should differ across all conditions so that each group receives a different covering task.',
 'Only the bread-and-butter group should be permitted to place dominoes on adjacent squares.',why='The presentation varies while the underlying covering problem remains the same. Changing the removed squares or legal placement rule would introduce another reason for differences in difficulty.')
# 44–50. Checkerboard evidence and think-aloud protocols.
question(21,'application','Why can “bread and butter” labels help a person solve the checkerboard problem even though those words do not add more squares or dominoes?',
 'They make two distinct kinds of square and the required one-of-each pairing more available in the representation.',
 'They change the domino rule so that two squares with the same label can be paired legally.',
 'They erase the difference between the square types so that only the total remaining area matters.',
 'They permit a domino to be split into two independent pieces that can cover isolated squares.',why='The labels emphasize the pairing relationship. The physical covering constraint is preserved. Recognizing that every domino requires one of each type makes the imbalance after removing same-color corners decisive.')
question(21,'researcher','In the lecture’s checkerboard comparison, the bread-and-butter condition is solved faster than the blank condition. Which interpretation is supported by that result?',
 'Presenting information that points toward the relevant square-pairing representation can reduce solving time.',
 'The words create a physical domino covering of a board that was impossible to cover in the blank condition.',
 'The result establishes that verbal labels improve every possible problem by the same amount.',
 'The result establishes that solvers never represent visual color differences without written words.',why='The problem remains impossible to cover, but recognizing why can become easier. The result concerns access to a useful representation, not a change in physical solvability or a universal effect of verbal labels.')
question(22,'design','Which instruction fits the think-aloud protocol described for problem solving?',
 'Say new thoughts as they occur during the attempt rather than merely narrating the physical actions being performed.',
 'Stay silent until a final answer is reached and then invent a smooth account of how it must have been obtained.',
 'Report only how many dominoes have physically been moved and avoid mentioning any thought about the square labels.',
 'Repeat a fixed solution sentence throughout the attempt so every participant produces the same verbal record.',why='The protocol concerns current thoughts and the information receiving attention. A narration limited to physical movements would omit the representational changes the verbal record is intended to capture.')
question(22,'application','A checkerboard solver initially discusses available spaces, then says that “bread” must pair with “butter” and recognizes why the remaining board cannot be covered. Which change is most consistent with the lecture’s interpretation?',
 'A representational shift makes the relationship between the two kinds of square part of the solver’s reasoning.',
 'The solver has changed the operator so that one domino can legally cover two bread squares.',
 'The verbal report establishes that the board itself changed color during the attempt.',
 'The report is only a list of physical actions and contains no information about the solver’s thought.',why='The content shifts from positions to the required pairing between square types. That is a change in the represented relationship and is related to Gestalt restructuring. The move rules and physical board remain unchanged.')
question(22,'design','An investigator wants to know when the square-pairing constraint enters a participant’s reasoning. Which record from the lecture’s methods is most directly suited to that question?',
 'A think-aloud record containing the participant’s new thoughts during the checkerboard attempt.',
 'A count of the total squares measured before any participant starts solving.',
 'A single final success score that omits all information from the period during solving.',
 'The capacity labels from a separate water-jug problem solved by another participant.',why='A think-aloud protocol records thoughts during the attempt and can identify when the relationship between labels is mentioned. A final score or a physical board count does not locate that change in the course of reasoning.')
question(7,'design','A student treats a warmth rating of 7 as a measurement of how many legal moves remain in a puzzle. Why is that interpretation inconsistent with Metcalfe and Wiebe’s procedure?',
 'Warmth is the participant’s reported feeling of closeness, which can differ from the actual imminence of an insight solution.',
 'Warmth records the exact count of operators, but only for the noninsight algebra condition.',
 'Warmth is a property of the physical chain links rather than a judgment provided by a participant.',
 'Warmth can be recorded only after success and therefore supplies no information about the period before solution.',why='The repeated ratings measure subjective progress. The insight result specifically connects low felt closeness with a solution that can occur shortly afterward, so a warmth value is not an objective move count.')
question(11,'application','A solver trained on B − A − 2C receives A = 28, B = 59, C = 3 and a target of 25. Which response best expresses overcoming the mental set while preserving the actual task?',
 'Use A − C to obtain 28 − 3 = 25 rather than continuing to rely on the longer familiar sequence.',
 'Reject A − C because a procedure that uses fewer than all three jugs is forbidden by the lecture’s task.',
 'Change the target to 28 so that no measuring operation has to be performed.',
 'Apply B − A − C and treat 59 − 28 − 3 as equal to 25.',why='The direct A − C procedure reaches the same required quantity. The familiar B − A − 2C procedure also yields 25, but training can inhibit recognition of the simpler solution. No rule requires using all three jugs.')

question(20,'application','A student repeats the checkerboard task but removes one square of each color, then reuses the lecture’s argument that two squares of the same color were removed. What must change in the reasoning?',
 'The specific color-imbalance argument no longer applies, because removing one of each color preserves equal counts of the two colors.',
 'The original argument still applies unchanged, because removing any two squares always creates unequal color counts.',
 'The student can conclude that each domino now covers two squares of the same color.',
 'The student can ignore all placement constraints because having an even number of squares proves that every arrangement is coverable.',why='The lecture’s impossibility argument depends on removing two same-color corners. Removing one of each color does not create that imbalance. Equal counts alone are not a proof about every possible placement constraint, but they remove this particular reason for impossibility.')

assert len(sections)==21
assert len(questions)==50, len(questions)
collection=dict(id=10,title='Problem Solving and Reasoning',file='CogPsych_Ch12_1 F26.pdf',sourcePdf='sources/CogPsych_Ch12_1_F26.pdf',sections=sections,original=[f'media/problem-solving/slide-{p:02}.webp' for p in range(1,23)],optional=False)
path=ROOT/'module2-data.js';bank=json.loads(path.read_text().split('window.SECOND_HALF = ',1)[1].rstrip(';\n'))
# Idempotent replacement affects this new collection only.
bank['collections']=[c for c in bank['collections'] if c['id']!=10]+[collection]
bank['questions']=[q for q in bank['questions'] if q['module']!=10]+questions
bank['modules']=[m for m in bank['modules'] if m!=10]+[10]
bank['lectureNumbers']['10']='11'
bank['revision']='memory-problem-solving-balanced-100'
for key in ['topics','coreReview','experiments']:bank[key]=[g for g in bank[key] if g.get('module')!=10]
for title,pages in [
 ('Problem representation, restructuring, and insight',[2,3,4,5,6,7]),
 ('Fixation, functional fixedness, and mental set',[8,9,10,11]),
 ('Problem spaces, operators, and means–end analysis',[12,13,14,15,16,17,18]),
 ('Checkerboard representations and think-aloud evidence',[19,20,21,22])]:
 bank['topics'].append(dict(module=10,title=title,pages=pages,progressKey='m2-topic-10-'+str(pages[0])))
for title,pages in [
 ('Representation, insight, and subjective progress',[3,4,5,7]),
 ('Functional fixedness and experience-based mental sets',[8,9,10,11]),
 ('Search, legal operators, and subgoals',[12,13,16,17,18]),
 ('Checkerboard constraints and representational evidence',[20,21,22])]:bank['coreReview'].append(dict(module=10,title=title,pages=pages))
for title,pages in [
 ('Köhler · circle representation and equal diagonals',[3]),
 ('Metcalfe and Wiebe · insight puzzles and warmth judgments',[5,6,7]),
 ('Candle problem · matchbox presentation and functional fixedness',[8]),
 ('Two-string problem · pliers as a weight and a movement hint',[9,10]),
 ('Water-jug problems · practice and a simpler available solution',[11]),
 ('Search demonstrations · tile puzzle and Tower of Hanoi subgoals',[13,14,15,16,17,18]),
 ('Mutilated checkerboard · labels, pairing, and think-aloud protocols',[19,20,21,22])]:bank['experiments'].append(dict(module=10,title=title,pages=pages))
path.write_text('window.SECOND_HALF = '+json.dumps(bank,ensure_ascii=False,indent=2)+';\n')
print(f'Added collection 11: {len(sections)} instructional sections, 22 original pages, {len(questions)} questions. Current lectures: {bank["modules"]}.')
