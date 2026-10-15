## 1 | The midterm connects probability with inference
The review begins with describing and classifying data, then moves to random variables and probability. These supply the language for centers, spread, and uncertain outcomes.

Sampling distributions explain how sample statistics fluctuate. ANOVA, t, z, and chi-squared tests use those reference patterns to evaluate population hypotheses.

Association measures describe the size of categorical relationships, while the R section checks interpretation of statistical output. Prepare to connect a question's design and outcome type to the appropriate method.

## 2 | Exam scope and what to bring
The exam lasts ninety minutes, from 10:00 to 11:30 on Monday. The stated format is six to eight questions, with two or three on probability.

Bring two letter-size sheets with notes on both sides, a calculator, and the separate unannotated statistical tables. The listed reference tables are Normal, t, F, and chi-squared; tables will not be handed out.

The scope runs through Session 13 and excludes the Session 14 errors-and-power lecture. The review directs preparation toward the lecture material, homework, assigned reading, and relevant chapter questions.

## 3 | Population parameters describe the full group
The two height populations have different centers and spreads. Population mean uses every individual's measurement, while population variance averages squared distances from that mean.

The symbols mu and sigma refer to population center and standard deviation. Variance is sigma squared and has squared measurement units.

When all population measurements are known, these are direct descriptions. Later sample statistics estimate these same quantities from a smaller observed subset.

## 4 | Sample statistics estimate population parameters
The sample mean averages the measurements actually collected. The sample variance uses squared distances from that sample mean divided by sample size minus one.

The smaller denominator distinguishes the sample estimate from the full-population variance calculation. Taking the square root gives sample standard deviation in the original measurement units.

Random selection aims to avoid systematically favoring particular population members. This supports using the observed sample's center and spread as estimates for the larger population.

## 5 | Normal quantiles link positions with accumulated area
The bell curve is centered at the population mean. The marked distances along the horizontal scale are measured in population standard deviations.

The cumulative probabilities below the axis describe how much area lies to the left of each position. A quantile reverses this reading by starting with a probability and locating its cutoff.

The central 95% boundaries leave matching small tails on either side. Distinguish those interval boundaries from the approximate two-standard-deviation rule when the question requires a precise table value.

## 6 | Sort before finding the median and interquartile range
The median is the middle value of the ordered observations. For an even sample size, average the two central observations.

The range describes the extremes, while the interquartile range subtracts the 25th percentile from the 75th. It describes the width occupied by the middle half.

These summaries depend on positions in the sorted data. Locate the relevant observations before doing arithmetic, rather than using the original unsorted order.

## 7 | Interpolate a percentile in the ordered sample
The rank rule finds where the requested percentile falls in the sorted list. Its integer part identifies the lower observation and its fractional part describes movement toward the next one.

Take that fraction of the difference between the adjacent observations and add it to the lower value. This estimates the measurement at the requested cumulative position.

Keep three objects visible: the rank, the selected pair of values, and the interpolated result. The rank is a location in the list, while the final percentile has the data's measurement units.

## 8 | Classify the outcome before choosing a method
Continuous measurements can take values throughout a range. Discrete numerical observations count separate outcomes, such as episodes or affected joints.

Categorical observations identify group membership. Ordinal labels have a meaningful order, while nominal labels do not.

Look at what a difference between two values would mean. A numbered disease stage is an ordered category, whereas a count records how many events occurred; their numerical appearance alone does not make them the same data type.

## 9 | A random variable and one of its values
The coded coin example uses the random variable \(X\) for an uncertain toss outcome. Lowercase \(x\) identifies a particular possible value of that variable.

Heads and tails receive numerical codes, but the codes do not change their probabilities. A fair coin gives each outcome probability one half.

A discrete variable places probability on separate allowed values. Before calculating, identify exactly what the variable records rather than assuming it describes every detail of the experiment.

## 10 | The probability function lists exact-value chances
For each allowed value, the probability function gives the chance of observing exactly that value. The coded coin has separate masses at one and two.

The function is zero elsewhere because other codes cannot occur. Its graph therefore has isolated masses rather than a continuous band of probability.

To calculate an event involving several allowed values, add their masses. The function is the complete lookup rule from a possible outcome to its probability.

## 11 | Check the probability model before using it
Each discrete probability must be nonnegative. The sum across the entire allowed set must equal one.

Those requirements ensure the function represents a complete distribution of chance. A missing probability can often be determined by subtracting the known total from one.

Once the table is valid, use its probabilities as weights in expectations and cumulative sums. Invalid weights would make later calculations lose their probability interpretation.

## 12 | A discrete CDF includes the cutoff value
The distribution function accumulates the masses at all allowed values less than or equal to its argument. It includes a mass exactly at the cutoff.

The coded coin's CDF jumps to one half at the first value and to one at the second. Between allowed values, the accumulated amount stays constant.

The jump size equals the probability of that exact value. Read whether an inequality includes or excludes a boundary when translating a discrete probability question into cumulative terms.

## 13 | Expected value need not be an allowed outcome
The fair coded coin has values one and two with equal weights. Their weighted average is 1.5, although no single toss produces that code.

An expectation describes the center of a distribution across repeated outcomes. It does not promise that the center itself is a possible observation.

For unequal probabilities, larger weights pull the center more strongly toward their values. Multiply each allowed value by its own probability before adding the contributions.

## 14 | Transform values before taking their expectation
The function inside an expectation determines what is being averaged. Squared values require squaring each possible outcome before applying its probability weight.

Squared distances from the mean use a different transformed quantity. Subtract the mean first, then square and weight each result.

Averaging and transforming cannot usually be swapped. The expected square is generally different from the square of the expectation, which is why both appear in variance calculations.

## 15 | Variance is a weighted average of squared deviations
Start with the distribution's mean and compare each possible outcome with it. Squaring the differences turns positive and negative departures into positive contributions.

Weight those squared distances by the original outcome probabilities and add them. The result is variance, measuring spread around the mean rather than around zero.

The displayed second-moment calculation supplies a shortcut to the same quantity. Keep expected squared value and squared expected value separate so that the subtraction has the correct meaning.

## 16 | A continuous density assigns probability through area
For continuous heart rate, the probability between two boundaries is the density area over that interval. A curve height at one position is not itself that probability.

The density stays nonnegative and has total area one. Its shape describes which measurement ranges collect more probability per unit of width.

An integral accumulates those small area contributions. Use the requested interval as the integration range, with the density as the function being accumulated.

## 17 | Continuous expectations use density weights
The expected measurement multiplies each possible value by its density and integrates over the allowed range. This is the continuous version of the discrete weighted sum.

For a function of the measurement, replace the value factor with that function while keeping the density weight. Squared values, linear transformations, and squared deviations all fit this pattern.

Decide what quantity is being averaged before integrating. The integration limits come from where the density is nonzero, rather than from a new range invented for the transformed expression.

## 18 | Build the CDF by accumulating density
The cumulative function adds density area from the left up to a cutoff. It reports a probability and therefore stays between zero and one.

As the cutoff moves right, the accumulated area cannot decrease. Before the possible range it is zero, and after the full range it is one.

The density and cumulative function use different scales on their vertical axes. One describes probability per measurement interval; the other describes total probability accumulated so far.

## 19 | Convert CDF values into the requested region
A left-tail probability comes directly from the cumulative function. A right-tail probability is the remaining area after subtracting that value from one.

An interval probability subtracts the lower cutoff's cumulative value from the upper cutoff's value. This removes everything lying below the requested interval.

The graphs make the subtraction visible. Mark the two boundaries on the density first, then use the cumulative values that retain exactly the selected area.

## 20 | The standard Normal curve is the reference scale
The standard Normal variable has mean zero and standard deviation one. Its symmetric density places equal probability on matching sides of zero.

The cumulative function gives area to the left of a standard Normal value. At zero that area is one half.

Use the table for areas or reverse it for quantiles. The complicated-looking density expression defines the curve, while table lookup performs the course's practical probability calculations.

## 21 | Convert measurements to standard-deviation units
Subtract the population mean from the measurement, then divide by population standard deviation. The result describes how far the measurement lies from the center relative to the distribution's width.

Negative standardized values fall below the mean and positive values above it. The original measurement units cancel.

To return a standardized cutoff to the original scale, multiply by the standard deviation and add the mean. These two directions support probability questions and inverse cutoff questions respectively.

## 22 | Standardize both boundaries of an interval
The transformation preserves the probability of the selected event while changing its measurement scale. A Normal left-tail question therefore becomes a standard Normal left-tail question.

For an interval, convert both original boundaries with the same mean and standard deviation. Then subtract their cumulative standard Normal probabilities in upper-minus-lower order.

For a right tail, take the complement of the transformed cutoff's cumulative probability. The transformation changes the axis, while the requested side of the boundary still determines the area operation.

## 23 | Statistics have distributions across samples
A statistic is calculated from observed sample data. Collecting a different sample generally gives a different mean, t value, or F value.

A sampling distribution describes that variation across all possible samples of a fixed design. Each point represents a completed sample's statistic.

This provides the reference for inference from one observed sample. We compare the obtained statistic with what repeated sampling would produce under the population model being tested.

## 24 | Three samples estimate the same fixed population
The population height mean and spread do not change across the illustration. Different groups of ten individuals nevertheless produce different sample means and standard deviations.

The sample mean estimates population center, and sample standard deviation estimates individual population spread. Neither estimate must equal its target in a particular sample.

The variation among these estimates motivates sampling distributions. We want to know how much an estimate can move because of selection alone before interpreting its discrepancy from a proposed population value.

## 25 | Collect the means of repeated samples of ten
Every sample contributes one average to the plotted distribution. Its horizontal position depends on the combined heights of the ten selected individuals.

A sample containing more tall individuals can produce a high average, while one containing more short individuals can produce a low average. Repeated random selection produces the full range of such averages.

The plot's width concerns variation among averages. It is not the spread of the ten heights within any one sample.

## 26 | Compare individual height spread with mean spread
The population distribution shows variation from one individual to another. The sample-mean distribution shows variation from one group average to another.

Both centers correspond to the same population mean. The averages cluster more narrowly because high and low individual deviations partly cancel.

Use individual standard deviation for questions about one individual's height. Use the standard error for questions about the mean of a specified number of independent heights.

## 27 | The central limit theorem concerns averages
The sample mean has the population mean as its expected center. Its sampling standard deviation is the individual standard deviation divided by the square root of sample size.

For sufficiently large independent samples, the distribution of the mean is approximately Normal even if individual observations are not. The course gives thirty as its stated large-sample guideline.

The theorem changes the distribution we can use for the average; it does not change the population's original shape. Keep the word mean attached when using that Normal approximation.

## 28 | Skewed individuals can produce more symmetric averages
The top distribution has a long right tail. A small sample can include an extreme individual, which can pull its average upward.

Averages of five remain visibly skewed, while averages of fifteen are more concentrated and less asymmetric. Their expected centers remain at the same population mean.

Increasing sample size affects both the shape and width of the mean distribution. The underlying individual population remains skewed even as its averages become more stable.

## 29 | Thirty and fifty observations improve the mean estimate
The larger-sample averages cluster more tightly than the smaller-sample averages from the same skewed population. Their distributions also look more nearly bell shaped.

The common center remains 100 because increasing sample size does not alter the population mean being estimated. The standard error decreases as the square root of sample size increases.

For a probability about one of these averages, use its smaller sampling spread. Substituting the original individual spread would ignore the precision gained by averaging.

## 30 | Unbiasedness and precision of the sample mean
The expectation of the sample mean equals the population mean. This means repeated sample means are correctly centered, the property called unbiasedness.

Its variance decreases with sample size when observations are independent. A smaller variance means estimates cluster more tightly across repeated samples.

The comparison with the median and the average of the extremes concerns a Normal population. In that setting the sample mean supplies a relatively stable estimator among the center estimates shown.

## 31 | Estimate SEM from a single observed sample
The sample mean describes center and the sample variance describes spread among the collected individuals. These can both be calculated from one data set.

To estimate uncertainty in the mean, divide the sample standard deviation by the square root of sample size. This gives the estimated standard error of the mean.

Do not label the individual standard deviation as SEM. The separate variance-standard-error expression concerns uncertainty in the variance estimate, which is a different target from uncertainty in the mean.

## 32 | Recognize the ANOVA cell of the chooser
The highlighted cell combines a numerical interval response with three or more independent groups. That design leads to the one-way ANOVA comparison of population means.

The response must remain a measured quantity, such as cardiac output or lung flow. Group membership identifies which mean each observation contributes to.

Read the design and response together before choosing F. A larger number of groups alone does not select ANOVA when the outcome is a category count.

## 33 | ANOVA begins with equal population means
The null states that every group's population mean is equal. The alternative allows at least one pair to differ.

The displayed sample means and variances summarize each observed group. Means measure center, while variances measure scatter around each group's own center.

For a balanced design, the number of groups and common number of subjects per group define the next steps. Keep these two counts separate when constructing the variance estimates and degrees of freedom.

## 34 | Assemble balanced ANOVA's two variance estimates
Average the group variances to estimate background individual variation. Average the equally weighted group means to find the grand mean.

Measure the scatter of those means around the grand mean. The squared quantity shown is variance among means, even though the nearby heading refers to standard error.

Multiply that mean variance by the common group size to obtain the between-groups estimate. It is now on the same individual-variance scale as the within-groups estimate.

## 35 | Complete the balanced ANOVA decision
The F ratio places the between-groups estimate over the within-groups estimate. A large value indicates more group-center separation than expected from the observed background spread.

Use groups minus one for numerator degrees of freedom and the combined within-group contributions for denominator degrees of freedom. Both specify the F-table lookup.

Compare with the upper-tail critical value and state the result about population means. Rejecting the overall null establishes a difference somewhere, with particular pairs requiring follow-up comparisons.

## 36 | The professor narrows the ANOVA requirement
The review explicitly excludes hand calculation using the sum-of-squares formulation. It also states that any midterm ANOVA problem will have equal group sizes.

That means the balanced variance-comparison calculation is the relevant hand method. Group means, standard deviations, and the common sample size provide its ingredients.

Practice averaging group variances, locating the grand mean, measuring variation among means, rescaling by group size, and obtaining F. This directly follows the announced design rather than adding an unequal-group derivation.

## 37 | Recognize the independent two-group mean test
The highlighted cell selects an unpaired t test for a numerical response measured in two groups of different individuals. The comparison concerns their population means.

An unpaired design differs from measuring the same individuals before and after an intervention. The independent two-group denominator combines uncertainty from the two separately sampled groups.

Identify both group means, both spreads, and both sample sizes. These supply the observed difference and its standard error in the pooled procedure reviewed next.

## 38 | Set up the two-sample hypotheses and summaries
The null equates the two population means. It does not require the two observed sample means to be exactly equal.

Each group supplies a sample mean and sample variance. The sample sizes can differ in this t-test formulation, so retain the correct size beside each group's summary.

Use the mean difference as the numerator signal. The variances and sizes then determine how uncertain that signal is under repeated independent sampling.

## 39 | Pool variance with degrees-of-freedom weights
Multiply each sample variance by its group's sample size minus one. Add the contributions and divide by the combined sample sizes minus two.

That pooled variance estimates the common individual population variance assumed by this procedure. Use it in the standard error involving the two reciprocal sample sizes.

Divide the mean difference by that standard error to obtain t. Carry the same combined degrees of freedom into the reference table.

## 40 | Match the two-tailed t decision to its assumptions
The pooled test assumes independent random samples, Normal populations, and equal population variances for the numerical outcome. These support the pooled estimate and t reference.

For a two-sided alternative, compare the absolute statistic with the critical magnitude. Positive and negative differences can both count as evidence.

A rejection means evidence against equal population means at the chosen level. A statistic below the threshold means the data do not establish that difference with this test.

## 41 | One group and a specified population mean
The one-sample setting supplies measurements from one group and a fixed reference value. It does not estimate a second group's mean or variance.

Calculate the observed sample mean and sample variance. The null says the sampled population mean equals the reference.

The sample's estimated standard error provides the denominator for its discrepancy from that benchmark. This uses the same averaging principle as SEM, now inside an inference procedure.

## 42 | One-sample t uses sample size minus one
Subtract the fixed reference mean from the sample mean. Divide by the sample standard deviation over the square root of sample size.

The resulting statistic uses one fewer degree of freedom than the number of observations. Select the corresponding two-tailed critical magnitude.

Compare magnitudes and interpret the result in the original measurement context. The numerator has measurement units, the denominator has the same units, and t is their dimensionless ratio.

## 43 | Pairwise t tests inherit ANOVA's error estimate
After the overall ANOVA, each selected mean difference uses the common within-groups variance. This includes background information from all the original groups.

The reference degrees of freedom also come from that ANOVA error estimate. Do not replace them with degrees of freedom from a newly isolated two-group analysis.

The family of comparisons then needs Bonferroni or Holm thresholds. Estimating the standard error and controlling the multiple-comparison decisions are two separate parts of the follow-up procedure.

## 44 | Bonferroni uses one adjusted level for every pair
Count the pairwise comparisons included in the family. Divide the chosen overall significance level by that count.

Every comparison uses this same adjusted level. More comparisons therefore require a more extreme statistic for individual rejection.

Use the ANOVA-based standard error and residual degrees of freedom to obtain each t statistic and critical value. Bonferroni changes the significance threshold while preserving the observed group differences.

## 45 | Holm uses ordered, successive thresholds
Arrange the comparisons from strongest to weakest evidence. With a common t reference, this means descending absolute t magnitude.

Test the strongest using the overall level divided by the total number of comparisons. If it passes, continue with one fewer remaining comparison in the divisor.

Stop rejecting at the first failure. The later, larger significance levels cannot be applied independently after that stopping point; the ordered sequence is the defining part of Holm's procedure.

## 46 | Shift from measured means to nominal outcomes
The highlighted cell moves into the nominal row of the chooser. The response is now category membership, such as event versus no event, rather than a continuous measurement.

A two-group proportion test examines whether the population event probabilities are equal. The same counts can also be arranged as a two-by-two contingency table.

Identify the event being counted and the denominator for each group. These determine the sample proportions before any pooled uncertainty or corrected statistic is calculated.

## 47 | A proportion is the mean of zero-one records
Count the observations coded one and divide by the sample size. This is the sample estimate of the event probability.

The binary variance estimate uses that proportion and its complement. Dividing by sample size and taking the square root gives the estimated standard error of the proportion.

The individual outcome and its estimated rate have different spreads. Larger samples make the rate more precise even though each individual still has only the two possible outcomes.

## 48 | The proportion-test choice depends on the response
The method chooser again highlights the two-group nominal comparison. Its repeated location reinforces that the same study-group count can lead to different methods depending on the outcome type.

Two independent groups with measured glucose use a mean test. Two independent groups classified by whether thrombi occurred use a proportion or contingency-table test.

Describe one person's recorded result before selecting the method. That quick check connects the table branch to the actual data rather than to superficial similarities in the wording of two questions.

## 49 | Assign event counts and denominators in the aspirin table
The thrombus counts supply the event numerators, and the treatment totals supply the denominators. Placebo and aspirin have different group sizes.

The equal-proportion null concerns the population probabilities of thrombus formation. It does not say the raw event counts should match across unequal-sized groups.

Calculate both group proportions before pooling. Their difference describes the observed separation, while their combined event count estimates the shared null probability for the test denominator.

## 50 | Apply the required two-by-two correction
The corrected z calculation uses the absolute sample-proportion gap minus the continuity adjustment. Its denominator uses a pooled event probability and both group sizes.

The course explicitly requires Yates's correction for these two-by-two comparisons. Keep the corrected numerator distinct from the original observed rate difference used to describe effect size.

Compare the resulting magnitude with a standard Normal critical value. The infinite-degrees-of-freedom row of the two-tailed t table supplies the same reference cutoffs.

## 51 | Contingency analysis extends the category comparison
The marked cells include the nominal comparisons for two groups and for several independent groups. A contingency table cross-classifies group membership and outcome category.

The null predicts no association between those classifications. Expected counts allocate the pooled outcome pattern across the observed group sizes.

The next page expresses the mismatch through chi-squared. Use the table's dimensions to determine degrees of freedom and whether the course's two-by-two correction applies.

## 52 | General contingency-table calculation
For each cell, multiply its row total by its column total and divide by the grand total. This supplies its expected count under independence.

Subtract expected from observed, square the discrepancy, divide by expected, and add across cells. For a two-by-two table, apply the course's continuity correction to the discrepancy first.

Degrees of freedom equal rows minus one times columns minus one. Compare the resulting statistic with the corresponding upper-tail chi-squared critical value to test the no-association null.

## 53 | Adjust a family of pairwise categorical comparisons
The three pairwise two-by-two tables each produce a one-degree-of-freedom corrected chi-squared statistic. Order those statistics from largest to smallest for Holm's procedure.

The overall level is 0.01 in this displayed example. Successive thresholds divide it by three, then two, then one as long as earlier comparisons pass.

The two large comparisons pass, while the small remaining comparison does not. Keep each treatment-pair label attached throughout sorting and interpretation so that the rejection decisions map back to the correct groups.

## 54 | Goodness of fit compares one sample with target proportions
Here the expected category distribution is specified in advance. Multiply each target probability by the observed sample total to obtain an expected count.

Add the squared observed-minus-expected discrepancies divided by their expected counts. With fixed target probabilities, the degrees of freedom are categories minus one.

This is a single-sample category-distribution question, not an independence question between two classifications. That distinction determines both where expected counts come from and which degrees of freedom are used.

## 55 | Apply goodness of fit to the exercise campaign
The earlier survey gives the target proportions in three exercise categories. The current graduating class supplies the new observed counts and a total of 470 students.

Scale the earlier proportions to that current total before comparing. The expected counts represent what the current sample would look like if its category pattern had not changed.

The test combines excesses and shortages across all three categories. Its conclusion concerns whether the overall distribution differs from the benchmark, rather than a separate unadjusted test of each category.

## 56 | Study direction determines which rates are available
A randomized trial assigns treatment before observing outcomes. A cohort study follows existing exposure groups forward without random assignment.

A case-control study instead selects people by outcome and looks backward for exposure. Its case and control totals reflect the sampling design.

These differences determine which denominators represent population risk. Forward follow-up supports event-risk comparisons, while case-control sampling naturally supports an exposure-odds ratio.

## 57 | Association measures occupy their own chooser branch
The highlighted association cell asks how strongly two nominal variables are related. Relative risk and odds ratio provide effect-size descriptions for those category relationships.

A significance test and an association measure are not interchangeable. The former evaluates a null reference; the latter describes the observed relationship's magnitude and direction.

Use the study design to choose the measure, then define the event and reference group. This keeps a ratio's words synchronized with its numerator and denominator.

## 58 | Risk ratio and absolute reduction answer different questions
For a trial or prospective cohort, calculate event probability within each exposure group. Relative risk divides the treatment probability by the control probability.

Absolute risk reduction subtracts the treatment event probability from the control event probability when treatment reduces an adverse outcome. It measures a difference on the probability scale.

A ratio near one indicates similar risks, while a small absolute difference means few additional events are changed per patient. Both descriptions can be useful for understanding the same table.

## 59 | Turn an absolute benefit into NNT
The number needed to treat is the reciprocal of the absolute beneficial outcome difference. It expresses patients treated per additional favorable outcome compared with the reference condition.

A larger absolute benefit produces a smaller NNT. A very small benefit can produce a large NNT even when the relative reduction sounds impressive.

Convert percentages into decimal probabilities before taking the reciprocal. Retain precision through the calculation, and round upward when the answer must be a whole number of patients.

## 60 | Turn an absolute harm into NNH
Number needed to harm uses the absolute increase in an adverse outcome. It reports how many patients would be treated or exposed per additional harmful event relative to the comparison group.

A smaller NNH indicates more frequent harm, while a larger NNH indicates less frequent additional harm. The interpretation runs in the opposite favorable direction from a small NNT.

The outcome label determines whether the absolute difference represents benefit or harm. Define that event first so the reciprocal receives the correct clinical name.

## 61 | Compare safety on the patient-count scale
The repeated NNH definition emphasizes treatment safety. Translate a harmful rate increase into an expected additional event per number of people exposed.

Keep its reference condition and observation period attached. A harm estimate over one period is not automatically comparable with a benefit estimate over a different period.

When NNT and NNH refer to compatible comparisons, they put benefit and harm on a common patient-count scale. Their clinical importance still depends on what the beneficial and harmful outcomes actually are.

## 62 | Odds ratios work with case-control sampling
Cases and controls are selected by their outcome status. Compare exposed-to-unexposed odds within cases with the same exposure odds within controls.

The cross product yields the odds ratio. One indicates equal odds, while values above or below one describe the association relative to the selected reference groups.

The same cross product can also be calculated from prospective data. Keep its interpretation in odds, and do not treat sampled case-control totals as direct population disease risks.

## 63 | What to understand in R functions and output
The review distinguishes pnorm from qnorm: one returns cumulative probability for a cutoff, and the other returns a cutoff for a probability. The inputs and outputs run in opposite directions.

ANOVA output includes between-group and residual information, while t-test and chi-squared output provide their respective statistics, degrees of freedom, and p values. Interpret those values in the context of the stated test.

For an ANOVA follow-up, the residual mean square and residual degrees of freedom can supply the next calculation. Read the table's row labels rather than treating the output as a single p-value answer.

## 64 | Integrate the covered methods with the chooser
The marked cells collect the course's main independent-group methods: t tests and ANOVA for numerical responses, proportion and contingency tests for nominal responses, and risk or odds measures for association.

The table is organized by design as well as measurement scale. Similar-looking data summaries can require different methods when one uses paired observations or category counts.

Use a short identification sequence: what was measured, which groups were sampled, and what population comparison is being asked? That leads from the study description to the appropriate calculation.

## 65 | Final preparation follows the announced exam rules
The closing page repeats the ninety-minute Monday exam and the six-to-eight-question format. Probability accounts for two or three announced questions, so it needs practice alongside the inference methods.

The permitted notes are two double-sided letter sheets. Statistical tables must be brought separately without notes, and the calculator must be a standalone device rather than a phone.

The scope ends at Session 13, with the errors-and-power lecture excluded. Use the lecture, homework, reading, and review problems to rehearse selecting methods, showing calculations, consulting tables, and stating conclusions in context.
