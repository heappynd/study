"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOdd = exports.isEven = void 0;
var isOdd = exports.isOdd = function isOdd(n) {
  return n % 2 === 1;
};
var isEven = exports.isEven = function isEven(n) {
  return n % 2 === 0;
};