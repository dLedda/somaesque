"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = VoxelSpace;
