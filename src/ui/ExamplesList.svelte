<script lang="ts">
    import List from "./List.svelte";
    import {polycubes, examples, serialiseCurrentInput} from "../store";
    import VoxelSpaceBigInt from "../VoxelSpaceBigInt";

    const placeholder = "Give your puzzle a name";
    let untouchedInput = true;
    let currentName = placeholder;
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

    function onInput(e: InputEvent) {
        currentName = (e.target as HTMLInputElement).value;
    }

    function onFocusText(e: FocusEvent) {
        if (untouchedInput) {
            currentName = "";
            untouchedInput = false;
        }
    }

    function onBlurText(e: FocusEvent) {
        if (currentName === "") {
            currentName = placeholder;
            untouchedInput = true;
        }
    }

    function save() {
        const save = serialiseCurrentInput();
        save["name"] = currentName;
        const saveString = JSON.stringify(save);
        let oldSaves = window.localStorage.getItem("saves");
        if (oldSaves !== null) {
            oldSaves += "@";
        } else {
            oldSaves = "";
        }
        window.localStorage.setItem("saves", oldSaves + saveString);
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
<div class="flex">
    <button on:click={save}>Save as...</button>
    <input
        class:untouchedInput
        value="{currentName}"
        on:focus={onFocusText}
        on:input={onInput}
        on:blur={onBlurText}
        type="text"/>
</div>

<style>
    .untouchedInput {
        color: grey;
    }
    button {
        white-space: nowrap;
    }
    .flex {
        display: flex;
    }
    .container {
        height: 10em;
    }
</style>