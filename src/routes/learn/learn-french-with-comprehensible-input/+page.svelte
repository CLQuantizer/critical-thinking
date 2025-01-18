<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import {Button} from "$lib/components/ui/button";

    // SEO meta tags
    const pageTitle = "Learn French with Comprehensible Input | mywords.io";
    const pageDescription = "Master French through natural reading with AI-powered context translations. Experience effective language learning with classic French literature and modern works.";
    const keywords = "comprehensible input, French learning, context learning, language acquisition, natural French learning";

    // Interactive state
    let activeTab: 'classics' | 'modern' | 'short' = 'classics';
    let selectedWord: { word: string, en: string, fr: string } = {'word': '', 'en': '', 'fr': ''};

    // explanation both in English and French
    const demoSentence = {
        text: "J'étais noyé dans le bruit et la poussière.",
        words: [
            { word: "noyé", en: "Overwhelmed or engulfed by something.", fr: "Submergé ou englouti par quelque chose." },
            { word: "bruit", en: "Noise or sound.", fr: "son qui dérange." },
            { word: "poussière", en: "Dust or dirt particles.", fr: "Particules de saleté qui flottent dans l'air." }
        ]
    };

    // Book categories with metadata
    const bookCategories = {
        classics: {
            title: "Classic Literature",
            description: "Timeless French masterpieces that have shaped literature",
            books: [
                { title: "Madame Bovary", author: "Flaubert", difficulty: "Advanced" },
                { title: "L'Étranger", author: "Camus", difficulty: "Intermediate" },
                { title: "Le Petit Prince", author: "Saint Exupery", difficulty: "Beginner" }
            ]
        },
        modern: {
            title: "Modern Works",
            description: "Contemporary French literature and translations",
            books: [
                { title: "Quand La Machine Apprends", author: "LeCun", difficulty: "Advanced" },
                { title: "Le Chemin Douloureux", author: "Véla", difficulty: "Intermediate" },
                { title: "Gatsby le magnifique", author: "Fitzgerald", difficulty: "Intermediate" }
            ]
        },
        short: {
            title: "Short Stories",
            description: "Perfect for quick reading sessions",
            books: [
                { title: "Le Père Milon", author: "Maupassant", difficulty: "Intermediate" },
                { title: "La Bourse", author: "Balzac", difficulty: "Intermediate" },
                { title: "Vingt-quatre heures de la vie d'une femme", author: "Zweig", difficulty: "Advanced" }
            ]
        }
    };

    const features = [
        {
            id: 1,
            title: "Contextual Understanding",
            description: "Our system analyzes complete sentences to provide accurate, contextual translations",
            icon: "🔍"
        },
        {
            id: 2,
            title: "Personal Learning Notebook",
            description: "Build your personal vocabulary and sentence collection as you read",
            icon: "📝"
        },
        {
            id: 3,
            title: "Intelligent Word Tracking",
            description: "Track your vocabulary growth and reading progress across all texts",
            icon: "📊"
        }
    ];

    onMount(() => {
        document.title = pageTitle;
    });
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

<main class="">
    <!-- Hero Section with Integrated Demo -->
    <header class="py-20">
        <div class="container mx-auto px-4">
            <h1 class="text-2xl md:text-4xl font-bold mb-6">
                Master French Through Natural Reading
            </h1>
            <p class="text-xl mb-8">
                Experience the power of comprehensible input with AI-powered context understanding
            </p>

            <!-- Interactive Demo Integrated -->
            <div class="p-6 bg-secondary rounded-lg shadow-lg max-w-2xl">
                <h3 class="text-xl font-semibold mb-4">Try it yourself! Click one of these words:</h3>
                <div class="flex flex-wrap gap-4 mb-4">
                    {#each demoSentence.words as word}
                        <Button class="px-4 py-2 rounded {selectedWord?.word === word.word ? 'ring' : 'hover:ring'}"
                                on:click={() => selectedWord = word}>
                            {word.word}
                        </Button>
                    {/each}
                </div>
                <p class="text-lg italic font-light mb-4 leading-relaxed">{demoSentence.text}</p>

                {#if selectedWord.word}
                    <div class="font-light rounded-lg" transition:fade>
                        <h4 class="font-semibold mb-2">{selectedWord.word}</h4>
                        <p class="">English: {selectedWord.en}</p>
                        <p class="mt-2">Français: {selectedWord.fr}</p>
                    </div>
                {/if}
            </div>
        </div>
    </header>

    <!-- Rest of the sections remain the same -->
    <section class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div class="grid md:grid-cols-3 gap-8">
            {#each features as feature}
                <div class="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div class="text-4xl mb-4">{feature.icon}</div>
                    <h3 class="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            {/each}
        </div>
    </section>

    <section class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold mb-12 text-center">Available Books</h2>
        <div class="flex justify-center mb-8">
            {#each Object.entries(bookCategories) as [key, category]}
                <button
                        class="px-6 py-2 mx-2 rounded-full {activeTab === key ? 'bg-secondary' : ''}"
                        on:click={() => activeTab = key}>
                    {category.title}
                </button>
            {/each}
        </div>

        <div class="grid md:grid-cols-3 gap-6">
            {#each bookCategories[activeTab].books as book}
                <div class="bg-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-2">{book.title}</h3>
                    <p class="mb-4">by {book.author}</p>
                    <span class="inline-block px-3 py-1 rounded-full text-sm {
                        book.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        book.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }">
                        {book.difficulty}
                    </span>
                </div>
            {/each}
        </div>
    </section>

    <section class="container mx-auto px-4 py-16 text-center">
        <h2 class="text-3xl font-bold mb-8">Start Your French Journey Today</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already experiencing the power of context-based learning
        </p>
    </section>
</main>