import SomaSolver from "./SomaSolver";
import VoxelSpaceBoolean from "./VoxelSpaceBoolean";
import type SomaSolution from "./SomaSolution";

export function solve(polycubes: bigint[], dimX: number, dimY: number, dimZ: number): SomaSolution[] {
    const solver = new SomaSolver(dimX, dimY, dimZ);
    const voxelSpaces = new Array<VoxelSpaceBoolean>();
    for (let i = 0; i < polycubes.length; i++) {
        voxelSpaces.push(new VoxelSpaceBoolean({
            id: i,
            dims: [dimX, dimY, dimZ],
            space: polycubes[i],
            cullEmpty: true
        }));
    }
    solver.solve(voxelSpaces);
    return solver.getSolutions();
}