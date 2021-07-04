import * as THREE from 'three';
import type SomaSolution from "../../SomaSolution";
import RotationControl from "./RotationControl";
import PolycubeMesh from "./PolycubeMesh";
import type VoxelSpaceBoolean from "../../VoxelSpaceBoolean";
import type VoxelSpaceBigInt from "../../VoxelSpaceBigInt";
import GeometryManager from "./GeometryManager";

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;

export default class PolycubeScene {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private mainScene: THREE.Scene;
    private polycubeMeshes: PolycubeMesh[] = [];
    private controls: RotationControl;
    private light: THREE.Light;
    private cubeScene: THREE.Scene;
    private geomManager: GeometryManager;
    private canvas: HTMLCanvasElement;
    private loadedCb: () => void = () => {};
    private loaded: boolean = false;

    constructor() {
        this.init().then(() => this.loadedCb()).catch(e => console.log(e));
    }

    private async init() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 0;
        this.canvas.height = 0;
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
        this.setupCamera(this.canvas.clientWidth / this.canvas.clientHeight);
        this.setupLight();
        this.mainScene = new THREE.Scene();
        this.cubeScene = new THREE.Scene();
        this.mainScene.add(this.cubeScene, this.camera, this.light);
        this.cubeScene.rotateX(Math.PI/4);
        this.cubeScene.rotateY(Math.PI/4);
        this.controls = new RotationControl(this.cubeScene, this.polycubeMeshes, this.camera, this.canvas);
        this.geomManager = await new GeometryManager('../resources/', () => {
            requestAnimationFrame((timestamp) => this.render(timestamp));
        });
        PolycubeMesh.setManager(this.geomManager);
        this.loaded = true;
    }

    private setupCamera(aspect: number) {
        const fov = 60;
        const near = 0.1;
        const far = 15;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 6;
        this.camera.lookAt(0, 0, 0);
    }

    mount(el: HTMLDivElement) {
        this.canvas.width = DEFAULT_WIDTH;
        this.canvas.height = DEFAULT_HEIGHT;
        this.camera.aspect = this.canvas.width / this.canvas.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        el.append(this.canvas);
    }

    onLoaded(cb: () => void) {
        if (this.loaded) {
            cb();
        }
        this.loadedCb = cb;
    }

    isLoaded(): boolean {
        return this.loaded;
    }

    showPolycube(voxelSpace: VoxelSpaceBoolean) {
        this.controls.disableFly();
        this.clearScene();
        this.addPolycube(voxelSpace);
        this.polycubeMeshes[0].center();
    }

    showSolution(solution: SomaSolution) {
        this.controls.enableFly();
        this.clearScene();
        const pieces = solution.getPieces();
        for (let i = 0; i < pieces.length; i++) {
            this.addPolycube(pieces[i]);
        }
    }

    private clearScene() {
        this.polycubeMeshes.splice(0, this.polycubeMeshes.length);
        this.cubeScene.clear();
    }

    private addPolycube(voxelSpace: VoxelSpaceBoolean | VoxelSpaceBigInt) {
        const newMesh = new PolycubeMesh(voxelSpace);
        this.polycubeMeshes.push(newMesh);
        this.cubeScene.add(newMesh.asObj3D());
    }

    private setupLight() {
        const color = 0xFFFFFF;
        const intensity = 1;
        this.light = new THREE.DirectionalLight(color, intensity);
        this.light.position.set(4, 6, 24);
        this.light.lookAt(0,0,0);
    }

    private render(time: number) {
        this.renderer.render(this.mainScene, this.camera);
        requestAnimationFrame((time: number) => this.render(time));
    }
}
