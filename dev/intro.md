
This document is a meta-description of the project called https://fr.mywords.io

fr.mywords.io is a web application that allows english-speaking learners to read french books
and learn french extremely effectively.

Every page is tokenized into sentences which is further tokenized into words.
Crucially, when user clicks on a word, a few things happen:
- The word and the context sentence are both sent to an LLM, which derives the precise in-context meaning of the word, both in English and French. This is the WIC (word-in-context) feature. This replaces the traditional dictionary lookup, which is often not helpful because it doesn't provide the meaning of the word in the context of the sentence.
- The French meaning of the word is immediately displayed to the user, along with the aforementioned English meaning.
- The sentence gets reverse-indexed in the database, so that the user can search for all contexts in which a word is used. This feature implements the principle of "You shall know a word by the company it keeps."
- The word gets added to the user's personal notebook, which is a list of words that the user has encountered and wants to know more about.
- The user can choose to add the sentence to their personal notebook, which is a list of sentences that the user has encountered and wants to know more about.


Available books are:
Madame Bovary-Flaubert
Psychologie des Foules-Le Bon
Le Père Milon-Maupassant
Gatsby le magnifique-Fitzgerald
Sous l'étoile d'automne-Hamsun
Le Chemin Douloureux-Véla
Vingt-quatre heures de la vie d'une femme-Zweig
Quand La Machine Apprends - LeCun
Psychologie Des Foules - Le Bon
L'Étranger-Camus
Le Petit Prince-Saint Exupery
La Bourse-Balzac


The academic research that underpins this project is the following:

Stephen D. Krashen's Input Hypothesis (Krashen, 1985)
Stephen Krashen's theory of second language acquisition consists of five main hypotheses:
1. The Acquisition-Learning hypothesis
2. The Monitor hypothesis
3. The Natural Order hypothesis
4. The Input hypothesis
5. The Affective Filter hypothesis

Explain me this: Creativity, competition, and the partial productivity of constructions (Goldberg, 2019)
We use words and phrases creatively to express ourselves in ever-changing contexts, readily extending language constructions in new ways. Yet native speakers also implicitly know when a creative and easily interpretable formulation—such as “Explain me this” or “She considered to go”—doesn’t sound quite right. In this incisive book, Adele Goldberg explores how these creative but constrained language skills emerge from a combination of general cognitive mechanisms and experience. Shedding critical light on an enduring linguistic paradox, Goldberg demonstrates how words and abstract constructions are generalized and constrained in the same ways. When learning language, we record partially abstracted tokens of language within the high-dimensional conceptual space that is used when we speak or listen. Our implicit knowledge of language includes dimensions related to form, function, and social context. At the same time, abstract memory traces of linguistic usage-events cluster together on a subset of dimensions, with overlapping aspects strengthened via repetition. In this way, dynamic categories that correspond to words and abstract constructions emerge from partially overlapping memory traces, and as a result, distinct words and constructions compete with one another each time we select them to express our intended messages. While much of the research on this puzzle has favored semantic or functional explanations over statistical ones, Goldberg’s approach stresses that both the functional and statistical aspects of constructions emerge from the same learning mechanisms.

Finding Structure in Time (Elman, 1990)
Time underlies many interesting human behaviors. Thus, the question of how to represent time in connectionist models is very important. One approach is to represent time implicitly by its effects on processing rather than explicitly (as in a spatial representation). The current report develops a proposal along these lines first described by Jordan (1986) which involves the use of recurrent links in order to provide networks with a dynamic memory. In this approach, hidden unit patterns are fed back to themselves; the internal representations which develop thus reflect task demands in the context of prior internal states. A set of simulations is reported which range from relatively simple problems (temporal version of XOR) to discovering syntactic/semantic features for words. The networks are able to learn interesting internal representations which incorporate task demands with memory demands; indeed, in this approach the notion of memory is inextricably bound up with task processing. These representations reveal a rich structure, which allows them to be highly context-dependent, while also expressing generalizations across classes of items. These representations suggest a method for representing lexical categories and the type/token distinction.

