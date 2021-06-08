var t="0.7.0";const e="undefined"!=typeof BigUint64Array,r=Symbol(),n=new TextDecoder("utf-16le");function s(t,e){const r=new Uint32Array(t)[e+-4>>>2]>>>1,s=new Uint16Array(t,e,r);return r<=32?String.fromCharCode.apply(String,s):n.decode(s)}function i(t){const e={};function r(t,e){return t?s(t.buffer,e):"<yet unknown>"}const n=t.env=t.env||{};return n.abort=n.abort||function(t,s,i,o){const a=e.memory||n.memory;throw Error(`abort: ${r(a,t)} at ${r(a,s)}:${i}:${o}`)},n.trace=n.trace||function(t,s,...i){const o=e.memory||n.memory;console.log(`trace: ${r(o,t)}${s?" ":""}${i.slice(0,s).join(", ")}`)},n.seed=n.seed||Date.now,t.Math=t.Math||Math,t.Date=t.Date||Date,e}const o=function(){throw Error("Operation requires compiling with --exportRuntime")};function a(t,r){const n=r.exports,i=n.memory,a=n.table,c=n.__new||o,u=n.__pin||o,y=n.__unpin||o,l=n.__collect||o,p=n.__rtti_base,d=p?function(t){return t[p>>>2]}:o;function b(t){const e=function(t){const e=new Uint32Array(i.buffer);if((t>>>=0)>=d(e))throw Error(`invalid id: ${t}`);return e[(p+4>>>2)+2*t]}(t);if(!(7&e))throw Error(`not an array: ${t}, flags=${e}`);return e}function h(t){const e=new Uint32Array(i.buffer);if((t>>>=0)>=d(e))throw Error(`invalid id: ${t}`);return e[(p+4>>>2)+2*t+1]}function m(t){return 31-Math.clz32(t>>>6&31)}function g(t,e,r){const n=i.buffer;if(r)switch(t){case 2:return new Float32Array(n);case 3:return new Float64Array(n)}else switch(t){case 0:return new(e?Int8Array:Uint8Array)(n);case 1:return new(e?Int16Array:Uint16Array)(n);case 2:return new(e?Int32Array:Uint32Array)(n);case 3:return new(e?BigInt64Array:BigUint64Array)(n)}throw Error(`unsupported align: ${t}`)}function A(t){const e=new Uint32Array(i.buffer),r=b(e[t+-8>>>2]),n=m(r);let s=4&r?t:e[t+4>>>2];const o=2&r?e[t+12>>>2]:e[s+-4>>>2]>>>n;return g(n,2048&r,4096&r).subarray(s>>>=n,s+o)}function w(t,e,r){return new t(_(t,e,r))}function _(t,e,r){const n=i.buffer,s=new Uint32Array(n),o=s[r+4>>>2];return new t(n,o,s[o+-4>>>2]>>>e)}function T(e,r,n){t[`__get${r}`]=w.bind(null,e,n),t[`__get${r}View`]=_.bind(null,e,n)}return t.__new=c,t.__pin=u,t.__unpin=y,t.__collect=l,t.__newString=function(t){if(null==t)return 0;const e=t.length,r=c(e<<1,1),n=new Uint16Array(i.buffer);for(var s=0,o=r>>>1;s<e;++s)n[o+s]=t.charCodeAt(s);return r},t.__getString=function(t){if(!t)return null;const e=i.buffer;if(1!==new Uint32Array(e)[t+-8>>>2])throw Error(`not a string: ${t}`);return s(e,t)},t.__newArray=function(t,e){const r=b(t),n=m(r),s=e.length,o=c(s<<n,4&r?t:0);let a;if(4&r)a=o;else{u(o);const e=c(2&r?16:12,t);y(o);const l=new Uint32Array(i.buffer);l[e+0>>>2]=o,l[e+4>>>2]=o,l[e+8>>>2]=s<<n,2&r&&(l[e+12>>>2]=s),a=e}const l=g(n,2048&r,4096&r);if(16384&r)for(let t=0;t<s;++t){const r=e[t];l[(o>>>n)+t]=r}else l.set(e,o>>>n);return a},t.__getArrayView=A,t.__getArray=function(t){const e=A(t),r=e.length,n=new Array(r);for(let t=0;t<r;t++)n[t]=e[t];return n},t.__getArrayBuffer=function(t){const e=i.buffer,r=new Uint32Array(e)[t+-4>>>2];return e.slice(t,t+r)},[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array].forEach((t=>{T(t,t.name,31-Math.clz32(t.BYTES_PER_ELEMENT))})),e&&[BigUint64Array,BigInt64Array].forEach((t=>{T(t,t.name.slice(3),3)})),t.__instanceof=function(t,e){const r=new Uint32Array(i.buffer);let n=r[t+-8>>>2];if(n<=d(r))do{if(n==e)return!0;n=h(n)}while(n);return!1},t.memory=t.memory||i,t.table=t.table||a,f(n,t)}function c(t){return"undefined"!=typeof Response&&t instanceof Response}function u(t){return t instanceof WebAssembly.Module}async function y(t,e={}){if(c(t=await t))return l(t,e);const r=u(t)?t:await WebAssembly.compile(t),n=i(e),s=await WebAssembly.instantiate(r,e);return{module:r,instance:s,exports:a(n,s)}}async function l(t,e={}){if(!WebAssembly.instantiateStreaming)return y(c(t=await t)?t.arrayBuffer():t,e);const r=i(e),n=await WebAssembly.instantiateStreaming(t,e),s=a(r,n.instance);return{...n,exports:s}}function f(t,e={}){const n=t.__argumentsLength?e=>{t.__argumentsLength.value=e}:t.__setArgumentsLength||t.__setargc||(()=>{});for(let s in t){if(!Object.prototype.hasOwnProperty.call(t,s))continue;const i=t[s];let o=s.split("."),a=e;for(;o.length>1;){let t=o.shift();Object.prototype.hasOwnProperty.call(a,t)||(a[t]={}),a=a[t]}let c=o[0],u=c.indexOf("#");if(u>=0){const e=c.substring(0,u),o=a[e];if(void 0===o||!o.prototype){const t=function(...e){return t.wrap(t.prototype.constructor(0,...e))};t.prototype={valueOf(){return this[r]}},t.wrap=function(e){return Object.create(t.prototype,{[r]:{value:e,writable:!1}})},o&&Object.getOwnPropertyNames(o).forEach((e=>Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e)))),a[e]=t}if(c=c.substring(u+1),a=a[e].prototype,/^(get|set):/.test(c)){if(!Object.prototype.hasOwnProperty.call(a,c=c.substring(4))){let e=t[s.replace("set:","get:")],n=t[s.replace("get:","set:")];Object.defineProperty(a,c,{get(){return e(this[r])},set(t){n(this[r],t)},enumerable:!0})}}else"constructor"===c?(a[c]=(...t)=>(n(t.length),i(...t))).original=i:(a[c]=function(...t){return n(t.length),i(this[r],...t)}).original=i}else/^(get|set):/.test(c)?Object.prototype.hasOwnProperty.call(a,c=c.substring(4))||Object.defineProperty(a,c,{get:t[s.replace("set:","get:")],set:t[s.replace("get:","set:")],enumerable:!0}):"function"==typeof i&&i!==n?(a[c]=(...t)=>(n(t.length),i(...t))).original=i:a[c]=i}return e}var p={instantiate:y,instantiateSync:function(t,e={}){const r=u(t)?t:new WebAssembly.Module(t),n=i(e),s=new WebAssembly.Instance(r,e);return{module:r,instance:s,exports:a(n,s)}},instantiateStreaming:l,demangle:f};function d(t,e,r){return e}function b(t,e,r){return t.exports.__getArrayBuffer(e)}function h(t,e,r){return t.exports[`__get${function(t){return t.startsWith("~lib/typedarray/")?((t=t.slice("~lib/typedarray/".length)).startsWith("Big")&&(t=t.slice(3)),t):t}(r)}View`](e)}function m(t,e,r){return t.exports.__newArray(t.getTypeId(r),e)}function g(t){if(!t.startsWith("~lib/array/Array"))throw Error(`${JSON.stringify(t)} is not an array type`);return t.slice("~lib/array/Array<".length,-1)}const A=new Map([["void",{ascToJs:d,jsToAsc:d}],[/^(i|u|f)(8|16|32|64)|[ui]size|bool|externref$/,{ascToJs:d,jsToAsc:d}],["~lib/string/String",{ascToJs:function(t,e,r){return t.exports.__getString(e)},jsToAsc:function(t,e,r){return t.exports.__newString(e)}}],["~lib/typedarray/Int8Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Int16Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Int32Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint8Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint16Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint32Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Int64Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint64Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint8ClampedArray",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Float32Array",{ascToJs:b,jsToAsc:m}],["~lib/typedarray/Float64Array",{ascToJs:b,jsToAsc:m}],["~lib/arraybuffer/ArrayBuffer",{ascToJs:b,jsToAsc:function(t,e,r){const n=t.exports.__new(e.byteLength,t.getTypeId(r));return new Uint8Array(t.exports.memory.buffer,n,e.byteLength).set(new Uint8Array(e)),n}}],[/^~lib\/array\/Array<.+>$/,{ascToJs:function(t,e,r){const n=g(r),s=_(n);return t.exports.__getArray(e).map((e=>s.ascToJs(t,e,n)))},jsToAsc:function(t,e,r){const n=g(r),s=_(n),i=e.map((e=>s.jsToAsc(t,e,n)));return t.exports.__newArray(t.getTypeId(r),i)}}]]),w=new Set;function _(t){for(const[e,r]of A)if("string"!=typeof e){if(e.test(t))return r}else if(e===t)return r;return w.has(t)||(console.warn(`No converter for ${JSON.stringify(t)}, using pass-through`),w.add(t)),{ascToJs:d,jsToAsc:d}}function T(t){var e;return null===(e=_(t))||void 0===e?void 0:e.ascToJs}function j(t){var e;return null===(e=_(t))||void 0===e?void 0:e.jsToAsc}function O(t,e,r){const n=r.parameters.map(T),s=j(r.returnType);return function(...i){if(i.length!=n.length)throw Error(`Expected ${n.length} arguments, got ${i.length}`);const o=i.map(((e,s)=>n[s](t,e,r.parameters[s]))),a=e(...o);return s(t,a,r.returnType)}}function U(t,e,r){const n=r.parameters.map(j),s=T(r.returnType);return(...i)=>{if(i.length!=n.length)throw Error(`Expected ${n.length} arguments, got ${i.length}`);const o=i.map(((e,s)=>n[s](t,e,r.parameters[s]))),a=e(...o);return s(t,a,r.returnType)}}function x(t,{depth:e=Number.POSITIVE_INFINITY}={}){return e<=0||!t||"object"!=typeof t?t:Object.fromEntries(Object.entries(t).map((([t,r])=>[t,x(r,{depth:e-1})])))}function E(t){const e=WebAssembly.Module.customSections(t,"as-bind_bindings"),r=new TextDecoder("utf8").decode(new Uint8Array(e[0]));try{return JSON.parse(r)}catch(t){throw Error(`Couldn’t decode type descriptor: ${t.message}`)}}class S{constructor(){this.unboundExports={},this.exports={},this.importObject={}}getTypeId(t){if(t in this.typeDescriptor.typeIds)return this.typeDescriptor.typeIds[t].id;throw Error(`Unknown type ${JSON.stringify(t)}`)}getTypeSize(t){if(t in this.typeDescriptor.typeIds)return this.typeDescriptor.typeIds[t].byteSize;throw Error(`Unknown type ${JSON.stringify(t)}`)}_validate(){if(!WebAssembly.Module.exports(this.module).find((t=>"__new"===t.name)))throw Error("The AssemblyScript wasm module was not built with --exportRuntime, which is required.");if(1!==WebAssembly.Module.customSections(this.module,"as-bind_bindings").length)throw new Error("The AssemblyScript wasm module was not built with the as-bind transform.")}async _instantiate(t,e){this.module=await async function(t){if(t=await Promise.resolve(t),"undefined"!=typeof Response&&t instanceof Response){if(WebAssembly.compileStreaming)return WebAssembly.compileStreaming(t);t=await t.arrayBuffer()}return WebAssembly.compile(t)}(t),this._validate(),this.typeDescriptor=E(this.module),this._instantiateBindImportFunctions(e),this.loadedModule=await async function(t,e){return p.instantiate(t,e)}(this.module,this.importObject),this._instantiateBindUnboundExports()}_instantiateSync(t,e){this.module=new WebAssembly.Module(t),this._validate(),this.typeDescriptor=E(this.module),this._instantiateBindImportFunctions(e),this.loadedModule=function(t,e){return p.instantiateSync(t,e)}(this.module,this.importObject),this._instantiateBindUnboundExports()}_instantiateBindImportFunctions(t){this.importObject=x(t,{depth:2});for(const[e,r]of Object.entries(this.typeDescriptor.importedFunctions))for(const[n,s]of Object.entries(r))this.importObject[e][`__asbind_unbound_${n}`]=t[e][n],this.importObject[e][n]=O(this,t[e][n],s)}_instantiateBindUnboundExports(){const t=this.loadedModule.exports;this.exports=x(t,{depth:1});for(const[e,r]of Object.entries(this.typeDescriptor.exportedFunctions))this.exports[e]=U(this,t[e],r)}}async function I(t,e){let r=new S;return await r._instantiate(t,e),r}function $(t,e){let r=new S;return r._instantiateSync(t,e),r};
const instantiate = I;

let solveFn;
async function load() {
    const file = fetch("../solver/main.wasm");
    const instance = await instantiate(file);
    solveFn = instance.exports.solve;
}
load();

self.addEventListener('message', (event) => {
    const { polycubes, dims } = event.data;
    const solutions = solveFn(polycubes, dims);
    self.postMessage(solutions.map(soln => soln.toString()));
});

class SomaSolver {
    constructor(dimension) {
        this.solutions = [];
        this.iterations = 0;
        if (dimension % 1 !== 0 || dimension < 0) {
            throw new Error("The argument 'dimension' must be a positive whole number");
        }
        this.dim = dimension;
        this.solutionCube = new VoxelSpace(0, [dimension, dimension, dimension], Array(dimension ** 3).fill(0));
    }
    async solve(polycubes) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        let cumulativeSize = polycubes.reduce((prev, curr) => prev + curr.size(), 0);
        if (cumulativeSize !== this.dim ** 3) {
            throw new Error(`The polycubes passed do not add up to exactly enough units to form a cube of dimension ${this.dim}! Got: ${cumulativeSize}, need: ${this.dim ** 3}`);
        }
        this.solutions = [];
        const combosWithRots = polycubes.slice(1).map(polycube => polycube.getUniqueRotations().map((rot) => rot.getAllPositionsInCube(this.dim)).flat());
        const combos = [polycubes[0].getAllPositionsInCube(this.dim), ...combosWithRots];
        console.log(combos.flat().length);
        this.backtrackSolve(this.solutionCube, combos, new SomaSolution(this.dim));
        this.solutions = SomaSolution.filterUnique(this.solutions);
    }
    getSolutions() {
        return this.solutions.slice();
    }
    backtrackSolve(workingSolution, polycubes, currentSoln) {
        const nextCubeGroup = polycubes[0];
        for (let i = 0; i < nextCubeGroup.length; i++) {
            const fusionAttempt = workingSolution.plus(nextCubeGroup[i]);
            if (fusionAttempt) {
                const nextSoln = currentSoln.clone();
                nextSoln.addSpace(nextCubeGroup[i]);
                if (polycubes.length === 1) {
                    this.solutions.push(nextSoln);
                    currentSoln = new SomaSolution(this.dim);
                    return;
                }
                else {
                    this.backtrackSolve(fusionAttempt, polycubes.slice(1), nextSoln);
                }
            }
        }
    }
}

class VoxelSpace {
    constructor(id, dims, space, cullEmpty) {
        if (!space) {
            space = 0n;
        }
        else if (Array.isArray(space)) {
            if (space.length !== dims[0] * dims[1] * dims[2]) {
                throw new Error("Vals don't fit in given dimensions.");
            }
            space = VoxelSpace.boolArrayToBigInt(space);
        }
        this.id = id;
        this.length = dims[0] * dims[1] * dims[2];
        this.dims = dims;
        this.space = space;
        if (cullEmpty) {
            this.cullEmptySpace();
        }
    }
    static boolArrayToBigInt(boolArray) {
        let result = 0n;
        for (let i = 0; i < boolArray.length; i++) {
            if (boolArray[i]) {
                result |= BigInt(1 << i);
            }
        }
        return result;
    }
    binaryRep() {
        return this.space.toString(2);
    }
    getExtrema() {
        const extrema = {
            xMax: -Infinity,
            xMin: Infinity,
            yMax: -Infinity,
            yMin: Infinity,
            zMax: -Infinity,
            zMin: Infinity,
        };
        this.forEachCell((val, x, y, z) => {
            if (val) {
                extrema.xMax = Math.max(extrema.xMax, x);
                extrema.xMin = Math.min(extrema.xMin, x);
                extrema.yMax = Math.max(extrema.yMax, y);
                extrema.yMin = Math.min(extrema.yMin, y);
                extrema.zMax = Math.max(extrema.zMax, z);
                extrema.zMin = Math.min(extrema.zMin, z);
            }
        });
        return extrema;
    }
    cullEmptySpace() {
        const extrema = this.getExtrema();
        let index = 0n;
        let newSpace = 0n;
        for (let x = extrema.xMin; x <= extrema.xMax; x++) {
            for (let y = extrema.yMin; y <= extrema.yMax; y++) {
                for (let z = extrema.zMin; z <= extrema.zMax; z++) {
                    if (this.at(x, y, z)) {
                        newSpace |= 1n << index;
                    }
                    index++;
                }
            }
        }
        this.dims[0] = extrema.xMax - extrema.xMin + 1;
        this.dims[1] = extrema.yMax - extrema.yMin + 1;
        this.dims[2] = extrema.zMax - extrema.zMin + 1;
        this.space = newSpace;
    }
    forEachCell(cb) {
        loopStart: for (let x = 0; x < this.dims[0]; x++) {
            for (let y = 0; y < this.dims[1]; y++) {
                for (let z = 0; z < this.dims[2]; z++) {
                    if (cb(this.at(x, y, z), x, y, z) === 0) {
                        break loopStart;
                    }
                }
            }
        }
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
                    accum += this.at(i, j, k) ? '#' : 'O';
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
    getUniqueRotations() {
        const rotations = [];
        const refSpace = this.clone();
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
    }
    getAllRotations() {
        const rotations = [];
        const refSpace = this.clone();
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        rotations.push(...refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        refSpace.rot90('z');
        rotations.push(...refSpace.getAxisSpins('x'));
        return rotations;
    }
    static pushNewUniqueSpaces(existingSpaces, newSpaces) {
        for (const newSpace of newSpaces) {
            let matchFound = false;
            for (const existingSpace of existingSpaces) {
                if (newSpace.matches(existingSpace)) {
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                existingSpaces.push(newSpace);
            }
        }
    }
    getAllPositionsInCube(cubeDim) {
        if ((cubeDim > 0) && (cubeDim % 1 === 0)) {
            const cubePositions = [];
            for (let x = 0; x < cubeDim - this.dims[0] + 1; x++) {
                for (let y = 0; y < cubeDim - this.dims[1] + 1; y++) {
                    for (let z = 0; z < cubeDim - this.dims[2] + 1; z++) {
                        const cubePos = new VoxelSpace(this.id, [cubeDim, cubeDim, cubeDim]);
                        this.forEachCell((val, rotX, rotY, rotZ) => {
                            cubePos.set(x + rotX, y + rotY, z + rotZ, val);
                        });
                        cubePositions.push(cubePos);
                    }
                }
            }
            return cubePositions;
        }
        else {
            throw new Error("cubeDim must be a positive integer.");
        }
    }
    matches(space) {
        const otherDims = space.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        return this.space === space.getRaw();
    }
    clone() {
        return new VoxelSpace(this.id, this.getDims(), this.getRaw());
    }
    getAxisSpins(axis) {
        const rotations = [this.clone()];
        for (let i = 0; i < 3; i++) {
            rotations.push(rotations[i].rotated90(axis));
        }
        return rotations;
    }
    getDims() {
        return this.dims.slice();
    }
    getRaw() {
        return this.space;
    }
    // [1, 0,  0]   [x]   [ x]
    // [0, 0, -1] * [y] = [-z]
    // [0, 1,  0]   [z]   [ y]
    newIndexRotX(x, y, z) {
        return this.dims[2] * this.dims[1] * x + this.dims[1] * (this.dims[2] - 1 - z) + y;
    }
    // [ 0, 0, 1]   [x]   [ z]
    // [ 0, 1, 0] * [y] = [ y]
    // [-1, 0, 0]   [z]   [-x]
    newIndexRotY(x, y, z) {
        return this.dims[1] * this.dims[0] * z + this.dims[0] * y + (this.dims[0] - 1 - x);
    }
    // [0, -1, 0]     [x]   [-y]
    // [1,  0, 0]  *  [y] = [ x]
    // [0,  0, 1]     [z]   [ z]
    newIndexRotZ(x, y, z) {
        return this.dims[0] * this.dims[2] * (this.dims[1] - 1 - y) + this.dims[2] * x + z;
    }
    at(x, y, z) {
        const mask = 1n << BigInt(this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        return (this.space & mask) !== 0n;
    }
    toggle(x, y, z) {
        const mask = BigInt(1 << this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        this.space ^= mask;
    }
    set(x, y, z, val) {
        const mask = BigInt(1 << this.dims[1] * this.dims[2] * x + this.dims[2] * y + z);
        if (val) {
            this.space |= mask;
        }
        else {
            this.space &= ~mask;
        }
    }
    rotated90(dim) {
        let newSpace = 0n;
        let newDims;
        let rotIndex;
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
        this.forEachCell((val, i, j, k) => {
            if (val) {
                newSpace |= BigInt(1 << rotIndex(i, j, k));
            }
        });
        return new VoxelSpace(this.id, newDims, newSpace);
    }
    rot90(dim) {
        const rot = this.rotated90(dim);
        this.space = rot.getRaw();
        this.dims = rot.getDims();
    }
    plus(space) {
        const otherSpace = space.getRaw();
        if ((this.space | otherSpace) === (this.space ^ otherSpace)) {
            return new VoxelSpace(this.id, this.dims, otherSpace | this.space);
        }
        return null;
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
}
