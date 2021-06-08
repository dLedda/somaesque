import VoxelSpace from "./VoxelSpace";
import SomaSolution from "./SomaSolution";

export default class SomaSolver {
    private solutionCube: VoxelSpace;
    private dim: i32;
    private solutions: SomaSolution[] = new Array<SomaSolution>();
    private iterations: i32 = 0;
    constructor(dimension: i32) {
        if (dimension % 1 !== 0 || dimension < 0) {
            throw new Error("The argument 'dimension' must be a positive whole number");
        }
        this.dim = dimension;
        this.solutionCube = new VoxelSpace(0, dimension, dimension, dimension, 0);
    }

    solve(polycubes: VoxelSpace[]): void {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        let cumulativeSize = polycubes.reduce((prev, curr) => prev + curr.size(), 0);
        if (cumulativeSize !== this.dim**3) {
            throw new Error(`The polycubes passed do not add up to exactly enough units to form a cube of dimension ${this.dim}! Got: ${cumulativeSize}, need: ${this.dim**3}`);
        }
        this.solutions.splice(0, this.solutions.length);
        const combosWithRots: VoxelSpace[][] = new Array<Array<VoxelSpace>>();
        for (let i = 1; i < polycubes.length; i++) {
            combosWithRots.push(polycubes[i].getAllPermutationsInCubeOfSize(this.dim));
        }
        let combos: VoxelSpace[][] = new Array<Array<VoxelSpace>>();
        combos.push(polycubes[0].getAllPositionsInCube(this.dim));
        combos = combos.concat(combosWithRots);
        this.backtrackSolve(this.solutionCube, combos, new SomaSolution(this.dim));
        this.solutions = SomaSolution.filterUnique(this.solutions);
    }

    getSolutions(): SomaSolution[] {
        return this.solutions.slice(0, this.solutions.length);
    }

    private backtrackSolve(workingSolution: VoxelSpace, polycubes: VoxelSpace[][], currentSoln: SomaSolution, depth: i32 = 0): void {
        const nextCubeGroup = polycubes[0];
        for (let i = 0; i < nextCubeGroup.length; i++) {
            const fusionAttempt = workingSolution.plus(nextCubeGroup[i]);
            if (fusionAttempt) {
                const nextSoln = currentSoln.clone();
                nextSoln.addSpace(nextCubeGroup[i]);
                if (polycubes.length == 1) {
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