// import { h } from "vue";
import { reactive } from "@vue/reactivity";
import { h } from "./runtime-core/h";
import { Text, Comment, Fragment } from "./runtime-core/vnode";
import { render } from "./runtime-dom";

const component1 = {
  setup() {
    const obj = reactive({
      name: "zhangsan",
    });

    setTimeout(() => {
      obj.name = "lisi";
    }, 2000);

    return () => {
      return h("div", obj.name);
    };
  },
};
const vnode = h(component1);
render(vnode, document.querySelector("#app"));
