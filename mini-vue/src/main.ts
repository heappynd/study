// import { h } from "vue";
import { h } from "./runtime-core/h";
import { Text, Comment, Fragment } from "./runtime-core/vnode";

// debugger;

//* @example 1
const vnode1 = h("div", { class: "test" }, "hello render");

//* @example 2
const vnode2 = h("div", { class: { red: true, yellow: true } }, "hello render");

//* @example 3
const vnode3 = h("div", { class: "test" }, [
  h("p", "p1"),
  h("p", "p2"),
  h("p", "p3"),
]);

//* @example 4
const component = {
  render() {
    const vnode = h("div", "component");
    return vnode;
  },
};

const vnode4 = h(component);
