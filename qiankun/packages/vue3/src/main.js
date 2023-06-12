import "./public-path";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import routes from "./router";

let router = null;
let instance = null;
let history = null;

function render(props = {}) {
  const { container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/vue3" : "/");
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("bootstrap");
  console.log("%c%s", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props) {
  console.log("mount", props);
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  render(props);
  // instance.config.globalProperties.$onGlobalStateChange =
  //   props.onGlobalStateChange;
  // instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  console.log("unmount in vue3");
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
  router = null;
  history.destroy();
}
