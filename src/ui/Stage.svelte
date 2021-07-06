<script lang="ts">
    import ThreeDee from "./ThreeDee.svelte";
    import CubeInputSet from "./CubeInputSet.svelte";
    import PolycubeScene from "./threedee/PolycubeScene";

    export let scene: PolycubeScene;
    let showInput = true;
    let smallViewport = true;

    function onMediaChange() {
        smallViewport = queryListWidth.matches || queryListHeight.matches;
    }

    const queryListWidth = window.matchMedia("(max-width: 1200px)");
    const queryListHeight = window.matchMedia("(max-height: 900px)");
    queryListWidth.addEventListener("change", onMediaChange);
    queryListHeight.addEventListener("change", onMediaChange);
    onMediaChange();
</script>

<div class="viewport">
    {#if smallViewport}
        <div class="tabs">
            <div class="tab" class:selected={showInput} on:click="{() => showInput = true}">Input</div>
            <div class="tab" class:selected={!showInput} on:click="{() => showInput = false}">3D</div>
        </div>
        {#if showInput}
            <CubeInputSet/>
        {:else}
            <ThreeDee scene="{scene}"/>
        {/if}
    {:else}
        <CubeInputSet/>
        <ThreeDee scene="{scene}"/>
    {/if}
</div>

<style>
    .tabs {
        height: 3em;
        flex: 0 1 auto;
        display: flex;
        cursor: pointer;
    }
    .tab {
        flex: 1;
        border: solid black;
        text-align: center;
        border-width: 0 1px 1px 1px;
        background-color: #555555;
        line-height: 3em;
        transition: background-color 100ms;
    }
    .tab:hover {
        background-color: #999999;
    }
    .tab.selected {
        background-color: grey;
        border-width: 1px 0 0 0;
    }
    .viewport {
        display: flex;
        height: 100%;
        width: 100%;
        align-content: center;
        justify-content: flex-start;
        flex-direction: column;
    }
</style>