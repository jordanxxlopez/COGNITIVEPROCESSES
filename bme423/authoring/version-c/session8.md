## 1 | Two groups and one reference value
With two independent groups, the t test compares the difference between sample means with the uncertainty in that difference. Larger sample scatter makes the same observed gap less convincing.

The fasting-glucose and anesthetic examples apply this comparison to different biomedical measurements. The ingredients remain group means, group spreads, and sample sizes.

A one-sample t test instead compares one sample mean with a fixed reference value. Identify whether the question supplies a second sampled group or a single benchmark before choosing the calculation.

## 2 | Using Homework 1 to connect the methods
The discussion is organized around explaining Homework 1 and resolving questions about the material. Start each problem by identifying what is random and what quantity the question asks for.

A probability question may ask for an area, a cutoff, an expectation, or a variance. Those answers have different meanings even when they begin with the same distribution.

Keep the given values beside their labels while working. That makes it easier to connect a homework problem to the appropriate course method without treating every expression as a new formula to memorize.

## 3 | Why a larger sample clarifies the same group difference
The diagrams compare urine production in placebo and drug groups, first with five subjects per group and then with twenty. The average separation can look similar while its uncertainty changes.

A sample mean becomes more stable as more independent individuals contribute to it. The standard error shrinks with the square root of sample size, even when individual urine-production values remain scattered.

Thus sample size changes how precisely the group centers are estimated. The t test uses that precision when judging whether an observed mean difference is unusually large.

## 4 | Difference divided by uncertainty in the difference
The numerator is the observed gap between the two sample means. The denominator is the standard error of that gap, describing how much the difference would fluctuate across repeated sampling.

A larger gap increases the magnitude of t. A larger standard error decreases it because a given difference is less surprising when sample differences naturally fluctuate more.

The sign records the chosen group order. For a two-sided test, evidence depends on the magnitude of the separation, so compare the absolute t value with the positive critical value.

## 5 | Combining the uncertainty from two sample means
Each sample mean has its own standard error, obtained from its group spread and sample size. The difference between two means depends on both uncertain estimates.

For independent groups, the variances of the two means add to give the variance of their difference. Take a square root only after adding those variance contributions.

This is why the denominator is not merely the difference between the groups' standard deviations. It describes uncertainty in a difference of averages, with both sample sizes included.

## 6 | Means of sums and differences
When two variables are added, their expected values add. When one is subtracted from the other, the corresponding expected value is subtracted too.

The integral illustration separates each variable's contribution. Integrating the other variable's density gives one, leaving the appropriate original mean.

For a group comparison, the expected difference of sample means is the difference of the population means. Under the equal-means null hypothesis, that expected difference is zero.

## 7 | Why variances add even for a difference
A difference between independent variables still receives random variation from both of them. One variable may move the difference upward while the other moves it downward, but both add uncertainty.

In the squared-deviation calculation, the subtraction sign is squared. Independence removes the cross-dependence term, leaving the sum of the two variance contributions.

Thus subtracting means and combining uncertainty follow different rules. The centers subtract, while the independent variance contributions add before a standard deviation is obtained.

## 8 | Pooling the two groups' variance estimates
The denominator begins with the variance of each sample mean. Under the equal-population-variance model, both groups estimate the same underlying individual variance.

A pooled variance combines their estimates, weighting each by its degrees of freedom. The larger group contributes more information rather than receiving equal weight automatically.

Substitute that shared estimate into the standard error of the mean difference. This is the pooled two-sample t procedure taught here, with a denominator based on both sample sizes.

## 9 | Set up the independent two-sample t test
There are two treatment groups made up of different individuals. The null hypothesis states that their population means are equal.

Compute or identify each group's sample mean, sample variance, and sample size. These quantities describe the observed center, individual variation, and amount of information in each group.

The sample means provide the observed difference. The variances and sizes provide its estimated uncertainty, which is why none of those ingredients should be omitted when assembling the test.

## 10 | Calculate pooled variance, then t
Weight each sample variance by its sample size minus one, add those weighted contributions, and divide by the combined degrees of freedom. This produces the pooled individual-variance estimate.

Use it with the two reciprocal sample sizes to calculate the standard error of the difference. Divide the mean difference by that standard error to obtain t.

The degrees of freedom equal the two sample sizes added together, minus two. Carry that value into the table lookup rather than using either group's sample size alone.

## 11 | Two-sided decision and t-test conditions
The two-sided test checks for differences in either direction. Compare the absolute observed t with the critical value from the two-tailed table.

The pooled procedure assumes independent random samples from Normal populations with equal variances, measured on a numerical interval scale. These conditions support its particular denominator and reference distribution.

If the magnitude exceeds the table cutoff, reject equal population means at the chosen significance level. State which measured outcome differs between which groups rather than reporting a bare rejection.

## 12 | Why the rejection region has two tails
Repeated samples under equal population means produce positive and negative t values around zero. Large positive or negative values both represent a large separation from the null expectation.

The shaded outer regions mark unusually large magnitudes. A stricter significance level moves the boundaries farther from zero, requiring stronger observed separation for rejection.

The absolute-value comparison combines those two tails into one rule. It lets a negative observed statistic be evaluated against the same positive critical magnitude as a positive statistic.

## 13 | Reading the two-tailed t table
Choose the row for the test's degrees of freedom and the column for the desired total two-tailed significance level. Their intersection gives the critical magnitude.

Small degrees of freedom require larger cutoffs because estimating spread from limited data adds uncertainty. As degrees of freedom increase, the critical values approach the familiar Normal cutoffs.

Check the table heading before selecting a column. A two-tailed probability is shared across both extreme tails, so it must not be confused with the probability in one tail alone.

## 14 | Gosset and Student's t
William Sealy Gosset published the work shown under the name Student. The article concerns uncertainty in an estimated mean, which is the central problem behind the t distribution.

With a small sample, the population spread is usually unknown and must be estimated from the same data. That estimated spread varies across samples and adds uncertainty to the standardized mean.

The t reference accommodates that extra uncertainty through its degrees of freedom. The historical page connects the name Student's t with this practical problem of learning about a mean from limited observations.

## 15 | Fasting glucose in two groups of children
The comparison is between children with and without a diabetic parent. Each plotted point is a child's fasting-glucose measurement, and each group has 25 observations.

The group with a diabetic parent has the higher sample mean. The standard deviations describe the scatter of children around their respective group means.

The statistical question asks whether that separation is large compared with its sampling uncertainty. Equal sample sizes simplify the pooled variance, but the test still needs both groups' spreads and means.

## 16 | Completing the fasting-glucose test
The pooled variance combines the two group variances, then the standard error accounts for the two sample sizes. Dividing the mean gap by that error gives a t magnitude near six.

The combined sample sizes produce 48 degrees of freedom. The statistic exceeds even the displayed critical magnitude for a two-tailed significance level of 0.001.

Reject equal population mean fasting glucose for these groups. The source's displayed t is rounded; the conclusion is unchanged when the reported means and standard deviations are calculated without early rounding.

## 17 | Choosing cardiac index from the anesthetic table
The table compares halothane and morphine groups and reports several cardiovascular measurements. The highlighted response for this example is cardiac index.

The groups have different sample sizes, so pool their variances using degrees-of-freedom weights. Use the cardiac-index mean and standard deviation from each column, rather than mixing rows for different physiological outcomes.

The null hypothesis concerns equal population mean cardiac index under the two anesthetic conditions. Blood pressure and peripheral resistance are separate outcomes in the same table.

## 18 | Organizing the halothane-versus-morphine calculation
Fill in pooled variance first using the cardiac-index standard deviations and sample sizes. That establishes the shared background variation for this response.

Next calculate the standard error of the difference and the observed t. Obtain degrees of freedom by adding the two sample sizes and subtracting two.

Finally select the two-tailed critical value and compare magnitudes. The blanks separate the data calculation from the reference-table decision so each ingredient can be checked independently.

## 19 | The cardiac-index difference is not significant
The pooled cardiac-index variance is about 0.889, producing a t magnitude around 0.840. The reference distribution has 23 degrees of freedom.

The 5% two-tailed critical magnitude is about 2.069. The observed statistic is smaller, so do not reject equal population mean cardiac index.

The sample means differ numerically, but the gap is small relative to its estimated uncertainty. The conclusion concerns cardiac index for these anesthetic groups, not every cardiovascular quantity listed in the earlier table.

## 20 | One sample compared with a fixed benchmark
A one-sample t test has one group of measured individuals and one specified reference mean. The benchmark is not a second sample with its own estimated spread.

Calculate the sample mean and sample variance from the group. The null hypothesis states that its population mean equals the reference value.

The numerator will compare the observed mean with that fixed benchmark. Its denominator therefore uses uncertainty in this one sample mean rather than combining two sampled groups.

## 21 | One-sample t and its reference distribution
Subtract the reference mean from the sample mean, then divide by the estimated standard error of the sample mean. The result measures the observed discrepancy in standard-error units.

One estimated sample mean leaves sample size minus one degrees of freedom for the t reference. Use that row in the two-tailed table.

Compare the absolute statistic with the critical magnitude. A difference in either direction can count as evidence against the specified population mean.

## 22 | Heart rate compared with 72 beats per minute
Five students provide a sample mean of 76.8 beats per minute. Their sample standard deviation is 4.15, while 72 is the fixed population-mean value being tested.

The null states that the population mean heart rate equals 72; the alternative allows it to differ in either direction. The observed mean is above the benchmark.

The next calculation asks whether that upward discrepancy is large relative to the uncertainty in a mean based on only five students. Keep the sample standard deviation separate from the smaller standard error.

## 23 | Calculate the one-sample heart-rate statistic
The numerator is the sample mean minus 72, giving a discrepancy of 4.8 beats per minute. The denominator is the sample standard deviation divided by the square root of five.

That standard error is about 1.856 beats per minute. Dividing the discrepancy by it gives t near 2.586.

Five observations give four degrees of freedom. The units cancel in the ratio, leaving a statistic that can be compared with a t-table critical value.

## 24 | Finish the one-sample heart-rate decision
For four degrees of freedom, the two-tailed 5% critical magnitude is about 2.776. The observed magnitude, 2.586, is slightly smaller.

Do not reject the hypothesis that the population mean heart rate is 72 beats per minute. The sample's higher average does not cross this test's rejection boundary.

This example shows why the table step matters. A t value greater than two is not automatically significant when the degrees of freedom are small.
