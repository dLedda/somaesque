<script lang="ts">
    import {somaDimension, polycubes, selectedCube} from "./store";
    export let cubeNo: number;

    $: dimension = $somaDimension;
    $: cube = $polycubes[cubeNo];
    $: cubeColor = cube.color;
    $: currentlyVisualised = $selectedCube === cubeNo;
    let cellStartDragInitialVal: boolean = false;
    let cellStartDrag: number = 0;
    let cellDragStartPos: {x: number, y: number} = {x: 0, y: 0};
    let cellEndDrag: number = 0;
    let cellDragEndPos: {x: number, y: number} = {x: 0, y: 0};

    function cellNo(x: number, y: number, z: number) {
        return dimension ** 2 * x + dimension * y + z;
    }

    function at(rep: bigint, x: number, y: number, z: number) {
        const mask = BigInt(1) << BigInt(cellNo(x, y, z));
        return (rep & mask) !== BigInt(0);
    }

    function onMouseOverCell(event: MouseEvent, x: number, y: number, z: number) {
        if (event.buttons !== 0) {
            polycubes.set(cubeNo, event.buttons === 1, x, y, z);
        }
    }

    function onMouseDownCell(event: MouseEvent, x: number, y: number, z: number) {
        cellStartDrag = cellNo(x, y, z);
        cellStartDragInitialVal = at(cube.rep, x, y, z);
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
</script>

<div
    class="cube"
    class:active={currentlyVisualised}
    style="--color: {cubeColor}; --dimension: {dimension};"
    on:contextmenu|preventDefault
    on:mousedown={() => selectedCube.set(cubeNo)}
>
    <h1>Cube: {cubeNo + 1}</h1>
    {#each {length: dimension} as _, x}
        <div class="layer">
            {#each {length: dimension} as _, y}
                <div class="row">
                {#each {length: dimension} as _, z}
                    <div
                        class="cell"
                        class:filled={at(cube.rep, x, y, z)}
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
    .active {
        border: 1px solid red;
    }
    h1 {
        font-size: 1em;
        text-align: center;
    }
    .cube {
        padding: 1em;
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
        margin: 0;
    }
    .layer {
        margin-top: 10px;
    }
    .filled {
        background: var(--color);
    }
</style>