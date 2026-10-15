## 1 | Describing a population, then learning from a sample
A population is the full group we want to describe. Its center tells us what a typical measurement looks like; its dispersion tells us how much the measurements differ. A Normal distribution adds a description of the overall shape.

Usually we cannot measure everyone, so we collect a sample. The sample mean estimates the population mean, while the standard error describes how much that estimated mean would move if we collected another sample.

The kind of measurement also matters. Height and blood pressure are numerical measurements, whereas categories label groups. The class survey connects these ideas to real student measurements before we start comparing groups.

## 2 | R and RStudio: the tools around the data
R performs statistical calculations. RStudio provides a workspace around R, including a place to write commands, inspect objects, view plots, and read help. Installing the interface and installing the calculation engine are separate tasks.

A working directory is the folder R uses to find input files and save output. Variables hold objects; vectors collect values; matrices and arrays arrange values into structured sets.

A data frame organizes observations into rows and variables into columns. Packages add functions, and loading a package makes its functions available during a session. These are tools for organizing the measurements we will analyze.

## 3 | Population mean and population spread
Each dot represents an individual's height. The Martian population is centered at 40 cm and the Venusian population at 15 cm. Those centers are the population means, written \(\mu\) (mu).

To obtain a mean, add all heights and divide by \(N\) (the number of individuals in the population). To describe spread, subtract the mean from each height, square those distances, and average the squares.

That average squared distance is \(\sigma^2\) (population variance). Its square root, \(\sigma\) (population standard deviation), returns spread to centimeters. The Martian heights have a larger absolute spread as well as a larger mean.

## 4 | What a Normal population looks like
A Normal distribution describes a symmetric, bell-shaped pattern of measurements. Measurements near the center are common, and measurements far from the center become less common in either direction.

The mean \(\mu\) locates the center. The standard deviation \(\sigma\) controls the width: a larger standard deviation spreads measurements farther from the mean without necessarily moving that mean.

Several inference methods in this course assume Normal populations. For now, connect the shape to these two quantities; probability calculations later turn areas under this curve into precise proportions of individuals.

## 5 | Reading positions on a Normal curve
Start at the mean: half the population lies below it and half above it. Moving one standard deviation to the right includes about 84% of the population below that cutoff; moving one to the left leaves about 16% below it.

The interval from one standard deviation below the mean to one above contains about 68% of measurements. Widening the interval to two standard deviations captures about 95%, and three captures nearly all of them.

A cutoff and an interval ask different questions. A cutoff includes everything to its left; an interval includes only the area between two boundaries. Draw those boundaries before deciding which proportion is needed.

## 6 | Symmetry, skewness, and tails
A Normal distribution is symmetric, but real measurements may form a lopsided pattern. Skewness describes that lack of symmetry: one side of the distribution extends differently from the other.

Kurtosis concerns the tails relative to a Normal distribution. Heavy tails put more probability into unusually distant measurements; light tails put less there.

Two data sets can have similar centers and spreads while having different shapes. Look at the distribution itself as well as its mean and standard deviation, especially when a later test assumes a Normal population.

## 7 | Estimating population quantities from a sample
A sample contains \(n\) measured individuals from a larger population. Its mean, \(\bar{x}\) (x-bar), is the total of those measurements divided by the number sampled.

Sample variance measures squared distances from that sample mean. Divide the sum of those squared distances by \(n-1\), then take the square root if you want the sample standard deviation \(s\).

Random sampling aims to avoid systematically favoring certain individuals. That matters because we use the sample's center and spread to estimate the population's center and spread, rather than describing only the people we happened to measure.

## 8 | Median, range, and quartiles
Put the observations in ascending order first. The median is the middle observation when the sample size is odd; when it is even, average the two middle observations.

The smallest and largest observations show the endpoints of the data. Percentiles locate positions within the ordered list, so the 25th and 75th percentiles identify the lower and upper boundaries of the middle half.

These summaries answer different questions from the mean and variance. The median identifies a central position in the ordered data, while percentile ranges describe how widely a specified portion of the data is spread.

## 9 | Finding a percentile between observations
A percentile may fall between two positions in the sorted data. The course's rank rule first locates that position using the requested percentile and the sample size.

The integer part of the rank identifies the lower observation. The fractional part tells you how far to move toward the next observation: a fraction near zero stays close to the lower value, while a fraction near one approaches the upper value.

Interpolation means taking that fraction of the gap and adding it to the lower observation. Keep the rank, the two selected data values, and the fractional distance separate so their roles stay clear.

## 10 | The 30th percentile of five measurements
The ordered measurements are 3, 7, 8, 9, and 14. A rank of 2.2 means the requested percentile sits between the second observation, 7, and the third observation, 8.

The decimal part is 0.2, so move one fifth of the way across the gap from 7 to 8. The gap is one unit, making the interpolated percentile 7.2.

The rank is a position, not the answer's measurement value. Reading 2.2 as the percentile itself would confuse the location in the list with the value found at that location.

## 11 | Histograms and the middle half of the data
A histogram groups nearby measurements into bins and counts how many fall in each bin. Taller bars indicate more observations in that measurement range, allowing the overall shape to become visible.

Quartiles divide the ordered data into four parts. The second quartile is the median, and the first and third quartiles bound the middle half of the observations.

The blood-pressure example subtracts the first quartile from the third to get an interquartile range of 16 mmHg. That describes the width of the central half, rather than the distance between the two most extreme measurements.

## 12 | Reading a box plot
The box extends from the first quartile to the third quartile, with a mark for the median inside. Its width along the measurement scale represents the interquartile range.

The whiskers extend outward according to the displayed convention, using boundaries based on 1.5 times the interquartile range and the available extremes. Observations beyond those boundaries may appear separately.

Read the median, box, and whiskers as different pieces of information. A long upper side suggests more extension toward large values, while a short box indicates that the middle half is tightly clustered.

## 13 | Reading a violin plot
A violin plot adds information about the distribution's shape to the quartile summary. Wider regions indicate measurement ranges where values are more concentrated; narrower regions indicate fewer values.

The central marks still locate the median and quartiles. The adjacent values use the interquartile-range convention shown alongside the plot, so the distribution outline and the central summary serve different purposes.

Follow the measurement axis to compare values, then look across the violin to compare concentration. This lets you see whether a broad-looking data set is evenly spread or contains a particularly dense cluster.

## 14 | A first check for a Normal pattern
Use the sample mean and sample standard deviation to mark positions on the data scale. If the observations resemble a Normal population, about two thirds should fall within one sample standard deviation of the sample mean.

About 95% should fall within two standard deviations. You can also count observations below a boundary and compare that proportion with the expected left-tail proportion.

This connects an observed data set to the familiar bell-curve pattern. The sample size affects how closely the observed proportions match; later Normal quantile plots provide another way to compare the whole pattern.

## 15 | Why different samples give different answers
The population height mean and standard deviation stay fixed, but the three random samples have different sample means and sample standard deviations. Each sample contains a different selection of individuals.

A sample with more tall individuals can have a mean above the population mean; another with more short individuals can have a mean below it. The variation comes from who was selected, even when the population has not changed.

Thus \(\bar{x}\) estimates \(\mu\), and \(s\) estimates \(\sigma\). We now need a way to describe how much those estimates fluctuate across repeated samples.

## 16 | A distribution made from sample means
Imagine repeatedly selecting ten individuals and calculating their average height. Each completed sample contributes one mean to this new distribution, rather than ten individual heights.

Some samples produce a slightly low average and others a slightly high average. Plotting those averages reveals how much a mean from a sample of this size tends to vary.

Keep the unit of observation clear: each point now stands for an entire sample's average. The width of this distribution describes uncertainty in estimating the population mean.

## 17 | Individual heights versus averages of ten heights
The height distribution describes variation from one individual to another. The distribution of averages of ten individuals is narrower because unusually high and low measurements partly balance during averaging.

Both distributions remain centered near the same population height. Averaging changes how much the result varies, rather than intentionally shifting its expected center.

This is why an average from several independent measurements is usually more stable than one measurement. The narrower curve belongs to sample means, so its standard deviation has a different meaning from the standard deviation of individual heights.

## 18 | The central limit theorem and standard error
The sample mean is itself a random variable: it changes whenever the selected sample changes. Its expected center is the population mean.

Its spread is the population standard deviation divided by the square root of the sample size. This spread is called the standard error of the mean, because it describes variation among sample means.

The central limit theorem explains why averages from sufficiently large independent samples become approximately Normal even when individual measurements are not. The course gives a sample-size guideline of 30; increasing sample size also makes those averages less scattered.

## 19 | Estimating standard error from one sample
We usually have one sample, rather than a whole distribution of repeated samples. Calculate its mean and standard deviation first, using the observations actually collected.

Replace the unknown population standard deviation in the standard-error expression with the sample standard deviation. Dividing \(s\) by the square root of \(n\) estimates the spread that repeated sample means would have.

The separate expression for uncertainty in the sample variance concerns a different estimate. Keep the target attached to each standard error: uncertainty in a mean and uncertainty in a variance are not interchangeable.

## 20 | Measurements, counts, and categories
Continuous numerical data can vary along a measurement scale, such as blood pressure or height. Discrete numerical data count separate outcomes, such as the number of tender joints or asthma episodes.

Categorical data label groups. Ordinal categories have a meaningful order, such as increasing cancer stage or pain severity; nominal categories have no natural ranking, such as causes of death.

Choose the description from what the variable means, rather than whether its labels happen to be numbers. A numbered disease stage remains an ordered category, whereas a count records how many events occurred.

## 21 | Classifying the student survey variables
The survey mixes measurements and group labels. Finger length, height, and heart rate record numerical quantities, while eye color, handedness, and pet preference identify categories.

Class level has an order, but the labels represent stages of education. That makes its interpretation different from measuring a distance or counting heartbeats during a fixed interval.

Think about one student's response in each column: what was actually observed, and what would a difference between two responses mean? That question determines which summaries and comparisons make sense.

## 22 | The class heart-rate histogram
This histogram describes the heart rates of the entire surveyed class, treated as the population for this example. The bars show how many students fall into each heart-rate range.

The population mean is about 72 beats per minute, and the standard deviation describes variation among individual students. The interquartile range instead describes the width occupied by the middle half of their heart rates.

Read shape and summary together. The mean locates the center, while the histogram reveals how the observations are arranged around it, including unusually low or high measurements.

## 23 | The class heart-rate box plot
The median heart rate is 70.5 beats per minute. The box extends from 61.5 to 80, so the central half of the class falls within that range.

The labeled minimum and maximum show how far the full set extends. Those extreme observations are different from the quartiles: only one observation may determine an extreme, whereas the box summarizes half the data.

A box plot compresses the class into a few positions on one scale. Use it to locate the center and spread without assuming that all heart rates inside the box occur equally often.

## 24 | The class heart-rate violin plot
The violin presents the same class heart rates with their distribution shape visible. Its outline shows where values cluster, while the central marks retain the median and quartiles.

The first and third quartiles still bound the middle half of the class. Changing from a box plot to a violin plot does not change the observations or their summary values.

Compare the width of the outline at different heart rates. A broad region means more students have values near that part of the scale, adding detail that a box alone cannot show.

## 25 | Matching a plot to the kind of data
The height and finger-length violin plots summarize numerical measurements. Their widths show concentration along a measurement scale, and their central marks locate typical values.

The eye-color display uses separate category bars. Those bars count membership in named groups rather than dividing a continuous measurement scale into neighboring intervals.

The height-versus-finger-length scatter plot uses one point per student and places two measurements on two axes. It lets us look for a relationship between measurements, rather than merely summarizing either measurement by itself.

## 26 | Dog-preferring and cat-preferring students
The two groups differ in size, so raw histogram counts need to be read with their group totals in mind. The dog-preferring group also has a wider heart-rate spread in these class data.

The group means are relatively close, while their standard deviations describe substantial differences among individuals within each group. A difference between two sample averages must therefore be considered alongside that background variation.

The paired histograms and violins show both center and shape. They set up the later question of whether a smaller sample from each group provides convincing evidence of a population difference.

## 27 | Turning a sample comparison into a statistical question
Now select five students from each pet-preference group and compare their average heart rates. The two averages will usually differ somewhat even if the underlying population means are equal.

A statistical test asks whether the observed difference is large relative to the sampling variation expected when there is no population difference. It connects what happened in the samples to a statement about the populations.

The target is the population mean heart rate in each group. We will use the sample means, their variability, and the sample sizes to decide how surprising the observed separation is under an equal-means assumption.
