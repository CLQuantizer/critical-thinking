<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {fade} from "svelte/transition";

    export let demoSentence: { text: string, words: { word: string, en: string, fr: string }[] };
    let selectedWord: { word: string, en: string, fr: string } = {'word': '', 'en': '', 'fr': ''};
</script>

<div class="my-6">
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