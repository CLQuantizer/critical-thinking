<script lang="ts">
    import {Button} from "$lib/components/ui/button/index";
    import {toggleMode} from "mode-watcher";
    import {goto} from "$app/navigation";
    import {BookHeart, ChartNoAxesCombined, LibraryBig, MoonStar, SquareChartGantt, Sun} from "lucide-svelte";
    import 'tippy.js/dist/tippy.css';
    import {tooltip} from "$lib/client/FeUtils";
    import ky from "ky";
    import {API} from "$lib/client/common";
    import {userHasOffsetStore} from "$lib/store";

    export let data;
    $: $userHasOffsetStore = data.userHasOffset;


    const handleRedirect2RecentPage = async () => {
        const res = await ky.post(API + "/recent").json() as {url: string};
        await goto(res.url);
    }
</script>

<div class="flex justify-between w-full p-2 gap-2 bg-primary/20">
    <Button class="flex items-center gap-2" variant="secondary" on:click={()=> goto("/private/collections")}>
        <LibraryBig /><p class="m:hidden lg:block">Collections</p>
    </Button>
    {#if $userHasOffsetStore}
        <Button class="flex items-center gap-2" variant="secondary" on:click={async ()=> await handleRedirect2RecentPage()}>
            <BookHeart /><p class="m:hidden lg:block">Recent page</p></Button>
    {/if}
    <Button class="flex items-center gap-2" variant="secondary" on:click={()=> goto("/private/words")}>
        <ChartNoAxesCombined /><p class="m:hidden lg:block">Words</p> </Button>
    <Button class="flex items-center gap-2" variant="secondary" on:click={()=> goto("/private/sentences")}>
        <SquareChartGantt /><p class="m:hidden lg:block">Sentences</p></Button>
    <button class="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm px-2 rounded" on:click={toggleMode}>
        <MoonStar class="hidden dark:block"/>
        <Sun class="dark:hidden"/>
    </button>
</div>
<div class="flex justify-center">
    <div use:tooltip={{content: "mywords.io is currently a beta product", offset: [0, -100]}}
         class="m:hidden lg:block"></div>
    <div class="w-full container mx-auto p-2">
        <slot></slot>
    </div>
</div>
