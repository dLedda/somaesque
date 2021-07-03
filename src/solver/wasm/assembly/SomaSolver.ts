import VoxelSpace from "./VoxelSpace";
import SomaSolution from "./SomaSolution";

export default class SomaSolver {
    private solutionCube: VoxelSpace;
    private dimX: i32;
    private dimY: i32;
    private dimZ: i32;
    private solutions: SomaSolution[] = new Array<SomaSolution>();
    constructor(dimX: i32, dimY: i32, dimZ: i32) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
        this.solutionCube = new VoxelSpace(0, dimX, dimY, dimZ, 0);
    }

    solve(polycubes: VoxelSpace[]): void {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        this.solutions.splice(0, this.solutions.length);
        const combosWithRots: VoxelSpace[][] = new Array<Array<VoxelSpace>>();
        for (let i = 1; i < polycubes.length; i++) {
            combosWithRots.push(polycubes[i].getAllPermutationsInPrism(this.dimX, this.dimY, this.dimZ));
        }
        let combos: VoxelSpace[][] = new Array<Array<VoxelSpace>>();
        combos.push(polycubes[0].getAllPositionsInPrism(this.dimX, this.dimY, this.dimZ));
        combos = combos.concat(combosWithRots);
        this.backtrackSolve(this.solutionCube, combos, new SomaSolution(this.dimX, this.dimY, this.dimZ));
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
                    currentSoln = new SomaSolution(this.dimX, this.dimY, this.dimZ);
                    return;
                } else {
                    this.backtrackSolve(fusionAttempt, polycubes.slice(1), nextSoln, depth + 1);
                }
            }
        }
    }
}