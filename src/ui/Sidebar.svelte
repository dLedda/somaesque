<script lang="ts">
    import {
        solutions,
    } from "../store";
    import SolutionList from "./SolutionList.svelte";
    import InputParameters from "./InputParameters.svelte";
    import ExamplesList from "./ExamplesList.svelte";
    import Tabs from "./Tabs.svelte";
    import SolveButton from "./SolveButton.svelte";
</script>

<div class="container">
    <h1>Somaesque</h1>
    <div class="widgets">
        <Tabs
            selectedTab={"Parameters"}
            tabs={{
                "Parameters": InputParameters,
                "Examples": ExamplesList,
            }}/>
        <SolveButton/>
    </div>
    <h3>Solutions: {$solutions.length}</h3>
    <SolutionList/>
</div>

<style>
    p {
        margin: 0;
        display: inline-block;
    }
    input {
        display: inline-block;
        background-color: #999999;
        width: 3em;
        height: 2em;
        border-style: none;
    }
    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        background-color: #333333;
        padding: 1em;
        text-align: center;
    }
    .widgets {
        width: 100%;
    }
    h1 {
        margin: 0;
        color: #ff3e00;
        font-size: 3em;
        font-weight: 100;
    }
</style>