import { compile } from "./compiler-dom";

const template = "<div>Hello world</div>";
const renderFn = compile(template);
console.log("renderFn", renderFn);
