<script lang="ts">
    import {isMaxDimension, isMinDimension, isMaxPolycubes, isMinPolycubes, somaDimension, polycubes} from "./store";
    
    $: numCubes = $polycubes.length;

    function solve() {
        console.log("SOLVING!");
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
        <button on:click={solve}>Solve</button>
    </div>
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