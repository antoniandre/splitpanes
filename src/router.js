import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/views/documentation.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Documentation,
      children: [
        {
          path: '/example-home-view',
          component: () => import('@/views/example-home-view.vue')
        },
        {
          path: '/example-another-view',
          component: () => import('@/views/example-another-view.vue')
        }
      ]
    },
    {
      path: '/test',
      component: () => import('@/views/isolated-test-view.vue')
    }
  ]
})
