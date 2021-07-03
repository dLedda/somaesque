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
    private dimX: i32;
    private dimY: i32;
    private dimZ: i32;

    constructor(id: i32, dimx: i32, dimy: i32, dimz: i32, space: i64 = 0, cullEmpty: boolean = false) {
        this.id = id;
        this.length = dimx * dimy * dimz;
        this.dimX = dimx;
        this.dimY = dimy;
        this.dimZ = dimz;
        this.space = space;
        if (cullEmpty) {
            this.cullEmptySpace();
        }
    }

    getExtrema(): Extrema {
        const extrema = new Extrema(
            0,
            this.dimX,
            0,
            this.dimY,
            0,
            this.dimZ,
        );
        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
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
        let index: i32 = 0;
        let newSpace: i64 = 0;
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
        this.dimX = extrema.xMax - extrema.xMin + 1;
        this.dimY = extrema.yMax - extrema.yMin + 1;
        this.dimZ = extrema.zMax - extrema.zMin + 1;
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

    getAllPositionsInPrism(cubeDimX: i32, cubeDimY: i32, cubeDimZ: i32): VoxelSpace[] {
        const cubePositions: VoxelSpace[] = [];
        if (this.dimX > cubeDimX || this.dimY > cubeDimY || this.dimZ > cubeDimZ) {
            return cubePositions;
        }
        for (let x = 0; x < (cubeDimX - this.dimX + 1); x++) {
            for (let y = 0; y < (cubeDimY - this.dimY + 1); y++) {
                for (let z = 0; z < (cubeDimZ - this.dimZ + 1); z++) {
                    const cubePos = new VoxelSpace(this.id, cubeDimX, cubeDimY, cubeDimZ);
                    for (let posX = 0; posX < this.dimX; posX++) {
                        for (let posY = 0; posY < this.dimY; posY++) {
                            for (let posZ = 0; posZ < this.dimZ; posZ++) {
                                cubePos.set(x + posX, y + posY, z + posZ, this.at(posX, posY, posZ));
                            }
                        }
                    }
                    cubePositions.push(cubePos);
                }
            }
        }
        return cubePositions;
    }

    matches(space: VoxelSpace): boolean {
        if (space.dimX !== this.dimX) {
            return false;
        }
        if (space.dimY !== this.dimY) {
            return false;
        }
        if (space.dimZ !== this.dimZ) {
            return false;
        }
        return this.space == space.getRaw();
    }

    clone(): VoxelSpace {
        return new VoxelSpace(this.id, this.dimX, this.dimY, this.dimZ, this.getRaw());
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
        return this.dimZ * this.dimY * x + this.dimY * (this.dimZ - 1 - z) + y;
    }

    // [ 0, 0, 1]   [x]   [ z]
    // [ 0, 1, 0] * [y] = [ y]
    // [-1, 0, 0]   [z]   [-x]
    private newIndexRotY(x: i32, y: i32, z: i32): i32 {
        return this.dimY * this.dimX * z + this.dimX * y + (this.dimX - 1 - x);
    }

    // [0, -1, 0]     [x]   [-y]
    // [1,  0, 0]  *  [y] = [ x]
    // [0,  0, 1]     [z]   [ z]
    private newIndexRotZ(x: i32, y: i32, z: i32): i32 {
        return this.dimX * this.dimZ * (this.dimY - 1 - y) + this.dimZ * x + z;
    }

    at(x: i32, y: i32, z: i32): boolean {
        const mask = 1 << (this.dimY * this.dimZ * x + this.dimZ * y + z);
        return (this.space & mask) !== 0;
    }

    toggle(x: i32, y: i32, z: i32): void {
        const mask = 1 << this.dimY * this.dimZ * x + this.dimZ * y + z;
        this.space ^= mask;
    }

    set(x: i32, y: i32, z: i32, val: boolean): void {
        const mask = 1 << this.dimY * this.dimZ * x + this.dimZ * y + z;
        if (val) {
            this.space |= mask;
        } else {
            this.space &= ~mask;
        }
    }

    rotated90X(): VoxelSpace {
        let newSpace = 0;
        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1 << this.newIndexRotX(x, y, z);
                    }
                }
            }
        }
        return new VoxelSpace(this.id, this.dimX, this.dimZ, this.dimY, newSpace);
    }

    rotated90Y(): VoxelSpace {
        let newSpace = 0;
        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1 << this.newIndexRotY(x, y, z);
                    }
                }
            }
        }
        return new VoxelSpace(this.id, this.dimZ, this.dimY, this.dimX, newSpace);
    }

    rotated90Z(): VoxelSpace {
        let newSpace = 0;
        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1 << this.newIndexRotZ(x, y, z);
                    }
                }
            }
        }
        return new VoxelSpace(this.id, this.dimY, this.dimX, this.dimZ, newSpace);
    }

    rot90X(): void {
        const rot = this.rotated90X();
        this.space = rot.getRaw();
        this.dimX = rot.dimX;
        this.dimY = rot.dimY;
        this.dimZ = rot.dimZ;
    }

    rot90Y(): void {
        const rot = this.rotated90Y();
        this.space = rot.getRaw();
        this.dimX = rot.dimX;
        this.dimY = rot.dimY;
        this.dimZ = rot.dimZ;
    }

    rot90Z(): void {
        const rot = this.rotated90Z();
        this.space = rot.getRaw();
        this.dimX = rot.dimX;
        this.dimY = rot.dimY;
        this.dimZ = rot.dimZ;
    }

    plus(space: VoxelSpace): VoxelSpace | null {
        const otherSpace = space.getRaw();
        if ((this.space | otherSpace) == (this.space ^ otherSpace)) {
            return new VoxelSpace(this.id, this.dimX, this.dimY, this.dimZ, otherSpace | this.space);
        }
        return null;
    }

    size(): i32 {
        let size = 0;
        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    if (this.at(x, y, z)) {
                        size++;
                    }
                }
            }
        }
        return size;
    }

    getAllPermutationsInPrism(prismDimX: i32, prismDimY: i32, prismDimZ: i32): VoxelSpace[] {
        const rotations = this.getUniqueRotations();
        let result = new Array<VoxelSpace>();
        for (let i = 0; i < rotations.length; i++) {
            result = result.concat(rotations[i].getAllPositionsInPrism(prismDimX, prismDimY, prismDimZ));
        }
        return result;
    }
}