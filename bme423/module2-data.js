// Source-aligned BME423 MODULE II. Existing MODULE I data is unchanged.
const BME_MODULE_II={
  "revision": "module-ii-session17-table-first",
  "testSize": 100,
  "lectureQuizSize": 50,
  "modules": [
    {
      "id": 17,
      "title": "Confidence intervals",
      "date": "2026-10-21",
      "count": 17,
      "pdf": "sources/session17.pdf",
      "pptx": "sources/session17.pptx",
      "slides": [
        {
          "page": 1,
          "title": "Confidence intervals estimate population quantities",
          "topic": "meaning",
          "paragraphs": [
            "A confidence interval gives a range of population values compatible with a sample estimate and its uncertainty. Estimating the size of an effect answers a different question from deciding whether an effect differs from zero.",
            "The population quantity can be one mean, a difference between two means, one proportion, or a difference between two proportions. The center comes from the corresponding sample estimate, and the distance to each endpoint depends on its standard error.",
            "The confidence level specifies the coverage of the interval-producing procedure across repeated samples. The same interval can also support a hypothesis decision by checking whether it includes the population value specified by the null hypothesis."
          ],
          "equations": [],
          "symbols": "",
          "case": null,
          "subset": null,
          "core": false
        },
        {
          "page": 2,
          "title": "Two independent means and the pooled standard error",
          "topic": "twoMeans",
          "paragraphs": [
            "The null hypothesis \\(H_0:\\mu_1=\\mu_2\\) states that the two population means are equal. The alternative \\(H_A:\\mu_1\\ne\\mu_2\\) states that they differ. The sample difference \\(\\bar x_1-\\bar x_2\\) estimates the population difference \\(\\mu_1-\\mu_2\\).",
            "The pooled two-sample method assumes independent observations from Normal populations with a common variance. The pooled variance \\(s^2\\) combines the two sample variances, weighting each by its sample degrees of freedom. Squaring each SD produces the variance needed in that calculation.",
            "The standard error describes the variability of the difference between sample means. Dividing the observed difference by this standard error gives the test statistic under a zero-difference null. The degrees of freedom are \\(\\nu=n_1+n_2-2\\), and a two-sided test compares the magnitude of the statistic with the positive course-table cutoff."
          ],
          "equations": [
            "H_0:\\mu_1=\\mu_2,\\qquad H_A:\\mu_1\\ne\\mu_2",
            "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}",
            "s_{\\bar x_1-\\bar x_2}=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
            "t=\\frac{\\bar x_1-\\bar x_2}{s_{\\bar x_1-\\bar x_2}},\\qquad \\nu=n_1+n_2-2"
          ],
          "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(\\nu\\) (degrees of freedom).",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 3,
          "title": "The middle 95% of the t distribution",
          "topic": "meaning",
          "paragraphs": [
            "Under the equal-means null hypothesis, the standardized sample difference follows the central \\(t\\) distribution with the appropriate degrees of freedom. Positive and negative values represent opposite directions of the observed difference.",
            "The middle 95% lies between a negative and a positive critical value. A total of 5% remains outside this range, split into 2.5% in each tail. A two-sided comparison uses both extremes rather than treating the full 5% as one tail.",
            "The course notation \\(t_{0.05}(\\nu)\\) denotes the positive cutoff in the total two-tail 0.05 column. Its cumulative probability is 0.975. The degrees of freedom determine which row supplies the cutoff."
          ],
          "equations": [
            "P\\!\\left(-t_{0.05}(\\nu)<T_\\nu<t_{0.05}(\\nu)\\right)=0.95"
          ],
          "symbols": "\\(T_\\nu\\) (random t statistic), \\(t_{0.05}(\\nu)\\) (positive critical value with 0.05 total outside both tails).",
          "case": null,
          "subset": null,
          "core": false
        },
        {
          "page": 4,
          "title": "Rearranging the t statement into a mean-difference interval",
          "topic": "twoMeans",
          "paragraphs": [
            "For a population difference that can be nonzero, the numerator compares the observed difference with the true difference. Write \\(d=\\bar x_1-\\bar x_2\\), \\(\\Delta=\\mu_1-\\mu_2\\), and \\(SE=s_{\\bar x_1-\\bar x_2}\\). Then the standardized quantity is \\((d-\\Delta)/SE\\).",
            "Multiply the central t inequality by the positive standard error. Subtract the observed difference from all three parts. Multiplying by minus one reverses both inequality directions, and writing the smaller endpoint on the left puts the population difference between the two bounds.",
            "The resulting interval is centered on the observed difference. The critical value multiplied by the standard error is the margin of error. Adding and subtracting the same margin gives the upper and lower endpoints."
          ],
          "equations": [
            "-t_c<\\frac{d-\\Delta}{SE}<t_c",
            "-t_cSE<d-\\Delta<t_cSE",
            "-t_cSE-d<-\\Delta<t_cSE-d",
            "d-t_cSE<\\Delta<d+t_cSE"
          ],
          "symbols": "\\(d\\) (sample difference), \\(\\Delta\\) (population difference), \\(SE\\) (standard error), \\(t_c\\) (positive two-sided t cutoff).",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 5,
          "title": "General confidence interval for a difference of means",
          "topic": "twoMeans",
          "paragraphs": [
            "A \\(100(1-\\alpha)\\%\\) confidence interval for \\(\\mu_1-\\mu_2\\) has center \\(\\bar x_1-\\bar x_2\\). Choose the subtraction order before calculating and keep that same order in the numerical difference and population interpretation.",
            "The margin of error is \\(t_\\alpha(\\nu)\\) multiplied by the pooled standard error of the difference. The course table uses total two-tail \\(\\alpha\\). Increasing the confidence level uses a more extreme cutoff and gives a wider interval for the same data.",
            "A positive interval places the first population mean above the second. A negative interval places it below the second. An interval spanning zero includes equal population means among its compatible values."
          ],
          "equations": [
            "d=\\bar x_1-\\bar x_2,\\qquad M=t_\\alpha(\\nu)s_{\\bar x_1-\\bar x_2}",
            "L=d-M,\\qquad U=d+M",
            "(\\bar x_1-\\bar x_2)-t_\\alpha(\\nu)s_{\\bar x_1-\\bar x_2}<\\mu_1-\\mu_2<(\\bar x_1-\\bar x_2)+t_\\alpha(\\nu)s_{\\bar x_1-\\bar x_2}"
          ],
          "symbols": "\\(L,U\\) (interval endpoints), \\(M\\) (margin of error), \\(\\alpha\\) (total probability outside the central interval).",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 6,
          "title": "Urine production with a diuretic versus placebo",
          "topic": "twoMeans",
          "paragraphs": [
            "The diuretic group has a mean urine production of 1,400 mL/day and an SD of 245 mL/day. The placebo group has a mean of 1,180 mL/day and an SD of 144 mL/day. Each group has ten observations, and the requested direction is diuretic minus placebo.",
            "The observed mean difference is 220 mL/day. Pooling the sample variances gives a common variance estimate, and dividing its contribution across the two group sizes gives the standard error of the difference. The degrees of freedom are 18.",
            "The 95% interval is approximately 31 to 409 mL/day. Both endpoints are positive, so the compatible population differences favor greater urine production with the diuretic. The interval estimates the difference between population means in mL/day."
          ],
          "equations": [],
          "symbols": "",
          "case": "ci-urine",
          "subset": null,
          "core": true
        },
        {
          "page": 7,
          "title": "Repeated-sampling meaning of 95% confidence",
          "topic": "meaning",
          "paragraphs": [
            "Different random samples produce different sample estimates, standard errors, and interval endpoints. A 95% confidence procedure produces intervals containing the true population quantity in 95% of repeated applications under its assumptions. Some of the intervals miss that same fixed population quantity.",
            "The population difference remains fixed while the sampled data and the resulting interval change. Before sampling, the constructed interval is random. The lecture’s probability wording concerns this interval-generating process and its long-run coverage.",
            "For an observed interval, 95% confidence describes the procedure used to calculate its bounds. The endpoints estimate a population mean or difference, rather than enclosing 95% of individual observations. Confidence in a mean difference and variability among individual people describe different quantities."
          ],
          "equations": [
            "\\text{confidence level}=100(1-\\alpha)\\%"
          ],
          "symbols": "",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 8,
          "title": "Testing a zero-difference null using its interval",
          "topic": "decision",
          "paragraphs": [
            "For a two-sided comparison of two population means, \\(H_0:\\mu_1-\\mu_2=0\\) states that the means are equal. The alternative \\(H_A:\\mu_1-\\mu_2\\ne0\\) states that they differ. Zero is the null value for this difference.",
            "If the matching \\(100(1-\\alpha)\\%\\) interval includes zero, do not reject the equal-means null at significance level \\(\\alpha\\). The observed difference is compatible with a population difference of zero under that interval procedure.",
            "If the interval excludes zero, reject the equal-means null for the matching two-sided test. An entirely positive interval supports the first mean being higher, while an entirely negative interval supports it being lower. The confidence level, method, and subtraction order have to match the test being interpreted."
          ],
          "equations": [
            "L\\le0\\le U\\ \\Longrightarrow\\ \\text{do not reject }H_0",
            "L>0\\ \\text{or}\\ U<0\\ \\Longrightarrow\\ \\text{reject }H_0"
          ],
          "symbols": "\\(L,U\\) (bounds for the population difference). For a single mean or proportion, compare the interval with its specified null value instead of automatically using zero.",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 9,
          "title": "Confidence interval for one population mean",
          "topic": "oneMean",
          "paragraphs": [
            "A sample mean \\(\\bar x\\) estimates a population mean \\(\\mu\\). With sample SD \\(s\\) and sample size \\(n\\), the standard error is \\(s_{\\bar x}=s/\\sqrt n\\). This is uncertainty in the estimated mean, whereas the SD describes spread among individual observations.",
            "The one-sample t procedure has \\(\\nu=n-1\\) degrees of freedom. The interval extends a critical number of standard errors below and above the sample mean. Larger samples reduce the standard error for a fixed SD.",
            "For a reference mean \\(\\mu_0\\), \\(H_0:\\mu=\\mu_0\\) means that the population mean equals that reference. \\(H_A:\\mu\\ne\\mu_0\\) means it differs. A matching two-sided decision checks whether \\(\\mu_0\\) is included in the interval."
          ],
          "equations": [
            "s_{\\bar x}=\\frac{s}{\\sqrt n},\\qquad \\nu=n-1",
            "\\bar x-t_\\alpha(\\nu)\\frac{s}{\\sqrt n}<\\mu<\\bar x+t_\\alpha(\\nu)\\frac{s}{\\sqrt n}"
          ],
          "symbols": "\\(\\bar x\\) (sample mean), \\(s\\) (sample SD), \\(n\\) (sample size), \\(\\mu\\) (population mean), \\(\\mu_0\\) (null reference mean).",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 10,
          "title": "Mean heart rate for BME423 students",
          "topic": "oneMean",
          "paragraphs": [
            "Ten BME423 students have a sample mean heart rate of 67 beats/min and a sample SD of 9 beats/min. The population quantity is the mean heart rate for BME423 students, rather than the heart rate of a particular student.",
            "The standard error is \\(9/\\sqrt{10}\\), approximately 2.85 beats/min, and the degrees of freedom are nine. The positive t cutoff in the total two-tail 0.05 column is approximately 2.262. Multiplying the cutoff by the standard error gives a margin near 6.44 beats/min.",
            "Subtracting and adding the margin gives approximately 60.6 to 73.4 beats/min. This interval estimates the population mean. The SD remains the measure of variation among individual heart rates."
          ],
          "equations": [],
          "symbols": "",
          "case": "ci-heart",
          "subset": null,
          "core": true
        },
        {
          "page": 11,
          "title": "Difference of two proportions using the course pooled SE",
          "topic": "twoProportions",
          "paragraphs": [
            "For two groups with event counts \\(m_1,m_2\\) and sample sizes \\(n_1,n_2\\), the sample proportions are \\(\\hat p_1=m_1/n_1\\) and \\(\\hat p_2=m_2/n_2\\). Their difference estimates \\(p_1-p_2\\), the population difference in event probabilities.",
            "This lecture uses a pooled estimate \\(\\hat p=(m_1+m_2)/(n_1+n_2)\\). Its binary variance is \\(\\hat p(1-\\hat p)\\), and the standard error of the difference uses this pooled variance divided by each group size. The same lecture convention is used in the calculations here.",
            "The Normal critical value \\(z_\\alpha\\) gives the central confidence interval. For 95% confidence it is 1.96, equivalent to the infinite-df row of the two-tail t table. Multiply it by the standard error, then subtract and add that margin to the observed proportion difference."
          ],
          "equations": [
            "\\hat p_i=\\frac{m_i}{n_i},\\qquad \\hat p=\\frac{m_1+m_2}{n_1+n_2}",
            "s^2=\\hat p(1-\\hat p),\\qquad s_{\\hat p_1-\\hat p_2}=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
            "(\\hat p_1-\\hat p_2)-z_\\alpha s_{\\hat p_1-\\hat p_2}<p_1-p_2<(\\hat p_1-\\hat p_2)+z_\\alpha s_{\\hat p_1-\\hat p_2}"
          ],
          "symbols": "\\(m_i\\) (event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled proportion), \\(p_i\\) (population proportion).",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 12,
          "title": "Thrombosis with placebo versus aspirin",
          "topic": "twoProportions",
          "paragraphs": [
            "Thrombosis occurs in 18 of 25 placebo patients and six of 19 aspirin patients. The subtraction order is placebo minus aspirin. The slide rounds the proportions to 0.72 and 0.32 and supplies a rounded standard error of 0.15.",
            "Following those displayed rounded values gives a difference of 0.40 and a margin \\(1.96(0.15)=0.294\\). The endpoints are 0.106 and 0.694, displayed in the lecture as approximately 0.11 and 0.69.",
            "The result is an absolute difference of approximately 11 to 69 percentage points in event probability, favoring aspirin. It is not a relative-risk reduction. Keeping the original fractions and more intermediate digits produces slightly different endpoints because the slide rounds early."
          ],
          "equations": [],
          "symbols": "",
          "case": "ci-aspirin",
          "subset": null,
          "core": true
        },
        {
          "page": 13,
          "title": "Confidence interval for a population proportion",
          "topic": "oneProportion",
          "paragraphs": [
            "For one sample with \\(m\\) events among \\(n\\) observations, \\(\\hat p=m/n\\) estimates the population event proportion \\(p\\). The estimated standard error is the square root of \\(\\hat p(1-\\hat p)/n\\).",
            "The confidence interval has center \\(\\hat p\\) and margin \\(z_\\alpha s_{\\hat p}\\). The lower and upper limits are proportions. Multiplying a proportion by 100 expresses the same quantity as a percentage.",
            "For a specified reference \\(p_0\\), \\(H_0:p=p_0\\) says that the population proportion equals that reference. \\(H_A:p\\ne p_0\\) says it differs. The matching two-sided interval decision checks whether the particular \\(p_0\\) is included."
          ],
          "equations": [
            "\\hat p=\\frac{m}{n},\\qquad s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
            "\\hat p-z_\\alpha s_{\\hat p}<p<\\hat p+z_\\alpha s_{\\hat p}"
          ],
          "symbols": "\\(m\\) (event count), \\(n\\) (sample size), \\(\\hat p\\) (sample proportion), \\(p\\) (population proportion), \\(p_0\\) (null reference).",
          "case": null,
          "subset": null,
          "core": true
        },
        {
          "page": 14,
          "title": "Stimulant survey estimate, SE, and critical value",
          "topic": "oneProportion",
          "paragraphs": [
            "Among 500 responding college students, 177 report taking a non-prescribed stimulant during the past year. The sample proportion is \\(177/500=0.354\\). The population quantity is the proportion reporting this behavior in the population being studied.",
            "Compute the estimated binary variance as \\(0.354(1-0.354)\\), divide by 500, and take the square root. The resulting standard error is approximately 0.021386. Keeping the square root is essential because the variance and standard error are different quantities.",
            "The question asks whether the population proportion differs from 0.5. The null means half of the population, and the two-sided alternative means a proportion other than half. For a 95% interval, the Normal cutoff is 1.96, read from the infinite-df row of the total two-tail 0.05 t-table column."
          ],
          "equations": [],
          "symbols": "",
          "case": "ci-survey",
          "subset": [
            0,
            4
          ],
          "core": true
        },
        {
          "page": 15,
          "title": "Survey interval and decision about one half",
          "topic": "oneProportion",
          "paragraphs": [
            "The survey estimate is 0.354 and its standard error is approximately 0.021386. The 95% margin is \\(1.96\\) times that standard error. Subtracting and adding the margin gives the two endpoints around the same estimate.",
            "The resulting interval is approximately \\(0.312<p<0.396\\), or 31.2% to 39.6%. These bounds describe the estimated population proportion reporting nonmedical stimulant use during the specified year.",
            "The interval does not include 0.5, and both endpoints are below it. Reject \\(H_0:p=0.5\\) for the matching two-sided 0.05 comparison. In words, the data support a population proportion different from, and below, one half."
          ],
          "equations": [],
          "symbols": "",
          "case": "ci-survey",
          "subset": [
            4,
            8
          ],
          "core": true
        },
        {
          "page": 16,
          "title": "One-proportion interval and its null reference",
          "topic": "oneProportion",
          "paragraphs": [
            "The population proportion \\(p\\) is estimated by \\(\\hat p\\), and the uncertainty is measured using \\(s_{\\hat p}=\\sqrt{\\hat p(1-\\hat p)/n}\\). The same interval structure uses the sample estimate as its center and a critical multiple of the standard error as its margin.",
            "The null hypothesis is \\(H_0:p=p_0\\). Its meaning depends on the stated reference \\(p_0\\), so the decision concerns that value. For a reference of one half, the comparison is with 0.5 rather than with zero.",
            "An interval entirely below the reference supports a smaller population proportion, while an interval entirely above it supports a larger one. If the reference is included, the matching two-sided comparison does not reject that null value."
          ],
          "equations": [
            "\\hat p-z_\\alpha\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}<p<\\hat p+z_\\alpha\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}"
          ],
          "symbols": "\\(\\hat p\\) (sample proportion), \\(p\\) (population proportion), \\(p_0\\) (value specified by the null), \\(n\\) (sample size).",
          "case": null,
          "subset": null,
          "core": false
        },
        {
          "page": 17,
          "title": "Glucose lecture exercise, solved through the interval",
          "topic": "twoMeans",
          "paragraphs": [
            "A trial of 1,700 pre-diabetic participants compares placebo with a glucose-lowering drug. Each group has 850 participants. The placebo sample mean and SD are 112.4 and 4.7 mg/dL, while the drug mean and SD are 109.1 and 3.9 mg/dL.",
            "Define the difference as placebo minus drug, giving an observed 3.3 mg/dL difference. The pooled variance is 18.65, the degrees of freedom are 1,698, and the standard error is approximately 0.209481 mg/dL. The supplied table has no row for 1,698 degrees of freedom. The infinity row gives 1.9600 as a large-df approximation in the combined two-tail 0.05 column.",
            "The interval is approximately 2.889 to 3.711 mg/dL. Zero is outside the interval, so reject equal population means at the matching two-sided 0.05 level without separately calculating a t statistic. The positive direction supports lower population mean glucose in the drug group."
          ],
          "equations": [],
          "symbols": "",
          "case": "ci-glucose",
          "subset": null,
          "core": true
        }
      ]
    }
  ],
  "methods": [
    {
      "id": "meaning",
      "title": "Interpret the confidence level",
      "trigger": "A question asks what 95% confidence means or what an interval estimates.",
      "pages": [
        3,
        7
      ],
      "formula": [
        "\\text{confidence}=100(1-\\alpha)\\%"
      ],
      "example": "ci-heart",
      "shortcut": "Identify the fixed population quantity and the varying sample interval. State long-run coverage of the interval procedure.",
      "paragraphs": [
        "Under the equal-means null hypothesis, the standardized sample difference follows the central \\(t\\) distribution with the appropriate degrees of freedom. Positive and negative values represent opposite directions of the observed difference.",
        "The middle 95% lies between a negative and a positive critical value. A total of 5% remains outside this range, split into 2.5% in each tail. A two-sided comparison uses both extremes rather than treating the full 5% as one tail.",
        "The course notation \\(t_{0.05}(\\nu)\\) denotes the positive cutoff in the total two-tail 0.05 column. Its cumulative probability is 0.975. The degrees of freedom determine which row supplies the cutoff."
      ],
      "symbols": "\\(T_\\nu\\) (random t statistic), \\(t_{0.05}(\\nu)\\) (positive critical value with 0.05 total outside both tails)."
    },
    {
      "id": "twoMeans",
      "title": "Two independent means → pooled t interval",
      "trigger": "Two independent groups have means, SDs, and sample sizes; estimate their population mean difference.",
      "pages": [
        2,
        4,
        5,
        6,
        17
      ],
      "formula": [
        "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}",
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}},\\quad \\nu=n_1+n_2-2",
        "(\\bar x_1-\\bar x_2)\\pm t_\\alpha(\\nu)s_d"
      ],
      "example": "ci-urine",
      "shortcut": "For equal group sizes, \\(s^2=(s_1^2+s_2^2)/2\\) and \\(s_d=\\sqrt{(s_1^2+s_2^2)/n}\\). This shortens the same pooled calculation.",
      "paragraphs": [
        "The null hypothesis \\(H_0:\\mu_1=\\mu_2\\) states that the two population means are equal. The alternative \\(H_A:\\mu_1\\ne\\mu_2\\) states that they differ. The sample difference \\(\\bar x_1-\\bar x_2\\) estimates the population difference \\(\\mu_1-\\mu_2\\).",
        "The pooled two-sample method assumes independent observations from Normal populations with a common variance. The pooled variance \\(s^2\\) combines the two sample variances, weighting each by its sample degrees of freedom. Squaring each SD produces the variance needed in that calculation.",
        "The standard error describes the variability of the difference between sample means. Dividing the observed difference by this standard error gives the test statistic under a zero-difference null. The degrees of freedom are \\(\\nu=n_1+n_2-2\\), and a two-sided test compares the magnitude of the statistic with the positive course-table cutoff."
      ],
      "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(\\nu\\) (degrees of freedom)."
    },
    {
      "id": "oneMean",
      "title": "One population mean → one-sample t interval",
      "trigger": "One group has a sample mean, sample SD, and sample size; estimate the population mean.",
      "pages": [
        9,
        10
      ],
      "formula": [
        "s_{\\bar x}=\\frac{s}{\\sqrt n},\\quad \\nu=n-1",
        "\\bar x\\pm t_\\alpha(\\nu)s_{\\bar x}"
      ],
      "example": "ci-heart",
      "shortcut": "Compute SEM once, then margin once. Subtract and add the same margin around the sample mean.",
      "paragraphs": [
        "A sample mean \\(\\bar x\\) estimates a population mean \\(\\mu\\). With sample SD \\(s\\) and sample size \\(n\\), the standard error is \\(s_{\\bar x}=s/\\sqrt n\\). This is uncertainty in the estimated mean, whereas the SD describes spread among individual observations.",
        "The one-sample t procedure has \\(\\nu=n-1\\) degrees of freedom. The interval extends a critical number of standard errors below and above the sample mean. Larger samples reduce the standard error for a fixed SD.",
        "For a reference mean \\(\\mu_0\\), \\(H_0:\\mu=\\mu_0\\) means that the population mean equals that reference. \\(H_A:\\mu\\ne\\mu_0\\) means it differs. A matching two-sided decision checks whether \\(\\mu_0\\) is included in the interval."
      ],
      "symbols": "\\(\\bar x\\) (sample mean), \\(s\\) (sample SD), \\(n\\) (sample size), \\(\\mu\\) (population mean), \\(\\mu_0\\) (null reference mean)."
    },
    {
      "id": "twoProportions",
      "title": "Two event proportions → course pooled z interval",
      "trigger": "Two independent groups each have event counts and totals; estimate the difference in event probability.",
      "pages": [
        11,
        12
      ],
      "formula": [
        "\\hat p_i=m_i/n_i,\\quad \\hat p=\\frac{m_1+m_2}{n_1+n_2}",
        "s_d=\\sqrt{\\hat p(1-\\hat p)\\left(\\frac1{n_1}+\\frac1{n_2}\\right)}",
        "(\\hat p_1-\\hat p_2)\\pm z_\\alpha s_d"
      ],
      "example": "ci-aspirin",
      "shortcut": "Keep the group proportions for the center and the pooled proportion for the SE. These have different jobs in the lecture formula.",
      "paragraphs": [
        "For two groups with event counts \\(m_1,m_2\\) and sample sizes \\(n_1,n_2\\), the sample proportions are \\(\\hat p_1=m_1/n_1\\) and \\(\\hat p_2=m_2/n_2\\). Their difference estimates \\(p_1-p_2\\), the population difference in event probabilities.",
        "This lecture uses a pooled estimate \\(\\hat p=(m_1+m_2)/(n_1+n_2)\\). Its binary variance is \\(\\hat p(1-\\hat p)\\), and the standard error of the difference uses this pooled variance divided by each group size. The same lecture convention is used in the calculations here.",
        "The Normal critical value \\(z_\\alpha\\) gives the central confidence interval. For 95% confidence it is 1.96, equivalent to the infinite-df row of the two-tail t table. Multiply it by the standard error, then subtract and add that margin to the observed proportion difference."
      ],
      "symbols": "\\(m_i\\) (event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled proportion), \\(p_i\\) (population proportion)."
    },
    {
      "id": "oneProportion",
      "title": "One event proportion → Normal interval",
      "trigger": "One sample supplies an event count and total; estimate its population proportion.",
      "pages": [
        13,
        14,
        15,
        16
      ],
      "formula": [
        "\\hat p=\\frac mn,\\quad s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}n}",
        "\\hat p\\pm z_\\alpha s_{\\hat p}"
      ],
      "example": "ci-survey",
      "shortcut": "Convert count to proportion first. Work in proportion units until the final percentage interpretation.",
      "paragraphs": [
        "For one sample with \\(m\\) events among \\(n\\) observations, \\(\\hat p=m/n\\) estimates the population event proportion \\(p\\). The estimated standard error is the square root of \\(\\hat p(1-\\hat p)/n\\).",
        "The confidence interval has center \\(\\hat p\\) and margin \\(z_\\alpha s_{\\hat p}\\). The lower and upper limits are proportions. Multiplying a proportion by 100 expresses the same quantity as a percentage.",
        "For a specified reference \\(p_0\\), \\(H_0:p=p_0\\) says that the population proportion equals that reference. \\(H_A:p\\ne p_0\\) says it differs. The matching two-sided interval decision checks whether the particular \\(p_0\\) is included."
      ],
      "symbols": "\\(m\\) (event count), \\(n\\) (sample size), \\(\\hat p\\) (sample proportion), \\(p\\) (population proportion), \\(p_0\\) (null reference)."
    },
    {
      "id": "decision",
      "title": "Use the interval to make a two-sided decision",
      "trigger": "A confidence interval is given and the question asks whether the null population value is supported.",
      "pages": [
        8,
        15,
        17
      ],
      "formula": [
        "\\theta_0\\in[L,U]\\Rightarrow\\text{do not reject }H_0",
        "\\theta_0\\notin[L,U]\\Rightarrow\\text{reject }H_0"
      ],
      "example": "ci-glucose",
      "shortcut": "Differences use a null of zero. One mean or one proportion uses the specific reference in the question. Match confidence and significance levels.",
      "paragraphs": [
        "For a two-sided comparison of two population means, \\(H_0:\\mu_1-\\mu_2=0\\) states that the means are equal. The alternative \\(H_A:\\mu_1-\\mu_2\\ne0\\) states that they differ. Zero is the null value for this difference.",
        "If the matching \\(100(1-\\alpha)\\%\\) interval includes zero, do not reject the equal-means null at significance level \\(\\alpha\\). The observed difference is compatible with a population difference of zero under that interval procedure.",
        "If the interval excludes zero, reject the equal-means null for the matching two-sided test. An entirely positive interval supports the first mean being higher, while an entirely negative interval supports it being lower. The confidence level, method, and subtraction order have to match the test being interpreted."
      ],
      "symbols": "\\(L,U\\) (bounds for the population difference). For a single mean or proportion, compare the interval with its specified null value instead of automatically using zero."
    }
  ],
  "cases": [
    {
      "id": "ci-heart",
      "title": "BME423 student heart rate",
      "topic": "oneMean",
      "context": "A sample of ten BME423 students has the heart-rate summary below. Construct a 95% interval for the population mean heart rate. Treat the sample as independent observations from a Normal population.",
      "unit": "beats/min",
      "table": {
        "headers": [
          "Sample size",
          "Sample mean",
          "Sample SD"
        ],
        "rows": [
          [
            10,
            67,
            9
          ]
        ]
      },
      "tasks": [
        "Construct a 95% confidence interval for the population mean. Show the standard error, degrees of freedom, critical value, margin, and both endpoints.",
        "Interpret the interval in the measurement units and distinguish it from individual variation."
      ],
      "symbols": "\\(\\bar x\\) (sample mean), \\(s\\) (sample SD), \\(n\\) (number sampled), \\(s_{\\bar x}\\) (standard error of the mean), \\(\\mu\\) (population mean), \\(M\\) (margin).",
      "steps": [
        {
          "title": "Identify the population quantity",
          "general": [
            "\\text{estimate of }\\mu=\\bar x"
          ],
          "work": [
            "\\bar x=67,\\quad s=9,\\quad n=10"
          ],
          "words": "The sample mean estimates the population mean. The SD describes individual measurements; the standard error describes uncertainty in their mean."
        },
        {
          "title": "Calculate the standard error",
          "general": [
            "s_{\\bar x}=\\frac{s}{\\sqrt n}"
          ],
          "work": [
            "s_{\\bar x}=\\frac{9}{\\sqrt{10}}=\\frac{9}{3.162278}=2.84605"
          ],
          "words": "Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation."
        },
        {
          "title": "Choose degrees of freedom and the cutoff",
          "general": [
            "\\nu=n-1",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=10-1=9",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(9)=2.262"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 9 and the combined two-tail 0.05 column. The printed cutoff is 2.262. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "9",
            "column": "0.05",
            "value": 2.262,
            "actualDf": 9,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin of error",
          "general": [
            "M=t_c s_{\\bar x}"
          ],
          "work": [
            "M=2.262(2.84605)=6.437765"
          ],
          "words": "The margin has the same measurement units as the sample mean."
        },
        {
          "title": "Calculate the lower endpoint",
          "general": [
            "L=\\bar x-M"
          ],
          "work": [
            "L=67-6.437765=60.56224"
          ],
          "words": "Subtract the margin from the sample mean."
        },
        {
          "title": "Calculate the upper endpoint",
          "general": [
            "U=\\bar x+M"
          ],
          "work": [
            "U=67+6.437765=73.43776"
          ],
          "words": "Add the same margin to the sample mean."
        },
        {
          "title": "State the population interval",
          "general": [
            "L<\\mu<U"
          ],
          "work": [
            "60.56224<\\mu<73.43776"
          ],
          "words": "The 95% interval estimates the population mean in the original measurement units. It is not an interval containing this percentage of individual measurements."
        }
      ],
      "conclusion": "The 95% confidence interval for the population mean is 60.56224 to 73.43776 beats/min.",
      "source": 10,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "9",
        "column": "0.05",
        "value": 2.262,
        "actualDf": 9,
        "approximation": false
      },
      "values": {
        "n": 10,
        "x": 67,
        "sd": 9,
        "confidence": 0.95,
        "df": 9,
        "se": 2.846049894151541,
        "critical": 2.262,
        "margin": 6.437764860570786,
        "lower": 60.56223513942921,
        "upper": 73.43776486057078
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 60.56223513942921
    },
    {
      "id": "ci-urine",
      "title": "Diuretic versus placebo urine production",
      "topic": "twoMeans",
      "context": "A study compares daily urine production with a diuretic and a placebo. Assume independent Normal responses with a common population variance.",
      "unit": "mL/day",
      "table": {
        "headers": [
          "Group",
          "Sample size",
          "Mean",
          "SD"
        ],
        "rows": [
          [
            "diuretic",
            10,
            1400,
            245
          ],
          [
            "placebo",
            10,
            1180,
            144
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the population difference, diuretic minus placebo. Show both variance contributions, the pooled variance, SE, df, critical value, margin, and both bounds.",
        "Using the interval alone, decide whether the means differ at the matching two-sided 0.05 level. State both hypotheses in symbols and words, and conclude in context."
      ],
      "hypotheses": {
        "null": "H_0:\\mu_1-\\mu_2=0",
        "alternative": "H_A:\\mu_1-\\mu_2\\ne0",
        "nullWords": "The diuretic and placebo populations have equal means.",
        "alternativeWords": "The diuretic and placebo population means differ."
      },
      "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(s_d\\) (SE of the difference), \\(d\\) (sample difference), \\(\\Delta\\) (population difference).",
      "steps": [
        {
          "title": "Define the contrast and hypotheses",
          "general": [
            "\\Delta=\\mu_1-\\mu_2"
          ],
          "work": [
            "\\Delta=\\mu_{\\mathrm{diuretic}}-\\mu_{\\mathrm{placebo}}"
          ],
          "words": "Keep the direction diuretic minus placebo throughout. The null means equal population means; the two-sided alternative means different population means."
        },
        {
          "title": "Calculate the observed difference",
          "general": [
            "d=\\bar x_1-\\bar x_2"
          ],
          "work": [
            "d=1400-1180=220"
          ],
          "words": "This is the sample estimate of the population difference in mL/day."
        },
        {
          "title": "Square both group SDs",
          "general": [
            "v_1=s_1^2",
            "v_2=s_2^2"
          ],
          "work": [
            "v_1=245^2=60025",
            "v_2=144^2=20736"
          ],
          "words": "Each SD is squared before pooling, giving variances in squared measurement units."
        },
        {
          "title": "Pool both variance contributions",
          "general": [
            "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"
          ],
          "work": [
            "(n_1-1)s_1^2=(10-1)(60025)=540225",
            "(n_2-1)s_2^2=(10-1)(20736)=186624",
            "s^2=\\frac{540225+186624}{10+10-2}=\\frac{726849}{18}=40380.5"
          ],
          "words": "Weight each group variance by its own degrees of freedom, add the contributions, and divide by the combined degrees of freedom."
        },
        {
          "title": "Calculate the SE of the difference",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{40380.5}{10}+\\frac{40380.5}{10}}=\\sqrt{8076.1}=89.86712"
          ],
          "words": "Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units."
        },
        {
          "title": "Find degrees of freedom and the t cutoff",
          "general": [
            "\\nu=n_1+n_2-2",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=10+10-2=18",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(18)=2.101"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 18 and the combined two-tail 0.05 column. The printed cutoff is 2.101. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "18",
            "column": "0.05",
            "value": 2.101,
            "actualDf": 18,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=t_c s_d"
          ],
          "work": [
            "M=2.101(89.86712)=188.8108"
          ],
          "words": "Multiply the positive cutoff by the standard error of the difference."
        },
        {
          "title": "Calculate both bounds",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=220-188.8108=31.18917",
            "U=220+188.8108=408.8108"
          ],
          "words": "The bounds retain the diuretic minus placebo subtraction order."
        },
        {
          "title": "Make the decision using the interval",
          "general": [
            "0\\notin[L,U]\\Rightarrow\\text{reject }H_0"
          ],
          "work": [
            "[31.18917,408.8108]"
          ],
          "words": "Zero is outside the interval. Reject the equal-means null at the matching two-sided 0.05 level; no separate t statistic is required."
        }
      ],
      "conclusion": "The 95% CI for diuretic minus placebo is 31.18917 to 408.8108 mL/day. The population means differ, with diuretic higher.",
      "source": 6,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "18",
        "column": "0.05",
        "value": 2.101,
        "actualDf": 18,
        "approximation": false
      },
      "values": {
        "n1": 10,
        "n2": 10,
        "x1": 1400,
        "x2": 1180,
        "s1": 245,
        "s2": 144,
        "confidence": 0.95,
        "df": 18,
        "variance": 40380.5,
        "se": 89.86712413335592,
        "critical": 2.101,
        "difference": 220,
        "margin": 188.81082780418078,
        "lower": 31.189172195819225,
        "upper": 408.8108278041808,
        "reject": true
      },
      "module": 17,
      "tolerance": 0.04543356206667796,
      "answerName": "Lower endpoint",
      "answer": 31.189172195819225
    },
    {
      "id": "ci-aspirin",
      "title": "Aspirin thrombosis interval · slide rounding",
      "topic": "twoProportions",
      "context": "A trial compares thrombosis incidence with placebo and aspirin. Reproduce the slide’s displayed proportions 0.72 and 0.32 and its rounded SE of 0.15.",
      "unit": "proportion difference",
      "table": {
        "headers": [
          "Group",
          "Events",
          "Total observations"
        ],
        "rows": [
          [
            "placebo",
            18,
            25
          ],
          [
            "aspirin",
            6,
            19
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the difference in population event proportions using the Session 17 pooled standard error. Show both sample proportions, the pooled estimate, variance, SE, margin, and endpoints.",
        "Use the interval to decide whether the event probabilities differ at the matching two-sided 0.05 level. Interpret the direction and distinguish percentage points from a relative reduction."
      ],
      "hypotheses": {
        "null": "H_0:p_1-p_2=0",
        "alternative": "H_A:p_1-p_2\\ne0",
        "nullWords": "The placebo and aspirin populations have equal event probabilities.",
        "alternativeWords": "The placebo and aspirin population event probabilities differ."
      },
      "symbols": "\\(m_i\\) (group event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled estimate), \\(s_d\\) (SE of the difference), \\(d\\) (observed difference).",
      "steps": [
        {
          "title": "Define the population difference",
          "general": [
            "\\Delta=p_1-p_2"
          ],
          "work": [
            "\\Delta=p_{\\mathrm{placebo}}-p_{\\mathrm{aspirin}}"
          ],
          "words": "Use placebo minus aspirin. Equal population event probabilities correspond to a difference of zero."
        },
        {
          "title": "Calculate both sample proportions",
          "general": [
            "\\hat p_i=\\frac{m_i}{n_i}"
          ],
          "work": [
            "\\hat p_1=\\frac{18}{25}=0.72\\approx 0.72",
            "\\hat p_2=\\frac{6}{19}=0.3157895\\approx 0.32"
          ],
          "words": "Each event count is divided by its own group size."
        },
        {
          "title": "Calculate the course pooled proportion",
          "general": [
            "\\hat p=\\frac{m_1+m_2}{n_1+n_2}"
          ],
          "work": [
            "\\hat p=\\frac{18+6}{25+19}=\\frac{24}{44}=0.5454545"
          ],
          "words": "Combine event counts and group sizes before taking the fraction. This follows the Session 17 pooled convention."
        },
        {
          "title": "Calculate the pooled binary variance",
          "general": [
            "s^2=\\hat p(1-\\hat p)"
          ],
          "work": [
            "s^2=0.5454545(1-0.5454545)=0.2479339"
          ],
          "words": "The pooled binary variance is used in both group contributions to the SE."
        },
        {
          "title": "Calculate the difference SE",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{0.2479339}{25}+\\frac{0.2479339}{19}}=0.151547\\approx 0.15"
          ],
          "words": "Keep the two group sizes separate inside the square root. The lecture example uses the displayed rounded SE of 0.15 for its interval."
        },
        {
          "title": "Calculate the difference and margin",
          "general": [
            "d=\\hat p_1-\\hat p_2",
            "M=z_{0.05}s_d"
          ],
          "work": [
            "d=0.72-0.32=0.4",
            "M=1.96(0.15)=0.294"
          ],
          "words": "Use the Normal cutoff 1.96 from the infinite-df row, total two-tail 0.05 column. This reproduces the slide’s early-rounded arithmetic.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate both endpoints",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=0.4-0.294=0.106",
            "U=0.4+0.294=0.694"
          ],
          "words": "These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points."
        },
        {
          "title": "Interpret direction and the zero comparison",
          "general": [
            "0\\notin[L,U]\\Rightarrow\\text{reject equal proportions}"
          ],
          "work": [
            "0.106<p_1-p_2<0.694"
          ],
          "words": "The interval excludes zero. Retain the placebo minus aspirin order when stating which event probability is higher."
        }
      ],
      "conclusion": "The 95% interval for placebo minus aspirin is 0.106 to 0.694, equivalent to 10.60 to 69.40 percentage points. Equal event probabilities are excluded.",
      "source": 12,
      "rounded": true,
      "values": {
        "m1": 18,
        "n1": 25,
        "m2": 6,
        "n2": 19,
        "p1": 0.72,
        "p2": 0.32,
        "pooled": 0.5454545454545454,
        "variance": 0.24793388429752067,
        "se": 0.15,
        "rawSE": 0.1515470460848165,
        "difference": 0.39999999999999997,
        "critical": 1.96,
        "confidence": 0.95,
        "margin": 0.294,
        "lower": 0.10599999999999998,
        "upper": 0.694,
        "reject": true
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.10599999999999998
    },
    {
      "id": "ci-aspirin-precision",
      "title": "Aspirin thrombosis interval · retain intermediate digits",
      "topic": "twoProportions",
      "context": "Use the same thrombosis counts, retaining the original fractions and intermediate digits throughout the course pooled calculation.",
      "unit": "proportion difference",
      "table": {
        "headers": [
          "Group",
          "Events",
          "Total observations"
        ],
        "rows": [
          [
            "placebo",
            18,
            25
          ],
          [
            "aspirin",
            6,
            19
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the difference in population event proportions using the Session 17 pooled standard error. Show both sample proportions, the pooled estimate, variance, SE, margin, and endpoints.",
        "Use the interval to decide whether the event probabilities differ at the matching two-sided 0.05 level. Interpret the direction and distinguish percentage points from a relative reduction."
      ],
      "hypotheses": {
        "null": "H_0:p_1-p_2=0",
        "alternative": "H_A:p_1-p_2\\ne0",
        "nullWords": "The placebo and aspirin populations have equal event probabilities.",
        "alternativeWords": "The placebo and aspirin population event probabilities differ."
      },
      "symbols": "\\(m_i\\) (group event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled estimate), \\(s_d\\) (SE of the difference), \\(d\\) (observed difference).",
      "steps": [
        {
          "title": "Define the population difference",
          "general": [
            "\\Delta=p_1-p_2"
          ],
          "work": [
            "\\Delta=p_{\\mathrm{placebo}}-p_{\\mathrm{aspirin}}"
          ],
          "words": "Use placebo minus aspirin. Equal population event probabilities correspond to a difference of zero."
        },
        {
          "title": "Calculate both sample proportions",
          "general": [
            "\\hat p_i=\\frac{m_i}{n_i}"
          ],
          "work": [
            "\\hat p_1=\\frac{18}{25}=0.72",
            "\\hat p_2=\\frac{6}{19}=0.3157895"
          ],
          "words": "Each event count is divided by its own group size."
        },
        {
          "title": "Calculate the course pooled proportion",
          "general": [
            "\\hat p=\\frac{m_1+m_2}{n_1+n_2}"
          ],
          "work": [
            "\\hat p=\\frac{18+6}{25+19}=\\frac{24}{44}=0.5454545"
          ],
          "words": "Combine event counts and group sizes before taking the fraction. This follows the Session 17 pooled convention."
        },
        {
          "title": "Calculate the pooled binary variance",
          "general": [
            "s^2=\\hat p(1-\\hat p)"
          ],
          "work": [
            "s^2=0.5454545(1-0.5454545)=0.2479339"
          ],
          "words": "The pooled binary variance is used in both group contributions to the SE."
        },
        {
          "title": "Calculate the difference SE",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{0.2479339}{25}+\\frac{0.2479339}{19}}=0.151547"
          ],
          "words": "Keep the two group sizes separate inside the square root."
        },
        {
          "title": "Calculate the difference and margin",
          "general": [
            "d=\\hat p_1-\\hat p_2",
            "M=z_{0.05}s_d"
          ],
          "work": [
            "d=0.72-0.3157895=0.4042105",
            "M=1.96(0.151547)=0.2970322"
          ],
          "words": "Use the Normal cutoff 1.96 from the infinite-df row, total two-tail 0.05 column.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate both endpoints",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=0.4042105-0.2970322=0.1071783",
            "U=0.4042105+0.2970322=0.7012427"
          ],
          "words": "These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points."
        },
        {
          "title": "Interpret direction and the zero comparison",
          "general": [
            "0\\notin[L,U]\\Rightarrow\\text{reject equal proportions}"
          ],
          "work": [
            "0.1071783<p_1-p_2<0.7012427"
          ],
          "words": "The interval excludes zero. Retain the placebo minus aspirin order when stating which event probability is higher."
        }
      ],
      "conclusion": "The 95% interval for placebo minus aspirin is 0.1071783 to 0.7012427, equivalent to 10.72 to 70.12 percentage points. Equal event probabilities are excluded.",
      "source": 12,
      "rounded": false,
      "values": {
        "m1": 18,
        "n1": 25,
        "m2": 6,
        "n2": 19,
        "p1": 0.72,
        "p2": 0.3157894736842105,
        "pooled": 0.5454545454545454,
        "variance": 0.24793388429752067,
        "se": 0.1515470460848165,
        "rawSE": 0.1515470460848165,
        "difference": 0.40421052631578946,
        "critical": 1.96,
        "confidence": 0.95,
        "margin": 0.29703221032624033,
        "lower": 0.10717831598954913,
        "upper": 0.7012427366420297,
        "reject": true
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.10717831598954913
    },
    {
      "id": "ci-survey",
      "title": "Non-prescribed stimulant survey",
      "topic": "oneProportion",
      "context": "Of 500 college-student respondents, 177 answer yes to taking a non-prescribed stimulant in the last year. Determine whether the population proportion differs from one half.",
      "unit": "proportion",
      "table": {
        "headers": [
          "Event count",
          "Total observations",
          "Reference proportion"
        ],
        "rows": [
          [
            177,
            500,
            0.5
          ]
        ]
      },
      "tasks": [
        "Construct a 95% CI for the population proportion. Show the estimate, standard error, cutoff, margin, and both bounds.",
        "Determine whether the population proportion differs from 0.5 using the interval. State the hypotheses in symbols and words and interpret the result."
      ],
      "hypotheses": {
        "null": "H_0:p=0.5",
        "alternative": "H_A:p\\ne 0.5",
        "nullWords": "The population event proportion equals 0.5.",
        "alternativeWords": "The population event proportion differs from 0.5."
      },
      "symbols": "\\(m\\) (event count), \\(n\\) (sample size), \\(\\hat p\\) (sample event proportion), \\(p\\) (population event proportion), \\(p_0\\) (null reference), \\(s_{\\hat p}\\) (estimated SE).",
      "steps": [
        {
          "title": "State the proportion and hypotheses",
          "general": [
            "H_0:p=p_0,\\qquad H_A:p\\ne p_0"
          ],
          "work": [
            "p_0=0.5"
          ],
          "words": "The null states that the population event proportion is 0.5. The two-sided alternative states that it differs from 0.5."
        },
        {
          "title": "Calculate the sample proportion",
          "general": [
            "\\hat p=\\frac{m}{n}"
          ],
          "work": [
            "\\hat p=\\frac{177}{500}=0.354"
          ],
          "words": "Divide event count by the total number of observations."
        },
        {
          "title": "Calculate the proportion SE",
          "general": [
            "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}"
          ],
          "work": [
            "\\hat p(1-\\hat p)=0.354(1-0.354)=0.228684",
            "s_{\\hat p}=\\sqrt{\\frac{0.228684}{500}}=\\sqrt{0.000457368}=0.02138616"
          ],
          "words": "Subtract the proportion from one, multiply, divide by sample size, then take the square root."
        },
        {
          "title": "Select the Normal cutoff",
          "general": [
            "z_c=z_\\alpha"
          ],
          "work": [
            "\\alpha=1-0.95=0.05,\\quad z_c=1.96"
          ],
          "words": "Use the infinite-df row of the course two-tail t table. For 95% confidence, the positive cutoff is 1.96.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=z_c s_{\\hat p}"
          ],
          "work": [
            "M=1.96(0.02138616)=0.04191688"
          ],
          "words": "The margin is in proportion units. Multiply by 100 only when converting the final interpretation to percentage points."
        },
        {
          "title": "Calculate the lower bound",
          "general": [
            "L=\\hat p-M"
          ],
          "work": [
            "L=0.354-0.04191688=0.3120831"
          ],
          "words": "Subtract the margin from the observed proportion."
        },
        {
          "title": "Calculate the upper bound",
          "general": [
            "U=\\hat p+M"
          ],
          "work": [
            "U=0.354+0.04191688=0.3959169"
          ],
          "words": "Add the same margin to the observed proportion."
        },
        {
          "title": "Compare with the null reference",
          "general": [
            "p_0\\notin[L,U]\\Rightarrow\\text{reject }H_0"
          ],
          "work": [
            "0.3120831<p<0.3959169,\\quad p_0=0.5"
          ],
          "words": "Reject equality with 0.5 at the matching two-sided 0.05 level. The comparison is with the stated reference, not automatically with zero."
        }
      ],
      "conclusion": "The 95% CI is 0.3120831 to 0.3959169, or 31.21% to 39.59%. The reference is excluded; the data support a different population proportion.",
      "source": 14,
      "values": {
        "m": 177,
        "n": 500,
        "p": 0.354,
        "reference": 0.5,
        "confidence": 0.95,
        "variance": 0.228684,
        "se": 0.021386163751360363,
        "critical": 1.96,
        "margin": 0.04191688095266631,
        "lower": 0.31208311904733366,
        "upper": 0.3959168809526663,
        "reject": true
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.31208311904733366
    },
    {
      "id": "ci-glucose",
      "title": "Session 17 glucose lecture exercise",
      "topic": "twoMeans",
      "context": "A drug is purported to reduce fasting plasma glucose in pre-diabetic patients. A trial includes 1,700 participants, divided equally between placebo and drug. Assume independent Normal responses with a common population variance.",
      "unit": "mg/dL",
      "table": {
        "headers": [
          "Group",
          "Sample size",
          "Mean",
          "SD"
        ],
        "rows": [
          [
            "placebo",
            850,
            112.4,
            4.7
          ],
          [
            "drug",
            850,
            109.1,
            3.9
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the population difference, placebo minus drug. Show both variance contributions, the pooled variance, SE, df, critical value, margin, and both bounds.",
        "Using the interval alone, decide whether the means differ at the matching two-sided 0.05 level. State both hypotheses in symbols and words, and conclude in context."
      ],
      "hypotheses": {
        "null": "H_0:\\mu_1-\\mu_2=0",
        "alternative": "H_A:\\mu_1-\\mu_2\\ne0",
        "nullWords": "The placebo and drug populations have equal means.",
        "alternativeWords": "The placebo and drug population means differ."
      },
      "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(s_d\\) (SE of the difference), \\(d\\) (sample difference), \\(\\Delta\\) (population difference).",
      "steps": [
        {
          "title": "Define the contrast and hypotheses",
          "general": [
            "\\Delta=\\mu_1-\\mu_2"
          ],
          "work": [
            "\\Delta=\\mu_{\\mathrm{placebo}}-\\mu_{\\mathrm{drug}}"
          ],
          "words": "Keep the direction placebo minus drug throughout. The null means equal population means; the two-sided alternative means different population means."
        },
        {
          "title": "Calculate the observed difference",
          "general": [
            "d=\\bar x_1-\\bar x_2"
          ],
          "work": [
            "d=112.4-109.1=3.3"
          ],
          "words": "This is the sample estimate of the population difference in mg/dL."
        },
        {
          "title": "Square both group SDs",
          "general": [
            "v_1=s_1^2",
            "v_2=s_2^2"
          ],
          "work": [
            "v_1=4.7^2=22.09",
            "v_2=3.9^2=15.21"
          ],
          "words": "Each SD is squared before pooling, giving variances in squared measurement units."
        },
        {
          "title": "Pool both variance contributions",
          "general": [
            "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"
          ],
          "work": [
            "(n_1-1)s_1^2=(850-1)(22.09)=18754.41",
            "(n_2-1)s_2^2=(850-1)(15.21)=12913.29",
            "s^2=\\frac{18754.41+12913.29}{850+850-2}=\\frac{31667.7}{1698}=18.65"
          ],
          "words": "Weight each group variance by its own degrees of freedom, add the contributions, and divide by the combined degrees of freedom."
        },
        {
          "title": "Calculate the SE of the difference",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{18.65}{850}+\\frac{18.65}{850}}=\\sqrt{0.04388235}=0.2094812"
          ],
          "words": "Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units."
        },
        {
          "title": "Find degrees of freedom and the t cutoff",
          "general": [
            "\\nu=n_1+n_2-2",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=850+850-2=1698",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(1698)\\approx t_{0.05}(\\infty)=1.9600"
          ],
          "words": "The supplied t table has no row for 1698 df. On PDF page 2, the infinity row and combined two-tail 0.05 column give 1.9600. This is a declared large-df Normal approximation, not an exact finite-df lookup. A conservative printed alternative is row 200, value 1.972; the uploaded lecture does not state a mandatory missing-row rule.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "actualDf": 1698,
            "approximation": true
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=t_c s_d"
          ],
          "work": [
            "M=1.96(0.2094812)=0.4105831"
          ],
          "words": "Multiply the positive cutoff by the standard error of the difference."
        },
        {
          "title": "Calculate both bounds",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=3.3-0.4105831=2.889417",
            "U=3.3+0.4105831=3.710583"
          ],
          "words": "The bounds retain the placebo minus drug subtraction order."
        },
        {
          "title": "Make the decision using the interval",
          "general": [
            "0\\notin[L,U]\\Rightarrow\\text{reject }H_0"
          ],
          "work": [
            "[2.889417,3.710583]"
          ],
          "words": "Zero is outside the interval. Reject the equal-means null at the matching two-sided 0.05 level; no separate t statistic is required."
        }
      ],
      "conclusion": "The 95% CI for placebo minus drug is 2.889417 to 3.710583 mg/dL. The population means differ, with placebo higher.",
      "source": 17,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "actualDf": 1698,
        "approximation": true
      },
      "values": {
        "n1": 850,
        "n2": 850,
        "x1": 112.4,
        "x2": 109.1,
        "s1": 4.7,
        "s2": 3.9,
        "confidence": 0.95,
        "df": 1698,
        "variance": 18.65,
        "se": 0.20948115175637275,
        "critical": 1.96,
        "difference": 3.3000000000000114,
        "margin": 0.4105830574424906,
        "lower": 2.8894169425575207,
        "upper": 3.710583057442502,
        "reject": true
      },
      "module": 17,
      "tolerance": 0.003013773821076537,
      "alternativeTableAnswer": {
        "row": "200",
        "critical": 1.972,
        "lower": 2.886903168736444
      },
      "answerName": "Lower endpoint",
      "answer": 2.8894169425575207
    },
    {
      "id": "ci-heart-practice",
      "title": "Resting heart rate in a student sample",
      "topic": "oneMean",
      "context": "A study measures resting heart rate in a student sample and obtains the sample summary below. Assume independent observations from a Normal population.",
      "unit": "beats/min",
      "table": {
        "headers": [
          "Sample size",
          "Sample mean",
          "Sample SD"
        ],
        "rows": [
          [
            16,
            72,
            8
          ]
        ]
      },
      "tasks": [
        "Construct a 95% confidence interval for the population mean. Show the standard error, degrees of freedom, critical value, margin, and both endpoints.",
        "Interpret the interval in the measurement units and distinguish it from individual variation."
      ],
      "symbols": "\\(\\bar x\\) (sample mean), \\(s\\) (sample SD), \\(n\\) (number sampled), \\(s_{\\bar x}\\) (standard error of the mean), \\(\\mu\\) (population mean), \\(M\\) (margin).",
      "steps": [
        {
          "title": "Identify the population quantity",
          "general": [
            "\\text{estimate of }\\mu=\\bar x"
          ],
          "work": [
            "\\bar x=72,\\quad s=8,\\quad n=16"
          ],
          "words": "The sample mean estimates the population mean. The SD describes individual measurements; the standard error describes uncertainty in their mean."
        },
        {
          "title": "Calculate the standard error",
          "general": [
            "s_{\\bar x}=\\frac{s}{\\sqrt n}"
          ],
          "work": [
            "s_{\\bar x}=\\frac{8}{\\sqrt{16}}=\\frac{8}{4}=2"
          ],
          "words": "Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation."
        },
        {
          "title": "Choose degrees of freedom and the cutoff",
          "general": [
            "\\nu=n-1",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=16-1=15",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(15)=2.131"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 15 and the combined two-tail 0.05 column. The printed cutoff is 2.131. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "15",
            "column": "0.05",
            "value": 2.131,
            "actualDf": 15,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin of error",
          "general": [
            "M=t_c s_{\\bar x}"
          ],
          "work": [
            "M=2.131(2)=4.262"
          ],
          "words": "The margin has the same measurement units as the sample mean."
        },
        {
          "title": "Calculate the lower endpoint",
          "general": [
            "L=\\bar x-M"
          ],
          "work": [
            "L=72-4.262=67.738"
          ],
          "words": "Subtract the margin from the sample mean."
        },
        {
          "title": "Calculate the upper endpoint",
          "general": [
            "U=\\bar x+M"
          ],
          "work": [
            "U=72+4.262=76.262"
          ],
          "words": "Add the same margin to the sample mean."
        },
        {
          "title": "State the population interval",
          "general": [
            "L<\\mu<U"
          ],
          "work": [
            "67.738<\\mu<76.262"
          ],
          "words": "The 95% interval estimates the population mean in the original measurement units. It is not an interval containing this percentage of individual measurements."
        }
      ],
      "conclusion": "The 95% confidence interval for the population mean is 67.738 to 76.262 beats/min.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "15",
        "column": "0.05",
        "value": 2.131,
        "actualDf": 15,
        "approximation": false
      },
      "values": {
        "n": 16,
        "x": 72,
        "sd": 8,
        "confidence": 0.95,
        "df": 15,
        "se": 2.0,
        "critical": 2.131,
        "margin": 4.262,
        "lower": 67.738,
        "upper": 76.262
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 67.738
    },
    {
      "id": "ci-reaction",
      "title": "Reaction time in a laboratory sample",
      "topic": "oneMean",
      "context": "A study measures reaction time in a laboratory sample and obtains the sample summary below. Assume independent observations from a Normal population.",
      "unit": "ms",
      "table": {
        "headers": [
          "Sample size",
          "Sample mean",
          "Sample SD"
        ],
        "rows": [
          [
            25,
            310,
            40
          ]
        ]
      },
      "tasks": [
        "Construct a 95% confidence interval for the population mean. Show the standard error, degrees of freedom, critical value, margin, and both endpoints.",
        "Interpret the interval in the measurement units and distinguish it from individual variation."
      ],
      "symbols": "\\(\\bar x\\) (sample mean), \\(s\\) (sample SD), \\(n\\) (number sampled), \\(s_{\\bar x}\\) (standard error of the mean), \\(\\mu\\) (population mean), \\(M\\) (margin).",
      "steps": [
        {
          "title": "Identify the population quantity",
          "general": [
            "\\text{estimate of }\\mu=\\bar x"
          ],
          "work": [
            "\\bar x=310,\\quad s=40,\\quad n=25"
          ],
          "words": "The sample mean estimates the population mean. The SD describes individual measurements; the standard error describes uncertainty in their mean."
        },
        {
          "title": "Calculate the standard error",
          "general": [
            "s_{\\bar x}=\\frac{s}{\\sqrt n}"
          ],
          "work": [
            "s_{\\bar x}=\\frac{40}{\\sqrt{25}}=\\frac{40}{5}=8"
          ],
          "words": "Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation."
        },
        {
          "title": "Choose degrees of freedom and the cutoff",
          "general": [
            "\\nu=n-1",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=25-1=24",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(24)=2.064"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 24 and the combined two-tail 0.05 column. The printed cutoff is 2.064. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "24",
            "column": "0.05",
            "value": 2.064,
            "actualDf": 24,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin of error",
          "general": [
            "M=t_c s_{\\bar x}"
          ],
          "work": [
            "M=2.064(8)=16.512"
          ],
          "words": "The margin has the same measurement units as the sample mean."
        },
        {
          "title": "Calculate the lower endpoint",
          "general": [
            "L=\\bar x-M"
          ],
          "work": [
            "L=310-16.512=293.488"
          ],
          "words": "Subtract the margin from the sample mean."
        },
        {
          "title": "Calculate the upper endpoint",
          "general": [
            "U=\\bar x+M"
          ],
          "work": [
            "U=310+16.512=326.512"
          ],
          "words": "Add the same margin to the sample mean."
        },
        {
          "title": "State the population interval",
          "general": [
            "L<\\mu<U"
          ],
          "work": [
            "293.488<\\mu<326.512"
          ],
          "words": "The 95% interval estimates the population mean in the original measurement units. It is not an interval containing this percentage of individual measurements."
        }
      ],
      "conclusion": "The 95% confidence interval for the population mean is 293.488 to 326.512 ms.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "24",
        "column": "0.05",
        "value": 2.064,
        "actualDf": 24,
        "approximation": false
      },
      "values": {
        "n": 25,
        "x": 310,
        "sd": 40,
        "confidence": 0.95,
        "df": 24,
        "se": 8.0,
        "critical": 2.064,
        "margin": 16.512,
        "lower": 293.488,
        "upper": 326.512
      },
      "module": 17,
      "tolerance": 0.0045000000000000005,
      "answerName": "Lower endpoint",
      "answer": 293.488
    },
    {
      "id": "ci-pressure",
      "title": "Systolic pressure in a clinic sample",
      "topic": "oneMean",
      "context": "A study measures systolic pressure in a clinic sample and obtains the sample summary below. Assume independent observations from a Normal population.",
      "unit": "mmHg",
      "table": {
        "headers": [
          "Sample size",
          "Sample mean",
          "Sample SD"
        ],
        "rows": [
          [
            12,
            124,
            12
          ]
        ]
      },
      "tasks": [
        "Construct a 95% confidence interval for the population mean. Show the standard error, degrees of freedom, critical value, margin, and both endpoints.",
        "Interpret the interval in the measurement units and distinguish it from individual variation."
      ],
      "symbols": "\\(\\bar x\\) (sample mean), \\(s\\) (sample SD), \\(n\\) (number sampled), \\(s_{\\bar x}\\) (standard error of the mean), \\(\\mu\\) (population mean), \\(M\\) (margin).",
      "steps": [
        {
          "title": "Identify the population quantity",
          "general": [
            "\\text{estimate of }\\mu=\\bar x"
          ],
          "work": [
            "\\bar x=124,\\quad s=12,\\quad n=12"
          ],
          "words": "The sample mean estimates the population mean. The SD describes individual measurements; the standard error describes uncertainty in their mean."
        },
        {
          "title": "Calculate the standard error",
          "general": [
            "s_{\\bar x}=\\frac{s}{\\sqrt n}"
          ],
          "work": [
            "s_{\\bar x}=\\frac{12}{\\sqrt{12}}=\\frac{12}{3.464102}=3.464102"
          ],
          "words": "Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation."
        },
        {
          "title": "Choose degrees of freedom and the cutoff",
          "general": [
            "\\nu=n-1",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=12-1=11",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(11)=2.201"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 11 and the combined two-tail 0.05 column. The printed cutoff is 2.201. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "11",
            "column": "0.05",
            "value": 2.201,
            "actualDf": 11,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin of error",
          "general": [
            "M=t_c s_{\\bar x}"
          ],
          "work": [
            "M=2.201(3.464102)=7.624488"
          ],
          "words": "The margin has the same measurement units as the sample mean."
        },
        {
          "title": "Calculate the lower endpoint",
          "general": [
            "L=\\bar x-M"
          ],
          "work": [
            "L=124-7.624488=116.3755"
          ],
          "words": "Subtract the margin from the sample mean."
        },
        {
          "title": "Calculate the upper endpoint",
          "general": [
            "U=\\bar x+M"
          ],
          "work": [
            "U=124+7.624488=131.6245"
          ],
          "words": "Add the same margin to the sample mean."
        },
        {
          "title": "State the population interval",
          "general": [
            "L<\\mu<U"
          ],
          "work": [
            "116.3755<\\mu<131.6245"
          ],
          "words": "The 95% interval estimates the population mean in the original measurement units. It is not an interval containing this percentage of individual measurements."
        }
      ],
      "conclusion": "The 95% confidence interval for the population mean is 116.3755 to 131.6245 mmHg.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "11",
        "column": "0.05",
        "value": 2.201,
        "actualDf": 11,
        "approximation": false
      },
      "values": {
        "n": 12,
        "x": 124,
        "sd": 12,
        "confidence": 0.95,
        "df": 11,
        "se": 3.464101615137755,
        "critical": 2.201,
        "margin": 7.624487654918199,
        "lower": 116.3755123450818,
        "upper": 131.6244876549182
      },
      "module": 17,
      "tolerance": 0.0022320508075688774,
      "answerName": "Lower endpoint",
      "answer": 116.3755123450818
    },
    {
      "id": "ci-respiration",
      "title": "Respiration rate after quiet rest",
      "topic": "oneMean",
      "context": "A study measures respiration rate after quiet rest and obtains the sample summary below. Assume independent observations from a Normal population.",
      "unit": "breaths/min",
      "table": {
        "headers": [
          "Sample size",
          "Sample mean",
          "Sample SD"
        ],
        "rows": [
          [
            20,
            16,
            3
          ]
        ]
      },
      "tasks": [
        "Construct a 99% confidence interval for the population mean. Show the standard error, degrees of freedom, critical value, margin, and both endpoints.",
        "Interpret the interval in the measurement units and distinguish it from individual variation."
      ],
      "symbols": "\\(\\bar x\\) (sample mean), \\(s\\) (sample SD), \\(n\\) (number sampled), \\(s_{\\bar x}\\) (standard error of the mean), \\(\\mu\\) (population mean), \\(M\\) (margin).",
      "steps": [
        {
          "title": "Identify the population quantity",
          "general": [
            "\\text{estimate of }\\mu=\\bar x"
          ],
          "work": [
            "\\bar x=16,\\quad s=3,\\quad n=20"
          ],
          "words": "The sample mean estimates the population mean. The SD describes individual measurements; the standard error describes uncertainty in their mean."
        },
        {
          "title": "Calculate the standard error",
          "general": [
            "s_{\\bar x}=\\frac{s}{\\sqrt n}"
          ],
          "work": [
            "s_{\\bar x}=\\frac{3}{\\sqrt{20}}=\\frac{3}{4.472136}=0.6708204"
          ],
          "words": "Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation."
        },
        {
          "title": "Choose degrees of freedom and the cutoff",
          "general": [
            "\\nu=n-1",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=20-1=19",
            "\\alpha=1-0.99=0.01",
            "t_{0.01}(19)=2.861"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 19 and the combined two-tail 0.01 column. The printed cutoff is 2.861. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "19",
            "column": "0.01",
            "value": 2.861,
            "actualDf": 19,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin of error",
          "general": [
            "M=t_c s_{\\bar x}"
          ],
          "work": [
            "M=2.861(0.6708204)=1.919217"
          ],
          "words": "The margin has the same measurement units as the sample mean."
        },
        {
          "title": "Calculate the lower endpoint",
          "general": [
            "L=\\bar x-M"
          ],
          "work": [
            "L=16-1.919217=14.08078"
          ],
          "words": "Subtract the margin from the sample mean."
        },
        {
          "title": "Calculate the upper endpoint",
          "general": [
            "U=\\bar x+M"
          ],
          "work": [
            "U=16+1.919217=17.91922"
          ],
          "words": "Add the same margin to the sample mean."
        },
        {
          "title": "State the population interval",
          "general": [
            "L<\\mu<U"
          ],
          "work": [
            "14.08078<\\mu<17.91922"
          ],
          "words": "The 99% interval estimates the population mean in the original measurement units. It is not an interval containing this percentage of individual measurements."
        }
      ],
      "conclusion": "The 99% confidence interval for the population mean is 14.08078 to 17.91922 breaths/min.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "19",
        "column": "0.01",
        "value": 2.861,
        "actualDf": 19,
        "approximation": false
      },
      "values": {
        "n": 20,
        "x": 16,
        "sd": 3,
        "confidence": 0.99,
        "df": 19,
        "se": 0.6708203932499369,
        "critical": 2.861,
        "margin": 1.9192171450880697,
        "lower": 14.08078285491193,
        "upper": 17.91921714508807
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 14.08078285491193
    },
    {
      "id": "ci-neural",
      "title": "Neural response under two conditions",
      "topic": "twoMeans",
      "context": "An independent-group biomedical study collects the following measurements. Assume independent Normal responses with a common population variance.",
      "unit": "score units",
      "table": {
        "headers": [
          "Group",
          "Sample size",
          "Mean",
          "SD"
        ],
        "rows": [
          [
            "group1",
            12,
            18,
            4
          ],
          [
            "group2",
            16,
            15,
            5
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the population difference, group1 minus group2. Show both variance contributions, the pooled variance, SE, df, critical value, margin, and both bounds.",
        "Using the interval alone, decide whether the means differ at the matching two-sided 0.05 level. State both hypotheses in symbols and words, and conclude in context."
      ],
      "hypotheses": {
        "null": "H_0:\\mu_1-\\mu_2=0",
        "alternative": "H_A:\\mu_1-\\mu_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal means.",
        "alternativeWords": "The group1 and group2 population means differ."
      },
      "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(s_d\\) (SE of the difference), \\(d\\) (sample difference), \\(\\Delta\\) (population difference).",
      "steps": [
        {
          "title": "Define the contrast and hypotheses",
          "general": [
            "\\Delta=\\mu_1-\\mu_2"
          ],
          "work": [
            "\\Delta=\\mu_{\\mathrm{group1}}-\\mu_{\\mathrm{group2}}"
          ],
          "words": "Keep the direction group1 minus group2 throughout. The null means equal population means; the two-sided alternative means different population means."
        },
        {
          "title": "Calculate the observed difference",
          "general": [
            "d=\\bar x_1-\\bar x_2"
          ],
          "work": [
            "d=18-15=3"
          ],
          "words": "This is the sample estimate of the population difference in score units."
        },
        {
          "title": "Square both group SDs",
          "general": [
            "v_1=s_1^2",
            "v_2=s_2^2"
          ],
          "work": [
            "v_1=4^2=16",
            "v_2=5^2=25"
          ],
          "words": "Each SD is squared before pooling, giving variances in squared measurement units."
        },
        {
          "title": "Pool both variance contributions",
          "general": [
            "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"
          ],
          "work": [
            "(n_1-1)s_1^2=(12-1)(16)=176",
            "(n_2-1)s_2^2=(16-1)(25)=375",
            "s^2=\\frac{176+375}{12+16-2}=\\frac{551}{26}=21.19231"
          ],
          "words": "Weight each group variance by its own degrees of freedom, add the contributions, and divide by the combined degrees of freedom."
        },
        {
          "title": "Calculate the SE of the difference",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{21.19231}{12}+\\frac{21.19231}{16}}=\\sqrt{3.090545}=1.757995"
          ],
          "words": "Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units."
        },
        {
          "title": "Find degrees of freedom and the t cutoff",
          "general": [
            "\\nu=n_1+n_2-2",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=12+16-2=26",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(26)=2.056"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 26 and the combined two-tail 0.05 column. The printed cutoff is 2.056. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "26",
            "column": "0.05",
            "value": 2.056,
            "actualDf": 26,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=t_c s_d"
          ],
          "work": [
            "M=2.056(1.757995)=3.614437"
          ],
          "words": "Multiply the positive cutoff by the standard error of the difference."
        },
        {
          "title": "Calculate both bounds",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=3-3.614437=-0.6144368",
            "U=3+3.614437=6.614437"
          ],
          "words": "The bounds retain the group1 minus group2 subtraction order."
        },
        {
          "title": "Make the decision using the interval",
          "general": [
            "0\\in[L,U]\\Rightarrow\\text{do not reject }H_0"
          ],
          "work": [
            "[-0.6144368,6.614437]"
          ],
          "words": "Zero is inside the interval. Do not reject the equal-means null at the matching two-sided 0.05 level; no separate t statistic is required."
        }
      ],
      "conclusion": "The 95% CI for group1 minus group2 is -0.6144368 to 6.614437 score units. The interval includes equal population means, so the comparison does not reject equality.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "26",
        "column": "0.05",
        "value": 2.056,
        "actualDf": 26,
        "approximation": false
      },
      "values": {
        "n1": 12,
        "n2": 16,
        "x1": 18,
        "x2": 15,
        "s1": 4,
        "s2": 5,
        "confidence": 0.95,
        "df": 26,
        "variance": 21.192307692307693,
        "se": 1.7579945596602033,
        "critical": 2.056,
        "difference": 3,
        "margin": 3.6144368146613783,
        "lower": -0.6144368146613783,
        "upper": 6.614436814661378,
        "reject": false
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": -0.6144368146613783
    },
    {
      "id": "ci-sleep",
      "title": "Sleep duration in two treatment groups",
      "topic": "twoMeans",
      "context": "An independent-group biomedical study collects the following measurements. Assume independent Normal responses with a common population variance.",
      "unit": "hours",
      "table": {
        "headers": [
          "Group",
          "Sample size",
          "Mean",
          "SD"
        ],
        "rows": [
          [
            "group1",
            18,
            7.2,
            1.1
          ],
          [
            "group2",
            18,
            6.8,
            1.2
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the population difference, group1 minus group2. Show both variance contributions, the pooled variance, SE, df, critical value, margin, and both bounds.",
        "Using the interval alone, decide whether the means differ at the matching two-sided 0.05 level. State both hypotheses in symbols and words, and conclude in context."
      ],
      "hypotheses": {
        "null": "H_0:\\mu_1-\\mu_2=0",
        "alternative": "H_A:\\mu_1-\\mu_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal means.",
        "alternativeWords": "The group1 and group2 population means differ."
      },
      "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(s_d\\) (SE of the difference), \\(d\\) (sample difference), \\(\\Delta\\) (population difference).",
      "steps": [
        {
          "title": "Define the contrast and hypotheses",
          "general": [
            "\\Delta=\\mu_1-\\mu_2"
          ],
          "work": [
            "\\Delta=\\mu_{\\mathrm{group1}}-\\mu_{\\mathrm{group2}}"
          ],
          "words": "Keep the direction group1 minus group2 throughout. The null means equal population means; the two-sided alternative means different population means."
        },
        {
          "title": "Calculate the observed difference",
          "general": [
            "d=\\bar x_1-\\bar x_2"
          ],
          "work": [
            "d=7.2-6.8=0.4"
          ],
          "words": "This is the sample estimate of the population difference in hours."
        },
        {
          "title": "Square both group SDs",
          "general": [
            "v_1=s_1^2",
            "v_2=s_2^2"
          ],
          "work": [
            "v_1=1.1^2=1.21",
            "v_2=1.2^2=1.44"
          ],
          "words": "Each SD is squared before pooling, giving variances in squared measurement units."
        },
        {
          "title": "Pool both variance contributions",
          "general": [
            "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"
          ],
          "work": [
            "(n_1-1)s_1^2=(18-1)(1.21)=20.57",
            "(n_2-1)s_2^2=(18-1)(1.44)=24.48",
            "s^2=\\frac{20.57+24.48}{18+18-2}=\\frac{45.05}{34}=1.325"
          ],
          "words": "Weight each group variance by its own degrees of freedom, add the contributions, and divide by the combined degrees of freedom."
        },
        {
          "title": "Calculate the SE of the difference",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{1.325}{18}+\\frac{1.325}{18}}=\\sqrt{0.1472222}=0.3836955"
          ],
          "words": "Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units."
        },
        {
          "title": "Find degrees of freedom and the t cutoff",
          "general": [
            "\\nu=n_1+n_2-2",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=18+18-2=34",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(34)=2.032"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 34 and the combined two-tail 0.05 column. The printed cutoff is 2.032. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "34",
            "column": "0.05",
            "value": 2.032,
            "actualDf": 34,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=t_c s_d"
          ],
          "work": [
            "M=2.032(0.3836955)=0.7796692"
          ],
          "words": "Multiply the positive cutoff by the standard error of the difference."
        },
        {
          "title": "Calculate both bounds",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=0.4-0.7796692=-0.3796692",
            "U=0.4+0.7796692=1.179669"
          ],
          "words": "The bounds retain the group1 minus group2 subtraction order."
        },
        {
          "title": "Make the decision using the interval",
          "general": [
            "0\\in[L,U]\\Rightarrow\\text{do not reject }H_0"
          ],
          "work": [
            "[-0.3796692,1.179669]"
          ],
          "words": "Zero is inside the interval. Do not reject the equal-means null at the matching two-sided 0.05 level; no separate t statistic is required."
        }
      ],
      "conclusion": "The 95% CI for group1 minus group2 is -0.3796692 to 1.179669 hours. The interval includes equal population means, so the comparison does not reject equality.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "34",
        "column": "0.05",
        "value": 2.032,
        "actualDf": 34,
        "approximation": false
      },
      "values": {
        "n1": 18,
        "n2": 18,
        "x1": 7.2,
        "x2": 6.8,
        "s1": 1.1,
        "s2": 1.2,
        "confidence": 0.95,
        "df": 34,
        "variance": 1.325,
        "se": 0.38369548110737794,
        "critical": 2.032,
        "difference": 0.40000000000000036,
        "margin": 0.779669217610192,
        "lower": -0.3796692176101917,
        "upper": 1.1796692176101924,
        "reject": false
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": -0.3796692176101917
    },
    {
      "id": "ci-pain",
      "title": "Pain scores after intervention versus control",
      "topic": "twoMeans",
      "context": "An independent-group biomedical study collects the following measurements. Assume independent Normal responses with a common population variance.",
      "unit": "score units",
      "table": {
        "headers": [
          "Group",
          "Sample size",
          "Mean",
          "SD"
        ],
        "rows": [
          [
            "group1",
            20,
            3.4,
            1.3
          ],
          [
            "group2",
            24,
            4.5,
            1.5
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the population difference, group1 minus group2. Show both variance contributions, the pooled variance, SE, df, critical value, margin, and both bounds.",
        "Using the interval alone, decide whether the means differ at the matching two-sided 0.05 level. State both hypotheses in symbols and words, and conclude in context."
      ],
      "hypotheses": {
        "null": "H_0:\\mu_1-\\mu_2=0",
        "alternative": "H_A:\\mu_1-\\mu_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal means.",
        "alternativeWords": "The group1 and group2 population means differ."
      },
      "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(s_d\\) (SE of the difference), \\(d\\) (sample difference), \\(\\Delta\\) (population difference).",
      "steps": [
        {
          "title": "Define the contrast and hypotheses",
          "general": [
            "\\Delta=\\mu_1-\\mu_2"
          ],
          "work": [
            "\\Delta=\\mu_{\\mathrm{group1}}-\\mu_{\\mathrm{group2}}"
          ],
          "words": "Keep the direction group1 minus group2 throughout. The null means equal population means; the two-sided alternative means different population means."
        },
        {
          "title": "Calculate the observed difference",
          "general": [
            "d=\\bar x_1-\\bar x_2"
          ],
          "work": [
            "d=3.4-4.5=-1.1"
          ],
          "words": "This is the sample estimate of the population difference in score units."
        },
        {
          "title": "Square both group SDs",
          "general": [
            "v_1=s_1^2",
            "v_2=s_2^2"
          ],
          "work": [
            "v_1=1.3^2=1.69",
            "v_2=1.5^2=2.25"
          ],
          "words": "Each SD is squared before pooling, giving variances in squared measurement units."
        },
        {
          "title": "Pool both variance contributions",
          "general": [
            "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"
          ],
          "work": [
            "(n_1-1)s_1^2=(20-1)(1.69)=32.11",
            "(n_2-1)s_2^2=(24-1)(2.25)=51.75",
            "s^2=\\frac{32.11+51.75}{20+24-2}=\\frac{83.86}{42}=1.996667"
          ],
          "words": "Weight each group variance by its own degrees of freedom, add the contributions, and divide by the combined degrees of freedom."
        },
        {
          "title": "Calculate the SE of the difference",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{1.996667}{20}+\\frac{1.996667}{24}}=\\sqrt{0.1830278}=0.4278175"
          ],
          "words": "Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units."
        },
        {
          "title": "Find degrees of freedom and the t cutoff",
          "general": [
            "\\nu=n_1+n_2-2",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=20+24-2=42",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(42)=2.018"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 42 and the combined two-tail 0.05 column. The printed cutoff is 2.018. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "42",
            "column": "0.05",
            "value": 2.018,
            "actualDf": 42,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=t_c s_d"
          ],
          "work": [
            "M=2.018(0.4278175)=0.8633356"
          ],
          "words": "Multiply the positive cutoff by the standard error of the difference."
        },
        {
          "title": "Calculate both bounds",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=-1.1-0.8633356=-1.963336",
            "U=-1.1+0.8633356=-0.2366644"
          ],
          "words": "The bounds retain the group1 minus group2 subtraction order."
        },
        {
          "title": "Make the decision using the interval",
          "general": [
            "0\\notin[L,U]\\Rightarrow\\text{reject }H_0"
          ],
          "work": [
            "[-1.963336,-0.2366644]"
          ],
          "words": "Zero is outside the interval. Reject the equal-means null at the matching two-sided 0.05 level; no separate t statistic is required."
        }
      ],
      "conclusion": "The 95% CI for group1 minus group2 is -1.963336 to -0.2366644 score units. The population means differ, with group1 lower.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "42",
        "column": "0.05",
        "value": 2.018,
        "actualDf": 42,
        "approximation": false
      },
      "values": {
        "n1": 20,
        "n2": 24,
        "x1": 3.4,
        "x2": 4.5,
        "s1": 1.3,
        "s2": 1.5,
        "confidence": 0.95,
        "df": 42,
        "variance": 1.9966666666666666,
        "se": 0.427817458477068,
        "critical": 2.018,
        "difference": -1.1,
        "margin": 0.8633356312067231,
        "lower": -1.9633356312067232,
        "upper": -0.236664368793277,
        "reject": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": -1.9633356312067232
    },
    {
      "id": "ci-latency",
      "title": "Evoked-response latency in two groups",
      "topic": "twoMeans",
      "context": "An independent-group biomedical study collects the following measurements. Assume independent Normal responses with a common population variance.",
      "unit": "ms",
      "table": {
        "headers": [
          "Group",
          "Sample size",
          "Mean",
          "SD"
        ],
        "rows": [
          [
            "group1",
            15,
            102,
            10
          ],
          [
            "group2",
            17,
            106,
            11
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the population difference, group1 minus group2. Show both variance contributions, the pooled variance, SE, df, critical value, margin, and both bounds.",
        "Using the interval alone, decide whether the means differ at the matching two-sided 0.05 level. State both hypotheses in symbols and words, and conclude in context."
      ],
      "hypotheses": {
        "null": "H_0:\\mu_1-\\mu_2=0",
        "alternative": "H_A:\\mu_1-\\mu_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal means.",
        "alternativeWords": "The group1 and group2 population means differ."
      },
      "symbols": "\\(\\bar x_i\\) (group sample mean), \\(s_i\\) (group sample SD), \\(n_i\\) (group sample size), \\(s^2\\) (pooled variance), \\(s_d\\) (SE of the difference), \\(d\\) (sample difference), \\(\\Delta\\) (population difference).",
      "steps": [
        {
          "title": "Define the contrast and hypotheses",
          "general": [
            "\\Delta=\\mu_1-\\mu_2"
          ],
          "work": [
            "\\Delta=\\mu_{\\mathrm{group1}}-\\mu_{\\mathrm{group2}}"
          ],
          "words": "Keep the direction group1 minus group2 throughout. The null means equal population means; the two-sided alternative means different population means."
        },
        {
          "title": "Calculate the observed difference",
          "general": [
            "d=\\bar x_1-\\bar x_2"
          ],
          "work": [
            "d=102-106=-4"
          ],
          "words": "This is the sample estimate of the population difference in ms."
        },
        {
          "title": "Square both group SDs",
          "general": [
            "v_1=s_1^2",
            "v_2=s_2^2"
          ],
          "work": [
            "v_1=10^2=100",
            "v_2=11^2=121"
          ],
          "words": "Each SD is squared before pooling, giving variances in squared measurement units."
        },
        {
          "title": "Pool both variance contributions",
          "general": [
            "s^2=\\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}"
          ],
          "work": [
            "(n_1-1)s_1^2=(15-1)(100)=1400",
            "(n_2-1)s_2^2=(17-1)(121)=1936",
            "s^2=\\frac{1400+1936}{15+17-2}=\\frac{3336}{30}=111.2"
          ],
          "words": "Weight each group variance by its own degrees of freedom, add the contributions, and divide by the combined degrees of freedom."
        },
        {
          "title": "Calculate the SE of the difference",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{111.2}{15}+\\frac{111.2}{17}}=\\sqrt{13.95451}=3.735574"
          ],
          "words": "Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units."
        },
        {
          "title": "Find degrees of freedom and the t cutoff",
          "general": [
            "\\nu=n_1+n_2-2",
            "t_c=t_\\alpha(\\nu)"
          ],
          "work": [
            "\\nu=15+17-2=30",
            "\\alpha=1-0.95=0.05",
            "t_{0.05}(30)=2.042"
          ],
          "words": "Open t_table.pdf, PDF page 1. Use row 30 and the combined two-tail 0.05 column. The printed cutoff is 2.042. Do not halve the column probability again.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 1,
            "row": "30",
            "column": "0.05",
            "value": 2.042,
            "actualDf": 30,
            "approximation": false
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=t_c s_d"
          ],
          "work": [
            "M=2.042(3.735574)=7.628041"
          ],
          "words": "Multiply the positive cutoff by the standard error of the difference."
        },
        {
          "title": "Calculate both bounds",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=-4-7.628041=-11.62804",
            "U=-4+7.628041=3.628041"
          ],
          "words": "The bounds retain the group1 minus group2 subtraction order."
        },
        {
          "title": "Make the decision using the interval",
          "general": [
            "0\\in[L,U]\\Rightarrow\\text{do not reject }H_0"
          ],
          "work": [
            "[-11.62804,3.628041]"
          ],
          "words": "Zero is inside the interval. Do not reject the equal-means null at the matching two-sided 0.05 level; no separate t statistic is required."
        }
      ],
      "conclusion": "The 95% CI for group1 minus group2 is -11.62804 to 3.628041 ms. The interval includes equal population means, so the comparison does not reject equality.",
      "source": null,
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 1,
        "row": "30",
        "column": "0.05",
        "value": 2.042,
        "actualDf": 30,
        "approximation": false
      },
      "values": {
        "n1": 15,
        "n2": 17,
        "x1": 102,
        "x2": 106,
        "s1": 10,
        "s2": 11,
        "confidence": 0.95,
        "df": 30,
        "variance": 111.2,
        "se": 3.7355735575573354,
        "critical": 2.042,
        "difference": -4,
        "margin": 7.628041204532078,
        "lower": -11.628041204532078,
        "upper": 3.628041204532078,
        "reject": false
      },
      "module": 17,
      "tolerance": 0.0023677867787786676,
      "answerName": "Lower endpoint",
      "answer": -11.628041204532078
    },
    {
      "id": "ci-screen",
      "title": "Positive screening responses",
      "topic": "oneProportion",
      "context": "A biomedical survey or follow-up study records a binary outcome for each independently sampled participant.",
      "unit": "proportion",
      "table": {
        "headers": [
          "Event count",
          "Total observations",
          "Reference proportion"
        ],
        "rows": [
          [
            84,
            300,
            0.25
          ]
        ]
      },
      "tasks": [
        "Construct a 99% CI for the population proportion. Show the estimate, standard error, cutoff, margin, and both bounds.",
        "Determine whether the population proportion differs from 0.25 using the interval. State the hypotheses in symbols and words and interpret the result."
      ],
      "hypotheses": {
        "null": "H_0:p=0.25",
        "alternative": "H_A:p\\ne 0.25",
        "nullWords": "The population event proportion equals 0.25.",
        "alternativeWords": "The population event proportion differs from 0.25."
      },
      "symbols": "\\(m\\) (event count), \\(n\\) (sample size), \\(\\hat p\\) (sample event proportion), \\(p\\) (population event proportion), \\(p_0\\) (null reference), \\(s_{\\hat p}\\) (estimated SE).",
      "steps": [
        {
          "title": "State the proportion and hypotheses",
          "general": [
            "H_0:p=p_0,\\qquad H_A:p\\ne p_0"
          ],
          "work": [
            "p_0=0.25"
          ],
          "words": "The null states that the population event proportion is 0.25. The two-sided alternative states that it differs from 0.25."
        },
        {
          "title": "Calculate the sample proportion",
          "general": [
            "\\hat p=\\frac{m}{n}"
          ],
          "work": [
            "\\hat p=\\frac{84}{300}=0.28"
          ],
          "words": "Divide event count by the total number of observations."
        },
        {
          "title": "Calculate the proportion SE",
          "general": [
            "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}"
          ],
          "work": [
            "\\hat p(1-\\hat p)=0.28(1-0.28)=0.2016",
            "s_{\\hat p}=\\sqrt{\\frac{0.2016}{300}}=\\sqrt{0.000672}=0.02592296"
          ],
          "words": "Subtract the proportion from one, multiply, divide by sample size, then take the square root."
        },
        {
          "title": "Select the Normal cutoff",
          "general": [
            "z_c=z_\\alpha"
          ],
          "work": [
            "\\alpha=1-0.99=0.01,\\quad z_c=2.5758"
          ],
          "words": "Use the infinite-df row of the course two-tail t table. For 99% confidence, the positive cutoff is 2.5758.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.01",
            "value": 2.5758,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=z_c s_{\\hat p}"
          ],
          "work": [
            "M=2.5758(0.02592296)=0.06677237"
          ],
          "words": "The margin is in proportion units. Multiply by 100 only when converting the final interpretation to percentage points."
        },
        {
          "title": "Calculate the lower bound",
          "general": [
            "L=\\hat p-M"
          ],
          "work": [
            "L=0.28-0.06677237=0.2132276"
          ],
          "words": "Subtract the margin from the observed proportion."
        },
        {
          "title": "Calculate the upper bound",
          "general": [
            "U=\\hat p+M"
          ],
          "work": [
            "U=0.28+0.06677237=0.3467724"
          ],
          "words": "Add the same margin to the observed proportion."
        },
        {
          "title": "Compare with the null reference",
          "general": [
            "p_0\\in[L,U]\\Rightarrow\\text{do not reject }H_0"
          ],
          "work": [
            "0.2132276<p<0.3467724,\\quad p_0=0.25"
          ],
          "words": "Do not reject equality with 0.25 at the matching two-sided 0.01 level. The comparison is with the stated reference, not automatically with zero."
        }
      ],
      "conclusion": "The 99% CI is 0.2132276 to 0.3467724, or 21.32% to 34.68%. The reference is included; the data do not reject that population proportion.",
      "source": null,
      "values": {
        "m": 84,
        "n": 300,
        "p": 0.28,
        "reference": 0.25,
        "confidence": 0.99,
        "variance": 0.2016,
        "se": 0.02592296279363144,
        "critical": 2.5758,
        "margin": 0.06677236756383587,
        "lower": 0.21322763243616416,
        "upper": 0.3467723675638359,
        "reject": false
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.01",
        "value": 2.5758,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.21322763243616416
    },
    {
      "id": "ci-recall",
      "title": "Successful recall responses",
      "topic": "oneProportion",
      "context": "A biomedical survey or follow-up study records a binary outcome for each independently sampled participant.",
      "unit": "proportion",
      "table": {
        "headers": [
          "Event count",
          "Total observations",
          "Reference proportion"
        ],
        "rows": [
          [
            126,
            200,
            0.5
          ]
        ]
      },
      "tasks": [
        "Construct a 95% CI for the population proportion. Show the estimate, standard error, cutoff, margin, and both bounds.",
        "Determine whether the population proportion differs from 0.5 using the interval. State the hypotheses in symbols and words and interpret the result."
      ],
      "hypotheses": {
        "null": "H_0:p=0.5",
        "alternative": "H_A:p\\ne 0.5",
        "nullWords": "The population event proportion equals 0.5.",
        "alternativeWords": "The population event proportion differs from 0.5."
      },
      "symbols": "\\(m\\) (event count), \\(n\\) (sample size), \\(\\hat p\\) (sample event proportion), \\(p\\) (population event proportion), \\(p_0\\) (null reference), \\(s_{\\hat p}\\) (estimated SE).",
      "steps": [
        {
          "title": "State the proportion and hypotheses",
          "general": [
            "H_0:p=p_0,\\qquad H_A:p\\ne p_0"
          ],
          "work": [
            "p_0=0.5"
          ],
          "words": "The null states that the population event proportion is 0.5. The two-sided alternative states that it differs from 0.5."
        },
        {
          "title": "Calculate the sample proportion",
          "general": [
            "\\hat p=\\frac{m}{n}"
          ],
          "work": [
            "\\hat p=\\frac{126}{200}=0.63"
          ],
          "words": "Divide event count by the total number of observations."
        },
        {
          "title": "Calculate the proportion SE",
          "general": [
            "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}"
          ],
          "work": [
            "\\hat p(1-\\hat p)=0.63(1-0.63)=0.2331",
            "s_{\\hat p}=\\sqrt{\\frac{0.2331}{200}}=\\sqrt{0.0011655}=0.03413942"
          ],
          "words": "Subtract the proportion from one, multiply, divide by sample size, then take the square root."
        },
        {
          "title": "Select the Normal cutoff",
          "general": [
            "z_c=z_\\alpha"
          ],
          "work": [
            "\\alpha=1-0.95=0.05,\\quad z_c=1.96"
          ],
          "words": "Use the infinite-df row of the course two-tail t table. For 95% confidence, the positive cutoff is 1.96.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=z_c s_{\\hat p}"
          ],
          "work": [
            "M=1.96(0.03413942)=0.06691326"
          ],
          "words": "The margin is in proportion units. Multiply by 100 only when converting the final interpretation to percentage points."
        },
        {
          "title": "Calculate the lower bound",
          "general": [
            "L=\\hat p-M"
          ],
          "work": [
            "L=0.63-0.06691326=0.5630867"
          ],
          "words": "Subtract the margin from the observed proportion."
        },
        {
          "title": "Calculate the upper bound",
          "general": [
            "U=\\hat p+M"
          ],
          "work": [
            "U=0.63+0.06691326=0.6969133"
          ],
          "words": "Add the same margin to the observed proportion."
        },
        {
          "title": "Compare with the null reference",
          "general": [
            "p_0\\notin[L,U]\\Rightarrow\\text{reject }H_0"
          ],
          "work": [
            "0.5630867<p<0.6969133,\\quad p_0=0.5"
          ],
          "words": "Reject equality with 0.5 at the matching two-sided 0.05 level. The comparison is with the stated reference, not automatically with zero."
        }
      ],
      "conclusion": "The 95% CI is 0.5630867 to 0.6969133, or 56.31% to 69.69%. The reference is excluded; the data support a different population proportion.",
      "source": null,
      "values": {
        "m": 126,
        "n": 200,
        "p": 0.63,
        "reference": 0.5,
        "confidence": 0.95,
        "variance": 0.2331,
        "se": 0.034139420030223126,
        "critical": 1.96,
        "margin": 0.06691326325923733,
        "lower": 0.5630867367407627,
        "upper": 0.6969132632592373,
        "reject": true
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.5630867367407627
    },
    {
      "id": "ci-symptom",
      "title": "Symptom reports during follow-up",
      "topic": "oneProportion",
      "context": "A biomedical survey or follow-up study records a binary outcome for each independently sampled participant.",
      "unit": "proportion",
      "table": {
        "headers": [
          "Event count",
          "Total observations",
          "Reference proportion"
        ],
        "rows": [
          [
            72,
            240,
            0.3
          ]
        ]
      },
      "tasks": [
        "Construct a 95% CI for the population proportion. Show the estimate, standard error, cutoff, margin, and both bounds.",
        "Determine whether the population proportion differs from 0.3 using the interval. State the hypotheses in symbols and words and interpret the result."
      ],
      "hypotheses": {
        "null": "H_0:p=0.3",
        "alternative": "H_A:p\\ne 0.3",
        "nullWords": "The population event proportion equals 0.3.",
        "alternativeWords": "The population event proportion differs from 0.3."
      },
      "symbols": "\\(m\\) (event count), \\(n\\) (sample size), \\(\\hat p\\) (sample event proportion), \\(p\\) (population event proportion), \\(p_0\\) (null reference), \\(s_{\\hat p}\\) (estimated SE).",
      "steps": [
        {
          "title": "State the proportion and hypotheses",
          "general": [
            "H_0:p=p_0,\\qquad H_A:p\\ne p_0"
          ],
          "work": [
            "p_0=0.3"
          ],
          "words": "The null states that the population event proportion is 0.3. The two-sided alternative states that it differs from 0.3."
        },
        {
          "title": "Calculate the sample proportion",
          "general": [
            "\\hat p=\\frac{m}{n}"
          ],
          "work": [
            "\\hat p=\\frac{72}{240}=0.3"
          ],
          "words": "Divide event count by the total number of observations."
        },
        {
          "title": "Calculate the proportion SE",
          "general": [
            "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}"
          ],
          "work": [
            "\\hat p(1-\\hat p)=0.3(1-0.3)=0.21",
            "s_{\\hat p}=\\sqrt{\\frac{0.21}{240}}=\\sqrt{0.000875}=0.0295804"
          ],
          "words": "Subtract the proportion from one, multiply, divide by sample size, then take the square root."
        },
        {
          "title": "Select the Normal cutoff",
          "general": [
            "z_c=z_\\alpha"
          ],
          "work": [
            "\\alpha=1-0.95=0.05,\\quad z_c=1.96"
          ],
          "words": "Use the infinite-df row of the course two-tail t table. For 95% confidence, the positive cutoff is 1.96.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=z_c s_{\\hat p}"
          ],
          "work": [
            "M=1.96(0.0295804)=0.05797758"
          ],
          "words": "The margin is in proportion units. Multiply by 100 only when converting the final interpretation to percentage points."
        },
        {
          "title": "Calculate the lower bound",
          "general": [
            "L=\\hat p-M"
          ],
          "work": [
            "L=0.3-0.05797758=0.2420224"
          ],
          "words": "Subtract the margin from the observed proportion."
        },
        {
          "title": "Calculate the upper bound",
          "general": [
            "U=\\hat p+M"
          ],
          "work": [
            "U=0.3+0.05797758=0.3579776"
          ],
          "words": "Add the same margin to the observed proportion."
        },
        {
          "title": "Compare with the null reference",
          "general": [
            "p_0\\in[L,U]\\Rightarrow\\text{do not reject }H_0"
          ],
          "work": [
            "0.2420224<p<0.3579776,\\quad p_0=0.3"
          ],
          "words": "Do not reject equality with 0.3 at the matching two-sided 0.05 level. The comparison is with the stated reference, not automatically with zero."
        }
      ],
      "conclusion": "The 95% CI is 0.2420224 to 0.3579776, or 24.20% to 35.80%. The reference is included; the data do not reject that population proportion.",
      "source": null,
      "values": {
        "m": 72,
        "n": 240,
        "p": 0.3,
        "reference": 0.3,
        "confidence": 0.95,
        "variance": 0.21,
        "se": 0.02958039891549808,
        "critical": 1.96,
        "margin": 0.05797758187437624,
        "lower": 0.24202241812562375,
        "upper": 0.3579775818743762,
        "reject": false
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.24202241812562375
    },
    {
      "id": "ci-response",
      "title": "Clinical response proportion",
      "topic": "oneProportion",
      "context": "A biomedical survey or follow-up study records a binary outcome for each independently sampled participant.",
      "unit": "proportion",
      "table": {
        "headers": [
          "Event count",
          "Total observations",
          "Reference proportion"
        ],
        "rows": [
          [
            156,
            400,
            0.4
          ]
        ]
      },
      "tasks": [
        "Construct a 95% CI for the population proportion. Show the estimate, standard error, cutoff, margin, and both bounds.",
        "Determine whether the population proportion differs from 0.4 using the interval. State the hypotheses in symbols and words and interpret the result."
      ],
      "hypotheses": {
        "null": "H_0:p=0.4",
        "alternative": "H_A:p\\ne 0.4",
        "nullWords": "The population event proportion equals 0.4.",
        "alternativeWords": "The population event proportion differs from 0.4."
      },
      "symbols": "\\(m\\) (event count), \\(n\\) (sample size), \\(\\hat p\\) (sample event proportion), \\(p\\) (population event proportion), \\(p_0\\) (null reference), \\(s_{\\hat p}\\) (estimated SE).",
      "steps": [
        {
          "title": "State the proportion and hypotheses",
          "general": [
            "H_0:p=p_0,\\qquad H_A:p\\ne p_0"
          ],
          "work": [
            "p_0=0.4"
          ],
          "words": "The null states that the population event proportion is 0.4. The two-sided alternative states that it differs from 0.4."
        },
        {
          "title": "Calculate the sample proportion",
          "general": [
            "\\hat p=\\frac{m}{n}"
          ],
          "work": [
            "\\hat p=\\frac{156}{400}=0.39"
          ],
          "words": "Divide event count by the total number of observations."
        },
        {
          "title": "Calculate the proportion SE",
          "general": [
            "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}"
          ],
          "work": [
            "\\hat p(1-\\hat p)=0.39(1-0.39)=0.2379",
            "s_{\\hat p}=\\sqrt{\\frac{0.2379}{400}}=\\sqrt{0.00059475}=0.0243875"
          ],
          "words": "Subtract the proportion from one, multiply, divide by sample size, then take the square root."
        },
        {
          "title": "Select the Normal cutoff",
          "general": [
            "z_c=z_\\alpha"
          ],
          "work": [
            "\\alpha=1-0.95=0.05,\\quad z_c=1.96"
          ],
          "words": "Use the infinite-df row of the course two-tail t table. For 95% confidence, the positive cutoff is 1.96.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate the margin",
          "general": [
            "M=z_c s_{\\hat p}"
          ],
          "work": [
            "M=1.96(0.0243875)=0.04779949"
          ],
          "words": "The margin is in proportion units. Multiply by 100 only when converting the final interpretation to percentage points."
        },
        {
          "title": "Calculate the lower bound",
          "general": [
            "L=\\hat p-M"
          ],
          "work": [
            "L=0.39-0.04779949=0.3422005"
          ],
          "words": "Subtract the margin from the observed proportion."
        },
        {
          "title": "Calculate the upper bound",
          "general": [
            "U=\\hat p+M"
          ],
          "work": [
            "U=0.39+0.04779949=0.4377995"
          ],
          "words": "Add the same margin to the observed proportion."
        },
        {
          "title": "Compare with the null reference",
          "general": [
            "p_0\\in[L,U]\\Rightarrow\\text{do not reject }H_0"
          ],
          "work": [
            "0.3422005<p<0.4377995,\\quad p_0=0.4"
          ],
          "words": "Do not reject equality with 0.4 at the matching two-sided 0.05 level. The comparison is with the stated reference, not automatically with zero."
        }
      ],
      "conclusion": "The 95% CI is 0.3422005 to 0.4377995, or 34.22% to 43.78%. The reference is included; the data do not reject that population proportion.",
      "source": null,
      "values": {
        "m": 156,
        "n": 400,
        "p": 0.39,
        "reference": 0.4,
        "confidence": 0.95,
        "variance": 0.2379,
        "se": 0.024387496796514398,
        "critical": 1.96,
        "margin": 0.04779949372116822,
        "lower": 0.3422005062788318,
        "upper": 0.4377994937211682,
        "reject": false
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.3422005062788318
    },
    {
      "id": "ci-event",
      "title": "Event proportions in two treatment groups",
      "topic": "twoProportions",
      "context": "A study compares two independent groups with an event/no-event outcome for every participant.",
      "unit": "proportion difference",
      "table": {
        "headers": [
          "Group",
          "Events",
          "Total observations"
        ],
        "rows": [
          [
            "group1",
            35,
            100
          ],
          [
            "group2",
            20,
            100
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the difference in population event proportions using the Session 17 pooled standard error. Show both sample proportions, the pooled estimate, variance, SE, margin, and endpoints.",
        "Use the interval to decide whether the event probabilities differ at the matching two-sided 0.05 level. Interpret the direction and distinguish percentage points from a relative reduction."
      ],
      "hypotheses": {
        "null": "H_0:p_1-p_2=0",
        "alternative": "H_A:p_1-p_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal event probabilities.",
        "alternativeWords": "The group1 and group2 population event probabilities differ."
      },
      "symbols": "\\(m_i\\) (group event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled estimate), \\(s_d\\) (SE of the difference), \\(d\\) (observed difference).",
      "steps": [
        {
          "title": "Define the population difference",
          "general": [
            "\\Delta=p_1-p_2"
          ],
          "work": [
            "\\Delta=p_{\\mathrm{group1}}-p_{\\mathrm{group2}}"
          ],
          "words": "Use group1 minus group2. Equal population event probabilities correspond to a difference of zero."
        },
        {
          "title": "Calculate both sample proportions",
          "general": [
            "\\hat p_i=\\frac{m_i}{n_i}"
          ],
          "work": [
            "\\hat p_1=\\frac{35}{100}=0.35",
            "\\hat p_2=\\frac{20}{100}=0.2"
          ],
          "words": "Each event count is divided by its own group size."
        },
        {
          "title": "Calculate the course pooled proportion",
          "general": [
            "\\hat p=\\frac{m_1+m_2}{n_1+n_2}"
          ],
          "work": [
            "\\hat p=\\frac{35+20}{100+100}=\\frac{55}{200}=0.275"
          ],
          "words": "Combine event counts and group sizes before taking the fraction. This follows the Session 17 pooled convention."
        },
        {
          "title": "Calculate the pooled binary variance",
          "general": [
            "s^2=\\hat p(1-\\hat p)"
          ],
          "work": [
            "s^2=0.275(1-0.275)=0.199375"
          ],
          "words": "The pooled binary variance is used in both group contributions to the SE."
        },
        {
          "title": "Calculate the difference SE",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{0.199375}{100}+\\frac{0.199375}{100}}=0.06314665"
          ],
          "words": "Keep the two group sizes separate inside the square root."
        },
        {
          "title": "Calculate the difference and margin",
          "general": [
            "d=\\hat p_1-\\hat p_2",
            "M=z_{0.05}s_d"
          ],
          "work": [
            "d=0.35-0.2=0.15",
            "M=1.96(0.06314665)=0.1237674"
          ],
          "words": "Use the Normal cutoff 1.96 from the infinite-df row, total two-tail 0.05 column.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate both endpoints",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=0.15-0.1237674=0.02623256",
            "U=0.15+0.1237674=0.2737674"
          ],
          "words": "These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points."
        },
        {
          "title": "Interpret direction and the zero comparison",
          "general": [
            "0\\notin[L,U]\\Rightarrow\\text{reject equal proportions}"
          ],
          "work": [
            "0.02623256<p_1-p_2<0.2737674"
          ],
          "words": "The interval excludes zero. Retain the group1 minus group2 order when stating which event probability is higher."
        }
      ],
      "conclusion": "The 95% interval for group1 minus group2 is 0.02623256 to 0.2737674, equivalent to 2.62 to 27.38 percentage points. Equal event probabilities are excluded.",
      "source": null,
      "rounded": false,
      "values": {
        "m1": 35,
        "n1": 100,
        "m2": 20,
        "n2": 100,
        "p1": 0.35,
        "p2": 0.2,
        "pooled": 0.275,
        "variance": 0.199375,
        "se": 0.06314665470157545,
        "rawSE": 0.06314665470157545,
        "difference": 0.14999999999999997,
        "critical": 1.96,
        "confidence": 0.95,
        "margin": 0.12376744321508787,
        "lower": 0.026232556784912098,
        "upper": 0.27376744321508784,
        "reject": true
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": 0.026232556784912098
    },
    {
      "id": "ci-adverse",
      "title": "Adverse-event proportions",
      "topic": "twoProportions",
      "context": "A study compares two independent groups with an event/no-event outcome for every participant.",
      "unit": "proportion difference",
      "table": {
        "headers": [
          "Group",
          "Events",
          "Total observations"
        ],
        "rows": [
          [
            "group1",
            18,
            120
          ],
          [
            "group2",
            12,
            110
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the difference in population event proportions using the Session 17 pooled standard error. Show both sample proportions, the pooled estimate, variance, SE, margin, and endpoints.",
        "Use the interval to decide whether the event probabilities differ at the matching two-sided 0.05 level. Interpret the direction and distinguish percentage points from a relative reduction."
      ],
      "hypotheses": {
        "null": "H_0:p_1-p_2=0",
        "alternative": "H_A:p_1-p_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal event probabilities.",
        "alternativeWords": "The group1 and group2 population event probabilities differ."
      },
      "symbols": "\\(m_i\\) (group event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled estimate), \\(s_d\\) (SE of the difference), \\(d\\) (observed difference).",
      "steps": [
        {
          "title": "Define the population difference",
          "general": [
            "\\Delta=p_1-p_2"
          ],
          "work": [
            "\\Delta=p_{\\mathrm{group1}}-p_{\\mathrm{group2}}"
          ],
          "words": "Use group1 minus group2. Equal population event probabilities correspond to a difference of zero."
        },
        {
          "title": "Calculate both sample proportions",
          "general": [
            "\\hat p_i=\\frac{m_i}{n_i}"
          ],
          "work": [
            "\\hat p_1=\\frac{18}{120}=0.15",
            "\\hat p_2=\\frac{12}{110}=0.1090909"
          ],
          "words": "Each event count is divided by its own group size."
        },
        {
          "title": "Calculate the course pooled proportion",
          "general": [
            "\\hat p=\\frac{m_1+m_2}{n_1+n_2}"
          ],
          "work": [
            "\\hat p=\\frac{18+12}{120+110}=\\frac{30}{230}=0.1304348"
          ],
          "words": "Combine event counts and group sizes before taking the fraction. This follows the Session 17 pooled convention."
        },
        {
          "title": "Calculate the pooled binary variance",
          "general": [
            "s^2=\\hat p(1-\\hat p)"
          ],
          "work": [
            "s^2=0.1304348(1-0.1304348)=0.1134216"
          ],
          "words": "The pooled binary variance is used in both group contributions to the SE."
        },
        {
          "title": "Calculate the difference SE",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{0.1134216}{120}+\\frac{0.1134216}{110}}=0.04445542"
          ],
          "words": "Keep the two group sizes separate inside the square root."
        },
        {
          "title": "Calculate the difference and margin",
          "general": [
            "d=\\hat p_1-\\hat p_2",
            "M=z_{0.05}s_d"
          ],
          "work": [
            "d=0.15-0.1090909=0.04090909",
            "M=1.96(0.04445542)=0.08713263"
          ],
          "words": "Use the Normal cutoff 1.96 from the infinite-df row, total two-tail 0.05 column.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate both endpoints",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=0.04090909-0.08713263=-0.04622354",
            "U=0.04090909+0.08713263=0.1280417"
          ],
          "words": "These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points."
        },
        {
          "title": "Interpret direction and the zero comparison",
          "general": [
            "0\\in[L,U]\\Rightarrow\\text{do not reject equal proportions}"
          ],
          "work": [
            "-0.04622354<p_1-p_2<0.1280417"
          ],
          "words": "The interval includes zero. Retain the group1 minus group2 order when stating which event probability is higher."
        }
      ],
      "conclusion": "The 95% interval for group1 minus group2 is -0.04622354 to 0.1280417, equivalent to -4.62 to 12.80 percentage points. Equal event probabilities remain included.",
      "source": null,
      "rounded": false,
      "values": {
        "m1": 18,
        "n1": 120,
        "m2": 12,
        "n2": 110,
        "p1": 0.15,
        "p2": 0.10909090909090909,
        "pooled": 0.13043478260869565,
        "variance": 0.11342155009451796,
        "se": 0.044455422447438706,
        "rawSE": 0.044455422447438706,
        "difference": 0.04090909090909091,
        "critical": 1.96,
        "confidence": 0.95,
        "margin": 0.08713262799697986,
        "lower": -0.046223537087888955,
        "upper": 0.12804171890607077,
        "reject": false
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": -0.046223537087888955
    },
    {
      "id": "ci-improvement",
      "title": "Improvement after two interventions",
      "topic": "twoProportions",
      "context": "A study compares two independent groups with an event/no-event outcome for every participant.",
      "unit": "proportion difference",
      "table": {
        "headers": [
          "Group",
          "Events",
          "Total observations"
        ],
        "rows": [
          [
            "group1",
            72,
            120
          ],
          [
            "group2",
            48,
            100
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the difference in population event proportions using the Session 17 pooled standard error. Show both sample proportions, the pooled estimate, variance, SE, margin, and endpoints.",
        "Use the interval to decide whether the event probabilities differ at the matching two-sided 0.05 level. Interpret the direction and distinguish percentage points from a relative reduction."
      ],
      "hypotheses": {
        "null": "H_0:p_1-p_2=0",
        "alternative": "H_A:p_1-p_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal event probabilities.",
        "alternativeWords": "The group1 and group2 population event probabilities differ."
      },
      "symbols": "\\(m_i\\) (group event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled estimate), \\(s_d\\) (SE of the difference), \\(d\\) (observed difference).",
      "steps": [
        {
          "title": "Define the population difference",
          "general": [
            "\\Delta=p_1-p_2"
          ],
          "work": [
            "\\Delta=p_{\\mathrm{group1}}-p_{\\mathrm{group2}}"
          ],
          "words": "Use group1 minus group2. Equal population event probabilities correspond to a difference of zero."
        },
        {
          "title": "Calculate both sample proportions",
          "general": [
            "\\hat p_i=\\frac{m_i}{n_i}"
          ],
          "work": [
            "\\hat p_1=\\frac{72}{120}=0.6",
            "\\hat p_2=\\frac{48}{100}=0.48"
          ],
          "words": "Each event count is divided by its own group size."
        },
        {
          "title": "Calculate the course pooled proportion",
          "general": [
            "\\hat p=\\frac{m_1+m_2}{n_1+n_2}"
          ],
          "work": [
            "\\hat p=\\frac{72+48}{120+100}=\\frac{120}{220}=0.5454545"
          ],
          "words": "Combine event counts and group sizes before taking the fraction. This follows the Session 17 pooled convention."
        },
        {
          "title": "Calculate the pooled binary variance",
          "general": [
            "s^2=\\hat p(1-\\hat p)"
          ],
          "work": [
            "s^2=0.5454545(1-0.5454545)=0.2479339"
          ],
          "words": "The pooled binary variance is used in both group contributions to the SE."
        },
        {
          "title": "Calculate the difference SE",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{0.2479339}{120}+\\frac{0.2479339}{100}}=0.06741999"
          ],
          "words": "Keep the two group sizes separate inside the square root."
        },
        {
          "title": "Calculate the difference and margin",
          "general": [
            "d=\\hat p_1-\\hat p_2",
            "M=z_{0.05}s_d"
          ],
          "work": [
            "d=0.6-0.48=0.12",
            "M=1.96(0.06741999)=0.1321432"
          ],
          "words": "Use the Normal cutoff 1.96 from the infinite-df row, total two-tail 0.05 column.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate both endpoints",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=0.12-0.1321432=-0.01214317",
            "U=0.12+0.1321432=0.2521432"
          ],
          "words": "These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points."
        },
        {
          "title": "Interpret direction and the zero comparison",
          "general": [
            "0\\in[L,U]\\Rightarrow\\text{do not reject equal proportions}"
          ],
          "work": [
            "-0.01214317<p_1-p_2<0.2521432"
          ],
          "words": "The interval includes zero. Retain the group1 minus group2 order when stating which event probability is higher."
        }
      ],
      "conclusion": "The 95% interval for group1 minus group2 is -0.01214317 to 0.2521432, equivalent to -1.21 to 25.21 percentage points. Equal event probabilities remain included.",
      "source": null,
      "rounded": false,
      "values": {
        "m1": 72,
        "n1": 120,
        "m2": 48,
        "n2": 100,
        "p1": 0.6,
        "p2": 0.48,
        "pooled": 0.5454545454545454,
        "variance": 0.24793388429752067,
        "se": 0.06741998624632421,
        "rawSE": 0.06741998624632421,
        "difference": 0.12,
        "critical": 1.96,
        "confidence": 0.95,
        "margin": 0.13214317304279546,
        "lower": -0.012143173042795469,
        "upper": 0.25214317304279543,
        "reject": false
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": -0.012143173042795469
    },
    {
      "id": "ci-completion",
      "title": "Completion of a follow-up assessment",
      "topic": "twoProportions",
      "context": "A study compares two independent groups with an event/no-event outcome for every participant.",
      "unit": "proportion difference",
      "table": {
        "headers": [
          "Group",
          "Events",
          "Total observations"
        ],
        "rows": [
          [
            "group1",
            90,
            150
          ],
          [
            "group2",
            95,
            150
          ]
        ]
      },
      "tasks": [
        "Construct the 95% confidence interval for the difference in population event proportions using the Session 17 pooled standard error. Show both sample proportions, the pooled estimate, variance, SE, margin, and endpoints.",
        "Use the interval to decide whether the event probabilities differ at the matching two-sided 0.05 level. Interpret the direction and distinguish percentage points from a relative reduction."
      ],
      "hypotheses": {
        "null": "H_0:p_1-p_2=0",
        "alternative": "H_A:p_1-p_2\\ne0",
        "nullWords": "The group1 and group2 populations have equal event probabilities.",
        "alternativeWords": "The group1 and group2 population event probabilities differ."
      },
      "symbols": "\\(m_i\\) (group event count), \\(n_i\\) (group size), \\(\\hat p_i\\) (group sample proportion), \\(\\hat p\\) (pooled estimate), \\(s_d\\) (SE of the difference), \\(d\\) (observed difference).",
      "steps": [
        {
          "title": "Define the population difference",
          "general": [
            "\\Delta=p_1-p_2"
          ],
          "work": [
            "\\Delta=p_{\\mathrm{group1}}-p_{\\mathrm{group2}}"
          ],
          "words": "Use group1 minus group2. Equal population event probabilities correspond to a difference of zero."
        },
        {
          "title": "Calculate both sample proportions",
          "general": [
            "\\hat p_i=\\frac{m_i}{n_i}"
          ],
          "work": [
            "\\hat p_1=\\frac{90}{150}=0.6",
            "\\hat p_2=\\frac{95}{150}=0.6333333"
          ],
          "words": "Each event count is divided by its own group size."
        },
        {
          "title": "Calculate the course pooled proportion",
          "general": [
            "\\hat p=\\frac{m_1+m_2}{n_1+n_2}"
          ],
          "work": [
            "\\hat p=\\frac{90+95}{150+150}=\\frac{185}{300}=0.6166667"
          ],
          "words": "Combine event counts and group sizes before taking the fraction. This follows the Session 17 pooled convention."
        },
        {
          "title": "Calculate the pooled binary variance",
          "general": [
            "s^2=\\hat p(1-\\hat p)"
          ],
          "work": [
            "s^2=0.6166667(1-0.6166667)=0.2363889"
          ],
          "words": "The pooled binary variance is used in both group contributions to the SE."
        },
        {
          "title": "Calculate the difference SE",
          "general": [
            "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}"
          ],
          "work": [
            "s_d=\\sqrt{\\frac{0.2363889}{150}+\\frac{0.2363889}{150}}=0.05614136"
          ],
          "words": "Keep the two group sizes separate inside the square root."
        },
        {
          "title": "Calculate the difference and margin",
          "general": [
            "d=\\hat p_1-\\hat p_2",
            "M=z_{0.05}s_d"
          ],
          "work": [
            "d=0.6-0.6333333=-0.03333333",
            "M=1.96(0.05614136)=0.1100371"
          ],
          "words": "Use the Normal cutoff 1.96 from the infinite-df row, total two-tail 0.05 column.",
          "tableLookup": {
            "path": "sources/tables/t_table.pdf",
            "page": 2,
            "row": "infinity",
            "column": "0.05",
            "value": 1.96,
            "approximation": false,
            "normalReference": true
          }
        },
        {
          "title": "Calculate both endpoints",
          "general": [
            "L=d-M",
            "U=d+M"
          ],
          "work": [
            "L=-0.03333333-0.1100371=-0.1433704",
            "U=-0.03333333+0.1100371=0.07670372"
          ],
          "words": "These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points."
        },
        {
          "title": "Interpret direction and the zero comparison",
          "general": [
            "0\\in[L,U]\\Rightarrow\\text{do not reject equal proportions}"
          ],
          "work": [
            "-0.1433704<p_1-p_2<0.07670372"
          ],
          "words": "The interval includes zero. Retain the group1 minus group2 order when stating which event probability is higher."
        }
      ],
      "conclusion": "The 95% interval for group1 minus group2 is -0.1433704 to 0.07670372, equivalent to -14.34 to 7.67 percentage points. Equal event probabilities remain included.",
      "source": null,
      "rounded": false,
      "values": {
        "m1": 90,
        "n1": 150,
        "m2": 95,
        "n2": 150,
        "p1": 0.6,
        "p2": 0.6333333333333333,
        "pooled": 0.6166666666666667,
        "variance": 0.23638888888888887,
        "se": 0.05614135598515457,
        "rawSE": 0.05614135598515457,
        "difference": -0.033333333333333326,
        "critical": 1.96,
        "confidence": 0.95,
        "margin": 0.11003705773090296,
        "lower": -0.14337039106423627,
        "upper": 0.07670372439756963,
        "reject": false
      },
      "lookup": {
        "path": "sources/tables/t_table.pdf",
        "page": 2,
        "row": "infinity",
        "column": "0.05",
        "value": 1.96,
        "approximation": false,
        "normalReference": true
      },
      "module": 17,
      "tolerance": 0.002,
      "answerName": "Lower endpoint",
      "answer": -0.14337039106423627
    }
  ],
  "questions": [
    {
      "id": "m2-s17-q001",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the bme423 student heart rate study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(60.56224\\) beats/min",
        "\\(64.42489\\) beats/min",
        "\\(56.69958\\) beats/min",
        "\\(68.28755\\) beats/min"
      ],
      "correct": 0,
      "why": "The lower endpoint is 60.56224 beats/min. Subtract the margin from the sample mean.",
      "case": "ci-heart",
      "equations": [
        "L=\\bar x-M",
        "L=67-6.437765=60.56224"
      ]
    },
    {
      "id": "m2-s17-q002",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the bme423 student heart rate study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(73.43776\\) beats/min",
        "\\(77.30042\\) beats/min",
        "\\(69.57511\\) beats/min",
        "\\(81.16308\\) beats/min"
      ],
      "correct": 0,
      "why": "The upper endpoint is 73.43776 beats/min. Add the same margin to the sample mean.",
      "case": "ci-heart",
      "equations": [
        "U=\\bar x+M",
        "U=67+6.437765=73.43776"
      ]
    },
    {
      "id": "m2-s17-q003",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the bme423 student heart rate study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(2.84605\\) beats/min",
        "\\(6.708709\\) beats/min",
        "\\(-1.016609\\) beats/min",
        "\\(10.57137\\) beats/min"
      ],
      "correct": 0,
      "why": "The standard error is 2.84605 beats/min. Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation.",
      "case": "ci-heart",
      "equations": [
        "s_{\\bar x}=\\frac{s}{\\sqrt n}",
        "s_{\\bar x}=\\frac{9}{\\sqrt{10}}=\\frac{9}{3.162278}=2.84605"
      ]
    },
    {
      "id": "m2-s17-q004",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the diuretic versus placebo urine production study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(31.18917\\) mL/day",
        "\\(144.4757\\) mL/day",
        "\\(-82.09732\\) mL/day",
        "\\(257.7622\\) mL/day"
      ],
      "correct": 0,
      "why": "The lower endpoint is 31.18917 mL/day. The bounds retain the diuretic minus placebo subtraction order.",
      "case": "ci-urine",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=220-188.8108=31.18917",
        "U=220+188.8108=408.8108"
      ]
    },
    {
      "id": "m2-s17-q005",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the diuretic versus placebo urine production study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(408.8108\\) mL/day",
        "\\(522.0973\\) mL/day",
        "\\(295.5243\\) mL/day",
        "\\(635.3838\\) mL/day"
      ],
      "correct": 0,
      "why": "The upper endpoint is 408.8108 mL/day. The bounds retain the diuretic minus placebo subtraction order.",
      "case": "ci-urine",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=220-188.8108=31.18917",
        "U=220+188.8108=408.8108"
      ]
    },
    {
      "id": "m2-s17-q006",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the diuretic versus placebo urine production study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(89.86712\\) mL/day",
        "\\(203.1536\\) mL/day",
        "\\(-23.41937\\) mL/day",
        "\\(316.4401\\) mL/day"
      ],
      "correct": 0,
      "why": "The standard error is 89.86712 mL/day. Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units.",
      "case": "ci-urine",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{40380.5}{10}+\\frac{40380.5}{10}}=\\sqrt{8076.1}=89.86712"
      ]
    },
    {
      "id": "m2-s17-q007",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the aspirin thrombosis interval · slide rounding study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.106\\) proportion difference",
        "\\(0.2824\\) proportion difference",
        "\\(-0.0704\\) proportion difference",
        "\\(0.4588\\) proportion difference"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.106 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-aspirin",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.4-0.294=0.106",
        "U=0.4+0.294=0.694"
      ]
    },
    {
      "id": "m2-s17-q008",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the aspirin thrombosis interval · slide rounding study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.694\\) proportion difference",
        "\\(0.8704\\) proportion difference",
        "\\(0.5176\\) proportion difference",
        "\\(1.0468\\) proportion difference"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.694 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-aspirin",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.4-0.294=0.106",
        "U=0.4+0.294=0.694"
      ]
    },
    {
      "id": "m2-s17-q009",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the aspirin thrombosis interval · slide rounding study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.15\\) proportion difference",
        "\\(0.3264\\) proportion difference",
        "\\(-0.0264\\) proportion difference",
        "\\(0.5028\\) proportion difference"
      ],
      "correct": 0,
      "why": "The standard error is 0.15 proportion difference. Keep the two group sizes separate inside the square root. The lecture example uses the displayed rounded SE of 0.15 for its interval.",
      "case": "ci-aspirin",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{0.2479339}{25}+\\frac{0.2479339}{19}}=0.151547\\approx 0.15"
      ]
    },
    {
      "id": "m2-s17-q010",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the aspirin thrombosis interval · retain intermediate digits study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.1071783\\) proportion difference",
        "\\(0.2853976\\) proportion difference",
        "\\(-0.07104101\\) proportion difference",
        "\\(0.463617\\) proportion difference"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.1071783 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-aspirin-precision",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.4042105-0.2970322=0.1071783",
        "U=0.4042105+0.2970322=0.7012427"
      ]
    },
    {
      "id": "m2-s17-q011",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the aspirin thrombosis interval · retain intermediate digits study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.7012427\\) proportion difference",
        "\\(0.8794621\\) proportion difference",
        "\\(0.5230234\\) proportion difference",
        "\\(1.057681\\) proportion difference"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.7012427 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-aspirin-precision",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.4042105-0.2970322=0.1071783",
        "U=0.4042105+0.2970322=0.7012427"
      ]
    },
    {
      "id": "m2-s17-q012",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the aspirin thrombosis interval · retain intermediate digits study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.151547\\) proportion difference",
        "\\(0.3297664\\) proportion difference",
        "\\(-0.02667228\\) proportion difference",
        "\\(0.5079857\\) proportion difference"
      ],
      "correct": 0,
      "why": "The standard error is 0.151547 proportion difference. Keep the two group sizes separate inside the square root.",
      "case": "ci-aspirin-precision",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{0.2479339}{25}+\\frac{0.2479339}{19}}=0.151547"
      ]
    },
    {
      "id": "m2-s17-q013",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the non-prescribed stimulant survey study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.3120831\\) proportion",
        "\\(0.3372332\\) proportion",
        "\\(0.286933\\) proportion",
        "\\(0.3623834\\) proportion"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.3120831 proportion. Subtract the margin from the observed proportion.",
      "case": "ci-survey",
      "equations": [
        "L=\\hat p-M",
        "L=0.354-0.04191688=0.3120831"
      ]
    },
    {
      "id": "m2-s17-q014",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the non-prescribed stimulant survey study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.3959169\\) proportion",
        "\\(0.421067\\) proportion",
        "\\(0.3707668\\) proportion",
        "\\(0.4462171\\) proportion"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.3959169 proportion. Add the same margin to the observed proportion.",
      "case": "ci-survey",
      "equations": [
        "U=\\hat p+M",
        "U=0.354+0.04191688=0.3959169"
      ]
    },
    {
      "id": "m2-s17-q015",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the non-prescribed stimulant survey study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.02138616\\) proportion",
        "\\(0.04653629\\) proportion",
        "\\(-0.003763965\\) proportion",
        "\\(0.07168642\\) proportion"
      ],
      "correct": 0,
      "why": "The standard error is 0.02138616 proportion. Subtract the proportion from one, multiply, divide by sample size, then take the square root.",
      "case": "ci-survey",
      "equations": [
        "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
        "\\hat p(1-\\hat p)=0.354(1-0.354)=0.228684",
        "s_{\\hat p}=\\sqrt{\\frac{0.228684}{500}}=\\sqrt{0.000457368}=0.02138616"
      ]
    },
    {
      "id": "m2-s17-q016",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the session 17 glucose lecture exercise study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(2.889417\\) mg/dL",
        "\\(3.135767\\) mg/dL",
        "\\(2.643067\\) mg/dL",
        "\\(3.382117\\) mg/dL"
      ],
      "correct": 0,
      "why": "The lower endpoint is 2.889417 mg/dL. The bounds retain the placebo minus drug subtraction order.",
      "case": "ci-glucose",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=3.3-0.4105831=2.889417",
        "U=3.3+0.4105831=3.710583"
      ]
    },
    {
      "id": "m2-s17-q017",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the session 17 glucose lecture exercise study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(3.710583\\) mg/dL",
        "\\(3.956933\\) mg/dL",
        "\\(3.464233\\) mg/dL",
        "\\(4.203283\\) mg/dL"
      ],
      "correct": 0,
      "why": "The upper endpoint is 3.710583 mg/dL. The bounds retain the placebo minus drug subtraction order.",
      "case": "ci-glucose",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=3.3-0.4105831=2.889417",
        "U=3.3+0.4105831=3.710583"
      ]
    },
    {
      "id": "m2-s17-q018",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the session 17 glucose lecture exercise study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.2094812\\) mg/dL",
        "\\(0.455831\\) mg/dL",
        "\\(-0.03686868\\) mg/dL",
        "\\(0.7021808\\) mg/dL"
      ],
      "correct": 0,
      "why": "The standard error is 0.2094812 mg/dL. Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units.",
      "case": "ci-glucose",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{18.65}{850}+\\frac{18.65}{850}}=\\sqrt{0.04388235}=0.2094812"
      ]
    },
    {
      "id": "m2-s17-q019",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the resting heart rate in a student sample study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(67.738\\) beats/min",
        "\\(70.2952\\) beats/min",
        "\\(65.1808\\) beats/min",
        "\\(72.8524\\) beats/min"
      ],
      "correct": 0,
      "why": "The lower endpoint is 67.738 beats/min. Subtract the margin from the sample mean.",
      "case": "ci-heart-practice",
      "equations": [
        "L=\\bar x-M",
        "L=72-4.262=67.738"
      ]
    },
    {
      "id": "m2-s17-q020",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the resting heart rate in a student sample study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(76.262\\) beats/min",
        "\\(78.8192\\) beats/min",
        "\\(73.7048\\) beats/min",
        "\\(81.3764\\) beats/min"
      ],
      "correct": 0,
      "why": "The upper endpoint is 76.262 beats/min. Add the same margin to the sample mean.",
      "case": "ci-heart-practice",
      "equations": [
        "U=\\bar x+M",
        "U=72+4.262=76.262"
      ]
    },
    {
      "id": "m2-s17-q021",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the resting heart rate in a student sample study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(2\\) beats/min",
        "\\(4.5572\\) beats/min",
        "\\(-0.5572\\) beats/min",
        "\\(7.1144\\) beats/min"
      ],
      "correct": 0,
      "why": "The standard error is 2 beats/min. Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation.",
      "case": "ci-heart-practice",
      "equations": [
        "s_{\\bar x}=\\frac{s}{\\sqrt n}",
        "s_{\\bar x}=\\frac{8}{\\sqrt{16}}=\\frac{8}{4}=2"
      ]
    },
    {
      "id": "m2-s17-q022",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the reaction time in a laboratory sample study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(293.488\\) ms",
        "\\(303.3952\\) ms",
        "\\(283.5808\\) ms",
        "\\(313.3024\\) ms"
      ],
      "correct": 0,
      "why": "The lower endpoint is 293.488 ms. Subtract the margin from the sample mean.",
      "case": "ci-reaction",
      "equations": [
        "L=\\bar x-M",
        "L=310-16.512=293.488"
      ]
    },
    {
      "id": "m2-s17-q023",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the reaction time in a laboratory sample study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(326.512\\) ms",
        "\\(336.4192\\) ms",
        "\\(316.6048\\) ms",
        "\\(346.3264\\) ms"
      ],
      "correct": 0,
      "why": "The upper endpoint is 326.512 ms. Add the same margin to the sample mean.",
      "case": "ci-reaction",
      "equations": [
        "U=\\bar x+M",
        "U=310+16.512=326.512"
      ]
    },
    {
      "id": "m2-s17-q024",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the reaction time in a laboratory sample study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(8\\) ms",
        "\\(17.9072\\) ms",
        "\\(-1.9072\\) ms",
        "\\(27.8144\\) ms"
      ],
      "correct": 0,
      "why": "The standard error is 8 ms. Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation.",
      "case": "ci-reaction",
      "equations": [
        "s_{\\bar x}=\\frac{s}{\\sqrt n}",
        "s_{\\bar x}=\\frac{40}{\\sqrt{25}}=\\frac{40}{5}=8"
      ]
    },
    {
      "id": "m2-s17-q025",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the systolic pressure in a clinic sample study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(116.3755\\) mmHg",
        "\\(120.9502\\) mmHg",
        "\\(111.8008\\) mmHg",
        "\\(125.5249\\) mmHg"
      ],
      "correct": 0,
      "why": "The lower endpoint is 116.3755 mmHg. Subtract the margin from the sample mean.",
      "case": "ci-pressure",
      "equations": [
        "L=\\bar x-M",
        "L=124-7.624488=116.3755"
      ]
    },
    {
      "id": "m2-s17-q026",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the systolic pressure in a clinic sample study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(131.6245\\) mmHg",
        "\\(136.1992\\) mmHg",
        "\\(127.0498\\) mmHg",
        "\\(140.7739\\) mmHg"
      ],
      "correct": 0,
      "why": "The upper endpoint is 131.6245 mmHg. Add the same margin to the sample mean.",
      "case": "ci-pressure",
      "equations": [
        "U=\\bar x+M",
        "U=124+7.624488=131.6245"
      ]
    },
    {
      "id": "m2-s17-q027",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the systolic pressure in a clinic sample study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(3.464102\\) mmHg",
        "\\(8.038794\\) mmHg",
        "\\(-1.110591\\) mmHg",
        "\\(12.61349\\) mmHg"
      ],
      "correct": 0,
      "why": "The standard error is 3.464102 mmHg. Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation.",
      "case": "ci-pressure",
      "equations": [
        "s_{\\bar x}=\\frac{s}{\\sqrt n}",
        "s_{\\bar x}=\\frac{12}{\\sqrt{12}}=\\frac{12}{3.464102}=3.464102"
      ]
    },
    {
      "id": "m2-s17-q028",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the respiration rate after quiet rest study, construct the requested 99% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(14.08078\\) breaths/min",
        "\\(15.23231\\) breaths/min",
        "\\(12.92925\\) breaths/min",
        "\\(16.38384\\) breaths/min"
      ],
      "correct": 0,
      "why": "The lower endpoint is 14.08078 breaths/min. Subtract the margin from the sample mean.",
      "case": "ci-respiration",
      "equations": [
        "L=\\bar x-M",
        "L=16-1.919217=14.08078"
      ]
    },
    {
      "id": "m2-s17-q029",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the respiration rate after quiet rest study, construct the requested 99% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(17.91922\\) breaths/min",
        "\\(19.07075\\) breaths/min",
        "\\(16.76769\\) breaths/min",
        "\\(20.22228\\) breaths/min"
      ],
      "correct": 0,
      "why": "The upper endpoint is 17.91922 breaths/min. Add the same margin to the sample mean.",
      "case": "ci-respiration",
      "equations": [
        "U=\\bar x+M",
        "U=16+1.919217=17.91922"
      ]
    },
    {
      "id": "m2-s17-q030",
      "module": 17,
      "topic": "oneMean",
      "stem": "For the respiration rate after quiet rest study, construct the requested 99% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.6708204\\) breaths/min",
        "\\(1.822351\\) breaths/min",
        "\\(-0.4807099\\) breaths/min",
        "\\(2.973881\\) breaths/min"
      ],
      "correct": 0,
      "why": "The standard error is 0.6708204 breaths/min. Divide the sample SD by the square root of sample size. Keep the standard error available for the margin calculation.",
      "case": "ci-respiration",
      "equations": [
        "s_{\\bar x}=\\frac{s}{\\sqrt n}",
        "s_{\\bar x}=\\frac{3}{\\sqrt{20}}=\\frac{3}{4.472136}=0.6708204"
      ]
    },
    {
      "id": "m2-s17-q031",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the neural response under two conditions study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(-0.6144368\\) score units",
        "\\(1.554225\\) score units",
        "\\(-2.783099\\) score units",
        "\\(3.722887\\) score units"
      ],
      "correct": 0,
      "why": "The lower endpoint is -0.6144368 score units. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-neural",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=3-3.614437=-0.6144368",
        "U=3+3.614437=6.614437"
      ]
    },
    {
      "id": "m2-s17-q032",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the neural response under two conditions study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(6.614437\\) score units",
        "\\(8.783099\\) score units",
        "\\(4.445775\\) score units",
        "\\(10.95176\\) score units"
      ],
      "correct": 0,
      "why": "The upper endpoint is 6.614437 score units. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-neural",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=3-3.614437=-0.6144368",
        "U=3+3.614437=6.614437"
      ]
    },
    {
      "id": "m2-s17-q033",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the neural response under two conditions study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(1.757995\\) score units",
        "\\(3.926657\\) score units",
        "\\(-0.4106675\\) score units",
        "\\(6.095319\\) score units"
      ],
      "correct": 0,
      "why": "The standard error is 1.757995 score units. Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units.",
      "case": "ci-neural",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{21.19231}{12}+\\frac{21.19231}{16}}=\\sqrt{3.090545}=1.757995"
      ]
    },
    {
      "id": "m2-s17-q034",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the sleep duration in two treatment groups study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(-0.3796692\\) hours",
        "\\(0.08813231\\) hours",
        "\\(-0.8474707\\) hours",
        "\\(0.5559338\\) hours"
      ],
      "correct": 0,
      "why": "The lower endpoint is -0.3796692 hours. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-sleep",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.4-0.7796692=-0.3796692",
        "U=0.4+0.7796692=1.179669"
      ]
    },
    {
      "id": "m2-s17-q035",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the sleep duration in two treatment groups study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(1.179669\\) hours",
        "\\(1.647471\\) hours",
        "\\(0.7118677\\) hours",
        "\\(2.115272\\) hours"
      ],
      "correct": 0,
      "why": "The upper endpoint is 1.179669 hours. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-sleep",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.4-0.7796692=-0.3796692",
        "U=0.4+0.7796692=1.179669"
      ]
    },
    {
      "id": "m2-s17-q036",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the sleep duration in two treatment groups study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.3836955\\) hours",
        "\\(0.851497\\) hours",
        "\\(-0.08410605\\) hours",
        "\\(1.319299\\) hours"
      ],
      "correct": 0,
      "why": "The standard error is 0.3836955 hours. Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units.",
      "case": "ci-sleep",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{1.325}{18}+\\frac{1.325}{18}}=\\sqrt{0.1472222}=0.3836955"
      ]
    },
    {
      "id": "m2-s17-q037",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the pain scores after intervention versus control study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(-1.963336\\) score units",
        "\\(-1.445334\\) score units",
        "\\(-2.481337\\) score units",
        "\\(-0.9273329\\) score units"
      ],
      "correct": 0,
      "why": "The lower endpoint is -1.963336 score units. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-pain",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=-1.1-0.8633356=-1.963336",
        "U=-1.1+0.8633356=-0.2366644"
      ]
    },
    {
      "id": "m2-s17-q038",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the pain scores after intervention versus control study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(-0.2366644\\) score units",
        "\\(0.281337\\) score units",
        "\\(-0.7546657\\) score units",
        "\\(0.7993384\\) score units"
      ],
      "correct": 0,
      "why": "The upper endpoint is -0.2366644 score units. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-pain",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=-1.1-0.8633356=-1.963336",
        "U=-1.1+0.8633356=-0.2366644"
      ]
    },
    {
      "id": "m2-s17-q039",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the pain scores after intervention versus control study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.4278175\\) score units",
        "\\(0.9458188\\) score units",
        "\\(-0.09018392\\) score units",
        "\\(1.46382\\) score units"
      ],
      "correct": 0,
      "why": "The standard error is 0.4278175 score units. Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units.",
      "case": "ci-pain",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{1.996667}{20}+\\frac{1.996667}{24}}=\\sqrt{0.1830278}=0.4278175"
      ]
    },
    {
      "id": "m2-s17-q040",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the evoked-response latency in two groups study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(-11.62804\\) ms",
        "\\(-7.051216\\) ms",
        "\\(-16.20487\\) ms",
        "\\(-2.474392\\) ms"
      ],
      "correct": 0,
      "why": "The lower endpoint is -11.62804 ms. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-latency",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=-4-7.628041=-11.62804",
        "U=-4+7.628041=3.628041"
      ]
    },
    {
      "id": "m2-s17-q041",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the evoked-response latency in two groups study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(3.628041\\) ms",
        "\\(8.204866\\) ms",
        "\\(-0.9487835\\) ms",
        "\\(12.78169\\) ms"
      ],
      "correct": 0,
      "why": "The upper endpoint is 3.628041 ms. The bounds retain the group1 minus group2 subtraction order.",
      "case": "ci-latency",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=-4-7.628041=-11.62804",
        "U=-4+7.628041=3.628041"
      ]
    },
    {
      "id": "m2-s17-q042",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For the evoked-response latency in two groups study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(3.735574\\) ms",
        "\\(8.312398\\) ms",
        "\\(-0.8412512\\) ms",
        "\\(12.88922\\) ms"
      ],
      "correct": 0,
      "why": "The standard error is 3.735574 ms. Add the two mean-variance contributions inside the root, then take the root. This restores the original measurement units.",
      "case": "ci-latency",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{111.2}{15}+\\frac{111.2}{17}}=\\sqrt{13.95451}=3.735574"
      ]
    },
    {
      "id": "m2-s17-q043",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the positive screening responses study, construct the requested 99% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.2132276\\) proportion",
        "\\(0.2532911\\) proportion",
        "\\(0.1731642\\) proportion",
        "\\(0.2933545\\) proportion"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.2132276 proportion. Subtract the margin from the observed proportion.",
      "case": "ci-screen",
      "equations": [
        "L=\\hat p-M",
        "L=0.28-0.06677237=0.2132276"
      ]
    },
    {
      "id": "m2-s17-q044",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the positive screening responses study, construct the requested 99% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.3467724\\) proportion",
        "\\(0.3868358\\) proportion",
        "\\(0.3067089\\) proportion",
        "\\(0.4268992\\) proportion"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.3467724 proportion. Add the same margin to the observed proportion.",
      "case": "ci-screen",
      "equations": [
        "U=\\hat p+M",
        "U=0.28+0.06677237=0.3467724"
      ]
    },
    {
      "id": "m2-s17-q045",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the positive screening responses study, construct the requested 99% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.02592296\\) proportion",
        "\\(0.06598638\\) proportion",
        "\\(-0.01414046\\) proportion",
        "\\(0.1060498\\) proportion"
      ],
      "correct": 0,
      "why": "The standard error is 0.02592296 proportion. Subtract the proportion from one, multiply, divide by sample size, then take the square root.",
      "case": "ci-screen",
      "equations": [
        "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
        "\\hat p(1-\\hat p)=0.28(1-0.28)=0.2016",
        "s_{\\hat p}=\\sqrt{\\frac{0.2016}{300}}=\\sqrt{0.000672}=0.02592296"
      ]
    },
    {
      "id": "m2-s17-q046",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the successful recall responses study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.5630867\\) proportion",
        "\\(0.6032347\\) proportion",
        "\\(0.5229388\\) proportion",
        "\\(0.6433827\\) proportion"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.5630867 proportion. Subtract the margin from the observed proportion.",
      "case": "ci-recall",
      "equations": [
        "L=\\hat p-M",
        "L=0.63-0.06691326=0.5630867"
      ]
    },
    {
      "id": "m2-s17-q047",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the successful recall responses study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.6969133\\) proportion",
        "\\(0.7370612\\) proportion",
        "\\(0.6567653\\) proportion",
        "\\(0.7772092\\) proportion"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.6969133 proportion. Add the same margin to the observed proportion.",
      "case": "ci-recall",
      "equations": [
        "U=\\hat p+M",
        "U=0.63+0.06691326=0.6969133"
      ]
    },
    {
      "id": "m2-s17-q048",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the successful recall responses study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.03413942\\) proportion",
        "\\(0.07428738\\) proportion",
        "\\(-0.006008538\\) proportion",
        "\\(0.1144353\\) proportion"
      ],
      "correct": 0,
      "why": "The standard error is 0.03413942 proportion. Subtract the proportion from one, multiply, divide by sample size, then take the square root.",
      "case": "ci-recall",
      "equations": [
        "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
        "\\hat p(1-\\hat p)=0.63(1-0.63)=0.2331",
        "s_{\\hat p}=\\sqrt{\\frac{0.2331}{200}}=\\sqrt{0.0011655}=0.03413942"
      ]
    },
    {
      "id": "m2-s17-q049",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the symptom reports during follow-up study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.2420224\\) proportion",
        "\\(0.276809\\) proportion",
        "\\(0.2072359\\) proportion",
        "\\(0.3115955\\) proportion"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.2420224 proportion. Subtract the margin from the observed proportion.",
      "case": "ci-symptom",
      "equations": [
        "L=\\hat p-M",
        "L=0.3-0.05797758=0.2420224"
      ]
    },
    {
      "id": "m2-s17-q050",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the symptom reports during follow-up study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.3579776\\) proportion",
        "\\(0.3927641\\) proportion",
        "\\(0.323191\\) proportion",
        "\\(0.4275507\\) proportion"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.3579776 proportion. Add the same margin to the observed proportion.",
      "case": "ci-symptom",
      "equations": [
        "U=\\hat p+M",
        "U=0.3+0.05797758=0.3579776"
      ]
    },
    {
      "id": "m2-s17-q051",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the symptom reports during follow-up study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.0295804\\) proportion",
        "\\(0.06436695\\) proportion",
        "\\(-0.00520615\\) proportion",
        "\\(0.0991535\\) proportion"
      ],
      "correct": 0,
      "why": "The standard error is 0.0295804 proportion. Subtract the proportion from one, multiply, divide by sample size, then take the square root.",
      "case": "ci-symptom",
      "equations": [
        "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
        "\\hat p(1-\\hat p)=0.3(1-0.3)=0.21",
        "s_{\\hat p}=\\sqrt{\\frac{0.21}{240}}=\\sqrt{0.000875}=0.0295804"
      ]
    },
    {
      "id": "m2-s17-q052",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the clinical response proportion study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.3422005\\) proportion",
        "\\(0.3708802\\) proportion",
        "\\(0.3135208\\) proportion",
        "\\(0.3995599\\) proportion"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.3422005 proportion. Subtract the margin from the observed proportion.",
      "case": "ci-response",
      "equations": [
        "L=\\hat p-M",
        "L=0.39-0.04779949=0.3422005"
      ]
    },
    {
      "id": "m2-s17-q053",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the clinical response proportion study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.4377995\\) proportion",
        "\\(0.4664792\\) proportion",
        "\\(0.4091198\\) proportion",
        "\\(0.4951589\\) proportion"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.4377995 proportion. Add the same margin to the observed proportion.",
      "case": "ci-response",
      "equations": [
        "U=\\hat p+M",
        "U=0.39+0.04779949=0.4377995"
      ]
    },
    {
      "id": "m2-s17-q054",
      "module": 17,
      "topic": "oneProportion",
      "stem": "For the clinical response proportion study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.0243875\\) proportion",
        "\\(0.05306719\\) proportion",
        "\\(-0.004292199\\) proportion",
        "\\(0.08174689\\) proportion"
      ],
      "correct": 0,
      "why": "The standard error is 0.0243875 proportion. Subtract the proportion from one, multiply, divide by sample size, then take the square root.",
      "case": "ci-response",
      "equations": [
        "s_{\\hat p}=\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}",
        "\\hat p(1-\\hat p)=0.39(1-0.39)=0.2379",
        "s_{\\hat p}=\\sqrt{\\frac{0.2379}{400}}=\\sqrt{0.00059475}=0.0243875"
      ]
    },
    {
      "id": "m2-s17-q055",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the event proportions in two treatment groups study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(0.02623256\\) proportion difference",
        "\\(0.100493\\) proportion difference",
        "\\(-0.04802791\\) proportion difference",
        "\\(0.1747535\\) proportion difference"
      ],
      "correct": 0,
      "why": "The lower endpoint is 0.02623256 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-event",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.15-0.1237674=0.02623256",
        "U=0.15+0.1237674=0.2737674"
      ]
    },
    {
      "id": "m2-s17-q056",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the event proportions in two treatment groups study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.2737674\\) proportion difference",
        "\\(0.3480279\\) proportion difference",
        "\\(0.199507\\) proportion difference",
        "\\(0.4222884\\) proportion difference"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.2737674 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-event",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.15-0.1237674=0.02623256",
        "U=0.15+0.1237674=0.2737674"
      ]
    },
    {
      "id": "m2-s17-q057",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the event proportions in two treatment groups study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.06314665\\) proportion difference",
        "\\(0.1374071\\) proportion difference",
        "\\(-0.01111381\\) proportion difference",
        "\\(0.2116676\\) proportion difference"
      ],
      "correct": 0,
      "why": "The standard error is 0.06314665 proportion difference. Keep the two group sizes separate inside the square root.",
      "case": "ci-event",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{0.199375}{100}+\\frac{0.199375}{100}}=0.06314665"
      ]
    },
    {
      "id": "m2-s17-q058",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the adverse-event proportions study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(-0.04622354\\) proportion difference",
        "\\(0.00605604\\) proportion difference",
        "\\(-0.09850311\\) proportion difference",
        "\\(0.05833562\\) proportion difference"
      ],
      "correct": 0,
      "why": "The lower endpoint is -0.04622354 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-adverse",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.04090909-0.08713263=-0.04622354",
        "U=0.04090909+0.08713263=0.1280417"
      ]
    },
    {
      "id": "m2-s17-q059",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the adverse-event proportions study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.1280417\\) proportion difference",
        "\\(0.1803213\\) proportion difference",
        "\\(0.07576214\\) proportion difference",
        "\\(0.2326009\\) proportion difference"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.1280417 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-adverse",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.04090909-0.08713263=-0.04622354",
        "U=0.04090909+0.08713263=0.1280417"
      ]
    },
    {
      "id": "m2-s17-q060",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the adverse-event proportions study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.04445542\\) proportion difference",
        "\\(0.096735\\) proportion difference",
        "\\(-0.007824154\\) proportion difference",
        "\\(0.1490146\\) proportion difference"
      ],
      "correct": 0,
      "why": "The standard error is 0.04445542 proportion difference. Keep the two group sizes separate inside the square root.",
      "case": "ci-adverse",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{0.1134216}{120}+\\frac{0.1134216}{110}}=0.04445542"
      ]
    },
    {
      "id": "m2-s17-q061",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the improvement after two interventions study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(-0.01214317\\) proportion difference",
        "\\(0.06714273\\) proportion difference",
        "\\(-0.09142908\\) proportion difference",
        "\\(0.1464286\\) proportion difference"
      ],
      "correct": 0,
      "why": "The lower endpoint is -0.01214317 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-improvement",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.12-0.1321432=-0.01214317",
        "U=0.12+0.1321432=0.2521432"
      ]
    },
    {
      "id": "m2-s17-q062",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the improvement after two interventions study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.2521432\\) proportion difference",
        "\\(0.3314291\\) proportion difference",
        "\\(0.1728573\\) proportion difference",
        "\\(0.410715\\) proportion difference"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.2521432 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-improvement",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=0.12-0.1321432=-0.01214317",
        "U=0.12+0.1321432=0.2521432"
      ]
    },
    {
      "id": "m2-s17-q063",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the improvement after two interventions study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.06741999\\) proportion difference",
        "\\(0.1467059\\) proportion difference",
        "\\(-0.01186592\\) proportion difference",
        "\\(0.2259918\\) proportion difference"
      ],
      "correct": 0,
      "why": "The standard error is 0.06741999 proportion difference. Keep the two group sizes separate inside the square root.",
      "case": "ci-improvement",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{0.2479339}{120}+\\frac{0.2479339}{100}}=0.06741999"
      ]
    },
    {
      "id": "m2-s17-q064",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the completion of a follow-up assessment study, construct the requested 95% interval using the stated course method. What is its lower endpoint?",
      "options": [
        "\\(-0.1433704\\) proportion difference",
        "\\(-0.07734816\\) proportion difference",
        "\\(-0.2093926\\) proportion difference",
        "\\(-0.01132592\\) proportion difference"
      ],
      "correct": 0,
      "why": "The lower endpoint is -0.1433704 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-completion",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=-0.03333333-0.1100371=-0.1433704",
        "U=-0.03333333+0.1100371=0.07670372"
      ]
    },
    {
      "id": "m2-s17-q065",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the completion of a follow-up assessment study, construct the requested 95% interval using the stated course method. What is its upper endpoint?",
      "options": [
        "\\(0.07670372\\) proportion difference",
        "\\(0.142726\\) proportion difference",
        "\\(0.01068149\\) proportion difference",
        "\\(0.2087482\\) proportion difference"
      ],
      "correct": 0,
      "why": "The upper endpoint is 0.07670372 proportion difference. These are absolute differences of event probabilities. Multiply by 100 to express the difference in percentage points.",
      "case": "ci-completion",
      "equations": [
        "L=d-M",
        "U=d+M",
        "L=-0.03333333-0.1100371=-0.1433704",
        "U=-0.03333333+0.1100371=0.07670372"
      ]
    },
    {
      "id": "m2-s17-q066",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the completion of a follow-up assessment study, construct the requested 95% interval using the stated course method. What is its standard error?",
      "options": [
        "\\(0.05614136\\) proportion difference",
        "\\(0.1221636\\) proportion difference",
        "\\(-0.009880879\\) proportion difference",
        "\\(0.1881858\\) proportion difference"
      ],
      "correct": 0,
      "why": "The standard error is 0.05614136 proportion difference. Keep the two group sizes separate inside the square root.",
      "case": "ci-completion",
      "equations": [
        "s_d=\\sqrt{\\frac{s^2}{n_1}+\\frac{s^2}{n_2}}",
        "s_d=\\sqrt{\\frac{0.2363889}{150}+\\frac{0.2363889}{150}}=0.05614136"
      ]
    },
    {
      "id": "m2-s17-q067",
      "module": 17,
      "topic": "meaning",
      "stem": "A procedure is used to construct a 95% interval from each of many new samples of the same populations. Which description gives its confidence meaning?",
      "options": [
        "About 95% of these intervals contain the same true population quantity.",
        "About 95% of individual observations must lie in every calculated interval.",
        "The true population mean changes to match the center of each new interval.",
        "Every particular interval is guaranteed to contain the parameter."
      ],
      "correct": 0,
      "why": "The population quantity is fixed, while random samples produce different intervals. Confidence describes repeated coverage of that procedure.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q068",
      "module": 17,
      "topic": "meaning",
      "stem": "A 95% interval estimates the mean heart rate as 60.6 to 73.4 beats/min. Which statement interprets the target of that interval?",
      "options": [
        "It estimates the population mean heart rate, with 95% confidence in the interval procedure.",
        "It contains 95% of all individual student heart rates.",
        "It states that the sample mean has a 95% chance of changing from 67 to another value.",
        "It estimates the SD of individual heart rates rather than their mean."
      ],
      "correct": 0,
      "why": "A confidence interval for a mean concerns the population average. Individual spread is measured separately by the SD.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q069",
      "module": 17,
      "topic": "decision",
      "stem": "A 95% interval for treatment minus control is −1.4 to 2.1 units. Which two-sided decision is justified at 0.05?",
      "options": [
        "Do not reject equal population means because zero is included.",
        "Reject equal population means because one endpoint is negative.",
        "Conclude the population means are exactly equal.",
        "Reject equal population means because the endpoints have different signs."
      ],
      "correct": 0,
      "why": "The difference interval spans zero, so it includes the equal-means null. Nonrejection does not establish exact equality.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q070",
      "module": 17,
      "topic": "decision",
      "stem": "A 95% interval for treatment minus control is −4.2 to −0.8 units. Which conclusion preserves its direction?",
      "options": [
        "The treatment population mean is lower, and zero is excluded.",
        "The treatment population mean is higher because the interval is statistically significant.",
        "The population means are equal because both endpoints have the same sign.",
        "No direction can be stated unless a separate t statistic is calculated."
      ],
      "correct": 0,
      "why": "Both bounds are negative for treatment minus control, placing the treatment mean below control. Zero exclusion gives the corresponding two-sided decision.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q071",
      "module": 17,
      "topic": "decision",
      "stem": "An interval for the population difference is 0 to 3.2 units. Applying the lecture’s includes-zero rule, what is the appropriate decision?",
      "options": [
        "Do not reject the zero-difference null because zero is included at the endpoint.",
        "Reject the null because the upper endpoint is positive.",
        "Reject the null because zero must occur strictly inside the interval to count.",
        "Conclude every individual benefits by exactly 3.2 units."
      ],
      "correct": 0,
      "why": "The stated rule concerns whether zero is included, including a boundary endpoint. It does not concern whether every individual changes.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q072",
      "module": 17,
      "topic": "oneMean",
      "stem": "A 95% CI for a mean is 60.6 to 73.4. The null specifies a population mean of 70. What value should be checked against the interval?",
      "options": [
        "70, because it is the population mean specified by the null.",
        "Zero, because every confidence-interval decision uses zero.",
        "67, because the sample mean always replaces the null reference.",
        "9, because the sample SD is the null population mean."
      ],
      "correct": 0,
      "why": "For a single mean, check the specified null mean. Zero is the usual null for a difference, not every parameter.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q073",
      "module": 17,
      "topic": "oneProportion",
      "stem": "A 95% interval for a population proportion is 0.312 to 0.396, and the null states \\(p=0.5\\). Which conclusion follows?",
      "options": [
        "Reject p=0.5; the compatible population proportions are below one half.",
        "Do not reject p=0.5 because zero is not in the interval.",
        "Conclude 95% of respondents have outcomes between 0.312 and 0.396.",
        "Reject only if the interval is entirely negative."
      ],
      "correct": 0,
      "why": "The comparison is with 0.5, which is excluded above the upper endpoint. The interval concerns an event proportion, not the range of binary individual outcomes.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q074",
      "module": 17,
      "topic": "twoMeans",
      "stem": "Independent Normal samples with a common variance have sizes 12 and 16. Which df belongs to the pooled mean-difference interval?",
      "options": [
        "26",
        "27",
        "11",
        "15"
      ],
      "correct": 0,
      "why": "The pooled two-sample degrees of freedom add the two group sizes and subtract two. \\[\\nu=n_1+n_2-2=12+16-2=26\\]",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q075",
      "module": 17,
      "topic": "oneMean",
      "stem": "A single independent Normal sample contains ten observations. Which df supplies the one-sample t confidence cutoff?",
      "options": [
        "9",
        "10",
        "18",
        "Infinity"
      ],
      "correct": 0,
      "why": "The one-sample degrees of freedom are one less than the sample size. \\[\\nu=n-1=10-1=9\\]",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q076",
      "module": 17,
      "topic": "meaning",
      "stem": "The supplied t table labels a critical-value column 0.05. What does that heading represent?",
      "options": [
        "The sum of the probabilities in the two tails.",
        "The probability in the right tail alone.",
        "The central confidence probability.",
        "The sample mean divided by its standard error."
      ],
      "correct": 0,
      "why": "The table is explicitly two-tailed. The 0.05 heading combines 0.025 in each tail, so the central confidence is 95%.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q077",
      "module": 17,
      "topic": "meaning",
      "stem": "The supplied t table labels a column by total two-tail alpha. Which lookup corresponds to a 95% interval?",
      "options": [
        "The 0.05 total two-tail column at the appropriate df.",
        "The 0.025 total two-tail column after halving alpha again.",
        "The 0.95 two-tail column because confidence is 95%.",
        "Any df row because the t cutoff is always 1.96."
      ],
      "correct": 0,
      "why": "The course column already accounts for both tails. Halving alpha again selects a different confidence level.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q078",
      "module": 17,
      "topic": "oneMean",
      "stem": "The heart-rate sample SD is 9 beats/min and n=10. Which role belongs to 9 divided by the square root of 10?",
      "options": [
        "The standard error of the sample mean.",
        "The variance of individual heart rates.",
        "The population mean specified by the null.",
        "The full confidence-interval width."
      ],
      "correct": 0,
      "why": "Dividing SD by the root of sample size estimates variability of the sample mean. The margin also requires the critical value.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q079",
      "module": 17,
      "topic": "twoMeans",
      "stem": "Two groups have unequal sample sizes and SDs. Which operation follows the course pooled-variance formula?",
      "options": [
        "Weight each squared SD by its own n−1, add, and divide by n1+n2−2.",
        "Average the unsquared SDs and use that as the variance.",
        "Weight the two means by their SDs and divide by n1+n2.",
        "Use the larger SD as the common variance without squaring it."
      ],
      "correct": 0,
      "why": "The formula pools variance contributions, not SDs or means. The unequal group df determine their weights.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q080",
      "module": 17,
      "topic": "twoMeans",
      "stem": "For equal group sizes n, how can the pooled SE calculation be shortened without changing the method?",
      "options": [
        "Use \\(s_d=\\sqrt{(s_1^2+s_2^2)/n}\\).",
        "Use \\(s_d=(s_1+s_2)/n\\).",
        "Use \\(s_d=\\sqrt{s_1+s_2}\\).",
        "Use \\(s_d=s_1^2+s_2^2\\)."
      ],
      "correct": 0,
      "why": "Equal n makes the pooled variance the average of the two group variances; substituting it into the two-group SE gives the stated root.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q081",
      "module": 17,
      "topic": "twoMeans",
      "stem": "Which hypothesis statement describes a two-sided population mean comparison in words?",
      "options": [
        "The null says the population means are equal, and the alternative says they differ.",
        "The null says the observed sample means must be identical in every sample.",
        "The alternative says the sample SDs are unequal, regardless of the means.",
        "The null says a particular person has the group-average response."
      ],
      "correct": 0,
      "why": "The parameters being compared are population means. Sample means can differ under an equal-population-means null.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q082",
      "module": 17,
      "topic": "twoProportions",
      "stem": "The aspirin slide’s CI is approximately 0.11 to 0.69 for placebo minus aspirin. What kind of effect does this interval describe?",
      "options": [
        "An absolute difference of about 11 to 69 percentage points.",
        "A relative-risk reduction of exactly 11% to 69%.",
        "The probability that a particular aspirin patient has an event.",
        "The SD of the number of placebo events."
      ],
      "correct": 0,
      "why": "Subtracting proportions produces an absolute probability difference. A relative-risk reduction requires a ratio and is a different calculation.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q083",
      "module": 17,
      "topic": "twoProportions",
      "stem": "Which data are combined to form the pooled proportion in Session 17?",
      "options": [
        "The event counts are added and divided by the sum of the group sizes.",
        "The two sample proportions are averaged without regard to group size.",
        "Only the larger sample’s event count is divided by both sample sizes.",
        "The SDs of two continuous outcomes are averaged."
      ],
      "correct": 0,
      "why": "The pooled event fraction uses total events over total observations. An unweighted average of proportions can differ when group sizes differ.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q084",
      "module": 17,
      "topic": "twoProportions",
      "stem": "For the course two-proportion interval, which quantities supply the center and standard error?",
      "options": [
        "Separate group proportions supply the center difference; the pooled proportion supplies the SE variance.",
        "The pooled proportion supplies the center difference, which is always zero.",
        "The pooled proportion is used only to decide which group is first.",
        "The two proportions are replaced by sample means of continuous measurements."
      ],
      "correct": 0,
      "why": "The observed difference uses each group’s own event fraction. Session 17 uses the combined event fraction inside the binary variance for the SE.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q085",
      "module": 17,
      "topic": "oneProportion",
      "stem": "A binary sample contains 177 yes responses among 500 participants. Which expression estimates its standard error?",
      "options": [
        "\\(\\sqrt{(177/500)(1-177/500)/500}\\)",
        "\\((177/500)(1-177/500)\\)",
        "\\(177/\\sqrt{500}\\)",
        "\\(\\sqrt{177/500}\\)"
      ],
      "correct": 0,
      "why": "Convert the count to a proportion, form p-hat times one minus p-hat, divide by n, then take the root.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q086",
      "module": 17,
      "topic": "oneProportion",
      "stem": "What does the null \\(p=0.5\\) mean for the stimulant survey?",
      "options": [
        "The population proportion reporting the behavior is one half.",
        "Exactly half of every random sample must answer yes.",
        "The observed sample proportion is defined to be one half.",
        "Each student reports a response equal to 0.5 rather than yes or no."
      ],
      "correct": 0,
      "why": "The null concerns the population event proportion. The observed fraction is allowed to differ because a sample is random.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q087",
      "module": 17,
      "topic": "meaning",
      "stem": "The same data are used for 95% and 99% intervals with the same method. How do their widths compare?",
      "options": [
        "The 99% interval is wider because its critical value is larger.",
        "The 99% interval is narrower because confidence always removes uncertainty.",
        "The widths are identical because the sample estimate is unchanged.",
        "The 99% interval must have a different sample mean as its center."
      ],
      "correct": 0,
      "why": "The center and SE are unchanged, while greater confidence requires a larger critical multiple.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q088",
      "module": 17,
      "topic": "oneMean",
      "stem": "If sample size is multiplied by four while sample SD is held fixed, what happens to the standard error of the sample mean?",
      "options": [
        "It is halved.",
        "It is divided by four.",
        "It doubles.",
        "It stays unchanged."
      ],
      "correct": 0,
      "why": "The root of four times n is twice the root of n, so the same SD is divided by twice the denominator.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q089",
      "module": 17,
      "topic": "meaning",
      "stem": "An interval is written as estimate minus M to estimate plus M. What is its full width?",
      "options": [
        "\\(2M\\)",
        "\\(M\\)",
        "\\(M/2\\)",
        "The estimate itself"
      ],
      "correct": 0,
      "why": "Subtracting the lower bound from the upper bound gives the full interval width. \\[U-L=(\\hat\\theta+M)-(\\hat\\theta-M)=2M\\]",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q090",
      "module": 17,
      "topic": "twoMeans",
      "stem": "A placebo-minus-drug interval for glucose is 2.889 to 3.711 mg/dL. Which direction is supported?",
      "options": [
        "The drug population mean is lower than the placebo population mean.",
        "The drug population mean is higher because both bounds are positive.",
        "Every drug recipient has a lower value than every placebo recipient.",
        "The population means are equal because the interval has two endpoints."
      ],
      "correct": 0,
      "why": "Positive placebo-minus-drug values place the placebo mean above the drug mean. The parameter is a difference of population averages, not an ordering of all individuals.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q091",
      "module": 17,
      "topic": "twoMeans",
      "stem": "A mean-difference interval for group 1 minus group 2 is [2,5]. What interval expresses group 2 minus group 1?",
      "options": [
        "[−5,−2]",
        "[−2,−5]",
        "[2,5]",
        "[0,3]"
      ],
      "correct": 0,
      "why": "Reversing the subtraction multiplies the difference by minus one and reverses the endpoint order. The zero-inclusion decision is unchanged.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q092",
      "module": 17,
      "topic": "oneMean",
      "stem": "A confidence interval for a population mean uses the sample SD because the population SD is unknown. Which distribution and df are used in this lecture?",
      "options": [
        "t with n−1 df.",
        "Always Normal with no role for sample size.",
        "F with n numerator df and one denominator df.",
        "Chi-square with twice the sample size."
      ],
      "correct": 0,
      "why": "The one-sample mean interval uses the t procedure with a sample-based SEM and n−1 df.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q093",
      "module": 17,
      "topic": "twoProportions",
      "stem": "The aspirin slide rounds 6/19 to 0.32 and the SE to 0.15. Why can a calculation retaining the fractions yield a slightly different upper endpoint?",
      "options": [
        "The slide rounds intermediate quantities before calculating its margin and center.",
        "The original fractions and the rounded values represent different patient counts.",
        "A confidence level of 95% requires rounding all values to integers.",
        "A positive endpoint forces the pooled proportion to equal 0.5."
      ],
      "correct": 0,
      "why": "Early rounding changes both the center difference and the margin slightly. Preserve the stated precision when reproducing a slide calculation.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q094",
      "module": 17,
      "topic": "decision",
      "stem": "A two-sided interval excludes its matching null value at 95% confidence. What significance level matches that decision?",
      "options": [
        "0.05",
        "0.95",
        "0.025 after treating the interval as one-sided",
        "0.50"
      ],
      "correct": 0,
      "why": "The interval has confidence 1−alpha. A two-sided 95% interval matches \\(\\alpha=0.05\\) for its associated procedure.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q095",
      "module": 17,
      "topic": "meaning",
      "stem": "Repeated intervals from one fixed population have different endpoints. Which quantity remains the same across the repeated samples?",
      "options": [
        "The population parameter being estimated.",
        "Every sample mean.",
        "Every sample standard error.",
        "The lower endpoint of every interval."
      ],
      "correct": 0,
      "why": "The parameter is a fixed population quantity. Sample statistics and the constructed interval endpoints can vary.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q096",
      "module": 17,
      "topic": "oneProportion",
      "stem": "A proportion interval is 0.28 to 0.36. How is the same interval expressed as percentages?",
      "options": [
        "28% to 36%.",
        "0.28% to 0.36%.",
        "280% to 360%.",
        "28 to 36 events regardless of sample size."
      ],
      "correct": 0,
      "why": "Multiplying each proportion by 100 converts it to a percentage. An event count additionally requires the relevant sample size.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q097",
      "module": 17,
      "topic": "twoMeans",
      "stem": "Which assumptions accompany the Session 17 pooled two-mean calculation?",
      "options": [
        "Independent observations from Normal populations with a common variance.",
        "A paired design is required and the two group sizes must always be identical.",
        "The population variances must be known exactly before observing the samples.",
        "Every individual response must equal the sample mean."
      ],
      "correct": 0,
      "why": "The lecture extends the pooled two-sample t framework. Equal group size is a shortcut condition, not the full method’s requirement.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q098",
      "module": 17,
      "topic": "meaning",
      "stem": "What happens to the t critical value as df becomes very large for a fixed 95% two-sided interval?",
      "options": [
        "It approaches the Normal cutoff near 1.96.",
        "It approaches zero.",
        "It approaches the sample SD.",
        "It becomes a probability greater than one."
      ],
      "correct": 0,
      "why": "The infinite-df row of the t table corresponds to the standard Normal cutoff used for the proportion intervals.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q099",
      "module": 17,
      "topic": "decision",
      "stem": "A two-sided CI includes a specified null mean. What can be concluded from the lecture’s rule?",
      "options": [
        "The matching test does not reject that null; exact equality has not been proven.",
        "The population mean is known to equal the null with certainty.",
        "The sample has zero variability.",
        "Every possible confidence level must include the same null value."
      ],
      "correct": 0,
      "why": "Inclusion means the procedure does not reject the reference at that level. Different confidence levels can produce different widths.",
      "case": null,
      "equations": []
    },
    {
      "id": "m2-s17-q100",
      "module": 17,
      "topic": "oneProportion",
      "stem": "A CI for p is centered at the observed p-hat. Which quantity is used inside its estimated variance in Session 17?",
      "options": [
        "The observed sample proportion and its complement.",
        "The null reference alone, regardless of the observed sample.",
        "The event count without division by n.",
        "The confidence percentage treated as an event count."
      ],
      "correct": 0,
      "why": "The stated one-proportion interval uses \\[s_{\\hat p}=\\sqrt{\\hat p(1-\\hat p)/n}.\\] Its center and estimated SE both use the sample proportion.",
      "case": null,
      "equations": []
    }
  ],
  "syllabus": {
    "moduleI": {
      "title": "MODULE I",
      "sessions": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
      ],
      "midterm": "2026-10-19",
      "scope": "Completed first half; the archived midterm practice retains its original through-Session-13 scope and exclusions."
    },
    "moduleII": {
      "title": "MODULE II",
      "sessions": [
        {
          "id": 17,
          "date": "2026-10-21",
          "title": "Confidence intervals",
          "available": true
        },
        {
          "id": 18,
          "date": "2026-10-26",
          "title": "Simple linear regression",
          "available": false
        },
        {
          "id": 19,
          "date": "2026-10-28",
          "title": "Multiple linear regression and logistic regression",
          "available": false
        },
        {
          "id": 20,
          "date": "2026-11-02",
          "title": "Multiple treatments",
          "available": false
        },
        {
          "id": 21,
          "date": "2026-11-04",
          "title": "ANOVA for multiple treatments and McNemar’s test",
          "available": false
        },
        {
          "id": 22,
          "date": "2026-11-09",
          "title": "Machine learning · clustering",
          "available": false
        },
        {
          "id": 23,
          "date": "2026-11-16",
          "title": "Machine learning · decision trees",
          "available": false
        },
        {
          "id": 24,
          "date": "2026-11-18",
          "title": "Nonparametric methods",
          "available": false
        },
        {
          "id": 25,
          "date": "2026-11-23",
          "title": "Nonparametric methods",
          "available": false
        },
        {
          "id": 26,
          "date": "2026-11-30",
          "title": "Time-to-event / survival analysis",
          "available": false
        },
        {
          "id": 27,
          "date": "2026-12-02",
          "title": "Final exam review",
          "available": false
        }
      ]
    },
    "finalDateConflict": {
      "page1": "December 15, 8:00–9:30 AM",
      "page4": "December 14, 8:00–9:30 AM",
      "resolution": "Unconfirmed; the syllabus gives two dates."
    },
    "finalCumulative": "The syllabus does not explicitly state whether the final is cumulative.",
    "homework": [
      {
        "number": 3,
        "assigned": "2026-10-21",
        "due": "2026-11-13"
      },
      {
        "number": 4,
        "assigned": "2026-11-16",
        "due": "2026-12-04"
      }
    ],
    "grading": [
      [
        "Midterm",
        25
      ],
      [
        "Final",
        35
      ],
      [
        "Homework",
        20
      ],
      [
        "Lecture exercises",
        10
      ],
      [
        "Discussion logs",
        10
      ]
    ]
  },
  "sourceNotes": [
    {
      "page": 17,
      "text": "Worked CI cutoffs are read from the supplied two-tailed t table. For 1698 df, the infinity row gives 1.9600 as an explicitly labeled large-df approximation; the finite conservative row 200 gives 1.972. No mandatory missing-row convention is specified in the uploaded lecture or review."
    },
    {
      "page": 12,
      "text": "The aspirin slide uses rounded group proportions and SE. Its 0.11–0.69 result is reproduced with that rounding; a second worked example retains the original fractions. The subtraction is an absolute probability difference, expressed in percentage points, not a relative-risk reduction."
    },
    {
      "page": 17,
      "text": "The drug row prints the placebo SD subscript again. The 3.9 mg/dL SD is treated as belonging to the drug row, consistent with the group labels and question."
    },
    {
      "page": 11,
      "text": "The two-proportion interval follows the lecture’s pooled-proportion standard-error convention."
    }
  ],
  "sources": [
    {
      "path": "sources/syllabus.pdf",
      "sha256": "89a35d4d6eff29af90b97375014d057b0ce694418e655ade5ffe00f0e51b5adb"
    },
    {
      "path": "sources/session17.pdf",
      "sha256": "2bdbc2fb5964604b16a39f0eeb32bb73a82780a6c9415d0a88e9e361f8e3df4b"
    },
    {
      "path": "sources/session17.pptx",
      "sha256": "8410e270d107e43cbc195898c6e21f1df8b48b253c93f5b1d01297c71def5b7a"
    },
    {
      "path": "sources/tables/t_table.pdf",
      "sha256": "5d4f04d50dd88767f865061a545c81c1a9d52bd36c305de7150b73392f56a54f"
    },
    {
      "path": "sources/tables/F_table.pdf",
      "sha256": "32f731da2d7bb4e6576395a5271d4303f06cd84037b8793769dc52c07f983bb7"
    },
    {
      "path": "sources/tables/z_table_NormalDist.pdf",
      "sha256": "7233a69e4133358f1f034abe4f447ef6e0e0c0dd958ef44a16daf1b75ad50770"
    },
    {
      "path": "sources/tables/Chi_Squared_Table1.pdf",
      "sha256": "de022efffa1fc7de5d98b8b9e5e4bdd05df63fc7dce77487040c11c9cab3f04e"
    },
    {
      "path": "sources/tables/Chi_Squared_Table2.pdf",
      "sha256": "00b66e7e550f7e938bd49e976ee4f730bddb5b9b71b9b9f5330a77d0352f3acd"
    },
    {
      "path": "sources/tables/Friedman_ChiSquared_Table.pdf",
      "sha256": "50bea319f1256c61b325e26dfb5d7abe536e5501f8f65424ccef0f80290925ce"
    },
    {
      "path": "sources/tables/WilcoxonW_Table.pdf",
      "sha256": "d5c6524e1d25014c51046bfe247a7ba77b72d125ef510aedc9a7e59ad944db19"
    },
    {
      "path": "sources/tables/MannWhitney_RankSumT_Table.pdf",
      "sha256": "2271f705ddbbacefefa6e50faed443f46b37aabd58e29637087c610339cb8533"
    }
  ]
};
