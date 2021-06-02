export default class SomaSolution {
    constructor(dim) {
        if (dim < 0 || dim % 1 !== 0) {
            throw new Error("Dimension must be a whole positive integer!");
        }
        this.dim = dim;
        this.solutionSpaces = [];
    }
    static filterUnique(solutions) {
        if (solutions.length === 0) {
            return [];
        }
        const uniqueSolns = [solutions[0]];
        for (const solution of solutions) {
            let foundMatch = false;
            for (const rotation of solution.getUniqueRotations()) {
                let end = uniqueSolns.length;
                for (let i = 0; i < end; i++) {
                    if (rotation.matches(uniqueSolns[i])) {
                        foundMatch = true;
                    }
                }
            }
            if (!foundMatch) {
                uniqueSolns.push(solution);
            }
        }
        return uniqueSolns;
    }
    getUniqueRotations() {
        if (this.solutionSpaces.length === 0) {
            return [];
        }
        const result = [];
        const allRots = this.solutionSpaces.map(space => space.getAllRotations());
        for (let i = 0; i < allRots[0].length; i++) {
            const solnRot = new SomaSolution(this.dim);
            allRots.forEach(rotGroup => solnRot.addSpace(rotGroup[i]));
            result.push(solnRot);
        }
        return result;
    }
    matches(solution) {
        for (let i = 0; i < this.solutionSpaces.length; i++) {
            if (!this.solutionSpaces[i].matches(solution.solutionSpaces[i])) {
                return false;
            }
        }
        return true;
    }
    addSpace(space) {
        this.solutionSpaces.push(space);
    }
    print() {
        let accum = "";
        console.log("---");
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                for (let z = 0; z < this.dim; z++) {
                    for (const space of this.solutionSpaces) {
                        if (space.at(x, y, z)) {
                            accum += space.getId();
                        }
                    }
                }
                console.log(accum);
                accum = "";
            }
            if (x !== this.dim - 1) {
                console.log("-");
            }
        }
        console.log("---");
    }
    at(x, y, z) {
        for (const space of this.solutionSpaces) {
            if (space.at(x, y, z)) {
                return space.getId();
            }
        }
        return 0;
    }
    clone() {
        const clone = new SomaSolution(this.dim);
        clone.solutionSpaces = this.solutionSpaces.slice();
        return clone;
    }
}
