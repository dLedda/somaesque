import VoxelSpaceBigInt from "../VoxelSpaceBigInt";
import {get, Writable, writable} from "svelte/store";
import type DimStore from "./DimStore";
import {colorFromIndex} from "../utils";

export default class PolycubeStore {
    private store: Writable<VoxelSpaceBigInt[]>;
    private dimX: DimStore;
    private dimY: DimStore;
    private dimZ: DimStore;
    private selectedCube: Writable<number>;

    constructor(dimX: DimStore, dimY: DimStore, dimZ: DimStore) {
        this.selectedCube = writable(0);
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
        this.store = writable<VoxelSpaceBigInt[]>([this.freshCube(0)]);
        this.dimX.subscribe(() => this.reset());
        this.dimY.subscribe(() => this.reset());
        this.dimZ.subscribe(() => this.reset());

    }
    
    private freshCube(id: number) {
        return new VoxelSpaceBigInt({
            id: id,
            dims: [this.dimX.currentVal(), this.dimY.currentVal(), this.dimZ.currentVal()],
            color: colorFromIndex(id),
            cullEmpty: false
        });
    }

    private volume() {
        return this.dimX.currentVal() * this.dimY.currentVal() * this.dimZ.currentVal();
    }

    private isMaxPolycubes() {
        return this.currentVal().length >= this.volume();

    }

    private isMinPolycubes() {
        return this.currentVal().length <= 1;
    }

    private getSelectedCube() {
        return get(this.selectedCube);
    }

    selected() {
        return this.selectedCube;
    }

    currentVal() {
        return get(this.store);
    }
    
    subscribe(cb: (cubes: VoxelSpaceBigInt[]) => any) {
        return this.store.subscribe(cb);
    }
    
    setColor(cubeIndex: number, color: string) {
        const cubes = this.currentVal();
        cubes[cubeIndex].setColor(color);
        this.store.set(cubes);
    }

    addCube() {
        if (!this.isMaxPolycubes()) {
            this.store.update((polycubes: VoxelSpaceBigInt[]) =>
                polycubes.concat(this.freshCube(polycubes.length)));
        }
    }

    removeCube() {
        if (!this.isMinPolycubes()) {
            this.store.update((polycubes: VoxelSpaceBigInt[]) => polycubes.splice(0, polycubes.length - 1));
        }
        const newLength = this.currentVal().length;
        if (newLength <= this.getSelectedCube()) {
            this.selectedCube.set(newLength - 1);
        }
    }

    toggle(cubeIndex: number, x: number, y: number, z: number) {
        const cubes = this.currentVal();
        cubes[cubeIndex].toggle(x, y, z);
        this.store.set(cubes);
    }

    set(cubeIndex: number, val: boolean, x: number, y: number, z: number) {
        const cubes = this.currentVal();
        cubes[cubeIndex].set(x, y, z, val);
        this.store.set(cubes);
    }

    reset() {
        this.store.update((polycubes: VoxelSpaceBigInt[]) => {
            const result: VoxelSpaceBigInt[] = [];
            for (let i = 0; i < Math.min(polycubes.length, this.volume()); i++) {
                result.push(this.freshCube(i));
            }
            return result;
        });
    }

    setCubes(cubes: VoxelSpaceBigInt[]) {
        let lastDims = cubes[0].getDims();
        for (const cube of cubes) {
            const dimsMatch = !cube.getDims().some((dim, i) => lastDims[i] !== dim);
            if (!dimsMatch) {
                throw new Error("Error setting cubes: not all dimensions match.");
            }
        }
        this.dimX.set(lastDims[0]);
        this.dimY.set(lastDims[1]);
        this.dimZ.set(lastDims[2]);
        this.store.set(cubes);
        this.selectedCube.set(0);
    }
}