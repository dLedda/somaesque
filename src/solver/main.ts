import SomaSolver from "./SomaSolver";
import VoxelSpace from "./VoxelSpace";

const tetromino1 = new VoxelSpace(1, [3, 3, 3], [
    true, true, true,
    false, true, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], true);

const tetromino2 = new VoxelSpace(2, [3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, true, false,
    false, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,
], true);

const tetromino3 = new VoxelSpace(3, [3, 3, 3], [
    true, false, false,
    true, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], true);

const tetromino4 = new VoxelSpace(4, [3, 3, 3], [
    true, true, false,
    false, false, false,
    false, false, false,

    true, false, false,
    true, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], true);

const tetromino5 = new VoxelSpace(5, [3, 3, 3], [
    true, true, false,
    false, false, false,
    false, false, false,

    false, true, false,
    false, true, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], true);

const tetromino6 = new VoxelSpace(6, [3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, false, false,
    false, true, false,
    false, true, true,

    false, false, false,
    false, false, false,
    false, false, false,
], true);

const triomino1 = new VoxelSpace(7, [3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, false, false,
    false, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,
], true);



// const cube = new VoxelSpace([3, 3, 3], Array(3**3).fill(0));
// cube.plus(triomino1)?.plus(tetromino2, {x: 1, y: 0, z: 1})?.print();

const solver = new SomaSolver(3);
console.log("solving");
solver.solve([triomino1, tetromino2, tetromino3, tetromino1, tetromino4, tetromino5, tetromino6]);
