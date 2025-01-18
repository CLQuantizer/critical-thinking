<script lang="ts">
    import Paragraph from "$lib/client/Paragraph.svelte";
    import {paragraphSchema} from "$lib/client/schemas";
    import {strEqIgnCase} from "$lib/client/common";
    export let word: any
    export let contexts: any
</script>

<div class="w-full flex flex-col gap-2 p-2 border-secondary border rounded">
<!--    <audio src={CDN_PREFIX+word.hash} bind:paused />-->
    <div class="flex items-center gap-2">
        <b>{word.word}:</b>
    </div>
    <b>Contextes:</b>
    {#if contexts && contexts.length > 0}
        {#each contexts as ctx}
            {#if !strEqIgnCase(ctx.text, word.meaning)}
                <Paragraph paragraph={paragraphSchema.parse(ctx.parse)} isShowHead />
            {/if}
        {/each}
    {/if}
</div>
