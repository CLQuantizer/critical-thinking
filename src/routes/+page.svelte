<script lang="ts">
    import { fade } from 'svelte/transition';
    import ky from 'ky';
    import {Button} from "$lib/components/ui/button";

    interface Alternative {
        name: string;
        text: string;
    }

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
                json: { hypothesis, context },
                timeout: 30000
            }).json<{ alternatives: Alternative[] }>();

            alternatives = response.alternatives;
        } catch (e) {
            error = 'Failed to generate alternatives. Please try again.';
            console.error(e);
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

<div class="container">
    <div class="space-y-4">
        <h2 class="text-2xl font-bold">Alternative Hypothesis Generator</h2>

        <div class="space-y-2">
            <label for="hypothesis" class="block font-medium">Your Hypothesis</label>
            <textarea
                    id="hypothesis"
                    bind:value={hypothesis}
                    class="w-full p-2 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your hypothesis here..."
            />
        </div>

        <div class="space-y-2">
            <label for="context" class="block font-medium">Context</label>
            <textarea
                    id="context"
                    bind:value={context}
                    class="w-full p-2 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide context for your hypothesis..."
            />
        </div>

        <div class="flex gap-4">
            <Button on:click={generateAlternatives} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Alternatives'}
            </Button>

            <Button on:click={resetForm}>Reset</Button>
        </div>

        {#if error}
            <div class="p-4 bg-red-100 text-red-700 rounded-lg" transition:fade>
                {error}
            </div>
        {/if}
    </div>

    {#if alternatives.length > 0}
        <div class="space-y-4" transition:fade>
            <h3 class="text-xl font-semibold">Alternative Hypotheses</h3>

            <div class="space-y-4">
                {#each alternatives as alternative, i}
                    <div class="p-4 border rounded-lg">
                        <h4 class="font-medium text-lg">{alternative.name}</h4>
                        <p class="mt-2">{alternative.text}</p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>