function render(oldVNode, newVNode, container) {
  if (!oldVNode) {
    mount(newVNode, container);
  } else {
    patch(oldVNode, newVNode, container);
  }
}

function patch(oldVNode, newVNode, container) {
  unmount(container);

  const el = document.createElement(newVNode.type);
  el.innerText = newVNode.children;
  container.appendChild(el);
}

function unmount(container: Element) {
  container.innerHTML = "";
}

function mount(vnode, container: Element) {
  const el = document.createElement(vnode.type);
  el.innerText = vnode.children;
  container.appendChild(el);
}

const vnode = {
  type: "div",
  children: "111",
};
render(null, vnode, document.querySelector("#app"));

setTimeout(() => {
  const vnode2 = {
    type: "div",
    children: "222",
  };
  render(vnode, vnode2, document.querySelector("#app"));
}, 2000);
