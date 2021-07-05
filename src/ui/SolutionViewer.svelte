<script lang="ts">
    import PolycubeScene from "./threedee/PolycubeScene";
    import {onMount} from "svelte";
    import {polycubes, solutions, activeSolution, showingSolution} from "../store";
    import Solution2D from "./Solution2D.svelte";

    export let scene: PolycubeScene;
    const selectedStore = polycubes.selected();
    $: selectedCube = $selectedStore;
    $: cube = $polycubes[selectedCube];
    $: soln = $solutions[$activeSolution];
    let el: HTMLDivElement;
    let loaded: boolean = false;

    const canvasStyle: Partial<CSSStyleDeclaration> = {
        borderRadius: "1em",
    };

    onMount(() => {
        scene.onLoaded(() => {
            scene.mount(el);
            Object.assign((el.children.item(0) as HTMLElement).style, canvasStyle);
            loaded = true;
        });
    });

    $: {
        if (loaded) {
            if ($showingSolution) {
                scene.showSolution(soln);
            } else {
                scene.showPolycube(cube);
            }
        }
    }
</script>

<div class="container">
    {#if $activeSolution !== null}
        <div class="soln2d-container">
            <Solution2D/>
        </div>
    {/if}
    <div class="stage" bind:this={el}></div>
</div>

<style>
    .soln2d-container {
        flex: 0 1 auto;
        display: inline-block;
    }
    .container {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-evenly;
        text-align: center;
        align-items: center;
    }
</style>