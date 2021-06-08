const AsBind = require("as-bind/dist/as-bind.cjs.js");
const fs = require("fs");
const wasm = fs.readFileSync("./build/untouched.wasm");
const asyncTask = async () => {
    const asBindInstance = await AsBind.instantiate(wasm);

    // You can now use your wasm / as-bind instance!
    const response = asBindInstance.exports.solve(
        [16875584n, 16810176n, 65688n, 77952n, 12296n, 2109456n, 4184n], 3
    );
    console.log(response); // AsBind: Hello World!
};
asyncTask();