import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/about',
      component: () => import('../views/about/index.vue'),
    },
  ],
})

export default router
