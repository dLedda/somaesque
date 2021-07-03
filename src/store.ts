import { derived, writable } from 'svelte/store';
import { get } from 'svelte/store';
import SomaSolution from "./SomaSolution";
import VoxelSpaceBigInt from "./VoxelSpaceBigInt";
import type {DimensionDef} from "./VoxelSpaceBoolean";

const MAX_DIMS = 20;
const MIN_DIMS = 1;

export const solving = writable(false);
export const debug = writable(false);
export const somaDimX = dimStore(3);
export const somaDimY = dimStore(3);
export const somaDimZ = dimStore(3);
export const polycubes = polycubeStore();
export const selectedCube = writable(0);
export const solutions = writable([] as SomaSolution[]);
export const activeSolution = writable<number | null>(null);
export const showingSolution = writable(false);
export const totalVolume = derived(
    [somaDimX, somaDimY, somaDimZ],
    ([$dimX, $dimY, $dimZ]: [number, number, number]) => $dimX*$dimY*$dimZ
);
export const isMaxPolycubes = derived(
    [polycubes, totalVolume],
    ([$cubes, $vol]: [VoxelSpaceBigInt[], number]) => $cubes.length >= $vol
);
export const isMinPolycubes = derived(
    polycubes,
    ($polycubes: VoxelSpaceBigInt[]) => $polycubes.length <= 1
);

function dimStore(init: number) {
    const dimStore = writable(init);
    return {
        subscribe: dimStore.subscribe,
        set(dim: number) {
            if (dim > MAX_DIMS || dim < MIN_DIMS) {
                return;
            }
            dimStore.set(dim);
            polycubes.reset();
        },
    }
}

function polycubeStore() {
    function freshCube(id: number) {
        return new VoxelSpaceBigInt({
            id: id,
            dims: [get(somaDimX), get(somaDimY), get(somaDimZ)],
            color: colorFromIndex(id),
            cullEmpty: false
        });
    }
    const polycubeStore = writable<VoxelSpaceBigInt[]>([freshCube(0)]);
    return {
        subscribe: polycubeStore.subscribe,
        setColor(cubeIndex: number, color: string) {
            const cubes = get(polycubeStore);
            cubes[cubeIndex].setColor(color);
            polycubeStore.set(cubes);
        },
        addCube() {
            if (!get(isMaxPolycubes)) {
                polycubeStore.update((polycubes: VoxelSpaceBigInt[]) =>
                    polycubes.concat(freshCube(polycubes.length)));
            }
        },
        removeCube() {
            if (!get(isMinPolycubes)) {
                polycubeStore.update((polycubes: VoxelSpaceBigInt[]) => polycubes.splice(0, polycubes.length - 1));
            }
            const newLength = get(polycubeStore).length;
            if (newLength <= get(selectedCube)) {
                selectedCube.set(newLength - 1);
            }
        },
        toggle(cubeIndex: number, x: number, y: number, z: number) {
            const cubes = get(polycubeStore);
            cubes[cubeIndex].toggle(x, y, z);
            polycubeStore.set(cubes);
        },
        set(cubeIndex: number, val: boolean, x: number, y: number, z: number) {
            const cubes = get(polycubeStore);
            cubes[cubeIndex].set(x, y, z, val);
            polycubeStore.set(cubes);
        },
        reset() {
            polycubeStore.update((polycubes: VoxelSpaceBigInt[]) => {
                const result: VoxelSpaceBigInt[] = [];
                for (let i = 0; i < Math.min(polycubes.length, get(totalVolume)); i++) {
                    result.push(freshCube(i));
                }
                return result;
            });
        }
    }
}

function rgbToHex(rgbStr: string): string {
    const sep = rgbStr.indexOf(",") > -1 ? "," : " ";
    const rgb = rgbStr.substr(4).split(")")[0].split(sep);
    const r = (+rgb[0]).toString(16).padStart(2, "0");
    const g = (+rgb[1]).toString(16).padStart(2, "0");
    const b = (+rgb[2]).toString(16).padStart(2, "0");
    return "#" + r + g + b;
}

function hslToRgb(hslStr: string): string {
    const opt = new Option();
    opt.style.color = hslStr;
    return opt.style.color;
}

export function colorFromIndex(index: number): string {
    const colorWheelCycle = Math.floor(index / 6);
    const darknessCycle = Math.floor(index / 12);
    const spacing = (360 / 6);
    const offset = colorWheelCycle === 0 ? 0 : spacing / (colorWheelCycle + 2);
    let hue = spacing * (index % 6) + offset;
    const saturation = 100;
    const lightness = 1 / (2 + darknessCycle) * 100;
    return rgbToHex(hslToRgb(`hsl(${hue},${saturation}%,${Math.round(lightness)}%)`));
}

const worker = new Worker('../solver/main.js', {type: "module"});
async function respondWasm(event: MessageEvent) {
    solutions.set(event.data.map((wasmSolution) => {
        const solnObj = new SomaSolution(get(somaDimX), get(somaDimY), get(somaDimZ));
        const spaceReps = wasmSolution.split(",");
        for (let i = 0; i < spaceReps.length; i++) {
            solnObj.addSpace(new VoxelSpaceBigInt({
                id: i,
                dims: [get(somaDimX), get(somaDimY), get(somaDimZ)] as DimensionDef,
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
        const solnObj = new SomaSolution(get(somaDimX), get(somaDimY), get(somaDimZ));
        for (let i = 0; i < solnSpaces.length; i++) {
            solnObj.addSpace(new VoxelSpaceBigInt({
                id: i,
                dims: [get(somaDimX), get(somaDimY), get(somaDimZ)] as DimensionDef,
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
    inputCubes = get(polycubes).map(cubeInput => cubeInput.getRaw());
    solving.set(true);
    worker.postMessage({
        type: doWasm ? 'wasm' : 'js',
        polycubes: inputCubes,
        dimX: get(somaDimX),
        dimY: get(somaDimY),
        dimZ: get(somaDimZ)
    });
}

// async function solveSync() {
//     const solver = new SomaSolver(get(somaDimX), get(somaDimY), get(somaDimZ));
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
//     if (get(debug)) {
//         solver.setDebug({
//             showSoln(soln: SomaSolution) {
//                 return showSolutionWaitUserFeedback(soln);
//             },
//             showSpace(cube: VoxelSpaceBoolean) {
//                 const testSoln = new SomaSolution(get(somaDimX), get(somaDimY), get(somaDimZ));
//                 testSoln.addSpace(cube);
//                 return showSolutionWaitUserFeedback(testSoln);
//             }
//         });
//     }
//     solving.set(true);
//     await solver.solve(get(polycubes).map(cubeInput => new VoxelSpaceBoolean({
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