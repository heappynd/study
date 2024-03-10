import "./public-path";
import { createApp } from "vue";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./router";
import App from "./App.vue";

let instance = null;
let router = null;
let history = null;

function render(props = {}) {
  console.log("props", props);
  const { container } = props;
  history = createWebHashHistory(
    window.__POWERED_BY_QIANKUN__ ? "/portal/sub-b" : "/"
  );
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
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] vue app mounted");
  render(props);
}

export async function unmount() {
  console.log("[vue] vue app unmount");
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
  router = null;
  history.destroy();
}
