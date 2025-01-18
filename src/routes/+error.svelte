<script>
import {Button} from "$lib/components/ui/button/index";
</script>

<div class="flex flex-col justify-center items-center h-screen w-screen gap-2">
    Something went wrong
    <Button on:click={()=>window.location.href="/"}>Go to home page</Button>
</div>