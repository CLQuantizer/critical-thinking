<script lang="ts">
    import "../app.css";
    import {popStore} from "$lib/store";
    import {ModeWatcher, toggleMode} from "mode-watcher";
    import {Root, Title, Description} from "$lib/components/ui/alert";
    import {MoonStar, Sun} from "lucide-svelte";
    import type {Hypothesis} from "$lib/client/schemas";
    export let data
    $: hypotheses = data.hypotheses as Hypothesis[]
</script>

<ModeWatcher />
<div class="flex flex-col w-screen">
    <div class="absolute flex justify-between w-full pt-6 pb-2 px-6 gap-4">
        <div></div>
        <button on:click={toggleMode}>
            <MoonStar class="hidden dark:block"/>
            <Sun class="dark:hidden"/>
        </button>
    </div>
    <div class="container mx-auto pt-6 pb-24">
        <slot></slot>
        {#if hypotheses.length > 0}
            <div class="space-y-4 my-2">
                <h3 class="text-xl font-semibold">Previous Hypotheses</h3>
                <div class="space-y-4">
                    {#each hypotheses as hypothesis}
                        <div class="p-4 border rounded-lg bg-white/5">
                            <div class="space-y-2">
                                <h4 class="font-medium">Context:</h4>
                                <p class="text-sm">{hypothesis.context}</p>
                                <h4 class="font-medium">Hypothesis:</h4>
                                <p class="text-sm">{hypothesis.text}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

{#if $popStore.isPop}
    <Root class="fixed top-2 lg:right-2 p-4 lg:w-1/6 m:w-full h-min z-50">
        <Title>{$popStore.title}</Title>
        <Description>{$popStore.msg}</Description>
    </Root>
{/if}
