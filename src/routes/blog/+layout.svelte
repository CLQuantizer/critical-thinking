<script>
    import {goto} from "$app/navigation";
    import {toggleMode} from "mode-watcher";
    import {MoonStar, Sun} from "lucide-svelte";
    import {Button} from "$lib/components/ui/button/index";
</script>

<div class="flex justify-between w-full pt-4 pb-2 px-6 gap-4">
    <Button on:click={async ()=> await goto("/")}>Home</Button>
    <button on:click={toggleMode}>
        <MoonStar class="hidden dark:block"/>
        <Sun class="dark:hidden"/>
    </button>
</div>
<div class="px-6">
    <slot />
</div>