import Vue from 'vue'
import Router from 'vue-router'
import Documentation from '@/views/documentation.vue'

Vue.use(Router)

export default new Router({
  base: import.meta.env.BASE_URL,
  mode: 'history',
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
