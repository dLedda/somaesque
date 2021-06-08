import VoxelSpace from "./VoxelSpace";
import SomaSolution from "./SomaSolution";

export default class SomaSolver {
    private solutionCube: VoxelSpace;
    private dim: number;
    private solutions: SomaSolution[] = [];
    private iterations: number = 0;
    constructor(dimension: number) {
        if (dimension % 1 !== 0 || dimension < 0) {
            throw new Error("The argument 'dimension' must be a positive whole number");
        }
        this.dim = dimension;
        this.solutionCube = new VoxelSpace(0, [dimension, dimension, dimension], Array(dimension**3).fill(0));
    }

    async solve(polycubes: VoxelSpace[]) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        let cumulativeSize = polycubes.reduce((prev, curr) => prev + curr.size(), 0);
        if (cumulativeSize !== this.dim**3) {
            throw new Error(`The polycubes passed do not add up to exactly enough units to form a cube of dimension ${this.dim}! Got: ${cumulativeSize}, need: ${this.dim**3}`);
        }
        this.solutions = [];
        const combosWithRots = polycubes.slice(1).map(polycube => polycube.getUniqueRotations().map((rot: VoxelSpace) => rot.getAllPositionsInCube(this.dim)).flat());
        const combos = [polycubes[0].getAllPositionsInCube(this.dim), ...combosWithRots];
        this.backtrackSolve(this.solutionCube, combos, new SomaSolution(this.dim));
        this.solutions = SomaSolution.filterUnique(this.solutions);
    }

    getSolutions() {
        return this.solutions.slice();
    }

    private backtrackSolve(workingSolution: VoxelSpace, polycubes: VoxelSpace[][], currentSoln: SomaSolution, depth = 0) {
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
                } else {
                    this.backtrackSolve(fusionAttempt, polycubes.slice(1), nextSoln, depth + 1);
                }
            }
        }
    }
}