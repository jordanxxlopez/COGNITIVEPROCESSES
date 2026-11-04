"""Reproducible review-relevance ranking, without treating scores as exam odds."""
from collections import Counter
import math
import re

STOP = set('a an the and or of to in on at for from by with as is are was were be been being it its this that these those i we you your our their they them he his she her what which how why when where who will would could should can do does did have has had if then than into about all each any some not no yes describe explain imagine give following between same different basic way ways'.split())


def tokens(text):
    return [word for word in re.findall(r"[a-z]+(?:'[a-z]+)?|\d+(?:\.\d+)?", text.lower()) if word not in STOP]


def rank_questions(questions, model):
    """Return metadata only. Source prompts and explanations remain unchanged."""
    reviews = model['reviewItems']
    assert sorted(item['number'] for item in reviews) == list(range(1, 21))
    texts = [item['prompt'] for item in reviews] + [q['prompt'] + ' ' + q['answer'] for q in questions]
    counts = [Counter(tokens(text)) for text in texts]
    documents = Counter(word for count in counts for word in count)
    idf = {word: math.log((1 + len(counts)) / (1 + frequency)) + 1 for word, frequency in documents.items()}

    def vector(count):
        result = {word: (1 + math.log(frequency)) * idf[word] for word, frequency in count.items()}
        norm = math.sqrt(sum(value * value for value in result.values())) or 1
        return {word: value / norm for word, value in result.items()}

    vectors = [vector(count) for count in counts]
    weights = model['patternWeights']
    max_weight = max(weights.values()) or 1
    result = []
    for question, vec in zip(questions, vectors[len(reviews):]):
        matches = sorted(((sum(value * vec.get(word, 0) for word, value in rv.items()), item['number']) for rv, item in zip(vectors, reviews)), reverse=True)
        supported = question.get('examReviewRefs', [])
        patterns = question.get('patterns', [question['pattern']] if question.get('pattern') else [])
        if not patterns and matches[0][0] > 0:
            patterns = reviews[next(i for i, item in enumerate(reviews) if item['number'] == matches[0][1])]['patterns']
        reasoning = sum(weights.get(pattern, 0) for pattern in patterns) / (max(1, len(patterns)) * max_weight)
        lexical = matches[0][0]
        priority = round(1 + lexical + .5 * reasoning, 6)
        result.append({'id': question['id'], 'moduleId': question['moduleId'], 'type': question['type'], 'priority': priority,
                       'lexicalSimilarity': round(lexical, 6), 'reasoningPatternWeight': round(reasoning, 6),
                       'closestReviewItems': [{'number': number, 'similarity': round(score, 6)} for score, number in matches[:3]],
                       'explicitReviewRefs': supported})
    return result
