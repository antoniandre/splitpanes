// Polyfill.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import WaveUI from './plugins/wave-ui'
import router from '@/router'
import App from './app'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

Vue.config.productionTip = false

new Vue({
  router,
  WaveUI,
  render: h => h(App)
}).$mount('#app')
