<script lang="ts">

    import WordStats from "$lib/client/WordStats.svelte";
    import {Button} from "$lib/components/ui/button";
    export let data
    $: stats = data.stats as any[];
    $: emails = data.emails
    $: feedbacks = data.feedbacks as any[]
    $: logs = data.logs as any[]
</script>

<WordStats {stats}/>
<div class="grid lg:grid-cols-2 m:grid-cols-1 p-2 space-y-1 gap-2">
    {#if emails && emails.length>0}
        <div class="space-y-1">
            <p>Sign ups:</p>
            {#each emails as email}
                <div class="flex gap-2 items-center justify-between">
                    <Button variant="secondary">
                        {email.email}
                    </Button>
                    {email.date?.toDateString()}
                </div>
            {/each}
        </div>
    {/if}
    {#if feedbacks && feedbacks.length>0}
        <div class="space-y-1">
            <div>Feedbacks</div>
            {#each feedbacks as fb}
                <div class="space-y-1">
                    <Button>{fb.email}</Button>
                    <div class="rounded p-2 bg-secondary">{fb.feedback}</div>
                </div>
            {/each}
        </div>
    {/if}
    {#if logs && logs.length>0}
        <div class="space-y-1">
            <div>Reads</div>
            {#each logs as log}
                <div class="flex gap-2 items-center space-y-1 justify-between">
                    <p>{log.email}</p>
                    <p>{log.document_name} -- {log.page}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>