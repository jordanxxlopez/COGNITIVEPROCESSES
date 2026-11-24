"""Shared helpers for the Module I workspace aids (a01_intro.py ... a08_articles.py).

Each aids file names its topics, one question per teaching page, and its experiment cards, contrasts and
hard topics. Q&A answers and in-depth lines are taken from the reviewed Version 22 notes for the same page,
so every answer says only what the notes say. Scores are a study-priority heuristic, not a prediction of the exam.
"""


class Aids:
    def __init__(self, ID):
        self.ID = ID
        self.TOPICS = []      # (title, pages, remember)
        self.Q = {}           # page -> (question, score or None, note or None)
        self.RELATE = []      # (pages, question, answer, deep, score)
        self.CARDS = []
        self.CONTRASTS = []
        self.HARD = []

    def topic(self, title, pages, remember):
        self.TOPICS.append((title, pages, remember))

    def q(self, page, question, score=None, note=None):
        assert page not in self.Q, page
        self.Q[page] = (question, score, note)

    def relate(self, pages, question, answer, deep, score=7):
        self.RELATE.append((pages, question, answer, deep, score))

    def card(self, title, researcher, pages, aim, manipulated, measured, found, means, trap=None, blocks=None):
        self.CARDS.append(dict(title=title, researcher=researcher, pages=pages, aim=aim, manipulated=manipulated, measured=measured,
                               found=found, means=means, trap=trap, blocks=blocks))

    def contrast(self, title, pages, score, a, b, diff, example, watch):
        self.CONTRASTS.append(dict(title=title, pages=pages, score=score, a=dict(term=a[0], definition=a[1]),
                                   b=dict(term=b[0], definition=b[1]), diff=diff, example=example, watch=watch))

    def hard(self, title, pages, blocks):
        self.HARD.append(dict(title=title, pages=pages, blocks=[dict(text=t, children=list(c)) for t, c in blocks]))
