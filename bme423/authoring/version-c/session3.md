## 1 | Probability gives a language for uncertain outcomes
A random variable records an outcome that is not known in advance. Some outcomes take separate values, such as a count of heads; others vary continuously, such as a measured height.

For discrete outcomes, identify which values can occur and how likely each value is. A probability function lists those individual chances, while a distribution function adds chances up to a chosen cutoff.

Expected value describes the probability-weighted center. Independence explains when one event leaves another event's chance unchanged, which is the key to understanding the gambler's fallacy.

## 2 | Organizing data before plotting
Indexing selects particular entries from a collection of values. A data frame groups related variables so that measurements from the same observation remain together while the data are inspected or rearranged.

Input and output move data into or out of R. Plotting then changes the form of the display: line charts, histograms, boxes, and violins emphasize different features of the same measurements.

Saving a plot preserves the display for later use. The important connection is between the structure of the data and the question the plot answers, such as change across positions or the distribution of individual values.

## 3 | A known population before probability
The Martian heights provide a population whose center and spread can be calculated directly. Every height contributes to the population mean, and every squared distance from that mean contributes to the variance.

The mean is 40 cm and the standard deviation is 5 cm. These describe the full population, rather than estimates from a small selected sample.

Before an individual is randomly selected, the height of that individual is uncertain. The same population picture can then describe which heights are more common and which are less common, linking descriptive statistics to probability.

## 4 | Why probability was developed
Questions about gambling helped motivate a mathematical treatment of uncertain outcomes. Pascal and Fermat considered such problems, followed by contributions from Bayes and Laplace.

The possible outcomes may be known even when the particular outcome remains uncertain. Probability makes that uncertainty describable and allows different uncertain events to be compared.

The quotation emphasizes uncertainty as an ordinary feature of life. In this course, the practical use is biomedical measurement: a population's pattern supports predictions about outcomes that are not yet observed.

## 5 | Process, variable, experiment, and sample space
A random process has known possible results but an uncertain actual result. An experiment is the procedure that produces an outcome or collects a measurement from that process.

A random variable records the outcome of interest. Its value is unknown before the experiment but becomes a particular observed value afterward.

The sample space contains all possible experimental outcomes. Keep the procedure, the recorded quantity, and the set of possibilities separate: they describe different parts of the same probability problem.

## 6 | Three ways to define a random outcome
For one coin toss, the recorded outcome can be heads or tails. The experiment is the toss, and the uncertainty concerns which face appears.

For a randomly selected student, the recorded outcome can instead be heart rate. The selection and measurement produce a numerical observation whose value is not known beforehand.

For three coin tosses, the total number of heads can be recorded instead of the complete sequence. Different sequences can give the same count, so defining the random variable determines how outcomes are grouped.

## 7 | Counting outcomes in an event
An event collects the outcomes that satisfy a condition. For an equally likely set of elementary outcomes, count how many belong to the event and compare that count with the total number possible.

The numerator counts favorable outcomes; the denominator counts the full sample space. This gives a proportion between zero and one.

The equal-likelihood condition matters when using simple counts. A loaded die, for example, requires the actual probabilities of its outcomes rather than treating each face as equally common.

## 8 | Coding a coin toss as a discrete variable
The coin has two outcomes, heads and tails. Assigning them the numerical codes 1 and 2 allows their probabilities to be written using a random variable \(X\).

For a fair coin, both codes have probability one half. The number is a label for the outcome; changing the label does not change the physical coin toss.

Uppercase \(X\) names the variable before it is observed, while lowercase \(x\) refers to one possible value. Asking for the probability that the variable equals a particular value selects that outcome.

## 9 | A fair die and six possible values
Here the random variable is the number of dots on the upward face. Its possible values are the integers from one through six.

A fair die assigns the same probability to each face. The six probabilities together account for every possible result, so they sum to one.

If a question selects several faces, add their probabilities. For example, an event described by a property of the dots may contain more than one of the six elementary outcomes.

## 10 | Grouping die outcomes into odd and even
The experiment still rolls a die, but the recorded variable now indicates odd or even. Code odd as zero and even as one.

Three die faces produce each code, so each coded result has probability one half. The variable has two possible values even though the underlying die has six faces.

This shows why defining the recorded quantity comes first. A question about the exact face uses six outcomes, whereas a question about parity combines those faces into two groups.

## 11 | Counting heads in three tosses
Three tosses produce eight equally likely sequences. The random variable records only the number of heads, so several sequences can produce the same value.

There is one sequence with no heads and one with three heads. There are three sequences with one head and three with two heads.

Thus the four possible counts are not equally likely. Count how many sequences lead to each value before assigning its probability; the count values themselves do not reveal their likelihoods.

## 12 | NAT2 metabolic phenotypes
NAT2 is an enzyme involved in metabolizing drugs. The example groups infants into slow, intermediate, and fast metabolic phenotypes, with a separate probability assigned to each category.

The codes 1, 2, and 3 label those phenotypes. Intermediate metabolism is the most common of the three in the displayed distribution, but every category has a nonzero chance.

A randomly selected infant contributes one category. The probabilities describe the population pattern of category membership, rather than three possible amounts of enzyme measured on an evenly spaced scale.

## 13 | A run of heads before any tosses occur
To get a specified run of heads, every toss in the run must be heads. Independence allows the one-half probabilities to be multiplied across the required tosses.

As the required run gets longer, the probability gets smaller because more conditions must all be satisfied. That statement concerns the entire sequence before its results are known.

Once three heads have already occurred, the next toss is a different question. The earlier tosses are established facts; only the next toss remains uncertain.

## 14 | Why the next toss is still one half
After three heads, a fair coin still has a one-half chance of heads on its next toss. The coin has not changed its behavior in response to the previous results.

The small probability of four heads in a row includes uncertainty about all four tosses before the sequence begins. It is not the probability of the fourth head after the first three are already known.

The gambler's fallacy confuses these questions, sometimes treating tails as due after a run of heads. Independence means past results do not make the next fair toss compensate for them.

## 15 | When an earlier event changes the next chance
Repeated coin tosses leave the next toss's possibilities unchanged. Drawing a card and replacing it before reshuffling similarly restores the original deck.

Without replacement, the first card is removed. That changes both the number of cards left and, depending on the first result, the number of desired cards remaining.

Dependence therefore comes from a changed situation for the second event. Before multiplying probabilities, ask whether the first action alters what can happen next or how likely it is.

## 16 | Multiplying independent and conditional probabilities
For a die roll of six followed by an even result, the second roll starts fresh. Multiply the chance of six by the chance of an even result.

For two kings drawn without replacement, the second draw is from a deck with one fewer card and one fewer king. Its chance must be calculated after the first king has been removed.

The vertical bar in a conditional probability means given that the earlier event occurred. Use that updated probability for the second step whenever the first event changes the remaining possibilities.

## 17 | Writing the coin's probability function
A probability function pairs each possible value with its chance. For the coded fair coin, both 1 and 2 receive probability one half.

Values outside that allowed set receive probability zero. The function therefore describes the complete variable, including which values cannot occur.

The graph places probability at separate positions because the variable is discrete. Each height is a probability for one exact value, unlike a continuous density where probability comes from area across an interval.

## 18 | A uniform discrete probability function
The fair die puts equal probability at each integer from one to six. Uniform here means that every allowed value has the same probability.

The probability function is zero at other values. There is no chance of rolling a value between faces, such as three and a half.

To find the chance of a set of allowed faces, add the corresponding equal masses. The graph's separate spikes make the distinction between individual values and a continuous measurement scale visible.

## 19 | A loaded die changes the weights
This die favors the face with one dot. Its probability is 0.20, while each of the other five faces has probability 0.16.

The allowed values have not changed, but their weights have. Adding one larger mass and five smaller masses still gives a total probability of one.

A loaded die therefore cannot be analyzed by counting desired faces alone. Use the probability attached to each selected face and add those probabilities to calculate an event's chance.

## 20 | From eight sequences to four probability masses
List the eight possible three-toss sequences, then group them by their head counts. The three ways to obtain two heads belong to one value of the random variable.

That grouping creates probabilities of one eighth at the two extremes and three eighths at each middle count. Middle counts are more common because more sequences lead to them.

The probability function describes counts rather than sequence identities. Once the grouping is done, a question about at least two heads can be answered by adding the masses for two and three.

## 21 | A probability function for metabolic categories
The slow, intermediate, and fast NAT2 categories form a discrete set. Their displayed probabilities describe how a randomly selected infant is distributed among those three outcomes.

Intermediate metabolism carries the largest probability mass. The other two categories remain separate outcomes, with different probabilities rather than equal shares by default.

These category probabilities support questions such as the chance of selecting a slow or intermediate metabolizer. Add the relevant category masses while keeping the biological meaning of the numerical labels attached.

## 22 | The general discrete probability picture
A discrete variable can have several allowed values, each with its own probability. The values determine where the graph has masses, and the probabilities determine their heights.

The masses need not be evenly spaced or equal in size. A value with a taller probability mass occurs more often over repeated experiments than a value with a shorter one.

Outside the allowed set, probability is zero. To answer a probability question, identify the allowed values satisfying its condition and add exactly their masses.

## 23 | Checking that a probability function is valid
Every individual probability must be nonnegative. A negative mass would assign a negative chance to an outcome, which has no probability interpretation.

The probabilities across all possible values must also sum to one. That total accounts for the certainty that some allowed outcome occurs.

Check both requirements before calculating an expectation or a cumulative probability. A set of numbers can look like a probability table while failing either the sign requirement or the total-probability requirement.

## 24 | A cumulative function adds probability up to a cutoff
The distribution function reports the chance that the variable is at or below a chosen value. For the coded coin, it is zero before the first allowed value, then one half, then one.

The cumulative graph jumps where a probability mass is added. Between allowed values, nothing new enters the total, so the graph stays flat.

For the loaded die, begin with the larger mass at one and add each subsequent mass as the cutoff crosses another face value. The cumulative function never decreases because probabilities are being accumulated.

## 25 | Sketching the function with probabilities proportional to value
The allowed values are 1, 2, and 3, with probability proportional to the value. The largest value therefore has the largest mass, and the three masses together sum to one.

For the probability-function sketch, place a separate mass at each allowed value. For the cumulative sketch, start at zero and add those masses from left to right.

The cumulative graph jumps by the size of the mass being crossed. Include the mass at the cutoff itself, because the distribution function includes values equal to its argument.

## 26 | Expected value is a weighted average
For the coded coin, average the possible values using their probabilities as weights. The result is 1.5, even though a single toss never produces that code.

Expectation describes the center across repeated outcomes, not a result that must itself be possible. A value contributes more when it is larger or more probable.

The sum over possible values weights by probability; the population average sums over individuals. They describe the same center when the probabilities represent how frequently those values occur in the population.

## 27 | Taking the expectation after changing the outcome
A function of a random variable changes each possible value before averaging. Squaring the variable means square each allowed value first, then apply its original probability weight.

Squared distance from the mean is another function. For each possible outcome, calculate how far it is from the mean and square that distance.

Keep the order of operations clear: transform each outcome, then average the transformed values. Squaring an already calculated mean usually gives a different result from averaging the squared outcomes.

## 28 | Variance as an expected squared distance
The coded coin has possible values one and two, centered at 1.5. Each outcome is half a unit from that center.

Squaring those distances makes both contributions positive. Their probability-weighted average is the variance, which measures spread around the expected value.

Expected squared value and variance are related but different quantities. The first uses distance from zero, while variance uses distance from the mean; keeping that reference point visible prevents the two calculations from becoming confused.

## 29 | Mean and variance for the three-value example
Use the probabilities attached to 1, 2, and 3 as weights when calculating the mean. The larger values receive more weight in this distribution, so the center shifts toward them.

For variance, calculate each value's distance from that weighted mean, square it, and multiply by the same probability. Add the resulting weighted squared distances.

The same probability table supplies both calculations, but the quantity being averaged changes. The mean averages values; the variance averages their squared distances from the mean.

## 30 | Roulette earnings include losing outcomes
A single-number roulette bet has a small chance of a payout and a much larger chance of losing the stake. The earnings variable records net gain or loss from one play.

The displayed distribution assigns a loss of one unit to the losing outcomes and a gain of 35 units to the winning outcome. These are earnings, not the numbers printed on the wheel.

A probability model must include both sides of that result. The large possible win is only one part of the calculation; the many losing outcomes carry most of the probability weight.

## 31 | Expected roulette earnings
Multiply each net earnings outcome by its probability and add the contributions. The frequent one-unit losses pull the weighted average downward, while the rare 35-unit gain pulls it upward.

The resulting expectation is negative because the winning payout does not fully offset the probability-weighted losses. That describes average earnings over repeated plays rather than the outcome of one particular spin.

A large possible gain can therefore coexist with a negative expectation. Read both the size of an outcome and how often it occurs before judging the center of an earnings distribution.
