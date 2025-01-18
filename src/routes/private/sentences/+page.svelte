<script lang="ts">
    import {paragraphSchema} from "$lib/client/schemas";
    import Paragraph from "$lib/client/Paragraph.svelte";
    import ky from "ky";
    import {API, ERROR, SENTENCES_PER_TABLE} from "$lib/client/common";
    import {pop} from "$lib/store";
    import ChevronRight from "svelte-radix/ChevronRight.svelte";
    import {Content, Ellipsis, Item, Link, NextButton, PrevButton, Root} from "$lib/components/ui/pagination";
    import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
    import {Textarea} from "$lib/components/ui/textarea";
    import {Button} from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";

    export let data;
    let contexts = data.contexts;
    let chosenContextId:number;
    let isSentenceEditing = false;
    let chosenText:string;
    let chosenTranslation:string;
    let remark:string;
    let hash:string;
    const count = data.count;

    const handlePageQueryContexts = async (page:number)=> {
        const res = await ky.post(`${API}/sent/page`,
            {json: {page}}).json() as {error:any, contexts:any}
        if (res.error) {
            pop(res.error, ERROR);
            return
        }
        contexts = res.contexts;
    };

    const handleStartPublish = (ctx:{id:number, text:string, translation:string, hash:string})=> {
        chosenText = ctx.text;
        chosenTranslation = ctx.translation;
        hash = ctx.hash;
        chosenContextId = ctx.id
        isSentenceEditing = true;
    }

    const handleCreateBlog = async ()=> {
        const res = await ky.post(`${API}/sent/publish`,
            {json: {text:chosenText, translation:chosenTranslation,
                    hash, remark}}).json() as {error:any, success:boolean}
        if (res.error) {
            pop(res.error, ERROR);
            return
        }
        if (res.success) {
            // change status to 1
            contexts = contexts.map(ctx=> {
                if (ctx.id === chosenContextId) {
                    ctx.status = 1;
                }
                return ctx;
            });
            pop("Published", "success");
            isSentenceEditing = false;
        }
    }

</script>
<div class="w-full">
    {#if count && count > 0}
        <div class="my-2">{count} phrases enregistrées</div>
        <div class="flex flex-col gap-3">
            {#each contexts as ctx}
                <div class="rounded bg-primary/5 flex gap-2 items-center">
                    {#if ctx.status===0}
                        <Button on:click={()=>handleStartPublish(ctx)}>Publish</Button>
                    {:else }
                        <Button variant="outline">Published</Button>
                    {/if}
                    <Paragraph paragraph={paragraphSchema.parse(ctx.parse)}/>
                </div>
            {/each}
        </div>
        <!--    pagination -->
        <Root {count} perPage={SENTENCES_PER_TABLE} siblingCount={1} let:pages let:currentPage>
            <Content class="pt-2">
                <Item>
                    <PrevButton class="bg-secondary/30"
                                on:click={async ()=> {
                    if (currentPage&&currentPage > 1) {
                        await handlePageQueryContexts(currentPage - 1);
                    }}}>
                        <ChevronLeft />
                        <span class="m:hidden lg:block ml-2">Previous</span>
                    </PrevButton>
                </Item>
                {#each pages as page (page.key)}
                    {#if page.type === "ellipsis"}
                        <Item>
                            <Ellipsis />
                        </Item>
                    {:else}
                        <Item>
                            <Link {page} on:click={async ()=> {
                                if(page.value !== currentPage){
                                    await handlePageQueryContexts(page.value);
                                }}}
                                  isActive={currentPage === page.value}>
                                {page.value}
                            </Link>
                        </Item>
                    {/if}
                {/each}
                <Item>
                    <NextButton class="bg-secondary/30"
                                on:click={async ()=> {
                                    if (currentPage && currentPage < (count / SENTENCES_PER_TABLE)) {
                                        await handlePageQueryContexts(currentPage + 1);
                            }}}>
                        <span class="m:hidden lg:block mr-2">Next</span>
                        <ChevronRight />
                    </NextButton>
                </Item>
            </Content>
        </Root>
    {:else}
        <div class="my-2">No saved sentences yet</div>
    {/if}
</div>

{#if data?.user?.id===1}
    <Dialog.Root bind:open={isSentenceEditing}>
        <Dialog.Content>
            <Dialog.Header>
<!--                <Dialog.Title>Publishing:</Dialog.Title>-->
                <Dialog.Description>Text</Dialog.Description>
                <Textarea bind:value={chosenText} placeholder="Type your message here." />
                <Dialog.Description>Translation</Dialog.Description>
                <Textarea bind:value={chosenTranslation} placeholder="Type your message here." />
                <Dialog.Description>Remark</Dialog.Description>
                <Textarea class="h-36" bind:value={remark} placeholder="Type your message here." />
                <Button on:click={async ()=> await handleCreateBlog()}>Publish</Button>
            </Dialog.Header>
        </Dialog.Content>
    </Dialog.Root>
{/if}