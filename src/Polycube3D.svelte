<script lang="ts">
    import PolycubeScene from "./threeTest.ts";
    import {onMount} from "svelte";
    import {polycubes, somaDimension, selectedCube} from "./store";
    import VoxelSpace from "./solver/VoxelSpace.ts";
    
    $: cube = $polycubes[$selectedCube];
    let el: HTMLCanvasElement;
    let threeTest: TestScene;

    onMount(() => {
        threeTest = new PolycubeScene(el);
    });

    $: threeTest?.setPolycube(cube.rep, $somaDimension, cube.color);
</script>

<canvas 
    bind:this={el} 
    width="640" 
    height="480"
></canvas>