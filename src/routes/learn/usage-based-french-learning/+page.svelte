<script>
    import InteractiveDemo from "$lib/client/InteractiveDemo.svelte";
    import {IMAGE_CDN_PREFIX} from "$lib/client/common";

    // SEO meta tags
    const pageTitle = "Usage-Based French Learning | fr.MyWords.io";
    const pageDescription = "Master French through authentic literature and context-based learning. Our platform uses cutting-edge language acquisition principles to help English speakers learn French naturally and effectively.";
    const keywords = "French learning, context learning, vocabulary acquisition, usage-based learning, comprehensible input, French literature";

    const demoSentence = {
        text: "J'étais noyé dans le bruit et la poussière.",
        words: [
            { word: "noyé", en: "Overwhelmed or engulfed by something.", fr: "Submergé ou englouti par quelque chose." },
            { word: "bruit", en: "Noise or sound.", fr: "son (qui dérange)." },
            { word: "poussière", en: "Dust or dirt particles.", fr: "Particules de saleté qui flottent dans l'air." }
        ]
    };
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
</svelte:head>

<article class="container mx-auto py-6 px-4">
    <h1 class="text-4xl font-bold mb-8">Unlock the Power of Context-Based Language Learning</h1>
    <p class="text-lg mb-8">
        fr.mywords.io offers an engaging and effective approach to French learning, optimized for English speakers. Based on Adele Goldberg's (2019) usage-based learning principles from "Explain Me This," we go beyond mere memorization to facilitate natural language absorption through context.
    </p>

    <section>
        <h2 class="text-3xl font-semibold mb-6">Why Usage-Based Learning?</h2>
        <p class="mb-6">
            Adele Goldberg's groundbreaking research emphasizes the crucial role of context in language acquisition. Her work reveals how native speakers rely on intuitions formed through exposure to language in various contexts. Leveraging this principle, fr.mywords.io provides a platform where learners engage with French texts in meaningful ways.
        </p>
    </section>

    <section class="space-y-6">
        <h2 class="text-3xl font-semibold">Key Features of fr.mywords.io:</h2>
        <h3 class="text-2xl font-semibold">Word-in-Context (WIC) Technology:</h3>
        <p class="mb-6">
            When you click on unfamiliar words while reading, they're sent to our advanced language model along with the surrounding text. The model extracts the precise meaning within that specific context, providing definitions in both French and English. This approach helps you understand how words function in real communication, enriching your learning experience.
        </p>
        <InteractiveDemo {demoSentence}/>

        <h3 class="text-2xl font-semibold">Dynamic Word Notebook:</h3>
        <p class="mb-6">
            Each new word you encounter is added to your personal vocabulary notebook. Review these words anytime to deepen your understanding and reinforce retention. The system tracks which words you've encountered across different contexts, helping you build a rich understanding of their usage.
        </p>
        <img src={IMAGE_CDN_PREFIX+"vocab.png"} alt="Vocabulary Notebook" class="rounded-lg"/>

        <h3 class="text-2xl font-semibold">Sentence Contextualization:</h3>
        <p class="mb-6">
            Save entire sentences to your personal notebook for further exploration. This feature fully embraces the principle that "you shall know a word by the company it keeps," allowing you to build a rich understanding of French phraseology and idioms.
        </p>

        <h3 class="text-2xl font-semibold">Searchable Contexts:</h3>
        <p>
            Use our reverse index feature to search for various contexts where words are used. This method reveals the versatility and nuances of each word, strengthening your grasp of French vocabulary.
        </p>
        <img src={IMAGE_CDN_PREFIX+"reverse-index.png"} alt="Reverse Index - Searchable Contexts" class="rounded-lg"/>
    </section>

    <section>
        <h2 class="text-3xl font-semibold mb-6">Learn Through Quality Literature</h2>
        <p class="mb-6">
            Our current library includes renowned French works like "Le Petit Prince," "Madame Bovary,", intellectually stimulating essays by Le Bon,
            and modern texts by Yann LeCun. Immerse yourself in rich narratives while developing your language skills. Our context-focused tools help you understand vocabulary and sentence structures as you progress through these authentic texts.
        </p>
        <p>Check out available texts <a href="/books" class="text-blue-500 underline hover:ring">here</a>.</p>
    </section>

    <section>
        <h2 class="text-3xl font-semibold mb-6">The Neuroscience Behind Your Learning</h2>
        <p class="mb-6">
            Goldberg's exploration of language learning processes demonstrates how our cognitive mechanisms retain and access language through experience. fr.mywords.io harnesses this understanding to create a learning environment that adapts to individual experiences and language needs. By integrating both functional and statistical approaches, we provide a comprehensive learning experience that mirrors real communication.
        </p>
    </section>

    <section>
        <h2 class="text-3xl font-semibold mb-6">Begin Your Usage-Based Learning Journey Today!</h2>
        <p class="mb-6">
            Join the fr.MyWords.io community now and revolutionize how you learn French. Our platform is designed to make language acquisition intuitive, enjoyable, and effective. By focusing on contextual learning, we prepare you not just to understand French, but to use it confidently in everyday conversation.
        </p>
    </section>

    <section class="rounded-lg">
        <h2 class="text-3xl font-semibold mb-6">Ready to Experience the Future of Language Learning?</h2>
        <p class="mb-8">
            Sign up for fr.MyWords.io today!<br>
            For deeper insights into the principles guiding our approach, explore Adele Goldberg's "Explain Me This" and discover how usage-based learning can enhance your French language journey.
        </p>
    </section>
</article>

<style>
    section {
        margin-bottom: 2rem;
    }
</style>