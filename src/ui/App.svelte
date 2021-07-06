<script lang="ts">
	import Sidebar from "./Sidebar.svelte";
	import Stage from "./Stage.svelte";
	import PolycubeScene from "./threedee/PolycubeScene";

	export let scene: PolycubeScene;
</script>

<main>
	<div class="sidebarContainer">
		<Sidebar />
	</div>
	<div class="stage">
		<Stage scene="{scene}" />
	</div>
</main>

<style>
	main {
		position: relative;
		display: flex;
		height: 100%;
		margin: 0;
	}
	.sidebarContainer {
	 	background-color: black;
	 	margin: 0;
		padding: 0;
		max-width: 20%;
		height: 100%;
		display: inline-block;
	}
	.stage {
		flex: 1;
		background-color: grey;
		margin: 0;
		padding: 0;
		height: 100%;
		width: 80%;
		display: inline-block;
	}
	:global(body) {
		color: white;
		background: #333333;
	}
	@media(width: 1200px) {
		.sidebarContainer {
			width: 18em;
		}
		.stage {
			width: calc(80% - 18em);
		}
	}
	@media(max-width: 1024px) {
		.stage {
			left: 2em;
			position: absolute;
			width: calc(100% - 2em);
		}
		.sidebarContainer {
			position: absolute;
			max-width: 100%;
			z-index: 1;
		}
	}
</style>
