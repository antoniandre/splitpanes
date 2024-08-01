import { createApp } from 'vue'
import router from '@/router'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import App from './app.vue'

import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)

app.use(router)
app.use(WaveUI, {
  colors: {
    primary: '#42b983',
    maintext: '#999',
    darktext: '#444',
    lightertext: '#ccc',
    lightgrey: '#eee'
  }
})

app.mount('#app')
