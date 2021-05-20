import Polycube from "./Polycube";
import VoxelSpace from "./VoxelSpace";

export default class SomaSolver {
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