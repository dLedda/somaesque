import * as THREE from 'three';
import { MapControls } from './OrbitControls.js';
import VoxelSpace from './solver/VoxelSpace.js';
import {somaDimension, polycubes} from './store';
import {get} from 'svelte/store';
import type { MeshPhongMaterial } from 'three';

export default class PolycubeScene {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.Camera;
    private mainScene: THREE.Scene;
    private polycubeMeshes: THREE.Mesh[] = [];
    private controls: typeof MapControls;
    private light: THREE.Light;
    private cameraLightScene: THREE.Group;
    private lastDims: number = 0;
    private currentPolycubeId: number = 0;
    private lastColor: string = "#FF0000";
    private lastPolycube: bigint = 0n;

    constructor(el: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({canvas: el});
        const fov = 75;
        const aspect = el.clientWidth / el.clientHeight;
        const near = 0.1;
        const far = 10;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 5;
        this.camera.lookAt(0, 0, 0);
        this.mainScene = new THREE.Scene();
        this.light = this.setupLight();
        this.mainScene.add(this.light);
        this.mainScene.rotateX(Math.PI/4);
        this.mainScene.rotateY(Math.PI/4);
        this.cameraLightScene = new THREE.Group();
        this.controls = new MapControls(this.camera, el);
        requestAnimationFrame((timestamp) => this.render(timestamp));
    }

    private setPolycube(polycube: bigint, dims: number, color: string) {
        if (dims !== this.lastDims) {
            this.mainScene.remove(...this.polycubeMeshes);
            this.polycubeMeshes = [];
            this.polycubeMeshes = Array.from(Array(dims ** 3).keys()).map(() => {
                const cube = this.newRoundedCube(0.2, 3, color);
                cube.position.set(1000, 1000, 1000);
                this.mainScene.add(cube);
                return cube;
            });
            this.lastDims = dims;
        }

        if (polycube !== this.lastPolycube) {
            let i = 0;
            const voxelSpace = new VoxelSpace(0, [dims, dims, dims], polycube);
            voxelSpace.forEachCell((val, x, y, z) => {
                if (val) {
                    this.polycubeMeshes[i].position.set(
                        -((dims - 1)/2) + z,
                        ((dims - 1)/2) - y,
                        -((dims - 1)/2) + x,
                    );
                } else {
                    this.polycubeMeshes[i].position.set(1000, 1000, 1000);
                }
                i++;
            });
            this.lastPolycube = polycube;
        }

        if (color !== this.lastColor) {
            this.polycubeMeshes.forEach(mesh => (mesh.material as MeshPhongMaterial).color.set(color));
            this.lastColor = color;
        }
    }

    private updateFromCurrentPolycube() {
        const {color: cubeColor, rep: cubeRep} = get(polycubes)[this.currentPolycubeId];
        const dims = get(somaDimension);
        const voxelSpace = new VoxelSpace(this.currentPolycubeId, [dims, dims, dims], cubeRep);
        this.mainScene.remove(...this.polycubeMeshes);
        voxelSpace.forEachCell((val, x, y, z) => {
            if (val) {
                const cube = this.newRoundedCube(0.2, 3, cubeColor);
                cube.position.set(
                    -((dims - 1)/2) + z,
                    ((dims - 1)/2) - y,
                    -((dims - 1)/2) + x,
                );
                this.mainScene.add(cube);
                this.polycubeMeshes.push(cube);
            }
        });
    }

    private setupLight() {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        return light;
    }

    private render(time: number) {
        this.renderer.render(this.mainScene, this.camera);
        requestAnimationFrame((timestamp) => this.render(timestamp));
    }    

    private newRoundedCube(radius: number, smoothness: number, color: string) {
        const width = 1;
        const height = 1;
        const depth = 1;
        const shape = new THREE.Shape();
        const eps = 0.00001;
        const radius0 = radius - eps;
        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, height - radius0 * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(width - radius0 * 2, height - radius0 * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(width - radius0 * 2, eps, eps, 0, -Math.PI / 2, true );
        const geometry = new THREE.ExtrudeBufferGeometry(shape, {
          depth: depth - radius0 * 2,
          bevelEnabled: true,
          bevelSegments: smoothness * 2,
          steps: 1,
          bevelSize: radius0,
          bevelThickness: radius0,
          curveSegments: smoothness
        });
        geometry.center();
        const material = new THREE.MeshPhongMaterial({color});
        const cube = new THREE.Mesh(geometry, material);
        return cube;
      }
}
