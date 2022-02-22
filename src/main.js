import { createApp } from 'vue'
import WaveUI from './plugins/wave-ui'
import router from '@/router'
import App from './app.vue'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

const app = createApp(App)

new WaveUI(app, {
  // Some Wave UI options.
})

app.use(router).mount('#app')
