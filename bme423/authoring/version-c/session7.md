## 1 | ANOVA from a method to complete examples
This lecture consolidates the balanced ANOVA procedure and applies it to heart rate and lung function. In each application, identify the numerical response and the groups before calculating.

The sum-of-squares framework expresses the same within-versus-between comparison in another notation. It also accommodates unequal group sizes, although hand calculation of that framework is outside this midterm.

The R section shows how group and residual rows represent the two sources of variation. Reading those rows connects software output to the variance comparison already developed by hand.

## 2 | The equal-means population picture
The diet labels are mixed throughout one common cardiac-output distribution. The full hypothetical population therefore illustrates the null case in which diet does not shift the population mean.

Individual measurements still vary. Equal population means do not mean every individual has the same cardiac output.

This distinction explains why observed samples can show different averages under the null. The test asks whether that sample separation is excessive relative to the variation already present among individuals.

## 3 | What the sampled diet groups show
The sample means mark the centers of four small diet groups, and the standard deviations summarize the spread inside those groups. Some separation of sample means is expected from random selection.

The central question compares that separation with the scatter among individuals. Large individual scatter makes modest differences between group means less surprising.

The within-groups and between-groups estimates turn those two visual features into comparable quantities. Neither a gap between two means nor a wide individual range alone supplies the full ANOVA answer.

## 4 | Comparing group centers on a shared scale
The bottom summary brings the group means together, while the upper rows retain the individual observations. This separates the variability of averages from the variability of individual people.

Averages based on several independent observations should fluctuate less than individual observations. The expected reduction depends on how many individuals contribute to each mean.

The picture asks whether the observed scatter of means agrees with that expected sampling scatter. The F ratio will be large when the centers are separated beyond what the within-group variation predicts.

## 5 | Begin with the hypotheses and group summaries
The null hypothesis states that all population group means are equal. The alternative requires at least one pair of population means to differ, rather than requiring every group to differ from every other group.

Calculate each sample's mean and variance. The mean describes its center, and the variance describes individual scatter around that group's own center.

Keep \(m\) (number of groups) separate from \(n\) (subjects per group). Both enter the balanced calculation, but they count different things.

## 6 | Put within-group and between-group variation on one scale
Average the equally sized groups' variances to obtain the within-groups estimate. Then average the group means to obtain the grand mean.

Calculate the variance of the group means around that grand mean. This quantity measures the scatter of averages, so it is smaller in scale than the variance of individuals under the null.

Multiply it by the common group size to obtain the between-groups estimate of population variance. The two estimates are now ready to form a meaningful ratio.

## 7 | Finish ANOVA with F and its degrees of freedom
Divide the between-groups estimate by the within-groups estimate. The result measures how large the group separation is relative to the background scatter.

The numerator degrees of freedom equal the number of groups minus one. The denominator degrees of freedom add the within-group contributions across all groups.

Use those two degrees of freedom and the significance level to find the upper-tail F critical value. Reject equal population means only when the observed ratio exceeds that boundary.

## 8 | Conditions behind the ANOVA comparison
The response must be numerical interval data, and observations must come from independent, randomly selected samples. Independence concerns how observations are obtained, rather than whether the sample means happen to be close.

The method assumes Normal populations with equal population variances. Equal variances provide the common background spread that both variance estimates are trying to measure.

The upper-tail F picture applies under these conditions and the null hypothesis. Keep the assumptions attached to the method before interpreting its calculated ratio.

## 9 | Set up the cat-versus-dog heart-rate comparison
Five students are sampled from each pet-preference group. The measured response is heart rate, and the null hypothesis says the two population mean heart rates are equal.

The sample means are 74.2 and 76.8 beats per minute. The reported standard deviations must be squared before they enter the within-groups variance calculation.

The small difference between means is the feature being tested. Its importance depends on how large it is relative to within-group scatter and the sample sizes.

## 10 | Heart-rate ANOVA: within-group variance
This step averages the squared standard deviations of the two equally sized groups. The result, 68.05, estimates the shared variation among individual heart rates.

Use each group's spread around its own mean. Do not include the difference between the two group means in this within-group calculation.

The result is in squared beats-per-minute units. It will become the denominator of F, supplying the background variation against which the separation of the means is judged.

## 11 | Heart-rate ANOVA: the grand mean
Average the two sample means because both groups contain the same number of students. The grand mean is 75.5 beats per minute.

This value is the center of the group means. It supplies the reference point for measuring how far each group's mean lies from the overall center.

The grand mean is not an extra sample and does not add more observations. It is a summary calculated from the existing groups before their between-group variation is measured.

## 12 | Heart-rate ANOVA: variance of the means
Subtract the grand mean from each group mean. One group lies below it and the other lies above it, with equal distances in this two-group example.

Square the distances, add them, and divide by the number of group means minus one. The resulting 3.38 describes variation among the means.

This is not yet the between-groups estimate on the individual-variance scale. The next step accounts for the fact that each displayed mean averages five students.

## 13 | Heart-rate ANOVA: rescale by group size
Multiply the variance of the two group means by five, the number of students contributing to each mean. The between-groups variance estimate becomes 16.9.

The multiplication reverses the usual reduction in variability caused by averaging. It lets this estimate be compared directly with the within-groups estimate of 68.05.

Both quantities now estimate individual population variance under the null hypothesis. Their ratio will reveal whether the observed mean separation is large compared with the within-group variation.

## 14 | Heart-rate ANOVA: organize the decision
The calculation now moves from the two variance estimates to their ratio. Place the between-groups estimate above the within-groups estimate.

Next select a critical F value using the number of groups and the number of subjects per group. The significance level specifies the small upper-tail region used for rejection.

The decision requires comparing the statistic with that boundary. Keep these as distinct steps: calculate what the data produced, find what the null reference allows, then state the conclusion.

## 15 | Heart-rate ANOVA: calculate F and degrees of freedom
Dividing 16.9 by 68.05 gives an F value near 0.248. The between-groups estimate is smaller than the within-groups estimate in this sample.

Two groups give one numerator degree of freedom. Two groups of five give eight denominator degrees of freedom.

Those degrees of freedom select the relevant F reference distribution. The statistic is not interpreted as a probability; it must be compared with a table boundary for that distribution.

## 16 | Heart-rate ANOVA: find the table cutoff
For numerator degrees of freedom one and denominator degrees of freedom eight, the displayed 5% critical F value is 5.32. This marks the upper-tail rejection boundary.

The observed F is about 0.248, far below that boundary. The ratio therefore does not fall into the unusually large region specified by the test.

The table lookup depends on both degrees of freedom. Reversing their roles would select a different distribution and could give the wrong decision boundary.

## 17 | Heart-rate ANOVA: state the result
The observed F does not exceed the critical value, so do not reject the equal-population-means hypothesis. These sample data do not establish a heart-rate difference between the pet-preference groups.

The sample averages are still different numerically. The test says that this separation is not sufficiently large relative to the observed within-group variation.

State the conclusion in terms of the measured response and groups. The outcome is heart rate among cat-preferring and dog-preferring students, rather than a general statement about pet preference.

## 18 | Lung function and tobacco exposure
Forced mid-expiratory flow measures how rapidly air leaves the lungs during part of a forced expiration. Reduced flow is associated with small-airways disease in this example.

Five groups represent different tobacco-pollutant exposures, with the same number of subjects in each. The null hypothesis says their population mean lung-function measurements are equal.

This is another balanced one-way ANOVA setup. The biological meaning changes from heart rate to lung flow, but the comparison still weighs differences among group means against variation within groups.

## 19 | Lung-function ANOVA: background variation
Square each group's standard deviation and average the five variances. The highlighted within-groups estimate is 0.52 in squared flow units.

This quantity describes individual variation within exposure groups. It is calculated separately from any separation between their average lung-function values.

Because every group has the same size, the simple average of variances is appropriate for this formulation. It supplies the denominator when the F ratio is assembled.

## 20 | Lung-function ANOVA: locate the overall center
The highlighted calculation averages the five group means to obtain a grand mean of 2.59 liters per second. Equal group sizes give each mean the same weight.

That overall center is the reference for the next calculation. Each group's mean will be compared with 2.59, rather than with another group's mean alone.

The grand mean remains in the original flow units. Squared units appear only when the distances from that center are squared to describe variation.

## 21 | Lung-function ANOVA: quantify the mean separation
Subtract the grand mean from each of the five group means. Square those distances, add them, and divide by four to calculate the variance of the means.

The highlighted result summarizes how widely the exposure-group averages are spread. It concerns five means, each of which summarizes many individuals.

That distinction explains the next multiplication by group size. The variance of means must be rescaled before it can be compared with the within-groups estimate of individual variation.

## 22 | Lung-function ANOVA: obtain the between-groups estimate
Multiply the variance of the group means by the common group size of 200. The highlighted between-groups estimate is approximately 33.3.

This estimate is now on the same squared-flow scale as the within-groups estimate. Both would estimate a common population variance if the population means were equal.

Here the between-groups estimate is much larger than the background within-group estimate. That contrast is what produces a large F statistic in the next step.

## 23 | Lung-function ANOVA: move from estimates to a test
The two variance estimates have been assembled, so divide between-group variation by within-group variation. This expresses their contrast as one dimensionless F ratio.

The group count and group size determine the reference distribution. They supply separate numerator and denominator degrees of freedom for the table lookup.

Finally compare the ratio with the chosen upper-tail boundary. This page organizes the decision sequence rather than introducing a different way to measure lung function.

## 24 | Lung-function ANOVA: compare with bounded table values
The calculated F is about 64.18, with four numerator and 995 denominator degrees of freedom. Its size reflects the large between-group estimate relative to the within-group estimate.

The exact denominator row is not displayed in the table, so the slide uses nearby tabulated bounds. Both relevant critical values are only a little above three at the stated level.

The observed statistic exceeds either bound by a wide margin. An exact interpolated cutoff is unnecessary for deciding which side of the rejection boundary this result occupies.

## 25 | Lung-function ANOVA: interpret rejection
Reject the null hypothesis of equal population means for the tobacco-exposure groups. The displayed comparison supports a lung-function difference somewhere among those groups.

ANOVA combines information across all groups into one overall test. Its rejection does not by itself identify which exposure pairs differ.

Keep the response in the conclusion: forced expiratory flow differs among the groups at the stated significance level. Pairwise follow-up methods later isolate particular differences.

## 26 | Two subscripts identify group and subject
The first subscript identifies the treatment group, and the second identifies a person within that group. This lets each measurement retain both pieces of information.

A separate group-size symbol allows different groups to contain different numbers of subjects. The total sample size then combines those group counts.

This notation prepares the sum-of-squares formulation. It describes the same measured data more explicitly, without changing what within-group variation or between-group separation means.

## 27 | From group variance to a sum of squared deviations
For each group, calculate its mean, then subtract that mean from every observation in the group. Squaring and adding those distances gives the group's sum of squares.

Unlike a sample variance, a sum of squares has not yet been divided by degrees of freedom. It preserves the total squared variation contributed by that group.

Keeping these totals allows groups of different sizes to contribute appropriately. The group means still provide the centers around which within-group distances are measured.

## 28 | Combining within-group sums of squares
Add the individual groups' sums of squares to obtain the total within-groups sum of squares. Every observation contributes through its distance from its own group mean.

Divide that total by the within-groups degrees of freedom to get the within-groups mean square. This mean square is another notation for the within-groups variance estimate.

The denominator uses total subjects minus groups because one mean has been estimated within each group. Read sum of squares as total squared variation and mean square as variation adjusted for its degrees of freedom.

## 29 | Between-group sums of squares and mean square
The between-groups calculation uses the distances of group means from the grand mean. Group size weights those distances so that a larger group contributes according to its number of observations.

Dividing the resulting sum of squares by the number of groups minus one gives the between-groups mean square. That is the numerator variance estimate in ANOVA.

The compact expression shown is an algebraic way to assemble the same quantity. Keep its purpose visible: measuring group-center separation after accounting for how many observations each center represents.

## 30 | F from mean squares
Divide the between-groups mean square by the within-groups mean square. This is the same F comparison used in the balanced variance formulation.

The numerator degrees of freedom are the between-groups degrees of freedom. The denominator degrees of freedom are total observations minus the number of groups.

Use the F table to compare the resulting statistic with its upper-tail critical value. A new notation for the components does not change the direction of the rejection rule.

## 31 | Reading the complete squared-error framework
The left side gathers variation within groups, and the right side gathers variation between group centers. Each sum of squares is divided by its own degrees of freedom.

Those divisions produce the within and between mean squares. Their ratio forms F, with the same degrees of freedom carried into the reference distribution.

Follow each quantity's role rather than treating the page as disconnected formulas. Observations produce squared deviations, squared deviations produce mean squares, and the ratio compares the two sources of variation.

## 32 | Cardiac-output observations for the sum-of-squares example
The table lists individual cardiac-output measurements under the four diet conditions. Each column belongs to one treatment group and contains seven observations.

The group mean supplies the center for that column's deviations. Subtract it from each cardiac-output value, square the differences, and add them to obtain that group's sum of squares.

The bottom summaries gather the ingredients for the next pages. Keep the individual measurements, group means, and sums of squares distinct: they describe raw outcomes, centers, and total squared variation.

## 33 | Cardiac-output within-groups mean square
Adding the four group sums of squares gives 3.825. This total measures variation of people around their own diet group's mean.

There are 28 observations and four fitted group means, leaving 24 within-groups degrees of freedom. Dividing the total by 24 gives the displayed within-groups variance estimate near 0.159.

This is the denominator component of F. The division changes a total sum of squared deviations into an estimate of individual population variance.

## 34 | Cardiac-output between-groups mean square
The between-groups sum of squares measures how far the diet means lie from the grand mean, accounting for the seven people behind each mean. The displayed total is about 0.685.

Four groups give three between-groups degrees of freedom. Dividing by three produces a mean square near 0.228.

This is the numerator component of F. Compare it with the within-groups mean square only after both sums of squares have been divided by their appropriate degrees of freedom.

## 35 | Cardiac-output F and conclusion
The ratio of the displayed mean squares is about 1.43. The relevant F distribution uses three numerator and 24 denominator degrees of freedom.

The 5% critical value is about 3.01, so the observed ratio does not reach the rejection region. Do not reject equal population mean cardiac output for these diets.

The sample means can differ without producing a significant overall result. Here their separation is modest compared with the within-group variation represented in the denominator.

## 36 | Choosing an ANOVA formulation from available information
Unequal group sizes require a formulation that accounts for those different sizes. The sum-of-squares approach does so using individual observations.

With equal group sizes and raw measurements, either formulation can describe the same ANOVA comparison. With equal group sizes but only group means and standard deviations, use the variance-comparison approach.

Start by checking what the question supplies. For this midterm's balanced calculations, the summary means, standard deviations, and common group size provide the ingredients for the variance method.

## 37 | Exhaled nitric oxide across lung-function groups
The observations are exhaled nitric-oxide measurements from young asthmatic subjects after allergen exposure. Lung-function classifications divide the subjects into three groups.

The question asks whether those groups share the same population mean nitric-oxide level. The raw table shows that the numbers of subjects are not identical across columns.

Identify the response and grouping factor before interpreting the analysis. The next R example summarizes the between-group and within-group variation for these measurements without requiring a hand calculation of every squared deviation.

## 38 | Reading an ANOVA formula in R
The response is the numerical outcome being analyzed. The factor identifies the categories that divide observations into comparison groups.

The formula places the response on the left and the grouping factor on the right. The data argument identifies the data frame where both variables are stored.

This syntax describes the statistical question: does the response vary across the factor's groups? Understanding those roles makes it easier to interpret the resulting table, even when the exam does not ask you to write commands.

## 39 | Interpreting the nitric-oxide ANOVA output
The Group row describes between-group variation, and the Residuals row describes within-group variation. Dividing the group mean square by the residual mean square produces the reported F value.

The output gives two numerator and 19 denominator degrees of freedom. Its p value is about 0.0106, which is below 0.05 but slightly above 0.01.

At the 5% level, reject equal population mean nitric-oxide levels. Keep the exact p-value comparison attached to the chosen significance level, and use the residual mean square if a follow-up calculation needs the within-groups variance.
