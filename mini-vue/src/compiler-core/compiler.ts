import { extend } from "../shared";
import { baseParse } from "./parse";
import { transform } from "./tranform";
import { transformText } from "./transforms/tranformText";
import { transformElement } from "./transforms/transformElement";

export function baseCompiler(template: string, options = {}) {
  const ast = baseParse(template);
  console.log("ast", ast);

  transform(
    ast,
    extend(options, {
      nodeTransforms: [transformElement, transformText],
    })
  );
  return {};
}
