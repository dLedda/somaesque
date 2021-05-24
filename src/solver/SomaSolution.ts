import type VoxelSpace from "./VoxelSpace";

export default class SomaSolution {
    private solutionSpaces: VoxelSpace[];
    private dim: number;
    constructor(dim: number) {
        if (dim < 0 || dim % 1 !== 0) {
            throw new Error("Dimension must be a whole positive integer!");
        }
        this.dim = dim;
        this.solutionSpaces = [];
    }

    static filterUnique(solutions: SomaSolution[]): SomaSolution[] {
        if (solutions.length === 0) {
            return [];
        }
        const uniqueSolns = [solutions[0]];
        for (const solution of solutions) {
            let foundMatch = false;
            for (const rotation of solution.getUniqueRotations()) {
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

    getUniqueRotations(): SomaSolution[] {
        if (this.solutionSpaces.length === 0) {
            return [];
        }
        const result: SomaSolution[] = [];
        const allRots = this.solutionSpaces.map(space => space.getAllRotations());
        for (let i = 0; i < allRots[0].length; i++) {
            const solnRot = new SomaSolution(this.dim);
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

    addSpace(space: VoxelSpace) {
        this.solutionSpaces.push(space);
    }

    print() {
        let accum = "";
        console.log("---");
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                for (let z = 0; z < this.dim; z++) {
                    for (const space of this.solutionSpaces) {
                        if (space.at(x, y, z)) {
                            accum += space.getId();
                        }
                    }
                }
                console.log(accum);
                accum = "";
            }
            if (x !== this.dim - 1) {
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
        const clone = new SomaSolution(this.dim);
        clone.solutionSpaces = this.solutionSpaces.slice();
        return clone;
    }
}