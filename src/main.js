"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Polycube_1 = __importDefault(require("./Polycube"));
var SomaSolver_1 = __importDefault(require("./SomaSolver"));
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
var unitCube1 = new Polycube_1.default([1, 1, 1], [true], 1);
var unitCube2 = new Polycube_1.default([1, 1, 1], [true], 2);
var unitCube3 = new Polycube_1.default([1, 1, 1], [true], 3);
var unitCube4 = new Polycube_1.default([1, 1, 1], [true], 4);
var unitCube5 = new Polycube_1.default([1, 1, 1], [true], 5);
var unitCube6 = new Polycube_1.default([1, 1, 1], [true], 6);
var unitCube7 = new Polycube_1.default([1, 1, 1], [true], 7);
var unitCube8 = new Polycube_1.default([1, 1, 1], [true], 8);
var unitCube9 = new Polycube_1.default([1, 1, 1], [true], 9);
var unitCube10 = new Polycube_1.default([1, 1, 1], [true], 10);
var unitCube11 = new Polycube_1.default([1, 1, 1], [true], 11);
var unitCube12 = new Polycube_1.default([1, 1, 1], [true], 12);
var unitCube13 = new Polycube_1.default([1, 1, 1], [true], 13);
var unitCube14 = new Polycube_1.default([1, 1, 1], [true], 14);
var unitCube15 = new Polycube_1.default([1, 1, 1], [true], 15);
var unitCube16 = new Polycube_1.default([1, 1, 1], [true], 16);
var unitCube17 = new Polycube_1.default([1, 1, 1], [true], 17);
var unitCube18 = new Polycube_1.default([1, 1, 1], [true], 18);
var unitCube19 = new Polycube_1.default([1, 1, 1], [true], 19);
var unitCube20 = new Polycube_1.default([1, 1, 1], [true], 20);
var unitCube21 = new Polycube_1.default([1, 1, 1], [true], 21);
var unitCube22 = new Polycube_1.default([1, 1, 1], [true], 22);
var unitCube23 = new Polycube_1.default([1, 1, 1], [true], 23);
var unitCube24 = new Polycube_1.default([1, 1, 1], [true], 24);
var unitCube25 = new Polycube_1.default([1, 1, 1], [true], 25);
var unitCube26 = new Polycube_1.default([1, 1, 1], [true], 26);
var unitCube27 = new Polycube_1.default([1, 1, 1], [true], 27);
var tetromino1 = new Polycube_1.default([3, 3, 3], [
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
var tetromino2 = new Polycube_1.default([3, 3, 3], [
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
var tetromino3 = new Polycube_1.default([3, 3, 3], [
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
var tetromino4 = new Polycube_1.default([3, 3, 3], [
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
var tetromino5 = new Polycube_1.default([3, 3, 3], [
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
var tetromino6 = new Polycube_1.default([3, 3, 3], [
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
var triomino1 = new Polycube_1.default([3, 3, 3], [
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
var solver = new SomaSolver_1.default(3);
console.log("solving");
solver.solve([triomino1, tetromino2, tetromino3, tetromino1, tetromino4, tetromino5, tetromino6]);
