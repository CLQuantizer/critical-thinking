<script lang="ts">
    import {chosenWordsStore, wicStore} from "$lib/store";
    import {Button} from "$lib/components/ui/button";
    import {slide} from "svelte/transition";
    import WIC from "$lib/client/WIC.svelte";
    import {LoaderCircle} from "lucide-svelte";
    import {Skeleton} from "$lib/components/ui/skeleton";

    $: wic = $wicStore.get($chosenWordsStore);
</script>

<svelte:window on:keydown={(e) => {if (e.key === 'Escape') $chosenWordsStore = ""}} />
<div class="w-full border border-secondary rounded p-2">
    {#if [...$wicStore].length > 0}
        <div class="flex justify-center items-center">
            <p class="text-primary/70">Nouveaux mots</p>
        </div>
        <div class="my-2">
            {#if $wicStore.has($chosenWordsStore)}
                {#if wic && wic.hash && wic.base && wic.exp}
                    <div transition:slide={{duration: 300}}>
                        <WIC word={$chosenWordsStore} exp={wic.exp} base={wic.base} />
                    </div>
                {:else}
                    <div class="flex flex-col mb-1 gap-2 ">
                        <div class="flex gap-2 items-center">
                            <LoaderCircle class="animate-spin"/>
                            <p class="text-foreground/50">Cogito ergo sum...</p>
                        </div>
                        <Skeleton class="h-[30px] w-1/3 rounded-full" />
                        <Skeleton class="h-[30px] w-full rounded-full" />
                    </div>
                {/if}
            {/if}
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-wrap gap-1.5">
                {#each [...$wicStore].reverse() as [word, _]}
                    <div class="flex-col flex items-center gap-2">
                        <Button variant="secondary" on:click={()=>$chosenWordsStore=word}>{word}</Button>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <div class="flex justify-center items-center">
            <p class="text-primary/70">Click on new words</p>
        </div>
    {/if}
</div>
