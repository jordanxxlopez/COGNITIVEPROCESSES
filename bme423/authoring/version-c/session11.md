## 1 | Comparing proportions instead of means
A nominal outcome places each person in a category, such as lived or died. Count the people in each category and divide by the relevant group total to obtain proportions.

A comparison of two proportions asks whether the population chances of the specified outcome are equal. The z statistic scales the observed proportion difference by its sampling uncertainty.

The lecture then introduces Yates's continuity correction for the course's two-by-two comparisons. The anesthetic and aspirin examples show how the same categorical framework applies to different clinical outcomes.

## 2 | Find the nominal-data branch of the chooser
The highlighted nominal-data branch applies when the response is category membership rather than a measured numerical quantity. With two independent groups, a proportion test or two-by-two contingency analysis can address a binary outcome.

The numerical-data branch still contains the unpaired t test and ANOVA. Those compare means of measurements, so they answer a different kind of question.

Begin with what was recorded for each subject. A zero-or-one code for an outcome does not turn that clinical category into an ordinary continuous measurement.

## 3 | Counts become group-specific outcome rates
The anesthetic table separates lived and died outcomes for halothane and morphine. Each row's total is the denominator for that treatment group's death proportion.

The numbers of deaths cannot be compared fairly without those totals because the groups contain different numbers of subjects. A proportion expresses deaths relative to how many people were at risk in that group.

The question is whether the population death probabilities differ between anesthetic groups. Nominal outcomes support a count-and-proportion analysis, while an ordered pain score would carry an additional ranking structure.

## 4 | Two categories cover the population
Fifty of the two hundred individuals are left-footed, with the remainder right-footed. These categories are mutually exclusive: one individual belongs to only one of the two groups in this model.

They are also exhaustive, so every individual is counted somewhere. The proportion in one category determines the other as the remainder from one.

The population proportion is the number with the attribute divided by the full population size. It describes how likely a randomly selected individual is to have that attribute.

## 5 | A zero-one mean is a proportion
Code the attribute as one when present and zero when absent. Adding those codes simply counts how many individuals have the attribute, because only the ones contribute.

Dividing that sum by the population size therefore produces the population proportion. The mean of this binary random variable is the probability of the coded-one outcome.

Attach the outcome label to the code. A mean proportion of deaths and a mean proportion of survivors refer to opposite events even though the mathematical structure is the same.

## 6 | Variance of a binary outcome
For a zero-one variable, squaring an outcome leaves it unchanged. Both its ordinary mean and its expected squared value therefore equal the probability of one.

Subtracting the squared mean from the expected squared value gives binary population variance. It depends on both the coded-one probability and its complement.

This is variation among individual binary outcomes. It is not yet the smaller uncertainty in a sample proportion, which will also depend on how many individuals are sampled.

## 7 | Deriving binary mean and variance from probabilities
The probability function gives zero a weight of one minus the event probability and one a weight equal to the event probability. Their weighted average is the event probability itself.

For variance, measure each outcome's distance from that mean, square it, and apply the same two weights. Both possible outcomes contribute to the spread.

The simplified result is the product of the event probability and its complement. This connects the binary formula directly to the general expected-squared-distance definition already used for other random variables.

## 8 | Binary spread is greatest near an even split
When almost everyone is in the same category, the binary values barely vary. At a probability of zero or one, all individuals have the same code and the spread is zero.

Near an even split, both zero and one occur frequently. That produces the largest individual spread for this coding.

The plotted curve shows standard deviation as the square root of binary variance. Its maximum occurs at a population proportion of one half, rather than increasing continuously as the proportion moves toward one.

## 9 | A sample proportion fluctuates with selection
The full population contains a fixed left-footed proportion. A sample of ten contains only the individuals actually selected, so its category count may not match that population proportion exactly.

Code the sampled attribute as one or zero and count the ones. Dividing by ten gives this sample's estimate of the population probability.

Another random sample can give a different count and proportion. This sampling fluctuation is why estimating a proportion also requires describing the uncertainty of that estimate.

## 10 | Estimate a population probability with the sample count
The sample contains a specified number of coded-one outcomes among all sampled subjects. Their ratio is the sample proportion, often read as p-hat.

Use that estimate in place of the unknown population probability to estimate individual binary variance. The product with its complement describes variation of zero-one outcomes under the fitted probability model.

Keep count, sample size, and proportion separate. The count changes with how many people are observed, while the proportion expresses the count relative to its denominator.

## 11 | Standard error of an estimated proportion
The sample proportion is the average of the zero-one observations. Its sampling variance is therefore the individual binary variance divided by sample size.

Taking the square root gives the standard error of the proportion. This describes how much estimated proportions would vary across repeated samples of the same size.

A larger sample reduces that uncertainty without necessarily changing the underlying event probability. Distinguish individual binary spread from the precision of its estimated population proportion.

## 12 | Death proportions in the anesthetic samples
For halothane, count eight deaths among sixty-one subjects; for morphine, count ten among sixty-seven. Each ratio estimates its group's population death probability.

The estimated standard errors are similar because the proportions and sample sizes are fairly close. They describe precision of the estimated death rates, not the variability of an individual's survival status.

For the binary spread calculation, multiply each proportion by its own complement. The original halothane variance and standard-deviation line contains an arithmetic error; the displayed death count and proportion should remain the starting point for the calculation.

## 13 | Standardize the difference of proportions
Subtract the two sample proportions to describe the observed group gap. The denominator measures how much such a difference can fluctuate because of sampling.

The initial form combines the two groups' separate variance contributions. Both sample sizes matter because both estimated proportions are uncertain.

An approximately standard Normal reference converts the standardized gap into a test decision. For a two-sided comparison, a large magnitude in either direction supplies evidence against equal population proportions.

## 14 | Pool the event probability under equality
Under the null hypothesis, the two groups share one population event probability. Estimate it by combining their event counts and dividing by their combined sample size.

Use that pooled probability and its complement in the standard error of the difference. The reciprocal sample sizes still account for how much information each group supplies.

Pooling applies to the null-model uncertainty, while the numerator retains the observed difference between the two sample proportions. The two roles should not be interchanged.

## 15 | Yates correction for the two-by-two comparison
The observed outcome counts are discrete, while the z reference is continuous. The course applies Yates's correction to its two-by-two comparisons to account for that difference.

The correction reduces the absolute observed proportion gap before it is divided by its pooled standard error. Keep it in the numerator rather than changing the group counts or the pooled probability.

Compare the resulting magnitude with a two-sided Normal cutoff. The infinite-degrees-of-freedom row of the supplied two-tailed t table gives those same Normal critical magnitudes.

## 16 | State the anesthetic proportion hypothesis
The halothane and morphine rows record two outcomes, lived or died. This is a two-group comparison of a binary event.

Define the event as death and state that its population proportion is equal in the two anesthetic groups under the null. The alternative allows either treatment group to have a different rate.

Use each row total when estimating its death proportion. Then combine the death counts and group totals for the pooled null estimate used in the corrected test.

## 17 | The corrected anesthetic z is near zero
The estimated death proportions are close, and the continuity correction further reduces their observed absolute gap. The displayed corrected statistic has a very small magnitude.

Such a value lies near the center of the null reference distribution rather than in an extreme tail. It does not meet the rejection criterion.

Do not reject equal population death proportions for these data. Keep this conclusion separate from the earlier cardiac-index comparison: the groups are similar, but the outcome and statistical method differ.

## 18 | Use the Normal row for the proportion z cutoff
The highlighted bottom row is the limiting t distribution at infinitely many degrees of freedom, which matches the standard Normal reference. It provides critical magnitudes for the z test.

Choose the column for the intended two-tailed significance level. The 5% column gives the familiar critical magnitude near 1.96.

The categorical z statistic does not use the small-sample t degrees of freedom from the two-sample mean test. This table row is being used as a convenient source of Normal cutoffs.

## 19 | Aspirin and placebo: define the thrombus event
The table records whether dialysis patients developed thrombi. There are separate totals for the placebo and aspirin groups.

The placebo group has eighteen events among twenty-five patients, while the aspirin group has six among nineteen. Compare rates within their own denominators rather than only comparing the event counts.

The null states that the two population thrombus probabilities are equal. The observed lower aspirin rate is the difference whose sampling uncertainty the corrected z test will evaluate.

## 20 | Calculate the corrected aspirin-versus-placebo z
Calculate each event proportion, then pool all thrombus events across the combined group size. The pooled event probability is a little above one half.

Subtract the continuity correction from the absolute difference of the two sample proportions. Divide that corrected gap by the standard error built from the pooled probability and both group sizes.

The result is a z magnitude around 2.36. Carry the proportions without early rounding; the original display abbreviates the pooled value, but the pooled count ratio supplies the more accurate calculation.

## 21 | Interpret the aspirin proportion-test result
The corrected z magnitude exceeds the 5% two-sided Normal cutoff. It also exceeds the displayed cutoff for a total two-tailed level of 0.02.

Reject equal population thrombus probabilities. The sample event rate is lower in the aspirin group, which gives the direction of the observed difference.

The statistic establishes evidence of a difference, while the group proportions describe its size. Later relative-risk and absolute-risk calculations express that size in clinically interpretable terms.

## 22 | Adverse reactions to anesthetic gel
The exercise compares topical anesthetic gel with placebo cream during arterial blood sampling. The recorded outcome is whether an adverse reaction occurred within the observation period.

Three of thirty-six gel recipients and eight of forty placebo recipients had a reaction. Each subject contributes one binary outcome, making this a two-by-two proportion comparison.

State the equal-population-reaction-rate null, calculate the two proportions and pooled event rate, and apply the course's continuity correction. Use the resulting statistic to decide whether the observed rate difference exceeds sampling variation at the chosen level.
