<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {getWordDetail} from "$lib/client/FeUtils";
    import WordDetail from "$lib/client/WordDetail.svelte";
    import {API, ERROR, strEqIgnCase, WORDS_PER_PAGE, WORDS_URL} from "$lib/client/common";
    import WordStats from "$lib/client/WordStats.svelte";
    import {slide} from "svelte/transition";
    import {Root, Content, Item, Link, Ellipsis, PrevButton, NextButton} from "$lib/components/ui/pagination/index";
    import {pop} from "$lib/store";
    import ky from "ky";
    import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
    import ChevronRight from "svelte-radix/ChevronRight.svelte";
    import {goto, invalidateAll} from "$app/navigation";

    export let data;
    const count = data.count;
    $: stats = data.stats as any;
    $: words = data.words;
    let word: any;
    let contexts: any;
    let resp: { word:any, contexts:any };
    let chosen: string|null = null;
    let lastChosen: string;
    let words2DeleteIds:number[]=[]
    let isEditing = false;

    const handleClickWord = async (id:number, w:string) => {
        if (!isEditing) {
            await handleFetchWord(w)
            return
        }
        if (words2DeleteIds.includes(id)) {
            words2DeleteIds = words2DeleteIds.filter(wordId => wordId !== id);
            return
        }
        words2DeleteIds = [...words2DeleteIds, id]
    }
    const handleFetchWord = async (w:string) => {
        if (strEqIgnCase(w, chosen)) {
            chosen = "";
            return;
        }
        if (strEqIgnCase(w, lastChosen)) {
            console.info("same word");
            chosen = w;
            return;
        }
        const res = await getWordDetail(w);
        if (!res){
            pop("Fail to get Word Detail","Error")
            return
        }
        resp = res
        word = resp.word;
        contexts = resp.contexts;
        chosen = w;
        lastChosen = w;
        console.log(data);
    }

    const handleStartEditing = ()=> {
        pop("Click on word to delete and submit")
        chosen = null;
        isEditing = !isEditing
    }

    const handleSubmitEdits = async ()=> {
        if (words2DeleteIds.length<1 ) {
            pop("No words to delete")
            return
        }
        const num = words2DeleteIds.length;
        pop(`Deleting ${num} word`)
        const res = await ky.post(API + '/words/delete', {
            json: {ids: [...new Set(words2DeleteIds)]}
        }).json() as {error:any}

        if (res.error) {
            pop(res.error, ERROR);
            isEditing = false;
            return;
        }
        await invalidateAll();
        words2DeleteIds = [];
        pop("Words deleted successfully", "Success");
        isEditing = false;
    }
</script>

<div class="w-full space-y-2">
    {#if count&&count>0}
        <WordStats {stats}/>
        <div class="flex gap-2 items-center">
            <div class="mb-2 font-light text-center">{count} mots enregistrées</div>
            <Button class="bg-primary/40" on:click={handleStartEditing}>
                {isEditing?"Editing":"Edit"}
            </Button>
            {#if isEditing}
                <Button on:click={async ()=> await handleSubmitEdits()}>
                    {isEditing?"Submit":"Edit"}
                </Button>
            {/if}
        </div>
        {#if words && words.length > 0 }
            <div class="flex flex-wrap gap-2">
                {#each words as w}
                    {#if w.word}
                        <Button variant={(isEditing&&words2DeleteIds.includes(w.id))?"destructive":"secondary"}
                                on:click={async ()=> await handleClickWord(w.id, w.word)}>{w.word}</Button>
                    {/if}
                    {#if strEqIgnCase(w.word, chosen)}
                        <div transition:slide={{duration: 300}}>
                            <WordDetail {word} {contexts}/>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
        <!--    pagination -->
        <Root {count} perPage={WORDS_PER_PAGE} siblingCount={1} let:pages let:currentPage>
            <Content class="pt-2">
                <Item>
                    <PrevButton class="bg-secondary/30"
                            on:click={async ()=> {
                        if (currentPage&&currentPage > 1) {
                            await goto(WORDS_URL + '/' + (currentPage - 1))
                            pop("Showing page " + (currentPage - 1))
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
                                await goto(WORDS_URL + '/' + page.value)
                                pop("Showing page " + page.value)
                            }}} isActive={currentPage === page.value}>
                                {page.value}
                            </Link>
                        </Item>
                    {/if}
                {/each}
                <Item>
                    <NextButton class="bg-secondary/30"
                            on:click={async ()=> {
                                if (currentPage && currentPage < (count / WORDS_PER_PAGE)) {
                                    await goto(WORDS_URL + '/' + (currentPage + 1))
                                    pop("Showing page " + (currentPage + 1))
                                }
                    }}>
                        <span class="m:hidden lg:block mr-2">Next</span>
                        <ChevronRight />
                    </NextButton>
                </Item>
            </Content>
        </Root>
    {/if}
</div>
