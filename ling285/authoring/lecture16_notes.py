"""Hand-authored source-page teaching for the Lecture 16 weekly addition.

Lecture 16 repeats twelve Lecture 15 slides unchanged. Those pages reuse the
Lecture 15 teaching in every edition (REUSE), and only the new pages are
authored here. Page 8 differs from Lecture 15 page 7 only in XML serialization.
"""
TITLE='Neural Networks · Vowel data, training runs, and initialization'
# Lecture 16 page -> identical Lecture 15 page.
REUSE={2:2,3:3,4:4,6:5,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:13}
PAGES={
1:('Neural Networks','title',[],[]),
5:('Vowel formants overlap across five categories','concept',[
'The scatterplot shows every measurement in the vowel data, **525 observations** with **105 tokens of each vowel**. Each dot is one recorded vowel. **F1** runs along the horizontal axis and **F2** along the vertical axis, both in hertz. The color says which word the recording belongs to, so the plot shows the same kind of input the network receives, two formant numbers, together with the correct answer for each one.',
'The five categories match the network’s five outputs. Red is **i (dean)**, magenta is **ae (Dan)**, blue is **u (dune)**, cyan is **a (Don)**, and green is **schwa (done)**. Each category forms a cloud rather than a single point, because the same vowel comes out with different formants from token to token. Nothing was removed from the data, so the occasional dot far from its cloud stays in the plot.',
'Some vowels are easy to pick out. The red **i** tokens sit high on the F2 axis, mostly above about 2000 Hz, with a low F1. The magenta **ae** tokens spread toward high F1 values, out past 800 Hz. Those two clouds are separated from most of the others by where they fall on one or both axes.',
'The other three overlap heavily. The blue **u**, cyan **a**, and green **schwa** tokens crowd into the lower middle of the plot, roughly between 300 and 800 Hz in F1 and between 800 and 1600 Hz in F2. A point in that region could belong to any of the three. Two formant numbers alone do not separate these vowels cleanly.',
'This overlap matters for every network trained on these data. A classifier sees only F1 and F2, so tokens that sit in the same place on the plot look the same to it, whatever their true label. The overlap sets a limit on how many tokens any decision rule based on these two numbers can label correctly, which helps explain why networks trained on these data do not come close to perfect accuracy.'
],['525 tokens','F1 versus F2','five vowel clouds','category overlap','limits on accuracy']),
6:None,
15:('One initialization · training the linear network for 2,000 updates','concept',[
'The code trains the same **2 → 3 → 2 → 4 → 5** network on the vowel data. Every layer is **nn.Linear with bias=False**, and there are no activations between them, so the network is the all-linear one from the earlier forward-propagation example. **torch.manual_seed(0)** fixes the random starting weights, so the run starts from one particular **initialization**. The formants are divided by 1000, converting hertz to kilohertz, which keeps the input numbers small.',
'The targets are one-hot rows, and **argmax(1)** turns each row into the number of its correct class for checking accuracy. The loss is **CrossEntropyLoss**, and the optimizer is plain **SGD** with a **learning rate of 0.1**. The loop runs **2,000 epochs**. In each one it clears old gradients, computes the loss for all the examples at once, backpropagates, and takes one step, so every epoch is one **full-batch update**.',
'After each update, the code measures accuracy without computing gradients. For each token the largest of the five scores is the network’s answer, and accuracy is the percentage of tokens where that answer matches the correct class. These are the same **525 training examples** the network learns from, so this is **training accuracy**, not a test on new recordings.',
'The curve starts at about **20%**, which is what labeling everything as one of five equally common vowels would give. It stays flat for about the first 200 updates, then climbs quickly into the 40s. Near update 390 it drops sharply back toward 20% for a moment, then recovers and settles near 45%. After about 450 updates it barely changes. The final training accuracy is **44.95%**, which is 236 of the 525 tokens.',
'The note under the code explains where the curve comes from. PyTorch was not available where the plot was made, so the plotted run comes from an equivalent **NumPy** implementation of the same network, loss, scaling, learning rate and number of updates. The code shows the PyTorch version of the procedure, and the curve shows what that procedure did when it was run.'
],['bias-free linear layers','Hz to kHz scaling','full-batch SGD epochs','training accuracy','20% starting level','44.95% final accuracy']),
16:('Ten initializations · different paths, the same final accuracy','concept',[
'The same training procedure is run ten times with **seeds 0 through 9**. Each run builds a fresh model and a fresh SGD optimizer, so the only thing that changes from run to run is the **initialization**, the random starting weights. The data, the scaling, the loss, the learning rate and the 2,000 full-batch updates are identical.',
'Each colored line is one seed. All ten start near **20%** training accuracy. They differ in when they leave that starting level, some climbing within the first 100 updates and others staying flat for 200 or more. They also differ in their early ups and downs, including short drops back toward 20%, and in the highest accuracy they reach along the way, which is close to 47% for some runs.',
'Some runs settle within about 350 updates, while the slowest take about 1,000. After that the lines come together and overlap. **All ten finish at 44.95%** training accuracy. Different starting weights send the network down different paths, but every path ends at the same level of performance on these data.',
'The shared final value says that starting the network from a different place did not change how well it could do. Running more seeds or picking the best one would not raise the final accuracy here. The limit comes from the network and the data it is given, the same overlapping vowel clouds, rather than from bad luck in the starting weights.',
'The note at the bottom repeats that the curves are executed **NumPy** reference runs. Matching seed numbers in NumPy and PyTorch do not produce the same starting weights, so a PyTorch run with seed 3 would not trace exactly the same line as the plotted seed 3. The overall pattern, varied early paths and a common end point, is what the runs show.'
],['ten seeds','initialization','different learning paths','shared 44.95% ceiling','NumPy reference runs']),
}
del PAGES[6]
ORIGINAL={
5:['The plot shows all **525** vowel tokens, **105** of each vowel, with **F1** on the horizontal axis and **F2** on the vertical axis in hertz. Colors mark **i (dean)**, **ae (Dan)**, **u (dune)**, **a (Don)** and **schwa (done)**.', 'Each vowel forms a cloud of tokens. **i** stands out with a high F2 and **ae** with a high F1, but **u**, **a** and **schwa** overlap heavily in the lower middle. Tokens in the same place look the same to a classifier that sees only F1 and F2.'],
15:['The code trains the bias-free, all-linear **2 → 3 → 2 → 4 → 5** network with seed 0. Formants are divided by 1000, the loss is **CrossEntropyLoss**, and plain **SGD** with learning rate **0.1** takes **2,000 full-batch updates**. After each update, accuracy is the percentage of the **525** training tokens whose largest score is the correct class.', 'Training accuracy starts near **20%**, jumps into the 40s after about 200 updates, dips once, and settles at **44.95%**. The plotted run comes from an equivalent **NumPy** implementation, because PyTorch was unavailable where the curve was made.'],
16:['The same training is repeated with **seeds 0 through 9**, each with a fresh model and optimizer. Only the starting weights change.', 'The runs leave the 20% starting level at different times and take different early paths, but they converge and **all ten finish at 44.95%**. Changing the initialization did not change the final training accuracy. The curves are NumPy reference runs, so equal seed numbers do not mean equal PyTorch weights.'],
}
ISSUES={
5:['The scatterplot and the training runs use 525 tokens, while the training-matrix and PyTorch pages label the matrices 110 × 2 and 110 × 5. Both counts are retained as shown.'],
15:['The curve comes from a NumPy reference implementation because PyTorch was unavailable when the slide was made, as the slide states. Accuracy is training accuracy on the same 525 tokens, not a held-out estimate.'],
16:['The ten curves are NumPy reference runs. Matching seed numbers do not give matching PyTorch weights, as the slide states.'],
}
