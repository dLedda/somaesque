<script lang="ts">
    export let onClick: () => void = () => {};
    export let tooltip: string | null = null;
    export let disabled: boolean = false;
    export let text: string;
</script>

<button
    on:click={onClick}
    title="{tooltip}"
    disabled={disabled}>
    {text}
</button>

<style>
    button {
        width: auto;
        color: white;
        background-color: #ff3e00;
        border-radius: 0.5em;
        border-style: none;
        margin: 0;
        cursor: pointer;
    }
    button:hover {
        background-color: #ff6b3e;
    }
    button:disabled {
        color: #999999;
        background-color: #a36754;
    }
</style>