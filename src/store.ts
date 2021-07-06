import { derived, writable } from 'svelte/store';
import type SomaSolution from "./SomaSolution";
import type VoxelSpaceBigInt from "./VoxelSpaceBigInt";
import DimStore from "./stores/DimStore";
import PolycubeStore from "./stores/PolycubeStore";

export const somaDimX = new DimStore(3);
export const somaDimY = new DimStore(3);
export const somaDimZ = new DimStore(3);
export const totalVolume = derived(
    [somaDimX, somaDimY, somaDimZ],
    ([$dimX, $dimY, $dimZ]: [number, number, number]) => $dimX*$dimY*$dimZ
);
export const polycubes = new PolycubeStore(somaDimX, somaDimY, somaDimZ);
export const solving = writable(false);
export const debug = writable(false);
export const solutions = writable([] as SomaSolution[]);
export const activeSolution = writable<number | null>(null);
export const showingSolution = writable(false);
export const isMaxPolycubes = derived(
    [polycubes, totalVolume],
    ([$cubes, $vol]: [VoxelSpaceBigInt[], number]) => $cubes.length >= $vol
);
export const isMinPolycubes = derived(
    polycubes,
    ($polycubes: VoxelSpaceBigInt[]) => $polycubes.length <= 1
);

type Save = {
    name: string,
    dimX: number,
    dimY: number,
    dimZ: number,
    cubes: {space: bigint | string, color: string}[],
};
const builtInExamples: Save[] = [
    {
        name: "Standard Soma Cube",
        dimX: 3,
        dimY: 3,
        dimZ: 3,
        cubes: [
            {space: 23n, color: "#ff0000"},
            {space: 30n, color: "#ffff00"},
            {space: 15n, color: "#00ff00"},
            {space: 8344n, color: "#00ffff"},
            {space: 9240n, color: "#0000ff"},
            {space: 4632n, color: "#ff00ff"},
            {space: 152n, color: "#ff5500"},
        ],
    },
    {
        name: "Convolution TG 5850 (4x4x4)",
        dimX: 4,
        dimY: 4,
        dimZ: 4,
        cubes: [
            {space: 12651033568030492808n, color: "#ff0000"},
            {space: 1123868011502010368n, color: "#ffff00"},
            {space: 124314703626304n, color: "#00ff00"},
            {space: 263883079155712n, color: "#00ffff"},
            {space: 3952148496n, color: "#0000ff"},
            {space: 166723584n, color: "#ff00ff"},
            {space: 1048576n, color: "#ff5500"},
        ],
    },
    {
        name: "3x3x4, 7 Pieces",
        dimX: 3,
        dimY: 3,
        dimZ: 4,
        cubes: [
            {space: 244n, color: "#ff0000"},
            {space: 625n, color: "#ffff00"},
            {space: 140080n, color: "#00ff00"},
            {space: 31n, color: "#00ffff"},
            {space: 738n, color: "#0000ff"},
            {space: 537002290n, color: "#ff00ff"},
            {space: 275n, color: "#ff5500"},
        ],
    },
    {
        name: "3x3x3, 7 Pieces",
        dimX: 3,
        dimY: 3,
        dimZ: 3,
        cubes: [
            {space: 23n, color: "#ff0000"},
            {space: 47n, color: "#ffff00"},
            {space: 474n, color: "#00ff00"},
            {space: 8n, color: "#00ffff"},
            {space: 24n, color: "#0000ff"},
            {space: 316n, color: "#ff00ff"},
            {space: 23n, color: "#ff5500"},
        ],
    },
    {
        name: "3x3x3, 6 Pieces",
        dimX: 3,
        dimY: 3,
        dimZ: 3,
        cubes: [
            {space: 58n, color: "#ff0000"},
            {space: 29712n, color: "#ffff00"},
            {space: 29216n, color: "#00ff00"},
            {space: 30n, color: "#00ffff"},
            {space: 15364n, color: "#0000ff"},
            {space: 536871032n, color: "#ff00ff"},
        ],
    },
    {
        name: "3x3x3, 5 Pieces",
        dimX: 3,
        dimY: 3,
        dimZ: 3,
        cubes: [
            {space: 376n, color: "#ff0000"},
            {space: 2428n, color: "#ffff00"},
            {space: 28960n, color: "#00ff00"},
            {space: 48136n, color: "#00ffff"},
            {space: 120n, color: "#0000ff"},
        ],
    },
];

export const examples = writable(builtInExamples.concat(deserealiseSaves()));

function deserealiseSaves(): Save[] {
    return localStorage.getItem("saves")?.split("@").map(save => JSON.parse(save)) ?? [];
}

function serialiseCurrentInput(): Save {
    return {
        name: "",
        dimX: somaDimX.currentVal(),
        dimY: somaDimY.currentVal(),
        dimZ: somaDimZ.currentVal(),
        cubes: polycubes.currentVal().map(cube => ({space: cube.getRaw().toString(), color: cube.getColor()})),
    };
}

export function save(name: string) {
    const save = serialiseCurrentInput();
    save.name = name;
    const saveString = JSON.stringify(save);
    let oldSaves = localStorage.getItem("saves");
    if (oldSaves !== null) {
        oldSaves += "@";
    } else {
        oldSaves = "";
    }
    localStorage.setItem("saves", oldSaves + saveString);
    examples.update(examples => examples.concat(save));
}