<script lang="ts">
    import {BLOGS_PER_PAGE} from "$lib/client/common";
    import {Content, Ellipsis, Item, Link, NextButton, PrevButton, Root} from "$lib/components/ui/pagination";
    import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
    import ChevronRight from "svelte-radix/ChevronRight.svelte";
    import {goto} from "$app/navigation";

    export let data;
    $: blogs = data.blogs;
    $: count = data.count;
</script>

<div class="w-full mb-24">
    {#if count && count > 0}
        <div class="m-4">{count} phrases enregistrées</div>
        <div class="grid grid-cols-1 gap-2">
            {#each blogs as ctx}
                <div class="p-2 bg-primary/5 rounded flex flex-col gap-2">
                    <div class="p-4">
                        <div class="rounded flex gap-2 items-center italic font-light">
                            {ctx.text}
                        </div>
                        <div class="text-primary/50 flex gap-2 items-center font-light">
                            {ctx.translation}
                        </div>
                    </div>
                    <div class="whitespace-pre-line leading-none rounded border p-4 bg-secondary">
                        {ctx.remark}
                    </div>
                </div>
            {/each}
        </div>
        <!--    pagination -->
        <Root {count} perPage={BLOGS_PER_PAGE} siblingCount={1} let:pages let:currentPage>
            <Content class="pt-2">
                <Item>
                    <PrevButton class="bg-secondary/30"
                                on:click={async ()=> {
                    if (currentPage&&currentPage > 1) {
                        await goto(`/blog/${currentPage - 1}`);
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
                                    await goto(`/blog/${page.value}`);
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
                                    if (currentPage && currentPage < (count / BLOGS_PER_PAGE)) {
                                        await goto(`/blog/${currentPage + 1}`);
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