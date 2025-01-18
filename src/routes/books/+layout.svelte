<script lang="ts">
    import {Description, Root, Title} from "$lib/components/ui/alert";
    import {ModeWatcher, toggleMode} from "mode-watcher";
    import {popStore} from "$lib/store";
    import {MoonStar, Sun} from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";

    export let data;
</script>

<ModeWatcher />

{#if $popStore.isPop}
    <Root class="fixed top-2 lg:right-2 p-4 lg:w-1/6 m:w-full h-min z-50">
        <Title>{$popStore.title}</Title>
        <Description>{$popStore.msg}</Description>
    </Root>
{/if}

<div class="container mx-auto p-6">
    <div class="flex flex-col gap-2">
        <div class="justify-between w-full flex gap-2">
            <Button on:click={()=> window.location.href="/auth/login"}>Login</Button>
            <button on:click={toggleMode}>
                <MoonStar class="hidden dark:block"/>
                <Sun class="dark:hidden"/>
            </button>
        </div>
    </div>
    <slot />
    <div class="flex flex-col text-xl underline gap-2">
        {#each data.book as book}
            <a class="hover:text-blue-700" href={"/books/"+book.id}>{book.name}</a>
        {/each}
    </div>
</div>