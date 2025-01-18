<script>
    import {Button} from "$lib/components/ui/button/index";
    import {handleGoToCollections, updateSessionCookie} from "$lib/client/FeUtils";
    import {onMount} from "svelte";
    import {supa} from "$lib/client/supa";
    import {pop} from "$lib/store";
    import {goto} from "$app/navigation";

    let isErr = false;
    onMount(async () => {
        const {data} = await supa.auth.getSession();
        if (data.session) {
            updateSessionCookie(data.session);
            return;
        }
        pop("There was an error logging you in", "Error");
        isErr = true;
    });
</script>

{#if isErr}
    <div class="mb-3">There was an error logging you in. Please try again with the same browser you used to sign in.</div>
    <Button on:click={async ()=> await goto("/")}>Home Page</Button>
{:else}
    <div class="flex flex-col gap-2 items-center justify-center">
        <div>Login successful!</div>
        <Button on:click={async ()=> await handleGoToCollections()}>Start reading</Button>
    </div>
{/if}