<script lang="ts">
    import type {Para} from "$lib/client/schemas";
    import Sentence from "$lib/client/Sentence.svelte";

    export let paragraph: Para;
    export let isShowHead: boolean = false;
    $: single = paragraph.sentences.length === 1;
</script>

<div class="relative whitespace-normal leading-7">
    {#each paragraph.sentences as sentence, i}
        <Sentence isShowHead={isShowHead} {single} {sentence} {i}/>
    {/each}
</div>

