## 1 | Finding differences after an overall comparison
ANOVA can show that the population means are not all equal, but it does not identify the differing pairs. Follow-up comparisons address those more specific questions.

Testing many pairs creates more opportunities for a false positive. Bonferroni and Holm adjust the comparison thresholds to control error across the set of tests.

The p value describes how extreme a statistic would be under the null model. Keep that reference condition attached: it is not the probability that the null hypothesis itself is true.

## 2 | What the overall ANOVA establishes
The F statistic compares the between-groups and within-groups variance estimates. Its reference distribution uses separate numerator and denominator degrees of freedom.

A sufficiently large F rejects the hypothesis that all population means are equal. That conclusion establishes an overall difference somewhere in the group set.

The result does not specify which pair supplies the difference. The next stage uses the within-groups estimate to examine selected pairs while controlling the error from multiple comparisons.

## 3 | Why repeated ordinary t tests need care
A two-group t test compares a mean difference with its standard error. Used once at a chosen significance level, it has the corresponding null rejection rule.

Applying that same rule separately to many pairs creates a family of decisions. More decisions give more chances to label a difference significant when the relevant null is true.

A multiple-comparison procedure changes the thresholds for that family. The issue is the collection of tests and its error control, rather than a change in the meaning of an individual mean difference.

## 4 | Three separate pairwise tests on three groups
The example compares placebo, testosterone, and estrogen using separate ordinary t tests. Only the placebo-versus-testosterone statistic exceeds the displayed unadjusted cutoff.

That pattern does not make significance transitive: a nonsignificant result for two other pairs does not prove those population means are equal. The sample comparisons have their own uncertainty.

The central problem is using unadjusted tests across a family of comparisons. The later procedures use a common ANOVA error estimate and adjusted thresholds instead of treating every pair as an isolated test.

## 5 | Reusing ANOVA's within-groups variance
After ANOVA, use its within-groups variance estimate in the standard error for each pair of means. This pools background information across the original groups.

The degrees of freedom stay attached to that estimate. Use the ANOVA residual degrees of freedom, rather than calculating a new two-group denominator for each selected pair.

With equal group sizes, the standard-error expression simplifies. With different sizes, each selected group's reciprocal sample size remains in the expression, but the shared error estimate still comes from ANOVA.

## 6 | Bonferroni divides the error allowance
Choose an overall significance level for the complete family of comparisons. Divide it by the number of comparisons to obtain the level used for each individual test.

More comparisons produce a smaller per-test level and therefore a larger critical t magnitude. The evidence required for each pair becomes stricter.

The mean differences and their standard errors are calculated as before using the ANOVA error estimate. Bonferroni changes the decision threshold, rather than shrinking or enlarging the observed differences.

## 7 | Activity groups and HDL: the overall result
The groups are marathon runners, joggers, and inactive men, with HDL concentration as the measured response. Each group has seventy subjects.

Their sample means are separated, and the overall ANOVA gives a large F relative to its reference boundary. The equal-population-means null is rejected.

The within-groups variance and its 207 degrees of freedom will support the follow-up tests. The task now changes from asking whether any difference exists to identifying which activity-group pairs differ.

## 8 | Bonferroni for all three HDL pairs
Three groups produce three distinct pairwise comparisons. Dividing the overall error allowance among those three gives one shared adjusted significance level.

Each mean gap is divided by the standard error based on the ANOVA within-groups variance. Because the group sizes match, the same denominator applies to all three gaps.

All three observed t magnitudes exceed the adjusted critical value. The results support differences between runners and joggers, runners and inactive men, and joggers and inactive men under this familywise procedure.

## 9 | Holm tests the strongest evidence first
Holm begins with the most significant comparison, which has the largest absolute t when all comparisons share the same reference degrees of freedom. It uses the strictest threshold first.

If that comparison passes, the next comparison uses a slightly larger significance level. The allowed level increases as fewer hypotheses remain to be considered.

Stop at the first comparison that fails its threshold and do not reject the remaining hypotheses. This ordered rule is essential; the comparisons cannot be assigned thresholds in an arbitrary original order.

## 10 | Reuse the same HDL ANOVA for Holm
The HDL group means, standard deviations, and sample sizes have not changed. The overall ANOVA still rejects equal population means.

Its within-groups estimate and residual degrees of freedom remain the basis for the follow-up t statistics. Switching to Holm does not require recomputing the group data with a new background variance.

What changes is the sequence of thresholds. Arrange the pairwise evidence from strongest to weakest before deciding which significance level applies to each pair.

## 11 | Holm across the three HDL comparisons
The runner-versus-inactive gap gives the largest t magnitude, followed by jogger-versus-inactive and then runner-versus-jogger. This is the order used for Holm's steps.

The first comparison uses the most restrictive level. Each successful rejection permits the next comparison to use a less restrictive threshold while retaining the same residual degrees of freedom.

All three comparisons pass their respective thresholds in this example. The last comparison faces a smaller critical magnitude than under Bonferroni because Holm has already dealt with the stronger comparisons.

## 12 | Bonferroni when only controls are compared
A control-comparison family contains only the selected treatment-versus-control pairs. It does not automatically include every possible pair among the groups.

Count the comparisons actually being tested, then divide the overall significance level by that count. The family definition determines the adjustment.

The t calculation still uses each treatment-control mean difference and the shared ANOVA within-groups variance. Restricting the comparison family changes the number of tests, not the outcome measurements themselves.

## 13 | Two HDL comparisons against the inactive control
The inactive group acts as the control. The selected comparisons are runners versus inactive men and joggers versus inactive men; runners versus joggers is not part of this family.

There are now two comparisons, so Bonferroni divides the overall significance level by two. This gives a less restrictive per-comparison threshold than dividing it among all three pairs.

Both selected differences exceed the adjusted critical magnitude. The conclusion addresses the two activity groups relative to the inactive control, without adding a result for the omitted pair.

## 14 | Holm for the two control comparisons
Order the two treatment-control comparisons by strength of evidence. The larger runner-versus-inactive t magnitude is tested first.

Its initial threshold uses the overall level divided by two. Once it passes, the remaining jogger-versus-inactive comparison uses the full overall level for its Holm step.

Both comparisons reject their equal-means hypotheses. Keep the ordered decisions attached to their group labels so that the correct threshold and conclusion remain paired with each comparison.

## 15 | Matching R t-test functions to their questions
The independent-samples function compares two groups of different individuals. The one-sample function compares one group's mean with a specified reference value.

The post-hoc function uses an existing ANOVA result for pairwise comparisons. Its role includes carrying the shared background variance into the follow-up analysis.

The generic t.test function can represent different tests depending on its arguments. Interpret the design and output rather than assuming the function name alone tells you whether the data were paired, independent, or compared with a reference.

## 16 | Work the five-comparison Holm exercise in order
Sort the five t magnitudes from largest to smallest while preserving their comparison labels. The supplied residual degrees of freedom determine the t reference for every step.

Begin with the overall level divided by five, then use successive Holm levels only while earlier tests pass. A comparison that fails stops further rejection in the sequence.

The largest two magnitudes pass their respective thresholds, and the next does not. The remaining comparisons are therefore not rejected; they are not restarted later with more permissive thresholds.
