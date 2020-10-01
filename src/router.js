import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/views/documentation'

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Documentation,
      children: [
        {
          path: '/example-home-view',
          component: () => import(/* webpackChunkName: "example-home-view" */ '@/views/example-home-view.vue')
        },
        {
          path: '/example-another-view',
          component: () => import(/* webpackChunkName: "example-another-view" */ '@/views/example-another-view.vue')
        }
      ]
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "isolated-test-view" */ '@/views/isolated-test-view.vue')
    }
  ]
})
