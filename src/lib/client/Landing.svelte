<script>
    import {Button} from "$lib/components/ui/button/index";
    import {goto} from "$app/navigation";
    import {IMAGE_CDN_PREFIX} from "$lib/client/common";
</script>

<div class="flex min-h-[100dvh] flex-col">
    <header class="bg-primary text-primary-foreground py-6 md:py-12">
        <div class="container mx-auto px-4 md:px-6">
            <div class="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover French Literature</h1>
                    <div class="sm:text-xl m:text-base">
                        <p class="mt-4 text-secondary">
                            Read classic French books such as
                        </p>
                        <ul class="px-4 py-2 list-disc list-inside">
                            <li class="italic">'Le Petit Prince'</li>
                            <li class="italic">'Psychologie des Foules'</li>
                        </ul>
                        <p>
                            Get inline context-based translations
                            and learn French super fast.
                        </p>
                    </div>
                    <div class="mt-6 bg m:flex m:justify-center sm:block">
                        <Button variant="secondary" on:click={()=>goto("/auth/login")}>
                            Get Started
                        </Button>
                    </div>
                </div>
                <div class="justify-self-end">
                    <img src={IMAGE_CDN_PREFIX+"35.png"} alt="French books"
                         class="rounded-lg"
                         style="aspect-ratio: 40/35; object-fit: cover;"
                    />
                </div>
            </div>
        </div>
    </header>
    <main class="flex-1">
        <section class="py-12 md:py-24">
            <div class="container mx-auto px-4 md:px-6" tabindex="0" role="button" on:keydown={e => e.key === "Enter" && goto("/auth/signup")}
                 on:click={async() => await goto("/auth/login")}>
                <h2 class="text-2xl font-bold tracking-tighter md:text-3xl">Featured Books</h2>
                <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="rounded-lg border bg-card p-4">
                        <img src={IMAGE_CDN_PREFIX+"bigking.png"} alt="Book 1" class="rounded-lg"
                             style="aspect-ratio: 3/4; object-fit: cover;"
                        />
                        <h3 class="mt-4 text-lg font-medium">Le Petit Prince</h3>
                        <p class="mt-2 text-muted-foreground">
                            A beloved classic by Antoine de Saint-Exupéry, exploring themes of friendship, love, and the human
                            condition.
                        </p>
                    </div>
                    <div class="rounded-lg border bg-card p-4">
                        <img src={IMAGE_CDN_PREFIX+"sourbe.png"} alt="Book 2" class="rounded-lg"
                             style="aspect-ratio: 3/4; object-fit: cover;"
                        />
                        <h3 class="mt-4 text-lg font-medium">La Bourse</h3>
                        <p class="mt-2 text-muted-foreground">
                            A novel by Honoré de Balzac, exploring the world of finance and the stock market in 19th-century Paris.
                        </p>
                    </div>
                    <div class="rounded-lg border bg-card p-4">
                        <img src={IMAGE_CDN_PREFIX+"lonmi.png"} alt="Book 3" class="rounded-lg"
                             style="aspect-ratio: 3/4; object-fit: cover;"
                        />
                        <h3 class="mt-4 text-lg font-medium">Le Père Milon</h3>
                        <p class="mt-2 text-muted-foreground">
                            A short story by Guy de Maupassant, exploring themes of revenge, patriotism, and the brutality of war.
                        </p>
                    </div>
                    <div class="rounded-lg border bg-card p-4">
                        <img src={IMAGE_CDN_PREFIX+"madame.png"} alt="Book 4" class="rounded-lg"
                             style="aspect-ratio: 3/4; object-fit: cover;"
                        />
                        <h3 class="mt-4 text-lg font-medium">Madame Bovary</h3>
                        <p class="mt-2 text-muted-foreground">
                            Gustave Flaubert's masterpiece, a realistic portrayal of provincial life and unfulfilled desires.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-12 lg:py-24 bg-secondary">
            <div class="container mx-auto px-4 md:px-6">
                <h2 class="text-3xl font-bold tracking-tighter text-center mb-8">Key Features</h2>
                <div class="flex flex-col items-center gap-12">
                    <div class="flex flex-col lg:m-6">
                        <h3 class="text-xl font-semibold mb-2">Translate Everything</h3>
                        <p>Translate any word or sentence in the book with a single click. Understand the text better and learn new vocabulary effortlessly.</p>
                        <img src={IMAGE_CDN_PREFIX+"translate-all.png"} alt="Read and Learn Words" class="rounded-xl shadow-lg drop-shadow-lg mt-6" />
                    </div>
                    <div class="flex flex-col lg:m-6">
                        <h3 class="text-xl font-semibold mb-2">Read and Learn Words</h3>
                        <p>Immerse yourself in French literature while effortlessly expanding your vocabulary. Click on unfamiliar words for instant translations and add them to your personal word list.</p>
                        <img src={IMAGE_CDN_PREFIX+"read-and-learn.png"} alt="Read and Learn Words" class="rounded-xl shadow-lg drop-shadow-lg mt-6" />
                    </div>
                    <div class="flex flex-col gap-2 lg:m-6">
                        <h3 class="text-xl font-semibold mb-2">Track Word Progress</h3>
                        <p>Monitor your learning journey with our intuitive progress tracking system. Visualize your vocabulary growth and identify areas for improvement.</p>
                        <img src={IMAGE_CDN_PREFIX+"vocab.png"} alt="Track Word Progress" class="rounded-lg shadow-lg mt-6" />
                    </div>
                    <div class="flex flex-col gap-2 lg:m-6">
                        <h3 class="text-xl font-semibold mb-2">Review Sentences</h3>
                        <p>Reinforce your learning by reviewing words in context. Study and practice with sentences from the books you've read to deepen your understanding of French grammar and usage.</p>
                        <img src={IMAGE_CDN_PREFIX+"review-sentence.png"} alt="Review Sentences" class="rounded-lg shadow-lg mt-6" />
                    </div>
                </div>
            </div>
        </section>

        <section class="py-12 md:py-24">
            <div class="container mx-auto px-4 md:px-6">
                <h2 class="text-2xl font-bold tracking-tighter md:text-3xl mb-8">Benefits</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Improve Your French</h3>
                        <p>Learn new vocabulary in context and enhance your reading comprehension skills.</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Discover Classic Literature</h3>
                        <p>Immerse yourself in the rich world of French literature and culture.</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Track Your Progress</h3>
                        <p>Monitor your learning journey with our built-in progress tracking tools.</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Learn at Your Own Pace</h3>
                        <p>Set your own learning goals and progress through the books at a comfortable speed.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-12 md:py-24 bg-muted">
            <div class="container mx-auto px-4 md:px-6">
                <h2 class="text-2xl font-bold tracking-tighter md:text-3xl">What Our Users Say</h2>
                <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="rounded-lg border bg-card p-4">
                        <blockquote class="flex flex-col justify-between">
                            <div>
                                <p class="text-muted-foreground">
                                    "I enjoy saving unknown words to my vocabulary while reading. It's a great way to learn French at my own pace."
                                </p>
                            </div>
                            <footer class="mt-4 text-right text-muted-foreground">- John Doe</footer>
                        </blockquote>
                    </div>
                    <div class="rounded-lg border bg-card p-4">
                        <blockquote class="flex flex-col justify-between">
                            <div>
                                <p class="text-muted-foreground">
                                    "Reading classic French literature has greatly improved my language skills and cultural understanding."
                                </p>
                            </div>
                            <footer class="mt-4 text-right text-muted-foreground">- Jane Smith</footer>
                        </blockquote>
                    </div>
                    <div class="rounded-lg border bg-card p-4">
                        <blockquote class="flex flex-col justify-between">
                            <div>
                                <p class="text-muted-foreground">
                                    "The built-in exercises and progress tracking keep me motivated to continue learning."
                                </p>
                            </div>
                            <footer class="mt-4 text-right text-muted-foreground">- Mark Johnson</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>

<!--        <section class="py-12 md:py-24 bg-secondary">-->
<!--            <div class="container mx-auto px-4 md:px-6">-->
<!--                <h2 class="text-2xl font-bold tracking-tighter md:text-3xl mb-8">Stay Updated</h2>-->
<!--                <form class="max-w-md mx-auto">-->
<!--                    <div class="flex gap-4">-->
<!--                        <input type="email" placeholder="Enter your email" class="flex-grow rounded-md p-2" required />-->
<!--                        <Button type="submit">Subscribe</Button>-->
<!--                    </div>-->
<!--                </form>-->
<!--            </div>-->
<!--        </section>-->
    </main>
    <footer class="bg-muted py-6 md:py-12">
        <div class="container mx-auto px-4 md:px-6">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div>
                    <h3 class="text-lg font-medium">Sitemap</h3>
                    <nav class="mt-4 space-y-2">
                        <a class="block text-muted-foreground hover:underline" href="/">Home</a>
                        <a class="block text-muted-foreground hover:underline" href="/books">Books</a>
<!--                        <a class="block text-muted-foreground hover:underline" href="/about">About Us</a>-->
<!--                        <a class="block text-muted-foreground hover:underline" href="/contact">Contact</a>-->
                    </nav>
                </div>
                <div>
                    <h3 class="text-lg font-medium">Learn</h3>
                    <nav class="mt-4 space-y-2">
                        <a class="block text-muted-foreground hover:underline" href="/learn">How It Works</a>
<!--                        <a class="block text-muted-foreground hover:underline" href="/faq">FAQ</a>-->
<!--                        <a class="block text-muted-foreground hover:underline" href="/blog">Blog</a>-->
                    </nav>
                </div>
                <div>
                    <h3 class="text-lg font-medium">Policies</h3>
                    <nav class="mt-4 space-y-2">
                        <a class="block text-muted-foreground hover:underline" href="/docs/privacy" rel="ugc">Privacy Policy</a>
                        <a class="block text-muted-foreground hover:underline" href="/docs/tc" rel="ugc">Terms and Conditions</a>
                    </nav>
                </div>
                <div>
                    <h3 class="text-lg font-medium">Contact</h3>
                    <p class="mt-4 text-muted-foreground">
                        hello at mywords dot io, no spam please. Reach out to us for any queries/feedback/payment issues.
                    </p>
                </div>
            </div>
            <div class="mt-8 text-center text-muted-foreground">© 2024 mywords.io. All rights reserved.</div>
        </div>
    </footer>
</div>