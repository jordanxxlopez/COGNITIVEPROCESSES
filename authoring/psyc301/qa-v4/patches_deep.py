from deep14 import D
from deep_rest import R
SET = {14: dict(D)}
for m, d in R.items():
    SET.setdefault(m, {}).update(d)
