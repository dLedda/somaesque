<script lang="ts">
    import {polycubes, solving, somaDimX, somaDimY, somaDimZ, totalVolume} from "../store";
    import {solve} from "../solve";

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

<button
    class="solve"
    on:click={solve}
    title="{genTooltip(enoughSubcubes, noEmpties, size)}"
    disabled="{$solving || !readyToSolve}">
    {$solving ? "Solving..." : "Solve!"}
</button>

<style>
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
</style>