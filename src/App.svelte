<script lang="ts">
	import Sidebar from "./Sidebar.svelte";
	import SolutionInteractor from "./SolutionInteractor.svelte";
</script>

<main>
	<div class="sidebarContainer">
		<Sidebar />
	</div>
	<div class="solutionBodyContainer">
		<SolutionInteractor />
	</div>
</main>

<style>
	main {
		display: flex;
		height: 100%;
		margin: 0;
	}
	.sidebarContainer {
	 	background-color: black;
	 	margin: 0;
		padding: 0;
		width: 20%;
		height: 100%;
		display: inline-block;
	}
	.solutionBodyContainer {
		background-color: grey;
		margin: 0;
		padding: 0;
		width: 80%;
		height: 100%;
		display: inline-block;
	}
	:global(body) {
		color: white;
		background: #333333;
	}
	@media(max-width: 1600px) {
		.solutionBodyContainer {
			width: 100%;
		}
		.sidebarContainer {
			width: 20%;
		}
	}
	@media(max-width: 1200px) {
		.solutionBodyContainer {
			width: 100%;
		}
			.sidebarContainer {
			width: 15em;
		}
	}
</style>
