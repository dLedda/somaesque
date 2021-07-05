import App from './ui/App.svelte';
import PolycubeScene from "./ui/threedee/PolycubeScene";

const app = new App({
	target: document.body,
	props: {
		scene: new PolycubeScene()
	}
});

export default app;