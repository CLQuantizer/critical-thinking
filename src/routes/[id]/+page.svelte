<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import type {Hypothesis} from "$lib/client/schemas";

    export let data
    $: hypothesis = data.hypothesis as Hypothesis
</script>

<div class="space-y-4">
    <h2 class="text-2xl font-bold">Alternative Hypotheses</h2>

    <div class="space-y-2">

        <div class="space-y-2">
            <label for="context" class="block font-medium">Context</label>
            <p class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/5">
                {hypothesis.context}
            </p>
        </div>

        <div class="space-y-2">
            <label for="hypothesis" class="block font-medium">Hypothesis</label>
            <p class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/5">
                {hypothesis.text}
            </p>
        </div>

        <div class="flex gap-4">
            <Button variant="default">Rethink
                <!--{#if loading}-->
                <!--    <span class="inline-block animate-spin mr-2">⟳</span>-->
                <!--    Thinking...-->
                <!--{:else}-->
                <!--    Get Alternatives-->
                <!--{/if}-->
            </Button>
        </div>

        <!--{#if error}-->
        <!--    <div class="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200"-->
        <!--         transition:fade={{ duration: 200 }}>-->
        <!--        {error}-->
        <!--    </div>-->
        <!--{/if}-->
    </div>

    <!--{#if alternatives.length > 0}-->
    <!--    <div class="space-y-6 mt-12" transition:fade={{ duration: 300 }}>-->
    <!--        <h3 class="text-xl font-semibold">Alternative Hypotheses</h3>-->

    <!--        <div class="space-y-6">-->
    <!--            {#each alternatives as alternative, i}-->
    <!--                <div class="p-6 border rounded-lg hover:border-blue-500 transition-colors">-->
    <!--                    <h4 class="font-medium text-lg text-blue-600">{alternative.name}</h4>-->
    <!--                    <p class="mt-3 leading-relaxed">{alternative.text}</p>-->
    <!--                </div>-->
    <!--            {/each}-->
    <!--        </div>-->
    <!--    </div>-->
    <!--{/if}-->
</div>