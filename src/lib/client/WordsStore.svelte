<script lang="ts">
    import {wordsStore} from "$lib/store";
    import {Button} from "$lib/components/ui/button";
    import {slide} from "svelte/transition";
    import {strEqIgnCase} from "$lib/client/common";
    import WordDetail from "$lib/client/WordDetail.svelte";
    import {getWordDetail} from "$lib/client/FeUtils";

    let lastChosen:string = "";
    let chosen:string = "";
    let word: any;
    let contexts: any;
    let resp: { word:any, contexts:any };

    const handleChooseWord = async (w:string) => {
        if (strEqIgnCase(chosen, w)) {
            chosen = "";
            return;
        }
        if (strEqIgnCase(lastChosen, w)) {
            chosen = w;
            return;
        }
        const res = await getWordDetail(w);
        if (!res) {
            return;
        }
        resp = res;
        console.log("resp", resp);
        if (resp) {
            word = resp.word;
            contexts = resp.contexts;
            chosen = w
            lastChosen = w;
        }
    }

    const handleKeyDown = (e:KeyboardEvent) => {
        if (e.key === 'Escape') {
            chosen = "";
        }
    }

</script>

<svelte:window on:keydown={handleKeyDown} />
<div class="w-full border border-secondary rounded p-2">
    {#if [...$wordsStore].length > 0}
        <div class="flex justify-center items-center mb-2">
            <p class="text-primary/70">Click on a word for detail</p>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-wrap gap-1.5">
                {#each $wordsStore as w}
                    <Button variant="secondary" on:click={async ()=> await handleChooseWord(w)}>{w}</Button>
                    {#if strEqIgnCase(chosen, w) && resp}
                        <div transition:slide={{duration: 300}}>
                            <WordDetail {word} {contexts}/>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {:else}
        <div class="flex justify-center items-center">
            <p class="text-primary/70">Click on any word to learn</p>
        </div>
    {/if}
</div>
