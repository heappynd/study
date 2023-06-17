import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@/styles/global.scss";
import "@arco-design/web-vue/dist/arco.css";
import i18n from "./locale";
import './mock';

const app = createApp(App);
app.use(i18n);
app.use(ArcoVue);
app.use(ArcoVueIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
