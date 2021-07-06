<script lang="ts">
    import {somaDimX, somaDimY, somaDimZ, totalVolume, polycubes, isMinPolycubes, isMaxPolycubes} from "../store";
    import IncDecNum from "./IncDecNum.svelte";
    import PolycubeStore from "../stores/PolycubeStore";

    $: numCubes = $polycubes.length;
</script>

<div class="option">
    <p>Dimensions:</p>
    <IncDecNum
            title="X"
            val="{$somaDimX}"
            upDisabled="{$somaDimX >= PolycubeStore.MAX_DIMS}"
            up="{() => somaDimX.set($somaDimX + 1)}"
            downDisabled="{$somaDimX <= PolycubeStore.MIN_DIMS}"
            down="{() => somaDimX.set($somaDimX - 1)}"
    />
    <IncDecNum
            title="Y"
            val="{$somaDimY}"
            upDisabled="{$somaDimY >= PolycubeStore.MAX_DIMS}"
            up="{() => somaDimY.set($somaDimY + 1)}"
            downDisabled="{$somaDimY <= PolycubeStore.MIN_DIMS}"
            down="{() => somaDimY.set($somaDimY - 1)}"
    />
    <IncDecNum
            title="Z"
            val="{$somaDimZ}"
            upDisabled="{$somaDimZ >= PolycubeStore.MAX_DIMS}"
            up="{() => somaDimZ.set($somaDimZ + 1)}"
            downDisabled="{$somaDimZ <= PolycubeStore.MIN_DIMS}"
            down="{() => somaDimZ.set($somaDimZ - 1)}"
    />
</div>

<div class="option">
    <p>Cubes:</p>
    <IncDecNum
        down="{() => polycubes.removeCube()}"
        downDisabled="{$isMinPolycubes}"
        up="{() => polycubes.addCube()}"
        upDisabled="{$isMaxPolycubes}"
        val="{numCubes}"
    />
</div>

<style>
</style>