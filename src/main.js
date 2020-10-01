// Polyfill.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { createApp, h } from 'vue'
// import vuetify from './plugins/vuetify'
import router from '@/router'
import App from './app'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

createApp({
  // vuetify,
  render: () => h(App)
}).use(router).mount('#app')
