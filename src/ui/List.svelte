<script lang="ts">
    export let defaultText: string = "...";
    export let activeItem: number = 0;
    export let items: string[] = [];
    export let onClick = (itemNo: number) => { activeItem = itemNo };
</script>

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
    }
    ul {
        width: 100%;
        overflow-y: scroll;
        flex: 1;
        padding: 0.5em;
        margin: 0;
        text-align: center;
        background-color: #666;
    }
    .active {
        background-color: #ff3e00;
    }
</style>