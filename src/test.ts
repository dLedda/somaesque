class SomaSolver {
    private solutionCube: VoxelSpace;
    private dim: number;
    private solutions: VoxelSpace[] = [];
    private iterations: number = 0;
    constructor(dimension: number) {
        if (dimension % 1 !== 0 || dimension < 0) {
            throw new Error("The argument 'dimension' must be a positive whole number");
        }
        this.dim = dimension;
        this.solutionCube = new VoxelSpace([dimension, dimension, dimension], Array(dimension**3).fill(0));
    }

    solve(polycubes: Polycube[]) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        let cumulativeSize = polycubes.reduce((prev, curr) => prev + curr.size(), 0);
        if (cumulativeSize !== this.dim**3) {
            throw new Error(`The polycubes passed do not add up to exactly enough units to form a cube of dimension ${this.dim}! Got: ${cumulativeSize}, need: ${this.dim**3}`);
        }
        this.iterations = 0;
        this.backtrackSolve(this.solutionCube, polycubes);
        this.solutions = VoxelSpace.filterUnique(this.solutions);
        this.solutions.forEach(sol => sol.print());
        console.log(this.solutions.length);
    }

    private backtrackSolve(workingSolution: VoxelSpace, polycubes: Polycube[], depth = 0) {
        const nextCube = polycubes[0];
        const rots = depth === 0 ? [nextCube] : nextCube.getUniqueRotations();
        for (let i = 0; i < rots.length; i++) {
            const polyCubeDims = rots[i].getDims();
            for (let x = 0; x < this.dim - polyCubeDims[0] + 1; x++) {
                for (let y = 0; y < this.dim - polyCubeDims[1] + 1; y++) {
                    for (let z = 0; z < this.dim - polyCubeDims[2] + 1; z++) {
                        const successfulFusion = workingSolution.plus(rots[i], x, y, z);
                        if (successfulFusion) {
                            if (polycubes.length === 1) {
                                console.log("soln", this.iterations++);
                                this.solutions.push(successfulFusion);
                                return;
                            } else {
                                this.backtrackSolve(successfulFusion, polycubes.slice(1), depth + 1);
                            }
                        }
                    }
                }
            }
        }
    }
}

class VoxelSpace {
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

class Polycube extends VoxelSpace {
    private id: number;
    constructor(dims: DimensionDef, vals: boolean[], id: number) {
        super(dims, vals.map(val => val ? id : 0), true);
        this.id = id;
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
                    accum += this.at(i, j, k) === 0 ? "O" : "#";
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

    matches(cube: VoxelSpace) {
        const otherDims = cube.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        const otherVals = cube.getVals();
        for (let i = 0; i < this.vals.length; i++) {
            if (Number(this.vals[i]) !== Number(otherVals[i])) {
                return false;
            }
        }
        return true;
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

    rotated90(dim: "x" | "y" | "z"): Polycube {
        const rotated = super.rotated90(dim);
        return new Polycube(rotated.getDims(), rotated.getVals() as unknown as boolean[], this.id);
    }

    clone(): Polycube {
        return new Polycube(this.getDims(), this.getVals() as unknown as boolean[], this.id);
    }

    getUniqueRotations(): Polycube[] {
        return super.getUniqueRotations().map(rot => new Polycube(rot.getDims(), rot.getVals() as unknown as boolean[], this.id));
    }
}

type DimensionDef = [number, number, number];

// const testCube = new Cube([4, 2, 5], [
//     "000", "001", "002", "003", "004",
//     "010", "011", "012", "013", "014",
//     "100", "101", "102", "103", "104",
//     "110", "111", "112", "113", "114",
//     "200", "201", "202", "203", "204",
//     "210", "211", "212", "213", "214",
//     "300", "301", "302", "303", "304",
//     "310", "311", "312", "313", "314",
// ]);
// const somaCube = new Polycube([3, 3, 3], [
//     false, false, false,
//     false, false, false,
//     false, false, false,
//
//     true, true, true,
//     true, true, true,
//     false, false, false,
//
//     false, false, false,
//     false, false, false,
//     false, false, false,
// ], 1);
const unitCube1 = new Polycube([1, 1, 1], [true], 1);
const unitCube2 = new Polycube([1, 1, 1], [true], 2);
const unitCube3 = new Polycube([1, 1, 1], [true], 3);
const unitCube4 = new Polycube([1, 1, 1], [true], 4);
const unitCube5 = new Polycube([1, 1, 1], [true], 5);
const unitCube6 = new Polycube([1, 1, 1], [true], 6);
const unitCube7 = new Polycube([1, 1, 1], [true], 7);
const unitCube8 = new Polycube([1, 1, 1], [true], 8);
const unitCube9 = new Polycube([1, 1, 1], [true], 9);
const unitCube10 = new Polycube([1, 1, 1], [true], 10);
const unitCube11 = new Polycube([1, 1, 1], [true], 11);
const unitCube12 = new Polycube([1, 1, 1], [true], 12);
const unitCube13 = new Polycube([1, 1, 1], [true], 13);
const unitCube14 = new Polycube([1, 1, 1], [true], 14);
const unitCube15 = new Polycube([1, 1, 1], [true], 15);
const unitCube16 = new Polycube([1, 1, 1], [true], 16);
const unitCube17 = new Polycube([1, 1, 1], [true], 17);
const unitCube18 = new Polycube([1, 1, 1], [true], 18);
const unitCube19 = new Polycube([1, 1, 1], [true], 19);
const unitCube20 = new Polycube([1, 1, 1], [true], 20);
const unitCube21 = new Polycube([1, 1, 1], [true], 21);
const unitCube22 = new Polycube([1, 1, 1], [true], 22);
const unitCube23 = new Polycube([1, 1, 1], [true], 23);
const unitCube24 = new Polycube([1, 1, 1], [true], 24);
const unitCube25 = new Polycube([1, 1, 1], [true], 25);
const unitCube26 = new Polycube([1, 1, 1], [true], 26);
const unitCube27 = new Polycube([1, 1, 1], [true], 27);

const tetromino1 = new Polycube([3, 3, 3], [
    true, true, true,
    false, true, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 1);

const tetromino2 = new Polycube([3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, true, false,
    false, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 2);

const tetromino3 = new Polycube([3, 3, 3], [
    true, false, false,
    true, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 3);

const tetromino4 = new Polycube([3, 3, 3], [
    true, true, false,
    false, false, false,
    false, false, false,

    true, false, false,
    true, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 4);

const tetromino5 = new Polycube([3, 3, 3], [
    true, true, false,
    false, false, false,
    false, false, false,

    false, true, false,
    false, true, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 5);

const tetromino6 = new Polycube([3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, false, false,
    false, true, false,
    false, true, true,

    false, false, false,
    false, false, false,
    false, false, false,
], 6);

const triomino1 = new Polycube([3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, false, false,
    false, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 7);

// const cube = new VoxelSpace([3, 3, 3], Array(3**3).fill(0));
// cube.plus(triomino1)?.plus(tetromino2, {x: 1, y: 0, z: 1})?.print();

function start() {
    const solver = new SomaSolver(3);
    console.log("solving");
    solver.solve([triomino1, tetromino2, tetromino3, tetromino1, tetromino4, tetromino5, tetromino6]);
}
