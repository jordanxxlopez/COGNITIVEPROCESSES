## 1 | From two proportions to contingency tables
A contingency table organizes counts by group and outcome. Under a no-association null, the outcome distribution should be the same across groups.

Expected counts show what that shared distribution predicts for each group size. The chi-squared statistic measures the mismatch between observed and expected counts.

The lecture extends from two-by-two tables to larger tables and adjusted pairwise follow-ups. Goodness of fit then compares one observed category distribution with a specified set of expected probabilities.

## 2 | Fall-recess discussion notice
The notice states that there is no discussion meeting during fall recess. It does not introduce a new probability calculation or statistical method.

The lecture collection still contains the contingency-table material. The absence of a discussion meeting does not change the definitions of observed counts, expected counts, or the comparison being developed.

Use the lecture examples as the material for this part of the sequence. The mathematical teaching resumes with the method chooser and the categorical-data comparison on the following pages.

## 3 | Categorical group comparisons in the chooser
The nominal row contains tests based on category counts. Two groups with binary outcomes can be compared using a z proportion test or a two-by-two chi-squared analysis.

Several groups require a larger contingency-table comparison. The numerical-outcome row instead leads to t tests and ANOVA, which compare measurement means.

The highlighted cells connect the new method to the study design. Decide what the outcome records and how many independent groups are present before selecting the reference statistic.

## 4 | The aspirin z test as a bridge
The aspirin table contains the same counts used for the corrected z calculation. Its observed proportion difference is standardized using a pooled null estimate.

The resulting magnitude is about 2.36, exceeding the two-sided Normal boundary used for rejection. The group rates supply the direction of the observed difference.

The next method analyzes these same counts by comparing each table cell with its expected count under no treatment effect. The data and null question remain the same while the statistic is expressed differently.

## 5 | What no treatment effect predicts for the table
The observed table separates placebo and aspirin patients into thrombus and no-thrombus outcomes. The row totals fix how many patients belong to each treatment group.

Under no treatment effect, both rows should share the same population outcome probabilities. Estimate that common outcome distribution from the column totals across both groups.

Expected counts answer how those outcomes would be distributed across the fixed row sizes under that null. They are predictions from the model, not replacement observations.

## 6 | Pool the outcome distribution before allocating it
Across both treatment groups, twenty-four of forty-four patients developed thrombi. The remaining twenty were free of thrombi.

Under the no-effect null, apply those pooled outcome proportions to both treatment groups. A larger treatment group then receives more expected events simply because it contains more patients.

This separates the null prediction from the observed treatment difference. The pooled distribution supplies the shared rates; the row totals determine how many expected outcomes each group receives.

## 7 | Expected counts preserve both sets of totals
Multiply each group size by the pooled thrombus proportion to obtain its expected event count. Use the pooled no-thrombus proportion for the other cell in the same row.

The expected placebo events are higher than the expected aspirin events because the placebo group is larger. These are counts, not different null event probabilities.

The resulting table retains the observed row and column totals. Fractional expected counts are acceptable because they represent model averages rather than actual fractions of a patient.

## 8 | Match each observation with its expected cell
The arrows pair the placebo-thrombus count with its own expected count, and do the same for the other three cells. The comparison must stay within corresponding group-outcome positions.

The observed placebo row has more thrombi than expected under no effect, while the aspirin row has fewer. The no-thrombus cells balance those discrepancies because the margins are fixed.

Each observed-minus-expected difference will contribute to one overall statistic. Keeping the cell labels attached prevents an event count from being compared with the wrong row or outcome prediction.

## 9 | Chi-squared adds standardized cell discrepancies
For each cell, compare its observed count with its expected count. Squaring the discrepancy makes both excesses and shortages contribute positively.

Dividing by the expected count expresses the mismatch relative to its expected size. Add the cell contributions to obtain the chi-squared statistic.

For the two-by-two case, the course uses Yates's correction before squaring the absolute discrepancy. There is one degree of freedom because the fixed margins leave only one independent cell count.

## 10 | Read the chi-squared upper-tail table
The chi-squared reference uses nonnegative values, with large values representing large overall mismatch from the null prediction. The rejection region lies in its upper tail.

Choose the row for the table's degrees of freedom and the column for the desired upper-tail probability. Their intersection gives the critical statistic.

Reject the null when the observed statistic exceeds that critical value. Do not treat the calculated statistic itself as a probability; the table supplies its reference-tail interpretation.

## 11 | The corrected aspirin chi-squared calculation
Each of the four aspirin-placebo cells contributes its corrected squared discrepancy divided by its expected count. Adding those contributions gives a statistic near 5.58.

The two-by-two table has one degree of freedom. Its statistic exceeds the relevant rejection boundary, supporting a treatment-outcome difference.

This agrees with the earlier corrected z result for the same table. Squaring that z magnitude gives the corresponding one-degree-of-freedom chi-squared value when the same correction and precision are used.

## 12 | Extend expected counts to any table size
For each cell, multiply its row total by its column total and divide by the grand total. This assigns the null outcome proportions consistently across all groups.

Add the ordinary squared observed-minus-expected contributions over every row and column. The course reserves Yates's correction for the two-by-two case.

Degrees of freedom equal rows minus one times columns minus one. Both dimensions matter because fixed row and column totals constrain how many cell values can vary independently.

## 13 | Three depression-treatment groups
The rows represent nefazodone, psychotherapy, and their combination. The columns contain the two outcome categories named in the supplied table.

The group sizes differ, so raw event counts alone do not give a fair rate comparison. Each outcome count belongs with its row total.

The null says the population outcome distribution is the same across the three treatments. Keep the source table's outcome labels attached when interpreting the direction, rather than assuming what a larger entry means clinically.

## 14 | Build the depression example's expected table
The grand total combines all three treatment groups. The column proportions provide the shared outcome probabilities under the no-treatment-difference null.

Apply those proportions to each group's row total. The expected counts vary by row size, while each row uses the same null outcome probabilities.

Compare the observed table with the expected table cell by cell. The combined-treatment row has a particularly large discrepancy in the first outcome column, contributing strongly to the overall test statistic.

## 15 | Test the three-by-two depression table
The ordinary chi-squared calculation sums six cell contributions. This is a three-by-two table, so it uses two degrees of freedom and no two-by-two continuity correction.

The statistic is approximately 21.2. It exceeds the displayed upper-tail critical value even at the stringent significance level of 0.001.

Reject equal population outcome distributions across all three treatments. The overall result establishes a difference somewhere, motivating follow-up comparisons to identify which treatment pairs account for it.

## 16 | Nefazodone versus psychotherapy as a new subtable
Keep only the nefazodone and psychotherapy rows. Their outcome counts form a separate two-by-two table for this pairwise question.

Recalculate the column totals and grand total using these two rows only. The combined-treatment patients do not belong in this pair's expected-count calculation.

Use the new margins to fill the expected table, then apply Yates's correction. A subtable has its own null prediction even though it originated inside a larger analysis.

## 17 | Nefazodone versus combined treatment
Select the nefazodone and combined-treatment rows. The first outcome column now has a different pooled total from the previous pairwise comparison.

Calculate new expected counts from this subtable's row totals, column totals, and grand total. Reusing the larger table's expected cells would not represent this pair's null model.

This two-by-two statistic tests equality of outcome proportions for these two treatments specifically. It will later be interpreted within the family of three pairwise comparisons.

## 18 | Psychotherapy versus combined treatment
The selected rows now compare psychotherapy with the combination. Their group sizes remain attached to the corresponding observed outcome counts.

The two retained rows define a new pooled outcome distribution. Use those new margins to calculate the four expected counts.

After applying the two-by-two continuity correction, this statistic joins the other two pairwise results. Keep its treatment label attached so it receives the correct place in the later ordered adjustment.

## 19 | Calculate all three corrected pairwise statistics
Every selected pair is a two-by-two table, so each uses Yates's correction and one degree of freedom. The original overall table used a different dimension and calculation.

The nefazodone-versus-psychotherapy discrepancy is small. The two comparisons involving combined treatment produce much larger chi-squared values.

These statistics rank the strength of the pairwise evidence, but multiple testing still requires an adjustment. Do not declare each pair significant using three unrelated unadjusted decisions.

## 20 | Holm thresholds for the three chi-squared comparisons
Order the chi-squared statistics from largest to smallest because all three use the same one-degree-of-freedom reference. The strongest observed discrepancy is tested first.

The overall significance level is divided among the remaining hypotheses at each Holm step. Start with three, then two, then one if earlier comparisons pass.

Use the appropriate upper-tail chi-squared critical value at every step. The first displayed lookup uses an available stricter table column to establish rejection when the exact requested column is absent.

## 21 | Interpret the adjusted depression comparisons
The two larger statistics pass their successive Holm thresholds. Their comparisons both involve the combined-treatment group.

The small nefazodone-versus-psychotherapy statistic does not pass its threshold. The familywise conclusion therefore identifies differences for the two combination comparisons without rejecting equality for that remaining pair.

State the treatment pairs explicitly and retain the table's outcome definition. Statistical evidence of a different response distribution is the result; deciding which direction is clinically favorable requires reading the outcome label correctly.

## 22 | Goodness of fit starts with one category distribution
A goodness-of-fit test uses one set of observed category counts. The null supplies the expected proportion for each category, often from a previous study or specified hypothesis.

Multiply each expected probability by the current total sample size to obtain expected counts. Compare observed and expected counts using their squared discrepancies divided by expected counts.

With specified category probabilities, the degrees of freedom are the number of categories minus one. This differs from the row-by-column degrees of freedom used for an independence table.

## 23 | Exercise behavior before and after a campaign
The earlier survey supplies three expected proportions: no regular exercise, sporadic exercise, and regular exercise. The later survey supplies observed counts from a new graduating class.

The question asks whether the later category distribution matches the earlier pattern. There is one current sample being compared with specified benchmark probabilities.

Use the later total of 470 students to scale those earlier probabilities into expected counts. Do not compare a current raw count directly with an earlier percentage.

## 24 | Complete the exercise-behavior goodness-of-fit test
The expected counts are 282, 117.5, and 70.5. Compare each with its matching observed count and add the three standardized squared discrepancies.

The statistic is about 8.457, with two degrees of freedom. It exceeds the displayed critical value for an upper-tail probability of 0.025.

Reject the hypothesis that the current category proportions match the earlier distribution. The conclusion concerns a changed exercise-behavior pattern; the test is based on the whole set of category differences.

## 25 | Place the completed categorical methods on the map
The marked nominal-data cells now include two-group proportion tests and larger contingency-table comparisons. Both work with category counts rather than means of continuous measurements.

The numerical-data row remains the route to t tests and ANOVA. The method depends jointly on response type and group structure.

Use this map to organize the analyses already learned. First identify the data being recorded, then the independent groups being compared, and finally the corresponding test statistic.

## 26 | Association adds a question about effect size
The highlighted association column moves beyond testing whether category distributions differ. Relative risk and odds ratios quantify the direction and size of an association between nominal variables.

A significant chi-squared result alone does not say how many times more likely an event is. Its statistic measures mismatch with independence, rather than directly expressing a risk ratio.

The next methods attach interpretable measures to the observed event pattern. Their choice depends on the study design and on which event probabilities can be estimated from the data.

## 27 | Keep the study design attached to the association measure
The same method map links independent-group category tests with relative risk and odds ratios. Testing and quantifying an association answer related but distinct questions.

A test evaluates the equal-proportion or independence null. An association measure describes how event occurrence differs between the specified groups.

Before calculating the measure, identify whether the study followed exposed groups forward or selected people by their outcome. That distinction determines whether the table supports direct event-risk estimates or an odds-based comparison.
