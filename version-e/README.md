# Version E teaching notes

Seven standalone scripts follow the original slide order. Each line is `source page|paragraph||paragraph`. The scripts keep slide terminology close to its original wording, explain terms in context, and walk through course examples and experiments. Paragraphs teach the material rather than adding routine methodological cautions. Original, B, C, and D remain unchanged.

Select **Version E · teaching notes** in a collection’s Explanation version menu. The same script is available in teaching notes, Visual + transcript, and the expanded viewer. Personal notes and read progress remain shared across versions.

## Red core-review markers

**Must know · core review** marks the top 40% of sections within each lecture according to a transparent review-ranking heuristic. The score combines the closest study-guide topic (60%), direct quiz coverage weighted by the existing question-priority scores (25%), and a direct reference from the essentials guide (15%). This balances coverage across all seven lectures. The markers highlight study priorities; they do not represent probabilities or verified predictions of the actual exam. Unmarked sections remain part of the material.

`slide-priorities.json` records scores, matched guide topics, question IDs, and essentials references for all 246 sections. `slide-priority-model.py` reproduces the ranking using Python and python-docx:

```sh
python slide-priority-model.py --data data.json --guide exam-study-guide.docx --output slide-priorities.json
```

The data input uses the embedded study-data object from index.html. The guide input is the supplied Exam 1 study guide. No outside exam dataset or additional research sources are used.
