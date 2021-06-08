import VoxelSpace from "./VoxelSpace";

export default class SomaSolution {
    private solutionSpaces: VoxelSpace[];
    private dim: i32;
    constructor(dim: i32) {
        if (dim < 0 || dim % 1 !== 0) {
            throw new Error("Dimension must be a whole positive integer!");
        }
        this.dim = dim;
        this.solutionSpaces = [];
    }

    static filterUnique(solutions: SomaSolution[]): SomaSolution[] {
        const uniqueSolns = new Array<SomaSolution>();
        if (solutions.length == 0) {
            return uniqueSolns;
        }
        uniqueSolns.push(solutions[0]);
        for (let iSoln = 0; iSoln < solutions.length; iSoln++) {
            const rots = solutions[iSoln].getRotations();
            let foundMatch = false;
            for (let iRot = 0; iRot < rots.length; iRot++) {
                let end = uniqueSolns.length;
                for (let i = 0; i < end; i++) {
                    if (rots[iRot].matches(uniqueSolns[i])) {
                        foundMatch = true;
                    }
                }
            }
            if (!foundMatch) {
                uniqueSolns.push(solutions[iSoln]);
            }
        }
        return uniqueSolns;
    }

    getRotations(): SomaSolution[] {
        const result: SomaSolution[] = new Array<SomaSolution>();
        if (this.solutionSpaces.length == 0) {
            return result;
        }
        const allRots: VoxelSpace[][] = this.solutionSpaces.map<VoxelSpace[]>(space => space.getAllRotations());
        for (let i = 0; i < allRots[0].length; i++) {
            const solnRot = new SomaSolution(this.dim);
            for (let j = 0; j < allRots.length; j++) {
                solnRot.addSpace(allRots[j][i]);
            }
            result.push(solnRot);
        }
        return result;
    }

    matches(solution: SomaSolution): boolean {
        for (let i = 0; i < this.solutionSpaces.length; i++) {
            if (!this.solutionSpaces[i].matches(solution.solutionSpaces[i])) {
                return false;
            }
        }
        return true;
    }

    addSpace(space: VoxelSpace): void {
        this.solutionSpaces.push(space);
    }

    at(x: i32, y: i32, z: i32): i32 {
        for (let i = 0; i < this.solutionSpaces.length; i++) {
            if (this.solutionSpaces[i].at(x, y, z)) {
                return this.solutionSpaces[i].getId();
            }
        }
        return 0;
    }

    clone(): SomaSolution {
        const clone = new SomaSolution(this.dim);
        clone.solutionSpaces = this.solutionSpaces.slice(0, this.solutionSpaces.length);
        return clone;
    }

    getDims(): i32[] {
        return [this.dim, this.dim, this.dim];
    }

    getPieces(): VoxelSpace[] {
        return this.solutionSpaces;
    }
}