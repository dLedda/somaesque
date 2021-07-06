<script lang="ts">
    import {solutions, activeSolution, showingSolution} from "../store";
    import List from "./List.svelte";

    function selectSolution(i: number) {
        activeSolution.set(i);
        showingSolution.set(true);
    }
</script>

<div class="container">
    <List
        activeItem={$activeSolution}
        items={$solutions.map((soln, i) => `Solution ${i + 1}`)}
        defaultText="No solutions yet..."
        onClick={(i) => selectSolution(i)}
    />
</div>

<style>
    .container {
        height: 100%;
        min-height: 10em;
    }
</style>