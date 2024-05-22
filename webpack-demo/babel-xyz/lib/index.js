"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _utils = require("./utils");
// import 'core-js/stable'

console.log((0, _utils.isOdd)(2));

// async function mockData() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//   const data = await res.json()
//   console.log(data)
// }

// mockData()

var p = Promise.resolve('ok');