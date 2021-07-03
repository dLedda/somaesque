import SomaSolver from "./SomaSolver";
import VoxelSpaceBoolean from "./VoxelSpaceBoolean";
export function solve(polycubes, dimX, dimY, dimZ) {
    const solver = new SomaSolver(dimX, dimY, dimZ);
    const voxelSpaces = new Array();
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
