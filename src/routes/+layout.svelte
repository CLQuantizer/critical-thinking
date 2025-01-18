<script lang="ts">
    import "../app.css";
    import {popStore} from "$lib/store";
    import {ModeWatcher} from "mode-watcher";
    import {Root, Title, Description} from "$lib/components/ui/alert";
</script>

<ModeWatcher />
<div class="flex flex-col w-screen">
    <slot></slot>
</div>

{#if $popStore.isPop}
    <Root class="fixed top-2 lg:right-2 p-4 lg:w-1/6 m:w-full h-min z-50">
        <Title>{$popStore.title}</Title>
        <Description>{$popStore.msg}</Description>
    </Root>
{/if}
