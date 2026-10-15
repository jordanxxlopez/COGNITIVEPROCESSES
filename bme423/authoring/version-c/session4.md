## 1 | From separate outcomes to continuous measurements
A continuous random variable can take values throughout a range. We describe its probabilities with a density curve, rather than placing a separate probability at each possible measurement.

The distribution function accumulates area under that curve up to a cutoff. It turns the shape of a density into the probability of being below a particular measurement.

Expected value then gives a probability-weighted center. The central change from discrete variables is that areas and integrals replace sums of separate probability masses.

## 2 | Different summaries answer different questions
Mean, median, trimmed mean, and mode all describe center, but they use the data differently. The median uses ordered position, while a trimmed mean removes selected extremes before averaging.

Range, interquartile range, variance, and standard deviation describe different aspects of spread. Skewness and kurtosis add information about asymmetry and tails.

The R summary functions collect these descriptions for a data set or for separate groups. Read the name of the summary alongside its value so that a measure of spread is not mistaken for a measure of center.

## 3 | The discrete framework we are extending
For a discrete variable, the probability function attaches a mass to each allowed value. Those masses are nonnegative and sum to one.

An expectation multiplies each transformed value by its probability and adds the contributions. Choosing the transformation to be the value itself gives the mean; choosing squared distance from the mean gives variance.

The continuous framework keeps those same meanings. What changes is how probability is distributed: it occupies intervals under a curve rather than separate points on the number line.

## 4 | Accumulating the coded coin's probabilities
The probability graph for the coded coin has masses at one and two. The cumulative function adds every mass at or below the cutoff.

Before one, the cumulative probability is zero. After including one it is one half, and after including two it is one; the graph stays flat between those changes.

The loaded-die exercise follows the same rule with more jumps and unequal masses. The jump at a particular value equals that value's probability.

## 5 | Continuous biomedical outcomes
Body temperature and forced expiratory volume are measured along a continuous scale. The viral-load example likewise treats the measured concentration as a variable over a range.

For such measurements, the useful probability question concerns an interval: how likely is the result to fall between two values? Narrower intervals generally capture less probability than wider intervals in the same region.

The possible range describes where measurements can occur. A probability density supplies the additional information about which parts of that range are more common.

## 6 | Probability is area under the density
The heart-rate density places measurement values along the horizontal axis. The chance of a heart rate between 75 and 100 beats per minute is the area under the curve between those boundaries.

A density must stay nonnegative, and its entire area must equal one. Its height alone is not an interval probability; both the shape and the width of the selected region matter.

An integral adds the thin strips of area across the interval. Think of it as collecting all the probability between the two cutoffs, rather than substituting one cutoff into the density.

## 7 | A uniform density has constant height
Between its lower and upper bounds, a uniform density is flat. Equal-length intervals inside those bounds therefore have equal probability.

The rectangle's full area must be one, so its height is one divided by the total interval width. A wider range requires a shorter rectangle to keep that same total area.

The standard Uniform distribution uses bounds zero and one. For any uniform example, an interval's probability is its length divided by the full allowed length.

## 8 | Center and width of a Normal density
The Normal density is bell shaped and symmetric around its mean. The mean moves the center along the measurement axis.

The standard deviation stretches or compresses the curve. Increasing it spreads the same total probability over a wider range, making the central peak lower.

In the notation shown, the second Normal parameter is variance, \(\sigma^2\). When you need a standard deviation for standardizing a measurement, take the square root of that variance.

## 9 | The standard Normal reference curve
The standard Normal variable is named \(Z\). Its mean is zero and its standard deviation is one, providing a common scale for Normal probability calculations.

A position on this axis describes distance from the center in standard-deviation units. Negative values lie below the mean and positive values lie above it.

The curve is still a density, so probabilities are areas. Later, a table of cumulative areas lets us answer questions about this one reference curve and then translate them back to other Normal measurements.

## 10 | Building a continuous cumulative distribution
The cumulative distribution function collects density area from the far left up to a chosen value. Moving the cutoff rightward includes more of the curve.

The accumulated probability begins at zero and approaches one once the full density is included. It cannot decrease because moving right never removes area that was already counted.

Lowercase \(f\) names the density, while uppercase \(F\) names accumulated probability. The integration variable inside the expression is a placeholder for the values being added, not another measured outcome.

## 11 | Turning flat and triangular densities into cumulative curves
For the flat density, equal movements along the measurement axis add equal amounts of area. Its cumulative function therefore rises at a constant rate within the allowed range.

For the triangular density, area initially accumulates slowly, then more quickly as the density gets taller. After the peak, each additional interval contributes less area again.

Both cumulative curves start at zero and finish at one. Their different slopes reflect the different density heights: a steeper cumulative curve means more probability is being collected in that region.

## 12 | The uniform cumulative function
Before the lower bound of a Uniform distribution, no density area has been included. The cumulative probability is therefore zero.

Inside the allowed interval, the accumulated rectangle grows in direct proportion to how far the cutoff has moved from the lower bound. The cumulative graph is a straight rising line there.

At the upper bound, all the density has been included and the cumulative probability reaches one. Beyond that point it stays one because there is no additional probability outside the allowed interval.

## 13 | A triangular density needs separate pieces
This density rises from zero to its peak over the first part of the range, then falls back toward zero over the second part. Its defining expression changes where the two sides meet.

To find cumulative probability on the first side, integrate the rising part only. On the second side, include the entire first portion before adding the area under the falling portion.

The cumulative function must join smoothly in value at the meeting point. It continues increasing even when the density falls, because a smaller positive density still contributes additional area.

## 14 | Left tails, right tails, and intervals
The cumulative function gives the probability at or below a cutoff. A right-tail probability is the part left over after subtracting that accumulated probability from one.

For a probability between two cutoffs, subtract the cumulative probability at the lower cutoff from the cumulative probability at the upper cutoff. The subtraction removes the area lying too far to the left.

The density picture shows the area selected, and the cumulative picture shows how much has accumulated at each boundary. They are two ways of describing the same probability.

## 15 | Why a Uniform mean is the midpoint
Expectation weights measurement values by their density across the allowed interval. A Uniform density gives equal weight to equal-length regions.

Values equally far to the left and right of the midpoint balance each other. The expected value therefore sits halfway between the lower and upper bounds.

The integral in the example expresses that balance mathematically: multiply each position by the constant density and accumulate across the range. The result agrees with the midpoint visible from the symmetric rectangle.

## 16 | Applying a linear change before averaging
A new variable can be defined by adding a constant and multiplying the original measurement by a constant. The expression \(Y=a+bX\) describes that shift and rescaling.

To find the expected new value directly, apply the transformation to every possible original value and weight it by the original density. The density still tells us how likely those original values are.

The shift adds the same amount to every outcome, while the multiplier scales every outcome. These simple effects lead to a useful shortcut for the new mean.

## 17 | Separating the shift from the rescaling
The expectation integral can be split into the constant part and the part involving the original variable. Constants can be moved outside their integrals.

The density integrates to one, so the constant part contributes exactly \(a\). The remaining integral is the original expected value multiplied by \(b\).

Thus the mean changes in the same linear way as an individual measurement. Adding a constant shifts the mean, and multiplying the measurements scales the mean; there is no need to recompute the entire distribution.

## 18 | Variance for a Uniform measurement from 20 to 40
The uniform range is centered at 30. Variance describes how far values lie from that center by averaging squared distances across the full interval.

The density is constant, so every equal-width part of the interval receives the same probability weight. Values near 20 or 40 contribute larger squared distances than values near 30.

The integration limits come from the allowed range. The result is a variance in squared measurement units; taking its square root would return the spread to the original units.

## 19 | Two useful expectation identities
Expanding the squared distance from the mean produces terms involving the squared variable, the variable, and constants. Taking expectations of those terms gives a shortcut for variance using a second moment and the mean.

For a linear transformation, adding a constant changes every value and its mean by the same amount. Their differences therefore remain unchanged.

Multiplying by \(b\) multiplies every distance from the mean by \(b\). Squaring those distances makes variance scale by \(b^2\), which explains why variance and standard deviation transform differently.

## 20 | A density for blood-sample analysis time
The analysis time ranges from zero to two hours, and its density rises with time. Longer times receive more probability per unit of time than shorter times within that range.

First accumulate the density to build the cumulative function. Then the chance of finishing within one hour is a left-tail probability, while the chance of taking longer than one and a half hours is a right-tail probability.

Expected time weights time by its density. The median instead finds the time where half the density area has accumulated, so these two central summaries come from different questions.

## 21 | Organizing the five analysis-time questions
Use the cumulative function as the starting point for the probability parts. Evaluating it at one hour gives the chance of finishing by then; subtracting its value at one and a half hours from one gives the remaining tail.

The expected-time calculation averages possible times with density weights. It requires a factor for the time itself as well as the density.

For the median, set cumulative probability to one half and solve for the time. Check that every answer belongs to the zero-to-two-hour range and distinguish a time-valued answer from a probability-valued answer.
