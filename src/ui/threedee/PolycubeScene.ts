import * as THREE from 'three';
import type SomaSolution from "../../SomaSolution";
import RotationControl from "./RotationControl";
import PolycubeMesh from "./PolycubeMesh";
import type VoxelSpaceBoolean from "../../VoxelSpaceBoolean";
import type VoxelSpaceBigInt from "../../VoxelSpaceBigInt";
import GeometryManager from "./GeometryManager";

export default class PolycubeScene {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.Camera;
    private mainScene: THREE.Scene;
    private polycubeMeshes: PolycubeMesh[] = [];
    private controls: RotationControl;
    private light: THREE.Light;
    private cubeScene: THREE.Scene;
    private geomManager: GeometryManager;

    constructor(el: HTMLCanvasElement, onReady: () => any, onError: (err: Error) => any) {
        this.init(el).then(onReady).catch(onError);
    }

    private async init(el: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({canvas: el, antialias: true});
        this.setupCamera(el.clientWidth / el.clientHeight);
        this.setupLight();
        this.mainScene = new THREE.Scene();
        this.cubeScene = new THREE.Scene();
        this.mainScene.add(this.cubeScene, this.camera, this.light);
        this.cubeScene.rotateX(Math.PI/4);
        this.cubeScene.rotateY(Math.PI/4);
        this.controls = new RotationControl(this.cubeScene, this.polycubeMeshes, this.camera, el);
        this.geomManager = await new GeometryManager('../resources/', () => {
            requestAnimationFrame((timestamp) => this.render(timestamp));
        });
        PolycubeMesh.setManager(this.geomManager);
    }

    private setupCamera(aspect: number) {
        const fov = 60;
        const near = 0.1;
        const far = 15;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 6;
        this.camera.lookAt(0, 0, 0);
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
