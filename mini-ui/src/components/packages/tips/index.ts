import type { IProps } from "./tips.vue";
import createInstance from "./instance";

const tips = (props: IProps) =>
  new Promise((resolve, reject) => {
    createInstance(props, { resolve, reject });
  });

export default tips;
