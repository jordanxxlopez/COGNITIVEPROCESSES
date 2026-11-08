#!/bin/bash
cd "$(dirname "$0")"
for s in L9-conrad-similar L9-conrad-dissimilar L9-wordlength-short L9-wordlength-long L9-suppression-without L9-suppression-with L9-brooks-sentence-point L9-brooks-sentence-speak L9-brooks-F L9-episodic-sentence L9-episodic-scrambled L9-vogel-relevant L9-vogel-distractors; do node render2.mjs $s; done
echo BATCH9_DONE
