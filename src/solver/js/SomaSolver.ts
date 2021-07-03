import VoxelSpaceBoolean from "./VoxelSpaceBoolean";
import SomaSolution from "./SomaSolution";

interface DebugVisualiser {
    showSoln(soln: SomaSolution): Promise<void>;
    showSpace(cube: VoxelSpaceBoolean): Promise<void>;
}

export default class SomaSolver {
    private solutionCube: VoxelSpaceBoolean;
    private dimX: number;
    private dimY: number;
    private dimZ: number;
    private visualiser: DebugVisualiser = {async showSoln(soln: SomaSolution) {}, async showSpace(cube: VoxelSpaceBoolean) {}};
    private solutions: SomaSolution[] = new Array<SomaSolution>();
    private iterations: number = 0;
    constructor(dimX: number, dimY: number, dimZ: number) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
        this.solutionCube = new VoxelSpaceBoolean({id: 0, dims: [dimX, dimY, dimZ], cullEmpty: false});
    }

    setDebug(visualiser: DebugVisualiser) {
        this.visualiser = visualiser;
    }

    async solve(polycubes: VoxelSpaceBoolean[]) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        this.solutions.splice(0, this.solutions.length);
        const combosWithRots: VoxelSpaceBoolean[][] = new Array<Array<VoxelSpaceBoolean>>();
        for (let i = 1; i < polycubes.length; i++) {
            const rots = polycubes[i].getAllPermutationsInPrism(this.dimX, this.dimY, this.dimZ);
            combosWithRots.push(rots);
        }
        let combos: VoxelSpaceBoolean[][] = new Array<Array<VoxelSpaceBoolean>>();
        combos.push(polycubes[0].getAllPositionsInPrism(this.dimX, this.dimY, this.dimZ));
        combos = combos.concat(combosWithRots);
        for (const combo of combos) {
            for (const rot of combo) {
                await this.visualiser.showSpace(rot);
            }
        }
        await this.backtrackSolve(this.solutionCube, combos, new SomaSolution(this.dimX, this.dimY, this.dimZ));
        this.solutions = SomaSolution.filterUnique(this.solutions);
    }

    getSolutions() {
        return this.solutions.slice();
    }

    private async backtrackSolve(workingSolution: VoxelSpaceBoolean, polycubes: VoxelSpaceBoolean[][], currentSoln: SomaSolution, depth = 0) {
        const nextCubeGroup = polycubes[0];
        for (let i = 0; i < nextCubeGroup.length; i++) {
            const fusionAttempt = workingSolution.plus(nextCubeGroup[i]);
            ++this.iterations;
            if (fusionAttempt) {
                const nextSoln = currentSoln.clone();
                nextSoln.addSpace(nextCubeGroup[i]);
                await this.visualiser.showSoln(nextSoln);
                if (polycubes.length === 1) {
                    this.solutions.push(nextSoln);
                    currentSoln = new SomaSolution(this.dimX, this.dimY, this.dimZ);
                    return;
                } else {
                    await this.backtrackSolve(fusionAttempt, polycubes.slice(1), nextSoln, depth + 1);
                }
            }
        }
    }
}