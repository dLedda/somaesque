<script lang="ts">
    import {polycubes, solving, somaDimX, somaDimY, somaDimZ, totalVolume} from "../store";
    import {solve} from "../solve";
    import ActionButton from "./ActionButton.svelte";

    $: cubes = $polycubes;
    let noEmpties: boolean;
    let enoughSubcubes: boolean;
    let readyToSolve: boolean;
    let size: number;
    $: {
        size = cubes.reduce((prev, cube) => cube.size() + prev, 0);
        noEmpties = cubes.reduce((prev, cube) => (cube.size() !== 0) && prev, true);
        enoughSubcubes = size === $totalVolume;
        readyToSolve = enoughSubcubes && noEmpties;
    }

    function genTooltip() {
        let messages = [];
        if (!enoughSubcubes) {
            messages.push(`You have not input enough subcubes to form a rectangular prism with side lengths ${$somaDimX}, ${$somaDimY}, and ${$somaDimZ}. Needed: ${$totalVolume}, current: ${size}.`);
        }
        if (!noEmpties) {
            messages.push("You have left some of the polycube inputs empty. Remove them to solve.");
        }
        return messages.join("\n");
    }
</script>

<div class="container">
    <div class="solve">
        <ActionButton
            onClick={solve}
            tooltip={genTooltip(enoughSubcubes, noEmpties, size)}
            disabled={$solving || !readyToSolve}
            text={$solving ? "Solving..." : "Solve!"}/>
    </div>
    {#if $totalVolume > 32}
        <p class="warn">The total number of units exceeds 32. Attempting to solve puzzles with more than 32 units results in significantly slower computation time.</p>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-content: center;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
    }
    .warn {
        flex-basis: 7em;
        flex: 1;
        min-width: 7em;
        margin-left: 1em;
        color: red;
        text-align: left;
    }
    .solve {
        height: min-content;
        width: auto;
        font-size: 2em;
        margin: 0;
    }
</style>