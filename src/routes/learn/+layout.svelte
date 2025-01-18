<script>
    import {Button} from "$lib/components/ui/button/index";
    import {toggleMode} from "mode-watcher";
    import {MoonStar, Sun} from "lucide-svelte";
    import RedirectButton from "$lib/client/RedirectButton.svelte";

    const articles = [
        {

            title: "Learn French with Comprehensible Input",
            slug: "learn-french-with-comprehensible-input"
        },
        {
            title: "Learn French with Memory Entrenchment",
            slug: "learn-french-with-memory-entrenchment"
        },
        {
            title: "Usage-based French Learning",
            slug: "usage-based-french-learning"
        },
        {
            title: "Read 'Psychology of Crowds (Le Bon)' in French",
            slug: "read-crowd-psychology-in-french"
        },
    ];

</script>

<div class="w-full max-w-full lg:max-w-3xl mx-auto py-2 px-4">
    <div class="flex flex-col gap-2">
        <div class="justify-between w-full flex gap-2">
            <Button on:click={()=> window.location.href="/auth/login"}>Login</Button>
            <button on:click={toggleMode}>
                <MoonStar class="hidden dark:block"/>
                <Sun class="dark:hidden"/>
            </button>
        </div>
        <slot/>
    </div>
    <RedirectButton />
    <p class="mt-6">Articles:</p>
    <div class="flex flex-col gap-4 mt-4">
        {#each articles as article}
            <a href={`/learn/${article.slug}`} class="text-blue-500 underline hover:ring p-1 rounded">
                {article.title}
            </a>
        {/each}
    </div>
</div>