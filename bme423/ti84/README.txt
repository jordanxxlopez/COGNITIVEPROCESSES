BME423 -- TI-84 Plus CE / TI-84 Plus CE Python
ANSWER FIRST, WITH THE WORK BELOW

Use TI-BASIC, already built into your calculator. Do not open the Python app.
These .8xp files run from the calculator's PRGM button.

TRANSFER
1. Extract this ZIP on a computer.
2. Install TI Connect CE from Texas Instruments:
   https://education.ti.com/en/products/computer-software/ti-connect-ce-sw
3. Connect the TI-84 Plus CE Python by USB.
4. Open Calculator Explorer. Drag the .8xp files from the programs folder into
   TI Connect CE; select your calculator and send them to RAM.
5. Calculator: PRGM -> EXEC -> choose BMONE -> ENTER -> ENTER.
6. Type the requested number, then ENTER. Negative numbers use the (-) key.

The BME423 program is an optional menu. It needs the calculation programs
installed too. All other programs run independently; there are no helpers to
install. Send only the programs you need if calculator RAM is tight. Unused
programs can be archived. The plain .txt files are source for editing, not
Python files and not what you send to the calculator.

ON EACH RESULT SCREEN
The answer appears first, followed by equations and intermediate values.
ENTER = next page of work. CLEAR = end immediately. There is no pause after
each individual arithmetic operation. The CE screen is 26 columns by 10 rows.
Displayed numbers use six significant figures; calculations retain full
calculator precision. Small test p values are labeled P<0.000001.

QUICK TRANSFER CHECK
BMONE: mean 76.8; sample SD 4.15; n=5; reference 72; alpha .05.
Expect t about 2.58630, df=4, and DO NOT REJECT H0.
BMZ: events1=18, total1=25, events2=6, total2=19, alpha .05.
Expect corrected |z| about 2.36161.

WHICH PROGRAM?
BME423   Optional chooser menu.
BMDESC   Raw data: sample/population mean, variance, SD, and SEM.
BMPCTL   Sorted percentile rule, median, quartiles, IQR, range.
BMSEM    Given individual SD and n: SEM and variance of the mean.
BMSECH   Old SEM and two sample sizes: new SEM.
BMSEVAR  Normal setting: SE of the sample variance (different from SEM).
BMDISC   Discrete probability table: validity, mean, second moment, variance, CDF.
BMDCDF   Discrete interval with included/excluded endpoint choices.
BMMASS   Probabilities c times weights: find c and each normalized mass.
BMCOIN   Exactly k heads in n independent FAIR coin tosses.
BMEVENT  P(first)*P(second given first); update the second chance when dependent.
BMLINE   Independent X,Y: mean/variance of aX+bY+c (enter variances, not SDs).
BMSHIFT  Y=a+bX: mean first; optional variance/SD. CLEAR ends when only a mean
         was requested. Use this for expectations such as E[2X+1].
BMUNIF   Uniform(a,b): interval probability, density height, mean, variance.
BMCONST  f(x)=c(a+bx) on a known interval: find c.
BMEND    f(x)=a+bx on [0,c], a,b nonnegative: find unknown upper endpoint c.
BMPDF    Valid linear density a+bx: CDF, interval, mean, second moment, variance,
         median. Enter full-precision support endpoints.
BMPIECE  Two valid linear pieces, such as x on [0,1] and 2-x on [1,2].
BMNORM   Individual Normal left/between/right probabilities and z scores.
BMINVN   Normal percentile/cutoff from LEFT-tail probability.
BMSE     Normal/CLT sample-mean probabilities, using population SD/sqrt(n).
BMONE    One-sample, two-sided t test against a fixed reference.
BMTWO    Two independent Normal groups, equal variances: pooled two-sided t.
BMANOVA  Balanced one-way ANOVA: group means/SDs and common group size.
BMPAIR   Mean pair after ANOVA. First screen needs only means, sizes, within
         variance. ENTER continues to a Bonferroni test using ANOVA residual df.
BMBONF   Overall alpha and requested family size: per-pair level first.
         ENTER continues to a supplied t/chi-square statistic's adjusted test.
BMHOLM   Ordered tests from p values, t statistics, or chi-square statistics.
         Supply the common df for statistics and keep numeric pair IDs.
BMBIN    Event proportion, individual binary variance/SD, proportion SE.
BMZ      Two event proportions: pooled null SE and required Yates correction.
BMCHI2   2x2 observed counts: expected cells, Yates terms, chi-square test.
BMCHIR   Larger table: row/column totals, expected counts, uncorrected terms.
BMGOF    Observed category counts vs fixed probabilities, no fitted parameters.
BMRISK   Adverse-event counts: RR, ARR, RRR, NNT/NNH and whole-person rounding.
BMNNT    Same calculations from adverse-event risks already given as decimals.
BMOR     Labeled 2x2 table: odds ratio by diagonal products.
BMOUTPUT Read supplied p/t/F/chi-square output and make the significance decision.
BMCRIT   Two-sided z/t critical values, or upper-tail F/chi-square critical values.

LABELS AND INPUTS
Use SD where requested, not variance. Alpha .05 means 5%, not 5.
For BMDESC/BMPCTL, enter one observation at a time when ITEM is displayed.
For discrete tables, enter each x and its probability; probabilities must sum 1.
BMPCTL uses the course rule R=1+p*(n-1)/100, p on a 0-to-100 scale.
BMEND's computed endpoint stays in T. In BMPDF's upper-endpoint prompt, use
ALPHA, then the key with T above it, instead of rounding and retyping it. The PDF must integrate to 1.
BMPIECE asks first A,B,LOW,SPLIT, then second A,B,HIGH; f=A+B*x in each piece.
CDFs include the cutoff. BMDCDF asks explicitly about both interval endpoints.
For a Normal percentile, enter LEFT probability; convert a given right tail first.
For a Normal interval with an infinite endpoint, enter -1E99 or 1E99 using the
calculator EE key (2nd comma); use (-) for a negative sign.
For ANOVA, m=groups and n=subjects PER group. Group sizes must be equal.
After ANOVA, keep its within variance and residual df. Count only requested pairs.
Holm's pair ID can be 13 for G1 vs G3, or 1 for your first labeled comparison.
For t-statistic Holm inputs, use the same residual df for all requested pairs.
BMCHI2 expects rows group1/group2 and columns event/no event: enter a,b,c,d.
BMCHIR takes observed counts row by row, left to right.
BMOR uses the same labeled rows (a,b),(c,d) and computes ad/(bc).
Risk programs use the same ADVERSE event in treatment and control. Positive
ARR means benefit/NNT; higher treated risk means harm/NNH. Percentages must be
converted to 0-to-1 risks. Whole-person counts round upward.
The program's generic decision must be written in the question's context:
name the population means/proportions, treatments and outcome being compared.

SCOPE AND CHECKS
The program selection follows the professor's review and homework emphasis.
Those evidence scores are priorities, not probabilities of unseen exam questions.
Session 14 power and manual sum-of-squares ANOVA are outside this exam pack.
Programs do not answer conceptual design/classification questions by themselves.
Two-sided t tests use the course's independent Normal/equal-variance assumptions;
these programs do not substitute paired or Welch tests for that method.
Linear PDF programs cover the density forms taught here, not arbitrary symbolic
integration. Two-sided t and F/chi critical values use numeric CDF inversion.

The files are checked for valid .8xp format, checksums and CE Python compatibility.
Their decoded code is executed in a software test harness and compared against
the practice bank and independent numerical references. This is not a physical
calculator/ROM test. Run the quick transfer check before relying on the pack.

Program storage: approximately 62 KB plus the small working lists. These programs
use A-Z, theta, and scratch lists beginning BM; existing L1-L6 are untouched.
They set Float/Normal/Real modes.
