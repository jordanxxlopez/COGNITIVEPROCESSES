"""Exam-relevant additions, without rewriting the original Version 3 blocks.

Sources and reasons are kept in the coverage report, not on the printed pages.
All numerical exercises use the existing course examples and supplied tables.
"""

def add_supplements(blocks, sheets):
    def p(s): return '<p>'+s+'</p>'
    def eq(s): return r'\['+s+r'\]'
    additions = [
        ('answer-frame', 0, 0, 'Write the answer: setup → calculation → conclusion',
         p(r'<b>1. Name the method</b> using the outcome and number of groups. <b>2. State \(H_0\)</b> about the <b>population</b> means or proportions, with the alternative that the question asks for.')+
         p(r'<b>3. Copy the matching equation;</b> replace each symbol with its labeled given number. Show the statistic and degrees of freedom. <b>4. Compare</b> its magnitude with the correct table cutoff, or compare the supplied \(p\) with \(\alpha\) (the significance level).')+
         p(r'<b>5. Finish:</b> “At [level], [test] [supports / does not establish] a difference in population [mean / outcome proportions] between [named groups].” For adjusted pairs, name only the pairs that pass the family correction.'),
         ['choose','hypothesis'], ['session15.pdf:32–64','midterm-review-transcript.txt'],
         'Provides a fill-in answer sequence, population wording, and contextual conclusion.'),
        ('quartile-work', 1, 1, 'Normal quartiles → put z back into measurement units',
         p(r'<b>For the glucose example:</b> \(x_p=\mu+z_p\sigma\). A lower quartile uses a negative z; an upper quartile uses a positive z. Use the same mean and SD in both:')+
         eq(r'Q_1=95+(-.67449)(8.7)=89.1319')+
         eq(r'Q_3=95+(.67449)(8.7)=100.8681')+
         eq(r'\mathrm{IQR}=Q_3-Q_1=100.8681-89.1319=11.7362')+
         p('These are Normal population quartiles. For a percentile of a supplied data list, sort the observations and use the sample-rank method instead.'),
         ['normalquant','percentile'], ['hw1.pdf:3','session5.pdf:9'],
         'Adds the missing numerical substitution between the existing z quartiles and their answers.'),
        ('central-range', 1, 2, '“Middle 95%” → leave 2.5% in each tail',
         eq(r'\text{one tail}=\frac{1-.95}{2}=.025')+
         eq(r'\Phi(c)=1-.025=.975\quad\Rightarrow\quad c=1.96')+
         p(r'<b>Standard Normal:</b> \(-1.96<Z<1.96\). <b>Individual glucose:</b> convert each z endpoint back using \(x=\mu+z\sigma\):')+
         eq(r'x_L=95-1.96(8.7)=77.948')+
         eq(r'x_U=95+1.96(8.7)=112.052')+
         p(r'About 95% of individual glucose values lie between those limits. If the question instead asks for the distribution of a <b>sample average</b>, its spread is \(\sigma/\sqrt n\); replace \(\sigma\) with that SEM before converting the endpoints.'),
         ['normalquant','sampling'], ['session5.pdf:9','hw1.pdf:3','session15.pdf:23–29'],
         'Works the central-range question through tail allocation and both endpoints.'),
        ('t-output-work', 2, 0, 'The same two mean tests, read as supplied output',
         p('For the worked examples above, a two-sided output would report approximately:')+
         eq(r'\begin{array}{l|rrr}\text{test}&t&\nu&p\\\text{student HR}&2.58630&4&.06092\\\text{cognitive score}&-3.08627&47&.003393\end{array}')+
         eq(r'p_{\text{two-sided}}=2P(T_\nu\ge |t|)')+
         p(r'<b>At .05:</b> HR: \(.06092>.05\), so <b>do not reject</b> equal-to-72 population mean. Scores: \(.003393<.05\), so <b>reject</b> equal population means. Use the supplied p directly if it is printed.')+
         p('The negative score statistic means the first listed sample mean is lower than the second. It does not change the two-sided decision. Read the stated alternative before choosing a tail.'),
         ['rcode','onet','pooledt'], ['session8.pdf:22','hw2.pdf:1','session15.pdf:63'],
         'Derives output fields from the already worked course values; these are calculated examples, not a transcription of unseen output.'),
        ('residual-work', 2, 1, 'Output gives residual standard error instead of Mean Sq?',
         p(r'The nitric-oxide output also prints <b>residual standard error = 8.174069</b> and <b>residual df = 19</b>. Square the error to recover the variance for pairwise calculations:')+
         eq(r's_{\mathrm{wit}}^2=(\text{residual standard error})^2')+
         eq(r's_{\mathrm{wit}}^2=(8.174069)^2=66.8154\approx66.8')+
         p(r'Use \(66.8\) with the displayed rounded Mean Sq table, and residual df \(19\). The numerator df \(2\) belongs to the overall F test; it is not the pairwise t-test df.'),
         ['rcode','posthoc','anova'], ['session7.pdf:39'],
         'Shows the conversion between the two actual lecture output formats.'),
        ('t-p-range', 2, 2, 'If asked for a p-value range from the t table',
         p(r'<b>HR example:</b> row \(\nu=4\) gives \(2.132\) under total two-tail .10, and \(2.776\) under .05. Locate the observed magnitude between them:')+
         eq(r't_{.10,4}=2.132<|2.58630|<2.776=t_{.05,4}')+
         eq(r'.05<p_{\text{two-sided}}<.10')+
         p('A larger statistic leaves a smaller tail probability. These column headings already count both tails; do not double or halve the resulting p range.'),
         ['onet','rcode'], ['tables/t_table.pdf:1','session8.pdf:22'],
         'Makes the table-to-p-range procedure concrete without needing a calculator command.'),
        ('same-counts-check', 3, 0, 'Same 2×2 counts: check the two calculations agree',
         p('With the same two-outcome counts and the same continuity correction, the corrected chi-square equals the square of the corrected z statistic:')+
         eq(r'\chi_Y^2=z_Y^2\approx(2.36161)^2\approx5.5772')+
         p('For the aspirin/placebo example, both methods reject at .05. Use whichever test the question requests. For a larger table, use the contingency chi-square procedure instead of this two-proportion shortcut.'),
         ['yates','chi','zprop'], ['session11.pdf:19–20','session12.pdf:9–11'],
         'Makes an algebraic check between the two existing worked methods for the same source table; verified independently.'),
        ('rounded-proportions', 3, 1, 'Rounded proportions → pool the actual event count',
         p(r'<b>Dioxin:</b> female proportions .565, .455; group sizes \(186,220\); <b>205 females total</b>. Pool that count:')+
         eq(r'\hat p=\frac{m_1+m_2}{n_1+n_2}=\frac{205}{406}=.504926')+
         eq(r'\mathrm{SE}=\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}')+
         eq(r'=\sqrt{.504926(.495074)(1/186+1/220)}=.049802')+
         eq(r'|z_Y|=\frac{|.565-.455|-\tfrac12(1/186+1/220)}{.049802}')+
         eq(r'\approx2.10915>1.960\quad\Rightarrow\quad\text{reject }H_0')+
         p('At .05, female-birth proportions differ between father-only and mother-only exposure populations. Rounded proportions need not reconstruct exact event counts.'),
         ['zprop','yates'], ['hw2.pdf:2'],
         'Addresses the actual homework format with rounded proportions and an exact combined event count.'),
        ('folate-risk', 3, 2, 'Small event risks: use “Yes NTD” as the event',
         p('<b>Folate homework:</b> folate 471 without NTD and 4 with NTD; no folate 498 without and 27 with. Add both outcomes for each risk denominator:')+
         eq(r'r_T=\frac4{471+4}=.008421,\quad r_C=\frac{27}{498+27}=.051429')+
         eq(r'\mathrm{RR}=\frac{r_T}{r_C}=\frac{4/475}{27/525}=.163743')+
         p('The folate group’s NTD risk is about .164 times the no-folate group’s risk. Use events divided by <b>everyone in that group</b>; dividing events by non-events would give odds instead.'),
         ['risk','odds'], ['hw2.pdf:2','session13.pdf:4–10'],
         'Applies event/risk denominators to the other supplied homework table without repeating the original NNT examples.'),
    ]
    report=[]
    for key, side, column, title, html, topics, sources, purpose in additions:
        assert key not in blocks
        blocks[key]={'title':title,'html':html,'topics':topics}
        sheets[side]['columns'][column].append(key)
        report.append(dict(block=key,side=side+1,column=column+1,sources=sources,purpose=purpose))
    return report
