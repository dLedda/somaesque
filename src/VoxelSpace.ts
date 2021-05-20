import Polycube from "./Polycube";

export type DimensionDef = [number, number, number];

export default class VoxelSpace {
    protected vals: number[];
    protected dims: DimensionDef;
    constructor(dims: DimensionDef, vals: number[], cullEmpty?: boolean) {
        if (vals.length !== dims[0] * dims[1] * dims[2]) {
            throw new Error("Vals don't fit in given dimensions.");
        }
        this.dims = dims;
        this.vals = vals;
        if (cullEmpty) {
            this.cullEmptySpace();
        }
    }

    private cullEmptySpace() {
        const extrema = {
            xMax: -Infinity,
            xMin: Infinity,
            yMax: -Infinity,
            yMin: Infinity,
            zMax: -Infinity,
            zMin: Infinity,
        };
        const newVals: number[] = [];
        this.forEachCell((val, i, j, k) => {
            if (val !== 0) {
                extrema.xMax = Math.max(extrema.xMax, i);
                extrema.xMin = Math.min(extrema.xMin, i);
                extrema.yMax = Math.max(extrema.yMax, j);
                extrema.yMin = Math.min(extrema.yMin, j);
                extrema.zMax = Math.max(extrema.zMax, k);
                extrema.zMin = Math.min(extrema.zMin, k);
            }
        });
        for (let i = extrema.xMin; i <= extrema.xMax; i++) {
            for (let j = extrema.yMin; j <= extrema.yMax; j++) {
                for (let k = extrema.zMin; k <= extrema.zMax; k++) {
                    newVals.push(this.at(i, j, k));
                }
            }
        }
        this.dims[0] = extrema.xMax - extrema.xMin + 1;
        this.dims[1] = extrema.yMax - extrema.yMin + 1;
        this.dims[2] = extrema.zMax - extrema.zMin + 1;
        this.vals = newVals;
    }

    forEachCell(cb: (val: number, x: number, y: number, z: number) => any) {
        loopStart: for (let x = 0; x < this.dims[0]; x++) {
            for (let y = 0; y < this.dims[1]; y++) {
                for (let z = 0; z < this.dims[2]; z++) {
                    if (cb(this.at(x, y, z), x, y, z) === 0) {
                        break loopStart;
                    }
                }
            }
        }
    }

    print() {
        let accum = "";
        console.log("---");
        for (let i = 0; i < this.dims[0]; i++) {
            for (let j = 0; j < this.dims[1]; j++) {
                for (let k = 0; k < this.dims[2]; k++) {
                    accum += this.at(i, j, k);
                }
                console.log(accum);
                accum = "";
            }
            if (i !== this.dims[0] - 1) {
                console.log("-");
            }
        }
        console.log("---");
    }

    getUniqueRotations() {
        const rotations: VoxelSpace[] = [];
        const refSpace = this.clone();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        refSpace.rot90('z');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        return rotations;
    }

    static filterUnique<T extends Polycube | VoxelSpace>(spaces: T[]): T[] {
        if (spaces.length === 0) {
            return [];
        }
        const uniqueSpaces = [spaces[0]];
        for (const space of spaces) {
            let foundMatch = false;
            for (const rotation of space.getUniqueRotations()) {
                let end = uniqueSpaces.length;
                for (let i = 0; i < end; i++) {
                    if (rotation.matches(uniqueSpaces[i])) {
                        foundMatch = true;
                    }
                }
            }
            if (!foundMatch) {
                uniqueSpaces.push(space);
            }
        }
        return uniqueSpaces;
    }

    protected static pushNewUniqueSpaces(existingSpaces: VoxelSpace[], newSpaces: VoxelSpace[]) {
        for (const newSpace of newSpaces) {
            let matchFound = false;
            for (const existingSpace of existingSpaces) {
                if (newSpace.matches(existingSpace)) {
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                existingSpaces.push(newSpace);
            }
        }
    }

    matches(space: VoxelSpace) {
        const otherDims = space.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        const otherVals = space.getVals();
        for (let i = 0; i < this.vals.length; i++) {
            if (this.vals[i] !== otherVals[i]) {
                return false;
            }
        }
        return true;
    }

    clone() {
        return new VoxelSpace(this.getDims(), this.getVals());
    }

    private getAxisSpins(axis: 'x' | 'y' | 'z'): VoxelSpace[] {
        const rotations = [this.clone()];
        for (let i = 0; i < 3; i++) {
            rotations.push(rotations[i].rotated90(axis));
        }
        return rotations;
    }

    getDims(): DimensionDef {
        return this.dims.slice() as DimensionDef;
    }

    getVals() {
        return this.vals.slice();
    }

    // [1, 0,  0]   [x]   [ x]
    // [0, 0, -1] * [y] = [-z]
    // [0, 1,  0]   [z]   [ y]
    private newIndexRotX(x: number, y: number, z: number) {
        return this.dims[2] * this.dims[1] * x + this.dims[1] * (this.dims[2] - 1 - z) + y;
    }

    // [ 0, 0, 1]   [x]   [ z]
    // [ 0, 1, 0] * [y] = [ y]
    // [-1, 0, 0]   [z]   [-x]
    private newIndexRotY(x: number, y: number, z: number) {
        return this.dims[1] * this.dims[0] * z + this.dims[0] * y + (this.dims[0] - 1 - x);
    }

    // [0, -1, 0]     [x]   [-y]
    // [1,  0, 0]  *  [y] = [ x]
    // [0,  0, 1]     [z]   [ z]
    private newIndexRotZ(x: number, y: number, z: number) {
        return this.dims[0] * this.dims[2] * (this.dims[1] - 1 - y) + this.dims[2] * x + z;
    }

    at(x: number, y: number, z: number) {
        return this.vals[this.dims[1] * this.dims[2] * x + this.dims[2] * y + z];
    }

    set(x: number, y: number, z: number, val: number) {
        this.vals[this.dims[1] * this.dims[2] * x + this.dims[2] * y + z] = val;
    }

    rotated90(dim: 'x' | 'y' | 'z') {
        const newVals = [...this.vals];
        let newDims: DimensionDef;
        let rotIndex: (i: number, j: number, k: number) => number;
        if (dim === 'x') {
            newDims = [this.dims[0], this.dims[2], this.dims[1]];
            rotIndex = this.newIndexRotX.bind(this);
        } else if (dim === 'y') {
            newDims = [this.dims[2], this.dims[1], this.dims[0]];
            rotIndex = this.newIndexRotY.bind(this);
        } else {
            newDims = [this.dims[1], this.dims[0], this.dims[2]];
            rotIndex = this.newIndexRotZ.bind(this);
        }
        this.forEachCell((val, i, j, k) => {
            newVals[rotIndex(i, j, k)] = val;
        })
        return new VoxelSpace(newDims, newVals);
    }

    rot90(dim: 'x' | 'y' | 'z') {
        const rot = this.rotated90(dim);
        this.vals = rot.getVals();
        this.dims = rot.getDims();
    }

    plus(space: VoxelSpace, startX: number, startY: number, startZ: number): VoxelSpace | null {
        let result: VoxelSpace = this.clone();
        const spaceDims = space.getDims();
        for (let i = 0; i < spaceDims[0]; i++) {
            for (let j = 0; j < spaceDims[1]; j++) {
                for (let k = 0; k < spaceDims[2]; k++) {
                    const sourceVal = space.at(i, j, k);
                    const targetEmpty = result.at(startX + i, startY + j, startZ + k) === 0;
                    if (sourceVal !== 0 && targetEmpty) {
                        result.set(startX + i, startY + j, startZ + k, sourceVal);
                    } else if (sourceVal !== 0 && !targetEmpty) {
                        return null;
                    }
                }
            }
        }
        return result;
    }
}