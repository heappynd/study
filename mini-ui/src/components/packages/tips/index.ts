import type { IProps } from "./tips.vue";
import createInstance from "./instance";

const hint = (props: IProps) =>
  new Promise((resolve, reject) => {
    createInstance(props, { resolve, reject });
  });

export default hint;
