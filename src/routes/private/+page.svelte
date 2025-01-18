<script lang="ts">
    import {pop} from "$lib/store";
    import {Button} from "$lib/components/ui/button/index";

    export let data;

</script>

<div class="flex flex-col items-center">
    <b>Private page</b>
    {#if data.user}
        <span class="signedInText">
          Signed in as {data.user.email ?? "User"}
        </span>
    {/if}
    <div>
        <form method="post" action="/logout">
            <button>Logout</button>
        </form>
        <Button on:click={()=>pop("Pop up stuff")}>Pop</Button>
    </div>
</div>
