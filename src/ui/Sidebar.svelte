<script lang="ts">
    import {
        isMaxPolycubes,
        isMinPolycubes,
        polycubes,
        solutions,
        solving,
        totalVolume,
        somaDimX,
        somaDimY,
        somaDimZ,
        MAX_DIMS,
        MIN_DIMS,
        solve
    } from "../store";
    import SolutionList from "./SolutionList.svelte";
    import IncDecNum from "./IncDecNum.svelte";

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
                <IncDecNum
                    title="X"
                    val="{$somaDimX}"
                    upDisabled="{$somaDimX >= MAX_DIMS}"
                    up="{() => somaDimX.set($somaDimX + 1)}"
                    downDisabled="{$somaDimX <= MIN_DIMS}"
                    down="{() => somaDimX.set($somaDimX - 1)}"
                />
                <IncDecNum
                    title="Y"
                    val="{$somaDimY}"
                    upDisabled="{$somaDimY >= MAX_DIMS}"
                    up="{() => somaDimY.set($somaDimY + 1)}"
                    downDisabled="{$somaDimY <= MIN_DIMS}"
                    down="{() => somaDimY.set($somaDimY - 1)}"
                />
                <IncDecNum
                    title="Z"
                    val="{$somaDimZ}"
                    upDisabled="{$somaDimZ >= MAX_DIMS}"
                    up="{() => somaDimZ.set($somaDimZ + 1)}"
                    downDisabled="{$somaDimZ <= MIN_DIMS}"
                    down="{() => somaDimZ.set($somaDimZ - 1)}"
                />
                {#if $totalVolume > 32}
                    <p class="warn">The total number of units exceeds 32. Attempting to solve puzzles with more than 32 units results in significantly slower computation time.</p>
                {/if}
            </div>
        </div>

        <div class="option">
            <p>Cubes:</p>
            <div class="choice">
                <IncDecNum
                    down="{polycubes.removeCube}"
                    downDisabled="{$isMinPolycubes}"
                    up="{polycubes.addCube}"
                    upDisabled="{$isMaxPolycubes}"
                    val="{numCubes}"
                />
            </div>
        </div>

        <div class="option">
            <button
                class="solve"
                on:click={solve}
                title="{genTooltip(enoughSubcubes, noEmpties, size)}"
                disabled="{$solving || !readyToSolve}">
                {$solving ? "Solving..." : "Solve!"}
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
        margin-top: 0.5em;
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
    button.solve {
        width: auto;
        color: white;
        background-color: #ff3e00;
        font-size: 2em;
        border-radius: 0.5em;
        border-style: none;
        margin: 0;
        cursor: pointer;
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
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }
    h1 {
        margin: 0;
        color: #ff3e00;
        font-size: 3em;
        font-weight: 100;
    }
</style>