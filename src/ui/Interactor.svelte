<script lang="ts">
    import {polycubes} from "../store";
    import CubeInput from "./CubeInput.svelte";
    import SolutionViewer from "./SolutionViewer.svelte";
    $: numCubes = $polycubes.length;
    let showInput = true;
    let smallViewport = true;

    function onMediaChange() {
        smallViewport = queryListWidth.matches || queryListHeight.matches;
    }

    const queryListWidth = window.matchMedia("(max-width: 1200px)");
    const queryListHeight = window.matchMedia("(max-height: 920px)");
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
            <div class="input-container">
                {#each {length: numCubes} as _, cubeNo}
                    <div class="cube-input">
                        <div class="padder">
                            <CubeInput
                                cubeNo={cubeNo}
                            />
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="threedee">
                <SolutionViewer/>
            </div>
        {/if}
    {:else}
        <div class="input-container">
            {#each {length: numCubes} as _, cubeNo}
                <div class="cube-input">
                    <div class="padder">
                        <CubeInput
                                cubeNo={cubeNo}
                        />
                    </div>
                </div>
            {/each}
        </div>
        <div class="threedee">
            <SolutionViewer/>
        </div>
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
    .threedee {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        text-align: center;
    }
    .padder {
        padding: 1em;
    }
    .cube-input {
        margin: auto;
    }
    .input-container {
        flex: 1 1 auto;
        overflow-x: scroll;
        display: flex;
        flex-flow: row;
    }
    .viewport {
        overflow: scroll;
        display: flex;
        height: 100%;
        align-content: center;
        justify-content: flex-start;
        flex-direction: column;
    }
</style>