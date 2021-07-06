<script lang="ts">
    import List from "./List.svelte";
    import {polycubes, examples, save} from "../store";
    import VoxelSpaceBigInt from "../VoxelSpaceBigInt";
    import ActionButton from "./ActionButton.svelte";

    const placeholder = "Give your puzzle a name";
    let untouchedInput: boolean = true;
    let currentName: string = placeholder;
    let lastClickedExample: number | null = null;

    function hydrateExample(exNo: number) {
        const example = $examples[exNo];
        polycubes.setCubes(example.cubes.map((cube, i) => new VoxelSpaceBigInt({
            id: i,
            dims: [example.dimX, example.dimY, example.dimZ],
            space: BigInt(cube.space),
            color: cube.color,
            cullEmpty: false,
        })));
        lastClickedExample = exNo;
    }

    function checkUntouched() {
        if (currentName === "") {
            untouchedInput = true;
        } else {
            untouchedInput = false;
        }
    }

    function onInput(e: InputEvent) {
        currentName = (e.target as HTMLInputElement).value;
        checkUntouched();
    }

    function onFocusText(e: FocusEvent) {
        if (untouchedInput) {
            currentName = "";
        }
    }

    function onBlurText(e: FocusEvent) {
        if (untouchedInput) {
            currentName = placeholder;
        }
    }
</script>

<div class="container">
    <List
        defaultText="No examples found..."
        items="{$examples.map(example => example.name)}"
        activeItem={lastClickedExample}
        onClick={(i) => hydrateExample(i)}
    />
</div>
<div class="save">
    <ActionButton
        onClick={() => save(currentName)}
        text={"Save as..."}
        disabled={untouchedInput}/>
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
    .save {
        white-space: nowrap;
        display: flex;
        flex-wrap: wrap;
        row-gap: 1em;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 1em;
    }
    input {
        flex-basis: 10em;
        flex: 1;
        max-width: 100%;
        min-width: 50%;
        margin: 0 0 0 0.5em;
        width: 100%;
    }
    .container {
        height: 10em;
    }
</style>