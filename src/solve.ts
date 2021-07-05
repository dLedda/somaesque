import SomaSolution from "./SomaSolution";
import {get} from "svelte/store";
import VoxelSpaceBigInt from "./VoxelSpaceBigInt";
import {
    activeSolution,
    polycubes,
    showingSolution,
    solutions,
    solving,
    somaDimX,
    somaDimY,
    somaDimZ,
    totalVolume
} from "./store";

const worker = new Worker('./solver/main.js', {type: 'module'});
async function respondWasm(event: MessageEvent) {
    solutions.set(event.data.map((wasmSolution) => {
        const solnObj = new SomaSolution(somaDimX.currentVal(), somaDimY.currentVal(), somaDimZ.currentVal());
        const spaceReps = wasmSolution.split(",");
        for (let i = 0; i < spaceReps.length; i++) {
            solnObj.addSpace(new VoxelSpaceBigInt({
                id: i,
                dims: [somaDimX.currentVal(), somaDimY.currentVal(), somaDimZ.currentVal()],
                space: BigInt(parseInt(spaceReps[i])),
                color: get(polycubes)[i].getColor(),
                cullEmpty: false,
            }));
        }
        return solnObj;
    }));
    if (event.data.length > 0) {
        activeSolution.set(0);
        showingSolution.set(true);
    } else {
        showingSolution.set(false);
        activeSolution.set(null);
    }
    solving.set(false);
}

function respondJs(event: MessageEvent) {
    solutions.set(event.data.solns.map(solnSpaces => {
        const solnObj = new SomaSolution(somaDimX.currentVal(), somaDimY.currentVal(), somaDimZ.currentVal());
        for (let i = 0; i < solnSpaces.length; i++) {
            solnObj.addSpace(new VoxelSpaceBigInt({
                id: i,
                dims: [somaDimX.currentVal(), somaDimY.currentVal(), somaDimZ.currentVal()],
                space: BigInt(`0b${ solnSpaces[i] }`),
                color: get(polycubes)[i].getColor(),
                cullEmpty: false,
            }));
        }
        return solnObj;
    }));
    if (event.data.length > 0) {
        activeSolution.set(0);
        showingSolution.set(true);
    } else {
        showingSolution.set(false);
        activeSolution.set(null);
    }
    solving.set(false);
}

export function solve() {
    const doWasm = get(totalVolume) <= 32;
    let inputCubes;
    if (doWasm) {
        worker.onmessage = (e) => respondWasm(e);
    } else {
        worker.onmessage = (e) => respondJs(e);
    }
    inputCubes = polycubes.currentVal().map(cubeInput => cubeInput.getRaw());
    solving.set(true);
    worker.postMessage({
        type: doWasm ? 'wasm' : 'js',
        polycubes: inputCubes,
        dimX: somaDimX.currentVal(),
        dimY: somaDimY.currentVal(),
        dimZ: somaDimZ.currentVal()
    });
}

// async function solveSync() {
//     const solver = new SomaSolver(somaDimX.currentVal(), somaDimY.currentVal(), somaDimZ.currentVal());
//     function showSolutionWaitUserFeedback(soln: SomaSolution) {
//         activeSolution.set(0);
//         solutions.set([soln]);
//         showingSolution.set(true);
//         return new Promise<void>((resolve) => {
//             const callback = (e: KeyboardEvent) => {
//                 resolve();
//                 window.removeEventListener("keydown", callback);
//             };
//             window.addEventListener("keydown", callback);
//         });
//     }
//     solver.setDebug({
//         showSoln(soln: SomaSolution) {
//             return showSolutionWaitUserFeedback(soln);
//         },
//         showSpace(cube: VoxelSpaceBoolean) {
//             const testSoln = new SomaSolution(somaDimX.currentVal(), somaDimY.currentVal(), somaDimZ.currentVal());
//             testSoln.addSpace(cube);
//             return showSolutionWaitUserFeedback(testSoln);
//         }
//     });
//     solving.set(true);
//     await solver.solve(polycubes.currentVal().map(cubeInput => new VoxelSpaceBoolean({
//         id: cubeInput.getId(),
//         dims: cubeInput.getDims(),
//         space: cubeInput.getRaw(),
//         color: cubeInput.getColor(),
//         cullEmpty: true
//     })));
//     const solns = solver.getSolutions();
//
//     if (solns.length > 0) {
//         activeSolution.set(0);
//         solutions.set(solns);
//         showingSolution.set(true);
//     } else {
//         showingSolution.set(false);
//         activeSolution.set(null);
//     }
//     solving.set(false);
// }