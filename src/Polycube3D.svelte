<script lang="ts">
    import PolycubeScene from "./PolycubeScene.ts";
    import {onMount} from "svelte";
    import {polycubes, somaDimension, selectedCube, solutions, activeSolution, showingSolution} from "./store";

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
                threeTest?.setSolution(soln, colorMap);
            } else {
                threeTest?.setPolycube(cube.rep, $somaDimension, cube.color);
            }
        }
    }
</script>

<canvas 
    bind:this={el} 
    width="640" 
    height="480"
></canvas>

<style>
    canvas {
        border-radius: 1em;
    }
</style>