import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import packages from "./components/packages";
import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

createApp(App).use(packages).use(ElementPlus).mount("#app");
