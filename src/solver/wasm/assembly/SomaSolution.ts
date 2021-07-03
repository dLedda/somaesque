import VoxelSpace from "./VoxelSpace";

export default class SomaSolution {
    private solutionSpaces: VoxelSpace[];
    private dimX: i32;
    private dimY: i32;
    private dimZ: i32;

    constructor(dimX: i32, dimY: i32, dimZ: i32) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
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
            const solnRot = new SomaSolution(this.dimX, this.dimY, this.dimZ);
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
        const clone = new SomaSolution(this.dimX, this.dimY, this.dimZ);
        clone.solutionSpaces = this.solutionSpaces.slice(0, this.solutionSpaces.length);
        return clone;
    }

    getPieces(): VoxelSpace[] {
        return this.solutionSpaces;
    }
}