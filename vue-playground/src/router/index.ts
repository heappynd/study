import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/WebSocket',
      name: 'WebSocket',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WebSocket.vue')
    },
    {
      path: '/Terminal',
      name: 'Terminal',
      component: () => import('../views/Terminal.vue')
    }
  ]
})

export default router
