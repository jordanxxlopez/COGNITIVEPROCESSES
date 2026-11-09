'use strict';
// Version 21 side-by-side contrasts, lecture 11 (Problem Solving and Reasoning). Same pairs, terms and scores as Version 20.
(window.CONTRASTS_V21 = window.CONTRASTS_V21 || []).push(
{module:10,title:"States vs operators",tier:"mid",score:8.5,
 a:{term:"States",definition:"The initial state, the intermediate states along the way, and the goal state of a problem."},
 b:{term:"Operators",definition:"The rules that say which moves are allowed. Applying one changes the problem from one state to another."},
 blocks:[
  {text:"**States** describe where the problem stands: the **initial state**, the **intermediate states** along the way, and the **goal state**. **Operators** are the **rules that say which moves are allowed**. Applying an operator changes the problem from one state to another.",children:["States are the positions.","Operators are the moves between the positions."]},
  {text:"In the **Tower of Hanoi**, the starting stack is the initial state, and the completed stack on the target peg is the goal. The operators are the rules that **one disk moves at a time**, that **only a disk with nothing on top can move**, and that **a larger disk never goes on a smaller one**."},
  {text:"Knowing the initial and goal states does not tell you which intermediate states connect them. Solving a problem means finding a **sequence of operator applications** that reaches the goal. Stating the goal exactly is not the same as knowing the route."}
 ]},
{module:10,title:"Problem solving as search vs as restructuring",tier:"high",score:10.2,
 a:{term:"Search (Newell and Simon, 1956)",definition:"Problem solving as the activity between posing a problem and reaching its solution, finding a route through possible states. Means-end analysis reduces the difference between the current state and the goal."},
 b:{term:"Restructuring (Gestalt, Koffka, 1935)",definition:"A perceptual view in which the way the problem is organized in the mind affects which solution is available. Restructuring reorganizes the representation so a hidden relationship becomes usable."},
 blocks:[
  {text:"**Search**, from **Newell and Simon (1956)**, treats problem solving as the activity between posing a problem and reaching a solution. It is the process of finding a route through possible states. **Means-end analysis** drives the search by reducing the difference between the current state and the goal.",children:["Search makes progress through states, one step at a time."]},
  {text:"**Restructuring**, from the Gestalt view of **Koffka (1935)**, is a perceptual account. The way the problem is organized in the mind affects which solution is available. Restructuring **reorganizes the representation** so that a hidden relationship becomes usable.",children:["Restructuring changes the representation, so the answer becomes visible."]},
  {text:"In **Köhler's circle problem**, for example, the black line is one diagonal of a rectangle, and the other diagonal is a radius. The two diagonals of a rectangle are equal, so **x = r**. Some problems yield to a series of operations, and others yield to a sudden reorganization. Newell and Simon developed the **Logic Theorist** for the search view, and the Gestalt psychologists focused on restructuring."}
 ]},
{module:10,title:"Insight vs noninsight problems",tier:"high",score:9.5,
 a:{term:"Insight problem",definition:"Solved by a sudden realization after the representation changes, as in the triangle and chain problems."},
 b:{term:"Noninsight problem",definition:"Solved by successive operations that bring the solver closer, as in algebra."},
 blocks:[
  {text:"An **insight problem**, such as the **triangle** and **chain** problems, is solved by a **sudden realization after the representation changes**. A **noninsight problem**, such as **algebra**, is solved by **successive operations** that bring the solver closer to the goal.",children:["Insight depends on a change of representation.","Noninsight depends on steady steps."]},
  {text:"**Metcalfe and Wiebe (1987)** had people rate how close they felt to the solution, which they called warmth, **every 15 seconds**. For algebra, **warmth rose gradually** as the solution approached. For insight problems, warmth **stayed low until the solution was close and then jumped sharply, from about 3 to 7**."},
  {text:"This means people **cannot tell how near they are** on insight problems until the jump happens. Not every problem is solved with a sudden insight, because some problems allow a step-by-step route. The sudden jump in warmth is the signature of insight."}
 ]},
{module:10,title:"Functional fixedness vs mental set",tier:"low",score:6.8,
 a:{term:"Functional fixedness",definition:"Restricting an object to its familiar function."},
 b:{term:"Mental set",definition:"A preconceived notion about how to approach a problem, based on past experience with that problem or similar ones."},
 blocks:[
  {text:"**Functional fixedness** is **restricting an object to its familiar function**. **Mental set** is a **preconceived notion about how to approach a problem**, based on past experience with that problem or similar ones. Fixedness concerns what an object is used for, and mental set concerns which method keeps being applied."},
  {text:"Both are forms of **fixation**, which the Gestalt psychologists saw as a major obstacle to solving problems. Seeing the matchbox only as a container blocks the **candle solution**, which is functional fixedness. In the **water-jug problems**, the familiar **B − A − 2C** procedure blocks the simpler **A + C** and **A − C** solutions, which is mental set.",children:["An object that is blocked from a new use shows functional fixedness.","A procedure that is blocked from a simpler route shows mental set."]}
 ]},
{module:10,title:"Candle problem vs two-string problem",tier:"low",score:6.5,
 a:{term:"Candle problem",definition:"Mount a candle on a corkboard so wax does not drip. The solution is to tack the matchbox to the board as a platform. Participants given empty matchboxes were twice as likely to solve it."},
 b:{term:"Two-string problem",definition:"Tie together two strings hanging too far apart to reach both. The solution is to tie pliers to one string as a pendulum weight. When an experimenter accidentally set a string in motion, most participants solved it."},
 blocks:[
  {text:"Both are cases of **functional fixedness**. In the **candle problem**, the task is to mount a candle on a corkboard so that wax does not drip. The box is seen as a container and not as a platform. The solution is to **tack the matchbox to the board**, and participants given **empty matchboxes were twice as likely** to solve it."},
  {text:"In the **two-string problem**, two strings hang too far apart to reach both at once, and the pliers are seen as a gripping tool and not as a weight. The solution is to **tie the pliers to one string as a pendulum**. When an experimenter **accidentally set a string in motion, most participants solved it**, because the hint changed how the solver represented the string.",children:["A hint that restructures the representation can break the fixation."]},
  {text:"In both problems the objects and the requirements stay the same. What changes is the relationship the solver finds among them, which means a new use for a familiar object."}
 ]},
{module:10,title:"Blank board vs bread-and-butter board",tier:"mid",score:8.5,
 a:{term:"Blank or colored board",definition:"The squares are unlabeled or only colored, so nothing points the solver toward the pairing a domino needs."},
 b:{term:"Bread-and-butter board",definition:"The squares are labeled bread and butter, which emphasizes the difference between the two kinds of square and the pairing a domino needs."},
 blocks:[
  {text:"How a problem is stated can change how hard it is. On a **blank or colored board**, the squares are unlabeled or only colored, so nothing points the solver toward the pairing a domino needs. On the **bread-and-butter board**, the squares are labeled, which **emphasizes the difference between the two kinds of square** and the pairing a domino needs."},
  {text:"Participants in the bread-and-butter condition **solved the problem twice as fast** as those with the blank board. In a **think-aloud protocol**, solvers in that condition moved from treating the squares as positions to considering the relationship between the two kinds of square.",children:["The labels moved solvers from positions to relationships."]},
  {text:"The objects and the requirement did not change. Only the **representation** changed, so the difference in difficulty comes from the representation and not from the problem itself."}
 ]},
{module:10,title:"Total area vs pairing (mutilated checkerboard)",tier:"mid",score:7.6,
 a:{term:"Total area reasoning",definition:"62 squares matches the area of 31 dominoes, so it seems the board can be covered."},
 b:{term:"Pairing reasoning",definition:"Every domino covers one square of each color, and the two removed corners are the same color, so the colors are unequal."},
 blocks:[
  {text:"**Total area reasoning** notes that **62 squares matches the area of 31 dominoes**, so it seems the board can be covered. **Pairing reasoning** notes that **every domino covers one square of each color**. The two removed corners are the **same color**, so the colors are unequal. Area counts squares, and pairing counts what kind of square each domino needs."},
  {text:"An ordinary board has 64 squares, and 32 dominoes cover it. Remove two opposite corners, and 62 squares remain. They are **30 of one color and 32 of the other**, but 31 dominoes would need **31 of each**.",children:["The color counts do not match what 31 dominoes require."]},
  {text:"Equal total area does not guarantee a possible arrangement. The color imbalance holds for **every possible placement**, and moving the dominoes around cannot change it, so the covering is impossible."}
 ]},
{module:10,title:"Goal vs subgoal",tier:"low",score:6.6,
 a:{term:"Goal",definition:"The condition you are trying to reach, such as the whole stack moved to the third peg."},
 b:{term:"Subgoal",definition:"A condition that makes part of the larger task possible, not the final answer."},
 blocks:[
  {text:"A **goal** is the condition you are trying to reach, such as the **whole stack moved to the third peg**. A **subgoal** is a condition that makes part of the larger task possible, and it is not the final answer. The goal is the end condition, and a subgoal is a stepping stone toward it."},
  {text:"**Means-end analysis** organizes the search around reducing the difference between the current situation and the goal, and subgoals are the steps that do this. Different subgoals address different obstacles to the same move.",children:["Subgoals are how means-end analysis closes the gap to the goal."]},
  {text:"In the **Tower of Hanoi**, the first subgoal is **freeing the large disk**, the second is **freeing the third peg**, and the third is **moving the large disk**. Reaching a subgoal does not finish the problem, because the smaller disks still have to be moved afterward."}
 ]},
{module:10,title:"Triangle problem vs chain problem",tier:"high",score:9.8,
 a:{term:"Triangle problem",definition:"Ten dots form an upward-pointing triangle, and you must move exactly three dots to make it point down, with seven staying in place."},
 b:{term:"Chain problem",definition:"Four short sections of chain must become one closed loop, where opening a link costs 2 cents, closing it costs 3 cents and the budget is 15 cents."},
 blocks:[
  {text:"In the **triangle problem**, ten dots form an upward-pointing triangle, and you must **move exactly three dots** to make it point down, with seven staying in place. In the **chain problem**, four short sections of chain must become one closed loop. **Opening a link costs 2 cents**, **closing it costs 3 cents**, and the budget is **15 cents**."},
  {text:"Both are **insight problems** used by **Metcalfe and Wiebe (1987)**, and both are solved by a change in representation. In the triangle, the top dot becomes a new bottom point. In the chain, one three-link section is opened into separate links that join the other three sections, and three open-and-close operations use the full 15 cents.",children:["Each problem is solved by seeing its pieces in a new way."]},
  {text:"Metcalfe and Wiebe (1987) compared both with algebra and found that warmth **jumped late** for them, from about **3 to 7**, unlike the gradual rise for algebra."}
 ]},
{module:10,title:"Problem vs knowing the goal",tier:"low",score:1.4,
 a:{term:"A problem",definition:"A situation with a present state, a goal and an obstacle between them, where the solution is not immediately obvious."},
 b:{term:"Stating the goal",definition:"Being able to describe exactly what the finished situation looks like."},
 blocks:[
  {text:"A **problem** is a situation with a **present state**, a **goal** and an **obstacle** between them, and the solution is not immediately obvious. **Stating the goal** only means describing exactly what the finished situation looks like. A problem needs an obstacle, and describing the goal does not remove it."},
  {text:"The difficulty lies in the route, not in whether the goal has been stated. In the **numbered-tile puzzle**, you can describe the goal arrangement exactly and still not know the sequence of moves that reaches it.",children:["Knowing the goal is not the same as knowing the moves."]},
  {text:"A tile sitting in the right place is not the same as a solved state, because the **whole arrangement defines the state**. A state is the full arrangement of the board, not any single tile."}
 ]}
);
