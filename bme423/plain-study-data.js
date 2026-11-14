// Built by authoring/plain_study.py from plain_study_content.py. Do not edit by hand.
const PLAIN_STUDY={
"revision": "plain-study-1",
"tiers": {
"asked": "Asked on Exam 1",
"review": "On the review and homework",
"out": "Not on the midterm",
"m2": "Module II · Homework 3",
"m2b": "Module II · after Homework 3"
},
"lectures": [
{
"id": 2,
"tier": "review",
"title": "Describing data with a few numbers",
"lead": "A sample is used to learn about a population, so the first job is to summarize the sample and know what kind of data it is.",
"topics": [
{
"title": "Population values and sample estimates",
"blocks": [
{
"pages": [
3,
7
],
"main": "**A population is the whole group you care about, and a sample is the smaller group you actually measure.** The population mean and standard deviation are fixed values that are usually unknown. The sample mean and sample standard deviation are calculated from the measured people, so they estimate those population values.",
"sub": [
"The **standard deviation** (SD) describes how far individual measurements usually sit from the mean.",
"The sample variance divides by n minus 1 instead of n, because the sample mean sits a little too close to its own data and would make the spread look too small."
],
"end": "So every summary you calculate from a sample is an estimate of a population value."
},
{
"pages": [
4,
5,
6
],
"main": "**A Normal population is symmetric and bell shaped, so its mean and median sit at the same place.** About two thirds of the values fall within one SD of the mean, and about 95 percent fall within two SDs.",
"sub": [
"A **skewed** distribution has one long tail, so the mean is pulled toward that tail and no longer matches the median."
],
"end": "That is why the shape of the data decides whether the mean or the median is the better center."
}
]
},
{
"title": "Median, quartiles and percentiles",
"blocks": [
{
"pages": [
8,
9,
10
],
"main": "**A percentile is the value below which a given percent of the ordered data falls.** The median is the 50th percentile, and the quartiles are the 25th and 75th percentiles. To find one, sort the data first, because positions only make sense in order.",
"sub": [
"The position of the pth percentile is 1 plus p times (n minus 1), divided by 100.",
"When the position lands between two observations, the percentile is placed between those two values by the same fraction."
],
"end": "So a percentile always comes from a position in the sorted list, not from the raw order the data arrived in."
},
{
"pages": [
11,
12,
13
],
"main": "**A box plot shows the median and the middle half of the data, and a violin plot also shows the shape.** The box runs from the 25th to the 75th percentile, so its length is the **interquartile range** (the spread of the middle half). A violin plot is wider where values are common, so it shows where the data bunch up."
}
]
},
{
"title": "Why averages vary less than individuals",
"blocks": [
{
"pages": [
15,
16,
17,
18,
19
],
"main": "**Means of samples vary less than single measurements, because high and low values cancel out inside each average.** If many samples of ten were taken, their means would form their own distribution centered on the population mean. The spread of that distribution is the **standard error** of the mean (SE, the SD of sample means).",
"sub": [
"The standard error equals the SD divided by the square root of the sample size, so larger samples give more precise means.",
"The **central limit theorem** says that these sample means are close to Normal even when the individual values are not."
],
"end": "So the SD describes people, and the SE describes how much the mean would change from sample to sample."
}
]
},
{
"title": "Kinds of data",
"blocks": [
{
"pages": [
20,
21,
25
],
"main": "**The kind of data decides which method you can use, so classify the variable before anything else.** **Interval** data are numbers with equal steps, and they are continuous (any value, like blood pressure) or discrete (counts, like tender joints). **Categorical** data are groups, and they are nominal (no order, like zip code) or ordinal (ordered, like an Apgar score).",
"end": "So the first question for any problem is what was recorded for each subject."
}
]
}
],
"questions": [
{
"q": "What is the difference between the standard deviation and the standard error?",
"a": "The standard deviation describes how spread out the individual measurements are. The standard error describes how much the sample mean would change from one sample to another. The SE is the SD divided by the square root of n, so it shrinks as the sample gets bigger while the SD does not."
},
{
"q": "Why does the sample variance divide by n minus 1?",
"a": "It divides by n minus 1 because the deviations are measured from the sample mean, which is calculated from the same data. The sample mean sits closer to its own data than the true mean does, so dividing by n would make the spread look too small. Dividing by n minus 1 corrects that."
},
{
"q": "Is an Apgar score interval or categorical data?",
"a": "An Apgar score is categorical ordinal data. The scores have an order, but the steps between them are not equal measured amounts, so they are ordered categories rather than interval numbers."
}
],
"memorize": [
{
"title": "Find a percentile in a small sample",
"when": "You get a short list of measurements and are asked for a percentile, the median or a quartile.",
"steps": [
{
"do": "Sort the data from smallest to largest.",
"why": "This is because a percentile is a position in the ordered list."
},
{
"do": "Find the position of the percentile.",
"why": "This is because the position tells you which value, or which pair of values, to use.",
"tex": "\\text{position}=1+\\frac{p(n-1)}{100}"
},
{
"do": "Split the position into its whole part k and its leftover fraction f.",
"why": "This is because k tells you which two values to use and f tells you how far to go between them.",
"tex": "k=\\lfloor\\text{position}\\rfloor,\\quad f=\\text{position}-k"
},
{
"do": "If the position is a whole number, read that value directly.",
"why": "This is because the percentile then sits exactly on one observation."
},
{
"do": "If the position falls between two values, move from the lower value toward the higher one by the leftover fraction.",
"why": "This is because the percentile sits partway between those two observations.",
"tex": "x_{(k)}+f\\,\\big(x_{(k+1)}-x_{(k)}\\big)"
},
{
"do": "Write the answer with its units.",
"why": "This is because a percentile is a measurement, not a percent."
}
]
},
{
"title": "Standard error from one sample",
"when": "The question asks how precise a sample mean is.",
"steps": [
{
"do": "Calculate the sample mean and the sample SD.",
"why": "This is because the SE is built from the SD.",
"tex": "s=\\sqrt{\\frac{\\sum (x_i-\\bar x)^2}{n-1}}"
},
{
"do": "Divide the SD by the square root of the sample size.",
"why": "This is because averaging n values shrinks the spread of the mean by that amount.",
"tex": "s_{\\bar x}=\\frac{s}{\\sqrt n}"
},
{
"do": "Say that the SE describes the mean, not individual people.",
"why": "This is because that is the difference most questions are checking."
}
]
},
{
"title": "Check whether data look Normal using percentiles",
"when": "The question asks whether a sample looks Normally distributed.",
"steps": [
{
"do": "Compare the mean with the median.",
"why": "This is because a Normal distribution has them in the same place."
},
{
"do": "Compare the 16th percentile with the mean minus one SD, and the 84th percentile with the mean plus one SD.",
"why": "This is because in a Normal distribution about 16 percent of values fall below one SD under the mean.",
"tex": "x_{16}\\approx \\bar x-s,\\quad x_{84}\\approx \\bar x+s"
},
{
"do": "Find those percentiles with the course position rule.",
"why": "This is because the course defines percentiles by position 1 plus p times (n minus 1) over 100."
},
{
"do": "State a cautious conclusion about whether the data look Normal.",
"why": "This is because a small sample can only suggest the shape, not prove it."
}
]
}
]
},
{
"id": 3,
"tier": "asked",
"title": "Discrete random variables",
"lead": "A discrete random variable takes separate values, and each value has its own probability.",
"topics": [
{
"title": "What a random variable is",
"blocks": [
{
"pages": [
5,
6,
8,
9,
11
],
"main": "**A random variable turns each outcome of an experiment into a number.** The **sample space** is the list of every possible outcome. When a coin is coded as 1 for heads and 0 for tails, the outcome becomes a number you can add and average.",
"sub": [
"A **discrete** random variable has separate values you can list, like the number of heads in three tosses."
],
"end": "So a random variable lets you do arithmetic with chance outcomes."
},
{
"pages": [
13,
14,
15,
16
],
"main": "**Independent events do not change each other's chances, so their probabilities multiply.** After a run of heads, the next toss is still one half, because the coin has no memory. When an earlier event does change the next chance, you multiply by the **conditional probability** instead."
}
]
},
{
"title": "The probability function and its rules",
"blocks": [
{
"pages": [
17,
20,
22,
23
],
"main": "**The probability function, written f of y, gives the chance of each exact value.** Every probability must be between 0 and 1, and all of them must add up to exactly 1. A function that breaks either rule cannot be a probability function.",
"sub": [
"The function must be defined for every value of y, so you always finish it with \"0 elsewhere\"."
],
"end": "So checking a probability function means checking the range of each value and the total."
}
]
},
{
"title": "The cumulative distribution function",
"blocks": [
{
"pages": [
24,
25
],
"main": "**The cumulative distribution function, F of y, adds up all the probability at or below y.** Its graph is a staircase. It is flat between the possible values and jumps up at each one. The size of each jump is the probability of that exact value.",
"sub": [
"The filled dot at a jump shows that F includes the value itself, because F means less than or equal to.",
"F starts at 0 on the far left and ends at 1 on the far right."
],
"end": "That is why you can rebuild the probability function by reading the jump sizes."
}
]
},
{
"title": "Expected value and variance",
"blocks": [
{
"pages": [
26,
27,
28,
29
],
"main": "**The expected value is a weighted average, where each value is weighted by its probability.** It is the long-run average if the experiment were repeated many times. It does not have to be a value the variable can actually take.",
"sub": [
"The **variance** is the weighted average of the squared distances from the expected value, so it measures spread."
],
"end": "So both the mean and the variance come from multiplying by the probabilities and adding."
},
{
"pages": [
30,
31
],
"main": "**In a game, the expected earnings include the losing outcomes as negative numbers.** Roulette has an expected value below zero, so a player loses money on average over many bets."
}
]
}
],
"questions": [
{
"q": "How do you write the probability function from a graph of the CDF?",
"a": "Each jump in the CDF graph sits at a possible value, and the height of the jump is the probability of that value. So you list each jump location with its jump size, and you finish with 0 elsewhere. The probabilities should add up to 1."
},
{
"q": "Why is the probability that Y is greater than a equal to 1 minus F of a?",
"a": "F of a is the probability that Y is less than or equal to a. Being greater than a is everything else, so its probability is 1 minus F of a."
},
{
"q": "Can the expected value be a value the variable can never take?",
"a": "Yes, the expected value can be a value the variable never takes. This is because it is a weighted average of all the values, like 3.5 for a fair die, and an average can fall between possible outcomes."
}
],
"memorize": [
{
"title": "Check whether a function is a valid probability function",
"when": "The question lists functions and asks which could be probability functions.",
"steps": [
{
"do": "Check that every value of f is between 0 and 1.",
"why": "This is because a probability can never be negative or above 1."
},
{
"do": "Add all the values and show the sum.",
"why": "This is because the probabilities must total exactly 1.",
"tex": "\\sum_y f(y)=1"
},
{
"do": "Name the rule that fails for any function that is not valid.",
"why": "This is because the answer must say why it is not a probability function."
}
]
},
{
"title": "Turn a CDF graph into a probability function",
"when": "You see a staircase graph of F of y and must write f of y for all values.",
"steps": [
{
"do": "Find every place where the staircase jumps.",
"why": "This is because the variable can only take the values where F jumps."
},
{
"do": "Measure each jump as the upper height minus the lower height.",
"why": "This is because the jump size is the probability of that exact value.",
"tex": "f(y_k)=F(y_k)-F(y_{k-1})"
},
{
"do": "Write each value with its probability in a piecewise function.",
"why": "This is because the question asks you to define f of y completely."
},
{
"do": "Finish with 0 elsewhere.",
"why": "This is because every other value has no probability."
},
{
"do": "Check that the probabilities add up to 1.",
"why": "This is because a valid probability function always totals 1."
}
]
},
{
"title": "Read a probability from the CDF",
"when": "You are asked for a chance like Y greater than a value, or Y between two values.",
"steps": [
{
"do": "Rewrite the question using less than or equal to.",
"why": "This is because F only gives less than or equal to probabilities."
},
{
"do": "For a right tail, subtract F at the cutoff from 1.",
"why": "This is because the right tail is everything F does not include.",
"tex": "P(Y>a)=1-F(a)"
},
{
"do": "For an interval, subtract F at the lower end from F at the upper end.",
"why": "This is because that leaves only the probability between the two ends.",
"tex": "P(a<Y\\le b)=F(b)-F(a)"
},
{
"do": "Check whether each endpoint is included.",
"why": "This is because a discrete variable can sit exactly on an endpoint, and strict or not strict changes the answer."
}
]
},
{
"title": "Expected value and variance of a discrete variable",
"when": "You have a table or function of values and probabilities.",
"steps": [
{
"do": "List each value next to its probability.",
"why": "This is because every calculation pairs a value with its weight."
},
{
"do": "Multiply each value by its probability and add.",
"why": "This is because the expected value is a weighted average.",
"tex": "E[X]=\\sum x\\,f(x)"
},
{
"do": "Square each distance from the mean, multiply by its probability, and add.",
"why": "This is because variance is the weighted average squared distance.",
"tex": "\\operatorname{Var}(X)=\\sum (x-\\mu)^2 f(x)=E[X^2]-(E[X])^2"
},
{
"do": "Take the square root if the SD is asked.",
"why": "This is because the SD puts the spread back in the original units."
}
]
}
]
},
{
"id": 4,
"tier": "asked",
"title": "Continuous random variables",
"lead": "A continuous variable can take any value in a range, so probability is measured as area under a curve.",
"topics": [
{
"title": "Density and area",
"blocks": [
{
"pages": [
5,
6,
7
],
"main": "**For a continuous variable, probability is the area under the density curve.** The density, written f of x, is not itself a probability. The chance of landing between two values is the area under f between them, and the total area must be 1.",
"sub": [
"The chance of one exact value is zero, because a single point has no width and so no area.",
"That is why less than and less than or equal to give the same answer for a continuous variable."
],
"end": "So every continuous probability question is an area question."
}
]
},
{
"title": "Building the CDF piece by piece",
"blocks": [
{
"pages": [
10,
11,
12,
13
],
"main": "**The CDF of a continuous variable adds up the area from the far left up to x.** When the density has separate pieces, the CDF has matching pieces. Below the range the CDF is 0. Inside the range it is the area so far. Above the range it is 1.",
"sub": [
"Inside a piece, you add the area already collected before that piece to the integral from the start of the piece up to x.",
"The pieces must join without gaps, because area cannot suddenly appear or disappear."
],
"end": "So the CDF climbs smoothly from 0 to 1 and then stays at 1."
},
{
"pages": [
14
],
"main": "**Left tails, right tails and intervals all come from the CDF.** A left tail is F at the cutoff. A right tail is 1 minus F at the cutoff. An interval is F at the upper end minus F at the lower end."
}
]
},
{
"title": "Expected value of a continuous variable",
"blocks": [
{
"pages": [
15,
16,
17,
18,
19
],
"main": "**The expected value of a continuous variable is the integral of x times the density.** It plays the same role as the weighted sum for a discrete variable, with area replacing the list of probabilities. For a Uniform variable, the mean is the midpoint because the density is flat.",
"sub": [
"If every value is rescaled by a and shifted by b, the mean is rescaled and shifted the same way.",
"A shift does not change the variance, but rescaling by a multiplies the variance by a squared."
],
"end": "So you can often find a new mean from an old one without integrating again."
}
]
}
],
"questions": [
{
"q": "Why is the probability of one exact value zero for a continuous variable?",
"a": "The probability of one exact value is zero because probability is area under the density. A single point has no width, so the area above it is zero."
},
{
"q": "What must be true for a function to be a valid density?",
"a": "The function must never be negative, and its total area must equal 1. If a constant is unknown, you set the total area equal to 1 and solve for it."
},
{
"q": "What does the CDF look like above the largest possible value?",
"a": "The CDF equals 1 above the largest possible value and stays there. This is because all of the area has already been collected, so nothing is left to add."
}
],
"memorize": [
{
"title": "Write the full CDF from a piecewise density",
"when": "You are given f of x in pieces and asked for F of x for all x.",
"steps": [
{
"do": "Write the definition of F as the integral of f from the far left up to x.",
"why": "This is because the CDF is accumulated area.",
"tex": "F(x)=\\int_{-\\infty}^{x} f(u)\\,du"
},
{
"do": "Below the range, write F as 0.",
"why": "This is because no area has been collected yet."
},
{
"do": "Inside the range, add the area so far to the integral from the start of the piece up to x.",
"why": "This is because each piece builds on the area before it.",
"tex": "F(x)=F(a)+\\int_{a}^{x} f(u)\\,du"
},
{
"do": "Above the range, write F as 1.",
"why": "This is because all the area has been collected."
},
{
"do": "Check that the pieces meet at each boundary.",
"why": "This is because the CDF of a continuous variable has no jumps."
}
]
},
{
"title": "Percentile or median of a continuous variable",
"when": "The question gives a density or CDF and asks for a percentile, like the 75th percentile on Exam 1.",
"steps": [
{
"do": "Write the full CDF first.",
"why": "This is because a percentile is found by reading the CDF backward."
},
{
"do": "Find which piece of the CDF reaches the target value.",
"why": "This is because only one piece can contain the percentile."
},
{
"do": "Set that piece equal to the percent as a decimal.",
"why": "This is because the pth percentile c is where the accumulated area is p over 100.",
"tex": "F(c)=\\frac{p}{100}"
},
{
"do": "Solve for c and keep the root inside that piece's range.",
"why": "This is because a root outside the range does not belong to this variable."
}
]
},
{
"title": "Expected value from a density",
"when": "You are asked for E of X when X is continuous.",
"steps": [
{
"do": "Write E of X as the integral of x times f of x.",
"why": "This is because every value is weighted by its density.",
"tex": "E[X]=\\int_{-\\infty}^{\\infty} x\\,f(x)\\,dx"
},
{
"do": "Split the integral over every piece, write the zero pieces, then drop them.",
"why": "This is because the solutions show every piece before keeping only the range where f is not zero."
},
{
"do": "Integrate and plug in the upper bound minus the lower bound.",
"why": "This is because a definite integral is the difference between the two ends."
}
]
},
{
"title": "Find an unknown constant in a density",
"when": "The density contains a letter like c that you must find.",
"steps": [
{
"do": "Set the total area under f equal to 1.",
"why": "This is because every valid density has total area 1.",
"tex": "\\int f(x)\\,dx=1"
},
{
"do": "Integrate and solve for the constant.",
"why": "This is because that is the only value that makes the total come out to 1."
},
{
"do": "Keep only the solution that makes sense.",
"why": "This is because a range endpoint or density value cannot be negative."
}
]
}
]
},
{
"id": 5,
"tier": "asked",
"title": "Normal probabilities and percentiles",
"lead": "Every Normal question is turned into the standard Normal so that one table can answer it.",
"topics": [
{
"title": "The standard Normal and its table",
"blocks": [
{
"pages": [
6,
7,
8
],
"main": "**The standard Normal, written Z, has mean 0 and SD 1, and its table gives the area to the left of z.** A right tail is 1 minus that left area. An interval is the left area at the upper end minus the left area at the lower end.",
"sub": [
"Because the curve is symmetric, the area to the left of negative z equals the area to the right of positive z."
],
"end": "So drawing the area first tells you which subtraction to do."
}
]
},
{
"title": "Standardizing any Normal measurement",
"blocks": [
{
"pages": [
10,
11,
12
],
"main": "**Standardizing turns a measurement into the number of SDs it sits from the mean.** You subtract the mean and divide by the SD. The probability stays the same, because the whole curve is just shifted and stretched.",
"end": "So a question about any Normal variable becomes a question about Z."
},
{
"pages": [
9
],
"main": "**A quantile reverses the question, because it starts from an area and asks for the value.** You find the z with that left area in the table, then turn it back into the original units by multiplying by the SD and adding the mean."
}
]
},
{
"title": "Probabilities for a sample mean",
"blocks": [
{
"pages": [
14
],
"main": "**A question about the average of a sample uses the standard error instead of the SD.** The sample mean is Normal with the same mean as the population, but its SD is the population SD divided by the square root of n. So the same value is many more SEs from the mean than SDs, and the probabilities change a lot.",
"end": "That is why you must check whether the question is about one person or about an average."
}
]
},
{
"title": "Checking whether data look Normal",
"blocks": [
{
"pages": [
15,
16,
17
],
"main": "**A Normal quantile plot should look like a straight line when the data are Normal.** Each sorted value is plotted against where it would fall on a Normal curve. Curves or bends at the ends mean skewness or heavy tails."
}
]
}
],
"questions": [
{
"q": "Why do you standardize before using the table?",
"a": "You standardize because the table only describes the standard Normal. Subtracting the mean and dividing by the SD turns any Normal value into a z value, and the probability stays the same."
},
{
"q": "How does a question about the mean of 16 people differ from a question about one person?",
"a": "For the mean of 16 people you divide the SD by the square root of 16 first. This is because averages vary less than single people. The smaller spread puts the same cutoff more SEs away, so the probability changes."
},
{
"q": "What does a bend at the end of a Normal quantile plot tell you?",
"a": "A bend at the end tells you the data are not Normal in that tail. The extreme values are farther out or closer in than a Normal curve would put them, so the data are skewed or have heavy tails."
}
],
"memorize": [
{
"title": "Normal probability for one measurement",
"when": "A variable is Normal with a given mean and SD, and you want a probability.",
"steps": [
{
"do": "Write the variable as Normal with its mean and SD.",
"why": "This is because it names the numbers you will use."
},
{
"do": "Standardize each cutoff.",
"why": "This is because the table only works for Z.",
"tex": "z=\\frac{x-\\mu}{\\sigma}"
},
{
"do": "Sketch the area you want.",
"why": "This is because the sketch tells you whether to use the left area, 1 minus it, or a difference."
},
{
"do": "Look up each left area in the table and combine them, using symmetry for a negative z.",
"why": "This is because the table only lists left areas for positive z.",
"tex": "P(a<X<b)=F(z_b)-F(z_a),\\quad F(-z)=1-F(z)",
"table": "Use the class z table. It lists z beside F(z), the area to the left of z, and only for positive z.",
"tablePath": "sources/tables/z_table_NormalDist.pdf"
},
{
"do": "State the probability in words about the original variable.",
"why": "This is because the question is about the measurement, not about Z."
}
]
},
{
"title": "Normal probability for a sample mean",
"when": "The question asks about the average of a sample of n people.",
"steps": [
{
"do": "Name the sample mean as a new Normal variable with the same mean, by the central limit theorem.",
"why": "This is because averages center on the population mean and are Normal."
},
{
"do": "Divide the SD by the square root of n.",
"why": "This is because averages vary less than individuals.",
"tex": "\\sigma_{\\bar X}=\\frac{\\sigma}{\\sqrt n}"
},
{
"do": "Standardize using the SE, not the SD.",
"why": "This is because the SE is the spread of the mean.",
"tex": "z=\\frac{\\bar x-\\mu}{\\sigma/\\sqrt n}"
},
{
"do": "Use the table and combine the areas as before.",
"why": "This is because the rest of the method does not change.",
"table": "Use the class z table. It lists z beside F(z), the area to the left of z, and only for positive z.",
"tablePath": "sources/tables/z_table_NormalDist.pdf"
}
]
},
{
"title": "Normal percentile",
"when": "You are given an area and asked for the value that cuts it off.",
"steps": [
{
"do": "Turn the request into a left area.",
"why": "This is because the table is organized by left area."
},
{
"do": "Find the z with that left area, using symmetry when the area is below one half.",
"why": "This is because the table only lists areas of one half and above.",
"table": "Use the class z table. It lists z beside F(z), the area to the left of z, and only for positive z.",
"tablePath": "sources/tables/z_table_NormalDist.pdf"
},
{
"do": "Convert back to the original units.",
"why": "This is because the answer must be a measurement.",
"tex": "x=\\mu+z\\,\\sigma"
}
]
}
]
},
{
"id": 6,
"tier": "asked",
"title": "The idea behind ANOVA",
"lead": "ANOVA asks whether several group means differ by comparing two estimates of the same variance.",
"topics": [
{
"title": "The question ANOVA answers",
"blocks": [
{
"pages": [
3,
4,
5
],
"main": "**ANOVA (analysis of variance) tests whether three or more group means differ.** The **null hypothesis** says that the treatment has no effect, so all the groups are samples from one population. Even then, the sample means would differ a little because of random sampling.",
"end": "So the question is whether the means differ more than random sampling alone would explain."
}
]
},
{
"title": "Two estimates of the same variance",
"blocks": [
{
"pages": [
9,
10
],
"main": "**The within-groups variance estimates the population variance from the spread inside each group.** Treatment cannot change the spread inside a group, so this estimate stays honest whether or not the treatment works. With equal group sizes, it is the average of the group variances."
},
{
"pages": [
6,
8,
11,
12
],
"main": "**The between-groups variance estimates the same population variance from how spread out the group means are.** The variance of a group mean is the population variance divided by n. So multiplying the variance of the means by n puts it back on the scale of individuals.",
"sub": [
"If the treatment works, the means spread apart, so this estimate gets too big."
],
"end": "So under the null hypothesis both estimates should be about the same size."
}
]
},
{
"title": "The F ratio",
"blocks": [
{
"pages": [
13,
14
],
"main": "**The F ratio divides the between-groups estimate by the within-groups estimate.** When the null hypothesis is true, F is near 1. When the means really differ, the top grows, so F gets large. If F is bigger than the cutoff in the F table, you reject the null hypothesis.",
"sub": [
"F has two degrees of freedom, one for the top and one for the bottom. The top uses the number of groups minus 1. The bottom uses the number of groups times one less than the group size."
]
},
{
"pages": [
16,
17,
18
],
"main": "**In the cell-phone and sperm-motility example, F was compared with the table cutoff to decide whether motility differed among groups.** The same steps work for any balanced design."
}
]
}
],
"questions": [
{
"q": "Why is the within-groups variance not affected by the treatment?",
"a": "The within-groups variance is not affected because it only looks at spread inside each group. Everyone in a group got the same treatment, so the treatment cannot make them spread out more."
},
{
"q": "Why is the variance of the means multiplied by n?",
"a": "It is multiplied by n because means vary less than individuals. The variance of a mean is the population variance divided by n, so multiplying by n puts it back on the scale of individuals."
},
{
"q": "What does an F near 1 tell you?",
"a": "An F near 1 tells you the group means differ about as much as random sampling would cause. The two variance estimates agree, so there is no evidence of a treatment effect."
}
],
"memorize": []
},
{
"id": 7,
"tier": "asked",
"title": "Doing ANOVA from start to finish",
"lead": "A balanced ANOVA can be done from each group's mean and SD, and the same numbers appear in R output.",
"topics": [
{
"title": "Setting up the test",
"blocks": [
{
"pages": [
5,
8
],
"main": "**Start an ANOVA by naming the test and writing the null hypothesis about the actual study.** A good null hypothesis names the outcome and the groups, such as no difference in rate of bone loss among the three treatment groups. ANOVA assumes Normal data, equal variances and independent groups.",
"end": "So the first two lines of every answer are the test and the null hypothesis in words."
}
]
},
{
"title": "The calculation in order",
"blocks": [
{
"pages": [
6,
7,
10,
11,
12,
13
],
"main": "**The within estimate comes from the group SDs, and the between estimate comes from the group means.** Average the squared SDs to get the within-groups variance. Find the grand mean, then the variance of the group means around it, and multiply by n.",
"sub": [
"The F ratio is the between estimate divided by the within estimate."
]
},
{
"pages": [
14,
16,
24,
25
],
"main": "**The decision compares F with the table cutoff at the stated significance level.** If the exact denominator degrees of freedom are not printed, you use the two printed rows on either side. If F is bigger than both, you reject the null hypothesis.",
"sub": [
"When you reject at 0.05, the homework guidelines say to check a stricter level like 0.01 as well, so the P range is as tight as possible."
],
"end": "So the conclusion sentence repeats the null hypothesis wording and adds the P value."
}
]
},
{
"title": "Reading ANOVA output",
"blocks": [
{
"pages": [
36,
38,
39
],
"main": "**In R output, the Residuals row holds the within-groups information.** Its Mean Sq is the within-groups variance and its Df is the denominator degrees of freedom. The treatment row holds the between-groups information, and the F value and Pr(>F) give the test result.",
"end": "That is why later pairwise tests take the within variance straight from the Residuals Mean Sq."
},
{
"pages": [
26,
27,
28,
29,
30,
31
],
"main": "**Sums of squares are another way to write the same two estimates.** Each mean square is a sum of squares divided by its degrees of freedom. This hand version was not required on the midterm."
}
]
}
],
"questions": [
{
"q": "Why is \"mu 1 equals mu 2 equals mu 3\" not an acceptable null hypothesis?",
"a": "It is not acceptable because it does not say anything about the study. The null hypothesis has to name the real outcome and groups, like no difference in hematocrit among the placebo and two dose groups."
},
{
"q": "Which line of R's aov output gives the within-groups variance?",
"a": "The Residuals line gives the within-groups variance. Its Mean Sq column is the within variance, and its Df column is the degrees of freedom you use for the table."
},
{
"q": "If ANOVA finds a difference, do you say which groups differ?",
"a": "No, you do not say which groups differ unless the question asks. ANOVA only shows that at least one mean is different, so finding which ones needs a separate pairwise method."
}
],
"memorize": [
{
"title": "Balanced ANOVA from means and SDs",
"when": "The problem gives three or more independent groups of equal size, with a mean and SD for each.",
"steps": [
{
"do": "Name the test as analysis of variance and write the reason in parentheses.",
"why": "This is because there are more than two groups of different subjects with interval, Normal data, and the solutions state that reason."
},
{
"do": "Write the null hypothesis in words about the outcome and the groups.",
"why": "This is because a generic equation loses points."
},
{
"do": "List m, the number of groups, and n, the number in each group.",
"why": "This is because every later formula uses them."
},
{
"do": "Write each general equation before you put in the numbers.",
"why": "This is because the grading rules give credit for the equation itself, not only the answer."
},
{
"do": "Average the squared SDs to get the within-groups variance.",
"why": "This is because the spread inside groups estimates the population variance.",
"tex": "s^2_{wit}=\\frac{1}{m}\\sum s_i^2"
},
{
"do": "Find the grand mean and the variance of the group means.",
"why": "This is because the spread of the means is the other route to the variance.",
"tex": "s^2_{\\bar X}=\\frac{\\sum(\\bar x_i-\\bar X)^2}{m-1}"
},
{
"do": "Multiply that variance by n to get the between-groups variance.",
"why": "This is because the variance of a mean is the population variance divided by n.",
"tex": "s^2_{bet}=n\\,s^2_{\\bar X}"
},
{
"do": "Divide between by within to get F.",
"why": "This is because F compares the two estimates.",
"tex": "F=\\frac{s^2_{bet}}{s^2_{wit}}"
},
{
"do": "Write both degrees of freedom.",
"why": "This is because the F table needs both.",
"tex": "\\nu_n=m-1,\\quad \\nu_d=m(n-1)"
},
{
"do": "Write the critical value with its alpha and degrees of freedom, like F0.05(2, 33), bracketing with the printed rows on either side if that row is missing.",
"why": "This is because you must report the critical value you compared against.",
"table": "Use the class F table (upper tail). Numerator degrees of freedom run across the top and denominator degrees of freedom run down the side. Lightface numbers are for 0.05 and boldface numbers are for 0.01.",
"tablePath": "sources/tables/F_table.pdf"
},
{
"do": "Compare F with the cutoff and write the full conclusion with a P range.",
"why": "This is because the conclusion must restate the null hypothesis and give P if you reject."
},
{
"do": "Stop without naming which groups differ unless asked.",
"why": "This is because the exam rules say not to isolate differences unless told to."
}
]
},
{
"title": "Read an R aov table",
"when": "The problem gives ANOVA output from R instead of raw data.",
"steps": [
{
"do": "Find the treatment row and read its Df as the numerator degrees of freedom.",
"why": "This is because it equals the number of groups minus 1."
},
{
"do": "Find the Residuals row and read its Df and Mean Sq.",
"why": "This is because these are the within degrees of freedom and the within variance."
},
{
"do": "Read the F value and Pr(>F).",
"why": "This is because they give the test result and its P value."
},
{
"do": "Keep the Residuals Mean Sq for any pairwise tests that follow.",
"why": "This is because pairwise t tests reuse it as the pooled variance."
}
]
}
]
},
{
"id": 8,
"tier": "review",
"title": "t tests for two groups and for one group",
"lead": "A t statistic divides an observed difference by the uncertainty in that difference.",
"topics": [
{
"title": "The idea of the t statistic",
"blocks": [
{
"pages": [
3,
4,
5
],
"main": "**A t statistic is the difference between two means divided by the standard error of that difference.** A big difference with small uncertainty gives a large t, so it is strong evidence. The same difference with more noise gives a smaller t.",
"end": "So t measures the difference in units of its own uncertainty."
},
{
"pages": [
6,
7,
8
],
"main": "**The variances of two independent means add, even when you subtract the means.** Both means carry their own uncertainty, so the difference carries both. When the two groups are assumed to have equal variance, you combine their sample variances into one **pooled variance**, weighted by each group's degrees of freedom."
}
]
},
{
"title": "Running the unpaired t test",
"blocks": [
{
"pages": [
9,
10,
11,
12,
13
],
"main": "**The unpaired t test compares two separate groups and uses n1 plus n2 minus 2 degrees of freedom.** It is **two-tailed** because a difference in either direction counts. The t table lists two-tail areas, so you read the column for your significance level directly.",
"sub": [
"You compare the size of t, ignoring its sign, with the table cutoff."
]
},
{
"pages": [
17,
18,
19
],
"main": "**When t is smaller than the cutoff, you do not reject the null hypothesis.** That means the data did not show a difference, not that the groups are proven equal."
}
]
},
{
"title": "The one-sample t test",
"blocks": [
{
"pages": [
20,
21,
22,
23,
24
],
"main": "**A one-sample t test compares one group's mean with a fixed reference value.** The reference value is a number from outside the sample, like a known population average. The standard error is the sample SD divided by the square root of n, and the degrees of freedom are n minus 1."
}
]
}
],
"questions": [
{
"q": "Why do you add variances when you subtract two means?",
"a": "You add them because each mean has its own random error. Subtracting one mean from the other does not cancel those errors, so the uncertainty of the difference includes both."
},
{
"q": "When do you use a one-sample t test instead of an unpaired t test?",
"a": "You use a one-sample t test when there is one group compared with a fixed number. You use an unpaired t test when there are two separate groups of subjects to compare with each other."
},
{
"q": "What does \"do not reject the null hypothesis\" mean?",
"a": "It means the data did not give enough evidence of a difference. It does not prove the groups are the same, because a small study can miss a real difference."
}
],
"memorize": [
{
"title": "Unpaired two-sample t test",
"when": "The problem gives two separate groups of subjects, each with a mean, SD and n.",
"steps": [
{
"do": "Name the test as the unpaired two-sample t test.",
"why": "This is because there are two groups of different subjects."
},
{
"do": "Write the null hypothesis in words.",
"why": "This is because it must name the outcome and the two groups."
},
{
"do": "Write each general equation before you put in the numbers.",
"why": "This is because the grading rules give credit for the equation itself, not only the answer."
},
{
"do": "Pool the two variances.",
"why": "This is because the groups are assumed to share one variance.",
"tex": "s_p^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"
},
{
"do": "Divide the difference in means by its standard error.",
"why": "This is because t measures the difference in units of uncertainty.",
"tex": "t=\\frac{\\bar x_1-\\bar x_2}{\\sqrt{s_p^2\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)}}"
},
{
"do": "Write the degrees of freedom.",
"why": "This is because the cutoff depends on them.",
"tex": "\\nu=n_1+n_2-2"
},
{
"do": "Write the two-tailed cutoff with its alpha and degrees of freedom, like t0.05(47), and compare the size of t.",
"why": "This is because a difference in either direction counts and the cutoff must be reported.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "If you reject, check 0.01 as well and write the conclusion with the P range.",
"why": "This is because the homework guidelines ask for the tightest P range you can show."
}
]
},
{
"title": "One-sample t test",
"when": "The problem compares one group with a fixed number from outside the sample.",
"steps": [
{
"do": "Name the test and write the null hypothesis about the group and the reference value.",
"why": "This is because the question compares one group with an outside number."
},
{
"do": "Write each general equation before you put in the numbers.",
"why": "This is because the grading rules give credit for the equation itself, not only the answer."
},
{
"do": "Divide the difference from the reference by the SE.",
"why": "This is because the SE is the uncertainty in the sample mean.",
"tex": "t=\\frac{\\bar x-\\mu_0}{s/\\sqrt n}"
},
{
"do": "Use n minus 1 degrees of freedom and the two-tailed table.",
"why": "This is because one mean was estimated from the data.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "Compare, decide and write the full conclusion.",
"why": "This is because the conclusion must answer the study question."
}
]
}
]
},
{
"id": 9,
"tier": "asked",
"title": "Finding which groups differ",
"lead": "After ANOVA finds a difference, pairwise t tests find which groups differ, with a correction so false positives do not pile up.",
"topics": [
{
"title": "Why plain repeated t tests are a problem",
"blocks": [
{
"pages": [
3,
4
],
"main": "**Each extra t test adds another chance of a false positive, so many tests together are too likely to find a fake difference.** With three comparisons at 0.05 each, the chance of at least one false positive is about 0.14, not 0.05.",
"end": "So the significance level of each test has to be made stricter."
},
{
"pages": [
5
],
"main": "**The pairwise t tests reuse the within-groups variance from the ANOVA.** It is the best estimate of the shared variance because it uses every group. Its degrees of freedom are also used for the cutoff, so the test is stronger than a two-group t test."
}
]
},
{
"title": "Bonferroni",
"blocks": [
{
"pages": [
6,
7,
8
],
"main": "**The Bonferroni correction divides the overall significance level by the number of comparisons.** Every pair is then tested at that same stricter level. It is simple and safe, but it can miss real differences because it is very strict."
}
]
},
{
"title": "Holm",
"blocks": [
{
"pages": [
9,
10,
11
],
"main": "**The Holm correction tests the strongest result first and loosens the level one step at a time.** You order the comparisons from the largest t to the smallest. The first is tested at the overall level divided by k, the next at the overall level divided by k minus 1, and so on.",
"sub": [
"As soon as one comparison is not significant, you stop, and that comparison and all smaller ones are called not different."
],
"end": "So Holm keeps the same overall protection as Bonferroni but finds more real differences."
},
{
"pages": [
12,
13,
14
],
"main": "**When only comparisons with a control group are wanted, k counts only those comparisons.** Fewer comparisons means a less strict level for each one."
}
]
}
],
"questions": [
{
"q": "Why does Holm find more differences than Bonferroni?",
"a": "Holm finds more differences because only its first comparison uses the strictest level. Each later comparison gets a looser level, so a moderate difference can still be significant."
},
{
"q": "What happens in Holm when one comparison is not significant?",
"a": "You stop at that comparison. That comparison and every comparison with a smaller t are called not different, even if their t values would pass a looser level."
},
{
"q": "Where do the variance and degrees of freedom for pairwise t tests come from?",
"a": "They come from the ANOVA. The variance is the within-groups variance, which R shows as the Residuals Mean Sq, and the degrees of freedom are the Residuals Df."
}
],
"memorize": [
{
"title": "Holm pairwise t tests after ANOVA",
"when": "ANOVA found a difference and you are asked which groups differ using Holm.",
"steps": [
{
"do": "Name the procedure as multiple pairwise t tests with the Holm correction.",
"why": "This is because that is the test being performed."
},
{
"do": "Write one null hypothesis joined by AND for every pair.",
"why": "This is because each pair is its own comparison."
},
{
"do": "Write each general equation before you put in the numbers.",
"why": "This is because the grading rules give credit for the equation itself, not only the answer."
},
{
"do": "Take the within-groups variance and its degrees of freedom from the ANOVA.",
"why": "This is because the pairwise tests share them.",
"tex": "s^2_{wit}\\ \\text{(Residuals Mean Sq)},\\quad \\nu\\ \\text{(Residuals Df)}"
},
{
"do": "Calculate t for every pair.",
"why": "This is because each pair needs its own statistic.",
"tex": "t_{AB}=\\frac{\\bar x_A-\\bar x_B}{\\sqrt{s^2_{wit}\\left(\\frac{1}{n_A}+\\frac{1}{n_B}\\right)}}"
},
{
"do": "Order the pairs from the largest size of t to the smallest.",
"why": "This is because Holm tests the strongest evidence first."
},
{
"do": "Give the jth pair its own significance level.",
"why": "This is because the level loosens one step at a time.",
"tex": "\\alpha_j=\\frac{\\alpha_T}{k-j+1}"
},
{
"do": "Look up each cutoff, bracketing between printed rows and columns when needed.",
"why": "This is because levels like 0.0167 are not printed in the table.",
"table": "Use the class t table (two-tailed) with the within-groups or residual degrees of freedom. A level like 0.0167 is not printed, so bracket it between the 0.01 and 0.02 columns, or use a cutoff the question gives.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "Go down the list, and stop at the first pair that is not significant.",
"why": "This is because the Holm rule ends there."
},
{
"do": "Write one conclusion naming which pairs differ and which do not, made with P less than 0.05.",
"why": "This is because the whole statement holds at the overall level."
}
]
},
{
"title": "Bonferroni pairwise t tests",
"when": "The question tells you to use the Bonferroni correction.",
"steps": [
{
"do": "Name the procedure as multiple t tests with the Bonferroni correction.",
"why": "This is because that is the test being performed."
},
{
"do": "Write one null hypothesis joined by AND for every pair.",
"why": "This is because each pair is its own comparison."
},
{
"do": "Count the comparisons and divide the overall level by that count.",
"why": "This is because every pair shares the same stricter level.",
"tex": "\\alpha=\\frac{\\alpha_T}{k},\\quad \\nu=m(n-1)=N-m"
},
{
"do": "Calculate t for each pair with the within-groups variance.",
"why": "This is because it is the shared variance estimate."
},
{
"do": "Compare every t with the one cutoff, bracketing between printed columns or using a cutoff the question gives.",
"why": "This is because Bonferroni uses one level for every pair, and levels like 0.0167 are not printed.",
"table": "Use the class t table (two-tailed) with the within-groups or residual degrees of freedom. A level like 0.0167 is not printed, so bracket it between the 0.01 and 0.02 columns, or use a cutoff the question gives.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "Write the combined conclusion and say the entire statement is made with P less than 0.05.",
"why": "This is because the answer names every pair at the overall level."
}
]
}
]
},
{
"id": 10,
"tier": "review",
"title": "Sampling distributions and clinical trials",
"lead": "A statistic changes from sample to sample, and a good trial is designed so that the change you see comes from the treatment.",
"topics": [
{
"title": "A statistic is a random variable",
"blocks": [
{
"pages": [
7,
8,
9,
10
],
"main": "**A sample mean is itself a random variable, because a different sample would give a different value.** Its distribution across many samples is the **sampling distribution**. That distribution is centered on the population mean, and its spread is the standard error.",
"end": "So inference uses the sampling distribution to judge whether an observed value is surprising."
},
{
"pages": [
11,
12,
13,
14,
15
],
"main": "**The central limit theorem says sample means are close to Normal, and closer as n grows.** This works even when the individuals come from a flat or skewed population. That is why Normal methods work for averages of fairly large samples."
}
]
},
{
"title": "Where t and F come from",
"blocks": [
{
"pages": [
16,
17
],
"main": "**When the SD is estimated from the sample, the standardized mean follows a t distribution instead of Z.** The estimate adds extra uncertainty, so t has heavier tails. With more degrees of freedom, t gets closer to Z, and with infinite degrees of freedom it is Z.",
"sub": [
"That is why the last row of the t table gives Normal cutoffs."
]
},
{
"pages": [
18,
19
],
"main": "**The F statistic also has a family of sampling distributions, one for each pair of degrees of freedom.** The table cutoff depends on both."
}
]
},
{
"title": "Designing a fair clinical trial",
"blocks": [
{
"pages": [
23,
24,
25,
32
],
"main": "**A trial states its main question before it starts and assigns treatments by randomization.** **Randomization** gives each person the same chance of each treatment, so the groups start out similar. Any difference at the end can then be put down to the treatment.",
"sub": [
"Who is enrolled, and where they are treated, decides which population the results apply to."
]
},
{
"pages": [
26,
27,
28
],
"main": "**Masking keeps people from knowing who got which treatment, so expectations cannot change the results.** In a single-masked trial the patients do not know. In a double-masked trial the clinicians do not know either. In a triple-masked trial the people analyzing the data also do not know.",
"sub": [
"A **crossover** trial gives each person both treatments in turn, so each person acts as their own control."
]
},
{
"pages": [
30,
31
],
"main": "**A sham control is a fake procedure that looks like the real one.** Patients often feel better after any procedure, so a sham is needed to show that the real procedure works better than just having a procedure."
}
]
}
],
"questions": [
{
"q": "Why does the t distribution have heavier tails than Z?",
"a": "It has heavier tails because the SD is estimated from the sample instead of known. The estimate adds extra uncertainty, so extreme values are more likely, especially with few degrees of freedom."
},
{
"q": "What does randomization protect against?",
"a": "Randomization protects against the groups starting out different. Because chance decides who gets each treatment, the groups are similar at the start, so a difference at the end can be put down to the treatment."
},
{
"q": "Why would a trial use a sham procedure?",
"a": "A trial uses a sham because patients often improve after any procedure. Comparing with a sham shows whether the real procedure helps more than simply having a procedure done."
}
],
"memorize": [
{
"title": "Pick the reference distribution",
"when": "You must decide whether a statistic follows Z, t or F.",
"steps": [
{
"do": "Ask whether the population SD is known.",
"why": "This is because a known SD gives Z and an estimated SD gives t."
},
{
"do": "For a mean with an estimated SD, use t with n minus 1 degrees of freedom.",
"why": "This is because one mean was estimated from the data."
},
{
"do": "For a ratio of two variance estimates, use F with two degrees of freedom.",
"why": "This is because F compares two variances."
},
{
"do": "For a large-sample proportion, use the infinity row of the t table.",
"why": "This is because that row is the Normal distribution.",
"table": "Use the class t table, infinity row on PDF page 2. The 0.05 column gives 1.96 and the 0.01 column gives 2.576.",
"tablePath": "sources/tables/t_table.pdf#page=2"
}
]
}
]
},
{
"id": 11,
"tier": "review",
"title": "Comparing two proportions",
"lead": "When the outcome is yes or no, groups are compared by the proportion who had the event.",
"topics": [
{
"title": "A proportion is a mean of zeros and ones",
"blocks": [
{
"pages": [
3,
5,
6,
8
],
"main": "**If each person is coded 1 for the event and 0 otherwise, the mean of those codes is the proportion with the event.** So the same mean-and-spread ideas apply. The variance of one yes-or-no outcome is p times 1 minus p, which is largest when the split is even."
}
]
},
{
"title": "The standard error of a proportion",
"blocks": [
{
"pages": [
9,
10,
11
],
"main": "**A sample proportion changes from sample to sample, and its standard error measures by how much.** The standard error is the square root of p times 1 minus p over n. Bigger samples give a smaller standard error, so the proportion is more precise."
}
]
},
{
"title": "The z test with Yates correction",
"blocks": [
{
"pages": [
13,
14,
15
],
"main": "**The z test divides the difference in proportions by its standard error, using one pooled proportion.** Under the null hypothesis both groups share the same event rate, so the two groups are combined to estimate it. The **Yates correction** subtracts a small amount from the difference, because counts jump in whole steps while the Normal curve is smooth.",
"end": "So the corrected z is a little smaller and a little more cautious."
},
{
"pages": [
18,
20,
21
],
"main": "**The cutoff for z comes from the infinity row of the t table.** At 0.05 two-tailed the cutoff is 1.96. If the size of z is bigger, the proportions differ."
}
]
}
],
"questions": [
{
"q": "Why can a proportion be treated like a mean?",
"a": "A proportion can be treated like a mean because coding yes as 1 and no as 0 makes the average of the codes equal to the proportion of yes answers. So standard errors and Normal methods work the same way."
},
{
"q": "Why is the proportion pooled in the z test?",
"a": "It is pooled because the null hypothesis says both groups have the same event rate. Combining the groups gives the best estimate of that one shared rate."
},
{
"q": "What does the Yates correction do?",
"a": "The Yates correction makes the test a little more cautious. Counts can only change in whole steps, so it subtracts a small amount from the difference before dividing by the standard error."
}
],
"memorize": [
{
"title": "z test for two proportions",
"when": "The problem gives two groups and the number of people in each who had a yes-or-no event.",
"steps": [
{
"do": "Name the z test and write the null hypothesis in words.",
"why": "This is because the data are nominal and there are two groups."
},
{
"do": "Write each general equation before you put in the numbers.",
"why": "This is because the grading rules give credit for the equation itself, not only the answer."
},
{
"do": "Calculate each group's proportion and the pooled proportion.",
"why": "This is because the null hypothesis assumes one shared rate.",
"tex": "\\hat p=\\frac{\\text{total events}}{n_1+n_2}"
},
{
"do": "Subtract the Yates correction from the size of the difference.",
"why": "This is because counts change in whole steps.",
"tex": "z=\\frac{|\\hat p_1-\\hat p_2|-\\frac12\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}{\\sqrt{\\hat p(1-\\hat p)\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}}"
},
{
"do": "Use the infinity row of the t table for the cutoff.",
"why": "This is because that row is the Normal distribution.",
"table": "Use the class t table, infinity row on PDF page 2. The 0.05 column gives 1.96 and the 0.01 column gives 2.576.",
"tablePath": "sources/tables/t_table.pdf#page=2"
},
{
"do": "Compare, decide and write the conclusion with a P range.",
"why": "This is because the answer must state what the data show."
}
]
}
]
},
{
"id": 12,
"tier": "asked",
"title": "Chi-square tests for tables of counts",
"lead": "A chi-square test compares the counts you saw with the counts you would expect if the treatment did nothing.",
"topics": [
{
"title": "Expected counts",
"blocks": [
{
"pages": [
5,
6,
7,
8
],
"main": "**Expected counts show what the table would look like if the treatment had no effect.** If every group had the same outcome rate, each group would split in the same proportion as the whole sample. So each expected count is the row total times the column total, divided by the grand total.",
"end": "That keeps every row total and column total the same as in the real table."
},
{
"pages": [
12,
13,
14
],
"main": "**The same rule works for a table of any size.** A table with three treatment groups and two outcomes needs six expected counts."
}
]
},
{
"title": "The chi-square statistic",
"blocks": [
{
"pages": [
9,
10,
11
],
"main": "**Chi-square adds up, over every cell, the squared gap between observed and expected, divided by expected.** A big total means the counts are far from what no effect predicts. The degrees of freedom are the number of rows minus 1 times the number of columns minus 1, and the table gives upper-tail cutoffs.",
"sub": [
"For a two-by-two table, the Yates correction subtracts one half from the size of each gap before squaring."
]
}
]
},
{
"title": "Which groups differ",
"blocks": [
{
"pages": [
16,
17,
18,
19,
20,
21
],
"main": "**To find which groups differ, you split the big table into two-by-two subtables and correct with Holm.** Each subtable has 1 degree of freedom and uses Yates. You order the chi-square values from largest to smallest and apply the Holm levels as with t tests."
}
]
},
{
"title": "Goodness of fit",
"blocks": [
{
"pages": [
22,
23,
24
],
"main": "**A goodness-of-fit test compares one set of counts with a set of expected proportions.** The expected counts come from the stated proportions times the total. The degrees of freedom are the number of categories minus 1."
}
]
}
],
"questions": [
{
"q": "Why is each expected count the row total times the column total over the grand total?",
"a": "It is because no effect means every group has the same outcome rate. The column total over the grand total is that shared rate, so multiplying by the group's row total gives the count that group would have."
},
{
"q": "When do you use the Yates correction for chi-square?",
"a": "You use it for a two-by-two table. It subtracts one half from the size of each observed-minus-expected gap before squaring, which makes the test a little more cautious."
},
{
"q": "How do you find which of three groups differ after a chi-square test?",
"a": "You make a two-by-two subtable for each pair and run a Yates-corrected chi-square on each. Then you apply the Holm correction, starting with the largest chi-square value."
}
],
"memorize": [
{
"title": "Chi-square test for a table",
"when": "The problem gives a table counting an outcome in two or more groups.",
"steps": [
{
"do": "Name the chi-square test and the table size.",
"why": "This is because the data are nominal counts."
},
{
"do": "Write the null hypothesis in words.",
"why": "This is because it names the outcome and the groups."
},
{
"do": "Write each general equation before you put in the numbers.",
"why": "This is because the grading rules give credit for the equation itself, not only the answer."
},
{
"do": "Add row totals, column totals and the grand total.",
"why": "This is because expected counts are built from them."
},
{
"do": "Build the full expected table.",
"why": "This is because it shows what no effect would look like.",
"tex": "E_{ij}=\\frac{R_i\\,C_j}{n}"
},
{
"do": "Add up the cell contributions, using Yates if the table is two by two.",
"why": "This is because chi-square totals the standardized gaps.",
"tex": "\\chi^2=\\sum\\frac{(O-E)^2}{E},\\quad \\chi^2_{Yates}=\\sum\\frac{\\left(|O-E|-\\tfrac12\\right)^2}{E}"
},
{
"do": "Write the degrees of freedom.",
"why": "This is because the cutoff depends on them.",
"tex": "\\nu=(r-1)(c-1)"
},
{
"do": "Start with alpha 0.05, and if you reject, check 0.01 and 0.001 and report the tightest P range.",
"why": "This is because a large chi-square means the counts do not fit no effect, and the P range should be as tight as you can show.",
"table": "Use the class chi-square table (upper tail). Read the row for the degrees of freedom and the column for alpha. For 1 degree of freedom at 0.05 the printed value is 3.841.",
"tablePath": "sources/tables/Chi_Squared_Table2.pdf"
}
]
},
{
"title": "Pairwise chi-square with Holm from R output",
"when": "You are given chisq.test results for each pair and asked which groups differ.",
"steps": [
{
"do": "Name the procedure as multiple pairwise chi-square tests with Holm.",
"why": "This is because each pair is a separate two-by-two test."
},
{
"do": "Keep only the comparisons the question asks for.",
"why": "This is because k counts only those comparisons."
},
{
"do": "Write one null hypothesis joined by AND for those comparisons.",
"why": "This is because each comparison is its own test."
},
{
"do": "Use 1 degree of freedom for every subtable.",
"why": "This is because each one is two by two."
},
{
"do": "Order the chi-square values from largest to smallest and set the Holm levels.",
"why": "This is because Holm tests the strongest result first.",
"tex": "\\alpha_j=\\frac{\\alpha_T}{k-j+1}"
},
{
"do": "For a level like 0.0167, bracket between the printed 0.01 and 0.025 columns.",
"why": "This is because that level is not printed in the table.",
"table": "Use the class chi-square table with 1 degree of freedom. A level like 0.0167 is not printed, so bracket it between the 0.01 and 0.025 columns.",
"tablePath": "sources/tables/Chi_Squared_Table2.pdf"
},
{
"do": "Go down the list and stop at the first failure.",
"why": "This is because that is the Holm stopping rule."
},
{
"do": "Write the combined conclusion with P less than 0.05.",
"why": "This is because the statement covers all the comparisons together."
}
]
},
{
"title": "Goodness of fit",
"when": "The problem compares one set of category counts with stated proportions.",
"steps": [
{
"do": "Multiply each stated proportion by the total to get expected counts.",
"why": "This is because that is what the stated proportions predict."
},
{
"do": "Add up the chi-square contributions.",
"why": "This is because the statistic is built the same way."
},
{
"do": "Use the number of categories minus 1 for the degrees of freedom.",
"why": "This is because the counts must add up to the total.",
"table": "Use the class chi-square table (upper tail). Read the row for the degrees of freedom and the column for alpha. For 1 degree of freedom at 0.05 the printed value is 3.841.",
"tablePath": "sources/tables/Chi_Squared_Table2.pdf"
}
]
}
]
},
{
"id": 13,
"tier": "asked",
"title": "How strong an association is",
"lead": "After a test shows a difference, relative risk, odds ratios and NNT describe how large it is.",
"topics": [
{
"title": "Study design decides the measure",
"blocks": [
{
"pages": [
3,
12
],
"main": "**A prospective study follows people forward from exposure, so it can measure risk directly.** A **case-control** study starts from people who already have the disease and looks back at exposure. In a case-control study the researcher chose how many cases to include, so the disease rate in the sample is not real, and only an odds ratio can be used.",
"end": "So the first decision is whether the study was prospective or retrospective."
}
]
},
{
"title": "Relative risk and absolute differences",
"blocks": [
{
"pages": [
5,
6,
7
],
"main": "**Relative risk divides the event rate in the exposed or treated group by the event rate in the comparison group.** A relative risk of 2 means the event is twice as likely. A relative risk of 1 means no difference.",
"sub": [
"The absolute difference subtracts the two rates instead, so it shows how many people out of 100 are actually affected."
]
},
{
"pages": [
8,
9,
10,
11
],
"main": "**The number needed to treat (NNT) is 1 divided by the absolute reduction in risk.** It says how many people must be treated to prevent one event. The number needed to harm (NNH) works the same way for a side effect.",
"sub": [
"A large relative reduction can still be a tiny absolute benefit when the event is rare."
]
}
]
},
{
"title": "Odds ratios",
"blocks": [
{
"pages": [
13,
14,
15,
16
],
"main": "**The odds ratio divides the odds of disease in the exposed group by the odds in the unexposed group.** Odds are the number with the event divided by the number without it. In a two-by-two table this works out to the cross product, exposed with disease times unexposed without, divided by unexposed with disease times exposed without.",
"end": "So the answer sentence says how many times greater the odds are for the exposed group."
}
]
}
],
"questions": [
{
"q": "Why can you not calculate relative risk from a case-control study?",
"a": "You cannot because the researcher chose how many people with the disease to include. That makes the disease rate in the sample artificial, so risks cannot be estimated, but the odds ratio still works."
},
{
"q": "How do you write an odds ratio for a newspaper reader?",
"a": "You write one plain sentence that names the groups and the outcome. For example, the odds of getting prostate cancer were about 1.5 times greater for men who smoke than for men who do not smoke."
},
{
"q": "What does an NNT of 50 mean?",
"a": "It means 50 people must be treated to prevent one event. It comes from 1 divided by the absolute reduction in risk, so a small absolute benefit gives a large NNT."
}
],
"memorize": [
{
"title": "Relative risk with a sentence",
"when": "The study followed people forward, and the question asks how strong the association is.",
"steps": [
{
"do": "Say the study is prospective, so relative risk can be used.",
"why": "This is because risk needs real event rates."
},
{
"do": "Label the exposed or treated row and the event column, taking the exposure from the question's wording even when it is an absence, like not taking folate.",
"why": "This is because the ratio must go the right way round."
},
{
"do": "Divide each group's event count by that group's total.",
"why": "This is because risk is a rate within a group."
},
{
"do": "Divide the exposed risk by the comparison risk.",
"why": "This is because relative risk compares the two rates.",
"tex": "RR=\\frac{n_{TD}/n_T}{n_{CD}/n_C}"
},
{
"do": "Write one plain sentence with the number, the groups and the outcome.",
"why": "This is because the answer is for a non-expert."
}
]
},
{
"title": "Odds ratio with a sentence",
"when": "The study started from people with and without the disease and looked back at exposure.",
"steps": [
{
"do": "Say the study is retrospective, so you use an odds ratio and not relative risk.",
"why": "This is because the disease rate in the sample was chosen by the researcher."
},
{
"do": "Label the four cells by exposure and disease.",
"why": "This is because the cross product needs the right cells."
},
{
"do": "Multiply exposed with disease by unexposed without, and divide by unexposed with disease times exposed without.",
"why": "This is because that is the ratio of the two odds.",
"tex": "OR=\\frac{n_{ED}\\,n_{UN}}{n_{UD}\\,n_{EN}}"
},
{
"do": "Write one plain sentence about the odds.",
"why": "This is because the answer is for a newspaper reader."
}
]
},
{
"title": "Number needed to treat",
"when": "You are asked how many people must be treated to prevent one event.",
"steps": [
{
"do": "Find each group's event rate.",
"why": "This is because NNT uses the absolute difference."
},
{
"do": "Subtract the treated rate from the control rate.",
"why": "This is because that is the absolute reduction."
},
{
"do": "Divide 1 by that reduction and round up.",
"why": "This is because you cannot treat part of a person.",
"tex": "NNT=\\frac{1}{p_C-p_T}"
}
]
},
{
"title": "Number needed to harm",
"when": "A treatment raises the rate of a side effect and the question asks how many people must be treated for one extra harm.",
"steps": [
{
"do": "Find the side-effect rate in each group.",
"why": "This is because NNH uses the absolute increase."
},
{
"do": "Subtract the control rate from the treated rate.",
"why": "This is because that is the absolute increase in harm."
},
{
"do": "Divide 1 by that increase and round up.",
"why": "This is because you cannot treat part of a person.",
"tex": "NNH=\\frac{1}{p_T-p_C}"
}
]
}
]
},
{
"id": 14,
"tier": "out",
"title": "Errors in decisions and the power of a test",
"lead": "Every test can make two kinds of mistakes, and power is the chance of catching a real effect.",
"topics": [
{
"title": "Two kinds of error",
"blocks": [
{
"pages": [
5,
6
],
"main": "**A Type I error is a false positive, and a Type II error is a missed real effect.** The significance level alpha is the chance of a Type I error when there is no effect. Beta is the chance of a Type II error when there is an effect.",
"end": "So making one error less likely usually makes the other more likely."
},
{
"pages": [
8,
9
],
"main": "**Which error matters more depends on the consequences in the real problem.** Missing a dangerous cholesterol level and wrongly worrying families have different costs."
}
]
},
{
"title": "What raises power",
"blocks": [
{
"pages": [
7,
10,
11,
13,
14
],
"main": "**Power is the chance that the test detects a real effect of a given size.** Power goes up when the effect is bigger, when the population is less variable, when the sample is larger, and when alpha is less strict.",
"sub": [
"A stricter alpha makes the cutoff farther out, so fewer real effects pass it."
]
},
{
"pages": [
16,
17,
18,
19
],
"main": "**The power chart combines the effect size and the spread into one value, phi, which is the effect divided by the SD.** You read power from the curve for your sample size. You can also go the other way and find the sample size needed for a target power like 0.8."
}
]
}
],
"questions": [
{
"q": "What is the difference between a Type I and a Type II error?",
"a": "A Type I error is saying there is an effect when there is none. A Type II error is missing an effect that is really there. Alpha is the chance of the first, and beta is the chance of the second."
},
{
"q": "Why does a larger sample increase power?",
"a": "A larger sample makes the standard error smaller. The same real difference then gives a bigger t, so it is more likely to pass the cutoff."
}
],
"memorize": [
{
"title": "Read power or sample size from the chart",
"when": "You are asked for the power of a t test or the n needed.",
"steps": [
{
"do": "Find the effect size you want to detect.",
"why": "This is because power depends on the size of the effect."
},
{
"do": "Find the SD from the pooled variance.",
"why": "This is because the effect is judged against the spread."
},
{
"do": "Divide the effect by the SD to get phi.",
"why": "This is because the chart is organized by phi.",
"tex": "\\phi=\\frac{\\delta}{\\sigma}"
},
{
"do": "Read power from the curve for your n, or find the n whose curve reaches the target power.",
"why": "This is because the chart links phi, n and power.",
"table": "Use the class power chart for the t test, posted with the statistical tables.",
"tablePath": null
}
]
}
]
},
{
"id": 17,
"tier": "m2",
"title": "Confidence intervals",
"lead": "A confidence interval gives a range of believable values for a population quantity, and it also answers the test question.",
"topics": [
{
"title": "What 95 percent confidence means",
"blocks": [
{
"pages": [
1,
3,
7
],
"main": "**A 95 percent confidence interval is built by a method that captures the true value in 95 percent of samples.** Any one interval either contains the true value or it does not. The 95 percent describes how often the method works over many samples.",
"end": "So the confidence belongs to the method, not to one particular interval."
}
]
},
{
"title": "Building an interval",
"blocks": [
{
"pages": [
2,
4,
5,
9
],
"main": "**Every interval is the estimate plus or minus a margin, and the margin is the cutoff times the standard error.** The estimate sits in the middle. The cutoff comes from the two-tailed t table for the confidence level and the degrees of freedom.",
"sub": [
"For one mean, the standard error is the SD over the square root of n with n minus 1 degrees of freedom.",
"For two means, the standard error uses the pooled variance with n1 plus n2 minus 2 degrees of freedom."
],
"end": "So a wider interval means more uncertainty, and a 99 percent interval is wider than a 95 percent one."
},
{
"pages": [
11,
13
],
"main": "**Intervals for proportions use the Normal cutoff from the infinity row of the t table.** For the difference of two proportions, the course method uses the pooled proportion inside the standard error."
}
]
},
{
"title": "Using an interval to decide",
"blocks": [
{
"pages": [
8,
15,
16
],
"main": "**If a 95 percent interval for a difference does not contain zero, the difference is significant with P less than 0.05.** Zero is the value that means no difference. When the interval leaves it out, no difference is not a believable value.",
"sub": [
"A 99 percent interval that leaves out zero gives P less than 0.01, because the wider interval is a stricter test.",
"For one proportion, the reference value is whatever the null hypothesis states, such as one half."
]
}
]
}
],
"questions": [
{
"q": "What does it mean to be 95 percent confident?",
"a": "It means the method used to build the interval captures the true value in 95 percent of samples. Any one interval either contains the true value or it does not."
},
{
"q": "How can a confidence interval tell you whether a difference is significant?",
"a": "You check whether the interval for the difference contains zero. If a 95 percent interval leaves zero out, the difference is significant with P less than 0.05, because no difference is not a believable value."
},
{
"q": "Why is a 99 percent interval wider than a 95 percent interval?",
"a": "It is wider because it must capture the true value more often. A larger cutoff is used, so the margin of error is bigger."
}
],
"memorize": [
{
"title": "Confidence interval for one mean",
"when": "One group has a mean, SD and n, and the question asks for an interval for the population mean.",
"steps": [
{
"do": "Divide the SD by the square root of n to get the standard error.",
"why": "This is because the margin is built from the uncertainty in the mean.",
"tex": "s_{\\bar x}=\\frac{s}{\\sqrt n}"
},
{
"do": "Find the two-tailed t cutoff with n minus 1 degrees of freedom.",
"why": "This is because the SD was estimated from the sample.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "Add and subtract the margin from the sample mean.",
"why": "This is because the interval is the estimate plus or minus the margin.",
"tex": "\\bar x\\pm t_c\\,\\frac{s}{\\sqrt n}"
},
{
"do": "Interpret the interval in the measurement's units.",
"why": "This is because the answer is about the population mean."
}
]
},
{
"title": "Confidence interval for a difference of two means",
"when": "The problem gives two independent groups, each with a mean, SD and n.",
"steps": [
{
"do": "Write the difference of the sample means.",
"why": "This is because it is the center of the interval."
},
{
"do": "Pool the variances and find the standard error of the difference.",
"why": "This is because the margin is built from it.",
"tex": "s_{\\bar x_1-\\bar x_2}=\\sqrt{s_p^2\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}"
},
{
"do": "Find the two-tailed t cutoff for the confidence level with n1 plus n2 minus 2 degrees of freedom.",
"why": "This is because the cutoff sets the width.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "Add and subtract the margin.",
"why": "This is because the interval is the estimate plus or minus the margin.",
"tex": "(\\bar x_1-\\bar x_2)\\pm t_c\\, s_{\\bar x_1-\\bar x_2}"
},
{
"do": "Interpret the interval in the units of the measurement.",
"why": "This is because the answer is about the population difference."
}
]
},
{
"title": "Confidence interval for one proportion",
"when": "A survey or sample gives a count with an event, and the question asks for an interval for the population proportion.",
"steps": [
{
"do": "Calculate the sample proportion.",
"why": "This is because it is the center of the interval."
},
{
"do": "Calculate the standard error from the proportion and n.",
"why": "This is because the margin is built from it.",
"tex": "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}"
},
{
"do": "Use the infinity row cutoff and add and subtract the margin.",
"why": "This is because proportions use the Normal distribution.",
"tex": "\\hat p\\pm z_c\\,s_{\\hat p}",
"table": "Use the class t table, infinity row on PDF page 2. The 0.05 column gives 1.96 and the 0.01 column gives 2.576.",
"tablePath": "sources/tables/t_table.pdf#page=2"
},
{
"do": "Check whether the null value, like one half, lies inside the interval.",
"why": "This is because that decides the matching two-sided test."
}
]
},
{
"title": "Confidence interval for a difference of two proportions",
"when": "The problem gives two groups with yes-or-no outcomes and asks for an interval for the difference.",
"steps": [
{
"do": "Calculate each group's proportion and their difference.",
"why": "This is because the difference is the center."
},
{
"do": "Calculate the pooled proportion and the standard error.",
"why": "This is because the course method pools the two groups.",
"tex": "s_{\\hat p_1-\\hat p_2}=\\sqrt{\\hat p(1-\\hat p)\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}"
},
{
"do": "Use the infinity row cutoff for the confidence level.",
"why": "This is because proportions use the Normal distribution.",
"table": "Use the class t table, infinity row on PDF page 2. The 0.05 column gives 1.96 and the 0.01 column gives 2.576.",
"tablePath": "sources/tables/t_table.pdf#page=2"
},
{
"do": "Add and subtract the margin.",
"why": "This is because the interval is the estimate plus or minus the margin.",
"tex": "(\\hat p_1-\\hat p_2)\\pm z_c\\, s_{\\hat p_1-\\hat p_2}"
},
{
"do": "Say the interval in percentage points.",
"why": "This is because a difference of proportions is measured in points."
}
]
},
{
"title": "Decide significance from intervals only",
"when": "You are asked whether a difference is significant using only the intervals.",
"steps": [
{
"do": "Look at whether the 95 percent interval contains zero.",
"why": "This is because zero means no difference."
},
{
"do": "If it leaves zero out, say the difference is significant with P less than 0.05.",
"why": "This is because no difference is outside the believable range."
},
{
"do": "Repeat with the 99 percent interval for P less than 0.01.",
"why": "This is because the wider interval is the stricter test."
},
{
"do": "For one proportion, check whether the null value, like one half, lies inside the interval.",
"why": "This is because the reference value is not always zero."
},
{
"do": "Say how you reached each conclusion.",
"why": "This is because the question asks you to explain the reasoning."
}
]
}
]
},
{
"id": 18,
"tier": "m2",
"title": "Simple linear regression and correlation",
"lead": "Regression finds the straight line that best predicts one variable from another, and it also tells you how uncertain that line is.",
"topics": [
{
"title": "The line of means",
"blocks": [
{
"pages": [
4,
5,
6
],
"main": "**In a population, the mean of the dependent variable changes along a straight line as the independent variable changes.** This line is the **line of means**. Its intercept is alpha and its slope is beta. At each value of x, the values of y are Normal around the line with the same spread, called sigma y given x.",
"sub": [
"The **independent variable** x is the one you set or know, like height. The **dependent variable** y is the one you predict, like weight."
],
"end": "So regression assumes a straight-line trend, Normal scatter and the same scatter at every x."
}
]
},
{
"title": "Fitting the best line",
"blocks": [
{
"pages": [
9,
10,
11,
13,
14,
15
],
"main": "**The regression line is the line that makes the sum of squared vertical errors as small as possible.** Each error is the gap between a measured y and the y the line predicts. Squaring the gaps keeps them positive, so the best line is the one with the smallest total.",
"sub": [
"Setting the derivatives with respect to a and b to zero gives formulas for both, built only from sums of x, y, x squared and x times y.",
"Once b is known, a is the mean of y minus b times the mean of x, so the line always passes through the point of the two means."
],
"end": "So the line y hat equals a plus b x is the sample estimate of the population line of means."
}
]
},
{
"title": "Spread around the line and uncertainty in a and b",
"blocks": [
{
"pages": [
16,
17,
18,
19
],
"main": "**The standard error of the estimate, s y given x, measures how far points usually sit from the regression line.** R calls it the **residual standard error**. It divides the sum of squared errors by n minus 2, because two numbers, a and b, were estimated from the data."
},
{
"pages": [
20
],
"main": "**The intercept and the slope each have their own standard error.** Both grow when the points scatter more around the line. The slope's standard error shrinks when the x values are more spread out, because a wide range of x pins down the slope better."
}
]
},
{
"title": "Testing the trend and building intervals",
"blocks": [
{
"pages": [
21,
22,
23
],
"main": "**To test whether there is a relationship, you test whether the population slope is zero.** A slope of zero means y does not change with x. The t statistic is the slope divided by its standard error, with n minus 2 degrees of freedom.",
"sub": [
"A confidence interval for the slope or intercept is the estimate plus or minus the t cutoff times its standard error."
]
},
{
"pages": [
24,
25
],
"main": "**An interval for the mean y at one value of x is narrower than an interval for one new observation at that x.** The interval for the mean only includes uncertainty about where the line is. The interval for one observation also includes how much single people scatter around the line, so it adds s y given x squared inside the square root.",
"sub": [
"Both intervals are narrowest at the mean of x and widen farther away, because the line is least certain at its ends."
],
"end": "So the question's wording, mean versus one observation, decides which standard error you use."
}
]
},
{
"title": "Comparing two regression lines",
"blocks": [
{
"pages": [
26,
27,
29,
30,
31,
33,
34,
36
],
"main": "**To compare two groups' lines, you test whether their slopes differ with a t test.** The t statistic is the difference in slopes divided by the standard error of that difference. The degrees of freedom are n1 plus n2 minus 4, because each line used up two.",
"sub": [
"When the group sizes differ, the two residual variances are pooled first.",
"The same kind of t test compares the two intercepts."
]
}
]
},
{
"title": "Correlation",
"blocks": [
{
"pages": [
37,
38,
39,
40
],
"main": "**The correlation coefficient r measures how strongly two variables move together on a straight line.** It runs from minus 1 to plus 1. Values near plus 1 mean they rise together, values near minus 1 mean one falls as the other rises, and values near 0 mean no straight-line relationship.",
"sub": [
"Correlation does not need one variable to depend on the other, but regression does."
]
},
{
"pages": [
41
],
"main": "**To test whether r differs from zero, you turn r into a t statistic with n minus 2 degrees of freedom.** A larger r or a larger sample gives a larger t."
}
]
}
],
"questions": [
{
"q": "What is the difference between the confidence interval for the mean at a value of x and the confidence interval for one observation?",
"a": "The interval for the mean is narrower. It only covers uncertainty about where the line of means is. The interval for one observation also covers how much single people scatter around the line, so it adds the residual variance and is wider."
},
{
"q": "Why does s y given x divide by n minus 2?",
"a": "It divides by n minus 2 because two values, the intercept and the slope, were estimated from the same data. Each estimate uses up one degree of freedom."
},
{
"q": "What null hypothesis do you test to decide whether there is a trend?",
"a": "You test whether the population slope beta is zero, which means y does not change with x. In words, there is no relationship between the two variables. You use t equal to b over its standard error with n minus 2 degrees of freedom."
},
{
"q": "How is correlation different from regression?",
"a": "Regression gives the line that predicts the dependent variable and the scatter around it. Correlation only measures how strongly the two variables move together, and it does not need one of them to depend on the other."
}
],
"memorize": [
{
"title": "Fit the line and test the slope by hand",
"when": "The problem gives x and y data or their sums, like HW3 question 2, and says not to use R.",
"steps": [
{
"do": "Name x and y and keep their units.",
"why": "This is because the slope is in y units per x unit."
},
{
"do": "Calculate the slope b from the sums.",
"why": "This is because the least-squares formula only needs these sums.",
"tex": "b=\\frac{n\\sum x_iy_i-\\sum x_i\\sum y_i}{n\\sum x_i^2-\\left(\\sum x_i\\right)^2}"
},
{
"do": "Calculate the intercept a from the two means.",
"why": "This is because the line passes through the point of the two means.",
"tex": "a=\\bar y-b\\,\\bar x"
},
{
"do": "Write the regression line.",
"why": "This is because the first question always asks for it.",
"tex": "\\hat y=a+b\\,x"
},
{
"do": "Calculate s y given x.",
"why": "This is because every standard error after this uses it.",
"tex": "s_{y|x}=\\sqrt{\\frac{n-1}{n-2}\\left(s_y^2-b^2s_x^2\\right)}"
},
{
"do": "Calculate the standard errors of a and b.",
"why": "This is because the tests and intervals for a and b need them.",
"tex": "s_a=s_{y|x}\\sqrt{\\frac1n+\\frac{\\bar x^2}{(n-1)s_x^2}},\\quad s_b=\\frac{1}{\\sqrt{n-1}}\\frac{s_{y|x}}{s_x}"
},
{
"do": "Write the null hypothesis that there is no relationship, then divide b by its standard error.",
"why": "This is because a zero slope means no trend.",
"tex": "t=\\frac{b}{s_b},\\quad \\nu=n-2"
},
{
"do": "Compare with the two-tailed t cutoff and write the conclusion with a P range.",
"why": "This is because the conclusion must say whether the trend is real.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "If intervals are asked, add and subtract the t cutoff times each standard error.",
"why": "This is because a confidence interval is the estimate plus or minus the margin.",
"tex": "b\\pm t_\\alpha(n-2)\\,s_b,\\quad a\\pm t_\\alpha(n-2)\\,s_a"
}
]
},
{
"title": "Interval for the mean versus one observation at a given x",
"when": "The question asks for a 95 percent interval at one value of x, like a dose of 18.5 mg.",
"steps": [
{
"do": "Plug x into the line to get y hat.",
"why": "This is because both intervals are centered on the predicted value."
},
{
"do": "For the mean, use the standard error of the line at that x.",
"why": "This is because only the position of the line is uncertain.",
"tex": "s_{\\hat y}=s_{y|x}\\sqrt{\\frac1n+\\frac{(x-\\bar x)^2}{(n-1)s_x^2}}"
},
{
"do": "For one observation, add 1 inside the square root.",
"why": "This is because a single person also scatters around the line.",
"tex": "s_{Y_{new}}=s_{y|x}\\sqrt{1+\\frac1n+\\frac{(x-\\bar x)^2}{(n-1)s_x^2}}"
},
{
"do": "Use the t cutoff with n minus 2 degrees of freedom and add and subtract the margin.",
"why": "This is because the interval is the estimate plus or minus the margin.",
"tex": "\\hat y\\pm t_{\\alpha}(n-2)\\,s_{\\hat y}\\ \\text{(mean)},\\quad \\hat y\\pm t_{\\alpha}(n-2)\\,s_{Y_{new}}\\ \\text{(one observation)}",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "Say which interval is wider and why.",
"why": "This is because the comparison is usually part of the question."
}
]
},
{
"title": "Correlation and its test",
"when": "The question asks for the Pearson correlation between two variables.",
"steps": [
{
"do": "Calculate r from the sums of deviations.",
"why": "This is because r compares how x and y move together with how much each one varies.",
"tex": "r=\\frac{\\sum(x-\\bar x)(y-\\bar y)}{\\sqrt{\\sum(x-\\bar x)^2\\sum(y-\\bar y)^2}}"
},
{
"do": "Turn r into a t statistic.",
"why": "This is because the t table decides whether r is far from zero.",
"tex": "t=r\\sqrt{\\frac{n-2}{1-r^2}},\\quad \\nu=n-2"
},
{
"do": "Compare with the cutoff and say how strong and in which direction the relationship is.",
"why": "This is because r has both a size and a sign.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
}
]
},
{
"title": "Compare the slopes of two groups",
"when": "Two groups each have their own regression line, like males and females.",
"steps": [
{
"do": "Fit each line and check that each slope is significant.",
"why": "This is because comparing trends only makes sense when both exist."
},
{
"do": "Write the null hypothesis that the two groups have the same slope.",
"why": "This is because the test asks whether the relationships differ.",
"tex": "H_0:\\beta_1=\\beta_2"
},
{
"do": "Find the standard error of the difference in slopes, pooling the residual variances when the group sizes differ.",
"why": "This is because the t statistic divides by it.",
"tex": "s_{b_1-b_2}=\\sqrt{s_{b_1}^2+s_{b_2}^2}\\ \\text{(equal sizes)},\\quad s^2_{y|x_p}=\\frac{(n_1-2)s^2_{y|x_1}+(n_2-2)s^2_{y|x_2}}{n_1+n_2-4},\\quad s_{b_1-b_2}=\\sqrt{\\frac{s^2_{y|x_p}}{(n_1-1)s^2_{x_1}}+\\frac{s^2_{y|x_p}}{(n_2-1)s^2_{x_2}}}"
},
{
"do": "Divide the difference in slopes by that standard error.",
"why": "This is because t measures the difference in units of its uncertainty.",
"tex": "t=\\frac{b_1-b_2}{s_{b_1-b_2}},\\quad \\nu=n_1+n_2-4"
},
{
"do": "Compare with the cutoff and conclude whether the relationships differ.",
"why": "This is because that is the question being asked.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
}
]
}
]
},
{
"id": 19,
"tier": "m2",
"title": "Multiple regression and logistic regression",
"lead": "Multiple regression predicts one outcome from several variables at once, and logistic regression predicts the chance of a yes-or-no outcome.",
"topics": [
{
"title": "Margin of error and better evidence",
"blocks": [
{
"pages": [
3
],
"main": "**The margin of error in a survey report is the t or z cutoff times the standard error.** It is the plus-or-minus part of a confidence interval for a difference in means or proportions."
},
{
"pages": [
4,
5,
6,
7,
8
],
"main": "**Medical conclusions can change when better-designed studies are done.** Observational studies suggested hormone therapy lowered mortality, but a large randomized trial found risks. Later analyses changed the advice again, which shows why the type of study matters as much as the result.",
"sub": [
"An early cell-phone study included only phone users and linked use to lower sperm motility. A later study added a control group of people who did not use cell phones."
]
}
]
},
{
"title": "The multiple regression model",
"blocks": [
{
"pages": [
14,
15,
16,
17,
18
],
"main": "**Multiple regression fits a plane, or a higher-dimensional surface, instead of a line.** Each independent variable gets its own coefficient. Each coefficient says how much y changes when that variable goes up by one and the others stay the same.",
"sub": [
"The coefficients are again found by least squares, so they make the sum of squared errors as small as possible.",
"The residual standard error divides by n minus k minus 1, because k slopes and one intercept were estimated."
]
}
]
},
{
"title": "Testing the whole model and each variable",
"blocks": [
{
"pages": [
19,
25
],
"main": "**The F test asks whether the variables together explain the outcome.** The null hypothesis says every slope is zero. The alternative says at least one slope is not zero. F is the model mean square divided by the residual mean square, with k and n minus k minus 1 degrees of freedom.",
"end": "So a significant F means the variables, considered together, are significant predictors."
},
{
"pages": [
20,
24
],
"main": "**Each coefficient also has its own t test, which asks whether that one variable matters.** The t value is the coefficient divided by its standard error, with n minus k minus 1 degrees of freedom. R prints the estimate, the standard error, the t value and the P value for each row.",
"sub": [
"R squared is the share of the total variation in y that the model explains."
]
}
]
},
{
"title": "Too simple or too complex",
"blocks": [
{
"pages": [
26
],
"main": "**Adding more variables always fits the sample a little better, but too many makes the model follow the noise.** An **overfitted** model describes this sample well and new data badly. A good model is only as complex as the data need."
}
]
},
{
"title": "Logistic regression",
"blocks": [
{
"pages": [
27,
28,
29
],
"main": "**Logistic regression predicts the probability of a yes-or-no outcome, like having coronary heart disease.** A straight line does not work, because it can go below 0 or above 1. The **logistic function** bends into an S shape, so its output always stays between 0 and 1."
},
{
"pages": [
30,
32,
33
],
"main": "**Taking the log of the odds turns the S curve into a straight line.** This is the **logit**, the log of p divided by 1 minus p. In practice the coefficients are found by maximum likelihood, which does not need grouped probabilities."
},
{
"pages": [
34,
35,
36,
37,
38
],
"main": "**A fitted logistic model gives the probability and the odds for any value of x.** You plug x into beta 0 plus beta 1 times x, then into the logistic function to get p. The odds are p divided by 1 minus p, so the odds of coronary heart disease for a 60-year-old are 3.76 to 1.",
"sub": [
"In the O-ring example, the slope on temperature is negative, so the chance of O-ring failure goes down as the launch temperature goes up."
]
}
]
}
],
"questions": [
{
"q": "What are the null and alternative hypotheses for the F test in multiple regression?",
"a": "The null hypothesis is that all the slope coefficients are zero, so none of the variables helps predict the outcome. The alternative is that at least one coefficient is not zero. A significant F means the variables together are significant predictors."
},
{
"q": "Why can the F test be significant while one variable's t test is not?",
"a": "The F test checks all the variables together, while each t test checks one variable after the others are already in the model. A variable can add little on its own once the others are included, even when the group as a whole predicts well."
},
{
"q": "Why is a straight line a bad model for the probability of disease?",
"a": "A straight line can predict probabilities below 0 or above 1, which are impossible. The logistic function always stays between 0 and 1, so it fits a probability."
},
{
"q": "How do you turn a logistic probability into odds?",
"a": "You divide the probability by 1 minus the probability. A probability of 0.79 gives odds of 0.79 divided by 0.21, which is 3.76. That means the event is 3.76 times as likely to happen as not."
}
],
"memorize": [
{
"title": "Read a multiple regression summary from R",
"when": "The problem gives lm output with several variables, like HW3 question 3.",
"steps": [
{
"do": "Write the equation from the Estimate column.",
"why": "This is because the intercept and each coefficient are listed there.",
"tex": "\\hat y=b_0+b_1x_1+b_2x_2+b_3x_3"
},
{
"do": "State the overall null hypothesis that all slopes are zero and the alternative that at least one is not.",
"why": "This is because the F test checks the model as a whole."
},
{
"do": "Read the F statistic, its two degrees of freedom and its P value.",
"why": "This is because they decide the overall test.",
"tex": "F=\\frac{MS_{mod}}{MS_{res}},\\quad df=k,\\ n-k-1",
"table": "Use the class F table (upper tail). Numerator degrees of freedom run across the top and denominator degrees of freedom run down the side. Lightface numbers are for 0.05 and boldface numbers are for 0.01.",
"tablePath": "sources/tables/F_table.pdf"
},
{
"do": "For each variable, state its null hypothesis and read its t value and Pr(>|t|).",
"why": "This is because each coefficient has its own test."
},
{
"do": "Check each 95 percent interval from confint for zero.",
"why": "This is because an interval without zero agrees with a significant t test."
},
{
"do": "Refit with only the significant variables if any were not.",
"why": "This is because the homework question asks for the final model built from the significant variables."
},
{
"do": "Plug the given values into the final equation by hand.",
"why": "This is because the prediction is just arithmetic with the coefficients."
}
]
},
{
"title": "Probability and odds from a logistic model",
"when": "The problem gives the logistic coefficients and a value of x.",
"steps": [
{
"do": "Calculate beta 0 plus beta 1 times x.",
"why": "This is because it is the exponent inside the logistic function."
},
{
"do": "Put it into the logistic function to get the probability.",
"why": "This is because the logistic function turns it into a value between 0 and 1.",
"tex": "p=\\frac{1}{1+e^{-(\\beta_0+\\beta_1x)}}"
},
{
"do": "Divide p by 1 minus p to get the odds.",
"why": "This is because odds compare happening with not happening.",
"tex": "\\text{odds}=\\frac{p}{1-p}=e^{\\beta_0}e^{\\beta_1x}"
},
{
"do": "Write the answer as a sentence, like the odds are 3.76 to 1.",
"why": "This is because the result must be understood without the formula."
}
]
}
]
},
{
"id": 20,
"tier": "m2",
"title": "Paired t test and repeated measures",
"lead": "When the same people are measured more than once, you compare each person with themselves.",
"topics": [
{
"title": "Why pairing helps",
"blocks": [
{
"pages": [
4,
5,
6
],
"main": "**When each subject gets both treatments, the differences between people no longer hide the treatment effect.** An unpaired t test on such data mixes the treatment effect with the large spread between people, so it can miss a real effect. Measuring each person twice removes that spread."
}
]
},
{
"title": "The paired t test",
"blocks": [
{
"pages": [
7,
8,
9
],
"main": "**The paired t test works on one new variable, the difference for each subject.** You average the differences, find their SD, and divide by the square root of n to get the standard error. The t statistic is the mean difference divided by that standard error, with n minus 1 degrees of freedom.",
"sub": [
"The null hypothesis is that the treatment causes no change, so the true mean difference is zero.",
"It makes the same assumptions as the unpaired test, such as Normal interval data."
],
"end": "So a paired test is really a one-sample t test on the differences."
},
{
"pages": [
10,
11,
12
],
"main": "**In the smoking and platelet example and the oral contraceptive example, each person's before and after values gave one difference.** The mean difference was large compared with its standard error, so both changes were significant."
}
]
},
{
"title": "Repeated measures with more than two conditions",
"blocks": [
{
"pages": [
13,
14,
15,
16,
17,
18
],
"main": "**Repeated measures ANOVA extends the paired idea to three or more measurements on the same subjects.** The total variation is split into variation between subjects and variation within subjects. The within-subject part is split again into the treatment effect and what is left over, the residual."
},
{
"pages": [
19
],
"main": "**Repeated measures designs need fewer subjects, because each person acts as their own control.** They also have drawbacks. Subjects must come back, and one treatment must not carry over into the next. The disease must be stable and ongoing (chronic, not acute), and there can be ethical issues. Using medical twins can avoid some of these drawbacks."
}
]
}
],
"questions": [
{
"q": "Why can an unpaired t test miss an effect that a paired t test finds?",
"a": "An unpaired t test compares the groups using the spread between different people, which is large. A paired test looks at each person's own change, so that spread drops out and a real effect is easier to see."
},
{
"q": "What are the degrees of freedom for a paired t test?",
"a": "They are n minus 1, where n is the number of subjects. This is because the test works on one difference per subject."
},
{
"q": "What is one drawback of a repeated measures design?",
"a": "One treatment can carry over and affect the next measurement. The design also needs the same subjects to return and a disease that is stable and ongoing."
}
],
"memorize": [
{
"title": "Paired t test",
"when": "The same subjects are measured under two conditions, like awake and asleep in HW3 question 4.",
"steps": [
{
"do": "Name the paired t test and say why the data are paired.",
"why": "This is because each subject was measured twice."
},
{
"do": "Write the null hypothesis that there is no change between the two conditions.",
"why": "This is because the test checks whether the mean difference is zero.",
"tex": "H_0:\\delta=0"
},
{
"do": "Subtract the two measurements for every subject.",
"why": "This is because the differences are the new variable.",
"tex": "d_i=x_{1i}-x_{2i}"
},
{
"do": "Find the mean and SD of the differences.",
"why": "This is because the t statistic is built from them.",
"tex": "\\bar d=\\frac1n\\sum d_i,\\quad s_d=\\sqrt{\\frac{\\sum(d_i-\\bar d)^2}{n-1}}"
},
{
"do": "Divide the SD by the square root of n.",
"why": "This is because that is the standard error of the mean difference.",
"tex": "s_{\\bar d}=\\frac{s_d}{\\sqrt n}"
},
{
"do": "Divide the mean difference by its standard error.",
"why": "This is because t measures the change in units of its uncertainty.",
"tex": "t=\\frac{\\bar d}{s_{\\bar d}},\\quad \\nu=n-1"
},
{
"do": "Compare with the two-tailed cutoff, check a smaller level if you reject, and write the conclusion.",
"why": "This is because you report the strongest P range you can.",
"table": "Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "If R is asked for, match the t, df, P value, interval and mean difference lines to your hand work.",
"why": "This is because the question asks you to mark each line of the output."
}
]
}
]
},
{
"id": 21,
"tier": "m2",
"title": "Repeated measures ANOVA and McNemar's test",
"lead": "Repeated measures ANOVA compares three or more measurements on the same subjects, and McNemar's test does the same job for yes-or-no outcomes measured twice.",
"topics": [
{
"title": "Splitting the variation",
"blocks": [
{
"pages": [
2,
3,
4,
5,
6
],
"main": "**Repeated measures ANOVA removes the differences between subjects, then compares the treatment effect with what is left.** You find each subject's mean, each treatment's mean and the grand mean. The within-subject sum of squares measures how each person varies around their own mean.",
"sub": [
"The treatment sum of squares is n times the squared distances of the treatment means from the grand mean, because each treatment mean uses n subjects.",
"The residual sum of squares is the within-subject sum of squares minus the treatment sum of squares."
],
"end": "So F is the treatment mean square over the residual mean square, with m minus 1 and (n minus 1)(m minus 1) degrees of freedom."
}
]
},
{
"title": "Two worked examples",
"blocks": [
{
"pages": [
7,
8
],
"main": "**In the blood pressure example, the treatment means at 4, 8 and 12 weeks were almost the same.** The treatment mean square was tiny compared with the residual mean square, so F was far below the cutoff and there was no difference over time."
},
{
"pages": [
9,
10,
11
],
"main": "**In the lung function example, almost all the within-subject variation came from the exposure conditions.** The residual mean square was very small, so F was very large and the conditions differed."
}
]
},
{
"title": "Finding which conditions differ",
"blocks": [
{
"pages": [
12
],
"main": "**After a significant repeated measures ANOVA, Holm-corrected t tests find which conditions differ.** Each t compares two treatment means using the residual mean square. The degrees of freedom for the t table are the residual degrees of freedom, (n minus 1)(m minus 1).",
"end": "So the Holm steps are the same as before, with the residual mean square in place of the within-groups variance."
}
]
},
{
"title": "McNemar's test",
"blocks": [
{
"pages": [
14,
15
],
"main": "**McNemar's test compares yes-or-no outcomes measured twice on the same people.** An ordinary chi-square test is wrong here, because the rows and columns are not independent. McNemar's test looks only at the people who changed, because people who stayed the same tell you nothing about the treatment.",
"sub": [
"If the treatment has no effect, half of the people who changed should change each way."
]
},
{
"pages": [
16,
17
],
"main": "**The expected count for each changing cell is the number who changed divided by 2.** You use the Yates correction because it is a two-by-two table, and there is 1 degree of freedom. McNemar's test can also compare two diagnostic methods on the same subjects."
}
]
}
],
"questions": [
{
"q": "Why is an ordinary chi-square test wrong for before-and-after yes-or-no data?",
"a": "It is wrong because the same people appear before and after, so the rows and columns are not independent. McNemar's test fixes this by using only the people whose result changed."
},
{
"q": "What degrees of freedom do the Holm t tests use after repeated measures ANOVA?",
"a": "They use the residual degrees of freedom, which are (n minus 1) times (m minus 1). The t statistics also use the residual mean square."
},
{
"q": "Why does repeated measures ANOVA remove the between-subject variation?",
"a": "It removes it because people differ a lot from each other regardless of treatment. Taking that out leaves a smaller residual, so a real treatment effect is easier to detect."
}
],
"memorize": [
{
"title": "Repeated measures ANOVA by hand",
"when": "The problem gives a table of n subjects each measured under m conditions.",
"steps": [
{
"do": "Name the test and write the null hypothesis that the outcome does not differ across the conditions.",
"why": "This is because the same subjects are measured under every condition."
},
{
"do": "Find each subject's mean, each treatment's mean and the grand mean.",
"why": "This is because every sum of squares is built from these means.",
"tex": "\\bar S_s=\\frac1m\\sum_t x_{ts},\\quad \\bar T_t=\\frac1n\\sum_s x_{ts}"
},
{
"do": "Add up each subject's squared distances from their own mean.",
"why": "This is because that is the within-subject variation.",
"tex": "SS_{wit\\,subjs}=\\sum_s\\sum_t (x_{ts}-\\bar S_s)^2"
},
{
"do": "Calculate the treatment sum of squares.",
"why": "This is because it measures how far the treatment means are from each other.",
"tex": "SS_{treat}=n\\sum_t(\\bar T_t-\\bar X)^2"
},
{
"do": "Subtract to get the residual sum of squares.",
"why": "This is because what is left after the treatment effect is the residual.",
"tex": "SS_{res}=SS_{wit\\,subjs}-SS_{treat}"
},
{
"do": "Divide each by its degrees of freedom and form F.",
"why": "This is because F compares the two mean squares.",
"tex": "F=\\frac{SS_{treat}/(m-1)}{SS_{res}/\\big((n-1)(m-1)\\big)}"
},
{
"do": "Compare with the F cutoff and write the conclusion with a P range.",
"why": "This is because the conclusion answers the study question.",
"table": "Use the class F table (upper tail). Numerator degrees of freedom run across the top and denominator degrees of freedom run down the side. Lightface numbers are for 0.05 and boldface numbers are for 0.01.",
"tablePath": "sources/tables/F_table.pdf"
}
]
},
{
"title": "Holm pairwise t tests after repeated measures ANOVA",
"when": "The repeated measures ANOVA was significant and you are asked which conditions differ.",
"steps": [
{
"do": "Calculate t for each pair of treatment means with the residual mean square.",
"why": "This is because the residual mean square is the shared error.",
"tex": "t=\\frac{\\bar T_i-\\bar T_j}{\\sqrt{2MS_{res}/n}}"
},
{
"do": "Use the residual degrees of freedom for the table.",
"why": "This is because the error estimate came from the residual.",
"tex": "\\nu=(n-1)(m-1)",
"table": "Use the class t table (two-tailed) with the within-groups or residual degrees of freedom. A level like 0.0167 is not printed, so bracket it between the 0.01 and 0.02 columns, or use a cutoff the question gives.",
"tablePath": "sources/tables/t_table.pdf"
},
{
"do": "Order the pairs by size of t and apply the Holm levels, stopping at the first failure.",
"why": "This is because the Holm rule is the same as before.",
"tex": "\\alpha_j=\\frac{\\alpha_T}{k-j+1}"
},
{
"do": "Write one combined conclusion with P less than 0.05.",
"why": "This is because the statement covers every pair."
}
]
},
{
"title": "McNemar's test",
"when": "A yes-or-no outcome is measured twice on the same people, or two tests are run on the same people.",
"steps": [
{
"do": "Set up the before-by-after table and find the two cells where people changed.",
"why": "This is because only those people carry information about the treatment."
},
{
"do": "Write the null hypothesis that changing one way is as likely as changing the other way.",
"why": "This is because no effect means equal change in both directions."
},
{
"do": "Divide the number who changed by 2 to get the expected count.",
"why": "This is because half should change each way under no effect.",
"tex": "E=\\frac{b+c}{2}"
},
{
"do": "Calculate chi-square with the Yates correction on the two changing cells.",
"why": "This is because it is a two-by-two table.",
"tex": "\\chi^2=\\frac{(|b-E|-\\frac12)^2}{E}+\\frac{(|c-E|-\\frac12)^2}{E},\\quad \\nu=1"
},
{
"do": "Compare with the chi-square cutoff for 1 degree of freedom and write the conclusion.",
"why": "This is because the decision follows the usual rule.",
"table": "Use the class chi-square table (upper tail). Read the row for the degrees of freedom and the column for alpha. For 1 degree of freedom at 0.05 the printed value is 3.841.",
"tablePath": "sources/tables/Chi_Squared_Table2.pdf"
}
]
}
]
},
{
"id": 22,
"tier": "m2b",
"title": "Machine learning · clustering and classification",
"lead": "Clustering finds groups in data that have no labels, and classification puts a new object into groups that are already labeled.",
"topics": [
{
"title": "What machine learning does",
"blocks": [
{
"pages": [
3,
4,
5
],
"main": "**Machine learning finds patterns in data automatically and uses them to make predictions.** In **supervised learning**, the computer learns from past data with known answers. In **unsupervised learning**, it learns from data without answers."
}
]
},
{
"title": "Clustering versus classification",
"blocks": [
{
"pages": [
6,
7,
8,
9
],
"main": "**Clustering groups data so that members of a group are similar and different groups are not.** Nobody tells the algorithm what the groups are, so it is unsupervised. The groups can then reveal relationships nobody noticed before."
},
{
"pages": [
10,
11,
12,
13
],
"main": "**Classification assigns a new object to one of several groups that are already defined.** It learns from labeled examples, so it is supervised. A new object goes to the group of the examples it is most similar to."
}
]
},
{
"title": "Measuring distance",
"blocks": [
{
"pages": [
15,
16
],
"main": "**Similarity is measured as distance between points, so a small distance means similar and a large distance means different.** The **Euclidean distance** is the square root of the sum of squared differences in each feature. The Manhattan distance adds the absolute differences instead. The Minkowski distance is the general form that includes both."
}
]
},
{
"title": "k-means clustering",
"blocks": [
{
"pages": [
17,
18,
19,
20,
21
],
"main": "**k-means splits the data into k clusters by repeating two steps until nothing changes.** First, each point is assigned to its nearest centroid. Second, each centroid is moved to the mean of the points assigned to it. The number of clusters k is chosen before starting, and the starting centroids are k points picked at random from the data.",
"end": "So each iteration is an assign step followed by an update step."
},
{
"pages": [
22,
23,
24,
25,
26
],
"main": "**In the medicine example with two features, one medicine switched clusters in the second iteration.** After the first iteration, medicine 1 was alone in one cluster and medicines 2, 3 and 4 were in the other. In the second iteration, medicine 2 was closer to the first centroid, so it moved. That left medicines 1 and 2 in one cluster and medicines 3 and 4 in the other."
}
]
},
{
"title": "Choosing k and the limits of k-means",
"blocks": [
{
"pages": [
32
],
"main": "**More clusters always lower the within-cluster sum of squares, so you look for the point where adding clusters stops helping much.** Too few clusters mix different groups, and too many split real groups apart."
},
{
"pages": [
33
],
"main": "**k-means has limits that come from how it works.** You must choose k ahead of time. The result can depend on the starting centroids. Every feature counts equally, and extreme points can distort the distances. It works poorly when the groups are not compact blob shapes (hyperellipsoids), such as rings. It is also not practical for very large data sets."
}
]
},
{
"title": "K-nearest neighbors classification",
"blocks": [
{
"pages": [
34,
35,
36,
37,
38
],
"main": "**K-nearest neighbors (K-NN) classifies a new object by looking at the K labeled examples closest to it.** The new object joins the class that is most common among those K neighbors. The share of neighbors in each class gives a probability for that class.",
"sub": [
"K here means the number of neighbors, which is different from the k in k-means.",
"If K is 1, the object copies its single nearest neighbor. If K is the whole training set, it always joins the biggest class."
]
},
{
"pages": [
39
],
"main": "**Features are scaled before K-NN so that one large-scale feature does not dominate the distance.** Min-max scaling squeezes each feature into the range 0 to 1. Z-score scaling subtracts the mean and divides by the SD."
},
{
"pages": [
40,
41,
42
],
"main": "**In the surgical mesh example, the new mesh's three nearest vendors were mostly Fail, so it was classified as Fail.** Two of its three neighbors failed, so the probability of failing was two thirds."
}
]
}
],
"questions": [
{
"q": "What is the difference between clustering and classification?",
"a": "Clustering finds groups in data without any labels, so it is unsupervised. Classification puts a new object into groups that are already labeled, so it is supervised."
},
{
"q": "What are the two steps that k-means repeats?",
"a": "First, it assigns each point to its nearest centroid. Second, it moves each centroid to the mean of its assigned points. It repeats until the assignments stop changing."
},
{
"q": "Why are features scaled before K-NN?",
"a": "Features are scaled because a feature with large numbers would dominate the distance. Scaling puts every feature on a similar range, so each one counts fairly."
},
{
"q": "What does the K in K-NN mean, and is it the same as the k in k-means?",
"a": "In K-NN, K is the number of nearest neighbors used to vote. It is not the same as the k in k-means, which is the number of clusters."
}
],
"memorize": [
{
"title": "One iteration of k-means by hand",
"when": "The problem gives a small table of points, k and starting centroids, like the Session 22 exercise.",
"steps": [
{
"do": "Write the starting centroids.",
"why": "This is because every distance is measured from them."
},
{
"do": "Calculate the Euclidean distance from every point to every centroid.",
"why": "This is because points join the closest centroid.",
"tex": "d(q,r)=\\sqrt{\\sum_i (q_i-r_i)^2}"
},
{
"do": "Assign each point to the centroid with the smaller distance.",
"why": "This is because that is the assign step."
},
{
"do": "Move each centroid to the mean of its assigned points, feature by feature.",
"why": "This is because that is the update step.",
"tex": "c_j=\\frac{1}{n_j}\\sum_{i:\\,y_i=j} x_i"
},
{
"do": "Report each point's cluster label and the new centroids.",
"why": "This is because the question asks for both."
}
]
},
{
"title": "Classify a new object with K-NN",
"when": "The problem gives labeled examples, a new object and a value of K.",
"steps": [
{
"do": "Scale the features if they are on very different scales.",
"why": "This is because a large-scale feature would dominate the distance."
},
{
"do": "Calculate the distance from the new object to every labeled example.",
"why": "This is because K-NN uses the closest examples."
},
{
"do": "Rank the distances and pick the K smallest.",
"why": "This is because those are the K nearest neighbors."
},
{
"do": "Count the classes among those neighbors and assign the most common one.",
"why": "This is because K-NN assigns the plurality class."
},
{
"do": "Give the probability as the share of neighbors in that class.",
"why": "This is because the question often asks how sure the classification is."
}
]
}
]
}
]
};
