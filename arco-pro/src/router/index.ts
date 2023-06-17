import { createRouter, createWebHistory } from "vue-router";
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from "./routes/base";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import { appRoutes } from "./routes";
import createRouteGuard from "./routes/guard";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
