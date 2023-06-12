import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import {
  initGlobalState,
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from "qiankun";

const app = createApp(App);
app.use(router);
app.use(Antd);
app.mount("#app");

/**
 * Step2 注册子应用
 */

// registerMicroApps([
//   {
//     name: "vue3",
//     entry: "//localhost:7105",
//     container: "#subapp-viewport",
//     // loader,
//     activeRule: "/vue3",
//     props: {
//       user: "qiankun",
//     },
//   },
// ]);

// const { onGlobalStateChange, setGlobalState } = initGlobalState({
//   user: "qiankun",
// });

// onGlobalStateChange((value, prev) =>
//   console.log("[onGlobalStateChange - master]:", value, prev)
// );

// setGlobalState({
//   user: 'antd'
// });

// start();
