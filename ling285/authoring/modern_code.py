"""Section 12. Explain the source program's jobs without demanding syntax memorization."""
CODE=[
 dict(id='modern-code-definition',title='Define the path that the formant values will follow.',collection='lecture14',pages=[25],concept='sequential',sourcePage=25,
  paragraphs=[
   '**The imports make existing PyTorch operations available**, while the Sequential expression specifies the network that will use them. Each Linear line states how many values arrive and how many activations the layer produces.',
   'The first processing group receives two formant measurements and produces three values. The following groups produce two, four and finally five, with each group receiving exactly what the previous group supplies.',
   '**This block defines the architecture rather than performing training**. The bias=False setting keeps these particular transformations to weighted sums without additional bias constants.'],
  question='What two dimension changes insert a three-neuron group before the output?',
  answer='Replace the four-to-five connection with **four-to-three**, then add **three-to-five**. The five vowel categories remain the output.'),
 dict(id='modern-code-step',title='Separate prediction, error calculation and a parameter update.',collection='lecture15',pages=[10],also=[('lecture16',11)],concept='training-code',sourcePage=10,
  paragraphs=[
   '**X contains the input measurements and Y contains their paired targets**. The forward call net(X) produces predictions that the loss function compares with those targets.',
   '**zero_grad clears stored gradients**, loss.backward calculates the current gradients, and step applies the optimizer’s correction. These are related operations with different jobs.',
   'The learning-rate setting controls the size of the correction. The model can be read by recognizing those jobs without reproducing the program’s punctuation from memory.'],
  question='Does loss.backward change the weights by itself?',
  answer='It calculates the gradients. **The optimizer step applies the weight changes** using those gradients and the learning rate.'),
 dict(id='modern-code-sigmoid',title='Insert a nonlinear response between the weighted combinations.',collection='lecture15',pages=[13],also=[('lecture16',14)],concept='sigmoid-flow',sourcePage=13,
  paragraphs=[
   '**The added Sigmoid operations transform hidden activations** after their Linear operations. The next processing layer receives the transformed response rather than the original weighted sum.',
   'The final category stage still has to produce the intended number of outputs. Inserting a hidden nonlinearity does not create another measured input or another answer category.',
   '**A changed processing rule requires recomputing later activations**. It is different from changing the weights through a training update.'],
  question='Why can the output probabilities change with the same original F1 and F2?',
  answer='The hidden transformation changes the values passed onward. **The downstream computation therefore receives different evidence**, even though the measurements stayed fixed.'),
 dict(id='modern-code-loop',title='Repeat the same learning operations and measure category decisions.',collection='lecture16',pages=[15],concept='accuracy',sourcePage=15,
  paragraphs=[
   '**The loop repeats forward prediction, loss calculation, backpropagation and an optimizer update**. The accuracy calculation then compares the selected category with the known category for each example.',
   'Rescaling the input formants changes their numerical units before they reach the model. It does not change how many measured features or output categories the architecture contains.',
   'The displayed curve reports **training accuracy**, so it evaluates the supplied training examples. The slide identifies its plotted curve as a NumPy reference run, while the printed program requests the corresponding PyTorch computation.'],
  question='What does an accuracy plateau establish?',
  answer='The measured proportion of correct training decisions is no longer improving in that run. **A plateau does not mean every prediction is correct**.'),
 dict(id='modern-code-restarts',title='Compare repeated training runs with different initial weights.',collection='lecture16',pages=[16],concept='initialization',sourcePage=16,
  paragraphs=[
   '**The repeated-run comparison keeps the task and architecture while changing the starting weights**. Each initialization can produce a different early prediction and a different learning path.',
   'The displayed curves all reach **44.95 percent training accuracy** despite their different routes. Their agreement separates the final outcome from the variability along the way.',
   'The original training block remains available for inspection. The important conceptual change across runs is initialization, rather than memorizing the numerical identifiers used for the random starts.'],
  question='Does a different learning curve necessarily imply a different final accuracy?',
  answer='No. **Different paths can converge to the same measured accuracy**, as the supplied repeated-run comparison does.')
]

def source_code(root,collection,page):
    """Read native text, including indentation, rather than copying an old authored code card."""
    from pptx import Presentation
    import ast
    slide=Presentation(str(root/'sources'/f'{collection}.pptx')).slides[page-1]
    shapes=[s for s in slide.shapes if getattr(s,'text','').strip()]
    anchor=next(s for s in shapes if s.text.startswith('import torch'))
    if '\nnet = ' in anchor.text:return anchor.text
    lines=[s.text for s in sorted(shapes,key=lambda s:(s.top,s.left)) if abs(s.left-anchor.left)<1000 and s.top>=anchor.top]
    # Source footers share the code's left margin but are not program statements.
    while lines:
        text='\n'.join(lines)
        try:ast.parse(text);return text
        except SyntaxError:lines.pop()
    raise ValueError(f'No complete native source code in {collection} p{page}')
