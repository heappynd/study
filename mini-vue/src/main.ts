// import { h } from "vue";
import { h } from "./runtime-core/h";
import { Text, Comment, Fragment } from "./runtime-core/vnode";
import { render } from "./runtime-dom";

// debugger;

//* @example 1
const vnode1 = h("div", { class: "test" }, "hello render");

//* @example 2
const vnode2 = h(
  "div",
  { class: { red: true, yellow: true } },
  "hello render2"
);

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

const vnode5 = h("textarea", {
  class: "test-class",
  value: "textarea value",
  type: "text",
});

// const vnode = h("div", { style: { color: "red" } }, "Hello World");

// render(vnode, document.querySelector("#app"));

// setTimeout(() => {
//   const vnode = h("div", { style: { fontSize: "32px" } }, "Hello World");

//   render(vnode, document.querySelector("#app"));
// }, 2000);

const vnode = h(
  "button",
  {
    onClick() {
      console.log("click");
    },
  },
  "点击"
);
render(vnode, document.querySelector("#app"));

setTimeout(() => {
  const vnode = h(
    "button",
    {
      onDblclick() {
        console.log("dblclick");
      },
    },
    "双击"
  );

  render(vnode, document.querySelector("#app"));
}, 2000);
