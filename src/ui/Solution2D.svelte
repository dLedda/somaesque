<script lang="ts">
    import {activeSolution, showingSolution, solutions} from "../store";
    import SomaSolution from "../SomaSolution";

    $: solnToShow = $solutions[$activeSolution];
    $: dims = (solnToShow?.getDims?.()) ?? [3, 3, 3];

    function colorAt(soln: SomaSolution, x: number, y: number, z: number) {
        return solnToShow.getPieces()[soln.at(x, y, z)]?.getColor?.() ?? "red";
    }
</script>

{#if $activeSolution !== null}
    <div
        class="cube"
        class:active={$showingSolution}
        on:click={() => showingSolution.set(true)}
    >
        <h1>Solution #{$activeSolution + 1}</h1>
        <div class="center">
            {#each {length: dims[0]} as _, x}
                <div class="layer">
                    {#each {length: dims[1]} as _, y}
                        <div class="row">
                            {#each {length: dims[2]} as _, z}
                                <div
                                    class="cell"
                                    style="background-color:{colorAt(solnToShow, x, y, z)}; border-color: {colorAt(solnToShow, x, y, z)}"
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