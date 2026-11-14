"""Version E and Order to memorize for Module II Sessions 18 to 22.

Same rules as plain_study_content.py. Formulas were read from the slide images,
because the PDF text layer drops most of the mathematics.
"""

LECTURES_M2 = [
# ---------------------------------------------------------------- Session 18
{
"id": 18, "tier": "m2",
"title": "Simple linear regression and correlation",
"lead": "Regression finds the straight line that best predicts one variable from another, and it also tells you how uncertain that line is.",
"topics": [
 {"title": "The line of means", "blocks": [
  {"pages": [4, 5, 6],
   "main": "**In a population, the mean of the dependent variable changes along a straight line as the independent variable changes.** This line is the **line of means**. Its intercept is alpha and its slope is beta. At each value of x, the values of y are Normal around the line with the same spread, called sigma y given x.",
   "sub": ["The **independent variable** x is the one you set or know, like height. The **dependent variable** y is the one you predict, like weight."],
   "end": "So regression assumes a straight-line trend, Normal scatter and the same scatter at every x."}]},
 {"title": "Fitting the best line", "blocks": [
  {"pages": [9, 10, 11, 13, 14, 15],
   "main": "**The regression line is the line that makes the sum of squared vertical errors as small as possible.** Each error is the gap between a measured y and the y the line predicts. Squaring the gaps keeps them positive, so the best line is the one with the smallest total.",
   "sub": ["Setting the derivatives with respect to a and b to zero gives formulas for both, built only from sums of x, y, x squared and x times y.",
           "Once b is known, a is the mean of y minus b times the mean of x, so the line always passes through the point of the two means."],
   "end": "So the line y hat equals a plus b x is the sample estimate of the population line of means."}]},
 {"title": "Spread around the line and uncertainty in a and b", "blocks": [
  {"pages": [16, 17, 18, 19],
   "main": "**The standard error of the estimate, s y given x, measures how far points usually sit from the regression line.** R calls it the **residual standard error**. It divides the sum of squared errors by n minus 2, because two numbers, a and b, were estimated from the data."},
  {"pages": [20],
   "main": "**The intercept and the slope each have their own standard error.** Both grow when the points scatter more around the line. The slope's standard error shrinks when the x values are more spread out, because a wide range of x pins down the slope better."}]},
 {"title": "Testing the trend and building intervals", "blocks": [
  {"pages": [21, 22, 23],
   "main": "**To test whether there is a relationship, you test whether the population slope is zero.** A slope of zero means y does not change with x. The t statistic is the slope divided by its standard error, with n minus 2 degrees of freedom.",
   "sub": ["A confidence interval for the slope or intercept is the estimate plus or minus the t cutoff times its standard error."]},
  {"pages": [24, 25],
   "main": "**An interval for the mean y at one value of x is narrower than an interval for one new observation at that x.** The interval for the mean only includes uncertainty about where the line is. The interval for one observation also includes how much single people scatter around the line, so it adds s y given x squared inside the square root.",
   "sub": ["Both intervals are narrowest at the mean of x and widen farther away, because the line is least certain at its ends."],
   "end": "So the question's wording, mean versus one observation, decides which standard error you use."}]},
 {"title": "Comparing two regression lines", "blocks": [
  {"pages": [26, 27, 29, 30, 31, 33, 34, 36],
   "main": "**To compare two groups' lines, you test whether their slopes differ with a t test.** The t statistic is the difference in slopes divided by the standard error of that difference. The degrees of freedom are n1 plus n2 minus 4, because each line used up two.",
   "sub": ["When the group sizes differ, the two residual variances are pooled first.", "The same kind of t test compares the two intercepts."]}]},
 {"title": "Correlation", "blocks": [
  {"pages": [37, 38, 39, 40],
   "main": "**The correlation coefficient r measures how strongly two variables move together on a straight line.** It runs from minus 1 to plus 1. Values near plus 1 mean they rise together, values near minus 1 mean one falls as the other rises, and values near 0 mean no straight-line relationship.",
   "sub": ["Correlation does not need one variable to depend on the other, but regression does."]},
  {"pages": [41],
   "main": "**To test whether r differs from zero, you turn r into a t statistic with n minus 2 degrees of freedom.** A larger r or a larger sample gives a larger t."}]}],
"questions": [
 {"q": "What is the difference between the confidence interval for the mean at a value of x and the confidence interval for one observation?",
  "a": "The interval for the mean is narrower. It only covers uncertainty about where the line of means is. The interval for one observation also covers how much single people scatter around the line, so it adds the residual variance and is wider."},
 {"q": "Why does s y given x divide by n minus 2?",
  "a": "It divides by n minus 2 because two values, the intercept and the slope, were estimated from the same data. Each estimate uses up one degree of freedom."},
 {"q": "What null hypothesis do you test to decide whether there is a trend?",
  "a": "You test whether the population slope beta is zero, which means y does not change with x. In words, there is no relationship between the two variables. You use t equal to b over its standard error with n minus 2 degrees of freedom."},
 {"q": "How is correlation different from regression?",
  "a": "Regression gives the line that predicts the dependent variable and the scatter around it. Correlation only measures how strongly the two variables move together, and it does not need one of them to depend on the other."}],
"memorize": [
 {"title": "Fit the line and test the slope by hand", "when": "The problem gives x and y data or their sums, like HW3 question 2, and says not to use R.",
  "steps": [
   {"do": "Name x and y and keep their units.", "why": "This is because the slope is in y units per x unit."},
   {"do": "Calculate the slope b from the sums.", "why": "This is because the least-squares formula only needs these sums.", "tex": "b=\\frac{n\\sum x_iy_i-\\sum x_i\\sum y_i}{n\\sum x_i^2-\\left(\\sum x_i\\right)^2}"},
   {"do": "Calculate the intercept a from the two means.", "why": "This is because the line passes through the point of the two means.", "tex": "a=\\bar y-b\\,\\bar x"},
   {"do": "Write the regression line.", "why": "This is because the first question always asks for it.", "tex": "\\hat y=a+b\\,x"},
   {"do": "Calculate s y given x.", "why": "This is because every standard error after this uses it.", "tex": "s_{y|x}=\\sqrt{\\frac{n-1}{n-2}\\left(s_y^2-b^2s_x^2\\right)}"},
   {"do": "Calculate the standard errors of a and b.", "why": "This is because the tests and intervals for a and b need them.", "tex": "s_a=s_{y|x}\\sqrt{\\frac1n+\\frac{\\bar x^2}{(n-1)s_x^2}},\\quad s_b=\\frac{1}{\\sqrt{n-1}}\\frac{s_{y|x}}{s_x}"},
   {"do": "Write the null hypothesis that there is no relationship, then divide b by its standard error.", "why": "This is because a zero slope means no trend.", "tex": "t=\\frac{b}{s_b},\\quad \\nu=n-2"},
   {"do": "Compare with the two-tailed t cutoff and write the conclusion with a P range.", "why": "This is because the conclusion must say whether the trend is real."},
   {"do": "If intervals are asked, add and subtract the t cutoff times each standard error.", "why": "This is because a confidence interval is the estimate plus or minus the margin.", "tex": "b\\pm t_\\alpha(n-2)\\,s_b,\\quad a\\pm t_\\alpha(n-2)\\,s_a"}]},
 {"title": "Interval for the mean versus one observation at a given x", "when": "The question asks for a 95 percent interval at one value of x, like a dose of 18.5 mg.",
  "steps": [
   {"do": "Plug x into the line to get y hat.", "why": "This is because both intervals are centered on the predicted value."},
   {"do": "For the mean, use the standard error of the line at that x.", "why": "This is because only the position of the line is uncertain.", "tex": "s_{\\hat y}=s_{y|x}\\sqrt{\\frac1n+\\frac{(x-\\bar x)^2}{(n-1)s_x^2}}"},
   {"do": "For one observation, add 1 inside the square root.", "why": "This is because a single person also scatters around the line.", "tex": "s_{Y_{new}}=s_{y|x}\\sqrt{1+\\frac1n+\\frac{(x-\\bar x)^2}{(n-1)s_x^2}}"},
   {"do": "Use the t cutoff with n minus 2 degrees of freedom and add and subtract the margin.", "why": "This is because the interval is the estimate plus or minus the margin.", "tex": "\\hat y\\pm t_{\\alpha}(n-2)\\,s_{\\hat y}\\ \\text{(mean)},\\quad \\hat y\\pm t_{\\alpha}(n-2)\\,s_{Y_{new}}\\ \\text{(one observation)}"},
   {"do": "Say which interval is wider and why.", "why": "This is because the comparison is usually part of the question."}]},
 {"title": "Correlation and its test", "when": "The question asks for the Pearson correlation between two variables.",
  "steps": [
   {"do": "Calculate r from the sums of deviations.", "why": "This is because r compares how x and y move together with how much each one varies.", "tex": "r=\\frac{\\sum(x-\\bar x)(y-\\bar y)}{\\sqrt{\\sum(x-\\bar x)^2\\sum(y-\\bar y)^2}}"},
   {"do": "Turn r into a t statistic.", "why": "This is because the t table decides whether r is far from zero.", "tex": "t=r\\sqrt{\\frac{n-2}{1-r^2}},\\quad \\nu=n-2"},
   {"do": "Compare with the cutoff and say how strong and in which direction the relationship is.", "why": "This is because r has both a size and a sign."}]},
 {"title": "Compare the slopes of two groups", "when": "Two groups each have their own regression line, like males and females.",
  "steps": [
   {"do": "Fit each line and check that each slope is significant.", "why": "This is because comparing trends only makes sense when both exist."},
   {"do": "Write the null hypothesis that the two groups have the same slope.", "why": "This is because the test asks whether the relationships differ.", "tex": "H_0:\\beta_1=\\beta_2"},
   {"do": "Find the standard error of the difference in slopes, pooling the residual variances when the group sizes differ.", "why": "This is because the t statistic divides by it.", "tex": "s_{b_1-b_2}=\\sqrt{s_{b_1}^2+s_{b_2}^2}\\ \\text{(equal sizes)},\\quad s^2_{y|x_p}=\\frac{(n_1-2)s^2_{y|x_1}+(n_2-2)s^2_{y|x_2}}{n_1+n_2-4},\\quad s_{b_1-b_2}=\\sqrt{\\frac{s^2_{y|x_p}}{(n_1-1)s^2_{x_1}}+\\frac{s^2_{y|x_p}}{(n_2-1)s^2_{x_2}}}"},
   {"do": "Divide the difference in slopes by that standard error.", "why": "This is because t measures the difference in units of its uncertainty.", "tex": "t=\\frac{b_1-b_2}{s_{b_1-b_2}},\\quad \\nu=n_1+n_2-4"},
   {"do": "Compare with the cutoff and conclude whether the relationships differ.", "why": "This is because that is the question being asked."}]}]},
# ---------------------------------------------------------------- Session 19
{
"id": 19, "tier": "m2",
"title": "Multiple regression and logistic regression",
"lead": "Multiple regression predicts one outcome from several variables at once, and logistic regression predicts the chance of a yes-or-no outcome.",
"topics": [
 {"title": "Margin of error and better evidence", "blocks": [
  {"pages": [3],
   "main": "**The margin of error in a survey report is the t or z cutoff times the standard error.** It is the plus-or-minus part of a confidence interval for a difference in means or proportions."},
  {"pages": [4, 5, 6, 7, 8],
   "main": "**Medical conclusions can change when better-designed studies are done.** Observational studies suggested hormone therapy lowered mortality, but a large randomized trial found risks. Later analyses changed the advice again, which shows why the type of study matters as much as the result.",
   "sub": ["An early cell-phone study included only phone users and linked use to lower sperm motility. A later study added a control group of people who did not use cell phones."]}]},
 {"title": "The multiple regression model", "blocks": [
  {"pages": [14, 15, 16, 17, 18],
   "main": "**Multiple regression fits a plane, or a higher-dimensional surface, instead of a line.** Each independent variable gets its own coefficient. Each coefficient says how much y changes when that variable goes up by one and the others stay the same.",
   "sub": ["The coefficients are again found by least squares, so they make the sum of squared errors as small as possible.",
           "The residual standard error divides by n minus k minus 1, because k slopes and one intercept were estimated."]}]},
 {"title": "Testing the whole model and each variable", "blocks": [
  {"pages": [19, 25],
   "main": "**The F test asks whether the variables together explain the outcome.** The null hypothesis says every slope is zero. The alternative says at least one slope is not zero. F is the model mean square divided by the residual mean square, with k and n minus k minus 1 degrees of freedom.",
   "end": "So a significant F means the variables, considered together, are significant predictors."},
  {"pages": [20, 24],
   "main": "**Each coefficient also has its own t test, which asks whether that one variable matters.** The t value is the coefficient divided by its standard error, with n minus k minus 1 degrees of freedom. R prints the estimate, the standard error, the t value and the P value for each row.",
   "sub": ["R squared is the share of the total variation in y that the model explains."]}]},
 {"title": "Too simple or too complex", "blocks": [
  {"pages": [26],
   "main": "**Adding more variables always fits the sample a little better, but too many makes the model follow the noise.** An **overfitted** model describes this sample well and new data badly. A good model is only as complex as the data need."}]},
 {"title": "Logistic regression", "blocks": [
  {"pages": [27, 28, 29],
   "main": "**Logistic regression predicts the probability of a yes-or-no outcome, like having coronary heart disease.** A straight line does not work, because it can go below 0 or above 1. The **logistic function** bends into an S shape, so its output always stays between 0 and 1."},
  {"pages": [30, 32, 33],
   "main": "**Taking the log of the odds turns the S curve into a straight line.** This is the **logit**, the log of p divided by 1 minus p. In practice the coefficients are found by maximum likelihood, which does not need grouped probabilities."},
  {"pages": [34, 35, 36, 37, 38],
   "main": "**A fitted logistic model gives the probability and the odds for any value of x.** You plug x into beta 0 plus beta 1 times x, then into the logistic function to get p. The odds are p divided by 1 minus p, so the odds of coronary heart disease for a 60-year-old are 3.76 to 1.",
   "sub": ["In the O-ring example, the slope on temperature is negative, so the chance of O-ring failure goes down as the launch temperature goes up."]}]}],
"questions": [
 {"q": "What are the null and alternative hypotheses for the F test in multiple regression?",
  "a": "The null hypothesis is that all the slope coefficients are zero, so none of the variables helps predict the outcome. The alternative is that at least one coefficient is not zero. A significant F means the variables together are significant predictors."},
 {"q": "Why can the F test be significant while one variable's t test is not?",
  "a": "The F test checks all the variables together, while each t test checks one variable after the others are already in the model. A variable can add little on its own once the others are included, even when the group as a whole predicts well."},
 {"q": "Why is a straight line a bad model for the probability of disease?",
  "a": "A straight line can predict probabilities below 0 or above 1, which are impossible. The logistic function always stays between 0 and 1, so it fits a probability."},
 {"q": "How do you turn a logistic probability into odds?",
  "a": "You divide the probability by 1 minus the probability. A probability of 0.79 gives odds of 0.79 divided by 0.21, which is 3.76. That means the event is 3.76 times as likely to happen as not."}],
"memorize": [
 {"title": "Read a multiple regression summary from R", "when": "The problem gives lm output with several variables, like HW3 question 3.",
  "steps": [
   {"do": "Write the equation from the Estimate column.", "why": "This is because the intercept and each coefficient are listed there.", "tex": "\\hat y=b_0+b_1x_1+b_2x_2+b_3x_3"},
   {"do": "State the overall null hypothesis that all slopes are zero and the alternative that at least one is not.", "why": "This is because the F test checks the model as a whole."},
   {"do": "Read the F statistic, its two degrees of freedom and its P value.", "why": "This is because they decide the overall test.", "tex": "F=\\frac{MS_{mod}}{MS_{res}},\\quad df=k,\\ n-k-1"},
   {"do": "For each variable, state its null hypothesis and read its t value and Pr(>|t|).", "why": "This is because each coefficient has its own test."},
   {"do": "Check each 95 percent interval from confint for zero.", "why": "This is because an interval without zero agrees with a significant t test."},
   {"do": "Refit with only the significant variables if any were not.", "why": "This is because the homework question asks for the final model built from the significant variables."},
   {"do": "Plug the given values into the final equation by hand.", "why": "This is because the prediction is just arithmetic with the coefficients."}]},
 {"title": "Probability and odds from a logistic model", "when": "The problem gives the logistic coefficients and a value of x.",
  "steps": [
   {"do": "Calculate beta 0 plus beta 1 times x.", "why": "This is because it is the exponent inside the logistic function."},
   {"do": "Put it into the logistic function to get the probability.", "why": "This is because the logistic function turns it into a value between 0 and 1.", "tex": "p=\\frac{1}{1+e^{-(\\beta_0+\\beta_1x)}}"},
   {"do": "Divide p by 1 minus p to get the odds.", "why": "This is because odds compare happening with not happening.", "tex": "\\text{odds}=\\frac{p}{1-p}=e^{\\beta_0}e^{\\beta_1x}"},
   {"do": "Write the answer as a sentence, like the odds are 3.76 to 1.", "why": "This is because the result must be understood without the formula."}]}]},
# ---------------------------------------------------------------- Session 20
{
"id": 20, "tier": "m2",
"title": "Paired t test and repeated measures",
"lead": "When the same people are measured more than once, you compare each person with themselves.",
"topics": [
 {"title": "Why pairing helps", "blocks": [
  {"pages": [4, 5, 6],
   "main": "**When each subject gets both treatments, the differences between people no longer hide the treatment effect.** An unpaired t test on such data mixes the treatment effect with the large spread between people, so it can miss a real effect. Measuring each person twice removes that spread."}]},
 {"title": "The paired t test", "blocks": [
  {"pages": [7, 8, 9],
   "main": "**The paired t test works on one new variable, the difference for each subject.** You average the differences, find their SD, and divide by the square root of n to get the standard error. The t statistic is the mean difference divided by that standard error, with n minus 1 degrees of freedom.",
   "sub": ["The null hypothesis is that the treatment causes no change, so the true mean difference is zero.",
           "It makes the same assumptions as the unpaired test, such as Normal interval data."],
   "end": "So a paired test is really a one-sample t test on the differences."},
  {"pages": [10, 11, 12],
   "main": "**In the smoking and platelet example and the oral contraceptive example, each person's before and after values gave one difference.** The mean difference was large compared with its standard error, so both changes were significant."}]},
 {"title": "Repeated measures with more than two conditions", "blocks": [
  {"pages": [13, 14, 15, 16, 17, 18],
   "main": "**Repeated measures ANOVA extends the paired idea to three or more measurements on the same subjects.** The total variation is split into variation between subjects and variation within subjects. The within-subject part is split again into the treatment effect and what is left over, the residual."},
  {"pages": [19],
   "main": "**Repeated measures designs need fewer subjects, because each person acts as their own control.** They also have drawbacks. Subjects must come back, and one treatment must not carry over into the next. The disease must be stable and ongoing (chronic, not acute), and there can be ethical issues. Using medical twins can avoid some of these drawbacks."}]}],
"questions": [
 {"q": "Why can an unpaired t test miss an effect that a paired t test finds?",
  "a": "An unpaired t test compares the groups using the spread between different people, which is large. A paired test looks at each person's own change, so that spread drops out and a real effect is easier to see."},
 {"q": "What are the degrees of freedom for a paired t test?",
  "a": "They are n minus 1, where n is the number of subjects. This is because the test works on one difference per subject."},
 {"q": "What is one drawback of a repeated measures design?",
  "a": "One treatment can carry over and affect the next measurement. The design also needs the same subjects to return and a disease that is stable and ongoing."}],
"memorize": [
 {"title": "Paired t test", "when": "The same subjects are measured under two conditions, like awake and asleep in HW3 question 4.",
  "steps": [
   {"do": "Name the paired t test and say why the data are paired.", "why": "This is because each subject was measured twice."},
   {"do": "Write the null hypothesis that there is no change between the two conditions.", "why": "This is because the test checks whether the mean difference is zero.", "tex": "H_0:\\delta=0"},
   {"do": "Subtract the two measurements for every subject.", "why": "This is because the differences are the new variable.", "tex": "d_i=x_{1i}-x_{2i}"},
   {"do": "Find the mean and SD of the differences.", "why": "This is because the t statistic is built from them.", "tex": "\\bar d=\\frac1n\\sum d_i,\\quad s_d=\\sqrt{\\frac{\\sum(d_i-\\bar d)^2}{n-1}}"},
   {"do": "Divide the SD by the square root of n.", "why": "This is because that is the standard error of the mean difference.", "tex": "s_{\\bar d}=\\frac{s_d}{\\sqrt n}"},
   {"do": "Divide the mean difference by its standard error.", "why": "This is because t measures the change in units of its uncertainty.", "tex": "t=\\frac{\\bar d}{s_{\\bar d}},\\quad \\nu=n-1"},
   {"do": "Compare with the two-tailed cutoff, check a smaller level if you reject, and write the conclusion.", "why": "This is because you report the strongest P range you can."},
   {"do": "If R is asked for, match the t, df, P value, interval and mean difference lines to your hand work.", "why": "This is because the question asks you to mark each line of the output."}]}]},
# ---------------------------------------------------------------- Session 21
{
"id": 21, "tier": "m2",
"title": "Repeated measures ANOVA and McNemar's test",
"lead": "Repeated measures ANOVA compares three or more measurements on the same subjects, and McNemar's test does the same job for yes-or-no outcomes measured twice.",
"topics": [
 {"title": "Splitting the variation", "blocks": [
  {"pages": [2, 3, 4, 5, 6],
   "main": "**Repeated measures ANOVA removes the differences between subjects, then compares the treatment effect with what is left.** You find each subject's mean, each treatment's mean and the grand mean. The within-subject sum of squares measures how each person varies around their own mean.",
   "sub": ["The treatment sum of squares is n times the squared distances of the treatment means from the grand mean, because each treatment mean uses n subjects.",
           "The residual sum of squares is the within-subject sum of squares minus the treatment sum of squares."],
   "end": "So F is the treatment mean square over the residual mean square, with m minus 1 and (n minus 1)(m minus 1) degrees of freedom."}]},
 {"title": "Two worked examples", "blocks": [
  {"pages": [7, 8],
   "main": "**In the blood pressure example, the treatment means at 4, 8 and 12 weeks were almost the same.** The treatment mean square was tiny compared with the residual mean square, so F was far below the cutoff and there was no difference over time."},
  {"pages": [9, 10, 11],
   "main": "**In the lung function example, almost all the within-subject variation came from the exposure conditions.** The residual mean square was very small, so F was very large and the conditions differed."}]},
 {"title": "Finding which conditions differ", "blocks": [
  {"pages": [12],
   "main": "**After a significant repeated measures ANOVA, Holm-corrected t tests find which conditions differ.** Each t compares two treatment means using the residual mean square. The degrees of freedom for the t table are the residual degrees of freedom, (n minus 1)(m minus 1).",
   "end": "So the Holm steps are the same as before, with the residual mean square in place of the within-groups variance."}]},
 {"title": "McNemar's test", "blocks": [
  {"pages": [14, 15],
   "main": "**McNemar's test compares yes-or-no outcomes measured twice on the same people.** An ordinary chi-square test is wrong here, because the rows and columns are not independent. McNemar's test looks only at the people who changed, because people who stayed the same tell you nothing about the treatment.",
   "sub": ["If the treatment has no effect, half of the people who changed should change each way."]},
  {"pages": [16, 17],
   "main": "**The expected count for each changing cell is the number who changed divided by 2.** You use the Yates correction because it is a two-by-two table, and there is 1 degree of freedom. McNemar's test can also compare two diagnostic methods on the same subjects."}]}],
"questions": [
 {"q": "Why is an ordinary chi-square test wrong for before-and-after yes-or-no data?",
  "a": "It is wrong because the same people appear before and after, so the rows and columns are not independent. McNemar's test fixes this by using only the people whose result changed."},
 {"q": "What degrees of freedom do the Holm t tests use after repeated measures ANOVA?",
  "a": "They use the residual degrees of freedom, which are (n minus 1) times (m minus 1). The t statistics also use the residual mean square."},
 {"q": "Why does repeated measures ANOVA remove the between-subject variation?",
  "a": "It removes it because people differ a lot from each other regardless of treatment. Taking that out leaves a smaller residual, so a real treatment effect is easier to detect."}],
"memorize": [
 {"title": "Repeated measures ANOVA by hand", "when": "The problem gives a table of n subjects each measured under m conditions.",
  "steps": [
   {"do": "Name the test and write the null hypothesis that the outcome does not differ across the conditions.", "why": "This is because the same subjects are measured under every condition."},
   {"do": "Find each subject's mean, each treatment's mean and the grand mean.", "why": "This is because every sum of squares is built from these means.", "tex": "\\bar S_s=\\frac1m\\sum_t x_{ts},\\quad \\bar T_t=\\frac1n\\sum_s x_{ts}"},
   {"do": "Add up each subject's squared distances from their own mean.", "why": "This is because that is the within-subject variation.", "tex": "SS_{wit\\,subjs}=\\sum_s\\sum_t (x_{ts}-\\bar S_s)^2"},
   {"do": "Calculate the treatment sum of squares.", "why": "This is because it measures how far the treatment means are from each other.", "tex": "SS_{treat}=n\\sum_t(\\bar T_t-\\bar X)^2"},
   {"do": "Subtract to get the residual sum of squares.", "why": "This is because what is left after the treatment effect is the residual.", "tex": "SS_{res}=SS_{wit\\,subjs}-SS_{treat}"},
   {"do": "Divide each by its degrees of freedom and form F.", "why": "This is because F compares the two mean squares.", "tex": "F=\\frac{SS_{treat}/(m-1)}{SS_{res}/\\big((n-1)(m-1)\\big)}"},
   {"do": "Compare with the F cutoff and write the conclusion with a P range.", "why": "This is because the conclusion answers the study question."}]},
 {"title": "Holm pairwise t tests after repeated measures ANOVA", "when": "The repeated measures ANOVA was significant and you are asked which conditions differ.",
  "steps": [
   {"do": "Calculate t for each pair of treatment means with the residual mean square.", "why": "This is because the residual mean square is the shared error.", "tex": "t=\\frac{\\bar T_i-\\bar T_j}{\\sqrt{2MS_{res}/n}}"},
   {"do": "Use the residual degrees of freedom for the table.", "why": "This is because the error estimate came from the residual.", "tex": "\\nu=(n-1)(m-1)"},
   {"do": "Order the pairs by size of t and apply the Holm levels, stopping at the first failure.", "why": "This is because the Holm rule is the same as before.", "tex": "\\alpha_j=\\frac{\\alpha_T}{k-j+1}"},
   {"do": "Write one combined conclusion with P less than 0.05.", "why": "This is because the statement covers every pair."}]},
 {"title": "McNemar's test", "when": "A yes-or-no outcome is measured twice on the same people, or two tests are run on the same people.",
  "steps": [
   {"do": "Set up the before-by-after table and find the two cells where people changed.", "why": "This is because only those people carry information about the treatment."},
   {"do": "Write the null hypothesis that changing one way is as likely as changing the other way.", "why": "This is because no effect means equal change in both directions."},
   {"do": "Divide the number who changed by 2 to get the expected count.", "why": "This is because half should change each way under no effect.", "tex": "E=\\frac{b+c}{2}"},
   {"do": "Calculate chi-square with the Yates correction on the two changing cells.", "why": "This is because it is a two-by-two table.", "tex": "\\chi^2=\\frac{(|b-E|-\\frac12)^2}{E}+\\frac{(|c-E|-\\frac12)^2}{E},\\quad \\nu=1"},
   {"do": "Compare with the chi-square cutoff for 1 degree of freedom and write the conclusion.", "why": "This is because the decision follows the usual rule."}]}]},
# ---------------------------------------------------------------- Session 22
{
"id": 22, "tier": "m2b",
"title": "Machine learning · clustering and classification",
"lead": "Clustering finds groups in data that have no labels, and classification puts a new object into groups that are already labeled.",
"topics": [
 {"title": "What machine learning does", "blocks": [
  {"pages": [3, 4, 5],
   "main": "**Machine learning finds patterns in data automatically and uses them to make predictions.** In **supervised learning**, the computer learns from past data with known answers. In **unsupervised learning**, it learns from data without answers."}]},
 {"title": "Clustering versus classification", "blocks": [
  {"pages": [6, 7, 8, 9],
   "main": "**Clustering groups data so that members of a group are similar and different groups are not.** Nobody tells the algorithm what the groups are, so it is unsupervised. The groups can then reveal relationships nobody noticed before."},
  {"pages": [10, 11, 12, 13],
   "main": "**Classification assigns a new object to one of several groups that are already defined.** It learns from labeled examples, so it is supervised. A new object goes to the group of the examples it is most similar to."}]},
 {"title": "Measuring distance", "blocks": [
  {"pages": [15, 16],
   "main": "**Similarity is measured as distance between points, so a small distance means similar and a large distance means different.** The **Euclidean distance** is the square root of the sum of squared differences in each feature. The Manhattan distance adds the absolute differences instead. The Minkowski distance is the general form that includes both."}]},
 {"title": "k-means clustering", "blocks": [
  {"pages": [17, 18, 19, 20, 21],
   "main": "**k-means splits the data into k clusters by repeating two steps until nothing changes.** First, each point is assigned to its nearest centroid. Second, each centroid is moved to the mean of the points assigned to it. The number of clusters k is chosen before starting, and the starting centroids are k points picked at random from the data.",
   "end": "So each iteration is an assign step followed by an update step."},
  {"pages": [22, 23, 24, 25, 26],
   "main": "**In the medicine example with two features, one medicine switched clusters in the second iteration.** After the first iteration, medicine 1 was alone in one cluster and medicines 2, 3 and 4 were in the other. In the second iteration, medicine 2 was closer to the first centroid, so it moved. That left medicines 1 and 2 in one cluster and medicines 3 and 4 in the other."}]},
 {"title": "Choosing k and the limits of k-means", "blocks": [
  {"pages": [32],
   "main": "**More clusters always lower the within-cluster sum of squares, so you look for the point where adding clusters stops helping much.** Too few clusters mix different groups, and too many split real groups apart."},
  {"pages": [33],
   "main": "**k-means has limits that come from how it works.** You must choose k ahead of time. The result can depend on the starting centroids. Every feature counts equally, and extreme points can distort the distances. It works poorly when the groups are not compact blob shapes (hyperellipsoids), such as rings. It is also not practical for very large data sets."}]},
 {"title": "K-nearest neighbors classification", "blocks": [
  {"pages": [34, 35, 36, 37, 38],
   "main": "**K-nearest neighbors (K-NN) classifies a new object by looking at the K labeled examples closest to it.** The new object joins the class that is most common among those K neighbors. The share of neighbors in each class gives a probability for that class.",
   "sub": ["K here means the number of neighbors, which is different from the k in k-means.",
           "If K is 1, the object copies its single nearest neighbor. If K is the whole training set, it always joins the biggest class."]},
  {"pages": [39],
   "main": "**Features are scaled before K-NN so that one large-scale feature does not dominate the distance.** Min-max scaling squeezes each feature into the range 0 to 1. Z-score scaling subtracts the mean and divides by the SD."},
  {"pages": [40, 41, 42],
   "main": "**In the surgical mesh example, the new mesh's three nearest vendors were mostly Fail, so it was classified as Fail.** Two of its three neighbors failed, so the probability of failing was two thirds."}]}],
"questions": [
 {"q": "What is the difference between clustering and classification?",
  "a": "Clustering finds groups in data without any labels, so it is unsupervised. Classification puts a new object into groups that are already labeled, so it is supervised."},
 {"q": "What are the two steps that k-means repeats?",
  "a": "First, it assigns each point to its nearest centroid. Second, it moves each centroid to the mean of its assigned points. It repeats until the assignments stop changing."},
 {"q": "Why are features scaled before K-NN?",
  "a": "Features are scaled because a feature with large numbers would dominate the distance. Scaling puts every feature on a similar range, so each one counts fairly."},
 {"q": "What does the K in K-NN mean, and is it the same as the k in k-means?",
  "a": "In K-NN, K is the number of nearest neighbors used to vote. It is not the same as the k in k-means, which is the number of clusters."}],
"memorize": [
 {"title": "One iteration of k-means by hand", "when": "The problem gives a small table of points, k and starting centroids, like the Session 22 exercise.",
  "steps": [
   {"do": "Write the starting centroids.", "why": "This is because every distance is measured from them."},
   {"do": "Calculate the Euclidean distance from every point to every centroid.", "why": "This is because points join the closest centroid.", "tex": "d(q,r)=\\sqrt{\\sum_i (q_i-r_i)^2}"},
   {"do": "Assign each point to the centroid with the smaller distance.", "why": "This is because that is the assign step."},
   {"do": "Move each centroid to the mean of its assigned points, feature by feature.", "why": "This is because that is the update step.", "tex": "c_j=\\frac{1}{n_j}\\sum_{i:\\,y_i=j} x_i"},
   {"do": "Report each point's cluster label and the new centroids.", "why": "This is because the question asks for both."}]},
 {"title": "Classify a new object with K-NN", "when": "The problem gives labeled examples, a new object and a value of K.",
  "steps": [
   {"do": "Scale the features if they are on very different scales.", "why": "This is because a large-scale feature would dominate the distance."},
   {"do": "Calculate the distance from the new object to every labeled example.", "why": "This is because K-NN uses the closest examples."},
   {"do": "Rank the distances and pick the K smallest.", "why": "This is because those are the K nearest neighbors."},
   {"do": "Count the classes among those neighbors and assign the most common one.", "why": "This is because K-NN assigns the plurality class."},
   {"do": "Give the probability as the share of neighbors in that class.", "why": "This is because the question often asks how sure the classification is."}]}]},
]
