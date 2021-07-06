<script lang="ts">
    import PolycubeScene from "./threedee/PolycubeScene";
    import {onMount} from "svelte";
    import {polycubes, solutions, activeSolution, showingSolution} from "../store";
    import Solution2D from "./Solution2D.svelte";
    import CubeInput from "./CubeInput.svelte";

    export let scene: PolycubeScene;
    const selectedStore = polycubes.selected();
    $: selectedCube = $selectedStore;
    $: cube = $polycubes[selectedCube];
    $: soln = $solutions[$activeSolution];
    let el: HTMLDivElement;
    let containerEl: HTMLDivElement;
    let loaded: boolean = false;

    const canvasStyle: Partial<CSSStyleDeclaration> = {
        borderRadius: "1em",
    };

    function updateDims() {
        if (window.innerWidth < 1200) {
            if (containerEl.clientHeight < containerEl.clientWidth * (3 / 4)) {
                scene.updateDims({width: (containerEl.clientHeight - 50) * (4 / 3), height: containerEl.clientHeight - 50});
            } else {
                scene.updateDims({width: containerEl.scrollWidth - 50, height: (containerEl.scrollWidth - 50) * (3 / 4)});
            }
        } else {
            scene.resetDims();
        }
    }

    onMount(() => {
        scene.onLoaded(() => {
            scene.mount(el);
            Object.assign((el.children.item(0) as HTMLElement).style, canvasStyle);
            loaded = true;
            window.addEventListener("resize", () => updateDims());
            updateDims();
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

<div class="container" bind:this={containerEl}>
    {#if $showingSolution && ($activeSolution !== null)}
        <div class="soln2d-container">
            <Solution2D/>
        </div>
    {:else if !$showingSolution}
        <div class="soln2d-container">
            <CubeInput cubeNo="{selectedCube}"/>
        </div>
    {/if}
    <div class="stage" bind:this={el}></div>
</div>

<style>
    .soln2d-container {
        flex: 0 1 auto;
        display: inline-block;
    }
    @media (max-width: 1200px) {
        .soln2d-container {
            display: none;
        }
    }
    .container {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-evenly;
        text-align: center;
        align-items: center;
        overflow: hidden;
    }
</style>