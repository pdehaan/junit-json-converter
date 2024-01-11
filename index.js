import * as lib from "./lib.js";
import * as schemas from "./schemas.js";

const testsuites = lib.junitToJSON("./artifacts/*.xml", schemas.TESTSUITES);

console.log(JSON.stringify(testsuites, null, 2));
