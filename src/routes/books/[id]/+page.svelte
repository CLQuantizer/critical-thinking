<script lang="ts">
    import {COLLECTIONS_URL, IMAGE_CDN_PREFIX, ORIGIN} from "$lib/client/common";
    import {goto} from "$app/navigation";

    export let data: any;
    $: doc = data.doc;
    ORIGIN
</script>

<svelte:head>
    <title>Learn French with Context | {doc.name} | {ORIGIN}</title>
    <meta name="description" content="Read {doc.name} in French with instant word-in-context translations. Perfect for English speakers learning French through immersive reading." />
    <meta name="keywords" content="learn French, French reading, French literature, {doc.name}, word-in-context, language learning" />

    <!-- Open Graph -->
    <meta property="og:title" content="Learn French: {doc.name} | {ORIGIN}" />
    <meta property="og:description" content="Improve your French by reading {doc.name} with instant contextual translations and smart word tracking." />
    <meta property="og:image" content={IMAGE_CDN_PREFIX+doc.id+".png"} />
    <meta property="og:url" content={ORIGIN} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Learn French: {doc.name} | {ORIGIN}" />
    <meta name="twitter:description" content="Master French through immersive reading with instant word translations in context." />
    <meta name="twitter:image" content={IMAGE_CDN_PREFIX+doc.id+".png"} />
</svelte:head>

<article class="container mx-auto p-2">
    <h1 class="text-3xl font-bold text-center mb-6">{doc.name}</h1>
    <div on:click={async () => await goto(COLLECTIONS_URL)} role="button" tabindex="0" on:keydown={(e) => e.key === "Enter" && goto(COLLECTIONS_URL)}
            class="flex md:flex-row m:flex-col gap-6 rounded p-4 hover:ring bg-secondary/30 items-center">
        <div class="space-y-2.5">
            <img class="rounded-lg aspect-square" src={IMAGE_CDN_PREFIX+doc.id+".png"} alt={doc.name}/>
        </div>
        <p class="font-light leading-loose text-primary/80">
            {doc.description}
        </p>
    </div>
</article>