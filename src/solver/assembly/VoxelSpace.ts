class Extrema {
    constructor(
        public xMax: i32,
        public xMin: i32,
        public yMax: i32,
        public yMin: i32,
        public zMax: i32,
        public zMin: i32,
    ) {}
}

export default class VoxelSpace {
    private length: i32;
    private space: i64;
    private id: i32;
    private dimx: i32;
    private dimy: i32;
    private dimz: i32;

    constructor(id: i32, dimx: i32, dimy: i32, dimz: i32, space: i64 = 0, cullEmpty: boolean = false) {
        if (!space) {
            space = 0;
        }
        this.id = id;
        this.length = dimx * dimy * dimz;
        this.dimx = dimx;
        this.dimy = dimy;
        this.dimz = dimz;
        this.space = space;
        if (cullEmpty) {
            this.cullEmptySpace();
        }
    }

    getExtrema(): Extrema {
        const extrema = new Extrema(
            0,
            i32.MAX_VALUE,
            0,
            i32.MAX_VALUE,
            0,
            i32.MAX_VALUE,
        );
        for (let x = 0; x < this.dimx; x++) {
            for (let y = 0; y < this.dimy; y++) {
                for (let z = 0; z < this.dimz; z++) {
                    const val = this.at(x, y, z);
                    if (val) {
                        extrema.xMax = Math.max(extrema.xMax, x) as i32;
                        extrema.xMin = Math.min(extrema.xMin, x) as i32;
                        extrema.yMax = Math.max(extrema.yMax, y) as i32;
                        extrema.yMin = Math.min(extrema.yMin, y) as i32;
                        extrema.zMax = Math.max(extrema.zMax, z) as i32;
                        extrema.zMin = Math.min(extrema.zMin, z) as i32;
                    }
                }
            }
        }
        return extrema;
    }

    private cullEmptySpace(): void {
        const extrema = this.getExtrema();
        let index = 0;
        let newSpace = 0;
        for (let x = extrema.xMin; x <= extrema.xMax; x++) {
            for (let y = extrema.yMin; y <= extrema.yMax; y++) {
                for (let z = extrema.zMin; z <= extrema.zMax; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1 << index;
                    }
                    index++;
                }
            }
        }
        this.dimx = extrema.xMax - extrema.xMin + 1;
        this.dimy = extrema.yMax - extrema.yMin + 1;
        this.dimz = extrema.zMax - extrema.zMin + 1;
        this.space = newSpace;
    }

    getId(): i32 {
        return this.id;
    }

    getUniqueRotations(): VoxelSpace[] {
        const rotations: VoxelSpace[] = new Array<VoxelSpace>();
        const refSpace = this.clone();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getXAxisSpins());
        refSpace.rot90Y();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getXAxisSpins());
        refSpace.rot90Y();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getXAxisSpins());
        refSpace.rot90Y();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getXAxisSpins());
        refSpace.rot90Z();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getXAxisSpins());
        refSpace.rot90Z();
        refSpace.rot90Z();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getXAxisSpins());
        return rotations;
    }

    getAllRotations(): VoxelSpace[] {
        let rotations: VoxelSpace[] = new Array<VoxelSpace>();
        const refSpace = this.clone();
        rotations = rotations.concat(refSpace.getXAxisSpins());
        refSpace.rot90Y();
        rotations = rotations.concat(refSpace.getXAxisSpins());
        refSpace.rot90Y();
        rotations = rotations.concat(refSpace.getXAxisSpins());
        refSpace.rot90Y();
        rotations = rotations.concat(refSpace.getXAxisSpins());
        refSpace.rot90Z();
        rotations = rotations.concat(refSpace.getXAxisSpins());
        refSpace.rot90Z();
        refSpace.rot90Z();
        rotations = rotations.concat(refSpace.getXAxisSpins());
        return rotations;
    }

    protected static pushNewUniqueSpaces(existingSpaces: VoxelSpace[], newSpaces: VoxelSpace[]): void {
        for (let iNew = 0; iNew < newSpaces.length; iNew++) {
            let matchFound = false;
            for (let iExisting = 0; iExisting < existingSpaces.length; iExisting++) {
                if (newSpaces[iNew].matches(existingSpaces[iExisting])) {
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                existingSpaces.push(newSpaces[iNew]);
            }
        }
    }

    getAllPositionsInCube(cubeDim: i32): VoxelSpace[] {
        if ((cubeDim > 0) && (cubeDim % 1 == 0)) {
            const cubePositions: VoxelSpace[] = [];
            for (let x = 0; x < cubeDim - this.dimx + 1; x++) {
                for (let y = 0; y < cubeDim - this.dimy + 1; y++) {
                    for (let z = 0; z < cubeDim - this.dimz + 1; z++) {
                        const cubePos = new VoxelSpace(this.id, cubeDim, cubeDim, cubeDim);
                        for (let rotX = 0; rotX < this.dimx; rotX++) {
                            for (let rotY = 0; rotY < this.dimy; rotY++) {
                                for (let rotZ = 0; rotZ < this.dimz; rotZ++) {
                                    cubePos.set(x + rotX, y + rotY, z + rotZ, this.at(rotX, rotY, rotZ));
                                }
                            }
                        }
                        cubePositions.push(cubePos);
                    }
                }
            }
            return cubePositions;
        } else {
            throw new Error("cubeDim must be a positive integer.");
        }
    }

    matches(space: VoxelSpace): boolean {
        if (space.dimx !== this.dimx) {
            return false;
        }
        if (space.dimy !== this.dimy) {
            return false;
        }
        if (space.dimz !== this.dimz) {
            return false;
        }
        return this.space == space.getRaw();
    }

    clone(): VoxelSpace {
        return new VoxelSpace(this.id, this.dimx, this.dimy, this.dimz, this.getRaw());
    }

    private getXAxisSpins(): VoxelSpace[] {
        const rotations: Array<VoxelSpace> = new Array<VoxelSpace>();
        rotations.push(this.clone());
        for (let i = 0; i < 3; i++) {
            rotations.push(rotations[i].rotated90X());
        }
        return rotations;
    }

    getRaw(): i64 {
        return this.space;
    }

    // [1, 0,  0]   [x]   [ x]
    // [0, 0, -1] * [y] = [-z]
    // [0, 1,  0]   [z]   [ y]
    private newIndexRotX(x: i32, y: i32, z: i32): i32 {
        return this.dimz * this.dimy * x + this.dimy * (this.dimz - 1 - z) + y;
    }

    // [ 0, 0, 1]   [x]   [ z]
    // [ 0, 1, 0] * [y] = [ y]
    // [-1, 0, 0]   [z]   [-x]
    private newIndexRotY(x: i32, y: i32, z: i32): i32 {
        return this.dimy * this.dimx * z + this.dimx * y + (this.dimx - 1 - x);
    }

    // [0, -1, 0]     [x]   [-y]
    // [1,  0, 0]  *  [y] = [ x]
    // [0,  0, 1]     [z]   [ z]
    private newIndexRotZ(x: i32, y: i32, z: i32): i32 {
        return this.dimx * this.dimz * (this.dimy - 1 - y) + this.dimz * x + z;
    }

    at(x: i32, y: i32, z: i32): boolean {
        const mask = 1 << (this.dimy * this.dimz * x + this.dimz * y + z);
        return (this.space & mask) !== 0;
    }

    toggle(x: i32, y: i32, z: i32): void {
        const mask = 1 << this.dimy * this.dimz * x + this.dimz * y + z;
        this.space ^= mask;
    }

    set(x: i32, y: i32, z: i32, val: boolean): void {
        const mask = 1 << this.dimy * this.dimz * x + this.dimz * y + z;
        if (val) {
            this.space |= mask;
        } else {
            this.space &= ~mask;
        }
    }

    rotated90X(): VoxelSpace {
        let newSpace = 0;
        for (let x = 0; x < this.dimx; x++) {
            for (let y = 0; y < this.dimy; y++) {
                for (let z = 0; z < this.dimz; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1 << this.newIndexRotX(x, y, z);
                    }
                }
            }
        }
        return new VoxelSpace(this.id, this.dimx, this.dimz, this.dimy, newSpace);
    }

    rotated90Y(): VoxelSpace {
        let newSpace = 0;
        for (let x = 0; x < this.dimx; x++) {
            for (let y = 0; y < this.dimy; y++) {
                for (let z = 0; z < this.dimz; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1 << this.newIndexRotY(x, y, z);
                    }
                }
            }
        }
        return new VoxelSpace(this.id, this.dimz, this.dimy, this.dimx, newSpace);
    }

    rotated90Z(): VoxelSpace {
        let newSpace = 0;
        for (let x = 0; x < this.dimx; x++) {
            for (let y = 0; y < this.dimy; y++) {
                for (let z = 0; z < this.dimz; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1 << this.newIndexRotZ(x, y, z);
                    }
                }
            }
        }
        return new VoxelSpace(this.id, this.dimy, this.dimx, this.dimz, newSpace);
    }

    rot90X(): void {
        const rot = this.rotated90X();
        this.space = rot.getRaw();
        this.dimx = rot.dimx;
        this.dimy = rot.dimy;
        this.dimz = rot.dimz;
    }

    rot90Y(): void {
        const rot = this.rotated90Y();
        this.space = rot.getRaw();
        this.dimx = rot.dimx;
        this.dimy = rot.dimy;
        this.dimz = rot.dimz;
    }

    rot90Z(): void {
        const rot = this.rotated90Z();
        this.space = rot.getRaw();
        this.dimx = rot.dimx;
        this.dimy = rot.dimy;
        this.dimz = rot.dimz;
    }

    plus(space: VoxelSpace): VoxelSpace | null {
        const otherSpace = space.getRaw();
        if ((this.space | otherSpace) == (this.space ^ otherSpace)) {
            return new VoxelSpace(this.id, this.dimx, this.dimy, this.dimz, otherSpace | this.space);
        }
        return null;
    }

    size(): i32 {
        let size = 0;
        for (let x = 0; x < this.dimx; x++) {
            for (let y = 0; y < this.dimy; y++) {
                for (let z = 0; z < this.dimz; z++) {
                    if (this.at(x, y, z)) {
                        size++;
                    }
                }
            }
        }
        return size;
    }

    getAllPermutationsInCubeOfSize(dim: i32): VoxelSpace[] {
        const rotations = this.getUniqueRotations();
        let result = new Array<VoxelSpace>();
        for (let i = 0; i < rotations.length; i++) {
            result = result.concat(rotations[i].getAllPositionsInCube(dim));
        }
        return result;
    }
}