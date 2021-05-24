export type DimensionDef = [number, number, number];

export default class VoxelSpace {
    private dims: DimensionDef;
    private length: number;
    private space: bigint;
    private id: number;
    constructor(id: number, dims: DimensionDef, space?: boolean[] | bigint, cullEmpty?: boolean) {
        if (!space) {
            space = 0n;
        } else if (Array.isArray(space)) {
            if (space.length !== dims[0] * dims[1] * dims[2]) {
                throw new Error("Vals don't fit in given dimensions.");
            }
            space = VoxelSpace.boolArrayToBigInt(space)
        }
        this.id = id;
        this.length = dims[0] * dims[1] * dims[2];
        this.dims = dims;
        this.space = space;
        if (cullEmpty) {
            this.cullEmptySpace();
        }
    }

    private static boolArrayToBigInt(boolArray: boolean[]): bigint {
        let result = 0n;
        for (let i = 0; i < boolArray.length; i++) {
            if (boolArray[i]) {
                result |= BigInt(1 << i);
            }
        }
        return result;
    }

    binaryRep() {
        return this.space.toString(2);
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
        let newSpace = 0n;
        this.forEachCell((val, x, y, z) => {
            if (val) {
                extrema.xMax = Math.max(extrema.xMax, x);
                extrema.xMin = Math.min(extrema.xMin, x);
                extrema.yMax = Math.max(extrema.yMax, y);
                extrema.yMin = Math.min(extrema.yMin, y);
                extrema.zMax = Math.max(extrema.zMax, z);
                extrema.zMin = Math.min(extrema.zMin, z);
            }
        });
        let index = 0n;
        for (let x = extrema.xMin; x <= extrema.xMax; x++) {
            for (let y = extrema.yMin; y <= extrema.yMax; y++) {
                for (let z = extrema.zMin; z <= extrema.zMax; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1n << index;
                    }
                    index++;
                }
            }
        }
        this.dims[0] = extrema.xMax - extrema.xMin + 1;
        this.dims[1] = extrema.yMax - extrema.yMin + 1;
        this.dims[2] = extrema.zMax - extrema.zMin + 1;
        this.space = newSpace;
    }

    forEachCell(cb: (val: boolean, x: number, y: number, z: number) => any) {
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

    getId() {
        return this.id;
    }

    print() {
        let accum = "";
        console.log("---");
        for (let i = 0; i < this.dims[0]; i++) {
            for (let j = 0; j < this.dims[1]; j++) {
                for (let k = 0; k < this.dims[2]; k++) {
                    accum += this.at(i, j, k) ? '#' : 'O';
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

    getAllRotations() {
        const rotations: VoxelSpace[] = [];
        const refSpace = this.clone();
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        refSpace.rot90('z');
        rotations.push(...refSpace.getAxisSpins('x'));
        return rotations;
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

    getAllPositionsInCube(cubeDim: number): VoxelSpace[] {
        if ((cubeDim > 0) && (cubeDim % 1 === 0)) {
            const cubePositions: VoxelSpace[] = [];
            for (let x = 0; x < cubeDim - this.dims[0] + 1; x++) {
                for (let y = 0; y < cubeDim - this.dims[1] + 1; y++) {
                    for (let z = 0; z < cubeDim - this.dims[2] + 1; z++) {
                        const cubePos = new VoxelSpace(this.id, [cubeDim, cubeDim, cubeDim]);
                        this.forEachCell((val, rotX, rotY, rotZ) => {
                            cubePos.set(x + rotX, y + rotY, z + rotZ, val);
                        });
                        cubePositions.push(cubePos);
                    }
                }
            }
            return cubePositions;
        } else {
            throw new Error("cubeDim must be a positive integer.");
        }
    }

    matches(space: VoxelSpace) {
        const otherDims = space.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        return this.space === space.getRaw();
    }

    clone() {
        return new VoxelSpace(this.id, this.getDims(), this.getRaw());
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

    getRaw() {
        return this.space;
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
        const mask = 1n << BigInt(this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        return (this.space & mask) !== 0n;
    }

    toggle(x: number, y: number, z: number) {
        const mask = BigInt(1 << this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        this.space ^= mask;
    }

    set(x: number, y: number, z: number, val: boolean) {
        const mask = BigInt(1 << this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        if (val) {
            this.space |= mask;
        } else {
            this.space &= ~mask;
        }
    }

    rotated90(dim: 'x' | 'y' | 'z') {
        let newSpace = 0n;
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
            if (val) {
                newSpace |= BigInt(1 << rotIndex(i, j, k));
            }
        })
        return new VoxelSpace(this.id, newDims, newSpace);
    }

    rot90(dim: 'x' | 'y' | 'z') {
        const rot = this.rotated90(dim);
        this.space = rot.getRaw();
        this.dims = rot.getDims();
    }

    plus(space: VoxelSpace): VoxelSpace | null {
        const otherSpace = space.getRaw();
        if ((this.space | otherSpace) === (this.space ^ otherSpace)) {
            return new VoxelSpace(this.id, this.dims, otherSpace | this.space);
        }
        return null;
    }

    size() {
        let size = 0;
        this.forEachCell((val) => {
            if (val) {
                size++;
            }
        });
        return size;
    }
}