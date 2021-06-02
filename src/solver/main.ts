import SomaSolver from "./SomaSolver";
import VoxelSpace from "./VoxelSpace";

type SolveStartMessageData = {polycubes: bigint[], dims: number};

self.addEventListener('message', (event) => {
    const {polycubes, dims} = event.data as SolveStartMessageData;
    const solver = new SomaSolver(event.data.dims);
    solver.solve(polycubes.map((cubeRep, i) => new VoxelSpace(i, [dims, dims, dims], cubeRep)));
    (self as unknown as Worker).postMessage(solver.getSolutions());
});

