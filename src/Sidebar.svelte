<script lang="ts">
    import {isMaxDimension, isMinDimension, isMaxPolycubes, isMinPolycubes, somaDimension, polycubes, solutions} from "./store";
    import SomaSolution from "./solver/SomaSolution";
    import SolutionList from "./SolutionList.svelte";
    import VoxelSpace from "./solver/VoxelSpace";

    $: numCubes = $polycubes.length;
    $: cubes = $polycubes;
    let consoleOutput = "Press the solve button!";
    let solving = false;

    function solve() {
        consoleOutput = "Solving\n";
        const polycubes = cubes.map(cubeInput => cubeInput.rep);
        const worker = new Worker('../solver/main.js', {type: "module"});
        solving = true;
        worker.addEventListener('message', (event) => {
            solutions.set(event.data.map(solnData => {
                const solution = new SomaSolution(solnData.dim);
                solnData.solutionSpaces.forEach((voxelSpace, i) => solution.addSpace(new VoxelSpace(i, [solnData.dim, solnData.dim, solnData.dim], voxelSpace.space)));
                return solution;
            }));
            solving = false;
        });
        worker.postMessage({polycubes, dims: $somaDimension});
    }
</script>

<div class="container">
    <h1>Somaesque</h1>
    <h3>Settings</h3>

    <div class="option">
        <p>Cube Dimension: {$somaDimension}</p>
        <button on:click={somaDimension.dec} disabled={$isMinDimension}>-</button>
        <button on:click={somaDimension.inc} disabled={$isMaxDimension}>+</button>
    </div>

    <div class="option">
        <p>Cubes: {numCubes}</p>
        <button on:click={polycubes.removeCube} disabled={$isMinPolycubes}>-</button>
        <button on:click={polycubes.addCube} disabled={$isMaxPolycubes}>+</button>
    </div>

    <div class="option">
        <button on:click={solve}>{solving ? 'Solving...' : 'Solve'}</button>
    </div>

    <SolutionList/>
</div>

<style>
    p {
        display: inline-block;
    }
    button {
        display: inline-block;
    }
    .container {
        height: 100%;
        background-color: #333333;
        padding: 1em;
    }
    h1 {
        margin: 0;
        color: #ff3e00;
        font-size: 3em;
        font-weight: 100;
    }
</style>