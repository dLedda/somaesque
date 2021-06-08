<script lang="ts">
    import {polycubes, activeSolution, showingSolution, solutions} from "../store";
    import SomaSolution from "../SomaSolution";

    $: solutionDisplayed = $solutions[$activeSolution];
    $: dimension = (solutionDisplayed && solutionDisplayed.getDims?.()[0]) ?? 3;

    function colorAt(soln: SomaSolution, x: number, y: number, z: number) {
        return $polycubes[soln.at(z, dimension-1-x, y)].color;
    }
</script>

{#if $activeSolution !== null}
    <div
        class="cube"
        class:active={$showingSolution}
        style="--dimension: {dimension};"
        on:click={() => showingSolution.set(true)}
    >
        <h1>Solution #{$activeSolution + 1}</h1>
        <div class="center">
            {#each {length: dimension} as _, x}
                <div class="layer">
                    {#each {length: dimension} as _, y}
                        <div class="row">
                            {#each {length: dimension} as _, z}
                                <div
                                    class="cell"
                                    style="background-color:{colorAt(solutionDisplayed, x, y, z)}; border-color: {colorAt(solutionDisplayed, x, y, z)}"
                                    class:filled={true}
                                />
                            {/each}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    * {
        --cell-size: 30px;
    }
    .center {
        text-align: center;
    }
    h1 {
        font-size: 1em;
        text-align: center;
    }
    .cube.active {
        border: 3px solid #ff3e00;
    }
    .cube:hover:not(.active) {
        transform: scale(1.03);
        filter: brightness(1.1);
    }
    .cube {
        border-radius: 1em;
        border: 3px solid transparent;
        background-color: #666666;
        cursor: pointer;
        transition: transform 200ms;
        padding: 1em 2em 1em 2em;
        user-select: none;
    }
    .cell {
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
        text-align: center;
        cursor: pointer;
        display: inline-block;
        border: 1px var(--color) solid;
        border-radius: 4px;
        height: var(--cell-size);
        width: var(--cell-size);
        background-color: #aaaaaa;
        margin: 1px;
    }
    .row {
        display: flex;
        margin: 0;
        justify-content: center;
    }
    .layer {
        margin-top: 10px;
    }
    .filled {
        background: var(--color);
    }
</style>