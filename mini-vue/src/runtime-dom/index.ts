import { createRenderer } from "../runtime-core/renderer";
import { extend } from "../shared";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

const rendererOptions = extend({ patchProp }, nodeOps);

let renderer;

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}

export const render = (...args) => {
  ensureRenderer().render(...args);
};
