<script lang="ts">

    import {Button} from "$lib/components/ui/button";
    import ky from "ky";
    import {API} from "$lib/client/common";
    import {invalidateAll} from "$app/navigation";
    import {pop} from "$lib/store";

    export let data
    $: paragrahs = data.paragraphs;
    let newParagraph = '';

    // The request sent to backend should be an array of objects with the following shape
    // id: z.number(), text: z.string()
    const handleSubmit = async () => {
        try {
            const old = paragrahs.map(p => ({id: p.id, text: p.text}));
            await ky.post(API+'/admin', {
                json: {old, new: newParagraph}
            }).json();
            await invalidateAll();
            pop('Updated id');
            newParagraph = '';
        } catch (error) {
            console.error('Error updating:', error);
        }
    }

    function autoResize(e: Event) {
        console.log('autoResize');
        const textarea = e.target as HTMLTextAreaElement;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

</script>

<div class="flex flex-col gap-2">
    <div>
        <Button variant="secondary" on:click={async ()=> await handleSubmit()}>Save</Button>
    </div>
    {#if paragrahs && paragrahs.length > 0}
        <div class="w-full flex flex-col gap-2">
            {#each paragrahs as p}
                <textarea
                        on:focus={autoResize}
                        bind:value={p.text}
                        on:input={autoResize}
                        class="rounded overflow-hidden p-2 resize-none"
                />
            {/each}
        </div>
    {/if}
    <textarea class="p-2" rows="5" bind:value={newParagraph}
              on:input={autoResize} on:focus={autoResize} />
</div>