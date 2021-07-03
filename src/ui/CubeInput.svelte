<script lang="ts">
    import {somaDimX, somaDimY, somaDimZ, polycubes, selectedCube, showingSolution} from "../store";
    import VoxelSpaceBoolean from "../VoxelSpaceBoolean";
    export let cubeNo: number;

    $: cube = $polycubes[cubeNo] as VoxelSpaceBoolean;
    $: cubeColor = cube.getColor();
    $: currentlyVisualised = $selectedCube === cubeNo && !$showingSolution;
    let cellStartDragInitialVal: boolean = false;
    let cellStartDrag: number = 0;
    let cellDragStartPos: {x: number, y: number} = {x: 0, y: 0};
    let cellEndDrag: number = 0;
    let cellDragEndPos: {x: number, y: number} = {x: 0, y: 0};
    let picker: HTMLInputElement;

    function cellNo(x: number, y: number, z: number) {
        return $somaDimY * $somaDimZ * x + $somaDimZ * y + z;
    }

    function at(cube: VoxelSpaceBoolean, x: number, y: number, z: number) {
        return cube.at(x, y, z);
    }

    function onMouseOverCell(event: MouseEvent, x: number, y: number, z: number) {
        if (event.buttons !== 0) {
            polycubes.set(cubeNo, event.buttons === 1, x, y, z);
            selectedCube.set(cubeNo);
        }
    }

    function onMouseDownCell(event: MouseEvent, x: number, y: number, z: number) {
        cellStartDrag = cellNo(x, y, z);
        cellStartDragInitialVal = at(cube, x, y, z);
        cellDragStartPos.x = event.clientX;
        cellDragStartPos.y = event.clientY;
    }

    function onMouseUpCell(event: MouseEvent, x: number, y: number, z: number) {
        cellEndDrag = cellNo(x, y, z);
        cellDragEndPos.x = event.clientX;
        cellDragEndPos.y = event.clientY;
        if (cellStartDrag === cellEndDrag && dragDist() < 30) {
            let val;
            if (event.button === 0) {
                val = !cellStartDragInitialVal;
            } else if (event.button === 2) {
                val = false;
            }
            polycubes.set(cubeNo, val, x, y, z);
        }
    }

    function dragDist() {
        return Math.sqrt((cellDragStartPos.x - cellDragEndPos.x) ** 2 + (cellDragStartPos.y - cellDragEndPos.y) ** 2);
    }

    function onClickCube() {
        showingSolution.set(false);
        selectedCube.set(cubeNo);
    }

    function onColorChange(event: InputEvent) {
        polycubes.setColor(cubeNo, event.target.value);
    }
</script>

<div
    class="cube"
    class:active={currentlyVisualised}
    style="--color: {cubeColor};"
    on:contextmenu|preventDefault
    on:mousedown={onClickCube}
>
    <div class="header">
        <h1>Cube: {cubeNo + 1}</h1>
        <div class="colorPickerBtn" on:click={picker.click()}>
            <input
                bind:this={picker}
                class="colorPicker"
                type="color"
                value="{cubeColor}"
                on:change={(event) => onColorChange(event)}/>
        </div>
    </div>
    {#each {length: $somaDimX} as _, x}
        <div class="layer">
            {#each {length: $somaDimY} as _, y}
                <div class="row">
                {#each {length: $somaDimZ} as _, z}
                    <div
                        class="cell"
                        class:filled={at(cube, x, y, z)}
                        on:mousemove={(event) => onMouseOverCell(event, x, y, z)}
                        on:mousedown={(event) => onMouseDownCell(event, x, y, z)}
                        on:mouseup={(event) => onMouseUpCell(event, x, y, z)}
                    />
                {/each}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    * {
        --cell-size: 30px;
    }
    .header {
        text-align: center;
        display: flex;
        align-content: center;
        justify-content: space-between;
    }
    .header > * {
        display: inline-block;
    }
    .colorPicker {
        visibility: hidden;
        width: 0;
        height: 0;
    }
    .colorPickerBtn {
        align-self: center;
        background-image: url("../resources/ColorWheel.png");
        background-size: cover;
        width: 1.5em;
        height: 1.5em;
    }
    .cube.active {
        border: 3px solid #ff3e00;
    }
    h1 {
        font-size: 1em;
        text-align: center;
    }
    .cube:hover:not(.active) {
        transform: scale(1.03);
        filter: brightness(1.1);
    }
    .cube {
        border-radius: 1em;
        border: 3px solid transparent;
        background-color: #666666;
        cursor: pointer;
        transition: transform 200ms;
        padding: 1em 2em 1em 2em;
        user-select: none;
    }
    .cell {
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
        text-align: center;
        cursor: pointer;
        display: inline-block;
        border: 1px var(--color) solid;
        border-radius: 4px;
        height: var(--cell-size);
        width: var(--cell-size);
        background-color: #aaaaaa;
        margin: 1px;
    }
    .row {
        display: flex;
        align-content: center;
        justify-content: center;
        margin: 0;
    }
    .layer {
        margin-top: 10px;
    }
    .filled {
        background: var(--color);
    }
</style>