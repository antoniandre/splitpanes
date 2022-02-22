import Vue from 'vue'
import WaveUI from './plugins/wave-ui'
import router from '@/router'
import App from './app.vue'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

Vue.config.productionTip = false

new Vue({ // eslint-disable-line no-new
  router,
  WaveUI,
  render: h => h(App)
}).$mount('#app')
