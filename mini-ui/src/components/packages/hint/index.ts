import type { HintProps } from "./hint.vue";
import createInstance from "./instance";

const hint = (cfg: HintProps) =>
  new Promise((resolve, reject) => {
    createInstance(cfg);
  });

export default hint;
