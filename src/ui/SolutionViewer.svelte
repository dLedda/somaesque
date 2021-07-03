<script lang="ts">
    import PolycubeScene from "./threedee/PolycubeScene";
    import {onMount} from "svelte";
    import {polycubes, selectedCube, solutions, activeSolution, showingSolution, somaDimX, somaDimY, somaDimZ} from "../store";
    import Solution2D from "./Solution2D.svelte";
    import VoxelSpaceBoolean from "../VoxelSpaceBoolean";

    $: cube = $polycubes[$selectedCube];
    $: soln = $solutions[$activeSolution];
    let el: HTMLCanvasElement;
    let scene: PolycubeScene;
    let loaded: boolean = false;

    onMount(() => {
        scene = new PolycubeScene(el, () => loaded = true, console.log);
    });

    window.getPermutations = () => {
        const newCube: VoxelSpaceBoolean = cube.clone() as VoxelSpaceBoolean;
        (newCube as VoxelSpaceBoolean).cullEmptySpace();
        return (newCube as VoxelSpaceBoolean).getAllPermutationsInPrism($somaDimX, $somaDimY, $somaDimZ);
    }

    window.showRot = (rot: VoxelSpaceBoolean) => {
        scene?.showPolycube(rot);
    }

    $: {
        if (loaded) {
            if ($showingSolution) {
                const colorMap = {};
                $polycubes.forEach((polycube, i) => colorMap[i] = polycube.color);
                scene?.showSolution(soln);
            } else {
                scene?.showPolycube(cube);
            }
        }
    }
</script>

<div class="top">
    {#if $activeSolution !== null}
        <div class="soln2d-container">
            <Solution2D/>
        </div>
    {/if}
    <canvas
        bind:this={el}
        width="640"
        height="480"
    ></canvas>
</div>

<style>
    .top {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .soln2d-container {
        display: inline-block;
    }
    canvas {
        display: inline-block;
        border-radius: 1em;
    }
</style>