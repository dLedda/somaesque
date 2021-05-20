"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var VoxelSpace_1 = __importDefault(require("./VoxelSpace"));
var SomaSolver = /** @class */ (function () {
    function SomaSolver(dimension) {
        this.solutions = [];
        this.iterations = 0;
        if (dimension % 1 !== 0 || dimension < 0) {
            throw new Error("The argument 'dimension' must be a positive whole number");
        }
        this.dim = dimension;
        this.solutionCube = new VoxelSpace_1.default([dimension, dimension, dimension], Array(Math.pow(dimension, 3)).fill(0));
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
        this.solutions = VoxelSpace_1.default.filterUnique(this.solutions);
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
exports.default = SomaSolver;
