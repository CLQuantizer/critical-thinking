<script lang="ts">
    import ky from "ky";
    import {chosenWordsStore, contextStore, pop, wicStore} from "$lib/store";
    import {sent2Para, type Sentence, type Token, type WordResp} from "$lib/client/schemas";
    import {API, PUNCT, strEqIgnCase} from "$lib/client/common";
    import {isStrEmpty} from "$lib/client/FeUtils";

    export let token: Token;
    export let sentence: Sentence;
    export let sentId: string;
    let isWaiting = false;

    $: newSentPlusId = sentence.sentence + sentId;
    $: isNewEqual2Old = strEqIgnCase(newSentPlusId, $contextStore.sentence + $contextStore.id);

    const handleWordClick = async () => {
        if (isWaiting) return;
        if ($wicStore.has(token.token)) {
            $chosenWordsStore = token.token;
            console.log("word already in store", token.token);
            return;
        }

        const parse = sent2Para(sentence);
        const payload = {word: token.token, parse};
        isWaiting = true;
        // pre request change of context
        // if sentence + id is different from the previous one, reset the store
        if (!isNewEqual2Old) {
            $contextStore = {id: sentId, sentence:sentence.sentence, translation: '', hash: ''};
        }
        $wicStore = new Map([...$wicStore, [token.token, {exp: null, base:null, hash:null}]]);
        $chosenWordsStore = token.token;
        try {
            const res = await ky.post(API + "/word", {
                json: payload,
                timeout: 10000, // 10 seconds
                retry: {
                    limit: 2,
                    methods: ['post'],
                    statusCodes: [408, 413, 429, 500, 502, 503, 504],
                    backoffLimit: 3000,
                    delay: (attemptCount) => Math.min(1000 * (attemptCount + 1), 3000)
                }}).json() as WordResp;
            if (!res) {
                return;
            }
            const context = res.context;
            const sentence = parse.paragraph;
            $contextStore = {id: sentId, sentence, translation: context.translation, hash: context.hash};
            if (res.error) {
                pop(`${token.token} still processing`);
                return;
            }
            pop(`Word ${token.token} has been added`);
            $wicStore = new Map([...$wicStore, [token.token, {exp: res.exp, base: res.base, hash: res.hash}]]);
        } catch (error) {
            $wicStore.delete(token.token);
            $wicStore = new Map($wicStore);
            $chosenWordsStore = [...$wicStore.keys()].pop()?.toString() || '';
            console.error('Error processing word:', error);
            pop(`System error, we're working on it`);
        } finally {
            isWaiting = false;
        }
    }
</script>

<!--if token.token is not empty-->
{#if !isStrEmpty(token.token)}
    {#if strEqIgnCase(token.pos, PUNCT)}
        <span class="whitespace-normal inline-block -ml-0.5 mr-1">
            {token.token}
        </span>
    {:else}
        <button class={`${strEqIgnCase(token.pos, "verb")? "bg-secondary/20" : ""}
        ${$wicStore.has(token.token)? " font-semibold bg-secondary/30 ring-2 italic " : ""}
        whitespace-normal inline-block mr-1 rounded-md
        hover:bg-secondary hover:ring-2 transition-all duration-300`}
                on:click={async () => await handleWordClick()} on:keydown={()=>{}}>
            {token.token}
        </button>
    {/if}
{/if}
