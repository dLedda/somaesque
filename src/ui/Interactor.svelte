<script lang="ts">
    import {polycubes} from "../store";
    import CubeInput from "./CubeInput.svelte";
    import SolutionViewer from "./SolutionViewer.svelte";
    $: numCubes = $polycubes.length;
</script>

<div class="viewport">
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
</div>

<style>
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
        flex: 0 1 fit-content;
        overflow-x: scroll;
        display: flex;
        flex-flow: row;
    }
    .viewport {
        display: flex;
        height: 100%;
        align-content: center;
        justify-content: center;
        flex-direction: column;
    }
</style>