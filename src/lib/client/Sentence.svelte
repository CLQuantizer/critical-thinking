<script lang="ts">
    import Token from "./Token.svelte";
    import {resetSentStore, contextStore} from "$lib/store";
    import {Button} from "$lib/components/ui/button";
    import {fade, slide} from "svelte/transition";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import {sent2Para, type Sentence} from "$lib/client/schemas";
    import {strEqIgnCase} from "$lib/client/common.js";
    import {handleSaveSentence} from "$lib/client/FeUtils";
    import {TEXT_CLOSE, TEXT_SAVE} from "$lib/client/texts";

    export let sentence: Sentence;
    export let single: boolean;
    export let isShowHead: boolean = false;
    export let i: number;
    $: id = single? "-" : (i+1).toString();

</script>

<!--<svelte:window on:keydown={async (e) => {if (e.key === ' ') handleTts(context.hash)}} />-->
<!--if the sentence is highlighted, show the translation-->
{#if strEqIgnCase($contextStore.sentence, sentence.sentence) && strEqIgnCase($contextStore.id, id)}
    <div class="rounded flex flex-col p-2 border bg-secondary" in:slide={{duration: 300}}>
        <!-- Translation -->
        {#if $contextStore.hash}
            <div class="inline whitespace-normal" in:fade={{duration: 200}}>
                <div class="flex items-center justify-between mb-1">
                    <Button on:click={() => handleSaveSentence(sent2Para(sentence))}
                            class="hover:bg-foreground/80 hover:text-secondary"
                            variant="outline">{TEXT_SAVE}</Button>
                    <Button on:click={() => resetSentStore()}
                            class="hover:bg-foreground/80 hover:text-secondary"
                            variant="outline">{TEXT_CLOSE}</Button>
                </div>
                <span class="inline font-light">{$contextStore.translation}</span>
            </div>
        {:else}
            <div class="inline whitespace-normal" in:fade={{duration: 200}}>
                <div class="flex flex-col mb-1 gap-2 ">
                    <Skeleton class="h-[30px] w-24 rounded-full" />
                    <Skeleton class="h-[30px] w-full rounded-full" />
                </div>
                <span class="inline font-light">{$contextStore.translation}</span>
            </div>
        {/if}
    </div>
{/if}
{#if isShowHead}
    <button class="justify-center items-center w-5 h-5 bg-primary/20 text-xs rounded-lg">{id}</button>
{/if}
<div class="relative inline rounded">
    {#each sentence.tokens as token}
        <Token token={token} sentence={sentence} sentId={id}/>
    {/each}
</div>


