// asbind/assemblyscript loader
var t="0.7.0";const e="undefined"!=typeof BigUint64Array,r=Symbol(),n=new TextDecoder("utf-16le");function s(t, e){const r=new Uint32Array(t)[e+-4>>>2]>>>1,s=new Uint16Array(t,e,r);return r<=32?String.fromCharCode.apply(String,s):n.decode(s)}function i(t){const e={};function r(t, e){return t?s(t.buffer,e):"<yet unknown>"}const n=t.env=t.env||{};return n.abort=n.abort||function(t, s, i, o){const a=e.memory||n.memory;throw Error(`abort: ${r(a,t)} at ${r(a,s)}:${i}:${o}`)},n.trace=n.trace||function(t, s, ...i){const o=e.memory||n.memory;console.log(`trace: ${r(o,t)}${s?" ":""}${i.slice(0,s).join(", ")}`)},n.seed=n.seed||Date.now,t.Math=t.Math||Math,t.Date=t.Date||Date,e}const o=function(){throw Error("Operation requires compiling with --exportRuntime")};function a(t, r){const n=r.exports,i=n.memory,a=n.table,c=n.__new||o,u=n.__pin||o,y=n.__unpin||o,l=n.__collect||o,p=n.__rtti_base,d=p?function(t){return t[p>>>2]}:o;function b(t){const e=function(t){const e=new Uint32Array(i.buffer);if((t>>>=0)>=d(e))throw Error(`invalid id: ${t}`);return e[(p+4>>>2)+2*t]}(t);if(!(7&e))throw Error(`not an array: ${t}, flags=${e}`);return e}function h(t){const e=new Uint32Array(i.buffer);if((t>>>=0)>=d(e))throw Error(`invalid id: ${t}`);return e[(p+4>>>2)+2*t+1]}function m(t){return 31-Math.clz32(t>>>6&31)}function g(t, e, r){const n=i.buffer;if(r)switch(t){case 2:return new Float32Array(n);case 3:return new Float64Array(n)}else switch(t){case 0:return new(e?Int8Array:Uint8Array)(n);case 1:return new(e?Int16Array:Uint16Array)(n);case 2:return new(e?Int32Array:Uint32Array)(n);case 3:return new(e?BigInt64Array:BigUint64Array)(n)}throw Error(`unsupported align: ${t}`)}function A(t){const e=new Uint32Array(i.buffer),r=b(e[t+-8>>>2]),n=m(r);let s=4&r?t:e[t+4>>>2];const o=2&r?e[t+12>>>2]:e[s+-4>>>2]>>>n;return g(n,2048&r,4096&r).subarray(s>>>=n,s+o)}function w(t, e, r){return new t(_(t,e,r))}function _(t, e, r){const n=i.buffer,s=new Uint32Array(n),o=s[r+4>>>2];return new t(n,o,s[o+-4>>>2]>>>e)}function T(e, r, n){t[`__get${r}`]=w.bind(null,e,n),t[`__get${r}View`]=_.bind(null,e,n)}return t.__new=c,t.__pin=u,t.__unpin=y,t.__collect=l,t.__newString=function(t){if(null==t)return 0;const e=t.length,r=c(e<<1,1),n=new Uint16Array(i.buffer);for(var s=0,o=r>>>1; s<e; ++s)n[o+s]=t.charCodeAt(s);return r},t.__getString=function(t){if(!t)return null;const e=i.buffer;if(1!==new Uint32Array(e)[t+-8>>>2])throw Error(`not a string: ${t}`);return s(e,t)},t.__newArray=function(t, e){const r=b(t),n=m(r),s=e.length,o=c(s<<n,4&r?t:0);let a;if(4&r)a=o;else{u(o);const e=c(2&r?16:12,t);y(o);const l=new Uint32Array(i.buffer);l[e+0>>>2]=o,l[e+4>>>2]=o,l[e+8>>>2]=s<<n,2&r&&(l[e+12>>>2]=s),a=e}const l=g(n,2048&r,4096&r);if(16384&r)for(let t=0; t<s; ++t){const r=e[t];l[(o>>>n)+t]=r}else l.set(e,o>>>n);return a},t.__getArrayView=A,t.__getArray=function(t){const e=A(t),r=e.length,n=new Array(r);for(let t=0; t<r; t++)n[t]=e[t];return n},t.__getArrayBuffer=function(t){const e=i.buffer,r=new Uint32Array(e)[t+-4>>>2];return e.slice(t,t+r)},[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array].forEach((t=>{T(t,t.name,31-Math.clz32(t.BYTES_PER_ELEMENT))})),e&&[BigUint64Array,BigInt64Array].forEach((t=>{T(t,t.name.slice(3),3)})),t.__instanceof=function(t, e){const r=new Uint32Array(i.buffer);let n=r[t+-8>>>2];if(n<=d(r))do{if(n==e)return!0;n=h(n)}while(n);return!1},t.memory=t.memory||i,t.table=t.table||a,f(n,t)}function c(t){return"undefined"!=typeof Response&&t instanceof Response}function u(t){return t instanceof WebAssembly.Module}async function y(t, e={}){if(c(t=await t))return l(t,e);const r=u(t)?t:await WebAssembly.compile(t),n=i(e),s=await WebAssembly.instantiate(r,e);return{module:r,instance:s,exports:a(n,s)}}async function l(t, e={}){if(!WebAssembly.instantiateStreaming)return y(c(t=await t)?t.arrayBuffer():t,e);const r=i(e),n=await WebAssembly.instantiateStreaming(t,e),s=a(r,n.instance);return{...n,exports:s}}function f(t, e={}){const n=t.__argumentsLength? e=>{t.__argumentsLength.value=e}:t.__setArgumentsLength||t.__setargc||(()=>{});for(let s in t){if(!Object.prototype.hasOwnProperty.call(t,s))continue;const i=t[s];let o=s.split("."),a=e;for(; o.length>1;){let t=o.shift();Object.prototype.hasOwnProperty.call(a,t)||(a[t]={}),a=a[t]}let c=o[0],u=c.indexOf("#");if(u>=0){const e=c.substring(0,u),o=a[e];if(void 0===o||!o.prototype){const t=function(...e){return t.wrap(t.prototype.constructor(0,...e))};t.prototype={valueOf(){return this[r]}},t.wrap=function(e){return Object.create(t.prototype,{[r]:{value:e,writable:!1}})},o&&Object.getOwnPropertyNames(o).forEach((e=>Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e)))),a[e]=t}if(c=c.substring(u+1),a=a[e].prototype,/^(get|set):/.test(c)){if(!Object.prototype.hasOwnProperty.call(a,c=c.substring(4))){let e=t[s.replace("set:","get:")],n=t[s.replace("get:","set:")];Object.defineProperty(a,c,{get(){return e(this[r])},set(t){n(this[r],t)},enumerable:!0})}}else"constructor"===c?(a[c]=(...t)=>(n(t.length),i(...t))).original=i:(a[c]=function(...t){return n(t.length),i(this[r],...t)}).original=i}else/^(get|set):/.test(c)?Object.prototype.hasOwnProperty.call(a,c=c.substring(4))||Object.defineProperty(a,c,{get:t[s.replace("set:","get:")],set:t[s.replace("get:","set:")],enumerable:!0}):"function"==typeof i&&i!==n?(a[c]=(...t)=>(n(t.length),i(...t))).original=i:a[c]=i}return e}var p={instantiate:y,instantiateSync:function(t, e={}){const r=u(t)?t:new WebAssembly.Module(t),n=i(e),s=new WebAssembly.Instance(r,e);return{module:r,instance:s,exports:a(n,s)}},instantiateStreaming:l,demangle:f};function d(t, e, r){return e}function b(t, e, r){return t.exports.__getArrayBuffer(e)}function h(t, e, r){return t.exports[`__get${function(t){return t.startsWith("~lib/typedarray/")?((t=t.slice("~lib/typedarray/".length)).startsWith("Big")&&(t=t.slice(3)),t):t}(r)}View`](e)}function m(t, e, r){return t.exports.__newArray(t.getTypeId(r),e)}function g(t){if(!t.startsWith("~lib/array/Array"))throw Error(`${JSON.stringify(t)} is not an array type`);return t.slice("~lib/array/Array<".length,-1)}const A=new Map([["void",{ascToJs:d,jsToAsc:d}],[/^(i|u|f)(8|16|32|64)|[ui]size|bool|externref$/,{ascToJs:d,jsToAsc:d}],["~lib/string/String",{ascToJs:function(t, e, r){return t.exports.__getString(e)},jsToAsc:function(t, e, r){return t.exports.__newString(e)}}],["~lib/typedarray/Int8Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Int16Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Int32Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint8Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint16Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint32Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Int64Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint64Array",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Uint8ClampedArray",{ascToJs:h,jsToAsc:m}],["~lib/typedarray/Float32Array",{ascToJs:b,jsToAsc:m}],["~lib/typedarray/Float64Array",{ascToJs:b,jsToAsc:m}],["~lib/arraybuffer/ArrayBuffer",{ascToJs:b,jsToAsc:function(t, e, r){const n=t.exports.__new(e.byteLength,t.getTypeId(r));return new Uint8Array(t.exports.memory.buffer,n,e.byteLength).set(new Uint8Array(e)),n}}],[/^~lib\/array\/Array<.+>$/,{ascToJs:function(t, e, r){const n=g(r),s=_(n);return t.exports.__getArray(e).map((e=>s.ascToJs(t,e,n)))},jsToAsc:function(t, e, r){const n=g(r),s=_(n),i=e.map((e=>s.jsToAsc(t,e,n)));return t.exports.__newArray(t.getTypeId(r),i)}}]]),w=new Set;function _(t){for(const[e,r]of A)if("string"!=typeof e){if(e.test(t))return r}else if(e===t)return r;return w.has(t)||(console.warn(`No converter for ${JSON.stringify(t)}, using pass-through`),w.add(t)),{ascToJs:d,jsToAsc:d}}function T(t){var e;return null===(e=_(t))||void 0===e?void 0:e.ascToJs}function j(t){var e;return null===(e=_(t))||void 0===e?void 0:e.jsToAsc}function O(t, e, r){const n=r.parameters.map(T),s=j(r.returnType);return function(...i){if(i.length!=n.length)throw Error(`Expected ${n.length} arguments, got ${i.length}`);const o=i.map(((e, s)=>n[s](t,e,r.parameters[s]))),a=e(...o);return s(t,a,r.returnType)}}function U(t, e, r){const n=r.parameters.map(j),s=T(r.returnType);return(...i)=>{if(i.length!=n.length)throw Error(`Expected ${n.length} arguments, got ${i.length}`);const o=i.map(((e, s)=>n[s](t,e,r.parameters[s]))),a=e(...o);return s(t,a,r.returnType)}}function x(t, {depth:e=Number.POSITIVE_INFINITY}={}){return e<=0||!t||"object"!=typeof t?t:Object.fromEntries(Object.entries(t).map((([t,r])=>[t,x(r,{depth:e-1})])))}function E(t){const e=WebAssembly.Module.customSections(t,"as-bind_bindings"),r=new TextDecoder("utf8").decode(new Uint8Array(e[0]));try{return JSON.parse(r)}catch(t){throw Error(`Couldn’t decode type descriptor: ${t.message}`)}}class S{constructor(){this.unboundExports={},this.exports={},this.importObject={}}getTypeId(t){if(t in this.typeDescriptor.typeIds)return this.typeDescriptor.typeIds[t].id;throw Error(`Unknown type ${JSON.stringify(t)}`)}getTypeSize(t){if(t in this.typeDescriptor.typeIds)return this.typeDescriptor.typeIds[t].byteSize;throw Error(`Unknown type ${JSON.stringify(t)}`)}_validate(){if(!WebAssembly.Module.exports(this.module).find((t=>"__new"===t.name)))throw Error("The AssemblyScript wasm module was not built with --exportRuntime, which is required.");if(1!==WebAssembly.Module.customSections(this.module,"as-bind_bindings").length)throw new Error("The AssemblyScript wasm module was not built with the as-bind transform.")}async _instantiate(t, e){this.module=await async function(t){if(t=await Promise.resolve(t),"undefined"!=typeof Response&&t instanceof Response){if(WebAssembly.compileStreaming)return WebAssembly.compileStreaming(t);t=await t.arrayBuffer()}return WebAssembly.compile(t)}(t),this._validate(),this.typeDescriptor=E(this.module),this._instantiateBindImportFunctions(e),this.loadedModule=await async function(t, e){return p.instantiate(t,e)}(this.module,this.importObject),this._instantiateBindUnboundExports()}_instantiateSync(t, e){this.module=new WebAssembly.Module(t),this._validate(),this.typeDescriptor=E(this.module),this._instantiateBindImportFunctions(e),this.loadedModule=function(t, e){return p.instantiateSync(t,e)}(this.module,this.importObject),this._instantiateBindUnboundExports()}_instantiateBindImportFunctions(t){this.importObject=x(t,{depth:2});for(const[e,r]of Object.entries(this.typeDescriptor.importedFunctions))for(const[n,s]of Object.entries(r))this.importObject[e][`__asbind_unbound_${n}`]=t[e][n],this.importObject[e][n]=O(this,t[e][n],s)}_instantiateBindUnboundExports(){const t=this.loadedModule.exports;this.exports=x(t,{depth:1});for(const[e,r]of Object.entries(this.typeDescriptor.exportedFunctions))this.exports[e]=U(this,t[e],r)}}async function I(t, e){let r=new S;return await r._instantiate(t,e),r}function $(t, e){let r=new S;return r._instantiateSync(t,e),r};
const instantiate = I;

// js solver
async function solveFnJs(polycubes, dimX, dimY, dimZ) {
    const solver = new SomaSolver(dimX, dimY, dimZ);
    const voxelSpaces = new Array();
    for (let i = 0; i < polycubes.length; i++) {
        voxelSpaces.push(new VoxelSpaceBoolean({
            id: i,
            dims: [dimX, dimY, dimZ],
            space: polycubes[i],
            cullEmpty: true
        }));
    }
    await solver.solve(voxelSpaces);
    return solver.getSolutions();
}
class VoxelSpaceBoolean {
    constructor(options) {
        this.length = options.dims[0] * options.dims[1] * options.dims[2];
        if (!options.space) {
            options.space = new Array(options.dims[0] * options.dims[1] * options.dims[2]);
            options.space.fill(false);
        }
        else if (!Array.isArray(options.space)) {
            const newSpace = [];
            for (let i = 0; i < this.length; i++) {
                const mask = 1n << BigInt(i);
                newSpace.push((options.space & mask) !== 0n);
            }
            options.space = newSpace;
        }
        this.id = options.id;
        this.dims = options.dims;
        this.space = options.space;
        this.color = options.color ?? "red";
        if (options.cullEmpty !== false) {
            this.cullEmptySpace();
        }
    }
    setColor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    binaryRep() {
        return this.space.reduce((prev, curr) => prev + (curr ? "1" : "0"), "");
    }
    getExtrema() {
        const extrema = {
            xMax: 0,
            xMin: this.dims[0],
            yMax: 0,
            yMin: this.dims[1],
            zMax: 0,
            zMin: this.dims[2],
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
        const newX = extrema.xMax - extrema.xMin + 1;
        const newY = extrema.yMax - extrema.yMin + 1;
        const newZ = extrema.zMax - extrema.zMin + 1;
        const newSpace = new Array(newX * newY * newZ);
        newSpace.fill(false);
        let index = 0;
        for (let x = extrema.xMin; x <= extrema.xMax; x++) {
            for (let y = extrema.yMin; y <= extrema.yMax; y++) {
                for (let z = extrema.zMin; z <= extrema.zMax; z++) {
                    if (this.at(x, y, z)) {
                        newSpace[index] = true;
                    }
                    index++;
                }
            }
        }
        this.dims[0] = newX;
        this.dims[1] = newY;
        this.dims[2] = newZ;
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
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('y');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
        refSpace.rot90('z');
        refSpace.rot90('z');
        VoxelSpaceBoolean.pushNewUniqueSpaces(rotations, refSpace.getAxisSpins('x'));
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
    getAllPositionsInPrism(cubeDimX, cubeDimY, cubeDimZ) {
        const cubePositions = [];
        if (this.dims[0] > cubeDimX || this.dims[1] > cubeDimY || this.dims[2] > cubeDimZ) {
            return cubePositions;
        }
        for (let xOffset = 0; xOffset < (cubeDimX - this.dims[0] + 1); xOffset++) {
            for (let yOffset = 0; yOffset < (cubeDimY - this.dims[1] + 1); yOffset++) {
                for (let zOffset = 0; zOffset < (cubeDimZ - this.dims[2] + 1); zOffset++) {
                    const cubePos = new VoxelSpaceBoolean({ id: this.id, dims: [cubeDimX, cubeDimY, cubeDimZ], color: this.color, cullEmpty: false });
                    this.forEachCell((val, x, y, z) => {
                        cubePos.set(xOffset + x, yOffset + y, zOffset + z, val);
                    });
                    cubePositions.push(cubePos);
                }
            }
        }
        return cubePositions;
    }
    matches(space) {
        const otherDims = space.getDims();
        for (let i = 0; i < this.dims.length; i++) {
            if (otherDims[i] !== this.dims[i]) {
                return false;
            }
        }
        const otherRaw = space.getRaw();
        if (typeof otherRaw === "bigint") {
            return space.binaryRep() === this.binaryRep();
        }
        return this.space.reduce((prev, unit, i) => (unit === otherRaw[i]) && prev, true);
    }
    clone() {
        return new VoxelSpaceBoolean({ id: this.id, dims: this.getDims(), space: this.getRaw(), color: this.getColor(), cullEmpty: false });
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
        return this.space.slice();
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
        return this.space[this.index(x, y, z)];
    }
    index(x, y, z) {
        return this.dims[1] * this.dims[2] * x + this.dims[2] * y + z;
    }
    toggle(x, y, z) {
        const index = this.index(x, y, z);
        this.space[index] = !this.space[index];
    }
    set(x, y, z, val) {
        this.space[this.index(x, y, z)] = val;
    }
    rotated90(dim) {
        const newSpace = new Array(this.dims[0] * this.dims[1] * this.dims[2]);
        newSpace.fill(false);
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
                newSpace[rotIndex(i, j, k)] = true;
            }
        });
        return new VoxelSpaceBoolean({ id: this.id, dims: newDims, space: newSpace, color: this.color, cullEmpty: false });
    }
    rot90(dim) {
        const rot = this.rotated90(dim);
        this.space = rot.getRaw();
        this.dims = rot.getDims();
    }
    plus(space) {
        const newSpace = new Array(this.dims[0] * this.dims[1] * this.dims[2]);
        newSpace.fill(false);
        let clash = false;
        space.forEachCell((val, x, y, z) => {
            if (this.at(x, y, z) !== val) {
                newSpace[this.index(x, y, z)] = true;
            }
            else {
                if (val) {
                    clash = true;
                }
            }
        });
        if (!clash) {
            return new VoxelSpaceBoolean({ id: this.id, dims: this.getDims(), space: newSpace, color: this.color, cullEmpty: false });
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
    getDirectNeighbourProfile(x, y, z) {
        let result = 0;
        if (x < this.dims[0] - 1 && this.at(x + 1, y, z)) {
            result += 1;
        }
        if (y < this.dims[1] - 1 && this.at(x, y + 1, z)) {
            result += 2;
        }
        if (z < this.dims[2] - 1 && this.at(x, y, z + 1)) {
            result += 4;
        }
        if (x > 0 && this.at(x - 1, y, z)) {
            result += 8;
        }
        if (y > 0 && this.at(x, y - 1, z)) {
            result += 16;
        }
        if (z > 0 && this.at(x, y, z - 1)) {
            result += 32;
        }
        return result;
    }
    getAllPermutationsInPrism(prismDimX, prismDimY, prismDimZ) {
        const rotations = this.getUniqueRotations();
        let result = new Array();
        for (let i = 0; i < rotations.length; i++) {
            result = result.concat(rotations[i].getAllPositionsInPrism(prismDimX, prismDimY, prismDimZ));
        }
        return result;
    }
}
class SomaSolver {
    constructor(dimX, dimY, dimZ) {
        this.visualiser = { async showSoln(soln) { }, async showSpace(cube) { } };
        this.solutions = new Array();
        this.iterations = 0;
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
        this.solutionCube = new VoxelSpaceBoolean({ id: 0, dims: [dimX, dimY, dimZ], cullEmpty: false });
    }
    setDebug(visualiser) {
        this.visualiser = visualiser;
    }
    async solve(polycubes) {
        if (polycubes.length === 0) {
            throw new Error("You must pass at least one polycube to solve the puzzle.");
        }
        this.solutions.splice(0, this.solutions.length);
        const combosWithRots = new Array();
        for (let i = 1; i < polycubes.length; i++) {
            const rots = polycubes[i].getAllPermutationsInPrism(this.dimX, this.dimY, this.dimZ);
            combosWithRots.push(rots);
        }
        let combos = new Array();
        combos.push(polycubes[0].getAllPositionsInPrism(this.dimX, this.dimY, this.dimZ));
        combos = combos.concat(combosWithRots);
        for (const combo of combos) {
            for (const rot of combo) {
                await this.visualiser.showSpace(rot);
            }
        }
        await this.backtrackSolve(this.solutionCube, combos, new SomaSolution(this.dimX, this.dimY, this.dimZ));
        this.solutions = SomaSolution.filterUnique(this.solutions);
    }
    getSolutions() {
        return this.solutions.slice();
    }
    async backtrackSolve(workingSolution, polycubes, currentSoln, depth = 0) {
        const nextCubeGroup = polycubes[0];
        for (let i = 0; i < nextCubeGroup.length; i++) {
            const fusionAttempt = workingSolution.plus(nextCubeGroup[i]);
            ++this.iterations;
            if (fusionAttempt) {
                const nextSoln = currentSoln.clone();
                nextSoln.addSpace(nextCubeGroup[i]);
                await this.visualiser.showSoln(nextSoln);
                if (polycubes.length === 1) {
                    this.solutions.push(nextSoln);
                    currentSoln = new SomaSolution(this.dimX, this.dimY, this.dimZ);
                    return;
                }
                else {
                    await this.backtrackSolve(fusionAttempt, polycubes.slice(1), nextSoln, depth + 1);
                }
            }
        }
    }
}
class SomaSolution {
    constructor(dimX, dimY, dimZ) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.dimZ = dimZ;
        this.solutionSpaces = [];
    }
    static filterUnique(solutions) {
        if (solutions.length === 0) {
            return [];
        }
        const uniqueSolns = [solutions[0]];
        for (const solution of solutions) {
            let foundMatch = false;
            for (const rotation of solution.getRotations()) {
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
    getRotations() {
        if (this.solutionSpaces.length === 0) {
            return [];
        }
        const result = [];
        const allRots = this.solutionSpaces.map(space => space.getAllRotations());
        for (let i = 0; i < allRots[0].length; i++) {
            const solnRot = new SomaSolution(this.dimX, this.dimY, this.dimZ);
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
        for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    for (const space of this.solutionSpaces) {
                        if (space.at(x, y, z)) {
                            accum += space.getId();
                        }
                    }
                }
                console.log(accum);
                accum = "";
            }
            if (x !== this.dimX - 1) {
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
        const clone = new SomaSolution(this.dimX, this.dimY, this.dimZ);
        clone.solutionSpaces = this.solutionSpaces.slice();
        return clone;
    }
    getDims() {
        return [this.dimX, this.dimY, this.dimZ];
    }
    forEachCell(cb) {
        loopStart: for (let x = 0; x < this.dimX; x++) {
            for (let y = 0; y < this.dimY; y++) {
                for (let z = 0; z < this.dimZ; z++) {
                    cb(this.at(x, y, z), x, y, z);
                }
            }
        }
    }
    getPieces() {
        return this.solutionSpaces.slice();
    }
}



// init wasm
let solveFnWasm;
async function load() {
    const file = fetch("../solver/main.wasm");
    const instance = await instantiate(file);
    solveFnWasm = instance.exports.solve;
}
load();

// worker
self.addEventListener('message', async (event) => {
    const { type, polycubes, dimX, dimY, dimZ } = event.data;
    if (type === "wasm") {
        const solutions = solveFnWasm(polycubes, dimX, dimY, dimZ);
        self.postMessage(solutions.map(soln => soln.toString()));
    } else if (type === "js") {
        const solutions = await solveFnJs(polycubes, dimX, dimY, dimZ);
        self.postMessage({solns: solutions.map(soln => soln.getPieces().map(piece => piece.binaryRep())), log: JSON.stringify(solutions)});
    } else {
        self.postMessage({error: `Invalid solver type passed to worker: ${type}`})
    }
});
