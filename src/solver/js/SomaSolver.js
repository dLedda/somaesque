import VoxelSpaceBoolean from "./VoxelSpaceBoolean";
import SomaSolution from "./SomaSolution";
export default class SomaSolver {
    constructor(dimX, dimY, dimZ) {
        this.visualiser = { async showSoln(soln) { }, async showSpace(cube) { } };
        this.solutions = new Array();
        this.iterations = 0;
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
        this.solutionCube = new VoxelSpaceBoolean({ id: 0, dims: [dimX, dimY, dimZ], cullEmpty: false });
    }
    setDebug(visualiser) {
        this.visualiser = visualiser;
    }
    async solve(polycubes) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        this.solutions.splice(0, this.solutions.length);
        const combosWithRots = new Array();
        for (let i = 1; i < polycubes.length; i++) {
            const rots = polycubes[i].getAllPermutationsInPrism(this.dimX, this.dimY, this.dimZ);
            combosWithRots.push(rots);
        }
        let combos = new Array();
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
    async backtrackSolve(workingSolution, polycubes, currentSoln, depth = 0) {
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
                }
                else {
                    await this.backtrackSolve(fusionAttempt, polycubes.slice(1), nextSoln, depth + 1);
                }
            }
        }
    }
}
