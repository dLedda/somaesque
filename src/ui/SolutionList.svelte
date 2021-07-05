<script lang="ts">
    import {solutions, activeSolution, showingSolution} from "../store";
    import List from "./List.svelte";

    function selectSolution(i: number) {
        activeSolution.set(i);
        showingSolution.set(true);
    }
</script>

<List
    activeItem={$activeSolution}
    items={$solutions.map((soln, i) => `Solution ${i + 1}`)}
    defaultText="No solutions yet..."
    onClick={(i) => selectSolution(i)}
/>