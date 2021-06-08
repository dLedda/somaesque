<script lang="ts">
    import {solutions, activeSolution, showingSolution} from "../store";

    function selectSolution(i: number) {
        activeSolution.set(i);
        showingSolution.set(true);
    }
</script>

<ul>
    {#if $solutions.length === 0}
        <li>No solutions yet...</li>
    {/if}
    {#each $solutions as soln, i}
        <li class:active={$activeSolution === i} on:click={() => selectSolution(i)}>
            Solution #{i + 1}
        </li>
    {/each}
</ul>

<style>
    li:hover:not(.active) {
        background-color: #aaaaaa;
    }
    li {
        transition: background-color 100ms;
        cursor: pointer;
        list-style: none;
        height: 2em;
        line-height: 2em;
    }
    ul {
        width: 100%;
        overflow-y: scroll;
        flex: 1;
        padding: 0.5em;
        margin: 0;
        text-align: center;
        background-color: #666;
    }
    .active {
        background-color: #ff3e00;
    }
</style>