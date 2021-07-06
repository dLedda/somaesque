<script lang="ts">
    import {
        solutions,
    } from "../store";
    import SolutionList from "./SolutionList.svelte";
    import InputParameters from "./InputParameters.svelte";
    import ExamplesList from "./ExamplesList.svelte";
    import Tabs from "./Tabs.svelte";
    import SolveButton from "./SolveButton.svelte";
    import ActionButton from "./ActionButton.svelte";

    let hidden: boolean = true;
</script>

<div class="container">
    <div class="controls" class:hidden>
        <div class="title">
            <img class="logo" src="./resources/favicon.png"/>
            <h1>Somaesque</h1>
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
    <div class="showHideBtn">
        <ActionButton text={hidden ? ">" : "<"} onClick={() => {hidden = !hidden}}/>
    </div>
</div>

<style>
    .container {
        display: flex;
        height: 100%;
        flex-direction: row;
    }
    .title {
        display: flex;
        align-items: center;
    }
    .logo {
        margin-right: 1em;
        display: inline-block;
        height: 3em;
        align-self: center;
        background-image: url("../resources/favicon.png");
        background-size: cover;
        width: 3em;
    }
    .controls {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
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
    .showHideBtn {
        background-color: #333333;
        text-align: center;
        line-height: 100%;
        width: 2em;
        height: 100%;
        padding: 0.25em;
        flex: 0 0 auto;
        display: none;
    }
    @media(max-width: 1600px) {
        h1 {
            font-size: 2em;
        }
    }
    @media(max-width: 1024px) {
        .controls {
            overflow: scroll;
            padding-right: 0;
        }
        .showHideBtn {
            display: inline-block;
        }
        .hidden {
            display: none;
        }
        .container.hidden {
            pointer-events: none;
        }
    }
</style>