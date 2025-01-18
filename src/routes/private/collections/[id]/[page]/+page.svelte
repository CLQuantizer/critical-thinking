<script lang="ts">
    import {goto, invalidate} from "$app/navigation";
    import {pop} from "$lib/store";
    import {Button} from "$lib/components/ui/button";
    import Paragraph from "$lib/client/Paragraph.svelte";
    import {paragraphSchema} from "$lib/client/schemas";
    import {API, COLLECTION_KEY, ERROR} from "$lib/client/common";
    import WICPanel from "$lib/client/WICPanel.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import {Textarea} from "$lib/components/ui/textarea";
    import ky from "ky";
    import {Flag} from "lucide-svelte";


    export let data
    $: paragrahs = data.paragraphs;
    $: docId = data.docId
    // $: parse = paragraphSchema.parse(page.parse)
    $: offset = data.offset

    let isFlaggingOpen=false;
    let feedback:string='';


    const handlePageChange = async (docId:number | null, plus:boolean) => {
        if (!docId) {
            console.error("docId is not defined");
            pop("Error");
            return
        }
        await invalidate(COLLECTION_KEY)
        await goto(`/private/collections/${docId}/${plus ? offset + 1 : offset - 1}`);
        // update the offset of the user
    }

    const handleSubmitFeedback = async () => {
        if (feedback.length > 1000) {
            pop("Please leave less than 1000 characters of feedback");
            return;
        }
        pop("Sending feedback...");
        const res = await ky.post(API + '/feedback/page', {
            json: {feedback, page: offset, docId}
        }).json() as {error: any}

        if (res.error) {
            pop(res.error, ERROR);
            return
        }
        pop("Feedback has been submitted.", "Thank you!");
        isFlaggingOpen = false;
    }
</script>

<svelte:window on:keydown={async (e) => {
	if (e.key === "ArrowRight") {
		await handlePageChange(docId, true);
        return;
	}
    if (e.key === "ArrowLeft") {
		await handlePageChange(docId, false);
	}
}} />
<div class="w-full flex m:flex-col lg:flex-row justify-center gap-2">
    <div class="lg:w-2/3">
        {#if paragrahs && paragrahs.length > 0}
            <div class="space-y-2">
                {#each paragrahs as p}
                    <Paragraph paragraph={paragraphSchema.parse(p.parse)} />
                {/each}
            </div>
        {/if}
        <div class="flex justify-between">
            <div></div>
            <div class="flex justify-center gap-2 mt-1 items-center">
                <Button variant="outline" on:click={async () =>	await handlePageChange(docId, false)}>← Prev</Button>
                <div class="p-2 rounded cursor-pointer">{offset+1}</div>
                <Button variant="outline" on:click={async () => await handlePageChange(docId, true)}>Next →</Button>
            </div>
            <Button variant="outline" on:click={()=>isFlaggingOpen=!isFlaggingOpen}>
                <Flag />
            </Button>
        </div>
    </div>
    <div class="lg:w-1/3 m:mt-2 m:mb-64">
        <WICPanel />
    </div>
</div>

<Dialog.Root bind:open={isFlaggingOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>What is wrong with the current page?</Dialog.Title>
            <Dialog.Description>
                Please leave your feedback below (optional).
            </Dialog.Description>
            <Textarea class="lg:h-40 m:h-20 text-base"
                      bind:value={feedback} placeholder="Type your message here." />
            <div class={`text-xs text-gray-500 text-right ${feedback?.length>1000?"text-red-500 font-bold":""}`}>
                {feedback?feedback.length:0}/1000 characters
            </div>
            <Button on:click={async ()=> await handleSubmitFeedback()}>Sumbit</Button>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>