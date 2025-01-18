<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {handleCheckOut} from "$lib/client/FeUtils";

    export let data;
    $: doc = data.doc;
</script>

<div class="flex flex-col gap-3 justify-center items-center whitespace-normal p-2">
    <div>Please purchase <b>{doc.name}</b> to continue reading it</div>
    <Button on:click={async () => await handleCheckOut(doc.id)}>Purchase</Button>
</div>