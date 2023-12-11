#!/usr/bin/env node

const lib = require("cli-test-lib");
const argv = require("process").argv;

const command = argv[2];

console.log("command", command);

// console.log(argv);

const options = argv.slice(3);

console.log("options", options);

let [option, param] = options;

option = option.replace("--", "");

if (lib[command]) {
  lib[command]({ option, param });
} else {
  console.log("请输入命令");
}

// cli-test init --name vue-test
/**
 * [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Program Files\\nodejs\\node_modules\\cli-test\\bin\\cli-test.js',
  'init',
  '--name',
  'vue-test'
   ]
 */
