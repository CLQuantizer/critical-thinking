<script lang="ts">
    import {toggleMode} from "mode-watcher";
    import {Button} from "$lib/components/ui/button/index";
    import {MoonStar, Sun} from "lucide-svelte";
</script>

<div class="flex justify-end w-full pt-4 pb-2 px-6 gap-4">
    <Button variant="secondary" on:click={()=> window.location.href="/"}>Home</Button>
    <button on:click={toggleMode}>
        <MoonStar class="hidden dark:block"/>
        <Sun class="dark:hidden"/>
    </button>
</div>

<div class="flex justify-center p-4">
    <div class="m:w-full lg:w-96 bg-secondary flex rounded flex-col p-6">
        <slot/>
    </div>
</div>