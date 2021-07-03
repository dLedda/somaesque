import type VoxelSpaceBoolean from "./VoxelSpaceBoolean";

export default class SomaSolution {
    private solutionSpaces: VoxelSpaceBoolean[];
    private dimX: number;
    private dimY: number;
    private dimZ: number;

    constructor(dimX: number, dimY: number, dimZ: number) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
        this.solutionSpaces = [];
    }

    static filterUnique(solutions: SomaSolution[]): SomaSolution[] {
        if (solutions.length === 0) {
            return [];
        }
        const uniqueSolns = [solutions[0]];
        for (const solution of solutions) {
            let foundMatch = false;
            for (const rotation of solution.getRotations()) {
                let end = uniqueSolns.length;
                for (let i = 0; i < end; i++) {
                    if (rotation.matches(uniqueSolns[i])) {
                        foundMatch = true;
                    }
                }
            }
            if (!foundMatch) {
                uniqueSolns.push(solution);
            }
        }
        return uniqueSolns;
    }

    getRotations(): SomaSolution[] {
        if (this.solutionSpaces.length === 0) {
            return [];
        }
        const result: SomaSolution[] = [];
        const allRots = this.solutionSpaces.map(space => space.getAllRotations());
        for (let i = 0; i < allRots[0].length; i++) {
            const solnRot = new SomaSolution(this.dimX, this.dimY, this.dimZ);
            allRots.forEach(rotGroup => solnRot.addSpace(rotGroup[i]));
            result.push(solnRot);
        }
        return result;
    }

    matches(solution: SomaSolution) {
        for (let i = 0; i < this.solutionSpaces.length; i++) {
            if (!this.solutionSpaces[i].matches(solution.solutionSpaces[i])) {
                return false;
            }
        }
        return true;
    }

    addSpace(space: VoxelSpaceBoolean) {
        this.solutionSpaces.push(space);
    }

    print() {
        let accum = "";
        console.log("---");
        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    for (const space of this.solutionSpaces) {
                        if (space.at(x, y, z)) {
                            accum += space.getId();
                        }
                    }
                }
                console.log(accum);
                accum = "";
            }
            if (x !== this.dimX - 1) {
                console.log("-");
            }
        }
        console.log("---");
    }

    at(x: number, y: number, z: number) {
        for (const space of this.solutionSpaces) {
            if (space.at(x, y, z)) {
                return space.getId();
            }
        }
        return 0;
    }

    clone() {
        const clone = new SomaSolution(this.dimX, this.dimY, this.dimZ);
        clone.solutionSpaces = this.solutionSpaces.slice();
        return clone;
    }

    getDims() {
        return [this.dimX, this.dimY, this.dimZ];
    }

    forEachCell(cb: (val: number, x: number, y: number, z: number) => any) {
        loopStart: for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    cb(this.at(x, y, z), x, y, z);
                }
            }
        }
    }

    getPieces() {
        return this.solutionSpaces.slice();
    }
}