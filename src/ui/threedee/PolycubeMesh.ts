import * as THREE from "three";
import type VoxelSpace from "../../VoxelSpace";
import type GeometryManager from "./GeometryManager";

export default class PolycubeMesh {
    private static geometryManager: GeometryManager;
    private group: THREE.Group;
    private meshes: THREE.Mesh[] = [];
    private currentPolycube: bigint = 0n;
    private material: THREE.MeshPhongMaterial;
    private numActiveCubes: number = 0;
    private flyDirection: THREE.Vector3 = new THREE.Vector3();

    constructor(polycube: VoxelSpace, color: string) {
        this.material = new THREE.MeshPhongMaterial({color: 'red', shininess: 100, reflectivity: 100});
        this.group = new THREE.Group();
        this.swapColor(color);
        this.swapPolycube(polycube);
    }

    static setManager(manager: GeometryManager) {
        PolycubeMesh.geometryManager = manager;
    }

    swapColor(color: string) {
        this.material.color.set(color);
    }

    swapPolycube(polycube: VoxelSpace) {
        if (polycube.getRaw() === this.currentPolycube) {
            return;
        }
        this.numActiveCubes = polycube.size();
        this.meshes = [];
        this.group.clear();
        this.group.position.set(0, 0, 0);
        polycube.forEachCell((val: boolean, x: number, y: number, z: number) => {
            if (val) {
                this.addCube(polycube, x, y, z);
            }
        });
        this.currentPolycube = polycube.getRaw();
        this.flyDirection = this.middlePosOfGroup().normalize();
    }

    private addCube(refPolycube: VoxelSpace, x: number, y: number, z: number) {
        const dims = refPolycube.getDims();
        const neighbourProfile = refPolycube.getDirectNeighbourProfile(x, y, z);
        const mesh = new THREE.Mesh(
            PolycubeMesh.geometryManager.retrieveCubeGeometry(neighbourProfile),
            this.material
        );
        mesh.position.set(
            -((dims[0] - 1)/2) + x,
            -((dims[1] - 1)/2) + y,
            -((dims[2] - 1)/2) + z,
        );
        this.meshes.push(mesh);
        this.group.add(mesh);
    }

    center() {
        const mid = this.middlePosOfGroup();
        this.group.children.forEach(child => child.position.sub(mid));
    }

    private middlePosOfGroup() {
        return this.group.children.reduce(
            (prev, child) => prev.add(child.position),
            new THREE.Vector3()
        ).divideScalar(this.group.children.length);
    }

    flyBy(factor: number) {
        const movementVector = this.flyDirection.clone().multiplyScalar(factor);
        const targetPos = this.group.position.clone().add(movementVector);
        const willMoveBehindStartingPosition = targetPos.clone().sub(this.flyDirection).dot(this.flyDirection) < -1;
        if (!willMoveBehindStartingPosition) {
            const distanceFromOrigin = targetPos.distanceTo(new THREE.Vector3());
            if (distanceFromOrigin >= 0 && distanceFromOrigin < 3) {
                this.group.position.add(movementVector);
            }
        } else {
            this.group.position.set(0, 0, 0);
        }
    }

    asObj3D(): THREE.Object3D {
        return this.group;
    }
}
