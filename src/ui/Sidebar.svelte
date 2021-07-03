<script lang="ts">
    import {
        isMaxPolycubes,
        isMinPolycubes,
        polycubes,
        solutions,
        colorFromIndex,
        activeSolution, showingSolution, totalVolume, somaDimX, somaDimY, somaDimZ, debug
    } from "../store";
    import SolutionList from "./SolutionList.svelte";

    $: numCubes = $polycubes.length;
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
    <h1>Somaesque</h1>
    <div class="widgets">
        <div class="option">
            <p>Dimensions:</p>
            <div class="choice">
                X
                <input
                    type="number"
                    value="3"
                    on:input={(e) => somaDimX.set(e.target.valueAsNumber)}/>
                Y
                <input
                    type="number"
                    value="3"
                    on:input={(e) => somaDimY.set(e.target.valueAsNumber)}/>
                Z
                <input
                    type="number"
                    value="3"
                    on:input={(e) => somaDimZ.set(e.target.valueAsNumber)}/>
                {#if $totalVolume > 32}
                    <p class="warn">The total number of units exceeds 32. Attempting to solve puzzles with more than 32 units results in significantly slower computation time.</p>
                {/if}
            </div>
        </div>

        <div class="option">
            <p>Cubes:</p>
            <div class="choice">
                <button on:click={polycubes.removeCube} disabled={$isMinPolycubes}>-</button>
                <p>{numCubes}</p>
                <button on:click={polycubes.addCube} disabled={$isMaxPolycubes}>+</button>
            </div>
        </div>

        <div class="option">
            <button
                class="solve"
                on:click={solve}
                title="{genTooltip(enoughSubcubes, noEmpties, size)}"
                disabled="{solving || !readyToSolve}">
                {solving ? "Solving..." : "Solve!"}
            </button>
        </div>
    </div>
    <h3>Solutions: {$solutions.length}</h3>
    <SolutionList/>
</div>

<style>
    .warn {
        color: red;
    }
    p {
        margin: 0;
        display: inline-block;
    }
    .choice {
        display: block;
        text-align: center;
        margin-top: 1em;
    }
    input {
        display: inline-block;
        background-color: #999999;
        width: 3em;
        height: 2em;
        border-style: none;
    }
    .selected:disabled {
        color: white;
        background-color: #ff3e00;
    }
    button:hover:not(:disabled) {
        cursor: pointer;
        background-color: #c1c1c1;
    }
    button:disabled {
        color: #a7a7a7;
        background-color: #616161;
    }
    button.solve {
        width: auto;
        color: white;
        background-color: #ff3e00;
        font-size: 2em;
        border-radius: 0.5em;
        border-style: none;
        margin: 0;
    }
    button.solve:disabled {
        width: auto;
        color: #999999;
        background-color: #a36754;
        font-size: 2em;
    }
    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        background-color: #333333;
        padding: 1em;
        text-align: center;
    }
    .widgets {
        width: 100%;
    }
    .widgets:first-child {
        padding-top: 0;
    }
    .widgets:last-child {
        padding-bottom: 0;
    }
    .widgets > * {
        padding-top: 1em;
        padding-bottom: 1em;
    }
    h1 {
        margin: 0;
        color: #ff3e00;
        font-size: 3em;
        font-weight: 100;
    }
</style>