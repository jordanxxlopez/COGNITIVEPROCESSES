## 1 | Sampling distributions and clinical-trial design
The first part asks how statistics change across different samples. Expected values describe their centers, while estimator properties describe whether they are centered correctly and how much they fluctuate.

The central limit theorem explains the shape of many sample-mean distributions. The t and F distributions then provide reference patterns for other statistics constructed from sample data.

The clinical-trial part asks how the data were produced. A clear study question, comparison groups, random assignment, and masking determine what the observed statistical comparison can establish about treatment.

## 2 | Three uses of the t-test framework
An independent-samples t test compares means from different groups of individuals. A one-sample test compares one mean with a fixed reference value.

Post-hoc pairwise testing follows an overall ANOVA and uses its within-groups error estimate. Bonferroni and Holm adjust the decisions when several pairs are tested.

The discussion connects each function to a different study question. Identify the number of groups, whether the benchmark was sampled, and whether the test belongs to a multiple-comparison family before interpreting its output.

## 3 | The method chooser connects design with data type
The table organizes methods by the measurement scale and the experimental design. Numerical outcomes from two independent groups lead to an unpaired t test, while several independent groups lead to ANOVA.

Nominal category counts call for proportion or contingency-table methods instead of a comparison of numerical means. Other rows distinguish ordered data and survival outcomes.

Use the row and column together. Knowing only that there are two groups is insufficient; the outcome's meaning and whether the individuals are independent also affect the method.

## 4 | Why a sampling distribution is useful
A sample describes the individuals actually observed. Inference asks what that sample reveals about the larger population from which it was selected.

Repeated samples would produce different statistics, even if the population stayed fixed. A sampling distribution describes that repeat-to-repeat variation.

Its width describes how much a statistic can fluctuate because of sampling. That supplies a reference for judging how precisely a single sample represents a population quantity.

## 5 | Expected value includes means and variances
The mean averages possible values using density weights. A function of the variable can be averaged with the same weighting rule by changing what is multiplied by the density.

Squared distance from the population mean is one such function. Its expectation is the population variance, so variance itself is a particular expected value.

This gives a shared language for later derivations. For averages of values or squared distances, the density specifies which regions of the possible outcomes receive more weight.

## 6 | Linear combinations of independent variables
A linear combination multiplies each variable by a constant and adds the results. Its expected value adds those same weighted means.

Its variance uses the squared constants. Independent sources of uncertainty contribute positively even if one of their coefficients is negative.

If the original variables are independent Normal variables, the combination is also Normal. These rules explain the center and spread of an average by treating every observation as one weighted contribution.

## 7 | Several ways to estimate mean birthweight
The birthweight sample can be summarized by its mean, its median, or the average of its minimum and maximum. Each produces a candidate estimate of the population center.

Different samples cause each candidate to change. Comparing estimators therefore requires looking beyond one sample's numerical answer.

Ask where each estimator's repeated-sample distribution is centered and how wide it is. An estimate can look reasonable in one sample while varying much more than another method across repeated samples.

## 8 | Why the sample mean is useful here
The expectation of an average equals the population mean, so repeated sample means are centered correctly. That property is called unbiasedness.

For independent observations, averaging reduces variance by the sample size. The standard error is the square root of that variance, describing the spread of repeated sample means.

For the Normal-population comparison shown, the sample mean has less variance than the displayed alternative center estimates. It combines correct centering with relatively stable repeated-sample behavior.

## 9 | A statistic becomes a new random variable
Every new sample gives a new sample mean. Repeating that process produces a distribution of means, each based on the same specified sample size.

The same idea applies to t and F: both are calculated from sample data and would change if different observations were selected. They therefore have sampling distributions too.

A sampling distribution is about a statistic across possible samples. It is different from the distribution of individual observations inside one sample.

## 10 | Heights and averages of ten heights
The original variable records an individual's height. The new variable records the average height of a sample of ten individuals.

Each average combines several original outcomes, so it has its own probability distribution. Its center is tied to the original population mean, while its spread is smaller than individual-height spread.

The plotted sample means illustrate only some possible averages. Repeating the sampling more extensively would build the fuller distribution used to describe uncertainty in that mean.

## 11 | What the central limit theorem changes
For large independent samples, the sample mean is approximately Normal even when the original measurements are not. Its mean remains the population mean and its variance is reduced by sample size.

The approximation concerns the distribution of averages. It does not turn the original individual measurements into a Normal population.

If the population itself is Normal, the average is Normal at every sample size. That separate exact case explains why a small Normal sample can use a Normal mean distribution without relying on a large-sample approximation.

## 12 | Averages drawn from a Uniform population
The original population is flat across its range, with a center of 100. Samples of five and fifteen produce distributions of averages that are more concentrated near that center.

The sample-mean shapes are no longer flat. Averaging makes central combinations more common than combinations containing mostly extreme values.

The standard error decreases as sample size grows. Compare the wider average distribution for five observations with the narrower one for fifteen while keeping their shared center in view.

## 13 | Larger averages from the Uniform population
The samples of thirty and fifty give even narrower distributions of means. Their centers remain at the same population mean rather than drifting as sample size increases.

Their approximately bell-shaped appearance illustrates the central limit theorem. The original population was Uniform, yet its sufficiently large sample means resemble a Normal pattern.

The width follows the square-root sample-size rule. Increasing sample size improves precision, but doubling the sample size does not halve the standard error.

## 14 | Averages from a right-skewed population
The original measurements have a long right tail and a mean of 100. Small samples can occasionally include a very large observation, pulling their mean upward.

Averages of five are still visibly skewed, while averages of fifteen are more concentrated and less asymmetric. Both remain centered around the same population mean across repeated sampling.

This example shows why starting shape matters for the speed of the Normal approximation. Averaging reduces scatter immediately, while a strongly skewed population may need larger samples for an approximately symmetric mean distribution.

## 15 | Larger samples reduce skewness in the mean distribution
The averages of thirty and fifty from the skewed population are more bell shaped than the small-sample averages. A few extreme individuals have less influence when combined with more independent observations.

The standard errors are also smaller, so the means cluster more tightly around 100. Shape and precision are changing together, but they describe different features.

The population's individual distribution remains skewed. The central limit theorem explains the increasingly Normal-looking averages, not a change in the underlying individuals.

## 16 | Estimating spread changes Z into t
When the population standard deviation is known, a standardized Normal sample mean can be compared with the standard Normal reference. Its denominator uses a fixed population spread.

In practice that spread is often unknown and replaced with the sample standard deviation. The denominator now fluctuates from sample to sample as well as the numerator.

The resulting statistic follows a t distribution for a Normal sample, with sample size minus one degrees of freedom. The extra denominator uncertainty is why it is not simply standard Normal.

## 17 | How degrees of freedom change the t curve
The t curves are symmetric around zero but have heavier tails than the standard Normal curve when degrees of freedom are small. Extreme standardized results are more common because spread is estimated imprecisely.

As degrees of freedom increase, the estimate of spread becomes more stable. The t curve approaches the standard Normal curve.

The density expression defines the family mathematically, but table use depends on choosing the correct degrees of freedom. Different curves require different critical magnitudes for the same tail probability.

## 18 | F also has a family of sampling distributions
F is constructed from sample data, so repeated samples produce different F values. Under equal population means, that variation has a reference density.

There are two degrees of freedom because the numerator and denominator each estimate variation. Both affect the curve's shape and its upper-tail critical value.

An F value therefore needs its design information before it can be interpreted. The same numerical ratio can correspond to different tail probabilities under different numerator and denominator degrees of freedom.

## 19 | Degrees of freedom and F-table cutoffs
The illustrated table pattern shows critical F values changing as the reference distributions become less spread out. Larger denominator degrees of freedom make the background variance estimate more stable.

When chance is less likely to produce an extreme ratio, the upper-tail cutoff can move closer to one. This connects the shape of the reference curve with the table entries.

Always use the actual numerator and denominator degrees of freedom for the question. Read the relevant row and column rather than substituting a general impression about how critical values change.

## 20 | Lind's scurvy comparison
Lind compared treatments among sailors with scurvy while keeping their general circumstances and diet similar. Separate patients received different additions to that shared care.

The comparison creates a way to relate outcomes to treatment conditions. Without a comparison, improvement after treatment could reflect other changes occurring at the same time.

The example introduces a central trial-design idea: define what differs between groups and what is held comparable. Statistical calculations become more informative when the data come from a clear treatment comparison.

## 21 | How controlled trials developed
The historical table traces the development of controls, sham procedures, placebo treatment, and random allocation. These additions address different ways a treatment comparison can become misleading.

A control supplies a reference outcome, while random allocation determines who receives which treatment. Rules for human studies also address how participants are protected and studies are reviewed.

Read the timeline as a progression in study design rather than a list of dates to calculate with. The important connection is between each design feature and the source of bias or uncertainty it helps address.

## 22 | An example linking historical and modern medicine
The article excerpt discusses interacting influences on disease and uses an estrogen-receptor example to connect historical ideas with modern biological mechanisms. Its theme is that outcomes can reflect several interacting processes.

A proposed biological explanation and a clinical treatment comparison answer different questions. Understanding a mechanism can motivate a study question, while patient data are still needed to evaluate treatment outcomes.

This page broadens the context for the trial discussion. Keep the claim being investigated separate from the design that would supply evidence for it.

## 23 | State the primary trial question in advance
A trial begins with a clearly defined primary question and a protocol describing how it will be investigated. The question determines the population, intervention, comparison, and outcome.

The example asks whether isoniazid prevents tuberculosis disease or infection in a specified infant population. The title also identifies randomization, masking, and a placebo comparison.

Those details define what is actually being tested. A clear advance question keeps the eventual statistical analysis tied to a specified treatment claim rather than whichever result looks most favorable afterward.

## 24 | Following participants through a randomized trial
The diagram begins with a population affected by the condition. Eligibility and consent determine who enters the study before random assignment divides participants between treatments A and B.

Randomization occurs after those entry steps. It aims to make the treatment groups comparable by assigning treatment independently of participant characteristics.

The final comparison is between outcomes under A and B. Distinguish random assignment within the study from how the study participants were selected from the wider patient population.

## 25 | Randomization and whom the trial represents
Random assignment tends to balance participant characteristics across treatment groups. That supports the statistical comparison by reducing systematic differences in who receives each treatment.

The volunteers who enter a trial may still differ from the general patient population. Group comparability inside the study and applicability outside it are therefore separate questions.

Acceptability also affects enrollment: patients or physicians may decline randomization, and some treatment assignments raise ethical issues. These design considerations affect how a randomized study can actually be conducted.

## 26 | A crossover trial uses both treatments within people
One sequence receives A then B, and the other receives B then A. Each participant experiences both treatments in different periods.

Comparing a person with themselves can reduce variation from stable individual differences. This can make a crossover design more efficient than comparing entirely separate sets of people.

The disease must be sufficiently stable, and one period's treatment must not carry into the next comparison. Otherwise a later outcome mixes the current treatment with previous treatment or changing disease status.

## 27 | Masking reduces expectation-related bias
Masking hides treatment identity from people involved in the trial. Participants, clinical teams, evaluators, and statistical teams can each influence a different part of the study.

A participant's expectation may affect reported symptoms, while an evaluator's expectation may affect a subjective assessment. Hiding assignments reduces those pathways for treatment knowledge to influence outcomes.

Masking is particularly useful when measurement or treatment involves judgment. Its purpose is distinct from randomization: assignment balances groups, while masking reduces bias after assignments are made.

## 28 | Single, double, and triple masking
In an open trial, patients know the treatment they receive. In a single-blind trial, the patient does not know the assignment.

Double blinding also hides assignment from the healthcare provider. Triple blinding extends masking to the statistical or monitoring role specified here.

The labels describe who is kept unaware, so identify the people involved rather than memorizing the number alone. The practical aim is to reduce the influence of treatment expectations on care, reporting, evaluation, and analysis.

## 29 | Enough participants, recruited and retained
Sample size must be large enough for a clinically meaningful difference to be detectable with the planned analysis. Too little information can leave an important effect hard to distinguish from sampling variation.

Recruitment concerns obtaining the needed participants within a feasible time. A plan on paper does not produce a useful sample unless eligible people actually enroll.

Adherence concerns whether participants follow the assigned treatment. Monitoring and supporting it helps preserve the intended comparison between treatments as the study proceeds.

## 30 | Improvement after surgery needs a comparison
The original artery-ligation report followed treated patients and recorded symptom changes. Improvement after an intervention alone does not isolate what caused that improvement.

The later double-blind randomized comparison included a control procedure. It did not find the reported objective difference in stress testing or ECG between groups.

The example shows why treatment experience and expectations belong in the comparison design. A controlled trial can separate the procedure's specific effect from changes that also occur under a sham intervention.

## 31 | The sham-controlled ORBITA example
ORBITA compared coronary intervention with a placebo procedure in patients with angina after medical treatment was optimized. The study used randomization and masking.

Exercise time was assessed before and after the procedure, allowing comparison of the change between the assigned groups. Both groups experienced the procedure setting, while the active intervention differed.

The excerpt reports no improvement in exercise time beyond the placebo-procedure effect for this comparison. The key teaching point is how a sham control helps evaluate a procedure's specific contribution to the measured outcome.

## 32 | Where patients receive care affects the sample
The stacked diagram follows a broad community population through reporting illness, seeking care, visiting different services, and hospitalization. Only a small subset reaches an academic medical center.

Each step selects people from the previous group. Patients observed in a specialized hospital may therefore have different characteristics from everyone experiencing illness in the community.

A study's recruitment setting affects whom its results represent. Connect the final clinical sample back to the larger population before assuming that findings transfer unchanged to every patient.
