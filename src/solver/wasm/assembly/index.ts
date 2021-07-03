import SomaSolver from "./SomaSolver";
import VoxelSpace from "./VoxelSpace";


export function solve(polycubes: Array<i64>, dimX: i32, dimY: i32, dimZ: i32): Int64Array[] {
    const solver = new SomaSolver(dimX, dimY, dimZ);
    const voxelSpaces = new Array<VoxelSpace>();
    for (let i = 0; i < polycubes.length; i++) {
        voxelSpaces.push(new VoxelSpace(i, dimX, dimY, dimZ, polycubes[i], true));
    }
    solver.solve(voxelSpaces);
    const solutions = solver.getSolutions();
    let output: Int64Array[] = new Array<Int64Array>();
    for (let i = 0; i < solutions.length; i++) {
        const pieces = solutions[i].getPieces();
        output.push(new Int64Array(pieces.length));
        for (let j = 0; j < pieces.length; j++) {
            output[i][j] = pieces[j].getRaw();
        }
    }
    return output;
}