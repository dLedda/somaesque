<script lang="ts">
    import {solutions, activeSolution, showingSolution} from "./store";

    function selectSolution(i: number) {
        activeSolution.set(i);
        showingSolution.set(true);
    }
</script>

<h3>Solutions: {$solutions.length}</h3>
<ul>
    {#each $solutions as soln, i}
        <li class:active={$activeSolution === i} on:click={() => selectSolution(i)}>
            Solution #{i + 1}
        </li>
    {/each}
</ul>

<style>
    li:hover:not(.active) {
        background-color: #666666;
    }
    li {
        transition: background-color 200ms;
        cursor: pointer;
    }
    .active {
        background-color: #ff3e00;
    }
</style>