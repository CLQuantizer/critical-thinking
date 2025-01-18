<script lang="ts">
    import {goto, invalidateAll} from "$app/navigation";
    import {Button} from "$lib/components/ui/button";
    import {supa} from "$lib/client/supa";
    import {handleCheckOut} from "$lib/client/FeUtils";
    import 'tippy.js/dist/tippy.css';
    import {tooltip} from "$lib/client/FeUtils";
    import {API, ERROR, IMAGE_CDN_PREFIX} from "$lib/client/common";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Textarea } from "$lib/components/ui/textarea/index";
    import {pop} from "$lib/store";
    import ky from "ky";
    import {onMount} from "svelte";

    export let data;
    let url:string;
    let isFeedBackOpen=false;
    let checkingOutDocId: number;
    let feedback:string;

    $: docs = [...data.docs].sort((a: any, b:any) => b.timestamp - a.timestamp);

    const handleSubmitFeedback = async () => {
        if (!feedback) {
            pop("Please leave at least 10 characters of feedback");
            return
        }
        if (feedback?.length < 10) {
            pop("Please leave at least 10 characters of feedback");
            return;
        }
        if (feedback.length > 2000) {
            pop("Please leave less than 2000 characters of feedback");
            return;
        }
        pop("Sending feedback...");
        const res = await ky.post(API + '/feedback/submit', {
            json: {feedback},
        }).json() as {error:any}

        if (res.error) {
            pop(res.error, ERROR);
            return
        }
        pop("Feedback has been submitted.","Thank you!");
        isFeedBackOpen=false;
    }

    const handleSelectBook = async (docId: number, pages:number, offset: number) => {
        // guard clause
        const page = offset>=pages ? pages : offset;
        await goto(`/private/collections/${docId}/${page}`);
    }
    onMount(async ()=> await invalidateAll())
</script>

<div class="h-full w-full flex flex-col gap-2">
    {#if data.user}
        <div class="flex font-light justify-between items-center">
            <div>Signed in as: {data.user.email ?? "User"}</div>
            <div class="flex gap-2">
                <Button on:click={()=>isFeedBackOpen=!isFeedBackOpen}>Feedback</Button>
                <Button on:click={async () => {
                await supa.auth.signOut()
                await goto("/")
            }} variant="ghost">Logout</Button>
            </div>
        </div>
    {/if}
    {#if docs && docs.length > 0}
        <div class="grid lg:grid-cols-4 m:grid-cols-1 gap-2">
            {#each docs as doc, i}
                <div class="flex-col gap-2 flex rounded p-4 hover:ring bg-secondary/70 aspect-square"
                     tabindex="0" role="button" on:keydown={()=>{}}
                     on:click={async ()=> await handleSelectBook(doc.id, doc.pages, doc.offset)}>
                        <div class="flex gap-2 items-center">
                            <p class="text-xs font font-semibold rounded-full justify-center items-center flex
                             w-5 h-5 bg-primary/20 ">{i+1}</p>
                            <p class="p-2 rounded cursor-pointer font-light italic transition-all duration-200">
                                {doc.name}
                            </p>
                        </div>
                    {#if !doc.purchased}
                        <button class="w-min whitespace-nowrap rounded-full border px-4 py-1 hover:bg-foreground
                                        hover:text-background bg-background text-foreground text-sm"
                                use:tooltip={{content: "click to unlock the full book"}}
                                on:click|stopPropagation={async ()=> {
                                                checkingOutDocId = doc.id
                                                url = await handleCheckOut(doc.id)
                                        }}>
                            limited-access
                        </button>
                    {:else}
                        <button class="w-min whitespace-nowrap rounded-full border px-4 py-1 hover:bg-foreground
                                        hover:text-background bg-background text-foreground text-sm"
                                use:tooltip={{content: "click to read the full book"}}>
                            full-access
                        </button>
                    {/if}
                    {#if url && checkingOutDocId === doc.id}
                        <a class="w-min whitespace-nowrap rounded-full text-sm border bg-primary text-background
                        px-4 py-1 hover:bg-background hover:text-foreground"
                           on:click|stopPropagation={()=>{}} target="_blank" rel="noopener noreferrer" href={url}>
                            Click me if the checkout page did not open </a>
                    {/if}
                    <img class="rounded-lg aspect-square" src={IMAGE_CDN_PREFIX+doc.id+".png"} alt={doc.name}/>
                    <div class="bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                        <div class="bg-primary/60 h-1.5 rounded-full"
                             style="width:{((doc.offset+1)/ (doc.pages+1)) * 100}%"></div>
                    </div>
                    <p class="text-xs">{(1+doc.offset)} / {doc.pages+1} pages</p>
                </div>
            {/each}
        </div>
    {/if}
</div>

<Dialog.Root bind:open={isFeedBackOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>We appreciate your feedback</Dialog.Title>
            <Dialog.Description>
                Send in your words to make mywords better. Quality feedbacks will be rewarded with a free book
            </Dialog.Description>
            <Textarea class="lg:h-40 m:h-20 text-base"
                      bind:value={feedback} placeholder="Type your message here." />
            <div class={`text-xs text-gray-500 text-right ${feedback?.length>2000?"text-red-500 font-bold":""}`}>
                {feedback?feedback.length:0}/2000 characters
            </div>
            <Button on:click={async ()=> await handleSubmitFeedback()}>Sumbit</Button>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>