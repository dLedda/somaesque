import SomaSolver from "./SomaSolver";
import VoxelSpace from "./VoxelSpace";


export function solve(polycubes: Array<i64>, dim: i32): Int64Array[] {
    const solver = new SomaSolver(dim);
    const voxelSpaces = new Array<VoxelSpace>();
    for (let i = 0; i < polycubes.length; i++) {
        voxelSpaces.push(new VoxelSpace(i, dim, dim, dim, polycubes[i], true));
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