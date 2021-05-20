"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var SomaSolver = /** @class */ (function () {
    function SomaSolver(dimension) {
        this.solutions = [];
        this.iterations = 0;
        if (dimension % 1 !== 0 || dimension < 0) {
            throw new Error("The argument 'dimension' must be a positive whole number");
        }
        this.dim = dimension;
        this.solutionCube = new VoxelSpace([dimension, dimension, dimension], Array(Math.pow(dimension, 3)).fill(0));
    }
    SomaSolver.prototype.solve = function (polycubes) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        var cumulativeSize = polycubes.reduce(function (prev, curr) { return prev + curr.size(); }, 0);
        if (cumulativeSize !== Math.pow(this.dim, 3)) {
            throw new Error("The polycubes passed do not add up to exactly enough units to form a cube of dimension " + this.dim + "! Got: " + cumulativeSize + ", need: " + Math.pow(this.dim, 3));
        }
        this.iterations = 0;
        this.backtrackSolve(this.solutionCube, polycubes);
        this.solutions = VoxelSpace.filterUnique(this.solutions);
        this.solutions.forEach(function (sol) { return sol.print(); });
        console.log(this.solutions.length);
    };
    SomaSolver.prototype.backtrackSolve = function (workingSolution, polycubes, depth) {
        if (depth === void 0) { depth = 0; }
        var nextCube = polycubes[0];
        var rots = depth === 0 ? [nextCube] : nextCube.getUniqueRotations();
        for (var i = 0; i < rots.length; i++) {
            var polyCubeDims = rots[i].getDims();
            for (var x = 0; x < this.dim - polyCubeDims[0] + 1; x++) {
                for (var y = 0; y < this.dim - polyCubeDims[1] + 1; y++) {
                    for (var z = 0; z < this.dim - polyCubeDims[2] + 1; z++) {
                        var successfulFusion = workingSolution.plus(rots[i], x, y, z);
                        if (successfulFusion) {
                            if (polycubes.length === 1) {
                                console.log("soln", this.iterations++);
                                this.solutions.push(successfulFusion);
                                return;
                            }
                            else {
                                this.backtrackSolve(successfulFusion, polycubes.slice(1), depth + 1);
                            }
                        }
                    }
                }
            }
        }
    };
    return SomaSolver;
}());
var VoxelSpace = /** @class */ (function () {
    function VoxelSpace(dims, vals, cullEmpty) {
        if (vals.length !== dims[0] * dims[1] * dims[2]) {
            throw new Error("Vals don't fit in given dimensions.");
        }
        this.dims = dims;
        this.vals = vals;
        if (cullEmpty) {
            this.cullEmptySpace();
        }
    }
    VoxelSpace.prototype.cullEmptySpace = function () {
        var extrema = {
            xMax: -Infinity,
            xMin: Infinity,
            yMax: -Infinity,
            yMin: Infinity,
            zMax: -Infinity,
            zMin: Infinity,
        };
        var newVals = [];
        this.forEachCell(function (val, i, j, k) {
            if (val !== 0) {
                extrema.xMax = Math.max(extrema.xMax, i);
                extrema.xMin = Math.min(extrema.xMin, i);
                extrema.yMax = Math.max(extrema.yMax, j);
                extrema.yMin = Math.min(extrema.yMin, j);
                extrema.zMax = Math.max(extrema.zMax, k);
                extrema.zMin = Math.min(extrema.zMin, k);
            }
        });
        for (var i = extrema.xMin; i <= extrema.xMax; i++) {
            for (var j = extrema.yMin; j <= extrema.yMax; j++) {
                for (var k = extrema.zMin; k <= extrema.zMax; k++) {
                    newVals.push(this.at(i, j, k));
                }
            }
        }
        this.dims[0] = extrema.xMax - extrema.xMin + 1;
        this.dims[1] = extrema.yMax - extrema.yMin + 1;
        this.dims[2] = extrema.zMax - extrema.zMin + 1;
        this.vals = newVals;
    };
    VoxelSpace.prototype.forEachCell = function (cb) {
        loopStart: for (var x = 0; x < this.dims[0]; x++) {
            for (var y = 0; y < this.dims[1]; y++) {
                for (var z = 0; z < this.dims[2]; z++) {
                    if (cb(this.at(x, y, z), x, y, z) === 0) {
                        break loopStart;
                    }
                }
            }
        }
    };
    VoxelSpace.prototype.print = function () {
        var accum = "";
        console.log("---");
        for (var i = 0; i < this.dims[0]; i++) {
            for (var j = 0; j < this.dims[1]; j++) {
                for (var k = 0; k < this.dims[2]; k++) {
                    accum += this.at(i, j, k);
                }
                console.log(accum);
                accum = "";
            }
            if (i !== this.dims[0] - 1) {
                console.log("-");
            }
        }
        console.log("---");
    };
    VoxelSpace.prototype.getUniqueRotations = function () {
        var rotations = [];
        var refSpace = this.clone();
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        refSpace.rot90('z');
        VoxelSpace.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        return rotations;
    };
    VoxelSpace.filterUnique = function (spaces) {
        if (spaces.length === 0) {
            return [];
        }
        var uniqueSpaces = [spaces[0]];
        for (var _i = 0, spaces_1 = spaces; _i < spaces_1.length; _i++) {
            var space = spaces_1[_i];
            var foundMatch = false;
            for (var _a = 0, _b = space.getUniqueRotations(); _a < _b.length; _a++) {
                var rotation = _b[_a];
                var end = uniqueSpaces.length;
                for (var i = 0; i < end; i++) {
                    if (rotation.matches(uniqueSpaces[i])) {
                        foundMatch = true;
                    }
                }
            }
            if (!foundMatch) {
                uniqueSpaces.push(space);
            }
        }
        return uniqueSpaces;
    };
    VoxelSpace.pushNewUniqueSpaces = function (existingSpaces, newSpaces) {
        for (var _i = 0, newSpaces_1 = newSpaces; _i < newSpaces_1.length; _i++) {
            var newSpace = newSpaces_1[_i];
            var matchFound = false;
            for (var _a = 0, existingSpaces_1 = existingSpaces; _a < existingSpaces_1.length; _a++) {
                var existingSpace = existingSpaces_1[_a];
                if (newSpace.matches(existingSpace)) {
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                existingSpaces.push(newSpace);
            }
        }
    };
    VoxelSpace.prototype.matches = function (space) {
        var otherDims = space.getDims();
        for (var i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        var otherVals = space.getVals();
        for (var i = 0; i < this.vals.length; i++) {
            if (this.vals[i] !== otherVals[i]) {
                return false;
            }
        }
        return true;
    };
    VoxelSpace.prototype.clone = function () {
        return new VoxelSpace(this.getDims(), this.getVals());
    };
    VoxelSpace.prototype.getAxisSpins = function (axis) {
        var rotations = [this.clone()];
        for (var i = 0; i < 3; i++) {
            rotations.push(rotations[i].rotated90(axis));
        }
        return rotations;
    };
    VoxelSpace.prototype.getDims = function () {
        return this.dims.slice();
    };
    VoxelSpace.prototype.getVals = function () {
        return this.vals.slice();
    };
    // [1, 0,  0]   [x]   [ x]
    // [0, 0, -1] * [y] = [-z]
    // [0, 1,  0]   [z]   [ y]
    VoxelSpace.prototype.newIndexRotX = function (x, y, z) {
        return this.dims[2] * this.dims[1] * x + this.dims[1] * (this.dims[2] - 1 - z) + y;
    };
    // [ 0, 0, 1]   [x]   [ z]
    // [ 0, 1, 0] * [y] = [ y]
    // [-1, 0, 0]   [z]   [-x]
    VoxelSpace.prototype.newIndexRotY = function (x, y, z) {
        return this.dims[1] * this.dims[0] * z + this.dims[0] * y + (this.dims[0] - 1 - x);
    };
    // [0, -1, 0]     [x]   [-y]
    // [1,  0, 0]  *  [y] = [ x]
    // [0,  0, 1]     [z]   [ z]
    VoxelSpace.prototype.newIndexRotZ = function (x, y, z) {
        return this.dims[0] * this.dims[2] * (this.dims[1] - 1 - y) + this.dims[2] * x + z;
    };
    VoxelSpace.prototype.at = function (x, y, z) {
        return this.vals[this.dims[1] * this.dims[2] * x + this.dims[2] * y + z];
    };
    VoxelSpace.prototype.set = function (x, y, z, val) {
        this.vals[this.dims[1] * this.dims[2] * x + this.dims[2] * y + z] = val;
    };
    VoxelSpace.prototype.rotated90 = function (dim) {
        var newVals = __spreadArrays(this.vals);
        var newDims;
        var rotIndex;
        if (dim === 'x') {
            newDims = [this.dims[0], this.dims[2], this.dims[1]];
            rotIndex = this.newIndexRotX.bind(this);
        }
        else if (dim === 'y') {
            newDims = [this.dims[2], this.dims[1], this.dims[0]];
            rotIndex = this.newIndexRotY.bind(this);
        }
        else {
            newDims = [this.dims[1], this.dims[0], this.dims[2]];
            rotIndex = this.newIndexRotZ.bind(this);
        }
        this.forEachCell(function (val, i, j, k) {
            newVals[rotIndex(i, j, k)] = val;
        });
        return new VoxelSpace(newDims, newVals);
    };
    VoxelSpace.prototype.rot90 = function (dim) {
        var rot = this.rotated90(dim);
        this.vals = rot.getVals();
        this.dims = rot.getDims();
    };
    VoxelSpace.prototype.plus = function (space, startX, startY, startZ) {
        var result = this.clone();
        var spaceDims = space.getDims();
        for (var i = 0; i < spaceDims[0]; i++) {
            for (var j = 0; j < spaceDims[1]; j++) {
                for (var k = 0; k < spaceDims[2]; k++) {
                    var sourceVal = space.at(i, j, k);
                    var targetEmpty = result.at(startX + i, startY + j, startZ + k) === 0;
                    if (sourceVal !== 0 && targetEmpty) {
                        result.set(startX + i, startY + j, startZ + k, sourceVal);
                    }
                    else if (sourceVal !== 0 && !targetEmpty) {
                        return null;
                    }
                }
            }
        }
        return result;
    };
    return VoxelSpace;
}());
var Polycube = /** @class */ (function (_super) {
    __extends(Polycube, _super);
    function Polycube(dims, vals, id) {
        var _this = _super.call(this, dims, vals.map(function (val) { return val ? id : 0; }), true) || this;
        _this.id = id;
        return _this;
    }
    Polycube.prototype.getId = function () {
        return this.id;
    };
    Polycube.prototype.print = function () {
        var accum = "";
        console.log("---");
        for (var i = 0; i < this.dims[0]; i++) {
            for (var j = 0; j < this.dims[1]; j++) {
                for (var k = 0; k < this.dims[2]; k++) {
                    accum += this.at(i, j, k) === 0 ? "O" : "#";
                }
                console.log(accum);
                accum = "";
            }
            if (i !== this.dims[0] - 1) {
                console.log("-");
            }
        }
        console.log("---");
    };
    Polycube.prototype.matches = function (cube) {
        var otherDims = cube.getDims();
        for (var i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        var otherVals = cube.getVals();
        for (var i = 0; i < this.vals.length; i++) {
            if (Number(this.vals[i]) !== Number(otherVals[i])) {
                return false;
            }
        }
        return true;
    };
    Polycube.prototype.size = function () {
        var size = 0;
        this.forEachCell(function (val) {
            if (val) {
                size++;
            }
        });
        return size;
    };
    Polycube.prototype.rotated90 = function (dim) {
        var rotated = _super.prototype.rotated90.call(this, dim);
        return new Polycube(rotated.getDims(), rotated.getVals(), this.id);
    };
    Polycube.prototype.clone = function () {
        return new Polycube(this.getDims(), this.getVals(), this.id);
    };
    Polycube.prototype.getUniqueRotations = function () {
        var _this = this;
        return _super.prototype.getUniqueRotations.call(this).map(function (rot) { return new Polycube(rot.getDims(), rot.getVals(), _this.id); });
    };
    return Polycube;
}(VoxelSpace));
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
var unitCube1 = new Polycube([1, 1, 1], [true], 1);
var unitCube2 = new Polycube([1, 1, 1], [true], 2);
var unitCube3 = new Polycube([1, 1, 1], [true], 3);
var unitCube4 = new Polycube([1, 1, 1], [true], 4);
var unitCube5 = new Polycube([1, 1, 1], [true], 5);
var unitCube6 = new Polycube([1, 1, 1], [true], 6);
var unitCube7 = new Polycube([1, 1, 1], [true], 7);
var unitCube8 = new Polycube([1, 1, 1], [true], 8);
var unitCube9 = new Polycube([1, 1, 1], [true], 9);
var unitCube10 = new Polycube([1, 1, 1], [true], 10);
var unitCube11 = new Polycube([1, 1, 1], [true], 11);
var unitCube12 = new Polycube([1, 1, 1], [true], 12);
var unitCube13 = new Polycube([1, 1, 1], [true], 13);
var unitCube14 = new Polycube([1, 1, 1], [true], 14);
var unitCube15 = new Polycube([1, 1, 1], [true], 15);
var unitCube16 = new Polycube([1, 1, 1], [true], 16);
var unitCube17 = new Polycube([1, 1, 1], [true], 17);
var unitCube18 = new Polycube([1, 1, 1], [true], 18);
var unitCube19 = new Polycube([1, 1, 1], [true], 19);
var unitCube20 = new Polycube([1, 1, 1], [true], 20);
var unitCube21 = new Polycube([1, 1, 1], [true], 21);
var unitCube22 = new Polycube([1, 1, 1], [true], 22);
var unitCube23 = new Polycube([1, 1, 1], [true], 23);
var unitCube24 = new Polycube([1, 1, 1], [true], 24);
var unitCube25 = new Polycube([1, 1, 1], [true], 25);
var unitCube26 = new Polycube([1, 1, 1], [true], 26);
var unitCube27 = new Polycube([1, 1, 1], [true], 27);
var tetromino1 = new Polycube([3, 3, 3], [
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
var tetromino2 = new Polycube([3, 3, 3], [
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
var tetromino3 = new Polycube([3, 3, 3], [
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
var tetromino4 = new Polycube([3, 3, 3], [
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
var tetromino5 = new Polycube([3, 3, 3], [
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
var tetromino6 = new Polycube([3, 3, 3], [
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
var triomino1 = new Polycube([3, 3, 3], [
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
function start() {
    var solver = new SomaSolver(3);
    console.log("solving");
    solver.solve([triomino1, tetromino2, tetromino3, tetromino1, tetromino4, tetromino5, tetromino6]);
}
