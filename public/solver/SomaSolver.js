import VoxelSpace from "./VoxelSpace.js";
import SomaSolution from "./SomaSolution.js";
export default class SomaSolver {
    constructor(dimension) {
        this.solutions = [];
        this.iterations = 0;
        if (dimension % 1 !== 0 || dimension < 0) {
            throw new Error("The argument 'dimension' must be a positive whole number");
        }
        this.dim = dimension;
        this.solutionCube = new VoxelSpace(0, [dimension, dimension, dimension], Array(dimension ** 3).fill(0));
    }
    async solve(polycubes) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        let cumulativeSize = polycubes.reduce((prev, curr) => prev + curr.size(), 0);
        if (cumulativeSize !== this.dim ** 3) {
            throw new Error(`The polycubes passed do not add up to exactly enough units to form a cube of dimension ${this.dim}! Got: ${cumulativeSize}, need: ${this.dim ** 3}`);
        }
        this.solutions = [];
        const combosWithRots = polycubes.slice(1).map(polycube => polycube.getUniqueRotations().map((rot) => rot.getAllPositionsInCube(this.dim)).flat());
        const combos = [polycubes[0].getAllPositionsInCube(this.dim), ...combosWithRots];
        console.log(combos.flat().length);
        this.backtrackSolve(this.solutionCube, combos, new SomaSolution(this.dim));
        this.solutions = SomaSolution.filterUnique(this.solutions);
    }
    getSolutions() {
        return this.solutions.slice();
    }
    backtrackSolve(workingSolution, polycubes, currentSoln) {
        const nextCubeGroup = polycubes[0];
        for (let i = 0; i < nextCubeGroup.length; i++) {
            const fusionAttempt = workingSolution.plus(nextCubeGroup[i]);
            if (fusionAttempt) {
                const nextSoln = currentSoln.clone();
                nextSoln.addSpace(nextCubeGroup[i]);
                if (polycubes.length === 1) {
                    this.solutions.push(nextSoln);
                    currentSoln = new SomaSolution(this.dim);
                    return;
                }
                else {
                    this.backtrackSolve(fusionAttempt, polycubes.slice(1), nextSoln);
                }
            }
        }
    }
}

class SomaSolution {
    constructor(dim) {
        if (dim < 0 || dim % 1 !== 0) {
            throw new Error("Dimension must be a whole positive integer!");
        }
        this.dim = dim;
        this.solutionSpaces = [];
    }
    static filterUnique(solutions) {
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
    getUniqueRotations() {
        if (this.solutionSpaces.length === 0) {
            return [];
        }
        const result = [];
        const allRots = this.solutionSpaces.map(space => space.getAllRotations());
        for (let i = 0; i < allRots[0].length; i++) {
            const solnRot = new SomaSolution(this.dim);
            allRots.forEach(rotGroup => solnRot.addSpace(rotGroup[i]));
            result.push(solnRot);
        }
        return result;
    }
    matches(solution) {
        for (let i = 0; i < this.solutionSpaces.length; i++) {
            if (!this.solutionSpaces[i].matches(solution.solutionSpaces[i])) {
                return false;
            }
        }
        return true;
    }
    addSpace(space) {
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
    at(x, y, z) {
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
