import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import consola from "consola";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/index.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("./views/not-found/index.vue"),
    },
  ],
  history: createWebHashHistory(),
});

router.beforeEach((to, from) => {
  // console.log("----> beforeEach", to.path);
  consola.info("----> beforeEach", to.path);
  if (to.path === "/about") {
    if (router.hasRoute("about")) {
      console.log("hasRoute about");
    } else {
      console.log("no hasRoute about");

      router.addRoute({
        name: "about",
        path: "/about",
        component: () => import("./views/about/index.vue"),
      });

      return to.fullPath;
    }
  }
});

createApp(App).use(router).mount("#app");
