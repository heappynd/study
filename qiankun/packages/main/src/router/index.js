import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "../components/BaseLayout.vue";

const routes = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: '',
        component: () => import("../views/HomeView.vue"),
      }
    ]
  },
  {
    path: "/vue3",
    component: BaseLayout,
    children: [
      {
        path: "",
        component: () => import("../views/QiankunFrame.vue"),
      },
      {
        path: "about",
        component: () => import("../views/QiankunFrame.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
