<script lang="ts">
    import {SvelteComponent} from "svelte/internal";

    export let selectedTab: string;
    export let tabs: Record<string, SvelteComponent>;

    $: displayedComponent = tabs[selectedTab];
</script>

<div class="tabs">
    {#each Object.keys(tabs) as key}
        <div class="tab" class:selected={selectedTab === key} on:click="{() => selectedTab = key}">{key}</div>
    {/each}
</div>
<div class="container">
    <svelte:component this={displayedComponent}/>
</div>

<style>
    .container {
        background-color: #666666;
        padding: 1em;
        border-radius: 0 0 1em 1em;
    }
    .tabs {
        height: 3em;
        flex: 0 1 auto;
        display: flex;
        cursor: pointer;
    }
    .tab {
        flex: 1;
        text-align: center;
        border-radius: 1em 1em 0 0;
        background-color: #555555;
        line-height: 3em;
        transition: background-color 100ms;
    }
    .tab:hover {
        background-color: #999999;
    }
    .tab.selected {
        background-color: #666666;
    }
</style>