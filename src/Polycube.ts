import VoxelSpace, {DimensionDef} from "./VoxelSpace";

export default class Polycube extends VoxelSpace {
    private id: number;
    constructor(dims: DimensionDef, vals: boolean[], id: number) {
        super(dims, vals.map(val => val ? id : 0), true);
        this.id = id;
    }

    getId() {
        return this.id;
    }

    print() {
        let accum = "";
        console.log("---");
        for (let i = 0; i < this.dims[0]; i++) {
            for (let j = 0; j < this.dims[1]; j++) {
                for (let k = 0; k < this.dims[2]; k++) {
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
    }

    matches(cube: VoxelSpace) {
        const otherDims = cube.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        const otherVals = cube.getVals();
        for (let i = 0; i < this.vals.length; i++) {
            if (Number(this.vals[i]) !== Number(otherVals[i])) {
                return false;
            }
        }
        return true;
    }

    size() {
        let size = 0;
        this.forEachCell((val) => {
            if (val) {
                size++;
            }
        });
        return size;
    }

    rotated90(dim: "x" | "y" | "z"): Polycube {
        const rotated = super.rotated90(dim);
        return new Polycube(rotated.getDims(), rotated.getVals() as unknown as boolean[], this.id);
    }

    clone(): Polycube {
        return new Polycube(this.getDims(), this.getVals() as unknown as boolean[], this.id);
    }

    getUniqueRotations(): Polycube[] {
        return super.getUniqueRotations().map(rot => new Polycube(rot.getDims(), rot.getVals() as unknown as boolean[], this.id));
    }
}