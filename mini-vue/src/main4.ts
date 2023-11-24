// import { h } from "vue";
import { h } from "./runtime-core/h";
import { Text, Comment, Fragment } from "./runtime-core/vnode";
import { render } from "./runtime-dom";

const component1 = {
  data() {
    return {
      msg: "hello comp",
    };
  },
  render() {
    return h("div", this.msg);
  },
};
const vnode = h(component1);
render(vnode, document.querySelector("#app"));
// setTimeout(() => {
//   const component1 = {
//     render() {
//       return h("div", "update component");
//     },
//   };
//   const vnode = h(component1);
//   render(vnode, document.querySelector("#app"));
// }, 2000);
