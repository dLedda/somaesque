import Polycube from "./Polycube";
import SomaSolver from "./SomaSolver";

// const testCube = new Cube([4, 2, 5], [
//     "000", "001", "002", "003", "004",
//     "010", "011", "012", "013", "014",
//     "100", "101", "102", "103", "104",
//     "110", "111", "112", "113", "114",
//     "200", "201", "202", "203", "204",
//     "210", "211", "212", "213", "214",
//     "300", "301", "302", "303", "304",
//     "310", "311", "312", "313", "314",
// ]);
// const somaCube = new Polycube([3, 3, 3], [
//     false, false, false,
//     false, false, false,
//     false, false, false,
//
//     true, true, true,
//     true, true, true,
//     false, false, false,
//
//     false, false, false,
//     false, false, false,
//     false, false, false,
// ], 1);
const unitCube1 = new Polycube([1, 1, 1], [true], 1);
const unitCube2 = new Polycube([1, 1, 1], [true], 2);
const unitCube3 = new Polycube([1, 1, 1], [true], 3);
const unitCube4 = new Polycube([1, 1, 1], [true], 4);
const unitCube5 = new Polycube([1, 1, 1], [true], 5);
const unitCube6 = new Polycube([1, 1, 1], [true], 6);
const unitCube7 = new Polycube([1, 1, 1], [true], 7);
const unitCube8 = new Polycube([1, 1, 1], [true], 8);
const unitCube9 = new Polycube([1, 1, 1], [true], 9);
const unitCube10 = new Polycube([1, 1, 1], [true], 10);
const unitCube11 = new Polycube([1, 1, 1], [true], 11);
const unitCube12 = new Polycube([1, 1, 1], [true], 12);
const unitCube13 = new Polycube([1, 1, 1], [true], 13);
const unitCube14 = new Polycube([1, 1, 1], [true], 14);
const unitCube15 = new Polycube([1, 1, 1], [true], 15);
const unitCube16 = new Polycube([1, 1, 1], [true], 16);
const unitCube17 = new Polycube([1, 1, 1], [true], 17);
const unitCube18 = new Polycube([1, 1, 1], [true], 18);
const unitCube19 = new Polycube([1, 1, 1], [true], 19);
const unitCube20 = new Polycube([1, 1, 1], [true], 20);
const unitCube21 = new Polycube([1, 1, 1], [true], 21);
const unitCube22 = new Polycube([1, 1, 1], [true], 22);
const unitCube23 = new Polycube([1, 1, 1], [true], 23);
const unitCube24 = new Polycube([1, 1, 1], [true], 24);
const unitCube25 = new Polycube([1, 1, 1], [true], 25);
const unitCube26 = new Polycube([1, 1, 1], [true], 26);
const unitCube27 = new Polycube([1, 1, 1], [true], 27);

const tetromino1 = new Polycube([3, 3, 3], [
    true, true, true,
    false, true, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 1);

const tetromino2 = new Polycube([3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, true, false,
    false, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 2);

const tetromino3 = new Polycube([3, 3, 3], [
    true, false, false,
    true, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 3);

const tetromino4 = new Polycube([3, 3, 3], [
    true, true, false,
    false, false, false,
    false, false, false,

    true, false, false,
    true, false, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 4);

const tetromino5 = new Polycube([3, 3, 3], [
    true, true, false,
    false, false, false,
    false, false, false,

    false, true, false,
    false, true, false,
    false, false, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 5);

const tetromino6 = new Polycube([3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, false, false,
    false, true, false,
    false, true, true,

    false, false, false,
    false, false, false,
    false, false, false,
], 6);

const triomino1 = new Polycube([3, 3, 3], [
    false, false, false,
    false, false, false,
    false, true, false,

    false, false, false,
    false, true, false,
    false, true, false,

    false, false, false,
    false, false, false,
    false, false, false,
], 7);

// const cube = new VoxelSpace([3, 3, 3], Array(3**3).fill(0));
// cube.plus(triomino1)?.plus(tetromino2, {x: 1, y: 0, z: 1})?.print();

const solver = new SomaSolver(3);
console.log("solving");
solver.solve([triomino1, tetromino2, tetromino3, tetromino1, tetromino4, tetromino5, tetromino6]);
