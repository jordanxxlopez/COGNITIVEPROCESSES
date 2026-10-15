## 1 | Using one Normal reference for many measurements
The continuous-variable summary connects density, accumulated probability, and expected value. These describe a distribution's shape, chances, and center.

The standard Normal variable gives us a common reference curve. Once a measurement is converted into standard-deviation units, the same probability table can be used for many different Normal populations.

We also reverse the process to find a cutoff for a requested probability. Finally, Normal quantile plots compare observed data with the pattern expected from a Normal population.

## 2 | Descriptive summaries before inference
The discussion outline returns to the ways we describe a sample. Center can be expressed with a mean, median, trimmed mean, or mode, depending on which feature we want to summarize.

Spread includes range, interquartile range, variance, and standard deviation. Shape adds another layer through skewness and kurtosis.

The listed R functions produce these summaries for a full data set or separate groups. Keep the conceptual question attached to each output: where the data sit, how widely they vary, or what shape their distribution has.

## 3 | Density area and accumulated probability
The shaded region between two measurement boundaries is an interval probability. It is obtained by accumulating the density across that interval.

The cumulative function collects all area to the left of a cutoff. Its value at the upper boundary includes the desired interval plus everything farther left.

Subtracting the cumulative value at the lower boundary removes that extra left-hand area. This is the link between an integral over an interval and a difference of two cumulative probabilities.

## 4 | Expected values of continuous outcomes
The mean of a continuous variable is a density-weighted average of its possible values. Values contribute according to both their size and how much probability density surrounds them.

For a transformed variable, apply the transformation to each original value before weighting and accumulating. This covers squared values and squared distances as well as linear changes.

The density remains the weighting rule for the original variable. Changing what we average changes the factor multiplied by that density, rather than making every possible value equally likely.

## 5 | Choosing the right cumulative subtraction
A cumulative probability gives the area to the left. For a right tail, remove that left-hand area from the total probability of one.

For a bounded interval, compare the accumulated probability at its two ends. The larger cumulative value contains the smaller one plus the interval we want.

The two graphs connect these operations: the density marks the selected region, while the cumulative curve records how much probability has accumulated at each cutoff. Start with the region before choosing the subtraction.

## 6 | The standard Normal density and its cumulative function
The standard Normal density is centered at zero with standard deviation one. Its height is largest near the center and decreases toward both tails.

Its cumulative function rises from zero to one, passing through one half at zero. The curve rises most quickly where the density is largest.

The table records cumulative probabilities, not density heights. When you read a table entry for a standard Normal value, you are finding the area to its left.

## 7 | Normal examples: left, right, and between
A cutoff of 1.5 uses the table's left-tail value directly. A request above 0.5 instead uses one minus the left-tail value at 0.5.

For an interval, subtract the lower cutoff's cumulative value from the upper cutoff's value. This works even when the interval crosses zero, because both table values use the same left-hand starting point.

Symmetry lets a negative tail be related to its positive counterpart. The example below minus two equals the upper tail above plus two; the reflected areas match even though their positions differ.

## 8 | Translating each probability statement into an area
Read each inequality before opening the table. A single upper boundary asks for a left area; a single lower boundary asks for a right area; two boundaries ask for their difference.

The intervals centered at zero collect matching pieces on both sides of the mean. Wider symmetric intervals include more of the bell curve.

The R function pnorm returns cumulative probability at its input. It can check a table-based answer, but a right tail or interval still requires the same complement or subtraction used by hand.

## 9 | Quantiles reverse the probability question
A quantile question gives an area and asks where to place the cutoff. Search for the requested cumulative probability in the table, then read the associated standard Normal value.

If the probability is a right tail, convert it into the area to the left first. For a central symmetric interval, divide the leftover probability between the two tails before locating the positive boundary.

The R function qnorm performs this reverse lookup. Keep its direction separate from pnorm: one starts with a probability and returns a cutoff, while the other starts with a cutoff and returns a probability.

## 10 | Standardizing a Normal measurement
Subtracting the mean moves the center to zero. Dividing by the standard deviation measures that distance in units of the population's spread.

The resulting standard Normal value says how many standard deviations the observation lies above or below the mean. The original units cancel in the conversion.

To reverse the conversion, multiply the standard Normal value by the original standard deviation and add the original mean. This takes a table cutoff back to the measurement scale of the actual problem.

## 11 | Standardizing preserves the selected probability
A cutoff on the original Normal scale and its standardized cutoff describe the same position relative to the distribution. Rescaling changes the axis, not the probability in the selected region.

A left-tail event therefore becomes a standard Normal left-tail event. A right tail still requires a complement after the boundary is standardized.

For an interval, standardize both boundaries using the same mean and standard deviation. Subtract the two cumulative standard Normal values to recover the original interval's probability.

## 12 | Arterial oxygen pressure as a Normal calculation
Arterial oxygen pressure has a mean of 90 mmHg and a standard deviation of 7 mmHg in this example. The notation squares the standard deviation in the variance position.

To find the chance below 110 mmHg, express 110 as a distance from 90 measured in units of 7. Use the cumulative table at that standardized cutoff.

For the range from 80 to 110, standardize both ends. The upper cumulative probability includes values below 80 as well, so subtract the lower cumulative probability to leave only the requested interval.

## 13 | Why the familiar Normal percentages recur
A boundary one standard deviation above the mean always standardizes to plus one. A boundary one below always standardizes to minus one, whatever the original units are.

The same reasoning turns two-standard-deviation and three-standard-deviation intervals into fixed intervals on the standard Normal scale. Their probabilities are therefore shared by every Normal distribution.

This explains the familiar central proportions as areas, rather than isolated facts to memorize. The interval becomes wider in standard-deviation units, so it captures progressively more of the distribution.

## 14 | Impurity averaged across fifty batches
The question concerns the mean impurity across fifty independent batches. Its center remains 4 grams, but the average varies less than a single batch's impurity.

Use the standard error of the mean, rather than the individual-batch standard deviation, when standardizing the two boundaries. Averaging makes the requested interval sit at different standardized distances than it would for one batch.

Both 3.5 and 3.8 grams lie below the population mean. Find their two cumulative probabilities and subtract in upper-minus-lower order to obtain the chance that the sample mean falls between them.

## 15 | Comparing observed data with a Normal pattern
The earlier check counted observations within selected distances of the sample mean. A Normal population predicts characteristic proportions in those regions.

Now the comparison is extended to the full distribution rather than a few chosen bands. The Normal density provides a reference for where observations at different cumulative positions should lie.

If the data resemble that reference throughout their range, a Normal model is plausible. The next plots turn this comparison into a visual relationship between observed and theoretical quantiles.

## 16 | Why a Normal quantile plot should look straight
A quantile identifies a position within an ordered distribution. A Normal quantile plot pairs each ordered sample value with the standard Normal value expected at its cumulative position.

If the population is Normal, the sample values are approximately a shifted and rescaled version of the theoretical values. That relationship produces an approximately straight line.

Random sampling introduces some departures even for Normal data. Look for the overall pattern and systematic curvature rather than expecting every point to lie exactly on the reference line.

## 17 | Reading the plotted Normality examples
The ten-observation example is plotted against theoretical Normal positions. Its points roughly follow a straight line, which is the pattern expected when the data are compatible with a Normal population.

The contrasting examples show systematic departures from straightness. Curvature or unusual behavior at the ends indicates that parts of the observed distribution differ from the Normal reference.

The functions shown create the point plot and add a reference line. Interpret the shape of the resulting graph: the purpose is to compare the distributional pattern, rather than to memorize the command sequence.
