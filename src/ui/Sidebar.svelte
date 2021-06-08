<script lang="ts">
    import {isMaxPolycubes, isMinPolycubes, somaDimension, polycubes, solutions} from "../store";
    import SomaSolution from "../SomaSolution";
    import SolutionList from "./SolutionList.svelte";
    import VoxelSpace from "../VoxelSpace";

    $: numCubes = $polycubes.length;
    $: cubes = $polycubes;
    let noEmpties: boolean;
    let enoughSubcubes: boolean;
    let readyToSolve: boolean;
    let size: number;
    $: {
        const dim = $somaDimension as number;
        const polycubes: VoxelSpace[] = cubes.map(cubeInput => new VoxelSpace(0, [dim, dim, dim], cubeInput.rep));
        size = polycubes.reduce((prev, cube) => cube.size() + prev, 0);
        noEmpties = polycubes.reduce((prev, cube) => (cube.size() !== 0) && prev, true);
        enoughSubcubes = size === dim**3;
        readyToSolve = size === dim**3 && noEmpties;
    }
    let solving = false;
    const worker = new Worker('../solver/main.js', {type: "module"});

    async function respondWasm(event: MessageEvent) {
        const dim = $somaDimension as number;
        solutions.set(event.data.map((wasmSolution) => {
            const solnObj = new SomaSolution(dim);
            const spaceReps = wasmSolution.split(",");
            for (let i = 0; i < spaceReps.length; i++) {
                solnObj.addSpace(new VoxelSpace(i, [dim, dim, dim], BigInt(parseInt(spaceReps[i]))));
            }
            return solnObj;
        }));
        solving = false;
    }

    function respondJs(event: MessageEvent) {
        solutions.set(event.data.map(solnData => {
            const solution = new SomaSolution(solnData.dim);
            solnData.solutionSpaces.forEach((voxelSpace, i) => solution.addSpace(new VoxelSpace(i, [solnData.dim, solnData.dim, solnData.dim], voxelSpace.space)));
            return solution;
        }));
        solving = false;
    }

    function solveJs() {
        worker.onmessage = (e) => respondJs(e);
        const polycubes = cubes.map(cubeInput => cubeInput.rep);
        solving = true;
        worker.postMessage({type: 'js', polycubes, dims: $somaDimension});
    }

    function solveWasm() {
        worker.onmessage = (e) => respondWasm(e);
        const polycubes = cubes.map(cubeInput => cubeInput.rep);
        console.log(polycubes);
        solving = true;
        worker.postMessage({type: 'wasm', polycubes, dims: $somaDimension});
    }

    function genTooltip() {
        let messages = [];
        if (!enoughSubcubes) {
            messages.push(`You have not input enough subcubes to form a cube with a side length of ${$somaDimension}. Needed: ${$somaDimension**3}, current: ${size}.`);
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
            <p>Dimension:</p>
            <div class="choice">
                <button
                    class:selected={$somaDimension === 2}
                    on:click={() => somaDimension.set(2)}
                    disabled={$somaDimension === 2}>
                    2
                </button>
                <button
                    class:selected={$somaDimension === 3}
                    on:click={() => somaDimension.set(3)}
                    disabled={$somaDimension === 3}>
                    3
                </button>
                <button
                    class:selected={$somaDimension === 4}
                    on:click={() => somaDimension.set(4)}
                    disabled={$somaDimension === 4}>
                    4
                </button>
            </div>
        </div>

        <div class="option">
            <p>Cubes:</p>
            <div class="choice">
                <p>{numCubes}</p>
                <button on:click={polycubes.removeCube} disabled={$isMinPolycubes}>-</button>
                <button on:click={polycubes.addCube} disabled={$isMaxPolycubes}>+</button>
            </div>
        </div>

        <div class="option">
            <button
                class="solve"
                on:click={solveWasm}
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
    p {
        margin: 0;
        display: inline-block;
    }
    .choice {
        display: block;
        text-align: center;
        margin-top: 1em;
    }
    button {
        display: inline-block;
        background-color: #999999;
        width: 2em;
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