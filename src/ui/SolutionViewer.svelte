<script lang="ts">
    import PolycubeScene from "./threedee/PolycubeScene";
    import {onMount} from "svelte";
    import {polycubes, selectedCube, solutions, activeSolution, showingSolution, cubeScene} from "../store";
    import Solution2D from "./Solution2D.svelte";

    $: cube = $polycubes[$selectedCube];
    $: soln = $solutions[$activeSolution];
    let el: HTMLDivElement;
    let scene: PolycubeScene;
    let loaded: boolean = false;

    const canvasStyle: Partial<CSSStyleDeclaration> = {
        borderRadius: "1em",
    };

    onMount(() => {
        cubeScene.onLoaded(() => {
            cubeScene.mount(el);
            Object.assign((el.children.item(0) as HTMLElement).style, canvasStyle);
            loaded = true;
        });
    });

    $: {
        if (loaded) {
            if ($showingSolution) {
                const colorMap = {};
                $polycubes.forEach((polycube, i) => colorMap[i] = polycube.color);
                cubeScene.showSolution(soln);
            } else {
                cubeScene.showPolycube(cube);
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
    <div class="stage" bind:this={el}></div>
</div>

<style>
    .top {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .soln2d-container {
        flex: 0 1 auto;
        display: inline-block;
    }
</style>