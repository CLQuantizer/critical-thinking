<script lang="ts">
  import {Button} from "$lib/components/ui/button/index";
  import {toggleMode} from "mode-watcher";
  import Landing from "$lib/client/Landing.svelte";
  import {MoonStar, Sun} from "lucide-svelte";
  import {BLOGS_URL} from "$lib/client/common";

</script>
<div>
    <div class="flex justify-between w-full pt-4 pb-2 px-6 gap-4">
        <div></div>
<!--        <a href={BLOGS_URL}>-->
<!--            <Button>Blog</Button>-->
<!--        </a>-->
        <div class="flex gap-4 items-center">
            <button on:click={toggleMode}>
                <MoonStar class="hidden dark:block"/>
                <Sun class="dark:hidden"/>
            </button>
        </div>
    </div>
</div>
<div class="p-2">

</div>
