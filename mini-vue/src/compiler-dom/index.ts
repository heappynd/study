import { baseCompiler } from "../compiler-core/compiler";

export function compile(template: string, options) {
  return baseCompiler(template, options);
}
