<script lang="ts">
    import CubeInput from "./CubeInput.svelte";
    import {polycubes} from "../store";

    export let numCubes;
    $: numCubes = $polycubes.length;
</script>

<div class="container">
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

<style>
    .padder {
        padding: 1em;
    }
    .cube-input {
        margin: auto;
    }
    .container {
        flex: 1 1 auto;
        overflow-x: scroll;
        display: flex;
        flex-flow: row;
        margin: auto;
    }
</style>