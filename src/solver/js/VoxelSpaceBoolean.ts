export type DimensionDef = [number, number, number];

const enum NeighbourDirection {
    POSX,
    POSY,
    POSZ,
    NEGX,
    NEGY,
    NEGZ,
}

export default class VoxelSpaceBoolean {
    private dims: DimensionDef;
    private length: number;
    private space: boolean[];
    private id: number;
    private color: string;

    constructor(options: {id: number, dims: DimensionDef, space?: boolean[] | bigint, cullEmpty: boolean, color?: string}) {
        this.length = options.dims[0] * options.dims[1] * options.dims[2];
        if (!options.space) {
            options.space = new Array<boolean>(options.dims[0] * options.dims[1] * options.dims[2]);
            options.space.fill(false);
        } else if (!Array.isArray(options.space)) {
            const newSpace = [];
            for (let i = 0; i < this.length; i++) {
                const mask = 1n << BigInt(i);
                newSpace.push((options.space & mask) !== 0n);
            }
            options.space = newSpace;
        }
        this.id = options.id;
        this.dims = options.dims;
        this.space = options.space;
        this.color = options.color ?? "red";
        if (options.cullEmpty !== false) {
            this.cullEmptySpace();
        }
    }

    setColor(color: string) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    binaryRep() {
        return this.space.reduce((prev, curr) => prev + (curr ? "1" : "0"), "");
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
        const newX = extrema.xMax - extrema.xMin + 1;
        const newY = extrema.yMax - extrema.yMin + 1;
        const newZ = extrema.zMax - extrema.zMin + 1;
        const newSpace = new Array<boolean>(newX * newY * newZ);
        newSpace.fill(false);
        let index = 0;
        for (let x = extrema.xMin; x <= extrema.xMax; x++) {
            for (let y = extrema.yMin; y <= extrema.yMax; y++) {
                for (let z = extrema.zMin; z <= extrema.zMax; z++) {
                    if (this.at(x, y, z)) {
                        newSpace[index] = true;
                    }
                    index++;
                }
            }
        }
        this.dims[0] = newX;
        this.dims[1] = newY;
        this.dims[2] = newZ;
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
        const rotations: VoxelSpaceBoolean[] = [];
        const refSpace = this.clone();
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        refSpace.rot90('z');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        return rotations;
    }

    getAllRotations() {
        const rotations: VoxelSpaceBoolean[] = [];
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

    protected static pushNewUniqueSpaces(existingSpaces: VoxelSpaceBoolean[], newSpaces: VoxelSpaceBoolean[]) {
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

    getAllPositionsInPrism(cubeDimX: number, cubeDimY: number, cubeDimZ: number): VoxelSpaceBoolean[] {
        const cubePositions: VoxelSpaceBoolean[] = [];
        if (this.dims[0] > cubeDimX || this.dims[1] > cubeDimY || this.dims[2] > cubeDimZ) {
            return cubePositions;
        }
        for (let xOffset = 0; xOffset < (cubeDimX - this.dims[0] + 1); xOffset++) {
            for (let yOffset = 0; yOffset < (cubeDimY - this.dims[1] + 1); yOffset++) {
                for (let zOffset = 0; zOffset < (cubeDimZ - this.dims[2] + 1); zOffset++) {
                    const cubePos = new VoxelSpaceBoolean({id: this.id, dims: [cubeDimX, cubeDimY, cubeDimZ], color: this.color, cullEmpty: false});
                    this.forEachCell((val, x, y, z) => {
                        cubePos.set(xOffset + x, yOffset + y, zOffset + z, val);
                    });
                    cubePositions.push(cubePos);
                }
            }
        }
        return cubePositions;
    }

    matches(space: VoxelSpaceBoolean) {
        const otherDims = space.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        const otherRaw = space.getRaw();
        if (typeof otherRaw === "bigint") {
            return space.binaryRep() === this.binaryRep();
        }
        return this.space.reduce((prev, unit, i) => (unit === otherRaw[i]) && prev, true);
    }

    clone() {
        return new VoxelSpaceBoolean({id: this.id, dims: this.getDims(), space: this.getRaw(), color: this.getColor(), cullEmpty: false});
    }

    private getAxisSpins(axis: 'x' | 'y' | 'z'): VoxelSpaceBoolean[] {
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
        return this.space.slice();
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
        return this.space[this.index(x, y, z)];
    }

    private index(x: number, y: number, z: number) {
        return this.dims[1] * this.dims[2] * x + this.dims[2] * y + z;
    }

    toggle(x: number, y: number, z: number) {
        const index = this.index(x, y, z);
        this.space[index] = !this.space[index];
    }

    set(x: number, y: number, z: number, val: boolean) {
        this.space[this.index(x, y, z)] = val;
    }

    rotated90(dim: 'x' | 'y' | 'z') {
        const newSpace = new Array<boolean>(this.dims[0] * this.dims[1] * this.dims[2]);
        newSpace.fill(false);
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
                newSpace[rotIndex(i, j, k)] = true;
            }
        })
        return new VoxelSpaceBoolean({id: this.id, dims: newDims, space: newSpace, color: this.color, cullEmpty: false});
    }

    rot90(dim: 'x' | 'y' | 'z') {
        const rot = this.rotated90(dim);
        this.space = rot.getRaw();
        this.dims = rot.getDims();
    }

    plus(space: VoxelSpaceBoolean): VoxelSpaceBoolean | null {
        const newSpace = new Array<boolean>(this.dims[0] * this.dims[1] * this.dims[2]);
        newSpace.fill(false);
        let clash = false;
        space.forEachCell((val, x, y, z) => {
            if (this.at(x, y, z) !== val) {
                newSpace[this.index(x, y, z)] = true;
            } else {
                if (val) {
                    clash = true;
                }
            }
        });
        if (!clash) {
            return new VoxelSpaceBoolean({id: this.id, dims: this.getDims(), space: newSpace, color: this.color, cullEmpty: false});
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

    getAllPermutationsInPrism(prismDimX: number, prismDimY: number, prismDimZ: number): VoxelSpaceBoolean[] {
        const rotations = this.getUniqueRotations();
        let result = new Array<VoxelSpaceBoolean>();
        for (let i = 0; i < rotations.length; i++) {
            result = result.concat(rotations[i].getAllPositionsInPrism(prismDimX, prismDimY, prismDimZ));
        }
        return result;
    }
}