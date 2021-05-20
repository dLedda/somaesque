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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var VoxelSpace_1 = __importDefault(require("./VoxelSpace"));
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
}(VoxelSpace_1.default));
exports.default = Polycube;
