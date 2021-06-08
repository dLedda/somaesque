<script lang="ts">
    import PolycubeScene from "./threedee/PolycubeScene.ts";
    import {onMount} from "svelte";
    import {polycubes, somaDimension, selectedCube, solutions, activeSolution, showingSolution} from "../store";
    import Solution2D from "./Solution2D.svelte";

    $: cube = $polycubes[$selectedCube];
    $: soln = $solutions[$activeSolution];
    let el: HTMLCanvasElement;
    let threeTest: PolycubeScene;
    let loaded: boolean = false;

    onMount(() => {
        threeTest = new PolycubeScene(el, () => loaded = true, console.log);
    });

    $: {
        if (loaded) {
            if ($showingSolution) {
                const colorMap = {};
                $polycubes.forEach((polycube, i) => colorMap[i] = polycube.color);
                threeTest?.showSolution(soln, colorMap);
            } else {
                threeTest?.showPolycube(cube.rep, $somaDimension, cube.color);
            }
        }
    }
</script>

<div class="top">
    <div class="soln2d-container">
        <Solution2D/>
    </div>
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