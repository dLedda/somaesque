<script lang="ts">
    import CubeInput from "./CubeInput.svelte";
    import {polycubes, somaDimX, somaDimY, somaDimZ} from "../store";

    export let numCubes;
    $: numCubes = $polycubes.length;

    window.addEventListener("keypress", () => {
        for (const cube of $polycubes) {
            console.log({
                name: "",
                dimX: $somaDimX,
                dimY: $somaDimY,
                dimZ: $somaDimZ,
                cubes: $polycubes.map(cube => ({space: cube.getRaw(), color: cube.getColor()})),
            });
        }
    });
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