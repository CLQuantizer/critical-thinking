<script lang="ts">
    import Paragraph from "$lib/client/Paragraph.svelte";
    import type {Para} from "$lib/client/schemas";

    export let word: string
    export let base: string;
    export let exp: Para;
</script>

<div class="w-full flex flex-col gap-2 p-2 rounded bg-secondary/60">
    <div class="flex items-center gap-2">
        <b>{word}</b>
    </div>
    <div class="font-light">{base}</div>
    <Paragraph paragraph={exp} />
</div>
