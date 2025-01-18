<script>
    import InteractiveDemo from "$lib/client/InteractiveDemo.svelte";
    import {IMAGE_CDN_PREFIX} from "$lib/client/common";

    // SEO meta tags
    const pageTitle = "Read 'Psychology of Crowds' in French | Usage-Based Learning | fr.MyWords.io";
    const pageDescription = "Study 'Psychologie des Foules' by Gustave Le Bon in French with context-based learning. Master French psychology terminology through immersive reading with instant word-in-context translations.";
    const keywords = "Psychologie des Foules, Le Bon, French psychology terms, crowd psychology French, French academic reading, context-based French learning";

    const demoSentence = {
        text: "Au sens ordinaire,le mot foule représente une réunion d'individus quelconques, quels que soient leur nationalité, leur profession ou leur sexe, quels que soient aussi les hasards qui les rassemblent.",
        words: [
            { word: "quelconques", en: "ordinary, unspecified, or undistinguished individuals or things.", fr: "Indéterminés, non spécifié ou non distingué." },
            { word: "hasards", en: "random events or circumstances bringing people together.", fr: "Circonstances ou imprévus qui réunissent des personnes." },
            { word: "rassemblent", en: "bring together or gather in one place.", fr: "mettent ensemble des personnes pour une raison quelconque." }
        ]
    }
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
</svelte:head>

<article class="container mx-auto py-8 px-4 max-w-4xl">
    <header class="mb-12">
        <h1 class="text-4xl font-bold mb-6">Master French Through Crowd Psychology</h1>
        <p class="text-xl text-gray-700 mb-4">
            Dive into Gustave Le Bon's seminal work "Psychologie des Foules" while building advanced French vocabulary through context-based learning.
        </p>
    </header>

    <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-6">Why Read "Psychologie des Foules"?</h2>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <h3 class="text-2xl font-medium">Academic French Mastery</h3>
                <p>
                    Enhance your French vocabulary with academic and psychological terminology in context. Experience how complex ideas are expressed in French academic writing while building sophisticated language skills.
                </p>
            </div>
            <div class="space-y-4">
                <h3 class="text-2xl font-medium">Historical Significance</h3>
                <p>
                    Published in 1895, this influential work has shaped our understanding of crowd behavior and social psychology. Access this foundational text in its original French with modern learning tools.
                </p>
            </div>
        </div>
    </section>

    <section class="mb-12 rounded-lg">
        <h2 class="text-3xl font-semibold mb-6">Interactive Learning Features</h2>
        <div class="space-y-8">
            <div>
                <p class="mb-4">
                    Click any psychological term or unfamiliar word to instantly see its precise meaning within the context of crowd psychology discourse.
                </p>
                <InteractiveDemo {demoSentence} />
            </div>

            <div>
                <h3 class="text-2xl font-medium mb-4">Academic Vocabulary Tracking</h3>
                <p class="mb-4">
                    Build a personal notebook of psychological terminology and academic French expressions. Track your progress as you master sophisticated vocabulary.
                </p>
                <img src={IMAGE_CDN_PREFIX+"vocab.png"} alt="Academic Vocabulary Notebook" class="rounded-lg shadow-md"/>
            </div>
        </div>
    </section>

    <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-6">Key Concepts You'll Master</h2>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="p-4 bg-secondary shadow-md rounded-lg">
                <h3 class="text-xl font-medium mb-3">Group Psychology</h3>
                <p>Learn French terminology related to collective behavior and group dynamics.</p>
            </div>
            <div class="p-4 bg-secondary shadow-md rounded-lg">
                <h3 class="text-xl font-medium mb-3">Social Influence</h3>
                <p>Master vocabulary describing social mechanisms and crowd influence.</p>
            </div>
            <div class="p-4 bg-secondary shadow-md rounded-lg">
                <h3 class="text-xl font-medium mb-3">Mass Behavior</h3>
                <p>Understand French expressions describing collective actions and mob psychology.</p>
            </div>
        </div>
    </section>

    <section class="mb-12">
        <h2 class="text-3xl font-semibold mb-6">Context-Rich Learning</h2>
        <div class="space-y-6">
            <p>
                Our usage-based approach, grounded in Goldberg's research, helps you understand how French academic language works in real contexts. Search for psychological terms across different passages to see how they're used in various situations.
            </p>
            <img src={IMAGE_CDN_PREFIX+"reverse-index.png"} alt="Context Search Feature" class="rounded-lg shadow-md"/>
        </div>
    </section>

    <section class="rounded-lg mb-12">
        <h2 class="text-3xl font-semibold mb-6">Start Your Academic French Journey</h2>
        <p class="text-lg mb-6">
            Begin reading "Psychologie des Foules" today and experience how context-based learning can accelerate your French language mastery while exploring fascinating insights into human behavior.
        </p>
    </section>

    <section>
        <h2 class="text-3xl font-semibold mb-6">Related Works</h2>
        <p class="mb-6">
            Explore other French academic texts in our library, including works by Yann LeCun on machine learning and classic literature that explores human psychology and behavior.
        </p>
        <a href="/books" class="text-blue-600 hover:underline">Browse Our Full Collection →</a>
    </section>
</article>

<style>
    section {
        scroll-margin-top: 2rem;
    }
</style>