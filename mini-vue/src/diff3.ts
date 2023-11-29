// import { h } from "vue";
import { reactive } from "@vue/reactivity";
import { h } from "./runtime-core/h";
import { Text, Comment, Fragment } from "./runtime-core/vnode";
import { render } from "./runtime-dom";

const vnode = h("ul", [
  h("li", { key: 1 }, "a"),
  h("li", { key: 2 }, "b"),
  h("li", { key: 3 }, "c"),
]);
render(vnode, document.querySelector("#app"));

setTimeout(() => {
  const vnode2 = h("ul", [
    h("li", { key: 4 }, "a"),
    h("li", { key: 2 }, "b"),
    h("li", { key: 3 }, "d"),
  ]);
  render(vnode2, document.querySelector("#app"));
}, 2000);
