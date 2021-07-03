import type VoxelSpaceBoolean from "./VoxelSpaceBoolean";

export type DimensionDef = [number, number, number];

const enum NeighbourDirection {
    POSX,
    POSY,
    POSZ,
    NEGX,
    NEGY,
    NEGZ,
}

export default class VoxelSpaceBigInt {
    private dims: DimensionDef;
    private length: number;
    private space: bigint;
    private id: number;
    private color: string;

    constructor(options: {id: number, dims: DimensionDef, space?: bigint, cullEmpty: boolean, color?: string}) {
        if (!options.space) {
            options.space = 0n;
        }
        this.id = options.id;
        this.length = options.dims[0] * options.dims[1] * options.dims[2];
        this.dims = options.dims;
        this.space = BigInt(options.space);
        this.color = options.color ?? "red";
        if (options.cullEmpty !== false) {
            this.cullEmptySpace();
        }
    }

    static boolArrayToBigInt(boolArray: boolean[]) {
        let result = 0n;
        for (let i = 0; i < boolArray.length; i++) {
            if (boolArray[i]) {
                result |= BigInt(1 << i);
            }
        }
        return result;
    }

    setColor(color: string) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    binaryRep() {
        return this.space.toString(2);
    }

    getExtrema() {
        const extrema = {
            xMax: 0,
            xMin: this.dims[0],
            yMax: 0,
            yMin: this.dims[1],
            zMax: 0,
            zMin: this.dims[2],
        };
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
        return extrema;
    }

    cullEmptySpace() {
        const extrema = this.getExtrema();
        let index = 0n;
        let newSpace = 0n;
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
        const rotations: VoxelSpaceBigInt[] = [];
        const refSpace = this.clone();
        VoxelSpaceBigInt.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBigInt.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBigInt.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBigInt.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        VoxelSpaceBigInt.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        refSpace.rot90('z');
        VoxelSpaceBigInt.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        return rotations;
    }

    getAllRotations() {
        const rotations: VoxelSpaceBigInt[] = [];
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

    protected static pushNewUniqueSpaces(existingSpaces: VoxelSpaceBigInt[], newSpaces: VoxelSpaceBigInt[]) {
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

    getAllPositionsInPrism(cubeDimX: number, cubeDimY: number, cubeDimZ: number): VoxelSpaceBigInt[] {
        const cubePositions: VoxelSpaceBigInt[] = [];
        if (this.dims[0] > cubeDimX || this.dims[1] > cubeDimY || this.dims[2] > cubeDimZ) {
            return cubePositions;
        }
        for (let xOffset = 0; xOffset < (cubeDimX - this.dims[0] + 1); xOffset++) {
            for (let yOffset = 0; yOffset < (cubeDimY - this.dims[1] + 1); yOffset++) {
                for (let zOffset = 0; zOffset < (cubeDimZ - this.dims[2] + 1); zOffset++) {
                    const cubePos = new VoxelSpaceBigInt({id: this.id, dims: [cubeDimX, cubeDimY, cubeDimZ], color: this.color, cullEmpty: false});
                    this.forEachCell((val, x, y, z) => {
                        cubePos.set(xOffset + x, yOffset + y, zOffset + z, val);
                    });
                    cubePositions.push(cubePos);
                }
            }
        }
        return cubePositions;
    }

    matches(space: VoxelSpaceBigInt | VoxelSpaceBoolean) {
        const otherDims = space.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        if (typeof space.getRaw() === "bigint") {
            return this.space === space.getRaw();
        } else {
            return this.binaryRep() === space.binaryRep();
        }
    }

    clone() {
        return new VoxelSpaceBigInt({id: this.id, dims: this.getDims(), space: this.getRaw(), color: this.getColor(), cullEmpty: false});
    }

    private getAxisSpins(axis: 'x' | 'y' | 'z'): VoxelSpaceBigInt[] {
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
        const mask = 1n << BigInt(this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        this.space ^= mask;
    }

    set(x: number, y: number, z: number, val: boolean) {
        const mask = 1n << BigInt(this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        if (val) {
            this.space |= mask;
        }
        else {
            this.space &= ~mask;
        }
    }

    rotated90(dim: 'x' | 'y' | 'z') {
        let newSpace = 0n;
        let newDims;
        let rotIndex;
        if (dim === 'x') {
            newDims = [this.dims[0], this.dims[2], this.dims[1]];
            rotIndex = this.newIndexRotX.bind(this);
        }
        else if (dim === 'y') {
            newDims = [this.dims[2], this.dims[1], this.dims[0]];
            rotIndex = this.newIndexRotY.bind(this);
        }
        else {
            newDims = [this.dims[1], this.dims[0], this.dims[2]];
            rotIndex = this.newIndexRotZ.bind(this);
        }
        this.forEachCell((val, i, j, k) => {
            if (val) {
                newSpace |= BigInt(1 << rotIndex(i, j, k));
            }
        });
        return new VoxelSpaceBigInt({ id: this.id, dims: newDims, space: newSpace, color: this.color, cullEmpty: false });
    }

    rot90(dim: 'x' | 'y' | 'z') {
        const rot = this.rotated90(dim);
        this.space = rot.getRaw();
        this.dims = rot.getDims();
    }

    plus(space: VoxelSpaceBigInt): VoxelSpaceBigInt | null {
        const otherSpace = space.getRaw();
        if ((this.space | otherSpace) === (this.space ^ otherSpace)) {
            return new VoxelSpaceBigInt({ id: this.id, dims: this.getDims(), space: otherSpace | this.space, color: this.color, cullEmpty: false });
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

    getDirectNeighbourProfile(x: number, y: number, z: number): number {
        let result = 0;
        if (x < this.dims[0] - 1 && this.at(x + 1, y, z)) {
            result += 1;
        }
        if (y < this.dims[1] - 1 && this.at(x, y + 1, z)) {
            result += 2;
        }
        if (z < this.dims[2] - 1 && this.at(x, y, z + 1)) {
            result += 4;
        }
        if (x > 0 && this.at(x - 1, y, z)) {
            result += 8;
        }
        if (y > 0 && this.at(x, y - 1, z)) {
            result += 16;
        }
        if (z > 0 && this.at(x, y, z - 1)) {
            result += 32;
        }
        return result;
    }

    getAllPermutationsInPrism(prismDimX: number, prismDimY: number, prismDimZ: number): VoxelSpaceBigInt[] {
        const rotations = this.getUniqueRotations();
        let result = new Array<VoxelSpaceBigInt>();
        for (let i = 0; i < rotations.length; i++) {
            result = result.concat(rotations[i].getAllPositionsInPrism(prismDimX, prismDimY, prismDimZ));
        }
        return result;
    }
}