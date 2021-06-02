import SomaSolver from "./SomaSolver.js";
import VoxelSpace from "./VoxelSpace.js";
self.addEventListener('message', (event) => {
    const { polycubes, dims } = event.data;
    const solver = new SomaSolver(event.data.dims);
    solver.solve(polycubes.map((cubeRep, i) => new VoxelSpace(i, [dims, dims, dims], cubeRep, true)));
    self.postMessage(solver.getSolutions());
});
