<script lang="ts">
    export let up: () => void;
    export let down: () => void;
    export let val: number;
    export let upDisabled: boolean;
    export let title: string = "";
    export let downDisabled: boolean;
</script>

<div class="container">
    {#if title !== ""}
        <p class="title">{title}</p>
    {/if}
    <div class="controls">
        <button on:click={down} disabled={downDisabled}>-</button>
        <p class="val">{val}</p>
        <button on:click={up} disabled={upDisabled}>+</button>
    </div>
</div>

<style>
    .container {
        margin: 0 0.5em 0 0.5em;
        display: inline-block;
    }
    .title {
        margin: 0;
    }
    .val {
        font-weight: bold;
        margin-left: 0.2em;
        margin-right: 0.2em;
    }
    .controls {
        margin-top: 0;
    }
    .controls > * {
        display: inline-block;
    }
    button:hover:not(:disabled) {
        cursor: pointer;
        background-color: #c1c1c1;
    }
    button:disabled {
        color: #a7a7a7;
        background-color: #616161;
    }
</style>