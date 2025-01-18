<script lang="ts">
    import WordDetail from "$lib/client/WordDetail.svelte";
    export let data;
    $: word = data.word;
    $: contexts = data.contexts
</script>

<WordDetail {word} {contexts} />