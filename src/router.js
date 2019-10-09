import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/example-home-view',
      component: () => import(/* webpackChunkName: "example-home-view" */ './components/example-home-view.vue')
    },
    {
      path: '/example-another-view',
      component: () => import(/* webpackChunkName: "example-another-view" */ './components/example-another-view.vue')
    }
  ]
})
