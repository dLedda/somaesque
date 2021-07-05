<script lang="ts">
    import List from "./List.svelte";
    import {polycubes, examples} from "../store";
    import VoxelSpaceBigInt from "../VoxelSpaceBigInt";

    let lastClickedExample = 0;

    function hydrateExample(exNo: number) {
        const example = examples[exNo];
        polycubes.setCubes(example.cubes.map((cube, i) => new VoxelSpaceBigInt({
            id: i,
            dims: [example.dimX, example.dimY, example.dimZ],
            space: cube.space,
            color: cube.color,
            cullEmpty: false,
        })));
        lastClickedExample = exNo;
    }
</script>

<div class="container">
    <List
        defaultText="No examples found..."
        items="{examples.map(example => example.name)}"
        activeItem={lastClickedExample}
        onClick={(i) => hydrateExample(i)}
    />
</div>

<style>
    .container {
        max-height: 10em;
        overflow-x: hidden;
    }
</style>