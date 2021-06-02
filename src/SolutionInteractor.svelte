<script lang="ts">
    import {polycubes} from "./store";
    import CubeInput from "./CubeInput.svelte";
    import Polycube3D from "./Polycube3D.svelte";
    $: numCubes = $polycubes.length;
</script>

<div class="input-container">
    {#each {length: numCubes} as _, cubeNo}
        <div class="cube-input">
            <CubeInput
                cubeNo={cubeNo}
            />
        </div>
    {/each}
</div>
<div class="threedee">
    <Polycube3D/>
</div>

<style>
    .threedee {
        text-align: center;
    }
    .cube-input {
    }
    .input-container {
        padding: 1em;
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
    }
</style>