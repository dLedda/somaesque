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
    <div class="title">
        <img class="logo" src="../favicon.png"/><h1>Somaesque</h1>
    </div>
    <div class="widgets">
        <div>
            <Tabs
                selectedTab={"Parameters"}
                tabs={{
                    "Parameters": InputParameters,
                    "Examples": ExamplesList,
                }}/>
        </div>
        <div>
            <SolveButton/>
        </div>
    </div>
    <h3>Solutions: {$solutions.length}</h3>
    <div class="solns">
        <SolutionList/>
    </div>
</div>

<style>
    .title {
        display: flex;
        align-items: center;
    }
    .logo {
        margin-right: 1em;
        display: inline-block;
        height: 3em;
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
    .widgets:first-child {
        margin-top: 0;
    }
    .widgets:last-child {
        margin-bottom: 0;
    }
    .widgets > * {
        margin-top: 1em;
        margin-bottom: 1em;
    }
    .solns {
        flex: 1 1 auto;
        width: 100%;
    }
    h1 {
        display: block;
        margin: 0;
        color: #ff3e00;
        font-size: 3em;
        font-weight: 100;
    }
</style>