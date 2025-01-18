<script lang="ts">
    import "../app.css";
    import {popStore} from "$lib/store";
    import {ModeWatcher, toggleMode} from "mode-watcher";
    import {Root, Title, Description} from "$lib/components/ui/alert";
    import {MoonStar, Sun} from "lucide-svelte";
</script>

<ModeWatcher />
<div class="flex flex-col w-screen">
    <div class="absolute flex justify-between w-full pt-6 pb-2 px-6 gap-4">
        <div></div>
        <button on:click={toggleMode}>
            <MoonStar class="hidden dark:block"/>
            <Sun class="dark:hidden"/>
        </button>
    </div>
    <slot></slot>
</div>

{#if $popStore.isPop}
    <Root class="fixed top-2 lg:right-2 p-4 lg:w-1/6 m:w-full h-min z-50">
        <Title>{$popStore.title}</Title>
        <Description>{$popStore.msg}</Description>
    </Root>
{/if}
