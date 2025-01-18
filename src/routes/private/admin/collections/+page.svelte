<script lang="ts">
    import {IMAGE_CDN_PREFIX} from "$lib/client/common";
    import 'tippy.js/dist/tippy.css';
    import {goto} from "$app/navigation";

    export let data;
    // Book data with typing
    $:docs = data.collections

    // Sort books by timestamp (most recent first)
    $: sortedDocs = [...docs].sort((a, b) => {
        if (!a.timestamp || !b.timestamp) return 0;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    const handleSelectBook = async (docId: number) => {
        // guard clause
        if (!docId) return;
        await goto(`/private/admin/collections/${docId}/1`);
    }
</script>

{#if docs && docs.length > 0}
    <div class="flex flex-wrap gap-2">
        {#each docs as doc, i}
            <div class="flex-col gap-2 flex rounded p-4 hover:ring bg-secondary/70"
                 tabindex="0" role="button" on:keydown={()=>{}}
                 on:click={async ()=> await handleSelectBook(doc.id)}>
                <div class="flex gap-2 items-center">
                    <p class="text-xs font font-semibold rounded-full justify-center items-center flex
                             w-5 h-5 bg-primary/20 ">{i+1}</p>
                    <p class="p-2 rounded cursor-pointer font-light italic transition-all duration-200">
                        {doc.name}
                    </p>
                </div>
                <img class="rounded-lg w-24 aspect-square" src={IMAGE_CDN_PREFIX+doc.id+".png"} alt={doc.name}/>
            </div>
        {/each}
    </div>
{/if}