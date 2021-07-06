<script lang="ts">
    export let defaultText: string = "...";
    export let activeItem: number = 0;
    export let items: string[] = [];
    export let onClick = (itemNo: number) => { activeItem = itemNo };
    export let maxHeight: string = "auto";
</script>

<div class="container">
    <ul>
        {#if items.length === 0}
            <li>{defaultText}</li>
        {/if}
        {#each items as item, i}
            <li class:active={activeItem === i} on:click={() => onClick(i)}>
                {item}
            </li>
        {/each}
    </ul>
</div>

<style>
    li:hover:not(.active) {
        background-color: #aaaaaa;
    }
    li {
        transition: background-color 100ms;
        cursor: pointer;
        list-style: none;
        height: 2em;
        line-height: 2em;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    ul {
        position: absolute;
        left: 0;
        top: 0;
        padding: 0.5em;
        text-align: center;
        background-color: #666;
        margin: 0;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
    }
    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .container:before {
        pointer-events: none;
        left: 0;
        top: 0;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 1;
        position: absolute;
        box-shadow: inset 0 0 0.5em rgba(0,0,0,0.5);
    }
    .active {
        background-color: #ff3e00;
    }
</style>