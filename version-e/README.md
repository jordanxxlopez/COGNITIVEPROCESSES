# Version E teaching notes

Seven standalone scripts follow the original slide order. Each line is `source page|paragraph||paragraph`. The scripts keep slide terminology close to its original wording, explain terms in context, and walk through course examples and experiments. Paragraphs teach the material rather than adding routine methodological cautions. Original, B, C, and D remain unchanged.

Select **Version E · teaching notes** in a collection’s Explanation version menu. The same script is available in teaching notes, Visual + transcript, and the expanded viewer. Personal notes and read progress remain shared across versions.

## Red core-review markers

The **Must know · core review** workspace gathers every red-marked section across collections 01–08. It uses the E teaching script for lectures and the concise teaching notes for articles and labs, with the same original visuals, personal-note keys, and read progress. It also provides a continuous expanded viewer of all core sections. Markers are visible in the collections regardless of transcript version.

The ranking retains the original 60% study-guide similarity, 25% direct quiz coverage weighted by existing question priorities, and 15% direct essentials-reference score. The question priorities come from the earlier guide-weighted model using six supplied example questions. The original top-40% lecture selection and all previously marked sections are preserved.

A coverage audit adds explicit slide references for every substantive topic in the supplied exam guide, all five assigned articles, and non-memory labs represented in the quiz bank. A fixed percentage no longer excludes a topic explicitly named in the guide. There are 158 core sections: 23, 21, 21, 23, 17, 16, 22, and 15 across collections 01–08. Collection 09 and the memory-only labs remain excluded from core exam review.

These are study priorities, not probabilities or verified predictions of the actual exam. The rest of the course material remains available in its existing collections.

`slide-priorities.json` records all scores, guide matches, question IDs, reasons for inclusion, and a 64-entry guide-coverage mapping. `slide-priority-model.py` reproduces the ranking with Python and python-docx:

```sh
python slide-priority-model.py --data data.json --guide exam-study-guide.docx --output slide-priorities.json
```

The data input uses the embedded study-data object from index.html. The guide input is the supplied Exam 1 study guide. No external exam dataset is used.
