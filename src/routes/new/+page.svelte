<script lang="ts">
    import { fade } from 'svelte/transition';
    import ky from 'ky';
    import { Button } from "$lib/components/ui/button";
    import {pop} from "$lib/store";

    interface Alternative {
        name: string;
        text: string;
    }

    interface ApiResponse {
        alternatives?: Alternative[];
        error?: string;
    }

    export let data

    let hypothesis = '';
    let context = '';
    let alternatives: Alternative[] = [];
    let loading = false;
    let error: string | null = null;

    async function generateAlternatives() {
        if (!hypothesis.trim() || !context.trim()) {
            error = 'Please fill in both fields';
            return;
        }

        loading = true;
        error = null;

        try {
            const response = await ky.post('/think', {
                json: { hypothesis, context, error },
                timeout: 30000
            }).json<ApiResponse>();

            if (response.error) {
                pop(response.error, 'error');
                return;
            }

            alternatives = response.alternatives || [];

            if (alternatives.length === 0) {
                error = 'No alternatives could be generated. Please try different input.';
            }
        } catch (e) {
            error = e instanceof Error ? e.message : 'Failed to generate alternatives. Please try again.';
            console.error(e);
            alternatives = [];
        } finally {
            loading = false;
        }
    }

    function resetForm() {
        hypothesis = '';
        context = '';
        alternatives = [];
        error = null;
    }
</script>


<div class="space-y-4">
    <h2 class="text-2xl font-bold">Alternative Hypotheses</h2>

    <div class="space-y-2">

        <div class="space-y-2">
            <label for="context" class="block font-medium">Context</label>
            <textarea
                    id="context"
                    bind:value={context}
                    class="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/5"
                    placeholder="Provide context for your hypothesis..."
                    disabled={loading}
            />
        </div>

        <div class="space-y-2">
            <label for="hypothesis" class="block font-medium">Your Hypothesis</label>
            <textarea
                    id="hypothesis"
                    bind:value={hypothesis}
                    class="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/5"
                    placeholder="Enter your hypothesis here..."
                    disabled={loading}
            />
        </div>

        <div class="flex gap-4">
            <Button
                    on:click={generateAlternatives}
                    disabled={loading}
                    variant="default"
                    class="min-w-[200px]"
            >
                {#if loading}
                    <span class="inline-block animate-spin mr-2">⟳</span>
                    Thinking...
                {:else}
                    Get Alternatives
                {/if}
            </Button>

            <Button
                    on:click={resetForm}
                    variant="outline"
                    disabled={loading}
            >
                Reset
            </Button>
        </div>

        {#if error}
            <div class="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200"
                 transition:fade={{ duration: 200 }}>
                {error}
            </div>
        {/if}
    </div>

    {#if alternatives.length > 0}
        <div class="space-y-6 mt-12" transition:fade={{ duration: 300 }}>
            <h3 class="text-xl font-semibold">Alternative Hypotheses</h3>
            <div class="space-y-6">
                {#each alternatives as alternative, i}
                    <div class="p-6 border rounded-lg hover:border-blue-500 transition-colors">
                        <h4 class="font-medium text-lg text-blue-600">{alternative.name}</h4>
                        <p class="mt-3 leading-relaxed">{alternative.text}</p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>