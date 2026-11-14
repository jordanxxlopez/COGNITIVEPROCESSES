"""Plain-concept study content for BME423 (Version E and Order to memorize).

Written to Jordan's study-writing rules (ling285/authoring/STYLE-GUIDE.md):
answer first, one idea per sentence, cause and effect spelled out with so/because,
real terms in bold with a plain gloss, no lecture/slide/professor mentions,
no colons/semicolons/dashes/equals signs in prose, few numbers.

Each lecture has
  topics: blocks (ref pages, bold opening sentence, sub sentences, closing sentence)
          and questions with answers
  memorize: problem types, each with the steps in the order to write them.
            Every step has a short action sentence, a "This is because" reason,
            and an optional formula shown only in the formula version.
"""

TIERS = {
    "asked": "Asked on Exam 1",
    "review": "On the review and homework",
    "out": "Not on the midterm",
    "m2": "Module II · Homework 3",
}

LECTURES = [
# ---------------------------------------------------------------- Session 2
{
"id": 2, "tier": "review",
"title": "Describing data with a few numbers",
"lead": "A sample is used to learn about a population, so the first job is to summarize the sample and know what kind of data it is.",
"topics": [
 {"title": "Population values and sample estimates", "blocks": [
  {"pages": [3, 7],
   "main": "**A population is the whole group you care about, and a sample is the smaller group you actually measure.** The population mean and standard deviation are fixed values that are usually unknown. The sample mean and sample standard deviation are calculated from the measured people, so they estimate those population values.",
   "sub": ["The **standard deviation** (SD) describes how far individual measurements usually sit from the mean.",
           "The sample variance divides by n minus 1 instead of n, because the sample mean sits a little too close to its own data and would make the spread look too small."],
   "end": "So every summary you calculate from a sample is an estimate of a population value."},
  {"pages": [4, 5, 6],
   "main": "**A Normal population is symmetric and bell shaped, so its mean and median sit at the same place.** About two thirds of the values fall within one SD of the mean, and about 95 percent fall within two SDs.",
   "sub": ["A **skewed** distribution has one long tail, so the mean is pulled toward that tail and no longer matches the median."],
   "end": "That is why the shape of the data decides whether the mean or the median is the better center."}]},
 {"title": "Median, quartiles and percentiles", "blocks": [
  {"pages": [8, 9, 10],
   "main": "**A percentile is the value below which a given percent of the ordered data falls.** The median is the 50th percentile, and the quartiles are the 25th and 75th percentiles. To find one, sort the data first, because positions only make sense in order.",
   "sub": ["The position of the pth percentile is 1 plus p times (n minus 1), divided by 100.",
           "When the position lands between two observations, the percentile is placed between those two values by the same fraction."],
   "end": "So a percentile always comes from a position in the sorted list, not from the raw order the data arrived in."},
  {"pages": [11, 12, 13],
   "main": "**A box plot shows the median and the middle half of the data, and a violin plot also shows the shape.** The box runs from the 25th to the 75th percentile, so its length is the **interquartile range** (the spread of the middle half). A violin plot is wider where values are common, so it shows where the data bunch up."}]},
 {"title": "Why averages vary less than individuals", "blocks": [
  {"pages": [15, 16, 17, 18, 19],
   "main": "**Means of samples vary less than single measurements, because high and low values cancel out inside each average.** If many samples of ten were taken, their means would form their own distribution centered on the population mean. The spread of that distribution is the **standard error** of the mean (SE, the SD of sample means).",
   "sub": ["The standard error equals the SD divided by the square root of the sample size, so larger samples give more precise means.",
           "The **central limit theorem** says that these sample means are close to Normal even when the individual values are not."],
   "end": "So the SD describes people, and the SE describes how much the mean would change from sample to sample."}]},
 {"title": "Kinds of data", "blocks": [
  {"pages": [20, 21, 25],
   "main": "**The kind of data decides which method you can use, so classify the variable before anything else.** **Interval** data are numbers with equal steps, and they are continuous (any value, like blood pressure) or discrete (counts, like tender joints). **Categorical** data are groups, and they are nominal (no order, like zip code) or ordinal (ordered, like an Apgar score).",
   "end": "So the first question for any problem is what was recorded for each subject."}]}],
"questions": [
 {"q": "What is the difference between the standard deviation and the standard error?",
  "a": "The standard deviation describes how spread out the individual measurements are. The standard error describes how much the sample mean would change from one sample to another. The SE is the SD divided by the square root of n, so it shrinks as the sample gets bigger while the SD does not."},
 {"q": "Why does the sample variance divide by n minus 1?",
  "a": "It divides by n minus 1 because the deviations are measured from the sample mean, which is calculated from the same data. The sample mean sits closer to its own data than the true mean does, so dividing by n would make the spread look too small. Dividing by n minus 1 corrects that."},
 {"q": "Is an Apgar score interval or categorical data?",
  "a": "An Apgar score is categorical ordinal data. The scores have an order, but the steps between them are not equal measured amounts, so they are ordered categories rather than interval numbers."}],
"memorize": [
 {"title": "Find a percentile in a small sample", "when": "You get a short list of measurements and are asked for a percentile, the median or a quartile.",
  "steps": [
   {"do": "Sort the data from smallest to largest.", "why": "This is because a percentile is a position in the ordered list."},
   {"do": "Find the position of the percentile.", "why": "This is because the position tells you which value, or which pair of values, to use.", "tex": "\\text{position}=1+\\frac{p(n-1)}{100}"},
   {"do": "If the position is a whole number, read that value directly.", "why": "This is because the percentile then sits exactly on one observation."},
   {"do": "If the position falls between two values, move from the lower value toward the higher one by the leftover fraction.", "why": "This is because the percentile sits partway between those two observations.", "tex": "x_{(k)}+f\\,\\big(x_{(k+1)}-x_{(k)}\\big)"},
   {"do": "Write the answer with its units.", "why": "This is because a percentile is a measurement, not a percent."}]},
 {"title": "Standard error from one sample", "when": "The question asks how precise a sample mean is.",
  "steps": [
   {"do": "Calculate the sample mean and the sample SD.", "why": "This is because the SE is built from the SD.", "tex": "s=\\sqrt{\\frac{\\sum (x_i-\\bar x)^2}{n-1}}"},
   {"do": "Divide the SD by the square root of the sample size.", "why": "This is because averaging n values shrinks the spread of the mean by that amount.", "tex": "s_{\\bar x}=\\frac{s}{\\sqrt n}"},
   {"do": "Say that the SE describes the mean, not individual people.", "why": "This is because that is the difference most questions are checking."}]}]},
# ---------------------------------------------------------------- Session 3
{
"id": 3, "tier": "asked",
"title": "Discrete random variables",
"lead": "A discrete random variable takes separate values, and each value has its own probability.",
"topics": [
 {"title": "What a random variable is", "blocks": [
  {"pages": [5, 6, 8, 9, 11],
   "main": "**A random variable turns each outcome of an experiment into a number.** The **sample space** is the list of every possible outcome. When a coin is coded as 1 for heads and 0 for tails, the outcome becomes a number you can add and average.",
   "sub": ["A **discrete** random variable has separate values you can list, like the number of heads in three tosses."],
   "end": "So a random variable lets you do arithmetic with chance outcomes."},
  {"pages": [13, 14, 15, 16],
   "main": "**Independent events do not change each other's chances, so their probabilities multiply.** After a run of heads, the next toss is still one half, because the coin has no memory. When an earlier event does change the next chance, you multiply by the **conditional probability** instead."}]},
 {"title": "The probability function and its rules", "blocks": [
  {"pages": [17, 20, 22, 23],
   "main": "**The probability function, written f of y, gives the chance of each exact value.** Every probability must be between 0 and 1, and all of them must add up to exactly 1. A function that breaks either rule cannot be a probability function.",
   "sub": ["The function must be defined for every value of y, so you always finish it with \"0 elsewhere\"."],
   "end": "So checking a probability function means checking the range of each value and the total."}]},
 {"title": "The cumulative distribution function", "blocks": [
  {"pages": [24, 25],
   "main": "**The cumulative distribution function, F of y, adds up all the probability at or below y.** Its graph is a staircase. It is flat between the possible values and jumps up at each one. The size of each jump is the probability of that exact value.",
   "sub": ["The filled dot at a jump shows that F includes the value itself, because F means less than or equal to.",
           "F starts at 0 on the far left and ends at 1 on the far right."],
   "end": "That is why you can rebuild the probability function by reading the jump sizes."}]},
 {"title": "Expected value and variance", "blocks": [
  {"pages": [26, 27, 28, 29],
   "main": "**The expected value is a weighted average, where each value is weighted by its probability.** It is the long-run average if the experiment were repeated many times. It does not have to be a value the variable can actually take.",
   "sub": ["The **variance** is the weighted average of the squared distances from the expected value, so it measures spread."],
   "end": "So both the mean and the variance come from multiplying by the probabilities and adding."},
  {"pages": [30, 31],
   "main": "**In a game, the expected earnings include the losing outcomes as negative numbers.** Roulette has an expected value below zero, so a player loses money on average over many bets."}]}],
"questions": [
 {"q": "How do you write the probability function from a graph of the CDF?",
  "a": "Each jump in the CDF graph sits at a possible value, and the height of the jump is the probability of that value. So you list each jump location with its jump size, and you finish with 0 elsewhere. The probabilities should add up to 1."},
 {"q": "Why is the probability that Y is greater than a equal to 1 minus F of a?",
  "a": "F of a is the probability that Y is less than or equal to a. Being greater than a is everything else, so its probability is 1 minus F of a."},
 {"q": "Can the expected value be a value the variable can never take?",
  "a": "Yes, the expected value can be a value the variable never takes. This is because it is a weighted average of all the values, like 3.5 for a fair die, and an average can fall between possible outcomes."}],
"memorize": [
 {"title": "Turn a CDF graph into a probability function", "when": "You see a staircase graph of F of y and must write f of y for all values.",
  "steps": [
   {"do": "Find every place where the staircase jumps.", "why": "This is because the variable can only take the values where F jumps."},
   {"do": "Measure each jump as the upper height minus the lower height.", "why": "This is because the jump size is the probability of that exact value.", "tex": "f(y_k)=F(y_k)-F(y_{k-1})"},
   {"do": "Write each value with its probability in a piecewise function.", "why": "This is because the question asks you to define f of y completely."},
   {"do": "Finish with 0 elsewhere.", "why": "This is because every other value has no probability."},
   {"do": "Check that the probabilities add up to 1.", "why": "This is because a valid probability function always totals 1."}]},
 {"title": "Read a probability from the CDF", "when": "You are asked for a chance like Y greater than a value, or Y between two values.",
  "steps": [
   {"do": "Rewrite the question using less than or equal to.", "why": "This is because F only gives less than or equal to probabilities."},
   {"do": "For a right tail, subtract F at the cutoff from 1.", "why": "This is because the right tail is everything F does not include.", "tex": "P(Y>a)=1-F(a)"},
   {"do": "For an interval, subtract F at the lower end from F at the upper end.", "why": "This is because that leaves only the probability between the two ends.", "tex": "P(a<Y\\le b)=F(b)-F(a)"},
   {"do": "Check whether each endpoint is included.", "why": "This is because a discrete variable can sit exactly on an endpoint, and strict or not strict changes the answer."}]},
 {"title": "Expected value and variance of a discrete variable", "when": "You have a table or function of values and probabilities.",
  "steps": [
   {"do": "List each value next to its probability.", "why": "This is because every calculation pairs a value with its weight."},
   {"do": "Multiply each value by its probability and add.", "why": "This is because the expected value is a weighted average.", "tex": "E[X]=\\sum x\\,f(x)"},
   {"do": "Square each distance from the mean, multiply by its probability, and add.", "why": "This is because variance is the weighted average squared distance.", "tex": "\\operatorname{Var}(X)=\\sum (x-\\mu)^2 f(x)"},
   {"do": "Take the square root if the SD is asked.", "why": "This is because the SD puts the spread back in the original units."}]}]},
# ---------------------------------------------------------------- Session 4
{
"id": 4, "tier": "asked",
"title": "Continuous random variables",
"lead": "A continuous variable can take any value in a range, so probability is measured as area under a curve.",
"topics": [
 {"title": "Density and area", "blocks": [
  {"pages": [5, 6, 7],
   "main": "**For a continuous variable, probability is the area under the density curve.** The density, written f of x, is not itself a probability. The chance of landing between two values is the area under f between them, and the total area must be 1.",
   "sub": ["The chance of one exact value is zero, because a single point has no width and so no area.",
           "That is why less than and less than or equal to give the same answer for a continuous variable."],
   "end": "So every continuous probability question is an area question."}]},
 {"title": "Building the CDF piece by piece", "blocks": [
  {"pages": [10, 11, 12, 13],
   "main": "**The CDF of a continuous variable adds up the area from the far left up to x.** When the density has separate pieces, the CDF has matching pieces. Below the range the CDF is 0. Inside the range it is the area so far. Above the range it is 1.",
   "sub": ["Inside a piece, you add the area already collected before that piece to the integral from the start of the piece up to x.",
           "The pieces must join without gaps, because area cannot suddenly appear or disappear."],
   "end": "So the CDF climbs smoothly from 0 to 1 and then stays at 1."},
  {"pages": [14],
   "main": "**Left tails, right tails and intervals all come from the CDF.** A left tail is F at the cutoff. A right tail is 1 minus F at the cutoff. An interval is F at the upper end minus F at the lower end."}]},
 {"title": "Expected value of a continuous variable", "blocks": [
  {"pages": [15, 16, 17, 18, 19],
   "main": "**The expected value of a continuous variable is the integral of x times the density.** It plays the same role as the weighted sum for a discrete variable, with area replacing the list of probabilities. For a Uniform variable, the mean is the midpoint because the density is flat.",
   "sub": ["If every value is rescaled by a and shifted by b, the mean is rescaled and shifted the same way.",
           "A shift does not change the variance, but rescaling by a multiplies the variance by a squared."],
   "end": "So you can often find a new mean from an old one without integrating again."}]}],
"questions": [
 {"q": "Why is the probability of one exact value zero for a continuous variable?",
  "a": "The probability of one exact value is zero because probability is area under the density. A single point has no width, so the area above it is zero."},
 {"q": "What must be true for a function to be a valid density?",
  "a": "The function must never be negative, and its total area must equal 1. If a constant is unknown, you set the total area equal to 1 and solve for it."},
 {"q": "What does the CDF look like above the largest possible value?",
  "a": "The CDF equals 1 above the largest possible value and stays there. This is because all of the area has already been collected, so nothing is left to add."}],
"memorize": [
 {"title": "Write the full CDF from a piecewise density", "when": "You are given f of x in pieces and asked for F of x for all x.",
  "steps": [
   {"do": "Write the definition of F as the integral of f from the far left up to x.", "why": "This is because the CDF is accumulated area.", "tex": "F(x)=\\int_{-\\infty}^{x} f(u)\\,du"},
   {"do": "Below the range, write F as 0.", "why": "This is because no area has been collected yet."},
   {"do": "Inside the range, add the area so far to the integral from the start of the piece up to x.", "why": "This is because each piece builds on the area before it.", "tex": "F(x)=F(a)+\\int_{a}^{x} f(u)\\,du"},
   {"do": "Above the range, write F as 1.", "why": "This is because all the area has been collected."},
   {"do": "Check that the pieces meet at each boundary.", "why": "This is because the CDF of a continuous variable has no jumps."}]},
 {"title": "Expected value from a density", "when": "You are asked for E of X when X is continuous.",
  "steps": [
   {"do": "Write E of X as the integral of x times f of x.", "why": "This is because every value is weighted by its density.", "tex": "E[X]=\\int_{-\\infty}^{\\infty} x\\,f(x)\\,dx"},
   {"do": "Keep only the range where f is not zero.", "why": "This is because the pieces with zero density add nothing."},
   {"do": "Integrate and plug in the upper bound minus the lower bound.", "why": "This is because a definite integral is the difference between the two ends."}]},
 {"title": "Find an unknown constant in a density", "when": "The density contains a letter like c that you must find.",
  "steps": [
   {"do": "Set the total area under f equal to 1.", "why": "This is because every valid density has total area 1.", "tex": "\\int f(x)\\,dx=1"},
   {"do": "Integrate and solve for the constant.", "why": "This is because that is the only value that makes the total come out to 1."},
   {"do": "Keep only the solution that makes sense.", "why": "This is because a range endpoint or density value cannot be negative."}]}]},
# ---------------------------------------------------------------- Session 5
{
"id": 5, "tier": "asked",
"title": "Normal probabilities and percentiles",
"lead": "Every Normal question is turned into the standard Normal so that one table can answer it.",
"topics": [
 {"title": "The standard Normal and its table", "blocks": [
  {"pages": [6, 7, 8],
   "main": "**The standard Normal, written Z, has mean 0 and SD 1, and its table gives the area to the left of z.** A right tail is 1 minus that left area. An interval is the left area at the upper end minus the left area at the lower end.",
   "sub": ["Because the curve is symmetric, the area to the left of negative z equals the area to the right of positive z."],
   "end": "So drawing the area first tells you which subtraction to do."}]},
 {"title": "Standardizing any Normal measurement", "blocks": [
  {"pages": [10, 11, 12],
   "main": "**Standardizing turns a measurement into the number of SDs it sits from the mean.** You subtract the mean and divide by the SD. The probability stays the same, because the whole curve is just shifted and stretched.",
   "end": "So a question about any Normal variable becomes a question about Z."},
  {"pages": [9],
   "main": "**A quantile reverses the question, because it starts from an area and asks for the value.** You find the z with that left area in the table, then turn it back into the original units by multiplying by the SD and adding the mean."}]},
 {"title": "Probabilities for a sample mean", "blocks": [
  {"pages": [14],
   "main": "**A question about the average of a sample uses the standard error instead of the SD.** The sample mean is Normal with the same mean as the population, but its SD is the population SD divided by the square root of n. So the same value is many more SEs from the mean than SDs, and the probabilities change a lot.",
   "end": "That is why you must check whether the question is about one person or about an average."}]},
 {"title": "Checking whether data look Normal", "blocks": [
  {"pages": [15, 16, 17],
   "main": "**A Normal quantile plot should look like a straight line when the data are Normal.** Each sorted value is plotted against where it would fall on a Normal curve. Curves or bends at the ends mean skewness or heavy tails."}]}],
"questions": [
 {"q": "Why do you standardize before using the table?",
  "a": "You standardize because the table only describes the standard Normal. Subtracting the mean and dividing by the SD turns any Normal value into a z value, and the probability stays the same."},
 {"q": "How does a question about the mean of 16 people differ from a question about one person?",
  "a": "For the mean of 16 people you divide the SD by the square root of 16 first. This is because averages vary less than single people. The smaller spread puts the same cutoff more SEs away, so the probability changes."},
 {"q": "What does a bend at the end of a Normal quantile plot tell you?",
  "a": "A bend at the end tells you the data are not Normal in that tail. The extreme values are farther out or closer in than a Normal curve would put them, so the data are skewed or have heavy tails."}],
"memorize": [
 {"title": "Normal probability for one measurement", "when": "A variable is Normal with a given mean and SD, and you want a probability.",
  "steps": [
   {"do": "Write the variable as Normal with its mean and SD.", "why": "This is because it names the numbers you will use."},
   {"do": "Standardize each cutoff.", "why": "This is because the table only works for Z.", "tex": "z=\\frac{x-\\mu}{\\sigma}"},
   {"do": "Sketch the area you want.", "why": "This is because the sketch tells you whether to use the left area, 1 minus it, or a difference."},
   {"do": "Look up each left area in the table and combine them.", "why": "This is because the table gives only left areas.", "tex": "P(a<X<b)=\\Phi(z_b)-\\Phi(z_a)"},
   {"do": "State the probability in words about the original variable.", "why": "This is because the question is about the measurement, not about Z."}]},
 {"title": "Normal probability for a sample mean", "when": "The question asks about the average of a sample of n people.",
  "steps": [
   {"do": "Name the sample mean as a new Normal variable with the same mean.", "why": "This is because averages center on the population mean."},
   {"do": "Divide the SD by the square root of n.", "why": "This is because averages vary less than individuals.", "tex": "\\sigma_{\\bar X}=\\frac{\\sigma}{\\sqrt n}"},
   {"do": "Standardize using the SE, not the SD.", "why": "This is because the SE is the spread of the mean.", "tex": "z=\\frac{\\bar x-\\mu}{\\sigma/\\sqrt n}"},
   {"do": "Use the table and combine the areas as before.", "why": "This is because the rest of the method does not change."}]},
 {"title": "Normal percentile", "when": "You are given an area and asked for the value that cuts it off.",
  "steps": [
   {"do": "Turn the request into a left area.", "why": "This is because the table is organized by left area."},
   {"do": "Find the z with that left area.", "why": "This is because z is the position on the standard scale."},
   {"do": "Convert back to the original units.", "why": "This is because the answer must be a measurement.", "tex": "x=\\mu+z\\,\\sigma"}]}]},
# ---------------------------------------------------------------- Session 6
{
"id": 6, "tier": "asked",
"title": "The idea behind ANOVA",
"lead": "ANOVA asks whether several group means differ by comparing two estimates of the same variance.",
"topics": [
 {"title": "The question ANOVA answers", "blocks": [
  {"pages": [3, 4, 5],
   "main": "**ANOVA (analysis of variance) tests whether three or more group means differ.** The **null hypothesis** says that the treatment has no effect, so all the groups are samples from one population. Even then, the sample means would differ a little because of random sampling.",
   "end": "So the question is whether the means differ more than random sampling alone would explain."}]},
 {"title": "Two estimates of the same variance", "blocks": [
  {"pages": [9, 10],
   "main": "**The within-groups variance estimates the population variance from the spread inside each group.** Treatment cannot change the spread inside a group, so this estimate stays honest whether or not the treatment works. With equal group sizes, it is the average of the group variances."},
  {"pages": [6, 8, 11, 12],
   "main": "**The between-groups variance estimates the same population variance from how spread out the group means are.** The means vary less than individuals by a factor of n, so the variance of the means is multiplied by n to get back to the scale of individuals.",
   "sub": ["If the treatment works, the means spread apart, so this estimate gets too big."],
   "end": "So under the null hypothesis both estimates should be about the same size."}]},
 {"title": "The F ratio", "blocks": [
  {"pages": [13, 14],
   "main": "**The F ratio divides the between-groups estimate by the within-groups estimate.** When the null hypothesis is true, F is near 1. When the means really differ, the top grows, so F gets large. If F is bigger than the cutoff in the F table, you reject the null hypothesis.",
   "sub": ["F has two degrees of freedom, one for the top and one for the bottom. The top uses the number of groups minus 1. The bottom uses the number of groups times one less than the group size."]},
  {"pages": [16, 17, 18],
   "main": "**In the cell-phone and sperm-motility example, F was compared with the table cutoff to decide whether motility differed among groups.** The same steps work for any balanced design."}]}],
"questions": [
 {"q": "Why is the within-groups variance not affected by the treatment?",
  "a": "The within-groups variance is not affected because it only looks at spread inside each group. Everyone in a group got the same treatment, so the treatment cannot make them spread out more."},
 {"q": "Why is the variance of the means multiplied by n?",
  "a": "It is multiplied by n because means vary less than individuals. The variance of a mean is the population variance divided by n, so multiplying by n puts it back on the scale of individuals."},
 {"q": "What does an F near 1 tell you?",
  "a": "An F near 1 tells you the group means differ about as much as random sampling would cause. The two variance estimates agree, so there is no evidence of a treatment effect."}],
"memorize": []},
# ---------------------------------------------------------------- Session 7
{
"id": 7, "tier": "asked",
"title": "Doing ANOVA from start to finish",
"lead": "A balanced ANOVA can be done from each group's mean and SD, and the same numbers appear in R output.",
"topics": [
 {"title": "Setting up the test", "blocks": [
  {"pages": [5, 8],
   "main": "**Start an ANOVA by naming the test and writing the null hypothesis about the actual study.** A good null hypothesis names the outcome and the groups, such as no difference in rate of bone loss among the three treatment groups. ANOVA assumes Normal data, equal variances and independent groups.",
   "end": "So the first two lines of every answer are the test and the null hypothesis in words."}]},
 {"title": "The calculation in order", "blocks": [
  {"pages": [6, 7, 10, 11, 12, 13],
   "main": "**The within estimate comes from the group SDs, and the between estimate comes from the group means.** Average the squared SDs to get the within-groups variance. Find the grand mean, then the variance of the group means around it, and multiply by n.",
   "sub": ["The F ratio is the between estimate divided by the within estimate."]},
  {"pages": [14, 15, 16, 17],
   "main": "**The decision compares F with the table cutoff at the stated significance level.** If the exact denominator degrees of freedom are not printed, you use the two printed rows on either side. If F is bigger than both, you reject the null hypothesis.",
   "sub": ["When you reject at 0.05, you check a smaller level like 0.01, because you must report the smallest P range you can."],
   "end": "So the conclusion sentence repeats the null hypothesis wording and adds the P value."}]},
 {"title": "Reading ANOVA output", "blocks": [
  {"pages": [36, 38, 39],
   "main": "**In R output, the Residuals row holds the within-groups information.** Its Mean Sq is the within-groups variance and its Df is the denominator degrees of freedom. The treatment row holds the between-groups information, and the F value and Pr(>F) give the test result.",
   "end": "That is why later pairwise tests take the within variance straight from the Residuals Mean Sq."},
  {"pages": [26, 27, 28, 29, 30, 31],
   "main": "**Sums of squares are another way to write the same two estimates.** Each mean square is a sum of squares divided by its degrees of freedom. This hand version was not required on the midterm."}]}],
"questions": [
 {"q": "Why is \"mu 1 equals mu 2 equals mu 3\" not an acceptable null hypothesis?",
  "a": "It is not acceptable because it does not say anything about the study. The null hypothesis has to name the real outcome and groups, like no difference in hematocrit among the placebo and two dose groups."},
 {"q": "Which line of R's aov output gives the within-groups variance?",
  "a": "The Residuals line gives the within-groups variance. Its Mean Sq column is the within variance, and its Df column is the degrees of freedom you use for the table."},
 {"q": "If ANOVA finds a difference, do you say which groups differ?",
  "a": "No, you do not say which groups differ unless the question asks. ANOVA only shows that at least one mean is different, so finding which ones needs a separate pairwise method."}],
"memorize": [
 {"title": "Balanced ANOVA from means and SDs", "when": "The problem gives three or more independent groups of equal size, with a mean and SD for each.",
  "steps": [
   {"do": "Name the test as analysis of variance.", "why": "This is because there are more than two groups of different subjects with interval data."},
   {"do": "Write the null hypothesis in words about the outcome and the groups.", "why": "This is because a generic equation loses points."},
   {"do": "Average the squared SDs to get the within-groups variance.", "why": "This is because the spread inside groups estimates the population variance.", "tex": "s^2_{wit}=\\frac{1}{m}\\sum s_i^2"},
   {"do": "Find the grand mean and the variance of the group means.", "why": "This is because the spread of the means is the other route to the variance.", "tex": "s^2_{\\bar X}=\\frac{\\sum(\\bar x_i-\\bar X)^2}{m-1}"},
   {"do": "Multiply that variance by n to get the between-groups variance.", "why": "This is because means vary n times less than individuals.", "tex": "s^2_{bet}=n\\,s^2_{\\bar X}"},
   {"do": "Divide between by within to get F.", "why": "This is because F compares the two estimates.", "tex": "F=\\frac{s^2_{bet}}{s^2_{wit}}"},
   {"do": "Write both degrees of freedom.", "why": "This is because the F table needs both.", "tex": "\\nu_n=m-1,\\quad \\nu_d=m(n-1)"},
   {"do": "Look up the cutoff at 0.05, bracketing with nearby rows if needed.", "why": "This is because you must report the critical value you compared against."},
   {"do": "Compare F with the cutoff and write the full conclusion with a P range.", "why": "This is because the conclusion must restate the null hypothesis and give P if you reject."},
   {"do": "Stop without naming which groups differ unless asked.", "why": "This is because the exam rules say not to isolate differences unless told to."}]},
 {"title": "Read an R aov table", "when": "The problem gives ANOVA output from R instead of raw data.",
  "steps": [
   {"do": "Find the treatment row and read its Df as the numerator degrees of freedom.", "why": "This is because it equals the number of groups minus 1."},
   {"do": "Find the Residuals row and read its Df and Mean Sq.", "why": "This is because these are the within degrees of freedom and the within variance."},
   {"do": "Read the F value and Pr(>F).", "why": "This is because they give the test result and its P value."},
   {"do": "Keep the Residuals Mean Sq for any pairwise tests that follow.", "why": "This is because pairwise t tests reuse it as the pooled variance."}]}]},
# ---------------------------------------------------------------- Session 8
{
"id": 8, "tier": "review",
"title": "t tests for two groups and for one group",
"lead": "A t statistic divides an observed difference by the uncertainty in that difference.",
"topics": [
 {"title": "The idea of the t statistic", "blocks": [
  {"pages": [3, 4, 5],
   "main": "**A t statistic is the difference between two means divided by the standard error of that difference.** A big difference with small uncertainty gives a large t, so it is strong evidence. The same difference with more noise gives a smaller t.",
   "end": "So t measures the difference in units of its own uncertainty."},
  {"pages": [6, 7, 8],
   "main": "**The variances of two independent means add, even when you subtract the means.** Both means carry their own uncertainty, so the difference carries both. When the two groups are assumed to have equal variance, you combine their sample variances into one **pooled variance**, weighted by each group's degrees of freedom."}]},
 {"title": "Running the unpaired t test", "blocks": [
  {"pages": [9, 10, 11, 12, 13],
   "main": "**The unpaired t test compares two separate groups and uses n1 plus n2 minus 2 degrees of freedom.** It is **two-tailed** because a difference in either direction counts. The t table lists two-tail areas, so you read the column for your significance level directly.",
   "sub": ["You compare the size of t, ignoring its sign, with the table cutoff."]},
  {"pages": [17, 18, 19],
   "main": "**When t is smaller than the cutoff, you do not reject the null hypothesis.** That means the data did not show a difference, not that the groups are proven equal."}]},
 {"title": "The one-sample t test", "blocks": [
  {"pages": [20, 21, 22, 23, 24],
   "main": "**A one-sample t test compares one group's mean with a fixed reference value.** The reference value is a number from outside the sample, like a known population average. The standard error is the sample SD divided by the square root of n, and the degrees of freedom are n minus 1."}]}],
"questions": [
 {"q": "Why do you add variances when you subtract two means?",
  "a": "You add them because each mean has its own random error. Subtracting one mean from the other does not cancel those errors, so the uncertainty of the difference includes both."},
 {"q": "When do you use a one-sample t test instead of an unpaired t test?",
  "a": "You use a one-sample t test when there is one group compared with a fixed number. You use an unpaired t test when there are two separate groups of subjects to compare with each other."},
 {"q": "What does \"do not reject the null hypothesis\" mean?",
  "a": "It means the data did not give enough evidence of a difference. It does not prove the groups are the same, because a small study can miss a real difference."}],
"memorize": [
 {"title": "Unpaired two-sample t test", "when": "The problem gives two separate groups of subjects, each with a mean, SD and n.",
  "steps": [
   {"do": "Name the test as the unpaired two-sample t test.", "why": "This is because there are two groups of different subjects."},
   {"do": "Write the null hypothesis in words.", "why": "This is because it must name the outcome and the two groups."},
   {"do": "Pool the two variances.", "why": "This is because the groups are assumed to share one variance.", "tex": "s_p^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"},
   {"do": "Divide the difference in means by its standard error.", "why": "This is because t measures the difference in units of uncertainty.", "tex": "t=\\frac{\\bar x_1-\\bar x_2}{\\sqrt{s_p^2\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)}}"},
   {"do": "Write the degrees of freedom.", "why": "This is because the cutoff depends on them.", "tex": "\\nu=n_1+n_2-2"},
   {"do": "Look up the two-tailed cutoff at 0.05 and compare the size of t.", "why": "This is because a difference in either direction counts."},
   {"do": "If you reject, check 0.01 and write the conclusion with the P range.", "why": "This is because you report the strongest level you can."}]},
 {"title": "One-sample t test", "when": "The problem compares one group with a fixed number from outside the sample.",
  "steps": [
   {"do": "Name the test and write the null hypothesis about the group and the reference value.", "why": "This is because the question compares one group with an outside number."},
   {"do": "Divide the difference from the reference by the SE.", "why": "This is because the SE is the uncertainty in the sample mean.", "tex": "t=\\frac{\\bar x-\\mu_0}{s/\\sqrt n}"},
   {"do": "Use n minus 1 degrees of freedom and the two-tailed table.", "why": "This is because one mean was estimated from the data."},
   {"do": "Compare, decide and write the full conclusion.", "why": "This is because the conclusion must answer the study question."}]}]},
# ---------------------------------------------------------------- Session 9
{
"id": 9, "tier": "asked",
"title": "Finding which groups differ",
"lead": "After ANOVA finds a difference, pairwise t tests find which groups differ, with a correction so false positives do not pile up.",
"topics": [
 {"title": "Why plain repeated t tests are a problem", "blocks": [
  {"pages": [3, 4],
   "main": "**Each extra t test adds another chance of a false positive, so many tests together are too likely to find a fake difference.** With three comparisons at 0.05 each, the chance of at least one false positive is close to 0.15, not 0.05.",
   "end": "So the significance level of each test has to be made stricter."},
  {"pages": [5],
   "main": "**The pairwise t tests reuse the within-groups variance from the ANOVA.** It is the best estimate of the shared variance because it uses every group. Its degrees of freedom are also used for the cutoff, so the test is stronger than a two-group t test."}]},
 {"title": "Bonferroni", "blocks": [
  {"pages": [6, 7, 8],
   "main": "**The Bonferroni correction divides the overall significance level by the number of comparisons.** Every pair is then tested at that same stricter level. It is simple and safe, but it can miss real differences because it is very strict."}]},
 {"title": "Holm", "blocks": [
  {"pages": [9, 10, 11],
   "main": "**The Holm correction tests the strongest result first and loosens the level one step at a time.** You order the comparisons from the largest t to the smallest. The first is tested at the overall level divided by k, the next at the overall level divided by k minus 1, and so on.",
   "sub": ["As soon as one comparison is not significant, you stop, and that comparison and all smaller ones are called not different."],
   "end": "So Holm keeps the same overall protection as Bonferroni but finds more real differences."},
  {"pages": [12, 13, 14],
   "main": "**When only comparisons with a control group are wanted, k counts only those comparisons.** Fewer comparisons means a less strict level for each one."}]}],
"questions": [
 {"q": "Why does Holm find more differences than Bonferroni?",
  "a": "Holm finds more differences because only its first comparison uses the strictest level. Each later comparison gets a looser level, so a moderate difference can still be significant."},
 {"q": "What happens in Holm when one comparison is not significant?",
  "a": "You stop at that comparison. That comparison and every comparison with a smaller t are called not different, even if their t values would pass a looser level."},
 {"q": "Where do the variance and degrees of freedom for pairwise t tests come from?",
  "a": "They come from the ANOVA. The variance is the within-groups variance, which R shows as the Residuals Mean Sq, and the degrees of freedom are the Residuals Df."}],
"memorize": [
 {"title": "Holm pairwise t tests after ANOVA", "when": "ANOVA found a difference and you are asked which groups differ using Holm.",
  "steps": [
   {"do": "Name the procedure as multiple pairwise t tests with the Holm correction.", "why": "This is because that is the test being performed."},
   {"do": "Write one null hypothesis joined by AND for every pair.", "why": "This is because each pair is its own comparison."},
   {"do": "Take the within-groups variance and its degrees of freedom from the ANOVA.", "why": "This is because the pairwise tests share them.", "tex": "s^2_{wit}\\ \\text{(Residuals Mean Sq)},\\quad \\nu\\ \\text{(Residuals Df)}"},
   {"do": "Calculate t for every pair.", "why": "This is because each pair needs its own statistic.", "tex": "t_{AB}=\\frac{\\bar x_A-\\bar x_B}{\\sqrt{s^2_{wit}\\left(\\frac{1}{n_A}+\\frac{1}{n_B}\\right)}}"},
   {"do": "Order the pairs from the largest size of t to the smallest.", "why": "This is because Holm tests the strongest evidence first."},
   {"do": "Give the jth pair its own significance level.", "why": "This is because the level loosens one step at a time.", "tex": "\\alpha_j=\\frac{\\alpha_T}{k-j+1}"},
   {"do": "Look up each cutoff, bracketing between printed rows and columns when needed.", "why": "This is because levels like 0.0167 are not printed in the table."},
   {"do": "Go down the list, and stop at the first pair that is not significant.", "why": "This is because the Holm rule ends there."},
   {"do": "Write one conclusion naming which pairs differ and which do not, made with P less than 0.05.", "why": "This is because the whole statement holds at the overall level."}]},
 {"title": "Bonferroni pairwise t tests", "when": "The question tells you to use the Bonferroni correction.",
  "steps": [
   {"do": "Count the comparisons and divide the overall level by that count.", "why": "This is because every pair shares the same stricter level.", "tex": "\\alpha=\\frac{\\alpha_T}{k}"},
   {"do": "Calculate t for each pair with the within-groups variance.", "why": "This is because it is the shared variance estimate."},
   {"do": "Compare every t with the one cutoff.", "why": "This is because Bonferroni does not change levels."},
   {"do": "Write the combined conclusion.", "why": "This is because the answer names every pair."}]}]},
# ---------------------------------------------------------------- Session 10
{
"id": 10, "tier": "review",
"title": "Sampling distributions and clinical trials",
"lead": "A statistic changes from sample to sample, and a good trial is designed so that the change you see comes from the treatment.",
"topics": [
 {"title": "A statistic is a random variable", "blocks": [
  {"pages": [7, 8, 9, 10],
   "main": "**A sample mean is itself a random variable, because a different sample would give a different value.** Its distribution across many samples is the **sampling distribution**. That distribution is centered on the population mean, and its spread is the standard error.",
   "end": "So inference uses the sampling distribution to judge whether an observed value is surprising."},
  {"pages": [11, 12, 13, 14, 15],
   "main": "**The central limit theorem says sample means are close to Normal, and closer as n grows.** This works even when the individuals come from a flat or skewed population. That is why Normal methods work for averages of fairly large samples."}]},
 {"title": "Where t and F come from", "blocks": [
  {"pages": [16, 17],
   "main": "**When the SD is estimated from the sample, the standardized mean follows a t distribution instead of Z.** The estimate adds extra uncertainty, so t has heavier tails. With more degrees of freedom, t gets closer to Z, and with infinite degrees of freedom it is Z.",
   "sub": ["That is why the last row of the t table gives Normal cutoffs."]},
  {"pages": [18, 19],
   "main": "**The F statistic also has a family of sampling distributions, one for each pair of degrees of freedom.** The table cutoff depends on both."}]},
 {"title": "Designing a fair clinical trial", "blocks": [
  {"pages": [23, 24, 25],
   "main": "**A trial states its main question before it starts and assigns treatments by randomization.** **Randomization** gives each person the same chance of each treatment, so the groups start out similar. Any difference at the end can then be put down to the treatment.",
   "sub": ["Who is enrolled, and where they are treated, decides which population the results apply to."]},
  {"pages": [26, 27, 28],
   "main": "**Masking keeps people from knowing who got which treatment, so expectations cannot change the results.** In a single-masked trial the patients do not know. In a double-masked trial the clinicians do not know either. In a triple-masked trial the people analyzing the data also do not know.",
   "sub": ["A **crossover** trial gives each person both treatments in turn, so each person acts as their own control."]},
  {"pages": [30, 31],
   "main": "**A sham control is a fake procedure that looks like the real one.** Patients often feel better after any procedure, so a sham is needed to show that the real procedure works better than just having a procedure."}]}],
"questions": [
 {"q": "Why does the t distribution have heavier tails than Z?",
  "a": "It has heavier tails because the SD is estimated from the sample instead of known. The estimate adds extra uncertainty, so extreme values are more likely, especially with few degrees of freedom."},
 {"q": "What does randomization protect against?",
  "a": "Randomization protects against the groups starting out different. Because chance decides who gets each treatment, the groups are similar at the start, so a difference at the end can be put down to the treatment."},
 {"q": "Why would a trial use a sham procedure?",
  "a": "A trial uses a sham because patients often improve after any procedure. Comparing with a sham shows whether the real procedure helps more than simply having a procedure done."}],
"memorize": [
 {"title": "Pick the reference distribution", "when": "You must decide whether a statistic follows Z, t or F.",
  "steps": [
   {"do": "Ask whether the population SD is known.", "why": "This is because a known SD gives Z and an estimated SD gives t."},
   {"do": "For a mean with an estimated SD, use t with n minus 1 degrees of freedom.", "why": "This is because one mean was estimated from the data."},
   {"do": "For a ratio of two variance estimates, use F with two degrees of freedom.", "why": "This is because F compares two variances."},
   {"do": "For a large-sample proportion, use the infinity row of the t table.", "why": "This is because that row is the Normal distribution."}]}]},
# ---------------------------------------------------------------- Session 11
{
"id": 11, "tier": "review",
"title": "Comparing two proportions",
"lead": "When the outcome is yes or no, groups are compared by the proportion who had the event.",
"topics": [
 {"title": "A proportion is a mean of zeros and ones", "blocks": [
  {"pages": [3, 5, 6, 8],
   "main": "**If each person is coded 1 for the event and 0 otherwise, the mean of those codes is the proportion with the event.** So the same mean-and-spread ideas apply. The variance of one yes-or-no outcome is p times 1 minus p, which is largest when the split is even."}]},
 {"title": "The standard error of a proportion", "blocks": [
  {"pages": [9, 10, 11],
   "main": "**A sample proportion changes from sample to sample, and its standard error measures by how much.** The standard error is the square root of p times 1 minus p, divided by n. Bigger samples give a smaller standard error, so the proportion is more precise."}]},
 {"title": "The z test with Yates correction", "blocks": [
  {"pages": [13, 14, 15],
   "main": "**The z test divides the difference in proportions by its standard error, using one pooled proportion.** Under the null hypothesis both groups share the same event rate, so the two groups are combined to estimate it. The **Yates correction** subtracts a small amount from the difference, because counts jump in whole steps while the Normal curve is smooth.",
   "end": "So the corrected z is a little smaller and a little more cautious."},
  {"pages": [18, 20, 21],
   "main": "**The cutoff for z comes from the infinity row of the t table.** At 0.05 two-tailed the cutoff is 1.96. If the size of z is bigger, the proportions differ."}]}],
"questions": [
 {"q": "Why can a proportion be treated like a mean?",
  "a": "A proportion can be treated like a mean because coding yes as 1 and no as 0 makes the average of the codes equal to the proportion of yes answers. So standard errors and Normal methods work the same way."},
 {"q": "Why is the proportion pooled in the z test?",
  "a": "It is pooled because the null hypothesis says both groups have the same event rate. Combining the groups gives the best estimate of that one shared rate."},
 {"q": "What does the Yates correction do?",
  "a": "The Yates correction makes the test a little more cautious. Counts can only change in whole steps, so it subtracts a small amount from the difference before dividing by the standard error."}],
"memorize": [
 {"title": "z test for two proportions", "when": "The problem gives two groups and the number of people in each who had a yes-or-no event.",
  "steps": [
   {"do": "Name the z test and write the null hypothesis in words.", "why": "This is because the data are nominal and there are two groups."},
   {"do": "Calculate each group's proportion and the pooled proportion.", "why": "This is because the null hypothesis assumes one shared rate.", "tex": "\\hat p=\\frac{\\text{total events}}{n_1+n_2}"},
   {"do": "Subtract the Yates correction from the size of the difference.", "why": "This is because counts change in whole steps.", "tex": "z=\\frac{|\\hat p_1-\\hat p_2|-\\frac12\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}{\\sqrt{\\hat p(1-\\hat p)\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}}"},
   {"do": "Use the infinity row of the t table for the cutoff.", "why": "This is because that row is the Normal distribution."},
   {"do": "Compare, decide and write the conclusion with a P range.", "why": "This is because the answer must state what the data show."}]}]},
# ---------------------------------------------------------------- Session 12
{
"id": 12, "tier": "asked",
"title": "Chi-square tests for tables of counts",
"lead": "A chi-square test compares the counts you saw with the counts you would expect if the treatment did nothing.",
"topics": [
 {"title": "Expected counts", "blocks": [
  {"pages": [5, 6, 7, 8],
   "main": "**Expected counts show what the table would look like if the treatment had no effect.** If every group had the same outcome rate, each group would split in the same proportion as the whole sample. So each expected count is the row total times the column total, divided by the grand total.",
   "end": "That keeps every row total and column total the same as in the real table."},
  {"pages": [12, 13, 14],
   "main": "**The same rule works for a table of any size.** A table with three treatment groups and two outcomes needs six expected counts."}]},
 {"title": "The chi-square statistic", "blocks": [
  {"pages": [9, 10],
   "main": "**Chi-square adds up, over every cell, the squared gap between observed and expected, divided by expected.** A big total means the counts are far from what no effect predicts. The degrees of freedom are the number of rows minus 1 times the number of columns minus 1, and the table gives upper-tail cutoffs.",
   "sub": ["For a two-by-two table, the Yates correction subtracts one half from each gap before squaring."]}]},
 {"title": "Which groups differ", "blocks": [
  {"pages": [16, 17, 18, 19, 20, 21],
   "main": "**To find which groups differ, you split the big table into two-by-two subtables and correct with Holm.** Each subtable has 1 degree of freedom and uses Yates. You order the chi-square values from largest to smallest and apply the Holm levels as with t tests."}]},
 {"title": "Goodness of fit", "blocks": [
  {"pages": [22, 23, 24],
   "main": "**A goodness-of-fit test compares one set of counts with a set of expected proportions.** The expected counts come from the stated proportions times the total. The degrees of freedom are the number of categories minus 1."}]}],
"questions": [
 {"q": "Why is each expected count the row total times the column total over the grand total?",
  "a": "It is because no effect means every group has the same outcome rate. The column total over the grand total is that shared rate, so multiplying by the group's row total gives the count that group would have."},
 {"q": "When do you use the Yates correction for chi-square?",
  "a": "You use it for a two-by-two table. It subtracts one half from each observed-minus-expected gap before squaring, which makes the test a little more cautious."},
 {"q": "How do you find which of three groups differ after a chi-square test?",
  "a": "You make a two-by-two subtable for each pair and run a Yates-corrected chi-square on each. Then you apply the Holm correction, starting with the largest chi-square value."}],
"memorize": [
 {"title": "Chi-square test for a table", "when": "The problem gives a table counting an outcome in two or more groups.",
  "steps": [
   {"do": "Name the chi-square test and the table size.", "why": "This is because the data are nominal counts."},
   {"do": "Write the null hypothesis in words.", "why": "This is because it names the outcome and the groups."},
   {"do": "Add row totals, column totals and the grand total.", "why": "This is because expected counts are built from them."},
   {"do": "Build the full expected table.", "why": "This is because it shows what no effect would look like.", "tex": "E_{ij}=\\frac{R_i\\,C_j}{n}"},
   {"do": "Add up the cell contributions, using Yates if the table is two by two.", "why": "This is because chi-square totals the standardized gaps.", "tex": "\\chi^2=\\sum\\frac{(O-E)^2}{E}"},
   {"do": "Write the degrees of freedom.", "why": "This is because the cutoff depends on them.", "tex": "\\nu=(r-1)(c-1)"},
   {"do": "Compare with the upper-tail cutoff at 0.05 and write the conclusion.", "why": "This is because a large chi-square means the counts do not fit no effect."}]},
 {"title": "Pairwise chi-square with Holm from R output", "when": "You are given chisq.test results for each pair and asked which groups differ.",
  "steps": [
   {"do": "Name the procedure as multiple pairwise chi-square tests with Holm.", "why": "This is because each pair is a separate two-by-two test."},
   {"do": "Keep only the comparisons the question asks for.", "why": "This is because k counts only those comparisons."},
   {"do": "Use 1 degree of freedom for every subtable.", "why": "This is because each one is two by two."},
   {"do": "Order the chi-square values from largest to smallest and set the Holm levels.", "why": "This is because Holm tests the strongest result first.", "tex": "\\alpha_j=\\frac{\\alpha_T}{k-j+1}"},
   {"do": "Go down the list and stop at the first failure.", "why": "This is because that is the Holm stopping rule."},
   {"do": "Write the combined conclusion with P less than 0.05.", "why": "This is because the statement covers all the comparisons together."}]},
 {"title": "Goodness of fit", "when": "The problem compares one set of category counts with stated proportions.",
  "steps": [
   {"do": "Multiply each stated proportion by the total to get expected counts.", "why": "This is because that is what the stated proportions predict."},
   {"do": "Add up the chi-square contributions.", "why": "This is because the statistic is built the same way."},
   {"do": "Use the number of categories minus 1 for the degrees of freedom.", "why": "This is because the counts must add up to the total."}]}]},
# ---------------------------------------------------------------- Session 13
{
"id": 13, "tier": "asked",
"title": "How strong an association is",
"lead": "After a test shows a difference, relative risk, odds ratios and NNT describe how large it is.",
"topics": [
 {"title": "Study design decides the measure", "blocks": [
  {"pages": [3, 12],
   "main": "**A prospective study follows people forward from exposure, so it can measure risk directly.** A **case-control** study starts from people who already have the disease and looks back at exposure. In a case-control study the researcher chose how many cases to include, so the disease rate in the sample is not real, and only an odds ratio can be used.",
   "end": "So the first decision is whether the study was prospective or retrospective."}]},
 {"title": "Relative risk and absolute differences", "blocks": [
  {"pages": [5, 6, 7],
   "main": "**Relative risk divides the event rate in the exposed or treated group by the event rate in the comparison group.** A relative risk of 2 means the event is twice as likely. A relative risk of 1 means no difference.",
   "sub": ["The absolute difference subtracts the two rates instead, so it shows how many people out of 100 are actually affected."]},
  {"pages": [8, 9, 10, 11],
   "main": "**The number needed to treat (NNT) is 1 divided by the absolute reduction in risk.** It says how many people must be treated to prevent one event. The number needed to harm (NNH) works the same way for a side effect.",
   "sub": ["A large relative reduction can still be a tiny absolute benefit when the event is rare."]}]},
 {"title": "Odds ratios", "blocks": [
  {"pages": [13, 14, 15, 16],
   "main": "**The odds ratio divides the odds of disease in the exposed group by the odds in the unexposed group.** Odds are the number with the event divided by the number without it. In a two-by-two table this works out to the cross product, exposed with disease times unexposed without, divided by unexposed with disease times exposed without.",
   "end": "So the answer sentence says how many times greater the odds are for the exposed group."}]}],
"questions": [
 {"q": "Why can you not calculate relative risk from a case-control study?",
  "a": "You cannot because the researcher chose how many people with the disease to include. That makes the disease rate in the sample artificial, so risks cannot be estimated, but the odds ratio still works."},
 {"q": "How do you write an odds ratio for a newspaper reader?",
  "a": "You write one plain sentence that names the groups and the outcome. For example, the odds of getting prostate cancer were about 1.5 times greater for men who smoke than for men who do not smoke."},
 {"q": "What does an NNT of 50 mean?",
  "a": "It means 50 people must be treated to prevent one event. It comes from 1 divided by the absolute reduction in risk, so a small absolute benefit gives a large NNT."}],
"memorize": [
 {"title": "Relative risk with a sentence", "when": "The study followed people forward, and the question asks how strong the association is.",
  "steps": [
   {"do": "Say the study is prospective, so relative risk can be used.", "why": "This is because risk needs real event rates."},
   {"do": "Label the exposed or treated row and the event column.", "why": "This is because the ratio must go the right way round."},
   {"do": "Divide each group's event count by that group's total.", "why": "This is because risk is a rate within a group."},
   {"do": "Divide the exposed risk by the comparison risk.", "why": "This is because relative risk compares the two rates.", "tex": "RR=\\frac{n_{TD}/n_T}{n_{CD}/n_C}"},
   {"do": "Write one plain sentence with the number, the groups and the outcome.", "why": "This is because the answer is for a non-expert."}]},
 {"title": "Odds ratio with a sentence", "when": "The study started from people with and without the disease and looked back at exposure.",
  "steps": [
   {"do": "Say the study is retrospective, so you use an odds ratio and not relative risk.", "why": "This is because the disease rate in the sample was chosen by the researcher."},
   {"do": "Label the four cells by exposure and disease.", "why": "This is because the cross product needs the right cells."},
   {"do": "Multiply exposed with disease by unexposed without, and divide by unexposed with disease times exposed without.", "why": "This is because that is the ratio of the two odds.", "tex": "OR=\\frac{n_{ED}\\,n_{UN}}{n_{UD}\\,n_{EN}}"},
   {"do": "Write one plain sentence about the odds.", "why": "This is because the answer is for a newspaper reader."}]},
 {"title": "Number needed to treat", "when": "You are asked how many people must be treated to prevent one event.",
  "steps": [
   {"do": "Find each group's event rate.", "why": "This is because NNT uses the absolute difference."},
   {"do": "Subtract the treated rate from the control rate.", "why": "This is because that is the absolute reduction."},
   {"do": "Divide 1 by that reduction and round up.", "why": "This is because you cannot treat part of a person.", "tex": "NNT=\\frac{1}{p_C-p_T}"}]}]},
# ---------------------------------------------------------------- Session 14
{
"id": 14, "tier": "out",
"title": "Errors in decisions and the power of a test",
"lead": "Every test can make two kinds of mistakes, and power is the chance of catching a real effect.",
"topics": [
 {"title": "Two kinds of error", "blocks": [
  {"pages": [5, 6],
   "main": "**A Type I error is a false positive, and a Type II error is a missed real effect.** The significance level alpha is the chance of a Type I error when there is no effect. Beta is the chance of a Type II error when there is an effect.",
   "end": "So making one error less likely usually makes the other more likely."},
  {"pages": [8, 9],
   "main": "**Which error matters more depends on the consequences in the real problem.** Missing a dangerous cholesterol level and wrongly worrying families have different costs."}]},
 {"title": "What raises power", "blocks": [
  {"pages": [7, 10, 11, 13, 14],
   "main": "**Power is the chance that the test detects a real effect of a given size.** Power goes up when the effect is bigger, when the population is less variable, when the sample is larger, and when alpha is less strict.",
   "sub": ["A stricter alpha makes the cutoff farther out, so fewer real effects pass it."]},
  {"pages": [16, 17, 18, 19],
   "main": "**The power chart combines the effect size and the spread into one value, phi, which is the effect divided by the SD.** You read power from the curve for your sample size. You can also go the other way and find the sample size needed for a target power like 0.8."}]}],
"questions": [
 {"q": "What is the difference between a Type I and a Type II error?",
  "a": "A Type I error is saying there is an effect when there is none. A Type II error is missing an effect that is really there. Alpha is the chance of the first, and beta is the chance of the second."},
 {"q": "Why does a larger sample increase power?",
  "a": "A larger sample makes the standard error smaller. The same real difference then gives a bigger t, so it is more likely to pass the cutoff."}],
"memorize": [
 {"title": "Read power or sample size from the chart", "when": "You are asked for the power of a t test or the n needed.",
  "steps": [
   {"do": "Find the effect size you want to detect.", "why": "This is because power depends on the size of the effect."},
   {"do": "Find the SD from the pooled variance.", "why": "This is because the effect is judged against the spread."},
   {"do": "Divide the effect by the SD to get phi.", "why": "This is because the chart is organized by phi.", "tex": "\\phi=\\frac{\\delta}{\\sigma}"},
   {"do": "Read power from the curve for your n, or find the n whose curve reaches the target power.", "why": "This is because the chart links phi, n and power."}]}]},
# ---------------------------------------------------------------- Session 17
{
"id": 17, "tier": "m2",
"title": "Confidence intervals",
"lead": "A confidence interval gives a range of believable values for a population quantity, and it also answers the test question.",
"topics": [
 {"title": "What 95 percent confidence means", "blocks": [
  {"pages": [1, 3, 7],
   "main": "**A 95 percent confidence interval is built by a method that captures the true value in 95 percent of samples.** Any one interval either contains the true value or it does not. The 95 percent describes how often the method works over many samples.",
   "end": "So the confidence belongs to the method, not to one particular interval."}]},
 {"title": "Building an interval", "blocks": [
  {"pages": [2, 4, 5, 9],
   "main": "**Every interval is the estimate plus or minus a margin, and the margin is the cutoff times the standard error.** The estimate sits in the middle. The cutoff comes from the two-tailed t table for the confidence level and the degrees of freedom.",
   "sub": ["For one mean, the standard error is the SD over the square root of n with n minus 1 degrees of freedom.",
           "For two means, the standard error uses the pooled variance with n1 plus n2 minus 2 degrees of freedom."],
   "end": "So a wider interval means more uncertainty, and a 99 percent interval is wider than a 95 percent one."},
  {"pages": [11, 13],
   "main": "**Intervals for proportions use the Normal cutoff from the infinity row of the t table.** For the difference of two proportions, the course method uses the pooled proportion inside the standard error."}]},
 {"title": "Using an interval to decide", "blocks": [
  {"pages": [8, 15, 16],
   "main": "**If a 95 percent interval for a difference does not contain zero, the difference is significant with P less than 0.05.** Zero is the value that means no difference. When the interval leaves it out, no difference is not a believable value.",
   "sub": ["A 99 percent interval that leaves out zero gives P less than 0.01, because the wider interval is a stricter test.",
           "For one proportion, the reference value is whatever the null hypothesis states, such as one half."]}]}],
"questions": [
 {"q": "What does it mean to be 95 percent confident?",
  "a": "It means the method used to build the interval captures the true value in 95 percent of samples. Any one interval either contains the true value or it does not."},
 {"q": "How can a confidence interval tell you whether a difference is significant?",
  "a": "You check whether the interval for the difference contains zero. If a 95 percent interval leaves zero out, the difference is significant with P less than 0.05, because no difference is not a believable value."},
 {"q": "Why is a 99 percent interval wider than a 95 percent interval?",
  "a": "It is wider because it must capture the true value more often. A larger cutoff is used, so the margin of error is bigger."}],
"memorize": [
 {"title": "Confidence interval for a difference of two means", "when": "The problem gives two independent groups, each with a mean, SD and n.",
  "steps": [
   {"do": "Write the difference of the sample means.", "why": "This is because it is the center of the interval."},
   {"do": "Pool the variances and find the standard error of the difference.", "why": "This is because the margin is built from it.", "tex": "s_{\\bar x_1-\\bar x_2}=\\sqrt{s_p^2\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}"},
   {"do": "Find the two-tailed t cutoff for the confidence level with n1 plus n2 minus 2 degrees of freedom.", "why": "This is because the cutoff sets the width."},
   {"do": "Add and subtract the margin.", "why": "This is because the interval is the estimate plus or minus the margin.", "tex": "(\\bar x_1-\\bar x_2)\\pm t_c\\, s_{\\bar x_1-\\bar x_2}"},
   {"do": "Interpret the interval in the units of the measurement.", "why": "This is because the answer is about the population difference."}]},
 {"title": "Confidence interval for a difference of two proportions", "when": "The problem gives two groups with yes-or-no outcomes and asks for an interval for the difference.",
  "steps": [
   {"do": "Calculate each group's proportion and their difference.", "why": "This is because the difference is the center."},
   {"do": "Calculate the pooled proportion and the standard error.", "why": "This is because the course method pools the two groups.", "tex": "s=\\sqrt{\\hat p(1-\\hat p)\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}"},
   {"do": "Use the infinity row cutoff for the confidence level.", "why": "This is because proportions use the Normal distribution."},
   {"do": "Add and subtract the margin.", "why": "This is because the interval is the estimate plus or minus the margin.", "tex": "(\\hat p_1-\\hat p_2)\\pm z_c\\, s"},
   {"do": "Say the interval in percentage points.", "why": "This is because a difference of proportions is measured in points."}]},
 {"title": "Decide significance from intervals only", "when": "You are asked whether a difference is significant using only the intervals.",
  "steps": [
   {"do": "Look at whether the 95 percent interval contains zero.", "why": "This is because zero means no difference."},
   {"do": "If it leaves zero out, say the difference is significant with P less than 0.05.", "why": "This is because no difference is outside the believable range."},
   {"do": "Repeat with the 99 percent interval for P less than 0.01.", "why": "This is because the wider interval is the stricter test."},
   {"do": "Say how you reached each conclusion.", "why": "This is because the question asks you to explain the reasoning."}]}]},
]
