## 1 | Errors and power describe repeated test decisions
A statistical test can make a wrong decision because different random samples produce different results. This lecture separates the two possible errors and asks how often a real effect is detected.

Power depends on the decision threshold, the size of the treatment effect, the amount of individual variation, and the sample size. Each factor changes how much the effect stands out from sampling noise.

The examples use t-test comparisons to connect these influences with power curves. This collection remains reference material outside the stated scope of the upcoming midterm.

## 2 | Categorical-analysis discussion and Homework 2
The discussion revisits chi-squared methods for nominal data. An association analysis compares counts across groups, while goodness of fit compares one category distribution with specified expected probabilities.

The listed functions implement those different questions. Their output should be read alongside the observed counts, null hypothesis, and degrees of freedom.

Homework guidance connects the procedures to particular problems. Identify whether the input is a contingency table or a single category vector before deciding which expected-count calculation is appropriate.

## 3 | A real urine-production difference is detected
The hypothetical drug population has a higher mean urine production than the placebo population. A real treatment difference therefore exists in the setup.

The selected samples produce a t magnitude that exceeds the displayed critical value. In this sample, the test rejects the no-effect null.

Because the underlying populations genuinely differ, that rejection is a correct detection. The sample means and spreads still fluctuate, so another pair of samples from the same populations can lead to a different decision.

## 4 | The same real effect can be missed
The population drug effect is unchanged, but a different random sample produces a smaller standardized separation. The sample means and standard deviations differ from the previous example.

The observed t magnitude now lies below the critical value, so the test does not reject the no-effect null. In this hypothetical setup, we know that decision misses a real population difference.

A nonsignificant result can therefore arise even when treatment works. The size of the observed statistic depends on both the true effect and the sampling variation in the collected data.

## 5 | False positives and missed real effects
The upper distribution represents repeated experiments when the drug has no effect. Its extreme tail contains false-positive rejections under the chosen rule.

The lower distribution represents repeated experiments when the drug truly increases urine production. Some results cross the rejection boundary, while others remain below it and miss that effect.

The displayed experiment counts estimate these two outcomes under the real-effect situation. Controlling false positives does not by itself tell us how often the test will detect a specified real difference.

## 6 | The four decision-and-reality combinations
Reality has two possibilities: a treatment effect exists or it does not. The test also has two decisions: reject the no-effect null or do not reject it.

A Type I error rejects a true null, producing a false positive. A Type II error fails to reject when the specified effect is real, producing a false negative.

Power is the chance of correctly detecting that real effect. It is the complement of the Type II error probability and must be described for a particular effect size and study design.

## 7 | Power is the detected part of the real-effect distribution
The lower distribution is generated when the drug really changes mean urine production. The shaded results beyond the rejection cutoff represent experiments that correctly detect it.

The unshaded results on the other side miss the effect. Both come from the same underlying treatment situation, with different samples accounting for the different decisions.

Power is the proportion of real-effect experiments that cross the boundary. It is not the probability that a particular significant result is true.

## 8 | Cholesterol: consequences of the two errors
The null says these children's mean cholesterol matches the general childhood reference. The alternative says it is higher among children whose fathers died of heart disease.

A false positive would conclude that cholesterol is elevated when the population mean actually matches the reference. That could trigger unnecessary interventions, cost, worry, or side effects.

A false negative would miss a genuinely elevated population mean. Preventive action might then be withheld when it could have helped, linking the abstract error types with concrete clinical decisions.

## 9 | Birthweight: a different direction of concern
The hospital sample is compared with a national mean birthweight. The alternative concerns a lower population mean in the low-socioeconomic-status setting.

A Type I error would identify a low-birthweight problem when the population mean is actually the same as the reference. A Type II error would miss a real reduction in birthweight.

The possible nursery decisions show why both errors matter. The labels depend on truth and the testing decision, rather than on whether the outcome is clinically described as higher or lower.

## 10 | A stricter significance threshold reduces detection
The two comparisons use the same real treatment shift but different rejection thresholds. Reducing the significance level moves the cutoff farther into the null tail.

That reduces false-positive rejections when no effect exists. It also leaves less of the real-effect distribution beyond the cutoff, reducing power for the fixed effect and sample size.

The illustrated shift measures treatment separation relative to sampling uncertainty. Changing the threshold changes the decision boundary, while the underlying real-effect distribution stays in place.

## 11 | Larger effects are easier to detect
The diagrams keep the background variation and group size fixed while changing the true treatment difference. A larger mean shift moves the real-effect statistic distribution farther from the null center.

More of that distribution then lies beyond the rejection cutoff, increasing power. A smaller effect leaves more overlap and produces more missed detections.

This is a relative-separation argument: the same measurement difference is easier to detect when it is large compared with uncertainty in the estimated mean difference.

## 12 | Read power as a function of effect size
The horizontal axis describes the true increase in urine production, while the vertical axis describes the chance of rejecting the null for that increase. Sample size, individual spread, and significance level are fixed.

Near a zero effect, rejection occurs only at the false-positive rate. As the effect increases, the probability of crossing the boundary rises.

The curve links a proposed clinically relevant difference with expected detection. Choose the effect size first, then read the corresponding power for this particular design.

## 13 | Individual variability competes with the treatment signal
The standardized shift divides the true mean difference by uncertainty in the estimated difference. Larger population spread enlarges that uncertainty when sample sizes are fixed.

The symbol delta names the true mean separation, and sigma names individual population standard deviation. Their ratio expresses effect size relative to background variation.

For equal-sized groups, the sample-size factor multiplies that standardized effect. The formula makes the cause-and-effect clear: more variability weakens separation, while more independent observations strengthen it.

## 14 | More subjects increase power
The population effect and individual spread stay the same while each group grows from ten to twenty subjects. The standard error of the difference decreases.

The same true mean difference therefore becomes larger in standard-error units. More of the real-effect distribution crosses the rejection boundary, raising power.

Increasing sample size improves precision rather than changing the treatment's biological effect. Keep those two explanations separate when interpreting why the larger study detects the effect more often.

## 15 | Power rises along a sample-size curve
The graph fixes a treatment difference, population spread, and significance level. Only the number of subjects per group changes along the horizontal axis.

Power increases as larger groups reduce sampling uncertainty. The curve rises rapidly in some regions and more slowly as it approaches a high detection probability.

Use it to connect a proposed group size with the chance of detecting that specified effect. The same curve cannot be reused unchanged if the effect or population variability changes.

## 16 | Standardized effect and sample size share a power graph
The horizontal axis expresses the true mean difference relative to population standard deviation. Positive and negative differences both move away from the no-effect center in a two-sided test.

The separate curves represent different group sizes. A larger sample reaches high power for a smaller standardized effect because its mean difference is estimated more precisely.

The displayed ratio combines delta, sigma, and the equal group size into a standardized shift. Use the curve corresponding to the actual design rather than treating power as a function of effect size alone.

## 17 | A nonsignificant cardiac-index comparison revisited
The anesthetic table returns to the cardiac-index means from halothane and morphine groups. The earlier t test did not reject equal population means.

Now the question changes: how capable was that small study of detecting a difference of the observed size? The group means alone do not answer that design question.

The sample standard deviations estimate individual variability, and the sample sizes specify the amount of information. These ingredients are used to locate an approximate power on the next page.

## 18 | Cardiac-index effect is small relative to spread
The mean gap is 0.33 in cardiac-index units, and the pooled standard deviation is much larger. Their ratio gives a small standardized effect.

The slide uses the smaller group size as an approximate conservative input to the equal-size graph. At that effect and group size, the indicated power is low.

That means a real difference of this magnitude would often be missed by such a study. It explains why a nonsignificant result and a clinically interesting possible difference can coexist.

## 19 | Plan a sample size for the same cardiac-index effect
Keep the proposed cardiac-index difference and estimated population spread fixed. This fixes the standardized effect on the graph's horizontal axis.

Now work backward from the desired power rather than reading power from an existing sample size. The diagram indicates a much larger equal group size than the original study used.

The displayed sample-size result belongs to that chosen effect, spread estimate, significance level, and power target. It is a planning calculation rather than a new test of the original observations.

## 20 | Plan detection of a percentage blood-pressure change
The proposed effect is a quarter of the halothane group's mean blood pressure. Convert that percentage into an absolute difference in mmHg before standardizing it.

The pooled variance must be square-rooted to obtain the standard deviation used in the effect-to-spread ratio. Mixing variance with an unsquared mean difference would give incompatible units.

With the larger standardized effect, the graph indicates fewer subjects are needed for the same target power than in the cardiac-index example. The relative size of the signal explains that difference.

## 21 | Diets and a proposed cholesterol reduction
The example asks about detecting a reduction in mean cholesterol from 190 to 165 mg/dL. The population standard deviation is estimated as 35 mg/dL.

The difference divided by that standard deviation gives a standardized effect near 0.71. The planned design has twenty people per diet group and uses the stated significance level.

Those are the inputs needed to read power from the graph. Keep the proposed mean difference separate from the observed variability; one supplies the signal and the other supplies the background spread.

## 22 | Read the cholesterol study's approximate power
Locate the standardized effect near 0.71 on the horizontal axis. Move to the curve for twenty subjects per group, then read the corresponding vertical power.

The illustrated intersection is around 0.6. It describes a substantial chance of missing the proposed cholesterol difference even if that difference is real.

This is an approximate graph-based calculation. Its meaning is repeated-study detection under the stated assumptions, rather than the chance that the treatment helps one particular patient.

## 23 | Find the minimum effect for a target power
Here group size stays at twenty, but the desired power is raised to 0.80. Work backward from that vertical value to the twenty-subject curve.

The graph indicates a standardized effect near 0.9. Multiply that ratio by the stated population standard deviation to return to cholesterol units.

The resulting detectable mean difference is about 31.5 mg/dL. A larger target difference is easier to detect at fixed sample size, so it can support a higher power than the smaller difference on the preceding page.

## 24 | Put the influences on power together
Power is the chance of rejecting the no-effect null when a particular real effect exists. Its value depends on the test and the planned comparison.

A stricter significance level lowers power when everything else stays fixed. A larger effect relative to individual spread increases it, and a larger sample size increases precision and detection.

When population quantities are unknown, sample mean differences and pooled spread supply estimates for planning. Keep that estimation step visible rather than treating the sample's observed difference as a known population truth.
