import * as THREE from 'three';
import { OBJLoader } from './OBJLoader.js';
import VoxelSpace from './solver/VoxelSpace';
import type SomaSolution from "./solver/SomaSolution";
import RotationControl from "./RotationControl";

export default class PolycubeScene {
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.Camera;
    private mainScene: THREE.Scene;
    private polycubeMeshes: THREE.Mesh[] = [];
    private controls: RotationControl;
    private light: THREE.Light;
    private lastDims: number = 0;
    private lastColor: string = "#FF0000";
    private lastPolycube: bigint = 0n;
    private cubeMaterial: THREE.MeshPhongMaterial;
    private materials: Record<number, THREE.MeshPhongMaterial> = {};
    private cubeGeometry: THREE.BufferGeometry;
    private cubeScene: THREE.Scene;

    constructor(el: HTMLCanvasElement, onReady: () => any, onError: (err: Error) => any) {
        this.init(el).then(onReady).catch(onError);
    }

    private async init(el: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({canvas: el});
        this.setupCamera(el.clientWidth / el.clientHeight);
        this.setupLight();
        try {
            await this.createCubeGeometry();
        } catch (err) {
            throw new Error(err);
        }
        this.createCubeMaterial("red");
        this.mainScene = new THREE.Scene();
        this.cubeScene = new THREE.Scene();
        this.mainScene.add(this.cubeScene, this.camera);
        this.camera.add(this.light);
        this.cubeScene.rotateX(Math.PI/4);
        this.cubeScene.rotateY(Math.PI/4);
        this.controls = new RotationControl(this.cubeScene, this.camera, el);
        requestAnimationFrame((timestamp) => this.render(timestamp));
    }

    private setupCamera(aspect: number) {
        const fov = 60;
        const near = 0.1;
        const far = 15;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 6;
        this.camera.lookAt(0, 0, 0);
    }

    private setPolycube(polycube: bigint, dims: number, color: string) {
        if (dims !== this.lastDims) {
            this.updateCubesFromDims(dims);
        }

        if (polycube !== this.lastPolycube) {
            let i = 0;
            const voxelSpace = new VoxelSpace(0, [dims, dims, dims], polycube, true);
            const newDims = voxelSpace.getDims();
            this.polycubeMeshes.forEach(mesh => {
                mesh.position.set(1000, 1000, 1000);
                mesh.material = this.cubeMaterial;
            });
            voxelSpace.forEachCell((val: boolean, x: number, y: number, z: number) => {
                if (val) {
                    this.polycubeMeshes[i].position.set(
                        -((newDims[2] - 1)/2) + z,
                        ((newDims[0] - 1)/2) - x,
                        -((newDims[1] - 1)/2) + y,
                    );
                }
                i++;
            });
            this.lastPolycube = polycube;
        }

        if (color !== this.lastColor) {
            this.cubeMaterial.color.set(color);
            this.lastColor = color;
        }
    }

    private updateCubesFromDims(newDims: number) {
        const requiredCubes = newDims**3;
        if (this.polycubeMeshes.length < requiredCubes) {
            for (let i = this.polycubeMeshes.length; i < requiredCubes; i++) {
                const newCube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
                this.cubeScene.add(newCube);
                this.polycubeMeshes.push(newCube);
            }
        }
        if (newDims < this.lastDims || this.lastDims === 0) {
            this.polycubeMeshes.forEach(mesh => mesh.position.set(1000, 1000, 1000));
        }
        this.lastDims = newDims;
    }

    private setSolution(solution: SomaSolution, colorMap: Record<number, string>) {
        const dims = solution.getDims();
        if (dims[0] !== this.lastDims) {
            this.updateCubesFromDims(dims[0]);
        }

        let i = 0;
        this.polycubeMeshes.forEach(mesh => mesh.position.set(1000, 1000, 1000));
        Object.keys(colorMap).forEach(key => {
            if (!this.materials[key]) {
                this.materials[key] = this.newCubeMaterial(colorMap[key]);
            }
        })
        solution.forEachCell((val: number, x: number, y: number, z: number) => {
            this.polycubeMeshes[i].position.set(
                -((dims[2] - 1)/2) + z,
                ((dims[0] - 1)/2) - x,
                -((dims[1] - 1)/2) + y,
            );
            this.polycubeMeshes[i].material = this.materials[val];
            i++;
        });
    }

    private setupLight() {
        const color = 0xFFFFFF;
        const intensity = 1;
        this.light = new THREE.DirectionalLight(color, intensity);
        this.light.position.set(-1, 2, 4);
    }

    private render(time: number) {
        this.renderer.render(this.mainScene, this.camera);
        requestAnimationFrame((time: number) => this.render(time));
    }

    private async createCubeGeometry(): Promise<void> {
        const onLoaded = (obj: THREE.Mesh, resolve: () => any) => {
            this.cubeGeometry = (obj.children[0] as THREE.Mesh).geometry;
            this.cubeGeometry.computeVertexNormals();
            this.cubeGeometry.computeBoundingSphere();
            this.cubeGeometry.scale(1/this.cubeGeometry.boundingSphere.radius, 1/this.cubeGeometry.boundingSphere.radius, 1/this.cubeGeometry.boundingSphere.radius);
            resolve();
        };
        const load = (resolve: () => any, reject: (err: string) => any) => {
            const loader = new OBJLoader();
            loader.load(
                '../resources/bevel_cube.obj',
                obj => onLoaded(obj, resolve),
                () => {},
                (err) => reject(`Error loading OBJ file: ${err}`),
            );
        };
        return new Promise<void>(load);
    }

    private newCubeMaterial(color: string) {
        return new THREE.MeshPhongMaterial({color});
    }

    private createCubeMaterial(color: string) {
        this.cubeMaterial = this.newCubeMaterial(color);
    }
}
