import { createApp } from 'vue'
import router from '@/router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import App from './app.vue'

import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'

const app = createApp(App).use(router)

new WaveUI(app, {
  iconsLigature: 'material-icons',
  colors: {
    primary: '#42b983',
    maintext: '#999',
    darktext: '#444',
    lightertext: '#ccc',
    lightgrey: '#eee'
  }
})

app.mount('#app')
